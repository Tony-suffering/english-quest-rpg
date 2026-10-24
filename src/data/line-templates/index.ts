// LINE 配信テンプレート集
// 過去の配信フォーマット (v1〜) を保存。新作はここに追加していく。
// 各テンプレートは LINE Flex Message 配列 (LINE Messaging API broadcast 仕様)

export interface LineTemplate {
    id: string;
    version: string;
    label: string;
    description: string;
    category: 'wanted' | 'clinic' | 'death' | 'lies' | 'toeic' | 'syndrome' | 'intro' | 'misc' | 'insurance' | 'diagnosis' | 'kakuhen';
    messages: any[];
}

const CHAR_IMG = (slug: string) => `https://iwasaki-naisou.com/characters/${slug}.webp`;

// ============================================================
// WANTED v2 — 警察ファイル型 (氏名/本籍/罪状/犯行手口/特徴/潜伏先/危険度)
// ============================================================
const WANTED_V2_BUBBLE = (data: {
    no: string;
    img: string;
    name: string;
    birthplace: string;
    crime: string;
    modusOperandi: string[];
    traits: string[];
    hideout: string;
    danger: number;
    tagline: string;
}) => ({
    type: 'bubble',
    size: 'kilo',
    hero: { type: 'image', url: data.img, aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
    body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
            // メタ table
            ...[
                ['氏名', data.name],
                ['本籍', data.birthplace],
            ].map(([k, v]) => ({
                type: 'box',
                layout: 'horizontal',
                contents: [
                    { type: 'text', text: k, color: '#888888', size: 'sm', flex: 2 },
                    { type: 'text', text: v, size: 'sm', weight: 'bold', flex: 5, wrap: true },
                ],
            })),
            // 罪状 (red)
            {
                type: 'box',
                layout: 'horizontal',
                contents: [
                    { type: 'text', text: '罪状', color: '#DC2626', size: 'sm', weight: 'bold', flex: 2 },
                    { type: 'text', text: data.crime, size: 'sm', weight: 'bold', flex: 5, wrap: true },
                ],
            },
            { type: 'separator', margin: 'md' },
            // 犯行手口
            { type: 'text', text: '犯行手口', color: '#DC2626', size: 'sm', weight: 'bold', margin: 'md' },
            ...data.modusOperandi.map(line => ({
                type: 'text', text: line, size: 'sm', wrap: true,
            })),
            // 特徴
            { type: 'text', text: '特徴', color: '#DC2626', size: 'sm', weight: 'bold', margin: 'md' },
            ...data.traits.map(t => ({
                type: 'text', text: `・${t}`, size: 'sm', wrap: true,
            })),
            // 潜伏先
            { type: 'text', text: '潜伏先', color: '#DC2626', size: 'sm', weight: 'bold', margin: 'md' },
            { type: 'text', text: data.hideout, size: 'sm', wrap: true },
        ],
    },
    footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1c1917',
        paddingAll: 'lg',
        spacing: 'xs',
        contents: [
            {
                type: 'text',
                text: `危険度: ${'★'.repeat(data.danger)}${'☆'.repeat(5 - data.danger)}`,
                color: '#DC2626',
                weight: 'bold',
                size: 'md',
            },
            { type: 'text', text: data.tagline, color: '#ffffff', size: 'xs' },
        ],
    },
});

const WANTED_V2: LineTemplate = {
    id: 'wanted-v2',
    version: 'v2',
    label: 'WANTED 指名手配 (警察ファイル型)',
    description: '氏名/本籍/罪状/犯行手口/特徴/潜伏先/危険度★ の本格警察ファイル風',
    category: 'wanted',
    messages: [
        {
            type: 'flex',
            altText: '【警視庁・英語事犯対策課】危険度A級 5名指名手配',
            contents: {
                type: 'carousel',
                contents: [
                    WANTED_V2_BUBBLE({
                        no: '#001',
                        img: CHAR_IMG('takeshi'),
                        name: 'タケシ・35歳',
                        birthplace: 'TOEIC 800・自衛隊',
                        crime: 'Fine Thank You 過失致死',
                        modusOperandi: [
                            '「How are you?」に対し',
                            '「Fine, thank you. And you?」と',
                            '反射的に発砲。',
                            '講師1名を3秒沈黙させた',
                        ],
                        traits: [
                            '「Pretty good」を絶対言わない',
                            '敬礼の姿勢を取りがち',
                            'コンビニ店員を震えさせる',
                        ],
                        hideout: 'オンライン英会話のチャット欄',
                        danger: 5,
                        tagline: '見つけたら通報せよ',
                    }),
                    WANTED_V2_BUBBLE({
                        no: '#002',
                        img: CHAR_IMG('master'),
                        name: '権藤・58歳',
                        birthplace: '店主・元商社マン',
                        crime: '過剰丁寧詐欺',
                        modusOperandi: [
                            '「Beer please」と求めた客に対し',
                            '「Would you most kindly be so as to」',
                            'と2分の前置き。',
                            '結果、客は脱水死寸前',
                        ],
                        traits: [
                            'I\'m sorry to bother you 始まり',
                            'Could you please の連発',
                            '記憶を都合よく消去',
                        ],
                        hideout: 'ホテルのフロント英会話',
                        danger: 3,
                        tagline: '丁寧の3倍は、無礼に近い',
                    }),
                    WANTED_V2_BUBBLE({
                        no: '#003',
                        img: CHAR_IMG('yuki'),
                        name: 'ユキ・28歳',
                        birthplace: 'IT勤務・TOEIC 750',
                        crime: 'クッション語密造販売',
                        modusOperandi: [
                            'I think / maybe / sort of /',
                            'I guess / kind of を1文に5回投与。',
                            '結論を完全に消失させる',
                        ],
                        traits: [
                            '会議で2時間頷くだけ',
                            '上司に「お力ずもう」と発言',
                            'あだ名は「力士」',
                        ],
                        hideout: '外資系企業の Slack',
                        danger: 4,
                        tagline: 'クッション3つで意見は消える',
                    }),
                    WANTED_V2_BUBBLE({
                        no: '#004',
                        img: CHAR_IMG('kenji'),
                        name: '健二・32歳',
                        birthplace: 'TOEIC 600・営業',
                        crime: '日常会話万能錯覚',
                        modusOperandi: [
                            'Hi と Thank you と Sorry',
                            'だけで1日を凌ぐ。',
                            '深い話題を全て笑顔で逃走',
                        ],
                        traits: [
                            '観光客に道を聞かれて指差す',
                            'Yes と No だけで会議突破',
                            '海外出張から帰ると無口',
                        ],
                        hideout: '居酒屋の英語メニュー',
                        danger: 4,
                        tagline: '笑顔をスキルとして装備',
                    }),
                    WANTED_V2_BUBBLE({
                        no: '#005',
                        img: CHAR_IMG('mina'),
                        name: 'ミナ・24歳',
                        birthplace: 'Z世代・SNS中毒',
                        crime: '流行語密輸',
                        modusOperandi: [
                            '教授に対し',
                            '「No cap, that\'s lowkey fire」を連発。',
                            '教授、英語を学び直しを決意',
                        ],
                        traits: [
                            'no cap / slay / bet 多用',
                            '流行語を辞書に逆輸入',
                            'Z世代スラング一斉摘発対象',
                        ],
                        hideout: 'TikTok コメント欄',
                        danger: 3,
                        tagline: 'Z世代スラングは時限爆弾',
                    }),
                ],
            },
        },
    ],
};

