/**
 * TOPIC 100 -- 20の弾で100トピックを撃つ。
 *
 * 【なぜ既存の write/speak では足りないのか】
 * ライトパス(30日)もスピークパス(30日)も「1トピック = 1模範解答」構造。
 * この構造はトピック数が増えると破綻する。100トピックなら100本暗記になり、
 * (1) 覚えきれない (2) 出題が1ミリずれると使えない (3) 網羅した感覚が永久に来ない。
 *
 * 【この教材の構造】
 * 覚える対象を「トピックへの答え」から「どのトピックにも撃てる論拠」に移す。
 *   - ENGINES (20)  = 覚える本体。論拠の型 + 具体データ入りの英文ブロック(50-70語)。
 *   - TOPIC_100     = 的。1トピックにつき「どのエンジンを撃つか」を2つ指定。
 * 20覚えれば100が撃てる。被覆は engines[] から動的に計算する(手動の一覧は持たない)。
 *
 * 【3層の答え】
 * 完璧な模範解答だけを見せると、本番で自分の口から出ない。だから1トピック3層:
 *   exam  = 満点版。減点されない、試験の作法どおりの英語。
 *   human = 生身版。実際に人間が喋る形。言い直し・ヘッジ・一人称の具体。
 *   blade = 一撃。試験官が顔を上げる一行(ジョーク/比喩/自虐)。1本だけ刺す。
 *
 * 【著作権】お題・英文はすべて当サービスのオリジナル。実際の検定試験の設問文は
 * 一切転載していない。domain はテーマ分類のラベルであり出題年度ではない。
 */

// ============================================================
// ドメイン(10) -- 10 x 10 の制覇マップの行になる
// ============================================================

export type DomainId =
    | 'sci' | 'ai' | 'env' | 'edu' | 'work'
    | 'med' | 'soc' | 'pol' | 'cul' | 'life';

export interface Domain {
    id: DomainId;
    label: string;
    en: string;
    hint: string;
}

export const DOMAINS: Domain[] = [
    { id: 'sci', label: '科学・技術', en: 'Science & Technology', hint: '費用対効果と「やっていいのか」の線引きが争点' },
    { id: 'ai', label: 'AI・デジタル', en: 'AI & Digital Life', hint: '道具か脅威かではなく「誰が責任を取るか」で書くと落ちない' },
    { id: 'env', label: '環境・エネルギー', en: 'Environment & Energy', hint: '個人の努力 vs 制度、先進国 vs 途上国の二本立て' },
    { id: 'edu', label: '教育', en: 'Education', hint: '測定・競争・機会の平等。体験談を入れやすい最強の得点源' },
    { id: 'work', label: '仕事・経済', en: 'Work & Economy', hint: '効率と人間の尊厳のトレードオフ。数字を1つ持つと強い' },
    { id: 'med', label: '医療・生命倫理', en: 'Health & Bioethics', hint: '自己決定権 vs 社会の負担。譲歩の型が最も映える領域' },
    { id: 'soc', label: '社会・格差', en: 'Society & Inequality', hint: '「誰が払うのか」を一度言えば議論の主導権が取れる' },
    { id: 'pol', label: '政治・国際', en: 'Politics & the World', hint: '理想論に流れやすい。必ず具体国名を1つ入れて着地させる' },
    { id: 'cul', label: '文化・メディア', en: 'Culture & Media', hint: '好き嫌いで終わらせず、公共の金と時間の使い道に翻訳する' },
    { id: 'life', label: '家族・生き方', en: 'Family & Personal Life', hint: '唯一、自分の話をそのまま撃っていい領域。ジョークが効く' },
];

// ============================================================
// ENGINES (20) -- 覚える本体。これが「弾」
// ============================================================

export interface Engine {
    no: number;
    id: string;
    label: string;      // 日本語での論法名
    en: string;         // 英語での呼び名(見出し用)
    when: string;       // どういうお題で抜くか
    ammo: string;       // 覚える英文ブロック。[X] にトピック固有の語句を差し込む
    ammoJa: string;
    human: string;      // 同じ論法を、口から出る形で言うとどうなるか
    blade: string;      // この論法に乗せられる「刺し」の一行
    swap: string;       // [X] に何を入れるか(差し替えの説明)
}

/**
 * 数字について: 暗記した数字を断定すると、外れたときに一番痛い。
 * ammo の中では意図的に "something like" / "close to" で丸めてある。
 * 丸めるほうが安全で、しかも人間っぽく聞こえる(=生身版と両立する)。
 */
