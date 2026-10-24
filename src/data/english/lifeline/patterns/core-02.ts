/**
 * PATTERNS — core 第2束 (意見 / 反対 / ぼかす / 強める)
 *
 * 第1束(頼む・申し出る・断る・確認する)が「窓口を通過する英語」だったのに対し、
 * ここからは **会話の中身を作る英語**。日本語話者が一番落とすのがこの4機能で、
 * 落とすと「用は足りるが会話にならない人」になる。
 *
 * とくに hedge(ぼかす)は、日本語話者が「曖昧を避けよう」として削ってしまう。
 * 逆である。英語の会話はぼかしで動いている。断定を並べると喧嘩腰に聞こえる。
 */

import type { Pattern } from './types';

export const CORE_02: Pattern[] = [

    // ============================================================
    // OPINE — 意見を出す
    // ============================================================
    {
        id: 'opi-i-feel-like',
        frame: 'I feel like [S].',
        ja: '〜な気がする',
        fn: 'opine', freq: 'core',
        trigger: '確信はないが言いたいことがある瞬間。会話で最も撃たれる意見の型。think より弱く、角が立たない。',
        slots: '[S] = 文。we should just call / that\'s not what he meant / it\'s going to rain',
        examples: [
            "I feel like we should just call them.",
            "I feel like that's not what she meant.",
            "I feel like I've been here before.",
        ],
        stations: ['Game Night', 'The Care Conversation', 'Speaking Up in a Meeting'],
        trap: 'I think を全部に使う。think を連発すると硬い報告書のようになる。',
    },
    {
        id: 'opi-id-say',
        frame: "I'd say [S].",
        ja: '〜だと思うけど',
        fn: 'opine', freq: 'core',
        trigger: '見積もり・判断を求められた瞬間。数字にも評価にも使える。断定を1段下げる。',
        slots: '[S] = 数字 or 判断。about twenty minutes / it\'s worth it / that\'s the better one',
        examples: [
            "I'd say twenty minutes, give or take.",
            "I'd say it's worth it.",
            "I'd say we wait until Monday.",
        ],
        stations: ['The Estate Appraisal', 'House Hunting', 'Getting a Quote'],
    },
    {
        id: 'opi-if-you-ask-me',
        frame: 'If you ask me, [S].',
        ja: '俺に言わせれば〜',
        fn: 'opine', freq: 'common',
        trigger: '聞かれていないが言いたい瞬間。前置きで「これは私見だ」と宣言してから撃つ。',
        slots: '[S] = 文。踏み込んだ意見ほどこの前置きが効く',
        examples: [
            "If you ask me, they knew about the roof.",
            "If you ask me, he never wanted the job.",
            "If you ask me, that's the whole problem.",
        ],
        stations: ["The Losers' Table", 'The Home Inspection', 'The PTA Meeting'],
    },
    {
        id: 'opi-the-way-i-see-it',
        frame: 'The way I see it, [S].',
        ja: '自分の見方では〜',
        fn: 'opine', freq: 'common',
        trigger: '相手と見立てが違うとわかっている瞬間。反対の直前に置くと、否定ではなく併置になる。',
        slots: '[S] = 文。結論から言う',
        examples: [
            "The way I see it, we've already paid for it twice.",
            "The way I see it, she's the only one who showed up.",
            "The way I see it, there's no downside to asking.",
        ],
        stations: ['The Care Conversation', 'Asking for a Raise'],
    },
    {
        id: 'opi-honestly',
        frame: 'Honestly, [S].',
        ja: '正直なところ〜',
        fn: 'opine', freq: 'core',
        trigger: '本音に切り替える瞬間。社交辞令を一枚はがす合図として全員が使う。',
        slots: '[S] = 文。To be honest / I\'m not gonna lie も同じ働き',
        examples: [
            "Honestly, I forgot.",
            "Honestly, it wasn't that good.",
            "I'm not gonna lie, I was relieved.",
        ],
        stations: ['The Worst First Date', "The Losers' Table", 'Game Night'],
    },
    {
        id: 'opi-to-be-fair',
        frame: 'To be fair, [S].',
        ja: 'まあ公平に言えば〜',
        fn: 'opine', freq: 'common',
        trigger: '批判が続いた後で、相手側の言い分を1つ足す瞬間。この型を持つ人は議論で信用される。',
        slots: '[S] = 相手側に有利な事実',
        examples: [
            "To be fair, they did call us back.",
            "To be fair, nobody told him.",
            "To be fair, it was raining.",
        ],
        stations: ['The PTA Meeting', 'Going to HR', 'The Block Party'],
    },
    {
        id: 'opi-i-mean',
        frame: 'I mean, [S].',
        ja: 'いや、〜だし',
        fn: 'opine', freq: 'core',
        trigger: '自分の直前の発言を補足・修正する瞬間。話しながら考えていることを示す。会話の潤滑油。',
        slots: '[S] = 補足。文頭に置くだけ',
        examples: [
            "I mean, it's not the end of the world.",
            "I mean, we could always ask.",
            "I mean, what else were we supposed to do?",
        ],
        stations: ['Game Night', 'The College Party', 'The Fight and the Fix'],
        trap: 'I mean を「つまり」と訳して使い所を誤る。訳より「言い直しの合図」と覚える。',
    },

    // ============================================================
    // DISAGREE — 反対する
    // ============================================================
    {
        id: 'dis-im-not-sure-about',
        frame: "I'm not sure about [NP].",
        ja: '〜はどうかと思う',
        fn: 'disagree', freq: 'core',
        trigger: '反対したいが正面から否定したくない瞬間。英語の反対はここから始まるのが標準。',
        slots: '[NP] = 案・物・人の判断。that / the timing / this one',
        examples: [
            "I'm not sure about the timing.",
            "I'm not sure about that one.",
            "I don't know about that.",
        ],
        stations: ['House Hunting', 'Speaking Up in a Meeting', 'The Care Conversation'],
        trap: 'いきなり I disagree. と言う。文法は正しいが、会話では強すぎて場が止まる。',
    },
    {
        id: 'dis-thats-fair-but',
        frame: "That's fair, but [S].",
        ja: 'それはそうだけど、〜',
        fn: 'disagree', freq: 'core',
        trigger: '相手の言い分を認めてから反対する瞬間。認める部分を先に置くのが英語の反対の作法。',
        slots: '[S] = 自分の反論',
        examples: [
            "That's fair, but we still have to pay for it.",
            "I hear you, but that's not what the contract says.",
            "I see what you mean, but he wasn't there.",
        ],
        stations: ['Going to HR', 'The Divorce Conversation', 'The PTA Meeting'],
    },
    {
        id: 'dis-different-read',
        frame: 'I have a different read on that.',
        ja: '自分は違う見方をしています',
        fn: 'disagree', freq: 'common',
        trigger: '職場で正面から反対する瞬間。wrong と言わずに反対できる、会議で最も安全な型。',
        slots: '固定。read は名詞で「読み・見立て」',
        examples: [
            "I have a different read on that.",
            "I read it differently.",
            "That's not how I'd read it.",
        ],
        stations: ['Speaking Up in a Meeting', 'The Performance Review'],
    },
    {
        id: 'dis-i-wouldnt-go-that-far',
        frame: "I wouldn't go that far.",
        ja: 'そこまでは言えないと思う',
        fn: 'disagree', freq: 'common',
        trigger: '相手が言いすぎた瞬間。全否定ではなく程度だけを削る。',
        slots: '固定',
        examples: [
            "I wouldn't go that far.",
            "That might be a stretch.",
            "I wouldn't say that, exactly.",
        ],
        stations: ["The Losers' Table", 'The Team You Follow'],
    },
    {
        id: 'dis-thats-not-how-i-remember',
        frame: "That's not how I remember it.",
        ja: '自分の記憶とは違う',
        fn: 'disagree', freq: 'edge',
        trigger: '事実そのものが食い違った瞬間。相手を嘘つき呼ばわりせずに事実を争える唯一の形。',
        slots: '固定。remember の代わりに heard / understood でもいい',
        examples: [
            "That's not how I remember it.",
            "That's not what I was told.",
            "That's not what we agreed on.",
        ],
        stations: ['Making Them Come Back', 'The Divorce Conversation', 'Small Claims Court'],
    },
    {
        id: 'dis-is-that-really',
        frame: 'Is that really [ADJ] though?',
        ja: 'それ本当に〜かな？',
        fn: 'disagree', freq: 'common',
        trigger: '断定に疑いを差し込む瞬間。質問の形にすることで反論の角を消す。',
        slots: '[ADJ] = necessary / fair / safe / worth it',
        examples: [
            "Is that really necessary though?",
            "Is it really worth it though?",
            "Is that actually true?",
        ],
        stations: ['Getting a Quote', 'The Phone Plan', 'Before the Surgery'],
    },

    // ============================================================
    // HEDGE — ぼかす・和らげる
    // ============================================================
    {
        id: 'hed-kind-of',
        frame: 'kind of / sort of [ADJ]',
        ja: 'ちょっと〜',
        fn: 'hedge', freq: 'core',
        trigger: '断定を避けたい全ての瞬間。会話で最も高頻度のぼかし。省くと発言が全部強くなる。',
        slots: '[ADJ] = 形容詞・動詞・名詞。kinda / sorta と潰れる',
        examples: [
            "It's kind of a long story.",
            "I kind of already knew.",
            "That's sort of the point.",
        ],
        stations: ['The Worst First Date', 'Game Night', 'Making Friends as an Adult'],
        trap: '「曖昧は失礼」と考えて全部断定する。英語では逆に、断定の連発が失礼になる。',
    },
    {
        id: 'hed-a-little',
        frame: 'a little [ADJ] / a bit of [NP]',
        ja: '少し〜',
        fn: 'hedge', freq: 'core',
        trigger: '悪い知らせや不満を、小さく見せて伝える瞬間。店員も医者も係員もこれで衝撃を減らす。',
        slots: '[ADJ] = loud / high / long。[NP] = a wait / a mess / a problem',
        examples: [
            "It's a bit of a wait tonight.",
            "Your blood pressure is a little high.",
            "It's a little loud here.",
        ],
        stations: ['The Emergency Room', 'Eating Out', 'The Annual Physical'],
    },
    {
        id: 'hed-i-could-be-wrong',
        frame: 'I could be wrong, but [S].',
        ja: '違ってたら悪いけど、〜',
        fn: 'hedge', freq: 'common',
        trigger: '確信がないまま指摘する瞬間。外れたときの逃げ道を先に作っておく。',
        slots: '[S] = 指摘の中身',
        examples: [
            "I could be wrong, but I think that's the wrong form.",
            "Correct me if I'm wrong, but didn't we already pay this?",
            "I might be misremembering, but he said Thursday.",
        ],
        stations: ['The Road Test', 'The Bill', 'The Fence Dispute'],
    },
    {
        id: 'hed-as-far-as-i-know',
        frame: 'As far as I know, [S].',
        ja: '自分の知る限りでは〜',
        fn: 'hedge', freq: 'common',
        trigger: '情報の責任範囲を限定する瞬間。断定すると後で責任を負うことになる場面。',
        slots: '[S] = 事実。from what I understand も同じ',
        examples: [
            "As far as I know, they're still open.",
            "From what I understand, it's covered.",
            "Last I heard, he was still at the hospital.",
        ],
        stations: ['The Bus Stop', 'Calling the Insurance Company'],
    },
    {
        id: 'hed-or-something',
        frame: '[NP] or something (like that)',
        ja: '〜とか、そんな感じ',
        fn: 'hedge', freq: 'core',
        trigger: '正確に思い出せない瞬間。名前・数字・時間を曖昧にしたまま会話を進める。',
        slots: '[NP] = 名詞。or whatever / or so も同族',
        examples: [
            "He said Tuesday or something.",
            "It was thirty bucks or so.",
            "Just keep it down or whatever.",
        ],
        stations: ['The Movie Theater', 'The College Party', 'The Bus Stop'],
    },
    {
        id: 'hed-pretty-much',
        frame: 'pretty much [S]',
        ja: 'だいたい〜',
        fn: 'hedge', freq: 'core',
        trigger: '「ほぼそう」を言う瞬間。yes と no の間を埋める最頻出の語。',
        slots: '固定。more or less も同じ',
        examples: [
            "That's pretty much it.",
            "We're pretty much done.",
            "More or less, yeah.",
        ],
        stations: ['Moving Day', 'First Week on the Job'],
    },
    {
        id: 'hed-not-that-adj',
        frame: "It's not that [ADJ].",
        ja: 'そんなに〜でもない',
        fn: 'hedge', freq: 'core',
        trigger: '相手の心配や評価を下げる瞬間。高校生の最上級の褒め言葉でもある。',
        slots: '[ADJ] = bad / far / hard / expensive',
        examples: [
            "It's not that bad here.",
            "It's not that far.",
            "It's not that big of a deal.",
        ],
        stations: ['The New Kid', 'The Road Trip', 'The Fight and the Fix'],
    },
    {
        id: 'hed-if-that-makes-sense',
        frame: '..., if that makes sense.',
        ja: '…伝わるかな',
        fn: 'hedge', freq: 'common',
        trigger: 'うまく言えなかった自覚がある瞬間。言い直しを頼まずに相手に確認を渡す。',
        slots: '文末に付けるだけ',
        examples: [
            "It's more of a dull ache, if that makes sense.",
            "I want to be involved but not in charge, if that makes sense.",
            "Does that make sense?",
        ],
        stations: ['The Emergency Room', 'The First Session', 'The IEP Meeting'],
    },

    // ============================================================
    // INTENSIFY — 強める
    // ============================================================
    {
        id: 'int-literally',
        frame: 'literally [S]',
        ja: 'まじで〜',
        fn: 'intensify', freq: 'core',
        trigger: '誇張ではないと言いたい瞬間。実際には誇張でも使われる。会話の頻出強調語。',
        slots: '動詞や形容詞の前に置く',
        examples: [
            "I literally just got here.",
            "There was literally nobody in line.",
            "He literally said that.",
        ],
        stations: ['The College Party', 'Game Night', 'The Airport Delay'],
    },
    {
        id: 'int-i-cant-even',
        frame: "I can't even [V].",
        ja: '〜する気にもならない',
        fn: 'intensify', freq: 'common',
        trigger: '感情が振り切れた瞬間。文を最後まで言わないことで大きさを出す。',
        slots: "[V] = 動詞原形。または省略して I can't even. で終える",
        examples: [
            "I can't even look at it.",
            "I can't even think about that right now.",
            "Honestly, I can't even.",
        ],
        stations: ['The Layoff', "The Losers' Table", 'The Claim'],
    },
    {
        id: 'int-by-far',
        frame: 'by far the [EST]',
        ja: '断然いちばん〜',
        fn: 'intensify', freq: 'common',
        trigger: '最上級を本気で言う瞬間。by far が無いと社交辞令に聞こえる。',
        slots: '[EST] = 最上級。best / worst / cheapest',
        examples: [
            "That's by far the best one.",
            "By far the worst week of the year.",
            "It's by far the cheapest option.",
        ],
        stations: ['House Hunting', 'The Bucket List', "The Losers' Table"],
    },
    {
        id: 'int-flat-out',
        frame: 'flat out [V] / straight up [ADJ]',
        ja: '完全に〜',
        fn: 'intensify', freq: 'edge',
        trigger: 'ごまかしがないと強調する瞬間。批判にも称賛にも使う。',
        slots: '動詞・形容詞の前',
        examples: [
            "He flat out lied.",
            "That's straight up illegal.",
            "She flat out refused.",
        ],
        stations: ['Making Them Come Back', 'Small Claims Court', 'The Collections Call'],
    },
];
