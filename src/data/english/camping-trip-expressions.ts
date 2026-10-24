/**
 * The Camping Trip Expressions -- casual expressions from The Camping Trip scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Hank(46M), Sandra(44F), Logan(15M), Ruby(9F), Ranger Dawn(38F),
 *   Uncle Dale(50M)
 */

export interface CampingTripExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const CAMPING_TRIP_EXPRESSIONS: CampingTripExpression[] = [
    // ============================================================
    // DAY 1 -- SETTING UP CAMP (15 expressions)
    // ============================================================
    { expression: "gather round", meaning: "集まって", meaningEn: "calling people to come close together", day: 1, speaker: "Hank", example: "Okay, family, gather round. This is a four-season, eight-pole tent." },
    { expression: "tops", meaning: "長くても", meaningEn: "saying an amount is the maximum, at most", day: 1, speaker: "Hank", example: "We will have this up in fifteen minutes, tops." },
    { expression: "zero bars", meaning: "電波ゼロ本", meaningEn: "having no cell phone signal at all", day: 1, speaker: "Logan", example: "There is no signal. Zero bars." },
    { expression: "that's the point", meaning: "それが意味なの", meaningEn: "saying the thing being complained about is intentional", day: 1, speaker: "Sandra", example: "That's sort of the point of camping, sweetheart. We came to unplug." },
    { expression: "against my will", meaning: "意思に反して", meaningEn: "saying something was done to you without consent", day: 1, speaker: "Logan", example: "Nobody asked to be unplugged. I was unplugged against my will." },
    { expression: "I love it here", meaning: "ここ大好き", meaningEn: "expressing delight about a place", day: 1, speaker: "Ruby", example: "I LOVE it here. There's a beetle on that rock and I named him Gerald." },
    { expression: "you want my honest opinion", meaning: "正直な意見が欲しいか", meaningEn: "offering candid (often unwanted) advice", day: 1, speaker: "Uncle Dale", example: "You want my honest opinion, Hank? Put the bag down. Walk away." },
    { expression: "did you bring anything useful", meaning: "何か役立つもの持ってきた", meaningEn: "sarcastically asking if someone contributed anything", day: 1, speaker: "Hank", example: "Did you bring anything useful, or just the cooler?" },
    { expression: "I packed for fun", meaning: "楽しむために荷造りした", meaningEn: "explaining your relaxed approach to preparing", day: 1, speaker: "Uncle Dale", example: "I packed for fun. You packed for war." },
    { expression: "just doing my rounds", meaning: "見回りの途中で", meaningEn: "explaining you're making routine patrol checks", day: 1, speaker: "Ranger Dawn", example: "Afternoon, folks. Just doing my rounds." },
    { expression: "be smart with the food", meaning: "食料を賢く扱って", meaningEn: "advising someone to store food carefully", day: 1, speaker: "Ranger Dawn", example: "Just be smart with the food and you'll never see him." },
    { expression: "let's hope you don't", meaning: "見ないことを祈りましょう", meaningEn: "hoping a risky thing won't happen", day: 1, speaker: "Ranger Dawn", example: "Can I see the bear? -- Let's hope you don't, kiddo." },
    { expression: "there's weather coming in", meaning: "天気が崩れる", meaningEn: "warning that a storm is on the way", day: 1, speaker: "Ranger Dawn", example: "There's weather coming in tomorrow night. Stake that tent down good." },
    { expression: "got it", meaning: "了解", meaningEn: "confirming you understood an instruction", day: 1, speaker: "Hank", example: "Staked down good. Got it. I'll stake it down so good." },
    { expression: "this is going to be a trip", meaning: "とんでもない旅になる", meaningEn: "joking that an experience will be eventful and wild", day: 1, speaker: "Sandra", example: "We already have a bear, a storm, and a beetle. This is going to be a trip." },

    // ============================================================
    // DAY 2 -- THE HIKE (15 expressions)
    // ============================================================
    { expression: "everybody's got water", meaning: "みんな水持った", meaningEn: "checking that everyone has supplies", day: 2, speaker: "Hank", example: "Everybody's got water? Sunscreen?" },
    { expression: "it's all I brought", meaning: "持ってきたのこれだけ", meaningEn: "explaining you have no other option packed", day: 2, speaker: "Logan", example: "They're slides, Dad, and they're all I brought." },
    { expression: "try and keep up", meaning: "ついてこられる", meaningEn: "playfully challenging others to match your pace", day: 2, speaker: "Ruby", example: "Try and keep up, slowpokes!" },
    { expression: "stay where we can see you", meaning: "見える範囲にいて", meaningEn: "telling a child to remain in sight", day: 2, speaker: "Sandra", example: "Ruby, stay where we can see you." },
    { expression: "how far did you say it was", meaning: "距離どのくらいって言ったっけ", meaningEn: "asking someone to repeat a distance, usually while tired", day: 2, speaker: "Uncle Dale", example: "How far did you say this was again?" },
    { expression: "I peak in short bursts", meaning: "短い爆発でピークが来る", meaningEn: "joking that you only have brief energy", day: 2, speaker: "Uncle Dale", example: "I'm a sprinter, not a marathon guy. I peak in short bursts." },
    { expression: "you're making good time", meaning: "いいペースね", meaningEn: "saying someone is progressing quickly", day: 2, speaker: "Ranger Dawn", example: "Morning, family. You're making good time." },
    { expression: "I meant what I said", meaning: "本気で言った", meaningEn: "emphasizing that an earlier warning was serious", day: 2, speaker: "Ranger Dawn", example: "I meant what I said about tonight. That storm's no joke." },
    { expression: "I'm not gonna lie", meaning: "嘘つかない", meaningEn: "prefacing an honest, often grudging, admission", day: 2, speaker: "Logan", example: "That view is actually kind of insane. I'm not gonna lie." },
    { expression: "what's the point", meaning: "何の意味があるんだ", meaningEn: "questioning the value of doing something", day: 2, speaker: "Logan", example: "No signal. What's the point of a view I can't post." },
    { expression: "that's so corny", meaning: "くっさいセリフ", meaningEn: "calling something cheesy or overly sentimental", day: 2, speaker: "Logan", example: "...That's so corny. But also, fine. It's a good view." },
    { expression: "I'll allow it", meaning: "認めてやる", meaningEn: "grudgingly granting approval to something", day: 2, speaker: "Logan", example: "It's a good view. I'll allow it." },
    { expression: "did you see me", meaning: "見てた", meaningEn: "excitedly asking someone to confirm they watched you", day: 2, speaker: "Ruby", example: "I beat everybody! Even the ranger! Did you see me, did you see me?" },
    { expression: "slow down on the wet rocks", meaning: "濡れた岩では速度を落として", meaningEn: "warning someone to be careful on slippery ground", day: 2, speaker: "Ranger Dawn", example: "Maybe slow down on the wet rocks near the edge, though, okay?" },
    { expression: "I'd call this a win", meaning: "これは勝ちと呼ぶ", meaningEn: "judging a situation a success despite problems", day: 2, speaker: "Sandra", example: "Nobody on a phone. I'd call this a win, storm or no storm." },

    // ============================================================
    // DAY 3 -- THE STORM (15 expressions)
    // ============================================================
    { expression: "wake up", meaning: "起きて", meaningEn: "urgently rousing someone from sleep", day: 3, speaker: "Sandra", example: "Hank. Hank, wake up. I felt a drop." },
    { expression: "it's rated for this", meaning: "これに耐える仕様だ", meaningEn: "claiming equipment is built to handle the situation", day: 3, speaker: "Hank", example: "It's the four-season tent. It's rated for this." },
    { expression: "this is the best night of my life", meaning: "人生で最高の夜", meaningEn: "a child's wildly overexcited reaction", day: 3, speaker: "Ruby", example: "There's a river in the tent! This is the best night of my entire life!" },
    { expression: "I told you we should've", meaning: "～すべきだって言ったのに", meaningEn: "reminding someone you predicted this problem", day: 3, speaker: "Logan", example: "Dad, I told you we should've checked the weather app." },
    { expression: "everybody grab a corner", meaning: "全員角をつかめ", meaningEn: "rallying people to hold something down together", day: 3, speaker: "Hank", example: "Everybody grab a corner. We are not losing this tent." },
    { expression: "if morale is low", meaning: "士気が低いなら", meaningEn: "jokingly offering comfort when spirits drop", day: 3, speaker: "Uncle Dale", example: "What do you need? I have marshmallows if morale is low." },
    { expression: "hold it up so I can see", meaning: "見えるように上に掲げて", meaningEn: "asking someone to position a light for you", day: 3, speaker: "Sandra", example: "Grab the flashlight and hold it up so Hank can see the pole." },
    { expression: "the ground's too soft", meaning: "地面が柔らかすぎる", meaningEn: "explaining why a stake won't hold", day: 3, speaker: "Hank", example: "The ground's too soft, the stake won't -- Logan, sit on the cooler." },
    { expression: "the lowest moment of my life", meaning: "人生のどん底", meaningEn: "dramatically describing a miserable moment", day: 3, speaker: "Logan", example: "This is the lowest moment of my life and I'm weirdly kind of laughing." },
    { expression: "when things are scary you sing", meaning: "怖いときは歌う", meaningEn: "a child's coping wisdom for fear", day: 3, speaker: "Ruby", example: "We should sing! When things are scary you sing!" },
    { expression: "just hum and look confident", meaning: "ハミングして自信ありげにしてりゃいい", meaningEn: "joking advice for faking it when you don't know the words", day: 3, speaker: "Uncle Dale", example: "If you don't know the words, just hum and look confident." },
    { expression: "I cannot believe we're doing this", meaning: "こんなことしてるなんて信じられない", meaningEn: "amazed disbelief at an absurd situation you're in", day: 3, speaker: "Sandra", example: "I cannot believe we're singing in a flooding tent at three in the morning." },
    { expression: "we held the line", meaning: "守り抜いた", meaningEn: "triumphantly saying you defended against something", day: 3, speaker: "Hank", example: "We're not gonna drown tonight, gang. We held the line." },
    { expression: "I've got the hang of it now", meaning: "もうコツつかんだ", meaningEn: "saying you've learned how to do something", day: 3, speaker: "Logan", example: "If we did, I'd be on cooler duty. I've got the hang of it now." },
    { expression: "the closest this family has felt", meaning: "家族が一番近づいた", meaningEn: "noting a rare moment of deep family connection", day: 3, speaker: "Sandra", example: "This is somehow the closest this family has felt in a year." },

    // ============================================================
    // DAY 4 -- THE BEAR (15 expressions)
    // ============================================================
    { expression: "be so quiet", meaning: "すっごく静かに", meaningEn: "urgently telling people to be very quiet", day: 4, speaker: "Ruby", example: "Be quiet. Be SO quiet. The bear is here." },
    { expression: "nobody panics", meaning: "誰もパニックにならない", meaningEn: "telling a group to stay calm in danger", day: 4, speaker: "Hank", example: "Okay, nobody panics, nobody runs." },
    { expression: "in my defense", meaning: "弁解させてもらうと", meaningEn: "prefacing an excuse for something you did wrong", day: 4, speaker: "Uncle Dale", example: "...Okay, so, in my defense, I got hungry around midnight." },
    { expression: "she said it one time", meaning: "一度言った", meaningEn: "exasperated that a single clear rule was ignored", day: 4, speaker: "Hank", example: "Dale. The ranger said it ONE time. One rule. Food in the bear box." },
    { expression: "step back", meaning: "下がって", meaningEn: "telling people to move away from danger", day: 4, speaker: "Ranger Dawn", example: "Step back to the picnic table, nice and calm, all of you." },
    { expression: "this one's on me", meaning: "これは俺のせいだ", meaningEn: "taking responsibility for a mistake", day: 4, speaker: "Uncle Dale", example: "This one's on me. I own it. I let a bear eat the marshmallows." },
    { expression: "I own it", meaning: "認める", meaningEn: "fully accepting responsibility for something", day: 4, speaker: "Uncle Dale", example: "This one's on me. I own it." },
    { expression: "I will remind you of it", meaning: "思い出させる", meaningEn: "threatening to never let someone forget a blunder", day: 4, speaker: "Hank", example: "You'll carry it because I will remind you of it. Every Thanksgiving." },
    { expression: "for what it's worth", meaning: "一応言っておくと", meaningEn: "offering a comment you hope is somewhat helpful", day: 4, speaker: "Ranger Dawn", example: "For what it's worth, you handled it well once it counted." },
    { expression: "once it counted", meaning: "いざというとき", meaningEn: "at the moment that actually mattered", day: 4, speaker: "Ranger Dawn", example: "You handled it well once it counted. Nobody ran, nobody screamed." },
    { expression: "to make up for it", meaning: "埋め合わせに", meaningEn: "offering to compensate for a mistake", day: 4, speaker: "Uncle Dale", example: "Okay, to make up for the bear thing -- tonight, around the fire, I'm telling the story." },
    { expression: "or is it gonna be like", meaning: "それとも～みたいになるの", meaningEn: "teasingly doubting something will be different from a past failure", day: 4, speaker: "Logan", example: "Is it actually scary or is it gonna be like your hiking, where you give up halfway?" },
    { expression: "this one I finish", meaning: "これは最後までやる", meaningEn: "insisting you'll complete this one for sure", day: 4, speaker: "Uncle Dale", example: "Oh, this one I finish. This one I've been telling for thirty years." },
    { expression: "nobody sleeps", meaning: "誰も眠れない", meaningEn: "predicting something will keep everyone awake", day: 4, speaker: "Uncle Dale", example: "By the end of it, nobody sleeps. Including me." },
    { expression: "best trip ever", meaning: "人生最高の旅", meaningEn: "a child declaring something the greatest", day: 4, speaker: "Ruby", example: "A bear AND a ghost story in one day? Best. Trip. EVER." },

    // ============================================================
    // DAY 5 -- BREAKING CAMP (15 expressions)
    // ============================================================
    { expression: "let's break camp", meaning: "撤収しよう", meaningEn: "announcing it's time to pack up a campsite", day: 5, speaker: "Hank", example: "Alright, gang, last morning. Let's break camp." },
    { expression: "whether you like it or not", meaning: "好むと好まざるとにかかわらず", meaningEn: "saying something will happen regardless of someone's wishes", day: 5, speaker: "Hank", example: "You're learning a skill today whether you like it or not." },
    { expression: "signal's back", meaning: "電波戻った", meaningEn: "noticing cell service has returned", day: 5, speaker: "Logan", example: "We've got, like, two bars now if you stand on the rock. Signal's back." },
    { expression: "you gonna catch up on everything", meaning: "見逃したもの全部チェックする", meaningEn: "asking if someone will check what they missed", day: 5, speaker: "Sandra", example: "So it is. You gonna catch up on everything you missed?" },
    { expression: "don't make it weird", meaning: "変に深読みしないで", meaningEn: "asking someone not to make a sweet moment awkward", day: 5, speaker: "Logan", example: "I kind of want to help Dad with the tent first. Don't make it weird about it." },
    { expression: "no big deal", meaning: "大したことじゃない", meaningEn: "downplaying something you actually care about", day: 5, speaker: "Sandra", example: "I'm just going to quietly cry into this sleeping bag. No big deal." },
    { expression: "the hardest goodbye of my life", meaning: "人生で一番つらいお別れ", meaningEn: "a child's dramatic farewell", day: 5, speaker: "Ruby", example: "He was my best friend for five days and this is the hardest goodbye of my life." },
    { expression: "came by to see you off", meaning: "見送りに来た", meaningEn: "stopping by to say goodbye as someone leaves", day: 5, speaker: "Ranger Dawn", example: "Came by to see you folks off. Word travels." },
    { expression: "word travels", meaning: "噂は広まる", meaningEn: "saying news spreads quickly among people", day: 5, speaker: "Ranger Dawn", example: "Word travels -- you're the family that survived the flood, the bear." },
    { expression: "we earned every disaster", meaning: "災難は全部身をもって稼いだ", meaningEn: "joking that you fully deserved the trouble you got", day: 5, speaker: "Hank", example: "We earned every disaster, Dawn. Honestly, thank you." },
    { expression: "that's the job", meaning: "仕事だもの", meaningEn: "modestly brushing off thanks as just doing your role", day: 5, speaker: "Ranger Dawn", example: "That's the job. Besides -- families like yours are why I do it." },
    { expression: "go be free", meaning: "自由になって", meaningEn: "tenderly releasing something or someone", day: 5, speaker: "Ruby", example: "Goodbye, Gerald. Go be free. Find a girl beetle." },
    { expression: "objectively the worst", meaning: "客観的に見て最悪", meaningEn: "claiming something is bad by any fair measure", day: 5, speaker: "Logan", example: "This was, like, objectively the worst trip ever." },
    { expression: "I want it in the record", meaning: "記録に残したい", meaningEn: "jokingly wanting a rare admission noted officially", day: 5, speaker: "Sandra", example: "Logan admitted out loud that the trip was good. I want it in the record." },
    { expression: "same time next year", meaning: "来年も同じ時期に", meaningEn: "proposing to repeat a tradition annually", day: 5, speaker: "Uncle Dale", example: "Same time next year? I'll bring marshmallows." },
];

export const CAMPING_TRIP_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_CAMPING_TRIP_EXPRESSIONS = CAMPING_TRIP_EXPRESSIONS.length;

export const CAMPING_TRIP_DAY_IDS: Record<number, string> = {
    1: 'camping-day1',
    2: 'camping-day2',
    3: 'camping-day3',
    4: 'camping-day4',
    5: 'camping-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findCampingTripExpressionLineIndex(
    expression: string,
    speaker: string,
    conversationLines: Array<{ speaker: string; text: string }>
): number {
    const exprLower = expression.toLowerCase();
    return conversationLines.findIndex(line => {
        const textLower = line.text.toLowerCase();
        return textLower.includes(exprLower) && textLower.startsWith(`${speaker.toLowerCase()}:`);
    });
}
