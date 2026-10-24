import type { DeepDiveSegment } from './podcast-deep-dive-transcript';

/**
 * Podcast Deep Dive #2 -- "The Dangerous Precedent Behind Big Pharma's GLP-1 Patents"
 * The Joe Rogan Experience (JRE Clips 公式短尺 xoJAqKLvbqk, 約15分)
 * ゲスト: Brigham Buhler (Ways2Well 創業者 / 元・製薬営業)
 *
 * 逐語は auto-sub を整形したもの。言い直し・相槌は読みやすさのため軽く整理してあるが、
 * 表現そのものは実際のセリフ。
 */

export const GLP1_TRANSCRIPT: DeepDiveSegment[] = [
    {
        time: "0:00–1:16",
        lines: [
            { en: `The Joe Rogan Experience.`, ja: `『ジョー・ローガン・エクスペリエンス』。` },
            { en: `Okay, so we should also clarify that when we're talking about peptides and peptides being dangerous — GLP-1s are peptides.`, ja: `よし、ここではっきりさせておこう。「ペプチドは危険だ」という話をしているけど、GLP-1もペプチドなんだよね。` },
            { en: `Right.`, ja: `そのとおり。` },
            { en: `And this is a gigantic market right now. I mean, you're seeing all these ladies that look like they're cutting weight to make the UFC flyweight division.`, ja: `しかも今、これは巨大な市場になってる。だって、UFCのフライ級に合わせて減量してるみたいな見た目の女性が、そこら中にいるだろ。` },
            { en: `You're seeing everybody that's on these peptides is losing weight. Like, I don't know if Oprah's on them, but she lost a ton of weight. I know there's a bunch of celebrities that you see that get Ozempic face.`, ja: `このペプチドをやってる人はみんな痩せていってる。オプラが使ってるかは知らないけど、彼女もものすごく痩せた。「オゼンピック顔」になってるセレブも大勢いるよね。` },
            { en: `Yeah. Well, so many influencers, too, on the academia side go online and go, "I would never prescribe peptides because I'm a board-certified clinician, and I only prescribe things that have science and data that back them."`, ja: `ええ。それに、学術側のインフルエンサーもたくさんいて、ネットでこう言うんです。「私は専門医資格を持つ臨床医なので、ペプチドは絶対に処方しません。科学とデータの裏付けがあるものしか処方しないんです」と。` },
            { en: `And a lot of times I'd say, man, you might just be uneducated on this topic and the nuances of this topic.`, ja: `そういうとき、僕はよくこう言いたくなります。「あなたはこのテーマと、その細かい事情について、単に勉強不足なだけかもしれませんよ」と。` },
            { en: `In reality, most clinicians are prescribing drugs off-label, right? So a huge percentage of medical practices use products off-label.`, ja: `実際のところ、ほとんどの臨床医は薬を適応外(オフラベル)で処方しています。医療現場のかなりの割合が、承認された用途の外で薬を使っているんです。` },
            { en: `It's indicated for one thing, or one patient population, or a dosage, or a chronic disease state — but clinicians have the autonomy and the authority to use that drug in a manner that it's not indicated for. And they do that every day.`, ja: `薬の承認は、特定の用途、特定の患者集団、特定の用量、特定の慢性疾患に対して下りる。でも臨床医には、承認の範囲外でその薬を使う裁量と権限があるんです。そして、それは毎日行われています。` },
        ],
    },
    {
        time: "1:16–2:18",
        lines: [
            { en: `Well, this was the big challenge during COVID, right? With hydroxychloroquine and with ivermectin.`, ja: `それってまさに、コロナのときの大問題だよね？ ヒドロキシクロロキンとイベルメクチンの件。` },
            { en: `Yep.`, ja: `ええ。` },
            { en: `And the real problem is that it interferes with the potential profits of pharmaceutical drugs that are approved.`, ja: `それで本当の問題は、そういうことをすると、承認済みの医薬品が生むはずの利益の邪魔になるってことだ。` },
            { en: `So, if you give someone the option to take something that's off-label, that's less expensive, and then they find out it's effective, and then it gets public — you find out there's less people that are taking whatever pharmaceutically approved drug.`, ja: `つまり、適応外で安い選択肢を与えて、それが効くと分かって、そのことが世間に広まったら — 承認済みの薬を飲む人が減るわけだ。` },
            { en: `Correct. And what created this backlash — or momentum — against peptides, candidly, were the GLP-1 weight loss drugs.`, ja: `そのとおりです。それで、ペプチドへのこの反発、というか逆風を生んだのは、率直に言えばGLP-1のダイエット薬なんです。` },
            { en: `So I do want to put them in two different buckets, because there's the 19 peptides that got moved to the dangerous list, with no clear answer from the previous administration as to why or how.`, ja: `だからこの話は、2つの別の箱に分けたいんです。まず一方には、前政権の下で「なぜ」「どうやって」の明確な説明もないまま危険リストに移された19種類のペプチドがある。` },
            { en: `But what I have seen, from being able to get behind the scenes and meet with lobbyists and legislators at the state and federal level, is: the lobbying power of Big Pharma is real. It's real, and it's intense, and it is not going away.`, ja: `ただ、舞台裏に入って、州と連邦のロビイストや議員に会ってきて分かったのは — 巨大製薬のロビー力は本物だ、ということです。本物で、強烈で、そして消えることはない。` },
        ],
    },
    {
        time: "2:18–3:15",
        lines: [
            { en: `And so, to put myself in the shoes of somebody — I've gotten to know Chris Klomp really well at the FDA, and Chris negotiated the most favored nation pricing on the pharmaceutical drugs with Lilly and Novo and all these big conglomerates.`, ja: `それで、相手の立場に立ってみるんです。僕はFDAのクリス・クロンプと親しくなったんですが、彼はリリーやノボといった巨大企業を相手に、医薬品の「最恵国価格」を交渉した人物です。` },
            { en: `And those companies, definitively — publicly and privately — are banging on the table of legislators and politicians and saying, "Look, we spent billions of dollars to innovate these drugs. We played within the rules of the system, and now these drugs hit the market, and you're allowing compounders and small independent pharmacies to rip off our patents."`, ja: `そして製薬会社は間違いなく、公の場でも裏でも、議員や政治家の机を叩いてこう言っています。「いいか、我々はこの薬の開発に何十億ドルも使った。システムのルールの中で戦ってきた。それなのに薬が市場に出た途端、あなたたちは調剤業者や小さな独立薬局に、我々の特許をパクらせているじゃないか」と。` },
            { en: `And that's their stance, and they plant that stake way over here.`, ja: `それが彼らの立場で、彼らは主張の杭を、うんと向こう側に打ち込むんです。` },
            { en: `If that regulator only hears that part of the story, it's a compelling story. You look at it and go, "God, man, poor Big Pharma. They spent all this money."`, ja: `規制当局の人間が話のその部分しか聞かなければ、これは説得力のあるストーリーです。聞いた人は「うわあ、巨大製薬がかわいそうだ。あんなにお金を使ったのに」となる。` },
            { en: `But if you zoom out and you know the lay of the land a little bit more — which is hard if you don't come from this industry — the truth is always in the middle.`, ja: `でも一歩引いて、業界の地形がもう少し見えていれば — この業界の出身でないと難しいことですが — 真実はいつも中間にあります。` },
        ],
    },
    {
        time: "3:15–4:49",
        lines: [
            { en: `So, devil's advocate: of course you want to protect the patent rights of a company that spent billions of dollars to bring a drug to market.`, ja: `あえて相手側に立って言えば — 何十億ドルもかけて薬を市場に届けた会社の特許権は、もちろん守られるべきです。` },
            { en: `We've covered this before, though. The dirty secret is: a large majority of the drugs that come to market come from the NIH. And phase one trials are done at the NIH. The NIH is funded by taxpayer dollars.`, ja: `ただ、前にもこの話はしましたよね。汚い秘密はこうです。市場に出る薬の大部分は、NIH(国立衛生研究所)から生まれている。第I相試験はNIHで行われる。そしてNIHの資金源は税金です。` },
            { en: `You and I are paying to innovate and create molecules that then get licensed off to big pharmaceutical companies, so they can bring them through the FDA approval process.`, ja: `あなたと僕が金を払って分子を生み出し、それが巨大製薬企業にライセンスされて、彼らがFDAの承認プロセスに乗せる、という構図なんです。` },
            { en: `How is that legal? It's nuts.`, ja: `それ、なんで合法なんだ？ どうかしてる。` },
            { en: `That is wild.`, ja: `めちゃくちゃな話だ。` },
            { en: `Yeah, it's nuts. And so I was trying to explain to the existing team at HHS: zoom out.`, ja: `ええ、どうかしてます。だから僕は、HHS(保健福祉省)の今のチームに説明しようとしたんです。「一歩引いて見てください」と。` },
            { en: `The system — as much as you are being told it failed and let Big Pharma down and allowed people to come in and infringe upon these patents — the truth of the matter is, the FDA sent out the bat signal and said, "We can't meet the need of the American people. There is a backlog on these drugs. Can compounders make these drugs?"`, ja: `「システムは失敗した、巨大製薬を見捨てた、特許の侵害を許した」とあなたたちは聞かされているでしょうが、実際のところは、FDA自身がバットシグナル(緊急招集の合図)を出して、こう言ったんです。「アメリカ国民の需要を満たせない。この薬は供給不足リストに載っている。調剤業者はこの薬を作れないか？」と。` },
            { en: `This has been a regulatory pathway that's been in existence for 30, 40 years. It happens all the time.`, ja: `これは30年、40年前から存在している正規の規制ルートです。しょっちゅうあることなんです。` },
            { en: `So compounders respond to the bat signal, begin to make these medications to the benefit of the American people during the shortage — and then you have these big pharmaceutical companies going, "Look, they're making our drugs. They're violating our patent."`, ja: `それで調剤業者はその合図に応えて、供給不足の間、アメリカ国民のためにこの薬を作り始めた。そうしたら今度は巨大製薬企業が「見ろ、あいつらがうちの薬を作っている。特許侵害だ」と言い出したわけです。` },
        ],
    },
    {
        time: "4:49–6:15",
        lines: [
            { en: `If your concern is that these companies didn't get the juice worth the squeeze from the patent — Eli Lilly 7x'd the value of their company. They're worth $800 billion.`, ja: `「この会社は特許から、絞った労力に見合う果汁を得られなかったのでは」というのが心配なら — イーライリリーは企業価値を7倍にしました。時価総額8,000億ドルですよ。` },
            { en: `They literally are worth more than most developed nations. This was the biggest blockbuster molecule in the history of the world. In the history of humanity, there has never been a drug that is this big of a blockbuster.`, ja: `文字どおり、大半の先進国より価値が大きい。これは世界史上最大のブロックバスター分子でした。人類の歴史で、ここまで売れた薬は存在しません。` },
            { en: `The money was made, 50,000 times over. Nobody was harmed.`, ja: `金はもう、5万回分は回収済みです。誰も損なんてしていない。` },
            { en: `But when you're a legislator, and I've got somebody telling me, "These guys hurt us to the tune of $7 billion" — and I know that's what they're telling these legislators, because I've met with the legislators at the state and federal level — then I have to go, "Well, hold on."`, ja: `でも、あなたが議員だとして、誰かに「こいつらのせいで70億ドル規模の損害を受けた」と吹き込まれていたら — 実際そう吹き込まれているんです。州と連邦の議員たちに会ってきたから知っています — そこで僕は言わなきゃいけない。「いや、ちょっと待ってください」と。` },
            { en: `The entire compounding sector only does $7 billion. GLP-1s were $2.5 billion. I know that's a big number, but that was when you were asking us to make these compounds.`, ja: `調剤業界全体の売上が70億ドルしかないんです。GLP-1は25億ドルでした。大きな数字なのは分かります。でもそれは、あなたたちが「作ってくれ」と頼んできた期間の数字です。` },
            { en: `That number is not nearly as large today. And you also shut down 503Bs, which is half of the compounding industry's ability to make these compounds.`, ja: `今はその数字よりはるかに小さい。しかもあなたたちは503B(大規模調剤施設)を止めた。調剤業界の製造能力の半分です。` },
            { en: `The truth of the matter is, it's about 1.5 to 2 billion dollars total that this industry was able to compound during the backlog, in order to meet the needs of the American people.`, ja: `実際のところ、供給不足の間にこの業界が調剤できたのは、アメリカ国民の需要を満たすための、合計でせいぜい15億から20億ドル分です。` },
            { en: `They're going to do 35 to 40 million dollars in just GLP-1 drugs this year in revenue. So you're talking an accounting error for Big Pharma.`, ja: `今年のGLP-1に限れば、売上は3,500万から4,000万ドル程度でしょう。つまり、巨大製薬にとっては会計上の誤差の話をしているんです。` },
        ],
    },
    {
        time: "6:15–7:35",
        lines: [
            { en: `And the reason I want to lay all that out is: I'm not here to argue about the GLP-1s.`, ja: `そして、これを全部並べてみせた理由はこうです。僕はGLP-1について争いに来たんじゃない。` },
            { en: `It sets a dangerous precedent, if pharma lobbies hard enough and they're able to get this done like what they want to do — reclassifying all these as biologics. It allows them to extend the patent for 10 to 12 years.`, ja: `危険な前例になるんです。もし製薬側が猛烈にロビー活動をして、望みどおりのこと — つまりこれら全部を「生物製剤」に再分類すること — をやり遂げたら、特許を10年から12年延長できてしまう。` },
            { en: `It's this whole shell game. But it sets precedent, like we covered before, and that precedent is dangerous.`, ja: `完全に手品のすり替えです。でもそれが前例を作る。前にも話したとおり、その前例が危険なんです。` },
            { en: `It's a slippery slope. Because if you do totally shut out compounders from their ability to make this for the American people, how long before they move to the next thing?`, ja: `滑りやすい坂です。だって、調剤業者がアメリカ国民のためにこれを作る道を完全に閉ざしたら、彼らが次の標的に動くまで、どれだけかかると思いますか？` },
            { en: `And in one breath, you've got a big pharmaceutical company — I'll use Lilly again as an example, because they're the main culprit — Lilly is saying, "Peptides are dangerous. They're getting the API from China. We shouldn't allow these compounders to make peptides."`, ja: `それで、同じ口でですよ — またリリーを例に使いますが、彼らが主犯格なので — リリーはこう言っている。「ペプチドは危険だ。彼らは原薬(API)を中国から仕入れている。調剤業者にペプチドを作らせるべきではない」と。` },
            { en: `Meanwhile, Eli Lilly just signed a 7-billion-dollar deal to acquire a peptide company out of China.`, ja: `その一方で、イーライリリーはつい先日、中国のペプチド企業を買収する70億ドルの契約にサインしたんです。` },
            { en: `China.`, ja: `中国のを。` },
            { en: `So Lilly's buying a peptide company from China, while lobbying government officials and saying it's dangerous to use products from China, and these compounders are dangerous, and nobody's regulating it.`, ja: `つまりリリーは、中国からペプチド企業を買いながら、政府高官には「中国製品を使うのは危険だ、調剤業者は危険だ、誰も規制していない」とロビー活動をしているわけです。` },
            { en: `And there's just all this misnomer and dogma, and it's confusing if you don't come from healthcare.`, ja: `そこら中に誤った呼び名とドグマが転がっていて、医療業界の出身でなければ混乱して当然なんです。` },
        ],
    },
    {
        time: "7:35–8:46",
        lines: [
            { en: `Well, it seems like it'd be very confusing for a regulator. Very confusing for someone who's not educated on this to get up to speed.`, ja: `規制する側からしたら、相当ややこしいだろうね。この分野の教育を受けてない人が追いつくのは大変だ。` },
            { en: `100%. And they have so many initiatives and so many things they're tackling.`, ja: `まったくです。しかも彼らは、山ほどの施策と課題を同時に抱えていますから。` },
            { en: `And the challenge, historically, is when you're Big Pharma — I think it was like $31 million that that industry used in lobbying power last year, as an industry.`, ja: `それで、昔からの問題はこうです。相手が巨大製薬の場合 — 確か昨年、あの業界が業界全体でロビー活動に使ったのは3,100万ドルくらいだったはずです。` },
            { en: `Dollars equal accessibility. Accessibility equals impressionability. And impressionability equals outcomes.`, ja: `カネはアクセスに等しい。アクセスは影響力に等しい。そして影響力は結果に等しい。` },
            { en: `It's like trying to win a debate where I get 1 minute and the opposition gets 9 minutes. And in the 1 minute, I've got to debunk all the lies that the opposition told.`, ja: `僕の持ち時間が1分で、相手側が9分のディベートで勝とうとするようなものです。しかもその1分で、相手が並べた嘘を全部暴かなきゃいけない。` },
            { en: `I don't even want to use the word "lies." You can use facts — but like we've said before, facts can be skewed when delivered inappropriately.`, ja: `いや、「嘘」という言葉すら使いたくない。事実を使うことだってできる。ただ、前にも言ったとおり、事実というのは不適切な出し方をすれば歪められるんです。` },
            { en: `If you say, "They cost us $7 billion, and we spent $3 billion to bring this drug to market, and they're importing products from China, and there's no safety nets, and nobody's inspecting them — this is dangerous, and this is a liability to the American public."`, ja: `たとえばこう言うんです。「彼らのせいで我々は70億ドル損した。この薬を市場に出すのに30億ドルかけた。彼らは中国から製品を輸入していて、安全網もなく、誰も検査していない。これは危険で、アメリカ国民にとってのリスクだ」と。` },
            { en: `A politician's ears are going to perk up. Especially when you're lobbying them, and funding campaigns, and trying to influence those folks.`, ja: `政治家の耳はピンと立ちますよ。ましてやロビー活動をして、選挙資金を出して、影響を与えようとしている相手ならなおさらです。` },
        ],
    },
    {
        time: "8:46–10:32",
        lines: [
            { en: `But the truth is: if you take into account all the drugs that didn't make it, and you want to cook the books, you can make it look like you spent a billion to three billion.`, ja: `でも実際はこうです。世に出なかった薬まで全部計算に入れて、帳簿をいじる気になれば、10億から30億ドルかけたように見せることはできる。` },
            { en: `You can also take credit for all the drugs that were launched out of the NIH, that you bought the rights to and monetized for decades. And then you can talk about safety — but in reality, there were recalls from both Lilly and Novo Nordisk. There are all sorts of issues and label changes. And historically, even the FDA itself —`, ja: `NIH発の薬の権利を買い取って何十年も収益化してきたくせに、その手柄を自分のものにすることもできる。それから安全性の話もできますが — 実際には、リリーとノボ・ノルディスクの両方でリコールが起きています。ありとあらゆる問題と添付文書の変更がある。そして歴史的には、FDA自身でさえ —` },
            { en: `This is one of the things with peptides that, when I had the privilege of meeting with Marty Makary, I said: "Marty, if we're being honest — these are y'all's numbers. 60 to 80% of the drugs that make it through the drug approval process will have a major label change or recall."`, ja: `ペプチドに関して、マーティ・マカリー(FDA長官)に会う機会をいただいたとき、僕はこう言ったんです。「マーティ、正直にいきましょう。これはあなたたちの数字ですよ。承認プロセスを通過した薬の60%から80%が、のちに重大な添付文書の変更かリコールを経験するんです」と。` },
            { en: `60 to 80% of the medications that come through this process end up having a major label change or recall.`, ja: `このプロセスを通ってきた医薬品の60%から80%が、最終的に重大な添付文書の変更かリコールに至っている。` },
            { en: `What is a major label change?`, ja: `「重大な添付文書の変更」って何？` },
            { en: `So they uncover — an example, with antidepressants: they realized the suicidal ideation in teenagers, right? And they had to change that label and say, "Hey, not only is this only a fraction better than a placebo — it barely differentiates from placebo, retrospectively."`, ja: `後から発覚するんです。抗うつ薬の例で言うと、10代の自殺念慮のリスクが分かった。それで添付文書を変えて、こう言わざるを得なくなった。「実はこの薬、プラセボよりほんのわずかに良い程度で — 振り返ってみれば、プラセボとほとんど差がありません」と。` },
            { en: `Not even close to exercise.`, ja: `運動には遠く及ばないんだよね。` },
            { en: `It's literally — exercise is six to sevenfold more efficacious than an antidepressant.`, ja: `文字どおりです。運動は抗うつ薬の6倍から7倍効果があるんです。` },
            { en: `How wild is that?`, ja: `すごい話だろ？` },
            { en: `Yeah. And then you go back to the science. The science was all cooked books. It was all said that it was SSRI, serotonin-related — and there was never a single study that correlated depression to serotonin. It was all dogma, created by industry.`, ja: `ええ。それで科学に立ち返ってみると、その科学が粉飾決算だったんです。ずっと「SSRIだ、セロトニンの問題だ」と言われてきたのに、うつ病とセロトニンを結びつけた研究はただの一つも存在しなかった。全部、業界が作ったドグマだったんです。` },
            { en: `And again, Marty talks about this in his book, so I know he's aligned with a lot of these viewpoints.`, ja: `繰り返しますが、マーティは自分の著書でこの話をしています。だから彼がこうした見方に近いことは分かっているんです。` },
        ],
    },
    {
        time: "10:32–12:24",
        lines: [
            { en: `When it comes down to peptides, though, it gets a little confusing, because you're talking proactive, predictive, preventative care. If somebody's taking a peptide to optimize their healing, it's not a chronic-disease-related issue.`, ja: `ただ、ペプチドの話になると少しややこしくなります。というのも、これは「先回りして、予測して、予防する」医療の話だからです。回復を最適化するためにペプチドを使う人がいても、それは慢性疾患の問題ではない。` },
            { en: `The system is built to monetize and profiteer off of treating the symptoms of chronic disease. It's become a prescription management system, not a health care system. And that's the big challenge.`, ja: `今のシステムは、慢性疾患の「症状の治療」を収益化して暴利を得るように設計されています。もはや医療制度ではなく、処方箋管理制度になってしまった。そこが大きな問題なんです。` },
            { en: `This is an entire paradigm shift that I don't know if all regulators truly understand. I think they're trying to wrap their head around it. I think Secretary Kennedy understands it.`, ja: `これは完全なパラダイムシフトで、すべての規制当局者が本当に理解しているかは分かりません。理解しようと頭を捻っている最中だと思います。ケネディ長官は理解していると思いますが。` },
            { en: `I think a lot of this movement, in the American people post-COVID — people have fundamentally changed. People do now question authority.`, ja: `コロナ後のアメリカ国民のこの動きの多くは — 人々が根本から変わったんだと思います。人々は今、権威を疑うようになった。` },
            { en: `People do now question: just because something came through the FDA doesn't mean it's safe. And just because something hasn't gone through the FDA approval process doesn't mean that it's dangerous or doesn't work.`, ja: `人々は今、こう疑うようになりました。FDAを通ったからといって安全とは限らない。逆に、FDAの承認プロセスを通っていないからといって、危険だとか効かないとかいうことにもならない、と。` },
            { en: `A lot of times there's a reason. Like BPC-157 — there's a patent out of Croatia, I believe, on that molecule. And that patent, I think, lasts 3 more years. Why would you go spend a billion to 3 billion dollars to try and bring a drug to market that already has a patent?`, ja: `たいてい理由があるんです。たとえばBPC-157 — あの分子には確かクロアチア発の特許があって、あと3年ほど残っているはずです。すでに特許がある薬を市場に出すために、誰が10億から30億ドルも使いますか？` },
            { en: `The other issue: it's a short-chain amino acid peptide, found readily in nature. And patent law makes it very difficult to patent what is naturally found in nature.`, ja: `もう一つの問題は、あれが自然界に普通に存在する短鎖アミノ酸ペプチドだということです。特許法上、自然界にもともと存在するものに特許を取るのは非常に難しい。` },
            { en: `And that is why the big pharmaceutical companies are struggling with their patents on the GLP-1s. They have patented dosaging and delivery mechanisms.`, ja: `だからこそ、巨大製薬企業はGLP-1の特許で苦労しているんです。彼らが特許を取っているのは、用量設定と送達の仕組みなんですよ。` },
            { en: `They're not arguing against the patent. If you look at the lawsuits that they filed nationwide, they're arguing against people advertising. They're arguing against some of the things people shouldn't be doing — rightfully so. But they're not arguing against the patent.`, ja: `彼らは特許そのものでは争っていません。全米で起こした訴訟を見てみると、争点は広告のやり方です。やるべきでないことをやっている連中を訴えている — それ自体は正当です。でも、特許そのものでは争っていないんです。` },
        ],
    },
    {
        time: "12:24–13:00",
        lines: [
            { en: `Let me ask you this. Just imagine — and I don't think this is a good idea — but imagine if only pharmaceutical drug companies were allowed to make peptides. Would they just become legal?`, ja: `じゃあ聞かせてくれ。想像してみてほしいんだけど — いいアイデアだとは思ってないよ — もしペプチドを作れるのが製薬会社だけになったら、ペプチドは普通に合法になるのかな？` },
            { en: `Yeah.`, ja: `なりますね。` },
            { en: `I mean, well, what would happen?`, ja: `というか、何が起きるんだろう？` },
            { en: `It'd be a giant business — and it is going to be. Prices would raise a little bit, yeah, 100%.`, ja: `巨大ビジネスになりますよ。実際、なりつつあります。値段は多少上がるでしょうね。ええ、間違いなく。` },
            { en: `But also, the availability would skyrocket, and you would start seeing commercials on CNN: "BPC-157 helps soft tissue injuries. Helps this, helps that." Then you'd see all fit people at the beach jogging.`, ja: `でも同時に、入手のしやすさは跳ね上がる。そしてCNNでこんなCMが流れ始めるんだ。「BPC-157は軟部組織の損傷に効きます。あれにも効く、これにも効く」。それで、ビーチでジョギングする引き締まった人たちの映像が流れるわけだ。` },
            { en: `[laughter]`, ja: `(笑い)` },
        ],
    },
    {
        time: "13:00–15:15",
        lines: [
            { en: `And wait, wait — I agree with you. But the fear — I'm viewing it as: there's three options, and these are the three things that I've seen.`, ja: `ちょっと待ってください — 同意はします。ただ、懸念があって。僕はこう見ているんです。選択肢は3つあって、実際にこの3つを見てきました。` },
            { en: `There's the traditional system — the sick care system. That system is controlled by insurance, big pharmaceutical companies, and regulators.`, ja: `まず、従来のシステム。「病人ケア制度(シックケア・システム)」です。あのシステムを支配しているのは、保険会社と巨大製薬企業と規制当局です。` },
            { en: `Whether intentional or unintentional, the system was cooked. It's been cooked and baked for a long time, and it is the system that it is.`, ja: `意図的かどうかはともかく、あのシステムは仕組まれていた。長い時間をかけて仕込まれ、焼き固められて、今の形になっているんです。` },
            { en: `And we know where that system got us. That system got us to 1.7 to 1.9 million Americans dying every year of chronic disease — more than every world war we've ever fought.`, ja: `そして、あのシステムが我々をどこへ連れて行ったかは分かっています。毎年170万から190万人のアメリカ人が慢性疾患で死ぬところまで、です。これは我々が戦ったすべての世界大戦の死者より多い。` },
            { en: `It's got us to be the most obese and disease-riddled society in the history of humanity. And we spend more on health care than any other nation. So that's one option.`, ja: `人類史上もっとも肥満で、もっとも病気だらけの社会になるところまで連れて行かれた。しかも医療費はどの国よりも使っている。それが選択肢の1つ目です。` },
            { en: `Just those facts are so crazy.`, ja: `その事実だけで、もう常軌を逸してるよな。` },
            { en: `It's nuts. And to think that to ask questions, or to challenge that system, is wrong —`, ja: `どうかしてます。そのシステムに質問すること、異を唱えることが「間違い」だとされるなんて —` },
            { en: `Again, I'm not trying to make this political, because I really am not. I don't care: conservative, Democrat, Republican. Chronic disease doesn't care about your political leanings. It doesn't care. Disease and death comes for all of us.`, ja: `繰り返しますが、これを政治の話にする気はありません。本当にないんです。保守もリベラルも、民主党も共和党も、どうでもいい。慢性疾患はあなたの政治的立場なんて気にしません。まったく気にしない。病気と死は、我々全員のところへやって来るんです。` },
            { en: `And my goal is: how do we prevent it? How do we delay it? How do we drive health span?`, ja: `僕の目標はこうです。どうやってそれを防ぐか。どうやって遅らせるか。どうやって健康寿命を延ばすか。` },
            { en: `You don't do it playing whack-a-mole and treating the symptoms of a chronic disease. You get proactive, predictive, and preventative.`, ja: `慢性疾患の症状を相手にモグラ叩きをしていても、それは達成できません。先回りして、予測して、予防するんです。` },
            { en: `And how do you do that? Well, you've got to be able to run diagnostic tests and tools. Well, the insurance companies shut that down and make that really hard to do.`, ja: `どうやるか？ 診断テストとツールを回せるようにならないといけない。ところが、保険会社がそれを止めて、実行を非常に難しくしているんです。` },
            { en: `And so, in the health care system that exists today, in the insurance model, prescription management is the main goal of those models.`, ja: `だから、今日存在する医療制度、つまり保険モデルにおいては、処方箋の管理こそがそのモデルの主目的になっているんです。` },
            { en: `And I've said this time and time again: you've got to view health insurance in America like car insurance. It's there if you wreck the car.`, ja: `何度も何度も言ってきましたが、アメリカの健康保険は自動車保険と同じものとして見るべきです。車を大破させたときのためにある、ということです。` },
            { en: `We are great at triaging and treating a catastrophic event. Heart attack, stroke — hospitals. You're in there, something catastrophic happens, we can triage that disaster, and we can get you in and out of the hospital.`, ja: `我々は、破局的な事態のトリアージと治療は得意です。心臓発作、脳卒中 — 病院に運ばれて、何か破局的なことが起きても、その災害をさばいて、入院させて退院させることはできる。` },
            { en: `We are absolutely an abysmal failure at preventing chronic disease and driving health span.`, ja: `一方で、慢性疾患を予防することと健康寿命を延ばすことにかけては、我々は完全に、底なしの失敗作なんです。` },
            { en: `And the only way to do that is to get proactive and predictive and personalized.`, ja: `そしてそれをやる唯一の方法が、先回りして、予測して、個別化することなんです。` },
        ],
    },
];
