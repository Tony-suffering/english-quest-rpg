// TOEIC Daily Words -- Type Definitions

export type WordLevel = 500 | 600 | 700 | 800 | 900;

export type WordCategory =
  | 'vocab'     // 一般語彙
  | 'grammar'   // 文法系（接続詞・前置詞など）
  | 'business'  // ビジネス用語
  | 'trap'      // 日本人が間違えやすい
  | 'phrase'    // フレーズ・コロケーション
  | 'advanced'; // 上級語彙

export interface CharacterScene {
  character: string;  // character id: 'master' | 'yuki' | 'takeshi' | 'lisa' | 'kenji' | 'mina'
  line: string;       // what they say in the izakaya
}

export interface ToeicWordEntry {
  daySlot: number;        // 1-31 (calendar day)
  word: string;           // the English word or phrase
  meaning: string;        // Japanese meaning
  level: WordLevel;       // TOEIC score level
  category: WordCategory;
  context: string;        // fun/insightful explanation (Japanese, 60-120 chars)
  scenes: CharacterScene[];  // 2-3 character reactions
}

// Category display config
export const WORD_CATEGORY_META: Record<WordCategory, { label: string; color: string; bg: string }> = {
  vocab:    { label: '語彙',       color: '#3B82F6', bg: '#EFF6FF' },
  grammar:  { label: '文法',       color: '#8B5CF6', bg: '#F5F3FF' },
  business: { label: 'ビジネス',   color: '#10B981', bg: '#ECFDF5' },
  trap:     { label: '引っかけ',   color: '#EF4444', bg: '#FEF2F2' },
  phrase:   { label: 'フレーズ',   color: '#F97316', bg: '#FFF7ED' },
  advanced: { label: '上級',       color: '#EC4899', bg: '#FDF2F8' },
};

// Level display config
export const WORD_LEVEL_META: Record<WordLevel, { label: string; color: string; bg: string }> = {
  500: { label: '500',  color: '#10B981', bg: '#ECFDF5' },
  600: { label: '600',  color: '#3B82F6', bg: '#EFF6FF' },
  700: { label: '700',  color: '#D4AF37', bg: '#FFFBEB' },
  800: { label: '800',  color: '#8B5CF6', bg: '#F5F3FF' },
  900: { label: '900',  color: '#EF4444', bg: '#FEF2F2' },
};
