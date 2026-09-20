// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-core5.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE CORE 5 -- 「理由の指10本 + 模範解答5本」。丸暗記のための在庫。
 *
 * 【考え方】
 * どんなお題でも、人が何かに賛成・反対する理由は「何が増えて何が減るか」に落ちる。
 * その「何」は閉じていて、ちょうど10本ある。だから左右の指に1本ずつ載せる。
 * 指は常に持ち歩けて、試験中に机の下で数えられる。それが10という数の理由。
 *
 *   左手 MY SIDE     MONEY / TIME / BODY / WAY / CHOICE
 *   右手 BETWEEN US  FAIRNESS / FREEDOM / TRUST / HEART / ROOTS
 *
 * 【指に載せるのは英語】
 * 本番で使うのは英語なので、指に載せるのも、お題に当てる問いも英語で持つ。
 * 日本語を先に置くと本番で「日本語で考える → 訳す」が挟まって間に合わない。
 * 日本語は意味を確かめるための添え物として ja / coreJa / questionJa に置く。
 *
 * 【引き方は「両手をまたぐ」】
 * 3本引くとき、片手だけで3本引かない。左だけ = 損得の話だけで薄い。
 * 右だけ = 抽象論だけで証拠が出せない。2+1 か 1+2 にすると、モノの証拠と人の意味が
 * 両方入って内容の観点が埋まる。handSplit() と verify がこれを機械検査する。
 *
 * 10本から3本ずつ引いて組んだ模範解答が、この5本。5本を丸暗記すると
 * 10本全部が口に入り、初見のお題でも「形を決める → 3本引く → 名詞を差し替える」で全文が立つ。
 *
 * 【用途は英検の1次ライティングと2次スピーチ】
 * 5本はすべて 200-240語・序論→本論3→結論 の意見論述の形。
 * 各指の eiken 欄に「英検でこの指が主役になるお題の型」を書いてある。
 * 指の question は2次の質疑にもそのまま使える(その場で1本立てて答える)。
 *
 * 【なぜ10で足りると言えるのか】
 * TOPIC_TESTS で検証する。主役は試験のお題16件。そのうえで、ニュース・噂話・
 * 日常の愚痴まで同じ10本で引けることも確かめてある(試験の外でも落ちない = 本当に閉じている)。
 * 落ちる話題が見つかったら、そのときだけ11本目を足す。それまでは10本が全部。
 *
 * 【なぜ5本か -- テーマではなく「お題の形」で分ける】
 * お題はテーマ(国際/社会/科技…)で無限に散るが、訊き方は5つしかない。
 *   DO IT(導入すべきか) / STOP IT(廃止すべきか) / WORTH IT(割に合うか) /
 *   HOW FAR(どこまで許すか) / WILL IT(そうなるか・続くか)
 * 骨(open/stance/close)は形ごとに固定で、名詞だけ差し替えれば別のお題になる。
 * 試験のお題16件が5つの形のどれかに必ず落ちることを、各解答の fits と verify で保証する。
 *
 * 【文は必ず 型 + 穴 で持つ】
 * frame の X/Y/Z/W に slots を代入すると en に完全一致する。
 * scripts/verify-write-core5.cjs が機械検査する。一致しない分解 = 型の捏造 = 禁止。
 * 丸暗記するのは frame のほう。en は「その穴に今日の名詞を入れた見本」でしかない。
 *
 * 【本番で作り直すのは example の1文だけ】
 * 骨(open/stance/reason/why/close)と理由の仕組み(why)は誰が書いても似るのでバレない。
 * バレるのは実例がお題と噛み合っていないとき。だから example だけは毎回その場で入れ替える前提。
 *
 * 【著作権】お題・英文はすべてオリジナル。実際の検定試験の問題は転載していない。
 */

// ============================================================
// 理由エンジン -- 10本の指 × 5つの枝 = 50ブロック
//
//   左手 MINE        私を構成するもの   MONEY / TIME / BODY / HAPPINESS / EDUCATION
//   右手 OUTSIDE ME  私を取り巻くもの   FAIRNESS / FREEDOM / TRUST / ROOTS / NATURE
//
// 【なぜ枝を挟むのか】
// 指の名詞だけを使うと、汎用にすれば薄くなり、具体にすれば別のお題で使えなくなる。
// 指と語のあいだに枝(Income / Cost / Debt ...)を1段入れると、具体を枝が引き受けるので
// 指は普遍のまま保てる。お題 -> 指を立てる -> 枝を選ぶ -> その枝の名詞と動詞を引く。
//
// 【枝は3本。親指・人差し指・中指に載る】
// 枝は1指に3本ちょうど。10本の指すべてで3つの意味は同じなので、指を数え直すだけで枝も出る。
//   親指=土台(その指の一番素直な形) / 人差し指=いま迫るもの / 中指=後に残るもの
// **5本ではなく3本にしたのは、答案の1段落が3文しか入らないためである。**
// 240語のうち本論は1段落50語前後で、5文は物理的に入らない。3本なら
// 主張 -> 譲歩 -> 締め がそのまま1段落になり、削る判断が本番で発生しない。
//
// 【1ブロックの中身】
//   noun  手に取れるモノか実在する立場の人。5語以内。抽象語と中身の無い言い回しは禁止
//   verb  熟語。壊す/守る/仕組み/悪化/裁く のどれかの働きをする
//   line  枝の単語(en)と noun と verb を全部含む例文。枝の単語が入っていない例文は枝の暗記にならない
//         動詞は take its toll on / adds up / runs out 程度の実用コロケーション。場面に縛られた凝った熟語は使わない
// 50ブロックすべてで noun と verb は重複しない。同じ語が2か所にあると、どちらを引くか迷う。
//
// 【英語が本体】
// 日本語は ja / coreJa / questionJa と枝の訳だけ。本番の思考には入れない。
// ============================================================

export type Hand = 'left' | 'right';
export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'little';

export const HANDS: { id: Hand; en: string; sub: string; ja: string; note: string }[] = [
    {
        id: 'left', en: 'LEFT HAND', sub: 'MINE', ja: '私を構成するもの',
        note: 'Money, time, body, happiness, education. Every one of them can be lost with nobody else in the room. Countable, and you can produce evidence. Three of these alone and the essay reads as pure self-interest.',
    },
    {
        id: 'right', en: 'RIGHT HAND', sub: 'OUTSIDE ME', ja: '私を取り巻くもの',
        note: 'Fairness, freedom, trust, roots, nature. None of them exists in a world with only you in it. Not countable. Three of these alone and you have abstraction with no evidence.',
    },
];

export const FINGERS: { id: Finger; en: string; short: string; ja: string }[] = [
    { id: 'thumb', en: 'thumb', short: 'TH', ja: '親指' },
    { id: 'index', en: 'index', short: 'IN', ja: '人差し指' },
    { id: 'middle', en: 'middle', short: 'MI', ja: '中指' },
    { id: 'ring', en: 'ring', short: 'RI', ja: '薬指' },
    { id: 'little', en: 'little', short: 'LI', ja: '小指' },
];

/** 枝が載る5本の指。10本の指すべてで、この5つの意味は同じ */
export const BRANCH_SLOTS: { finger: Finger; en: string; ja: string; rule: string; ruleJa: string }[] = [
    {
        finger: 'thumb', en: 'THE BASE', ja: '土台',
        rule: 'The thickest finger takes the plainest form of the reason. Money becomes income, nature becomes resources. When the prompt gives you nothing, this branch still works. In a paragraph this is the first sentence, and the noun from the prompt goes in it.',
        ruleJa: '一番太い指には、その指の一番素直な形が載る。金なら収入、自然なら資源。お題が何も寄こさない時でもこれは立つ。段落の中では1文目になり、お題の名詞はここに入る。',
    },
    {
        finger: 'index', en: 'WHAT PRESSES', ja: 'いま迫るもの',
        rule: 'The finger you point with takes whatever is being pushed at somebody right now: the bill, the deadline, the flood. In a paragraph this is the second sentence: short, starting with the same subject, and standing on its own.',
        ruleJa: '指さす指には、いま誰かに突きつけられているものが載る。請求、締切、洪水。段落の中では2文目になる。短く、主語は同じ(本番では It)、前の文につなげない。',
    },
    {
        finger: 'middle', en: 'WHAT LASTS', ja: '後に残るもの',
        rule: 'The longest finger reaches furthest, so it takes what outlasts the argument: the asset, the lifespan, the next generation, the line that must not be crossed. In a paragraph this is the third sentence, again short and independent, and it is where the argument stops being about today.',
        ruleJa: '一番長い指は一番先まで届くので、議論が終わったあとに残るものが載る。資産、寿命、次の世代、割ってはいけない線。段落の中では3文目になる。やはり短く独立していて、ここで話が「今日の話」から先へ出る。',
    },
];

export const SLOT_BY_FINGER: Record<Finger, (typeof BRANCH_SLOTS)[number]> =
    Object.fromEntries(BRANCH_SLOTS.map((s) => [s.finger, s])) as Record<Finger, (typeof BRANCH_SLOTS)[number]>;

export type EngineId =
    // LEFT HAND -- MINE
    | 'money' | 'time' | 'body' | 'happiness' | 'education'
    // RIGHT HAND -- OUTSIDE ME
    | 'fairness' | 'freedom' | 'trust' | 'roots' | 'nature';

/** 指の下にぶら下がる枝。1指5本、全部で50本 */
export interface Branch {
    /** この枝が載る指。1指の5本が親指->小指をちょうど1周する */
    finger: Finger;
    /** 蝶番に刺すとき the が要る枝(the wealth gap)。要らない枝には付けない */
    the?: boolean;
    en: string;    // 枝の名前。Wealth gap / Financial stability / Funding ...
    ja: string;    // 枝の訳
    noun: string;  // その枝で引く名詞。手に取れるモノ、5語以内
    verb: string;  // その枝で引く動詞。熟語
    line: string;  // noun と verb を両方含む例文
    lineJa: string;
}

export interface ReasonEngine {
    id: EngineId;
    hand: Hand;
    finger: Finger;
    en: string;         // 指に載せる英単語。唱えるのはこれ
    /**
     * 本論の頭の3つの枠(BODY_OPENERS)に、そのまま落とす形。
     * **9本は裸の名詞で刺さる。the environment だけ the が付くが、これは固定なので判定は起きない。**
     * BODY は body ではなく health(裸で置けて、答案で使う語もこちら)。
     * NATURE は nature ではなく the environment(本人の指定。試験で出るのはこちらの語)。
     */
    slotNoun: string;
    ja: string;
    core: string;       // この指の主張
    coreJa: string;
    question: string;   // お題に当てる問い。本番はこれを頭の中で撃つ
    questionJa: string;
    mnemonic: string;   // なぜこの指なのか
    branches: Branch[]; // 5本ちょうど
    eiken: string;
    color: string;
}

export const REASON_ENGINES: ReasonEngine[] = [
    // ---------------- LEFT HAND -- MINE ----------------
    {
        id: 'money', hand: 'left', finger: 'thumb', en: 'MONEY', ja: '金', color: '#D4AF37',
        slotNoun: "money",
        core: "It costs money, or it saves money. Pay now, or pay far more later.",
        coreJa: '金が要る / 金が浮く / いま払わないと後でもっと払う',
        question: "Who pays for this, and what does waiting cost?",
        questionJa: 'これは誰の財布から出るのか。払わずに待った場合の値段は。',
        mnemonic: "Rub your thumb and finger together and you get the sign for money. The thickest finger, the strongest reason. When in doubt, start here.",
        branches: [
            { finger: 'thumb', the: true, en: 'Wealth gap', ja: '格差・貧富の差', noun: "two streets in one city", verb: "tells you everything", line: "The wealth gap is two streets in one city, and the distance between them tells you everything.", lineJa: "格差とは同じ街の二つの通りのことで、その隔たりがすべてを語る。" },
            { finger: 'index', en: 'Financial stability', ja: '家計の安定', noun: "three months of rent saved", verb: "changes how people decide", line: "Financial stability is three months of rent saved, and it changes how people decide everything else.", lineJa: "家計の安定とは三ヶ月分の家賃が貯まっていることで、それが他のすべての判断を変える。" },
            { finger: 'middle', en: 'Funding', ja: '財源・予算', noun: "the line in the budget", verb: "runs out in March", line: "Funding is the line in the budget that runs out in March, whatever the plan said.", lineJa: "財源とは予算書の一行のことで、計画に何と書いてあろうと三月に尽きる。" },
        ],
        eiken: "Cost-benefit prompts: space programs, free tuition, large public projects. One of the few fingers that lets you use numbers, so put it in almost every essay.",
    },
    {
        id: 'time', hand: 'left', finger: 'index', en: 'TIME', ja: '時間', color: '#9A7B16',
        slotNoun: "time",
        core: "It eats time and effort, or it frees them up. And the yardstick itself may be wrong.",
        coreJa: '時間と手間を食うか、浮かせるか。そもそも測る物差しが合っているか',
        question: "What does this waste, and are we measuring the right thing?",
        questionJa: 'これは何を無駄にしているか。成果の測り方は正しいか。',
        mnemonic: "The finger you raise to say 'hold on'. A clock hand is a single line too.",
        branches: [
            { finger: 'thumb', en: 'Productivity', ja: '生産性・効率', noun: "one hour of real work", verb: "gets more done", line: "Productivity is one hour of real work, and it gets more done than a day of meetings.", lineJa: "生産性とは実質一時間の仕事のことで、会議だけの一日よりも多くを片づける。" },
            { finger: 'index', en: 'Convenience', ja: '手間の少なさ', noun: "the app on the phone", verb: "saves the trip", line: "Convenience is the app on the phone that saves the trip nobody wanted to make anyway.", lineJa: "手間の少なさとは、もともと誰も行きたくなかった一往復を省いてくれる携帯のアプリのことだ。" },
            { finger: 'middle', the: true, en: 'Opportunity cost', ja: '機会費用・捨てた選択', noun: "the other job you refused", verb: "is still out there", line: "Opportunity cost is the other job you refused, and it is still out there being somebody's life.", lineJa: "機会費用とは断ったもう一つの仕事のことで、それは今も誰かの人生としてそこにある。" },
        ],
        eiken: "Prompts about systems and how people work: remote work, digital government. Push past 'it is faster' into 'we are measuring the wrong thing' and it becomes a Grade 1 argument.",
    },
    {
        id: 'body', hand: 'left', finger: 'middle', en: 'BODY', ja: '体', color: '#DC2626',
        slotNoun: "health",
        core: "People get hurt. People get sick. People die.",
        coreJa: '体が壊れる。病気になる。死ぬ',
        question: "Who gets sick or injured because of this?",
        questionJa: 'これで誰が病気になり、誰が怪我をするか。',
        mnemonic: "The longest finger, so it stands for how long you live. It is also the one you hurt most often.",
        branches: [
            { finger: 'thumb', en: 'Health', ja: '健康・医療・こころ', noun: "the hospital bed", verb: "takes its toll on", line: "Poor health takes its toll on people long before anyone needs the hospital bed.", lineJa: "悪い健康状態は、病床が必要になるずっと前から人の体に響く。" },
            { finger: 'index', en: 'Disease prevention', ja: '予防・未然に防ぐ', noun: "the yearly check-up", verb: "catches it early", line: "Disease prevention is the yearly check-up that catches it early, which no treatment can do later.", lineJa: "予防とは早いうちに見つける毎年の検診のことで、あとからの治療ではそれができない。" },
            { finger: 'middle', en: 'Longevity', ja: '長寿・寿命', noun: "the ninety-year-old next door", verb: "outlives the plan", line: "Longevity is the ninety-year-old next door, and it outlives the plan every pension was built on.", lineJa: "長寿とは隣の九十歳のことで、年金の前提にした計画より長く生きる。" },
        ],
        eiken: "Prompts about regulation, medicine and technology: capital punishment, animal testing, self-driving cars, children and phones. Hard to argue against, so it works as your first body paragraph.",
    },
    {
        id: 'happiness', hand: 'left', finger: 'ring', en: 'HAPPINESS', ja: '幸せ', color: '#BE185D',
        slotNoun: "happiness",
        core: "The day is worth having, or it is not. Everything can look like progress while life gets worse.",
        coreJa: '一日が生きるに値するかどうか。すべてが進歩に見えても暮らしは悪くなりうる',
        question: "Is anyone's day actually better, or does it only look like progress?",
        questionJa: '誰かの一日が本当に良くなるのか。それとも進歩に見えるだけか。',
        mnemonic: "The ring finger. A ring goes on it on the best day of your life. Your left ring is your own happiness; your right ring is the people you share it with.",
        branches: [
            { finger: 'thumb', en: 'Fulfillment', ja: '達成感・満たされること', noun: "the thing you finished", verb: "makes up for", line: "Fulfillment is the thing you finished, and it makes up for the years it took.", lineJa: "達成感とはやり遂げたもののことで、それがかかった年月の埋め合わせになる。" },
            { finger: 'index', en: 'Purpose', ja: '目的・生きる張り', noun: "a reason to get up", verb: "beats any holiday", line: "Purpose is a reason to get up, and it beats any holiday for keeping a person going.", lineJa: "目的とは朝起きる理由のことで、人を持たせる力ではどんな休暇より強い。" },
            { finger: 'middle', the: true, en: 'Quality of life', ja: '暮らしの質', noun: "the walk home at six", verb: "decides how a day ends", line: "Quality of life is the walk home at six, which decides how a day ends more than the salary does.", lineJa: "暮らしの質とは六時の帰り道のことで、給料よりもその一日の終わり方を決めている。" },
        ],
        eiken: "Prompts about work, growth, technology and quality of life. The finger that closes a topic you cannot beat with numbers. It earns its place in the conclusion.",
    },
    {
        id: 'education', hand: 'left', finger: 'little', en: 'EDUCATION', ja: '教育・学び', color: '#2563EB',
        slotNoun: "education",
        core: "You get better at something, or the door to getting better is closed.",
        coreJa: '伸びるか、伸びる入口が閉じるか',
        question: "Who gets better at this, and who never gets the chance to start?",
        questionJa: '誰がこれで上手くなれて、誰は始める機会すら持てないのか。',
        mnemonic: "The thinnest finger, the one still growing. It is the pinky promise finger, so it points at what you could still become.",
        branches: [
            { finger: 'thumb', en: 'Logical thinking', ja: '論理的思考', noun: "the second question", verb: "takes apart", line: "Logical thinking is the second question, the one that takes apart an argument faster than any objection.", lineJa: "論理的思考とは二つ目の問いのことで、どんな反論より速く議論を解体する。" },
            { finger: 'index', en: 'Vocational skills', ja: '手に職・実務能力', noun: "something you can do", verb: "cannot be taken away", line: "Vocational skills are something you can do with your hands, and they cannot be taken away by a downturn.", lineJa: "手に職とは自分の手でできることで、不況にも奪われない。" },
            { finger: 'middle', en: 'Access', ja: '学びに届くかどうか', noun: "the bus fare to class", verb: "decides who turns up", line: "Access is the bus fare to class, and it decides who turns up long before ability does.", lineJa: "学びに届くかどうかとは教室までのバス代のことで、能力よりずっと前に誰が来るかを決めている。" },
        ],
        eiken: "Prompts about education, employment, retirement and free tuition. Writing it as 'who never gets the chance' keeps you out of vague abstraction.",
    },
    // ---------------- RIGHT HAND -- OUTSIDE ME ----------------
    {
        id: 'fairness', hand: 'right', finger: 'thumb', en: 'FAIRNESS', ja: '公平', color: '#7C3AED',
        slotNoun: "fairness",
        core: "Everyone should start on the same line. Someone gains and someone carries the cost.",
        coreJa: '同じ条件で並んでいるか。誰が得をして誰が割を食うか',
        question: "Who gains from this, and who is left carrying the cost?",
        questionJa: '得をするのは誰で、負担を押しつけられるのは誰か。',
        mnemonic: "Thumbs up or thumbs down. This is the finger that passes judgement.",
        branches: [
            { finger: 'thumb', en: 'Human rights', ja: '人権・基本的な権利', noun: "the lawyer you are owed", verb: "does not depend on", line: "Human rights are the lawyer you are owed, and that does not depend on who your parents were.", lineJa: "人権とは当然与えられるべき弁護人のことで、それは親が誰かによって変わらない。" },
            { finger: 'index', en: 'Discrimination', ja: '差別・偏見', noun: "the name on the form", verb: "decides in advance", line: "Discrimination is the name on the form that decides in advance, and nobody has to admit it.", lineJa: "差別とは書類の名前が答えを先に決めてしまうことで、誰もそれを認めなくていい。" },
            { finger: 'middle', en: 'Rules', ja: 'ルール・法の下の平等', noun: "the rulebook", verb: "is written by", line: "Rules are there to protect whoever wrote them, because the rulebook is written by the people it protects.", lineJa: "規則は書いた者を守る。規則集はそれに守られる側が書いている。" },
        ],
        eiken: "Prompts about inequality, immigration and taxation. Naming who gains and who pays fills the content criterion fast.",
    },
    {
        id: 'freedom', hand: 'right', finger: 'index', en: 'FREEDOM', ja: '自由', color: '#E7A94B',
        slotNoun: "freedom",
        core: "People decide for themselves, or it gets decided for them.",
        coreJa: '自分で決められるか。本人抜きで決まっていないか',
        question: "Who decides here, and was the person it affects ever asked?",
        questionJa: '決めているのは誰か。影響を受ける本人に誰か訊いたのか。',
        mnemonic: "The finger you point at people, so it is the finger that gives orders. Your left index points at your own time; your right index points at someone else.",
        branches: [
            { finger: 'thumb', en: 'Choice', ja: '選択肢・多様性', noun: "the second option", verb: "is taken off the table", line: "Choice dies quietly when the second option is taken off the table and nobody is told.", lineJa: "二つ目の選択肢が静かに引っ込められ誰にも知らされないとき、選択は静かに死ぬ。" },
            { finger: 'index', en: 'Expression', ja: '表現・言論・検閲', noun: "the line you cannot print", verb: "never gets said", line: "Expression ends where the line you cannot print never gets said out loud.", lineJa: "表現は、印刷できない一行が声に出されなくなるところで終わる。" },
            { finger: 'middle', en: 'Autonomy', ja: '自律・自己決定', noun: "the signature", verb: "belongs to", line: "Autonomy means the decision belongs to the person whose life it is, whatever the signature says.", lineJa: "自律とは、署名に何と書いてあろうと、決定はその人生の持ち主のものだということだ。" },
        ],
        eiken: "Prompts about surveillance, expression and compulsory voting. Once you can say 'without their consent', the paragraph stands on either side of the argument.",
    },
    {
        id: 'trust', hand: 'right', finger: 'middle', en: 'TRUST', ja: '信用', color: '#0F766E',
        slotNoun: "trust",
        core: "Someone is lying, hiding something, or unable to explain the decision.",
        coreJa: '嘘をついていないか。隠していないか。理由を説明できるか',
        question: "What is being hidden, and who has to explain it?",
        questionJa: '何が隠されているか。説明する義務を負うのは誰か。',
        mnemonic: "The finger that goes up when you have been betrayed, or when nobody will explain themselves.",
        branches: [
            { finger: 'thumb', en: 'Transparency', ja: '透明性・情報開示', noun: "the open book", verb: "answers for", line: "Transparency is the open book that answers for every line in it.", lineJa: "透明性とは、その一行ごとに説明を負う開かれた帳簿のことだ。" },
            { finger: 'index', en: 'Truth', ja: '真実・報道', noun: "the correction on page nine", verb: "never catches up with", line: "Truth is slow: the correction on page nine never catches up with the lie.", lineJa: "真実は遅い。九面の訂正は嘘に追いつかない。" },
            { finger: 'middle', en: 'Accountability', ja: '説明責任', noun: "the paper trail", verb: "has to explain", line: "Accountability is the paper trail: without it, nobody has to explain the decision.", lineJa: "説明責任とは経緯の記録のことだ。それが無ければ誰もその決定を説明しなくていい。" },
        ],
        eiken: "Prompts about AI, corporate scandals and the media. The move is to attack the fact that nobody can explain the decision. Stronger at Grade 1 than at Pre-1.",
    },
    {
        id: 'roots', hand: 'right', finger: 'ring', en: 'ROOTS', ja: '受け継ぐもの・共同体', color: '#B45309',
        slotNoun: "roots",
        core: "The people you share a table with, and what you were handed to pass on.",
        coreJa: '同じ食卓につく人と、次に渡すために受け取ったもの',
        question: "Who ends up alone, and what will nobody be able to hand on?",
        questionJa: '誰が一人になるか。そして誰も次に渡せなくなるものは何か。',
        mnemonic: "The ring finger, the one that ties you to other people. Your left ring is your own happiness; your right ring is who you sit down to eat with, and who you hand things down to.",
        branches: [
            { finger: 'thumb', en: 'Tradition', ja: '伝統・受け継いだやり方', noun: "the old way", verb: "gets thrown out", line: "Tradition is the old way that gets thrown out as an obstacle until it is gone for good.", lineJa: "伝統とは、邪魔者として捨てられ、やがて永久に消える古いやり方のことだ。" },
            { finger: 'index', en: 'Culture', ja: '文化・共有しているもの', noun: "the song everybody knows", verb: "is learned without lessons", line: "Culture is the song everybody knows, and it is learned without lessons, at weddings and funerals.", lineJa: "文化とは誰でも知っている歌のことで、授業ではなく結婚式と葬式で覚える。" },
            { finger: 'middle', en: 'Identity', ja: '自分が何者か', noun: "the language you count in", verb: "never really leaves", line: "Identity is the language you count in, and it never really leaves, whatever passport follows.", lineJa: "自分が何者かとは、数を数えるときの言語のことで、後からどんな旅券が来ても本当には消えない。" },
        ],
        eiken: "Prompts about community, an ageing society, tradition, language and tourism. Grade 1 asks about this reliably, yet most candidates do not carry it. This is where you separate yourself.",
    },
    {
        id: 'nature', hand: 'right', finger: 'little', en: 'NATURE', ja: '自然', color: '#10B981',
        slotNoun: "the environment",
        core: "What is taken out of the world does not grow back on our timetable.",
        coreJa: '世界から取ったものは、こちらの都合では戻ってこない',
        question: "What does this take out of the world, and can it come back?",
        questionJa: 'これは世界から何を取るのか。それは戻ってくるのか。',
        mnemonic: "The little finger sits on the outside edge of the hand, the furthest point from you. That is the world you did not make. Hook it with someone else's and you are promising the next generation.",
        branches: [
            { finger: 'thumb', en: 'Resources', ja: '資源・水・食糧', noun: "what is left underground", verb: "runs out", line: "Resources are what is left underground, and it runs out on a clock nobody can reset.", lineJa: "資源とは地下に残っているもので、誰にも戻せない時計で尽きていく。" },
            { finger: 'index', en: 'Sustainability', ja: '続けられるかどうか', noun: "the well that refills", verb: "lasts past our turn", line: "Sustainability is the well that refills, and only that kind of well lasts past our turn.", lineJa: "続けられるかどうかとは、また水が溜まる井戸のことだ。その手の井戸だけが我々の代を越えて残る。" },
            { finger: 'middle', en: 'Ecosystems', ja: '生態系・生物多様性', noun: "the last of a species", verb: "cannot be brought back", line: "Ecosystems are what breaks at the last of a species, which cannot be brought back for any money.", lineJa: "生態系とは、ある種の最後の一匹のところで壊れるもので、それはいくら金を積んでも戻らない。" },
        ],
        eiken: "Prompts about energy, climate, waste, tourism and food. The only finger that can say 'it does not come back', and no other finger can say it for you.",
    },
];

