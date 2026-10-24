/**
 * 赤ペン台帳 -- AI が書いた英語を、DMM の先生が直した記録。
 *
 * 本人は「自分はまだ英語の変さを判定できる水準にいない。日本語なら分かる」と言っている(第122夜・第125夜)。
 * だから AI で英語を作り、先生に見せ、赤が入った所を残す。1回ずつは小さいが、
 * たまると「AI が外しやすい型」が見える。次に AI に英語を頼むとき、その型を先に潰せる。
 *
 * 出どころ: 2026-09-30 に dmm-show.ts の全夜を読み直し、AI の英語を先生に見せた場面を拾った(89回 / 36夜)。
 * ここに載せたのは、先生の言葉が記録に残っている件だけ。
 *
 * 追記ルール
 * - 先生が実際に言ったことだけを quote に書く。推測で赤を増やさない
 * - fixed が先生の直しでないときは what にそう書く(「直しの文は台帳側の提案」)
 * - 型の件数はページで cases から数える。数字を手で書かない
 * - QUEUE は次のレッスンに持っていく未検品の文。先生に見せたら cases に移す
 */

export type Verdict = 'fixed' | 'weird' | 'term' | 'content' | 'self' | 'passed' | 'overruled';

export interface AkapenCase {
    night: number;
    date: string;
    /** AI が書いた元の英語 */
    ai: string;
    /** 先生が言ったこと(記録から、短く) */
    quote: string;
    /** 直した英語。直しが無い場合は空 */
    fixed: string;
    /** 何が起きたか(日本語) */
    what: string;
    verdict: Verdict;
    /** どの型か(AKAPEN_PATTERNS の id) */
    pattern: string;
}

export const VERDICT_LABEL: Record<Verdict, string> = {
    fixed: '直された',
    weird: '変だと言われた',
    term: '言葉の注意',
    content: '中身を足された',
    self: '本人が自分で止めた',
    passed: '通った',
    overruled: 'AIの直しが外れた',
};

/** 全夜を読み直して数えた、AI の英語を先生に見せた回数(2026-09-30 時点) */
export const AKAPEN_TOTAL = {
    shown: 89,
    nights: 36,
    breakdown: [
        { label: '通った', n: 17 },
        { label: '変だと言われた', n: 7 },
        { label: 'はっきり直された', n: 5 },
        { label: '先生がその言葉を知らない・言葉の注意', n: 9 },
        { label: '英語ではなく中身を足された', n: 26 },
        { label: '先生が何か言う前に本人が止まった', n: 25 },
    ],
};

