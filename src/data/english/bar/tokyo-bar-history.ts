/**
 * Tokyo bar history fragments learned by the apprentice over time.
 * Each entry captures wider context around the neighborhood and izakaya
 * culture — not the bar's own history, but the world surrounding it.
 * Unlocked progressively by the apprentice's night count.
 */

export interface TokyoHistoryFragment {
    id: string;
    era: string;
    topic: string;
    body: string;
    source: string;
    unlockAfterNights: number;
}

export const TOKYO_HISTORY: TokyoHistoryFragment[] = [
    {
        id: 'tokyo-yamiichi-origins',
        era: '昭和二十年代',
        topic: '闇市から移った初期の小店',
        body: '焼け跡の上に板と布で組まれた闇市に、椅子が二つだけの酒場があったという。やがて店主たちは路地の奥へ移り、看板も掲げず、常連の声だけで生き延びた。この界隈の古い店の多くは、そうした名残を受け継いでいる。',
        source: '古い常連が、父の代の話として語ったもの',
        unlockAfterNights: 20,
    },
    {
        id: 'tokyo-salaryman-era',
        era: '昭和三十年代',
        topic: '高度経済成長期のサラリーマン文化',
        body: '会社の帰りに必ず一杯、という習慣が定着したのはこの頃だ。課長が部下を連れ、伝票の末尾に「打合せ」と書いて落とす。笑い声より、愚痴と溜息の方が店を支えていた。常連の顔は背広の襟で覚えたという。',
        source: '棚の奥にあった昭和三十八年の伝票綴り',
        unlockAfterNights: 40,
    },
    {
        id: 'tokyo-shitamachi-vs-ginza',
        era: '昭和四十年代',
        topic: '赤坂・銀座とは違う下町の小店',
        body: '夜の華やかさは向こう岸に任せ、下町の店は安い酒と長い会話で夜を繋いだ。ネクタイを緩め、靴を脱ぎ、一人で来て一人で帰る客を咎めない。それが下町の礼儀だったと、年寄りは言う。',
        source: '路地の写真集「東京夜路」に添えられた註',
        unlockAfterNights: 65,
    },
    {
        id: 'tokyo-ice-supply',
        era: '昭和五十年代',
        topic: '氷屋から氷の供給が変わった年',
        body: '町の氷屋が一軒、また一軒と店を閉め、代わりに製氷機が厨房に入ってきた。透き通った氷の味は、確かに少しだけ変わったらしい。古い主人たちは今でも「あの頃の氷は違った」と口を揃える。',
        source: '常連の元配達員が、杯を傾けながら漏らした話',
        unlockAfterNights: 95,
    },
    {
        id: 'tokyo-regulars-shift',
        era: '昭和末期',
        topic: '常連が「会社」から「個人」に移った時期',
        body: '社用族が減り、一人客が増えたのは八〇年代の後半だ。会社の金で飲む夜から、自分の金で飲む夜へ。注文は小さくなり、会話は深くなった。店の帳簿も、この頃から変わっていったという。',
        source: '先代の残した手書きの帳面',
        unlockAfterNights: 130,
    },
    {
        id: 'tokyo-kitchen-modernization',
        era: '平成の初め',
        topic: '電気ガスの普及で変わった厨房',
        body: '七輪と練炭の厨房が、ガスコンロとIHに置き換わった。煙の匂いが消え、店の空気が軽くなった。古い客はそれを「物足りない」と言い、若い客は「清潔になった」と喜んだ。厨房の音そのものが変わった。',
        source: '近所の金物屋の主人が、納品の帳面を見ながら教えてくれた',
        unlockAfterNights: 170,
    },
    {
        id: 'tokyo-smoking-ban-rumor',
        era: '平成初頭',
        topic: '全面禁煙の噂',
        body: 'この界隈で「いつか店内は全て禁煙になる」と囁かれ始めたのは、平成の最初の頃だった。当時は笑い話のように語られたが、紫煙の中で交わされた会話の多くが、やがて記録に残らぬまま消えていった。',
        source: '古い業界紙の切り抜き',
        unlockAfterNights: 220,
    },
    {
        id: 'tokyo-line-era',
        era: '平成後期',
        topic: 'LINE登場で客同士の連絡方法が変わった',
        body: 'かつて常連同士は、店の黒電話か、翌日の会社で会う時まで連絡を取らなかった。LINEが広まってから、彼らは店の外でも繋がるようになり、かえって店に立ち寄る頻度が減ったという話もある。便利と寂しさは、同じ場所に住んでいる。',
        source: 'ある常連が、新しい画面を誇らしげに見せながら漏らした言葉',
        unlockAfterNights: 300,
    },
    {
        id: 'tokyo-post-corona',
        era: '令和初期',
        topic: 'コロナ禍を越えた店の変化',
        body: '灯りの消えた夜が続いた後、再び暖簾を掛けた店は少なくなかった。席の間隔が広がり、声は少し小さくなり、見知らぬ客同士の距離が長く残った。それでも戻ってきた常連の顔は、前より柔らかかったという。',
        source: '休業明けの初日に、誰かがカウンターに残した短い手紙',
        unlockAfterNights: 420,
    },
    {
        id: 'tokyo-foreign-waves',
        era: '令和',
        topic: '外国人客の増加と減少の波',
        body: '観光の波が押し寄せ、路地にもガイドブックが届いた時期があった。やがて世界の情勢でその足音は消え、また少しずつ戻ってきた。言葉は通じずとも、杯を合わせる仕草だけで通じる夜があることを、この界隈は何度も確かめてきた。',
        source: '路地の入口にある案内板の、貼り替えられた跡',
        unlockAfterNights: 600,
    },
];

export function getLearnedHistory(totalNights: number): TokyoHistoryFragment[] {
    return TOKYO_HISTORY.filter((fragment) => totalNights >= fragment.unlockAfterNights);
}
