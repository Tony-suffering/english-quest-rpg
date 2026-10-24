/**
 * SCOREPASS ドクター -- 模試を「検査」に変える診断エンジン。
 *
 * 素点だけでは「時間が足りないのか、知識が足りないのか」は原理的に区別できない。
 * そのために Booklet 側で3つの生体データを取る:
 *   1. 解答イベントログ (どの設問に、いつマークしたか)  -> 時間配分・塗り絵の検出
 *   2. 勘フラグ (根拠なくマークした自己申告)            -> まぐれ正解の除去
 *   3. 既存の設問タグ (Part5文法 / Part7設問型 など)     -> 型別の失点
 *
 * ここは純関数 + localStorage の読み書きだけ。UI は持たない。
 * スコア換算は公式の換算表ではなく当サービスの推定であり、表示側で必ず「推定」と明記する。
 */

import type { ToeicTest } from '@/data/english/toeic-types';

/* ================================================================
   ストレージ (Booklet と doctor ページで共有するキー)
   ================================================================ */

export const toeicAnswersKey = (testId: string) => `toeic-${testId}-answers`;
export const toeicLogKey = (testId: string) => `toeic-${testId}-log`;
export const toeicGuessKey = (testId: string) => `toeic-${testId}-guess`;
export const DOCTOR_INTAKE_KEY = 'toeic-doctor-intake';

/** 解答イベント1件。at は wall clock (ms)。同じ設問の答え直しもそのまま積む */
export interface AnswerEvent {
    no: number;
    label: string;
    at: number;
}

const LOG_CAP = 1200; // 200問 + 答え直し余裕。無限に膨らませない

export function appendAnswerEvent(testId: string, no: number, label: string) {
    try {
        const key = toeicLogKey(testId);
        const raw = localStorage.getItem(key);
        const events: AnswerEvent[] = raw ? JSON.parse(raw) : [];
        events.push({ no, label, at: Date.now() });
        localStorage.setItem(key, JSON.stringify(events.slice(-LOG_CAP)));
    } catch { /* noop */ }
}

export function loadAnswerEvents(testId: string): AnswerEvent[] {
    try {
        const raw = localStorage.getItem(toeicLogKey(testId));
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr.filter(e => e && typeof e.no === 'number' && typeof e.at === 'number') : [];
    } catch { return []; }
}

export function loadGuesses(testId: string): Set<number> {
    try {
        const raw = localStorage.getItem(toeicGuessKey(testId));
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr.filter((n: unknown) => typeof n === 'number') : []);
    } catch { return new Set(); }
}

export function saveGuesses(testId: string, guesses: Set<number>) {
    try { localStorage.setItem(toeicGuessKey(testId), JSON.stringify([...guesses])); } catch { /* noop */ }
}

export function clearTestSession(testId: string) {
    try {
        localStorage.removeItem(toeicLogKey(testId));
        localStorage.removeItem(toeicGuessKey(testId));
        localStorage.removeItem(toeicSelfKey(testId));
    } catch { /* noop */ }
}

/* ---- 時間の自己申告 ----
   受け方のプロトコル: 塗り絵はしない。全問ちゃんと解く。
   75分が来ても止まらず、そのとき解いていた設問番号だけメモして最後まで行く。
   これで「時間無制限の実力」と「75分の本番想定」が1回の模試から両方取れる。
   塗り絵をさせると勘マークの正誤がタグ別正答率に混ざり、知識の測定が濁る。 */

export interface SelfReport {
    /** リーディング全問を解き切るのにかかった時間 (分)。未申告は null */
    totalMin: number | null;
    /** 75分経過時点で解いていた設問番号 (101-200)。75分以内に解き終えたなら null */
    at75No: number | null;
}

export const toeicSelfKey = (testId: string) => `toeic-${testId}-selfreport`;

