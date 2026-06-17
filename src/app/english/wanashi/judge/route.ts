// 罠師 審判API — ユーザーが作った誤答(distractor)を判定する唯一のAIの仕事。
// 注意: /api/ 配下に置くと english/layout の local-api shim(window.fetch パッチ)に
// 横取りされ {success:true} が返る。だから /api/ の外(/english/wanashi/judge)に置く。
// 各誤答が「①実は正解になりうる→reject」「②文法的に間違い かつ 紛らわしい→accept」かを返す。
// OPENAI_API_KEY 未設定/失敗時は壊れずフォールバック。

import OpenAI from 'openai';

export const runtime = 'nodejs';

interface Candidate {
    word: string;
    taunt?: string;
}

interface Verdict {
    word: string;
    accept: boolean;
    reason: string;
    plausibility: number; // 0-100: 中級者がどれだけ釣られそうか
}

const SYSTEM = `You are the strict referee of a TOEIC Part 5 "trap-building" game. The learner is given a fill-in-the-blank sentence and its ONE correct answer, then writes "distractor" words meant to trap other learners. Judge each distractor.

For each candidate word placed in the blank, decide:
- accept=false (REJECT) if the word is actually a grammatically AND semantically valid answer (i.e. it is not wrong — it would be a second correct answer), OR if it is absurd/obviously wrong in a way no real learner would ever pick.
- accept=true if the word makes the sentence WRONG (so it is a real distractor) AND it is plausible — it rides a common Japanese-learner error pattern (tense, preposition, part of speech, conjunction-vs-preposition, collocation).
- plausibility: 0-100, how likely a mid-level (TOEIC 500-700) learner is to fall for it. Obvious junk ~10. A subtle trap a learner can only kill by meaning, not grammar ~85+.
- reason: ONE short Japanese sentence, blunt, why it is accepted or rejected.

Be harsh: if a distractor could actually be correct, you MUST reject it — letting a valid answer into the pool poisons the game.

Return ONLY JSON: {"verdicts":[{"word","accept","reason","plausibility"}],"predictedCatch":<int 0-100, average plausibility of accepted distractors, 0 if none accepted>}`;

function fallback(candidates: Candidate[], note: string) {
    return {
        verdicts: candidates.map((c) => ({
            word: c.word,
            accept: true,
            reason: '審判オフライン（本番で OPENAI_API_KEY 設定が必要）。暫定で通過。',
            plausibility: 50,
        })),
        predictedCatch: null as number | null,
        refereeOffline: true,
        note,
    };
}

export async function POST(req: Request) {
    let body: { stem?: string; correct?: string; candidates?: Candidate[] };
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'invalid json' }, { status: 400 });
    }

    const { stem, correct, candidates } = body;
    if (!stem || !correct || !Array.isArray(candidates) || candidates.length === 0) {
        return Response.json({ error: 'stem, correct, candidates required' }, { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) return Response.json(fallback(candidates, 'no key'));

    try {
        const client = new OpenAI({ apiKey: key });
        const user = `Sentence (blank = ___): ${stem}\nCorrect answer: ${correct}\nCandidate distractors written by the learner:\n${candidates
            .map((c, i) => `${i + 1}. "${c.word}"${c.taunt ? ` — learner's taunt: ${c.taunt}` : ''}`)
            .join('\n')}`;

        const completion = await client.chat.completions.create({
            model: 'gpt-4o',
            temperature: 0.1,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: SYSTEM },
                { role: 'user', content: user },
            ],
        });

        const raw = completion.choices[0]?.message?.content || '{}';
        const parsed = JSON.parse(raw) as { verdicts?: Verdict[]; predictedCatch?: number };

        const byWord = new Map((parsed.verdicts || []).map((v) => [String(v.word).toLowerCase().trim(), v]));
        const verdicts: Verdict[] = candidates.map((c) => {
            const v = byWord.get(c.word.toLowerCase().trim());
            return {
                word: c.word,
                accept: v ? !!v.accept : false,
                reason: v?.reason || '判定不能。',
                plausibility: typeof v?.plausibility === 'number' ? Math.max(0, Math.min(100, Math.round(v.plausibility))) : 0,
            };
        });
        const accepted = verdicts.filter((v) => v.accept);
        const predictedCatch =
            typeof parsed.predictedCatch === 'number'
                ? Math.max(0, Math.min(100, Math.round(parsed.predictedCatch)))
                : accepted.length
                    ? Math.round(accepted.reduce((s, v) => s + v.plausibility, 0) / accepted.length)
                    : 0;

        return Response.json({ verdicts, predictedCatch, refereeOffline: false });
    } catch (e) {
        return Response.json(fallback(candidates, String(e)));
    }
}