export const ENGINE_BY_ID: Record<EngineId, ReasonEngine> =
    Object.fromEntries(REASON_ENGINES.map((e) => [e.id, e])) as Record<EngineId, ReasonEngine>;

export const ENGINES_BY_HAND = HANDS.map((h) => ({
    ...h,
    engines: REASON_ENGINES.filter((e) => e.hand === h.id),
}));

/** 唱える順。左の親指から小指、右の親指から小指 */
export const CHANT: EngineId[] = [
    'money', 'time', 'body', 'happiness', 'education',
    'fairness', 'freedom', 'trust', 'roots', 'nature',
];

export const TOTAL_BRANCHES = REASON_ENGINES.reduce((n, e) => n + e.branches.length, 0);

export function handOf(id: EngineId): Hand {
    return ENGINE_BY_ID[id].hand;
}

/** 3本の立て方。片手だけで3本立てると薄くなるので、必ず両手をまたぐ */
export function handSplit(ids: EngineId[]): { left: number; right: number; ok: boolean } {
    const left = ids.filter((i) => handOf(i) === 'left').length;
    const right = ids.length - left;
    return { left, right, ok: left >= 1 && right >= 1 };
}

// ============================================================
// 10本の動詞 -- 試験開始と同時に答案用紙の隅に書く10語。指1本に動詞1個
//
// 【考え方】
// 本文の動詞の働きは「負担を課す / 食う / 危うくする / 削る / 育てる / 広げる / 抑える / 崩す / 守る / 脅かす」しかない。
// 指ごとに1個ずつ持てば10個で閉じる。あとはお題から拾った名詞を X と Y に入れるだけ。
// 50ブロックの動詞(eats into what is left 等)は口で言う熟語。こちらは書く用の格調高い1語。
//
// 【根拠】
// 選定基準は「/english/write の30本(英検1級の模範解答)に実在する回数」と「表現マスターの格上げ動詞に載っているか」。
// 思いつきの語は入れない。verify が30本を実際に数え、2回未満かつ表現マスター外の語は落とす。
//
// 【極性は counter 側とは限らない】
// 10組のうち8組は counter が正(賛成側で撃てる)だが、education と roots だけ逆である。
//   foster(正) / discourage(負) 、 safeguard(正) / weaken(負)
// holds に「どちらが賛成側か」を書いてあるので、思い込みで引かない。
//
// 【結び】
// 両手を合わせる = 結論の動詞は outweigh。30本で22回、賛否系の結論はこれ1択。
//
// 【この下にもう10本】
// 指の10本は「何が壊れるか」を言う理由の1文用。SKELETON_VERBS の10本は骨のどこで使うかで選んである。
// 合わせて21語。これを試験開始と同時に余白へ書けば、本文の動詞で詰まる場所はもう無い。
// ============================================================

export interface TenVerb {
    engine: EngineId;
    verb: string;       // 答案用紙に書く1語(原形)
    ja: string;
    job: string;        // 働き(日本語1語)
    pattern: string;    // 名詞をつなぐ型。X / Y はお題の名詞
    patternJa: string;
    example: string;    // 型に名詞を入れた見本
    exampleJa: string;
    why: string;        // なぜこの語か(30本での使われ方)
    /**
     * 逆側の動詞。10本は全部「何が壊れるか」を言う語なので、賛成で書く日は主語を選ばないと乗らない。
     * こちらは同じ指の「何が守られるか」側で、pattern の骨はそのまま、動詞だけ入れ替わる。
     * 使い道は譲歩 — Although <逆側>, <本命>. の1文で、1本の指が段落の骨になる。
     * 選び方は10本と同じで、30本の模範解答での実測回数だけ。思いつきの語は載せない。
     */
    /**
     * 2語のうち、賛成側で撃てるのはどちらか。
     * **10組のうち8組は counter が正だが、education と roots は逆で、主の動詞のほうが正である**
     * (foster / safeguard は正、discourage / weaken が負)。
     * ここを書いておかないと「counter = 賛成側」と思い込んで2組で必ず外す。
     */
    holds?: 'verb' | 'counter';
    counter?: string;
    counterJa?: string;
    counterPattern?: string;
    counterPatternJa?: string;
    counterWhy?: string;
    concession?: string;    // Although <counter>, <verb>. 2語を1文に入れた見本
    concessionJa?: string;
}

export const TEN_VERBS: TenVerb[] = [
    // ---------------- LEFT HAND ----------------
    {
        engine: 'money', verb: 'impose', holds: 'counter', ja: '課す', job: '負担',
        pattern: "X imposes a heavy burden on Y",
        patternJa: "XはYに重い負担を課す",
        example: "Free tuition imposes a substantial burden on taxpayers who never set foot in a university.",
        exampleJa: "大学無償化は、大学に足を踏み入れたことのない納税者に相当な負担を課す。",
        why: "30本で15回。impose a burden / cost / limit on と、負担の主語を名指しする金の指の定型。",
        counter: "yield", counterJa: "生む",
        counterPattern: "X yields a return that Y cannot buy elsewhere",
        counterPatternJa: "XはYが他では買えない見返りを生む",
        counterWhy: "30本で10回。yields a return / yielded little。負担(impose)の裏で「何が返ってくるか」を言う金の指の逆側。outweigh とは仕事が違う — こちらは天秤を傾けずに、返りの中身を名指しする。",
        concession: "Although studying abroad imposes a heavy burden on families, it yields a return that no degree at home can buy.",
        concessionJa: "留学は家庭に重い負担を課すが、国内の学位では買えない見返りを生む。",
    },
    {
        engine: 'time', verb: 'consume', holds: 'counter', ja: '食う', job: '食う',
        pattern: "X consumes the hours that Y never recover",
        patternJa: "XはYが二度と取り戻せない時間を食う",
        example: "Commuting consumes hours that families never recover.",
        exampleJa: "通勤は、家族が二度と取り戻せない時間を食う。",
        why: "30本で14回。funds consumed by / consumed faster than they can be replenished。時間・資源を「食う」1語。",
        counter: "invest", counterJa: "注ぎ込む",
        counterPattern: "X invests the hours that Y recovers many times over",
        counterPatternJa: "XはYが何倍にもして取り戻す時間を注ぎ込む",
        counterWhy: "30本で10回。invest in education / invested heavily。consume(食う)と同じ「時間」を目的語に取りながら、向きだけが逆。時間の指はこの2語で賛否どちらにも立てる。",
        concession: "Although a year abroad consumes hours that families never recover, it invests those hours in a skill they keep for life.",
        concessionJa: "1年の留学は家族が二度と取り戻せない時間を食うが、その時間は一生ものの力に注ぎ込まれる。",
    },
    {
        engine: 'body', verb: 'jeopardize', holds: 'counter', ja: '危うくする', job: '危うくする',
        pattern: "X jeopardizes the health of Y",
        patternJa: "XはYの健康を危うくする",
        example: "Unregulated social media jeopardizes the mental health of teenagers.",
        exampleJa: "野放しのSNSは十代の心の健康を危うくする。",
        why: "表現マスターの格上げ動詞(put at risk の1語)。命・安全を主語にするときの体の指の動詞。",
        counter: "protect", counterJa: "守る",
        counterPattern: "X protects the health of Y",
        counterPatternJa: "XはYの健康を守る",
        counterWhy: "30本で20回。protect the health of / protects workers from。jeopardize とまったく同じ骨に入れ替わる、体の指の逆側。safeguard(ルーツの指)より素直で、健康にはこちらが自然。",
        concession: "Although the first months abroad jeopardize a student’s health, the independence they build protects it for decades.",
        concessionJa: "留学の最初の数ヶ月は学生の健康を危うくするが、そこで身につく自立が、その後何十年もの健康を守る。",
    },
    {
        engine: 'happiness', verb: 'erode', holds: 'counter', ja: '蝕む', job: '削る',
        pattern: "X steadily erodes the wellbeing of Y",
        patternJa: "XはYの幸福を着実に蝕む",
        example: "A life consisting of little beyond work steadily erodes wellbeing.",
        exampleJa: "仕事以外にほとんど何もない人生は、幸福を着実に蝕む。",
        why: "30本で14回。erodes public support / erodes autonomy。目に見えない価値が「じわじわ減る」を言う唯一の動詞。",
        counter: "enrich", counterJa: "豊かにする",
        counterPattern: "X steadily enriches the lives of Y",
        counterPatternJa: "XはYの人生を着実に豊かにする",
        counterWhy: "30本で5回。enrich the lives of / enriching experience。erode と同じ「じわじわ効く」時間感覚を持つ唯一の逆側で、enhance(機能を上げる)より人生に合う。本人が第102夜に enriching your life overall で自力で出している語でもある。",
        concession: "Although homesickness erodes a student’s wellbeing for a term or two, the friendships enrich the rest of their life.",
        concessionJa: "ホームシックは1学期か2学期のあいだ幸福を蝕むが、そこでできた友人が残りの人生を豊かにする。",
    },
    {
        engine: 'education', verb: 'foster', holds: 'verb', ja: '育む', job: '育てる',
        pattern: "X fosters the skills that Y cannot teach",
        patternJa: "XはYが教えられない力を育む",
        example: "A year abroad fosters skills that no classroom can teach.",
        exampleJa: "海外の1年は、どんな教室も教えられない力を育む。",
        why: "30本で18回、格上げ動詞の中で最多。fosters creativity / cooperation / understanding。学びの指の主役。",
        counter: "discourage", counterJa: "削ぐ",
        counterPattern: "X discourages the curiosity that Y depends on",
        counterPatternJa: "XはYが頼る好奇心を削ぐ",
        counterWhy: "30本で5回。discourage investment / discouraged from speaking。foster の裏返しで、学びの指だけは本命が育てる側、逆側が削ぐ側になる。although に入るのはこちらである。",
        concession: "Although a rigid curriculum at home discourages curiosity, a year abroad fosters skills that no classroom can teach.",
        concessionJa: "国内の硬直したカリキュラムは好奇心を削ぐが、1年の留学は教室では教えられない力を育む。",
    },
    // ---------------- RIGHT HAND ----------------
    {
        engine: 'fairness', verb: 'widen', holds: 'counter', ja: '広げる', job: '広げる',
        pattern: "X widens the gap between Y and Z",
        patternJa: "XはYとZの差を広げる",
        example: "Rising rents widen the gap between those who own and those who rent.",
        exampleJa: "上がり続ける家賃は、持つ者と借りる者の差を広げる。",
        why: "30本で14回。widened inequality / widening wealth gap。公平の指は「差が広がる」と言えれば立つ。",
        counter: "narrow", counterJa: "縮める",
        counterPattern: "X narrows the gap between Y and Z",
        counterPatternJa: "XはYとZの差を縮める",
        counterWhy: "30本で4回。narrow the gap / narrowing inequality。widen と同じ骨に、動詞1語だけ入れ替えて入る。公平の指はこの2語で、格差が開くか閉じるかを言い分けられる。",
        concession: "Although the price widens the gap between rich and poor students, the experience narrows the gap between the countries they come from.",
        concessionJa: "費用は富裕層とそれ以外の学生の差を広げるが、その経験は国と国の差を縮める。",
    },
    {
        engine: 'freedom', verb: 'curb', holds: 'counter', ja: '抑える', job: '抑える',
        pattern: "X curbs the freedom of Y to Z",
        patternJa: "XはYがZする自由を抑える",
        example: "Blanket surveillance curbs the freedom of citizens to speak their minds.",
        exampleJa: "全面監視は、市民が思ったことを言う自由を抑える。",
        why: "30本で4回、表現マスターの格上げ動詞。regulations curbed consumption。自由の指は「誰が何を抑えるか」の動詞。",
        counter: "grant", counterJa: "与える",
        counterPattern: "X grants Y the freedom to Z",
        counterPatternJa: "XはYにZする自由を与える",
        counterWhy: "30本で6回。grants citizens the right to / granted access。curb と同じ「freedom to」を目的語に取る逆側で、allow(骨の動詞)より重く、制度が正式に渡す感じが出る。",
        concession: "Although visa rules curb the freedom of students to work, the year itself grants them the freedom to choose where they live.",
        concessionJa: "ビザの規則は学生が働く自由を抑えるが、その1年は、どこで生きるかを選ぶ自由を与える。",
    },
    {
        engine: 'trust', verb: 'undermine', holds: 'counter', ja: '崩す', job: '崩す',
        pattern: "X undermines public trust in Y",
        patternJa: "XはYへの信頼を崩す",
        example: "Every concealed data leak undermines public trust in the institutions that hold our records.",
        exampleJa: "隠されたデータ流出は一件ごとに、記録を預かる機関への信頼を崩す。",
        why: "30本で11回。undermines the deterrence argument / the very growth。土台を内側から崩す、信用の指の動詞。",
        counter: "reinforce", counterJa: "固める",
        counterPattern: "X reinforces public trust in Y",
        counterPatternJa: "XはYへの信頼を固める",
        counterWhy: "30本で2回、下限ちょうど。reinforces the case for / reinforced by。undermine とまったく同じ骨に入り、崩す・固めるの対になる。build trust は言えても点にならないので、書くときはこちら。",
        concession: "Although one bad experience undermines a student’s trust in a country, years of living there reinforce it.",
        concessionJa: "一度の嫌な経験は、その国への信頼を崩す。だがそこで暮らした年月が、それを固め直す。",
    },
    {
        engine: 'roots', verb: 'safeguard', holds: 'verb', ja: '守る', job: '守る',
        pattern: "X safeguards the ties that Y would let die",
        patternJa: "XはYなら死なせてしまうつながりを守る",
        example: "Public funding safeguards traditions that the market alone would let die.",
        exampleJa: "公的資金は、市場に任せれば消える伝統を守る。",
        why: "30本で5回、表現マスターの格上げ動詞。safeguarded civil liberties / safeguard public order。protect の格上げ。",
        counter: "weaken", counterJa: "弱める",
        counterPattern: "X weakens the ties that hold Y together",
        counterPatternJa: "XはYをつなぎとめている絆を弱める",
        counterWhy: "30本で8回。weakens the incentive / weakened by。safeguard と同じ ties を目的語に取る逆側で、ルーツの指だけは本命が守る側、逆側が弱める側になる。",
        concession: "Although leaving weakens the daily ties that hold a family together, distance safeguards the ones that actually matter.",
        concessionJa: "出ていくことは家族をつなぎとめている日々の絆を弱めるが、距離は、本当に大事なほうの絆を守る。",
    },
    {
        engine: 'nature', verb: 'endanger', holds: 'counter', ja: '脅かす', job: '脅かす',
        pattern: "X endangers the harvests on which Y depend",
        patternJa: "XはYが頼る収穫を脅かす",
        example: "Unchecked emissions endanger the harvests on which the next generation depends.",
        exampleJa: "野放しの排出は、次の世代が頼る収穫を脅かす。",
        why: "30本で10回。endangers the future of our species / endangered species。自然の指はこの語の生息地。",
        counter: "sustain", counterJa: "支える",
        counterPattern: "X sustains the systems on which Y depend",
        counterPatternJa: "XはYが頼る仕組みを支える",
        counterWhy: "30本で7回。sustain growth / sustainable。endanger と同じ「on which Y depend」の骨をそのまま使える逆側で、自然の指はこの2語で脅かす・支えるを言い分けられる。",
        concession: "Although flying there endangers the very climate we worry about, seeing the damage first-hand sustains the will to act on it.",
        concessionJa: "飛行機で行くこと自体が、案じている気候を脅かす。だが現物の被害を見ることが、行動する意志を支える。",
    },
];

/** 両手を合わせる = 結論の動詞。30本で22回、賛否系の結論はこれ1択 */
export const CLOSE_VERB: TenVerb = {
    engine: 'money', verb: 'outweigh', ja: '上回る', job: '裁く',
    pattern: "the benefits of X far outweigh Y",
    patternJa: "Xの利点はYをはるかに上回る",
    example: "The benefits of a shorter week far outweigh the disruption of introducing it.",
    exampleJa: "短い週の利点は、導入時の混乱をはるかに上回る。",
    why: "30本で22回、全動詞の中で最多。天秤を傾けて締める結論の1語。指ではなく合わせた両手に載せる。",
};

export const VERB_BY_ENGINE: Record<EngineId, TenVerb> =
    Object.fromEntries(TEN_VERBS.map((v) => [v.engine, v])) as Record<EngineId, TenVerb>;

// ============================================================
// 骨の動詞 10本 -- 指の10本と合わせて20本。これで本文の動詞は尽きる
//
// 【指の10本との違い】
// 指の動詞(impose / erode / undermine ...)は「何が壊れるか」を言う理由の1文用。
// こちらは骨のどこで使うかで選んである。難しい語は1つも無い。全部が中学英語の顔をして、
// 30本の模範解答の中で最も多く働いている動詞たち。
//
//   OPEN     お題を置く       raise / face
//   WHY      仕組みを言う     require / depend on / produce / allow / reduce / expand / strengthen
//   EXAMPLE  証拠を出す       demonstrate
//
// 【根拠】
// 全部 /english/write の30本での実測回数つき。reduce 54回、raise 44回、allow 34回。
// 数が少ない語は入れない(verify が MIN_SKELETON_HITS 回以上を強制する)。
// help / make / become / believe のような当たり前すぎる語は、書けても点にならないので入れない。
// ============================================================

export type VerbSlot = 'open' | 'why' | 'example';

export const VERB_SLOTS: { id: VerbSlot; en: string; ja: string; note: string }[] = [
    { id: 'open', en: 'OPEN', ja: 'お題を置く', note: 'The first sentence, before you take a side.' },
    { id: 'why', en: 'WHY', ja: '仕組みを言う', note: 'The mechanism sentence. The most reusable line in the essay.' },
    { id: 'example', en: 'EXAMPLE', ja: '証拠を出す', note: 'The one sentence you rebuild on the day.' },
];

export interface SkeletonVerb {
    slot: VerbSlot;
    verb: string;
    ja: string;
    pattern: string;
    patternJa: string;
    example: string;
    exampleJa: string;
    why: string;
}

export const SKELETON_VERBS: SkeletonVerb[] = [
    // ---------------- OPEN ----------------
    {
        slot: 'open', verb: 'raise', ja: '(問題を)提起する',
        pattern: "X raises difficult questions about Y",
        patternJa: "XはYについて難しい問いを提起する",
        example: "Genetic engineering raises difficult questions about where medicine ends and design begins.",
        exampleJa: "遺伝子操作は、医療がどこで終わり設計がどこから始まるかについて難しい問いを提起する。",
        why: "30本で44回。raises valid ethical questions / raised living standards。序論でお題を「論点」に変える1語。",
    },
    {
        slot: 'open', verb: 'face', ja: '直面する',
        pattern: "X faces mounting pressure to Y",
        patternJa: "XはYせよという圧力の高まりに直面している",
        example: "Governments now face mounting pressure to cut emissions without slowing their economies.",
        exampleJa: "各国政府は今、経済を減速させずに排出を削れという圧力の高まりに直面している。",
        why: "30本で19回。表現マスターに face mounting pressure to ~ として載っている。序論で当事者を主語に立てる型。",
    },
    // ---------------- WHY ----------------
    {
        slot: 'why', verb: 'require', ja: '必要とする',
        pattern: "X requires Y that Z cannot provide",
        patternJa: "XはZには用意できないYを必要とする",
        example: "Large-scale projects require sustained funding that a single government cannot provide.",
        exampleJa: "大規模な事業は、一国の政府には用意できない継続的な資金を必要とする。",
        why: "30本で25回。requires sweeping regulation / require nations to pool their expertise。前提条件を示す仕組みの動詞。",
    },
    {
        slot: 'why', verb: 'depend on', ja: '頼る',
        pattern: "X depends heavily on Y",
        patternJa: "XはYに大きく頼っている",
        example: "Rural hospitals depend heavily on the young doctors that no policy currently sends them.",
        exampleJa: "地方の病院は、どんな政策も今は送り込んでくれない若い医師に大きく頼っている。",
        why: "30本で29回。depend heavily on foreign workers / democracy depends on institutions。依存を言う定番。",
    },
    {
        slot: 'why', verb: 'produce', ja: '生む',
        pattern: "X produces Y that nobody intended",
        patternJa: "Xは誰も意図しなかったYを生む",
        example: "Blanket sanctions produce serious consequences that nobody intended.",
        exampleJa: "全面的な制裁は、誰も意図しなかった深刻な結果を生む。",
        why: "30本で23回。produce serious unintended consequences / produced the smallest income gaps。原因から結果を出す1語。",
    },
    {
        slot: 'why', verb: 'allow', ja: '可能にする',
        pattern: "X allows Y to Z",
        patternJa: "XはYがZすることを可能にする",
        example: "Free tuition allows children from low-income families to reach university at all.",
        exampleJa: "授業料の無償化は、低所得家庭の子どもがそもそも大学に届くことを可能にする。",
        why: "30本で34回。allows developing nations to participate / allowing employees to devote their time。恩恵側の主力動詞。",
    },
    {
        slot: 'why', verb: 'reduce', ja: '減らす',
        pattern: "X reduces Y considerably",
        patternJa: "XはYをかなり減らす",
        example: "Remote work reduces commuting time considerably in every city that has tried it.",
        exampleJa: "在宅勤務は、試したどの都市でも通勤時間をかなり減らす。",
        why: "30本で54回、全動詞中の最多クラス。reducing its carbon footprint / reduce emissions。数量が減る話は全部これ。",
    },
    {
        slot: 'why', verb: 'expand', ja: '広げる',
        pattern: "X expands the range of Y",
        patternJa: "XはYの及ぶ範囲を広げる",
        example: "A warming climate expands the range of the insects that carry disease.",
        exampleJa: "温暖化する気候は、病気を運ぶ虫の生息範囲を広げる。",
        why: "30本で38回。expands the range of disease-carrying insects / expanding renewables。reduce の裏返し。",
    },
    {
        slot: 'why', verb: 'strengthen', ja: '強める',
        pattern: "X strengthens Y rather than weakens it",
        patternJa: "XはYを弱めるのではなく強める",
        example: "Immigration strengthens the workforce rather than weakens it.",
        exampleJa: "移民は労働力を弱めるのではなく強める。",
        why: "30本で15回。diversity can strengthen rather than weaken a nation / strengthen global food security。undermine の裏。",
    },
    // ---------------- EXAMPLE ----------------
    {
        slot: 'example', verb: 'demonstrate', ja: '実証する',
        pattern: "X demonstrates how Y",
        patternJa: "XはYがどうなるかを実証している",
        example: "The rapid development of vaccines demonstrates how quickly research moves when it is funded.",
        exampleJa: "ワクチンが急速に開発されたことは、資金がつけば研究がいかに速く動くかを実証している。",
        why: "30本で21回。demonstrates how former rivals can collaborate / demonstrated how systematic research can save millions。実例をshowで終わらせない1語。",
    },
];

export const SKELETON_BY_SLOT = VERB_SLOTS.map((s) => ({
    ...s,
    verbs: SKELETON_VERBS.filter((v) => v.slot === s.id),
}));

/** 指10本 + 骨10本 + 結論1本。答案用紙の余白に書き出す全部 */
export const TOTAL_VERBS = TEN_VERBS.length + SKELETON_VERBS.length + 1;
/** 逆側を数えたときの総数。答案の余白に書くのは 21 本のまま、逆側は譲歩を書く日だけ足す */
export const TOTAL_WITH_COUNTERS = TOTAL_VERBS + TEN_VERBS.filter((v) => v.counter).length;

// ============================================================
// 蝶番 10本 -- 枝の名前を1つ差し込むだけで1文が立ち上がる言い回し
//
// 【何のためにあるか】
// 指を立てて枝を選んだ時点で、言いたい中身は決まっている。
// そこから「文にする」までの一歩で詰まるので、その一歩を型にして持つ。
// 蝶番 + 枝の1文 = 完成した1文。1本の指につき枝が5本あるので、
// 蝶番を1つ選べばその場で5文が立つ。10 x 50 = 500通り。
//
// 【2層に分けてある】
//   topic  枝の名前を差し込む。「Regarding cost, ...」。**後ろは裸の名詞で、冠詞の判定が1回も要らない。**
//   turn   枝を取らず、文の色だけ変える。「More often than not, ...」
// どちらも文の頭に置くだけなので、50本のどの枝にも刺さる。
//
// 【なぜ名詞を取る形だけを覚えるのか】
// that said / whereas / even so のような節を取る接続語は、後ろに主語と動詞を組み直す必要がある。
// 前置詞句なら後ろは名詞1個で、しかも枝の名前がそのまま入る。
// **この宿主の最頻出の誤りは限定詞と複数の同席なので、冠詞の判定が発生しない構文だけを残した。**
// 枝50本のうち5本(Asset / Deadline / Wealth Gap / Generation / Ecosystem)は裸で置けなかったので、
// Assets / Deadlines / Inequality / Generations / Ecosystems に改名した。これで 10 x 50 = 500通りが全部組める。
//
// 【register -- 書くのか話すのか】
// write = 1次のライティング向き。speak = 2次の質疑向き(くだけている)。
// both = どちらでも使える。-wise は口語なので答案には書かない。
//
// 【対比はここに入れない】
// 対比(AではなくB)は rather than が既に担当していて、30本の模範解答で79回出る。
// 蝶番として2本目の枝を要求する言い回しは「1本刺すだけ」という利点を失うので入れない。
// ============================================================

export type HingeKind = 'topic' | 'turn';
export type HingeRegister = 'both' | 'write' | 'speak';

export interface Hinge {
    kind: HingeKind;
    /** すでに口に入っていて、覚え直す枠を使わない3本 */
    known?: boolean;
    /** 見出し。topic は BRANCH の位置に枝の名前が入る */
    en: string;
    ja: string;
    register: HingeRegister;
    job: string;     // この蝶番の仕事
    jobJa: string;
    demo: EngineId;  // 見本に使う指
    demoBranch: string; // 見本に使う枝の en
}

