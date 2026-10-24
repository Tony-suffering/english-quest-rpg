// Goroku → Phrase adapter for Training system integration
// Converts 310 GOROKU_SEEDS into the Phrase[] interface expected by TrainingClient

import { GOROKU_SEEDS, type GorokuSeed } from '@/data/english/goroku-seed';

export interface TrainingPhrase {
  id: string;
  english: string;
  japanese: string;
  category: string;
  date: string;
  // Goroku extensions
  gorokuContext?: string;
  gorokuLevels?: string[];
  gorokuLiteral?: string;
  gorokuSlot?: string;
  gorokuSlotHints?: string[];
}

// Category display labels (matches goroku category system)
export const GOROKU_CATEGORIES: Record<string, { label: string; labelEn: string; color: string; bg: string }> = {
  reaction:   { label: '反応',     labelEn: 'Reaction',   color: '#D4AF37', bg: '#FFFBEB' },
  request:    { label: '依頼',     labelEn: 'Request',    color: '#16A34A', bg: '#F0FDF4' },
  opinion:    { label: '意見',     labelEn: 'Opinion',    color: '#2563EB', bg: '#EFF6FF' },
  suggestion: { label: '提案',     labelEn: 'Suggestion', color: '#8B5CF6', bg: '#F5F3FF' },
  filler:     { label: 'つなぎ',   labelEn: 'Filler',     color: '#EA580C', bg: '#FFF7ED' },
  shutdown:   { label: '切り返し', labelEn: 'Shutdown',   color: '#DC2626', bg: '#FEF2F2' },
};

/**
 * Convert GOROKU_SEEDS to Phrase[] for TrainingClient.
 * Each seed maps to one Phrase:
 *   id: "goroku_{daySlot}_{index}" (stable, deterministic)
 *   english: english[1] (attitude-level phrase, the UI display standard)
 *   japanese: the original japanese
 *   category: goroku category
 *   date: synthetic date based on daySlot (10 per calendar day)
 */
export function gorokuToTrainingPhrases(): TrainingPhrase[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const makeDateStr = (day: number) => {
    const d = Math.min(day, daysInMonth);
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}T00:00:00.000Z`;
  };

  // Group by daySlot to maintain 10-per-day ordering
  const bySlot = new Map<number, GorokuSeed[]>();
  for (const seed of GOROKU_SEEDS) {
    const arr = bySlot.get(seed.daySlot) || [];
    arr.push(seed);
    bySlot.set(seed.daySlot, arr);
  }

  const phrases: TrainingPhrase[] = [];
  // Sort by daySlot ascending
  const sortedSlots = [...bySlot.keys()].sort((a, b) => a - b);

  for (const slot of sortedSlots) {
    const seeds = bySlot.get(slot)!;
    seeds.forEach((seed, idx) => {
      phrases.push({
        id: `goroku_${slot}_${idx}`,
        english: seed.english[1] || seed.english[0],
        japanese: seed.japanese,
        category: seed.category,
        date: makeDateStr(slot),
        gorokuContext: seed.context,
        gorokuLevels: seed.english,
        gorokuLiteral: seed.literal,
        gorokuSlot: seed.slot,
        gorokuSlotHints: seed.slotHints,
      });
    });
  }

  return phrases;
}

/**
 * Sync goroku Training mastery back to product-storage mastery.
 * Training uses: { "goroku_3_5": 3 } (phrase ID → mastery level)
 * Product uses: { "3-5": 0|3 } (daySlot-index → binary mastery)
 */
export function syncTrainingToProduct(trainingMastery: Record<string, number>): void {
  try {
    const raw = localStorage.getItem('ore-goroku-30day');
    if (!raw) return;
    const state = JSON.parse(raw);

    let changed = false;
    for (const [key, level] of Object.entries(trainingMastery)) {
      if (!key.startsWith('goroku_')) continue;
      const parts = key.split('_');
      const daySlot = parts[1];
      const idx = parts[2];
      const productKey = `${daySlot}-${idx}`;
      const productVal = level >= 3 ? 3 : 0;

      if (state.mastery[productKey] !== productVal) {
        state.mastery[productKey] = productVal;
        changed = true;
      }
    }

    if (changed) {
      localStorage.setItem('ore-goroku-30day', JSON.stringify(state));
    }
  } catch { /* */ }
}

/**
 * Load product-storage mastery as Training mastery format.
 * Converts product keys "3-5" → training keys "goroku_3_5"
 */
export function loadProductMasteryAsTraining(): Record<string, number> {
  try {
    const raw = localStorage.getItem('ore-goroku-30day');
    if (!raw) return {};
    const state = JSON.parse(raw);
    const result: Record<string, number> = {};

    for (const [key, val] of Object.entries(state.mastery || {})) {
      const parts = key.split('-');
      if (parts.length === 2) {
        result[`goroku_${parts[0]}_${parts[1]}`] = val as number;
      }
    }
    return result;
  } catch {
    return {};
  }
}
