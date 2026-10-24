// TOON PASS -- アニメーション10本で英語圏を獲る
// 方針:
//   - アニメ限定。全セリフがスタジオ録音(ADR)なので実写より S/N 比が良く、
//     声優は声だけで演技するため調音がオーバーアクト気味 = 聞き取りやすい。
//   - 教材が売るのは「タイムコード + 解説」。映像・音声・全文スクリプトは配布しない。
//     セリフ引用は各シーン数行まで、解説の分量が常に引用を上回る(主従関係)。
//   - 「全部聞き取る」は目標にしない。捨てる許可を明示する。

export interface ToonFilm {
    order: number;
    jp: string;
    en: string;
    year: number;
    studio: string;
    role: string;        // カリキュラム上の役割
    english: string;     // 英語面で学べること
    culture: string;     // 文化面で学べること
    scene: string;       // 代表シーン(将来のレッスン予告)
    clarity: 1 | 2 | 3 | 4 | 5; // 聞き取りやすさ(5=最も易しい)
    status: 'trial' | 'planned';
}

export const TOONPASS_FILMS: ToonFilm[] = [
    {
        order: 1,
        jp: 'トイ・ストーリー',
        en: 'Toy Story',
        year: 1995,
        studio: 'Pixar',
        role: '入口 -- 世界一簡単な英文で喧嘩する映画',
        english: '中学英語の言い切り。嫉妬・訂正・口論の基本形',
        culture: '直球で言い切る文化。緩衝材を入れると負ける世界',
        scene: 'ガソリンスタンドの喧嘩 (You are a toy!)',
        clarity: 5,
        status: 'trial',
    },
    {
        order: 2,
        jp: 'ファインディング・ニモ',
        en: 'Finding Nemo',
        year: 2003,
        studio: 'Pixar',
        role: '親子の英語 -- 心配と励ましの言い方',
        english: '禁止・懇願・励まし。感情のこもった命令文',
        culture: '過保護とindependenceの衝突。米国の子育て観',
        scene: 'Just keep swimming と冒頭の親子喧嘩',
        clarity: 5,
        status: 'planned',
    },
    {
        order: 3,
        jp: 'カールじいさんの空飛ぶ家',
        en: 'Up',
        year: 2009,
        studio: 'Pixar',
        role: '寡黙 -- セリフが少なく、1文が濃い',
        english: '老人の英語。短い文に感情を全部載せる技術',
        culture: '老いと喪失、約束の重さ。冒頭4分の無言の意味',
        scene: 'Cross your heart? -- 約束の言い回し',
        clarity: 4,
        status: 'planned',
    },
    {
        order: 4,
        jp: 'インサイド・ヘッド',
        en: 'Inside Out',
        year: 2015,
        studio: 'Pixar',
        role: '感情語彙の教科書そのもの',
        english: 'joy/sadness/disgust... 感情を名詞で扱う英語の骨格',
        culture: '感情を言語化して共有する文化。セラピー的会話の入口',
        scene: 'ビンボンとヨロコビとカナシミの慰めの場面',
        clarity: 4,
        status: 'planned',
    },
    {
        order: 5,
        jp: 'リメンバー・ミー',
        en: 'Coco',
        year: 2017,
        studio: 'Pixar',
        role: '家族と死生観 -- メキシコ系アメリカ',
        english: '家族間の呼びかけ、祝福と禁止。スペイン語混じりの英語',
        culture: '移民二世の英語。米国は一枚岩じゃないという事実',
        scene: '家族の掟とギターの禁止をめぐる対立',
        clarity: 4,
        status: 'planned',
    },
    {
        order: 6,
        jp: 'ズートピア',
        en: 'Zootopia',
        year: 2016,
        studio: 'Disney',
        role: '偏見と職場 -- 現代スラング入門',
        english: '皮肉・マイクロアグレッション・職場の力学の英語',
        culture: 'ステレオタイプをどう語るか。現代アメリカの神経',
        scene: 'ジュディ配属初日、署長との面談',
        clarity: 3,
        status: 'planned',
    },
    {
        order: 7,
        jp: 'レミーのおいしいレストラン',
        en: 'Ratatouille',
        year: 2007,
        studio: 'Pixar',
        role: '批評文化 -- フォーマル独白の頂点',
        english: '書き言葉レベルの独白。抽象名詞と関係詞の長文',
        culture: '批評家という職業、批評というカルチャーの作法',
        scene: 'アントン・イーゴの最後のレビュー独白',
        clarity: 3,
        status: 'planned',
    },
    {
        order: 8,
        jp: 'Mr.インクレディブル',
        en: 'The Incredibles',
        year: 2004,
        studio: 'Pixar',
        role: '夫婦喧嘩のリアル英語',
        english: '本気の口論。遮り、皮肉、蒸し返し。会話の応酬速度',
        culture: '郊外の中流家庭、中年の停滞。アメリカの家庭のリアル',
        scene: '夕食シーンと夫婦の口論',
        clarity: 2,
        status: 'planned',
    },
    {
        order: 9,
        jp: 'シュレック',
        en: 'Shrek',
        year: 2001,
        studio: 'DreamWorks',
        role: '皮肉とパロディ -- ポップカルチャー',
        english: '皮肉(sarcasm)の音調。おとぎ話の定型文とその崩し',
        culture: 'パロディが通じるのは元ネタが共有されてるから',
        scene: 'ドンキーとの道中の掛け合い',
        clarity: 2,
        status: 'planned',
    },
    {
        order: 10,
        jp: 'スパイダーマン: スパイダーバース',
        en: 'Spider-Man: Into the Spider-Verse',
        year: 2018,
        studio: 'Sony',
        role: 'ラスボス -- ブルックリンのティーン最速英語',
        english: 'AAVE混じりの現代口語、最速の応酬。これが聞ければ卒業',
        culture: 'NYの多人種の若者文化。学校、家族、コードスイッチング',
        scene: 'マイルスと父親のパトカーの会話',
        clarity: 1,
        status: 'planned',
    },
];

