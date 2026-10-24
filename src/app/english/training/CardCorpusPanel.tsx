'use client';

// カードの英文に数字を付ける。
//
// /english/corpus/words と /english/corpus/full は「表を眺めるページ」で、
// いま手に持っているカードとは切れていた。ここでつなぐ。
//
// 話し言葉と書き言葉を2列で出すのが肝。
// Admittedly, treaties have reduced certain arsenals. のような文は、
// 話し言葉の頻度だけ見ると全部ゼロに近くて何も言えない。
// 書き言葉では treaty も arsenal も普通に出る。
// 「耳では来ないが、読み物では来る」——その乖離がこのカードの正体なので、
// 混ぜずに並べる。
//
// データ: public/data/card-index.json (scripts/build-card-index.mjs が作る)

import { useEffect, useState } from 'react';

type Raw = {
    lifetimeM: number;
    words: { t: string; s: number[]; r: number[]; l?: number[] };
    chunks: { t: string; q?: Record<string, string>; f?: Record<string, string>; h: number[]; k: number[]; s: number[]; y: number[]; m: number[]; w: number[]; l: number[]; d?: number[] };
    /** 薄い層。在ることと生涯何回かだけ持つ。meted out(15回) や duck under(8回) はここ */
    tail?: { t: string; h: number[]; d?: number[] };
};

type WordHit = { word: string; spoken: number; written: number; rank: number; lemma: string };
type ChunkHit = {
    text: string;       // 見せる語形 (let up)
    forms: string[];    // 束ねた語形 (let up / letting up)
    hits: number; kind: number; sub: number; yt: number; mov: number; written: number;
    level: number; rank: number;
    /** Wiktionary にも項目がある = 確立した表現 */
    dict: boolean;
};

type Index = {
    lifetimeM: number;
    words: Map<string, WordHit>;
    /** 見出し形 -> 熟語。カード側は語を見出し形に直してから引く */
    chunks: Map<string, ChunkHit>;
    /** 語 -> 見出し形。規則は作る側が持っていて、こちらは引くだけ */
    lemma: Map<string, string>;
    /** 見出し形 -> その語形すべて。語形まとめの表示に使う */
    family: Map<string, string[]>;
    /** 先頭語 -> その語で始まる見出し形。離れた語をつなぐ探索に使う */
    byFirst: Map<string, string[]>;
    /** 薄い層。見出し形 -> 生涯回数 */
    tail: Map<string, { hits: number; dict: boolean }>;
};

/** 1セッションに1回だけ読む。カードをめくるたびに落とさない */
let cache: Index | null = null;
let inflight: Promise<Index | null> | null = null;

