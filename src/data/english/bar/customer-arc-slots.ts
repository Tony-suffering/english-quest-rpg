/**
 * Silent Bartender -- customer arc slots.
 *
 * A helper that groups customers by a "dramatic arc slot": opener,
 * complication, climax, denouement. The night-builder can use this
 * to shape a night with a narrative shape (not just phase order).
 */

import type { Customer } from './types';

export type ArcSlot = 'opener' | 'complication' | 'climax' | 'denouement';

export const ARC_DEFAULTS: Record<ArcSlot, number> = {
    opener: 1,
    complication: 2,
    climax: 1,
    denouement: 1,
};

/**
 * Classify a customer into an arc slot by mood + difficulty + phase.
 * Not perfectly precise — heuristic used for ordering, not mechanics.
 */
export function classifyArcSlot(c: Customer): ArcSlot {
    const d = c.difficulty ?? 2;
    // Warm-up: easy + early
    if (c.phase === 'early' && d <= 2) return 'opener';
    // Big moments: boss-tier closing
    if (c.phase === 'closing' && d >= 4) return 'climax';
    // Winding down: heavy closing + lower difficulty
    if (c.phase === 'closing') return 'denouement';
    // Otherwise: middle complexity
    return 'complication';
}

/** Build an ordered queue by arc slot from a pool. */
export function buildByArc(
    pool: Customer[],
    counts: Partial<Record<ArcSlot, number>> = ARC_DEFAULTS,
): Customer[] {
    const buckets: Record<ArcSlot, Customer[]> = {
        opener: [], complication: [], climax: [], denouement: [],
    };
    for (const c of pool) buckets[classifyArcSlot(c)].push(c);
    const order: ArcSlot[] = ['opener', 'complication', 'climax', 'denouement'];
    const result: Customer[] = [];
    for (const slot of order) {
        const need = counts[slot] ?? ARC_DEFAULTS[slot];
        const shuffled = [...buckets[slot]].sort(() => Math.random() - 0.5);
        result.push(...shuffled.slice(0, need));
    }
    return result;
}
