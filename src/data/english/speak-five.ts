/**
 * SPEAK 5 — 5本の指で2分。英検1級 2次のスピーチ用。
 *
 * 【考え方】(2026-10-21 本人の設計)
 * - 2分は短い。入口で "I'll discuss three points: A, B, and most importantly, C." と言い切って始める
 * - A と B は前座。短い SVO の2文(主張 + 具体例)で片づける
 * - C が本当に言いたいこと。入口で most importantly と予告するので、時間切れで C が切れても本命は伝わる
 * - 指は CORE 5 の10本から5本に絞る。前座 = MONEY / TIME、本命 = FAIRNESS / TRUST / FREEDOM、予備 = NATURE
 * - 本命の段落は固定の4文 + 自分の1文。**本当に覚えるのは本命の3段落(+予備1)と入口・締めの枠だけ**
 *
 * 【試験の事実】(採点で誤解しないための前提)
 * - 試験官は C だけを見ていない。スピーチは全体の論理で見られ、続く約4分の質疑はスピーチの中身から来る
 *   → A と B は短くていいが、主張 + 具体例の2文は残す。質疑で A を突かれたときに沈まないため
 * - 2分で話の途中でも止められる → 本命を最後に置くなら、入口で予告しておく
 *
 * 【著作権】お題はすべて当ページのオリジナル。実際の検定試験の設問文は転載していない。
 * 本命の段落の英文は、本人のトレーニングカード(実際の発話・講師の発話)から組んでいる(fromCards に出典の日付)。
 *
 * 検査: scripts/verify-speak-five.cjs(固定文の一字一句、語数、指の割り当て、質疑で A を突く問いの有無)
 */

export type FiveId = 'money' | 'time' | 'fairness' | 'trust' | 'freedom' | 'nature';
export type FiveRole = 'opener' | 'main' | 'reserve';

export interface FromCard {
    en: string;
    date: string;      // カードを登録した日
    note: string;      // 誰の発話か
}

export interface FiveFinger {
    id: FiveId;
    en: string;        // 指の名前(入口の文で言う語)
    ja: string;
    role: FiveRole;
    color: string;
    job: string;       // この指で何を言うか(日本語)
    /** 本命・予備だけ: 固定の段落。{X} はテーマごとの名詞句。OWN の位置に自分の1文が入る */
    core?: string[];
    coreJa?: string[];
    fromCards?: FromCard[];
    /** 前座だけ: 2文の作り方 */
    howTo?: string[];
}

export const OWN = '__OWN__';