export const AKAPEN_CASES: AkapenCase[] = [
    {
        night: 125, date: '2026-09-30',
        ai: 'AI transcription allows professionals to reclaim hours once swallowed by paperwork.',
        quote: 'I personally think it sounds weird, swallowed. ... Even when I typed into AI, time being swallowed, it refers to a book. I would definitely, 100% change that swallowed for eaten up.',
        fixed: 'AI transcription allows professionals to reclaim hours once eaten up by paperwork.',
        what: '先生は swallowed で止まり、自分で AI に打って本の話が出てくるのを確かめてから eaten up に直した。本人はその場で復唱したが、数分後の音読では eaten by と読み、up が落ちた。',
        verdict: 'fixed', pattern: 'literary-verb',
    },
    {
        night: 125, date: '2026-09-30',
        ai: 'Wearable AI encourages patients to seek treatment long before symptoms become irreversible.',
        quote: "I've never really heard of wearable AI. I was imagining a smart watch, but it has AI on it.",
        fixed: 'Smartwatches can nudge people to see a doctor long before symptoms become irreversible.',
        what: '文は通ったが、wearable AI という言い方を先生は聞いたことがなかった。先生は調べて「もう少し高機能な指輪か時計」と言い直した。直しの文は台帳側の提案。',
        verdict: 'term', pattern: 'coined-label',
    },
    {
        night: 124, date: '2026-09-29',
        ai: 'AI が書いたブルワーズのポストシーズン記事(103勝 / 防御率1.80 / 被打率.157)',
        quote: 'Other teams play dirty tricks on him ... That was my number one worry.',
        fixed: '',
        what: 'AI の記事は数字を運んだ。ブルワーズファンの先生は、記事に1行も無い裏側を出した。敵地では相手がマウンドをいじる、だからホームフィールドが一番の武器、という見立て。英語の赤ではなく中身の赤。',
        verdict: 'content', pattern: 'numbers-only',
    },
    {
        night: 122, date: '2026-09-26',
        ai: 'Longevity is the ninety-year-old next door, and it outlives the plan every pension was built on.',
        quote: "I'm not sure that's a correct English sentence, it's a bit weird ... it's not how I would say it. The idea is nice, though. She just carries on.",
        fixed: 'She just carries on.',
        what: '違和感を言う、中身を認める、自分の言い方を置く、の3段で返してくれた。',
        verdict: 'weird', pattern: 'metaphor-definition',
    },
    {
        night: 122, date: '2026-09-26',
        ai: 'X undermines public trust in mothers.',
        quote: "public trust は合わない。children's trust in mothers(先生の直し)",
        fixed: "It undermines children's trust in their mothers.",
        what: 'public trust は政府・報道・制度に向けた公の信頼に使う語。型に個人(母親)を差し込んだら合わなくなった。',
        verdict: 'fixed', pattern: 'public-word-private-use',
    },
    {
        night: 122, date: '2026-09-26',
        ai: 'Transparency is the open book that answers for every line in it.',
        quote: 'this is maybe a little bit weird(本人)',
        fixed: '',
        what: '先生に言われた10分後、本人が読みかけて自分で止めた。同じ「抽象語 is 具体」の比喩の型。先生の判定は無い。',
        verdict: 'self', pattern: 'metaphor-definition',
    },
    {
        night: 119, date: '2026-09-23',
        ai: 'the path of least resistance',
        quote: "Physics is not my forte. ... It's the easy way out.",
        fixed: "It's the easy way out.",
        what: '先生は「あまり聞かない、使われているのを思い出せない」と言った。本人は「あなたが知らないなら使わない」と引っ込めた。先生はあとで意味を説明した。',
        verdict: 'term', pattern: 'rare-idiom',
    },
    {
        night: 117, date: '2026-09-21',
        ai: 'It always also brings about a marked improvement in quality of life for the family.',
        quote: 'To me it sounds a bit weird. Not my favorite.',
        fixed: "It always makes a real difference to the family's quality of life.",
        what: 'marked improvement を先生は「少し変、好きじゃない」と言った。本人はその場で noteworthy を選び直した。直しの文は台帳側の提案。',
        verdict: 'weird', pattern: 'formal-written',
    },
    {
        night: 117, date: '2026-09-21',
        ai: 'broaden access',
        quote: 'You hear that a lot in government announcements.',
        fixed: '',
        what: '役所の発表でよく聞く言い方。先生はその場で役所の演説を1本作ってみせた。会話で使うと役所っぽくなる。',
        verdict: 'term', pattern: 'formal-written',
    },
    {
        night: 117, date: '2026-09-21',
        ai: 'lend purpose / sap / breeds success',
        quote: "It's like you're giving meaning to it. / I use that one sometimes. / They do use breed like that.",
        fixed: '',
        what: '3つとも通った。sap は先生も時々使う。lend purpose は give meaning と同じで、少し重い。',
        verdict: 'passed', pattern: 'passed',
    },
    {
        night: 114, date: '2026-09-17',
        ai: 'chart their own course',
        quote: "It's not one that I use, but it's a nice one.",
        fixed: '',
        what: '使うかどうかと、いいかどうかを分けて答えてくれた。聞いたことはある、自分は使わない、でもいい。',
        verdict: 'passed', pattern: 'rare-idiom',
    },
    {
        night: 114, date: '2026-09-17',
        ai: 'generations to generations(本人が口にした形)',
        quote: 'From generation to generation.',
        fixed: 'From generation to generation.',
        what: '先生は説明せずに正しい形を2回言っただけで直した。A to A の形は単数。',
        verdict: 'fixed', pattern: 'broken-set-phrase',
    },
    {
        night: 109, date: '2026-09-12',
        ai: 'AI lowers the opportunity cost of trying.',
        quote: "That's a weird sentence. Doesn't mean anything. ... It's almost like jargon.",
        fixed: 'AI decreases the amount of time one has to spend on trying things.',
        what: '先生はその場で、中身が全部入った文に書き直して見せた。本人は「opportunity cost を渡したら AI が of trying を足した」と説明し、半生だと認めた。',
        verdict: 'weird', pattern: 'sounds-good-empty',
    },
    {
        night: 108, date: '2026-09-11',
        ai: 'Take the against side — agreeing with it is the easier route.',
        quote: 'That\'s actually bad English. "Take the against side." That\'s bad English.',
        fixed: "Take the other side. / Take someone's side.",
        what: '本人の英語を直すために AI が書いた英語を、先生が直した。take someone\'s side という定型を、AI が改造していた。第103夜にはもう本人の口に入っていた。',
        verdict: 'fixed', pattern: 'broken-set-phrase',
    },
    {
        night: 106, date: '2026-09-09',
        ai: 'With regard to debt, it imposes a burden that lasts for years.',
        quote: 'Yeah, we do speak in that way too. Yeah. Very formal.',
        fixed: '',
        what: '話し言葉でも使えるかを本人が直接聞いた。使える、ただしとても硬い。In the context of も同じ判定。',
        verdict: 'term', pattern: 'formal-written',
    },
    {
        night: 81, date: '2026-08-12',
        ai: '外部 AI の添削: a drop in the ocean を a drop in the bucket に直せ',
        quote: '',
        fixed: 'a drop in the ocean(本人の元の言い方のまま)',
        what: '相手は英国人。英国では ocean が普通で、bucket は米式。AI の赤より、本人が選んだ言い方の方が合っていた。',
        verdict: 'overruled', pattern: 'ai-overruled',
    },
    {
        night: 74, date: '2026-08-03',
        ai: '自分の note 記事を note の AI 自動翻訳で英訳したもの',
        quote: "I mean it could do with a bit of refinement, but it's pretty decent.",
        fixed: '',
        what: '全部 OK ではなく「もう一息だけど悪くない」。本人は「だいたい信用していい」と自分で結論した。',
        verdict: 'passed', pattern: 'passed',
    },
    {
        night: 43, date: '2026-07-09',
        ai: 'A quiet revolt in neuroscience(AI に「難しい単語を使え」と頼んだ見出し)',
        quote: "I don't like that. It's a nonsense term. Sounds very good, but factually there's no revolt.",
        fixed: '',
        what: '文法は無傷。中身がナンセンス。AI は響きのいい言葉を盛る。本人は響きのよさを正しさだと思って読み上げていた。',
        verdict: 'weird', pattern: 'sounds-good-empty',
    },
    {
        night: 43, date: '2026-07-09',
        ai: 'to let an afternoon go fallow',
        quote: "Fallow is a term from agriculture -- an empty, unused field. 'Unused' is probably the best word.",
        fixed: 'to leave an afternoon unused',
        what: '難しい単語を仕込ませた本人が、意味を知らずに音読して、その場で先生に聞いて初めて知った。',
        verdict: 'term', pattern: 'formal-written',
    },
    {
        night: 28, date: '2026-06-30',
        ai: 'AI に書かせた英検風の英作文(It is often argued that humanity can eventually attain complete and lasting world peace...)',
        quote: "From those couple of paragraphs it's kind of flawless. There isn't any mistake in it.",
        fixed: '',
        what: '「ミスが1つもない」。完璧なのは AI で、読み上げた本人ではない。同じ夜、Google 翻訳で英訳した宣伝文は「間違いじゃないけど、この of は少し変」と言われた。',
        verdict: 'passed', pattern: 'passed',
    },
];

