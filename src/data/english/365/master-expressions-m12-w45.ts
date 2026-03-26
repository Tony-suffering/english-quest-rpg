// Month 12 Week 45: 総復習1 -- サバイバルから日常へ / Review 1
// Days 331-337 (GRADUATION MONTH - reflective, warm, nostalgic)

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Keywords (5 per day)
// ============================================================

const DAY_331_KEYWORDS: KeyWord[] = [
  { en: 'long time', ja: '久しぶり', pron: 'lawng taim', example: 'It has been a long time since we last met.', note: '「久しぶり」を直訳すると不自然。英語では状況で使い分ける' },
  { en: 'doing well', ja: '元気にしている', pron: 'DOO-ing wel', example: 'I hope you are doing well these days.', note: 'How are you?の返しだけでなく、こちらから切り出す形でも使える' },
  { en: 'catch up', ja: '近況を話す', pron: 'kach uhp', example: 'We should catch up over coffee sometime.', note: '日本語の「積もる話」に近い。再会の挨拶とセットで使う' },
  { en: 'pleasure', ja: '光栄', pron: 'PLEH-zher', example: 'It is a pleasure to finally meet you in person.', note: 'はじめましてのフォーマル版。ビジネスや目上の人に' },
  { en: 'take care', ja: '気をつけて', pron: 'tayk kair', example: 'Take care of yourself and stay healthy.', note: '別れ際の定番。日本語より軽いニュアンスで使える' },
];

const DAY_332_KEYWORDS: KeyWord[] = [
  { en: 'on the side', ja: '別添えで', pron: 'on thuh said', example: 'Can I get the dressing on the side?', note: '日本語では「別で」の一言。英語はon the sideという決まり文句' },
  { en: 'still or sparkling', ja: '普通の水か炭酸水か', pron: 'stil or SPAR-kling', example: 'Would you like still or sparkling water?', note: '海外レストランの定番質問。日本ではまず聞かれない' },
  { en: 'check', ja: 'お会計', pron: 'chek', example: 'Could we get the check when you have a moment?', note: 'bill も同じ意味。アメリカはcheck、イギリスはbill が多い' },
  { en: 'medium rare', ja: 'ミディアムレア', pron: 'MEE-dee-um rair', example: 'I would like my steak medium rare, please.', note: '焼き加減は英語でそのまま通じる数少ない外来語' },
  { en: 'allergy', ja: 'アレルギー', pron: 'AL-er-jee', example: 'I have a nut allergy, so please double-check.', note: '発音注意。日本語の「アレルギー」とは全然違う音' },
];

const DAY_333_KEYWORDS: KeyWord[] = [
  { en: 'browse', ja: '見て回る', pron: 'browz', example: 'I am just browsing, thanks.', note: '「見ているだけです」の英語版。店員への返答に必須' },
  { en: 'fit', ja: 'サイズが合う', pron: 'fit', example: 'Does this fit all right or should I try a smaller size?', note: '日本語の「合う」は万能だが、英語は服はfit、色はmatch、と使い分ける' },
  { en: 'receipt', ja: 'レシート', pron: 'rih-SEET', example: 'Could I get a receipt for this purchase?', note: 'pは発音しない。日本語の「レシート」とアクセントが逆' },
  { en: 'refund', ja: '返金', pron: 'REE-fund', example: 'Is it possible to get a refund on this item?', note: '返品はreturn、返金はrefund。日本語では「返品」で両方カバーしがち' },
  { en: 'deal', ja: 'お得', pron: 'deel', example: 'That is a really good deal for the quality.', note: '「お買い得」の英語。bargainよりカジュアル' },
];

const DAY_334_KEYWORDS: KeyWord[] = [
  { en: 'transfer', ja: '乗り換え', pron: 'TRANS-fer', example: 'You need to transfer at the next station.', note: '電車の乗り換えも飛行機の乗り継ぎもtransferで通じる' },
  { en: 'one-way', ja: '片道', pron: 'wun-way', example: 'A one-way ticket to downtown, please.', note: '往復はround-trip。日本語の「片道・往復」より具体的な表現' },
  { en: 'gate', ja: '搭乗口', pron: 'gayt', example: 'What gate does the flight depart from?', note: '空港のゲートは日本語でも使うが、英語では出発全般に使う' },
  { en: 'delay', ja: '遅延', pron: 'dih-LAY', example: 'There is a thirty-minute delay on the express line.', note: '日本語では「遅れ」で済むが、英語はdelay(名詞)とdelayed(形容詞)を使い分ける' },
  { en: 'drop off', ja: '降ろす', pron: 'drop awf', example: 'Can you drop me off at the corner over there?', note: 'タクシーで「ここで降ろして」。pick upの反対' },
];

const DAY_335_KEYWORDS: KeyWord[] = [
  { en: 'relieved', ja: 'ほっとした', pron: 'rih-LEEVD', example: 'I am so relieved everything worked out.', note: '「安心した」の英語。日本語ほど気軽に使わないが、深い安堵感を表す' },
  { en: 'overwhelmed', ja: '圧倒されている', pron: 'oh-ver-WELMD', example: 'I feel a bit overwhelmed with everything going on.', note: '良い意味でも悪い意味でも使う。日本語の「いっぱいいっぱい」に近い' },
  { en: 'grateful', ja: '感謝している', pron: 'GRAYT-ful', example: 'I am truly grateful for all your support.', note: 'thankfulより深い感謝。日本語の「ありがたい」のニュアンス' },
  { en: 'nostalgic', ja: '懐かしい', pron: 'nah-STAL-jik', example: 'This song makes me feel so nostalgic.', note: '日本語の「懐かしい」は気軽に使うが、英語のnostalgicはもう少し重い' },
  { en: 'proud', ja: '誇りに思う', pron: 'prowd', example: 'I am really proud of how far you have come.', note: '日本語では「誇り」を口にするのは大げさだが、英語では日常的に使う' },
];

const DAY_336_KEYWORDS: KeyWord[] = [
  { en: 'favor', ja: 'お願い', pron: 'FAY-ver', example: 'Can I ask you a favor real quick?', note: '「ちょっとお願いがあるんだけど」の定番。日本語より前置きが短い' },
  { en: 'bother', ja: '迷惑をかける', pron: 'BAH-ther', example: 'Sorry to bother you, but could you help me out?', note: '「お手数ですが」に近い。日本語ほど頻繁に謝らなくてもいい' },
  { en: 'mind', ja: '気にする', pron: 'mahynd', example: 'Would you mind opening the window for me?', note: 'Would you mind...は丁寧な依頼。Do you mind...はカジュアル' },
  { en: 'appreciate', ja: '感謝する', pron: 'uh-PREE-shee-ayt', example: 'I really appreciate you taking the time.', note: 'thankよりフォーマルな感謝。ビジネスでも日常でも使える万能語' },
  { en: 'hand', ja: '手を貸す', pron: 'hand', example: 'Could you give me a hand with these bags?', note: '「手伝って」のカジュアル版。helpより気軽で友達向き' },
];

const DAY_337_KEYWORDS: KeyWord[] = [
  { en: 'by the way', ja: 'ところで', pron: 'bai thuh way', example: 'By the way, have you tried that new place downtown?', note: '話題転換の定番。日本語の「そういえば」にも近い' },
  { en: 'speaking of', ja: 'それで言うと', pron: 'SPEE-king uhv', example: 'Speaking of food, I found an amazing ramen shop.', note: '前の話題から自然につなげる表現。日本語の「〜と言えば」' },
  { en: 'apparently', ja: 'どうやら', pron: 'uh-PAIR-unt-lee', example: 'Apparently they are closing the shop next month.', note: '伝聞のニュアンス。「らしいよ」を一語で表現できる便利な副詞' },
  { en: 'hilarious', ja: 'めちゃくちゃ面白い', pron: 'hih-LAIR-ee-us', example: 'That story you told last night was hilarious.', note: 'funnyの強調版。日本語の「やばい(面白い)」に近いテンション' },
  { en: 'vibe', ja: '雰囲気', pron: 'vahyb', example: 'This place has such a chill vibe, I love it.', note: 'atmosphereよりカジュアル。若者言葉だが今は全世代が使う' },
];