export const FIVE_FINGERS: FiveFinger[] = [
    {
        id: 'money', en: 'money', ja: 'お金', role: 'opener', color: '#B45309',
        job: '誰かの財布が増えるか減るか。数字か国の名前を1つ出す',
        howTo: [
            '1文目 = 主張。主語 + 動詞 + 目的語だけ(A cap would push rich people out.)',
            '2文目 = 具体例。国の名前か、数字を1つ(France had a wealth tax for decades.)',
        ],
    },
    {
        id: 'time', en: 'time', ja: '時間', role: 'opener', color: '#0369A1',
        job: '遅すぎる・間に合わない・積み上がる。今と未来を1回ずつ言う',
        howTo: [
            '1文目 = 主張。時間がかかる / 間に合わない / 積み上がる のどれか',
            '2文目 = 具体例。By the time ~ / ~ years / today ... tomorrow のどれか',
        ],
    },
    {
        id: 'fairness', en: 'fairness', ja: '公平', role: 'main', color: '#9A7B16',
        job: '誰が払って、誰が取り残されるか',
        core: [
            'But the most important point is fairness.',
            'The real question is who pays for {X}, and who gets left behind.',
            'Usually, it is the people with the least choice.',
            OWN,
            'A fair system should protect those people first.',
        ],
        coreJa: [
            'でも一番大事なのは公平さだ。',
            '本当の問題は、{X}の代償を誰が払い、誰が取り残されるかだ。',
            'たいていそれは、選べる余地がいちばん少ない人たちだ。',
            '(自分の1文)',
            '公平な仕組みなら、まずその人たちを守るべきだ。',
        ],
        fromCards: [
            { en: 'They should pay the lower-level workers more rather than pay the CEO less.', date: '2026-10-16', note: '講師(第139夜)。下を上げろ、上を下げるな' },
            { en: 'But who pays when those choices lead to diabetes? Ultimately, the healthcare system, and therefore all of us.', date: '2026-10-16', note: '模範解答の書き取り' },
            { en: 'Rich countries trashed the planet to get rich.', date: '2026-10-16', note: '本人の発話' },
        ],
    },
    {
        id: 'trust', en: 'trust', ja: '信頼', role: 'main', color: '#047857',
        job: 'その仕組みを誰が回すのか、その人を信じられるか',
        core: [
            'But the biggest problem is trust.',
            'Who would be in charge of {X}? The government.',
            'And governments leak money like a sieve. There are so many loopholes, and almost no transparency.',
            OWN,
            'If people cannot trust the system, it will not work, no matter how good it looks on paper.',
        ],
        coreJa: [
            'でも一番の問題は信頼だ。',
            '{X}を誰が仕切るのか。政府だ。',
            'そして政府はザルのように金を漏らす。抜け穴だらけで、透明性はほぼ無い。',
            '(自分の1文)',
            '人が仕組みを信じられなければ、紙の上でどれだけ良く見えても、うまくいかない。',
        ],
        fromCards: [
            { en: 'like a sieve / so many loopholes / no transparency / cut out the middleman', date: '2026-10-20', note: '本人の発話(第143夜、富の上限)' },
            { en: 'Nobody knows where the money goes.', date: '2026-10-16', note: '講師' },
            { en: 'It sounds good on paper, but ~', date: '2026-03-22', note: 'カードの定型' },
        ],
    },
    {
        id: 'freedom', en: 'freedom', ja: '自由', role: 'main', color: '#7C3AED',
        job: '政府が線を引き始めたら、どこで止まるのか',
        core: [
            'But the most important point is freedom.',
            'Once the government starts drawing the line on {X}, it rarely stops.',
            'Today it is one thing. Tomorrow it could be what we read and what we say.',
            OWN,
            'Governments should guard the doors, not read the letters.',
        ],
        coreJa: [
            'でも一番大事なのは自由だ。',
            '政府が{X}に線を引き始めたら、めったに止まらない。',
            '今日は1つのこと。明日は、私たちが何を読み、何を言うかになるかもしれない。',
            '(自分の1文)',
            '政府は扉を守るべきで、手紙を読むべきではない。',
        ],
        fromCards: [
            { en: 'Governments should guard the doors, not read the letters.', date: '2026-10-06', note: '本人の発話(サイバー対策のお題)' },
            { en: 'Governments are always looking to tell people what to do.', date: '2026-10-09', note: 'カード' },
        ],
    },
    {
        id: 'nature', en: 'nature', ja: '自然', role: 'reserve', color: '#15803D',
        job: '環境のお題が来たときだけ。未来の世代が払う',
        core: [
            'But the most important point is nature.',
            'Nature cannot vote, so someone has to speak for it.',
            'Future generations will pay for what we take today.',
            OWN,
            'In the long run, prevention is cheaper than recovery.',
        ],
        coreJa: [
            'でも一番大事なのは自然だ。',
            '自然は投票できない。だから誰かが代わりに声を上げなければならない。',
            '今日私たちが取ったものの代償は、未来の世代が払う。',
            '(自分の1文)',
            '長い目で見れば、予防は回復より安い。',
        ],
        fromCards: [
            { en: 'Future generations will pay for what we discard today.', date: '2026-10-12', note: '本人の発話(使い捨て文化のお題)' },
            { en: 'But the bottom line is, prevention is cheaper than recovery.', date: '2026-10-13', note: 'カード' },
        ],
    },
];

export const FINGER_BY_ID: Record<FiveId, FiveFinger> = Object.fromEntries(
    FIVE_FINGERS.map((f) => [f.id, f]),
) as Record<FiveId, FiveFinger>;

/** 入口と締めの枠。{STANCE} {C} {CONCESSION} {FINAL} を埋める。 */
export const OPENER_FRAME = '{STANCE} I will discuss three points: money, time, and most importantly, {C}.';
export const OPENER_FRAME_JA = '{立場}。3つの点を話す。お金、時間、そして一番大事な{C}。';
export const CONCEDE_FRAME = 'Admittedly, {CONCESSION} But it is a matter of degree.';
export const CONCEDE_FRAME_JA = 'たしかに、{譲歩}。でもそれは程度の問題だ。';
export const CLOSE_FRAME = 'So, because of money, time, and above all {C}, {FINAL}';
export const CLOSE_FRAME_JA = 'だから、お金、時間、そして何より{C}の理由で、{結論}。';

/** 話すときは短縮形で言う。データは検査のために短縮しない形で持ち、表示で短縮形に直す。 */
export const CONTRACTIONS: [string, string][] = [
    ['I will discuss', "I'll discuss"], ['it is a matter', "it's a matter"], ['it is the people', "it's the people"],
    ['Today it is one', "Today it's one"], ['cannot', "can't"], ['will not', "won't"], ['do not', "don't"],
    ['does not', "doesn't"], ['is not', "isn't"], ['are not', "aren't"], ['did not', "didn't"],
];

export function speakable(s: string): string {
    let out = s;
    for (const [a, b] of CONTRACTIONS) out = out.split(a).join(b);
    return out;
}

export interface FiveQA {
    target: 'A' | 'B' | 'C' | 'counter';
    q: string;
    a: string;
    aJa: string;
}

export interface FiveTheme {
    n: number;
    id: string;
    label: string;          // テーマの日本語ラベル
    family: string;         // こういう問いが来る(日本語)
    question: string;       // 当ページのオリジナルの問い
    questionJa: string;
    c: FiveId;              // 本命の指
    x?: string;             // 本命の段落の {X}
    stance: string;         // 入口1文目
    stanceJa: string;
    a: [string, string];    // MONEY の2文(主張・具体例)。"First, money." は表示側で付ける
    aJa: [string, string];
    b: [string, string];    // TIME の2文。"Second, time." は表示側で付ける
    bJa: [string, string];
    own: string;            // 本命の段落の自分の1文
    ownJa: string;
    concession: string;     // Admittedly, の後ろ(句点まで)
    concessionJa: string;
    punch?: string;         // 譲歩のあとの短い一言(任意)
    punchJa?: string;
    final: string;          // 締めの結論(句点まで)
    finalJa: string;
    qa: FiveQA[];
    flip: string;           // 逆の立場の入口1文
    flipJa: string;
}