export function loadSelfReport(testId: string): SelfReport {
    try {
        const raw = localStorage.getItem(toeicSelfKey(testId));
        if (!raw) return { totalMin: null, at75No: null };
        const p = JSON.parse(raw);
        return {
            totalMin: typeof p.totalMin === 'number' ? p.totalMin : null,
            at75No: typeof p.at75No === 'number' ? p.at75No : null,
        };
    } catch { return { totalMin: null, at75No: null }; }
}

export function saveSelfReport(testId: string, sr: SelfReport) {
    try { localStorage.setItem(toeicSelfKey(testId), JSON.stringify(sr)); } catch { /* noop */ }
}

/* ---- 問診票 ---- */

export interface DoctorIntake {
    currentScore: number | null;   // 直近の公式スコア。未受験は null
    targetScore: number;
    examDate: string;              // YYYY-MM-DD。未定は ''
    weekdayMin: number;            // 平日1日の勉強可能時間 (分)
    weekendMin: number;            // 休日1日 (分)
    audioOk: boolean;              // 通勤などで音声を聞ける環境があるか
}

export const DEFAULT_INTAKE: DoctorIntake = {
    currentScore: null,
    targetScore: 730,
    examDate: '',
    weekdayMin: 30,
    weekendMin: 60,
    audioOk: true,
};

export function loadIntake(): DoctorIntake {
    try {
        const raw = localStorage.getItem(DOCTOR_INTAKE_KEY);
        if (!raw) return DEFAULT_INTAKE;
        return { ...DEFAULT_INTAKE, ...JSON.parse(raw) };
    } catch { return DEFAULT_INTAKE; }
}

export function saveIntake(intake: DoctorIntake) {
    try { localStorage.setItem(DOCTOR_INTAKE_KEY, JSON.stringify(intake)); } catch { /* noop */ }
}

/* ================================================================
   設問インデックス -- 既存タグを診断コードに正規化する
   ================================================================ */

export interface QIndex {
    no: number;
    part: number;
    /** 診断用の型ラベル (日本語)。1問が複数に属することがある */
    labels: string[];
    /** 知識系の大分類: vocab / grammar / listening / reading / null(その他) */
    domain: 'vocab' | 'grammar' | 'listening' | 'reading' | null;
}

const P2_LABEL: Record<string, string> = { direct: 'P2 直接応答', indirect: 'P2 間接応答', echo: 'P2 聞き返し' };
const P6_LABEL: Record<string, string> = {
    sentence: 'P6 文挿入', verb: '動詞形・時制', pos: '品詞', vocab: '語彙',
    transition: '接続語・転換', word: '語彙・語形',
};
const P7_LABEL: Record<string, string> = {
    purpose: 'P7 目的', detail: 'P7 詳細', infer: 'P7 推論', person: 'P7 人物推論',
    not: 'P7 NOT問', synonym: 'P7 同義語', insert: 'P7 文挿入', intent: 'P7 発言の意図',
};

/** qType を持たない旧回のための、設問文からの型推定 (ToeicWeakness と同じ規則) */
export function classifyPart7(question: string): string {
    const q = question.toLowerCase();
    if (/\bNOT\b|\bexcept\b/i.test(question)) return 'P7 NOT問';
    if (/closest in meaning|refers? to/.test(q)) return 'P7 同義語';
    if (/belong|following sentence|\[1\]/.test(q)) return 'P7 文挿入';
    if (/purpose|why was|why did .* (write|send)/.test(q)) return 'P7 目的';
    if (/most likely mean|why does .* (write|say)/.test(q)) return 'P7 発言の意図';
    if (/who /.test(q)) return 'P7 人物推論';
    if (/suggest|indicate|imply|most likely|probably/.test(q)) return 'P7 推論';
    return 'P7 詳細';
}

const GRAMMAR_TAGS = ['品詞', '動詞形', '前置詞', '接続詞', '関係詞', '代名詞', '限定詞', '比較', '態', '時制'];

function part5Domain(tag: string): 'vocab' | 'grammar' {
    return GRAMMAR_TAGS.some(g => tag.includes(g)) ? 'grammar' : 'vocab';
}

