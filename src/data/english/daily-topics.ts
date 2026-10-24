// 日々の会話の話題カレンダー
// 日本語で答える → AI が自然な英語に変換 → トレーニングに登録、の流れ用
// 話題はとにおの素 (日常/作業/イラ立ち/趣味) に寄せる。教科書的なトピックは禁止
//
// 追加するときは date を増やすだけ。日付被ったら後勝ち

export type TopicCategory =
    | 'daily'    // 今日の出来事
    | 'work'     // 作業/開発
    | 'feeling'  // 感情/愚痴
    | 'people'   // 人/関係
    | 'food'     // メシ/飲み物
    | 'tech'     // テック/ガジェット
    | 'rant'     // ぼやき/批判
    | 'reflect'  // 振り返り/自己分析
    | 'fun'      // 趣味/エンタメ
    | 'habit';   // 習慣/ルーティン

export interface DailyTopic {
    date: string;          // YYYY-MM-DD
    title: string;         // タブに出す短いタイトル
    prompt: string;        // お題本体。「〜について話して」形式の質問
    hint?: string;         // 答えに困ったときの呼び水
    category: TopicCategory;
}

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
    daily:   '日常',
    work:    '作業',
    feeling: '感情',
    people:  '人',
    food:    'メシ',
    tech:    'テック',
    rant:    'ぼやき',
    reflect: '振り返り',
    fun:     '趣味',
    habit:   '習慣',
};

