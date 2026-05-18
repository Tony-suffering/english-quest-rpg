/**
 * Home Inspection Expressions -- casual expressions from Home Inspection scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Marcus(34M), Jenna(32F), Bob(58M), Mrs.Patterson(72F), Karen(45F)
 */

export interface HomeInspectionExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const HOME_INSPECTION_EXPRESSIONS: HomeInspectionExpression[] = [
    // ============================================================
    // DAY 1 -- THE BASEMENT (15 expressions)
    // ============================================================
    { expression: "do his thing", meaning: "いつもの流れでやる", meaningEn: "let someone do what they always do, in their own way", day: 1, speaker: "Karen", example: "Bob's gonna do his thing, you guys just follow along." },
    { expression: "there's no dumb question", meaning: "バカな質問なんてない", meaningEn: "encouraging someone to ask freely without worry", day: 1, speaker: "Karen", example: "Ask whatever you want -- there's no dumb question." },
    { expression: "make people feel bad about it", meaning: "そのことで人を悪く感じさせる", meaningEn: "shame or embarrass someone for something they did", day: 1, speaker: "Bob", example: "Plenty of dumb questions. I just don't make people feel bad about asking them." },
    { expression: "where do we start", meaning: "どこから始める？", meaningEn: "asking how to begin a process or task", day: 1, speaker: "Marcus", example: "Okay, we're here. Where do we start?" },
    { expression: "tells you everything", meaning: "全部教えてくれる", meaningEn: "reveals all the important information you need", day: 1, speaker: "Bob", example: "Basement. Always the basement. House tells you everything down here." },
    { expression: "perfectly dry", meaning: "完璧に乾いてる", meaningEn: "completely without moisture, no water issues at all", day: 1, speaker: "Mrs. Patterson", example: "It's perfectly dry. We've never had any issues." },
    { expression: "hold on", meaning: "ちょっと待った", meaningEn: "pause, stop briefly to focus on something", day: 1, speaker: "Bob", example: "Mm-hm. Hold on. Marcus, come look at this." },
    { expression: "come look at this", meaning: "これ見に来な", meaningEn: "calling someone over to inspect something you found", day: 1, speaker: "Bob", example: "Hold on. Marcus, come look at this." },
    { expression: "what is that", meaning: "なんですかそれ", meaningEn: "asking about something unfamiliar or alarming", day: 1, speaker: "Marcus", example: "That brown stain on the wall? Is that... what is that?" },
    { expression: "goes about three feet up", meaning: "3フィートくらいまで来てる", meaningEn: "describing the height or extent of damage on a wall", day: 1, speaker: "Bob", example: "That, my friend, is water. Old water. Goes about three feet up." },
    { expression: "leaves a record", meaning: "痕跡を残す", meaningEn: "leaves visible evidence over time", day: 1, speaker: "Bob", example: "Ma'am, water leaves a record. This wasn't one time." },
    { expression: "I know", meaning: "わかってる", meaningEn: "acknowledging a partner's silent warning or concern", day: 1, speaker: "Marcus", example: "Jenna: Marcus. -- Marcus: I know." },
    { expression: "let's not jump to conclusions", meaning: "結論を急がないで", meaningEn: "telling someone to wait before making a decision", day: 1, speaker: "Karen", example: "Okay, let's not jump to conclusions. We'll get the full report." },
    { expression: "what are we looking at", meaning: "これって何になりそう？", meaningEn: "asking for an assessment of the situation or scope", day: 1, speaker: "Karen", example: "Bob, what are we looking at -- minor, moderate, major?" },
    { expression: "let's just say", meaning: "とりあえず言っとくと", meaningEn: "hedging before delivering bad news indirectly", day: 1, speaker: "Bob", example: "Let's just say I'm taking a lot of pictures." },

    // ============================================================
    // DAY 2 -- THE ROOF & HVAC (15 expressions)
    // ============================================================
    { expression: "I'm going up", meaning: "登るぞ", meaningEn: "announcing you're about to climb something", day: 2, speaker: "Bob", example: "All right, I'm going up. You two stay down here." },
    { expression: "the last thing I need", meaning: "一番面倒なのは", meaningEn: "expressing what you absolutely want to avoid", day: 2, speaker: "Bob", example: "Last thing I need is somebody breaking an ankle." },
    { expression: "let me think", meaning: "ええっと、考えさせて", meaningEn: "buying time while trying to recall something", day: 2, speaker: "Mrs. Patterson", example: "Oh, let me think. My husband did it the year the twins started middle school." },
    { expression: "the back half", meaning: "後半に入ってる", meaningEn: "the latter portion of an expected lifespan or timeline", day: 2, speaker: "Karen", example: "Asphalt shingle, typical life is 20 to 30. So we're at the back half." },
    { expression: "I can hear you down there", meaning: "下まで聞こえてるぞ", meaningEn: "letting people know you can overhear their private chat", day: 2, speaker: "Bob", example: "Hey -- I can hear you down there. You're at the back half, all right." },
    { expression: "soft spots", meaning: "柔らかい箇所", meaningEn: "weakened or rotting areas, especially in structures", day: 2, speaker: "Bob", example: "I'm finding three soft spots already." },
    { expression: "patch job", meaning: "部分補修", meaningEn: "a small fix instead of a full repair or replacement", day: 2, speaker: "Bob", example: "Meaning a full tear-off, not a patch job." },
    { expression: "could be more", meaning: "もっと行くかも", meaningEn: "warning that a cost estimate might go higher", day: 2, speaker: "Karen", example: "Probably twelve, fifteen thousand. Could be more." },
    { expression: "okay, cool", meaning: "はい、最高", meaningEn: "deadpan sarcastic acknowledgment of bad news", day: 2, speaker: "Marcus", example: "Marcus: Okay. Cool. And the HVAC?" },
    { expression: "works perfectly", meaning: "完璧に動いてる", meaningEn: "insisting something old still runs without issues", day: 2, speaker: "Mrs. Patterson", example: "The furnace works perfectly! We just had someone look at it last spring." },
    { expression: "I respect that", meaning: "それは尊敬する", meaningEn: "acknowledging something while still disagreeing or qualifying", day: 2, speaker: "Bob", example: "I respect that it's still running. I do. But it's not gonna be running much longer." },
    { expression: "not gonna be running much longer", meaning: "そう長くは持たない", meaningEn: "predicting a machine or system is near the end of its life", day: 2, speaker: "Bob", example: "It's not gonna be running much longer." },
    { expression: "doing math in your head", meaning: "頭の中で計算してる", meaningEn: "silently calculating costs or numbers, often stressfully", day: 2, speaker: "Jenna", example: "Marcus, you're doing math in your head, aren't you?" },
    { expression: "drowning in my head", meaning: "頭の中で溺れてる", meaningEn: "overwhelmed by the mental calculations or stress", day: 2, speaker: "Marcus", example: "I am drowning in my head. Yes." },
    { expression: "back half", meaning: "後半", meaningEn: "the second half of a lifespan, especially when nearing the end", day: 2, speaker: "Karen", example: "We're at the back half of this roof's life." },

    // ============================================================
    // DAY 3 -- THE NEGOTIATION (15 expressions)
    // ============================================================
    { expression: "what's your number", meaning: "いくらで行く？", meaningEn: "asking what price or amount you want to ask for", day: 3, speaker: "Karen", example: "Before we get on the phone, what's your number?" },
    { expression: "ambitious opening", meaning: "強気な初手", meaningEn: "an aggressive first offer in a negotiation", day: 3, speaker: "Karen", example: "Twenty-five thousand off. -- That's an ambitious opening." },
    { expression: "we could justify more", meaning: "もっと取ってもいいくらい", meaningEn: "arguing you have grounds to ask for even more", day: 3, speaker: "Jenna", example: "It's the basement and the roof and the furnace. We could justify more." },
    { expression: "she's gonna lose her mind", meaning: "彼女はキレる", meaningEn: "predicting someone will react with anger or shock", day: 3, speaker: "Karen", example: "I'm saying she's gonna lose her mind. Okay, putting her on now." },
    { expression: "putting her on now", meaning: "電話する/つなぐよ", meaningEn: "connecting someone to a call right now", day: 3, speaker: "Karen", example: "Okay, putting her on now." },
    { expression: "I'm sorry, what?", meaning: "ごめんなさい、いくらですって？", meaningEn: "expressing shock that you heard something correctly", day: 3, speaker: "Mrs. Patterson", example: "...I'm sorry, twenty-five WHAT? Absolutely not." },
    { expression: "worth every penny", meaning: "ビタ一文値引きする必要ない", meaningEn: "completely justifies the full price asked", day: 3, speaker: "Mrs. Patterson", example: "Absolutely not. That house is worth every penny." },
    { expression: "doesn't know what he's talking about", meaning: "何もわかってない", meaningEn: "dismissing someone's professional opinion", day: 3, speaker: "Mrs. Patterson", example: "Bob doesn't know what he's talking about." },
    { expression: "you know that", meaning: "あなたも知ってるでしょ", meaningEn: "reminding someone of a fact they already accept", day: 3, speaker: "Karen", example: "Bob is the best inspector in the county. You know that." },
    { expression: "not a dollar more", meaning: "それ以上は1ドルも出さない", meaningEn: "firm final number, refusing to budge further", day: 3, speaker: "Mrs. Patterson", example: "I'll do eight thousand. And not a dollar more." },
    { expression: "plus you cover the contingency", meaning: "＋特約はそちら持ち", meaningEn: "adding a condition that the other side absorbs an extra cost", day: 3, speaker: "Jenna", example: "Eighteen plus you cover the roof inspection contingency." },
    { expression: "closed by the end of the month", meaning: "月末までにクロージング", meaningEn: "demanding a deal close by a specific deadline", day: 3, speaker: "Mrs. Patterson", example: "Fine. Eighteen. But I want it closed by the end of the month." },
    { expression: "send the addendum tonight", meaning: "今夜契約書追加分を送る", meaningEn: "promising to send a contract amendment immediately", day: 3, speaker: "Karen", example: "Done. I'll send the addendum tonight." },
    { expression: "you're a saint", meaning: "あなたは天使よ", meaningEn: "complimenting someone for being unusually generous or patient", day: 3, speaker: "Karen", example: "Patty, you're a saint." },
    { expression: "I'm a tired old woman", meaning: "私はただの疲れたババア", meaningEn: "self-deprecating refusal of a compliment, weary of negotiation", day: 3, speaker: "Mrs. Patterson", example: "I'm a tired old woman, Karen. That's what I am." },

    // ============================================================
    // DAY 4 -- THE TERMITE TWIST (15 expressions)
    // ============================================================
    { expression: "today if possible", meaning: "できれば今日", meaningEn: "urgently requesting to meet on the same day", day: 4, speaker: "Bob", example: "I need you and Jenna to meet me at the house. Today if possible." },
    { expression: "what's going on", meaning: "何があったんですか", meaningEn: "asking for an explanation when something feels off", day: 4, speaker: "Marcus", example: "We just finalized the price yesterday. What's going on?" },
    { expression: "I want to take another look", meaning: "もう一度確認したい", meaningEn: "wanting to re-examine something carefully", day: 4, speaker: "Bob", example: "I was reviewing the photos last night. I want to take another look." },
    { expression: "tell me it's not what I think it is", meaning: "私が思ってる通りじゃないって言って", meaningEn: "dreading that a bad suspicion will be confirmed", day: 4, speaker: "Karen", example: "Okay, what are we looking at? Tell me it's not what I think it is." },
    { expression: "come see for yourself", meaning: "自分の目で見て", meaningEn: "inviting someone to verify something directly instead of explaining", day: 4, speaker: "Bob", example: "Crawl space. Northeast corner. Come see for yourself." },
    { expression: "oh my god", meaning: "うわ、なに", meaningEn: "shocked reaction to an unexpected discovery", day: 4, speaker: "Jenna", example: "Oh my god. Are those... is that --" },
    { expression: "been here a while", meaning: "しばらくここにいる", meaningEn: "describing how long a problem has been festering", day: 4, speaker: "Bob", example: "Active termites. Look at the mud tubes. This colony's been here a while." },
    { expression: "how is this not in the original report", meaning: "なんで最初の報告書に載ってないんですか", meaningEn: "frustrated that information was missed initially", day: 4, speaker: "Marcus", example: "How is this not in the original report?" },
    { expression: "that's why I'm worth what you're paying me", meaning: "だから俺に金を払う価値がある", meaningEn: "defending the value of careful, slow professional work", day: 4, speaker: "Bob", example: "That's why I'm worth what you're paying me." },
    { expression: "we're talking about", meaning: "～の話になる", meaningEn: "framing the scope of a problem or expense", day: 4, speaker: "Bob", example: "The damage is structural. We're talking about replacing joists." },
    { expression: "whether she likes it or not", meaning: "好むと好まざるとに関わらず", meaningEn: "stating an obligation that can't be avoided", day: 4, speaker: "Karen", example: "We have to disclose this whether she likes it or not." },
    { expression: "I'm done. I'm walking", meaning: "もう終わりだ、降りる", meaningEn: "declaring you're quitting a deal or situation in frustration", day: 4, speaker: "Marcus", example: "Karen, I'm done. I'm walking. We're walking." },
    { expression: "slow down", meaning: "落ち着いて", meaningEn: "asking a panicking person to take it easy", day: 4, speaker: "Jenna", example: "Marcus. Slow down." },
    { expression: "at what point do we admit", meaning: "どの時点で認めるんだよ", meaningEn: "rhetorical question challenging when to face an obvious truth", day: 4, speaker: "Marcus", example: "At what point do we admit this is a money pit?" },
    { expression: "throw away earnest money", meaning: "手付金を捨てる", meaningEn: "forfeit the deposit by walking away from a real estate deal", day: 4, speaker: "Jenna", example: "Let's see what Bob says it costs before we throw away earnest money." },

    // ============================================================
    // DAY 5 -- CLOSING DAY (15 expressions)
    // ============================================================
    { expression: "mostly initials", meaning: "ほとんどイニシャルだけ", meaningEn: "describing paperwork that's mostly initialing not full signatures", day: 5, speaker: "Karen", example: "These forty-three pages are... mostly initials." },
    { expression: "my hand is going to fall off", meaning: "手が落ちる", meaningEn: "exaggerating how much you've been signing", day: 5, speaker: "Marcus", example: "My hand is going to fall off." },
    { expression: "just keep signing", meaning: "サインし続けて", meaningEn: "telling someone to push through a tedious task without thinking", day: 5, speaker: "Jenna", example: "Just keep signing. Don't think about it." },
    { expression: "a little something", meaning: "ちょっとしたもの", meaningEn: "modestly describing a small gift", day: 5, speaker: "Mrs. Patterson", example: "I brought you both a little something. It's silly, but -- here." },
    { expression: "it's silly, but --", meaning: "バカみたいなんだけど", meaningEn: "downplaying a gift before giving it", day: 5, speaker: "Mrs. Patterson", example: "It's silly, but -- here. A bottle of olive oil from the tree in the backyard." },
    { expression: "that is not silly at all", meaning: "バカみたいなんかじゃない", meaningEn: "warmly correcting someone who's downplaying their gesture", day: 5, speaker: "Jenna", example: "Mrs. Patterson. That is not silly at all. Thank you." },
    { expression: "the trick with that is", meaning: "あれのコツは", meaningEn: "sharing insider knowledge about how to handle something", day: 5, speaker: "Mrs. Patterson", example: "The trick with that tree is you have to prune it before March." },
    { expression: "smarter than the calendar", meaning: "カレンダーより賢い", meaningEn: "personifying nature as knowing better than human schedules", day: 5, speaker: "Mrs. Patterson", example: "My husband always said the tree was smarter than the calendar." },
    { expression: "I'll remember that", meaning: "覚えておきます", meaningEn: "politely acknowledging advice you intend to keep", day: 5, speaker: "Marcus", example: "I'll remember that." },
    { expression: "I should have told", meaning: "言うべきだった", meaningEn: "expressing regret about withholding information", day: 5, speaker: "Mrs. Patterson", example: "I should have told Bob. I just... didn't want it to be a thing." },
    { expression: "didn't want it to be a thing", meaning: "大事にしたくなかった", meaningEn: "wanting to avoid making something into a bigger deal", day: 5, speaker: "Mrs. Patterson", example: "I just... didn't want it to be a thing." },
    { expression: "we figured it out", meaning: "私たちで気づきました", meaningEn: "graciously closing a topic that could have been awkward", day: 5, speaker: "Jenna", example: "It's okay. We figured it out." },
    { expression: "you have to jiggle it", meaning: "揺らさないと開かない", meaningEn: "explaining the quirky trick to operating an old lock or part", day: 5, speaker: "Mrs. Patterson", example: "The shed key is a little sticky. You have to jiggle it." },
    { expression: "be good to it", meaning: "大切にしてね", meaningEn: "asking the next owner to take care of something cherished", day: 5, speaker: "Mrs. Patterson", example: "Be good to it. It's been a good house." },
    { expression: "get out of my conference room", meaning: "私の会議室から出てって", meaningEn: "playfully kicking someone out after a successful deal", day: 5, speaker: "Karen", example: "Now get out of my conference room. I have another closing in twenty minutes." },
];

export const HOME_INSPECTION_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_HOME_INSPECTION_EXPRESSIONS = HOME_INSPECTION_EXPRESSIONS.length;

export const HOME_INSPECTION_DAY_IDS: Record<number, string> = {
    1: 'homeinspection-day1',
    2: 'homeinspection-day2',
    3: 'homeinspection-day3',
    4: 'homeinspection-day4',
    5: 'homeinspection-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findHomeInspectionExpressionLineIndex(
    expressionText: string,
    conversationLines: Array<{ text: string }>
): number {
    const clean = expressionText.toLowerCase();
    const idx = conversationLines.findIndex(line =>
        line.text.toLowerCase().includes(clean)
    );
    return idx >= 0 ? idx : 0;
}