export const FIVE_THEMES: FiveTheme[] = [
    {
        n: 1, id: 'wealth-cap', label: '富と格差', family: '富に上限を / 経営者の高額報酬 / 福祉で格差は縮むか',
        question: 'Should governments limit how rich a person can become?',
        questionJa: '政府は、人が持てる富に上限を設けるべきか。',
        c: 'trust', x: 'the extra money',
        stance: 'I do not think governments should limit how rich a person can become.',
        stanceJa: '政府が人の持てる富に上限を設けるべきだとは思わない',
        a: ['A cap would push rich people and their money out of the country.', 'France had a wealth tax for decades, and many wealthy people simply moved abroad.'],
        aJa: ['上限を作れば、金持ちとその金は国の外へ出ていく。', 'フランスには何十年も富裕税があり、多くの富裕層はただ国外へ移った。'],
        b: ['People start businesses because the reward has no ceiling.', 'If you cap the reward, fewer people will bother to take the risk.'],
        bJa: ['人が事業を始めるのは、見返りに天井が無いからだ。', '見返りに上限をつければ、わざわざ危険を取る人は減る。'],
        own: 'Charities are not much better. Some of them pay their CEOs huge salaries in the name of philanthropy.',
        ownJa: '慈善団体もたいして変わらない。慈善の名のもとに、トップに巨額の報酬を払うところもある。',
        concession: 'the wealth gap is real, and we cannot ignore it.',
        concessionJa: '格差は現実で、無視はできない',
        punch: 'Fair taxes, yes. A cap, no.',
        punchJa: '公平な税なら賛成。上限には反対。',
        final: 'I do not think a cap on wealth is the answer.',
        finalJa: '富の上限は答えではないと思う',
        qa: [
            { target: 'A', q: 'Would rich people really leave Japan?', a: 'Some would. Money moves faster than people. Even if they stay, their money can move abroad with one click.', aJa: '出ていく人はいる。金は人より速く動く。本人が残っても、金はワンクリックで国外へ移せる。' },
            { target: 'counter', q: 'But isn\'t inequality getting worse?', a: 'It is. But the answer is fair taxes and fewer loopholes, not a cap.', aJa: '悪くなっている。でも答えは公平な税と抜け穴を減らすことで、上限ではない。' },
            { target: 'C', q: 'Who should help the poor, then?', a: 'Start local. Communities know who is struggling. The government should support them, not replace them.', aJa: 'まず地域から。誰が困っているかは地域が知っている。政府はそれを支えるべきで、取って代わるべきではない。' },
        ],
        flip: 'I believe governments should limit how rich a person can become, because extreme wealth turns into political power.',
        flipJa: '政府は富に上限を設けるべきだと思う。極端な富は政治の力に変わるからだ。',
    },
    {
        n: 2, id: 'recession-spending', label: '景気と政府支出', family: '不況に財政出動 / 大型の公共事業 / 五輪は得か',
        question: 'Is spending more public money the best way to fight a recession?',
        questionJa: '公金をもっと使うことが、不況と戦う最善の方法か。',
        c: 'trust', x: 'the spending',
        stance: 'I do not think spending more public money is the best way to fight a recession.',
        stanceJa: '公金をもっと使うことが不況と戦う最善の方法だとは思わない',
        a: ['Every yen the government spends today is borrowed from tomorrow.', 'Compared to its economy, Japan already has the biggest public debt among rich countries.'],
        aJa: ['政府が今日使う1円は、明日から借りた1円だ。', '経済の大きさに比べると、日本はすでに先進国で最も大きな公的債務を抱えている。'],
        b: ['Big public projects are slow.', 'By the time a new bridge is finished, the recession is usually over.'],
        bJa: ['大きな公共事業は遅い。', '新しい橋ができあがる頃には、たいてい不況は終わっている。'],
        own: 'When governments hand out emergency money, a lot of it ends up in the wrong pockets.',
        ownJa: '政府が緊急の金を配ると、その多くが間違ったポケットに入る。',
        concession: 'people who lose their jobs need a safety net.',
        concessionJa: '職を失った人には安全網が要る',
        final: 'I would say tax cuts and support for small businesses work better than big spending.',
        finalJa: '大きな支出より、減税と中小企業への支援の方が効くと言いたい',
        qa: [
            { target: 'A', q: 'But doesn\'t Japan borrow mostly from its own people?', a: 'That is true, so it is not an emergency today. But someone still has to pay it back, and that is our children.', aJa: 'それは本当で、だから今日すぐ危機ではない。でも誰かが返さなければならず、それは子どもたちだ。' },
            { target: 'counter', q: 'Without spending, won\'t more people lose their jobs?', a: 'Some spending is necessary. My point is about how it is spent. Fast, small support beats slow, big projects.', aJa: 'ある程度の支出は必要だ。言いたいのは使い方。速くて小さな支援は、遅くて大きな事業に勝つ。' },
            { target: 'C', q: 'How can we make public spending more trustworthy?', a: 'Make every yen traceable. If people can see where the money goes, they will trust it more.', aJa: '1円単位で追えるようにする。金の行き先が見えれば、人はもっと信じる。' },
        ],
        flip: 'I believe spending more public money is the best way to fight a recession, because when people stop spending, someone has to start.',
        flipJa: '公金をもっと使うのが不況と戦う最善の方法だと思う。人が金を使わなくなったら、誰かが使い始めなければならないからだ。',
    },
    {
        n: 3, id: 'sugar-tax', label: '税', family: '健康のための課税 / 富裕税 / 消費税',
        question: 'Should sugary drinks be taxed to protect public health?',
        questionJa: '公衆衛生を守るために、砂糖入り飲料に課税すべきか。',
        c: 'fairness', x: 'the damage',
        stance: 'I believe a modest tax on sugary drinks is a good idea, as long as the money goes back into health.',
        stanceJa: '税収が健康に戻るなら、砂糖入り飲料への控えめな課税は良い考えだと思う',
        a: ['A small tax raises the price a little, and people buy less.', 'In Mexico, sales dropped, and in the UK, companies cut the sugar.'],
        aJa: ['少しの税で値段が少し上がり、人は買う量を減らす。', 'メキシコでは売上が落ち、英国では企業が砂糖を減らした。'],
        b: ['Changing habits takes years, so we need to start early.', 'Children who drink less sugar today will have healthier lives later.'],
        bJa: ['習慣を変えるには何年もかかるので、早く始める必要がある。', '今日砂糖を減らした子どもは、のちにもっと健康に生きる。'],
        own: 'When sugary drinks lead to diabetes, the healthcare system pays, and that means all of us.',
        ownJa: '砂糖入り飲料が糖尿病につながれば、医療制度が払う。つまり私たち全員だ。',
        concession: 'a tax like this hits poorer families harder.',
        concessionJa: 'こういう税は貧しい家庭に重くのしかかる',
        punch: 'A small tax, with the money going back into health, is fair.',
        punchJa: '税収が健康に戻る少額の税なら、公平だ。',
        final: 'I believe the tax is worth it.',
        finalJa: 'この税にはその価値があると思う',
        qa: [
            { target: 'A', q: 'Do people really buy less because of a small tax?', a: 'In Mexico, sales dropped after the tax started. And in the UK, companies cut the sugar in their drinks to avoid it.', aJa: 'メキシコでは課税が始まってから売上が落ちた。英国では、企業が課税を避けるために飲み物の砂糖を減らした。' },
            { target: 'counter', q: 'Shouldn\'t adults be free to drink what they want?', a: 'They are. Nobody is banning anything. The tax just makes the hidden cost visible.', aJa: '自由だ。誰も何も禁止していない。税は隠れたコストを見えるようにするだけだ。' },
            { target: 'C', q: 'How can the tax be fair to poorer families?', a: 'Use the money for them. Free water in schools and cheaper healthy food in poorer areas.', aJa: '税収をその家庭に使う。学校での無料の水、貧しい地域での安い健康的な食べ物。' },
        ],
        flip: 'I do not think sugary drinks should be taxed, because the government should not decide what adults drink.',
        flipJa: '砂糖入り飲料に課税すべきではない。大人が何を飲むかを政府が決めるべきではないからだ。',
    },
    {
        n: 4, id: 'unions', label: '働き方', family: '労働組合 / 週休3日 / 長時間労働',
        question: 'Do workers still need strong labor unions today?',
        questionJa: '今の時代も、働く人には強い労働組合が必要か。',
        c: 'fairness', x: 'cheaper products',
        stance: 'I believe workers still need strong unions today, maybe more than ever.',
        stanceJa: '今の時代も、働く人には強い組合が必要だと思う。むしろ今まで以上に',
        a: ['Without unions, companies can push wages down whenever they like.', 'In Japan, real wages have barely grown for thirty years.'],
        aJa: ['組合がなければ、会社は好きなときに賃金を押し下げられる。', '日本では、実質賃金が30年間ほとんど伸びていない。'],
        b: ['Unions fight for reasonable working hours.', 'Without them, unpaid overtime slowly becomes normal, and people burn out.'],
        bJa: ['組合は、まともな労働時間のために戦う。', '組合がなければ、サービス残業が少しずつ当たり前になり、人は燃え尽きる。'],
        own: 'Behind every cheap product, there is a worker who is paid too little, sometimes in a sweatshop overseas.',
        ownJa: 'すべての安い商品の裏に、安すぎる給料で働く人がいる。ときには海外の搾取工場で。',
        concession: 'unions can go too far. In some countries, strikes stop trains and even ambulances.',
        concessionJa: '組合は行きすぎることがある。国によっては、ストで電車や救急車まで止まる',
        punch: 'Fair pay, yes. Endless strikes, no.',
        punchJa: '公平な賃金なら賛成。終わらないストには反対。',
        final: 'I believe unions still matter, especially for part-time workers.',
        finalJa: '組合は今も大事だと思う。特にパートで働く人にとって',
        qa: [
            { target: 'A', q: 'Are low wages really the fault of weak unions?', a: 'Not only. But workers alone have almost no power to negotiate. Together, they do.', aJa: 'それだけではない。でも1人の働き手には交渉する力がほとんどない。まとまれば、ある。' },
            { target: 'counter', q: 'Don\'t strikes hurt ordinary people?', a: 'They can. That is why it is a balancing act. Strikes should be the last step, not the first.', aJa: '傷つけることはある。だからこれは釣り合いの問題だ。ストは最後の手段で、最初の手段ではない。' },
            { target: 'C', q: 'Who is left behind if unions disappear?', a: 'Part-time and contract workers. They already have the least protection.', aJa: 'パートと契約社員だ。すでに一番守られていない人たちだ。' },
        ],
        flip: 'I do not think workers need strong unions today, because strikes often hurt the public more than the company.',
        flipJa: '今の働き手に強い組合は要らないと思う。ストは会社より一般の人を傷つけることが多いからだ。',
    },
    {
        n: 5, id: 'foreign-workers', label: '外国人労働者', family: '移民の受け入れ / 人手不足 / 多文化社会',
        question: 'Should Japan welcome more foreign workers?',
        questionJa: '日本はもっと多くの外国人労働者を受け入れるべきか。',
        c: 'fairness', x: 'an aging society',
        stance: 'I believe Japan should welcome more foreign workers.',
        stanceJa: '日本はもっと多くの外国人労働者を受け入れるべきだと思う',
        a: ['Japan\'s population is shrinking, and the economy needs workers.', 'Foreign workers pay taxes and keep small businesses and care homes open.'],
        aJa: ['日本の人口は減っていて、経済には働き手が要る。', '外国人労働者は税金を払い、小さな商売や介護施設を続けさせている。'],
        b: ['Robots and AI will not be able to do every job for decades.', 'We need people now, not in thirty years.'],
        bJa: ['ロボットや AI が全部の仕事をするのは、何十年も先だ。', '必要なのは今の人手で、30年後ではない。'],
        own: 'Many foreign workers here do the hardest jobs for the lowest pay, and some do not even get proper contracts.',
        ownJa: 'この国の外国人労働者の多くは、一番きつい仕事を一番安い給料でやっている。まともな契約すら無い人もいる。',
        concession: 'people worry about crime and culture.',
        concessionJa: '人々は治安や文化を心配している',
        punch: 'With fair rules, it works.',
        punchJa: '公平なルールがあれば、うまくいく。',
        final: 'I believe Japan should open its doors wider, with fair rules for everyone.',
        finalJa: '日本は、全員に公平なルールのもとで、もっと門を開くべきだと思う',
        qa: [
            { target: 'A', q: 'Couldn\'t Japan just use more robots instead?', a: 'Some jobs, yes. But care work and construction still need human hands, and we need them now.', aJa: '一部の仕事はそう。でも介護や建設はまだ人の手が要り、それは今必要だ。' },
            { target: 'counter', q: 'Won\'t it change Japanese culture?', a: 'A little, maybe. But culture has always changed. Ramen came from China, after all.', aJa: '少しは変わるかもしれない。でも文化はいつも変わってきた。ラーメンだって中国から来た。' },
            { target: 'C', q: 'What would fair rules look like?', a: 'The same pay for the same work, and the right to change jobs. No one should be stuck with one employer.', aJa: '同じ仕事に同じ給料、そして職を変える権利。1つの雇い主に縛られる人がいてはいけない。' },
        ],
        flip: 'I do not think Japan should welcome many more foreign workers, because we should raise wages and use technology first.',
        flipJa: '日本が外国人労働者を大きく増やすべきだとは思わない。先に賃金を上げて技術を使うべきだからだ。',
    },
    {
        n: 6, id: 'rich-countries-pay', label: '豊かな国の責任', family: '途上国への援助 / 自然保護の費用 / 歴史的な責任',
        question: 'Should rich countries pay to protect nature in poorer countries?',
        questionJa: '豊かな国は、貧しい国の自然を守るために金を出すべきか。',
        c: 'fairness', x: 'a damaged planet',
        stance: 'I believe rich countries should pay to protect nature in poorer countries.',
        stanceJa: '豊かな国は、貧しい国の自然を守るために金を出すべきだと思う',
        a: ['Protecting a forest is much cheaper than fixing a flood or a drought later.', 'One dollar spent on prevention saves many dollars on recovery.'],
        aJa: ['森を守る方が、あとで洪水や干ばつを直すよりずっと安い。', '予防に使う1ドルは、回復に使う何ドルもを節約する。'],
        b: ['A forest takes a hundred years to grow and one week to cut down.', 'We do not have time to wait.'],
        bJa: ['森は育つのに100年かかり、切るのは1週間だ。', '待っている時間は無い。'],
        own: 'Rich countries trashed the planet to get rich, and now poorer countries are told not to do the same.',
        ownJa: '豊かな国は地球を荒らして豊かになった。そして今、貧しい国は同じことをするなと言われている。',
        concession: 'some of that money disappears into the wrong hands.',
        concessionJa: 'その金の一部は、間違った手に消える',
        punch: 'With transparency, it works.',
        punchJa: '透明性があれば、うまくいく。',
        final: 'I believe rich countries should pay their share.',
        finalJa: '豊かな国は自分の分を払うべきだと思う',
        qa: [
            { target: 'A', q: 'Is prevention really cheaper?', a: 'Usually, yes. A healthy forest stops floods for free. Rebuilding a town after a flood costs a fortune.', aJa: 'たいていそうだ。健康な森はタダで洪水を止める。洪水のあとに町を建て直すには大金がかかる。' },
            { target: 'counter', q: 'Shouldn\'t poorer countries protect their own nature?', a: 'They should. But asking them to stay poor while we stayed rich is not fair.', aJa: 'そうすべきだ。でも、私たちは豊かなままで、彼らには貧しいままでいろと言うのは公平ではない。' },
            { target: 'C', q: 'Who gets left behind if nobody pays?', a: 'Local people who depend on the forest, and every future generation.', aJa: '森に頼って暮らす地元の人、そしてこれからのすべての世代だ。' },
        ],
        flip: 'I do not think rich countries should pay, because the money often ends up with corrupt officials, not the forests.',
        flipJa: '豊かな国が払うべきだとは思わない。その金は森ではなく、腐敗した役人に行き着くことが多いからだ。',
    },
    {
        n: 7, id: 'online-monitoring', label: '規制と監視', family: '個人データ / ネットの監視 / サイバー対策',
        question: 'Should governments monitor what people do online in order to fight crime?',
        questionJa: '犯罪と戦うために、政府は人々のネット上の行動を監視すべきか。',
        c: 'freedom', x: 'online activity',
        stance: 'I do not think governments should monitor what we do online, even to fight crime.',
        stanceJa: '犯罪と戦うためでも、政府が私たちのネット上の行動を監視すべきだとは思わない',
        a: ['Mass monitoring is expensive, and most of the data is useless.', 'That money could pay for more police officers instead.'],
        aJa: ['大規模な監視は高くつき、データのほとんどは役に立たない。', 'その金で、代わりに警察官を増やせる。'],
        b: ['Criminals simply move to new apps.', 'The government is always one step behind.'],
        bJa: ['犯罪者はさっさと新しいアプリに移る。', '政府はいつも一歩遅れている。'],
        own: 'In some countries, people have been arrested just for a post on social media.',
        ownJa: '国によっては、SNS に1回投稿しただけで逮捕された人がいる。',
        concession: 'some crimes do happen online, and we need tools to stop them.',
        concessionJa: 'ネット上で起きる犯罪は実際にあり、止める手段は要る',
        punch: 'Targeted checks with a warrant, yes. Watching everyone, no.',
        punchJa: '令状のある絞った調査なら賛成。全員の監視には反対。',
        final: 'I do not think mass monitoring is the answer.',
        finalJa: '大規模な監視は答えではないと思う',
        qa: [
            { target: 'A', q: 'Isn\'t the data useful for catching terrorists?', a: 'Sometimes. But finding one person in a billion messages is like finding a needle in a haystack.', aJa: '役立つこともある。でも10億件のメッセージから1人を探すのは、干し草の山から針を探すようなものだ。' },
            { target: 'counter', q: 'If you have nothing to hide, why worry?', a: 'Because the rules can change. What is legal today might not be legal tomorrow.', aJa: 'ルールは変わりうるからだ。今日合法なことが、明日も合法とは限らない。' },
            { target: 'C', q: 'Where should the line be?', a: 'A judge should decide, case by case. Not a computer watching everyone.', aJa: '裁判官が1件ずつ決めるべきだ。全員を見張るコンピュータではない。' },
        ],
        flip: 'I believe governments should be able to monitor online activity, because most crime has moved online.',
        flipJa: '政府はネット上の行動を監視できるべきだと思う。犯罪のほとんどがネットに移ったからだ。',
    },
    {
        n: 8, id: 'people-and-politics', label: '民主主義と参加', family: '個人の行動で政治は変わるか / 投票率 / 若い政治家',
        question: 'Can ordinary people really change politics?',
        questionJa: '普通の人々は、本当に政治を変えられるか。',
        c: 'trust', x: 'real change',
        stance: 'I believe ordinary people can change politics, but only if they start locally.',
        stanceJa: '普通の人々は政治を変えられると思う。ただし地域から始めるなら',
        a: ['Big companies spend millions on lobbying.', 'But ordinary people have something they do not have: votes.'],
        aJa: ['大企業はロビー活動に何百万も使う。', 'でも普通の人々は、大企業に無いものを持っている。票だ。'],
        b: ['Change is slow, but it adds up.', 'Small local wins today can become national laws tomorrow.'],
        bJa: ['変化は遅いが、積み上がる。', '今日の地域の小さな勝利が、明日の国の法律になりうる。'],
        own: 'That is why change has to start locally. In my city, we can watch our local politicians closely.',
        ownJa: 'だから変化は地域から始めなければならない。私の市では、地元の政治家を近くで見張れる。',
        concession: 'one person\'s voice is small.',
        concessionJa: '1人の声は小さい',
        punch: 'Start local, and keep watching.',
        punchJa: '地域から始めて、見張り続けること。',
        final: 'I believe ordinary people can change politics, one town at a time.',
        finalJa: '普通の人々は政治を変えられると思う。1つの町ずつ',
        qa: [
            { target: 'A', q: 'Can votes really beat lobbying money?', a: 'Not every time. But money cannot vote. Politicians who ignore voters lose their jobs.', aJa: '毎回ではない。でも金は投票できない。有権者を無視する政治家は職を失う。' },
            { target: 'counter', q: 'Why do so few young people vote, then?', a: 'Because they do not see the results. Local politics shows results faster.', aJa: '結果が見えないからだ。地域の政治の方が、結果が早く見える。' },
            { target: 'C', q: 'How can people trust politicians again?', a: 'By watching them. Trust is not given. It is checked.', aJa: '見張ることで。信頼は与えられるものではない。確かめるものだ。' },
        ],
        flip: 'I do not think ordinary people can really change politics, because big money decides who wins.',
        flipJa: '普通の人々が本当に政治を変えられるとは思わない。大きな金が誰が勝つかを決めるからだ。',
    },
    {
        n: 9, id: 'ai-rules', label: '技術と規制', family: 'AI の規制 / 宇宙開発の費用 / 新しい医療',
        question: 'Should artificial intelligence be strictly controlled by governments?',
        questionJa: '人工知能は、政府によって厳しく管理されるべきか。',
        c: 'freedom', x: 'AI',
        stance: 'I do not think AI should be strictly controlled by governments.',
        stanceJa: 'AI が政府に厳しく管理されるべきだとは思わない',
        a: ['Strict rules are expensive, and only big companies can afford them.', 'Small startups would be pushed out of the market.'],
        aJa: ['厳しい規制は高くつき、それを払えるのは大企業だけだ。', '小さな新興企業は市場から追い出される。'],
        b: ['AI changes every few months, but laws take years to pass.', 'The rules would be out of date before they even start.'],
        bJa: ['AI は数か月ごとに変わるが、法律が通るには何年もかかる。', '規制は始まる前に古くなる。'],
        own: 'If the government decides what AI can say, it is also deciding what we can ask.',
        ownJa: 'AI が何を言えるかを政府が決めるなら、それは私たちが何を聞けるかも決めていることになる。',
        concession: 'AI can be misused, for scams and fake news.',
        concessionJa: 'AI は詐欺や偽ニュースに悪用されうる',
        punch: 'Clear basic rules, yes. Strict control, no.',
        punchJa: 'はっきりした基本のルールなら賛成。厳しい管理には反対。',
        final: 'I do not think strict control is the answer.',
        finalJa: '厳しい管理は答えではないと思う',
        qa: [
            { target: 'A', q: 'Aren\'t big tech companies already too powerful?', a: 'They are. And strict rules would make them even stronger, because only they can pay for them.', aJa: 'そうだ。そして厳しい規制は彼らをさらに強くする。払えるのは彼らだけだからだ。' },
            { target: 'counter', q: 'What about deepfakes and scams?', a: 'Punish the people who use AI to cheat. Do not ban the tool.', aJa: 'AI を使ってだます人を罰する。道具を禁止するのではない。' },
            { target: 'C', q: 'Who should decide the basic rules?', a: 'Many countries together, in the open. Not one government behind closed doors.', aJa: '多くの国が一緒に、公開の場で。1つの政府が密室で決めるのではない。' },
        ],
        flip: 'I believe AI should be strictly controlled, because it is moving faster than we can understand it.',
        flipJa: 'AI は厳しく管理されるべきだと思う。私たちが理解できるより速く進んでいるからだ。',
    },
    {
        n: 10, id: 'climate-action', label: '環境とエネルギー', family: '気候変動に政府は / 原発 / 再生可能エネルギー',
        question: 'Should governments act on climate change even if it slows the economy?',
        questionJa: '経済が減速するとしても、政府は気候変動に対して行動すべきか。',
        c: 'nature',
        stance: 'I believe governments should act on climate change now, even if it slows the economy a little.',
        stanceJa: '経済が少し減速するとしても、政府は今、気候変動に対して行動すべきだと思う',
        a: ['Disasters are already very expensive for Japan.', 'Floods, typhoons, and heatwaves cost more every single year.'],
        aJa: ['災害はすでに日本にとってとても高くついている。', '洪水、台風、熱波の被害額は、毎年増えている。'],
        b: ['Every year we wait makes the problem bigger and the damage worse.', 'And the solution gets harder and more expensive.'],
        bJa: ['待つ1年ごとに、問題は大きくなり、被害はひどくなる。', 'そして解決は難しく、高くなる。'],
        own: 'In Japan, summers are already dangerously hot, and heatstroke sends tens of thousands of people to hospital every year.',
        ownJa: '日本の夏はすでに危険なほど暑く、熱中症で毎年何万人もが病院に運ばれている。',
        concession: 'some industries will lose jobs.',
        concessionJa: '仕事を失う産業もある',
        punch: 'A slower economy today beats a broken planet tomorrow.',
        punchJa: '今日の遅い経済は、明日の壊れた地球よりましだ。',
        final: 'I believe governments should act now, not ten years from now.',
        finalJa: '政府は10年後ではなく、今行動すべきだと思う',
        qa: [
            { target: 'A', q: 'Can Japan really afford it right now?', a: 'We cannot afford not to. Every disaster we fail to prevent costs more than the prevention would have.', aJa: '払わないわけにはいかない。防げなかった災害は、防ぐ費用より高くつく。' },
            { target: 'counter', q: 'Japan is a small part of global emissions. Why should we go first?', a: 'Because our technology can help other countries. If we lead, others can follow more cheaply.', aJa: '日本の技術が他の国を助けられるからだ。先に行けば、他の国はもっと安くついて来られる。' },
            { target: 'C', q: 'Who speaks for future generations?', a: 'Voters today have to. They cannot vote yet, so we have to think for them.', aJa: '今日の有権者がそうするしかない。彼らはまだ投票できないので、私たちが代わりに考えるしかない。' },
        ],
        flip: 'I do not think governments should slow the economy for climate change, because poorer people pay the highest price for a weak economy.',
        flipJa: '気候変動のために政府が経済を減速させるべきではない。弱い経済の一番高い代償を払うのは貧しい人だからだ。',
    },
];

