// 居酒屋TOEIC -- Progress tracking (localStorage)

const STORAGE_KEY = 'izakaya_toeic_progress';
const VOCAB_DECK_KEY = 'izakaya_toeic_vocab_deck';

export interface EpisodeResult {
  episodeId: string;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;    // ISO date
  timeSpentMs?: number;
}

export interface ToeicProgress {
  completedEpisodes: Record<string, EpisodeResult>;  // episodeId → best result
  totalCorrect: number;
  totalAttempted: number;
  streakDays: number;
  lastPlayedAt: string | null;
  vocabCollected: string[];   // word strings added to training
  estimatedScore: number;     // rough TOEIC listening score estimate
}

// Vocab deck item for training integration
export interface VocabDeckItem {
  word: string;
  meaning: string;
  example?: string;
  partOfSpeech?: string;
  sourceEpisode: string;     // ep-001, etc.
  sourceEpisodeTitle: string;
  masteryLevel: 0 | 1 | 2 | 3;  // 0=new, 1=seen, 2=familiar, 3=mastered
  lastReviewedAt: string | null;
  reviewCount: number;
  correctStreak: number;
}

const DEFAULT_PROGRESS: ToeicProgress = {
  completedEpisodes: {},
  totalCorrect: 0,
  totalAttempted: 0,
  streakDays: 0,
  lastPlayedAt: null,
  vocabCollected: [],
  estimatedScore: 0,
};

export function getProgress(): ToeicProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: ToeicProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordEpisodeResult(
  episodeId: string,
  correctCount: number,
  totalQuestions: number,
): ToeicProgress {
  const progress = getProgress();
  const existing = progress.completedEpisodes[episodeId];

  // Keep best score
  if (!existing || correctCount > existing.correctCount) {
    progress.completedEpisodes[episodeId] = {
      episodeId,
      correctCount,
      totalQuestions,
      completedAt: new Date().toISOString(),
    };
  }

  // Update totals
  progress.totalCorrect += correctCount;
  progress.totalAttempted += totalQuestions;

  // Streak
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = progress.lastPlayedAt?.slice(0, 10);
  if (lastDate === today) {
    // same day, no streak change
  } else if (lastDate) {
    const diff = (new Date(today).getTime() - new Date(lastDate).getTime()) / 86400000;
    if (diff <= 1) {
      progress.streakDays += 1;
    } else {
      progress.streakDays = 1;
    }
  } else {
    progress.streakDays = 1;
  }
  progress.lastPlayedAt = new Date().toISOString();

  // Estimate TOEIC listening score based on accuracy
  const totalQs = Object.values(progress.completedEpisodes).reduce((sum, r) => sum + r.totalQuestions, 0);
  const totalCorrectAll = Object.values(progress.completedEpisodes).reduce((sum, r) => sum + r.correctCount, 0);
  if (totalQs > 0) {
    const accuracy = totalCorrectAll / totalQs;
    progress.estimatedScore = Math.round(250 + accuracy * 245);
  }

  saveProgress(progress);
  return progress;
}

export function addVocabToCollection(word: string): ToeicProgress {
  const progress = getProgress();
  if (!progress.vocabCollected.includes(word)) {
    progress.vocabCollected.push(word);
    saveProgress(progress);
  }
  return progress;
}

export function getEpisodeResult(episodeId: string): EpisodeResult | undefined {
  return getProgress().completedEpisodes[episodeId];
}

export function isEpisodeCompleted(episodeId: string): boolean {
  return !!getProgress().completedEpisodes[episodeId];
}

export function getCompletionRate(): number {
  const progress = getProgress();
  const completed = Object.keys(progress.completedEpisodes).length;
  return completed;
}

// ── Vocab Deck (Training Integration) ──

export function getVocabDeck(): VocabDeckItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(VOCAB_DECK_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveVocabDeck(deck: VocabDeckItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VOCAB_DECK_KEY, JSON.stringify(deck));
}

export function addVocabToDeck(
  word: string,
  meaning: string,
  episodeId: string,
  episodeTitle: string,
  example?: string,
  partOfSpeech?: string,
): VocabDeckItem {
  const deck = getVocabDeck();
  const existing = deck.find(d => d.word === word);
  if (existing) return existing;

  const item: VocabDeckItem = {
    word,
    meaning,
    example,
    partOfSpeech,
    sourceEpisode: episodeId,
    sourceEpisodeTitle: episodeTitle,
    masteryLevel: 0,
    lastReviewedAt: null,
    reviewCount: 0,
    correctStreak: 0,
  };
  deck.push(item);
  saveVocabDeck(deck);

  // Also add to progress vocabCollected
  addVocabToCollection(word);

  return item;
}

export function updateVocabMastery(word: string, correct: boolean): VocabDeckItem | undefined {
  const deck = getVocabDeck();
  const item = deck.find(d => d.word === word);
  if (!item) return undefined;

  item.reviewCount += 1;
  item.lastReviewedAt = new Date().toISOString();

  if (correct) {
    item.correctStreak += 1;
    // Level up at streaks: 1→seen, 3→familiar, 5→mastered
    if (item.correctStreak >= 5 && item.masteryLevel < 3) item.masteryLevel = 3;
    else if (item.correctStreak >= 3 && item.masteryLevel < 2) item.masteryLevel = 2;
    else if (item.masteryLevel < 1) item.masteryLevel = 1;
  } else {
    item.correctStreak = 0;
    if (item.masteryLevel > 0) item.masteryLevel = (item.masteryLevel - 1) as 0 | 1 | 2 | 3;
  }

  saveVocabDeck(deck);
  return item;
}

export function getVocabDeckStats(): { total: number; mastered: number; reviewing: number; newCount: number } {
  const deck = getVocabDeck();
  return {
    total: deck.length,
    mastered: deck.filter(d => d.masteryLevel === 3).length,
    reviewing: deck.filter(d => d.masteryLevel > 0 && d.masteryLevel < 3).length,
    newCount: deck.filter(d => d.masteryLevel === 0).length,
  };
}

// Get items that need review (prioritize: new > low mastery > old review date)
export function getReviewQueue(limit = 10): VocabDeckItem[] {
  const deck = getVocabDeck();
  if (deck.length === 0) return [];

  return [...deck].sort((a, b) => {
    // New items first
    if (a.masteryLevel === 0 && b.masteryLevel !== 0) return -1;
    if (b.masteryLevel === 0 && a.masteryLevel !== 0) return 1;
    // Then by mastery (low first)
    if (a.masteryLevel !== b.masteryLevel) return a.masteryLevel - b.masteryLevel;
    // Then by last reviewed (oldest first, null first)
    if (!a.lastReviewedAt) return -1;
    if (!b.lastReviewedAt) return 1;
    return new Date(a.lastReviewedAt).getTime() - new Date(b.lastReviewedAt).getTime();
  }).slice(0, limit);
}
