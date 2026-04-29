import { BotNode } from './types';

// 居酒屋 LINE bot. 純コント特化。学習要素ゼロ。
// voice: 体言止め短文、変な細部、温かい締め。
// dialog 多用 skit は character='system' にして lines に直接「誰「セリフ」」と書く。
// menu hub 廃止: 開いた瞬間 random で1ネタ降ってくる。

export const SKIT_NODES: BotNode[] = [
    // === 1. 権藤: 自滅 ===
    {
        id: 'gondo-empty-1',
        character: 'gondo',
        lines: [
            '客が来ない',
            'ビール飲んで待つ',
            '客が来ない理由を発見した',
            '俺だ',
        ],
        quickReplies: [{ label: 'マスター、また?', nextNodeId: 'gondo-empty-2' }],
        isEntry: true,
    },
    {
        id: 'gondo-empty-2',
        character: 'gondo',
        lines: [
            '営業中の俺と酔った俺の境界線が消えた',
            '社員教育では「主体性」と呼ぶ',
            '俺は社長',
            '自分を褒めた',
        ],
    },

    // === 2. 権藤×リサ: 新メニュー ===
    {
        id: 'gondo-menu-1',
        character: 'lisa',
        lines: [
            'マスター、新メニュー考えました',
            '焼きおにぎりピザ',
        ],
        quickReplies: [{ label: 'マスターの判定', nextNodeId: 'gondo-menu-2' }],
        isEntry: true,
    },
    {
        id: 'gondo-menu-2',
        character: 'gondo',
        lines: [
            '3秒考えた',
            'それは焼きおにぎりだ',
            'リサ、無言で帰った',
            '俺、メニューに加えた',
            '今夜の売れ筋No.1',
            'リサに金は払わない',
        ],
    },

    // === 3. ユキ: 相撲 ===
    {
        id: 'yuki-sumo-1',
        character: 'yuki',
        lines: [
            '会議で「お力添え頂ければ」って言うつもりが',
            '「お力ずもう頂ければ」って言った',
            '相撲',
            '上司、笑いを堪えてた',
            '以後あだ名は「力士」',
            '会議に呼ばれなくなった',
            'やったね',
        ],
        isEntry: true,
    },

    // === 4. ユキ: 会議無意味論 ===
    {
        id: 'yuki-meeting-1',
        character: 'yuki',
        lines: [
            '3時間の会議出た',
            '中身、全部Slackで済む内容',
            '会議は宗教儀式',
            '神は不在、参加者だけが熱心',
        ],
        quickReplies: [{ label: 'アーメン', nextNodeId: 'yuki-meeting-2' }],
        isEntry: true,
    },
    {
        id: 'yuki-meeting-2',
        character: 'yuki',
        lines: [
            'アーメン、私も思った',
            '会議室で唱えたら破門',
            '心の中だけで唱えるのが社会人',
        ],
    },

    // === 5. リサ: 電車のChatGPT男 ===
    {
        id: 'lisa-train-1',
        character: 'lisa',
        lines: [
            '電車で隣の中年男性',
            'ノートパソコンでChatGPTに恋愛相談中',
            '画面、見えた',
            'AIが「他に好きな人がいます」と返答',
            '男性、5秒固まった',
            '「他のAIに聞きます」と打ち込み席を立った',
            '都会、優しい',
        ],
        isEntry: true,
    },

    // === 6. 健二: 新人観察 (system mode) ===
    {
        id: 'kenji-newbie-1',
        character: 'system',
        lines: [
            '健二「うちの新人、宇宙人」',
            '健二「水準器を逆に使ってた」',
            '新人「これ、星を測るやつですか?」',
            '健二「建物だ」',
            '新人「建物に水平って必要?」',
            '健二「無いと崩れる」',
            '新人「へえ、神秘的」',
            '健二「優しい時代になったわ」',
        ],
        quickReplies: [{ label: 'マスターの感想', nextNodeId: 'kenji-newbie-2' }],
        isEntry: true,
    },
    {
        id: 'kenji-newbie-2',
        character: 'gondo',
        lines: [
            '健二が新人を「神秘的」と言える時代だ',
            '俺の若い頃、上司に殴られたら「愛」だった',
            '今は新人に「神秘」を感じる',
            '人類、進化',
        ],
    },

    // === 7. タケシ: コンビニ事件 ===
    {
        id: 'takeshi-conbini-1',
        character: 'takeshi',
        lines: [
            '自衛隊5年やめて',
            '初めてコンビニに行った',
            '店員「お弁当温めますか?」',
            '俺「はい!」',
            '3秒、敬礼の姿勢で固まった',
            '店員、震えてた',
            '弁当、冷たいまま渡された',
            '「はい!」が温度を奪った',
        ],
        isEntry: true,
    },

    // === 8. ミナ: 教授論破 ===
    {
        id: 'mina-prof-1',
        character: 'mina',
        lines: [
            '教授「SNS禁止」',
            '私「で?」',
            '教授「で?って言うやつ就活で詰む」',
            '私「で?って言わないための就活なら、人生って何ですか?」',
            '教授、5秒沈黙',
            '「博士まで来たまえ」',
            '世界、私に優しすぎる',
        ],
        isEntry: true,
    },

    // === 9. リサ→マスター過去 (system) ===
    {
        id: 'lisa-past-1',
        character: 'lisa',
        lines: [
            'ねえ、聞いた?',
            'マスター、昔ボロボロの英語で外国人女性を口説いた',
            '使ったセリフ「You like fish?」',
            '店のサバの話してただけ',
            '相手、デート誘われたと勘違い',
            '結婚した',
        ],
        quickReplies: [{ label: '本人に確認', nextNodeId: 'lisa-past-2' }],
        isEntry: true,
    },
    {
        id: 'lisa-past-2',
        character: 'gondo',
        lines: [
            'リサが何か言ったか',
            '俺は何も覚えていない',
            '記憶は人生で最も柔らかい部分',
            '柔らかいから形を変える',
            '俺の柔らかさは、サバ味',
        ],
    },

    // === 10. 健二×ミナ: 世代戦争 (system) ===
    {
        id: 'kenji-mina-1',
        character: 'system',
        lines: [
            '健二「ミナちゃん、最近の若者は何が流行ってるの」',
            'ミナ「健二さん、その質問が一番ダサい」',
            'ミナ「『最近の若者は』使った瞬間、50代確定」',
            '健二「俺45だぞ」',
            'ミナ「45も50も同じ」',
            '健二「絶望」',
            '権藤「俺は58だぞ」',
            'ミナ「マスターはカウント外」',
            '権藤、誇らしげ',
        ],
        isEntry: true,
    },

    // === 11. 権藤: 哲学 ===
    {
        id: 'gondo-philo-1',
        character: 'gondo',
        lines: [
            '人生で大事なのは三つ',
            '水、塩、ウインナー',
            '以上',
        ],
        quickReplies: [{ label: 'なんでウインナー?', nextNodeId: 'gondo-philo-2' }],
        isEntry: true,
    },
    {
        id: 'gondo-philo-2',
        character: 'gondo',
        lines: [
            '腹減った時、冷蔵庫にあると安心するから',
            '水と塩は生命の保険',
            'ウインナーは精神の保険',
            'リサに「SNSバズるよ」と言われたが',
            'Twitterやってないから言ってもいい',
        ],
    },

    // === 12. タケシ: 「はい」3パターン ===
    {
        id: 'takeshi-hai-1',
        character: 'takeshi',
        lines: [
            '自衛隊で一番重要な訓練、教える',
            '敬礼じゃない',
            '「はい!」 → 了解',
            '「はい」 → 嫌だが受ける',
            '「…はい」 → 絶対嫌',
            '最後を使った日は始末書',
        ],
        quickReplies: [{ label: '民間で使える?', nextNodeId: 'takeshi-hai-2' }],
        isEntry: true,
    },
    {
        id: 'takeshi-hai-2',
        character: 'takeshi',
        lines: [
            '使える',
            'バレるかは上司の能力次第',
            '能力低い上司の元では駆使しろ',
            '能力高い上司の元では本気で「はい!」しろ',
            '俺の上司は、能力高かった',
        ],
    },

    // === 13. 権藤: 朝の店じまい逆 ===
    {
        id: 'gondo-morning-1',
        character: 'gondo',
        lines: [
            '朝',
            '店を開ける',
            '客が来る前に俺が一杯やる',
            '日課',
            '健康法',
        ],
        isEntry: true,
    },

    // === 14. ミナ: 24歳中間管理職 ===
    {
        id: 'mina-age-1',
        character: 'mina',
        lines: [
            '24歳になって気づいた',
            '30代から見たら私は「若者」',
            '20歳から見たら私は「おばさん」',
            '中間管理職',
            '年齢の',
            '気持ち悪い',
        ],
        isEntry: true,
    },

    // === FALLBACK ===
    {
        id: 'fallback-1',
        character: 'gondo',
        lines: [
            '酔ってて聞こえなかった',
            'もう一回',
            'or 何も言わずに座ってろ',
        ],
        quickReplies: [{ label: '別のネタ', nextNodeId: 'random' }],
    },
    {
        id: 'random',
        character: 'system',
        lines: ['(別の常連が喋り出す...)'],
    },
];