export function buildIndex(test: ToeicTest): Map<number, QIndex> {
    const m = new Map<number, QIndex>();
    test.part1.forEach(q => m.set(q.no, { no: q.no, part: 1, labels: ['P1 写真描写'], domain: 'listening' }));
    test.part2.forEach(q => m.set(q.no, {
        no: q.no, part: 2, labels: [q.replyType ? P2_LABEL[q.replyType] : 'P2 応答'], domain: 'listening',
    }));
    ([[3, test.part3], [4, test.part4]] as const).forEach(([part, sets]) => {
        sets.forEach(s => s.questions.forEach(q => m.set(q.no, {
            no: q.no, part,
            labels: [q.intentQ ? `P${part} 発言の意図` : q.graphicQ ? `P${part} 図表` : part === 3 ? 'P3 会話' : 'P4 説明文'],
            domain: 'listening',
        })));
    });
    test.part5.forEach(q => m.set(q.no, {
        no: q.no, part: 5, labels: [`P5 ${q.tag || 'その他'}`], domain: part5Domain(q.tag || ''),
    }));
    test.part6.forEach(s => s.questions.forEach(q => m.set(q.no, {
        no: q.no, part: 6, labels: [`P6 ${P6_LABEL[q.type] || '語彙・語形'}`],
        domain: q.type === 'sentence' ? 'reading' : q.type === 'vocab' || q.type === 'word' ? 'vocab' : 'grammar',
    })));
    [...test.part7single, ...test.part7multiple].forEach(s => s.questions.forEach(q => {
        const labels = [q.qType ? P7_LABEL[q.qType] : classifyPart7(q.question)];
        if (q.crossRef) labels.push('P7 複数文書の参照');
        m.set(q.no, { no: q.no, part: 7, labels, domain: 'reading' });
    }));
    return m;
}

/* ================================================================
   1回分の検査結果
   ================================================================ */

export interface TimeStats {
    /** 計測に使えた解答イベント数 (リーディング領域) */
    readingEvents: number;
    /** リーディングの実解答時間 (秒)。30分超の中断は除外 */
    readingSec: number | null;
    /** Part 別の消費時間 (秒)。イベント間隔をその設問に帰属させた推定 */
    partSec: { p5: number; p6: number; p7: number };
    /** 1問あたりの平均秒 */
    perQ: { p5: number | null; p7: number | null };
    /** 塗り絵 (dt<=6秒の連続マーク6問以上) に入った最初の設問番号 */
    nurieFrom: number | null;
    nurieCount: number;
    /** リーディング末尾の未回答数 (時間切れの跡) */
    trailingBlank: number;
    /** 中断 (30分超の空白) を挟んだか */
    hadBreaks: boolean;
}

export interface LabelStat { label: string; wrong: number; total: number; nos: number[] }

export interface TestReport {
    testId: string;
    title: string;
    hasListening: boolean;
    answered: number;
    blank: number;
    correctL: number;
    correctR: number;
    /** 勘フラグ付きで正解した数 (まぐれ) */
    luckyL: number;
    luckyR: number;
    guessedCount: number;
    /** まぐれを除いた実力正答 */
    realL: number;
    realR: number;
    partAcc: { part: number; correct: number; total: number }[];
    labelStats: LabelStat[];
    domainAcc: { domain: string; correct: number; total: number }[];
    time: TimeStats;
    /** 時間の自己申告 (プロトコル: 全問解く + 75分時点のNo.をメモ) */
    self: SelfReport;
    /**
     * 75分制限の本番想定。at75No 以降を本番なら塗り絵 (期待正答 25%) として再計算した
     * リーディング正答数。実力 (correctR) との差が「時間で失っている点」になる。
     */
    examSim: { remaining: number; simCorrectR: number } | null;
    /** 最後に解答した日時 (ms)。ログが無い回は null */
    lastAt: number | null;
}

const GAP_BREAK_MS = 30 * 60 * 1000;  // これを超える間隔は「中断」
const NURIE_DT_MS = 6000;             // 6秒以内の連続マークは読んでいない
const NURIE_RUN = 6;

