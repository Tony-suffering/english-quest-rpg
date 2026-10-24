/**
 * THE SPINE -- 100行。OUTPUT PASS の背骨。
 *
 * 【なぜ作ったか】
 * write(1次) / speak(2次) / topic100(土台) が3つの別教材に見えていた。
 * 1つの商品にするには、3つが共有する「本体」が1つ要る。それがこの100行。
 *
 * 【DUOから盗んだもの】
 * DUOは網羅していない。DUOが強いのは (1) 閉じた数 (2) 一息で言える長さ
 * (3) 全部が同じ拍で並んでいること の3つ。560文を通しで読めるから頭に残る。
 * ここでは 20ヴァース x 5行 = 100行。全部12語前後。通しで読むと約10分。
 *
 * 【5拍の型】どのヴァースも必ずこの順で並ぶ。同じ拍が20回来るのでリズムになる。
 *   1 掴み  hook   -- 議論の枠を置く
 *   2 仕組み why   -- なぜそうなるのか
 *   3 証拠  proof  -- 数字・国名・具体例。ここだけ長くてよい
 *   4 着地  so     -- だから何が言えるのか
 *   5 刺し  sting  -- 覚えてしまう一行。笑い or 比喩。ここが「歌」の部分
 *
 * 【3つの出口】
 *   100行 -> 紙に書く(1次)  / 声に出す(2次)  / 100題に撃つ(土台)
 * ヴァースIDは eiken-topic100.ts の Engine.id と一対一。エンジン = ヴァース。
 *
 * 【著作権】全文オリジナル。実際の検定試験の設問・解答は一切転載していない。
 */

export type Beat = 'hook' | 'why' | 'proof' | 'so' | 'sting';

export const BEATS: { key: Beat; label: string; en: string; note: string }[] = [
    { key: 'hook', label: '掴み', en: 'hook', note: '議論の枠を置く。ここで立場は言わない' },
    { key: 'why', label: '仕組み', en: 'why', note: 'なぜそうなるのかを一文で' },
    { key: 'proof', label: '証拠', en: 'proof', note: '数字・国名・具体例。5行で唯一長くてよい行' },
    { key: 'so', label: '着地', en: 'so', note: 'だから何が言えるのか' },
    { key: 'sting', label: '刺し', en: 'sting', note: '覚えてしまう一行。笑い or 比喩。ここが歌' },
];

export interface SpineLine {
    beat: Beat;
    en: string;
    ja: string;
}

export interface Verse {
    no: number;
    /** eiken-topic100.ts の Engine.id と一致させる */
    engineId: string;
    label: string;
    lines: SpineLine[];
}

