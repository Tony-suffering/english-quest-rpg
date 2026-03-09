/**
 * Antiques House Call Expressions -- casual expressions from Antiques House Call scenario
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 * Characters: Uncle Ray(58M), Nadia(30F), Dex(27M), Aunt Margot(62F), Cody(17M), Pearl(85F)
 */

export interface AntiquesExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const ANTIQUES_EXPRESSIONS: AntiquesExpression[] = [
    // ============================================================
    // DAY 1 -- THE GARAGE DOOR OPENS (15 expressions)
    // Arriving, first reactions, overwhelmed by the hoard
    // ============================================================
    { expression: "where do we even start", meaning: "何から手つけていいかわからん", meaningEn: "feeling overwhelmed by the scale of a task", day: 1, speaker: "Nadia", example: "Look at this garage. Where do we even start? There's sixty years of stuff in here." },
    { expression: "holy smokes", meaning: "うっそだろ・マジかよ", meaningEn: "exclamation of surprise or disbelief", day: 1, speaker: "Uncle Ray", example: "Holy smokes, is that a mid-century credenza just sittin' under a tarp?" },
    { expression: "this is a LOT", meaning: "これはちょっとキツい", meaningEn: "the situation is emotionally or physically overwhelming", day: 1, speaker: "Aunt Margot", example: "I knew she had things but... this is a LOT." },
    { expression: "let's just get this over with", meaning: "さっさと終わらせよう", meaningEn: "wanting to complete an unpleasant task quickly", day: 1, speaker: "Nadia", example: "We've got two days and a dumpster. Let's just get this over with." },
    { expression: "you can't be serious", meaning: "本気で言ってんの?", meaningEn: "expressing disbelief at someone's statement or action", day: 1, speaker: "Nadia", example: "You wanna appraise every single box? You can't be serious." },
    { expression: "I'm getting hives just looking at this", meaning: "見てるだけでじんましん出そう", meaningEn: "something is so stressful it causes a physical reaction", day: 1, speaker: "Cody", example: "Dust, mold, dead spiders. I'm getting hives just looking at this." },
    { expression: "she kept everything", meaning: "あの人なんでもとっておくんだよな", meaningEn: "describing someone who never threw anything away", day: 1, speaker: "Dex", example: "Tax receipts from 1987. She kept everything." },
    { expression: "I told you to wear gloves", meaning: "手袋しろって言ったのに", meaningEn: "reminding someone of ignored advice, mild I-told-you-so", day: 1, speaker: "Nadia", example: "There's mouse droppings on that shelf. I told you to wear gloves." },
    { expression: "do NOT throw that out", meaning: "それ絶対捨てんなよ", meaningEn: "urgent command to preserve something from being discarded", day: 1, speaker: "Uncle Ray", example: "Whoa whoa whoa. Do NOT throw that out. That could be Bakelite." },
    { expression: "I can still smell her perfume", meaning: "まだあの人の香水の匂いがする", meaningEn: "a sensory memory triggering emotions about a deceased person", day: 1, speaker: "Aunt Margot", example: "Open that closet and I can still smell her perfume. Shalimar." },
    { expression: "we're gonna need a bigger truck", meaning: "もっとデカいトラックいるわ", meaningEn: "the task is much larger than anticipated, playful understatement", day: 1, speaker: "Dex", example: "There's a second garage? We're gonna need a bigger truck." },
    { expression: "Ida would have wanted", meaning: "イーダならこうしてほしいと思う", meaningEn: "invoking a dead person's wishes to justify a decision", day: 1, speaker: "Aunt Margot", example: "Ida would have wanted us to take our time with this. Not rush." },
    { expression: "can I wait in the car", meaning: "車で待ってていい?", meaningEn: "wanting to avoid participating in an activity", day: 1, speaker: "Cody", example: "Seriously. Can I wait in the car? This place smells like a museum died." },
    { expression: "you'd be surprised what this is worth", meaning: "これいくらするか知ったら驚くよ", meaningEn: "something seemingly worthless actually has significant value", day: 1, speaker: "Uncle Ray", example: "This ugly lamp? You'd be surprised what this is worth. Depression glass." },
    { expression: "she never mentioned any of this", meaning: "こんなのあるなんて一言も聞いてない", meaningEn: "discovering something a person never talked about while alive", day: 1, speaker: "Nadia", example: "A sewing machine, three typewriters, a trumpet. She never mentioned any of this." },

    // ============================================================
    // DAY 2 -- THE SORTING BEGINS (15 expressions)
    // Ray's appraisals, Margot's photo meltdowns, piles grow
    // ============================================================
    { expression: "pile it over there", meaning: "そっちに積んどいて", meaningEn: "directing someone to place items in a designated area", day: 2, speaker: "Nadia", example: "Keep, donate, trash. Three piles. Pile it over there." },
    { expression: "you're killing me", meaning: "勘弁してくれよ", meaningEn: "someone is frustrating or exasperating you", day: 2, speaker: "Nadia", example: "Ray, every single plate is NOT a collector's item. You're killing me." },
    { expression: "oh, would you look at that", meaning: "おお、これ見てみろよ", meaningEn: "drawing attention to an interesting or surprising find", day: 2, speaker: "Uncle Ray", example: "Oh, would you look at that. Original Pyrex, the turquoise set. Mint condition." },
    { expression: "I can't throw away her photos", meaning: "あの人の写真は捨てられない", meaningEn: "emotional inability to discard sentimental items", day: 2, speaker: "Aunt Margot", example: "I don't care what system you have. I can't throw away her photos." },
    { expression: "that's literally trash", meaning: "それゴミだから普通に", meaningEn: "bluntly stating something has no value", day: 2, speaker: "Cody", example: "It's a broken umbrella with no handle. That's literally trash." },
    { expression: "everything's sentimental to you", meaning: "あんたにとっては全部思い出なんでしょ", meaningEn: "accusing someone of being unable to let go of anything", day: 2, speaker: "Nadia", example: "A grocery list from 1994? Everything's sentimental to you, Margot." },
    { expression: "I'm just sayin'", meaning: "言ってみただけ", meaningEn: "softening a blunt opinion, deflecting responsibility for it", day: 2, speaker: "Dex", example: "We could sell the whole lot on eBay and split it four ways. I'm just sayin'." },
    { expression: "that's not how this works", meaning: "そういう仕組みじゃないから", meaningEn: "correcting someone's misunderstanding of a process", day: 2, speaker: "Nadia", example: "You can't just call dibs on the jewelry box. That's not how this works." },
    { expression: "she had taste, I'll give her that", meaning: "センスはあったよな、それは認める", meaningEn: "grudgingly admitting someone had good judgment", day: 2, speaker: "Pearl", example: "Ida bought that credenza in '72 for forty bucks. She had taste, I'll give her that." },
    { expression: "this is gonna take forever", meaning: "これ永遠に終わらんわ", meaningEn: "a task will take much longer than expected", day: 2, speaker: "Cody", example: "We've done one shelf in two hours. This is gonna take forever." },
    { expression: "back in the keep pile", meaning: "キープの山に戻して", meaningEn: "returning an item to the pile of things being saved", day: 2, speaker: "Aunt Margot", example: "That teacup was her favorite. Back in the keep pile." },
    { expression: "I need to step outside", meaning: "ちょっと外出てくる", meaningEn: "needing to leave a situation to compose yourself emotionally", day: 2, speaker: "Aunt Margot", example: "That's her handwriting on the recipe card. I need to step outside." },
    { expression: "we're not keeping all of this", meaning: "全部は持って帰れないからね", meaningEn: "setting realistic limits on what can be saved", day: 2, speaker: "Nadia", example: "Fourteen boxes of Christmas ornaments. We're not keeping all of this." },
    { expression: "what's the play here", meaning: "で、どうする?", meaningEn: "asking what the strategy or plan is", day: 2, speaker: "Dex", example: "So we got a storage unit full and a garage full. What's the play here?" },
    { expression: "don't get me started", meaning: "その話はやめてくれ", meaningEn: "warning that a topic will trigger a long rant or emotional reaction", day: 2, speaker: "Pearl", example: "Ida and that trumpet? Don't get me started. She played it once and quit." },

    // ============================================================
    // DAY 3 -- THE LOCKBOX (15 expressions)
    // Dex finds lockbox, family secrets surface, Pearl drops bombs
    // ============================================================
    { expression: "what's in the box", meaning: "箱の中身なんだよ", meaningEn: "intense curiosity about a container's contents", day: 3, speaker: "Dex", example: "Locked, heavy, taped shut. What's in the box?" },
    { expression: "none of your business", meaning: "あんたには関係ない", meaningEn: "telling someone the information is private", day: 3, speaker: "Pearl", example: "What Ida kept in that box is none of your business. Or it wasn't." },
    { expression: "plot twist", meaning: "まさかの展開", meaningEn: "an unexpected revelation, used humorously", day: 3, speaker: "Dex", example: "Love letters from someone who's not grandpa? Plot twist." },
    { expression: "we don't talk about that", meaning: "その話はしないことになってる", meaningEn: "a family secret that everyone avoids discussing", day: 3, speaker: "Aunt Margot", example: "That was before she married your grandfather. We don't talk about that." },
    { expression: "spill", meaning: "全部話して", meaningEn: "demanding someone reveal information or gossip", day: 3, speaker: "Dex", example: "Pearl, you've got that look. Spill." },
    { expression: "I promised I'd never tell", meaning: "絶対言わないって約束した", meaningEn: "bound by a promise to keep a secret", day: 3, speaker: "Pearl", example: "Ida made me swear in 1986. I promised I'd never tell." },
    { expression: "well she's dead now so", meaning: "まあもう死んでるし", meaningEn: "dark humor justifying revealing a dead person's secret", day: 3, speaker: "Dex", example: "Well she's dead now so I think the statute of limitations is up." },
    { expression: "that's messed up", meaning: "それはひどいわ", meaningEn: "something is morally wrong or disturbing", day: 3, speaker: "Cody", example: "She had a whole other life nobody knew about? That's messed up." },
    { expression: "I had a feeling", meaning: "なんとなくそんな気はしてた", meaningEn: "a suspicion that has now been confirmed", day: 3, speaker: "Aunt Margot", example: "She'd get this look when we drove past the old post office. I had a feeling." },
    { expression: "can we just focus", meaning: "集中してくれない?", meaningEn: "trying to redirect attention to the task at hand", day: 3, speaker: "Nadia", example: "Fascinating family drama, but can we just focus? We have forty more boxes." },
    { expression: "the tea is piping hot", meaning: "ゴシップが激アツ", meaningEn: "the gossip is extremely juicy and exciting", day: 3, speaker: "Dex", example: "Grandma had a secret boyfriend AND a secret savings account? The tea is piping hot." },
    { expression: "I knew something was off", meaning: "何かおかしいと思ってた", meaningEn: "confirming a previous suspicion that something wasn't right", day: 3, speaker: "Uncle Ray", example: "She always locked that drawer. I knew something was off." },
    { expression: "take that to your grave", meaning: "墓場まで持っていけ", meaningEn: "keep a secret forever, never tell anyone", day: 3, speaker: "Pearl", example: "She told me to take that to my grave. Guess the grave came for her first." },
    { expression: "this changes everything", meaning: "これで全部変わるぞ", meaningEn: "a revelation that fundamentally alters the situation", day: 3, speaker: "Uncle Ray", example: "If these bonds are real, this changes everything. We're not talkin' garage sale money." },
    { expression: "are we just gonna pretend that didn't happen", meaning: "今の聞かなかったことにするの?", meaningEn: "questioning whether a group will acknowledge an awkward revelation", day: 3, speaker: "Dex", example: "Pearl just said grandma almost moved to Italy. Are we just gonna pretend that didn't happen?" },

    // ============================================================
    // DAY 4 -- THE SHOWDOWN (15 expressions)
    // Arguments over keep/sell/donate, Ray vs Nadia, tensions peak
    // ============================================================
    { expression: "over my dead body", meaning: "俺の目の黒いうちは絶対ダメ", meaningEn: "absolutely refusing to allow something", day: 4, speaker: "Uncle Ray", example: "Sell the credenza at a yard sale? Over my dead body." },
    { expression: "be reasonable", meaning: "現実的に考えてよ", meaningEn: "asking someone to think logically instead of emotionally", day: 4, speaker: "Nadia", example: "Ray, we can't keep a seven-foot armoire. Be reasonable." },
    { expression: "this isn't about the money", meaning: "金の問題じゃない", meaningEn: "the real issue is emotional, not financial", day: 4, speaker: "Aunt Margot", example: "This isn't about the money. It's about what she left behind." },
    { expression: "it's EXACTLY about the money", meaning: "いや金の問題だから", meaningEn: "contradicting someone who claims money isn't the issue", day: 4, speaker: "Dex", example: "Storage costs two hundred a month. It's EXACTLY about the money." },
    { expression: "you don't get a say", meaning: "あんたに発言権ないから", meaningEn: "telling someone their opinion doesn't count in this decision", day: 4, speaker: "Nadia", example: "You visited her twice in ten years. You don't get a say." },
    { expression: "that was a low blow", meaning: "今のはさすがにひどい", meaningEn: "a comment that was unfairly hurtful or personal", day: 4, speaker: "Uncle Ray", example: "Bringin' up how often I visited? That was a low blow, Nadia." },
    { expression: "can everyone just shut up for a second", meaning: "全員一回黙ってくれない?", meaningEn: "desperately needing silence during a heated argument", day: 4, speaker: "Cody", example: "Can everyone just shut up for a second? My head is splitting." },
    { expression: "I'm not the bad guy here", meaning: "俺が悪者じゃないだろ", meaningEn: "defending yourself when others treat you as the villain", day: 4, speaker: "Nadia", example: "Someone has to make decisions. I'm not the bad guy here." },
    { expression: "we're going in circles", meaning: "堂々巡りだよ", meaningEn: "the discussion keeps repeating without progress", day: 4, speaker: "Dex", example: "Keep, sell, keep, sell. We're going in circles." },
    { expression: "sleep on it", meaning: "一晩考えよう", meaningEn: "delay a decision until the next day to think clearly", day: 4, speaker: "Pearl", example: "You're all tired and cranky. Sleep on it." },
    { expression: "I didn't come all this way to", meaning: "わざわざ来たのに〜するために来たんじゃない", meaningEn: "expressing frustration that effort is being wasted", day: 4, speaker: "Uncle Ray", example: "I didn't come all this way to watch everything go to Goodwill." },
    { expression: "pick your battles", meaning: "全部に噛みつくなよ", meaningEn: "advising someone to only argue about things that truly matter", day: 4, speaker: "Pearl", example: "Ray, you're fightin' over a cheese grater. Pick your battles." },
    { expression: "fine, whatever", meaning: "もういいよ、好きにして", meaningEn: "reluctant, frustrated agreement to end an argument", day: 4, speaker: "Cody", example: "Keep the ugly vase. Fine, whatever. I don't care anymore." },
    { expression: "you sound just like her", meaning: "あの人にそっくりだよ、言い方が", meaningEn: "telling someone they resemble a deceased relative in behavior", day: 4, speaker: "Pearl", example: "Nadia, the way you just put your foot down. You sound just like her." },
    { expression: "we need to agree on something", meaning: "何か一つでも決めないと", meaningEn: "urging a group to reach at least one consensus", day: 4, speaker: "Nadia", example: "The truck comes tomorrow morning. We need to agree on something." },

    // ============================================================
    // DAY 5 -- THE RESOLUTION (15 expressions)
    // Unexpected treasure, family comes together, Pearl's goodbye
    // ============================================================
    { expression: "I owe you an apology", meaning: "謝らなきゃいけないことがある", meaningEn: "admitting you were wrong and need to apologize", day: 5, speaker: "Uncle Ray", example: "Nadia, I was bein' a pain. I owe you an apology." },
    { expression: "no hard feelings", meaning: "根に持ってないよ", meaningEn: "confirming there's no lingering resentment", day: 5, speaker: "Nadia", example: "You were protecting her stuff. No hard feelings, Ray." },
    { expression: "wait, hold on", meaning: "ちょっと待って", meaningEn: "interrupting because something important was noticed", day: 5, speaker: "Dex", example: "Wait, hold on. There's something taped to the bottom of this drawer." },
    { expression: "get out of here", meaning: "嘘だろ・マジかよ", meaningEn: "disbelief at an unexpected discovery, not literal", day: 5, speaker: "Uncle Ray", example: "A 1952 Mickey Mantle rookie card? Get out of here." },
    { expression: "she knew exactly what she was doing", meaning: "あの人わかっててやってたんだ", meaningEn: "realizing someone's actions were intentional and clever", day: 5, speaker: "Pearl", example: "Hid it where only someone who really looked would find it. She knew exactly what she was doing." },
    { expression: "I can't believe she held onto this", meaning: "これずっと持ってたなんて信じられない", meaningEn: "amazement that someone kept something for so long", day: 5, speaker: "Aunt Margot", example: "My mother's wedding ring. I can't believe she held onto this." },
    { expression: "that's the most grandma thing ever", meaning: "おばあちゃんっぽすぎて笑う", meaningEn: "something is perfectly characteristic of the deceased person", day: 5, speaker: "Dex", example: "Hiding a fortune in a cookie tin inside a cookie tin. That's the most grandma thing ever." },
    { expression: "who's cutting onions", meaning: "誰が玉ねぎ切ってるの(泣いてないし)", meaningEn: "pretending you're not crying by blaming invisible onions", day: 5, speaker: "Dex", example: "I'm not cryin'. Who's cutting onions in this dusty garage?" },
    { expression: "she woulda got a kick out of this", meaning: "あの人見てたら絶対ウケてるわ", meaningEn: "the deceased would have found this situation amusing", day: 5, speaker: "Pearl", example: "All of you fightin' over her stuff and she hid the good one. She woulda got a kick out of this." },
    { expression: "I think we can all agree", meaning: "これはみんな同意だと思うけど", meaningEn: "introducing something the group can unite on", day: 5, speaker: "Nadia", example: "I think we can all agree the card goes to a proper appraiser." },
    { expression: "can't argue with that", meaning: "それは反論できない", meaningEn: "conceding someone made a valid point you can't dispute", day: 5, speaker: "Uncle Ray", example: "You wanna split it equally, even Cody? Can't argue with that." },
    { expression: "it's not about the stuff", meaning: "モノの問題じゃないんだよ", meaningEn: "the real value is emotional or relational, not material", day: 5, speaker: "Aunt Margot", example: "Two days in this garage and I feel closer to all of you. It's not about the stuff." },
    { expression: "don't make me cry again", meaning: "また泣かせないでよ", meaningEn: "warning someone their sentimentality is triggering tears", day: 5, speaker: "Nadia", example: "Margot, stop. Don't make me cry again. We still have to load the truck." },
    { expression: "she had a good run", meaning: "あの人いい人生だったよ", meaningEn: "the deceased lived a full and satisfying life", day: 5, speaker: "Pearl", example: "Ninety-one years, a secret boyfriend, and a Mickey Mantle card. She had a good run." },
    { expression: "same time next year", meaning: "また来年同じ時期にね", meaningEn: "suggesting a reunion, implying the shared experience bonded the group", day: 5, speaker: "Dex", example: "So... same time next year? Minus the dead grandma part?" },
];

export const ANTIQUES_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_ANTIQUES_EXPRESSIONS = ANTIQUES_EXPRESSIONS.length;

export const ANTIQUES_DAY_IDS: Record<number, string> = {
    1: 'antiques-day1',
    2: 'antiques-day2',
    3: 'antiques-day3',
    4: 'antiques-day4',
    5: 'antiques-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findAntiquesExpressionLineIndex(
    expressionText: string,
    conversationLines: Array<{ text: string }>
): number {
    const clean = expressionText.toLowerCase();
    const idx = conversationLines.findIndex(line =>
        line.text.toLowerCase().includes(clean)
    );
    return idx >= 0 ? idx : 0;
}
