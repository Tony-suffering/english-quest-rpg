/**
 * THEME 30 -- テーマ 01-10。v2フォーマット(ムーブタグ付き)。
 * origin = 既存ライティング30本で書いた立場の口語版。あの30本は捨てない。
 * 全行が m: ムーブIDタグ(eiken-moves.ts)を持つ。タグ = その行を覚える根拠。
 */

import type { Theme } from './eiken-theme30-types';

export const THEMES_A: Theme[] = [
    // ============================================================
    {
        no: 1, id: 'who-pays', label: '誰が他人の分を払うか', en: 'Who Pays For Other People',
        field: 'money',
        owns: '援助・福祉・再分配など「他人の分を金で支える」話すべてを担当',
        sourceDays: [8, 27, 30],
        hook: "So we are really asking who pays for someone else. Okay.",
        hookJa: "つまり、他人の分を誰が払うのかという話ですね。",
        universal: "助けたい気持ちと、自分の取り分を減らしたくない気持ちは、同じ人の中に同時にある。どちらかが嘘なのではなく、両方が本当。",
        universalEn: "Everyone wants to help, and nobody wants to be the one who pays. Both of those are honest at the same time.",
        angles: [
            { label: '経済', en: "A poor country buys nothing. A country with money buys your cars.", ja: "貧しい国は何も買わない。金のある国はこちらの車を買う。" },
            { label: '道徳', en: "If you would not let it happen in your street, then distance is doing a lot of work.", ja: "自分の通りで起きたら放置しないことなら、「遠い」という理由が仕事をしすぎている。" },
            { label: '歴史', en: "Nobody got rich alone. We got rich selling to everybody.", ja: "誰も一人で豊かになっていない。全員に売って豊かになった。" },
            { label: '自分', en: "It is easy until it is your salary. Then everyone becomes an economist.", ja: "自分の給料から出ると言われた瞬間、全員が経済学者になる。" },
        ],
        origin: {
            day: 27, essay: "Yes. Japan should increase foreign aid -- diplomacy, global problems, own economy.",
            stance: "Yes, increase it, because it comes back",
            stanceJa: "増やすべき。戻ってくるから",
            lines: [
                { en: "Japan should give more, and I will give you the selfish reason first.", ja: "日本はもっと出すべきだ。先に打算的な理由から言う。", m: ['reframe'] },
                { en: "Aid buys you a seat. When you need a vote at the UN, you need friends who owe you something.", ja: "援助は席を買う。国連で票が要るとき、こっちに借りのある友人が必要になる。", m: ['picture'] },
                { en: "It also builds the market. A country you helped stand up is a country that buys your machines.", ja: "市場も作る。立ち上がるのを助けた国は、こっちの機械を買う国になる。", m: ['echo'] },
                { en: "And the problems we spend the most on start over there. Disease. Refugees. Bad weather.", ja: "それに、こっちが一番金を使う問題は向こうで始まる。病気、難民、異常気象。", m: ['future-bill', 'picture'] },
                { en: "So the money is not leaving. It is going out early instead of coming back as a bill.", ja: "だから金は出ていくんじゃない。あとで請求書として戻る代わりに、先に出ているだけだ。", m: ['rename', 'future-bill'] },
            ],
        },
        yes: {
            stance: "Yes, and stop pretending it is charity",
            stanceJa: "出すべき。ただし慈善だと言うのはやめよう",
            lines: [
                { en: "Look, we did not get rich in a vacuum. We got rich selling things to everybody.", ja: "こっちは真空の中で豊かになったわけじゃない。全員に物を売って豊かになった。", m: ['echo'] },
                { en: "Japan sends aid and people call it charity. It is not charity. It is a customer list.", ja: "日本が援助を出すと慈善だと言われる。慈善じゃない。顧客名簿だ。", m: ['rename'] },
                { en: "A country with money buys your cars. A country with nothing buys nothing.", ja: "金のある国はこっちの車を買う。何もない国は何も買わない。", m: ['echo', 'picture'] },
                { en: "And problems do not stay put. Disease does not check your passport. Neither does smoke.", ja: "それに問題はその場に留まらない。病気はパスポートを確認しない。煙もしない。", m: ['picture', 'echo'] },
                { en: "So paying now is just paying less later, with better timing.", ja: "だから今払うのは、あとで払うより安いというだけの話だ。しかもタイミングがいい。", m: ['future-bill'] },
                { en: "Call it self-interest if that helps. I do not care what we call it. I care that we do it.", ja: "自己利益と呼びたければ呼べばいい。呼び方はどうでもいい。やるかどうかが問題だ。", m: ['land-short'] },
            ],
        },
        no: {
            stance: "No, because the money is not the lever we think it is",
            stanceJa: "出すべきではない。金はこちらが思っているレバーではないから",
            lines: [
                { en: "Here is the thing. Rich countries send about two hundred billion dollars in aid a year.", ja: "ここが肝心なところで、豊かな国が出す援助は年に約二千億ドル。", m: ['one-number'] },
                { en: "The people who left those countries send home about three times that. Families beat governments.", ja: "その国を出た人たちが仕送りする額はその約三倍。家族が政府に勝っている。", m: ['one-number', 'compare'] },
                { en: "And on the other side, we put tariffs on exactly what poor countries can sell us. Sugar. Cotton. Clothes.", ja: "そのうえこっちは、貧しい国が売れるものにちょうど関税をかけている。砂糖、綿、衣料品。", m: ['picture'] },
                { en: "So we take with one hand, hand back a smaller amount with the other, and then we take a photo.", ja: "片手で取り上げ、もう片手でそれより少ない額を返し、それから写真を撮る。", m: ['picture'] },
                { en: "I am not against helping. I am against calling this helping.", ja: "助けることに反対しているんじゃない。これを助けと呼ぶことに反対している。", m: ['echo', 'rename'] },
                { en: "You want the cheapest anti-poverty policy in the world? It is a visa. It costs us nothing.", ja: "世界で一番安い貧困対策を知りたい？ ビザだ。こっちは一円も出さない。", m: ['compare', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "But a lot of aid is stolen. Why send more into that?",
                qJa: "援助の多くは盗まれている。なぜもっと送るのか",
                a: [
                    { en: "Some of it is. That is true and I am not going to argue it away.", ja: "一部はそうだ。事実だし、言い逃れはしない。", m: ['own-cost'] },
                    { en: "But notice we only apply that test to poor countries. Money gets stolen here too. We call it procurement.", ja: "ただ、その基準を貧しい国にしか当てていない。こっちでも金は盗まれる。それは調達と呼ばれている。", m: ['compare', 'rename'] },
                    { en: "And the fix is known. Give the money to the people instead of the ministry. Cash straight to households leaks a lot less.", ja: "直し方も分かっている。省庁ではなく人に直接渡す。世帯への現金給付は漏れがずっと少ない。", m: ['tried'] },
                    { en: "So theft is an argument about the pipe, not about the water.", ja: "だから盗難は配管の議論であって、水の議論じゃない。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "Should we not fix our own poor first?",
                qJa: "まず自国の貧困を直すべきでは",
                a: [
                    { en: "I hear that a lot, and I notice it is usually said by people who are not doing either.", ja: "よく聞く。そしてたいてい、どちらもやっていない人が言う。", m: ['concede-pivot', 'own-cost'] },
                    { en: "Also the numbers are not the same size. Aid is under one percent of what a rich country spends.", ja: "それに規模が違う。援助は豊かな国の支出の一パーセント未満だ。", m: ['one-number', 'compare'] },
                    { en: "Cutting it does not fund a single school here. It just makes us feel decisive.", ja: "削っても国内の学校ひとつ建たない。決断した気分になるだけだ。", m: ['feel-vs-fact'] },
                    { en: "If someone wants to spend that one percent at home, fine. Show me the plan. Nobody ever has one.", ja: "その一パーセントを国内で使いたいなら結構。計画を見せてくれ。誰も持っていたことがない。", m: ['compare', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "We call it foreign aid because 'buying future customers' does not fit on the poster.",
            ja: "対外援助と呼ぶのは、「未来の顧客を買う」だとポスターに収まらないからだ。",
            note: "偽善を暴く型。賛成でも反対でも撃てる。自分もその偽善の中にいる書き方なので嫌味にならない。",
            m: ['rename', 'self-joke'],
        },
        cards: [
            "Should developed countries lead the fight against global poverty?",
            "Should wealthy nations increase their foreign aid?",
            "Do welfare programs actually reduce inequality?",
            "Should rich countries pay for climate damage abroad?",
        ],
    },

    // ============================================================
    {
        no: 2, id: 'borders', label: '国境と人の移動', en: 'Borders And Who Gets In',
        field: 'people',
        owns: '移民・国境・受け入れの条件など「誰を入れて、誰が決めるか」の話すべてを担当',
        sourceDays: [4],
        hook: "So the question is who we let in, and who decides. Right.",
        hookJa: "誰を入れるのか、そして誰が決めるのか、という問いですね。",
        universal: "人は自分が入る側のときは扉を開けろと言い、他人が入ってくる側になると列に並べと言う。同じ人が、立つ場所で意見を変える。",
        universalEn: "When we are the ones moving, we want the door open. When somebody else is moving, we want a queue.",
        angles: [
            { label: '人口', en: "Japan is not short of opinions about immigration. Japan is short of people.", ja: "日本に足りないのは移民についての意見ではない。人間だ。" },
            { label: '体感', en: "The fear is not really about numbers. It is about the street looking different.", ja: "怖いのは数字ではない。通りの見え方が変わることだ。" },
            { label: '経済', en: "Every country that aged fast and closed the door got the same bill.", ja: "急速に高齢化して扉を閉めた国は、どこも同じ請求書を受け取った。" },
            { label: '個人', en: "Ask anyone who has lived abroad. The paperwork is the cruelty, not the border.", ja: "海外に住んだ人に聞けばいい。むごいのは国境ではなく手続きのほうだ。" },
        ],
        origin: {
            day: 4, essay: "Yes. Developed nations should encourage immigration.",
            stance: "Yes, and mostly for boring practical reasons",
            stanceJa: "受け入れるべき。しかも理由はだいたい地味で実務的なもの",
            lines: [
                { en: "Rich countries should take more people, and the reason is not romantic. It is staffing.", ja: "豊かな国はもっと人を入れるべきだ。理由はロマンじゃない。人手だ。", m: ['rename'] },
                { en: "The population is falling and the average age is going up. Somebody has to do the work.", ja: "人口は減り、平均年齢は上がっている。誰かが仕事をしないといけない。", m: ['who-pays'] },
                { en: "Immigrants also start businesses at a higher rate than locals do. That keeps showing up in the data.", ja: "移民は現地の人より高い率で事業を起こす。これはデータに出続けている。", m: ['feel-vs-fact'] },
                { en: "And once they work, they pay tax. A working migrant is a net contributor within a few years.", ja: "働けば税を払う。働く移民は数年で純粋な担い手になる。", m: ['who-pays'] },
                { en: "Germany took a lot of people in and got a labour force out of it. That is the whole argument.", ja: "ドイツは大勢を受け入れて労働力を得た。論拠はそれで全部だ。", m: ['tried', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, take more, and be honest about why",
            stanceJa: "もっと受け入れるべき。理由を正直に言ったうえで",
            lines: [
                { en: "Japan is losing something like half a million people a year. That is a city. Every year.", ja: "日本は年に五十万人くらい減っている。都市がひとつだ。毎年。", m: ['one-number', 'picture'] },
                { en: "You cannot fix that with a poster telling young people to have babies. We tried. It did not work.", ja: "若者に子どもを産めというポスターでは直らない。やってみた。効かなかった。", m: ['tried'] },
                { en: "Someone has to drive the buses and look after my parents. That is not an opinion, that is arithmetic.", ja: "誰かがバスを運転して、俺の親の面倒を見る必要がある。意見じゃなくて算数だ。", m: ['picture', 'rename'] },
                { en: "And people say it will change the culture. Yes. It will. Culture is not a museum.", ja: "文化が変わると言われる。変わる。文化は博物館じゃない。", m: ['concede-pivot', 'rename'] },
                { en: "The country that took people in and got it slightly wrong still beat the country that took nobody.", ja: "人を入れて少し失敗した国のほうが、誰も入れなかった国よりまだ勝っている。", m: ['compare'] },
                { en: "I would rather have a messy full room than a tidy empty one.", ja: "きれいな空き部屋より、散らかった満室のほうがいい。", m: ['picture', 'land-short'] },
            ],
        },
        no: {
            stance: "No, not until we are honest about what we are asking of people",
            stanceJa: "今のままでは受け入れるべきでない。何を人に求めているのか正直になるまでは",
            lines: [
                { en: "I am not against people coming. I am against how we do it.", ja: "人が来ることに反対しているんじゃない。やり方に反対している。", m: ['echo', 'reframe'] },
                { en: "We say we want workers. We do not want workers. We want a machine that goes home at sixty.", ja: "労働者が欲しいと言うが、労働者は欲しくない。六十で帰る機械が欲しいだけだ。", m: ['echo', 'rename'] },
                { en: "Japan brought people in on training visas and then acted surprised when they had lives.", ja: "日本は技能実習の名で人を入れて、その人たちに生活があると知って驚いてみせた。", m: ['tried'] },
                { en: "If you bring somebody in, their children go to your schools and their parents get old here. That is the deal.", ja: "人を呼べば、その子どもはこっちの学校に通い、その親はここで年を取る。それが取引だ。", m: ['future-bill', 'picture'] },
                { en: "A country that will not plan for that should not open the door and call it generosity.", ja: "そこを計画できない国は、扉を開けてそれを寛容と呼ぶべきじゃない。", m: ['rename'] },
                { en: "Do it properly or do not do it. The cruel version is worse than either.", ja: "ちゃんとやるか、やらないか。中途半端が一番むごい。", m: ['land-short'] },
            ],
        },
        deeper: [
            {
                q: "What about crime? People do worry about that.",
                qJa: "犯罪はどうか。実際に心配されている",
                a: [
                    { en: "They do, and I do not think the worry is stupid. It is just not what the numbers show.", ja: "心配されている。その心配が馬鹿だとは思わない。ただ数字がそう出ていないだけだ。", m: ['concede-pivot', 'own-cost'] },
                    { en: "In most countries that have checked, migrants offend at about the same rate or lower.", ja: "調べた国の大半で、移民の犯罪率は同程度か低い。", m: ['tried'] },
                    { en: "What actually rises is reporting, because a new group gets watched more closely.", ja: "実際に上がるのは通報件数だ。新しい集団はより厳しく見られるから。", m: ['feel-vs-fact'] },
                    { en: "The real risk is not the people who come. It is what happens if we lock them out of legal work for ten years.", ja: "本当のリスクは来ることじゃない。十年間、合法な仕事から締め出したときに起きることだ。", m: ['rename', 'future-bill'] },
                ],
            },
            {
                q: "Can a country stay itself if the population changes?",
                qJa: "人口構成が変われば国は国のままでいられるのか",
                a: [
                    { en: "That depends what you think the country is. If it is a bloodline, then no, obviously not.", ja: "国を何だと思うかによる。血統だと思うなら、当然、無理だ。", m: ['define', 'own-cost'] },
                    { en: "If it is a language, a set of habits and a place, then it survives anything. It always has.", ja: "言語と習慣と土地だと思うなら、何があっても残る。ずっとそうだった。", m: ['define', 'tried'] },
                    { en: "Japan a hundred years ago would not recognise Japan now, and nobody says we lost it.", ja: "百年前の日本は今の日本を認識できない。それでも失われたと言う人はいない。", m: ['tried'] },
                    { en: "The thing that actually kills a culture is nobody being left to practise it.", ja: "文化を実際に殺すのは、それを続ける人間が誰も残らないことだ。", m: ['rename', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "We asked for workers, and human beings turned up. Somehow that surprised everybody.",
            ja: "労働力を頼んだら、人間が来た。なぜか全員が驚いた。",
            note: "移民のお題で最も安全に笑いが取れる形。制度の建前と現実のずれを一行で見せる。賛成側でも反対側でも撃てる。",
            m: ['echo', 'picture'],
        },
        cards: [
            "Should developed nations accept more immigrants?",
            "Is immigration the answer to an aging population?",
            "Should countries prioritize their own workers first?",
            "Can a country stay the same while its population shrinks?",
        ],
    },

    // ============================================================
    {
        no: 3, id: 'work-gone', label: '仕事が消えるとき', en: 'When The Work Goes Away',
        field: 'work',
        owns: '自動化・失業・産業の衰退など「仕事が消えたあとの人間」の話すべてを担当',
        sourceDays: [10, 29],
        hook: "So this is really about what happens to people whose job disappears.",
        hookJa: "つまり、仕事が消えた人がどうなるかという話ですね。",
        universal: "人は収入を失うことより、自分が要らないと言われることに耐えられない。金は補償できるが、その部分は補償できない。",
        universalEn: "People can survive losing the money. What breaks them is being told they are not needed.",
        angles: [
            { label: '歴史', en: "Every time this happened, the jobs came back. Just not to the same people.", ja: "毎回、仕事は戻ってきた。ただし同じ人のところには戻らなかった。" },
            { label: '速度', en: "The question is not whether it happens. It is whether it happens faster than a career.", ja: "問題は起きるかどうかではない。人の職業人生より速いかどうかだ。" },
            { label: '尊厳', en: "A town does not die when the factory closes. It dies about ten years later.", ja: "工場が閉じた日に町は死なない。死ぬのは十年後だ。" },
            { label: '分配', en: "The gain shows up in a share price. The loss shows up in a hospital.", ja: "利益は株価に出る。損失は病院に出る。" },
        ],
        origin: {
            day: 29, essay: "Yes. AI will have a positive impact -- productivity, healthcare, access to education.",
            stance: "Yes, it helps, and the gains are already visible",
            stanceJa: "役に立つ。しかも効果はもう見えている",
            lines: [
                { en: "I think this ends well, and some of it is already here.", ja: "これは最後にはうまくいくと思っている。一部はもう来ている。", m: ['tried'] },
                { en: "It reads scans. In some trials the machine catches cancers a tired doctor misses at two in the morning.", ja: "画像を読む。試験によっては、深夜二時の疲れた医師が見逃す癌を機械が拾う。", m: ['picture', 'tried'] },
                { en: "It gives a kid in a village the same tutor a rich kid has. That has never been true before.", ja: "村の子どもに、金持ちの子と同じ家庭教師を与える。これは歴史上なかったことだ。", m: ['picture'] },
                { en: "And it takes the part of the job nobody wanted anyway. Forms. Sorting. Copying numbers across.", ja: "それに、そもそも誰もやりたくなかった部分を持っていく。書類、仕分け、数字の写し。", m: ['picture'] },
                { en: "So I am not defending the technology. I am saying look at what it removed from the day.", ja: "だから技術を擁護しているんじゃない。一日から何が消えたかを見ろと言っている。", m: ['echo'] },
            ],
        },
        yes: {
            stance: "Yes, it works out, but only if you say who pays on the way",
            stanceJa: "最終的にはうまくいく。ただし道中で誰が払うかを言うなら",
            lines: [
                { en: "Every time a machine took the work, we ended up with more work, not less. That is just the record.", ja: "機械が仕事を取るたびに、仕事は減らずに増えてきた。それは単なる記録の話だ。", m: ['tried'] },
                { en: "Farming was almost everybody. Now it is almost nobody, and nobody is starving because of it.", ja: "農業はかつてほぼ全員だった。今はほぼ誰もいない。それで飢えている人はいない。", m: ['tried', 'echo'] },
                { en: "So I am not scared of the machine. I am scared of the twenty years in the middle.", ja: "だから機械は怖くない。怖いのは間の二十年だ。", m: ['middle-years', 'echo'] },
                { en: "When the mines closed in England, the economics were right and the towns are still not back. Forty years.", ja: "英国で炭鉱が閉じたとき、経済の理屈は正しくて、町は今も戻っていない。四十年だ。", m: ['tried', 'one-number'] },
                { en: "One generation paid the whole bill for a change that helped everybody else.", ja: "一世代が、他の全員を助けた変化の請求書を丸ごと払った。", m: ['who-pays'] },
                { en: "Being right about the ending does not mean you get to skip the middle.", ja: "結末について正しいことは、途中を飛ばしていい理由にならない。", m: ['middle-years', 'land-short'] },
            ],
        },
        no: {
            stance: "No, this one is different, and the difference is speed",
            stanceJa: "今回は違う。違いは速度",
            lines: [
                { en: "People keep saying we have been here before. We have. But look at how fast.", ja: "前にもあったと言われ続ける。あった。でも速さを見てほしい。", m: ['concede-pivot', 'speed'] },
                { en: "The move off the farms took a hundred years. A person got a whole life to adjust.", ja: "農業から離れる動きには百年かかった。一人が一生かけて適応できた。", m: ['speed', 'one-number'] },
                { en: "This is happening inside one career. You train at twenty-five and it is gone at forty.", ja: "今回は一つの職業人生の中で起きている。二十五で訓練して、四十で消える。", m: ['speed', 'picture'] },
                { en: "And it is not taking the heavy work this time. It is taking the desk. That is new.", ja: "しかも今回持っていくのは重労働じゃない。机のほうだ。そこが新しい。", m: ['rename'] },
                { en: "You cannot retrain a forty-five-year-old every four years and call that a plan.", ja: "四十五歳を四年ごとに再訓練させて、それを計画と呼ぶのは無理だ。", m: ['picture', 'speed'] },
                { en: "I am not saying stop it. I am saying stop pretending the last time tells us anything.", ja: "止めろとは言っていない。前回が何かを教えてくれるふりをやめろと言っている。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "So what would you actually do about it?",
                qJa: "では実際に何をするのか",
                a: [
                    { en: "Two things, and neither of them is retraining, because retraining alone has a bad record.", ja: "二つある。どちらも再訓練じゃない。再訓練単体の実績は悪いからだ。", m: ['tried', 'own-cost'] },
                    { en: "First, pay for the move. If the work is in the next city, the barrier is rent, not skill.", ja: "一つ、移動の費用を出す。仕事が隣の市にあるなら、壁は技能じゃなくて家賃だ。", m: ['rename'] },
                    { en: "Second, do not let a whole town depend on one employer. That is a planning failure, not a technology failure.", ja: "二つ、町ひとつを雇い主ひとつに依存させない。あれは技術の失敗じゃなくて計画の失敗だ。", m: ['rename', 'echo'] },
                    { en: "The machine is not the problem. Putting all the eggs in one factory was the problem.", ja: "機械が問題なんじゃない。工場ひとつに全部の卵を入れたのが問題だった。", m: ['rename', 'picture'] },
                ],
            },
            {
                q: "Are you not just afraid of change?",
                qJa: "変化を恐れているだけでは",
                a: [
                    { en: "Maybe. Everyone should check that about themselves, so it is a fair question.", ja: "かもしれない。それは全員が自分について確認すべきだから、まっとうな質問だ。", m: ['concede-pivot', 'own-cost'] },
                    { en: "But I am not asking to stop it. I have never once said stop it.", ja: "ただ、止めろとは言っていない。一度も言っていない。", m: ['echo'] },
                    { en: "I am asking who is holding the bill while it happens, and that question is never afraid of anything.", ja: "その最中に誰が請求書を持っているのかを聞いている。その問いは何も恐れていない。", m: ['who-pays'] },
                    { en: "If the answer is 'the same forty towns as last time,' then the plan is not finished.", ja: "答えが「前回と同じ四十の町」なら、計画は完成していない。", m: ['picture', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "They keep telling coal miners to learn to code. Nobody has ever told a programmer to learn to mine.",
            ja: "炭鉱夫にはプログラミングを学べと言う。プログラマーに炭鉱を学べと言った人はいない。",
            note: "強い側と弱い側に別の物差しを当てている構図を一行で見せる。自動化・教育・格差のどれでも撃てる万能の一撃。",
            m: ['compare', 'picture'],
        },
        cards: [
            "Will AI benefit society in the long run?",
            "Has industrialization done more good than harm?",
            "Should governments protect declining industries?",
            "Will automation create more jobs than it destroys?",
        ],
    },

    // ============================================================
    {
        no: 4, id: 'why-learn', label: '何のために学ぶか', en: 'What Learning Is Actually For',
        field: 'learn',
        owns: '学位の価値・教養と実用・教育費など「何のために学ぶか」の話すべてを担当',
        sourceDays: [20],
        hook: "So we are asking what school is even for. That is a big one.",
        hookJa: "学校は何のためにあるのか、という問いですね。大きい問いだ。",
        universal: "人は「役に立つから学ぶ」と言いながら、一生覚えているのは役に立たなかったことのほうだ。",
        universalEn: "We all say we study things because they are useful, and then we spend our lives remembering the useless ones.",
        angles: [
            { label: '雇用', en: "Employers say they want skills. They hire the person who can explain things.", ja: "企業は技能が欲しいと言う。実際に採るのは説明できる人だ。" },
            { label: '時間', en: "You pick a subject at eighteen for a job that will change four times.", ja: "十八歳で科目を選ぶが、その仕事は四回変わる。" },
            { label: '階層', en: "A subject is only called useless when poor people study it.", ja: "役に立たない学問と呼ばれるのは、貧しい人が学ぶときだけだ。" },
            { label: '本音', en: "Nobody has ever said, at the end, that they wished they had done more spreadsheets.", ja: "最期に「もっと表計算をやっておけば」と言った人はいない。" },
        ],
        origin: {
            day: 20, essay: "A Humanities degree remains highly relevant today.",
            stance: "Yes, it still matters, and the market quietly agrees",
            stanceJa: "今も価値がある。市場も黙って同意している",
            lines: [
                { en: "The humanities are still worth it, and I can show you where it pays.", ja: "人文系は今も価値がある。どこで元が取れるか示せる。", m: ['reframe'] },
                { en: "Most senior jobs are reading, deciding and then persuading somebody. That is the whole day.", ja: "上に行くほど仕事は、読んで、決めて、誰かを説得すること。一日それだけだ。", m: ['picture'] },
                { en: "Companies keep saying they cannot find people who write clearly. They are not short of coders.", ja: "企業は明快に書ける人が見つからないと言い続けている。技術者が足りないとは言っていない。", m: ['compare'] },
                { en: "And the technical skill you learn at twenty is stale at thirty. The reading is not.", ja: "二十歳で覚えた技術は三十歳で古い。読む力は古くならない。", m: ['echo', 'speed'] },
                { en: "So it is not a soft subject. It is the part of the job that has not been automated yet.", ja: "だから柔らかい学問じゃない。まだ自動化されていない側の仕事だ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, it pays, just not on the first payslip",
            stanceJa: "元は取れる。ただし最初の給与明細には出ない",
            lines: [
                { en: "People ask what you do with a history degree. You read a lot and you argue for a living.", ja: "歴史の学位で何をするのかと聞かれる。大量に読んで、議論で食っていく。", m: ['reframe'] },
                { en: "That is most jobs now. Somebody has to work out what the data means and then say it out loud.", ja: "今はそれが大半の仕事だ。データが何を意味するかを割り出して、声に出して言う人が要る。", m: ['picture'] },
                { en: "The engineering is getting automated faster than the arguing is.", ja: "自動化されているのは、議論のほうより工学のほうが先だ。", m: ['speed', 'compare'] },
                { en: "And here is the thing. Nobody remembers a single spreadsheet. Everybody remembers one teacher.", ja: "それに、表計算を覚えている人はいない。先生を一人覚えている人は全員いる。", m: ['echo', 'picture'] },
                { en: "We keep measuring school by the first salary. That is a five-year test on a fifty-year thing.", ja: "学校を初任給で測り続けている。五十年の話に五年のテストを当てている。", m: ['counted'] },
                { en: "Teach a person to think and they will pick up the software in a month.", ja: "考え方を教えれば、ソフトは一か月で覚える。", m: ['land-short'] },
            ],
        },
        no: {
            stance: "No, and defending it with 'critical thinking' is how we lost the argument",
            stanceJa: "価値があるとは言えない。「考える力」で守ろうとした時点で負けている",
            lines: [
                { en: "I love the subject and I still think we are lying to eighteen-year-olds.", ja: "その分野は好きだし、それでも十八歳に嘘をついていると思う。", m: ['own-cost'] },
                { en: "We tell them it teaches critical thinking. Fine. So does engineering, and it pays rent.", ja: "考える力がつくと教える。結構だ。工学でもつくし、あっちは家賃が払える。", m: ['concede-pivot', 'compare'] },
                { en: "The people telling students that money does not matter already have money.", ja: "金は重要じゃないと学生に言っている人たちは、すでに金を持っている。", m: ['who-pays'] },
                { en: "A degree costs four years and something close to a mortgage. That is not a hobby. That is a bet.", ja: "学位には四年と、住宅ローンに近い額がかかる。趣味じゃない。賭けだ。", m: ['rename', 'picture'] },
                { en: "If we believed it was valuable, we would make it cheap, not expensive and noble.", ja: "本当に価値があると思っているなら、高尚で高価にせず、安くするはずだ。", m: ['feel-vs-fact'] },
                { en: "Study it because you love it. Just do not let anyone sell it to you as a career plan.", ja: "好きだから学ぶのはいい。ただ、それをキャリア設計として売りつけられるな。", m: ['land-short'] },
            ],
        },
        deeper: [
            {
                q: "Should the state pay for a degree that does not raise wages?",
                qJa: "賃金を上げない学位に国が金を出すべきか",
                a: [
                    { en: "If the only thing we fund is what raises wages, we should close the music schools tonight.", ja: "賃金を上げるものだけに金を出すなら、今夜のうちに音楽学校を全部閉めるべきだ。", m: ['compare', 'picture'] },
                    { en: "Nobody wants to live in that country, including the person asking the question.", ja: "その国に住みたい人はいない。この質問をしている人も含めて。", m: ['compare'] },
                    { en: "But I would be honest with the student about the trade. Tell them the number. Let them choose.", ja: "ただ学生には取引を正直に言う。数字を見せて、本人に選ばせる。", m: ['own-cost'] },
                    { en: "The dishonesty is not funding it. The dishonesty is selling it as a safe investment.", ja: "不誠実なのは金を出すことじゃない。安全な投資として売ることだ。", m: ['echo', 'rename'] },
                ],
            },
            {
                q: "Is that not elitist? Poor students cannot afford to take the risk.",
                qJa: "それは特権的では。貧しい学生はその賭けができない",
                a: [
                    { en: "That is exactly my point, and it is why I get angry about it.", ja: "そこがまさに俺の論点で、だから腹が立つ。", m: ['concede-pivot', 'own-cost'] },
                    { en: "The rich student who studies literature has a floor under them. The poor one does not.", ja: "裕福な学生が文学をやるときは下に床がある。貧しい学生にはない。", m: ['compare', 'picture'] },
                    { en: "So the same choice is a hobby for one and a life-changing gamble for the other.", ja: "同じ選択が、片方には趣味で、もう片方には人生を賭けた博打になる。", m: ['echo', 'rename'] },
                    { en: "Make it cheap and the argument disappears. Keep it expensive and it is a class filter wearing a gown.", ja: "安くすれば議論は消える。高いままなら、それは学位を着た階級フィルターだ。", m: ['echo', 'rename'] },
                ],
            },
        ],
        joke: {
            en: "Rich families tell their children to follow their passion. Poor families tell them to study accounting. Somehow only one of those gets called practical.",
            ja: "裕福な家は子どもに情熱に従えと言い、貧しい家は会計を学べと言う。なぜか現実的と呼ばれるのは片方だけだ。",
            note: "教育のお題は説教くさくなるので、階層の話に落として笑いに変える。自分の家の話を一言足すと一段強い。",
            m: ['compare', 'rename'],
        },
        cards: [
            "Is a humanities degree still worth studying?",
            "Is university education necessary for success?",
            "Should schools teach practical skills instead of academic subjects?",
            "Should higher education be free for everyone?",
        ],
    },

    // ============================================================
    {
        no: 5, id: 'death', label: '死をどう扱うか', en: 'How We Handle Death',
        field: 'life',
        owns: '死刑・安楽死・司法の誤りなど「国家が人の命に触れる」話すべてを担当',
        sourceDays: [24],
        hook: "So this is about what a state is allowed to do with a life. Okay.",
        hookJa: "国家が人の命に何をしてよいか、という話ですね。",
        universal: "人は制度を選ぶとき、自分がやられる側になる可能性を数に入れない。制度はいつも「他人に使うもの」として想像される。",
        universalEn: "We design these rules imagining somebody else on the receiving end. Never ourselves.",
        angles: [
            { label: '誤り', en: "Every system makes mistakes. This is the only one you cannot take back.", ja: "どんな制度も間違える。取り返せないのはこれだけだ。" },
            { label: '遺族', en: "Families are told it will bring closure. Ask them twenty years later.", ja: "遺族は区切りがつくと言われる。二十年後に聞いてみるといい。" },
            { label: '金', en: "It is not even cheaper. The appeals cost more than the prison.", ja: "しかも安くない。上訴のほうが刑務所より高くつく。" },
            { label: '本音', en: "We do not keep it because it works. We keep it because dropping it feels like losing.", ja: "効くから残しているのではない。やめるのが負けに感じるから残している。" },
        ],
        origin: {
            day: 24, essay: "Yes. The death penalty should be banned.",
            stance: "Yes, ban it, on three grounds",
            stanceJa: "廃止すべき。理由は三つ",
            lines: [
                { en: "It should go, and I have three reasons that do not need me to be soft on crime.", ja: "廃止すべきだ。犯罪に甘い側に立たなくても言える理由が三つある。", m: ['reframe'] },
                { en: "One, innocent people get convicted. That is not a theory. It has happened and been proved.", ja: "一つ、無実の人が有罪になる。理論じゃない。実際に起きて、証明されている。", m: ['tried'] },
                { en: "Two, it does not deter. Countries that dropped it did not see murder rise. The evidence is in.", ja: "二つ、抑止しない。廃止した国で殺人は増えなかった。証拠は出ている。", m: ['tried'] },
                { en: "Three, it costs more than life imprisonment, because of the appeals we rightly insist on.", ja: "三つ、終身刑より高い。当然主張されるべき上訴に金がかかるからだ。", m: ['compare'] },
                { en: "So it kills the wrong people sometimes, does not prevent crime, and is expensive. That is a bad product.", ja: "たまに違う人を殺し、犯罪を防がず、しかも高い。商品として出来が悪い。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, abolish it, and the reason is the mistake, not the morals",
            stanceJa: "廃止すべき。理由は道徳ではなく誤りのほう",
            lines: [
                { en: "I am not going to argue about whether some people deserve it. Some probably do.", ja: "死んで当然の人間がいるかどうかは議論しない。たぶんいる。", m: ['concede-pivot'] },
                { en: "That is not the question. The question is whether we can tell which ones.", ja: "そこは問いじゃない。問いは、どれがそれなのかを見分けられるかだ。", m: ['reframe'] },
                { en: "In America, close to two hundred people on death row turned out to be innocent. Some after twenty years.", ja: "アメリカでは死刑囚のうち二百人近くが無実だった。二十年経ってから判明した人もいる。", m: ['one-number', 'tried'] },
                { en: "Twenty years. Which means the system was completely certain, in writing, for twenty years.", ja: "二十年だ。つまり制度は二十年間、書面で、完全に確信していた。", m: ['echo', 'picture'] },
                { en: "Every other law comes with a way to say sorry. This one does not.", ja: "他の法律には全部、あとで謝る手段が付いている。これにだけ付いていない。", m: ['undo'] },
                { en: "Lock them up forever. I am fine with forever. Forever you can undo.", ja: "一生閉じ込めればいい。一生でいい。一生なら取り消せる。", m: ['undo', 'land-short'] },
            ],
        },
        no: {
            stance: "No, keep it, but only if you accept what you are buying",
            stanceJa: "残すべき。ただし何を買っているのか認めたうえで",
            lines: [
                { en: "Here is the honest version of my side. I am not claiming it stops crime. It does not.", ja: "自分の側の正直な形はこうだ。犯罪を止めるとは主張しない。止めない。", m: ['own-cost'] },
                { en: "The countries that dropped it did not see murder go up. So that argument is dead. Fine.", ja: "廃止した国で殺人は増えなかった。だからその論拠は死んでいる。それでいい。", m: ['tried', 'concede-pivot'] },
                { en: "What I am saying is that some acts break the deal, and a society is allowed to say so out loud.", ja: "俺が言っているのは、社会の取り決めを壊す行為があって、社会はそれを声に出して言っていい、ということだ。", m: ['rename'] },
                { en: "Japan keeps it and about eight people in ten support it. That is not eight in ten monsters.", ja: "日本は残していて、支持は八割くらい。八割が怪物なわけじゃない。", m: ['one-number'] },
                { en: "But then say it honestly. Say it is about what we will not tolerate. Do not dress it up as safety.", ja: "ただ正直に言え。これは「何を許さないか」の話だと言え。安全の話にすり替えるな。", m: ['rename', 'echo'] },
                { en: "And if you cannot accept killing one innocent person for that, you belong on the other side. That is a real cost.", ja: "そのために無実の一人を殺すのが受け入れられないなら、反対側に立つべきだ。それは本物の代償だから。", m: ['own-cost'] },
            ],
        },
        deeper: [
            {
                q: "What about the victim's family? Do they not deserve something?",
                qJa: "被害者遺族はどうか。何も与えられなくていいのか",
                a: [
                    { en: "They deserve a great deal, and almost none of it is an execution.", ja: "多くを与えられるべきだ。そしてそのほとんどは処刑じゃない。", m: ['concede-pivot', 'own-cost'] },
                    { en: "They deserve the trial to be fast, the information to be honest, and money so they do not lose the house too.", ja: "裁判が速いこと、情報が誠実であること、家まで失わないための金。それを与えるべきだ。", m: ['picture'] },
                    { en: "We give them a date twenty years away instead, and we call that respect.", ja: "実際に渡しているのは二十年先の日付で、それを敬意と呼んでいる。", m: ['rename', 'picture'] },
                    { en: "Ask the families afterwards. A lot of them say the day came and nothing arrived.", ja: "あとで遺族に聞けばいい。その日が来て、何も来なかったと言う人が多い。", m: ['tried', 'picture'] },
                ],
            },
            {
                q: "Some crimes are so cruel that nothing else fits.",
                qJa: "他に釣り合うものがないほど残虐な犯罪もある",
                a: [
                    { en: "I feel that too. I would feel it more if it were my family, and I am not going to pretend otherwise.", ja: "その感覚は分かる。自分の家族なら余計にそうなる。そこを取り繕う気はない。", m: ['own-cost', 'my-story'] },
                    { en: "But that is exactly why we do not let the family decide. We built courts so that feeling is not the judge.", ja: "だからこそ遺族に決めさせない。感情を裁判官にしないために裁判所を作った。", m: ['concede-pivot', 'feel-vs-fact'] },
                    { en: "And notice the argument always uses the clearest monster. The rule then gets applied to the unclear case.", ja: "それに、この議論は必ず一番分かりやすい怪物を使う。そのあと規則は曖昧な事例に使われる。", m: ['switch'] },
                    { en: "The system does not get to be certain only on the days it feels certain.", ja: "制度は、確信できた日にだけ確信していい、というわけにはいかない。", m: ['feel-vs-fact', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "It is the only policy where we accept a wrong answer rate and then refuse to publish the marking scheme.",
            ja: "誤答率を受け入れたうえで採点基準の公開を拒む。そんな政策はこれだけだ。",
            note: "重いお題なので笑わせにいかない。刃だけの一行にしてある。生命倫理・戦争・貧困で笑いを取りにいかない判断そのものが評価される。",
            m: ['rename', 'picture'],
        },
        cards: [
            "Should the death penalty be abolished?",
            "Should the state have the power to take a life?",
            "Is the justice system fair to everyone?",
            "Should euthanasia be legalized?",
        ],
    },

    // ============================================================
    {
        no: 6, id: 'what-you-can-say', label: '何を言っていいか', en: 'What You Are Allowed To Say',
        field: 'power',
        owns: '言論の自由・検閲・SNS規制など「何を言ってよくて、誰が線を引くか」の話すべてを担当',
        sourceDays: [23],
        hook: "So the question is where speech stops being speech. Right.",
        hookJa: "言葉がどこで言葉でなくなるか、という問いですね。",
        universal: "言論の自由を守れと言う人は、たいてい自分の言論を守れと言っている。嫌いな言論を同じだけ守る人は少ない。",
        universalEn: "Everyone defends free speech. Almost nobody defends the speech they hate, and that is the only test that counts.",
        angles: [
            { label: '規模', en: "Shouting in a bar and shouting to two million strangers are not the same act.", ja: "飲み屋で怒鳴るのと、二百万人の他人に怒鳴るのは同じ行為ではない。" },
            { label: '線引き', en: "We already have limits. Nobody thinks fraud is free speech.", ja: "すでに制限はある。詐欺を言論の自由だと思う人はいない。" },
            { label: '所有', en: "The real question is who holds the switch, not whether there is one.", ja: "本当の問いはスイッチがあるかではなく、誰が握るかだ。" },
            { label: '副作用', en: "Rules written for the worst person always end up on the ordinary one.", ja: "最悪の人間のために書いた規則は、必ず普通の人間に使われる。" },
        ],
        origin: {
            day: 23, essay: "Yes. Restrictions on freedom of speech can sometimes be justified.",
            stance: "Yes, limits can be justified, in narrow cases",
            stanceJa: "制限は正当化されうる。ただし狭い範囲で",
            lines: [
                { en: "Some limits are justified, and I would keep the list short.", ja: "正当化される制限はある。リストは短く保ちたい。", m: ['reframe'] },
                { en: "Speech that is really a threat is not speech. It is the first half of an act.", ja: "実質的な脅迫は言論じゃない。行為の前半だ。", m: ['rename'] },
                { en: "Lies that get people killed are the same. A false medicine claim is not an opinion.", ja: "人が死ぬ嘘も同じだ。薬についての虚偽表示は意見じゃない。", m: ['rename'] },
                { en: "And where speech targets a group so that they cannot use public life, it has taken freedom, not used it.", ja: "ある集団が公共の場に出られなくなるような言論は、自由を使ったのではなく奪っている。", m: ['rename', 'echo'] },
                { en: "Outside those, leave it alone. A short list you enforce beats a long list you argue about.", ja: "それ以外は放っておく。短いリストを執行するほうが、長いリストで揉めるよりいい。", m: ['compare', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, limits are fine, and we already have them",
            stanceJa: "制限は正当化される。というか、すでにしている",
            lines: [
                { en: "People talk like it is free speech or censorship. We passed that exit a long time ago.", ja: "言論の自由か検閲かのように語られる。その出口はとっくに通り過ぎている。", m: ['reframe', 'picture'] },
                { en: "You cannot lie on a medicine label. You cannot threaten someone. Nobody calls that censorship.", ja: "薬のラベルに嘘は書けない。人を脅すこともできない。それを検閲と呼ぶ人はいない。", m: ['tried', 'echo'] },
                { en: "So the argument is not whether there is a line. The line exists. We are haggling about where.", ja: "だから議論は線があるかどうかじゃない。線はある。どこに引くかで値切っているだけだ。", m: ['reframe'] },
                { en: "And scale changed the question. One angry man in a bar reaches nine people.", ja: "そして規模が問いを変えた。飲み屋の怒れる男は九人に届く。", m: ['scale', 'picture'] },
                { en: "The same man online reaches two million before lunch, and the platform gets paid for it.", ja: "同じ男がネットでは昼前に二百万人に届く。しかもプラットフォームはそれで金をもらう。", m: ['scale', 'one-number'] },
                { en: "That is not speech anymore. That is broadcasting, and we have always regulated broadcasting.", ja: "それはもう言論じゃない。放送だ。放送はずっと規制されてきた。", m: ['rename'] },
            ],
        },
        no: {
            stance: "No, because you never get to pick who holds the switch",
            stanceJa: "制限すべきでない。スイッチを誰が握るかは自分で選べないから",
            lines: [
                { en: "I agree the harm is real. I just do not trust the fix.", ja: "害が本物なのは同意する。ただ、その直し方を信用していない。", m: ['concede-pivot'] },
                { en: "Every one of these rules is written with the worst person in the country in mind.", ja: "この手の規則はどれも、国で一番ひどい人間を想定して書かれる。", m: ['switch'] },
                { en: "Then it gets used on the ambiguous case, by someone we have not met, ten years later.", ja: "そのあと、会ったこともない誰かによって、十年後に、微妙な事例に使われる。", m: ['switch'] },
                { en: "Britain wrote stop-and-search powers for terrorism and used them on photographers and protesters.", ja: "英国はテロ対策として職務質問の権限を作り、写真家と抗議者に使った。", m: ['tried', 'switch'] },
                { en: "The people who wrote it were not lying. They just did not own it forever.", ja: "書いた人たちは嘘をついていない。ただ、永久に自分のものではなかっただけだ。", m: ['switch'] },
                { en: "So ask one thing before you build the switch. What if the other side holds it next?", ja: "だからスイッチを作る前に一つだけ考えろ。次にそれを握るのが向こう側だったら？", m: ['switch', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "So we do nothing while people are abused online?",
                qJa: "ネットで人が攻撃されている間、何もしないのか",
                a: [
                    { en: "No. I want the platform liable, not the sentence illegal. Those are very different tools.", ja: "いや。求めているのは、文を違法にすることじゃなくてプラットフォームに責任を負わせることだ。全然違う道具だ。", m: ['rename', 'own-cost'] },
                    { en: "Right now the company gets paid for the fight and pays nothing for the damage. Fix that and half of it stops.", ja: "今は企業が争いで儲けて、損害には一円も払わない。そこを直せば半分は止まる。", m: ['who-pays'] },
                    { en: "Threats and harassment are already crimes. We just do not staff the police to handle them.", ja: "脅迫も嫌がらせもすでに犯罪だ。ただ警察がそれを扱う人員を持っていない。", m: ['tried'] },
                    { en: "So my answer is enforce what exists before inventing a new power nobody can take back.", ja: "だから答えは、取り消せない新しい権限を発明する前に、今あるものを執行しろ、だ。", m: ['undo', 'land-short'] },
                ],
            },
            {
                q: "Does the government not have a duty to protect people from lies?",
                qJa: "政府には人を嘘から守る義務があるのでは",
                a: [
                    { en: "Some lies really do get people hurt, and I will give you that one for free. But the state's first duty is not to lie itself, and that one is still outstanding in most countries.", ja: "本当に人を傷つける嘘はある。そこはただで認める。ただ国家の第一の義務は自分が嘘をつかないことで、それが大半の国でまだ果たされていない。", m: ['own-cost', 'reframe'] },
                    { en: "The trouble is that a lot of true things looked like lies for about a decade before they did not.", ja: "厄介なのは、本当のことの多くが十年ほど嘘に見えてから本当になることだ。", m: ['tried'] },
                    { en: "If a ministry had been deciding in nineteen ninety, half of today's medicine would have been banned as nonsense.", ja: "1990年に省庁が判定していたら、今の医学の半分はたわ言として禁止されていた。", m: ['tried', 'picture'] },
                    { en: "Protect people by making the true thing loud, not by making the false thing illegal.", ja: "本当のことを大きくして守れ。嘘を違法にして守るな。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "Everyone is a free speech absolutist right up until somebody says something about their mother.",
            ja: "全員が言論の自由の絶対主義者だ。自分の母親について何か言われるまでは。",
            note: "自分も例外じゃないと先に認める型。言論のお題は説教になりやすいので、これを頭に置くと以降が分析として通る。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Can restrictions on freedom of speech ever be justified?",
            "Should governments regulate social media content?",
            "Should violent or offensive content be restricted?",
            "Is online anonymity worth protecting?",
        ],
    },

    // ============================================================
    {
        no: 7, id: 'being-watched', label: '見られること', en: 'Being Watched',
        field: 'power',
        owns: 'プライバシー・監視・個人データなど「見られること」と、その引き換えの話すべてを担当',
        sourceDays: [14],
        hook: "So this is about privacy, and whether there is any left. Okay.",
        hookJa: "プライバシーの話ですね。まだ残っているのかどうか。",
        universal: "人は隠すことがないと言いながら、全員がドアを閉める。恥ずかしいからではなく、見られていない時間がないと人は普通に振る舞えないから。",
        universalEn: "Everyone says they have nothing to hide, and everyone still shuts the door. Not out of shame. People just cannot behave normally while they are being watched.",
        angles: [
            { label: '交換', en: "We did not lose privacy. We sold it, and the price was convenience.", ja: "プライバシーは奪われたんじゃない。売った。値段は便利さだった。" },
            { label: '積み上げ', en: "One camera is nothing. Ten years of one camera is a biography.", ja: "カメラ一台は何でもない。カメラ一台の十年分は伝記だ。" },
            { label: '非対称', en: "They know your address. You do not know their name.", ja: "向こうはこっちの住所を知っている。こっちは向こうの名前を知らない。" },
            { label: '行動', en: "Watched people behave. That is the point, and that is also the problem.", ja: "見られている人は行儀よくなる。それが狙いで、それが問題でもある。" },
        ],
        origin: {
            day: 14, essay: "No. Individual privacy can no longer be fully protected in the modern world.",
            stance: "It is already gone, and pretending otherwise is the danger",
            stanceJa: "もう守れない。守れているふりのほうが危険",
            lines: [
                { en: "Honestly, full privacy is finished, and I would rather say that than sell people comfort.", ja: "正直に言うと、完全なプライバシーは終わっている。安心を売るよりそう言いたい。", m: ['own-cost'] },
                { en: "Your phone reports where you are all day, and you agreed to it to get a map.", ja: "端末は一日中こっちの居場所を報告している。地図が欲しくて自分で同意した。", m: ['picture', 'self-joke'] },
                { en: "Cameras cover the streets, and the footage is kept far longer than anyone tells you.", ja: "街はカメラで覆われていて、映像は誰も教えてくれないほど長く保管される。", m: ['picture'] },
                { en: "Even if you opt out of everything, the people around you did not, and you are in their photos.", ja: "全部を拒否しても、周りの人は拒否していない。こっちはその人たちの写真に写っている。", m: ['picture'] },
                { en: "So the honest goal is not privacy anymore. It is limits on what can be done with what they already have.", ja: "だから正直な目標はもうプライバシーじゃない。すでに持たれているもので何をしてよいかの制限だ。", m: ['rename', 'reframe'] },
            ],
        },
        yes: {
            stance: "Yes, it can still be protected, and the fight is worth having",
            stanceJa: "まだ守れる。しかも戦う価値がある",
            lines: [
                { en: "People say it is over. It is not over. It is just expensive, and we gave up cheaply.", ja: "もう終わりだと言われる。終わっていない。高くつくだけで、こっちが安く諦めた。", m: ['concede-pivot'] },
                { en: "Europe passed one law and suddenly every website in the world had to ask permission. One law.", ja: "欧州が法律を一本通したら、世界中のサイトが突然許可を求め始めた。一本だ。", m: ['tried', 'echo'] },
                { en: "So it was never technically impossible. It was politically ignored.", ja: "つまり技術的に不可能だったことは一度もない。政治的に無視されていただけだ。", m: ['rename', 'echo'] },
                { en: "And look at what the surrender costs. Insurance from your steps. Prices set from your address.", ja: "降伏の代償も見てほしい。歩数から決まる保険。住所から決まる値段。", m: ['picture'] },
                { en: "Once a thing is recorded, somebody will eventually use it in a way nobody signed up for.", ja: "いったん記録されたものは、いずれ誰も同意していない使われ方をする。", m: ['switch'] },
                { en: "I do not want the whole tap turned off. I want to know who is drinking.", ja: "蛇口を全部閉めたいんじゃない。誰が飲んでいるのかを知りたい。", m: ['picture', 'land-short'] },
            ],
        },
        no: {
            stance: "No, it is gone, and chasing it wastes the effort we need elsewhere",
            stanceJa: "もう無い。追いかけるほど、本当に必要な戦いから力が抜ける",
            lines: [
                { en: "Here is what gets me. We keep fighting for privacy and we already lost it in about two thousand and eight.", ja: "引っかかるのはここだ。プライバシーのために戦い続けているが、2008年あたりでもう負けている。", m: ['reframe'] },
                { en: "You carry a tracker every day. You bought it. You queued for it.", ja: "毎日、発信機を持ち歩いている。自分で買った。列に並んで買った。", m: ['picture', 'self-joke'] },
                { en: "London built a camera network to charge drivers, and within a few years the police had all of it.", ja: "ロンドンは課金のためにカメラ網を作り、数年で警察がその全部を手にした。", m: ['tried', 'switch'] },
                { en: "Nobody voted for that. We voted for one camera, in one car park.", ja: "誰もそれに投票していない。駐車場のカメラ一台に投票しただけだ。", m: ['echo', 'picture'] },
                { en: "So I would stop guarding the door and start watching what they do with what is already inside.", ja: "だから玄関を守るのはやめて、すでに中にあるもので何をされるかを見張る。", m: ['picture', 'reframe'] },
                { en: "Fight about use, not about collection. Collection is over.", ja: "収集ではなく用途で戦う。収集はもう終わっている。", m: ['land-short', 'echo'] },
            ],
        },
        deeper: [
            {
                q: "If you have nothing to hide, why does it matter?",
                qJa: "やましいことがないなら、なぜ問題なのか",
                a: [
                    { en: "Privacy has a price, and I will say it out loud. It makes police work slower. But then hand me your phone for the evening. Nobody ever does.", ja: "プライバシーには値段がある。声に出して言う。警察の仕事は遅くなる。ただ、それなら今晩、端末を貸してくれ。誰も貸さない。", m: ['own-cost', 'picture'] },
                    { en: "It is not about hiding. It is that behaviour changes when it is recorded, even good behaviour.", ja: "隠す話じゃない。記録されると振る舞いが変わる。まっとうな振る舞いでも変わる。", m: ['rename', 'counted'] },
                    { en: "And you do not get to decide what is embarrassing in twenty years. Somebody else will.", ja: "それに、二十年後に何が恥になるかを自分で決められない。決めるのは別の誰かだ。", m: ['switch', 'future-bill'] },
                    { en: "Half the things people were arrested for a century ago are normal now, and the reverse is also true.", ja: "百年前に逮捕された理由の半分は今では普通で、逆もまた同じだ。", m: ['tried'] },
                ],
            },
            {
                q: "Does surveillance not make cities safer?",
                qJa: "監視は街を安全にするのでは",
                a: [
                    { en: "A bit, and less than the budget suggests. Cameras move crime more than they stop it.", ja: "少しはなる。予算が示唆するほどではない。カメラは犯罪を止めるより移動させる。", m: ['concede-pivot', 'feel-vs-fact', 'own-cost'] },
                    { en: "What they are genuinely good at is afterwards. Solving, not preventing. That is worth something.", ja: "本当に得意なのは事後だ。防止ではなく解決。それには価値がある。", m: ['rename'] },
                    { en: "But then buy it honestly. Say we are buying evidence, not safety.", ja: "ただ、それなら正直に買え。買っているのは安全ではなく証拠だと言え。", m: ['rename'] },
                    { en: "Lighting a street works better than watching it, and nobody has ever been oppressed by a lamp.", ja: "通りは見張るより照らすほうが効く。街灯に抑圧された人はいない。", m: ['compare', 'picture'] },
                ],
            },
        ],
        joke: {
            en: "I have nothing to hide, and I would still rather you did not read my search history from last Tuesday.",
            ja: "やましいことは何もない。それでも先週火曜の検索履歴だけは読まないでほしい。",
            note: "自分を落として笑わせる型。「隠すことがない論」を、反論せずに一行で無効化できる。",
            m: ['self-joke'],
        },
        cards: [
            "Can individual privacy still be protected today?",
            "Should facial recognition be used in public spaces?",
            "Should companies be required to disclose how they use data?",
            "Has technology made society less free?",
        ],
    },

    // ============================================================
    {
        no: 8, id: 'how-many', label: '人が多すぎるか', en: 'How Many Of Us There Should Be',
        field: 'people',
        owns: '人口増減・出生率・過密と過疎など「人間の数そのもの」の話すべてを担当',
        sourceDays: [16],
        hook: "So we are asking whether there are too many people. Okay, that one has changed a lot.",
        hookJa: "人間が多すぎるのか、という問いですね。これはかなり変わった論点だ。",
        universal: "人は世界に人が多すぎると言いながら、自分の町には人が足りないと言う。多すぎるのはいつも他所の人だ。",
        universalEn: "Everyone thinks the world has too many people and their own town has too few. The excess is always somewhere else.",
        angles: [
            { label: '数', en: "The scary graph stopped being scary. The curve bent about thirty years ago.", ja: "怖いグラフは怖くなくなった。曲線は三十年ほど前に折れている。" },
            { label: '消費', en: "One person in a rich country uses what thirty use somewhere else.", ja: "豊かな国の一人は、他所の三十人分を使う。" },
            { label: '逆側', en: "Half the world is now worried about the opposite. Empty schools, not full ones.", ja: "世界の半分は今や逆を心配している。満員の学校ではなく空の学校を。" },
            { label: '誰が言うか', en: "It is always the countries that finished growing that tell others to stop.", ja: "止まれと言うのは、いつも成長を終えた国だ。" },
        ],
        origin: {
            day: 16, essay: "Agree. Global overpopulation poses a serious threat.",
            stance: "Yes, the numbers are a real pressure",
            stanceJa: "人口は本物の圧力になる",
            lines: [
                { en: "More people means more demand for the things that were already tight.", ja: "人が増えれば、もともと逼迫していたものへの需要が増える。", m: ['scale'] },
                { en: "Water first. A lot of regions are already taking out more than the rain puts back.", ja: "まず水だ。多くの地域はすでに雨が戻す量より多く汲み上げている。", m: ['picture'] },
                { en: "Then food and land, and every extra hectare of farm comes out of a forest.", ja: "次に食料と土地。農地が一ヘクタール増えるたび、森が一ヘクタール減る。", m: ['picture'] },
                { en: "And cities grow faster than the pipes and the trains, so people arrive into slums, not into jobs.", ja: "都市は配管や鉄道より速く育つので、人はスラムに到着する。仕事にではなく。", m: ['speed', 'picture'] },
                { en: "So it is not that people are bad. It is that the arrival rate beats the building rate.", ja: "だから人間が悪いんじゃない。到着の速度が建設の速度に勝っている。", m: ['rename', 'speed'] },
            ],
        },
        yes: {
            stance: "Yes, but the pressure is consumption, not headcount",
            stanceJa: "圧力は本物。ただし人数ではなく消費のほう",
            lines: [
                { en: "I agree there is pressure. I just think we are counting the wrong thing.", ja: "圧力があるのは同意する。ただ、数えている対象が違うと思う。", m: ['concede-pivot', 'counted'] },
                { en: "One person in a rich country uses what a lot of people use somewhere else. Twenty, thirty times.", ja: "豊かな国の一人は、他所の何人分も使う。二十人分、三十人分だ。", m: ['one-number', 'compare'] },
                { en: "So a family of five over there is lighter on the planet than one of us with a car and a spare room.", ja: "だから向こうの五人家族は、車と空き部屋を持つこっちの一人より地球には軽い。", m: ['picture', 'compare'] },
                { en: "Which means the population problem is really a lifestyle problem wearing a costume.", ja: "つまり人口問題は、衣装を着た生活水準の問題だ。", m: ['rename'] },
                { en: "And notice who gets told to have fewer children. Never us. Always them.", ja: "それに、子どもを減らせと言われるのが誰かを見てほしい。こっちには言われない。いつも向こうだ。", m: ['who-pays', 'echo'] },
                { en: "Fix consumption and the headcount stops mattering. Fix the headcount and we still burn the same amount.", ja: "消費を直せば人数は問題でなくなる。人数を直しても、燃やす量は変わらない。", m: ['echo', 'land-short'] },
            ],
        },
        no: {
            stance: "No, and the graph everyone is scared of already bent",
            stanceJa: "脅威ではない。みんなが怖がっているグラフはもう折れている",
            lines: [
                { en: "This one is out of date, and I say that as someone who believed it for years.", ja: "この論点は古い。何年も信じていた側として言う。", m: ['self-joke', 'own-cost'] },
                { en: "The birth rate has been falling almost everywhere, including places we were told would never stop.", ja: "出生率はほぼどこでも下がっている。絶対に止まらないと言われた地域も含めて。", m: ['tried'] },
                { en: "Most projections now have the world peaking this century and then coming down.", ja: "今の予測の大半は、世界人口が今世紀中に頂点を打って減り始めるとしている。", m: ['feel-vs-fact'] },
                { en: "Meanwhile Japan is losing half a million people a year and Korea is worse.", ja: "その間に日本は年に五十万人減り、韓国はもっとひどい。", m: ['one-number'] },
                { en: "The panic moved. It used to be too many. In half the world it is now too few.", ja: "パニックは移動した。かつては多すぎるだった。世界の半分では今、少なすぎるだ。", m: ['echo', 'feel-vs-fact'] },
                { en: "We are still arguing about a bus that left, and the next bus has the opposite problem.", ja: "行ってしまったバスの話をまだしている。次のバスは逆の問題を積んでいる。", m: ['picture', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Africa's population is still growing fast, though.",
                qJa: "それでもアフリカの人口はまだ急増している",
                a: [
                    { en: "It is, and it will keep growing for a while. That part is true.", ja: "増えている。しばらく増え続ける。そこは本当だ。", m: ['concede-pivot', 'own-cost'] },
                    { en: "But the rate is already falling there too, and it falls fastest where girls stay in school.", ja: "ただ、そこでも伸び率はすでに下がっていて、女子が学校に残る地域で一番速く下がる。", m: ['tried'] },
                    { en: "That is the whole lever. Not lectures, not targets. School and a clinic.", ja: "レバーはそれだけだ。説教でも目標値でもない。学校と診療所。", m: ['picture', 'land-short'] },
                    { en: "Every country that did those two things saw the birth rate come down without anyone being forced.", ja: "その二つをやった国はどこでも、誰も強制されずに出生率が下がった。", m: ['tried'] },
                ],
            },
            {
                q: "Should governments encourage people to have more children?",
                qJa: "政府は出産を奨励すべきか",
                a: [
                    { en: "They keep trying, and it keeps not working. Cash bonuses move the timing, not the total.", ja: "各国がやり続けて、効かないままだ。現金給付はタイミングを動かすが総数は動かさない。", m: ['tried', 'own-cost'] },
                    { en: "People do not have fewer children because nobody asked them nicely.", ja: "誰も丁寧に頼まなかったから子どもが減っているわけじゃない。", m: ['echo'] },
                    { en: "They have fewer because housing is expensive and the second income cannot stop.", ja: "減っているのは、住居が高くて、二人目の収入を止められないからだ。", m: ['echo', 'who-pays'] },
                    { en: "Fix rent and childcare and you get a birth rate. Print a poster and you get a poster.", ja: "家賃と保育を直せば出生率が出る。ポスターを刷ればポスターが出る。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "Every generation is convinced the world is too full, and every one of them still wanted their own kids to have a seat.",
            ja: "どの世代も世界は満員だと確信していて、そのどの世代も自分の子どもの席だけは欲しがった。",
            note: "自分も同じ矛盾の中にいると先に認める型。人口のお題は説教か冷酷かに振れやすいので、ここで一度笑わせると中間に立てる。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Is overpopulation a serious threat to humankind?",
            "Should governments encourage people to have more children?",
            "Can the planet support its growing population?",
            "Is an aging society a crisis or an adjustment?",
        ],
    },

    // ============================================================
    {
        no: 9, id: 'illness', label: '病と体', en: 'Illness And The Body',
        field: 'life',
        owns: '感染症・ワクチン・医療費など「病気と、それを支える金と信頼」の話すべてを担当',
        sourceDays: [18],
        hook: "So this is about disease, and whether we are ready for the next one.",
        hookJa: "病気の話、そして次の一発に備えられているかという話ですね。",
        universal: "人は健康なときは医療を金の話として語り、病気になった瞬間にそれをやめる。立場が変われば同じ人が反対のことを言う。",
        universalEn: "Healthy people talk about medicine as a budget. Sick people stop doing that immediately. Same person, different week.",
        angles: [
            { label: '速度', en: "A virus moves at the speed of a plane. A health ministry moves at the speed of a meeting.", ja: "ウイルスは飛行機の速さで動く。厚生省は会議の速さで動く。" },
            { label: '信頼', en: "The science is usually ready before the public is willing to believe it.", ja: "科学はたいてい、世間が信じる気になる前に準備できている。" },
            { label: '金', en: "Prevention has no photograph. That is why it never gets funded.", ja: "予防には写真が撮れない。だから予算がつかない。" },
            { label: '不平等', en: "The same illness is an inconvenience in one postcode and a funeral in another.", ja: "同じ病気が、ある郵便番号では不便で、別の郵便番号では葬式になる。" },
        ],
        origin: {
            day: 18, essay: "Agree. Infectious diseases will become a bigger problem.",
            stance: "Yes, it gets worse, and we know why",
            stanceJa: "悪化する。理由も分かっている",
            lines: [
                { en: "Infectious disease is going to get harder, and none of the reasons are mysterious.", ja: "感染症は今後もっと厄介になる。理由はどれも謎めいていない。", m: ['reframe'] },
                { en: "People move more. A local outbreak is a global one inside a day now.", ja: "人がよく動く。局所的な流行が一日で世界規模になる。", m: ['speed', 'scale'] },
                { en: "Antibiotics are wearing out, because we used them on livestock like they were free.", ja: "抗生物質は効かなくなってきている。無料みたいに家畜に使ったからだ。", m: ['future-bill', 'picture'] },
                { en: "Warmer weather moves mosquitoes into places that never had to think about them.", ja: "気温が上がって、蚊が考えたこともなかった土地に入ってくる。", m: ['picture'] },
                { en: "So the trend is bad, and it is bad for reasons we chose.", ja: "だから趨勢は悪い。しかも悪い理由はこちらが選んだものだ。", m: ['own-cost', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, and the thing that will fail is not the science",
            stanceJa: "悪化する。そして失敗するのは科学ではない",
            lines: [
                { en: "The next one is coming, and I am not worried about the laboratory.", ja: "次のは来る。ただ研究室の心配はしていない。", m: ['reframe'] },
                { en: "We built a working vaccine in under a year. That was the fastest thing humans have ever done in medicine.", ja: "一年かからずに機能するワクチンを作った。医学で人類がやった中で一番速い仕事だった。", m: ['tried', 'speed'] },
                { en: "What failed was everything after the vial. Delivery. Explaining. Getting people to believe it.", ja: "失敗したのは瓶から先の全部だ。配送、説明、信じてもらうこと。", m: ['trust-infra', 'picture'] },
                { en: "One retracted paper in nineteen ninety-eight pushed British measles rates down for a decade.", ja: "1998年の撤回された論文一本で、英国の麻疹接種率は十年下がった。", m: ['tried', 'one-number'] },
                { en: "Not one line of the science had changed. The trust had.", ja: "科学のほうは一行も変わっていない。変わったのは信頼だ。", m: ['trust-infra', 'echo'] },
                { en: "So we are not short of scientists. We are short of people the public will listen to.", ja: "だから足りないのは科学者じゃない。世間が耳を貸す人間だ。", m: ['echo', 'trust-infra'] },
            ],
        },
        no: {
            stance: "No, the trend is actually the other way, and the panic hides that",
            stanceJa: "むしろ趨勢は逆。パニックがそれを隠している",
            lines: [
                { en: "I would push back on this one, because the long trend is genuinely good.", ja: "ここは押し返したい。長期の趨勢は本当に良いからだ。", m: ['concede-pivot'] },
                { en: "Smallpox is gone. Polio is nearly gone. Measles deaths fell by most of their number in twenty years.", ja: "天然痘は消えた。ポリオもほぼ消えた。麻疹の死者は二十年で大半が減った。", m: ['tried', 'echo'] },
                { en: "A child born today is far less likely to die of an infection than a child born when my parents were born.", ja: "今日生まれる子どもが感染症で死ぬ確率は、親の世代よりはるかに低い。", m: ['compare'] },
                { en: "What changed is that we now see every outbreak, everywhere, on a phone, within an hour.", ja: "変わったのは、どこの流行でも一時間以内に端末で見えるようになったことだ。", m: ['feel-vs-fact', 'scale'] },
                { en: "So the feeling went up while the numbers went down. Both are real, but only one is the world.", ja: "だから体感は上がり、数字は下がった。どちらも本物だが、世界のほうは片方だけだ。", m: ['feel-vs-fact'] },
                { en: "I would rather spend the fear on the slow killers. Heart disease has no news cycle and takes far more people.", ja: "その恐怖は遅い殺し屋に使いたい。心臓病はニュースにならないが、はるかに多く連れて行く。", m: ['compare', 'picture'] },
            ],
        },
        deeper: [
            {
                q: "Should vaccination be compulsory, then?",
                qJa: "ではワクチン接種を義務化すべきか",
                a: [
                    { en: "I would go a long way before I got to compulsory, because force spends trust you cannot rebuy.", ja: "義務化にたどり着く前にやることが山ほどある。強制は買い戻せない信頼を使うからだ。", m: ['trust-infra', 'undo', 'own-cost'] },
                    { en: "Make it free, make it near, make it take five minutes. Most refusal is friction, not belief.", ja: "無料にして、近くにして、五分で済むようにする。拒否の大半は信念じゃなくて手間だ。", m: ['echo', 'rename'] },
                    { en: "The countries with the highest uptake mostly did that, not the mandate.", ja: "接種率が一番高い国の多くは、義務ではなくそれをやった。", m: ['tried'] },
                    { en: "Keep the mandate for the narrow case. Nurses in a cancer ward, yes. Everyone, no.", ja: "義務は狭い範囲に取っておく。がん病棟の看護師なら是。全員なら否。", m: ['picture', 'land-short'] },
                ],
            },
            {
                q: "Who should pay when someone's own habits made them ill?",
                qJa: "自分の生活習慣で病気になった人の費用は誰が払うのか",
                a: [
                    { en: "Careful. That sounds fair and it collapses about two questions in.", ja: "気をつけたほうがいい。公平に聞こえるが、二問で崩れる。", m: ['concede-pivot', 'own-cost'] },
                    { en: "Do we charge the skier? The motorcyclist? The person who worked nights for thirty years?", ja: "スキーヤーには請求するのか。バイク乗りは。三十年夜勤をした人は。", m: ['echo', 'picture'] },
                    { en: "Almost every illness has some choice in it and almost none of it is only choice.", ja: "ほぼ全ての病気には選択が含まれていて、ほぼ全ての病気は選択だけではない。", m: ['both-true'] },
                    { en: "A system that starts sorting the deserving sick from the rest stops being a health system.", ja: "助けるに値する病人とそれ以外を仕分け始めた制度は、医療制度でなくなる。", m: ['rename', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "We spent two years learning to wash our hands and then went straight back to touching every pole on the train.",
            ja: "二年かけて手の洗い方を習って、そのあと電車のポールを全部触る生活に戻った。",
            note: "全員が自分のこととして笑える型。医療のお題は重くなりやすいので、ここで一度緩めると次の主張が入りやすい。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Will infectious diseases become a bigger problem?",
            "Should vaccination be made compulsory?",
            "Should healthcare be free at the point of use?",
            "Is mental health taken seriously enough?",
        ],
    },

    // ============================================================
    {
        no: 10, id: 'spectacle', label: '祭りに金を使う', en: 'Spending Money On The Spectacle',
        field: 'money',
        owns: '五輪・万博・箱物事業など「国の見栄に公金を注ぐ」話すべてを担当',
        sourceDays: [21],
        hook: "So we are asking whether the big event is worth what it costs. Right.",
        hookJa: "大きな催しが費用に見合うのか、という話ですね。",
        universal: "人は必要なものより、誇れるものに金を出す。予算は理屈で決まらず、どう見られたいかで決まる。",
        universalEn: "People fund the thing they can be proud of long before the thing they need. Budgets follow pride, not arithmetic.",
        angles: [
            { label: '時間差', en: "The party lasts three weeks. The maintenance lasts forty years.", ja: "祭りは三週間。維持費は四十年。" },
            { label: '署名者', en: "The people who sign the bid are never the people who get the bill.", ja: "入札に署名する人は、請求書を受け取る人ではない。" },
            { label: '目に見えないもの', en: "A stadium gets a ribbon. A sewer upgrade gets nothing.", ja: "競技場にはテープが張られる。下水の更新には何もない。" },
            { label: '本当の効果', en: "It does move something. It just moves pride, and pride is hard to put in a budget.", ja: "動くものはある。動くのは誇りで、誇りは予算表に書きにくい。" },
        ],
        origin: {
            day: 21, essay: "Agree. Japan will benefit overall from hosting the Games.",
            stance: "Yes, hosting pays, if you count what it forces you to finish",
            stanceJa: "開催は割に合う。強制的に完成させるものを数えるなら",
            lines: [
                { en: "Hosting is worth it, and the reason is the deadline.", ja: "開催は価値がある。理由は締切だ。", m: ['reframe'] },
                { en: "Cities have plans that sit in a drawer for thirty years. A fixed date takes them out of the drawer.", ja: "都市には三十年引き出しに入ったままの計画がある。日付が決まると引き出しから出る。", m: ['picture'] },
                { en: "Barcelona is the standard example. They used the Games to finish a waterfront they already wanted.", ja: "定番の例はバルセロナだ。もともとやりたかった湾岸整備を五輪で仕上げた。", m: ['tried'] },
                { en: "You also get trained staff, upgraded transport and a decade of people knowing your name.", ja: "訓練された人員、更新された交通、そして十年分の知名度も付いてくる。", m: ['picture'] },
                { en: "So the event is not the product. The forced completion is the product.", ja: "だから商品は催しじゃない。強制的に完成することが商品だ。", m: ['rename', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, but only for the city that already had the plan",
            stanceJa: "割に合う。ただし先に計画を持っていた都市だけ",
            lines: [
                { en: "I will defend it, but with one condition, and the condition does most of the work.", ja: "擁護するが条件が一つある。しかもその条件が仕事のほとんどをする。", m: ['concede-pivot'] },
                { en: "Barcelona won because it used the Games to finish a plan it already had.", ja: "バルセロナが勝ったのは、もともとあった計画を五輪で仕上げたからだ。", m: ['tried'] },
                { en: "The cities that lose are the ones that invent a plan around the Games instead.", ja: "負ける都市は逆に、五輪に合わせて計画を発明する。", m: ['compare'] },
                { en: "So the question is never should we host. It is do we have a drawer worth opening.", ja: "だから問いは「開催すべきか」じゃない。「開ける価値のある引き出しがあるか」だ。", m: ['reframe', 'picture'] },
                { en: "If you have twenty years of unfinished transport, a hard deadline is worth real money.", ja: "二十年分の未完成の交通計画があるなら、堅い締切には実際に金の価値がある。", m: ['echo'] },
                { en: "If you have nothing, you are buying a party and a mortgage.", ja: "何もないなら、買っているのはパーティーと住宅ローンだ。", m: ['echo', 'rename'] },
            ],
        },
        no: {
            stance: "No, and the pattern is consistent enough to predict",
            stanceJa: "割に合わない。しかも型が予測できるほど一貫している",
            lines: [
                { en: "Not the way it works now, no. And you can almost set your watch by it.", ja: "今のやり方ではなし。しかも時計を合わせられるくらい規則的だ。", m: ['tried', 'picture'] },
                { en: "Montreal took about thirty years to pay off one stadium. Thirty.", ja: "モントリオールは競技場ひとつの返済に約三十年かかった。三十年だ。", m: ['one-number', 'tried'] },
                { en: "Athens has venues that were basically abandoned within ten.", ja: "アテネには十年以内に事実上放棄された施設がある。", m: ['tried'] },
                { en: "You get three weeks of tourism and forty years of maintenance.", ja: "手に入るのは三週間の観光と四十年の維持費だ。", m: ['picture', 'compare'] },
                { en: "And the reason it keeps happening is that the people who sign the bid never get the bill.", ja: "繰り返される理由は、入札に署名する人が請求書を受け取らないからだ。", m: ['who-pays'] },
                { en: "Put it in one permanent place and the whole problem goes away. Nobody wants that, which tells you what it was really for.", ja: "恒久開催地にすれば問題は丸ごと消える。誰もそれを望まない。それが本当の目的を教えてくれる。", m: ['compare', 'rename'] },
            ],
        },
        deeper: [
            {
                q: "Does it not bring the country together, though?",
                qJa: "それでも国を一つにするのでは",
                a: [
                    { en: "It does, and I am not going to sneer at that. It is real and I have felt it.", ja: "する。それを鼻で笑う気はない。本物だし、自分も感じたことがある。", m: ['concede-pivot', 'my-story', 'own-cost'] },
                    { en: "The trouble is it is the only benefit that never appears in the accounts, so it absorbs every criticism.", ja: "問題は、それが会計に一度も出てこない唯一の便益だから、あらゆる批判を吸ってしまうことだ。", m: ['counted'] },
                    { en: "Any project can be defended forever if the payoff is a feeling.", ja: "見返りが感情なら、どんな計画も永遠に擁護できる。", m: ['feel-vs-fact'] },
                    { en: "I would just like the feeling to be a bonus on a sound deal, not the whole case for it.", ja: "その感情は、まともな取引に付いてくるおまけであってほしい。取引の根拠そのものではなく。", m: ['rename'] },
                ],
            },
            {
                q: "So should governments fund the arts either?",
                qJa: "では芸術への助成も同じ理屈でやめるのか",
                a: [
                    { en: "No, and I think that is a different case, which is worth saying out loud.", ja: "いや、それは別の話だと思う。そこは声に出して言う価値がある。", m: ['define', 'own-cost'] },
                    { en: "Art is cheap. The entire arts budget of most countries is a rounding error next to one stadium.", ja: "芸術は安い。大半の国の芸術予算全部が、競技場ひとつの端数だ。", m: ['compare', 'one-number'] },
                    { en: "And it does not leave a concrete bowl in a suburb that nobody can heat.", ja: "それに、誰も暖房できないコンクリートの器を郊外に残さない。", m: ['picture'] },
                    { en: "My objection was never to spending on joy. It was to spending on joy that comes with a forty-year debt.", ja: "喜びに金を使うことに反対したことはない。四十年の借金が付いてくる喜びに反対しただけだ。", m: ['echo', 'future-bill'] },
                ],
            },
        ],
        joke: {
            en: "It is the only party where the host is still paying off the furniture when the guests' children are grown up.",
            ja: "招いた客の子どもが成人しても、主催者がまだ家具のローンを払っている。そういう種類のパーティーだ。",
            note: "数字を比喩に変換する型。三十年ローンをパーティーに置き換えれば、統計を忘れても同じ主張が撃てる。数字が飛んだときの保険にもなる。",
            m: ['picture', 'future-bill'],
        },
        cards: [
            "Is hosting the Olympics worth it for a country?",
            "Should governments fund the arts?",
            "Should public money be spent on prestige projects?",
            "Are large international events still worth holding?",
        ],
    },
];