export const VERSES: Verse[] = [
    {
        no: 1, engineId: 'irreversible', label: '取り返しがつかない',
        lines: [
            { beat: 'hook', en: "We might be wrong about this. Everyone is wrong sometimes.", ja: "我々は間違うかもしれない。誰でも時々間違う。" },
            { beat: 'why', en: "The real question is whether we could ever fix it.", ja: "本当の争点は、あとで直せるかどうかだ。" },
            { beat: 'proof', en: "Close to two hundred people on death row in America turned out to be innocent.", ja: "アメリカでは死刑囚のうち二百人近くが、実は無実だった。" },
            { beat: 'so', en: "A mistake you can undo is a setback. A mistake you cannot undo is a different animal.", ja: "戻せる誤りは挫折だ。戻せない誤りは、まったく別の生き物だ。" },
            { beat: 'sting', en: "Every other policy comes with an undo button. This one ships without one.", ja: "他の政策には取り消しボタンが付いている。これだけ付かずに出荷される。" },
        ],
    },
    {
        no: 2, engineId: 'incentive', label: '誘因が壊れる',
        lines: [
            { beat: 'hook', en: "I am not worried about the intention. I am worried about what happens next.", ja: "意図は心配していない。心配なのはその後だ。" },
            { beat: 'why', en: "People do not follow the goal you announced. They follow the number you count.", ja: "人は掲げた目標には従わない。数えると決めた数字に従う。" },
            { beat: 'proof', en: "When English hospitals were judged on treating patients within four hours, a strange spike appeared at three hours and fifty-nine minutes.", ja: "英国の病院が「4時間以内に処置」で評価されるようになると、3時間59分に妙な山ができた。" },
            { beat: 'so', en: "So before we write the rule, we should ask what it quietly rewards.", ja: "だからルールを書く前に、それが静かに何を報いるのかを問うべきだ。" },
            { beat: 'sting', en: "We asked for shorter waiting lists, and we got them. The queue simply moved out to the car park.", ja: "待ち行列を短くしろと言ったら、短くなった。行列が駐車場へ移っただけだ。" },
        ],
    },
    {
        no: 3, engineId: 'who-pays', label: '誰が払うのか',
        lines: [
            { beat: 'hook', en: "We keep talking about the average person. The average person does not exist.", ja: "我々は平均的な人の話ばかりする。平均的な人は存在しない。" },
            { beat: 'why', en: "A cost that looks small on paper never lands evenly on the ground.", ja: "紙の上で小さく見える負担も、地面には均等に落ちない。" },
            { beat: 'proof', en: "A fuel tax is small change in a city with a train, and a real problem forty minutes from one.", ja: "燃料税は駅のある街では小銭で、駅から四十分の場所では現実の問題だ。" },
            { beat: 'so', en: "If the policy is right, it is still right after you ask who absorbs the damage.", ja: "正しい政策は、誰が損を吸収するのかを問うたあとでも正しい。" },
            { beat: 'sting', en: "Policies are written by people who will never have to live under them.", ja: "政策は、その下で暮らすことが決してない人間が書いている。" },
        ],
    },
    {
        no: 4, engineId: 'data-vs-feel', label: '数字は下がり体感は上がる',
        lines: [
            { beat: 'hook', en: "There is a gap here between the statistics and the feeling. Both are real.", ja: "ここには統計と体感のずれがある。そのどちらも本物だ。" },
            { beat: 'why', en: "Numbers move slowly. Attention moves in an afternoon.", ja: "数字はゆっくり動く。注目は半日で動く。" },
            { beat: 'proof', en: "Crime has fallen for thirty years, and most people are certain it is rising.", ja: "犯罪は三十年下がり続けているのに、大半の人は増えていると確信している。" },
            { beat: 'so', en: "So we should be honest about whether we are solving the problem or solving the anxiety.", ja: "だから、問題を解いているのか不安を解いているのかを正直に見るべきだ。" },
            { beat: 'sting', en: "We are not living through more disasters. We are just watching all of them.", ja: "災害が増えたのではない。全部を見物できるようになっただけだ。" },
        ],
    },
    {
        no: 5, engineId: 'deferred', label: '代償を先送りしている',
        lines: [
            { beat: 'hook', en: "This looks cheap today, and I would like to know why.", ja: "これは今日は安く見える。その理由を知りたい。" },
            { beat: 'why', en: "It is cheap because the bill has been posted to somebody who cannot object yet.", ja: "安いのは、請求書がまだ文句を言えない相手に回されているからだ。" },
            { beat: 'proof', en: "A motorway bridge in Genoa came down in 2018 after years of postponed maintenance, and the replacement cost far more than the repairs would have.", ja: "2018年、ジェノヴァの高速道路橋が長年の先送りの末に落ちた。架け替えは、修繕を続けた場合よりはるかに高くついた。" },
            { beat: 'so', en: "The cost does not disappear while we wait. It only changes whose name is on it.", ja: "待っている間に費用は消えない。誰の名前で請求されるかが変わるだけだ。" },
            { beat: 'sting', en: "It is not a saving. It is a loan from people who cannot vote yet.", ja: "これは貯金じゃない。まだ投票できない連中からの借金だ。" },
        ],
    },
    {
        no: 6, engineId: 'scale', label: '規模が質を変える',
        lines: [
            { beat: 'hook', en: "People say this has always existed, and that is true.", ja: "これは昔からあったと言われる。それは事実だ。" },
            { beat: 'why', en: "But scale changes what a thing actually is.", ja: "しかし規模は、そのものの正体を変える。" },
            { beat: 'proof', en: "Gossip in a village of two hundred and the same rumour reaching two million strangers overnight do not behave the same way.", ja: "二百人の村の噂話と、一晩で二百万人の他人に届く同じ噂は、同じ振る舞いをしない。" },
            { beat: 'so', en: "Past a certain size, more of something turns it into something else.", ja: "ある大きさを超えると、量が増えることは別物に変わることだ。" },
            { beat: 'sting', en: "A campfire and a forest fire are the same chemistry. Nobody calls them the same problem.", ja: "焚き火と山火事は同じ化学反応だ。同じ問題だと言う人はいない。" },
        ],
    },
    {
        no: 7, engineId: 'goodhart', label: '測ると壊れる',
        lines: [
            { beat: 'hook', en: "The moment a measurement becomes the goal, it stops measuring anything.", ja: "測定が目標になった瞬間、それは何も測らなくなる。" },
            { beat: 'why', en: "Schools were tested to see whether children had learned. Now schools are ranked by the test.", ja: "テストは子どもが学んだか見るためだった。今は学校がそれで序列化される。" },
            { beat: 'proof', en: "English schools ranked on how many pupils reached one particular grade quietly poured their staff into the pupils sitting just below it.", ja: "特定の成績に届いた生徒数で序列化された英国の学校は、その一段下にいる生徒だけに静かに人員を集中させた。" },
            { beat: 'so', en: "The number goes up while the thing it stood for quietly goes down.", ja: "数字は上がり、それが表していたものは静かに下がる。" },
            { beat: 'sting', en: "We built a thermometer, then started heating it and calling it summer.", ja: "体温計を作って、その体温計を温めて「夏だ」と言い出した。" },
        ],
    },
    {
        no: 8, engineId: 'tool-vs-rule', label: '道具か、制度か',
        lines: [
            { beat: 'hook', en: "I do not think the technology itself is good or bad.", ja: "技術そのものが善か悪かとは思わない。" },
            { beat: 'why', en: "A tool amplifies whatever the people holding it already wanted.", ja: "道具は、持つ人がもともと望んでいたことを増幅する。" },
            { beat: 'proof', en: "France gave workers a legal right to ignore email out of hours. Same phones, same software, a completely different evening.", ja: "フランスは時間外のメールを無視する法的権利を労働者に与えた。同じ端末、同じソフト、まったく違う夜だ。" },
            { beat: 'so', en: "Nothing inside the machine decides which one happens. That is decided in an office.", ja: "どちらになるかを機械の内部は決めない。それはオフィスで決まる。" },
            { beat: 'sting', en: "Blaming the machine is a convenient way of not naming the person who switched it on.", ja: "機械のせいにするのは、スイッチを入れた人間の名を伏せる便利な手だ。" },
        ],
    },
    {
        no: 9, engineId: 'no-opposition', label: '誰も反対しないから止まらない',
        lines: [
            { beat: 'hook', en: "The dangerous policies are not the ones we argue about. Those get examined.", ja: "危険な政策は、我々が議論するものではない。それは吟味される。" },
            { beat: 'why', en: "The dangerous ones are the ones everybody nods along to.", ja: "危険なのは、全員が頷いてしまうほうだ。" },
            { beat: 'proof', en: "London built its camera network to charge drivers for entering the city, and within a few years the police had been given access to all of it.", ja: "ロンドンは都心に入る車から課金するためにカメラ網を作った。数年で警察がその全部を使えるようになっていた。" },
            { beat: 'so', en: "Ten years later the network exists, and no one ever voted for the network.", ja: "十年後には網が完成しているが、誰も網には投票していない。" },
            { beat: 'sting', en: "We did not vote for surveillance. We voted for one camera, in one car park.", ja: "我々は監視社会に投票したんじゃない。駐車場のカメラ一台に投票しただけだ。" },
        ],
    },
    {
        no: 10, engineId: 'transition', label: '移行期に人が潰れる',
        lines: [
            { beat: 'hook', en: "I agree with where this ends up. My concern is the twenty years in between.", ja: "行き着く先には賛成だ。心配なのは、間の二十年のほうだ。" },
            { beat: 'why', en: "That is where actual people live, and twenty years is most of a working life.", ja: "実際の人間はそこに住んでいるし、二十年は働く人生の大半だ。" },
            { beat: 'proof', en: "When the mines closed in northern England the economics were correct, and the towns still have not recovered.", ja: "イングランド北部で炭鉱が閉じたとき経済の理屈は正しく、その町は今も戻っていない。" },
            { beat: 'so', en: "One generation paid the whole cost of a change that helped everybody else.", ja: "一世代が、他の全員を助けた変化の費用を丸ごと払った。" },
            { beat: 'sting', en: "In the long run we are all fine. In the short run, somebody loses a town.", ja: "長期的には全員無事だ。短期的には、誰かが町を一つ失う。" },
        ],
    },
    {
        no: 11, engineId: 'precedent', label: '他所ではもう起きている',
        lines: [
            { beat: 'hook', en: "We do not have to speculate about this, which is what makes the debate frustrating.", ja: "これは推測する必要がない。だからこの議論は苛立たしい。" },
            { beat: 'why', en: "Somebody has already run this experiment, and we can go and read what happened.", ja: "すでに誰かがこの実験を走らせていて、何が起きたかは読みに行ける。" },
            { beat: 'proof', en: "When New Zealand tried it, the result was mixed rather than catastrophic, which is usually how these things go.", ja: "ニュージーランドが試したとき、結果は破滅ではなく「まちまち」だった。たいていそうなる。" },
            { beat: 'so', en: "So the question is not whether it could work, but why we still discuss it as a theory.", ja: "だから問いは、機能しうるかではなく、なぜまだ理論として語るのか、だ。" },
            { beat: 'sting', en: "We keep debating it as a thought experiment. It stopped being one fifteen years ago.", ja: "我々は思考実験として議論し続けている。十五年前に思考実験ではなくなった。" },
        ],
    },
    {
        no: 12, engineId: 'dependency', label: '使えるうちに使えなくなる',
        lines: [
            { beat: 'hook', en: "The risk is not that it fails. The risk is that it works.", ja: "リスクは失敗することではない。うまくいくことだ。" },
            { beat: 'why', en: "It works so well that we lose the ability to manage without it.", ja: "あまりにうまくいくので、それ無しで済ませる能力を失う。" },
            { beat: 'proof', en: "Drivers who follow satellite navigation build weaker maps of their own city.", ja: "カーナビに従う運転手は、自分の街の地図が頭の中で弱くなる。" },
            { beat: 'so', en: "Nothing was taken from them, and that is exactly why nobody noticed it going.", ja: "何も奪われてはいない。だからこそ、失われていくことに誰も気づかない。" },
            { beat: 'sting', en: "Nobody took the skill away from us. We just stopped showing up for practice.", ja: "誰も技能を取り上げていない。我々が練習に来なくなっただけだ。" },
        ],
    },
    {
        no: 13, engineId: 'trust', label: '信頼はインフラである',
        lines: [
            { beat: 'hook', en: "Whatever we decide, the thing we cannot afford to spend is public trust.", ja: "何を決めるにせよ、使い切ってはいけないのは社会の信頼だ。" },
            { beat: 'why', en: "It takes decades to build and an afternoon to lose.", ja: "築くのに数十年、失うのに半日しかかからない。" },
            { beat: 'proof', en: "One retracted paper in 1998 pushed British measles vaccination down for a decade, and not one line of the science had changed.", ja: "1998年の撤回された論文一本で、英国の麻疹ワクチン接種率は十年下がった。科学のほうは一行も変わっていない。" },
            { beat: 'so', en: "You can be completely right and still lose the room.", ja: "完全に正しくても、その場を失うことはある。" },
            { beat: 'sting', en: "Trust is like plumbing. Nobody thanks you for it until the day it fails.", ja: "信頼は配管だ。壊れる日まで誰も礼を言わない。" },
        ],
    },
    {
        no: 14, engineId: 'principle', label: '例外を認めると原則が消える',
        lines: [
            { beat: 'hook', en: "The argument for an exception always uses the worst case you can imagine.", ja: "例外を認めよという議論は、常に想像しうる最悪の事例を使う。" },
            { beat: 'why', en: "The worst case is rare, and the rule will spend most of its life somewhere else.", ja: "最悪の事例はまれで、そのルールは一生の大半を別の場所で過ごす。" },
            { beat: 'proof', en: "Britain wrote stop-and-search powers for terrorism and ended up using them on protesters and photographers until the courts stepped in.", ja: "英国はテロ対策として職務質問の権限を作り、裁判所が止めるまで、抗議者や写真家に使い続けた。" },
            { beat: 'so', en: "Once the exception exists, who qualifies gets decided later, by people we have not met.", ja: "例外ができれば、誰が該当するかは後日、会ったこともない人間が決める。" },
            { beat: 'sting', en: "Everyone agrees about the monster. The rule gets written for everyone standing near him.", ja: "怪物については全員が一致する。ルールは、その隣に立つ全員に書かれる。" },
        ],
    },
    {
        no: 15, engineId: 'status-quo', label: '何もしないことも選択である',
        lines: [
            { beat: 'hook', en: "We talk as though the choice is between acting and waiting.", ja: "行動か待機かの選択であるかのように語られる。" },
            { beat: 'why', en: "Waiting is not neutral; it moves the decision somewhere nobody has to defend it.", ja: "待つことは中立ではない。誰も擁護しなくて済む場所へ決定を移すだけだ。" },
            { beat: 'proof', en: "Almost every country that reviewed daylight saving concluded it saves close to no energy, and almost every one of them still does it.", ja: "サマータイムを検証した国はほぼ全て「省エネ効果はほぼ無い」と結論し、そのほぼ全てが今も続けている。" },
            { beat: 'so', en: "If we would not vote today to build what we already have, keeping it is not caution.", ja: "今ある制度を今日ゼロから作る投票をしないなら、維持は慎重さではない。" },
            { beat: 'sting', en: "It is not caution. It is a choice nobody wants to sign.", ja: "それは慎重さではない。誰も署名したがらない選択だ。" },
        ],
    },
    {
        no: 16, engineId: 'definition', label: '定義が争点',
        lines: [
            { beat: 'hook', en: "Before I answer, I would want to know what we mean by that word.", ja: "答える前に、その語で何を指しているのかを知りたい。" },
            { beat: 'why', en: "Most of this disagreement lives inside that word, not in the facts around it.", ja: "この対立の大半は周囲の事実ではなく、その語の中に住んでいる。" },
            { beat: 'proof', en: "If success means income, that is one answer. If it means stopping work at sixty without fear, that is another.", ja: "成功が収入なら答えは一つ。六十で不安なく働くのをやめられることなら別の答えだ。" },
            { beat: 'so', en: "Half the people arguing are answering different questions and have not noticed.", ja: "議論している人の半分は別の問いに答えていて、そのことに気づいていない。" },
            { beat: 'sting', en: "We have argued for ten minutes about a word neither of us has defined.", ja: "我々は十分間、どちらも定義していない語について争っていた。" },
        ],
    },
    {
        no: 17, engineId: 'both-true', label: '両方とも本当',
        lines: [
            { beat: 'hook', en: "I think both things are true at the same time.", ja: "私は両方が同時に真だと思う。" },
            { beat: 'why', en: "Pretending otherwise is why this argument goes in circles.", ja: "そうでないふりをするから、この議論は堂々巡りになる。" },
            { beat: 'proof', en: "In Barcelona the same visitors who pay for the city are the reason its own residents can no longer rent in it.", ja: "バルセロナでは、街を支えている観光客が、そこの住民が家を借りられない理由でもある。" },
            { beat: 'so', en: "The useful question is which of the two we are better equipped to handle.", ja: "有用な問いは、その二つのどちらに対処する用意があるか、だ。" },
            { beat: 'sting', en: "We are not disagreeing about the facts. We are disagreeing about which problem we would rather have.", ja: "我々は事実で対立していない。どちらの問題を抱えたいかで対立している。" },
        ],
    },
    {
        no: 18, engineId: 'freedom-cost', label: '自由には管理費がかかる',
        lines: [
            { beat: 'hook', en: "More freedom sounds like an obvious good, and usually it is.", ja: "自由が増えるのは明らかな善に聞こえるし、たいていはそうだ。" },
            { beat: 'why', en: "But every choice we hand back also hands back the work of choosing.", ja: "しかし返される選択はどれも、選ぶという労働も一緒に返している。" },
            { beat: 'proof', en: "Britain switched its pensions from opt-in to opt-out in 2012, and enrolment jumped from about half of workers to almost nine in ten. The offer itself had not changed.", ja: "英国は2012年に年金を任意加入から自動加入へ変えた。加入率は労働者の半分程度から九割近くへ跳ね上がった。中身は何も変わっていない。" },
            { beat: 'so', en: "Being allowed to choose is not the same as having time to choose well.", ja: "選ぶことを許されるのと、うまく選ぶ時間があるのは別物だ。" },
            { beat: 'sting', en: "We gave everyone the freedom to choose, and quietly gave them the paperwork too.", ja: "全員に選ぶ自由を与え、こっそり書類仕事も渡した。" },
        ],
    },
    {
        no: 19, engineId: 'compare-to-what', label: '何と比べているのか',
        lines: [
            { beat: 'hook', en: "The case against this compares it to a perfect alternative that is not on the table.", ja: "これへの批判は、選択肢にない完璧な代替案と比べている。" },
            { beat: 'why', en: "Of course it looks bad next to a system with no cost and no waiting.", ja: "費用も待ち時間もない制度の隣に置けば、当然見劣りする。" },
            { beat: 'proof', en: "The British complain about their health service until they are shown an American medical bill, and then the ranking flips.", ja: "英国人は自国の医療に文句を言い続けるが、アメリカの医療費の請求書を見せられた瞬間に順位がひっくり返る。" },
            { beat: 'so', en: "I judge a policy against its realistic replacement, not against an imaginary better version of itself.", ja: "私は政策を、現実の代替物と比べる。想像上の改良版とではない。" },
            { beat: 'sting', en: "It loses to a system that does not exist. It wins against the one we would actually build.", ja: "存在しない制度には負ける。実際に建てる制度には勝つ。" },
        ],
    },
    {
        no: 20, engineId: 'anchor', label: '自分に落とす',
        lines: [
            { beat: 'hook', en: "I should be honest. This one is not abstract for me.", ja: "正直に言うと、これは私にとって抽象的な話ではない。" },
            { beat: 'why', en: "My father did the same job for thirty-four years.", ja: "父は同じ仕事を三十四年やった。" },
            { beat: 'proof', en: "At fifty-six he was told the work no longer existed. He did not need the statistic explained.", ja: "五十六歳で、その仕事はもう無いと告げられた。彼に統計の説明は要らなかった。" },
            { beat: 'so', en: "So when I hear it called an efficiency question, I notice who is never on the receiving end.", ja: "だからそれが効率の問題と呼ばれるとき、誰が受け取る側に居ないかに気づく。" },
            { beat: 'sting', en: "I do not have a neutral opinion about this one, and I would rather admit it than pretend.", ja: "これについて私は中立ではない。取り繕うより、そう認めたい。" },
        ],
    },
];