/** 1本のスピーチを、話す順に並べた文の列にする。表示もこの関数だけを使う。 */
export interface SpeechPart {
    key: 'open' | 'a' | 'b' | 'c' | 'close';
    label: string;
    target: number;     // 目安の秒数
    lines: { en: string; ja: string; fixed: boolean }[];
}

export function buildSpeech(t: FiveTheme): SpeechPart[] {
    const f = FINGER_BY_ID[t.c];
    const fill = (s: string) => s.split('{X}').join(t.x ?? '');
    const core = (f.core ?? []).map((s, i) => (s === OWN
        ? { en: t.own, ja: t.ownJa, fixed: false }
        : { en: fill(s), ja: (f.coreJa?.[i] ?? '').split('{X}').join(t.x ?? ''), fixed: true }));
    const close = [
        { en: CONCEDE_FRAME.replace('{CONCESSION}', t.concession), ja: `たしかに、${t.concessionJa}。でもそれは程度の問題だ。`, fixed: false },
        ...(t.punch ? [{ en: t.punch, ja: t.punchJa ?? '', fixed: false }] : []),
        { en: CLOSE_FRAME.replace('{C}', f.en).replace('{FINAL}', t.final), ja: `だから、お金、時間、そして何より${f.ja}の理由で、${t.finalJa}。`, fixed: false },
    ];
    return [
        {
            key: 'open', label: '入口', target: 10,
            lines: [{ en: OPENER_FRAME.replace('{STANCE}', t.stance).replace('{C}', f.en), ja: `${t.stanceJa}。3つの点を話す。お金、時間、そして一番大事な${f.ja}。`, fixed: false }],
        },
        {
            key: 'a', label: 'A 前座 money', target: 20,
            lines: [{ en: `First, money. ${t.a[0]}`, ja: `まず、お金。${t.aJa[0]}`, fixed: false }, { en: t.a[1], ja: t.aJa[1], fixed: false }],
        },
        {
            key: 'b', label: 'B 前座 time', target: 20,
            lines: [{ en: `Second, time. ${t.b[0]}`, ja: `次に、時間。${t.bJa[0]}`, fixed: false }, { en: t.b[1], ja: t.bJa[1], fixed: false }],
        },
        { key: 'c', label: `C 本命 ${f.en}`, target: 50, lines: core },
        { key: 'close', label: '譲歩と締め', target: 20, lines: close },
    ];
}

