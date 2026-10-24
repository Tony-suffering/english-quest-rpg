/**
 * ER Waiting Room Expressions -- casual expressions from ER Waiting Room scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Nurse Tanya(38F), Dave(40M), Renata(39F), Walter(71M), Destiny(24F),
 *   Little Mateo(2M), Brody(28M), Dr Osei(45M), Phil(50M)
 */

export interface ErExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const ER_EXPRESSIONS: ErExpression[] = [
    // ============================================================
    // DAY 1 -- THE TRIAGE (15 expressions)
    // ============================================================
    { expression: "how did this happen", meaning: "これどうやってなったの", meaningEn: "asking someone to explain how an injury or problem occurred", day: 1, speaker: "Nurse Tanya", example: "Don't unwrap it yet, just -- okay, how did this happen?" },
    { expression: "it's honestly not that bad", meaning: "正直そんなにひどくない", meaningEn: "downplaying an injury to seem tough or calm", day: 1, speaker: "Dave", example: "It's honestly not that bad. I was -- so what happened was, I was cutting some trim." },
    { expression: "got away from me", meaning: "制御できなくなった", meaningEn: "something slipped out of your control unexpectedly", day: 1, speaker: "Dave", example: "I was cutting some trim, and the saw kind of... got away from me." },
    { expression: "I have told him a hundred times", meaning: "百回は言った", meaningEn: "expressing frustration that advice was repeatedly ignored", day: 1, speaker: "Renata", example: "I have told him a hundred times to wear the gloves." },
    { expression: "I want to be straight with you", meaning: "正直に言うと", meaningEn: "signaling you're about to be honest, even if it's bad news", day: 1, speaker: "Nurse Tanya", example: "Here's the thing, and I want to be straight with you: it is not life-threatening." },
    { expression: "that's what I said", meaning: "俺もそう言った", meaningEn: "claiming your earlier opinion has just been confirmed", day: 1, speaker: "Dave", example: "Right, see, that's what I said." },
    { expression: "this isn't what you want to hear", meaning: "聞きたくないだろうけど", meaningEn: "softening bad news before delivering it", day: 1, speaker: "Nurse Tanya", example: "I know this isn't what you want to hear -- you're gonna be waiting a while." },
    { expression: "we're slammed tonight", meaning: "今夜うちパンク状態", meaningEn: "extremely busy and overwhelmed with work", day: 1, speaker: "Nurse Tanya", example: "We're slammed tonight. It's a Saturday." },
    { expression: "could be more", meaning: "もっとかも", meaningEn: "warning that an estimate might run higher", day: 1, speaker: "Nurse Tanya", example: "Honestly? Five, six hours. Could be more." },
    { expression: "he's gonna be unbearable", meaning: "耐えがたいくらい愚痴る", meaningEn: "predicting someone will be very annoying to deal with", day: 1, speaker: "Renata", example: "He's gonna be unbearable. Just so you know." },
    { expression: "just so you know", meaning: "一応言っとくけど", meaningEn: "giving someone a heads-up about something", day: 1, speaker: "Renata", example: "He's gonna be unbearable. Just so you know. For all six hours." },
    { expression: "I'm sitting right here", meaning: "俺ここに座ってるんだけど", meaningEn: "protesting that someone is talking about you in front of you", day: 1, speaker: "Dave", example: "Dave: I'm sitting right here." },
    { expression: "go take a seat", meaning: "席に座って", meaningEn: "telling someone to sit down and wait", day: 1, speaker: "Nurse Tanya", example: "Okay -- go take a seat, keep that hand up above your heart." },
    { expression: "somebody will call your name", meaning: "誰かが名前を呼ぶ", meaningEn: "how you'll be told it's your turn to be seen", day: 1, speaker: "Nurse Tanya", example: "Fill out the clipboard, and somebody will call your name. Eventually." },
    { expression: "this is gonna be a long night", meaning: "長い夜になりそうだ", meaningEn: "bracing for a difficult or tedious stretch ahead", day: 1, speaker: "Dave", example: "Above my heart. Got it. Great. This is gonna be a long night." },

    // ============================================================
    // DAY 2 -- THE LONG WAIT (15 expressions)
    // ============================================================
    { expression: "you picked a rough night", meaning: "ひどい夜を選んだね", meaningEn: "commenting that someone arrived at a bad time", day: 2, speaker: "Walter", example: "You picked a rough night, friend." },
    { expression: "if you don't mind me asking", meaning: "聞いていいなら", meaningEn: "politely prefacing a personal or nosy question", day: 2, speaker: "Dave", example: "What are you in for, if you don't mind me asking?" },
    { expression: "what are you in for", meaning: "何で来たんですか", meaningEn: "casually asking why someone is at the hospital", day: 2, speaker: "Dave", example: "What are you in for, if you don't mind me asking?" },
    { expression: "it's a little embarrassing", meaning: "ちょっと恥ずかしい", meaningEn: "admitting a situation makes you feel mildly ashamed", day: 2, speaker: "Walter", example: "It's a little embarrassing, because I had a meatball sub at nine." },
    { expression: "told me everything", meaning: "全部わかった", meaningEn: "a small clue revealed the full truth", day: 2, speaker: "Walter", example: "The nurse smiled in a way that told me everything." },
    { expression: "at least you can sit still", meaning: "少なくともじっと座れてる", meaningEn: "pointing out someone else has it slightly better", day: 2, speaker: "Destiny", example: "At least you can sit still. I have been walking this same loop for two hours." },
    { expression: "how old is he", meaning: "この子いくつ", meaningEn: "asking the age of a child", day: 2, speaker: "Renata", example: "Renata: How old is he?" },
    { expression: "I'm probably overreacting", meaning: "たぶん大げさなんだろうけど", meaningEn: "second-guessing whether your worry is justified", day: 2, speaker: "Destiny", example: "I don't know, I'm probably overreacting, everybody keeps telling me kids run hot." },
    { expression: "you did the right thing", meaning: "それで正解よ", meaningEn: "reassuring someone their choice was correct", day: 2, speaker: "Renata", example: "A hundred and three with a toddler? You did the right thing coming in." },
    { expression: "Mama's got you", meaning: "ママがいるよ", meaningEn: "comforting words telling someone you'll take care of them", day: 2, speaker: "Destiny", example: "I know, baby, I know. Mama's got you." },
    { expression: "hear me out", meaning: "聞いてよ", meaningEn: "asking someone to listen fully before judging your idea", day: 2, speaker: "Brody", example: "Like -- hear me out -- where else are nine random strangers all just stuck together?" },
    { expression: "stuck together", meaning: "一緒に閉じ込められて", meaningEn: "forced into the same situation with others", day: 2, speaker: "Brody", example: "Where else are nine random strangers all just stuck together, rooting for each other?" },
    { expression: "I'm choosing to stay positive", meaning: "前向きでいることにしてる", meaningEn: "deciding to keep an upbeat attitude despite trouble", day: 2, speaker: "Brody", example: "I rolled it pretty bad, but yeah, I'm choosing to stay positive." },
    { expression: "take notes", meaning: "メモしなさい", meaningEn: "telling someone they should learn from a good example", day: 2, speaker: "Renata", example: "Dave, take notes. That is how you wait." },
    { expression: "he's not a role model", meaning: "手本になる男じゃない", meaningEn: "denying that someone is worth imitating", day: 2, speaker: "Dave", example: "He's still in his jersey, Renata. He's not a role model." },

    // ============================================================
    // DAY 3 -- HOUR FOUR (15 expressions)
    // ============================================================
    { expression: "I have a question for the group", meaning: "みんなに質問がある", meaningEn: "announcing you want to ask everyone present something", day: 3, speaker: "Brody", example: "I have a question for the group, and I need everybody to be honest." },
    { expression: "the dumbest question I have ever heard", meaning: "今まで聞いた中で一番バカな質問", meaningEn: "calling something extremely silly or pointless", day: 3, speaker: "Dave", example: "That is the dumbest question I have ever heard, and yet I have been awake for nineteen hours." },
    { expression: "no offense", meaning: "悪く取らないで", meaningEn: "softening something that might sound insulting", day: 3, speaker: "Walter", example: "No offense, son, but at least an ankle is a real story." },
    { expression: "it has become its own character", meaning: "独立したキャラクターになってる", meaningEn: "joking that something talked about too much has taken on a life", day: 3, speaker: "Renata", example: "You have been telling us about that sandwich for two hours. It has become its own character." },
    { expression: "don't anybody breathe", meaning: "誰も息しないで", meaningEn: "comically asking everyone to stay totally still and quiet", day: 3, speaker: "Destiny", example: "He's finally asleep. Don't anybody breathe. I'm serious." },
    { expression: "we'll keep it down", meaning: "静かにしとくわ", meaningEn: "promising to be quiet so as not to disturb someone", day: 3, speaker: "Renata", example: "We'll keep it down. Go. Stare at your wall." },
    { expression: "you know what's funny", meaning: "おかしいよな", meaningEn: "prefacing an amusing or ironic observation", day: 3, speaker: "Dave", example: "You know what's funny -- and I'd never say this sober." },
    { expression: "I don't hate this", meaning: "これ嫌いじゃない", meaningEn: "grudgingly admitting you actually like something", day: 3, speaker: "Dave", example: "And now I'm kind of... I don't hate this." },
    { expression: "I want it on the record", meaning: "記録に残したい", meaningEn: "wanting something officially noted, often jokingly", day: 3, speaker: "Renata", example: "Say that again. Loudly. I want it on the record." },
    { expression: "the moment's gone", meaning: "その瞬間は終わった", meaningEn: "saying a chance for something has already passed", day: 3, speaker: "Dave", example: "I'm not saying it again. The moment's gone." },
    { expression: "nobody's on their phone", meaning: "誰もスマホいじってない", meaningEn: "noting that people are present and attentive instead of distracted", day: 3, speaker: "Brody", example: "Nobody's on their phone, everybody's just... here. Together." },
    { expression: "I genuinely can't tell which", meaning: "本当にどっちか判断できない", meaningEn: "unable to decide between two interpretations", day: 3, speaker: "Renata", example: "That's either very sad or the most romantic thing, and I genuinely can't tell which." },
    { expression: "it's always both", meaning: "いつだって両方", meaningEn: "saying two opposite things are true at the same time", day: 3, speaker: "Walter", example: "Forty-five years of marriage. It's both. It's always both." },
    { expression: "that actually meant a lot", meaning: "あれ本当に助かった", meaningEn: "sincerely thanking someone for a small kindness", day: 3, speaker: "Destiny", example: "Thank you. All of you. For keeping it down. That actually meant a lot." },
    { expression: "don't push it", meaning: "調子に乗らないで", meaningEn: "warning someone not to take a joke or situation too far", day: 3, speaker: "Renata", example: "Don't push it, Brody." },

    // ============================================================
    // DAY 4 -- CALLED BACK (15 expressions)
    // ============================================================
    { expression: "we're ready for you", meaning: "準備できたわよ", meaningEn: "telling someone it's their turn to come in", day: 4, speaker: "Nurse Tanya", example: "Dave? We're ready for you." },
    { expression: "come on back", meaning: "奥に来て", meaningEn: "inviting someone to follow you into a back room", day: 4, speaker: "Nurse Tanya", example: "Come on back, your wife can come too." },
    { expression: "let's have a look at this", meaning: "見てみましょう", meaningEn: "saying you're about to examine something", day: 4, speaker: "Dr Osei", example: "I'm Dr Osei, let's have a look at this hand." },
    { expression: "let's not downplay it", meaning: "軽く見ないように", meaningEn: "telling someone to take a problem seriously", day: 4, speaker: "Dr Osei", example: "You needed six stitches, so let's not downplay it." },
    { expression: "I see this all the time", meaning: "こういうのいつも見る", meaningEn: "saying a situation is very familiar to you professionally", day: 4, speaker: "Dr Osei", example: "I see this all the time, and the guys who downplay it skip the follow-up." },
    { expression: "don't be that guy", meaning: "そういう人にならないで", meaningEn: "warning someone not to repeat a known bad behavior", day: 4, speaker: "Dr Osei", example: "The guys who downplay it end up back here. Don't be that guy." },
    { expression: "you'll feel a pinch", meaning: "チクッとする", meaningEn: "warning a patient about a brief sharp sensation", day: 4, speaker: "Dr Osei", example: "You'll feel a pinch, then a sting, and then honestly nothing." },
    { expression: "I've had worse", meaning: "もっとひどいの経験してる", meaningEn: "claiming you can handle pain because of past experience", day: 4, speaker: "Dave", example: "A pinch. Okay. I've had worse. I'm fine." },
    { expression: "look at your wife, not at me", meaning: "私じゃなく奥さんを見て", meaningEn: "redirecting a nervous person's attention away from a procedure", day: 4, speaker: "Dr Osei", example: "It's a normal needle, Dave. Look at your wife, not at me." },
    { expression: "you're going pale", meaning: "顔が青くなってる", meaningEn: "pointing out someone looks like they might faint", day: 4, speaker: "Renata", example: "Six hours of telling everyone how tough you are, and you're going pale." },
    { expression: "the lighting in here is bad", meaning: "ここの照明が悪い", meaningEn: "blaming surroundings to deny looking unwell", day: 4, speaker: "Dave", example: "I'm not pale. The lighting in here is bad. Everybody looks like that." },
    { expression: "am I allowed to watch", meaning: "見てもいいですか", meaningEn: "asking permission to observe something happening to you", day: 4, speaker: "Dave", example: "Can I -- am I allowed to watch?" },
    { expression: "your call", meaning: "お好きにどうぞ", meaningEn: "telling someone the decision is theirs to make", day: 4, speaker: "Dr Osei", example: "Some people watch one stitch and decide they're done. Your call." },
    { expression: "one was plenty", meaning: "1針で十分", meaningEn: "saying a small amount of something was more than enough", day: 4, speaker: "Dave", example: "Yeah, I'm done watching. One was plenty." },
    { expression: "you did great", meaning: "よく頑張った", meaningEn: "reassuring someone they handled something well", day: 4, speaker: "Dr Osei", example: "Almost done. You did great, honestly." },

    // ============================================================
    // DAY 5 -- DISCHARGED (15 expressions)
    // ============================================================
    { expression: "I need a signature here", meaning: "ここに署名が必要", meaningEn: "directing someone where to sign paperwork", day: 5, speaker: "Phil", example: "I need a signature here, your initials here, here, and here." },
    { expression: "has your insurance information changed", meaning: "保険情報に変更はありましたか", meaningEn: "a routine intake question about updated coverage details", day: 5, speaker: "Phil", example: "Has your insurance information changed since the last visit?" },
    { expression: "that would be a no", meaning: "それは「いいえ」ですね", meaningEn: "deadpan way of recording an obvious negative answer", day: 5, speaker: "Phil", example: "So that would be a no. Has your insurance information changed since the last visit." },
    { expression: "I filled all of that out", meaning: "それ全部記入した", meaningEn: "protesting that you already provided the information", day: 5, speaker: "Renata", example: "I filled all of that out at hour one, Phil." },
    { expression: "I have to ask the questions", meaning: "質問を聞かないといけない", meaningEn: "explaining you're required to follow a procedure", day: 5, speaker: "Phil", example: "I have to ask the questions on the screen in the order the screen gives them." },
    { expression: "hold on", meaning: "ちょっと待って", meaningEn: "asking for a moment while you try to recall something", day: 5, speaker: "Dave", example: "I -- uh -- okay, hold on, it's, um -- two seconds." },
    { expression: "I'll put down", meaning: "～と記入しておく", meaningEn: "saying you'll write a particular answer on a form", day: 5, speaker: "Phil", example: "I'll put down Reynolds. Wound care instructions -- keep it clean and dry." },
    { expression: "keep it clean and dry", meaning: "清潔に乾いた状態を保つ", meaningEn: "standard instruction for caring for a wound", day: 5, speaker: "Phil", example: "Wound care instructions -- keep it clean and dry, no heavy lifting for two weeks." },
    { expression: "you're heading out", meaning: "帰るところ", meaningEn: "noticing that someone is about to leave", day: 5, speaker: "Nurse Tanya", example: "Hey -- the saw guy, you're heading out? Good." },
    { expression: "you survived your six hours", meaning: "6時間を生き延びた", meaningEn: "congratulating someone for getting through an ordeal", day: 5, speaker: "Nurse Tanya", example: "Good. You survived your six hours." },
    { expression: "no offense, but", meaning: "悪く取らないでほしいけど", meaningEn: "prefacing a blunt remark to keep it friendly", day: 5, speaker: "Dave", example: "Tanya, no offense, but I hope I never see you again." },
    { expression: "I called it", meaning: "言い当てた", meaningEn: "claiming you correctly predicted an outcome", day: 5, speaker: "Brody", example: "Told you we'd be fine. Hour two, I called it." },
    { expression: "scared out of my mind", meaning: "怖くて気が変になりそう", meaningEn: "describing being extremely frightened", day: 5, speaker: "Destiny", example: "I came in here scared out of my mind and you all just... made it okay." },
    { expression: "for the record", meaning: "記録のために言うと", meaningEn: "stating something clearly so it's officially understood", day: 5, speaker: "Walter", example: "It was heartburn. For the record. Six hours, and it was the sandwich." },
    { expression: "I don't know what to do with that", meaning: "どう受け止めればいいかわからない", meaningEn: "saying an unexpected feeling or fact leaves you unsure", day: 5, speaker: "Dave", example: "You people made a six-hour wait not the worst night of my life. I don't know what to do with that." },
];

export const ER_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_ER_EXPRESSIONS = ER_EXPRESSIONS.length;

export const ER_DAY_IDS: Record<number, string> = {
    1: 'er-day1',
    2: 'er-day2',
    3: 'er-day3',
    4: 'er-day4',
    5: 'er-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findErExpressionLineIndex(
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