// ============================================================
// WANTED v1 — シンプル賞金型
// ============================================================
const WANTED_V1: LineTemplate = {
    id: 'wanted-v1',
    version: 'v1',
    label: 'WANTED 指名手配 (シンプル賞金型)',
    description: '初代。賞金 ¥X,XXX + 致命フレーズの軽量3カード版',
    category: 'wanted',
    messages: [
        {
            type: 'flex',
            altText: 'WANTED #001-003',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble',
                        size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'WANTED', color: '#D4AF37', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '指名手配 #001', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '賞金 ¥5,000', color: '#DC2626', size: 'xl', weight: 'bold' },
                                { type: 'text', text: 'タケシ・35歳', size: 'md', weight: 'bold' },
                                { type: 'text', text: 'TOEIC 800・倉庫マン', size: 'sm', color: '#888888' },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '致命フレーズ', size: 'xs', color: '#888888', margin: 'md' },
                                { type: 'text', text: 'How are you? / Good. And you? のループから抜けられない', size: 'sm', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble',
                        size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'WANTED', color: '#D4AF37', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '指名手配 #002', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '賞金 ¥4,000', color: '#DC2626', size: 'xl', weight: 'bold' },
                                { type: 'text', text: '海道・58歳', size: 'md', weight: 'bold' },
                                { type: 'text', text: '鉄鍋屋・元飛行マン', size: 'sm', color: '#888888' },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '致命フレーズ', size: 'xs', color: '#888888', margin: 'md' },
                                { type: 'text', text: 'Beer please。を死ぬまで言いたい', size: 'sm', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble',
                        size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'WANTED', color: '#D4AF37', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '指名手配 #003', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '賞金 ¥4,500', color: '#DC2626', size: 'xl', weight: 'bold' },
                                { type: 'text', text: 'ユキ・29歳', size: 'md', weight: 'bold' },
                                { type: 'text', text: 'クッション英語OL・渋谷勤務', size: 'sm', color: '#888888' },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '致命フレーズ', size: 'xs', color: '#888888', margin: 'md' },
                                { type: 'text', text: 'I think / maybe / sort of で全部濁す', size: 'sm', wrap: true },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 警視庁・英語事犯対策課 intro (text)
// ============================================================
const KEISHICHO_INTRO: LineTemplate = {
    id: 'keishicho-intro',
    version: 'v1',
    label: '警視庁・英語事犯対策課 intro',
    description: '指名手配通報の前置きテキスト。Carousel と組み合わせる導入',
    category: 'intro',
    messages: [
        {
            type: 'text',
            text: '【警視庁・英語事犯対策課】\n\n指名手配通報\n2026-04-29 23:45\n\n本日、危険度A級の英語事犯\n5名を全国指名手配。\n\n発見次第、最寄りの「正しい英語」交番まで通報されたし。\n\n報奨金: 各事犯につき最大 ¥10,000相当',
        },
    ],
};

