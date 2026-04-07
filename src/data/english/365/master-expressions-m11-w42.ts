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
      'Ha, don\'t even get me started on that topic.',
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
      'Hmm, let me check the price real quick.',
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
      'Again? You gotta take care of yourself too.',
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
      'Ha, you\'re not wrong about that!',
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
      'Congrats! That\'s well deserved!',
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
      'Oh wow, you\'re right! Good eye.',
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
      'Let\'s do it! I\'m right behind you.',
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
      'Yeah, totally! That\'s a great point.',
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
      'Ha, don\'t even get me started on that topic.',
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
      'Let\'s do it! I\'m right behind you.',
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
      'Wow, I had no idea! That\'s cool.',
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
      'Let\'s go! That\'s what I\'m talking about!',
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
      'Good read? What\'s it about?',
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
      'Go for it! Nothing to lose, right?',
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
      'Say no more! Let\'s make it happen.',
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
      'Say no more! Let\'s make it happen.',
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
      'Go for it! Nothing to lose, right?',
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
      'Ha, for real? That\'s interesting!',
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
      'Oh wow, you\'re right! Good eye.',
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
      'Oh really? Tell me more!',
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
      'Oh yeah, that makes a lot of sense.',
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
      'Yeah, it\'s pretty wild when you think about it.',
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
      'Say no more! Let\'s make it happen.',
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
      'I got this one. You can get the next round.',
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
      'Huh, I never thought about it that way!',
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
      'You know what, you\'re absolutely right.',
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
      'Oh yeah, that makes a lot of sense.',
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
      'Hey, relax. Everything\'s going to be fine.',
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
      'Hmm, let me check the price real quick.',
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
      'Let\'s do it! I\'m right behind you.',
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
      'Tell me about it! But you get used to it.',
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
      'Ha, for real? That\'s interesting!',
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
      'I know, right? It gets confusing.',
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
      'I know, right? It gets confusing.',
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
      'I know, right? It gets confusing.',
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
      'Of course! Go right ahead.',
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
      'That\'s such a nice tradition. I love how special it is.',
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
      'I know, right? It gets confusing.',
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
      'I know, right? It gets confusing.',
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
      'Ha, that\'s a great way to put it!',
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
      'Hmm, good question. What do you think?',
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
      'Yeah, it\'s pretty wild when you think about it.',
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
      'Oh really? Tell me more!',
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
      'Right? I was just thinking that.',
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
      'Ha, you\'re not wrong about that!',
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
      'Leave it to me! Consider it done.',
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
      'Say no more! Let\'s make it happen.',
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
      'Say no more! Let\'s make it happen.',
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
      'Me too! Great minds think alike.',
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
      'Ha, you\'re not wrong about that!',
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
      'Hmm, let me check the price real quick.',
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
      'Of course! Go right ahead.',
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
      'Say no more! Let\'s make it happen.',
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
      'Let\'s do it! I\'m right behind you.',
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
      'I got this one. You can get the next round.',
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
      'Ha, that\'s a great way to put it!',
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
      'Hmm, good question. What do you think?',
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
      'Yeah, totally! That\'s a great point.',
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
      'Hmm, good question. What do you think?',
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
      'Let me check... it\'s about that much, yeah.',
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
      'Your place? Cool, what time should I come over?',
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
      'Let\'s do it! I\'m right behind you.',
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
      'Say no more! Let\'s make it happen.',
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
      'Let me check... it\'s about that much, yeah.',
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
      'That sounds rough. Hang in there.',
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
      'Nailed it! Couldn\'t agree more.',
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
      'Let\'s do it! I\'m right behind you.',
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
      'Say no more! Let\'s make it happen.',
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
      'Say no more! Let\'s make it happen.',
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
      'That\'s awesome! How\'s it going so far?',
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