export const ENGINES: Engine[] = [
    {
        no: 1, id: 'irreversible', label: '取り返しがつかない', en: 'Irreversibility',
        when: '死刑・環境・遺伝子操作・AI規制。「間違えたあとに直せるか」を争点にする',
        ammo: "The real question is not whether we might be wrong about [X]. Of course we might. The question is whether we could ever fix it. Close to two hundred people on death row in the United States have been cleared, some of them decades later. A mistake you can correct is a setback; a mistake you cannot correct is something else entirely. Where the damage is permanent, caution is not weakness. It is the only rational position.",
        ammoJa: "本当の争点は「[X]について我々が間違う可能性があるか」ではない。もちろん間違う。争点は「あとで直せるか」だ。米国では死刑囚のうち二百人近くが無実と判明しており、その一部は何十年も経ってからだった。直せる誤りは挫折にすぎないが、直せない誤りは別物だ。損害が永続するなら、慎重さは弱腰ではなく唯一まともな立場だ。",
        human: "I mean, we are going to get some of these calls wrong. That is fine, that is normal. The problem with [X] is you do not get a second go at it.",
        blade: "Every other policy comes with an undo button. This one ships without it.",
        swap: '[X] = 死刑 / 遺伝子編集 / 種の絶滅 / 原子力事故 など「戻せない対象」',
    },
    {
        no: 2, id: 'incentive', label: '誘因が壊れる', en: 'Perverse Incentives',
        when: '補助金・成績評価・報酬・罰則。制度が善意で作られて逆に働く話',
        ammo: "My worry about [X] is not the intention behind it. It is what people will do once the rules are in place. Reward hospitals for survival rates and they start turning away the sickest patients. Pay teachers for test scores and they teach the test. People do not follow the goal you announced; they follow the number you decided to count.",
        ammoJa: "[X]について私が心配なのは意図ではない。ルールができたあと人が何をするかだ。生存率で病院に報酬を出せば、最も重症の患者を断り始める。テストの点で教員に報酬を出せば、テストのための授業をする。人は掲げられた目標ではなく、数えると決められた数字に従う。",
        human: "Honestly, the idea is fine. It is what happens after. People are really good at doing exactly what you pay them for, and nothing else.",
        blade: "Tell people what you are measuring and they will get very good at that one thing, and only that thing.",
        swap: '[X] = 成果報酬 / 補助金 / 罰金 / ノルマ など「制度」',
    },
    {
        no: 3, id: 'who-pays', label: '誰が払うのか', en: 'Who Actually Pays',
        when: '増税・自動化・環境規制・学費。総論賛成の議論を一段深くする万能の弾',
        ammo: "Whenever we talk about [X], we talk about the average person, and the average person does not exist. The cost never lands evenly. A fuel tax is pocket change to someone in the city with a train station; it is a serious problem for someone who drives forty minutes to work because there is no train. If a policy is right, it is still right after you ask who absorbs the damage. That question just tells you what you have to pay for alongside it.",
        ammoJa: "[X]を語るとき我々は平均的な人を語るが、平均的な人は存在しない。負担は決して均等に落ちない。燃料税は駅のある都市の人間には小銭だが、電車がなく四十分運転して通勤する人間には深刻な問題だ。正しい政策は「誰が損を吸収するのか」と問うたあとでも正しい。その問いは、政策と一緒に何を用意すべきかを教えてくれるだけだ。",
        human: "Sure, on average it works. But nobody actually lives an average life. Someone always eats the cost, and it is usually not the people writing the policy.",
        blade: "Policies are written by people who will never have to live under them.",
        swap: '[X] = 増税 / 規制 / 自動化 / 値上げ など「痛みを伴う変化」',
    },
    {
        no: 4, id: 'data-vs-feel', label: '数字は下がったが体感は上がる', en: 'Data vs Perception',
        when: '犯罪・報道・治安・若者論。「みんなそう感じている」を静かに崩す',
        ammo: "There is a gap here between the statistics and the feeling, and both are real. Crime has fallen across most developed countries for thirty years, yet surveys show people are convinced it is rising. That is not stupidity. It is what happens when every incident anywhere reaches your phone within an hour. So when we design policy around [X], we should be honest about whether we are solving the problem or solving the anxiety.",
        ammoJa: "ここには統計と体感のずれがあり、そのどちらも本物だ。犯罪は先進国の大半で三十年間減り続けているのに、調査では人々は増えていると確信している。それは愚かさではない。どこで起きた事件も一時間以内に手元の端末に届く世界では、そうなる。だから[X]を巡る政策を作るときは、問題を解いているのか不安を解いているのかを正直に見るべきだ。",
        human: "The numbers say one thing and everyone's gut says the opposite. And you cannot just tell people their gut is wrong, that never works.",
        blade: "We are not living through more disasters. We are just watching all of them.",
        swap: '[X] = 治安 / 若者の質 / 事故 / 移民 など「体感で語られがちな対象」',
    },
    {
        no: 5, id: 'deferred', label: '代償を先送りしている', en: 'Deferred Cost',
        when: '年金・環境・国債・老朽インフラ。「今安いのは誰かが後で払うから」',
        ammo: "What looks cheap about [X] today is only cheap because the bill has been posted to someone who cannot object yet. Every country that delayed maintaining its bridges and pipes discovered the same thing: the repair does not get cheaper while you wait, it gets more expensive and more urgent at the same time. We are not saving money. We are borrowing it from people who do not get a vote.",
        ammoJa: "[X]が今安く見えるのは、請求書がまだ文句を言えない相手に回されているからにすぎない。橋や配管の維持を先送りした国はどこも同じことを発見した。待っている間に修繕費は安くならず、高くなると同時に緊急性も増す。我々は金を節約しているのではない。投票権のない人々から借りているのだ。",
        human: "It is not that it is cheap. It is that we have decided someone later is paying for it, and they are not in the room.",
        blade: "It is not a saving. It is a loan from people who cannot vote yet.",
        swap: '[X] = 年金 / インフラ / 排出 / 教育投資の削減',
    },
    {
        no: 6, id: 'scale', label: '規模が質を変える', en: 'Scale Changes Kind',
        when: 'SNS・監視・都市・グローバル化。「昔からあった」への最強の返し',
        ammo: "People say [X] has always existed, and that is true, but scale changes what a thing actually is. Gossip in a village of two hundred people and the same rumour reaching two million strangers overnight are not the same activity with different numbers attached. They behave differently. Past a certain size, a difference in quantity turns into a difference in kind, and the old rules stop applying.",
        ammoJa: "[X]は昔からあったと言われる。それは事実だが、規模はそのものの正体を変える。二百人の村の噂話と、同じ噂が一晩で二百万人の他人に届くことは、数字が違うだけの同じ行為ではない。振る舞いが違う。ある大きさを超えると、量の差は質の差に変わり、古いルールは効かなくなる。",
        human: "Yeah, it has always been around. But there is a point where more of something just turns it into a different thing.",
        blade: "A campfire and a forest fire are the same chemistry. Nobody argues they are the same problem.",
        swap: '[X] = SNS / 監視 / 移民 / 誹謗中傷 / 情報流通',
    },
    {
        no: 7, id: 'goodhart', label: '測ると壊れる', en: 'When the Measure Becomes the Target',
        when: '試験・評価・ランキング・KPI。教育と仕事のお題で必ず一度は撃てる',
        ammo: "The moment a measurement becomes the goal, it stops measuring anything useful. Tests were meant to show whether children had learned; now schools are ranked by them, so the sensible thing for a school to do is to train children to pass tests. The number goes up and the thing it was supposed to represent quietly goes down. That is the trap I would want [X] to avoid.",
        ammoJa: "測定が目標になった瞬間、それは何も有益なことを測らなくなる。テストは子どもが学んだかを示すためのものだったが、今や学校がそれで序列化されるので、学校にとって合理的なのはテストに受かる訓練をさせることだ。数字は上がり、それが表すはずだったものは静かに下がる。[X]に避けてほしいのはその罠だ。",
        human: "The second you start scoring something, people optimize for the score. And then the score does not mean anything anymore.",
        blade: "We built a thermometer, then started heating it directly and calling it summer.",
        swap: '[X] = 学力テスト / 人事評価 / 大学ランキング / 医療統計',
    },
    {
        no: 8, id: 'tool-vs-rule', label: '道具か、制度か', en: 'The Tool Is Not the Decision',
        when: 'AI・技術系ほぼ全部。「技術が悪い」論を一段上に引き上げる',
        ammo: "I do not think [X] itself is good or bad, and I am slightly suspicious of anyone who says it is. A tool amplifies whatever the people holding it already wanted. The same technology can shorten a working day or make sure you are never off the clock, and nothing inside the technology decides which one happens. That decision is made in offices and parliaments, and blaming the machine is a convenient way of not naming who made it.",
        ammoJa: "私は[X]自体が善だとも悪だとも思わないし、そう断言する人にはやや懐疑的だ。道具は、持つ人がすでに望んでいたことを増幅する。同じ技術が労働時間を短くもするし、一日中仕事から解放されない状態も作る。どちらになるかを技術の内部が決めているわけではない。その決定はオフィスと議会で下されており、機械のせいにするのは誰が決めたかを言わずに済ませる便利な方法だ。",
        human: "The tech is not the villain here. Somebody decided how to use it, and that somebody has a name and a job title.",
        blade: "Blaming the machine is a very convenient way of not naming the person who switched it on.",
        swap: '[X] = AI / SNS / 監視技術 / 遺伝子編集',
    },
    {
        no: 9, id: 'no-opposition', label: '誰も反対しないから止まらない', en: 'Nobody Is Against It',
        when: '監視・便利さ・巨大産業・慣習。「反対の不在」を論点化する',
        ammo: "The dangerous policies are not the ones people argue about. Those get examined. The dangerous ones are the ones everybody nods along to, because [X] arrives one small convenient step at a time and each single step sounds reasonable. Cameras go up to catch car thieves. Nobody objects, because nobody likes car thieves. Ten years later the network exists and no one ever voted for the network, only for the first camera.",
        ammoJa: "危険な政策は人々が議論するものではない。それは吟味される。危険なのは全員が頷くものだ。[X]は小さく便利な一歩ずつやってきて、一歩ごとにはもっともらしく聞こえるからだ。車泥棒を捕まえるためにカメラが設置される。誰も反対しない、車泥棒が好きな人はいないからだ。十年後には網が完成しているが、誰も網に投票したことはない。最初の一台に投票しただけだ。",
        human: "Nobody ever agreed to the whole thing. People agreed to the first small bit, and then it just kept going.",
        blade: "No one voted for the surveillance network. We voted for one camera, in one car park, in 2009.",
        swap: '[X] = 監視 / データ収集 / 慣習 / 規制緩和',
    },
    {
        no: 10, id: 'transition', label: '移行期に人が潰れる', en: 'The Transition Costs Are Real',
        when: '自動化・脱炭素・産業構造転換。「長期的には良い」への現実的な留保',
        ammo: "I agree with where [X] ends up. My concern is the twenty years in between, because that is where actual people live. When the mines closed in northern England, the long-term economic case was correct and the towns still have not recovered forty years later. A generation absorbed the entire cost of a change that benefited everyone else. Being right about the destination does not excuse you from planning the journey.",
        ammoJa: "[X]の行き着く先には賛成だ。私が懸念するのは間の二十年で、実際の人間はそこに住んでいる。イングランド北部で炭鉱が閉鎖されたとき、長期的な経済の理屈は正しかったが、その町々は四十年経った今も回復していない。一世代が、他の全員に利益をもたらす変化の費用を丸ごと吸収した。目的地について正しいことは、道中を計画しない言い訳にはならない。",
        human: "Long term, sure, it works out. But people do not live in the long term. They live in the twenty years where it does not.",
        blade: "In the long run we are all fine. In the short run, someone loses a town.",
        swap: '[X] = 自動化 / 脱炭素 / 産業移転 / 定年延長',
    },
    {
        no: 11, id: 'precedent', label: '他所ではもう起きている', en: 'It Has Already Been Tried',
        when: '全領域。仮説論争を実例論争に引き下ろす。最も安全に点が取れる弾',
        ammo: "We do not actually have to speculate about [X], which is what makes this debate frustrating. Someone has already run the experiment. When New Zealand went ahead with it, the results were mixed rather than catastrophic, which is usually how these things go. So the honest question is not whether it could work in theory, but why we keep discussing it as though nobody has ever tried.",
        ammoJa: "[X]について我々は本来推測する必要がない。そこがこの議論の苛立たしいところだ。すでに誰かが実験を走らせている。ニュージーランドが実行したとき、結果は破滅的というより「まちまち」だった。この手のことはたいていそうなる。だから正直な問いは、理論上うまくいくかではなく、なぜ誰も試したことがないかのように議論し続けるのか、だ。",
        human: "We do not have to guess. Someone already did this. It went okay, not amazing, not a disaster. That is usually the answer.",
        blade: "We keep debating it as a thought experiment. It stopped being one about fifteen years ago.",
        swap: '[X] = 週4日勤務 / ベーシックインカム / 薬物非犯罪化 など。国名は差し替える',
    },
    {
        no: 12, id: 'dependency', label: '使えるうちに使えなくなる', en: 'Dependency and Atrophy',
        when: 'AI・翻訳・GPS・便利さ。技術批判をノスタルジーに落とさない型',
        ammo: "The risk with [X] is not that it fails. It is that it works so well that we lose the ability to do without it. Studies on drivers who rely on satellite navigation suggest they build weaker mental maps of their own cities. Nothing was taken from them; they simply stopped practising. My worry is not that the tool is bad, but that a skill you never use is functionally a skill you no longer have.",
        ammoJa: "[X]のリスクは失敗することではない。あまりにうまく機能するので、それなしで済ませる能力を失うことだ。カーナビに頼る運転手の研究では、自分の街の地図が頭の中で弱くなることが示唆されている。何かを奪われたわけではなく、単に練習をやめただけだ。私の懸念は道具が悪いことではなく、使わない技能は事実上もう持っていない技能だ、ということだ。",
        human: "It is not that it breaks. It is that it works, and then one day you realize you cannot do it yourself anymore.",
        blade: "Nobody took the skill away from us. We just stopped showing up for practice.",
        swap: '[X] = AI / 翻訳ソフト / 電卓 / カーナビ / 検索',
    },
    {
        no: 13, id: 'trust', label: '信頼はインフラである', en: 'Trust Is Infrastructure',
        when: '報道・政治・企業・医療・ワクチン。制度論を人間の話に戻す',
        ammo: "Whatever we decide about [X], the thing we cannot afford to spend is public trust, because it is the one resource that takes decades to build and an afternoon to lose. A vaccination programme does not fail on the science; it fails when people stop believing the people announcing it. Trust behaves like a bridge. Nobody thanks you for maintaining it, and everybody notices the moment it is gone.",
        ammoJa: "[X]について何を決めるにせよ、使い切ってはいけないのは社会の信頼だ。それは築くのに数十年、失うのに一日の午後しかかからない唯一の資源だからだ。ワクチン計画は科学で失敗するのではない。発表する側の人間を信じなくなったときに失敗する。信頼は橋のように振る舞う。維持しても誰も礼を言わないが、なくなった瞬間に全員が気づく。",
        human: "You can be completely right and still lose, if people have stopped believing you. That part is not a science problem.",
        blade: "Trust is like plumbing. Nobody thanks you for it until the day it fails.",
        swap: '[X] = ワクチン / 報道 / 選挙制度 / 企業の情報開示',
    },
    {
        no: 14, id: 'principle', label: '例外を認めると原則が消える', en: 'The Exception Eats the Rule',
        when: '拷問・テロ・言論・プライバシー。極端な仮定に引きずられない型',
        ammo: "The argument for making an exception in [X] always uses the worst imaginable case, and that is exactly why I resist it. Rules are not written for the obvious villain; they are written for the ambiguous Tuesday when nobody is sure. Once the exception exists, the definition of who qualifies is decided later, by people we have not met, under pressure we cannot predict. I would rather accept an imperfect rule than write a blank one.",
        ammoJa: "[X]で例外を認めよという議論は、常に想像しうる最悪の事例を使う。だからこそ私は抵抗する。ルールは分かりやすい悪人のために書かれるのではなく、誰も確信が持てない曖昧な火曜日のために書かれる。いったん例外ができれば、誰が該当するかの定義はあとから、我々の知らない人間が、予測できない圧力の下で決める。私は白紙の規則より不完全な規則を選ぶ。",
        human: "The example is always the worst guy you can imagine. But the rule does not get used on him. It gets used on the guy nobody is sure about.",
        blade: "Everyone agrees on the monster. The rule gets written for everyone standing near him.",
        swap: '[X] = テロ対策 / 検閲 / 監視 / 緊急事態条項',
    },
    {
        no: 15, id: 'status-quo', label: '何もしないことも選択である', en: 'Doing Nothing Is Also a Policy',
        when: '「時期尚早」「様子を見よう」への返し。守りの議論を攻めに変える',
        ammo: "We talk about [X] as though the choice is between acting and waiting, but waiting is not neutral. It is a decision to let the current arrangement continue, with all of its costs, and simply not put anyone's name on that decision. If we would not vote today to build the system we already have, then keeping it is not caution. It is a preference that we are declining to defend out loud.",
        ammoJa: "我々は[X]を「行動するか待つか」の選択のように語るが、待つことは中立ではない。それは現状をそのコストごと続けさせる決定であり、ただその決定に誰の名前も付けないだけだ。今ある制度を今日ゼロから作ろうという投票をしないのなら、それを維持することは慎重さではない。声に出して擁護するのを避けている選好だ。",
        human: "Not doing anything is not staying neutral. It is just picking the current thing without having to defend it.",
        blade: "If we would not build it today, then keeping it is not caution. It is a choice nobody wants to sign.",
        swap: '[X] = 制度改革 / 死刑 / 定年 / 選挙制度',
    },
    {
        no: 16, id: 'definition', label: '定義が争点', en: 'We Are Arguing About the Word',
        when: '「成功とは」「幸福とは」「必要とは」型。抽象的なお題を掴む',
        ammo: "Before I answer, I would want to know what we mean by [X], because most of this disagreement lives inside that word. If success means income, the answer is one thing. If it means being able to stop working at sixty without fear, it is another, and half the people arguing are answering different questions without noticing. Define the word and the debate usually shrinks to something manageable.",
        ammoJa: "答える前に[X]で何を指すのかを知りたい。この意見の相違の大半はその語の中に住んでいるからだ。成功が収入を意味するなら答えは一つ。六十歳で不安なく働くのをやめられることを意味するなら別の答えになる。議論している人の半分は、気づかないまま別々の問いに答えている。語を定義すれば、議論はたいてい扱えるサイズに縮む。",
        human: "Depends what we mean by that word, honestly. Half the argument is people answering two different questions.",
        blade: "We have been arguing for ten minutes about a word neither of us has defined.",
        swap: '[X] = success / happiness / necessary / fair / freedom',
    },
    {
        no: 17, id: 'both-true', label: '両方とも本当', en: 'Both Can Be True',
        when: '譲歩の上位版。反論を潰さずに自分の側へ着地させる。Q&Aで最も使う',
        ammo: "I think both things are true at the same time, and pretending otherwise is what makes this argument go in circles. [X] genuinely does what its supporters claim, and it genuinely causes the harm its critics describe. The useful question is not which side is lying. It is which of those two effects we are better equipped to deal with, and on that, I come down on one side fairly clearly.",
        ammoJa: "私は両方が同時に真だと思うし、そうでないふりをするからこの議論は堂々巡りになる。[X]は支持者が主張する働きを実際にするし、批判者が述べる害も実際に生む。有用な問いはどちらが嘘をついているかではない。その二つの効果のうち、我々はどちらに対処する準備ができているかであり、そこについて私はかなりはっきり一方に立つ。",
        human: "Both of those are true, though. It is not one or the other. The question is just which problem we are better at handling.",
        blade: "We are not disagreeing about the facts. We are disagreeing about which problem we would rather have.",
        swap: '[X] = 議論の対象そのもの。ほぼ全トピックで使える',
    },
    {
        no: 18, id: 'freedom-cost', label: '自由には管理費がかかる', en: 'Freedom Has an Admin Fee',
        when: '選択肢・自己決定・規制緩和。「自由=善」を一段掘る',
        ammo: "More freedom in [X] sounds like an obvious good, and it usually is, but every choice we hand back to the individual also hands them the work of choosing. Countries that made people opt in to a pension found that many simply never got round to it, and were poor at seventy for administrative reasons rather than moral ones. Real freedom is not just being allowed to choose. It is having the time and information to choose well.",
        ammoJa: "[X]における自由の拡大は明らかな善に聞こえるし、たいていはそうだ。しかし個人に返される選択はどれも、選ぶという労働も一緒に返している。年金を任意加入にした国では、多くの人が単に手続きをしないままで、道徳的理由ではなく事務的理由で七十歳で貧しくなった。本当の自由は選ぶことを許されることではない。うまく選ぶための時間と情報を持っていることだ。",
        human: "Giving people the choice sounds great, but you are also giving them the homework. Not everyone has time to do the homework.",
        blade: "We gave everyone the freedom to choose, and quietly also gave them the paperwork.",
        swap: '[X] = 年金 / 保険 / 教育選択 / 臓器提供 / 規制緩和',
    },
    {
        no: 19, id: 'compare-to-what', label: '何と比べているのか', en: 'Compared to What',
        when: '「〜は不十分だ」型への返し。理想ではなく代替案と比べさせる',
        ammo: "The case against [X] compares it to a perfect alternative that is not on the table. Of course it looks bad next to a system with no waiting times and no cost. Compared to what we would actually get instead, the picture changes considerably. I would judge any policy against its realistic replacement, not against an imagined version of itself that has all of the benefits and none of the trade-offs.",
        ammoJa: "[X]への批判は、選択肢に存在しない完璧な代替案と比較している。待ち時間も費用もない制度と並べれば当然見劣りする。実際に代わりに手に入るものと比べれば、絵はかなり変わる。私はどんな政策も、利点だけあって代償のない想像上の自分自身とではなく、現実的な代替物と比べて判断する。",
        human: "Compared to what, though? Not compared to perfect. Compared to what we would actually end up with instead.",
        blade: "It loses to a system that does not exist. It usually wins against the one we would actually build.",
        swap: '[X] = 公的医療 / 公教育 / 国連 / 現行制度全般',
    },
    {
        no: 20, id: 'anchor', label: '自分に落とす', en: 'The Personal Anchor',
        when: '締めと導入。抽象論に体温を入れる。2次面接で最も差がつく一撃',
        ammo: "I will be honest, my view on [X] is not purely theoretical. My father worked the same job for thirty-four years and was told at fifty-six that the work no longer existed. He did not need a statistic explained to him. So when I hear this discussed as an efficiency question, I do notice that the people describing it as efficiency are rarely the ones it happens to. That is not an argument on its own, but it is why I start where I start.",
        ammoJa: "正直に言うと、[X]についての私の見方は純粋に理論的なものではない。父は三十四年間同じ仕事をし、五十六歳で「その仕事はもう存在しない」と告げられた。彼に統計の説明は不要だった。だからこれが効率の問題として語られるのを聞くと、それを効率と呼ぶ人はそれが起きる側にいることが少ない、と気づく。それ自体は論証ではないが、私がここから出発する理由ではある。",
        human: "I should say, this one is not abstract for me. My dad got told at fifty-six that his job did not exist anymore. So I am not neutral here, and I would rather say that up front.",
        blade: "I do not have a neutral opinion about this one, and I would rather admit that than pretend.",
        swap: '[X] = 自動化 / 教育 / 介護 / 移民 など、自分の実話を1つ用意して固定する',
    },
];

