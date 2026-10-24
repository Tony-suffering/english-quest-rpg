/**
 * The Talent Show Expressions -- speakable expressions from Requiem #25.
 * 75 expressions across 5 nights (15 per night). All of them appear verbatim in the
 * conversation, spoken by the listed character, so the Memoria link jumps to the exact line.
 *
 * 舞台が体育館なので「採点」「進行」「やり直し」まわりの型が多い。
 * ただし拾っているのは司会用語ではなく、舞台でも台所でも同じ形で使う話し言葉である。
 */

export interface TalentShowExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const TALENT_SHOW_EXPRESSIONS: TalentShowExpression[] = [
    // ===== NIGHT 1 -- The Trumpet =====
    { expression: "on the way to", meaning: "～へ向かう途中で", meaningEn: "while traveling toward a place", day: 1, speaker: "Principal Henderson", example: "The band bus broke down on Route 9 on the way to the state competition." },
    { expression: "I was misled", meaning: "騙された、話が違う（受け身で穏やかに言う）", meaningEn: "I was given the wrong idea (politely)", day: 1, speaker: "Judge Halloran", example: "I would like it noted that I was misled." },
    { expression: "has seen every movie", meaning: "映画は全部観ている（「全部」で人を紹介する型）", meaningEn: "has watched every film (an exaggeration that introduces a person)", day: 1, speaker: "Julian", example: "Old Man Gus, who has seen every movie that has ever played in this town." },
    { expression: "I want to be clear about something", meaning: "ひとつはっきりさせておきたい", meaningEn: "let me make one thing clear first", day: 1, speaker: "Brandon Lee", example: "I want to be clear about something before I play." },
    { expression: "Is he finished", meaning: "終わった？（まだやってるのかの含み）", meaningEn: "is he done yet (implying it has gone on too long)", day: 1, speaker: "Judge Halloran", example: "Is he finished." },
    { expression: "sit through", meaning: "（長いものを）最後まで座って我慢する", meaningEn: "endure something long from beginning to end", day: 1, speaker: "Old Man Gus", example: "I can sit through this." },
    { expression: "as promised", meaning: "約束どおり、宣言どおり", meaningEn: "just as was promised", day: 1, speaker: "Julian", example: "Seven minutes and forty seconds of, as promised, glory." },
    { expression: "believe in him", meaning: "彼を信じる（能力・可能性を）", meaningEn: "have faith in his ability", day: 1, speaker: "Coach Daryl", example: "I need everybody in this gym to believe in him" },
    { expression: "going for the record", meaning: "記録を狙う", meaningEn: "trying to set a record", day: 1, speaker: "Big Pete", example: "Tonight I am going for the record." },
    { expression: "I am good", meaning: "大丈夫、平気（断り・安心させる）", meaningEn: "I am fine; no help needed", day: 1, speaker: "Big Pete", example: "I am good. I am a furnace." },
    { expression: "for a bit", meaning: "ちょっとの間", meaningEn: "for a short while", day: 1, speaker: "Big Pete", example: "they just get quiet for a bit" },
    { expression: "start over", meaning: "最初からやり直す", meaningEn: "begin again from the beginning", day: 1, speaker: "Tasha", example: "If a single pom-pom hits the floor, we start over." },
    { expression: "nobody is counting", meaning: "誰も数えてない（気にしなくていい）", meaningEn: "no one is keeping score; relax", day: 1, speaker: "Ms. Reyes", example: "it is a fundraiser, nobody is counting." },
    { expression: "I did not enjoy saying that", meaning: "言いたくて言ったんじゃない（認めるのが悔しい）", meaningEn: "it pained me to admit that", day: 1, speaker: "Judge Halloran", example: "Eight. I did not enjoy saying that." },
    { expression: "Who won", meaning: "誰が勝ったの", meaningEn: "who was the winner", day: 1, speaker: "Grandpa Stan", example: "I was resting my eyes. Who won." },

    // ===== NIGHT 2 -- The Complaint =====
    { expression: "behind schedule", meaning: "予定より遅れている", meaningEn: "later than planned", day: 2, speaker: "Donna", example: "We are behind schedule. It is seven oh two." },
    { expression: "of their own free will", meaning: "自分の意志で、強制されずに", meaningEn: "voluntarily, without being forced", day: 2, speaker: "Julian", example: "who signed up of their own free will" },
    { expression: "in writing", meaning: "書面で", meaningEn: "written down as proof", day: 2, speaker: "Julian", example: "which I have in writing." },
    { expression: "go easy on", meaning: "～は控えめに、手加減して", meaningEn: "do not overdo it; be gentle with", day: 2, speaker: "Coach Vega", example: "Daryl. Go easy on the Die Hard." },
    { expression: "there is no such thing as", meaning: "～なんてものは存在しない", meaningEn: "that thing does not exist", day: 2, speaker: "Coach Daryl", example: "There is no such thing as easy on the Die Hard, Vega." },
    { expression: "head in her hands", meaning: "頭を抱えている", meaningEn: "face buried in the hands, in despair", day: 2, speaker: "Paige", example: "The assistant coach has her head in her hands." },
    { expression: "leaving out", meaning: "飛ばしている、抜かしている", meaningEn: "omitting a part", day: 2, speaker: "Old Man Gus", example: "He is leaving out the part with the vent." },
    { expression: "put it down", meaning: "それを置いて（下ろして）", meaningEn: "set it down", day: 2, speaker: "Julian", example: "You may put it down. The building can hear you." },
    { expression: "worth something", meaning: "それなりの価値がある", meaningEn: "has some value", day: 2, speaker: "Judge Halloran", example: "that is worth something in this county." },
    { expression: "I do not know what I just watched", meaning: "今なにを見たのか分からない", meaningEn: "I cannot make sense of what I just saw", day: 2, speaker: "Ray", example: "I do not know what I just watched, and I have been doing this for forty years." },
    { expression: "do not get me started on", meaning: "～の話はさせるな（始めたら止まらない）", meaningEn: "do not bring that up, I will go on forever", day: 2, speaker: "Reggie", example: "Do not get me started on the brisket" },
    { expression: "losing it", meaning: "（笑いで）崩壊している、我を忘れている", meaningEn: "losing control, here from laughter", day: 2, speaker: "Brianna", example: "The gym is losing it." },
    { expression: "a waste of", meaning: "～の無駄", meaningEn: "a squandering of", day: 2, speaker: "Reggie", example: "this was a waste of an evening." },
    { expression: "on time", meaning: "時間どおりに", meaningEn: "punctual", day: 2, speaker: "Reggie", example: "I was on time. The clipboard was early." },
    { expression: "holds its value", meaning: "値が落ちない、価値を保つ", meaningEn: "keeps its worth over time", day: 2, speaker: "Ray", example: "belief holds its value." },

    // ===== NIGHT 3 -- The Calisthenics =====
    { expression: "to be safe", meaning: "念のため", meaningEn: "as a precaution", day: 3, speaker: "Kenji", example: "so I came at five, to be safe." },
    { expression: "stand up", meaning: "立って", meaningEn: "get to your feet", day: 3, speaker: "Kenji", example: "Please stand up. Yes. Everybody." },
    { expression: "you know this one", meaning: "これ知ってるだろ", meaningEn: "you are familiar with this one", day: 3, speaker: "Ken", example: "Sota, help him. You know this one." },
    { expression: "doing it wrong", meaning: "やり方が違う", meaningEn: "not doing it the correct way", day: 3, speaker: "Sota", example: "Dad, you are doing it wrong." },
    { expression: "since I was your age", meaning: "お前の歳のころから", meaningEn: "ever since I was as old as you are now", day: 3, speaker: "Ken", example: "I have done this since I was your age." },
    { expression: "the best I have felt since", meaning: "～以来いちばん調子がいい", meaningEn: "the best I have felt since that time", day: 3, speaker: "Big Pete", example: "This is the best I have felt since the hot dogs." },
    { expression: "against its will", meaning: "意思に反して", meaningEn: "without wanting to", day: 3, speaker: "Judge Halloran", example: "The panel has been made to exercise in public, against its will." },
    { expression: "I resent it", meaning: "それが腹立たしい、癪だ", meaningEn: "it annoys me (even though it is good)", day: 3, speaker: "Judge Halloran", example: "I feel wonderful and I resent it." },
    { expression: "not for sale", meaning: "売り物じゃない", meaningEn: "cannot be bought", day: 3, speaker: "Ray", example: "It is not for sale." },
    { expression: "it is a habit", meaning: "癖なんです", meaningEn: "I do it automatically", day: 3, speaker: "Hana", example: "I know. I am sorry. It is a habit." },
    { expression: "you do not have to apologize", meaning: "謝らなくていい", meaningEn: "no apology is needed", day: 3, speaker: "Ms. Reyes", example: "Hana, you do not have to apologize." },
    { expression: "gone completely silent", meaning: "完全に静まり返った", meaningEn: "became totally quiet", day: 3, speaker: "Paige", example: "because the gym has gone completely silent." },
    { expression: "pick a card", meaning: "カードを1枚選んで", meaningEn: "choose one card (magic trick opener)", day: 3, speaker: "Diego", example: "so I have done it about eleven times. Pick a card." },
    { expression: "do not tell him I told you", meaning: "俺が言ったって言うなよ", meaningEn: "keep it secret that I told you", day: 3, speaker: "Wendell", example: "It was the queen of hearts. Do not tell him I told you." },
    { expression: "not a care in the world", meaning: "何の心配もなく", meaningEn: "completely relaxed and unworried", day: 3, speaker: "Ray", example: "Headphones around his neck, not a care in the world" },

    // ===== NIGHT 4 -- The Lecture =====
    { expression: "did not ask", meaning: "頼んでない、聞いてない", meaningEn: "never requested it", day: 4, speaker: "Devon", example: "A man is going to explain something to a room that did not ask." },
    { expression: "think about that for a second", meaning: "ちょっと考えてみて", meaningEn: "pause and consider that", day: 4, speaker: "Jake", example: "Think about that for a second." },
    { expression: "the worst part", meaning: "最悪だった部分", meaningEn: "the most unpleasant element", day: 4, speaker: "Chloe", example: "it was not the worst part of the evening. The wine was the worst part." },
    { expression: "was an accident", meaning: "わざとじゃなかった、事故だった", meaningEn: "happened unintentionally", day: 4, speaker: "Jake", example: "The wine was an accident." },
    { expression: "is aware of", meaning: "承知している", meaningEn: "knows about", day: 4, speaker: "Judge Halloran", example: "The panel is aware of the wine." },
    { expression: "cannot tell a first date from a lecture", meaning: "AとBの区別がつかない（cannot tell A from B）", meaningEn: "cannot distinguish one thing from another", day: 4, speaker: "Ray", example: "A man who cannot tell a first date from a lecture." },
    { expression: "at his current speed", meaning: "今の速度だと", meaningEn: "at the pace he is going", day: 4, speaker: "Paige", example: "The football formation is fifteen minutes away at his current speed." },
    { expression: "I am going to have to", meaning: "申し訳ないがそろそろ～しないと", meaningEn: "polite way to say you must interrupt or stop something", day: 4, speaker: "Julian", example: "Mr. Kowalski, beautiful person, I am going to have to --" },
    { expression: "would have preferred not to", meaning: "できればしたくなかった", meaningEn: "would rather not have", day: 4, speaker: "Judge Halloran", example: "The panel learned something and would have preferred not to." },
    { expression: "I counted", meaning: "数えてた", meaningEn: "I kept count", day: 4, speaker: "Sam", example: "Grandpa, we stopped nine times. I counted." },
    { expression: "the real thing", meaning: "本物", meaningEn: "the genuine article", day: 4, speaker: "Ray", example: "Now that is the real thing." },
    { expression: "would not change a scratch on it", meaning: "傷ひとつ直したくない（そのままが一番）", meaningEn: "would not alter a single thing about it", day: 4, speaker: "Ray", example: "Eight. I would not change a scratch on it." },
    { expression: "works better than", meaning: "～より効く", meaningEn: "is more effective than", day: 4, speaker: "Timmy", example: "It works better than the bear." },
    { expression: "going to do it anyway", meaning: "それでもやる", meaningEn: "will do it regardless", day: 4, speaker: "Judge Halloran", example: "The panel is going to do it anyway. Ten." },
    { expression: "not going to make it", meaning: "間に合わない、届かない", meaningEn: "will not reach the goal", day: 4, speaker: "Paige", example: "My log says we are not going to make it." },

    // ===== NIGHT 5 -- The Bus =====
    { expression: "for the last time", meaning: "これが最後", meaningEn: "on the final occasion", day: 5, speaker: "Julian", example: "Hello, beautiful people, for the last time this week" },
    { expression: "meant this much", meaning: "こんなに意味を持った", meaningEn: "mattered this much", day: 5, speaker: "Julian", example: "it has never once meant this much." },
    { expression: "prepared accordingly", meaning: "それに合わせて用意した", meaningEn: "got ready in a way that fits the situation", day: 5, speaker: "Derek", example: "The room is, on average, sixty-eight years old. I have prepared accordingly." },
    { expression: "that is our song", meaning: "俺たちの曲だ", meaningEn: "the song that belongs to us as a couple", day: 5, speaker: "Marv", example: "Arlene. That is our song." },
    { expression: "that settles it", meaning: "それで決まりね（議論終了）", meaningEn: "that ends the discussion", day: 5, speaker: "Arlene", example: "Well, that settles it." },
    { expression: "do not tell them", meaning: "言うなよ", meaningEn: "keep it from them", day: 5, speaker: "Derek", example: "There is no fog machine. Do not tell them." },
    { expression: "I do not give tens", meaning: "10は付けない主義だ", meaningEn: "I never award a perfect score", day: 5, speaker: "Ray", example: "Ten. And I do not give tens." },
    { expression: "we are short", meaning: "足りない", meaningEn: "we do not have enough", day: 5, speaker: "Ms. Reyes", example: "We are short. We are one thousand eight hundred and sixty dollars short." },
    { expression: "in the right building", meaning: "ここで合ってる？", meaningEn: "at the correct place", day: 5, speaker: "Duke", example: "Am I in the right building? Somebody called about a bus." },
    { expression: "about that", meaning: "それなんだけど（切り出し）", meaningEn: "regarding that (leading into awkward news)", day: 5, speaker: "Duke", example: "Yeah, about that. It is not the transmission." },
    { expression: "on the house", meaning: "サービスです、店のおごり", meaningEn: "free of charge", day: 5, speaker: "Duke", example: "the soda was mine, so that is on the house." },
    { expression: "I am going to need a minute", meaning: "ちょっと時間をください（気持ちの整理）", meaningEn: "I need a moment to process this", day: 5, speaker: "Paige", example: "I am going to need a minute." },
    { expression: "wrong about one thing", meaning: "ひとつ間違っていた", meaningEn: "mistaken on one point", day: 5, speaker: "Brandon Lee", example: "I have thought about it all week. I was wrong about one thing." },
    { expression: "at any price", meaning: "いくら出しても", meaningEn: "no matter how much money", day: 5, speaker: "Ray", example: "you cannot buy that at any price." },
    { expression: "it was not a compliment", meaning: "褒めてない", meaningEn: "I did not mean it as praise", day: 5, speaker: "Reggie", example: "It was not a compliment." },
];

export const TALENT_SHOW_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_TALENT_SHOW_EXPRESSIONS = TALENT_SHOW_EXPRESSIONS.length;

export const TALENT_SHOW_DAY_IDS: Record<number, string> = {
    1: 'talent-day1',
    2: 'talent-day2',
    3: 'talent-day3',
    4: 'talent-day4',
    5: 'talent-day5',
};

export function findTalentShowExpressionLineIndex(
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
