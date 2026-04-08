// Month 11 Week 41: 実用シーン / Practical Situations
// Days 301-307, 70 expressions total

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Day 301: 病院で (At the Hospital) - request
// ============================================================

const day301: MasterExpression[] = [
  {
    daySlot: 301,
    japanese: '予約なしでも診てもらえますか',
    english: [
      'Can I be seen without an appointment?',
      'Hey, any chance I can get seen today even though I did not book ahead?',
      'I show up at the clinic without an appointment and ask the receptionist if someone can see me today.',
      'Let me check... yeah, we actually had a cancellation this morning, so we can fit you in. Just fill out this form and have a seat.'
    ],
    jaTranslations: [
      '予約なしでも診てもらえますか。',
      'すみません、予約してないんですけど、今日診てもらえたりしますか？',
      '予約なしでフラッと来ちゃったんですけど、誰かに診てもらえますかね？',
      '確認しますね…あ、今朝キャンセル出たんで入れますよ。この用紙書いてお待ちください。'
    ],
    context: '日本語の「診てもらえますか」は受身+もらう構造だけど、英語は"be seen"でシンプルに受身。日本語ほど恩恵ニュアンスは入らない。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: 'ここ数日、頭痛がひどくて',
    english: [
      'I have had bad headaches for days.',
      'I have been dealing with these killer headaches the past few days.',
      'I tell the doctor that I have had persistent headaches for the last several days and nothing I take seems to help.',
      'That doesn\'t sound fun. Are they more on one side, or does it feel like pressure all around? Any nausea or sensitivity to light?'
    ],
    jaTranslations: [
      'ここ数日、頭痛がひどいです。',
      'ここ何日かずっと頭痛がやばくて。',
      'ここ数日ずっとひどい頭痛が続いてて、何飲んでも効かないんです。',
      'それはつらいね。片側が痛い感じ？それとも全体的に締めつけられる感じ？吐き気とか光がまぶしいとかある？'
    ],
    context: '「ひどくて」を"bad"で済ませがちだけど、"killer"とか"brutal"の方がネイティブっぽい。痛みの程度を大げさに言うのは英語の得意技。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: 'アレルギーの薬を出してもらえますか',
    english: [
      'Can you prescribe allergy medicine?',
      'Could I get a prescription for something for my allergies?',
      'I ask the doctor if they can prescribe me some allergy medication because over-the-counter stuff is not cutting it.',
      'Sure, I can do that. Over-the-counter stuff only goes so far. I\'ll write you something stronger that should help with the itching and congestion.'
    ],
    jaTranslations: [
      'アレルギーの薬を処方してもらえますか。',
      'アレルギーの薬、出してもらえません？',
      '市販の薬じゃ全然効かないんで、アレルギーの薬を処方してほしいんですけど。',
      'いいですよ。市販だと限界ありますもんね。もっと強いの出しますね、かゆみと鼻づまりに効くやつ。'
    ],
    context: '「出してもらえますか」は日本語だと薬を「出す」感覚。英語では"prescribe"(処方する)が正式。カジュアルには"get something for"でOK。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '保険証を忘れてしまいました',
    english: [
      'I forgot my insurance card.',
      'Shoot, I left my insurance card at home.',
      'I realize at the front desk that I do not have my insurance card and I apologize and ask if I can still be seen.',
      'Don\'t worry, it happens all the time. We can still see you today -- just bring it in next time or email us a photo later.'
    ],
    jaTranslations: [
      '保険証を忘れました。',
      'やば、保険証家に忘れてきちゃった。',
      '受付で保険証がないことに気づいて、すみません忘れちゃって、それでも診てもらえますかと聞く。',
      '大丈夫ですよ、よくあることなんで。今日は診れますから、次回持ってきてくれるか写真をメールしてくれればOKです。'
    ],
    context: '「忘れてしまいました」の「しまった」は後悔のニュアンス。英語だと"Shoot"とか"Oh no"で感情を先に出すのが自然。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '検査の結果はいつ出ますか',
    english: [
      'When will the test results come in?',
      'Any idea how long before I get the results back?',
      'After the blood test, I ask the nurse when I should expect to hear back about my results.',
      'Usually about three to five business days. We\'ll give you a call once they\'re in, so no need to check yourself.'
    ],
    jaTranslations: [
      '検査結果はいつ出ますか。',
      '結果っていつ頃わかります？',
      '血液検査の後、看護師さんに結果がいつ出るか聞く。',
      'だいたい3〜5営業日ですね。結果出たらこちらから電話しますんで、自分で確認しなくて大丈夫ですよ。'
    ],
    context: '「出る」は日本語だと結果が自動的に「出てくる」感じ。英語は"come in"とか"get back"で、結果が戻ってくるイメージ。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: 'この薬の副作用ってありますか',
    english: [
      'Does this medicine have side effects?',
      'Are there any side effects I should know about with this?',
      'Before leaving the pharmacy, I ask the pharmacist whether there are any side effects I need to watch out for.',
      'Good question. This one can make you a little drowsy, so don\'t drive until you know how it hits you. Take it with food to avoid an upset stomach.'
    ],
    jaTranslations: [
      'この薬に副作用はありますか。',
      'この薬、副作用とかあります？',
      '薬局出る前に、薬剤師さんに気をつけるべき副作用があるか聞く。',
      'いい質問ですね。これ少し眠くなることがあるんで、どう効くかわかるまで運転は控えてください。胃が荒れないように食後に飲んでね。'
    ],
    context: '「副作用って」の「って」はカジュアルな確認。英語でも"any side effects I should know about?"みたいに軽く聞くのが普通。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '紹介状を書いていただけますか',
    english: [
      'Could you write me a referral?',
      'Would it be possible to get a referral to a specialist?',
      'I ask my doctor if they can write a referral letter so I can see a specialist at the university hospital.',
      'Of course. I think seeing a specialist is a good call at this point. I\'ll write one up for the university hospital -- they\'ve got a great team over there.'
    ],
    jaTranslations: [
      '紹介状を書いてもらえますか。',
      '専門医への紹介状、書いてもらえませんか？',
      '大学病院の専門医に診てもらいたいんで、紹介状を書いてもらえるか先生に聞く。',
      'もちろん。この段階で専門医に診てもらうのは正解だと思います。大学病院宛てに書きますね、あそこはいいチームがいますよ。'
    ],
    context: '「紹介状」は日本の医療独特の文化。英語では"referral"一語で済む。アメリカでも保険によってはreferralが必要。',
    character: 'master',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '痛み止めが切れてきました',
    english: [
      'The painkiller is wearing off.',
      'My pain meds are starting to wear off.',
      'I tell the nurse that my pain medication is wearing off and I am starting to feel uncomfortable again.',
      'Let me check your chart real quick. Yeah, you\'re due for another dose in about ten minutes. Hang tight and I\'ll bring it right over.'
    ],
    jaTranslations: [
      '痛み止めが切れてきました。',
      '痛み止め、効き目切れてきたんですけど。',
      '看護師さんに痛み止めが切れてきて、またつらくなってきたと伝える。',
      'カルテ確認しますね。あ、あと10分くらいで次の分いけますよ。ちょっと待っててくださいね、すぐ持ってきます。'
    ],
    context: '「切れる」は日本語だと薬の効果が「切れる」。英語では"wear off"で、徐々に効果が薄れていくイメージ。ピッタリの表現。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '何か食事制限はありますか',
    english: [
      'Are there any dietary restrictions?',
      'Is there anything I should avoid eating?',
      'After the diagnosis, I ask the doctor whether I need to change my diet or avoid any particular foods.',
      'You\'ll want to cut back on sodium and fried stuff for now. I\'ll print out a list of what to avoid -- it\'s not as bad as it sounds, I promise.'
    ],
    jaTranslations: [
      '食事制限はありますか。',
      '食べちゃダメなものとかあります？',
      '診断後、食事を変えた方がいいのか、避けるべき食べ物があるか先生に聞く。',
      '今のところ塩分と揚げ物は控えてね。避けるもののリスト印刷するから。思ったほどひどくないから、大丈夫。'
    ],
    context: '「食事制限」は日本語だと堅い言葉だけど、実際の会話では"anything I should avoid eating?"くらいカジュアルに聞く。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 301,
    japanese: '次の診察はいつにしましょうか',
    english: [
      'When should my next visit be?',
      'When do you want me to come back in?',
      'At the end of the appointment, I ask the doctor when I should schedule my follow-up visit.',
      'Let\'s do two weeks from now. Just check in at the front desk on your way out and they\'ll get you scheduled.'
    ],
    jaTranslations: [
      '次の診察はいつがいいですか。',
      '次、いつ来ればいいですか？',
      '診察終わりに、次いつ来たらいいか先生に聞く。',
      '2週間後にしよう。帰りに受付に寄れば予約入れてくれるから。'
    ],
    context: '「いつにしましょうか」は相談のニュアンス。英語では"When do you want me to come back?"と医者に判断を委ねる言い方が自然。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  }
];

const day301Keywords: KeyWord[] = [
  { en: 'appointment', ja: '予約', pron: 'uh-POINT-muhnt', example: 'Do I need an appointment?', note: '病院・美容院・ビジネスなど幅広く使える' },
  { en: 'prescribe', ja: '処方する', pron: 'prih-SKRYB', example: 'The doctor prescribed antibiotics.', note: '名詞形はprescription(処方箋)' },
  { en: 'side effects', ja: '副作用', pron: 'SYDE ih-FEKTS', example: 'This medication has few side effects.', note: '薬以外にも政策の「副作用」にも使える' },
  { en: 'referral', ja: '紹介状', pron: 'rih-FUR-uhl', example: 'I need a referral to see a specialist.', note: 'refer(紹介する)の名詞形' },
  { en: 'wear off', ja: '(効果が)切れる', pron: 'WAIR awf', example: 'The anesthesia is wearing off.', note: '薬・感情・興奮などが徐々に薄れる時に使う' }
];

// ============================================================
// Day 302: 銀行で (At the Bank) - request
// ============================================================

const day302: MasterExpression[] = [
  {
    daySlot: 302,
    japanese: '口座を開設したいのですが',
    english: [
      'I would like to open an account.',
      'Hi, I am looking to open a new bank account.',
      'I walk into the bank and tell the teller that I want to open a checking account and ask what I need to bring.',
      'Welcome! We\'ve got a basic checking with no monthly fee and a premium one with a few extra perks. Want me to walk you through both?'
    ],
    jaTranslations: [
      '口座を開設したいのですが。',
      'すみません、口座作りたいんですけど。',
      '銀行に行って、窓口で普通預金の口座を開きたいんですけど、何が必要ですかと聞く。',
      'いらっしゃいませ！月額無料のベーシックと特典付きのプレミアムがありますけど、両方説明しましょうか？'
    ],
    context: '「開設したいのですが」の「のですが」は遠回しなお願い。英語では"I am looking to"が同じくらい柔らかい。"I want to"だと少し直接的。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '振込の手数料はいくらですか',
    english: [
      'How much is the transfer fee?',
      'What do you guys charge for a wire transfer?',
      'I ask the bank teller how much it costs to transfer money to another bank domestically.',
      'For a domestic transfer it\'s three bucks at the counter, but if you do it through the app it\'s free. Most people just use the app these days.'
    ],
    jaTranslations: [
      '振込の手数料はいくらですか。',
      '振込の手数料っていくらかかります？',
      '窓口で国内の他行宛振込がいくらかかるか聞く。',
      '窓口だと3ドルですけど、アプリなら無料ですよ。最近みんなアプリでやってますね。'
    ],
    context: '「手数料」は日本語だと一語だけど、英語は文脈で変わる。銀行は"fee"、カードは"charge"、仲介は"commission"。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '暗証番号を変更したいです',
    english: [
      'I want to change my PIN.',
      'I need to update my PIN number.',
      'I go to the bank because I want to change the PIN on my debit card for security reasons.',
      'Sure, you can do it right at the ATM over there. Just select "settings" and then "change PIN." It only takes a minute.'
    ],
    jaTranslations: [
      '暗証番号を変更したいです。',
      '暗証番号変えたいんですけど。',
      'セキュリティのためにデビットカードの暗証番号を変えたくて銀行に来た。',
      'あ、それならあっちのATMでできますよ。「設定」から「暗証番号変更」選べば1分で終わります。'
    ],
    context: '「暗証番号」は英語で"PIN"(Personal Identification Number)。ネイティブは"PIN number"と言うけど、厳密にはnumberが重複してる。でもみんな言う。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '通帳の記帳をお願いします',
    english: [
      'Could you update my bankbook?',
      'Can I get my passbook updated?',
      'I hand the teller my bankbook and ask them to print the latest transactions in it.',
      'No problem, I\'ll run it through the machine for you. Looks like there are quite a few entries to catch up on!'
    ],
    jaTranslations: [
      '通帳の記帳をお願いします。',
      '通帳の記帳してもらえますか？',
      '窓口に通帳を渡して、最新の取引を印字してもらう。',
      'はい、機械に通しますね。だいぶ溜まってますね！'
    ],
    context: '「通帳記帳」は日本の銀行文化。アメリカではpassbook自体がほぼ絶滅。"bank statement"(取引明細)をオンラインで見るのが主流。',
    character: 'master',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '定期預金の金利はどのくらいですか',
    english: [
      'What is the interest rate on a fixed deposit?',
      'What kind of rate are you offering on CDs right now?',
      'I sit down with a bank advisor and ask about the current interest rates for fixed-term deposits.',
      'Right now our 12-month CD is at 4.2 percent, which is pretty solid. The 6-month is 3.8. Want me to run the numbers for you?'
    ],
    jaTranslations: [
      '定期預金の金利はどのくらいですか。',
      '今、定期の金利ってどんな感じですか？',
      '銀行の担当者に定期預金の金利について聞く。',
      '今12ヶ月定期が4.2%でかなりいいですよ。6ヶ月だと3.8%です。試算してみましょうか？'
    ],
    context: '「定期預金」はアメリカでは"CD"(Certificate of Deposit)と呼ぶ。日本の「定期」とほぼ同じ仕組み。イギリスでは"fixed-term deposit"。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: 'カードを紛失してしまいました',
    english: [
      'I lost my card.',
      'I think I lost my bank card somewhere.',
      'I call the bank in a panic because I cannot find my debit card and I need to report it missing right away.',
      'Okay, I\'ve gone ahead and frozen your account. No charges since yesterday, so you\'re good. We\'ll send a new card out -- should be there in five to seven days.'
    ],
    jaTranslations: [
      'カードを紛失しました。',
      'カード、どっかでなくしちゃったみたいで。',
      'デビットカードが見当たらなくて慌てて銀行に電話して、すぐ届け出る。',
      'はい、口座凍結しました。昨日以降の不正利用はないんで大丈夫です。新しいカード送りますんで、5〜7日で届きます。'
    ],
    context: '「紛失してしまいました」の「しまった」は後悔。英語では"I think I lost it somewhere"と少し曖昧にするのが自然。確信がなくても報告する文化。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '残高照会をお願いします',
    english: [
      'Can I check my balance?',
      'Could I get a quick balance check?',
      'I stop by the bank and ask the teller to check how much money is in my savings account.',
      'Sure thing. Your checking\'s got twelve hundred and your savings is at four thousand even. Want me to print that out for you?'
    ],
    jaTranslations: [
      '残高照会をお願いします。',
      '残高ちょっと確認してもらえます？',
      '銀行に寄って、貯蓄口座にいくら入ってるか窓口で聞く。',
      'はいどうぞ。普通が1200ドル、貯蓄が4000ドルちょうどですね。印刷しましょうか？'
    ],
    context: '「残高照会」は堅い日本語。英語はシンプルに"check my balance"。日本語の四字熟語的な表現が英語では2-3語で済むパターン。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '海外送金の手続きをしたいのですが',
    english: [
      'I would like to make an international transfer.',
      'I need to send money overseas. How do I go about that?',
      'I visit the bank to ask about the process for sending money to a family member living abroad.',
      'You\'ll need her full name, bank name, account number, and SWIFT code. It usually takes two to three business days. I can walk you through the form right now if you want.'
    ],
    jaTranslations: [
      '海外送金の手続きをしたいのですが。',
      '海外に送金したいんですけど、どうやればいいですか？',
      '海外に住んでる家族にお金を送りたくて、銀行に手続きの方法を聞きに行く。',
      '相手のフルネーム、銀行名、口座番号、SWIFTコードが必要です。2〜3営業日で届きます。今から書類一緒に書きましょうか？'
    ],
    context: '「手続き」は日本語だと必ず出る言葉だけど、英語では"How do I go about that?"と手順を聞く方が自然。"procedure"は堅すぎ。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '自動引き落としの設定をしたいです',
    english: [
      'I want to set up automatic payments.',
      'Can I set up autopay for my bills?',
      'I ask the bank representative to help me set up automatic payments for my rent and utilities.',
      'Yeah, we can set that up right now. There\'s no limit on how many you can have. Just bring up the payee details and we\'ll get it all sorted.'
    ],
    jaTranslations: [
      '自動引き落としの設定をしたいです。',
      '自動引き落としの設定ってできます？',
      '銀行の担当者に家賃と光熱費の自動引き落としを設定してほしいと頼む。',
      'はい、今すぐ設定できますよ。件数制限もないんで、振込先の情報もらえれば全部やっちゃいますね。'
    ],
    context: '「自動引き落とし」は英語で"autopay"か"automatic payment"。日本語の「引き落とし」(引いて落とす)という動きのイメージは英語にはない。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 302,
    japanese: '両替をお願いしたいのですが',
    english: [
      'I would like to exchange some currency.',
      'Could I get some money exchanged here?',
      'I bring US dollars to the bank and ask if they can exchange them into the local currency for me.',
      'Our rate today is pretty decent actually. There\'s a small handling fee on top, but it\'s way less than what the airport charges. Want me to go ahead?'
    ],
    jaTranslations: [
      '両替をお願いしたいのですが。',
      'ここで両替ってできますか？',
      '米ドルを持って銀行に行って、現地通貨に両替してもらえるか聞く。',
      '今日のレート結構いいですよ。手数料は少しかかりますけど、空港よりずっと安いです。やっちゃいます？'
    ],
    context: '「両替」は英語で"exchange"。日本語は「両方を替える」で対等感があるけど、英語の"exchange"も同じニュアンス。空港では"currency exchange"の看板。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  }
];

const day302Keywords: KeyWord[] = [
  { en: 'checking account', ja: '普通預金口座', pron: 'CHEK-ing uh-KOWNT', example: 'I need a checking account for daily expenses.', note: 'savings account(貯蓄口座)とセットで覚える' },
  { en: 'wire transfer', ja: '振込', pron: 'WY-er TRANS-fer', example: 'The wire transfer should arrive tomorrow.', note: '国内送金もwire transferと言う場合あり' },
  { en: 'PIN', ja: '暗証番号', pron: 'pin', example: 'Enter your PIN and press OK.', note: 'Personal Identification Numberの略' },
  { en: 'balance', ja: '残高', pron: 'BAL-uhns', example: 'My balance is lower than I expected.', note: '銀行以外にもwork-life balanceなど多義語' },
  { en: 'autopay', ja: '自動引き落とし', pron: 'AW-toh-pay', example: 'I set up autopay so I never miss a bill.', note: 'automatic paymentの略。日常会話ではこっちが主流' }
];

// ============================================================
// Day 303: 役所で (At the Government Office) - request
// ============================================================

const day303: MasterExpression[] = [
  {
    daySlot: 303,
    japanese: '住民票が必要なのですが',
    english: [
      'I need a certificate of residence.',
      'I am here to get a proof of address document.',
      'I visit the city office and explain that I need an official document proving where I live for a job application.',
      'Yep, you\'re in the right place. Just fill out this form and show me your ID. It\'ll be ready in about ten minutes.'
    ],
    jaTranslations: [
      '住民票が必要なのですが。',
      '住民票ほしいんですけど。',
      '就職に必要な住所証明書を取りに市役所に行って、窓口で説明する。',
      'はい、ここで大丈夫ですよ。この用紙に記入して身分証見せてもらえれば、10分くらいで出ます。'
    ],
    context: '「住民票」は日本独自の制度。英語圏には直接の equivalent がない。"proof of address"(住所証明)が近いけど、公的書類としての重みが違う。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '転入届を出したいのですが',
    english: [
      'I need to file a move-in registration.',
      'I just moved here and I need to register my new address.',
      'I go to the municipal office to officially register as a new resident after moving from another city.',
      'Great, sounds like you\'ve got everything we need. Just fill out this move-in form and we\'ll get your new address registered today.'
    ],
    jaTranslations: [
      '転入届を出したいのですが。',
      '引っ越してきたんで、住所の届出したいんですけど。',
      '他の市から引っ越してきたので、新しい住所の届出をしに市役所に行く。',
      'いいですね、必要なもの全部揃ってますね。この転入届に記入してもらえれば、今日中に新住所登録できます。'
    ],
    context: '「転入届」は日本の住民登録制度の用語。英語圏では引越しても役所に届ける義務がないことが多い。概念自体が違う。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '戸籍謄本はどこで取れますか',
    english: [
      'Where can I get a family register copy?',
      'Where do I go to get a copy of my family register?',
      'I ask at the information desk where I can obtain a certified copy of my family register for a passport application.',
      'Since you were born in a different city, you\'ll need to request it from that city\'s office. But you can do it by mail -- here\'s the form for that.'
    ],
    jaTranslations: [
      '戸籍謄本はどこで取れますか。',
      '戸籍謄本ってどこでもらえるんですか？',
      'パスポート申請に必要な戸籍謄本をどこで取れるか、案内窓口で聞く。',
      '出生地が別の市なんで、そちらの役所に請求する必要があります。郵送でもできますよ、この用紙使ってください。'
    ],
    context: '「戸籍謄本」も完全に日本独自。英語圏には family register の概念がない。birth certificate(出生証明書)が最も近い用途の書類。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '印鑑証明を発行してもらえますか',
    english: [
      'Can I get a seal certificate issued?',
      'I need to get my registered seal certificate.',
      'I request a certificate that proves my officially registered personal seal at the city office.',
      'Sure, as long as your registration card is current, we can issue it right away. It\'ll be done in about five minutes.'
    ],
    jaTranslations: [
      '印鑑証明を発行してもらえますか。',
      '印鑑証明ほしいんですけど。',
      '市役所で、登録してある実印の証明書を発行してもらう。',
      'はい、印鑑登録カードが有効であれば、すぐ発行できますよ。5分くらいで出ます。'
    ],
    context: '「印鑑証明」は英語圏に存在しない制度。印鑑(seal/stamp)文化がないから。英語圏ではサインと公証人(notary)が同じ役割を果たす。',
    character: 'master',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '窓口の番号札を取ってください',
    english: [
      'Please take a number ticket.',
      'Make sure you grab a number at the counter.',
      'A staff member tells me to take a numbered ticket from the machine and wait for my number to be called.',
      'Oh thanks, I didn\'t even notice the machine. So I just press the button and wait for my number to come up on the screen?'
    ],
    jaTranslations: [
      '窓口の番号札を取ってください。',
      '番号札取ってくださいね。',
      '職員に番号札を機械から取って、呼ばれるまで待つように言われる。',
      'あ、ありがとう、機械気づかなかった。ボタン押して画面に番号出るの待てばいいんですか？'
    ],
    context: '「番号札」は英語圏でも"take a number"で通じる。デリカウンターやDMV(免許センター)で同じシステムがある。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '書類に不備がありました',
    english: [
      'There was an issue with the paperwork.',
      'Looks like there is a problem with my documents.',
      'The clerk tells me that some of my paperwork is incomplete and I need to fix it before they can process my request.',
      'Ugh, that\'s the worst. They really should have someone checking forms while people are waiting in line.'
    ],
    jaTranslations: [
      '書類に不備がありました。',
      '書類に不備があったらしくて。',
      '窓口で書類が足りないと言われて、修正してからまた来てくれと言われる。',
      'うわ、それ最悪。並んでる間に誰か書類チェックしてくれればいいのにね。'
    ],
    context: '「不備」は英語で一語にしにくい。"issue"や"problem"が一般的。"deficiency"は堅すぎ。不備の「備」(備える)の概念は英語にない。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: 'マイナンバーカードの受け取りに来ました',
    english: [
      'I am here to pick up my ID card.',
      'I came to pick up my national ID card.',
      'I visit the city office to collect my government-issued identification card after receiving a notification that it was ready.',
      'Perfect, let me pull it up. You\'ll set your passcode right here on this keypad before you leave. Should only take a couple minutes.'
    ],
    jaTranslations: [
      'マイナンバーカードの受け取りに来ました。',
      'マイナンバーカード、受け取りに来たんですけど。',
      '準備ができたって通知が来たんで、市役所にマイナンバーカードを取りに行く。',
      'はい、確認しますね。帰る前にこのテンキーで暗証番号設定してもらいます。2〜3分で終わりますよ。'
    ],
    context: '「受け取り」は英語で"pick up"。日本語は「受け取る」と受身的だけど、英語の"pick up"は自分から取りに行く能動的なイメージ。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '証明書の発行手数料はいくらですか',
    english: [
      'How much is the certificate fee?',
      'What does it cost to get this certificate issued?',
      'I ask the clerk how much I need to pay for the issuance of an official document.',
      'It\'s 300 yen per copy, cash only I\'m afraid. There\'s an ATM at the convenience store right across the street if you need it.'
    ],
    jaTranslations: [
      '証明書の発行手数料はいくらですか。',
      'これ出すのにいくらかかります？',
      '窓口で公的書類の発行にいくらかかるか聞く。',
      '1通300円で、現金のみなんです。向かいのコンビニにATMありますんで。'
    ],
    context: '「発行手数料」は日本語だと4語。英語では"How much does it cost?"で十分。日本語は名詞を重ねる傾向、英語は動詞で処理する傾向。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '委任状が必要になりますか',
    english: [
      'Do I need a power of attorney?',
      'Will I need a letter of authorization for this?',
      'I ask whether I need to bring a signed authorization letter if someone else is picking up the documents on my behalf.',
      'Yeah, you\'ll need a signed letter from her with both your IDs. We\'ve got a template you can download from our website to make it easier.'
    ],
    jaTranslations: [
      '委任状が必要になりますか。',
      '委任状っているんですか？',
      '本人の代わりに書類を受け取る場合、署名入りの委任状が必要か聞く。',
      'はい、本人の署名入りの委任状と双方の身分証が必要です。ホームページにテンプレートあるんで、ダウンロードして使ってください。'
    ],
    context: '「委任状」は英語で"power of attorney"(法的)か"letter of authorization"(一般的)。日本の役所では「委任状」一枚でOKだが、英語圏ではnotarization(公証)が必要なことも。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 303,
    japanese: '郵送で届きますか',
    english: [
      'Can it be sent by mail?',
      'Is it possible to have it mailed to me?',
      'I ask the clerk if the documents can be mailed to my home instead of me having to come back to pick them up.',
      'We can definitely mail it. Just add your address on this form and it\'ll arrive in about a week. There\'s a small postage fee on top.'
    ],
    jaTranslations: [
      '郵送で届きますか。',
      '郵送で送ってもらうことってできます？',
      'また取りに来るのが面倒なんで、自宅に郵送してもらえるか窓口で聞く。',
      '郵送できますよ。この用紙に住所書いてもらえれば、1週間くらいで届きます。送料がちょっとかかりますけど。'
    ],
    context: '「郵送で届く」は日本語だと「届く」で受身的。英語では"have it mailed"か"send it"で、誰かに送らせるか送ってもらう形。視点が違う。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  }
];

const day303Keywords: KeyWord[] = [
  { en: 'proof of address', ja: '住所証明', pron: 'proof uhv AD-res', example: 'A utility bill works as proof of address.', note: '住民票の概念がないので、用途で訳し分ける' },
  { en: 'register', ja: '届け出る/登録する', pron: 'REJ-ih-ster', example: 'You need to register at the city office.', note: '名詞でも動詞でも使える万能語' },
  { en: 'paperwork', ja: '書類手続き', pron: 'PAY-per-werk', example: 'The paperwork took forever.', note: '面倒な書類仕事のニュアンスが含まれる' },
  { en: 'pick up', ja: '受け取りに行く', pron: 'PIK uhp', example: 'I need to pick up my passport tomorrow.', note: '自分から取りに行くのがポイント。deliverの反対' },
  { en: 'authorization', ja: '委任/認可', pron: 'aw-thuh-rih-ZAY-shun', example: 'I need written authorization from the owner.', note: 'authorize(動詞)→authorization(名詞)' }
];

// ============================================================
// Day 304: 不動産 (Real Estate) - request
// ============================================================

const day304: MasterExpression[] = [
  {
    daySlot: 304,
    japanese: '駅から徒歩何分ですか',
    english: [
      'How many minutes on foot from the station?',
      'How far is it from the station on foot?',
      'I ask the real estate agent how long it takes to walk from the nearest train station to the apartment.',
      'It\'s about an eight-minute walk, flat road the whole way. I\'ve done it myself and it\'s a pretty easy commute honestly.'
    ],
    jaTranslations: [
      '駅から歩いて何分ですか。',
      '駅からどれくらいかかります？',
      '不動産屋に、最寄り駅からマンションまで歩いてどのくらいか聞く。',
      '歩いて8分くらいで、ずっと平坦な道ですよ。自分でも歩いてみたけど、通勤は楽だと思います。'
    ],
    context: '「徒歩何分」は日本の不動産表現。英語では"How far"と距離で聞くのが普通。分数で聞くのは日本の不動産文化。80m=1分の換算も日本独自。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '敷金礼金はいくらですか',
    english: [
      'How much is the deposit and key money?',
      'What are the upfront costs for moving in?',
      'I ask the agent about the security deposit and any non-refundable fees I need to pay before moving in.',
      'So for this one it\'s two months deposit and one month key money upfront. I know it adds up, but the deposit is refundable when you move out.'
    ],
    jaTranslations: [
      '敷金と礼金はいくらですか。',
      '初期費用ってどのくらいかかります？',
      '敷金と返ってこない費用がいくらか不動産屋に聞く。',
      'この物件は敷金2ヶ月分と礼金1ヶ月分です。合計すると結構いきますけど、敷金は退去時に返ってきますんで。'
    ],
    context: '「礼金」は英語圏に存在しない概念。"key money"と訳すけど、大家へのお礼で返ってこないお金という文化は理解されにくい。security depositは返金前提。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: 'ペット可の物件を探しています',
    english: [
      'I am looking for a pet-friendly place.',
      'Do you have any listings that allow pets?',
      'I tell the real estate agent that I have a small dog and I need to find an apartment that allows pets.',
      'We\'ve got a few pet-friendly ones on the list. There\'s an extra deposit for pets usually, but let me pull up what\'s available in your price range.'
    ],
    jaTranslations: [
      'ペット可の物件を探しています。',
      'ペットOKのとこ探してるんですけど。',
      '小型犬がいるので、ペット可のマンションを見つけたいと不動産屋に伝える。',
      'ペット可の物件いくつかありますよ。ペット用の追加敷金がかかることが多いですけど、予算内で出してみますね。'
    ],
    context: '「ペット可」は日本語だと2文字で済む。英語では"pet-friendly"で形容詞化。日本の不動産は基本ペット不可で「可」が特別だけど、英語圏は逆に禁止の方が表示される。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '日当たりはどうですか',
    english: [
      'How is the sunlight?',
      'Does this place get good natural light?',
      'I ask the agent about how much sunlight the apartment gets, especially during the winter months.',
      'This one faces south so you\'ll get great light all day. The living room\'s especially bright in the morning -- you\'ll love it if you work from home.'
    ],
    jaTranslations: [
      '日当たりはどうですか。',
      '日当たりっていいですか？',
      '特に冬場の日当たりがどうか不動産屋に聞く。',
      'ここ南向きなんで一日中日が入りますよ。特にリビングは朝めっちゃ明るいです。在宅ワークなら最高だと思いますよ。'
    ],
    context: '「日当たり」は日本の物件選びの超重要ポイント。英語では"natural light"が近いけど、「日当たり」ほど物件評価の決定打にはならない文化的差異がある。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '更新料はかかりますか',
    english: [
      'Is there a renewal fee?',
      'Do I have to pay anything when the lease renews?',
      'I ask the agent whether there are any fees when it comes time to renew the lease agreement.',
      'Yeah, this one has a renewal fee of half a month\'s rent every two years. The rent stays the same though, so at least there\'s that.'
    ],
    jaTranslations: [
      '更新料はかかりますか。',
      '更新料ってあります？',
      '契約更新のときに費用がかかるか不動産屋に聞く。',
      'はい、2年ごとに家賃半月分の更新料がかかります。ただ家賃自体は変わらないんで、まだマシですよ。'
    ],
    context: '「更新料」は日本の賃貸文化。英語圏ではlease renewal feeがある場合もあるけど、家賃1-2ヶ月分を払う日本の更新料は異常に高いと思われる。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '内見をお願いできますか',
    english: [
      'Can I schedule a viewing?',
      'Would it be possible to see the place in person?',
      'I ask the real estate agent if I can visit the apartment before making a decision.',
      'Absolutely, let\'s set something up. How\'s Saturday afternoon? The current tenant\'s already moved out so we can take our time looking around.'
    ],
    jaTranslations: [
      '内見をお願いできますか。',
      '実際に見に行くことってできます？',
      '決める前に実際に部屋を見たいと不動産屋に聞く。',
      'もちろん、日程決めましょう。土曜の午後とかどうですか？前の入居者もう出てるんで、ゆっくり見れますよ。'
    ],
    context: '「内見」は英語で"viewing"。日本語の「内」(中を)「見」(見る)がそのまま英語でも"view"(見る)。珍しく構造が似ている。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '壁に穴を開けても大丈夫ですか',
    english: [
      'Can I put holes in the walls?',
      'Is it okay if I hang stuff on the walls?',
      'I ask the landlord whether I am allowed to drill into the walls to hang shelves or picture frames.',
      'Small pins and hooks are fine, just no heavy-duty drilling. As long as you patch them up before you move out, it won\'t affect your deposit.'
    ],
    jaTranslations: [
      '壁に穴を開けても大丈夫ですか。',
      '壁にフックとか付けていいですか？',
      '棚や額縁を掛けたいから、壁にドリルで穴を開けていいか大家さんに聞く。',
      'ピンとかフック程度なら大丈夫ですよ、ガッツリ穴あけるのはダメですけど。退去時に埋めてくれれば敷金には響きません。'
    ],
    context: '「穴を開けても大丈夫ですか」の「ても大丈夫」は許可を求める定番。英語では"Is it okay if..."が同じ役割。日本の原状回復ルールは英語圏より厳しい。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '管理費込みでいくらになりますか',
    english: [
      'How much is it including maintenance fees?',
      'What is the total rent with management fees included?',
      'I want to know the total monthly cost including the building maintenance and common area fees.',
      'All in, it comes to 88,000 a month. That\'s the rent plus 8,000 for management fees. Parking\'s separate if you need it though.'
    ],
    jaTranslations: [
      '管理費込みでいくらになりますか。',
      '管理費入れて全部でいくらですか？',
      '共益費や管理費含めた毎月の総額が知りたい。',
      '全部込みで月88,000円です。家賃に管理費8,000円分が乗ってます。駐車場は別料金ですけど。'
    ],
    context: '「管理費込み」は日本の賃貸独特。英語圏のrentは基本的に全込み。"maintenance fee"は分譲マンションのHOA feeに近い概念。',
    character: 'master',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '築年数はどのくらいですか',
    english: [
      'How old is the building?',
      'When was this building built?',
      'I ask the agent about the age of the building because I am concerned about earthquake resistance standards.',
      'It was built in 2005, so it\'s well within the newer earthquake codes. The plumbing and wiring were redone about three years ago too.'
    ],
    jaTranslations: [
      '築年数はどのくらいですか。',
      'この建物、築何年ですか？',
      '耐震基準が気になるんで、建物がいつ建ったか不動産屋に聞く。',
      '2005年築なんで、新耐震基準バッチリです。配管と電気系統も3年前にやり直してますよ。'
    ],
    context: '「築年数」は日本の不動産では必ず聞く。英語では"How old is the building?"でシンプル。日本語の「築」(建てる)+「年数」(年の数)は情報が詰まっている。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 304,
    japanese: '家賃の交渉はできますか',
    english: [
      'Is the rent negotiable?',
      'Is there any room to negotiate on the rent?',
      'I ask the agent whether the landlord would be open to lowering the rent a little if I sign a longer lease.',
      'I can ask the landlord for you. If you\'re willing to do a two-year lease, there\'s a decent chance they\'ll knock a bit off. Let me make a call.'
    ],
    jaTranslations: [
      '家賃の交渉はできますか。',
      '家賃って交渉できたりします？',
      '長期契約にするから家賃を少し下げてもらえないか不動産屋に聞く。',
      '大家さんに聞いてみますよ。2年契約でいいなら、ちょっと下げてもらえる可能性ありますね。電話してみます。'
    ],
    context: '「交渉」は日本語では少し重い言葉だけど、英語では"negotiable"(交渉可能)とカジュアルに聞ける。家賃交渉は英語圏では普通のこと。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  }
];

const day304Keywords: KeyWord[] = [
  { en: 'security deposit', ja: '敷金', pron: 'seh-KYUR-ih-tee dih-PAH-zit', example: 'You get the security deposit back when you move out.', note: '返金前提のお金。礼金(key money)は返ってこない' },
  { en: 'lease', ja: '賃貸契約', pron: 'lees', example: 'My lease is up in three months.', note: '動詞(借りる)としても使える' },
  { en: 'pet-friendly', ja: 'ペット可', pron: 'PET-FREND-lee', example: 'Finding a pet-friendly apartment is tough.', note: 'user-friendly, eco-friendlyと同じ構造' },
  { en: 'viewing', ja: '内見', pron: 'VYOO-ing', example: 'We have a viewing scheduled for Saturday.', note: 'イギリス英語寄り。アメリカでは"showing"も使う' },
  { en: 'negotiable', ja: '交渉可能', pron: 'nih-GOH-shee-uh-buhl', example: 'The price is negotiable.', note: 'non-negotiable(交渉の余地なし)も覚えておくと便利' }
];

// ============================================================
// Day 305: 保険の話 (Insurance Talk) - social
// ============================================================

const day305: MasterExpression[] = [
  {
    daySlot: 305,
    japanese: '保険って入った方がいいのかな',
    english: [
      'Should I get insurance?',
      'Do you think it is worth getting insurance?',
      'I ask my older coworker whether he thinks I should sign up for life insurance now that I am in my thirties.',
      'Honestly, yeah, the younger you start the cheaper it is. I got mine at 28 and it\'s way less than what my buddy pays now. Don\'t overthink it, just get something basic.'
    ],
    jaTranslations: [
      '保険って入った方がいいですか。',
      '保険ってやっぱ入った方がいいのかな。',
      '30代になったし、生命保険入るべきか年上の同僚に聞いてみる。',
      '正直、入った方がいいよ。若いうちの方が安いから。俺28で入ったけど、今から入る友達より全然安い。あれこれ考えず、まずベーシックなの入っとけ。'
    ],
    context: '「入った方がいいのかな」の「かな」は独り言的。英語で同じニュアンスを出すには"Do you think..."と誰かに意見を求める形にするのが自然。',
    character: 'yuki',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '掛け捨てと積み立て、どっちがいい',
    english: [
      'Term or whole, which is better?',
      'Is term life better or whole life?',
      'My friend and I debate whether it makes more sense to get term life insurance or whole life insurance.',
      'Your buddy\'s right. Get term and invest the difference -- whole life fees eat into your returns. Most financial advisors will tell you the same thing.'
    ],
    jaTranslations: [
      '掛け捨てと積み立て、どっちがいいですか。',
      '掛け捨てと積み立て、どっちがいいの？',
      '友達と掛け捨ての生命保険と積み立て型のどっちが得か議論する。',
      'お前の友達が正解だよ。掛け捨てにして差額を投資に回せ。積み立て型は手数料で利益持ってかれる。ファイナンシャルプランナーも同じこと言うから。'
    ],
    context: '「掛け捨て」は英語で"term life"。日本語の「掛け捨て」(掛けて捨てる)はネガティブに聞こえるけど、英語の"term"は中立的。文化的に捉え方が違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '車両保険って必要かな',
    english: [
      'Do I need collision coverage?',
      'Is it worth getting full coverage on my car?',
      'I ask my car enthusiast friend whether he thinks collision coverage is worth the extra cost.',
      'If the car\'s worth less than like ten grand, probably not worth it. I dropped mine last year and I\'m saving a ton every month.'
    ],
    jaTranslations: [
      '車両保険って必要ですか。',
      '車両保険って入る価値ある？',
      '車好きの友達に車両保険が追加料金に見合うか聞いてみる。',
      '車の価値が100万以下ならたぶんいらんよ。俺去年外したけど、毎月めっちゃ浮いてるから。'
    ],
    context: '「車両保険」は英語で"collision coverage"か"comprehensive coverage"。日本語は「車両」一語だけど、英語は何をカバーするかで名前が変わる。',
    character: 'kenji',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '保険の請求って面倒だよね',
    english: [
      'Filing insurance claims is such a hassle.',
      'Dealing with insurance claims is the worst, right?',
      'I complain to a friend about how complicated it was to file a claim after my car got scratched in a parking lot.',
      'Tell me about it. I went through the same thing last year and they dragged it out for two months. It\'s like they hope you\'ll just give up.'
    ],
    jaTranslations: [
      '保険の請求は面倒ですよね。',
      '保険の請求ってマジでダルいよね。',
      '駐車場で車に傷つけられた後の保険請求がどんだけ面倒だったか友達にぼやく。',
      'ほんとそれ。俺も去年同じ目に遭って、2ヶ月も引き延ばされた。あいつら諦めてくれるの待ってんだよ絶対。'
    ],
    context: '「請求って面倒だよね」の「だよね」は共感を求める表現。英語では"right?"を文末につけるか、"the worst"と大げさに言って共感を誘う。',
    character: 'lisa',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '免責金額ってなに',
    english: [
      'What is a deductible?',
      'So what exactly is a deductible anyway?',
      'I ask my insurance-savvy friend to explain what a deductible is because I keep seeing the term but do not understand it.',
      'Yeah, you nailed it. You pay the first 500, they cover the rest. Higher deductible means lower monthly payments, but more out of pocket if something happens.'
    ],
    jaTranslations: [
      '免責金額って何ですか。',
      'で、免責金額って結局なんなの？',
      '保険に詳しい友達に、よく見る「免責金額」って何なのか説明してもらう。',
      'そうそう、その理解で合ってるよ。最初の500ドルは自分で払って、残りを保険会社が出す。免責高くすると月々は安いけど、何かあった時の自腹が増える。'
    ],
    context: '「免責金額」は日本語でも難しい言葉。「免」(免れる)+「責」(責任)で保険会社が責任を免れる金額。英語の"deductible"(差し引く)は自分が払う部分という視点。',
    character: 'mina',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '地震保険って高くない？',
    english: [
      'Is earthquake insurance not expensive?',
      'Earthquake insurance is pretty pricey, right?',
      'I talk to my neighbor about how expensive earthquake insurance is and whether it is really necessary.',
      'I ended up getting it. It\'s pricey for sure, but one big quake and you\'d lose everything without it. Better safe than sorry in this area.'
    ],
    jaTranslations: [
      '地震保険って高くないですか。',
      '地震保険ってめっちゃ高くない？',
      '地震保険の値段と本当に必要かどうか近所の人と話す。',
      '結局入ったよ。確かに高いけど、大きいのが一発来たら全部パーだからさ。この辺は入っといた方が安心だよ。'
    ],
    context: '「高くない？」の否定疑問は同意を求める形。英語でも"Is it not...?"と否定疑問にできるけど、"pretty pricey, right?"の方が自然。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '保険の見直しした方がいいかも',
    english: [
      'Maybe I should review my insurance.',
      'I am thinking I should probably review my coverage.',
      'I tell my spouse that we should sit down and go over our insurance policies because we have not looked at them in years.',
      'You\'re right, we haven\'t touched those policies in forever. Let\'s do it this weekend -- I bet we can find something cheaper if we actually compare.'
    ],
    jaTranslations: [
      '保険の見直しをした方がいいかもしれません。',
      '保険、見直した方がいいかも。',
      'もう何年も放置してるから、保険の内容をちゃんと確認しようとパートナーに言う。',
      'そうだね、全然見てなかったもんね。今週末やろう。ちゃんと比較したらもっと安いの絶対あるって。'
    ],
    context: '「見直し」は日本語ではポジティブな意味(改善のため)。英語の"review"も中立だけど、"shop around"(比較検討する)を加えるとアクション感が出る。',
    character: 'master',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '入院したら一日いくら出るの',
    english: [
      'How much per day for hospitalization?',
      'What is the daily payout if I get hospitalized?',
      'I ask the insurance agent how much the policy pays per day if I have to stay in the hospital.',
      'This plan pays 5,000 yen a day starting from day one. No waiting period, which is actually better than most plans out there.'
    ],
    jaTranslations: [
      '入院したら一日いくら出ますか。',
      '入院した場合、1日いくらもらえるんですか？',
      '入院した時に1日いくら保険金が出るか保険の担当者に聞く。',
      'このプランは初日から1日5,000円出ます。待機期間なしなんで、他のプランよりかなりいいですよ。'
    ],
    context: '「一日いくら出る」の「出る」は保険金が「出る」。英語では"pay out"。日本語は保険金が自動的に「出てくる」感覚だけど、英語は保険会社が「払い出す」視点。',
    character: 'yuki',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '特約って本当に必要なの',
    english: [
      'Are riders really necessary?',
      'Do I actually need all these add-ons?',
      'I question whether the extra coverage options the insurance agent is recommending are really worth the additional cost.',
      'Half of those are probably unnecessary. Just pick one or two that actually matter to you and skip the rest -- they\'re definitely padding the commission.'
    ],
    jaTranslations: [
      '特約って本当に必要ですか。',
      '特約ってマジでいるの？',
      '保険の担当者が勧めてくる追加オプションが本当に必要か疑問に思う。',
      '半分はたぶんいらないよ。自分に本当に関係ある1〜2個だけ選んで、残りはスルーしろ。絶対手数料稼ぎだから。'
    ],
    context: '「特約」は英語で"rider"。保険の「特約」は「特別な約束」だけど、英語の"rider"は契約書に「乗っかる」追加条項というイメージ。',
    character: 'kenji',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 305,
    japanese: '保険料の控除って年末調整でやるんだっけ',
    english: [
      'Insurance premiums are deducted at year-end, right?',
      'Do insurance premiums count as a tax deduction?',
      'I ask my coworker whether I can claim my insurance premiums as a deduction on my year-end tax filing.',
      'Yeah, HR handles it during year-end adjustment. You just need to turn in that little form the insurance company sends you every fall. Don\'t lose it!'
    ],
    jaTranslations: [
      '保険料の控除は年末調整で行いますか。',
      '保険料の控除って年末調整でやるんだっけ？',
      '保険料が税金の控除になるか同僚に聞く。',
      'うん、年末調整で人事がやってくれるよ。毎年秋に保険会社から届くあの用紙出すだけ。なくすなよ！'
    ],
    context: '「年末調整」は日本の会社員文化。英語圏では個人で確定申告(tax return)するのが基本。会社が代わりにやってくれるシステムは珍しい。',
    character: 'lisa',
    category: 'social',
    month: '2027-02'
  }
];

const day305Keywords: KeyWord[] = [
  { en: 'premium', ja: '保険料', pron: 'PREE-mee-uhm', example: 'My monthly premium went up again.', note: '「高級な」の意味もあるけど保険では掛け金のこと' },
  { en: 'deductible', ja: '免責金額', pron: 'dih-DUK-tih-buhl', example: 'I have a 1000 dollar deductible.', note: '自己負担分。高いdeductible=安い保険料' },
  { en: 'claim', ja: '保険請求', pron: 'klaym', example: 'I filed a claim after the accident.', note: 'file a claim(請求を出す)がセットフレーズ' },
  { en: 'coverage', ja: '補償範囲', pron: 'KUV-er-ij', example: 'Make sure you have enough coverage.', note: 'cover(カバーする)の名詞形。保険では必須単語' },
  { en: 'rider', ja: '特約', pron: 'RY-der', example: 'I added a cancer rider to my policy.', note: '基本契約に「乗っかる」追加保障のイメージ' }
];

// ============================================================
// Day 306: 法律の話 (Legal Matters) - social
// ============================================================

const day306: MasterExpression[] = [
  {
    daySlot: 306,
    japanese: '契約書の内容がよくわからない',
    english: [
      'I do not understand the contract.',
      'This contract is really hard to follow.',
      'I tell my friend that I am having trouble understanding all the legal language in a contract I received.',
      'Don\'t just sign it, that\'s how people get screwed. Take a photo and send it to me -- I can help you break down the important parts.'
    ],
    jaTranslations: [
      '契約書の内容がよくわかりません。',
      '契約書の中身が全然わかんなくて。',
      '届いた契約書の法律用語が難しすぎて、友達に相談する。',
      'そのままサインすんなよ、それでやられるんだから。写真撮って送って。大事なとこ一緒に見てやるから。'
    ],
    context: '「よくわからない」は日本語だと柔らかい表現。英語では"I do not understand"と直接的に言うのが普通。遠回しにする必要がない文化。',
    character: 'yuki',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '弁護士に相談した方がいいかな',
    english: [
      'Should I talk to a lawyer?',
      'Maybe I should consult a lawyer about this.',
      'I ask a friend whether my landlord dispute is serious enough to warrant getting legal advice.',
      'If you\'ve got photos from move-in, you\'re in a good spot. A quick free consultation should tell you if it\'s worth pursuing. Definitely don\'t just let it go.'
    ],
    jaTranslations: [
      '弁護士に相談した方がいいでしょうか。',
      '弁護士に相談した方がいいかな。',
      '大家とのトラブルが弁護士に相談するレベルか友達に聞いてみる。',
      '入居時の写真あるなら有利だよ。無料相談行けば追求する価値あるかわかる。絶対泣き寝入りすんなよ。'
    ],
    context: '「相談した方がいいかな」の「かな」は迷い。英語の"Maybe I should"も同じ迷いのニュアンス。法律相談は英語圏の方がカジュアルにやる印象。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '慰謝料ってどうやって決まるの',
    english: [
      'How is compensation determined?',
      'How do they figure out how much damages to award?',
      'I ask my lawyer friend how courts decide on the amount of compensation in personal injury cases.',
      'It\'s a mix of stuff -- medical bills, lost wages, pain and suffering. There\'s no exact formula, but lawyers have a pretty good idea of what you can expect based on similar cases.'
    ],
    jaTranslations: [
      '慰謝料はどうやって決まるのですか。',
      '慰謝料ってどうやって決まるの？',
      '人身事故の場合、裁判所がどうやって賠償額を決めるのか、弁護士の友達に聞く。',
      'いろんな要素の合わせ技だよ。医療費、休業損害、精神的苦痛。決まった計算式はないけど、弁護士は似た事例からだいたいの相場わかってるよ。'
    ],
    context: '「慰謝料」は英語で"damages"(複数形)。日本語の「慰謝」(慰め+謝罪)は精神的な概念だけど、英語の"damages"は金銭的な損害賠償全般を指す。',
    character: 'lisa',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '示談で済ませたいんだけど',
    english: [
      'I would rather settle out of court.',
      'I want to settle this without going to court.',
      'I tell my lawyer that I would prefer to reach a settlement with the other party rather than go through a full trial.',
      'That\'s totally reasonable. Most cases settle anyway, so let me reach out to their side and see if we can work something out without going to trial.'
    ],
    jaTranslations: [
      '示談で済ませたいのですが。',
      '裁判にはしたくないんだけど、示談でなんとかなんない？',
      '弁護士に裁判じゃなくて示談で解決したいと伝える。',
      '全然アリだよ。ほとんどの案件は示談で終わるから。向こうに連絡して、裁判なしで落とせるか探ってみるわ。'
    ],
    context: '「示談」は日本語独特の語感。「示」(示す)+「談」(話す)で話し合いで示す。英語の"settle"は「落ち着かせる」が原義。どちらも穏便に解決するイメージ。',
    character: 'kenji',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '時効って何年だっけ',
    english: [
      'How many years is the statute of limitations?',
      'What is the statute of limitations on this?',
      'I ask my friend who studied law how long I have before the statute of limitations runs out on a potential claim.',
      'It depends on the type of case, but usually it\'s three years for personal injury stuff. Two years in, you should still be fine -- but don\'t sit on it much longer.'
    ],
    jaTranslations: [
      '時効は何年ですか。',
      '時効って何年だっけ？',
      '法律に詳しい友達に、訴えられる期限がいつまでか聞く。',
      '案件の種類によるけど、人身傷害系はだいたい3年かな。まだ2年目なら間に合うけど、これ以上放置すんなよ。'
    ],
    context: '「時効」は日本語だと2文字。英語では"statute of limitations"と長い法律用語になる。日常会話で使う機会は少ないけど、知っておくと便利。',
    character: 'mina',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '泣き寝入りはしたくない',
    english: [
      'I do not want to just let it go.',
      'I refuse to just take this lying down.',
      'I tell my partner that I am not willing to accept the unfair treatment from my employer without fighting back.',
      'Good for you. Start by documenting everything -- save those time records and emails. That\'s your strongest evidence if you decide to take it further.'
    ],
    jaTranslations: [
      '泣き寝入りはしたくありません。',
      '泣き寝入りだけは絶対嫌だ。',
      '会社の不当な扱いに黙って従うつもりはないとパートナーに言う。',
      'いいぞ。まず全部記録しろ。勤務記録とメール全部保存しとけ。本気でやるなら、それが一番強い証拠になるから。'
    ],
    context: '「泣き寝入り」は素晴らしい日本語表現。泣きながら寝るしかない。英語には直訳がない。"take it lying down"(横になったまま受け入れる)が近い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '著作権って最近厳しくなったよね',
    english: [
      'Copyright laws have gotten stricter lately.',
      'Copyright stuff has been getting way more serious lately.',
      'I chat with a colleague about how copyright enforcement has become much stricter, especially online.',
      'For real. My buddy got a copyright strike on his channel over like ten seconds of a song. It\'s getting wild out there with the AI stuff too.'
    ],
    jaTranslations: [
      '著作権は最近厳しくなりましたよね。',
      '著作権って最近めちゃくちゃ厳しくなったよね。',
      '特にネット上での著作権の取り締まりが厳しくなった話を同僚とする。',
      'マジでな。友達がチャンネルで曲10秒使っただけで著作権ストライクくらったし。AIの件もあってヤバいことになってるわ。'
    ],
    context: '「厳しくなったよね」の「よね」は共感確認。英語では"right?"を文末に付けるか、共感前提で話し始める。日本語の方が確認のバリエーションが多い。',
    character: 'master',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '無料相談ってどこでやってるの',
    english: [
      'Where can I get free legal advice?',
      'Do you know where they do free legal consultations?',
      'I search for places that offer free legal advice because I cannot afford a lawyer right now.',
      'The city runs free legal clinics every other Saturday. I\'ll send you the link -- you can book a 30-minute slot online.'
    ],
    jaTranslations: [
      '無料の法律相談はどこでやっていますか。',
      '無料相談ってどこでやってんの？',
      '弁護士を雇う余裕がないから、無料で法律相談できる場所を探す。',
      '市が隔週土曜に無料法律相談やってるよ。リンク送るわ。ネットで30分枠予約できるから。'
    ],
    context: '「どこでやってるの」のカジュアルさ。英語も"Do you know where..."と同じくらいカジュアルに聞ける。法律相談の敷居は英語圏の方が低い印象。',
    character: 'yuki',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '連帯保証人にだけはなるなよ',
    english: [
      'Never be a joint guarantor.',
      'Whatever you do, do not cosign for anyone.',
      'My dad warns me to never agree to cosign a loan or become a guarantor for someone else.',
      'Yeah, I learned that the hard way. Cosigned for a friend five years ago and guess who ended up paying the whole thing. Never again.'
    ],
    jaTranslations: [
      '連帯保証人にだけはならないでください。',
      '連帯保証人にだけはなるなよ。',
      '親父に、絶対にローンの連帯保証人にはなるなと釘を刺される。',
      'ああ、身をもって学んだわ。5年前に友達の保証人になって、結局全部俺が払った。二度とやらん。'
    ],
    context: '「連帯保証人」は日本では賃貸契約にも出てくる身近な概念。英語の"cosigner"や"guarantor"も同じだけど、文化的に「断れない空気」は日本特有。',
    character: 'master',
    category: 'social',
    month: '2027-02'
  },
  {
    daySlot: 306,
    japanese: '知らなかったでは済まないよ',
    english: [
      'Ignorance is no excuse.',
      'You cannot just say you did not know about it.',
      'I warn my friend that not knowing about a law does not protect him from the consequences of breaking it.',
      'Okay, okay, point taken. I\'ll look into it before I do anything else. Thanks for the heads up -- seriously.'
    ],
    jaTranslations: [
      '知らなかったでは済みません。',
      '知らなかったじゃ済まないよ。',
      '法律を知らなくても違反したら罰せられると友達に忠告する。',
      'わかったわかった、肝に銘じる。何かする前にちゃんと調べるわ。教えてくれてマジありがとう。'
    ],
    context: '「知らなかったでは済まない」は日本語の名言的表現。英語では"Ignorance of the law is no excuse"が法格言として存在する。文化を超えた普遍的な考え方。',
    character: 'kenji',
    category: 'social',
    month: '2027-02'
  }
];

const day306Keywords: KeyWord[] = [
  { en: 'settle', ja: '示談する/和解する', pron: 'SET-uhl', example: 'They decided to settle out of court.', note: '「落ち着かせる」が原義。settle down(落ち着く)と同根' },
  { en: 'statute of limitations', ja: '時効', pron: 'STACH-oot uhv lim-ih-TAY-shunz', example: 'The statute of limitations has expired.', note: '長い法律用語だけど日常でも使う' },
  { en: 'damages', ja: '損害賠償/慰謝料', pron: 'DAM-ij-ez', example: 'She was awarded damages for the injury.', note: '複数形で使う。単数のdamageは「損害」' },
  { en: 'cosign', ja: '連帯保証する', pron: 'KOH-syne', example: 'Never cosign a loan for a friend.', note: 'co-(共に)+sign(署名)で「一緒に署名する」' },
  { en: 'consultation', ja: '相談/コンサル', pron: 'kahn-suhl-TAY-shun', example: 'The first consultation is free.', note: 'consult(相談する)の名詞形。医療でも法律でも使う' }
];

// ============================================================
// Day 307: 引越し (Moving) - request
// ============================================================

const day307: MasterExpression[] = [
  {
    daySlot: 307,
    japanese: '見積もりをお願いできますか',
    english: [
      'Can I get a quote?',
      'Could you give me an estimate for my move?',
      'I call a moving company and ask them to come to my apartment to give me a price estimate.',
      'Sure thing! Third floor with no elevator does add a bit to the price, but we can send someone over this week to take a look. How\'s Thursday morning?'
    ],
    jaTranslations: [
      '見積もりをお願いできますか。',
      '見積もり出してもらえます？',
      '引越し業者に電話して、部屋を見に来て金額を出してほしいと頼む。',
      'もちろん！3階でエレベーターなしだと少し上がりますけど、今週誰か見に行けますよ。木曜の午前はどうですか？'
    ],
    context: '「見積もり」は英語で"quote"か"estimate"。"quote"の方がカジュアルで口語的。"estimate"は少し正式。日本の引越し業者の訪問見積もりは英語圏でも一般的。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '梱包材って用意してもらえますか',
    english: [
      'Can you provide packing materials?',
      'Do you guys supply the boxes and packing stuff?',
      'I ask the moving company whether they provide cardboard boxes, tape, and bubble wrap as part of their service.',
      'Yep, we include boxes, tape, and bubble wrap with every package. We\'ll drop them off a week before your move so you\'ve got plenty of time to pack.'
    ],
    jaTranslations: [
      '梱包材を用意してもらえますか。',
      '段ボールとか梱包材って出してもらえます？',
      '引越し業者にダンボール、テープ、プチプチがサービスに含まれるか聞く。',
      'はい、どのプランでもダンボール、テープ、プチプチ全部付いてますよ。引越しの1週間前にお届けするんで、ゆっくり詰められます。'
    ],
    context: '「梱包材」は英語で"packing materials"。日本語の「梱包」は堅いけど、英語は"packing stuff"くらいカジュアルに言える。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: 'エアコンの取り外しもお願いできますか',
    english: [
      'Can you remove the air conditioner too?',
      'Do you handle air conditioner removal as well?',
      'I ask the moving company if they can disconnect and reinstall my air conditioner at the new place.',
      'We work with a certified technician for that. It\'s an extra 15,000 yen for removal and reinstallation. Want me to add it to your quote?'
    ],
    jaTranslations: [
      'エアコンの取り外しもお願いできますか。',
      'エアコンの取り外しもやってもらえます？',
      '引越し業者にエアコンの取り外しと新居での取り付けもできるか聞く。',
      '専門の技術者と提携してるんで大丈夫ですよ。取り外しと再設置で追加15,000円です。見積もりに入れときましょうか？'
    ],
    context: '「取り外し」は日本語だと「取って外す」。英語は"remove"一語。日本の引越しでエアコン移設は定番オプションだけど、英語圏では備え付けが多いのでレアなリクエスト。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '大型家具の処分もお願いしたいです',
    english: [
      'I need help disposing of large furniture.',
      'Can you take away some big furniture I am not keeping?',
      'I ask the movers if they can haul away a couch and a bookshelf that I do not want to bring to my new place.',
      'We can handle that no problem. It\'s a flat fee per item for large furniture. I\'ll add it to the estimate so you can see the total.'
    ],
    jaTranslations: [
      '大型家具の処分もお願いしたいです。',
      'いらない大きい家具も持ってってもらえます？',
      '新居に持っていかないソファと本棚を引越し業者に引き取ってもらえるか聞く。',
      '全然大丈夫ですよ。大型家具は1点ごとの定額制です。見積もりに入れとくんで合計確認してください。'
    ],
    context: '「処分」は英語で"dispose of"だけど堅い。口語では"get rid of"か"take away"。日本語の「処分」には「罰する」意味もあるけど、ここは「捨てる」。',
    character: 'kenji',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '電気ガス水道の手続きを忘れてた',
    english: [
      'I forgot to set up the utilities.',
      'Shoot, I totally forgot to arrange the utilities.',
      'I realize a few days before the move that I have not contacted the utility companies to transfer my services.',
      'Relax, you can usually get electric and water turned on the same day if you call now. Gas takes a day or two since they need someone to come out. Just do it today and you\'ll be fine.'
    ],
    jaTranslations: [
      '電気ガス水道の手続きを忘れていました。',
      'やば、電気ガス水道の手続き忘れてた。',
      '引越し数日前に、ライフラインの手続きをまだしてないことに気づく。',
      '落ち着けって、今電話すれば電気と水道は当日開通できるから。ガスは立ち会いがいるから1〜2日かかるけど。今日やれば間に合うよ。'
    ],
    context: '「忘れてた」のカジュアルな後悔。英語では"totally forgot"で同じ感じ。"Shoot"は"Shit"の上品版で自分のミスに気づいた時に使う。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '転送届を出さないと',
    english: [
      'I need to file a mail forwarding request.',
      'I have to set up mail forwarding before I move.',
      'I remind myself to go to the post office and submit a change of address form so my mail gets forwarded.',
      'You can totally do it online now. Takes like two minutes. I\'ll text you the link -- just do it right now before you forget again.'
    ],
    jaTranslations: [
      '転送届を出さないといけません。',
      '転送届出さなきゃ。',
      '郵便局に住所変更届を出して郵便物を転送してもらわないと、と自分に言い聞かせる。',
      '今ネットでできるよ。2分で終わる。リンク送るからまた忘れる前に今やっちゃえ。'
    ],
    context: '「転送届」は郵便局に出す届出。英語では"mail forwarding"。日本もアメリカも郵便局で手続きする点は同じ。アメリカはUSPSのサイトでオンラインでもできる。',
    character: 'yuki',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '鍵の受け渡しはいつですか',
    english: [
      'When is the key handover?',
      'When do I pick up the keys?',
      'I contact my new landlord to confirm the date and time for receiving the keys to my new apartment.',
      'You can pick them up the day before, that\'s no problem at all. Just swing by our office anytime between 10 and 5 and we\'ll hand them over.'
    ],
    jaTranslations: [
      '鍵の受け渡しはいつですか。',
      '鍵っていつもらえますか？',
      '新しい大家さんに鍵をもらう日時を確認する。',
      '前日に取りに来てもらって大丈夫ですよ。10時から5時の間にうちの事務所に寄ってもらえればお渡しします。'
    ],
    context: '「受け渡し」は「受ける」と「渡す」の両方の動作。英語では"handover"か単に"pick up"。日本語の方が双方向のニュアンスが込められている。',
    character: 'master',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: 'ご近所への挨拶回りしなきゃ',
    english: [
      'I need to introduce myself to the neighbors.',
      'I should go around and say hi to the neighbors.',
      'I tell my partner that we should bring small gifts and introduce ourselves to our new neighbors.',
      'Yeah, let\'s do it Saturday. Grab some cookies from that bakery down the street -- nothing fancy, just something to break the ice.'
    ],
    jaTranslations: [
      'ご近所への挨拶回りをしないと。',
      'ご近所に挨拶しに行かなきゃ。',
      '新居の近所にちょっとした手土産を持って自己紹介しに行こうとパートナーに言う。',
      'うん、土曜にやろう。通りのパン屋でクッキーでも買ってさ。大したものじゃなくていいから、きっかけ作りだよ。'
    ],
    context: '「挨拶回り」は日本の引越し文化の象徴。英語圏では近所に挨拶に行く習慣は薄い。逆に近所の人がwelcome giftを持ってくるパターンの方が多い。',
    character: 'lisa',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: '荷解きが終わる気がしない',
    english: [
      'I feel like unpacking will never end.',
      'I do not think I will ever finish unpacking.',
      'Surrounded by boxes in my new apartment, I complain to a friend that the unpacking feels endless.',
      'Ha, same thing happened to me. Just focus on the kitchen first and leave the rest for later. You\'ll survive on takeout a few more days.'
    ],
    jaTranslations: [
      '荷解きが終わる気がしません。',
      '荷解き、一生終わる気がしない。',
      '新居でダンボールに囲まれながら、荷解きが永遠に終わらないと友達にぼやく。',
      'あはは、俺もそうだった。まずキッチンだけやって残りは後でいいから。あと数日はデリバリーで生き延びろ。'
    ],
    context: '「気がしない」は日本語の面白い表現。「終わる気がしない」で「終わりそうにない」を感覚で表現。英語では"I feel like...will never"で同じ絶望感。',
    character: 'takeshi',
    category: 'request',
    month: '2027-02'
  },
  {
    daySlot: 307,
    japanese: 'やっと落ち着いた感じがする',
    english: [
      'I finally feel settled in.',
      'I think I am finally starting to feel at home.',
      'After weeks of unpacking and organizing, I sit down in my new living room and feel like this place is finally mine.',
      'That\'s awesome, you should have us over! Nothing beats that feeling of finally being settled. Took me like two months last time.'
    ],
    jaTranslations: [
      'やっと落ち着いた感じがします。',
      'やっと落ち着いた感じする。',
      '何週間もかけて荷解きと片付けをして、新しいリビングでやっとここが自分の家だと感じる。',
      'いいじゃん、今度遊びに行かせて！あの「やっと落ち着いた」感は最高だよね。俺は前回2ヶ月かかったわ。'
    ],
    context: '「落ち着いた」は物理的にも精神的にも使える万能語。英語では"settled in"が物理的、"feel at home"が精神的。"settle"はsettle a dispute(紛争解決)とも同根。',
    character: 'mina',
    category: 'request',
    month: '2027-02'
  }
];

const day307Keywords: KeyWord[] = [
  { en: 'quote', ja: '見積もり', pron: 'kwoht', example: 'Can you give me a quote for this job?', note: '名言の"quote"と同じ単語。文脈で区別' },
  { en: 'utilities', ja: '電気ガス水道(ライフライン)', pron: 'yoo-TIL-ih-teez', example: 'Utilities are not included in the rent.', note: '通常複数形で使う。utility bill=光熱費' },
  { en: 'forwarding', ja: '転送', pron: 'FOR-wer-ding', example: 'Set up mail forwarding at the post office.', note: 'forward(前に送る)から。メール転送も同じ単語' },
  { en: 'settled in', ja: '落ち着いた', pron: 'SET-uhld in', example: 'It took a while, but I am finally settled in.', note: 'settle=落ち着く。settle down=定住する/結婚する' },
  { en: 'unpack', ja: '荷解きする', pron: 'un-PAK', example: 'I still have not finished unpacking.', note: 'un-(逆)+pack(詰める)=荷解き。シンプルな構造' }
];

// ============================================================
// Exports
// ============================================================

export const MONTH11_W41_EXPRESSIONS: MasterExpression[] = [
  ...day301,
  ...day302,
  ...day303,
  ...day304,
  ...day305,
  ...day306,
  ...day307
];

export const MONTH11_W41_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
  301: { title: '病院で', titleEn: 'At the Hospital', category: 'request', scene: '居酒屋で常連が健康診断の結果を見せ合いながら、病院でのやり取りを再現している。', keywords: day301Keywords },
  302: { title: '銀行で', titleEn: 'At the Bank', category: 'request', scene: '口座開設で苦労した話を居酒屋のカウンターで語り、店主が「俺も窓口で固まった」と共感。', keywords: day302Keywords },
  303: { title: '役所で', titleEn: 'At the Government Office', category: 'request', scene: '引越し後の届出で役所をたらい回しにされた愚痴を、居酒屋で仲間にぶちまけている。', keywords: day303Keywords },
  304: { title: '不動産', titleEn: 'Real Estate', category: 'request', scene: '物件探しの内見帰りに居酒屋へ直行し、間取りや家賃の交渉術について熱く議論中。', keywords: day304Keywords },
  305: { title: '保険の話', titleEn: 'Insurance Talk', category: 'social', scene: '保険の見直しを勧められた話を居酒屋で相談。「結局どれがいいの？」と全員が首をかしげる。', keywords: day305Keywords },
  306: { title: '法律の話', titleEn: 'Legal Matters', category: 'social', scene: '隣人トラブルで弁護士に相談した経緯を居酒屋で報告。法律用語に全員が目を白黒させている。', keywords: day306Keywords },
  307: { title: '引越し', titleEn: 'Moving', category: 'request', scene: '引越し業者とのやり取りや新居の話を居酒屋で披露。「段ボールまだ開けてない」がオチ。', keywords: day307Keywords }
};
