/**
 * 365 English Master -- Daily Conversations
 *
 * Short dialogue scenes for each day, using that day's phrases naturally.
 * Learners hear how phrases sound in real conversation.
 *
 * Characters: Gondo/Master(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

export interface ConversationLine {
    speaker: string;
    english: string;
    japanese: string;
}

export interface DailyConversation {
    daySlot: number;
    title: string;
    titleJa: string;
    setup: string;
    lines: ConversationLine[];
}

export const DAILY_CONVERSATIONS: DailyConversation[] = [

    // ═══ WEEK 1: はじめの一歩 ═══

    {
        daySlot: 1,
        title: 'First Night at the Izakaya',
        titleJa: '居酒屋、初めての夜',
        setup: 'ユキが初めて権藤マスターの居酒屋を訪れる。常連たちとの出会い。',
        lines: [
            { speaker: 'Master', english: "Welcome! Come on in. First time here?", japanese: 'いらっしゃい！初めて？' },
            { speaker: 'Yuki', english: "Nice to meet you. I've heard a lot about this place.", japanese: 'はじめまして。ここ、すごいって聞いて。' },
            { speaker: 'Takeshi', english: "Hey! I'm Takeshi. Pull up a seat.", japanese: 'おう！タケシ。座りなよ。' },
            { speaker: 'Lisa', english: "I'm Lisa. I love the vibe in here.", japanese: 'リサだよ。ここの雰囲気最高でしょ。' },
            { speaker: 'Yuki', english: "What should I get? What's your go-to?", japanese: '何頼めばいい？おすすめは？' },
            { speaker: 'Master', english: "I'll pick something for you. Just relax and enjoy.", japanese: '俺が選んでやるよ。ゆっくりしな。' },
        ],
    },
    {
        daySlot: 2,
        title: 'Ordering at the Izakaya',
        titleJa: '居酒屋で注文',
        setup: '居酒屋で英語メニューに挑戦。タケシが暴走する注文シーン。',
        lines: [
            { speaker: 'Takeshi', english: "Hey, excuse me -- when you get a chance?", japanese: 'すみませーん、お願いしまーす。' },
            { speaker: 'Staff', english: "Sure! What can I get you?", japanese: 'はい！何にしますか？' },
            { speaker: 'Takeshi', english: "Can I get this one? Yeah, this right here.", japanese: 'これちょうだい。うん、これこれ。' },
            { speaker: 'Mina', english: "Do you have a menu? I didn't see one on the table.", japanese: 'メニューってあります？テーブルになかったんだけど。' },
            { speaker: 'Kenji', english: "We're ready for the check whenever you are.", japanese: 'お会計お願いしていいですか。' },
            { speaker: 'Lisa', english: "Wait, already? We just got here!", japanese: 'え、もう？まだ来たばっかりじゃん！' },
        ],
    },
    {
        daySlot: 3,
        title: 'At the Convenience Store',
        titleJa: 'コンビニで買い物',
        setup: 'ユキがコンビニで外国人観光客に話しかけられる。',
        lines: [
            { speaker: 'Stranger', english: "Excuse me, how much is this one?", japanese: 'すみません、これいくらですか？' },
            { speaker: 'Yuki', english: "Um... I think it's about 500 yen.", japanese: 'えっと…500円くらいだと思います。' },
            { speaker: 'Stranger', english: "Do you have anything similar but cheaper?", japanese: '似たようなやつでもっと安いのあります？' },
            { speaker: 'Yuki', english: "I'm just browsing too, but let me check.", japanese: '私も見てるだけなんですけど、見てみますね。' },
            { speaker: 'Stranger', english: "Can I try this on somewhere?", japanese: 'これ試着できるところあります？' },
            { speaker: 'Yuki', english: "This is a convenience store... there's no fitting room.", japanese: 'ここコンビニだから…試着室はないです。' },
        ],
    },
    {
        daySlot: 4,
        title: 'Lost at the Station',
        titleJa: '駅で迷子',
        setup: 'タケシが駅で道を聞かれてパニック。リサが助ける。',
        lines: [
            { speaker: 'Stranger', english: "Excuse me, how do I get to Shibuya from here?", japanese: 'すみません、ここから渋谷ってどう行けばいいですか？' },
            { speaker: 'Takeshi', english: "Shibuya... uh... that way? Maybe?", japanese: '渋谷…えっと…あっち？たぶん？' },
            { speaker: 'Lisa', english: "Sorry, is this the right platform for Shibuya?", japanese: 'すみません、渋谷行きのホームってここで合ってます？' },
            { speaker: 'Staff', english: "Platform three. Take the express, not the local.", japanese: '3番ホームです。各停じゃなくて急行に乗って。' },
            { speaker: 'Takeshi', english: "Which station do I transfer at again?", japanese: 'どこで乗り換えだっけ？' },
            { speaker: 'Lisa', english: "Just follow me. You always get lost here.", japanese: 'ついてきて。あんたいつもここで迷うじゃん。' },
        ],
    },
    {
        daySlot: 5,
        title: 'Real Talk at the Izakaya',
        titleJa: '居酒屋で本音トーク',
        setup: '居酒屋で全員が英語学習の本音を語る夜。',
        lines: [
            { speaker: 'Yuki', english: "This is way more fun than I expected. I could do this all night.", japanese: '思ったより楽しい。一晩中やれるわ。' },
            { speaker: 'Kenji', english: "I'm exhausted. Today completely drained me.", japanese: '疲れた。今日で完全に消耗した。' },
            { speaker: 'Mina', english: "You have no idea how happy that makes me. Seriously, thank you.", japanese: 'どんだけ嬉しいかわかんないでしょ。マジでありがとう。' },
            { speaker: 'Takeshi', english: "Wait, seriously? I didn't see that coming at all.", japanese: 'え、マジ？全然予想してなかったわ。' },
            { speaker: 'Master', english: "That's the spirit. English is about feelings, not grammar.", japanese: 'その調子だよ。英語は文法じゃなくて気持ちだ。' },
            { speaker: 'Lisa', english: "See? You guys are already getting better.", japanese: 'ほらね？みんなもう上手くなってるよ。' },
        ],
    },
    {
        daySlot: 6,
        title: 'The Art of Asking',
        titleJa: '頼み方・断り方',
        setup: 'リサが丁寧な頼み方と断り方を実演する。',
        lines: [
            { speaker: 'Lisa', english: "Hey, can I ask you something? It's kind of a big ask.", japanese: 'ねえ、ちょっと頼みたいことがあるんだけど。結構大きいお願い。' },
            { speaker: 'Takeshi', english: "Sure, what's up?", japanese: 'いいよ、何？' },
            { speaker: 'Lisa', english: "Could you take a quick photo of us? Just press this button.", japanese: '写真撮ってもらっていい？このボタン押すだけ。' },
            { speaker: 'Takeshi', english: "Of course! Say cheese.", japanese: 'もちろん！はいチーズ。' },
            { speaker: 'Kenji', english: "Lisa, wanna grab dinner tomorrow?", japanese: 'リサ、明日ご飯行かない？' },
            { speaker: 'Lisa', english: "I'd love to, but I've got something going on tonight. Rain check?", japanese: '行きたいんだけど、今夜予定あって。また今度でいい？' },
        ],
    },
    {
        daySlot: 7,
        title: 'Weekend Small Talk',
        titleJa: '週末の雑談',
        setup: '週末の居酒屋。全員で英語雑談に初挑戦。',
        lines: [
            { speaker: 'Master', english: "Hey! Long time no see. How have you been?", japanese: 'おう！久しぶり。元気してた？' },
            { speaker: 'Yuki', english: "Good! Did you do anything fun this weekend?", japanese: '元気！週末なんかした？' },
            { speaker: 'Takeshi', english: "I stayed home the whole time. Netflix and sleep.", japanese: 'ずっと家にいた。Netflixと睡眠。' },
            { speaker: 'Mina', english: "What a beautiful day it was. We should've been outside.", japanese: 'めっちゃいい天気だったのに。外出ればよかった。' },
            { speaker: 'Lisa', english: "So what do you do for fun? Like, outside of work.", japanese: '趣味なに？仕事以外で。' },
            { speaker: 'Kenji', english: "Honestly? I just come here. This is my hobby.", japanese: '正直？ここに来ること。これが俺の趣味。' },
        ],
    },

    // ═══ WEEK 2: 慣れてきた ═══

    {
        daySlot: 8,
        title: 'Second Night at the Izakaya',
        titleJa: '居酒屋2回目の夜',
        setup: 'みんなが2回目の居酒屋で、もっと自分のことを話し始める。',
        lines: [
            { speaker: 'Takeshi', english: "So, I'm originally from Osaka. Moved here about five years ago.", japanese: '元々は大阪なんだ。5年くらい前にこっち来て。' },
            { speaker: 'Lisa', english: "Oh nice! I'm based in Yokohama. About thirty minutes from here.", japanese: '横浜を拠点にしてるんだ。ここから30分くらいかな。' },
            { speaker: 'Kenji', english: "I'm in IT. Mostly backend stuff, nothing glamorous.", japanese: 'ITやってるんだ。バックエンドメインで、地味な仕事だけどね。' },
            { speaker: 'Mina', english: "I'm totally a cat person. I have two at home.", japanese: '完全に猫派。家に2匹いるんだ。' },
            { speaker: 'Takeshi', english: "Two cats? I'm gonna need to see pictures immediately.", japanese: '2匹！？ちょっと、写真見せて。今すぐ。' },
            { speaker: 'Yuki', english: "I've been studying English. Still a work in progress though.", japanese: 'ずっと英語勉強してて。まだまだだけどね。' },
            { speaker: 'Lisa', english: "You're doing great right now! Just keep talking.", japanese: '今めっちゃ上手いじゃん！喋り続けるのが一番だよ。' },
        ],
    },
    {
        daySlot: 9,
        title: 'Ordering at a Cafe',
        titleJa: 'カフェで注文',
        setup: 'リサが常連たちをおしゃれカフェに連れて行く。',
        lines: [
            { speaker: 'Mina', english: "I'm not sure what to get. What would you recommend?", japanese: '何にしようか迷ってて。おすすめある？' },
            { speaker: 'Staff', english: "The oat milk latte is our best seller. Can't go wrong.", japanese: 'オーツミルクラテが一番人気。ハズれないよ。' },
            { speaker: 'Takeshi', english: "A medium, please. Or... wait, what do you call it here?", japanese: 'Mサイズで。えっと…ここでは何て言うの？' },
            { speaker: 'Staff', english: "Ha, it's just medium here. No fancy names.", japanese: 'あはは、ここは普通にミディアムだよ。' },
            { speaker: 'Kenji', english: "No sugar for me, thanks. Just black.", japanese: '砂糖いらないです、ブラックで。' },
            { speaker: 'Lisa', english: "I'll take this to go. I'm in a bit of a rush.", japanese: '持ち帰りで。ちょっと急いでて。' },
        ],
    },
    {
        daySlot: 10,
        title: 'At the Drugstore',
        titleJa: 'ドラッグストアで',
        setup: 'ケンジが海外出張前にドラッグストアで買い物。',
        lines: [
            { speaker: 'Kenji', english: "I'm looking for something for headaches. What would you recommend?", japanese: '頭痛に効くもの探してて。おすすめありますか？' },
            { speaker: 'Staff', english: "Aisle three. Ibuprofen or acetaminophen -- either works.", japanese: '3番通路にあります。イブプロフェンかアセトアミノフェン、どっちでも。' },
            { speaker: 'Kenji', english: "How many times a day should I take this?", japanese: '1日何回飲めばいい？' },
            { speaker: 'Staff', english: "Two pills every six hours. Max eight per day.", japanese: '6時間おきに2錠。1日8錠まで。' },
            { speaker: 'Lisa', english: "Any side effects? Like drowsiness?", japanese: '副作用ある？眠くなるとか。' },
            { speaker: 'Staff', english: "This one's non-drowsy. You'll be fine.", japanese: '眠くならないタイプだから大丈夫。' },
        ],
    },
    {
        daySlot: 11,
        title: 'Checking Into a Hotel',
        titleJa: 'ホテルで',
        setup: 'ユキが初めての海外ホテル。チェックインからトラブルまで。',
        lines: [
            { speaker: 'Yuki', english: "Hi, I have a reservation under Tanaka. Checking in.", japanese: '田中で予約してます。チェックインお願いします。' },
            { speaker: 'Staff', english: "Welcome, Ms. Tanaka! Room 412, fourth floor.", japanese: 'ようこそ！412号室、4階です。' },
            { speaker: 'Yuki', english: "What time do I need to check out by?", japanese: 'チェックアウト何時までですか？' },
            { speaker: 'Staff', english: "Eleven, but I can extend to one. No extra charge.", japanese: '11時ですけど、1時まで延長できますよ。無料で。' },
            { speaker: 'Yuki', english: "The AC doesn't seem to be working. It's really hot.", japanese: 'エアコン動いてないっぽいです。暑い。' },
            { speaker: 'Staff', english: "Sorry about that. I'll send maintenance right away.", japanese: '申し訳ございません。すぐ手配します。' },
        ],
    },
    {
        daySlot: 12,
        title: 'Feeling Under the Weather',
        titleJa: '体調の話',
        setup: '居酒屋で「今日しんどかった」から始まる体調トーク。',
        lines: [
            { speaker: 'Kenji', english: "I've been feeling off all day. Might be coming down with something.", japanese: '一日中調子悪くて。何かうつったかも。' },
            { speaker: 'Lisa', english: "You don't look so good. Maybe you should take it easy tonight.", japanese: '顔色悪いよ。今夜はゆっくりしたほうがいいんじゃない？' },
            { speaker: 'Takeshi', english: "I had a terrible headache this morning. Had to take some medicine.", japanese: '今朝ひどい頭痛で。薬飲まなきゃだった。' },
            { speaker: 'Mina', english: "Have you been sleeping enough? Sleep makes a huge difference.", japanese: 'ちゃんと寝てる？睡眠って全然違うよ。' },
            { speaker: 'Master', english: "Hot tea and rest. That's the best medicine there is.", japanese: '熱いお茶と休養。それが一番の薬だ。' },
            { speaker: 'Yuki', english: "Get well soon, Kenji! We need you here.", japanese: 'お大事に、ケンジ！いてくれないと困るよ。' },
        ],
    },
    {
        daySlot: 13,
        title: 'Giving Directions',
        titleJa: '道を教える',
        setup: 'タケシが外国人に道を聞かれて、今度はちゃんと答えようとする。',
        lines: [
            { speaker: 'Stranger', english: "Excuse me, do you know how to get to the station?", japanese: 'すみません、駅ってどう行けばいいですか？' },
            { speaker: 'Takeshi', english: "Sure! Go straight two blocks, then turn left at the light.", japanese: 'まっすぐ2ブロック行って、信号を左。' },
            { speaker: 'Stranger', english: "Two blocks and left. Got it. Is it far?", japanese: '2ブロックで左ね。遠い？' },
            { speaker: 'Takeshi', english: "About a five-minute walk. You can't miss it.", japanese: '歩いて5分くらい。すぐわかるよ。' },
            { speaker: 'Stranger', english: "Thanks a lot!", japanese: 'ありがとう！' },
            { speaker: 'Lisa', english: "Look at you! That was perfect English.", japanese: 'やるじゃん！完璧な英語だったよ。' },
        ],
    },
    {
        daySlot: 14,
        title: 'Food Talk Friday',
        titleJa: '食べ物バトル',
        setup: '週末の居酒屋。「何が好き？何が嫌い？」食の好みバトル。',
        lines: [
            { speaker: 'Lisa', english: "OK everyone -- what's your favorite food?", japanese: 'OK、みんなの一番好きな食べ物は？' },
            { speaker: 'Takeshi', english: "Ramen, obviously. I could eat it every single day.", japanese: 'ラーメン一択。毎日食える。' },
            { speaker: 'Mina', english: "I'm more of a sushi person. The simpler, the better.", japanese: '私は寿司派。シンプルなほうが好き。' },
            { speaker: 'Kenji', english: "Anything grilled. Yakiniku is my weakness.", japanese: '焼き物なら何でも。焼肉には弱い。' },
            { speaker: 'Yuki', english: "I love sweets. Especially matcha anything.", japanese: '甘いもの好き。特に抹茶系。' },
            { speaker: 'Master', english: "The best food is whatever's in front of you right now.", japanese: '一番うまいのは今目の前にあるもんだよ。' },
        ],
    },

    // ═══ WEEK 3: 困った！ ═══

    {
        daySlot: 15,
        title: 'Sorry I\'m Late!',
        titleJa: '遅刻の謝罪',
        setup: 'タケシが大遅刻。謝り方と許し方の英語特訓。',
        lines: [
            { speaker: 'Takeshi', english: "Sorry I'm late! The train was delayed and then I got on the wrong one.", japanese: '遅れてごめん！電車遅れて、しかも乗り間違えた。' },
            { speaker: 'Kenji', english: "Dude, we've been waiting for thirty minutes.", japanese: 'おい、30分も待ったぞ。' },
            { speaker: 'Takeshi', english: "I'm genuinely sorry. It won't happen again.", japanese: '心から申し訳ない。もうしない。' },
            { speaker: 'Lisa', english: "Water under the bridge. Just sit down.", japanese: '水に流すから。座って。' },
            { speaker: 'Mina', english: "At least you made it! I thought you forgot.", japanese: '来ただけマシ！忘れたのかと思った。' },
            { speaker: 'Master', english: "The important thing is you're here now. Drink up.", japanese: '大事なのは今いるってこと。飲みな。' },
        ],
    },
    {
        daySlot: 16,
        title: 'Wrong Order',
        titleJa: 'レストランでクレーム',
        setup: 'ケンジが海外のレストランで注文と違うものが来る。',
        lines: [
            { speaker: 'Kenji', english: "Excuse me, this isn't what I ordered.", japanese: 'すみません、これ注文したものと違います。' },
            { speaker: 'Staff', english: "Oh, I'm sorry about that! What did you order?", japanese: 'あ、すみません！何を注文されましたか？' },
            { speaker: 'Kenji', english: "I ordered the steak, not the fish.", japanese: 'ステーキを頼んだんです、魚じゃなくて。' },
            { speaker: 'Staff', english: "I'll get that fixed right away. So sorry!", japanese: 'すぐ直します。本当にすみません！' },
            { speaker: 'Lisa', english: "Nice job handling that. You were polite but firm.", japanese: 'いい対応だったよ。丁寧だけどちゃんと言えてた。' },
            { speaker: 'Kenji', english: "My heart was pounding the whole time though.", japanese: '心臓バクバクだったけどね。' },
        ],
    },
    {
        daySlot: 17,
        title: 'Returning a Purchase',
        titleJa: '返品・交換',
        setup: 'ユキがネットで買った服のサイズが合わなくて返品しに行く。',
        lines: [
            { speaker: 'Yuki', english: "I'd like to return this. It doesn't fit.", japanese: 'これ返品したいんですが。合わなくて。' },
            { speaker: 'Staff', english: "Do you have the receipt?", japanese: 'レシートはありますか？' },
            { speaker: 'Yuki', english: "Yes, here it is. Could I exchange it for a different size?", japanese: 'はい。別のサイズに交換できますか？' },
            { speaker: 'Staff', english: "Sure! What size do you need?", japanese: 'もちろん！何サイズがいいですか？' },
            { speaker: 'Yuki', english: "A medium, I think. Can I try it on first?", japanese: 'Mだと思います。先に試着していいですか？' },
            { speaker: 'Staff', english: "Of course! Fitting rooms are over there.", japanese: 'もちろん！試着室はあちらです。' },
        ],
    },
    {
        daySlot: 18,
        title: 'Emergency Lessons',
        titleJa: '緊急事態',
        setup: '権藤マスターが海外での緊急時対応を教える。実体験ベース。',
        lines: [
            { speaker: 'Master', english: "Listen up. In an emergency, you need to know these phrases.", japanese: '聞けよ。緊急のとき、このフレーズは知っとけ。' },
            { speaker: 'Takeshi', english: "Like what? 'Help' and that's it?", japanese: 'たとえば？「ヘルプ」だけ？' },
            { speaker: 'Master', english: "'Someone call 911' -- that's the first thing you say.", japanese: '「誰か911に電話して」。まずこれ。' },
            { speaker: 'Mina', english: "What if you lose your passport?", japanese: 'パスポートなくしたら？' },
            { speaker: 'Lisa', english: "Go straight to the embassy. Say 'I lost my passport.'", japanese: '大使館に直行。「パスポートなくしました」って言う。' },
            { speaker: 'Master', english: "The key is staying calm. Panic kills your English.", japanese: '大事なのは落ち着くこと。パニックると英語が出なくなる。' },
        ],
    },
    {
        daySlot: 19,
        title: 'Cheering Up Yuki',
        titleJa: '励ましの夜',
        setup: 'ユキが英語テストで撃沈。みんなで励ます居酒屋の夜。',
        lines: [
            { speaker: 'Yuki', english: "I completely bombed that test. I'm so frustrated.", japanese: 'テスト完全にダメだった。めっちゃ悔しい。' },
            { speaker: 'Takeshi', english: "Don't beat yourself up over this. One test doesn't define you.", japanese: 'そんな自分を責めるなよ。テスト1個で決まらない。' },
            { speaker: 'Mina', english: "There's always next time. You've been studying so hard.", japanese: '次があるよ。あんなに頑張ってたじゃん。' },
            { speaker: 'Lisa', english: "I'm proud of you for even trying. That takes guts.", japanese: '挑戦しただけで偉いよ。勇気いることだから。' },
            { speaker: 'Kenji', english: "Failure is the best teacher. Trust me on that.", japanese: '失敗が一番の先生だよ。マジで。' },
            { speaker: 'Master', english: "You'll look back on this and laugh. Now drink.", japanese: 'いつか笑い話になるよ。ほら、飲みな。' },
        ],
    },
    {
        daySlot: 20,
        title: 'Helping a Lost Tourist',
        titleJa: '観光客を助ける',
        setup: '居酒屋に外国人観光客が迷い込んでくる。みんなで助ける。',
        lines: [
            { speaker: 'Stranger', english: "Sorry, I think I'm lost. I was looking for the train station.", japanese: 'すみません、迷っちゃって。駅を探してるんですが。' },
            { speaker: 'Yuki', english: "You look a little lost. Can I help?", japanese: '迷ってそうですね。何か手伝えることあります？' },
            { speaker: 'Takeshi', english: "Want me to walk you there? It's not far.", japanese: '一緒に行こうか？近いよ。' },
            { speaker: 'Lisa', english: "I can translate for you if you need anything else.", japanese: '他に何かあったら通訳するよ。' },
            { speaker: 'Stranger', english: "Wow, everyone here is so kind! Thank you.", japanese: 'みんな親切すぎる！ありがとう。' },
            { speaker: 'Master', english: "That's what this place is about. Come back anytime.", japanese: 'うちはそういう店だよ。いつでも来な。' },
        ],
    },
    {
        daySlot: 21,
        title: 'Friday Night Gossip',
        titleJa: '金曜の噂話',
        setup: '金曜の夜。居酒屋で盛り上がる噂話タイム。',
        lines: [
            { speaker: 'Mina', english: "Did you hear what happened at work today?", japanese: '今日仕事で何があったか聞いた？' },
            { speaker: 'Takeshi', english: "No, what? Tell me everything.", japanese: '聞いてない。全部話して。' },
            { speaker: 'Mina', english: "The boss quit. Out of nowhere. Just walked out.", japanese: '上司が辞めた。突然。歩いて出てった。' },
            { speaker: 'Lisa', english: "Are you serious? I literally cannot believe that.", japanese: '今マジで言ってる？信じられないんだけど。' },
            { speaker: 'Kenji', english: "Keep this between us, OK? I heard the real reason.", japanese: 'これ内緒にしてね。本当の理由聞いたから。' },
            { speaker: 'Master', english: "Walls have ears. But go on, I'm listening.", japanese: '壁に耳あり。でも続けて、聞いてるから。' },
        ],
    },

    // ═══ WEEK 4: 自分を出す ═══

    {
        daySlot: 22,
        title: 'The Compliment Game',
        titleJa: '褒める練習',
        setup: 'リサが「英語で褒める」授業を開催。褒め方の文化差に全員驚く。',
        lines: [
            { speaker: 'Lisa', english: "OK, let's practice compliments. Takeshi, say something nice to Yuki.", japanese: 'OK、褒める練習しよう。タケシ、ユキに何かいいこと言って。' },
            { speaker: 'Takeshi', english: "Uh... that really suits you. Your haircut, I mean.", japanese: 'えっと…すごい似合ってるね。髪型。' },
            { speaker: 'Yuki', english: "Oh! Thank you! That made my day.", japanese: 'えっ！ありがとう！今日一日ハッピーだわ。' },
            { speaker: 'Lisa', english: "See? Compliments are powerful. Mina, your turn.", japanese: 'ね？褒め言葉はパワフルだよ。ミナ、次。' },
            { speaker: 'Mina', english: "Kenji, you've really improved! Your English is so much better.", japanese: 'ケンジ、めっちゃ上達したね！英語全然違うよ。' },
            { speaker: 'Kenji', english: "That's so kind of you. I'm trying my best.", japanese: '嬉しいこと言ってくれるね。頑張ってるよ。' },
        ],
    },
    {
        daySlot: 23,
        title: 'Making a Reservation',
        titleJa: '電話で予約',
        setup: 'ケンジが海外出張で初めて英語でレストラン予約。電話で緊張。',
        lines: [
            { speaker: 'Kenji', english: "Hi, I'd like to make a reservation for tonight, please.", japanese: '今夜の予約をしたいのですが。' },
            { speaker: 'Staff', english: "Sure! For how many?", japanese: 'はい！何名様ですか？' },
            { speaker: 'Kenji', english: "Two people, around 7 PM. Is a window seat available?", japanese: '2名で、夜7時くらいに。窓際の席ありますか？' },
            { speaker: 'Staff', english: "Let me check... Yes! I have a window table at 7:15.", japanese: '確認しますね…はい！7時15分に窓際のテーブルがあります。' },
            { speaker: 'Kenji', english: "Perfect. The reservation is under Kenji.", japanese: '完璧です。ケンジの名前で。' },
            { speaker: 'Staff', english: "Got it! See you tonight, Kenji.", japanese: '了解！今夜お待ちしてます、ケンジさん。' },
        ],
    },
    {
        daySlot: 24,
        title: 'Souvenir Shopping',
        titleJa: 'お土産選び',
        setup: 'ミナが外国人の友達へのお土産を選ぶ。',
        lines: [
            { speaker: 'Mina', english: "I'm looking for souvenirs for my friends back home.", japanese: '地元の友達にお土産探してるんだけど。' },
            { speaker: 'Staff', english: "What kind of thing are you looking for?", japanese: 'どういうものがいいですか？' },
            { speaker: 'Mina', english: "What's the most popular one? Something everyone likes.", japanese: '一番人気はどれ？みんなが好きそうなやつ。' },
            { speaker: 'Staff', english: "These cookies are our best seller. Everyone loves them.", japanese: 'このクッキーが一番売れてます。みんな好きですよ。' },
            { speaker: 'Mina', english: "Do you have anything individually wrapped?", japanese: '個包装のものあります？' },
            { speaker: 'Staff', english: "This box has 20 pieces, all individually wrapped. Perfect for sharing.", japanese: 'この箱は20個入りで全部個包装。配るのにぴったり。' },
        ],
    },
    {
        daySlot: 25,
        title: 'Airport Panic',
        titleJa: '空港パニック',
        setup: 'ユキの初海外。空港の英語が全部わからなくてパニック。',
        lines: [
            { speaker: 'Yuki', english: "Excuse me, where is gate twelve? I can't find it.", japanese: '12番搭乗口どこですか？見つからなくて。' },
            { speaker: 'Staff', english: "Go past security, turn right. It's at the end.", japanese: 'セキュリティの先を右に。突き当たりです。' },
            { speaker: 'Yuki', english: "I have a connecting flight to London. Do I need to go through customs?", japanese: 'ロンドンへの乗り継ぎなんですが。税関通りますか？' },
            { speaker: 'Staff', english: "Not for connecting flights. Just follow the transfer signs.", japanese: '乗り継ぎは不要です。乗り換え案内に従ってください。' },
            { speaker: 'Yuki', english: "Is this carry-on size? I'm not sure if it fits.", japanese: 'これ機内持ち込みサイズですか？入るかわからなくて。' },
            { speaker: 'Staff', english: "Looks fine to me! You're all set. Have a great flight.", japanese: '大丈夫そうですよ！準備OK。良い旅を。' },
        ],
    },
    {
        daySlot: 26,
        title: 'Memory Lane',
        titleJa: '思い出話',
        setup: '居酒屋で「人生で一番の思い出」を語る夜。',
        lines: [
            { speaker: 'Lisa', english: "What's your most unforgettable experience?", japanese: '一番忘れられない経験って何？' },
            { speaker: 'Takeshi', english: "Backpacking alone through Thailand. Changed my whole perspective.", japanese: 'タイを一人でバックパック旅。人生観変わった。' },
            { speaker: 'Mina', english: "That brings back memories. I studied abroad in Canada.", japanese: '懐かしいな。私カナダに留学してた。' },
            { speaker: 'Kenji', english: "The day my daughter was born. Nothing compares.", japanese: '娘が生まれた日。あれに勝るものはない。' },
            { speaker: 'Master', english: "I have no regrets. Every mistake led me here.", japanese: '後悔はない。全部の失敗がここに繋がった。' },
            { speaker: 'Yuki', english: "Coming to this izakaya. Honestly. This changed everything for me.", japanese: 'この居酒屋に来たこと。本当に。全部変わった。' },
        ],
    },
    {
        daySlot: 27,
        title: 'Making Plans',
        titleJa: '約束する',
        setup: 'みんなで旅行計画を立てる。約束の仕方がバラバラ。',
        lines: [
            { speaker: 'Lisa', english: "We should all go on a trip together! When are you available?", japanese: 'みんなで旅行行かない！？いつ空いてる？' },
            { speaker: 'Kenji', english: "Let me check my schedule. I think next month works.", japanese: 'スケジュール確認させて。来月ならいけるかも。' },
            { speaker: 'Takeshi', english: "I'm in! Just don't cancel on me.", japanese: '俺は行く！キャンセルするなよ。' },
            { speaker: 'Mina', english: "Can you confirm the time and place soon?", japanese: '早めに時間と場所確定してくれる？' },
            { speaker: 'Yuki', english: "I'll make a group chat so we can plan everything.", japanese: 'グループチャット作るね。全部計画しよう。' },
            { speaker: 'Master', english: "Take pictures and bring me back a story.", japanese: '写真撮って、土産話を持ってこい。' },
        ],
    },
    {
        daySlot: 28,
        title: 'Dream Talk',
        titleJa: '夢を語る夜',
        setup: '居酒屋で「将来何したい？」を語る。酔った勢いの本音トーク。',
        lines: [
            { speaker: 'Mina', english: "It's always been my dream to live abroad for a year.", japanese: 'ずっと夢だったんだ、1年海外に住むこと。' },
            { speaker: 'Takeshi', english: "My goal is to travel the world. Every continent.", japanese: '世界中旅するのが目標。全大陸。' },
            { speaker: 'Yuki', english: "I want to have a real conversation in English without thinking.", japanese: '考えずに英語で自然に会話できるようになりたい。' },
            { speaker: 'Kenji', english: "Someday I'll start my own business. I just need the courage.", japanese: 'いつか自分のビジネス始めたい。勇気が要るけど。' },
            { speaker: 'Lisa', english: "I want to write a book about all of you guys.", japanese: 'みんなのことで本書きたい。' },
            { speaker: 'Master', english: "Dreams are great, but action is better. Start tomorrow.", japanese: '夢はいいけど、行動のほうがいい。明日始めろ。' },
        ],
    },
    {
        daySlot: 29,
        title: 'Celebration Night',
        titleJa: 'お祝いの夜',
        setup: '居酒屋でケンジの昇進祝い。乾杯からプレゼントまで。',
        lines: [
            { speaker: 'Lisa', english: "Congratulations, Kenji! You totally deserve it!", japanese: 'おめでとう、ケンジ！ふさわしいよ！' },
            { speaker: 'Takeshi', english: "You put in the work and it paid off. Respect.", japanese: '努力して結果出したじゃん。リスペクト。' },
            { speaker: 'Mina', english: "Cheers to Kenji and everything he's accomplished!", japanese: '乾杯！ケンジの成功に！' },
            { speaker: 'Kenji', english: "I couldn't have done it without you guys. Honestly.", japanese: 'みんながいなかったら無理だった。マジで。' },
            { speaker: 'Yuki', english: "We got you a little something. Open it!", japanese: 'ちょっとしたプレゼント。開けて！' },
            { speaker: 'Master', english: "Tonight's drinks are on the house. You earned it.", japanese: '今夜は俺のおごりだ。頑張ったんだから。' },
        ],
    },
    {
        daySlot: 30,
        title: 'See You Next Month',
        titleJa: 'さよなら、またね',
        setup: 'Month 1最終日。居酒屋を出る夜。「終わり」ではなく「始まり」。',
        lines: [
            { speaker: 'Yuki', english: "I should get going. But I had an incredible time this month.", japanese: 'そろそろ帰ろうかな。でもこの1ヶ月、最高だった。' },
            { speaker: 'Takeshi', english: "I'm gonna miss this. Same time next month?", japanese: '寂しくなるな。来月も同じ時間？' },
            { speaker: 'Lisa', english: "Of course! This is just the beginning.", japanese: 'もちろん！まだ始まったばかりだよ。' },
            { speaker: 'Mina', english: "I can't believe how much we've all grown in just one month.", japanese: 'たった1ヶ月でみんなこんなに成長したなんて信じられない。' },
            { speaker: 'Kenji', english: "I had a great time. Seriously. Thank you, everyone.", japanese: '最高だった。マジで。みんな、ありがとう。' },
            { speaker: 'Master', english: "You all did great. Now get out of here. See you next month.", japanese: 'みんな頑張ったな。ほら、帰れ。来月また来い。' },
        ],
    },
];

export function getConversation(daySlot: number): DailyConversation | undefined {
    return DAILY_CONVERSATIONS.find(c => c.daySlot === daySlot);
}

export function getAvailableConversationDays(): number[] {
    return DAILY_CONVERSATIONS.map(c => c.daySlot);
}
