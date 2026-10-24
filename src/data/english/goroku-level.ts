/**
 * 俺語録の平準化 — 溜まった言葉を、型と語尾で数える。
 *
 * 【何のためか】
 * 本人の言葉を保存し続けると、次に何を言うかが読めるようになる。
 * そのためには「どの型が何本溜まっていて、どの型が薄いか」が見えていないといけない。
 * ここは保存済みのログを読んで数えるだけ。判断はしない。
 *
 * 型は Journal #115 の10話型。語尾は本人の癖として実際に出ているものだけを拾う。
 */

export interface LevelRow {
    date?: string;
    source?: string;
    ja: string;
    pattern?: string;
    english: string;
}

export const PATTERNS: { n: number; ja: string; en: string }[] = [
    { n: 1, ja: 'レンガ積み', en: 'fragment stacking' },
    { n: 2, ja: '軌道', en: 'orbit and land' },
    { n: 3, ja: '許可サンドイッチ', en: 'hedge-opinion-hedge' },
    { n: 4, ja: 'エスカレーション梯子', en: 'escalation ladder' },
    { n: 5, ja: '哲学トラップドア', en: 'mundane to deep' },
    { n: 6, ja: '聴衆マルチプレックス', en: 'audience switching' },
    { n: 7, ja: 'メタ実況', en: 'meta-commentary' },
    { n: 8, ja: 'だからの川', en: 'five-way connector' },
    { n: 9, ja: '未完成の招待', en: 'trailing invitation' },
    { n: 10, ja: '英語質問爆弾', en: 'self Q and A walk' },
];

/** 本人の語尾の癖。上から順に当てて、最初に当たったもの1つ */
export const ENDINGS: { id: string; label: string; re: RegExp; note: string }[] = [
    { id: 'warai', label: '（笑）', re: /[（(]笑[)）]\s*$/, note: '詰めながら笑う。刃を出したあとに付く' },
    { id: 'yone', label: '〜よね？', re: /よね[？?]?\s*$/, note: '同意を取りにいく。答えは yes しか想定していない' },
    { id: 'daro', label: '〜だろ？', re: /(だろ|だろう|んだろ)[？?]?\s*$/, note: '確認の圧。相手に言わせる' },
    { id: 'jan', label: '〜じゃん', re: /じゃん[？?]?\s*$/, note: '当たり前だろ、の断定' },
    { id: 'desho', label: '〜でしょ', re: /でしょ[？?]?\s*$/, note: '柔らかい断定' },
    { id: 'shite', label: '〜して（指示）', re: /(して|してね|してよ|しろ|してくれ)[！!]?\s*$/, note: '命令を頼みの形で置く' },
    { id: 'kana', label: '〜かな', re: /かな[？?]?\s*$/, note: '意見を仮の形で出す' },
    { id: 'kedo', label: '〜けど（言いさし）', re: /(けど|けどね|が)[、,]?\s*$/, note: '結論を相手に取らせる' },
    { id: 'shi', label: '〜し、、、（言いさし）', re: /し[、,]{1,}\s*$/, note: '理由を並べて途中で切る' },
    { id: 'question', label: '〜？（疑問）', re: /[？?]\s*$/, note: '直球の問い' },
    { id: 'excl', label: '〜！', re: /[！!]\s*$/, note: '勢い' },
    { id: 'taigen', label: '言い切り・体言止め', re: /[^。．.]$/, note: '句点なしで置く。指示に多い' },
];

export interface LevelReport {
    total: number;
    sessions: number;
    byPattern: { n: number; ja: string; en: string; count: number }[];
    byEnding: { id: string; label: string; note: string; count: number }[];
    byMonth: { month: string; count: number }[];
    /** 一番薄い型3つ。次の会話で耳を立てる場所 */
    thin: { n: number; ja: string; count: number }[];
    /** 一番濃い語尾3つ。本人の口の癖 */
    habit: { label: string; count: number; share: number }[];
}

export function patternNumber(p?: string): number | null {
    if (!p) return null;
    const m = p.match(/#?\s*(\d{1,2})/);
    if (m) {
        const n = Number(m[1]);
        return n >= 1 && n <= 10 ? n : null;
    }
    const hit = PATTERNS.find(x => p.includes(x.ja));
    return hit ? hit.n : null;
}

export function endingOf(ja: string): string {
    const s = (ja || '').trim();
    for (const e of ENDINGS) if (e.re.test(s)) return e.id;
    return 'taigen';
}

export function levelGoroku(rows: LevelRow[]): LevelReport {
    const byP: Record<number, number> = {};
    const byE: Record<string, number> = {};
    const byM: Record<string, number> = {};
    const srcs = new Set<string>();
    for (const r of rows) {
        const n = patternNumber(r.pattern);
        if (n) byP[n] = (byP[n] || 0) + 1;
        const e = endingOf(r.ja);
        byE[e] = (byE[e] || 0) + 1;
        const m = (r.date || '').slice(0, 7);
        if (m) byM[m] = (byM[m] || 0) + 1;
        if (r.source) srcs.add((r.date || '') + '|' + r.source);
    }
    const byPattern = PATTERNS.map(p => ({ ...p, count: byP[p.n] || 0 }));
    const byEnding = ENDINGS.map(e => ({ id: e.id, label: e.label, note: e.note, count: byE[e.id] || 0 }));
    const byMonth = Object.entries(byM).sort((a, b) => a[0].localeCompare(b[0])).map(([month, count]) => ({ month, count }));
    const thin = [...byPattern].sort((a, b) => a.count - b.count || a.n - b.n).slice(0, 3).map(p => ({ n: p.n, ja: p.ja, count: p.count }));
    const total = rows.length;
    const habit = [...byEnding].filter(e => e.count > 0).sort((a, b) => b.count - a.count).slice(0, 3)
        .map(e => ({ label: e.label, count: e.count, share: total ? Math.round(100 * e.count / total) : 0 }));
    return { total, sessions: srcs.size, byPattern, byEnding, byMonth, thin, habit };
}
