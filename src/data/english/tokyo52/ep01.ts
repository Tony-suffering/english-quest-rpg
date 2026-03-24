/**
 * Tokyo 52 -- Episode 1: "ここから始まる" (It Starts Here)
 * Setting: Shibuya cafe -> back alley -> izakaya "Noren"
 *
 * Characters:
 *   Yuki (27F) - trading company sales, TOEIC 620, frustrated
 *   Aya (24F) - returnee, Yuki's junior colleague
 *   Rina (22F) - cafe barista, dreams of coffee farms abroad
 *   Foreign Customer (male) - tourist ordering coffee
 *   Master Gondo (78M) - izakaya owner, former English teacher, TOEIC 990x12
 *
 * 2 Memoria conversations for Day 2 and Day 3
 */

export interface Tokyo52Entry {
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

const generatedAt = new Date('2026-03-22T00:00:00.000Z');

export const tokyo52Ep01Entries: Tokyo52Entry[] = [
    // ============================================================
    // DAY 2 -- THE CAFE (Scene 2)
    // ============================================================
    {
        id: 'tokyo52-ep01-day2',
        date: '2026-04-02',
        title: 'Day 2: The Cafe',
        titleJa: 'Day 2: カフェ',
        content: '渋谷のカフェ。クライアントとの会議でフリーズしたユキ。外国人観光客の注文をリナが完璧にさばく。ユキ、打ちのめされる。',
        series: 'tokyo52-spring',
        seriesTitle: 'Tokyo 52 -- 春・出会い',
        tone: 'casual',
        tags: ['tokyo52', 'spring', 'cafe', 'greetings', 'self-introduction'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Yuki: I can't believe I just... sat there." },
                { speaker: 'female', text: "Aya: Hey, it's -- look, it happens to everyone, OK? Don't beat yourself up." },
                { speaker: 'female', text: "Yuki: No, Aya, you don't -- I literally could not get a single word out. He was asking me about the delivery schedule and I just... nothing. My brain went completely blank." },
                { speaker: 'female', text: "Aya: I mean, the client didn't even seem bothered though. I jumped in and --" },
                { speaker: 'female', text: "Yuki: That's the PROBLEM. You jumped in because I couldn't do my own job." },
                { speaker: 'female', text: "Aya: That's not -- I was just trying to help, that's all." },
                { speaker: 'female', text: "Yuki: I know. I know you were. I'm sorry, I'm not -- I'm not mad at you. I'm mad at me." },
                { speaker: 'female', text: "Aya: ...You wanna get coffee? There's a place right here." },
                { speaker: 'female', text: "Yuki: Yeah. Yeah, fine. Whatever." },
                { speaker: 'female', text: "Rina: Hi! Welcome! What can I get for you guys today?" },
                { speaker: 'female', text: "Yuki: Um, just a -- an iced latte, please." },
                { speaker: 'female', text: "Aya: Same for me. Thanks!" },
                { speaker: 'female', text: "Rina: Two iced lattes, coming right up!" },
                { speaker: 'male', text: "Foreign Customer: Excuse me, hi -- uh, do you have, like, a menu? I'm not really sure what to get." },
                { speaker: 'female', text: "Rina: Oh, of course! So right here we've got our regular drip coffee, and then -- um, if you're more of a latte person, we do oat milk, almond, whatever you like. And then the seasonal one is this hojicha latte, which is, like, roasted green tea? Super popular. People go crazy for it." },
                { speaker: 'male', text: "Foreign Customer: Oh, that sounds amazing. Yeah, I'll -- I'll try that. The hojicha one." },
                { speaker: 'female', text: "Rina: Great choice! Hot or iced?" },
                { speaker: 'male', text: "Foreign Customer: Iced, please." },
                { speaker: 'female', text: "Rina: You got it! That'll be 550 yen. Oh, and -- are you visiting? First time in Tokyo?" },
                { speaker: 'male', text: "Foreign Customer: Yeah! Actually just got here yesterday. Still kinda jet-lagged, honestly, so the coffee is, uh, very necessary right now." },
                { speaker: 'female', text: "Rina: Ha! I bet. Well, welcome to Tokyo! If you need any recommendations for, like, food or sightseeing or whatever, I'm happy to help." },
                { speaker: 'male', text: "Foreign Customer: Oh, that's so nice of you. Thank you so much!" },
                { speaker: 'female', text: "Rina: No problem at all! Here's your hojicha latte. Enjoy!" },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'female', text: "Aya: ...You OK?" },
                { speaker: 'female', text: "Yuki: She's -- she's a barista. A college-age barista. And she just had an entire conversation in English like it was nothing. Like it was just... normal. And I'm sitting here with my TOEIC 620 and I can't even tell a client when his shipment's arriving." },
                { speaker: 'female', text: "Aya: Yuki, TOEIC and speaking are totally different things. You know that, right? Like, they're not even -- it's not the same skill." },
                { speaker: 'female', text: "Yuki: Then what's the point? What was the POINT of all that studying if I can't even -- I mean, I spent two years on that stupid test. Two years. And for what?" },
                { speaker: 'female', text: "Aya: OK but the thing is, you have the foundation. You've got all the grammar and the vocab already in your head, and it's just -- it's the output part, you know? That's a completely different muscle." },
                { speaker: 'female', text: "Yuki: A muscle I apparently don't have." },
                { speaker: 'female', text: "Aya: You DO have it. You're just -- you haven't trained it yet. That's all." },
            ],
            japanese: [
                { speaker: 'female', text: "Yuki: 信じらんない...ただ座ってただけだなんて。" },
                { speaker: 'female', text: "Aya: ねえ、あの -- 誰にでもあることだから、OK？そんなに自分を責めないで。" },
                { speaker: 'female', text: "Yuki: 違うの、アヤ、あのね -- 本当に一言も出なかったの。納期のこと聞かれて、もう...何も。頭が真っ白になった。" },
                { speaker: 'female', text: "Aya: でもクライアント別に気にしてなかったよ。私がフォローに入って --" },
                { speaker: 'female', text: "Yuki: それが問題なの。私が自分の仕事できないから、あなたがフォローしたんでしょ。" },
                { speaker: 'female', text: "Aya: そうじゃなくて -- ただ助けたかっただけだよ。" },
                { speaker: 'female', text: "Yuki: わかってる。わかってるよ。ごめん、あなたに怒ってるんじゃないの。自分に怒ってるの。" },
                { speaker: 'female', text: "Aya: ...コーヒー飲まない？すぐそこにお店あるよ。" },
                { speaker: 'female', text: "Yuki: うん。うん、いいよ。なんでも。" },
                { speaker: 'female', text: "Rina: こんにちは！いらっしゃいませ！今日は何にしますか？" },
                { speaker: 'female', text: "Yuki: えっと、あの -- アイスラテをお願いします。" },
                { speaker: 'female', text: "Aya: 私も同じで。ありがとう！" },
                { speaker: 'female', text: "Rina: アイスラテ2つ、すぐお作りしますね！" },
                { speaker: 'male', text: "Foreign Customer: すみません、あの -- メニューってありますか？何がいいかよくわからなくて。" },
                { speaker: 'female', text: "Rina: もちろん！こちらが普通のドリップコーヒーで、あと -- ラテ派なら、オーツミルクとかアーモンドとか、お好みで。で、季節限定がこのほうじ茶ラテ。焙煎した緑茶なんですけど、すごく人気なんですよ。みんなハマってます。" },
                { speaker: 'male', text: "Foreign Customer: あ、それすごくおいしそう。じゃあ、それにします。ほうじ茶の。" },
                { speaker: 'female', text: "Rina: いい選択！ホットとアイスどっちがいいですか？" },
                { speaker: 'male', text: "Foreign Customer: アイスで。" },
                { speaker: 'female', text: "Rina: かしこまりました！550円になります。あ、それと -- 旅行ですか？東京は初めて？" },
                { speaker: 'male', text: "Foreign Customer: そうなんです！実は昨日着いたばっかりで。まだ時差ボケがひどくて、正直コーヒーが今すごく必要で。" },
                { speaker: 'female', text: "Rina: あはは！でしょうね。東京へようこそ！ご飯とか観光とか、おすすめ知りたかったらいつでも聞いてくださいね。" },
                { speaker: 'male', text: "Foreign Customer: わあ、親切にありがとうございます！" },
                { speaker: 'female', text: "Rina: とんでもない！はい、ほうじ茶ラテどうぞ。楽しんでくださいね！" },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'female', text: "Aya: ...大丈夫？" },
                { speaker: 'female', text: "Yuki: あの子 -- バリスタだよ。大学生のバリスタ。それなのに英語でまるっと会話してた、何でもないことみたいに。普通のことみたいに。で、私はTOEIC 620持ってて、クライアントに荷物いつ届くかすら言えない。" },
                { speaker: 'female', text: "Aya: ユキ、TOEICと会話は全然別物だよ。わかるでしょ？同じスキルですらないの。" },
                { speaker: 'female', text: "Yuki: じゃあ何のためだったの？あんなに勉強して何の意味があったの -- 2年よ。2年もあのテストに費やして。何のために？" },
                { speaker: 'female', text: "Aya: でもね、土台はあるんだよ。文法も単語も全部頭に入ってるの、ただ -- アウトプットの部分だけなの。それは全然違う筋肉なんだよ。" },
                { speaker: 'female', text: "Yuki: 私にはないらしいけどね、その筋肉。" },
                { speaker: 'female', text: "Aya: あるよ。ただ -- まだ鍛えてないだけ。それだけ。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 3 -- FINDING NOREN
    // ============================================================
    {
        id: 'tokyo52-ep01-day3',
        date: '2026-04-03',
        title: 'Day 3: Finding Noren',
        titleJa: 'Day 3: のれんとの出会い',
        content: '新宿の裏路地。帰り道でユキが古い居酒屋を見つける。暖簾をくぐると、そこにはマスター権藤がいた。',
        series: 'tokyo52-spring',
        seriesTitle: 'Tokyo 52 -- 春・出会い',
        tone: 'casual',
        tags: ['tokyo52', 'spring', 'izakaya', 'greetings', 'self-introduction'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Yuki: (to herself) Why am I even -- I should just go home. It's late and I'm tired and I don't wanna cook and I don't wanna think about English and I just..." },
                { speaker: 'female', text: "Yuki: ...Huh. What is this place?" },
                { speaker: 'female', text: "Yuki: I've walked this street like a hundred times and I never -- is this new? No, it looks... old. Really old." },
                { speaker: 'female', text: "Yuki: Whatever. I'll just -- one drink. One drink and then home." },
                { speaker: 'male', text: "Master Gondo: Irasshaimase." },
                { speaker: 'female', text: "Yuki: Oh -- hi. Um, is it OK if I -- can I sit at the counter?" },
                { speaker: 'male', text: "Master Gondo: Anywhere you like." },
                { speaker: 'female', text: "Yuki: Thanks. Um, can I get a beer? Just a -- a regular draft, please." },
                { speaker: 'male', text: "Master Gondo: One beer." },
                { speaker: 'female', text: "Yuki: This place is really nice. It's so quiet. I mean, compared to everything outside, it's like -- I dunno, like a completely different world in here." },
                { speaker: 'male', text: "Master Gondo: Mm. Walls are thick." },
                { speaker: 'female', text: "Yuki: Ha. Yeah, I guess that helps." },
                { speaker: 'male', text: "Master Gondo: Here. Your beer." },
                { speaker: 'female', text: "Yuki: Thank you. ...This is my first time here. I'm Yuki, by the way." },
                { speaker: 'male', text: "Master Gondo: Gondo. Been here forty-three years." },
                { speaker: 'female', text: "Yuki: Forty-three -- wow. That's, um, that's longer than I've been alive. By a lot." },
                { speaker: 'male', text: "Master Gondo: You look like you've had a long day." },
                { speaker: 'female', text: "Yuki: Is it that obvious? Yeah, I -- it was kind of a disaster, actually. Work stuff. I had this meeting with a foreign client and I just... completely froze. Couldn't say anything in English. Not a single word." },
                { speaker: 'male', text: "Master Gondo: Hmm." },
                { speaker: 'female', text: "Yuki: I've been studying for years though, that's the thing. I passed TOEIC with a 620 and I thought -- I thought that meant something, you know? But when it mattered, when I actually needed to speak, it was just... gone. All of it." },
                { speaker: 'male', text: "Master Gondo: 620." },
                { speaker: 'female', text: "Yuki: Yeah. Not great, I know." },
                { speaker: 'male', text: "Master Gondo: I took that test twelve times. Got 990 each time. Perfect score, every time." },
                { speaker: 'female', text: "Yuki: Wait -- twelve times? 990? You're kidding me. You -- I'm sorry, what?" },
                { speaker: 'male', text: "Master Gondo: But that's not why I can speak English." },
                { speaker: 'female', text: "Yuki: ...What do you mean?" },
            ],
            japanese: [
                { speaker: 'female', text: "Yuki: (独り言) なんで私 -- もう帰ろ。遅いし疲れたし料理したくないし英語のことも考えたくないし、もう..." },
                { speaker: 'female', text: "Yuki: ...あれ。ここ何だろう？" },
                { speaker: 'female', text: "Yuki: この道何百回も歩いてるのに -- 新しいお店？いや、見た目は...古い。すごく古い。" },
                { speaker: 'female', text: "Yuki: まあいいか。一杯だけ。一杯飲んだら帰ろう。" },
                { speaker: 'male', text: "Master Gondo: いらっしゃいませ。" },
                { speaker: 'female', text: "Yuki: あ -- こんばんは。あの、カウンターに座っても大丈夫ですか？" },
                { speaker: 'male', text: "Master Gondo: どこでもお好きなところへ。" },
                { speaker: 'female', text: "Yuki: ありがとうございます。えっと、ビールもらえますか？普通の -- 生ビールで。" },
                { speaker: 'male', text: "Master Gondo: ビール一つ。" },
                { speaker: 'female', text: "Yuki: ここ、すごくいいですね。静か。外と比べると、なんか -- なんだろう、全然違う世界みたい。" },
                { speaker: 'male', text: "Master Gondo: ん。壁が厚いからね。" },
                { speaker: 'female', text: "Yuki: あはは。たしかに、それはありますね。" },
                { speaker: 'male', text: "Master Gondo: はい。ビール。" },
                { speaker: 'female', text: "Yuki: ありがとうございます。...ここ初めてなんです。あ、ユキです。" },
                { speaker: 'male', text: "Master Gondo: 権藤。ここで43年やってる。" },
                { speaker: 'female', text: "Yuki: 43年 -- すごい。それ私が生まれるよりだいぶ前ですね。" },
                { speaker: 'male', text: "Master Gondo: 大変な一日だったみたいだね。" },
                { speaker: 'female', text: "Yuki: そんなにわかります？はい、実は -- ちょっと最悪でした。仕事で。外国人のクライアントとの会議で完全にフリーズして。英語が何も出なかったんです。一言も。" },
                { speaker: 'male', text: "Master Gondo: ふうん。" },
                { speaker: 'female', text: "Yuki: 何年も勉強してきたんですけどね。TOEICも620取って、それで -- 何か意味があると思ってたんです。でもいざ必要な時に、実際に話さなきゃいけない時に...消えたんです。全部。" },
                { speaker: 'male', text: "Master Gondo: 620か。" },
                { speaker: 'female', text: "Yuki: はい。大したことないのはわかってます。" },
                { speaker: 'male', text: "Master Gondo: 私はあの試験を12回受けた。毎回990点。満点を、毎回。" },
                { speaker: 'female', text: "Yuki: え -- 12回？990？嘘でしょ。あの -- すみません、今なんて？" },
                { speaker: 'male', text: "Master Gondo: でも、それは英語が話せる理由じゃない。" },
                { speaker: 'female', text: "Yuki: ...どういう意味ですか？" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
    // ============================================================
    // DAY 5 -- RETURN TO NOREN
    // ============================================================
    {
        id: 'tokyo52-ep01-day5',
        date: '2026-04-05',
        title: 'Day 5: Return to Noren',
        titleJa: 'Day 5: のれんに戻る',
        content: '翌日の夜、ユキはのれんに戻った。権藤がひとつだけ質問する。答えられないユキ。',
        series: 'tokyo52-spring',
        seriesTitle: 'Tokyo 52 -- 春・出会い',
        tone: 'casual',
        tags: ['tokyo52', 'spring', 'izakaya', 'motivation', 'purpose'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Yuki: ...Hi." },
                { speaker: 'male', text: "Master Gondo: You came back." },
                { speaker: 'female', text: "Yuki: Yeah. I -- yeah. Is that OK?" },
                { speaker: 'male', text: "Master Gondo: Beer?" },
                { speaker: 'female', text: "Yuki: Please." },
                { speaker: 'male', text: "Master Gondo: ..." },
                { speaker: 'female', text: "Yuki: So, um, about what you said yesterday. The TOEIC thing. How it's not why you can speak English." },
                { speaker: 'male', text: "Master Gondo: Mm." },
                { speaker: 'female', text: "Yuki: I've been thinking about it all day. At work, on the train, during lunch -- I couldn't stop thinking about it. What did you mean?" },
                { speaker: 'male', text: "Master Gondo: Let me ask you something first." },
                { speaker: 'female', text: "Yuki: OK..." },
                { speaker: 'male', text: "Master Gondo: Why do you want to speak English?" },
                { speaker: 'female', text: "Yuki: Why? I mean -- because... because I need it for work. The clients are foreign and I have to -- I need to be able to communicate, you know? It's part of my job." },
                { speaker: 'male', text: "Master Gondo: That's not a reason. That's an obligation." },
                { speaker: 'female', text: "Yuki: ...What's the difference?" },
                { speaker: 'male', text: "Master Gondo: The difference is everything." },
                { speaker: 'female', text: "Yuki: I don't -- I mean, isn't that enough? Needing it for work?" },
                { speaker: 'male', text: "Master Gondo: I taught English for thirty years. Every student who learned it for obligation quit. Every single one." },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'male', text: "Master Gondo: Come back when you have a real answer." },
                { speaker: 'female', text: "Yuki: That's -- you can't just -- I came all the way here and you're telling me to leave?" },
                { speaker: 'male', text: "Master Gondo: I'm not telling you to leave. I'm telling you to think. Finish your beer. Take your time." },
                { speaker: 'female', text: "Yuki: ...You're kind of a weird old man, you know that?" },
                { speaker: 'male', text: "Master Gondo: So I've been told." },
            ],
            japanese: [
                { speaker: 'female', text: "Yuki: ...こんばんは。" },
                { speaker: 'male', text: "Master Gondo: 来たか。" },
                { speaker: 'female', text: "Yuki: はい。あの -- はい。大丈夫ですか？" },
                { speaker: 'male', text: "Master Gondo: ビール？" },
                { speaker: 'female', text: "Yuki: お願いします。" },
                { speaker: 'male', text: "Master Gondo: ..." },
                { speaker: 'female', text: "Yuki: あの、昨日おっしゃってたこと。TOEICのこと。それが英語を話せる理由じゃないって。" },
                { speaker: 'male', text: "Master Gondo: うん。" },
                { speaker: 'female', text: "Yuki: 今日ずっと考えてたんです。仕事中も、電車でも、お昼の時も -- ずっと頭から離れなくて。どういう意味だったんですか？" },
                { speaker: 'male', text: "Master Gondo: 先にひとつ聞いていいか。" },
                { speaker: 'female', text: "Yuki: はい..." },
                { speaker: 'male', text: "Master Gondo: なぜ英語を話したい？" },
                { speaker: 'female', text: "Yuki: なぜって -- だって...仕事で必要だからです。クライアントが外国人で、コミュニケーション取らないと -- 仕事の一部なので。" },
                { speaker: 'male', text: "Master Gondo: それは理由じゃない。義務だ。" },
                { speaker: 'female', text: "Yuki: ...何が違うんですか？" },
                { speaker: 'male', text: "Master Gondo: 全部違う。" },
                { speaker: 'female', text: "Yuki: でも -- 仕事で必要っていうだけじゃダメなんですか？" },
                { speaker: 'male', text: "Master Gondo: 30年英語を教えた。義務で学んだ生徒は全員やめた。一人残らず。" },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'male', text: "Master Gondo: 本当の答えが見つかったら、また来なさい。" },
                { speaker: 'female', text: "Yuki: それって -- ちょっと、わざわざ来たのに帰れって言うんですか？" },
                { speaker: 'male', text: "Master Gondo: 帰れとは言ってない。考えろと言ってる。ビールは飲んでいきなさい。ゆっくりでいい。" },
                { speaker: 'female', text: "Yuki: ...変なおじいさんですね。" },
                { speaker: 'male', text: "Master Gondo: よく言われる。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 6 -- THE CONVENIENCE STORE
    // ============================================================
    {
        id: 'tokyo52-ep01-day6',
        date: '2026-04-06',
        title: 'Day 6: The Convenience Store',
        titleJa: 'Day 6: コンビニ',
        content: '帰り道、コンビニで外国人が困ってる。ユキが初めて見知らぬ人に英語で話しかける。',
        series: 'tokyo52-spring',
        seriesTitle: 'Tokyo 52 -- 春・出会い',
        tone: 'casual',
        tags: ['tokyo52', 'spring', 'convenience-store', 'first-step', 'directions'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Tourist: Um... excuse me? Sorry, do you -- do you speak English?" },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'female', text: "Yuki: (internal) Say something. Say something. Just one word. Any word." },
                { speaker: 'female', text: "Yuki: ...Yes. A little." },
                { speaker: 'male', text: "Tourist: Oh, great! Thank god. OK so I'm trying to find -- uh, I'm looking for Shinjuku Station? I've been walking around for like twenty minutes and I keep ending up at the same 7-Eleven, which -- I mean, the onigiri's great but I really need to catch my train." },
                { speaker: 'female', text: "Yuki: Shinjuku Station. Um... it's -- you go straight. That way. And then... turn left at the... the big crossing." },
                { speaker: 'male', text: "Tourist: Straight and then left at the big crossing. OK, OK." },
                { speaker: 'female', text: "Yuki: Yes. And then you can see it. The station. Maybe... five minutes?" },
                { speaker: 'male', text: "Tourist: Five minutes? That's it? Oh man, I was going the completely wrong direction. Thank you so much! You saved me." },
                { speaker: 'female', text: "Yuki: No problem." },
                { speaker: 'male', text: "Tourist: Your English is great, by the way!" },
                { speaker: 'female', text: "Yuki: ...Thank you." },
            ],
            japanese: [
                { speaker: 'male', text: "Tourist: あの...すみません？英語、話せますか？" },
                { speaker: 'female', text: "Yuki: ..." },
                { speaker: 'female', text: "Yuki: (心の中) 何か言え。何か言え。一言でいい。何でもいい。" },
                { speaker: 'female', text: "Yuki: ...はい。少しだけ。" },
                { speaker: 'male', text: "Tourist: あ、よかった！助かった。えっと、新宿駅を探してるんですけど -- もう20分くらい歩いてて、同じセブンイレブンにたどり着くんですよね。おにぎりはおいしいんですけど、電車に乗らないと。" },
                { speaker: 'female', text: "Yuki: 新宿駅。えっと...まっすぐ行って。あっちに。で、大きい交差点を...左です。" },
                { speaker: 'male', text: "Tourist: まっすぐ行って大きい交差点を左。OK、OK。" },
                { speaker: 'female', text: "Yuki: はい。そうすると駅が見えます。たぶん...5分くらい？" },
                { speaker: 'male', text: "Tourist: 5分？それだけ？うわ、完全に逆方向行ってた。本当にありがとう！助かりました。" },
                { speaker: 'female', text: "Yuki: いえ。" },
                { speaker: 'male', text: "Tourist: ちなみに英語上手ですね！" },
                { speaker: 'female', text: "Yuki: ...ありがとうございます。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
];

// ============================================================
// EPISODE 1 PROLOGUE
// ============================================================

// ============================================================
// EPISODE 1 SCRIPT -- The Drama Experience
// ============================================================

export type ScriptSection =
    | { type: 'cold-open'; ja: string; en: string }
    | { type: 'scene-header'; title: string; location: string }
    | { type: 'narrative'; ja: string; en: string }
    | { type: 'memoria'; entryIndex: number; label: string }
    | { type: 'transition'; ja: string; en: string }
    | { type: 'cliffhanger'; ja: string; en: string }
    | { type: 'next-episode'; num: number; title: string; tease: string };

export const TOKYO52_EP01_SCRIPT: ScriptSection[] = [
    // -- COLD OPEN --
    {
        type: 'cold-open',
        ja: '渋谷。午後6時。\n\n雨がやんだばかりのセンター街。アスファルトにネオンが滲んでる。\n\n人波。信号。クラクション。東京のいつもの夕方。\n\nでも、ユキにとってこの日は違った。',
        en: 'Shibuya. 6 PM.\n\nCenter-gai, right after the rain stopped. Neon bleeding into wet asphalt.\n\nCrowds. Traffic lights. Car horns. Just another Tokyo evening.\n\nBut for Yuki, this day was different.',
    },

    // -- SCENE 1: THE MEETING --
    { type: 'scene-header', title: 'SCENE 1', location: '品川 -- 会議室、2時間前' },
    {
        type: 'narrative',
        ja: '2時間前。品川の商社ビル、12階。ガラス張りの会議室。\n\nクライアントはオーストラリアから来た調達部長。名前はマーク。笑顔が広い。\n\n彼が英語で質問した。納期の確認。簡単な質問。\n\nユキは答えを知ってた。\n3月15日。データもある。資料も準備した。\n\nでも口が開かなかった。\n\n3秒。5秒。8秒。\n\n隣に座っていた後輩のアヤが、何事もなかったように英語で答えた。\n流暢に。完璧に。笑顔で。\n\nマークは満足そうにうなずいた。\n\nユキは議事録を取るふりをして、下を向いた。',
        en: 'Two hours ago. A trading company in Shinagawa, 12th floor. Glass-walled meeting room.\n\nThe client was a procurement manager from Australia. Mark. Big smile.\n\nHe asked a question in English. Delivery date confirmation. Easy question.\n\nYuki knew the answer.\nMarch 15th. She had the data. She\'d prepared the slides.\n\nBut her mouth wouldn\'t open.\n\n3 seconds. 5 seconds. 8 seconds.\n\nAya, her junior colleague sitting next to her, answered in English as if nothing had happened.\nFluently. Perfectly. With a smile.\n\nMark nodded, satisfied.\n\nYuki pretended to take notes and looked down.',
    },

    // -- SCENE 2: THE CAFE --
    { type: 'scene-header', title: 'SCENE 2', location: '渋谷 -- カフェ' },
    {
        type: 'narrative',
        ja: 'カフェの窓際。アイスラテの氷が溶けていく。\n\nユキは自分のグラスを見つめてる。茶色い液体がどんどん薄くなる。\n\nさっきの会議で起きたことと同じだ。自分の中の何かが薄まって、消えていく。',
        en: 'A window seat at the cafe. Ice melting in an iced latte.\n\nYuki stares at her glass. The brown liquid getting lighter and lighter.\n\nJust like what happened at that meeting. Something inside her, fading away.',
    },

    // -- MEMORIA: THE CAFE CONVERSATION --
    { type: 'memoria', entryIndex: 0, label: 'ユキとアヤ、リナ -- カフェにて' },

    // -- TRANSITION --
    {
        type: 'transition',
        ja: 'アヤが先に帰った。\n\nユキはカウンターに一人残ってる。\n\nリナがテーブルを拭きながら鼻歌を歌ってる。英語の歌。発音が完璧。\n\n22歳。大学生。バリスタ。\n\nユキは財布を出して、立ち上がった。\n\n駅に向かうつもりだった。でも、なぜか反対方向に歩き出した。',
        en: 'Aya left first.\n\nYuki sits alone at the counter.\n\nRina wipes down a table, humming a song. In English. Perfect pronunciation.\n\n22 years old. College student. Barista.\n\nYuki pulls out her wallet and stands up.\n\nShe meant to head for the station. But somehow, she started walking the other way.',
    },

    // -- SCENE 3: THE ALLEY --
    { type: 'scene-header', title: 'SCENE 3', location: '新宿 -- 裏路地' },
    {
        type: 'narrative',
        ja: '雑居ビルの隙間。配管が露出してる壁。自販機の青い光。\n\nこんな道、通ったことない。いや、通ってたのかもしれない。見えてなかっただけで。\n\n古い暖簾が揺れてた。\n\n「のれん」。\n\n木の引き戸。中からカウンターの明かりが漏れてる。\n\n一杯だけ。一杯飲んだら帰ろう。',
        en: 'A gap between buildings. Exposed pipes on the wall. Blue light from a vending machine.\n\nShe\'d never walked this street before. Or maybe she had. Just never noticed.\n\nAn old noren curtain swayed in the breeze.\n\n"Noren."\n\nA wooden sliding door. Warm light leaking from inside.\n\nOne drink. One drink and then home.',
    },

    // -- MEMORIA: FINDING NOREN --
    { type: 'memoria', entryIndex: 1, label: 'ユキとマスター権藤 -- のれん' },

    // -- CLIFFHANGER --
    {
        type: 'cliffhanger',
        ja: '権藤が背を向けた。棚からグラスを取り出して、磨き始める。\n\nユキはビールのグラスを握ったまま動けない。\n\nTOEIC 990点を12回。\n\nでもそれは英語が話せる理由じゃない。\n\nじゃあ、何が理由なんだ。\n\nこの老人は、何を知ってるんだ。',
        en: 'Gondo turned away. Pulled a glass from the shelf and started polishing it.\n\nYuki sat frozen, gripping her beer.\n\nTOEIC 990. Twelve times.\n\nBut that\'s not why he can speak English.\n\nThen what is?\n\nWhat does this old man know?',
    },

    // ============================================================
    // DAY 4 -- THE MORNING AFTER
    // ============================================================

    { type: 'scene-header', title: 'DAY 4', location: '品川 -- 商社オフィス、翌朝' },
    {
        type: 'narrative',
        ja: '翌朝。品川。いつものオフィス。\n\nユキは自分のデスクで英語のメールを開いてる。マークからのフォローアップ。\n\n"Hi Yuki, thanks for yesterday\'s meeting. Could you confirm the delivery date?"\n\n昨日は言えなかった答え。3月15日。\n\nユキはキーボードに手を置いた。\n\n"Dear Mark, Thank you for your email. The delivery date is March 15th."\n\nこれだけ。たったこれだけ。\n\nでも書けた。\n\n送信ボタンを押す。指が震えてた。\n\n隣のデスクでアヤが電話してる。英語。流暢。いつも通り。\n\nユキはイヤホンをつけた。何も聴いてない。ただ、聞きたくなかっただけ。',
        en: 'Next morning. Shinagawa. The usual office.\n\nYuki opens an English email at her desk. A follow-up from Mark.\n\n"Hi Yuki, thanks for yesterday\'s meeting. Could you confirm the delivery date?"\n\nThe answer she couldn\'t say yesterday. March 15th.\n\nShe places her hands on the keyboard.\n\n"Dear Mark, Thank you for your email. The delivery date is March 15th."\n\nThat\'s it. That\'s all it was.\n\nBut she wrote it.\n\nShe hits send. Her finger was shaking.\n\nAya\'s on the phone at the next desk. English. Fluent. Same as always.\n\nYuki puts in her earbuds. Not listening to anything. She just didn\'t want to hear.',
    },
    {
        type: 'narrative',
        ja: '昼休み。ビルの1階のカフェ。\n\nユキはカウンターに立ってる。いつもは日本語で注文する。\n\nでも今日は違うことを試してみたくなった。\n\n"Can I get an iced latte, please?"\n\n店員は日本人だ。英語で返す必要はない。\n\nでもユキは英語で言った。\n\n店員が一瞬きょとんとして、それからにっこり笑った。\n\n"Sure! Iced latte, coming right up."\n\n小さい。すごく小さいこと。\n\nでもユキの口は動いた。\n\n昨日カフェで聴いた、リナの言葉がそのまま出てきた。',
        en: 'Lunch break. The cafe on the ground floor of the building.\n\nYuki stands at the counter. She usually orders in Japanese.\n\nBut today she wanted to try something different.\n\n"Can I get an iced latte, please?"\n\nThe barista is Japanese. No need to respond in English.\n\nBut Yuki said it in English.\n\nThe barista blinked, then smiled.\n\n"Sure! Iced latte, coming right up."\n\nSmall. Such a small thing.\n\nBut Yuki\'s mouth moved.\n\nThe words came out -- Rina\'s exact words from yesterday\'s cafe.',
    },

    // ============================================================
    // DAY 5 -- RETURN TO NOREN
    // ============================================================

    { type: 'scene-header', title: 'DAY 5', location: '新宿 -- のれん、夜' },
    {
        type: 'narrative',
        ja: 'ユキは迷わずにのれんを見つけた。\n\n昨日はたまたま迷い込んだ。今日は自分の足で来た。\n\nこの違いは大きい。',
        en: 'Yuki found Noren without getting lost.\n\nYesterday she stumbled in by accident. Today she walked here on her own.\n\nThat difference matters.',
    },
    { type: 'memoria', entryIndex: 2, label: 'ユキとマスター権藤 -- のれん、2日目' },
    {
        type: 'narrative',
        ja: '権藤の質問が刺さってる。\n\nなぜ英語を話したいのか。\n\n仕事で必要だから。それしか出てこなかった。\n\nでも帰り道、ユキは考えてた。\n\nリナは仕事で英語を使ってたんじゃない。楽しそうだった。外国人と話すのが純粋に楽しそうだった。\n\nあの感じ。あれが理由になり得るのか。\n\n「楽しいから」が理由になる世界があるのか。',
        en: 'Gondo\'s question stuck.\n\nWhy do you want to speak English?\n\nBecause I need it for work. That was all she could come up with.\n\nBut on the way home, Yuki kept thinking.\n\nRina wasn\'t using English for work. She was enjoying it. Genuinely enjoying talking to a stranger in another language.\n\nThat feeling. Could that be a reason?\n\nIs there a world where "because it\'s fun" is a good enough answer?',
    },

    // ============================================================
    // DAY 6 -- THE FIRST STEP
    // ============================================================

    { type: 'scene-header', title: 'DAY 6', location: '新宿 -- コンビニ前' },
    {
        type: 'narrative',
        ja: '土曜日。買い物帰り。\n\nコンビニの前で、外国人がスマホの地図とにらめっこしてる。\n\n完全に迷ってる。\n\nユキは通り過ぎようとした。\n\nいつもならそうする。目を逸らして、早足で通り過ぎる。英語で話しかけられたら困る。だから最初から近づかない。\n\nでも今日は足が止まった。\n\n権藤の声が聞こえた気がした。「義務で学んだ生徒は全員やめた」\n\nこれは義務じゃない。\n誰にも頼まれてない。\n自分の足が止まっただけ。',
        en: 'Saturday. On the way home from shopping.\n\nA foreigner staring at his phone map in front of a convenience store.\n\nCompletely lost.\n\nYuki almost walked past.\n\nShe always does. Look away, walk faster. If someone speaks English to me, I\'m in trouble. So don\'t get close in the first place.\n\nBut today, her feet stopped.\n\nShe thought she heard Gondo\'s voice. "Every student who learned it for obligation quit."\n\nThis isn\'t obligation.\nNobody asked her to do this.\nHer feet just stopped on their own.',
    },
    { type: 'memoria', entryIndex: 3, label: 'ユキと迷子の旅行者 -- コンビニ前' },
    {
        type: 'narrative',
        ja: '旅行者が去っていった。手を振りながら。\n\nユキはコンビニの前に立ったまま動けない。\n\n心臓がバクバクしてる。手が震えてる。\n\nでも。\n\n通じた。\n\n完璧じゃない。文法もめちゃくちゃだったと思う。\n\nでも、通じた。\n\nストレートに行って、大きい交差点を左。5分。\n\nたったそれだけ。\n\nでもそれは、ユキが自分の口で、自分の意思で、見知らぬ人間に英語で伝えた最初の言葉だった。\n\n"Your English is great, by the way!"\n\nそんなわけない。\n\nでもユキは笑った。コンビニの前で一人で笑った。',
        en: 'The tourist walked away. Waving.\n\nYuki stood frozen in front of the convenience store.\n\nHeart pounding. Hands shaking.\n\nBut.\n\nHe understood.\n\nIt wasn\'t perfect. Grammar was probably a mess.\n\nBut he understood.\n\nGo straight, turn left at the big crossing. Five minutes.\n\nThat\'s all it was.\n\nBut those were the first words Yuki ever spoke in English to a stranger, by choice, of her own free will.\n\n"Your English is great, by the way!"\n\nNo it isn\'t.\n\nBut Yuki laughed. Standing alone in front of a convenience store, she laughed.',
    },

    // ============================================================
    // DAY 7 -- EPILOGUE: ONE WEEK
    // ============================================================

    { type: 'scene-header', title: 'DAY 7', location: '自宅 -- 日曜日の朝' },
    {
        type: 'narrative',
        ja: '日曜日。\n\nユキはベッドの中でスマホを見てる。\n\n1週間前の自分を思い出す。\n\n月曜日、会議で固まった。\n火曜日、カフェで打ちのめされた。\n水曜日、裏路地で変な居酒屋を見つけた。\n木曜日、英語でメールを1本書いた。ランチでアイスラテを英語で頼んだ。\n金曜日、のれんに戻った。権藤に「なぜ」を聞かれて答えられなかった。\n土曜日、コンビニの前で道案内をした。初めて、自分から。\n\nたった1週間。\n\n何も変わってないように見える。TOEICのスコアは620のまま。会議でフリーズする恐怖は消えてない。\n\nでも何かが違う。\n\nユキはスマホを閉じた。\n\n日曜日の朝日が窓から入ってくる。\n\nまだ答えは出てない。「なぜ英語を話したいのか」。\n\nでもひとつだけわかった。\n\nコンビニの前で笑ったあの瞬間。通じたあの瞬間。\n\nあれは義務じゃなかった。',
        en: 'Sunday.\n\nYuki lies in bed, staring at her phone.\n\nShe thinks about who she was a week ago.\n\nMonday: froze in a meeting.\nTuesday: got destroyed at a cafe.\nWednesday: found a strange izakaya in a back alley.\nThursday: wrote one email in English. Ordered an iced latte in English at lunch.\nFriday: went back to Noren. Couldn\'t answer Gondo\'s question.\nSaturday: gave directions in front of a convenience store. For the first time, by choice.\n\nJust one week.\n\nNothing seems different. TOEIC score is still 620. The fear of freezing in a meeting hasn\'t gone away.\n\nBut something is different.\n\nYuki closes her phone.\n\nSunday morning sunlight coming through the window.\n\nShe still doesn\'t have an answer. "Why do you want to speak English?"\n\nBut she knows one thing now.\n\nThat moment in front of the convenience store. When she laughed. When her words reached someone.\n\nThat wasn\'t obligation.',
    },

    // -- CLIFFHANGER --
    {
        type: 'cliffhanger',
        ja: '月曜日の朝。\n\nユキはオフィスに入る。自分のデスクに向かう。\n\nアヤの隣に、見知らぬ女が座ってた。\n\nスーツ。姿勢がいい。外資コンサルの空気。\n\nアヤが振り返る。\n\n「あ、先輩。今日から隣のチームに新しい人が」\n\n女がユキを見た。\n\n「リサです。よろしくお願いします」\n\n完璧な日本語。完璧な微笑み。\n\nその30分後、リサは会議室で英語のプレゼンを始めた。\n\n帰国子女。外資コンサル出身。TOEIC 860。\n\nユキは、また下を向いた。',
        en: 'Monday morning.\n\nYuki walks into the office. Heads to her desk.\n\nA woman she\'d never seen before was sitting next to Aya.\n\nSuit. Perfect posture. The air of a foreign consulting firm.\n\nAya turns around.\n\n"Oh, senpai. We have a new person joining the next team over today."\n\nThe woman looked at Yuki.\n\n"I\'m Lisa. Nice to meet you."\n\nPerfect Japanese. Perfect smile.\n\nThirty minutes later, Lisa started an English presentation in the conference room.\n\nReturnee. Ex-foreign consulting. TOEIC 860.\n\nYuki looked down again.',
    },

    // -- NEXT EPISODE --
    {
        type: 'next-episode',
        num: 2,
        title: '隣の席の帰国子女',
        tease: '完璧に見えるリサ。でもTOEIC模試のPart5で3問ミスしてパニックになる。完璧の鎧の下に何があるのか。そしてユキは権藤の問いへの答えを見つけ始める。',
    },
];

export const TOKYO52_EP01_PROLOGUE = '渋谷のカフェで、ユキは自分の無力さを思い知る。TOEIC620点。2年間の勉強。それでも、目の前の外国人に一言も返せなかった。帰り道、新宿の裏路地で見つけた古い居酒屋「のれん」。カウンターの向こうに立つ老人は、TOEIC満点を12回取った伝説の元英語教師だった。「でも、それは英語が話せる理由じゃない」。ユキの52週間が、ここから始まる。';

export const TOKYO52_EP01_PROLOGUE_EN = 'At a Shibuya cafe, Yuki confronts her own helplessness. TOEIC 620. Two years of studying. And still, she couldn\'t say a single word to the foreigner standing right in front of her. On the way home, she stumbles upon an old izakaya called "Noren" tucked in a Shinjuku back alley. The old man behind the counter scored perfect on the TOEIC twelve times -- a legendary former English teacher. "But that\'s not why I can speak English." Yuki\'s 52 weeks start here.';

// ============================================================
// A1 VOCABULARY
// ============================================================

export const TOKYO52_EP01_VOCAB: Array<{
    word: string;
    meaning: string;
    example: string;
    exampleJa: string;
}> = [
    {
        word: 'welcome',
        meaning: 'ようこそ、いらっしゃいませ',
        example: 'Hi! Welcome! What can I get for you?',
        exampleJa: 'いらっしゃいませ！何にしますか？',
    },
    {
        word: 'order',
        meaning: '注文（する）',
        example: 'I\'d like to order an iced latte, please.',
        exampleJa: 'アイスラテを注文したいんですが。',
    },
    {
        word: 'menu',
        meaning: 'メニュー',
        example: 'Do you have a menu?',
        exampleJa: 'メニューはありますか？',
    },
    {
        word: 'frustrated',
        meaning: 'イライラした、もどかしい',
        example: 'I\'m so frustrated with myself right now.',
        exampleJa: '今すごく自分にイライラしてる。',
    },
    {
        word: 'nervous',
        meaning: '緊張している',
        example: 'I was too nervous to say anything.',
        exampleJa: '緊張しすぎて何も言えなかった。',
    },
    {
        word: 'first time',
        meaning: '初めて',
        example: 'This is my first time here.',
        exampleJa: 'ここに来るのは初めてです。',
    },
    {
        word: 'tired',
        meaning: '疲れた',
        example: 'It\'s late and I\'m tired.',
        exampleJa: '遅いし、疲れた。',
    },
    {
        word: 'quiet',
        meaning: '静かな',
        example: 'This place is really quiet.',
        exampleJa: 'ここ、すごく静かですね。',
    },
    {
        word: 'nice',
        meaning: 'いい、素敵な、親切な',
        example: 'Oh, that\'s so nice of you.',
        exampleJa: 'わあ、親切にありがとう。',
    },
    {
        word: 'please',
        meaning: 'お願いします',
        example: 'Can I get a beer, please?',
        exampleJa: 'ビールをお願いします。',
    },
];

// ============================================================
// USEFUL EXPRESSIONS
// ============================================================

export const TOKYO52_EP01_EXPRESSIONS: Array<{
    expression: string;
    meaningJa: string;
    context: string;
    example: string;
}> = [
    {
        expression: 'What can I get for you?',
        meaningJa: '何にしますか？',
        context: 'Cafe or restaurant staff greeting a customer. Friendly and common.',
        example: 'Hi! Welcome! What can I get for you guys today?',
    },
    {
        expression: 'Don\'t beat yourself up.',
        meaningJa: 'そんなに自分を責めないで。',
        context: 'Comforting someone who is being too hard on themselves after a mistake.',
        example: 'It happens to everyone, OK? Don\'t beat yourself up.',
    },
    {
        expression: 'My brain went blank.',
        meaningJa: '頭が真っ白になった。',
        context: 'Describing the moment when you freeze and cannot think of anything to say.',
        example: 'He asked me a question and my brain went completely blank.',
    },
    {
        expression: 'I\'ll have...',
        meaningJa: '...にします。',
        context: 'The most natural way to order food or drinks. Casual and confident.',
        example: 'I\'ll have the hojicha latte, iced please.',
    },
    {
        expression: 'You got it!',
        meaningJa: 'かしこまりました！/ 了解！',
        context: 'Cheerful confirmation from staff. More casual than "certainly" or "of course."',
        example: 'Iced? You got it! That\'ll be 550 yen.',
    },
    {
        expression: 'Is it OK if I...?',
        meaningJa: '...しても大丈夫ですか？',
        context: 'Polite way to ask permission. Works in almost any situation.',
        example: 'Is it OK if I sit at the counter?',
    },
    {
        expression: 'Anywhere you like.',
        meaningJa: 'どこでもお好きなところに。',
        context: 'Welcoming someone to choose freely. Relaxed and hospitable.',
        example: 'Where should I sit? -- Anywhere you like.',
    },
    {
        expression: 'By the way...',
        meaningJa: 'ちなみに / そういえば',
        context: 'Adding extra information or introducing yourself naturally mid-conversation.',
        example: 'I\'m Yuki, by the way.',
    },
    {
        expression: 'It\'s not the same thing.',
        meaningJa: 'それは別物だよ。',
        context: 'Pointing out that two things people confuse are actually different.',
        example: 'TOEIC and speaking are totally different things. It\'s not the same skill.',
    },
    {
        expression: 'What do you mean?',
        meaningJa: 'どういう意味ですか？',
        context: 'Asking someone to explain something confusing or unexpected they just said.',
        example: 'That\'s not why I can speak English. -- What do you mean?',
    },
];
