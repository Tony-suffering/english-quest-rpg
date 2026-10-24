/**
 * Podcast Deep Dive #2 -- "なぜ、この15分のプレゼンは人を動かすのか"
 *
 * 素材: The Joe Rogan Experience "The Dangerous Precedent Behind Big Pharma's GLP-1 Patents"
 * ゲスト: Brigham Buhler (Ways2Well 創業者 / 元・製薬営業マン)
 *
 * 前回の Deep Dive (/english/podcast/why) が「なぜ聞けないのか」のリスニング解剖だったのに対し、
 * 今回は逆方向 -- 「超一流の話し手は、15分の即興でどう議論を組み立てているか」の説得術解剖。
 * 相手は巨大製薬ロビー。武器は構成・数字・比喩・リズム。全部そのままビジネス英語に転用できる。
 *
 * 全文対訳データは podcast-glp1-transcript.ts。
 */

import { GLP1_TRANSCRIPT } from './podcast-glp1-transcript';
import type { DeepDiveSegment, DeepDiveLine } from './podcast-deep-dive-transcript';

export { GLP1_TRANSCRIPT };
export type { DeepDiveSegment, DeepDiveLine };

export interface Glp1Meta {
    show: string;
    guest: string;
    title: string;
    subtitle: string;
    youtubeId: string;
    url: string;
    thesis: string[];
}

// 15分の論の設計図 -- どの順番で、何を仕掛けているか
export interface ArgumentBeat {
    time: string;       // タイムスタンプ
    label: string;      // その区間で起きていること (短い日本語)
    move: string;       // 仕掛けの名前
    detail: string;     // 解説
    quote?: string;     // 象徴する実セリフ (英語)
}

// 説得の解剖 -- 技術単位
export interface PersuasionMove {
    no: number;
    title: string;
    body: string[];
    example?: { en: string; ja: string };
}

// 盗める型 -- 明日から使えるテンプレート
export interface StealLine {
    template: string;   // 型 (英語, X/Y 込み)
    ja: string;         // 型の意味
    quote: string;      // 実際のセリフ
    note: string;       // 使いどころ
}

// イディオム武器庫
export interface IdiomItem {
    phrase: string;
    literal: string;    // 直訳
    meaning: string;    // 実際の意味
    quote: string;      // 実セリフ
}

export interface Glp1GlossaryTerm {
    term: string;
    reading?: string;
    en: string;
    ja: string;
}

export const GLP1_META: Glp1Meta = {
    show: 'The Joe Rogan Experience',
    guest: 'Brigham Buhler (Ways2Well 創業者 / 元・製薬営業)',
    title: 'なぜ、この15分のプレゼンは人を動かすのか',
    subtitle: 'GLP-1特許戦争を語る元製薬営業マンの説得術を完全解剖する保存版',
    youtubeId: 'xoJAqKLvbqk',
    url: 'https://www.youtube.com/watch?v=xoJAqKLvbqk',
    thesis: [
        '前回の Deep Dive は「なぜ聞けないのか」を解剖しました。今回は逆です。「なぜこの男の話は効くのか」を解剖します。',
        '話しているのは元・製薬営業マン。相手にしているのは、年間数千万ドルをロビーに注ぐ巨大製薬企業。台本なしの15分で、彼は「相手の言い分を最強の形で語り、数字で潰し、争点をずらし、矛盾を並べ、ビジョンで締める」をやり切ります。',
        'これは英語のリスニング教材であると同時に、英語での議論・プレゼン・営業の教材です。使われている単語は難しくない。難しいのは、この順番でこの武器を出せること。その武器を1つずつ取り出して、盗めるようにしました。',
    ],
};

