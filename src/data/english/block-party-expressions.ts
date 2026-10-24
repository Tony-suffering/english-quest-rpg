/**
 * Block Party Expressions -- casual expressions from Neighborhood Block Party Gone Wrong
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 * Characters: Donna(55F), Marcus(34M), Leticia(42F), Reggie(68M), Bri(28F), Tommy(16M), Pastor Jim(60M), Keiko(38F)
 */

export interface BlockPartyExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const BLOCK_PARTY_EXPRESSIONS: BlockPartyExpression[] = [
    // ============================================================
    // DAY 1 -- THE SETUP (15 expressions)
    // Morning prep, setup chaos, clipboard tyranny
    // ============================================================
    { expression: "let's get this show on the road", meaning: "さあ始めよう", meaningEn: "let's get started, time to begin", day: 1, speaker: "Donna", example: "It's already seven thirty. Let's get this show on the road, people." },
    { expression: "who died and made you boss", meaning: "何様のつもり", meaningEn: "who put you in charge, you're being too bossy", day: 1, speaker: "Tommy", example: "Who died and made you boss? I just got out of bed." },
    { expression: "that's not gonna fly", meaning: "それは通らない", meaningEn: "that won't be accepted, that's not going to work", day: 1, speaker: "Donna", example: "Paper plates at MY block party? That's not gonna fly." },
    { expression: "I'm just saying", meaning: "言ってみただけ", meaningEn: "I'm just pointing it out, no offense intended", day: 1, speaker: "Reggie", example: "Last year the potato salad sat in the sun for four hours. I'm just saying." },
    { expression: "you're overthinking it", meaning: "考えすぎだよ", meaningEn: "you're making it more complicated than it needs to be", day: 1, speaker: "Marcus", example: "It's a taco truck, not a Michelin dinner. You're overthinking it." },
    { expression: "fair enough", meaning: "まあそうだね", meaningEn: "that's a reasonable point, I accept that", day: 1, speaker: "Keiko", example: "Fair enough. I'll move the sign-up sheet inside." },
    { expression: "bright and early", meaning: "朝早くから", meaningEn: "very early in the morning", day: 1, speaker: "Pastor Jim", example: "The Lord blessed us with a beautiful day, and here we are bright and early." },
    { expression: "not my problem", meaning: "俺の知ったことじゃない", meaningEn: "that's your issue to deal with, not mine", day: 1, speaker: "Tommy", example: "The extension cord's too short? Not my problem." },
    { expression: "on the same page", meaning: "認識が一致している", meaningEn: "in agreement, sharing the same understanding", day: 1, speaker: "Donna", example: "I need everyone on the same page before the guests arrive." },
    { expression: "what's the worst that could happen", meaning: "最悪何が起きる?", meaningEn: "it can't be that bad, let's just do it", day: 1, speaker: "Marcus", example: "I'll park the truck on the grass. What's the worst that could happen?" },
    { expression: "you've got to be kidding me", meaning: "冗談でしょ", meaningEn: "I can't believe this, you must be joking", day: 1, speaker: "Donna", example: "You've got to be kidding me. The banner says 'Blcok Party.'" },
    { expression: "leave it to me", meaning: "任せて", meaningEn: "I'll handle it, you can count on me", day: 1, speaker: "Leticia", example: "The energy here is tense. Leave it to me. I'll sage the perimeter." },
    { expression: "with all due respect", meaning: "失礼ながら", meaningEn: "politely disagreeing with someone", day: 1, speaker: "Reggie", example: "With all due respect, Donna, we've been setting up block parties since before you moved here." },
    { expression: "can we not", meaning: "やめてくれない?", meaningEn: "please stop doing that, I don't want to deal with this", day: 1, speaker: "Tommy", example: "Can we not do the matching aprons thing? Please?" },
    { expression: "for the love of God", meaning: "お願いだから", meaningEn: "expression of exasperation or desperate plea", day: 1, speaker: "Donna", example: "For the love of God, Tommy, put your phone down and help." },

    // ============================================================
    // DAY 2 -- PEAK HOURS (15 expressions)
    // Party in full swing, food truck drama, social media
    // ============================================================
    { expression: "in full swing", meaning: "盛り上がり中", meaningEn: "at the peak of activity, fully underway", day: 2, speaker: "Reggie", example: "Looks like the party's in full swing. Just like '94." },
    { expression: "say less", meaning: "了解、任せて", meaningEn: "I understand completely, no more explanation needed", day: 2, speaker: "Bri", example: "Tacos with a gold drizzle? Say less. I need that in my content." },
    { expression: "I rest my case", meaning: "ほら言った通り", meaningEn: "that proves my point, no further argument needed", day: 2, speaker: "Donna", example: "See? The line's around the block. I rest my case about the food truck." },
    { expression: "the more the merrier", meaning: "多いほど楽しい", meaningEn: "additional people are welcome, bigger is better", day: 2, speaker: "Pastor Jim", example: "Bring the whole family. The more the merrier, I always say." },
    { expression: "no shade", meaning: "悪気はないけど", meaningEn: "no disrespect intended, but here's my honest opinion", day: 2, speaker: "Bri", example: "No shade, but Donna's potato salad is giving cafeteria vibes." },
    { expression: "that's a stretch", meaning: "それは無理がある", meaningEn: "that's an exaggeration or unlikely claim", day: 2, speaker: "Marcus", example: "Calling my truck a fire hazard? That's a stretch." },
    { expression: "back in the day", meaning: "昔はさ", meaningEn: "in the past, when things were different", day: 2, speaker: "Reggie", example: "Back in the day, we didn't need permits for a block party. You just did it." },
    { expression: "you do you", meaning: "好きにすれば", meaningEn: "do whatever you want, I won't judge", day: 2, speaker: "Tommy", example: "You want to hula hoop in the street? You do you." },
    { expression: "it's giving", meaning: "~って感じ", meaningEn: "it has the vibe or energy of something", day: 2, speaker: "Bri", example: "This whole setup is giving neighborhood cookout goals." },
    { expression: "speak of the devil", meaning: "噂をすれば", meaningEn: "the person we were talking about just showed up", day: 2, speaker: "Keiko", example: "Speak of the devil. Donna's heading this way with her clipboard." },
    { expression: "between you and me", meaning: "ここだけの話", meaningEn: "this is confidential, just for us", day: 2, speaker: "Reggie", example: "Between you and me, I think she's losing it over the napkin colors." },
    { expression: "at the end of the day", meaning: "結局のところ", meaningEn: "ultimately, when everything is considered", day: 2, speaker: "Pastor Jim", example: "At the end of the day, it's about community, not the decorations." },
    { expression: "get with the program", meaning: "ちゃんとやれ", meaningEn: "start cooperating, follow the plan already", day: 2, speaker: "Donna", example: "The schedule is on the clipboard. Get with the program." },
    { expression: "living my best life", meaning: "最高に楽しんでる", meaningEn: "fully enjoying life, thriving right now", day: 2, speaker: "Leticia", example: "Sun on my face, lavender lemonade in hand. I'm living my best life." },
    { expression: "that hit different", meaning: "格別だった", meaningEn: "that had a special or unexpected emotional impact", day: 2, speaker: "Marcus", example: "Reggie telling that story about the '94 party? That hit different." },

    // ============================================================
    // DAY 3 -- THE POWER OUTAGE (15 expressions)
    // Smoke, darkness, Leticia meditating in the road
    // ============================================================
    { expression: "what in the world", meaning: "一体何が", meaningEn: "expression of surprise or confusion", day: 3, speaker: "Keiko", example: "What in the world just happened? Everything went dark." },
    { expression: "stay calm", meaning: "落ち着いて", meaningEn: "don't panic, remain composed", day: 3, speaker: "Pastor Jim", example: "Stay calm, everyone. The Lord provides, even in darkness." },
    { expression: "this is fine", meaning: "大丈夫(嘘)", meaningEn: "sarcastic reassurance when things are clearly not fine", day: 3, speaker: "Tommy", example: "Power's out, something's smoking, and Mom's screaming. This is fine." },
    { expression: "I saw this coming", meaning: "こうなると思った", meaningEn: "I predicted this would happen", day: 3, speaker: "Reggie", example: "I saw this coming. That generator's been on its last legs since 2019." },
    { expression: "you're on thin ice", meaning: "いい加減にしろよ", meaningEn: "you're close to getting in serious trouble", day: 3, speaker: "Donna", example: "Whoever plugged in the third bouncy castle, you're on thin ice." },
    { expression: "be that as it may", meaning: "それはそうだけど", meaningEn: "even though that's true, there's another point to consider", day: 3, speaker: "Keiko", example: "Be that as it may, we still need to figure out the food situation." },
    { expression: "let it go", meaning: "もういいじゃん", meaningEn: "stop worrying about it, move on", day: 3, speaker: "Marcus", example: "The banner's crooked again? Just let it go, Donna." },
    { expression: "hear me out", meaning: "最後まで聞いて", meaningEn: "listen to my whole idea before judging", day: 3, speaker: "Leticia", example: "Hear me out. What if the power outage is the universe telling us to unplug?" },
    { expression: "hard pass", meaning: "絶対嫌", meaningEn: "firm refusal, absolutely not", day: 3, speaker: "Tommy", example: "Meditating in the middle of the road? Hard pass." },
    { expression: "I'm losing my mind", meaning: "頭おかしくなりそう", meaningEn: "I'm going crazy from stress or frustration", day: 3, speaker: "Donna", example: "The ice is melting, the speakers are dead, and I'm losing my mind." },
    { expression: "get a grip", meaning: "しっかりしろ", meaningEn: "pull yourself together, stop overreacting", day: 3, speaker: "Reggie", example: "Get a grip, Donna. We survived the blackout of '03." },
    { expression: "makes sense", meaning: "なるほどね", meaningEn: "that's logical, I understand now", day: 3, speaker: "Marcus", example: "So the generator tripped the whole block? Makes sense." },
    { expression: "for what it's worth", meaning: "参考までに", meaningEn: "this may not matter much, but here's my thought", day: 3, speaker: "Keiko", example: "For what it's worth, I have candles and a camping stove in my garage." },
    { expression: "not the time", meaning: "今じゃない", meaningEn: "this is an inappropriate moment for that", day: 3, speaker: "Donna", example: "Bri, this is not the time for a selfie." },
    { expression: "we'll figure it out", meaning: "なんとかなるよ", meaningEn: "we'll find a solution, don't worry", day: 3, speaker: "Pastor Jim", example: "Power or no power, we'll figure it out. We always do." },

    // ============================================================
    // DAY 4 -- THE BOUNCE HOUSE INCIDENT (15 expressions)
    // Fire, blame game, HOA threats, chaos
    // ============================================================
    { expression: "whose bright idea was this", meaning: "誰のせいだよ", meaningEn: "sarcastic way of asking who came up with a bad plan", day: 4, speaker: "Reggie", example: "Three bounce houses next to a grill. Whose bright idea was this?" },
    { expression: "don't look at me", meaning: "俺じゃないよ", meaningEn: "I'm not responsible, don't blame me", day: 4, speaker: "Tommy", example: "Don't look at me. I said the extension cord was sketchy." },
    { expression: "we need to talk", meaning: "話がある", meaningEn: "there's a serious matter to discuss", day: 4, speaker: "Donna", example: "Marcus, we need to talk about your grill placement." },
    { expression: "that escalated quickly", meaning: "急に大事になった", meaningEn: "the situation got serious or intense very fast", day: 4, speaker: "Bri", example: "One spark and now there's a fire truck. That escalated quickly." },
    { expression: "just so we're clear", meaning: "はっきりさせとくけど", meaningEn: "I want to make sure there's no misunderstanding", day: 4, speaker: "Donna", example: "Just so we're clear, the HOA WILL be hearing about this." },
    { expression: "in my defense", meaning: "弁解させてもらうと", meaningEn: "let me explain my side of the story", day: 4, speaker: "Marcus", example: "In my defense, the wind shifted. Nobody could have predicted that." },
    { expression: "it could be worse", meaning: "もっとひどくなり得た", meaningEn: "the situation isn't as bad as it seems", day: 4, speaker: "Pastor Jim", example: "Nobody's hurt, the fire's out. It could be worse." },
    { expression: "that's on you", meaning: "それはあなたのせい", meaningEn: "you're responsible for that, it's your fault", day: 4, speaker: "Donna", example: "I told you to move the grill. That's on you, Marcus." },
    { expression: "take it down a notch", meaning: "少し落ち着いて", meaningEn: "calm down, reduce the intensity", day: 4, speaker: "Keiko", example: "Donna, take it down a notch. Everyone's watching." },
    { expression: "let's not point fingers", meaning: "犯人探しはやめよう", meaningEn: "stop blaming each other, focus on solutions", day: 4, speaker: "Pastor Jim", example: "Let's not point fingers. We're all in this together." },
    { expression: "I told you so", meaning: "だから言ったじゃん", meaningEn: "I warned you about this and I was right", day: 4, speaker: "Reggie", example: "I told you so. That grill was too close from the start." },
    { expression: "are you serious right now", meaning: "今マジで言ってる?", meaningEn: "I can't believe you're doing or saying that", day: 4, speaker: "Donna", example: "You're posting this? Are you serious right now, Bri?" },
    { expression: "on the bright side", meaning: "良い面を見ると", meaningEn: "looking at the positive aspect of a bad situation", day: 4, speaker: "Leticia", example: "On the bright side, the fire cleansed the negative energy from this block." },
    { expression: "read the room", meaning: "空気読めよ", meaningEn: "pay attention to the social situation and react appropriately", day: 4, speaker: "Keiko", example: "Leticia, read the room. People are crying." },
    { expression: "I've had it", meaning: "もう限界", meaningEn: "I've reached my breaking point, I can't take any more", day: 4, speaker: "Donna", example: "The bounce house is melted, the HOA's calling, and I've had it." },

    // ============================================================
    // DAY 5 -- THE MORNING AFTER (15 expressions)
    // Cleanup, bonding, unexpected warmth
    // ============================================================
    { expression: "what a mess", meaning: "めちゃくちゃだね", meaningEn: "the situation or place is in total disarray", day: 5, speaker: "Keiko", example: "What a mess. There's barbecue sauce on the mailbox." },
    { expression: "no hard feelings", meaning: "恨みっこなし", meaningEn: "I'm not upset with you, let's move past it", day: 5, speaker: "Marcus", example: "Donna, no hard feelings about yesterday, OK?" },
    { expression: "water under the bridge", meaning: "済んだことだよ", meaningEn: "it's in the past, let's forget about it", day: 5, speaker: "Reggie", example: "The bounce house thing? Water under the bridge." },
    { expression: "I owe you one", meaning: "借りができたね", meaningEn: "I'm grateful and will return the favor someday", day: 5, speaker: "Donna", example: "Keiko, for bringing those candles last night, I owe you one." },
    { expression: "same here", meaning: "こっちもだよ", meaningEn: "I feel the same way, me too", day: 5, speaker: "Tommy", example: "You actually had fun? Same here. Don't tell Mom I said that." },
    { expression: "it's the thought that counts", meaning: "気持ちが大事", meaningEn: "the intention matters more than the result", day: 5, speaker: "Pastor Jim", example: "The party didn't go as planned, but it's the thought that counts." },
    { expression: "my bad", meaning: "俺が悪かった", meaningEn: "my mistake, I'm sorry for that", day: 5, speaker: "Marcus", example: "My bad about the grill. I should have listened." },
    { expression: "all things considered", meaning: "総合的に見ると", meaningEn: "taking everything into account", day: 5, speaker: "Keiko", example: "All things considered, it wasn't the worst block party ever." },
    { expression: "I'll give you that", meaning: "それは認める", meaningEn: "I'll concede that point, you're right about that", day: 5, speaker: "Donna", example: "Your tacos were incredible. I'll give you that." },
    { expression: "who would've thought", meaning: "まさかね", meaningEn: "that was completely unexpected", day: 5, speaker: "Reggie", example: "Who would've thought a burnt bounce house would bring us together?" },
    { expression: "end of the world", meaning: "世界の終わり", meaningEn: "a dramatic exaggeration of a bad outcome (usually negative)", day: 5, speaker: "Tommy", example: "The HOA sends a fine. It's not the end of the world, Mom." },
    { expression: "hand it to you", meaning: "あなたはすごい", meaningEn: "give you credit, acknowledge your achievement", day: 5, speaker: "Reggie", example: "Donna, I gotta hand it to you. You don't quit." },
    { expression: "that means a lot", meaning: "嬉しいよ", meaningEn: "I really appreciate what you said or did", day: 5, speaker: "Donna", example: "You stayed to help clean up. That means a lot, Marcus." },
    { expression: "next time", meaning: "次こそは", meaningEn: "we'll do better or try again in the future", day: 5, speaker: "Leticia", example: "Next time, we align the bounce houses with the wind patterns." },
    { expression: "wouldn't miss it", meaning: "絶対行くよ", meaningEn: "I'll definitely be there, I wouldn't skip it", day: 5, speaker: "Marcus", example: "Next year's block party? Wouldn't miss it." },
];

export const TOTAL_BLOCK_PARTY_EXPRESSIONS = 75;
export const BLOCK_PARTY_EXPRESSIONS_PER_DAY = 15;

export const BLOCK_PARTY_DAY_IDS: Record<number, string> = {
    1: 'blockparty-day1',
    2: 'blockparty-day2',
    3: 'blockparty-day3',
    4: 'blockparty-day4',
    5: 'blockparty-day5',
};

export function findBlockPartyExpressionLineIndex(
    expression: string,
    speaker: string,
    lines: Array<{ speaker: string; text: string }>
): number {
    const speakerName = speaker.split(' ')[0];
    return lines.findIndex(l => {
        const lineSpeaker = l.text.split(':')[0]?.trim();
        return lineSpeaker === speakerName && l.text.toLowerCase().includes(expression.toLowerCase().split(' ')[0]);
    });
}
