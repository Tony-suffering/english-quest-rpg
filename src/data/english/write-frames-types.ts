// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-frames-types.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE FRAMES -- ライトパス30本を「型 + 穴」に還元する。
 *
 * 【何をするものか】
 * /english/write の模範解答30本(write-eiken1.ts)は完成品として読むと
 * 「その日のお題専用の英語」に見える。だが1文ずつ X/Y/Z の穴に還元すると、
 * ほぼ全文が別のお題でも使える普遍の型でできている。それを可視化して、
 * 「単語を埋めるだけのゲーム」に変える。
 *
 * 【検証可能性 = この分解のルール】
 * frame の X/Y/Z に slots の値を代入すると、original(原文)と完全一致すること。
 * これを scripts/verify-write-frames.cjs が機械検査する。一致しない分解 =
 * 型を捏造している = 禁止。エッセイの全文がもれなく frames で覆われることも検査する。
 *
 * 【role = 左列ラベル】
 * どの文も7つの役割のどれか。30日全部が同じ7色で塗れる = 型が普遍である証明。
 */

export type FrameRole =
    | 'open'      // 導入。お題を中立に言い換える
    | 'stance'    // 立場の宣言
    | 'reason'    // 理由の見出し(First/Second/Finally)
    | 'why'       // 仕組み。理由がなぜ成り立つか
    | 'example'   // 実例・固有名詞・数字
    | 'concede'   // 譲歩。反対側を一度認める
    | 'close';    // 結論

export const ROLES: { id: FrameRole; label: string; color: string }[] = [
    { id: 'open', label: '導入', color: '#A8A29E' },
    { id: 'stance', label: '立場', color: '#D4AF37' },
    { id: 'reason', label: '理由', color: '#9A7B16' },
    { id: 'why', label: '仕組み', color: '#78716C' },
    { id: 'example', label: '実例', color: '#10B981' },
    { id: 'concede', label: '譲歩', color: '#E7A94B' },
    { id: 'close', label: '結論', color: '#1C1917' },
];

export const ROLE_BY_ID: Record<FrameRole, (typeof ROLES)[number]> =
    Object.fromEntries(ROLES.map((r) => [r.id, r])) as Record<FrameRole, (typeof ROLES)[number]>;

export interface EssayFrame {
    role: FrameRole;
    /** 型。穴は大文字1字の X / Y / Z。代入すると original に完全一致すること */
    frame: string;
    /** 型の意味(常体の日本語)。穴は X / Y のまま残す */
    ja: string;
    /** この日のエッセイで穴に入っていた中身 */
    slots: Record<string, string>;
    /** 原文(write-eiken1.ts の該当文そのまま)。検証の照合先 */
    original: string;
}

export interface EssayFrameDay {
    /** write-eiken1.ts の day と同じ 1-30 */
    day: number;
    /** エッセイの文順。全文をもれなく覆う */
    frames: EssayFrame[];
}
