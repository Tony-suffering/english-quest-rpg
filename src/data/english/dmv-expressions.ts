/**
 * The DMV Expressions -- casual expressions from The DMV scenario
 * 75 expressions across 5 days (15 per day), all commonly used in spoken English
 * Characters: Gloria(52F), Tony(33M), Brenda(60F), Kevin(17M), Mr Okafor(45M),
 *   Patrice(28F), Vernon(70M)
 */

export interface DmvExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const DMV_EXPRESSIONS: DmvExpression[] = [
    // ============================================================
    // DAY 1 -- TAKE A NUMBER (15 expressions)
    // ============================================================
    { expression: "what are you here for", meaning: "どのご用件ですか", meaningEn: "asking the reason someone has come somewhere", day: 1, speaker: "Patrice", example: "Morning. What are you here for today -- renewal, new license, registration, road test?" },
    { expression: "it should be quick", meaning: "すぐ終わるはず", meaningEn: "optimistically predicting something won't take long", day: 1, speaker: "Tony", example: "Just a renewal. It should be quick, right? It's just a renewal." },
    { expression: "take this", meaning: "これどうぞ", meaningEn: "handing something to someone", day: 1, speaker: "Patrice", example: "Mm. Take this. You're G47. We're currently serving G12." },
    { expression: "we're currently serving", meaning: "ただいまお呼びしています", meaningEn: "announcing which number is being helped now", day: 1, speaker: "Patrice", example: "You're G47. We're currently serving G12." },
    { expression: "it moves faster than it looks", meaning: "見た目より早く進む", meaningEn: "reassuring that something is quicker than it appears", day: 1, speaker: "Patrice", example: "Some of them won't show, so it moves faster than it looks." },
    { expression: "have a seat anywhere that's open", meaning: "空いてる席にどうぞ", meaningEn: "inviting someone to sit wherever there is space", day: 1, speaker: "Patrice", example: "Have a seat anywhere that's open." },
    { expression: "I'm resting my eyes", meaning: "目を休めてる", meaningEn: "claiming you're not asleep, just closing your eyes", day: 1, speaker: "Vernon", example: "I'm not asleep. I'm resting my eyes. Big difference." },
    { expression: "big difference", meaning: "全然違う", meaningEn: "insisting two similar things are actually very different", day: 1, speaker: "Vernon", example: "I'm resting my eyes. Big difference." },
    { expression: "I'm here for justice", meaning: "正義のために来た", meaningEn: "dramatically stating you came to right a wrong", day: 1, speaker: "Vernon", example: "I'm not here for service. I'm here for justice. They rejected my plate." },
    { expression: "everything is offensive to somebody", meaning: "何だって誰かには不快", meaningEn: "saying you can't please everyone because anything offends someone", day: 1, speaker: "Brenda", example: "Honey, everything is offensive to somebody." },
    { expression: "I'm missing one document", meaning: "書類が1個足りない", meaningEn: "explaining you lack a single required paper", day: 1, speaker: "Brenda", example: "Every time I come in, I'm missing one document. One." },
    { expression: "it's a system", meaning: "これはもう仕組み", meaningEn: "darkly joking that a frustrating process is deliberately designed", day: 1, speaker: "Brenda", example: "They tell me which one is missing only after two hours. It's a system." },
    { expression: "up front", meaning: "最初に", meaningEn: "telling someone something at the start, in advance", day: 1, speaker: "Kevin", example: "Wait, so they don't tell you what you need up front?" },
    { expression: "I think I'm gonna throw up", meaning: "吐きそう", meaningEn: "saying you feel sick from nerves", day: 1, speaker: "Kevin", example: "I'm here for my road test. I'm seventeen. I think I'm gonna throw up." },
    { expression: "we're all in this together", meaning: "運命共同体ね", meaningEn: "saying everyone shares the same hardship", day: 1, speaker: "Brenda", example: "Sit down. We're all in this together now." },

    // ============================================================
    // DAY 2 -- THE WRONG FORM (15 expressions)
    // ============================================================
    { expression: "I don't have all day", meaning: "一日中はないのよ", meaningEn: "telling someone to hurry up", day: 2, speaker: "Gloria", example: "Let's go, hon, I don't have all day." },
    { expression: "that's the wrong form", meaning: "それ間違った用紙", meaningEn: "telling someone they filled out the incorrect paperwork", day: 2, speaker: "Gloria", example: "Yeah, that's the wrong form. This is the DL-44." },
    { expression: "they look identical", meaning: "見た目同じ", meaningEn: "complaining that two things appear exactly the same", day: 2, speaker: "Tony", example: "Tony: They look identical." },
    { expression: "that's how we get you", meaning: "そうやって引っかける", meaningEn: "jokingly admitting a small detail is a trap", day: 2, speaker: "Gloria", example: "They are identical except for the A. That's how we get you." },
    { expression: "proof of residency", meaning: "住所証明", meaningEn: "documents that prove where you live", day: 2, speaker: "Gloria", example: "I'm gonna need proof of residency. Two documents, dated within ninety days." },
    { expression: "something that came in the mail", meaning: "郵便で届いた何か", meaningEn: "a physical letter used as official proof", day: 2, speaker: "Gloria", example: "A utility bill, a bank statement -- something that came in the mail." },
    { expression: "nothing comes in the mail anymore", meaning: "もう郵便なんて来ない", meaningEn: "noting that everything is digital now", day: 2, speaker: "Tony", example: "Nothing comes in the mail anymore. It's all online." },
    { expression: "the answer's the same", meaning: "答えはいつも同じ", meaningEn: "saying the response never changes no matter the complaint", day: 2, speaker: "Gloria", example: "I hear that fifty times a day, and the answer's the same: print it out." },
    { expression: "print it out", meaning: "印刷して", meaningEn: "telling someone to make a paper copy", day: 2, speaker: "Gloria", example: "The answer's the same: print it out. A printed PDF counts." },
    { expression: "I have to come back", meaning: "出直さなきゃいけない", meaningEn: "realizing you must return another time", day: 2, speaker: "Tony", example: "So I waited two hours to find out I have to come back." },
    { expression: "you're ahead of the curve", meaning: "先行ってる方", meaningEn: "saying someone is doing better than most people", day: 2, speaker: "Gloria", example: "Last guy figured it out on visit four. You're ahead of the curve." },
    { expression: "go easy on him", meaning: "優しくしてあげて", meaningEn: "asking someone not to be too harsh on a person", day: 2, speaker: "Brenda", example: "He's a fast learner, Gloria. Go easy on him. He's new." },
    { expression: "are we doing this dance again", meaning: "またこのダンスやる", meaningEn: "asking if a frustrating routine is about to repeat", day: 2, speaker: "Gloria", example: "Did you bring the proof of insurance, or are we doing this dance again?" },
    { expression: "don't say it", meaning: "言わないで", meaningEn: "asking someone not to point out your obvious mistake", day: 2, speaker: "Brenda", example: "I know, Gloria. I know. Don't say it. I'll see you Thursday." },
    { expression: "I'll see you Thursday", meaning: "木曜にまた来る", meaningEn: "resigned acknowledgment that you'll be back again", day: 2, speaker: "Brenda", example: "Don't say it. I'll see you Thursday." },

    // ============================================================
    // DAY 3 -- THE EYE TEST (15 expressions)
    // ============================================================
    { expression: "look at you", meaning: "見違えた", meaningEn: "expressing pleasant surprise at someone's progress", day: 3, speaker: "Gloria", example: "Now you've got the right form, the right documents -- look at you. Growth." },
    { expression: "step up to the machine", meaning: "機械の前に立って", meaningEn: "directing someone to approach a device", day: 3, speaker: "Gloria", example: "Step up to the machine, put your forehead on the rest, and read me line four." },
    { expression: "it gets kind of soft", meaning: "なんかぼやけてくる", meaningEn: "describing something becoming blurry or unclear", day: 3, speaker: "Tony", example: "There's definitely a P. And then it gets kind of... soft." },
    { expression: "when did you last get your eyes checked", meaning: "最後に目を検査したのいつ", meaningEn: "asking when someone last had an eye exam", day: 3, speaker: "Gloria", example: "People your age usually clear line six. When did you last get your eyes checked?" },
    { expression: "I've been meaning to", meaning: "ずっとやろうとは思ってて", meaningEn: "admitting you intended to do something but never did", day: 3, speaker: "Tony", example: "Recently-ish. There was a thing. I've been meaning to." },
    { expression: "so never", meaning: "つまり一度もない", meaningEn: "bluntly translating a vague answer into 'never'", day: 3, speaker: "Gloria", example: "So never. That's fine. You pass at line four, barely." },
    { expression: "welcome to your thirties", meaning: "30代へようこそ", meaningEn: "joking that aging brings new annoyances", day: 3, speaker: "Gloria", example: "You drive with glasses now. Welcome to your thirties." },
    { expression: "I didn't agree to this", meaning: "こんなの同意してない", meaningEn: "protesting an unwanted change you can't control", day: 3, speaker: "Tony", example: "I'm thirty-three. I didn't agree to this." },
    { expression: "it just happens to you", meaning: "勝手に降りかかってくる", meaningEn: "saying something unwanted comes whether you like it or not", day: 3, speaker: "Gloria", example: "Nobody agrees to it, hon. It just happens to you." },
    { expression: "is it hard", meaning: "難しいですか", meaningEn: "asking whether a task is difficult", day: 3, speaker: "Kevin", example: "Mr Tony? Is the eye test hard?" },
    { expression: "you'll smoke it", meaning: "楽勝だよ", meaningEn: "predicting someone will do something very easily", day: 3, speaker: "Tony", example: "You're seventeen. Your eyes are brand new. You'll smoke it." },
    { expression: "my hands are shaking", meaning: "手が震えてる", meaningEn: "describing trembling from nerves", day: 3, speaker: "Kevin", example: "My hands are shaking. Look. Is that normal?" },
    { expression: "look at me", meaning: "俺を見ろ", meaningEn: "demanding attention to deliver reassurance", day: 3, speaker: "Tony", example: "Hey. Look at me. Everybody in this room has failed at something today." },
    { expression: "that actually helped", meaning: "今のけっこう効いた", meaningEn: "admitting advice was genuinely comforting", day: 3, speaker: "Kevin", example: "...Okay. Okay. That actually helped." },
    { expression: "move along", meaning: "進んで", meaningEn: "telling people to keep moving and not linger", day: 3, speaker: "Gloria", example: "Now both of you move along, I've got a line out the door." },

    // ============================================================
    // DAY 4 -- THE ROAD TEST (15 expressions)
    // ============================================================
    { expression: "take a breath", meaning: "深呼吸して", meaningEn: "telling someone to calm down", day: 4, speaker: "Mr Okafor", example: "I'm Mr Okafor, I'll be your examiner. Take a breath." },
    { expression: "those are different things", meaning: "それは別物だよ", meaningEn: "distinguishing two ideas people often confuse", day: 4, speaker: "Mr Okafor", example: "I'm here to see if you can drive. Those are different things." },
    { expression: "whenever you're ready", meaning: "準備ができたらいつでも", meaningEn: "telling someone there's no rush to begin", day: 4, speaker: "Mr Okafor", example: "Start the car whenever you're ready." },
    { expression: "that's a free point", meaning: "それ無料の点だよ", meaningEn: "joking that an easy action earns credit effortlessly", day: 4, speaker: "Mr Okafor", example: "Adjust your mirrors before you pull out. That's a free point." },
    { expression: "take your time", meaning: "ゆっくりでいい", meaningEn: "reassuring someone they don't need to hurry", day: 4, speaker: "Mr Okafor", example: "Take your time. Find the wipers. There is no clock on this." },
    { expression: "how's he doing out there", meaning: "あの子どうなってる", meaningEn: "anxiously asking about someone's progress nearby", day: 4, speaker: "Tony", example: "How's he doing out there? I can see the car." },
    { expression: "please face forward", meaning: "前を向いてください", meaningEn: "politely telling someone to turn around and wait", day: 4, speaker: "Patrice", example: "Sir, you're in line for the photo. Please face forward." },
    { expression: "I'm invested now", meaning: "もう感情移入しちゃって", meaningEn: "admitting you care deeply about an outcome", day: 4, speaker: "Tony", example: "That kid was shaking earlier. I'm invested now." },
    { expression: "look at him go", meaning: "いいぞ", meaningEn: "cheering someone on as they succeed", day: 4, speaker: "Tony", example: "He's signaling! Look at him go!" },
    { expression: "tighten it up", meaning: "もっと小さく", meaningEn: "telling someone to make a turn or motion sharper", day: 4, speaker: "Tony", example: "That's a really wide turn -- come on, Kevin, tighten it up." },
    { expression: "stop apologizing", meaning: "謝るのやめて", meaningEn: "telling someone to quit saying sorry", day: 4, speaker: "Mr Okafor", example: "You've got tons of room. Stop apologizing and park." },
    { expression: "did I pass", meaning: "受かりましたか", meaningEn: "anxiously asking if you succeeded on a test", day: 4, speaker: "Kevin", example: "Did I pass? I clipped the cone. I definitely clipped the cone." },
    { expression: "you tapped the cone", meaning: "コーンに軽く触れた", meaningEn: "describing a light, minor contact", day: 4, speaker: "Mr Okafor", example: "You tapped the cone. Tapping is a deduction, not a fail." },
    { expression: "you didn't panic", meaning: "パニックにならなかった", meaningEn: "praising someone for staying calm under pressure", day: 4, speaker: "Mr Okafor", example: "You didn't panic when the wipers betrayed you. Kevin -- you passed." },
    { expression: "did you hear that", meaning: "聞きました", meaningEn: "excitedly asking others to confirm good news", day: 4, speaker: "Kevin", example: "Tony, I passed! Did you hear that?" },

    // ============================================================
    // DAY 5 -- SMILE FOR THE CAMERA (15 expressions)
    // ============================================================
    { expression: "last step", meaning: "最後の手順", meaningEn: "announcing the final part of a process", day: 5, speaker: "Patrice", example: "Okay, Tony, last step. Stand on the line, chin up." },
    { expression: "chin up", meaning: "あごを上げて", meaningEn: "telling someone to lift their chin, often for a photo", day: 5, speaker: "Patrice", example: "Stand on the line, chin up, and look at the little camera." },
    { expression: "can I see it", meaning: "見られますか", meaningEn: "asking to look at a result before it's finalized", day: 5, speaker: "Tony", example: "Wait, that's it? Can I see it?" },
    { expression: "can we do it again", meaning: "もう一回いけますか", meaningEn: "asking for a redo of something", day: 5, speaker: "Tony", example: "I look like I'm being woken up against my will. Can we do it again?" },
    { expression: "that's the one", meaning: "それで確定", meaningEn: "saying a result is final and won't be changed", day: 5, speaker: "Patrice", example: "We cannot do it again. That's the one. That's you until 2034." },
    { expression: "it's tradition", meaning: "伝統なの", meaningEn: "jokingly excusing something bad as a long-standing custom", day: 5, speaker: "Gloria", example: "Mine looks like a mugshot from 1987. It's tradition." },
    { expression: "good news and bad news", meaning: "いい知らせと悪い知らせ", meaningEn: "prefacing a mixed update", day: 5, speaker: "Mr Okafor", example: "Vernon. Good news and bad news. The board reviewed your plate." },
    { expression: "I'll take it", meaning: "それでいい", meaningEn: "accepting a compromise you're satisfied with", day: 5, speaker: "Vernon", example: "...I'll take it. Four months of fighting and I'll take the one." },
    { expression: "that's basically a win", meaning: "実質勝ち", meaningEn: "framing a partial result as essentially a success", day: 5, speaker: "Vernon", example: "That's a win. That's basically a win." },
    { expression: "process me right now", meaning: "今すぐ手続きして", meaningEn: "urgently demanding something be completed immediately", day: 5, speaker: "Brenda", example: "I have it ALL. Process me. Process me right now before I lose something." },
    { expression: "welcome home", meaning: "おかえりなさい", meaningEn: "warmly welcoming someone as belonging somewhere", day: 5, speaker: "Gloria", example: "Day four, but you did it. You're a resident. Welcome home." },
    { expression: "I could cry", meaning: "泣きそう", meaningEn: "saying you're overwhelmed with emotion", day: 5, speaker: "Brenda", example: "I could cry. I'm not going to, in a DMV, but I could." },
    { expression: "if it helps", meaning: "慰めになるなら", meaningEn: "offering something to make someone feel better", day: 5, speaker: "Kevin", example: "My photo's terrible too, Tony, if it helps." },
    { expression: "I'm weirdly gonna miss it", meaning: "なぜか寂しくなりそう", meaningEn: "admitting unexpected fondness for something unpleasant", day: 5, speaker: "Tony", example: "This place was miserable and I'm weirdly gonna miss it." },
    { expression: "don't get sentimental", meaning: "センチメンタルにならないで", meaningEn: "telling someone not to get emotional", day: 5, speaker: "Gloria", example: "Don't get sentimental in my line. But -- yeah. You people weren't the worst." },
];

export const DMV_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_DMV_EXPRESSIONS = DMV_EXPRESSIONS.length;

export const DMV_DAY_IDS: Record<number, string> = {
    1: 'dmv-day1',
    2: 'dmv-day2',
    3: 'dmv-day3',
    4: 'dmv-day4',
    5: 'dmv-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findDmvExpressionLineIndex(
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
