// Month 11 Week 42: お金と契約 / Money and Contracts
// Days 308-314, 70 expressions, 35 keywords

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Day 308: 給料の話 (social)
// ============================================================
const day308: MasterExpression[] = [
  {
    daySlot: 308,
    japanese: '給料日まだかな',
    english: [
      'Payday yet?',
      'I keep checking my calendar waiting for payday.',
      'Every time I open my banking app this week, I just sigh because payday is still days away.',
      'You know that feeling when you are counting down the days until payday? I have been checking my bank balance every morning like it is going to magically change. Three more days. I can make it. Probably. Maybe. If I stop buying coffee.',
    ],
    context: '「まだかな」は待ち遠しさを含む。英語では"Is it payday yet?"のように疑問形で同じニュアンスを出す。日本語の独り言的な感じが英語だとちょっと大げさになる。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '手取りいくら？',
    english: [
      'Take-home pay?',
      'What is your take-home pay like?',
      'After all the deductions, how much do you actually end up with in your account?',
      'So I was talking to a buddy about salaries the other day, and he asked me straight up what my take-home pay was. In Japan you can kind of dance around it, but he just went for it. I told him, and honestly it felt weirdly refreshing to just be open about it.',
    ],
    context: '「手取り」は日本語では普通に聞けるけど、英語圏では給料の話はかなりタブー寄り。"take-home pay"は税引後の手取り額。聞くときは親しい間柄限定。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '残業代つくの？',
    english: [
      'Get overtime pay?',
      'Do you actually get paid for overtime?',
      'Does your company actually compensate you for all those extra hours you put in?',
      'I was complaining about working late again, and Lisa asked me if I even get overtime pay. I had to think about it for a second because honestly the system at my company is so confusing. Technically yes, but there is a cap, so after a certain point you are basically working for free. She looked at me like I was crazy.',
    ],
    context: '「残業代つく」の「つく」は付与される意味。英語では"get paid for overtime"が自然。日本のサービス残業文化は英語圏の人には衝撃的らしい。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: 'ボーナス出た？',
    english: [
      'Get your bonus?',
      'Did your bonus come through yet?',
      'So did you actually get your year-end bonus, or did the company pull some excuse again?',
      'Bonus season is always stressful. You spend weeks wondering how much it is going to be, and then when it finally hits your account, you stare at the number and try to figure out where half of it went to taxes. Kenji got his yesterday and immediately started planning a trip. I got mine and immediately paid off my credit card. We are not the same.',
    ],
    context: '日本のボーナスは年2回が普通で金額も大きい。英語圏のbonusは業績連動で不確実なことが多い。「出た」の軽さが英語だと"come through"で近いニュアンス。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '昇給あった？',
    english: [
      'Get a raise?',
      'Did you get a raise this year?',
      'When they did the annual review, did they actually bump up your salary at all?',
      'I have been at my company for three years now, and every year I keep hoping for a decent raise. This time they gave me a tiny bump, like barely enough to cover the increase in my commuter pass. Mina told me I should negotiate harder, but honestly the idea of sitting across from my boss and asking for more money makes me want to crawl under my desk.',
    ],
    context: '「昇給」は日本では年功序列的に自動で上がるイメージもあるが、英語圏では"raise"は交渉して勝ち取るもの。自分から言わないともらえない文化の差がでかい。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '天引きされすぎ',
    english: [
      'Too many deductions.',
      'They take out way too much from my paycheck.',
      'When I look at my pay stub, the deductions are almost as big as my actual take-home amount.',
      'I finally sat down and actually read my pay stub line by line, and I could not believe how many things they take out. Income tax, resident tax, health insurance, pension, employment insurance. By the time they are done, it feels like I am working half the month just to pay for the privilege of having a job. Master said that is just how it works, but come on.',
    ],
    context: '「天引き」は給料から自動で引かれること。英語では"deductions"だが、日本語の「天」が持つ「上から勝手にやられる」感は"they take out"で表現できる。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '副業してる？',
    english: [
      'Got a side gig?',
      'Are you doing anything on the side for extra cash?',
      'With everything getting more expensive, have you started any kind of side hustle to supplement your income?',
      'Everybody seems to have a side hustle these days. Lisa does freelance translation on weekends, Kenji sells stuff online, and even Master mentioned he used to do calligraphy commissions. Meanwhile I can barely keep up with my main job. I keep thinking about starting something, but by the time I get home I just want to collapse on the couch and watch TV.',
    ],
    context: '「副業」は最近日本でも解禁されつつあるけど、英語圏では"side hustle"が流行語レベルで浸透。ポジティブなニュアンスが強い。日本語の「副業」はまだちょっと後ろめたさがある。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '生活費足りない',
    english: [
      'Cannot cover expenses.',
      'My salary barely covers my living expenses.',
      'By the time I pay rent, utilities, and groceries, there is almost nothing left from my paycheck.',
      'I did the math last night and realized that after rent, phone, internet, insurance, and food, I have about ten thousand yen left for the entire month. That is supposed to cover transportation, socializing, and anything unexpected. Takeshi suggested I make a budget spreadsheet, which is great advice from someone who just bought a new gaming console.',
    ],
    context: '「足りない」はシンプルだけど切実。英語では"barely covers"や"can hardly make ends meet"で生活のギリギリ感を出す。"make ends meet"は定番表現。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '給料に見合ってない',
    english: [
      'Not worth the pay.',
      'The work I do is not reflected in my paycheck.',
      'For the amount of responsibility and hours I put in, my salary is honestly insulting.',
      'I was venting to Master about how I handle three people worth of work but only get paid for one. He poured me a drink and said something about how everyone feels that way. Maybe, but I looked up the average salary for my position online and I am definitely below it. The question is whether I have the guts to actually do something about it or just keep complaining over drinks.',
    ],
    context: '「見合ってない」は仕事量と報酬のバランスが悪いこと。英語では"underpaid for what I do"や"not compensated fairly"。日本語より直接的に不満を表明する傾向がある。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 308,
    japanese: '貯金できてる？',
    english: [
      'Saving any money?',
      'Have you been able to put any money aside?',
      'With how expensive everything has gotten, are you actually managing to save anything each month?',
      'Mina asked me point blank if I had any savings, and I just laughed. Not in a funny way, more like a nervous, please-change-the-subject kind of laugh. I know I should be saving, and I even set up an automatic transfer to my savings account, but then I keep dipping into it whenever something comes up. It is like having a cookie jar that I raid every week.',
    ],
    context: '「貯金できてる」は進行形で習慣を聞いている。英語でも"Are you saving?"と進行形が自然。ただし英語圏では貯蓄率や具体的な金額の話はかなりプライベート。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
];

const day308Keywords: KeyWord[] = [
  { en: 'take-home pay', ja: '手取り', pron: 'teik-hohm pei', example: 'My take-home pay is about 250,000 yen.', note: '税金・保険を引いた後の実際にもらえる額' },
  { en: 'deductions', ja: '天引き・控除', pron: 'di-duhk-shunz', example: 'The deductions on my pay stub are insane.', note: '給料から自動的に引かれるもの全般' },
  { en: 'overtime pay', ja: '残業代', pron: 'oh-ver-taim pei', example: 'I worked 20 hours of overtime but only got paid for 10.', note: '法定労働時間を超えた分の賃金' },
  { en: 'side hustle', ja: '副業', pron: 'said huh-sul', example: 'My side hustle brings in an extra 50,000 yen a month.', note: '本業以外の収入源。ポジティブなニュアンス' },
  { en: 'raise', ja: '昇給', pron: 'reiz', example: 'I finally got a raise after two years.', note: '動詞でも名詞でも使う。交渉して勝ち取るイメージ' },
];

// ============================================================
// Day 309: 投資の話 (social)
// ============================================================
const day309: MasterExpression[] = [
  {
    daySlot: 309,
    japanese: '株やってる？',
    english: [
      'Into stocks?',
      'Do you invest in the stock market at all?',
      'Have you ever put any money into stocks, or is that not really your thing?',
      'Kenji casually mentioned he bought some stocks last month, and suddenly everyone at the bar had an opinion. Master said he tried it once and lost money. Lisa said index funds are the only smart move. Takeshi said crypto is where it is at. I just sat there sipping my drink, trying to remember if I even have a brokerage account. I think I opened one two years ago and forgot the password.',
    ],
    context: '「やってる」は日本語だとカジュアルに「投資してる？」という意味。英語では"invest"を使うとちょっと固い。"Are you into stocks?"がカジュアル。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: 'NISAやった方がいいよ',
    english: [
      'Try a tax-free account.',
      'You should look into a tax-free investment account.',
      'If you are not using a tax-advantaged investment account yet, you are basically leaving free money on the table.',
      'Lisa spent fifteen minutes explaining tax-free investment accounts to me, and honestly it made a lot of sense. The government literally gives you a way to invest without paying taxes on the gains, and I have been ignoring it for years. She said even putting in a small amount every month adds up. I signed up on my phone right there at the bar. Master gave me a thumbs up.',
    ],
    context: '日本のNISAは英語圏にはない制度だけど、概念としてはIRA(米)やISA(英)に近い。"tax-free account"や"tax-advantaged account"で伝わる。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '元本割れが怖い',
    english: [
      'Scared of losing principal.',
      'I am terrified of losing my initial investment.',
      'The thought of putting my hard-earned money in and getting back less than I started with keeps me up at night.',
      'Every time someone talks about investing, my brain immediately goes to worst-case scenarios. What if the market crashes? What if I pick the wrong stock? What if I lose everything? Kenji told me that is exactly why index funds exist, because you spread the risk across hundreds of companies. Logically I get it, but emotionally my money feels safer sitting in my savings account earning basically zero interest.',
    ],
    context: '「元本割れ」は投資した元の金額を下回ること。英語では"lose principal"や"lose your initial investment"。日本人は元本保証を重視する傾向が強い。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '長期で持つべき',
    english: [
      'Hold long term.',
      'You should hold your investments for the long run.',
      'The key to investing is buying solid assets and holding onto them for years, not trying to time the market.',
      'Master dropped some wisdom on us last night. He said his only regret with investing was selling too early. He bought some blue-chip stocks twenty years ago, panicked during a dip, sold everything, and then watched them triple over the next decade. His advice was simple: pick good ones, hold them, and stop checking the price every day. Easier said than done when your portfolio is down fifteen percent though.',
    ],
    context: '「長期で持つ」は"hold long term"が直訳で通じる。英語では"buy and hold strategy"という投資用語もある。日本語の方がシンプルに言える珍しいケース。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '分散投資しないと',
    english: [
      'Need to diversify.',
      'You have got to spread your investments around.',
      'Putting all your money in one place is risky, so you need to diversify across different types of assets.',
      'I made the classic beginner mistake of putting all my investment money into one company because I liked their products. When their stock dropped thirty percent, I felt physically ill. Lisa sat me down and explained diversification like I was five years old. A little in domestic stocks, a little in international, some bonds, maybe some real estate funds. Basically, do not put all your eggs in one basket. I have heard that phrase a hundred times but never actually applied it to my money until now.',
    ],
    context: '「分散投資」は英語では"diversify"一語で済む。日本語は漢字4文字で概念を圧縮するのが得意だけど、英語もこの場合は一語で同じことを言える。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '配当金で生活したい',
    english: [
      'Want to live off dividends.',
      'My dream is to live entirely off dividend income.',
      'Imagine getting enough dividend payments every month that you do not even need to work for a living.',
      'Takeshi has this fantasy about retiring early and living off dividend income. He showed me his calculations on a napkin, and apparently you need about a hundred million yen invested to generate enough dividends to cover basic living expenses. I pointed out that neither of us has anywhere close to that amount, and he said that is why he is also buying lottery tickets. Classic Takeshi.',
    ],
    context: '「配当金」は株式の利益分配。英語では"dividends"。「配当金で生活」は英語圏でもFIRE(Financial Independence Retire Early)ムーブメントの夢として語られる。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '暴落したらどうする',
    english: [
      'What if it crashes?',
      'What would you do if the market crashed tomorrow?',
      'If the stock market suddenly dropped by half, would you sell everything or try to ride it out?',
      'We were having a hypothetical conversation about market crashes, and it was interesting how differently everyone responded. Master said he would buy more because everything is on sale. Lisa said she would do nothing and wait for recovery. Kenji admitted he would probably panic sell. I said I would cry first and then probably do whatever Lisa told me to do. At least I am honest about my financial decision-making process.',
    ],
    context: '「暴落」は英語では"crash"や"plunge"。日本語の「暴」の激しさは"crash"でちゃんと出る。「したらどうする」は仮定の質問で"What if...?"がぴったり。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '円安で損した',
    english: [
      'Lost money on the weak yen.',
      'The weak yen really hurt my foreign investments.',
      'When the yen dropped, the value of my overseas investments took a hit when I converted them back.',
      'I had some money in a US dollar account, and when the yen was weak I thought I was doing great because the dollar amount looked good. But then I realized I actually need yen to live in Japan, and converting back at the wrong time wiped out most of my gains. Kenji tried to explain currency hedging to me, but my eyes glazed over after about thirty seconds. Money stuff gets complicated fast.',
    ],
    context: '「円安で損した」は為替の話。英語では"weak yen"で円安を表す。日本語は「円安」「円高」で方向が明確だけど、英語は"weak/strong"で主観が入る。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '利回り何パーセント？',
    english: [
      'What is the yield?',
      'What kind of return are you getting on that?',
      'When you look at the annual yield on that investment, what percentage are we talking about?',
      'Kenji was bragging about his portfolio returns, so I asked him what his actual yield was after fees and taxes. He went quiet for a second, did some math on his phone, and then said about three percent. I told him my savings account gives me 0.001 percent, so he is still winning by a landslide. Lisa pointed out that inflation is running at about two percent, so his real return is closer to one percent. Nobody asked for that reality check, Lisa.',
    ],
    context: '「利回り」は投資のリターン率。英語では"yield"や"return"。日本語では「何パーセント」と聞くのが自然だけど、英語では"What kind of return?"とぼかすことも多い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 309,
    japanese: '投資は自己責任で',
    english: [
      'Invest at your own risk.',
      'Just remember, any investment is at your own risk.',
      'I can share what I know, but at the end of the day, any money you invest is your responsibility.',
      'Master always ends investment conversations with the same line: whatever you decide to do with your money, that is on you. He said he learned that the hard way when a friend followed his stock tip, lost money, and blamed him for it. Since then he gives general advice but never specific recommendations. Smart move honestly. Nothing ruins a friendship faster than money advice that goes wrong.',
    ],
    context: '「自己責任」は日本の投資界隈でお決まりのフレーズ。英語では"at your own risk"が定番。ただし英語圏では免責事項(disclaimer)としてもっと法的なニュアンスが強い。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
];

const day309Keywords: KeyWord[] = [
  { en: 'diversify', ja: '分散投資する', pron: 'dai-ver-suh-fai', example: 'You need to diversify your portfolio across different sectors.', note: '一つに集中せずリスクを分散させること' },
  { en: 'dividends', ja: '配当金', pron: 'div-ih-dendz', example: 'This stock pays quarterly dividends.', note: '企業が株主に分配する利益の一部' },
  { en: 'yield', ja: '利回り', pron: 'yeeld', example: 'The annual yield on this fund is about four percent.', note: '投資に対するリターンの割合' },
  { en: 'principal', ja: '元本', pron: 'prin-suh-pul', example: 'I just want to protect my principal at this point.', note: '投資した元の金額。principleと混同注意' },
  { en: 'bull market', ja: '強気相場', pron: 'bul mar-kit', example: 'Everyone feels like a genius during a bull market.', note: '株価が上がり続ける相場。反対はbear market' },
];

// ============================================================
// Day 310: ローンと借金 (social)
// ============================================================
const day310: MasterExpression[] = [
  {
    daySlot: 310,
    japanese: '住宅ローン組んだ',
    english: [
      'Got a mortgage.',
      'I just took out a mortgage for a house.',
      'I finally signed the paperwork and locked in a thirty-five year mortgage for my first home.',
      'I did it. I signed a piece of paper that says I will be paying the bank every month for the next thirty-five years. When I told Master, he congratulated me and then poured me a stiff drink. He said the first year is the scariest because you keep waking up in the middle of the night thinking about the payments. Honestly, I already started doing that before I even moved in.',
    ],
    context: '「ローン組んだ」の「組んだ」は契約を結んだ意味。英語では"took out a mortgage"が自然。"organized a loan"とは言わない。mortgage=住宅ローン専用の単語。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '金利が上がるかも',
    english: [
      'Rates might go up.',
      'There is talk about interest rates going up soon.',
      'I have been reading that the central bank might raise interest rates, and that has me worried about my loan payments.',
      'The news keeps talking about potential interest rate hikes, and every time I hear it, I do the math in my head on how much extra I would have to pay on my mortgage. Even a one percent increase means thousands more per year. Lisa said I should have locked in a fixed rate, and she is right, but at the time the variable rate was so much lower. Past me was optimistic. Present me is stressed.',
    ],
    context: '「金利が上がる」は英語では"interest rates go up"または"rates rise"。日本語は「金利」一語だけど、英語では"interest rate"と2語必要。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '繰り上げ返済したい',
    english: [
      'Want to pay it off early.',
      'I am thinking about making extra payments to pay off my loan faster.',
      'If I can scrape together some extra cash each month, I want to make additional payments toward my mortgage principal.',
      'Mina has this plan to pay off her mortgage ten years early by making extra payments whenever she gets bonus money. She showed me a graph of how much interest she would save, and it was a shocking amount. I asked her if she would rather invest that money instead since the returns might be higher than the interest rate. She said she just wants the psychological freedom of owning her place outright. I respect that.',
    ],
    context: '「繰り上げ返済」は予定より早くローンを返すこと。英語では"prepayment"や"pay off early"。日本語の方が漢字で概念が圧縮されている典型例。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: 'リボ払いはやめとけ',
    english: [
      'Avoid revolving payments.',
      'Stay away from revolving credit card payments.',
      'Whatever you do, do not use the revolving payment option on your credit card because the interest will eat you alive.',
      'Master has very few strong opinions that he shares openly, but revolving credit card payments is one of them. He said a regular at the bar years ago racked up a huge balance using revolving payments, thinking the low monthly amount was manageable. Years later he was still paying it off because the interest kept piling up. The monthly payment barely covered the interest, let alone the actual debt. Master calls it a financial trap, and I think he is right.',
    ],
    context: '「リボ払い」は和製英語的。英語では"revolving payments"や"revolving credit"。日本のクレカのリボ払いは英語圏のrevolving creditとほぼ同じ仕組みだけど、名前の認知度が違う。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '借金あるの？',
    english: [
      'Got any debt?',
      'Are you carrying any debt right now?',
      'This might be a personal question, but do you have any outstanding debt that you are dealing with?',
      'Nobody wants to talk about debt, but at the izakaya after a few drinks, people get honest. Takeshi admitted he still has student loan debt. Kenji has his mortgage. I have a car loan that I am slowly chipping away at. Lisa is the only one who said she is debt-free, and we all stared at her like she was some kind of mythical creature. She said the trick is never buying anything you cannot pay for in cash. Easy to say, hard to do.',
    ],
    context: '「借金」は日本語ではネガティブなイメージが強い。英語の"debt"はもう少しニュートラルで、住宅ローンも学生ローンも全部"debt"。日本語ほどの恥ずかしさは薄い。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '連帯保証人にはなるな',
    english: [
      'Never co-sign a loan.',
      'Do not ever agree to be a co-signer on someone else is loan.',
      'No matter who asks you, never put your name down as a guarantor on another person is debt.',
      'This is one of those life lessons that Master drilled into us. He said being a co-signer means you are promising to pay if the other person cannot. And people who need co-signers usually need them for a reason. His exact words were: if you want to help someone financially, give them what you can afford to lose. Do not tie your name to their debt. I have never heard him speak so seriously about anything.',
    ],
    context: '「連帯保証人」は日本特有の制度で問題も多い。英語では"co-signer"や"guarantor"。英語圏にも似た制度はあるが、日本ほど気軽に頼まれることは少ない。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '奨学金まだ返してる',
    english: [
      'Still paying student loans.',
      'I am still paying off my student loans from college.',
      'It has been years since I graduated, and I am still making monthly payments on my student loans.',
      'I graduated eight years ago and I am still making student loan payments. Every month, like clockwork, money leaves my account for an education I barely remember. The annoying part is that in Japan they call it a scholarship, but it is really just a loan with a nice name. At least in English they are honest about calling it a student loan. Kenji finished paying his off last year and threw a party. I have about three more years to go.',
    ],
    context: '日本の「奨学金」は多くが貸与型で実質ローン。英語の"scholarship"は返済不要の給付型。日本の奨学金は"student loan"と訳すのが正確。この名称のギャップは結構有名。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '審査通るかな',
    english: [
      'Think I will get approved?',
      'Do you think my loan application will go through?',
      'I submitted my loan application last week and I have been anxiously waiting to hear if I got approved.',
      'The waiting is the worst part. You fill out all the paperwork, hand over your pay stubs and tax documents, and then you just sit there refreshing your email. Mina said the approval process took about two weeks for her, and she was a nervous wreck the entire time. What if they check my credit card history and see all those late-night online shopping purchases? Do they judge you for that? I hope not.',
    ],
    context: '「審査」はローンの審査。英語では"approval"や"get approved"。日本語の「通る」は審査をパスする意味で、英語の"go through"と同じ感覚。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '頭金いくら用意した？',
    english: [
      'How much for the down payment?',
      'How much did you put down as a down payment?',
      'When you bought your place, how much money did you have saved up for the down payment?',
      'The down payment conversation is always depressing. Lisa asked Kenji how much he put down on his house, and he said about twenty percent of the purchase price. Everyone at the table went quiet and did the mental math. For a typical apartment in Tokyo, twenty percent is a terrifying number. Takeshi whispered that he has been saving for five years and is still only at about ten percent. The housing market waits for no one.',
    ],
    context: '「頭金」は最初に払うまとまったお金。英語では"down payment"。日本語の「頭」は最初という意味で、英語の"down"は手付けを「置く」イメージ。発想が違うけど同じ概念。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 310,
    japanese: '返済終わったらお祝いしよう',
    english: [
      'Let us celebrate when you pay it off.',
      'When you make that final payment, we are throwing a party.',
      'The day you finish paying off that loan, you had better come straight to this bar so we can celebrate properly.',
      'Master has this tradition where whenever a regular finishes paying off a major debt, he opens a special bottle he keeps behind the counter. He says clearing debt is one of the best feelings in life and it deserves to be marked. Kenji said his mortgage payoff party is scheduled for 2059, so Master better still be around. Master just laughed and said the bar will outlive all of us.',
    ],
    context: '「返済終わったら」は完了の仮定。英語では"when you pay it off"で未来の確定イベントとして扱う。"pay off"はローンを完済する定番表現。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
];

const day310Keywords: KeyWord[] = [
  { en: 'mortgage', ja: '住宅ローン', pron: 'mor-gij', example: 'We just signed a thirty-year mortgage.', note: '住宅専用のローン。"mort"はラテン語で死を意味する(死ぬまで払う的な)' },
  { en: 'down payment', ja: '頭金', pron: 'daun pei-ment', example: 'We need to save up for a bigger down payment.', note: '購入時に最初に払うまとまった金額' },
  { en: 'interest rate', ja: '金利', pron: 'in-trest reit', example: 'The interest rate on this loan is 1.5 percent.', note: '借りたお金に対して払う利息の割合' },
  { en: 'co-signer', ja: '連帯保証人', pron: 'koh-sai-ner', example: 'My parents had to co-sign my first car loan.', note: '借り手が払えない場合に代わりに返済する人' },
  { en: 'pay off', ja: '完済する', pron: 'pei awf', example: 'I finally paid off my student loans last month.', note: 'ローンや借金を全額返し終えること' },
];

// ============================================================
// Day 311: 税金 (social)
// ============================================================
const day311: MasterExpression[] = [
  {
    daySlot: 311,
    japanese: '確定申告めんどくさい',
    english: [
      'Tax filing is a pain.',
      'Doing my tax return is such a hassle every year.',
      'I dread tax season because gathering all the documents and filling out the forms takes forever.',
      'Every year I tell myself I am going to be organized and do my taxes early. Every year I end up scrambling at the last minute with receipts spread all over my kitchen table. Lisa does hers in January like a responsible adult. I do mine the night before the deadline while stress-eating convenience store onigiri. Master said he hired an accountant years ago and never looked back. Must be nice to have that option.',
    ],
    context: '「確定申告」は英語では"tax return"や"tax filing"。日本では会社員は年末調整で済むことが多いが、英語圏では全員が確定申告するのが基本。めんどくさいは万国共通。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '控除使った？',
    english: [
      'Use any deductions?',
      'Did you claim any tax deductions this year?',
      'When you filed your taxes, did you take advantage of all the deductions you are eligible for?',
      'Kenji asked me if I claimed the medical expense deduction, and I had no idea that was even a thing. Apparently if your medical bills for the year exceed a certain amount, you can deduct them from your taxable income. I spent two hours going through old receipts and found enough to qualify. It is not a huge amount, but it felt like finding money in an old jacket pocket. Lisa said there are tons of deductions most people miss because nobody teaches this stuff in school.',
    ],
    context: '「控除」は税金から差し引ける金額。英語では"deduction"(所得から引く)と"credit"(税金から直接引く)の2種類がある。日本語ではどちらも「控除」。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '住民税高すぎ',
    english: [
      'Resident tax is too high.',
      'My resident tax bill is way too high.',
      'When I saw the amount they are charging me for local resident tax this year, I nearly fell off my chair.',
      'The thing about resident tax in Japan is that it hits you the year after you earned the income. So if you had a great year and then quit your job, you still owe a massive resident tax bill based on last year is salary. Takeshi learned this the hard way when he switched jobs and suddenly got a bill for several hundred thousand yen. He said it felt like being punished for doing well. The system makes sense mathematically but emotionally it is brutal.',
    ],
    context: '「住民税」は市区町村に払う地方税。英語圏では"resident tax"に直接対応するものがない国も多い。"local tax"や"municipal tax"が近い。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: 'ふるさと納税やってる？',
    english: [
      'Do you do hometown tax?',
      'Have you tried the hometown tax donation program?',
      'Are you using that system where you donate to regional towns and get tax deductions plus gifts in return?',
      'Mina is obsessed with the hometown tax program. She spends hours on the website comparing gifts from different municipalities. Last year she got premium beef, rice, a nice set of towels, and a box of mangoes, all while reducing her tax bill. She tried explaining the math to me and it basically works out to getting free stuff as long as you stay within your income limit. I signed up and immediately ordered the most expensive crab I could find. No regrets.',
    ],
    context: '「ふるさと納税」は日本独自の制度で英語に直訳が難しい。"hometown tax donation"が一般的な訳だけど、実態は「寄付して返礼品もらって税金減る」という制度。英語圏の人に説明すると毎回驚かれる。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '消費税また上がるの？',
    english: [
      'Sales tax going up again?',
      'Are they really raising the consumption tax again?',
      'I just heard a rumor that the government is considering another increase in the consumption tax rate.',
      'Every few years the government talks about raising the consumption tax, and every time people freak out. Last time it went up, I remember everyone panic-buying appliances and electronics the day before the increase. Takeshi bought a new TV he did not even need just because he wanted to save the two percent. He ended up returning it a month later. The irony is that the return process was such a hassle that he probably lost more money in time and transportation than he saved.',
    ],
    context: '「消費税」は英語では"consumption tax"または"sales tax"。日本は全品目一律(軽減税率除く)だが、アメリカは州ごとに税率が違い、さらに食品非課税の州も多い。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '経費で落ちる？',
    english: [
      'Can I expense this?',
      'Is this something I can write off as a business expense?',
      'If I use this for work, can I claim it as a deductible expense on my taxes?',
      'Kenji started a small side business and now he tries to expense everything. Dinner at the izakaya? Business meeting. New laptop? Work equipment. Even his gym membership because he claims physical fitness improves his productivity. I told him the tax office might not agree with that logic, but he said as long as he can explain the business purpose, he is fine. Master asked if he could expense the bar tab, and Kenji actually considered it for a second before saying no.',
    ],
    context: '「経費で落ちる」の「落ちる」は経費として処理できるという意味。英語では"write off"や"expense it"がカジュアル表現。「落ちる」と"write off"、どちらも「消す」イメージで面白い共通点。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '年末調整出した？',
    english: [
      'Submitted your year-end adjustment?',
      'Did you hand in your year-end tax adjustment forms yet?',
      'Have you submitted all those insurance certificates and forms for the year-end tax adjustment at work?',
      'Every November my company sends around the year-end adjustment forms, and every November I stare at them like they are written in ancient Greek. Which insurance certificate goes where? What is a dependent deduction? Am I supposed to include my iDeCo contributions on this form or a different one? Yuki usually helps me fill them out because she actually reads the instructions. Without her I would probably just write my name and hope for the best.',
    ],
    context: '「年末調整」は会社員が会社を通じて税金を精算する日本独自の制度。英語圏にはこの仕組みがないので直訳は通じにくい。"employer year-end tax adjustment"と説明的に言うしかない。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '税金の使い道が気になる',
    english: [
      'Where do my taxes go?',
      'I want to know where my tax money is actually being spent.',
      'When I pay this much in taxes every year, I feel like I deserve to know exactly how that money is being used.',
      'I looked up the government budget breakdown online, and honestly some of the numbers are so big they stop meaning anything. Billions of yen here, trillions there. Lisa said the key is looking at percentages, not absolute numbers. About thirty percent goes to social security, a big chunk to debt repayment, and then education, defense, and public works split the rest. I just wish I could see how my specific tax yen was spent. Like a receipt. That would be satisfying.',
    ],
    context: '「使い道」は使い方の意味。英語では"how taxes are spent"や"where taxes go"。日本語の「道」が入ることで方向性や目的のニュアンスが出るけど、英語にはその詩的さはない。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '節税対策してる？',
    english: [
      'Doing any tax planning?',
      'Are you taking any steps to reduce your tax burden?',
      'Have you looked into legal ways to minimize the amount of tax you pay each year?',
      'There is a huge difference between tax evasion and tax planning, and Master made sure we all understood that. Tax evasion is illegal. Tax planning is using the rules the government created to your advantage. Things like retirement account contributions, insurance deductions, and charitable donations all reduce your taxable income legally. He said a good accountant pays for themselves many times over. Coming from a bar owner, that advice carries weight.',
    ],
    context: '「節税」は合法的に税金を減らすこと。英語では"tax planning"や"tax optimization"。「脱税」(tax evasion)とは全く違う。この区別は日本語でも英語でも重要。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 311,
    japanese: '還付金あった？',
    english: [
      'Get a refund?',
      'Did you get any money back from your tax return?',
      'After filing your taxes, did you end up getting a refund or did you owe more?',
      'The best day of the year for me is when the tax refund hits my bank account. It is like getting a surprise bonus, even though it is actually my own money that I overpaid. This year I got about thirty thousand yen back, which immediately went to a nice dinner. Lisa said the smart thing to do would be to invest it, but I told her that treating myself after surviving tax season is also a valid investment. An investment in my happiness. She did not buy it.',
    ],
    context: '「還付金」は払いすぎた税金が戻ってくること。英語では"tax refund"。日本語の「還付」は固い言葉だけど、英語の"refund"は日常的に使う普通の単語。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
];

const day311Keywords: KeyWord[] = [
  { en: 'tax return', ja: '確定申告', pron: 'taks ri-turn', example: 'I need to file my tax return before the deadline.', note: '年間の所得と税金を計算して申告すること' },
  { en: 'deduction', ja: '控除', pron: 'di-duhk-shun', example: 'Medical expenses over a certain amount qualify as a deduction.', note: '課税所得から差し引ける金額' },
  { en: 'write off', ja: '経費で落とす', pron: 'rait awf', example: 'I can write off this laptop as a business expense.', note: '事業経費として税金から控除すること' },
  { en: 'tax refund', ja: '還付金', pron: 'taks ri-fund', example: 'My tax refund was bigger than I expected this year.', note: '払いすぎた税金が戻ってくるお金' },
  { en: 'consumption tax', ja: '消費税', pron: 'kun-sump-shun taks', example: 'The consumption tax on this item is ten percent.', note: '商品やサービスの購入時にかかる税金' },
];

// ============================================================
// Day 312: 保証と返品 (request)
// ============================================================
const day312: MasterExpression[] = [
  {
    daySlot: 312,
    japanese: 'これ返品できますか？',
    english: [
      'Can I return this?',
      'Is it possible to return this item?',
      'I bought this recently and it is not quite what I expected, so I was wondering if I could return it.',
      'I bought a jacket online that looked amazing in the photos but in person it looked like something my grandfather would wear. I went to the store to return it and the clerk asked me if there was anything wrong with it. I did not want to say it was ugly, so I just said it did not fit right. She processed the return with a smile, no questions asked. In Japan, returns can be awkward because there is this unspoken pressure to keep what you bought. In English-speaking countries, returning stuff is completely normal.',
    ],
    context: '「返品できますか」は日本では少し申し訳なさそうに聞く傾向がある。英語では"Can I return this?"はごく普通の質問で、罪悪感ゼロ。文化的に返品は権利として認識されている。',
    character: 'yuki',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '保証期間内です',
    english: [
      'Still under warranty.',
      'This is still covered under the warranty period.',
      'I checked the purchase date and this product is definitely still within the manufacturer is warranty period.',
      'My headphones stopped working after four months, and I was dreading dealing with customer service. But then I remembered they came with a one-year warranty. I dug up the receipt, called the company, and they said they would send me a replacement. The whole process took about five minutes. Kenji said I was lucky because he once tried to use a warranty and they found a tiny scratch and used it as an excuse to deny the claim. Always keep your stuff in the original packaging, people.',
    ],
    context: '「保証期間内」は英語では"under warranty"。日本語は「期間内」と時間を強調するけど、英語は"under"で「保護の傘の下にある」というイメージ。',
    character: 'mina',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: 'レシートなくした',
    english: [
      'Lost the receipt.',
      'I cannot find my receipt anywhere.',
      'I know I should have kept the receipt, but I must have thrown it away and now I need it for the return.',
      'The one time I actually need a receipt, of course I cannot find it. I tore apart my wallet, checked every pocket, went through the recycling bin, nothing. Lisa told me to always take photos of receipts right after buying anything expensive. She has a whole album on her phone organized by month. I called her paranoid once, but right now she looks like a genius and I look like someone who is stuck with a broken blender forever.',
    ],
    context: '「なくした」は英語では"lost it"。でもレシートを「なくす」のは日本でも英語圏でもあるある。英語では"No receipt, no return"と言われることも多い。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '初期不良だと思います',
    english: [
      'I think it is defective.',
      'This seems to have a factory defect.',
      'I just took this out of the box and it is not working properly, so I believe it came with a manufacturing defect.',
      'I bought a brand new coffee maker, set it up following all the instructions, and when I turned it on it made a horrible grinding noise and leaked water everywhere. I called customer service and said I think it has a defect. They asked me to troubleshoot a few things, which I had already tried, and then agreed to replace it. The replacement arrived in two days and works perfectly. Sometimes you just get unlucky with manufacturing. It happens.',
    ],
    context: '「初期不良」は英語では"factory defect"や"manufacturing defect"。日本語の「初期」(初期=最初)は時間を、英語の"factory"は場所を基準にしている。視点の違いが面白い。',
    character: 'lisa',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '交換してもらえますか',
    english: [
      'Can I get an exchange?',
      'Would it be possible to exchange this for a different one?',
      'Instead of a refund, I would rather just swap this for a working unit or a different size if you have one.',
      'I bought shoes online and they were a half size too small. Going to the store to exchange them was surprisingly painless. The staff member measured my feet, brought out the right size, and even suggested a slightly different model that might be more comfortable. In Japan, exchanges feel smoother than returns because you are still giving them business. The energy in the interaction is totally different. You are not rejecting their product, just adjusting the fit.',
    ],
    context: '「交換してもらえますか」の「もらえますか」は丁寧な依頼。英語では"Can I get an exchange?"でシンプル。日本語は相手に恩恵を求める形だけど、英語は自分の行動として表現する。',
    character: 'yuki',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '返金お願いします',
    english: [
      'I would like a refund.',
      'Could I please get a refund for this?',
      'I have decided I do not want a replacement, so I would like to request a full refund if possible.',
      'The store tried to offer me store credit instead of a refund, and I politely but firmly said I wanted my money back. Lisa taught me that trick. She said in English you just say "I would like a refund" and keep repeating it calmly until they process it. No need to apologize or explain yourself excessively. In Japan I always feel like I need to justify why I want my money back. In English, the phrase itself carries enough authority. Just state what you want clearly.',
    ],
    context: '「返金お願いします」は日本語では「お願い」で柔らかくしている。英語の"I would like a refund"も丁寧だけど、日本語ほど遠回りではない。要求としての強さが違う。',
    character: 'lisa',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '延長保証入る？',
    english: [
      'Get the extended warranty?',
      'Are you going to purchase the extended warranty?',
      'The cashier is asking if you want to add the extended warranty for an extra two years of coverage.',
      'Every time I buy electronics, the cashier asks if I want the extended warranty. Takeshi always says yes because he breaks everything. I usually say no because the cost of the warranty is almost as much as just buying a replacement if it breaks. Master said the real question is whether the peace of mind is worth the price. For a cheap item, no. For an expensive laptop, maybe. It depends on how clumsy you are, and I am very clumsy.',
    ],
    context: '「延長保証」は英語では"extended warranty"。日本の家電量販店では積極的に勧められる。英語圏でも同じだけど、"Do you want the extended warranty?"は断るのが定番になっている。',
    character: 'mina',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '返品期限いつまで？',
    english: [
      'When is the return deadline?',
      'What is the return window on this?',
      'Could you tell me how many days I have from the purchase date to return this item if needed?',
      'I always forget to ask about the return policy before buying things, and then I end up with stuff I cannot bring back. Mina taught me to always ask about the return window at checkout. Some stores give you thirty days, some give you fourteen, and some only give you seven. Online purchases usually have longer windows, which is nice. The worst is when you buy something on sale and then notice the tiny print saying all sale items are final. Check the policy, people.',
    ],
    context: '「返品期限」は英語では"return window"や"return period"が自然。"deadline"でも通じるけど、"window"の方がナチュラル。「窓」が開いている間に返せる、というイメージ。',
    character: 'kenji',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '修理に出したい',
    english: [
      'I want to get it repaired.',
      'I need to send this in for repair.',
      'Rather than returning it, I would like to see if you can repair this since I really like the product.',
      'My watch stopped ticking after I accidentally wore it in the shower, which is entirely my fault since it is not waterproof. But I love this watch, so I took it to the store and asked about repair options. They said they could send it to the manufacturer, but it would take three to four weeks and cost about half the price of a new one. I said yes without hesitation because this watch has sentimental value. Sometimes fixing something is worth more than replacing it.',
    ],
    context: '「修理に出す」の「出す」は外部に送る意味。英語では"send in for repair"や"get it repaired"。日本語の「出す」の気軽さが英語だと少し長くなる。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02',
  },
  {
    daySlot: 312,
    japanese: '不良品にあたった',
    english: [
      'Got a dud.',
      'I ended up with a defective unit.',
      'Out of all the products on the shelf, I managed to grab the one that turned out to be a dud.',
      'There is nothing more disappointing than excitedly opening a new product only to discover it does not work. Mina bought a new pair of wireless earbuds last week, and the right one had no sound from the moment she turned them on. She called it bad luck, but Lisa said it is just statistics. With mass production, some percentage of products will always have defects. That does not make it less annoying when you are the one holding the broken one though. She got a replacement the next day at least.',
    ],
    context: '「不良品にあたった」の「あたった」は運悪く引き当てたニュアンス。英語の"got a dud"の"dud"は不発弾が語源で、期待外れ・ハズレの意味。カジュアルで使いやすい。',
    character: 'mina',
    category: 'request',
    month: '2027-02',
  },
];

const day312Keywords: KeyWord[] = [
  { en: 'warranty', ja: '保証', pron: 'wor-un-tee', example: 'This laptop comes with a two-year warranty.', note: '製品の品質を保証する契約。guaranteeより製品寄り' },
  { en: 'refund', ja: '返金', pron: 'ree-fund', example: 'I would like a full refund please.', note: '支払った金額を返してもらうこと' },
  { en: 'defective', ja: '不良品の', pron: 'di-fek-tiv', example: 'This item appears to be defective out of the box.', note: '製造時点で問題がある状態' },
  { en: 'return policy', ja: '返品ポリシー', pron: 'ri-turn pol-uh-see', example: 'What is your return policy on electronics?', note: '店の返品に関するルール・条件' },
  { en: 'exchange', ja: '交換', pron: 'iks-cheinj', example: 'I would like to exchange this for a larger size.', note: '購入品を別の商品に取り替えること' },
];

// ============================================================
// Day 313: サブスクリプション (shopping)
// ============================================================
const day313: MasterExpression[] = [
  {
    daySlot: 313,
    japanese: '月額いくら？',
    english: [
      'How much a month?',
      'What is the monthly fee for that?',
      'If I sign up for this service, how much am I going to be charged every month?',
      'I was looking at a new streaming service and the price seemed reasonable until I realized I am already paying for four other subscriptions. Kenji helped me add them all up, and the total was way more than I expected. Individually each one feels cheap, but together they add up to a significant chunk of my monthly budget. It is like death by a thousand cuts, except each cut is only 500 yen so you do not notice until you are broke.',
    ],
    context: '「月額」は毎月の料金。英語では"monthly fee"や"per month"。日本語は「月額」の2文字で済むけど、英語は"How much is it per month?"と少し長くなる。',
    character: 'yuki',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '無料トライアルある？',
    english: [
      'Is there a free trial?',
      'Do they offer a free trial period?',
      'Before I commit to paying, can I try the service for free for a while to see if it is worth it?',
      'I am a professional free trial user at this point. I sign up, set a reminder on my phone for the day before it ends, and cancel right before they charge me. Lisa says this is morally questionable, but I say it is just good consumer behavior. The problem is when I forget to cancel. That has happened three times now. Three times I paid for a month of something I did not even use. The companies know exactly what they are doing with those trials.',
    ],
    context: '「無料トライアル」はほぼ英語そのまま。日本語でも「トライアル」として定着している。ただし英語では"free trial"の後に自動課金されるのが一般的で、解約忘れを狙うビジネスモデル。',
    character: 'takeshi',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '解約したいんですけど',
    english: [
      'I want to cancel.',
      'I would like to cancel my subscription.',
      'I have decided I do not need this service anymore, so I would like to go ahead and cancel my subscription.',
      'Canceling a subscription should be simple, but some companies make it intentionally difficult. I tried to cancel a gym membership online and they made me call a phone number that was only open during business hours. When I finally got through, they offered me a discounted rate, then a free month, then asked me why I was leaving three different ways. Mina said that is called a "dark pattern" in design. Companies make it easy to sign up and hard to leave. It should be illegal.',
    ],
    context: '「解約したいんですけど」の「んですけど」は理由を含む柔らかい表現。英語では"I would like to cancel"とストレートに言う。日本語みたいに前置きなしでも失礼にならない。',
    character: 'mina',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '自動更新されてた',
    english: [
      'It auto-renewed on me.',
      'I just realized my subscription auto-renewed without me noticing.',
      'I completely forgot about the auto-renewal setting, and they charged my credit card for another year.',
      'I got a notification from my bank about a charge I did not recognize. After some investigation, it turned out to be an annual subscription I signed up for last year and completely forgot about. It auto-renewed and charged me for the full year. I called them and asked for a refund since I had not used the service in months. They gave me a partial refund but kept two months worth. The lesson is to always check your credit card statement every month. Or at least set calendar reminders for renewal dates.',
    ],
    context: '「自動更新されてた」の受身形は「勝手にやられた」感がある。英語でも"It auto-renewed on me"の"on me"で同じ「やられた」ニュアンスを出せる。',
    character: 'kenji',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '年払いの方がお得？',
    english: [
      'Annual plan cheaper?',
      'Is it cheaper if I pay for the whole year upfront?',
      'I am looking at the pricing options and wondering if the annual plan works out to be a better deal than paying monthly.',
      'Most subscription services offer a discount if you pay annually instead of monthly. Usually it works out to getting two months free. The catch is you have to commit for the whole year. Takeshi always goes monthly because he says he gets bored of things quickly. Lisa always goes annual because she does the math and hates wasting money. I am somewhere in between. If I have used something for three months and still like it, I will switch to the annual plan. That feels like a safe middle ground.',
    ],
    context: '「年払い」は英語では"annual plan"や"yearly subscription"。「お得」は"cheaper"や"better deal"。日本語の「お得」はポジティブだけど、英語の"cheaper"はちょっと直接的。',
    character: 'lisa',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: 'サブスク貧乏だわ',
    english: [
      'Subscriptions are draining me.',
      'All these subscriptions are bleeding my wallet dry.',
      'I added up all my monthly subscriptions and realized I am spending a small fortune without even noticing.',
      'I did an audit of all my subscriptions last weekend and the results were horrifying. Two streaming services, music, cloud storage, a news site, a fitness app I never open, a language learning app I used once, and a premium version of a note-taking app. Total: about fifteen thousand yen a month. That is almost two hundred thousand yen a year. On apps. Mina looked at my list and immediately made me cancel four of them on the spot. I felt lighter already.',
    ],
    context: '「サブスク貧乏」は日本語のネット用語で、サブスクに金を使いすぎて貧乏になること。英語にはピッタリの一語がない。"subscription fatigue"が近いけどニュアンスが少し違う。',
    character: 'takeshi',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: 'ファミリープランある？',
    english: [
      'Got a family plan?',
      'Do they have a family plan option?',
      'I was wondering if this service offers a family plan where multiple people can share one subscription.',
      'Kenji figured out that if five of us split a family plan for a streaming service, we each pay about three hundred yen a month instead of a thousand. He set it up and added me, Lisa, Takeshi, and Mina. It has been working great except that the algorithm now recommends a bizarre mix of action movies, cooking shows, anime, and British detective dramas based on all our viewing habits. My recommendations page looks like five different people are using the same account. Which is exactly what is happening.',
    ],
    context: '「ファミリープラン」は英語そのまま。ただし英語圏では"family plan"を友達同士で共有するのはグレーゾーンで、最近は取り締まりが厳しくなっている。',
    character: 'yuki',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '広告なしプランにする',
    english: [
      'Going ad-free.',
      'I am upgrading to the ad-free plan.',
      'I cannot deal with the ads anymore, so I am switching to the premium plan that removes all advertisements.',
      'I lasted exactly two weeks on the free tier of a streaming service before the ads broke me. Every five minutes, the same three commercials. Mina said I should just be patient, but my patience ran out during the fourth car insurance ad in one sitting. I upgraded to the ad-free plan that night and I have zero regrets. Master said he admires my commitment to convenience. I told him it is not convenience, it is sanity. Some things are worth paying for, and not watching the same ad forty times is one of them.',
    ],
    context: '「広告なしプラン」は英語では"ad-free plan"。日本語では「広告なし」と否定形で言うけど、英語は"ad-free"と「free(から解放)」で表現する。自由になるイメージ。',
    character: 'kenji',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: 'プラン変更したい',
    english: [
      'I want to change my plan.',
      'Can I switch to a different subscription plan?',
      'I have been looking at the other plan options and I think I would like to downgrade to the cheaper tier.',
      'I signed up for the premium tier of a cloud storage service because I thought I needed the space. Six months later I have used about five percent of it. The basic plan would have been more than enough. I went to their website to downgrade and they hit me with a pop-up asking if I was sure, showing me all the features I would lose. It felt like breaking up with someone who keeps listing their good qualities. Yes, I know you have unlimited storage. I just do not need it.',
    ],
    context: '「プラン変更」は英語では"change my plan"や"switch plans"。日本語では「変更」一語だけど、アップグレードかダウングレードかは英語では区別して言うことが多い。',
    character: 'mina',
    category: 'shopping',
    month: '2027-02',
  },
  {
    daySlot: 313,
    japanese: '元取れてる？',
    english: [
      'Getting your money is worth?',
      'Do you feel like you are getting your money is worth from that subscription?',
      'When you think about how much you pay versus how much you actually use it, do you feel like the subscription is worth the cost?',
      'Lisa asked me straight up if I was getting my money is worth from all my subscriptions, and I had to really think about it. The streaming service, yes, I use it almost every day. The music app, definitely. The fitness app? I opened it twice in January and not once since. The language learning app? I did one lesson and forgot about it. She said the rule of thumb is if you would not buy it again today at the same price, cancel it. That is a good test. I failed it on three out of six subscriptions.',
    ],
    context: '「元取れてる」は投資した分の価値があるかという意味。英語では"getting your money is worth"が定番。日本語の「元を取る」は賭け事由来の表現で、英語より少しギャンブル的なニュアンスがある。',
    character: 'lisa',
    category: 'shopping',
    month: '2027-02',
  },
];

const day313Keywords: KeyWord[] = [
  { en: 'subscription', ja: 'サブスクリプション', pron: 'sub-skrip-shun', example: 'I have too many monthly subscriptions.', note: '定額制で定期的に課金されるサービス' },
  { en: 'auto-renew', ja: '自動更新', pron: 'aw-toh ri-noo', example: 'Make sure to turn off auto-renew before the trial ends.', note: '契約が自動的に延長される仕組み' },
  { en: 'cancel', ja: '解約する', pron: 'kan-sul', example: 'I need to cancel before they charge me again.', note: 'サービスの利用をやめること' },
  { en: 'tier', ja: 'プラン段階', pron: 'teer', example: 'The premium tier includes ad-free streaming.', note: 'サービスのランク・段階(free/basic/premiumなど)' },
  { en: 'ad-free', ja: '広告なし', pron: 'ad-free', example: 'The ad-free version costs twice as much.', note: '広告が表示されない有料プラン' },
];

// ============================================================
// Day 314: 家計管理 (social)
// ============================================================
const day314: MasterExpression[] = [
  {
    daySlot: 314,
    japanese: '家計簿つけてる？',
    english: [
      'Track your spending?',
      'Do you keep track of your household expenses?',
      'Are you one of those organized people who actually records every purchase in a budget tracker?',
      'Mina showed us her budgeting app on her phone, and it was color-coded and categorized with charts and everything. She knows exactly how much she spent on groceries, transportation, dining out, and entertainment for every month going back two years. Meanwhile, I check my bank balance and if there is money in it, I assume I am doing fine. Kenji said he tried keeping a budget once and gave up after a week because he did not want to see how much he spends on convenience store snacks.',
    ],
    context: '「家計簿つけてる」の「つけてる」は記録をつけるという意味。英語では"track your spending"や"keep a budget"が自然。日本語の「家計簿」は帳簿のイメージだけど、今はアプリが主流。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '今月赤字だわ',
    english: [
      'In the red this month.',
      'I am in the red this month, spent more than I earned.',
      'I just checked my budget and I have officially spent more than my income this month, so I am in the red.',
      'When I said I was in the red, Takeshi asked how that was possible since we just got paid two weeks ago. I listed the reasons: car inspection, dentist appointment, a friend is wedding gift, and a broken washing machine. All in the same month. Sometimes life just piles on. Master poured me a drink on the house and said next month will be better. I hope he is right, but next month I have to pay my insurance premium, so I am not optimistic.',
    ],
    context: '「赤字」は支出が収入を超えた状態。英語では"in the red"で同じく赤。面白いことに、日本語も英語も赤=マイナスで一致している。会計の帳簿で赤インクを使う慣習が共通。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '食費抑えないと',
    english: [
      'Need to cut food costs.',
      'I really have to cut back on my food spending.',
      'My grocery and dining out expenses are way over budget, so I need to seriously start cooking more at home.',
      'Every time I try to save money, food is the first thing I look at. But then I realize that cooking every meal takes time and energy that I do not always have after work. Lisa suggested meal prepping on Sundays, where you cook everything for the week in one session. I tried it once and it was honestly life changing. I saved about twenty thousand yen that month just by not buying lunch every day. The problem is keeping it up. I lasted three weeks.',
    ],
    context: '「食費」は英語では"food expenses"や"grocery budget"。「抑えないと」は自分への義務感。英語では"need to cut back on"で同じプレッシャーを表現する。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '固定費見直そう',
    english: [
      'Review the fixed costs.',
      'Let us take a look at our fixed monthly expenses.',
      'I think it is time we sat down and reviewed all our recurring fixed costs to see what we can reduce.',
      'Lisa gave me the best financial advice I have ever gotten: before you try to save on variable expenses like food and entertainment, review your fixed costs first. Phone plan, internet, insurance, subscriptions. She said most people are overpaying on at least two of those because they signed up years ago and never switched. I checked my phone plan and found one that was three thousand yen cheaper per month. That is thirty-six thousand yen a year for literally five minutes of work switching providers.',
    ],
    context: '「固定費」は毎月同額かかる費用。英語では"fixed costs"や"fixed expenses"。「見直す」は"review"だけど、日本語の「見直す」には改善する意図が含まれる。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: 'お小遣い制つらい',
    english: [
      'Allowance system is tough.',
      'Being on an allowance from my wife is rough.',
      'My wife controls the household budget and gives me a fixed monthly allowance, and it is never quite enough.',
      'In Japan, it is pretty common for one spouse to manage all the household finances and give the other an allowance. Kenji is on this system, and he gets thirty thousand yen a month for everything personal: lunches, drinks, hobbies, everything. That sounds okay until you realize one night at the izakaya can eat up a third of it. He said the worst part is having to ask permission for anything outside the budget. Master said he went through the same thing when he was married and it taught him to appreciate every yen.',
    ],
    context: '「お小遣い制」は日本の家庭の定番。英語圏では"allowance"は子どものお小遣いのイメージが強く、大人が配偶者からもらうのは文化的に珍しい。説明しないと通じないことも多い。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: 'キャッシュレスにしたら管理しやすい',
    english: [
      'Cashless makes tracking easier.',
      'Going cashless has made it so much easier to track my spending.',
      'Since I switched to paying for everything with my phone or card, I can see exactly where my money goes through the app.',
      'I used to be a cash person because I thought physically seeing money leave my wallet would help me spend less. Turns out the opposite is true. With cash, I have no record of where it went. Mina convinced me to go cashless, and now every transaction shows up in my banking app automatically. I can see in real time that I spent eight hundred yen at a vending machine at two in the morning. Having that data is powerful, even if the data reveals embarrassing habits.',
    ],
    context: '「キャッシュレス」は英語そのまま。ただし日本はまだ現金文化が根強い。英語圏、特に北欧では完全キャッシュレスの店も多い。「管理しやすい」は"easier to track"が自然。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '先取り貯金してる',
    english: [
      'I save first, spend later.',
      'I set up automatic savings that come out right when I get paid.',
      'I use the pay-yourself-first method where money goes straight into savings before I can spend it.',
      'The best trick I learned from Lisa is the pay-yourself-first approach. On payday, before I do anything else, a fixed amount automatically transfers to my savings account. Whatever is left in my main account is what I get to spend that month. It removes the willpower element entirely. I do not have to decide to save because it happens automatically. Since I started doing this, my savings have grown more in six months than they did in the previous two years. Simple but effective.',
    ],
    context: '「先取り貯金」は給料から先に貯金分を取る方法。英語では"pay yourself first"という有名な個人財務の格言がある。日本語の方が直訳的で分かりやすい。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '衝動買いやめたい',
    english: [
      'Want to stop impulse buying.',
      'I really need to stop making impulse purchases.',
      'Every time I open a shopping app late at night, I end up buying things I do not need, and I want to break that habit.',
      'Late-night online shopping is my weakness. Something about being tired makes my judgment disappear, and suddenly buying a fancy kitchen gadget I will use once feels like a great idea. Takeshi suggested the 24-hour rule: if you want something, put it in the cart but do not buy it. Wait a day. If you still want it, go ahead. I tried it, and about seventy percent of the time I realized I did not actually need it. The other thirty percent I bought anyway, but at least I reduced the damage.',
    ],
    context: '「衝動買い」は英語では"impulse buying"や"impulse purchase"。どちらの言語でも「衝動」(impulse)を使うのが面白い。人間の行動パターンは言語を超えて同じ。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '生活防衛資金って必要？',
    english: [
      'Do I need an emergency fund?',
      'How important is it to have an emergency fund set aside?',
      'Everyone keeps telling me I need three to six months of living expenses saved up as an emergency fund, but is that really necessary?',
      'Master told us a story about how his old restaurant flooded and he had to close for three months for repairs. If he had not had an emergency fund, he would have lost everything. He said the goal is three to six months of basic living expenses sitting in a savings account that you do not touch unless something genuinely unexpected happens. Not a sale on shoes. Not a spontaneous trip. A real emergency. Kenji asked if running out of beer counts. It does not.',
    ],
    context: '「生活防衛資金」は生活を守るための備え資金。英語では"emergency fund"。日本語の「防衛」は守るイメージで、英語の"emergency"は緊急事態のイメージ。切り口が違う。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 314,
    japanese: '将来のためにお金の勉強しよう',
    english: [
      'Study money for the future.',
      'We should all learn more about personal finance for our future.',
      'It is never too late to start learning about money management, and the sooner we do, the better off our futures will be.',
      'Master closed out the night with something that stuck with me. He said nobody teaches us about money in school, so we have to teach ourselves. Investing, taxes, insurance, budgeting. All of it. He started learning about finances in his forties and wishes he had started in his twenties. The information is all out there, free, on the internet. The hard part is not finding it, it is actually sitting down and doing it. He is right. Starting tonight. Or maybe tomorrow. Definitely this week.',
    ],
    context: '「お金の勉強」は英語では"financial literacy"や"learn about personal finance"。日本語では「お金の勉強」とストレートに言えるけど、英語では"money"と言うよりは"finance"や"financial literacy"の方が教育的な文脈では自然。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
];

const day314Keywords: KeyWord[] = [
  { en: 'budget', ja: '予算・家計', pron: 'buh-jit', example: 'I need to stick to my budget this month.', note: '収入と支出を計画すること。名詞でも動詞でも使える' },
  { en: 'in the red', ja: '赤字', pron: 'in thuh red', example: 'We have been in the red for three months straight.', note: '支出が収入を上回っている状態。反対はin the black' },
  { en: 'impulse purchase', ja: '衝動買い', pron: 'im-puls pur-chus', example: 'That jacket was a total impulse purchase.', note: '計画なく思いつきで買ってしまうこと' },
  { en: 'emergency fund', ja: '生活防衛資金', pron: 'ih-mur-jun-see fund', example: 'Financial advisors recommend keeping six months of expenses in an emergency fund.', note: '緊急時のための備え資金。使わないのが理想' },
  { en: 'fixed expenses', ja: '固定費', pron: 'fikst ik-spen-sez', example: 'Rent and insurance are my biggest fixed expenses.', note: '毎月同額かかる費用。家賃、保険、通信費など' },
];

// ============================================================
// Day Themes
// ============================================================
export const MONTH11_W42_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
  308: { title: '給料の話', titleEn: 'Talking About Salary', category: 'social', scene: 'タケシが給料日前の金欠ぶりをぼやく。マスターが「給料の話は英語圏じゃタブーだぞ」と日本との文化差を語る。', keywords: day308Keywords },
  309: { title: '投資の話', titleEn: 'Talking About Investments', category: 'social', scene: 'ケンジが株の話を始め、タケシが「俺にはよくわからん」と渋い顔。マスターが投資の英語表現を噛み砕いて教える。', keywords: day309Keywords },
  310: { title: 'ローンと借金', titleEn: 'Loans and Debt', category: 'social', scene: 'タケシが車のローンの話をきっかけに、マスターが借金にまつわる英語の微妙なニュアンスの違いを解説する。', keywords: day310Keywords },
  311: { title: '税金', titleEn: 'Taxes', category: 'social', scene: '確定申告の時期にタケシが「税金の英語って全部難しそう」とぼやく。マスターが日常会話レベルの税金トークを教える。', keywords: day311Keywords },
  312: { title: '保証と返品', titleEn: 'Warranties and Returns', category: 'request', scene: '海外通販で届いた商品が壊れていたタケシ。マスターが英語での返品・保証のやりとりをロールプレイで練習させる。', keywords: day312Keywords },
  313: { title: 'サブスクリプション', titleEn: 'Subscriptions', category: 'shopping', scene: 'タケシのサブスク地獄が発覚。マスターが「解約の英語は生存スキルだ」と笑いながら実践フレーズを伝授する。', keywords: day313Keywords },
  314: { title: '家計管理', titleEn: 'Household Budgeting', category: 'social', scene: 'ユキが家計簿アプリを見せながら節約術を語る。マスターが英語圏の家計管理の考え方と表現を紹介する。', keywords: day314Keywords },
};

// ============================================================
// Combined Exports
// ============================================================
export const MONTH11_W42_EXPRESSIONS: MasterExpression[] = [
  ...day308,
  ...day309,
  ...day310,
  ...day311,
  ...day312,
  ...day313,
  ...day314,
];

export const MONTH11_W42_KEYWORDS: Record<number, KeyWord[]> = {
  308: day308Keywords,
  309: day309Keywords,
  310: day310Keywords,
  311: day311Keywords,
  312: day312Keywords,
  313: day313Keywords,
  314: day314Keywords,
};
