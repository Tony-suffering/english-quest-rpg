/**
 * Tokyo 52 Episode 1 Expressions -- spoken English from "It Starts Here"
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 */

export interface Tokyo52Expression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const TOKYO52_EP01_EXPRESSIONS: Tokyo52Expression[] = [
    // ============================================================
    // DAY 1 -- THE CAFE (15 expressions)
    // Yuki/Aya post-meeting, Rina serving Foreign Customer
    // ============================================================
    { expression: "don't beat yourself up", meaning: "そんなに自分を責めないで", meaningEn: "stop blaming yourself for a mistake", day: 1, speaker: "Aya", example: "It happens to everyone, OK? Don't beat yourself up." },
    { expression: "my brain went blank", meaning: "頭が真っ白になった", meaningEn: "couldn't think of anything, total mental freeze", day: 1, speaker: "Yuki", example: "He was asking me about the delivery schedule and my brain went completely blank." },
    { expression: "I jumped in", meaning: "フォローに入った", meaningEn: "stepped in to help or take over", day: 1, speaker: "Aya", example: "The client didn't even seem bothered. I jumped in and --" },
    { expression: "I'm not mad at you", meaning: "あなたに怒ってるんじゃない", meaningEn: "clarifying that your frustration is not directed at them", day: 1, speaker: "Yuki", example: "I'm not mad at you. I'm mad at me." },
    { expression: "you wanna get coffee?", meaning: "コーヒー飲まない?", meaningEn: "casual invitation to get a drink together", day: 1, speaker: "Aya", example: "You wanna get coffee? There's a place right here." },
    { expression: "what can I get for you?", meaning: "何にしますか?", meaningEn: "standard friendly greeting from cafe/restaurant staff", day: 1, speaker: "Rina", example: "Hi! Welcome! What can I get for you guys today?" },
    { expression: "coming right up", meaning: "すぐお作りしますね", meaningEn: "your order will be ready shortly (casual service phrase)", day: 1, speaker: "Rina", example: "Two iced lattes, coming right up!" },
    { expression: "do you have a menu?", meaning: "メニューありますか?", meaningEn: "asking to see what's available to order", day: 1, speaker: "Foreign Customer", example: "Excuse me, hi -- do you have, like, a menu?" },
    { expression: "people go crazy for it", meaning: "みんなハマってる", meaningEn: "it's extremely popular, everyone loves it", day: 1, speaker: "Rina", example: "It's this hojicha latte. Super popular. People go crazy for it." },
    { expression: "great choice", meaning: "いい選択ですね", meaningEn: "affirming someone's decision enthusiastically", day: 1, speaker: "Rina", example: "Great choice! Hot or iced?" },
    { expression: "you got it", meaning: "かしこまりました", meaningEn: "cheerful confirmation of an order or request", day: 1, speaker: "Rina", example: "You got it! That'll be 550 yen." },
    { expression: "that's so nice of you", meaning: "親切にありがとう", meaningEn: "expressing gratitude for someone's kindness", day: 1, speaker: "Foreign Customer", example: "Oh, that's so nice of you. Thank you so much!" },
    { expression: "like it was nothing", meaning: "何でもないことみたいに", meaningEn: "as if it were effortless, no big deal", day: 1, speaker: "Yuki", example: "She just had an entire conversation in English like it was nothing." },
    { expression: "what's the point?", meaning: "何の意味があるの?", meaningEn: "expressing frustration that something was pointless", day: 1, speaker: "Yuki", example: "What's the point? What was the POINT of all that studying?" },
    { expression: "you haven't trained it yet", meaning: "まだ鍛えてないだけ", meaningEn: "you have the ability, just not the practice", day: 1, speaker: "Aya", example: "You DO have it. You just haven't trained it yet. That's all." },

    // ============================================================
    // DAY 2 -- FINDING NOREN (15 expressions)
    // Yuki discovering the izakaya, meeting Gondo
    // ============================================================
    { expression: "I should just go home", meaning: "もう帰ろう", meaningEn: "telling yourself to give up and leave", day: 2, speaker: "Yuki", example: "Why am I even -- I should just go home." },
    { expression: "what is this place?", meaning: "ここ何だろう?", meaningEn: "expressing curiosity about an unfamiliar location", day: 2, speaker: "Yuki", example: "Huh. What is this place?" },
    { expression: "one drink", meaning: "一杯だけ", meaningEn: "promising yourself to keep it short (often a lie)", day: 2, speaker: "Yuki", example: "Whatever. One drink. One drink and then home." },
    { expression: "is it OK if I...?", meaning: "...しても大丈夫ですか?", meaningEn: "polite way to ask permission in any situation", day: 2, speaker: "Yuki", example: "Is it OK if I sit at the counter?" },
    { expression: "anywhere you like", meaning: "どこでもお好きなところに", meaningEn: "welcoming someone to choose freely", day: 2, speaker: "Master Gondo", example: "Anywhere you like." },
    { expression: "a regular draft", meaning: "普通の生ビール", meaningEn: "ordering the standard beer on tap", day: 2, speaker: "Yuki", example: "Can I get a beer? Just a regular draft, please." },
    { expression: "a completely different world", meaning: "全然違う世界みたい", meaningEn: "describing a place that feels totally separate from normal life", day: 2, speaker: "Yuki", example: "Compared to everything outside, it's like a completely different world in here." },
    { expression: "by the way", meaning: "ちなみに", meaningEn: "casually adding information to a conversation", day: 2, speaker: "Yuki", example: "This is my first time here. I'm Yuki, by the way." },
    { expression: "you look like you've had a long day", meaning: "大変な一日だったみたいだね", meaningEn: "observing that someone appears tired or stressed", day: 2, speaker: "Master Gondo", example: "You look like you've had a long day." },
    { expression: "is it that obvious?", meaning: "そんなにわかります?", meaningEn: "surprised that your feelings are showing", day: 2, speaker: "Yuki", example: "Is it that obvious?" },
    { expression: "completely froze", meaning: "完全にフリーズした", meaningEn: "couldn't move or speak due to panic", day: 2, speaker: "Yuki", example: "I had this meeting with a foreign client and I just completely froze." },
    { expression: "I thought that meant something", meaning: "何か意味があると思ってた", meaningEn: "realizing an achievement didn't deliver what you expected", day: 2, speaker: "Yuki", example: "I passed TOEIC with a 620 and I thought that meant something, you know?" },
    { expression: "not great, I know", meaning: "大したことないのはわかってます", meaningEn: "self-deprecating acknowledgment of a shortcoming", day: 2, speaker: "Yuki", example: "Not great, I know." },
    { expression: "perfect score, every time", meaning: "毎回満点", meaningEn: "achieving the maximum result repeatedly", day: 2, speaker: "Master Gondo", example: "Got 990 each time. Perfect score, every time." },
    { expression: "what do you mean?", meaning: "どういう意味ですか?", meaningEn: "asking someone to explain something confusing they just said", day: 2, speaker: "Yuki", example: "That's not why I can speak English. -- What do you mean?" },

    // ============================================================
    // DAY 3 -- RETURN TO NOREN (15 expressions)
    // Gondo's question, obligation vs. reason
    // ============================================================
    { expression: "you came back", meaning: "来たか", meaningEn: "acknowledging someone's return (understated)", day: 3, speaker: "Master Gondo", example: "You came back." },
    { expression: "is that OK?", meaning: "大丈夫ですか?", meaningEn: "checking if something is acceptable", day: 3, speaker: "Yuki", example: "Yeah. I -- yeah. Is that OK?" },
    { expression: "I've been thinking about it all day", meaning: "今日ずっと考えてた", meaningEn: "something has occupied your mind nonstop", day: 3, speaker: "Yuki", example: "I've been thinking about it all day. At work, on the train, during lunch." },
    { expression: "I couldn't stop thinking about it", meaning: "頭から離れなかった", meaningEn: "unable to get something out of your mind", day: 3, speaker: "Yuki", example: "I couldn't stop thinking about it. What did you mean?" },
    { expression: "let me ask you something", meaning: "ひとつ聞いていいか", meaningEn: "requesting permission to pose a question (slightly serious tone)", day: 3, speaker: "Master Gondo", example: "Let me ask you something first." },
    { expression: "why do you want to speak English?", meaning: "なぜ英語を話したい?", meaningEn: "asking someone's core motivation", day: 3, speaker: "Master Gondo", example: "Why do you want to speak English?" },
    { expression: "it's part of my job", meaning: "仕事の一部なので", meaningEn: "explaining something as a work requirement", day: 3, speaker: "Yuki", example: "I need to be able to communicate. It's part of my job." },
    { expression: "that's not a reason, that's an obligation", meaning: "それは理由じゃない。義務だ", meaningEn: "distinguishing between genuine motivation and external pressure", day: 3, speaker: "Master Gondo", example: "That's not a reason. That's an obligation." },
    { expression: "what's the difference?", meaning: "何が違うんですか?", meaningEn: "asking someone to clarify a distinction you don't understand", day: 3, speaker: "Yuki", example: "What's the difference?" },
    { expression: "the difference is everything", meaning: "全部違う", meaningEn: "emphasizing that a distinction matters enormously", day: 3, speaker: "Master Gondo", example: "The difference is everything." },
    { expression: "isn't that enough?", meaning: "それだけじゃダメなんですか?", meaningEn: "pushing back, questioning if more is really needed", day: 3, speaker: "Yuki", example: "Isn't that enough? Needing it for work?" },
    { expression: "every single one", meaning: "一人残らず", meaningEn: "emphasizing that there were absolutely no exceptions", day: 3, speaker: "Master Gondo", example: "Every student who learned it for obligation quit. Every single one." },
    { expression: "come back when you have a real answer", meaning: "本当の答えが見つかったらまた来なさい", meaningEn: "sending someone away to reflect before continuing", day: 3, speaker: "Master Gondo", example: "Come back when you have a real answer." },
    { expression: "I'm telling you to think", meaning: "考えろと言ってる", meaningEn: "urging someone to reflect deeply rather than react", day: 3, speaker: "Master Gondo", example: "I'm not telling you to leave. I'm telling you to think." },
    { expression: "so I've been told", meaning: "よく言われる", meaningEn: "acknowledging that others have said the same thing about you", day: 3, speaker: "Master Gondo", example: "You're kind of a weird old man. -- So I've been told." },

    // ============================================================
    // DAY 4 -- SMALL STEPS (15 expressions)
    // Email writing, ordering in English, Gondo's question echoing
    // ============================================================
    { expression: "could you confirm...?", meaning: "確認していただけますか?", meaningEn: "polite business English for requesting verification", day: 4, speaker: "Yuki", example: "Could you confirm the delivery date?" },
    { expression: "thank you for your email", meaning: "メールありがとうございます", meaningEn: "standard polite email opening in business English", day: 4, speaker: "Yuki", example: "Dear Mark, Thank you for your email." },
    { expression: "that's it, that's all it was", meaning: "たったそれだけ", meaningEn: "realizing something was simpler than expected", day: 4, speaker: "Yuki", example: "The delivery date is March 15th. That's it. That's all it was." },
    { expression: "can I get an iced latte, please?", meaning: "アイスラテをお願いします", meaningEn: "natural casual way to order a drink", day: 4, speaker: "Yuki", example: "Can I get an iced latte, please?" },
    { expression: "coming right up", meaning: "すぐお持ちします", meaningEn: "staff response confirming an order will be ready quickly", day: 4, speaker: "Yuki", example: "Sure! Iced latte, coming right up." },
    { expression: "I wanted to try something different", meaning: "違うことを試してみたかった", meaningEn: "deciding to step outside your comfort zone", day: 4, speaker: "Yuki", example: "But today she wanted to try something different." },
    { expression: "I stumbled in by accident", meaning: "たまたま迷い込んだ", meaningEn: "finding a place without intending to", day: 4, speaker: "Yuki", example: "Yesterday she stumbled in by accident. Today she walked here on her own." },
    { expression: "that difference matters", meaning: "その違いは大きい", meaningEn: "emphasizing the significance of a subtle distinction", day: 4, speaker: "Yuki", example: "Yesterday by accident. Today on my own. That difference matters." },
    { expression: "about what you said yesterday", meaning: "昨日おっしゃってたこと", meaningEn: "referencing a previous conversation to continue it", day: 4, speaker: "Yuki", example: "So, um, about what you said yesterday. The TOEIC thing." },
    { expression: "she was enjoying it", meaning: "楽しそうだった", meaningEn: "observing someone's genuine pleasure in an activity", day: 4, speaker: "Yuki", example: "Rina wasn't using English for work. She was enjoying it." },
    { expression: "genuinely enjoying", meaning: "純粋に楽しんでる", meaningEn: "sincerely finding pleasure, not faking it", day: 4, speaker: "Yuki", example: "Genuinely enjoying talking to a stranger in another language." },
    { expression: "could that be a reason?", meaning: "あれが理由になり得るのか", meaningEn: "questioning whether an emotional motivation is valid", day: 4, speaker: "Yuki", example: "That feeling. Could that be a reason?" },
    { expression: "because it's fun", meaning: "楽しいから", meaningEn: "the simplest and often most powerful motivation", day: 4, speaker: "Yuki", example: "Is there a world where 'because it's fun' is a good enough answer?" },
    { expression: "take your time", meaning: "ゆっくりでいい", meaningEn: "reassuring someone there's no rush", day: 4, speaker: "Master Gondo", example: "Finish your beer. Take your time." },
    { expression: "you're kind of a weird old man", meaning: "変なおじいさんですね", meaningEn: "affectionate teasing of an eccentric elder", day: 4, speaker: "Yuki", example: "You're kind of a weird old man, you know that?" },

    // ============================================================
    // DAY 5 -- FIRST VOLUNTARY ENGLISH (15 expressions)
    // Convenience store directions, self-reflection, epilogue
    // ============================================================
    { expression: "do you speak English?", meaning: "英語話せますか?", meaningEn: "asking a stranger if they can communicate in English", day: 5, speaker: "Tourist", example: "Excuse me? Sorry, do you speak English?" },
    { expression: "yes, a little", meaning: "はい、少しだけ", meaningEn: "modest response when asked about language ability", day: 5, speaker: "Yuki", example: "Yes. A little." },
    { expression: "I've been walking around for like twenty minutes", meaning: "もう20分くらい歩いてる", meaningEn: "expressing frustration about being lost", day: 5, speaker: "Tourist", example: "I've been walking around for like twenty minutes and I keep ending up at the same 7-Eleven." },
    { expression: "you go straight", meaning: "まっすぐ行って", meaningEn: "basic direction-giving: continue forward", day: 5, speaker: "Yuki", example: "You go straight. That way. And then turn left at the big crossing." },
    { expression: "turn left at the big crossing", meaning: "大きい交差点を左", meaningEn: "giving a landmark-based direction", day: 5, speaker: "Yuki", example: "Turn left at the big crossing." },
    { expression: "and then you can see it", meaning: "そうすると見えます", meaningEn: "telling someone the destination will become visible", day: 5, speaker: "Yuki", example: "And then you can see it. The station. Maybe five minutes?" },
    { expression: "that's it?", meaning: "それだけ?", meaningEn: "surprised that something is simpler/closer than expected", day: 5, speaker: "Tourist", example: "Five minutes? That's it?" },
    { expression: "I was going the completely wrong direction", meaning: "完全に逆方向行ってた", meaningEn: "realizing you've been heading the wrong way", day: 5, speaker: "Tourist", example: "Oh man, I was going the completely wrong direction." },
    { expression: "you saved me", meaning: "助かりました", meaningEn: "thanking someone for getting you out of trouble", day: 5, speaker: "Tourist", example: "Thank you so much! You saved me." },
    { expression: "no problem", meaning: "いえいえ", meaningEn: "casual response to thanks, it was no trouble", day: 5, speaker: "Yuki", example: "No problem." },
    { expression: "your English is great, by the way", meaning: "英語上手ですね", meaningEn: "complimenting someone's language ability (often encouraging)", day: 5, speaker: "Tourist", example: "Your English is great, by the way!" },
    { expression: "nothing seems different", meaning: "何も変わってないように見える", meaningEn: "feeling like no progress has been made on the surface", day: 5, speaker: "Yuki", example: "Nothing seems different. TOEIC score is still 620." },
    { expression: "but something is different", meaning: "でも何かが違う", meaningEn: "sensing an internal shift even without visible evidence", day: 5, speaker: "Yuki", example: "But something is different." },
    { expression: "for the first time, by choice", meaning: "初めて、自分から", meaningEn: "doing something voluntarily for the very first time", day: 5, speaker: "Yuki", example: "Gave directions in front of a convenience store. For the first time, by choice." },
    { expression: "that wasn't obligation", meaning: "あれは義務じゃなかった", meaningEn: "realizing your action came from genuine desire, not duty", day: 5, speaker: "Yuki", example: "That moment when her words reached someone. That wasn't obligation." },
];

export const TOKYO52_EP01_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_TOKYO52_EP01_EXPRESSIONS = TOKYO52_EP01_EXPRESSIONS.length;

export const TOKYO52_EP01_DAY_IDS = ['tokyo52-ep01-day2', 'tokyo52-ep01-day3', 'tokyo52-ep01-day5', 'tokyo52-ep01-day6', 'tokyo52-ep01-day7'] as const;

/**
 * Find the conversation line index where an expression is spoken by its speaker.
 * Returns the array index or -1 if not found.
 */
export function findTokyo52Ep01ExpressionLineIndex(
    expression: string,
    speaker: string,
    conversationLines: Array<{ speaker: string; text: string }>
): number {
    const exprLower = expression.toLowerCase();
    return conversationLines.findIndex(line => {
        const textLower = line.text.toLowerCase();
        return textLower.includes(exprLower) && textLower.toLowerCase().includes(speaker.toLowerCase());
    });
}