export interface AkapenPattern {
    id: string;
    name: string;
    rule: string;
    /** 次に AI に頼むとき、先に言っておく一言。空なら無し */
    askAi: string;
}

export const AKAPEN_PATTERNS: AkapenPattern[] = [
    {
        id: 'sounds-good-empty',
        name: '響きはいいが、中身が無い',
        rule: 'A quiet revolt in neuroscience / the opportunity cost of trying。文法は正しいのに、何も言っていない。AI は「難しい語を使え」「賢く」と頼まれると、響きのいい語を足す。',
        askAi: '響きのいい言い回しより、中身が全部入った普通の文にして。',
    },
    {
        id: 'formal-written',
        name: '硬すぎる・役所の言葉',
        rule: 'With regard to(とても硬い) / broaden access(役所の発表) / a marked improvement(変) / go fallow(農業の言葉)。会話で言うと、演説か報告書に聞こえる。',
        askAi: '会話で使う言い方で。役所や報告書の言葉は避けて。',
    },
    {
        id: 'broken-set-phrase',
        name: '定型の改造',
        rule: "take someone's side を take the against side に、from generation to generation を generations to generations に。定型は1語でも変えると、壊れて聞こえる。",
        askAi: '決まった言い方は、形を変えずにそのまま使って。',
    },
    {
        id: 'metaphor-definition',
        name: '「抽象語 is 具体」の比喩',
        rule: 'Longevity is the ninety-year-old next door のような、抽象語を1つの絵で定義する文。日本語だと気が利いて見えるが、英語では変に聞こえることがある。',
        askAi: '「X is the Y」の比喩の定義文は使わないで。普通の説明文にして。',
    },
    {
        id: 'public-word-private-use',
        name: '公の語を個人に当てる',
        rule: 'public trust のような公の言葉の型に、個人(母親・友達)を差し込むと合わなくなる。',
        askAi: "型に名詞を差し替えたら、その名詞に合う言い方に変えて(public trust in mothers ではなく children's trust)。",
    },
    {
        id: 'literary-verb',
        name: '書き言葉の動詞が、口語の句動詞に負ける',
        rule: '時間が swallowed(飲み込まれる)は本の言い方。口では eaten up(食われる)。',
        askAi: '話し言葉で使う句動詞を優先して(eat up / take up / wipe out)。',
    },
    {
        id: 'rare-idiom',
        name: '正しいが、あまり使われない言い回し',
        rule: "chart their own course(先生は使わない、でもいい) / the path of least resistance(先生は思い出せない、It's the easy way out)。辞書に載っていても、口で言う頻度は低い。",
        askAi: '辞書の言い回しより、普通の人が口にする頻度の高い言い方を優先して。',
    },
    {
        id: 'coined-label',
        name: 'ニュースの見出し語(造語っぽい総称)',
        rule: 'wearable AI のような、業界やニュースで作られた総称。先生は聞いたことがなかった。人は smartwatch のように物の名前で言う。',
        askAi: '総称ではなく、普通の人が呼ぶ物の名前で書いて(smartwatch / phone / app)。',
    },
    {
        id: 'numbers-only',
        name: 'AI は数字を運ぶが、裏側は運ばない',
        rule: '英語の問題ではない。AI の記事は数字と事実を並べる。その場にいる人の見立て(マウンドをいじられる)は出てこない。だから記事は「質問の入り口」として持っていく。',
        askAi: '記事の最後に、ファンや現場の人に聞くための質問を3つ付けて。',
    },
    {
        id: 'ai-overruled',
        name: 'AI の赤ペンが外れる',
        rule: 'a drop in the ocean を bucket に直せ、と AI が言った。相手は英国人で、ocean で合っていた。AI の直しも、相手の国によっては外れる。',
        askAi: '直しを出すときは、英国と米国で言い方が違うかどうかも書いて。',
    },
    {
        id: 'passed',
        name: '通った',
        rule: "全部ダメなわけではない。flawless(第28夜)、pretty decent(第74夜)、it's quite clever(第114夜)。見せた89回のうち17回は通っている。",
        askAi: '',
    },
];

