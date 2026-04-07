/**
 * 365 English Master -- Month 4 Week 14: エンタメ英語 (Entertainment English)
 * Days 98-104: 70 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 14
// ============================================================

export const MONTH4_W14_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 98: 音楽の趣味 (Music Taste)
    // Scene: 居酒屋で「どんな音楽聴くの？」から始まる趣味トーク。世代間ギャップが面白い。
    // ────────────────────────────────────────────────────

    {
        daySlot: 98, japanese: 'どんな音楽聴くの？',
        english: [
            'What kind of music do you listen to?',
            'So what kind of music are you into?',
            'I am curious. What kind of music do you usually listen to? Like what is on your playlist right now?',
            "I have been trying to get into new stuff lately because I feel like I have been listening to the same ten songs on repeat for months. So I figured I would ask you guys. What are you into right now? Like what do you actually listen to on a daily basis? Not the stuff you say you listen to when you are trying to sound cool, but what is actually on your playlist.",
        ],
        context: 'be into は「ハマっている」。What are you into? は趣味全般に使える超便利フレーズ。on repeat は「リピートで」。日本語の「聴く」は一語だけど英語は listen to と前置詞セット。忘れがち。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '最近ハマってる曲がある',
        english: [
            'I have a song I am really into.',
            'There is this one song I cannot stop playing right now.',
            'OK so there is this song I discovered last week and I have literally played it like fifty times already.',
            "You know when you find that one song and it just hits different? I found one last week and I swear I have been listening to it on loop every single day since then. I listen to it on my way to work, on my way home, in the shower, while cooking. My neighbors probably hate me at this point because I have been blasting it through the walls. But I do not even care. It is that good.",
        ],
        context: 'hits different は「刺さり方が違う」。Z世代が広めた表現。on loop は「ループで」。blasting は「爆音で流す」。英語では「ハマっている」をcannot stop ~ingで表現するのが自然。obsessed withも使える。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '俺は演歌だよ',
        english: [
            'I listen to enka.',
            'Me? I am an enka guy through and through.',
            'You guys can have your pop music. I will stick with enka. The classics never get old.',
            "Look, I know you all think enka is for old people but you are wrong. There is more emotion in one enka song than in a hundred pop songs combined. The melodies, the lyrics, the way the singer pours their entire soul into every note. That is real music right there. When I am closing up the shop late at night and putting the chairs up, I put on some Hibari Misora and suddenly the whole world slows down. You cannot get that from whatever is trending on TikTok.",
        ],
        context: 'through and through は「根っからの」。stick with は「こだわる・付き合い続ける」。pour their soul into は「魂を込める」。英語圏では enka を Japanese blues と説明することが多い。マスターらしい頑固さが出る表現。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '意外！そういうの聴くんだ',
        english: [
            'Really? I did not expect that.',
            'Wait, seriously? You listen to that? I would never have guessed.',
            'Hold on. You? Listening to that? That is the last thing I expected. I totally had you pegged as a different type.',
            "No way. I am genuinely shocked right now. I have known you for how long and I had no idea you were into that. I always figured you were more of a jazz person or something. You just have that vibe. But this completely changes how I see you. In a good way, obviously. I love when people surprise me like that. It means I still do not have you fully figured out.",
        ],
        context: 'had you pegged as は「あなたのことを~だと思っていた」。figured は「思っていた」。have someone figured out は「人のことを理解し尽くしている」。意外性を表すとき英語は I would never have guessed が定番。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: 'それ誰の曲？',
        english: [
            'Who is that by?',
            'Wait, who sings that? I think I have heard it before.',
            'That sounds familiar. Who is it by? Can you play it for me real quick?',
            "Hold on, I feel like I know that song but I cannot place it. Who is it by? Can you pull it up on your phone? Just play the first ten seconds and I bet I will recognize it. I have the worst memory for artist names but I never forget a melody. It is so frustrating because I will hear a song I love and then spend twenty minutes trying to find it later because I cannot remember who sings it.",
        ],
        context: 'Who is it by? は「誰の曲？」の自然な聞き方。place it は「思い出す・特定する」。pull it up は「(スマホで)表示する」。日本語は「誰の曲？」の一言だけど英語は by が必要。Who sings it? でもOK。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '聴いたことない名前だなあ',
        english: [
            'Never heard of them.',
            'That name does not ring a bell at all.',
            'I have never heard of them. Are they new? What kind of music do they make?',
            "I am drawing a complete blank here. I have never heard that name in my life. Are they like an underground artist or something? Because I try to keep up with what is popular but there is just so much music coming out these days that it is impossible to know everything. Back in my day you had maybe ten big artists and that was it. Now there are thousands and they all have stage names I cannot pronounce.",
        ],
        context: 'ring a bell は「聞き覚えがある」。does not ring a bell は「全然ピンとこない」。drawing a blank は「何も思い出せない」。underground は「地下=インディーズ」。keep up with は「ついていく」。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '好きなジャンルがコロコロ変わる',
        english: [
            'My taste keeps changing.',
            'I go through phases. My taste changes all the time.',
            'I cannot stick with one genre. I will be obsessed with jazz for a month and then switch to hip-hop the next.',
            "I am the worst when it comes to consistency. One month I am all about classical music and I am buying vinyl records and reading about composers. Then the next month I am blasting trap music in my car like a completely different person. My friends make fun of me for it because my playlists are all over the place. You will see Chopin right next to Kendrick Lamar and honestly I do not see the problem with that.",
        ],
        context: 'go through phases は「時期によって変わる」。all over the place は「バラバラ」。be all about は「~に夢中」。日本語の「コロコロ変わる」は英語だとkeeps changingだけど、go through phasesの方がネイティブっぽい。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '昔の曲のほうがいいよ',
        english: [
            'Old music is better.',
            'I swear, music was better back in the day.',
            'Call me old-fashioned but I think the classics are just on another level compared to what is out now.',
            "I know every generation says this but I genuinely believe music peaked in the 80s and 90s. The songwriting was better, the instruments were real, and people actually sang without auto-tune. I am not saying everything new is bad. There are some talented artists out there. But when I compare a song from today to something like Queen or The Beatles, it is not even close. Those songs have lasted decades for a reason. Can you say the same about whatever is trending right now? I doubt it.",
        ],
        context: 'back in the day は「昔は」。on another level は「レベルが違う」。peaked は「ピークを迎えた」。auto-tune はボーカル補正技術。it is not even close は「比較にならない」。英語圏でも「昔の音楽のほうが良かった」論争は永遠のテーマ。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: 'この曲めっちゃ耳に残る',
        english: [
            'This song is so catchy.',
            'I cannot get this song out of my head. It is insanely catchy.',
            'I have had this song stuck in my head for three days straight. The chorus is just too catchy.',
            "You know what is the worst? When a song gets stuck in your head and it will not leave no matter what you do. This one has been living rent-free in my brain since Tuesday. I catch myself humming it at work, in the elevator, everywhere. My coworker actually asked me to stop because I did not even realize I was doing it out loud. The melody is just that infectious. It hooks you and does not let go.",
        ],
        context: 'catchy は「耳に残る」。stuck in my head は「頭から離れない」。living rent-free は「家賃タダで住んでいる=勝手に居座っている」。infectious は「伝染する」で音楽にも使える。earworm(耳の虫)は「頭から離れない曲」の意味。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '歌詞がいいんだよね',
        english: [
            'The lyrics are really good.',
            'What I love about this song is the lyrics. They really speak to me.',
            'The lyrics hit me on a personal level. It is like the songwriter knew exactly what I was going through.',
            "I am the kind of person who actually reads the lyrics. A lot of people just listen to the melody but for me the words matter. And this song in particular has lyrics that feel like someone reached into my chest and pulled out exactly what I was feeling but could not put into words myself. There is this one line in the second verse that made me stop in my tracks the first time I heard it. I actually had to rewind it and listen again because I could not believe how perfectly it captured that feeling.",
        ],
        context: 'speak to me は「心に響く」。hit me on a personal level は「個人的に刺さる」。stop in my tracks は「立ち止まる」。put into words は「言葉にする」。英語では lyrics は常に複数形。a lyric とは言わない。',
        character: 'lisa', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 99: ライブに行く (Going to Concerts)
    // Scene: ケンジが初めて洋楽アーティストのライブに行く。チケット争奪戦からの話。
    // ────────────────────────────────────────────────────

    {
        daySlot: 99, japanese: 'チケット取れた！',
        english: [
            'I got tickets!',
            'I actually got the tickets! I cannot believe it!',
            'You are not going to believe this but I got through and scored tickets for the show next month!',
            "OK so you know how I have been stressing about this for weeks? The tickets went on sale at ten AM and I was on my phone at nine fifty-nine refreshing the page like a maniac. The site crashed twice and I thought it was over. But then somehow I got through and managed to grab two tickets before they sold out. My hands were literally shaking. I almost dropped my phone. This is the best day of my entire year.",
        ],
        context: 'scored tickets は「チケットをゲットした」。got through は「(アクセスが)通じた」。sold out は「完売」。refreshing the page は「ページを更新し続ける」。英語では concert tickets の争奪戦は huge deal で、got tickets! だけで大興奮が伝わる。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '即完売だったらしいよ',
        english: [
            'They sold out instantly.',
            'Apparently they sold out in like two minutes flat.',
            'I heard tickets sold out within seconds. People are furious because scalpers bought them all.',
            "The demand was absolutely insane. Tickets went live at ten and by ten-oh-two they were completely gone. My friend tried to get some and she was in the virtual queue for forty-five minutes only to be told they were sold out. The worst part is you go on resale sites and the same tickets are listed for five times the face value. Scalpers ruin everything. There should be laws against that. Some countries actually have them now and I wish we did too.",
        ],
        context: 'in two minutes flat は「きっかり2分で」。face value は「定価」。scalper は「転売ヤー」。virtual queue は「オンライン待ち行列」。resale は「転売」。日本語の「即完」は英語だと sold out instantly か sold out in seconds。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '席どこ？',
        english: [
            'Where are your seats?',
            'Nice! So where are you sitting? Are they good seats?',
            'What section did you get? Please tell me they are not nosebleed seats.',
            "OK but the real question is where are the seats. Because last time I went to a concert I was so far back that the stage looked like a postage stamp. I basically watched the whole thing on the screen which kind of defeats the purpose of being there in person. If I wanted to watch on a screen I could have just stayed home. So please tell me you got something decent. Floor seats? Lower bowl at least?",
        ],
        context: 'nosebleed seats は「鼻血が出るほど高い場所の席=最上階の安い席」。defeats the purpose は「意味がない」。floor seats は「アリーナ席」。lower bowl は「1階スタンド」。英語の席種表現は日本と全然違う。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'スタンディングだよ',
        english: [
            'It is standing only.',
            'No seats. It is general admission, standing only.',
            'It is a standing show. First come first served. So we need to get there early to be near the front.',
            "It is general admission which means no assigned seats. You just show up and stand wherever you can find a spot. The trick is getting there super early so you can be close to the stage. Some people camp out for hours. I am not that dedicated but I would like to be somewhere in the first few rows if possible. My legs are going to be killing me by the end of the night but it is worth it. The energy in the standing section is always way better than sitting down.",
        ],
        context: 'general admission は「自由席」。日本語の「スタンディング」は和製英語。英語では standing only か GA (general admission)。first come first served は「早い者勝ち」。camp out は「並んで待つ」。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '物販の列やばそう',
        english: [
            'The merch line is going to be crazy.',
            'I bet the merch line is going to be insane.',
            'We should probably line up for merch early. Those limited edition items sell out fast.',
            "Every time I go to a concert the merch line is an hour long minimum. And the good stuff is always gone by the time you get to the front. Last time I wanted a tour t-shirt and by the time it was my turn they only had triple XL left. I am not wearing a tent to bed. So this time I am going straight to the merch booth before the show even starts. I do not care if I miss the opening act. I want that hoodie.",
        ],
        context: 'merch は merchandise(グッズ)の略。line up は「並ぶ」。limited edition は「限定品」。opening act は「前座」。日本語の「物販」は英語では merch booth か merch table。tour t-shirt は「ツアーTシャツ」。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '前の人デカすぎて見えない',
        english: [
            'I cannot see past the person in front of me.',
            'The person in front of me is so tall I can barely see the stage.',
            'Are you kidding me? I waited in line for two hours and now some giant is standing right in front of me blocking my entire view.',
            "This always happens to me. I am not even that short but somehow I always end up behind the tallest person in the entire venue. This guy in front of me has to be at least six-four and he is wearing a hat on top of that. I have been trying to peek around him but every time I move he moves too. It is like he has some kind of radar. I paid good money for this and I am watching the concert through the gap between two strangers. This is my life.",
        ],
        context: 'six-four は「6フィート4インチ=約193cm」。peek around は「覗き込む」。venue は「会場」。blocking my view は「視界を遮る」。gap は「隙間」。This is my life は自虐的な「これが俺の人生」。ライブあるある。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'アンコールやるかな',
        english: [
            'Do you think there will be an encore?',
            'They have to do an encore, right? There is no way they just end it like that.',
            'Come on, everyone keep cheering. If we are loud enough they will come back out for an encore.',
            "The lights just went off and the band walked offstage but there is no way that is it. They have not played their biggest hit yet. Every concert I have been to they save the best song for the encore. It is like an unwritten rule. So everyone needs to keep clapping and screaming because if we stop they might actually not come back. I saw a show once where the crowd went quiet too early and the band just left. Never again. Keep the energy up people.",
        ],
        context: 'encore は英語でも同じだけど発音は「アンコー」(最後の r はアメリカ英語なら軽く)。walked offstage は「舞台裏に引っ込む」。unwritten rule は「暗黙のルール」。日本語の「アンコール」の掛け声は英語では One more song! が多い。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '生で聴くと全然違うね',
        english: [
            'It sounds totally different live.',
            'Hearing it live is a completely different experience.',
            'I have listened to this song a thousand times on Spotify but hearing it live just hits completely different.',
            "I knew they were good but I was not prepared for how much better they sound in person. The bass you can feel in your chest, the vocals are even more powerful without all the studio effects, and the energy from the crowd adds this whole other layer. Recordings do not capture any of that. From now on I am going to every concert I can because there is just no substitute for the real thing. I finally understand why people spend hundreds of dollars on tickets.",
        ],
        context: 'live は「ライブで・生で」。in person は「直接・現場で」。hits different は「刺さり方が違う」。no substitute は「代わりがない」。英語で「生演奏」は live performance。日本語の「ライブ」は和製英語で、英語では concert か show が普通。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'セットリスト最高だった',
        english: [
            'The setlist was perfect.',
            'They played all my favorites. The setlist was absolutely perfect.',
            'I could not have asked for a better setlist. They played every single song I wanted to hear.',
            "I was keeping track of the setlist in my head and by the end I realized they played literally every song I was hoping for. They opened with their newest single which got everyone hyped and then they worked through the classics one by one. The pacing was perfect too. They knew exactly when to bring the energy up and when to slow it down for the ballads. Whoever put that setlist together deserves a raise because it was flawless from start to finish.",
        ],
        context: 'setlist は「セトリ」。日本語の略語がそのまま英語圏でも通じる珍しい例。opened with は「~で始めた」。hyped は「テンション上がった」。pacing は「ペース配分」。flawless は「完璧な」。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '終電に間に合うかな',
        english: [
            'Can we make the last train?',
            'What time is the last train? We need to keep an eye on the time.',
            'I want to stay until the very end but I also cannot miss the last train. That would be a disaster.',
            "OK so the last train is at eleven forty-five and it is already ten thirty. The show probably has at least two more songs plus an encore. If we leave right when it ends we might make it but it is going to be tight. The station is like a ten minute walk from here. Or we could just stay until the end and take a cab. But a cab from here is going to cost like forty dollars and I am already broke from buying the ticket and the merch. Why do concerts have to end so late on weeknights?",
        ],
        context: 'make the last train は「終電に間に合う」。keep an eye on は「気をつけておく」。it is going to be tight は「ギリギリ」。broke は「金欠」。日本語の「終電」は英語だと last train。midnight train ではない。',
        character: 'master', category: 'travel', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 100: カラオケ (Karaoke Night)
    // Scene: 二次会でカラオケへ。選曲バトルと歌唱力論争が始まる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 100, japanese: 'カラオケ行こうよ',
        english: [
            'Let us go to karaoke.',
            'Come on, let us hit up karaoke. It will be fun.',
            'The night is still young. Let us go to karaoke and sing our hearts out.',
            "OK so I know some of you are going to say no but hear me out. We are all here, we have had a few drinks, the mood is perfect. Let us just go to karaoke for like an hour. It does not have to be a long session. We will get a room, order some drinks, and just have a good time. Nobody is going to judge your singing. That is literally the whole point. You do not have to be good. You just have to be loud.",
        ],
        context: 'hit up は「行く」のカジュアル表現。sing our hearts out は「思いっきり歌う」。the night is still young は「夜はまだこれから」。hear me out は「最後まで聞いて」。karaoke の英語発音は「キャリオーキ」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '何歌う？',
        english: [
            'What are you going to sing?',
            'So what is your go-to karaoke song?',
            'Come on, what are you going to sing first? Do not tell me you are just going to sit there.',
            "Everyone has that one song they always sing at karaoke. That reliable banger that you know you can nail every single time. What is yours? And do not pretend you do not have one because everyone does. Mine is probably embarrassing but I do not care. I have sung it so many times that I could do it in my sleep. The key is picking a song that the whole room can vibe with, not just something you personally like.",
        ],
        context: 'go-to は「定番の」。banger は「盛り上がる曲」。nail は「完璧にやる」。vibe with は「一緒にノる」。do it in my sleep は「寝ててもできる=完全にマスターしている」。英語の karaoke は友達同士でバーでやるのが主流。個室はアジア特有。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '音痴だから恥ずかしい',
        english: [
            'I am tone-deaf. It is embarrassing.',
            'I really cannot sing. Like, I am genuinely tone-deaf.',
            'You guys go ahead. I will just sit here and cheer you on because trust me, nobody wants to hear me sing.',
            "I am being completely serious when I say I cannot carry a tune to save my life. Last time I tried to sing at karaoke my friend literally covered her ears and said it sounded like a cat being stepped on. That is a direct quote. I am not even exaggerating. Some people are just not born with the ability to match pitch and I am one of those people. I have accepted it. I will be the designated audience member tonight.",
        ],
        context: 'tone-deaf は「音痴」。cannot carry a tune は「音程が取れない」。to save my life は「どう頑張っても無理」。match pitch は「音程を合わせる」。designated は「指名された・担当の」。英語圏のカラオケは下手でも盛り上がるのが正義。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'この曲知ってる？',
        english: [
            'Do you know this song?',
            'Wait, do you guys know this one? It is a classic.',
            'OK I am putting this one on. Tell me if you recognize it. The intro is legendary.',
            "I am scrolling through the song list and I just found the perfect song but I need to know if anyone else in this room knows it before I put it on. Because there is nothing worse than singing a duet by yourself. The whole point is getting everyone involved. So raise your hand if you know this one. It came out in like 2005 so the younger crowd might not know it but anyone over thirty should recognize it immediately. Here, let me play the first few seconds.",
        ],
        context: 'put it on は「かける・流す」。came out は「リリースされた」。raise your hand は「手を挙げて」。scrolling through は「スクロールして探す」。duet は「デュエット」。英語では song list、日本語では「曲目リスト」。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'キー高すぎて出ない',
        english: [
            'The key is too high for me.',
            'I cannot hit those high notes. Can we lower the key?',
            'This song sounded way easier in my head. I cannot reach any of the high parts at all.',
            "Why do all the good songs have to be in such high keys? I picked this song because I love it but I completely forgot that the chorus goes up to like a high C or something ridiculous. I was doing fine in the verse and then the chorus hit and my voice just cracked and died. Can someone figure out how to lower the key on this machine? I need it down like three notches or I am going to destroy my vocal cords trying to keep up.",
        ],
        context: 'hit those high notes は「高音を出す」。lower the key は「キーを下げる」。cracked は「(声が)裏返った」。notches は「段階」。vocal cords は「声帯」。日本語の「キー」はそのまま英語でも key で通じる。pitch を上げ下げとも言う。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'めっちゃうまいじゃん！',
        english: [
            'You are really good!',
            'Wait, you can actually sing! That was amazing!',
            'Hold on. You said you could not sing and then you just killed it. What was that?',
            "Excuse me? You literally just stood there and said you are tone-deaf and then you grabbed the mic and delivered an absolutely flawless performance. Who are you? Are you secretly a professional singer or something? Because that was not normal karaoke singing. That was like audition-for-a-reality-show level. I am genuinely impressed and also a little annoyed because now I have to follow that and I am going to sound terrible by comparison.",
        ],
        context: 'killed it は「最高だった」。delivered は「やってのけた」。flawless は「完璧な」。follow that は「その後に続く」。by comparison は「比べると」。英語で歌を褒めるとき You nailed it! も超よく使う。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'マイク回して',
        english: [
            'Pass me the mic.',
            'Hey, it is my turn. Pass the mic over here.',
            'You have been hogging the mic for three songs straight. Give someone else a chance.',
            "Alright, I have been sitting here patiently for the last fifteen minutes watching you sing song after song. You are great and all but this is supposed to be group karaoke, not your solo concert. Hand over the mic. I have had a song queued up for the last ten minutes and if I have to wait any longer I am going to forget the lyrics. There are six of us in this room and you have sung more songs than everyone else combined.",
        ],
        context: 'pass the mic は「マイクを回す」。hogging は「独り占めする」。queued up は「列に入れてある」。hand over は「渡す」。mic は microphone の略で「マイク」。英語ではマイクの独占者を mic hog と呼ぶ。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'ハモれる人いる？',
        english: [
            'Can anyone harmonize?',
            'Who can do harmonies? I need someone to sing the high part.',
            'This song needs two voices. Can anyone hold a harmony or is everyone just going to sing melody?',
            "OK this next song is a duet and it is way better with harmonies. I can do the main melody but I need someone who can hold the harmony part without drifting back to the melody. That is the tricky thing about harmonies. Your brain wants to follow the louder voice so you end up just singing the same thing. It takes actual skill to maintain your own line. Anyone up for it? It does not have to be perfect. Just close enough.",
        ],
        context: 'harmonize は「ハモる」。hold a harmony は「ハーモニーを維持する」。drifting は「ずれる」。up for it は「やる気ある？」。英語圏のカラオケでハモりを求めるのはちょっとレベル高い要求。casual に just sing along(一緒に歌って)が普通。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '延長する？',
        english: [
            'Should we extend?',
            'Our time is almost up. Should we add another hour?',
            'We only have five minutes left. Should we extend or call it a night?',
            "OK so the screen says we have five minutes left and I know we said one hour but honestly I am having too much fun to leave now. Kenji has not even sung yet and Mina still has three songs in the queue. If we extend for another hour it is only like twenty bucks split between all of us. That is nothing. We can get another round of drinks too. Come on, who is in? I will go talk to the front desk if everyone agrees.",
        ],
        context: 'extend は「延長する」。call it a night は「今夜はおしまいにする」。split between は「割り勘で」。who is in は「誰が賛成？」。front desk は「受付」。英語のカラオケは by the hour(時間制)が多い。日本と同じ仕組みだけど文化が違う。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '喉が枯れた',
        english: [
            'I lost my voice.',
            'My voice is completely gone. I sang way too much.',
            'I think I overdid it. My throat is killing me and I can barely talk.',
            "I cannot believe I sang for three hours straight. My throat feels like sandpaper right now and my voice is completely shot. I am going to sound like a frog at work tomorrow and my boss is going to ask what happened. I should have paced myself but every time a good song came on I could not resist grabbing the mic. Someone should have stopped me. This is partially your fault for encouraging me. I need hot tea and about twelve hours of silence.",
        ],
        context: 'lost my voice は「声が出なくなった」。shot は「ダメになった」。feels like sandpaper は「紙やすりみたい」。paced myself は「ペース配分した」。日本語の「喉が枯れた」はとても日本語的な表現。英語は lost my voice か my voice is gone が自然。',
        character: 'kenji', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 101: 楽器と練習 (Instruments and Practice)
    // Scene: タケシがギターを始めたいと言い出す。楽器経験者が集まってアドバイス大会。
    // ────────────────────────────────────────────────────

    {
        daySlot: 101, japanese: 'ギター始めたいんだけど',
        english: [
            'I want to start playing guitar.',
            'I have been thinking about picking up guitar. Any advice?',
            'I know this sounds random but I really want to learn guitar. Is it too late to start at my age?',
            "So I have been watching a lot of guitar covers on YouTube lately and it looks so cool. I know everyone says that and then gives up after two weeks but I feel like I am actually serious this time. The thing is I have never played any instrument before. Not even recorder in elementary school. Well, I played it but I was terrible. So I am starting from absolute zero here. Is it realistic to learn guitar as an adult or am I setting myself up for disappointment?",
        ],
        context: 'picking up は「始める」。is it too late は「もう遅い？」。starting from absolute zero は「完全なゼロから」。setting myself up for disappointment は「がっかりするだけの結果を作っている」。英語では楽器に play を使い、play the guitar と the が入る。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '独学でいける？',
        english: [
            'Can I teach myself?',
            'Do you think I can learn on my own? Without a teacher?',
            'I am thinking about learning from YouTube tutorials. Do you think that is enough or do I need actual lessons?',
            "Here is the thing. I looked up guitar lessons near me and they are like fifty dollars an hour which adds up fast. But YouTube has a million free tutorials and there are apps that supposedly teach you step by step. My question is, can I actually get decent at guitar without ever taking a single lesson? Or is that one of those things where you need someone watching you to correct your bad habits before they become permanent? Because I am on a budget here.",
        ],
        context: 'on my own は「独学で」。adds up は「積み重なる」。step by step は「段階的に」。bad habits は「悪い癖」。on a budget は「予算が限られている」。self-taught(独学の)も使える。日本語の「独学」は英語だと self-taught か teaching yourself。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '最初はコードから覚えな',
        english: [
            'Start with chords.',
            'Learn the basic chords first. Everything else comes after.',
            'If you want my advice, just learn four or five basic chords and you can already play hundreds of songs.',
            "Forget about shredding solos and fancy techniques. None of that matters in the beginning. What you need to do is learn G, C, D, E minor, and A minor. Those five chords will let you play probably eighty percent of popular songs. Seriously. Most pop songs use the same four chords over and over. Once you can switch between those chords smoothly without looking at your fingers, you are already further along than most people who quit after a month.",
        ],
        context: 'chords は「コード」。shredding は「超高速ソロを弾く」。switch between は「切り替える」。further along は「先に進んでいる」。英語では chord は「コード」だけど cord(紐)と同音。guitar chord と言えば間違えない。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '指が痛くなるよ最初',
        english: [
            'Your fingers will hurt at first.',
            'Fair warning, your fingertips are going to be killing you for the first few weeks.',
            'The first month is brutal on your fingers. You will get calluses but until then every chord is going to hurt.',
            "Nobody tells you this before you start but your fingertips are going to feel like they are on fire for the first couple of weeks. The strings press into your skin and it hurts so bad that you want to stop after ten minutes. But here is the good news. Your body adapts. You develop calluses on your fingertips and after about a month you will not feel any pain at all. The calluses are actually a badge of honor. When guitarists meet each other they compare calluses. It is a thing.",
        ],
        context: 'calluses は「タコ」。brutal は「残酷なほどキツい」。badge of honor は「勲章」。fair warning は「先に言っておくけど」。on fire は「燃えるように痛い」。英語の callus は手のタコにも足のタコにも使える。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '毎日ちょっとずつやるのが大事',
        english: [
            'A little every day is key.',
            'The trick is practicing a little bit every day. Even just fifteen minutes.',
            'Consistency beats intensity. Fifteen minutes a day is better than three hours on the weekend.',
            "I am going to tell you something that applies to learning anything, not just guitar. Consistency is everything. You are better off practicing fifteen minutes every single day than cramming in a three hour session once a week. Your fingers need that daily repetition to build muscle memory. Your brain needs it too. Even on days when you are tired and you do not feel like it, just pick up the guitar and play for ten minutes. That is enough to keep the momentum going. The people who get good are not the ones with the most talent. They are the ones who show up every day.",
        ],
        context: 'consistency beats intensity は「継続は強度に勝る」。muscle memory は「筋肉の記憶」。momentum は「勢い」。show up は「現れる=やり続ける」。cramming は「詰め込む」。「ちょっとずつ」を英語で言うと a little at a time か little by little。',
        character: 'master', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '昔ピアノ習ってた',
        english: [
            'I used to take piano lessons.',
            'I actually took piano lessons when I was a kid. I quit in middle school though.',
            'My mom made me take piano lessons for six years. I hated it at the time but now I wish I had kept going.',
            "You know what is funny? My mom forced me to do piano from first grade all the way through sixth grade and I fought her on it every single week. I used to hide under my bed when it was time for practice. I begged her to let me quit and she finally gave in when I started middle school. And now here I am twenty years later genuinely wishing I had stuck with it. I can still read sheet music and my finger dexterity is pretty good but I cannot play any full pieces anymore. What a waste of six years of my mom is effort.",
        ],
        context: 'used to は「以前は~していた」。fought her on it は「反対した」。gave in は「折れた」。stuck with it は「続けていた」。sheet music は「楽譜」。dexterity は「器用さ」。日本語の「習ってた」は英語だと took lessons が自然。learned でもいいけど lessons の方が具体的。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'どのギター買えばいい？',
        english: [
            'Which guitar should I buy?',
            'What kind of guitar should I get as a beginner? Acoustic or electric?',
            'I have no idea what to look for in a guitar. Can someone come with me to the music store and help me pick one?',
            "I went online to look at guitars and there are literally thousands of options ranging from fifty dollars to five thousand dollars. I do not know what half the specifications mean. What is the difference between a dreadnought and a parlor? What wood should the body be? Does the brand matter? I do not want to spend a fortune on something I might give up on but I also do not want to buy something so cheap that it sounds terrible and makes me want to quit. Is there a sweet spot for beginners?",
        ],
        context: 'sweet spot は「ちょうどいいところ」。specifications は「スペック」。fortune は「大金」。give up on は「諦める」。ranges from A to B は「AからBの範囲」。dreadnought は一般的なアコギの形。英語の楽器店は music store か guitar shop。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'チューニングの仕方わかる？',
        english: [
            'Do you know how to tune it?',
            'Before you start playing, you need to learn how to tune it properly.',
            'First things first. Download a tuner app. If your guitar is out of tune everything is going to sound wrong no matter how well you play.',
            "This is the most basic thing but so many beginners skip it. If your guitar is not in tune it does not matter how perfectly you press the chords because it is going to sound awful. When I first started I played for a whole week on an out of tune guitar and thought I was just bad. Turns out the guitar was the problem, not me. Get a clip-on tuner or just download a free app. It takes thirty seconds and it makes everything sound ten times better. E-A-D-G-B-E. Memorize that. That is standard tuning.",
        ],
        context: 'tune は「チューニングする」。out of tune は「音が狂っている」。clip-on tuner は「クリップ式チューナー」。standard tuning は「標準チューニング」。turns out は「結局~だった」。日本語の「チューニング」はそのまま英語の tuning。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'バンド組もうよ',
        english: [
            'Let us start a band.',
            'We should totally start a band. I am serious.',
            'OK hear me out. Between all of us we have enough instruments to form a band. Who is in?',
            "Think about it. Kenji plays guitar, Lisa can do piano, I will learn bass because I heard it is the easiest to pick up, and Mina can sing. All we need is a drummer. We do not have to be good. We just need to be good enough to play at the bar downstairs once. That is my only goal. One performance in front of a live audience before I die. Is that too much to ask? We can practice on weekends. Come on, it will be the most fun thing we have done in years.",
        ],
        context: 'start a band は「バンドを組む」。who is in は「誰が参加する？」。pick up は「覚える」。too much to ask は「高望みかな？」。日本語の「バンドを組む」は英語では start a band か form a band。「組む」に当たる英語は start/form で、build ではない。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '練習する場所がない',
        english: [
            'I have nowhere to practice.',
            'The problem is I do not have a place to practice. My apartment walls are paper-thin.',
            'I would love to practice more but my neighbors already complained once and I barely played for ten minutes.',
            "This is the biggest obstacle for me. I live in a tiny apartment with walls so thin I can hear my neighbor sneeze. If I start playing guitar at any volume whatsoever someone is going to knock on my door within five minutes. I looked into renting a practice room but the cheapest one near me is fifteen dollars an hour. That is not sustainable if I want to practice every day. I tried playing with headphones through an amp but it is not the same. Any ideas? Does anyone have a garage or something I can use?",
        ],
        context: 'paper-thin は「紙のように薄い」。whatsoever は「少しでも」。sustainable は「持続可能な」。amp は amplifier(アンプ)の略。obstacle は「障害」。英語では noise complaint(騒音苦情)が日本以上に深刻。eviction(退去)につながることも。',
        character: 'mina', category: 'request', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 102: 好きな曲 (Favorite Songs)
    // Scene: 居酒屋で「人生で一番好きな曲は？」という深い質問から始まる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 102, japanese: '人生で一番好きな曲って何？',
        english: [
            'What is your all-time favorite song?',
            'If you had to pick one song as your absolute favorite, what would it be?',
            'OK deep question. What is the one song that means the most to you in your entire life? No cop-outs. Pick one.',
            "This is the hardest question you can ask a music lover. Your all-time favorite song. Not your current favorite, not the one you have been listening to this week, but the one song that if you could only listen to one song for the rest of your life you would choose. The one that brings back the most memories, that defined a period of your life, that you could never get tired of no matter how many times you hear it. Take your time. This is not a question you answer lightly.",
        ],
        context: 'all-time favorite は「人生で一番好き」。cop-out は「逃げ」。defined a period は「ある時期を象徴した」。lightly は「軽々しく」。英語で「一番好きな曲」を聞くときall-timeをつけると重みが出る。without all-time だと今のお気に入りと混同する。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '聴くと学生時代思い出す',
        english: [
            'It reminds me of my school days.',
            'Every time I hear this song it takes me right back to high school.',
            'This song is basically the soundtrack of my teenage years. I cannot hear it without getting nostalgic.',
            "There are certain songs that are just permanently linked to a specific time in your life. This one is high school for me. I used to listen to it on the bus every morning on the way to school. Every time it comes on now I am immediately sixteen again sitting in the back of the bus with my headphones on watching the rain on the window. It is crazy how music can do that. One melody and suddenly you can smell the classroom and feel the uniform and remember exactly who you had a crush on.",
        ],
        context: 'takes me right back は「一気にあの頃に戻す」。soundtrack は比喩で「あの時代のBGM」。nostalgic は「懐かしい気持ち」。crush on は「好きだった人」。英語では music が記憶と結びつく感覚を transport と表現することも。This song transports me to high school.',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '失恋したとき聴いてた',
        english: [
            'I listened to it after a breakup.',
            'This was my breakup song. I played it on repeat for weeks after we split up.',
            'I know it sounds dramatic but this song literally got me through the worst heartbreak of my life.',
            "So you know that period after a breakup where you just lie in bed and do not want to do anything? I was in that mode for about three weeks and this song was on repeat the entire time. I do not know why but sad music actually makes you feel better when you are sad. Like you want to wallow in it for a while. This song understood exactly what I was feeling when nobody else did. It was like the singer had gone through the exact same thing. I still cannot listen to it without getting a little emotional.",
        ],
        context: 'breakup song は「失恋ソング」。got me through は「乗り越えさせてくれた」。wallow in は「浸る」。on repeat は「リピートで」。split up は「別れた」。日本語の「失恋」は英語では heartbreak か breakup。heartbreak の方が感情的に重い。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'この曲聴くと元気出る',
        english: [
            'This song cheers me up.',
            'Whenever I am feeling down, this song always lifts my spirits.',
            'This is my go-to song when I need a mood boost. Two minutes in and I am already feeling better.',
            "Everyone needs a song like this in their life. One that no matter how bad your day was, you press play and within the first few bars your mood just shifts. For me it is the combination of the beat and the lyrics. The beat gets your body moving even when your brain does not want to and the lyrics remind you that things are going to be OK. I have a whole playlist of songs like this actually. I call it my emergency playlist. When life gets rough I hit shuffle and let the music fix me.",
        ],
        context: 'lifts my spirits は「気持ちを上げてくれる」。mood boost は「気分を上げること」。within the first few bars は「最初の数小節で」。hit shuffle は「シャッフル再生する」。cheers me up と lifts my spirits はほぼ同義だけど spirits の方がちょっと詩的。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'あの曲の良さがわからない',
        english: [
            'I do not get the hype.',
            'I know everyone loves that song but honestly I do not get it.',
            'Please do not hate me but I cannot understand why that song is so popular. It does nothing for me.',
            "I know I am probably going to get a lot of pushback for this but I genuinely do not understand the appeal of that song. Everyone acts like it is the greatest thing ever written and I just sit there feeling nothing. I have tried listening to it multiple times because I thought maybe I was missing something. But no. It just does not connect with me. And that is OK. Music is subjective. Not everything has to land with everyone. But I feel like I am the only person on the planet who feels this way about it.",
        ],
        context: 'I do not get the hype は「何がそんなにいいのかわからない」。does nothing for me は「何も感じない」。pushback は「反発」。appeal は「魅力」。land with は「響く」。subjective は「主観的な」。音楽の好みを否定するのは英語圏でもちょっと勇気がいる。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '泣ける曲ってある？',
        english: [
            'Are there songs that make you cry?',
            'Is there a song that always makes you tear up no matter what?',
            'Do you guys have a song that you physically cannot listen to without getting emotional? Because I have at least three.',
            "I am not someone who cries easily but there are certain songs that just break me every single time. It is not even about the lyrics necessarily. Sometimes it is just the melody or the way the singer's voice cracks at a certain moment. My body just reacts before my brain can stop it. There is one song in particular that I have to skip whenever it comes on shuffle because if I am in public and it starts playing I will embarrass myself. That is how powerful music can be. It bypasses your logical brain completely.",
        ],
        context: 'tear up は「涙ぐむ」。breaks me は「(感情的に)壊す」。cracks は「(声が)震える」。bypasses は「迂回する=すり抜ける」。日本語の「泣ける」は英語では makes you cry だけど、tear up(涙ぐむ)の方がリアル。号泣ではなくじわっとくる感じ。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '歌詞の意味今更わかった',
        english: [
            'I finally understood the lyrics.',
            'I just realized what the lyrics actually mean after all these years.',
            'I have been singing this song for ten years and I only just now figured out what it is really about. I feel so dumb.',
            "You know when you hear a song as a kid and you think it is about one thing and then you grow up and listen to it again and realize it is about something completely different? That just happened to me. I have been singing along to this song since middle school thinking it was a happy love song. Turns out it is about losing someone. The whole thing is a metaphor for grief and I was out there dancing to it at parties like an idiot. But honestly that is also kind of beautiful. The melody tricked me into processing something heavy without even knowing it.",
        ],
        context: 'figured out は「理解した」。turns out は「実は~だった」。metaphor for は「~の比喩」。singing along は「一緒に歌う」。processing は「(感情を)処理する」。英語の歌詞は比喩が多く、日本語より二重の意味を持つことが多い。',
        character: 'master', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'あのイントロ聴いただけでわかる',
        english: [
            'I can tell from the intro alone.',
            'The second the intro starts I know exactly what song it is.',
            'I only need like three notes of the intro and I have already got it. Some songs are just that iconic.',
            "There are songs where the intro is so legendary that you do not even need to hear the vocals to know what it is. Like the first two notes hit and the entire room goes crazy because everyone recognizes it instantly. That is the mark of a truly great song. When the intro alone gives you chills. I could probably identify a hundred songs from just the first three seconds. My friends and I used to play that game actually. Someone plays the first second of a song and you have to guess it. I was unbeatable.",
        ],
        context: 'iconic は「象徴的な」。gives you chills は「鳥肌が立つ」。the mark of は「~の証」。unbeatable は「無敵」。intro は introduction の略。日本語の「イントロ」はそのまま英語でも intro で通じる。intro quiz はパーティーゲームの定番。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'この曲聴くと走りたくなる',
        english: [
            'This song makes me want to run.',
            'When this song comes on I just want to sprint. The energy is insane.',
            'I cannot listen to this song sitting still. My body just starts moving on its own. It is the ultimate workout song.',
            "Everyone has that one song that turns them into a different person. For me it is this one. The moment it comes on I go from lying on the couch to wanting to run a marathon. My heartbeat actually speeds up. I am not exaggerating. I tested it once with my smartwatch and my heart rate went up fifteen beats per minute just from listening. I put it at the start of every workout playlist because if I do not start with this song I cannot get motivated. It is basically caffeine in audio form.",
        ],
        context: 'sprint は「全力疾走する」。workout song は「運動用の曲」。beats per minute は「BPM」。caffeine in audio form は「音声版カフェイン」。英語では pump-up song(テンション上げる曲)や hype song とも言う。motivate は「やる気にさせる」。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '一曲だけって選べないよ',
        english: [
            'I cannot pick just one.',
            'That is impossible. You cannot make me choose just one song.',
            'I have been sitting here for five minutes trying to narrow it down and I honestly cannot. It is too hard.',
            "You are asking the wrong person because I am physically incapable of choosing just one favorite song. It depends on my mood, the time of day, the season, what I am doing. My top ten changes every week. Right now I could give you a top five but even that feels wrong because I know I am leaving something out. Music is too important to me to reduce it to a single choice. That is like asking a parent to pick their favorite child. You just cannot do it. So I am going to give you three and you will have to live with that.",
        ],
        context: 'narrow it down は「絞る」。incapable of は「~できない」。leaving something out は「何かを外している」。reduce to は「~に絞る」。live with that は「それで我慢して」。英語で「選べない」を表すときYou cannot make me choose が感情的で自然。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 103: 音楽配信 (Streaming Music)
    // Scene: SpotifyとApple Musicどっち派？から始まるストリーミング論争。
    // ────────────────────────────────────────────────────

    {
        daySlot: 103, japanese: 'サブスク何使ってる？',
        english: [
            'What streaming service do you use?',
            'Are you Spotify or Apple Music? Or something else?',
            'I am trying to decide which music subscription to get. What does everyone here use?',
            "So I have been using the free version of Spotify with ads and I am finally ready to pay for a subscription because the ads are driving me insane. But now I cannot decide between Spotify and Apple Music. They seem pretty similar but I know people have strong opinions about this. Spotify has better playlists but Apple Music supposedly has better sound quality. And then there is YouTube Music which is included with YouTube Premium. Someone just tell me what to get because I have been going back and forth for a week.",
        ],
        context: 'subscription は「サブスクリプション」。driving me insane は「気が狂いそう」。going back and forth は「迷っている」。sound quality は「音質」。日本語の「サブスク」は英語だと subscription か streaming service。sub とは略さない。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'プレイリスト共有して',
        english: [
            'Share your playlist with me.',
            'Can you send me that playlist? I need new music.',
            'I love your taste in music. Can you share your playlist? I will follow it and steal all your songs.',
            "You always have the best music playing and I want to know your secret. Is it a curated playlist or are you just really good at finding new stuff? Either way, share it with me. I am so tired of listening to the same songs over and over. I need someone with actual good taste to introduce me to new artists. My Discover Weekly has been terrible lately. It keeps recommending the same three genres and I want something different. Just send me whatever you have been listening to this month and I will work from there.",
        ],
        context: 'share は「共有する」。taste in music は「音楽の趣味」。curated は「厳選された」。Discover Weekly は Spotify の自動推薦プレイリスト。work from there は「そこから進める」。follow は SNS と同じで「フォローする」。playlist sharing は英語圏の友人関係で大事な文化。',
        character: 'yuki', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'CDってもう買わないよね',
        english: [
            'Nobody buys CDs anymore.',
            'When was the last time you actually bought a physical CD?',
            'CDs feel like ancient technology at this point. Everything is streaming now.',
            "I was cleaning out my closet last weekend and found a box of like two hundred CDs from high school and college. It felt like opening a time capsule. I used to spend my entire allowance at the record store every month picking out albums based on the cover art because you could not preview anything. You just had to trust your gut. Now I have access to literally every song ever recorded for ten dollars a month and I somehow listen to less variety than I did back then. Something about having too many choices makes you choose nothing.",
        ],
        context: 'physical CD は「現物のCD」。ancient technology は「古代の技術」。time capsule は「タイムカプセル」。allowance は「お小遣い」。record store は「レコード店」。trust your gut は「直感を信じる」。paradox of choice(選択のパラドックス)を地で行く話。',
        character: 'master', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'レコードが流行ってるらしい',
        english: [
            'Vinyl is making a comeback.',
            'Did you know vinyl records are actually trending again?',
            'It is funny. My parents thought records were dead and now young people are buying turntables and collecting vinyl.',
            "The vinyl revival is real and I think it is actually great. There is something about putting a record on that streaming cannot replicate. The ritual of it. You take the record out of the sleeve, place it on the turntable, drop the needle, and then you sit down and listen to the whole album front to back. You do not skip tracks. You do not shuffle. You experience it the way the artist intended. Plus the sound is warmer. People argue about whether vinyl actually sounds better but to me it just feels better. It is a different relationship with music.",
        ],
        context: 'comeback は「復活」。revival は「復興」。turntable は「ターンテーブル」。drop the needle は「針を落とす」。front to back は「最初から最後まで」。sleeve は「レコードの紙ジャケット」。日本語の「アナログ」は英語では vinyl か analog record。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'アルゴリズムがいい曲教えてくれる',
        english: [
            'The algorithm recommends good songs.',
            'I actually find most of my new music through the algorithm now.',
            'Say what you want about algorithms but Spotify knows my taste better than my own friends do.',
            "It is kind of scary how well the algorithm knows me at this point. It recommended a song last week from an artist I had never heard of and it was perfect. Like exactly what I did not know I wanted to hear. But it also makes me wonder if I am trapped in a bubble. Am I only hearing things that are similar to what I already like? Am I missing out on entire genres because the algorithm decided I would not be interested? There is a trade-off between convenience and discovery. The algorithm gives you what you want but not always what you need.",
        ],
        context: 'algorithm は「アルゴリズム」。trapped in a bubble は「バブルに閉じ込められている=偏った情報だけ見ている」。missing out on は「見逃している」。trade-off は「トレードオフ」。filter bubble はSNSでも音楽でも問題になっている概念。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'ダウンロードしとけば電波なくても聴ける',
        english: [
            'Download it for offline listening.',
            'If you download it you can listen even without a signal.',
            'I always download my playlists before a flight because there is nothing worse than being stuck with no music for five hours.',
            "Pro tip for anyone who commutes by subway. Download your playlists when you are on wifi at home so you do not burn through your data underground. I learned this the hard way when I used up my entire monthly data plan in three days because I was streaming high quality audio on the train twice a day. Now I download everything the night before. It takes like two minutes and saves me a fortune on data. Offline mode is honestly the best feature of any music app. I do not know how I survived before it existed.",
        ],
        context: 'offline listening は「オフライン再生」。burn through は「使い果たす」。data plan は「データプラン・通信量」。learned this the hard way は「痛い目にあって学んだ」。saves me a fortune は「大金を節約できる」。日本語の「ダウンロード」は英語でも download。',
        character: 'mina', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: '広告うざすぎる',
        english: [
            'The ads are so annoying.',
            'I cannot stand the ads. They play at the worst possible moments.',
            'Nothing kills the mood faster than an ad for car insurance right in the middle of a love song.',
            "I was listening to this beautiful ballad the other day and right at the emotional climax, right when the singer hit the high note and I was getting goosebumps, the music stopped and a thirty-second ad for discount mattresses started playing at full volume. I almost threw my phone across the room. This is how they get you to pay for premium. They intentionally make the free version unbearable. And you know what? It works. Because I am about two ads away from giving them my money. They broke me. They win.",
        ],
        context: 'cannot stand は「我慢できない」。kills the mood は「雰囲気を壊す」。goosebumps は「鳥肌」。at full volume は「フル音量で」。unbearable は「耐えられない」。they broke me は「もう降参」。free版の広告戦略は英語圏でも同じ不満のネタ。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'ポッドキャストも聴く？',
        english: [
            'Do you listen to podcasts too?',
            'Are you into podcasts? I feel like everyone has one now.',
            'I started listening to podcasts instead of music during my commute and now I am completely addicted.',
            "I used to be a music-only person during my commute but someone recommended a podcast about true crime and now I am down the rabbit hole. I have like fifteen shows in my subscriptions and I cannot keep up. The weird thing is I will listen to a two hour podcast about a random topic I never cared about before and somehow find it fascinating. Like last week I listened to an entire episode about the history of elevators and I was completely hooked. Who knew elevators had such a dramatic backstory? Podcasts have ruined music for me and I am not even mad about it.",
        ],
        context: 'down the rabbit hole は「沼にハマった」(不思議の国のアリスから)。subscriptions は「購読リスト」。keep up は「ついていく」。backstory は「裏話・歴史」。true crime は「実録犯罪もの」。podcast の発音は「パッドキャスト」で日本語の「ポッドキャスト」とは少し違う。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: '音質こだわる？',
        english: [
            'Do you care about sound quality?',
            'Are you picky about audio quality? Like can you tell the difference?',
            'Be honest. Can you actually hear the difference between normal and high-res audio or is it just placebo?',
            "I know people who spend hundreds of dollars on audiophile headphones and they swear they can hear details that normal people cannot. And maybe they are right. But I did a blind test once where someone played the same song in regular quality and then in lossless and I could not tell the difference at all. Not even a little. Either my ears are broken or the difference is way more subtle than people make it out to be. I think for ninety-nine percent of listeners, regular streaming quality is perfectly fine. But try telling that to an audiophile. They will look at you like you just insulted their family.",
        ],
        context: 'picky は「こだわりが強い」。placebo は「プラセボ(思い込み)」。audiophile は「オーディオマニア」。lossless は「ロスレス(非圧縮)」。blind test は「ブラインドテスト」。make it out to be は「実際以上に言う」。音質論争は英語圏のオーディオコミュニティの永遠のテーマ。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'イヤホンどれがいい？',
        english: [
            'Which earbuds should I get?',
            'I need new earbuds. Any recommendations?',
            'My earbuds just died and I need a replacement. Is it worth spending more for noise-canceling?',
            "I have been using the free earbuds that came with my phone for the last three years and they finally gave out. Now I need to buy a real pair and I am completely lost. There are like a thousand options. Do I go wireless or wired? Over-ear or in-ear? Noise-canceling or transparency mode? What about battery life? I commute for an hour each way so I need something that lasts at least three hours without dying. And I refuse to spend more than a hundred dollars because I know I am going to lose one of them within six months. I always do. It is my curse.",
        ],
        context: 'earbuds は「イヤホン(カナル型)」。gave out は「壊れた」。noise-canceling は「ノイズキャンセリング」。transparency mode は「外音取り込み」。battery life は「バッテリー持ち」。each way は「片道」。日本語の「イヤホン」は英語では earbuds か earphones。headphones は大型のもの。',
        character: 'mina', category: 'shopping', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 104: フェスの思い出 (Festival Memories)
    // Scene: 夏フェスの思い出で盛り上がる。最高と最悪のエピソードが次々出てくる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 104, japanese: '夏フェス行ったことある？',
        english: [
            'Have you been to a music festival?',
            'Have you ever been to a summer music festival? Like a big outdoor one?',
            'Tell me you have been to at least one music festival in your life. It is a rite of passage.',
            "I cannot believe some of you have never been to a music festival. It is one of those things that everyone should experience at least once. I am not talking about a regular concert. I mean a full three-day outdoor festival with multiple stages, camping, food vendors, the whole thing. You wake up in a tent, walk around in the sun all day, see ten different bands, eat questionable food from a truck, and pass out exhausted at two AM. And then you do it all over again the next day. It sounds miserable when I describe it like that but it is genuinely the most fun you will ever have.",
        ],
        context: 'rite of passage は「通過儀礼=一度は経験すべきこと」。multiple stages は「複数ステージ」。food vendors は「屋台」。questionable は「怪しい」。pass out は「倒れるように寝る」。all over again は「もう一回最初から」。英語の festival は fes とは略さない。fest は使う。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '日焼けがやばかった',
        english: [
            'I got so sunburned.',
            'The sunburn was brutal. I could not sleep for two days.',
            'I forgot to put on sunscreen and I literally looked like a lobster by the end of the first day.',
            "Nobody warns you about the sunburn at festivals. You are standing in direct sunlight for eight hours straight and you think you are fine because there is a breeze and you do not feel hot. But then you get back to your tent and look in the mirror and your face is the color of a fire truck. I peeled for an entire week after my first festival. My shoulders were so burned that wearing a shirt felt like sandpaper on raw skin. Now I bring industrial-strength sunscreen and reapply every two hours like my life depends on it. Because it literally does.",
        ],
        context: 'sunburned は「日焼け(やけどレベル)」。lobster は「ロブスター=真っ赤」。peeled は「皮がむけた」。reapply は「塗り直す」。industrial-strength は「工業用=超強力な」(誇張表現)。英語では tan(健康的な焼け)と sunburn(火傷レベル)を明確に区別する。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'テント設営が地獄だった',
        english: [
            'Setting up the tent was a nightmare.',
            'We spent two hours trying to set up the tent and it still looked wrong.',
            'I brought a tent I had never practiced setting up and it took four of us to figure it out. Never again.',
            "Let me paint you a picture. It is ninety degrees, there is no shade anywhere, we just walked twenty minutes from the parking lot carrying all our gear, and now I have to assemble this tent that I bought online the day before without ever opening the box. The instructions are in twelve languages and none of them make sense. There are poles that do not fit anywhere and stakes that bend the moment you try to hammer them into the ground. Three hours later we have something that vaguely resembles a tent but leans dangerously to the left. We slept in it anyway.",
        ],
        context: 'setting up は「設営する」。nightmare は「悪夢」。paint you a picture は「状況を説明する」。gear は「荷物・装備」。stakes は「杭・ペグ」。vaguely resembles は「なんとなく似ている」。英語で tent は camping とセット。festival camping は英語圏フェスの醍醐味。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '雨降ってきて最悪だった',
        english: [
            'It started raining and it was awful.',
            'The rain completely ruined the second day. Everything was mud.',
            'It went from sunny to pouring in about ten minutes and we were stuck in the middle of a field with nowhere to hide.',
            "Outdoor festivals and rain are the worst combination imaginable. One minute you are dancing in the sunshine and the next minute the sky opens up and dumps an ocean on you. The field turns into a mud pit instantly. Your shoes are gone. Not lost, just destroyed. People are slipping and sliding everywhere. Someone fell face-first into the mud right next to me and I wanted to help but I was laughing too hard. The bands kept playing though and honestly there is something weirdly beautiful about thousands of people singing in the rain covered in mud. It becomes this shared experience that bonds everyone together.",
        ],
        context: 'pouring は「土砂降り」。mud pit は「泥の池」。the sky opens up は「空が割れる=大雨が降る」。slipping and sliding は「滑りまくる」。bonds everyone together は「みんなを結びつける」。英語圏のフェスでは rain = 泥 = 名物エピソード。Glastonbury が有名。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '知らないバンドが意外に良かった',
        english: [
            'A band I never heard of was surprisingly good.',
            'The best act I saw was one I had never even heard of before.',
            'I randomly walked into a small stage and discovered this band that absolutely blew me away.',
            "This is the best thing about festivals. You go for the headliner but you discover your new favorite band at a tiny stage with fifty people watching. I was killing time between sets and wandered over to this side stage where some band I had never heard of was playing. Within thirty seconds I was completely captivated. Their energy was incredible and the lead singer had this voice that gave me chills. I immediately followed them on Spotify and they only had like two thousand listeners. I felt like I discovered buried treasure. That one random set made the entire weekend worth it.",
        ],
        context: 'act は「出演アーティスト」。headliner は「メインアクト」。blew me away は「衝撃を受けた」。killing time は「時間を潰す」。wandered over は「ふらっと行った」。captivated は「魅了された」。buried treasure は「埋蔵金=隠れた名品」。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'トイレの行列がえぐかった',
        english: [
            'The bathroom line was insane.',
            'I waited thirty minutes for the bathroom and I am never doing that again.',
            'The portable toilets at festivals are a war zone. I would rather hold it for twelve hours than go in there.',
            "Let me tell you about festival bathrooms because nobody talks about this part. You walk up to a row of portable toilets that have been used by ten thousand people in ninety-degree heat for two days straight. The smell hits you from twenty feet away. There is no toilet paper. There is no hand sanitizer. The floor is a mystery liquid you do not want to identify. And the line is forty-five minutes long. I once saw someone look inside, immediately close the door, and just walk into the woods instead. I completely understood their decision. It is survival mode out there.",
        ],
        context: 'portable toilets は「仮設トイレ」。war zone は「戦場」。hold it は「我慢する」。mystery liquid は「正体不明の液体」。survival mode は「サバイバルモード」。英語では porta-potty(ポータポティ)とも呼ぶ。フェスのトイレ話は万国共通の地獄エピソード。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'フェス飯って高いけどうまい',
        english: [
            'Festival food is pricey but good.',
            'The food at festivals costs a fortune but honestly it is worth it.',
            'I spent more money on food than on the actual ticket. But the tacos from that one truck were life-changing.',
            "Festival food is highway robbery and I say that as someone who happily pays it every time. Fifteen dollars for a burrito? Sure. Ten dollars for a lemonade? Why not. My wallet is crying but my stomach is happy. The thing is, you are in the sun all day walking and dancing so you burn through calories like crazy. By three PM you would pay anything for food and the vendors know it. But I will say this. Some of the best meals I have ever had were from random food trucks at festivals. There is this one place that does smoked brisket tacos and I have genuinely thought about driving three hours to a festival just for those tacos.",
        ],
        context: 'highway robbery は「ぼったくり」。costs a fortune は「めちゃくちゃ高い」。life-changing は「人生を変える」。burn through calories は「カロリーを消費する」。vendors は「出店者」。food truck は「キッチンカー」。日本語の「フェス飯」は festival food と言えばOK。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '来年も絶対行こう',
        english: [
            'We are definitely going next year.',
            'I am already planning for next year. Who is coming with me?',
            'If you did not enjoy yourself this time, you were doing it wrong. We are going back next year and I am not taking no for an answer.',
            "I know we are exhausted and sunburned and my feet hurt and I spent way too much money but I am already looking at next year is lineup rumors. This is what festivals do to you. You spend the entire weekend complaining about the heat and the lines and the bathrooms but the second it is over you start planning the next one. It is like some kind of Stockholm syndrome but for outdoor music events. I am going to start saving money now so I can afford VIP tickets next time. The VIP area has real bathrooms and shade. That alone is worth the upgrade.",
        ],
        context: 'I am not taking no for an answer は「ノーは受け付けない」。lineup は「出演者リスト」。Stockholm syndrome は「ストックホルム症候群=辛いのに離れられない」。VIP は「ヴィアイピー」(英語では「ヴィップ」とは読まない)。upgrade は「アップグレード」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '写真より目に焼き付けたい',
        english: [
            'I want to remember it with my eyes, not my phone.',
            'I stopped filming and just took it all in. Some moments are better without a screen.',
            'Everyone around me had their phones up recording but I put mine away. I wanted to actually be there, not watch it through a four-inch screen.',
            "I used to be the person who recorded everything. Every song, every moment, the whole concert through my phone screen. Then I watched the videos later and realized they were terrible. Shaky footage, horrible audio, and I could not even remember the actual experience because I was so focused on filming it. So now I have a rule. Phones away for at least half the show. Just stand there, look at the stage with your actual eyes, feel the bass in your chest, hear the crowd singing around you. That is what you will remember ten years from now. Not a blurry video in your camera roll that you will never watch again.",
        ],
        context: 'took it all in は「全部目に焼き付けた」。footage は「映像」。camera roll は「カメラロール」。be there は「その場にいる(精神的に)」。英語では live in the moment(今を生きる)という表現がこの感覚に近い。スマホ越しに体験する問題は英語圏でもよく議論される。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'あの瞬間が忘れられない',
        english: [
            'I will never forget that moment.',
            'That one moment is burned into my memory forever.',
            'Years from now when I look back at my life, that moment at the festival is going to be one of the highlights.',
            "There are moments in life where time just stops. Where everything around you aligns perfectly and you think, this is it. This is what being alive feels like. For me it was standing in that crowd at sunset watching my favorite band play my favorite song. The sky was orange and pink, there were thousands of people singing every word, and I looked at my friends next to me and everyone had this look on their face like they were exactly where they were supposed to be. Nobody said anything. We just looked at each other and smiled. That is the power of live music. It creates moments that nothing else in the world can replicate.",
        ],
        context: 'burned into my memory は「記憶に焼き付いている」。highlights は「ハイライト」。aligns は「噛み合う」。replicate は「再現する」。英語では core memory(核心的な記憶)という表現が最近使われるようになった。Pixarのインサイドヘッドから広まった表現。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
];

// ============================================================
// DAY THEMES & KEYWORDS -- MONTH 4 WEEK 14
// ============================================================

export const MONTH4_W14_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    98: {
        title: '音楽の趣味', titleEn: 'Music Taste', category: 'social',
        scene: '居酒屋で「どんな音楽聴くの？」から始まる趣味トーク。世代間ギャップが面白い。',
        keywords: [
            { en: 'playlist', ja: 'プレイリスト', pron: 'プレイリスト', example: 'My playlist is all over the place.', note: 'play + list。英語圏では playlist sharing が友人関係の証。Spotifyのプレイリストを共有するのは結構親密な行為。' },
            { en: 'catchy', ja: '耳に残る', pron: 'キャッチー', example: 'This song is so catchy.', note: 'catch(捕まえる)が語源。耳が捕まれる=耳に残る。catchy tune, catchy melody。褒め言葉。反対は forgettable。' },
            { en: 'lyrics', ja: '歌詞', pron: 'リリクス', example: 'The lyrics really speak to me.', note: '常に複数形。a lyric とは普通言わない。lyricist=作詞家。英語の歌詞はダブルミーニングが多い。' },
            { en: 'vibe', ja: '雰囲気・ノリ', pron: 'ヴァイブ', example: 'This song has a chill vibe.', note: '元は振動(vibration)。今は雰囲気・空気感全般に使う万能語。good vibes, bad vibes, vibes だけでも使う。' },
            { en: 'nostalgic', ja: '懐かしい', pron: 'ノスタルジック', example: 'That song makes me feel nostalgic.', note: '日本語の「懐かしい」より重い。甘くて少し切ない感情。名詞は nostalgia。nostalgic for my childhood のように for と使う。' },
        ],
    },
    99: {
        title: 'ライブに行く', titleEn: 'Going to Concerts', category: 'travel',
        scene: 'ケンジが初めて洋楽アーティストのライブに行く。チケット争奪戦からの話。',
        keywords: [
            { en: 'venue', ja: '会場', pron: 'ヴェニュー', example: 'The venue was packed.', note: '発音注意。「ベニュー」ではなく「ヴェニュー」。concert venue, wedding venue。場所全般に使える。' },
            { en: 'encore', ja: 'アンコール', pron: 'アンコー', example: 'They played three songs for the encore.', note: 'フランス語由来で「もう一度」。日本語の「アンコール」と同じ。掛け声は英語では One more song! が主流。' },
            { en: 'merch', ja: 'グッズ', pron: 'マーチ', example: 'Did you see the merch table?', note: 'merchandise の略。発音は「マーチ」。tour merch=ツアーグッズ。日本語の「グッズ」は goods だけど音楽ではmerch。' },
            { en: 'setlist', ja: 'セットリスト', pron: 'セットリスト', example: 'The setlist was perfect.', note: '日本語の「セトリ」は英語圏でも setlist で通じる珍しい例。set は「演目一式」の意味。' },
            { en: 'scalper', ja: '転売ヤー', pron: 'スキャルパー', example: 'Scalpers bought all the tickets.', note: 'scalp=頭皮を剥ぐ(語源が怖い)。ticket scalping=チケット転売。英語圏でも深刻な社会問題。reseller とも。' },
        ],
    },
    100: {
        title: 'カラオケ', titleEn: 'Karaoke Night', category: 'social',
        scene: '二次会でカラオケへ。選曲バトルと歌唱力論争が始まる。',
        keywords: [
            { en: 'tone-deaf', ja: '音痴', pron: 'トーンデフ', example: 'I am completely tone-deaf.', note: 'tone(音程)+deaf(聞こえない)=音程が聞こえない=音痴。cannot carry a tune も同義。自虐で使うのが多い。' },
            { en: 'duet', ja: 'デュエット', pron: 'デュエット', example: 'Let us sing a duet.', note: 'duo(2人組)と似ているけど別。duet=2人で歌う曲。trio=3人。solo=1人。英語の発音は「デュエット」でOK。' },
            { en: 'mic', ja: 'マイク', pron: 'マイク', example: 'Pass me the mic.', note: 'microphone の略。mic hog=マイク独占者。drop the mic=マイクを落とす(最高の一言で終わる)。比喩でも使う。' },
            { en: 'pitch', ja: '音程', pron: 'ピッチ', example: 'I cannot match the pitch.', note: '音の高さ。pitch-perfect=完璧な音程。off-pitch=音程がずれている。sales pitch(売り込み)とは別の意味。' },
            { en: 'chorus', ja: 'サビ', pron: 'コーラス', example: 'Everyone sings along to the chorus.', note: '日本語の「サビ」は英語では chorus。verse=Aメロ、bridge=Bメロ、chorus=サビ。英語圏では hook(フック)とも呼ぶ。' },
        ],
    },
    101: {
        title: '楽器と練習', titleEn: 'Instruments and Practice', category: 'request',
        scene: 'タケシがギターを始めたいと言い出す。楽器経験者が集まってアドバイス大会。',
        keywords: [
            { en: 'chord', ja: 'コード', pron: 'コード', example: 'Learn five basic chords first.', note: 'cord(紐)と同音だけど意味は全く違う。power chord, bar chord。日本語の「コード」はそのまま通じる。' },
            { en: 'callus', ja: 'タコ(指の)', pron: 'キャラス', example: 'You will develop calluses on your fingers.', note: '皮膚が硬くなったタコ。ギタリストの勲章。calluses(複数形)で使うことが多い。blister(マメ)とは違う。' },
            { en: 'self-taught', ja: '独学の', pron: 'セルフトート', example: 'He is a self-taught guitarist.', note: 'self(自分)+taught(teach の過去分詞)=自分で教えた=独学。形容詞として使う。I am self-taught. で「独学です」。' },
            { en: 'rehearsal', ja: 'リハーサル', pron: 'リハーサル', example: 'We have band rehearsal on Saturday.', note: 'rehearse=練習する。practice より正式。バンドの練習は rehearsal、個人練習は practice が自然。dress rehearsal=最終リハ。' },
            { en: 'tuning', ja: 'チューニング', pron: 'チューニング', example: 'Your guitar is out of tuning.', note: 'tune=調律する。in tune=音が合っている。out of tune=音が狂っている。fine-tuning=微調整。比喩でも使える。' },
        ],
    },
    102: {
        title: '好きな曲', titleEn: 'Favorite Songs', category: 'feeling',
        scene: '居酒屋で「人生で一番好きな曲は？」という深い質問から始まる。',
        keywords: [
            { en: 'all-time', ja: '史上最高の', pron: 'オールタイム', example: 'What is your all-time favorite?', note: 'all-time favorite=人生で一番好き。all-time great=史上最高。ハイフンで繋げて形容詞化。all-time low=史上最低。' },
            { en: 'goosebumps', ja: '鳥肌', pron: 'グースバンプス', example: 'This song gives me goosebumps.', note: 'goose(ガチョウ)+bumps(ぶつぶつ)=鳥肌。日本語は鳥、英語はガチョウ。chills でも同じ意味。常に複数形。' },
            { en: 'anthem', ja: '応援歌・アンセム', pron: 'アンセム', example: 'That is our generation is anthem.', note: '元は聖歌。今は世代や集団を代表する曲。national anthem=国歌。90s anthem=90年代のアンセム。' },
            { en: 'melody', ja: 'メロディー', pron: 'メロディー', example: 'The melody is stuck in my head.', note: '日本語と同じだけど、英語では tune(曲調)とよく使い分ける。melody はより音楽理論的。casual には tune が多い。' },
            { en: 'ballad', ja: 'バラード', pron: 'バラッド', example: 'I love a good ballad.', note: '発音注意。「バラード」ではなく「バラッド」。ゆっくりした感情的な曲。power ballad=盛り上がるバラード。' },
        ],
    },
    103: {
        title: '音楽配信', titleEn: 'Streaming Music', category: 'shopping',
        scene: 'SpotifyとApple Musicどっち派？から始まるストリーミング論争。',
        keywords: [
            { en: 'subscription', ja: 'サブスクリプション', pron: 'サブスクリプション', example: 'I just got a music subscription.', note: 'subscribe=購読する。日本語の「サブスク」は和製略語。英語では sub とは略さない。cancel my subscription=解約する。' },
            { en: 'algorithm', ja: 'アルゴリズム', pron: 'アルゴリズム', example: 'The algorithm knows my taste.', note: '発音は「アルゴリズム」。自動推薦の仕組み。the algorithm は擬人化して使われることが多い。filter bubble 問題と関連。' },
            { en: 'offline', ja: 'オフライン', pron: 'オフライン', example: 'Download it for offline listening.', note: 'offline mode=オフラインモード。go offline=オフラインにする。反対は online。飛行機内や地下鉄で必須。' },
            { en: 'vinyl', ja: 'レコード盤', pron: 'ヴァイナル', example: 'Vinyl is making a comeback.', note: '発音は「ヴァイナル」。素材名(ビニール)がそのままレコードの意味に。vinyl record, vinyl collection。復活中。' },
            { en: 'premium', ja: 'プレミアム(有料版)', pron: 'プリーミアム', example: 'I upgraded to premium.', note: '発音は「プリーミアム」で「プレミアム」ではない。premium plan=有料プラン。freemium=無料+有料のビジネスモデル。' },
        ],
    },
    104: {
        title: 'フェスの思い出', titleEn: 'Festival Memories', category: 'social',
        scene: '夏フェスの思い出で盛り上がる。最高と最悪のエピソードが次々出てくる。',
        keywords: [
            { en: 'headliner', ja: 'メインアクト', pron: 'ヘッドライナー', example: 'Who is the headliner this year?', note: 'headline=見出し。一番目立つ=メインアクト。headline a festival=フェスのメインを務める。closing act とも。' },
            { en: 'sunburn', ja: '日焼け(やけど)', pron: 'サンバーン', example: 'I got a terrible sunburn.', note: 'tan=健康的な焼け。sunburn=やけどレベル。日本語の「日焼け」は両方含むけど英語は明確に区別。sunscreen=日焼け止め。' },
            { en: 'mud', ja: '泥', pron: 'マッド', example: 'The whole field turned to mud.', note: 'muddy=泥だらけの。mud pit=泥の池。英語圏フェスでは雨=泥=名物。Glastonbury は mud festival と呼ばれるほど。' },
            { en: 'lineup', ja: '出演者リスト', pron: 'ラインナップ', example: 'The lineup this year is stacked.', note: 'stacked=豪華。star-studded lineup=スター揃い。日本語の「ラインナップ」はそのまま通じる珍しい和製英語。' },
            { en: 'camping', ja: 'キャンプ(テント泊)', pron: 'キャンピング', example: 'Are you camping at the festival?', note: 'glamping=豪華キャンプ(glamorous+camping)。camp out=キャンプする。英語圏フェスではキャンプが標準。日本とは違う文化。' },
        ],
    },
};