export const GLP1_ARGUMENT_MAP: ArgumentBeat[] = [
    {
        time: '0:00',
        label: '身近な話でつかむ',
        move: 'フック',
        detail: 'Ozempic顔・オプラ・UFCの減量。誰でも知っている光景から入り、「これはあなたの話だ」と聴衆を当事者にする。専門用語はまだ出さない。',
        quote: `You're seeing all these ladies that look like they're cutting weight to make the UFC flyweight division.`,
    },
    {
        time: '0:32',
        label: '敵の権威を先に崩す',
        move: '前提破壊',
        detail: '「専門医資格があるからペプチドは処方しない」と言う権威側に対し、「ほとんどの医者は毎日オフラベル処方をしている」という業界の常識をぶつけ、権威の看板を無効化する。',
        quote: `In reality, most clinicians are prescribing drugs off-label, right?`,
    },
    {
        time: '1:40',
        label: '論点を2つの箱に分ける',
        move: 'バケツ分割',
        detail: '「19ペプチドの危険リスト入り」と「GLP-1の特許戦争」を最初に分離。論点が混ざったまま話す素人と、ここで差がつく。',
        quote: `So I do want to put them in two different buckets.`,
    },
    {
        time: '2:18',
        label: '相手の言い分を最強の形で語る',
        move: 'スティールマン',
        detail: '製薬側の主張を、本人たちより説得力のある演技で再現してみせる。「その部分だけ聞けば説得力がある」とまで認める。これで聞き手は「この人は公平だ」と武装解除される。',
        quote: `If that regulator only hears that part of the story, it's a compelling story.`,
    },
    {
        time: '3:15',
        label: '税金が創薬している事実で前提をひっくり返す',
        move: 'ちゃぶ台返し',
        detail: '「何十億ドルかけた」の前提に対し、「市場に出る薬の大部分はNIH=税金由来」という一枚のカードで土台ごと崩す。Joeの「How is that legal?」を引き出した時点で勝ち。',
        quote: `You and I are paying to innovate and create molecules that then get licensed off to big pharmaceutical companies.`,
    },
    {
        time: '4:10',
        label: '時系列を再構成して善悪を反転',
        move: 'ナラティブ奪還',
        detail: '「調剤業者が特許を侵害した」ではなく「FDAが助けを求め、調剤業者が応えた」という時系列に組み直す。同じ事実でも、どちらの物語で語るかで善悪が反転する。',
        quote: `The truth of the matter is, the FDA sent out the bat signal.`,
    },
    {
        time: '4:49',
        label: '桁で殴る',
        move: '数字のズームアウト',
        detail: '8,000億ドル(リリーの時価総額) → 70億(調剤業界全体) → 25億(GLP-1) → 3,500万(今年)。桁を4段階落としてから「会計上の誤差」と命名。数字は多く並べるのではなく、落差で見せる。',
        quote: `So you're talking an accounting error for Big Pharma.`,
    },
    {
        time: '6:15',
        label: '争点を自分の土俵に付け替える',
        move: 'リフレーム',
        detail: '「GLP-1で争う気はない。危険な前例の話だ」と宣言し、相手が強い土俵(特許の正当性)から、自分が強い土俵(前例の危険性)へ戦場を移す。',
        quote: `I'm not here to argue about the GLP-1s. It sets a dangerous precedent.`,
    },
    {
        time: '6:50',
        label: '矛盾を無言で並べる',
        move: 'Meanwhile 並置',
        detail: '「リリーは中国産は危険だと言う」+「リリーは中国のペプチド企業を70億ドルで買収」。形容詞ゼロ。Meanwhile 一語で並べるだけで、聞き手が勝手に結論を出す。',
        quote: `Meanwhile, Eli Lilly just signed a 7-billion-dollar deal to acquire a peptide company out of China.`,
    },
    {
        time: '7:55',
        label: 'リズムで構造を焼き付ける',
        move: '連鎖の三段',
        detail: 'カネ→アクセス→影響力→結果、の連鎖(anadiplosis)と「1分 vs 9分のディベート」の比喩で、ロビー活動の構造を10秒で暗記可能にする。',
        quote: `Dollars equal accessibility. Accessibility equals impressionability. And impressionability equals outcomes.`,
    },
    {
        time: '8:46',
        label: '相手自身のデータで刺す',
        move: 'y\'all\'s numbers',
        detail: 'FDA長官に「これはあなたたちの数字ですよ」と前置きして60-80%のラベル変更率を突きつける。自分の数字は疑えても、自分自身の数字は否定できない。',
        quote: `Marty, if we're being honest -- these are y'all's numbers.`,
    },
    {
        time: '10:32',
        label: '個別の話を制度の話に格上げする',
        move: 'パラダイム宣言',
        detail: 'ペプチド論争を「処方箋管理制度 vs 医療制度」「病人ケア vs 予防」という制度設計の話に引き上げ、自分を「一業者」から「制度を語る人」に昇格させる。',
        quote: `It's become a prescription management system, not a health care system.`,
    },
    {
        time: '13:40',
        label: '敵を作らず全員をこちら側に',
        move: '脱・政治化',
        detail: '「政治の話にする気はない。慢性疾患は政治的立場を気にしない。病気と死は全員に来る」。聴衆の分断を先回りで無効化し、最大公約数の敵(病気)に付け替える。',
        quote: `Chronic disease doesn't care about your political leanings. Disease and death comes for all of us.`,
    },
    {
        time: '14:30',
        label: '対句とビジョンで締める',
        move: 'コントラスト・クローズ',
        detail: '「破局対応は世界一得意 / 予防は底なしの失敗作」という対句で現状を総括し、proactive / predictive / personalized の頭韻三連で未来を提示して終わる。締めの一文が拍手の合図になる構造。',
        quote: `We are absolutely an abysmal failure at preventing chronic disease and driving health span.`,
    },
];

