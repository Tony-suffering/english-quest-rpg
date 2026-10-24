/**
 * The Night Docket Expressions -- speakable expressions from Requiem #24.
 * 75 expressions across 5 nights (15 per night). All of them appear verbatim in the
 * conversation, spoken by the listed character, so the Memoria link jumps to the exact line.
 *
 * 法廷が舞台なので「記録に残す」「異議」「証言」まわりの型が多い。
 * ただし拾っているのは法律用語ではなく、法廷でも日常でも同じ形で使う話し言葉である。
 */

export interface NightDocketExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const NIGHT_DOCKET_EXPRESSIONS: NightDocketExpression[] = [
    // ===== NIGHT 1 -- The Brisket =====
    { expression: "take a seat", meaning: "座ってください", meaningEn: "sit down (polite, common in public rooms)", day: 1, speaker: "Bailiff Reyes", example: "Take a seat, and turn it off, not down." },
    { expression: "got away from me", meaning: "手に負えなくなった、収拾がつかなくなった", meaningEn: "got out of my control", day: 1, speaker: "Judge Halloran", example: "the daytime docket got away from me over the summer" },
    { expression: "take a day off", meaning: "1日休みを取る", meaningEn: "take one day away from work", day: 1, speaker: "Judge Halloran", example: "half of you cannot take a day off work to sue your neighbor" },
    { expression: "walk me through it", meaning: "順を追って説明してください", meaningEn: "explain it to me step by step", day: 1, speaker: "Judge Halloran", example: "One hundred and eighty-seven dollars. Walk me through it." },
    { expression: "hours of my life", meaning: "自分の人生の何時間（を無駄にした、という言い方）", meaningEn: "hours you count as spent from your own life", day: 1, speaker: "Dave Boyd", example: "the wood, and fourteen hours of my life" },
    { expression: "taking him to court", meaning: "彼を訴える、法廷に引っ張り出す", meaningEn: "suing someone; bringing them before a judge", day: 1, speaker: "Dave Boyd", example: "I am taking him to court over forty minutes" },
    { expression: "say it back to yourself", meaning: "自分でもう一度言ってごらん（言えばおかしさに気づく）", meaningEn: "repeat it to yourself and hear how it sounds", day: 1, speaker: "Tammy", example: "That is the entire sentence. Say it back to yourself nice and slow." },
    { expression: "never once", meaning: "一度たりとも～ない", meaningEn: "not even a single time", day: 1, speaker: "Cheryl", example: "that man has never once used the sidewalk" },
    { expression: "out loud", meaning: "声に出して", meaningEn: "aloud, so other people can hear it", day: 1, speaker: "Judge Halloran", example: "Read the whole thing out loud, please." },
    { expression: "the whole time", meaning: "最初からずっと", meaningEn: "for the entire period, from the start", day: 1, speaker: "Hank", example: "It has said ten the whole time." },
    { expression: "running me off", meaning: "追い立てる、追い払う", meaningEn: "chasing someone away from a place", day: 1, speaker: "Dave Boyd", example: "You have been running me off my own patio for seven years." },
    { expression: "in the wrong", meaning: "こちらに非がある、間違っている側だ", meaningEn: "at fault; the one who was mistaken", day: 1, speaker: "Hank", example: "I was in the wrong every single time" },
    { expression: "on the record", meaning: "記録に残る形で、公式な発言として", meaningEn: "officially stated and recorded", day: 1, speaker: "Wanda", example: "I would like that on the record as well." },
    { expression: "what on earth for", meaning: "一体何のために", meaningEn: "why on earth would you want that", day: 1, speaker: "Judge Halloran", example: "What on earth for." },
    { expression: "all over again", meaning: "もう一度最初から", meaningEn: "again from the beginning", day: 1, speaker: "Hank", example: "than find out about it all over again in seven years" },

    // ===== NIGHT 2 -- The Brown Stain =====
    { expression: "do you have counsel", meaning: "弁護人はついていますか", meaningEn: "do you have a lawyer representing you", day: 2, speaker: "Judge Halloran", example: "Mrs. Patterson, do you have counsel." },
    { expression: "I want it on the record", meaning: "記録に残してほしい（言質を取る言い方）", meaningEn: "I want this officially noted", day: 2, speaker: "Jenna", example: "I want it on the record that the seller's disclosure says water intrusion" },
    { expression: "turn this into a whole thing", meaning: "大ごとにする、話を大きくする", meaningEn: "make a big production out of something", day: 2, speaker: "Marcus", example: "We are not trying to turn this into a whole thing." },
    { expression: "doing the talking", meaning: "話す役をやっている、代弁している", meaningEn: "speaking on behalf of both people", day: 2, speaker: "Judge Halloran", example: "Your wife is doing the talking, Mr Vance." },
    { expression: "it has worked out so far", meaning: "今のところうまくいっている", meaningEn: "the arrangement has gone fine up to now", day: 2, speaker: "Marcus", example: "She usually is, Your Honor. It has worked out so far." },
    { expression: "for the record", meaning: "念のため申し上げますが", meaningEn: "said before a statement you want noted", day: 2, speaker: "Karen", example: "I would like to state for the record that as the listing agent I disclosed everything" },
    { expression: "heavy lifting", meaning: "重労働、面倒な部分（ここでは「その一文が無理をしている」）", meaningEn: "the hard work; a phrase carrying more than it should", day: 2, speaker: "Judge Halloran", example: "That sentence is doing a great deal of heavy lifting" },
    { expression: "the end of me", meaning: "私はこれで参ってしまう、命取りだ", meaningEn: "the thing that will finish me off (joking)", day: 2, speaker: "Judge Halloran", example: "This town is going to be the end of me." },
    { expression: "go ahead", meaning: "どうぞ（続けて）", meaningEn: "please continue; permission to speak", day: 2, speaker: "Bob", example: "Go ahead." },
    { expression: "I had a feeling", meaning: "そんな気がしていた", meaningEn: "I suspected as much", day: 2, speaker: "Bob", example: "I had a feeling it might be." },
    { expression: "do not give it another thought", meaning: "もう気にしないでいい", meaningEn: "stop worrying about it entirely", day: 2, speaker: "Mrs. Patterson", example: "that is taken care of, do not give it another thought" },
    { expression: "lose my nerve", meaning: "決心が鈍る、怖じ気づく", meaningEn: "lose the courage to do something", day: 2, speaker: "Mrs. Patterson", example: "I will write the check tonight, before I lose my nerve about it." },
    { expression: "has nothing to do with", meaning: "～とは一切関係がない", meaningEn: "is completely unrelated to", day: 2, speaker: "Mrs. Patterson", example: "May I ask you something that has nothing to do with any of this." },
    { expression: "you can tell", meaning: "見れば分かる", meaningEn: "it is obvious if you look", day: 2, speaker: "Bob", example: "I know. You can tell." },
    { expression: "took his time", meaning: "時間をかけて丁寧にやった", meaningEn: "did it slowly and carefully, without rushing", day: 2, speaker: "Bob", example: "He took his time on them, and he was not showing off either" },

    // ===== NIGHT 3 -- The Painting =====
    { expression: "keep it down", meaning: "静かにする、声を落とす", meaningEn: "be quieter", day: 3, speaker: "Bailiff Reyes", example: "I am going to ask the gallery one time to keep it down." },
    { expression: "bear with me", meaning: "少しご辛抱ください", meaningEn: "be patient with me for a moment", day: 3, speaker: "Ray", example: "I do not do this in courtrooms, so bear with me." },
    { expression: "with respect", meaning: "失礼ながら（反論の前置き）", meaningEn: "polite opener before disagreeing", day: 3, speaker: "Ray", example: "Your Honor, with respect, that is the entire job." },
    { expression: "take a look at", meaning: "ちょっと見てみる", meaningEn: "examine something briefly", day: 3, speaker: "Judge Halloran", example: "Then take a look at the one on the table." },
    { expression: "I have got a thing at four", meaning: "4時に用事があるんです", meaningEn: "vague excuse for having somewhere else to be", day: 3, speaker: "Cody", example: "How long does this take. I have got a thing at four." },
    { expression: "I am sorry", meaning: "すみません（今のもう一度、という聞き返し）", meaningEn: "excuse me? (asking someone to repeat)", day: 3, speaker: "Margot", example: "I am sorry?" },
    { expression: "nobody thinks to look", meaning: "誰も見ようと思わない（場所）", meaningEn: "the place it never occurs to anyone to check", day: 3, speaker: "Ray", example: "which is where nobody thinks to look" },
    { expression: "care to explain yourself", meaning: "説明する気はありますか（詰問）", meaningEn: "would you like to justify what you did", day: 3, speaker: "Judge Halloran", example: "Mr Dex. Would you care to explain yourself." },
    { expression: "not really", meaning: "いや、別に（やんわりした拒否）", meaningEn: "a soft no", day: 3, speaker: "Dex", example: "Not really, Your Honor." },
    { expression: "to a living soul", meaning: "誰ひとりにも（言わなかった）", meaningEn: "to any person at all", day: 3, speaker: "Pearl", example: "he never said a word about it to a living soul" },
    { expression: "take your time", meaning: "ゆっくりでいいですよ", meaningEn: "there is no hurry", day: 3, speaker: "Judge Halloran", example: "Take your time, ma'am. The recorder is not going anywhere." },
    { expression: "I would like the record to show", meaning: "記録に残していただきたい", meaningEn: "formal request that something be officially noted", day: 3, speaker: "Margot", example: "I would like the record to show that I was wrong" },
    { expression: "give me a look", meaning: "（咎めるような）目を向けてくる", meaningEn: "shoot someone a disapproving glance", day: 3, speaker: "Judge Halloran", example: "The clerk is going to give me a look about that one" },
    { expression: "off the record", meaning: "記録の外で、オフレコで", meaningEn: "not for the official record", day: 3, speaker: "Ray", example: "One more thing, off the record, since I am the man who put a number on that house." },
    { expression: "worth missing", meaning: "犠牲にする価値があった", meaningEn: "good enough to justify skipping something else", day: 3, speaker: "Cody", example: "That was worth missing the thing at four." },

    // ===== NIGHT 4 -- The Clipboard =====
    { expression: "recovery of personal property", meaning: "動産返還請求（貸した物を返せ、の正式名）", meaningEn: "the legal claim for getting your own property back", day: 4, speaker: "Bailiff Reyes", example: "Donna versus Tommy. Recovery of personal property." },
    { expression: "valued at", meaning: "評価額は～", meaningEn: "assessed as being worth", day: 4, speaker: "Judge Halloran", example: "Valued at." },
    { expression: "here we all are", meaning: "それで我々はここにいるわけだ（呆れ）", meaningEn: "and yet here we are anyway", day: 4, speaker: "Judge Halloran", example: "And here we all are at seven o'clock at night." },
    { expression: "in front of people", meaning: "人前で", meaningEn: "publicly, with others watching", day: 4, speaker: "Tommy", example: "She handed it to me. In front of people." },
    { expression: "you are on tables", meaning: "あなたはテーブル担当（on + 担当）", meaningEn: "you are assigned to that job", day: 4, speaker: "Tommy", example: "She said, Tommy, you are on tables." },
    { expression: "if I may", meaning: "よろしければ（発言の前置き）", meaningEn: "polite request for permission to speak", day: 4, speaker: "Devon", example: "If I may, Your Honor." },
    { expression: "are you a party to this case", meaning: "あなたはこの件の当事者ですか", meaningEn: "are you one of the people actually involved", day: 4, speaker: "Judge Halloran", example: "Sir. Are you a party to this case." },
    { expression: "out of a novel", meaning: "小説に出てくる話（現実の例ではない）", meaningEn: "from a novel, not from real life", day: 4, speaker: "Devon", example: "The conch was out of a novel anyway." },
    { expression: "unsee it", meaning: "見なかったことにできない（の unsee）", meaningEn: "un-see; erase something from your memory", day: 4, speaker: "Reggie", example: "I have not been able to unsee it since." },
    { expression: "nobody ever wants the rest of it", meaning: "続きを聞きたがる人間はいない", meaningEn: "no one ever asks for the rest of what I have to say", day: 4, speaker: "Reggie", example: "I have got more. Nobody ever wants the rest of it." },
    { expression: "we are live", meaning: "生配信中です", meaningEn: "we are broadcasting right now", day: 4, speaker: "Bri", example: "Okay so we are live at the courthouse right now" },
    { expression: "phone down", meaning: "スマホを下ろせ", meaningEn: "put the phone away", day: 4, speaker: "Bailiff Reyes", example: "Ma'am. Phone down, or phone out." },
    { expression: "slide down", meaning: "（座ったまま）詰めて", meaningEn: "move along the bench to make room", day: 4, speaker: "Bailiff Reyes", example: "Second row, you are sitting in the aisle. Slide down." },
    { expression: "let the record show", meaning: "記録に残す（判事の決まり文句）", meaningEn: "the judge's formal phrase for entering a fact", day: 4, speaker: "Judge Halloran", example: "Let the record show the gallery just sorted itself out in nine seconds" },
    { expression: "hold on to it", meaning: "こちらで預かる、手放さない", meaningEn: "keep it rather than give it back", day: 4, speaker: "Judge Halloran", example: "The court is going to hold on to it." },

    // ===== NIGHT 5 -- The Monster =====
    { expression: "read it out", meaning: "読み上げてください", meaningEn: "read it aloud to the room", day: 5, speaker: "Judge Halloran", example: "Read it out anyway." },
    { expression: "I am quoting", meaning: "原文のまま引用します", meaningEn: "I am repeating the exact words", day: 5, speaker: "Bailiff Reyes", example: "Amount, and I am quoting the document here, all of it." },
    { expression: "I have prepared a brief", meaning: "準備書面を用意してきました", meaningEn: "I have written a formal legal document", day: 5, speaker: "Greg", example: "Your Honor, if I may. I have prepared a brief." },
    { expression: "he wants a ruling", meaning: "この人は判断が欲しいんです", meaningEn: "he is asking for a decision", day: 5, speaker: "Sarah", example: "He wants a ruling." },
    { expression: "you always do", meaning: "あなたはいつもそう", meaningEn: "that is what you always do", day: 5, speaker: "Sarah", example: "I know you did, honey. You always do." },
    { expression: "while we were waiting", meaning: "待っている間に", meaningEn: "during the wait", day: 5, speaker: "Emma", example: "I read the pamphlet in the lobby twice while we were waiting." },
    { expression: "better prepared than", meaning: "～より準備できている", meaningEn: "more ready than someone else", day: 5, speaker: "Judge Halloran", example: "you are better prepared than about half the grown adults who have stood there this week" },
    { expression: "say that part again", meaning: "今のところ、もう一度言って", meaningEn: "repeat that specific bit", day: 5, speaker: "Emma", example: "Say that part again." },
    { expression: "with the recorder running", meaning: "記録を回したまま（＝公式に残る状態で）", meaningEn: "while it is being officially recorded", day: 5, speaker: "Emma", example: "Say it out loud, in here, with the recorder running." },
    { expression: "here is the trouble", meaning: "困ったことがあってね", meaningEn: "here is the problem with that", day: 5, speaker: "Judge Halloran", example: "Here is the trouble. This court cannot enter a judgment against something that does not exist." },
    { expression: "in my day", meaning: "わしらの時代は", meaningEn: "back when I was young", day: 5, speaker: "Frank", example: "In my day you told them to go to sleep and that was the end of it." },
    { expression: "as a matter of fact", meaning: "事実として（法廷では「事実認定として」）", meaningEn: "as an established fact; in a court, as a finding of fact", day: 5, speaker: "Judge Halloran", example: "The court finds, as a matter of fact, in open session, on the record" },
    { expression: "both hands", meaning: "両手で（受け取りなさい）", meaningEn: "with both hands, the way you take something important", day: 5, speaker: "Bailiff Reyes", example: "Both hands, son. That is how you take hold of a thing like this." },
    { expression: "enough of a reason", meaning: "理由としてはそれで足りる", meaningEn: "that by itself is a sufficient reason", day: 5, speaker: "Vernon", example: "It is a public building and it has got chairs in it. That is enough of a reason." },
    { expression: "lose a dime", meaning: "1セントも損しない（の lose a dime）", meaningEn: "lose any money at all", day: 5, speaker: "Flo", example: "and I did not lose a dime over it" },
];

export const NIGHT_DOCKET_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_NIGHT_DOCKET_EXPRESSIONS = NIGHT_DOCKET_EXPRESSIONS.length;

export const NIGHT_DOCKET_DAY_IDS: Record<number, string> = {
    1: 'docket-day1',
    2: 'docket-day2',
    3: 'docket-day3',
    4: 'docket-day4',
    5: 'docket-day5',
};

export function findNightDocketExpressionLineIndex(
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