// ============================================================
// Day Themes
// ============================================================

export const MONTH12_W45_DAY_THEMES: Record<number, {
  title: string;
  titleEn: string;
  category: string;
  scene: string;
  keywords: KeyWord[];
}> = {
  331: { title: '挨拶の極意', titleEn: 'The Art of Greeting', category: 'greeting', scene: '卒業の季節。居酒屋で久しぶりに再会した仲間たちが、懐かしい挨拶を交わす。', keywords: DAY_331_KEYWORDS },
  332: { title: '注文の極意', titleEn: 'The Art of Ordering', category: 'order', scene: '卒業祝いの宴会。幹事が慣れた手つきで料理と飲み物を次々と注文していく。', keywords: DAY_332_KEYWORDS },
  333: { title: '買い物の極意', titleEn: 'The Art of Shopping', category: 'shopping', scene: '卒業旅行の準備。仲間と一緒にお土産や必要なものを買い回る一日。', keywords: DAY_333_KEYWORDS },
  334: { title: '移動の極意', titleEn: 'The Art of Travel', category: 'travel', scene: '卒業旅行当日。空港での乗り継ぎやタクシーの手配など、移動の場面が続く。', keywords: DAY_334_KEYWORDS },
  335: { title: '気持ちの極意', titleEn: 'The Art of Feeling', category: 'feeling', scene: '旅先の居酒屋で、卒業への複雑な気持ちを語り合う夜。安堵も寂しさも全部ここに。', keywords: DAY_335_KEYWORDS },
  336: { title: 'お願いの極意', titleEn: 'The Art of Requesting', category: 'request', scene: '最後の打ち上げ準備。店への予約変更や仲間への頼みごとが飛び交う。', keywords: DAY_336_KEYWORDS },
  337: { title: '雑談の極意', titleEn: 'The Art of Small Talk', category: 'social', scene: '打ち上げ本番。話題が次々と飛び、笑いと懐かしさが入り混じる居酒屋の夜。', keywords: DAY_337_KEYWORDS },
};

// ============================================================
// Day 331: 挨拶の極意 (greeting)
// ============================================================

const DAY_331: MasterExpression[] = [
  {
    daySlot: 331,
    japanese: '久しぶり！元気だった？',
    english: [
      'Long time no see!',
      'Hey, it has been ages! How have you been doing?',
      'I ran into an old college friend at the station and said, long time no see, how have you been?',
      'You know that feeling when you bump into someone you have not seen in years? Your face just lights up and you go, oh my God, long time no see! How have you been? I have been meaning to reach out but life just got in the way. We should grab coffee and catch up properly.',
    ],
    context: '日本語の「久しぶり」は万能だけど、英語ではIt has been a while, Long time no see, It has been agesと距離感で使い分ける。居酒屋で再会したら、ビールぶつけながらLong time no see!でOK。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'お会いできて光栄です',
    english: [
      'Nice to meet you.',
      'It is such a pleasure to finally meet you in person.',
      'At the conference reception, I shook her hand and said, it is such a pleasure to finally meet you.',
      'I had been emailing this professor for months about the research project, and when I finally met her at the conference, I walked up and said, it is such a pleasure to finally meet you in person. She smiled and said the feeling was mutual. Sometimes the real connection starts when you actually shake hands.',
    ],
    context: '「光栄です」って日本語では結構使うけど、英語のIt is an honorはかなり大げさ。普通はIt is a pleasure to meet youで十分フォーマル。居酒屋のマスターに使ったら逆に笑われる。',
    character: 'lisa',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'お元気ですか？',
    english: [
      'How are you?',
      'How have you been holding up lately?',
      'I called my old mentor last weekend and asked, how have you been holding up with everything going on?',
      'When I called my old mentor, I did not just say how are you, because that feels too automatic. Instead I asked, how have you been holding up with everything going on? He paused for a second and then really opened up about his year. Sometimes asking the question differently makes people give you a real answer instead of the usual fine, thanks.',
    ],
    context: '「お元気ですか」に対してHow are you?は自動応答みたいなもの。本当に相手の調子を聞きたいなら、How have you been?やHow are you holding up?のほうが気持ちが伝わる。',
    character: 'master',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'また会えてうれしいよ',
    english: [
      'Good to see you again.',
      'It is really great to see you again after all this time.',
      'When my buddy walked into the bar, I stood up and said, it is really great to see you again, man.',
      'My college roommate showed up at the bar after being overseas for three years. I jumped off my stool, grabbed his shoulder and said, it is really great to see you again, man. I mean it. Some friendships just pick up right where they left off, no matter how much time passes. That is the best kind.',
    ],
    context: '日本語の「会えてうれしい」はストレートだけど、英語でI am happy to see youというと少し子供っぽい。Great to see youが大人の再会の定番。',
    character: 'takeshi',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: '最近どう？',
    english: [
      'What is up?',
      'So what have you been up to these days?',
      'I sat down next to my coworker at lunch and asked, so what have you been up to lately?',
      'I had not talked to my coworker outside of meetings for weeks, so at lunch I just sat down next to him and asked, so what have you been up to lately? He started telling me about this hiking trip he took, and I realized I barely know anything about the people I work with every day. A simple question can change that.',
    ],
    context: '「最近どう？」はWhat is up?で軽く聞けるけど、もう少し踏み込むならWhat have you been up to?が自然。日本語の「どう？」の守備範囲が広すぎるだけ。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'よろしくお願いします',
    english: [
      'I look forward to it.',
      'I am looking forward to working with you on this.',
      'On my first day at the new office, I told my team, I am really looking forward to working with all of you.',
      'There is no perfect English translation for yoroshiku onegaishimasu. On my first day at the new office, I told my team, I am really looking forward to working with all of you. That covers the spirit of it. The trick is that English splits this one phrase into a dozen different expressions depending on the situation.',
    ],
    context: '「よろしくお願いします」は英語に直訳できない代表格。場面によってNice to meet you, I look forward to working with you, Please take care of itと全部変わる。これが分かれば挨拶マスター。',
    character: 'mina',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'お先に失礼します',
    english: [
      'I am heading out.',
      'All right, I am going to head out now. See you tomorrow.',
      'It was already past seven, so I told the team, I am going to head out now, see you all tomorrow.',
      'In Japan, saying osaki ni shitsurei shimasu when you leave the office before others is practically required. In English, there is no guilt built into the phrase. You just say, all right, I am going to head out now, see you tomorrow. No apology needed. That cultural difference alone took me a year to get comfortable with.',
    ],
    context: '「お先に失礼します」には「先に帰ってすみません」のニュアンスがあるけど、英語圏では先に帰ることに罪悪感がない。I am heading outで十分。謝る必要なし。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'お疲れさまです',
    english: [
      'Good work today.',
      'Great job today. You really put in the work.',
      'After the long meeting, I turned to my colleague and said, great job today, that presentation was solid.',
      'Otsukaresama is another one of those Japanese expressions that has no clean English equivalent. After a long day, you might say, great job today, or good work out there, or even just, what a day, right? The point is English picks a specific compliment or observation instead of one universal phrase that covers everything.',
    ],
    context: '「お疲れさま」も直訳不可能シリーズ。英語では具体的に何を褒めるかがポイント。Good job on the presentationとか、What a day, right?とか。状況で変える力が挨拶力。',
    character: 'master',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: '気をつけて帰ってね',
    english: [
      'Get home safe.',
      'Be careful out there and get home safe, all right?',
      'It was raining hard, so I told her at the door, be careful out there and get home safe.',
      'When someone leaves your place late at night and it is pouring rain, you stand at the door and say, be careful out there and get home safe, all right? Text me when you get in. In Japanese you say ki wo tsukete, but in English you tend to add that extra bit about texting. It shows you actually care, not just going through the motions.',
    ],
    context: '「気をつけてね」はTake careでもいいけど、本当に心配しているならGet home safeが温かい。Text me when you get homeを足すと更に気持ちが伝わる。',
    character: 'lisa',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 331,
    japanese: 'いってきます',
    english: [
      'I am off.',
      'All right, I am heading out. See you later!',
      'I grabbed my keys, called out to my wife, all right, I am heading out, see you tonight!',
      'Ittekimasu literally means I will go and come back, and it is beautiful because it assumes you are coming home. English does not have that built-in promise. You just say, I am heading out, or I am off, and maybe add see you tonight. But there is something nice about learning that the Japanese version carries a tiny contract of return. Makes you appreciate both languages.',
    ],
    context: '「いってきます」の「帰ってくるからね」というニュアンスは英語にない。I am offとかI am heading outで出発を伝えて、See you tonightで「戻るよ」を足す。二言で一つの気持ち。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-03',
  },
];

