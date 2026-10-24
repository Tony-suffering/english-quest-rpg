// Life Phrases → Training adapter
// Converts 1,000 LIFE_PHRASES into the Phrase[] interface expected by TrainingClient
// Same pattern as goroku-phrase-adapter.ts

import { LIFE_PHRASES, CATEGORY_META, type LifePhrase } from '@/data/english/life-phrases';

const STORAGE_KEY_MASTERY = 'life-training-mastery';

export interface LifeTrainingPhrase {
  id: string;
  english: string;
  japanese: string;
  category: string;
  date: string;
  gorokuContext?: string;
  gorokuLevels?: string[];
  gorokuLiteral?: string;
}

export const LIFE_CATEGORIES: Record<string, { label: string; labelEn: string; color: string; bg: string }> = Object.fromEntries(
  Object.entries(CATEGORY_META).map(([key, meta]) => [
    key,
    { label: meta.label, labelEn: meta.labelEn, color: meta.color, bg: meta.bg },
  ])
);

/**
 * Convert LIFE_PHRASES to Phrase[] for TrainingClient.
 * 10 phrases per calendar day, rolling over into subsequent months.
 * 1000 phrases / 10 per day = 100 days span.
 */
export function lifeToTrainingPhrases(): LifeTrainingPhrase[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Start from day 1 of current month, then roll over naturally.
  // Avoids the previous bug where overflow days clamped to last-of-month
  // (e.g. 700 phrases all stacking on Apr 30).
  const makeDateStr = (day: number) => {
    const d = new Date(Date.UTC(year, month, day));
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${dd}T00:00:00.000Z`;
  };

  return LIFE_PHRASES.map((phrase, idx) => {
    const day = Math.floor(idx / 10) + 1;
    return {
      id: `life_${phrase.id}`,
      english: phrase.english[1] || phrase.english[0],
      japanese: phrase.japanese,
      category: phrase.category,
      date: makeDateStr(day),
      gorokuContext: phrase.context,
      gorokuLevels: [...phrase.english],
      gorokuLiteral: phrase.literal,
    };
  });
}

/**
 * Load Life training mastery from localStorage.
 */
export function loadLifeMasteryAsTraining(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MASTERY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Save Life training mastery to localStorage.
 */
export function saveLifeTrainingMastery(mastery: Record<string, number>): void {
  try {
    // Only save life_ prefixed keys
    const lifeMastery: Record<string, number> = {};
    for (const [key, val] of Object.entries(mastery)) {
      if (key.startsWith('life_')) {
        lifeMastery[key] = val;
      }
    }
    localStorage.setItem(STORAGE_KEY_MASTERY, JSON.stringify(lifeMastery));
  } catch { /* */ }
}

/**
 * Sync Life training mastery back to the Life page's saved set.
 * Training mastery >= 3 = "saved" on the Life page.
 */
export function syncLifeTrainingToLifePage(trainingMastery: Record<string, number>): void {
  try {
    const savedIds: string[] = [];
    for (const [key, level] of Object.entries(trainingMastery)) {
      if (!key.startsWith('life_')) continue;
      if (level >= 3) {
        // Remove "life_" prefix to get the original phrase id
        savedIds.push(key.replace('life_', ''));
      }
    }
    localStorage.setItem('life-saved-phrases', JSON.stringify(savedIds));
  } catch { /* */ }
}
