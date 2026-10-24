/**
 * Airport Delay -- 5-episode conversation series for Memoria
 * Gate B12 at Chicago O'Hare. A flight to a smaller city is delayed by a
 * snowstorm, then cancelled, then the passengers spend the night at the gate
 * before finally boarding the next afternoon. Strangers become a temporary family.
 * 8 characters: Denise (44F gate agent), Reuben (38M business traveler),
 *   Hana (29F Japanese traveler), Wendell (62M retiree), Simone (26F grad student),
 *   Chad (34M entitled traveler), Captain Ortiz (50M pilot), Diego (10M minor)
 * One continuous ~26-hour ordeal, told as 5 episodes.
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, self-corrections, real airport jargon mixed with civilian panic.
 * Format: ~16-18 lines per day per language.
 */

export interface AirportDelayEntry {
    id: string;
    date: string;
    title: string;
    titleJa: string;
    content: string;
    series: string;
    seriesTitle: string;
    conversation: {
        english: Array<{ speaker: 'male' | 'female'; text: string }>;
        japanese: Array<{ speaker: 'male' | 'female'; text: string }>;
        generatedAt: Date;
        tone: string;
    };
    tone: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const generatedAt = new Date('2026-05-30T12:00:00.000Z');

export const airportDelayEntries: AirportDelayEntry[] = [
    // ============================================================
    // DAY 1 (May 30) -- THE FIRST DELAY
    // ============================================================
    {
        id: 'airport-day1',
        date: '2026-05-30',
        title: 'Day 1: The First Delay',
        titleJa: 'Day 1: 最初の遅延',
        content: 'シカゴ・オヘア空港B12ゲート。吹雪で出発が2時間遅れに。出張で大事な会議に向かうルーベンが苛立ち、退屈なゲート係デニースが淡々と対応。日本から来たハナは不安げ。',
        series: 'airport-delay',
        seriesTitle: 'Airport Delay',
        tone: 'casual',
        tags: ['travel', 'airport', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Denise: Attention passengers at gate B12 -- so, due to weather, our flight to Cedar Rapids is now showing a delay. New departure time is, um, four-forty. I'll update you when I know more." },
                { speaker: 'male', text: "Reuben: Four-forty? That's two hours. Excuse me -- excuse me, ma'am, is that two hours? Because I have a meeting, like, a real meeting, and I cannot be two hours late." },
                { speaker: 'female', text: "Denise: Sir, I just know what the screen knows. The screen says four-forty." },
                { speaker: 'male', text: "Reuben: Okay, but is the screen, like, optimistic, or is it -- is it lying to me right now? Because I need to know if I should rebook." },
                { speaker: 'female', text: "Denise: The screen doesn't have feelings. It's snowing. Planes don't love snow." },
                { speaker: 'male', text: "Wendell: Two hours! Heck, that's nothing. I once sat in Denver for nine hours. Brought my own sandwiches. You want a granola bar, son? You look like you could use a granola bar." },
                { speaker: 'male', text: "Reuben: I'm -- no. Thank you. I'm fine." },
                { speaker: 'female', text: "Hana: Excuse me. Sorry. The delay -- it is only for this flight, or... all the flights? My English is, um, not so fast, sorry." },
                { speaker: 'female', text: "Denise: Just this one, honey. And your English is fine. Where are you headed?" },
                { speaker: 'female', text: "Hana: A wedding. My friend's wedding. She is American and I am very, very late if the plane does not go." },
                { speaker: 'male', text: "Wendell: A wedding! Now see, that's worth being calm for. Weddings wait. Meetings --" },
                { speaker: 'male', text: "Reuben: Meetings do not wait. That's the whole point of a meeting." },
                { speaker: 'female', text: "Simone: Can I just say -- if you all are this stressed at hour zero, I'm honestly a little worried for you. It's a snowstorm. We're gonna be here a while." },
                { speaker: 'male', text: "Reuben: A while? What does a while mean? You can't just say a while." },
                { speaker: 'female', text: "Simone: It means what it means. I'm flying standby, so trust me, I read these boards for a living." },
                { speaker: 'female', text: "Denise: She's not wrong. Folks, get comfortable. Bathrooms are down the hall. I'll be right here." },
                { speaker: 'male', text: "Wendell: Granola bar's still on the table, by the way. For anybody. No pressure." },
            ],
            japanese: [
                { speaker: 'female', text: "Denise: B12ゲートのお客様にご案内です -- えー、天候の影響で、シーダーラピッズ行きの便が遅延となっております。新しい出発時刻は、その、4時40分です。分かり次第お知らせします。" },
                { speaker: 'male', text: "Reuben: 4時40分？2時間じゃないか。すみません -- すみません、それって2時間ですか？僕、会議があるんです、本物の会議が。2時間も遅れられないんですよ。" },
                { speaker: 'female', text: "Denise: お客様、私もこの画面が知ってることしか知りません。画面には4時40分と出てます。" },
                { speaker: 'male', text: "Reuben: でもその画面って、楽観的なやつなんですか、それとも -- 今この瞬間、僕に嘘をついてるんですか？取り直すべきか知りたいんで。" },
                { speaker: 'female', text: "Denise: 画面に感情はありません。雪が降ってるんです。飛行機は雪が好きじゃないので。" },
                { speaker: 'male', text: "Wendell: 2時間！そんなの何でもないさ。わしなんかデンバーで9時間座ってたぞ。自分のサンドイッチ持ってってな。グラノーラバーいるかい、兄ちゃん？なんか必要そうな顔してるぞ。" },
                { speaker: 'male', text: "Reuben: 僕は -- いえ。けっこうです。大丈夫なんで。" },
                { speaker: 'female', text: "Hana: すみません。ごめんなさい。この遅延って -- この便だけですか、それとも... 全部の便ですか？英語が、その、あんまり速くなくて、ごめんなさい。" },
                { speaker: 'female', text: "Denise: この便だけよ、お嬢さん。英語もちゃんと通じてる。どこへ行くの？" },
                { speaker: 'female', text: "Hana: 結婚式です。友達の結婚式。彼女はアメリカ人で、飛行機が飛ばないと私すごく、すごく遅れちゃうんです。" },
                { speaker: 'male', text: "Wendell: 結婚式か！ほら、それなら落ち着く価値があるってもんだ。結婚式は待ってくれる。会議は --" },
                { speaker: 'male', text: "Reuben: 会議は待ってくれません。それが会議っていうものの本質なんで。" },
                { speaker: 'female', text: "Simone: ちょっと言わせてもらうと -- まだ始まって0時間でみんなこんなにピリピリしてるなら、正直ちょっと心配だよ。吹雪なんだよ。しばらくここにいることになるから。" },
                { speaker: 'male', text: "Reuben: しばらく？しばらくってどういう意味ですか？しばらくとか言われても困るんですよ。" },
                { speaker: 'female', text: "Simone: そのままの意味だよ。私キャンセル待ちで飛ぶから、信じて、こういう掲示板読むのが商売みたいなもんなの。" },
                { speaker: 'female', text: "Denise: 彼女の言う通り。みなさん、楽にしてください。トイレは廊下の先です。私はここにいますので。" },
                { speaker: 'male', text: "Wendell: ちなみにグラノーラバーはまだそこに置いてあるからな。誰でもどうぞ。無理にとは言わんが。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 2 (May 31) -- CANCELLED
    // ============================================================
    {
        id: 'airport-day2',
        date: '2026-05-31',
        title: 'Day 2: Cancelled',
        titleJa: 'Day 2: 欠航',
        content: '夕方、デニースが便の欠航を発表。チャドがゲートカウンターで猛抗議。ルーベンはマイレージのステータスをかざして文句、機長オルティスが冷静に状況を説明する。',
        series: 'airport-delay',
        seriesTitle: 'Airport Delay',
        tone: 'humorous',
        tags: ['travel', 'airport', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Denise: Okay, folks. I'm not gonna sugarcoat this. The four-forty became a six-fifteen, the six-fifteen became an eight o'clock, and -- I just got the word -- the flight to Cedar Rapids tonight is cancelled." },
                { speaker: 'male', text: "Chad: No. No, no, no. You don't get to just say cancelled. Cancelled is not a thing you can just say to me." },
                { speaker: 'female', text: "Denise: I understand you're frustrated, sir." },
                { speaker: 'male', text: "Chad: Frustrated? I'm beyond frustrated. I want a hotel, I want a meal voucher, and I want to speak to whoever decided to cancel my flight." },
                { speaker: 'female', text: "Denise: That would be the weather, sir. The weather decided. I can give you the weather's number but it does not pick up." },
                { speaker: 'female', text: "Simone: She's so good. She's been doing this for twenty years, you can just tell." },
                { speaker: 'male', text: "Reuben: Okay, look -- Denise, right? Denise. I'm a Platinum member. Platinum. That has to count for something. There has to be a plane somewhere for Platinum people." },
                { speaker: 'female', text: "Denise: Sir, I love Platinum members, I really do. But Platinum does not melt snow." },
                { speaker: 'male', text: "Wendell: Ha! Platinum does not melt snow. Denise, you are a treasure. I'm writing that one down." },
                { speaker: 'male', text: "Captain Ortiz: Evening, everybody. I'm Captain Ortiz -- I was supposed to be flying you tonight. I wanted to come out here myself instead of hiding in the back." },
                { speaker: 'male', text: "Chad: Oh, great, the captain. So fly the plane, Captain. That's literally your one job." },
                { speaker: 'male', text: "Captain Ortiz: I hear you. Honestly, I do. But here's the truth -- the runway de-icing is backed up, visibility's near zero, and I'm not gonna take a full plane up in that. I'd rather you be annoyed with me than not get there at all." },
                { speaker: 'female', text: "Hana: Captain. Thank you. For -- for not flying. I think that is the brave choice, actually." },
                { speaker: 'male', text: "Captain Ortiz: That means a lot, miss. Most people don't see it that way. We try again first thing tomorrow." },
                { speaker: 'female', text: "Denise: And about those hotels -- every hotel near the airport is full. It's the whole airport stuck, not just us. So I'm sorry, but tonight, gate B12 is the hotel." },
                { speaker: 'male', text: "Chad: This is unbelievable. This is actually unbelievable." },
                { speaker: 'male', text: "Wendell: It's a little believable, son. Snow does this. Sit down, have a granola bar, and let's make the best of it." },
            ],
            japanese: [
                { speaker: 'female', text: "Denise: さて、みなさん。オブラートに包むのはやめます。4時40分が6時15分になり、6時15分が8時になり、そして -- たった今連絡が入りました -- 今夜のシーダーラピッズ行きは欠航です。" },
                { speaker: 'male', text: "Chad: ダメだ。ダメダメダメ。欠航とか勝手に言われても困る。欠航なんて言葉を僕に向かって簡単に使うな。" },
                { speaker: 'female', text: "Denise: ご不満なのは分かります、お客様。" },
                { speaker: 'male', text: "Chad: 不満？不満どころじゃない。ホテルをよこせ、食事券をよこせ、それから僕の便を欠航にすると決めたやつと話させろ。" },
                { speaker: 'female', text: "Denise: それは天候です、お客様。天候が決めました。天候の電話番号ならお教えできますが、出ませんよ。" },
                { speaker: 'female', text: "Simone: この人うますぎる。20年これやってるんだろうな、見れば分かるよ。" },
                { speaker: 'male', text: "Reuben: あの、ちょっと -- デニースさん、でしたっけ？デニースさん。僕プラチナ会員なんです。プラチナ。それって何かの意味があるはずでしょ。プラチナの人間のための飛行機がどこかにあるはずだ。" },
                { speaker: 'female', text: "Denise: お客様、プラチナ会員は大好きです、本当に。でもプラチナは雪を溶かしません。" },
                { speaker: 'male', text: "Wendell: ハハッ！プラチナは雪を溶かさない。デニース、あんたは宝物だな。今のメモしとくぞ。" },
                { speaker: 'male', text: "Captain Ortiz: みなさん、こんばんは。機長のオルティスです -- 今夜みなさんを乗せて飛ぶはずでした。後ろに隠れてるんじゃなく、自分でここに出てきたかったんです。" },
                { speaker: 'male', text: "Chad: ああ、よかった、機長だ。じゃあ飛行機を飛ばせよ、機長。それが文字通りあんたの唯一の仕事だろ。" },
                { speaker: 'male', text: "Captain Ortiz: 言いたいことは分かります。本当に。でも本当のところを言うと -- 滑走路の除氷が詰まっていて、視界はほぼゼロです。あの状況で満席の飛行機を上げるつもりはありません。みなさんに着けないより、私に腹を立ててもらう方がいい。" },
                { speaker: 'female', text: "Hana: 機長。ありがとうございます。飛ばないでくれて。それは実は、勇気のある選択だと思います。" },
                { speaker: 'male', text: "Captain Ortiz: それは嬉しいですね、お嬢さん。ほとんどの人はそうは見てくれません。明日の朝一番にまた挑戦します。" },
                { speaker: 'female', text: "Denise: それとホテルの件ですが -- 空港近くのホテルは全部満室です。うちだけじゃなく空港全体が足止めなので。なので申し訳ないですが、今夜はB12ゲートがホテルです。" },
                { speaker: 'male', text: "Chad: 信じられない。これは本当に信じられない。" },
                { speaker: 'male', text: "Wendell: ちょっとは信じられるさ、兄ちゃん。雪はこういうことをするんだ。座って、グラノーラバーでも食って、できる限りいい時間にしようや。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 3 (Jun 1) -- OVERNIGHT AT GATE B12
    // ============================================================
    {
        id: 'airport-day3',
        date: '2026-06-01',
        title: 'Day 3: Overnight at Gate B12',
        titleJa: 'Day 3: B12ゲートで一夜',
        content: '深夜のゲート。みんな床で雑魚寝。付き添いなしの少年ディエゴがウェンデルとお菓子をシェア。ハナとシモーヌが打ち解け、ルーベンも少しずつ肩の力が抜けていく。',
        series: 'airport-delay',
        seriesTitle: 'Airport Delay',
        tone: 'reflective',
        tags: ['travel', 'airport', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Wendell: Hey there. You're traveling all by yourself, huh? What's your name, young man?" },
                { speaker: 'male', text: "Diego: Diego. I'm ten. I do this twice a year, my parents are divorced, it's honestly not a big deal. I have headphones and a tablet." },
                { speaker: 'male', text: "Wendell: Twice a year! Well, you're a pro then. More of a pro than half these grownups. You want a granola bar? It's the last one." },
                { speaker: 'male', text: "Diego: I'll trade you. I have two fruit snacks and a thing of pretzels. The pretzels are kind of crushed but they still work." },
                { speaker: 'male', text: "Wendell: Now that is a deal. Crushed pretzels still work. That should be on a poster somewhere." },
                { speaker: 'female', text: "Denise: Diego, you doing okay over there? You stay where I can see you, you hear me? You're technically my responsibility tonight." },
                { speaker: 'male', text: "Diego: I'm fine, Denise. Wendell has snacks. I'm basically thriving." },
                { speaker: 'female', text: "Simone: Hana. Hana, you can't sleep either? Come sit. I've got a hoodie you can fold up, it makes a decent pillow." },
                { speaker: 'female', text: "Hana: Thank you. I keep thinking -- my friend, the bride, she will be so sad if I miss it. We have been friends since I was nineteen. Twenty -- no, nineteen. We met in a coffee shop." },
                { speaker: 'female', text: "Simone: You're not gonna miss it. The wedding's not till Saturday, right? We've got time. And worst case, we'll all chip in and get you there somehow." },
                { speaker: 'female', text: "Hana: We? You don't even know me." },
                { speaker: 'female', text: "Simone: Honey, we've slept on the same carpet. At this point I know you better than I know my own roommate." },
                { speaker: 'male', text: "Reuben: Can I -- sorry. I couldn't help overhearing. I've been on my phone all night trying to fix my meeting and I just -- I just realized nobody on the other end actually cares. They moved it. Without me." },
                { speaker: 'female', text: "Simone: Oh. Reuben. That kind of stings, huh?" },
                { speaker: 'male', text: "Reuben: It really does. I've been losing my mind over a meeting that didn't even need me. That's -- yeah. That's a fun thing to learn at two in the morning on a carpet." },
                { speaker: 'male', text: "Wendell: Come sit with the rest of us, Reuben. The carpet's better with company. Always has been." },
                { speaker: 'male', text: "Reuben: ...Yeah. Okay. Yeah. Scoot over." },
            ],
            japanese: [
                { speaker: 'male', text: "Wendell: やあ。一人で旅してるのかい？名前は何ていうんだ、少年？" },
                { speaker: 'male', text: "Diego: ディエゴ。10歳。これ年に2回やってるんだ、両親が離婚しててさ、正直たいしたことないよ。ヘッドホンとタブレットあるし。" },
                { speaker: 'male', text: "Wendell: 年に2回！じゃあもうプロだな。この大人の半分よりよっぽどプロだ。グラノーラバーいるかい？最後の1個だ。" },
                { speaker: 'male', text: "Diego: 交換しよう。フルーツスナック2個とプレッツェルのやつ持ってる。プレッツェルはちょっと砕けてるけど、まだいけるよ。" },
                { speaker: 'male', text: "Wendell: それは取引成立だな。砕けたプレッツェルもまだいける。どこかのポスターに書いとくべきだ。" },
                { speaker: 'female', text: "Denise: ディエゴ、そっちは大丈夫？私から見える所にいてね、いい？今夜あなたは一応私の責任なんだから。" },
                { speaker: 'male', text: "Diego: 大丈夫だよ、デニース。ウェンデルがお菓子持ってる。むしろ絶好調。" },
                { speaker: 'female', text: "Simone: ハナ。ハナ、あなたも眠れないの？こっち座りなよ。パーカーあるから、折りたためばけっこういい枕になるよ。" },
                { speaker: 'female', text: "Hana: ありがとう。ずっと考えちゃって -- 友達、花嫁の子、私が行けなかったらすごく悲しむと思う。19歳の時からの友達なの。20 -- ううん、19。コーヒーショップで出会ったの。" },
                { speaker: 'female', text: "Simone: 行けなくなんかならないよ。結婚式は土曜まででしょ？まだ時間ある。最悪の場合、みんなでお金出し合って何とかして連れてってあげる。" },
                { speaker: 'female', text: "Hana: みんなで？あなたたち私のこと知らないのに。" },
                { speaker: 'female', text: "Simone: ねえ、私たち同じカーペットで寝た仲だよ。この時点でルームメイトより詳しいくらい。" },
                { speaker: 'male', text: "Reuben: あの -- ごめん。聞こえちゃって。一晩中スマホで会議を何とかしようとしてたんだけど、僕 -- 僕、向こうの誰一人気にしてないって今気づいた。会議、動かされてた。僕抜きで。" },
                { speaker: 'female', text: "Simone: ああ。ルーベン。それはちょっとくるね。" },
                { speaker: 'male', text: "Reuben: 本当にね。僕を必要としてもいなかった会議のために、頭をかきむしってたんだ。それは -- うん。午前2時にカーペットの上で学ぶには、なかなか楽しい教訓だよ。" },
                { speaker: 'male', text: "Wendell: こっち来て俺たちと座れよ、ルーベン。カーペットは仲間がいた方がマシだ。昔からそうさ。" },
                { speaker: 'male', text: "Reuben: ...うん。そうだね。うん。ちょっと詰めて。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },

    // ============================================================
    // DAY 4 (Jun 2) -- THE STANDBY LIST
    // ============================================================
    {
        id: 'airport-day4',
        date: '2026-06-02',
        title: 'Day 4: The Standby List',
        titleJa: 'Day 4: キャンセル待ちリスト',
        content: '早朝、小さい機材の代替便が発表される。全員は乗れず、デニースがキャンセル待ちリストを読み上げる。チャドが順番に文句を言うが、グループは助け合いの精神でハナを優先させる。',
        series: 'airport-delay',
        seriesTitle: 'Airport Delay',
        tone: 'energetic',
        tags: ['travel', 'airport', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Denise: Okay, okay -- everybody wake up. Good news, sort of. They found us a plane. Bad news -- it's a smaller plane. So not all of us fit. I've gotta read a standby list." },
                { speaker: 'male', text: "Chad: A standby list? I have a confirmed ticket. I should not be on any list. I should be first. Why am I not just first?" },
                { speaker: 'female', text: "Denise: Sir, everybody here had a confirmed ticket. That's how we all ended up sleeping on the same floor together." },
                { speaker: 'male', text: "Reuben: Let her read the list, Chad. Honestly. Just -- let her read it." },
                { speaker: 'female', text: "Denise: Thank you, Reuben. Okay -- the list goes by original booking time. First on is... Wendell Pruitt." },
                { speaker: 'male', text: "Wendell: Well, would you look at that. Booked early, I always book early. But -- hold on. Denise, can I give my seat to somebody?" },
                { speaker: 'female', text: "Denise: You can, technically. It's unusual, but you can." },
                { speaker: 'male', text: "Wendell: Then I'd like Hana to have it. The young lady's got a wedding. My grandkids will still be there tomorrow -- they're not getting married, they're seven and nine." },
                { speaker: 'female', text: "Hana: No, no, Wendell, I can't. That is your seat. You waited the same as me, that is not fair to you." },
                { speaker: 'male', text: "Wendell: Hana. I have been on this earth sixty-two years. Trust me -- giving the seat away is the part I'll remember. Take it." },
                { speaker: 'female', text: "Simone: Okay I'm not crying, you're crying. Wendell, that's -- yeah. That's a good man right there." },
                { speaker: 'male', text: "Chad: This is ridiculous. You can't just hand out seats based on -- on weddings. There's a system. There's a list." },
                { speaker: 'female', text: "Denise: There is a list. And the list allows transfers. So the list is being followed, sir. Sit tight." },
                { speaker: 'male', text: "Diego: I'm on the list too, right, Denise? I have to be, I'm a minor, you said I'm your responsibility." },
                { speaker: 'female', text: "Denise: You are at the very top with a little star next to your name, Diego. Minors and the bride's friend get priority. That's the rule as of right now, because I just made it the rule." },
                { speaker: 'male', text: "Reuben: And the rest of us?" },
                { speaker: 'female', text: "Denise: The rest of you wait for the afternoon plane with me. One more push, folks. We're almost out of here." },
            ],
            japanese: [
                { speaker: 'female', text: "Denise: はい、はい -- みんな起きて。いい知らせ、みたいなもの。飛行機が見つかりました。悪い知らせ -- 小さい機材です。なので全員は乗れません。キャンセル待ちリストを読み上げます。" },
                { speaker: 'male', text: "Chad: キャンセル待ちリスト？僕は確定チケットを持ってる。どのリストにも載るべきじゃない。一番のはずだ。なんで僕がただ一番じゃないんだ？" },
                { speaker: 'female', text: "Denise: お客様、ここにいる全員が確定チケットを持っていました。だからこそ全員で同じ床に寝ることになったんです。" },
                { speaker: 'male', text: "Reuben: リストを読ませてやれよ、チャド。本当に。ただ -- 読ませてやれって。" },
                { speaker: 'female', text: "Denise: ありがとう、ルーベン。では -- リストは元の予約時刻順です。一番目は... ウェンデル・プルーイットさん。" },
                { speaker: 'male', text: "Wendell: おや、見てみろよ。早く予約したからな、わしはいつも早く予約する。でも -- ちょっと待った。デニース、わしの席を誰かに譲れるかい？" },
                { speaker: 'female', text: "Denise: できますよ、一応。珍しいですけど、できます。" },
                { speaker: 'male', text: "Wendell: ならハナに譲りたい。お嬢さんは結婚式があるんだ。わしの孫は明日もそこにいる -- あいつらは結婚するわけじゃない、7歳と9歳だからな。" },
                { speaker: 'female', text: "Hana: だめ、だめ、ウェンデル、受け取れない。それはあなたの席です。あなたも私と同じだけ待った、それはあなたに不公平です。" },
                { speaker: 'male', text: "Wendell: ハナ。わしはこの地球に62年いる。信じてくれ -- 席を譲ったことの方が、わしの記憶に残る部分なんだ。受け取りなさい。" },
                { speaker: 'female', text: "Simone: よし私は泣いてない、泣いてるのはそっち。ウェンデル、それは -- うん。あれこそ立派な男ってやつだよ。" },
                { speaker: 'male', text: "Chad: バカげてる。結婚式とか -- そんなもので席を勝手に配れるわけないだろ。システムがある。リストがある。" },
                { speaker: 'female', text: "Denise: リストはあります。そしてリストは譲渡を認めています。なのでリストはちゃんと守られてますよ、お客様。じっとしててください。" },
                { speaker: 'male', text: "Diego: 僕もリストに載ってるよね、デニース？載ってるはずだよ、僕未成年だし、僕はあなたの責任だって言ったじゃん。" },
                { speaker: 'female', text: "Denise: あなたは名前の横に小さい星マーク付きで一番上よ、ディエゴ。未成年と花嫁の友達が優先。それが今この瞬間からのルール、だって私が今ルールにしたから。" },
                { speaker: 'male', text: "Reuben: で、僕たち残りは？" },
                { speaker: 'female', text: "Denise: 残りのみなさんは私と一緒に午後の便を待ちます。あともうひと踏ん張りです、みなさん。もうすぐここを出られます。" },
            ],
            generatedAt,
            tone: 'energetic',
        },
    },

    // ============================================================
    // DAY 5 (Jun 3) -- FINALLY BOARDING
    // ============================================================
    {
        id: 'airport-day5',
        date: '2026-06-03',
        title: 'Day 5: Finally Boarding',
        titleJa: 'Day 5: ついに搭乗',
        content: '翌日の午後、ついに残った全員の搭乗が始まる。26時間を共にした仲間たちが連絡先を交換し、デニースが最後のアナウンス。チャドも少しだけ態度が和らぐ。',
        series: 'airport-delay',
        seriesTitle: 'Airport Delay',
        tone: 'playful',
        tags: ['travel', 'airport', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Denise: Attention at gate B12 -- and I have genuinely been waiting twenty-six hours to say this -- we are now boarding the flight to Cedar Rapids. All rows. Everybody. Go." },
                { speaker: 'male', text: "Reuben: Wait, that's it? After all that, it's just -- now boarding, all rows? No drama?" },
                { speaker: 'female', text: "Denise: That's how it always ends, Reuben. Big mess, then one boring sentence, and it's over. Twenty years, it's always that one boring sentence." },
                { speaker: 'female', text: "Simone: Hana, give me your phone. I'm putting my number in. We slept on a carpet together, we're friends for life now, those are the rules." },
                { speaker: 'female', text: "Hana: I already saved you. And Wendell, and Diego, and -- everyone. I made a group. I called it 'Gate B12 Family.' Is that too much? Maybe it is too much." },
                { speaker: 'male', text: "Wendell: It is not one bit too much. Gate B12 Family. Add me twice if the system lets you." },
                { speaker: 'male', text: "Diego: I'm already in it. I named myself 'Diego the Pretzel Guy.' Wendell, you're 'Granola Grandpa.' I hope that's okay." },
                { speaker: 'male', text: "Wendell: Granola Grandpa. Son, I have never been prouder of a name in my life." },
                { speaker: 'male', text: "Chad: So, look -- I just wanted to -- yesterday I was a lot. I know I was a lot. The thing is I hate not being in control, and that came out as, you know. All of that." },
                { speaker: 'female', text: "Denise: Sir, in twenty years you are far from the worst I've had. You came back and said something. Most people just disappear." },
                { speaker: 'male', text: "Chad: Right. Well. Thanks for not, like, throwing me out a window." },
                { speaker: 'female', text: "Simone: We'd have missed you, Chad. Honestly. You were our villain. Every gate family needs one." },
                { speaker: 'male', text: "Reuben: Denise, what about you? Do you ever actually get on a plane, or do you just live here at B12 forever?" },
                { speaker: 'female', text: "Denise: I go home, Reuben. I have a cat and a couch and a show I'm behind on. But yeah -- some gates, some groups, you remember. This one I'll remember." },
                { speaker: 'male', text: "Captain Ortiz: All right, B12 Family -- that's what we're calling ourselves now, I heard it through the door. Get on board. The weather's perfect and I will personally get every one of you to that wedding." },
                { speaker: 'female', text: "Hana: Thank you. All of you. I came here alone and I am leaving with -- a whole group chat. That is not a bad delay, actually." },
                { speaker: 'female', text: "Denise: Go on, Family. Last call. And -- hey. Safe travels. Really." },
            ],
            japanese: [
                { speaker: 'female', text: "Denise: B12ゲートのお客様にご案内です -- そしてこれを言うのを私は本当に26時間待っていました -- ただいまよりシーダーラピッズ行きの搭乗を開始します。全列。全員。行ってください。" },
                { speaker: 'male', text: "Reuben: え、それだけ？あれだけのことがあって、ただ -- 全列ただいま搭乗開始？ドラマなし？" },
                { speaker: 'female', text: "Denise: いつもこうやって終わるのよ、ルーベン。大混乱、それから退屈な一文、で、終わり。20年、いつもあの退屈な一文。" },
                { speaker: 'female', text: "Simone: ハナ、スマホ貸して。私の番号入れとく。一緒にカーペットで寝た仲だし、もう一生の友達、それがルール。" },
                { speaker: 'female', text: "Hana: もう保存したよ。ウェンデルも、ディエゴも、それから -- みんな。グループ作ったの。『B12ゲートファミリー』って名前にした。やりすぎかな？やっぱりやりすぎかも。" },
                { speaker: 'male', text: "Wendell: これっぽっちもやりすぎじゃないさ。B12ゲートファミリー。システムが許すなら俺を2回追加してくれ。" },
                { speaker: 'male', text: "Diego: 僕もう入ってるよ。自分を『プレッツェルのディエゴ』って名前にした。ウェンデルは『グラノーラじいさん』。それでいいといいんだけど。" },
                { speaker: 'male', text: "Wendell: グラノーラじいさん。少年、わしは人生でこれほど名前を誇りに思ったことはないぞ。" },
                { speaker: 'male', text: "Chad: あの、ちょっと -- 言いたかったんだけど -- 昨日の僕はちょっとひどかった。ひどかったのは分かってる。要するに僕はコントロールできないのが嫌いで、それがその、出ちゃったんだ。あの全部が。" },
                { speaker: 'female', text: "Denise: お客様、20年やってきて、あなたは最悪からはほど遠いですよ。戻ってきて何か言ってくれた。ほとんどの人はただ消えるんです。" },
                { speaker: 'male', text: "Chad: そっか。まあ。窓から放り出さないでくれてありがとう。" },
                { speaker: 'female', text: "Simone: いなくなったら寂しかったよ、チャド。本当に。あなたは私たちの悪役だった。どのゲートファミリーにも一人は必要なの。" },
                { speaker: 'male', text: "Reuben: デニース、あなたは？実際に飛行機に乗ることってあるの、それともずっとここB12に住んでるの？" },
                { speaker: 'female', text: "Denise: 家に帰るわよ、ルーベン。猫がいて、ソファがあって、見そびれてるドラマがある。でもそうね -- ゲートによって、グループによって、覚えてるものがある。これは覚えてると思う。" },
                { speaker: 'male', text: "Captain Ortiz: さて、B12ファミリー -- もう自分たちでそう呼んでるんですね、ドア越しに聞こえましたよ。搭乗してください。天気は完璧、私が責任を持って全員をその結婚式に届けます。" },
                { speaker: 'female', text: "Hana: ありがとう。みんな。私はここに一人で来て、出ていくときには -- グループチャット丸ごと。これは実は、悪くない遅延でした。" },
                { speaker: 'female', text: "Denise: 行ってらっしゃい、ファミリー。最終案内です。それと -- ねえ。よい旅を。本当に。" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },
];
