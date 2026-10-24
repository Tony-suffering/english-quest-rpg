/**
 * Podcast Deep Dive -- "なぜ英検1級・TOEIC満点でもネイティブ会話は聞けないのか"
 *
 * 保存版の1回。素材は Joe Rogan Experience の軍事回(特殊部隊出身ゲスト)。
 * 単語・文法は難しくないのに、日本人学習者にとって最も厳しい要素が全部重なる会話を
 * 教材にして、「英語力が低いから聞けない」のではなく「試験が測る英語とこの英語は
 * 処理方式が別物」だと解剖する。核心はスピーキングではなく listening(生音の知覚)。
 *
 * 全文対訳データは podcast-deep-dive-transcript.ts (機械的に起こしたもの)。
 */

import { DOD_TRANSCRIPT, type DeepDiveSegment, type DeepDiveLine } from './podcast-deep-dive-transcript';

export { DOD_TRANSCRIPT };
export type { DeepDiveSegment, DeepDiveLine };

export interface DeepDiveMeta {
    show: string;
    title: string;
    subtitle: string;
    youtubeId: string;
    url: string;
    // テーゼ (導入・日本語)
    thesis: string[];
}

export interface WhyPoint {
    no: number;
    title: string;      // 見出し (日本語)
    body: string[];     // 本文 (日本語・段落)
    example?: { en: string; ja: string }; // 論点を示す実際のセリフ
}

export interface ChunkDemo {
    sentence: string;   // 実際の一文 (英語)
    ja: string;         // 日本語の意味
    jpWay: string[];    // 日本人が復元しようとする単位 (細切れ)
    realWay: string[];  // 実際に投げられている意味の塊
    note: string;       // 解説 (日本語)
}

export interface GlossaryTerm {
    term: string;
    reading?: string;   // 発音の助け (カタカナ/簡易)
    en: string;         // 短い英英
    ja: string;         // 日本語の意味・背景
}

export const DEEP_DIVE_META: DeepDiveMeta = {
    show: 'The Joe Rogan Experience',
    title: 'なぜ、この会話は日本人に聞き取れないのか',
    subtitle: '英検1級でもTOEIC満点でも別世界に感じる — その正体を解剖する保存版',
    youtubeId: '',
    url: 'https://www.youtube.com/watch?v=',
    thesis: [
        'これは「英語力が低いから聞けない」のではありません。英検・TOEICが主に測っている英語と、ここで使われている英語の“処理方式”が別物だからです。',
        'この会話は、単語や文法だけ見ればそこまで難しくない。ところが実際には、日本人学習者にとって最も厳しい要素が全部重なっています。だから資格の頂点にいても「なんかおかしい、全然別の世界だ」と感じる。',
        'この回では、そのおかしさの正体を7つに分解します。結論を先に言うと — 足りないのは難単語ではなく、「英語を正しく完成させる力」ではなく、「英語で適当に反応し続ける力」です。',
    ],
};