export const GLP1_MOVES: PersuasionMove[] = [
    {
        no: 1,
        title: '相手の言い分を、相手より上手に語る',
        body: [
            '彼は自分の主張を言う前に、まず巨大製薬側の言い分を「机を叩く演技つき」で再現します。しかも雑な藁人形ではなく、最強の形で。「その部分だけ聞けば、説得力のあるストーリーだ」とまで言い切る。',
            'これはディベートで言う steelman(スティールマン)です。相手の主張を一番強い形で提示してから崩すと、聞き手は「この人は両方見た上で言っている」と感じ、その後の反論が全部信用されるようになる。',
            '日本人が英語で議論すると、真っ先に自分の結論から入りがちです。彼は逆で、最初の数分を「敵のプレゼン代行」に使う。遠回りに見えて、これが一番速い信頼構築だというのがプロの判断です。',
        ],
        example: {
            en: `If that regulator only hears that part of the story, it's a compelling story.`,
            ja: '「その部分しか聞かなければ、説得力のある話だ」。敵の主張を潰す前に、まず敵の主張の完成度を認める。',
        },
    },
    {
        no: 2,
        title: '数字は「量」ではなく「落差」で見せる',
        body: [
            '彼の数字の出し方には型があります。8,000億ドル(リリーの企業価値) → 70億ドル(調剤業界全体の売上) → 25億ドル(GLP-1調剤、しかも頼まれて作った期間) → 3,500万ドル(今年)。桁を4段階転げ落としてから、とどめに「会計上の誤差(an accounting error)」と命名する。',
            '数字を並べるだけなら誰でもできる。効くのは、相手の被害主張(70億ドル)を、相手の資産規模(8,000億ドル)の隣に置いた瞬間です。数字は絶対値ではなく、何の隣に置くかで意味が決まる。',
            'さらに、FDA長官には「これはあなたたち自身の数字ですよ(these are y\'all\'s numbers)」と前置きして60-80%のリコール率を出す。出典を相手自身にすると、反論の余地が構造的に消えます。',
        ],
        example: {
            en: `So you're talking an accounting error for Big Pharma.`,
            ja: '4段階の桁落としの着地点。数字の羅列を「誤差」という一語のラベルに変換して記憶に残す。',
        },
    },
    {
        no: 3,
        title: '概念に「名前」をつけて配る',
        body: [
            'bat signal(バットマンの緊急招集=FDAの供給要請)、shell game(手品のすり替え=生物製剤への再分類)、sick care system(病人ケア制度)、prescription management system(処方箋管理制度)。彼は抽象的な制度の話を、必ず持ち帰れる「名前」に変えてから配ります。',
            '名前がつくと、聞き手はその concept を他人に話せるようになる。つまり、命名は主張の拡散装置です。「アメリカの医療は予防に失敗している」は広まらないが、「あれは health care system じゃなくて prescription management system だ」は広まる。',
            '日本語の会議でも同じことは起きます。要点を言える人より、要点に名前をつけた人の言葉が議事録に残る。英語のプレゼンでは、この命名の上手さがそのまま知性の評価になります。',
        ],
        example: {
            en: `It's become a prescription management system, not a health care system.`,
            ja: 'not A but B の対比で命名。この一文だけでプレゼン全体を持ち帰れる。',
        },
    },
    {
        no: 4,
        title: 'リズムは飾りではなく記憶術',
        body: [
            '「Dollars equal accessibility. Accessibility equals impressionability. And impressionability equals outcomes.」-- 前の文の終わりを次の文の頭で受ける修辞技法(anadiplosis)です。カネ→アクセス→影響力→結果。ロビー活動の因果構造が、10秒で暗唱可能になる。',
            '締めの proactive, predictive, preventative / personalized は頭韻(alliteration)の三連。彼はこのPの三連を動画内で3回繰り返します。聞き手は3回目で「知ってる歌」を聞いた気分になる。これがスローガンの作り方です。',
            '英語のスピーチでリズム技法を使うのは大統領演説だけの話ではありません。彼は雑談用のポッドキャストで、口頭で、即興でこれをやっている。何度も同じ話をして磨き込んだ「持ちネタ」を即興に混ぜているからです。持ちネタを恥じないこと自体が技術です。',
        ],
        example: {
            en: `Dollars equal accessibility. Accessibility equals impressionability. And impressionability equals outcomes.`,
            ja: 'A=B、B=C、C=結果。しりとり式の連鎖で因果を一本の鎖にする。',
        },
    },
    {
        no: 5,
        title: '争点は「そこで戦わない」宣言で動かす',
        body: [
            '数字で製薬側を潰した直後、彼はこう言います。「これを全部並べた理由は、GLP-1について争うためじゃない。危険な前例の話だ」。相手が強い土俵(特許の正当性)を放棄し、自分が強い土俵(前例の危険性・滑り坂)に戦場を移した瞬間です。',
            '冒頭の「2つの箱に分けたい(two different buckets)」も同じ技術です。論点の仕分けを自分がやった側が、その後の議論の地図を握る。議題設定(agenda setting)は、会議で一番地味で一番強い権力です。',
            '日本人は英語の議論で「聞かれたことに全部答える」誠実さを発揮しがちですが、一流は答える論点を選び直してから答える。I\'m not here to argue about X. の一文は、そのための正当な手続きです。',
        ],
        example: {
            en: `I'm not here to argue about the GLP-1s. It sets a dangerous precedent.`,
            ja: '相手の土俵を降りる宣言。逃げではなく、戦場の指定し直し。',
        },
    },
    {
        no: 6,
        title: '矛盾は指摘しない。並べる',
        body: [
            '「リリーは"ペプチドは危険、中国産原薬は危険"とロビーしている」。その直後に一語 -- Meanwhile(その一方で)。「リリーは中国のペプチド企業を70億ドルで買収する契約にサインした」。',
            '彼は「偽善だ」「矛盾している」とは一度も言いません。事実を2つ、時間差ゼロで並べただけ。結論を言わずに聞き手に出させると、その結論は聞き手自身の発見になり、外から与えられた主張の何倍も強く定着します。',
            'Joeが「China.」と一語で返すのがその証拠です。聞き手が自分でオチを言い始めたら、説得は完了している。形容詞で殴るより、名詞と事実を置く。英語の議論で品位を保ったまま急所を打つ、一番安全な型です。',
        ],
        example: {
            en: `Meanwhile, Eli Lilly just signed a 7-billion-dollar deal to acquire a peptide company out of China.`,
            ja: 'Meanwhile 一語が「さっきの発言と並べて見ろ」の合図。評価語ゼロで有罪にする。',
        },
    },
    {
        no: 7,
        title: '最後は敵を消して、全員の話にする',
        body: [
            '15分の終盤、彼は突然ギアを変えます。「これを政治の話にする気はない。保守も民主党もどうでもいい。慢性疾患はあなたの政治的立場を気にしない。病気と死は全員に来る」。',
            'ここまでリリーを「主犯格(the main culprit)」とまで呼んで戦ってきたのに、締めでは敵を人間から「病気と死」に付け替える。誰も反対できない敵を設定し直すことで、聴衆全員を自陣に入れてから終わる。',
            'そして最後は対句です。「破局対応(triage)は世界一得意 / 慢性疾患の予防は底なしの失敗作(an abysmal failure)」。自国の医療を褒めてから落とす。この落差が、最後のPの三連(proactive, predictive, personalized)を解決策として輝かせる照明になっています。プレゼンの締めは要約ではなく、構図の提示です。',
        ],
        example: {
            en: `Chronic disease doesn't care about your political leanings. Disease and death comes for all of us.`,
            ja: '敵を「相手陣営」から「全員の敵」へ。分断しそうな聴衆を一つの側に束ねる締めの定石。',
        },
    },
];