export const HINGES: Hinge[] = [
    // ---------------- 名詞を取る層 — 覚える10本。後ろは裸の名詞で、冠詞の判定が1回も要らない ----------------
    {
        kind: 'topic', en: "Regarding BRANCH,", ja: '〜については', register: 'write',
        job: "One word. The cheapest way to name a topic in an essay.",
        jobJa: '1語で済む最速の1本。答案で字数を食わない。**30本の模範解答に2回。**',
        demo: 'money', demoBranch: 'Funding',
    },
    {
        kind: 'topic', en: "As for BRANCH,", ja: '〜について言えば', register: 'both',
        job: "Lifts one branch out of the prompt and puts it on the table.",
        jobJa: 'お題から枝を1本つまみ上げて机に置く。**30本に1回。**',
        demo: 'freedom', demoBranch: 'Autonomy',
    },
    {
        kind: 'topic', en: "Speaking of BRANCH,", ja: '〜といえば', register: 'speak',
        job: "The only one that rides a topic the other person raised, instead of your own.",
        jobJa: '**10本で唯一、相手が出した話題に乗れる形。**2次の質疑専用で、答案には書かない。',
        demo: 'roots', demoBranch: 'Tradition',
    },
    {
        kind: 'topic', en: "Regardless of BRANCH,", ja: '〜に関係なく', register: 'both',
        job: "The only adversative in the set. Sets a branch aside on purpose.",
        jobJa: '**10本で唯一の逆説。**枝を1本わざと脇に置くので、次の主張が検討済みに聞こえる。**30本に6回。**',
        demo: 'fairness', demoBranch: 'Rules',
    },
    {
        kind: 'topic', en: "In the case of BRANCH,", ja: '〜の場合には', register: 'both',
        job: "Limits the claim to one case, which stops the examiner calling it an overstatement.",
        jobJa: '主張を1つの場合に限定する。言いすぎを先に防げる。**講師も本人も実戦で1回ずつ使っている。**',
        demo: 'nature', demoBranch: 'Sustainability',
    },
    {
        kind: 'topic', en: "With regard to BRANCH,", ja: '〜に関して', register: 'write',
        job: "The formal one. Raises the register of a paragraph opening.",
        jobJa: '硬い1本。段落の頭に置くと答案の格が上がる。会話で使うと少し重い。',
        demo: 'trust', demoBranch: 'Accountability',
    },
    {
        kind: 'topic', en: "In the context of BRANCH,", ja: '〜の文脈では', register: 'write',
        job: "Puts the background in place before the claim. Academic.",
        jobJa: '主張の前に背景を敷く。学術寄りで、内容の観点に効く。',
        demo: 'roots', demoBranch: 'Identity',
    },
    {
        kind: 'topic', en: "As far as BRANCH goes,", ja: '〜に関する限りは', register: 'speak',
        job: "The spoken one. Cuts the scope down without sounding stiff.",
        jobJa: '会話用。硬くならずに範囲を切れる。**講師が実戦で1回使っている。**',
        demo: 'time', demoBranch: 'Productivity',
    },
    {
        kind: 'topic', en: "Where BRANCH is concerned,", ja: '〜に関して言えば', register: 'write',
        job: "The longest in the set, which is the point: it buys the most thinking time.",
        jobJa: '**10本で最長。それが取り柄で、言っているあいだに一番長く次を考えられる。**',
        demo: 'body', demoBranch: 'Longevity',
    },
    {
        kind: 'topic', en: "From the point of view of BRANCH,", ja: '〜の観点から見ると', register: 'both',
        job: "Declares the yardstick before you judge anything.",
        jobJa: 'これから何を物差しにするかを先に宣言する。**10本で最長の7語。冠詞の判定が要らない形に寄せてある(From a X point of view だと X が複数形のとき a が壊れる)。**',
        demo: 'happiness', demoBranch: 'Fulfillment',
    },

    // ---------------- すでに口に入っている3本。覚え直す必要は無いので枠は使わない ----------------
    {
        kind: 'topic', en: "When it comes to BRANCH,", ja: '〜ということになると', register: 'both', known: true,
        job: "Narrows the whole prompt down to one branch before you commit to anything.",
        jobJa: 'お題全体を枝1本まで絞る。すでに使えている。',
        demo: 'money', demoBranch: 'Financial stability',
    },
    {
        kind: 'topic', en: "In terms of BRANCH,", ja: '〜の観点では', register: 'write', known: true,
        job: "Names the measure you are about to judge by.",
        jobJa: '物差しを宣言する。すでに使えている。',
        demo: 'time', demoBranch: 'Productivity',
    },
    {
        kind: 'topic', en: "BRANCH-wise,", ja: '〜的には', register: 'speak', known: true,
        job: "The spoken shorthand. Never write it in the essay.",
        jobJa: '口語版。答案には書かない。すでに使えている。',
        demo: 'education', demoBranch: 'Access',
    },

    // ---------------- 名詞を取らない層 — 枝を差さず、文の色だけ変える ----------------
    {
        kind: 'turn', en: "More often than not,", ja: 'たいていの場合', register: 'both',
        job: "Claims a tendency instead of a law, so one counterexample cannot sink you.",
        jobJa: '法則ではなく傾向として言う。反例1つで沈まなくなる。',
        demo: 'happiness', demoBranch: 'Fulfillment',
    },
    {
        kind: 'turn', en: "If anything,", ja: 'むしろ', register: 'both',
        job: "Turns an expected concession into the opposite. Strongest right after Admittedly.",
        jobJa: '譲歩したと見せて逆を出す。Admittedly の直後が一番効く。',
        demo: 'freedom', demoBranch: 'Choice',
    },
    {
        kind: 'turn', en: "On the face of it,", ja: '一見すると', register: 'write',
        job: "Announces that the obvious reading is about to be overturned.",
        jobJa: '見たままの解釈をこれから覆す、と予告する。',
        demo: 'roots', demoBranch: 'Tradition',
    },
    {
        kind: 'turn', en: "Time and again,", ja: '何度となく', register: 'both',
        job: "Turns a single example into a pattern without inventing a statistic.",
        jobJa: '実例1つを繰り返し起きることに格上げする。数字を捏造せずに済む。',
        demo: 'body', demoBranch: 'Longevity',
    },
];

// ============================================================
// 締め 10本 -- 指1本に1つ。名詞を1個入れれば文が終わる尻
//
// 【なぜこれで足りるのか】
// 試験の場で新しい考えは出ない。出るのは、お題が寄こした名詞だけ。
// だから締めは「主語の穴が1つ空いた完成品」で持つ。slot の X にその名詞を入れれば、
// 中身のある1文がその場で終わる。考えるのは名詞1個で、文の形は考えない。
//
//   slot   X fosters personal growth        <- 名詞を1個入れる形
//   en     it fosters personal growth       <- 主語が前文から明らかな時はこちら
//
// 【hedged -- 譲歩を1枚かぶせた形】
// despite / for all its ... を頭に足すと、同じ尻が譲歩付きの1文になる。
// 考えたうえで言っている音になるので、質疑で言葉に詰まった時はこちら。
// ============================================================

// ============================================================
// 1テーマ5文 — 子テーマ3つの文 + 動詞2本の文。段落はここから4文を出すだけ
// ============================================================
/**
 * 【2026-09-14 の形 — 幹の文は、主語が良いもの4文 + 悪いもの4文】
 * 本人指摘 2つ:
 *   ① 主語が良いときと悪いときで分ければいい
 *      実地試験で、脅威(感染症)や自分が反対するもの(全面禁止)を主語にすると、良いことをする前提の文が使えなかった。
 *   ② 幹の5文が雑すぎる。普遍的でも、もう少し肉付けできる
 *      「X develops logical thinking.」だけでは中身が無い。何を・誰に・どうなるか を1つ足して、11語以内に収める。
 *   ③ 例文が鍵。蛇足(that money alone cannot buy / to get up for)を足さない。議論でそのまま使える表現を1つ入れる(2026-09-14 本人)
 *      例: underpin / yield tangible benefits / have a chilling effect on。表現は phrases に [表現, 意味] で持ち、ページで金の下地にする
 *      読点(,)は入れない。1文目は幹の文に型をつなぐので、読点があると文が2回折れる(試験 v3 で実測)。
 *
 *   主語が良いもの(X を支持する)      one / two / three  子テーマ3つ + pro  守る側の動詞で締める
 *   主語が悪いもの(脅威・反対するもの)  oneBad / twoBad / threeBad       + con  壊す側の動詞で締める
 *
 * 答案では、1段落に幹の文を1つだけ使う(本論の頭 + 幹の文 + つなぐ型)。残りは、お題に合う文を選ぶための在庫。
 * 幹の文の中には、補足の型が持つ語(which means / because / by / For instance / Without / turning / frees など)を入れない。
 * 1段落の中で同じ語が2回出るのを防ぐため。verify が検査する。
 */
export interface FingerParagraph {
    engine: EngineId;
    /** 親。この指の子テーマ3つ */
    parentJa: string;
    // ---- 主語が良いもの ----
    one: string;
    oneJa: string;
    two: string;
    twoJa: string;
    three: string;
    threeJa: string;
    /** 守る側の動詞で締める */
    pro: string;
    proJa: string;
    // ---- 主語が悪いもの ----
    oneBad: string;
    oneBadJa: string;
    twoBad: string;
    twoBadJa: string;
    threeBad: string;
    threeBadJa: string;
    /** 壊す側の動詞で締める */
    con: string;
    conJa: string;
    /** 覚える表現。[表現(辞書の形), 意味]。議論でそのまま使えるもの */
    phrases: Record<TrunkKey, [string, string]>;
}

export const FINGER_PARAGRAPHS: FingerParagraph[] = [
    {
        engine: 'money',
        parentJa: '格差 / 家計の安定 / 財源',
        one: "X goes a long way towards closing the wealth gap.",
        oneJa: 'Xは、格差を縮めるのに大いに役立つ。',
        two: "X provides a safety net that underpins financial stability.",
        twoJa: 'Xは、家計の安定を下から支えるセーフティネットになる。',
        three: "X unlocks vital funding for services that communities rely on.",
        threeJa: 'Xは、地域が頼るサービスのために欠かせない財源を引き出す。',
        pro: "X yields tangible benefits for ordinary households.",
        proJa: 'Xは、普通の家庭に目に見える利益をもたらす。',
        oneBad: "X further entrenches the wealth gap between rich and poor.",
        oneBadJa: 'Xは、豊かな人と貧しい人の格差をさらに固定化させる。',
        twoBad: "X puts the financial stability of ordinary households at risk.",
        twoBadJa: 'Xは、普通の家庭の家計の安定を危険にさらす。',
        threeBad: "X diverts scarce funding away from schools and hospitals.",
        threeBadJa: 'Xは、学校や病院に回るはずの限られた財源をよそへ流す。',
        con: "X can easily impose a hidden tax on ordinary families.",
        conJa: 'Xは、普通の家庭に見えない税を簡単に課しうる。',
        phrases: {
            one: ['go a long way towards', '〜に大いに役立つ'],
            two: ['underpin', '〜を下から支える、〜の土台になる'],
            three: ['unlock', '(資金・可能性)を引き出す'],
            pro: ['yield tangible benefits', '目に見える利益を生む'],
            oneBad: ['entrench', '(悪い状態)を固定化させる、根付かせる'],
            twoBad: ['put ... at risk', '〜を危険にさらす'],
            threeBad: ['divert ... away from', '(資金・注意)を〜からそらす'],
            con: ['impose a hidden tax on', '〜に見えない税を課す(実質的な負担を強いる)'],
        },
    },
    {
        engine: 'time',
        parentJa: '生産性 / 手間の少なさ / 機会費用',
        one: "X gives productivity a significant boost across the board.",
        oneJa: 'Xは、生産性を全面的に大きく押し上げる。',
        two: "X streamlines daily life and brings convenience within easy reach.",
        twoJa: 'Xは、日々の暮らしを効率化し、便利さを手の届くところに置く。',
        three: "X lowers the opportunity cost of taking calculated risks.",
        threeJa: 'Xは、勝算を見込んだ挑戦をするときの機会費用を下げる。',
        pro: "X invests time now that pays dividends for years.",
        proJa: 'Xは、今時間を注ぎ込み、それが何年にもわたって報われる。',
        oneBad: "X takes a heavy toll on productivity week after week.",
        oneBadJa: 'Xは、週を追うごとに生産性に大きな打撃を与える。',
        twoBad: "X offers short-term convenience at the expense of long-term stability.",
        twoBadJa: 'Xは、長期的な安定を犠牲にして、目先の便利さを差し出す。',
        threeBad: "X drives up the opportunity cost of every wasted hour.",
        threeBadJa: 'Xは、無駄になる1時間ごとの機会費用を押し上げる。',
        con: "X consumes precious hours that could be put to better use.",
        conJa: 'Xは、もっと有効に使えたはずの貴重な時間を食う。',
        phrases: {
            one: ['across the board', '全面的に、一律に'],
            two: ['streamline', '(手順・仕組み)を効率化する、簡素化する'],
            three: ['take calculated risks', '勝算を見込んだリスクを取る'],
            pro: ['pay dividends', '後になって大きな見返りがある'],
            oneBad: ['take a heavy toll on', '〜に大きな打撃を与える'],
            twoBad: ['at the expense of', '〜を犠牲にして'],
            threeBad: ['drive up', '(費用・価格)を押し上げる'],
            con: ['put to better use', 'もっと有効に使う'],
        },
    },
    {
        engine: 'body',
        parentJa: '健康 / 予防 / 長寿',
        one: "X paves the way for healthier habits and better health.",
        oneJa: 'Xは、より健康的な習慣と健康への道を開く。',
        two: "X places disease prevention at the heart of everyday care.",
        twoJa: 'Xは、予防を日々のケアの中心に置く。',
        three: "X holds the key to greater longevity in later life.",
        threeJa: 'Xは、晩年まで長く健康に生きる鍵を握る。',
        pro: "X protects the body and acts as a buffer against illness.",
        proJa: 'Xは体を守り、病気に対する緩衝材になる。',
        oneBad: "X poses a serious threat to public health.",
        oneBadJa: 'Xは、公衆衛生に深刻な脅威をもたらす。',
        twoBad: "X undercuts disease prevention precisely when it matters most.",
        twoBadJa: 'Xは、一番大事なときにこそ予防を切り崩す。',
        threeBad: "X shaves years off longevity for millions of people.",
        threeBadJa: 'Xは、多くの人の寿命を何年も縮める。',
        con: "X can easily jeopardize physical wellbeing in the long run.",
        conJa: 'Xは、長い目で見れば体の健康を簡単に危うくしうる。',
        phrases: {
            one: ['pave the way for', '〜への道を開く'],
            two: ['at the heart of', '〜の中心に'],
            three: ['hold the key to', '〜の鍵を握る'],
            pro: ['act as a buffer against', '〜に対する緩衝材になる'],
            oneBad: ['pose a serious threat to', '〜に深刻な脅威をもたらす'],
            twoBad: ['undercut', '(効果・取り組み)を切り崩す、損なう'],
            threeBad: ['shave years off', '(寿命など)を何年も縮める'],
            con: ['in the long run', '長い目で見れば'],
        },
    },
    {
        engine: 'happiness',
        parentJa: '達成感 / 目的 / 暮らしの質',
        one: "X instils a deep sense of fulfillment in ordinary people.",
        oneJa: 'Xは、普通の人に深い達成感を根付かせる。',
        two: "X lends purpose to the way people spend their days.",
        twoJa: 'Xは、人の日々の過ごし方に意味を与える。',
        three: "X brings about a marked improvement in quality of life.",
        threeJa: 'Xは、暮らしの質の著しい改善をもたらす。',
        pro: "X enriches people's lives on a personal level.",
        proJa: 'Xは、人の暮らしを個人の実感として豊かにする。',
        oneBad: "X drains the fulfillment out of hard work.",
        oneBadJa: 'Xは、大変な仕事から達成感を奪い取る。',
        twoBad: "X saps people's purpose and leaves them adrift.",
        twoBadJa: 'Xは、人の目的意識を削ぎ、よりどころを失わせる。',
        threeBad: "X gradually chips away at the quality of life.",
        threeBadJa: 'Xは、暮らしの質を少しずつ削り取る。',
        con: "X erodes happiness and breeds widespread discontent.",
        conJa: 'Xは幸せを蝕み、広く不満を生む。',
        phrases: {
            one: ['instil', '(感情・価値観)を植え付ける、根付かせる'],
            two: ['lend purpose to', '〜に意味・目的を与える'],
            three: ['bring about a marked improvement in', '〜の著しい改善をもたらす'],
            pro: ['on a personal level', '個人のレベルで、実感として'],
            oneBad: ['drain ... out of', '〜から…を奪い取る'],
            twoBad: ['leave ... adrift', '(人)をよりどころの無い状態にする'],
            threeBad: ['chip away at', '〜を少しずつ削り取る'],
            con: ['breed ... discontent', '不満を生む'],
        },
    },
    {
        engine: 'education',
        parentJa: '論理的思考 / 手に職 / 学びに届くか',
        one: "X hones logical thinking and encourages people to question assumptions.",
        oneJa: 'Xは論理的思考を磨き、前提を疑うよう人を促す。',
        two: "X equips young people with vocational skills that employers value.",
        twoJa: 'Xは、雇う側が評価する実務の技能を若者に身につけさせる。',
        three: "X broadens access to education for those once left behind.",
        threeJa: 'Xは、取り残されていた人にも教育への機会を広げる。',
        pro: "X fosters a culture of lifelong learning.",
        proJa: 'Xは、生涯学び続ける文化を育てる。',
        oneBad: "X stifles logical thinking and rewards unquestioning obedience.",
        oneBadJa: 'Xは論理的思考を抑えつけ、疑わずに従うことを良しとする。',
        twoBad: "X renders hard-won vocational skills obsolete almost overnight.",
        twoBadJa: 'Xは、苦労して身につけた実務の技能を、ほとんど一夜で時代遅れにする。',
        threeBad: "X puts access to learning beyond the reach of many.",
        threeBadJa: 'Xは、学びへの機会を多くの人の手の届かないものにする。',
        con: "X discourages curiosity and promotes rote learning instead.",
        conJa: 'Xは好奇心を削ぎ、代わりに丸暗記の学習を広める。',
        phrases: {
            one: ['hone', '(技能・思考)を磨く'],
            two: ['equip ... with', '〜に…を身につけさせる'],
            three: ['broaden access to', '〜への機会を広げる'],
            pro: ['foster a culture of', '〜の文化・風土を育てる'],
            oneBad: ['stifle', '(思考・議論)を抑えつける'],
            twoBad: ['render ... obsolete', '〜を時代遅れにする、無用にする'],
            threeBad: ['beyond the reach of', '〜の手の届かない'],
            con: ['rote learning', '丸暗記の学習(第109夜の off by rote)'],
        },
    },
    {
        engine: 'fairness',
        parentJa: '人権 / 差別 / 規則',
        one: "X upholds basic human rights even for the most vulnerable.",
        oneJa: 'Xは、最も弱い立場の人にまで基本的な人権を守る。',
        two: "X helps dismantle discrimination in decisions that shape lives.",
        twoJa: 'Xは、人生を左右する判断での差別を解体する助けになる。',
        three: "X levels the playing field under one set of rules.",
        threeJa: 'Xは、1つのルールのもとで条件を公平にする。',
        pro: "X narrows inequalities that are rooted in birth rather than effort.",
        proJa: 'Xは、努力ではなく生まれに根ざした不平等を縮める。',
        oneBad: "X tramples on basic human rights with impunity.",
        oneBadJa: 'Xは、何のとがめも受けずに基本的な人権を踏みにじる。',
        twoBad: "X fuels discrimination against groups already on the margins.",
        twoBadJa: 'Xは、すでに社会の周縁にいる人たちへの差別をあおる。',
        threeBad: "X bends the rules to suit those in positions of power.",
        threeBadJa: 'Xは、権力の座にいる者に都合よくルールを曲げる。',
        con: "X widens the gap between the haves and the have-nots.",
        conJa: 'Xは、持てる者と持たざる者の差を広げる。',
        phrases: {
            one: ['uphold', '(権利・原則)を守り支える'],
            two: ['dismantle', '(制度・差別)を解体する'],
            three: ['level the playing field', '条件を公平にする'],
            pro: ['rooted in', '〜に根ざした'],
            oneBad: ['trample on', '〜を踏みにじる'],
            twoBad: ['fuel', '(対立・差別)をあおる'],
            threeBad: ['bend the rules', 'ルールを曲げる'],
            con: ['the haves and the have-nots', '持てる者と持たざる者'],
        },
    },
    {
        engine: 'freedom',
        parentJa: '選択 / 表現 / 自律',
        one: "X empowers individuals to make informed choices for themselves.",
        oneJa: 'Xは、個人が十分な情報に基づいて自分で選べるようにする。',
        two: "X champions free expression even for unpopular views.",
        twoJa: 'Xは、不人気な意見にまで自由な表現を擁護する。',
        three: "X respects personal autonomy and lets people chart their own course.",
        threeJa: 'Xは個人の自律を尊重し、人が自分の進む道を自分で決められるようにする。',
        pro: "X grants people the latitude to live as they see fit.",
        proJa: 'Xは、人に自分が良いと思うように生きる余地を与える。',
        oneBad: "X limits choice and makes conformity the path of least resistance.",
        oneBadJa: 'Xは選択を狭め、周りに合わせることを一番楽な道にしてしまう。',
        twoBad: "X has a chilling effect on free expression.",
        twoBadJa: 'Xは、自由な表現を萎縮させる。',
        threeBad: "X encroaches on personal autonomy in subtle but persistent ways.",
        threeBadJa: 'Xは、さりげなく、しかし執拗に個人の自律を侵す。',
        con: "X can easily curb freedoms that people take for granted.",
        conJa: 'Xは、人が当たり前だと思っている自由を簡単に抑え込みうる。',
        phrases: {
            one: ['make informed choices', '十分な情報に基づいて選ぶ'],
            two: ['champion', '〜を擁護する、先頭に立って支持する'],
            three: ['chart their own course', '自分の進む道を自分で決める'],
            pro: ['as they see fit', '自分が適切だと思うように'],
            oneBad: ['the path of least resistance', '一番楽な道(抵抗の少ない道)'],
            twoBad: ['have a chilling effect on', '〜を萎縮させる'],
            threeBad: ['encroach on', '〜をじわじわ侵す'],
            con: ['take for granted', '〜を当たり前だと思う'],
        },
    },
    {
        engine: 'trust',
        parentJa: '透明性 / 真実 / 説明責任',
        one: "X injects much-needed transparency into decisions made behind closed doors.",
        oneJa: 'Xは、密室で下される決定に必要な透明性を持ち込む。',
        two: "X brings the truth to light for anyone to scrutinise.",
        twoJa: 'Xは、誰もが検証できるように真実を明るみに出す。',
        three: "X ensures accountability for those who wield power.",
        threeJa: 'Xは、権力を振るう者に説明責任を果たさせる。',
        pro: "X reinforces social trust and restores faith in institutions.",
        proJa: 'Xは社会の信頼を固め、制度への信頼を取り戻す。',
        oneBad: "X shrouds decision-making in secrecy and destroys transparency.",
        oneBadJa: 'Xは意思決定を秘密のベールに包み、透明性を壊す。',
        twoBad: "X blurs the line between truth and fiction.",
        twoBadJa: 'Xは、真実と作り話の境界をあいまいにする。',
        threeBad: "X allows the powerful to evade accountability for their actions.",
        threeBadJa: 'Xは、力を持つ者が自分の行いの責任を逃れることを許す。',
        con: "X can easily undermine public trust and sow deep division.",
        conJa: 'Xは、公の信頼を簡単に崩し、深い分断の種をまきうる。',
        phrases: {
            one: ['behind closed doors', '密室で、非公開で'],
            two: ['bring ... to light', '〜を明るみに出す'],
            three: ['wield power', '権力を振るう'],
            pro: ['restore faith in', '〜への信頼を取り戻す'],
            oneBad: ['shroud ... in secrecy', '〜を秘密のベールに包む'],
            twoBad: ['blur the line between', '〜の境界をあいまいにする'],
            threeBad: ['evade accountability', '責任を逃れる'],
            con: ['sow ... division', '分断の種をまく'],
        },
    },
    {
        engine: 'roots',
        parentJa: '伝統 / 文化 / 自分が何者か',
        one: "X breathes new life into traditions at risk of disappearing.",
        oneJa: 'Xは、消えかけている伝統に新たな命を吹き込む。',
        two: "X nurtures a shared culture that binds communities together.",
        twoJa: 'Xは、共同体を結びつける共有の文化を育てる。',
        three: "X anchors people's identity in a shared heritage.",
        threeJa: 'Xは、人のアイデンティティを共有の遺産につなぎとめる。',
        pro: "X safeguards a heritage that has been passed down through generations.",
        proJa: 'Xは、世代を超えて受け継がれてきた遺産を守る。',
        oneBad: "X relegates tradition to the pages of history books.",
        oneBadJa: 'Xは、伝統を歴史の本の中に追いやる。',
        twoBad: "X waters down a shared culture until it loses its meaning.",
        twoBadJa: 'Xは、共有の文化を骨抜きにし、意味を失わせる。',
        threeBad: "X plunges people into a crisis of identity.",
        threeBadJa: 'Xは、人をアイデンティティの危機に陥れる。',
        con: "X weakens the social fabric that holds communities together.",
        conJa: 'Xは、共同体をつなぎとめている社会の結びつきを弱める。',
        phrases: {
            one: ['breathe new life into', '〜に新たな命を吹き込む'],
            two: ['bind ... together', '〜を結びつける'],
            three: ['anchor', '〜をしっかりつなぎとめる'],
            pro: ['passed down through generations', '世代を超えて受け継がれてきた'],
            oneBad: ['relegate ... to', '〜を…に追いやる'],
            twoBad: ['water down', '〜を骨抜きにする、薄める'],
            threeBad: ['plunge ... into', '〜を…に陥れる'],
            con: ['the social fabric', '社会の結びつき(社会という織物)'],
        },
    },
    {
        engine: 'nature',
        parentJa: '資源 / 続けられるか / 生態系',
        one: "X conserves finite resources for generations to come.",
        oneJa: 'Xは、この先何世代にもわたって限りある資源を守る。',
        two: "X puts sustainability at the forefront of long-term planning.",
        twoJa: 'Xは、長期的な計画の最優先に持続可能性を置く。',
        three: "X shields fragile ecosystems from irreversible damage.",
        threeJa: 'Xは、壊れやすい生態系を取り返しのつかない被害から守る。',
        pro: "X sustains growth while striking a balance with nature.",
        proJa: 'Xは、自然とのバランスを取りながら成長を支える。',
        oneBad: "X depletes finite resources at an alarming rate.",
        oneBadJa: 'Xは、限りある資源を驚くべき速さで使い果たす。',
        twoBad: "X sacrifices sustainability for the sake of short-term gain.",
        twoBadJa: 'Xは、目先の利益のために持続可能性を犠牲にする。',
        threeBad: "X pushes fragile ecosystems to the brink of collapse.",
        threeBadJa: 'Xは、壊れやすい生態系を崩壊の瀬戸際まで追いやる。',
        con: "X endangers wildlife and wreaks havoc on the natural world.",
        conJa: 'Xは野生生物を危険にさらし、自然界に大きな被害をもたらす。',
        phrases: {
            one: ['for generations to come', 'この先何世代にもわたって'],
            two: ['at the forefront of', '〜の最前線に、最優先に'],
            three: ['irreversible damage', '取り返しのつかない被害'],
            pro: ['strike a balance', 'バランスを取る'],
            oneBad: ['at an alarming rate', '驚くべき速さで'],
            twoBad: ['short-term gain', '目先の利益'],
            threeBad: ['to the brink of', '〜の瀬戸際まで'],
            con: ['wreak havoc on', '〜に大混乱・大損害をもたらす'],
        },
    },
];

