/**
 * Harvest Movies -- Monthly Movie Schedule
 * Each day = 1 movie = 10 curated expressions
 * Claude Code reads the script, picks 10, writes explanations.
 */

export interface HarvestMovie {
    date: string;       // YYYY-MM-DD
    title: string;      // Movie title
    year: number;
    genre: 'crime' | 'comedy' | 'drama' | 'romance' | 'thriller' | 'scifi' | 'action' | 'special';
    tagline: string;    // なぜこの映画か（日本語、ユーモア込み）
    special?: boolean;  // SPECIAL REQUEST from members
    requestedBy?: string;
}

export const GENRE_META: Record<string, { label: string; color: string; bg: string }> = {
    crime:    { label: 'Crime',    color: '#991B1B', bg: '#FEE2E2' },
    comedy:   { label: 'Comedy',   color: '#B45309', bg: '#FEF3C7' },
    drama:    { label: 'Drama',    color: '#1E40AF', bg: '#DBEAFE' },
    romance:  { label: 'Romance',  color: '#BE185D', bg: '#FCE7F3' },
    thriller: { label: 'Thriller', color: '#6B21A8', bg: '#F3E8FF' },
    scifi:    { label: 'Sci-Fi',   color: '#0E7490', bg: '#CFFAFE' },
    action:   { label: 'Action',   color: '#DC2626', bg: '#FEE2E2' },
    special:  { label: 'SPECIAL REQUEST', color: '#D4AF37', bg: '#FEF9E7' },
};

