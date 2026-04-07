// Month 12 Week 47: 総復習3 -- 暮らしと旅 / Review 3 -- Life & Travel
// Days 345-351 (GRADUATION MONTH)
// 70 expressions, 35 keywords

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Day Themes
// ============================================================

export const MONTH12_W47_DAY_THEMES: Record<number, { title: string; titleEn: string; category: string; scene: string; keywords: KeyWord[] }> = {
  345: {
    title: '食の極意',
    titleEn: 'The Art of Ordering',
    category: 'order',
    scene: '総復習ウィーク初日。マスターが「今まで習った注文英語、全部使ってみろ」と特別メニューを用意。常連たちが本気で英語注文に挑む。',
    keywords: [
      { en: 'recommend', ja: 'おすすめする', pron: 'REK-uh-mend', example: 'What do you recommend for a first-timer?', note: 'suggest より強い推しのニュアンス' },
      { en: 'portion', ja: '一人前の量', pron: 'POR-shun', example: 'The portions here are huge.', note: 'serving とほぼ同義だが portion の方が量にフォーカス' },
      { en: 'allergy', ja: 'アレルギー', pron: 'AL-er-jee', example: 'Do you have any allergies?', note: '複数形 allergies も頻出' },
      { en: 'leftovers', ja: '残り物', pron: 'LEFT-oh-verz', example: 'Can we box up the leftovers?', note: '常に複数形で使う' },
      { en: 'split', ja: '分ける・割る', pron: 'split', example: 'Let us split the bill four ways.', note: 'split the bill = 割り勘の定番表現' },
    ],
  },
  346: {
    title: '健康の極意',
    titleEn: 'The Art of Health',
    category: 'social',
    scene: 'ケンジが「最近体調悪い」とぼやくところから健康トークに。マスターが「英語で症状説明できないと海外で詰むぞ」と煽る。',
    keywords: [
      { en: 'under the weather', ja: '体調が悪い', pron: 'UN-der thuh WETH-er', example: 'I have been under the weather all week.', note: '軽い体調不良に使うカジュアル表現' },
      { en: 'checkup', ja: '健康診断', pron: 'CHEK-up', example: 'When was your last checkup?', note: 'physical とも言う。annual checkup = 年1回の健診' },
      { en: 'hungover', ja: '二日酔いの', pron: 'HUNG-oh-ver', example: 'I am too hungover to function.', note: 'hangover(名詞) vs hungover(形容詞)' },
      { en: 'hydrated', ja: '水分補給された', pron: 'HY-dray-ted', example: 'Stay hydrated in this heat.', note: 'stay hydrated が定番コロケーション' },
      { en: 'burn out', ja: '燃え尽きる', pron: 'BURN out', example: 'She burned out after working 80-hour weeks.', note: '名詞 burnout も超頻出' },
    ],
  },
  347: {
    title: '旅行の極意',
    titleEn: 'The Art of Travel',
    category: 'travel',
    scene: 'リサが来月の海外旅行の計画を広げて相談開始。マスターが「空港からホテルまで全部英語でシミュレーションしろ」と号令。',
    keywords: [
      { en: 'layover', ja: '乗り継ぎ待ち', pron: 'LAY-oh-ver', example: 'We have a four-hour layover in Dubai.', note: 'stopover はより長い滞在、layover は短め' },
      { en: 'terminal', ja: 'ターミナル', pron: 'TER-muh-nul', example: 'Which terminal does the flight depart from?', note: '空港以外にも「終点」の意味がある' },
      { en: 'currency', ja: '通貨', pron: 'KUR-en-see', example: 'What currency do they use here?', note: 'foreign currency = 外貨' },
      { en: 'luggage', ja: '荷物', pron: 'LUG-ij', example: 'My luggage did not arrive.', note: 'baggage とほぼ同義。luggage の方がやや一般的' },
      { en: 'sightseeing', ja: '観光', pron: 'SITE-see-ing', example: 'We spent the whole day sightseeing.', note: 'go sightseeing の形で使うことが多い' },
    ],
  },
  348: {
    title: '旅のトラブルの極意',
    titleEn: 'The Art of Travel Trouble',
    category: 'request',
    scene: 'タケシが過去の海外旅行で遭ったトラブルを語り始め、全員がそれぞれの修羅場エピソードを披露。マスターが「トラブル英語は命綱だ」と力説。',
    keywords: [
      { en: 'cancelled', ja: 'キャンセルされた', pron: 'KAN-suld', example: 'All flights were cancelled due to the storm.', note: 'canceled(米) / cancelled(英) 両方OK' },
      { en: 'pickpocket', ja: 'スリ', pron: 'PIK-pok-it', example: 'Watch out for pickpockets in crowded areas.', note: '動詞でも使える: I got pickpocketed.' },
      { en: 'overcharged', ja: '高く請求された', pron: 'OH-ver-charjd', example: 'I was overcharged by twenty dollars.', note: 'ripped off よりフォーマル' },
      { en: 'baggage claim', ja: '手荷物受取所', pron: 'BAG-ij klaym', example: 'Meet me at baggage claim after you land.', note: 'carousel は受取所の回転ベルト' },
      { en: 'insurance', ja: '保険', pron: 'in-SHOOR-uns', example: 'Do you have travel insurance?', note: 'file a claim = 保険請求する' },
    ],
  },
  349: {
    title: '仕事の極意',
    titleEn: 'The Art of Work',
    category: 'social',
    scene: '金曜夜、仕事帰りの常連が集結。「今週もお疲れ」の乾杯から、キャリアや働き方について本音トークが始まる。',
    keywords: [
      { en: 'rewarding', ja: 'やりがいのある', pron: 'ree-WORD-ing', example: 'Teaching is hard but incredibly rewarding.', note: 'fulfilling とほぼ同義' },
      { en: 'overtime', ja: '残業', pron: 'OH-ver-time', example: 'I did thirty hours of overtime this month.', note: '動詞的に work overtime と使う' },
      { en: 'promotion', ja: '昇進', pron: 'proh-MOH-shun', example: 'She deserves a promotion after all that work.', note: 'get promoted = 昇進する' },
      { en: 'freelance', ja: 'フリーランス', pron: 'FREE-lans', example: 'He went freelance after quitting his job.', note: '動詞・形容詞・名詞すべてで使える' },
      { en: 'retirement', ja: '退職・定年', pron: 'ree-TIRE-ment', example: 'He is planning for early retirement.', note: 'retire(動詞) / retired(形容詞)' },
    ],
  },
  350: {
    title: '議論の極意',
    titleEn: 'The Art of Discussion',
    category: 'social',
    scene: 'マスターが「今日は英語でディベートしろ」とお題を出す。賛成・反対・妥協、建設的な議論の作法を実践で学ぶ夜。',
    keywords: [
      { en: 'perspective', ja: '視点・見方', pron: 'per-SPEK-tiv', example: 'Try to see it from a different perspective.', note: 'viewpoint, standpoint とほぼ同義' },
      { en: 'compromise', ja: '妥協する', pron: 'KOM-pruh-mize', example: 'Both sides need to compromise.', note: '名詞でも使える: reach a compromise' },
      { en: 'bias', ja: '偏見・バイアス', pron: 'BY-us', example: 'Everyone has unconscious biases.', note: 'biased(形容詞) = 偏った' },
      { en: 'tangent', ja: '脱線', pron: 'TAN-jent', example: 'Sorry, I went off on a tangent.', note: 'go off on a tangent = 話が脱線する' },
      { en: 'acknowledge', ja: '認める', pron: 'ak-NOL-ij', example: 'You need to acknowledge the problem first.', note: '同意ではなく「存在を認める」ニュアンス' },
    ],
  },
  351: {
    title: '物語の極意',
    titleEn: 'The Art of Storytelling',
    category: 'social',
    scene: '総復習ウィーク最終日。マスターが「この一年を英語で語れ」と課題を出す。笑いあり涙ありの振り返りが始まり、卒業の空気が漂う。',
    keywords: [
      { en: 'exaggerate', ja: '大げさに言う', pron: 'ig-ZAJ-uh-rayt', example: 'Stop exaggerating. It was not that bad.', note: 'embellish はもう少し上品な「盛る」' },
      { en: 'speechless', ja: '言葉を失った', pron: 'SPEECH-less', example: 'The ending left me completely speechless.', note: '良い意味でも悪い意味でも使える' },
      { en: 'consistency', ja: '一貫性・継続', pron: 'kun-SIS-ten-see', example: 'Consistency beats talent every time.', note: 'consistent(形容詞) = ブレない' },
      { en: 'accomplish', ja: '成し遂げる', pron: 'uh-KOM-plish', example: 'Look at everything you have accomplished.', note: 'accomplishment(名詞) = 達成・業績' },
      { en: 'graduation', ja: '卒業', pron: 'GRAJ-oo-AY-shun', example: 'This is not the end, it is a graduation.', note: 'graduate(動詞): graduate from school' },
    ],
  },
};