/** 覚える表現を文の中で探す正規表現。1語目は活用(s / es / ed / ing / has など)を許す。「...」は間に語が入ってよい */
const PHRASE_IRREGULAR: Record<string, string> = { have: 'has|had|having', go: 'goes|went|gone', bring: 'brought', hold: 'held', lend: 'lent', breed: 'bred', take: 'took|taken', make: 'made', put: 'puts|putting' };
export function phraseRegex(phrase: string): RegExp {
    const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const forms = (w: string) => {
        const list = [w, `${w}s`, `${w}es`, `${w}d`, `${w}ed`, `${w}ing`, `${w.replace(/e$/, '')}ing`].map(esc);
        if (/y$/.test(w)) list.push(esc(`${w.slice(0, -1)}ies`), esc(`${w.slice(0, -1)}ied`));
        if (PHRASE_IRREGULAR[w]) list.push(PHRASE_IRREGULAR[w]);
        return `(?:${list.join('|')})`;
    };
    const parts = phrase.split(' ... ').map((part, pi) => part.split(' ').map((w, wi) => (pi === 0 && wi === 0 ? forms(w) : esc(w))).join('\\s+'));
    return new RegExp(`\\b${parts.join('\\b[^.]*?\\b')}(?![\\w-])`, 'i');
}


// ============================================================
// 補足の型 20 — ポジティブ10 + ネガティブ10。組み合わせは自由
// ============================================================
/**
 * 【2026-09-13 に足した理由】
 * 第109夜、81歳の講師が AI lowers the opportunity cost of trying を
 * 「何も意味していない。ほとんど業界用語だ」と切った。**原因ははっきりしている — 宣言のあとに補足が無い。**
 *
 * 【2026-09-14 に20にした(本人の設計)】
 * 本人: AI conserves finite resources by putting real-time data in the hands of every farmer, which means less waste
 * and more water in the ground. For instance, one sensor now does the work of a crew of inspectors.
 * 「こういう自然な流れはほんとうにすばらしい。ポジティブとネガティブで10個ずつ用意して、自然につなげていければ完璧」
 *   - 段落ごとに組み合わせを決めていた前の形(9つ・3本)はやめた。**20個を自由に組む**
 *   - ポジとネガは1番から10番まで対になっている(by putting ↔ by concentrating)。片方を覚えれば、もう片方は動詞1つ
 *   - 反対側の型は捨てない。**Admittedly, で譲歩の1文にして、次の文を However, で戻す。**だから20個全部が、賛成の答案にも反対の答案にも入る
 *   - 「Without W, A is noticed only after B is gone」は本人が微妙と判断。**無かったら は would の型にした**
 *
 * 【決まりは3つ】
 *   1 付ける型(attach)は、1文に2つまで
 *   2 1本の答案で同じ型は1回だけ
 *   3 反対側の型は Admittedly, で譲歩にして、次の文を However, で戻す
 * 1段落 = 幹の文 + 型3つ + 自分の1文。型3つの選び方は自由。
 *
 * 【動詞と前置詞は全部固定。穴は名詞だけ】
 */
export type Polarity = 'pos' | 'neg';

export type SupportId =
    | 'by' | 'means' | 'lets' | 'turning' | 'example' | 'without' | 'frees' | 'focus' | 'gives' | 'leads'
    | 'concentrating' | 'meansMore' | 'blind' | 'reducing' | 'undo' | 'unchecked' | 'burdens' | 'afford' | 'strips' | 'starts';
export type SupportSlot = 'A' | 'B' | 'W';

export interface SupportPattern {
    id: SupportId;
    /** 1〜10。ポジとネガで同じ番号が対 */
    n: number;
    polarity: Polarity;
    /** 同じ番号の、反対側の型 */
    mirror: SupportId;
    /** 画面の見出し */
    label: string;
    /** 聞き手が聞き返す質問(英語) */
    asks: string;
    asksJa: string;
    /** 型。A・B が名詞の穴。それ以外は1語も動かさない */
    frame: string;
    /** 宣言にどうつなぐか。attach = 前の文に付けて1文にする / sentence = それだけで1文 */
    join: 'attach' | 'sentence';
    /** 穴に何を入れるか */
    slots: string;
    slotsJa: string;
    /** 名詞を入れたときに外しやすい所 */
    trap: string;
    trapJa: string;
}

export const SUPPORT_PATTERNS: SupportPattern[] = [
    // ---------------- ポジティブ10 ----------------
    {
        id: 'by', n: 1, polarity: 'pos', mirror: 'concentrating', label: 'BY PUTTING', asks: 'How?', asksJa: 'どうやって?',
        frame: 'by putting A in the hands of B.', join: 'attach',
        slots: 'A = what is handed over (a tool, the data, the choice). B = who gets it.',
        slotsJa: 'A = 渡すもの(道具・情報・選択肢)。B = 受け取る人。',
        trap: 'B is almost always people. Plural means no article: in the hands of farmers.',
        trapJa: 'B はほぼ人。複数なら冠詞なし — in the hands of farmers。',
    },
    {
        id: 'means', n: 2, polarity: 'pos', mirror: 'meansMore', label: 'WHICH MEANS LESS', asks: 'So what?', asksJa: 'だから何?',
        frame: ', which means less A and more B.', join: 'attach',
        slots: 'A = what shrinks. B = what grows.',
        slotsJa: 'A = 減るもの。B = 増えるもの。',
        trap: 'If A can be counted, less becomes fewer: fewer mistakes, fewer delays.',
        trapJa: 'A が数えられる名詞なら less ではなく fewer(fewer mistakes)。第109夜の much / many と同じ判定。',
    },
    {
        id: 'lets', n: 3, polarity: 'pos', mirror: 'blind', label: 'LETS SEE', asks: 'Why?', asksJa: 'なぜ?',
        frame: 'because it lets A see B.', join: 'attach',
        slots: 'A = who sees. B = what they can now see.',
        slotsJa: 'A = 見る人。B = 見えるようになるもの。',
        trap: 'it is the subject of the claim; if that is plural, write because they let. After see, a noun only.',
        trapJa: 'it は宣言の主語。複数なら because they let。see の後ろは名詞だけで、文にしない。',
    },
    {
        id: 'turning', n: 4, polarity: 'pos', mirror: 'reducing', label: 'TURNING', asks: 'Into what?', asksJa: '何が何に変わる?',
        frame: ', turning A into B.', join: 'attach',
        slots: 'A = what it starts as. B = what it becomes (something better).',
        slotsJa: 'A = 変わる前のもの。B = 良くなった後のもの。',
        trap: 'Keep A and B the same kind of noun: guesswork into policy, rumour into evidence.',
        trapJa: 'A と B は同じ種類の名詞にそろえる — guesswork → policy / rumour → evidence。',
    },
    {
        id: 'example', n: 5, polarity: 'pos', mirror: 'undo', label: 'NOW DOES THE WORK', asks: 'Show me.', asksJa: '例えば?',
        frame: 'For instance, A now does the work of B.', join: 'sentence',
        slots: 'A = one small thing or one person. B = whoever used to do that job.',
        slotsJa: 'A = 小さな1つか1人。B = 前はその仕事をしていた人か組織。',
        trap: 'A is singular, so does. If A is plural, write do.',
        trapJa: 'A は単数なので does。複数にするなら do。',
    },
    {
        id: 'without', n: 6, polarity: 'pos', mirror: 'unchecked', label: 'WOULD STILL DEPEND', asks: 'What if not?', asksJa: '無かったら?',
        frame: 'Without it, A would still depend on B.', join: 'sentence',
        slots: 'A = who would be stuck (people). B = the old way (guesswork, paper forms).',
        slotsJa: 'A = 困ったままの人。B = 古いやり方(guesswork / paper forms)。',
        trap: 'would + base form: depend, never depends. B is the old way, not the new tool.',
        trapJa: 'would の後ろは原形 — depend で、depends ではない。B は新しい道具ではなく古いやり方。',
    },
    {
        id: 'frees', n: 7, polarity: 'pos', mirror: 'burdens', label: 'IT FREES', asks: 'Who gains?', asksJa: '誰が得をする?',
        frame: 'Above all, it frees A from B.', join: 'sentence',
        slots: 'A = who is freed (people). B = the burden.',
        slotsJa: 'A = 解放される人。B = 負担。',
        trap: 'Never drop from. If B is an activity, use -ing: frees nurses from filling in forms.',
        trapJa: 'from を落とさない。B が動作なら -ing — frees nurses from filling in forms。',
    },
    {
        id: 'focus', n: 8, polarity: 'pos', mirror: 'afford', label: 'CAN FINALLY FOCUS', asks: 'And then?', asksJa: 'その結果?',
        frame: 'As a result, A can finally focus on B.', join: 'sentence',
        slots: 'A = who gains time (people). B = what really matters.',
        slotsJa: 'A = 時間ができる人。B = 本当に大事なもの。',
        trap: 'can + base form. B is a noun: focus on patients.',
        trapJa: 'can の後ろは原形。B は名詞 — focus on patients。',
    },
    {
        id: 'gives', n: 9, polarity: 'pos', mirror: 'strips', label: 'NEVER HAD', asks: 'What do they get?', asksJa: '何を与える?',
        frame: 'It gives A the B they never had.', join: 'sentence',
        slots: 'A = people. B = what they receive (access, a voice, the data).',
        slotsJa: 'A = 人。B = 手に入るもの(access / a voice / the data)。',
        trap: 'B already has the in front of it, so add no article. they points back to A, even if A is singular.',
        trapJa: 'B の前に the があるので冠詞を足さない。they は A を指す(A が単数でも they)。',
    },
    {
        id: 'leads', n: 10, polarity: 'pos', mirror: 'starts', label: 'LEADS TO', asks: 'What follows?', asksJa: '次に何が起きる?',
        frame: 'In turn, A leads to B.', join: 'sentence',
        slots: 'A = the first good result. B = the bigger one it causes.',
        slotsJa: 'A = 最初の良い結果。B = それが呼ぶ、もっと大きな結果。',
        trap: 'A is singular or uncountable, so leads; if plural, lead.',
        trapJa: 'A は単数か数えられない名詞なので leads。複数なら lead。',
    },
    // ---------------- ネガティブ10(同じ番号がポジの対) ----------------
    {
        id: 'concentrating', n: 1, polarity: 'neg', mirror: 'by', label: 'BY CONCENTRATING', asks: 'How?', asksJa: 'どうやって?',
        frame: 'by concentrating A in the hands of B.', join: 'attach',
        slots: 'A = power, money or data. B = a small group (a few tech giants).',
        slotsJa: 'A = 力・金・データ。B = 一握りの人(a few tech giants)。',
        trap: 'B is a small group, so a few, never few: a few platforms.',
        trapJa: 'B は一握りなので a few(few だと「ほとんど無い」)— a few platforms。',
    },
    {
        id: 'meansMore', n: 2, polarity: 'neg', mirror: 'means', label: 'WHICH MEANS MORE', asks: 'So what?', asksJa: 'だから何?',
        frame: ', which means more A and less B.', join: 'attach',
        slots: 'A = what grows (the bad thing). B = what shrinks.',
        slotsJa: 'A = 増える悪いもの。B = 減るもの。',
        trap: 'If B can be counted, less becomes fewer: fewer jobs.',
        trapJa: 'B が数えられる名詞なら fewer(fewer jobs)。',
    },
    {
        id: 'blind', n: 3, polarity: 'neg', mirror: 'lets', label: 'LEAVES BLIND', asks: 'Why?', asksJa: 'なぜ?',
        frame: 'because it leaves A blind to B.', join: 'attach',
        slots: 'A = who can no longer see. B = what they miss.',
        slotsJa: 'A = 見えなくなる人。B = 見落とすもの。',
        trap: 'blind to, never blind of.',
        trapJa: 'blind to で、blind of ではない。',
    },
    {
        id: 'reducing', n: 4, polarity: 'neg', mirror: 'turning', label: 'REDUCING', asks: 'Into what?', asksJa: '何が何に落ちる?',
        frame: ', reducing A to B.', join: 'attach',
        slots: 'A = something valued (people, work). B = a lesser version (data points, cheap labour).',
        slotsJa: 'A = 価値のあるもの(人・仕事)。B = 格下げされた姿(data points / cheap labour)。',
        trap: 'reduce A to B, never into.',
        trapJa: 'reduce A to B。into ではない。',
    },
    {
        id: 'undo', n: 5, polarity: 'neg', mirror: 'example', label: 'ALONE CAN UNDO', asks: 'Show me.', asksJa: '例えば?',
        frame: 'For instance, A alone can undo B.', join: 'sentence',
        slots: 'A = one small thing (one leak). B = what took years to build.',
        slotsJa: 'A = 小さな1つ(one leak)。B = 何年もかけて積み上げたもの。',
        trap: 'A is one thing, so start it with one or a: one leak alone.',
        trapJa: 'A は1つなので one / a で始める — one leak alone。',
    },
    {
        id: 'unchecked', n: 6, polarity: 'neg', mirror: 'without', label: 'LEFT UNCHECKED', asks: 'What if nobody stops it?', asksJa: '放っておいたら?',
        frame: 'Left unchecked, it would leave A without B.', join: 'sentence',
        slots: 'A = people. B = what they would lose.',
        slotsJa: 'A = 人。B = 失うもの。',
        trap: 'would + base form: leave. it is the subject of the claim.',
        trapJa: 'would の後ろは原形 leave。it は宣言の主語。',
    },
    {
        id: 'burdens', n: 7, polarity: 'neg', mirror: 'frees', label: 'IT BURDENS', asks: 'Who pays?', asksJa: '誰が負担する?',
        frame: 'Above all, it burdens A with B.', join: 'sentence',
        slots: 'A = who carries the cost (people). B = the burden.',
        slotsJa: 'A = 負担を背負う人。B = 負担。',
        trap: 'Never drop with.',
        trapJa: 'with を落とさない。',
    },
    {
        id: 'afford', n: 8, polarity: 'neg', mirror: 'focus', label: 'NO LONGER AFFORD', asks: 'And then?', asksJa: 'その結果?',
        frame: 'As a result, A can no longer afford B.', join: 'sentence',
        slots: 'A = people. B = something they used to pay for or risk.',
        slotsJa: 'A = 人。B = 前は払えた・引き受けられたもの。',
        trap: 'afford takes a noun directly: afford a lawyer, never afford for.',
        trapJa: 'afford の後ろに直接名詞 — afford a lawyer。afford for ではない。',
    },
    {
        id: 'strips', n: 9, polarity: 'neg', mirror: 'gives', label: 'ONCE HAD', asks: 'What do they lose?', asksJa: '何を奪う?',
        frame: 'It strips A of the B they once had.', join: 'sentence',
        slots: 'A = people. B = what they lose (control, a voice).',
        slotsJa: 'A = 人。B = 失うもの(control / a voice)。',
        trap: 'strip A of B, never from. B already has the in front of it.',
        trapJa: 'strip A of B。from ではない。B の前に the があるので冠詞を足さない。',
    },
    {
        id: 'starts', n: 10, polarity: 'neg', mirror: 'leads', label: 'STARTS / ENDS', asks: 'Where does it end?', asksJa: 'どこへ行き着く?',
        frame: 'It starts with A and ends with B.', join: 'sentence',
        slots: 'A = the small first step. B = where it ends up.',
        slotsJa: 'A = 小さな始まり(one post)。B = 行き着く先(a riot)。',
        trap: 'Keep A small and B large.',
        trapJa: 'A は小さく、B は大きく。',
    },
];

export const SUPPORT_BY_ID: Record<SupportId, SupportPattern> =
    Object.fromEntries(SUPPORT_PATTERNS.map((p) => [p.id, p])) as Record<SupportId, SupportPattern>;

function fillHoles(frame: string, slots: Partial<Record<SupportSlot, string>>): string {
    return frame.replace(/\b(A|B|W)\b/g, (k) => slots[k as SupportSlot] ?? (k === 'W' ? 'it' : k));
}

/** 宣言に、名詞を落とした補足をつなぐ */
export function fillSupport(claim: string, id: SupportId, slots: Partial<Record<SupportSlot, string>>): string {
    const p = SUPPORT_BY_ID[id];
    const body = fillHoles(p.frame, slots);
    const head = claim.trim().replace(/\.$/, '');
    if (p.join === 'sentence') return `${head}. ${body}`;
    return body.startsWith(',') ? `${head}${body}` : `${head} ${body}`;
}

/** 型に名詞だけを落とした形。sentence の型なら、それだけで1文になる */
export function supportBody(id: SupportId, slots: Partial<Record<SupportSlot, string>>): string {
    return fillHoles(SUPPORT_BY_ID[id].frame, slots);
}

/** 文頭のつなぎ言葉。譲歩と反論では Admittedly, / However, に置き換える */
const SUPPORT_LEADS = /^(For instance|Above all|As a result|In turn), /;
function frameCore(frame: string): string {
    const core = frame.replace(SUPPORT_LEADS, '');
    return /^(A|B)\b/.test(core) ? core : core.charAt(0).toLowerCase() + core.slice(1);
}

/** 反対側の型を、譲歩の1文にする。付ける型は it can help / it can backfire に付ける */
export function concedeSupport(id: SupportId, slots: Partial<Record<SupportSlot, string>>): string {
    const p = SUPPORT_BY_ID[id];
    if (p.join === 'attach') return fillSupport(`Admittedly, it can ${p.polarity === 'pos' ? 'help' : 'backfire'}`, id, slots);
    return `Admittedly, ${fillHoles(frameCore(p.frame), slots)}`;
}

/** 譲歩の次の1文。自分の側の型を However, で始める */
export function rebutSupport(id: SupportId, slots: Partial<Record<SupportSlot, string>>): string {
    const p = SUPPORT_BY_ID[id];
    if (p.join === 'attach') return fillSupport(`However, it ${p.polarity === 'pos' ? 'helps' : 'hurts'}`, id, slots);
    return `However, ${fillHoles(frameCore(p.frame), slots)}`;
}

export interface SupportStep {
    pattern: SupportId;
    slots: Partial<Record<SupportSlot, string>>;
}

/**
 * 段落を組む。head = 本論の頭 + 幹の文(X は埋めたもの)。polarity = 段落の立場。
 *   付ける型          → 同じ側の直前の文に2つまで付く(カンマで付ける型を後ろに回す)
 *   反対側の型        → Admittedly, の譲歩の1文(付ける型なら it can help / it can backfire に付ける)
 *   譲歩の次の自分の側 → However, で始める
 * 返すのは文の配列。own(自分の1文)を渡すと最後に入る。
 */
export function buildParagraph(head: string, polarity: Polarity, steps: SupportStep[], own?: string): string[] {
    type Group = { kind: 'main' | 'concede' | 'rebut' | 'plain'; side: Polarity; base?: SupportStep; attaches: SupportStep[] };
    const groups: Group[] = [{ kind: 'main', side: polarity, attaches: [] }];
    let conceded = false;
    for (const s of steps) {
        const p = SUPPORT_BY_ID[s.pattern];
        const last = groups[groups.length - 1];
        if (p.join === 'attach' && last.side === p.polarity && last.attaches.length < 2) {
            last.attaches.push(s);
            continue;
        }
        const opposite = p.polarity !== polarity;
        const kind: Group['kind'] = opposite ? (conceded ? 'plain' : 'concede') : (conceded ? 'rebut' : 'plain');
        groups.push({ kind, side: p.polarity, base: p.join === 'sentence' ? s : undefined, attaches: p.join === 'attach' ? [s] : [] });
        conceded = opposite;
    }
    // カンマで付ける型(which means / turning / reducing)は後ろ。by / because を先に付けないと、by が which means の中身に掛かる
    const commaLast = (a: SupportStep, b: SupportStep) =>
        Number(SUPPORT_BY_ID[a.pattern].frame.startsWith(',')) - Number(SUPPORT_BY_ID[b.pattern].frame.startsWith(','));
    const out = groups.map((g) => {
        let text: string;
        if (g.kind === 'main') {
            text = head.trim().replace(/\.$/, '');
        } else if (g.base) {
            const core = fillHoles(frameCore(SUPPORT_BY_ID[g.base.pattern].frame), g.base.slots).replace(/\.$/, '');
            text = g.kind === 'concede' ? `Admittedly, ${core}`
                : g.kind === 'rebut' ? `However, ${core}`
                    : supportBody(g.base.pattern, g.base.slots).replace(/\.$/, '');
        } else {
            const good = g.side === 'pos';
            text = g.kind === 'concede' ? `Admittedly, it can ${good ? 'help' : 'backfire'}`
                : g.kind === 'rebut' ? `However, it ${good ? 'helps' : 'hurts'}`
                    : `It also ${good ? 'helps' : 'hurts'}`;
        }
        return [...g.attaches].sort(commaLast).reduce((acc, a) => fillSupport(acc, a.pattern, a.slots).replace(/\.$/, ''), text);
    });
    if (own) {
        out.push(conceded ? `However, ${/^(I|AI)\b/.test(own) ? own : own.charAt(0).toLowerCase() + own.slice(1)}` : own);
    }
    return out.map((t) => (/[.!?]$/.test(t) ? t : `${t}.`));
}

/** 宣言に、同じ側の型を順番につなぐ(見本用。付ける型を先に並べる) */
export function fillChain(claim: string, links: SupportStep[]): string {
    return links.reduce((acc, l) => fillSupport(acc, l.pattern, l.slots), claim);
}

// ============================================================
// 流れの見本 — 20個を自由に組んだ段落
// ============================================================
export interface SupportFlow {
    label: string;
    noteJa: string;
    note: string;
    engine: EngineId;
    key: TrunkKey;
    subject: string;
    polarity: Polarity;
    steps: SupportStep[];
    own: string;
}

export const SUPPORT_FLOWS: SupportFlow[] = [
    {
        label: 'TWO ATTACHED, THEN AN EXAMPLE',
        noteJa: '付ける型2つで1文(どうやって → だから何)、1文の型で例えば。本人が組んだ流れ',
        note: 'Two attached frames make one sentence, then a stand-alone example.',
        engine: 'nature', key: 'one', subject: 'AI', polarity: 'pos',
        steps: [
            { pattern: 'by', slots: { A: 'real-time data', B: 'every farmer' } },
            { pattern: 'means', slots: { A: 'waste', B: 'water in the ground' } },
            { pattern: 'example', slots: { A: 'one sensor', B: 'a crew of inspectors' } },
        ],
        own: 'Farms that measure every drop rarely overpump.',
    },
    {
        label: 'WHY, INTO WHAT, WHAT IF NOT',
        noteJa: 'なぜ → 何が何に変わる を1文に付けて、無かったら(would)で押す',
        note: 'Why and into what share one sentence; the would frame shows the world without it.',
        engine: 'nature', key: 'two', subject: 'AI', polarity: 'pos',
        steps: [
            { pattern: 'lets', slots: { A: 'governments', B: 'the real cost' } },
            { pattern: 'turning', slots: { A: 'guesswork', B: 'policy' } },
            { pattern: 'without', slots: { A: 'water boards', B: 'rough estimates' } },
        ],
        own: 'Plans fail when nobody sees what is running out.',
    },
    {
        label: 'ADMITTEDLY, HOWEVER',
        noteJa: 'ネガの型を Admittedly, で譲歩に入れて、次のポジの型を However, で戻す',
        note: 'A negative frame becomes a concession; the next positive frame answers it with However.',
        engine: 'nature', key: 'three', subject: 'AI', polarity: 'pos',
        steps: [
            { pattern: 'turning', slots: { A: 'raw images', B: 'early warnings' } },
            { pattern: 'undo', slots: { A: 'one false alarm', B: 'public confidence' } },
            { pattern: 'frees', slots: { A: 'rangers', B: 'endless patrols' } },
        ],
        own: 'Reserves that spot trouble early can save a species.',
    },
    {
        label: 'X IS BAD, WITH A POSITIVE CONCESSION',
        noteJa: '主語が悪いものの段落。ポジの型を譲歩に使って、ネガの型で戻す',
        note: 'The same moves from the other side: the positive frame is the concession.',
        engine: 'nature', key: 'oneBad', subject: 'AI', polarity: 'neg',
        steps: [
            { pattern: 'blind', slots: { A: 'tech firms', B: 'local water shortages' } },
            { pattern: 'focus', slots: { A: 'engineers', B: 'efficiency' } },
            { pattern: 'strips', slots: { A: 'rural areas', B: 'water' } },
        ],
        own: 'One data centre can use as much water as a small town.',
    },
];

// ============================================================
// 宣言 + 補足の見本 — 10テーマ × 幹の文8つ、主語はすべて AI
// ============================================================
/**
 * 【見本であって、暗記するものではない】
 * 暗記するのは幹の文(FINGER_PARAGRAPHS)と型20(SUPPORT_PATTERNS)だけ。名詞は「こう落とせる」という見本。
 *
 * 【並べ方の決まり】
 * 良い主語の4文にはポジの型、悪い主語の4文にはネガの型。同じテーマで型は重ならない。
 * 型を2つ付けるときは、2つとも付ける型(attach)。20の型は、全テーマを通して2回以上使う。
 */
export type TrunkKey = 'one' | 'two' | 'three' | 'pro' | 'oneBad' | 'twoBad' | 'threeBad' | 'con';
export const TRUNK_KEYS_GOOD: TrunkKey[] = ['one', 'two', 'three', 'pro'];
export const TRUNK_KEYS_BAD: TrunkKey[] = ['oneBad', 'twoBad', 'threeBad', 'con'];
export type BackedKey = TrunkKey;

export interface BackedLine {
    key: TrunkKey;
    /** FINGER_PARAGRAPHS の X に入れた主語 */
    subject: string;
    steps: SupportStep[];
}

const bl = (key: TrunkKey, ...steps: [SupportId, string, string][]): BackedLine => ({
    key, subject: 'AI', steps: steps.map(([pattern, A, B]) => ({ pattern, slots: { A, B } })),
});

