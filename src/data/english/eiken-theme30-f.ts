/**
 * THEME 30 -- テーマ 26-30(最終ブロック)。
 * 26-30 は新規テーマ(元エッセイなし、day: 0)。品質基準は eiken-theme30-d.ts の
 * テーマ22。行のムーブタグ、数字の丸め方、yes/no の衝突のさせ方、
 * deeper での代償の認め方、全部あそこに合わせる。
 */

import type { Theme } from './eiken-theme30-types';

export const THEMES_F: Theme[] = [
    // ============================================================
    {
        no: 26, id: 'old-ways', label: '伝統は守るべきか', en: 'Keeping The Old Ways',
        field: 'self',
        owns: '伝統文化の保存、言語の変化、グローバル文化と地域文化の話すべて。「昔からのやり方を守るべきか」はここが担当',
        sourceDays: [],
        hook: "So we are really asking whether the past needs a bodyguard. Okay.",
        hookJa: "つまり、過去にボディーガードが要るのか、という問いですね。",
        universal: "守れと一番大きな声で言う人ほど、その伝統を自分ではやっていない。伝統は倉庫に入れた瞬間に死に、誰かが使っている間だけ生きる。",
        universalEn: "The loudest defenders of a tradition rarely practice it. A tradition dies the day it becomes storage, and lives while somebody uses it.",
        angles: [
            { label: '言葉', en: "English swallowed French, Norse, and Latin, and nobody calls English broken.", ja: "英語はフランス語も北欧語もラテン語も飲み込んだ。誰も英語を壊れているとは呼ばない。" },
            { label: '金', en: "If a craft only survives on subsidy, the subsidy is a life-support machine.", ja: "補助金でしか生きられない工芸なら、その補助金は延命装置だ。" },
            { label: '変化', en: "Kabuki was street entertainment once. It survived by changing, not by freezing.", ja: "歌舞伎も元は大衆芸能だ。凍ることではなく、変わることで生き延びた。" },
            { label: '自分', en: "I say I love the old town. I still do my shopping at the new mall.", ja: "古い町並みが好きだと言いながら、買い物は新しいモールで済ませる。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "Culture is a verb -- keep what people still carry",
            stanceJa: "文化は動詞。人がまだ担いでいるものを残す",
            lines: [
                { en: "Here is where I land. A tradition is not a thing. It is something people do.", ja: "俺の立ち位置はここだ。伝統は物じゃない。人がやる何かだ。", m: ['reframe', 'rename'] },
                { en: "If a festival needs a grant to happen, ask why the town stopped showing up.", ja: "祭りに補助金が要るなら、なぜ町の人が来なくなったのかを先に問え。", m: ['who-pays'] },
                { en: "A language nobody speaks at dinner is not alive. It is preserved. Those are different words.", ja: "夕食の席で誰も話さない言語は、生きていない。保存されている。別の言葉だ。", m: ['define', 'rename'] },
                { en: "Some things will die. That is a real loss, and I will say it out loud.", ja: "死ぬものは出る。それは本物の損失だ。声に出して言っておく。", m: ['own-cost'] },
                { en: "So fund the teaching, not the freezing. Culture is a verb.", ja: "だから金は冷凍ではなく、教えることに出せ。文化は動詞だ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, keep them -- they are the memory we think with",
            stanceJa: "守るべき。伝統は我々が考えるときに使う記憶だから",
            lines: [
                { en: "Start with what a tradition actually is. A thousand years of trial and error, compressed.", ja: "伝統が実際には何かから始めよう。千年分の試行錯誤の圧縮だ。", m: ['define'] },
                { en: "We did not test these customs. Time tested them, on real people, for centuries.", ja: "この習慣を検証したのは我々じゃない。時間が、生身の人間で、何世紀もかけて検証した。", m: ['tried', 'echo'] },
                { en: "About half of the world's seven thousand languages may go this century. Each one is a library with one copy.", ja: "世界の七千の言語のうち、約半分が今世紀中に消えかねない。一つひとつが、一冊しかない図書館だ。", m: ['one-number', 'picture'] },
                { en: "And this loss has no undo button. Once the last speaker goes, no money brings the sound back.", ja: "しかもこの損失には取り消しボタンがない。最後の話者が逝けば、どんな金でもあの音は戻らない。", m: ['undo'] },
                { en: "A town that keeps its festival knows who it is. A town that loses it becomes anywhere.", ja: "祭りを守った町は自分が誰かを知っている。失った町は、どこにでもある場所になる。", m: ['echo', 'picture'] },
                { en: "Keep the roots. The branches can move.", ja: "根は守れ。枝は動いていい。", m: ['land-short', 'picture'] },
            ],
        },
        no: {
            stance: "No, not at any cost -- a tradition has to earn its place",
            stanceJa: "どんな犠牲を払っても、ではない。伝統も居場所は自分で稼ぐべきだから",
            lines: [
                { en: "My problem is the word preserve. We preserve fruit. Dead fruit.", ja: "引っかかるのは「保存」という言葉だ。保存するのは果物だ。死んだ果物だ。", m: ['define', 'rename'] },
                { en: "Every tradition we love was an innovation once. Somebody broke the old way to make it.", ja: "我々が愛する伝統はどれも、かつては新発明だった。誰かが古いやり方を壊して作った。", m: ['reframe'] },
                { en: "And somebody pays to keep the old way going. It is usually the young.", ja: "それに、古いやり方の維持費は誰かが払う。たいてい若者だ。", m: ['who-pays'] },
                { en: "A son keeps the family kiln because leaving would break his father. That is not heritage. That is a hostage.", ja: "息子が家の窯を継ぐのは、出て行けば父が壊れるからだ。それは継承じゃない。人質だ。", m: ['picture', 'rename'] },
                { en: "Meanwhile the traditions people actually want are doing fine. Nobody subsidizes ramen.", ja: "一方で、人が本当に欲しがる伝統は勝手に元気だ。ラーメンに補助金は出ていない。", m: ['compare', 'picture'] },
                { en: "Let people vote with their feet. What survives that vote is culture.", ja: "人に足で投票させろ。その投票を生き残ったものが文化だ。", m: ['rename', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If we let the market decide, will everything not end up the same everywhere?",
                qJa: "市場に任せたら、世界中どこも同じになってしまわないか",
                a: [
                    { en: "That flattening is real, and my side helps it along. I own that.", ja: "その均質化は本物で、俺の側はそれに加担している。認める。", m: ['own-cost'] },
                    { en: "But look at what actually spread. Sushi went global and did not erase Italian food.", ja: "ただ、実際に広がったものを見ろ。寿司は世界に出たが、イタリア料理を消していない。", m: ['tried', 'concede-pivot'] },
                    { en: "Sameness wins the airport. The neighbourhood keeps choosing its own taste.", ja: "画一化が勝つのは空港だ。近所は自分の味を選び続ける。", m: ['picture', 'land-short'] },
                ],
            },
            {
                q: "Should we correct people who use the language wrongly, before the mistakes become normal?",
                qJa: "誤用が普通になってしまう前に、言葉の乱れは正すべきでは",
                a: [
                    { en: "Fair, and something real is lost each time. Old forms carry shades the new ones drop.", ja: "もっともだ。そのたびに本物の何かが失われる。古い形が持っていた含みを、新しい形は落とす。", m: ['own-cost', 'concede-pivot'] },
                    { en: "But the errors of one century are the grammar of the next. Shakespeare broke rules we now teach.", ja: "ただ、ある世紀の誤用は次の世紀の文法だ。シェイクスピアは、今我々が教える規則を破っていた。", m: ['tried'] },
                    { en: "A language that stops changing is not pure. It is finished.", ja: "変わるのをやめた言語は、純粋なのではない。終わったのだ。", m: ['rename', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "My grandfather says the town festival is sacred. He watches it from his car, with the air conditioning on.",
            ja: "祖父は町の祭りを神聖だと言う。本人は冷房の効いた車の中から眺めている。",
            note: "伝統のお題は説教に聞こえたら負け。守れと言う側の身内を先に撃つ self-joke の型。怒りではなく可笑しさで「口だけの保存」を見せる。滑ったら To be fair, it was a hot summer. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Is it worth preserving traditional culture whatever the cost?",
            "Is global culture wiping out local ways of life?",
            "Should governments spend public money to keep traditional crafts alive?",
            "Should changes to our language be resisted or welcomed?",
        ],
    },

    // ============================================================
    {
        no: 27, id: 'family-shape', label: '家族のかたち', en: 'The Shape Of The Family',
        field: 'life',
        owns: '結婚という制度、親の責任、高齢者を家族が看るか国が看るかの話。家族のかたちが変わる話はここが担当',
        sourceDays: [],
        hook: "So we are really asking what a family is for. Okay.",
        hookJa: "つまり、家族は何のためにあるのか、という問いですね。",
        universal: "家族は最古の保険制度だ。介護も保育も無料で回してきた。ただし請求書は消えていたのではなく、主に女性に回っていた。問うべきは「昔は良かったか」ではなく「代わりに何を置くか」だ。",
        universalEn: "The family is the oldest insurance system. The care was never free. The bill just went to somebody, mostly the women. The real question is what replaces it.",
        angles: [
            { label: '制度', en: "Marriage is old, but state-registered marriage is a tax and property arrangement.", ja: "結婚は古い。だが役所に届ける結婚は、税と財産の取り決めだ。" },
            { label: '数字', en: "Japan holds about half as many weddings as it did fifty years ago.", ja: "日本の結婚の件数は、50年前の半分ほどになった。" },
            { label: 'ケア', en: "Somebody wipes, feeds, and watches. The only question is whether they get paid.", ja: "誰かが拭き、食べさせ、見守る。問いは、その人に給料が出るかどうかだけだ。" },
            { label: '自分', en: "Everyone defends the family in theory. In practice we all moved away from ours.", ja: "誰もが理屈では家族を守る。実際には、みんな実家を出た。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "The family ran the care economy for free -- ask what replaces it",
            stanceJa: "家族はケアの経済をタダで回してきた。問うべきは代わりに何を置くかだ",
            lines: [
                { en: "Let me put the real question on the table. Who does the care work now?", ja: "本当の問いを机に置こう。ケアの仕事は、今、誰がやるのか。", m: ['reframe'] },
                { en: "For centuries the family did it, unpaid, and mostly the women did it.", ja: "何世紀ものあいだ家族がやってきた。無給で、しかも主に女性が。", m: ['who-pays'] },
                { en: "Call it love if you like. It was also an economy, running on one gender's time.", ja: "愛と呼びたければ呼べばいい。それは同時に経済でもあった。片方の性別の時間で回る経済だ。", m: ['rename', 'both-true'] },
                { en: "The old shape is fading. Fine. But the dishes and the diapers did not fade.", ja: "古いかたちは消えつつある。それはいい。だが皿洗いとおむつは消えていない。", m: ['concede-pivot', 'picture'] },
                { en: "Do not ask if the family is dying. Ask what picks up its work.", ja: "家族が死ぬのかと問うな。家族の仕事を誰が拾うのかを問え。", m: ['reframe', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, keep it in the family -- care has to have a face",
            stanceJa: "家族が看るべき。ケアには顔が要るから",
            lines: [
                { en: "I will defend the old-fashioned side. Care from strangers is a service. Care from family is a relationship.", ja: "古風な側を弁護しよう。他人のケアはサービスだ。家族のケアは関係だ。", m: ['echo', 'rename'] },
                { en: "We ran the other experiment. Institutions at scale gave us understaffed wards and lonely corridors.", ja: "逆の実験ならもう走った。大規模な施設が生んだのは、人手不足の病棟と寂しい廊下だ。", m: ['tried', 'picture'] },
                { en: "An old man eats better when his granddaughter is at the table. No staffing ratio buys that.", ja: "孫娘が食卓にいれば、年寄りはよく食べる。どんな人員配置基準でもそれは買えない。", m: ['picture'] },
                { en: "And the duty runs both ways. They carried us for twenty years. We carry them back.", ja: "それに、この義務は双方向だ。向こうは我々を二十年担いだ。今度は我々が担ぎ返す。", m: ['echo'] },
                { en: "Yes, it costs the carers, mostly women. That has to change inside the family, not by outsourcing it.", ja: "確かに担い手には代償がある。主に女性に。それは外注ではなく、家族の内側で変えるべきことだ。", m: ['own-cost'] },
                { en: "The state can fund the care. It cannot love anybody.", ja: "国はケアに金を出せる。だが国は誰も愛せない。", m: ['echo', 'land-short'] },
            ],
        },
        no: {
            stance: "No -- love does not scale, and the bill lands on the daughters",
            stanceJa: "家族だけでは無理。愛は規模に耐えず、請求書は娘たちに落ちるから",
            lines: [
                { en: "Here is the honest version of family care. It means one daughter quits her job.", ja: "家族介護の正直な姿はこうだ。娘が一人、仕事を辞めるということだ。", m: ['rename', 'who-pays'] },
                { en: "In Japan, close to a hundred thousand people a year leave work to nurse a parent.", ja: "日本では毎年十万人近くが、親の介護のために離職している。", m: ['one-number'] },
                { en: "So we are not choosing between family love and cold institutions. We are choosing who collapses first.", ja: "つまり選んでいるのは「家族の愛か冷たい施設か」じゃない。誰が先に倒れるかだ。", m: ['reframe'] },
                { en: "A trained nurse on eight-hour shifts beats an exhausted relative at three in the morning.", ja: "8時間交代の訓練された看護師は、午前3時の疲れ切った身内に勝る。", m: ['compare', 'picture'] },
                { en: "Keep the family for the visits, the meals, the stories. Let professionals carry the lifting.", ja: "家族には面会と食事と思い出話を残せ。持ち上げる仕事はプロに担がせろ。", m: ['concede-pivot'] },
                { en: "Love is not a care plan.", ja: "愛はケアプランではない。", m: ['rename', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Is marriage still necessary, or is it just paperwork now?",
                qJa: "結婚という制度はまだ必要か。もうただの紙切れでは",
                a: [
                    { en: "Half of me agrees. Nobody needs a stamp to love somebody.", ja: "半分は同意する。誰かを愛するのに判子は要らない。", m: ['concede-pivot'] },
                    { en: "And my side carries baggage. The institution shut people out for centuries, and I own that.", ja: "それに俺の側には荷物がある。この制度は何世紀も人を締め出してきた。それは認める。", m: ['own-cost'] },
                    { en: "But marriage was never the love. It is the contract for the worst day, the hospital, the split.", ja: "ただ、結婚は愛そのものだったことは一度もない。最悪の日のための契約だ。病院の日、別れる日の。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "Should parents be punished for what their children do?",
                qJa: "子どもがやったことの責任を、親が取らされるべきでは",
                a: [
                    { en: "Some of it does land on the parents. A neglected child did not raise himself.", ja: "一部は確かに親に落ちる。放置された子は、自分で自分を育てたわけじゃない。", m: ['own-cost', 'concede-pivot'] },
                    { en: "But punish the parent, and watch what parents start to do. They hide the problem instead of reporting it.", ja: "だが親を罰してみろ。親が何を始めるか見ていろ。問題を報告せず、隠すようになる。", m: ['counted'] },
                    { en: "Hold parents responsible for the raising. Hold the child responsible for the act.", ja: "育て方の責任は親に。行為の責任は本人に。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "Everyone tells me the family is sacred. Then the holidays come, and everyone books an early train home.",
            ja: "みんな家族は神聖だと言う。そして正月が来ると、全員が早めの帰りの切符を取る。",
            note: "家族のお題は道徳の説教に転びやすい。理想を語る「我々全員」を撃つ self-joke なら誰も傷つかない。滑ったら Mine leaves at noon. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Is marriage still a necessary institution in modern society?",
            "Should parents be held legally responsible for crimes committed by their children?",
            "Should the care of elderly people fall to families rather than the government?",
            "Is it better for couples to have children later in life?",
        ],
    },

    // ============================================================
    {
        no: 28, id: 'clock-life', label: '時間の使い方', en: 'Whose Time It Is',
        field: 'work',
        owns: '週4日勤務、ワークライフバランス、定年、リモートワーク。「人生の時間を誰が持つか」の話はここが担当',
        sourceDays: [],
        hook: "So we are really asking who owns your hours. Okay.",
        hookJa: "つまり、あなたの時間は誰のものか、という問いですね。",
        universal: "全員に一日24時間しかない。歴史上のあらゆる労働の争いは、その取り分の争いだった。バランスは選ぶものではなく、値段が付くものだ。",
        universalEn: "Everybody gets the same twenty-four hours. Every labour fight in history was a fight over the split. Balance is not chosen. It is priced.",
        angles: [
            { label: '歴史', en: "The weekend was not a gift. Workers fought for it, and owners predicted ruin.", ja: "週末は贈り物ではなかった。労働者が勝ち取り、経営者は破滅を予言した。" },
            { label: '実験', en: "Iceland and the UK ran four-day trials. Output held, and most firms kept it.", ja: "アイスランドとイギリスが週4日を試した。生産は保たれ、大半の会社が続けた。" },
            { label: '測り方', en: "We count hours because hours are easy to count. Nobody counts attention.", ja: "時間を数えるのは、時間が数えやすいからだ。集中は誰も数えない。" },
            { label: '自分', en: "I defend my free time fiercely, then spend it looking at my phone.", ja: "自由時間は必死で守る。そして守った時間でスマホを見ている。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "The trials are in -- firms kept it, and firms are not sentimental",
            stanceJa: "実験結果はもう出た。会社が自分から続けた。会社は情では動かない",
            lines: [
                { en: "I do not have to argue theory here. The experiments already ran.", ja: "ここでは理屈で戦う必要がない。実験はもう走った。", m: ['tried'] },
                { en: "Iceland trialled shorter weeks for years. Then the UK ran a big four-day pilot.", ja: "アイスランドは短い週を何年も試した。次にイギリスが大きな週4日の実証をやった。", m: ['tried'] },
                { en: "Output held, and about nine in ten of the UK firms kept the four-day week.", ja: "生産は保たれ、イギリスの参加企業の9割ほどが週4日を続けた。", m: ['one-number'] },
                { en: "Companies are not sentimental. They kept it because it worked for them.", ja: "会社は情では動かない。続けたのは、自分たちに利があったからだ。", m: ['counted'] },
                { en: "So balance is not a mood. It is a result you can measure.", ja: "つまりバランスは気分じゃない。測れる結果だ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, make it standard -- we are paying for hours and getting tiredness",
            stanceJa: "標準にすべき。我々は時間に金を払い、疲労を受け取っているから",
            lines: [
                { en: "Look at what the fifth day actually buys. Meetings, tired mistakes, and long lunches.", ja: "5日目が実際に何を買っているか見ろ。会議と、疲れからのミスと、長い昼休みだ。", m: ['picture'] },
                { en: "We asked for output. We scheduled hours. Those are not the same purchase.", ja: "欲しかったのは成果だ。予定に入れたのは時間だ。同じ買い物じゃない。", m: ['echo', 'counted'] },
                { en: "When the UK pilot ended, most firms chose to keep the shorter week. Firms do not keep what costs them.", ja: "イギリスの実証が終わったとき、大半の会社は短い週を選んで残した。会社は損になるものを残さない。", m: ['tried'] },
                { en: "The weekend itself was a radical demand once. The economy that was supposed to collapse did not.", ja: "週末だって、かつては過激な要求だった。崩壊するはずだった経済は崩壊しなかった。", m: ['tried', 'echo'] },
                { en: "And rested people quit less, crash less, and call in sick less.", ja: "それに、休めた人間は辞めにくく、事故りにくく、病欠しにくい。", m: ['echo'] },
                { en: "Buy the output. Stop renting the chair.", ja: "成果を買え。椅子を借りるのはやめろ。", m: ['rename', 'land-short'] },
            ],
        },
        no: {
            stance: "No, not as law -- one clock does not fit every job",
            stanceJa: "法律で一律には反対。一つの時計は全部の仕事に合わないから",
            lines: [
                { en: "My worry is simple. An office can compress a week. A hospital cannot.", ja: "心配は単純だ。オフィスは一週間を圧縮できる。病院はできない。", m: ['echo', 'picture'] },
                { en: "Somebody still has to cover Friday. In care work, that means more hires or more overtime.", ja: "金曜は誰かが埋める。ケアの現場なら、それは増員か残業だ。", m: ['who-pays'] },
                { en: "The trial firms were volunteers, mostly desks and laptops. A law covers the kitchens and the wards too.", ja: "実証に出た会社は志願者で、大半が机とノートPCの仕事だ。法律は厨房と病棟にもかかる。", m: ['compare'] },
                { en: "Push it by law and small shops eat the cost, while big offices take the credit.", ja: "法律で押せば、小さな店が負担を飲み、大きなオフィスが手柄を取る。", m: ['who-pays', 'echo'] },
                { en: "I like the direction. It is the speed and the one-size law that scare me.", ja: "方向は好きだ。怖いのは速度と、一律の法律のほうだ。", m: ['speed'] },
                { en: "Offer it where it works. Force it nowhere.", ja: "回る所には差し出せ。どこにも強制するな。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If people get a free day, will they not just take a second job?",
                qJa: "一日空いたら、みんな副業を入れるだけでは",
                a: [
                    { en: "Some will, and that weakens my case. If the day gets sold, nothing was gained.", ja: "そうする人は出るし、それは俺の主張を弱くする。空いた日が売られるなら、何も得ていない。", m: ['own-cost'] },
                    { en: "But we heard this about the weekend too, and most people bought rest, family, and football.", ja: "ただ、同じことは週末のときも言われた。大半の人が買ったのは休息と家族とサッカーだった。", m: ['tried', 'echo'] },
                    { en: "Give people their time back. What they buy with it is their business.", ja: "時間を返せ。それで何を買うかは本人の勝手だ。", m: ['land-short'] },
                ],
            },
            {
                q: "Should the retirement age be raised as people live longer?",
                qJa: "寿命が延びたのだから、定年は引き上げるべきでは",
                a: [
                    { en: "The maths pushes that way, honestly. Fewer workers, longer lives, and the pension has to stretch.", ja: "正直、計算はその方向を指す。働き手は減り、寿命は延び、年金は引き延ばすしかない。", m: ['concede-pivot'] },
                    { en: "But the average is doing the lying here. A professor can work at seventy. A roofer's knees cannot.", ja: "ただ、ここで嘘をついているのは平均値だ。教授は70歳でも働ける。屋根職人の膝は無理だ。", m: ['who-pays', 'picture'] },
                    { en: "Raise the age if we must, and I accept that cost. Just raise it by the job, not by the calendar.", ja: "上げるなら上げていい。その代償は飲む。ただしカレンダーではなく、仕事ごとに上げろ。", m: ['own-cost', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "My company introduced work-life balance. It was a seminar. It ran after hours.",
            ja: "うちの会社もワークライフバランスを導入した。中身はセミナーだった。開催は就業時間後だった。",
            note: "働き方のお題は会社への恨み節になると毒が出る。被害者側の自分の話として、建前と実態のずれを短い三段で見せる。滑ったら We took notes. と足して次へ。",
            m: ['self-joke', 'counted'],
        },
        cards: [
            "Should the four-day working week become the norm?",
            "Is real work-life balance achievable for most people?",
            "Should the age of retirement be raised?",
            "Is working from home better for society as a whole?",
        ],
    },

    // ============================================================
    {
        no: 29, id: 'half-the-team', label: '半分のチーム', en: 'Half The Team',
        field: 'people',
        owns: '男女の平等、女性登用の義務化、クオータ、育児の分担。性別で機会が割れる話はここが担当',
        sourceDays: [],
        hook: "So we are really asking why half the team rarely reaches the top. Okay.",
        hookJa: "つまり、チームの半分がなぜ上までほとんど届かないのか、という問いですね。",
        universal: "才能が男女半々に配られているなら、上が半々でない組織は、どこかで才能を捨てている。本当の議論は「捨てているか」ではなく「どこで捨てているか」だ。",
        universalEn: "If talent is dealt evenly, a team whose top is not even is throwing talent away. The real argument is not whether, but where it gets thrown.",
        angles: [
            { label: '数字', en: "The gap is not a feeling. You can read it off any payroll.", ja: "差は気分の問題ではない。どこの給与台帳からでも読み取れる。" },
            { label: '起点', en: "Careers run level until the first child. Then hers bends and his does not.", ja: "キャリアは最初の子まで並んで走る。そこで彼女の線だけが曲がる。" },
            { label: '実験', en: "Norway put a quota on company boards. The seats filled, and the sky held.", ja: "ノルウェーは役員にクオータを入れた。席は埋まり、空は落ちてこなかった。" },
            { label: '自分', en: "Every man supports equality in general. The test is one specific promotion.", ja: "男は誰でも総論では平等に賛成だ。試されるのは具体的な昇進の一件のほうだ。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "The gap is measured and starts at the first child -- fix the leave and the ladder",
            stanceJa: "差は測定済みで、起点は第一子。直すのはスローガンではなく休業と昇進の仕組み",
            lines: [
                { en: "First, the gap is real. This is measured, not felt.", ja: "まず、差は実在する。これは体感ではなく測定の話だ。", m: ['feel-vs-fact'] },
                { en: "Danish researchers followed parents for years. Her earnings drop after the first child and stay down. His do not move.", ja: "デンマークの研究者が親たちを何年も追った。第一子のあと彼女の収入は落ちて戻らない。彼の収入は動かない。", m: ['tried', 'echo'] },
                { en: "So the problem has an address. It lives between the maternity ward and the promotion list.", ja: "つまり問題には住所がある。産科病棟と昇進リストのあいだに住んでいる。", m: ['picture', 'rename'] },
                { en: "Slogans do not fix an address. Leave that fathers actually take might.", ja: "スローガンは住所を直せない。父親が実際に取る育休なら直せるかもしれない。", m: ['echo'] },
                { en: "Fix the leave and the ladder. The posters can wait.", ja: "休業と梯子を直せ。ポスターは後でいい。", m: ['echo', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, require it -- asking politely has had about fifty years",
            stanceJa: "義務化すべき。お行儀よく頼む作戦には、もう50年ほどやったから",
            lines: [
                { en: "We tried asking nicely. We have been asking for about fifty years.", ja: "丁寧に頼むのは試した。かれこれ50年ほど頼んでいる。", m: ['tried', 'echo'] },
                { en: "Norway forced its boards to forty percent. The predicted collapse never arrived.", ja: "ノルウェーは役員会に4割を義務づけた。予言された崩壊は来なかった。", m: ['tried', 'one-number'] },
                { en: "A quota does not lower the bar. It widens the pool the bar is applied to.", ja: "クオータは基準を下げない。基準を当てる母集団を広げるだけだ。", m: ['rename'] },
                { en: "And the current system is already a quota. It quietly reserves the top for men who look like the last top.", ja: "それに今の仕組みが既にクオータだ。前の「上」に似た男たちのために、上の席をこっそり予約している。", m: ['rename', 'echo'] },
                { en: "Yes, one qualified man will lose a seat he expected. That is a real cost, and I will say it plainly.", ja: "確かに、有能な男が一人、当てにしていた席を失う。それは本物の代償だ。はっきり言っておく。", m: ['own-cost'] },
                { en: "We measured the wait. Now we change the rule.", ja: "待ち時間はもう測った。次はルールを変える番だ。", m: ['counted', 'land-short'] },
            ],
        },
        no: {
            stance: "No forced numbers -- fix the pipeline, not the podium",
            stanceJa: "数の強制には反対。直すべきは表彰台ではなく、そこへ至る配管だから",
            lines: [
                { en: "My fear is what a forced number does to the woman who earned the seat.", ja: "怖いのは、数の強制が「実力で席を取った女性」に何をするかだ。", m: ['who-pays'] },
                { en: "Promote by quota and every woman in the room gets asked the same silent question.", ja: "クオータで昇進させれば、その部屋の全女性が同じ無言の質問を向けられる。", m: ['picture', 'counted'] },
                { en: "Norway filled its boards, true. Below board level, the pay gap barely moved.", ja: "ノルウェーが役員席を埋めたのは本当だ。だが役員の下では、賃金差はほとんど動かなかった。", m: ['tried', 'concede-pivot'] },
                { en: "Because the blockage is not the podium. It is the years when children are small and meetings run late.", ja: "詰まっているのは表彰台ではないからだ。子どもが小さく、会議が夜まで延びる、あの数年だ。", m: ['reframe', 'picture'] },
                { en: "Give fathers leave they must use, and make the six pm meeting embarrassing. The top fixes itself.", ja: "父親に「使わないと消える」育休を渡し、18時の会議を恥にしろ。上は勝手に直る。", m: ['counted'] },
                { en: "Count the nursery, not the boardroom.", ja: "数えるべきは役員室ではなく保育室だ。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Has equality not mostly been achieved already? Women can do any job now.",
                qJa: "平等はもうほぼ達成されたのでは。女性は今、どんな仕事にも就ける",
                a: [
                    { en: "On paper, yes, and that paper victory was real work. I respect it.", ja: "紙の上ではそうだ。その紙の上の勝利も本物の苦労で勝ち取られた。敬意はある。", m: ['concede-pivot'] },
                    { en: "But an open door is not a level floor. Follow the pay after the first child.", ja: "ただ、開いた扉と水平な床は別物だ。第一子のあとの給料を追ってみろ。", m: ['rename', 'feel-vs-fact'] },
                    { en: "And my side must admit the progress, or we sound blind. The gap shrank. It has not closed.", ja: "それに俺の側も進歩は認めないと、現実が見えていない側になる。差は縮んだ。閉じてはいない。", m: ['own-cost', 'echo'] },
                ],
            },
            {
                q: "Should parental leave be split fifty-fifty by law, even if a family wants otherwise?",
                qJa: "育休を法律で半々に強制すべきか。家庭がそれを望まなくても",
                a: [
                    { en: "Forcing families is an ugly tool, and my side should admit that.", ja: "家庭への強制は醜い道具だ。俺の側はそれを認めるべきだ。", m: ['own-cost'] },
                    { en: "But choice is not free when one salary is bigger. The family chooses the maths, and the maths chooses her.", ja: "ただ、片方の給料が大きい時点で、選択は自由じゃない。家庭は計算を選び、計算が彼女を選ぶ。", m: ['echo', 'counted'] },
                    { en: "So reserve months for fathers, use them or lose them. Sweden did, and the fathers went.", ja: "だから父親専用の月を作れ。使わなければ消える形で。スウェーデンがやり、父親たちは実際に取った。", m: ['tried', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "My office declared its full support for women in leadership. The announcement was read out by our eighth male president in a row.",
            ja: "うちの会社は女性登用への全面支援を宣言した。読み上げたのは八代連続の男性社長だった。",
            note: "このお題は男を撃てば喧嘩、女を撃てば事故。安全なのは組織の建前と実績のずれだけを撃つ形。怒りではなく数字の可笑しさで見せる。滑ったら He was very sincere. と足して次へ。",
            m: ['counted', 'picture'],
        },
        cards: [
            "Should companies be obliged to appoint more women to senior positions?",
            "Has true equality between men and women been achieved?",
            "Can quotas for women in leadership be justified?",
            "Should parental leave be divided equally between parents by law?",
        ],
    },

    // ============================================================
    {
        no: 30, id: 'good-life', label: '幸福とは', en: 'The Good Life',
        field: 'self',
        owns: '幸福と成功の定義、情熱か現実か、選択肢が多すぎる問題。全テーマの最終着地点。どのお題も最後は「人はどう生きるか」に降りる',
        sourceDays: [],
        hook: "So we are really asking what a good life is made of. Okay.",
        hookJa: "つまり、良い人生は何でできているのか、という問いですね。",
        universal: "どのお題も、最後はここに降りてくる。金も制度も技術も、良い人生のための道具でしかない。そして人間は道具の話は流暢なのに、肝心の人生の話になると黙る。",
        universalEn: "Every debate lands here in the end. Money, systems, and machines are all tools for a life. We argue the tools fluently and go quiet about the life.",
        angles: [
            { label: '研究', en: "Harvard tracked lives for over eighty years. Relationships kept winning.", ja: "ハーバードは80年以上、人生を追跡した。勝ち続けたのは人間関係だった。" },
            { label: '金', en: "Money stops fear. Past that, it mostly buys comparison.", ja: "金は恐怖を止める。そこから先は、だいたい他人との比較を買っている。" },
            { label: '選択', en: "A shop offered twenty-four jams and sold less than the shop with six.", ja: "ジャムを24種並べた店は、6種の店より売れなかった。" },
            { label: '自分', en: "I know what makes me happy. I still scroll instead.", ja: "何が自分を幸せにするかは知っている。それでもスクロールしてしまう。" },
        ],
        origin: {
            day: 0, essay: "(新規テーマ -- 元エッセイなし)",
            stance: "Past a modest income, the needle moves on people and purpose",
            stanceJa: "そこそこの収入から先、針を動かすのは人と目的",
            lines: [
                { en: "Strip the question down. What actually moves the needle on a life?", ja: "問いを裸にしよう。人生の針を実際に動かすのは何か。", m: ['reframe'] },
                { en: "The longest study we have runs at Harvard. It has followed people for over eighty years.", ja: "手元にある最長の研究はハーバードのものだ。80年以上、人を追い続けている。", m: ['tried', 'one-number'] },
                { en: "The answer kept repeating. Not fame. Not money past a point. Relationships.", ja: "答えは繰り返し同じだった。名声ではない。ある点から先の金でもない。人間関係だ。", m: ['echo'] },
                { en: "Money matters hugely when you are poor. It buys off fear. Then the curve goes flat.", ja: "貧しいとき、金は決定的に効く。恐怖を買い取ってくれる。その先で曲線は平らになる。", m: ['concede-pivot', 'picture'] },
                { en: "So the good life is less a prize than a practice. Mostly the practice of showing up for people.", ja: "つまり良い人生は、賞品というより習慣だ。だいたいは、人のところに顔を出し続ける習慣だ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, mostly built -- happiness follows habits more than events",
            stanceJa: "おおむね選べる。幸福は出来事より習慣に付いてくるから",
            lines: [
                { en: "Watch what happens after the big events. Lottery winners drift back to their old baseline.", ja: "大きな出来事のあとに何が起きるか見ろ。宝くじの当選者は、元の水準に漂い戻っていく。", m: ['tried'] },
                { en: "So the event is not the happiness. The habits around it are.", ja: "つまり出来事そのものが幸福なのではない。その周りの習慣のほうだ。", m: ['rename', 'echo'] },
                { en: "Sleep, movement, people, and something to build. Boring, and it works.", ja: "睡眠、運動、人、そして作りかけの何か。退屈だが、効く。", m: ['echo'] },
                { en: "We treat happiness as weather. It behaves more like fitness.", ja: "我々は幸福を天気のように扱う。実際の振る舞いは筋力に近い。", m: ['compare', 'rename'] },
                { en: "This view can slide into blaming the sad, and that is a real danger. I hold it carefully.", ja: "この考えは「落ち込む奴が悪い」に滑り落ちうる。それは本物の危険だ。慎重に持つ。", m: ['own-cost'] },
                { en: "Stop waiting for the event. Train the days.", ja: "出来事を待つな。日々を鍛えろ。", m: ['echo', 'land-short'] },
            ],
        },
        no: {
            stance: "No -- circumstances deal the cards, and choice plays a small hand",
            stanceJa: "選べない。カードを配るのは境遇で、選択の持ち札は小さいから",
            lines: [
                { en: "Tell a night-shift worker with two jobs to choose happiness. Watch the look you get.", ja: "仕事を掛け持ちする夜勤の人に「幸福を選べ」と言ってみろ。返ってくる目つきを見ろ。", m: ['picture', 'who-pays'] },
                { en: "Choice is a luxury with entry requirements. Rent paid, body healthy, nobody sick at home.", ja: "選択とは、入場条件つきの贅沢品だ。家賃が払えて、体が動いて、家に病人がいないこと。", m: ['rename'] },
                { en: "Twin studies keep finding the same thing. A big slice of temperament comes installed.", ja: "双子の研究は繰り返し同じ結論を出す。気質のかなりの部分は、最初から実装済みだ。", m: ['tried'] },
                { en: "The choice story flatters the lucky. It lets the winners call their luck a decision.", ja: "「選べる」という物語は運の良かった側に甘い。勝者が自分の運を「決断」と呼べてしまう。", m: ['rename', 'echo'] },
                { en: "And it quietly blames the sad, which is cruelty dressed as advice.", ja: "そして、落ち込んでいる側をこっそり責める。それは助言の服を着た残酷さだ。", m: ['rename', 'who-pays'] },
                { en: "Fix the circumstances first. Then talk to me about attitude.", ja: "まず境遇を直せ。心構えの話はその後で聞く。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Does money buy happiness or not? Give me a straight answer.",
                qJa: "結局、金で幸福は買えるのか。はっきり答えてほしい",
                a: [
                    { en: "Straight answer: yes up the slope, then barely. Poverty is misery, and money ends it.", ja: "はっきり答える。坂の途中までは買える。その先はほとんど買えない。貧困は不幸そのもので、金はそれを終わらせる。", m: ['both-true', 'concede-pivot'] },
                    { en: "Past a decent income, the famous studies start arguing with each other, and I will not fake certainty.", ja: "まともな収入から先は、有名な研究どうしが喧嘩を始める。確信のふりはしない。", m: ['own-cost', 'tried'] },
                    { en: "Buy security, buy time, buy dinners with friends. Stop buying scoreboard.", ja: "安心を買え。時間を買え。友人との夕食を買え。順位表を買うのはやめろ。", m: ['echo', 'land-short'] },
                ],
            },
            {
                q: "Follow your passion or be practical -- which do you tell a young person?",
                qJa: "若い人には「情熱に従え」と「現実を見ろ」のどちらを言う？",
                a: [
                    { en: "Both slogans fail somebody. Passion fails the broke. Practical fails the bored.", ja: "どちらの標語も誰かを見捨てる。情熱は金のない者を見捨て、現実路線は退屈した者を見捨てる。", m: ['echo', 'both-true'] },
                    { en: "So my advice costs something either way, and I will not pretend it is safe.", ja: "だから俺の助言はどちらに転んでも代償がある。安全なふりはしない。", m: ['own-cost'] },
                    { en: "I say this. Get good at something people need, near something you love. Passion grows on skill.", ja: "俺はこう言う。愛せるものの近くで、人に必要とされる技を磨け。情熱は技の上に生える。", m: ['land-short'] },
                ],
            },
        ],
        joke: {
            en: "I read three books on happiness last year. Reading a fourth felt more urgent than calling my friends.",
            ja: "去年、幸福についての本を三冊読んだ。友だちに電話するより、四冊目を読むほうが急ぎに思えた。",
            note: "幸福論は語った瞬間に説教になる。分かっているのに出来ない自分を先に差し出す self-joke が唯一安全。直後の「人間関係が答え」への橋にもなる。滑ったら Chapter one says call your friends. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Is happiness mainly a matter of personal choice?",
            "Is it wiser to follow your passion or to be practical about your career?",
            "Do people today have too many choices?",
            "Can money buy happiness?",
        ],
    },
];
