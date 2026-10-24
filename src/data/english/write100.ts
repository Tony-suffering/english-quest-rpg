/**
 * WriteOne -- 100日後に英語が手になじむ。1日10分、ネイティブ英語の書き写し。
 *
 * ビジネス(集客)ライン。本質的な学習効果より「続けたくなる/シェアしたくなる」設計が主役。
 * 1日1パッセージ(50-65語 = 手書きで約10分)。ユーザーは手書き→写真→SNS投稿が成長エンジン。
 *
 * 第1バッチ: Day 1-14 を実装。残りは同フォーマットで追加。
 */

export interface WritePassage {
    day: number;
    theme: string;       // 短いテーマ(カードのラベル兼ハッシュタグ素材)
    english: string;     // 書き写す本文(ネイティブの自然な英語)
    japanese: string;    // 日本語訳
    wordCount: number;
}

export const TOTAL_DAYS = 100;
export const START_DATE = new Date(2026, 5, 25); // June 25, 2026 (今日からDay 1)

export const WRITE_PASSAGES: WritePassage[] = [
    {
        day: 1, theme: 'Starting', wordCount: 60,
        english: "Everyone wants to be good at something, but almost no one wants to be bad at it first. That's the part people skip. You have to be willing to do it badly, over and over, before it ever feels easy. So start now, mess it up, and keep going. The only real failure is waiting until you're ready.",
        japanese: "誰もが何かが得意になりたい。でも、最初に下手でいることを受け入れたい人はほとんどいない。みんなそこを飛ばす。簡単に感じるようになる前に、何度も何度も下手にやる覚悟がいる。だから今すぐ始めて、失敗して、続けろ。本当の失敗は、準備が整うまで待つことだけだ。",
    },
    {
        day: 2, theme: 'Mornings', wordCount: 58,
        english: "I used to think mornings were the enemy. Now they're the only time the house is quiet and my head is clear. I make coffee, sit by the window, and do one small thing before the day gets loud. It's not much, but it's mine. Those ten minutes set the tone for everything else.",
        japanese: "昔は朝が敵だと思っていた。今では、家が静かで頭がクリアな唯一の時間だ。コーヒーを淹れて、窓辺に座り、一日が騒がしくなる前に小さなことを一つやる。大したことじゃない。でも、それは自分のものだ。その10分が、あとの全部の流れを決める。",
    },
    {
        day: 3, theme: 'On AI', wordCount: 60,
        english: "People keep asking whether AI will take their jobs. Honestly, that's the wrong question. The tools don't replace you; they replace the parts of your work you were never that good at anyway. The people who win are the ones who stay curious and keep learning. Comfort is the real risk, not technology.",
        japanese: "AIに仕事を奪われるか、とみんな聞き続ける。正直、それは問いが間違っている。道具が人を置き換えるんじゃない。もともと得意じゃなかった部分を置き換えるだけだ。勝つのは、好奇心を持ち続けて学び続ける人。本当のリスクは技術じゃなくて、現状に安住することだ。",
    },
    {
        day: 4, theme: 'Discipline', wordCount: 57,
        english: "Motivation is overrated. It shows up when things are easy and disappears the moment they get hard. What actually carries you is habit, the boring kind you build on the days you don't feel like it. Do the small thing anyway. Discipline isn't punishment; it's just keeping a promise to yourself.",
        japanese: "モチベーションは過大評価されている。楽なときに現れて、きつくなった瞬間に消える。実際に人を運んでくれるのは習慣だ。やる気が出ない日に積み上げる、あの地味なやつ。それでも小さなことをやれ。規律は罰じゃない。自分との約束を守るだけのことだ。",
    },
    {
        day: 5, theme: 'A bad day', wordCount: 58,
        english: "I had one of those days where nothing went to plan. The train was late, my coffee spilled, and a meeting ran an hour over. A year ago that would have wrecked me. Now I just shrug and let it go. Half of growing up is learning what's actually worth getting upset about.",
        japanese: "何もかも予定通りにいかない、あの手の一日だった。電車は遅れ、コーヒーはこぼれ、会議は一時間延びた。一年前ならそれで潰れていた。今は肩をすくめて流すだけ。大人になるってことの半分は、本当に怒る価値があるものを見分けることだ。",
    },
    {
        day: 6, theme: 'Learning a language', wordCount: 57,
        english: "Nobody learns a language by being careful. You learn it by making a fool of yourself, getting corrected, and trying again the next day. The fear of sounding stupid is the only thing really holding you back. Say it wrong, say it loud, and let people fix you. That's the whole secret.",
        japanese: "慎重にやって言語を覚えた人はいない。バカをやって、直されて、次の日にまた挑む。それで覚える。バカっぽく聞こえる恐怖だけが、本当に足を引っ張っているものだ。間違えて言え、大きな声で言え、人に直してもらえ。それが全部の秘訣だ。",
    },
    {
        day: 7, theme: 'Looking back', wordCount: 59,
        english: "Looking back, the things I worried about most almost never happened. I spent so much energy bracing for problems that stayed imaginary. If I could tell my younger self one thing, it would be this: relax a little. You're more capable than you think, and most of it works out in the end.",
        japanese: "振り返ると、いちばん心配したことは、ほとんど起きなかった。想像のままで終わる問題に身構えて、膨大なエネルギーを使った。昔の自分に一つだけ言えるなら、こうだ。少し力を抜け。お前は思っているより有能だし、たいていのことは最後にはうまくいく。",
    },
    {
        day: 8, theme: 'Finishing things', wordCount: 58,
        english: "The best advice I ever got was simple: be the person who finishes things. Anyone can start a project when it's exciting. Very few people stick around for the boring middle and the messy end. If you can be reliable when it's not fun, you'll stand out without even trying that hard.",
        japanese: "もらった中で一番のアドバイスはシンプルだった。物事を最後までやる人になれ。ワクワクしてるときに始めるのは誰でもできる。退屈な中盤と、ぐちゃぐちゃな終盤まで残る人はごくわずかだ。楽しくないときに頼れる存在でいられたら、大して頑張らなくても抜きん出る。",
    },
    {
        day: 9, theme: 'A small ramen place', wordCount: 60,
        english: "There's a small ramen place near my apartment that I've been going to for years. The owner doesn't say much, but he always remembers my order. Some nights, after a long day, that quiet bowl of noodles is the best part of everything. It's funny how the smallest routines end up meaning the most.",
        japanese: "アパートの近くに、何年も通っている小さなラーメン屋がある。店主は無口だけど、いつも俺の注文を覚えている。長い一日のあと、あの静かな一杯が、何よりの救いになる夜がある。一番小さな習慣が、結局いちばん意味を持つって、おかしなものだ。",
    },
    {
        day: 10, theme: 'About money', wordCount: 60,
        english: "Let's be honest about money for a second. Having more of it doesn't make you happy, but having none of it makes everything harder. The goal isn't to get rich; it's to stop worrying. Enough to sleep at night, enough to say no to things you hate. That's the kind of wealth worth chasing.",
        japanese: "お金について正直になろう。多く持っても幸せにはならないが、無いと何もかもがきつくなる。目標は金持ちになることじゃない。心配するのをやめることだ。夜ぐっすり眠れるだけ、嫌なことにノーと言えるだけ。追いかける価値があるのは、その種類の豊かさだ。",
    },
    {
        day: 11, theme: 'Real friends', wordCount: 59,
        english: "You find out who your real friends are when things go wrong, not when things go well. Anyone will celebrate with you. Far fewer will show up when there's nothing in it for them. Keep those people close, and don't waste your energy trying to impress the ones who only stick around for the good times.",
        japanese: "本当の友達が誰かは、うまくいってるときじゃなく、うまくいかないときに分かる。一緒に祝うのは誰でもする。自分に得が何もないときに来てくれる人は、ずっと少ない。その人たちを大事にしろ。いいときだけ寄ってくる連中に好かれようと、エネルギーを無駄にするな。",
    },
    {
        day: 12, theme: 'Traveling', wordCount: 60,
        english: "The best part of traveling isn't the famous sights. It's the small, unplanned moments: getting lost down a side street, sharing a table with a stranger, eating something you can't pronounce. You go halfway around the world to see the big things, and what stays with you is the little stuff you never expected.",
        japanese: "旅のいちばんの醍醐味は、有名な観光地じゃない。小さな、予定外の瞬間だ。脇道で迷ったり、知らない人と相席になったり、発音できないものを食べたり。大きなものを見に地球の裏側まで行って、結局心に残るのは、思いもしなかった小さなことだったりする。",
    },
    {
        day: 13, theme: 'A morning walk', wordCount: 58,
        english: "I started walking every morning, nothing intense, just twenty minutes around the block. I didn't expect much. But somewhere along the way, my head got quieter and my mood got steadier. We always look for big dramatic changes, when usually the answer is something small you do every single day without fail.",
        japanese: "毎朝歩き始めた。激しいものじゃない、近所を20分回るだけ。大して期待してなかった。でもいつの間にか、頭は静かになり、気分は安定してきた。人はいつも大げさで劇的な変化を探す。でもたいてい答えは、毎日欠かさずやる小さな何かなんだ。",
    },
    {
        day: 14, theme: 'Two weeks in', wordCount: 60,
        english: "If you've made it two weeks, that already puts you ahead of most people who quit on day three. Don't romanticize it. Some days the writing will feel pointless and your hand will get tired. Do it anyway. Showing up when it's boring is exactly the thing that separates the people who finish from the people who don't.",
        japanese: "二週間続いたなら、三日でやめる大半の人より、もう先にいる。美化するな。書くのが無意味に感じて、手が疲れる日もある。それでもやれ。退屈なときに現れること、それこそが、やり遂げる人とやめる人を分けるものだ。",
    },
];

export function getPassageForDay(day: number): WritePassage | null {
    return WRITE_PASSAGES.find(p => p.day === day) || null;
}

export function getDateForDay(day: number): Date {
    const d = new Date(START_DATE);
    d.setDate(d.getDate() + day - 1);
    return d;
}

export function getTodayDay(): number {
    const now = new Date();
    const start = new Date(START_DATE);
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 1;
    if (diff >= TOTAL_DAYS) return TOTAL_DAYS;
    return diff + 1;
}
