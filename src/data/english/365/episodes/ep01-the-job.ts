/**
 * 365 English Master Course -- Episode 1: The First Step
 *
 * TOEIC-trained professionals who can't speak. They find each other at Gondo's izakaya.
 * 7-day arc: freeze -> shared struggle -> proposal -> first try -> small steps -> real world -> resolve
 *
 * Characters:
 *   Yuki (28F) - Trading company sales, TOEIC 620, protagonist
 *   Master Gondo (58M) - Izakaya owner, ex-TOEIC instructor
 *   Takeshi (35M) - IT project manager, comic relief
 *   Lisa (32F) - Marketing returnee, fluent English
 *   Kenji (45M) - Construction director, reluctant
 *   Mina (24F) - Temp worker, shy, good listener
 */

export interface Episode365Entry {
    id: string;
    day: number;
    title: string;
    titleJa: string;
    location: string;
    lines: Array<{
        speaker: string;
        speakerGender: 'male' | 'female';
        text: string;
        textJa: string;
    }>;
}

export interface Episode365 {
    id: string;
    series: string;
    title: string;
    titleJa: string;
    episode: number;
    phase: number;
    daysTotal: number;
    characters: string[];
    entries: Episode365Entry[];
}

export const EP01_THE_FIRST_STEP: Episode365 = {
    id: '365-ep01',
    series: '365-the-first-step',
    title: 'The First Step',
    titleJa: '最初の一歩',
    episode: 1,
    phase: 1,
    daysTotal: 7,
    characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'],
    entries: [
        // ============================================================
        // DAY 1: The Problem
        // Yuki sits at Gondo's counter. She froze today.
        // ============================================================
        {
            id: '365-ep01-day1',
            day: 1,
            title: 'The Problem',
            titleJa: '問題',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "You look tired today, Yuki.",
                    textJa: '今日は疲れた顔してるな、ユキ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Master Gondo... something bad happened at work today.",
                    textJa: 'マスター...今日、仕事でひどいことがあったんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Tell me. I will listen.",
                    textJa: '話してみろ。聞くから。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "A foreign client came to our office.",
                    textJa: '外国人のお客さんがオフィスに来たんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "And?",
                    textJa: 'それで？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "He said 'Hello, nice to meet you.' That is all. Just that.",
                    textJa: '「Hello, nice to meet you」って言ったんです。それだけ。たったそれだけ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "And I could not say anything. Not one word.",
                    textJa: 'それなのに、何も言えなかったんです。一言も。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "You froze.",
                    textJa: '固まったか。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Yes. I just stood there. Like a statue.",
                    textJa: 'はい。突っ立ったまま。まるで銅像みたいに。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "But you studied English for TOEIC, right?",
                    textJa: 'でもTOEICのために英語勉強したんだろ？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Yes. I got 620 on the TOEIC test. I studied very hard.",
                    textJa: 'はい。TOEIC620取りました。すごく頑張って勉強して。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I can read English. I can listen to English. But when I try to speak...",
                    textJa: '読めるんです。聞けるんです。でも話そうとすると...',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Nothing comes out.",
                    textJa: '何も出てこない。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Exactly. My head goes blank.",
                    textJa: 'そうなんです。頭が真っ白になるんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "I understand that feeling very well.",
                    textJa: 'その気持ち、よくわかるよ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "You do? But you are so calm about everything, Master.",
                    textJa: 'わかるんですか？マスターはいつも落ち着いてるのに。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "I used to teach TOEIC preparation classes.",
                    textJa: '昔、TOEIC対策の講師をやってたんだ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "What? Really?",
                    textJa: 'えっ？本当ですか？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Yes. For ten years. I helped many students get high scores.",
                    textJa: 'ああ。10年やった。たくさんの生徒のスコアを上げた。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "But most of them could not have a simple conversation in English.",
                    textJa: 'でもほとんどの生徒は、簡単な英会話すらできなかった。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "That is exactly my problem!",
                    textJa: 'まさにそれ、私の問題です！',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "TOEIC tests reading and listening. It does not test speaking.",
                    textJa: 'TOEICはリーディングとリスニングのテストだ。スピーキングは試験に出ない。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "So people study reading and listening. And they never practice speaking.",
                    textJa: 'だからみんな読む練習と聞く練習はする。でも話す練習はしない。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "What should I do? I do not want to freeze again.",
                    textJa: 'どうすればいいですか？もう固まりたくないんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "First, have a drink. We can talk about it.",
                    textJa: 'まず一杯飲め。それから話そう。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Thank you, Master. I feel a little better already.",
                    textJa: 'ありがとうございます、マスター。少し気が楽になりました。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "You know, you are not alone. Many people have this problem.",
                    textJa: 'あのな、お前だけじゃない。同じ悩みを持ってる人はたくさんいる。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Really? It feels like everyone else can speak English except me.",
                    textJa: '本当ですか？私以外みんな英語話せるように見えます。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Trust me. I have seen hundreds of students with the same face you have right now.",
                    textJa: '信じろ。今のお前と同じ顔をした生徒を何百人も見てきた。',
                },
            ],
        },
        // ============================================================
        // DAY 2: Same Problem, Different People
        // Takeshi, Kenji, and Mina arrive at the izakaya.
        // ============================================================
        {
            id: '365-ep01-day2',
            day: 2,
            title: 'Same Problem, Different People',
            titleJa: '同じ悩み、違う人々',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Good evening, Master.",
                    textJa: 'こんばんは、マスター。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Yuki. Good timing. I want you to meet some people.",
                    textJa: 'ユキ。ちょうどいい。紹介したい人がいる。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Hi. I am Takeshi. I work in IT. I am a project manager.",
                    textJa: 'どうも。タケシです。IT企業でプロジェクトマネージャーやってます。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Nice to meet you, Takeshi. I am Yuki. I work at a trading company.",
                    textJa: 'はじめまして、タケシさん。ユキです。商社で働いてます。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I am Kenji. Construction. I manage building projects.",
                    textJa: 'ケンジだ。建設業。現場監督をやってる。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I am Mina. I am a temporary worker at an insurance company. Nice to meet you.",
                    textJa: 'ミナです。保険会社で派遣社員してます。よろしくお願いします。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Everyone here has the same problem. Tell her, Takeshi.",
                    textJa: 'ここにいる全員、同じ悩みを抱えてる。タケシ、話してやれ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Last week, we had an online meeting with our American team.",
                    textJa: '先週、アメリカのチームとオンライン会議があったんですよ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "I understood what they said. I knew the answer in my head.",
                    textJa: '言ってることはわかった。頭の中では答えもあった。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "But when I tried to speak... my mouth did not move.",
                    textJa: 'でも話そうとしたら...口が動かなかった。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "That happened to me too! The same thing!",
                    textJa: '私もそれです！まったく同じ！',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "My boss was watching. It was very embarrassing.",
                    textJa: '上司が見てて。めちゃくちゃ恥ずかしかった。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I do not even try anymore. When a foreign worker comes to the site, I just point.",
                    textJa: '俺はもう試すこともしない。外国人作業員が来たら、指さすだけだ。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Point at the wall. Point at the floor. Like a mime.",
                    textJa: '壁を指さす。床を指さす。パントマイムみたいに。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "That is actually a useful skill.",
                    textJa: 'それ地味にスキルですね。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "It is not funny. I am a director. I should be able to give instructions with words.",
                    textJa: '笑い事じゃねえよ。現場監督だぞ。言葉で指示できなきゃダメだろ。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I... I have a different problem.",
                    textJa: '私は...ちょっと違う悩みなんですけど。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Go ahead, Mina. No one will judge you here.",
                    textJa: '言ってみろ、ミナ。ここでは誰も笑わない。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I can actually speak a little English. In my room, alone.",
                    textJa: '実は少しだけ英語話せるんです。部屋で、一人の時は。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "But when someone is in front of me, I am too scared to open my mouth.",
                    textJa: 'でも人が目の前にいると、怖くて口が開かないんです。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I understand, Mina. The fear is real.",
                    textJa: 'わかります、ミナさん。あの恐怖、本物ですよね。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "So we all have knowledge. But we cannot use it.",
                    textJa: 'つまり全員、知識はあるのに使えないってことか。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Exactly. You all studied for tests. You memorized grammar rules. You learned thousands of words.",
                    textJa: 'その通り。お前ら全員、テストのために勉強した。文法規則を暗記した。何千もの単語を覚えた。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "But nobody taught you how to actually talk.",
                    textJa: 'でも実際に話す方法は、誰も教えなかった。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Can that be fixed? At my age?",
                    textJa: 'この歳からでも直るもんなのか？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Age has nothing to do with it. The problem is practice. You need a place to practice.",
                    textJa: '年齢は関係ない。問題は練習だ。練習する場所が必要なんだ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "A place to practice...",
                    textJa: '練習する場所...',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "A safe place. Where mistakes are okay. Where nobody laughs at you.",
                    textJa: '安全な場所。間違えていい場所。誰にも笑われない場所。',
                },
            ],
        },
        // ============================================================
        // DAY 3: The Proposal
        // Gondo proposes English Hour. Lisa joins the group.
        // ============================================================
        {
            id: '365-ep01-day3',
            day: 3,
            title: 'The Proposal',
            titleJa: '提案',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "I have been thinking. I have an idea.",
                    textJa: '考えてたんだが、いいことを思いついた。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "What kind of idea?",
                    textJa: 'どんなアイデアですか？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Every Thursday night, we close at nine. After that, this place is empty.",
                    textJa: '毎週木曜は9時に閉める。そのあと、ここは空っぽだ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "What if we use this izakaya for English practice?",
                    textJa: 'この居酒屋を英語の練習に使ったらどうだ？',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "English practice... at an izakaya?",
                    textJa: '英語の練習を...居酒屋で？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Why not? Classrooms make people nervous. Izakayas make people relaxed.",
                    textJa: 'なぜダメだ？教室は人を緊張させる。居酒屋は人をリラックスさせる。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "That is true. I hate classrooms. They remind me of school.",
                    textJa: 'それは確かに。教室は嫌いだ。学校を思い出す。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Plus, there is beer.",
                    textJa: 'それに、ビールがある。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "I call it English Hour. One hour every Thursday. Simple rules.",
                    textJa: '名前はEnglish Hourだ。毎週木曜、1時間。シンプルなルール。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "What are the rules?",
                    textJa: 'どんなルールですか？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Rule one. Try to speak English. It does not have to be perfect.",
                    textJa: 'ルール1。英語で話してみること。完璧じゃなくていい。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Rule two. Never laugh at someone's English.",
                    textJa: 'ルール2。人の英語を絶対に笑わない。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Rule three. If you do not know a word, use any word. Or use your hands.",
                    textJa: 'ルール3。単語がわからなければ、別の言葉を使え。手を使ってもいい。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Those are good rules. I like rule two especially.",
                    textJa: 'いいルールですね。特にルール2が好きです。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Excuse me. I heard you talking about English practice.",
                    textJa: 'すみません。英語の練習の話が聞こえたんですが。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Ah, Lisa. Everyone, this is Lisa. She works in marketing.",
                    textJa: 'ああ、リサ。みんな、こちらはリサだ。マーケティングの仕事をしてる。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Hello, everyone. I lived in Canada for five years. I speak English well, but...",
                    textJa: 'みなさん、こんにちは。カナダに5年住んでました。英語は話せますが...',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Wait. If you can speak English, why are you here?",
                    textJa: 'えっ。英語話せるのに、なんでここに？',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "I want to help. I remember how hard it was when I first started learning.",
                    textJa: '力になりたいんです。自分が最初に学び始めた時、どれだけ大変だったか覚えてるから。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Also, I come here every Thursday. I love Gondo's fried chicken.",
                    textJa: 'あと、毎週木曜ここに来てるんです。マスターの唐揚げが好きで。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Lisa would be perfect. A fluent speaker to guide us.",
                    textJa: 'リサは最高だ。流暢な話し手がいれば助かる。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I do not know. Speaking English in front of people...",
                    textJa: 'どうだかな。人前で英語を話すなんて...',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I am scared too. But... I want to try.",
                    textJa: '私も怖いです。でも...やってみたい。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Me too. I do not want to freeze again. I want to change.",
                    textJa: '私も。もう固まりたくない。変わりたいんです。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Okay. If there is beer, I am in.",
                    textJa: 'よし。ビールがあるなら、俺も参加だ。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "...Fine. But do not expect much from me.",
                    textJa: '...わかった。でも俺にはあまり期待するなよ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Good. Then our first English Hour will be next Thursday.",
                    textJa: 'よし。じゃあ最初のEnglish Hourは来週の木曜だ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "No textbooks. No tests. Just talking.",
                    textJa: '教科書なし。テストなし。ただ話すだけだ。',
                },
            ],
        },
        // ============================================================
        // DAY 4: The First Try
        // First English Hour. Everyone freezes. Lisa gently helps.
        // ============================================================
        {
            id: '365-ep01-day4',
            day: 4,
            title: 'The First Try',
            titleJa: '初めての挑戦',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Welcome to the first English Hour. Let us begin.",
                    textJa: '最初のEnglish Hourへようこそ。始めよう。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Lisa, could you start? Show everyone how it is done.",
                    textJa: 'リサ、お手本を見せてくれるか？',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Sure. Hi, everyone. I am Lisa. I like cooking and watching movies. That is it. Easy, right?",
                    textJa: 'もちろん。みなさん、こんにちは。リサです。料理と映画鑑賞が好きです。以上。簡単でしょ？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Thank you, Lisa. Now, who wants to go next?",
                    textJa: 'ありがとう、リサ。さて、次は誰が行く？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "...",
                    textJa: '...',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "...",
                    textJa: '...',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "...",
                    textJa: '...',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "...",
                    textJa: '...',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "This is also normal. The silence. I expected this.",
                    textJa: 'これも普通のことだ。この沈黙。予想していた。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Do not worry. Let us start with something very simple.",
                    textJa: '心配しないで。すごく簡単なことから始めましょう。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Just say your name. That is all. One sentence.",
                    textJa: '名前を言うだけ。それだけ。一文だけ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "...I... I am Yuki.",
                    textJa: '...わ...私はユキです。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "That was great, Yuki. You did it.",
                    textJa: 'すばらしい、ユキ。言えたね。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "That was only three words.",
                    textJa: 'たった3語ですよ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Three words are better than zero words. That is progress.",
                    textJa: '3語はゼロ語より多い。それが進歩だ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Okay, my turn. I am... Takeshi. I like... uh...",
                    textJa: 'よし、俺の番。I am...タケシ。I like...えーと...',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "What is the word for ramen?",
                    textJa: 'ラーメンって英語でなんていうんだっけ？',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Ramen. It is the same word in English.",
                    textJa: 'Ramen。英語でも同じ言葉だよ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Oh. I like ramen. That was easier than I thought.",
                    textJa: 'あ。I like ramen。思ったより簡単だった。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "...I am Kenji. I build... things.",
                    textJa: '...I am ケンジ。I build...things。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Perfect. What kind of things do you build?",
                    textJa: '完璧。どんなものを作るんですか？',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Buildings. Big buildings. With my hands.",
                    textJa: 'ビル。でかいビル。この手で。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "See? You are all speaking English right now.",
                    textJa: 'な？今、全員英語を話してるだろ。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I am Mina. I like... reading books. And... cats.",
                    textJa: 'ミナです。I like...本を読むこと。あと...猫。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Cats are great. I have two cats.",
                    textJa: '猫いいですよね。俺も2匹飼ってます。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "Really? What are their names?",
                    textJa: '本当ですか？名前は？',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Mochi and Kinako. They are very fat.",
                    textJa: 'モチときなこ。めちゃくちゃ太ってます。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Look at that. You are having a conversation. In English.",
                    textJa: '見て。会話してるよ。英語で。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "This is what I wanted to see. Not perfect grammar. Real communication.",
                    textJa: 'これが見たかったんだ。完璧な文法じゃない。本当のコミュニケーション。',
                },
            ],
        },
        // ============================================================
        // DAY 5: Small Steps
        // Self-introductions get longer. Small victories.
        // ============================================================
        {
            id: '365-ep01-day5',
            day: 5,
            title: 'Small Steps',
            titleJa: '小さな一歩',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Welcome back, everyone. Second English Hour. How are you feeling?",
                    textJa: 'おかえり、みんな。2回目のEnglish Hourだ。調子はどうだ？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Nervous. But less nervous than last week.",
                    textJa: '緊張してます。でも先週よりはマシです。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Today, let us try something new. Ask each other questions.",
                    textJa: '今日は新しいことに挑戦しましょう。お互いに質問してみて。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Start with these three: Where do you live? What do you like? What is your job?",
                    textJa: 'この3つから始めましょう。どこに住んでる？何が好き？仕事は何？',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "I will start. Yuki, where do you live?",
                    textJa: '俺から行きます。ユキさん、どこに住んでるの？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I live in Meguro. It is near Shibuya.",
                    textJa: '目黒に住んでます。渋谷の近くです。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Oh, nice area. I live in Koenji. It is... far from here.",
                    textJa: 'おお、いいところですね。俺は高円寺です。ここから...遠い。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Kenji, what do you like to do on weekends?",
                    textJa: 'ケンジさん、週末は何するのが好きですか？',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Weekends? I... like fishing. I go to the river.",
                    textJa: '週末？俺は...釣りが好きだ。川に行く。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "That sounds nice. Is the fishing good near Tokyo?",
                    textJa: '素敵ですね。東京の近くで釣りできるんですか？',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Yes. Tama River. Small fish, but... it is relaxing.",
                    textJa: 'ああ。多摩川。小さい魚だけど...リラックスできる。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "You are doing very well, Kenji. That was three sentences.",
                    textJa: 'すごくいいよ、ケンジさん。3文言えた。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "...Three? Really? I did not count.",
                    textJa: '...3文？本当？数えてなかった。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "That is the point. When you stop counting, you start talking.",
                    textJa: 'そこだ。数えるのをやめた時、話し始めるんだ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Mina, what kind of books do you read?",
                    textJa: 'ミナさん、どんな本を読むの？',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I read mystery books. Agatha Christie is my favorite.",
                    textJa: 'ミステリーを読みます。アガサ・クリスティーが一番好きです。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "In English?",
                    textJa: '英語で？',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "Sometimes. With a dictionary next to me.",
                    textJa: 'たまに。辞書を横に置いて。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "That is amazing, Mina. Reading in English is not easy.",
                    textJa: 'すごいね、ミナ。英語で読むのは簡単じゃない。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "Thank you. I never told anyone that before.",
                    textJa: 'ありがとうございます。それ、今まで誰にも言ったことなかった。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Everyone has a secret strength. You just need a place to show it.",
                    textJa: 'みんな隠れた強みを持ってる。見せる場所が必要なだけだ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Master, what about you? What do you like?",
                    textJa: 'マスター、マスターは？何が好きなの？',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Me? I like this. Watching people find their voice.",
                    textJa: '俺？これが好きだ。みんなが自分の言葉を見つけていくのを見るのが。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "That was a very cool answer, Master.",
                    textJa: 'それ、めちゃくちゃかっこいい答えですね、マスター。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Do not call me cool. I am just an old man who makes fried chicken.",
                    textJa: 'かっこいいとか言うな。俺はただの唐揚げ作るおっさんだ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "The best fried chicken in Tokyo.",
                    textJa: '東京一の唐揚げですけどね。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "I agree with that completely.",
                    textJa: 'それには完全に同意します。',
                },
            ],
        },
        // ============================================================
        // DAY 6: Out in the World
        // Yuki uses English at work. A tiny success.
        // ============================================================
        {
            id: '365-ep01-day6',
            day: 6,
            title: 'Out in the World',
            titleJa: '外の世界で',
            location: "Yuki's Office",
            lines: [
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Master. Something happened today.",
                    textJa: 'マスター。今日、あることが起きたんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Good something or bad something?",
                    textJa: 'いいことか、悪いことか？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I think... good. The foreign client came back to our office today.",
                    textJa: '多分...いいこと。今日、あの外国人のお客さんがまた来たんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "The same one? The one who made you freeze?",
                    textJa: 'あの時の？お前を固まらせたやつか？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Yes. Same person. He walked toward my desk.",
                    textJa: 'はい。同じ人。私のデスクに向かって歩いてきたんです。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "My heart was beating so fast. I could hear it.",
                    textJa: '心臓がバクバクして。自分の心臓の音が聞こえるくらい。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "And then?",
                    textJa: 'それで？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "He said 'Good morning.' And I said...",
                    textJa: '彼がGood morningって言ったんです。で、私は...',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "You said?",
                    textJa: '言ったのか？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I said 'Good morning.' I said it back to him.",
                    textJa: 'Good morningって。ちゃんと返したんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "That is wonderful, Yuki.",
                    textJa: 'やったな、ユキ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Wait, there is more. He asked me 'How are you?'",
                    textJa: '待ってください、続きがあるんです。彼がHow are you？って聞いてきて。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "And I said 'I am fine, thank you. How are you?'",
                    textJa: 'I am fine, thank you. How are you? って返したんです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "A full exchange. Two sentences.",
                    textJa: '完全なやりとり。2文だ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I know it is just a greeting. Everyone learns it in school.",
                    textJa: 'ただの挨拶だってわかってます。学校で習うレベルの。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "But two weeks ago, I could not even say that. I just stood there.",
                    textJa: 'でも2週間前は、それすら言えなかった。立ちすくむだけだった。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Do not make it small. That took courage.",
                    textJa: '小さくするな。あれには勇気がいったんだ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "My hands were shaking the whole time.",
                    textJa: '手、ずっと震えてました。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Shaking hands that still speak. That is real bravery.",
                    textJa: '震えながらも言葉を出す。それが本物の勇気だ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "He smiled at me. The client. He looked happy.",
                    textJa: '彼、笑ってくれたんです。あのお客さん。嬉しそうだった。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Of course he did. People like it when you try.",
                    textJa: 'そりゃそうだ。人は相手が頑張ってるのを見ると嬉しいんだ。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Then my boss came over and took care of the rest in English.",
                    textJa: 'そのあと上司が来て、英語で対応してくれました。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "But for those ten seconds, it was just me and that client. Speaking English.",
                    textJa: 'でもあの10秒間は、私とお客さんだけだった。英語で話してた。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Next time, maybe it will be twenty seconds. Then a minute.",
                    textJa: '次は20秒かもしれない。そのうち1分になる。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I want to tell everyone at English Hour.",
                    textJa: 'English Hourでみんなに報告したいです。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "You should. It will give them hope.",
                    textJa: 'そうしろ。みんなの希望になる。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Thank you, Master. For starting English Hour. For everything.",
                    textJa: 'ありがとうございます、マスター。English Hourを始めてくれて。全部。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Do not thank me. You opened your own mouth. I just made the fried chicken.",
                    textJa: '礼を言うな。自分の口を開けたのはお前だ。俺はただ唐揚げを作っただけだ。',
                },
            ],
        },
        // ============================================================
        // DAY 7: We Will Continue
        // Reflection. Everyone commits. The journey begins.
        // ============================================================
        {
            id: '365-ep01-day7',
            day: 7,
            title: 'We Will Continue',
            titleJa: '続けていく',
            location: "Gondo's Izakaya",
            lines: [
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Two weeks of English Hour. How does everyone feel?",
                    textJa: 'English Hourも2週間だ。みんな、どうだ？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "I spoke English at work this week. Just a greeting. But I did it.",
                    textJa: '今週、仕事で英語を話しました。挨拶だけ。でもできたんです。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "That is great, Yuki. I am jealous.",
                    textJa: 'すごいな、ユキさん。うらやましい。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "What about you, Takeshi? How was your week?",
                    textJa: 'タケシさんは？今週どうでした？',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "I had another meeting with the American team.",
                    textJa: 'またアメリカのチームと会議があったんですよ。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "I did not speak much. But I said 'I agree' one time. Out loud.",
                    textJa: 'たくさんは話せなかった。でも「I agree」って一回言えた。声に出して。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "That counts. Every word counts.",
                    textJa: 'それも立派。一言一言が大事。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I did something too. I am not sure if it was good.",
                    textJa: '俺もやったんだが。よかったかどうかわからん。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "What did you do, Kenji?",
                    textJa: '何をしたんですか、ケンジさん？',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "A foreign worker at the site. He dropped his helmet.",
                    textJa: '現場に外国人の作業員がいて。ヘルメット落としたんだ。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I picked it up and said 'Here you go.' Instead of just pointing.",
                    textJa: '拾ってHere you goって言った。いつもみたいに指さすんじゃなくて。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "The mime becomes a speaker!",
                    textJa: 'パントマイムが喋った！',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "Shut up, Takeshi.",
                    textJa: 'うるせえ、タケシ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "What did the worker do?",
                    textJa: 'その作業員はどうした？',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "He said 'Thank you, boss.' And he smiled. Nobody at the site ever saw me speak English before.",
                    textJa: 'Thank you, bossって言って笑った。現場で俺が英語話すの、誰も見たことなかったから。',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Mina, what about you?",
                    textJa: 'ミナさんは？',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I... did not speak English to anyone this week.",
                    textJa: '私は...今週は誰にも英語話せませんでした。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "But I did something else. I ordered coffee in English at a cafe.",
                    textJa: 'でも別のことをしました。カフェで英語でコーヒーを注文したんです。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I said 'One coffee, please.' The barista was Japanese. He looked confused.",
                    textJa: 'One coffee, pleaseって言ったんです。バリスタは日本人で、きょとんとしてました。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "Ha! That is actually really brave, Mina.",
                    textJa: 'はは！それ、地味にめちゃくちゃ勇気いるでしょ、ミナさん。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "My face turned completely red. But I did not run away.",
                    textJa: '顔真っ赤になりました。でも逃げなかった。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "That is the most important thing. You did not run away.",
                    textJa: 'それが一番大事だ。逃げなかった。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "Two weeks ago, none of you could say a word. Look at you now.",
                    textJa: '2週間前は一言も言えなかった。今のみんなを見てよ。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "So. The question is simple. Do we continue?",
                    textJa: 'さて。聞くことはシンプルだ。続けるか？',
                },
                {
                    speaker: 'Yuki',
                    speakerGender: 'female',
                    text: "Yes. I want to have a real conversation with that client someday.",
                    textJa: 'はい。いつかあのお客さんとちゃんと会話したいんです。',
                },
                {
                    speaker: 'Takeshi',
                    speakerGender: 'male',
                    text: "I want to say more than 'I agree' at meetings.",
                    textJa: '会議でI agree以外のことも言いたい。',
                },
                {
                    speaker: 'Kenji',
                    speakerGender: 'male',
                    text: "I want to give real instructions. Not just point at walls.",
                    textJa: 'ちゃんと指示を出したい。壁を指さすだけじゃなく。',
                },
                {
                    speaker: 'Mina',
                    speakerGender: 'female',
                    text: "I want to talk to people without my hands shaking.",
                    textJa: '手が震えないで人と話したい。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "Good. Then we will continue. Every Thursday. Step by step.",
                    textJa: 'よし。なら続けるぞ。毎週木曜。一歩ずつ。',
                },
                {
                    speaker: 'Lisa',
                    speakerGender: 'female',
                    text: "I will be here. Always.",
                    textJa: '私もいるからね。ずっと。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "One more thing. Remember this. You already speak English. You proved it tonight.",
                    textJa: 'もう一つ。これだけは覚えておけ。お前らはもう英語を話してる。今夜、それを証明した。',
                },
                {
                    speaker: 'Gondo',
                    speakerGender: 'male',
                    text: "The rest is just practice.",
                    textJa: 'あとは練習するだけだ。',
                },
            ],
        },
    ],
};