async function loadIndex(): Promise<Index | null> {
    if (cache) return cache;
    if (inflight) return inflight;
    inflight = (async () => {
        try {
            const raw: Raw = await (await fetch('/data/card-index.json')).json();
            const list = raw.words.t.split(' ');
            const words = new Map<string, WordHit>();
            const lemma = new Map<string, string>();
            const family = new Map<string, string[]>();
            list.forEach((w, i) => {
                const base = list[raw.words.l?.[i] ?? i] ?? w;
                words.set(w, { word: w, spoken: raw.words.s[i], written: raw.words.r[i], rank: i + 1, lemma: base });
                lemma.set(w, base);
                const f = family.get(base);
                if (f) f.push(w);
                else family.set(base, [w]);
            });

            const shown = raw.chunks.t.split('\n');
            /**
             * 見出し形の層が入る前に焼いた引き当て表でも動くようにしておく。
             * 表とコードは別々に配られるので、片方だけ新しい瞬間が必ずある。
             * そのとき「引き当て表がありません」を出すのは、ただの事故。
             */
            // q と f は「見せる語形と違う行だけ」の疎な表。無い行は見せる語形と同じ
            const obj = (v: unknown) => (v && typeof v === 'object' ? v as Record<string, string> : {});
            const keyAt = obj(raw.chunks.q);
            const formAt = obj(raw.chunks.f);
            const dictSet = new Set(raw.chunks.d ?? []);
            const chunks = new Map<string, ChunkHit>();
            shown.forEach((c, i) => {
                chunks.set(keyAt[i] ?? c, {
                    text: c,
                    forms: (formAt[i] ?? c).split('|'),
                    hits: raw.chunks.h[i],
                    kind: raw.chunks.k[i],
                    sub: raw.chunks.s[i],
                    yt: raw.chunks.y[i],
                    mov: raw.chunks.m[i],
                    written: raw.chunks.w[i],
                    level: raw.chunks.l[i],
                    rank: i + 1,
                    dict: dictSet.has(i),
                });
            });
            /**
             * 先頭語で引ける表。
             * take care of は「taken such sweet good care of」のように
             * 間に語が入る形で出てくるほうが普通で、連続一致だけでは一生当たらない。
             * 全部の熟語を毎回試すのは重いので、先頭語で候補を絞ってから伸ばす。
             */
            const tail = new Map<string, { hits: number; dict: boolean }>();
            if (raw.tail?.t) {
                const td = new Set(raw.tail.d ?? []);
                raw.tail.t.split(String.fromCharCode(10)).forEach((k, i) => { if (k) tail.set(k, { hits: raw.tail!.h[i], dict: td.has(i) }); });
            }

            const byFirst = new Map<string, string[]>();
            for (const key of [...chunks.keys(), ...tail.keys()]) {
                const head = key.slice(0, key.indexOf(' '));
                const list = byFirst.get(head);
                if (list) list.push(key);
                else byFirst.set(head, [key]);
            }
            cache = { lifetimeM: raw.lifetimeM, words, chunks, lemma, family, byFirst, tail };
            return cache;
        } catch {
            return null;
        } finally {
            inflight = null;
        }
    })();
    return inflight;
}

/**
 * 実例。見出し形ごとに、コーパスから拾った本物の台詞を持っている。
 *
 * Weblio で wander off を引くと11件出るが、中身は Tanaka Corpus と Tatoeba の
 * 作例と1928年の斎藤和英大辞典で、同じ文が2回入っている。
 * こちらは3億4,000万語から拾った実際の発話。
 *
 * 頭文字ごとにファイルを分けてあるので、そのカードに要る文字だけ読む。
 */
type Sample = [text: string, source: string];
const exCache = new Map<string, Record<string, Sample[]> | null>();
const exPending = new Map<string, Promise<void>>();

async function loadExamples(letters: string[]): Promise<void> {
    await Promise.all(letters.map(async (k) => {
        if (exCache.has(k)) return;
        let p = exPending.get(k);
        if (!p) {
            p = (async () => {
                try {
                    const r = await fetch(`/data/examples/${k}.json`);
                    exCache.set(k, r.ok ? await r.json() : null);
                } catch {
                    exCache.set(k, null);
                } finally {
                    exPending.delete(k);
                }
            })();
            exPending.set(k, p);
        }
        await p;
    }));
}

const examplesFor = (key: string): Sample[] => {
    const k = /^[a-z]/.test(key) ? key[0] : '_';
    return exCache.get(k)?.[key] ?? [];
};

/**
 * 機能語。これだけで出来た組は文法であって表現ではない。
 *
 * 離れた一致を許すと you have always taken such から you have such が当たる。
 * 429回あるが、覚える対象ではない。
 */
const FUNC = new Set(`
a an the this that these those such
i you he she it we they me him her us them my your his its our their
is am are was were be been being do does did done have has had having
will would shall should can could may might must not no never
of in on at to for with by from into onto about over under through
and or but so if then than as because while when where what which who how why
very too also just only even still there here
`.trim().split(/\s+/));

const KIND_NAME = ['句動詞', '決まり文句', 'ことわざ', '成句', 'その他'];

