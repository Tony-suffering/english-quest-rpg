/**
 * ACCESS の解析済み動画。
 * 追加は node scripts/gen-video-access.mjs <youtubeId> のあと、ここに1行足すだけ。
 */

import type { AccessVideo } from './access-types';
import TOY_STORY_5 from './access-Fo1TvYG-yPI';

export const ACCESS_VIDEOS: AccessVideo[] = [
    TOY_STORY_5,
];

// ============================================================
// 販売設定
// ============================================================

/**
 * 決済リンク。Stripe Payment Link / Gumroad / note有料記事 のURLをここに入れる。
 * **空のあいだは全ブロック無料開放**(値段だけ出して買えない状態を作らない)。
 */
export const BUY_URL = '';
export const WAITLIST_URL = 'https://x.com/tonio_english';

/** 無料で見せるブロック番号。ここまでは誰でも通す */
export const FREE_BLOCKS = 2;

/**
 * 買い切りにした理由。
 *
 * この人は作るのを止められない。123ページ作って値段が1つも付かなかったのは、
 * 毎回「新しい器」を売ろうとしたからで、作り続けること自体は弱点ではなく在庫である。
 * だから商品を「解析済みの動画すべて + これから増えるぶん」にする。
 * 作れば作るほど、既に買った人の持ち物が増える形にしておく。
 */
export const PRICE = {
    main: 2480,
    mainLabel: '¥2,480',
    mainNote: '買い切り / 解析済みの動画すべて + 今後追加ぶんも',
    compare: [
        { name: '単語帳', price: '¥1,000〜2,000', note: '頻度順ではない。1ページ目から始めて200語で飽きる', me: false },
        { name: '英会話アプリ(月額)', price: '¥3,000前後 / 月', note: '半年で¥18,000。やめた瞬間に消える', me: false },
        { name: 'ACCESS', price: '¥2,480', note: '買い切り。動画が増えるたびに、持ち物が増える', me: true },
    ],
};

export const findVideo = (id: string): AccessVideo | undefined =>
    ACCESS_VIDEOS.find(v => v.id === id);

export default ACCESS_VIDEOS;
