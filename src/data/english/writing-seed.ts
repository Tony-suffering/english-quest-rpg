// 英作文 → トレーニング登録 のシード
// Claude がチャットで口語化した英文をここに置く。
// /english/writing で表示し、ユーザーはトレーニング(phrases)に登録するだけ。

export interface WritingEntry {
    id: string;
    date: string;        // 登録先トレーニングの既定日付 (YYYY-MM-DD)
    title: string;       // 識別用ラベル
    source?: string;     // 元ネタ・添削元など (任意)
    sentences: string[]; // 口語化済みの英文 (1文 = 1ドリル)
}

export const WRITING_SEEDS: WritingEntry[] = [
    {
        id: 'eiken1-mokeshi-20260524',
        date: '2026-05-24',
        title: '英検1級申込 — 地図は領土じゃない',
        source: '/english/writing で添削 → Claude が口語化',
        sentences: [
            "Alright, I went ahead and signed up for Eiken Grade 1.",
            "Maybe it'll snap me out of this rut — give me a fresh eye-opener for this stuck life of mine.",
            "I'm giving myself credit where it's due — at least I put myself out there, lol.",
            "I know that sounds a little sus, I'll own that.",
            "But still, I don't think I'm a raving lunatic about it.",
            "Here's the thing though — the map is not the territory.",
            "Getting certified in some English exam doesn't actually upgrade what I already know.",
            "It's just a piece of paper that says I checked a box.",
            "The real work is the boring stuff — pulling the weeds in your own garden.",
            "Nobody's caught onto that yet, I swear, lol.",
            "So I'll take the exam, but I'll also keep pulling the weeds.",
            "Both matter — and one of them is way harder than people think.",
        ],
    },
    {
        id: 'hangry-20260520',
        date: '2026-05-20',
        title: 'hangry — 5時のイライラの正体',
        source: 'redrill で添削 → Claude が口語化',
        sentences: [
            "So 'hangry' is a real thing.",
            "It's just 'hungry' and 'angry' jammed into one word.",
            "And honestly, until yesterday I never got why I lose it every day around 5 p.m.",
            "The reason was dead simple: I was hungry.",
            "I'd gone the whole day without eating anything, lol.",
            "I was spreading myself way too thin, running on fumes with no breaks.",
            "No wonder I was so stressed out, all puffed up and strutting around like a peacock.",
            "Turns out it was just low blood sugar, lol.",
            "Once you get that, there's no reason to just sit back and let an empty stomach run your whole day.",
            "Get a grip, TONIO, lol.",
        ],
    },
    {
        id: 'dmm5-linda-20260520',
        date: '2026-05-20',
        title: 'DMM #5 Linda — 仕事・学習法・アニメ(AOT/JJK)',
        source: 'DMM英会話 Linda回 → Claude が native+ にリライト',
        sentences: [
            // 仕事
            "I work in construction — interior finishing.",
            "I do the final touches — wallpaper, flooring, the stuff that makes a room look finished.",
            "I'm the last guy in before the client walks through the door.",
            "It was scorching out today, and I was sweating buckets.",
            // 英語に出戻り
            "I used to take English seriously, but I let it slide for years.",
            "I took a long break, and I'm just easing back into it now.",
            "You're the fifth teacher I've talked to since I picked it back up.",
            "It feels good to be back on the horse.",
            // 学習ストラテジー
            "I don't want to translate Japanese into English the way most learners do.",
            "I want the lines a native would actually reach for.",
            "I know it's a long shot — honestly, kind of a pipe dream.",
            "My strategy is simple: memorize what a native would say, then drill it out loud until it sticks.",
            "Say it enough times and it stops being a phrase you remember — it becomes one you just have.",
            "Sorry, I'm rambling.",
            // リスニング vs スピーキング
            "Listening material is everywhere these days, so listening isn't my problem.",
            "I can catch almost everything you say — and when I can't, I just ask you to run it by me again.",
            "Speaking is a whole different animal.",
            "Japanese learners are solid at reading and writing, but speaking is where we all hit a wall.",
            // 自己紹介
            "I'm not great at introducing myself — not even in Japanese.",
            "I'm Taishi. Some people just go with Tony.",
            "I don't really make a thing of my age, but I'm 34 — birthday's May 29th.",
            "My hobby is walking — nothing dramatic, just a 30-minute walk every day with English in my ears.",
            "It's the most productive part of my day.",
            // アニメ — リアクション動画
            "There's a whole genre of YouTubers who react to anime in English.",
            "Most of them watch it with the original Japanese audio, not the dub.",
            "Even without the words, you can feel the emotion the voice actors put in.",
            "Since I've already seen the anime, I just focus on how they react — totally natural, unscripted English.",
            // アニメ — Attack on Titan
            "Attack on Titan is a modern classic — it's my go-to recommendation.",
            "Fair warning: Titans literally eat people, so it's not for the squeamish.",
            "Once you get past the gore, the story is something else.",
            "It stops feeling like an anime — it's more like riding a roller coaster of highs and lows.",
            "I've seen guys in their 60s swear anime wasn't for them, then get completely hooked.",
            "Because it was never about anime. It's about a genuinely great story.",
            // アニメ — JJK / 制作の裏側
            "Jujutsu Kaisen skews younger — more of a teenage crowd.",
            "What it's famous for is the animation.",
            "People don't realize how brutal animation is to make — every frame is drawn by hand.",
            "The animators are famously overworked and underpaid.",
            "A single Ghibli film can take two or three years — millions of drawings for two hours of footage.",
            "Jujutsu Kaisen is built around Hollywood-level action.",
            "Attack on Titan has that spectacle too, but at its heart it's about storytelling and character development.",
            "Animators pour blood, sweat, and tears into every frame.",
        ],
    },
];
