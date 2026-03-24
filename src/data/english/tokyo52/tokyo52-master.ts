/**
 * Tokyo 52 -- Advanced Conversational English (Weekly Program)
 *
 * For people who already have basic English and want to express opinions,
 * discuss culture, debate ideas, and navigate nuance.
 *
 * Format: Japanese -> 4-level English (Core / Vibe / Scene / Flow)
 * Each week = 1 topic, 15 expressions, 5 keywords, 1 story
 * 52 weeks = 1 year of advanced conversational mastery
 *
 * Characters:
 *   Yuki (27F) - trading company sales, TOEIC 620, daytime persona: serious, frustrated, determined
 *   Aya (24F) - returnee junior colleague, fluent but never condescending
 *   Rina (22F) - cafe barista, self-taught via YouTube/Netflix, no study abroad
 *   Master Gondo (78M) - izakaya cameos only, truth bombs
 *
 * Content standard: same as 365 -- context field is the product core
 * - Izakaya-friend tone, real linguistic insight, cultural gap, humor
 * - 2-3 sentences (60-100 chars), never bracket notation, never textbook jargon
 */

// ============================================================
// TYPES
// ============================================================

export interface Tokyo52Expression {
    weekSlot: number;
    japanese: string;
    english: [string, string, string, string]; // [Core, Vibe, Scene, Flow]
    context: string;
    character: 'yuki' | 'aya' | 'rina' | 'master' | 'client';
    category: 'opinion' | 'culture' | 'work' | 'debate' | 'emotion' | 'society' | 'travel';
    season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface Tokyo52KeyWord {
    en: string;
    ja: string;
    pron: string;
    example: string;
    note: string;
}

export interface Tokyo52WeekMeta {
    week: number;
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: Tokyo52KeyWord[];
}

// ============================================================
// CATEGORY META
// ============================================================

export const TOKYO52_CATEGORIES: Record<string, { label: string; color: string; bg: string }> = {
    opinion:  { label: '意見',   color: '#7C3AED', bg: '#F5F3FF' },
    culture:  { label: '文化',   color: '#0891B2', bg: '#ECFEFF' },
    work:     { label: '仕事',   color: '#2563EB', bg: '#EFF6FF' },
    debate:   { label: '議論',   color: '#DC2626', bg: '#FEF2F2' },
    emotion:  { label: '感情',   color: '#D97706', bg: '#FFF7ED' },
    society:  { label: '社会',   color: '#059669', bg: '#ECFDF5' },
    travel:   { label: '旅',     color: '#8B5CF6', bg: '#F5F3FF' },
};

// ============================================================
// 4-LEVEL SYSTEM (shared with 365 but described here for clarity)
// ============================================================

export const TOKYO52_LEVELS = [
    { key: 'core',  label: 'Core',  ja: '核',   desc: '最短の型',         color: '#78716C' },
    { key: 'vibe',  label: 'Vibe',  ja: '空気', desc: '感情込み',         color: '#D4AF37' },
    { key: 'scene', label: 'Scene', ja: '場面', desc: '実際の一言',       color: '#10B981' },
    { key: 'flow',  label: 'Flow',  ja: '流れ', desc: 'ネイティブの脳内', color: '#3B82F6' },
] as const;

// ============================================================
// WEEK THEMES (Episodes 1-4, Spring)
// ============================================================

export const TOKYO52_WEEK_THEMES: Record<number, Tokyo52WeekMeta> = {

    // ── WEEK 1: 意見を言う ──────────────────────────────────
    1: {
        week: 1,
        title: '意見を言う',
        titleEn: 'Sharing Opinions',
        category: 'opinion',
        scene: 'カフェでユキとアヤが仕事の愚痴から「日本人はなぜ意見を言わないか」の議論に発展。リナも巻き込まれる。',
        keywords: [
            { en: 'perspective', ja: '視点・見方', pron: 'パースペクティブ', example: 'From my perspective, that is not the issue.', note: 'point of viewの格上版。ビジネスでも議論でも使える万能語。in perspectiveで「客観的に見ると」。' },
            { en: 'disagree', ja: '反対する', pron: 'ディサグリー', example: 'I respectfully disagree.', note: '日本語では「反対する」をほぼ言わない。英語では disagree と言ってから理由を述べるのが普通。むしろ言わないと不誠実。' },
            { en: 'valid', ja: '妥当な・正当な', pron: 'ヴァリッド', example: 'That is a valid point.', note: '相手の意見を認めるときの最強ワード。「一理ある」に最も近い。valid = パスポートの有効期限にも使う。' },
            { en: 'nuance', ja: 'ニュアンス', pron: 'ニューアンス', example: 'There is a lot of nuance to this.', note: '発音注意。日本語の「ニュアンス」と全然違う。ニューアンス。英語で議論するとき「単純じゃないよ」と言いたいときに使う。' },
            { en: 'argument', ja: '主張・論点', pron: 'アーギュメント', example: 'What is your argument?', note: '「ケンカ」ではなく「論点」。英語のargumentは論理的な主張。日本語の「アーギュメント」は険悪な響きだけど英語では知的な単語。' },
        ],
    },

    // ── WEEK 2: 日本を説明する ──────────────────────────────
    2: {
        week: 2,
        title: '日本を説明する',
        titleEn: 'Explaining Japan',
        category: 'culture',
        scene: '外国人の同僚に「なぜ日本人は会議で黙るの？」と聞かれて答えに困るユキ。アヤとリナに助けを求める。',
        keywords: [
            { en: 'misconception', ja: '誤解・思い込み', pron: 'ミスコンセプション', example: 'That is a common misconception about Japan.', note: 'misunderstandingが「勘違い」なら、misconceptionは「思い込み」。文化の話で超頻出。外国人の日本イメージを訂正するとき必須。' },
            { en: 'equivalent', ja: '相当するもの', pron: 'イクイヴァレント', example: 'There is no English equivalent for that word.', note: '「空気を読む」にはno English equivalentがある。日本語を説明するときの最強の入口。「直訳できない」よりスマート。' },
            { en: 'concept', ja: '概念', pron: 'コンセプト', example: 'It is a uniquely Japanese concept.', note: '日本語の「コンセプト」はデザイン系で使うけど英語のconceptはもっと広い。思想や考え方全体。wabi-sabi is a concept。' },
            { en: 'generalize', ja: '一般化する', pron: 'ジェネラライズ', example: 'I do not want to generalize, but...', note: '日本文化を語るとき「全員がそうじゃないけど」と前置きするのに使う。ポリコレ時代の必須ワード。butの後が本題。' },
            { en: 'evolve', ja: '進化する・変わる', pron: 'イヴォルヴ', example: 'Japanese work culture is evolving.', note: 'changeより前向き。「変わりつつある」をevolveで表現すると知的に聞こえる。日本語の「進化」とほぼ同じだけど日常会話でも使う。' },
        ],
    },

    // ── WEEK 3: 仕事で使う英語 ──────────────────────────────
    3: {
        week: 3,
        title: '仕事で使う英語',
        titleEn: 'Professional English',
        category: 'work',
        scene: 'ユキの会社に外国人クライアントが来る。教科書の英語と実際のビジネス英語の差にユキが気づく一週間。',
        keywords: [
            { en: 'deadline', ja: '締め切り', pron: 'デッドライン', example: 'When is the deadline for this?', note: '日本語の「締め切り」は柔らかいけど英語のdeadlineは「死の線」。dead + line。文字通り死んでも守るもの。英語圏のdeadlineの重さは日本の比じゃない。' },
            { en: 'priority', ja: '優先事項', pron: 'プライオリティ', example: 'Let us prioritize the urgent items.', note: '名詞も動詞も使える。prioritize = 優先順位をつける。top priority = 最優先。日本語の「プライオリティ」はビジネス用語だけど英語では日常語。' },
            { en: 'feedback', ja: 'フィードバック', pron: 'フィードバック', example: 'I would love to get your feedback on this.', note: '日本語の「フィードバック」はダメ出しのイメージ。英語のfeedbackは良い点も含む。positive feedback は褒め言葉。ネガティブだけじゃない。' },
            { en: 'follow up', ja: '後追い確認する', pron: 'フォローアップ', example: 'I will follow up on that by Friday.', note: '日本語の「フォローする」は助ける意味だけど英語のfollow upは「追跡する・再確認する」。I will follow up = 私が後で確認します。混同注意。' },
            { en: 'alignment', ja: '認識合わせ', pron: 'アラインメント', example: 'We need alignment on the timeline.', note: '「認識を揃える」を一語で言える最強ビジネス英語。on the same page が砕けた版。alignment はフォーマルな会議向き。' },
        ],
    },

    // ── WEEK 4: 賛成と反対 ──────────────────────────────────
    4: {
        week: 4,
        title: '賛成と反対',
        titleEn: 'Agreeing and Disagreeing',
        category: 'debate',
        scene: '居酒屋で「AIは仕事を奪うか」の大議論。ユキ、アヤ、リナ、マスター全員参戦。酒が入って白熱する。',
        keywords: [
            { en: 'evidence', ja: '根拠・証拠', pron: 'エヴィデンス', example: 'What evidence do you have for that?', note: '日本語の「エビデンス」はビジネス用語。英語のevidenceは日常会話でも普通に使う。「根拠は？」と聞きたいとき最適。' },
            { en: 'hypothetical', ja: '仮定の話', pron: 'ハイポセティカル', example: 'Let me pose a hypothetical.', note: '「仮に〜だとしたら」の議論を始めるときの導入語。hypotheticallyで副詞。ディベートの必須アイテム。' },
            { en: 'extreme', ja: '極端な', pron: 'イクストリーム', example: 'That is a bit extreme, do you not think?', note: '日本語の「極端」と同じ使い方。相手の意見が飛びすぎたときの柔らかいブレーキ。a bit extremeで角が立たない。' },
            { en: 'counterpoint', ja: '反論・対論', pron: 'カウンターポイント', example: 'Here is my counterpoint.', note: 'counter(反対) + point(論点)。反論をスマートに切り出す単語。日本語で「でもね」の代わりにHere is my counterpointと言えたら議論レベルが上がる。' },
            { en: 'compromise', ja: '妥協・折り合い', pron: 'コンプロマイズ', example: 'Can we find a compromise?', note: '日本語の「妥協」はネガティブだけど英語のcompromiseは建設的。お互い歩み寄る=compromise。大人の議論の着地点。' },
        ],
    },
};

// ============================================================
// EXPRESSIONS -- SPRING MONTH 1 (WEEKS 1-4)
// ============================================================

export const TOKYO52_EXPRESSIONS: Tokyo52Expression[] = [

    // ════════════════════════════════════════════════════════
    // WEEK 1: 意見を言う (Sharing Opinions)
    // ════════════════════════════════════════════════════════

    {
        weekSlot: 1, japanese: '正直に言うと',
        english: [
            'Honestly...',
            'To be honest with you...',
            'I am going to be straight with you on this one.',
            "OK, honestly? And I mean this -- I think the whole thing is kind of a mess. Like, I have been thinking about it and I just... yeah. It is not great.",
        ],
        context: '日本語の「正直に言うと」は予防線。英語のTo be honestも同じ機能だけどもっと頻繁に使う。英語圏では「正直に言う」と宣言してから意見を言うのが礼儀。日本語では空気で察してほしいけど英語は言わないと存在しない。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '個人的には',
        english: [
            'Personally...',
            'Personally, I think...',
            'Speaking for myself, I would say...',
            "I mean, this is just me, right? But personally I feel like -- and maybe I am wrong here -- but I feel like we are overcomplicating it.",
        ],
        context: '「個人的には」は日本語でもビジネスで多用するけど、英語のpersonallyは「全員の意見を代弁してるわけじゃないよ」の免責符。チームの場で自分の意見を言うとき必須。日本語は主語を省略するから意見の所在が曖昧になりがち。',
        character: 'aya', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '〜だと思う',
        english: [
            'I think...',
            'I feel like...',
            'The way I see it...',
            "I mean, the way I see it -- and honestly this is just based on what I have seen so far -- it seems like the real problem is not the idea itself, it is the timing.",
        ],
        context: '日本語の「〜と思う」は文末に来る。英語のI thinkは文頭。この位置の差がでかい。英語は最初に「これ私の意見だよ」と宣言する。日本語は最後まで聞かないと意見なのか事実なのかわからない。英語の「主張ファースト」に慣れるのが上級者への鍵。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: 'それは違うと思う',
        english: [
            'I disagree.',
            'I do not think so.',
            'I see it differently, actually.',
            "Hmm, I am not so sure about that. Like, I get where you are coming from, but I think the reality is a bit more complicated than that.",
        ],
        context: '日本人が最も苦手な表現。「違うと思う」を英語で言えるかどうかが会話の分岐点。I disagree は直球。I see it differently は角を立てない上級版。日本語では「ちょっと...」で済ませるところを英語は言語化しないと先に進めない。',
        character: 'rina', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '一理ある',
        english: [
            'Good point.',
            'You have got a point there.',
            'That is a valid point, I will give you that.',
            "OK, yeah, no -- that is fair. I mean, I still think my point stands, but you are not wrong about that part. I will give you that.",
        ],
        context: '「一理ある」は最高の日本語。全面賛成でも全面反対でもない。英語のYou have got a point がこの絶妙な距離感に最も近い。I will give you that は「その点は認める」という大人の譲歩。議論で使えたら一気にレベルアップ。',
        character: 'aya', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: 'でもさ',
        english: [
            'But...',
            'But here is the thing...',
            'Sure, but the way I look at it...',
            "Yeah, no, I hear you. But here is the thing though -- and I keep coming back to this -- if we actually look at what happened, it tells a completely different story.",
        ],
        context: '日本語の「でもさ」は反論の合図。英語のBut here is the thing は「でもさ、ポイントはね」。thingを挟むことで反論にクッションを入れる。ネイティブはbutの後にワンクッション入れるのが上手い。直球のbutだけだと攻撃的。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '要するに',
        english: [
            'In short...',
            'Basically...',
            'What it comes down to is...',
            "Look, I think what it really comes down to -- at the end of the day -- is that nobody wants to be the first person to say something. And that is the whole problem right there.",
        ],
        context: '「要するに」は話をまとめたいとき。basicallyは日常的、what it comes down to は議論向き。英語のat the end of the day は「結局のところ」で「要するに」と同じ着地機能。日本語の「要するに」ほど偉そうに聞こえないのが面白い。',
        character: 'aya', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '例えば',
        english: [
            'For example...',
            'Like, say...',
            'Here is a good example of what I mean.',
            "OK so like, here is a perfect example. You know how in meetings everyone just kind of sits there? Nobody says anything until the boss talks first? That. That is exactly what I am talking about.",
        ],
        context: 'for exampleは教科書的。ネイティブは圧倒的にlike, say...を使う。Likeは文頭で使うと「例えば」になる。日本語の「例えば」も同じく文頭に来るからリズムは近い。でもlikeのほうが10倍カジュアル。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '逆に言えば',
        english: [
            'On the other hand...',
            'If you flip it around...',
            'But if you look at it from the other side...',
            "But wait, let me flip that around for a second. Because if you think about it from their side -- and I am not saying they are right -- but from their perspective it actually makes sense.",
        ],
        context: '「逆に言えば」は視点の切り替え。英語はon the other hand が定番だけどflip it around がカジュアルで議論向き。日本語は「逆に」一語で済むけど英語は「ひっくり返して見てみると」と動作を言語化する。発想の見せ方が違う。',
        character: 'rina', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '結論から言うと',
        english: [
            'The bottom line is...',
            'Long story short...',
            'Let me just cut to the chase here.',
            "OK look, I am just going to cut to the chase because we have been going back and forth for twenty minutes and I think the answer is actually pretty simple.",
        ],
        context: '英語圏では「結論から言う」が超歓迎される。cut to the chase はハリウッド映画の用語が元(退屈なシーンをカットして追跡シーンに飛ぶ)。bottom lineは「最終的な結論」。日本語は起承転結だけど英語は結起承。順番が真逆。',
        character: 'aya', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '〜には賛成できない',
        english: [
            'I can not agree with that.',
            'I am not on board with that.',
            'That is one thing I can not really get behind.',
            "I mean, look -- I get the logic, I really do. But I just can not get behind it. It does not sit right with me and I think if we are being honest, nobody is really comfortable with it.",
        ],
        context: '「賛成できない」は日本語では重い表現。英語のI can not get behind it は「それを支持できない」のカジュアル版。get behind = 後ろに立つ = 支持する。not on board も「同じ船に乗れない」の比喩。英語は身体感覚で反対を表す。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: 'それってつまり',
        english: [
            'So you mean...',
            'So what you are saying is...',
            'Wait, let me make sure I understand what you are getting at.',
            "Hold on, hold on. So what you are basically saying -- and correct me if I am wrong -- is that we should just... not do anything? Is that really your take?",
        ],
        context: '相手の発言を確認する技術。英語でso what you are saying is... と言い換えるのは「あなたの意見をちゃんと聞いてるよ」のサイン。日本語の「つまり」は要約だけど英語のこの形は「確認+相手へのリスペクト」。議論の必須スキル。',
        character: 'rina', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '確かにそうだけど',
        english: [
            'That is true, but...',
            'Sure, I get that, but...',
            'Fair enough, but I still think...',
            "Yeah, no, you are absolutely right about that part. I am not arguing that. But I think we are missing the bigger picture here, and that is what worries me.",
        ],
        context: '「確かに〜but」は議論の黄金パターン。認める+反論。英語のfair enough は「言いたいことはわかる」のスマートな認め方。日本語の「確かに」も英語と同じでbutの前のクッション。日英どちらも「一旦認めてからひっくり返す」技術。',
        character: 'aya', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '何が言いたいかって言うと',
        english: [
            'What I mean is...',
            'My point is...',
            'What I am really trying to say is...',
            "OK, let me try this again because I do not think I said it right the first time. What I am really trying to get at is -- it is not about whether the idea is good or bad. It is about timing.",
        ],
        context: '自分の意見がうまく伝わらなかったときの再挑戦。what I am trying to say は「私の言い方が悪かった、もう一回言い直す」の合図。日本語では「つまりね」で再説明に入るけど英語は「さっきの自分を訂正する」ニュアンスが入る。自分の言葉に責任を持つ英語文化。',
        character: 'yuki', category: 'opinion', season: 'spring',
    },
    {
        weekSlot: 1, japanese: '別の見方をすると',
        english: [
            'Another way to look at it...',
            'Looking at it differently...',
            'Here is another angle to consider.',
            "You know what, let me throw out a totally different angle here. Because I think we have all been looking at this from the same direction and maybe that is why we are stuck.",
        ],
        context: '議論で最もインテリに聞こえる切り出し。another angle は「別の角度」。日本語の「別の見方」は控えめだけど英語のlet me throw out は「投げ込む」で積極的。日本語は視点を「変える」、英語は視点を「追加する」。足し算の発想。',
        character: 'rina', category: 'opinion', season: 'spring',
    },

    // ════════════════════════════════════════════════════════
    // WEEK 2: 日本を説明する (Explaining Japan)
    // ════════════════════════════════════════════════════════

    {
        weekSlot: 2, japanese: '日本ではね',
        english: [
            'In Japan...',
            'So in Japan, the thing is...',
            'The way it works in Japan is a little different.',
            "OK so, in Japan -- and this is going to sound weird if you have never been there -- but basically, the way people handle this is completely different from what you are used to.",
        ],
        context: '日本文化を説明する最初の一言。In Japanだけだと教科書的。the way it works in Japan がネイティブ流。「日本のやり方はね」とシステムとして説明するほうが伝わる。いきなり事実を言うより「違うよ」と前置きするほうが相手の準備が整う。',
        character: 'yuki', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '文化的に〜',
        english: [
            'Culturally...',
            'It is kind of a cultural thing.',
            'There is a whole cultural layer to it that is hard to explain.',
            "It is -- honestly it is one of those things where culturally it just runs so deep that even Japanese people can not always explain why they do it. It is just... in the DNA, you know?",
        ],
        context: '「文化的に」と言った瞬間、相手は「簡単に理解できないものが来る」と構える。it is a cultural thing は「文化の話だからロジックじゃ説明できない」という便利な免罪符。日本語で「文化だから」は言い訳っぽいけど英語では正当な説明として通る。',
        character: 'aya', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '直訳すると',
        english: [
            'Literally, it means...',
            'If you translate it directly...',
            'The literal translation is kind of funny actually.',
            "So if you literally translate it -- and this is where it gets interesting -- it basically means something like... well, it sounds ridiculous in English. But in Japanese it makes perfect sense.",
        ],
        context: '日本語特有の表現を説明するときの最強ツール。literal translation = 直訳。「直訳すると面白いんだけど」と前置きすると相手が身を乗り出す。空気を読む = read the air。直訳のおかしさが文化差を一番わかりやすく伝える。',
        character: 'rina', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '〜に相当するものがない',
        english: [
            'There is no equivalent.',
            'There is no real English word for it.',
            'It is one of those things that just does not translate.',
            "This is the thing that drives me crazy, honestly. There is literally no English word that captures what this means. You can get close, but you lose something every time you try to translate it.",
        ],
        context: '「空気」「もったいない」「木漏れ日」。英語に訳せない日本語は意外と多い。no equivalent は「対応するものがない」で文化の壁を端的に表す。does not translate は「翻訳不可能」。これを言えると外国人は逆に興味を持つ。翻訳できないことが価値になる。',
        character: 'yuki', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '一言で説明するのは難しい',
        english: [
            'It is hard to explain.',
            'It is not easy to put into words.',
            'I wish I could explain it in one sentence, but it is way more layered than that.',
            "Honestly, I have been asked this question so many times and I still do not have a clean answer for it. It is one of those things where the more you think about it, the harder it gets to explain.",
        ],
        context: '複雑な概念を説明する前の正直な前置き。It is hard to explain は逃げじゃなくて「これから本気で説明するからちょっと待って」のサイン。layered = 層がある。英語で「複雑」を言うときcomplicatedよりlayeredのほうが知的。',
        character: 'aya', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '歴史的に〜',
        english: [
            'Historically...',
            'If you go back in history...',
            'There is actually a historical reason for that.',
            "So this goes way back, actually. Like, if you trace it back to -- I do not know -- the Edo period or whatever, it started as this completely different thing and then it just kind of evolved into what it is now.",
        ],
        context: '文化を説明するとき「歴史的に」を入れると説得力が3倍になる。英語圏の人は理由を求める。「昔からそうだから」は通じない。historically + 具体的な時代 + 変化の流れ。この三点セットで日本文化の説明が一気にプロレベルになる。',
        character: 'rina', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: 'それは誤解で',
        english: [
            'That is a misconception.',
            'Actually, that is not quite right.',
            'I think there is a bit of a misunderstanding here.',
            "OK so, I hate to be that person, but that is actually not how it works. I know it looks that way from the outside, and honestly I totally get why people think that, but the reality is pretty different.",
        ],
        context: '外国人の日本イメージを訂正するときの表現。That is not quite right はnot rightより200倍柔らかい。quite(まったく)をnotで否定すると「完全には正しくない」=「ちょっと違う」になる。英語の否定は直球より二重否定が丁寧。',
        character: 'yuki', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '実はそうじゃなくて',
        english: [
            'Actually, it is the opposite.',
            'It is actually the other way around.',
            'You would think so, but it is actually kind of the reverse.',
            "See, and this is what gets people every time -- you would assume it works that way because it makes logical sense, right? But in practice it is almost the exact opposite. It is kind of wild.",
        ],
        context: '相手の思い込みをひっくり返す快感フレーズ。the other way around は「逆なんだよ」。日本語の「実は」は控えめだけど英語のactually は「あなたが思ってることの逆」を突きつける。You would think so, but... で期待を裏切るのが英語の面白い説明法。',
        character: 'aya', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '日本語では〜という概念がある',
        english: [
            'In Japanese, we have this concept called...',
            'There is this Japanese word that kind of captures it.',
            'We actually have a specific word for that in Japanese, and it is...',
            "OK so this is going to blow your mind. In Japanese we literally have a single word -- just one word -- that means all of that. And it is a word that every Japanese person knows and uses, like, daily. But there is zero chance of translating it properly.",
        ],
        context: '日本語の固有概念を紹介する最も効果的な方法。we have this concept called... と導入すると外国人は「新しい知識を得られる」と前のめりになる。おもてなし、いただきます、本音と建前。概念ごと輸出するのが最強の文化説明。',
        character: 'rina', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '外国人にはわかりにくいけど',
        english: [
            'It might be hard to understand.',
            'I know it sounds strange from the outside.',
            'This is probably one of those things that does not make sense unless you have lived there.',
            "And I know -- I know this probably sounds completely insane to you. Like, why would anyone do that, right? But once you have actually been in that situation in Japan, it clicks. It just suddenly makes sense.",
        ],
        context: '「外国人には」と言うとき要注意。foreignerは微妙に失礼な場合がある。from the outside, if you are not from Japan のほうが自然。someone who did not grow up here も良い。大事なのは「あなたの理解力の問題じゃなく文化の壁の話」という伝え方。',
        character: 'yuki', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: 'ざっくり言うと',
        english: [
            'Roughly speaking...',
            'To put it simply...',
            'If I had to explain it in the simplest way possible...',
            "OK so, super oversimplified version -- and forgive me because I am going to butcher some of the nuance here -- but basically, think of it as... like a social contract that nobody ever signed but everyone follows.",
        ],
        context: '「ざっくり」は日本語の天才的な言葉。英語にはこの一語に相当する表現がない。roughlyは「大雑把に」、to put it simplyは「簡単に言うと」。でも「ざっくり」の「細かいことは気にしない感じ」は英語で出しにくい。oversimplified version が一番近い。',
        character: 'aya', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '例外もあるけど',
        english: [
            'There are exceptions, though.',
            'Of course, not everyone is like that.',
            'I mean, this is a generalization, but broadly speaking...',
            "And obviously, like, this is not every single Japanese person, right? I am painting with a really broad brush here. There are tons of people who are completely different. But as a general pattern, yeah, this is kind of how it tends to go.",
        ],
        context: '文化の話で「全員がそうじゃないけど」と言えるかどうかが知性の分かれ目。painting with a broad brush = 大雑把に描く。この比喩が使えたら議論力が格上。as a general pattern は「一般的なパターンとしては」で正確さと誠実さを両立する。',
        character: 'rina', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '一般的には',
        english: [
            'Generally...',
            'In general, most people would...',
            'As a rule of thumb, I would say...',
            "I mean, generally speaking -- and again, I am not saying this is everyone -- but if you took a hundred random Japanese people and asked them, I would bet that like eighty or ninety of them would say the same thing.",
        ],
        context: 'generally は「一般的に」だけどas a rule of thumb は「経験則として」。日本語の「一般的には」は逃げの前置きだけど英語ではrule of thumb(親指のルール=昔の計測法)で「だいたいこう」と堂々と言える。経験値ベースの主張は英語で歓迎される。',
        character: 'yuki', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '個人差があるけど',
        english: [
            'It depends on the person.',
            'Everyone is different, but...',
            'Your mileage may vary, of course.',
            "And honestly, this varies a LOT from person to person. Like, my parents are nothing like that. But my grandparents? Totally. So it is kind of a generational thing too, not just cultural.",
        ],
        context: 'your mileage may vary は最高にアメリカンな表現。車の燃費が人によって違うように「結果は人による」。日本語の「個人差がある」は医学的な響きだけど英語はこの車の比喩でカジュアルに言える。略してYMMV、ネットでも超頻出。',
        character: 'aya', category: 'culture', season: 'spring',
    },
    {
        weekSlot: 2, japanese: '変わりつつある',
        english: [
            'It is changing.',
            'Things are starting to change, though.',
            'That is actually shifting quite a bit, especially with younger people.',
            "But you know what, that whole thing is actually changing a LOT. Like, if you had asked me this ten years ago I would have given you a completely different answer. The younger generation is really pushing back on a lot of that stuff.",
        ],
        context: '日本文化の説明の締めに使える最強フレーズ。it is changing だと「変わってる」、it is shifting は「微妙に動いてる」。日本は変わらないと思われがちだけど若い世代の話をするとespecially with younger people で外国人の目が変わる。希望のある終わり方。',
        character: 'rina', category: 'culture', season: 'spring',
    },

    // ════════════════════════════════════════════════════════
    // WEEK 3: 仕事で使う英語 (Professional English)
    // ════════════════════════════════════════════════════════

    {
        weekSlot: 3, japanese: '確認させてください',
        english: [
            'Let me confirm.',
            'Let me double check on that.',
            'I just want to make sure I have got this right.',
            "Before we move on, let me just -- I want to make sure we are on the same page here because the last thing I want is for us to walk away with different understandings of what was agreed.",
        ],
        context: '日本語の「確認させてください」はビジネス最頻出。英語のLet me double check はカジュアル、I want to make sure は丁寧。日本語の確認文化は英語圏でも好印象。ただし確認しすぎると「この人自信ないのかな」と思われる。バランスが命。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: 'スケジュール調整できますか',
        english: [
            'Can we reschedule?',
            'Would it be possible to move the meeting?',
            'I was wondering if we could find another time that works for both of us.',
            "Hey, so I know this is last minute and I am really sorry about this, but something just came up on my end. Would there be any way we could push our meeting to later this week? I am totally flexible on timing.",
        ],
        context: 'Can we rescheduleは直球。Would it be possible は丁寧の定番形。I was wondering if は最も柔らかい。日本語の「調整」は英語に直訳できない。scheduleを動かす=reschedule、find another time。日本語は「調整」で曖昧にするけど英語は「いつに変える？」を具体的に言う。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '検討します',
        english: [
            'I will think about it.',
            'Let me look into that.',
            'I will take that into consideration and get back to you.',
            "That is a really good point, actually. Let me take some time to think it through properly -- I do not want to give you a half-baked answer right now. Can I circle back to you on this by end of day tomorrow?",
        ],
        context: '日本語の「検討します」は90%の確率で「やりません」の意味。英語でI will think about it と言うと本当に考えてもらえると期待される。文化の罠。英語で断りたいならI appreciate the idea, but I do not think it is the right fit と正直に言うほうが信頼される。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '前向きに考えます',
        english: [
            'I am open to it.',
            'That sounds promising.',
            'I am definitely leaning towards yes on this one.',
            "You know what, I like where this is going. I can not commit to anything right now because I need to run it by my team first, but between you and me, I think there is a really good chance we can make this work.",
        ],
        context: '「前向きに考えます」は日本語ビジネスの最も危険な表現。ポジティブに聞こえるけど確約ではない。英語でI am leaning towards yesと言ったら本当にYES寄り。英語圏では「前向き」の温度が日本語より高い。maybeのつもりでpositive signalを出すと期待値がズレる。',
        character: 'aya', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '担当者に確認します',
        english: [
            'Let me check with the team.',
            'I will need to loop in the right person.',
            'I will check with our point person on that and circle back.',
            "That is a great question. I am not the best person to answer that one, honestly, so let me loop in our project lead -- she will have the most up-to-date info. I will have her reach out to you directly if that is OK.",
        ],
        context: 'loop in = 巻き込む、知らせる。circle back = 後で戻ってくる。日本語の「担当者」に相当する英語がない。the right person, our point person, the lead と状況で変わる。「担当者に聞きます」と言うとき英語では誰に聞くか具体的に言うほうが信頼される。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: 'お時間いただけますか',
        english: [
            'Do you have a moment?',
            'Could I steal a few minutes of your time?',
            'Would you have some time to go over a few things?',
            "Hey, I know you are super busy and I promise this will be quick, but would you have like ten or fifteen minutes sometime today? There are a couple things I want to run by you before the client meeting.",
        ],
        context: '「お時間いただけますか」は日本語の丁寧表現。英語のCould I steal a minute は「あなたの時間を盗んでいい？」で面白い比喩。do you have a moment はニュートラル。Would you have time は最も丁寧。英語は「あなたの時間=あなたの財産」という価値観。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '資料をお送りします',
        english: [
            'I will send you the documents.',
            'I will get those materials over to you.',
            'I will shoot those over to you by end of day.',
            "I will put everything together and shoot it over to you -- probably by end of day, maybe tomorrow morning at the latest. If there is anything specific you want me to include, just let me know and I will make sure it is in there.",
        ],
        context: 'shoot over は「ぱっと送る」のカジュアルビジネス表現。日本語の「お送りします」は丁寧一択だけど英語はI will send(標準)、I will get those over to you(親しい)、I will shoot those over(カジュアル)と距離感で変わる。上司にshoot overは使わない。',
        character: 'aya', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: 'ご質問ありますか',
        english: [
            'Any questions?',
            'Does anyone have any questions?',
            'Before we wrap up, I want to make sure everyone is clear on everything.',
            "OK so, before we move on -- and please, do not be shy about this -- does anyone have any questions? Anything at all? Because I would rather address things now than have confusion later.",
        ],
        context: 'Any questions? は会議の定番。でもこれだけだと「質問ないよね？」の圧になる。I want to make sure everyone is clear で「わからないところがあったら言って」の空気を作れる。日本語の「ご質問ありますか」は形式的だけど英語では本当に質問を待ってる。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '次のステップは',
        english: [
            'Next steps.',
            'So what are the next steps here?',
            'Let me walk you through the next steps from our end.',
            "OK great. So here is what I am thinking in terms of next steps -- and jump in if any of this does not sound right -- but I think what makes sense is we finalize the proposal this week, send it out Monday, and then regroup mid-week to see where we are.",
        ],
        context: 'next stepsは英語ビジネスで最も重要な概念の一つ。会議の最後に必ずnext stepsを確認する。日本語では「次は〜」で曖昧に終わることが多いけど英語は誰が何をいつまでにやるかを明確にしないと意味がない。actionable next steps = 具体的な次のアクション。',
        character: 'client', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '期限はいつですか',
        english: [
            'When is the deadline?',
            'What is the timeline on this?',
            'When do you need this by? I want to make sure I plan accordingly.',
            "So just so I can manage expectations on my end -- when are we looking at for the final deadline? Because I want to build in some buffer time so we are not scrambling at the last minute.",
        ],
        context: 'deadlineは「死の線」で英語圏では絶対に守るもの。timeline は全体のスケジュール感。日本語の「いつまでですか」より英語のdeadlineは重い。build in buffer time = 余裕を持たせる。英語ビジネスでは締め切りの前にバッファを組み込むのが常識。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '予算内で',
        english: [
            'Within budget.',
            'We need to keep it within budget.',
            'I want to make sure we stay on budget with this.',
            "Look, I am all for making this as polished as possible, but we really need to stay within budget on this one. So let us figure out where we can be creative without going overboard.",
        ],
        context: '英語のwithin budget は「予算の範囲内」。stay on budget = 予算を守る。日本語の「予算内で」は数字の話だけど英語ではstay on budget が「プロとしての責任」のニュアンスを含む。going overboard = やりすぎる。予算と品質のバランスを語るときの必須表現。',
        character: 'client', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '優先順位をつけると',
        english: [
            'In order of priority...',
            'If we prioritize...',
            'Let me rank these in terms of what needs to happen first.',
            "OK, so if I am being real about what actually needs to happen versus what would be nice to have -- the top priority, hands down, is getting the client presentation done. Everything else can wait.",
        ],
        context: 'prioritize は動詞で「優先順位をつける」。hands down = 圧倒的に。nice to have vs need to have は英語ビジネスの超重要な区別。日本語では「優先順位」と言うけど英語ではmust-have(必須)とnice-to-have(あったらいいな)を明確に分ける文化。',
        character: 'aya', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: 'フィードバックお願いします',
        english: [
            'I would love your feedback.',
            'Any feedback would be great.',
            'I would really appreciate your thoughts on this when you get a chance.',
            "Hey, so I just wrapped up the first draft and I would love to get your eyes on it before I send it out. No rush at all -- whenever you have a minute. But honestly, the more honest the feedback the better. Do not hold back.",
        ],
        context: 'get your eyes on it = 見てもらう。do not hold back = 遠慮なく。日本語の「フィードバックお願いします」は受動的だけど英語ではI would love your feedback と積極的に求める。英語圏では「フィードバックを求める人」が高く評価される。求めない人は「成長意欲がない」と見られる。',
        character: 'yuki', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '改善の余地がある',
        english: [
            'There is room for improvement.',
            'We can definitely do better here.',
            'I think this is a solid start, but there is room to tighten things up.',
            "It is a good foundation, do not get me wrong. But if I am being honest, I think we left some meat on the bone here. There are a few areas where we can really level it up before the final version.",
        ],
        context: 'room for improvement は定番だけどleft some meat on the bone は上級表現。「骨に肉が残ってる」=まだ引き出せるものがある。level it up = レベルを上げる。日本語の「改善の余地」は控えめだけど英語ではwe can do betterと「もっとよくできる」ポジティブに言う。',
        character: 'client', category: 'work', season: 'spring',
    },
    {
        weekSlot: 3, japanese: '結果を共有します',
        english: [
            'I will share the results.',
            'I will keep you posted.',
            'I will loop everyone in once we have the final numbers.',
            "As soon as we have the results -- and I am hoping that will be by Thursday -- I will put together a quick summary and send it out to the whole team. If anything major comes up before that, I will flag it right away.",
        ],
        context: 'keep you posted = 随時報告する。loop everyone in = 全員に共有する。flag it = 注意喚起する。日本語の「共有します」は報告の意味だけど英語のloop in, keep posted, flag はそれぞれ微妙に違う。loop in=巻き込む、posted=更新し続ける、flag=問題を指摘する。場面で使い分け。',
        character: 'yuki', category: 'work', season: 'spring',
    },

    // ════════════════════════════════════════════════════════
    // WEEK 4: 賛成と反対 (Agreeing and Disagreeing)
    // ════════════════════════════════════════════════════════

    {
        weekSlot: 4, japanese: 'その通り',
        english: [
            'Exactly.',
            'That is exactly it.',
            'You just nailed it. That is exactly what I have been trying to say.',
            "YES. Thank you. That is EXACTLY what I have been trying to say for the last twenty minutes and somehow you just said it in one sentence. I need to learn how to do that.",
        ],
        context: '「その通り」の英語版はExactly。でもそれだけだと薄い。You nailed it は「まさにその通り」の最強版。nail = 釘を打つ = 的を射る。日本語の「その通り」は冷静だけど英語のYou nailed it は「よくぞ言ってくれた！」の熱量がある。同意にも温度差がある。',
        character: 'yuki', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: 'それはちょっと違う',
        english: [
            'Not quite.',
            'I do not think that is quite right.',
            'Hmm, I see what you mean, but I think it is a little more complicated than that.',
            "I mean -- OK, I see where you are going with this, and you are not completely off, but I think you are oversimplifying something that is actually way more nuanced. Can I push back on that a little?",
        ],
        context: 'not quite は英語の最もエレガントな反論。「ちょっと違う」を2語で完璧に表す。Can I push back? は「反論していい？」の許可申請で超大人。oversimplifying = 単純化しすぎ。日本語の「ちょっと違う」は曖昧だけど英語のnot quite は「惜しいけどズレてる」の精密さがある。',
        character: 'aya', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '一部は賛成、でも〜は違う',
        english: [
            'I partly agree.',
            'I agree with the first part, but...',
            'You are right about one thing, but I think you are off on the rest.',
            "OK so, let me break this down. The part about AI changing the job market? Yeah, one hundred percent. No argument there. But the part where you said it is going to replace everyone? That is where you lose me. That is a completely different claim.",
        ],
        context: '部分的賛成は議論の最重要スキル。0か100かではなく「ここは賛成、ここは反対」と分解できるかどうか。that is where you lose me = 「そこで話についていけなくなる」。日本語にはこの「ここまではOK、ここからNG」をスパッと分ける表現が少ない。英語のほうが精密。',
        character: 'rina', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '根拠は？',
        english: [
            'Based on what?',
            'What makes you say that?',
            'Do you have anything to back that up?',
            "I mean, that is a bold claim. And I am not saying you are wrong -- maybe you are totally right. But I need more than just a gut feeling here. Like, what data are we looking at? What evidence supports that?",
        ],
        context: '「根拠は？」と聞くのは日本語では攻撃的。英語ではWhat makes you say that? で自然に根拠を求められる。back that up = 裏付ける。gut feeling = 直感。英語の議論では根拠を求めるのが礼儀。根拠なしの主張は発言権を失う。日本語の「なんとなく」は英語の議論では通用しない。',
        character: 'master', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: 'データを見ると',
        english: [
            'The data shows...',
            'If you look at the numbers...',
            'According to what I have seen, the numbers actually tell a different story.',
            "OK but let us actually look at the data for a second, because I feel like we are all just throwing opinions around. If you look at the actual numbers -- and I pulled this up earlier -- it is not even close to what people think.",
        ],
        context: '英語の議論で最強の武器はdata。「データによると」と言った瞬間に発言の信頼度が跳ね上がる。the numbers tell a different story = 数字は違うことを語っている。日本語は「感覚的に」で通ることが多いけど英語はデータで語るほうが圧倒的に強い。',
        character: 'aya', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '感情論じゃなくて',
        english: [
            'Let us keep this logical.',
            'I think we need to separate feelings from facts here.',
            'I get that it feels that way, but emotions aside, what do the facts say?',
            "Look, I totally get it. It is a scary topic and it is natural to have a strong reaction. But if we are going to have a real conversation about this, we need to separate how we feel from what we know. Those are two very different things.",
        ],
        context: '英語では感情と論理を分けるのが議論のルール。separate feelings from facts は大人の議論の基本。emotions aside = 感情はさておき。日本語の議論は感情が乗りやすいけど英語はfacts(事実)とfeelings(感情)を明確に区別する。この区別ができると英語での議論力が一段上がる。',
        character: 'master', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '仮に〜だとしたら',
        english: [
            'What if...',
            'Let us say, hypothetically...',
            'OK, just for the sake of argument, let us assume that is true.',
            "All right, humor me for a second. Let us say -- purely hypothetically -- that you are right and AI does replace like fifty percent of jobs in the next ten years. What then? What is the plan? Because that is where the conversation actually needs to go.",
        ],
        context: 'for the sake of argument = 議論のために。humor me = 付き合って。hypothetically は仮定の話を始める合図。日本語の「仮に」は短いけど英語はlet us say, hypothetically, for the sake of argument と前置きが長い。この前置きの長さが英語の議論の「礼儀」。いきなり仮定を突きつけない。',
        character: 'rina', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '極端な話',
        english: [
            'In the extreme case...',
            'To take it to the extreme...',
            'If you take that logic to its extreme...',
            "OK but wait, if we follow that logic all the way to its extreme conclusion -- and I know this sounds crazy -- but you are basically saying that nobody should ever learn anything new because a machine will eventually do it better. Does that really make sense?",
        ],
        context: '議論で相手のロジックを極端に押し広げる技術。take it to the extreme は「その論理を極端まで持っていくと」。reductio ad absurdum(帰謬法)の日常版。日本語の「極端な話」はカジュアルだけど英語で同じことをすると論理的に聞こえる。相手の矛盾を浮き彫りにする上級テクニック。',
        character: 'aya', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '現実問題として',
        english: [
            'Realistically...',
            'In practice, though...',
            'That sounds great in theory, but in reality...',
            "I love the optimism, I really do. But can we be real for a second? In practice -- like, in the actual real world where things are messy and complicated -- it does not work that way. I wish it did, but it does not.",
        ],
        context: '理想と現実のギャップを指摘する表現。in theory vs in practice は議論の最重要対比。sounds great in theory は「理論的にはいいけど」の皮肉入り。日本語の「現実問題として」は堅いけど英語のcan we be real は「現実見ようよ」のカジュアルな切り込み。',
        character: 'master', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '理想はそうだけど',
        english: [
            'Ideally, yes.',
            'In a perfect world, sure.',
            'I mean, in an ideal world that would be amazing, but...',
            "In a perfect world? Absolutely. Sign me up. But we do not live in a perfect world, do we? We live in a world where things are complicated and messy and nothing ever goes according to plan. So we have to deal with what is actually in front of us.",
        ],
        context: 'in a perfect world は英語の最もエレガントな「理想と現実は違う」の言い方。sign me up = 参加したい(理想の世界なら)。日本語の「理想はそうだけど」と同じ構造で「肯定→but→現実」のパターン。この型を覚えると議論で一生使える。',
        character: 'yuki', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: 'そもそも',
        english: [
            'First of all...',
            'But the real question is...',
            'I think we are asking the wrong question. The real issue is...',
            "OK, can I just -- can we take a step back for a second? Because I think we are so deep in the weeds right now that we have lost sight of the actual question. The real question is not whether AI will take our jobs. The real question is what are we going to do about it.",
        ],
        context: '「そもそも」は議論をリセットする日本語の最強ワード。英語でこれに相当するのがtake a step back(一歩引く)。we are in the weeds = 細部にはまり込んでる。lost sight of = 見失った。「そもそもの問題」に立ち戻る力は日英どちらの議論でも最重要スキル。',
        character: 'rina', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '話をすり替えないで',
        english: [
            'That is not what we are talking about.',
            'Let us not change the subject.',
            'Hold on, that is a completely different issue. Let us stay on topic.',
            "Whoa whoa whoa. No. You are moving the goalposts. We were talking about whether AI replaces jobs, and now suddenly you are talking about the education system? Those are two completely separate conversations. Let us finish this one first.",
        ],
        context: 'moving the goalposts = ゴールポストを動かす = 議論のすり替え。英語にはこの行為を一語で表す素晴らしい比喩がある。日本語の「すり替え」は文字通りだけど英語はサッカーのゴールを動かすイメージ。stay on topic = 話題にとどまる。議論の脱線を防ぐ必須フレーズ。',
        character: 'master', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '結局のところ',
        english: [
            'At the end of the day...',
            'When it is all said and done...',
            'When you strip everything else away, it really comes down to...',
            "Look, we can go back and forth on this all night -- and honestly I think we probably will -- but at the end of the day, I think what it really comes down to is that nobody actually knows. And maybe being OK with not knowing is the most honest position to take.",
        ],
        context: 'at the end of the day は英語で最も使われる「結論」の合図。when it is all said and done は「すべてが終わったとき」でより哲学的。strip everything away = 全部剥ぎ取ると。日本語の「結局」は軽いけど英語の at the end of the day は「本当の結論は」の重みがある。',
        character: 'yuki', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '両方正しいかも',
        english: [
            'Maybe you are both right.',
            'I think there is truth on both sides.',
            'What if this is not an either-or situation?',
            "You know what I think? I think you are both right and you are both wrong, and I am not being a fence-sitter when I say that. I genuinely think the truth is somewhere in the middle and neither of you wants to admit it.",
        ],
        context: 'fence-sitter = 日和見主義者。「両方正しい」は日本語では丸く収めてるように聞こえるけど英語のthere is truth on both sides は議論の着地として尊重される。either-or = 二択。英語の議論は二項対立で白黒つけがちだから「その二択自体が間違い」と言えると上級者。',
        character: 'rina', category: 'debate', season: 'spring',
    },
    {
        weekSlot: 4, japanese: '答えは出ないかもしれないけど',
        english: [
            'We might not find an answer.',
            'Maybe there is no clear answer to this.',
            'I do not think we are going to solve this tonight, and honestly that is OK.',
            "Listen, we have been at this for two hours and four beers and I do not think we are any closer to an answer. But you know what? That is actually kind of the point. The conversation itself matters more than the conclusion. At least that is what I am telling myself.",
        ],
        context: '議論の最も大人な締め方。日本語で「答えは出ない」は敗北感があるけど英語のthe conversation itself matters は「議論すること自体に価値がある」。これは英語圏の議論文化の核心。結論に辿り着くことよりもプロセスを楽しむ。居酒屋議論の最高の締めくくり。',
        character: 'master', category: 'debate', season: 'spring',
    },
];
