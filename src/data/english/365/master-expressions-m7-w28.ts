// Month 7 Week 28: Business Situations
// Days 202-210, 90 expressions, 45 keywords

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Day 202: settai (Business Entertaining)
// ============================================================

const day202: MasterExpression[] = [
  {
    daySlot: 202,
    japanese: 'こちらへどうぞ',
    english: [
      'Right this way',
      'Right this way, please follow me',
      'Right this way, sir, your table is all set for you',
      'Oh, this is perfect. Nice and quiet back here, I love it.'
    ],
    jaTranslations: [
      'こちらへどうぞ',
      'こちらへどうぞ、ついてきてください',
      'こちらへどうぞ、お席の準備できてますよ',
      'お、ここ最高じゃん。奥で静かだし、いい感じ。'
    ],
    context: 'Japanese settai is all about guiding the guest. English keeps the warmth but drops the formality by a notch -- "right this way" sounds smooth without being stiff.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: '今日はありがとうございます',
    english: [
      'Thanks for tonight',
      'Really appreciate you coming out tonight',
      'I just want to say thanks for taking the time to come out tonight',
      'Are you kidding? I have been looking forward to this all week. Glad we could make it work.'
    ],
    jaTranslations: [
      '今日はありがとう',
      '今日わざわざ来てくれてほんとありがとね',
      '忙しいのに時間作ってくれて、ほんと感謝っす',
      'いやいや、ずっと楽しみにしてたよ。やっと実現できてよかった。'
    ],
    context: 'In settai, the host always kicks off with gratitude. English does the same but sounds way more natural when you mention their busy schedule -- shows you actually thought about their time.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'お好きなものをどうぞ',
    english: [
      'Order whatever you like',
      'Please, get whatever catches your eye',
      'Seriously, order whatever catches your eye, tonight is on us',
      'Well, if you insist! I have had my eye on the wagyu since I walked in.'
    ],
    jaTranslations: [
      '好きなもの頼んで',
      '気になるやつ何でも頼んでよ',
      'マジで遠慮しないで、今日はうちの奢りだから',
      'え、いいんすか！じゃあ入った瞬間から気になってた和牛いっちゃいます。'
    ],
    context: 'Japanese uses the polite "osuki na mono wo" but in English you gotta be more direct about it being your treat -- otherwise the guest might hold back out of politeness.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'お口に合うといいのですが',
    english: [
      'Hope you like it',
      'I hope this is to your liking',
      'I really hope the food here is to your liking, they are known for their sashimi',
      'Are you kidding? This sashimi is incredible. Great pick, honestly.'
    ],
    jaTranslations: [
      '気に入ってくれるといいけど',
      'お口に合うといいんだけど',
      'ここの刺身が有名なんだけど、気に入ってもらえるかな',
      'いやいや、この刺身やばいって。いい店知ってんなー。'
    ],
    context: 'This is peak Japanese humility -- you are basically apologizing in advance for the food. English flips it to confidence with a humble wrapper. You hope, but you also sell the place a little.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: '乾杯しましょう',
    english: [
      'Let us toast',
      'How about a toast to kick things off',
      'Before we dig in, how about a toast to kick things off properly',
      'Absolutely, I will raise my glass to that. Cheers!'
    ],
    jaTranslations: [
      '乾杯しよう',
      'まず乾杯からいこうか',
      '食べる前にさ、ちゃんと乾杯しようよ',
      'もちろん！じゃあグラス上げるよ。乾杯！'
    ],
    context: 'Kanpai is quick and punchy in Japanese. In English business settings, a toast usually comes with a mini speech. Skipping the speech can feel abrupt, so throw in a few words about the relationship.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'もう一杯いかがですか',
    english: [
      'Another drink?',
      'Can I get you another round?',
      'How about another round? The sake here is really something',
      'Go on then, twist my arm. I will try whatever you are recommending.'
    ],
    jaTranslations: [
      'もう一杯どう？',
      'おかわりいく？',
      'もう一杯いこうよ、ここの日本酒マジでうまいから',
      'しょうがないなー、じゃあおすすめのやつもらおうかな。'
    ],
    context: 'In settai, refilling is an art form. English does not have the pour-for-your-senior culture, so you make up for it by offering options and showing you know the menu.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'お話できてよかったです',
    english: [
      'Great talking with you',
      'I am really glad we got to chat tonight',
      'I am really glad we got to sit down and chat like this tonight',
      'Same here. We should do this more often, it beats talking over email any day.'
    ],
    jaTranslations: [
      '話せてよかった',
      '今日ゆっくり話せてよかったよ',
      'こうやって腰据えて話せて、ほんとよかった',
      'こっちこそ。もっとやろうよ、メールより全然いいし。'
    ],
    context: 'Japanese wraps up with a clean "yokatta desu." English needs more meat on the bone -- say what specifically was good about the conversation or it sounds generic.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'お車の手配をしましょうか',
    english: [
      'Need a ride?',
      'Should I call you a car?',
      'Let me call you a car, you should not have to worry about getting home',
      'That would be great, actually. I definitely should not be getting behind the wheel tonight.'
    ],
    jaTranslations: [
      '車いる？',
      'タクシー呼ぼうか？',
      'タクシー呼ぶよ、帰りのこと気にしなくていいから',
      'あ、マジで助かる。今日は絶対運転しちゃダメだわ。'
    ],
    context: 'Japanese goes ultra-polite with "otearai." English is more practical -- you mention why (drinking) and handle the logistics. The caring is in the action, not the words.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: 'またぜひご一緒させてください',
    english: [
      'Let us do this again',
      'We should definitely do this again soon',
      'We should definitely do this again soon, maybe next quarter',
      'I would love that. Send me some dates and I will make it work.'
    ],
    jaTranslations: [
      'またやろう',
      '近いうちにまたやろうよ',
      'また近いうちにやろう、来四半期あたりどう？',
      'ぜひぜひ。日程送ってくれたら合わせるよ。'
    ],
    context: 'The Japanese is a request-style invitation. English works better as a concrete suggestion with a specific next step -- vague "let us do this again" without a plan sounds hollow.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 202,
    japanese: '本日はお忙しい中すみません',
    english: [
      'Sorry to pull you away',
      'I know you are swamped, so thanks for making time',
      'I know how busy things are for you right now, so I really appreciate you making time for this',
      'Honestly, I needed a night out. This is a nice break from staring at spreadsheets.'
    ],
    jaTranslations: [
      '忙しいのにごめんね',
      '忙しいのに来てくれてありがとう',
      'こんな忙しい時期に時間作ってもらって、ほんと申し訳ないっす',
      'いやいや、むしろ息抜き必要だったから。スプレッドシートとにらめっこする日々からの解放だよ。'
    ],
    context: 'Japanese apologizes for the inconvenience. English flips it to gratitude -- apologizing for someone coming to dinner sounds weird. You thank them for their time instead.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  }
];

const day202Keywords: KeyWord[] = [
  { en: 'entertaining', ja: '接待', pron: 'en-ter-TAIN-ing', example: 'Corporate entertaining is a big part of Japanese business.', note: 'settai in English is "entertaining" or "wining and dining"' },
  { en: 'toast', ja: '乾杯', pron: 'tohst', example: 'Let me propose a toast to our success.', note: 'Both the drink action and the mini speech before it' },
  { en: 'on us', ja: 'こちらのおごり', pron: 'on us', example: 'Tonight is on us, do not worry about the bill.', note: 'Casual way to say you are paying' },
  { en: 'wind down', ja: '締めくくる', pron: 'wahynd down', example: 'Let us wind down with some dessert.', note: 'Gradually ending the evening' },
  { en: 'rapport', ja: '信頼関係', pron: 'ra-POR', example: 'Building rapport outside the office is important.', note: 'French origin, the T is silent' }
];

// ============================================================
// Day 203: Business Trips
// ============================================================

const day203: MasterExpression[] = [
  {
    daySlot: 203,
    japanese: '出張で大阪に行きます',
    english: [
      'Business trip to Osaka',
      'I am heading to Osaka on business',
      'I have got a business trip to Osaka next week for a client meeting',
      'Oh nice, Osaka is great. You gotta hit up Dotonbori while you are there.'
    ],
    jaTranslations: [
      '大阪出張',
      '仕事で大阪行くんだ',
      '来週クライアントとの打ち合わせで大阪出張なんだよね',
      'おー大阪いいじゃん。道頓堀は絶対行けよ。'
    ],
    context: 'Japanese just states the fact. English usually adds the reason and maybe a personal angle. Saying just "I am going on a business trip" without why sounds incomplete.',
    character: 'takeshi',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: 'フライトを予約しました',
    english: [
      'Booked my flight',
      'I just booked my flight for next week',
      'I just booked my flight for next week, got a decent deal on a morning departure',
      'Smart, morning flights are way less of a headache. What time do you land?'
    ],
    jaTranslations: [
      '飛行機とった',
      '来週のフライト予約したよ',
      '来週の便とったんだけど、朝便でいい感じの値段だった',
      'やるな、朝便のが楽だよね。何時着？'
    ],
    context: 'In Japanese, "yoyaku shimashita" covers it. English loves the extra detail -- what time, how much, what you will do after landing. The context makes it useful information, not just a status update.',
    character: 'lisa',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: 'ホテルはどこですか',
    english: [
      'Where are you staying?',
      'Which hotel did you end up booking?',
      'Which hotel did you end up going with? Somewhere near the office?',
      'Yeah, I grabbed one right by the south exit. Five minutes to the client office, can not beat that.'
    ],
    jaTranslations: [
      'どこ泊まるの？',
      '結局どこのホテルにしたの？',
      'ホテルどこにしたの？オフィスの近く？',
      'うん、南口のすぐそば。クライアント先まで5分、最高でしょ。'
    ],
    context: 'Japanese asks about location. English often turns it into a recommendation opportunity. Answering a question with just the hotel name feels short -- add something useful.',
    character: 'mina',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '新幹線で行こうかな',
    english: [
      'Maybe I will take the bullet train',
      'I am thinking about taking the shinkansen instead',
      'I am leaning towards taking the shinkansen instead of flying, it is less hassle',
      'Honestly, same. By the time you factor in airport security, the train is just as fast.'
    ],
    jaTranslations: [
      '新幹線にしようかな',
      '飛行機じゃなくて新幹線にしようかなって',
      '飛行機より新幹線のが楽かなと思ってさ',
      'わかる。空港のセキュリティとか考えたら結局同じくらいだもんね。'
    ],
    context: 'The Japanese "kana" shows you are thinking out loud. English captures that with "leaning towards" or "thinking about." Then you justify it, because English likes reasons.',
    character: 'takeshi',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '経費精算めんどくさい',
    english: [
      'Expense reports are a pain',
      'Filing expense reports is such a hassle',
      'I hate filing expense reports, it takes forever to get all the receipts together',
      'Tell me about it. I lost a taxi receipt last time and had to eat the cost myself.'
    ],
    jaTranslations: [
      '経費精算だるい',
      '経費精算ほんとめんどくさい',
      '経費精算まじ嫌い、領収書集めるだけで永遠にかかる',
      'わかりすぎる。前回タクシーの領収書なくして自腹切ったわ。'
    ],
    context: 'Japanese "mendokusai" is one perfect word for the feeling. English needs a whole rant to capture the same energy. "Pain" and "hassle" are the closest single-word options.',
    character: 'kenji',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '出先でトラブルがあった',
    english: [
      'Had trouble on the road',
      'Ran into some issues while I was out there',
      'Things did not go as planned while I was on site, we had a few hiccups',
      'Oh no, what happened? Did you manage to sort it out in the end?'
    ],
    jaTranslations: [
      '出先でトラブった',
      '向こうでちょっと問題あってさ',
      '現場で予定通りいかなくて、いくつかトラブったんだよね',
      'えーマジで、何があったの？結局なんとかなったの？'
    ],
    context: 'Japanese keeps it vague with "trouble ga atta." English usually spills the details -- vague trouble reports sound like you are hiding something in Western business culture.',
    character: 'takeshi',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: 'お土産買ってきたよ',
    english: [
      'Got you some souvenirs',
      'I picked up some stuff for you guys on my trip',
      'I grabbed some local snacks for the office while I was in Osaka',
      'Oh, you did not have to! Ooh, what is in the green box? Those look amazing.'
    ],
    jaTranslations: [
      'お土産買ってきたよ',
      '出張先でみんなにちょっと買ってきた',
      '大阪で地元のお菓子買ってきたから、オフィスで食べてよ',
      'えー気使わなくていいのに！あ、その緑の箱なに？めっちゃうまそう。'
    ],
    context: 'Omiyage culture is massive in Japan but barely exists in English-speaking offices. When you do bring stuff, you describe what it is and tell people to take some -- no one will just grab it otherwise.',
    character: 'mina',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '移動が疲れる',
    english: [
      'Travel wears you out',
      'All the moving around really takes it out of you',
      'The constant travel is exhausting, especially the back-to-back trips',
      'Yeah, you look wiped. When is your next one? Maybe you can squeeze in a day off before then.'
    ],
    jaTranslations: [
      '移動疲れるわ',
      'あちこち動き回るの体力的にキツい',
      '出張続きでマジ疲れる、連チャンは特にしんどい',
      'だよね、顔に出てるよ。次いつ？その前に一日休み入れたら？'
    ],
    context: 'Japanese "tsukareru" is clean and done. English needs to paint the picture -- what specifically is tiring. Just saying "travel is tiring" sounds like complaining without substance.',
    character: 'kenji',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '現地の人と打ち合わせ',
    english: [
      'Meeting with the local team',
      'I have a sit-down with the folks on the ground',
      'I am meeting with the local team on-site to go over the project details',
      'Good call doing it in person. Some stuff just does not translate well over Zoom.'
    ],
    jaTranslations: [
      '現地の人と打ち合わせ',
      '向こうのメンバーと直接会って話すんだ',
      '現地チームと会ってプロジェクトの詳細詰めてくる',
      '直接行くの正解だよ。Zoomだと伝わらないこともあるからな。'
    ],
    context: 'Japanese uses "genchi no hito" which is neutral. English "folks on the ground" carries the same meaning but sounds warmer. "Local team" is the safe business version.',
    character: 'lisa',
    category: 'travel',
    month: '2026-10'
  },
  {
    daySlot: 203,
    japanese: '直帰してもいいですか',
    english: [
      'Can I head straight home?',
      'Mind if I go home directly after the trip?',
      'Would it be okay if I head straight home from the station instead of coming back to the office?',
      'Of course, go ahead. You have been on the road all day, just log in from home if anything pops up.'
    ],
    jaTranslations: [
      '直帰していい？',
      '出張から直接家帰ってもいいすか？',
      '駅からオフィス戻らないで、そのまま帰宅してもいいですか？',
      'もちろん、いいよ。一日外回りだったんだし、何かあったら家からログインしてくれれば。'
    ],
    context: 'Chokki is a uniquely Japanese business concept. English has no single word for it -- you have to explain the whole situation and ask permission with reasons.',
    character: 'takeshi',
    category: 'travel',
    month: '2026-10'
  }
];

const day203Keywords: KeyWord[] = [
  { en: 'on-site', ja: '現地で', pron: 'on-sahyt', example: 'The on-site inspection went smoothly.', note: 'At the actual location, not remote' },
  { en: 'itinerary', ja: '旅程', pron: 'eye-TIN-uh-rare-ee', example: 'Let me send you my itinerary for next week.', note: 'Schedule of travel plans' },
  { en: 'expense report', ja: '経費精算書', pron: 'ek-SPENS ree-PORT', example: 'I need to submit my expense report by Friday.', note: 'Document for reimbursement' },
  { en: 'per diem', ja: '日当', pron: 'pur DEE-em', example: 'The per diem covers meals and local transport.', note: 'Latin: daily allowance for travel' },
  { en: 'jet lag', ja: '時差ボケ', pron: 'jet lag', example: 'I am still dealing with jet lag from the London trip.', note: 'Only for international travel with time zone changes' }
];

// ============================================================
// Day 204: Remote Work
// ============================================================

const day204: MasterExpression[] = [
  {
    daySlot: 204,
    japanese: '今日は在宅勤務です',
    english: [
      'Working from home today',
      'I am working from home today',
      'Hey, just a heads up, I am working from home today',
      'Got it, no worries. I will just ping you on Slack if anything comes up.'
    ],
    jaTranslations: [
      '今日は在宅で',
      '今日リモートでやるわ',
      'あ、今日在宅勤務だから一応言っとくね',
      'りょ、了解。なんかあったらSlackで連絡するわ。'
    ],
    context: 'Japanese states it as a fact. English needs the reassurance -- "I am still reachable" is the unspoken thing your coworkers want to hear when you say WFH.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'カメラオンにしてもらえますか',
    english: [
      'Can you turn your camera on?',
      'Would you mind turning your camera on for this?',
      'Hey, would you mind flipping your camera on? It helps to see faces during these discussions',
      'Oh, sure, hang on. Sorry, my place is a mess -- let me throw the blur on real quick.'
    ],
    jaTranslations: [
      'カメラオンにしてもらえる？',
      'カメラつけてくれない？',
      'ごめん、カメラオンにしてくれると助かる。顔見えたほうが話しやすいから',
      'あ、はいはい、ちょっと待って。部屋散らかってるからぼかし入れるわ。'
    ],
    context: 'This is the eternal remote work battle. Japanese asks politely. English has to justify the request because camera-off is the default for many people. Without a reason, it sounds like surveillance.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: '音声が途切れてます',
    english: [
      'You are breaking up',
      'Your audio is cutting in and out',
      'Sorry to interrupt, but your audio keeps cutting out, can you try reconnecting?',
      'Oh, is it? Let me try reconnecting. Give me like ten seconds.'
    ],
    jaTranslations: [
      '音途切れてるよ',
      '音声ブチブチ切れてるんだけど',
      'ごめん割り込むけど、音声途切れてるから繋ぎ直してもらえる？',
      'あ、マジで？ちょっと繋ぎ直すわ。10秒待って。'
    ],
    context: 'Japanese describes the symptom. English jumps straight to the solution -- "reconnect" or "switch to phone." Just saying "your audio is bad" without suggesting a fix leaves everyone stuck.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: '画面共有しますね',
    english: [
      'Let me share my screen',
      'Hold on, let me share my screen real quick',
      'Give me one second, I am going to share my screen so everyone can follow along',
      'Yep, I can see it now. Looks good, go ahead.'
    ],
    jaTranslations: [
      '画面共有するね',
      'ちょっと待って、画面共有するわ',
      'ちょっと待ってね、みんなが見えるように画面共有するから',
      'うん、見えてるよ。いい感じ、どうぞ。'
    ],
    context: 'Japanese is short and sweet with "shimasu ne." English fills the dead air while you fumble with the share button. The narration of what you are doing keeps people from wondering if you froze.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'ミュートになってますよ',
    english: [
      'You are on mute',
      'I think you are still on mute there',
      'Hey, just so you know, you are on mute. We can see you talking but cannot hear anything',
      'Oh gosh, not again. Can you hear me now? Sorry about that, every single time.'
    ],
    jaTranslations: [
      'ミュートだよ',
      'ミュートのままだって',
      'あのさ、ミュートになってるよ。口動いてるけど聞こえない',
      'うわ、またかよ。今聞こえる？ごめん、毎回やるわこれ。'
    ],
    context: 'The most universal remote work moment. Both languages handle it similarly, but English adds humor because it happens so often. Making it light prevents embarrassment.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: '集中できないんだよね',
    english: [
      'I cannot focus',
      'I am having a hard time focusing at home',
      'Honestly, working from home makes it really hard to stay focused sometimes',
      'Same. I end up doing all my real work after nine PM when the house finally quiets down.'
    ],
    jaTranslations: [
      '集中できない',
      '家だと全然集中できないんだよね',
      '正直、在宅だと集中するのほんとキツい時ある',
      'わかる。結局夜9時以降にガチで仕事するパターンだわ、家が静かになってから。'
    ],
    context: 'Japanese "dekinai" is a clean admission. English paints the scene with distractions -- it turns a complaint into a relatable story. Everyone has the same struggle.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'チャットで送っておきます',
    english: [
      'I will send it in chat',
      'Let me drop that in the chat for you',
      'I will drop the link in the chat so everyone can grab it after the meeting',
      'Perfect, thanks. Can you also post it in the Slack channel so it does not get buried?'
    ],
    jaTranslations: [
      'チャットで送るね',
      'チャットに貼っとくよ',
      '会議後にみんなが見れるようにリンクチャットに貼っとくね',
      '助かる。あとSlackのチャンネルにも貼ってくれない？埋もれると困るから。'
    ],
    context: 'Japanese treats chat as just another channel. English specifies which chat because there are usually five of them running at any given moment. Clarity prevents the "where did you send it?" loop.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'オンオフの切り替えが難しい',
    english: [
      'Hard to switch off',
      'It is hard to draw the line between work and life',
      'The hardest part about remote work is knowing when to stop for the day',
      'So true. I started doing a fake commute -- just a walk around the block at six. It actually helps a lot.'
    ],
    jaTranslations: [
      'オンオフ切り替えムズい',
      '仕事とプライベートの境目がほんとわからなくなる',
      'リモートで一番キツいのは、いつ仕事やめていいかわからんこと',
      'めっちゃわかる。俺は6時にわざと散歩して擬似通勤してるわ。結構効くよ。'
    ],
    context: 'Japanese nails it with "on-off no kirikae." English has no equivalent phrase -- you have to describe the struggle. "Work-life balance" is too corporate; the real talk is about when to close the laptop.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'たまにはオフィス行きたい',
    english: [
      'Miss going to the office sometimes',
      'I kind of miss going into the office every now and then',
      'You know, I actually miss going into the office sometimes, just for the human interaction',
      'Right? I never thought I would say this, but I even miss the small talk by the coffee machine.'
    ],
    jaTranslations: [
      'たまにはオフィス行きたい',
      'たまにオフィス行きたくなるんだよね',
      'たまにオフィス恋しくなるんだよ、人と話したくてさ',
      'わかる。まさかこんなこと言うとは思わなかったけど、コーヒーマシンの前の雑談すら恋しいわ。'
    ],
    context: 'Japanese uses "tamani wa" for that occasional longing. English unpacks it -- you miss the office but not all of it. The specifics are what make it resonate instead of sounding contradictory.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 204,
    japanese: 'Wi-Fi不安定で困ってます',
    english: [
      'My Wi-Fi is acting up',
      'My internet connection has been super flaky today',
      'Sorry about the lag, my Wi-Fi has been really unstable all morning',
      'No worries, we can hear you fine now. Try your phone hotspot if it drops again.'
    ],
    jaTranslations: [
      'Wi-Fi調子悪い',
      'ネット回線が今日マジで不安定で',
      'ラグってごめん、朝からWi-Fiがずっと不安定でさ',
      '大丈夫、今は聞こえてるよ。また切れたらスマホのテザリング試してみ。'
    ],
    context: 'Japanese reports the problem formally. English leads with an apology and what you have already tried. Jumping to "my Wi-Fi is bad" without context sounds like an excuse.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  }
];

const day204Keywords: KeyWord[] = [
  { en: 'WFH', ja: '在宅勤務', pron: 'dub-ul-yoo eff aytch', example: 'I am WFH on Fridays.', note: 'Work From Home -- extremely common abbreviation' },
  { en: 'bandwidth', ja: '余力/帯域', pron: 'BAND-width', example: 'I do not have the bandwidth for another project.', note: 'Used figuratively for personal capacity too' },
  { en: 'async', ja: '非同期', pron: 'AY-sink', example: 'Let us handle this async instead of scheduling a meeting.', note: 'Short for asynchronous -- no real-time interaction needed' },
  { en: 'time zone', ja: '時差', pron: 'tahym zohn', example: 'We need to find a time that works across time zones.', note: 'Constant issue in global remote teams' },
  { en: 'standup', ja: '朝会', pron: 'STAND-up', example: 'We have a daily standup at nine.', note: 'Short daily team meeting, originally meant to be standing' }
];

// ============================================================
// Day 205: Deadlines
// ============================================================

const day205: MasterExpression[] = [
  {
    daySlot: 205,
    japanese: '締め切りに間に合わない',
    english: [
      'Not going to make it',
      'I am not going to make the deadline',
      'I do not think I can make the deadline at this rate',
      'Okay, thanks for flagging it early. What do you need from us to get it across the line?'
    ],
    jaTranslations: [
      '締め切り無理だわ',
      '締め切り間に合わなさそう',
      'このペースだと締め切りに間に合わないと思う',
      'OK、早めに言ってくれて助かる。なんとかするのに何が必要？'
    ],
    context: 'Japanese states the fact. English needs the story -- how hard you tried, where you are now, and what you want to do about it. Just saying "I cannot make it" sounds like you gave up.',
    character: 'takeshi',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '延長できますか',
    english: [
      'Can we push it back?',
      'Any chance we can get an extension on this?',
      'I was wondering if there is any flexibility on the deadline, even a couple of days would help',
      'Let me check with the client. I think we can probably push it to Wednesday -- I will get back to you by noon.'
    ],
    jaTranslations: [
      '延長できない？',
      '締め切り伸ばせたりしない？',
      '締め切り少しでも融通きかないかな、2日でもあると助かるんだけど',
      'クライアントに確認するわ。たぶん水曜まで伸ばせると思う。昼までに返事するよ。'
    ],
    context: 'Japanese asks directly. English wraps it in reasoning -- you need to justify the extension request or it sounds lazy. Mentioning quality as the reason is the golden move.',
    character: 'yuki',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: 'ギリギリ間に合った',
    english: [
      'Just barely made it',
      'I made it by the skin of my teeth',
      'I submitted it with literally two minutes to spare, that was way too close',
      'You are giving me a heart attack. But hey, it is done -- that is what counts. You need a drink.'
    ],
    jaTranslations: [
      'ギリギリだった',
      'マジでギリギリで間に合ったわ',
      '締め切りの2分前に提出した、やばかった',
      '心臓に悪いって。でもまあ終わったんだからOKでしょ。飲みに行こう。'
    ],
    context: 'Girigiri is one of those perfect Japanese words. "By the skin of my teeth" is the closest English gets, but it is a bit old-fashioned. "Just barely" with dramatic details captures the girigiri energy better.',
    character: 'kenji',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '優先順位を決めよう',
    english: [
      'Let us prioritize',
      'We need to figure out what comes first',
      'Before we do anything else, let us sit down and prioritize what actually matters here',
      'Agreed. I think the client deck and the budget are the must-haves. Everything else can wait.'
    ],
    jaTranslations: [
      '優先順位つけよう',
      'まず何から手つけるか決めよう',
      '何やるにしても先に優先順位つけて、本当に大事なのだけやろう',
      'だね。クライアント用の資料と予算が最優先で、あとは後回しでいいと思う。'
    ],
    context: 'Japanese uses the noun "yuusen junni." English turns it into an action -- "prioritize" is both the word and the mindset. Adding specific numbers makes the conversation productive.',
    character: 'lisa',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '残業確定だな',
    english: [
      'Overtime for sure',
      'Looks like I am pulling a late one tonight',
      'There is no way I am leaving on time tonight, I am looking at a solid three hours of overtime',
      'Ugh, that is rough. Want me to grab you a coffee? I am heading to the konbini anyway.'
    ],
    jaTranslations: [
      '残業確定',
      '今日は帰れないやつだわ',
      '今日は定時退社とか絶対無理、3時間は残業だな',
      'うわ、きついね。コーヒー買ってこようか？コンビニ行くし。'
    ],
    context: 'Japanese "kakutei" has that resigned finality. English captures the same resignation but usually with the cause -- without it, you sound like you are just complaining about your workload.',
    character: 'takeshi',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: 'もうちょっと余裕が欲しい',
    english: [
      'Need more breathing room',
      'I wish we had a little more buffer built in',
      'I really wish we had more of a buffer on these deadlines, everything is always so tight',
      'Seriously. Even a two-day cushion would save us so much stress. I will bring it up at the next planning meeting.'
    ],
    jaTranslations: [
      'もっと余裕欲しい',
      'もうちょっとバッファ欲しいんだよね',
      '毎回カツカツすぎて、もうちょっと余裕あるスケジュールにしてほしい',
      'ほんとそれ。2日バッファあるだけで全然違うのに。次の計画会議で言うわ。'
    ],
    context: 'Japanese "yoyuu" covers time, space, and mental room all in one word. English splits it -- "buffer" for time, "breathing room" for pressure, "cushion" for safety margin. Pick the right one for context.',
    character: 'mina',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '間に合わせるために削ろう',
    english: [
      'Let us cut something',
      'We need to trim the scope to hit the deadline',
      'If we want to make this deadline, we are going to have to cut some features',
      'Yeah, I hate to say it, but you are right. Let us keep the core and push the rest to phase two.'
    ],
    jaTranslations: [
      '何か削ろう',
      '締め切りに間に合わせるならスコープ削るしかない',
      '締め切り守りたいなら、機能いくつか削るしかないよ',
      'だよな、言いたくないけど正論だわ。コアだけ残してあとはフェーズ2に回そう。'
    ],
    context: 'Japanese "kezurou" (let us shave it down) is practical and clean. English needs the full pitch -- why cutting is actually the smart move. Frame it as quality, not giving up.',
    character: 'kenji',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '進捗どうですか',
    english: [
      'How is it going?',
      'Where are you at with that?',
      'Hey, just checking in, how is the progress on the report coming along?',
      'Almost there, about eighty percent done. I should have it to you by end of day tomorrow.'
    ],
    jaTranslations: [
      '進捗どう？',
      'あれどこまで進んだ？',
      'ちょっと確認なんだけど、レポートどんな感じ？',
      'もうちょいで終わる、8割くらい。明日中には送れると思う。'
    ],
    context: 'The infamous "shinchoku dou desu ka." In English, you MUST soften it or it sounds like micromanaging. "Just checking in" and "no pressure" are essential buffers.',
    character: 'yuki',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: '無理しないでね',
    english: [
      'Do not push yourself too hard',
      'Take it easy, do not overdo it',
      'Hey, I know the deadline is tight, but do not burn yourself out over this',
      'Thanks, I appreciate that. I will try to wrap up by eight and call it a night.'
    ],
    jaTranslations: [
      '無理すんなよ',
      '無理しないでね、ほどほどにしとけ',
      '締め切りキツいのわかるけど、体壊すなよ',
      'ありがとう、助かる。8時までには切り上げて帰るようにするわ。'
    ],
    context: 'Japanese "muri shinaide" is warm and compact. English unpacks the caring into specific advice -- "go home," "take a break." Without the specifics, "do not push yourself" can sound like empty words.',
    character: 'lisa',
    category: 'feeling',
    month: '2026-10'
  },
  {
    daySlot: 205,
    japanese: 'やっと終わった',
    english: [
      'Finally done',
      'It is finally over, I am free',
      'I just hit submit and I am officially done, what a relief',
      'Nice, you earned it! Go grab a beer and do absolutely nothing tonight.'
    ],
    jaTranslations: [
      'やっと終わった',
      'やっっと終わった、自由だ',
      '提出ボタン押したわ、終わり！やっと解放された',
      'おつかれ！ビール飲んで今夜は何もするな。'
    ],
    context: 'Japanese "yatto" carries that exhausted relief perfectly. English "finally" gets close but needs the emotional follow-up. The celebration plan is what really sells the relief.',
    character: 'takeshi',
    category: 'feeling',
    month: '2026-10'
  }
];

const day205Keywords: KeyWord[] = [
  { en: 'deadline', ja: '締め切り', pron: 'DED-lahyn', example: 'The deadline is this Friday at five PM.', note: 'Hard deadline = no flexibility, soft deadline = some wiggle room' },
  { en: 'crunch time', ja: '追い込み', pron: 'krunsh tahym', example: 'It is crunch time, everyone needs to focus.', note: 'Intense final push before a deadline' },
  { en: 'deliverable', ja: '成果物', pron: 'deh-LIV-er-uh-bull', example: 'The main deliverable is a 20-page report.', note: 'The thing you hand over at the end' },
  { en: 'scope creep', ja: '仕様の膨張', pron: 'skohp kreep', example: 'We need to watch out for scope creep on this project.', note: 'When requirements slowly expand beyond the original plan' },
  { en: 'bottleneck', ja: 'ボトルネック', pron: 'BOT-ul-nek', example: 'The review process is the biggest bottleneck right now.', note: 'The one thing slowing everything else down' }
];

// ============================================================
// Day 206: Trouble Handling
// ============================================================

const day206: MasterExpression[] = [
  {
    daySlot: 206,
    japanese: 'システムが落ちました',
    english: [
      'The system is down',
      'Our system just crashed',
      'Hey, just a heads up, the main system went down about ten minutes ago',
      'Got it. Do we have an ETA on recovery, or should I start telling clients to sit tight?'
    ],
    jaTranslations: [
      'システム落ちた',
      'システムさっき落ちたわ',
      'ちょっと連絡、メインシステムが10分前に落ちた',
      '了解。復旧の目処ある？クライアントにはちょっと待ってもらう感じ？'
    ],
    context: 'Japanese reports it. English reports it AND tells people what to do about it. A system crash without an action plan creates chaos, so you front-load the instructions.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: '原因を調べています',
    english: [
      'Looking into it',
      'We are investigating the root cause right now',
      'The team is investigating the root cause, we should have an update within the hour',
      'Okay, thanks for the heads up. I will hold off on pinging the team until we hear back.'
    ],
    jaTranslations: [
      '原因調査中',
      '今チームで原因調べてるとこ',
      'チームで原因調べてる、1時間以内にはアップデートするから',
      'OK、ありがとう。連絡来るまでチームにはまだ言わないでおくわ。'
    ],
    context: 'Japanese "shirabete imasu" is reassuring. English needs a timeline and a promise to update -- without those, people assume you have no idea and start panicking.',
    character: 'takeshi',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: 'お客様に連絡してください',
    english: [
      'Please contact the client',
      'Can you reach out to the client about this?',
      'I need someone to reach out to the client and let them know what is going on before they hear it from someone else',
      'I will handle it. I have got a good relationship with their PM, so I will give them a call right now.'
    ],
    jaTranslations: [
      'クライアントに連絡して',
      'クライアントに状況伝えてくれる？',
      '誰かクライアントに連絡して、向こうから聞く前にこっちから言おう',
      '俺やるわ。先方のPMとは仲いいから、今すぐ電話する。'
    ],
    context: 'Japanese frames it as instruction. English adds the "why" and the "how" -- especially the proactive angle. Getting ahead of bad news is a universal business principle.',
    character: 'lisa',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: '応急処置しました',
    english: [
      'Applied a quick fix',
      'I put a temporary fix in place for now',
      'I put a Band-Aid on it for now, but we need a proper fix soon',
      'Good enough for now. Let us schedule the real fix for this weekend when traffic is low.'
    ],
    jaTranslations: [
      '応急処置した',
      'とりあえず仮で直しといた',
      '一旦バンドエイド貼っといたけど、ちゃんとした修正は別でやらないと',
      'とりあえずそれでいいわ。本格修正は週末のアクセス少ない時にやろう。'
    ],
    context: 'Japanese "oukyuu shochi" sounds professional. English "Band-Aid fix" captures the temporary nature perfectly and everyone instantly understands it is not the real solution.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: '再発防止策を考えよう',
    english: [
      'Let us prevent this from happening again',
      'We need to figure out how to keep this from happening again',
      'Once we get through this, we need to sit down and figure out how to prevent it from happening again',
      'Absolutely. I will set up a post-mortem for Thursday. Let us get everyone in the room.'
    ],
    jaTranslations: [
      '再発防止策考えよう',
      'これ二度と起きないようにしないと',
      'これ落ち着いたら、再発防止策ちゃんと考えよう',
      'だな。木曜にポストモーテム入れるわ。全員集めよう。'
    ],
    context: 'Japanese has the clean compound "saihatsuu boushi saku." English uses "post-mortem" (yes, like an autopsy) for the analysis meeting. It sounds dramatic but it is standard business English.',
    character: 'lisa',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: 'エスカレーションします',
    english: [
      'I am escalating this',
      'I need to escalate this to management',
      'This is beyond what I can handle, I need to escalate this to the team lead',
      'Good call. I will loop in the director too, just in case. Send me what you have documented so far.'
    ],
    jaTranslations: [
      'エスカレーションする',
      'これ上に上げないと無理だわ',
      '俺のレベルじゃ対処できないから、チームリードにエスカレする',
      '正解。念のため部長にも入ってもらうわ。今までの記録送ってくれ。'
    ],
    context: 'Escalation works in both languages but the nuance is different. In English, you have to make clear you are not ducking responsibility -- you are routing it to the right authority level.',
    character: 'takeshi',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: 'バックアップありますか',
    english: [
      'Do we have a backup?',
      'Please tell me we have a backup somewhere',
      'Do we have a recent backup we can restore from, or are we looking at rebuilding from scratch?',
      'I just checked -- the last backup was at two AM, so we are only missing about six hours of data. Could be worse.'
    ],
    jaTranslations: [
      'バックアップある？',
      'バックアップどっかにあるよね？頼むから',
      '最近のバックアップから復元できる？それともゼロからやり直し？',
      '今確認した。最後のバックアップ朝2時だから、失ったのは6時間分くらい。もっとひどくなくてよかった。'
    ],
    context: 'Japanese asks a yes/no question. English immediately starts thinking about the scenario either way -- backup exists or it does not. This forward-thinking is what keeps things from spiraling.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: '影響範囲を確認して',
    english: [
      'Check how far this goes',
      'We need to assess the full impact of this',
      'Before we do anything else, I need someone to map out exactly what is affected',
      'On it. I will check the API connections and downstream processes and report back in thirty minutes.'
    ],
    jaTranslations: [
      '影響範囲調べて',
      'どこまで影響出てるか確認しないと',
      '何か動く前に、まずどこまで影響出てるか洗い出してくれ',
      '了解。API接続と下流のプロセス確認して、30分で報告するわ。'
    ],
    context: 'Japanese "eikyou hanni" is a compact technical term. English breaks it into specific actions -- check this, check that. The word "ripple" captures how one failure spreads through connected systems.',
    character: 'lisa',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: '状況を報告します',
    english: [
      'Here is the update',
      'Let me give you a quick status update',
      'I want to give everyone a quick status update on where we stand with the issue',
      'Thanks for the update. So we are back to normal now? Any chance this happens again before the permanent fix?'
    ],
    jaTranslations: [
      '状況報告するね',
      '現状のアップデート共有するわ',
      'みんなに今の状況を簡単に共有しとくね',
      'ありがとう。で、もう通常に戻ったってこと？恒久対策前にまた起きる可能性は？'
    ],
    context: 'Japanese "houkoku shimasu" is the start of a formal report. English "status update" signals "here comes important info, listen up." Structure it as: current state, cause, next steps.',
    character: 'takeshi',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 206,
    japanese: 'ご迷惑をおかけしました',
    english: [
      'Sorry for the trouble',
      'I apologize for the inconvenience this caused',
      'I want to sincerely apologize for the disruption and any inconvenience it may have caused',
      'We appreciate you handling it so quickly. These things happen -- just keep us in the loop going forward.'
    ],
    jaTranslations: [
      'ご迷惑おかけしました',
      'ご不便おかけしてすみません',
      '今回のトラブルでご迷惑をおかけして本当に申し訳ないです',
      '迅速に対応してくれて助かったよ。こういうことはあるから、今後も連絡くれれば大丈夫。'
    ],
    context: 'Japanese "gomeiwaku" is a powerful apology word with no direct English match. English corporate apologies follow a formula: sorry, we take it seriously, here is what we are doing, thank you for patience.',
    character: 'yuki',
    category: 'request',
    month: '2026-10'
  }
];

const day206Keywords: KeyWord[] = [
  { en: 'outage', ja: '障害/停止', pron: 'OW-tij', example: 'We experienced a two-hour outage yesterday.', note: 'System unavailability, usually unplanned' },
  { en: 'post-mortem', ja: '振り返り分析', pron: 'pohst MOR-tem', example: 'We need to schedule a post-mortem for the incident.', note: 'Analysis meeting after a problem, borrowed from medicine' },
  { en: 'workaround', ja: '回避策', pron: 'WURK-uh-rownd', example: 'Here is a workaround until the bug is fixed.', note: 'Temporary way to avoid a problem without fixing the root cause' },
  { en: 'downtime', ja: 'ダウンタイム', pron: 'DOWN-tahym', example: 'We need to minimize downtime during the migration.', note: 'Period when a system is unavailable' },
  { en: 'rollback', ja: '切り戻し', pron: 'ROHL-bak', example: 'If anything goes wrong, we can rollback to the previous version.', note: 'Reverting to a previous stable state' }
];

// ============================================================
// Day 207: Teamwork
// ============================================================

const day207: MasterExpression[] = [
  {
    daySlot: 207,
    japanese: 'みんなで協力しよう',
    english: [
      'Let us work together on this',
      'We are all in this together, let us team up',
      'This is a team effort, so let us divide it up and tackle it together',
      'I will take the client-facing slides. Yuki, you want the data analysis part? That is kind of your thing.'
    ],
    jaTranslations: [
      'みんなで協力しよう',
      'チーム一丸でやろう、分担して片付けよう',
      'これチーム戦だから、分けて一緒にやっつけよう',
      '俺クライアント向けのスライドやるわ。ユキ、データ分析やらない？得意でしょ。'
    ],
    context: 'Japanese "kyouryoku" is a rallying cry. English makes it concrete -- who does what. Saying "let us cooperate" without assigning tasks is just a pep talk that leads nowhere.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '助かりました',
    english: [
      'You saved me',
      'That was a huge help, seriously',
      'Honestly, you really saved me back there, I owe you one',
      'Ha, do not even worry about it. You would have figured it out eventually. But yeah, you owe me lunch.'
    ],
    jaTranslations: [
      'マジ助かった',
      'ほんとに助かった、感謝しかない',
      'あの時ほんと救われたわ、一個貸しだな',
      'いいよいいよ。放っといてもどうにかしてたでしょ。まあランチは奢ってもらうけど。'
    ],
    context: 'Japanese "tasukarimashita" is warm but brief. English lands harder when you explain HOW they helped. Specific praise beats generic thanks every time.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '役割分担しましょう',
    english: [
      'Let us split this up',
      'We should divide up the responsibilities',
      'Let us figure out who is doing what so we are not stepping on each other is toes',
      'Good idea. I will claim the budget section -- numbers are kind of my thing. Takeshi, you take the slides?'
    ],
    jaTranslations: [
      '役割分担しよう',
      '誰が何やるか決めよう',
      'お互い被らないように、誰が何やるか先に決めとこう',
      'いいね。俺予算のとこやるわ、数字は得意だから。タケシ、スライドどう？'
    ],
    context: 'Japanese "yakuwari buntan" is organized and neutral. English makes it personal by matching tasks to strengths -- it is not just dividing work, it is optimizing the team.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: 'フィードバックください',
    english: [
      'Give me your feedback',
      'I would love to get your thoughts on this',
      'When you get a chance, could you take a look at this and give me your honest feedback?',
      'Sure, I will take a look after lunch. And yeah, I will be straight with you -- no sugarcoating.'
    ],
    jaTranslations: [
      'フィードバックちょうだい',
      'ちょっと見て感想聞かせてくれない？',
      '時間ある時にこれ見て、正直な感想もらえると助かる',
      'いいよ、昼飯のあと見るわ。遠慮なくストレートに言うからな。'
    ],
    context: 'Japanese asks for feedback politely. English has to specify what kind -- "honest" and "do not hold back" signals you actually want real input, not just a thumbs up.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: 'いいチームだね',
    english: [
      'Great team',
      'We make a pretty good team, huh?',
      'You know what, we make a really solid team when we get in a groove',
      'For real. That meeting could have been a disaster, but we totally nailed it. Team dinner tonight?'
    ],
    jaTranslations: [
      'いいチームだな',
      '俺ら結構いいチームじゃない？',
      'ノってる時のこのチーム、マジでいいなって思うわ',
      'ほんとそれ。あのミーティングやばかったのに完璧に乗り切ったし。今夜チームで飯行かない？'
    ],
    context: 'Japanese keeps it simple and heartfelt. English builds the same feeling by pointing to specific moments that proved the teamwork. Abstract praise is nice; concrete examples stick.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '相談したいことがあります',
    english: [
      'Can I talk to you about something?',
      'I have got something I want to run by you',
      'Hey, do you have a minute? There is something I want to run by you and get your take on',
      'Yeah, of course. Grab a coffee and come find me. I have got like twenty minutes before my next call.'
    ],
    jaTranslations: [
      'ちょっと相談があるんだけど',
      'ちょっと聞いてほしいことがあって',
      'ちょっと時間ある？相談したいことあって、意見聞きたいんだけど',
      'いいよもちろん。コーヒー持っておいで。次の会議まで20分くらいあるから。'
    ],
    context: 'Japanese "soudan" covers both serious and casual consulting. English "run something by you" is the casual version; "I need your advice" is the serious one. Picking the wrong tone sets off alarm bells.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '意見が合わないんだけど',
    english: [
      'We do not see eye to eye',
      'I think we are on different pages here',
      'I respect your view, but I see it differently, can we talk it through?',
      'Fair enough, let us hear it. I am open to changing my mind if the argument is solid.'
    ],
    jaTranslations: [
      '意見合わないんだけど',
      'ちょっと見方違うんだよね',
      '言ってること尊重するけど、俺は違う考えなんだ。話し合えない？',
      'いいよ、聞かせて。ちゃんとした理由があるなら考え変える気あるよ。'
    ],
    context: 'Japanese "iken ga awanai" states disagreement neutrally. English needs careful framing -- "I disagree" can sound confrontational. "I see it differently" opens dialogue instead of closing it.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '任せてください',
    english: [
      'Leave it to me',
      'I have got this, do not worry about it',
      'I will take full responsibility for this part, you can count on me',
      'Awesome, I trust you on this. Just ping me if you hit any roadblocks.'
    ],
    jaTranslations: [
      '任せて',
      '俺に任せて、心配すんな',
      'この部分は俺が全責任持つ、安心しろ',
      'いいね、信頼してるよ。何か詰まったら連絡してくれ。'
    ],
    context: 'Japanese "makasete" is confident and reassuring in one word. English needs to back up the confidence with a plan -- without it, "leave it to me" can sound overconfident or dismissive.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: '手が足りません',
    english: [
      'We are short-handed',
      'We do not have enough people for this',
      'We are stretched too thin right now, we need more hands on this project',
      'I know, I have been trying to get approval for one more person. Let me push harder on that this week.'
    ],
    jaTranslations: [
      '人手足りない',
      'このプロジェクトの人数足りてないよ',
      'リソースカツカツで、このプロジェクトにもっと人必要だわ',
      'わかってる、もう一人の承認取ろうとしてるんだ。今週もっと強く推すわ。'
    ],
    context: 'Japanese "te ga tarimasen" literally means "not enough hands." English "short-handed" is nearly identical! But you still need to explain the consequence -- being short-staffed only matters because of what it affects.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 207,
    japanese: 'お疲れ様でした',
    english: [
      'Good work today',
      'Great job today, everyone',
      'Seriously, good work today everyone, we crushed it',
      'Thanks, boss. That means a lot coming from you. Now who is buying the first round tonight?'
    ],
    jaTranslations: [
      '今日はお疲れ',
      'みんな今日マジでお疲れ',
      'いや、ほんと今日はお疲れ。みんな最高だったよ',
      'ありがとうございます。そう言ってもらえると嬉しいっす。で、今夜の一杯目は誰が奢る？'
    ],
    context: 'The legendary "otsukaresama" -- possibly the most untranslatable Japanese phrase. English has nothing that covers "I acknowledge your effort and fatigue." You have to build the feeling from scratch with specifics.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  }
];

const day207Keywords: KeyWord[] = [
  { en: 'synergy', ja: '相乗効果', pron: 'SIN-er-jee', example: 'There is a real synergy between our two departments.', note: 'Overused in corporate speak but the concept is real' },
  { en: 'delegate', ja: '委任する', pron: 'DEL-uh-gayt', example: 'You need to learn to delegate more tasks.', note: 'Assigning work to others, a key leadership skill' },
  { en: 'brainstorm', ja: 'ブレスト', pron: 'BRAYN-storm', example: 'Let us brainstorm some ideas for the campaign.', note: 'Group idea generation session' },
  { en: 'accountability', ja: '責任感', pron: 'uh-KOWN-tuh-BIL-uh-tee', example: 'We need more accountability in this team.', note: 'Being responsible and answerable for results' },
  { en: 'morale', ja: '士気', pron: 'muh-RAL', example: 'Team morale has been low since the layoffs.', note: 'The general mood and motivation of a group' }
];

// ============================================================
// Day 208: Reporting
// ============================================================

const day208: MasterExpression[] = [
  {
    daySlot: 208,
    japanese: '報告があります',
    english: [
      'I have an update',
      'I have something to report to the team',
      'I wanted to bring everyone up to speed on the latest developments',
      'Go ahead, we are all ears. Keep it short if you can, we have got a packed agenda today.'
    ],
    jaTranslations: [
      '報告あるんだけど',
      'チームに共有したいことがあって',
      'みんなに最新の状況を共有しておきたいんだけど',
      'どうぞ、聞いてるよ。できれば手短にね、今日の議題詰まってるから。'
    ],
    context: 'Japanese "houkoku ga arimasu" signals formal reporting. English "bring up to speed" is the perfect phrase -- it means "get everyone to the same level of information." Sounds natural and professional.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '数字を見てください',
    english: [
      'Look at the numbers',
      'Take a look at these figures for me',
      'I want you to take a close look at these numbers because they tell an interesting story',
      'Interesting. So Kansai is carrying all the growth? What is going on with Tokyo?'
    ],
    jaTranslations: [
      '数字見てくれ',
      'ちょっとこの数字見てくんない？',
      'この数字ちゃんと見てほしいんだけど、面白い話が見えてくるから',
      'へー。関西が成長全部引っ張ってるの？東京はどうなってんの？'
    ],
    context: 'Japanese asks you to look. English tells you what to look FOR. Just saying "look at the numbers" is like handing someone a book without saying which chapter. Guide their eyes.',
    character: 'lisa',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '前回比で改善しています',
    english: [
      'We improved from last time',
      'The numbers are trending up compared to the previous period',
      'Compared to last quarter, we are seeing clear improvement across the board',
      'That is great to hear. Can you send me the breakdown by category? I want to dig into the details.'
    ],
    jaTranslations: [
      '前回より改善してる',
      '前期と比べて数字上がってるよ',
      '前四半期と比べて、全体的にはっきり改善してる',
      'いいニュースだね。カテゴリ別の内訳送ってくれない？もう少し詳しく見たいんだ。'
    ],
    context: 'Japanese uses "zenkai hi" for comparison. English needs the specific numbers -- saying "we improved" without data is an opinion. With data, it is a fact. Always bring receipts.',
    character: 'yuki',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '課題が見えてきました',
    english: [
      'Some issues are emerging',
      'A few challenges are starting to come into focus',
      'As we dig deeper into the data, some clear challenges are starting to emerge',
      'Forty percent drop-off in the second month? That is a big number. What are your ideas for fixing it?'
    ],
    jaTranslations: [
      '課題が見えてきた',
      'いくつか課題がはっきりしてきた',
      'データ掘ってくと、課題がはっきり見えてくるんだよね',
      '2ヶ月目で40%離脱？それデカいな。対策のアイデアある？'
    ],
    context: 'Japanese "kadai ga miete kita" is optimistic -- problems are becoming visible (so we can fix them). English "emerging" carries the same nuance. "Problems" sounds negative; "challenges" sounds fixable.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '結論から言うと',
    english: [
      'Bottom line',
      'To cut to the chase',
      'Let me give you the bottom line first and then walk you through the details',
      'Love it -- hit target and under budget? That is exactly what I wanted to hear. Walk us through the details.'
    ],
    jaTranslations: [
      '結論から言うと',
      '先に結論言っちゃうね',
      '先に結論言うから、そのあと詳細説明するわ',
      '最高じゃん。目標達成で予算内？聞きたかったのそれよ。詳細頼む。'
    ],
    context: 'Japanese "ketsuuron kara iu to" is a classic business opening. English "bottom line" works perfectly in the same spot. "Cut to the chase" is slightly more casual but just as effective.',
    character: 'takeshi',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: 'グラフにまとめました',
    english: [
      'I put it in a chart',
      'I visualized the data in a graph for easier understanding',
      'I put together some charts to make the data easier to digest at a glance',
      'These are really clean, thanks. Can you send me the file after the meeting? I want to zoom in on a few sections.'
    ],
    jaTranslations: [
      'グラフにまとめた',
      'データをグラフにしといた',
      'パッと見でわかるようにグラフ作っといたよ',
      'これ見やすいね、ありがとう。会議後にファイル送ってくれない？何ヶ所か拡大して見たいから。'
    ],
    context: 'Japanese states the action. English previews what the chart shows and how to read it. A chart without a guide is just a picture -- the explanation is what makes it a tool.',
    character: 'mina',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '質問ありますか',
    english: [
      'Any questions?',
      'Does anyone have questions or anything they want to dig into?',
      'I will open it up for questions now, feel free to ask about anything, even if it seems small',
      'Quick question -- what is driving the dip in the third week? Is that seasonal or something else?'
    ],
    jaTranslations: [
      '質問ある？',
      '何か聞きたいこととか深掘りしたいとこある？',
      '質問どうぞ、細かいことでも全然いいから聞いてね',
      'ちょっと質問なんだけど、3週目の落ち込みは何が原因？季節的なもの？'
    ],
    context: 'Japanese "shitsumon arimasu ka" is clean. English benefits from encouragement -- people often hold back questions in meetings. Explicitly saying "even small things" gives permission to ask.',
    character: 'kenji',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '来月の見通しです',
    english: [
      'Here is the outlook for next month',
      'Looking ahead to next month, here is what we are expecting',
      'Let me share the outlook for next month so everyone can plan accordingly',
      'Fifteen percent increase, huh? That is a lot. Send me the staffing plan, I will add my notes by Friday.'
    ],
    jaTranslations: [
      '来月の見通しです',
      '来月の見通し共有するね',
      'みんなが計画立てやすいように来月の見通し共有しとくね',
      '15%増か、結構多いな。人員計画送ってくれたら金曜までにコメントするよ。'
    ],
    context: 'Japanese "mitooshi" is a forecast word. English "outlook" is the direct match, but adding "plan accordingly" turns information into action. A forecast without a response plan is just trivia.',
    character: 'lisa',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '以上です',
    english: [
      'That is all from me',
      'That covers everything on my end',
      'That is everything I have for now, I will hand it over to the next speaker',
      'Great, thanks for the thorough update. Lisa, you are up next with marketing, right?'
    ],
    jaTranslations: [
      '以上です',
      '俺からは以上、次の人どうぞ',
      '俺のほうは全部話したから、次のスピーカーにバトンタッチするわ',
      'ありがとう、しっかりまとまってたよ。リサ、次マーケティングだよね？'
    ],
    context: 'Japanese "ijou desu" is the perfect closer -- two words, done. English needs a graceful handoff. Just stopping abruptly feels awkward, so you signal the end and pass the baton.',
    character: 'takeshi',
    category: 'request',
    month: '2026-10'
  },
  {
    daySlot: 208,
    japanese: '議事録送ります',
    english: [
      'I will send the minutes',
      'I will have the meeting notes out by end of day',
      'I will type up the meeting notes and send them around by end of day so everyone has a record',
      'Awesome, thanks. Can you put the action items at the top? Nobody reads the whole thing anyway.'
    ],
    jaTranslations: [
      '議事録送るね',
      '今日中に議事録まとめて送るわ',
      '議事録まとめて今日中に全員に送るから、記録残しとくね',
      '助かる。アクションアイテム一番上に持ってきてくれない？全部読む人いないから。'
    ],
    context: 'Japanese "gijiroku" is a standard office word. English "minutes" is the formal term, "meeting notes" is the casual version. Adding "action items at the top" shows you know what people actually read (hint: not the whole thing).',
    character: 'yuki',
    category: 'request',
    month: '2026-10'
  }
];

const day208Keywords: KeyWord[] = [
  { en: 'KPI', ja: '重要業績指標', pron: 'kay-pee-eye', example: 'Our main KPI this quarter is customer retention.', note: 'Key Performance Indicator -- the numbers that matter most' },
  { en: 'action item', ja: 'アクションアイテム', pron: 'AK-shun AHY-tem', example: 'Let me list the action items from today is meeting.', note: 'Specific task assigned to someone with a deadline' },
  { en: 'takeaway', ja: 'ポイント/要点', pron: 'TAYK-uh-way', example: 'The main takeaway is that we need to act fast.', note: 'The key message or lesson to remember' },
  { en: 'year-over-year', ja: '前年比', pron: 'yeer-OH-ver-yeer', example: 'Sales are up twenty percent year-over-year.', note: 'Comparison with the same period last year, often abbreviated YoY' },
  { en: 'pipeline', ja: '案件/パイプライン', pron: 'PAHYP-lahyn', example: 'We have several deals in the pipeline.', note: 'Upcoming work or deals in various stages of progress' }
];

// ============================================================
// Day 209: Business Manners
// ============================================================

const day209: MasterExpression[] = [
  {
    daySlot: 209,
    japanese: '名刺をお渡しします',
    english: [
      'Here is my card',
      'Let me give you my business card',
      'Here is my card, it has got all my contact info on it',
      'Thanks, here is mine. Best way to reach me is email, but feel free to connect on LinkedIn too.'
    ],
    jaTranslations: [
      '名刺どうぞ',
      '名刺渡しときますね、連絡先全部載ってます',
      '名刺です、連絡先全部入ってるんで',
      'ありがとう、これ私のです。メールが一番早いけど、LinkedInでも繋がりましょう。'
    ],
    context: 'Meishi exchange is a ritual in Japan with specific rules. English card exchange is super casual -- you basically just hand it over. The real connection happens on LinkedIn now, not with paper.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: '初めてお会いしますね',
    english: [
      'Nice to meet you',
      'Great to finally put a face to the name',
      'It is really great to finally meet you in person after all those emails',
      'Same here! You are exactly how I pictured you from your emails. This is way better than Zoom.'
    ],
    jaTranslations: [
      '初めまして',
      'やっと会えましたね、メールの印象そのままだ',
      'メールでずっとやりとりしてたけど、やっと直接お会いできて嬉しいです',
      'こちらこそ！メールのイメージそのまんまですね。Zoomよりやっぱり直接がいいわ。'
    ],
    context: 'Japanese "hajimete" is clean and formal. English has layers -- "nice to meet you" for strangers, "put a face to the name" for people you have emailed. The second one builds instant rapport.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: '敬語使いすぎかな',
    english: [
      'Am I being too formal?',
      'I wonder if I am coming across as too stiff',
      'Do you think I was too formal in that email? I do not want to seem robotic',
      'A little bit, yeah. Try dropping the "Dear" and just go with "Hi." That alone makes it way more natural.'
    ],
    jaTranslations: [
      '堅すぎかな？',
      'ちょっと堅すぎたかな',
      'あのメール敬語使いすぎたかな？ロボットっぽくなりたくないんだけど',
      'ちょっとね。"Dear"やめて"Hi"にするだけで全然自然になるよ。'
    ],
    context: 'This is the eternal struggle for Japanese English learners. Japanese has built-in formality levels. English relies on word choice and tone instead of grammar -- way harder to get right.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: 'メールの書き方がわからない',
    english: [
      'Not sure how to write this email',
      'I always struggle with the tone in business emails',
      'Every time I write a business email in English, I second-guess every sentence',
      'Honestly, just match whatever tone they use. If they say "Hi," you say "Hi." Do not overthink it.'
    ],
    jaTranslations: [
      'メールの書き方わからん',
      '英語のビジネスメールのトーンいつも迷う',
      '英語でビジネスメール書くたびに、毎回全文迷うんだよね',
      '相手のトーンに合わせとけばいいよ。相手が"Hi"なら"Hi"で返せ。考えすぎるな。'
    ],
    context: 'Japanese email has a clear template everyone follows. English email is the Wild West -- every company and person has their own style. The anxiety is real and completely valid.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: '時間厳守でお願いします',
    english: [
      'Please be on time',
      'Let us make sure everyone is punctual for this one',
      'I want to stress that we need everyone there on time, not fashionably late',
      'Got it, I will be there five minutes early. Do not worry, I am not going to be the one walking in late.'
    ],
    jaTranslations: [
      '時間厳守で',
      'この会議は全員時間通りに来てくれ',
      '今回はマジで時間通りに来て、おしゃれに遅刻とかなしで',
      '了解、5分前に着くようにするわ。遅刻するやつにはならないから安心しろ。'
    ],
    context: 'Japanese punctuality is legendary and the word "jikan genshu" captures the culture. English "punctual" is the word, but you often need to explain why this particular meeting demands it.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: '服装はどうしたらいい？',
    english: [
      'What should I wear?',
      'What is the dress code for this?',
      'Quick question -- what is the dress code for tomorrow is meeting? Business casual or full suit?',
      'Go with a suit to be safe. This client is pretty traditional -- better overdressed than under.'
    ],
    jaTranslations: [
      '何着てけばいい？',
      '明日のドレスコードどんな感じ？',
      'ちょっと聞きたいんだけど、明日の打ち合わせビジカジ？スーツ？',
      '安パイでスーツで行け。あのクライアント結構お堅いから、着すぎのほうがマシ。'
    ],
    context: 'Japanese dress code is usually clear -- suit is the default. English-speaking offices have a whole spectrum from "business formal" to "smart casual" to "whatever." You genuinely need to ask.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: 'お先に失礼します',
    english: [
      'I am heading out',
      'I am going to take off, see you tomorrow',
      'Hey, I am heading out for the day, have a good night everyone',
      'See you tomorrow! Do not worry, we will hold down the fort. Get some rest.'
    ],
    jaTranslations: [
      'お先に失礼します',
      'お先に上がるね、また明日',
      'みんなお先、お疲れ様。いい夜を',
      'お疲れー！大丈夫、あとは任せて。ゆっくり休めよ。'
    ],
    context: 'Another untranslatable Japanese classic. "Osaki ni shitsurei shimasu" apologizes for leaving before others. English has no guilt attached to leaving -- you just announce it and go. The "do not stay late" shows you care.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: 'CCに入れておいてください',
    english: [
      'CC me on that',
      'Make sure to loop me in on that email chain',
      'Could you CC me on that thread? I want to stay in the loop on how it develops',
      'Sure thing. I will add you now. If anything needs your direct input, I will flag it in the subject line.'
    ],
    jaTranslations: [
      'CCに入れといて',
      'そのメールのやりとり、CCに入れといてくれる？',
      'そのスレッドCCに入れてくれない？経緯追っときたいから',
      'りょ、今追加するわ。直接判断必要なやつは件名でわかるようにしとくね。'
    ],
    context: 'CC works the same way, but English adds "loop me in" which means "include me in the information flow." It is warmer than "CC me" and implies you want to be aware, not necessarily involved.',
    character: 'kenji',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: '根回ししておきます',
    english: [
      'I will lay the groundwork',
      'Let me feel things out before the meeting',
      'I am going to have some one-on-one conversations beforehand to get everyone on board',
      'Smart move. If you can get Tanaka-san on board first, the rest will follow. Start with him.'
    ],
    jaTranslations: [
      '根回ししとくわ',
      '会議の前にちょっと探り入れとくよ',
      '事前に一人ずつ話して、全員味方につけとくわ',
      'いいね、それ正解。まず田中さんを味方にしろ、そしたらあとは流れるから。'
    ],
    context: 'Nemawashi is a deeply Japanese concept with no single English word. "Lay the groundwork" and "get buy-in" are the closest phrases. English acknowledges the strategy but does not have a cultural name for it.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 209,
    japanese: 'ホウレンソウ大事だよ',
    english: [
      'Keep me posted',
      'Communication is key -- report, inform, consult',
      'Make sure you keep the team informed at every step, no surprises',
      'Got it, I will make sure to send daily updates. No going quiet, I promise.'
    ],
    jaTranslations: [
      'ホウレンソウ大事だよ',
      'こまめに報連相しろよ',
      '毎ステップちゃんとチームに共有しろ、サプライズは勘弁な',
      '了解、毎日アップデート送ります。音信不通にはなりません、約束します。'
    ],
    context: 'Hourensou (report-inform-consult) is Japan is communication framework in one word. English has no equivalent abbreviation -- you have to spell out the philosophy. "Keep me posted" is the closest casual version.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  }
];

const day209Keywords: KeyWord[] = [
  { en: 'etiquette', ja: 'マナー/礼儀', pron: 'ET-ih-ket', example: 'Business etiquette varies a lot between cultures.', note: 'The unwritten rules of polite behavior in professional settings' },
  { en: 'rapport', ja: '信頼関係', pron: 'ra-POR', example: 'Building rapport with clients takes time.', note: 'A relationship of mutual trust and ease' },
  { en: 'dress code', ja: '服装規定', pron: 'dres kohd', example: 'The dress code is business casual on Fridays.', note: 'Rules about what to wear at work' },
  { en: 'stakeholder', ja: '関係者', pron: 'STAYK-hohl-der', example: 'We need buy-in from all key stakeholders.', note: 'Anyone who has an interest in or is affected by a project' },
  { en: 'buy-in', ja: '賛同/合意', pron: 'BYE-in', example: 'Getting buy-in from the team before launching is crucial.', note: 'Agreement and support from people involved' }
];

// ============================================================
// Day 210: Business Month Graduation
// ============================================================

const day210: MasterExpression[] = [
  {
    daySlot: 210,
    japanese: '今月もお疲れ様',
    english: [
      'Another month in the books',
      'Great work this month, everyone',
      'That is another month wrapped up, and what a month it was',
      'What a ride. I am exhausted but honestly pretty proud of how we handled everything. Same time next month?'
    ],
    jaTranslations: [
      '今月もお疲れ',
      'みんな今月お疲れ様',
      'また1ヶ月終わったな、いやーすごい月だった',
      'いやほんと濃かった。ヘトヘトだけど正直みんなの動き誇らしいわ。来月もよろしく？'
    ],
    context: 'The monthly "otsukaresama" hits different at the end of a tough month. English builds the feeling by listing what happened -- the recap is what gives the words weight.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '成長したなあ',
    english: [
      'You have come so far',
      'I can really see the growth in you this month',
      'Honestly, I have seen real growth in the team this month, and it is not just me being nice',
      'Thanks, that actually means a lot. I did not even realize how much I had improved until you pointed it out.'
    ],
    jaTranslations: [
      '成長したなー',
      '今月みんな確実に伸びたよ',
      '今月チーム全体で成長が見えたよ、お世辞じゃなくてマジで',
      'ありがとう、それ聞けて嬉しい。言われるまで自分がどれだけ上達したか気づかなかった。'
    ],
    context: 'Japanese "seichou shita naa" is reflective and warm. English needs the evidence -- growth claims without examples sound like motivational posters. Show them the before and after.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: 'ビジネス英語って結局慣れだよね',
    english: [
      'Business English just takes practice',
      'At the end of the day, business English is all about getting reps in',
      'The secret to business English is not grammar or vocabulary, it is just putting in the reps',
      'That is so true. I think I have learned more from actual meetings this month than from any textbook.'
    ],
    jaTranslations: [
      'ビジネス英語は結局慣れだよ',
      '結局ビジネス英語って回数こなすしかないんだよね',
      'ビジネス英語の秘訣は文法でも単語でもなくて、ひたすら実戦の数だよ',
      'ほんとそれ。今月のリアルな会議で教科書の何倍も学んだ気がする。'
    ],
    context: 'Japanese "kekkyoku nare" is a truth bomb in two words. English expands the philosophy -- "reps" is the gym metaphor that resonates. Language learning IS muscle memory.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '会議で発言できるようになった',
    english: [
      'I can speak up in meetings now',
      'I have gotten way better at chiming in during meetings',
      'A month ago I could barely open my mouth in meetings, and now I am volunteering opinions',
      'I noticed that! You spoke up like three times in yesterday is meeting. Huge difference from a month ago.'
    ],
    jaTranslations: [
      '会議で発言できるようになった',
      '会議で自分から話せるようになってきた',
      '1ヶ月前は会議で口開くのやっとだったのに、今は自分から意見言えてるもん',
      '気づいてたよ！昨日の会議で3回くらい発言してたでしょ。1ヶ月前と全然違う。'
    ],
    context: 'Japanese describes the ability gained. English tells the story of the transformation -- the mental shift matters as much as the language skill. What changed was the mindset, not the vocabulary.',
    character: 'yuki',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '失敗も勉強だよ',
    english: [
      'Mistakes are part of learning',
      'Every mistake is a lesson if you let it be',
      'I used to hate making mistakes, but now I see them as the fastest way to learn',
      'Ha, remember when I said "pleased to meet you" to someone I had met five times? I will never forget their face.'
    ],
    jaTranslations: [
      '失敗も勉強だよ',
      '失敗は全部学びだと思えばいい',
      '昔はミス大嫌いだったけど、今は一番の近道だと思ってる',
      'あはは、5回会った人に"初めまして"って言った時のこと覚えてる？あの顔忘れられない。'
    ],
    context: 'Japanese "shippai mo benkyou" is a proverb-like comfort. English makes it real with specific cringe moments. Abstract advice is forgettable; embarrassing stories are unforgettable.',
    character: 'takeshi',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '来月の目標を立てよう',
    english: [
      'Let us set goals for next month',
      'Time to set some targets for the month ahead',
      'Before we wrap up, let us each pick one thing we want to nail next month',
      'I will go first. My goal is to lead at least one meeting in English without any notes. Scary, but I am going for it.'
    ],
    jaTranslations: [
      '来月の目標決めよう',
      '来月に向けて目標立てよう',
      '終わる前に、来月それぞれ一つだけ達成したいこと決めよう',
      '俺から行くわ。来月は英語で会議をメモなしで仕切る。怖いけどやる。'
    ],
    context: 'Japanese "mokuhyou wo tateyou" is standard goal-setting language. English adds the "just one" constraint -- it is counterintuitive but focusing on one goal beats spreading yourself across ten.',
    character: 'lisa',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '仕事で使える表現増えたね',
    english: [
      'Your work vocabulary has grown',
      'You have picked up a ton of useful work phrases this month',
      'Think about how many new phrases you can use at work now compared to a month ago',
      'I actually used "scope creep" in a meeting last week and my boss looked impressed. Felt great.'
    ],
    jaTranslations: [
      '仕事で使える語彙が増えましたね。',
      '今月、仕事で使えるフレーズめっちゃ覚えたよね。',
      '1ヶ月前と比べて、仕事で使える表現どんだけ増えたか考えてみ。',
      '先週の会議で"scope creep"って使ったら上司が感心してた。めっちゃ気持ちよかった。',
    ],
    context: 'Japanese states the observation. English proves it by listing the actual phrases -- hearing your own progress spelled out is incredibly motivating. It is not abstract growth, it is countable.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '完璧じゃなくていい',
    english: [
      'You do not have to be perfect',
      'Perfection is not the goal, communication is',
      'Stop trying to be perfect and start trying to be understood, that is all that matters',
      'I needed to hear that. I spend way too much time worrying about my accent when nobody else even notices.'
    ],
    jaTranslations: [
      '完璧でなくて大丈夫です。',
      '完璧じゃなくていい。伝わればそれでOK。',
      '完璧を目指すな、伝わることを目指せ。それだけで十分だから。',
      'それ聞きたかった。アクセントのこと気にしすぎてたけど、周りは誰も気にしてないんだよな。',
    ],
    context: 'Japanese "kanpeki janakute ii" is permission to be imperfect. English drives it home by listing specific insecurities and dismissing each one. It is therapy disguised as language advice.',
    character: 'mina',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: '自信持っていいよ',
    english: [
      'Be confident in yourself',
      'You have every reason to feel confident right now',
      'I want you to walk into work Monday with your head held high, because you earned it',
      'Alright, you are going to make me cry. Seriously though, thanks. I feel way more confident than I did a month ago.'
    ],
    jaTranslations: [
      '自信を持ってください。',
      '今、自信持っていい理由しかないよ。',
      '月曜、胸張って仕事行けよ。それだけのことやったんだから。',
      'やめてよ泣きそうになるじゃん。でもマジありがとう。1ヶ月前と比べたら全然自信ついた。',
    ],
    context: 'Japanese "jishin motte ii yo" gives permission. English paints the picture of confidence -- "walk in with your head held high" is physical and visual. You can almost feel the posture change.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  },
  {
    daySlot: 210,
    japanese: 'また来月会おう',
    english: [
      'See you next month',
      'Same time next month, do not be a stranger until then',
      'That is a wrap for Business Month, see you all when we kick off the next chapter',
      'Can not wait to see what is next. Thanks for everything this month -- see you all soon!'
    ],
    jaTranslations: [
      'また来月お会いしましょう。',
      '来月も同じ時間にね。それまで連絡してこいよ。',
      'ビジネス月間これにて終了！次の章が始まるときにまた会おう。',
      '次何やるか楽しみすぎる。今月ほんとありがとう。みんなまたすぐ会おう！',
    ],
    context: 'Japanese "mata raigetsu" is a simple goodbye. English graduation moments need a final push -- remind them to use what they learned and build excitement for what is coming next.',
    character: 'master',
    category: 'social',
    month: '2026-10'
  }
];

const day210Keywords: KeyWord[] = [
  { en: 'milestone', ja: 'マイルストーン', pron: 'MAHYL-stohn', example: 'Completing this month is a real milestone in your learning.', note: 'A significant achievement or checkpoint' },
  { en: 'proficiency', ja: '熟達度', pron: 'pruh-FISH-un-see', example: 'Your English proficiency has improved dramatically.', note: 'Level of skill or competence in something' },
  { en: 'articulate', ja: '明確に表現する', pron: 'ar-TIK-yoo-layt', example: 'She is very articulate in her presentations.', note: 'Expressing ideas clearly and effectively' },
  { en: 'fluency', ja: '流暢さ', pron: 'FLOO-un-see', example: 'Fluency comes from practice, not from textbooks.', note: 'Ability to speak smoothly and easily' },
  { en: 'wrap up', ja: '締めくくる', pron: 'rap up', example: 'Let us wrap up the meeting with a quick summary.', note: 'To finish or conclude something' }
];

// ============================================================
// Exports
// ============================================================

export const MONTH7_W28_EXPRESSIONS: MasterExpression[] = [
  ...day202,
  ...day203,
  ...day204,
  ...day205,
  ...day206,
  ...day207,
  ...day208,
  ...day209,
  ...day210
];

export const MONTH7_W28_DAY_THEMES: Record<number, {
  title: string;
  titleEn: string;
  category: string;
  scene: string;
  keywords: KeyWord[];
}> = {
  202: { title: '接待', titleEn: 'Business Entertaining', category: 'social', scene: '大事な取引先を居酒屋に招いて接待。料理の注文からお酌まで、気を遣う夜が始まる。', keywords: day202Keywords },
  203: { title: '出張', titleEn: 'Business Trips', category: 'travel', scene: '出張先のホテルで同僚と居酒屋へ。慣れない土地での仕事話と地元の酒が交差する。', keywords: day203Keywords },
  204: { title: 'リモートワーク', titleEn: 'Remote Work', category: 'social', scene: 'リモートワーク組が久々にオフラインで集合。居酒屋で近況報告しながら、在宅の本音が飛び出す。', keywords: day204Keywords },
  205: { title: '締め切り', titleEn: 'Deadlines', category: 'feeling', scene: '納期前夜、チームで駆け込み残業の後に居酒屋へ。疲労と達成感が入り混じるカウンター席。', keywords: day205Keywords },
  206: { title: 'トラブル対応', titleEn: 'Trouble Handling', category: 'request', scene: '仕事でトラブル発生、対応に追われた一日の終わり。居酒屋で愚痴りながら次の手を考える。', keywords: day206Keywords },
  207: { title: 'チームワーク', titleEn: 'Teamwork', category: 'social', scene: 'プロジェクト打ち上げの居酒屋。チームの絆を確認しながら、次の案件の話も出始める。', keywords: day207Keywords },
  208: { title: '報告する', titleEn: 'Reporting', category: 'request', scene: '上司への報告が終わり、居酒屋でホッと一息。報告の裏話を同僚に打ち明ける。', keywords: day208Keywords },
  209: { title: 'ビジネスマナー', titleEn: 'Business Manners', category: 'social', scene: '新入社員を連れて居酒屋へ。名刺交換やお酌のマナーを実践で教える先輩の夜。', keywords: day209Keywords },
  210: { title: '仕事月卒業', titleEn: 'Business Month Graduation', category: 'feeling', scene: 'ビジネス英語月間の最終日。居酒屋で7ヶ月の成長を振り返り、仲間と乾杯する卒業式。', keywords: day210Keywords }
};
