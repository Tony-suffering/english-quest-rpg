// ── TONIO WORDS 型定義 ──────────────────────────────────────

export interface WordEntry {
  en: string;
  pron: string;
  ja: string;
  why: string;       // 居酒屋トーン解説 (40-80字)
  note: string;      // 例文
  cat: string;       // カテゴリキー
  level: 1 | 2 | 3;  // 1=400→500点, 2=500→600点, 3=600→730点
  lesson: number;    // レッスン番号 (レベル内で1-7)
}

export interface LevelMeta {
  level: 1 | 2 | 3;
  name: string;
  nameEn: string;
  target: string;
  color: string;
  bg: string;
  lessons: number;
  words: number;
}

export const LEVELS: LevelMeta[] = [
  { level: 1, name: '基礎を武器にする', nameEn: 'Bronze', target: '400→500点', color: '#CD7F32', bg: '#FFF8F0', lessons: 6, words: 150 },
  { level: 2, name: 'スコアが動く語', nameEn: 'Silver', target: '500→600点', color: '#64748B', bg: '#F8FAFC', lessons: 7, words: 175 },
  { level: 3, name: '壁を越える語', nameEn: 'Gold', target: '600→730点', color: '#D4AF37', bg: '#FFFBEB', lessons: 7, words: 175 },
];

export interface PhraseEntry {
  wordEn: string;    // 親単語
  text: string;      // 英語フレーズ
  ja: string;        // 和訳
  speaker: string;   // 話者名
}

export interface CategoryMeta {
  label: string;
  labelEn: string;
  color: string;
  bg: string;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  katakana: { label: 'カタカナの嘘',     labelEn: 'Katakana Trap',  color: '#EA580C', bg: '#FFF7ED' },
  blind:    { label: '知ってるつもり',    labelEn: 'False Friends',  color: '#DC2626', bg: '#FEF2F2' },
  nogap:    { label: '日本語にない感覚',  labelEn: 'No JA Match',    color: '#8B5CF6', bg: '#F5F3FF' },
  glue:     { label: 'つなぎ言葉',       labelEn: 'Glue Words',     color: '#2563EB', bg: '#EFF6FF' },
  core:     { label: '超基本なのに',      labelEn: 'Core Blind',     color: '#D4AF37', bg: '#FFFBEB' },
  feel:     { label: '感情・感覚',        labelEn: 'Feelings',       color: '#EC4899', bg: '#FDF2F8' },
  daily:    { label: '毎日の動作',        labelEn: 'Daily Action',   color: '#16A34A', bg: '#F0FDF4' },
  think:    { label: '考える系',          labelEn: 'Thinking',       color: '#0891B2', bg: '#ECFEFF' },
  social:   { label: '人間関係',          labelEn: 'Social',         color: '#E11D48', bg: '#FFF1F2' },
  power:    { label: '万能ワード',        labelEn: 'Power Word',     color: '#7C3AED', bg: '#F5F3FF' },
  biz:      { label: 'ビジネス必須',      labelEn: 'Business',       color: '#4F46E5', bg: '#EEF2FF' },
  scene:    { label: 'TOEICの世界',       labelEn: 'TOEIC World',    color: '#F59E0B', bg: '#FFFBEB' },
};