export const APRIL_2026: HarvestMovie[] = [
    {
        date: '2026-04-01',
        title: 'The Big Lebowski',
        year: 1998,
        genre: 'comedy',
        tagline: '怠惰の哲学を完璧な英語で語る唯一の映画。Dudeは無職なのに語彙力だけ異常に高い。',
    },
    {
        date: '2026-04-02',
        title: 'Good Will Hunting',
        year: 1997,
        genre: 'drama',
        tagline: '天才が普通の言葉で人生を語る。カウンセリングシーンの英語が異常にうまい。泣くな。',
    },
    {
        date: '2026-04-03',
        title: 'Fight Club',
        year: 1999,
        genre: 'thriller',
        tagline: '哲学を殴りながら語る映画。一行で世界観をひっくり返す台詞の連続。石鹸は関係ない。',
    },
    {
        date: '2026-04-04',
        title: 'The Shawshank Redemption',
        year: 1994,
        genre: 'drama',
        tagline: '希望を語る英語が最も美しい映画。Redのナレーションは英語の教科書より100倍いい。',
    },
    {
        date: '2026-04-05',
        title: 'Pulp Fiction',
        year: 1994,
        genre: 'crime',
        tagline: '会話の密度が映画史上最高レベル。殺し屋がチーズバーガーの話をする映画は他にない。',
    },
    {
        date: '2026-04-06',
        title: 'Forrest Gump',
        year: 1994,
        genre: 'drama',
        tagline: 'シンプルな英語で深いことを言う天才。構文が簡単なのに心に刺さる。チョコレートは関係ある。',
    },
    {
        date: '2026-04-07',
        title: 'The Dark Knight',
        year: 2008,
        genre: 'action',
        tagline: '悪役の英語が一番うまい映画。Jokerのロジックは反論不能。怖いのに納得する。',
    },
    {
        date: '2026-04-08',
        title: 'Goodfellas',
        year: 1990,
        genre: 'crime',
        tagline: 'ストリートの英語とビジネスの英語が同時に学べる。マフィアのプレゼン力は異常。',
    },
    {
        date: '2026-04-09',
        title: 'The Social Network',
        year: 2010,
        genre: 'drama',
        tagline: 'シリコンバレーの早口英語。知的な喧嘩の仕方が学べる。友達0人の男が20億人つなげた話。',
    },
    {
        date: '2026-04-10',
        title: 'Dead Poets Society',
        year: 1989,
        genre: 'drama',
        tagline: '英語で人を動かすスピーチの教科書。Carpe Diemだけで映画を語るな。もっと深い。',
    },
    {
        date: '2026-04-11',
        title: 'When Harry Met Sally',
        year: 1989,
        genre: 'romance',
        tagline: '男女の会話の最高峰。口喧嘩の英語が全部日常で使える。オーガズムのシーンは英語関係ない。',
    },
    {
        date: '2026-04-12',
        title: 'The Princess Bride',
        year: 1987,
        genre: 'comedy',
        tagline: 'アメリカ人の引用率No.1映画。この台詞を知らないとパーティーの会話についていけない。',
    },
    {
        date: '2026-04-13',
        title: 'A Few Good Men',
        year: 1992,
        genre: 'drama',
        tagline: '法廷英語の最高峰。論理で相手を追い詰める話術。You can\'t handle the truthだけじゃない。',
    },
    {
        date: '2026-04-14',
        title: 'Jerry Maguire',
        year: 1996,
        genre: 'drama',
        tagline: 'ビジネスと恋愛を同時に語る男の英語。Show me the moneyは序章。本番はもっと後。',
    },
    {
        date: '2026-04-15',
        title: 'Glengarry Glen Ross',
        year: 1992,
        genre: 'drama',
        tagline: '営業の英語。人を動かす言葉と人を壊す言葉の両方が学べる。Always Be Closing。',
    },
    {
        date: '2026-04-16',
        title: 'Office Space',
        year: 1999,
        genre: 'comedy',
        tagline: 'サラリーマンの愚痴を完璧に英語化した映画。月曜の気持ちを代弁してくれる。',
    },
    {
        date: '2026-04-17',
        title: 'Superbad',
        year: 2007,
        genre: 'comedy',
        tagline: '高校生のリアル英語。教科書に絶対載らない、でも絶対使う表現のカタログ。',
    },
    {
        date: '2026-04-18',
        title: 'The Breakfast Club',
        year: 1985,
        genre: 'drama',
        tagline: '自己紹介の概念が変わる映画。5人の高校生が本音で喋る英語は40年経っても古くない。',
    },
    {
        date: '2026-04-19',
        title: 'Ferris Bueller\'s Day Off',
        year: 1986,
        genre: 'comedy',
        tagline: '人生を楽しむ男の英語。ポジティブの語彙が爆発的に増える。学校をサボる正当化の天才。',
    },
    {
        date: '2026-04-20',
        title: 'Whiplash',
        year: 2014,
        genre: 'drama',
        tagline: '師弟関係の極限英語。褒めると怒るの間にある表現。椅子が飛んでくる英語教室。',
    },
    {
        date: '2026-04-21',
        title: 'Lost in Translation',
        year: 2003,
        genre: 'drama',
        tagline: '孤独を英語で語る映画。少ない言葉で多くを伝える技術。東京が舞台なのに英語が主役。',
    },
    {
        date: '2026-04-22',
        title: 'In Bruges',
        year: 2008,
        genre: 'comedy',
        tagline: 'イギリス英語の毒舌。上品に人を罵る方法の教科書。観光地で殺し屋が暇を持て余す映画。',
    },
    {
        date: '2026-04-23',
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
        genre: 'romance',
        tagline: '記憶と感情の英語。抽象的な気持ちを言語化する表現の宝庫。忘れたい人がいる人向け。',
    },
    {
        date: '2026-04-24',
        title: 'No Country for Old Men',
        year: 2007,
        genre: 'thriller',
        tagline: '少ない台詞で恐怖を作る英語。コイントスで人生を決める男の英語は最小限で最大限。',
    },
    {
        date: '2026-04-25',
        title: 'The Matrix',
        year: 1999,
        genre: 'scifi',
        tagline: '哲学をSFで語る英語。現実を疑う表現のカタログ。赤い薬か青い薬か。',
    },
    {
        date: '2026-04-26',
        title: 'Moneyball',
        year: 2011,
        genre: 'drama',
        tagline: 'データで人を説得する英語。統計と情熱のバランス。野球を知らなくても使える交渉術。',
    },
    {
        date: '2026-04-27',
        title: 'Groundhog Day',
        year: 1993,
        genre: 'comedy',
        tagline: '繰り返しの中で変わる英語。同じ状況を毎回違う言葉で表現する天才。月曜がループしたら。',
    },
    {
        date: '2026-04-28',
        title: 'Little Miss Sunshine',
        year: 2006,
        genre: 'comedy',
        tagline: '機能不全家族の英語。全員バラバラなのに最後に1つになる。おじいちゃんが最強。',
    },
    {
        date: '2026-04-29',
        title: 'Her',
        year: 2013,
        genre: 'scifi',
        tagline: 'AIとの会話の英語。感情の言語化が異常にうまい。俺たちの未来。笑えない。',
    },
    {
        date: '2026-04-30',
        title: '12 Angry Men',
        year: 1957,
        genre: 'drama',
        tagline: '議論の英語の最高峰。12人が1つの結論に至る過程の全話術。67年前の映画が今も最強。',
    },
];

// =========================================================================
// SPECIAL REQUESTS -- メンバーからのリクエスト枠
// =========================================================================
export const SPECIAL_REQUESTS: HarvestMovie[] = [
    {
        date: '2026-04-08',
        title: 'Blackadder (Series)',
        year: 1983,
        genre: 'special',
        tagline: 'イギリス皮肉の最高峰。Baldrickの"cunning plan"は英語圏の共通言語。ごろさんリクエスト。',
        special: true,
        requestedBy: 'Goro Yamaguchi',
    },
    {
        date: '2026-04-08',
        title: 'Mr. Bean (Series + Movie)',
        year: 1990,
        genre: 'special',
        tagline: 'セリフが少ない男の、数少ないセリフが全部名言。ローワン・アトキンソンの言語センス。ごろさんリクエスト。',
        special: true,
        requestedBy: 'Goro Yamaguchi',
    },
];

// Lookup by date
export const MOVIE_BY_DATE: Record<string, HarvestMovie> = {};
for (const m of APRIL_2026) {
    MOVIE_BY_DATE[m.date] = m;
}
for (const m of SPECIAL_REQUESTS) {
    MOVIE_BY_DATE[`special-${m.title}`] = m;
}