/**
 * 語形の一覧を出す。Weblio の「変形一覧」に当たるところ。
 * 向こうは一覧が出るだけで、こちらは1形ずつの実測が付く。
 *
 * 規則は作る側(build-card-index.mjs)が持っていて、ここは結果を引くだけ。
 * 両側で別々に規則を書くと、必ずどこかでずれる。
 */
function familyOf(word: string, index: Index): WordHit[] {
    const base = index.lemma.get(word);
    if (!base) return [];
    const forms = index.family.get(base) ?? [];
    if (forms.length < 2) return [];
    const hits = forms
        .map((f) => index.words.get(f))
        .filter(Boolean)
        .sort((x, y) => (y!.spoken + y!.written) - (x!.spoken + x!.written)) as WordHit[];
    // gooding / sweeting / haves のような、コーパスの雑音として実在するだけの形を落とす。
    // 一番出る形の1%に満たないものは、語形ではなく事故
    const top = hits[0] ? hits[0].spoken + hits[0].written : 0;
    return hits.filter((h) => h.spoken + h.written >= top * 0.01);
}

const tokenize = (s: string) => s.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? [];

const num = (v: number) => (v >= 10000 ? Math.round(v).toLocaleString() : v >= 100 ? Math.round(v).toLocaleString() : v >= 10 ? v.toFixed(0) : v >= 1 ? v.toFixed(1) : v.toFixed(2));

/**
 * 文から熟語を拾う。カードのチップと数字パネルで同じものを使う。
 * 2箇所に別々に書くと、片方だけ直したときに必ずずれる。
 */
export type FoundChunk = ChunkHit & { asWritten: string; key: string; slim: boolean; gapped: boolean };