// ============================================================
// 5つの死因 Carousel
// ============================================================
const DEATH_CAUSES: LineTemplate = {
    id: 'death-causes',
    version: 'v1',
    label: '5つの死因 Carousel',
    description: 'Fine thank you 死 / How are you 真剣注意死 / I\'m Japanese sorry 死 など',
    category: 'death',
    messages: [
        {
            type: 'flex',
            altText: '英会話 5つの死因',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7F1D1D', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'Fine thank you 死', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('takeshi'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: 'タケシ (TOEIC 800)', size: 'sm', weight: 'bold' },
                                { type: 'text', text: 'How are you? に対し\n「Fine, thank you. And you?」と自動応答\n2秒沈黙', size: 'sm', wrap: true },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '「Pretty good. You?」を学べば\n2秒早く脱出できた', size: 'xs', color: '#DC2626', wrap: true, margin: 'md' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7F1D1D', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'How are you 真剣注意死', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('master'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '権藤 (元商社)', size: 'sm', weight: 'bold' },
                                { type: 'text', text: '「お元気ですか?」を真に受け\n「Well, my back has been...」と腰痛詳述', size: 'sm', wrap: true },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '挨拶 と 質問 の見分けが\n命綱になる', size: 'xs', color: '#DC2626', wrap: true, margin: 'md' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7F1D1D', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'I\'m Japanese sorry 死', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('lisa'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: 'リサ', size: 'sm', weight: 'bold' },
                                { type: 'text', text: '聞き返されたら\n「I\'m Japanese, sorry」で全リセット\n会話の根を絶つ', size: 'sm', wrap: true },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '沈黙より謝罪は重い', size: 'xs', color: '#DC2626', wrap: true, margin: 'md' },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 嘘5選 Carousel ("Let's keep in touch" など)
// ============================================================
const LIES_FIVE: LineTemplate = {
    id: 'lies-five',
    version: 'v1',
    label: '英語の嘘 5選 Carousel',
    description: 'Let\'s keep in touch / I\'ll think about it / Interesting! / No worries / We should hang out',
    category: 'lies',
    messages: [
        {
            type: 'flex',
            altText: '社交辞令で発射される 5つの嘘',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '嘘 #1 ★★★★★', color: '#D4AF37', size: 'sm' },
                                { type: 'text', text: '"Let\'s keep in touch"', color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('lisa'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '翻訳', color: '#888888', size: 'xs' },
                                { type: 'text', text: '「いつか連絡しましょう」', size: 'sm', weight: 'bold', wrap: true },
                                { type: 'text', text: '真意', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: '二度と連絡しない (約束)', size: 'sm', weight: 'bold', wrap: true },
                                { type: 'text', text: '出現率: 高 (LinkedIn上)', size: 'xs', color: '#888888', margin: 'md' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '嘘 #2 ★★★★', color: '#D4AF37', size: 'sm' },
                                { type: 'text', text: '"I\'ll think about it"', color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('master'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '翻訳', color: '#888888', size: 'xs' },
                                { type: 'text', text: '「考えておきます」', size: 'sm', weight: 'bold', wrap: true },
                                { type: 'text', text: '真意', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'No, 即決', size: 'sm', weight: 'bold', wrap: true },
                                { type: 'text', text: '出現率: 高 (会議中)', size: 'xs', color: '#888888', margin: 'md' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '嘘 #3 ★★★', color: '#D4AF37', size: 'sm' },
                                { type: 'text', text: '"Interesting!"', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('mina'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '翻訳', color: '#888888', size: 'xs' },
                                { type: 'text', text: '「興味深い」', size: 'sm', weight: 'bold' },
                                { type: 'text', text: '真意', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: '「全くわからない」', size: 'sm', weight: 'bold' },
                                { type: 'text', text: '出現率: 高 (LinkedIn上)', size: 'xs', color: '#888888', margin: 'md' },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// TOEIC × 現実 Carousel (600/700/800/900)
// ============================================================
const TOEIC_REALITY: LineTemplate = {
    id: 'toeic-reality',
    version: 'v1',
    label: 'TOEIC × 現実 Carousel',
    description: '600/700/800/900 各スコア帯の「思考 vs 現実 → 結論」型',
    category: 'toeic',
    messages: [
        {
            type: 'flex',
            altText: 'TOEIC スコア × 現実',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'xxl',
                            contents: [
                                { type: 'text', text: '600', color: '#ffffff', size: '5xl', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'box', layout: 'horizontal', spacing: 'sm', contents: [
                                    { type: 'image', url: CHAR_IMG('kenji'), size: 'xs', aspectRatio: '1:1', aspectMode: 'cover' },
                                    { type: 'text', text: '健二', size: 'md', weight: 'bold', color: '#7C3AED', flex: 5 },
                                ] },
                                { type: 'text', text: 'TOEIC 600あれば仕事も問題ないっしょ', size: 'sm', color: '#888888', wrap: true },
                                { type: 'text', text: '思考', color: '#888888', size: 'xs', margin: 'md' },
                                { type: 'text', text: '日常会話くらい、いける', size: 'sm', wrap: true },
                                { type: 'text', text: '現実', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'Hi と Thank you と Sorry\nだけで1日凌ぐ', size: 'sm', color: '#DC2626', weight: 'bold', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#fafaf9', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '結論', color: '#888888', size: 'xs' },
                                { type: 'text', text: '観光客に道聞かれて、指差す力', size: 'sm', weight: 'bold', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7F1D1D', paddingAll: 'xxl',
                            contents: [
                                { type: 'text', text: '700', color: '#ffffff', size: '5xl', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'box', layout: 'horizontal', spacing: 'sm', contents: [
                                    { type: 'image', url: CHAR_IMG('yuki'), size: 'xs', aspectRatio: '1:1', aspectMode: 'cover' },
                                    { type: 'text', text: 'ユキ', size: 'md', weight: 'bold', color: '#7C3AED', flex: 5 },
                                ] },
                                { type: 'text', text: 'ぼちぼちなんですよ、英会話', size: 'sm', color: '#888888', wrap: true },
                                { type: 'text', text: '思考', color: '#888888', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'メールも書ける、会議もOK', size: 'sm', wrap: true },
                                { type: 'text', text: '現実', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: '会議では頷きと笑顔で\n2時間生存', size: 'sm', color: '#DC2626', weight: 'bold', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#fafaf9', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '結論', color: '#888888', size: 'xs' },
                                { type: 'text', text: '笑顔をスキルとして装備', size: 'sm', weight: 'bold', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#991B1B', paddingAll: 'xxl',
                            contents: [
                                { type: 'text', text: '800', color: '#ffffff', size: '5xl', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'box', layout: 'horizontal', spacing: 'sm', contents: [
                                    { type: 'image', url: CHAR_IMG('takeshi'), size: 'xs', aspectRatio: '1:1', aspectMode: 'cover' },
                                    { type: 'text', text: 'タケシ', size: 'md', weight: 'bold', color: '#7C3AED', flex: 5 },
                                ] },
                                { type: 'text', text: '受験票に「上級者」と書かれた', size: 'sm', color: '#888888', wrap: true },
                                { type: 'text', text: '思考', color: '#888888', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'ほぼネイティブと対等', size: 'sm', wrap: true },
                                { type: 'text', text: '現実', color: '#DC2626', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'How are you? に\nFine, thank you. And you?', size: 'sm', color: '#DC2626', weight: 'bold', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#fafaf9', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '結論', color: '#888888', size: 'xs' },
                                { type: 'text', text: 'テストの紙の上の英語マスター', size: 'sm', weight: 'bold', wrap: true },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 症候群 Carousel (ano シンドローム / 文法完璧主義症 / お元気ですか直訳脳)
// ============================================================
const SYNDROMES: LineTemplate = {
    id: 'syndromes',
    version: 'v1',
    label: '英会話症候群 Carousel',
    description: 'ano シンドローム 65% / 文法完璧主義症 72% / お元気ですか直訳脳 76%',
    category: 'syndrome',
    messages: [
        {
            type: 'flex',
            altText: '英会話症候群 (致死率付き)',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'horizontal', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '症候群 #1', color: '#888888', size: 'xs', flex: 5 },
                                { type: 'text', text: '致死率 65%', color: '#DC2626', size: 'xs', weight: 'bold', flex: 5, align: 'end' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('kenji'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: 'ano, ano シンドローム', size: 'lg', weight: 'bold', wrap: true },
                                { type: 'text', text: '患者: 健二 (営業)', size: 'xs', color: '#888888' },
                                { type: 'text', text: '症状', color: '#DC2626', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: '一文に「ano」が3回入り、英語の隙間が広がる', size: 'sm', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'horizontal', backgroundColor: '#7F1D1D', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '症候群 #2', color: '#888888', size: 'xs', flex: 5 },
                                { type: 'text', text: '致死率 72%', color: '#fee2e2', size: 'xs', weight: 'bold', flex: 5, align: 'end' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('yuki'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '文法完璧主義症', size: 'lg', weight: 'bold', wrap: true },
                                { type: 'text', text: '患者: ユキ (Z世代)', size: 'xs', color: '#888888' },
                                { type: 'text', text: '症状', color: '#DC2626', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: '頭の中で be 動詞を確認している間に、相手は次の話題へ', size: 'sm', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'horizontal', backgroundColor: '#991B1B', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '症候群 #3', color: '#888888', size: 'xs', flex: 5 },
                                { type: 'text', text: '致死率 76%', color: '#fee2e2', size: 'xs', weight: 'bold', flex: 5, align: 'end' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('master'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: 'お元気ですか直訳脳', size: 'lg', weight: 'bold', wrap: true },
                                { type: 'text', text: '患者: 権藤 (元商社)', size: 'xs', color: '#888888' },
                                { type: 'text', text: '症状', color: '#DC2626', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: 'How are you? を「元気か?」と訳し、腰痛の話を始める', size: 'sm', wrap: true },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 特別診療 (Hospital style)
// ============================================================
const CLINIC_V3: LineTemplate = {
    id: 'clinic-v3',
    version: 'v3',
    label: '特別診療 Vol.3',
    description: '日本人英語クリニック。CASE番号 + 重症度 + 症状 + 治療 + 料金 table 付き',
    category: 'clinic',
    messages: [
        {
            type: 'flex',
            altText: '日本人英語クリニック 特別診療 Vol.3',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '日本人英語クリニック', color: '#D4AF37', size: 'xs' },
                                { type: 'text', text: '特別診療 Vol.3', color: '#ffffff', size: 'xl', weight: 'bold' },
                                { type: 'text', text: '24時間対応 / 初診歓迎', color: '#a8a29e', size: 'xs' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '院長: 権藤 (TOEIC 900)', size: 'sm', weight: 'bold', color: '#7C3AED' },
                                { type: 'text', text: '本日の主な疾患を5つ取り扱う。\n発見次第、迷わず受診を。', size: 'sm', wrap: true },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7F1D1D', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'CASE #001 ★★★', color: '#fee2e2', size: 'xs' },
                                { type: 'text', text: '過剰丁寧症', color: '#ffffff', size: 'lg', weight: 'bold' },
                                { type: 'text', text: 'Excessive Politeness Disorder', color: '#fee2e2', size: 'xs' },
                            ],
                        },
                        hero: { type: 'image', url: CHAR_IMG('master'), aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '主訴 (実録)', color: '#DC2626', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '「Beer please」', size: 'sm', wrap: true },
                                { type: 'text', text: '治療', color: '#DC2626', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: '丁寧度を10%減らす演習を週3回。Beer please の実戦投入', size: 'sm', wrap: true },
                                { type: 'separator', margin: 'md' },
                                { type: 'box', layout: 'horizontal', margin: 'md', contents: [
                                    { type: 'text', text: '期間', color: '#888888', size: 'xs', flex: 3 },
                                    { type: 'text', text: '3週間', size: 'xs', flex: 5 },
                                ] },
                                { type: 'box', layout: 'horizontal', contents: [
                                    { type: 'text', text: '料金', color: '#888888', size: 'xs', flex: 3 },
                                    { type: 'text', text: '¥0 (TOEIC 900)', size: 'xs', flex: 5 },
                                ] },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 英会話保険 5プラン Carousel (居酒屋保険株式会社)
// ============================================================
const INSURANCE_BUBBLE = (data: {
    no: string;
    plan: string;
    monthly: string;
    target: string;
    coverage: string[];
    exclusion: string;
    accent: string; // header background color
}) => ({
    type: 'bubble',
    size: 'kilo',
    header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: data.accent,
        paddingAll: 'lg',
        spacing: 'xs',
        contents: [
            { type: 'text', text: '居酒屋保険株式会社', color: '#cbd5e1', size: 'xs' },
            { type: 'text', text: `プラン #${data.no}`, color: '#ffffff', size: 'xs' },
            { type: 'text', text: data.plan, color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
        ],
    },
    body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
            { type: 'text', text: '月額保険料', color: '#64748b', size: 'xs' },
            { type: 'text', text: data.monthly, color: '#1e3a8a', size: 'xxl', weight: 'bold' },
            { type: 'separator', margin: 'md' },
            { type: 'text', text: '引受対象', color: '#64748b', size: 'xs', margin: 'md' },
            { type: 'text', text: data.target, size: 'sm', wrap: true },
            { type: 'text', text: '補償内容', color: '#64748b', size: 'xs', margin: 'md' },
            ...data.coverage.map(line => ({
                type: 'text', text: `・${line}`, size: 'sm', wrap: true,
            })),
            { type: 'text', text: '免責事項', color: '#dc2626', size: 'xs', margin: 'md' },
            { type: 'text', text: data.exclusion, size: 'xs', color: '#475569', wrap: true },
        ],
    },
    footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#f1f5f9',
        paddingAll: 'md',
        spacing: 'xs',
        contents: [
            { type: 'text', text: '【プレスリリース】居酒屋保険株式会社', color: '#64748b', size: 'xxs', align: 'center' },
            { type: 'text', text: '事故は、明日来る。', color: '#1e3a8a', size: 'xs', weight: 'bold', align: 'center' },
        ],
    },
});

const INSURANCE_FIVE: LineTemplate = {
    id: 'insurance-five',
    version: 'v1',
    label: '英会話保険 5プラン (居酒屋保険株式会社)',
    description: '保険業界パロディ。Fine Thank You 特約 / クッション語慰謝料保険 ほか5プラン',
    category: 'insurance',
    messages: [
        {
            type: 'flex',
            altText: '【プレスリリース】英会話保険 5プラン受付開始',
            contents: {
                type: 'carousel',
                contents: [
                    INSURANCE_BUBBLE({
                        no: '001',
                        plan: 'お元気ですか保険',
                        monthly: '¥3,800 / 月',
                        target: '挨拶を真に受ける58歳以上の元商社マン',
                        coverage: [
                            'How are you? に腰痛で答えてしまった',
                            '元気じゃないのに Fine と言わされた',
                            '聞き返しを「I\'m sorry」で終わらせた',
                        ],
                        exclusion: '本人が元気な日は対象外。',
                        accent: '#1e3a8a',
                    }),
                    INSURANCE_BUBBLE({
                        no: '002',
                        plan: 'Fine Thank You 特約',
                        monthly: '¥2,500 / 月',
                        target: 'TOEIC 800以上で反射神経が暴走する全員',
                        coverage: [
                            'Fine, thank you. And you? を3秒で発射した',
                            '相手の沈黙ダメージ最大10秒分',
                            '「Pretty good」を学べなかった精神的損害',
                        ],
                        exclusion: 'Pretty good 習得後は契約失効。',
                        accent: '#1e40af',
                    }),
                    INSURANCE_BUBBLE({
                        no: '003',
                        plan: 'クッション語慰謝料保険',
                        monthly: '¥4,200 / 月',
                        target: 'IT・外資・OL・I think を5回言う方',
                        coverage: [
                            'I think で意見が消失した会議',
                            'maybe / sort of の連投で結論不明',
                            '上司に「お力ずもう」と発言した',
                        ],
                        exclusion: 'クッション3個以下の発言は補償対象外。',
                        accent: '#1d4ed8',
                    }),
                    INSURANCE_BUBBLE({
                        no: '004',
                        plan: 'Hi Sorry 包括プラン',
                        monthly: '¥1,800 / 月',
                        target: 'Hi / Thank you / Sorry の3語で凌ぐ32歳',
                        coverage: [
                            '観光客に道を聞かれた',
                            'Yes だけで会議突破不可だった日',
                            '海外出張から無口で帰国',
                        ],
                        exclusion: '4語目を覚えた時点で契約強制終了。',
                        accent: '#2563eb',
                    }),
                    INSURANCE_BUBBLE({
                        no: '005',
                        plan: 'Z世代スラング賠償保険',
                        monthly: '¥3,500 / 月',
                        target: 'no cap / slay / bet を多用する24歳以下',
                        coverage: [
                            '教授に対して「lowkey fire」と発言',
                            'スラングが辞書化される前に古びた',
                            'Z世代スラング摘発で書類送検',
                        ],
                        exclusion: '流行が3ヶ月以上続いた時点で対象外。',
                        accent: '#3b82f6',
                    }),
                    {
                        type: 'bubble',
                        size: 'kilo',
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                { type: 'text', text: '無料診断 受付中', color: '#1e3a8a', size: 'lg', weight: 'bold' },
                                { type: 'text', text: 'トーク画面で「whoami」と送れば、あなたの英語事故リスクを判定します。', size: 'sm', wrap: true, margin: 'md' },
                                { type: 'separator', margin: 'lg' },
                                { type: 'text', text: '加入はお早めに。', size: 'sm', color: '#64748b', margin: 'md' },
                                { type: 'text', text: '事故は、明日来る。', size: 'sm', weight: 'bold', color: '#1e3a8a' },
                            ],
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'button',
                                    style: 'primary',
                                    color: '#1e3a8a',
                                    action: { type: 'uri', label: '居酒屋本店へ', uri: 'https://toniolab.com' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// やる気ゼロ診断 Carousel (note 138)
// ============================================================
const MOTIVATION_BUBBLE = (data: {
    patientId: string;
    img: string;
    diagnosis: string;
    diagnosisEn: string;
    symptoms: string[];
    prescription: string;
    verdict: string;
}) => ({
    type: 'bubble',
    size: 'kilo',
    header: {
        type: 'box',
        layout: 'horizontal',
        backgroundColor: '#1c1917',
        paddingAll: 'lg',
        contents: [
            { type: 'text', text: `患者 ID: ${data.patientId}`, color: '#a8a29e', size: 'xs', flex: 5 },
            { type: 'text', text: '診断完了', color: '#10B981', size: 'xs', weight: 'bold', flex: 3, align: 'end' },
        ],
    },
    hero: { type: 'image', url: data.img, aspectRatio: '1:1', aspectMode: 'cover', size: 'full' },
    body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
            { type: 'text', text: '診断名', color: '#888888', size: 'xs' },
            { type: 'text', text: data.diagnosis, size: 'lg', weight: 'bold', wrap: true },
            { type: 'text', text: data.diagnosisEn, size: 'xs', color: '#a8a29e', wrap: true },
            { type: 'separator', margin: 'md' },
            { type: 'text', text: '症状', color: '#DC2626', size: 'xs', weight: 'bold', margin: 'md' },
            ...data.symptoms.map(s => ({
                type: 'text', text: `・${s}`, size: 'sm', wrap: true,
            })),
            { type: 'text', text: '処方', color: '#10B981', size: 'xs', weight: 'bold', margin: 'md' },
            { type: 'text', text: data.prescription, size: 'sm', wrap: true },
        ],
    },
    footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#fafaf9',
        paddingAll: 'lg',
        spacing: 'xs',
        contents: [
            { type: 'text', text: '結論', color: '#888888', size: 'xs' },
            { type: 'text', text: data.verdict, size: 'sm', weight: 'bold', color: '#10B981', wrap: true },
        ],
    },
});

const MOTIVATION_ZERO: LineTemplate = {
    id: 'motivation-zero',
    version: 'v1',
    label: 'やる気ゼロ診断 Carousel',
    description: '賞味期限切れ夢症候群 / 熟年夫婦化 / 歯磨き英語化 の3ケース。「あなたは正常です」結論型',
    category: 'diagnosis',
    messages: [
        {
            type: 'flex',
            altText: 'やる気ゼロ診断 — あなたは正常です',
            contents: {
                type: 'carousel',
                contents: [
                    MOTIVATION_BUBBLE({
                        patientId: 'M-001',
                        img: CHAR_IMG('takeshi'),
                        diagnosis: '賞味期限切れ夢症候群',
                        diagnosisEn: 'Expired Dream Syndrome',
                        symptoms: [
                            '10年前のやる気で動こうとして停止',
                            '「TOEIC 900」「外資転職」が冷蔵庫の奥のヨーグルト化',
                            '歯ブラシ持ったまま5秒固まる',
                        ],
                        prescription: '新しいやる気を絞り出すな。「やる気ゼロ前提アプリ」へ移行せよ。',
                        verdict: 'あなたは正常です',
                    }),
                    MOTIVATION_BUBBLE({
                        patientId: 'M-002',
                        img: CHAR_IMG('master'),
                        diagnosis: '英語熟年夫婦化',
                        diagnosisEn: 'English Long-Married Couple Syndrome',
                        symptoms: [
                            'トキメキはない、別れる理由もない',
                            '毎朝LINEで「おはよう」だけ',
                            '特に会話はない、でも別れない',
                        ],
                        prescription: '関係維持装置 (LINE 朝7時配信) で熟年継続を推奨。離婚は不要。',
                        verdict: 'あなたは正常です',
                    }),
                    MOTIVATION_BUBBLE({
                        patientId: 'M-003',
                        img: CHAR_IMG('yuki'),
                        diagnosis: '歯磨き英語化',
                        diagnosisEn: 'Toothbrush English Disorder',
                        symptoms: [
                            '理由は問わない、毎日3秒だけ触れる',
                            '年間18分、10年で3時間',
                            'TOEIC 900 には絶対ならない',
                        ],
                        prescription: 'やめなくて良い。問うと止まる。問わずに続けよ。',
                        verdict: 'あなたは正常です',
                    }),
                    {
                        type: 'bubble',
                        size: 'kilo',
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                { type: 'text', text: '院長所見', color: '#888888', size: 'xs' },
                                { type: 'text', text: '10年前のやる気で\n10年後を動かすのは無理', size: 'lg', weight: 'bold', wrap: true },
                                { type: 'separator', margin: 'lg' },
                                { type: 'text', text: 'やる気ゼロ用の英語を持つ者は、人生のほとんどを英語と一緒に過ごせる。', size: 'sm', wrap: true, color: '#475569', margin: 'md' },
                                { type: 'text', text: '長距離走者は、やる気ゼロ勢である。', size: 'sm', weight: 'bold', color: '#10B981', wrap: true, margin: 'md' },
                            ],
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'button',
                                    style: 'primary',
                                    color: '#10B981',
                                    action: { type: 'uri', label: 'やる気ゼロ用 LINE 登録', uri: 'https://lin.ee/s1rp3w0' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 営業スキ統計 Carousel (note 131)
// ============================================================
const EIGYO_SUKI_STATS: LineTemplate = {
    id: 'eigyo-suki-stats',
    version: 'v1',
    label: '営業スキ統計 Carousel',
    description: 'note 営業スキ自白の数字パロディ。50% 読まれず / 100ポチ / 営業 vs 純粋 / お前のハートだけは本物',
    category: 'misc',
    messages: [
        {
            type: 'flex',
            altText: '【内部資料】営業スキ統計 4選',
            contents: {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '営業スキ統計 #1', color: '#DC2626', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '読まれず押されたスキ', color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '57%', color: '#DC2626', size: '5xl', weight: 'bold', align: 'center' },
                                { type: 'text', text: 'note のスキの半分以上は、本文を読まずに押されている。', size: 'sm', wrap: true, margin: 'md' },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '出典: 自白した noter 多数', size: 'xs', color: '#888888', margin: 'md' },
                                { type: 'text', text: 'コメントだけは外注できない。', size: 'xs', color: '#475569', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'md',
                            contents: [
                                { type: 'text', text: '【内部資料】営業スキ自白白書', color: '#DC2626', size: 'xxs', align: 'center' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '営業スキ統計 #2', color: '#DC2626', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '今夜の俺のポチ数', color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '100 / 200', color: '#DC2626', size: 'xxl', weight: 'bold', align: 'center' },
                                // progress bar (background)
                                {
                                    type: 'box', layout: 'vertical', backgroundColor: '#27272a', height: '12px', cornerRadius: 'md', margin: 'md',
                                    contents: [
                                        // foreground bar (50%)
                                        {
                                            type: 'box', layout: 'vertical', backgroundColor: '#DC2626', width: '50%', height: '12px', cornerRadius: 'md',
                                            contents: [{ type: 'filler' }],
                                        },
                                    ],
                                },
                                { type: 'text', text: '実測 100ポチで運営ロック発動。プレミアム会員でも12時間休めない。', size: 'sm', wrap: true, margin: 'md' },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '12分で時給 ¥1,000', size: 'xs', color: '#888888', margin: 'md' },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'md',
                            contents: [
                                { type: 'text', text: '【内部資料】良心は毎晩削れる', color: '#DC2626', size: 'xxs', align: 'center' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '営業スキ統計 #3', color: '#DC2626', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '営業スキ vs 純粋スキ', color: '#ffffff', size: 'lg', weight: 'bold', wrap: true },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'md',
                            contents: [
                                // 営業スキ row
                                {
                                    type: 'box', layout: 'vertical', spacing: 'xs',
                                    contents: [
                                        {
                                            type: 'box', layout: 'horizontal',
                                            contents: [
                                                { type: 'text', text: '営業スキ', size: 'xs', color: '#DC2626', weight: 'bold', flex: 4 },
                                                { type: 'text', text: '94%', size: 'xs', color: '#DC2626', weight: 'bold', flex: 2, align: 'end' },
                                            ],
                                        },
                                        {
                                            type: 'box', layout: 'vertical', backgroundColor: '#27272a', height: '10px', cornerRadius: 'md',
                                            contents: [{
                                                type: 'box', layout: 'vertical', backgroundColor: '#DC2626', width: '94%', height: '10px', cornerRadius: 'md',
                                                contents: [{ type: 'filler' }],
                                            }],
                                        },
                                    ],
                                },
                                // 純粋スキ row
                                {
                                    type: 'box', layout: 'vertical', spacing: 'xs',
                                    contents: [
                                        {
                                            type: 'box', layout: 'horizontal',
                                            contents: [
                                                { type: 'text', text: '純粋スキ', size: 'xs', color: '#10B981', weight: 'bold', flex: 4 },
                                                { type: 'text', text: '6%', size: 'xs', color: '#10B981', weight: 'bold', flex: 2, align: 'end' },
                                            ],
                                        },
                                        {
                                            type: 'box', layout: 'vertical', backgroundColor: '#27272a', height: '10px', cornerRadius: 'md',
                                            contents: [{
                                                type: 'box', layout: 'vertical', backgroundColor: '#10B981', width: '6%', height: '10px', cornerRadius: 'md',
                                                contents: [{ type: 'filler' }],
                                            }],
                                        },
                                    ],
                                },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: '内訳: 母3個 / 友人2個 / 通りすがり1個', size: 'xs', color: '#888888', wrap: true, margin: 'md' },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'md',
                            contents: [
                                { type: 'text', text: '【内部資料】通知欄リアル比率', color: '#DC2626', size: 'xxs', align: 'center' },
                            ],
                        },
                    },
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '営業スキ統計 #4', color: '#10B981', size: 'xs', weight: 'bold' },
                                { type: 'text', text: 'お前のハートだけは', color: '#ffffff', size: 'lg', weight: 'bold' },
                                { type: 'text', text: '本物だと信じる', color: '#ffffff', size: 'lg', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '俺は今夜も100人にハートを押した。', size: 'sm', wrap: true },
                                { type: 'text', text: '俺のアカウントには、スキ6個。', size: 'sm', wrap: true },
                                { type: 'text', text: 'うち3個は、母から。', size: 'sm', color: '#DC2626', wrap: true },
                                { type: 'separator', margin: 'md' },
                                { type: 'text', text: 'もし、お前が押してくれるなら、', size: 'sm', wrap: true, margin: 'md' },
                                { type: 'text', text: 'それは、本当だ。', size: 'md', weight: 'bold', color: '#10B981', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'md', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '【内部資料】合掌', color: '#DC2626', size: 'xxs', align: 'center' },
                                {
                                    type: 'button',
                                    style: 'primary',
                                    color: '#10B981',
                                    height: 'sm',
                                    action: { type: 'uri', label: '本物のハートを押す', uri: 'https://toniolab.com' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

// ============================================================
// 確変モード Carousel (note 124-125)
// ============================================================
const KAKUHEN_MODE: LineTemplate = {
    id: 'kakuhen-mode',
    version: 'v1',
    label: '確変モード突入 Carousel',
    description: 'パチスロ確変突入演出 + 今日のひと言 (朝メッセージ次世代型) + 次回予告',
    category: 'kakuhen',
    messages: [
        {
            type: 'flex',
            altText: '確変突入!!! 本日の英語フレーズ配信',
            contents: {
                type: 'carousel',
                contents: [
                    // Bubble 1: 確変突入!!!
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#facc15', paddingAll: 'xxl', spacing: 'sm',
                            contents: [
                                { type: 'text', text: 'CHAIN x10 / GOD MODE', color: '#7c2d12', size: 'xs', weight: 'bold', align: 'center' },
                                { type: 'text', text: '確変突入!!!', color: '#7f1d1d', size: '4xl', weight: 'bold', align: 'center' },
                                { type: 'text', text: '★ ★ ★ ★ ★', color: '#dc2626', size: 'xl', align: 'center' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm', backgroundColor: '#1c1917', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '夜中の遠隔勝利', color: '#facc15', size: 'sm', weight: 'bold' },
                                { type: 'text', text: '英単語10個連続正解で god 連発動。倍率 x3。', color: '#ffffff', size: 'sm', wrap: true },
                                { type: 'separator', margin: 'md', color: '#facc15' },
                                { type: 'text', text: 'BGM 切替', color: '#a3e635', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'メイン音量 0 → FEVER theme 100', color: '#ffffff', size: 'sm', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7f1d1d', paddingAll: 'md',
                            contents: [
                                { type: 'text', text: '※ 英単語アプリです', color: '#fef3c7', size: 'xxs', align: 'center' },
                            ],
                        },
                    },
                    // Bubble 2: 今日のひと言 (new format)
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#7c3aed', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'TODAY\'s ONE-LINER', color: '#fef3c7', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '今日のひと言', color: '#ffffff', size: 'xl', weight: 'bold' },
                                { type: 'text', text: '朝メッセージ・次世代型', color: '#fef3c7', size: 'xs' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'md', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '"Pretty good. You?"', size: 'xxl', weight: 'bold', color: '#7f1d1d', wrap: true, align: 'center' },
                                { type: 'separator', margin: 'lg' },
                                { type: 'text', text: '使用シーン', color: '#888888', size: 'xs', margin: 'md' },
                                { type: 'text', text: 'How are you? に Fine, thank you. And you? と発射する代わりに、これ。', size: 'sm', wrap: true },
                                { type: 'text', text: '効能', color: '#10B981', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: '・沈黙 2秒短縮\n・ネイティブ確率 +40%\n・反射神経の暴走防止', size: 'sm', wrap: true },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#facc15', paddingAll: 'md', spacing: 'xs',
                            contents: [
                                { type: 'text', text: '配信フォーマット v2', color: '#7c2d12', size: 'xxs', align: 'center', weight: 'bold' },
                            ],
                        },
                    },
                    // Bubble 3: 次の確変まで
                    {
                        type: 'bubble', size: 'kilo',
                        header: {
                            type: 'box', layout: 'vertical', backgroundColor: '#dc2626', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: 'NEXT KAKUHEN', color: '#fef3c7', size: 'xs', weight: 'bold' },
                                { type: 'text', text: '次回予告', color: '#ffffff', size: 'xl', weight: 'bold' },
                            ],
                        },
                        body: {
                            type: 'box', layout: 'vertical', spacing: 'sm', paddingAll: 'lg',
                            contents: [
                                { type: 'text', text: '次の確変まで', color: '#888888', size: 'xs' },
                                { type: 'text', text: 'あと 3 日', color: '#dc2626', size: '4xl', weight: 'bold', align: 'center' },
                                { type: 'separator', margin: 'lg' },
                                { type: 'text', text: 'ノーマル中の保証', color: '#7c3aed', size: 'xs', weight: 'bold', margin: 'md' },
                                { type: 'text', text: '※ ノーマル中も損はしません', size: 'sm', wrap: true, weight: 'bold' },
                                { type: 'text', text: '毎朝7時、勝手に届く。開くだけ。', size: 'xs', color: '#475569', wrap: true, margin: 'sm' },
                            ],
                        },
                        footer: {
                            type: 'box', layout: 'vertical', backgroundColor: '#1c1917', paddingAll: 'md', spacing: 'sm',
                            contents: [
                                { type: 'text', text: '居酒屋TOEIC ホール', color: '#facc15', size: 'xxs', align: 'center' },
                                {
                                    type: 'button',
                                    style: 'primary',
                                    color: '#dc2626',
                                    height: 'sm',
                                    action: { type: 'uri', label: 'ホールに入店', uri: 'https://toniolab.com' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
};

export const LINE_TEMPLATES: LineTemplate[] = [
    WANTED_V2,
    WANTED_V1,
    KEISHICHO_INTRO,
    DEATH_CAUSES,
    LIES_FIVE,
    TOEIC_REALITY,
    SYNDROMES,
    CLINIC_V3,
    INSURANCE_FIVE,
    MOTIVATION_ZERO,
    EIGYO_SUKI_STATS,
    KAKUHEN_MODE,
];

export function getTemplate(id: string): LineTemplate | undefined {
    return LINE_TEMPLATES.find(t => t.id === id);
}
