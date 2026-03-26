/**
 * 365 English Master -- Month 4 Week 16: エンタメ英語 (Entertainment English)
 * Days 112-120: 90 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 16
// ============================================================

export const MONTH4_W16_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 112: スポーツ観戦 (Watching Sports)
    // Scene: 居酒屋のテレビで野球中継。ゴンドが解説者気取りで語り始める。
    // ────────────────────────────────────────────────────

    {
        daySlot: 112, japanese: '今日の試合どうなった？',
        english: [
            'How did the game go?',
            'Hey, how did the game go today?',
            'I missed the game today. Did we win? What happened?',
            "I had to work late so I could not watch the game. Please tell me we won. I have been avoiding my phone all day because I did not want to see any spoilers on social media. Every time I opened Twitter there was a score alert so I just put my phone face down on my desk. So hit me. How did it go? Was it a good game or should I just not bother watching the replay?",
        ],
        context: 'How did the game go? は「試合どうだった？」の定番。日本語は「どうなった？」と結果を聞くけど、英語は go を使って「どう進んだ？」と過程を聞く構造。spoilers はスポーツでも使う。score alert は「速報通知」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'いい試合だったよ',
        english: [
            'It was a great game.',
            'It was a really good game actually.',
            'You missed a great game. It went down to the wire.',
            "Oh man, you missed an incredible game. It was tied going into the ninth inning and then their closer completely fell apart. Walked two guys, gave up a double, and the whole stadium just erupted. I was literally standing up at the bar screaming and the bartender told me to calm down. It was one of those games where you could not look away for a second. If you can find the replay, watch it from the seventh inning on. That is where it gets crazy.",
        ],
        context: 'went down to the wire は「最後の最後まで接戦だった」。wire は競馬のゴールに張ってあったワイヤーが語源。closer は「抑え投手」。fell apart は「崩れた」。erupted は「爆発した（歓声）」。スポーツの興奮を伝える表現はどれも大げさなのが英語の特徴。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'あのプレー見た？',
        english: [
            'Did you see that play?',
            'Wait, did you see that play? Unreal.',
            'Tell me you saw that catch. That was the play of the year.',
            "OK I need to talk about that diving catch in the seventh inning because I have watched the replay like fifteen times already and I still do not understand how he got to that ball. He was fully horizontal in the air. His whole body was off the ground. And then he somehow held onto it. The commentators went absolutely insane and honestly I do not blame them. That might be the best defensive play I have seen in years. They are going to be showing that highlight for decades.",
        ],
        context: 'unreal は「信じられない」。diving catch は「ダイビングキャッチ」。horizontal は「水平」。held onto は「掴み続けた」。highlight は「ハイライト」。英語圏のスポーツトークは replay を何回見たかが熱量のバロメーター。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '審判ひどくない？',
        english: [
            'That ref is terrible.',
            'Are you kidding me? That call was awful.',
            'That umpire has been missing calls all night. Both teams should be frustrated.',
            "I am not even being biased here. That umpire has been objectively terrible all game. He called a strike on a pitch that was clearly six inches outside. Even the opposing fans looked confused. And then two innings later he missed an obvious tag at second base. At some point you have to wonder if he needs glasses or if he just does not care. I know it is a hard job but come on. These are professional games with millions of people watching. Get it right.",
        ],
        context: 'ref は referee の略、umpire は野球の審判。missing calls は「判定を間違える」。biased は「偏っている」。come on は「おいおい」。英語圏では審判への文句はスポーツ観戦の必須科目。ref と ump はスポーツによって使い分ける。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'スポーツバーで見ようよ',
        english: [
            'Let us watch it at a sports bar.',
            'We should hit up a sports bar for the game.',
            'The game starts at seven. Let us find a sports bar with a big screen and grab some wings.',
            "You know what we should do? Instead of watching at home on our tiny screens, let us go to that sports bar on Fifth Street. They have like ten massive TVs and the sound is cranked up so you can actually hear the commentary. Plus the atmosphere is completely different when you are surrounded by other fans. Last time I went there for a playoff game the whole place was losing their minds. It is so much better than sitting on your couch alone. And they have dollar wings during games. Come on, it will be fun.",
        ],
        context: 'hit up は「行く」のカジュアル版。grab some wings は「手羽先を食べる」。cranked up は「音量を上げた」。losing their minds は「大興奮している」。英語圏の sports bar 文化は日本のスポーツバーとかなり違って、見知らぬ人同士がハイタッチする世界。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'あの選手すごいね',
        english: [
            'That player is something else.',
            'He is on a completely different level from everyone else.',
            'I have been watching this sport for twenty years and he might be the most talented player I have ever seen.',
            "I do not think people appreciate how special this guy is. He does things on the field that should not be physically possible. His reaction time, his instincts, his athleticism. It is all elite. And the craziest part is he makes it look effortless. Everyone else is struggling and he is just out there doing his thing like it is a casual Sunday pickup game. We are watching generational talent right now and I feel like not enough people are talking about it. Enjoy it while it lasts because players like him come around once every thirty years.",
        ],
        context: 'something else は「別格」。on a different level は「レベルが違う」。generational talent は「世代に一人の才能」。come around は「現れる」。effortless は「楽々と」。選手の凄さを語るとき、英語は once every thirty years のように時間軸で表現するのが好き。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'ルールよくわからないんだけど',
        english: [
            'I do not really get the rules.',
            'Can someone explain the rules to me? I am lost.',
            'I want to watch but I have no idea what is going on. Why did they stop playing just now?',
            "OK do not judge me but I have been pretending to understand this sport for like three years and I still do not know what half the rules are. Like, what is offsides? Why do they keep stopping? What does that hand signal mean? I feel like everyone around me knows exactly what is happening and I am just clapping when they clap and booing when they boo. At this point I am too embarrassed to ask because people are going to think I am an idiot for not knowing the basics.",
        ],
        context: 'I am lost は「さっぱりわからない」。offsides は「オフサイド」。hand signal は「ハンドサイン」。too embarrassed to ask は「恥ずかしくて聞けない」。スポーツのルールがわからないのは英語圏でもあるある。pretending to understand は共感度が高い。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '延長戦になりそう',
        english: [
            'It might go into overtime.',
            'This looks like it is heading to overtime.',
            'The way this game is going, we are definitely looking at extra time.',
            "Neither team can score and the clock is winding down. I have a feeling this is going to overtime. Which means I am going to be here for at least another hour and I have work tomorrow at eight. But there is no way I am leaving now. Not after sitting through the whole game. I need to see how this ends. Even if it means I am a zombie at work tomorrow. Some things are more important than sleep and a tied playoff game is absolutely one of them.",
        ],
        context: 'overtime は「延長戦」。winding down は「残り時間が減っている」。extra time はサッカーで使う言い方。a zombie at work は「仕事中にゾンビ状態」。英語では overtime(アメリカ)と extra time(イギリス)でスポーツによって使い分ける。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'ハーフタイムだって',
        english: [
            'It is halftime.',
            'Halftime. Let us grab another round.',
            'OK it is halftime. Perfect timing to get more drinks and hit the restroom.',
            "Finally halftime. I have been holding it for the last twenty minutes because I did not want to miss anything. The first half was intense. Both teams came out swinging and neither one is backing down. I think the second half is going to be even crazier. While we have a break though, can someone explain to me why the coach pulled the starter in the second quarter? That made absolutely no sense to me. He was playing well. Anyway, who wants another beer? My round.",
        ],
        context: 'halftime は「ハーフタイム」。grab another round は「もう一杯ずつ注文する」。came out swinging は「最初から全力で攻めた」。pulled the starter は「先発を引っ込めた」。my round は「ここは俺が奢る」。round は全員分を一人が買う飲み方。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '生で見たいなあ',
        english: [
            'I want to see it live.',
            'I would love to see a game live someday.',
            'Watching on TV is fun but nothing beats being there in person. The energy is completely different.',
            "I have only ever watched games on TV but I keep hearing that the live experience is on another level. The sound alone must be incredible. Like when fifty thousand people all cheer at the same time, that has to vibrate through your whole body. And the food, the energy, the atmosphere. One of my friends went to a championship game last year and she said it was the single greatest experience of her life. That sounds dramatic but honestly I believe her. I need to save up and go at least once.",
        ],
        context: 'live は「生で」。nothing beats は「〜に勝るものはない」。in person は「現場で」。on another level は「次元が違う」。save up は「お金を貯める」。日本語の「生で見たい」の「生」は英語では live。in person でも通じるが live のほうがスポーツ向き。',
        character: 'yuki', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 113: 推し活 (Fan Culture)
    // Scene: ミナが推しアイドルのグッズを大量に見せびらかす。全員引き気味。
    // ────────────────────────────────────────────────────

    {
        daySlot: 113, japanese: '推しがいるんだよね',
        english: [
            'I have a bias.',
            'So I have this one person I am completely obsessed with.',
            'There is this one member in the group who I am totally devoted to. He is my absolute favorite.',
            "OK so you know how some people have a favorite sports team or a favorite movie? Well, I have a favorite person. Like, one specific human being that I think about way more than is probably healthy. I follow everything he does. Every social media post, every live stream, every interview. I know his birthday, his blood type, his favorite food. I have spent more money on his merchandise than I want to admit. Is it a little obsessive? Maybe. Do I care? Not even a little bit.",
        ],
        context: 'bias はK-POPファン用語で「推し」。英語圏では fave(favorite の略)や stan も使う。devoted は「献身的な」。obsessed は「取り憑かれた」。日本語の「推し」は英語に直訳しにくくて、my bias, my fave, I stan で状況によって使い分ける。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'グッズ全部集めてる',
        english: [
            'I collect all the merch.',
            'I have every single piece of merchandise they have ever released.',
            'My room is basically a shrine at this point. I have every album, every photocard, every limited edition item.',
            "I am not going to pretend I am casual about this. I own everything. And I mean everything. Every album version, every photocard set, every concert towel, every random collaboration item they have ever done. I even have stuff that was only sold at one specific pop-up shop in Tokyo three years ago. I flew there just for that. My friends think I am insane and my bank account definitely agrees. But when I look at my collection I feel genuinely happy. You cannot put a price on happiness. Well, you can. It is about four thousand dollars so far.",
        ],
        context: 'merch は merchandise の略で「グッズ」。shrine は「神社」だけどファンの文脈では「聖地のような部屋」。photocard は「フォトカード」。pop-up shop は「期間限定ショップ」。you cannot put a price on happiness は皮肉込みの定番フレーズ。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ファンミーティング行ってきた',
        english: [
            'I went to a fan meeting.',
            'I just got back from a fan meeting and I am still shaking.',
            'I actually got to meet them in person. My heart was pounding the entire time.',
            "You are not going to believe this but I went to a fan meeting last weekend and I actually got to talk to him for like thirty seconds. I had rehearsed what I was going to say for weeks. I had this whole speech prepared about how much his music means to me. And then I got up there and my mind went completely blank. I just stood there with my mouth open like a fish. Eventually I managed to say you are amazing and he smiled and said thank you. And now I am going to live off that smile for the next five years.",
        ],
        context: 'fan meeting は日本語と同じだけど英語では meet and greet のほうが一般的。my mind went blank は「頭が真っ白になった」。live off that smile は「あの笑顔で5年は生きていける」。rehearsed は「練習した」。推しに会ったときの緊張は世界共通。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'それオタクじゃん',
        english: [
            'That is so nerdy.',
            'Dude, you are a total superfan.',
            'I am not judging but that is some serious dedication right there.',
            "Look, I respect the commitment. I really do. But from the outside looking in, you have to understand how this sounds. You flew to another country for a limited edition towel. A towel. And you are telling me this with a straight face like it is a completely normal thing to do. I am not saying it is bad. I am just saying that if any of us did this for anything else, we would be committed to an institution. But because it is fandom culture, somehow it is fine. The double standard is fascinating to me.",
        ],
        context: 'nerdy は「オタクっぽい」。superfan は「超ファン」。dedication は「献身」。with a straight face は「真顔で」。committed to an institution は「施設に入れられる(精神病院)」のジョーク。double standard は「ダブルスタンダード」。英語圏でもオタクいじりは定番の友達トーク。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '新曲がやばい',
        english: [
            'The new song is fire.',
            'Have you heard the new single? It is an absolute banger.',
            'They just dropped a new track and I have had it on repeat all day. It is so good.',
            "I am not exaggerating when I say this might be their best song yet. The production is insane, the hook is catchy as anything, and there is this one part in the bridge where the bass drops and it literally gave me chills the first time I heard it. I have listened to it maybe forty times since it came out yesterday. I am not even tired of it. If anything it gets better every time. The music video is incredible too. The choreography, the visuals, everything. They really outdid themselves this time.",
        ],
        context: 'fire は「最高」のスラング。banger は「めちゃくちゃいい曲」。dropped は「リリースした」。hook は「サビの一番キャッチーな部分」。bridge は「Bメロとサビの間の部分」。bass drops は「ベースが落ちる(重低音が入る)」。outdid themselves は「自分たちを超えた」。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推しが引退したらどうしよう',
        english: [
            'What if they retire?',
            'I honestly do not know what I would do if they retired.',
            'The thought of them disbanding keeps me up at night. I am not ready for that.',
            "I know this sounds dramatic but I genuinely do not know what I would do with my life if they retired. This fandom is like seventy percent of my personality at this point. My friends, my hobbies, my social media, my spending habits. It all revolves around this one group. If they are gone, what do I talk about? What do I look forward to? I saw a rumor online that one of the members might leave and I had to close my laptop and go for a walk because I was getting actual anxiety. I know I need to prepare myself mentally but I am choosing to live in denial for now.",
        ],
        context: 'disband は「解散する」。keeps me up at night は「夜も眠れないくらい心配」。revolves around は「〜を中心に回っている」。live in denial は「現実を受け入れずに生きる」。推しの引退への恐怖は英語圏のファンダムでも huge topic。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ライブ最高だった',
        english: [
            'The concert was amazing.',
            'Best concert I have ever been to. Hands down.',
            'I still have goosebumps from last night. The energy in that arena was unreal.',
            "I have been to a lot of concerts in my life but nothing has ever come close to last night. The moment the lights went down and the intro started playing, the entire crowd just lost it. Twenty thousand people screaming at the top of their lungs. And then when they came out on stage, I genuinely thought I was going to pass out. The setlist was perfect, the stage design was insane, and there was this moment during the encore where they did an acoustic version of my favorite song and I just completely broke down crying. Best night of my life. I am already saving for the next tour.",
        ],
        context: 'hands down は「文句なしに」。goosebumps は「鳥肌」。lost it は「大興奮した」。at the top of their lungs は「声の限り」。broke down crying は「泣き崩れた」。encore は「アンコール」。acoustic version は「アコースティック版」。ライブの感想は英語でも最上級表現を連発する。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推しにお金使いすぎ',
        english: [
            'I spend too much on my faves.',
            'My fan spending is kind of out of control honestly.',
            'I did the math and I have spent more on merchandise this year than on groceries. That is probably a problem.',
            "Let me be completely transparent about my finances for a second. I calculated how much I spent on fandom stuff last year and the number was horrifying. Between concert tickets, merchandise, fan club membership, albums, photocards from resellers, and travel to events, I spent roughly the equivalent of a used car. A decent used car. Not a beater. My mom asked me why I do not have any savings and I told her I was investing in experiences. She did not find that funny. Neither did my bank. But honestly every single purchase brought me joy so I refuse to feel bad about it.",
        ],
        context: 'out of control は「制御不能」。resellers は「転売ヤー」。a beater は「ボロ車」。investing in experiences は「経験に投資している」のジョーク。日本語の「推し活に使いすぎ」は英語で fan spending is out of control と表現する。refuse to feel bad は「後悔しないことにしている」。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ファン同士の繋がりがいい',
        english: [
            'The fan community is great.',
            'One of the best parts is the friends I have made through the fandom.',
            'I never expected it but the fan community has given me some of my closest friendships.',
            "People always focus on the obsessive side of fandom but nobody talks about the community. I have met some of my best friends through this fandom. We bonded over a shared love for something and now we travel together, eat together, and support each other through real life stuff. Last month when I was going through a rough patch, my fandom friends were the first ones to check on me. Not my work friends, not my college friends. My fandom friends. Because they actually know me. We talk every single day. That kind of connection is rare and it came from a place that most people would dismiss as silly.",
        ],
        context: 'fandom は「ファンダム(ファンの集合体)」。bonded は「絆が生まれた」。rough patch は「つらい時期」。check on は「安否確認する」。dismiss as silly は「くだらないと切り捨てる」。英語圏でもファンコミュニティの温かさは意外と語られるトピック。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推し活は自分への投資だから',
        english: [
            'Supporting my faves is self-care.',
            'I see it as investing in my own happiness.',
            'Some people spend money on therapy. I spend money on concert tickets. Same thing.',
            "I know people judge me for how much time and money I put into this but I genuinely believe it makes me a better person. When I am stressed from work, I come home and watch a live stream and everything feels OK again. When I am having a bad day, I put on their music and my mood completely shifts. That is worth more than any amount of money. My therapist actually told me it is healthy to have something you are passionate about as long as it is not destructive. And last I checked, buying photocards is not destructive. Expensive? Yes. Destructive? No. There is a difference.",
        ],
        context: 'self-care は「セルフケア」。same thing は「同じことでしょ」のジョーク。mood shifts は「気分が変わる」。last I checked は「私の知る限り」。destructive は「破壊的な」。推し活を self-care と言い切る論法は英語圏のファンダムで定番の自己正当化フレーズ。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 114: 試合結果 (Game Results)
    // Scene: 朝の居酒屋仕込み中にケンジが昨夜の試合結果を報告。勝敗で一喜一憂。
    // ────────────────────────────────────────────────────

    {
        daySlot: 114, japanese: '勝ったよ！',
        english: [
            'We won!',
            'We won! I cannot believe it!',
            'We actually pulled it off. I am still in shock. What a game.',
            "We won! We actually won! I was losing my mind in the final minutes because it looked like we were going to blow it again. We were up by two and then they scored and it was tied and I thought here we go again. But then in the last thirty seconds our guy hit the most clutch shot I have ever seen and the whole place went absolutely nuclear. I was screaming so loud my neighbor banged on the wall. I do not care. We won. Everything else is irrelevant. This is the happiest I have been in months.",
        ],
        context: 'pulled it off は「やり遂げた」。blow it は「台無しにする」。clutch は「土壇場で決める」。went nuclear は「大爆発した」。banged on the wall は「壁をドンドン叩いた」。英語圏では自分のチームを we と呼ぶのが普通。日本語でも「勝った！」と言うけど、英語の we はもっと一体感が強い。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '負けた。最悪。',
        english: [
            'We lost. I am devastated.',
            'We lost and I do not want to talk about it.',
            'They had it in the bag and they blew it in the last five minutes. I want to cry.',
            "I am in pain right now. Physical, emotional, spiritual pain. We were winning the entire game. The entire game. And then somehow in the last five minutes everything fell apart. The defense collapsed, the coach made the worst substitution I have ever seen, and our best player missed a wide open shot that my grandmother could have made. I stayed up until one AM watching this disaster unfold and now I have to go to work and pretend I am fine. I am not fine. I will not be fine for at least a week.",
        ],
        context: 'devastated は「打ちのめされた」。had it in the bag は「勝ちを確信していた」。blew it は「台無しにした」。collapsed は「崩壊した」。wide open shot は「完全にフリーのシュート」。unfold は「展開する」。スポーツの負けを語るときの英語はとにかくドラマチック。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '何対何だった？',
        english: [
            'What was the score?',
            'What was the final score?',
            'I did not catch the score. How did it end? Was it close?',
            "Wait, what was the final score? I fell asleep in the third quarter because it was so boring and then I woke up this morning to like fifty messages in my group chat so clearly something happened. Was it a blowout or was it close? Because from the texts it sounds like it went down to the wire. I hate falling asleep during games because I always miss the best part. Give me the full rundown. I need to know everything.",
        ],
        context: 'score は「スコア」。blowout は「大差の試合」。went down to the wire は「最後まで接戦」。rundown は「要約」。英語では What was the score? とシンプルに聞く。日本語の「何対何」は具体的な数字を求めているけど、英語はまずスコアという概念を聞いてから詳細に入る。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'あの監督がダメだよ',
        english: [
            'The coach is the problem.',
            'Honestly, they need to fire the coach.',
            'The players are fine. It is the coaching decisions that are losing games for this team.',
            "I have been saying this for two years and nobody listened to me. The problem is not the players. The players are talented. The problem is the coach. His game plans make no sense. He refuses to adjust when something is not working. He plays his favorites instead of the guys who are actually performing. And his press conferences are a joke. He just sits there and says we will do better next time. Next time? You have been saying next time for two seasons. When is next time? Fire him. Bring in someone who actually has a strategy.",
        ],
        context: 'fire は「クビにする」。game plan は「作戦」。adjust は「修正する」。plays his favorites は「お気に入りを使う」。press conference は「記者会見」。英語圏の監督批判は日本よりかなり激しくて、fire the coach は毎シーズン必ず聞くフレーズ。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '逆転勝ちだったよ',
        english: [
            'It was a comeback win.',
            'They were down by ten and came all the way back.',
            'I almost turned it off in the third quarter but I am so glad I did not. The comeback was insane.',
            "This is exactly why you never turn off a game early. I was ready to give up. We were down by fifteen in the third quarter and everything looked hopeless. I actually texted my friend and said this is over. And then I do not know what happened but something clicked. They went on this insane run, hit like five shots in a row, and suddenly it was a three-point game. The crowd was going crazy. By the fourth quarter we had taken the lead and we never looked back. Greatest comeback I have ever witnessed live. I take back everything I said about the coach. For tonight at least.",
        ],
        context: 'comeback は「逆転」。went on a run は「連続得点した」。never looked back は「もう振り返らなかった(そのまま勝った)」。I take back は「撤回する」。英語圏では comeback story は最も盛り上がる話題。almost turned it off は「もう消そうとした」という前フリが重要。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '引き分けかあ',
        english: [
            'It was a draw.',
            'A tie? That is so unsatisfying.',
            'After all that buildup it ended in a draw. I feel robbed of a proper ending.',
            "Three hours. Three hours of my life I spent watching that game and it ended in a tie. A tie. Nobody wins, nobody loses, everyone goes home feeling empty. I do not understand sports that allow ties. Pick a winner. Play overtime. Do penalty kicks. Do something. But do not tell me that after ninety minutes of running around, the best we can do is nobody wins. My friend is a soccer fan and he says ties are part of the beauty of the sport. Beauty? There is nothing beautiful about wasted time. Give me a winner.",
        ],
        context: 'draw と tie は両方「引き分け」。draw はイギリス英語(サッカー)、tie はアメリカ英語で使い分ける。feel robbed は「損した気分」。penalty kicks は「PK戦」。日本語の「引き分けかあ」のがっかり感は英語では I feel robbed で表現する。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '優勝狙えるかも',
        english: [
            'They might win it all.',
            'If they keep playing like this, they could win the championship.',
            'I am not trying to jinx it but this team has a real shot at the title this year.',
            "I know I say this every year but this year feels different. The roster is deep, the chemistry is there, and they finally have a coach who knows what he is doing. If they stay healthy and nobody does anything stupid, I genuinely think they can win the whole thing. But I am terrified of saying it out loud because every time I get my hopes up, something goes horribly wrong. A key player gets injured or they choke in the playoffs. So I am going to be cautiously optimistic. Which for me means I have already bought parade tickets but I am telling everyone I am not getting my hopes up.",
        ],
        context: 'win it all は「優勝する」。jinx は「縁起を悪くする」。has a real shot は「本当にチャンスがある」。choke は「大事な場面で失敗する」。cautiously optimistic は「慎重に楽観的」。parade tickets は「優勝パレードのチケット」。jinx を気にしながら語るのがスポーツファンあるある。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'ハイライト見た？',
        english: [
            'Did you see the highlights?',
            'Check out the highlights. You will not believe what happened.',
            'I just watched the highlight reel and even knowing the result, it still gave me chills.',
            "If you did not watch the game, at least go watch the highlights on YouTube. They already uploaded a ten-minute recap and it has everything. The opening goal, the controversial call in the second half, and obviously the game-winning play at the end. The commentator completely lost his voice screaming and honestly that made it even better. I have already watched it three times and I keep discovering little details I missed. Like the coach pumping his fist on the sideline. Or the look on the goalkeeper's face when he realized what just happened. Pure cinema.",
        ],
        context: 'highlight reel は「ハイライト集」。recap は「まとめ」。controversial call は「物議を醸した判定」。pumping his fist は「ガッツポーズ」。pure cinema は「まるで映画」。英語圏では試合のハイライトを YouTube で見るのが完全に文化として定着している。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '今シーズンは期待できそう',
        english: [
            'This season looks promising.',
            'I have a good feeling about this season.',
            'The off-season moves were smart and the roster looks stacked. This could be our year.',
            "I am cautiously excited about this season. They picked up two solid free agents, the draft class looks excellent, and all the guys who were injured last year are back and healthy. On paper this is the best team we have had in a decade. But I have been hurt before so I am not going to start planning the parade just yet. Last year I bought a championship hat before the playoffs even started and we got eliminated in the first round. My friend still makes fun of me for that. So this year I am keeping my expectations reasonable. But between you and me, I think we are going all the way.",
        ],
        context: 'promising は「期待できそうな」。off-season は「シーズンオフ」。stacked は「戦力が充実している」。free agents は「FA選手」。draft class は「ドラフト年次の選手たち」。on paper は「データ上は」。going all the way は「最後まで勝ち進む」。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'スポーツは結果がすべて',
        english: [
            'At the end of the day, it is about winning.',
            'In sports, results are all that matter.',
            'You can play the most beautiful game in the world but if you lose, nobody remembers.',
            "I know people talk about playing with heart and the beauty of the game and all that romantic stuff. And sure, that is nice. But let me ask you this. When was the last time a team got a trophy for playing with heart? Never. Because trophies go to the team that wins. Period. I am not saying the journey does not matter. I am saying the destination matters more. History remembers champions. Nobody writes books about the team that played really well but lost in the semifinals. Harsh? Maybe. True? Absolutely.",
        ],
        context: 'at the end of the day は「結局のところ」。playing with heart は「情熱を持ってプレーする」。trophy は「トロフィー」。the journey vs the destination は「過程 vs 結果」。harsh は「厳しい」。この「結果がすべて」論争は英語圏のスポーツトークでも永遠のテーマ。',
        character: 'kenji', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 115: 運動する (Working Out)
    // Scene: リサが「最近ジム行ってる」と言ったら全員に質問攻めにされる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 115, japanese: '最近ジム行き始めた',
        english: [
            'I just started going to the gym.',
            'I signed up for a gym last month and I have actually been going.',
            'I finally got a gym membership and I have been going three times a week. I am shocked at myself.',
            "OK so you know how every January I say I am going to start working out and then I go twice and quit? Well this time I actually stuck with it. I signed up in April to avoid the New Year rush and I have been going consistently three times a week for two months now. I still do not know what half the machines do and I am pretty sure I have been using the rowing machine wrong the entire time. But I am showing up and that is what counts. The hardest part is not the workout. It is putting on the gym clothes and driving there.",
        ],
        context: 'signed up は「入会した」。stuck with it は「続けた」。New Year rush は「新年の混雑」（1月はジム入会が増える）。showing up は「行くこと自体」。what counts は「大事なこと」。英語圏でも「ジム入会しても行かない」は最も共感されるあるある。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '何のトレーニングしてるの？',
        english: [
            'What kind of workouts do you do?',
            'So what is your routine? Weights? Cardio? What are we talking here?',
            'Are you following a program or just kind of doing whatever feels right that day?',
            "I am genuinely curious because I have no idea where to start. Every time I look up workout routines online I get overwhelmed by the amount of information. Some people say do cardio every day. Other people say cardio is a waste of time and you should only lift weights. Then there is CrossFit people who say everything else is wrong. And yoga people who say the gym is unnecessary. I just want someone to tell me exactly what to do in simple terms. Go here, do this, go home. That is all I need. Is that too much to ask?",
        ],
        context: 'routine は「ルーティン」。weights は「ウェイトトレーニング」。cardio は cardiovascular exercise の略で「有酸素運動」。CrossFit は「クロスフィット」。overwhelmed は「圧倒された」。英語では What is your routine? がジムの会話の入り口。日本語の「何のトレーニング」より具体的。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '筋肉痛がやばい',
        english: [
            'I am so sore.',
            'My whole body is sore. I can barely walk.',
            'I did legs yesterday and now I cannot sit down without wincing. The stairs are my enemy.',
            "I made the mistake of going too hard on leg day and now I am paying for it. Every muscle in my lower body hates me right now. Getting out of bed this morning was a full production. I had to roll sideways and use my arms to push myself up because my legs refused to cooperate. Walking down stairs looks like I am doing some kind of comedy act. My coworker asked me if I was OK and I just said leg day and she immediately understood. Those two words explain everything. Leg day is universal suffering.",
        ],
        context: 'sore は「筋肉痛」。wincing は「痛みで顔をしかめる」。leg day は「脚のトレーニング日」。a full production は「大仕事」。refused to cooperate は「言うことを聞かない」。leg day は英語圏のジム文化で最も有名なミーム。「never skip leg day」も定番フレーズ。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '一緒に走らない？',
        english: [
            'Want to go for a run together?',
            'I am going for a run tomorrow morning. Want to join?',
            'I have been running three times a week and it would be way more fun with a partner. What do you say?',
            "I know running is not everyone's cup of tea but hear me out. I started running a few months ago and it has completely changed my mood. I sleep better, I eat better, and I have way more energy during the day. The first two weeks were absolutely terrible. I could barely run for five minutes without feeling like I was going to die. But once I pushed through that initial phase, something clicked. Now I actually look forward to it. Weird, right? Anyway, I am looking for a running partner because it is hard to stay motivated alone. No pressure but I think you would enjoy it.",
        ],
        context: 'not everyone is cup of tea は「誰もが好きなわけではない」。hear me out は「聞いてくれ」。pushed through は「乗り越えた」。initial phase は「最初の段階」。no pressure は「プレッシャーはかけないけど」。running partner は「ランニング仲間」。英語の誘い方は理由を先に説明してから誘うのが自然。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'プロテイン飲んでる？',
        english: [
            'Do you take protein?',
            'Are you doing any protein shakes or supplements?',
            'I just ordered some protein powder online but I have no idea which flavor is good. Any recommendations?',
            "So I started taking protein shakes after my workouts and I feel like it actually makes a difference. My recovery time is way shorter and I do not feel as sore the next day. But the flavor situation is a disaster. I bought chocolate because I thought you cannot go wrong with chocolate. Wrong. It tasted like someone melted a tire and added cocoa powder. Then I tried vanilla and it was like drinking liquid chalk. My friend swears by this brand that supposedly tastes like birthday cake. I am skeptical but desperate enough to try it.",
        ],
        context: 'protein shakes は「プロテインシェイク」。supplements は「サプリメント」。recovery time は「回復時間」。you cannot go wrong with は「〜なら間違いない」。liquid chalk は「液体のチョーク」。swears by は「を絶対信頼している」。プロテインの味の不満は英語圏のジムあるある。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '体重が全然変わらない',
        english: [
            'The scale has not moved at all.',
            'I have been working out for a month and the number on the scale has not changed.',
            'I am working out four times a week and eating healthy but the scale will not budge. I am so frustrated.',
            "Can someone explain to me how I can be working out consistently, eating clean, drinking water, getting enough sleep, doing everything right, and still weigh exactly the same as I did two months ago? I know people say muscle weighs more than fat and the scale is not everything and just focus on how you feel. I get it. But when you are putting in that much effort, you want to see some kind of result. Even one pound would make me happy. Just give me something. I did not give up pizza and beer for nothing.",
        ],
        context: 'the scale は「体重計」。budge は「動く」。eating clean は「健康的な食事をしている」。muscle weighs more than fat は定番の慰めフレーズ。putting in effort は「努力している」。give up pizza は「ピザを我慢する」。日本語の「全然変わらない」の焦りと同じ感情が英語にもある。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'ストレッチ大事だよ',
        english: [
            'Make sure you stretch.',
            'You really need to stretch before and after. Trust me.',
            'I skipped stretching once and pulled a muscle. Worst week of my life. Never again.',
            "I used to be one of those people who thought stretching was a waste of time. Just get in, lift heavy, get out. That was my attitude. And then one day I bent over to pick up a dumbbell and something in my lower back just went pop. I could not stand up straight for a week. The doctor told me it was because my muscles were too tight from never stretching. Now I spend fifteen minutes stretching before every workout and honestly it has made a huge difference. My flexibility is better, I feel less sore, and I have not had any injuries since. Learn from my mistakes. Stretch.",
        ],
        context: 'stretch は「ストレッチする」。pulled a muscle は「筋肉を痛めた」。went pop は「ポキッと音がした」。flexibility は「柔軟性」。learn from my mistakes は「俺の失敗から学べ」。英語圏のジム文化でも stretching の重要性は常に議論される。skip stretching は後悔する人の定番フレーズ。',
        character: 'master', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '休む日も必要だよ',
        english: [
            'Rest days are important.',
            'You need to take rest days. Your body needs time to recover.',
            'I know it feels like you should go every day but that is actually counterproductive. Rest is part of the process.',
            "I learned this the hard way. When I first started working out, I went to the gym every single day because I thought more equals better. After about three weeks my body completely shut down. I was exhausted, my joints ached, I was getting sick, and I actually started getting weaker instead of stronger. My trainer told me that muscles grow during rest, not during the workout. The workout breaks the muscle down and rest is when it builds back up. Now I take two full rest days a week and my progress has been way better. More is not always more. Sometimes less is more.",
        ],
        context: 'rest days は「休息日」。counterproductive は「逆効果」。joints ached は「関節が痛んだ」。shut down は「機能停止した」。less is more は「少ないほうが良い」。muscles grow during rest は科学的にも正しいフレーズ。英語圏のフィットネス文化ではオーバートレーニングへの警告が多い。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'フォームが大事らしい',
        english: [
            'Form is everything.',
            'Focus on your form first. Weight comes later.',
            'I had a trainer fix my squat form and it was a completely different exercise. I had been doing it wrong for months.',
            "Here is the biggest mistake people make at the gym. They grab the heaviest weight they can find and start swinging it around with terrible form. All they are doing is setting themselves up for an injury. When I first started, I was ego lifting like everyone else. Then this older guy at the gym came up to me and said hey kid, lower the weight and do it right. I was annoyed at first but he showed me proper form for a deadlift and I realized I had been doing it completely wrong. Now I lift lighter but I actually feel it in the right muscles. Quality over quantity every time.",
        ],
        context: 'form は「フォーム(姿勢)」。ego lifting は「見栄を張って重いものを持つこと」。setting yourself up for は「自分から〜に向かっている」。proper form は「正しいフォーム」。quality over quantity は「量より質」。英語圏のジムでは form police(フォームを指摘する人)がいる。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '今日はサボりたい',
        english: [
            'I really do not feel like going today.',
            'I am thinking about skipping the gym today. I am so tired.',
            'Every fiber of my being is telling me to stay on the couch. The gym can wait one more day.',
            "I know I am going to regret it if I skip but right now the couch is calling my name and it is making a very compelling argument. I barely slept last night, it is raining outside, and there is a new episode of my favorite show waiting for me. Meanwhile the gym is a twenty-minute drive away and leg day is on the schedule. My brain is doing cost-benefit analysis and the couch is winning by a landslide. I know I will feel amazing after I go. I always do. But the gap between knowing that and actually getting up and going is approximately the size of the Grand Canyon.",
        ],
        context: 'skip は「サボる」。every fiber of my being は「全身全霊で」。compelling argument は「説得力のある主張」。cost-benefit analysis は「費用対効果分析」。by a landslide は「圧倒的に」。the couch is calling my name は「ソファが私を呼んでいる」。サボりたい気持ちの英語表現は世界共通の共感ネタ。',
        character: 'mina', category: 'request', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 116: チームを応援する (Cheering for Teams)
    // Scene: タケシがひいきチームの話をしたら全員のひいきチームが違って大論争。
    // ────────────────────────────────────────────────────

    {
        daySlot: 116, japanese: 'どこのファン？',
        english: [
            'Who do you root for?',
            'So who is your team? Who do you root for?',
            'I need to know which team you support before I decide if we can still be friends.',
            "This is an important question and it could potentially end our friendship depending on your answer. Who is your team? And I mean your real team. Not the team you started following last year because they were winning. Your actual day-one, ride-or-die, been-there-since-childhood team. Because I take this very seriously. I have ended relationships over sports allegiances. OK that is a lie. But I have strongly considered it. So choose your next words carefully.",
        ],
        context: 'root for は「応援する」。アメリカ英語。イギリスでは support。day-one は「最初からの」。ride-or-die は「何があっても一緒」。allegiance は「忠誠」。Who do you root for? は英語圏で友達になるときの重要質問。日本語の「どこのファン？」よりずっと重い意味を持つことがある。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'にわかファンじゃないよ',
        english: [
            'I am not a bandwagon fan.',
            'I have been a fan since way before they were good.',
            'I supported this team through their worst years. I earned the right to celebrate now.',
            "Do not call me a bandwagon fan. I sat through seven losing seasons. Seven. I watched this team lose a hundred games a year while all my friends were making fun of me. I bought tickets to games where there were more empty seats than fans. I wore my jersey to school and got roasted for it daily. And now that they are finally winning, people want to act like they have been fans the whole time? No. I was here when it was embarrassing. I was here when nobody cared. That is what real fandom looks like. Bandwagon fans could never.",
        ],
        context: 'bandwagon fan は「にわかファン」。bandwagon は「勝ち馬に乗る」意味。sat through は「耐えて見続けた」。losing season は「負け越しシーズン」。got roasted は「いじられた」。could never は「絶対にできない」。英語圏では bandwagon 呼ばわりされるのは最大の侮辱。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '声援がすごかった',
        english: [
            'The crowd was electric.',
            'The energy in the stadium was absolutely electric.',
            'I have never heard a crowd that loud. The atmosphere was unlike anything I have ever experienced.',
            "I am telling you, the atmosphere at that game was something else. From the moment we walked in, you could feel the energy building. And then when the teams came out, the noise was deafening. I could feel the vibrations in my chest. Sixty thousand people all screaming at the same time creates this wall of sound that you cannot describe unless you have experienced it. At one point during the game the whole stadium was doing this chant in unison and it honestly gave me chills. That is the power of sports. Strangers becoming one for ninety minutes.",
        ],
        context: 'electric は「電気が走るような興奮」。deafening は「耳が聞こえなくなるほどの」。wall of sound は「音の壁」。in unison は「一斉に」。日本語の「声援がすごかった」は英語では the crowd was electric と表現する。crowd(群衆)を主語にするのが英語の特徴。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '今年こそ優勝してほしい',
        english: [
            'I hope they win it all this year.',
            'This is our year. I can feel it.',
            'If they do not win it all this year with this roster, I do not know what else they need.',
            "Every single year I tell myself this is the year. And every single year I get my heart broken. But this year feels genuinely different. The pieces are all there. The offense is clicking, the defense is solid, and they have the deepest bench they have had in a decade. If they stay healthy and the coaching staff does not overthink things, I really believe they can do it. But I also believed that in 2019 and 2021 and 2023 so maybe my judgment is not the most reliable. Still. This is the year. I refuse to stop believing until they are mathematically eliminated.",
        ],
        context: 'win it all は「全部勝つ(優勝する)」。the pieces are all there は「パズルのピースが全部揃った」。clicking は「噛み合っている」。mathematically eliminated は「数学的に可能性がなくなった」。this is our year は毎年言うのに毎年裏切られるファンの定番フレーズ。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'あのチームだけは嫌い',
        english: [
            'I cannot stand that team.',
            'I hate that team with every fiber of my being.',
            'If there is one team in this league I want to see fail, it is them. I do not even have a logical reason.',
            "You want to know the funny thing about my hatred for that team? I cannot even explain why I hate them. They have never done anything to me personally. Some of their players seem like nice people. Their fans are probably fine human beings. But the moment I see those uniforms on TV, something primal takes over and I want them to lose by a hundred points. It is completely irrational and I know that. But it has been this way since I was a kid and at this point it is just part of my identity. Hating that team brings me together with other people who also hate that team. It is a community built on shared negativity. Beautiful, really.",
        ],
        context: 'cannot stand は「我慢できない」。with every fiber of my being は「全身全霊で」。primal は「本能的な」。irrational は「非合理的」。shared negativity は「共有された否定感情」のジョーク。英語圏のスポーツ文化ではライバルチームへの hatred は friendship の基盤になる。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '子供の頃からファンなんだ',
        english: [
            'I have been a fan since I was a kid.',
            'I grew up watching this team with my dad. It is in my blood.',
            'My earliest memory is sitting on my dad is lap watching this team play on a tiny TV in the living room.',
            "Being a fan of this team is not something I chose. It was decided for me before I was born. My grandfather was a fan. My father was a fan. I came out of the womb wearing their colors. It is literally genetic at this point. My first words were apparently the team name. My dad used to take me to games when I was little and those are some of the best memories of my childhood. Even now, every time I watch them play, I think of my dad. Sports are about so much more than winning and losing. They are about family, tradition, and the stories we pass down through generations.",
        ],
        context: 'it is in my blood は「血に流れている」。came out of the womb は「生まれた瞬間から」(大げさな表現)。pass down は「受け継ぐ」。through generations は「世代を超えて」。英語圏ではスポーツチームのファンであることを「遺伝」や「家族の伝統」として語るのがとても一般的。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'ユニフォーム買っちゃった',
        english: [
            'I just bought a jersey.',
            'I could not resist. I bought the new jersey.',
            'They released the new home jersey and I ordered it within five minutes. No regrets.',
            "I told myself I was not going to buy another jersey this year. I already have like eight of them hanging in my closet. But then they released the new design and it was so clean I could not help myself. I was on the website refreshing the page thirty minutes before it dropped and I checked out before the page even finished loading. It was a hundred and twenty dollars that I absolutely did not need to spend. My partner gave me that look when the package arrived. You know the look. The one that says I love you but you have a problem. And they are right. I do have a problem. But it is a beautiful problem.",
        ],
        context: 'jersey は「ユニフォーム」(英語圏ではjersey)。clean は「かっこいい」のスラング。dropped は「発売された」。checked out は「購入手続きした」。that look は「あの顔」。you have a problem は「依存症がある」のジョーク。ユニフォームの衝動買いは英語圏のスポーツファンあるある。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '移籍しないでほしい',
        english: [
            'I hope he does not leave the team.',
            'If he gets traded I am going to be devastated.',
            'There are rumors he might leave and I honestly do not know how to handle that emotionally.',
            "Every time trade deadline season comes around I get anxiety. Because you never know when your favorite player is going to be shipped off to some random team on the other side of the country. I have been through it three times now and it never gets easier. You invest years of emotional energy into cheering for this person and then one day you wake up and they are wearing a different uniform. It feels like a breakup. You know it is just business but it still hurts. And the worst part is when they go to a rival team. That is not a breakup. That is betrayal.",
        ],
        context: 'traded は「トレードされた」。trade deadline は「トレード期限」。shipped off は「送り出された」。breakup は「別れ」。betrayal は「裏切り」。英語圏では選手の移籍を breakup に例えるのが一般的。日本語の「移籍」より感情的な表現が多い。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '応援歌一緒に歌おう',
        english: [
            'Let us sing the fight song!',
            'Come on, everyone! Let us sing the chant together!',
            'I do not care if you do not know the words. Just sing loud and pretend you do.',
            "OK the song is coming on. Everybody up. I do not want to hear any excuses. You are at the game, you are wearing the colors, you are singing the song. I do not care if you just became a fan five minutes ago. Open your mouth and let sound come out. That is all I ask. The words are on the screen anyway. And even if they were not, half the stadium does not know the words either. They just mumble through the verses and then scream the chorus. That is perfectly acceptable. Sports chanting is not about talent. It is about volume and enthusiasm.",
        ],
        context: 'fight song は「応援歌」。chant は「チャント」。mumble は「もごもご歌う」。verses は「歌詞のAメロ部分」。chorus は「サビ」。volume は「声量」。英語圏のスポーツ応援歌は歌詞を知らなくてもノリで参加するのが正解。fight song はアメリカの大学スポーツ文化から来た表現。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'スポーツは平和だよね',
        english: [
            'Sports bring people together.',
            'No matter what is going on in the world, sports can still unite people.',
            'I love that sports can make complete strangers high-five each other like old friends.',
            "You know what I love about sports? For ninety minutes or three hours or however long the game is, nothing else matters. Your job does not matter. Your problems do not matter. Your political views do not matter. Everyone in that stadium is just a fan. You are high-fiving strangers, hugging people you have never met, sharing food with the person sitting next to you. I have had full conversations with random people at games and we are best friends for those three hours. Then the game ends and we go back to our lives and probably never see each other again. But for that brief moment, we were connected by something bigger than ourselves. That is what sports can do.",
        ],
        context: 'bring people together は「人を結びつける」。unite は「団結させる」。high-five は「ハイタッチ」(英語ではhigh-five)。connected by something bigger は「もっと大きなもので繋がった」。strangers は「見知らぬ人」。日本語の「平和」は英語では bring together や unite で表現する。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 117: スポーツニュース (Sports News)
    // Scene: ケンジがスマホでスポーツニュースを読み上げる。全員が食いつく。
    // ────────────────────────────────────────────────────

    {
        daySlot: 117, japanese: 'トレードされたらしいよ',
        english: [
            'He just got traded.',
            'Did you hear? He got traded this morning.',
            'I woke up to the news that he got traded and I have been in a bad mood all day.',
            "I cannot believe it. I actually cannot believe it. They traded him. After everything he did for this team, after all the records he broke, after he said in an interview last week that he wanted to stay forever, they just traded him like he meant nothing. I found out from a push notification at seven AM and I have not been the same since. I called in sick to work. That is how upset I am. My boss asked what was wrong and I said personal reasons. And it is personal. Very personal. This man was my hero and they threw him away like a used napkin.",
        ],
        context: 'got traded は「トレードされた」。push notification は「通知」。called in sick は「病欠の電話をした」。threw him away は「捨てた」。used napkin は「使用済みナプキン」。英語圏ではスポーツ選手のトレードニュースに対する感情的な反応が非常に大きい。personal reasons は仕事を休む定番の理由。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '怪我したって',
        english: [
            'He got injured.',
            'Bad news. He is out with an injury.',
            'They just announced he tore his ACL. He is done for the season.',
            "This is the worst possible news. He went down in practice yesterday and they just confirmed it is a torn ACL. That means he is out for at least eight months, which means he misses the entire rest of the season and probably the beginning of next season too. This was supposed to be our year. We finally had the team to make a run and now our best player is sitting on the bench in a knee brace. I know injuries are part of sports but why does it always have to be our best player? Why can it never be someone from the other team? I know that is a terrible thing to say but I am not thinking rationally right now.",
        ],
        context: 'tore his ACL は「前十字靭帯を断裂した」。ACL(anterior cruciate ligament)はスポーツで最も恐れられる怪我。out for the season は「シーズン絶望」。make a run は「優勝を目指す」。knee brace は「膝のサポーター」。英語のスポーツニュースでは injury report が最も注目される情報。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'FA(フリーエージェント)になるらしい',
        english: [
            'He is becoming a free agent.',
            'His contract is up. He is going to be a free agent.',
            'He is hitting free agency this winter and every team in the league is going to be after him.',
            "Free agency is the most stressful time of the year for fans. Because you have no control over what happens. Your favorite player's contract expires and suddenly every team with money starts circling like sharks. And all you can do is sit there refreshing Twitter waiting for someone to report which team he visited. The worst part is the uncertainty. One reporter says he is staying. Another reporter says he is leaving. Then a third reporter says actually nobody knows anything. It is emotional torture. I have a Google alert set up for his name and every time my phone buzzes I get heart palpitations.",
        ],
        context: 'free agent は「フリーエージェント」。contract is up は「契約が切れた」。circling like sharks は「サメのように周りを回っている」。heart palpitations は「動悸」。Google alert は「検索アラート」。FA は英語でも free agency と言う。日本語のFAと同じ概念だが英語圏はもっとドラマチックに語る。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '新記録出たんだって',
        english: [
            'He just set a new record.',
            'Did you see? He broke the all-time record last night.',
            'He did it. He finally broke the record that has stood for thirty years. I witnessed history.',
            "I still have goosebumps thinking about it. That record has stood for thirty-two years. Thirty-two years. People said it was unbreakable. Analysts said the game had changed too much. Former players said nobody would ever come close. And then last night in front of a sold-out crowd, he broke it like it was nothing. The whole stadium stood up and gave him a five-minute standing ovation. Even the opposing team's players were clapping. His teammates picked him up and carried him off the field. I was watching at home and I literally stood up in my living room and clapped. Alone. In my apartment. At a TV screen. No shame.",
        ],
        context: 'set a record は「記録を作った」。broke the record は「記録を破った」。all-time record は「歴代記録」。stood for は「続いていた」。standing ovation は「スタンディングオベーション」。sold-out は「完売」。英語圏では記録破りの瞬間を I witnessed history(歴史の目撃者)と表現する。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '引退するってニュースで見た',
        english: [
            'I saw he is retiring.',
            'He just announced his retirement. End of an era.',
            'I cannot believe he is actually retiring. It does not feel real yet.',
            "I knew this day would come eventually but I was not ready for it. He posted a video on Instagram announcing his retirement and I watched it four times. By the third time I was crying. This man has been a part of my life for fifteen years. I grew up watching him play. He was the reason I fell in love with this sport. And now he is done. I know athletes cannot play forever. Bodies break down. Younger players come along. But there is something about watching your childhood hero walk away that makes you feel the passage of time in a way nothing else does. An era just ended and I need a moment.",
        ],
        context: 'end of an era は「一つの時代の終わり」。retirement は「引退」。passage of time は「時の流れ」。walk away は「去る」。I need a moment は「ちょっと時間が必要」。英語圏では選手の引退発表は Instagram や Twitter で行われることが多い。end of an era は必ず使われるフレーズ。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'ドラフト誰取るかな',
        english: [
            'I wonder who they will draft.',
            'Draft night is coming up. Who do you think they will pick?',
            'If they do not draft that quarterback with the first pick, I am going to lose my mind.',
            "Draft season is better than the actual season in my opinion. The potential is infinite. Every team thinks they are one pick away from greatness. The mock drafts, the rumors, the last-minute trades. It is like a reality show but with actual consequences. I have been watching tape on the top prospects for weeks and I have my own list of who I think we should take. Nobody asked for my list but I have it anyway. Watch us take the one player I specifically said not to take. That is how it always goes. The front office has never once consulted me and frankly their results show.",
        ],
        context: 'draft は「ドラフト」。mock drafts は「模擬ドラフト」。prospects は「有望選手」。watching tape は「映像を研究する」。front office は「フロント(経営陣)」。their results show は「その結果が物語っている」。英語圏のドラフト文化は日本よりイベント性が高く、テレビ中継される。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '移籍金すごい額だね',
        english: [
            'The transfer fee is insane.',
            'They paid how much? That is an absurd amount of money.',
            'Two hundred million for one player. The economics of professional sports make no sense to me.',
            "I saw the transfer fee and I honestly had to read the number three times because I thought there was a typo. Two hundred million dollars. For one human being who kicks a ball. I am not saying he is not talented. He is clearly the best player in the world. But two hundred million? That is more than the GDP of some small countries. My entire neighborhood could retire on that money. Every time I hear these numbers I have a small existential crisis about my life choices. I went to college for four years and I make what this guy makes in a single afternoon practice. Professional sports economics exist in a completely different universe from the rest of us.",
        ],
        context: 'transfer fee は「移籍金」。absurd は「馬鹿げた」。GDP は「国内総生産」。existential crisis は「存在の危機」。life choices は「人生の選択」。英語圏では選手の年俸や移籍金の話題はスポーツニュースの定番。absurd amount of money は定番の反応フレーズ。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'オフシーズンが暇すぎる',
        english: [
            'The off-season is so boring.',
            'I hate the off-season. I do not know what to do with myself.',
            'The season ended last month and I have already watched every highlight from the past ten years.',
            "The off-season is genuinely the worst three months of my life every year. I have nothing to look forward to. No games on the weekend, no midweek matches, no highlight shows, no post-game analysis to argue about. I tried watching other sports to fill the void but it is not the same. My partner is thrilled because I am finally available on weekends but I am miserable. I have reorganized my jersey collection twice, rewatched every classic game from the last decade, and started ranking every player who has ever played for my team in a spreadsheet. That last one might be a cry for help.",
        ],
        context: 'off-season は「シーズンオフ」。fill the void は「空虚を埋める」。thrilled は「喜んでいる」。miserable は「惨めな」。a cry for help は「助けを求めるサイン」のジョーク。英語圏では off-season の退屈さをネタにするのがスポーツファンの定番ユーモア。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'ネットの反応がすごい',
        english: [
            'The internet is going crazy.',
            'Social media is absolutely melting down over this.',
            'I have been scrolling through reactions for an hour and I cannot stop. The memes are incredible.',
            "Within five minutes of the news breaking, Twitter had already produced approximately ten thousand memes and they were all hilarious. The internet works so fast now that by the time I finished reading the article, there were already three trending hashtags and a Wikipedia edit. Someone made a meme comparing the trade to a betrayal scene from Game of Thrones and it already had fifty thousand likes. The comment section on the team's Instagram post is absolute chaos. Fans are posting paragraph-long breakup letters to the player. Some of them are genuinely poetic. The internet in crisis mode is the funniest version of the internet.",
        ],
        context: 'melting down は「大炎上している」。memes は「ミーム(ネタ画像)」。trending hashtags は「トレンドのハッシュタグ」。Wikipedia edit は「Wikipedia編集」(速報でWikipediaが書き換えられるジョーク)。breakup letters は「別れの手紙」。英語圏のスポーツニュースへのネット反応は日本より数倍激しい。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '解説者の意見ってあてにならない',
        english: [
            'Pundits are always wrong.',
            'Sports analysts never get anything right. I trust my own instincts more.',
            'Every expert predicted the opposite of what actually happened. Maybe they should just flip a coin.',
            "I have a theory that being a sports analyst is the only job where you can be wrong ninety percent of the time and still keep your job. Every year before the season starts, they make their bold predictions with complete confidence. This team will win the championship. This player will have a breakout season. This coach will be fired by December. And then the season happens and literally none of it comes true. Not one prediction. And then the next year they come back and do the same thing. No accountability whatsoever. I could replace them with a random number generator and get better results. Actually, a monkey throwing darts at a board would probably be more accurate.",
        ],
        context: 'pundits は「解説者・評論家」。analysts は「アナリスト」。bold predictions は「大胆な予測」。breakout season は「ブレイクのシーズン」。accountability は「説明責任」。flip a coin は「コインを投げる」。英語圏ではスポーツ解説者への不信感が shared joke として定着している。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 118: イベントに行く (Going to Events)
    // Scene: ユキが音楽フェスの計画を立てている。全員を巻き込もうとする。
    // ────────────────────────────────────────────────────

    {
        daySlot: 118, japanese: 'フェスに行きたい',
        english: [
            'I want to go to a festival.',
            'There is a music festival next month and I really want to go.',
            'I have never been to a proper outdoor festival and this summer I am finally making it happen.',
            "I have been talking about going to a music festival for literally five years and every year something comes up. Last year it was work. The year before that it was money. Before that I just could not find anyone to go with. But this year I am putting my foot down. I already requested the days off. I am saving up for the tickets. And I do not care if I have to go alone. I am going. Life is too short to keep putting things off. I want to stand in a field with thousands of people and listen to live music under the stars. That is not a lot to ask.",
        ],
        context: 'putting my foot down は「断固として決める」。something comes up は「何かが起きる」。requested days off は「休みを申請した」。saving up は「貯金している」。putting things off は「先延ばしにする」。英語圏の music festival 文化は日本のフェスより大規模で数日間のキャンプ形式が多い。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: 'チケット取れた！',
        english: [
            'I got tickets!',
            'I just got tickets! I cannot believe it!',
            'I was in the online queue for forty-five minutes and I somehow managed to get tickets. I am shaking.',
            "I got the tickets. I actually got them. You have no idea how stressful that was. I had three devices open. My laptop, my phone, and my tablet. All of them in the queue at the same time. My laptop crashed at minute twenty. My tablet gave me an error message. And my phone, my beautiful phone, got through with two seconds to spare. I screamed so loud my cat fell off the table. I immediately took a screenshot because I did not trust that it actually happened. The tickets were a hundred and fifty dollars each which is insane but I do not care. I would have paid double. Some things are worth every penny.",
        ],
        context: 'online queue は「オンラインの待ち列」。with two seconds to spare は「残り2秒で」。screenshot は「スクリーンショット」。worth every penny は「1円も無駄ではない」。英語圏ではチケット争奪戦の話は共感度が非常に高い。multiple devices は定番の戦略。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '何持っていけばいい？',
        english: [
            'What should I bring?',
            'What do I need to bring? This is my first festival.',
            'I am making a packing list but I have no idea what I actually need. Any tips from people who have been before?',
            "OK I need practical advice from people who have actually been to an outdoor festival. What do I need to bring? I know the obvious stuff like sunscreen and water. But what about the stuff nobody tells you about? Do I need a portable charger? What kind of shoes should I wear? Is there food there or should I bring my own? What about a blanket or a foldable chair? Rain gear? I live in fear of being the person who shows up completely unprepared and spends the whole time uncomfortable. I want to enjoy the music, not worry about logistics. Help me out here.",
        ],
        context: 'packing list は「持ち物リスト」。portable charger は「モバイルバッテリー」。rain gear は「雨具」。logistics は「段取り」。help me out は「助けて」。英語圏のフェスでは comfortable shoes と sunscreen が最重要アドバイス。nobody tells you about は「誰も教えてくれない」情報を求めるフレーズ。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '一緒に行かない？',
        english: [
            'Want to come with me?',
            'I have an extra ticket. Do you want to come?',
            'I think you would love it. Let me know if you want to go and I will grab you a ticket.',
            "So I know you said you are not really into live events but I think that is because you have never been to a good one. This festival has your favorite band headlining on Saturday night. I checked the lineup and there are at least five acts you would love. The weather forecast looks perfect. And I already found a hotel nearby that is actually affordable. I am not going to pressure you but I will say this. Every person I have ever taken to their first festival has said it was one of the best experiences of their life. Not one exception. Think about it. But do not think too long because tickets are selling out fast.",
        ],
        context: 'headlining は「ヘッドライナーとして出演する」。lineup は「出演者リスト」。acts は「出演者」。I am not going to pressure you は「プレッシャーはかけないけど」と言いながら実質かけている。selling out は「売り切れる」。英語の誘い方は情報を並べてから相手に判断させるスタイルが多い。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '人が多すぎて大変だった',
        english: [
            'It was so crowded.',
            'The crowd was insane. I could barely move.',
            'I have never seen that many people in one place. It took thirty minutes just to get from one stage to another.',
            "I am going to be honest. The crowd situation was overwhelming. When the headliner came on, the entire field compressed into this tiny area and I was literally squeezed between strangers on all sides. I could not raise my arms. I could not turn around. At one point someone stepped on my foot so hard I thought something was broken. And getting to the bathroom? Forget about it. The line was forty minutes long. By the time I got back the song I wanted to hear was already over. Next time I am staying in the back where there is room to breathe. The sound is fine from there and I get to keep my personal space.",
        ],
        context: 'crowded は「混んでいる」。compressed は「圧縮された」。squeezed は「押しつぶされた」。personal space は「パーソナルスペース」。overwhelming は「圧倒される」。英語圏のフェスでは crowd management(群衆管理)が大きな話題。I could barely move は定番の不満フレーズ。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '開場は何時？',
        english: [
            'What time do doors open?',
            'When do the doors open? I want to get there early.',
            'If doors open at two I want to be in line by noon. I am not missing the opening act.',
            "OK let me look this up. Doors open at two but the first act does not start until three. So we have an hour to find a good spot, get settled, and grab food before the music starts. I would say we should get there by one at the latest because the line is going to be ridiculous. Last year my friend went to this same venue and she said by three PM the line was wrapped around the building twice. I am not standing in line for two hours. I would rather get there early and chill inside. Plus the good spots near the stage go fast. If we want to be anywhere near the front, we need to be early.",
        ],
        context: 'doors open は「開場する」。in line は「列に並ぶ」。opening act は「前座」。get settled は「落ち着く」。wrapped around は「(列が建物を)ぐるっと取り囲んだ」。英語圏では What time do doors open? がイベントの最重要質問。日本語の「開場」と「開演」の区別は英語でも doors open と show starts で分ける。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '物販の列がやばかった',
        english: [
            'The merch line was crazy long.',
            'I waited in the merch line for over an hour.',
            'By the time I got to the front of the merch line, half the stuff was already sold out.',
            "The merchandise situation at this event was a complete disaster. I got in line the moment I walked in and it still took me an hour and fifteen minutes to get to the front. An hour and fifteen minutes of standing in a line that barely moved. And when I finally got there, the shirt I wanted was sold out in my size. They had medium and triple XL. That is it. Who plans inventory like that? I ended up buying a keychain for twenty dollars because I felt like I had to buy something after waiting that long. Twenty dollars for a keychain. That is highway robbery but I was too emotionally invested in the line to walk away empty-handed.",
        ],
        context: 'merch line は「グッズ販売の列」。sold out は「売り切れ」。inventory は「在庫」。highway robbery は「ぼったくり」。empty-handed は「手ぶらで」。emotionally invested は「感情的に投資した」。英語圏のイベント物販問題は日本とまったく同じ。sold out in my size は世界共通の悲劇。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '帰りの電車混みそうだな',
        english: [
            'The train home is going to be packed.',
            'We should leave a little early to avoid the rush.',
            'Last time I went to an event here it took me two hours to get home because the trains were so packed.',
            "Here is the dilemma. Do we stay for the last song and deal with the absolute nightmare that is getting home? Or do we leave fifteen minutes early and get on a train that actually has breathing room? Every time I stay for the last song I regret it. Last time I was sardined into a train car with my face pressed against a stranger's backpack for forty-five minutes. I could not move. I could not breathe. Someone's elbow was in my ribs. By the time I got home I was so exhausted from the commute that the high from the concert had completely worn off. Next time I am booking a hotel nearby. I do not care what it costs.",
        ],
        context: 'packed は「満員の」。sardined は「サーディン(イワシ)のように詰め込まれた」。breathing room は「息をする余裕」。worn off は「消えた」。the high は「興奮・高揚感」。英語では packed like sardines(イワシの缶詰のように詰め込まれた)が定番表現。日本語の「すし詰め」と同じ発想。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '写真いっぱい撮った',
        english: [
            'I took so many photos.',
            'My camera roll is full. I took like three hundred photos.',
            'I was trying to live in the moment but I also wanted to document everything so I was doing both poorly.',
            "I took approximately four hundred photos and two hundred videos and when I looked at them later, about three of them were usable. The rest are blurry close-ups of someone's head, dark shots where you cannot see anything, or videos where you can hear me screaming but the actual music is completely drowned out by the crowd noise. I spent the whole concert looking at it through my phone screen instead of my actual eyes. Someone on the internet said put your phone away and just experience it. And they are right. But also how am I supposed to prove I was there if I do not have photographic evidence? Social media has ruined my ability to just enjoy things.",
        ],
        context: 'camera roll は「カメラロール」。live in the moment は「今を生きる」。document は「記録する」。drowned out は「かき消された」。photographic evidence は「写真の証拠」。英語圏でも「スマホで撮るか今を楽しむか」問題は大きな議論テーマ。put your phone away は定番の忠告。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '来年も絶対行く',
        english: [
            'I am definitely going again next year.',
            'I am already planning for next year. That was too good to miss.',
            'I do not care what it costs or what I have to rearrange. I am going to this event every single year from now on.',
            "That was honestly one of the best experiences of my entire life and I am not being dramatic. From the moment I walked through the gates to the moment I dragged my exhausted body home, every second was worth it. The music was incredible. The atmosphere was electric. The food was surprisingly good. Even the weather cooperated. I have already marked the dates on my calendar for next year. I am going to set up a savings account specifically for this event. Monthly deposits starting now. By the time tickets go on sale I will have enough for VIP because I never want to stand in a regular line again. This is my new annual tradition. Non-negotiable.",
        ],
        context: 'rearrange は「予定を組み直す」。walked through the gates は「ゲートをくぐった」。cooperated は「味方した(天気が)」。non-negotiable は「交渉の余地なし」。annual tradition は「年間行事」。VIP は「VIPチケット」。英語圏では annual tradition(毎年の恒例行事)を宣言するのが感動体験後の定番フレーズ。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 119: 趣味を深める (Deep Diving into Hobbies)
    // Scene: 居酒屋で全員が自分のハマっている趣味を語り出す。意外な一面が見える。
    // ────────────────────────────────────────────────────

    {
        daySlot: 119, japanese: 'どんどんハマっていく',
        english: [
            'I keep getting more into it.',
            'The more I learn about it, the more obsessed I get.',
            'It started as a casual interest and now it has completely taken over my life.',
            "It is funny how hobbies work. You start by watching one YouTube video out of curiosity. Then you watch another. Then you are reading forums at two AM. Then you are buying equipment you definitely do not need. Then you are joining online communities and arguing with strangers about techniques. And before you know it, your entire personality has shifted and this thing that you discovered three months ago is now the most important part of your day. I do not know if that is passion or addiction but either way I am not fighting it. I am fully committed at this point.",
        ],
        context: 'getting more into it は「もっとハマっていく」。taken over は「支配した」。out of curiosity は「好奇心で」。forums は「掲示板」。arguing with strangers は「見知らぬ人と議論する」。日本語の「ハマる」は段階があるけど、英語では got into → obsessed → taken over my life と escalation で表現する。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '道具にこだわり始めた',
        english: [
            'I have started caring about the gear.',
            'I went from cheap equipment to researching high-end gear obsessively.',
            'I spent three hours last night reading reviews on a piece of equipment that costs more than my phone.',
            "This is the dangerous phase of any hobby. The gear phase. You start with whatever basic equipment you can find and it works fine. But then you see what the professionals use and you start wondering if better gear would make you better. It will not. You know it will not. But you convince yourself it will. So you spend four hours reading comparison reviews and watching unboxing videos and eventually you buy something that costs five times more than what you had. And you know what? It does feel slightly better. Like maybe two percent better. But that two percent cost you three hundred dollars. Worth it? Absolutely not. Am I going to do it again? Absolutely yes.",
        ],
        context: 'gear は「道具・装備」。high-end は「高級な」。comparison reviews は「比較レビュー」。unboxing videos は「開封動画」。convince yourself は「自分を納得させる」。the gear phase は趣味の深みにハマる段階を指す英語圏の概念。日本語の「沼」に近いが、英語では rabbit hole とも言う。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: 'YouTube で独学してる',
        english: [
            'I am learning from YouTube.',
            'YouTube has been my teacher. I have learned everything from videos.',
            'I do not have a formal teacher but honestly the free content on YouTube is better than most paid courses.',
            "We are living in the golden age of self-education and people do not appreciate it enough. Whatever you want to learn, there is a YouTube video for it. For free. In HD. With step-by-step instructions. I learned how to do this entirely from a channel run by some guy in his garage and he is a better teacher than any professor I had in college. He explains things clearly, he shows every mistake he made along the way, and he does not try to sell you anything. I have learned more in six months of YouTube than I learned in four years of formal education. The internet is beautiful sometimes.",
        ],
        context: 'self-education は「独学」。golden age は「黄金時代」。step-by-step は「段階的な」。along the way は「その過程で」。formal education は「正規の教育」。英語圏では YouTube 独学を self-taught と表現する。I am self-taught は趣味の話で最も使われるフレーズの一つ。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '仲間が見つかった',
        english: [
            'I found people who share the same hobby.',
            'I joined a local group and it has been amazing meeting like-minded people.',
            'For years I thought I was the only person into this and then I found a whole community online.',
            "You know that feeling when you think your hobby is too niche for anyone else to care about? And then you discover an entire community of thousands of people who are just as passionate as you? That happened to me last month. I found this subreddit with fifty thousand members who are all into the exact same thing. They share tips, post their work, give feedback, and organize meetups. I went to my first meetup last week and it was like meeting my long-lost family. We talked for four hours straight and I did not check my phone once. Finding your people is one of the best feelings in the world.",
        ],
        context: 'like-minded は「同じ考えの」。niche は「ニッチ(マニアックな)」。subreddit は「Redditのスレッド」。meetups は「オフ会」。finding your people は「自分の仲間を見つける」。英語圏では趣味の community(コミュニティ)を見つけることが人生を変えるきっかけとして語られる。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '沼にハマった',
        english: [
            'I fell down a rabbit hole.',
            'I am in way too deep at this point. There is no coming back.',
            'What started as a minor interest has become a full-blown obsession. I think I need an intervention.',
            "People keep asking me when I am going to move on to something else and the answer is never. I am in too deep. I have invested too much time, money, and emotional energy to walk away now. That is the sunk cost fallacy talking and I do not care. Some people collect shoes. Some people collect watches. I collect increasingly specific knowledge about something that has zero practical application in real life. And I am happier than I have ever been. Is that weird? Probably. But I have accepted that this is who I am now. My identity has merged with this hobby and I am completely at peace with it.",
        ],
        context: 'fell down a rabbit hole は「沼にハマった」。不思議の国のアリスが語源。full-blown は「本格的な」。intervention は「介入(依存症の治療で使う)」。sunk cost fallacy は「サンクコスト(埋没費用)の誤り」。rabbit hole は英語圏で最も使われる「沼」の表現。日本語の「沼」と完全に同じ概念。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '上達してきた気がする',
        english: [
            'I feel like I am getting better.',
            'I can actually see improvement now. It is a great feeling.',
            'I compared something I made six months ago to what I can do now and the difference is huge.',
            "There is nothing more satisfying than looking at your own progress over time. When I first started, I was terrible. Like genuinely embarrassingly bad. I almost quit multiple times because I thought I had no talent. But I kept showing up. Every day. Even when I did not feel like it. And slowly, almost imperceptibly, I got better. The improvement is not linear. Some weeks I felt like I was going backward. But when I compare where I am now to where I was six months ago, the gap is enormous. I printed out my first attempt and stuck it on my wall as a reminder that everyone starts somewhere. Talent is just practice that people do not see.",
        ],
        context: 'improvement は「上達」。imperceptibly は「気づかないくらいゆっくり」。linear は「直線的な」。going backward は「後退している」。talent is just practice that people do not see は名言的な表現。英語圏では progress(進歩)を語るとき before and after の比較が好まれる。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '教えてくれない？',
        english: [
            'Can you teach me?',
            'I have always wanted to try that. Would you mind teaching me the basics?',
            'I know you are really into this. If you have time sometime, I would love to learn from you.',
            "I have been watching you talk about this for months and your enthusiasm is genuinely contagious. I went from thinking it sounded boring to being legitimately curious. Would you be willing to show me the basics sometime? I do not need you to turn me into an expert. I just want to understand enough to appreciate what you are doing. And honestly, teaching someone else is supposed to help you get better too. So really I am doing you a favor by asking you to teach me. That is how I am choosing to frame this. You are welcome.",
        ],
        context: 'would you mind は「してくれませんか」の丁寧表現。contagious は「伝染する」。frame は「(状況を)捉える」。you are welcome は「どういたしまして」の皮肉版。英語では hobby を教えてもらうとき I would love to learn from you と言うとお世辞も含まれて好印象。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '趣味にお金かけすぎかな',
        english: [
            'I think I spend too much on this hobby.',
            'My hobby expenses are getting out of hand.',
            'I did the math on how much I have spent on this hobby this year and I am choosing not to think about it.',
            "Let me give you the honest accounting. In the last twelve months, I have spent roughly four thousand dollars on this hobby. That includes equipment, materials, books, online courses, and one very questionable impulse purchase at three AM that I am still trying to justify. My partner asked me to create a budget and I did. Then I exceeded it by month two. So I created a new budget. Exceeded that one too. Now we have a rule where anything over a hundred dollars requires a twenty-four-hour cooling-off period before purchase. I have learned to just add things to my cart and wait. About half the time I still buy them. Progress is slow but it is progress.",
        ],
        context: 'getting out of hand は「手に負えなくなっている」。impulse purchase は「衝動買い」。cooling-off period は「冷却期間」。exceeded は「超えた」。cart は「(ネットの)カート」。progress is slow but it is progress は自虐的ユーモア。英語圏では hobby spending の告白が friendship bonding のネタになる。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '結局続かないんだよね',
        english: [
            'I never stick with anything.',
            'I always start strong but I lose interest after a few weeks.',
            'My hobby history is a graveyard of abandoned interests. I have tried everything and finished nothing.',
            "I am what you call a serial hobbyist. I get intensely passionate about something for approximately three weeks and then my brain decides it is time for something new. In the last two years I have tried guitar, painting, photography, rock climbing, pottery, coding, chess, and bread baking. I own equipment for all of them. I am good at none of them. My garage looks like a hobby store had an explosion. Everyone tells me to just pick one and commit but my brain does not work that way. The excitement of starting something new is like a drug and the moment that initial excitement fades, I am already researching my next thing. I have accepted this about myself.",
        ],
        context: 'stick with は「続ける」。serial hobbyist は「趣味を次々に変える人」。graveyard は「墓場」。abandoned は「放棄された」。commit は「コミットする」。initial excitement fades は「最初の興奮が薄れる」。英語では hobby hopping(趣味を転々とする)や shiny object syndrome とも呼ばれる現象。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '趣味があるって大事だよ',
        english: [
            'Having a hobby is important.',
            'Everyone needs something that is just for them. Not for work, not for anyone else.',
            'My hobby keeps me sane. Without it, I think I would go crazy from just working and sleeping.',
            "I genuinely believe that having a hobby you are passionate about is one of the most important things for mental health. And I do not mean scrolling through social media or watching TV. I mean something that requires your full attention. Something that makes you lose track of time. Something that challenges you and rewards your effort. When I am doing my hobby, I do not think about work. I do not check my phone. I do not worry about deadlines or bills or anything. For those two hours, my brain is completely present. And when I come back to reality, I feel refreshed. It is like a reset button for your mind. Everyone deserves that.",
        ],
        context: 'keeps me sane は「正気を保ってくれる」。lose track of time は「時間を忘れる」。present は「今に集中している」。reset button は「リセットボタン」。日本語の「大事だよ」は英語では important だけでなく keeps me sane のように具体的な効果で表現するのが説得力がある。',
        character: 'lisa', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 120: エンタメ月卒業 (Month 4 Graduation)
    // Scene: エンタメ月最終日。4週間を振り返りながら居酒屋で打ち上げ。
    // ────────────────────────────────────────────────────

    {
        daySlot: 120, japanese: 'この一ヶ月楽しかったね',
        english: [
            'This month has been so fun.',
            'I cannot believe the month is already over. It flew by.',
            'Looking back on this month, I feel like I have grown so much. It has been a blast.',
            "Can we just take a moment to appreciate how great this month has been? We talked about movies, music, sports, hobbies, fandom. All the stuff that makes life worth living. And I feel like I learned so much about everyone. Like I had no idea Kenji was that passionate about his team. Or that Mina's fan spending could rival a small country's GDP. This month reminded me that entertainment is not just a distraction from real life. It is a huge part of what makes real life bearable. Without the things we love, we are just people going to work and coming home. That is not a life. That is a schedule.",
        ],
        context: 'flew by は「あっという間に過ぎた」。a blast は「最高に楽しかった」。bearable は「耐えられる」。that is not a life, that is a schedule は哲学的なフレーズ。英語圏では月末や期間の終わりに time flies(時間が飛ぶ)と表現するのが定番。日本語の「楽しかった」より感慨深い表現ができる。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '英語で感想言えるようになった',
        english: [
            'I can share my opinions in English now.',
            'A month ago I could not even describe a movie in English. Now I can argue about it.',
            'The biggest change is not my vocabulary. It is my confidence to actually speak up and say what I think.',
            "Here is what I realized this month. English is not just about knowing words. It is about having the courage to use them. A month ago, if someone asked me about my favorite movie in English, I would have said it is good and stopped there. Now I can explain why it is good, what makes it special, what I did not like about it, and why the sequel was a disappointment. That is not because I learned a hundred new words. It is because I practiced expressing opinions. Having an opinion in another language is a completely different skill from knowing vocabulary. And this month gave me that skill. I actually feel like myself when I speak English now. That is huge.",
        ],
        context: 'speak up は「発言する」。the courage to use them は「使う勇気」。expressing opinions は「意見を表現する」。I feel like myself は「自分らしくいられる」。that is huge は「それはすごいこと」。英語学習で最も重要なのは vocabulary ではなく confidence(自信)だという英語圏の教育哲学。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '好きなことだと覚えやすい',
        english: [
            'It is easier to learn when you enjoy the topic.',
            'I memorized so many new words this month because I actually cared about the content.',
            'The trick is not studying harder. It is studying something you are genuinely interested in.',
            "I finally understand why language textbooks never worked for me. They taught me words I did not care about. Table. Chair. Post office. When was the last time I had a passionate conversation about a post office? Never. But this month I learned words like comeback, binge-watch, sold out, and obsessed. Words I actually want to use. Words that describe my real life. And I remembered them instantly because they connected to emotions and experiences I care about. That is the secret to language learning that nobody teaches you in school. Passion is the best memory technique. If you love it, you will learn it. If you do not, no amount of flashcards will save you.",
        ],
        context: 'memorized は「暗記した」。the trick は「コツ」。passionate conversation は「熱い会話」。flashcards は「単語カード」。connected to emotions は「感情に紐づいた」。英語圏の言語教育でも passion-based learning(興味ベースの学習)の重要性が強調されている。textbook fatigue は共通の課題。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '来月も楽しみだな',
        english: [
            'I am looking forward to next month.',
            'I wonder what next month will be about. I am already excited.',
            'If next month is even half as fun as this one, we are in for a great time.',
            "I was not sure about this whole monthly theme thing at first. I thought it might feel forced. But now I genuinely look forward to every new day. Waking up and knowing there is a new set of expressions waiting for me feels like opening a small present every morning. And the best part is that each month builds on the last one. I can feel my English getting better not in a dramatic way but in a steady, consistent way. Like layers being added. I do not know what next month's theme is but honestly it does not even matter. As long as we are doing this together, I am in. Whatever it is, bring it on.",
        ],
        context: 'looking forward to は「楽しみにしている」。in for は「〜が待っている」。forced は「無理矢理な」。builds on は「積み重なる」。bring it on は「かかってこい」。英語では I am looking forward to が最も使われる「楽しみ」の表現。日本語の「楽しみだな」より期待の度合いが強い。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '映画の話が一番盛り上がった',
        english: [
            'The movie conversations were the best part.',
            'Nothing gets people talking like movies. We could have gone all night.',
            'I think we spent more time arguing about movies than any other topic this month. And I loved every second of it.',
            "If I had to pick the highlight of this month, it would be the movie discussions. Something about movies makes people open up in a way that other topics do not. Maybe it is because movies are emotional experiences that everyone can relate to. When someone says this movie changed my life, you immediately want to know why. And then you share your movie and suddenly you are having a real conversation. Not small talk. A real, deep, passionate conversation about art and life and what matters. That is what I love about movies. They are conversation starters that can lead anywhere. Some of the best conversations I have ever had started with have you seen this movie.",
        ],
        context: 'nothing gets people talking like は「〜ほど人を話させるものはない」。open up は「心を開く」。small talk は「世間話」。conversation starters は「会話のきっかけ」。lead anywhere は「どこにでも行ける」。映画が会話の潤滑油になるという観察は英語圏でも完全に共感される。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '推し活の話面白かったな',
        english: [
            'The fandom talk was hilarious.',
            'I had no idea how deep fan culture goes. Mina opened my eyes.',
            'I used to think fandom was silly but after hearing everyone talk about it, I get it now.',
            "I have to admit, when Mina started talking about fan culture, I was ready to roll my eyes. But then she explained the community aspect, the emotional connection, the sense of belonging. And I realized it is not that different from being a sports fan. We are all just people looking for something to be passionate about. Something that gives us joy in a world that is constantly trying to stress us out. Whether it is a K-pop group or a baseball team or a TV show, the underlying need is the same. We want to feel connected to something bigger than ourselves. Mina just taught me that in the most entertaining way possible.",
        ],
        context: 'hilarious は「爆笑もの」。opened my eyes は「目を開かせた」。roll my eyes は「白目を剥く(呆れる)」。sense of belonging は「帰属意識」。underlying need は「根本的な欲求」。英語圏でも fandom への偏見が理解に変わる体験は共感度が高い。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: 'スポーツの表現が一番使えそう',
        english: [
            'The sports expressions seem the most useful.',
            'I feel like sports English comes up the most in real conversations.',
            'Learning sports vocabulary is not just about sports. Half these expressions are used in everyday English.',
            "Here is what blew my mind this month. So many sports expressions are used in regular everyday English. Slam dunk, home run, game changer, dropped the ball, on the sidelines, a level playing field. These are all sports terms that people use in business meetings, casual conversations, and even romantic contexts. When someone says he really dropped the ball on that project, they do not mean an actual ball. When someone says that idea is a slam dunk, they have never touched a basketball. Sports language has infiltrated every corner of English. So by learning sports vocabulary, you are actually learning the hidden layer of everyday communication. Pretty cool when you think about it.",
        ],
        context: 'slam dunk は「楽勝」。dropped the ball は「しくじった」。game changer は「状況を変えるもの」。level playing field は「公平な条件」。infiltrated は「浸透した」。hidden layer は「隠れた層」。英語のスポーツ由来の慣用句は日常会話で非常に多く使われる。これは日本語にはない特徴。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: 'みんなと話すのが一番の勉強',
        english: [
            'Talking to you guys is the best practice.',
            'I learn more in one night at this izakaya than a week of textbook study.',
            'Real conversation is where real learning happens. No app can replicate what we have here.',
            "I want to say something sincere for a second. I have tried everything to improve my English. Apps, textbooks, online courses, YouTube videos, podcasts. And they all helped a little. But nothing has helped as much as sitting here with you guys and just talking. Because in a textbook, there is a right answer. In real conversation, there is no right answer. You just have to think on your feet and get your point across however you can. And that is scary. But it is also where the real growth happens. Every time I stumble and figure out how to say what I mean, that moment sticks with me forever. So thank you. For being patient with me, for laughing with me, and for making English feel like something I can actually do.",
        ],
        context: 'think on your feet は「即座に考える」。get your point across は「言いたいことを伝える」。stumble は「つまずく」。sticks with me は「忘れられない」。replicate は「再現する」。no app can replicate は「どんなアプリでも再現できない」。英語学習において real conversation の価値は英語圏の教育者も最も強調するポイント。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '卒業おめでとう！',
        english: [
            'Congratulations on finishing the month!',
            'We made it through another month. Cheers to that!',
            'Four months down. I am proud of all of us for sticking with it this long.',
            "Can I get a round of applause for everyone at this table? Four months. We have been doing this for four months. And nobody quit. Nobody gave up. We showed up every single day and pushed ourselves to learn something new. That takes discipline. That takes commitment. And frankly it takes a little bit of stubbornness because there were definitely days when we all wanted to give up. But we did not. And look at us now. We can talk about movies, music, sports, and hobbies in English. Four months ago we could barely order a beer in English. OK that is an exaggeration. But the progress is real. Let us celebrate tonight and come back tomorrow ready for month five. Cheers.",
        ],
        context: 'we made it through は「乗り越えた」。cheers to that は「それに乾杯」。sticking with it は「続けている」。discipline は「規律」。stubbornness は「頑固さ」。round of applause は「拍手」。英語の graduation(卒業)は学校だけでなく、何かを完了したときに使う。Cheers は乾杯の合図。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '乾杯！来月もよろしく！',
        english: [
            'Cheers! See you next month!',
            'Cheers everyone! Here is to another great month ahead!',
            'Raise your glasses! To month four in the books and month five on the horizon. We have got this!',
            "Alright everyone, raise your glasses. This one is for us. For the people who decided that learning English was worth their time and energy and who proved it every single day for four months straight. For the people who laughed at each other's mistakes instead of judging them. For the people who asked questions when they did not understand and answered questions when they did. For the people who turned a neighborhood izakaya into the best English classroom in the country. I am not crying. You are crying. OK maybe I am crying a little. Here is to month five. May it be even better than the first four. Cheers!",
        ],
        context: 'here is to は「〜に乾杯」。in the books は「完了した」。on the horizon は「目の前にある」。we have got this は「俺たちならできる」。I am not crying, you are crying は「泣いてないよ(泣いてる)」の定番ジョーク。raise your glasses は乾杯のスピーチの定番フレーズ。英語の乾杯は cheers 一言でもスピーチ付きでもどちらも自然。',
        character: 'master', category: 'social', month: '2026-07',
    },
];

// ============================================================
// DAY THEMES -- MONTH 4 (2026-07) -- WEEK 16
// ============================================================

export const MONTH4_W16_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    112: {
        title: 'スポーツ観戦', titleEn: 'Watching Sports', category: 'social',
        scene: '居酒屋のテレビで野球中継。ゴンドが解説者気取りで語り始める。',
        keywords: [
            { en: 'overtime', ja: '延長戦', pron: 'オーバータイム', example: 'The game went into overtime.', note: 'アメリカ英語。サッカーでは extra time(イギリス英語)。日本語の「延長」と同じだが、仕事の残業も overtime。' },
            { en: 'ref', ja: '審判', pron: 'レフ', example: 'The ref made a terrible call.', note: 'referee の略。野球は umpire(アンプ)。bad call=誤審。スポーツ観戦で最もよく叫ばれる単語の一つ。' },
            { en: 'halftime', ja: 'ハーフタイム', pron: 'ハーフタイム', example: 'Let us grab drinks at halftime.', note: 'バスケは quarter(クォーター)、野球は inning(イニング)で区切る。halftime show はスーパーボウルの目玉。' },
            { en: 'replay', ja: 'リプレイ', pron: 'リプレイ', example: 'I have watched the replay five times.', note: 'instant replay=すぐに見返す映像。video replay=ビデオ判定。日本語と同じだが英語では動詞としても使う。' },
            { en: 'underdog', ja: '弱者・劣勢', pron: 'アンダードッグ', example: 'Everyone loves an underdog story.', note: '闘犬で下になった犬が語源。underdog story=逆転劇。root for the underdog=弱い方を応援する。' },
        ],
    },
    113: {
        title: '推し活', titleEn: 'Fan Culture', category: 'feeling',
        scene: 'ミナが推しアイドルのグッズを大量に見せびらかす。全員引き気味。',
        keywords: [
            { en: 'stan', ja: '熱狂的ファン', pron: 'スタン', example: 'I stan this group so hard.', note: 'Eminem の曲 "Stan" が語源。ファンを超えた熱狂を指す。動詞としても使う。I stan=推してる。' },
            { en: 'merch', ja: 'グッズ', pron: 'マーチ', example: 'I spent too much on merch again.', note: 'merchandise の略。発音は「マーチャンダイズ」だが略すと「マーチ」。concert merch=ライブグッズ。' },
            { en: 'fandom', ja: 'ファンダム', pron: 'ファンダム', example: 'The fandom is amazing.', note: 'fan+kingdom。ファンの集合体。toxic fandom=有害なファン文化。fandom name=ファンの呼称(例:Army)。' },
            { en: 'bias', ja: '推し', pron: 'バイアス', example: 'He is my ultimate bias.', note: 'K-POPファン用語。ultimate bias=最推し。bias wrecker=推し変させる人。本来は「偏見」の意味。' },
            { en: 'drop', ja: 'リリース', pron: 'ドロップ', example: 'They just dropped a new album.', note: '「落とす」から「リリースする」。music drop=新曲発売。limited drop=限定発売。英語のスラングとして定着。' },
        ],
    },
    114: {
        title: '試合結果', titleEn: 'Game Results', category: 'social',
        scene: '朝の居酒屋仕込み中にケンジが昨夜の試合結果を報告。勝敗で一喜一憂。',
        keywords: [
            { en: 'comeback', ja: '逆転', pron: 'カムバック', example: 'What an incredible comeback!', note: 'come back=戻る → comeback=逆転劇。make a comeback=復帰する。日本語の「カムバック」は芸能界での復帰が多いが、英語はスポーツが主。' },
            { en: 'clutch', ja: '土壇場の', pron: 'クラッチ', example: 'He hit a clutch shot in the last second.', note: '大事な場面で決める力。clutch player=勝負強い選手。英語では形容詞として使う。That was so clutch。' },
            { en: 'blowout', ja: '大差の試合', pron: 'ブローアウト', example: 'It was a total blowout. Not even close.', note: 'blow out=吹き飛ばす。一方的な試合。反対は nail-biter(接戦)。down to the wire も接戦の意味。' },
            { en: 'roster', ja: '選手名簿', pron: 'ロスター', example: 'They have a stacked roster this year.', note: 'stacked roster=豪華メンバー。日本語では「ロースター」。lineup(スタメン)とは違い、全選手を含む。' },
            { en: 'choke', ja: '大事な場面で失敗する', pron: 'チョーク', example: 'They choked in the playoffs again.', note: '「窒息する」が原義。プレッシャーで実力を発揮できないこと。choker=プレッシャーに弱い選手。非常にきつい批判語。' },
        ],
    },
    115: {
        title: '運動する', titleEn: 'Working Out', category: 'request',
        scene: 'リサが「最近ジム行ってる」と言ったら全員に質問攻めにされる。',
        keywords: [
            { en: 'sore', ja: '筋肉痛の', pron: 'ソア', example: 'My legs are so sore from yesterday.', note: '筋肉痛=muscle soreness。I am sore=筋肉痛がある。throat is sore=喉が痛い。体のどこでも使える。' },
            { en: 'cardio', ja: '有酸素運動', pron: 'カーディオ', example: 'I hate cardio but I know I need it.', note: 'cardiovascular exercise の略。running, cycling, swimming など。weights(ウェイト)と対比される。' },
            { en: 'rep', ja: '反復回数', pron: 'レップ', example: 'Do three sets of ten reps.', note: 'repetition の略。set=セット。3 sets of 10 reps=10回3セット。one more rep=あと1回。ジムの基本用語。' },
            { en: 'gains', ja: '筋肉の成果', pron: 'ゲインズ', example: 'I am finally seeing some gains.', note: '複数形で使う。leg day gains=脚トレの成果。newbie gains=初心者ボーナス。SNSで #gains は筋トレ投稿の定番タグ。' },
            { en: 'cool down', ja: 'クールダウン', pron: 'クールダウン', example: 'Do not skip the cool down.', note: 'warm up(ウォームアップ)の反対。stretch(ストレッチ)と合わせて使う。cool off=体温を下げる。' },
        ],
    },
    116: {
        title: 'チームを応援する', titleEn: 'Cheering for Teams', category: 'social',
        scene: 'タケシがひいきチームの話をしたら全員のひいきチームが違って大論争。',
        keywords: [
            { en: 'bandwagon', ja: 'にわかファン', pron: 'バンドワゴン', example: 'Do not be a bandwagon fan.', note: 'bandwagon=楽隊車。jump on the bandwagon=勝ち馬に乗る。英語圏のスポーツで最も嫌われるファンタイプ。' },
            { en: 'rivalry', ja: 'ライバル関係', pron: 'ライバルリー', example: 'This rivalry goes back decades.', note: 'rival の名詞形。fierce rivalry=激しいライバル関係。crosstown rivalry=同じ街のチーム対決。' },
            { en: 'jersey', ja: 'ユニフォーム', pron: 'ジャージー', example: 'I just bought the new away jersey.', note: '日本語の「ジャージ」とは違う。home jersey=ホーム用、away jersey=アウェイ用。英語のユニフォームはjersey。' },
            { en: 'chant', ja: '応援歌・声援', pron: 'チャント', example: 'The whole stadium was chanting.', note: '繰り返す歌。サッカーのchant文化は世界最大。fight song=応援歌(アメリカの大学)。名詞・動詞両方で使う。' },
            { en: 'dynasty', ja: '王朝(連覇チーム)', pron: 'ダイナスティ', example: 'That team built a dynasty.', note: '「王朝」。連覇するチームを dynasty と呼ぶ。build a dynasty=王朝を築く。スポーツ史で最高の称号。' },
        ],
    },
    117: {
        title: 'スポーツニュース', titleEn: 'Sports News', category: 'social',
        scene: 'ケンジがスマホでスポーツニュースを読み上げる。全員が食いつく。',
        keywords: [
            { en: 'trade', ja: 'トレード', pron: 'トレイド', example: 'He just got traded to another team.', note: '選手の交換。trade deadline=トレード期限。trade rumor=トレードの噂。blockbuster trade=大型トレード。' },
            { en: 'free agent', ja: 'フリーエージェント', pron: 'フリーエイジェント', example: 'He is hitting free agency this winter.', note: '契約が切れた選手。sign as a free agent=FA契約。free agency period=FA期間。日本語のFAと同じ。' },
            { en: 'draft', ja: 'ドラフト', pron: 'ドラフト', example: 'Who do you think they will draft first?', note: '新人選手の指名。first-round pick=1巡目指名。draft bust=期待外れの指名選手。NFL Draft は一大イベント。' },
            { en: 'pundit', ja: '解説者', pron: 'パンディット', example: 'The pundits got it all wrong again.', note: '評論家・解説者。armchair pundit=素人評論家。TV pundit=テレビ解説者。スポーツ以外でも政治評論家にも使う。' },
            { en: 'headline', ja: '見出し', pron: 'ヘッドライン', example: 'He made headlines after that performance.', note: 'make headlines=ニュースになる。headline news=トップニュース。grab headlines=注目を集める。' },
        ],
    },
    118: {
        title: 'イベントに行く', titleEn: 'Going to Events', category: 'travel',
        scene: 'ユキが音楽フェスの計画を立てている。全員を巻き込もうとする。',
        keywords: [
            { en: 'venue', ja: '会場', pron: 'ヴェニュー', example: 'The venue was packed to capacity.', note: 'イベント会場。indoor venue=室内会場。outdoor venue=野外会場。日本語の「ベニュー」より幅広く使う。' },
            { en: 'lineup', ja: '出演者リスト', pron: 'ラインナップ', example: 'The festival lineup looks incredible this year.', note: 'フェスの出演者一覧。headliner=トリ。opening act=前座。stacked lineup=豪華ラインナップ。' },
            { en: 'sold out', ja: '完売', pron: 'ソールドアウト', example: 'Tickets sold out in ten minutes.', note: 'sell out の過去分詞。sold-out show=完売公演。sell out=裏切る(別の意味も)。コンサートでは最も恐れられる表現。' },
            { en: 'encore', ja: 'アンコール', pron: 'アンコー', example: 'They played three songs for the encore.', note: 'フランス語由来。発音は「アンコー」(日本語の「アンコール」ではない)。encore performance=アンコール公演。' },
            { en: 'queue', ja: '列', pron: 'キュー', example: 'The queue for merch was insane.', note: 'イギリス英語。アメリカでは line。queue up=列に並ぶ。virtual queue=オンラインの待ち列。発音は「キュー」。' },
        ],
    },
    119: {
        title: '趣味を深める', titleEn: 'Deep Diving into Hobbies', category: 'social',
        scene: '居酒屋で全員が自分のハマっている趣味を語り出す。意外な一面が見える。',
        keywords: [
            { en: 'rabbit hole', ja: '沼', pron: 'ラビットホール', example: 'I fell down a YouTube rabbit hole last night.', note: '不思議の国のアリスが語源。趣味の沼にハマる=fall down a rabbit hole。deep rabbit hole=底なしの沼。' },
            { en: 'self-taught', ja: '独学の', pron: 'セルフトート', example: 'I am completely self-taught.', note: 'teach の過去分詞。self-taught programmer=独学プログラマー。YouTube で学んだ人も self-taught と名乗る。' },
            { en: 'niche', ja: 'ニッチ', pron: 'ニッチ/ニーシュ', example: 'It is a pretty niche hobby.', note: '発音が2通り。アメリカ=ニッチ、イギリス=ニーシュ。niche market=ニッチ市場。niche interest=マニアックな趣味。' },
            { en: 'gear', ja: '道具・装備', pron: 'ギア', example: 'I spent way too much on new gear.', note: 'equipment より口語的。gear up=装備を整える。camera gear=カメラ機材。fishing gear=釣り道具。' },
            { en: 'burnout', ja: '燃え尽き症候群', pron: 'バーンアウト', example: 'I took a break because of burnout.', note: 'burn out=燃え尽きる。hobby burnout=趣味での燃え尽き。creative burnout=創作の燃え尽き。仕事以外でも使う。' },
        ],
    },
    120: {
        title: 'エンタメ月卒業', titleEn: 'Month 4 Graduation', category: 'social',
        scene: 'エンタメ月最終日。4週間を振り返りながら居酒屋で打ち上げ。',
        keywords: [
            { en: 'milestone', ja: '節目', pron: 'マイルストーン', example: 'Finishing month four is a huge milestone.', note: '道路の距離標識が語源。hit a milestone=節目を迎える。project milestone=プロジェクトの節目。' },
            { en: 'reflect', ja: '振り返る', pron: 'リフレクト', example: 'Let us reflect on what we learned this month.', note: 'reflect on=〜を振り返る。self-reflection=自己省察。looking back=振り返ると(カジュアル)。日記にも使える。' },
            { en: 'growth', ja: '成長', pron: 'グロウス', example: 'I can see real growth in my English.', note: 'grow の名詞形。personal growth=個人の成長。growth mindset=成長マインドセット。progress より大きな変化を示す。' },
            { en: 'cheers', ja: '乾杯', pron: 'チアーズ', example: 'Cheers to another great month!', note: '乾杯。cheers to=〜に乾杯。イギリスでは「ありがとう」の意味でも使う。raise your glass=グラスを上げて。' },
            { en: 'streak', ja: '連続記録', pron: 'ストリーク', example: 'I am on a four-month learning streak.', note: 'winning streak=連勝。losing streak=連敗。on a streak=記録継続中。Duolingo の streak 機能で有名になった。' },
        ],
    },
};