// ============================================================
// Day 332: 注文の極意 (order)
// ============================================================

const DAY_332: MasterExpression[] = [
  {
    daySlot: 332,
    japanese: 'おすすめは何ですか？',
    english: [
      'What do you recommend?',
      'What would you recommend if this is my first time here?',
      'I sat at the counter and asked the bartender, what would you recommend if this is my first time here?',
      'Walking into a restaurant for the first time can be overwhelming, especially when the menu is ten pages long. I just sat at the counter and asked the bartender, what would you recommend if this is my first time here? He lit up and started telling me about the house special. People love being asked for recommendations. It makes them feel like experts.',
    ],
    context: '「おすすめ」は英語でrecommendation。でも会話ではWhat do you recommend?と動詞で聞くのが自然。名詞のrecommendationを使うとちょっと堅い。',
    character: 'master',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'これ、もう一つください',
    english: [
      'One more, please.',
      'Could I get another one of these when you get a chance?',
      'I held up my empty glass and said to the waiter, could I get another one of these?',
      'There is an art to reordering at a bar. You do not just shout another one. You hold up your glass, make eye contact, and say, could I get another one of these when you get a chance? The when you get a chance part is key. It shows you respect that they are busy. Good manners get you faster service, funny enough.',
    ],
    context: '「もう一つ」はanother oneで簡単だけど、when you get a chanceを足すと一気に大人の注文になる。日本語の「すみません、もう一つ」の「すみません」に相当する気遣い。',
    character: 'takeshi',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'これ抜きでお願いします',
    english: [
      'Without this, please.',
      'Could I get this without the onions?',
      'I pointed at the menu and said, could I get the burger without the onions and extra pickles instead?',
      'Customizing your order is totally normal in the States. You can say, could I get this without the onions, or hold the mayo, or can you swap the fries for a salad. In Japan, changing the menu feels like an imposition. In America, the whole system is built around having it your way. That cultural shift takes some getting used to.',
    ],
    context: '「抜きで」はwithout一語で解決。hold the mayoみたいなスラングもある。日本では注文変更に遠慮するけど、英語圏では当たり前。堂々とカスタマイズしていい。',
    character: 'yuki',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'お会計お願いします',
    english: [
      'Check, please.',
      'Could we get the check whenever you are ready?',
      'After the last round of drinks, I caught the server and said, could we get the check whenever you are ready?',
      'In Japan, you walk up to the register. In America, the server brings the check to your table. So you have to ask for it. Could we get the check whenever you are ready works great. Some people just say check, please, which is fine too. The real culture shock is adding the tip. That math at the end of every meal never gets easy.',
    ],
    context: '会計の仕組みが日本と全然違う。レジに行くのではなく、テーブルで精算。Could we get the check?が定番。wheneverを入れると「急がなくていいですよ」の気遣い。',
    character: 'lisa',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'これ、テイクアウトできますか？',
    english: [
      'Can I get this to go?',
      'Is it possible to get this to go instead?',
      'I realized I was running late, so I asked, sorry, is it possible to get this to go instead?',
      'To go is the magic phrase for takeout in America. Can I get this to go? works everywhere from coffee shops to fancy restaurants. In the UK they say takeaway. The interesting thing is that in Japan, omochi kaeri is more formal, but in English to go is completely casual. No formality needed at all.',
    ],
    context: '「テイクアウト」は和製英語っぽく聞こえるけど実は通じる。でもアメリカではto goが圧倒的に自然。Can I get this to go?を覚えれば全米どこでも使える。',
    character: 'kenji',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'ドレッシングは別でお願いします',
    english: [
      'Dressing on the side.',
      'Could I get the dressing on the side, please?',
      'I ordered the Caesar salad and added, could I get the dressing on the side?',
      'On the side is one of those restaurant phrases that does not translate directly into Japanese. Betsu zoe de comes close, but it is not as common in Japan. In America, getting dressing on the side is so normal that servers do not even blink. It is part of the customization culture. You control how much goes on your salad.',
    ],
    context: '「別添えで」はon the sideが決まり文句。日本のレストランでは「別で」と言うけど、アメリカではon the sideが完全に定着。サラダ注文の必須フレーズ。',
    character: 'mina',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'アレルギーがあるんですが',
    english: [
      'I have an allergy.',
      'Just so you know, I have a pretty serious nut allergy.',
      'Before ordering, I told the waiter, just so you know, I have a pretty serious nut allergy, so could you double-check with the kitchen?',
      'Allergy communication is life or death, so you cannot be shy about it. I always tell the server right away, just so you know, I have a pretty serious nut allergy, could you double-check with the kitchen? In Japan, people sometimes feel embarrassed about being high-maintenance. In English-speaking countries, nobody judges you for it. Your safety comes first.',
    ],
    context: '発音注意。アレルギーはAL-er-jeeで、日本語とは全然違う音。伝え方もI have a nut allergyのように具体的に。命に関わるから遠慮は禁物。',
    character: 'master',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: 'すみません、注文いいですか？',
    english: [
      'Excuse me, can I order?',
      'Excuse me, are you ready to take our order?',
      'I waved to the server and said, excuse me, whenever you have a second, we are ready to order.',
      'Getting a server to come to your table is an art form. You do not yell sumimasen across the room like in a Japanese izakaya. You make eye contact, maybe give a small wave, and when they come over, you say, whenever you have a second, we are ready to order. The whenever you have a second is doing heavy lifting there. It keeps things polite without being pushy.',
    ],
    context: '日本の居酒屋では「すみません！」と大声で呼ぶけど、英語圏ではアイコンタクト＋小さな手振りが基本。大声は失礼。この文化の違いは注文の第一歩。',
    character: 'takeshi',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: '日替わりは何ですか？',
    english: [
      'What is the special?',
      'Do you have any specials today?',
      'I opened the menu but then asked, before I decide, do you have any specials today?',
      'Daily specials are a big deal in American restaurants. They are usually not on the menu, so you have to ask. Do you have any specials today? is the standard question. The server will then recite them from memory, sometimes with impressive detail. It is like a little performance. And honestly, the specials are often the best thing to order.',
    ],
    context: '「日替わり」はdaily specialまたはtoday is special。メニューに載っていないことが多いので、自分から聞く必要がある。聞かないと損する文化。',
    character: 'yuki',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 332,
    japanese: '取り皿もらえますか？',
    english: [
      'Can I get a plate?',
      'Could we get some extra plates for sharing?',
      'We ordered a bunch of appetizers, so I asked, could we get some extra plates for sharing?',
      'Sharing food is less common in American dining, so the concept of torizara does not really exist the same way. But if you are sharing, you just ask, could we get some extra plates? or some small plates for the table. The server will get it. What is funny is that in Japan every table automatically gets torizara, but in America you have to specifically request them.',
    ],
    context: '「取り皿」は英語に直訳しにくい。extra plates, small plates for sharingで通じる。そもそもアメリカではシェアする文化が薄いから、取り皿が自動で出てこない。',
    character: 'lisa',
    category: 'order',
    month: '2027-03',
  },
];