export const BACKED_AI: Record<EngineId, BackedLine[]> = {
    money: [
        bl('one', ['by', 'financial advice', 'first-time buyers']),
        bl('two', ['means', 'panic', 'savings']),
        bl('three', ['lets', 'councils', 'waste']),
        bl('pro', ['turning', 'loose change', 'investments']),
        bl('oneBad', ['concentrating', 'profits', 'a few tech giants']),
        bl('twoBad', ['meansMore', 'debt', 'security']),
        bl('threeBad', ['blind', 'budget planners', 'hidden costs']),
        bl('con', ['reducing', 'workers', 'cheap labour']),
    ],
    time: [
        bl('one', ['means', 'overtime', 'output']),
        bl('two', ['lets', 'busy parents', 'the whole week']),
        bl('three', ['turning', 'idle weekends', 'side projects']),
        bl('pro', ['example', 'one chatbot', 'a call centre']),
        bl('oneBad', ['meansMore', 'checking', 'doing']),
        bl('twoBad', ['blind', 'users', 'the long-term cost']),
        bl('threeBad', ['reducing', 'deep work', 'constant fixing']),
        bl('con', ['undo', 'one faulty update', 'a week of work']),
    ],
    body: [
        bl('one', ['lets', 'patients', 'their sleep patterns']),
        bl('two', ['turning', 'routine scans', 'early warnings']),
        bl('three', ['example', 'a single scan', 'a team of specialists']),
        bl('pro', ['without', 'rural clinics', 'guesswork']),
        bl('oneBad', ['blind', 'doctors', 'its errors']),
        bl('twoBad', ['reducing', 'patients', 'data points']),
        bl('threeBad', ['undo', 'one misdiagnosis', 'years of treatment']),
        bl('con', ['unchecked', 'patients', 'a human doctor']),
    ],
    happiness: [
        bl('one', ['turning', 'dull chores', 'creative time']),
        bl('two', ['example', 'a retired teacher', 'a tutoring agency']),
        bl('three', ['without', 'carers', 'exhausting routines']),
        bl('pro', ['frees', 'workers', 'drudgery']),
        bl('oneBad', ['reducing', 'craftspeople', 'button pushers']),
        bl('twoBad', ['undo', 'one automated system', 'a lifelong career']),
        bl('threeBad', ['unchecked', 'people', 'real friendships']),
        bl('con', ['burdens', 'young people', 'endless comparison']),
    ],
    education: [
        bl('one', ['example', 'one AI tutor', 'a team of teachers']),
        bl('two', ['without', 'trainees', 'costly courses']),
        bl('three', ['frees', 'rural students', 'long commutes']),
        bl('pro', ['focus', 'teachers', 'real understanding']),
        bl('oneBad', ['undo', 'one shortcut', 'a habit of thinking']),
        bl('twoBad', ['unchecked', 'apprentices', 'real experience']),
        bl('threeBad', ['burdens', 'poorer schools', 'expensive licences']),
        bl('con', ['afford', 'students', 'slow practice']),
    ],
    fairness: [
        bl('one', ['without', 'refugees', 'overworked lawyers']),
        bl('two', ['frees', 'job seekers', 'hidden bias']),
        bl('three', ['focus', 'judges', 'the evidence']),
        bl('pro', ['gives', 'poor families', 'legal help']),
        bl('oneBad', ['unchecked', 'citizens', 'privacy']),
        bl('twoBad', ['burdens', 'minorities', 'biased decisions']),
        bl('threeBad', ['afford', 'ordinary people', 'a fair hearing']),
        bl('con', ['strips', 'workers', 'bargaining power']),
    ],
    freedom: [
        bl('one', ['frees', 'consumers', 'gatekeepers']),
        bl('two', ['focus', 'writers', 'their message']),
        bl('three', ['gives', 'disabled people', 'independence']),
        bl('pro', ['leads', 'more choice', 'more confident citizens']),
        bl('oneBad', ['burdens', 'users', 'constant nudges']),
        bl('twoBad', ['afford', 'journalists', 'honest criticism']),
        bl('threeBad', ['strips', 'individuals', 'control']),
        bl('con', ['starts', 'friendly suggestions', 'quiet control']),
    ],
    trust: [
        bl('one', ['focus', 'auditors', 'real risks']),
        bl('two', ['gives', 'readers', 'evidence']),
        bl('three', ['leads', 'faster exposure', 'fewer cover-ups']),
        bl('pro', ['by', 'public records', 'ordinary citizens']),
        bl('oneBad', ['afford', 'small newspapers', 'proper fact-checking']),
        bl('twoBad', ['strips', 'voters', 'confidence']),
        bl('threeBad', ['starts', 'automated decisions', 'nobody to blame']),
        bl('con', ['concentrating', 'information', 'a few platforms']),
    ],
    roots: [
        bl('one', ['gives', 'young people', 'access']),
        bl('two', ['leads', 'a digital archive', 'renewed pride']),
        bl('three', ['by', 'old recordings', 'grandchildren']),
        bl('pro', ['means', 'forgetting', 'belonging']),
        bl('oneBad', ['strips', 'local festivals', 'meaning']),
        bl('twoBad', ['starts', 'automatic translation', 'one global language']),
        bl('threeBad', ['concentrating', 'cultural content', 'foreign platforms']),
        bl('con', ['meansMore', 'screens', 'conversation']),
    ],
    nature: [
        bl('one', ['by', 'real-time data', 'every farmer'], ['means', 'waste', 'water in the ground']),
        bl('two', ['lets', 'governments', 'the real cost'], ['turning', 'guesswork', 'policy']),
        bl('three', ['example', 'a single camera', 'a team of rangers']),
        bl('pro', ['leads', 'better data', 'smarter policy']),
        bl('oneBad', ['starts', 'one data centre', 'a drained reservoir']),
        bl('twoBad', ['concentrating', 'power', 'a few tech firms']),
        bl('threeBad', ['meansMore', 'mining', 'wilderness']),
        bl('con', ['blind', 'regulators', 'its energy use']),
    ],
};

/** 見本1行を、宣言 + 補足の英文にする */
export function backedText(engine: EngineId, line: BackedLine): string {
    const p = PARAGRAPH_BY_ENGINE_LAZY()[engine];
    const claim = p[line.key].replace(/\bX\b/, line.subject);
    return fillChain(claim, line.steps);
}

function PARAGRAPH_BY_ENGINE_LAZY(): Record<EngineId, FingerParagraph> { return PARAGRAPH_BY_ENGINE; }

export const PARAGRAPH_BY_ENGINE: Record<EngineId, FingerParagraph> =
    Object.fromEntries(FINGER_PARAGRAPHS.map((p) => [p.engine, p])) as Record<EngineId, FingerParagraph>;

/**
 * 指1本ぶんの、用意してある4文を出す。n は本論の何番目か。
 *   [本論の枠 + 子テーマ1(X にお題の名詞), 子テーマ2, 子テーマ3, 締めの動詞文]
 * 具体例の1文は3文目と締めのあいだに、自分の言葉で入れる。
 * against = true なら締めを con(壊す側の動詞)に差し替える。
 */
export function buildFingerParagraph(
    engine: EngineId, topic: string, n: 1 | 2 | 3, against = false,
): string[] {
    const p = PARAGRAPH_BY_ENGINE[engine];
    const e = ENGINE_BY_ID[engine];
    const opener = BODY_OPENERS[n - 1].frame.replace('W', e.slotNoun);
    const it = (sent: string) => sent.replace(/\bX\b/g, 'It');
    return [
        `${opener} ${p.one.replace(/\bX\b/g, topic)}`,
        it(p.two),
        it(p.three),
        it(against ? p.con : p.pro),
    ];
}

// ============================================================
// 口語スピーキング — 蝶番はこの5本、I think の代わりはこの5本
// ============================================================
/**
 * 【なぜ絞るか】
 * 蝶番は17本ある。答案では全部使えるが、**口では17本から選ぶ時間が無い。**
 * 喋る用は5本に固定する。5本とも裸の名詞を取るので、冠詞の判定が1回も起きない。
 *
 * 【I think の実測】
 * 録音29レッスン、本人の発話24,964語の中で **I think は60回**。
 * 1回の25分で10回言った夜が2つある(2026-09-03 と 2026-09-04)。
 * **もう「そう思う」の意味では働いていない。句読点になっている。**
 * 代わりの5本のうち4本は、この記録の中で一度も出ていない。
 *
 * 【counts は実測値。書き換えない】
 * saidSoFar は lessons.ts の実測から取った数。verify が数え直して、
 * 実測より大きい数(=盛った数)が書いてあれば落とす。
 */
export interface SpokenPick {
    en: string;          // 覚える形。X は名詞の穴
    ja: string;
    /** その1本にしかできない仕事 */
    job: string;
    jobJa: string;
    /** 講師に見せる説明(英語) */
    note: string;
    demo: string;
    /** 2026-09-11 時点、録音29レッスンでの実測回数 */
    saidSoFar: number;
}

/** 喋る用の蝶番5本。17本から絞ったもの。全部 HINGES にある形 */
export const SPEAKING_FIVE: SpokenPick[] = [
    {
        en: "When it comes to X,", ja: 'Xということで言えば、',
        job: 'The workhorse. Opens any topic, takes a bare noun.',
        jobJa: '一番よく回る1本。どの話題でも開けて、後ろは裸の名詞。',
        note: "The workhorse. It takes a bare noun and nothing else, so there is no article to get wrong. I have used it twenty times in these recordings, more than any of the other four. If I only ever learned one of these, it would be this one.",
        demo: "When it comes to money, nobody wants to go first.",
        saidSoFar: 20,
    },
    {
        en: "X-wise,", ja: 'Xの面では、',
        job: 'The shortest hinge in English. No words at all, just a suffix.',
        jobJa: '英語で一番短い蝶番。語がゼロで、接尾辞1つで済む。',
        note: "The shortest hinge in English: no words at all, just a suffix. It is also the only productive one — bolt -wise onto almost any noun and a native will follow you. Budget-wise, weather-wise, sleep-wise. It took me three tries to stop putting something in front of it: the time-wise, from money-wise, environmentally-wise. Nothing goes in front. Nothing goes after but a comma.",
        demo: "Time-wise, it is not going to happen this month.",
        saidSoFar: 14,
    },
    {
        en: "Speaking of X,", ja: 'Xといえば、',
        job: 'The only one that rides your topic instead of launching mine.',
        jobJa: '5本で唯一、相手が出した話題に乗れる形。',
        note: "The only one of the five that rides your topic instead of launching mine. The other four open a door; this one walks through a door you opened. So if I go quiet for a while and then say speaking of, it means I was waiting for the word.",
        demo: "Speaking of trust, that is exactly what went wrong here.",
        saidSoFar: 4,
    },
    {
        en: "As far as X goes,", ja: 'Xに関して言えば、',
        job: 'The longest, which is the point. Five words of thinking time.',
        jobJa: '一番長い。5語ぶんの時間を、次に何を言うか決めるために使える。',
        note: "The longest of the five, and that is exactly why it is here. Five words buys me the time to decide what comes next. It also warns you that I am about to limit my claim rather than make a big one. I have used it once in twenty-nine lessons, which is the whole reason it is on this list.",
        demo: "As far as cost goes, I have not looked into it properly.",
        saidSoFar: 1,
    },
    {
        en: "In terms of X,", ja: 'Xという点では、',
        job: 'The measuring one. Names the axis you are judging on.',
        jobJa: '測る1本。何を基準に見ているかを先に名指しする。',
        note: "The measuring one. It says: here is the axis I am judging this on. Cost, time, safety. It is the most useful of the five when I disagree with you, because half the time we agree on the facts and are only measuring on different axes.",
        demo: "In terms of safety, the old one was better.",
        saidSoFar: 7,
    },
];

/**
 * I think の代わりに撃つ5本。
 * **実測: I think は録音29レッスン・24,964語のうち60回。1回の25分で10回言った夜が2つある。**
 */
export const INSTEAD_OF_I_THINK: SpokenPick[] = [
    {
        en: "I'd say ~", ja: '〜だと思うな',
        job: 'The softest. The conditional does the hedging for you.',
        jobJa: '一番柔らかい。would が勝手にぼかしてくれるので、maybe を足さずに済む。',
        note: "The softest of the five. The conditional does the hedging for me, so I do not have to bolt maybe or probably onto the front of the sentence. I'd say it is closer to twenty. Still zero times as I'd say. On the one night I reached for it, it came out as I would say, four times.",
        demo: "I'd say it is closer to twenty than thirty.",
        saidSoFar: 0,
    },
    {
        en: "The way I see it, ~", ja: '俺の見方だと、',
        job: 'Flags the whole sentence as a view, and sounds arrived at.',
        jobJa: '文全体を「意見」だと宣言する。しかも考えた末に着いた感じが出る。',
        note: "Flags the whole sentence as a view rather than a fact, and it sounds like I arrived at it rather than felt it. That difference matters right before disagreeing with someone. Said it zero times in thirty-five lessons, then ten times in one night, because I announced it out loud before using it.",
        demo: "The way I see it, they were never going to finish on time.",
        saidSoFar: 10,
    },
    {
        en: "As far as I know, ~", ja: '俺の知る限りでは、',
        job: 'The only one that admits your information may be incomplete.',
        jobJa: '5本で唯一、自分の情報が欠けているかもしれないと先に言う形。',
        note: "The only one of the five that admits my information might be incomplete. It is not modesty, it is insurance: if I turn out to be wrong, I was already wrong out loud. Said it zero times so far, which is strange, because I am wrong constantly.",
        demo: "As far as I know, nothing has changed since last year.",
        saidSoFar: 0,
    },
    {
        en: "I bet ~", ja: '絶対〜だと思う',
        job: 'The only confident one. A prediction with a wager inside it.',
        jobJa: '5本で唯一の強気。中に賭けが入っているので、意見ではなく予測になる。',
        note: "The only confident one. There is a wager inside it, which turns an opinion into a prediction. I bet they cancel it. One of three on this list I have actually said: seven times now, four of them in one night.",
        demo: "I bet they cancel it before the end of the month.",
        saidSoFar: 7,
    },
    {
        en: "It seems like ~", ja: '〜っぽいね',
        job: 'Moves the source outside your head. You are reporting, not feeling.',
        jobJa: '判断の出どころを自分の外に置く。感じているのではなく、そう見えると報告する形。',
        note: "Moves the source outside my head. The evidence points that way; I am reporting rather than feeling. Useful when I do not want to own the claim yet. Said it zero times in thirty-five lessons, then five times in one night.",
        demo: "It seems like nobody told them.",
        saidSoFar: 5,
    },
];

/** I think の実測(2026-09-17 時点、lessons.ts の録音36レッスン) */
export const I_THINK_COUNT = { total: 86, lessons: 36, myWords: 41301, worstNight: 10 };

export interface Tail {
    engine: EngineId;
    /** そのまま文の後半に置ける節。主語は前文から引き継ぐ */
    en: string;
    ja: string;
    /** 名詞を1個入れる形。X にお題の名詞が入る */
    slot: string;
    slotJa: string;
    /** X を実際に埋めた見本 */
    demo: string;
    demoJa: string;
    /** 譲歩を1枚かぶせた形 */
    hedged: string;
    hedgedJa: string;
    job: string;
    jobJa: string;
}

export const TAILS: Tail[] = [
    // ---------------- LEFT HAND ----------------
    {
        engine: 'money', en: 'it comes at a price somebody has to pay', ja: '誰かが払う代償がついてくる',
        slot: 'X comes at a price somebody has to pay',
        slotJa: 'Xには誰かが払う代償がついてくる',
        demo: 'A four-day week comes at a price somebody has to pay.',
        demoJa: '週休3日には、誰かが払う代償がついてくる。',
        hedged: 'for all its obvious appeal, it comes at a price somebody has to pay',
        hedgedJa: '見た目の魅力は確かにあるが、誰かが払う代償がついてくる',
        job: 'Ends any cost claim without naming a figure you cannot support.',
        jobJa: '裏を取れない数字を出さずに、金の話を閉じられる。',
    },
    {
        engine: 'time', en: 'there is no getting those hours back', ja: 'その時間はもう戻らない',
        slot: 'whatever X achieves, there is no getting those hours back',
        slotJa: 'Xが何を達成しようと、その時間はもう戻らない',
        demo: 'Whatever the fifth day achieves, there is no getting those hours back.',
        demoJa: '5日目が何を達成しようと、その時間はもう戻らない。',
        hedged: 'whatever is gained in the process, there is no getting those hours back',
        hedgedJa: '途中で何を得ようと、その時間はもう戻らない',
        job: 'Closes a time argument on the one point nobody can dispute.',
        jobJa: '誰も反論できない一点で時間の話を閉じる。',
    },
    {
        engine: 'body', en: 'it takes its toll sooner or later', ja: '遅かれ早かれ体に響く',
        slot: 'X takes its toll sooner or later',
        slotJa: 'Xは遅かれ早かれ体に響く',
        demo: 'A six-day week takes its toll sooner or later.',
        demoJa: '週6日勤務は、遅かれ早かれ体に響く。',
        hedged: 'however well it is managed, it takes its toll sooner or later',
        hedgedJa: 'どれだけうまく管理しようと、遅かれ早かれ体に響く',
        job: 'Ends a health claim as a tendency, which is safer than a diagnosis.',
        jobJa: '断定ではなく傾向として体の話を閉じる。診断より安全。',
    },
    {
        engine: 'happiness', en: 'it is what makes the day worth having', ja: 'それがあるから一日に値打ちが出る',
        slot: 'X is what makes the day worth having',
        slotJa: 'Xがあるから一日に値打ちが出る',
        demo: 'An evening nobody has booked is what makes the day worth having.',
        demoJa: '誰にも押さえられていない夜があるから、一日に値打ちが出る。',
        hedged: 'measured against nothing on a spreadsheet, it is what makes the day worth having',
        hedgedJa: '表計算のどこにも出てこないが、それがあるから一日に値打ちが出る',
        job: 'Gives the soft reason a hard-sounding ending.',
        jobJa: '柔らかい理由に、硬い音の終わり方を与える。',
    },
    {
        engine: 'education', en: 'it fosters personal growth', ja: '人としての成長を育む',
        slot: 'X fosters personal growth',
        slotJa: 'Xは人としての成長を育む',
        demo: 'A year abroad fosters personal growth.',
        demoJa: '海外での1年は、人としての成長を育む。',
        hedged: 'despite some discouraging factors, it fosters personal growth',
        hedgedJa: 'いくつか気の滅入る要因はあるにせよ、人としての成長を育む',
        job: 'The most universal ending of all. Attaches to almost any prompt.',
        jobJa: '10本で一番どこにでも付く尻。ほぼどのお題にも刺さる。',
    },
    // ---------------- RIGHT HAND ----------------
    {
        engine: 'fairness', en: 'the burden falls on the people least able to carry it', ja: '負担は一番背負えない人に落ちる',
        slot: 'the burden of X falls on the people least able to carry it',
        slotJa: 'Xの負担は、一番背負えない人に落ちる',
        demo: 'The burden of a flat tax falls on the people least able to carry it.',
        demoJa: '一律課税の負担は、一番背負えない人に落ちる。',
        hedged: 'however even-handed the intention, the burden falls on the people least able to carry it',
        hedgedJa: 'どれだけ公平のつもりでも、負担は一番背負えない人に落ちる',
        job: 'Ends a fairness claim by naming a direction rather than a number.',
        jobJa: '数字ではなく向きを名指しして、公平の話を閉じる。',
    },
    {
        engine: 'freedom', en: 'that decision belongs to the person living with it', ja: 'その決定は、それを抱えて生きる本人のものだ',
        slot: 'the decision about X belongs to the person living with it',
        slotJa: 'Xについての決定は、それを抱えて生きる本人のものだ',
        demo: 'The decision about medical treatment belongs to the person living with it.',
        demoJa: '治療についての決定は、それを抱えて生きる本人のものだ。',
        hedged: 'whoever ends up paying for it, that decision belongs to the person living with it',
        hedgedJa: '最終的に誰が金を払うにせよ、その決定はそれを抱えて生きる本人のものだ',
        job: 'Ends a freedom claim without arguing about the outcome at all.',
        jobJa: '結果の是非に一切踏み込まずに自由の話を閉じる。',
    },
    {
        engine: 'trust', en: 'that is not the whole story', ja: 'それで話が全部ではない',
        slot: 'X is not the whole story',
        slotJa: 'Xで話が全部ではない',
        demo: 'The official statement is not the whole story.',
        demoJa: '公式発表で話が全部ではない。',
        hedged: 'accurate as far as it goes, that is not the whole story',
        hedgedJa: '言っている範囲では正確だが、それで話が全部ではない',
        job: 'Rejects the other side without calling anybody a liar.',
        jobJa: '相手を嘘つき扱いせずに反対側を退けられる。',
    },
    {
        engine: 'roots', en: 'it leaves a mark that outlasts us', ja: '私たちより長く残る跡が付く',
        slot: 'X leaves a mark that outlasts us',
        slotJa: 'Xは私たちより長く残る跡を付ける',
        demo: 'A language lost in one generation leaves a mark that outlasts us.',
        demoJa: '一世代で失われた言語は、私たちより長く残る跡を付ける。',
        hedged: 'invisible on any balance sheet, it leaves a mark that outlasts us',
        hedgedJa: 'どの決算書にも出てこないが、私たちより長く残る跡が付く',
        job: 'Ends a heritage claim on a long horizon, which is hard to argue with.',
        jobJa: '長い時間軸で受け継ぎの話を閉じる。反論しにくい。',
    },
    {
        engine: 'nature', en: 'there is no going back', ja: '元には戻らない',
        slot: 'once X is gone, there is no going back',
        slotJa: 'Xが失われたら、元には戻らない',
        demo: 'Once the last of a species is gone, there is no going back.',
        demoJa: 'ある種の最後の一頭が失われたら、元には戻らない。',
        hedged: 'whatever is agreed at the next summit, there is no going back',
        hedgedJa: '次の会議で何が合意されようと、元には戻らない',
        job: 'The hardest ending of the ten. Save it for the sentence that must land.',
        jobJa: '10本で一番強い尻。ここで決めるという文にだけ使う。',
    },
];

// ============================================================
// 組み立て
// ============================================================

/**
 * 蝶番の頭。topic は BRANCH に枝の名前が入る。
 * 枝が複数形のとき(Rules / Senses / Resources / Assets / Deadlines / Generations / Ecosystems)は、
 * 蝶番の中の動詞も複数に合わせる。As far as rules **go** / Where senses **are** concerned。
 * 合わせないと蝶番の側が壊れるので、ここは機械がやる。覚える側は名詞を入れるだけでいい。
 */
export function hingeHead(h: Hinge, b: Branch): string {
    if (h.kind === 'turn') return h.en;
    const name = h.en.startsWith('BRANCH')
        ? b.en.split(' ').join('-')          // 2語の枝は BRANCH-wise 用にハイフンで繋ぐ
        : (b.the ? 'the ' : '') + b.en.toLowerCase();
    let out = h.en.replace('BRANCH', name);
    if (isPluralBranch(b)) {
        out = out.replace(' goes,', ' go,').replace(' is concerned,', ' are concerned,');
    }
    return out;
}

/** 枝の名前が複数形か。蝶番の中の動詞を合わせるためだけに使う */
export function isPluralBranch(b: Branch): boolean {
    return /s$/i.test(b.en) && !/(ss|us)$/i.test(b.en);
}

/**
 * 蝶番 + 枝 = 中身のある1文。
 * topic の蝶番は頭で枝の名前を言ってしまうので、例文の主語がそのまま来ると二重になる
 * (Regarding debt, debt does not disappear ...)。
 * **文頭が「(a|an|the) 枝名 + 動詞」のときだけ**、その主語を it / they に潰す。
 * 直後が前置詞のとき(Peace of mind ...)は複合名詞の一部なので触らない。
 * 判定を緩めると主語でない場所まで切って文が壊れる(Deadlines work ... が「it is ready.」になった事故がある)。
 */
export function hingeLine(h: Hinge, b: Branch): string {
    let body = b.line;
    if (h.kind === 'topic') {
        const head = b.en.toLowerCase();
        const m = body.match(/^(?:A |An |The )?([A-Za-z-]+) ([A-Za-z]+)/);
        const VERB = /^(is|are|was|were|has|have|does|do|can|cannot|will|would|never|only|always|still|[a-z]+s)$/i;
        if (m && m[1].toLowerCase() === head && VERB.test(m[2])) {
            const plural = /^(are|were|have|do)$/i.test(m[2]) || (/s$/i.test(head) && !/(ss|us)$/i.test(head));
            body = (plural ? 'They ' : 'It ') + body.slice(m[0].length - m[2].length);
        }
    }
    return `${hingeHead(h, b)} ${body.charAt(0).toLowerCase()}${body.slice(1)}`;
}
/** 蝶番 + 締め = 主語を前文から引き継ぐ1文。詰まった時にこれで閉じる */
export function hingeTail(h: Hinge, b: Branch, t: Tail, hedged = false): string {
    return `${hingeHead(h, b)} ${hedged ? t.hedged : t.en}.`;
}

/**
 * 蝶番 + 締め + 名詞1個 = 中身のある1文。
 * 本番で考えるのはこの名詞だけ。文の形は締めが持っている。
 */
export function tailWithNoun(h: Hinge, b: Branch, t: Tail, noun: string): string {
    const filled = t.slot.replace('X', noun);
    return `${hingeHead(h, b)} ${filled.charAt(0).toLowerCase()}${filled.slice(1)}.`;
}

/** その蝶番で、指1本ぶん(枝5本)の中身のある文をまとめて作る */
export function hingeSet(h: Hinge, id: EngineId): { branch: Branch; line: string }[] {
    return ENGINE_BY_ID[id].branches.map((b) => ({ branch: b, line: hingeLine(h, b) }));
}

/**
 * その指の締め1本を、10本の蝶番すべてに掛けた中身ゼロの10文。
 * 締めは指に1本しかないので、変わるのは頭だけ。詰まった時に口から出る順に並べてある。
 */
export function tailSet(id: EngineId, hedged = false): { hinge: Hinge; line: string }[] {
    const tail = TAIL_BY_ENGINE[id];
    const branches = ENGINE_BY_ID[id].branches;
    return HINGES.map((h, i) => ({ hinge: h, line: hingeTail(h, branches[i % branches.length], tail, hedged) }));
}

export const TAIL_BY_ENGINE: Record<EngineId, Tail> =
    Object.fromEntries(TAILS.map((t) => [t.engine, t])) as Record<EngineId, Tail>;

/** 蝶番10 x 枝50。中身のある文が何通り立つか */
export const TOTAL_HINGE_LINES = HINGES.length * TOTAL_BRANCHES;

// ============================================================
// 網羅テスト -- 試験のお題だけでなく、ニュース・噂話・日常の愚痴まで
// 同じ10本で立つことの実証。すべて両手をまたいでいる。
// ============================================================

export type TopicKind = 'exam' | 'news' | 'gossip' | 'daily';

export const TOPIC_KINDS: { id: TopicKind; en: string; ja: string }[] = [
    { id: 'exam', en: 'EXAM PROMPTS', ja: '試験のお題' },
    { id: 'news', en: 'NEWS', ja: 'ニュース' },
    { id: 'gossip', en: 'GOSSIP', ja: '噂話' },
    { id: 'daily', en: 'EVERYDAY', ja: '日常の愚痴' },
];

export interface TopicTest {
    kind: TopicKind;
    topic: string;
    topicJa: string;
    engines: EngineId[];
}

