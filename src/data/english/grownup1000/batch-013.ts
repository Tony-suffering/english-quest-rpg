import type { GrownEntry } from './index';

// Day 121-122 (2026-10-30 〜 2026-10-31) / g1201-g1220
// 10月末。評価と比較、そして締めの言葉。
// 月の終わりに、ここまでの122日を畳むための二十。

export const BATCH_013: GrownEntry[] = [
    // ===== Day 121 =====
    {
        id: 'g1201',
        expression: 'stack up against',
        meaning: '〜と比べてどうか',
        level: 3,
        category: 'phrasal',
        why: 'compare より競争の含みが強い。自社製品や候補者を並べて評価する時の定型。',
        example: {
            a: "Is it any good?",
            b: "On its own, yes. It doesn't stack up against the older one.",
        },
    },
    {
        id: 'g1202',
        expression: 'hands down',
        meaning: '文句なしで一番',
        level: 2,
        category: 'describe',
        why: '手を下ろしたまま勝てる、が語源。迷いがないことを示すので、推薦の言葉として強い。',
        example: {
            a: "Best meal of the trip?",
            b: "Hands down, the place by the station.",
        },
    },
    {
        id: 'g1203',
        expression: 'on par with',
        meaning: '同等の水準',
        level: 3,
        category: 'collocation',
        why: 'ゴルフの基準打数から。same as と違い、質の話だと明示できるので評価の場面で使う。',
        example: {
            a: "Is the cheaper one worse?",
            b: "It's on par with the brand name. Same factory.",
        },
    },
    {
        id: 'g1204',
        expression: 'nothing special',
        meaning: '別に大したことない',
        level: 1,
        category: 'describe',
        why: '悪くはないが褒めるほどでもない、という中間。bad を避けたい時の最も安全な評価。',
        example: {
            a: "How was the new place?",
            b: "Nothing special. Fine for a quick lunch.",
        },
    },
    {
        id: 'g1205',
        expression: 'it grew on me',
        meaning: 'だんだん良くなってきた',
        level: 3,
        category: 'phrasal',
        why: '最初は嫌いだったと認めた上で評価を変える型。素直に褒めるより信用される言い方。',
        example: {
            a: "You hated that album.",
            b: "I did. It grew on me.",
        },
    },
    {
        id: 'g1206',
        expression: 'overrated',
        meaning: '過大評価されてる',
        level: 2,
        category: 'describe',
        why: '作品そのものではなく、評判との差を批判する語。悪口の角が一段落ちるので言いやすい。',
        example: {
            a: "Everyone says it's a masterpiece.",
            b: "I think it's overrated. Good, but not that good.",
        },
    },
    {
        id: 'g1207',
        expression: 'the best of the bunch',
        meaning: 'この中では一番マシ',
        level: 2,
        category: 'collocation',
        why: '絶対評価ではなく相対評価だと明示する型。候補の水準が低い時の正直な褒め方。',
        example: {
            a: "Any of the three work?",
            b: "The second one. Best of the bunch, honestly.",
        },
    },
    {
        id: 'g1208',
        expression: "there's no comparison",
        meaning: '比べものにならない',
        level: 2,
        category: 'situational',
        why: '差が大きすぎて比較が成立しない、という強い評価。良い方にも悪い方にも使える。',
        example: {
            a: "Is the new lens worth it?",
            b: "There's no comparison. You'll see it immediately.",
        },
    },
    {
        id: 'g1209',
        expression: 'it does the job',
        meaning: '役目は果たしてる',
        level: 2,
        category: 'describe',
        why: '褒めていないが否定もしていない評価。安物や古い道具を弁護する時にちょうどいい温度。',
        example: {
            a: "That thing is ancient.",
            b: "It does the job. Why replace it?",
        },
    },
    {
        id: 'g1210',
        expression: 'a step up from',
        meaning: '〜より一段上',
        level: 1,
        category: 'collocation',
        why: '前の物を貶さずに改善を語れる。better than より、段階として一つ上がった感じが出る。',
        example: {
            a: "How's the new office?",
            b: "It's a step up from the old one. Actual windows.",
        },
    },
    // ===== Day 122 =====
    {
        id: 'g1211',
        expression: "let's leave it there",
        meaning: '今日はここまでにしよう',
        level: 2,
        category: 'situational',
        why: '結論が出ていなくても終われる型。stop より穏やかで、続きがある含みも残せる。',
        example: {
            a: "We're past the hour.",
            b: "Let's leave it there and pick it up next week.",
        },
    },
    {
        id: 'g1212',
        expression: 'where we left off',
        meaning: '前回の続きから',
        level: 2,
        category: 'collocation',
        why: '間が空いたことを責めずに再開できる型。会話でも仕事でも、同じ形でそのまま使える。',
        example: {
            a: "It's been three weeks.",
            b: "Let's pick up where we left off.",
        },
    },
    {
        id: 'g1213',
        expression: 'all in all',
        meaning: '全部ひっくるめて言えば',
        level: 2,
        category: 'describe',
        why: '細かい不満を認めた上で総括する型。良い点と悪い点を並べた後の着地として自然。',
        example: {
            a: "The venue was a mess.",
            b: "It was. All in all, though, it went well.",
        },
    },
    {
        id: 'g1214',
        expression: 'take stock',
        meaning: '一度立ち止まって見直す',
        level: 3,
        category: 'collocation',
        why: '在庫を数える意味から。反省でも計画でもなく、現状を数える行為を指すのがこの語の味。',
        example: {
            a: "Straight into the next one?",
            b: "Let's take stock first. A week won't kill us.",
        },
    },
    {
        id: 'g1215',
        expression: "I'll take it",
        meaning: 'それで十分、良しとする',
        level: 2,
        category: 'situational',
        why: '満点ではない結果を受け入れる型。買う意思表示の意味もあるので、文脈で使い分ける。',
        example: {
            a: "We finished two days late.",
            b: "After the month we had? I'll take it.",
        },
    },
    {
        id: 'g1216',
        expression: 'on balance',
        meaning: '差し引きで考えると',
        level: 3,
        category: 'describe',
        why: '天秤に載せて比べた上での結論。overall より、両側を見たという手続きが強調される。',
        example: {
            a: "Was the move worth it?",
            b: "On balance, yes. I miss the old team, though.",
        },
    },
    {
        id: 'g1217',
        expression: 'turn the page',
        meaning: '気持ちを切り替えて次へ',
        level: 3,
        category: 'describe',
        why: '忘れるのではなく、読み終えて次に進む。move on より穏やかで、過去を否定しないのがいい。',
        example: {
            a: "Are you still angry about it?",
            b: "Not anymore. I turned the page in August.",
        },
    },
    {
        id: 'g1218',
        expression: 'from here on out',
        meaning: 'これから先は',
        level: 2,
        category: 'collocation',
        why: '過去と切り離して新しい方針を宣言する型。謝罪の後でも、計画の頭でも使える。',
        example: {
            a: "So no more Friday releases?",
            b: "From here on out, we ship on Tuesdays.",
        },
    },
    {
        id: 'g1219',
        expression: 'thanks for sticking with it',
        meaning: '最後まで付き合ってくれてありがとう',
        level: 1,
        category: 'situational',
        why: '手伝いではなく「続けたこと」への礼。長い仕事の終わりに言われると、疲れの意味が変わる。',
        example: {
            a: "That was a long six months.",
            b: "Thanks for sticking with it. I know it wasn't fun.",
        },
    },
    {
        id: 'g1220',
        expression: 'we got there',
        meaning: 'なんとかたどり着いた',
        level: 1,
        category: 'situational',
        why: '完璧ではないが終わった、を全員の手柄として言える。we が入るのがこの一言の肝。',
        example: {
            a: "Not how we planned it.",
            b: "No. But we got there.",
        },
    },
];
