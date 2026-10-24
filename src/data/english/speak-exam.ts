/**
 * SPEAK の EXAM 段 — 話し言葉のまま、1段アカデミックに上げた部品。
 *
 * 【材料】ネイティブが人前で正式に議論している動画の字幕 222本 / 約126万語(2026-10-07 取得):
 *   Oxford Union のスピーチ 128本(1本 = 1人の5〜40分の演説。そのまま独白の見本)
 *   Open to Debate(旧 Intelligence Squared US)の討論 94本
 * JRE 130本(speak-rogan.ts)と同じ数え方で数え、「ディベートで何本に出たか」と
 * 「100,000語あたりで JRE の何倍出るか(ratio)」を載せる。ratio が高いほど、くだけた会話には出ない、議論の場の語。
 *
 * 【ルール】
 * - videos / ratio は実測。手で盛らない。出た本数が少ない語(outweigh 4本など)も、少ないと書いたうえで載せる
 * - ex は字幕のまま(言いよどみの重複だけ畳んだ)。特定の紛争・政党の話の例は避けて選んだ
 * - plug と EXAM 版の2分は自作。CASUAL 版(speak-rogan.ts)と中身は同じで、言い方だけ1段上げる
 */

import type { EngineId } from './write-core5';

export const DEBATE_CORPUS = {
    videos: 222,
    oxford: 128,
    openToDebate: 94,
    words: 1256887,
    fetched: '2026-10-07',
};

export interface ExamPart {
    en: string;
    ja: string;
    videos: number;   // 222本中、出た本数
    ratio: number;    // 100,000語あたり、JRE の何倍か
    ex: string;       // ディベートの字幕のまま
    plug: string;
    plugJa: string;
}

/** 議論の枠(EXAM 版)。どの指にも使う */
export const EXAM_FRAMES: ExamPart[] = [
    { en: 'The question is whether ~', ja: '論点を名指しする', videos: 85, ratio: 5.1, ex: 'The question is whether political power should govern competition and spirit of sport.', plug: 'The question is whether the government should step in at all.', plugJa: '問題は、そもそも政府が介入すべきかどうかだ。' },
    { en: 'Fundamentally, ~', ja: '根っこではこうだ', videos: 79, ratio: 10.4, ex: 'That is a serious accusation, and tonight I will explain why it is not only exaggerated, it is fundamentally mistaken.', plug: 'Fundamentally, this is a question of who pays.', plugJa: '根本的には、誰が払うかの問題だ。' },
    { en: 'Ultimately, ~', ja: '最後は', videos: 74, ratio: 2.9, ex: 'This debate is ultimately about power.', plug: 'Ultimately, this is about trust.', plugJa: '最終的には、信頼の問題だ。' },
    { en: 'In some ways, ~ / In many ways, ~', ja: 'ある意味では(断定を1段やわらげる)', videos: 59, ratio: 5.1, ex: 'Alan, you and I are in many ways aligned.', plug: 'In many ways, the problem is not technology but people.', plugJa: '多くの点で、問題は技術ではなく人だ。' },
    { en: 'As a result, ~', ja: 'その結果', videos: 46, ratio: 4.8, ex: 'As a result, scientists became attacked, advice was twisted.', plug: 'As a result, small businesses are left exposed.', plugJa: 'その結果、小さな企業が無防備なまま取り残される。' },
    { en: 'The argument that ~', ja: '相手の主張を名指しする', videos: 46, ratio: 7.2, ex: 'But I understand the argument that there should not be that obligation.', plug: 'I understand the argument that it costs too much. But consider the alternative.', plugJa: '費用がかかりすぎるという主張は分かる。でも、しない場合を考えてほしい。' },
    { en: 'To be clear, ~', ja: '誤解を先に消す', videos: 38, ratio: 5.7, ex: "I don't think that's where we are, to be clear.", plug: "To be clear, I'm not against technology. I'm against using it carelessly.", plugJa: 'はっきりさせておくと、技術に反対なのではない。雑な使い方に反対なのだ。' },
    { en: 'I would argue that ~', ja: '自分の主張を1段丁寧に置く', videos: 33, ratio: 4.5, ex: 'For Gen Z, I would argue that this is a golden age of news.', plug: 'I would argue that prevention is the cheapest option we have.', plugJa: '予防こそ、私たちが取れる最も安い選択肢だと主張したい。' },
    { en: "It's not about X. It's about Y.", ja: 'Xではなく、Yの話だ', videos: 31, ratio: 4.2, ex: 'This is not about choosing between humans and machines.', plug: "This is not about money. It's about responsibility.", plugJa: 'これは金の話ではない。責任の話だ。' },
    { en: 'On the other hand, ~', ja: '反対側を1文で置く', videos: 29, ratio: 6.3, ex: 'On the other hand, think about all the negatives that flow from government ownership.', plug: 'On the other hand, too much regulation can slow innovation.', plugJa: '一方で、規制が多すぎると技術革新が遅れることもある。' },
    { en: 'make the case that ~', ja: '論証する', videos: 28, ratio: 7.9, ex: 'You have two minutes for your closing statement to make the case one more time.', plug: "Let me make the case that this is everyone's problem.", plugJa: 'これは全員の問題だと論じさせてほしい。' },
    { en: 'I agree with you that ~, but ~', ja: '同意してから返す(質疑で最強)', videos: 26, ratio: 5.3, ex: 'Laura, I agree with you that the 2008 bailout was badly structured.', plug: 'I agree with you that it is expensive, but the alternative is far more expensive.', plugJa: '高いという点は同意する。でも、しない場合のほうがはるかに高くつく。' },
    { en: 'By definition, ~', ja: '定義上そうなる', videos: 18, ratio: 4.1, ex: "If two parties trade together freely, then by definition, they're both better off.", plug: 'A weak link is, by definition, the easiest way in.', plugJa: '弱い輪とは、定義上、いちばん入りやすい入口のことだ。' },
    { en: 'There is a difference between X and Y.', ja: '区別を立てる', videos: 14, ratio: 2.2, ex: "There's a difference between being right and being effective.", plug: 'There is a difference between protecting people and controlling them.', plugJa: '人を守ることと、人を管理することは違う。' },
    { en: 'The evidence suggests that ~', ja: '根拠に寄せる', videos: 10, ratio: 2.9, ex: 'All of the evidence suggests that when we do that, the economy grows faster.', plug: 'The evidence suggests that early action saves money.', plugJa: '早く手を打つほど費用が浮くことを、証拠は示している。' },
];