// ---------------------------------------------------------------
// Lesson 1 (試作): Toy Story -- ガソリンスタンドの喧嘩
// 引用は4行のみ。解説 >> 引用 の主従関係を絶対に守る。
// ---------------------------------------------------------------

export interface KenshiLine {
    quote: string;       // 実際のセリフ(短い引用)
    speaker: string;
    gapJp: string;       // よくある日本人英語(乖離の比較対象)
    kenshi: string;      // 検死: 乖離の解説
    culture: string;     // 文化解説: なぜそう言うのか
    takeaway: string;    // 持ち帰り(転用形)
}

export const LESSON1 = {
    film: 'Toy Story',
    filmJp: 'トイ・ストーリー',
    sceneTitle: 'ガソリンスタンドの喧嘩',
    timecode: '約31:00〜35:00',
    timecodeNote: '配信版により前後1〜2分ずれる。ガソリンスタンドにトラックが停まる場面から、二人が置き去りにされるまでの約3分',
    where: 'Disney+ で本編を各自視聴(教材は映像・音声を配布しない)',
    duration: '3分',
    // STEP 1: 事前ブリーフ -- 先に日本語で場面力学を入れてから聞く
    brief: [
        'ウッディはアンディの一番のおもちゃの座をバズに奪われ、嫉妬が限界を超えている。バズは自分を本物のスペースレンジャーだと信じ込んでいて、おもちゃである自覚がない。',
        'この喧嘩の本質は「事実の訂正」対「アイデンティティの防衛」。ウッディは事実を叩きつけ、バズは人格ごと防衛する。だから両者の英語の文体が正反対になる。ここがこのシーンの聞きどころ。',
        '喧嘩の英語は文法が単純になる。怒ると人間は関係詞を使わない。つまり口論シーンは、中学英語がそのまま実戦で使われる瞬間で、教材として最高の狩場になる。',
    ],
    // STEP 2: 先に自分で言う(検死の比較対象を自分で作る)
    prompts: [
        {
            id: 'q1',
            situation: '相手が明らかな勘違いをしている。「いや、あんたはおもちゃなんだよ」と面と向かって言い切りたい。',
            hint: '本当に言い切れるか。何か柔らかくする言葉を足したくならないか',
        },
        {
            id: 'q2',
            situation: '同じ内容を、もっと強く、たたみかけて言い直したい。2発目、3発目の弾を作れ。',
            hint: '日本語なら同じ言葉を繰り返す場面。英語では?',
        },
        {
            id: 'q3',
            situation: '喧嘩の最後、相手を見下して哀れむ捨て台詞を吐いて立ち去りたい。',
            hint: '「かわいそうなやつだ」を英語でどう言う?',
        },
    ],
    // STEP 3: 検死 -- 実際のセリフと自分の英語の乖離
    lines: [
        {
            quote: 'You are a toy!',
            speaker: 'Woody',
            gapJp: 'I think you are a toy... ',
            kenshi: '世界一簡単な英文が、世界一有名な決め台詞であるという事実をまず直視する。単語3つ、全部中学1年。つまり喧嘩の英語で足りないのは語彙じゃない。「言い切る度胸」だけ。日本人はここに I think / maybe / kind of の緩衝材を入れて、せっかくの弾を湿らせる。断言文に緩衝材を入れた瞬間、英語の口論では負けが確定する。',
            culture: '英語の口論は「事実の断言」の応酬で進む。婉曲は誠実さではなく自信のなさとして読まれる。日本語の「察してもらう」前提はこの土俵に存在しない。',
            takeaway: '断言は S+V+C の裸で撃つ。緩衝材ゼロの "You are X." をひとつ、口に馴染ませておく。',
        },
        {
            quote: "You're an action figure! You are a child's plaything!",
            speaker: 'Woody',
            gapJp: 'You are a toy! You are a toy!(同じ言葉の繰り返し)',
            kenshi: '直前に "toy" と言ったのに、次は action figure、その次は child\'s plaything。同じ内容を語彙を変えて3連打している。これが英語の喧嘩構文「言い換えのたたみかけ(escalation)」。日本語の喧嘩は同じ言葉の反復で圧を上げる(「おもちゃだろ! おもちゃなんだよ!」)が、英語は言い換えるたびに具体度と侮辱度を一段ずつ上げる。反復は英語では「語彙切れ」に聞こえる。',
            culture: '言い換え文化は喧嘩に限らない。褒めるときも謝るときも、英語は同義語の階段を登る。パラフレーズは教養の見せ場で、喧嘩ですらそれをやる。',
            takeaway: '型として持ち帰る: "You\'re not X. You\'re Y. A Z!" -- YはXより具体的に、ZはYより残酷に。',
        },
        {
            quote: 'You are a sad, strange little man, and you have my pity.',
            speaker: 'Buzz',
            gapJp: 'I feel sorry for you.',
            kenshi: '意味はどちらも「かわいそうなやつ」。殺傷力が違う。まず形容詞の3連(sad, strange, little)で人格を解剖してから、"you have my pity" という騎士道文学みたいな文体で締める。喧嘩の頂点でフォーマルに切り替わるこの逆転が英語の侮辱の最高級で、丁寧さがそのまま「お前は俺と同じ土俵にすらいない」という距離の宣告になる。I feel sorry for you は主語が I で、自分の感情の報告。you have my pity は主語が you で、哀れみを「下賜」している。主語の選択だけで上下関係が決まる。',
            culture: 'バズは自分をスペースレンジャーだと信じているから、文体も軍人・騎士のフォーマルを選ぶ。キャラの自己認識がそのまま語彙と文体に出る。英語圏の脚本はこの「人格=文体」の一致で書かれていて、ここが読めると映画の解像度が一段変わる。',
            takeaway: '実生活では冗談の皮肉として転用できる。友達のしょうもない自慢に "You have my pity." -- フォーマルすぎる哀れみは笑いになる。',
        },
        {
            quote: 'Farewell.',
            speaker: 'Buzz',
            gapJp: 'Bye. / See you.',
            kenshi: 'goodbye ではなく farewell。一語で「永の別れを告げる高貴な者」を演出している。現代会話で farewell を素で使う人はいない。だからこそ、使うと確実に芝居がかって聞こえる。バズは大真面目に言っているが、観客にはそれが滑稽に映る。この「大真面目とズレの笑い」はアニメ英語の基本構造で、シュレック(9本目)で本格的に回収する。',
            culture: '別れの挨拶には bye < goodbye < farewell の格式の階段があり、上に行くほど「もう会わない」の含みが強くなる。語の選択そのものがメッセージになる。',
            takeaway: '冗談の去り際に "Farewell." と言って部屋を出る。それだけで笑いが取れる、費用対効果最強の一語。',
        },
    ] as KenshiLine[],
    // STEP 4: 捨てる許可 -- この3分間で聞き取らなくていい音
    discard: [
        { label: '物語専用語彙', body: 'Star Command / 宇宙もの固有名詞のくだり。バズの妄想世界の専門用語で、日常に転用する日は来ない。字幕で流し見してよい。' },
        { label: '背景音', body: 'ガソリンスタンドの環境音、トラックのエンジン、遠くのアナウンス。ネイティブも聞いていない。' },
        { label: '早口の independent 発言', body: 'ウッディが一人でまくし立てる部分の細部。要旨(俺は捨てられた)だけ取れれば、一語一句は不要。' },
    ],
    // 転用カード(トレーニング登録候補)
    cards: [
        { en: 'You have my pity.', ja: '(皮肉の哀れみ) お気の毒さま', note: 'フォーマルすぎる哀れみ=冗談。友人の自虐やしょうもない自慢への返し' },
        { en: "You're not X. You're Y.", ja: 'Xじゃない、Yだ(言い換えの2連打)', note: '英語の口論・訂正の基本型。2発目は1発目より具体的に' },
        { en: 'Farewell.', ja: '(芝居がかった別れ) さらばだ', note: '冗談の去り際に。格式の階段 bye < goodbye < farewell' },
    ],
};
