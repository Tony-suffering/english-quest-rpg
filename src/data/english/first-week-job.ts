/**
 * First Week at the New Job -- 5-day series for Memoria
 * Maya (25F) starts her first real job at a Brooklyn marketing agency.
 * 6 characters: Maya, Mom, Jess, Marcus, Jen, Brad
 * May 15-19, 2026 (Fri-Tue)
 *
 * Words: uses the user's original collected pool (movie quotes for May 15-19)
 * + curated theme-fit idioms layered on top (firstWeekJobIdiomsByDate).
 */

export interface FirstWeekJobEntry {
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

const generatedAt = new Date('2026-05-14T12:00:00.000Z');

export const firstWeekJobEntries: FirstWeekJobEntry[] = [
    // ============================================================
    // DAY 1 (Fri May 15) -- The Offer Call
    // ============================================================
    {
        id: 'firstweek-day1',
        date: '2026-05-15',
        title: 'Day 1: The Offer Call',
        titleJa: 'Day 1: 内定の電話',
        content: 'マヤ、25歳。ブルックリンの小さなマーケティング会社から内定の電話。即母に報告。月曜から出社。3日後。',
        series: 'first-week-job',
        seriesTitle: 'First Week at the New Job',
        tone: 'casual',
        tags: ['career', 'first-job', 'family', 'twenties'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Maya: I just got off the phone with HR. They want me. They actually want me. Mom, I got it." },
                { speaker: 'female', text: "Mom: Oh honey, I'm so proud of you. I can't believe it. Wait, when do you start?" },
                { speaker: 'female', text: "Maya: Monday. Like, this Monday. Three days from now. Mom, I'm freaking out." },
                { speaker: 'female', text: "Mom: Deep breath, sweetie. You knocked it out of the park in those interviews. They didn't pick you by accident." },
                { speaker: 'female', text: "Maya: I know but -- it's my first real job. Like a grown-up job. With benefits." },
                { speaker: 'female', text: "Mom: You're gonna hit the ground running. Just remember that when Monday rolls around." },
                { speaker: 'female', text: "Maya: OK. OK. I love you. I have to go tell Jess before I have a meltdown." },
                { speaker: 'female', text: "Mom: Go. Call me tonight. And eat something, you sound shaky." },
            ],
            japanese: [
                { speaker: 'female', text: "マヤ: 今HRから電話切ったとこ。採用された。マジで採用された。ママ、決まったよ。" },
                { speaker: 'female', text: "ママ: あら、誇らしいわ。信じられない。ちょっと、いつから？" },
                { speaker: 'female', text: "マヤ: 月曜。次の月曜。あと3日。ママ、パニクってる。" },
                { speaker: 'female', text: "ママ: 深呼吸して。面接、ホームラン級にキメたじゃない。偶然じゃないのよ。" },
                { speaker: 'female', text: "マヤ: わかってる、でも -- 人生初のちゃんとした仕事だよ。大人の仕事。福利厚生付きの。" },
                { speaker: 'female', text: "ママ: 月曜から全力疾走で行けるよ。月曜が来たらそれを思い出して。" },
                { speaker: 'female', text: "マヤ: わかった。わかった。愛してる。メルトダウンする前にジェスに伝えなきゃ。" },
                { speaker: 'female', text: "ママ: 行ってきな。夜電話して。あと何か食べな、声が震えてる。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
    // ============================================================
    // DAY 2 (Sat May 16) -- Outfit Crisis
    // ============================================================
    {
        id: 'firstweek-day2',
        date: '2026-05-16',
        title: 'Day 2: Outfit Crisis',
        titleJa: 'Day 2: 着る服がない問題',
        content: '土曜。マヤは親友ジェスと「ビジネスカジュアル」の意味を調べながら買い物へ。クローゼットの半分はスウェット。',
        series: 'first-week-job',
        seriesTitle: 'First Week at the New Job',
        tone: 'casual',
        tags: ['fashion', 'friendship', 'first-job', 'twenties'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Maya: Jess, I have nothing to wear. Literally nothing. They said \"business casual.\" What does that even mean?" },
                { speaker: 'female', text: "Jess: Girl, it means you gotta look the part. No jeans, no leggings, no sneakers." },
                { speaker: 'female', text: "Maya: Half my closet is sweatpants. I'm going to have to splurge on actual blazers." },
                { speaker: 'female', text: "Jess: We're gonna shop till you drop. You're walking in there dressed to kill on Monday." },
                { speaker: 'female', text: "Maya: You make it sound simple." },
                { speaker: 'female', text: "Jess: It is simple. We're hitting three stores today and you're not leaving without two complete looks." },
                { speaker: 'female', text: "Maya: I love you and I hate this and I love you again." },
            ],
            japanese: [
                { speaker: 'female', text: "マヤ: ジェス、着る服がない。ホントに何もない。「ビジネスカジュアル」って言われた。それって何？" },
                { speaker: 'female', text: "ジェス: それっぽく見えなきゃダメってこと。ジーンズなし、レギンスなし、スニーカーなし。" },
                { speaker: 'female', text: "マヤ: クローゼットの半分スウェット。ちゃんとしたブレザーに奮発しなきゃ。" },
                { speaker: 'female', text: "ジェス: 今日は買い物で死ぬまで歩くよ。月曜は決め服で乗り込むの。" },
                { speaker: 'female', text: "マヤ: あなたが言うと簡単そう。" },
                { speaker: 'female', text: "ジェス: 簡単なの。今日3店回って、2セット揃うまで帰さない。" },
                { speaker: 'female', text: "マヤ: 愛してる、これ嫌い、また愛してる。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
    // ============================================================
    // DAY 3 (Sun May 17) -- Sunday Scaries
    // ============================================================
    {
        id: 'firstweek-day3',
        date: '2026-05-17',
        title: 'Day 3: Sunday Scaries',
        titleJa: 'Day 3: 日曜の憂鬱',
        content: '日曜。明日が初日。マヤはイマジナリーな失敗を脳内再生。彼氏マーカスがソファに引きずり戻す。',
        series: 'first-week-job',
        seriesTitle: 'First Week at the New Job',
        tone: 'introspective',
        tags: ['anxiety', 'relationships', 'first-job'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Maya: I've got butterflies in my stomach so bad. My stomach hurts. I keep thinking, what if I bomb on day one?" },
                { speaker: 'male', text: "Marcus: You're overthinking this. Hard. Don't get cold feet now." },
                { speaker: 'female', text: "Maya: But what if I'm in over my head? Everyone there is smarter than me. It's imposter syndrome and I haven't even started yet." },
                { speaker: 'male', text: "Marcus: Babe, listen. Nobody knows what they're doing the first week. Nobody. You just fake it till you make it." },
                { speaker: 'female', text: "Maya: That feels like terrible advice." },
                { speaker: 'male', text: "Marcus: It's the only advice. Come watch something dumb with me. Stop spiraling." },
                { speaker: 'female', text: "Maya: Promise you won't let me check email after 9?" },
                { speaker: 'male', text: "Marcus: Promise." },
            ],
            japanese: [
                { speaker: 'female', text: "マヤ: ヤバいくらい胃がソワソワしてる。胃が痛い。「もし初日で大失敗したら」ってずっと考えてる。" },
                { speaker: 'male', text: "マーカス: 考えすぎ。ガチで。今さら怖気付くな。" },
                { speaker: 'female', text: "マヤ: でも私には荷が重すぎたら？みんな私より頭いい。詐欺師症候群、まだ始まってもないのに。" },
                { speaker: 'male', text: "マーカス: ベイブ、聞いて。初週で何やってるかわかってる奴なんていない。誰もいない。できるフリしてればそのうちできるって。" },
                { speaker: 'female', text: "マヤ: そのアドバイス最悪に聞こえる。" },
                { speaker: 'male', text: "マーカス: それしかない。バカみたいなやつ一緒に見よう。ぐるぐる思考やめろ。" },
                { speaker: 'female', text: "マヤ: 9時以降メールチェックさせないって約束して？" },
                { speaker: 'male', text: "マーカス: 約束。" },
            ],
            generatedAt,
            tone: 'introspective',
        },
    },
    // ============================================================
    // DAY 4 (Mon May 18) -- Day One
    // ============================================================
    {
        id: 'firstweek-day4',
        date: '2026-05-18',
        title: 'Day 4: Day One',
        titleJa: 'Day 4: 初日',
        content: '月曜。出勤初日。隣席のジェンが最初の救世主。上司ブラッドの「オープンドア・ポリシー」の真意も学ぶ。',
        series: 'first-week-job',
        seriesTitle: 'First Week at the New Job',
        tone: 'casual',
        tags: ['workplace', 'first-day', 'colleagues'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Jen: Hey, you must be the new hire. I'm Jen. I sit right across from you. Lucky you." },
                { speaker: 'female', text: "Maya: Maya. Nice to meet you. I'm so nervous I might throw up." },
                { speaker: 'female', text: "Jen: Totally normal. Let me break the ice -- I'll show you the ropes. Coffee machine first." },
                { speaker: 'female', text: "Maya: That's a relief, honestly." },
                { speaker: 'male', text: "Brad: Maya, welcome aboard. I'm Brad. My door is always open -- open-door policy. Feel free to swing by." },
                { speaker: 'female', text: "Maya: Thank you so much, Brad. Really." },
                { speaker: 'female', text: "Jen: He says that to everyone. Play your cards right and just email him." },
                { speaker: 'female', text: "Maya: ...noted." },
            ],
            japanese: [
                { speaker: 'female', text: "ジェン: あ、新人さんでしょ。ジェンよ。あなたの真向かいに座ってる。運がいいわね。" },
                { speaker: 'female', text: "マヤ: マヤです。よろしくお願いします。緊張で吐きそう。" },
                { speaker: 'female', text: "ジェン: 完全に普通。緊張ほぐすために言うと、色々教えるよ。まずはコーヒーマシンから。" },
                { speaker: 'female', text: "マヤ: 正直それは助かります。" },
                { speaker: 'male', text: "ブラッド: マヤ、ようこそ。ブラッドだ。私のドアはいつも開いてるよ -- オープンドア・ポリシーね。いつでもふらっと来ていい。" },
                { speaker: 'female', text: "マヤ: 本当にありがとうございます、ブラッド。" },
                { speaker: 'female', text: "ジェン: 全員に言ってる。賢く立ち回って、メール送るだけにしな。" },
                { speaker: 'female', text: "マヤ: ...了解。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
    // ============================================================
    // DAY 5 (Tue May 19) -- Day Two
    // ============================================================
    {
        id: 'firstweek-day5',
        date: '2026-05-19',
        title: 'Day 5: Day Two',
        titleJa: 'Day 5: 2日目',
        content: '火曜。少し慣れる。ブラッドの「circle back」連発の意味をジェンが解読してくれる。「なんとかなる」と思える初めての瞬間。',
        series: 'first-week-job',
        seriesTitle: 'First Week at the New Job',
        tone: 'casual',
        tags: ['workplace', 'colleagues', 'corporate-speak'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Jen: How you feeling today? Finding your feet?" },
                { speaker: 'female', text: "Maya: I think? Yesterday felt like drinking from the firehose. Today it's just a regular fire." },
                { speaker: 'female', text: "Jen: Ha. Progress. You'll get up to speed faster than you think." },
                { speaker: 'female', text: "Maya: Brad sent me three emails about a deck. He keeps saying \"circle back.\"" },
                { speaker: 'female', text: "Jen: He says that low-key forty times a day. Means nothing. Just play it by ear." },
                { speaker: 'female', text: "Maya: OK, so this is doable. This is a doable thing." },
                { speaker: 'female', text: "Jen: It's doable. Lunch?" },
                { speaker: 'female', text: "Maya: God, please." },
            ],
            japanese: [
                { speaker: 'female', text: "ジェン: 今日どう？慣れてきた？" },
                { speaker: 'female', text: "マヤ: たぶん？昨日は情報の濁流って感じだった。今日はただの普通の火事。" },
                { speaker: 'female', text: "ジェン: ハハ。進歩じゃん。思ってるより早く戦力になるよ。" },
                { speaker: 'female', text: "マヤ: ブラッドからプレゼン資料の件で3通メール来た。ずっと「circle back」って言ってる。" },
                { speaker: 'female', text: "ジェン: あの人、地味に1日40回くらい言ってる。意味ないから。臨機応変にやればいい。" },
                { speaker: 'female', text: "マヤ: OK、これなんとかなる。なんとかなるやつだ。" },
                { speaker: 'female', text: "ジェン: なんとかなる。ランチ行く？" },
                { speaker: 'female', text: "マヤ: 神様、お願いします。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
];

// Words/idioms for this scenario live in D1 user_phrases (the user's collected pool).
// Each user word for 2026-05-15..19 gets a review_idiom attached via
// scripts/seed-firstweek-idioms.mjs (per the same pattern as seed-day*-sentences.mjs).
