/**
 * CORE 5 TALK — 1つの話題を、指10本 × 幹の文8本(80表現)で話し切る原稿。
 *
 * 【何のためか】
 * core5 の80表現は、英検のお題に答えるための在庫として作った。だが在庫は、自分の話に
 * 使ったときに初めて口に入る。このページは、本人が DMM で講師に話す「自分の話」を、
 * 80表現を全部通して組んだもの。1話題で80本を使い切れれば、在庫はお題を選ばない。
 *
 * 【決まり】
 * - 指1本 = 光(one / two / three / pro の4表現)+ 闇(oneBad / twoBad / threeBad / con の4表現)
 * - 表現は FINGER_PARAGRAPHS.phrases の形のまま入れる。主語と目的語だけ話題に差し替える
 * - 判定は phraseRegex(core5 本体と同じ関数)。talkCoverage() が80本を数え、ページが表示する
 * - 1つの表現は、1文の中で完結させる(phraseRegex は文の切れ目 . をまたがない)
 * - 事実として書くのは裏の取れる出来事だけ。数字は入れない
 * - 先頭は本題(何の話か)。表現の網羅は、その話を運ぶための手段
 */

import { FINGER_PARAGRAPHS, phraseRegex, type EngineId, type TrunkKey } from './write-core5';

export interface TalkFinger {
    engine: EngineId;
    /** 光の側。one / two / three / pro の4表現を全部含む */
    light: string[];
    /** 闇の側。oneBad / twoBad / threeBad / con の4表現を全部含む */
    dark: string[];
    /** 指の締めの一言(笑い) */
    punch: string;
    /** 読み終えたら講師に振る質問 */
    ask: string;
    lightJa: string;
    darkJa: string;
    askJa: string;
}

export interface CoreTalk {
    slug: string;
    date: string;
    title: string;
    titleJa: string;
    /** 本題(日本語)。この原稿が何の話か */
    premiseJa: string;
    intro: string[];
    fingers: TalkFinger[];
    closing: string[];
    closingAsk: string;
    /** 25分に3本だけ話すときの指 */
    shortRoute: EngineId[];
    shortRouteJa: string;
    /** 事実として書いた出来事の出どころ(日本語) */
    factsJa: string[];
}

export const LIGHT_KEYS: TrunkKey[] = ['one', 'two', 'three', 'pro'];
export const DARK_KEYS: TrunkKey[] = ['oneBad', 'twoBad', 'threeBad', 'con'];