export function wordCount(s: string): number {
    return s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

export function speechWords(t: FiveTheme): number {
    return buildSpeech(t).reduce((n, p) => n + p.lines.reduce((m, l) => m + wordCount(speakable(l.en)), 0), 0);
}

/** 試験官役を頼む英文(DMM の講師に読む) */
export const EXAMINER_REQUEST = {
    en: "Today, could you be my examiner? I'll give a two-minute speech. Please stop me at two minutes, even in the middle of a sentence. Then grill me on my first point, not my last one. Don't go easy on me.",
    ja: '今日は試験官をお願いできますか。2分のスピーチをします。文の途中でも2分で止めてください。そのあと、最後の点ではなく最初の点を突っ込んで質問してください。手加減しないでください。',
};

/** 音声 AI に質疑だけを頼む英文 */
export const AI_QA_PROMPT = {
    en: "I'll read you a two-minute speech. Don't comment on it. Ask me three questions, one at a time. Make the first question about my first point. After each answer, correct my English first, in one line. No praise.",
    ja: 'これから2分のスピーチを読む。感想は要らない。質問を3つ、1つずつ。最初の質問は1つ目の点について。答えるたびに、まず私の英語を1行で直して。褒めない。',
};

/** 台帳の3つのチェック */
export const DRILL_CHECKS = [
    { id: 'said', label: '骨を言えた', hint: '紙を見ずに、入口から締めまで1回' },
    { id: 'examiner', label: 'DMM で試験官', hint: '講師に止めてもらい、A を突かれた' },
    { id: 'flip', label: '逆の立場', hint: '本心と逆の入口で1回話した' },
] as const;