export const GLP1_STEAL_LINES: StealLine[] = [
    {
        template: `Devil's advocate: of course ...`,
        ja: 'あえて相手側に立てば、もちろん〜',
        quote: `So, devil's advocate: of course you want to protect the patent rights of a company that spent billions of dollars.`,
        note: '反論の前の儀式。これを言ってから崩すと「公平な人」の椅子に座ったまま攻撃できる。会議で反対意見を言う前の枕に最適。',
    },
    {
        template: `The truth of the matter is, ...`,
        ja: '実際のところはこうです',
        quote: `The truth of the matter is, the FDA sent out the bat signal.`,
        note: '「ここから本当の話をする」の合図。相手の説明を一通り聞き終えた後の切り返しの頭に置く。The truth is より一段フォーマルで重い。',
    },
    {
        template: `I do want to put them in two different buckets.`,
        ja: 'この話は2つの箱に分けさせてください',
        quote: `So I do want to put them in two different buckets, because there's the 19 peptides ... and the GLP-1s.`,
        note: '論点整理の宣言。bucket はビジネス英語の頻出メタファー。仕分けした人が議論の地図を握る。',
    },
    {
        template: `If your concern is X -- (fact).`,
        ja: 'もし懸念がXなら、この事実を見てください',
        quote: `If your concern is that these companies didn't get the juice worth the squeeze from the patent -- Eli Lilly 7x'd the value of their company.`,
        note: '相手の懸念を先回りで言語化してから、事実を一枚で返す型。懸念の言語化を相手より先にやるのがポイント。',
    },
    {
        template: `I'm not here to argue about X. The real issue is Y.`,
        ja: 'Xで争う気はありません。本当の問題はYです',
        quote: `I'm not here to argue about the GLP-1s. It sets a dangerous precedent.`,
        note: '争点の付け替え。相手の得意分野から降りて、自分の土俵を指定する正当な手続き。',
    },
    {
        template: `Meanwhile, ...`,
        ja: 'その一方で、〜',
        quote: `Meanwhile, Eli Lilly just signed a 7-billion-dollar deal to acquire a peptide company out of China.`,
        note: '矛盾の並置スイッチ。直前の相手の主張と正反対の事実をこの一語で接続する。評価語は足さない。足すと弱くなる。',
    },
    {
        template: `If you zoom out, ...`,
        ja: '一歩引いて見ると、〜',
        quote: `But if you zoom out and you know the lay of the land a little bit more, the truth is always in the middle.`,
        note: '視座の引き上げ。各論で押され気味のときに、構図の話へ逃げずに「格上げ」する。zoom out は口頭で最も使いやすいカメラ系メタファー。',
    },
    {
        template: `The dirty secret is ...`,
        ja: '業界の汚い秘密はこうです',
        quote: `The dirty secret is: a large majority of the drugs that come to market come from the NIH.`,
        note: 'インサイダー情報の予告。次の一文の価値を2倍にする前置き。乱発すると安売りになるので1プレゼン1回。',
    },
    {
        template: `These are y'all's numbers.`,
        ja: 'これはあなたたち自身の数字ですよ',
        quote: `Marty, if we're being honest -- these are y'all's numbers. 60 to 80% of the drugs ... will have a major label change or recall.`,
        note: '相手の出典で刺す。データ議論の最強手。y\'all はテキサス訛りだが、your own numbers で同じ型が使える。',
    },
    {
        template: `It's like trying to win a debate where I get 1 minute and the opposition gets 9 minutes.`,
        ja: '持ち時間1分 vs 9分のディベートで勝てと言われているようなものです',
        quote: `And in the 1 minute, I've got to debunk all the lies that the opposition told.`,
        note: '不利な構造の可視化。「不公平だ」と言う代わりに、不公平さを体感できる比喩に変換する。数字入りの比喩は強い。',
    },
    {
        template: `You've got to view X like Y.`,
        ja: 'XはYと同じものとして見るべきです',
        quote: `You've got to view health insurance in America like car insurance. It's there if you wreck the car.`,
        note: '強制フレーミング。比喩を「提案」ではなく「見方の指定」として出す。直後にワンセンテンスで比喩の中身を説明するのがセット。',
    },
    {
        template: `We are great at A. We are an absolute failure at B.`,
        ja: 'Aは世界一得意。Bは完全な失敗作',
        quote: `We are great at triaging and treating a catastrophic event. We are absolutely an abysmal failure at preventing chronic disease.`,
        note: '対句クローズ。褒めてから落とすと、落差がそのまま主張の強度になる。プレゼンの締めに置く型。',
    },
];