// ============================================================
// TOPIC 100 -- 的。10ドメイン x 10題
// ============================================================

export interface Topic {
    no: number;
    domain: DomainId;
    en: string;
    ja: string;
    /** このお題で抜くエンジン。原則2つ(1本目=主砲、2本目=Q&A用の受け) */
    engines: string[];
}

export const TOPIC_100: Topic[] = [
    // --- 科学・技術 ---
    { no: 1, domain: 'sci', en: 'Is space exploration worth its enormous cost?', ja: '宇宙探査は莫大な費用に見合うか', engines: ['compare-to-what', 'deferred'] },
    { no: 2, domain: 'sci', en: 'Should governments fund research with no obvious application?', ja: '実用の当てのない研究に国は金を出すべきか', engines: ['deferred', 'goodhart'] },
    { no: 3, domain: 'sci', en: 'Do the risks of genetic engineering outweigh its benefits?', ja: '遺伝子工学のリスクは利益を上回るか', engines: ['irreversible', 'both-true'] },
    { no: 4, domain: 'sci', en: 'Should human cloning ever be permitted?', ja: 'ヒトのクローンを認めてよいか', engines: ['principle', 'irreversible'] },
    { no: 5, domain: 'sci', en: 'Is life-extension research a good use of money?', ja: '寿命延長の研究は金の使い道として妥当か', engines: ['who-pays', 'definition'] },
    { no: 6, domain: 'sci', en: 'Should animal experimentation be banned?', ja: '動物実験は禁止すべきか', engines: ['compare-to-what', 'both-true'] },
    { no: 7, domain: 'sci', en: 'Will humans ever live permanently on another planet?', ja: '人類は他の惑星に永住できるか', engines: ['transition', 'compare-to-what'] },
    { no: 8, domain: 'sci', en: 'Should there be limits on what science may investigate?', ja: '科学が調べてよい範囲に制限を設けるべきか', engines: ['principle', 'tool-vs-rule'] },
    { no: 9, domain: 'sci', en: 'Is nuclear fusion worth decades of investment?', ja: '核融合は数十年の投資に値するか', engines: ['deferred', 'compare-to-what'] },
    { no: 10, domain: 'sci', en: 'Do scientists have a duty to speak out on politics?', ja: '科学者は政治的発言をする義務があるか', engines: ['trust', 'both-true'] },

    // --- AI・デジタル ---
    { no: 11, domain: 'ai', en: 'Will AI do more harm than good to society?', ja: 'AIは社会に害のほうを多くもたらすか', engines: ['tool-vs-rule', 'transition'] },
    { no: 12, domain: 'ai', en: 'Should AI-generated work be protected by copyright?', ja: 'AI生成物に著作権を認めるべきか', engines: ['definition', 'incentive'] },
    { no: 13, domain: 'ai', en: 'Should companies be required to disclose their use of AI?', ja: '企業はAIの使用を開示すべきか', engines: ['trust', 'no-opposition'] },
    { no: 14, domain: 'ai', en: 'Will automation create more jobs than it destroys?', ja: '自動化は奪う以上の仕事を生むか', engines: ['transition', 'who-pays'] },
    { no: 15, domain: 'ai', en: 'Should governments regulate what is posted on social media?', ja: 'SNSの投稿を政府が規制すべきか', engines: ['principle', 'scale'] },
    { no: 16, domain: 'ai', en: 'Is online anonymity worth protecting?', ja: 'ネット上の匿名性は守る価値があるか', engines: ['both-true', 'principle'] },
    { no: 17, domain: 'ai', en: 'Should young children be kept off social media by law?', ja: '一定年齢未満のSNS利用を法で禁じるべきか', engines: ['scale', 'freedom-cost'] },
    { no: 18, domain: 'ai', en: 'Has the internet made people better or worse informed?', ja: 'ネットは人をよく知らせたか、無知にしたか', engines: ['data-vs-feel', 'scale'] },
    { no: 19, domain: 'ai', en: 'Should facial recognition be used in public spaces?', ja: '公共空間で顔認証を使ってよいか', engines: ['no-opposition', 'principle'] },
    { no: 20, domain: 'ai', en: 'Can a machine ever be held responsible for its decisions?', ja: '機械が自らの判断に責任を負うことはありうるか', engines: ['tool-vs-rule', 'definition'] },

    // --- 環境・エネルギー ---
    { no: 21, domain: 'env', en: 'Can technology alone solve climate change?', ja: '技術だけで気候変動を解決できるか', engines: ['tool-vs-rule', 'both-true'] },
    { no: 22, domain: 'env', en: 'Should developed nations pay for climate damage abroad?', ja: '先進国は他国の気候被害を負担すべきか', engines: ['who-pays', 'deferred'] },
    { no: 23, domain: 'env', en: 'Is nuclear power necessary for a clean energy future?', ja: '脱炭素に原子力は必要か', engines: ['compare-to-what', 'irreversible'] },
    { no: 24, domain: 'env', en: 'Should meat consumption be reduced through taxation?', ja: '課税で肉の消費を減らすべきか', engines: ['who-pays', 'incentive'] },
    { no: 25, domain: 'env', en: 'Are individual efforts meaningful against climate change?', ja: '個人の努力は気候変動に意味があるか', engines: ['scale', 'status-quo'] },
    { no: 26, domain: 'env', en: 'Should single-use plastics be banned outright?', ja: '使い捨てプラスチックを全面禁止すべきか', engines: ['incentive', 'compare-to-what'] },
    { no: 27, domain: 'env', en: 'Is economic growth compatible with protecting the planet?', ja: '経済成長と環境保護は両立するか', engines: ['definition', 'both-true'] },
    { no: 28, domain: 'env', en: 'Should saving endangered species be a national priority?', ja: '絶滅危惧種の保護を国の優先課題にすべきか', engines: ['irreversible', 'who-pays'] },
    { no: 29, domain: 'env', en: 'Should city centres be closed to private cars?', ja: '都心部から自家用車を締め出すべきか', engines: ['who-pays', 'precedent'] },
    { no: 30, domain: 'env', en: 'Is it fair to limit developing nations industrial growth?', ja: '途上国の工業化を制限するのは公正か', engines: ['who-pays', 'deferred'] },

    // --- 教育 ---
    { no: 31, domain: 'edu', en: 'Is a university education necessary for success?', ja: '成功に大学教育は必要か', engines: ['definition', 'who-pays'] },
    { no: 32, domain: 'edu', en: 'Should standardized testing be abolished in schools?', ja: '学校から標準テストをなくすべきか', engines: ['goodhart', 'compare-to-what'] },
    { no: 33, domain: 'edu', en: 'Should higher education be free for everyone?', ja: '高等教育は全員無償にすべきか', engines: ['who-pays', 'precedent'] },
    { no: 34, domain: 'edu', en: 'Do school uniforms benefit students?', ja: '制服は生徒のためになるか', engines: ['both-true', 'anchor'] },
    { no: 35, domain: 'edu', en: 'Should children start a second language as early as possible?', ja: '第二言語は早く始めるべきか', engines: ['dependency', 'compare-to-what'] },
    { no: 36, domain: 'edu', en: 'Is online learning as effective as classroom learning?', ja: 'オンライン学習は対面と同等に有効か', engines: ['definition', 'who-pays'] },
    { no: 37, domain: 'edu', en: 'Should teachers pay depend on their students results?', ja: '教員の給与を生徒の成績に連動させるべきか', engines: ['incentive', 'goodhart'] },
    { no: 38, domain: 'edu', en: 'Should schools teach practical skills instead of academic subjects?', ja: '学校は学問より実用技能を教えるべきか', engines: ['both-true', 'definition'] },
    { no: 39, domain: 'edu', en: 'Is competition in education harmful to children?', ja: '教育における競争は子どもに有害か', engines: ['goodhart', 'anchor'] },
    { no: 40, domain: 'edu', en: 'Should students choose their own curriculum?', ja: '生徒は自分でカリキュラムを選ぶべきか', engines: ['freedom-cost', 'both-true'] },

    // --- 仕事・経済 ---
    { no: 41, domain: 'work', en: 'Should a four-day working week become standard?', ja: '週4日勤務を標準にすべきか', engines: ['precedent', 'who-pays'] },
    { no: 42, domain: 'work', en: 'Is remote work better for society as a whole?', ja: 'リモートワークは社会全体にとって良いか', engines: ['who-pays', 'both-true'] },
    { no: 43, domain: 'work', en: 'Should there be a maximum wage as well as a minimum?', ja: '最低賃金だけでなく上限賃金も設けるべきか', engines: ['incentive', 'definition'] },
    { no: 44, domain: 'work', en: 'Is a universal basic income realistic?', ja: 'ベーシックインカムは現実的か', engines: ['precedent', 'incentive'] },
    { no: 45, domain: 'work', en: 'Should companies be required to promote more women to leadership?', ja: '企業に女性管理職の登用を義務づけるべきか', engines: ['goodhart', 'both-true'] },
    { no: 46, domain: 'work', en: 'Is lifetime employment better than changing jobs often?', ja: '終身雇用は転職より良いか', engines: ['transition', 'anchor'] },
    { no: 47, domain: 'work', en: 'Should the retirement age be raised?', ja: '定年は引き上げるべきか', engines: ['who-pays', 'status-quo'] },
    { no: 48, domain: 'work', en: 'Do large corporations have too much power?', ja: '巨大企業は力を持ちすぎているか', engines: ['scale', 'no-opposition'] },
    { no: 49, domain: 'work', en: 'Is the gig economy good for workers?', ja: 'ギグエコノミーは働き手にとって良いか', engines: ['freedom-cost', 'who-pays'] },
    { no: 50, domain: 'work', en: 'Should governments protect declining domestic industries?', ja: '衰退産業を国が保護すべきか', engines: ['transition', 'compare-to-what'] },

    // --- 医療・生命倫理 ---
    { no: 51, domain: 'med', en: 'Should euthanasia be legalized?', ja: '安楽死を合法化すべきか', engines: ['irreversible', 'principle'] },
    { no: 52, domain: 'med', en: 'Should healthcare be entirely free at the point of use?', ja: '医療は窓口無料にすべきか', engines: ['compare-to-what', 'who-pays'] },
    { no: 53, domain: 'med', en: 'Should organ donation be opt-out rather than opt-in?', ja: '臓器提供は「拒否しない限り同意」にすべきか', engines: ['freedom-cost', 'precedent'] },
    { no: 54, domain: 'med', en: 'Should vaccination be made compulsory?', ja: 'ワクチン接種を義務化すべきか', engines: ['trust', 'principle'] },
    { no: 55, domain: 'med', en: 'Should unhealthy lifestyles mean higher medical costs?', ja: '不健康な生活習慣には医療費を高くすべきか', engines: ['who-pays', 'definition'] },
    { no: 56, domain: 'med', en: 'Should parents be allowed to select their childrens traits?', ja: '親は子の遺伝的特徴を選んでよいか', engines: ['irreversible', 'no-opposition'] },
    { no: 57, domain: 'med', en: 'Is mental health taken seriously enough by society?', ja: '社会はメンタルヘルスを十分に重視しているか', engines: ['data-vs-feel', 'anchor'] },
    { no: 58, domain: 'med', en: 'Should medical decisions ever be left to AI?', ja: '医療判断をAIに任せてよいか', engines: ['tool-vs-rule', 'trust'] },
    { no: 59, domain: 'med', en: 'Should drug use be treated as illness rather than crime?', ja: '薬物使用は犯罪でなく病として扱うべきか', engines: ['precedent', 'compare-to-what'] },
    { no: 60, domain: 'med', en: 'Do pharmaceutical companies put profit before patients?', ja: '製薬企業は患者より利益を優先しているか', engines: ['incentive', 'both-true'] },

    // --- 社会・格差 ---
    { no: 61, domain: 'soc', en: 'Is inequality the most serious problem facing society?', ja: '格差は社会最大の問題か', engines: ['definition', 'who-pays'] },
    { no: 62, domain: 'soc', en: 'Should the wealthy be taxed far more heavily?', ja: '富裕層にもっと重く課税すべきか', engines: ['who-pays', 'incentive'] },
    { no: 63, domain: 'soc', en: 'Can poverty ever be eliminated?', ja: '貧困は根絶できるか', engines: ['definition', 'precedent'] },
    { no: 64, domain: 'soc', en: 'Should there be a limit on how much can be inherited?', ja: '相続できる額に上限を設けるべきか', engines: ['who-pays', 'principle'] },
    { no: 65, domain: 'soc', en: 'Is urban life making people less happy?', ja: '都市生活は人を不幸にしているか', engines: ['data-vs-feel', 'definition'] },
    { no: 66, domain: 'soc', en: 'Should housing be guaranteed by the government?', ja: '住居は国が保障すべきか', engines: ['compare-to-what', 'precedent'] },
    { no: 67, domain: 'soc', en: 'Should volunteering be a duty of every citizen?', ja: 'ボランティアは市民の義務とすべきか', engines: ['freedom-cost', 'incentive'] },
    { no: 68, domain: 'soc', en: 'Has society become too individualistic?', ja: '社会は個人主義に傾きすぎたか', engines: ['scale', 'anchor'] },
    { no: 69, domain: 'soc', en: 'Are countries doing enough for their aging populations?', ja: '各国は高齢化に十分対応しているか', engines: ['deferred', 'who-pays'] },
    { no: 70, domain: 'soc', en: 'Is homelessness a failure of the individual or of society?', ja: 'ホームレス問題は個人の失敗か社会の失敗か', engines: ['who-pays', 'both-true'] },

    // --- 政治・国際 ---
    { no: 71, domain: 'pol', en: 'Should the death penalty be abolished?', ja: '死刑は廃止すべきか', engines: ['irreversible', 'status-quo'] },
    { no: 72, domain: 'pol', en: 'Should developed nations accept more immigrants?', ja: '先進国はより多くの移民を受け入れるべきか', engines: ['data-vs-feel', 'who-pays'] },
    { no: 73, domain: 'pol', en: 'Should voting be compulsory?', ja: '投票を義務化すべきか', engines: ['precedent', 'freedom-cost'] },
    { no: 74, domain: 'pol', en: 'Should the voting age be lowered to sixteen?', ja: '選挙権年齢を16歳に下げるべきか', engines: ['definition', 'status-quo'] },
    { no: 75, domain: 'pol', en: 'Is international aid actually effective?', ja: '国際援助は実際に有効か', engines: ['goodhart', 'compare-to-what'] },
    { no: 76, domain: 'pol', en: 'Can lasting world peace ever be achieved?', ja: '恒久的な世界平和は実現可能か', engines: ['definition', 'both-true'] },
    { no: 77, domain: 'pol', en: 'Should nations cut their military spending?', ja: '各国は軍事費を削減すべきか', engines: ['compare-to-what', 'trust'] },
    { no: 78, domain: 'pol', en: 'Do international organizations still hold real power?', ja: '国際機関に今も実権はあるか', engines: ['compare-to-what', 'trust'] },
    { no: 79, domain: 'pol', en: 'Should governments ever negotiate with terrorists?', ja: '政府はテロリストと交渉してよいか', engines: ['principle', 'both-true'] },
    { no: 80, domain: 'pol', en: 'Is national sovereignty outdated in a connected world?', ja: 'つながった世界で国家主権は時代遅れか', engines: ['scale', 'definition'] },

    // --- 文化・メディア ---
    { no: 81, domain: 'cul', en: 'Should governments fund the arts?', ja: '国は芸術に助成すべきか', engines: ['compare-to-what', 'who-pays'] },
    { no: 82, domain: 'cul', en: 'Is hosting the Olympics worth it?', ja: '五輪開催は割に合うか', engines: ['deferred', 'precedent'] },
    { no: 83, domain: 'cul', en: 'Are professional athletes paid too much?', ja: 'プロ選手の報酬は高すぎるか', engines: ['definition', 'incentive'] },
    { no: 84, domain: 'cul', en: 'Is traditional culture worth preserving at any cost?', ja: '伝統文化はどんな代償を払っても守るべきか', engines: ['irreversible', 'who-pays'] },
    { no: 85, domain: 'cul', en: 'Has the media become too focused on entertainment?', ja: '報道は娯楽に寄りすぎたか', engines: ['incentive', 'trust'] },
    { no: 86, domain: 'cul', en: 'Should violent content be restricted?', ja: '暴力的な表現を規制すべきか', engines: ['data-vs-feel', 'principle'] },
    { no: 87, domain: 'cul', en: 'Is globalization destroying local cultures?', ja: 'グローバル化は地域文化を壊しているか', engines: ['scale', 'both-true'] },
    { no: 88, domain: 'cul', en: 'Should museums return artifacts to their countries of origin?', ja: '博物館は文化財を原産国に返すべきか', engines: ['principle', 'trust'] },
    { no: 89, domain: 'cul', en: 'Do celebrities have a responsibility to society?', ja: '有名人に社会的責任はあるか', engines: ['scale', 'definition'] },
    { no: 90, domain: 'cul', en: 'Does reading books still matter in the digital age?', ja: 'デジタル時代に読書はまだ重要か', engines: ['dependency', 'definition'] },

    // --- 家族・生き方 ---
    { no: 91, domain: 'life', en: 'Is marriage still a necessary institution?', ja: '結婚という制度は今も必要か', engines: ['definition', 'status-quo'] },
    { no: 92, domain: 'life', en: 'Should parents be held responsible for their childrens crimes?', ja: '子の犯罪に親は責任を負うべきか', engines: ['incentive', 'principle'] },
    { no: 93, domain: 'life', en: 'Is it better to raise children in a city or in the countryside?', ja: '子育ては都会と田舎のどちらが良いか', engines: ['anchor', 'both-true'] },
    { no: 94, domain: 'life', en: 'Should governments encourage people to have more children?', ja: '国は出産を奨励すべきか', engines: ['incentive', 'who-pays'] },
    { no: 95, domain: 'life', en: 'Do people rely too much on convenience?', ja: '人は便利さに頼りすぎているか', engines: ['dependency', 'anchor'] },
    { no: 96, domain: 'life', en: 'Is a genuine work-life balance realistic today?', ja: '今の社会でワークライフバランスは現実的か', engines: ['definition', 'who-pays'] },
    { no: 97, domain: 'life', en: 'Should families rather than the state care for the elderly?', ja: '高齢者の介護は国より家族が担うべきか', engines: ['who-pays', 'anchor'] },
    { no: 98, domain: 'life', en: 'Is happiness mainly a matter of choice?', ja: '幸福はおおむね選択の問題か', engines: ['definition', 'anchor'] },
    { no: 99, domain: 'life', en: 'Do people today have too many choices?', ja: '現代人は選択肢が多すぎるか', engines: ['freedom-cost', 'dependency'] },
    { no: 100, domain: 'life', en: 'Is it wiser to follow your passion or to be practical?', ja: '情熱に従うのと現実的であるのと、どちらが賢いか', engines: ['both-true', 'anchor'] },
];

