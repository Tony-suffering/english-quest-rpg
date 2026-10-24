/**
 * THEME 30 -- テーマ21, 23, 24, 25。
 * 見本は eiken-theme30-d.ts のテーマ22。行のムーブタグ、数字の丸め方、
 * yes/no の対立のさせ方、deeper での代償の認め方は全部そこに合わせている。
 */

import type { Theme } from './eiken-theme30-types';

export const THEMES_E: Theme[] = [
    {
        no: 21, id: 'one-market', label: '世界がひとつの市場', en: 'One World Market',
        field: 'money',
        owns: '経済が国境を越える話すべて。グローバル化、自由貿易協定、外資への依存、サプライチェーン、自給自足。「開くか閉じるか」の金の話はここが担当',
        sourceDays: [5, 26, 9],
        hook: "So we are really asking who wins when money crosses borders. Okay.",
        hookJa: "つまり本当の問いは、金が国境を越えるとき誰が勝つのか、ですね。",
        universal: "貿易の得は全員に薄く撒かれ、痛みは一つの町に丸ごと落ちる。静かな一億人の勝者と、工場を失った一つの町の大声。この議論がいつも噛み合わないのはそのせいだ。",
        universalEn: "The gains from trade land thin and wide. The pain lands thick and narrow. A hundred million quiet winners, and one loud town that lost its plant.",
        angles: [
            { label: '規模', en: "Extreme poverty fell by about a billion people in a generation. Trade carried most of that.", ja: "極度の貧困は一世代で約十億人分減った。その大半を運んだのは貿易だ。" },
            { label: '箱', en: "One steel box made shipping almost free. The container built the world we shop in.", ja: "鉄の箱ひとつが輸送をほぼタダにした。コンテナが、今の買い物の世界を作った。" },
            { label: '町', en: "The winners are spread across the map. The losers all live on the same street.", ja: "勝者は地図全体に散らばっている。敗者は全員、同じ通りに住んでいる。" },
            { label: '綱', en: "Connected also means exposed. One ship got stuck in one canal, and shelves thinned worldwide.", ja: "つながっているとは、さらされているということでもある。船が一隻、運河で詰まっただけで、世界中の棚が薄くなった。" },
        ],
        origin: {
            day: 5, essay: "Yes, globalization is a positive force (day 5). Trade deals are valuable but not the single best path (day 26). Foreign investment matters (day 9).",
            stance: "Open the world, but build the engine at home",
            stanceJa: "世界には開け。ただしエンジンは自前で作れ",
            lines: [
                { en: "Start with the big fact. Extreme poverty fell by about a billion people in a generation.", ja: "でかい事実から始める。極度の貧困は一世代で約十億人分減った。", m: ['one-number'] },
                { en: "Open markets did the heavy lifting there. Poor countries sold things and climbed.", ja: "そこで重い物を持ち上げたのは開かれた市場だ。貧しい国は物を売って、登った。", m: ['tried'] },
                { en: "But I do not worship the paperwork. A deal opens a door. It does not teach you to walk.", ja: "ただ、協定書を拝む気はない。協定はドアを開ける。歩き方までは教えてくれない。", m: ['rename', 'echo'] },
                { en: "South Korea got rich on schools, labs, and patient money at home. The deals came later.", ja: "韓国は学校と研究所と、国内の気長な金で豊かになった。協定は後から来た。", m: ['tried'] },
                { en: "So trade is the road, not the engine. Build the engine yourself.", ja: "つまり貿易は道であって、エンジンじゃない。エンジンは自分で作れ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, more good than harm, and it is not close",
            stanceJa: "害より益。しかも僅差ですらない",
            lines: [
                { en: "Judge what happened, not what it felt like.", ja: "起きたことで判定しろ。どう感じたかじゃなく。", m: ['feel-vs-fact'] },
                { en: "About a billion people left extreme poverty in one generation. Aid did not do that. Trade did.", ja: "一世代で約十億人が極度の貧困を抜けた。援助がやったんじゃない。貿易がやった。", m: ['one-number', 'echo'] },
                { en: "That is not a line on a chart. That is whole countries eating dinner.", ja: "それはグラフの線じゃない。国が丸ごと晩飯を食えているという話だ。", m: ['picture', 'rename'] },
                { en: "We wanted cheap shirts. We also got the biggest escape from hunger in history.", ja: "俺たちは安いシャツが欲しかった。ついでに史上最大の、飢えからの脱出も手に入った。", m: ['echo'] },
                { en: "The other experiment ran too. Same people, one border, and the lights stop at the line.", ja: "逆の実験ももう走った。同じ民族、国境一本。そして夜の灯りは、線のところで止まっている。", m: ['tried', 'picture'] },
                { en: "An open door has draughts. It still beats a wall.", ja: "開いたドアは隙間風が入る。それでも壁よりはいい。", m: ['compare', 'land-short'] },
            ],
        },
        no: {
            stance: "No, because the bill was sent to people who never signed",
            stanceJa: "駄目だ。請求書が、署名していない人間に送られたから",
            lines: [
                { en: "My problem is not the theory. It is the address where the pain gets delivered.", ja: "引っかかるのは理屈じゃない。痛みの配達先だ。", m: ['reframe', 'who-pays'] },
                { en: "The gains spread thin across everyone. The losses land whole, on one town.", ja: "得は全員に薄く撒かれる。損は丸ごと、一つの町に落ちる。", m: ['who-pays', 'echo'] },
                { en: "When the plant leaves, economists show an average. Nobody lives in an average.", ja: "工場が出ていくと、経済学者は平均を見せる。平均の中に住んでいる人間はいない。", m: ['picture'] },
                { en: "We told the town to retrain. A retrained welder of fifty is a slogan, not a job.", ja: "町には再教育しろと言った。五十歳の溶接工の再教育は、標語であって仕事じゃない。", m: ['middle-years', 'picture'] },
                { en: "And the whole machine hangs on a few threads. One stuck ship, and the world's shelves went thin.", ja: "しかもこの機械全体が数本の糸にぶら下がっている。船一隻が詰まって、世界の棚が薄くなった。", m: ['scale', 'picture'] },
                { en: "Trade the goods. But somebody owed that town, and nobody paid.", ja: "物は取引すればいい。ただ、あの町には誰かが借りを返すべきで、誰も払わなかった。", m: ['who-pays', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Without foreign money and open markets, how is a small country supposed to grow at all?",
                qJa: "外資と開かれた市場なしで、小国はそもそもどうやって成長するのか",
                a: [
                    { en: "Mostly it cannot, and I will say that plainly. Closed economies are a museum of failures.", ja: "たいてい無理だ。そこは、はっきり言っておく。閉じた経済は失敗の博物館だ。", m: ['own-cost', 'tried'] },
                    { en: "So the fight is over the mix. Foreign money builds the port. Home-grown skill decides who owns the next one.", ja: "だから争点は配合だ。外資は港を作る。次の港を誰が持つかは、自前の実力が決める。", m: ['reframe', 'echo'] },
                    { en: "Depend on the world for trade. Never for the spine.", ja: "貿易は世界に頼れ。背骨は預けるな。", m: ['land-short'] },
                ],
            },
            {
                q: "Trade made us depend on rival countries. Is that not a security risk?",
                qJa: "貿易のせいでライバル国に依存している。安全保障上まずいのでは",
                a: [
                    { en: "It is, and I will not dress it up. The pandemic had us begging abroad for masks.", ja: "まずい。取り繕う気はない。パンデミックのとき、俺たちはマスクを外国に乞うていた。", m: ['own-cost', 'picture'] },
                    { en: "But dependence points both ways. Countries that trade daily have expensive reasons not to shoot.", ja: "ただ、依存は両方向に向く。毎日取引している国同士には、撃たないための高価な理由がある。", m: ['both-true'] },
                    { en: "So keep trading, and keep spares for the vital three. Food, medicine, chips.", ja: "だから取引は続けて、急所の三つだけ予備を持て。食料、薬、半導体。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "My shirt crossed three oceans and still cost less than the coffee I drank while buying it. Somewhere in that price, somebody's whole day is missing.",
            ja: "俺のシャツは三つの海を越えてきて、買うとき飲んだコーヒーより安かった。あの値段のどこかで、誰かの丸一日が消えている。",
            note: "「安さの正体」を絵で見せる型。貿易批判は上から目線に聞こえたら負けなので、自分の買い物から入る。滑ったら Good coffee, though. と足して次へ。",
            m: ['picture', 'who-pays'],
        },
        cards: [
            "Has globalization brought the world more benefit than damage?",
            "Are free trade agreements the surest route to prosperity?",
            "Should a country's growth rely on money from abroad?",
            "Is full economic self-sufficiency a realistic goal for a modern nation?",
        ],
    },
    {
        no: 23, id: 'growth-or-green', label: '成長と地球', en: 'Growth Or The Planet',
        field: 'nature',
        owns: '成長と地球の綱引きの話すべて。経済と環境の両立、脱成長、産業化の功罪、GDPという物差し。「豊かさの値段」の話はここが担当',
        sourceDays: [10, 11],
        hook: "So we are really asking whether we can stay rich without burning the house we live in. Okay.",
        hookJa: "つまり本当の問いは、住んでいる家を燃やさずに豊かなままでいられるか、ですね。",
        universal: "誰も工場より前の世界には戻りたくない。そして誰も、煙の続きが見たいわけでもない。本当の喧嘩は「成長するか」ではなく、「何を成長と数えるか」で起きている。",
        universalEn: "Nobody wants the world before the factories back. Nobody wants the smoke back either. The real fight is over what we agree to count as growth.",
        angles: [
            { label: '寿命', en: "Human lifespans roughly doubled after the machines arrived. That column of the ledger is heavy.", ja: "機械が来てから、人間の寿命はほぼ倍になった。台帳のその欄は重い。" },
            { label: '選択', en: "The poison was never the entry fee. It was a corner somebody chose to cut.", ja: "毒は入場料だったことなど一度もない。誰かが削ると決めた手抜きだ。" },
            { label: '物差し', en: "GDP counts the chainsaw and ignores the forest. A number like that misleads you politely.", ja: "GDPはチェーンソーを数え、森を数えない。そういう数字は、礼儀正しく人を騙す。", },
            { label: '実例', en: "The country that invented the coal economy has turned its last coal station off. Rich and cleaner, same direction.", ja: "石炭経済を発明した国が、最後の石炭火力を止めた。豊かさと清潔さは、同じ方向に進める。" },
        ],
        origin: {
            day: 10, essay: "Yes, industrialization did more good than harm (day 10). And no, environmental damage was never inevitable (day 11).",
            stance: "The factories were worth it, and the smoke was optional",
            stanceJa: "工場は割に合った。そして煙は選択だった",
            lines: [
                { en: "I hold two answers at once. The machines were worth it, and the poison was a choice.", ja: "答えを二つ同時に持つ。機械は割に合った。そして毒は選択だった。", m: ['both-true'] },
                { en: "Industrial life roughly doubled how long people live. I am not handing that back.", ja: "産業化された暮らしは寿命をほぼ倍にした。あれを返す気はない。", m: ['one-number'] },
                { en: "But no law of physics says progress must poison the river. Budgets say that. Budgets can change.", ja: "ただ、進歩は川を汚さねばならないなんて物理法則はない。そう言っているのは予算だ。予算は変えられる。", m: ['rename', 'echo'] },
                { en: "We banned the gases that ate the ozone layer, and the layer is healing. Proof, written on the sky.", ja: "オゾン層を食っていたガスを禁止したら、層は回復しつつある。証拠は空に書いてある。", m: ['tried', 'picture'] },
                { en: "So thank the machines and stop excusing them. Same breath.", ja: "だから機械には感謝して、言い訳はやめろ。同じ一息でだ。", m: ['both-true', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, a rich world is the only one that can afford to be clean",
            stanceJa: "両立できる。清潔さを買えるのは、豊かな世界だけだ",
            lines: [
                { en: "The proof is not a promise. It is already wired into the grid.", ja: "証拠は公約じゃない。もう送電網に配線されている。", m: ['tried'] },
                { en: "Britain built the first coal economy. Its last coal station is off now, and the lights stayed on.", ja: "イギリスは最初の石炭経済を作った国だ。その最後の石炭火力がもう止まって、灯りは点いたままだった。", m: ['tried', 'picture'] },
                { en: "Solar went from luxury toy to the cheapest new power on earth in about a decade.", ja: "太陽光は約十年で、金持ちの玩具から地上で最も安い新設電源になった。", m: ['one-number', 'speed'] },
                { en: "The Thames was declared dead. Wealth paid for the cleanup, and the fish came back.", ja: "テムズ川は死んだと宣告された。豊かさが浄化の金を払い、魚が戻った。", m: ['tried', 'picture'] },
                { en: "Poverty is not gentle on nature either. Desperate people burn whatever is closest.", ja: "貧困も自然に優しくはない。追い詰められた人間は、一番近くにあるものを燃やす。", m: ['compare'] },
                { en: "Green is not the opposite of growth. It is what growth buys next.", ja: "緑は成長の反対語じゃない。成長が次に買うものだ。", m: ['rename', 'land-short'] },
            ],
        },
        no: {
            stance: "No, because so far the fixes bought time, not a turn",
            stanceJa: "両立していない。今までの対策は時間を買っただけで、進路は変えていないから",
            lines: [
                { en: "I hear the success stories. Now look at the one line that matters. Global emissions kept climbing.", ja: "成功譚は聞いた。じゃあ肝心の一本の線を見ろ。世界の排出は増え続けた。", m: ['concede-pivot', 'feel-vs-fact'] },
                { en: "We made engines cleaner and bought bigger cars. Every saving got eaten by more.", ja: "エンジンを綺麗にして、より大きい車を買った。節約は全部「もっと」に食われた。", m: ['echo', 'scale'] },
                { en: "A cut forest can regrow. A species we lose has no return flight.", ja: "切られた森は生え直す。失った種に、帰りの便はない。", m: ['undo', 'picture'] },
                { en: "GDP rises when we fell the forest, then rises again when we treat the asthma. That number is not our friend.", ja: "森を伐るとGDPは上がり、喘息を治療するとまた上がる。あの数字は味方じゃない。", m: ['counted', 'picture'] },
                { en: "Cheap today because somebody unborn pays later. That is the whole business model.", ja: "今日安いのは、まだ生まれていない誰かが後で払うからだ。それがビジネスモデルの全部だ。", m: ['future-bill', 'rename'] },
                { en: "Grow what we can undo. Guard what we cannot.", ja: "取り消せるものは増やせ。取り消せないものは守れ。", m: ['undo', 'echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If growth is the problem, why not shrink the economy on purpose? Degrowth.",
                qJa: "成長が問題なら、わざと経済を縮めればいいのでは。脱成長だ",
                a: [
                    { en: "First I will own my side's bill. Growth as we run it is still heating the planet. That is real.", ja: "まず自分の側の請求書を認める。今のやり方の成長は、いまも地球を温めている。それは本物だ。", m: ['own-cost'] },
                    { en: "But shrinking got tested by accident. Every recession cut emissions and crushed the poorest first.", ja: "ただ、縮小は事故という形で何度も実験済みだ。不況のたびに排出は減り、最初に潰れたのは一番貧しい層だった。", m: ['tried', 'who-pays'] },
                    { en: "I want less carbon, not less medicine. Those are different cuts.", ja: "減らしたいのは炭素であって、薬じゃない。その二つは別の削り方だ。", m: ['echo', 'land-short'] },
                ],
            },
            {
                q: "Worth it for whom? Some countries got the smoke and never got the wealth.",
                qJa: "誰にとって割に合った？ 煙だけ受け取って、富は受け取っていない国もある",
                a: [
                    { en: "True, and my side has to say it out loud. In some places the deal was robbery.", ja: "その通りで、俺の側はそれを声に出して言う義務がある。場所によっては、あの取引は強盗だった。", m: ['own-cost'] },
                    { en: "The factory moved in, the profit flew home, and the river stayed dirty.", ja: "工場が来て、利益は本国へ飛び、川だけが汚れたまま残った。", m: ['picture', 'who-pays'] },
                    { en: "So the question is not whether machines are good. It is who kept the money and who kept the cough.", ja: "だから問いは機械が善かどうかじゃない。金を持ち続けたのは誰で、咳を持ち続けたのは誰か、だ。", m: ['reframe', 'echo'] },
                ],
            },
        ],
        joke: {
            en: "I recycle one bottle and feel like a founder of the planet. Then I book a flight and delete the feeling.",
            ja: "瓶を一本リサイクルして、地球の創設メンバーみたいな気分になる。それから航空券を予約して、その気分を削除する。",
            note: "環境の話は説教に聞こえた瞬間に負けるので、先に自分を撃つ。滑ったら The bottle is still proud of me. と足して次へ。",
            m: ['self-joke'],
        },
        cards: [
            "Can economies keep growing without wrecking the environment?",
            "Should wealthy societies deliberately shrink their economies for the planet's sake?",
            "Did the industrial age give humanity more than it took?",
            "Is GDP a sound way to measure a country's progress?",
        ],
    },
    {
        no: 24, id: 'machine-crutch', label: '道具に頼る', en: 'Leaning On The Machine',
        field: 'tech',
        owns: '便利さと依存の話すべて。技術で失われる能力、子どもとスクリーン、自動化された日常、道具との取引。「楽になって何を失うか」はここが担当',
        sourceDays: [],
        hook: "So we are really asking what the tools quietly take while they help. Okay.",
        hookJa: "つまり本当の問いは、道具は助けながら静かに何を持っていくのか、ですね。",
        universal: "使わない筋肉は落ちる。それだけの話だ。道具は悪くない。ただ、道具に肩代わりさせた能力は、文句も言わずに消える。喧嘩の正体は便利さの是非ではなく、どの筋肉なら手放していいか、だ。",
        universalEn: "A muscle you stop using goes away. The tool is not evil. The real fight is over which muscles we can afford to lose.",
        angles: [
            { label: '地図', en: "Follow the arrow long enough and the map in your head stops being built.", ja: "矢印に従い続けると、頭の中の地図は工事が止まる。" },
            { label: '記憶', en: "I once held twenty phone numbers. Now I hold one, and it is mine.", ja: "昔は電話番号を二十件覚えていた。今は一件で、それは自分の番号だ。" },
            { label: '子ども', en: "Adults lost skills they once had. Children start without ever building them.", ja: "大人は持っていた能力を失う。子どもは、そもそも作らないまま始める。" },
            { label: '取引', en: "This trade is ancient. Writing weakened memory, and Socrates filed the complaint.", ja: "この取引は大昔からある。文字は記憶を弱らせ、ソクラテスが苦情を出した。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "Take the tool, but read the price tag",
            stanceJa: "道具は使え。ただし値札は読め",
            lines: [
                { en: "Let me be honest first. Three machines are helping me say this.", ja: "先に正直に言う。この発言も機械三台に助けられている。", m: ['my-story', 'self-joke'] },
                { en: "A skill you stop practising does not protest. It just quietly leaves.", ja: "使うのをやめた能力は抗議しない。ただ静かに出ていく。", m: ['picture'] },
                { en: "London cabbies memorize the whole city, and the map part of their brains measurably grows.", ja: "ロンドンのタクシー運転手は街を丸ごと暗記していて、脳の地図をつかさどる部分が測れるほど育つ。", m: ['tried'] },
                { en: "Follow the arrow instead, and that muscle goes unbuilt. The tool does the reps for you.", ja: "代わりに矢印に従えば、その筋肉は育たない。道具が筋トレを代行してしまう。", m: ['picture', 'echo'] },
                { en: "So take the deal. Just read the price tag first.", ja: "だから取引はしていい。ただ、先に値札を読め。", m: ['land-short'] },
            ],
        },
        yes: {
            stance: "Yes, we are outsourcing abilities faster than we notice",
            stanceJa: "頼りすぎだ。気づく速度より速く、能力を外注している",
            lines: [
                { en: "Run the test tonight. Lose the phone and count what you can still do alone.", ja: "今夜試せばいい。スマホを失って、一人で何ができるか数えてみろ。", m: ['picture'] },
                { en: "I could hold twenty numbers as a kid. Now I hold one.", ja: "子どもの頃は番号を二十件持っていた。今は一件だ。", m: ['my-story', 'one-number'] },
                { en: "The map app does not train you. It replaces the training.", ja: "地図アプリは鍛えてくれない。鍛錬そのものを置き換える。", m: ['echo', 'rename'] },
                { en: "One lost skill is nothing. A stack of them is a different person.", ja: "能力一つの喪失は何でもない。積み重なれば別人だ。", m: ['scale'] },
                { en: "And children never had the skill to lose. They start life on the crutch.", ja: "そして子どもには、失うための能力がまだない。松葉杖の上から人生を始める。", m: ['who-pays', 'picture'] },
                { en: "Convenience is a loan. The interest is paid in ability.", ja: "便利さは借金だ。利息は能力で払う。", m: ['rename', 'future-bill', 'land-short'] },
            ],
        },
        no: {
            stance: "No, every generation trades skills up, and this trade is a good one",
            stanceJa: "問題ない。どの世代も能力を交換して上がってきたし、今回も良い取引だ",
            lines: [
                { en: "Depends what we mean by capable. Nobody counts fire-starting anymore.", ja: "「能力が落ちた」の能力が何を指すか次第だ。火起こしを数える人はもういない。", m: ['define'] },
                { en: "Every generation buries a skill and gets called weaker for it.", ja: "どの世代も何かの能力を葬り、そのたびに弱くなったと言われてきた。", m: ['tried'] },
                { en: "Calculators were supposed to kill maths. The maths just moved up a floor.", ja: "電卓は数学を殺すはずだった。数学は一階上に引っ越しただけだった。", m: ['tried', 'picture'] },
                { en: "Forgetting phone numbers is not decay. It is delegation.", ja: "電話番号を忘れるのは衰えじゃない。委任だ。", m: ['rename'] },
                { en: "A translation app does not shrink me. It hands me a hundred countries I could never talk to.", ja: "翻訳アプリは俺を縮めない。話せなかった百の国を手渡してくる。", m: ['rename', 'picture'] },
                { en: "We did not get weaker. We changed what strong means.", ja: "弱くなったんじゃない。強さの定義を変えたんだ。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Should the law limit children's screen time, or is that a family matter?",
                qJa: "子どものスクリーン時間は法律で制限すべきか、それとも家庭の問題か",
                a: [
                    { en: "I will own the cost of leaving it to families. The unlucky kids get no protection at all.", ja: "家庭任せの代償は先に認める。運の悪い子どもは、何の保護も受けられない。", m: ['own-cost', 'who-pays'] },
                    { en: "But a law inside the living room needs an officer inside the living room. Nobody wants that hire.", ja: "ただ、居間の中の法律には、居間の中の警官が要る。その求人は誰も出したくない。", m: ['switch', 'picture'] },
                    { en: "So point the law at the design, not the child. The addiction is manufactured upstream.", ja: "だから法律は子どもではなく設計に向けろ。依存は上流で製造されている。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "If machines run daily life, does that not simply free us for better things?",
                qJa: "機械が日常を回してくれるなら、浮いた分をいいことに使えるだけでは",
                a: [
                    { en: "Sometimes it truly works. The washing machine handed years of hours back, mostly to women.", ja: "本当にそうなる場合もある。洗濯機は膨大な時間を、主に女性たちに返した。", m: ['concede-pivot', 'tried'] },
                    { en: "But I have to own the gap. My freed hours mostly drain into the same screen that freed them.", ja: "ただ、ずれは認めるしかない。俺の浮いた時間は、時間を浮かせた当の画面にほぼ吸われている。", m: ['own-cost', 'self-joke'] },
                    { en: "Freedom is just an empty room. What matters is what you carry in.", ja: "自由はただの空き部屋だ。大事なのは、そこに何を運び込むかだ。", m: ['picture', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "My phone knows my passwords, my schedule, and my wife's birthday. If I drop it in the river, I stop existing as a husband.",
            ja: "スマホは俺のパスワードと予定と妻の誕生日を知っている。川に落としたら、夫としての俺は消滅する。",
            note: "依存ネタは他人ではなく自分を撃つと事故らない。滑ったら My wife suspects this already. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Do modern conveniences make people too dependent on them?",
            "Is technology quietly weakening basic human abilities?",
            "Should governments set legal limits on children's screen time?",
            "Does automating daily life actually make people freer?",
        ],
    },
    {
        no: 25, id: 'the-feed', label: 'ニュースと注意', en: 'The News And Your Attention',
        field: 'power',
        owns: '報道と注意の奪い合いの話すべて。ニュースの娯楽化、ネットと知性、有名人の影響力、フェイクの速度。「誰が何を見せるか」はここが担当',
        sourceDays: [],
        hook: "So we are really asking whether the news serves the reader or the click. Okay.",
        hookJa: "つまり本当の問いは、ニュースは読者に仕えているのかクリックに仕えているのか、ですね。",
        universal: "フィードは真実の順ではなく、離せない順に並ぶ。そして怒りは、追いかけてくる訂正より速く走る。この二つを知らずに「ネットで賢くなったか」を語る議論は、最初から噛み合わない。",
        universalEn: "The feed sorts by grip, not by truth. And outrage runs faster than the correction chasing it. Every media debate starts there, or starts wrong.",
        angles: [
            { label: '速度', en: "Researchers tracked rumours for years. False ones travelled about six times faster than true ones.", ja: "研究者たちが何年もデマを追跡した。偽物は本物の約六倍速く旅をしていた。" },
            { label: '商売', en: "The reader stopped paying, so the reader became the crop. Attention is what gets harvested.", ja: "読者が金を払わなくなったので、読者が作物になった。収穫されているのは注意だ。" },
            { label: '訂正', en: "The lie plays the stadium. The correction plays a hallway.", ja: "嘘はスタジアム公演。訂正は廊下でやる。" },
            { label: '鏡', en: "A celebrity's dinner outranks a war. That is not the editor's taste. It is ours, printed back at us.", ja: "有名人の晩飯が戦争より上位に来る。あれは編集者の趣味じゃない。俺たちの趣味が印刷されて返ってきている。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "The feed pays for grip, not truth, and knowing that is the defence",
            stanceJa: "フィードは真実ではなく握力に金を払う。それを知ることが防御になる",
            lines: [
                { en: "My starting point is boring. The feed is a machine, and it is paid in attention.", ja: "出発点は地味だ。フィードは機械で、報酬は注意で支払われる。", m: ['rename'] },
                { en: "Nobody built it to lie. They built it to keep you, and lies keep you very well.", ja: "嘘をつくために作られたわけじゃない。引き留めるために作られて、嘘は引き留めるのがとても上手いだけだ。", m: ['both-true', 'echo'] },
                { en: "Researchers followed rumours online for years. The false ones ran about six times faster.", ja: "研究者たちがネットのデマを何年も追った。偽物は約六倍速く走っていた。", m: ['tried', 'one-number'] },
                { en: "Outrage is free fuel. Calm costs money.", ja: "怒りはタダの燃料だ。冷静は金がかかる。", m: ['echo'] },
                { en: "So my first question is not whether a story is true. It is why it found me.", ja: "だから最初の問いは、その話が本当かじゃない。なぜ俺のところに届いたか、だ。", m: ['reframe', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, the fight for attention is bending the news out of shape",
            stanceJa: "そうだ。注意の奪い合いが報道の形を歪めている",
            lines: [
                { en: "Watch the evening news and count. Minutes of policy against minutes of shouting.", ja: "夜のニュースを見て数えろ。政策の分数と、怒鳴り合いの分数を。", m: ['counted', 'picture'] },
                { en: "The old paper sold you the news. The feed sells you to the advertiser.", ja: "昔の新聞はニュースをあなたに売った。フィードはあなたを広告主に売る。", m: ['echo', 'rename'] },
                { en: "A politician now wins by being clipped, not by being right.", ja: "政治家は今、正しいことではなく、切り抜かれることで勝つ。", m: ['counted'] },
                { en: "Nine loud men in a bar was a bad night. Two million in one thread is weather.", ja: "酒場で怒鳴る九人は嫌な夜で済む。ひとつのスレッドの二百万人は、もう気象現象だ。", m: ['scale', 'picture'] },
                { en: "The lie fills the stadium. The correction whispers in the hallway.", ja: "嘘はスタジアムを満員にする。訂正は廊下で囁く。", m: ['echo', 'picture'] },
                { en: "A public that cannot hold its attention cannot hold power to account.", ja: "注意を保てない公衆に、権力の監視は保てない。", m: ['echo', 'land-short'] },
            ],
        },
        no: {
            stance: "No, this is the best-informed public in history, and mess is the price",
            stanceJa: "害より益だ。史上最も情報を持つ公衆であり、散らかりはその代金だ",
            lines: [
                { en: "Step back from the panic. An ordinary person can now check a claim in thirty seconds.", ja: "パニックから一歩引け。普通の人が今や三十秒で主張の裏を取れる。", m: ['feel-vs-fact'] },
                { en: "My grandfather had one paper and one broadcaster. He called that trustworthy. It was just unopposed.", ja: "祖父には新聞一紙と放送局一つしかなかった。祖父はそれを信頼できると呼んだ。単に対抗馬がいなかっただけだ。", m: ['my-story', 'rename'] },
                { en: "Gatekeepers kept the noise out. They also kept whole stories out. Both happened.", ja: "門番は騒音を締め出した。同時に、いくつもの真実ごと締め出した。両方が起きていた。", m: ['both-true', 'echo'] },
                { en: "The powerful get caught now because everyone carries a camera and a printing press.", ja: "権力者が今つかまるのは、全員がカメラと印刷機を持ち歩いているからだ。", m: ['picture'] },
                { en: "This panic is a tradition. The novel, the radio, the television all got blamed for rotting minds.", ja: "このパニックは伝統芸だ。小説もラジオもテレビも、頭を腐らせると責められてきた。", m: ['tried'] },
                { en: "The library got bigger than any building. Teach people to read the shelves.", ja: "図書館はどんな建物より大きくなった。棚の読み方を教えればいい。", m: ['picture', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Do famous people owe society good behaviour, or is influence theirs to spend?",
                qJa: "有名人は社会に良い振る舞いを負っているのか、影響力は本人が好きに使っていいのか",
                a: [
                    { en: "I will own the cost of my answer first. Making duty a rule puts somebody in charge of policing speech.", ja: "先に自分の答えの代償を認める。義務をルールにすれば、誰かが発言を取り締まる係になる。", m: ['own-cost', 'switch'] },
                    { en: "But scale changed the act. A singer's health advice now lands on more ears than a ministry's.", ja: "ただ、規模が行為の意味を変えた。歌手の健康アドバイスは今や、省庁の発表より多くの耳に届く。", m: ['scale'] },
                    { en: "So no law. Just the old rule. If millions listen, check before you speak.", ja: "だから法律は無しだ。古いルールだけでいい。何百万人が聞いているなら、話す前に確かめろ。", m: ['land-short'] },
                ],
            },
            {
                q: "If the attention economy is the problem, would you let the state regulate the algorithms?",
                qJa: "注意経済が問題なら、国にアルゴリズムを規制させるか",
                a: [
                    { en: "Careful. Before we build that switch, picture the government you like least holding it.", ja: "慎重にいく。そのスイッチを作る前に、一番嫌いな政権がそれを握った日を思い浮かべろ。", m: ['switch', 'picture'] },
                    { en: "And I will own my side's weakness. Doing nothing leaves a teenager alone against a thousand engineers.", ja: "同時に自分の側の弱点も認める。何もしなければ、十代の子が千人のエンジニアを相手に一人で戦うことになる。", m: ['own-cost', 'who-pays'] },
                    { en: "So open the data first and offer a plain feed. Sunlight first, scissors later.", ja: "だからまずデータを開かせて、素のフィードを選ばせろ。日光が先、鋏は後だ。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "I opened my phone to check one headline. Forty minutes later I was watching a man wash a carpet. The news was in there somewhere.",
            ja: "見出しを一つ確かめようとスマホを開いた。四十分後、俺は男が絨毯を洗う動画を眺めていた。ニュースはあの途中のどこかにあったはずだ。",
            note: "注意経済の批判は、自分の敗北報告から入ると説教にならない。滑ったら It was a very dirty carpet. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Is news reporting now driven more by entertainment than by information?",
            "Has the internet made the average person better informed?",
            "Should celebrities be expected to behave as role models?",
            "Is the contest for attention damaging public debate?",
        ],
    },
];