// ============================================================
// Day 333: 買い物の極意 (shopping)
// ============================================================

const DAY_333: MasterExpression[] = [
  {
    daySlot: 333,
    japanese: '見ているだけです',
    english: [
      'Just browsing.',
      'I am just looking around, thanks. I will let you know if I need anything.',
      'The shop assistant came up to me and I said, I am just looking around, but thanks, I will let you know if I need anything.',
      'In Japan, shop assistants tend to keep their distance. In America, they come right up to you the second you walk in. Having I am just browsing, thanks ready to go is essential survival English. Add I will let you know if I need anything and they will leave you alone. It is the polite way of saying please do not follow me around the store.',
    ],
    context: '「見ているだけです」は海外の店で最も使う防御フレーズ。Just browsingの一言で店員が引いてくれる。I will let you know if I need anythingを足すと完璧な距離感。',
    character: 'yuki',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: '試着してもいいですか？',
    english: [
      'Can I try this on?',
      'Would it be all right if I tried this on?',
      'I found a nice jacket and asked the clerk, would it be all right if I tried this on? Where are the fitting rooms?',
      'Can I try this on? is simple enough, but knowing the follow-up vocabulary matters. Fitting room, dressing room, changing room all mean the same thing. And after you try it on, they will ask, how did it work out? or did it fit? Not how was it, which is what Japanese speakers tend to say. The verb fit is your best friend in clothing stores.',
    ],
    context: '「試着」はtry onで簡単だけど、試着室の呼び方がfitting room, dressing room, changing roomと3パターンある。どれでも通じるから気にしなくていい。',
    character: 'mina',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'もう少し小さいサイズはありますか？',
    english: [
      'Do you have a smaller size?',
      'Do you have this in a size smaller?',
      'The medium was too loose, so I asked, do you have this in a small, or maybe an extra small?',
      'Sizing is tricky across countries. Japanese L is often an American M. So when you try something on and it is too big, you ask, do you have this in a size smaller? or do you have this in a small? The staff might say let me check in the back, which means they will look in the stockroom. Knowing that in the back means the storage area saves you a lot of confusion.',
    ],
    context: '日本とアメリカでサイズ感が全然違う。日本のLがアメリカのMだったりする。Do you have this in a smaller size?を覚えておけば、サイズ交渉はどこでもできる。',
    character: 'takeshi',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'これ、セールになりますか？',
    english: [
      'Is this on sale?',
      'Is this going to go on sale anytime soon?',
      'I really liked the bag but it was pricey, so I asked, is this going to go on sale anytime soon?',
      'Asking about upcoming sales is completely normal in America. Is this going to go on sale soon? or do you have any promotions coming up? Nobody will think you are cheap. In fact, many stores have price adjustment policies where if something goes on sale within a certain period after you buy it, they will refund the difference. Always worth asking.',
    ],
    context: '「セールになりますか」と聞くのは日本では少し気が引けるけど、英語圏では普通。Price adjustment(差額返金)の制度がある店も多い。聞いたもん勝ち。',
    character: 'lisa',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: '返品したいのですが',
    english: [
      'I would like to return this.',
      'Hi, I would like to return this. I have the receipt right here.',
      'I went back to the store the next day and said, hi, I would like to return this, I have the receipt right here.',
      'Returns are way more common and accepted in America than in Japan. You walk in, say I would like to return this, show your receipt, and usually that is it. No long explanation needed. In Japan, returning something feels like a big deal and you might get questioned about why. In America, the cashier barely bats an eye. It is just part of the shopping culture.',
    ],
    context: '返品文化が全然違う。日本では「申し訳ないのですが...」と恐る恐る言うけど、アメリカではI would like to return thisの一言でOK。理由すら聞かれないことが多い。',
    character: 'kenji',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'カードで払えますか？',
    english: [
      'Do you take cards?',
      'Do you accept credit cards, or is it cash only?',
      'Before ordering, I asked the food truck guy, do you accept credit cards, or is it cash only here?',
      'Do you take cards? is the quick version. Do you accept credit cards? is slightly more formal. In America, almost everywhere takes cards now, but food trucks and small shops might be cash only. Knowing how to ask saves you the embarrassment of standing there with no cash. Also, tap to pay and contactless are becoming the norm, so you might hear, we only take contactless.',
    ],
    context: '「カード使えますか」はDo you take cards?が一番自然。take=受け付ける、という意味。acceptはやや堅いけど丁寧。キャッシュレスが進んでもまだ聞く場面はある。',
    character: 'master',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'ラッピングしてもらえますか？',
    english: [
      'Could you gift wrap this?',
      'Would you be able to gift wrap this for me?',
      'It is for a birthday present, so I asked, would you be able to gift wrap this for me?',
      'Gift wrapping is free at most Japanese department stores, but in America it is often an extra charge or not available at all. Could you gift wrap this? is the right way to ask. If they do not offer it, they might point you to a gift wrapping station or suggest a gift bag instead. The concept of tsutsumi, that beautiful Japanese wrapping, does not really have an equivalent in English.',
    ],
    context: '日本のデパートの無料ラッピングは英語圏では珍しい。Gift wrapは有料か、そもそもやっていない店も多い。gift bagを買って自分で入れるのがアメリカ流。',
    character: 'yuki',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'これ、他の色はありますか？',
    english: [
      'Do you have other colors?',
      'Does this come in any other colors?',
      'I liked the design but not the color, so I asked, does this come in any other colors or patterns?',
      'Does this come in other colors? is the natural way to ask. The verb come in is key here. Japanese speakers tend to say do you have this in other colors, which works too, but come in sounds more native. You will also hear does it come in black? or does it come in a larger size? The pattern works for colors, sizes, and styles.',
    ],
    context: 'come inは「〜がある」の意味で使う万能動詞。Does this come in black?のように色・サイズ・柄に全部使える。do you have以外の選択肢を持つと表現が広がる。',
    character: 'mina',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'ちょっと考えさせてください',
    english: [
      'Let me think about it.',
      'I need a little time to think it over, if that is okay.',
      'The salesperson was pushing hard, so I said, I appreciate it, but let me think it over and I will come back.',
      'Let me think about it is the polite exit strategy for high-pressure sales situations. In Japan, you might say chotto kangaesasete kudasai and bow slightly. In English, you add I will come back or I might come back later. Everyone knows you probably will not come back, but it is the graceful way out. Beats saying no thanks and walking away.',
    ],
    context: '「ちょっと考えます」は買わない時の逃げ文句として万国共通。Let me think about itと言えば店員も分かってくれる。I will come back laterを足すとさらに角が立たない。',
    character: 'takeshi',
    category: 'shopping',
    month: '2027-03',
  },
  {
    daySlot: 333,
    japanese: 'これ、お得ですね',
    english: [
      'That is a good deal.',
      'Wow, that is a really good deal for the quality.',
      'I found a cashmere sweater for thirty dollars and said to my friend, that is a really good deal for the quality.',
      'A good deal, a steal, a bargain. English has a lot of ways to say otoku. That is a good deal is the safest and most common. What a steal means it is so cheap it feels like you are stealing it. And if you want to sound really excited, you can say, I got it for a steal. Bargain is slightly more British. Pick your favorite and use it every time you find something cheap.',
    ],
    context: '「お得」はa good dealが一番使いやすい。What a steal!は「盗んだみたいに安い」という意味で、興奮した時に使う。bargainはイギリス寄り。',
    character: 'lisa',
    category: 'shopping',
    month: '2027-03',
  },
];

