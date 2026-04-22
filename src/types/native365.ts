/**
 * ネイティブ365 -- types
 *
 * TOEIC 900+ / 英検準1級〜1級レベルから先の「最後の1マイル」を
 * 365日で潰すアプリ。月ごとに発音・文法・discourse・ニュアンス等を
 * 集中特訓する。1日1テーマ x 10 items x 4段階 + 6人キャラコメント。
 */

export type Native365Category =
  | 'pronunciation'
  | 'grammar'
  | 'discourse'
  | 'preposition'
  | 'article'
  | 'tense'
  | 'idiom'
  | 'register'
  | 'integration';

export type Native365Level = 'core' | 'nuance' | 'shift' | 'native';

export interface Native365Point {
  en: string;
  ja: string;
}

export interface Native365Reactions {
  master?: string;   // 権藤: 構造 / 理屈
  lisa?: string;     // リサ: ネイティブの直感
  takeshi?: string;  // タケシ: 日本人が落ちる穴
  yuki?: string;     // ユキ: 学習者の声
  kenji?: string;    // 健二: 現場で使えるか
  mina?: string;     // ミナ: SNS / Z 世代
}

export interface Native365Item {
  id: string;
  label: string;        // 見出し: "schwa /ə/" "現在完了 vs 過去形"
  trigger: string;      // お題: 日本語 or "次の単語を発音" 等の指示
  points: {
    core: Native365Point;    // 骨格ルール
    nuance: Native365Point;  // ネイティブが感じる理由
    shift: Native365Point;   // 文脈で変わる
    native: Native365Point;  // 実際に口から出る一言
  };
  trap?: string;  // よくある誤り (日本語で)
  tip?: string;   // コツ (日本語で)
  reactions: Native365Reactions;
}

export interface Native365Section {
  title: string;     // "schwa /ə/" etc
  subtitle: string;  // 1行キャッチ
  tldr: string;      // 今日終わる頃に何ができる
  items: Native365Item[];  // 4-6 items per section
}

export interface Native365Day {
  day: number;                     // 1-365
  week: number;                    // 1-52
  month: number;                   // 1-12
  date?: string;                   // 表示用 (optional)
  pronunciation: Native365Section; // 発音テーマ
  grammar: Native365Section;       // 文法テーマ
}

export interface Native365Month {
  month: number;                   // 1-12
  title: string;                   // "発音の骨格" 等
  titleEn: string;
  theme: string;                   // 月の狙い (1 paragraph)
  days: Native365Day[];            // 30 days
}

export interface Native365Stats {
  currentDay: number;
  totalCompleted: number;
  streakDays: number;
  lastVisit: string;  // ISO date
  dayProgress: Record<number, { completed: boolean; reviewed: number }>;
}

// ─── Character color palette (居酒屋TOEIC 6人を継承) ───
export const NATIVE365_CHARS = {
  master:  { name: '権藤',     role: '構造',       color: '#78716C', colorDim: '#44403C', avatar: '/characters/master.webp' },
  lisa:    { name: 'リサ',     role: 'ネイティブ', color: '#EC4899', colorDim: '#BE185D', avatar: '/characters/lisa.webp' },
  takeshi: { name: 'タケシ',   role: '落とし穴',   color: '#3B82F6', colorDim: '#1D4ED8', avatar: '/characters/takeshi.webp' },
  yuki:    { name: 'ユキ',     role: '学習者',     color: '#D4AF37', colorDim: '#B8971F', avatar: '/characters/yuki.webp' },
  kenji:   { name: '健二',     role: '現場',       color: '#92400E', colorDim: '#78350F', avatar: '/characters/kenji.webp' },
  mina:    { name: 'ミナ',     role: 'Z世代',      color: '#8B5CF6', colorDim: '#6D28D9', avatar: '/characters/mina.webp' },
} as const;

export type Native365CharKey = keyof typeof NATIVE365_CHARS;
export const NATIVE365_CHAR_ORDER: Native365CharKey[] = ['master', 'lisa', 'takeshi', 'yuki', 'kenji', 'mina'];