export const CORE_TALKS: CoreTalk[] = [
    {
        slug: 'life-insurance',
        date: '2026-09-19',
        title: 'The Light and Dark of Life Insurance',
        titleJa: '生命保険の光と闇 — 指10本で話す',
        premiseJa: '第115夜の続き。講師に「次は生保にいた頃の話をする」と2回約束した。とにおは昔、生命保険の業界にいて、ごますりが得意で、給料は良く、そのぶん自分が削れていった。今は内装の現場を仕切る側にいる。講師は年金の電話営業だけは耐えられずに辞めた人。この原稿は、商品そのものの光と、売り方の闇を、指10本で分けて話す。闇の側は、そこにいた本人にしか話せない。',
        intro: [
            'Yesterday I promised to tell you about my life insurance days. So here it is, the light and the dark.',
            "I'll go finger by finger, because that's how my brain works now.",
            'Quick background: I worked in life insurance. I was good at brown-nosing. I was paid well.',
            'And slowly, I stopped recognizing myself.',
            "Now I'm on construction sites, at the bottom of the pyramid. And honestly, I sleep better.",
        ],
        fingers: [
            {
                engine: 'money',
                light: [
                    'On paper, life insurance goes a long way towards closing the wealth gap.',
                    "If the breadwinner dies, the family isn't wiped out, because the policy provides a safety net that underpins financial stability.",
                    'All those premiums unlock vital funding, because insurers are some of the biggest investors in the country.',
                    'When it works, it yields tangible benefits for ordinary households.',
                ],
                dark: [
                    'If you cancel in the first few years, you get back almost nothing, so for many people it imposes a hidden tax on ordinary families.',
                    'The people who cannot keep paying drop out and lose their money, which further entrenches the wealth gap between rich and poor.',
                    "Overselling puts the financial stability of ordinary households at risk, and I've seen families paying for five policies they didn't understand.",
                    "That money was diverted away from things they actually needed, like their kids' school fees.",
                ],
                punch: 'The product protects your family. The sales target protects the salesperson.',
                ask: 'In the UK, do people buy life insurance from a person, or mostly online?',
                lightJa: '家計を支える安全網。保険料は国の大きな投資マネーにもなる。',
                darkJa: '早期解約で戻りはほぼゼロ。売りすぎで家計が崩れ、子どもの学費に回るはずの金が消える。',
                askJa: 'イギリスでは、生命保険は人から買う? ネットで買う?',
            },
            {
                engine: 'time',
                light: [
                    "A good policy is time you invest now that pays dividends for years, because you sign in your thirties and it's still there in your sixties.",
                    'Online insurers streamline daily life and bring convenience within easy reach, and it takes five minutes on your phone.',
                    'A safety net lowers the opportunity cost of taking calculated risks, so you can quit your job and start a business without betting your family on it.',
                    'Digital tools gave productivity a significant boost across the board.',
                ],
                dark: [
                    'Old-school sales was the opposite: home visits, snacks for the office staff, meeting after meeting after meeting, and it took a heavy toll on productivity week after week.',
                    'The monthly quota drives up the opportunity cost of every wasted hour.',
                    'The easy products offer short-term convenience at the expense of long-term stability.',
                    'Honestly, most of my hours there were precious hours that could have been put to better use.',
                ],
                punch: 'Meeting after meeting after meeting. Singular. I checked.',
                ask: 'What was the biggest waste of time in your sales jobs?',
                lightJa: '30代で入って60代まで残る。ネットなら5分。安全網があるから挑戦できる。',
                darkJa: '訪問、お菓子配り、会議、会議。ノルマが1時間ごとの無駄を高くする。',
                askJa: 'あなたの営業時代で、一番の時間の無駄は何だった?',
            },
            {
                engine: 'body',
                light: [
                    'Some medical policies now pave the way for healthier habits, because your premium goes down if you walk more.',
                    'That places disease prevention at the heart of everyday care.',
                    'In an aging country, it holds the key to greater longevity in later life.',
                    'At its best, insurance acts as a buffer against illness, not against the illness itself, against the bill.',
                ],
                dark: [
                    "Now the sales side: the quota stress poses a serious threat to the salespeople's own health, and I saw colleagues drinking every night.",
                    'Long hours undercut disease prevention precisely when it matters most, because nobody has time for a check-up in their forties.',
                    'That lifestyle shaves years off your longevity.',
                    "In the long run, it can easily jeopardize your physical wellbeing, and that's where the word karoshi comes from.",
                ],
                punch: 'We sold health insurance to everyone except ourselves.',
                ask: "Boxing, manual work, night lessons. How do you keep your body from breaking?",
                lightJa: '歩けば保険料が下がる商品もある。守ってくれるのは病気ではなく請求書から。',
                darkJa: '売る側の体が壊れる。毎晩飲む同僚、40代で検診に行く暇も無い。過労死の語源の世界。',
                askJa: 'ボクシング、肉体労働、夜のレッスン。どうやって体を壊さずにいるの?',
            },
            {
                engine: 'happiness',
                light: [
                    'When a claim gets paid to a widow the week after the funeral, it instils a deep sense of fulfillment in the person who sold that policy.',
                    'A moment like that lends purpose to the way you spend your days.',
                    'It also brings about a marked improvement in quality of life for the family.',
                    "That's the light, and it enriches people's lives on a personal level.",
                ],
                dark: [
                    'But the quota drains the fulfillment out of hard work, because you stop seeing people and start seeing premiums.',
                    'It saps your purpose and leaves you adrift.',
                    'Brown-nosing gradually chips away at your quality of life.',
                    'A whole office doing the same thing erodes happiness and breeds widespread discontent.',
                ],
                punch: 'I was very good at it. That was the problem.',
                ask: 'The pension calls you quit. Was it the people shouting, or was it you?',
                lightJa: '葬式の翌週に保険金が届く。その瞬間だけは、売った人も報われる。',
                darkJa: 'ノルマで人が保険料に見えてくる。ごますりが暮らしを少しずつ削る。',
                askJa: 'あなたが辞めた年金の電話営業。つらかったのは怒鳴る相手? それとも自分?',
            },
            {
                engine: 'education',
                light: [
                    'The industry hones logical thinking, because actuaries are basically professional pessimists with spreadsheets.',
                    'It equips young people with vocational skills that employers value, like sales, numbers and reading people.',
                    'Comparison websites broaden access to financial education for those once left behind.',
                    'You have to keep studying for new licenses, so at its best it fosters a culture of lifelong learning.',
                ],
                dark: [
                    'The training I got stifled logical thinking and rewarded unquestioning obedience.',
                    'We memorized sales scripts word for word, which discouraged curiosity and promoted rote learning instead.',
                    'Now AI advisers could render those hard-won vocational skills obsolete almost overnight.',
                    'And the fine print puts real understanding beyond the reach of many customers.',
                ],
                punch: 'I memorized the script so well that I still believe parts of it.',
                ask: 'You studied business. Did they teach you the ethics part, or just the numbers?',
                lightJa: '保険数理人はスプレッドシートを持った職業的悲観主義者。営業と数字と人を読む力が付く。',
                darkJa: '台本の丸暗記で、疑う力を削られた。AIがその技能を一晩で古くする。',
                askJa: '経営を学んだんだよね。倫理も教わった? 数字だけ?',
            },
            {
                engine: 'fairness',
                light: [
                    'In theory, insurance levels the playing field under one set of rules, because everybody pays into the same pool.',
                    "It upholds a basic right: your kids shouldn't lose their future because you died.",
                    'Honest underwriting helps dismantle discrimination in decisions that shape lives.',
                    'It narrows inequalities that are rooted in birth rather than effort.',
                ],
                dark: [
                    'In practice, rich customers get tax-smart products, and everyone else gets whatever the salesperson needs to hit the quota, which widens the gap between the haves and the have-nots.',
                    'Health checks can fuel discrimination against groups already on the margins, so try getting covered with a pre-existing condition.',
                    'When companies get caught, they bend the rules to suit those in positions of power.',
                    'In the mid-2000s, big Japanese insurers were found skipping claims they owed, and that is trampling on basic rights with impunity.',
                ],
                punch: 'Everybody pays into the same pool. Some people just get a bigger towel.',
                ask: 'Is there a scandal like that in the UK that everybody remembers?',
                lightJa: '全員が同じ池に払い込む。親が死んでも子の未来は守られる、という権利。',
                darkJa: '金持ちには節税商品、それ以外にはノルマの商品。2000年代半ば、大手生保の保険金の払い漏れが大量に見つかった。',
                askJa: 'イギリスにも、誰もが覚えているこういう不祥事はある?',
            },
            {
                engine: 'freedom',
                light: [
                    'A good agent empowers individuals to make informed choices for themselves.',
                    "A healthy company champions free expression even for unpopular views, like the agent who says, you don't need this product.",
                    'A safety net respects personal autonomy and lets people chart their own course.',
                    'It grants people the latitude to live as they see fit.',
                ],
                dark: [
                    'Inside the company, the sales culture limits choice and makes conformity the path of least resistance.',
                    'If you question the product in a meeting, it has a chilling effect on free expression, and you only do it once.',
                    "The company encroaches on personal autonomy in subtle but persistent ways: drinking parties, weekend golf, and voluntary overtime that isn't voluntary.",
                    'It curbs freedoms that people take for granted, like going home at six.',
                ],
                punch: 'Voluntary overtime. My favorite oxymoron.',
                ask: 'Have you ever worked somewhere you could not say what you really thought?',
                lightJa: '良い営業は、自分で選べるようにする。要らない商品は要らないと言う。',
                darkJa: '社内では同調が一番楽な道。会議で商品を疑うのは1回だけ。自主的な残業は自主的ではない。',
                askJa: '本音を言えない職場で働いたことはある?',
            },
            {
                engine: 'trust',
                light: [
                    'Disclosure rules inject much-needed transparency into decisions made behind closed doors.',
                    'Journalists and regulators bring the truth to light for anyone to scrutinise.',
                    'Fines ensure accountability for those who wield power.',
                    'When it works, it reinforces social trust and restores faith in institutions.',
                ],
                dark: [
                    'But pricing is often shrouded in secrecy, and nobody tells you how much of your premium is commission.',
                    'The marketing blurs the line between truth and fiction, with savings-type insurance that barely saves anything.',
                    'When it blows up, the executives evade accountability for their actions: they bow for three seconds at a press conference and keep their pensions.',
                    'In 2019, Japan Post Insurance was caught selling elderly customers policies they did not need, and scandals like that undermine public trust and sow deep division.',
                ],
                punch: 'In Japan, the bow is the accountability.',
                ask: 'Do British executives ever actually go to jail, or do they just resign?',
                lightJa: '開示のルール、記者、規制当局、罰金。うまく回れば制度への信頼が戻る。',
                darkJa: '保険料のうち手数料がいくらかは誰も言わない。役員は3秒頭を下げて年金はそのまま。2019年、かんぽ生命の不適切販売。',
                askJa: 'イギリスの役員は本当に刑務所に行く? それとも辞任で終わり?',
            },
            {
                engine: 'roots',
                light: [
                    'The insurance lady who visits the same office for twenty years is almost a local tradition, so in a way the industry breathes new life into traditions at risk of disappearing.',
                    'It nurtures a shared culture that binds communities together.',
                    "It anchors people's identity in a shared heritage, because protecting the family is a very Japanese value.",
                    'And it safeguards a heritage passed down through generations: money handed down from generation to generation.',
                ],
                dark: [
                    'People in the industry joke that the sales method is GNP: giri, ninjo, present, which means obligation, emotion and free gifts, and that waters down a shared culture until it loses its meaning.',
                    'It relegates real community ties to a sales script.',
                    'The pressure can plunge people into a crisis of identity, and that was me.',
                    'Relatives selling policies to relatives weaken the social fabric that holds communities together.',
                ],
                punch: 'From generation to generation. Singular. I learned that one the hard way.',
                ask: 'In Spain, do families sell things to each other like that?',
                lightJa: '20年同じ職場に通う保険のおばちゃんは、ほぼ地域の伝統。家族を守るのは日本的な価値。',
                darkJa: '業界の冗談 GNP = 義理・人情・プレゼント。親戚が親戚に売って、つながりが擦り切れる。',
                askJa: 'スペインでも、家族や親戚の間でああいう売り方はある?',
            },
            {
                engine: 'nature',
                light: [
                    'Insurers manage huge pools of long-term money, so they can conserve finite resources for generations to come.',
                    'Climate risk is now an insurance risk, which puts sustainability at the forefront of long-term planning.',
                    'Pricing disaster risk helps shield fragile ecosystems from irreversible damage.',
                    'Ideally, it sustains growth while striking a balance with nature.',
                ],
                dark: [
                    'The same money has also chased easy returns in industries that deplete finite resources at an alarming rate.',
                    'Quarterly targets sacrifice sustainability for the sake of short-term gain.',
                    'The sales floor has its own ecosystem, and the quotas push fragile salespeople to the brink of collapse.',
                    'Burnout wreaks havoc on the whole office.',
                ],
                punch: 'The most endangered species on the sales floor is the honest salesperson.',
                ask: 'You work outside every morning. Does that change how you think about nature?',
                lightJa: '長期のお金を動かすから、気候リスクは保険のリスクになる。',
                darkJa: '同じ金が目先の利回りを追う。営業フロアの生態系では、ノルマが人を崩壊の瀬戸際まで押す。',
                askJa: '毎朝外で働いていて、自然の見え方は変わる?',
            },
        ],
        closing: [
            "So that's life insurance: a real safety net with a sales machine bolted on top.",
            'The product can be the light. The way it was sold was the dark part, and I was good at the dark part.',
            "That's why I left.",
            "Now I'm on the other side, doing an honest day's work, and the customer tells me in five seconds whether I did a good job.",
        ],
        closingAsk: 'So let me ask you: have you ever bought insurance you did not need?',
        shortRoute: ['money', 'happiness', 'trust'],
        shortRouteJa: '25分なら3本。MONEY(商品の光と闇)→ HAPPINESS(本人がそこで削れた話)→ TRUST(不祥事と3秒のお辞儀)。金 → 自分 → 社会の順で、話が広がっていく。',
        factsJa: [
            '2000年代半ば、国内の大手生命保険会社で、支払うべき保険金・給付金の払い漏れが大量に見つかり、行政処分が出た(いわゆる保険金不払い問題)。',
            '2019年、かんぽ生命で高齢者への不適切な販売が発覚。新旧の契約の保険料を二重に払わせていた例がある。',
            '歩数などの健康活動で保険料が変わる商品は、国内の生命保険会社が実際に販売している。',
            'GNP(義理・人情・プレゼント)は、業界内で昔の営業手法を指して言われる冗談として書いた。',
        ],
    },
    {
        slug: "finance",
        date: "2026-09-19",
        title: "The Light and Dark of Finance",
        titleJa: "金融業界の光と闇 — 指10本で話す",
        premiseJa: "生保の版の続き。第116夜、講師は生保の原稿の光の側を「絵空事」と見抜き、闇の側に「目が開いた」と言った。本人が「金融業界は20代で家、40代で墓」と言うと、講師は burn out で受けた。この版は、銀行・証券・投資銀行・フィンテックまで広げた金融業界全体の光と闇。光の側は業界が外に向けて言うこと、闇の側は中にいた人間が見たこと。締めは、本人が業界を出て現場に来た理由につなげてある。",
        intro: [
            "Last time I talked about life insurance. Today, the whole financial industry: banks, brokers, investment banks, and the new apps on your phone.",
            "I worked in that world. The office was clean, the pay was good, and I could build a house in my twenties.",
            "The joke was that you could build your tombstone in your forties, too.",
            "So here's the light the industry shows you, and the dark I saw from the inside, finger by finger.",
        ],
        fingers: [
            {
                engine: "money",
                light: [
                    "On paper, cheap index funds go a long way towards closing the wealth gap, because anyone can own a slice of the market.",
                    "A boring, well-run bank provides a safety net that underpins financial stability for a whole town.",
                    "Loans unlock vital funding for the bakery down the street, not just for big companies.",
                    "Done right, finance yields tangible benefits for ordinary households: a mortgage, a pension, a small business.",
                ],
                dark: [
                    "But the fees are small and quiet, and over thirty years they impose a hidden tax on ordinary families.",
                    "The people with money get the best advice, which further entrenches the wealth gap between rich and poor.",
                    "In 2008, one bad bet in America put the financial stability of ordinary households at risk all over the world.",
                    "Then the bailouts diverted scarce funding away from schools and hospitals to rescue the banks.",
                ],
                punch: "Heads, the bank wins. Tails, the taxpayer loses.",
                ask: "Did the 2008 crash hit your family in the UK?",
                lightJa: "安い投資信託で誰でも市場の一切れを持てる。地味な銀行が町の家計を支え、融資がパン屋の資金になる。",
                darkJa: "小さな手数料が30年で見えない税になる。2008年、アメリカの賭けが世界中の家計を危険にさらし、救済で学校と病院の予算が銀行に回った。",
                askJa: "2008年の金融危機は、イギリスのあなたの家族にも響いた?",
            },
            {
                engine: "time",
                light: [
                    "Banking apps streamline daily life and bring convenience within easy reach: no more lining up at the counter at three.",
                    "Automation gave productivity a significant boost across the board.",
                    "Putting a little into a fund every month is time you invest now that pays dividends for years.",
                    "Access to credit lowers the opportunity cost of taking calculated risks, like opening your own shop.",
                ],
                dark: [
                    "But the culture of long hours took a heavy toll on productivity week after week, because tired people make expensive mistakes.",
                    "Day trading on your phone offers short-term convenience at the expense of long-term stability.",
                    "Every sleepless night spent watching the market drives up the opportunity cost of every wasted hour.",
                    "I spent years in meetings about meetings, hours that could have been put to better use.",
                ],
                punch: "The market never sleeps. That is not a compliment. It means you do not either.",
                ask: "Do people in Spain use banking apps, or do they still go to the branch?",
                lightJa: "アプリで窓口の3時の行列が消えた。毎月少しずつの積み立ては、何年も後に効いてくる。",
                darkJa: "長時間労働で疲れた人間は高くつく間違いをする。スマホでのデイトレードは、目先の便利さで長い安定を失う。",
                askJa: "スペインの人は銀行アプリを使う? それともまだ支店に行く?",
            },
            {
                engine: "body",
                light: [
                    "Good company health insurance can pave the way for healthier habits, with free check-ups and gym discounts.",
                    "Some banks now place disease prevention at the heart of everyday care for their staff, with mental health days.",
                    "A decent pension holds the key to greater longevity in later life, because stress about money shortens lives.",
                    "Savings act as a buffer against illness, or at least against the bill that comes with it.",
                ],
                dark: [
                    "But the trading floor itself poses a serious threat to public health, or at least to the health of everyone on it.",
                    "Eighteen-hour days undercut disease prevention precisely when it matters most.",
                    "Junior bankers joke that the job shaves years off your longevity, and it is only half a joke.",
                    "In the long run, that pace can easily jeopardize physical wellbeing, which is why we say: a house in your twenties, a tombstone in your forties.",
                ],
                punch: "The bonus arrives in March. The heart attack arrives in April.",
                ask: "You box every afternoon. Could you do that with a banker's schedule?",
                lightJa: "良い会社の保険は検診とジムで健康な習慣を作る。まともな年金は、お金の不安で縮む寿命を守る。",
                darkJa: "トレーディングフロアそのものが健康への脅威。1日18時間で予防は崩れ、20代で家、40代で墓。",
                askJa: "毎日午後にボクシングをしてるよね。銀行員の日程でそれができる?",
            },
            {
                engine: "happiness",
                light: [
                    "Helping a young couple buy their first home can instil a deep sense of fulfillment in the person who approved the loan.",
                    "A good financial adviser lends purpose to the way people spend their days, because the money finally has a plan.",
                    "Getting out of debt brings about a marked improvement in quality of life, faster than any pay rise.",
                    "At its best, finance enriches people's lives on a personal level.",
                ],
                dark: [
                    "But when every conversation is about targets, the job drains the fulfillment out of hard work.",
                    "People chase the next bonus, and it saps their purpose and leaves them adrift.",
                    "Office politics gradually chips away at the quality of life of everyone in the building.",
                    "A culture of fear erodes happiness and breeds widespread discontent, even among people earning a fortune.",
                ],
                punch: "The richest floor in the building had the saddest lunch breaks.",
                ask: "Would you take a boring job for double the money?",
                lightJa: "若い夫婦の初めての家の融資が通る日は、通した側も報われる。借金から抜ける日は、昇給より暮らしを変える。",
                darkJa: "ノルマの話だけの職場は働く意味を吸い取る。大金を稼ぐ人の中にも、不満が広がっていく。",
                askJa: "給料が2倍なら、退屈な仕事をやる?",
            },
            {
                engine: "education",
                light: [
                    "Working in finance hones logical thinking and encourages people to question assumptions, at least on a good day.",
                    "The industry equips young people with vocational skills that employers value everywhere: numbers, risk, negotiation.",
                    "Free courses online broaden access to financial education for those once left behind.",
                    "A good firm fosters a culture of lifelong learning, because the rules change every year.",
                ],
                dark: [
                    "But a strict hierarchy stifles logical thinking and rewards unquestioning obedience.",
                    "Algorithms can render hard-won vocational skills obsolete almost overnight.",
                    "Real financial literacy is still beyond the reach of many people, because schools barely teach it.",
                    "And licence exams encourage rote learning: memorize the answers, pass, forget.",
                ],
                punch: "I passed six financial exams. I still could not explain my own pension.",
                ask: "Did you learn anything about money at school in the UK?",
                lightJa: "論理と前提を疑う力が磨かれる。数字・リスク・交渉はどこでも通じる技能。無料講座が学びを広げる。",
                darkJa: "上下関係が思考を殺し、服従を褒める。アルゴリズムが技能を一晩で古くする。資格試験は丸暗記。",
                askJa: "イギリスの学校で、お金のことは教わった?",
            },
            {
                engine: "fairness",
                light: [
                    "In theory, a stock exchange levels the playing field under one set of rules: the same price for everyone.",
                    "Strong regulators uphold basic human rights, like the right not to be cheated.",
                    "Credit scoring, done honestly, helps dismantle discrimination in decisions that shape lives.",
                    "Microloans narrow inequalities that are rooted in birth rather than effort.",
                ],
                dark: [
                    "In practice, high-frequency traders see the price a split second before you do, which widens the gap between the haves and the have-nots.",
                    "Algorithms trained on old data can fuel discrimination against groups already on the margins.",
                    "When a bank is too big to fail, it bends the rules to suit those in positions of power.",
                    "Predatory lenders trampled on basic human rights with impunity for years.",
                ],
                punch: "Everyone gets the same rules. Some people just get them a millisecond earlier.",
                ask: "Is anyone in finance ever really punished, in your opinion?",
                lightJa: "取引所は全員に同じ値段を出す。規制はだまされない権利を守り、少額融資が生まれの差を縮める。",
                darkJa: "高速取引は一瞬先に値段を見る。潰すには大きすぎる銀行はルールを曲げる。",
                askJa: "金融の人間が本当に罰せられることはあると思う?",
            },
            {
                engine: "freedom",
                light: [
                    "Clear information empowers individuals to make informed choices for themselves.",
                    "A free market champions free expression even for unpopular views: you can bet against anyone.",
                    "Owning your savings respects personal autonomy and lets people chart their own course.",
                    "Financial independence grants people the latitude to live as they see fit.",
                ],
                dark: [
                    "Inside the firms, groupthink limits choice and makes conformity the path of least resistance.",
                    "Strict compliance rules can have a chilling effect on free expression, so nobody raises the problem.",
                    "The job encroaches on personal autonomy in subtle but persistent ways, like phones that never stop buzzing at dinner.",
                    "Debt can easily curb freedoms that people take for granted, like changing careers.",
                ],
                punch: "Financial freedom is the product. The people selling it had none.",
                ask: "What would you do if money were no object?",
                lightJa: "正しい情報で自分で選べる。自分の貯金があれば、自分の道を自分で決められる。",
                darkJa: "社内では同調が一番楽な道。夕食中も鳴り続ける携帯。借金は転職の自由を奪う。",
                askJa: "お金の心配が無かったら、何をする?",
            },
            {
                engine: "trust",
                light: [
                    "Disclosure rules inject much-needed transparency into decisions made behind closed doors.",
                    "Journalists bring the truth to light for anyone to scrutinise, like the LIBOR scandal in 2012.",
                    "Fines and courts ensure accountability for those who wield power.",
                    "When a bank does the right thing, it reinforces social trust and restores faith in institutions.",
                ],
                dark: [
                    "But complex products shroud decision-making in secrecy and destroy transparency, because nobody can read them.",
                    "Marketing blurs the line between truth and fiction: every fund is \"low risk\" until it is not.",
                    "In 2008, most of the people at the top evaded accountability for their actions and kept their bonuses.",
                    "Scandals like the fake accounts at Wells Fargo in 2016 undermine public trust and sow deep division.",
                ],
                punch: "In 1997, when Yamaichi Securities collapsed, the president cried on TV and said the staff were not to blame. That is the only time I have seen a finance boss take the blame.",
                ask: "Do you trust your bank?",
                lightJa: "開示のルールが密室に光を入れる。2012年のLIBOR不正は記者が明るみに出した。",
                darkJa: "複雑な商品は誰にも読めない。2008年の上の人間は責任を逃れ、ボーナスを持ち帰った。2016年、ウェルズ・ファーゴの架空口座。",
                askJa: "自分の銀行を信用してる?",
            },
            {
                engine: "roots",
                light: [
                    "Local credit unions breathe new life into traditions at risk of disappearing, like the neighbourhood savings club.",
                    "A community bank nurtures a shared culture that binds communities together.",
                    "Family businesses anchor people's identity in a shared heritage, and a patient bank keeps them alive.",
                    "Good planning safeguards a heritage that has been passed down through generations.",
                ],
                dark: [
                    "But when a small bank is bought by a giant, the relationship is relegated to a call centre.",
                    "Branch closures water down a shared culture until it loses its meaning.",
                    "A collapse can plunge people into a crisis of identity overnight: one day you are a banker, the next day you are a box of belongings on the pavement.",
                    "Mass layoffs weaken the social fabric that holds communities together.",
                ],
                punch: "In 2008 the most famous photo from Lehman Brothers was not a chart. It was a man carrying a cardboard box.",
                ask: "Has your town lost its bank branches too?",
                lightJa: "地域の信用組合が昔の積み立ての集まりを生かし、家業を支える銀行が受け継いだものを守る。",
                darkJa: "大手に買われると、関係はコールセンターに追いやられる。破綻は一晩で、銀行員を段ボール箱を抱えた人にする。",
                askJa: "あなたの町でも、銀行の支店は消えていってる?",
            },
            {
                engine: "nature",
                light: [
                    "Long-term investors can conserve finite resources for generations to come by funding clean energy.",
                    "Climate risk now puts sustainability at the forefront of long-term planning in every big bank.",
                    "Green bonds help shield fragile ecosystems from irreversible damage.",
                    "The best investment sustains growth while striking a balance with nature.",
                ],
                dark: [
                    "But the same banks still finance projects that deplete finite resources at an alarming rate.",
                    "Quarterly reports sacrifice sustainability for the sake of short-term gain.",
                    "Speculation on food prices can push fragile ecosystems to the brink of collapse, and fragile families with them.",
                    "When a bubble bursts, it wreaks havoc on the real economy, just like Japan in the nineties.",
                ],
                punch: "Every bank has a green logo now. Most of them are still funding the smoke.",
                ask: "You work outside every morning. Do you think about where your pension money goes?",
                lightJa: "長期の投資家は、クリーンエネルギーに資金を出して資源を次の世代に残せる。",
                darkJa: "同じ銀行が資源を食いつぶす事業に貸す。バブルが弾ければ実体経済が壊れる。90年代の日本のように。",
                askJa: "毎朝外で働いていて、自分の年金のお金がどこに行ってるか考える?",
            },
        ],
        closing: [
            "So that's finance: a real engine for ordinary people, with a casino bolted on top.",
            "The light is real. I have seen a loan save a family business.",
            "The dark is real too. I have seen it take people apart, and I was one of them.",
            "That's why I left. Now I build walls and floors. Nobody can bail them out, so I build them properly.",
        ],
        closingAsk: "If you could change one thing about banks, what would it be?",
        shortRoute: [
            "money",
            "body",
            "trust",
        ],
        shortRouteJa: "25分なら3本。MONEY(2008年と救済)→ BODY(20代で家、40代で墓)→ TRUST(山一の社長の涙、ウェルズ・ファーゴ)。世界 → 自分の体 → 誰が責任を取るか、の順。",
        factsJa: [
            "2008年9月、米リーマン・ブラザーズが破綻し、世界的な金融危機になった。各国が銀行の救済に公的資金を入れた。",
            "1997年11月、山一證券が自主廃業を発表し、社長が記者会見で「社員は悪くありませんから」と泣きながら訴えた。",
            "2012年、LIBOR(銀行間の基準金利)の不正操作が明るみに出て、複数の大手銀行が巨額の罰金を科された。",
            "2016年、米ウェルズ・ファーゴで、顧客に無断で大量の口座が開設されていたことが発覚した。",
            "日本のバブル崩壊(1990年代初め)の後、不良債権で長い停滞が続いた。",
        ],
    },
];

