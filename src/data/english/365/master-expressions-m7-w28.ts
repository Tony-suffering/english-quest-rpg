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
      'Right this way, please. We have got a nice quiet table in the back so you can talk business without all the noise. The chef already knows you are coming tonight, so expect something special.'
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
      'I just want to say, I really appreciate you taking the time to come out tonight. I know your schedule is packed, so the fact that you made room for this means a lot to me and the whole team.'
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
      'Seriously, do not even look at the prices. Just order whatever catches your eye. The whole point of tonight is for you to enjoy yourself, so go wild. If you want the wagyu, get the wagyu.'
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
      'I really hope the food here is to your liking. This place is known for their sashimi and the chef sources everything from Tsukiji. I was a little nervous picking the spot, but I think you will be pleasantly surprised.'
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
      'Before we dig in, how about a toast to kick things off properly? I would like to raise my glass to our partnership. It has been a great year working together, and I am looking forward to what is next. Cheers!'
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
      'How about another round? You have barely touched that glass. The sake here is really something -- they have this junmai daiginjo that I think you would love. Or if you want to switch to whisky, they have a solid selection too.'
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
      'I am really glad we got to sit down and chat like this tonight. These conversations are honestly the best part of the job. You get to know someone on a different level outside the office. I feel like I understand your vision a lot better now.'
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
      'Let me call you a car. After all the drinks we have had tonight, you definitely should not be driving. I will have the driver take you straight home, and do not worry about the cost. It is the least we can do.'
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
      'We should definitely do this again soon. Maybe next quarter when things settle down a bit? I know a great Italian place that just opened up near the station. Same vibe as tonight but with an incredible wine list. I will send you the details.'
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
      'I know how busy things are for you right now, especially with the end of quarter coming up. So I really appreciate you carving out time for this. I promise it will be worth it -- we will keep things relaxed tonight and just enjoy some good food and drinks.'
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
      'I have got a business trip to Osaka next week. There is a client meeting on Tuesday and a site visit on Wednesday. I am thinking about staying an extra night so I can hit up some of the local spots. You know any good places around Shinsaibashi?'
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
      'I just booked my flight for next week. Managed to snag a morning departure at a decent price. I will land around noon, so I should have time to drop my bags at the hotel and grab lunch before the afternoon session. Do you need me to book anything for you too?'
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
      'Which hotel did you end up going with? I would recommend somewhere near the station if you can swing it. Last time I stayed at that place by the south exit and it was super convenient. Five-minute walk to the client office, and there are a ton of restaurants around there too.'
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
      'I am leaning towards taking the shinkansen instead of flying. When you factor in the time getting to the airport and going through security, it is honestly about the same. Plus I can work on the train, and I do not have to deal with the whole checked bag situation.'
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
      'I hate filing expense reports. Every single time I end up missing a receipt and have to dig through my bag like a detective. And the system we use is so clunky -- it takes me longer to file the report than the actual trip. Someone needs to automate this already.'
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
      'Things did not go as planned while I was on site. The client changed the meeting room at the last minute, and my presentation would not connect to their projector. Had to wing it with printouts. On top of that, my return train got delayed by two hours because of signal problems.'
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
      'I grabbed some local snacks for the office while I was in Osaka. They had this amazing takoyaki-flavored senbei at the station that I could not pass up. There is enough for everyone, so help yourselves. The green box is matcha cookies -- those are solid too.'
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
      'The constant travel is exhausting. I just got back from Osaka on Friday, and now I have to head to Fukuoka on Monday. I barely had time to do laundry. I love the change of scenery, but the actual moving from place to place? That part I could do without.'
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
      'I am meeting with the local team on-site to go over the project details. It is always better to hash this stuff out face to face instead of going back and forth over email. Plus I want to see the actual workspace and get a feel for how things are running on the ground.'
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
      'Would it be okay if I head straight home from the station instead of coming back to the office? My train gets in around seven, and by the time I get to the office it will be past eight. I can log in from home if anything urgent comes up, but honestly I am pretty beat from the trip.'
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
      'Hey, just a heads up, I am working from home today. I will be online the whole time though, so just ping me on Slack if you need anything. My calendar is up to date, and I have got my camera ready if anything comes up that needs a quick call.'
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
      'Hey, would you mind flipping your camera on? I know it is a hassle, but for this kind of discussion it really helps to see everyone is faces. I find we get through things faster when we can read the room. No pressure if your background is messy though, just use a blur.'
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
      'Sorry to interrupt, but your audio has been cutting in and out for the last minute or so. We only caught about half of what you said. Could you try reconnecting? Or if that does not work, maybe switch to your phone audio. We will wait for you.'
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
      'Give me one second, I am going to share my screen so everyone can follow along. Let me just close my email first... okay, can everyone see the spreadsheet? I am going to walk you through the numbers starting from the top left. Stop me if anything looks off.'
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
      'Hey, just so you know, you are on mute. We can see your lips moving but there is no audio coming through. There you go, now we can hear you. No worries, happens to everyone at least once a day. Go ahead and start over from the top.'
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
      'Honestly, working from home makes it really hard to stay focused sometimes. The couch is right there, the fridge is calling my name, and my neighbor decided today was the perfect day to mow the lawn. I end up doing my best work after nine PM when everything finally quiets down.'
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
      'I will drop the link in the chat so everyone can grab it after the meeting. Actually, let me also post it in the project channel on Slack so it does not get buried. If you have any questions after you look through it, just tag me and I will get back to you within the hour.'
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
      'The hardest part about remote work is knowing when to stop for the day. When your office is your living room, there is no commute to signal that work is over. I have started shutting my laptop at six sharp and going for a walk. It is my fake commute home, and it actually works.'
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
      'You know, I actually miss going into the office sometimes. Not the commute, obviously, but just being around people. Having lunch together, overhearing random conversations, even the small talk by the coffee machine. You do not realize how much of that stuff matters until it is gone.'
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
      'Sorry about the lag, my Wi-Fi has been really unstable all morning. I have already restarted the router twice but it keeps dropping out. If I suddenly disappear from the call, that is why. I might switch to my phone hotspot as a backup. Bear with me here.'
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
      'I do not think I can make the deadline at this rate. I have been at it since seven this morning and I am still only about sixty percent done. The scope was bigger than we estimated. I need to flag this now so we can figure out a plan B before it becomes a real problem.'
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
      'I was wondering if there is any flexibility on the deadline. Even pushing it back by two or three days would make a huge difference in the quality of the deliverable. I would rather ask now than rush it and hand in something half-baked. What do you think?'
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
      'I submitted it with literally two minutes to spare. My hands were shaking when I hit send. I do not want to cut it that close ever again. The last hour was pure adrenaline -- I was proofreading and formatting at the same time. But hey, it is done. I need a drink.'
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
      'Before we do anything else, let us sit down and prioritize what actually matters here. We have got five things on the list and we can realistically finish three by Friday. So which three are the must-haves, and which two can we push to next week? I do not want us spinning our wheels on the wrong stuff.'
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
      'There is no way I am leaving on time tonight. I am looking at a solid three hours of overtime at least. The client dropped a revision request at four PM -- who does that? I am going to need some serious coffee and probably a convenience store dinner. This is going to be a long night.'
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
      'I really wish we had more of a buffer on these deadlines. Everything is always so tight that one unexpected thing throws the whole schedule off. If we could build in even a two-day cushion, we would have room to handle surprises without everyone panicking. That is not lazy, that is just smart planning.'
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
      'If we want to make this deadline, we are going to have to cut some features. I know nobody likes hearing that, but trying to do everything is how we end up with a mediocre product shipped late. Let us nail the core features first and add the nice-to-haves in phase two. Quality over quantity.'
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
      'Hey, just checking in. How is the progress on the report coming along? No pressure, I am just trying to get a sense of where things stand so I can update the client. If you are running behind, that is totally fine, just let me know and we will figure something out together.'
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
      'Hey, I know the deadline is tight, but do not burn yourself out over this. Your health matters more than any deliverable. If you need to take a break, take a break. We will figure out the rest as a team. Seriously, go home at a reasonable hour tonight. The work will still be there tomorrow.'
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
      'I just hit submit and I am officially done. What a relief. I have been staring at that document for three days straight and I never want to see it again. Time to celebrate -- I am thinking takeout, a cold beer, and absolutely nothing productive for the rest of the night. I earned it.'
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
      'Hey, just a heads up, the main system went down about ten minutes ago. The engineering team is already on it, but we do not have an ETA for recovery yet. In the meantime, we cannot process any orders, so if clients call in, let them know we are aware and working on it.'
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
      'The team is investigating the root cause right now. Our initial look suggests it might be a database issue, but we are not one hundred percent sure yet. We should have a clearer picture within the hour. I will send out an update as soon as we know more. Hang tight.'
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
      'I need someone to reach out to the client and let them know what is going on before they hear it from someone else. Be upfront about the situation, give them a timeline, and make sure they know we are taking it seriously. It is always better to be the one delivering the news than having them find out on their own.'
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
      'I put a Band-Aid on it for now so things are running again, but this is not a permanent solution. The underlying issue is still there, and if we do not address it properly, it is going to come back. I would recommend scheduling a proper fix for this weekend when traffic is low.'
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
      'Once we get through this, we need to sit down and figure out how to prevent it from happening again. I do not want us just putting out fires every time. Let us do a proper post-mortem, identify what went wrong, and build in safeguards. If the same issue hits us twice, that is on us.'
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
      'This is beyond what I can handle on my own. I need to escalate this to the team lead and possibly the director. I am not trying to pass the buck, but this requires a decision above my pay grade. I have documented everything so far, so whoever takes over will have full context.'
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
      'Do we have a recent backup we can restore from, or are we looking at rebuilding from scratch? I am checking the backup logs now, but I want to make sure someone else also looks. If the last backup is from more than twenty-four hours ago, we are going to have some data recovery to deal with.'
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
      'Before we do anything else, I need someone to map out exactly what is affected. Is it just this one module, or did it ripple out to other systems? Check the API connections, the downstream processes, and anything that touches this database. I do not want any surprises popping up tomorrow.'
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
      'I want to give everyone a quick status update on where we stand. The system has been restored and is running normally as of three PM. The root cause was a memory overflow in the batch processing module. We have applied a patch, and the engineering team will deploy a permanent fix by end of week.'
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
      'I want to sincerely apologize for the disruption and any inconvenience it may have caused. We take this seriously, and we are putting measures in place to make sure it does not happen again. Thank you for your patience while we worked through this. If you have any lingering issues, please do not hesitate to reach out.'
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
      'This is a team effort, so let us divide it up and tackle it together. No one should be carrying this alone. I will take the data analysis portion, and if someone can handle the client-facing slides, we will be in good shape. Who wants to take what?'
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
      'Honestly, you really saved me back there. I was completely stuck on the formatting and your suggestion fixed everything in ten minutes. That would have taken me hours to figure out on my own. I owe you one -- next time you are in a jam, I have got your back.'
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
      'Let us figure out who is doing what so we are not stepping on each other is toes. I will put together a quick task list and we can each claim the parts that play to our strengths. Yuki, you are great with numbers, so maybe you take the budget section? And Takeshi, you are the presentation wizard.'
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
      'When you get a chance, could you take a look at this and give me your honest feedback? I am not looking for compliments -- I need to know what is not working. If something feels off or confusing, tell me straight. I would rather fix it now than find out after the client sees it.'
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
      'You know what, we make a really solid team when we get in a groove. Everyone brought something different to the table today, and it all just clicked. That meeting could have been a disaster, but because we had each other is backs, it went smoothly. We should do team dinners more often.'
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
      'Hey, do you have a minute? There is something I want to run by you and get your take on. It is not urgent, but I have been going back and forth on the approach for the new proposal and I trust your judgment. Sometimes I just need to talk it through with someone to figure out what I actually think.'
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
      'I respect your view, but I see it differently, and I think we should talk it through. I am not trying to shoot down your idea -- I just want to make sure we have considered all the angles before we commit. Can we lay out the pros and cons side by side and decide together?'
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
      'I will take full responsibility for this part, you can count on me. I already have a pretty clear picture of how to approach it, and I should be able to have a draft ready by Thursday. If anything comes up that I cannot handle, I will let you know right away. But honestly, I feel good about this one.'
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
      'We are stretched too thin right now. The three of us are doing the work of five, and it is starting to show in the quality. I do not want to complain, but I think we need to either bring in more people or push back on the timeline. Something has to give.'
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
      'Seriously, good work today everyone, we absolutely crushed it. That was not an easy one, and the fact that we pulled it off says a lot about this team. Take a breath tonight, you all earned it. I will bring coffee tomorrow morning as a small thank you. You guys are the best.'
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
      'I wanted to bring everyone up to speed on the latest developments. A few things have changed since our last meeting, and I want to make sure we are all on the same page before we move forward. I will keep this brief -- three main points, and then we can open it up for questions.'
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
      'I want you to take a close look at these numbers because they tell an interesting story. Revenue is up twelve percent compared to last quarter, but if you look at the breakdown by region, the growth is coming almost entirely from the Kansai area. Tokyo is actually flat. That is something we need to dig into.'
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
      'Compared to last quarter, we are seeing clear improvement across the board. Customer satisfaction is up by eight points, response times are down by fifteen percent, and we had zero critical incidents this month. The changes we implemented in January are clearly paying off. Here is the breakdown by category.'
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
      'As we dig deeper into the data, some clear challenges are starting to emerge. The biggest one is customer retention in the thirty to sixty day window. We are great at getting people in the door, but we are losing about forty percent of them within the second month. I have got a few ideas on how to address this.'
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
      'Let me give you the bottom line first and then walk you through the details. We hit our target. Revenue came in at a hundred and five percent of plan, and we did it while staying under budget. Now, that is the headline. There is a lot of nuance underneath, so let me break it down for you.'
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
      'I put together some charts to make the data easier to digest at a glance. The blue bars are this year, gray is last year. You can immediately see where we are outperforming and where we are lagging. I will send the file after the meeting so you can zoom in on whichever sections are relevant to your team.'
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
      'I will open it up for questions now. Feel free to ask about anything, even if it seems small. Sometimes the small details are the ones that matter most. If you think of something later, you can always ping me on Slack. I would rather answer ten questions now than have people guessing later.'
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
      'Let me share the outlook for next month so everyone can plan accordingly. We are expecting a fifteen percent increase in volume due to the seasonal campaign. That means all hands on deck for the first two weeks. I have already drafted a staffing plan, but I want your input before I finalize it.'
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
      'That is everything I have for now. If anything comes up between now and the next meeting, I will send a quick update via email. Otherwise, I will hand it over to Lisa for the marketing update. Thanks for your time and attention, everyone.'
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
      'I will type up the meeting notes and send them around by end of day so everyone has a record. I will highlight the action items at the top so you do not have to read through the whole thing to find your to-dos. If I missed anything or got something wrong, just reply and I will update it.'
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
      'Here is my card. It has got my email, phone number, and LinkedIn on there. The best way to reach me is usually email -- I check it constantly. If something is urgent though, do not hesitate to call. I will shoot you a connection request on LinkedIn later today as well.'
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
      'It is really great to finally meet you in person after all those emails. I feel like I already know you from our conversations, but it is always different face to face. You are exactly how I imagined, by the way -- I mean that as a compliment. Thanks for making the time to come in today.'
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
      'Do you think I was too formal in that email? I do not want to seem robotic or cold. In Japanese I know exactly how to calibrate my politeness level, but in English I never know where the line is. Some people say I sound like a textbook, and others say I sound too casual. I cannot win.'
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
      'Every time I write a business email in English, I second-guess every sentence. Is "Dear Mr. Tanaka" too formal? Is "Hi Ken" too casual? Do I need "I hope this email finds you well" or is that outdated? And do not even get me started on how to end it. "Best regards"? "Cheers"? "Thanks"? The options are paralyzing.'
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
      'I want to stress that we need everyone there on time for this one. The client is known for starting exactly on the dot, and walking in late would not make a great impression. Plan to arrive five minutes early if possible. It is better to wait in the lobby than to rush in after things have started.'
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
      'Quick question -- what is the dress code for tomorrow is meeting? I do not want to show up in a full suit if everyone else is in polo shirts, but I also do not want to be underdressed. Last time I went casual and the client was in a three-piece suit. That was awkward. Better to ask and be safe.'
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
      'Hey, I am heading out for the day. If anything comes up, I will have my phone on me for the next hour or so. Otherwise, I will tackle it first thing tomorrow morning. Have a good night everyone, and do not stay too late yourselves. See you tomorrow.'
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
      'Could you CC me on that thread? I want to stay in the loop on how it develops. I do not need to be involved in every reply, but I want to have visibility in case the client asks me about it. If anything needs my direct input, just flag it in the subject line so I do not miss it.'
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
      'I am going to have some one-on-one conversations beforehand to get everyone on board. It is always smoother when people are not hearing the proposal for the first time in the meeting. If I can get buy-in from the key stakeholders ahead of time, the actual meeting becomes a formality.'
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
      'Make sure you keep the team informed at every step. No surprises. If something changes, say something. If you are stuck, ask for help. If you finished something, let people know. The worst thing you can do is go quiet for three days and then drop a bombshell on Friday. Communication is the foundation.'
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
      'That is another month wrapped up, and what a month it was. We dealt with system crashes, tight deadlines, business trips, and somehow came out the other side still standing. I am proud of every single one of you. Take a deep breath, because you have earned the weekend. Same time, same place next month.'
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
      'Honestly, I have seen real growth in the team this month, and I am not just saying that. The way you handled that client crisis was nothing like how it would have gone three months ago. You stayed calm, communicated clearly, and solved it. That is not luck, that is skill. You should be proud.'
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
      'The secret to business English is not grammar or vocabulary. It is just putting in the reps. Every email you write, every meeting you sit through, every presentation you fumble through -- that is all practice. Nobody starts out sounding polished. The people who sound natural now were awkward once too. Keep going.'
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
      'A month ago I could barely open my mouth in meetings, and now I am volunteering opinions like it is nothing. The trick was realizing that nobody expects you to be perfect. Half the native speakers in the room say "um" and "uh" just as much as I do. Once I stopped judging myself, the words just started flowing.'
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
      'I used to hate making mistakes, but now I see them as the fastest way to learn. That time I accidentally replied-all to the whole company? Painful. But I never made that mistake again. The time I used the wrong honorific in a meeting? Embarrassing. But now I know the difference. Your worst moments become your best teachers.'
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
      'Before we wrap up, let us each pick one thing we want to nail next month. Just one -- not ten. If your goal is to lead a meeting in English, commit to that. If it is to write emails without Google Translate, go for it. Small, specific, measurable. That is how real progress happens.'
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
      'Think about how many new phrases you can use at work now compared to a month ago. "Bring up to speed," "loop me in," "cut to the chase," "scope creep" -- these are not textbook words, they are real words that real people use in real offices. That is the kind of English that actually matters.'
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
      'Stop trying to be perfect and start trying to be understood. That is all that matters. Your accent? Does not matter. Your grammar? Good enough. The fact that you sometimes pause to find the right word? Totally normal, even native speakers do it. Communication is about connection, not perfection.'
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
      'I want you to walk into work Monday with your head held high, because you earned it. You can handle a business meeting. You can write a professional email. You can deal with a crisis in English. A month ago, those things felt impossible. Now they are just Tuesday. That is not nothing -- that is everything.'
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
      'That is a wrap for Business Month. It has been one of the most practical months yet, and I hope you are walking away with phrases you will actually use this week. Do not wait until next month to practice -- use what you learned starting tomorrow. See you all when we kick off the next chapter. Take care.'
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
