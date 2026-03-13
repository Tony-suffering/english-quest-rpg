export type { EverydayWordSeed } from './types';
export { WORD_CATEGORIES } from './types';
import type { EverydayWordSeed } from './types';
import { WORDS_001_020 } from './days-001-020';
import { WORDS_006_010 } from './days-006-010';
import { WORDS_011_015 } from './days-011-015';
import { WORDS_016_020 } from './days-016-020';
import { WORDS_021_025 } from './days-021-025';
import { WORDS_026_030 } from './days-026-030';
import { WORDS_031_035 } from './days-031-035';
import { WORDS_036_040 } from './days-036-040';
import { WORDS_041_045 } from './days-041-045';
import { WORDS_046_050 } from './days-046-050';
import { WORDS_051_055 } from './days-051-055';
import { WORDS_056_060 } from './days-056-060';
import { WORDS_061_065 } from './days-061-065';
import { WORDS_066_070 } from './days-066-070';
import { WORDS_071_075 } from './days-071-075';
import { WORDS_076_080 } from './days-076-080';
import { WORDS_081_085 } from './days-081-085';
import { WORDS_086_090 } from './days-086-090';
import { WORDS_091_095 } from './days-091-095';
import { WORDS_096_100 } from './days-096-100';
import { WORDS_101_105 } from './days-101-105';
import { WORDS_106_110 } from './days-106-110';
import { WORDS_111_115 } from './days-111-115';
import { WORDS_116_120 } from './days-116-120';
import { WORDS_121_125 } from './days-121-125';
import { WORDS_126_130 } from './days-126-130';
import { WORDS_131_135 } from './days-131-135';
import { WORDS_136_140 } from './days-136-140';
import { WORDS_141_145 } from './days-141-145';
import { WORDS_146_150 } from './days-146-150';
import { WORDS_151_155 } from './days-151-155';
import { WORDS_156_160 } from './days-156-160';
import { WORDS_161_165 } from './days-161-165';
import { WORDS_166_170 } from './days-166-170';
import { WORDS_171_175 } from './days-171-175';
import { WORDS_176_180 } from './days-176-180';
import { WORDS_181_185 } from './days-181-185';
import { WORDS_186_190 } from './days-186-190';
import { WORDS_191_195 } from './days-191-195';
import { WORDS_196_200 } from './days-196-200';

// Combine all word batches
export const ALL_EVERYDAY_WORDS: EverydayWordSeed[] = [
    ...WORDS_001_020,
    ...WORDS_006_010,
    ...WORDS_011_015,
    ...WORDS_016_020,
    ...WORDS_021_025,
    ...WORDS_026_030,
    ...WORDS_031_035,
    ...WORDS_036_040,
    ...WORDS_041_045,
    ...WORDS_046_050,
    ...WORDS_051_055,
    ...WORDS_056_060,
    ...WORDS_061_065,
    ...WORDS_066_070,
    ...WORDS_071_075,
    ...WORDS_076_080,
    ...WORDS_081_085,
    ...WORDS_086_090,
    ...WORDS_091_095,
    ...WORDS_096_100,
    ...WORDS_101_105,
    ...WORDS_106_110,
    ...WORDS_111_115,
    ...WORDS_116_120,
    ...WORDS_121_125,
    ...WORDS_126_130,
    ...WORDS_131_135,
    ...WORDS_136_140,
    ...WORDS_141_145,
    ...WORDS_146_150,
    ...WORDS_151_155,
    ...WORDS_156_160,
    ...WORDS_161_165,
    ...WORDS_166_170,
    ...WORDS_171_175,
    ...WORDS_176_180,
    ...WORDS_181_185,
    ...WORDS_186_190,
    ...WORDS_191_195,
    ...WORDS_196_200,
];

// Helper: get words for a specific day
export function getWordsForDay(daySlot: number): EverydayWordSeed[] {
    return ALL_EVERYDAY_WORDS.filter(w => w.day === daySlot);
}

// Total day count (highest day_slot value)
export function getMaxDay(): number {
    if (ALL_EVERYDAY_WORDS.length === 0) return 0;
    return Math.max(...ALL_EVERYDAY_WORDS.map(w => w.day));
}