export function analyzeTest(
    test: ToeicTest,
    answers: Record<number, string>,
    guesses: Set<number>,
    events: AnswerEvent[],
    selfReport: SelfReport = { totalMin: null, at75No: null },
): TestReport {
    const index = buildIndex(test);
    const hasListening = test.part1.length > 0;

    let answered = 0, blank = 0, correctL = 0, correctR = 0, luckyL = 0, luckyR = 0;
    const wrongNos: number[] = [];
    test.answerKey.forEach(k => {
        const a = answers[k.no];
        if (a == null) { blank++; return; }
        answered++;
        const ok = a === k.answer;
        const lucky = ok && guesses.has(k.no);
        if (k.no <= 100) { if (ok) correctL++; if (lucky) luckyL++; }
        else { if (ok) correctR++; if (lucky) luckyR++; }
        if (!ok) wrongNos.push(k.no);
    });

    /* ---- 型別 ---- */
    const totalByLabel = new Map<string, number>();
    index.forEach(q => q.labels.forEach(l => totalByLabel.set(l, (totalByLabel.get(l) || 0) + 1)));
    const wrongByLabel = new Map<string, number[]>();
    wrongNos.forEach(no => index.get(no)?.labels.forEach(l => {
        const arr = wrongByLabel.get(l) || [];
        arr.push(no);
        wrongByLabel.set(l, arr);
    }));
    const labelStats: LabelStat[] = [...wrongByLabel.entries()]
        .map(([label, nos]) => ({ label, nos, wrong: nos.length, total: totalByLabel.get(label) || nos.length }))
        .sort((a, b) => (b.wrong / b.total) - (a.wrong / a.total) || b.wrong - a.wrong);

    /* ---- Part別 / 大分類別 ---- */
    const partAgg = new Map<number, { c: number; t: number }>();
    const domAgg = new Map<string, { c: number; t: number }>();
    test.answerKey.forEach(k => {
        const q = index.get(k.no);
        if (!q) return;
        const a = answers[k.no];
        if (a == null) return; // 未回答は分母に入れない (時間の問題であって知識の問題ではない)
        const ok = a === k.answer;
        const p = partAgg.get(q.part) || { c: 0, t: 0 };
        p.t++; if (ok) p.c++;
        partAgg.set(q.part, p);
        if (q.domain) {
            const d = domAgg.get(q.domain) || { c: 0, t: 0 };
            d.t++; if (ok) d.c++;
            domAgg.set(q.domain, d);
        }
    });

    /* ---- 時間 ---- */
    const sorted = [...events].sort((a, b) => a.at - b.at);
    // 同じ設問の答え直しは最後のイベントだけを時間帰属に使うと歯抜けになるので、
    // イベント列そのままで dt を計算し、dt をそのイベントの設問に帰属させる。
    const reading = sorted.filter(e => e.no >= 101);
    let readingSec = 0;
    let hadBreaks = false;
    const secByNo = new Map<number, number>();
    for (let i = 1; i < reading.length; i++) {
        const dt = reading[i].at - reading[i - 1].at;
        if (dt > GAP_BREAK_MS) { hadBreaks = true; continue; }
        readingSec += dt / 1000;
        secByNo.set(reading[i].no, (secByNo.get(reading[i].no) || 0) + dt / 1000);
    }
    const partSec = { p5: 0, p6: 0, p7: 0 };
    secByNo.forEach((sec, no) => {
        if (no <= 130) partSec.p5 += sec;
        else if (no <= 146) partSec.p6 += sec;
        else partSec.p7 += sec;
    });
    const p5Answered = [...secByNo.keys()].filter(n => n <= 130).length;
    const p7Answered = [...secByNo.keys()].filter(n => n >= 147).length;

    // 塗り絵検出: 6秒以内の連続マークが6問以上続いた区間
    let nurieFrom: number | null = null;
    let nurieCount = 0;
    let run: number[] = [];
    for (let i = 1; i < reading.length; i++) {
        const dt = reading[i].at - reading[i - 1].at;
        if (dt <= NURIE_DT_MS) {
            if (run.length === 0) run.push(reading[i - 1].no);
            run.push(reading[i].no);
        } else {
            if (run.length >= NURIE_RUN) { nurieFrom = Math.min(...run); nurieCount += run.length; }
            run = [];
        }
    }
    if (run.length >= NURIE_RUN) { nurieFrom = nurieFrom == null ? Math.min(...run) : Math.min(nurieFrom, Math.min(...run)); nurieCount += run.length; }

    // 末尾未回答: リーディングの最後から連続で空いている数
    let trailingBlank = 0;
    const rKeys = test.answerKey.filter(k => k.no > 100).map(k => k.no).sort((a, b) => b - a);
    for (const no of rKeys) {
        if (answers[no] == null) trailingBlank++;
        else break;
    }

    /* ---- 本番想定 (75分シミュレーション) ----
       at75No 以降の設問は、本番なら読めずに塗り絵になる。実際の正誤を捨てて
       期待正答 25% に置き換えると、公式スコアに近い「本番想定の正答数」が出る。 */
    let examSim: { remaining: number; simCorrectR: number } | null = null;
    const at75 = selfReport.at75No;
    if (at75 != null && at75 > 100) {
        let afterAnswered = 0, afterCorrect = 0;
        test.answerKey.forEach(k => {
            if (k.no < at75 || k.no <= 100) return;
            const a = answers[k.no];
            if (a != null) { afterAnswered++; if (a === k.answer) afterCorrect++; }
        });
        const reachedCorrect = correctR - afterCorrect;
        examSim = {
            remaining: test.answerKey.filter(k => k.no > 100 && k.no >= at75).length,
            simCorrectR: reachedCorrect + Math.round(afterAnswered * 0.25),
        };
    }

    return {
        testId: test.id,
        title: test.title,
        hasListening,
        answered, blank, correctL, correctR, luckyL, luckyR,
        guessedCount: guesses.size,
        realL: correctL - luckyL,
        realR: correctR - luckyR,
        partAcc: [...partAgg.entries()].map(([part, v]) => ({ part, correct: v.c, total: v.t })).sort((a, b) => a.part - b.part),
        labelStats,
        domainAcc: [...domAgg.entries()].map(([domain, v]) => ({ domain, correct: v.c, total: v.t })),
        time: {
            readingEvents: reading.length,
            readingSec: reading.length >= 20 ? Math.round(readingSec) : null,
            partSec,
            perQ: {
                p5: p5Answered >= 10 ? Math.round(partSec.p5 / p5Answered) : null,
                p7: p7Answered >= 10 ? Math.round(partSec.p7 / p7Answered) : null,
            },
            nurieFrom, nurieCount, trailingBlank, hadBreaks,
        },
        self: selfReport,
        examSim,
        lastAt: sorted.length > 0 ? sorted[sorted.length - 1].at : null,
    };
}