export const WHY_POINTS: WhyPoint[] = [
    {
        no: 1,
        title: '本人たちも、完成した英文を発音していない',
        body: [
            '日本人は英語をこう捉えがちです。頭の中で文を作る → 一語ずつ正確に発音する → 相手が一語ずつ聞き取る。でも、この会話は違います。',
            '話者は一語ずつ提示していません。意味の塊(チャンク)を、速度・感情・リズムで投げている。聞き手も単語を全部復元してから意味を考えているわけではなく、途中で「ああ、国防総省が監査に通らない話ね」と予測し、残りを補っています。',
            'つまり、ネイティブ同士の会話は「音声の全文書き起こし競技」ではなく、予測しながら意味を共同制作する作業なんです。',
        ],
        example: {
            en: 'There’s a reason why the DoD has never passed an audit, but I mean, ever.',
            ja: '文字なら簡単。でも音声では「there’s a reason why the / DoD has never / passed an audit / but I mean / ever」と塊で投げられている。',
        },
    },
    {
        no: 2,
        title: '内容の前提知識が異常に多い',
        body: [
            'この会話には、英語以前の情報が大量に入っています。special operations / JSOC / DoD / Pentagon audit / fiscal year / serialized equipment / ordnance / Carl Gustaf / back blast / air burst / AR platform / REI / conventional teams …。',
            '英検1級保持者でも、軍事・米国政府・会計・特殊部隊の文化に詳しくなければ、音が聞こえても意味が結びつきません。逆に、アメリカ人でも軍事に興味がなければ Carl G や layer charges on top of it は普通に分からない可能性があります。',
            '「ネイティブなら全部聞ける」は幻想です。ネイティブは英語を聞いているだけでなく、自分が知っている世界を使って聞いています。',
        ],
        example: {
            en: 'A lot of that stuff is serialized.',
            ja: 'serialized(個別の管理番号がついている)を知らないと、音は聞こえても「なぜ書類が増えるのか」が繋がらない。',
        },
    },
    {
        no: 3,
        title: '会話があまりにも省略的',
        body: [
            '文法的に何を指すか言っていないのに、文脈で通じてしまう表現が連発します。たとえば That opens up the door. は、何へのドアなのか一言も言っていない。文脈上は「監査に落ち続けても罰せられないなら、不正や浪費が起きる余地が生まれる」の意味です。',
            'I think I got it with me. も直訳は「持っていると思う」ですが、ここでは装備をちゃんと管理しているか怪しい軍人の雑な態度を演じた冗談。It’s like tomatoes. You gotta eat them. は、兵器に使用期限がある話を、トマトにたとえて瞬間的に笑いへ変えています。',
            '日本人学習者は「文の意味」を探します。彼らは「今この人は、説明・皮肉・物まね・冗談のどれをしているか」を聞いています。この差が巨大です。',
        ],
        example: {
            en: 'That opens up the door.',
            ja: '「(不正や浪費が入り込む)余地が生まれる」。何のドアかは言わない。文脈が全部埋める。',
        },
    },
    {
        no: 4,
        title: '音声が崩れているのではなく、「崩れた形」が完成形',
        body: [
            '実際の会話では、同じ語を繰り返す/文を途中で変更する/主語を落とす/相手にかぶせる/like, I mean, you know, uh を大量に入れる/文法的に未完成のまま終わる、が普通です。',
            '「Now, is that to somehow or another mitigate potential actions that should not have been done, because you have to be so documented?」は、書き言葉として整理された質問ではありません。話しながら考え、表現を探し、方向修正している。思考が発生する現場そのものが音になっているんです。',
            '学習者は教科書で「Is the purpose of this documentation to prevent inappropriate actions?」のような完成文を学ぶ。だから教材英語に慣れた耳には、文がどこから始まってどこで終わったのかさえ分かりにくい。',
        ],
        example: {
            en: 'is that to somehow or another mitigate potential actions that should not have been done…',
            ja: '整った疑問文ではなく、考えながら言葉を探して方向修正している「思考の現場」。それが完成形。',
        },
    },
    {
        no: 5,
        title: 'TOEIC満点でも「音から意味への直結」ができるとは限らない',
        body: [
            'TOEICのリスニングは基本的に、発音が明瞭/話題が整理されている/問題文がある/何を聞けばよいか分かっている/一定の速度/雑談的な脱線が少ない、という環境です。',
            'でもこの会話は、軍の事務作業 → 監査 → 予算 → 古い弾薬 → ロケット兵器 → 肺へのダメージ → ロボット犬 → 弾薬処分 → 靴 → ファッション、と猛烈に飛びます。',
            'TOEICは「提示された情報を正しく処理できるか」を測る。この会話は「話題がどこへ飛ぶか分からない状態で、人間の意図とノリを追跡できるか」を要求する。別競技です。',
        ],
        example: {
            en: 'See, this is the argument for those little robot dogs.',
            ja: '弾薬の肺ダメージの話から、脈絡なくロボット犬へ。「次に何が来るか分からない」まま人の意図を追う競技。',
        },
    },
    {
        no: 6,
        title: 'なぜ、このように話せる純ジャパがほとんどいないのか',
        body: [
            '発音や語彙以前に、会話を作る発想が違うからです。純ジャパの上級者は話すとき、言いたい内容を決める → 文法的に組み立てる → 適切な単語を検索する → 発音する → 間違いを監視する、という処理をしがちです。',
            'この会話の人たちは、相手の言葉から連想が起きる → 既製の表現が反射的に出る → 途中で冗談を足す → 相手の反応を見て方向を変える → 文が壊れても気にせず次へ行く、という動きをしています。',
            '純ジャパが苦手なのは「英語を話すこと」だけではない。英語で雑に考えること、途中の思考をさらすこと、文法より場の勢いを優先することが苦手なんです。日本の英語教育で高得点を取るには間違いを減らす必要がある。しかしこう話すには、未完成でも出す・適当なたとえを出す・言い直す・笑いながら脱線する能力が要る。教育されてきた方向と、ほぼ逆です。',
        ],
        example: {
            en: 'I think I got it with me.',
            ja: '「たぶん持ってきてる(と思うけど)」。完璧を目指さず、雑なボケを反射で出す。純ジャパが最も苦手な動き。',
        },
    },
    {
        no: 7,
        title: '彼らは「英語表現」を選んでいない',
        body: [
            'Fuck, I’m about to lose my teeth. / You gotta have a wardrobe, Joe. / I don’t want to clash on the battlefield. / Being good at your job is second only to looking good while doing your job. — こういう発言は、英語表現集から選んでいるのではありません。',
            '状況を見て「歯が吹き飛びそう」「戦場でも服装は合わせろ」「能力の次に大事なのは見た目だ」という映像や笑いが先に出て、そのまま英語になっています。',
            '純ジャパはしばしば「この場合、どのフレーズを使えばいい？」と考える。彼らは「今、何を言ったら面白い？」と考えている。この差は語学力より深い。この会話は英語の試験ではなく、アメリカ人の脳内連想ゲームをリアルタイムで見せられているんです。',
        ],
        example: {
            en: 'Being good at your job is second only to looking good while doing your job.',
            ja: '「仕事ができることより、ほんの少しだけ下なのが、仕事中に格好よく見えること」。フレーズ選びではなく、笑いのオチが先。',
        },
    },
];

