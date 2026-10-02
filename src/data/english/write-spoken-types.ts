// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-spoken-types.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE SPOKEN -- ライトパス30本の口語版(2次スピーキング用)。
 *
 * 【4層のうちの3層目】
 *   1. 表 write-eiken1.ts           30本 論文体
 *   2. 裏 write-eiken1-counter-*.ts 30本 論文体・逆の立場
 *   3. 表の口語 (このファイル群)     30本 喋る英語
 *   4. 裏の口語                      30本 喋る英語・逆の立場
 * 同じお題・同じ立場を、書く形と喋る形の両方で持つ。1次と2次が同じ在庫で回る。
 *
 * 【なぜ論文体では使えないか】
 * 論文体の "Furthermore, it is imperative that..." は口から出ないし、
 * 出ても不自然に聞こえる。英検2次は 2分スピーチ + Q&A で、採点は
 * スピーチ / 応答 / 語彙文法 / 発音 の4観点。止まらないこと、崩れないこと、
 * 聞き取れることが点になる。だから短いSVO・反復・丸めた数字で書き直す。
 *
 * 【文体ルール(verify-write-spoken.cjs が機械検査)】
 *   - 1文の平均語数 16以下、最長 24語
 *   - 論文語の禁止(furthermore / moreover / consequently / nevertheless /
 *     thus / hence / utilize / endeavor / ameliorate / albeit / whereby など)
 *   - g-dropping 禁止(goin' などは不可。full -ing のみ。PP検索の互換のため)
 *   - 絵文字禁止
 *   - 総語数 200-280(2分スピーチの尺)
 *
 * 【著作権】お題・英文はすべてオリジナル。実際の検定試験の問題は転載していない。
 */

export interface SpokenEssayLine {
    en: string;
    ja: string;
}

export interface SpokenEssayDay {
    /** write-eiken1.ts の day と同じ 1-30 */
    day: number;
    /** 立場(表と同じ内容を口語で言い直したもの) */
    stance: string;
    stanceJa: string;
    /** 質問の掴み直し。理解した合図を最初に立てる */
    hook: string;
    hookJa: string;
    /** 本体。1行=1文か2文。12-18行 */
    lines: SpokenEssayLine[];
    wordCount: number;
}