/* ================================================================
   スコア換算 (推定) と診断
   ================================================================ */

/** 素点 -> 換算点の目安。公式換算表ではなく、市販換算表の中央値に寄せた推定 */
const L_ANCHOR: [number, number][] = [[0, 5], [10, 50], [20, 105], [30, 160], [40, 220], [50, 270], [60, 320], [70, 370], [80, 420], [90, 470], [100, 495]];
const R_ANCHOR: [number, number][] = [[0, 5], [10, 45], [20, 95], [30, 150], [40, 205], [50, 255], [60, 310], [70, 355], [80, 405], [90, 455], [100, 495]];

function interp(anchors: [number, number][], raw: number): number {
    const x = Math.max(0, Math.min(100, raw));
    for (let i = 1; i < anchors.length; i++) {
        const [x0, y0] = anchors[i - 1];
        const [x1, y1] = anchors[i];
        if (x <= x1) return Math.round(y0 + (y1 - y0) * (x - x0) / (x1 - x0));
    }
    return anchors[anchors.length - 1][1];
}

export function estimateScaled(rawL: number | null, rawR: number): { l: number | null; r: number; total: number | null; band: number } {
    const l = rawL == null ? null : interp(L_ANCHOR, rawL);
    const r = interp(R_ANCHOR, rawR);
    return { l, r, total: l == null ? null : l + r, band: 35 };
}

