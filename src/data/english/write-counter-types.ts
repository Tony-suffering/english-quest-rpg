// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-counter-types.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE COUNTER -- ライトパス30本の「裏」。各トピックの逆の立場の模範解答。
 *
 * 【なぜ裏が要るのか】
 * 表(write-eiken1.ts)は全トピック片側だけの立場で書かれている。試験では
 * どちらの側でも書ける必要があるし、逆側を持っていないと反論が想像できない。
 *
 * 【型の使い回しがルール】
 * 裏は表と同じ普遍フレーム(There is much debate over whether... / plays a
 * crucial role in... / A prime example of this is...)を使い回して書く。
 * 同じ型に別の単語を埋めると逆の意見が出てくる = 型が普遍である証明。
 * 文体は表と同じ試験の文体(200-240語、序論→本論3→結論)。
 *
 * 【著作権】お題・英文はすべてオリジナル。実際の検定試験の問題は転載していない。
 */

export interface CounterEssayDay {
    /** write-eiken1.ts の day と同じ 1-30 */
    day: number;
    /** 逆の立場(英語)。表の stance の反対 */
    stance: string;
    stanceJa: string;
    /** 模範解答。段落は \n\n 区切り。序論→本論3→結論の5段落 */
    essay: string;
    essayJa: string;
    wordCount: number;
}