export const GLP1_IDIOMS: IdiomItem[] = [
    {
        phrase: 'the juice worth the squeeze',
        literal: '絞る労力に見合う果汁',
        meaning: '苦労に見合うリターン。get the juice worth the squeeze で「割に合う」',
        quote: `If your concern is that these companies didn't get the juice worth the squeeze from the patent...`,
    },
    {
        phrase: 'cook the books',
        literal: '帳簿を料理する',
        meaning: '帳簿を粉飾する、数字をいじる。会計不正の定番イディオム',
        quote: `If you want to cook the books, you can make it look like you spent a billion to three billion.`,
    },
    {
        phrase: 'send out the bat signal',
        literal: 'バットシグナルを打ち上げる',
        meaning: '緊急の助けを呼ぶ(バットマンの召喚ライトから)。公式要請をヒーロー物語に変換する言い方',
        quote: `The FDA sent out the bat signal and said, "We can't meet the need of the American people."`,
    },
    {
        phrase: 'plant that stake way over here',
        literal: '杭をうんと向こうに打ち込む',
        meaning: '交渉の初期ポジションを極端な位置に置く(アンカリング)',
        quote: `And that's their stance, and they plant that stake way over here.`,
    },
    {
        phrase: 'shell game',
        literal: '貝殻の手品',
        meaning: 'どのカップに玉が入っているか当てさせる詐欺 → 意図的なすり替え・ごまかし',
        quote: `It's this whole shell game. But it sets precedent.`,
    },
    {
        phrase: 'slippery slope',
        literal: '滑りやすい坂',
        meaning: '一度許すと歯止めが利かなくなる状況。議論では「滑り坂論法」',
        quote: `It's a slippery slope. How long before they move to the next thing?`,
    },
    {
        phrase: 'in one breath',
        literal: '同じ一呼吸の中で',
        meaning: '舌の根も乾かぬうちに。矛盾した2つの発言を同時にすること',
        quote: `And in one breath, you've got a big pharmaceutical company saying peptides are dangerous...`,
    },
    {
        phrase: 'to the tune of $7 billion',
        literal: '70億ドルの曲に合わせて',
        meaning: '「〜という(大きな)金額規模で」。金額を強調する前置き',
        quote: `These guys hurt us to the tune of $7 billion.`,
    },
    {
        phrase: 'ears are going to perk up',
        literal: '耳がピンと立つ',
        meaning: '(犬の耳のように)興味を引かれて聞き入る',
        quote: `A politician's ears are going to perk up.`,
    },
    {
        phrase: 'get up to speed',
        literal: '速度まで上げる',
        meaning: '(新しい話題・仕事に)追いつく、キャッチアップする',
        quote: `Very confusing for someone who's not educated on this to get up to speed.`,
    },
    {
        phrase: 'wrap their head around it',
        literal: 'それに頭を巻きつける',
        meaning: '理解しようと格闘する。難解なものを飲み込もうとする定番表現',
        quote: `I think they're trying to wrap their head around it.`,
    },
    {
        phrase: 'play whack-a-mole',
        literal: 'モグラ叩きをする',
        meaning: '対症療法の繰り返し。潰しても潰しても次が出てくる状況',
        quote: `You don't do it playing whack-a-mole and treating the symptoms of a chronic disease.`,
    },
    {
        phrase: 'banging on the table',
        literal: '机を叩く',
        meaning: '強硬に主張する、ゴネる。ロビー活動の描写に最適',
        quote: `Those companies are banging on the table of legislators and politicians.`,
    },
    {
        phrase: 'the lay of the land',
        literal: '土地の起伏',
        meaning: '状況の全体像、業界の勢力図',
        quote: `If you zoom out and you know the lay of the land a little bit more...`,
    },
    {
        phrase: 'rip off our patents',
        literal: '特許を剥ぎ取る',
        meaning: 'パクる、盗用する。rip off は「ぼったくる」「パクる」の万能口語',
        quote: `You're allowing compounders and small independent pharmacies to rip off our patents.`,
    },
    {
        phrase: `7x'd the value`,
        literal: '価値を7倍した',
        meaning: '数字+x を動詞化する口語。10x(テンエックス)する、はシリコンバレー定番',
        quote: `Eli Lilly 7x'd the value of their company.`,
    },
];

