// ═══════════════════════════════════════════════════════════
// ヨミクエ (YomiQue) - 30日で英語が読める脳を作る
// Kenjiの建設会社が東南アジア企業と大型契約。英語書類を読む30日間
// ═══════════════════════════════════════════════════════════

import type { CharacterId, StoryLine } from './lisque';

// Re-export shared types
export type { CharacterId, StoryLine };

// ─── Characters (YomiQue specific roles) ───────────────────

export interface YomiqueCharacterMeta {
  id: CharacterId;
  name: string;
  color: string;
  role: string;
}

export const YOMIQUE_CHARACTERS: Record<Exclude<CharacterId, 'narration'>, YomiqueCharacterMeta> = {
  kenji:   { id: 'kenji',   name: 'ケンジ', color: '#92400E', role: '主人公。読めなくて焦る建設会社取締役' },
  master:  { id: 'master',  name: 'マスター権藤', color: '#78716C', role: '解説役。読み方のコツを教える' },
  yuki:    { id: 'yuki',    name: 'ユキ', color: '#D4AF37', role: 'リーディングの先生役(Part 5,7が得意)' },
  lisa:    { id: 'lisa',    name: 'リサ', color: '#EC4899', role: 'ネイティブ目線で英文の自然な読み方を教える' },
  takeshi: { id: 'takeshi', name: 'タケシ', color: '#3B82F6', role: 'ケンジと一緒に学ぶ仲間。ITメール読解担当' },
  mina:    { id: 'mina',    name: 'ミナ', color: '#8B5CF6', role: 'ケンジと同じ読解苦手組。一緒に頑張る' },
};

// ─── Story Elements ────────────────────────────────────────

export interface YomiqueDayStory {
  scene: string;
  cast: CharacterId[];
  opening: StoryLine[];
  closing: StoryLine[];
}

// ─── Exercise Types ────────────────────────────────────────

export type YomiqueExerciseType =
  | 'scan'           // Find specific info
  | 'main_idea'      // Main point identification
  | 'vocabulary'     // Word meaning from context
  | 'order'          // Correct sequence
  | 'inference'      // Read between the lines
  | 'truefalse';     // True/False

export type YomiqueDifficulty = 'beginner' | 'growing' | 'challenge';

export interface YomiquePassage {
  text: string;
  sourceType: string;    // "Email", "Contract", "Sign", "Menu", etc.
  wordCount: number;
}

export interface YomiqueExercise {
  id: string;
  type: YomiqueExerciseType;
  passage: YomiquePassage;
  question: string;
  options?: string[];
  answer: string;
  jaTranslation: string;
  trap: string;
  tip: string;
  difficulty: YomiqueDifficulty;
  /** Character introduces this exercise */
  characterIntro?: { speaker: CharacterId; text: string; mood?: string };
  /** Character reacts */
  reaction?: { correct: string; wrong: string; speaker: CharacterId };
}

export interface YomiqueDay {
  day: number;
  phase: 1 | 2 | 3;
  theme: string;
  themeEn: string;
  hook: string;
  rule: string;
  story?: YomiqueDayStory;
  exercises: YomiqueExercise[];
}

// ─── Progress ──────────────────────────────────────────────

export interface YomiqueDayProgress {
  day: number;
  started: boolean;
  completedCount: number;
  bestScore: number;
  lastVisit: string;
}

export interface YomiqueStats {
  currentDay: number;
  totalCompleted: number;
  totalCorrect: number;
  streakDays: number;
  dayProgress: Record<number, YomiqueDayProgress>;
}

// ─── Constants ─────────────────────────────────────────────

export const YOMIQUE_PHASES = [
  { phase: 1 as const, label: '読みの基礎', labelEn: 'Reading Basics', days: '1-10', color: '#F59E0B' },
  { phase: 2 as const, label: '文章を読む', labelEn: 'Passage Reading', days: '11-20', color: '#8B5CF6' },
  { phase: 3 as const, label: '実践リーディング', labelEn: 'Real-World Reading', days: '21-30', color: '#EF4444' },
];

export const YOMIQUE_STORY_ARC = {
  title: 'Kenjiの東南アジア大作戦',
  subtitle: '30日後、大型契約の書類が全部英語。読めないと、会社が傾く。',
  synopsis: '建設会社取締役・ケンジ(45歳/TOEIC 480)。東南アジア企業との大型契約が決まったが、契約書・仕様書・メールが全て英語。30日で読めるようにならないと会社が回らない。リーディング得意のユキ、ネイティブのリサ、マスターの解説。ケンジは間に合うのか。',
};