/** 100点上げるのに必要な学習時間の目安 (h)。帯が上がるほど重くなる */
export function hoursPer100(scoreNow: number): number {
    if (scoreNow < 600) return 250;
    if (scoreNow < 730) return 300;
    if (scoreNow < 860) return 400;
    return 500;
}

export type CauseKey = 'time' | 'vocab' | 'grammar' | 'listening' | 'inference' | 'lucky';

export interface Cause {
    key: CauseKey;
    title: string;
    /** 数字の入った根拠。空なら表示しない */
    evidence: string[];
    severity: number; // 0-100 大きいほど主因
}

/** 検査結果から主因を並べる。データが無い軸は正直に「測れていない」として返さない */
export function findCauses(r: TestReport): Cause[] {
    const causes: Cause[] = [];
    const acc = (c: number, t: number) => t > 0 ? c / t : null;

    /* 時間 -- 主データは自己申告 (75分時点のNo. と 解き切るまでの分数)。自動ログは補助 */
    const timeEv: string[] = [];
    let timeSev = 0;
    if (r.examSim && r.examSim.remaining >= 3) {
        timeEv.push(`75分時点で No.${r.self.at75No} -- 残り ${r.examSim.remaining} 問。本番ならここから先は塗り絵になる`);
        timeSev += Math.min(55, r.examSim.remaining * 2);
    }
    if (r.self.totalMin != null && r.self.totalMin > 75) {
        timeEv.push(`全問解き切るのに ${r.self.totalMin} 分 (制限 75 分, 超過 ${r.self.totalMin - 75} 分)`);
        timeSev += Math.min(30, r.self.totalMin - 75);
    }
    if (r.time.trailingBlank >= 8) { timeEv.push(`リーディング末尾 ${r.time.trailingBlank} 問が未回答 (時間切れの跡)`); timeSev += Math.min(50, r.time.trailingBlank * 3); }
    if (r.time.nurieFrom != null) { timeEv.push(`No.${r.time.nurieFrom} 以降で ${r.time.nurieCount} 問を6秒以内に連続マーク (塗り絵)`); timeSev += 30; }
    if (r.time.perQ.p5 != null && r.time.perQ.p5 > 30) { timeEv.push(`Part 5 平均 ${r.time.perQ.p5} 秒/問 (本番目安 20 秒)`); timeSev += 20; }
    if (r.time.perQ.p7 != null && r.time.perQ.p7 > 75) { timeEv.push(`Part 7 平均 ${r.time.perQ.p7} 秒/問 (本番目安 60 秒)`); timeSev += 15; }
    if (timeEv.length > 0) causes.push({ key: 'time', title: '時間', evidence: timeEv, severity: Math.min(100, timeSev) });

    /* 語彙 */
    const vocab = r.domainAcc.find(d => d.domain === 'vocab');
    const va = vocab ? acc(vocab.correct, vocab.total) : null;
    if (va != null && vocab && vocab.total >= 8 && va < 0.7) {
        causes.push({
            key: 'vocab', title: '語彙',
            evidence: [`語彙を直接問う問題の正答率 ${Math.round(va * 100)}% (${vocab.correct}/${vocab.total})`],
            severity: Math.round((0.7 - va) * 200),
        });
    }

    /* 文法 */
    const gram = r.domainAcc.find(d => d.domain === 'grammar');
    const ga = gram ? acc(gram.correct, gram.total) : null;
    if (ga != null && gram && gram.total >= 8 && ga < 0.7) {
        const worst = r.labelStats.filter(s => s.label.startsWith('P5') && s.total >= 4).slice(0, 2);
        causes.push({
            key: 'grammar', title: '文法',
            evidence: [
                `文法を直接問う問題の正答率 ${Math.round(ga * 100)}% (${gram.correct}/${gram.total})`,
                ...worst.map(w => `特に「${w.label.replace('P5 ', '')}」で ${w.wrong}/${w.total} ミス`),
            ],
            severity: Math.round((0.7 - ga) * 200),
        });
    }

    /* リスニング */
    if (r.hasListening) {
        const lTotal = r.partAcc.filter(p => p.part <= 4).reduce((a, p) => a + p.total, 0);
        const lAcc = lTotal > 0 ? r.correctL / lTotal : null;
        const rTotal = r.partAcc.filter(p => p.part >= 5).reduce((a, p) => a + p.total, 0);
        const rAcc = rTotal > 0 ? r.correctR / rTotal : null;
        if (lAcc != null && rAcc != null && lTotal >= 30 && lAcc < rAcc - 0.12) {
            causes.push({
                key: 'listening', title: 'リスニング',
                evidence: [`解答した中の正答率: L ${Math.round(lAcc * 100)}% / R ${Math.round(rAcc * 100)}% -- 差 ${Math.round((rAcc - lAcc) * 100)} ポイント`],
                severity: Math.round((rAcc - lAcc) * 250),
            });
        }
    }

    /* 推論・間接系 (音の聞き取りでなく「言っていないことを掴む」側) */
    const infLabels = ['P2 間接応答', 'P7 推論', 'P7 人物推論', 'P7 発言の意図', 'P3 発言の意図', 'P4 発言の意図'];
    let infW = 0, infT = 0;
    const infHit: string[] = [];
    r.labelStats.forEach(s => {
        if (infLabels.includes(s.label)) {
            infW += s.wrong; infT += s.total;
            if (s.wrong / s.total >= 0.5 && s.total >= 3) infHit.push(`${s.label} ${s.wrong}/${s.total} ミス`);
        }
    });
    if (infT >= 6 && infW / infT >= 0.4) {
        causes.push({
            key: 'inference', title: '推論・間接応答',
            evidence: [`直接書かれていないことを問う問題で ${infW}/${infT} ミス`, ...infHit],
            severity: Math.round((infW / infT) * 100),
        });
    }

    /* まぐれ */
    const lucky = r.luckyL + r.luckyR;
    if (lucky >= 5) {
        causes.push({
            key: 'lucky', title: 'まぐれ正解',
            evidence: [`勘フラグ付きの正解が ${lucky} 問。素点はその分だけ実力より高く出ている`],
            severity: Math.min(60, lucky * 4),
        });
    }

    return causes.sort((a, b) => b.severity - a.severity);
}

