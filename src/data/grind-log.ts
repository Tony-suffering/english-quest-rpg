// GRIND 365 -- daily study video log
// Add entries here. Date format: YYYY-MM-DD.
// Latest entry goes at the TOP of the array.

export interface GrindEntry {
    id: string;
    date: string;          // YYYY-MM-DD
    youtube_id: string;    // 11-char YouTube ID
    title: string;
    title_ja: string;
    note: string;
    tags: string;          // comma-separated
    duration: number;      // seconds (optional, 0 if unknown)
}

export const grindEntries: GrindEntry[] = [
    {
        id: 'log-2026-04-27-01',
        date: '2026-04-27',
        youtube_id: 'e-8v1t8QfNg',
        title: 'Lofi Japanese Sample Lesson',
        title_ja: 'Dogen、Lofi日本語レッスン',
        note: `Dogen。日本語発音の神と呼ばれてる謎のアメリカ人。Lofi BGM流しながら英語で日本語文法を解説する変なフォーマット。

「英語で日本語を教える」動画を日本人が観ると、文法用語の英語名が大量に入ってくる。particle、pitch accent、copulaみたいな語彙が勝手に身につく。

しかも日本語の話をしてるから、英語の方に集中できる。内容は既知、言語だけ英語。リスニング素材として優秀。`,
        tags: 'dogen,lofi,reverse,listening',
        duration: 600,
    },
    {
        id: 'log-2026-04-26-01',
        date: '2026-04-26',
        youtube_id: 'JLyqkiXy_T4',
        title: 'Retro Games Price Compare: Tokyo VS Countryside',
        title_ja: 'Tokyo Lens、レトロゲームの東京vs田舎価格差',
        note: `Tokyo Lens。日本在住のアメリカ人が東京と田舎のレトロゲーム屋で同じソフトの値段を比較する回。

日本語話者にとって最強のリスニング教材は「日本の風景で喋る英語話者」だと俺は思ってる。画面に映ってるものが全部知ってるやつだから、英語が分からなくても話題が推測できる。

脳が「推測モード」に入ると、知ってる単語を繋いで意味を組み立てる回路が育つ。初学者が突破すべき最初の壁。`,
        tags: 'tokyolens,japan-eng,listening,casual',
        duration: 720,
    },
    {
        id: 'log-2026-04-25-01',
        date: '2026-04-25',
        youtube_id: 'KPkIf-hRF-M',
        title: 'I Spent a Day Dining Alone in Tokyo',
        title_ja: 'Abroad in Japan、東京ぼっち飯1日密着',
        note: `Abroad in Japan。イギリス人YouTuberクリスが東京で1日ひとり飯ツアーをする回。ラーメン、立ち食いそば、回転寿司、全部一人。

ブリティッシュイングリッシュの独特なリズムが聞ける回。アメリカ英語しか耳に入れてない人は、同じ単語なのに音が違くて混乱する。

でも混乱していい。アクセントの多様性に耳を慣らすのも英語の一部。イギリス、オーストラリア、インド、ナイジェリア、全部英語。`,
        tags: 'abroad-japan,british,solo,food',
        duration: 900,
    },
    {
        id: 'log-2026-04-24-01',
        date: '2026-04-24',
        youtube_id: 'Q7Vs6pfUvf4',
        title: "Japan's $6 Michelin Udon Noodles | Tokyo On Ten",
        title_ja: 'Paolo、ミシュランの6ドルうどん',
        note: `Paolo from Tokyo。東京在住のPaoloが10ドル以下で食えるミシュラン掲載店を紹介するシリーズ。今回はうどん。

食レポ系動画の強みは「味の表現」が全部英語で入ること。slurp (すする), chewy (もちもち), broth (出汁), umami (うま味、これは英語化済み) が自然な文脈で出てくる。

料理の英語は会話のアイスブレーカーとして最強。外国人に「何食べるの好き？」は無限に回せる。今日はそのための弾薬を拾う回。`,
        tags: 'paolo,food,travel,vocab',
        duration: 840,
    },
    {
        id: 'log-2026-04-23-01',
        date: '2026-04-23',
        youtube_id: 'qFLt2sxyRcg',
        title: '純ドメからケンブリッジ→ゴールドマン。天才の英語勉強法が異次元だった',
        title_ja: 'Atsueigo、純ドメ天才の勉強法インタビュー',
        note: `Atsueigo (あつ)。純ドメで育ってケンブリッジ→ゴールドマンに行った人の英語勉強法を本人にインタビューする回。

日本語解説多めで、インタビュー対象の英語が少しずつ混じる。リスニング入門として優しい構成。

ポイントは「方法論」じゃなくて「この人の執念」。techniqueより mindset を盗む回。俺もTOEIC900なのに喋れない組だから、この手の話は毎回効く。泣いて動く。`,
        tags: 'atsueigo,interview,mindset,advanced',
        duration: 1200,
    },
    {
        id: 'log-2026-04-22-01',
        date: '2026-04-22',
        youtube_id: 'zwLn2l8L1v0',
        title: 'マーベルの全シリーズで英語を勉強しましょう！映画で英会話リスニング',
        title_ja: 'Rupa sensei、マーベル全作で60分シャドーイング',
        note: `Rupa sensei。マーベル映画から100表現を抜き出して、字幕付きで60分シャドーイングできる構成の動画。

映画シャドーイングは教材の最上位互換。俳優が感情込みで演じてるから、音に抑揚がある。棒読み音声100時間より、アベンジャーズ60分のほうが耳に刺さる。

コツ: 最初から全部ついていこうとしない。1シーンだけ覚えて口に入れる。1日1セリフで365セリフ。十分すぎる。`,
        tags: 'rupa,movie,shadowing,marvel',
        duration: 3600,
    },
    {
        id: 'log-2026-04-21-01',
        date: '2026-04-21',
        youtube_id: 'ticATjzuvkc',
        title: 'AIで英語力は一気に変わる！英語学習効率が爆上がりする3つの活用法',
        title_ja: 'イングリッシュおさる、AI活用術',
        note: `英語コーチ-イングリッシュおさる。AI時代の英語勉強法を日本語で解説する動画。

おさるさんの動画は全編日本語。英語リスニング教材じゃない。でも「なぜ英語を勉強するか」の動機を立て直す回として機能する。

動機が枯れたときに、techniqueの動画を観ても効かない。まず動機を灌水する。そのあとに教材。今日はそのための水やりの日。`,
        tags: 'osaru,motivation,meta,japanese',
        duration: 900,
    },
    {
        id: 'log-2026-04-20-01',
        date: '2026-04-20',
        youtube_id: 'Qeq_pK-j6K4',
        title: '英語でなんて言うの?「ちょっと休みたい」',
        title_ja: 'Sakura English、「ちょっと休みたい」だけで1分',
        note: `Sakura English。「ちょっと休みたい」を英語でどう言うか、Shortsで1分でまとめる回。

1分Shorts系は、続けるには最強の形式。スキマ時間に1本。歯磨き中に1本。風呂上がりに1本。

「長い動画を1日1本」は続かないけど、「短い動画を10本」は続く。GRIND 365は後者を許可する。完璧主義を捨てる日。`,
        tags: 'sakura,shorts,phrase,quick',
        duration: 60,
    },
    {
        id: 'log-2026-04-19-01',
        date: '2026-04-19',
        youtube_id: 'xq7vdpkwBuA',
        title: '「お腹空いた」のリアルな言い方',
        title_ja: 'StudyIn、お腹空いたのリアル版',
        note: `StudyIn ネイティブ英会話。「お腹空いた」を教科書じゃなくネイティブがリアルに言うやつで紹介する回。

教科書は "I'm hungry." と教えるけど、現地では "I'm starving.", "I could eat a horse.", "I'm famished." の方が多い。hungryは弱すぎるらしい。

こういう「教科書との距離」を知るのが中級以降の山。知らずに I'm hungry で止まってると、ずっと子供英語のまま。脱出の第一歩は語彙の強度を上げること。`,
        tags: 'studyin,vocab,native,phrase',
        duration: 180,
    },
    {
        id: 'log-2026-04-18-01',
        date: '2026-04-18',
        youtube_id: 'gVkcr503vJo',
        title: 'なんとかするって英語でどう言うの？figure outの使い方',
        title_ja: 'あいうえおフォニックス、figure out 全部解体',
        note: `あいうえおフォニックス。「なんとかする」を英語でどう言うか、figure out の使い方を5分で解体してる回。

figure out は教科書だと「理解する」って訳されるけど、ネイティブは「なんとかする」「解決する」「調べて把握する」の全部に使う。一語で動詞3個分の仕事をする。

こういう「一語で全部カバーする動詞」を10個覚えるだけで、会話のスピードが一段上がる。get, take, figure out, work out, come up with あたりが最強。`,
        tags: 'phonics,vocab,phrasal-verb,short',
        duration: 330,
    },
    {
        id: 'log-2026-04-17-01',
        date: '2026-04-17',
        youtube_id: 'MMY8FOO6yi8',
        title: '世界の税金が衝撃すぎる',
        title_ja: 'だいじろー、世界の変な税金まとめ',
        note: `だいじろー。世界の変な税金 (犬の散歩税、窓税、独身税) を紹介する雑学系。

発音指導の人の雑学系は、語り口が丁寧で耳に優しい。日本語7:英語3くらいの配分で、耳のハードルが低い。

今日は疲れてたから、こういう「頭を使わず眺めるだけ」で1マス埋めた。サボらないことが最優先。完璧な教材じゃなくていい、続けば勝ち。`,
        tags: 'daijiro,trivia,easy,light',
        duration: 480,
    },
    {
        id: 'log-2026-04-16-01',
        date: '2026-04-16',
        youtube_id: 'Po7y2e5as4o',
        title: 'ネイティブがオススメするアメリカのレストランTOP5',
        title_ja: 'ケビン、アメリカのガチ外食チェーンTOP5',
        note: `Kevin's English Room。アメリカ人のケビンが本当に好きなチェーンTOP5を発表する回。日本にはない店ばかり。

観光ガイドじゃなく、ネイティブの実生活のおすすめが聞けるのが強い。"My go-to is...", "I always get the...", "Hands down the best..." みたいな「好きなやつを語る型」が全部入ってる。

自分の好きな店を英語で語れるようになると、会話の起爆剤になる。初対面でも30秒は引っ張れる。今日の耳の収穫はそこ。`,
        tags: 'kevin,food,review,casual',
        duration: 600,
    },
    {
        id: 'log-2026-04-15-01',
        date: '2026-04-15',
        youtube_id: 'SaEQiDLVk3Q',
        title: '英語ができると自由になれる！英語の凄さを改めて実感した目にウロコの出来事',
        title_ja: 'バイリンガールちか、英語の自由論',
        note: `バイリンガールちか。海外でのあるエピソードから「英語が話せると人生の選択肢が増える」って話を展開する回。

このチャンネルは教材系じゃなくて「英語ができる人生ってこういう感じ」を見せるのが強み。techniqueより動機を揺らされる。

俺みたいに「TOEICだけ取って止まってる人間」に一番効くやつ。今日は技術より気持ちを動かす回が必要だった。泣くな、動け、の自分向け動画。`,
        tags: 'bilingirl,motivation,mindset',
        duration: 720,
    },
    {
        id: 'log-2026-04-14-01',
        date: '2026-04-14',
        youtube_id: 'NBZv0_MImIY',
        title: "Y'all mind if I complain for 15 minutes?",
        title_ja: 'ジェイデンの愚痴15分ぶっ通し耐久リスニング',
        note: `記念すべき初日。Jaiden Animations が15分間ひたすら愚痴り続ける動画を流した。

教科書にはない「感情の乗った英語」ってこういうのだと思う。棒読みの音声教材100時間聞くより、本気で苛立ってる人の15分のほうが耳には残る。

特に拾えたやつ:
- "Y'all mind if..." -- 完全にスラング入り口。教本では絶対出てこない
- 文末を引きずる癖 (thing...なんとか...みたいな間)
- 息継ぎのタイミングで思考が切り替わる瞬間

日常のグチを英語で聞けるレベルまで行けば、たぶんネイティブの独り言ラジオに全部ついていける。ここ目指す。`,
        tags: 'jaiden,listening,rant,slang',
        duration: 900,
    },
];
