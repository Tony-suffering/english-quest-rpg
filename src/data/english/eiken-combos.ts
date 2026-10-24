/**
 * COMBOS -- 30に無いお題を、その場で組んで見せる実演。
 *
 * 【これが何の証明か】
 * 「30テーマ+24ムーブを覚えれば、知らないお題が来ても答えを組める」の実物証拠。
 * 各コンボの行には src が付く: どのテーマのどの部品から借りたか。
 * src:'new' の行(=そのお題専用に新しく足した具体例)は1コンボ2行まで。
 * つまり答えの8割は在庫から出ていて、新規は小さな具体例1つだけ、が見える。
 *
 * CEO報酬(Are high compensation packages for CEOs warranted?)はコンボですらなく
 * テーマ22の直撃弾なので、ここには入れない。ここにあるのは30のどれでもないお題。
 */

import type { Combo } from './eiken-theme30-types';

export const COMBOS: Combo[] = [
    {
        no: 1,
        q: "Should unhealthy food be taxed?",
        qJa: "不健康な食品に課税すべきか",
        themes: ['who-pays', 'illness'],
        newFact: "メキシコの砂糖税(2014)だけ新規。あとはテーマ1の負担の議論とテーマ9の生活習慣の議論の在庫",
        lines: [
            { en: "So we are really asking who pays for other people's dinner. Okay.", ja: "つまり、他人の夕食の分を誰が払うのかという話ですね。", m: ['reframe'], src: 't1:hook' },
            { en: "The tax sounds fair until you ask who actually pays it.", ja: "その税は公平に聞こえる。実際に誰が払うのかを聞くまでは。", m: ['who-pays'], src: 't1:no' },
            { en: "Cheap calories are what you eat when the good food is far and the shift is long. So the tax lands on the poorest table in town.", ja: "安いカロリーは、まともな食品が遠くて勤務が長い人が食うものだ。だからその税は町で一番貧しい食卓に落ちる。", m: ['who-pays', 'picture'], src: 't1:no' },
            { en: "But we did run this experiment. Mexico taxed sugary drinks, and sales actually fell.", ja: "ただ、この実験は走っている。メキシコが砂糖飲料に課税して、売上は実際に落ちた。", m: ['tried', 'concede-pivot'], src: 'new' },
            { en: "And almost every illness has some choice in it, and almost none of it is only choice.", ja: "ほぼ全ての病気には選択が含まれていて、ほぼ全ての病気は選択だけではない。", m: ['both-true', 'echo'], src: 't9:deeper' },
            { en: "So tax it if you must. But send the money back as cheap real food, not as a lecture.", ja: "だから課税するならすればいい。ただ、その金は説教ではなく安いまともな食品として返せ。", m: ['own-cost', 'land-short'], src: 't1:yes' },
        ],
        note: "6行のうち新規は1行。負担の議論(テーマ1)と病気と選択の議論(テーマ9)が、食品のお題をそのまま吸収する。",
    },
    {
        no: 2,
        q: "Should school uniforms be required?",
        qJa: "制服を義務にすべきか",
        themes: ['why-learn', 'what-you-can-say'],
        newFact: "新規は「制服は最も安い平等」の一行だけ。表現の自由の議論(テーマ6)と学校の目的の議論(テーマ4)の在庫で組む",
        lines: [
            { en: "Depends what we mean by required, honestly. Half this argument is people answering two different questions.", ja: "正直、「義務」で何を指すか次第だ。この議論の半分は別々の問いに答えている人同士でできている。", m: ['define'], src: 't4:universal' },
            { en: "One side says it kills expression. The other says it kills competition. Both of those are true at the same time.", ja: "片方は表現を殺すと言い、片方は競争を殺すと言う。その両方が同時に本当だ。", m: ['both-true', 'echo'], src: 't6:universal' },
            { en: "A uniform is the cheapest equality a school can buy. Nobody reads your family's income off your jacket.", ja: "制服は学校が買える一番安い平等だ。上着から家の収入を読まれることがない。", m: ['rename', 'picture'], src: 'new' },
            { en: "And the expression argument is smaller than it sounds. The kids express plenty. Shoes, bags, hair. Kids always find the gap.", ja: "表現の議論は聞こえより小さい。生徒は十分表現している。靴、鞄、髪。子どもは必ず隙間を見つける。", m: ['feel-vs-fact', 'picture'], src: 't6:no' },
            { en: "What I would not do is write rules for the worst imaginable student. Those rules always land on the ordinary one.", ja: "やらないほうがいいのは、想像しうる最悪の生徒のために規則を書くことだ。その規則は必ず普通の生徒に落ちる。", m: ['switch'], src: 't6:no' },
            { en: "Keep the uniform. Lose the ruler that measures skirts.", ja: "制服は残せ。スカートを測る定規は捨てろ。", m: ['land-short', 'echo'], src: 't6:no' },
        ],
        note: "学校のお題に見えて、実体は「平等の値段(テーマ4)」と「規則は誰に使われるか(テーマ6)」。在庫の議論2本がそのまま刺さる。",
    },
    {
        no: 3,
        q: "Is space tourism acceptable while people still live in poverty?",
        qJa: "貧困が残る中での宇宙旅行は許されるか",
        themes: ['spectacle', 'who-pays'],
        newFact: "新規は「初期の飛行機も金持ちの玩具だった」の一行。祭りの議論(テーマ10)と分配の議論(テーマ1)の在庫",
        lines: [
            { en: "So we are asking whether the rich are allowed to buy a view. Okay.", ja: "つまり、金持ちが眺めを買うことは許されるのか、という話ですね。", m: ['reframe'], src: 't10:hook' },
            { en: "The anger is easy to feel. A ten-minute ride costs what a nurse earns in a lifetime.", ja: "怒りは簡単に湧く。十分の飛行に、看護師の生涯収入と同じ額がかかる。", m: ['picture', 'one-number'], src: 't10:no' },
            { en: "But be careful with the arithmetic. Stopping the rocket does not feed anyone. The money was never queueing for the food bank.", ja: "ただ、算数には気をつけたい。ロケットを止めても誰の腹も満ちない。あの金はもともと食料配給の列に並んでいない。", m: ['compare', 'concede-pivot'], src: 't1:no' },
            { en: "Early aeroplanes were rich men's toys too. Twenty years later they carried mail, medicine and everybody else.", ja: "初期の飛行機も金持ちの玩具だった。二十年後には郵便と薬と、それ以外の全員を運んでいた。", m: ['tried', 'speed'], src: 'new' },
            { en: "So my problem is not the tourists. It is the tax bill. If the fortune that buys the ticket was taxed like a salary, I have no complaint left.", ja: "だから問題は観光客じゃない。税のほうだ。切符を買うその財産に給料と同じ税がかかっているなら、もう文句は残らない。", m: ['rename', 'who-pays'], src: 't22:no' },
            { en: "Tax the fortune. Let them float.", ja: "財産に課税しろ。あとは浮かせておけ。", m: ['land-short', 'echo'], src: 't22:no' },
        ],
        note: "宇宙のお題に見えて、実体は「見世物と誇りの金(テーマ10)」と「上の取り分(テーマ22)」。結論をテーマ22から借りると一段深く終われる。",
    },
    {
        no: 4,
        q: "Should governments run casinos to raise public money?",
        qJa: "公費を稼ぐために政府がカジノを運営してよいか",
        themes: ['who-pays', 'spectacle'],
        newFact: "新規は「宝くじは貧しい人の税」の一行。負担の議論(テーマ1)と誘因の議論、祭りの経済(テーマ10)の在庫",
        lines: [
            { en: "So the state wants a share of the losing. Let me say the question back like that, because that is what it is.", ja: "つまり国家は「負け」の分け前が欲しい。そう言い直させてもらう。実際そうだからだ。", m: ['reframe', 'rename'], src: 't1:hook' },
            { en: "The revenue is real. That is a fair point and I will not wave it away.", ja: "税収は本物だ。それはもっともな点で、手を振って消したりはしない。", m: ['concede-pivot', 'own-cost'], src: 't10:yes' },
            { en: "But ask where the money walks in from. Casino income is not created. It is collected, mostly from the people who can least afford the visit.", ja: "ただ、その金がどこから歩いてくるかを問え。カジノの収入は生まれるんじゃない。集められる。しかも大半は、一番通う余裕のない人たちから。", m: ['who-pays'], src: 't1:no' },
            { en: "We already know this machine. Lotteries are called a tax on the poor, and the numbers back the nickname.", ja: "この機械のことはもう知っている。宝くじは貧者の税と呼ばれていて、数字がそのあだ名を裏づけている。", m: ['tried', 'rename'], src: 'new' },
            { en: "And once the budget depends on the losing, the state needs you to keep losing. That is a bad thing for a government to need.", ja: "そして予算が「負け」に依存した瞬間、国家はこっちが負け続けることを必要とする。政府が必要としていいものじゃない。", m: ['counted'], src: 't1:no' },
            { en: "The party lasts one night. The dependence lasts forty years.", ja: "祭りは一晩。依存は四十年。", m: ['echo', 'land-short'], src: 't10:no' },
        ],
        note: "カジノのお題に見えて、実体は「誰が払うか(テーマ1)」+「数えた数字に従う」+「祭りの時間差(テーマ10)」。締めはテーマ10の型の差し替え。",
    },
    {
        no: 5,
        q: "Should cash be phased out completely?",
        qJa: "現金を完全に廃止すべきか",
        themes: ['being-watched', 'machine-crutch'],
        newFact: "新規は「停電の日、現金の店だけ開いていた」の一行。監視の議論(テーマ7)と依存の議論(テーマ24)の在庫",
        lines: [
            { en: "So we are asking whether every purchase should leave a footprint. That is the real question.", ja: "つまり、すべての買い物が足跡を残すべきか、という話ですね。それが本当の問いだ。", m: ['reframe'], src: 't7:hook' },
            { en: "Convenient? Completely. I tap my phone all day like everyone else.", ja: "便利か？ 完全に。俺も一日中、他の全員と同じように端末をかざしている。", m: ['self-joke', 'concede-pivot'], src: 't7:no' },
            { en: "But cash is the last purchase that nobody watches. Every other payment is a record with your name on it.", ja: "ただ、現金は誰にも見られない最後の買い物だ。それ以外の支払いは全部、名前付きの記録になる。", m: ['rename', 'picture'], src: 't7:yes' },
            { en: "Once a thing is recorded, somebody will eventually use it in a way nobody signed up for.", ja: "いったん記録されたものは、いずれ誰も同意していない使われ方をする。", m: ['switch'], src: 't7:yes' },
            { en: "And when the network went down after the earthquake, the shops that stayed open were the cash ones.", ja: "それに地震で回線が落ちた日、開いていられた店は現金の店だった。", m: ['tried', 'picture'], src: 'new' },
            { en: "A skill you never use is a skill you no longer have. The same is true of a freedom.", ja: "使わない技能は、もう持っていない技能だ。自由も同じだ。", m: ['echo', 'land-short'], src: 't24:origin' },
        ],
        note: "キャッシュレスのお題に見えて、実体は「見られること(テーマ7)」+「使わないものは失う(テーマ24)」。締めの一般化で技能の議論が自由の議論に転用できる。",
    },
];

export const TOTAL_COMBOS = COMBOS.length;
