/**
 * PATTERNS — core 第3束 (会話を運ぶ / 評価する / 仮定する / 語る / 量と時間 / 引き受ける)
 *
 * 第1束が「窓口の通過」、第2束が「会話の中身」。ここは **会話の運転** にあたる。
 * 話を始める・切る・戻す・締める。これが無いと、正しい文を言えても会話が続かない。
 *
 * narrate(語る)は物語の側と直結する。ネイティブの雑談の大半は出来事の報告であり、
 * その報告には決まった始め方と落とし方がある。
 */

import type { Pattern } from './types';

export const CORE_03: Pattern[] = [

    // ============================================================
    // MANAGE — 会話を運ぶ
    // ============================================================
    {
        id: 'man-anyway',
        frame: 'Anyway, [S].',
        ja: 'まあそれはさておき、〜',
        fn: 'manage', freq: 'core',
        trigger: '脱線から本題に戻る瞬間。および話を締めにかかる瞬間。1語で場を切り替えられる。',
        slots: '[S] = 本題 or 締め',
        examples: [
            "Anyway, I'll let you two get back to it.",
            "Anyway, that's not why I called.",
            "Anyway. Where were we?",
        ],
        stations: ['The HOA Welcome', 'Making Friends as an Adult', 'Speaking Up in a Meeting'],
    },
    {
        id: 'man-speaking-of',
        frame: 'Speaking of [NP], [S].',
        ja: '〜といえば、〜',
        fn: 'manage', freq: 'core',
        trigger: '相手の話題に自分の話題を接ぎ木する瞬間。唐突に見せずに話を移せる。',
        slots: '[NP] = 直前に出た語をそのまま使う',
        examples: [
            "Speaking of the block party, did Donna call you?",
            "Speaking of which, I still have your ladder.",
            "That reminds me — the school called.",
        ],
        stations: ['The Backyard BBQ', 'The Bus Stop', 'Thanksgiving'],
    },
    {
        id: 'man-can-i-jump-in',
        frame: 'Can I jump in here?',
        ja: '一つよろしいですか',
        fn: 'manage', freq: 'core',
        trigger: '会議や複数人の会話に割り込む瞬間。完璧な文を待っていると一生入れない。',
        slots: '固定。Sorry to cut in / Real quick も同族',
        examples: [
            "Can I jump in here?",
            "Sorry to cut in, but we're running out of time.",
            "Real quick — is this the final version?",
        ],
        stations: ['Speaking Up in a Meeting', 'The PTA Meeting', 'The IEP Meeting'],
        trap: '手を挙げて指されるのを待つ。英語の会議は自分で入る前提でできている。',
    },
    {
        id: 'man-long-story-short',
        frame: 'Long story short, [S].',
        ja: '早い話が〜',
        fn: 'manage', freq: 'core',
        trigger: '説明が長くなったと自覚した瞬間。結論に飛ぶ許可を自分に出す。',
        slots: '[S] = 結論',
        examples: [
            "Long story short, we're back at the DMV tomorrow.",
            "Long story short, they never called back.",
            "To make a long story short, he quit.",
        ],
        stations: ['The Road Test', 'Calling the Insurance Company', "The Losers' Table"],
    },
    {
        id: 'man-let-me-let-you-go',
        frame: "I'll let you go.",
        ja: 'そろそろ切るね',
        fn: 'manage', freq: 'core',
        trigger: '電話や立ち話を終わらせる瞬間。相手を気遣う形にして自分が抜ける。',
        slots: '固定。I should get going / We should get out of your hair も同族',
        examples: [
            "I'll let you go.",
            "I should get going.",
            "We'll get out of your hair.",
        ],
        stations: ['The Bus Stop', 'The First Birthday', 'Making Friends as an Adult'],
        trap: '終わらせ方を持たず、相手が切るまで待つ。英語は抜ける側が宣言する。',
    },
    {
        id: 'man-hang-on',
        frame: 'Hang on. / Hold on.',
        ja: 'ちょっと待って',
        fn: 'manage', freq: 'core',
        trigger: '相手を止める瞬間。話にも作業にも電話にも使う。Wait より自然。',
        slots: '固定。Hang on a sec / Hold on, let me check',
        examples: [
            "Hold on — is that the one with the plates?",
            "Hang on a second, I'll grab it.",
            "Hold on, let me check.",
        ],
        stations: ['Moving Day', 'Calling the Insurance Company', 'Game Night'],
    },
    {
        id: 'man-where-were-we',
        frame: 'Where were we?',
        ja: 'どこまで話したっけ',
        fn: 'manage', freq: 'common',
        trigger: '中断のあとに再開する瞬間。会議・面談・電話。1語で全員を戻せる。',
        slots: '固定',
        examples: [
            "Where were we?",
            "Sorry — where did we leave off?",
            "Back to what you were saying.",
        ],
        stations: ['Speaking Up in a Meeting', 'The First Session'],
    },
    {
        id: 'man-before-i-forget',
        frame: 'Before I forget, [S].',
        ja: '忘れないうちに言うけど、〜',
        fn: 'manage', freq: 'common',
        trigger: '別件を差し込む瞬間。話の流れを壊す許可を先に取る。',
        slots: '[S] = 差し込む用件',
        examples: [
            "Before I forget, practice got moved to Thursday.",
            "While I have you — did the bill come?",
            "Oh, and one more thing.",
        ],
        stations: ['Little League', 'Calling the Insurance Company', 'The Handoff'],
    },

    // ============================================================
    // EVALUATE — 評価する
    // ============================================================
    {
        id: 'eva-could-be-worse',
        frame: 'Could be worse.',
        ja: 'まあマシな方だよ',
        fn: 'evaluate', freq: 'core',
        trigger: '悪い状況を軽く受け流す瞬間。アメリカの雑談で最も撃たれる評価。',
        slots: '固定。It could be a lot worse / Beats nothing',
        examples: [
            "Could be worse.",
            "It beats sitting in traffic.",
            "Better than nothing.",
        ],
        stations: ["The Losers' Table", 'The Airport Delay', 'The Layoff'],
    },
    {
        id: 'eva-thats-about-right',
        frame: "That's about right.",
        ja: 'まあそんなもんだね',
        fn: 'evaluate', freq: 'common',
        trigger: '相手の見積もりや評価に同意する瞬間。全面同意より軽く、会話が続く。',
        slots: '固定。Sounds about right も同じ',
        examples: [
            "Sounds about right.",
            "That's about right for this town.",
            "Yeah, that tracks.",
        ],
        stations: ['Getting a Quote', 'The Team You Follow', 'The Bus Stop'],
    },
    {
        id: 'eva-thatll-do',
        frame: "That'll do. / It'll do.",
        ja: 'まあそれでいい',
        fn: 'evaluate', freq: 'common',
        trigger: '完璧ではないが手を打つ瞬間。妥協を前向きに言える型。',
        slots: '固定。Good enough も同じ',
        examples: [
            "That'll do.",
            "Good enough.",
            "That's good right there.",
        ],
        stations: ['The Haircut', 'Moving Day', 'The Camping Trip'],
    },
    {
        id: 'eva-thats-a-first',
        frame: "That's a first.",
        ja: 'そんなの初めてだ',
        fn: 'evaluate', freq: 'edge',
        trigger: '珍しいことが起きた瞬間。皮肉としても素直な驚きとしても使える。',
        slots: '固定',
        examples: [
            "That's a first.",
            "Well, that's new.",
            "Never seen that before.",
        ],
        stations: ['The Road Test', 'The Emergency Room', "The Losers' Table"],
    },

    // ============================================================
    // SUPPOSE — 仮定する・予測する
    // ============================================================
    {
        id: 'sup-chances-are',
        frame: 'Chances are [S].',
        ja: 'たぶん〜だと思う',
        fn: 'suppose', freq: 'core',
        trigger: '確率で予測する瞬間。probably より会話らしく、根拠を求められにくい。',
        slots: '[S] = 文。Odds are も同じ',
        examples: [
            "Chances are they won't even call.",
            "Odds are it's already full.",
            "Chances are he forgot.",
        ],
        stations: ['The Airport Delay', 'Summer Camp', 'House Hunting'],
    },
    {
        id: 'sup-i-wouldnt-be-surprised',
        frame: "I wouldn't be surprised if [S].",
        ja: '〜でも驚かない',
        fn: 'suppose', freq: 'common',
        trigger: '悪い予測を、断定せずに置く瞬間。当たっても外れても角が立たない。',
        slots: '[S] = 文',
        examples: [
            "I wouldn't be surprised if they cancel it.",
            "I wouldn't be surprised if he shows up anyway.",
            "It wouldn't surprise me.",
        ],
        stations: ['The Airport Delay', 'The Block Party', 'The Layoff'],
    },
    {
        id: 'sup-if-it-were-up-to-me',
        frame: 'If it were up to me, [S].',
        ja: '自分の一存なら〜',
        fn: 'suppose', freq: 'common',
        trigger: '決定権が自分に無いと示しつつ意見を言う瞬間。店員・担当者・部下が使う。',
        slots: '[S] = 仮定法。I\'d 〜 が続く',
        examples: [
            "If it were up to me, I'd waive it.",
            "If it was up to me, we'd have left already.",
            "It's not really up to me.",
        ],
        stations: ['Opening an Account', 'The Airport Delay', 'The Performance Review'],
    },
    {
        id: 'sup-worst-case',
        frame: 'Worst case, [S].',
        ja: '最悪でも〜',
        fn: 'suppose', freq: 'core',
        trigger: '不安を数える瞬間。下限を先に言うと相手も自分も落ち着く。',
        slots: '[S] = 最悪の結果。Best case も対で使う',
        examples: [
            "Worst case, we come back tomorrow.",
            "Worst case, they say no.",
            "Best case, it's covered. Worst case, it's four hundred.",
        ],
        stations: ['The Road Test', 'The Bill', 'Before the Surgery'],
    },
    {
        id: 'sup-what-if',
        frame: 'What if [S]?',
        ja: '〜だったらどうする？',
        fn: 'suppose', freq: 'core',
        trigger: '案を出す瞬間、および不安を出す瞬間。同じ型が提案と心配の両方に使える。',
        slots: '[S] = 文',
        examples: [
            "What if we just split it?",
            "What if he doesn't show up?",
            "What happens if we do nothing?",
        ],
        stations: ['The Roommate Agreement', 'The Care Conversation', 'Before the Surgery'],
    },

    // ============================================================
    // NARRATE — 出来事を語る
    // ============================================================
    {
        id: 'nar-so-im-ving',
        frame: "So I'm [V-ing], and [S].",
        ja: '〜してたら、〜でさ',
        fn: 'narrate', freq: 'core',
        trigger: '出来事の報告を始める瞬間。現在進行形で語り出すのが英語の口語の標準。',
        slots: '[V-ing] = そのときやっていたこと',
        examples: [
            "So I'm standing there with the box cutter, and he just walks up.",
            "So we're waiting at the gate, and they change it.",
            "So I'm on hold for forty minutes, and then it drops.",
        ],
        stations: ['The HOA Welcome', 'The Airport Delay', 'Calling the Insurance Company'],
        trap: '過去形で整然と語る。口語の物語は現在形で走らせた方が伝わる。',
    },
    {
        id: 'nar-next-thing-i-know',
        frame: 'Next thing I know, [S].',
        ja: '気づいたら〜',
        fn: 'narrate', freq: 'core',
        trigger: '展開が急に飛んだことを示す瞬間。物語の中盤で必ず撃たれる。',
        slots: '[S] = 飛んだ結果',
        examples: [
            "Next thing I know, I'm on the committee.",
            "Next thing you know, it's midnight.",
            "Before I knew it, we'd signed.",
        ],
        stations: ['The Block Party', 'The College Party', 'The Lease'],
    },
    {
        id: 'nar-turns-out',
        frame: 'Turns out [S].',
        ja: '結局〜だった',
        fn: 'narrate', freq: 'core',
        trigger: '意外な事実が判明した瞬間。物語の落としどころで最も使われる。',
        slots: '[S] = 判明した事実',
        examples: [
            "Turns out the lease counts as one document.",
            "Turns out he'd known the whole time.",
            "It turned out to be nothing.",
        ],
        stations: ['The Road Test', 'The Home Inspection', 'The Emergency Room'],
    },
    {
        id: 'nar-ended-up',
        frame: 'I ended up [V-ing].',
        ja: '結局〜することになった',
        fn: 'narrate', freq: 'core',
        trigger: '意図しない結末を報告する瞬間。言い訳にも笑いにもなる。',
        slots: '[V-ing] = 結末の行動',
        examples: [
            "I ended up taking chairs anyway.",
            "We ended up waiting three hours.",
            "He ended up paying for all of it.",
        ],
        stations: ['The Block Party', 'The Emergency Room', 'Eating Out'],
    },
    {
        id: 'nar-thats-when',
        frame: "That's when [S].",
        ja: 'そのときに〜',
        fn: 'narrate', freq: 'common',
        trigger: '転換点を指す瞬間。話の山を明示する。',
        slots: '[S] = 転換の中身',
        examples: [
            "That's when she handed me the clipboard.",
            "That's when I realized we were missing a document.",
            "That's when it got bad.",
        ],
        stations: ['The Block Party', 'The Road Test', 'The Claim'],
    },
    {
        id: 'nar-it-got-to-the-point',
        frame: 'It got to the point where [S].',
        ja: '〜するまでになった',
        fn: 'narrate', freq: 'common',
        trigger: '悪化の度合いを語る瞬間。医療でも人間関係でも仕事でも同じ形。',
        slots: '[S] = 到達点',
        examples: [
            "It got to the point where I couldn't put any weight on it.",
            "It got to the point where nobody was talking.",
            "It's gotten to the point where I dread Mondays.",
        ],
        stations: ['The Emergency Room', 'The Fight and the Fix', 'Going to HR'],
    },

    // ============================================================
    // QUANTIFY — 量と時間
    // ============================================================
    {
        id: 'qua-a-couple',
        frame: 'a couple of [NP] / a handful of [NP]',
        ja: '2、3の〜 / ひと握りの〜',
        fn: 'quantify', freq: 'core',
        trigger: '正確な数を言わずに量を出す瞬間。会話では正確な数字の方が不自然なことが多い。',
        slots: '[NP] = 可算名詞。a couple は2〜3、a handful は5前後',
        examples: [
            "I'm getting a couple of quotes.",
            "You'll need a few stitches.",
            "A handful of people showed up.",
        ],
        stations: ['Getting a Quote', 'The Emergency Room', 'The Block Party'],
    },
    {
        id: 'qua-give-or-take',
        frame: '[NUM], give or take',
        ja: '〜くらい、前後で',
        fn: 'quantify', freq: 'common',
        trigger: '数字を出しつつ幅を持たせる瞬間。見積もり・時間・金額。',
        slots: '[NUM] = 数字',
        examples: [
            "Twenty minutes, give or take.",
            "About three hundred, give or take.",
            "Ten years, give or take.",
        ],
        stations: ['The Road Trip', 'Getting a Quote', 'The Retirement Party'],
    },
    {
        id: 'qua-a-while-back',
        frame: 'a while back / down the road',
        ja: '少し前に / この先いつか',
        fn: 'quantify', freq: 'core',
        trigger: '時期をぼかす瞬間。過去も未来も、正確な日付を避けて話を進める。',
        slots: '固定。any minute now / one of these days も同族',
        examples: [
            "We talked about it a while back.",
            "We can look at that down the road.",
            "They should be here any minute now.",
        ],
        stations: ['The Care Conversation', 'House Hunting', 'The Airport Delay'],
    },
    {
        id: 'qua-every-other',
        frame: 'every other [N]',
        ja: '1つおきの〜',
        fn: 'quantify', freq: 'common',
        trigger: '隔週・隔日の予定を言う瞬間。共同親権・当番・通院で必ず出る。',
        slots: '[N] = week / day / Friday',
        examples: [
            "He's with me every other weekend.",
            "It's every other Tuesday.",
            "I go in every other month.",
        ],
        stations: ['The Handoff', 'Little League', 'Physical Therapy'],
        trap: 'every two weeks と混同する。every other は「1つ飛ばし」で、開始点が要る。',
    },

    // ============================================================
    // COMMIT — 引き受ける・約束する
    // ============================================================
    {
        id: 'com-im-on-it',
        frame: "I'm on it.",
        ja: 'やっときます',
        fn: 'commit', freq: 'core',
        trigger: '頼まれた直後。返事を最短で返す。職場で信用が上がる型。',
        slots: '固定。On it. だけでもいい',
        examples: [
            "I'm on it.",
            "On it.",
            "Consider it done.",
        ],
        stations: ['First Week on the Job', 'The Block Party', 'Moving Day'],
    },
    {
        id: 'com-ill-take-care-of-it',
        frame: "I'll take care of it.",
        ja: 'こっちで対応します',
        fn: 'commit', freq: 'core',
        trigger: '問題を引き取る瞬間。店員・上司・家族。相手の負担をここで終わらせる。',
        slots: '固定。Let me take care of it も同じ',
        examples: [
            "Let me take care of it.",
            "I'll take care of it tonight.",
            "I've got it.",
        ],
        stations: ['Eating Out', 'Customer Service', 'The Care Conversation'],
    },
    {
        id: 'com-ill-see-what-i-can-do',
        frame: "I'll see what I can do.",
        ja: 'できるか見てみます',
        fn: 'commit', freq: 'core',
        trigger: '約束はできないが動く意思を見せる瞬間。窓口の人が最も撃つ型。',
        slots: '固定。No promises, but 〜 も同族',
        examples: [
            "I'll see what I can do.",
            "No promises, but I'll ask.",
            "Let me look and see.",
        ],
        stations: ['The Airport Delay', 'Calling the Insurance Company', 'Checking In'],
        trap: 'これを承諾と受け取る。動くという意思表示で、結果の約束ではない。',
    },
    {
        id: 'com-you-have-my-word',
        frame: 'You have my word.',
        ja: '約束します',
        fn: 'commit', freq: 'edge',
        trigger: '信用が争点になった瞬間。軽く使うと嘘くさくなる。重い場面専用。',
        slots: '固定',
        examples: [
            "You have my word.",
            "I'm not going to let that happen.",
            "I'll be there. I mean it.",
        ],
        stations: ['The Handoff', 'The Divorce Conversation', 'The Last Room'],
    },
];