export const TOPIC_TESTS: TopicTest[] = [
    { kind: 'exam', topic: "Should capital punishment be abolished?", topicJa: '死刑制度は廃止すべきか', engines: ['body', 'fairness', 'freedom'] },
    { kind: 'exam', topic: "Should public money be spent on preserving traditional culture?", topicJa: '伝統文化の保護に税金を使うべきか', engines: ['money', 'happiness', 'roots'] },
    { kind: 'exam', topic: "Is large-scale space exploration worth the money?", topicJa: '宇宙開発に巨額を投じる価値はあるか', engines: ['money', 'education', 'nature'] },
    { kind: 'exam', topic: "Should English be made an official second language?", topicJa: '英語を第二公用語にすべきか', engines: ['education', 'happiness', 'roots'] },
    { kind: 'exam', topic: "How far should genetic engineering be allowed to go?", topicJa: '遺伝子操作はどこまで許されるか', engines: ['body', 'freedom', 'nature'] },
    { kind: 'exam', topic: "Should developed countries accept more immigrants?", topicJa: '先進国は移民をもっと受け入れるべきか', engines: ['money', 'happiness', 'fairness'] },
    { kind: 'exam', topic: "Should countries continue to rely on nuclear power?", topicJa: '原子力発電に頼り続けるべきか', engines: ['body', 'trust', 'nature'] },
    { kind: 'exam', topic: "Should university education be free for everyone?", topicJa: '大学教育は無償化すべきか', engines: ['money', 'education', 'fairness'] },
    { kind: 'exam', topic: "Should social media be more strictly regulated?", topicJa: 'SNSは規制されるべきか', engines: ['body', 'trust', 'freedom'] },
    { kind: 'exam', topic: "Should remote work continue in the long term?", topicJa: '在宅勤務は今後も続けるべきか', engines: ['time', 'happiness', 'freedom'] },
    { kind: 'exam', topic: "Can animal testing ever be justified?", topicJa: '動物実験は正当化できるか', engines: ['body', 'happiness', 'trust'] },
    { kind: 'exam', topic: "Should mandatory retirement be abolished?", topicJa: '定年制は廃止すべきか', engines: ['education', 'happiness', 'fairness'] },
    { kind: 'exam', topic: "Does tourism benefit the communities that host it?", topicJa: '観光客の増加は地域にとって利益か', engines: ['money', 'roots', 'nature'] },
    { kind: 'exam', topic: "Should young children be given smartphones?", topicJa: '子どもにスマートフォンを持たせるべきか', engines: ['body', 'education', 'freedom'] },
    { kind: 'exam', topic: "Has globalization done more good than harm?", topicJa: 'グローバル化は世界に益をもたらしたか', engines: ['money', 'fairness', 'roots'] },
    { kind: 'exam', topic: "Should voting be made compulsory?", topicJa: '選挙の投票を義務化すべきか', engines: ['time', 'fairness', 'freedom'] },
    { kind: 'news', topic: "The new phone costs way too much.", topicJa: '新しいスマホが高すぎる', engines: ['money', 'fairness', 'nature'] },
    { kind: 'news', topic: "A big company covered up a data leak.", topicJa: '大企業がデータ流出を隠していた', engines: ['money', 'trust', 'freedom'] },
    { kind: 'news', topic: "The local shopping street is gone.", topicJa: '地元の商店街が消えた', engines: ['money', 'happiness', 'roots'] },
    { kind: 'news', topic: "Nothing about how we work is actually changing.", topicJa: '働き方改革が進まない', engines: ['time', 'happiness', 'freedom'] },
    { kind: 'news', topic: "The river near us smells terrible.", topicJa: '近所の川が臭い', engines: ['body', 'trust', 'nature'] },
    { kind: 'gossip', topic: "Apparently they were having an affair.", topicJa: 'あの人、不倫してたらしい', engines: ['money', 'trust', 'roots'] },
    { kind: 'gossip', topic: "My boss talks to people like they are garbage.", topicJa: '上司の言い方がきつい', engines: ['body', 'happiness', 'freedom'] },
    { kind: 'gossip', topic: "Everyone from my year got promoted except me.", topicJa: '同期だけ昇進した', engines: ['education', 'happiness', 'fairness'] },
    { kind: 'gossip', topic: "The staff at that place are rude to everyone.", topicJa: 'あの店の店員、態度が悪い', engines: ['time', 'happiness', 'trust'] },
    { kind: 'gossip', topic: "That family bought another new car.", topicJa: 'あの家、また車を買い替えてる', engines: ['money', 'fairness', 'nature'] },
    { kind: 'daily', topic: "That movie was two hours I want back.", topicJa: 'あの映画、金返せ', engines: ['money', 'time', 'trust'] },
    { kind: 'daily', topic: "I really do not want to go back to my parents' place.", topicJa: '実家に帰りたくない', engines: ['time', 'freedom', 'roots'] },
    { kind: 'daily', topic: "My kid will not go to school.", topicJa: '子どもが学校に行かない', engines: ['body', 'education', 'roots'] },
    { kind: 'daily', topic: "I never have time to get to the gym.", topicJa: 'ジムに行く時間がない', engines: ['body', 'time', 'roots'] },
    { kind: 'daily', topic: "They are charging for shopping bags again.", topicJa: 'またレジ袋が有料になった', engines: ['money', 'freedom', 'nature'] },
];

// ============================================================
// 模範解答の構造
// ============================================================

/** 文の役割。write-frames の7役と同じ語彙(譲歩は stance / close に畳んである) */
export type CoreRole = 'open' | 'stance' | 'reason' | 'why' | 'example' | 'close';

export const CORE_ROLES: { id: CoreRole; label: string; ja: string; note: string; color: string }[] = [
    { id: 'open', label: 'OPEN', ja: '導入', note: 'Restate the prompt without taking a side yet.', color: '#A8A29E' },
    { id: 'stance', label: 'STANCE', ja: '立場', note: 'Concede once, declare your side, announce how many reasons follow.', color: '#D4AF37' },
    { id: 'reason', label: 'REASON', ja: '理由', note: 'First / Second / Finally, plus the claim of one finger.', color: '#9A7B16' },
    { id: 'why', label: 'WHY', ja: '仕組み', note: 'The mechanism. Why that reason holds. The most reusable sentence in the essay.', color: '#78716C' },
    { id: 'example', label: 'EXAMPLE', ja: '実例', note: 'The only sentence you rebuild on the day. If it misses the prompt, the memorization shows.', color: '#10B981' },
    { id: 'close', label: 'CLOSE', ja: '結論', note: 'Concede once more, then name the three reasons as nouns and stop.', color: '#1C1917' },
];

export const ROLE_BY_ID: Record<CoreRole, (typeof CORE_ROLES)[number]> =
    Object.fromEntries(CORE_ROLES.map((r) => [r.id, r])) as Record<CoreRole, (typeof CORE_ROLES)[number]>;

export interface CoreLine {
    role: CoreRole;
    /** 完成文。frame に slots を代入した結果と完全一致すること */
    en: string;
    /** 完成文の訳(常体) */
    ja: string;
    /** 丸暗記する型。穴は大文字1字 X / Y / Z / W */
    frame: string;
    /** 型の意味。穴は X / Y のまま */
    frameJa: string;
    /** この解答で穴に入れた中身 */
    slots: Record<string, string>;
}

export interface ReasonBlock {
    engine: EngineId;
    /** 見出し(reason) → 仕組み(why) → 実例(example) の3文 */
    lines: CoreLine[];
}

// ============================================================
// 固定の枠 — 冒頭2文と結び2文。**お題が何であっても、この4文は動かさない**
// ============================================================
/**
 * 【なぜ固定するか】
 * 本論は指と枝で決まるのに、序論と結論だけ毎回ゼロから考えていた。
 * ここが一番配点の見えない場所で、一番時間を食う。**だから先に決めて、二度と考えない。**
 *
 * 【4文しかない。選ぶ場面は一度も無い】
 *   冒頭1 お題をそのまま名詞句にして、議論があることを言う
 *   冒頭2 相手側を1回認めてから、立場を言い切る。理由が三つあると宣言する
 *   結び1 相手側をもう一度認めてから、天秤を傾ける(穴なし)
 *   結び2 本論の指の名詞3つと、冒頭2文目の立場を写して閉じる(新しく書く語なし)
 *
 * 【should は枠ではなく穴の中に入れる】
 * 「導入すべきか」も「そうなるか」も、Y の中身が変わるだけで枠は同じである。
 *   Y = "should be made compulsory"   -> やるべきか
 *   Y = "will disappear within a generation" -> そうなるか
 *   Y = "benefits the communities that host it" -> そうと言えるか
 * **枠を2本に割る必要は無い。割った瞬間、本番で選ぶ手間が1回増える。**
 */
export interface EssayFrame {
    role: 'open' | 'stance' | 'close';
    /** 何をする1文か */
    job: string;
    jobJa: string;
    frame: string;
    frameJa: string;
    /** 穴に入れるもの */
    slotsJa: Record<string, string>;
    /** 埋めた見本(模範解答#1から) */
    demo: string;
}

export const ESSAY_FRAME: EssayFrame[] = [
    {
        role: 'open',
        job: 'Turn the prompt into a noun phrase and say that people are arguing about it.',
        jobJa: 'お題をそのまま名詞句にして、議論があることを言う。中身はまだ何も言わない。',
        frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
        frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
        slotsJa: {
            X: 'お題の主語。そのまま抜く',
            Y: '動詞句。should be ~ / will ~ / benefits ~ のどれでもよい。**ここが型の分岐を全部飲み込む**',
            Z: 'それを2〜3語で言い直したもの。such a change / that prediction / the expense / such a ban',
        },
        demo: "The idea that every full-time employee should get a four-day working week has attracted considerable attention, prompting debate over whether such a change is truly justified.",
    },
    {
        role: 'stance',
        job: 'Concede the other side once, then commit, and announce that there are three reasons.',
        jobJa: '相手側を1回認めてから立場を言い切り、理由が三つあると宣言する。ここで指を3本立てたことになる。',
        frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
        frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
        slotsJa: {
            X: '相手側の一番強い言い分を1節で。長くしない',
            Y: '自分の立場。it should be granted / it must be caged / it will happen',
        },
        demo: "Although the change would unsettle routines built over decades, I am firmly convinced that it should be granted, for three compelling reasons.",
    },
    {
        role: 'close',
        job: 'Concede the other side one last time, then tip the scales. No holes at all, so it works for any question and either side.',
        jobJa: '相手側をもう一度認めてから天秤を傾ける。**穴が1つも無い。**どのお題でも、賛成でも反対でも、1文字も変えずに書ける。outweigh はここで撃つ。',
        frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
        frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
        slotsJa: {},
        demo: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
    },
    {
        role: 'close',
        job: 'Repeat the three finger nouns from the body openers and the stance from the second sentence. Nothing new is written.',
        jobJa: '本論の頭で使った指の名詞3つと、冒頭2文目の立場をそのまま写す。**新しく書く語は1つも無い。**',
        frame: "Given X, Y and Z, I remain firmly convinced that W.",
        frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
        slotsJa: {
            X: '本論1の指の名詞(First, with reference to の後ろと同じ語)',
            Y: '本論2の指の名詞',
            Z: '本論3の指の名詞',
            W: '冒頭2文目の I am firmly convinced that の後ろを、そのまま写す',
        },
        demo: "Given time, happiness and fairness, I remain firmly convinced that it should be granted.",
    },
];


// ============================================================
// 本論の頭 — 3つの枠。**指の名詞を落とすだけ。ここも動かさない**
// ============================================================
/**
 * 【なぜここも固定するか】
 * 冒頭と結びを固定したのに、本論の入り口だけ毎回作っていた。
 * **3つとも「裸の名詞を取る前置詞句」なので、冠詞の判定が1回も起きない。**
 * 落とすのは指の slotNoun だけで、9本は裸、the environment だけ the が付く。
 * その the も固定なので、本番で決める場面は最後まで一度も来ない。
 *
 * 【順番も固定】
 * First / Second / Finally の順で、1本目・2本目・3本目の指を置く。
 * 冒頭の枠で「理由が三つある」と宣言しているので、数え上げの語は必ず要る。
 */
export const BODY_OPENERS: { n: 1 | 2 | 3; frame: string; frameJa: string; demo: string }[] = [
    { n: 1, frame: "First, with reference to W,", frameJa: "第一に、Wに関して言えば、", demo: "First, with reference to time," },
    { n: 2, frame: "Second, where W is concerned,", frameJa: "第二に、Wということで言えば、", demo: "Second, where happiness is concerned," },
    { n: 3, frame: "Finally, in the context of W,", frameJa: "最後に、Wの文脈では、", demo: "Finally, in the context of fairness," },
];

// ============================================================
// 3つの型 — お題の訊き方。**5つあったものを3つに落とした**
// ============================================================
/**
 * 【なぜ3つか】
 * 5つの型(DO IT / STOP IT / WORTH IT / HOW FAR / WILL IT)は、本番で
 * 「どれに当たるか」を判定する手間を1回増やしていた。**判定は本番で発生させない。**
 * 禁止は「否定を導入する」ことなので DO IT と STOP IT は同じ型に畳める。
 * 限度と予測も、どちらも「そうなのか」を問う型なので1つでよい。
 *
 * 【型が変えるのは冒頭の Y だけ】
 * 固定の枠(ESSAY_FRAME)は3つの型で共通である。型が決めるのは Y に入る動詞句の形だけで、
 * 序論も結論も1文字も変わらない。**だから型を間違えても答案は壊れない。**
 */
export type ShapeId = 1 | 2 | 3;

export const ESSAY_SHAPES: {
    id: ShapeId; en: string; ja: string;
    shape: string; shapeJa: string;
    yHint: string; yHintJa: string;
    fits: string[];
}[] = [
    {
        id: 1, en: 'DO IT', ja: 'やるか、やめるか',
        shape: "Should X be introduced, required, banned or abolished?",
        shapeJa: "Xを導入・義務化・禁止・廃止すべきか",
        yHint: "should be made compulsory / should be banned outright / should be free for everyone",
        yHintJa: "Y に should be ~ を入れる。禁止も廃止も、否定を導入するだけなので同じ型に入る。",
        fits: [
            "Should voting be made compulsory?",
            "Should English be made an official second language?",
            "Should university education be free for everyone?",
            "Should developed countries accept more immigrants?",
            "Should young children be given smartphones?",
            "Should public money be spent on preserving traditional culture?",
            "Should capital punishment be abolished?",
            "Should mandatory retirement be abolished?",
            "Should social media be more strictly regulated?",
        ],
    },
    {
        id: 2, en: 'WORTH IT', ja: '割に合うか',
        shape: "Is X worth the cost? Does X do more good than harm?",
        shapeJa: "Xは費用に見合うか。益が害を上回るか",
        yHint: "is worth the money / benefits the communities that host it / has done more good than harm",
        yHintJa: "Y に現在形の動詞句を入れる。天秤の話なので、結び1の outweigh がそのまま主役になる。",
        fits: [
            "Is large-scale space exploration worth the money?",
            "Does tourism benefit the communities that host it?",
            "Has globalization done more good than harm?",
        ],
    },
    {
        id: 3, en: 'IS IT SO', ja: 'そうなのか、どこまでか',
        shape: "Can X be justified? How far should X go? Will X last?",
        shapeJa: "Xは正当化できるか。どこまで許されるか。続くのか",
        yHint: "can ever be justified / should be allowed to go that far / will disappear within a generation",
        yHintJa: "Y に can / will を入れる。限度の話も予測の話も、訊いていることは「そうなのか」で同じである。",
        fits: [
            "Can animal testing ever be justified?",
            "How far should genetic engineering be allowed to go?",
            "Should countries continue to rely on nuclear power?",
            "Should remote work continue in the long term?",
        ],
    },
];

export const SHAPE_BY_ID: Record<ShapeId, (typeof ESSAY_SHAPES)[number]> =
    Object.fromEntries(ESSAY_SHAPES.map((s) => [s.id, s])) as Record<ShapeId, (typeof ESSAY_SHAPES)[number]>;

export interface CoreEssay {
    id: number;
    theme: string;      // この解答の見出し
    themeJa: string;
    shapeId: ShapeId;   // 3つの型のどれに属するか。お題の割り振りは ESSAY_SHAPES 側が持つ
    topic: string;      // お題(オリジナル)
    topicJa: string;
    stance: string;     // とる立場
    stanceJa: string;
    intro: CoreLine[];  // open + stance
    blocks: ReasonBlock[]; // 3ブロック。エンジンは重複しない
    close: CoreLine[];  // 譲歩再確認 + 三本締め
}

// ============================================================
// 模範解答 5本 -- お題の「形」5つ × 3エンジン = 15枠で10本全部を通す
//
// テーマ(国際/社会/科技…)で分けない。分けるのは「お題がどう訊いてくるか」。
// 試験のお題16件は、下の5つの形のどれかに必ず落ちる(verify の fits 検査)。
//
//   #1 DO IT     Should X be introduced / required / given?   -> やる
//   #2 STOP IT   Should X be abolished / banned / regulated?   -> やめる
//   #3 WORTH IT  Is X worth it? Does X do more good than harm? -> 割に合う
//   #4 HOW FAR   Can X be justified? How far should X go?      -> 限度つきで許す
//   #5 WILL IT   Will X happen? Should X continue?             -> そうなる
//
// 本番: お題を読む -> 5つのうちどの形か決める -> その骨をそのまま使う
//       -> 指を3本引く -> 名詞を差し替える。骨は形ごとに固定なので迷わない。
//
// 【水準】丸暗記する文なので、/english/write の30本(英検1級の模範解答)と同じ語彙・構文で書く。
// 表現マスター(write-eiken1-toolkit)の型と格上げ語彙が各解答に一定数入っていることを verify が検査する。
// ============================================================