export const CHUNK_DEMOS: ChunkDemo[] = [
    {
        sentence: 'There’s a reason why the DoD has never passed an audit, but I mean, ever.',
        ja: '国防総省が監査に一度も通ってないのには、理由があるんだよ。マジで、一度も。',
        jpWay: ['There’s', 'a reason', 'why', 'the DoD', 'has', 'never', 'passed', 'an audit', 'but', 'I mean', 'ever'],
        realWay: ['There’s a reason why the DoD', 'has never passed an audit', 'but I mean', 'ever'],
        note: 'ネイティブは "the DoD" まで来た時点で「監査に通らない話ね」と予測し、残りは確認しているだけ。1語ずつ復元してから意味、ではなく、塊で投げて塊で受ける。最後の but I mean, ever は「マジで一度も」という念押しの追い塊。',
    },
    {
        sentence: 'Yeah, the rest of us are just out there like, “I think I got it with me.”',
        ja: '残りの俺らは、「たぶん持ってきてると思うけど」って感じだよ。',
        jpWay: ['Yeah', 'the rest of us', 'are', 'just', 'out there', 'like', 'I think', 'I got it', 'with me'],
        realWay: ['Yeah the rest of us are just out there like', '“I think I got it with me.”'],
        note: 'like で直接話法(物真似)に切り替わる合図。got it with me を直訳「持っている」で止まると、「装備管理がガバガバな軍人を演じたボケ」だと分からない。海兵隊だけ監査に通る、という直前の流れがオチの前提。',
    },
    {
        sentence: 'It could go bad. It’s like tomatoes. You gotta eat them.',
        ja: '悪くなるかもしれないからね。トマトみたいなもんで、食わなきゃいけない。',
        jpWay: ['It', 'could', 'go bad', 'It’s', 'like', 'tomatoes', 'You', 'gotta', 'eat', 'them'],
        realWay: ['It could go bad', 'It’s like tomatoes', 'You gotta eat them'],
        note: '兵器に使用期限がある、という話を0.5秒でトマトの比喩に飛ばして笑いに変換。日本人は「文の意味」を探し、彼らは「今、説明/皮肉/物真似/ボケのどれか」を聞いている。gotta = got to。',
    },
];

