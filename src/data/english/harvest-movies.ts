/**
 * Harvest Movies -- Monthly Movie Schedule
 * Each day = 1 movie = 10 curated expressions
 * Claude Code reads the script, picks 10, writes explanations.
 */

export interface HarvestMovie {
    date: string;       // YYYY-MM-DD
    title: string;      // Movie title
    year: number;
    genre: 'crime' | 'comedy' | 'drama' | 'romance' | 'thriller' | 'scifi' | 'action';
    tagline: string;    // なぜこの映画か（日本語、ユーモア込み）
}

export const GENRE_META: Record<string, { label: string; color: string; bg: string }> = {
    crime:    { label: 'Crime',    color: '#991B1B', bg: '#FEE2E2' },
    comedy:   { label: 'Comedy',   color: '#B45309', bg: '#FEF3C7' },
    drama:    { label: 'Drama',    color: '#1E40AF', bg: '#DBEAFE' },
    romance:  { label: 'Romance',  color: '#BE185D', bg: '#FCE7F3' },
    thriller: { label: 'Thriller', color: '#6B21A8', bg: '#F3E8FF' },
    scifi:    { label: 'Sci-Fi',   color: '#0E7490', bg: '#CFFAFE' },
    action:   { label: 'Action',   color: '#DC2626', bg: '#FEE2E2' },
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

// ---------------------------------------------------------------------------
// MAY 2026 -- 5 movies, daily-conversation focused (5 expressions each)
// ---------------------------------------------------------------------------

export const MAY_2026: HarvestMovie[] = [
    {
        date: '2026-05-01',
        title: 'When Harry Met Sally',
        year: 1989,
        genre: 'romance',
        tagline: '男女の友情論を90分で言い切る映画。ニューヨークの会話の密度がエグい。「ただの友達」って言葉が信用できなくなる。',
    },
    {
        date: '2026-05-02',
        title: 'The Devil Wears Prada',
        year: 2006,
        genre: 'comedy',
        tagline: '上司の英語が完璧な映画。Mirandaは怒鳴らない、つぶやくだけで部下が震える。職場英語の教科書。',
    },
    {
        date: '2026-05-03',
        title: 'Lost in Translation',
        year: 2003,
        genre: 'drama',
        tagline: '東京で迷子になった2人の小声の会話。沈黙が一番饒舌な映画。海外ホテルで聞こえてきそうな英語。',
    },
    {
        date: '2026-05-04',
        title: '(500) Days of Summer',
        year: 2009,
        genre: 'romance',
        tagline: '「これは恋愛映画じゃない」って冒頭で言うのが一番恋愛映画。曖昧な関係の英語のカタログ。',
    },
    {
        date: '2026-05-05',
        title: 'Notting Hill',
        year: 1999,
        genre: 'romance',
        tagline: '本屋の店主とハリウッド女優のロンドン恋愛。普通すぎる男の英語が異常に上品で、そのまま日常で使える。',
    },
    {
        date: '2026-05-06',
        title: 'Sleepless in Seattle',
        year: 1993,
        genre: 'romance',
        tagline: 'ラジオ越しに恋する映画。電話と手紙の時代の英語の優しさ。今のSNSにはもうない温度。',
    },
    {
        date: '2026-05-07',
        title: 'You\'ve Got Mail',
        year: 1998,
        genre: 'romance',
        tagline: 'メールで恋する映画。1998年なのに今のSlack DM文化を予言してた。本屋の店主の英語が異常に丁寧。',
    },
    {
        date: '2026-05-08',
        title: 'The Holiday',
        year: 2006,
        genre: 'romance',
        tagline: '家を交換したら人生が変わる話。ロンドンとLAの英語が交差する。クリスマス映画なのに5月に見ても刺さる。',
    },
    {
        date: '2026-05-09',
        title: 'About Time',
        year: 2013,
        genre: 'romance',
        tagline: 'タイムリープで人生やり直すラブコメ。父と息子の会話の英語が異常に上品。泣くな。',
    },
    {
        date: '2026-05-10',
        title: 'Before Sunrise',
        year: 1995,
        genre: 'drama',
        tagline: 'ウィーンを一晩歩く2人の英語のレッスン。会話の濃度が映画史最高。続編を見るころには年取ってる。',
    },
    {
        date: '2026-05-11',
        title: 'Knives Out',
        year: 2019,
        genre: 'thriller',
        tagline: '推理小説の英語。Daniel Craigの南部訛りが完璧。会話で人を追い詰める英語のカタログ。',
    },
    {
        date: '2026-05-12',
        title: 'Ocean\'s Eleven',
        year: 2001,
        genre: 'crime',
        tagline: '11人でカジノを盗む計画の英語。プロが短く話す。説明が少ないほどクール。',
    },
    {
        date: '2026-05-13',
        title: 'The Social Network',
        year: 2010,
        genre: 'drama',
        tagline: 'Facebookの創業の英語。Aaron Sorkinの台詞は人間が物理的に喋れる速度の限界。早口の練習に最高。',
    },
    {
        date: '2026-05-14',
        title: 'The Intern',
        year: 2015,
        genre: 'comedy',
        tagline: '70歳のインターンが22歳の上司を支える映画。世代を超えた会話の英語の手本。礼儀の英語。',
    },
    {
        date: '2026-05-15',
        title: 'Up in the Air',
        year: 2009,
        genre: 'drama',
        tagline: '解雇通告のプロの英語。George Clooneyが「あなたはクビ」を芸術にする。逆にビジネスで使える。',
    },
    {
        date: '2026-05-16',
        title: 'Crazy Rich Asians',
        year: 2018,
        genre: 'romance',
        tagline: 'アジア系家族のドラマの英語。NY英語とシンガポール英語が衝突する。家族会議の鉄板表現。',
    },
    {
        date: '2026-05-17',
        title: 'Bridget Jones\'s Diary',
        year: 2001,
        genre: 'comedy',
        tagline: '日記とダメ人間の英語。British self-deprecation の教科書。落ち込んだ時の語彙が増える。',
    },
    {
        date: '2026-05-18',
        title: 'Legally Blonde',
        year: 2001,
        genre: 'comedy',
        tagline: 'ピンクの法学生の英語。バカっぽい言い方で賢いことを言う技術。プレゼンの英語の手本。',
    },
    {
        date: '2026-05-19',
        title: 'Mean Girls',
        year: 2004,
        genre: 'comedy',
        tagline: '高校生のいじめの英語。2004年だけど語彙が今のSNSに直結。「You can\'t sit with us.」は永遠。',
    },
    {
        date: '2026-05-20',
        title: 'Ferris Bueller\'s Day Off',
        year: 1986,
        genre: 'comedy',
        tagline: 'サボりの英語の哲学。1986年の高校生がカメラ目線で説教する。今でも刺さる。',
    },
    {
        date: '2026-05-21',
        title: 'Clueless',
        year: 1995,
        genre: 'comedy',
        tagline: '90sのカリフォルニア高校の英語。Whatever, As if, Totally の完璧な使い分け。今の英語の起源。',
    },
    {
        date: '2026-05-22',
        title: '10 Things I Hate About You',
        year: 1999,
        genre: 'romance',
        tagline: 'シェイクスピアを高校に置き換えた英語。皮肉と詩が混ざる。10代の早口に耐える練習。',
    },
    {
        date: '2026-05-23',
        title: 'The Princess Diaries',
        year: 2001,
        genre: 'comedy',
        tagline: '普通の女子高生がプリンセスになる英語。フォーマルとカジュアルの切替の練習に最高。',
    },
    {
        date: '2026-05-24',
        title: '13 Going on 30',
        year: 2004,
        genre: 'comedy',
        tagline: '30歳になった子供の英語。記憶が空白なせいで素直に話す。子供の語彙で大人が話すと逆に深い。',
    },
    {
        date: '2026-05-25',
        title: 'Catch Me If You Can',
        year: 2002,
        genre: 'crime',
        tagline: '詐欺師の英語のレッスン。嘘をつかずに誤解させる技術。営業に使ってはいけない。',
    },
    {
        date: '2026-05-26',
        title: 'The Pursuit of Happyness',
        year: 2006,
        genre: 'drama',
        tagline: '貧困と父親の英語。Will Smithが息子に説教する場面の英語が刺さる。簡単な単語で深い話。',
    },
    {
        date: '2026-05-27',
        title: 'Slumdog Millionaire',
        year: 2008,
        genre: 'drama',
        tagline: 'インドのスラム発のクイズ番組の英語。インド英語のリズム。質問されたときの英語の練習に。',
    },
    {
        date: '2026-05-28',
        title: 'The Grand Budapest Hotel',
        year: 2014,
        genre: 'comedy',
        tagline: 'ホテルマンの過剰に丁寧な英語。Wes Andersonの会話の精度。皮肉と尊敬が同居する。',
    },
    {
        date: '2026-05-29',
        title: 'Frances Ha',
        year: 2012,
        genre: 'drama',
        tagline: '27歳のNYアーティストの英語。会話が止まらない、結論もない。今の20代のリアル。',
    },
    {
        date: '2026-05-30',
        title: 'Lady Bird',
        year: 2017,
        genre: 'drama',
        tagline: '母と娘の喧嘩の英語。一行ずつ刺さる。Greta Gerwigの台詞は文学。',
    },
    {
        date: '2026-05-31',
        title: 'The Breakfast Club',
        year: 1985,
        genre: 'drama',
        tagline: '5人の高校生が土曜日に図書室に閉じ込められる映画。1985年の英語が今でも刺さる。世代の壁の話。',
    },
];

// Lookup by date
export const MOVIE_BY_DATE: Record<string, HarvestMovie> = {};
for (const m of APRIL_2026) {
    MOVIE_BY_DATE[m.date] = m;
}
for (const m of MAY_2026) {
    MOVIE_BY_DATE[m.date] = m;
}
