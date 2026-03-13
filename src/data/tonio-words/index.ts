export type { WordEntry, PhraseEntry, CategoryMeta, LevelMeta } from './types';
export { CATEGORIES, LEVELS } from './types';

import { LEVEL1_WORDS } from './level1-words';
import { LEVEL2_WORDS } from './level2-words';
import { LEVEL3_WORDS } from './level3-words';
import { PHRASES_DAY01_05 } from './phrases-day01-05';
import { PHRASES_DAY06_10 } from './phrases-day06-10';
import { PHRASES_DAY11_15 } from './phrases-day11-15';
import { PHRASES_DAY16_20 } from './phrases-day16-20';

export const ALL_WORDS = [
  ...LEVEL1_WORDS,
  ...LEVEL2_WORDS,
  ...LEVEL3_WORDS,
];

export const ALL_PHRASES = [
  ...PHRASES_DAY01_05,
  ...PHRASES_DAY06_10,
  ...PHRASES_DAY11_15,
  ...PHRASES_DAY16_20,
];

export { LEVEL1_WORDS, LEVEL2_WORDS, LEVEL3_WORDS };
export { PHRASES_DAY01_05, PHRASES_DAY06_10, PHRASES_DAY11_15, PHRASES_DAY16_20 };
