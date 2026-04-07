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
      'Have you noticed how strict they have gotten about copyright recently? A friend of mine posted a video with some background music and it got taken down within like an hour. And then there is all this stuff about AI and who owns the content it generates. It used to be way more relaxed. Now companies are suing over everything. It makes me nervous about even sharing stuff on social media.'
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
      'I really need legal advice but there is no way I can afford a lawyer right now. I have heard that some places offer free consultations. Do you know where I can find something like that? Is it the city that runs it, or is it a private thing? I just need someone to tell me if I even have a case before I start spending money I do not have.'
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
      'Let me give you one piece of advice my dad gave me that I have never forgotten. Never, ever cosign a loan for anyone. Not for a friend, not even for family. It sounds harsh, but the moment you put your name on that paper, you are on the hook for the full amount if they cannot pay. I have seen friendships and even families destroyed over this. Just do not do it.'
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
      'Look, I get that you did not know it was illegal, but that is not going to help you if you get caught. The law does not care whether you knew about it or not. Ignorance is not a defense. You need to look into this properly before you keep doing it. I am not trying to scare you, but I would rather you hear it from me now than from a judge later.'
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
      'Hi, I am moving at the end of next month and I wanted to get a quote. I am in a two-bedroom apartment on the third floor with no elevator, if that matters. I do not have a ton of furniture, mostly just the basics plus a bunch of boxes. Could someone come take a look and give me an estimate? I am getting quotes from a few places so I can compare.'
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
      'One thing I wanted to ask about is the boxes and packing materials. Do you provide those, or do I need to get my own? Last time I moved, I spent way too long hunting for cardboard boxes at the supermarket. If you can deliver everything I need ahead of time, that would save me a huge headache. How many boxes does a two-bedroom apartment usually need?'
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
      'Oh, one more thing. I have an air conditioner that I bought myself, so I need to take it with me. Can you guys handle the removal and reinstallation at the new apartment? I know it requires a specialist, so is that something you arrange on your end or do I need to hire someone separately? How much extra would that be?'
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
      'I have a big old couch and a bookshelf that are not worth bringing to the new place. They are too heavy for me to take to the dump myself. Can you guys take them away for me? How much would that cost on top of the moving fee? I would rather pay a little extra and have it all done in one go than deal with it separately.'
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
      'Oh no, I just realized I completely forgot to call the electric company, the gas company, and the water company to set up service at my new place. I move in three days. Am I going to show up to a dark apartment with no hot water? How quickly can they get it turned on? I should have done this weeks ago. I am such an idiot.'
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
      'I keep putting this off, but I really need to go to the post office and set up mail forwarding. Last time I moved, I forgot and missed a bunch of important letters, including a bill that ended up going to collections because I never saw it. You can do it online now, right? Or do I still have to go in person? I should just do it today before I forget again.'
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
      'Hi, I am moving in on the first and I wanted to confirm when I can pick up the keys. Can I get them the day before so I can start bringing some small stuff over? Or does it have to be on the actual move-in date? Also, where do I pick them up? Do I go to your office or do we meet at the apartment? I want to make sure everything is set so moving day goes smoothly.'
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
      'We should go around and introduce ourselves to the neighbors this weekend. I know it is kind of old-fashioned, but I think it makes a good first impression. Maybe we should bring something small, like cookies or something. Last time we moved, we did not do it and the lady next door gave us dirty looks for months. Let us just get it done early so we start off on the right foot.'
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
      'I have been unpacking for three days straight and I swear the number of boxes has not gone down at all. Every time I finish one room, I walk into another and there are ten more boxes waiting. And the worst part is I cannot find anything. My can opener is in one of these boxes somewhere and I have been eating takeout for three days because I cannot even make a simple meal. Send help.'
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
      'You know what, I think I am finally starting to feel at home here. It took almost a month, but the last box is unpacked, everything has a place, and I actually know where the light switches are without having to fumble around in the dark. I even figured out which grocery store is closest and which coffee shop has the best stuff. It is starting to feel like my place now, not just some random apartment.'
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