export function findChunks(text: string, index: Index): FoundChunk[] {
    const tokens = tokenize(text);
    const base = tokens.map((w) => index.lemma.get(w) ?? w);

    const lookup = (k: string): ChunkHit | null => {
        const rich = index.chunks.get(k);
        if (rich) return rich;
        const t = index.tail.get(k);
        if (!t) return null;
        return { text: k, forms: [k], hits: t.hits, kind: 4, sub: 0, yt: 0, mov: 0, written: 0, level: 0, rank: 0, dict: t.dict };
    };
    /** 覚える対象の形か。全部が機能語の組は落とす */
    const meaty = (key: string) => key.split(' ').some((w) => !FUNC.has(w));

    type Cand = { key: string; idx: number[]; hit: ChunkHit; gapped: boolean };
    const cand: Cand[] = [];

    // 連続一致
    for (let i = 0; i < tokens.length; i++) {
        for (let n = 2; n <= 7 && i + n <= tokens.length; n++) {
            const key = base.slice(i, i + n).join(' ');
            const hit = lookup(key);
            if (!hit || !meaty(key)) continue;
            cand.push({ key, idx: Array.from({ length: n }, (_, k) => i + k), hit, gapped: false });
        }
    }

    /**
     * 離れた一致。take care of は「taken such sweet good care of」の形で出るほうが普通で、
     * 連続一致だけでは当たらない。間に入れるのは合計3語まで。
     */
    const MAX_GAP = 3;
    for (let i = 0; i < tokens.length; i++) {
        for (const key of index.byFirst.get(base[i]) ?? []) {
            const parts = key.split(' ');
            if (parts.length < 2 || !meaty(key)) continue;
            // 内容語から始まるものだけ。the only (family) (business) people を防ぐ
            if (FUNC.has(parts[0])) continue;
            const idx = [i];
            let at = i + 1;
            let gap = 0;
            let ok = true;
            for (let w = 1; w < parts.length; w++) {
                let step = 0;
                while (at < tokens.length && base[at] !== parts[w] && step < MAX_GAP - gap) {
                    // またげるのはありふれた語だけ。hairpin(32,671位)をまたいだ時点で別の句
                    const r = index.words.get(tokens[at])?.rank ?? 0;
                    if (r === 0 || r > 8000) { ok = false; break; }
                    at++; step++;
                }
                if (!ok || at >= tokens.length || base[at] !== parts[w]) { ok = false; break; }
                gap += step;
                idx.push(at);
                at++;
            }
            if (!ok || gap === 0) continue;   // 隙間ゼロは連続一致で入っている
            /**
             * 隙間が語数より多いものは切る。
             * wait out the rain till it lets up から wait till(3,740回) が
             * 2語のために3語をまたいで成立してしまう。あれは別の句。
             */
            if (gap > parts.length) continue;
            const hit = lookup(key);
            if (!hit) continue;
            cand.push({ key, idx, hit, gapped: true });
        }
    }

    /**
     * 全部の候補を同じ土俵で並べてから、重ならないものを取る。
     *
     * 連続一致を先に確定させると、care of(22,704回) が場所を取って
     * take care of(15,825回) が入れない。文の意味としては後者が正しい。
     * かといって長さだけで採ると take such good care of me(5回) を拾う。
     *
     * 回数に語数の重みを掛けて釣り合わせる。1語増えるごとに3倍。
     * 離れた一致は連続一致より確からしさが落ちるので0.6を掛ける。
     *   take care of  15,825 x 3 x 0.6 = 28,485  <- 採る
     *   care of       22,704 x 1       = 22,704
     *   take such good care of me  5 x 81 x 0.6 = 243
     */
    const score = (c: Cand) => c.hit.hits * Math.pow(3, c.idx.length - 2) * (c.gapped ? 0.6 : 1);

    /**
     * 選び方は3段。
     *
     * 1. 辞書に在るより大きい表現に丸ごと含まれるものは捨てる
     *      care of は take care of の一部。let off は let off steam の一部。
     *      統計だけの長い並び(take such good care of me)には、この力を持たせない。
     * 2. 辞書に在るものを先に採る
     *      the buck stop(15回) が stop with(442回) に埋もれないように。
     *      回数だけで並べると、一般的で薄い並びが具体的な表現に勝ってしまう。
     * 3. 連続一致を先に採り、最後に重みで比べる
     *      hairpin turn(連続) が turn to(離れて) に負けないように。
     */
    const sets = cand.map((c) => new Set(c.idx));
    const kept = cand.filter((c, i) => !cand.some((d, k) =>
        k !== i && d.hit.dict && d.idx.length > c.idx.length && c.idx.every((z) => sets[k].has(z))));
    kept.sort((a, b) =>
        (a.hit.dict ? 0 : 1) - (b.hit.dict ? 0 : 1)
        || (a.gapped ? 1 : 0) - (b.gapped ? 1 : 0)
        || score(b) - score(a));
    cand.length = 0;
    cand.push(...kept);

    const taken = new Set<number>();
    const found: FoundChunk[] = [];
    for (const c of cand) {
        if (c.idx.some((k) => taken.has(k))) continue;
        c.idx.forEach((k) => taken.add(k));
        const from = c.idx[0];
        const to = c.idx[c.idx.length - 1];
        const asWritten = c.gapped
            ? tokens.slice(from, to + 1).map((w, k) => (c.idx.includes(from + k) ? w : `(${w})`)).join(' ')
            : tokens.slice(from, to + 1).join(' ');
        found.push({ ...c.hit, asWritten, key: c.key, slim: !index.chunks.has(c.key), gapped: c.gapped });
    }
    found.sort((a, b) => b.hits - a.hits);
    return found;
}

