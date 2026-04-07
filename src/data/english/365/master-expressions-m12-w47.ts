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
      'I have been coming to places like this for years but I still love asking the staff what they recommend because they always know the hidden gems on the menu that I would never find on my own.',
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
      'I always end up ordering way too much food because I get excited looking at the menu, so this time I am actually trying to ask about portion sizes before I go overboard and waste half of it.',
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
      'I always feel a little awkward bringing up my allergy at restaurants because I do not want to be that difficult customer, but I have learned the hard way that it is better to speak up than to end up in the emergency room.',
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
      'I used to pretend I could handle spicy food to impress people but after one really bad experience at a Thai place I finally accepted that mild is my comfort zone and there is absolutely nothing wrong with that.',
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
      'Whenever I eat out with friends we always end up sharing dishes family style, and I have noticed that in some countries you have to specifically ask for sharing plates because they do not automatically bring them like they do in Japan.',
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
      'I still remember the first time I ate at a restaurant abroad and had no idea how to ask for the bill because in Japan the system is so different with paying at the register on your way out instead of at the table.',
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
      'In Japan people rarely ask for doggy bags because there is this cultural thing about not wanting to seem greedy, but in America it is totally normal and actually encouraged because nobody wants to see good food go to waste.',
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
      'It happens every now and then where the kitchen gets slammed and a dish gets lost in the shuffle, so I have learned to politely flag it before too much time passes rather than just sitting there wondering if they forgot.',
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
      'Splitting the bill is one of those things that varies so much by culture because in Japan割り勘 is super common and straightforward but in some countries the server looks at you like you just asked them to solve a math problem.',
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
      'I know that menu photos are always going to look better than the real thing because that is just how food photography works, but there is a limit and when something looks completely different I feel like it is fair to at least ask about it.',
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
      'I think my body finally caught up with me after weeks of not sleeping properly and eating junk food, and now I am paying the price with this constant fatigue that will not go away no matter how much coffee I drink.',
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
      'Every year around checkup time I tell myself I am not going to stress about it and every year I end up googling symptoms at two in the morning and convincing myself that something is definitely wrong even though it never is.',
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
      'It is funny how I can spend an hour researching the perfect workout routine and the best running shoes but I cannot actually bring myself to put them on and go outside because the couch is just too comfortable and my willpower disappears the second I sit down.',
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
      'The worst part about stress-related insomnia is that you know you need to sleep to function the next day but the more you try to force yourself to sleep the more awake you become and then you start stressing about not sleeping which makes everything ten times worse.',
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
      'I never understood why my parents were always complaining about stiff shoulders until I started working a desk job and now I totally get it because sitting in the same position for eight hours straight will absolutely destroy your upper back and no amount of stretching seems to fix it.',
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
      'People who do not have hay fever have no idea how miserable it is because it is not just a runny nose -- it is this constant feeling of being sick for two straight months while everyone else is outside enjoying the cherry blossoms and you are locked in your room with a box of tissues.',
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
      'Every single time I go out drinking I swear to myself that I will stop after three beers and every single time I end up staying until last call and waking up the next morning feeling like I got hit by a truck and swearing I will never drink again which we both know is a lie.',
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
      'I used to think hydration was not that big of a deal until I nearly passed out during a summer hike because I only brought one small bottle of water for a four-hour trail and that experience taught me that your body needs way more water than you think it does.',
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
      'For years I was a total night owl who stayed up until two in the morning watching random videos and then I read about how morning routines can completely transform your productivity so I forced myself to switch and now I actually feel like a functioning human being for the first time in my adult life.',
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
      'I have seen too many people burn out because they kept pushing through when their body was clearly telling them to stop, and I do not want that to happen to you so please just take a step back and rest when you need to because the work will still be there tomorrow.',
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
      'I always request a window seat whenever I fly because there is something about looking down at the clouds and the tiny cities below that makes me feel like all my problems are small too, plus I can lean against the wall and actually sleep without my head falling on a stranger.',
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
      'I have a terrible track record with public transportation in foreign countries because I always manage to get on the wrong train or go in the wrong direction, so now I make a point of asking someone before I sit down even if it means looking like a clueless tourist.',
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
      'I learned the hard way that showing up at a hotel at eight in the morning expecting to walk right into your room does not work in most countries, so now I always ask about early check-in ahead of time and honestly most places are pretty flexible about it if you just ask nicely.',
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
      'It is kind of funny how the first thing everyone does when they check into a hotel anywhere in the world is ask for the Wi-Fi password before they even look at the room, and I am definitely one of those people because I need to let everyone know I arrived safely and post a photo of the view.',
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
      'I have noticed that the best travel experiences almost never come from guidebooks or travel blogs but from random recommendations by locals, like that time a taxi driver told me about this tiny temple that was not in any tourist guide and it ended up being the highlight of my entire trip.',
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
      'One of the most underrated travel skills is knowing how to deal with your luggage between checkout and your flight because nobody wants to drag a suitcase around a city for six hours, and most hotels will actually hold your bags for free even after checkout if you just ask the front desk.',
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
      'I have learned over the years that airport exchange rates are almost always terrible so now I try to find a local exchange place or just use ATMs to withdraw local currency because the rates are usually way better even with the international transaction fee.',
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
      'I once had a thirty-minute connection in a massive airport and I literally had to sprint through the terminal with my backpack bouncing around like crazy, and I made it to the gate just as they were about to close the door, and ever since then I have refused to book anything with less than a two-hour layover.',
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
      'Renting a car in a foreign country used to terrify me because of driving on the opposite side of the road and reading signs in another language, but honestly once you get past the first ten minutes of panic it becomes the most freeing way to travel because you can go wherever you want on your own schedule.',
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
      'I always ask locals about safety because they know which streets to avoid and what times are sketchy, and their advice is way more reliable than what you read online because travel forums tend to either make everything sound dangerous or make everything sound perfectly safe when the truth is always somewhere in the middle.',
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
      'There is nothing quite like the sinking feeling you get when you see the word cancelled next to your flight number on the departure board and you are standing in a foreign airport at midnight with no backup plan and the airline counter has a line that wraps around the building twice.',
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
      'Losing your passport abroad is one of those nightmare scenarios that you never think will happen to you until it does, and suddenly you realize that this little booklet is basically your entire identity in a foreign country and without it you are essentially stuck in limbo until the embassy can help you sort things out.',
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
      'I was so careful the entire trip, keeping my bag zipped and in front of me, but one moment of distraction on a crowded train and my wallet was gone just like that, and the worst part is not even the money but having to cancel all your cards and deal with the paperwork while you are supposed to be on vacation.',
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
      'I do not want to be that guest who complains about everything but it is thirty-five degrees outside and the air conditioning has been blowing warm air for the past two hours and I genuinely cannot sleep in these conditions, so I would really appreciate it if someone could come fix it or move me to a different room.',
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
      'This has happened to me twice now and both times it was because the booking went through a third-party site that did not properly sync with the hotel, so now I always call the hotel directly a few days before arrival to confirm my reservation because I never want to be standing at a front desk at midnight being told they have no room for me again.',
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
      'Getting ripped off by a taxi driver is like a rite of passage for travelers and it has happened to me more times than I care to admit, but I have learned that the best defense is to always check the approximate fare on your phone before you get in so you have a reference point and can push back if the number seems way too high.',
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
      'Getting sick while traveling is the absolute worst because not only do you feel terrible but you also have to navigate a completely unfamiliar healthcare system in a language you might not speak, and that is why I now always make sure I have travel insurance and a list of English-speaking clinics saved on my phone before I leave.',
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
      'Lost luggage is one of those travel problems that sounds minor until it actually happens to you and you are standing in a foreign country with nothing but the clothes on your back and a phone charger in your pocket, and you realize that everything you need for the next two weeks is currently on its way to the wrong continent.',
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
      'Getting lost used to stress me out so much but now I kind of see it as part of the adventure because some of my favorite travel memories happened because I wandered off the planned route and stumbled into a neighborhood or a little shop that I never would have found if I had just followed the GPS like a normal person.',
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
      'Dealing with insurance claims while traveling is one of those things nobody warns you about because it is not just about having insurance but also about collecting every single receipt, report, and piece of documentation you can get your hands on while you are still in the country because trying to gather that stuff after you go home is nearly impossible.',
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
      'I think the best jobs are the ones that challenge you just enough to keep you growing but not so much that you burn out, and right now I am in that sweet spot where I feel like I am making a difference even though I come home exhausted most days.',
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
      'The hardest part about considering a job change is not the actual job search but the internal debate you have with yourself where one side says you should be grateful for what you have and the other side says life is too short to stay somewhere you have outgrown, and those two voices just keep arguing until you either make a move or stay put for another year.',
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
      'People always say that you do not quit jobs, you quit managers, and I am starting to understand what that means because my boss is not a bad person at all but we just see everything differently, from how to prioritize tasks to how to communicate with the team, and that constant mismatch is slowly draining my motivation.',
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
      'The weird thing about a company with an overtime culture is that even when you finish your work on time you feel guilty for leaving because everyone else is still at their desk, so you end up sitting there pretending to be busy just to avoid being the first one out the door, which is honestly one of the most pointless wastes of time I can think of.',
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
      'I used to think I needed the structure of going to an office every day but after two years of remote work I discovered that I am the kind of person who thrives when I can control my own environment and schedule, and the commute time I save gives me an extra two hours a day that I can actually spend on things I care about.',
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
      'The idea of having multiple income streams really appeals to me because relying on a single paycheck from one employer feels risky in today\'s economy, and I figure if I can find something I enjoy that also makes money then it does not even feel like extra work, it just feels like a hobby that happens to pay.',
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
      'There is this paradox in corporate culture where everyone complains about having too many meetings but nobody wants to be the one to cancel them, so we all just keep showing up and sitting through hour-long discussions that could have been a five-minute email, and then we wonder why nothing ever gets done on time.',
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
      'I have come to realize that the most valuable thing you can do for your career is never stop learning, because the skills that got you your current job might not be enough five years from now, and the people who keep growing are the ones who end up with the most options when opportunities come along.',
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
      'I had almost given up on getting promoted because I watched two rounds of promotions go by without my name on the list, but I decided to keep putting in the work instead of getting bitter about it, and apparently someone noticed because when they called me into the office today I was fully expecting bad news and instead they handed me the best news I have gotten all year.',
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
      'People always talk about retirement like it is this magical finish line where everything becomes perfect, but I have seen enough retired people struggle with boredom and loss of purpose to know that you need to actually plan what comes next, whether that is volunteering, traveling, picking up a hobby, or even starting a completely new career.',
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
      'I have learned that the best way to disagree with someone is not to say they are wrong but to offer a different perspective, because the moment you tell someone they are wrong their brain shuts down and they stop listening, but if you say I see it differently they stay open and the conversation can actually go somewhere productive.',
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
      'Acknowledging someone else is point before you make your counterargument is honestly the most underrated conversation skill because it shows that you actually listened and understood their position, which makes them way more willing to hear yours, and that little phrase you have a point has saved me from so many unnecessary arguments.',
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
      'Asking for specifics is one of the most powerful moves in any conversation because it separates people who have actually thought through their position from people who are just repeating something they heard, and it also helps you understand their viewpoint much better than any abstract explanation ever could.',
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
      'Sometimes in the middle of a heated discussion you realize that everyone is arguing about the details but nobody stopped to question the basic assumption underneath it all, and when you take a step back and say wait, are we even asking the right question, it completely reframes the conversation and often leads to a much better outcome.',
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
      'The best negotiations are the ones where both sides walk away feeling like they got something because if one person wins everything and the other person loses everything then you might have won the argument but you have probably damaged the relationship, and in the long run that relationship is worth way more than being right.',
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
      'Calling out bias is tricky because nobody likes being told they are biased, but sometimes it is necessary to point out that someone is generalizing based on limited information, and the key is to do it as a question rather than an accusation so they have space to reconsider their position without feeling attacked.',
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
      'I used to argue based on gut feeling and personal experience but I learned that the fastest way to change someone is mind is to show them actual data because it is really hard to argue with numbers, and even if they do not change their mind right away the data plants a seed that keeps growing in the back of their head.',
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
      'It is so easy for conversations to go off the rails, especially when people are passionate about a topic, because one tangent leads to another tangent and before you know it you are arguing about something that has nothing to do with what you originally sat down to discuss, and someone has to be the one to pull everyone back on track.',
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
      'I know it sounds blunt to ask someone what their point is but sometimes a conversation has been going on for twenty minutes and you genuinely have no idea what conclusion they are trying to reach, and it is actually more respectful to ask directly than to keep nodding and pretending you understand when you do not.',
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
      'I used to think that every disagreement had to end with one person convincing the other, but I have realized that some topics just do not have a single right answer, and the mature thing to do is acknowledge that reasonable people can look at the same situation and come to completely different conclusions, and that is actually okay.',
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
      'You know how some things happen to you and the first thought in your head is nobody is going to believe me when I tell them this? Well that is exactly what happened to me last weekend and I have been saving this story all week waiting for the right moment to drop it on someone.',
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
      'The thing about a really good story is that you have to know when to pause and build suspense because if you just rush through it people do not have time to react, and the best storytellers I know always have this moment where they say and here is where it gets interesting and everyone leans in.',
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
      'I have this friend who tells the most incredible stories but every time I hear them I wonder how much is true and how much is creative liberty, and the funny thing is I do not even care because the stories are so entertaining that the truth is kind of beside the point.',
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
      'I am usually pretty critical of movies because I have seen so many that it takes a lot to impress me, but this one got me right in the gut from the opening scene and by the end I was sitting in my seat with tears streaming down my face even though I am not normally the type to cry at movies and the person next to me definitely noticed.',
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
      'I have read a lot of books that people say are life-changing and most of them are fine but nothing special, but every once in a while you come across one that hits you at exactly the right moment in your life and the ideas stick with you for months and you start seeing the world through a completely different lens.',
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
      'I sometimes think about what advice I would give my younger self and the honest answer is probably nothing because I know that stubborn kid would not have listened anyway, and all the mistakes I made along the way are exactly what shaped me into the person I am today, so in a weird way I am grateful for every single wrong turn.',
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
      'There is something about reaching the end of a year that makes you look back and realize just how much has changed, because when you are in the middle of it you feel like nothing is moving but then you take a step back and see the full picture and it hits you that you have actually grown more than you thought and survived things you were not sure you could handle.',
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
      'If I could distill everything I have learned this year into one lesson it would be this: talent and motivation come and go, but the people who succeed are the ones who keep showing up even on the days when they do not feel like it, because progress is not about big breakthroughs, it is about all those small boring consistent steps that nobody sees.',
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
      'It is easy to look at someone is accomplishments and think they did it all by themselves, but the truth is that behind every person who makes it there is a whole network of people who believed in them when they did not believe in themselves, who picked them up when they fell, and who celebrated the small wins that nobody else noticed.',
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
      'Graduating from something does not mean you are finished learning, it just means you have earned the right to face bigger challenges, and I think that is the most exciting part because every ending is really just a door opening to something you could not see before, and I cannot wait to walk through it and find out what is on the other side.',
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

