/**
 * Silent Bartender -- JP/EN phrase pairs.
 *
 * Common bar/izakaya phrases in both languages. Side content — could
 * be surfaced later as a "phrase book" view for language learners.
 * Uses only the phrases that naturally appear in this universe.
 */

export interface PhrasePair {
    id: string;
    ja: string;
    en: string;
    context: string;  // when it's used
}

export const PHRASE_PAIRS: PhrasePair[] = [
    { id: 'pp-welcome', ja: 'いらっしゃいませ', en: 'Welcome in', context: '客が入店した時の標準挨拶' },
    { id: 'pp-please-sit', ja: 'お座りください', en: 'Please have a seat', context: '空いている席を指す時' },
    { id: 'pp-what-to-drink', ja: '何になさいますか', en: 'What can I get you', context: '注文を聞く' },
    { id: 'pp-same-as-before', ja: 'いつものでいいですか', en: 'The usual', context: '常連への確認' },
    { id: 'pp-some-water', ja: 'お水を先にどうぞ', en: 'Some water first', context: '酔っている客への気遣い' },
    { id: 'pp-last-call', ja: 'ラストオーダーです', en: 'Last call', context: '閉店直前' },
    { id: 'pp-thank-you', ja: 'ありがとうございました', en: 'Thank you, come again', context: '客が出る時' },
    { id: 'pp-check-please', ja: 'お勘定お願いします', en: 'Check, please', context: '客からの会計要求' },
    { id: 'pp-careful-home', ja: '気をつけてお帰りください', en: 'Safe home', context: '客を送り出す' },
    { id: 'pp-first-time', ja: '初めてですか', en: 'Is this your first time here', context: '初対面の客に' },
    { id: 'pp-hot-or-cold', ja: '熱燗にしますか、冷酒にしますか', en: 'Hot or cold', context: '日本酒の温度確認' },
    { id: 'pp-recommend-today', ja: '本日のおすすめです', en: 'Tonight\'s special', context: 'チーフのお任せ' },
    { id: 'pp-one-more', ja: 'お代わりはいかがですか', en: 'Another one', context: '空のグラスを見て' },
    { id: 'pp-no-more', ja: 'もう十分です', en: "I've had enough", context: '酔客の自己申告' },
    { id: 'pp-happy-new-year', ja: 'あけましておめでとうございます', en: 'Happy new year', context: '元日の夜' },
    { id: 'pp-long-time', ja: 'お久しぶりです', en: "It's been a while", context: '常連の帰還' },
    { id: 'pp-regards', ja: 'よろしくお願いします', en: 'Looking forward to it', context: '初対面の締めくくり' },
    { id: 'pp-silence-rule', ja: '静かにどうぞ', en: 'Please keep it down', context: '騒がしい客を諫める時（権藤流）' },
    { id: 'pp-closing-time', ja: 'そろそろ閉店です', en: 'Closing time', context: '5am前' },
    { id: 'pp-gondo-signature', ja: '「舌より、耳だ」', en: '"Listen. Don\'t talk."', context: '権藤の口癖' },
];

export function phrasesByContext(query: string): PhrasePair[] {
    const q = query.toLowerCase();
    return PHRASE_PAIRS.filter(p =>
        p.context.toLowerCase().includes(q) ||
        p.ja.includes(query) ||
        p.en.toLowerCase().includes(q)
    );
}