export function CardChunkChips({ text, onLookup }: {
    text: string;
    onLookup: (kind: 'pp' | 'yg', phrase: string) => void;
}) {
    const [index, setIndex] = useState<Index | null>(cache);

    useEffect(() => {
        if (cache) { setIndex(cache); return; }
        let alive = true;
        const start = () => { void loadIndex().then((i) => { if (alive) setIndex(i); }); };
        const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
        if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 3000 });
        else setTimeout(start, 1200);
        return () => { alive = false; };
    }, []);

    if (!index) return null;
    const found = findChunks(text, index).slice(0, 5);
    if (!found.length) return null;

    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '5px',
            padding: '4px 10px 8px', justifyContent: 'center',
        }}>
            {found.map((c) => (
                <button
                    key={c.key}
                    onClick={() => onLookup('pp', c.text)}
                    title={`${c.text} を実際の映像で聞く（生涯${c.hits.toLocaleString()}回）`}
                    style={{
                        display: 'inline-flex', alignItems: 'baseline', gap: '5px',
                        padding: '3px 9px', borderRadius: '999px',
                        border: '1px solid #E7D9A8', background: '#FFFBEB',
                        color: '#92400E', fontSize: '11px', fontWeight: 600,
                        cursor: 'pointer', whiteSpace: 'nowrap', maxWidth: '100%',
                    }}
                >
                    <span>{c.text}</span>
                    <span style={{ fontSize: '9px', opacity: 0.65, fontWeight: 500 }}>
                        {c.hits > 0 ? `${c.hits.toLocaleString()}回` : c.written > 0 ? '書' : '辞書'}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default function CardCorpusPanel({ text, onLookup }: {
    text: string;
    /** 見出し語が決まっているので、PP と YG は単語選びなしで飛べる */
    onLookup?: (kind: 'pp' | 'yg', phrase: string) => void;
}) {
    const [index, setIndex] = useState<Index | null>(cache);
    const [loading, setLoading] = useState(!cache);
    const [exReady, setExReady] = useState(0);
    const [showCommon, setShowCommon] = useState(false);

    useEffect(() => {
        let alive = true;
        if (cache) return;
        setLoading(true);
        loadIndex().then((i) => {
            if (!alive) return;
            setIndex(i);
            setLoading(false);
        });
        return () => { alive = false; };
    }, []);

    // このカードに要る頭文字の実例だけ読む。カード全部ぶんは3MB近くある
    useEffect(() => {
        if (!index) return;
        const tk = tokenize(text);
        const bs = tk.map((w) => index.lemma.get(w) ?? w);
        const letters = new Set<string>();
        for (let i = 0; i < bs.length; i++) {
            for (let n = 2; n <= 7 && i + n <= bs.length; n++) {
                const k = bs.slice(i, i + n).join(' ');
                if (index.chunks.has(k)) letters.add(/^[a-z]/.test(k) ? k[0] : '_');
            }
        }
        if (!letters.size) return;
        let alive = true;
        void loadExamples([...letters]).then(() => { if (alive) setExReady((v) => v + 1); });
        return () => { alive = false; };
    }, [text, index]);

    if (loading) {
        return <div style={{ padding: '14px', fontSize: '11px', color: '#A8A29E', textAlign: 'center' }}>コーパスを読んでいます</div>;
    }
    if (!index) {
        return (
            <div style={{ padding: '14px', fontSize: '11px', color: '#A8A29E', textAlign: 'center' }}>
                引き当て表がありません。<code>node scripts/build-card-index.mjs</code> を回してください
            </div>
        );
    }

    const tokens = tokenize(text);
    const L = index.lifetimeM;

    /**
     * カードに書いてある語形を、いったん見出し形に直してから引く。
     *
     * これが無いと lets up は空振りする。在庫には let up と letting up はあるが、
     * 三単現の行は1つも無いため。カードの文字列でそのまま引く実装は、
     * この1語のためだけに黙って外れる。
     */
    const found = findChunks(text, index);


    // 単語。同じ語が2回出ても1行にする
    const seen = new Set<string>();
    const words = tokens
        .filter((w) => (seen.has(w) ? false : (seen.add(w), true)))
        .map((w) => index.words.get(w) ?? { word: w, spoken: 0, written: 0, rank: 0, lemma: w })
        .sort((a, b) => a.spoken - b.spoken || a.written - b.written);

    // この文がどちら側の英語なのか。
    // 上位300語(the of is you...)を入れると、どの文もその合計に飲まれて差が出ない。
    // 語域の違いが出るのは中身の語のほうなので、そこだけで比べる
    const content = words.filter((w) => w.rank === 0 || w.rank > 300);
    const pool = content.length ? content : words;
    const sumS = pool.reduce((s, w) => s + w.spoken, 0);
    const sumR = pool.reduce((s, w) => s + w.written, 0);
    const lean = sumR > sumS * 1.3 ? 'written' : sumS > sumR * 1.3 ? 'spoken' : 'both';
    const rarest = words[0];

    // exReady は「実例が届いた」の合図。値は使わないが、届いたら描き直す
    void exReady;

    /**
     * 上位の語は出さない。
     * you / of / have は毎回出るうえ、中学生でも知っている。
     * 毎カード同じ行が並ぶと、本当に見たい語が埋もれる。
     */
    const COMMON_RANK = 2000;
    const notable = words.filter((w) => w.rank === 0 || w.rank > COMMON_RANK);
    const commonCount = words.length - notable.length;
    const shownWords = showCommon ? words : notable;

    const cell: React.CSSProperties = { padding: '4px 6px', fontSize: '10px', textAlign: 'right', whiteSpace: 'nowrap' };
    const head: React.CSSProperties = { ...cell, color: '#A8A29E', fontWeight: 600, fontSize: '9px', letterSpacing: '0.04em' };

    return (
        <div style={{ padding: '10px 12px 14px', background: '#FAFAF9', borderTop: '1px solid #E7E5E4' }}>
            {/* この文の正体 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{
                    padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                    background: lean === 'written' ? '#EFF6FF' : lean === 'spoken' ? '#ECFDF5' : '#FFFBEB',
                    color: lean === 'written' ? '#2563EB' : lean === 'spoken' ? '#059669' : '#B45309',
                    border: `1px solid ${lean === 'written' ? '#BFDBFE' : lean === 'spoken' ? '#A7F3D0' : '#FDE68A'}`,
                }}>
                    {lean === 'written' ? '書き言葉寄り' : lean === 'spoken' ? '話し言葉寄り' : '両方で出る'}
                </span>
                <span style={{ fontSize: '10px', color: '#78716C' }}>
                    話 {num(sumS)} / 書 {num(sumR)}（100万語あたりの合計）
                </span>
                {rarest && (
                    <span style={{ fontSize: '10px', color: '#78716C' }}>
                        一番レアな語 <strong style={{ color: '#292524' }}>{rarest.word}</strong>
                        {rarest.rank ? `（話し言葉 ${rarest.rank.toLocaleString()}位）` : '（表の外）'}
                    </span>
                )}
            </div>

            {/* 熟語として登録されている並び */}
            {found.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '9px', color: '#A8A29E', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '4px' }}>
                        この文に入っている熟語 {found.length} 件
                    </div>
                    {found.map((c) => (
                        <div key={c.text} style={{
                            padding: '6px 8px', marginBottom: '3px', borderRadius: '5px',
                            background: '#fff', border: '1px solid #E7E5E4',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#292524' }}>{c.text}</span>
                                {c.asWritten !== c.text && (
                                    <span style={{ fontSize: '10px', color: '#B45309' }}>
                                        カードでは {c.asWritten}
                                    </span>
                                )}
                                <span style={{ fontSize: '9px', color: '#A8A29E' }}>{KIND_NAME[c.kind] ?? ''}</span>
                                {c.dict && (
                                    <span
                                        title="Wiktionary に項目がある = 確立した表現"
                                        style={{ fontSize: '9px', color: '#0F766E', fontWeight: 700, border: '1px solid #99F6E4', background: '#F0FDFA', borderRadius: '3px', padding: '1px 5px' }}
                                    >
                                        辞書
                                    </span>
                                )}
                                {c.hits > 0 ? (
                                    <span style={{ fontSize: '10px', color: '#B45309', fontWeight: 700 }}>生涯 {c.hits.toLocaleString()} 回</span>
                                ) : c.written > 0 ? (
                                    <span style={{ fontSize: '10px', color: '#2563EB', fontWeight: 700 }}>
                                        書き言葉のみ 生涯 {Math.round(c.written * L).toLocaleString()} 回
                                    </span>
                                ) : (
                                    <span style={{ fontSize: '10px', color: '#9A3412', fontWeight: 700 }}>
                                        3億4,000万語に0回
                                    </span>
                                )}
                                {c.rank > 0 && <span style={{ fontSize: '9px', color: '#A8A29E' }}>{c.rank.toLocaleString()}位</span>}
                                {c.gapped && <span style={{ fontSize: '9px', color: '#7C3AED', fontWeight: 600 }}>離れて出現</span>}
                                {c.level > 0 && c.level <= 100 && <span style={{ fontSize: '9px', color: '#059669', fontWeight: 600 }}>課程 Lv.{c.level}</span>}
                                {onLookup && (
                                    <span style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                                        <button
                                            onClick={() => onLookup('pp', c.text)}
                                            style={{
                                                padding: '2px 7px', borderRadius: '4px', border: 'none',
                                                background: 'linear-gradient(135deg, #D4AF37, #F5D76E)',
                                                color: '#1a1a1a', fontSize: '9px', fontWeight: 700, cursor: 'pointer',
                                            }}
                                        >
                                            PP
                                        </button>
                                        <button
                                            onClick={() => onLookup('yg', c.text)}
                                            style={{
                                                padding: '2px 7px', borderRadius: '4px', border: '1px solid #ddd',
                                                background: 'transparent', color: '#999', fontSize: '9px',
                                                fontWeight: 600, cursor: 'pointer',
                                            }}
                                        >
                                            YG
                                        </button>
                                    </span>
                                )}
                            </div>
                            <div style={{ marginTop: '3px', fontSize: '9px', color: '#78716C' }}>
                                {c.slim ? (
                                    <span style={{ color: '#A8A29E' }}>語域の内訳は<a href="/english/corpus/full" target="_blank" rel="noreferrer" style={{ color: '#78716C' }}>網羅版</a>で</span>
                                ) : (
                                    <>字幕 {num(c.sub)} / ようつべ {num(c.yt)} / 映画 {num(c.mov)} / 書き {num(c.written)}</>
                                )}
                                {c.forms.length > 1 && (
                                    <span style={{ marginLeft: '8px', color: '#A8A29E' }}>
                                        語形 {c.forms.join(' / ')} を合算
                                    </span>
                                )}
                            </div>
                            {/* 実例。作例ではなく、誰かが本当に言った文 */}
                            {examplesFor(c.key).map(([line, src], k) => (
                                <div key={k} style={{
                                    marginTop: '4px', paddingLeft: '8px',
                                    borderLeft: '2px solid #E7E5E4',
                                }}>
                                    <div style={{ fontSize: '11px', color: '#44403C', lineHeight: 1.5 }}>{line}</div>
                                    <div style={{ fontSize: '9px', color: '#A8A29E' }}>{src}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* 1語ずつ */}
            <div style={{ fontSize: '9px', color: '#A8A29E', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '4px' }}>
                1語ずつ（レアな順）
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '5px', border: '1px solid #E7E5E4' }}>
                    <thead>
                        <tr>
                            <th style={{ ...head, textAlign: 'left' }}>語</th>
                            <th style={head}>話し言葉/M</th>
                            <th style={head}>書き言葉/M</th>
                            <th style={head}>生涯（話）</th>
                            <th style={head}>順位</th>
                            <th style={head}>聞く</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shownWords.map((w) => {
                            // 「読む語」の印。耳では来ないが読み物では来る語
                            const gap = w.written > w.spoken * 3 && w.written >= 2;
                            const fam = w.rank ? familyOf(w.word, index) : [];
                            const famS = fam.reduce((s, f) => s + f.spoken, 0);
                            const famR = fam.reduce((s, f) => s + f.written, 0);
                            return (
                                <tr key={w.word} style={{ borderTop: '1px solid #F5F5F4' }}>
                                    <td style={{ ...cell, textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#292524' }}>
                                        {w.word}
                                        {gap && <span style={{ marginLeft: '5px', fontSize: '9px', color: '#2563EB', fontWeight: 600 }}>読む語</span>}
                                        {fam.length > 1 && (
                                            <div style={{ fontWeight: 400, fontSize: '9px', color: '#A8A29E', marginTop: '2px' }}>
                                                {fam.map((f) => f.word).join(' / ')} 計 話{num(famS)} 書{num(famR)}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ ...cell, color: w.spoken ? '#292524' : '#D6D3D1' }}>{w.spoken ? num(w.spoken) : '—'}</td>
                                    <td style={{ ...cell, color: w.written ? '#292524' : '#D6D3D1' }}>{w.written ? num(w.written) : '—'}</td>
                                    <td style={{ ...cell, color: '#B45309', fontWeight: 600 }}>
                                        {w.spoken ? Math.round(w.spoken * L).toLocaleString() : '—'}
                                    </td>
                                    <td style={{ ...cell, color: '#A8A29E' }}>{w.rank ? w.rank.toLocaleString() : '—'}</td>
                                    <td style={{ ...cell, whiteSpace: 'nowrap' }}>
                                        {onLookup && (
                                            <>
                                                <button
                                                    onClick={() => onLookup('pp', w.word)}
                                                    title={`${w.word} を実際の映画で聞く`}
                                                    style={{
                                                        padding: '2px 6px', borderRadius: '4px', border: 'none',
                                                        background: 'linear-gradient(135deg, #D4AF37, #F5D76E)',
                                                        color: '#1a1a1a', fontSize: '9px', fontWeight: 700, cursor: 'pointer',
                                                    }}
                                                >
                                                    PP
                                                </button>
                                                <button
                                                    onClick={() => onLookup('yg', w.word)}
                                                    title={`${w.word} を YouTube で聞く`}
                                                    style={{
                                                        marginLeft: '3px', padding: '2px 6px', borderRadius: '4px',
                                                        border: '1px solid #ddd', background: 'transparent',
                                                        color: '#999', fontSize: '9px', fontWeight: 600, cursor: 'pointer',
                                                    }}
                                                >
                                                    YG
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {commonCount > 0 && (
                    <button
                        onClick={() => setShowCommon((v) => !v)}
                        style={{
                            marginTop: '5px', padding: '4px 9px', borderRadius: '5px',
                            border: '1px solid #E7E5E4', background: '#fff',
                            color: '#78716C', fontSize: '10px', cursor: 'pointer',
                        }}
                    >
                        {showCommon ? `上位${COMMON_RANK.toLocaleString()}語をたたむ` : `よく出る語 ${commonCount} 個を出す（上位${COMMON_RANK.toLocaleString()}語）`}
                    </button>
                )}
            </div>

            <div style={{ marginTop: '8px', fontSize: '9px', color: '#A8A29E', lineHeight: 1.6 }}>
                生涯 = 100万語あたりの出現率 × {L}（20歳までに浴びる語数の見積り）。
                話し言葉は字幕・ようつべ・映画、書き言葉は論説講演・古典書籍。
                「辞書」の印は英語版 Wiktionary（CC BY-SA）に項目がある表現。
                熟語は生涯3回から拾っています（duck under 8回、meted out 29回）。さらに下は{' '}
                <a href="/english/corpus/full" target="_blank" rel="noreferrer" style={{ color: '#78716C', textDecoration: 'underline' }}>網羅版</a>
                で引けます。
            </div>
        </div>
    );
}
