/**
 * Silent Bartender -- last-customer-of-the-night lines.
 *
 * Twenty short English farewells the final customer sometimes drops
 * as they leave. Shown during the 'closing' phase. The apprentice
 * reads the Japanese subtext and picks one of five silent card
 * actions. In-game English content (player decodes meaning).
 */

export interface LastCustomerLine {
    id: string;
    englishLine: string;
    japaneseSubtext: string;
    correctCard: 'nod-silent' | 'refill-water' | 'hand-coat' | 'open-door' | 'do-nothing';
    notes: string;
}

export const LAST_CUSTOMER_LINES: LastCustomerLine[] = [
    {
        id: 'last-that-is-it',
        englishLine: "I guess that's it.",
        japaneseSubtext: 'もう帰る潮時だな。',
        correctCard: 'hand-coat',
        notes: '帰る合図。黙ってコートを渡すのが正解。',
    },
    {
        id: 'last-later-than-thought',
        englishLine: "It's later than I thought.",
        japaneseSubtext: 'こんな時間か、困ったな。',
        correctCard: 'open-door',
        notes: '急いでいる。ドアを開けて送り出す。',
    },
    {
        id: 'last-same-time-tuesday',
        englishLine: 'Same time next Tuesday.',
        japaneseSubtext: 'また来るから、覚えといてくれ。',
        correctCard: 'nod-silent',
        notes: '常連の予約宣言。黙って頷くのが粋。',
    },
    {
        id: 'last-dont-wait-up',
        englishLine: "Don't wait up for me.",
        japaneseSubtext: '誰かへの伝言のつぶやき。',
        correctCard: 'do-nothing',
        notes: '独り言だから触れない。聞こえなかったふり。',
    },
    {
        id: 'last-take-care-of-him',
        englishLine: 'Take care of him, okay?',
        japaneseSubtext: '残った連れを頼む。',
        correctCard: 'nod-silent',
        notes: '託された。静かに頷いて受け止める。',
    },
    {
        id: 'last-one-for-the-road',
        englishLine: 'Just water, for the road.',
        japaneseSubtext: '最後に一杯、水でいい。',
        correctCard: 'refill-water',
        notes: '明確な水の注文。グラスを満たす。',
    },
    {
        id: 'last-thanks-for-listening',
        englishLine: 'Thanks for listening tonight.',
        japaneseSubtext: '聞いてくれて助かった。',
        correctCard: 'nod-silent',
        notes: '感謝への返しは言葉より目線。',
    },
    {
        id: 'last-long-day-tomorrow',
        englishLine: "It's a long day tomorrow.",
        japaneseSubtext: '明日がきついから帰る。',
        correctCard: 'hand-coat',
        notes: '帰り支度の合図。コートが先。',
    },
    {
        id: 'last-forgot-my-umbrella',
        englishLine: 'I almost forgot my coat.',
        japaneseSubtext: 'コート忘れるとこだった。',
        correctCard: 'hand-coat',
        notes: '直接的。黙ってコートを手渡す。',
    },
    {
        id: 'last-rain-is-coming',
        englishLine: 'The rain is coming down hard.',
        japaneseSubtext: '外は本降り、覚悟がいる。',
        correctCard: 'open-door',
        notes: '外の確認。ドアを開けて天気を見せる。',
    },
    {
        id: 'last-see-you-around',
        englishLine: 'See you around, I suppose.',
        japaneseSubtext: 'もう来ないかもな。',
        correctCard: 'do-nothing',
        notes: '別れの余韻。動きは邪魔になる。',
    },
    {
        id: 'last-dry-throat',
        englishLine: 'My throat is bone dry.',
        japaneseSubtext: 'とにかく喉が渇いた。',
        correctCard: 'refill-water',
        notes: '水を欲している。素直に注ぐ。',
    },
    {
        id: 'last-not-tonight',
        englishLine: 'Not tonight, old friend.',
        japaneseSubtext: '今夜は深く話したくない。',
        correctCard: 'do-nothing',
        notes: 'そっとしておく。沈黙が優しさ。',
    },
    {
        id: 'last-close-up-soon',
        englishLine: "You should close up soon.",
        japaneseSubtext: 'もう店じまいの時間だろ。',
        correctCard: 'nod-silent',
        notes: '気遣い。頷いて受け入れる。',
    },
    {
        id: 'last-miss-this-place',
        englishLine: "I'll miss this place.",
        japaneseSubtext: '少しの間、来られなくなる。',
        correctCard: 'nod-silent',
        notes: '重い一言。黙って頷くのが筋。',
    },
    {
        id: 'last-need-air',
        englishLine: 'I need some fresh air.',
        japaneseSubtext: '外の空気を吸いたい。',
        correctCard: 'open-door',
        notes: 'ドアを開けて空気を通す。',
    },
    {
        id: 'last-put-it-on-tab',
        englishLine: 'Put it on my tab, please.',
        japaneseSubtext: 'ツケにしといてくれ。',
        correctCard: 'nod-silent',
        notes: '常連の合図。黙って了承。',
    },
    {
        id: 'last-water-before-i-go',
        englishLine: 'One more water before I go.',
        japaneseSubtext: 'もう一杯だけ、水を。',
        correctCard: 'refill-water',
        notes: '明確な注文。注いで見送る。',
    },
    {
        id: 'last-dont-say-anything',
        englishLine: "Don't say anything, alright?",
        japaneseSubtext: '何も言うな、頼む。',
        correctCard: 'do-nothing',
        notes: '沈黙の依頼。動かないのが答え。',
    },
    {
        id: 'last-walk-me-out',
        englishLine: 'Would you get the door?',
        japaneseSubtext: 'ドアを開けてくれないか。',
        correctCard: 'open-door',
        notes: '直接的な依頼。ドアに手をかける。',
    },
];

/**
 * Return a random entry from the pool. Pure random; caller decides
 * whether to dedupe against recent picks at the session layer.
 */
export function pickLastCustomerLine(): LastCustomerLine {
    const index = Math.floor(Math.random() * LAST_CUSTOMER_LINES.length);
    return LAST_CUSTOMER_LINES[index];
}
