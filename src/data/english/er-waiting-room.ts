/**
 * ER Waiting Room -- 5-episode conversation series for Memoria
 * One long Saturday night into Sunday morning. Dave sliced his hand on a power saw
 * doing weekend DIY; his wife Renata drove him in. Triage bumps him down the queue,
 * so they settle in for a six-hour wait and slowly bond with the other patients.
 * 9 characters: Nurse Tanya (38F triage nurse), Dave (40M patient), Renata (39F wife),
 *   Walter (71M heartburn/chest pain), Destiny (24F young mom), Little Mateo (2M toddler),
 *   Brody (28M twisted ankle), Dr Osei (45M ER doctor), Phil (50M registration clerk)
 * The 5 "days" are 5 episodes of ONE continuous overnight ordeal.
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, false starts, hospital jargon mixed with civilian nerves.
 * Format: ~16-18 lines per day per language.
 */

export interface ErWaitingRoomEntry {
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

const generatedAt = new Date('2026-06-04T12:00:00.000Z');

export const erWaitingRoomEntries: ErWaitingRoomEntry[] = [
    // ============================================================
    // DAY 1 (Jun 04) -- THE TRIAGE
    // ============================================================
    {
        id: 'er-day1',
        date: '2026-06-04',
        title: 'Day 1: The Triage',
        titleJa: 'Day 1: トリアージ',
        content: 'デイブが電動ノコギリで手を切り、妻のレナータが救急外来へ。トリアージ看護師のターニャは、命に関わらないからと順番を後ろに回す。6時間待ちが確定する。',
        series: 'er-waiting-room',
        seriesTitle: 'ER Waiting Room',
        tone: 'humorous',
        tags: ['hospital', 'er', 'comedy', 'triage', 'marriage'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Nurse Tanya: Okay, hi, come on in, sit down -- let me see the hand. Don't unwrap it yet, just -- okay, how did this happen?" },
                { speaker: 'male', text: "Dave: It's honestly not that bad. I was -- so what happened was, I was cutting some trim, and the saw kind of... got away from me." },
                { speaker: 'female', text: "Renata: It's a power saw. It got away from him. I have told him a hundred times to wear the gloves, and every single time he says the gloves are for amateurs." },
                { speaker: 'female', text: "Nurse Tanya: Mm-hm. Sir, I'm gonna need you to actually let me look, because 'not that bad' and a towel that color usually don't go together." },
                { speaker: 'male', text: "Dave: It stopped bleeding like twenty minutes ago. Mostly. I think." },
                { speaker: 'female', text: "Nurse Tanya: Okay. So -- it's deep, it's gonna need stitches, probably five or six, but here's the thing, and I want to be straight with you: it is not life-threatening." },
                { speaker: 'male', text: "Dave: Right, see, that's what I said." },
                { speaker: 'female', text: "Nurse Tanya: Which means -- and I know this isn't what you want to hear -- you're gonna be waiting a while. We're slammed tonight. It's a Saturday." },
                { speaker: 'female', text: "Renata: Define 'a while'." },
                { speaker: 'female', text: "Nurse Tanya: Honestly? Five, six hours. Could be more. The fingers all move, you've got feeling, you're not gonna lose the hand -- so you go behind the chest pains and the breathing problems." },
                { speaker: 'male', text: "Dave: Six hours. For a cut." },
                { speaker: 'female', text: "Nurse Tanya: For a cut that can wait. That's the whole job of triage, hon -- I'm not ranking how much it hurts, I'm ranking how fast it'll kill you, and good news, it won't." },
                { speaker: 'female', text: "Renata: He's gonna be unbearable. Just so you know. For all six hours." },
                { speaker: 'male', text: "Dave: I'm sitting right here." },
                { speaker: 'female', text: "Renata: I know. I'm warning her." },
                { speaker: 'female', text: "Nurse Tanya: She's allowed. Okay -- go take a seat, keep that hand up above your heart, fill out the clipboard, and somebody will call your name. Eventually." },
                { speaker: 'male', text: "Dave: Above my heart. Got it. Great. This is gonna be a long night." },
            ],
            japanese: [
                { speaker: 'female', text: "Nurse Tanya: はい、こんばんは、どうぞ入って、座って -- 手を見せて。まだ巻いたの取らないで、ただ -- うん、これどうやってなったの？" },
                { speaker: 'male', text: "Dave: 正直そんなにひどくないんですよ。俺は -- いや、こういうことで、トリム材を切ってて、ノコギリがちょっと... 制御できなくなって。" },
                { speaker: 'female', text: "Renata: 電動ノコギリよ。制御できなくなったの。手袋しろって百回は言ったのに、毎回この人「手袋は素人がするもんだ」って言うのよ。" },
                { speaker: 'female', text: "Nurse Tanya: ふんふん。あのね、ちゃんと見せてもらわないと困るの。「そんなにひどくない」とその色のタオルって、普通セットにならないのよ。" },
                { speaker: 'male', text: "Dave: 20分くらい前に出血止まったんで。だいたい。たぶん。" },
                { speaker: 'female', text: "Nurse Tanya: はい。それで -- これは深いわ、縫合が必要、たぶん5針か6針、でもね、正直に言うわ。これは命に関わるものじゃない。" },
                { speaker: 'male', text: "Dave: ほら、ね、俺もそう言ったでしょ。" },
                { speaker: 'female', text: "Nurse Tanya: つまり -- 聞きたくないのはわかってるけど -- しばらく待つことになる。今夜うちパンク状態なの。土曜だしね。" },
                { speaker: 'female', text: "Renata: 「しばらく」って具体的には？" },
                { speaker: 'female', text: "Nurse Tanya: 正直に？5時間、6時間。もっとかも。指は全部動くし、感覚もある、手を失うこともない -- だから胸痛と呼吸困難の後ろに回るのよ。" },
                { speaker: 'male', text: "Dave: 6時間。切り傷で。" },
                { speaker: 'female', text: "Nurse Tanya: 待てる切り傷でね。それがトリアージの仕事なの、あなた -- どれだけ痛いかで順位つけてるんじゃなくて、どれだけ早く死ぬかで順位つけてるの。で、いい知らせ、あなた死なないわ。" },
                { speaker: 'female', text: "Renata: この人、耐えがたいくらい愚痴るわよ。一応言っとくけど。6時間ずっと。" },
                { speaker: 'male', text: "Dave: 俺ここに座ってるんだけど。" },
                { speaker: 'female', text: "Renata: 知ってる。彼女に警告してるの。" },
                { speaker: 'female', text: "Nurse Tanya: それは構わないわよ。じゃあ -- 席に座って、その手を心臓より高く上げといて、クリップボード記入して、誰かが名前を呼ぶから。そのうちね。" },
                { speaker: 'male', text: "Dave: 心臓より高く。了解。最高。長い夜になりそうだ。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 2 (Jun 05) -- THE LONG WAIT
    // ============================================================
    {
        id: 'er-day2',
        date: '2026-06-05',
        title: 'Day 2: The Long Wait',
        titleJa: 'Day 2: 長い待ち時間',
        content: 'デイブとレナータが待合室で腰を落ち着ける。隣にはウォルター（胸痛と思って来たが胃もたれ）、若いママのデスティニーと熱を出した幼児マテオ、バスケで足首をひねったブロディ。自然と会話が始まる。',
        series: 'er-waiting-room',
        seriesTitle: 'ER Waiting Room',
        tone: 'casual',
        tags: ['hospital', 'er', 'comedy', 'waiting-room', 'strangers'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Walter: You picked a rough night, friend. I have been sitting in this exact chair since -- I want to say eight? My wife dropped me off and went to park, and honestly I think she just went home." },
                { speaker: 'male', text: "Dave: What are you in for, if you don't mind me asking?" },
                { speaker: 'male', text: "Walter: Chest pain. Or -- well. They said it's, um, it's probably not the heart, which is good, obviously, but it's a little embarrassing, because I had a meatball sub at nine and I think it's... that." },
                { speaker: 'female', text: "Renata: Heartburn?" },
                { speaker: 'male', text: "Walter: They haven't said the word, but the nurse smiled in a way that told me everything." },
                { speaker: 'female', text: "Destiny: At least you can sit still. I have been walking this same loop for two hours because the second I sit down he starts screaming, and then everybody looks." },
                { speaker: 'female', text: "Renata: How old is he?" },
                { speaker: 'female', text: "Destiny: Two. He's got a fever, like a hundred and three, and it's our first real ER trip with him, and I -- I don't know, I'm probably overreacting, everybody keeps telling me kids run hot, but a hundred and three is a hundred and three, you know?" },
                { speaker: 'female', text: "Renata: You're not overreacting. A hundred and three with a toddler? You did the right thing coming in." },
                { speaker: 'male', text: "Little Mateo: Mama. Up. Up." },
                { speaker: 'female', text: "Destiny: I know, baby, I know. Mama's got you." },
                { speaker: 'male', text: "Brody: Honestly though? This is kind of nice. Like -- hear me out -- where else are nine random strangers all just stuck together, rooting for each other? It's almost wholesome." },
                { speaker: 'male', text: "Dave: You twisted your ankle playing basketball and you're calling this wholesome." },
                { speaker: 'male', text: "Brody: I rolled it pretty bad, but yeah, I'm choosing to stay positive. The X-ray line is, what, three hours? I've got snacks. I've got a great attitude. We're gonna be fine." },
                { speaker: 'female', text: "Renata: Dave, take notes. That is how you wait." },
                { speaker: 'male', text: "Dave: He's still in his jersey, Renata. He's not a role model. He's a guy who's gonna be limping for a month." },
                { speaker: 'male', text: "Brody: A positive month, though." },
            ],
            japanese: [
                { speaker: 'male', text: "Walter: ひどい夜を選んだね、お兄さん。私はこのまさにこの椅子に -- 8時くらいから？妻が降ろして駐車しに行って、正直もう家に帰ったんじゃないかと思ってる。" },
                { speaker: 'male', text: "Dave: 聞いていいなら、何で来たんですか？" },
                { speaker: 'male', text: "Walter: 胸の痛み。というか -- まあ。たぶん心臓じゃないって言われて、それはもちろんいいことなんだけど、ちょっと恥ずかしくてね。9時にミートボールサブを食べたんだ、で、たぶん... それなんだよ。" },
                { speaker: 'female', text: "Renata: 胃もたれ？" },
                { speaker: 'male', text: "Walter: その言葉は言われてないけど、看護師さんの笑い方で全部わかったよ。" },
                { speaker: 'female', text: "Destiny: 少なくともじっと座れてるじゃない。私はこの同じルートを2時間歩き回ってるの。座った瞬間この子が泣き出して、みんながこっち見るから。" },
                { speaker: 'female', text: "Renata: この子いくつ？" },
                { speaker: 'female', text: "Destiny: 2歳。熱があって、39度くらいあって、この子と来る本格的な救急は初めてで、私 -- わかんない、たぶん大げさなんだろうけど、みんな子供は熱が高いものだって言うけど、でも39度は39度でしょ？" },
                { speaker: 'female', text: "Renata: 大げさじゃないわよ。幼児で39度？連れてきて正解よ。" },
                { speaker: 'male', text: "Little Mateo: ママ。だっこ。だっこ。" },
                { speaker: 'female', text: "Destiny: わかってる、ぼうや、わかってる。ママがいるよ。" },
                { speaker: 'male', text: "Brody: でも正直さ？これ意外といいよね。だって -- 聞いてよ -- 他のどこで赤の他人9人がこうやって一緒に閉じ込められて、お互い応援し合うの？ほぼ心温まる光景じゃん。" },
                { speaker: 'male', text: "Dave: バスケで足首ひねって来たくせに、これを心温まるとか言ってんのか。" },
                { speaker: 'male', text: "Brody: けっこうグキッといったけど、まあうん、前向きでいることにしてる。レントゲンの列は何、3時間？おやつもある。最高の心構えもある。俺たち大丈夫だよ。" },
                { speaker: 'female', text: "Renata: デイブ、メモしなさい。あれが正しい待ち方よ。" },
                { speaker: 'male', text: "Dave: あいつまだユニフォーム着てるぞ、レナータ。手本になる男じゃない。1ヶ月足引きずる男だ。" },
                { speaker: 'male', text: "Brody: でも前向きな1ヶ月ね。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 3 (Jun 06) -- HOUR FOUR
    // ============================================================
    {
        id: 'er-day3',
        date: '2026-06-06',
        title: 'Day 3: Hour Four',
        titleJa: 'Day 3: 4時間目',
        content: '待ち始めて4時間。全員が眠くて少しハイになっている。ウォルターは延々と話し、マテオはようやく寝て、ブロディは奇妙な質問を始める。デイブとレナータの軽口にも妙な温かさが出てくる。',
        series: 'er-waiting-room',
        seriesTitle: 'ER Waiting Room',
        tone: 'playful',
        tags: ['hospital', 'er', 'comedy', 'late-night', 'bonding'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Brody: Okay, hour four. I have a question for the group, and I need everybody to be honest. If you could trade your injury for somebody else's in this room -- would you?" },
                { speaker: 'male', text: "Dave: That is the dumbest question I have ever heard, and yet I have been awake for nineteen hours so I'm gonna answer it. No. I'd keep the hand." },
                { speaker: 'male', text: "Walter: I would take the ankle. No offense, son, but at least an ankle is a real story. 'I hurt myself playing ball.' Mine is 'I ate a sandwich too fast.'" },
                { speaker: 'female', text: "Renata: Walter, you have been telling us about that sandwich for two hours. It has become its own character." },
                { speaker: 'male', text: "Walter: It was a very good sandwich. That's the tragedy of it." },
                { speaker: 'female', text: "Destiny: He's finally asleep. Don't anybody breathe. I'm serious -- I've got maybe ten minutes, and I am going to sit in this chair and stare at a wall and it's going to be the best ten minutes of my week." },
                { speaker: 'female', text: "Renata: We'll keep it down. Go. Stare at your wall." },
                { speaker: 'male', text: "Dave: You know what's funny -- and I'd never say this sober, but it's, what, two in the morning -- I came in here in a terrible mood. Like, genuinely angry. And now I'm kind of... I don't hate this." },
                { speaker: 'female', text: "Renata: Wait. Say that again. Loudly. I want it on the record." },
                { speaker: 'male', text: "Dave: I'm not saying it again. The moment's gone." },
                { speaker: 'male', text: "Brody: See, that's the wholesome thing, that's what I was talking about back at hour two -- nobody's on their phone, everybody's just... here. Together. In the bad fluorescent light." },
                { speaker: 'male', text: "Walter: My wife really did go home, by the way. She texted me a photo of the dog. No words. Just the dog." },
                { speaker: 'female', text: "Renata: Walter, that's either very sad or the most romantic thing I've heard all night, and I genuinely can't tell which." },
                { speaker: 'male', text: "Walter: Forty-five years of marriage. It's both. It's always both." },
                { speaker: 'female', text: "Destiny: Okay, my ten minutes are up, he's stirring -- but, hey, thank you. All of you. For keeping it down. That actually meant a lot." },
                { speaker: 'male', text: "Dave: Anytime. Genuinely. Hour four, we're basically family now." },
                { speaker: 'male', text: "Brody: Told you. Wholesome." },
                { speaker: 'female', text: "Renata: Don't push it, Brody." },
            ],
            japanese: [
                { speaker: 'male', text: "Brody: よし、4時間目。みんなに質問があるんだ、で全員正直に答えてほしい。もし自分のケガをこの部屋の誰かのと交換できるなら -- する？" },
                { speaker: 'male', text: "Dave: それ今まで聞いた中で一番バカな質問だ、でも俺は19時間起きてるから答えてやる。しない。手はキープする。" },
                { speaker: 'male', text: "Walter: 私は足首をもらうね。悪く取らないでくれよ、坊や、でも少なくとも足首はちゃんとした話になる。「ボールで遊んでてケガした」。私のは「サンドイッチを早食いしすぎた」だぞ。" },
                { speaker: 'female', text: "Renata: ウォルター、あなたそのサンドイッチの話を2時間してるわよ。もう独立したキャラクターになってる。" },
                { speaker: 'male', text: "Walter: すごく美味しいサンドイッチだったんだ。そこが悲劇でね。" },
                { speaker: 'female', text: "Destiny: やっと寝た。誰も息しないで。本気よ -- たぶん10分くらいある、で私はこの椅子に座って壁を見つめるの、それが今週で一番いい10分になるの。" },
                { speaker: 'female', text: "Renata: 静かにしとくわ。行って。壁を見つめてきて。" },
                { speaker: 'male', text: "Dave: おかしいよな -- しらふじゃ絶対言わないけど、今何だ、夜中の2時だろ -- 俺ここに最悪の機嫌で来たんだよ。マジで怒ってた。で今はなんか... これ嫌いじゃないんだよな。" },
                { speaker: 'female', text: "Renata: 待って。もう一回言って。大きい声で。記録に残したいの。" },
                { speaker: 'male', text: "Dave: もう言わない。その瞬間は終わった。" },
                { speaker: 'male', text: "Brody: ほら、それが心温まるってことなんだよ、2時間目で言ってたやつ -- 誰もスマホいじってない、みんなただ... ここにいる。一緒に。この最悪な蛍光灯の下で。" },
                { speaker: 'male', text: "Walter: ちなみに妻は本当に家に帰ったよ。犬の写真を送ってきた。文字なし。犬だけ。" },
                { speaker: 'female', text: "Renata: ウォルター、それすごく悲しいか、今夜聞いた中で一番ロマンチックかのどっちかなんだけど、本当にどっちか判断できないわ。" },
                { speaker: 'male', text: "Walter: 結婚45年。両方だよ。いつだって両方なんだ。" },
                { speaker: 'female', text: "Destiny: はい、私の10分が終わった、この子起きかけてる -- でもね、ありがとう。みんな。静かにしてくれて。あれ本当に助かったの。" },
                { speaker: 'male', text: "Dave: いつでも。本気で。4時間目、もう俺たちほぼ家族だな。" },
                { speaker: 'male', text: "Brody: 言っただろ。心温まるって。" },
                { speaker: 'female', text: "Renata: 調子に乗らないで、ブロディ。" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },

    // ============================================================
    // DAY 4 (Jun 07) -- CALLED BACK
    // ============================================================
    {
        id: 'er-day4',
        date: '2026-06-07',
        title: 'Day 4: Called Back',
        titleJa: 'Day 4: 呼ばれる',
        content: 'ついにデイブの名前が呼ばれる。診察室でオセイ医師が傷を診て、麻酔を打ち、手を縫合する。タフガイを演じていたデイブも、針を見て少しずつ本音が漏れる。',
        series: 'er-waiting-room',
        seriesTitle: 'ER Waiting Room',
        tone: 'humorous',
        tags: ['hospital', 'er', 'comedy', 'stitches', 'doctor'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Nurse Tanya: Dave? We're ready for you. Yes -- you, the saw. Come on back, your wife can come too." },
                { speaker: 'male', text: "Dave: Finally. Six hours. I'd like that on a plaque somewhere." },
                { speaker: 'male', text: "Dr Osei: Hi Dave, I'm Dr Osei, let's have a look at this hand -- okay, yeah. Yeah, that's a clean cut, actually, which is good news. A power saw, I'm told?" },
                { speaker: 'male', text: "Dave: It got away from me. I was cutting trim. It's really not a big --" },
                { speaker: 'male', text: "Dr Osei: It's a big enough deal that you needed six stitches, so let's not downplay it -- I see this all the time, and the guys who downplay it are the guys who skip the follow-up and end up back here. Don't be that guy." },
                { speaker: 'female', text: "Renata: Doctor, I love you. Say more things like that." },
                { speaker: 'male', text: "Dr Osei: Okay, I'm going to numb it first. You'll feel a pinch, then a sting, and then honestly nothing -- that's the worst part, right here, the numbing." },
                { speaker: 'male', text: "Dave: A pinch. Okay. I've had worse. I'm fine. I -- okay, that is a big needle. Why is it -- why does it need to be that big?" },
                { speaker: 'male', text: "Dr Osei: It's a normal needle, Dave. Look at your wife, not at me. There you go." },
                { speaker: 'female', text: "Renata: Six hours of telling everyone how tough you are, and you're going pale over the numbing shot." },
                { speaker: 'male', text: "Dave: I'm not pale. The lighting in here is bad. Everybody looks like that." },
                { speaker: 'male', text: "Dr Osei: Alright -- numb yet? Tap your finger. Good. You won't feel the stitching at all now, just a little tugging, some pressure, that's it." },
                { speaker: 'male', text: "Dave: Can I -- am I allowed to watch?" },
                { speaker: 'male', text: "Dr Osei: You can, a lot of people like to. Some people watch one stitch and decide they're done watching. Your call." },
                { speaker: 'male', text: "Dave: ...Yeah, I'm done watching. One was plenty. I'll just -- I'll look at the wall." },
                { speaker: 'female', text: "Renata: There it is. That's the husband I drove here." },
                { speaker: 'male', text: "Dr Osei: Almost done. You did great, honestly -- and for the record, the wall is a very popular choice." },
            ],
            japanese: [
                { speaker: 'female', text: "Nurse Tanya: デイブ？準備できたわよ。そう -- あなた、ノコギリの。奥に来て、奥さんも一緒で大丈夫。" },
                { speaker: 'male', text: "Dave: やっとだ。6時間。どこかにプレートで飾ってほしいくらいだ。" },
                { speaker: 'male', text: "Dr Osei: どうもデイブ、オセイ医師です、この手を見てみましょう -- うん、はい。はい、これは実はきれいな切り傷だ、それはいい知らせです。電動ノコギリって聞いたけど？" },
                { speaker: 'male', text: "Dave: 制御できなくなったんです。トリム材を切ってて。本当に大したことじゃ --" },
                { speaker: 'male', text: "Dr Osei: 6針必要なくらいには大したことですよ、だから軽く見ないように -- こういうのいつも見るんですが、軽く見る人ほど経過観察をすっぽかして、ここに戻ってくる。そういう人にならないで。" },
                { speaker: 'female', text: "Renata: 先生、好きです。もっとそういうこと言ってください。" },
                { speaker: 'male', text: "Dr Osei: では、まず麻酔をします。チクッとして、それからヒリッとして、それから正直何も感じません -- 一番嫌なのはここ、この麻酔のところです。" },
                { speaker: 'male', text: "Dave: チクッと。はい。もっとひどいの経験してます。大丈夫です。俺 -- えっ、それかなり大きい針ですね。なんで -- なんでそんなに大きい必要が？" },
                { speaker: 'male', text: "Dr Osei: 普通の針ですよ、デイブ。私じゃなくて奥さんを見て。そうそう。" },
                { speaker: 'female', text: "Renata: 6時間も自分がどれだけタフか言いまくってて、麻酔の注射で顔が青くなってるじゃない。" },
                { speaker: 'male', text: "Dave: 青くなってない。ここの照明が悪いんだ。みんなこんな顔色になる。" },
                { speaker: 'male', text: "Dr Osei: よし -- もう痺れた？指を叩いてみて。いいですね。もう縫合は全然感じません、ちょっと引っぱる感じと、圧迫感、それだけです。" },
                { speaker: 'male', text: "Dave: 俺 -- 見てもいいですか？" },
                { speaker: 'male', text: "Dr Osei: いいですよ、見たがる人は多いです。1針見て、もう見るのやめると決める人もいます。お好きにどうぞ。" },
                { speaker: 'male', text: "Dave: ...うん、見るのやめます。1針で十分でした。俺は -- 壁を見てます。" },
                { speaker: 'female', text: "Renata: 出た。それが私がここまで運転して連れてきた夫よ。" },
                { speaker: 'male', text: "Dr Osei: もうすぐ終わります。本当によく頑張りましたよ -- ちなみに記録のために言うと、壁はとても人気の選択肢です。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 5 (Jun 08) -- DISCHARGED
    // ============================================================
    {
        id: 'er-day5',
        date: '2026-06-08',
        title: 'Day 5: Discharged',
        titleJa: 'Day 5: 退院',
        content: '日曜の朝。デイブが退院手続き。受付のフィルが延々と保険と書類の質問をする。待合室の仲間たちと別れの挨拶を交わし、最後に請求書を見て一同が固まる。',
        series: 'er-waiting-room',
        seriesTitle: 'ER Waiting Room',
        tone: 'reflective',
        tags: ['hospital', 'er', 'comedy', 'discharge', 'goodbyes'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Phil: Alright. Discharge paperwork. I need a signature here, your initials here, here, and here, and I'm gonna ask you a few questions -- has your insurance information changed since the last visit?" },
                { speaker: 'male', text: "Dave: I've never been here before in my life." },
                { speaker: 'male', text: "Phil: So that would be a no. Has your insurance information changed since the last visit." },
                { speaker: 'female', text: "Renata: I filled all of that out at hour one, Phil. The clipboard. Six hours ago." },
                { speaker: 'male', text: "Phil: I have to ask the questions on the screen in the order the screen gives them to me. Primary care physician's name." },
                { speaker: 'female', text: "Renata: Dave, what's the doctor's name? The regular one?" },
                { speaker: 'male', text: "Dave: I -- uh -- okay, hold on, it's, um -- two seconds -- Dr. ... Dr. Reyes. No. Reynolds. Dr. Reynolds. I think." },
                { speaker: 'male', text: "Phil: I'll put down Reynolds. Wound care instructions -- keep it clean and dry, no heavy lifting for two weeks, get the stitches out in ten days." },
                { speaker: 'female', text: "Nurse Tanya: Hey -- the saw guy, you're heading out? Good. You survived your six hours. Listen to Phil's boring instructions, they're the ones that keep you from coming back." },
                { speaker: 'male', text: "Dave: Tanya, no offense, but I hope I never see you again." },
                { speaker: 'female', text: "Nurse Tanya: Honey, that's the nicest thing a patient has ever said to me. Truly. Now wear the gloves." },
                { speaker: 'male', text: "Brody: Dave! They cleared me, just a bad sprain, no break -- told you we'd be fine. Hour two, I called it. Wholesome ending." },
                { speaker: 'female', text: "Destiny: Mateo's fever broke about an hour ago, they're discharging us too. Thank you guys -- I came in here scared out of my mind and you all just... made it okay." },
                { speaker: 'male', text: "Walter: It was heartburn. For the record. Six hours, and it was the sandwich. My wife is outside. She brought the dog." },
                { speaker: 'male', text: "Dave: ...Honestly, you people made a six-hour wait not the worst night of my life. I don't know what to do with that." },
                { speaker: 'male', text: "Phil: And here's your itemized bill. The stitches, the room, the supplies." },
                { speaker: 'male', text: "Dave: ...I'm sorry. How much? For six stitches and a wall to look at?" },
                { speaker: 'female', text: "Renata: Next time, Dave. Wear. The. Gloves." },
            ],
            japanese: [
                { speaker: 'male', text: "Phil: では。退院書類です。ここに署名、ここにイニシャル、ここ、ここ、それからいくつか質問します -- 前回受診から保険情報に変更はありましたか？" },
                { speaker: 'male', text: "Dave: 俺、生まれてこのかたここ来たことないんですけど。" },
                { speaker: 'male', text: "Phil: ではそれは「いいえ」ですね。前回受診から保険情報に変更はありましたか。" },
                { speaker: 'female', text: "Renata: それ全部1時間目に記入したわよ、フィル。あのクリップボード。6時間前。" },
                { speaker: 'male', text: "Phil: 画面の質問を、画面が出してくる順番で聞かないといけないんです。かかりつけ医の名前。" },
                { speaker: 'female', text: "Renata: デイブ、お医者さんの名前なんだっけ？いつものほう。" },
                { speaker: 'male', text: "Dave: 俺 -- えっと -- ちょっと待って、それは、うーん -- 2秒くれ -- レ... レイエス先生。違う。レイノルズ。レイノルズ先生。たぶん。" },
                { speaker: 'male', text: "Phil: レイノルズと記入しておきます。傷のケアの指示 -- 清潔に乾いた状態を保つ、2週間は重いものを持たない、10日後に抜糸。" },
                { speaker: 'female', text: "Nurse Tanya: ねえ -- ノコギリの人、帰るところ？よかった。6時間を生き延びたわね。フィルの退屈な指示をちゃんと聞いて、あれが戻ってこないためのものなのよ。" },
                { speaker: 'male', text: "Dave: ターニャ、悪く取らないでほしいけど、もう二度と会いたくないです。" },
                { speaker: 'female', text: "Nurse Tanya: あなた、患者に言われた中で一番嬉しい言葉よ。本当に。じゃあ手袋しなさいね。" },
                { speaker: 'male', text: "Brody: デイブ！俺OK出たよ、ひどい捻挫だけ、骨折なし -- 大丈夫って言っただろ。2時間目に言い当てた。心温まる結末。" },
                { speaker: 'female', text: "Destiny: マテオの熱、1時間くらい前に下がって、私たちも退院です。みんなありがとう -- 私、怖くて気が変になりそうで来たのに、みんなが... 大丈夫にしてくれた。" },
                { speaker: 'male', text: "Walter: 胃もたれだったよ。記録のために言うと。6時間、で、サンドイッチだった。妻が外にいる。犬を連れてきた。" },
                { speaker: 'male', text: "Dave: ...正直、あんたたちのおかげで6時間待ちが人生最悪の夜にならなかった。これをどう受け止めればいいかわからないよ。" },
                { speaker: 'male', text: "Phil: そしてこちらが明細付きの請求書です。縫合、診察室、備品。" },
                { speaker: 'male', text: "Dave: ...すみません。いくらですって？6針と眺める壁で？" },
                { speaker: 'female', text: "Renata: 次こそはね、デイブ。手袋を。しなさい。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },
];
