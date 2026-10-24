/**
 * Airport Delay Expressions -- casual expressions from Airport Delay scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Denise(44F gate agent), Reuben(38M traveler), Hana(29F traveler),
 *   Wendell(62M retiree), Simone(26F grad student), Chad(34M traveler),
 *   Captain Ortiz(50M pilot), Diego(10M minor)
 */

export interface AirportExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const AIRPORT_EXPRESSIONS: AirportExpression[] = [
    // ============================================================
    // DAY 1 -- THE FIRST DELAY (15 expressions)
    // ============================================================
    { expression: "due to weather", meaning: "天候の影響で", meaningEn: "explaining a delay is caused by bad weather", day: 1, speaker: "Denise", example: "Due to weather, our flight to Cedar Rapids is now showing a delay." },
    { expression: "showing a delay", meaning: "遅延と出ている", meaningEn: "the board or screen is now displaying a delay", day: 1, speaker: "Denise", example: "Our flight to Cedar Rapids is now showing a delay." },
    { expression: "I'll update you when I know more", meaning: "分かり次第お知らせします", meaningEn: "promising to share new information once it arrives", day: 1, speaker: "Denise", example: "New departure time is, um, four-forty. I'll update you when I know more." },
    { expression: "I just know what the screen knows", meaning: "画面が知ってることしか知らない", meaningEn: "deflecting blame, you only have the same info as the display", day: 1, speaker: "Denise", example: "Sir, I just know what the screen knows. The screen says four-forty." },
    { expression: "should I rebook", meaning: "取り直すべきか", meaningEn: "asking whether to book a different flight", day: 1, speaker: "Reuben", example: "I need to know if I should rebook." },
    { expression: "that's nothing", meaning: "そんなの何でもない", meaningEn: "dismissing something as trivial compared to worse experiences", day: 1, speaker: "Wendell", example: "Two hours! Heck, that's nothing. I once sat in Denver for nine hours." },
    { expression: "you look like you could use", meaning: "～が必要そうな顔してる", meaningEn: "offering something to someone who seems to need it", day: 1, speaker: "Wendell", example: "You want a granola bar, son? You look like you could use a granola bar." },
    { expression: "where are you headed", meaning: "どこへ行くの", meaningEn: "casually asking someone's travel destination", day: 1, speaker: "Denise", example: "And your English is fine. Where are you headed?" },
    { expression: "your English is fine", meaning: "英語ちゃんと通じてる", meaningEn: "reassuring a nervous non-native speaker", day: 1, speaker: "Denise", example: "Just this one, honey. And your English is fine." },
    { expression: "worth being calm for", meaning: "落ち着く価値がある", meaningEn: "saying something is a good reason to stay relaxed", day: 1, speaker: "Wendell", example: "A wedding! Now see, that's worth being calm for." },
    { expression: "that's the whole point", meaning: "それが本質なんだ", meaningEn: "emphasizing the essential reason something exists", day: 1, speaker: "Reuben", example: "Meetings do not wait. That's the whole point of a meeting." },
    { expression: "can I just say", meaning: "ちょっと言わせて", meaningEn: "politely jumping in to share an opinion", day: 1, speaker: "Simone", example: "Can I just say -- if you all are this stressed at hour zero, I'm worried." },
    { expression: "we're gonna be here a while", meaning: "しばらくここにいることになる", meaningEn: "warning that the wait will be long", day: 1, speaker: "Simone", example: "It's a snowstorm. We're gonna be here a while." },
    { expression: "she's not wrong", meaning: "彼女の言う通り", meaningEn: "agreeing with what someone just said", day: 1, speaker: "Denise", example: "She's not wrong. Folks, get comfortable." },
    { expression: "get comfortable", meaning: "楽にして", meaningEn: "telling people to settle in for a long wait", day: 1, speaker: "Denise", example: "Folks, get comfortable. Bathrooms are down the hall." },

    // ============================================================
    // DAY 2 -- CANCELLED (15 expressions)
    // ============================================================
    { expression: "I'm not gonna sugarcoat this", meaning: "オブラートに包むのはやめる", meaningEn: "warning you're about to deliver bad news bluntly", day: 2, speaker: "Denise", example: "Okay, folks. I'm not gonna sugarcoat this. The flight is cancelled." },
    { expression: "I just got the word", meaning: "たった今連絡が入った", meaningEn: "you just received news or confirmation", day: 2, speaker: "Denise", example: "And -- I just got the word -- the flight tonight is cancelled." },
    { expression: "you don't get to just say", meaning: "勝手にそう言うな", meaningEn: "objecting that someone can't just declare something", day: 2, speaker: "Chad", example: "You don't get to just say cancelled." },
    { expression: "I understand you're frustrated", meaning: "ご不満なのは分かる", meaningEn: "acknowledging an upset person's feelings calmly", day: 2, speaker: "Denise", example: "I understand you're frustrated, sir." },
    { expression: "beyond frustrated", meaning: "不満どころじゃない", meaningEn: "saying you're far past mere annoyance", day: 2, speaker: "Chad", example: "Frustrated? I'm beyond frustrated. I want a hotel." },
    { expression: "that has to count for something", meaning: "それは何かの意味があるはず", meaningEn: "insisting your status or effort should bring an advantage", day: 2, speaker: "Reuben", example: "I'm a Platinum member. That has to count for something." },
    { expression: "Platinum does not melt snow", meaning: "プラチナは雪を溶かさない", meaningEn: "deadpan reply that status can't fix a physical problem", day: 2, speaker: "Denise", example: "But Platinum does not melt snow." },
    { expression: "you can just tell", meaning: "見れば分かる", meaningEn: "saying something is obvious from observation", day: 2, speaker: "Simone", example: "She's been doing this for twenty years, you can just tell." },
    { expression: "that's literally your one job", meaning: "それが文字通りあんたの唯一の仕事だろ", meaningEn: "sarcastically saying someone failed at their basic duty", day: 2, speaker: "Chad", example: "So fly the plane, Captain. That's literally your one job." },
    { expression: "here's the truth", meaning: "本当のところを言うと", meaningEn: "signaling you're about to be honest and direct", day: 2, speaker: "Captain Ortiz", example: "But here's the truth -- the runway de-icing is backed up." },
    { expression: "I'd rather you be annoyed with me", meaning: "腹を立ててもらう方がいい", meaningEn: "choosing a safe but unpopular option over a risky one", day: 2, speaker: "Captain Ortiz", example: "I'd rather you be annoyed with me than not get there at all." },
    { expression: "that means a lot", meaning: "それは嬉しい", meaningEn: "warmly thanking someone for kind words", day: 2, speaker: "Captain Ortiz", example: "That means a lot, miss. Most people don't see it that way." },
    { expression: "first thing tomorrow", meaning: "明日の朝一番に", meaningEn: "very early the next morning, as the first task", day: 2, speaker: "Captain Ortiz", example: "We try again first thing tomorrow." },
    { expression: "this is unbelievable", meaning: "信じられない", meaningEn: "expressing shock and outrage at a situation", day: 2, speaker: "Chad", example: "This is unbelievable. This is actually unbelievable." },
    { expression: "make the best of it", meaning: "できる限りいい時間にしよう", meaningEn: "deciding to handle a bad situation as positively as possible", day: 2, speaker: "Wendell", example: "Sit down, have a granola bar, and let's make the best of it." },

    // ============================================================
    // DAY 3 -- OVERNIGHT AT GATE B12 (15 expressions)
    // ============================================================
    { expression: "all by yourself", meaning: "一人で", meaningEn: "asking or noting that someone is traveling alone", day: 3, speaker: "Wendell", example: "You're traveling all by yourself, huh?" },
    { expression: "it's not a big deal", meaning: "たいしたことない", meaningEn: "downplaying something as no cause for concern", day: 3, speaker: "Diego", example: "My parents are divorced, it's honestly not a big deal." },
    { expression: "you're a pro", meaning: "もうプロだな", meaningEn: "praising someone for being experienced and skilled", day: 3, speaker: "Wendell", example: "Twice a year! Well, you're a pro then." },
    { expression: "I'll trade you", meaning: "交換しよう", meaningEn: "offering to swap one thing for another", day: 3, speaker: "Diego", example: "I'll trade you. I have two fruit snacks and a thing of pretzels." },
    { expression: "now that is a deal", meaning: "それは取引成立だ", meaningEn: "enthusiastically agreeing to a trade or offer", day: 3, speaker: "Wendell", example: "Now that is a deal. Crushed pretzels still work." },
    { expression: "you stay where I can see you", meaning: "見える所にいて", meaningEn: "telling a child to remain within sight", day: 3, speaker: "Denise", example: "You stay where I can see you, you hear me?" },
    { expression: "I'm basically thriving", meaning: "むしろ絶好調", meaningEn: "joking that you're doing more than fine despite the situation", day: 3, speaker: "Diego", example: "Wendell has snacks. I'm basically thriving." },
    { expression: "you can't sleep either", meaning: "あなたも眠れない", meaningEn: "noting someone shares your inability to sleep", day: 3, speaker: "Simone", example: "Hana. Hana, you can't sleep either? Come sit." },
    { expression: "it makes a decent pillow", meaning: "けっこういい枕になる", meaningEn: "saying something works well enough as a substitute pillow", day: 3, speaker: "Simone", example: "I've got a hoodie you can fold up, it makes a decent pillow." },
    { expression: "worst case", meaning: "最悪の場合", meaningEn: "introducing the worst possible outcome as a fallback plan", day: 3, speaker: "Simone", example: "And worst case, we'll all chip in and get you there somehow." },
    { expression: "we'll all chip in", meaning: "みんなでお金を出し合う", meaningEn: "everyone contributing money or effort together", day: 3, speaker: "Simone", example: "Worst case, we'll all chip in and get you there somehow." },
    { expression: "I couldn't help overhearing", meaning: "聞こえちゃって", meaningEn: "apologizing for unintentionally hearing a conversation", day: 3, speaker: "Reuben", example: "Sorry. I couldn't help overhearing." },
    { expression: "that kind of stings", meaning: "それはちょっとくる", meaningEn: "acknowledging something is emotionally painful", day: 3, speaker: "Simone", example: "Oh. Reuben. That kind of stings, huh?" },
    { expression: "losing my mind over", meaning: "～で頭をかきむしってた", meaningEn: "being extremely stressed or obsessed about something", day: 3, speaker: "Reuben", example: "I've been losing my mind over a meeting that didn't even need me." },
    { expression: "scoot over", meaning: "ちょっと詰めて", meaningEn: "asking someone to move so you can sit beside them", day: 3, speaker: "Reuben", example: "...Yeah. Okay. Yeah. Scoot over." },

    // ============================================================
    // DAY 4 -- THE STANDBY LIST (15 expressions)
    // ============================================================
    { expression: "good news, sort of", meaning: "いい知らせ、みたいなもの", meaningEn: "hedging that the news is only partly good", day: 4, speaker: "Denise", example: "Good news, sort of. They found us a plane." },
    { expression: "not all of us fit", meaning: "全員は乗れない", meaningEn: "saying there isn't enough room for everyone", day: 4, speaker: "Denise", example: "It's a smaller plane. So not all of us fit." },
    { expression: "why am I not just first", meaning: "なんで僕がただ一番じゃないんだ", meaningEn: "entitled complaint about not being prioritized", day: 4, speaker: "Chad", example: "I should be first. Why am I not just first?" },
    { expression: "let her read the list", meaning: "リストを読ませてやれ", meaningEn: "telling someone to stop interrupting and let a person finish", day: 4, speaker: "Reuben", example: "Let her read the list, Chad. Honestly." },
    { expression: "would you look at that", meaning: "おや、見てみろよ", meaningEn: "expressing pleasant surprise at something", day: 4, speaker: "Wendell", example: "Well, would you look at that. Booked early, I always book early." },
    { expression: "it's unusual, but you can", meaning: "珍しいけど、できる", meaningEn: "confirming something is allowed even if rare", day: 4, speaker: "Denise", example: "You can, technically. It's unusual, but you can." },
    { expression: "that is not fair to you", meaning: "それはあなたに不公平", meaningEn: "refusing a generous offer because it costs the giver", day: 4, speaker: "Hana", example: "You waited the same as me, that is not fair to you." },
    { expression: "trust me", meaning: "信じて", meaningEn: "asking someone to believe you based on your experience", day: 4, speaker: "Wendell", example: "Trust me -- giving the seat away is the part I'll remember." },
    { expression: "that's a good man right there", meaning: "あれこそ立派な男だ", meaningEn: "praising someone's character with admiration", day: 4, speaker: "Simone", example: "Wendell, that's -- yeah. That's a good man right there." },
    { expression: "this is ridiculous", meaning: "バカげてる", meaningEn: "protesting that a situation is absurd or unreasonable", day: 4, speaker: "Chad", example: "This is ridiculous. You can't just hand out seats based on weddings." },
    { expression: "sit tight", meaning: "じっとしてて", meaningEn: "telling someone to wait patiently without acting", day: 4, speaker: "Denise", example: "So the list is being followed, sir. Sit tight." },
    { expression: "I have to be", meaning: "載ってるはずだ", meaningEn: "insisting something must be the case", day: 4, speaker: "Diego", example: "I'm on the list too, right? I have to be, I'm a minor." },
    { expression: "get priority", meaning: "優先される", meaningEn: "being put ahead of others in line or order", day: 4, speaker: "Denise", example: "Minors and the bride's friend get priority." },
    { expression: "as of right now", meaning: "今この瞬間から", meaningEn: "stating something is true starting at this moment", day: 4, speaker: "Denise", example: "That's the rule as of right now, because I just made it the rule." },
    { expression: "one more push", meaning: "あともうひと踏ん張り", meaningEn: "encouraging a final effort before finishing", day: 4, speaker: "Denise", example: "One more push, folks. We're almost out of here." },

    // ============================================================
    // DAY 5 -- FINALLY BOARDING (15 expressions)
    // ============================================================
    { expression: "we are now boarding", meaning: "ただいまより搭乗開始", meaningEn: "the standard announcement that boarding has begun", day: 5, speaker: "Denise", example: "We are now boarding the flight to Cedar Rapids. All rows." },
    { expression: "wait, that's it", meaning: "え、それだけ", meaningEn: "surprised that something anticlimactic just ended", day: 5, speaker: "Reuben", example: "Wait, that's it? After all that, it's just -- now boarding?" },
    { expression: "that's how it always ends", meaning: "いつもこうやって終わる", meaningEn: "noting a familiar pattern in how things conclude", day: 5, speaker: "Denise", example: "That's how it always ends, Reuben. Big mess, then one boring sentence." },
    { expression: "friends for life", meaning: "一生の友達", meaningEn: "declaring a permanent friendship has formed", day: 5, speaker: "Simone", example: "We slept on a carpet together, we're friends for life now." },
    { expression: "is that too much", meaning: "やりすぎかな", meaningEn: "checking whether a gesture is over the top", day: 5, speaker: "Hana", example: "I called it 'Gate B12 Family.' Is that too much?" },
    { expression: "it is not one bit too much", meaning: "これっぽっちもやりすぎじゃない", meaningEn: "warmly reassuring that a gesture is just right", day: 5, speaker: "Wendell", example: "It is not one bit too much. Gate B12 Family." },
    { expression: "I hope that's okay", meaning: "それでいいといいんだけど", meaningEn: "checking that someone is fine with what you did", day: 5, speaker: "Diego", example: "Wendell, you're 'Granola Grandpa.' I hope that's okay." },
    { expression: "I have never been prouder", meaning: "これほど誇りに思ったことはない", meaningEn: "expressing the highest pride about something", day: 5, speaker: "Wendell", example: "Granola Grandpa. Son, I have never been prouder of a name in my life." },
    { expression: "I was a lot", meaning: "ちょっとひどかった", meaningEn: "admitting you were difficult or overbearing", day: 5, speaker: "Chad", example: "Yesterday I was a lot. I know I was a lot." },
    { expression: "the thing is", meaning: "要するに", meaningEn: "introducing the real reason or core point", day: 5, speaker: "Chad", example: "The thing is I hate not being in control." },
    { expression: "far from the worst", meaning: "最悪からはほど遠い", meaningEn: "reassuring someone they weren't nearly the worst case", day: 5, speaker: "Denise", example: "Sir, in twenty years you are far from the worst I've had." },
    { expression: "we'd have missed you", meaning: "いなくなったら寂しかった", meaningEn: "playfully telling someone they'd have been missed", day: 5, speaker: "Simone", example: "We'd have missed you, Chad. Honestly. You were our villain." },
    { expression: "a show I'm behind on", meaning: "見そびれてるドラマ", meaningEn: "a TV series you haven't kept up with", day: 5, speaker: "Denise", example: "I have a cat and a couch and a show I'm behind on." },
    { expression: "get on board", meaning: "搭乗して", meaningEn: "telling people to board the plane", day: 5, speaker: "Captain Ortiz", example: "Get on board. The weather's perfect." },
    { expression: "safe travels", meaning: "よい旅を", meaningEn: "a warm farewell wishing someone a safe journey", day: 5, speaker: "Denise", example: "Last call. And -- hey. Safe travels. Really." },
];

export const AIRPORT_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_AIRPORT_EXPRESSIONS = AIRPORT_EXPRESSIONS.length;

export const AIRPORT_DAY_IDS: Record<number, string> = {
    1: 'airport-day1',
    2: 'airport-day2',
    3: 'airport-day3',
    4: 'airport-day4',
    5: 'airport-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findAirportExpressionLineIndex(
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
