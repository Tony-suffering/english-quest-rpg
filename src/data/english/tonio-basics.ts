/**
 * とにお中1教室 — 初心者を置き去りにしないための土台。
 *
 * この番組の笑いは「冠詞の a が落ちた」で成立するが、それは a のルールを
 * 既に知っている人だけの笑いだ。知らない人には、読めない英語が並ぶだけになる。
 * それではコンプレックスを拗らせた上級者しか残らず、商売にならない。
 *
 * だがこの番組には、初心者を招き入れる材料が最初から揃っている:
 *   男の語彙は英検1級。文法は中学1年で止まっている。
 *   つまり彼が毎晩落としているのは、初心者がつまずくのと同じ場所だ。
 *
 * ここでは、その「持病」を文法用語ゼロで説明する。
 * 実例はすべて番組内の実際の発言。初心者が今日使える形まで落とす。
 */

export interface BasicLesson {
    id: string;              // GRAMMAR_PLAYERS の id と一致
    nickname: string;        // 番組内での二つ名
    plain: string;           // これは何か(文法用語を使わない説明)
    whyJp: string;           // なぜ日本人が落とすのか(共感の入口)
    rule: string;            // 覚えるルールは1つだけ
    ruleExample: { wrong: string; right: string };
    /** 番組内での実際の事故(初心者にも意味が分かるものを選ぶ) */
    cases: { night: number; said: string; should: string; why: string }[];
    /** 初心者が今日そのまま使える文 */
    useToday: { en: string; ja: string }[];
}

/** この商品のコンセプト。全ページの文言はここから外れないこと。 */
export const CONCEPT =
    'めちゃくちゃな英語でも、どんなレベルでも、人と楽しく話したいという気持ちさえあれば大丈夫。';

export const BASICS_META = {
    title: '今夜、25分だけ喋ってみる',
    hook: CONCEPT,
    pitch:
        '知らない国の知らない人と、25分いきなり喋る。相手の一日を聞き、こっちの一日を話す。' +
        '単語が出てこなくて詰まる。身振りで誤魔化す。それでも通じる。通じた瞬間、脳が変な汁を出す。' +
        'この番組の主役は毎晩それをやって、毎晩どこかで壊れている。文法は中学1年で止まったままだ。' +
        'それでも64夜、一度も会話が成立しなかった夜は無い。必要なのは英語力ではなく、喋りたい気持ちだけだった。',
    promise: 'どのレベルからでも始められる。今夜そのまま使える3フレーズを持って帰れる。',
    // 持病(文法)セクション用の枕。笑いの入口として使う。
    grammarHook: '語彙は英検1級。文法は中学1年。',
    grammarPitch:
        'この男は destitute や carcinogenic を平気で使うのに、毎晩 a を落とし、s を落とす。全部、中1で習うところだ。' +
        'つまり彼がつまずく場所は、あなたがつまずく場所と同じ。難しい単語を覚えても、ここは勝手には直らない。' +
        'だから安心して笑っていいし、安心して喋りに行っていい。',
};

// ============ レベル別の入口(会話が主役) ============

export type TalkLevel = 'basic' | 'mid' | 'hard';

export interface TalkStarter {
    en: string;
    ja: string;
    when: string;   // どの場面で使うか
}

export interface LevelGuide {
    level: TalkLevel;
    label: string;
    who: string;          // このレベルは誰向けか
    goal: string;         // 今夜のゴール(小さく、達成可能に)
    fun: string;          // このレベルで味わえる楽しさ
    starters: TalkStarter[];
    /** 番組内で実際に起きた「通じた」瞬間(このレベルで到達できる例) */
    proof: { night: number; en: string; what: string };
    watchOut: string;     // つまずきやすい所(持病への橋渡し)
}

