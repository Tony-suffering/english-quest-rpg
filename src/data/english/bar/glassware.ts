/**
 * Silent Bartender -- glassware.
 *
 * Every glass available behind the counter. Referenced obliquely
 * by customers ("the thin glass, not the heavy one"). Part of the
 * deep material culture of the bar.
 */

export interface Glass {
    id: string;
    type: string;          // JP + EN
    size: 'small' | 'medium' | 'large';
    use: string;           // what it's for
    origin?: string;       // where it came from
}

export const GLASSWARE: Glass[] = [
    { id: 'ochoko-thin', type: 'お猪口 (薄手)', size: 'small', use: '冷酒の飲み比べに', origin: '京都の常連の贈り物' },
    { id: 'ochoko-thick', type: 'お猪口 (厚手)', size: 'small', use: '熱燗で手が火傷しないよう' },
    { id: 'tokkuri-small', type: '徳利 (小)', size: 'small', use: '一人用の熱燗' },
    { id: 'tokkuri-large', type: '徳利 (大)', size: 'medium', use: '二人で分ける時' },
    { id: 'highball-glass', type: 'ハイボールグラス', size: 'medium', use: 'ハイボール専用' },
    { id: 'rocks-glass', type: 'ロックグラス', size: 'medium', use: 'ウイスキーのロック、カクテル', origin: '権藤のNY時代' },
    { id: 'beer-mug', type: 'ジョッキ', size: 'large', use: '生ビール' },
    { id: 'beer-tumbler', type: 'ビールタンブラー', size: 'medium', use: '瓶ビールを分ける時' },
    { id: 'wine-white', type: 'ワイングラス (白)', size: 'medium', use: 'たまに出す白ワイン' },
    { id: 'wine-red', type: 'ワイングラス (赤)', size: 'large', use: '珍しい時の赤' },
    { id: 'champagne-flute', type: 'シャンパンフルート', size: 'medium', use: 'お祝いの夜限定' },
    { id: 'shot-glass', type: 'ショットグラス', size: 'small', use: '強い酒用' },
    { id: 'martini-glass', type: 'マティーニグラス', size: 'medium', use: 'カクテル用、ほぼ使わない' },
    { id: 'teacup', type: '湯呑み', size: 'small', use: '茶、白湯、ノンアルの客' },
    { id: 'small-bowl', type: '小皿', size: 'small', use: '犬用の水' },
    { id: 'nikaidou-glass', type: '二階堂グラス', size: 'medium', use: '焼酎のロック、権藤の愛用品', origin: '師匠から受け継いだ' },
];

export function glassFor(use: string): Glass[] {
    const q = use.toLowerCase();
    return GLASSWARE.filter(g =>
        g.use.toLowerCase().includes(q) || g.type.toLowerCase().includes(q)
    );
}
