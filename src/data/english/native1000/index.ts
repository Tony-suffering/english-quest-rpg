// Native 1000: ネイティブが毎日使ってるのに、教科書に載ってない1000の表現
// 100 days x 10 expressions/day, starting 2026-03-24

import { BATCH_001 } from './batch-001';
import { BATCH_002 } from './batch-002';
import { BATCH_003 } from './batch-003';
import { BATCH_004 } from './batch-004';
import { BATCH_005 } from './batch-005';
import { BATCH_006 } from './batch-006';
import { BATCH_007 } from './batch-007';
import { BATCH_008 } from './batch-008';
import { BATCH_009 } from './batch-009';
import { BATCH_010 } from './batch-010';

export interface NativeEntry {
    id: string;
    expression: string;
    meaning: string;
    level: 1 | 2 | 3;
    category: NativeCategory;
    why: string;
    example: {
        a: string;
        b: string;
    };
    note?: string;
}

export type NativeCategory =
    | 'reaction'
    | 'opinion'
    | 'emotion'
    | 'connector'
    | 'descriptor'
    | 'social';

export const CATEGORY_META: Record<NativeCategory, {
    label: string;
    labelEn: string;
    color: string;
    bg: string;
}> = {
    reaction:   { label: 'リアクション', labelEn: 'Reaction', color: '#D4AF37', bg: '#FEF9E7' },
    opinion:    { label: '意見表明', labelEn: 'Opinion', color: '#3B82F6', bg: '#EFF6FF' },
    emotion:    { label: '感情・状態', labelEn: 'Emotion', color: '#EC4899', bg: '#FDF2F8' },
    connector:  { label: '会話の接続', labelEn: 'Connector', color: '#10B981', bg: '#ECFDF5' },
    descriptor: { label: '描写・形容', labelEn: 'Descriptor', color: '#8B5CF6', bg: '#F5F3FF' },
    social:     { label: '社会的駆け引き', labelEn: 'Social', color: '#F59E0B', bg: '#FFFBEB' },
};

export const LEVEL_META: Record<1 | 2 | 3, { label: string; labelEn: string; color: string; bg: string }> = {
    1: { label: '日常必須', labelEn: 'Daily', color: '#16A34A', bg: '#F0FDF4' },
    2: { label: 'ナチュラル', labelEn: 'Natural', color: '#D97706', bg: '#FFFBEB' },
    3: { label: '上級会話', labelEn: 'Advanced', color: '#DC2626', bg: '#FEF2F2' },
};

export const NATIVE_1000: NativeEntry[] = [
    ...BATCH_001,
    ...BATCH_002,
    ...BATCH_003,
    ...BATCH_004,
    ...BATCH_005,
    ...BATCH_006,
    ...BATCH_007,
    ...BATCH_008,
    ...BATCH_009,
    ...BATCH_010,
];

export const TOTAL_DAYS = 100;
export const START_DATE = new Date(2026, 2, 24); // March 24, 2026

export function getEntriesForDay(dayNum: number): NativeEntry[] {
    const start = (dayNum - 1) * 10;
    return NATIVE_1000.slice(start, start + 10);
}

export function getCategoryStats(): Record<NativeCategory, number> {
    const stats = { reaction: 0, opinion: 0, emotion: 0, connector: 0, descriptor: 0, social: 0 };
    for (const e of NATIVE_1000) stats[e.category]++;
    return stats;
}

export function getLevelStats(): Record<1 | 2 | 3, number> {
    const stats = { 1: 0, 2: 0, 3: 0 };
    for (const e of NATIVE_1000) stats[e.level]++;
    return stats;
}
