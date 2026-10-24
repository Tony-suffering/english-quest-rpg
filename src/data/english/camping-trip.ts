/**
 * The Camping Trip -- 5-episode conversation series for Memoria
 * A family of four plus Uncle Dale go on a five-day camping trip that goes
 * progressively wrong: a tent that won't stand, no cell signal, a midnight storm,
 * a bear in the cooler -- and somehow, by the end, nobody wants to leave.
 * 6 characters: Hank (46M dad, over-prepared gear obsessive), Sandra (44F mom, just
 *   wants the trip to be peaceful), Logan (15M, phone-addicted teen), Ruby (9F,
 *   fearless youngest), Ranger Dawn (38F park ranger), Uncle Dale (50M, ghost-story
 *   uncle who packed mostly snacks)
 * The 5 "days" are 5 actual days of the camping trip.
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, false starts, outdoorsy chaos and family bickering.
 * Format: ~16-18 lines per day per language.
 */

export interface CampingTripEntry {
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

const generatedAt = new Date('2026-06-19T12:00:00.000Z');

export const campingTripEntries: CampingTripEntry[] = [
    // ============================================================
    // DAY 1 (Jun 19) -- SETTING UP CAMP
    // ============================================================
    {
        id: 'camping-day1',
        date: '2026-06-19',
        title: 'Day 1: Setting Up Camp',
        titleJa: 'Day 1: 設営',
        content: 'ハンク一家とデイルおじさんがキャンプ場に到着。ハンクは高機能テントの組み立てに苦戦し、ローガンは圏外にショックを受ける。ルビーだけが大はしゃぎ。レンジャーのドーンが注意事項を伝えに来る。',
        series: 'camping-trip',
        seriesTitle: 'The Camping Trip',
        tone: 'humorous',
        tags: ['camping', 'family', 'comedy', 'outdoors', 'setup'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Hank: Okay, family, gather round. This is a four-season, eight-pole, color-coded tent. I watched the assembly video four times. We will have this up in fifteen minutes, tops." },
                { speaker: 'male', text: "Logan: Dad. Dad. There is no signal. Zero bars. How am I supposed to survive five days with zero bars?" },
                { speaker: 'female', text: "Sandra: That's sort of the point of camping, sweetheart. We came out here to unplug." },
                { speaker: 'male', text: "Logan: Nobody asked to be unplugged. I was unplugged against my will." },
                { speaker: 'female', text: "Ruby: I LOVE it here. There's a beetle on that rock and I named him Gerald. Can Gerald sleep in the tent?" },
                { speaker: 'male', text: "Hank: Gerald sleeps outside, honey. Okay -- which pole is B? They're all the same length. Why are they color-coded if they're all the same length?" },
                { speaker: 'male', text: "Uncle Dale: You want my honest opinion, Hank? Put the bag down. Walk away. Let the tent humble you, then come back stronger." },
                { speaker: 'male', text: "Hank: That's not advice, Dale. That's a fortune cookie. Did you bring anything useful, or just the cooler?" },
                { speaker: 'male', text: "Uncle Dale: I brought four bags of marshmallows, two flashlights, and a deck of cards. That's everything a man needs. I packed for fun. You packed for war." },
                { speaker: 'female', text: "Ranger Dawn: Afternoon, folks. Just doing my rounds. Couple of quick things -- store all your food in the bear box, not the tent. We've had a black bear hanging around site nine." },
                { speaker: 'male', text: "Logan: A bear? There's a bear? And no signal? So if a bear eats me, nobody will even know?" },
                { speaker: 'female', text: "Ranger Dawn: The bear is far more interested in your hot dogs than in you, I promise. Just be smart with the food and you'll never see him." },
                { speaker: 'female', text: "Ruby: Can I see the bear? I want to see the bear. I'll be quiet. Gerald and I will both be quiet." },
                { speaker: 'female', text: "Ranger Dawn: Let's hope you don't, kiddo. Oh -- and there's weather coming in tomorrow night. Stake that tent down good. You folks have a great one." },
                { speaker: 'male', text: "Hank: Staked down good. Got it. I'll stake it down so good. ...Once I figure out which pole is B." },
                { speaker: 'female', text: "Sandra: It's day one, and we already have a bear, a storm, and a beetle named Gerald. This is going to be a trip." },
            ],
            japanese: [
                { speaker: 'male', text: "Hank: よし家族、集まって。これは四シーズン対応、8本ポール、色分けされたテントだ。組み立て動画を4回見た。15分、長くても15分で立てる。" },
                { speaker: 'male', text: "Logan: 父さん。父さん。電波ない。ゼロ本。どうやって5日間ゼロ本で生き延びろっていうの？" },
                { speaker: 'female', text: "Sandra: それがキャンプの意味なのよ、あなた。デジタルから離れるためにここに来たの。" },
                { speaker: 'male', text: "Logan: 誰も離れたいなんて頼んでない。意思に反して離されたんだ。" },
                { speaker: 'female', text: "Ruby: ここ大好き！あの岩にカブトムシがいて、ジェラルドって名付けた。ジェラルド、テントで寝ていい？" },
                { speaker: 'male', text: "Hank: ジェラルドは外で寝るんだ、ルビー。よし -- どれがBのポールだ？全部同じ長さじゃないか。全部同じ長さなのに、なんで色分けしてるんだ？" },
                { speaker: 'male', text: "Uncle Dale: 正直な意見が欲しいか、ハンク？袋を置け。立ち去れ。テントに打ちのめされてから、強くなって戻ってこい。" },
                { speaker: 'male', text: "Hank: それアドバイスじゃないぞ、デイル。おみくじだ。何か役立つもの持ってきたのか、それともクーラーボックスだけか？" },
                { speaker: 'male', text: "Uncle Dale: マシュマロ4袋、懐中電灯2本、トランプ1組持ってきた。男に必要なのはそれで全部だ。俺は楽しむために荷造りした。お前は戦争のために荷造りした。" },
                { speaker: 'female', text: "Ranger Dawn: こんにちは、皆さん。見回りの途中で。手短にいくつか -- 食料は全部テントじゃなくてベアボックスに入れて。9番サイトのあたりにツキノワグマがうろついてるので。" },
                { speaker: 'male', text: "Logan: クマ？クマがいるの？で電波もない？じゃあクマに食べられても、誰も気づかないってこと？" },
                { speaker: 'female', text: "Ranger Dawn: クマはあなたよりホットドッグにずっと興味があるわ、保証する。食料さえ賢く扱えば、姿を見ることもないから。" },
                { speaker: 'female', text: "Ruby: クマ見ていい？クマ見たい。静かにするから。ジェラルドと私、二人とも静かにするから。" },
                { speaker: 'female', text: "Ranger Dawn: 見ないことを祈りましょう、お嬢ちゃん。あ -- それと明日の夜は天気が崩れるわ。テントはしっかりペグで固定して。皆さん、よい滞在を。" },
                { speaker: 'male', text: "Hank: しっかり固定。了解。めちゃくちゃしっかり固定するぞ。...どれがBのポールか分かったらな。" },
                { speaker: 'female', text: "Sandra: まだ1日目なのに、もうクマと、嵐と、ジェラルドってカブトムシがいる。これはとんでもない旅になるわね。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 2 (Jun 20) -- THE HIKE
    // ============================================================
    {
        id: 'camping-day2',
        date: '2026-06-20',
        title: 'Day 2: The Hike',
        titleJa: 'Day 2: ハイキング',
        content: '一家は滝までのハイキングに挑戦。ローガンは終始だるそうだが、頂上の景色にしぶしぶ感動する。ルビーは先頭をぐんぐん進み、デイルは早々にバテる。ドーンが道で追いつき、明日の嵐をあらためて警告する。',
        series: 'camping-trip',
        seriesTitle: 'The Camping Trip',
        tone: 'casual',
        tags: ['camping', 'family', 'comedy', 'hiking', 'nature'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Hank: Okay, the trail to the falls is two and a half miles. Moderate difficulty. Everybody's got water? Sunscreen? Logan, are you wearing flip-flops on a mountain trail?" },
                { speaker: 'male', text: "Logan: They're slides, Dad, and they're all I brought. Nobody told me hiking meant, like, actual hiking." },
                { speaker: 'female', text: "Ruby: I'll go first! I'm the fastest! Try and keep up, slowpokes! Gerald says hi from my pocket!" },
                { speaker: 'female', text: "Sandra: Ruby, stay where we can see you. And let Gerald breathe, honey, he's a beetle, not a snack." },
                { speaker: 'male', text: "Uncle Dale: How far did you say this was again? Because my body is telling me we've gone six miles and my watch is telling me we've gone... point four." },
                { speaker: 'male', text: "Hank: We've been walking for eight minutes, Dale. Eight. You packed marshmallows but not, apparently, a single working leg." },
                { speaker: 'male', text: "Uncle Dale: I'm a sprinter, not a marathon guy. I peak in short bursts. This is a long, cruel burst." },
                { speaker: 'female', text: "Ranger Dawn: Morning, family. You're making good time. Falls are gorgeous today after the dry spell -- but listen, I meant what I said about tonight. That storm's no joke. Be back at camp well before dark." },
                { speaker: 'male', text: "Logan: ...Okay, that view is actually kind of insane. I'm not gonna lie. Can I take a picture? Oh, right. No signal. What's the point of a view I can't post." },
                { speaker: 'female', text: "Sandra: The point is that you saw it, Logan. You. With your own eyes. Nobody else needs to." },
                { speaker: 'male', text: "Logan: ...That's so corny. But also, fine. It's a good view. I'll allow it." },
                { speaker: 'female', text: "Ruby: I climbed the WHOLE thing first! I beat everybody! Even the ranger! Did you see me, did you see me?" },
                { speaker: 'female', text: "Ranger Dawn: I saw you, speed demon. You've got real trail legs. Maybe slow down on the wet rocks near the edge, though, okay?" },
                { speaker: 'male', text: "Uncle Dale: I have made it to the top. Plant a flag. Tell my story. I would like to go back down in a wheelbarrow." },
                { speaker: 'male', text: "Hank: There's no wheelbarrow, Dale. You walk back the same as everybody. This is the most beautiful place I've ever heard a grown man complain in." },
                { speaker: 'female', text: "Sandra: Look at us. Whole family on a mountain, nobody on a phone. I'd call this a win, storm or no storm." },
            ],
            japanese: [
                { speaker: 'male', text: "Hank: よし、滝までのトレイルは2.5マイル。難易度は中。みんな水持った？日焼け止めは？ローガン、お前、山のトレイルでビーチサンダル履いてるのか？" },
                { speaker: 'male', text: "Logan: スライドサンダルだよ父さん、で持ってきたのこれだけ。ハイキングが「ガチのハイキング」だなんて誰も言わなかったし。" },
                { speaker: 'female', text: "Ruby: 私が先頭！一番速いもん！ついてこられる、のろま組？ジェラルドがポケットからこんにちはって！" },
                { speaker: 'female', text: "Sandra: ルビー、見える範囲にいなさい。それとジェラルドを息させてあげて、その子カブトムシよ、おやつじゃないの。" },
                { speaker: 'male', text: "Uncle Dale: これ、距離どのくらいって言ったっけ？俺の体は6マイル来たって言ってるのに、時計は... 0.4マイルって言ってるんだ。" },
                { speaker: 'male', text: "Hank: 歩き始めて8分だぞ、デイル。8分。マシュマロは荷造りしたのに、どうやら動く足は1本も荷造りしなかったらしいな。" },
                { speaker: 'male', text: "Uncle Dale: 俺は短距離型だ、マラソン型じゃない。短い爆発でピークが来る。これは長くて残酷な爆発だ。" },
                { speaker: 'female', text: "Ranger Dawn: おはよう、ご家族。いいペースね。滝は乾燥続きの後で今日は絶景よ -- でも聞いて、今夜の件は本気で言ったの。あの嵐は冗談じゃない。暗くなるずっと前にキャンプに戻ってね。" },
                { speaker: 'male', text: "Logan: ...いや、あの景色マジでちょっとヤバいわ。嘘つかない。写真撮っていい？あ、そっか。電波ない。投稿できない景色に何の意味があんだよ。" },
                { speaker: 'female', text: "Sandra: 意味はね、あなたが見たってことよ、ローガン。あなたが。自分の目で。他の誰も見る必要はないの。" },
                { speaker: 'male', text: "Logan: ...くっさいセリフ。でも、まあ、いいや。いい景色だ。認めてやる。" },
                { speaker: 'female', text: "Ruby: 私が全部いちばん最初に登った！みんなに勝った！レンジャーさんにも！見てた、見てた？" },
                { speaker: 'female', text: "Ranger Dawn: 見てたよ、スピード魔。本物のトレイル脚を持ってるね。でも端っこの濡れた岩ではちょっと速度を落とそうか、ね？" },
                { speaker: 'male', text: "Uncle Dale: 俺は頂上にたどり着いた。旗を立てろ。俺の物語を語り継げ。下りは手押し車で帰りたい。" },
                { speaker: 'male', text: "Hank: 手押し車なんてないぞ、デイル。みんなと同じく歩いて帰るんだ。いい大人が文句を言うのを聞いた中で、ここは一番美しい場所だよ。" },
                { speaker: 'female', text: "Sandra: 見てよ私たち。家族そろって山の上、誰もスマホいじってない。これは勝ちと呼ぶわ、嵐があろうとなかろうと。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 3 (Jun 21) -- THE STORM
    // ============================================================
    {
        id: 'camping-day3',
        date: '2026-06-21',
        title: 'Day 3: The Storm',
        titleJa: 'Day 3: 嵐',
        content: '深夜、警告通りの嵐が直撃。テントに水が浸入し、家族全員が叩き起こされる。ハンクの完璧なはずの設営が試される。暗闇とパニックの中、なぜか一家の結束が深まっていく。',
        series: 'camping-trip',
        seriesTitle: 'The Camping Trip',
        tone: 'playful',
        tags: ['camping', 'family', 'comedy', 'storm', 'midnight'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Sandra: Hank. Hank, wake up. I felt a drop. I felt a drop on my face, inside the tent, which is the one place drops are not supposed to be." },
                { speaker: 'male', text: "Hank: It's fine. It's the four-season tent. It's rated for this. The seams are sealed, the rainfly is -- okay, that is a lot of water. That's water coming UP. Why is it coming up." },
                { speaker: 'female', text: "Ruby: It's a river! There's a river in the tent! This is the best night of my entire life! Gerald can finally swim!" },
                { speaker: 'male', text: "Logan: My sleeping bag is soaked. My ONE dry thing. Dad, I told you we should've checked the weather app -- oh, wait, NO SIGNAL, so we couldn't, could we." },
                { speaker: 'male', text: "Hank: Everybody grab a corner. We are not losing this tent. Dale -- Dale, are you seriously still asleep through this? Dale!" },
                { speaker: 'male', text: "Uncle Dale: I'm awake, I'm awake. I'm just choosing to experience it horizontally. What do you need? I have marshmallows if morale is low." },
                { speaker: 'female', text: "Sandra: Morale is underwater, Dale, literally. Grab the flashlight and hold it up so Hank can see the pole." },
                { speaker: 'male', text: "Hank: If I can just get this corner re-staked -- the ground's too soft, the stake won't -- Logan, sit on the cooler so it doesn't float away, I am not chasing our food into the woods at 3 AM." },
                { speaker: 'male', text: "Logan: I'm sitting on the cooler. I'm soaking wet, sitting on a cooler, in the dark, in a storm. This is the lowest moment of my life and I'm weirdly kind of laughing." },
                { speaker: 'female', text: "Ruby: We should sing! When things are scary you sing! Dad, what do we sing? Uncle Dale, you know all the gross songs!" },
                { speaker: 'male', text: "Uncle Dale: I do know all the gross songs. Okay, everybody, follow me, it's a classic -- and if you don't know the words, just hum and look confident." },
                { speaker: 'female', text: "Sandra: I cannot believe we're singing in a flooding tent at three in the morning. And I cannot believe I'm doing it too." },
                { speaker: 'male', text: "Hank: Got it. Corner's re-staked. Rainfly's tight. We're not gonna drown tonight, gang. We held the line. The tent held. WE held." },
                { speaker: 'female', text: "Ruby: Does this mean we get to do it again tomorrow?" },
                { speaker: 'male', text: "Logan: God, I hope not. ...But if we did, I'd be on cooler duty. I've got the hang of it now." },
                { speaker: 'female', text: "Sandra: Soaked, exhausted, three in the morning -- and this is somehow the closest this family has felt in a year." },
            ],
            japanese: [
                { speaker: 'female', text: "Sandra: ハンク。ハンク、起きて。しずく感じた。顔にしずくが落ちたの、テントの中で、しずくが絶対にあっちゃいけない唯一の場所で。" },
                { speaker: 'male', text: "Hank: 大丈夫だ。四シーズンテントだぞ。これに耐える仕様だ。縫い目は防水処理済み、レインフライは -- おい、これかなりの水量だ。水が下から来てる。なんで下から来るんだ。" },
                { speaker: 'female', text: "Ruby: 川だ！テントの中に川がある！人生で最高の夜！ジェラルドがやっと泳げる！" },
                { speaker: 'male', text: "Logan: 寝袋びしょ濡れ。唯一の乾いてた物が。父さん、天気アプリ確認すべきだって言ったのに -- あ、待って、電波ない、だから確認できなかったよね。" },
                { speaker: 'male', text: "Hank: 全員、角をつかめ。このテントは絶対に失わない。デイル -- デイル、お前まさかこの中でまだ寝てるのか？デイル！" },
                { speaker: 'male', text: "Uncle Dale: 起きてる、起きてる。ただ横になったまま体感することを選んでるだけだ。何が要る？士気が低いならマシュマロあるぞ。" },
                { speaker: 'female', text: "Sandra: 士気は水没してるわよ、デイル、文字通り。懐中電灯を取って、ハンクがポールを見えるように上に掲げて。" },
                { speaker: 'male', text: "Hank: この角だけ打ち直せれば -- 地面が柔らかすぎてペグが刺さら -- ローガン、クーラーボックスが流れないように上に座れ、午前3時に食料を森まで追いかけるのはごめんだ。" },
                { speaker: 'male', text: "Logan: クーラーボックスに座ってる。びしょ濡れで、クーラーに座って、暗闇の中、嵐の中。人生のどん底なのに、なぜかちょっと笑ってる。" },
                { speaker: 'female', text: "Ruby: 歌おうよ！怖いときは歌うんだよ！父さん、何歌う？デイルおじさん、汚い歌全部知ってるでしょ！" },
                { speaker: 'male', text: "Uncle Dale: 汚い歌は全部知ってるとも。よし、みんな、俺についてこい、定番のやつだ -- 歌詞が分からなくても、ハミングして自信ありげにしてりゃいい。" },
                { speaker: 'female', text: "Sandra: 午前3時に浸水したテントで歌ってるなんて信じられない。で、自分もやってるなんて信じられない。" },
                { speaker: 'male', text: "Hank: できた。角を打ち直した。レインフライもピンと張った。今夜は溺れないぞ、みんな。俺たちは守り抜いた。テントが持ちこたえた。俺たちが持ちこたえたんだ。" },
                { speaker: 'female', text: "Ruby: ってことは明日もまたやれるってこと？" },
                { speaker: 'male', text: "Logan: 頼むからやめてくれ。...でも、もしやるなら、俺がクーラー担当だな。もうコツつかんだし。" },
                { speaker: 'female', text: "Sandra: びしょ濡れ、へとへと、午前3時 -- なのにこれが、この一年で家族が一番近づいた瞬間なんてね。" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },

    // ============================================================
    // DAY 4 (Jun 22) -- THE BEAR
    // ============================================================
    {
        id: 'camping-day4',
        date: '2026-06-22',
        title: 'Day 4: The Bear',
        titleJa: 'Day 4: クマ',
        content: '朝、ついに警告のクマがクーラーボックスを物色しに現れる。デイルが食料をテントに隠していたことが発覚。レンジャーのドーンが駆けつけ、家族はクマ対応の洗礼を受ける。夜はデイルの怪談で締めくくる。',
        series: 'camping-trip',
        seriesTitle: 'The Camping Trip',
        tone: 'humorous',
        tags: ['camping', 'family', 'comedy', 'bear', 'wildlife'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Ruby: GUYS. Guys. Be quiet. Be SO quiet. The bear is here. The bear came. He's by the cooler and he is MAGNIFICENT." },
                { speaker: 'male', text: "Hank: Okay, nobody panics, nobody runs. Sandra, get Ruby behind you. We make ourselves big and we back away slowly. Why is the cooler open. Who left the cooler open?" },
                { speaker: 'male', text: "Uncle Dale: ...Okay, so, in my defense, I got hungry around midnight, and I may have brought a few snacks into the tent. And by a few I mean most of them." },
                { speaker: 'male', text: "Hank: Dale. The ranger said it ONE time. One rule. Food in the bear box. You smuggled trail mix into a tent in bear country." },
                { speaker: 'male', text: "Logan: He's eating the marshmallows. All four bags. Uncle Dale, he's eating your entire personality." },
                { speaker: 'female', text: "Ranger Dawn: Step back to the picnic table, nice and calm, all of you -- hey there, big guy, those aren't yours. Go on. Go on now. ...There he goes. He'll wander off once the easy food's gone." },
                { speaker: 'female', text: "Sandra: That was terrifying and Ruby is somehow trying to wave goodbye to it." },
                { speaker: 'female', text: "Ruby: Bye, bear! Come back never, the ranger says! But you were so cool!" },
                { speaker: 'female', text: "Ranger Dawn: Folks, this is exactly what I warned you about on day one. He's not a bad bear, he's a hungry bear who learned this site is easy pickings. Lock it up from now on. Every crumb." },
                { speaker: 'male', text: "Uncle Dale: This one's on me. I own it. I let a bear eat the marshmallows. That's a sentence I will carry for the rest of my days." },
                { speaker: 'male', text: "Hank: You'll carry it because I will remind you of it. Every Thanksgiving. For the rest of your life. 'Remember when Uncle Dale fed the bear?'" },
                { speaker: 'female', text: "Ranger Dawn: For what it's worth, you handled it well once it counted. Nobody ran, nobody screamed. Last group up here threw a chair. You folks are alright." },
                { speaker: 'male', text: "Uncle Dale: Okay, to make up for the bear thing -- tonight, around the fire, I'm telling the story. The scary one. The one about the campground." },
                { speaker: 'male', text: "Logan: Is it actually scary or is it gonna be like your hiking, where you give up halfway through?" },
                { speaker: 'male', text: "Uncle Dale: Oh, this one I finish. This one I've been telling for thirty years. By the end of it, nobody sleeps. Including me. Especially me." },
                { speaker: 'female', text: "Ruby: A bear AND a ghost story in one day? Best. Trip. EVER. Gerald agrees. Gerald saw the whole bear thing." },
            ],
            japanese: [
                { speaker: 'female', text: "Ruby: みんな。みんな。静かに。すっごく静かに。クマが来てる。クマが来た。クーラーのそばにいて、すっごく立派なの。" },
                { speaker: 'male', text: "Hank: よし、誰もパニックにならない、誰も走らない。サンドラ、ルビーを後ろに。体を大きく見せて、ゆっくり後ずさるんだ。なんでクーラーが開いてる。誰がクーラー開けっぱなしにした？" },
                { speaker: 'male', text: "Uncle Dale: ...えっと、弁解させてもらうと、真夜中に腹が減ってな、スナックを何個かテントに持ち込んだかもしれん。何個かってのは、ほぼ全部のことだ。" },
                { speaker: 'male', text: "Hank: デイル。レンジャーは一度言ったぞ。ルール一つ。食料はベアボックス。お前はクマの生息地のテントにトレイルミックスを密輸したんだ。" },
                { speaker: 'male', text: "Logan: マシュマロ食ってる。4袋全部。デイルおじさん、あいつおじさんの人格まるごと食ってるよ。" },
                { speaker: 'female', text: "Ranger Dawn: ピクニックテーブルまで下がって、落ち着いて、全員 -- ほら、でかいの、それはあんたのじゃない。行きな。さあ行きな。...ほら行った。簡単な食べ物がなくなれば、ふらっといなくなるわ。" },
                { speaker: 'female', text: "Sandra: 恐ろしかったのに、ルビーがなぜかバイバイしようとしてる。" },
                { speaker: 'female', text: "Ruby: バイバイ、クマ！レンジャーさんが二度と戻ってくるなって！でもすっごくかっこよかった！" },
                { speaker: 'female', text: "Ranger Dawn: 皆さん、これがまさに1日目に警告したことよ。悪いクマじゃない、このサイトが簡単に食べ物にありつけると学んだ腹ペコのクマなの。これからは全部しまって。パンくず一つ残らず。" },
                { speaker: 'male', text: "Uncle Dale: これは俺のせいだ。認める。クマにマシュマロを食わせた。この一文を、俺は死ぬまで背負っていく。" },
                { speaker: 'male', text: "Hank: お前が背負うのは、俺が思い出させるからだ。毎年サンクスギビングに。お前が死ぬまで。「デイルおじさんがクマに餌やったの覚えてる？」ってな。" },
                { speaker: 'female', text: "Ranger Dawn: 一応言っておくと、いざというときの対応は上手だったわよ。誰も走らず、誰も叫ばず。前のグループは椅子を投げたの。あなたたちは大丈夫よ。" },
                { speaker: 'male', text: "Uncle Dale: よし、クマの件の埋め合わせに -- 今夜、焚き火を囲んで、あの話をする。怖いやつだ。このキャンプ場の話だ。" },
                { speaker: 'male', text: "Logan: 本当に怖いやつ？それともおじさんのハイキングみたいに、途中で諦めるやつ？" },
                { speaker: 'male', text: "Uncle Dale: いや、これは最後までやる。これは30年語ってきたやつだ。終わる頃には、誰も眠れない。俺も含めて。特に俺がな。" },
                { speaker: 'female', text: "Ruby: クマと怪談が一日に両方？人生最高の旅！ジェラルドも賛成。ジェラルド、クマの一部始終を見てたもん。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 5 (Jun 23) -- BREAKING CAMP
    // ============================================================
    {
        id: 'camping-day5',
        date: '2026-06-23',
        title: 'Day 5: Breaking Camp',
        titleJa: 'Day 5: 撤収',
        content: '最終日。一家はテントをたたみ、荷物をまとめる。さんざんな目に遭ったはずなのに、なぜか誰も帰りたがらない。ローガンは電波が戻ってもスマホを出さず、ルビーはジェラルドとの別れに涙する。ドーンが見送りに来る。',
        series: 'camping-trip',
        seriesTitle: 'The Camping Trip',
        tone: 'reflective',
        tags: ['camping', 'family', 'comedy', 'packing-up', 'goodbyes'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Hank: Alright, gang, last morning. Let's break camp. Roll the sleeping bags, collapse the tent -- and this time, Dale, I want you to watch how the poles come apart, because you're learning a skill today whether you like it or not." },
                { speaker: 'male', text: "Uncle Dale: Hank, I have learned three skills this week: how to flood a tent, how to feed a bear, and how to ruin a ghost story by falling asleep during my own ending." },
                { speaker: 'male', text: "Logan: Hey -- so we've got, like, two bars now if you stand on the rock. Signal's back." },
                { speaker: 'female', text: "Sandra: Oh. So it is. You gonna catch up on everything you missed?" },
                { speaker: 'male', text: "Logan: ...Nah. Maybe later. I kind of want to help Dad with the tent first. Don't make it weird about it." },
                { speaker: 'female', text: "Sandra: I'm not making it weird. I'm just going to quietly cry into this sleeping bag, that's all. No big deal." },
                { speaker: 'female', text: "Ruby: I have to let Gerald go. The ranger says beetles belong in the forest, not in the car. But he was my best friend for five days and this is the hardest goodbye of my life." },
                { speaker: 'female', text: "Ranger Dawn: Came by to see you folks off. Word travels -- you're the family that survived the flood, the bear, AND a Dale ghost story. You've basically done the full circuit." },
                { speaker: 'male', text: "Hank: We earned every disaster, Dawn. Honestly, thank you. You warned us about all of it, and we ignored you about all of it, and you still showed up every time." },
                { speaker: 'female', text: "Ranger Dawn: That's the job. Besides -- families like yours are why I do it. You came in stressed and you're leaving sunburned and happy. That's the whole point of this place." },
                { speaker: 'female', text: "Ruby: Goodbye, Gerald. Go be free. Find a girl beetle. Name one of your kids after me. ...Okay, Mom, I did it, I let him go, now I need a hug immediately." },
                { speaker: 'male', text: "Logan: This was, like, objectively the worst trip ever. The flood, the bear, no signal, my one dry sock. And I think it might be the best one we've ever done." },
                { speaker: 'female', text: "Sandra: Write that down. Logan, fifteen years old, admitted out loud that the trip was good. I want it in the record, like Wanda said about her gnomes." },
                { speaker: 'male', text: "Hank: Wrong scenario, hon, but I love the energy. Okay. Tent's down, car's packed, everybody in. Say bye to the campsite." },
                { speaker: 'female', text: "Ruby: Bye, campsite! Bye, bear box! Bye, the rock where the river was! We'll be back, I promise!" },
                { speaker: 'male', text: "Uncle Dale: Same time next year? I'll bring marshmallows. I'll keep them in the bear box this time. ...Probably. No promises." },
            ],
            japanese: [
                { speaker: 'male', text: "Hank: よし、みんな、最後の朝だ。撤収しよう。寝袋を巻いて、テントをたたんで -- 今度はデイル、ポールがどう外れるかちゃんと見てろ、好むと好まざるとにかかわらず、今日お前は技術を一つ覚えるんだ。" },
                { speaker: 'male', text: "Uncle Dale: ハンク、俺は今週3つの技術を覚えたぞ。テントを浸水させる方法、クマに餌をやる方法、それと自分のオチで寝落ちして怪談を台無しにする方法だ。" },
                { speaker: 'male', text: "Logan: なあ -- あの岩の上に立てば、今2本くらい立つよ。電波戻った。" },
                { speaker: 'female', text: "Sandra: あら。ほんとね。見逃したもの全部チェックする？" },
                { speaker: 'male', text: "Logan: ...いや。あとでいいや。なんかまず父さんのテント手伝いたい。変に深読みしないでよ。" },
                { speaker: 'female', text: "Sandra: 深読みしないわよ。ただこの寝袋に向かって静かに泣くだけ。それだけ。大したことじゃない。" },
                { speaker: 'female', text: "Ruby: ジェラルドを放してあげなきゃ。レンジャーさんが、カブトムシは車じゃなくて森のものだって。でも5日間いちばんの親友だったの、人生で一番つらいお別れ。" },
                { speaker: 'female', text: "Ranger Dawn: 見送りに来たわ。噂は広まるのよ -- あなたたち、洪水と、クマと、デイルの怪談まで生き延びた家族でしょ。ほぼフルコース制覇ね。" },
                { speaker: 'male', text: "Hank: 災難は全部、身をもって稼いだよ、ドーン。本当に、ありがとう。全部について警告してくれて、俺たちは全部について無視して、それでも毎回来てくれた。" },
                { speaker: 'female', text: "Ranger Dawn: 仕事だもの。それに -- あなたたちみたいな家族のためにこの仕事をしてるの。ストレスを抱えて来て、日焼けして幸せそうに帰っていく。それがこの場所の意味そのものよ。" },
                { speaker: 'female', text: "Ruby: さよなら、ジェラルド。自由になって。彼女のカブトムシを見つけて。子供の一人に私の名前つけて。...はい、ママ、やった、放した、今すぐハグして。" },
                { speaker: 'male', text: "Logan: これ、客観的に見て史上最悪の旅だった。洪水、クマ、圏外、唯一の乾いた靴下。なのに、今までで一番いい旅だったかもしれない。" },
                { speaker: 'female', text: "Sandra: それメモして。ローガン、15歳、旅がよかったと声に出して認めた。記録に残したいわ、ワンダがノームについて言ってたみたいに。" },
                { speaker: 'male', text: "Hank: それ別のシナリオだぞ、母さん、でもそのノリ好きだ。よし。テントたたんだ、車積んだ、全員乗って。キャンプ場にバイバイしよう。" },
                { speaker: 'female', text: "Ruby: バイバイ、キャンプ場！バイバイ、ベアボックス！バイバイ、川だった岩！また来るからね、約束！" },
                { speaker: 'male', text: "Uncle Dale: 来年も同じ時期に？マシュマロ持ってくる。今度はベアボックスに入れとく。...たぶん。約束はしない。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },
];
