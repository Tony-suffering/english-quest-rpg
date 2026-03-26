/**
 * 365 English Master -- Expression Data
 *
 * Format: Japanese → 4-level English (Core / Vibe / Scene / Flow)
 * Each day = 10 expressions tied to a story scene at the izakaya
 * Monthly calendar cycle for spaced repetition
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 * Categories cycle through functional areas every 7 days
 *
 * Content standard: "本当に覚える価値のある例文だけ"
 * - Daily conversation and travel essentials only
 * - Nothing unnecessarily difficult
 * - Context field = the product core (linguistic insight, cultural gap, humor)
 */

import { WEEK2_EXPRESSIONS, WEEK2_DAY_THEMES } from './master-expressions-w2';
import { WEEK3_EXPRESSIONS, WEEK3_DAY_THEMES } from './master-expressions-w3';
import { WEEK4_EXPRESSIONS, WEEK4_DAY_THEMES } from './master-expressions-w4';
import { MONTH2_W5_EXPRESSIONS, MONTH2_W5_DAY_THEMES } from './master-expressions-m2-w5';
import { MONTH2_W6_EXPRESSIONS, MONTH2_W6_DAY_THEMES } from './master-expressions-m2-w6';
import { MONTH2_W7_EXPRESSIONS, MONTH2_W7_DAY_THEMES } from './master-expressions-m2-w7';
import { MONTH2_W8_EXPRESSIONS, MONTH2_W8_DAY_THEMES } from './master-expressions-m2-w8';
import { MONTH3_W9_EXPRESSIONS, MONTH3_W9_DAY_THEMES } from './master-expressions-m3-w9';
import { MONTH3_W10_EXPRESSIONS, MONTH3_W10_DAY_THEMES } from './master-expressions-m3-w10';
import { MONTH3_W11_EXPRESSIONS, MONTH3_W11_DAY_THEMES } from './master-expressions-m3-w11';
import { MONTH3_W12_EXPRESSIONS, MONTH3_W12_DAY_THEMES } from './master-expressions-m3-w12';

// ============================================================
// TYPES
// ============================================================

export interface MasterExpression {
    daySlot: number;
    japanese: string;
    english: [string, string, string, string]; // [core, vibe, scene, flow]
    context: string;
    character: 'yuki' | 'master' | 'takeshi' | 'lisa' | 'kenji' | 'mina';
    category: 'greeting' | 'order' | 'shopping' | 'travel' | 'feeling' | 'request' | 'social';
    month: string;
}

// ============================================================
// CATEGORY META
// ============================================================

export const MASTER_CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
    greeting:  { label: '挨拶',   color: '#B45309', bg: '#FFFBEB' },
    order:     { label: '注文',   color: '#059669', bg: '#ECFDF5' },
    shopping:  { label: '買い物', color: '#2563EB', bg: '#EFF6FF' },
    travel:    { label: '移動',   color: '#7C3AED', bg: '#F5F3FF' },
    feeling:   { label: '気持ち', color: '#D97706', bg: '#FFF7ED' },
    request:   { label: 'お願い', color: '#DB2777', bg: '#FDF2F8' },
    social:    { label: '雑談',   color: '#0891B2', bg: '#ECFEFF' },
};

// ============================================================
// 4-LEVEL SYSTEM
// ============================================================

export const MASTER_LEVELS = [
    { key: 'core',  label: 'Core',  ja: '核',   desc: '最短の型',         color: '#78716C' },
    { key: 'vibe',  label: 'Vibe',  ja: '空気', desc: '感情込み',         color: '#D4AF37' },
    { key: 'scene', label: 'Scene', ja: '場面', desc: '実際の一言',       color: '#10B981' },
    { key: 'flow',  label: 'Flow',  ja: '流れ', desc: 'ネイティブの脳内', color: '#3B82F6' },
] as const;

// ============================================================
// WEEK / MONTH METADATA
// ============================================================

export interface WeekMeta {
    week: number;
    title: string;
    titleEn: string;
    days: number[];
    scene: string;
}

export interface MonthMeta {
    month: number;
    key: string;
    title: string;
    titleEn: string;
    totalExpressions: number;
}

export const MASTER_WEEKS: WeekMeta[] = [
    {
        week: 1,
        title: 'はじめの一歩',
        titleEn: 'First Steps',
        days: [1, 2, 3, 4, 5, 6, 7],
        scene: 'ユキが初めて権藤マスターの居酒屋を訪れ、仲間と出会い、英語への一歩を踏み出す1週間',
    },
    {
        week: 2,
        title: '慣れてきた',
        titleEn: 'Getting Comfortable',
        days: [8, 9, 10, 11, 12, 13, 14],
        scene: '居酒屋の常連になったユキたち。カフェ、ホテル、ドラッグストア。日常の場面で英語を使い始める2週目',
    },
    {
        week: 3,
        title: '困った！',
        titleEn: 'Trouble!',
        days: [15, 16, 17, 18, 19, 20, 21],
        scene: '遅刻、クレーム、返品、緊急事態。トラブルを英語で乗り切る3週目。ピンチが一番伸びる',
    },
    {
        week: 4,
        title: '自分を出す',
        titleEn: 'Being Yourself',
        days: [22, 23, 24, 25, 26, 27, 28, 29, 30],
        scene: '褒める、夢を語る、思い出を話す。英語で自分を表現する4週目。そして卒業の夜',
    },
    {
        week: 5,
        title: '毎日の英語',
        titleEn: 'Everyday English',
        days: [31, 32, 33, 34, 35, 36, 37],
        scene: '朝の挨拶から仕事、ランチ、天気、予定、体調、趣味。日常を英語で回す5週目',
    },
    {
        week: 6,
        title: '暮らしの英語',
        titleEn: 'Life in English',
        days: [38, 39, 40, 41, 42, 43, 44],
        scene: '家のこと、テクノロジー、意見、約束、電話、道案内、週末。生活の英語を完成させる6週目',
    },
    {
        week: 7,
        title: '社会とつながる',
        titleEn: 'Connecting with Society',
        days: [45, 46, 47, 48, 49, 50, 51],
        scene: 'ニュース、お金、健康、環境、文化、教育、ボランティア。社会の話題を英語で語る7週目',
    },
    {
        week: 8,
        title: '自分の世界を広げる',
        titleEn: 'Expanding Your World',
        days: [52, 53, 54, 55, 56, 57, 58, 59, 60],
        scene: '旅行計画、異文化理解、将来の夢、仕事の英語、SNS、エンタメ、料理、スポーツ、Month 2卒業。世界が広がる8週目',
    },
    {
        week: 9,
        title: '紹介と第一印象',
        titleEn: 'Introductions & First Impressions',
        days: [61, 62, 63, 64, 65, 66, 67],
        scene: 'ユキが居酒屋に外国人の同僚を連れてくる。人を紹介し、第一印象を語り、人物を描写する9週目',
    },
    {
        week: 10,
        title: '職場の人間関係',
        titleEn: 'Workplace Relationships',
        days: [68, 69, 70, 71, 72, 73, 74],
        scene: '外国人上司、英語の会議、ビジネスメール、電話対応。仕事の英語に立ち向かう10週目',
    },
    {
        week: 11,
        title: '気持ちを伝える',
        titleEn: 'Expressing Feelings',
        days: [75, 76, 77, 78, 79, 80, 81],
        scene: '感謝、謝罪、励まし、断り、愚痴、共感、怒り。感情を英語で伝える11週目',
    },
    {
        week: 12,
        title: '人との距離感',
        titleEn: 'Social Distance',
        days: [82, 83, 84, 85, 86, 87, 88, 89, 90],
        scene: '誘い方、約束、噂話、お世辞、別れ際、SNS、人間関係の総復習。Month 3卒業の12週目',
    },
];