export const LEVEL_GUIDES: LevelGuide[] = [
    {
        level: 'basic',
        label: '初級',
        who: '英語で喋ったことがない。単語しか出てこない。沈黙が怖い。',
        goal: '今夜のゴールは「文を作ること」ではなく、25分そこに居ること。単語だけでも会話は進む。',
        fun:
            '一番おいしいのは初級。「Rainy」しか言えなくても相手が全部拾ってくれるし、' +
            '通じた時の驚きが一番デカいのもこの時期。上手くなるほど、この驚きは薄くなる。',
        starters: [
            { en: "Sorry, my English is not good. Please speak slowly.", ja: 'すみません、英語が下手です。ゆっくり話してください。', when: '最初の30秒。これを言うと、相手の速度が確実に落ちる' },
            { en: "How do you say this in English?", ja: 'これは英語で何と言いますか。', when: '単語が出てこない時。詰まりを質問に変える魔法の一文' },
            { en: "That's interesting. Tell me more.", ja: '面白いですね。もっと聞かせてください。', when: '喋ることが無い時。相手に喋らせれば25分は埋まる' },
        ],
        proof: {
            night: 1, en: "My English is not that rusty!",
            what: '5年ぶりに口を開いた夜の一言。中学レベルの単語だけで、状況も感情も伝わっている。',
        },
        watchOut: 'a と s は落ちる。落ちても通じる。今は気にしなくていい(下の教室は、笑いに来る時だけ読めばいい)。',
    },
    {
        level: 'mid',
        label: '中級',
        who: '文は作れるが、言いたいことの半分も言えない。話題が続かない。',
        goal: '今夜のゴールは「自分の話を1つ、最後まで話しきる」。うまく話す必要はない。',
        fun:
            '中級の楽しさは、相手の言葉を盗めるようになること。' +
            '知らない表現が出てきた瞬間に「それ何?」と聞いて、その場で使い返す。会話が教材になる。',
        starters: [
            { en: "What do you make of this?", ja: 'これ、どう思いますか。', when: '話題を振る時。5語で議論の扉が開く(第8夜で実証済み)' },
            { en: "Sorry, what does that mean?", ja: 'すみません、それはどういう意味ですか。', when: '知らない表現が出た時。ここで聞ける人だけが伸びる' },
            { en: "It's hit or miss.", ja: '当たり外れがありますね。', when: '店・映画・人の評価。1つ持っておくと必ず使う' },
        ],
        proof: {
            night: 8, en: 'What do you make of this?',
            what: '資料を見せた直後に相手の解釈を引き出した5語。難しい単語はゼロ。それでも議論が始まった。',
        },
        watchOut: 'be動詞と一般動詞を同時に置きがち(I am go / people are tend to)。ここだけは直すと一気に伝わる。',
    },
    {
        level: 'hard',
        label: '上級',
        who: '会話は成立する。だが自分の英語が単調で、深い話になると崩れる。',
        goal: '今夜のゴールは「相手が考え込む質問を1つ投げる」。情報交換ではなく議論にする。',
        fun:
            '上級の楽しさは、母語では話さないことを話せること。' +
            '意識とは何か、なぜ働くのか。日本語だと恥ずかしくて言えない話が、英語だと言える。' +
            'この番組が22分でフライパンから神まで行けたのは、英語だったからだ。',
        starters: [
            { en: "Let me play devil's advocate for a second.", ja: 'ちょっと反対の立場から言わせてください。', when: '議論を組む時。角を立てずに反論できる' },
            { en: "I have no dog in this fight.", ja: 'この件に利害は無いです(中立です)。', when: '政治・宗教を振られた時の防御。第3夜で実戦投入' },
            { en: "That's exactly why I want real communication.", ja: 'だからこそ、生の会話がしたいんです。', when: 'AIの話題から、目の前の相手への敬意に着地させる' },
        ],
        proof: {
            night: 22, en: 'This broken English actually works.',
            what: '崩れた英語のまま、崩れた英語の価値を証明した一文。全64夜で最も本質に近い。',
        },
        watchOut: '抽象的な話ほど文が崩れる。長い文を諦めて短いSVOを3つ並べると、逆に伝わる。',
    },
];

export const LEVEL_PICKER_NOTE =
    'レベルは自己申告でいい。迷ったら初級から。上のレベルを覗くのも自由 — どうせ主役は英検1級の語彙で中1の文法ミスをする。順番はあまり関係ない。';

export function getLevelGuide(level: TalkLevel): LevelGuide | undefined {
    return LEVEL_GUIDES.find((g) => g.level === level);
}

// ============ 本体と、おまけ ============
// 一番大事な主従関係: 本体は日本語のコメディ。英語はおまけ。
// 「英語を教えるために笑いを使う」のではなく、「笑い話に英語が付いてくる」。
// この順序を守る限り、英語力ゼロの人が読者から外れることは無い。
// 笑いの客層は英語学習の客層より遥かに広い。商売としてもそちらが正しい。

export interface ContentLayer {
    no: number;
    name: string;
    weight: '本体' | 'おまけ' | 'おまけの中身';
    who: string;        // 誰が楽しめるか
    what: string;       // 何を書くか
    example: string;    // 実例(番組内)
    rule: string;       // 書くときの決まり
}

