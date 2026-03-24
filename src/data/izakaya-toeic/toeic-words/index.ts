// TOEIC Daily Words -- Data Index
import { ToeicWordEntry } from './types';
import { DAYS_01_10 } from './days-01-10';
import { DAYS_11_20 } from './days-11-20';
import { DAYS_21_31 } from './days-21-31';

export const TOEIC_WORD_ENTRIES: ToeicWordEntry[] = [
  ...DAYS_01_10,
  ...DAYS_11_20,
  ...DAYS_21_31,
];

export type { ToeicWordEntry, WordCategory, WordLevel, CharacterScene } from './types';
export { WORD_CATEGORY_META, WORD_LEVEL_META } from './types';