export const MASTER_MONTHS: MonthMeta[] = [
    {
        month: 1,
        key: '2026-04',
        title: 'サバイバル英語',
        titleEn: 'Survival English',
        totalExpressions: 300,
    },
    {
        month: 2,
        key: '2026-05',
        title: '日常生活',
        titleEn: 'Daily Life',
        totalExpressions: 300,
    },
    {
        month: 3,
        key: '2026-06',
        title: '人間関係の英語',
        titleEn: 'Talking About People',
        totalExpressions: 300,
    },
];

// ============================================================
// DAY THEMES
// ============================================================

// ============================================================
// KEY WORD TYPE
// ============================================================

export interface KeyWord {
    en: string;
    ja: string;
    pron: string;        // カタカナ読み
    example: string;     // 今日の表現から抽出した例文
    note: string;        // 一言メモ（日本語との違い、覚え方のコツ）
}

const WEEK1_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    1: {
        title: 'はじめまして', titleEn: 'Meeting People', category: 'greeting',
        scene: 'ユキが居酒屋で権藤マスターと初対面。常連たちとの出会い。',
        keywords: [
            { en: 'meet', ja: '会う', pron: 'ミート', example: 'Nice to meet you!', note: '「会う」だけじゃなく「初対面」の挨拶にも使う。meatと同じ発音。' },
            { en: 'place', ja: '場所・店', pron: 'プレイス', example: 'This place is great.', note: '店・場所・空間すべてplace。shopよりずっと自然。' },
            { en: 'recommend', ja: 'おすすめする', pron: 'レコメンド', example: 'What do you recommend?', note: 'フォーマル寄り。カジュアルならWhat is good here?で十分。' },
            { en: 'understand', ja: 'わかる', pron: 'アンダスタンド', example: 'I understand.', note: '共感にはI know, right?のほうが温かい。understandは少し他人事。' },
            { en: 'vibe', ja: '雰囲気', pron: 'ヴァイブ', example: 'I love the vibe in here.', note: '最近の英語で超頻出。atmosphereより圧倒的にカジュアル。' },
        ],
    },
    2: {
        title: '注文する', titleEn: 'Ordering', category: 'order',
        scene: '居酒屋で英語メニューに挑戦。タケシが暴走する注文シーン。',
        keywords: [
            { en: 'check', ja: '会計・伝票', pron: 'チェック', example: 'Can I get the check?', note: 'アメリカ=check、イギリス=bill。日本語の「チェック」は確認の意味が強いけど英語は会計も。' },
            { en: 'spicy', ja: '辛い', pron: 'スパイシー', example: 'Is this spicy?', note: '英語圏のspicyは日本人の辛さ基準より低め。mild/medium/hotで聞くと正確。' },
            { en: 'allergy', ja: 'アレルギー', pron: 'アラジー', example: 'I have a food allergy.', note: '発音注意！「アレルギー」じゃない。アラジー。旅行で命を守る単語。' },
            { en: 'leftovers', ja: '残り物', pron: 'レフトオーバーズ', example: 'Can I get a box for the leftovers?', note: '持ち帰り=to go。残り物=leftovers。doggy bagは古い言い方。' },
            { en: 'amazing', ja: 'すごい', pron: 'アメイジング', example: 'That was amazing.', note: 'good<great<amazing<incredible の順。日本語の「すごい」はamazingが一番近い。' },
        ],
    },
    3: {
        title: '買い物する', titleEn: 'Shopping', category: 'shopping',
        scene: 'ユキがコンビニで外国人観光客に話しかけられる。',
        keywords: [
            { en: 'fit', ja: 'サイズが合う', pron: 'フィット', example: 'This does not fit me.', note: '服のサイズが合う=fit。日本語の「フィットする」より英語のfitは日常的に使う。' },
            { en: 'discount', ja: '割引', pron: 'ディスカウント', example: 'Any chance of a discount?', note: 'Any chance of...? で聞くと柔らかい。海外のマーケットやフリマで必須。' },
            { en: 'wrap', ja: '包む', pron: 'ラップ', example: 'Can you gift wrap this?', note: 'gift wrap=プレゼント包装。日本のデパートの無料ラッピングは世界的に珍しい。' },
            { en: 'browse', ja: '見て回る', pron: 'ブラウズ', example: 'I am just browsing.', note: 'Just looking. と同じ。ネットの「ブラウザ」と同じ語源。店員撃退フレーズ。' },
            { en: 'budget', ja: '予算', pron: 'バジェット', example: 'It is a little over my budget.', note: '旅行でもビジネスでも使う。on a budget=予算内で、over budget=予算オーバー。' },
        ],
    },
    4: {
        title: '移動する', titleEn: 'Getting Around', category: 'travel',
        scene: 'タケシが駅で道を聞かれてパニック。リサが助ける。',
        keywords: [
            { en: 'transfer', ja: '乗り換え', pron: 'トランスファー', example: 'Where do I transfer?', note: 'change trains と同じ。transferは1語で済むので便利。' },
            { en: 'lost', ja: '迷った', pron: 'ロスト', example: 'I am lost.', note: '3語で完結する最強SOS。恥ずかしがらずに言えるかが英語力より大事。' },
            { en: 'platform', ja: 'ホーム', pron: 'プラットフォーム', example: 'Is this the right platform?', note: '日本語の「ホーム」は和製英語。英語はplatform。homeは家。' },
            { en: 'distance', ja: '距離', pron: 'ディスタンス', example: 'Is it walking distance?', note: 'walking distance=歩ける距離。How far? は距離、How long? は時間。使い分け重要。' },
            { en: 'familiar', ja: '見覚えがある', pron: 'ファミリア', example: 'Nothing looks familiar.', note: 'familyと同じ語源。馴染みがある=familiar。道に迷ったとき使える。' },
        ],
    },
    5: {
        title: '気持ちを伝える', titleEn: 'Expressing Feelings', category: 'feeling',
        scene: '居酒屋で全員が英語学習の本音を語る夜。',
        keywords: [
            { en: 'exhausted', ja: 'へとへと', pron: 'イグゾーステッド', example: 'I am exhausted.', note: 'tired<beat<exhausted<dead の順。exhaustedはtiredの3倍疲れてる感じ。' },
            { en: 'relief', ja: '安心', pron: 'リリーフ', example: 'What a relief.', note: '野球のリリーフと同じ。安心感・ほっとした感覚。relievedが形容詞形。' },
            { en: 'confident', ja: '自信がある', pron: 'コンフィデント', example: 'I am not feeling confident.', note: '英語学習者が最も必要な単語の1つ。自信=confidence、自信がある=confident。' },
            { en: 'frustrated', ja: 'イライラ', pron: 'フラストレイテッド', example: 'It is so frustrating.', note: '怒りより「思い通りにいかない苛立ち」。英語が出てこないときまさにこの感覚。' },
            { en: 'shift', ja: '変わる', pron: 'シフト', example: 'Something just shifted.', note: 'changeより微妙な変化。気持ちや状況が少し動いた感じ。日本語の「シフト」より広い。' },
        ],
    },
    6: {
        title: '頼む・断る', titleEn: 'Requests and Declining', category: 'request',
        scene: 'リサが丁寧な頼み方と断り方を実演する。',
        keywords: [
            { en: 'favor', ja: 'お願い', pron: 'フェイバー', example: 'I have a favor to ask.', note: 'do someone a favor=お願いを聞く。favoriteと同じ語源。' },
            { en: 'pass', ja: '遠慮する', pron: 'パス', example: 'I am going to have to pass.', note: '日本語の「パスする」と同じ。断るときの柔らかい言い方。' },
            { en: 'bother', ja: '邪魔する', pron: 'ボザー', example: 'Sorry to bother you.', note: '「お忙しいところすみません」に相当。頼む前のクッション言葉として最重要。' },
            { en: 'handle', ja: '対処する', pron: 'ハンドル', example: 'I will handle it.', note: '車のハンドルと同じ語源。状況を「操る=対処する」。I got this. と同義。' },
            { en: 'swing', ja: 'なんとかする', pron: 'スウィング', example: 'I just cannot swing it.', note: 'カジュアルな「都合をつける」。swing=振る→なんとかやりくりする。スラング的。' },
        ],
    },
    7: {
        title: '雑談する', titleEn: 'Small Talk', category: 'social',
        scene: '週末の居酒屋。全員で英語雑談に初挑戦。',
        keywords: [
            { en: 'hobby', ja: '趣味', pron: 'ホビー', example: 'What are you into?', note: 'hobbyは意外と堅い言葉。What are you into? のほうが自然。interests も良い。' },
            { en: 'common', ja: '共通の', pron: 'コモン', example: 'We have so much in common!', note: 'have in common=共通点がある。common=「普通の」だけじゃなく「共通の」の意味も大事。' },
            { en: 'exchange', ja: '交換する', pron: 'イクスチェンジ', example: 'Want to exchange numbers?', note: '情報や連絡先を交換する。exchange student=交換留学生。' },
            { en: 'typical', ja: '典型的な', pron: 'ティピカル', example: 'What is a typical day for you?', note: 'a typical day=普通の一日。日本語の「典型的」より日常的に使う。' },
            { en: 'touch', ja: '連絡', pron: 'タッチ', example: 'Let us stay in touch.', note: 'stay in touch=連絡を取り合う。keep in touch も同じ。別れ際の定番。' },
        ],
    },
};