/* ================================================================
   処方箋
   ================================================================ */

export interface Prescription {
    title: string;
    body: string;
    link?: { href: string; label: string };
}

export function prescribe(causes: Cause[], intake: DoctorIntake): Prescription[] {
    const out: Prescription[] = [];
    const has = (k: CauseKey) => causes.some(c => c.key === k);

    if (has('time')) {
        out.push({
            title: '時間: 1問を捨てる練習',
            body: 'Part 5 は1問20秒で切る。20秒で決まらない問題は知識が無いのであって、粘っても正答率は上がらない。毎日10問だけ時間を計って解き、切る感覚を体に入れる。Part 7 は設問を先に読んでから本文に入る。全部読んでから設問に戻る読み方は、この時間配分では破綻する。',
            link: { href: '/english/training', label: 'トレーニングの TIME ATTACK で計測練習' },
        });
    }
    if (has('vocab')) {
        out.push({
            title: '語彙: 落とした語をその場で回収',
            body: '弱点レポートの「落とした問題に出てきた単語」を毎回全部 Words に登録する。新しい単語帳を買うより、自分が実際に落とした語のほうが優先度の根拠がある。毎日の復習に混ぜて、次の模試で同じ語では落とさない状態を作る。',
            link: { href: '/english/training', label: 'Words の毎日復習' },
        });
    }
    if (has('grammar')) {
        out.push({
            title: '文法: ミスの型だけ潰す',
            body: '文法全体をやり直す必要はない。上の診断に出ている型 (品詞・動詞形・前置詞など) だけ、模試の解説を根拠が言えるまで読み直す。「なんとなくこれ」で正解した問題も同じ扱いにする。次の模試で同じタグのミスが減っているかで効果を測る。',
        });
    }
    if (has('listening')) {
        out.push({
            title: intake.audioOk ? 'リスニング: 移動時間を全部スクリプトに変える' : 'リスニング: スクリプトの黙読から',
            body: intake.audioOk
                ? '模試のスクリプトを「読めば分かる」状態にしてから、同じ音声を通勤で回す。読んで分からない英文は何回聞いても分からない。読めば分かるのに聞き取れない箇所だけが、リスニングの練習になる。'
                : '音声を流せる環境が無いなら、まずスクリプトを黙読して「読めば分かる」を確認する。読んで分からないものは語彙・文法の問題としてそちらの処方に回す。',
        });
    }
    if (has('inference')) {
        out.push({
            title: '推論: 言い換えを追う',
            body: '間接応答と推論問題は、本文・音声の表現がそのまま選択肢に出ない。正解した問題も含めて「本文のどの表現が、選択肢のどの表現に言い換えられたか」を解説で1組ずつ確認する。この対応表が頭にある人だけが、初見の言い換えに反応できる。',
        });
    }
    if (has('lucky')) {
        out.push({
            title: 'まぐれ: 勘の正解を疑う',
            body: '勘フラグを付けた正解は次回は消えると考える。フラグ付きの問題は誤答と同じ扱いで解説を読む。逆に、勘を付けずに正解した問題は復習しなくていい。復習対象を減らすためのフラグでもある。',
        });
    }
    if (out.length === 0) {
        out.push({
            title: '維持: 模試の回転数を上げる',
            body: '目立った主因が出ていない。この状態なら弱点探しより回転数で、別の回を本番と同じ時間で解いて、診断が同じ結論を出すか確かめる。2回連続で同じ結論なら、その診断は信用していい。',
        });
    }
    return out;
}