// ============================================================
// Day 334: 移動の極意 (travel)
// ============================================================

const DAY_334: MasterExpression[] = [
  {
    daySlot: 334,
    japanese: 'この電車は〇〇に止まりますか？',
    english: [
      'Does this stop at...?',
      'Excuse me, does this train stop at Union Station?',
      'I was not sure if I was on the right platform, so I asked someone, does this train stop at Union Station?',
      'Navigating public transit in a foreign country is stressful. The simplest question, does this train stop at a specific station, can save you from ending up in the wrong part of the city. I learned this the hard way in London when I took the wrong line and ended up thirty minutes from where I needed to be. Now I always ask, even when I think I know.',
    ],
    context: '「止まりますか」はstop atで直訳OK。でも英語圏の電車は快速・各停の区別が日本ほど明確でないことがある。不安なら聞く。Does this stop at...?は旅の命綱。',
    character: 'kenji',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: '片道一枚ください',
    english: [
      'One-way, please.',
      'Can I get a one-way ticket to downtown?',
      'I walked up to the ticket counter and said, can I get a one-way ticket to downtown, please?',
      'One-way means katamichi, round-trip means ofuku. These translate pretty cleanly, which is nice. At a ticket counter, you just say, one-way to downtown, please, and they will sort you out. The tricky part is when they ask you peak or off-peak? That means rush hour pricing versus regular pricing. Off-peak is cheaper, so if your schedule is flexible, always go for it.',
    ],
    context: '片道one-way、往復round-tripはそのまま通じる。peak/off-peakはラッシュ時かどうかで料金が変わる仕組み。日本にはあまりない概念。off-peakを狙うと節約できる。',
    character: 'yuki',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'ここで降ります',
    english: [
      'This is my stop.',
      'Oh, this is my stop. Excuse me, coming through.',
      'The bus was packed and I had to push my way out, saying, this is my stop, excuse me, coming through.',
      'This is my stop is one of those phrases that feels natural once you know it, but Japanese speakers often try to say I get off here, which sounds a bit awkward. My stop implies ownership and familiarity. And when the bus or train is crowded, you add excuse me, coming through to make your way to the door. Do not be shy about it. Missing your stop because you were too polite to push is a rookie mistake.',
    ],
    context: '「ここで降ります」はThis is my stopが自然。I get off hereより英語らしい。混んでいる時はExcuse me, coming throughで道を作る。遠慮していると乗り過ごす。',
    character: 'master',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'タクシーを呼んでもらえますか？',
    english: [
      'Could you call a taxi?',
      'Would you be able to call a taxi for me?',
      'It was late and there were no buses, so I asked the hotel front desk, would you be able to call a taxi for me?',
      'These days most people just use a rideshare app, but knowing how to ask for a taxi is still important. Could you call a taxi for me? works at hotels, restaurants, and anywhere with staff. The person might say, do you want me to call an Uber instead? and then you learn that in many cities, rideshare has basically replaced traditional taxis. Language evolves with technology.',
    ],
    context: '今はUber/Lyftが主流だけど、タクシーの呼び方も知っておく必要がある。call a taxiが定番。ホテルのフロントで頼むのが一番確実。',
    character: 'lisa',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: '道に迷いました',
    english: [
      'I am lost.',
      'Sorry, I think I am completely lost. Could you point me in the right direction?',
      'I wandered around for twenty minutes before asking a stranger, sorry, I think I am completely lost, could you help me out?',
      'I am lost is simple but admitting it takes courage, especially in a foreign language. Adding could you point me in the right direction makes it a complete interaction. People are usually happy to help. What I learned over the years is that getting lost is actually one of the best ways to discover a city. But when you need to be somewhere on time, swallow your pride and ask.',
    ],
    context: '「道に迷った」はI am lostの一言。日本語では「すみません、ちょっとお聞きしたいのですが...」と前置きが長いけど、英語ではI am lostと直球で言ってOK。',
    character: 'takeshi',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: '乗り換えはどこですか？',
    english: [
      'Where do I transfer?',
      'Where do I need to transfer to get to the airport?',
      'I showed the station attendant my destination and asked, where do I need to transfer to get there?',
      'Transfer is the key word for norikae. Where do I transfer? is the basic version, but where do I need to transfer to get to the airport? gives the other person enough context to actually help you. In cities with complex subway systems, you might hear, take the blue line three stops and then transfer to the red line. Knowing your colors helps more than knowing station names sometimes.',
    ],
    context: '「乗り換え」はtransferで直訳できる。Where do I transfer?に目的地を足すと、相手が具体的に教えてくれる。色で路線を覚えるのが英語圏の地下鉄攻略法。',
    character: 'mina',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'あとどのくらいかかりますか？',
    english: [
      'How much longer?',
      'How much longer until we get there?',
      'We had been driving for two hours, so I asked the driver, how much longer until we get there?',
      'How much longer is the universal impatient traveler phrase. It works in taxis, on buses, in cars, anywhere. The more polite version is, do you have any idea how much longer it might take? And if you are stuck in traffic, you might hear the driver say, hard to say with this traffic, maybe another thirty minutes. At least you know. Not knowing is always worse than a bad answer.',
    ],
    context: '「あとどのくらい」はHow much longer?で完璧。How long does it take?は出発前、How much longer?は移動中。この使い分けができると旅が楽になる。',
    character: 'kenji',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'この辺にコンビニはありますか？',
    english: [
      'Is there a store nearby?',
      'Is there a convenience store around here?',
      'I needed water and asked a passerby, is there a convenience store or any kind of shop around here?',
      'Convenience store culture in Japan is on another level, so when you ask this question abroad, do not expect a 7-Eleven with onigiri and fresh coffee on every corner. Is there a store nearby? might get you directed to a gas station or a drugstore. The concept of konbini as a one-stop life-support station does not really exist in most other countries. Adjust your expectations.',
    ],
    context: '日本のコンビニは世界最強だから、海外で同じものを期待するとがっかりする。Is there a store nearby?と広く聞いた方がいい。convenience storeだと見つからないことも。',
    character: 'master',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'Wi-Fiのパスワードを教えてください',
    english: [
      'What is the Wi-Fi password?',
      'Could you tell me the Wi-Fi password?',
      'I sat down at the cafe and asked the barista, could you tell me the Wi-Fi password, please?',
      'What is the Wi-Fi password? might be the most universally asked question of the twenty-first century. In cafes, it is usually on the receipt or written on a board somewhere. At hotels, it is on your key card envelope. But when you cannot find it, just ask. Some places have open Wi-Fi, some require a purchase first. Could I get the Wi-Fi? works too, and they will understand what you mean.',
    ],
    context: 'Wi-Fiパスワードは全世界共通の質問。What is the Wi-Fi password?だけ覚えればどこでも生きていける。カフェなら購入が条件のことも。',
    character: 'yuki',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 334,
    japanese: 'ここまで来てくれてありがとう',
    english: [
      'Thanks for coming.',
      'Thanks for coming all this way, I really appreciate it.',
      'My friend drove two hours to visit me and I said, thanks for coming all this way, it really means a lot.',
      'In Japanese, wazawaza kite kurete arigato carries this weight of recognizing someone made an effort. English captures the same feeling with thanks for coming all this way. The all this way part is doing the work of wazawaza. And if you add it really means a lot, you have got the full emotional equivalent. Looking back on this journey from day one to now, being able to say these things with feeling is what it is all about.',
    ],
    context: '「わざわざ来てくれて」のニュアンスはall this wayで表現。distance(距離)を強調することで「大変だったのに」の気持ちが伝わる。感謝の奥行きを英語で出せると一人前。',
    character: 'lisa',
    category: 'travel',
    month: '2027-03',
  },
];

// ============================================================
// Day 335: 気持ちの極意 (feeling)
// ============================================================