export const MASTER_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    ...WEEK1_DAY_THEMES,
    ...WEEK2_DAY_THEMES,
    ...WEEK3_DAY_THEMES,
    ...WEEK4_DAY_THEMES,
    ...MONTH2_W5_DAY_THEMES,
    ...MONTH2_W6_DAY_THEMES,
    ...MONTH2_W7_DAY_THEMES,
    ...MONTH2_W8_DAY_THEMES,
    ...MONTH3_W9_DAY_THEMES,
    ...MONTH3_W10_DAY_THEMES,
    ...MONTH3_W11_DAY_THEMES,
    ...MONTH3_W12_DAY_THEMES,
};

// ============================================================
// MILESTONE DEFINITIONS
// ============================================================

export interface Milestone {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    threshold: number; // number of expressions mastered
    icon: string; // text icon
}

export const MILESTONES: Milestone[] = [
    { id: 'week1', title: '最初の一歩', titleEn: 'First Steps', description: '1週間分(70表現)をマスター', threshold: 70, icon: '1W' },
    { id: 'month1', title: 'サバイバル達成', titleEn: 'Survival Complete', description: '1ヶ月分(310表現)をマスター', threshold: 310, icon: '1M' },
    { id: 'month6', title: '日常会話の壁を越えた', titleEn: 'Conversational', description: '半年分(1860表現)をマスター', threshold: 1860, icon: '6M' },
    { id: 'year1', title: '365日完走', titleEn: 'Master', description: '1年分(3650表現)を完走', threshold: 3650, icon: '1Y' },
];

// ============================================================
// EXPRESSIONS -- MONTH 1 (2026-04) -- WEEK 1
// ============================================================