// ============================================================
// Day 345: 食の極意 (order)
// ============================================================

const day345: MasterExpression[] = [
  {
    daySlot: 345,
    japanese: 'おすすめは何ですか？',
    english: [
      'What do you recommend?',
      'Hit me with your best dish -- I trust your taste.',
      'We just sat down and honestly have no idea what to get. What do you recommend?',
      'Oh, you gotta try the daily special. It\'s amazing.',
    ],
    context: '日本語の「おすすめ」は万能だけど、英語では recommend 以外にも suggest, go with, try が自然に混ざる。状況で使い分けるのがコツ。',
    character: 'yuki',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'これ、量多いですか？',
    english: [
      'Is this a big portion?',
      'How big is this? I do not want to over-order.',
      'Before I commit to this, can you give me an idea of the portion size? I am sharing with a friend.',
      'Oh, that\'s actually genius. Let\'s try it.',
    ],
    context: '「量多い？」を portion size と言えるかどうかで注文力が変わる。big enough for two? とかも便利。',
    character: 'takeshi',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'アレルギーがあるんですけど',
    english: [
      'I have an allergy.',
      'Just a heads up, I have a nut allergy.',
      'Before we order, I should mention that I have a pretty serious shellfish allergy. Does this dish contain any?',
      'Good to know! I\'ll make sure we avoid that.',
    ],
    context: '日本語では「アレルギーあります」で済むけど、英語では具体的に何のアレルギーか言うのが基本。heads up で前置きすると丁寧。',
    character: 'lisa',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: '辛さ控えめでお願いします',
    english: [
      'Not too spicy, please.',
      'Can you make it mild? I am not great with heat.',
      'I love the flavor of this curry but my stomach cannot handle the full spice level. Could you tone it down a bit?',
      'Leave it to me! Consider it done.',
    ],
    context: '「控えめ」は mild, on the milder side, tone it down あたり。not too spicy は直球で通じるけど、tone down が一段上。',
    character: 'kenji',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: '取り皿もらえますか？',
    english: [
      'Can we get extra plates?',
      'Could we grab some sharing plates when you get a chance?',
      'We are planning to share everything so could we get a few extra plates for the table?',
      'Wait, really?! That\'s fascinating.',
    ],
    context: '「取り皿」は英語に直訳がない。sharing plates, extra plates, side plates あたりで伝える。文化の違いがモロに出る表現。',
    character: 'mina',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'お会計お願いします',
    english: [
      'Check, please.',
      'Could we get the bill when you have a moment?',
      'We are about ready to head out. Could you bring us the check whenever it is convenient?',
      'I got this one. You can get the next round.',
    ],
    context: 'アメリカは check、イギリスは bill。日本みたいにレジで払うのではなくテーブル会計が基本なので、この一言が必須。',
    character: 'master',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'これ持ち帰りできますか？',
    english: [
      'Can I get this to go?',
      'Any chance we could box up the leftovers?',
      'We have quite a bit left over and it would be a shame to waste it. Could we get a to-go box?',
      'Let\'s do it! I\'m right behind you.',
    ],
    context: '「持ち帰り」は to go, takeaway, doggy bag。日本では恥ずかしがる人が多いけど、海外では food waste 防止で当たり前。',
    character: 'yuki',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'まだ関税していないものがあります',
    english: [
      'We still have food coming.',
      'Hold on, we are still waiting on a couple of dishes.',
      'I think we are missing one or two items from our order. Could you double-check for us?',
      'I know, right? It gets confusing.',
    ],
    context: '「まだ来てない」を we are still waiting on が自然。missing items from our order とも言える。flag it は「指摘する」。',
    character: 'takeshi',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: '別々で払えますか？',
    english: [
      'Can we split the bill?',
      'Is it okay if we pay separately?',
      'There are four of us and we would prefer to pay individually if that is not too much trouble.',
      'I got this one. You can get the next round.',
    ],
    context: '「別々で」は split the bill, separate checks, pay individually。割り勘文化の日本と違い、海外では事前に言わないと一括会計になる。',
    character: 'lisa',
    category: 'order',
    month: '2027-03',
  },
  {
    daySlot: 345,
    japanese: 'これ、写真と全然違うんですけど',
    english: [
      'This looks nothing like the picture.',
      'Um, this is not quite what I was expecting from the menu photo.',
      'I do not mean to complain, but the dish I received looks pretty different from what was shown on the menu. Is this the right one?',
      'Let me see! Oh that\'s a great shot.',
    ],
    context: '「写真と違う」は looks nothing like が強め、not quite what I expected が柔らかめ。クレームではなく確認のトーンが大事。',
    character: 'kenji',
    category: 'order',
    month: '2027-03',
  },
];


