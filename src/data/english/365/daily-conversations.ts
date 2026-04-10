/**
 * 365 English Master -- Daily Conversations
 *
 * Short dialogue scenes (4-6 lines) for each day, using that day's phrases naturally.
 * These give learners a feel for how the phrases sound in real conversation.
 *
 * Characters: Gondo/Master(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

export interface ConversationLine {
    speaker: string;
    english: string;
    japanese: string;
    /** IDs of phrases from that day used in this line (for highlighting) */
    phraseIds?: string[];
}

export interface DailyConversation {
    daySlot: number;
    title: string;
    titleJa: string;
    /** Brief scene setup */
    setup: string;
    lines: ConversationLine[];
}

export const DAILY_CONVERSATIONS: DailyConversation[] = [

    // ── DAY 8: 自己紹介をもっと ──
    {
        daySlot: 8,
        title: 'Second Night at the Izakaya',
        titleJa: '居酒屋2回目の夜',
        setup: 'みんなが2回目の居酒屋で、もっと自分のことを話し始める。',
        lines: [
            { speaker: 'Takeshi', english: "So, I'm originally from Osaka. Moved here about five years ago.", japanese: '元々は大阪なんだ。5年くらい前にこっち来て。' },
            { speaker: 'Lisa', english: "Oh nice! I'm based in Yokohama. It's about thirty minutes from here by train.", japanese: '横浜を拠点にしてるんだ。ここから電車で30分くらいかな。' },
            { speaker: 'Kenji', english: "I'm in IT. Mostly backend stuff, nothing glamorous.", japanese: 'ITやってるんだ。バックエンドメインで、地味な仕事だけどね。' },
            { speaker: 'Mina', english: "I'm totally a cat person. I have two at home.", japanese: '完全に猫派。家に2匹いるんだ。' },
            { speaker: 'Takeshi', english: "Two cats? OK, I'm gonna need to see pictures immediately.", japanese: '2匹！？ちょっと、写真見せて。今すぐ。' },
            { speaker: 'Yuki', english: "I've been studying English. Still a work in progress though.", japanese: 'ずっと英語勉強してて。まだまだだけどね。' },
            { speaker: 'Lisa', english: "Hey, you're doing great right now! Seriously, just keep talking.", japanese: 'いや、今めっちゃ上手いじゃん！マジで、喋り続けるのが一番だよ。' },
        ],
    },

    // ── DAY 9: カフェで注文 ──
    {
        daySlot: 9,
        title: 'Ordering at a Cafe',
        titleJa: 'カフェで注文',
        setup: 'リサが常連たちをおしゃれカフェに連れて行く。タケシがサイズ名にパニック。',
        lines: [
            { speaker: 'Mina', english: "I'm not sure what to get. What would you recommend?", japanese: '何にしようか迷ってて。おすすめある？' },
            { speaker: 'Staff', english: "The oat milk latte is our best seller. You can't go wrong with that one.", japanese: 'オーツミルクラテが一番人気。ハズれないよ。' },
            { speaker: 'Takeshi', english: "A medium, please. Or... wait, what do you call it here -- grande?", japanese: 'Mサイズで。えっと...ここではグランデとか言うの？' },
            { speaker: 'Staff', english: "Ha, it's just called medium here. No fancy names, I promise.", japanese: 'あはは、ここは普通にミディアムだよ。変な名前はないから安心して。' },
            { speaker: 'Kenji', english: "No sugar for me, thanks. Just black.", japanese: '砂糖いらないです、ブラックで。' },
            { speaker: 'Lisa', english: "I'll take this to go. I'm in a bit of a rush.", japanese: '持ち帰りで。ちょっと急いでて。' },
        ],
    },

    // ── DAY 10: ドラッグストアで ──
    {
        daySlot: 10,
        title: 'At the Drugstore',
        titleJa: 'ドラッグストアで',
        setup: 'ケンジが海外出張前にドラッグストアで買い物。何をどう聞けばいいかわからない。',
        lines: [
            { speaker: 'Kenji', english: "Hi, I'm looking for something for headaches. What would you recommend?", japanese: 'すみません、頭痛に効くもの探してて。おすすめありますか？' },
            { speaker: 'Staff', english: "Sure, aisle three. Ibuprofen or acetaminophen -- either one should help.", japanese: '3番通路にありますよ。イブプロフェンかアセトアミノフェン、どっちでも効きます。' },
            { speaker: 'Kenji', english: "How many times a day should I take this? And is it one pill or two?", japanese: '1日何回飲めばいい？1回何錠？' },
            { speaker: 'Staff', english: "Two pills every six hours. Don't take more than eight in a day, OK?", japanese: '6時間おきに2錠。1日8錠以上は飲まないでね。' },
            { speaker: 'Lisa', english: "Are there any side effects I should know about? Like drowsiness?", japanese: '何か副作用あったりする？眠くなるとか。' },
            { speaker: 'Staff', english: "This one's non-drowsy, so you should be totally fine.", japanese: 'これは眠くならないタイプだから、全然大丈夫よ。' },
        ],
    },

    // ── DAY 11: ホテルで ──
    {
        daySlot: 11,
        title: 'Checking Into a Hotel',
        titleJa: 'ホテルで',
        setup: 'ユキが初めての海外ホテル。チェックインからトラブルまで。',
        lines: [
            { speaker: 'Yuki', english: "Hi, I have a reservation under Tanaka. Checking in.", japanese: '田中で予約してます。チェックインお願いします。' },
            { speaker: 'Staff', english: "Welcome, Ms. Tanaka! Room 412, fourth floor.", japanese: 'ようこそ、田中様！412号室、4階です。' },
            { speaker: 'Yuki', english: "What time do I need to check out by? Is there a late checkout option?", japanese: 'チェックアウト何時までですか？レイトチェックアウトってできます？' },
            { speaker: 'Staff', english: "Checkout's at eleven, but I can extend it to one o'clock. No extra charge.", japanese: '11時ですけど、1時まで延長できますよ。追加料金なしで。' },
            { speaker: 'Yuki', english: "The AC in my room doesn't seem to be working. It's really hot.", japanese: '部屋のエアコンが動いてないっぽいんです。めちゃくちゃ暑くて。' },
            { speaker: 'Staff', english: "I'm sorry about that. I'll send maintenance up right now.", japanese: '申し訳ございません。今すぐメンテナンスを向かわせます。' },
        ],
    },

    // ── DAY 12: レストランで ──
    {
        daySlot: 12,
        title: 'Dinner at a Restaurant',
        titleJa: 'レストランで',
        setup: 'みんなでレストランへ。注文からお会計まで。',
        lines: [
            { speaker: 'Takeshi', english: "Excuse me, could we get a table for four?", japanese: 'すみません、4人なんですけど。' },
            { speaker: 'Staff', english: "Sure! Follow me. Here are your menus.", japanese: 'はい！こちらへどうぞ。メニューです。' },
            { speaker: 'Mina', english: "What's today's special? Anything you'd recommend?", japanese: '今日のおすすめは？何かある？' },
            { speaker: 'Staff', english: "The grilled salmon is really popular tonight.", japanese: '今夜はグリルサーモンが人気ですよ。' },
            { speaker: 'Kenji', english: "Could we get the check, please? We'll split it.", japanese: 'お会計お願いします。割り勘で。' },
            { speaker: 'Lisa', english: "Actually, this one's on me. You guys can get the next one.", japanese: 'ここは私が出すよ。次は頼むね。' },
        ],
    },

    // ── DAY 13: 道を聞く ──
    {
        daySlot: 13,
        title: 'Asking for Directions',
        titleJa: '道を聞く',
        setup: 'タケシが知らない街で迷子。通行人に道を聞く。',
        lines: [
            { speaker: 'Takeshi', english: "Excuse me, do you know how to get to the station from here?", japanese: 'すみません、ここから駅ってどう行けばいいですか？' },
            { speaker: 'Stranger', english: "Sure! Go straight for two blocks, then turn left at the light.", japanese: 'いいよ！まっすぐ2ブロック行って、信号を左に曲がって。' },
            { speaker: 'Takeshi', english: "Two blocks and then left. Got it. Is it far?", japanese: '2ブロックで左ね。遠い？' },
            { speaker: 'Stranger', english: "About a five-minute walk. You can't miss it.", japanese: '歩いて5分くらい。すぐわかるよ。' },
            { speaker: 'Takeshi', english: "Thanks a lot! I always get lost in this area.", japanese: 'ありがとう！このへんいつも迷うんだよね。' },
            { speaker: 'Stranger', english: "Ha, no worries. Happens to the best of us!", japanese: 'あはは、大丈夫。誰でもあるよ！' },
        ],
    },

    // ── DAY 14: 週末の予定 ──
    {
        daySlot: 14,
        title: 'Weekend Plans',
        titleJa: '週末の予定',
        setup: '金曜の夜の居酒屋。みんなが週末の予定を話す。',
        lines: [
            { speaker: 'Lisa', english: "So, any plans for the weekend?", japanese: 'ねえ、週末なんか予定ある？' },
            { speaker: 'Yuki', english: "I'm thinking of going to that new exhibition in Shibuya.", japanese: '渋谷の新しい展覧会に行こうかなって。' },
            { speaker: 'Mina', english: "Oh, I heard about that! Mind if I tag along?", japanese: 'あ、それ聞いた！一緒に行っていい？' },
            { speaker: 'Yuki', english: "Of course! The more the merrier.", japanese: 'もちろん！大勢のほうが楽しいし。' },
            { speaker: 'Kenji', english: "I'll probably just stay home and catch up on sleep.", japanese: '俺はたぶん家で寝だめするわ。' },
            { speaker: 'Takeshi', english: "That sounds like the best plan, honestly.", japanese: 'それ正直一番いいプランだと思う。' },
        ],
    },
];

/**
 * Get conversation for a specific day
 */
export function getConversation(daySlot: number): DailyConversation | undefined {
    return DAILY_CONVERSATIONS.find(c => c.daySlot === daySlot);
}

/**
 * Get all available day slots that have conversations
 */
export function getAvailableConversationDays(): number[] {
    return DAILY_CONVERSATIONS.map(c => c.daySlot);
}