export const MASTER_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 1: はじめまして (Meeting People)
    // Scene: ユキが居酒屋で権藤マスターと初対面
    // ────────────────────────────────────────────────────

    {
        daySlot: 1, japanese: 'はじめまして',
        english: [
            'Nice to meet you.',
            'Hey, nice to meet you!',
            'Nice to meet you — I have heard a lot about this place.',
            "Nice to meet you. I mean, I have been meaning to come here forever and I just never... anyway, here I am.",
        ],
        context: '日本語は「初めまして」一択。英語はNice to meet youが基本だけど、その後に一言足すのが自然。「初めまして」で終わる日本語と、何か付け加える英語の差。この一言の追加が英語の「距離の詰め方」。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'よろしくお願いします',
        english: [
            'Thank you.',
            'Looking forward to it.',
            "I am looking forward to getting to know this place.",
            "Yeah, looking forward to it. Honestly I do not know anyone here yet so... nice to have a friendly face.",
        ],
        context: '英語に「よろしくお願いします」の直訳はない。状況で全く違う英語になる。初対面ならLooking forward to it、仕事ならThank you for your help、カジュアルならThanks! 日本語1語 vs 英語は状況別。これが英語の面倒くささであり面白さ。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'お名前は？',
        english: [
            'What is your name?',
            "What's your name?",
            "Sorry, I did not catch your name.",
            "Sorry, what was your name again? I am terrible with names, do not take it personally.",
        ],
        context: 'What is your name? は直球すぎてやや取り調べっぽい。I did not catch your name が自然で柔らかい。「聞き逃した」というフリをすることで相手のメンツを保つ英語の礼儀作法。日本語の「お名前は？」の丁寧さに近い。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'ここ、いい店ですね',
        english: [
            'This is a nice place.',
            'This place is great.',
            'I love the vibe in here.',
            "This place is really something. It has got that cozy neighborhood feel. I like it.",
        ],
        context: '「いい店」を"good shop"と訳すと変。placeが万能選手。vibeは「雰囲気」に最も近い英語。英語は具体的に何がいいか言う(cozy, quiet, the vibe)。日本語は「いい」で全部カバーできる。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: '何がおすすめですか？',
        english: [
            'What do you recommend?',
            "What is good here?",
            "What should I get? What is your go-to?",
            "So what is good here? Like, is there something I absolutely have to try? I trust your judgment.",
        ],
        context: 'recommendは正しいけど硬い。What is good here? が居酒屋の空気にぴったり。go-to=定番、いつも頼むやつ。日本語の「おすすめ」は万能だけど英語は聞き方の距離感で変わる。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'とりあえずビール',
        english: [
            'Beer, please.',
            "I will start with a beer.",
            "Let me get a beer to start. Whatever you have got on tap.",
            "Beer first. Yeah, just a beer. I need to unwind before I can even think about food.",
        ],
        context: '「とりあえず」は英語に直訳できない日本語の代表格。to start, for now が近いけど「深く考えずにまずこれ」感は英語にない。I will start with... が最も自然な訳。日本語の「とりあえず文化」は英語圏にはない概念。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: '仕事帰りですか？',
        english: [
            'Did you just finish work?',
            'Coming from work?',
            'Long day? You look like you just got off work.',
            "You just get off work? Yeah, me too. It was one of those days, you know?",
        ],
        context: 'Coming from work? が一番軽い。You look like... は見た目から推測する言い方で「疲れてるね」を直接言わずに済む英語のテクニック。日本語の「仕事帰り？」はストレートな質問だけど英語は回りくどくするほうが親しみが出る。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'ちょっと聞いてよ',
        english: [
            'Listen to this.',
            'You have got to hear this.',
            "So get this — you are not going to believe what happened today.",
            "OK so listen. You know how I said my job was fine? Yeah, that was a lie. Let me tell you what happened.",
        ],
        context: '「ちょっと聞いてよ」は愚痴の前振り。英語はYou have got to hear this, Get this と盛る。日本語の「ちょっと」は軽く見せるクッション。英語は逆に大げさにするほうが「聞いて」感が出る。アプローチが真逆。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'わかるわかる',
        english: [
            'I understand.',
            'I know, right?',
            'Oh totally, I have been there.',
            "Oh man, I know exactly what you mean. That happened to me last week actually.",
        ],
        context: 'I understand は正しいけど他人事に聞こえる。共感を示すならI know, right? やI have been there（経験ある）が100倍いい。「わかる」の温度を英語で出すにはI have been there が最強。距離ゼロの共感。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 1, japanese: 'また来ます',
        english: [
            'I will come again.',
            "I will be back.",
            "I will definitely be back. This place is going on my regular list.",
            "I am coming back. For sure. Like, this might be my new spot. You are stuck with me now.",
        ],
        context: 'I will come again は文法的に正しいけどロボットっぽい。I will be back が圧倒的に自然。ターミネーターと同じセリフ。日本語の「また来ます」の軽さをI will be backで完璧に出せる稀有な一致。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 2: 注文する (Ordering)
    // Scene: 居酒屋で英語メニューに挑戦
    // ────────────────────────────────────────────────────

    {
        daySlot: 2, japanese: 'すみません',
        english: [
            'Excuse me.',
            'Excuse me!',
            'Hey, excuse me — when you get a chance?',
            "Excuse me, sorry to bother you, but could I get... actually, give me one second, I am still deciding.",
        ],
        context: '「すみません」は謝罪にも呼びかけにも使える日本語最強の万能語。英語は場面で完全に分かれる。呼びかけ=Excuse me、謝罪=Sorry、感謝=Thank you。日本語1つ vs 英語3つ。これが英語の最初の壁。',
        character: 'yuki', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'これください',
        english: [
            'This, please.',
            "I will have this.",
            "Can I get this one? Yeah, this right here.",
            "I will go with this. Actually, you know what, let me get two. My friend is going to want one too.",
        ],
        context: 'This please でも通じるけど、I will have this がレストランの定番。Can I get... はカジュアル。I will go with... は「これにする」の決定感。メニューを指差しながらthis one, this right hereと言えば英語力ゼロでも注文できる。',
        character: 'takeshi', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'メニュー見せてもらえますか',
        english: [
            'Can I see the menu?',
            'Could I take a look at the menu?',
            "Do you have a menu? I did not see one on the table.",
            "Hey, is there a menu somewhere? Or do you guys just do, like, specials? Either way works for me.",
        ],
        context: 'Can I see...? とCould I...? の差は丁寧さだけ。どっちも使える。居酒屋でメニューがない場合 What do you have? も自然。英語圏ではメニューがない店も多いので Do you have a menu? が実は一番実用的。',
        character: 'yuki', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'お会計お願いします',
        english: [
            'Check, please.',
            'Can I get the check?',
            "We are ready for the check whenever you are.",
            "I think we are good. Can we get the check? No rush, take your time.",
        ],
        context: 'アメリカはcheck、イギリスはbill。日本の「お会計」は店員に声をかけるけど、英語圏ではテーブル会計が基本。Whenever you are, No rush は「急がなくていい」の気遣い。日本語の「お願いします」の丁寧さに相当。',
        character: 'lisa', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'おいしい！',
        english: [
            'Delicious!',
            'This is so good!',
            "Oh wow, this is incredible. What is in this?",
            "OK I was not expecting this to be this good. Like, seriously. What is this sauce? I need the recipe.",
        ],
        context: 'Delicious は少しフォーマル。普段はThis is so good! やThis is amazing! が自然。英語は感想に理由を足す（What is in this? この味何？）。日本語の「おいしい！」の一言完結 vs 英語の「なぜおいしいか言語化する」文化差。',
        character: 'mina', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'もう一杯ください',
        english: [
            'One more, please.',
            'Can I get another one?',
            "Same again, please. Actually, make it two — one for my friend.",
            "You know what, hit me with another one. This is turning into that kind of night.",
        ],
        context: 'Same again が「同じやつもう一杯」の最短距離。Hit me with another one はカジュアルで居酒屋向き。日本語は「もう一杯」で済むけど英語は same again? another one? different this time? と選択肢を示すことが多い。',
        character: 'takeshi', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: '辛いですか？',
        english: [
            'Is this spicy?',
            'Is this spicy at all?',
            "How spicy is this? Like, on a scale of one to ten?",
            "Hey, quick question — is this going to burn my face off? I am asking because last time I ordered something spicy here I almost died.",
        ],
        context: 'at all を付けると「少しでも辛い？」のニュアンス。on a scale of one to ten は辛さレベルを聞く定番。英語圏の「spicy」は日本人の辛い基準より低いことが多い。mild/medium/hot のレベル感を知っておくと便利。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'アレルギーがあるんですが',
        english: [
            'I have an allergy.',
            'I have a food allergy, actually.',
            "Just a heads up, I am allergic to shellfish. Is that in any of these?",
            "So I should probably mention this before I order — I have got a shellfish allergy. Nothing crazy, but I would rather not find out the hard way.",
        ],
        context: 'Just a heads up は「事前にお知らせ」の自然な前置き。I would rather not find out the hard way=「痛い目に遭いたくない」。アレルギーは命に関わるので英語で確実に伝える価値がある表現。旅行で一番使う実用フレーズ。',
        character: 'lisa', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: '持ち帰りできますか',
        english: [
            'Can I take this home?',
            'Can I get this to go?',
            "Is it OK if I get a box for the leftovers?",
            "I am not going to be able to finish all this. Can I take the rest home? It would be a crime to waste it.",
        ],
        context: 'to go がアメリカ英語の定番（for here or to go? はファストフードの決まり文句）。イギリスは takeaway。doggy bag は古い言い方。leftovers=残り物。日本語の「お持ち帰り」ほど丁寧な響きは英語にはない。',
        character: 'mina', category: 'order', month: '2026-04',
    },
    {
        daySlot: 2, japanese: 'ごちそうさまでした',
        english: [
            'Thank you for the meal.',
            'Everything was great, thank you.',
            "That was amazing. Compliments to the chef.",
            "Honestly, best meal I have had in a while. You guys are seriously underrated. I will be telling everyone about this place.",
        ],
        context: '「ごちそうさまでした」の直訳は英語にない。Thank you for the mealは直訳だけど不自然。Everything was great が最も自然な「ごちそうさま」。Compliments to the chef は料理人への賛辞。英語は「何が良かったか」を具体的に褒める。',
        character: 'yuki', category: 'order', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 3: 買い物する (Shopping)
    // Scene: コンビニで外国人観光客に話しかけられる
    // ────────────────────────────────────────────────────

    {
        daySlot: 3, japanese: 'いくらですか？',
        english: [
            'How much is this?',
            'How much?',
            "How much is this one? And do you have anything similar but cheaper?",
            "So how much are we looking at here? I am trying to stay within budget but this is really tempting.",
        ],
        context: 'How much? だけでも通じる。How much is this? が丁寧版。How much are we looking at? は「いくらくらい？」のカジュアル版。日本語の「いくら？」と同じくらい短くていい。英語も短いほうが自然。',
        character: 'takeshi', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: 'ちょっと見てるだけです',
        english: [
            'Just looking.',
            'Just looking, thanks.',
            "I am just browsing, but I will let you know if I need anything.",
            "Just looking for now, thanks. I mean, I always say that and then I end up buying everything, but... yeah, just looking.",
        ],
        context: 'Just looking は世界共通の店員撃退フレーズ。英語圏の店員は積極的に話しかけてくるので必須。but I will let you know は「何かあったら声かけます」の上級テクニック。日本語の「見てるだけです」より圧倒的に使用頻度が高い。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: 'これ、ありますか？',
        english: [
            'Do you have this?',
            'Do you carry this?',
            "I am looking for something like this. Do you have anything similar?",
            "So I saw this online and I was wondering if you had it in store? Or something close to it? I am flexible.",
        ],
        context: 'Do you have...? が基本。carry は「取り扱っている」のニュアンス（Do you carry organic coffee?）。something similar は「似たやつ」で、探しているものがなかったときの次の一手。日本語の「ありますか」は1語だけど英語は状況で変わる。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: '試着してもいいですか',
        english: [
            'Can I try this on?',
            'Mind if I try this on?',
            "Can I try this on? Where is the fitting room?",
            "Would it be OK if I tried this on? I never trust sizes anymore — every brand is different.",
        ],
        context: 'try on は「試着する」の句動詞。Mind if I...? は「迷惑じゃない？」の丁寧な聞き方。fitting room=試着室（changing room はイギリス英語）。日本語の「試着」は1語だけど英語は try + on の2語セットで覚える。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: 'サイズが合わない',
        english: [
            "It does not fit.",
            "This does not fit me.",
            "This is a bit too tight. Do you have the next size up?",
            "Yeah, this is not going to work. It is either too tight here or too loose there. Story of my life with clothes shopping.",
        ],
        context: 'fit は「サイズが合う」。too tight=きつい、too loose=ゆるい。next size up=ワンサイズ上。日本語の「合わない」は曖昧だけど英語は何が合わないか具体的に言う（tight/loose/long/short）。これが英語の「具体性」。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: '色違いはありますか',
        english: [
            'Do you have a different color?',
            'Does this come in other colors?',
            "I love the design but I am not sure about the color. Do you have this in black?",
            "This is perfect except for the color. Please tell me you have it in black. Or navy. I would even take dark gray at this point.",
        ],
        context: 'Does this come in...? は「これ、～バージョンある？」の定番。色だけでなく素材やサイズにも使える万能フレーズ(Does this come in leather?)。日本語の「色違い」は便利な1語だけど英語は every time 文で聞く。',
        character: 'lisa', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: '安くなりませんか',
        english: [
            'Any discount?',
            'Any chance of a discount?',
            "Is there any room on the price? I am buying a few things.",
            "Look, I really want this, but it is a little over my budget. Any chance you could work with me on the price?",
        ],
        context: 'Any chance of...? は「可能性ある？」の柔らかい聞き方。work with me on the price は「値段を相談できる？」。英語圏でも値切り交渉はある（フリマ、小さい店、海外旅行）。room on the price=「値段に余地がある」。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: 'カードで払えますか',
        english: [
            'Can I pay by card?',
            'Do you take cards?',
            "Do you take credit cards? Or is it cash only?",
            "Please tell me you take cards. I never carry cash anymore. Like, I literally have zero yen on me right now.",
        ],
        context: 'Do you take cards? が最も自然。accept は硬い。cash only=現金のみ。英語圏はカード社会だからこの質問は日本より少ないけど、日本旅行中の外国人がよく聞くフレーズ。逆の立場を知っておくと便利。',
        character: 'takeshi', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: '袋いりません',
        english: [
            'No bag, thanks.',
            "I do not need a bag, thanks.",
            "No bag for me, I have got my own. Thanks though.",
            "I am good without a bag. I am trying to be better about that. You know, the whole eco thing.",
        ],
        context: 'No bag, thanks. の3語で完結。I am good は「大丈夫です」の万能フレーズ（No thankの柔らかい版）。日本語の「結構です」に相当。I have got my own=マイバッグ持ってる。海外のレジで毎回使う表現。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 3, japanese: 'プレゼント用に包んでもらえますか',
        english: [
            'Can you gift wrap this?',
            'Could you wrap this as a gift?',
            "This is a gift. Could you wrap it nicely? Maybe with a ribbon?",
            "So this is actually a present for someone. Is there any way you could gift wrap it? I am terrible at wrapping things myself.",
        ],
        context: 'gift wrap=プレゼント包装。日本のデパートの無料ラッピングは世界的に珍しい。海外はgift wrapping serviceが有料のことが多い。I am terrible at...=「～が下手で」の自虐フレーズ。英語は理由を添えると自然になる。',
        character: 'lisa', category: 'shopping', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 4: 移動する (Getting Around)
    // Scene: タケシが駅で道を聞かれてパニック
    // ────────────────────────────────────────────────────

    {
        daySlot: 4, japanese: '駅はどこですか？',
        english: [
            'Where is the station?',
            "Where is the nearest station?",
            "Excuse me, how do I get to the station from here?",
            "Sorry to bother you, but I am completely lost. Is there a station around here? I have no idea where I am.",
        ],
        context: 'nearest=最寄りの。How do I get to...? は「どうやって行く？」の万能フレーズ。around here=この辺り。日本語の「どこ」は場所を聞くだけだけど英語は where(場所) と how(行き方) を使い分ける。How で聞くほうが実用的。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'この電車は渋谷に行きますか',
        english: [
            'Does this train go to Shibuya?',
            'Is this the train for Shibuya?',
            "Sorry, is this the right platform for Shibuya? I always get confused here.",
            "Hey, quick question — does this train stop at Shibuya? Or did I mess up and get on the wrong platform again?",
        ],
        context: 'Is this the right platform for...? は「このホームで合ってる？」。stop at=「～に停まる」（急行が停まるか確認するとき重要）。mess up=間違える。日本語は「行きますか」1択だけど英語は go to / stop at / right platform で微妙に違う。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: '乗り換えはどこですか',
        english: [
            'Where do I transfer?',
            'Where do I change trains?',
            "Which station do I need to transfer at? And which line do I switch to?",
            "So I need to get to Shibuya but I am on the wrong line. Where do I transfer? And like, is it complicated or is it just one switch?",
        ],
        context: 'transfer と change trains は同じ意味。switch to=「～に乗り換える」。Is it complicated? は「ややこしい？」で、日本の乗り換えは外国人にとって本当にcomplicated。英語で乗り換え説明ができたら相当すごい。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'タクシーを呼んでください',
        english: [
            'Please call a taxi.',
            'Can you call me a taxi?',
            "Could you help me get a taxi? I am not sure how to call one around here.",
            "I think I need a taxi. Is there a taxi stand nearby or should I just use an app? I am so bad with directions.",
        ],
        context: 'call me a taxi の me は「私のために」。英語圏では Uber/Lyft がタクシーより一般的。ride=乗ること全般。taxi stand=タクシー乗り場。日本語の「呼ぶ」は電話のイメージだけど英語の call は「手配する」の広い意味。',
        character: 'mina', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'どのくらいかかりますか',
        english: [
            'How long does it take?',
            'How long is it from here?',
            "How long does it take on foot? Or should I just take the train?",
            "How far are we talking here? Like, is it walking distance or am I going to need to take the train?",
        ],
        context: '「どのくらい」は時間にも距離にも使える日本語。英語は how long(時間) と how far(距離) を明確に分ける。walking distance=歩ける距離。How far are we talking? はカジュアルな聞き方で「ぶっちゃけどのくらい？」のニュアンス。',
        character: 'kenji', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: '道に迷いました',
        english: [
            'I am lost.',
            "I am totally lost.",
            "I think I am lost. This does not look right at all.",
            "OK I have no idea where I am. I have been walking for like twenty minutes and nothing looks familiar. Help.",
        ],
        context: 'I am lost. は3語で最強のSOSフレーズ。I have no idea where I am は「全くわからない」の強調版。nothing looks familiar=「何も見覚えがない」。英語は迷ったとき即座にI am lost と言える人が最も早く助けてもらえる。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'ここからどうやって行きますか',
        english: [
            'How do I get there from here?',
            'How do I get there?',
            "What is the best way to get there? Walking? Train?",
            "So from here, what would you recommend? Train, bus, walking? I have got some time so whatever is easiest.",
        ],
        context: 'How do I get there? は道案内を頼むときの基本形。What is the best way? は「一番いい方法は？」。whatever is easiest=「一番簡単なやつで」。英語は選択肢を先に提示する(Walking? Train?)のが親切で、相手も答えやすい。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: '次の駅で降ります',
        english: [
            'I get off at the next stop.',
            'Next stop is mine.',
            "I am getting off at the next one. Excuse me, can I get through?",
            "Oh shoot, next stop is mine. Sorry, excuse me, I need to get past you. Thanks, sorry, coming through.",
        ],
        context: 'Next stop is mine. がネイティブっぽい言い方。get off=降りる、get through/get past=通してもらう。日本なら「すみません」で済む降車も、英語圏ではExcuse me, coming through と声を出す文化。沈黙は「降りない」サイン。',
        character: 'lisa', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'もう少しゆっくり話してください',
        english: [
            'Please speak slowly.',
            'Could you speak a little slower?',
            "Sorry, could you say that again? A little slower this time?",
            "I am so sorry, my English is not great. Could you slow down a bit? I want to make sure I understand you correctly.",
        ],
        context: 'slowly より slower のほうが自然（比較級で「今より」のニュアンス）。say that again=もう一度。slow down=スピードを落とす。英語学習者が最も使うべき表現。恥ずかしがらずに言えるかどうかが英語力より大事。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 4, japanese: 'Wi-Fiはありますか',
        english: [
            'Do you have Wi-Fi?',
            'Is there Wi-Fi here?',
            "Do you have Wi-Fi? What is the password?",
            "Hey, do you guys have Wi-Fi? I need to look something up and my data is not working here.",
        ],
        context: '旅行で一番使うフレーズかもしれない。What is the password? までセットで覚える。my data is not working=「データ通信が使えない」。英語圏ではほぼ全てのカフェ・ホテルにWi-Fiがある。パスワードはレシートに書いてあることが多い。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 5: 気持ちを伝える (Expressing Feelings)
    // Scene: 全員が英語学習の本音を語る夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 5, japanese: '楽しい！',
        english: [
            'This is fun!',
            "I am having a great time!",
            "This is way more fun than I expected. I could do this all night.",
            "OK I was dreading this but honestly? This is actually fun. Like, genuinely fun. Why did I wait so long to try this?",
        ],
        context: 'fun は体験が楽しい、interesting は知的に面白い。I am having a great time は「楽しんでる」の強い表現。dreading=恐れてた。日本語の「楽しい」は形容詞1語だけど英語は I am having fun と動詞で表現するのが普通。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: '疲れた',
        english: [
            'I am tired.',
            'I am beat.',
            "I am exhausted. Today completely drained me.",
            "I am done. Like, stick a fork in me, I am done. My brain stopped working about an hour ago.",
        ],
        context: 'tired<beat<exhausted<dead の順で疲労度が上がる。drained=エネルギーを搾り取られた。stick a fork in me=「もう終わり」(七面鳥が焼けたか確認するフォーク刺し由来)。日本語の「疲れた」は1段階だけど英語は段階が多い。',
        character: 'yuki', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: '嬉しい',
        english: [
            'I am happy.',
            'That makes me so happy.',
            "You have no idea how happy that makes me. Seriously, thank you.",
            "OK that just made my entire day. No, my entire week. I have been waiting to hear that for so long.",
        ],
        context: 'That makes me happy は「それが私を嬉しくする」で、喜びの原因を示す英語らしい構造。You have no idea=「あなたには想像もつかない」(強調)。made my day=「最高の一日になった」。日本語の「嬉しい」は状態、英語は原因と結果で表現する。',
        character: 'mina', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: '残念',
        english: [
            "That is too bad.",
            "That is a shame.",
            "Oh no, that is such a bummer. I was really looking forward to it.",
            "Ugh, seriously? That is so disappointing. I had my heart set on it and everything.",
        ],
        context: 'too bad=残念、shame=惜しい、bummer=がっかり(カジュアル)、disappointing=期待外れ。had my heart set on=「すごく楽しみにしてた」。日本語の「残念」は上品だけど英語の bummer はかなりカジュアル。場面で使い分ける。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: 'びっくりした',
        english: [
            'I was surprised.',
            "That caught me off guard.",
            "Wait, seriously? I did not see that coming at all.",
            "Whoa. OK I was not expecting that. You just completely blindsided me. In a good way, but still.",
        ],
        context: 'surprised は普通、caught me off guard=不意打ち、did not see that coming=予想外、blindsided=完全に予想外で衝撃。日本語の「びっくりした」は軽いけど英語は驚きの質と強度を細かく表現する。いいびっくり(in a good way)か悪いびっくりかも言う。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: '心配しないで',
        english: [
            'Do not worry.',
            "Do not worry about it.",
            "Hey, do not stress over it. It is going to be fine.",
            "Listen, I know it feels like a big deal right now, but trust me — it is going to work out. These things always do.",
        ],
        context: 'Do not worry は命令形だけど英語では普通の励まし。stress over=「～のことでストレスを感じる」。it is going to work out=「うまくいくよ」は英語で最も温かい励まし表現の一つ。日本語の「心配しないで」より英語は具体的な理由を添える。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: 'やる気が出てきた',
        english: [
            'I am motivated.',
            "I am starting to feel motivated.",
            "Something just clicked. I actually want to do this now.",
            "You know what? I think something just shifted. Like, I went from dreading this to actually wanting to do it. That is new.",
        ],
        context: 'something clicked=何かがカチッとハマった(理解や決意の瞬間)。shifted=変わった。dreadingからwanting=「嫌だったのにやりたくなった」。英語はモチベーションの変化のプロセスを言語化する。日本語の「やる気」は状態だけど英語は変化の過程。',
        character: 'yuki', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: '自信がない',
        english: [
            'I am not confident.',
            "I am not feeling very confident about this.",
            "Honestly, I do not think I can do this. My English is not good enough.",
            "I want to try, I really do. But every time I open my mouth, my brain just... goes blank. It is so frustrating.",
        ],
        context: 'goes blank=頭が真っ白になる。英語学習者が最も共感するフレーズ。Not confident は事実を述べるだけだけど、goes blank は「体験」を共有する。英語で弱みを見せるのは trust の証。日本語の「自信がない」より英語は理由まで言うと共感を得られる。',
        character: 'yuki', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: 'すごい！',
        english: [
            "That is amazing!",
            "That is incredible!",
            "Wait, you did that? That is seriously impressive.",
            "Are you kidding me? That is insane. I could never do that. No, seriously, that takes real guts.",
        ],
        context: 'amazing<incredible<insane の順で驚きが上がる。guts=根性、度胸。I could never=「私には無理」は最高の褒め言葉。日本語の「すごい」は万能だけど英語は何がすごいか、どのくらいすごいかを段階的に表現する。具体性が褒め力を上げる。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 5, japanese: 'ほっとした',
        english: [
            "What a relief.",
            "Oh thank God, what a relief.",
            "I can finally breathe again. I was so stressed about that.",
            "Oh man. You have no idea how relieved I am right now. I have been holding my breath all day about this.",
        ],
        context: 'What a relief は「あー安心した」の一言。Thank God は宗教関係なく使う感嘆表現。holding my breath=息を止めてた（緊張の比喩）。finally breathe=やっと息ができる。日本語の「ほっとした」は音で安心を表現。英語は身体の比喩で表現する。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 6: 頼む・断る (Requests and Declining)
    // Scene: リサが丁寧な頼み方と断り方を教える
    // ────────────────────────────────────────────────────

    {
        daySlot: 6, japanese: 'ちょっとお願いがあるんですが',
        english: [
            'I have a favor to ask.',
            'I have a small favor to ask, if you do not mind.',
            "Hey, can I ask you something? It is kind of a big ask, but hear me out.",
            "So I know this is kind of random, but I have a favor to ask. And before you say no, just let me explain.",
        ],
        context: 'favor=お願い。big ask=大きなお願い。hear me out=最後まで聞いて。before you say no=断る前に。日本語は「ちょっと」で軽く見せるけど英語は逆に「大きいお願いだけど」と正直に言うほうが信頼される。前置きの文化差。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: '手伝ってもらえますか',
        english: [
            'Can you help me?',
            'Could you give me a hand?',
            "I could really use some help with this. Are you free for a minute?",
            "Hey, I hate to ask, but I am kind of stuck here. Any chance you could help me out? It should not take long.",
        ],
        context: 'give me a hand=手を貸して(手伝って)。I could really use=「すごく助かる」。I hate to ask=「聞くのは申し訳ないけど」。it should not take long=「すぐ終わる」。英語のお願いは「相手の時間を尊重する前置き」が丁寧さの核心。',
        character: 'yuki', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: '写真撮ってもらえますか',
        english: [
            'Can you take a photo?',
            'Would you mind taking our photo?',
            "Sorry to bother you, but could you take a quick photo of us? Just press this button.",
            "Hey, sorry, I know this is random, but would you mind? Just one photo. You can use this button. And try to get that building in the background if you can.",
        ],
        context: 'Would you mind...? は最も丁寧な頼み方の1つ。Just press this button は渡し方のコツ（スマホの操作を説明する）。旅行で一番使うお願い表現。sorry to bother you は「お忙しいところすみません」に相当。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: '今日はちょっと...',
        english: [
            "I cannot today.",
            "I am going to have to pass.",
            "I would love to, but I have got something going on tonight. Rain check?",
            "Ah man, I really wish I could but tonight is not going to work. Can we do it another time? I promise I am not just saying that.",
        ],
        context: 'rain check=また今度（野球の雨天順延チケット由来）。I would love to, but... は最も丁寧な断り方。「行きたいけど無理」の構造。日本語の「ちょっと...」は理由を言わない美学。英語は理由を軽く添えるのが礼儀。文化差が最も出る場面。',
        character: 'kenji', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: 'また今度ね',
        english: [
            'Maybe next time.',
            "Let us do it another time.",
            "Not this time, but definitely next time. I mean it.",
            "I am going to take a rain check on this one, but seriously — next time, I am in. Pin me down on a date.",
        ],
        context: 'rain check 再登場。definitely next time=「絶対次は」。I mean it=「本気で言ってる」。pin me down=「日程を決めてくれ」。英語の「また今度」は社交辞令になりがちだから I mean it で本気度を示す。日本語と同じ問題を抱えてる。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: 'もう少し考えさせて',
        english: [
            'Let me think about it.',
            'Give me a little time to think it over.',
            "I need to sleep on it. Can I get back to you tomorrow?",
            "Hmm. I do not want to give you an answer right now because I want to think it through properly. Let me get back to you?",
        ],
        context: 'sleep on it=一晩寝て考える（英語の名表現）。think it over/think it through=じっくり考える。get back to you=後で連絡する。英語は「すぐ答えない」ことを堂々と言える。日本語の「考えさせて」は断りの前兆に聞こえるけど英語は本当に考える時間を求める表現。',
        character: 'master', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: 'いいよ、任せて',
        english: [
            'Sure, leave it to me.',
            "Sure thing, I got you.",
            "Consider it done. I will take care of everything.",
            "Say no more. I got this. You just sit back and relax. I will handle it.",
        ],
        context: 'I got you/I got this=「任せろ」の英語版。Consider it done=「もう終わったと思って」(最高にかっこいい引き受け方)。Say no more=「もう何も言わなくていい」。日本語の「任せて」は1語だけど英語は引き受けの熱量を言葉で見せる。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: '大丈夫、気にしないで',
        english: [
            "It is OK, do not worry.",
            "No worries, do not sweat it.",
            "Honestly, it is no big deal. Do not even think about it.",
            "Hey, seriously, it is totally fine. I was not even bothered. Let us just forget about it and move on.",
        ],
        context: 'No worries=心配なし（オーストラリア英語発祥、今は世界共通）。do not sweat it=汗をかくな=気にするな。no big deal=大したことない。英語は「気にするな」を5通りくらい持っておくと便利。日本語の「大丈夫」並みの万能フレーズ群。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: 'もちろん！',
        english: [
            'Of course!',
            'Absolutely!',
            "Of course! I would be happy to help. What do you need?",
            "Are you kidding? Of course! You do not even have to ask. I am always down to help.",
        ],
        context: 'Absolutely は Of course より強い肯定。You do not even have to ask=「聞くまでもない」。I am always down to=「いつでもOK」。日本語の「もちろん」は1段階だけど英語は肯定の強さを of course < absolutely < you do not even have to ask で段階的に表現。',
        character: 'mina', category: 'request', month: '2026-04',
    },
    {
        daySlot: 6, japanese: 'ごめん、無理',
        english: [
            "Sorry, I cannot.",
            "Sorry, that is not going to work for me.",
            "I wish I could, but I really cannot this time. I am sorry.",
            "Man, I am really sorry but I just cannot swing it right now. Things are kind of crazy on my end. I owe you one though.",
        ],
        context: 'that is not going to work for me=「それは自分には合わない」（柔らかい断り）。swing it=なんとかする。I owe you one=「借り1つ」。日本語の「無理」はストレートだけど英語もストレートに断ることは全然OK。理由を軽く添えるのがマナー。',
        character: 'kenji', category: 'request', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 7: 雑談する (Small Talk)
    // Scene: 週末の居酒屋。全員で英語雑談に初挑戦
    // ────────────────────────────────────────────────────

    {
        daySlot: 7, japanese: '最近どう？',
        english: [
            'How are you?',
            "How is it going?",
            "Hey! Long time no see. How have you been?",
            "Hey, what is up? It feels like I have not seen you in forever. What have you been up to?",
        ],
        context: 'How are you? は挨拶であって質問ではない（Fine, thanks が定型返答）。How have you been? は本当に近況を聞いている。What have you been up to? は「何してた？」。日本語の「最近どう？」は英語より本気で聞いている感じ。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '週末は何してた？',
        english: [
            'What did you do this weekend?',
            "How was your weekend?",
            "Do anything fun this weekend? I stayed home the whole time.",
            "So how was your weekend? Mine was honestly the laziest weekend ever. I did not leave the couch. No regrets though.",
        ],
        context: 'How was your weekend? は月曜の定番会話。Do anything fun? は「何か楽しいことした？」。No regrets=後悔なし。英語の雑談は自分のことを先に言うのがコツ（相手も答えやすくなる）。日本語は質問だけ投げるけど英語は自分の話もセットで。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '天気いいね',
        english: [
            'Nice weather.',
            'Nice day, right?',
            "What a beautiful day. We should be outside right now.",
            "Can you believe this weather? It has been raining all week and suddenly today is like this. I am not complaining though.",
        ],
        context: '天気の話は英語圏の雑談の王様。イギリス人は本当に天気の話ばかりする。Can you believe this weather? は天気雑談の万能フレーズ。日本語の「天気いいね」は1文完結だけど英語は「だから何しよう」まで続ける。天気は話の入口。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '趣味は何ですか？',
        english: [
            'What are your hobbies?',
            "What are you into?",
            "So what do you do for fun? Like, outside of work.",
            "What do you do when you are not working? I need new hobbies. I feel like all I do is eat, sleep, and work.",
        ],
        context: 'What are your hobbies? は面接っぽくてやや堅い。What are you into? が自然。for fun=趣味で。英語では hobby は割と堅い言葉で、普段は interests や things I like to do と言う。日本語の「趣味」ほどカジュアルじゃない。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '仕事は何してるんですか？',
        english: [
            'What is your job?',
            "What do you do?",
            "So what do you do for a living? If you do not mind me asking.",
            "What do you do? And I mean, like, what you actually do every day — not just your title. Because titles never tell the whole story.",
        ],
        context: 'What do you do? が最も自然（job を使わない）。for a living=生計のために。If you do not mind me asking=「聞いてもよければ」。英語圏では仕事の話は初対面の定番だけど、ヨーロッパでは失礼に感じる人もいる。文化差。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: 'へー、そうなんだ',
        english: [
            'Oh, really?',
            "Oh really? That is interesting.",
            "No way, I had no idea. Tell me more about that.",
            "Wait, seriously? That is so cool. I have always wondered what that is like. So what is a typical day for you?",
        ],
        context: 'Oh really? は万能リアクション。Tell me more=もっと教えて（最強の雑談継続フレーズ）。I have always wondered=「前から気になってた」。日本語の「へー」は相槌だけど英語は相槌+質問で返すのが雑談のルール。反応だけで終わらない。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '同じく！',
        english: [
            'Me too!',
            "Same here!",
            "No way, me too! I thought I was the only one.",
            "Wait, you too? OK we are officially best friends now. That is such a specific thing to have in common.",
        ],
        context: 'Same! や Same here! が一番カジュアル。I thought I was the only one=「自分だけかと思ってた」は共感の最高表現。have in common=共通点がある。英語の雑談では共通点を見つけた瞬間が最も盛り上がる。「同じ！」は最強の接着剤。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '今度一緒に行こうよ',
        english: [
            "Let us go together sometime.",
            "We should totally go together.",
            "We should do that sometime. Are you free next weekend?",
            "OK you know what, we should actually do this. Not just talk about it. What is your schedule like next week?",
        ],
        context: 'We should... は社交辞令になりがち。実現させるコツは具体的な日時を提案すること(Are you free next weekend?)。英語は「いつ？」まで詰めないと「言っただけ」で終わる。日本語の「今度」も同じ問題。具体性が約束を生む。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '連絡先交換しない？',
        english: [
            'Can I get your contact?',
            "Want to exchange numbers?",
            "Hey, let me get your number. I will text you about next weekend.",
            "We should stay in touch. Here, let me give you my number. Or do you use LINE? Whatever works for you.",
        ],
        context: 'exchange numbers=番号交換。Let me get your number はアメリカ定番。LINEは日本だけ、海外はWhatsApp/iMessage。stay in touch=連絡を取り合う。Whatever works for you=「あなたに合う方法で」。アプリの違いが文化の違いを映す。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 7, japanese: '今日は楽しかった',
        english: [
            'I had a good time today.',
            "I had a great time today.",
            "This was really fun. We should do this more often.",
            "Honestly, I needed this. It has been a while since I just sat down and talked like this. Thanks for tonight, everyone.",
        ],
        context: 'I had a great time は別れ際の定番。We should do this more often=「もっとやろう」。I needed this=「これが必要だった」は深い感謝。Thanks for tonight は「今夜ありがとう」。英語の別れ際は感想+次の約束+感謝の3点セットが美しい。',
        character: 'master', category: 'social', month: '2026-04',
    },
    ...WEEK2_EXPRESSIONS,
    ...WEEK3_EXPRESSIONS,
    ...WEEK4_EXPRESSIONS,
    ...MONTH2_W5_EXPRESSIONS,
    ...MONTH2_W6_EXPRESSIONS,
    ...MONTH2_W7_EXPRESSIONS,
    ...MONTH2_W8_EXPRESSIONS,
    ...MONTH3_W9_EXPRESSIONS,
    ...MONTH3_W10_EXPRESSIONS,
    ...MONTH3_W11_EXPRESSIONS,
    ...MONTH3_W12_EXPRESSIONS,
];