export const TOTAL_LINES = VERSES.reduce((n, v) => n + v.lines.length, 0);

/** 通し読み用。100行を平らに並べる */
export const ALL_LINES: { no: number; verse: number; beat: Beat; en: string; ja: string }[] =
    VERSES.flatMap((v, vi) => v.lines.map((l, li) => ({
        no: vi * 5 + li + 1,
        verse: v.no,
        beat: l.beat,
        en: l.en,
        ja: l.ja,
    })));

export const VERSE_BY_ENGINE: Record<string, Verse> =
    Object.fromEntries(VERSES.map((v) => [v.engineId, v]));

// ============================================================
// 100日プログラム -- 20ヴァース x 5周
// ============================================================

export interface Lap {
    lap: number;
    days: string;
    title: string;
    paper: string;   // 紙に何を書くか
    mouth: string;   // 口で何をするか
    why: string;
}

export const LAPS: Lap[] = [
    {
        lap: 1, days: 'Day 1-20', title: 'なぞる',
        paper: '今日のヴァース5行を、英文を見ながら3回書き写す',
        mouth: '書きながら小声で読む。意味は追わなくていい',
        why: '手と口に拍を入れる周。意味を考えるより先に、5拍の形をそのまま体に通す',
    },
    {
        lap: 2, days: 'Day 21-40', title: '戻す',
        paper: '日本語だけ見て、5行を英語で書き起こす',
        mouth: '詰まった行に印を付け、その行だけ10回音読',
        why: '書けない行が、まだ暗記できていない行。その行だけを潰す',
    },
    {
        lap: 3, days: 'Day 41-60', title: '撃つ',
        paper: 'そのヴァースが効く的から1題引き、5行を差し替えて書く',
        mouth: '書いたものをそのまま2分で話す',
        why: '暗記した行を別の的で撃つ周。差し替えて成立すれば、その行は使える暗記になっている',
    },
    {
        lap: 4, days: 'Day 61-80', title: '閉じる',
        paper: '何も見ずに5行。そのあと的を2題引いて各1段落',
        mouth: '5行を暗唱してから、的2題に各60秒',
        why: 'ここで暗記を閉じる。5行が何も見ずに出るまで、その日は次に進まない',
    },
    {
        lap: 5, days: 'Day 81-100', title: '話す',
        paper: '書かない。使った行に印だけ付ける',
        mouth: '1日5題。準備1分・本番2分。刺しの行を必ず1本入れる',
        why: '考えて出した行は数えない。勝手に出た行だけが暗記できた行。紙を離す最後の周',
    },
];

/** Day (1-100) -> その日のヴァース番号と周 */
export function planFor(day: number): { lap: Lap; verse: Verse } | null {
    if (day < 1 || day > 100) return null;
    const lapIndex = Math.floor((day - 1) / 20);
    const verseIndex = (day - 1) % 20;
    return { lap: LAPS[lapIndex], verse: VERSES[verseIndex] };
}