export const CONTENT_LAYERS: ContentLayer[] = [
    {
        no: 1,
        name: '日本語の笑い',
        weight: '本体',
        who: '全員。英語力はまったく関係ない。',
        what: 'その夜に起きた事故を、英語を1文字も使わずに書く。記事の8割はここ。読み物として単体で成立させる。',
        example: '「フライパンが『がん』という名前に改名された」「22分かけて神の支配権を論じ、最後の30秒で相手の宗教を聞いた」「調査兵団が、調査死体団になっていた」',
        rule: 'ここだけ読んで笑って帰る人が大多数でいい。それで正解。英語に触れずに1本書けるなら、それが一番強い記事。',
    },
    {
        no: 2,
        name: '崩れた英文と、正解',
        weight: 'おまけ',
        who: '興味がある人だけ。読み飛ばしても記事が成立するように置く。',
        what: '実際に口から出た英文と正解を並べる。本体の笑いを補強する注釈であって、主役ではない。',
        example: '"Frying pan called cancer?" → "Frying pans cause cancer?"(called と cause の1音違い)',
        rule: '英文の前に必ず日本語のオチが済んでいること。英文が読めなくても笑いは完結している状態にする。',
    },
    {
        no: 3,
        name: '持ち帰り表現',
        weight: 'おまけの中身',
        who: '欲しい人だけ持って帰る。手ぶらで帰る人がいても構わない。',
        what: '初級を必ず1つ、あとは好きなだけ。教材ではなく土産物売り場。',
        example: '初級「That\'s interesting.」/ 上級「play devil\'s advocate」',
        rule: '「勉強になります」を狙わない。狙うと途端に説教くさくなって、笑いが死ぬ。',
    },
];

export const CONTENT_LAYERS_NOTE =
    '英語を教えようとした瞬間に、この連載は英語学習コンテンツの棚に並ぶ。そこは激戦区で、しかも読者は「勉強」として身構える。' +
    'だが笑い話として置けば、英語に興味が無い人まで読む。英語はあくまで、笑いの理由として付いてくるだけでいい。';

