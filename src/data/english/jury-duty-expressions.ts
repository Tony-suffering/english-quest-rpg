/**
 * Jury Duty Expressions -- casual expressions from the Jury Duty scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Wanda(62F), Trevor(29M), Aisha(34F), Doug(48M), Judge Halloran(60M),
 *   Bailiff Reyes(40M), Mei(23F)
 */

export interface JuryDutyExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const JURY_DUTY_EXPRESSIONS: JuryDutyExpression[] = [
    // ============================================================
    // DAY 1 -- THE SUMMONS (15 expressions)
    // ============================================================
    { expression: "listen up", meaning: "聞いてください", meaningEn: "telling a group to pay attention", day: 1, speaker: "Bailiff Reyes", example: "Alright, listen up, everybody. If I called your name, you're in the pool." },
    { expression: "you're in the pool", meaning: "あなたは候補者です", meaningEn: "saying someone is among those who might be selected", day: 1, speaker: "Bailiff Reyes", example: "If I called your name, you're in the pool. If I didn't, you wait." },
    { expression: "what if you, hypothetically", meaning: "もし仮に", meaningEn: "framing a real situation as a fake hypothetical", day: 1, speaker: "Trevor", example: "So what if you, hypothetically, have a really important thing at work this week?" },
    { expression: "everybody has a really important thing", meaning: "全員大事な用事がある", meaningEn: "dismissing an excuse because everyone claims the same", day: 1, speaker: "Bailiff Reyes", example: "There's a form. Everybody has a really important thing. Fill out the form." },
    { expression: "I, for one", meaning: "私はね", meaningEn: "emphasizing your own personal stance against others", day: 1, speaker: "Wanda", example: "I, for one, think this is an honor." },
    { expression: "preparation is not a crime", meaning: "準備は罪じゃない", meaningEn: "defending yourself for being overly prepared", day: 1, speaker: "Wanda", example: "Preparation is not a crime, Doug." },
    { expression: "of course you did", meaning: "そりゃそうだろうな", meaningEn: "sarcastically reacting to predictable behavior", day: 1, speaker: "Doug", example: "I read the entire juror handbook twice. -- Of course you did." },
    { expression: "in and out", meaning: "さっと入ってさっと出る", meaningEn: "hoping to finish something quickly without lingering", day: 1, speaker: "Aisha", example: "I'm just hoping it's something quick. In and out." },
    { expression: "this is my first time", meaning: "初めてです", meaningEn: "telling people you have no experience with something", day: 1, speaker: "Mei", example: "I'm Mei. This is my first time." },
    { expression: "sit by me", meaning: "私の隣に座って", meaningEn: "inviting someone to sit next to you", day: 1, speaker: "Wanda", example: "Sit by me. I have a granola bar with your name on it." },
    { expression: "realistically", meaning: "現実的に", meaningEn: "asking for a practical, honest estimate", day: 1, speaker: "Trevor", example: "Okay but realistically -- how long does this take?" },
    { expression: "could be a day, could be a week", meaning: "1日かもしれないし1週間かも", meaningEn: "giving a wide, uncertain time estimate", day: 1, speaker: "Bailiff Reyes", example: "Could be a day. Could be a week. I've seen a 'quick one' run eleven days." },
    { expression: "how do you know my name", meaning: "なんで名前知ってるんですか", meaningEn: "surprised that someone knows who you are", day: 1, speaker: "Trevor", example: "Trevor: How do you know my name?" },
    { expression: "I had a feeling about you", meaning: "ピンとくるものがあった", meaningEn: "saying your intuition told you something about a person", day: 1, speaker: "Wanda", example: "You're 'pretzels,' Trevor. I had a feeling about you." },
    { expression: "I can feel it in my knees", meaning: "膝で分かる", meaningEn: "comically claiming a bodily hunch about the future", day: 1, speaker: "Doug", example: "This is going to be a long week. I can feel it in my knees." },

    // ============================================================
    // DAY 2 -- VOIR DIRE (15 expressions)
    // ============================================================
    { expression: "answer honestly", meaning: "正直に答えて", meaningEn: "instructing someone to tell the truth", day: 2, speaker: "Judge Halloran", example: "I ask you questions, you answer honestly, and we determine whether you can be fair." },
    { expression: "I want to be clear about that", meaning: "そこははっきりさせておきたい", meaningEn: "emphasizing a point so there's no misunderstanding", day: 2, speaker: "Judge Halloran", example: "It is not a chance to get out of jury duty. I want to be clear about that part." },
    { expression: "I have very strong opinions", meaning: "ものすごく強い意見がある", meaningEn: "claiming intense feelings, here to seem biased", day: 2, speaker: "Trevor", example: "I just want to say I have very strong opinions about crime." },
    { expression: "nice try", meaning: "いい試みでした", meaningEn: "acknowledging a clever but failed attempt to trick someone", day: 2, speaker: "Judge Halloran", example: "That is the legally correct opinion. You're seated. Nice try." },
    { expression: "genuine question", meaning: "純粋な質問なんですが", meaningEn: "signaling that you're asking sincerely, not sarcastically", day: 2, speaker: "Aisha", example: "Your Honor, genuine question -- are we allowed to know what the case actually is?" },
    { expression: "are we allowed to know", meaning: "知ることは許されますか", meaningEn: "politely asking for permission to be told something", day: 2, speaker: "Aisha", example: "Before we agree to anything, are we allowed to know what the case actually is?" },
    { expression: "he's guilty, look at him", meaning: "有罪だ、顔を見ろ", meaningEn: "wrongly judging someone by their appearance", day: 2, speaker: "Doug", example: "Fourteen gnomes. He's guilty. Look at him." },
    { expression: "you cannot reach a verdict", meaning: "評決を出すことはできない", meaningEn: "reminding someone a decision can't be made yet", day: 2, speaker: "Judge Halloran", example: "Sir, you cannot reach a verdict during jury selection." },
    { expression: "I think it's wonderful", meaning: "素晴らしいと思う", meaningEn: "expressing earnest enthusiasm for something", day: 2, speaker: "Wanda", example: "I think it's wonderful that we get to weigh such a serious matter." },
    { expression: "I'm invested", meaning: "夢中になってる", meaningEn: "saying you've become emotionally caught up in something", day: 2, speaker: "Mei", example: "Is it weird that I kind of want to know the whole gnome story now? Like, I'm invested." },
    { expression: "the wrong time to express it", meaning: "表明するには間違ったタイミング", meaningEn: "saying a feeling is valid but badly timed", day: 2, speaker: "Judge Halloran", example: "That is the correct level of curiosity, and the wrong time to express it." },
    { expression: "even me", meaning: "俺も", meaningEn: "surprised to be included in something", day: 2, speaker: "Trevor", example: "Wait, all of us? Even me? I said I was biased." },
    { expression: "that's why we let them vote", meaning: "だから投票させてる", meaningEn: "joking that a common opinion qualifies everyone", day: 2, speaker: "Judge Halloran", example: "Everyone here thinks crime is bad. That's why we let them carry phones and vote." },
    { expression: "I have so many questions", meaning: "聞きたいことが山ほどある", meaningEn: "saying something raised a lot of curiosity", day: 2, speaker: "Aisha", example: "Fourteen gnomes. Okay. I have so many questions." },
    { expression: "I don't need five days", meaning: "5日もいらない", meaningEn: "claiming you've already decided and need no more time", day: 2, speaker: "Doug", example: "I don't need five days. I need about five more minutes with that guy's face." },

    // ============================================================
    // DAY 3 -- THE TRIAL (15 expressions)
    // ============================================================
    { expression: "keep your reactions to yourselves", meaning: "リアクションは控えて", meaningEn: "telling people not to visibly react", day: 3, speaker: "Bailiff Reyes", example: "Keep your reactions to yourselves. No gasping, no nodding along." },
    { expression: "it was one time", meaning: "一度だけよ", meaningEn: "defensively minimizing a past mistake", day: 3, speaker: "Wanda", example: "It was one time. The witness made a very good point." },
    { expression: "according to the testimony", meaning: "証言によれば", meaningEn: "citing what a witness said as a basis", day: 3, speaker: "Aisha", example: "According to the testimony, the gnomes weren't actually stolen." },
    { expression: "sure he did", meaning: "そりゃ言うだろうさ", meaningEn: "sarcastically doubting someone's claim", day: 3, speaker: "Doug", example: "And he says the neighbor gave them to him. -- Sure he did." },
    { expression: "that's the thing", meaning: "そこなのよ", meaningEn: "introducing the key complication in an argument", day: 3, speaker: "Aisha", example: "But that's the thing -- there's a text message. Exhibit C." },
    { expression: "why is nobody writing this down", meaning: "なんで誰もメモ取ってないの", meaningEn: "amazed that an important detail is being ignored", day: 3, speaker: "Mei", example: "She called them 'the little men'? Why is nobody else writing this down?" },
    { expression: "it doesn't matter what she texted", meaning: "何を送ったかは関係ない", meaningEn: "dismissing evidence that doesn't fit your view", day: 3, speaker: "Doug", example: "It doesn't matter what she texted. He took them in the middle of the night." },
    { expression: "we don't actually know yet", meaning: "まだ実際には分からない", meaningEn: "urging others to wait before concluding", day: 3, speaker: "Aisha", example: "Or people who work two jobs. We don't actually know yet." },
    { expression: "keep an open mind", meaning: "先入観を持たずに", meaningEn: "urging fairness before judging", day: 3, speaker: "Wanda", example: "I think we should keep an open mind. The defense hasn't shown the second text yet." },
    { expression: "real talk", meaning: "正直な話", meaningEn: "signaling you're about to be honest and candid", day: 3, speaker: "Trevor", example: "Hey, real talk, is anyone else kind of into this now?" },
    { expression: "kind of into this", meaning: "ちょっと夢中になってる", meaningEn: "admitting you've started enjoying something unexpectedly", day: 3, speaker: "Trevor", example: "I came in trying to escape and now I need to know what's in the second text." },
    { expression: "right?", meaning: "でしょ", meaningEn: "eagerly agreeing and inviting more agreement", day: 3, speaker: "Mei", example: "Right? It's like a true-crime podcast except we're legally part of it." },
    { expression: "you're all overthinking it", meaning: "考えすぎだ", meaningEn: "accusing others of making something too complicated", day: 3, speaker: "Doug", example: "You're all overthinking fourteen gnomes." },
    { expression: "with respect", meaning: "悪いけど", meaningEn: "softening a blunt disagreement before saying it", day: 3, speaker: "Aisha", example: "Doug, with respect, you've said 'guilty' eleven times." },
    { expression: "so it's not a surprise later", meaning: "後で驚かないように", meaningEn: "warning someone in advance about your position", day: 3, speaker: "Doug", example: "But I'm right. I'm telling you now so it's not a surprise later." },

    // ============================================================
    // DAY 4 -- THE DELIBERATION (15 expressions)
    // ============================================================
    { expression: "let's take an initial vote", meaning: "まず初回投票をしましょう", meaningEn: "proposing a first round of voting", day: 4, speaker: "Wanda", example: "Let's take an initial vote. Show of hands. Who thinks guilty?" },
    { expression: "show of hands", meaning: "挙手で", meaningEn: "asking people to raise hands to vote", day: 4, speaker: "Wanda", example: "Let's take an initial vote. Show of hands." },
    { expression: "we have to actually agree", meaning: "ちゃんと合意しなきゃ", meaningEn: "reminding people that consensus is required", day: 4, speaker: "Aisha", example: "We cannot 'go home,' Doug, we have to actually agree." },
    { expression: "my handwriting got excited", meaning: "字が興奮しちゃって", meaningEn: "joking that you wrote too fast to read it now", day: 4, speaker: "Mei", example: "I wrote it down but my handwriting got excited." },
    { expression: "that changes things for me", meaning: "話が変わる", meaningEn: "admitting new information shifts your opinion", day: 4, speaker: "Trevor", example: "Okay, see, that changes things for me." },
    { expression: "that's not how it works", meaning: "そういうもんじゃない", meaningEn: "insisting something doesn't function the way claimed", day: 4, speaker: "Trevor", example: "You can't un-gift it. That's not how gnomes work. That's not how gifts work." },
    { expression: "let's keep it civil", meaning: "穏やかにいきましょう", meaningEn: "asking everyone to stay calm and polite", day: 4, speaker: "Wanda", example: "Let's keep it civil. Everyone gets a turn." },
    { expression: "everyone gets a turn", meaning: "全員に順番が回る", meaningEn: "making sure each person gets to speak", day: 4, speaker: "Wanda", example: "Let's keep it civil. Everyone gets a turn. It's Mei's turn." },
    { expression: "that's reasonable doubt", meaning: "それが合理的な疑い", meaningEn: "identifying enough uncertainty to not convict", day: 4, speaker: "Aisha", example: "'Whose men are they.' That's reasonable doubt right there." },
    { expression: "I cannot believe", meaning: "信じられん", meaningEn: "expressing disbelief at an absurd situation", day: 4, speaker: "Doug", example: "I cannot believe a garden gnome is going to ruin my entire week." },
    { expression: "I mean this kindly", meaning: "悪気はないんだけど", meaningEn: "prefacing a tough question to soften it", day: 4, speaker: "Wanda", example: "Doug, can I ask you something, and I mean this kindly?" },
    { expression: "that's a low blow", meaning: "それは卑怯だ", meaningEn: "accusing someone of an unfair, hurtful remark", day: 4, speaker: "Doug", example: "...That's a low blow, Wanda. That's a very low blow." },
    { expression: "let's actually look at it together", meaning: "実際に一緒に見ましょう", meaningEn: "proposing to review evidence as a group", day: 4, speaker: "Aisha", example: "Then let's actually look at the texts together. All of us. One time." },
    { expression: "pass me the exhibit", meaning: "証拠を渡せ", meaningEn: "asking someone to hand over a document", day: 4, speaker: "Doug", example: "...Fine. Pass me the exhibit. The real one." },
    { expression: "that I am leading", meaning: "私が率いてる", meaningEn: "proudly reasserting your role of authority", day: 4, speaker: "Wanda", example: "Snacks I generously shared. With this jury. That I am leading." },

    // ============================================================
    // DAY 5 -- THE VERDICT (15 expressions)
    // ============================================================
    { expression: "you've reached a verdict", meaning: "評決に達した", meaningEn: "confirming a jury has made its decision", day: 5, speaker: "Judge Halloran", example: "Members of the jury, I'm told you've reached a verdict." },
    { expression: "we find the defendant not guilty", meaning: "被告人を無罪とします", meaningEn: "the jury's formal acquittal", day: 5, speaker: "Wanda", example: "We, the jury, find the defendant... not guilty." },
    { expression: "on the grounds that", meaning: "～という理由により", meaningEn: "stating the reason a decision is based on", day: 5, speaker: "Wanda", example: "Not guilty. On the grounds that you cannot steal what was given away." },
    { expression: "I'm going to allow that", meaning: "それを認めましょう", meaningEn: "a judge permitting something unusual", day: 5, speaker: "Judge Halloran", example: "...I'm going to allow that phrasing, because it is, regrettably, accurate." },
    { expression: "I came around", meaning: "考えを改めた", meaningEn: "admitting you changed your mind to agree", day: 5, speaker: "Doug", example: "For the record, I came around. The second text got me." },
    { expression: "I'm not even mad", meaning: "全然怒ってない", meaningEn: "saying you've accepted a bad outcome with surprising peace", day: 5, speaker: "Trevor", example: "I never caught my flight Thursday. And honestly? I'm not even mad." },
    { expression: "was this a good one", meaning: "これっていいやつだった", meaningEn: "asking whether an experience was unusually good", day: 5, speaker: "Mei", example: "Was this a good one? I feel like this was a good one." },
    { expression: "you peaked", meaning: "頂点を極めた", meaningEn: "joking that someone's best moment is already behind them", day: 5, speaker: "Bailiff Reyes", example: "Mei, in nineteen years, this is the gnome case. You peaked." },
    { expression: "it is all downhill from here", meaning: "ここから先は下り坂だけ", meaningEn: "joking that everything afterward will be worse", day: 5, speaker: "Bailiff Reyes", example: "You peaked. It is all downhill from here. Treasure it." },
    { expression: "one of the great honors of my life", meaning: "人生の大きな名誉のひとつ", meaningEn: "earnestly describing something as deeply meaningful", day: 5, speaker: "Wanda", example: "Leading this jury has been one of the great honors of my life." },
    { expression: "you always were", meaning: "ずっとそうだった", meaningEn: "saying someone has always been a certain way", day: 5, speaker: "Wanda", example: "You're 'cheese and crackers,' Doug. You always were." },
    { expression: "I'm a little sad it's over", meaning: "終わるのがちょっと寂しい", meaningEn: "admitting you'll miss something now that it's ending", day: 5, speaker: "Aisha", example: "Now I'm a little sad it's over. That's embarrassing to admit in a courthouse." },
    { expression: "should we exchange numbers", meaning: "連絡先交換しない", meaningEn: "tentatively suggesting staying in touch", day: 5, speaker: "Trevor", example: "Should we, like, exchange numbers? Is that weird?" },
    { expression: "we're basically a family now", meaning: "もうほぼ家族", meaningEn: "joking that shared hardship made you close", day: 5, speaker: "Mei", example: "We decided the fate of fourteen gnomes together. We're basically a family now." },
    { expression: "thanks you for your service", meaning: "務めに感謝します", meaningEn: "formally thanking someone for fulfilling a duty", day: 5, speaker: "Judge Halloran", example: "This court thanks you for your service. Truly." },
];

export const JURY_DUTY_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_JURY_DUTY_EXPRESSIONS = JURY_DUTY_EXPRESSIONS.length;

export const JURY_DUTY_DAY_IDS: Record<number, string> = {
    1: 'jury-day1',
    2: 'jury-day2',
    3: 'jury-day3',
    4: 'jury-day4',
    5: 'jury-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findJuryDutyExpressionLineIndex(
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
