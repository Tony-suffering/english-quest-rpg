/**
 * Thanksgiving Expressions -- casual expressions from Thanksgiving Dinner scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Grandma Lorraine(74F), Rick(48M), Carol(46F), Aunt Pam(52F),
 *   Spencer(19M), Brianna(16F), Uncle Lou(55M), Grandpa Stan(76M)
 */

export interface ThanksgivingExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const THANKSGIVING_EXPRESSIONS: ThanksgivingExpression[] = [
    // ============================================================
    // DAY 1 -- THE ARRIVALS (15 expressions)
    // ============================================================
    { expression: "get out of the cold", meaning: "寒いから中に入って", meaningEn: "telling someone to come inside away from cold weather", day: 1, speaker: "Grandma Lorraine", example: "Come in, come in, get out of the cold -- and Rick, honey, what on earth is that giant metal pot in your trunk?" },
    { expression: "what on earth", meaning: "一体なんなの", meaningEn: "emphatic way to ask what something is, showing surprise", day: 1, speaker: "Grandma Lorraine", example: "Rick, honey, what on earth is that giant metal pot in your trunk?" },
    { expression: "Absolutely not", meaning: "絶対にダメ", meaningEn: "a firm, total refusal of something", day: 1, speaker: "Grandma Lorraine", example: "Absolutely not. In MY house we roast the turkey, the way we have for thirty-two years." },
    { expression: "I'll explain it later", meaning: "後で説明するわ", meaningEn: "postponing an explanation when there's no time now", day: 1, speaker: "Carol", example: "I brought a deconstructed green bean casserole, I'll explain it later." },
    { expression: "The whole point is", meaning: "意味なのは～", meaningEn: "stating the essential reason something exists or matters", day: 1, speaker: "Aunt Pam", example: "Carol, it's a casserole. The whole point is that it's all in one dish." },
    { expression: "I'm asking for me", meaning: "自分のために聞いてるの", meaningEn: "joking that a question is purely about your own needs", day: 1, speaker: "Aunt Pam", example: "Mom, is the wine open? I'm asking for me." },
    { expression: "I'll get it myself", meaning: "自分で取ってくる", meaningEn: "deciding to do something yourself rather than wait", day: 1, speaker: "Aunt Pam", example: "I have been divorced for six weeks, Mom, so the wine is open. I'll get it myself." },
    { expression: "by the way", meaning: "ちなみに", meaningEn: "introducing an aside or extra piece of information", day: 1, speaker: "Brianna", example: "I'm filming all of this, by the way." },
    { expression: "I should probably mention something", meaning: "ひとつ言っといたほうがいい", meaningEn: "softly leading into news you've been holding back", day: 1, speaker: "Spencer", example: "Before we get to the food, I should probably mention something." },
    { expression: "I'm not trying to make it a thing", meaning: "大事にするつもりはない", meaningEn: "downplaying something so it doesn't become a big issue", day: 1, speaker: "Spencer", example: "I know, and I'm not trying to make it a thing, I just -- I didn't want to surprise everybody." },
    { expression: "I'll eat sides", meaning: "サイドを食べるから", meaningEn: "settling for the side dishes instead of the main", day: 1, speaker: "Spencer", example: "I'll eat sides. It's fine. Mostly sides aren't a problem, right?" },
    { expression: "Welcome home", meaning: "おかえりなさい", meaningEn: "greeting someone returning home, here said with dry sarcasm", day: 1, speaker: "Aunt Pam", example: "The rolls have egg. Welcome home, sweetie." },
    { expression: "the whole gang's here", meaning: "みんな揃ってる", meaningEn: "cheerfully noting that everyone has gathered", day: 1, speaker: "Uncle Lou", example: "Hey, hey, the whole gang's here!" },
    { expression: "That came out wrong", meaning: "言い方が悪かった", meaningEn: "admitting you phrased something badly right after saying it", day: 1, speaker: "Uncle Lou", example: "Divorce agrees with you. That came out wrong. Happy Thanksgiving, everybody." },
    { expression: "nowhere else to go", meaning: "他に行くところがない", meaningEn: "having no other place or option available", day: 1, speaker: "Grandma Lorraine", example: "Lou has nowhere else to go, Pam, and it is Thanksgiving." },

    // ============================================================
    // DAY 2 -- THE KITCHEN (15 expressions)
    // ============================================================
    { expression: "hand me that", meaning: "それ取って", meaningEn: "asking someone to pass you an object", day: 2, speaker: "Grandma Lorraine", example: "Pam, hand me that bucket -- careful, careful, the turkey's been sitting in the brine since yesterday morning." },
    { expression: "I've never understood it", meaning: "昔から意味がわからない", meaningEn: "expressing long-standing confusion about something", day: 2, speaker: "Aunt Pam", example: "Mom, you brine this thing for, what, eighteen hours? I've never understood it." },
    { expression: "Trust me", meaning: "信じて", meaningEn: "asking someone to believe you without proof", day: 2, speaker: "Grandma Lorraine", example: "It cares, Pam. Trust me. Thirty-two years of moist turkey." },
    { expression: "You don't argue with results", meaning: "結果には逆らえない", meaningEn: "saying that proven outcomes settle any debate", day: 2, speaker: "Grandma Lorraine", example: "Thirty-two years of moist turkey. You don't argue with results." },
    { expression: "Speaking of results", meaning: "結果といえば", meaningEn: "transitioning to a new topic that links to the last word said", day: 2, speaker: "Rick", example: "Speaking of results -- I'm setting the fryer up in the backyard." },
    { expression: "We talked about this", meaning: "これ話し合ったでしょ", meaningEn: "reminding someone of a prior conversation they're ignoring", day: 2, speaker: "Carol", example: "Rick, nobody agreed to the fryer. We talked about this in the car for forty minutes." },
    { expression: "There's a difference", meaning: "そこが違う", meaningEn: "insisting two similar things are actually not the same", day: 2, speaker: "Rick", example: "We didn't agree NOT to do it. There's a difference." },
    { expression: "I'm just saying", meaning: "一応言っとくね", meaningEn: "softening a remark you still want to make your point with", day: 2, speaker: "Brianna", example: "Turkey fryers cause something like a thousand fires every Thanksgiving. I'm just saying." },
    { expression: "I feel kind of useless", meaning: "役立たずな気がする", meaningEn: "feeling unhelpful or like you have nothing to do", day: 2, speaker: "Spencer", example: "Can I help with anything that doesn't have meat in it? I feel kind of useless just standing here." },
    { expression: "That one's all you", meaning: "あれは完全にあなた担当", meaningEn: "telling someone a task is entirely theirs to handle", day: 2, speaker: "Carol", example: "You could do the cranberry sauce. That one's all you. That's a vegan win." },
    { expression: "that's all I wanted", meaning: "それだけが欲しかった", meaningEn: "expressing relief that a small wish was finally met", day: 2, speaker: "Spencer", example: "Thank you, that's -- that's all I wanted, just one thing I can actually eat." },
    { expression: "how are you holding up", meaning: "大丈夫？/持ちこたえてる？", meaningEn: "asking how someone is coping during a hard time", day: 2, speaker: "Aunt Pam", example: "Not one person has said, Pam, how are you holding up." },
    { expression: "Old habits", meaning: "昔からの癖でね", meaningEn: "explaining behavior as a hard-to-break long-time habit", day: 2, speaker: "Uncle Lou", example: "Twenty-six years, every Thanksgiving, I did the basting. Old habits, you know?" },
    { expression: "it's hard for YOU", meaning: "あなたがつらいの", meaningEn: "sarcastically flipping a complaint back at the speaker", day: 2, speaker: "Aunt Pam", example: "Oh, it's hard for YOU. That's -- okay. Mom, the wine." },
    { expression: "this is happening", meaning: "これは決定だ", meaningEn: "declaring something is going forward no matter what", day: 2, speaker: "Rick", example: "Okay, I am taking the bird outside, this is happening, somebody bring me a lighter." },

    // ============================================================
    // DAY 3 -- THE DINNER TABLE (15 expressions)
    // ============================================================
    { expression: "Do we have to", meaning: "やらなきゃダメ？", meaningEn: "reluctantly questioning whether something is required", day: 3, speaker: "Aunt Pam", example: "Do we have to? Mom. We're all tired. The turkey's getting cold." },
    { expression: "We came so close", meaning: "あと一歩だった", meaningEn: "lamenting that you nearly succeeded at something", day: 3, speaker: "Rick", example: "We came so close. The fryer is still in the backyard." },
    { expression: "That's all I need", meaning: "それだけで十分", meaningEn: "saying one simple thing is completely enough for you", day: 3, speaker: "Grandma Lorraine", example: "Every chair at this table is full. That's it. That's all I need." },
    { expression: "I'll go", meaning: "僕が言うよ/僕の番", meaningEn: "volunteering to take your turn next", day: 3, speaker: "Uncle Lou", example: "That's beautiful, Lorraine. I'll go." },
    { expression: "didn't work out", meaning: "うまくいかなかった", meaningEn: "describing a relationship or plan that failed", day: 3, speaker: "Uncle Lou", example: "Even though Pam and I didn't work out, I still get to be part of this family." },
    { expression: "For the record", meaning: "念のため言っとくけど", meaningEn: "stating something officially so it's clearly noted", day: 3, speaker: "Brianna", example: "For the record, I'm filming, and this is the best Thanksgiving we've ever had." },
    { expression: "leaning on it pretty hard", meaning: "かなり頼りにしてる", meaningEn: "relying heavily on one limited thing", day: 3, speaker: "Spencer", example: "The only thing on this entire table I can eat, so -- I'm leaning on it pretty hard." },
    { expression: "that's not true", meaning: "それは違う", meaningEn: "correcting a statement you think is mistaken", day: 3, speaker: "Carol", example: "Spencer, that's not true, the salad is vegan -- wait, no, I put parmesan on the salad." },
    { expression: "You said that yesterday", meaning: "昨日自分で言ってた", meaningEn: "reminding someone they already told you this", day: 3, speaker: "Spencer", example: "The rolls have egg, Mom. You said that yesterday." },
    { expression: "I'm so sorry", meaning: "本当にごめんなさい", meaningEn: "a heartfelt apology for letting someone down", day: 3, speaker: "Carol", example: "Spencer, I'm so sorry, I'm thankful for you and I have completely failed you." },
    { expression: "walk on eggshells", meaning: "気を遣って慎重になる", meaningEn: "being extremely careful to avoid upsetting someone", day: 3, speaker: "Aunt Pam", example: "I finally know what it feels like to not walk on eggshells in my own house." },
    { expression: "I sleep like a baby", meaning: "ぐっすり眠れてる", meaningEn: "saying you sleep deeply and peacefully", day: 3, speaker: "Aunt Pam", example: "Six weeks and I sleep like a baby." },
    { expression: "That's the worst part", meaning: "それが一番つらい", meaningEn: "pointing to the most painful detail of a situation", day: 3, speaker: "Aunt Pam", example: "I know you didn't, Lou. That's the worst part. You never meant to." },
    { expression: "let's eat", meaning: "食べましょう", meaningEn: "defusing tension by moving on to the meal", day: 3, speaker: "Grandma Lorraine", example: "Okay. Okay. Let's just -- let's eat." },
    { expression: "keep my mouth full and my opinions empty", meaning: "口は食べ物で、意見は空っぽに", meaningEn: "humorously choosing to eat quietly and not share opinions", day: 3, speaker: "Grandpa Stan", example: "The best thing to do at this table is keep my mouth full and my opinions empty." },

    // ============================================================
    // DAY 4 -- THE FOOTBALL & THE FALLOUT (15 expressions)
    // ============================================================
    { expression: "this is my window", meaning: "今がチャンスだ", meaningEn: "recognizing a brief opportunity to act", day: 4, speaker: "Rick", example: "Mom's doing dishes -- this is my window. The fryer window is open again." },
    { expression: "What are you going to fry", meaning: "何を揚げるつもり", meaningEn: "challenging a plan by pointing out it makes no sense", day: 4, speaker: "Brianna", example: "There is no bird to fry. What are you going to fry?" },
    { expression: "For science", meaning: "科学のために", meaningEn: "jokingly justifying a dumb experiment as research", day: 4, speaker: "Rick", example: "I bought a second turkey, Brianna. A small one. For science. For the experience." },
    { expression: "the most unhinged thing", meaning: "一番イカれてる発言", meaningEn: "calling something the wildest, most absurd thing said", day: 4, speaker: "Brianna", example: "That is genuinely the most unhinged thing you've ever said." },
    { expression: "Back up", meaning: "下がって", meaningEn: "urgently telling people to move away from danger", day: 4, speaker: "Uncle Lou", example: "Whoa, whoa, whoa. Back up, everybody back up." },
    { expression: "It's fine, it's fine", meaning: "大丈夫、大丈夫", meaningEn: "reassuring others while clearly panicking yourself", day: 4, speaker: "Rick", example: "It's fine, it's fine -- okay, that's a bigger flame than the videos." },
    { expression: "I'm not even surprised", meaning: "別に驚いてもない", meaningEn: "saying a bad outcome was completely predictable", day: 4, speaker: "Aunt Pam", example: "I'm not even surprised, I just want it on the record that I'm not surprised." },
    { expression: "I told you", meaning: "言ったでしょ", meaningEn: "pointing out you warned someone and were right", day: 4, speaker: "Grandma Lorraine", example: "RICHARD. I told you. I told you in this very house." },
    { expression: "Whatever you need", meaning: "なんでも言って", meaningEn: "offering to do anything someone asks of you", day: 4, speaker: "Uncle Lou", example: "Okay. Yeah. Whatever you need, Pam." },
    { expression: "say that out loud", meaning: "声に出して言う", meaningEn: "expressing something verbally instead of keeping it inside", day: 4, speaker: "Aunt Pam", example: "I just needed to say that out loud, to your face, one time." },
    { expression: "for what it's worth", meaning: "参考までに", meaningEn: "humbly offering an opinion that may or may not help", day: 4, speaker: "Uncle Lou", example: "And for what it's worth -- you basting that turkey today felt more normal than the last two years of our marriage." },
    { expression: "Don't make it weird", meaning: "変な空気にしないで", meaningEn: "asking someone not to make a moment awkward", day: 4, speaker: "Aunt Pam", example: "It kind of did, didn't it. Don't make it weird, Lou." },
    { expression: "Too late", meaning: "手遅れだ", meaningEn: "joking that something has already happened, can't be undone", day: 4, speaker: "Uncle Lou", example: "Too late, I already made it weird, I always make it weird." },
    { expression: "fun fact", meaning: "ちょっとした事実なんだけど", meaningEn: "playfully introducing a surprising piece of information", day: 4, speaker: "Brianna", example: "So, fun fact, I've been filming this entire kitchen conversation from the hallway." },
    { expression: "Delete that", meaning: "それ消して", meaningEn: "demanding someone erase a recording or message", day: 4, speaker: "Aunt Pam", example: "Brianna. Delete that. -- Actually. No. Keep it." },

    // ============================================================
    // DAY 5 -- LEFTOVERS & GOODBYES (15 expressions)
    // ============================================================
    { expression: "I tried", meaning: "頑張ったのよ", meaningEn: "admitting an effort fell short despite good intentions", day: 5, speaker: "Grandma Lorraine", example: "Spencer, honey, yours is just cranberry sauce and bread. I'm sorry. I tried." },
    { expression: "more than I expected", meaning: "思ってたより多い", meaningEn: "being pleasantly surprised it's better than anticipated", day: 5, speaker: "Spencer", example: "Grandma, that's -- honestly that's more than I expected." },
    { expression: "given everybody a heads-up", meaning: "みんなに前もって伝える", meaningEn: "warning people in advance so they aren't caught off guard", day: 5, speaker: "Spencer", example: "I should have given everybody a heads-up. That part's on me." },
    { expression: "That part's on me", meaning: "そこは僕の責任だ", meaningEn: "taking personal responsibility for a specific mistake", day: 5, speaker: "Spencer", example: "I should have given everybody a heads-up. That part's on me." },
    { expression: "We'll figure it out", meaning: "一緒に考えましょう", meaningEn: "reassuring someone that a solution will come in time", day: 5, speaker: "Grandma Lorraine", example: "We'll figure it out, sweetheart. I've got a whole year to learn what a vegan eats." },
    { expression: "Low blow", meaning: "ひどい一撃", meaningEn: "complaining that a remark was an unfair, hurtful jab", day: 5, speaker: "Rick", example: "Low blow, Mom. I'm a changed man. The fryer is in the trash." },
    { expression: "I'm a changed man", meaning: "僕は変わった男だ", meaningEn: "claiming, often jokingly, that you've reformed", day: 5, speaker: "Rick", example: "Low blow, Mom. I'm a changed man. The fryer is in the trash." },
    { expression: "I left out the fire", meaning: "火事は外した", meaningEn: "deciding to omit a part when editing or telling something", day: 5, speaker: "Brianna", example: "I edited the video down to four minutes. I left out the fire." },
    { expression: "the best part", meaning: "一番いいところ", meaningEn: "calling out the most enjoyable element of something", day: 5, speaker: "Aunt Pam", example: "You left the good stuff out? The fire was the best part." },
    { expression: "I should head out", meaning: "そろそろ行くよ", meaningEn: "politely announcing that you're about to leave", day: 5, speaker: "Uncle Lou", example: "Well -- I should head out. Lorraine, thank you. Really." },
    { expression: "You're family", meaning: "あなたは家族よ", meaningEn: "warmly insisting someone belongs no matter what", day: 5, speaker: "Grandma Lorraine", example: "You're family, Lou. Divorce papers don't change thirty years." },
    { expression: "text me first", meaning: "先に連絡して", meaningEn: "asking someone to message ahead before showing up", day: 5, speaker: "Aunt Pam", example: "Just text me first so it's not a whole surprise thing again." },
    { expression: "the way it's supposed to be", meaning: "本来あるべき形で", meaningEn: "describing something done in its proper, expected way", day: 5, speaker: "Carol", example: "One dish. Everything in it. The way it's supposed to be." },
    { expression: "come here", meaning: "こっちに来て", meaningEn: "calling someone over, often for a hug or closeness", day: 5, speaker: "Grandma Lorraine", example: "Now THAT is what I'm thankful for. Carol, come here." },
    { expression: "drive safe", meaning: "安全に運転して", meaningEn: "a caring farewell wishing someone a safe trip home", day: 5, speaker: "Grandma Lorraine", example: "Now everybody drive safe and text me when you get home." },
];

export const THANKSGIVING_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_THANKSGIVING_EXPRESSIONS = THANKSGIVING_EXPRESSIONS.length;

export const THANKSGIVING_DAY_IDS: Record<number, string> = {
    1: 'thanksgiving-day1',
    2: 'thanksgiving-day2',
    3: 'thanksgiving-day3',
    4: 'thanksgiving-day4',
    5: 'thanksgiving-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findThanksgivingExpressionLineIndex(
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