export interface FingerExam {
    parts: ExamPart[];
    talk: { en: string; step: number }[];
}

export const FINGER_EXAM: Record<EngineId, FingerExam> = {
    money: {
        parts: [
            { en: 'market forces / the market', ja: '市場に任せる・任せない', videos: 32, ratio: 4.0, ex: "The market doesn't value these things.", plug: "The market alone won't fix this. It doesn't value safety until it's too late.", plugJa: '市場だけでは解決しない。市場は手遅れになるまで安全に値段を付けない。' },
            { en: 'the cost of ~', ja: '何の代償か', videos: 27, ratio: 4.0, ex: 'We were not honest about the cost of our decisions.', plug: "The real issue is not the cost of acting. It's the cost of doing nothing.", plugJa: '本当の問題は、行動する費用ではない。何もしない費用だ。' },
            { en: 'inequality', ja: '格差', videos: 19, ratio: 4.9, ex: 'When inequality exists beyond the stadium, it will inevitably appear within it.', plug: 'Cyberattacks deepen inequality: large firms recover, small ones close.', plugJa: 'サイバー攻撃は格差を深める。大企業は立ち直り、小さな会社は潰れる。' },
            { en: 'taxpayers', ja: '納税者', videos: 16, ratio: 1.4, ex: 'All of this came at a high cost to the US Treasury and taxpayers.', plug: 'Either way, taxpayers end up paying.', plugJa: 'どちらにしても、最後に払うのは納税者だ。' },
            { en: 'economic growth', ja: '経済成長', videos: 13, ratio: 11.6, ex: "There's economic growth, low inflation, low unemployment, and a booming stock market.", plug: "Security is not a cost to economic growth. It's a condition for it.", plugJa: '安全は経済成長の足かせではない。成長の条件だ。' },
            { en: 'the private sector', ja: '民間', videos: 12, ratio: 4.0, ex: 'They come from the private sector.', plug: "The private sector can't solve this alone.", plugJa: '民間だけでは解決できない。' },
            { en: 'outweigh', ja: '上回る(4本と少ないが試験の定番)', videos: 4, ratio: 1.6, ex: 'It talked about a world where profits would outweigh the public service that journalism was supposed to accomplish.', plug: 'In my view, the benefits clearly outweigh the costs.', plugJa: '私の考えでは、利益が費用を明らかに上回る。' },
            { en: 'who should bear the cost', ja: '誰が費用を負うか', videos: 4, ratio: 1.8, ex: 'And the question is who should bear the cost.', plug: 'The real question is who should bear the cost.', plugJa: '本当の問題は、誰が費用を負うべきかだ。' },
        ],
        talk: [
            { en: 'I would argue that the government should invest more, and that it should focus on small businesses rather than large ones.', step: 1 },
            { en: 'In 2022, a single supplier was hacked, and Toyota had to halt fourteen factories for a day. None of them was the target. That is, by definition, a weak link.', step: 2 },
            { en: "I run a small company myself. We don't have a security team, we don't have the budget, and if we were targeted, we would simply be finished.", step: 3 },
            { en: "So this is not a company problem. Fundamentally, it's a national problem.", step: 4 },
            { en: 'I understand the argument that taxpayers should not subsidize private suppliers.', step: 5 },
            { en: 'But who bears the cost when fourteen factories stop? The workers, the customers, and ultimately the taxpayers.', step: 6 },
            { en: "So, to be clear, the question is not whether we can afford to invest. It's whether we can afford not to. Prevention is better than cure.", step: 7 },
        ],
    },
    time: {
        parts: [
            { en: 'historically', ja: '歴史的に', videos: 50, ratio: 3.5, ex: 'Historically, entities with that level of influence were states, empires, or religious institutions.', plug: 'Historically, the five-day week was also seen as a radical idea.', plugJa: '歴史的に見れば、週休2日もかつては過激な案だった。' },
            { en: 'increasingly', ja: 'ますます', videos: 39, ratio: 3.7, ex: 'Our brains have been increasingly oriented because of modern life to only do the left-hand side stuff.', plug: 'Work is increasingly done on screens rather than in offices.', plugJa: '仕事はますます、職場ではなく画面の上で行われている。' },
            { en: 'over the past decade', ja: 'この10年で', videos: 37, ratio: 2.6, ex: 'Over the past decade, teenage anxiety and depression has risen sharply alongside the rise of algorithm-driven social media.', plug: 'Over the past decade, remote work has gone from rare to normal.', plugJa: 'この10年で、在宅勤務は珍しいものから当たり前になった。' },
            { en: 'productivity / productive', ja: '生産性', videos: 36, ratio: 8.0, ex: "It's a productive thing to do, whether you're paid or not, by the way.", plug: 'What matters is productivity, not the number of hours.', plugJa: '大事なのは生産性であって、時間数ではない。' },
            { en: 'in the long term / in the long run', ja: '長期的に', videos: 20, ratio: 4.0, ex: "It's not going to be very productive in the long term.", plug: 'In the long run, burnout costs far more than a day off.', plugJa: '長い目で見れば、燃え尽きのほうが休日1日よりはるかに高くつく。' },
            { en: 'for the foreseeable future', ja: '当面は', videos: 5, ratio: 2.3, ex: 'And we are going to remain interconnected for the foreseeable future.', plug: 'For the foreseeable future, not every job can be done in four days.', plugJa: '当面は、すべての仕事が4日で回るわけではない。' },
        ],
        talk: [
            { en: 'I would argue that most office jobs should move to a four-day week, although not every industry can.', step: 1 },
            { en: 'Long meetings waste time, long commutes waste time, and waiting for approval wastes time. Over a year, that adds up to weeks.', step: 2 },
            { en: 'I take a twenty-five-minute lesson every night, and I have seen how small, focused blocks of time add up in the long run.', step: 3 },
            { en: "So this is not about working less. Fundamentally, it's about productivity.", step: 4 },
            { en: 'I understand the argument that customers expect service five days a week. That is a fair concern.', step: 5 },
            { en: 'But what happens if nothing changes? People burn out, they leave, and companies have to start from scratch with new staff.', step: 6 },
            { en: 'So, historically, the five-day week was once a radical idea too. In the long run, I believe the four-day week will be seen the same way.', step: 7 },
        ],
    },
    body: {
        parts: [
            { en: 'risk', ja: '危険・リスク', videos: 74, ratio: 4.2, ex: 'Does TikTok risk amplifying a culture of this short, fast, and highly polished learning experience?', plug: 'The risk is not hypothetical. It is already in our hospitals.', plugJa: 'リスクは仮定の話ではない。もう病院に来ている。' },
            { en: 'harm / harmful', ja: '害', videos: 63, ratio: 4.0, ex: 'Protecting people from harm is not politics.', plug: 'Protecting people from harm is not a political issue. It is basic responsibility.', plugJa: '人を害から守るのは政治の話ではない。最低限の責任だ。' },
            { en: 'public health', ja: '公衆衛生', videos: 21, ratio: 11.8, ex: "Now, let's talk about how society failed public health during the pandemic.", plug: 'This is a public health issue, not just a personal choice.', plugJa: 'これは個人の選択だけではなく、公衆衛生の問題だ。' },
            { en: 'mental health', ja: '心の健康', videos: 21, ratio: 3.0, ex: 'Participants have lower stress, better physical and mental health, a better emotional life.', plug: 'It affects not only physical health but mental health as well.', plugJa: '体の健康だけでなく、心の健康にも影響する。' },
            { en: 'well-being', ja: '健やかさ・幸福', videos: 13, ratio: 4.9, ex: 'The business model rewards virality over accuracy, outrage over nuance, addiction over well-being.', plug: 'The food industry rewards profit over well-being.', plugJa: '食品業界は、健やかさより利益を優先する仕組みになっている。' },
            { en: 'prevention', ja: '予防', videos: 10, ratio: 1.9, ex: 'Secondly, our society devalues prevention.', plug: 'Our society devalues prevention, and then pays for treatment.', plugJa: '社会は予防を軽く見て、あとで治療に金を払う。' },
        ],
        talk: [
            { en: 'I would argue that a modest tax on sugary drinks is justified, as long as the revenue goes back into health.', step: 1 },
            { en: "Sugary drinks are cheap, they're everywhere, and they're marketed directly to children.", step: 2 },
            { en: 'You only have to walk into a convenience store: the drinks are the first thing you see.', step: 3 },
            { en: "This is not about restricting freedom. It's a public health issue.", step: 4 },
            { en: 'Opponents would say, "The government shouldn\'t decide what I drink." I agree with them that adults can make their own choices.', step: 5 },
            { en: 'But who pays when those choices lead to diabetes? Ultimately, the healthcare system, and therefore all of us.', step: 6 },
            { en: 'So, to be clear, the goal is not punishment but prevention. Our society devalues prevention, and this is a small step to change that.', step: 7 },
        ],
    },
    happiness: {
        parts: [
            { en: 'dignity', ja: '尊厳', videos: 25, ratio: 6.0, ex: "In Denmark, no one is paid so little that they can't afford to live in dignity.", plug: 'Work gives people dignity, not just an income.', plugJa: '仕事は収入だけでなく、尊厳を与える。' },
            { en: 'human flourishing / flourish', ja: '人が豊かに生きること', videos: 23, ratio: 4.2, ex: 'But engagement is not the same as truth, democratic quality, or human flourishing.', plug: 'Money is a means. Human flourishing is the end.', plugJa: '金は手段だ。人が豊かに生きることが目的だ。' },
            { en: 'meaning and purpose', ja: '意味と目的', videos: 18, ratio: 2.6, ex: "So, people use purpose and meaning synonymously, that's not right.", plug: 'People need meaning and purpose, and money cannot buy either.', plugJa: '人には意味と目的が要る。どちらも金では買えない。' },
            { en: 'fulfillment', ja: '充足', videos: 14, ratio: 1.5, ex: 'But does that give us that emotional fulfillment?', plug: 'A bigger salary does not guarantee fulfillment.', plugJa: '給料が上がっても、満たされる保証はない。' },
            { en: 'a sense of belonging', ja: '居場所', videos: 14, ratio: 4.0, ex: 'Because citizenship is about stability, fairness, and belonging.', plug: 'Happiness comes from a sense of belonging, not from buying more.', plugJa: '幸せは居場所から来る。もっと買うことからではない。' },
            { en: 'well-being', ja: '幸福度', videos: 13, ratio: 4.9, ex: 'The way that we measure is based on activity and not well-being.', plug: 'GDP measures activity, not well-being.', plugJa: 'GDPは活動量を測るもので、幸福度を測るものではない。' },
            { en: 'quality of life', ja: '暮らしの質', videos: 6, ratio: 1.5, ex: "Quality of life, a sustainable, repeatable culture that's not burning people out.", plug: 'Beyond a certain point, more money does little for quality of life.', plugJa: 'ある程度を超えると、金が増えても暮らしの質はあまり上がらない。' },
        ],
        talk: [
            { en: 'I would argue that money makes people comfortable, but it does not, by itself, make them happy.', step: 1 },
            { en: 'Money can buy a bigger house, a faster car, and a longer holiday. It cannot buy meaning, purpose, or a sense of belonging.', step: 2 },
            { en: 'I worked in finance for years. The pay was good, and I was not happy.', step: 3 },
            { en: "So this is not about income. Fundamentally, it's about how people spend their days.", step: 4 },
            { en: 'I agree with those who say that poverty makes happiness very difficult. Below a certain level, money matters enormously.', step: 5 },
            { en: 'But beyond that point, what makes people happy? The evidence suggests it is relationships, health, and meaningful work.', step: 6 },
            { en: 'So, ultimately, money is the floor of a good life, not the ceiling. Human flourishing is the goal.', step: 7 },
        ],
    },
    education: {
        parts: [
            { en: 'young people', ja: '若い世代', videos: 44, ratio: 3.7, ex: 'What are you both hearing from young people right from the teenagers and the twenties?', plug: 'Young people need skills, not just certificates.', plugJa: '若い世代に要るのは、資格証明だけでなく技術だ。' },
            { en: 'learn from ~', ja: '〜から学ぶ', videos: 37, ratio: 3.3, ex: 'And we have not learned from our mistakes.', plug: 'A good education teaches you to learn from your mistakes.', plugJa: 'いい教育は、失敗から学ぶ方法を教える。' },
            { en: 'skills', ja: '技術', videos: 21, ratio: 1.1, ex: "I think if we're using it as a tool to build skills, yes, totally agree with you.", plug: 'Universities should focus on skills that last a lifetime.', plugJa: '大学は一生使える技術に重きを置くべきだ。' },
            { en: 'the next generation', ja: '次の世代', videos: 6, ratio: 1.2, ex: 'Will there be job opportunities for the next generation of journalists?', plug: 'We are preparing the next generation for jobs that do not exist yet.', plugJa: 'まだ存在しない仕事に向けて、次の世代を育てている。' },
            { en: 'critical thinking', ja: '批判的思考', videos: 6, ratio: 2.7, ex: "Critical thinking means I can read a scholar's commentary and decide that he might be right or wrong.", plug: 'Above all, school should teach critical thinking.', plugJa: '何よりも、学校は批判的思考を教えるべきだ。' },
            { en: 'higher education', ja: '高等教育', videos: 5, ratio: 1.7, ex: 'Our institutions like higher education, the media, the judiciary.', plug: 'Higher education should be an investment, not a debt trap.', plugJa: '高等教育は投資であるべきで、借金の罠であってはならない。' },
        ],
        talk: [
            { en: 'I would argue that university should be far more affordable, but not free for everyone.', step: 1 },
            { en: 'Free tuition does not make students study, it does not make them attend, and it does not make them put in the work.', step: 2 },
            { en: 'Most of my English came after school, from twenty-five minutes of practice a night. Motivation mattered more than the price.', step: 3 },
            { en: "So this is not about the degree. Fundamentally, it's about skills.", step: 4 },
            { en: 'I understand the argument that free education removes barriers for poorer students. That is a serious point.', step: 5 },
            { en: 'But who should receive support? Those who are motivated and cannot afford it. Targeted support helps them far more than a general subsidy.', step: 6 },
            { en: 'So, ultimately, higher education should be an investment for the next generation, not a debt trap, and not a free pass either.', step: 7 },
        ],
    },
    fairness: {
        parts: [
            { en: 'injustice / unjust', ja: '不正義', videos: 65, ratio: 7.4, ex: "There's no justice in the end.", plug: 'Two sets of rules is an injustice in itself.', plugJa: '規則が2組あること自体が不正義だ。' },
            { en: 'accountable / accountability', ja: '責任を問う', videos: 40, ratio: 5.8, ex: "Supporters argue they're a vital tool to hold leaders accountable.", plug: 'Those with the most power should be held accountable.', plugJa: '最も力を持つ者こそ、責任を問われるべきだ。' },
            { en: 'the most vulnerable', ja: '最も弱い立場の人', videos: 29, ratio: 2.0, ex: 'Meanwhile, it leaves many vulnerable, poorer seniors below the federal poverty level.', plug: 'A policy should be judged by how it treats the most vulnerable.', plugJa: '政策は、最も弱い立場の人をどう扱うかで判断されるべきだ。' },
            { en: 'discrimination', ja: '差別', videos: 27, ratio: 9.3, ex: 'We should be fighting to eliminate discrimination.', plug: 'Unequal rules amount to discrimination.', plugJa: '不平等な規則は、差別に等しい。' },
            { en: 'the rule of law', ja: '法の支配', videos: 27, ratio: 6.8, ex: "What they're proposing is to replace the rule of law with the rule of whim.", plug: 'Fairness starts with the rule of law: the same rules for the rich and the poor.', plugJa: '公平は法の支配から始まる。金持ちにも貧しい人にも同じ規則を。' },
            { en: 'disproportionately', ja: '不釣り合いに', videos: 19, ratio: 4.4, ex: "We're not saying that some industries don't suffer disproportionately.", plug: 'Flat taxes hit low-income families disproportionately.', plugJa: '一律の税は、低所得の家庭に不釣り合いに重くのしかかる。' },
            { en: 'a level playing field', ja: '公平な土俵', videos: 11, ratio: 2.4, ex: 'These countries have created an unlevel playing field.', plug: 'The goal is a level playing field, not equal outcomes.', plugJa: '目標は公平な土俵であって、結果の平等ではない。' },
        ],
        talk: [
            { en: 'I would argue that the wealthy should pay somewhat more, not because success is wrong, but because the current system is not a level playing field.', step: 1 },
            { en: 'Ordinary people pay tax at the register, they pay with every paycheck, and they pay first.', step: 2 },
            { en: 'I run a small business. I pay everything on time, and I do not have a team of accountants to find the loopholes.', step: 3 },
            { en: "So this is not about punishing success. It's about the rule of law: the same rules for everyone.", step: 4 },
            { en: 'I understand the argument that high earners already contribute the most. In absolute terms, that is true.', step: 5 },
            { en: 'But who built the roads, trained the workers, and keeps the courts running? Society as a whole did.', step: 6 },
            { en: 'So, ultimately, a policy should be judged by how it treats the most vulnerable, and those with the most should be held accountable for their share.', step: 7 },
        ],
    },
    freedom: {
        parts: [
            { en: 'the right to ~', ja: '〜する権利', videos: 44, ratio: 5.2, ex: 'Suffragettes in this country were sent to prison and undertook hunger strikes to obtain the right to vote.', plug: 'People have the right to be wrong.', plugJa: '人には間違える権利がある。' },
            { en: 'free speech / freedom of speech', ja: '言論の自由', videos: 32, ratio: 5.7, ex: 'Content removal is blanketed as limiting free speech.', plug: 'Free speech includes speech we find offensive.', plugJa: '言論の自由には、不快に感じる言葉も含まれる。' },
            { en: 'autonomy', ja: '自律', videos: 20, ratio: 2.6, ex: 'Are they fighting for their own autonomy, their own independence?', plug: 'Adults deserve autonomy over their own choices.', plugJa: '大人には、自分の選択を自分で決める自律が認められるべきだ。' },
            { en: 'censorship', ja: '検閲', videos: 11, ratio: 1.1, ex: 'The only defense against state monopoly, censorship, and stagnation.', plug: 'Today it is harmful content. Tomorrow it may be censorship.', plugJa: '今日は有害な投稿。明日は検閲かもしれない。' },
            { en: 'individual freedom / liberty', ja: '個人の自由', videos: 10, ratio: 1.9, ex: 'We elevated individual freedom over community responsibility, undermining our ability to protect the common good.', plug: 'Individual freedom has to be balanced against the common good.', plugJa: '個人の自由は、公共の利益と釣り合いを取らなければならない。' },
            { en: 'government overreach', ja: '政府の行き過ぎ', videos: 8, ratio: 3.1, ex: 'When public health experts recommended masking, people saw it as government overreach.', plug: 'There is a fine line between protection and government overreach.', plugJa: '保護と政府の行き過ぎのあいだには、細い線しかない。' },
            { en: 'a chilling effect', ja: '萎縮効果', videos: 3, ratio: 2.4, ex: 'Potentially, you talked about the chilling effect.', plug: 'Vague rules have a chilling effect on what people are willing to say.', plugJa: '曖昧な規則は、人が口にする言葉を萎縮させる。' },
        ],
        talk: [
            { en: 'I would argue that platforms should remove illegal content, but they should not remove opinions.', step: 1 },
            { en: 'Remove scams, remove threats, remove material that exploits children. Beyond that, the default should be to leave speech alone.', step: 2 },
            { en: 'I make plenty of mistakes in English every night. I would not want anyone deciding which of my opinions are acceptable.', step: 3 },
            { en: "So this is not about safety alone. Fundamentally, it's about who gets to decide.", step: 4 },
            { en: 'I agree with you that some content causes real harm. That is precisely why the rules must be narrow and clear.', step: 5 },
            { en: 'But what happens when the rules are vague? They have a chilling effect, and people stop saying what they think.', step: 6 },
            { en: 'So, ultimately, there is a difference between protecting people and controlling them. Free speech includes speech we find offensive.', step: 7 },
        ],
    },
    trust: {
        parts: [
            { en: 'the public', ja: '一般の人々', videos: 70, ratio: 2.8, ex: 'I trust the public if they are informed.', plug: 'I trust the public, as long as they are given the facts.', plugJa: '事実さえ渡されれば、私は一般の人々を信頼する。' },
            { en: 'polarization / polarized', ja: '分断', videos: 60, ratio: 19.9, ex: 'Among them, the increasing polarization of public discourse.', plug: 'Polarization makes people trust only their own side.', plugJa: '分断は、人に自分の側しか信じさせなくする。' },
            { en: 'legitimacy / legitimate', ja: '正当性', videos: 46, ratio: 1.6, ex: 'Feelings are a legitimate part of learning.', plug: 'Without trust, institutions lose their legitimacy.', plugJa: '信頼が無ければ、制度は正当性を失う。' },
            { en: 'transparency / transparent', ja: '透明性', videos: 31, ratio: 2.9, ex: 'Decisions are transparent, even when we disagree with them.', plug: 'Transparency is the cheapest way to earn trust.', plugJa: '透明性は、信頼を得るいちばん安い方法だ。' },
            { en: 'accountability', ja: '説明責任', videos: 27, ratio: 5.0, ex: 'It simply could not act without public accountability.', plug: 'Journalists need accountability, just like politicians.', plugJa: '記者にも、政治家と同じく説明責任が要る。' },
            { en: 'credibility', ja: '信用', videos: 24, ratio: 3.4, ex: 'Once sports takes political positions selectively, credibility collapses.', plug: 'Once a news outlet takes sides selectively, its credibility collapses.', plugJa: '報道機関が都合よく片側に付いた瞬間、信用は崩れる。' },
            { en: 'erode / trust erodes', ja: '信頼がすり減る', videos: 19, ratio: 3.2, ex: 'And when neutrality weakens, trust erodes.', plug: 'Every correction that is hidden erodes trust a little more.', plugJa: '隠された訂正のひとつひとつが、信頼を少しずつ削る。' },
            { en: 'misinformation', ja: '誤情報', videos: 18, ratio: 2.6, ex: "When channels close, that's when propaganda and misinformation can fill the vacuum.", plug: 'When trusted sources disappear, misinformation fills the vacuum.', plugJa: '信頼できる情報源が消えると、誤情報がその空白を埋める。' },
        ],
        talk: [
            { en: 'I would argue that we can still trust parts of the news media, but not uncritically.', step: 1 },
            { en: 'Television has a narrative, newspapers have a narrative, and social media has a narrative as well.', step: 2 },
            { en: 'I use AI every day. It always sounds confident, and it is still wrong surprisingly often.', step: 3 },
            { en: "So the problem is not only fake news. Fundamentally, it's the habit of reading without checking.", step: 4 },
            { en: 'Many people would say that nobody knows what is true anymore. I understand that frustration.', step: 5 },
            { en: 'But whom should we trust? Those who show their sources and correct their mistakes in public. Transparency builds trust; hidden corrections erode it.', step: 6 },
            { en: 'So, ultimately, the answer is to be skeptical, not cynical. I trust the public, as long as they are given the facts.', step: 7 },
        ],
    },
    roots: {
        parts: [
            { en: 'communities', ja: '共同体', videos: 56, ratio: 3.8, ex: "They're growing up in communities, even if they live in big cities, that are ideologically mixed.", plug: 'Traditions hold communities together.', plugJa: '伝統は共同体をつなぎとめる。' },
            { en: 'identity', ja: 'アイデンティティ', videos: 45, ratio: 10.6, ex: 'Many people are trying to define their own identity in the 21st century.', plug: 'Local traditions give people a sense of identity.', plugJa: '地域の伝統は、人に自分が何者かという感覚を与える。' },
            { en: 'heritage', ja: '受け継いだもの', videos: 19, ratio: 9.1, ex: 'Heritage matters, family matters, ancestry matters.', plug: 'Heritage has to be lived, not just displayed in a museum.', plugJa: '受け継いだものは、博物館に飾るだけでなく生きられなければならない。' },
            { en: 'belonging', ja: '帰属', videos: 14, ratio: 4.0, ex: 'George is not a symbol of exclusion but of belonging.', plug: 'A festival is a symbol not of the past but of belonging.', plugJa: '祭りは過去の象徴ではなく、帰属の象徴だ。' },
            { en: 'future generations', ja: '将来の世代', videos: 6, ratio: 2.1, ex: 'There is a sacred obligation to conserve them for future generations.', plug: 'We have an obligation to pass them on to future generations.', plugJa: '私たちには、それを将来の世代に渡す義務がある。' },
            { en: 'cohesion', ja: '結束', videos: 5, ratio: 2.3, ex: 'Neither did it undermine its cohesion.', plug: 'Shared traditions strengthen social cohesion.', plugJa: '共有された伝統は、社会の結束を強める。' },
            { en: 'the fabric of ~', ja: '〜の織り目(暮らしの土台)', videos: 4, ratio: 1.2, ex: 'The monarchy is woven into the fabric of the country and is a source of national pride.', plug: 'Local festivals are woven into the fabric of small towns.', plugJa: '地域の祭りは、小さな町の暮らしに織り込まれている。' },
        ],
        talk: [
            { en: 'I would argue that preserving local traditions is important, not because they are old, but because they still serve a purpose.', step: 1 },
            { en: 'A festival brings people out, it introduces neighbors to one another, and it gives children a story to carry.', step: 2 },
            { en: 'In a large city, you can live next to someone for ten years and never learn their name.', step: 3 },
            { en: "So this is not about the past. Fundamentally, it's about social cohesion.", step: 4 },
            { en: 'I agree with young people who say that some traditions feel outdated. Some of them are.', step: 5 },
            { en: 'But what happens once they disappear? They cannot be bought back, and communities lose part of their identity.', step: 6 },
            { en: 'So, ultimately, we have an obligation to pass them on to future generations, and to let those generations adapt them.', step: 7 },
        ],
    },
    nature: {
        parts: [
            { en: 'climate change', ja: '気候変動', videos: 24, ratio: 1.8, ex: "Cholera became pandemic 60 years ago and it's spreading more because of climate change.", plug: 'Climate change is no longer a future risk. It is a present cost.', plugJa: '気候変動はもう将来のリスクではない。今かかっている費用だ。' },
            { en: 'sustainable / sustainability', ja: '持続可能', videos: 22, ratio: 5.4, ex: 'This is not the profile of a sustainable or empowering system.', plug: 'A throwaway culture is not sustainable.', plugJa: '使い捨ての文化は持続可能ではない。' },
            { en: 'renewable energy', ja: '再生可能エネルギー', videos: 7, ratio: 3.3, ex: 'The amount of money being spent on renewable energy is still going up.', plug: 'Investment in renewable energy is still rising.', plugJa: '再生可能エネルギーへの投資は今も増え続けている。' },
            { en: 'future generations', ja: '将来の世代', videos: 5, ratio: 1.9, ex: 'Cultural exchange that benefits visitors, scholars, and future generations.', plug: 'Future generations will pay for what we throw away today.', plugJa: '今日捨てたものの代償は、将来の世代が払う。' },
            { en: 'fossil fuels', ja: '化石燃料', videos: 5, ratio: 2.1, ex: 'Sticking with fossil fuels through to 2050 costs double what transitioning off them would.', plug: 'Individuals cannot end our dependence on fossil fuels alone.', plugJa: '個人だけでは化石燃料への依存を終わらせられない。' },
        ],
        talk: [
            { en: 'I would argue that individuals should do more, but that individual action alone will never be enough.', step: 1 },
            { en: 'I can bring my own bag, I can carry my own bottle, and I can walk to the station. That is my part.', step: 2 },
            { en: 'In my work, I install interiors, and I see how much material is thrown away on a single job.', step: 3 },
            { en: "So this is not a shopping problem. Fundamentally, it's a system problem.", step: 4 },
            { en: 'Many people would say that one person cannot change anything. I understand that feeling.', step: 5 },
            { en: 'But what can one person actually do? Buy less, repair more, and vote for people who will change the rules for industry.', step: 6 },
            { en: 'So, ultimately, a throwaway culture is not sustainable, and future generations will pay for what we discard today.', step: 7 },
        ],
    },
};