/* ================================================================
   到達予測
   ================================================================ */

export interface Projection {
    weeklyHours: number;
    weeksLeft: number | null;
    totalHours: number | null;
    expectedGain: number | null;
    /** 目標に必要な時間 (h) */
    hoursNeeded: number | null;
    verdict: 'reachable' | 'tight' | 'unreachable' | 'no-date' | 'no-base';
}

export function project(intake: DoctorIntake, estimatedNow: number | null): Projection {
    const weeklyHours = (intake.weekdayMin * 5 + intake.weekendMin * 2) / 60;
    const base = intake.currentScore ?? estimatedNow;
    if (base == null) {
        return { weeklyHours, weeksLeft: null, totalHours: null, expectedGain: null, hoursNeeded: null, verdict: 'no-base' };
    }
    const gap = intake.targetScore - base;
    const hoursNeeded = gap <= 0 ? 0 : Math.round(gap * hoursPer100(base) / 100);
    if (!intake.examDate) {
        return { weeklyHours, weeksLeft: null, totalHours: null, expectedGain: null, hoursNeeded, verdict: 'no-date' };
    }
    const weeksLeft = Math.max(0, (new Date(intake.examDate).getTime() - Date.now()) / (7 * 24 * 3600 * 1000));
    const totalHours = Math.round(weeksLeft * weeklyHours);
    const expectedGain = Math.round(totalHours / hoursPer100(base) * 100);
    const verdict = gap <= 0 ? 'reachable'
        : totalHours >= hoursNeeded * 1.2 ? 'reachable'
            : totalHours >= hoursNeeded * 0.8 ? 'tight'
                : 'unreachable';
    return { weeklyHours: Math.round(weeklyHours * 10) / 10, weeksLeft: Math.round(weeksLeft * 10) / 10, totalHours, expectedGain, hoursNeeded, verdict };
}