// ============================================================
// 3層の答え -- 深掘りカード
// 第1バッチ: 10ドメインから1本ずつ。残りは同フォーマットで追加する。
// ============================================================

export interface Counter {
    q: string;   // 試験官の追い討ち
    a: string;   // 短い返し(2-3文。長い返しは面接では負ける)
    aJa: string;
}

export interface TopicCard {
    no: number;
    stance: string;
    stanceJa: string;
    /** 満点版。試験の作法どおり。減点されない */
    exam: string;
    examJa: string;
    /** 生身版。人間が実際に喋る形。言い直し・ヘッジ込み */
    human: string;
    humanJa: string;
    /** 一撃。試験官が顔を上げる一行 */
    blade: string;
    bladeJa: string;
    /** その一撃がなぜ効くのか(と、外したときの逃げ道) */
    bladeNote: string;
    counters: Counter[];
}

export const TOPIC_CARDS: TopicCard[] = [
    {
        no: 6,
        stance: 'No -- but the case for it is far weaker than people assume',
        stanceJa: '禁止はしない。ただし今の正当化は世間が思うよりはるかに弱い',
        exam: "I do not believe animal experimentation should be banned outright, though I think the case for it is weaker than it is usually presented. The argument against a ban is not that animal testing is acceptable in principle; it is that the realistic alternative is not a world of computer models, but a world where the first test happens on a human being. Compared to that, the current arrangement is the lesser harm. What I would support is a far stricter standard of necessity, so that the exemption applies only where no substitute exists, rather than wherever it happens to be cheaper.",
        examJa: "動物実験を全面禁止すべきだとは思わないが、その正当化は通常語られるより弱いと考える。禁止反対の論拠は「動物実験が原理的に許される」ことではなく、現実的な代替案がコンピュータモデルの世界ではなく「最初の被験者が人間になる世界」だということだ。それと比べれば現行の仕組みは害が小さい。私が支持するのは、代替が存在しない場合にのみ例外を認める、はるかに厳しい必要性の基準だ。",
        human: "So, no, I would not ban it, but I am not comfortable defending it either. I think people picture the alternative as some clean computer simulation, and that is not the alternative. The alternative is testing it on a person first. That is really the whole argument. It is not a good argument, it is just the better of two bad ones.",
        humanJa: "だから、禁止はしない。かといって胸を張って擁護もできない。みんな代替案をきれいなコンピュータ・シミュレーションだと想像しているけど、それは代替案じゃない。代替案は「先に人間で試す」だ。論点はほぼそれだけ。良い論拠じゃない。悪い二つのうちマシなほうというだけ。",
        blade: "I have never met anyone who is in favour of animal testing. I have only met people who have looked at the alternative.",
        bladeJa: "動物実験に賛成という人には会ったことがない。代替案を見てしまった人にしか会ったことがない。",
        bladeNote: '倫理的に不利な側に立つときの型。「賛成しているのではなく、他がもっと悪いと知っているだけ」と自分の立場を格下げして見せると、冷酷に聞こえずに主張を通せる。滑ったら That probably came out darker than I meant. と一言足して次へ進めばいい。',
        counters: [
            { q: "But computer models are improving rapidly, are they not?", a: "They are, and I would be glad to be made obsolete on this. But a model can only predict what we already thought to ask it. The reason we test is precisely to find the effect nobody predicted, and that is the one thing a simulation cannot be built to catch.", aJa: "改善しています。この点で私の主張が時代遅れになるなら歓迎します。ただモデルは、我々が尋ねようと思いついたことしか予測できません。試験をする理由はまさに誰も予測しなかった影響を見つけるためで、それだけはシミュレーションでは捕まえられません。" },
            { q: "Is it not simply speciesism to value a human life more?", a: "Possibly, yes. I would rather admit that than dress it up. But I notice that almost everyone making the accusation still takes medicine, so the disagreement may be about honesty more than about practice.", aJa: "そうかもしれません。取り繕うよりは認めます。ただ、その批判をする人のほとんども薬は飲む。だとすると対立は実践よりも正直さについてなのかもしれません。" },
        ],
    },
    {
        no: 11,
        stance: 'Neither -- the harm comes from who is allowed to point it, not from the tool',
        stanceJa: 'どちらでもない。害は道具からではなく「誰に向けさせるか」から来る',
        exam: "I do not think the question can be answered in terms of the technology itself, and I am slightly suspicious of anyone who answers it confidently. A tool amplifies whatever the people holding it already wanted. The same system can shorten a working day or ensure that an employee is never off the clock, and nothing inside the technology decides which of those happens. That decision is made in offices and parliaments. So my answer is that AI will do as much harm as we permit it to, which is an uncomfortable answer, because it removes the option of blaming the machine.",
        examJa: "この問いは技術そのものの言葉では答えられないと思うし、自信満々に答える人には少し懐疑的だ。道具は、持つ人がすでに望んでいたことを増幅する。同じシステムが労働時間を短くもするし、従業員が一日中仕事から解放されない状態も作る。どちらになるかを技術の内部は決めていない。決めるのはオフィスと議会だ。だから私の答えは「我々が許すだけAIは害をなす」であり、これは居心地の悪い答えだ。機械のせいにする選択肢が消えるから。",
        human: "Honestly, I do not think it is about the technology at all. It amplifies what people already wanted to do. The same tool can give you a shorter working day or make sure you are never actually off work, and the tool does not pick. Somebody picks. And that somebody has a name and a job title, which is the part we keep skipping.",
        humanJa: "正直、技術の話じゃないと思う。人がもともとやりたかったことを増幅するだけ。同じ道具が労働時間を短くもするし、一日中仕事から離れられない状態も作る。道具は選ばない。人が選ぶ。その人には名前と役職がある。みんなそこを飛ばす。",
        blade: "Blaming AI is a very convenient way of not naming the person who switched it on.",
        bladeJa: "AIのせいにするのは、スイッチを入れた人間の名前を言わずに済ませる、実に便利な方法だ。",
        bladeNote: '技術系のお題で最も汎用性の高い一撃。批判の矛先を「機械」から「意思決定者」へ移すだけで、議論が一段上に上がったように聞こえる。エンジン #8 tool-vs-rule をそのまま口語化したもの。',
        counters: [
            { q: "But surely some AI systems are dangerous by design?", a: "Some are, and those should be regulated like weapons rather than like software. My point is only that the design was also a choice somebody made. Dangerous by design still has a designer.", aJa: "危険なものはあります。それはソフトではなく兵器として規制すべきです。私が言いたいのは、その設計もまた誰かの選択だったということだけです。設計上危険であっても、設計者はいます。" },
            { q: "Are you not underestimating how fast this is moving?", a: "I might be. Almost everyone has been wrong about the speed in both directions. But speed changes how urgently we need rules, not who is responsible for writing them.", aJa: "かもしれません。速度については両方向にほぼ全員が外してきました。ただ速度が変えるのは、ルールがどれだけ急いで必要かであって、誰が書く責任を負うかではありません。" },
        ],
    },
    {
        no: 25,
        stance: 'Yes -- but not for the reason people give',
        stanceJa: '意味はある。ただし世間が挙げる理由とは別の理由で',
        exam: "Individual efforts do matter, but I would defend them on different grounds from the ones usually offered. Arithmetically, one household sorting its rubbish is close to irrelevant against industrial emissions, and pretending otherwise insults people's intelligence. What individual action actually does is political. People who have changed their own habits are far more willing to vote for the regulations that do the heavy lifting, and far harder for a government to dismiss. So the recycling bin is not a solution. It is a rehearsal for accepting a policy that is.",
        examJa: "個人の努力には意味があるが、私は通常とは別の根拠でそれを擁護する。算術的には、一世帯のごみ分別は産業排出に対してほぼ無関係であり、そうでないふりは人の知性を侮辱している。個人の行動が実際に果たすのは政治的な役割だ。自分の習慣を変えた人は、重い仕事を担う規制に賛成票を投じる意欲がはるかに高く、政府が無視しにくい。だからリサイクル箱は解決策ではない。解決策となる政策を受け入れるための予行演習だ。",
        human: "Yes, but not the way people usually mean. Look, me sorting my rubbish does basically nothing next to a steel plant, and we all know that. What it actually does is it makes me the kind of person who votes for the rules that do work. That is the point. It is not the fix, it is practice for accepting the fix.",
        humanJa: "意味はある。ただ、普通に言われている意味ではない。俺がごみを分別しても製鉄所の前ではほぼ無だし、それは全員わかってる。実際にやっているのは、効くルールに賛成票を入れる人間に自分を変えることだ。そこが要点。解決策じゃなくて、解決策を受け入れる練習。",
        blade: "My recycling will not save the planet. It is just the smallest possible bribe I pay to keep the right to complain.",
        bladeJa: "俺のリサイクルは地球を救わない。文句を言う権利を維持するために払う、可能な限り最小の賄賂だ。",
        bladeNote: '自虐で刺す型。環境のお題は説教くさくなりやすく、試験官も飽きている。自分を先に笑わせておくと、そのあとの主張が説教ではなく分析として通る。',
        counters: [
            { q: "Is that not just a way of excusing people who do nothing?", a: "I would say the opposite. If individual action is a rehearsal, then skipping it means you never get ready. I am not lowering the bar; I am saying we have been aiming it at the wrong target.", aJa: "むしろ逆だと思います。個人の行動が予行演習なら、飛ばした人は永久に準備できない。基準を下げているのではなく、狙う先を間違えていたと言っているのです。" },
            { q: "Should governments not simply regulate industry directly?", a: "They should, and that is where the actual reduction comes from. But regulation needs a public that will tolerate the cost of it. That public does not appear out of nowhere; it is built by people who have already changed something small.", aJa: "すべきですし、実際の削減はそこから来ます。ただ規制には、その費用に耐える国民が必要です。その国民は突然現れるのではなく、すでに小さく何かを変えた人々によって形成されます。" },
        ],
    },
    {
        no: 32,
        stance: 'No -- abolish the ranking, keep the test',
        stanceJa: '廃止しない。廃止すべきはテストではなく序列化のほう',
        exam: "I would not abolish standardized testing, but I would abolish almost everything we currently attach to it. A test is a thermometer: useful for telling you where the problem is, useless as a target. The moment schools are ranked by results, the rational strategy for a school is to train children to pass the test rather than to educate them, and the number rises while the thing it was meant to represent quietly falls. Removing the test leaves us blind. Removing the league table leaves us informed, which is the arrangement I would choose.",
        examJa: "標準テストを廃止はしないが、現在それに紐づけられているものはほぼ全部廃止する。テストは体温計だ。問題の所在を知るには有用だが、目標としては無用だ。学校が結果で序列化された瞬間、学校にとって合理的な戦略は教育ではなくテスト通過の訓練になり、数字は上がって、それが表すはずだったものは静かに下がる。テストをなくせば我々は盲目になる。順位表をなくせば我々は情報を得たままでいられる。私はそちらを選ぶ。",
        human: "I would keep the test and get rid of the league table. The test is fine, it is a thermometer. The problem starts when you rank schools by it, because then the smart move for a school is to just coach the test. And they are not cheating, that is genuinely the rational thing to do once you have told them that is what counts.",
        humanJa: "テストは残して順位表をなくす。テストは問題ない、体温計だ。問題が始まるのは学校をそれで序列化したときで、そうなると学校にとって賢い手はテスト対策になる。しかもそれは不正じゃない。それが評価対象だと告げた以上、完全に合理的な行動だ。",
        blade: "We built a thermometer, then started heating it directly and calling it summer.",
        bladeJa: "体温計を作ったのに、体温計そのものを温めて「夏が来た」と言い出した。",
        bladeNote: '比喩で刺す型。ジョークが苦手なら比喩を使う。笑わせるというより「うまいこと言うな」と思わせる方向で、外しても事故にならないので試験向き。',
        counters: [
            { q: "But how do we hold failing schools accountable without rankings?", a: "By inspecting them, which is what the test data is for. The information is the point; publishing it as a competition is the mistake. You can know which hospital has a problem without printing a hospital chart.", aJa: "査察によってです。テストのデータはそのためにある。情報が要点であって、それを競争として公表することが誤りです。病院の順位表を刷らなくても、どの病院に問題があるかは把握できます。" },
            { q: "Are parents not entitled to that information when choosing a school?", a: "That is a fair point, and it is the strongest argument on your side. My answer is that the table tells parents about a neighbourhood's income more reliably than about a school's teaching, so they are not getting the information they think they are buying.", aJa: "もっともな指摘で、そちら側で最も強い論拠です。私の答えは、順位表が示すのは学校の指導力より地域の所得水準だということです。親は自分が得ていると思っている情報を実際には得ていません。" },
        ],
    },
    {
        no: 41,
        stance: 'Yes -- the experiment has already been run',
        stanceJa: '標準にすべき。実験はもう走っている',
        exam: "I support making a four-day week the standard, largely because we no longer have to speculate about it. Trials in Iceland and the United Kingdom involving thousands of workers found that output held roughly steady while reported burnout fell, and the great majority of the companies involved chose to continue afterwards. That last detail matters more than the productivity figures, because firms are not sentimental about their own costs. The honest objection is not that it fails, but that it works far better in office work than in nursing or manufacturing, and any serious proposal has to say so.",
        examJa: "週4日勤務の標準化に賛成する。理由の大半は、もはや推測する必要がないからだ。アイスランドと英国での数千人規模の試行では、産出はおおむね維持され、燃え尽きの申告は減り、参加企業の大多数が終了後も継続を選んだ。この最後の事実は生産性の数字より重要だ。企業は自社のコストについて感傷的ではないからだ。正直な反論は「失敗する」ではなく「オフィス労働では非常にうまくいくが、看護や製造ではそうではない」であり、真面目な提案はそれを言わねばならない。",
        human: "Yeah, I am for it, mostly because it has already been tried. Iceland ran it, the UK ran it, thousands of people, and output held up. And the bit I find convincing is that most of the companies kept it afterwards. Companies are not sentimental. If it had cost them money they would have stopped. The real problem is it works great in an office and much less well in a hospital.",
        humanJa: "賛成。もう試されているから。アイスランドがやって、英国がやって、数千人規模で、産出は維持された。俺が説得力を感じるのは、企業の大半が終了後も続けたところ。企業は感傷的じゃない。損なら止めてる。本当の問題は、オフィスでは最高に効くが病院ではそうでもないこと。",
        blade: "We did not choose five days because it was optimal. We chose it because a factory owner in the nineteen twenties wanted a lie-in on Saturday.",
        bladeJa: "週5日は最適だから選ばれたんじゃない。1920年代の工場主が土曜に寝坊したかったから選ばれた。",
        bladeNote: '「今の当たり前」の出自を暴く型。エンジン #15 status-quo の口語版。史実の細部を軽く盛って笑いにしているので、詰められたら The details are fuzzy, but the point stands. と一言で退避できる。',
        counters: [
            { q: "What about hospitals and factories, where output is tied to hours?", a: "That is the strongest objection and I would not pretend otherwise. My position is that a standard sets a default, not a universal rule. Sectors tied to coverage would need staffing money instead, and a proposal that hides that is not being honest.", aJa: "最も強い反論で、取り繕いません。私の立場は、標準とはデフォルトを定めるものであり普遍的規則ではない、というものです。人員配置に縛られる分野には代わりに人件費が必要で、それを隠す提案は誠実ではありません。" },
            { q: "Would people not simply work the same hours in four days?", a: "That happened in some of the trials, and where it did, the health benefits disappeared. So the policy has to be fewer hours, not compressed hours. Otherwise you have just made Thursday worse.", aJa: "一部の試行では実際に起きて、その場合は健康上の効果が消えました。だから政策は圧縮ではなく労働時間の削減でなければなりません。さもなければ木曜日を悪化させただけです。" },
        ],
    },
    {
        no: 51,
        stance: 'Yes -- but the safeguards are the entire argument',
        stanceJa: '合法化する。ただし論点のすべては安全装置のほうにある',
        exam: "I believe euthanasia should be legalized, while accepting that this is the position with the heavier burden of proof. The case for it is straightforward: we already permit patients to refuse treatment and die slowly, so the law currently protects a preference for a longer death rather than a preference for life. The case against is not really about autonomy but about pressure, and it is a serious one. An elderly patient who senses they are a financial burden is not making a free choice. So my support is conditional on safeguards designed around that specific danger, and if those cannot be built, my position should change.",
        examJa: "安楽死は合法化すべきだと考えるが、これは立証責任の重いほうの立場だと認める。賛成の論拠は単純だ。我々はすでに患者が治療を拒んでゆっくり死ぬことを認めている。つまり現行法が守っているのは生への選好ではなく「より長い死」への選好だ。反対の論拠は自律ではなく圧力についてであり、それは深刻だ。自分が経済的負担だと感じている高齢の患者は自由な選択をしていない。だから私の賛成は、その危険に特化した安全装置を条件とし、それが作れないなら立場を変えるべきだ。",
        human: "I am for it, but I will say up front that this is the side that has to prove more. The thing that gets me is we already let people refuse treatment and die slowly. So the law is not protecting life right now, it is protecting the slower version. What genuinely worries me is not autonomy, it is pressure. Someone who feels like a burden is not really choosing.",
        humanJa: "賛成。ただ最初に言うと、こっちは立証責任が重い側だ。俺が引っかかるのは、治療拒否してゆっくり死ぬことはすでに認められている点。つまり今の法が守っているのは生ではなく「遅いほう」だ。本当に心配なのは自律じゃなくて圧力。自分が重荷だと感じている人は、実際には選んでいない。",
        blade: "We already allow people to die. We just insist that it takes longer and hurts more.",
        bladeJa: "我々はすでに人が死ぬことを認めている。ただ「もっと時間がかかって、もっと痛いほうで」と言い張っているだけだ。",
        bladeNote: '重いお題では笑わせにいかない。ここでの一撃は「短くて動かせない一文」。ジョークを入れる場所と入れない場所の判断そのものが評価対象になるので、生命倫理・戦争・貧困では blade を刃だけにする。',
        counters: [
            { q: "How can you ever be certain the choice is genuinely free?", a: "You cannot be certain, and I would not claim otherwise. But we make the same judgement when a patient refuses chemotherapy, and we accept it there. The question is not whether certainty is possible, but whether we apply the same standard consistently.", aJa: "確信はできませんし、そう主張もしません。ただ患者が化学療法を拒む場合にも同じ判断をしていて、そこでは受け入れています。問いは確信が可能かではなく、同じ基準を一貫して適用しているかです。" },
            { q: "Does legalizing it not change how society values the elderly?", a: "It might, and that is the risk I take most seriously. I would answer it with money rather than with law: if care is properly funded, fewer people feel like a cost. The danger comes from underfunded care, not from the option itself.", aJa: "その可能性はあり、私が最も重く見るリスクです。私は法ではなく予算で答えます。介護が十分に手当てされていれば、自分を費用だと感じる人は減ります。危険は選択肢そのものではなく、資金不足の介護から来ます。" },
        ],
    },
    {
        no: 62,
        stance: 'Yes -- but income is the wrong thing to tax',
        stanceJa: '重く課税する。ただし課税対象は所得ではない',
        exam: "I agree that the wealthy should contribute considerably more, but I think the usual proposal aims at the wrong target. Very large fortunes are not held as salary; they are held as assets, and assets are only taxed when sold, which means the decision to be taxed is voluntary. Raising the top income rate therefore lands hardest on a well-paid surgeon and barely touches someone who has never drawn a wage in their life. If the aim is fairness, the honest version of this policy taxes what people have rather than what they happen to have declared this year.",
        examJa: "富裕層はかなり多く負担すべきだと考えるが、通常の提案は的を外していると思う。巨額の富は給与としては保有されず、資産として保有される。資産は売却時にしか課税されない。つまり課税されるかどうかは本人の任意だ。最高所得税率の引き上げは、結果として高給の外科医に最も重く落ち、生涯給与を受け取ったことのない人にはほとんど届かない。公正が目的なら、この政策の正直な形は、今年たまたま申告した額ではなく保有している資産に課税する。",
        human: "I am for it, but I think people are aiming at the wrong thing. Really rich people do not have salaries. They have assets, and assets only get taxed when you sell, so basically you choose when to be taxed. So you put the top rate up and you hit a surgeon, and the person you were actually aiming at does not notice at all.",
        humanJa: "賛成だが、狙う先が違うと思う。本当の富裕層に給与はない。資産があって、資産は売ったときしか課税されないから、実質いつ課税されるかを自分で選べる。だから最高税率を上げると外科医に当たって、本来狙っていた相手はまったく気づかない。",
        blade: "Income tax is a tax on people who still have to go to work.",
        bladeJa: "所得税とは、いまだに働きに行かねばならない人にかかる税である。",
        bladeNote: '一文で立場を裏返す型。長い説明の代わりに定義を置き換えて笑わせる。格差のお題は感情論になりやすいので、こういう「冷たく正確な一行」のほうが試験官には刺さる。',
        counters: [
            { q: "Would the wealthy not simply move their money abroad?", a: "Some would, and that is a real cost. But it is an argument for coordinating between countries, not for giving up. We managed international agreement on banking secrecy, which people also said was impossible.", aJa: "一部はそうするでしょうし、それは実際のコストです。ただそれは国際協調の論拠であって、諦める論拠ではありません。銀行の秘密保持については国際的合意ができました。あれも不可能だと言われていました。" },
            { q: "Does heavy taxation not discourage people from creating wealth?", a: "Above a certain point I doubt it. Nobody decides not to build a company because the tax on their third billion is higher. The incentive argument is strong at ordinary incomes and gets weaker the further up you go.", aJa: "ある水準を超えると疑わしいです。三十億ドル目への税率が高いから会社を作るのをやめる人はいません。誘因の議論は通常の所得では強く、上に行くほど弱くなります。" },
        ],
    },
    {
        no: 73,
        stance: 'Yes -- because low turnout is not neutral',
        stanceJa: '義務化する。低投票率は中立ではないから',
        exam: "I support compulsory voting, and again this is a question where evidence exists rather than only theory. Australia has required it since the nineteen twenties and turnout sits above ninety per cent, against figures in the fifties and sixties elsewhere. The objection is that forcing participation is illiberal, and I take that seriously. My reply is that voluntary turnout is not evenly distributed: the people who stay home are disproportionately poor and young, so a voluntary system quietly weights the result towards the comfortable. Choosing not to vote is a right; designing a system where the same groups always fall out of it is a policy.",
        examJa: "投票の義務化を支持する。これもまた理論ではなく証拠がある問いだ。オーストラリアは1920年代から義務化しており投票率は九割を超える。他国の五割〜六割台と対照的だ。反論は「参加の強制は自由主義に反する」であり、私はそれを真剣に受け止める。私の返答は、任意の投票率は均等に分布しないというものだ。家に留まる人は貧困層と若年層に偏る。つまり任意制は静かに結果を「余裕のある側」へ加重している。投票しない選択は権利だが、常に同じ層が抜け落ちる制度を設計することは政策だ。",
        human: "I am for it, and honestly this is one where we do not have to guess. Australia has done it since the twenties, turnout is over ninety per cent. The pushback is that forcing people is not very liberal, and fair enough. But the people who stay home are not a random sample. They are poorer and younger. So a voluntary system is quietly tilted, it just does not look like it.",
        humanJa: "賛成。しかもこれは推測不要な部類だ。オーストラリアは1920年代からやっていて投票率は九割超。反論は「強制は自由主義的でない」で、それはもっとも。ただ家に留まる人はランダムサンプルじゃない。貧しくて若い層に偏る。つまり任意制は静かに傾いている。そう見えないだけで。",
        blade: "Australians are legally required to vote, and they queue up outside the polling station buying sausages. It has not exactly crushed the human spirit.",
        bladeJa: "オーストラリア人は法律で投票を義務づけられていて、投票所の外に並んでソーセージを買っている。人間の精神が押し潰されたようには見えない。",
        bladeNote: '「圧政だ」という反論を、具体的でばかばかしい実像一枚で無効化する型。抽象的な恐怖には抽象で返さず、絵で返すと笑いが取れて論点も進む。政治のお題で最も安全な笑いの取り方。',
        counters: [
            { q: "Is forcing an uninformed person to vote not worse than no vote?", a: "That assumes non-voters are uninformed and voters are not, and the evidence for that is thin. In practice compulsory systems produce parties that campaign to everyone, because they cannot win by mobilizing only the committed.", aJa: "それは棄権者が無知で投票者はそうでないと仮定していますが、その根拠は薄いです。実際には義務制の下では、政党が全員に向けて選挙運動をするようになります。熱心な層だけを動員しても勝てないからです。" },
            { q: "What about people with a principled objection to voting?", a: "Australia handles that by requiring attendance rather than a valid ballot, so a blank paper is legal. The duty is to show up, not to endorse anyone, and I think that distinction resolves most of the objection.", aJa: "オーストラリアは、有効票ではなく出頭を義務づけることで対処しており、白票は合法です。義務は出向くことであって誰かを支持することではありません。この区別で反論の大半は解けると思います。" },
        ],
    },
    {
        no: 82,
        stance: 'No -- not in the current format',
        stanceJa: '割に合わない。少なくとも今の形式では',
        exam: "In its current form, I do not think hosting the Olympics is worth it, and the pattern is consistent enough to be predictable. Montreal took roughly thirty years to pay off its stadium, and Athens left venues that were abandoned within a decade. The tourism and prestige arrive for three weeks; the maintenance bill arrives every year for forty. What makes this hard to stop is that the costs land on a future administration, so the officials who sign the bid are structurally never the ones who pay. I would support permanent or shared host cities, which removes the incentive to build from nothing.",
        examJa: "現在の形式では五輪開催は割に合わないと思うし、その型は予測可能なほど一貫している。モントリオールは競技場の返済に約三十年を要し、アテネは十年以内に放棄された施設を残した。観光と威信は三週間で来る。維持費は四十年間毎年来る。これを止めにくくしているのは、費用が将来の政権に落ちることだ。入札に署名する当局者は構造上、決して支払う側ではない。私は恒久開催地または分散開催を支持する。ゼロから建てる誘因が消えるからだ。",
        human: "Not the way it works now, no. Montreal took about thirty years to pay off one stadium. Athens has venues that were basically abandoned inside ten years. You get three weeks of tourism and forty years of maintenance. And the reason it keeps happening is the people who sign the bid are never the people who get the bill.",
        humanJa: "今のやり方ではなし。モントリオールは競技場一つの返済に三十年かかった。アテネは十年以内に事実上放棄された施設がある。観光は三週間、維持費は四十年。それでも繰り返される理由は、入札に署名する人が請求書を受け取る人ではないからだ。",
        blade: "It is the only party where the host is still paying off the furniture when the guests' children are grown up.",
        bladeJa: "招いた客の子どもが成人しても、主催者がまだ家具のローンを払っている。そういう種類のパーティーだ。",
        bladeNote: '数字を比喩に変換する型。「30年ローン」を「パーティー」に置き換えると、統計を覚えていなくても同じ主張が撃てる。数字が飛んだときの保険にもなる。',
        counters: [
            { q: "Does the Games not bring lasting infrastructure and pride?", a: "Sometimes, and Barcelona is the example everyone reaches for. But Barcelona used the Games to finish a plan it already had. Cities that build a plan around the Games instead of the other way round are the ones that end up with empty stadiums.", aJa: "そういう場合もあり、誰もがバルセロナを挙げます。ただバルセロナは既にあった計画を仕上げるために五輪を使いました。逆に五輪を軸に計画を作った都市が、空の競技場を抱えることになります。" },
            { q: "Are you not putting a price on something that unites the world?", a: "I am, deliberately, because somebody has to. The unity is real and I would like to keep it. That is precisely why I would rather hold it somewhere permanent than lose it to a series of bankruptcies.", aJa: "意図的にそうしています。誰かがやらねばならないので。一体感は本物で、私も残したい。だからこそ恒久開催地で続けたいのです。破綻の連鎖でそれを失うよりは。" },
        ],
    },
    {
        no: 96,
        stance: 'No -- it is not a balance problem, it is a pricing problem',
        stanceJa: '現実的ではない。これはバランスの問題ではなく値段の問題だから',
        exam: "I do not think a genuine work-life balance is realistic for most people, though I would locate the problem somewhere other than where it is usually placed. The advice given is almost entirely personal: set boundaries, manage your time, switch off notifications. But whether a person can afford to work fewer hours is determined by the price of housing and childcare, not by their discipline. Presenting a structural problem as a matter of personal habit is convenient for everyone except the person receiving the advice. Balance is not a skill people have lost. It is a thing that has become expensive.",
        examJa: "大多数の人にとって真のワークライフバランスは現実的でないと思うが、問題の所在は通常語られる場所とは別だと考える。与えられる助言はほぼ全て個人的だ。境界線を引け、時間を管理しろ、通知を切れ。しかし労働時間を減らす余裕があるかを決めるのは、住居費と保育費であって本人の自制心ではない。構造的問題を個人の習慣の問題として提示することは、助言を受け取る本人以外の全員にとって好都合だ。バランスは人が失った技能ではない。高価になったものだ。",
        human: "For most people, no. And the thing that bothers me is all the advice is personal. Set boundaries, manage your time, turn off notifications. But whether you can afford to work less is about rent and childcare, not about your discipline. It is a structural thing dressed up as a personal failing, which is very convenient for everyone except the person being told it.",
        humanJa: "大半の人には無理。引っかかるのは助言が全部個人向けなこと。境界線を引け、時間を管理しろ、通知を切れ。でも働く時間を減らせるかどうかは家賃と保育費の話で、自制心の話じゃない。構造的な問題を個人の欠点の格好にしている。助言される本人以外の全員にとって都合がいい。",
        blade: "Work-life balance is not a skill we forgot. It is a thing that got expensive, and then somebody sold us a book about it.",
        bladeJa: "ワークライフバランスは我々が忘れた技能じゃない。値段が上がっただけだ。そのあと誰かがそれについての本を売った。",
        bladeNote: '自己啓発を撃つ型。日本人受験者は「努力が足りない」方向の答えに流れやすく、そこから外すだけで内容が新鮮に聞こえる。生活実感の話なのでエンジン #20 anchor と繋げて自分の勤務時間を一言添えると強い。',
        counters: [
            { q: "Are there not people who manage it successfully?", a: "There are, and most of them either earn enough to buy time or have someone at home doing the unpaid half. Neither is a habit. Both are circumstances, and we keep reporting them as personal achievements.", aJa: "います。その大半は時間を買えるだけ稼いでいるか、無償の半分を担う人が家にいます。どちらも習慣ではなく環境です。それを我々は個人の功績として報じ続けています。" },
            { q: "Is that not a rather pessimistic view of individual effort?", a: "I would call it a redirected one. Effort works; I just think it works better aimed at childcare policy than at a notification setting. I am not telling people to give up, only to aim at something that can actually move.", aJa: "悲観というより方向転換だと思います。努力は効きます。ただ通知設定より保育政策に向けたほうがよく効くというだけです。諦めろではなく、実際に動くものを狙えということです。" },
        ],
    },
];