export interface AkapenQueueItem {
    finger: string;
    verb: string;
    en: string;
    status: 'checked' | 'unchecked';
    note: string;
}

/** 第125夜に持ち込んだ10文。先生が見たのは2文だけ。残り8文は次のレッスンに持っていける */
export const AKAPEN_QUEUE: AkapenQueueItem[] = [
    { finger: 'MONEY', verb: 'enable', en: 'AI enables small firms to compete with corporate giants on a fraction of the budget.', status: 'unchecked', note: '' },
    { finger: 'TIME', verb: 'allow', en: 'AI transcription allows professionals to reclaim hours once swallowed by paperwork.', status: 'checked', note: 'swallowed → eaten up(第125夜)' },
    { finger: 'BODY', verb: 'encourage', en: 'Wearable AI encourages patients to seek treatment long before symptoms become irreversible.', status: 'checked', note: 'wearable AI を先生は聞いたことがなかった(第125夜)' },
    { finger: 'HAPPINESS', verb: 'force', en: 'Endless algorithmic comparison forces teenagers to measure their worth against curated fantasies.', status: 'unchecked', note: 'curated fantasies は「響きはいいが中身が無い」型かもしれない。先生に聞く' },
    { finger: 'EDUCATION', verb: 'enable', en: 'Adaptive tutoring enables students in remote villages to learn at their own pace.', status: 'unchecked', note: 'adaptive tutoring は「造語っぽい総称」型かもしれない' },
    { finger: 'FAIRNESS', verb: 'require', en: 'The law should require employers to prove that their hiring algorithms treat every applicant equally.', status: 'unchecked', note: '' },
    { finger: 'FREEDOM', verb: 'force', en: 'Ubiquitous facial recognition forces citizens to think twice before joining a peaceful protest.', status: 'unchecked', note: 'ubiquitous は本人が読み直した。「硬すぎる」型かもしれない' },
    { finger: 'TRUST', verb: 'require', en: 'Transparency rules require developers to disclose how their models reach life-changing decisions.', status: 'unchecked', note: '' },
    { finger: 'ROOTS', verb: 'allow', en: 'Real-time translation allows elderly immigrants to pass on their stories to grandchildren who never learned their language.', status: 'unchecked', note: '' },
    { finger: 'NATURE', verb: 'encourage', en: 'Precision farming encourages growers to apply fertilizer only where the soil genuinely needs it.', status: 'unchecked', note: '画面のアイコンで隠れて、先生が読んだ文' },
];

/** 先生に見せるときの聞き方。質問そのものが塊になる */
export const AKAPEN_ASK: { en: string; ja: string }[] = [
    { en: 'Would you actually say this?', ja: 'これ、実際に言います?' },
    { en: 'Does this sound natural to you?', ja: 'これ、自然に聞こえますか?' },
    { en: 'How would you put it?', ja: 'あなたならどう言います?' },
    { en: 'Is this something people say, or is it more of a written thing?', ja: 'これは口で言うもの? それとも書き言葉?' },
];