export const GLOSSARY: GlossaryTerm[] = [
    { term: 'ordnance', reading: 'オードナンス', en: 'military weapons, ammunition, and explosives', ja: '兵器・軍需品(特に弾薬・爆発物)。ordinance(条例)と綴りも音も紛らわしいので注意。' },
    { term: 'ammunition', reading: 'アミュニション', en: 'bullets, shells, and rounds fired from weapons', ja: '弾薬。口語では ammo。' },
    { term: 'serialized', reading: 'シリアライズド', en: 'given an individual serial number for tracking', ja: '個別の製造番号/管理番号が付けられた。これが「書類地獄」の原因。' },
    { term: 'JSOC', reading: 'ジェイソック', en: 'Joint Special Operations Command — top-tier US special forces', ja: '統合特殊作戦コマンド。米軍最精鋭の特殊部隊を束ねる組織。' },
    { term: 'DoD', reading: 'ディー・オー・ディー', en: 'the Department of Defense', ja: '(米国)国防総省。' },
    { term: 'the Pentagon', reading: 'ペンタゴン', en: 'the DoD headquarters; used to mean the DoD itself', ja: '国防総省本庁舎。五角形の建物名がそのまま国防総省の代名詞に。' },
    { term: 'audit', reading: 'オーディット', en: 'an official inspection of financial records', ja: '監査(特に財務監査)。pass an audit=監査に通る。' },
    { term: 'fiscal year', reading: 'フィスカル・イヤー', en: 'a 12-month accounting period (US govt: Oct 1–Sep 30)', ja: '会計年度。米政府は10月1日開始。だから9月に予算を使い切る話が出る。' },
    { term: 'IRS', reading: 'アイ・アール・エス', en: 'Internal Revenue Service — the US tax agency', ja: '内国歳入庁。米国の「税務署」。監査の比喩で登場。' },
    { term: 'Carl Gustaf', reading: 'カール・グスタフ', en: 'a shoulder-fired recoilless rifle (nicknamed "Carl G")', ja: 'スウェーデン製の無反動砲。撃ちすぎると肺を痛める、と会話のネタに。' },
    { term: 'back blast', reading: 'バックブラスト', en: 'the burst of gas ejected behind a recoilless weapon', ja: '後方爆風。無反動砲の後ろに噴き出す高圧ガス。後ろに立つと危険。' },
    { term: 'recoilless', reading: 'リコイルレス', en: 'producing little or no backward kick when fired', ja: '無反動(の)。反動をガス噴射で相殺する方式。' },
    { term: 'air burst', reading: 'エアバースト', en: 'a warhead set to explode in mid-air, not on impact', ja: '空中炸裂。着弾ではなく空中で爆発させる設定。壁の裏の敵に有効。' },
    { term: 'JDAM', reading: 'ジェイダム', en: 'Joint Direct Attack Munition — a guided bomb kit', ja: '通常爆弾を精密誘導弾に変えるキット。「トマト型ではない」のツッコミ対象。' },
    { term: 'LAW rocket', reading: 'ロー・ロケット', en: 'Light Anti-armor Weapon — a disposable rocket launcher', ja: '携帯対戦車ロケット(使い捨て)。' },
    { term: 'Barrett / .50 caliber', reading: 'バレット / フィフティキャル', en: 'a heavy .50-cal (12.7mm) anti-materiel rifle', ja: 'バレット社の.50口径(12.7mm)対物ライフル。撃つと全身に衝撃。' },
    { term: 'AR platform', reading: 'エーアール・プラットフォーム', en: 'the AR-15/M4 family of rifles', ja: 'AR系ライフルの総称。弾がボルトで薬室に押し込まれる構造の説明で登場。' },
    { term: 'chamber / bolt / magazine', reading: 'チャンバー/ボルト/マガジン', en: 'the firing chamber, the bolt, and the ammo magazine', ja: '薬室/ボルト(遊底)/弾倉。弾が「密閉されるから前に飛ぶ」の話の部品。' },
    { term: 'expend', reading: 'イクスペンド', en: 'to use up completely (esp. ammunition)', ja: '(弾薬を)撃ち尽くす・使い切る。「支給された分は全部撃て」の核。' },
    { term: 'training evolution', reading: 'トレーニング・エボリューション', en: 'a scheduled training exercise or serial', ja: '軍隊での訓練課目・一連の訓練。日常語 evolution(進化)とは別の軍用法。' },
    { term: 'berm', reading: 'バーム', en: 'a raised earth bank used as a safety barrier', ja: '土手・防壁。射場で爆風を遮る安全用の盛り土。' },
    { term: 'bean counter', reading: 'ビーン・カウンター', en: '(informal) an accountant obsessed with numbers', ja: '会計屋・経理担当の俗称(やや皮肉)。「豆を数える人」。' },
    { term: 'REI', reading: 'アール・イー・アイ', en: 'a large US outdoor-gear retailer', ja: '米大手アウトドア用品店。「軍が普通にREIで注文する」がオチ。' },
    { term: 'conventional teams', reading: 'コンベンショナル・チームズ', en: 'regular (non-special-forces) military units', ja: '通常部隊。特殊部隊に対して、装備調達の自由が少ない側。' },
];
