/**
 * PATTERNS — core 第1束 (頼む / 申し出る / 断る / 確認する)
 *
 * 会話の骨格のうち、最も発火回数が多い4機能。
 * ここが撃てないと、窓口を1つも通過できない。
 *
 * 各型は frame(穴あき) + trigger(いつ撃つか) + slots(何を刺すか) を必ず持つ。
 * examples は bank(層3)から引いた実例。型と実例が同じ場所で見えるようにしてある。
 */

import type { Pattern } from './types';

export const CORE_01: Pattern[] = [

    // ============================================================
    // REQUEST — 頼む・許可を取る
    // ============================================================
    {
        id: 'req-can-i-get',
        frame: 'Can I get [NP]?',
        ja: '〜をください / 〜をもらえますか',
        fn: 'request', freq: 'core',
        trigger: 'カウンター・店・窓口で、物やサービスを求める瞬間。金を払う側に立ったとき。',
        slots: '[NP] = 商品・書類・容器・情報。a large fries / an application / a to-go box / a reference number',
        examples: [
            'Can I get a large fries?',
            'Can I get an application?',
            'Can I get a reference number for this call?',
        ],
        stations: ['Ordering at the Counter', 'Eating Out', 'The First Application', 'Calling the Insurance Company'],
        trap: 'Please give me 〜 と言ってしまう。命令形は店でも役所でも使わない。',
    },
    {
        id: 'req-could-you',
        frame: 'Could you [V] for me?',
        ja: '〜してもらえますか',
        fn: 'request', freq: 'core',
        trigger: '相手に手間をかける依頼。Can より一段丁寧にしたいとき。初対面・目上・窓口。',
        slots: '[V] = 動作。take a look / hold this / write that down / call me back',
        examples: [
            'Could you take a look at my resume?',
            'Could you repeat the question, please?',
            'Could I get a late checkout?',
        ],
        stations: ['The Career Center', 'The Naturalization Ceremony', 'Checking In'],
    },
    {
        id: 'req-would-you-mind',
        frame: 'Would you mind [V-ing]?',
        ja: '〜していただけませんか',
        fn: 'request', freq: 'common',
        trigger: '断られてもおかしくない依頼。相手に負担が明確にあるとき。',
        slots: '[V-ing] = moving over / turning that down / holding the door',
        examples: [
            'Would you mind moving down one seat?',
            'Would you mind holding this for a second?',
            'Would you mind if I opened the window?',
        ],
        stations: ['The Movie Theater', 'The Airport Delay'],
        trap: '肯定の返事が No. になる。Yes. と答えると断ったことになる。',
    },
    {
        id: 'req-do-you-mind-if',
        frame: 'Do you mind if I [V]?',
        ja: '〜してもいいですか',
        fn: 'request', freq: 'common',
        trigger: '自分がこれからやる行為の許可。相手の領域に入るとき。',
        slots: '[V] = sit here / take this / step out / record this',
        examples: [
            'Do you mind if I sit here?',
            'Do you mind if I take this one?',
            'Do you mind if I call you back in five?',
        ],
        stations: ['Sunday Service', 'Speaking Up in a Meeting'],
    },
    {
        id: 'req-can-i-reach',
        frame: 'Can I [V] for it?',
        ja: '(動く前に)〜していいですか',
        fn: 'request', freq: 'edge',
        trigger: '動くと誤解される場面。警察の職務質問、検査台の上、手術前。動作の前に必ず言う。',
        slots: '[V] = reach / move / stand up / get up',
        examples: [
            "It's in the glove box — can I reach for it?",
            'Can I stand up for a second?',
            'Can I move my arm?',
        ],
        stations: ['The Traffic Stop', 'Before the Surgery'],
        trap: '黙って手を動かす。この型は英語力ではなく手順の問題で、知らないと危ない。',
    },
    {
        id: 'req-im-looking-for',
        frame: "I'm looking for [NP].",
        ja: '〜を探しています / 〜を希望します',
        fn: 'request', freq: 'core',
        trigger: '店で物を探すとき、そして交渉で自分の希望額を先に出すとき。同じ型が両方で撃てる。',
        slots: '[NP] = 商品 / 金額 / 条件。ninety-five / a two-bedroom / something under fifty',
        examples: [
            "I'm looking for ninety-five.",
            "I'm looking for something in the two-bedroom range.",
            "I'm just looking, thanks.",
        ],
        stations: ['Asking for a Raise', 'The Lease', 'Ordering at the Counter'],
    },
    {
        id: 'req-any-chance',
        frame: 'Any chance you could [V]?',
        ja: 'もし可能なら〜してもらえませんか',
        fn: 'request', freq: 'common',
        trigger: '無理を承知で頼むとき。断られる前提を型に埋め込んで、相手を楽にする。',
        slots: '[V] = squeeze us in / push it back a week / waive that',
        examples: [
            'Any chance you could squeeze us in tonight?',
            'Any chance you could waive that fee?',
            'Any chance there\'s something earlier?',
        ],
        stations: ['Eating Out', 'Opening an Account', 'The Airport Delay'],
    },

    // ============================================================
    // OFFER — 申し出る
    // ============================================================
    {
        id: 'off-want-me-to',
        frame: '(Do you) want me to [V]?',
        ja: '〜しようか？',
        fn: 'offer', freq: 'core',
        trigger: '相手が困っている、または手が塞がっている瞬間。家庭内・友人・同僚で最も撃つ型。',
        slots: '[V] = leave the light on / drive / grab it / call them',
        examples: [
            'Want me to leave the hall light on?',
            'Do you want me to box that up?',
            'Want me to call them for you?',
        ],
        stations: ['The Monster Under the Bed', 'Eating Out', 'The Bus Stop'],
        trap: 'Shall I 〜? を使う。文法は正しいが、日常会話では古く硬い。',
    },
    {
        id: 'off-let-me',
        frame: 'Let me [V].',
        ja: '〜しますね',
        fn: 'offer', freq: 'core',
        trigger: '許可を求めずに自分が引き受けると宣言する瞬間。店員・医療者・主催者が使う。',
        slots: '[V] = take care of it / grab that / check on that / get you a new one',
        examples: [
            'Let me take care of it.',
            'Let me get it this time.',
            'Let me follow up after this.',
        ],
        stations: ['Eating Out', 'Speaking Up in a Meeting'],
    },
    {
        id: 'off-i-can-if',
        frame: 'I can [V] if [S].',
        ja: '〜なら〜できますよ',
        fn: 'offer', freq: 'common',
        trigger: '押しつけずに申し出る。相手が断りやすい形にしたいとき。近所づきあいの中心。',
        slots: '[S] = you\'re stuck / that helps / you need it',
        examples: [
            "I can drive him if you're stuck.",
            'I can cover his part, but I want that noted.',
            'I can take over for a while.',
        ],
        stations: ['The Bus Stop', 'The Group Project', 'The Road Trip'],
    },
    {
        id: 'off-can-i-get-you',
        frame: 'Can I get you [NP]?',
        ja: '〜いかがですか / 何か持ってきましょうか',
        fn: 'offer', freq: 'core',
        trigger: '相手が客・患者・付き添いの側にいる瞬間。req-can-i-get と語順が同じで向きが逆。',
        slots: '[NP] = anything / something to drink / ice chips / a blanket',
        examples: [
            'Can I get you anything? Ice chips?',
            'Can I start you off with something to drink?',
            'Can I get you anything else?',
        ],
        stations: ['The Delivery Room', 'Eating Out'],
    },
    {
        id: 'off-ill-take',
        frame: "I'll take [NP].",
        ja: '〜は自分が引き受けます',
        fn: 'offer', freq: 'core',
        trigger: '役割分担の場で、自分の担当を先に取る瞬間。取ると重い役が回ってこない。',
        slots: '[NP] = the Q and A / chairs / the dishes / the early shift',
        examples: [
            "I'll take the Q and A.",
            'Put me down for chairs.',
            "I'll do the dishes.",
        ],
        stations: ['The Group Project', 'The Block Party', 'Thanksgiving'],
    },

    // ============================================================
    // REFUSE — 断る・かわす
    // ============================================================
    {
        id: 'ref-im-good',
        frame: "I'm good (for now), thanks.",
        ja: '大丈夫です / いまは結構です',
        fn: 'refuse', freq: 'core',
        trigger: '飲み物・追加・手伝いを勧められた瞬間。No だけだと強すぎる場面。',
        slots: '固定。for now / for the moment を足すと柔らかくなる',
        examples: [
            "I'm good for now, thanks.",
            "We're good, thanks.",
            "No, I'm good.",
        ],
        stations: ['The Backyard BBQ', 'Eating Out', 'The Emergency Room'],
        trap: 'No, thank you. を連発する。間違いではないが、毎回だと硬い。',
    },
    {
        id: 'ref-ill-pass',
        frame: "I'll pass on [NP].",
        ja: '〜は見送ります',
        fn: 'refuse', freq: 'common',
        trigger: '売り込み・オプション・保険を断る瞬間。理由を言わずに閉じられる。',
        slots: '[NP] = the insurance / the extended warranty / dessert',
        examples: [
            "I'll pass on the insurance.",
            "I'll decline the coverage.",
            "I'll skip it this time.",
        ],
        stations: ['The Phone Plan', 'The Rental Counter', 'The Eye Exam'],
    },
    {
        id: 'ref-stretched-thin',
        frame: "I'm already [ADJ] right now.",
        ja: 'いまはもう手一杯で',
        fn: 'refuse', freq: 'common',
        trigger: '役や当番を振られた瞬間。断る理由を自分の状態に置いて、相手を否定しない。',
        slots: '[ADJ] = stretched pretty thin / tied up / swamped / maxed out',
        examples: [
            "I'm already stretched pretty thin.",
            "I'm tied up this week.",
            "I'm swamped through Friday.",
        ],
        stations: ['The Block Party', 'Little League', 'The PTA Meeting'],
    },
    {
        id: 'ref-id-rather',
        frame: "I'd rather [V] (than [V]).",
        ja: '〜より〜したい',
        fn: 'refuse', freq: 'core',
        trigger: '相手の案を否定せずに自分の案を通す瞬間。断りと提案を1文でやる。',
        slots: '[V] = 動詞原形。let the insurance sort it out / keep her with me / be honest',
        examples: [
            "I'd rather let the insurance sort it out.",
            "I'd rather keep her with me.",
            "I'd rather be honest than drag it out.",
        ],
        stations: ['The Accident', 'The Delivery Room', 'The Breakup'],
    },
    {
        id: 'ref-not-this-time',
        frame: 'Maybe next time.',
        ja: 'また今度で',
        fn: 'refuse', freq: 'core',
        trigger: '誘い・勧めを、関係を切らずに断る瞬間。デザート・飲み・イベント。',
        slots: '固定。次回に投げることで角を消す',
        examples: [
            'Maybe next time.',
            "We'll catch the next one.",
            'Not tonight, but soon.',
        ],
        stations: ['Eating Out', 'Making Friends as an Adult'],
        trap: '断りのつもりで Maybe. と言うと、脈ありとして受け取られる。',
    },
    {
        id: 'ref-i-dont-think',
        frame: "I don't think [S].",
        ja: '〜ではないと思う',
        fn: 'refuse', freq: 'core',
        trigger: '関係・提案・見立てを否定する瞬間。断定を避けつつ結論は出す。',
        slots: "[S] = we're a match / this is working / that's going to work",
        examples: [
            "I don't think we're a match.",
            "I don't think this is working.",
            "I don't think that's going to work for us.",
        ],
        stations: ['The Worst First Date', 'The Breakup', 'House Hunting'],
        trap: 'I think we are not 〜 と言う。英語は否定を think 側に寄せる。',
    },
    {
        id: 'ref-not-necessary',
        frame: "That's really not necessary.",
        ja: 'そこまでしていただかなくても',
        fn: 'refuse', freq: 'edge',
        trigger: '相手が謝罪・返金・過剰な埋め合わせを申し出た瞬間。受け取らないと決めたとき。',
        slots: '固定。really を入れると本気度が伝わる',
        examples: [
            "That's really not necessary.",
            "You don't have to do that.",
            "Honestly, it's fine.",
        ],
        stations: ['Eating Out', 'Customer Service'],
    },

    // ============================================================
    // CONFIRM — 確認する・聞き返す
    // ============================================================
    {
        id: 'con-just-so-im-clear',
        frame: "Just so I'm clear — [S]?",
        ja: '確認させてください。〜ということですか',
        fn: 'confirm', freq: 'core',
        trigger: '理解が怪しいまま話が進みそうな瞬間。無知に聞こえずに止められる唯一の型。',
        slots: '[S] = 相手の発言を自分の言葉で言い直したもの',
        examples: [
            "Just so I'm clear — this is due Friday?",
            'So you\'re saying the deposit is non-refundable?',
            'Let me make sure I have this right.',
        ],
        stations: ['First Week on the Job', 'The Lease', 'The IEP Meeting'],
        trap: 'わかったふりで頷く。この型を1つ持つだけで、以後の全窓口の事故が減る。',
    },
    {
        id: 'con-say-again',
        frame: 'Sorry, what was [NP] again?',
        ja: 'すみません、〜をもう一度',
        fn: 'confirm', freq: 'core',
        trigger: '聞き取れなかった瞬間。again を付けると1回目でも失礼にならない。',
        slots: '[NP] = your name / that number / the address',
        examples: [
            'Sorry, what was your name again?',
            'Sorry, what was that last part?',
            'Could you repeat the question, please?',
        ],
        stations: ['The College Party', 'The Naturalization Ceremony', 'The Road Trip'],
        trap: 'Pardon? を使う。通じるが硬く、繰り返すと不自然になる。',
    },
    {
        id: 'con-what-does-stand-for',
        frame: 'What does [NP] stand for?',
        ja: 'その略語は何の略ですか',
        fn: 'confirm', freq: 'common',
        trigger: '職場・病院・役所で知らない略語が出た瞬間。最初の2週間は何度でも撃っていい。',
        slots: '[NP] = EOD / PTO / COBRA / IEP',
        examples: [
            'Sorry, what does that stand for?',
            "I don't know that acronym — what is it?",
            'Is that the same as [X]?',
        ],
        stations: ['First Week on the Job', 'The IEP Meeting', 'Choosing Medicare'],
    },
    {
        id: 'con-plain-language',
        frame: 'Can you put that in plain language?',
        ja: 'わかる言葉で言い直してもらえますか',
        fn: 'confirm', freq: 'common',
        trigger: '相手が制度・医療・法律の言葉で話し始めた瞬間。専門用語を止める型。',
        slots: '固定。plain English / simpler terms でも同じ',
        examples: [
            'Can you put that in plain language?',
            'Can you explain that in plain English?',
            'What does that mean for us, practically?',
        ],
        stations: ['The IEP Meeting', 'The Emergency Room', 'The Divorce Conversation'],
    },
    {
        id: 'con-what-happens-next',
        frame: 'What happens next?',
        ja: 'この後どうなりますか',
        fn: 'confirm', freq: 'core',
        trigger: '面談・相談・手続きが終わりかけた瞬間。これを撃たないと何も決まらずに帰ることになる。',
        slots: '固定。What are the next steps? も同じ',
        examples: [
            'What happens next?',
            'What are my options here?',
            'What do you need from me to make that happen?',
        ],
        stations: ['The Bullying Meeting', 'Going to HR', 'The Layoff'],
        trap: '「対応します」で満足して帰る。次の行動が決まっていない約束は実行されない。',
    },
    {
        id: 'con-in-writing',
        // 第1章の検査で「Can we get that in writing?」が未検出になった。
        // 型の側が人称を固定していたのが誤り。主語をスロットにする。
        frame: 'Can [I/we] get that in writing?',
        ja: 'それを書面でもらえますか',
        fn: 'confirm', freq: 'common',
        trigger: '口約束が出た瞬間。解約・見積もり・面談・保険。ここで書面にすると後で戦える。',
        slots: '[NP] = that / the estimate / a confirmation / a written summary',
        examples: [
            'Can I get that in writing?',
            'Can you email me a confirmation?',
            "I'd like a written summary of this meeting.",
        ],
        stations: ['The Gym Membership', 'Getting a Quote', 'Going to HR', 'Cancelling the Subscription'],
    },
    {
        id: 'con-is-that-included',
        frame: 'Is [NP] included?',
        ja: '〜は含まれていますか',
        fn: 'confirm', freq: 'core',
        trigger: '金額を提示された瞬間。含まれていないものが必ずあるので、必ず1回撃つ。',
        slots: '[NP] = utilities / gratuity / parts and labor / tax',
        examples: [
            "Utilities aren't included.",
            'Is gratuity included?',
            'Is that parts and labor?',
        ],
        stations: ['The Lease', 'Eating Out', 'Getting a Quote'],
    },
    {
        id: 'con-whats-the-total',
        frame: "What's the [NP] price?",
        ja: '総額はいくらですか',
        fn: 'confirm', freq: 'common',
        trigger: '本体価格しか言われていない瞬間。車・工事・引っ越し・携帯。ここで総額を出させる。',
        slots: '[NP] = out-the-door / all-in / total monthly',
        examples: [
            "What's the out-the-door price?",
            "What's the monthly, all in?",
            'Are there any other fees?',
        ],
        stations: ['Buying a Used Car', 'The Phone Plan', 'Moving Day'],
        trap: '月々の支払額だけで判断して、支払回数を聞かない。',
    },
    {
        id: 'con-who-am-i-speaking-with',
        frame: 'Who am I speaking with?',
        ja: 'お名前を伺えますか',
        fn: 'confirm', freq: 'edge',
        trigger: '電話で重要な話をしている瞬間。名前と参照番号を取ると、次の電話が最初からにならない。',
        slots: '固定。+ Can I get a reference number for this call?',
        examples: [
            'Who am I speaking with?',
            'Can I get a reference number for this call?',
            'Who is this, and what company are you with?',
        ],
        stations: ['Calling the Insurance Company', 'The Collections Call'],
    },
];