export const CORE_ESSAYS: CoreEssay[] = [
    // ---------------------------------------------------------------- 1 DO IT
    {
        id: 1, theme: 'DO IT', themeJa: 'やるか、やめるか', shapeId: 1,
        topic: "Should every full-time employee be entitled to a four-day working week?",
        topicJa: "すべてのフルタイム労働者に週休3日の権利を与えるべきか",
        stance: "Yes -- time, wellbeing, and fairness all point the same way",
        stanceJa: "与えるべき。時間・幸福・公平、どれも同じ方向を指す",
        intro: [
            {
                role: 'open',
                en: "The idea that every full-time employee should get a four-day working week has attracted considerable attention, prompting debate over whether such a change is truly justified.",
                ja: "すべてのフルタイム労働者に週休3日の権利を与えるべきだという考えは、かなりの注目を集めており、その変更が本当に正当化できるのかという議論を呼んでいる。",
                frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
                frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
                slots: { X: "every full-time employee", Y: "should get a four-day working week", Z: "such a change" },
            },
            {
                role: 'stance',
                en: "Although the change would unsettle routines built over decades, I am firmly convinced that it should be granted, for three compelling reasons.",
                ja: "その変更が、何十年もかけて固まった習慣を揺さぶるのは確かでも、認めるべきだと固く確信している。説得力のある理由が三つある。",
                frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
                frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
                slots: { X: "the change would unsettle routines built over decades", Y: "it should be granted" },
            },
        ],
        blocks: [
            {
                engine: 'time',
                lines: [
                    {
                        role: 'reason',
                        en: "First, with reference to time, a shorter week gives back what employment has absorbed.",
                        ja: "第一に、時間に関して言えば、短い週は、雇用が吸い上げてきたものを返す。",
                        frame: "First, with reference to W, X gives back what Y has absorbed.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "time", X: "a shorter week", Y: "employment" },
                    },
                    {
                        role: 'why',
                        en: "Time not consumed by commuting and idle office hours does not simply vanish; it is redirected toward family, recovery, and further learning.",
                        ja: "通勤と無為な在席に費やされなかった時間はただ消えるのではなく、家族、回復、さらなる学びへと振り向けられる。",
                        frame: "X not consumed by Y does not simply vanish; it is redirected toward Z.",
                        frameJa: "Yに費やされなかったXはただ消えるのではなく、Zへと振り向けられる。",
                        slots: { X: "Time", Y: "commuting and idle office hours", Z: "family, recovery, and further learning" },
                    },
                    {
                        role: 'example',
                        en: "A case in point is the growing number of firms that have trialed a four-day week and reported identical output in fewer hours.",
                        ja: "その好例が、週休3日を試行し、同じ成果をより短い時間で達成したと報告する企業が増えていることだ。",
                        frame: "A case in point is the growing number of X that have trialed Y and reported Z.",
                        frameJa: "その好例が、Yを試行しZと報告するXが増えていることだ。",
                        slots: { X: "firms", Y: "a four-day week", Z: "identical output in fewer hours" },
                    },
                ],
            },
            {
                engine: 'happiness',
                lines: [
                    {
                        role: 'reason',
                        en: "Second, where happiness is concerned, a life of only work erodes wellbeing.",
                        ja: "第二に、幸福ということで言えば、仕事だけの人生は幸福を蝕む。",
                        frame: "Second, where W is concerned, a life of only X erodes wellbeing.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "happiness", X: "work" },
                    },
                    {
                        role: 'why',
                        en: "Genuine satisfaction resides in the hours people govern themselves, and a fifth working day removes precisely those hours.",
                        ja: "本当の満足は人が自分で采配する時間の中にあり、5日目の労働日はまさにその時間を取り去る。",
                        frame: "X resides in the hours people govern themselves, and Y removes precisely those hours.",
                        frameJa: "Xは人が自分で采配する時間の中にあり、Yはまさにその時間を取り去る。",
                        slots: { X: "Genuine satisfaction", Y: "a fifth working day" },
                    },
                    {
                        role: 'example',
                        en: "Consequently, the nations with the shortest working weeks consistently rank highest in international surveys of life satisfaction.",
                        ja: "その結果、労働時間が最も短い国々は、人生の満足度に関する国際調査で一貫して上位に位置している。",
                        frame: "Consequently, the X with the shortest Y consistently rank highest in international surveys of Z.",
                        frameJa: "その結果、Yが最も短いXは、Zに関する国際調査で一貫して上位に位置している。",
                        slots: { X: "nations", Y: "working weeks", Z: "life satisfaction" },
                    },
                ],
            },
            {
                engine: 'fairness',
                lines: [
                    {
                        role: 'reason',
                        en: "Finally, in the context of fairness, rising productivity has never reached those who create it.",
                        ja: "最後に、公平の文脈では、上がり続ける生産性は、それを生んだ者のところへ一度も届いていない。",
                        frame: "Finally, in the context of W, rising X has never reached those who Y.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "fairness", X: "productivity", Y: "create it" },
                    },
                    {
                        role: 'why',
                        en: "Automation and software now perform much of the labor that once filled a week, yet working hours have remained virtually unchanged.",
                        ja: "自動化とソフトウェアが、かつて1週間を埋めていた労働の多くを担うようになったのに、労働時間は事実上変わっていない。",
                        frame: "X now perform much of the labor that once filled Y, yet Z have remained virtually unchanged.",
                        frameJa: "XがかつてYを埋めていた労働の多くを担うようになったのに、Zは事実上変わっていない。",
                        slots: { X: "Automation and software", Y: "a week", Z: "working hours" },
                    },
                    {
                        role: 'example',
                        en: "The average worker today produces roughly twice as much as a worker did in the 1970s, yet still labors for the same forty hours.",
                        ja: "今日の平均的な労働者は1970年代の労働者のおよそ2倍を生産しているのに、今も同じ40時間働いている。",
                        frame: "X today produces roughly twice as much as Y did in Z, yet still W.",
                        frameJa: "今日のXはZのYのおよそ2倍を生産しているのに、今もWしている。",
                        slots: { X: "The average worker", Y: "a worker", Z: "the 1970s", W: "labors for the same forty hours" },
                    },
                ],
            },
        ],
        close: [
            {
                role: 'close',
                en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                ja: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                slots: {},
            },
            {
                role: 'close',
                en: "Given time, happiness and fairness, I remain firmly convinced that it should be granted.",
                ja: "時間、幸福、公平を踏まえると、認めるべきだという確信は変わらない。",
                frame: "Given X, Y and Z, I remain firmly convinced that W.",
                frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
                slots: { X: "time", Y: "happiness", Z: "fairness", W: "it should be granted" },
            },
        ],
    },

    // ---------------------------------------------------------------- 2 STOP IT
    {
        id: 2, theme: 'DO IT', themeJa: 'やるか、やめるか', shapeId: 1,
        topic: "Should single-use plastic packaging be banned?",
        topicJa: "使い捨てのプラスチック包装は禁止すべきか",
        stance: "Yes -- it enters the body, strains public budgets, and never leaves nature",
        stanceJa: "禁止すべき。体に入り、公的予算を圧迫し、自然から消えない",
        intro: [
            {
                role: 'open',
                en: "The idea that single-use plastic packaging should be banned outright has attracted considerable attention, prompting debate over whether a ban is truly justified.",
                ja: "使い捨てプラスチック包装を全面的に禁止すべきだという考えは、かなりの注目を集めており、その禁止が本当に正当化できるのかという議論を呼んでいる。",
                frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
                frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
                slots: { X: "single-use plastic packaging", Y: "should be banned outright", Z: "a ban" },
            },
            {
                role: 'stance',
                en: "Although the ban would raise prices for shoppers overnight, I am firmly convinced that it should be introduced, for three compelling reasons.",
                ja: "その禁止が一夜にして買い物客の値段を上げるとしても、導入すべきだと固く確信している。説得力のある理由が三つある。",
                frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
                frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
                slots: { X: "the ban would raise prices for shoppers overnight", Y: "it should be introduced" },
            },
        ],
        blocks: [
            {
                engine: 'body',
                lines: [
                    {
                        role: 'reason',
                        en: "First, with reference to health, plastic finds its way into the body.",
                        ja: "第一に、健康に関して言えば、プラスチックは体の中まで入り込む。",
                        frame: "First, with reference to W, X finds its way into the Y.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "health", X: "plastic", Y: "body" },
                    },
                    {
                        role: 'why',
                        en: "Packaging degrades into particles minute enough to pass through food, water, and air, and the body possesses no mechanism for expelling them.",
                        ja: "包装は食品・水・空気を通り抜けるほど微細な粒子に分解され、体にはそれを排出する仕組みがない。",
                        frame: "X degrades into Y minute enough to pass through Z, and the body possesses no mechanism for expelling them.",
                        frameJa: "XはZを通り抜けるほど微細なYに分解され、体にはそれを排出する仕組みがない。",
                        slots: { X: "Packaging", Y: "particles", Z: "food, water, and air" },
                    },
                    {
                        role: 'example',
                        en: "For instance, microplastics have now been detected in human blood and even in the placentas of unborn children.",
                        ja: "たとえばマイクロプラスチックは今や、人間の血液、さらには胎児の胎盤からも検出されている。",
                        frame: "For instance, X have now been detected in Y.",
                        frameJa: "たとえばXは今やYから検出されている。",
                        slots: { X: "microplastics", Y: "human blood and even in the placentas of unborn children" },
                    },
                ],
            },
            {
                engine: 'money',
                lines: [
                    {
                        role: 'reason',
                        en: "Second, where money is concerned, the cost falls on taxpayers, not on the companies that profit.",
                        ja: "第二に、金ということで言えば、その費用は納税者にかかり、利益を得ている企業にはかからない。",
                        frame: "Second, where W is concerned, the cost falls on X, not on the Y that profit.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "money", X: "taxpayers", Y: "companies" },
                    },
                    {
                        role: 'why',
                        en: "Collecting, sorting, incinerating, and burying waste places enormous strain on public budgets, whereas the saving from cheap packaging translates directly into private profit.",
                        ja: "ごみの回収・分別・焼却・埋め立ては公的予算に多大な負担をかける一方、安価な包装による節約はそのまま私企業の利益になる。",
                        frame: "X places enormous strain on public budgets, whereas the saving from Y translates directly into private profit.",
                        frameJa: "Xは公的予算に多大な負担をかける一方、Yによる節約はそのまま私企業の利益になる。",
                        slots: { X: "Collecting, sorting, incinerating, and burying waste", Y: "cheap packaging" },
                    },
                    {
                        role: 'example',
                        en: "Local governments in Japan spend billions of yen annually on waste disposal, and packaging constitutes the largest share of that volume.",
                        ja: "日本の自治体は毎年ごみ処理に何十億円も費やしており、その量の最大の割合を占めるのが包装だ。",
                        frame: "X spend Y annually on Z, and W constitutes the largest share of that volume.",
                        frameJa: "Xは毎年ZにYを費やしており、その量の最大の割合を占めるのがWだ。",
                        slots: { X: "Local governments in Japan", Y: "billions of yen", Z: "waste disposal", W: "packaging" },
                    },
                ],
            },
            {
                engine: 'nature',
                lines: [
                    {
                        role: 'reason',
                        en: "Finally, in the context of the environment, plastic never disappears; it relocates.",
                        ja: "最後に、環境の文脈では、プラスチックは消えない。場所を移すだけである。",
                        frame: "Finally, in the context of W, X never disappears; it relocates.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "the environment", X: "plastic" },
                    },
                    {
                        role: 'why',
                        en: "A wrapper used for five minutes persists for centuries, drifting from landfill to river to ocean and back onto the very beaches we swim from.",
                        ja: "5分使われた包み紙が何世紀も残り、埋立地から川へ、海へと漂い、私たちが泳ぐまさにその浜に戻ってくる。",
                        frame: "X used for Y persists for Z, drifting from landfill to river to ocean and back onto the very beaches we swim from.",
                        frameJa: "Yだけ使われたXがZも残り、埋立地から川へ、海へと漂い、私たちが泳ぐまさにその浜に戻ってくる。",
                        slots: { X: "A wrapper", Y: "five minutes", Z: "centuries" },
                    },
                    {
                        role: 'example',
                        en: "Consequently, seabirds and turtles are now routinely discovered dead with stomachs full of bags and bottle caps.",
                        ja: "その結果、海鳥やウミガメは今や、袋やボトルキャップで胃を満たしたまま死んでいるのが日常的に発見される。",
                        frame: "Consequently, X are now routinely discovered dead with Y.",
                        frameJa: "その結果、Xは今や、Yのまま死んでいるのが日常的に発見される。",
                        slots: { X: "seabirds and turtles", Y: "stomachs full of bags and bottle caps" },
                    },
                ],
            },
        ],
        close: [
            {
                role: 'close',
                en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                ja: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                slots: {},
            },
            {
                role: 'close',
                en: "Given health, money and the environment, I remain firmly convinced that it should be introduced.",
                ja: "健康、金、環境を踏まえると、導入すべきだという確信は変わらない。",
                frame: "Given X, Y and Z, I remain firmly convinced that W.",
                frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
                slots: { X: "health", Y: "money", Z: "the environment", W: "it should be introduced" },
            },
        ],
    },

    // ---------------------------------------------------------------- 3 WORTH IT
    {
        id: 3, theme: 'WORTH IT', themeJa: '割に合うか', shapeId: 2,
        topic: "Is studying abroad worth the cost for young people?",
        topicJa: "若者にとって留学は費用に見合うか",
        stance: "Yes -- the price is high, but the returns in earnings, learning, and roots are higher",
        stanceJa: "見合う。値段は高いが、収入・学び・根っこの見返りはもっと高い",
        intro: [
            {
                role: 'open',
                en: "The idea that young people should be encouraged to study abroad has attracted considerable attention, prompting debate over whether the expense is truly justified.",
                ja: "若者に留学を勧めるべきだという考えは、かなりの注目を集めており、その費用が本当に正当化できるのかという議論を呼んでいる。",
                frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
                frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
                slots: { X: "young people", Y: "should be encouraged to study abroad", Z: "the expense" },
            },
            {
                role: 'stance',
                en: "Although the price is high and the first months are hard, I am firmly convinced that it is worth every yen, for three compelling reasons.",
                ja: "費用は高く、最初の数か月は苦しいが、払うだけの価値があると固く確信している。説得力のある理由が三つある。",
                frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
                frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
                slots: { X: "the price is high and the first months are hard", Y: "it is worth every yen" },
            },
        ],
        blocks: [
            {
                engine: 'money',
                lines: [
                    {
                        role: 'reason',
                        en: "First, with reference to money, the sum invested is recovered with interest over a career.",
                        ja: "第一に、金に関して言えば、投じた額は、職業人生のあいだに利子つきで戻ってくる。",
                        frame: "First, with reference to W, the sum invested is recovered with interest over X.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "money", X: "a career" },
                    },
                    {
                        role: 'why',
                        en: "From a long-term perspective, a second language and a foreign qualification open doors to employers who pay considerably more, and the gap compounds annually.",
                        ja: "長期的に見れば、第二言語と海外の資格は、格段に高く払う雇用主への扉を開き、その差は年々複利で広がる。",
                        frame: "From a long-term perspective, X open doors to Y who pay considerably more, and the gap compounds annually.",
                        frameJa: "長期的に見れば、Xは、格段に高く払うYへの扉を開き、その差は年々複利で広がる。",
                        slots: { X: "a second language and a foreign qualification", Y: "employers" },
                    },
                    {
                        role: 'example',
                        en: "Graduates who spent a year overseas command noticeably higher starting salaries than classmates who remained at home.",
                        ja: "海外で1年過ごした卒業生は、国内に残った同級生より目に見えて高い初任給を得ている。",
                        frame: "X who Y command noticeably higher starting salaries than Z.",
                        frameJa: "YしたXは、Zより目に見えて高い初任給を得ている。",
                        slots: { X: "Graduates", Y: "spent a year overseas", Z: "classmates who remained at home" },
                    },
                ],
            },
            {
                engine: 'education',
                lines: [
                    {
                        role: 'reason',
                        en: "Second, where education is concerned, nothing accelerates learning like being forced to use it.",
                        ja: "第二に、教育ということで言えば、使わざるを得ない状況ほど学習を速めるものはない。",
                        frame: "Second, where W is concerned, nothing accelerates learning like being forced to X.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "education", X: "use it" },
                    },
                    {
                        role: 'why',
                        en: "In a classroom an error costs a mark; in a foreign supermarket it costs one's dinner, and that is a lesson nobody forgets.",
                        ja: "教室での誤りは点を失うだけだが、外国のスーパーでの誤りは夕飯を失う。それは誰も忘れない教訓だ。",
                        frame: "In X an error costs Y; in Z it costs W, and that is a lesson nobody forgets.",
                        frameJa: "Xでの誤りはYを失うだけだが、Zでの誤りはWを失う。それは誰も忘れない教訓だ。",
                        slots: { X: "a classroom", Y: "a mark", Z: "a foreign supermarket", W: "one's dinner" },
                    },
                    {
                        role: 'example',
                        en: "As a result, students routinely make greater progress in a single semester abroad than in six years of grammar instruction at home.",
                        ja: "その結果、学生はたいてい、国内での6年間の文法指導より、海外の1学期で大きく伸びる。",
                        frame: "As a result, X routinely make greater progress in Y than in Z.",
                        frameJa: "その結果、Xはたいてい、ZよりYで大きく伸びる。",
                        slots: { X: "students", Y: "a single semester abroad", Z: "six years of grammar instruction at home" },
                    },
                ],
            },
            {
                engine: 'roots',
                lines: [
                    {
                        role: 'reason',
                        en: "Finally, in the context of roots, leaving home is the surest way to understand it.",
                        ja: "最後に、根の文脈では、故郷を離れることが、それを理解する一番確かな方法である。",
                        frame: "Finally, in the context of W, leaving X is the surest way to understand it.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "roots", X: "home" },
                    },
                    {
                        role: 'why',
                        en: "Customs that seemed universal are revealed as local the moment somebody else observes them differently.",
                        ja: "普遍だと思っていた習慣は、他の誰かが違うやり方で守っている瞬間に、土地のものだったと明らかになる。",
                        frame: "X that seemed universal are revealed as local the moment somebody else observes them differently.",
                        frameJa: "普遍だと思っていたXは、他の誰かが違うやり方で守っている瞬間に、土地のものだったと明らかになる。",
                        slots: { X: "Customs" },
                    },
                    {
                        role: 'example',
                        en: "Many returning students remark that they came to value their own festivals and cuisine only after a year without them.",
                        ja: "帰国した学生の多くが、自分の祭りや料理の価値は、それらの無い1年を経て初めてわかったと語る。",
                        frame: "Many X remark that they came to value Y only after Z.",
                        frameJa: "多くのXが、Yの価値はZを経て初めてわかったと語る。",
                        slots: { X: "returning students", Y: "their own festivals and cuisine", Z: "a year without them" },
                    },
                ],
            },
        ],
        close: [
            {
                role: 'close',
                en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                ja: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                slots: {},
            },
            {
                role: 'close',
                en: "Given money, education and roots, I remain firmly convinced that it is worth every yen.",
                ja: "金、教育、根を踏まえると、払うだけの価値があるという確信は変わらない。",
                frame: "Given X, Y and Z, I remain firmly convinced that W.",
                frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
                slots: { X: "money", Y: "education", Z: "roots", W: "it is worth every yen" },
            },
        ],
    },

    // ---------------------------------------------------------------- 4 HOW FAR
    {
        id: 4, theme: 'IS IT SO', themeJa: 'そうなのか、どこまでか', shapeId: 3,
        topic: "Can governments ever be justified in monitoring private communications?",
        topicJa: "政府が私的な通信を監視することは正当化できるか",
        stance: "Only within strict limits -- it can save lives, but unchecked it erodes freedom and trust",
        stanceJa: "厳格な限度の内側でだけ。命は救えるが、野放しにすると自由と信頼を蝕む",
        intro: [
            {
                role: 'open',
                en: "The idea that governments should monitor private communications has attracted considerable attention, prompting debate over whether such surveillance is truly justified.",
                ja: "政府が私的な通信を監視すべきだという考えは、かなりの注目を集めており、その監視が本当に正当化できるのかという議論を呼んでいる。",
                frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
                frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
                slots: { X: "governments", Y: "should monitor private communications", Z: "such surveillance" },
            },
            {
                role: 'stance',
                en: "Although the practice can genuinely save lives, I am firmly convinced that it must be confined within strict limits, for three compelling reasons.",
                ja: "その手段が実際に命を救いうるのは確かだが、厳しい枠の中に閉じ込めるべきだと固く確信している。説得力のある理由が三つある。",
                frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
                frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
                slots: { X: "the practice can genuinely save lives", Y: "it must be confined within strict limits" },
            },
        ],
        blocks: [
            {
                engine: 'body',
                lines: [
                    {
                        role: 'reason',
                        en: "First, with reference to health, one intercepted message can save many lives.",
                        ja: "第一に、健康に関して言えば、傍受した1通が多くの命を救うことがある。",
                        frame: "First, with reference to W, one intercepted X can save many lives.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "health", X: "message" },
                    },
                    {
                        role: 'why',
                        en: "A bombing or a kidnapping is planned in words long before it unfolds in the street, and those words are the only warning anyone receives.",
                        ja: "爆破も誘拐も、路上で展開するはるか前に言葉の中で計画される。その言葉が、誰かが受け取る唯一の警告だ。",
                        frame: "X is planned in words long before it unfolds in the street, and those words are the only warning anyone receives.",
                        frameJa: "Xは路上で展開するはるか前に言葉の中で計画される。その言葉が、誰かが受け取る唯一の警告だ。",
                        slots: { X: "A bombing or a kidnapping" },
                    },
                    {
                        role: 'example',
                        en: "For instance, several attacks on public transport have been thwarted because a court authorized police to read one suspect's messages in time.",
                        ja: "たとえば公共交通への襲撃のいくつかは、裁判所が警察に容疑者1人のメッセージを読む権限を間に合う時点で与えたために阻止された。",
                        frame: "For instance, several X have been thwarted because a court authorized Y to Z in time.",
                        frameJa: "たとえばいくつかのXは、裁判所がYにZ権限を間に合う時点で与えたために阻止された。",
                        slots: { X: "attacks on public transport", Y: "police", Z: "read one suspect's messages" },
                    },
                ],
            },
            {
                engine: 'freedom',
                lines: [
                    {
                        role: 'reason',
                        en: "Second, where freedom is concerned, monitoring erodes what it claims to protect.",
                        ja: "第二に、自由ということで言えば、監視は自分が守ると称しているものを蝕む。",
                        frame: "Second, where W is concerned, X erodes what it claims to protect.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "freedom", X: "monitoring" },
                    },
                    {
                        role: 'why',
                        en: "Citizens who suspect they are being read cease to voice what they think; consequently, a nation in which nobody speaks freely cannot correct its own errors.",
                        ja: "読まれていると疑う市民は思ったことを口にしなくなる。その結果、誰も自由に話さない国は自らの誤りを正せない。",
                        frame: "Citizens who suspect X cease to Y; consequently, a nation in which nobody Z cannot correct its own errors.",
                        frameJa: "Xと疑う市民はYしなくなる。その結果、誰もZない国は自らの誤りを正せない。",
                        slots: { X: "they are being read", Y: "voice what they think", Z: "speaks freely" },
                    },
                    {
                        role: 'example',
                        en: "Journalists in countries under blanket surveillance now avoid telephones altogether and meet their sources in person.",
                        ja: "全面監視下の国のジャーナリストは今や電話を一切避け、情報源と直接会っている。",
                        frame: "X in countries under Y now avoid Z altogether and W.",
                        frameJa: "Yの下にある国のXは今やZを一切避け、Wている。",
                        slots: { X: "Journalists", Y: "blanket surveillance", Z: "telephones", W: "meet their sources in person" },
                    },
                ],
            },
            {
                engine: 'trust',
                lines: [
                    {
                        role: 'reason',
                        en: "Finally, in the context of trust, unwatched power is always used beyond what was granted.",
                        ja: "最後に、信頼の文脈では、誰も見ていない権力は、必ず与えられた範囲を超えて使われる。",
                        frame: "Finally, in the context of W, unwatched power is always used beyond what was granted.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "trust" },
                    },
                    {
                        role: 'why',
                        en: "An instrument built to catch terrorists inevitably drifts toward protesters, then tax evaders, then anyone the government finds inconvenient.",
                        ja: "テロリストを捕らえるために作られた道具は、必然的に抗議者へ、脱税者へ、そして政府にとって都合の悪い誰へでも流れていく。",
                        frame: "An instrument built to catch X inevitably drifts toward Y, then Z, then anyone the government finds inconvenient.",
                        frameJa: "Xを捕らえるために作られた道具は、必然的にYへ、Zへ、そして政府にとって都合の悪い誰へでも流れていく。",
                        slots: { X: "terrorists", Y: "protesters", Z: "tax evaders" },
                    },
                    {
                        role: 'example',
                        en: "Programs launched in the wake of major attacks have repeatedly been found, years later, to have logged the calls of ordinary citizens.",
                        ja: "大規模な攻撃を受けて始まった計画は、何年も経ってから、一般市民の通話を記録していたと繰り返し判明している。",
                        frame: "X launched in the wake of Y have repeatedly been found, years later, to have Z.",
                        frameJa: "Yを受けて始まったXは、何年も経ってからZていたと繰り返し判明している。",
                        slots: { X: "Programs", Y: "major attacks", Z: "logged the calls of ordinary citizens" },
                    },
                ],
            },
        ],
        close: [
            {
                role: 'close',
                en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                ja: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                slots: {},
            },
            {
                role: 'close',
                en: "Given health, freedom and trust, I remain firmly convinced that it must be confined within strict limits.",
                ja: "健康、自由、信頼を踏まえると、厳しい枠の中に閉じ込めるべきだという確信は変わらない。",
                frame: "Given X, Y and Z, I remain firmly convinced that W.",
                frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
                slots: { X: "health", Y: "freedom", Z: "trust", W: "it must be confined within strict limits" },
            },
        ],
    },

    // ---------------------------------------------------------------- 5 WILL IT
    {
        id: 5, theme: 'IS IT SO', themeJa: 'そうなのか、どこまでか', shapeId: 3,
        topic: "Will cash disappear within a generation?",
        topicJa: "現金は一世代のうちに消えるか",
        stance: "Yes -- cost, speed, and trust are all pushing the same way",
        stanceJa: "消える。費用・速さ・信頼、すべてが同じ方向に押している",
        intro: [
            {
                role: 'open',
                en: "The idea that cash will disappear within a generation has attracted considerable attention, prompting debate over whether that prediction is truly justified.",
                ja: "現金が一世代のうちに消えるという考えは、かなりの注目を集めており、その予測が本当に正当化できるのかという議論を呼んでいる。",
                frame: "The idea that X Y has attracted considerable attention, prompting debate over whether Z is truly justified.",
                frameJa: "XがYという考えは、かなりの注目を集めており、Zが本当に正当化できるのかという議論を呼んでいる。",
                slots: { X: "cash", Y: "will disappear within a generation", Z: "that prediction" },
            },
            {
                role: 'stance',
                en: "Although the change will not happen overnight, I am firmly convinced that it will happen, for three compelling reasons.",
                ja: "その変化が一夜にして起きることはないが、いずれ起きると固く確信している。説得力のある理由が三つある。",
                frame: "Although X, I am firmly convinced that Y, for three compelling reasons.",
                frameJa: "Xではあるが、Yと固く確信している。説得力のある理由が三つある。",
                slots: { X: "the change will not happen overnight", Y: "it will happen" },
            },
        ],
        blocks: [
            {
                engine: 'money',
                lines: [
                    {
                        role: 'reason',
                        en: "First, with reference to money, cash is the most expensive form to maintain.",
                        ja: "第一に、金に関して言えば、現金は維持に最も費用のかかる形である。",
                        frame: "First, with reference to W, X is the most expensive form to maintain.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "money", X: "cash" },
                    },
                    {
                        role: 'why',
                        en: "Every note must be printed, counted, guarded, transported, and replaced, and each stage carries a cost that a digital transfer simply does not.",
                        ja: "紙幣は1枚ずつ印刷され、数えられ、守られ、運ばれ、交換される。その各段階に、デジタル送金にはまったく無い費用がかかる。",
                        frame: "Every X must be Y, and each stage carries a cost that Z simply does not.",
                        frameJa: "XはひとつずつYされ、その各段階にZにはまったく無い費用がかかる。",
                        slots: { X: "note", Y: "printed, counted, guarded, transported, and replaced", Z: "a digital transfer" },
                    },
                    {
                        role: 'example',
                        en: "For instance, banks and retailers in many countries now impose fees for handling coins, a clear indication of where the cost truly lies.",
                        ja: "たとえば多くの国で銀行も小売店も硬貨の取り扱いに手数料を課すようになった。費用が本当はどこにあるかの明白な印だ。",
                        frame: "For instance, X in many countries now impose fees for Y, a clear indication of where the cost truly lies.",
                        frameJa: "たとえば多くの国でXはYに手数料を課すようになった。費用が本当はどこにあるかの明白な印だ。",
                        slots: { X: "banks and retailers", Y: "handling coins" },
                    },
                ],
            },
            {
                engine: 'time',
                lines: [
                    {
                        role: 'reason',
                        en: "Second, where time is concerned, every second saved at the counter is multiplied by billions of transactions.",
                        ja: "第二に、時間ということで言えば、レジで浮いた1秒は、何十億という取引ぶんに掛け算される。",
                        frame: "Second, where W is concerned, every second saved at X is multiplied by Y.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "time", X: "the counter", Y: "billions of transactions" },
                    },
                    {
                        role: 'why',
                        en: "A tap takes one second whereas counting change takes ten, and people inevitably abandon anything ten times slower once they have experienced the alternative.",
                        ja: "タッチは1秒、釣り銭を数えるのは10秒。人は一度代わりを経験すると、必ず10倍遅いものを捨てる。",
                        frame: "X takes one second whereas Y takes ten, and people inevitably abandon anything ten times slower once they have experienced the alternative.",
                        frameJa: "Xは1秒、Yは10秒。人は一度代わりを経験すると、必ず10倍遅いものを捨てる。",
                        slots: { X: "A tap", Y: "counting change" },
                    },
                    {
                        role: 'example',
                        en: "Consequently, convenience stores that installed contactless readers report queues moving in half the time.",
                        ja: "その結果、非接触の読み取り機を入れたコンビニは、列が半分の時間で進むと報告している。",
                        frame: "Consequently, X that installed Y report Z.",
                        frameJa: "その結果、Yを入れたXは、Zと報告している。",
                        slots: { X: "convenience stores", Y: "contactless readers", Z: "queues moving in half the time" },
                    },
                ],
            },
            {
                engine: 'trust',
                lines: [
                    {
                        role: 'reason',
                        en: "Finally, in the context of trust, a payment that leaves a record is one both parties can trust.",
                        ja: "最後に、信頼の文脈では、記録が残る支払いは、双方が信用できる支払いである。",
                        frame: "Finally, in the context of W, X that leaves a record is one both parties can trust.",
                        frameJa: "(BODY_OPENERS の枠 + 中身)",
                        slots: { W: "trust", X: "a payment" },
                    },
                    {
                        role: 'why',
                        en: "Cash cannot prove who paid whom, which is precisely why it remains the currency of tax evasion, bribery, and theft.",
                        ja: "現金は誰が誰に払ったかを証明できない。まさにそれゆえに、脱税と賄賂と盗みの通貨であり続けている。",
                        frame: "X cannot prove Y, which is precisely why it remains the currency of Z.",
                        frameJa: "XはYを証明できない。まさにそれゆえに、Zの通貨であり続けている。",
                        slots: { X: "Cash", Y: "who paid whom", Z: "tax evasion, bribery, and theft" },
                    },
                    {
                        role: 'example',
                        en: "Countries that transferred wages and pensions onto digital accounts witnessed a substantial decline in money going missing en route.",
                        ja: "給与と年金をデジタル口座に移した国々では、途中で消える金が大幅に減った。",
                        frame: "X that transferred Y onto digital accounts witnessed a substantial decline in Z.",
                        frameJa: "Yをデジタル口座に移したXでは、Zが大幅に減った。",
                        slots: { X: "Countries", Y: "wages and pensions", Z: "money going missing en route" },
                    },
                ],
            },
        ],
        close: [
            {
                role: 'close',
                en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                ja: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                frame: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
                frameJa: "結論として、反対の立場にも一理はあるが、上に挙げた理由がそれを明らかに上回る。",
                slots: {},
            },
            {
                role: 'close',
                en: "Given money, time and trust, I remain firmly convinced that it will happen.",
                ja: "金、時間、信頼を踏まえると、いずれ起きるという確信は変わらない。",
                frame: "Given X, Y and Z, I remain firmly convinced that W.",
                frameJa: "X、Y、Zを踏まえると、Wという確信は変わらない。",
                slots: { X: "money", Y: "time", Z: "trust", W: "it will happen" },
            },
        ],
    },
];

// ============================================================
// 導出ヘルパー -- 本文は分解から組み立てる(二重管理をしない)
// ============================================================

/** 段落単位の英文。序論 / 本論3 / 結論 の5要素 */
export function essayParagraphs(e: CoreEssay): string[] {
    return [
        e.intro.map((l) => l.en).join(' '),
        ...e.blocks.map((b) => b.lines.map((l) => l.en).join(' ')),
        e.close.map((l) => l.en).join(' '),
    ];
}

/** 段落単位の和訳 */
export function essayParagraphsJa(e: CoreEssay): string[] {
    return [
        e.intro.map((l) => l.ja).join(''),
        ...e.blocks.map((b) => b.lines.map((l) => l.ja).join('')),
        e.close.map((l) => l.ja).join(''),
    ];
}

export function essayText(e: CoreEssay): string {
    return essayParagraphs(e).join('\n\n');
}

export function essayWordCount(e: CoreEssay): number {
    return essayText(e).trim().split(/\s+/).filter(Boolean).length;
}

/** 文の平坦なリスト(読み上げ・暗記モード用) */
export function essayLines(e: CoreEssay): CoreLine[] {
    return [...e.intro, ...e.blocks.flatMap((b) => b.lines), ...e.close];
}

export function enginesOf(e: CoreEssay): EngineId[] {
    return e.blocks.map((b) => b.engine);
}

/** frame に slots を代入した結果。en と一致するはず(verify がこれを検査) */
export function fillFrame(line: CoreLine): string {
    let out = line.frame;
    for (const [k, v] of Object.entries(line.slots)) {
        out = out.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
    }
    return out;
}

/** エンジンごとに「どの解答のどのブロックに実在するか」 */
export function engineCoverage(): Record<EngineId, { essayId: number; theme: string }[]> {
    const map = Object.fromEntries(
        REASON_ENGINES.map((e) => [e.id, [] as { essayId: number; theme: string }[]])
    ) as Record<EngineId, { essayId: number; theme: string }[]>;
    for (const e of CORE_ESSAYS) {
        for (const b of e.blocks) map[b.engine].push({ essayId: e.id, theme: e.theme });
    }
    return map;
}

export const TOTAL_CORE = CORE_ESSAYS.length;

// ============================================================
// 模範解答5本 — 30問から形式の違う5問を、幹の文 + 補足の型20 + 自分の1文で書いた
// ============================================================
/**
 * 【2026-09-14 実地試験 v4 の5本をそのまま載せる】(claudedocs/core5-trial-5-prompts.md)
 * 1段落 = 本論の頭 + 幹の文 + 型3つ(自由) + 自分の1文。各答案に譲歩を1回入れた。
 * 冒頭2文と結び2文は ESSAY_FRAME、本論の頭は BODY_OPENERS。**文は組み立て関数で作るので、ここには名詞しか書かない。**
 * 語数・型の重複・譲歩の形・穴の語数は verify が検査する。
 */
export interface ModelParagraph {
    finger: EngineId;
    key: TrunkKey;
    /** 幹の文の X に入れた主語 */
    subject: string;
    polarity: Polarity;
    steps: SupportStep[];
    own: string;
}

export interface ModelEssay {
    id: string;
    question: string;
    questionJa: string;
    shape: string;
    answer: 'Yes' | 'No';
    /** 冒頭1文目の X / Y / Z */
    topic: string;
    claim: string;
    restate: string;
    /** 冒頭2文目の X(譲歩)/ Y(立場) */
    concession: string;
    position: string;
    paragraphs: ModelParagraph[];
    noteJa: string;
}

const ms = (pattern: SupportId, A: string, B: string): SupportStep => ({ pattern, slots: { A, B } });