export const BASIC_LESSONS: BasicLesson[] = [
    {
        id: 'kanA',
        nickname: '亡霊の a',
        plain:
            '英語では「1つの〜」を表すために、名詞の前に a を置く。' +
            'a dog(1匹の犬)、a guy(1人の男)。日本語には無い部品なので、意識しないと必ず消える。',
        whyJp:
            '日本語は「犬がいる」で数を言わない。だから英語でも数を言い忘れる。' +
            'これは英語力の問題ではなく、母語の癖。上級者になっても勝手には直らない — その証拠が、この番組の3勝37敗である。',
        rule: '「1人の / 1個の」と言えるものには、必ず a を付ける。形容詞が挟まっても、a は名詞句の一番前。',
        ruleExample: { wrong: 'I am shy guy.', right: 'I am a shy guy.' },
        cases: [
            {
                night: 67, said: "In a nutshell, it's a mind over matter.", should: "In a nutshell, it's mind over matter.",
                why: '決まり文句 mind over matter に a は入らない。同じ夜「It\'s not a farfetched」でも形容詞の前に a が湧き、逆に「versatile machine」「a quick version of oven」では落ちた。落とすか湧かせるかの二択で、真ん中が無い。',
            },
            {
                night: 66, said: 'I understand the your a true intention.', should: 'I understand your true intention.',
                why: '史上初、限定詞3枚(the+your+a)の同時出勤。椅子は1つ、座れるのは1枚だけ。昨夜の a some(2枚)を1夜で更新した新記録。',
            },
            {
                night: 65, said: 'Akihabara station is like a my transfer point.', should: 'Akihabara Station is like my transfer point.',
                why: 'a と my は同席できない(限定詞は1つ)。同じ夜に「a some interesting topic」も出た — a が他の限定詞の隣に湧く新型。',
            },
            {
                night: 64, said: "I'm somewhat spiritual guy.", should: "I'm a somewhat spiritual guy.",
                why: '「ちょっとスピリチュアルな男」も、男が1人なら a が要る。形容詞が2語に伸びると落としやすい。',
            },
            {
                night: 17, said: "I'm not outgoing guy.", should: "I'm not an outgoing guy.",
                why: '母音(o)で始まる語の前は a ではなく an。この「I\'m not ___ guy」は番組で最も落ちる型。',
            },
            {
                night: 40, said: 'I always book guy.', should: "I'm always a book guy.",
                why: 'be動詞(am)と a が同時に消えた。「俺は本の人間だ」と言いたかった。',
            },
        ],
        useToday: [
            { en: "I'm a shy guy.", ja: '俺は人見知りなんだ。' },
            { en: "It's a good idea.", ja: 'それはいい考えだ。' },
            { en: 'I have a question.', ja: '質問があります。' },
        ],
    },
    {
        id: 'thirdS',
        nickname: '消える s',
        plain:
            '主語が「彼・彼女・それ」など1人(1つ)のとき、動詞のおしりに s が付く。' +
            'He runs. She works. It costs. 主語が I / you / 複数のときは付かない。',
        whyJp:
            '日本語の動詞は主語で形が変わらない。「走る」は誰が走っても「走る」。' +
            'だから英語でも変えるのを忘れる。知識としては全員知っているのに、口が知らない。',
        rule: 'he / she / it に置き換えられる主語なら、動詞に s。everyone / nobody も「1人」扱いなので s が付く。',
        ruleExample: { wrong: 'He speak English.', right: 'He speaks English.' },
        cases: [
            {
                night: 67, said: 'Because of cancer, ah, many animals dies.', should: 'Many animals die of cancer.',
                why: '複数主語 animals に s が付いた。前夜「you sounds」で他人のシフトに出勤した s が、今夜は動物の群れにまで出勤している。同じ夜、本来の持ち場である「grandma drive」「how many medicine he take」は空席だった。',
            },
            {
                night: 66, said: 'You sounds somewhat rude.', should: 'You sound somewhat rude.',
                why: 's は he/she/it 専用で、you に付けると余る。同じ夜「no one speakS English」(06-28 nobody speak の雪辱)で歴史的出席を果たした直後、余った s が you のシフトに紛れ込んだ。',
            },
            {
                night: 65, said: 'That refresh me.', should: 'That refreshes me.',
                why: '主語が that(単数)なら動詞に s。直前の「that charge me」も同型で、2文連続の欠勤だった。',
            },
            {
                night: 64, said: 'Nobody understand quantum computer.', should: 'Nobody understands quantum computers.',
                why: 'nobody は「誰も1人として」なので単数扱い。ここが最も引っかかりやすい。',
            },
            {
                night: 28, said: 'Nobody speak English.', should: 'Nobody speaks English.',
                why: '同じ間違いを約1ヶ月後にそのまま再発させた。持病とはそういうもの。',
            },
            {
                night: 51, said: 'Every teacher have a style.', should: 'Every teacher has a style.',
                why: 'every の後ろは必ず1人ずつ数える。だから has。',
            },
        ],
        useToday: [
            { en: 'He works in Tokyo.', ja: '彼は東京で働いている。' },
            { en: 'It costs 500 yen.', ja: 'それは500円です。' },
            { en: 'She likes coffee.', ja: '彼女はコーヒーが好きです。' },
        ],
    },
    {
        id: 'beIns',
        nickname: 'are tend 症',
        plain:
            '英語の文には、動きを表す動詞(run, like, work)と、状態を表す be動詞(am, is, are)がある。' +
            'この2つは同じ文に並べて置けない。どちらか片方だけ。',
        whyJp:
            '日本語だと「彼は走る」も「彼は元気だ」も同じ「〜は」で始まる。' +
            'だから英語でも、とりあえず is / are を置いてから動詞を足したくなる。安心のために置いた be動詞が、文を壊す。',
        rule: '動詞があるなら be動詞は要らない。be動詞があるなら、その後ろは動詞ではなく状態(形容詞・名詞)。',
        ruleExample: { wrong: 'People are tend to work hard.', right: 'People tend to work hard.' },
        cases: [
            {
                night: 20, said: 'This industry is sucks.', should: 'This industry sucks.',
                why: 'suck は動詞なので is は不要。is と sucks が同じ椅子を奪い合った。',
            },
            {
                night: 67, said: "No agenda here. I'm just listening, I enjoying talking to you.", should: "No agenda here. I'm just listening -- I'm enjoying talking to you.",
                why: 'be動詞が1つしか出勤せず、2つ目の -ing が裸で残った。直前の I\'m just listening は言えているのに、次の I\'m だけが消える。be は連投すると息切れする。',
            },
            {
                night: 66, said: 'I genuinely sorry about what I said before.', should: "I'm genuinely sorry about what I said before.",
                why: 'sorry は形容詞なので be動詞が必須。気持ちが本物でも、I\'m が欠勤すると文法は謝ってくれない。同夜は「you kinda triggered」(受動の be落ち)も出た。',
            },
            {
                night: 65, said: 'Your country is also drug problem.', should: 'Your country also has a drug problem.',
                why: '「問題がある」は have。be で言うと国そのものが薬物問題になる。同夜は「is consist of」(be+一般動詞の二重)も出勤した。',
            },
            {
                night: 64, said: 'My frying pan also Teflon.', should: 'My frying pan is also Teflon.',
                why: '逆に、動詞が無い文では be動詞が必要。落とすか湧かせるかの二択になりやすい。',
            },
            {
                night: 25, said: 'People attracted to his pictures.', should: 'People are attracted to his pictures.',
                why: '「〜される」の形(受け身)には be動詞が要る。',
            },
        ],
        useToday: [
            { en: 'I work in Tokyo.', ja: '東京で働いています。' },
            { en: 'I am busy today.', ja: '今日は忙しいです。' },
            { en: 'He is tired.', ja: '彼は疲れています。' },
        ],
    },
    {
        id: 'prep',
        nickname: '迷子プリポジション',
        plain:
            'to / of / with / from など、名詞の前に置く小さな語。日本語の「〜に」「〜へ」「〜で」に当たる。' +
            'どの動詞にどれが付くかは、ほぼ暗記。',
        whyJp:
            '日本語の助詞と1対1で対応していない。「〜にアクセスする」を英訳すると access to にしたくなるが、' +
            'access は to を取らない。母語で考えるほど間違える種類のミス。',
        rule: '動詞は前置詞ごと1セットで覚える。access(直後に名詞) / listen to / look at のように、必ずセットで。',
        ruleExample: { wrong: 'I can access to the file.', right: 'I can access the file.' },
        cases: [
            {
                night: 67, said: "You're gonna end up being heroin.", should: "You're gonna end up on heroin.",
                why: '薬物を使っている状態は on。on heroin / on medication / on antidepressants でセット暗記する。on が落ちると「使う人」ではなく「物質そのもの」になり、転落人生が転生になる。',
            },
            {
                night: 66, said: "I'm a little bit scared you right now.", should: "I'm a little bit scared of you right now.",
                why: '「〜が怖い」は scared OF。of が落ちると scare you(あなたを怖がらせる)側に読めて、怯えているのがどちらか分からなくなる。恐怖の告白は前置詞ごと覚える。',
            },
            {
                night: 65, said: 'Akihabara is near and dear my heart.', should: 'Akihabara is near and dear to my heart.',
                why: '決まり文句は near and dear TO my heart(to が必須)。10分前に自分で却下した表現を、今度は本気で使いに来て to だけ落とした。',
            },
            {
                night: 64, said: 'take power out of from God', should: 'take power away from God',
                why: 'out of と from の2つが同時に出てきた。どちらか片方でいい。',
            },
            {
                night: 19, said: 'I re-listened the audio.', should: 'I re-listened to the audio.',
                why: 'listen は to が必須。access は to が不要。この2つは真逆なので混ざりやすい。',
            },
            {
                night: 26, said: 'stay away with him', should: 'stay away from him',
                why: '「離れる」は from。with だと逆に一緒にいることになる。',
            },
        ],
        useToday: [
            { en: 'I listen to music.', ja: '音楽を聴きます。' },
            { en: 'Look at this.', ja: 'これを見て。' },
            { en: "I'm from Japan.", ja: '日本から来ました。' },
        ],
    },
    {
        id: 'count',
        nickname: '数え番長',
        plain:
            '英語の名詞は「数えられるもの」と「数えられないもの」に分かれる。' +
            'apple は1個2個と数えられるが、water や money は数えられない。数えられない語には a も複数の s も付かない。',
        whyJp:
            '日本語は全部「水」「お金」で済む。数の区別を言葉の形で表さないので、' +
            '英語で急に「これは数えられるか」を毎回判定させられて事故る。',
        rule: '容器や単位で数えるものは数えられない。money / water / advice / information には a も s も付けない。',
        ruleExample: { wrong: 'I want to make a money.', right: 'I want to make money.' },
        cases: [
            {
                night: 4, said: 'I can make a money.', should: 'I can make money.',
                why: 'money は数えられない。1枚だけ数えたことになった。',
            },
            {
                night: 8, said: 'a difficult words', should: 'difficult words',
                why: 'a(1つ)と words(複数)が同時に出た。単数か複数か、どちらかに決める。',
            },
            {
                night: 30, said: 'millions of homelesses', should: 'millions of homeless people',
                why: 'homeless は「家の無い」という状態を表す語で、そのままでは数えられない。',
            },
        ],
        useToday: [
            { en: 'I need some water.', ja: '水がほしい。' },
            { en: 'I have two questions.', ja: '質問が2つあります。' },
            { en: 'Can I get some advice?', ja: 'アドバイスをもらえますか。' },
        ],
    },
];

export function getBasicLesson(id: string): BasicLesson | undefined {
    return BASIC_LESSONS.find((l) => l.id === id);
}