// ============================================================
// Day 346: 健康の極意 (social)
// ============================================================

const day346: MasterExpression[] = [
  {
    daySlot: 346,
    japanese: '最近ちょっと体調崩してて',
    english: [
      'I have been feeling off lately.',
      'I have been a bit under the weather these past few days.',
      'To be honest, I have not been feeling great recently. Nothing serious, just run down.',
      'Oh yeah? What\'s been going on?',
    ],
    context: '「体調崩す」は feel off, under the weather, run down など段階がある。日本語の「ちょっと」は英語でも a bit や nothing serious で和らげる。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '健康診断の結果が気になる',
    english: [
      'I am worried about my checkup results.',
      'My health screening results come back next week and I am kind of nervous.',
      'I had my annual physical last week and now I am just sitting here overthinking every possible outcome while I wait for the results.',
      'That\'s the way! Health comes first.',
    ],
    context: '「健康診断」は checkup, physical, health screening。日本の会社健診は annual company health check だけど、英語圏では annual physical が一般的。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '運動しなきゃとは思ってるんだけど',
    english: [
      'I know I should exercise.',
      'I keep telling myself I need to work out more, but here I am.',
      'I have been meaning to start going to the gym for months now but I always find an excuse not to go.',
      'Nice! I should start working out too.',
    ],
    context: '「しなきゃと思ってる」の I know I should / I keep telling myself が完璧。日本語の「思ってる」には「でもやってない」が含まれてて、英語でもそのニュアンスを出すのがポイント。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: 'ストレスで眠れない',
    english: [
      'Stress is keeping me up.',
      'I have been tossing and turning all night because of work stress.',
      'I cannot seem to shut my brain off when I get into bed. Work stuff just keeps running through my head.',
      'Yeah, that\'ll do it. You need a break.',
    ],
    context: '「眠れない」は cannot sleep でもいいけど、tossing and turning, cannot shut my brain off の方がリアル。keep someone up = 眠らせない。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '最近肩こりがひどくて',
    english: [
      'My shoulders are so stiff.',
      'My neck and shoulders have been killing me lately.',
      'I have been hunched over my desk all day every day and now my shoulders are completely locked up.',
      'Oh yeah? What\'s been going on?',
    ],
    context: '「肩こり」は英語に直訳がない有名な例。stiff shoulders, tension in my neck and shoulders が近い。killing me は「痛くてたまらない」。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '花粉症がつらい',
    english: [
      'My allergies are terrible.',
      'Hay fever season is absolutely wrecking me right now.',
      'I cannot stop sneezing and my eyes are so itchy that I can barely keep them open. Spring is brutal.',
      'That sounds rough. Hang in there.',
    ],
    context: '「花粉症」は hay fever だけど、my allergies are acting up の方がカジュアルで自然。wrecking me = ボロボロにされてる感。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '二日酔いで死にそう',
    english: [
      'I am so hungover.',
      'I am completely wrecked from last night. Never again.',
      'I should not have had that last round of drinks. My head is pounding and I can barely stand up.',
      'Ha, that\'s so true! Love it.',
    ],
    context: '「二日酔い」は hungover 一択。「死にそう」は dying, wrecked, destroyed。never again は「もう二度と飲まない」の定番（大体嘘）。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: 'ちゃんと水分取ってる？',
    english: [
      'Are you staying hydrated?',
      'Make sure you are drinking enough water, okay?',
      'With this heat, you really need to be careful about staying hydrated. Have you been drinking water?',
      'Say no more! Let\'s make it happen.',
    ],
    context: '「水分取る」は stay hydrated がきれいな英語。drink water でも通じるけど、hydrated の方が健康意識高めの響き。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '早寝早起きを心がけてる',
    english: [
      'I try to keep early hours.',
      'I have been making an effort to go to bed early and wake up early.',
      'I recently switched to an early schedule where I am in bed by ten and up by six, and honestly it has changed everything.',
      'I appreciate that. Seriously.',
    ],
    context: '「心がけてる」は making an effort, trying to の感じ。early to bed, early to rise は諺っぽいので、keep early hours の方が会話向き。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 346,
    japanese: '無理しないでね',
    english: [
      'Do not push yourself too hard.',
      'Take it easy, all right? There is no rush.',
      'I know you want to get everything done but please do not overdo it. Your health comes first.',
      'Hey, don\'t push it. Take it one step at a time.',
    ],
    context: '「無理しないで」は do not push yourself, take it easy, do not overdo it。日本語では定番の気遣いだけど、英語では具体的に言う方が響く。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
];


// ============================================================
// Day 347: 旅行の極意 (travel)
// ============================================================

const day347: MasterExpression[] = [
  {
    daySlot: 347,
    japanese: '窓側の席がいいんですけど',
    english: [
      'Window seat, please.',
      'Could I get a window seat if one is available?',
      'I would really prefer a window seat if possible. I like watching the scenery during the flight.',
      'Me too! Great minds think alike.',
    ],
    context: '「窓側」は window seat で簡単だけど、if one is available を付けると大人の頼み方。aisle seat（通路側）もセットで覚えると完璧。',
    character: 'yuki',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'この電車、空港行きますか？',
    english: [
      'Does this train go to the airport?',
      'Excuse me, is this the right train for the airport?',
      'Sorry to bother you, but I want to make sure I am on the right train. Does this line go to the international terminal?',
      'It\'s two stops from here. I can walk you there.',
    ],
    context: '「行きますか？」は does this go to が定番。is this the right train for の方がネイティブっぽい。go to the airport と head to the airport は同じ。',
    character: 'takeshi',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'チェックインは何時からですか？',
    english: [
      'What time is check-in?',
      'When is the earliest we can check in?',
      'We are arriving a bit early. Is there any chance we could check in before the official time?',
      'Of course! Right this way.',
    ],
    context: '「何時から」は what time でいいけど、earliest を使うと「最速で」のニュアンスが出る。early check-in は海外ホテルの基本ワード。',
    character: 'lisa',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'Wi-Fiのパスワード教えてもらえますか？',
    english: [
      'What is the Wi-Fi password?',
      'Could you tell me the Wi-Fi password when you get a chance?',
      'I need to get online for work. Would you mind sharing the Wi-Fi password with me?',
      'Sure! Ask me anything.',
    ],
    context: '「教えてもらえますか」は could you tell me が丁寧。what is the password は直球。get online は「ネットに繋ぐ」の自然な言い方。',
    character: 'kenji',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'おすすめの観光スポットありますか？',
    english: [
      'Any must-see spots around here?',
      'What are some places you would recommend for sightseeing?',
      'We have a full day free tomorrow and want to explore the area. Are there any spots that locals would recommend?',
      'Oh, you gotta try the daily special. It\'s amazing.',
    ],
    context: '「観光スポット」は sightseeing spots でもいいけど、must-see, hidden gems, off the beaten path の方が会話で映える。locals recommend が最強。',
    character: 'mina',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: '荷物を預けたいんですけど',
    english: [
      'Can I leave my bags here?',
      'Is there somewhere I can store my luggage for a few hours?',
      'We have already checked out but our flight is not until tonight. Do you have a luggage storage service?',
      'Sure! We\'ll keep them safe for you.',
    ],
    context: '「預ける」は leave, store, hold が使える。luggage storage はホテルやロッカーで使う。hold your bags は「預かっておく」のカジュアル版。',
    character: 'master',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'この辺で両替できるところありますか？',
    english: [
      'Where can I exchange money?',
      'Is there a currency exchange place nearby?',
      'I need to exchange some yen for dollars. Do you know if there is a good exchange place around here?',
      'Oh really? Tell me more!',
    ],
    context: '「両替」は exchange money, currency exchange。change money でも通じる。exchange rate（為替レート）も旅行の必須ワード。',
    character: 'yuki',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: '乗り継ぎの時間が短くて不安',
    english: [
      'My layover is really tight.',
      'I only have forty-five minutes between flights and I am a little worried.',
      'My connecting flight leaves from a different terminal and I only have an hour to get there. Do you think that is enough time?',
      'It\'ll work out. Trust the process.',
    ],
    context: '「乗り継ぎ」は layover（長め）か connection/connecting flight（乗り換え）。tight は「ギリギリ」。make it は「間に合う」。',
    character: 'takeshi',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'レンタカー借りたいんですけど',
    english: [
      'I would like to rent a car.',
      'We are thinking about renting a car for the week. What do you have available?',
      'We want to do a road trip along the coast so we need a rental car for about five days. What are our options?',
      'Say no more! Let\'s make it happen.',
    ],
    context: '「借りたい」は I would like to rent。hire a car はイギリス英語。road trip を理由にすると会話が広がる。',
    character: 'lisa',
    category: 'travel',
    month: '2027-03',
  },
  {
    daySlot: 347,
    japanese: 'この街、治安はどうですか？',
    english: [
      'Is this area safe?',
      'How is the safety situation around here? Anything I should watch out for?',
      'We are planning to walk around the neighborhood at night. Are there any areas we should avoid?',
      'Ha, for real? That\'s interesting!',
    ],
    context: '「治安」は safety, security。is it safe は直球すぎることもあるので、anything to watch out for が角が立たない。sketchy = 怪しい・危なっかしい。',
    character: 'kenji',
    category: 'travel',
    month: '2027-03',
  },
];


// ============================================================
// Day 348: 旅のトラブルの極意 (request)
// ============================================================

const day348: MasterExpression[] = [
  {
    daySlot: 348,
    japanese: 'フライトがキャンセルになったんですけど',
    english: [
      'My flight got cancelled.',
      'They just cancelled my flight and I have no idea what to do.',
      'I just got a notification that my flight has been cancelled due to weather. Can you help me find an alternative?',
      'Of course! What do you need?',
    ],
    context: '「キャンセルになった」は got cancelled が自然。was cancelled より「された」感が出る。alternative flight, rebook, next available が続く定番ワード。',
    character: 'yuki',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: 'パスポートをなくしたかもしれない',
    english: [
      'I think I lost my passport.',
      'I cannot find my passport anywhere and I am starting to panic.',
      'I have turned my entire bag inside out and my passport is not here. I think I might have left it at the last hotel.',
      'Yeah, you might be onto something there.',
    ],
    context: '「なくしたかもしれない」の I think I lost / might have left が完璧。cannot find it anywhere で焦りを表現。embassy（大使館）は緊急時の必須ワード。',
    character: 'takeshi',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '財布をすられたみたいです',
    english: [
      'I think my wallet was stolen.',
      'Someone pickpocketed me. My wallet is gone.',
      'I just realized my wallet is missing from my bag. I think it was stolen on the subway. Where is the nearest police station?',
      'Hmm, good question. What do you think?',
    ],
    context: '「すられた」は pickpocketed, stolen。I think をつけると断定を避けられる。file a police report（被害届を出す）が次のステップ。',
    character: 'lisa',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '部屋のエアコンが効かないんです',
    english: [
      'The AC is not working.',
      'The air conditioning in my room does not seem to be working. Could someone take a look?',
      'I have tried adjusting the thermostat but the room is still really hot. I think the AC unit might be broken.',
      'Oh no, sorry about that! Let me call maintenance.',
    ],
    context: '「効かない」は is not working が万能。does not seem to be working は柔らかい言い方。thermostat（温度調節器）は海外ホテルの基本操作。',
    character: 'kenji',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '予約が入っていないと言われました',
    english: [
      'They say my reservation is missing.',
      'The hotel says they have no record of my booking.',
      'I made a reservation online two weeks ago and I have the confirmation email right here, but the front desk is saying they cannot find it in their system.',
      'Done! I booked us a table for seven.',
    ],
    context: '「入っていない」は no record of, cannot find in the system。confirmation email を見せるのが解決の第一歩。third-party site（第三者サイト）経由の予約トラブルは超あるある。',
    character: 'mina',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: 'タクシーにぼったくられた気がする',
    english: [
      'I think the taxi ripped me off.',
      'That ride cost way more than it should have. I think I got scammed.',
      'The driver took a really roundabout route and the meter was running the whole time. I am pretty sure I just got overcharged.',
      'Want me to call one? It\'ll be faster.',
    ],
    context: '「ぼったくり」は rip off, scam, overcharge。roundabout route（遠回り）は悪質タクシーの定番手口。push back = 異議を唱える。',
    character: 'master',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '具合が悪くて病院に行きたい',
    english: [
      'I need to see a doctor.',
      'I am not feeling well at all. Is there a hospital or clinic nearby?',
      'I have had a really bad stomach ache since yesterday and it is getting worse. Could you help me find a doctor who speaks English?',
      'You should go. Better safe than sorry.',
    ],
    context: '「病院に行きたい」は see a doctor, go to a clinic。English-speaking doctor を探すのが海外旅行の鍵。travel insurance は旅行保険。',
    character: 'yuki',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '荷物が届かないんですけど',
    english: [
      'My luggage is missing.',
      'My bag did not come out on the carousel. I think it got lost.',
      'I have been waiting at baggage claim for forty minutes and my suitcase has not shown up. Who do I talk to about this?',
      'No worries, take your time!',
    ],
    context: '「届かない」は did not come out, did not show up, got lost。baggage claim（手荷物受取所）と carousel（ベルトコンベア）はセットで覚える。',
    character: 'takeshi',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '道に迷ったみたいです',
    english: [
      'I think I am lost.',
      'I have been walking in circles. I have no idea where I am.',
      'I was trying to follow the map on my phone but I think I took a wrong turn somewhere. Could you point me toward the station?',
      'Here, pull up the map. I\'ll show you.',
    ],
    context: '「迷った」は I am lost が王道。walking in circles は「同じところをグルグル」。took a wrong turn（曲がり角を間違えた）が具体的で伝わりやすい。',
    character: 'lisa',
    category: 'request',
    month: '2027-03',
  },
  {
    daySlot: 348,
    japanese: '保険の書類が必要なんですけど',
    english: [
      'I need insurance paperwork.',
      'Could I get a copy of the receipt and a medical report for my insurance claim?',
      'My travel insurance requires documentation of the incident. Could you help me put together the necessary paperwork?',
      'Of course! What do you need?',
    ],
    context: '「保険の書類」は insurance paperwork, documentation。claim（保険請求）が重要ワード。receipt, medical report, police report を集めるのが基本。',
    character: 'kenji',
    category: 'request',
    month: '2027-03',
  },
];


// ============================================================
// Day 349: 仕事の極意 (social)
// ============================================================

const day349: MasterExpression[] = [
  {
    daySlot: 349,
    japanese: '今の仕事、やりがいはあるけど大変',
    english: [
      'My job is rewarding but tough.',
      'I love what I do but it takes a lot out of me.',
      'The work itself is really fulfilling but the hours and the pressure can be pretty intense sometimes.',
      'That sounds rough. Hang in there.',
    ],
    context: '「やりがい」は rewarding, fulfilling, meaningful。takes a lot out of me は「消耗する」。sweet spot は「ちょうどいいバランス」。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '転職しようか迷ってる',
    english: [
      'I am thinking about switching jobs.',
      'I have been going back and forth about whether to change careers.',
      'I like my current company but I feel like I have hit a ceiling and there is not much room for growth anymore.',
      'Oh wow! What\'s the new job?',
    ],
    context: '「迷ってる」は going back and forth, on the fence, torn。hit a ceiling は「頭打ち」。outgrow は「成長して合わなくなる」。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '上司と合わないんだよね',
    english: [
      'My boss and I do not get along.',
      'I just do not click with my manager. Our work styles are completely different.',
      'My supervisor and I have very different approaches to everything and it creates a lot of friction in the office.',
      'Yikes. That\'s tough. What did you say?',
    ],
    context: '「合わない」は do not get along, do not click, do not see eye to eye。friction（摩擦）が職場の不和を表すのにぴったり。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '残業が当たり前になってる',
    english: [
      'Overtime is just the norm here.',
      'Working late has become so routine that it does not even feel like overtime anymore.',
      'Nobody in the office leaves before eight and we all just accept it as normal even though we all know it should not be.',
      'Again? You gotta take care of yourself too.',
    ],
    context: '「当たり前」は the norm, just how it is, taken for granted。overtime culture は日本企業の代名詞的な問題。feel guilty for leaving は日本人あるある。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: 'リモートワークが合ってるかも',
    english: [
      'Remote work might suit me better.',
      'I think I am actually more productive when I work from home.',
      'Ever since we started working remotely I have realized that I get way more done without the constant interruptions of an open office.',
      'Ha, you\'re not wrong about that!',
    ],
    context: '「合ってる」は suits me, works for me, is a good fit。productive at home vs. distractions at office はリモート議論の定番構図。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '副業始めようかと思ってる',
    english: [
      'I am thinking about a side gig.',
      'I want to start something on the side to bring in a little extra income.',
      'I have been looking into freelance work that I could do in the evenings and on weekends to build up some savings.',
      'Oh wow, you\'re right! Good eye.',
    ],
    context: '「副業」は side gig, side hustle, side job。hustle はちょっとガツガツ感がある。freelance work も副業の一種。multiple income streams が今風。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '会議多すぎて仕事が進まない',
    english: [
      'Too many meetings, not enough work.',
      'I spend half my day in meetings and the other half trying to catch up on actual work.',
      'We had six meetings today and I did not get a single thing on my to-do list done. It is getting ridiculous.',
      'I feel you. Work never stops, does it?',
    ],
    context: '「仕事が進まない」は cannot get anything done, not making progress。could have been an email は世界共通の会議への不満。paradox of meetings は共感度が高い。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: 'スキルアップしたいんだよね',
    english: [
      'I want to level up my skills.',
      'I feel like I need to invest in myself and learn some new skills.',
      'The industry is changing so fast that I need to keep learning just to stay relevant. I am looking into taking some courses.',
      'Yeah, totally! I was just thinking that.',
    ],
    context: '「スキルアップ」は和製英語。level up, upskill, develop skills が自然。invest in yourself は自己投資の英語版。stay relevant = 時代遅れにならない。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: 'やっと昇進できた',
    english: [
      'I finally got promoted.',
      'After three years, I finally got the promotion I have been working toward.',
      'They told me this morning that I am being promoted to team lead starting next month. I honestly cannot believe it.',
      'Congrats! That\'s well deserved!',
    ],
    context: '「昇進」は got promoted が一番自然。promotion は名詞。team lead / manager / senior はポジション名。given up on は「諦めかけた」。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 349,
    japanese: '定年後に何しよう',
    english: [
      'What should I do after retirement?',
      'I have been thinking a lot about what I want to do when I retire.',
      'Retirement is still a few years away but I want to have a plan so I do not just end up sitting around doing nothing.',
      'Say no more! Let\'s make it happen.',
    ],
    context: '「定年後」は after retirement。retire は動詞。loss of purpose（目的の喪失）は退職後の課題として英語圏でもよく語られるテーマ。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
];


// ============================================================
// Day 350: 議論の極意 (social)
// ============================================================

const day350: MasterExpression[] = [
  {
    daySlot: 350,
    japanese: 'それはちょっと違うと思う',
    english: [
      'I see it differently.',
      'I am not sure I agree with that. Here is how I see it.',
      'I understand where you are coming from, but I think there is another way to look at this.',
      'Oh wait, my bad. What do you mean?',
    ],
    context: '「違うと思う」は I disagree より I see it differently の方が角が立たない。I understand where you are coming from が前置きの黄金パターン。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: '一理あるけど、でもさ',
    english: [
      'You have a point, but...',
      'That is fair, but let me push back a little on that.',
      'I can see why you think that and you are not wrong, but I think we are missing a bigger piece of the puzzle here.',
      'Hmm, good question. What do you think?',
    ],
    context: '「一理ある」は you have a point, that is fair, I see your side。push back は「反論する」だけど攻撃的ではない。missing a bigger piece が議論を広げるコツ。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: '具体的にはどういうこと？',
    english: [
      'What do you mean exactly?',
      'Can you give me a specific example of what you are talking about?',
      'I think I get the general idea but I want to make sure I understand. Could you walk me through a concrete example?',
      'Oh, that\'s actually genius. Let\'s try it.',
    ],
    context: '「具体的に」は specifically, concretely, give me an example。walk me through は「順を追って説明して」。abstract vs. concrete は議論の質を上げるキーワード。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: 'そもそもの話として',
    english: [
      'Let us take a step back here.',
      'Before we go further, let us revisit the fundamental question.',
      'I think we are getting lost in the details. Can we zoom out and look at the bigger picture for a moment?',
      'Hmm, good question. What do you think?',
    ],
    context: '「そもそも」は step back, fundamentally, at its core。zoom out は「俯瞰する」。reframe は「視点を変える」。議論が行き詰まった時の切り札。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: 'お互い歩み寄ろうよ',
    english: [
      'Let us meet in the middle.',
      'How about we both compromise a little and find some common ground?',
      'We clearly both have strong opinions on this but I think there is a middle ground here if we are both willing to give a little.',
      'Hmm, good question. What do you think?',
    ],
    context: '「歩み寄る」は meet in the middle, compromise, find common ground。give a little は「少し譲る」。win-win の発想が英語の議論文化の基本。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: 'それって偏見じゃない？',
    english: [
      'Is that not a bit biased?',
      'I think there might be some bias in that perspective. Have you considered the other side?',
      'I do not want to put you on the spot, but that sounds like it might be based on a stereotype rather than actual experience.',
      'Say no more! Let\'s make it happen.',
    ],
    context: '「偏見」は bias, prejudice, stereotype。biased は形容詞。put you on the spot は「困らせる」。question vs. accusation のテクニックがポイント。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: 'データで見るとさ',
    english: [
      'If you look at the data...',
      'The numbers actually tell a different story. Let me show you.',
      'I was curious about this so I looked it up and the research suggests something quite different from what most people assume.',
      'There\'s a shop nearby that can sort that out.',
    ],
    context: '「データで見ると」は the data shows, numbers tell a different story。evidence-based は英語の議論で最強カード。gut feeling = 直感。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: '論点がずれてきてない？',
    english: [
      'We are getting off topic.',
      'I feel like we have drifted away from the original point. Can we refocus?',
      'Hold on, I think we started talking about one thing and somehow ended up on a completely different topic. Let us circle back.',
      'Hmm, good question. What do you think?',
    ],
    context: '「論点ずれてる」は off topic, sidetracked, went off on a tangent。circle back は「元に戻る」。refocus は「焦点を戻す」。会議でも超使える。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: '結局何が言いたいの？',
    english: [
      'What is your point?',
      'So what is the bottom line here? What are you getting at?',
      'I have been listening carefully but I am still not sure what your main takeaway is. Could you summarize your position?',
      'Yeah, I heard about that. Wild, right?',
    ],
    context: '「何が言いたい」は what is your point, what are you getting at。bottom line は「要するに」。blunt = 率直。summarize your position が丁寧版。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 350,
    japanese: 'まあ、考え方は人それぞれだよね',
    english: [
      'Well, everyone sees things differently.',
      'At the end of the day, we are all entitled to our own opinions.',
      'I think we can agree to disagree on this one. Different perspectives are what make conversations interesting.',
      'Yeah, totally! I was just thinking that.',
    ],
    context: '「人それぞれ」は everyone has their own opinion, agree to disagree, to each their own。議論の締めに使える万能フレーズ。mature = 大人の対応。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
];


// ============================================================
// Day 351: 物語の極意 (social)
// ============================================================

const day351: MasterExpression[] = [
  {
    daySlot: 351,
    japanese: 'ちょっと聞いてよ、すごい話があるんだけど',
    english: [
      'You are not going to believe this.',
      'Okay, sit down because I have the craziest story for you.',
      'So something unbelievable happened to me yesterday and I have been dying to tell someone about it.',
      'Go on, I\'m listening!',
    ],
    context: '「聞いてよ」は you will not believe this, guess what, listen to this。sit down は「座れ、すごい話だから」の前振り。dying to tell someone = 誰かに言いたくてたまらない。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'で、ここからが面白いんだけど',
    english: [
      'And here is the best part.',
      'But wait, it gets better. You are not ready for this.',
      'So just when I thought the story was over, something even crazier happened that completely changed everything.',
      'Ha, right?! Gets me every time.',
    ],
    context: '「ここからが面白い」は here is the best part, it gets better, this is where it gets good。suspense（緊張感）を作るのが英語ストーリーテリングの技術。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: '話盛ってない？',
    english: [
      'Are you exaggerating?',
      'Come on, there is no way that actually happened. Are you making this up?',
      'I want to believe you but that sounds way too crazy to be real. Are you sure you are not embellishing a little?',
      'Ha! Only you could pull that off.',
    ],
    context: '「盛ってる」は exaggerating, embellishing, stretching the truth。making it up は「作り話」。creative liberty = 脚色の自由。beside the point = どうでもいい。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'あの映画、めちゃくちゃよかった',
    english: [
      'That movie was incredible.',
      'I just saw that movie and it blew me away. Seriously, go see it.',
      'I went in with zero expectations and walked out completely speechless. It was hands down one of the best films I have seen in years.',
      'Have you seen it yet? No spoilers!',
    ],
    context: '「めちゃくちゃよかった」は incredible, amazing, blew me away。hands down = 文句なしに。speechless = 言葉を失った。go see it は強い推薦。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'この本、人生変わったわ',
    english: [
      'This book changed my life.',
      'I am not kidding, this book completely shifted how I think about everything.',
      'I picked this up on a whim at the bookstore and it ended up being one of the most impactful things I have ever read.',
      'Good read? What\'s it about?',
    ],
    context: '「人生変わった」は changed my life, game-changer, life-changing。on a whim は「気まぐれで」。through a different lens = 違う視点で。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: '昔の自分に言ってやりたい',
    english: [
      'I wish I could tell my younger self.',
      'If I could go back in time, there are so many things I would tell myself.',
      'If twenty-year-old me could see where I am now, they would never believe it. I have come so far since then.',
      'Let\'s do it! I\'m right behind you.',
    ],
    context: '「昔の自分に」は my younger self, past me。go back in time は「タイムスリップ」。would not have listened は仮定法完了。wrong turn = 間違い・遠回り。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'この一年、振り返ると色々あったな',
    english: [
      'This year has been quite a ride.',
      'Looking back, this past year has been full of ups and downs.',
      'If someone told me a year ago that I would be here right now, doing what I am doing, I would have laughed in their face.',
      'Let\'s do it! I\'m right behind you.',
    ],
    context: '「色々あった」は quite a ride, a lot has happened, ups and downs。take a step back and see the full picture は「振り返って全体を見る」。総復習の締めにぴったり。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: '結局、続けることが一番大事だった',
    english: [
      'Consistency was the key all along.',
      'At the end of the day, just showing up every single day mattered more than anything else.',
      'I tried every shortcut and hack and productivity trick out there, but the thing that actually made the difference was simply not quitting.',
      'Couldn\'t agree more. That\'s so important.',
    ],
    context: '「続けること」は consistency, showing up, sticking with it。shortcut（近道）より地道さ。progress is about small steps が卒業にふさわしいメッセージ。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'ここまで来れたのはみんなのおかげ',
    english: [
      'I could not have done it without everyone.',
      'Honestly, none of this would have been possible without the people around me.',
      'I want to take a moment to acknowledge everyone who supported me along the way because I definitely did not get here on my own.',
      'Oh really? Tell me more!',
    ],
    context: '「おかげ」は thanks to, would not have been possible without。英語でも感謝は具体的に言うと響く。picked me up when I fell がエモい。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 351,
    japanese: 'さあ、次のステージへ行こう',
    english: [
      'On to the next chapter.',
      'All right, this is not the end. It is just the beginning of something new.',
      'We have come this far and I am not about to stop now. The next stage is going to be even better.',
      'Let\'s do it! I\'m right behind you.',
    ],
    context: '「次のステージ」は next chapter, next level, next stage。graduation は「終わり」ではなく「始まり」。door opening が卒業式スピーチ風でいい感じ。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
];


// ============================================================
// Combined Exports
// ============================================================

export const MONTH12_W47_EXPRESSIONS: MasterExpression[] = [
  ...day345,
  ...day346,
  ...day347,
  ...day348,
  ...day349,
  ...day350,
  ...day351,
];

