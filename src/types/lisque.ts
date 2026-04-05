// ═══════════════════════════════════════════════════════════
// リスクエ (LisQue) - 30日で英語が聞こえる耳を作る
// Takeshiがシンガポール国際テックカンファレンスに挑む30日間
// ═══════════════════════════════════════════════════════════

// ─── Characters ────────────────────────────────────────────

export type CharacterId = 'master' | 'yuki' | 'takeshi' | 'lisa' | 'kenji' | 'mina' | 'narration';

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  nameEn: string;
  color: string;
  avatar: string;
  role: string;          // Role in LisQue specifically
  toeicScore: number;
}

export const LISQUE_CHARACTERS: Record<Exclude<CharacterId, 'narration'>, CharacterMeta> = {
  takeshi: { id: 'takeshi', name: 'タケシ', nameEn: 'Takeshi', color: '#3B82F6', avatar: '/characters/takeshi.webp', role: '主人公。聞き取れなくて焦る男', toeicScore: 550 },
  master:  { id: 'master',  name: 'マスター権藤', nameEn: 'Master Gondo', color: '#78716C', avatar: '/characters/master.webp', role: '解説役。なぜ聞こえないかを教える', toeicScore: 990 },
  mina:    { id: 'mina',    name: 'ミナ', nameEn: 'Mina', color: '#8B5CF6', avatar: '/characters/mina.webp', role: 'リスニング天才(495/495)。耳のコツを教える', toeicScore: 730 },
  lisa:    { id: 'lisa',    name: 'リサ', nameEn: 'Lisa', color: '#EC4899', avatar: '/characters/lisa.webp', role: 'ネイティブ音声のお手本。実際の発音を見せる', toeicScore: 860 },
  yuki:    { id: 'yuki',    name: 'ユキ', nameEn: 'Yuki', color: '#D4AF37', avatar: '/characters/yuki.webp', role: 'タケシと一緒に学ぶ仲間', toeicScore: 620 },
  kenji:   { id: 'kenji',   name: 'ケンジ', nameEn: 'Kenji', color: '#92400E', avatar: '/characters/kenji.webp', role: '最年長。初心者目線の質問をする', toeicScore: 480 },
};

// ─── Story Elements ────────────────────────────────────────

export interface StoryLine {
  speaker: CharacterId;
  text: string;            // Japanese dialogue
  english?: string;        // If character speaks English
  mood?: 'normal' | 'excited' | 'thinking' | 'frustrated' | 'surprised' | 'smug' | 'embarrassed' | 'determined';
  action?: string;         // Stage direction: (ビールを置きながら)
}

export interface DayStory {
  /** Scene location */
  scene: string;           // e.g., "居酒屋のれん - カウンター席"
  /** Which characters appear today */
  cast: CharacterId[];
  /** Opening dialogue (before exercises start) */
  opening: StoryLine[];
  /** Closing dialogue (after all exercises done) */
  closing: StoryLine[];
}

// ─── Exercise Types ────────────────────────────────────────

export type LisqueExerciseType =
  | 'dictation'      // Listen → type what you heard
  | 'choice'         // Listen → pick the correct answer
  | 'fillin'         // Listen → fill in the missing word(s)
  | 'spot'           // Listen → identify the sound change/feature
  | 'scene';         // Listen to dialogue → answer comprehension Q

export type LisqueDifficulty = 'beginner' | 'growing' | 'challenge';

export interface LisqueSpeed {
  slow: number;
  normal: number;
  fast: number;
}

/** A single exercise item */
export interface LisqueExercise {
  id: string;
  type: LisqueExerciseType;
  /** What TTS reads aloud */
  audioText: string;
  audioTextSlow?: string;
  /** Question displayed (Japanese) */
  question: string;
  options?: string[];
  answer: string;
  /** Japanese translation */
  jaText: string;
  /** WHY Japanese learners miss this */
  trap: string;
  /** HOW to train your ear */
  tip: string;
  difficulty: LisqueDifficulty;
  /** Character introduces this exercise (optional story flavor) */
  characterIntro?: { speaker: CharacterId; text: string; mood?: string };
  /** Character reacts to correct/wrong answer */
  reaction?: { correct: string; wrong: string; speaker: CharacterId };
}

/** One day's lesson */
export interface LisqueDay {
  day: number;
  phase: 1 | 2 | 3;
  theme: string;
  themeEn: string;
  hook: string;
  rule: string;
  /** Story wrapper - characters & dialogue */
  story?: DayStory;
  exercises: LisqueExercise[];
}

// ─── Progress ──────────────────────────────────────────────

export interface LisqueDayProgress {
  day: number;
  started: boolean;
  completedCount: number;
  bestScore: number;
  lastVisit: string;
}

export interface LisqueStats {
  currentDay: number;
  totalCompleted: number;
  totalCorrect: number;
  streakDays: number;
  dayProgress: Record<number, LisqueDayProgress>;
}

// ─── Constants ─────────────────────────────────────────────

export const LISQUE_SPEEDS: Record<1 | 2 | 3, LisqueSpeed> = {
  1: { slow: 0.6, normal: 0.85, fast: 1.0 },
  2: { slow: 0.7, normal: 0.9, fast: 1.1 },
  3: { slow: 0.75, normal: 0.95, fast: 1.2 },
};

export const LISQUE_PHASES = [
  { phase: 1 as const, label: '音の基礎', labelEn: 'Sound Basics', days: '1-10', color: '#3B82F6' },
  { phase: 2 as const, label: '文を聞く', labelEn: 'Sentence Listening', days: '11-20', color: '#10B981' },
  { phase: 3 as const, label: '会話を聞く', labelEn: 'Conversation Listening', days: '21-30', color: '#D4AF37' },
];

// Main story arc summary
export const LISQUE_STORY_ARC = {
  title: 'Takeshiのシンガポール大作戦',
  subtitle: '30日後、国際テックカンファレンスで英語プレゼン。聞こえないと、話せない。',
  synopsis: 'IT企業のプロジェクトマネージャー・タケシ(35歳/TOEIC 550)に突然の辞令。30日後のシンガポール国際テックカンファレンスで英語プレゼン。のれんの仲間たちが総力戦で彼の耳を鍛える。リスニング天才ミナ、ネイティブリサ、解説のマスター。タケシは間に合うのか。',
};