export function getTalk(slug: string): CoreTalk | undefined {
    return CORE_TALKS.find((t) => t.slug === slug);
}

export interface PhraseHit {
    key: TrunkKey;
    phrase: string;
    meaning: string;
    /** light / dark のどちらの何文目に入っているか。無ければ -1 */
    side: 'light' | 'dark';
    sentence: number;
}

/** 指1本の8表現が、それぞれどの文に入っているか */
export function fingerHits(f: TalkFinger): PhraseHit[] {
    const para = FINGER_PARAGRAPHS.find((p) => p.engine === f.engine);
    if (!para) return [];
    return [...LIGHT_KEYS, ...DARK_KEYS].map((key) => {
        const side: 'light' | 'dark' = LIGHT_KEYS.includes(key) ? 'light' : 'dark';
        const [phrase, meaning] = para.phrases[key];
        const re = phraseRegex(phrase);
        const sentence = f[side].findIndex((s) => re.test(s));
        return { key, phrase, meaning, side, sentence };
    });
}

/** 原稿全体で80表現のうち何本が入っているか */
export function talkCoverage(t: CoreTalk): { used: number; total: number; missing: PhraseHit[] } {
    const hits = t.fingers.flatMap(fingerHits);
    const missing = hits.filter((h) => h.sentence < 0);
    return { used: hits.length - missing.length, total: hits.length, missing };
}

export function wordCount(lines: string[]): number {
    return lines.join(' ').split(/\s+/).filter(Boolean).length;
}