const DAY_335: MasterExpression[] = [
  {
    daySlot: 335,
    japanese: 'ほっとした',
    english: [
      'What a relief.',
      'Oh thank God, I am so relieved right now.',
      'When the doctor said everything looked normal, I just sighed and said, oh thank God, I am so relieved.',
      'The Japanese hottoshita and the English I am relieved carry similar weight, but the delivery is different. In English, you often pair it with an exclamation first. Oh thank God, or oh man, and then I am so relieved. The one-two punch of exclamation plus statement is how native speakers express relief. Just saying I am relieved on its own sounds a bit flat.',
    ],
    context: '「ほっとした」はI am relievedだけど、英語ではOh thank GodやOh manと感嘆詞をセットで使う。感情表現は前振りが大事。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: 'もう無理',
    english: [
      'I can not do this.',
      'I am done. I just can not do this anymore.',
      'After the fifth failed attempt at assembling the furniture, I threw the instructions down and said, I am done, I can not do this anymore.',
      'Mou muri captures exhaustion, frustration, and surrender all at once. English needs a few more words to get there. I am done is the closest single phrase, but adding I just can not do this anymore gives it the full emotional punch. Some people say I am over it, which adds a layer of being emotionally detached from the frustration. All valid ways to express that wall-hitting moment.',
    ],
    context: '「もう無理」は感情の密度が高い日本語。I am doneが一番近いけど、I can not do this anymoreを足して初めて「もう無理」の絶望感が出る。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: '懐かしいなあ',
    english: [
      'That takes me back.',
      'Oh man, that really takes me back. Good times.',
      'We were looking at old photos from college and I said, oh man, that really takes me back. Those were good times.',
      'Natsukashii is one of those Japanese words that English learners always struggle with. Nostalgic works but it is too formal for casual conversation. That takes me back is the natural equivalent. It implies the memory is transporting you to that time. And you usually follow it with good times or those were the days. Looking at how far we have come in this learning journey, I bet day one takes you back too.',
    ],
    context: '「懐かしい」の英語はnostalgicではなくThat takes me backが自然。「あの頃に連れ戻される」という感覚。Good timesを足すと温かい余韻が残る。',
    character: 'master',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: '感動した',
    english: [
      'I was so moved.',
      'That really got to me. I was genuinely moved.',
      'After watching the graduation speech, I told my friend, that really got to me, I was genuinely moved.',
      'Kandou is a big, beautiful Japanese word for being deeply touched. English has I was moved, but that can sound stiff. That really got to me is more natural and carries the same emotional weight. You can also say that hit me right in the feels if you want to be playful about it. The key is that English tends to externalize emotion. Something got to you, rather than you experienced kando internally.',
    ],
    context: '「感動した」はI was movedでも通じるけど、カジュアルにはThat really got to meが自然。日本語は内側の感情、英語は「何かが自分に到達した」と外からの表現。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: '誇りに思うよ',
    english: [
      'I am proud of you.',
      'I am really proud of you, you should be proud too.',
      'When my student passed the exam after months of hard work, I said, I am really proud of you, you earned this.',
      'Hokori ni omou sounds grand and rare in Japanese, something you might say at a ceremony. But I am proud of you is everyday English. Parents say it to kids, friends say it to each other, coaches say it to teams. It is one of the most powerful phrases in English because it is used so freely. If there is one thing I hope you take from these lessons, it is this: say I am proud of you more often. In any language.',
    ],
    context: '日本語の「誇りに思う」は大げさに聞こえるけど、英語のI am proud of youは日常的。親が子に、友達同士で、気軽に使う。この文化の違いを知ると、言葉が温かくなる。',
    character: 'lisa',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: 'なんかモヤモヤする',
    english: [
      'Something feels off.',
      'I can not put my finger on it, but something just feels off.',
      'After the meeting, I told my coworker, I can not put my finger on it, but something about that deal feels off.',
      'Moyamoya is that cloudy, uneasy feeling in your chest. English does not have a single word for it, but something feels off comes close. I can not put my finger on it adds the idea that you know something is wrong but you cannot identify what. Uneasy, unsettled, and not sitting right with me are other options. Japanese is better at naming vague feelings. English has to describe them.',
    ],
    context: '「モヤモヤ」は英語に直訳できないオノマトペ。something feels offが一番近い。I can not put my finger on itは「何が引っかかっているか分からない」という絶妙な表現。',
    character: 'kenji',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: 'めちゃくちゃうれしい',
    english: [
      'I am so happy.',
      'I am over the moon right now, this is amazing.',
      'When I got the acceptance letter, I called my mom and said, I am over the moon, I actually got in!',
      'Mechakucha ureshii needs more than just I am happy. You need intensity. I am over the moon is a classic idiom that captures pure joy. I am thrilled, I am ecstatic, I am on cloud nine all work too. The point is that happy alone does not cut it for mechakucha. You need an upgrade word. And notice how English often adds right now to anchor the feeling in the present moment.',
    ],
    context: '「めちゃくちゃうれしい」をI am very happyと言うと弱い。I am over the moonで「天にも昇る気持ち」。感情の強度を英語で出すには、副詞ではなくイディオムが効く。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: 'いっぱいいっぱいです',
    english: [
      'I am overwhelmed.',
      'Honestly, I am feeling pretty overwhelmed right now.',
      'Between work deadlines and moving apartments, I told my friend, honestly, I am feeling pretty overwhelmed right now.',
      'Ippai ippai is such a vivid Japanese expression. You are filled to the brim, overflowing. Overwhelmed is the English equivalent, and it works for both positive and negative situations. You can be overwhelmed with joy or overwhelmed with stress. I have a lot on my plate is another good option for the stressed-out version. And if you want to be really casual, I am drowning works too.',
    ],
    context: '「いっぱいいっぱい」はoverwhelmedが一番近い。良い意味でも悪い意味でも使える。I have a lot on my plateは「やることが山積み」で、忙しさのニュアンス。',
    character: 'master',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: '信じられない',
    english: [
      'I can not believe it.',
      'Are you serious? I literally can not believe this is happening.',
      'When they announced my name as the winner, I just stood there saying, I can not believe this is actually happening.',
      'Shinjirarenai maps perfectly to I can not believe it, which is nice because not every Japanese phrase translates so cleanly. But the usage is wider in English. You use it for good surprises, bad news, absurd situations, everything. Are you kidding me, no way, and shut up are all variations of disbelief in casual English. Yes, shut up can mean I can not believe it. English is weird like that.',
    ],
    context: '「信じられない」はI can not believe itで直訳OK。珍しくそのまま使えるパターン。No way, Are you kidding me, Shut upも全部「信じられない」の仲間。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 335,
    japanese: 'ここまで来られて良かった',
    english: [
      'I am glad I made it.',
      'I am really glad I made it this far. It has been quite a journey.',
      'Looking back at everything we have been through, I told myself, I am really glad I made it this far.',
      'This one hits different on day three hundred and thirty-five. Koko made korarete yokatta is not just about physical arrival. It is about the whole journey. I am glad I made it this far captures that. And it has been quite a journey adds the reflection. If you are reading this, you have made it through three hundred and thirty-five days of learning English. That is not nothing. I am genuinely proud of you for sticking with it.',
    ],
    context: '「ここまで来られて良かった」は旅の話だけでなく、人生の振り返りにも使う。I am glad I made it this farは達成感と感謝が同居する表現。335日目に言える最高の一言。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },
];

// ============================================================
// Day 336: お願いの極意 (request)
// ============================================================

const DAY_336: MasterExpression[] = [
  {
    daySlot: 336,
    japanese: 'ちょっとお願いがあるんだけど',
    english: [
      'Can I ask a favor?',
      'Hey, can I ask you a quick favor?',
      'I pulled my coworker aside and said, hey, can I ask you a quick favor? It will only take a minute.',
      'The Japanese onegai ga aru comes with a built-in apology. You are already bracing for the inconvenience. In English, can I ask you a favor? is lighter. Adding quick makes it even easier for the other person to say yes. It will only take a minute seals the deal. The trick is framing the request as small and easy, even if it is not. That is just how the social dance works in English.',
    ],
    context: '「お願いがある」は日本語だと申し訳なさが先に来るけど、英語のCan I ask you a favor?はもっと軽い。quickとa minuteで「大したことじゃないよ」感を出すのが英語のコツ。',
    character: 'kenji',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '手伝ってくれない？',
    english: [
      'Can you help me?',
      'Could you give me a hand with this real quick?',
      'I was struggling with the heavy box, so I called out, could you give me a hand with this real quick?',
      'Give me a hand is more casual and friendly than help me. It is the difference between a formal request and asking a buddy. In Japanese, tetsudatte is pretty neutral, but in English the phrasing matters. Help me can sound desperate, give me a hand sounds collaborative, and lend me a hand is slightly more polite. The body part metaphor makes it feel more personal and less transactional.',
    ],
    context: '「手伝って」はhelpで通じるけど、give me a handのほうが友達感がある。helpは少し切迫感があるけど、give me a handは「ちょっと手貸して」の気軽さ。',
    character: 'yuki',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: 'もう一回言ってもらえますか？',
    english: [
      'Could you say that again?',
      'Sorry, could you repeat that? I did not quite catch it.',
      'The announcer spoke too fast, so I turned to the person next to me and said, sorry, did you catch what she said?',
      'Asking someone to repeat themselves is an essential survival skill that many learners feel embarrassed about. Do not be. I did not quite catch that is the smoothest version because it puts the blame on your ears, not their speaking. Could you slow down a bit? is also totally fine. I used this phrase probably five hundred times when I first started learning, and nobody ever got annoyed. People appreciate that you care enough to understand them properly.',
    ],
    context: '「もう一回言って」はCould you repeat that?よりI did not catch thatのほうが自然。「聞き取れなかった」と自分のせいにすると相手も気持ちよく繰り返してくれる。',
    character: 'master',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: 'もう少しゆっくり話してもらえますか？',
    english: [
      'Could you slow down?',
      'Would you mind speaking a little slower? I want to make sure I understand.',
      'During the tour, I asked the guide, would you mind speaking a little slower? My English is not perfect yet.',
      'This is the request that changed my life as a learner. Would you mind speaking a little slower? is polite, clear, and nobody judges you for it. The key addition is I want to make sure I understand, because it shows you are engaged and trying, not bored or lost. Most native speakers will immediately slow down and even simplify their vocabulary. They want to communicate with you. They are on your side.',
    ],
    context: '「ゆっくり話して」は恥ずかしいけど、言えるかどうかで理解度が天と地ほど変わる。I want to make sure I understandを足すと「真剣に聞いている」姿勢が伝わる。',
    character: 'lisa',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '写真を撮ってもらえますか？',
    english: [
      'Could you take a photo?',
      'Would you mind taking a photo of us?',
      'I handed my phone to a stranger and asked, would you mind taking a photo of us with the bridge in the background?',
      'This is the ultimate travel request. Would you mind taking a photo of us? is polite and clear. The secret is to hand them your phone already open to the camera app. That removes any awkwardness. And when they take it, say something like, one more just in case? because the first photo is never the best one. Then always say, that is great, thank you so much, even if it is terrible. You can retake it later.',
    ],
    context: '旅先で写真をお願いする定番。Would you mind taking a photo?と言いながらカメラを開いたスマホを渡すのがコツ。One more just in case?は保険の一枚用。',
    character: 'takeshi',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '席を替わってもらえませんか？',
    english: [
      'Would you switch seats?',
      'Would you mind switching seats with me so I can sit with my family?',
      'On the plane, I politely asked the man in the aisle seat, would you mind switching seats with me so my daughter can sit next to me?',
      'Seat switching on planes is a delicate social negotiation. Would you mind switching seats so I can sit with my family? is the right level of politeness. But here is the unwritten rule: you should only ask if you are offering an equal or better seat. Asking someone to move from a window to a middle seat is basically asking them to sacrifice comfort for your convenience. Not a great look. Offer an upgrade, not a downgrade.',
    ],
    context: '席替えのお願いは英語圏でも気を使う場面。Would you mind switching?が定番だけど、自分の席が相手にとってプラスになる時だけ頼むのがマナー。',
    character: 'mina',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '少し待ってもらえますか？',
    english: [
      'Could you hold on?',
      'Could you hold on just a second? I will be right back.',
      'I was in the middle of paying when my phone rang, so I said, could you hold on just a second? I need to take this.',
      'Hold on is faster and more natural than please wait. In Japanese, chotto matte has that casual friendliness. Hold on captures the same energy. Bear with me is another great option when you need someone to be patient while you figure something out. Give me a moment is slightly more formal. The point is, English has levels of waiting requests just like Japanese, and picking the right one matters.',
    ],
    context: '「ちょっと待って」はHold onが一番自然。Give me a secondもカジュアル。Bear with meは「もうちょっと辛抱してください」のニュアンスで、作業中に使う。',
    character: 'kenji',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '静かにしてもらえますか？',
    english: [
      'Could you keep it down?',
      'Sorry, would you mind keeping it down a little?',
      'The group next to us was really loud, so I leaned over and said, sorry, would you mind keeping it down a bit?',
      'Asking someone to be quiet is awkward in any language. Could you keep it down? is the standard polite version. It is softer than be quiet and way softer than shut up. Adding a bit or a little makes it even gentler. In Japan, you might just endure the noise silently. In English-speaking countries, it is perfectly acceptable to ask politely. In fact, people expect it. Silence is not always golden if you never speak up.',
    ],
    context: '「静かにして」はBe quietだと強すぎる。Could you keep it down?が丁度いい丁寧さ。a littleを足すとさらにソフト。英語圏では我慢するより言う文化。',
    character: 'master',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '教えてもらってもいいですか？',
    english: [
      'Could you show me how?',
      'Would you mind showing me how to do this?',
      'I had never used the machine before, so I asked my colleague, would you mind showing me how this works?',
      'Oshiete moratte mo ii desu ka is long and polite in Japanese. Would you mind showing me how? captures the same respect in fewer words. The distinction between teaching and showing matters in English. Teach me implies a formal lesson. Show me implies a quick demonstration. For everyday situations, show me is almost always what you want. Can you walk me through it? is another great option for step-by-step explanations.',
    ],
    context: '「教えて」はteachではなくshow meが自然な場面が多い。teachは授業っぽい。show meは「ちょっとやって見せて」。walk me through itは手順を一つずつ教えてほしい時。',
    character: 'yuki',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 336,
    japanese: '無理しないでね',
    english: [
      'Do not push yourself.',
      'Take it easy, all right? Do not push yourself too hard.',
      'My friend was working overtime every day, so I told her, seriously, take it easy, do not push yourself too hard.',
      'Muri shinai de ne is such a caring Japanese expression. Do not push yourself is the closest English version, but adding take it easy and all right gives it that warm, concerned tone. Do not overdo it is another option. The all right at the end is crucial because it turns a command into a caring suggestion. Without it, do not push yourself can sound bossy. With it, it sounds like someone who genuinely cares about you.',
    ],
    context: '「無理しないでね」はDo not push yourselfだけだと命令っぽい。all right?を足すと「心配しているからね」の温度が出る。Take it easyとセットで使うと完璧。',
    character: 'lisa',
    category: 'request',
    month: '2027-03',
  },
];

// ============================================================
// Day 337: 雑談の極意 (social)
// ============================================================

const DAY_337: MasterExpression[] = [
  {
    daySlot: 337,
    japanese: 'そういえばさ',
    english: [
      'Oh, by the way.',
      'Oh, by the way, I totally forgot to mention something.',
      'We were about to leave when I said, oh, by the way, I totally forgot to tell you about what happened yesterday.',
      'Sou ieba sa is the casual Japanese topic changer, and by the way is its English twin. But the delivery is different. In English, you usually add oh at the beginning to make it sound spontaneous, like the thought just popped into your head. And I totally forgot to mention is a great add-on because it justifies the sudden topic change. Small talk is really just a series of well-connected by the ways.',
    ],
    context: '「そういえば」はBy the wayが定番。Ohを前に置くと「あ、今思い出した」感が出る。Speaking of...は前の話題から自然につなげたい時。使い分けが雑談力。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'それ分かる！',
    english: [
      'I know, right?',
      'Oh, I totally know what you mean! I have been there.',
      'She was complaining about the commute and I said, oh, I totally know what you mean, my commute is the worst too.',
      'Sore wakaru is the ultimate empathy phrase in Japanese. I know, right? is the casual English version that shows you completely understand and agree. I have been there adds the layer of shared experience. I feel you is even more casual and empathetic. The key to good small talk is making people feel heard, and these phrases do exactly that. It is not about having something brilliant to say. It is about connecting.',
    ],
    context: '「分かる！」はI know, right?が最強。IKRと略されるくらい日常に溶け込んでいる。I have been thereは「その経験ある」で共感を深める。I feel youはさらに親密。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'マジで？',
    english: [
      'Are you serious?',
      'Wait, are you serious? No way!',
      'He told me he was quitting his job to travel the world, and I said, wait, are you serious right now?',
      'Maji de is the Swiss Army knife of Japanese reactions. Are you serious covers the surprised version. No way covers the disbelief version. For real? covers the confirmation-seeking version. Get out of here is the extreme disbelief version. English has more options than Japanese for this one, which is unusual. The tone of voice determines which meaning you are going for. Same words, completely different meanings depending on how you say them.',
    ],
    context: '「マジで？」は万能リアクション。英語にも同じくらい選択肢がある。Are you serious, No way, For real, Get out of here。声のトーンで意味が全部変わる。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: '最近ハマっていることある？',
    english: [
      'What are you into lately?',
      'So what have you been into lately? Anything fun?',
      'During the dinner, I asked everyone at the table, so what have you all been into lately? Any new hobbies or shows?',
      'What are you into? is a much better conversation starter than what are your hobbies? because hobbies sounds like a job interview question. Into implies genuine enthusiasm. Lately adds the time frame. Anything fun? opens the door for lighthearted answers. This question is small talk gold because everyone has something they are excited about. You just have to ask the right way to unlock it.',
    ],
    context: '「ハマっている」はbe into somethingが完璧。What are your hobbies?は面接みたいで硬い。What are you into?のほうが「今何が楽しい？」の気軽さがある。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'その話、めっちゃ面白い',
    english: [
      'That is hilarious.',
      'Oh man, that is hilarious. I am dying over here.',
      'He told the story about getting lost in Shinjuku and I said, that is absolutely hilarious, you should write that down.',
      'Funny is the baseline for omoshiroi, but mechakucha omoshiroi demands hilarious. Hilarious is the top tier of funny. I am dying, I am dead, I can not breathe are all exaggerations for laughing too hard, but they are completely normal in everyday conversation. They carry the same temperature as the Japanese ukeru or yabai. As a compliment, hilarious is one of the best things you can say about someone is story.',
    ],
    context: '「めっちゃ面白い」はhilariousが一番テンションが合う。funnyだと温度が低い。I am dyingは「笑い死にそう」で、日本語の「ウケる」と同じ大げさリアクション。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'それ、羨ましい',
    english: [
      'I am so jealous.',
      'Oh, I am so jealous! That sounds amazing.',
      'She told me about her trip to Italy and I said, I am so jealous, I have always wanted to go there.',
      'Urayamashii and I am jealous are close, but there is a cultural difference. In Japanese, urayamashii is purely positive, like admiration. In English, jealous technically has a negative connotation, but in casual conversation it is used exactly like urayamashii. I am so jealous means I wish I could do that too, not I resent you for having it. Context is everything. Tone of voice turns a negative word into a compliment.',
    ],
    context: '「羨ましい」はI am jealousで通じる。本来はネガティブな単語だけど、カジュアル会話では「いいなあ！」の意味で使う。声のトーンが全てを決める好例。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'どうでもいい話なんだけどさ',
    english: [
      'This is random, but...',
      'Okay, this is totally random, but hear me out.',
      'In the middle of dinner I said, okay, this is totally random, but have you ever thought about why we park in driveways and drive on parkways?',
      'Dou demo ii hanashi is that wonderful Japanese disclaimer before saying something that is absolutely not dou demo ii to you. This is random but is the English version, and it works the same way. The disclaimer gives you permission to say something off-topic without seeming weird. Hear me out means just listen for a second. Together, they are the ultimate small talk entry point. Some of the best conversations start with this is random, but.',
    ],
    context: '「どうでもいい話だけど」はThis is random, butが英語版。Hear me outは「とりあえず聞いて」。この前置きがあると、どんなに脱線しても許される。雑談の魔法の言葉。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: '気が合うね',
    english: [
      'We are on the same page.',
      'I think we are totally on the same wavelength here.',
      'We kept finishing each other is sentences, so I said, we are definitely on the same wavelength, this is great.',
      'Ki ga au is about compatibility, that feeling of clicking with someone. On the same page means you agree. On the same wavelength means your thinking patterns are similar. We really click is more about personal chemistry. Great minds think alike is the joking version you say when you both have the same idea. Each phrase captures a different aspect of ki ga au, because Japanese packed a lot of meaning into three syllables.',
    ],
    context: '「気が合う」はwe clickが一番感覚に近い。on the same pageは「意見が一致」、on the same wavelengthは「感性が合う」。使い分けると人間関係の表現が豊かになる。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'また飲みに行こうよ',
    english: [
      'Let us do this again.',
      'We should definitely do this again sometime soon.',
      'As we were leaving the bar, I said, this was fun, we should definitely do this again soon.',
      'Mata nomi ni ikou yo is the classic end-of-night promise in Japanese. We should do this again is the English version, and just like in Japanese, it is sometimes sincere and sometimes just a polite exit line. The difference is in the follow-up. If you actually text them the next day to set a date, it was real. If you never bring it up again, it was just the alcohol talking. Same in both languages. Human nature is universal.',
    ],
    context: '「また飲みに行こうよ」はWe should do this againが定番。次の日に本当に連絡するかどうかで、社交辞令か本気かが分かる。これは日本語も英語も同じ。人間は万国共通。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 337,
    japanese: 'いろいろありがとう。本当に楽しかった',
    english: [
      'Thanks for everything.',
      'Seriously, thanks for everything. I had the best time.',
      'At the end of the trip, I hugged my host family and said, seriously, thanks for everything, this has been incredible.',
      'Iroiro arigato carries the weight of a thousand small kindnesses. Thanks for everything is the English version, and when you say it with sincerity, it lands just as hard. I had the best time adds warmth. This has been incredible adds awe. And if this is the last expression you learn on day three hundred and thirty-seven, let it be this one. Because at the end of any journey, being able to say thank you with your whole heart is the only language skill that truly matters.',
    ],
    context: '「いろいろありがとう」は旅の終わり、学びの終わり、何かが完結する時に使う最強フレーズ。Thanks for everythingにseriouslyを足すと気持ちの重みが倍増する。337日間お疲れさまでした。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
];

// ============================================================
// Combined export
// ============================================================

export const MONTH12_W45_EXPRESSIONS: MasterExpression[] = [
  ...DAY_331,
  ...DAY_332,
  ...DAY_333,
  ...DAY_334,
  ...DAY_335,
  ...DAY_336,
  ...DAY_337,
];