export const MODEL_ESSAYS: ModelEssay[] = [
    {
        id: '1', question: 'Is space exploration worth its enormous price tag?', questionJa: '宇宙開発は、莫大な費用に見合うか',
        shape: 'WORTH IT', answer: 'Yes',
        topic: 'space exploration', claim: 'is worth its enormous price tag', restate: 'the expense',
        concession: 'the sums involved are undeniably vast', position: 'it is worth the money',
        noteJa: '3段落とも主語が良いもの。2段落目で、反対側の型(誰が負担する)を譲歩に入れた',
        paragraphs: [
            { finger: 'money', key: 'pro', subject: 'space exploration', polarity: 'pos',
                steps: [ms('by', 'satellite data', 'every farmer'), ms('means', 'waste', 'food'), ms('example', 'one satellite', 'a hundred stations')],
                own: 'Forecasts that once took days now arrive in minutes.' },
            { finger: 'education', key: 'one', subject: 'space exploration', polarity: 'pos',
                steps: [ms('lets', 'young engineers', 'unsolved problems'), ms('burdens', 'taxpayers', 'huge bills'), ms('gives', 'students', 'role models')],
                own: 'Few things pull teenagers towards maths like a launch.' },
            { finger: 'nature', key: 'two', subject: 'space exploration', polarity: 'pos',
                steps: [ms('turning', 'raw images', 'early warnings'), ms('frees', 'climate scientists', 'guesswork'), ms('leads', 'better forecasting', 'smarter farming')],
                own: 'Satellites now show forests shrinking almost in real time.' },
        ],
    },
    {
        id: '24', question: 'Should the death penalty be abolished?', questionJa: '死刑は廃止すべきか',
        shape: 'DO IT', answer: 'Yes',
        topic: 'the death penalty', claim: 'should be abolished', restate: 'such a change',
        concession: "victims' families understandably demand severe punishment", position: 'it should be abolished',
        noteJa: '3段落目だけ死刑そのものを主語にして、主語が悪いものの幹の文とネガの型で書いた。ポジの型(誰が得をする)を譲歩に',
        paragraphs: [
            { finger: 'fairness', key: 'one', subject: 'abolition', polarity: 'pos',
                steps: [ms('means', 'irreversible error', 'justice'), ms('gives', 'the wrongly convicted', 'second chance'), ms('example', 'a life sentence', 'an execution')],
                own: 'Courts can still punish severely without a permanent mistake.' },
            { finger: 'trust', key: 'two', subject: 'abolition', polarity: 'pos',
                steps: [ms('lets', 'investigators', 'new evidence'), ms('without', 'innocent prisoners', 'luck'), ms('focus', 'courts', 'the evidence')],
                own: 'People once sentenced to death have later been cleared.' },
            { finger: 'money', key: 'threeBad', subject: 'the death penalty', polarity: 'neg',
                steps: [ms('meansMore', 'appeals', 'victim support'), ms('burdens', 'taxpayers', 'legal costs'), ms('frees', 'prisons', 'lifelong costs')],
                own: 'Decades of appeals cost more than a life sentence.' },
        ],
    },
    {
        id: '23', question: 'Are restrictions on free speech ever justified?', questionJa: '言論の自由を制限することは、正当化されうるか',
        shape: 'IS IT SO', answer: 'Yes',
        topic: 'restrictions on free speech', claim: 'can ever be justified', restate: 'such a limit',
        concession: 'free expression is a cornerstone of democracy', position: 'such limits can be justified',
        noteJa: '1段落目は付ける型を2つ重ねて1文にした。2段落目で、表現の自由の側の型(何を奪う)を譲歩に',
        paragraphs: [
            { finger: 'body', key: 'two', subject: 'careful regulation', polarity: 'pos',
                steps: [ms('by', 'accurate information', 'worried patients'), ms('means', 'panic', 'vaccination'), ms('example', 'one warning label', 'a health campaign')],
                own: 'False cures spread fastest when people are frightened.' },
            { finger: 'trust', key: 'pro', subject: 'careful regulation', polarity: 'pos',
                steps: [ms('lets', 'readers', 'false claims'), ms('strips', 'critics', 'voice'), ms('leads', 'common ground', 'calmer debate')],
                own: 'People stop listening once they cannot agree on facts.' },
            { finger: 'happiness', key: 'three', subject: 'careful regulation', polarity: 'pos',
                steps: [ms('turning', 'hostile forums', 'safe spaces'), ms('frees', 'vulnerable groups', 'online abuse'), ms('focus', 'moderators', 'real threats')],
                own: 'Many people simply leave platforms where abuse goes unchecked.' },
        ],
    },
    {
        id: '18', question: 'Will infectious diseases pose a greater danger in the years to come?', questionJa: '感染症の脅威は、これから大きくなるか',
        shape: 'WILL IT', answer: 'Yes',
        topic: 'infectious diseases', claim: 'will pose a greater danger in the years to come', restate: 'that prediction',
        concession: 'medical technology continues to advance', position: 'they will pose a greater danger',
        noteJa: '脅威の問い。3段落とも主語が悪いもので、ネガの型。3段落目は X に climate change を入れた',
        paragraphs: [
            { finger: 'body', key: 'oneBad', subject: 'infectious disease', polarity: 'neg',
                steps: [ms('meansMore', 'risk', 'protection'), ms('starts', 'one traveller', 'a full ward'), ms('undo', 'one resistant strain', 'medical progress')],
                own: 'New strains arrive before doctors finish fighting the last.' },
            { finger: 'money', key: 'twoBad', subject: 'infectious disease', polarity: 'neg',
                steps: [ms('blind', 'governments', 'real costs'), ms('afford', 'small businesses', 'a closure'), ms('gives', 'scientists', 'funding')],
                own: 'The next pandemic will hit a more connected economy.' },
            { finger: 'nature', key: 'threeBad', subject: 'climate change', polarity: 'neg',
                steps: [ms('reducing', 'wetlands', 'breeding grounds'), ms('burdens', 'hospitals', 'tropical diseases'), ms('unchecked', 'poor regions', 'protection')],
                own: 'Warmer summers give mosquitoes more time to breed.' },
        ],
    },
    {
        id: '19', question: 'Can the world realistically ban weapons of mass destruction?', questionJa: '大量破壊兵器を、世界は現実に禁止できるか',
        shape: 'CAN', answer: 'No',
        topic: 'the world', claim: 'can realistically ban weapons of mass destruction', restate: 'such a hope',
        concession: 'disarmament is a noble goal', position: 'a complete ban is not realistic',
        noteJa: '「できない」の問い。1・3段落目は全面禁止を主語にネガの型、2段落目は段階的な軍縮を主語にポジの型',
        paragraphs: [
            { finger: 'trust', key: 'con', subject: 'a total ban', polarity: 'neg',
                steps: [ms('meansMore', 'suspicion', 'cooperation'), ms('starts', 'a signature', 'a hidden stockpile'), ms('undo', 'one secret site', 'an entire treaty')],
                own: 'Countries that suspect cheating simply refuse to disarm.' },
            { finger: 'fairness', key: 'three', subject: 'gradual arms control', polarity: 'pos',
                steps: [ms('lets', 'smaller nations', 'the same records'), ms('without', 'small states', 'empty promises'), ms('focus', 'inspectors', 'real threats')],
                own: 'Step-by-step limits build trust a total ban assumes.' },
            { finger: 'money', key: 'con', subject: 'a total ban', polarity: 'neg',
                steps: [ms('reducing', 'disarmament', 'a paper exercise'), ms('burdens', 'poorer countries', 'costly inspections'), ms('frees', 'the world', 'a nightmare')],
                own: 'Treaties that nobody funds tend to collapse quietly.' },
        ],
    },
];

export interface ModelBlock {
    kind: 'intro' | 'body' | 'conclusion';
    /** body のときの段落 */
    paragraph?: ModelParagraph;
    sentences: { en: string; mine: boolean }[];
    /** その場で入れた名詞(画面で色を変える) */
    nouns: string[];
}

function fillFrameHoles(frame: string, map: Partial<Record<'X' | 'Y' | 'Z' | 'W', string>>): string {
    return frame.replace(/\b([XYZW])\b/g, (k) => map[k as 'X' | 'Y' | 'Z' | 'W'] ?? k);
}

/** 模範解答を、冒頭 / 本論3段落 / 結び の5ブロックに組み立てる */
export function modelEssayBlocks(e: ModelEssay): ModelBlock[] {
    const intro: ModelBlock = {
        kind: 'intro',
        sentences: [
            { en: fillFrameHoles(ESSAY_FRAME[0].frame, { X: e.topic, Y: e.claim, Z: e.restate }), mine: false },
            { en: fillFrameHoles(ESSAY_FRAME[1].frame, { X: e.concession, Y: e.position }), mine: false },
        ],
        nouns: [e.topic, e.claim, e.restate, e.concession, e.position],
    };
    const body: ModelBlock[] = e.paragraphs.map((p, i) => {
        const head = `${BODY_OPENERS[i].frame.replace('W', ENGINE_BY_ID[p.finger].slotNoun)} ${PARAGRAPH_BY_ENGINE[p.finger][p.key].replace(/\bX\b/, p.subject)}`;
        const s = buildParagraph(head, p.polarity, p.steps, p.own);
        return {
            kind: 'body',
            paragraph: p,
            sentences: s.map((en, k) => ({ en, mine: k === s.length - 1 })),
            nouns: [p.subject, ...p.steps.flatMap((st) => [st.slots.A ?? '', st.slots.B ?? ''])].filter(Boolean),
        };
    });
    const nouns = e.paragraphs.map((p) => ENGINE_BY_ID[p.finger].slotNoun);
    const conclusion: ModelBlock = {
        kind: 'conclusion',
        sentences: [
            { en: ESSAY_FRAME[2].frame, mine: false },
            { en: fillFrameHoles(ESSAY_FRAME[3].frame, { X: nouns[0], Y: nouns[1], Z: nouns[2], W: e.position }), mine: false },
        ],
        nouns: [e.position],
    };
    return [intro, ...body, conclusion];
}

export function modelEssayWords(e: ModelEssay): number {
    return modelEssayBlocks(e).reduce((n, b) => n + b.sentences.reduce((m, s) => m + s.en.trim().split(/\s+/).length, 0), 0);
}

// ============================================================
// 1つのお題を10本の指で — Are restrictions on free speech ever justified?(全部 Yes 側)
// ============================================================
/**
 * 【2026-09-14 本人: オンライン英会話 で先生と2人とも賛成の立場で、今日やったことを全部復習できるように10本の指で】
 * 1本の指 = 段落1つ(子テーマ1つ + 型3つ + 自分の1文) + 残りの子テーマ2つ(型1つずつ) + 締めの動詞文(型1つ)。
 * だから30の子テーマが全部、このお題の文として1回ずつ出てくる。
 * 主語は1文ごとに選ぶ。制限そのもの(careful regulation など)なら良い主語、制限を正当化する害(偽情報・嫌がらせなど)なら悪い主語。
 * 幹の文の動詞は三単現なので、主語は単数か数えられない名詞にする。
 */
export interface TopicLine {
    key: TrunkKey;
    subject: string;
    polarity: Polarity;
    steps: SupportStep[];
    /** 段落の最後に置く自分の1文(段落のときだけ) */
    own?: string;
    ja: string;
}

export interface TopicFinger {
    finger: EngineId;
    /** 段落にする子テーマ */
    main: TopicLine;
    /** 残りの子テーマ2つ */
    others: TopicLine[];
    /** 締めの動詞文(pro / con) */
    close: TopicLine;
}

export interface TopicTen {
    question: string;
    questionJa: string;
    stance: string;
    stanceJa: string;
    fingers: TopicFinger[];
}

const ts2 = (pattern: SupportId, A: string, B: string): SupportStep => ({ pattern, slots: { A, B } });
const tl = (key: TrunkKey, subject: string, polarity: Polarity, steps: SupportStep[], ja: string, own?: string): TopicLine =>
    ({ key, subject, polarity, steps, ja, own });

export const TOPIC_TEN: TopicTen = {
    question: 'Are restrictions on free speech ever justified?',
    questionJa: '言論の自由を制限することは、正当化されうるか',
    stance: 'Yes. Some restrictions on free speech are justified.',
    stanceJa: 'はい。言論の自由の制限には、正当化されるものがある',
    fingers: [
        {
            finger: 'money',
            main: tl('twoBad', 'Fraudulent advertising', 'neg',
                [ts2('reducing', 'online shopping', 'a gamble'), ts2('starts', 'one fake review', 'a lost pension'), ts2('afford', 'victims', 'legal action')],
                '詐欺的な広告は、普通の家庭の家計の安定を危険にさらし、ネット通販を賭けに変えてしまう。始まりは1件の偽レビューで、行き着く先は老後の資金を失うことだ。その結果、被害者は訴える費用すら払えなくなる。多くの国が虚偽広告をすでに規制しているのは、まさにこのためだ。',
                'Most countries already regulate false advertising for exactly this reason.'),
            others: [
                tl('oneBad', 'Unregulated financial promotion', 'neg', [ts2('concentrating', 'savings', 'a few promoters')],
                    '規制されていない金融の宣伝は、貯蓄を一握りの宣伝者の手に集め、豊かな人と貧しい人の格差をさらに固定化させる。'),
                tl('threeBad', 'Online fraud', 'neg', [ts2('meansMore', 'police work', 'public money')],
                    'ネット詐欺は、学校や病院に回るはずの限られた財源をよそへ流す。つまり、警察の仕事が増え、公のお金が減る。'),
            ],
            close: tl('con', 'Gambling advertising', 'neg', [ts2('burdens', 'young people', 'debt')],
                'ギャンブルの広告は、普通の家庭に見えない税を簡単に課しうる。何より、若い人に借金を背負わせる。'),
        },
        {
            finger: 'time',
            main: tl('one', 'Spam filtering', 'pos',
                [ts2('means', 'deleting', 'reading'), ts2('example', 'one filter', 'a moderation team'), ts2('undo', 'one wrong filter', 'a real conversation')],
                'スパムを弾く仕組みは、生産性を全面的に大きく押し上げる。つまり、消す作業が減り、読む時間が増える。例えば、フィルタ1つがモデレーションのチーム分の仕事をこなす。確かに、誤判定するフィルタ1つで本物の会話が台無しになることはある。それでも、何も弾かない受信箱を本気で望む人はいない。',
                'Nobody seriously wants an unfiltered inbox.'),
            others: [
                tl('two', 'Content moderation', 'pos', [ts2('by', 'reliable reviews', 'shoppers')],
                    'コンテンツの管理は、信頼できるレビューを買い物客の手に渡し、日々の暮らしを効率化して、便利さを手の届くところに置く。'),
                tl('three', 'A clear code of conduct', 'pos', [ts2('lets', 'beginners', 'the limits')],
                    'はっきりした行動規範があれば初心者にも線引きが見えるので、勝算を見込んだ挑戦をするときの機会費用が下がる。'),
            ],
            close: tl('pro', 'Moderation', 'pos', [ts2('leads', 'a calmer forum', 'better discussions')],
                'モデレーションは今時間を注ぎ込み、それが何年にもわたって報われる。そして、落ち着いた掲示板が、より良い議論につながる。'),
        },
        {
            finger: 'body',
            main: tl('twoBad', 'Health misinformation', 'neg',
                [ts2('blind', 'patients', 'real dangers'), ts2('unchecked', 'sick people', 'proper treatment'), ts2('reducing', 'medicine', 'guesswork')],
                '健康についての誤情報は、患者を本当の危険から見えなくし、一番大事なときにこそ予防を切り崩す。放っておけば、病気の人が適切な治療を受けられなくなり、医療が当て推量に落ちる。偽の治療法は、本物の医学的な助言より速く広まることが多い。',
                'False cures often spread faster than real medical advice.'),
            others: [
                tl('oneBad', 'Harmful diet content', 'neg', [ts2('starts', 'one diet video', 'a hospital bed')],
                    '有害なダイエット情報は、公衆衛生に深刻な脅威をもたらす。始まりは1本のダイエット動画で、行き着く先は病院のベッドだ。'),
                tl('threeBad', 'Tobacco advertising', 'neg', [ts2('strips', 'smokers', 'healthy years')],
                    'たばこの広告は、多くの人の寿命を何年も縮める。喫煙者から、かつてあった健康な年月を奪う。'),
            ],
            close: tl('con', 'A viral stunt challenge', 'neg', [ts2('burdens', 'hospitals', 'avoidable injuries')],
                '拡散する危険な挑戦動画は、長い目で見れば体の健康を簡単に危うくしうる。何より、避けられたはずのけがを病院に背負わせる。'),
        },
        {
            finger: 'happiness',
            main: tl('threeBad', 'Online harassment', 'neg',
                [ts2('meansMore', 'anxiety', 'sleep'), ts2('burdens', 'teenagers', 'constant fear'), ts2('strips', 'victims', 'confidence')],
                'ネット上の嫌がらせは、暮らしの質を少しずつ削り取る。つまり、不安が増え、眠りが減る。何より、10代に絶え間ない恐怖を背負わせる。被害者から、かつてあった自信を奪う。多くの若者がSNSを離れるのは、飽きたからではなく嫌がらせのせいだ。',
                'Many young people leave social media because of abuse, not boredom.'),
            others: [
                tl('oneBad', 'Workplace abuse', 'neg', [ts2('reducing', 'skilled staff', 'silent workers')],
                    '職場での暴言は、大変な仕事から達成感を奪い取り、腕のある人を黙って働くだけの人に落とす。'),
                tl('twoBad', 'Online hate', 'neg', [ts2('starts', 'one cruel comment', 'total isolation')],
                    'ネット上の憎悪は、人の目的意識を削ぎ、よりどころを失わせる。始まりは1つの心ないコメントで、行き着く先は完全な孤立だ。'),
            ],
            close: tl('pro', 'Anti-harassment moderation', 'pos', [ts2('focus', 'users', 'their friends')],
                '嫌がらせを取り締まるモデレーションは、人の暮らしを個人の実感として豊かにする。その結果、利用者はやっと友人とのやりとりに集中できる。'),
        },
        {
            finger: 'education',
            main: tl('oneBad', 'Extremist propaganda', 'neg',
                [ts2('blind', 'young viewers', 'other views'), ts2('starts', 'one video', 'a closed mind'), ts2('undo', 'one recommendation loop', 'a good education')],
                '過激派のプロパガンダは、若い視聴者をほかの見方から見えなくし、論理的思考を抑えつけて、疑わずに従うことを良しとする。始まりは1本の動画で、行き着く先は閉じた心だ。例えば、おすすめの連鎖1つで、しっかりした教育が台無しになる。テロ組織への勧誘動画は、すでに各プラットフォームが削除している。',
                'Platforms already remove videos that recruit for terrorist groups.'),
            others: [
                tl('twoBad', 'Essay-mill advertising', 'neg', [ts2('meansMore', 'shortcuts', 'real ability')],
                    'レポート代行業者の広告は、苦労して身につけた実務の技能を、ほとんど一夜で時代遅れにする。つまり、近道が増え、本当の力が減る。'),
                tl('three', 'A safe school network', 'pos', [ts2('gives', 'parents', 'confidence')],
                    '安全な学校のネットワークは、取り残されていた人にも教育への機会を広げる。保護者に、これまで持てなかった安心を与える。'),
            ],
            close: tl('pro', 'Classroom moderation', 'pos', [ts2('frees', 'shy students', 'ridicule')],
                '教室での発言の管理は、生涯学び続ける文化を育てる。何より、内気な生徒を嘲笑から解放する。'),
        },
        {
            finger: 'fairness',
            main: tl('three', 'Careful regulation', 'pos',
                [ts2('lets', 'judges', 'clear limits'), ts2('concentrating', 'power', 'officials'), ts2('without', 'minorities', 'goodwill')],
                '慎重な規制は、裁判官に明確な線引きが見えるので、1つのルールのもとで条件を公平にする。確かに、役人の手に権力を集めて裏目に出ることはある。それでも、規制が無ければ、少数派は周りの善意に頼るしかない。良い法律が罰するのは、意見ではなく脅迫と扇動だ。',
                'A good law punishes threats and incitement, not opinions.'),
            others: [
                tl('oneBad', 'Incitement to violence', 'neg', [ts2('starts', 'one speech', 'a mob')],
                    '暴力への扇動は、何のとがめも受けずに基本的な人権を踏みにじる。始まりは1つの演説で、行き着く先は暴徒だ。'),
                tl('twoBad', 'Hate speech', 'neg', [ts2('burdens', 'minorities', 'daily abuse')],
                    'ヘイトスピーチは、すでに社会の周縁にいる人たちへの差別をあおる。何より、少数派に日々の暴言を背負わせる。'),
            ],
            close: tl('pro', 'Equal protection', 'pos', [ts2('turning', 'promises', 'rights')],
                '平等な保護は、努力ではなく生まれに根ざした不平等を縮め、約束を権利に変える。'),
        },
        {
            finger: 'freedom',
            main: tl('two', 'Careful regulation', 'pos',
                [ts2('by', 'clear rules', 'every platform'), ts2('frees', 'minority voices', 'harassment'), ts2('focus', 'ordinary users', 'the debate')],
                '慎重な規制は、すべてのプラットフォームに明確なルールを持たせ、不人気な意見にまで自由な表現を擁護する。何より、少数派の声を嫌がらせから解放する。その結果、普通の利用者がやっと議論そのものに集中できる。部屋で一番大きな声が、一番自由な声とは限らない。',
                'The loudest voice in a room is not always the freest one.'),
            others: [
                tl('one', 'Honest labelling', 'pos', [ts2('lets', 'consumers', 'the facts')],
                    '正直な表示は、消費者に事実が見えるので、個人が十分な情報に基づいて自分で選べるようにする。'),
                tl('threeBad', 'Manipulative advertising', 'neg', [ts2('reducing', 'shoppers', 'targets')],
                    '人を操る広告は、さりげなく、しかし執拗に個人の自律を侵し、買い物客をただの標的に落とす。'),
            ],
            close: tl('con', 'Online intimidation', 'neg', [ts2('afford', 'journalists', 'honest criticism')],
                'ネット上の脅しは、人が当たり前だと思っている自由を簡単に抑え込みうる。その結果、記者は正直な批判をする余裕を失う。'),
        },
        {
            finger: 'trust',
            main: tl('twoBad', 'Deliberate disinformation', 'neg',
                [ts2('concentrating', 'attention', 'a few accounts'), ts2('starts', 'one fake video', 'a public panic'), ts2('strips', 'voters', 'confidence')],
                '意図的な偽情報は、注目を一握りのアカウントの手に集め、真実と作り話の境界をあいまいにする。始まりは1本の偽動画で、行き着く先は社会の混乱だ。有権者から、かつてあった確信を奪う。1つの嘘が最も大きな被害を出すのは選挙だ。',
                'Elections are where a single lie does the most damage.'),
            others: [
                tl('one', 'Political ad disclosure', 'pos', [ts2('means', 'hidden money', 'scrutiny')],
                    '政治広告の出資者の開示は、密室で下される決定に必要な透明性を持ち込む。つまり、隠れた資金が減り、監視の目が増える。'),
                tl('threeBad', 'Anonymous smearing', 'neg', [ts2('undo', 'one fake scandal', "a whistleblower's career")],
                    '匿名の中傷は、力を持つ者が自分の行いの責任を逃れることを許す。例えば、でっち上げのスキャンダル1つで、内部告発者のキャリアが終わる。'),
            ],
            close: tl('pro', 'Fact-check labelling', 'pos', [ts2('gives', 'readers', 'evidence')],
                'ファクトチェックの表示は、社会の信頼を固め、制度への信頼を取り戻す。読者に、これまで持てなかった根拠を与える。'),
        },
        {
            finger: 'roots',
            main: tl('two', 'Careful regulation', 'pos',
                [ts2('turning', 'open hostility', 'respectful debate'), ts2('afford', 'comedians', 'offensive jokes'), ts2('gives', 'immigrant families', 'safety')],
                '慎重な規制は、共同体を結びつける共有の文化を育て、むき出しの敵意を敬意ある議論に変える。確かに、コメディアンは不快な冗談を言う余裕を失う。それでも、移民の家族に、これまで持てなかった安全を与える。共有の文化が生き残るのは、隣人同士が暴言なしに意見を違えられるときだ。',
                'Shared culture survives when neighbours can disagree without abuse.'),
            others: [
                tl('one', 'Protection from religious hatred', 'pos', [ts2('without', 'minority faiths', 'police guards')],
                    '宗教的な憎悪からの保護は、消えかけている伝統に新たな命を吹き込む。それが無ければ、少数派の信仰は警察の警備に頼るしかない。'),
                tl('threeBad', 'Racist abuse', 'neg', [ts2('unchecked', 'second-generation children', 'a home')],
                    '人種差別の暴言は、人をアイデンティティの危機に陥れる。放っておけば、移民2世の子どもたちが居場所を失う。'),
            ],
            close: tl('con', 'Sectarian propaganda', 'neg', [ts2('blind', 'neighbours', 'shared interests')],
                '宗派対立をあおる宣伝は、隣人を共通の利益から見えなくし、共同体をつなぎとめている社会の結びつきを弱める。'),
        },
        {
            finger: 'nature',
            main: tl('threeBad', 'Climate misinformation', 'neg',
                [ts2('blind', 'voters', 'real risks'), ts2('starts', 'one false headline', 'a lost decade'), ts2('afford', 'governments', 'further delay')],
                '気候についての誤情報は、有権者を本当の危険から見えなくし、壊れやすい生態系を崩壊の瀬戸際まで追いやる。始まりは1本の偽の見出しで、行き着く先は失われた10年だ。その結果、政府はこれ以上先送りする余裕を失う。誤った主張に注意書きを付けるのは検閲ではなく、文脈を足すことだ。',
                'Labelling false claims is not censorship; it is context.'),
            others: [
                tl('oneBad', 'Greenwashing', 'neg', [ts2('concentrating', 'sales', 'polluters')],
                    'グリーンウォッシングは、売上を汚染する企業の手に集め、限りある資源を驚くべき速さで使い果たす。'),
                tl('two', 'Honest environmental labelling', 'pos', [ts2('focus', 'shoppers', 'real impact')],
                    '環境についての正直な表示は、長期的な計画の最優先に持続可能性を置く。その結果、買い物客はやっと本当の環境への影響に目を向けられる。'),
            ],
            close: tl('pro', 'Truth-in-advertising law', 'pos', [ts2('leads', 'honest marketing', 'cleaner products')],
                '広告の真実性を求める法律は、自然とのバランスを取りながら成長を支える。そして、正直な宣伝が、よりクリーンな製品につながる。'),
        },
    ],
};

/** 幹の文の欄から、子テーマの番号(0〜2)。締めの動詞文は -1 */
export function trunkBranchIndex(key: TrunkKey): number {
    if (key === 'one' || key === 'oneBad') return 0;
    if (key === 'two' || key === 'twoBad') return 1;
    if (key === 'three' || key === 'threeBad') return 2;
    return -1;
}

/** お題の1行(段落 / 1文)を文の配列にする */
export function topicLineSentences(engine: EngineId, line: TopicLine): string[] {
    const head = PARAGRAPH_BY_ENGINE[engine][line.key].replace(/\bX\b/, line.subject);
    return buildParagraph(head, line.polarity, line.steps, line.own);
}
