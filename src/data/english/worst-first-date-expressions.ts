/**
 * Worst First Date Expressions -- casual expressions from Worst First Date scenario
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 * Characters: Jake(28M), Chloe(26F), Nate(29M), Sasha(27F), Marco(55M), Lydia(42F)
 */

export interface WorstFirstDateExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const WORST_FIRST_DATE_EXPRESSIONS: WorstFirstDateExpression[] = [
    // ============================================================
    // DAY 1 -- THE ARRIVAL (15 expressions)
    // ============================================================
    { expression: "I got here way too early", meaning: "早く着きすぎた", meaningEn: "arrived much earlier than necessary", day: 1, speaker: "Jake", example: "I got here way too early, so I've just been walking around the block like a weirdo." },
    { expression: "you look exactly like your photos", meaning: "写真通りだね", meaningEn: "your appearance matches your profile pictures", day: 1, speaker: "Jake", example: "Oh wow, you look exactly like your photos. That's... honestly a relief." },
    { expression: "this is so not how I planned this", meaning: "全然予定通りじゃない", meaningEn: "things are going completely differently from what I intended", day: 1, speaker: "Jake", example: "This is so not how I planned this. The restaurant lost our reservation." },
    { expression: "should we just go somewhere else", meaning: "別のところ行かない？", meaningEn: "suggesting to leave and find another place", day: 1, speaker: "Chloe", example: "Should we just go somewhere else? I'm honestly fine with anything." },
    { expression: "I'm so bad at this", meaning: "こういうの本当苦手", meaningEn: "I lack skill or confidence in this situation", day: 1, speaker: "Jake", example: "I'm so bad at this. First dates make me a completely different person." },
    { expression: "no pressure or anything", meaning: "別にプレッシャーかけてないけど", meaningEn: "said ironically to acknowledge the obvious pressure", day: 1, speaker: "Chloe", example: "So, tell me everything about yourself. No pressure or anything." },
    { expression: "that came out wrong", meaning: "今の言い方おかしかった", meaningEn: "what I just said was unintentionally weird or rude", day: 1, speaker: "Jake", example: "Wait, that came out wrong. I didn't mean it like that." },
    { expression: "I'll take what I can get", meaning: "贅沢は言えない", meaningEn: "I'll accept whatever option is available", day: 1, speaker: "Chloe", example: "A buffet? At this point I'll take what I can get. I'm starving." },
    { expression: "off to a great start", meaning: "幸先いいね（皮肉）", meaningEn: "sarcastic remark when things are already going badly", day: 1, speaker: "Chloe", example: "Lost reservation, mystery buffet... we're off to a great start." },
    { expression: "just go with it", meaning: "もう流れに任せよう", meaningEn: "accept the situation and stop worrying about it", day: 1, speaker: "Chloe", example: "You know what? Let's just go with it. Could be fun." },
    { expression: "I almost didn't come", meaning: "来るか迷った", meaningEn: "I nearly decided not to show up", day: 1, speaker: "Jake", example: "Honestly, I almost didn't come. My friend basically pushed me out the door." },
    { expression: "what's the worst that could happen", meaning: "最悪何が起こるの？", meaningEn: "rhetorical question to downplay risk or anxiety", day: 1, speaker: "Nate", example: "Just go, dude. What's the worst that could happen?" },
    { expression: "I've heard good things", meaning: "いい評判聞いてるよ", meaningEn: "I've been told positive things about it", day: 1, speaker: "Chloe", example: "Actually, I've heard good things about this place. My coworker comes here." },
    { expression: "you're overthinking it", meaning: "考えすぎだよ", meaningEn: "you're worrying about something more than necessary", day: 1, speaker: "Chloe", example: "Relax, you're overthinking it. I really don't care where we eat." },
    { expression: "so far so good", meaning: "今のところ順調", meaningEn: "everything is going well up to this point", day: 1, speaker: "Jake", example: "So far so good. Nobody's spilled anything yet." },

    // ============================================================
    // DAY 2 -- DINNER DISASTER (15 expressions)
    // ============================================================
    { expression: "I am so sorry about that", meaning: "本当にごめん", meaningEn: "a sincere apology for something that just happened", day: 2, speaker: "Jake", example: "I am so sorry about that. I didn't even see the glass." },
    { expression: "of all the places in this city", meaning: "この街に何件もあるのに", meaningEn: "expressing disbelief at an unlikely coincidence of location", day: 2, speaker: "Chloe", example: "Of all the places in this city, my ex walks into this one." },
    { expression: "you have got to be kidding me", meaning: "冗談でしょ", meaningEn: "expressing disbelief or frustration at something unexpected", day: 2, speaker: "Chloe", example: "You have got to be kidding me. He's coming over here." },
    { expression: "it's not as bad as it looks", meaning: "見た目ほどひどくないよ", meaningEn: "the situation appears worse than it actually is", day: 2, speaker: "Jake", example: "It's not as bad as it looks! Most of the wine landed on the table." },
    { expression: "I can explain", meaning: "説明させて", meaningEn: "asking someone to hear your side before judging", day: 2, speaker: "Jake", example: "Okay, I can explain. The plate was already on the edge." },
    { expression: "this is a disaster", meaning: "もう最悪", meaningEn: "this situation is going terribly wrong", day: 2, speaker: "Jake", example: "This is a disaster. I've literally knocked over two things in ten minutes." },
    { expression: "are you doing okay over there", meaning: "大丈夫？そっち", meaningEn: "checking on someone with mild concern or humor", day: 2, speaker: "Marco", example: "Are you doing okay over there, or should I bring a tarp?" },
    { expression: "I didn't know where to look", meaning: "どこ見ていいかわからなかった", meaningEn: "felt so awkward I didn't know how to react", day: 2, speaker: "Chloe", example: "When he sat down at our table, I didn't know where to look." },
    { expression: "pretend you don't see him", meaning: "見えないふりして", meaningEn: "act as if you haven't noticed someone", day: 2, speaker: "Chloe", example: "Okay, pretend you don't see him. Maybe he'll walk past." },
    { expression: "that was so awkward", meaning: "めっちゃ気まずかった", meaningEn: "that situation was extremely uncomfortable", day: 2, speaker: "Jake", example: "That was so awkward. He just stood there staring at us." },
    { expression: "I need a drink", meaning: "酒が必要", meaningEn: "wanting alcohol to cope with stress or a bad situation", day: 2, speaker: "Chloe", example: "After that, I need a drink. A real one." },
    { expression: "please tell me that didn't just happen", meaning: "今の嘘って言って", meaningEn: "hoping something embarrassing or bad was imagined", day: 2, speaker: "Jake", example: "Please tell me that didn't just happen. Did I actually say that out loud?" },
    { expression: "at this point", meaning: "ここまで来たら・もうこの際", meaningEn: "given everything that's already happened", day: 2, speaker: "Chloe", example: "At this point, nothing can surprise me anymore." },
    { expression: "I swear this never happens", meaning: "いつもはこんなことないんだけど", meaningEn: "assuring someone this is not normal behavior", day: 2, speaker: "Jake", example: "I swear this never happens. I'm not usually this much of a mess." },
    { expression: "it's fine, really", meaning: "大丈夫、マジで", meaningEn: "reassuring someone while possibly downplaying true feelings", day: 2, speaker: "Chloe", example: "It's fine, really. Wine comes out in the wash... probably." },

    // ============================================================
    // DAY 3 -- THE GREAT ESCAPE (15 expressions)
    // ============================================================
    { expression: "let's just get out of here", meaning: "もうここ出よう", meaningEn: "suggesting to leave the current place immediately", day: 3, speaker: "Chloe", example: "Let's just get out of here. I saw a bar down the street." },
    { expression: "this place looks sketchy", meaning: "ここちょっと怪しくない？", meaningEn: "this location seems unsafe or questionable", day: 3, speaker: "Jake", example: "This place looks sketchy. Is that a good sign or a bad sign?" },
    { expression: "I needed that", meaning: "それ必要だった", meaningEn: "something relieved stress or was exactly what I wanted", day: 3, speaker: "Chloe", example: "Oh my god, I needed that. Best drink I've had all week." },
    { expression: "you're actually really easy to talk to", meaning: "意外と話しやすいね", meaningEn: "expressing pleasant surprise at how natural the conversation feels", day: 3, speaker: "Jake", example: "You're actually really easy to talk to. I was so nervous earlier for no reason." },
    { expression: "I wasn't expecting that", meaning: "それは予想外だった", meaningEn: "something surprised you in a positive or neutral way", day: 3, speaker: "Chloe", example: "I wasn't expecting that. You're way funnier than your profile let on." },
    { expression: "what are we even doing", meaning: "私たち何やってるんだろう", meaningEn: "rhetorical question about an absurd or spontaneous situation", day: 3, speaker: "Chloe", example: "What are we even doing? We're in a dive bar eating peanuts for dinner." },
    { expression: "honestly though", meaning: "でもぶっちゃけ", meaningEn: "introducing a sincere or candid opinion", day: 3, speaker: "Jake", example: "Honestly though, this is way more fun than some fancy restaurant." },
    { expression: "my friends are going to lose it", meaning: "友達に言ったら大ウケだわ", meaningEn: "my friends will react strongly when they hear this", day: 3, speaker: "Chloe", example: "My friends are going to lose it when I tell them about tonight." },
    { expression: "how is this my life right now", meaning: "なんで今こんなことになってるの", meaningEn: "disbelief at how absurd the current situation is", day: 3, speaker: "Jake", example: "Wine on your dress, your ex showing up, dive bar peanuts... how is this my life right now?" },
    { expression: "I don't even care anymore", meaning: "もうどうでもいいや", meaningEn: "giving up worrying, often in a liberating way", day: 3, speaker: "Jake", example: "You know what, I don't even care anymore. This is actually great." },
    { expression: "that's the spirit", meaning: "その意気だよ", meaningEn: "encouraging someone's positive or determined attitude", day: 3, speaker: "Lydia", example: "That's the spirit! Another round for the disaster date couple." },
    { expression: "you guys are adorable", meaning: "あんたたち可愛いね", meaningEn: "commenting that a couple is charming or sweet", day: 3, speaker: "Lydia", example: "You guys are adorable. How long have you been together?" },
    { expression: "we literally just met", meaning: "今日会ったばっかりなんですけど", meaningEn: "clarifying that you've only just been introduced", day: 3, speaker: "Jake", example: "We literally just met. Like, two hours ago." },
    { expression: "Sasha's blowing up my phone", meaning: "サーシャからメッセージ爆撃されてる", meaningEn: "someone is sending me a lot of texts or calls", day: 3, speaker: "Chloe", example: "Hold on, Sasha's blowing up my phone. She wants a full report." },
    { expression: "tell her I said hi", meaning: "よろしく言っといて", meaningEn: "pass along a greeting to someone", day: 3, speaker: "Jake", example: "Tell her I said hi. And that I'm sorry about the wine." },

    // ============================================================
    // DAY 4 -- CURB CONFESSIONS (15 expressions)
    // ============================================================
    { expression: "can I be honest with you", meaning: "正直に言っていい？", meaningEn: "asking permission to share something sincere or vulnerable", day: 4, speaker: "Jake", example: "Can I be honest with you? I haven't been on a date in over a year." },
    { expression: "I almost didn't come tonight", meaning: "今夜来るか本当に迷った", meaningEn: "nearly decided not to attend this event", day: 4, speaker: "Chloe", example: "I almost didn't come tonight. I deleted the app like three times this week." },
    { expression: "that's exactly what happened to me", meaning: "まさに同じことあった", meaningEn: "your experience mirrors mine precisely", day: 4, speaker: "Jake", example: "That's exactly what happened to me. I thought I was the only one." },
    { expression: "I haven't told anyone this", meaning: "誰にも言ってないんだけど", meaningEn: "sharing something private for the first time", day: 4, speaker: "Chloe", example: "I haven't told anyone this, but the reason I moved here was to start over." },
    { expression: "that makes sense", meaning: "それわかる", meaningEn: "acknowledging that what someone said is logical or relatable", day: 4, speaker: "Jake", example: "That makes sense. Sometimes you just need a clean slate." },
    { expression: "I'm glad you told me", meaning: "話してくれてよかった", meaningEn: "expressing appreciation for someone's openness", day: 4, speaker: "Jake", example: "I'm glad you told me. That takes guts." },
    { expression: "same here", meaning: "こっちもだよ", meaningEn: "I feel the same way or had the same experience", day: 4, speaker: "Chloe", example: "Same here. I thought tonight was going to be a total waste of time." },
    { expression: "for what it's worth", meaning: "参考までに言うと", meaningEn: "prefacing an opinion that may or may not matter to the listener", day: 4, speaker: "Jake", example: "For what it's worth, I think you made the right call moving here." },
    { expression: "I didn't see that coming", meaning: "それは想像してなかった", meaningEn: "something unexpected just happened or was revealed", day: 4, speaker: "Chloe", example: "I didn't see that coming. You're full of surprises tonight." },
    { expression: "it's been a while since", meaning: "久しぶりに〜した", meaningEn: "a significant amount of time has passed since something happened", day: 4, speaker: "Jake", example: "It's been a while since I've talked to someone like this." },
    { expression: "I don't usually open up like this", meaning: "普段こんな話しないんだけど", meaningEn: "acknowledging unusual emotional vulnerability", day: 4, speaker: "Chloe", example: "I don't usually open up like this. Must be the cheap beer." },
    { expression: "you're not what I expected", meaning: "思ってた感じと違うね", meaningEn: "someone turned out different from your assumptions, usually positively", day: 4, speaker: "Chloe", example: "You're not what I expected. In a good way." },
    { expression: "that means a lot", meaning: "それすごく嬉しい", meaningEn: "expressing that someone's words or actions are deeply appreciated", day: 4, speaker: "Jake", example: "That means a lot, actually. Thanks for saying that." },
    { expression: "I keep thinking about", meaning: "ずっと考えちゃう", meaningEn: "something stays on your mind repeatedly", day: 4, speaker: "Jake", example: "I keep thinking about what you said earlier, about starting over." },
    { expression: "we should probably head out", meaning: "そろそろ出た方がいいかも", meaningEn: "suggesting it's time to leave", day: 4, speaker: "Chloe", example: "We should probably head out. I have work tomorrow, and it's already midnight." },

    // ============================================================
    // DAY 5 -- THE MORNING AFTER (15 expressions)
    // ============================================================
    { expression: "so about last night", meaning: "昨日の夜のことなんだけど", meaningEn: "bringing up events from the previous evening", day: 5, speaker: "Nate", example: "So about last night... how bad was it? Scale of one to ten." },
    { expression: "I had the worst time and I loved it", meaning: "最悪だったけど最高だった", meaningEn: "the experience was terrible but enjoyable in a weird way", day: 5, speaker: "Jake", example: "I had the worst time and I loved it. Does that make sense?" },
    { expression: "when are you free again", meaning: "次いつ空いてる？", meaningEn: "asking about availability for another meetup", day: 5, speaker: "Jake", example: "This is going to sound crazy, but when are you free again?" },
    { expression: "don't overthink it", meaning: "考えすぎないで", meaningEn: "stop analyzing and just act naturally", day: 5, speaker: "Nate", example: "Don't overthink it. Just text her something simple." },
    { expression: "I can't stop laughing about", meaning: "思い出すと笑いが止まらない", meaningEn: "something is so funny you keep revisiting it", day: 5, speaker: "Chloe", example: "I can't stop laughing about the wine thing. My roommate thinks I'm insane." },
    { expression: "you should have seen his face", meaning: "あいつの顔見せたかった", meaningEn: "someone's expression was priceless and worth witnessing", day: 5, speaker: "Chloe", example: "You should have seen his face when my ex walked in. Pure horror." },
    { expression: "I have so many questions", meaning: "聞きたいこと山ほどある", meaningEn: "there is a lot to unpack or discuss", day: 5, speaker: "Sasha", example: "I have so many questions. Start from the beginning." },
    { expression: "the short version is", meaning: "手短に言うと", meaningEn: "summarizing a long story briefly", day: 5, speaker: "Jake", example: "The short version is, the restaurant lost our reservation and everything went downhill from there." },
    { expression: "are you going to see her again", meaning: "また会うの？", meaningEn: "asking if there will be another date", day: 5, speaker: "Nate", example: "Are you going to see her again, or was it a one-and-done?" },
    { expression: "I think so", meaning: "たぶんそう", meaningEn: "expressing cautious optimism or tentative agreement", day: 5, speaker: "Jake", example: "I think so. She texted me this morning, so that's a good sign, right?" },
    { expression: "just be yourself", meaning: "自然体でいけよ", meaningEn: "act naturally without pretending to be someone else", day: 5, speaker: "Nate", example: "Next time, just be yourself. Clearly it worked." },
    { expression: "that's actually kind of sweet", meaning: "それちょっといい話じゃん", meaningEn: "something unexpectedly touching or endearing", day: 5, speaker: "Sasha", example: "That's actually kind of sweet. Sitting on a curb talking for hours? Very rom-com." },
    { expression: "I'm not going to lie", meaning: "嘘つかないけど", meaningEn: "being upfront about something, often surprising", day: 5, speaker: "Chloe", example: "I'm not going to lie, it was the worst date I've ever been on. And somehow the best." },
    { expression: "keep me posted", meaning: "また教えてね", meaningEn: "let me know how things develop", day: 5, speaker: "Sasha", example: "Keep me posted. If there's a second date, I want all the details." },
    { expression: "we'll see what happens", meaning: "どうなるかはわからない", meaningEn: "remaining open to the future without committing to a prediction", day: 5, speaker: "Jake", example: "We'll see what happens. But yeah, I'm definitely texting her back." },
];

export const TOTAL_WORST_DATE_EXPRESSIONS = 75;
export const WORST_DATE_EXPRESSIONS_PER_DAY = 15;
export const WORST_DATE_DAY_IDS = ['worstdate-day1', 'worstdate-day2', 'worstdate-day3', 'worstdate-day4', 'worstdate-day5'];

export function findWorstDateExpressionLineIndex(expression: string, dayEntries: Array<{ text: string }>): number {
    const normalized = expression.toLowerCase().trim();
    for (let i = 0; i < dayEntries.length; i++) {
        if (dayEntries[i].text.toLowerCase().includes(normalized)) return i;
    }
    return -1;
}