export const GLP1_GLOSSARY: Glp1GlossaryTerm[] = [
    { term: 'GLP-1', reading: 'ジーエルピーワン', en: 'a gut hormone; GLP-1 drugs (semaglutide etc.) mimic it for weight loss', ja: '消化管ホルモン。それを模倣したダイエット・糖尿病薬の総称(オゼンピック、ウゴービ等)。本体はペプチド。' },
    { term: 'peptide', reading: 'ペプタイド', en: 'a short chain of amino acids', ja: 'アミノ酸の短い鎖。英語の発音はペプタイド。タンパク質より短い分子で、BPC-157などが該当。' },
    { term: 'Ozempic face', reading: 'オゼンピック・フェイス', en: 'facial gauntness from rapid GLP-1 weight loss', ja: '急激な減量で顔がこけた状態を指す俗語。セレブのビフォーアフターで話題に。' },
    { term: 'off-label', reading: 'オフレーベル', en: 'prescribing a drug outside its approved use', ja: '適応外処方。承認された用途・用量・患者集団の外で薬を使うこと。米国では合法で日常的。' },
    { term: 'board-certified', reading: 'ボードサーティファイド', en: 'certified by a medical specialty board', ja: '専門医認定を受けた。米国医師の権威の看板。動画では「権威で殴る枕詞」として登場。' },
    { term: 'compounder / compounding pharmacy', reading: 'コンパウンダー', en: 'a pharmacy that custom-mixes medications', ja: '調剤薬局・調剤業者。既存の原薬から薬を調合する。供給不足時には不足薬の製造が正式に認められる。' },
    { term: '503B', reading: 'ファイブオースリービー', en: 'an FDA-registered outsourcing facility that can compound at scale', ja: 'FDA登録の大規模調剤施設(アウトソーシング施設)。通常の調剤薬局(503A)より大量生産が可能。' },
    { term: 'shortage list / backlog', reading: 'ショーテッジリスト', en: 'the FDA list of drugs in short supply', ja: 'FDAの医薬品供給不足リスト。ここに載ると調剤業者による製造が認められる。これが今回の争点の起点。' },
    { term: 'NIH', reading: 'エヌアイエイチ', en: 'National Institutes of Health -- US taxpayer-funded research body', ja: '国立衛生研究所。税金で基礎研究と第I相試験を行う。「創薬の本当の出どころ」として登場。' },
    { term: 'HHS', reading: 'エイチエイチエス', en: 'Department of Health and Human Services', ja: '保健福祉省。FDA・NIH・CDCを束ねる親玉。Secretary Kennedy はこの長官(ロバート・F・ケネディ・ジュニア)。' },
    { term: 'API', reading: 'エーピーアイ', en: 'Active Pharmaceutical Ingredient', ja: '原薬。薬の有効成分そのもの。IT用語のAPIとは別物。中国が世界供給の大部分を握る。' },
    { term: 'most favored nation pricing', reading: 'モスト・フェイバード・ネイション', en: 'pricing pegged to the lowest price paid by other developed nations', ja: '最恵国価格。他の先進国が払う最安値に米国の薬価を合わせる政策。製薬の利益を直撃する。' },
    { term: 'biologics', reading: 'バイオロジクス', en: 'drugs made from living organisms; get longer market exclusivity', ja: '生物製剤。化学合成薬より長い独占期間が認められる。「ペプチドを生物製剤に再分類=特許10-12年延長」が危険な前例の中身。' },
    { term: 'blockbuster', reading: 'ブロックバスター', en: 'a drug with over $1B annual sales', ja: '年商10億ドル超の大ヒット薬。GLP-1は「人類史上最大のブロックバスター」。' },
    { term: 'patent infringement', reading: 'パテント・インフリンジメント', en: 'violating someone\'s patent rights', ja: '特許侵害。infringe upon a patent の形でも頻出。' },
    { term: 'label change / recall', reading: 'レーベルチェンジ / リコール', en: 'a forced revision of a drug\'s official warnings; or market withdrawal', ja: '添付文書(ラベル)の変更命令と回収。承認後に危険性が発覚した証拠として使われた数字が60-80%。' },
    { term: 'placebo', reading: 'プラシーボ', en: 'an inert control treatment', ja: '偽薬。「抗うつ薬はプラセボとほとんど差がない」の文脈で登場。英語の発音はプラシーボ。' },
    { term: 'SSRI / serotonin', reading: 'エスエスアールアイ / セロトニン', en: 'antidepressants based on the serotonin hypothesis', ja: 'セロトニン仮説に基づく抗うつ薬。「うつ=セロトニン不足」に直接の証拠がなかった、という話の主役。' },
    { term: 'BPC-157', reading: 'ビーピーシー・ワンファイブセブン', en: 'a peptide studied for tissue healing', ja: '組織修復系の研究用ペプチド。自然界由来ゆえ特許が難しく、大手が手を出さない例として登場。' },
    { term: 'chronic disease', reading: 'クロニック・ディジーズ', en: 'long-term conditions like diabetes and heart disease', ja: '慢性疾患。急性(acute)の対義語。「年間170-190万人が死ぬ」の主語。' },
    { term: 'health span', reading: 'ヘルススパン', en: 'the years lived in good health (vs. lifespan)', ja: '健康寿命。寿命(lifespan)との対で使う。予防医療界隈の中心ワード。' },
    { term: 'triage', reading: 'トリアージ', en: 'sorting and treating emergencies by urgency', ja: '緊急度による選別・応急対応。「破局対応は得意、予防は失敗作」の対句で使用。' },
    { term: 'Eli Lilly / Novo Nordisk', reading: 'イーライリリー / ノボ・ノルディスク', en: 'the two GLP-1 giants (Zepbound/Mounjaro; Ozempic/Wegovy)', ja: 'GLP-1二強。リリーは米国、ノボはデンマーク。動画では「リリーが主犯格(the main culprit)」。' },
    { term: 'Marty Makary', reading: 'マーティ・マカリー', en: 'FDA Commissioner, surgeon and author', ja: 'FDA長官。外科医で著述家。「あなたたち自身の数字」をぶつけられた相手。' },
    { term: 'lobbying', reading: 'ロビイング', en: 'paid influence on legislators', ja: 'ロビー活動。dollars = accessibility の連鎖で構造が説明される。lobbyist(ロビイスト)とセットで。' },
];