export const SKIT_NODE_MAP: Map<string, BotNode> = new Map(SKIT_NODES.map(n => [n.id, n]));

// 自由入力 → entry node マッチング
export const ENTRY_KEYWORDS: { keywords: RegExp[]; entryNodeId: string }[] = [
    { keywords: [/疲れ|つらい|きつい|だるい|しんど/i], entryNodeId: 'yuki-meeting-1' },
    { keywords: [/会議|上司|会社|職場|仕事/i], entryNodeId: 'yuki-sumo-1' },
    { keywords: [/酒|飲み|ビール|居酒屋|呑/i], entryNodeId: 'gondo-empty-1' },
    { keywords: [/年齢|歳|若者|おっさん|おばさん|世代/i], entryNodeId: 'mina-age-1' },
    { keywords: [/タケシ|自衛隊|敬礼|軍/i], entryNodeId: 'takeshi-conbini-1' },
    { keywords: [/リサ|噂|ゴシップ|秘密/i], entryNodeId: 'lisa-past-1' },
    { keywords: [/権藤|マスター|店主|哲学/i], entryNodeId: 'gondo-philo-1' },
    { keywords: [/AI|ChatGPT|機械|彼女|彼氏|恋愛/i], entryNodeId: 'lisa-train-1' },
    { keywords: [/新人|後輩|現場|建設/i], entryNodeId: 'kenji-newbie-1' },
    { keywords: [/教授|大学|学校|院生/i], entryNodeId: 'mina-prof-1' },
    { keywords: [/メニュー|料理|食|ご飯/i], entryNodeId: 'gondo-menu-1' },
    { keywords: [/朝|おはよう/i], entryNodeId: 'gondo-morning-1' },
    { keywords: [/ミナ|24/i], entryNodeId: 'mina-age-1' },
];

export const ENTRY_NODE_IDS = SKIT_NODES.filter(n => n.isEntry).map(n => n.id);
