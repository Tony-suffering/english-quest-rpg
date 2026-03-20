// 居酒屋TOEIC -- Type Definitions

export type ToeicPart = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CharacterMood = 'normal' | 'drunk' | 'angry' | 'excited' | 'thinking' | 'smug' | 'defeated';

export type TrapType =
  | 'verbatim'        // 音声の単語をそのまま使った引っかけ
  | 'indirect'        // 間接回答
  | 'similar-sound'   // 似た音の単語
  | 'wrong-speaker'   // 話者の取り違え
  | 'wrong-tense'     // 時制の罠
  | 'wrong-preposition' // 前置詞の罠
  | 'topic-shift';    // 話題すり替え

export type ScoreLevel = 400 | 500 | 600 | 700 | 800 | 900;

export interface IzakayaCharacter {
  id: string;
  name: string;
  nameEn: string;
  age: number;
  job: string;
  jobEn: string;
  currentScore: number;
  targetScore: number;
  personality: string;
  catchphrase: string;
  catchphraseEn: string;
  weakPoints: ToeicPart[];
  strongPoints: ToeicPart[];
  color: string;
  initial: string;
}

export interface StoryLine {
  speaker: string;       // character id or 'narration'
  japanese: string;
  english?: string;
  mood?: CharacterMood;
  action?: string;       // (ビールを飲みながら)
  sceneImage?: string;   // path relative to /izakaya-scenes/, e.g. "ep-001/opening.webp"
}

export interface ParaphraseMapping {
  original: string;
  paraphrased: string;
  note?: string;
}

export interface ToeicChoice {
  text: string;
  isCorrect: boolean;
  trapType?: TrapType;
  explanation?: string;
}

export interface ToeicQuestion {
  id: string;
  part: ToeicPart;
  questionText?: string;
  audioScript?: string;
  imageDescription?: string;
  choices: ToeicChoice[];
  explanation: string;
  paraphraseMap?: ParaphraseMapping[];
  difficulty: 'easy' | 'medium' | 'hard';
  scoreLevel: ScoreLevel;
  skillTag: string;
}

export interface MasterTip {
  japanese: string;
  english?: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  example?: string;
  partOfSpeech?: string;
}

export interface IzakayaEpisode {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  targetPart: ToeicPart;
  targetSkill: string;
  targetSkillLabel: string;
  targetScoreRange: [ScoreLevel, ScoreLevel];
  story: StoryLine[];
  questions: ToeicQuestion[];
  masterTip: MasterTip;
  vocabHighlights: VocabItem[];
  previousEpisodeId?: string;
  nextEpisodeId?: string;
}