export const CATEGORY_COLORS: Record<TopicCategory, { bg: string; text: string; border: string }> = {
    daily:   { bg: '#FFFBEB', text: '#A16207', border: '#FDE68A' },
    work:    { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    feeling: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
    people:  { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
    food:    { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
    tech:    { bg: '#ECFEFF', text: '#0E7490', border: '#A5F3FC' },
    rant:    { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3' },
    reflect: { bg: '#F5F3FF', text: '#5B21B6', border: '#DDD6FE' },
    fun:     { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
    habit:   { bg: '#F0F9FF', text: '#0369A1', border: '#BAE6FD' },
};

// ── 話題シード (2026-05-28 から) ──
// 教科書英会話の「Today, I went to the park」みたいな無味乾燥は禁止
// とにおが声に出したくなる質問だけ書く
export const DAILY_TOPICS: DailyTopic[] = [
    {
        date: '2026-05-28',
        title: '今日のイライラ',
        prompt: '今日一番イラついた瞬間は？大したことなくてOK',
        hint: '満員電車、しょうもないUI、誰かの一言、なんでも',
        category: 'feeling',
    },
    {
        date: '2026-05-29',
        title: '作業詰まり',
        prompt: '今日のアプリ作業で詰まったところある？どう詰まった？',
        hint: 'バグ・仕様迷い・やる気切れ全部含む',
        category: 'work',
    },
    {
        date: '2026-05-30',
        title: '人に勧めない趣味',
        prompt: '人には勧めないけど自分はハマってるもの',
        hint: '「人に話してもポカンとされるやつ」',
        category: 'fun',
    },
    {
        date: '2026-05-31',
        title: '今週の進捗',
        prompt: '今週の進捗で1つだけ自慢するとしたら？',
        hint: '小さくてOK。リファクタでも語録でも',
        category: 'reflect',
    },
    {
        date: '2026-06-01',
        title: '6月の目標',
        prompt: '今月やりたいこと、1個だけ言ってみて',
        hint: '無理に大きく言わなくていい',
        category: 'reflect',
    },
    {
        date: '2026-06-02',
        title: '最近のメシ',
        prompt: '最近のメシで一番うまかったやつは？',
        hint: '外食でも家でも、コンビニでも',
        category: 'food',
    },
    {
        date: '2026-06-03',
        title: '聞き取れなかった英語',
        prompt: '最近聞いて聞き取れなかった英語、覚えてる範囲で',
        hint: 'YouTube・映画・歌詞、なんでも',
        category: 'habit',
    },
    {
        date: '2026-06-04',
        title: '老後の自分',
        prompt: '俺が老人になってもやってそうなこと、なに？',
        hint: '想像でOK',
        category: 'reflect',
    },
    {
        date: '2026-06-05',
        title: 'ニュースぼやき',
        prompt: '最近のニュースで「いやそれは違うやろ」って思ったやつ',
        hint: '炎上案件でも経済でもなんでも',
        category: 'rant',
    },
    {
        date: '2026-06-06',
        title: '金返せ案件',
        prompt: '金払って後悔した買い物 (最近じゃなくてもOK)',
        hint: 'サブスク・ガジェット・本・サービス',
        category: 'rant',
    },
    {
        date: '2026-06-07',
        title: '休日の理想',
        prompt: '完璧な休日って、どんな1日？',
        hint: '時系列で説明してみる',
        category: 'daily',
    },
    {
        date: '2026-06-08',
        title: 'X反応よかった投稿',
        prompt: '最近Xで反応よかった投稿の話。なんでバズった？',
        hint: 'バズの理由を自己分析',
        category: 'reflect',
    },
    {
        date: '2026-06-09',
        title: '誰にも言ってない失敗',
        prompt: 'やらかしたけど誰にも言ってない失敗を1つ',
        hint: 'ここで吐き出すだけでも',
        category: 'reflect',
    },
    {
        date: '2026-06-10',
        title: '散歩中の思考',
        prompt: '散歩中に考えた変なことを1つ',
        hint: 'どうでもいいやつほどいい',
        category: 'daily',
    },
    {
        date: '2026-06-11',
        title: '飲み物のこだわり',
        prompt: 'コーヒーとか飲み物のこだわりある？',
        hint: '無いなら「無い」を英語で',
        category: 'food',
    },
    {
        date: '2026-06-12',
        title: '他人がやってて自分はやらないこと',
        prompt: 'みんなやってるけど俺はやらないこと',
        hint: 'SNS、ジム、朝活、なんでも',
        category: 'people',
    },
    {
        date: '2026-06-13',
        title: '俺の方が上手いのに',
        prompt: '明らかに自分の方が上手いのに評価されない場面ある？',
        hint: '仕事・趣味・なんでも',
        category: 'rant',
    },
    {
        date: '2026-06-14',
        title: '最近の自慢ポイント',
        prompt: '最近作ったやつの自慢ポイントを1つ',
        hint: 'コードでも文章でも',
        category: 'work',
    },
    {
        date: '2026-06-15',
        title: '読みかけの本',
        prompt: 'いま読みかけの本ある？何の本？',
        hint: '積んでるだけでもOK',
        category: 'habit',
    },
    {
        date: '2026-06-16',
        title: '人に教えたくなった豆知識',
        prompt: '最近知って誰かに教えたくなった豆知識',
        hint: 'なんでもいい、しょうもなくても',
        category: 'fun',
    },
    {
        date: '2026-06-17',
        title: '他人より下手なこと',
        prompt: 'みんなできるのに自分だけ下手なこと',
        hint: '車庫入れ・洗濯・なんでも',
        category: 'reflect',
    },
    {
        date: '2026-06-18',
        title: 'ガジェット欲',
        prompt: '今欲しいガジェットある？無くてもなんとかなる前提で',
        hint: '物欲そのものを語るのもアリ',
        category: 'tech',
    },
    {
        date: '2026-06-19',
        title: '面倒な趣味',
        prompt: '人に説明するの面倒な趣味、1つ',
        hint: 'マイナースポーツ、マニアックな読書、なんでも',
        category: 'fun',
    },
    {
        date: '2026-06-20',
        title: '言われて嬉しかった一言',
        prompt: '最近、人に言われて嬉しかった一言',
        hint: '些細でOK',
        category: 'people',
    },
    {
        date: '2026-06-21',
        title: 'バレてない習慣',
        prompt: '人にバレてないけど続いてる習慣ある？',
        hint: '毎日コーラ、深夜の散歩、なんでも',
        category: 'habit',
    },
    {
        date: '2026-06-22',
        title: '仕事辞めたらどうする',
        prompt: 'もし全部辞めて遊べたら何して暮らす？',
        hint: '現実的な制約は無視',
        category: 'reflect',
    },
    {
        date: '2026-06-23',
        title: '今日のYouTube',
        prompt: '今日開いて最後まで見ちゃったYouTube動画',
        hint: 'タイトル・チャンネル・何が面白かったか',
        category: 'fun',
    },
    {
        date: '2026-06-24',
        title: 'やる気が出ない時',
        prompt: 'やる気が出ない時、どうやって乗り切る？',
        hint: '乗り切らない派なら「乗り切らない」を英語で',
        category: 'habit',
    },
    {
        date: '2026-06-25',
        title: '言葉のクセ',
        prompt: '自分の口グセ・書きグセで気になってるやつ',
        hint: '日本語のクセを英語に持ち込みたい時の話',
        category: 'reflect',
    },
    {
        date: '2026-06-26',
        title: '6月の振り返り',
        prompt: '6月を1行で振り返ると？',
        hint: 'ポジでもネガでも',
        category: 'reflect',
    },
];

// ── ヘルパー ──
export function getTopicByDate(date: string): DailyTopic | undefined {
    return DAILY_TOPICS.find(t => t.date === date);
}

export function getMonthTopics(year: number, month: number): DailyTopic[] {
    const prefix = `${year}-${String(month).padStart(2, '0')}-`;
    return DAILY_TOPICS.filter(t => t.date.startsWith(prefix));
}

export function formatDateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