// ============================================================
// 導出データ -- 単一の情報源(TOPIC_100.engines)から計算する
// ============================================================

export const ENGINE_BY_ID: Record<string, Engine> =
    Object.fromEntries(ENGINES.map((e) => [e.id, e]));

/** engineId -> そのエンジンが効くトピック番号 */
export const ENGINE_COVERAGE: Record<string, number[]> = (() => {
    const map: Record<string, number[]> = {};
    for (const e of ENGINES) map[e.id] = [];
    for (const t of TOPIC_100) {
        for (const id of t.engines) {
            if (map[id]) map[id].push(t.no);
        }
    }
    return map;
})();

export const TOPIC_BY_NO: Record<number, Topic> =
    Object.fromEntries(TOPIC_100.map((t) => [t.no, t]));

export const CARD_BY_NO: Record<number, TopicCard> =
    Object.fromEntries(TOPIC_CARDS.map((c) => [c.no, c]));

export const DOMAIN_BY_ID: Record<DomainId, Domain> =
    Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<DomainId, Domain>;

/** 参照切れ検出: 存在しないエンジンIDを指しているトピックを返す(0件が正常) */
export function findBrokenEngineRefs(): { no: number; id: string }[] {
    const broken: { no: number; id: string }[] = [];
    for (const t of TOPIC_100) {
        for (const id of t.engines) {
            if (!ENGINE_BY_ID[id]) broken.push({ no: t.no, id });
        }
    }
    return broken;
}
