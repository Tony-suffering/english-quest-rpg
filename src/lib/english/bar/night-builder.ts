/**
 * Silent Bartender — night builder.
 *
 * Composes a sequence of customers for a single night, respecting phase
 * order (early → peak → late → closing), avoiding repeats of recently
 * seen customers, and scaling difficulty slightly as the player gets
 * more lifetime practice.
 */

import type { Customer, NightPhase } from '@/data/english/bar/types';

interface BuildOptions {
    /** Current player stats: seen customer ids. Used to soft-avoid repeats. */
    seenIds?: string[];
    /** Number of lifetime nights played. Used for difficulty ramp. */
    lifetimeNights?: number;
    /** Target count per phase. Defaults roughly to 2 / 2 / 2 / 1 = 7. */
    counts?: Partial<Record<NightPhase, number>>;
}

const DEFAULT_COUNTS: Record<NightPhase, number> = {
    early: 2,
    peak: 2,
    late: 2,
    closing: 1,
};

const PHASE_ORDER: NightPhase[] = ['early', 'peak', 'late', 'closing'];

/** Shuffle a copy of the array (Fisher-Yates). */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Partition the full roster into phase buckets, falling back to
 * "any phase" if a customer has no phase annotation.
 */
function bucketByPhase(all: Customer[]): Record<NightPhase, Customer[]> {
    const buckets: Record<NightPhase, Customer[]> = {
        early: [], peak: [], late: [], closing: [],
    };
    for (const c of all) {
        if (c.phase && buckets[c.phase]) {
            buckets[c.phase].push(c);
        } else {
            // Untagged customer: spread them across peak+late as neutral filler
            buckets.peak.push(c);
        }
    }
    return buckets;
}

/**
 * Build a single night's queue.
 * - Honors per-phase counts (falls back when a bucket is small)
 * - Penalizes recently seen ids so the player sees variety
 * - Returns customers in the playable order (early first, closing last)
 */
export function buildNight(
    allCustomers: Customer[],
    options: BuildOptions = {}
): Customer[] {
    const { seenIds = [], lifetimeNights = 0, counts = {} } = options;
    const recent = new Set(seenIds.slice(-20)); // last 20 ids considered "recent"

    const buckets = bucketByPhase(allCustomers);
    const result: Customer[] = [];

    for (const phase of PHASE_ORDER) {
        const target = counts[phase] ?? DEFAULT_COUNTS[phase];
        if (target <= 0) continue;

        const pool = buckets[phase];
        if (pool.length === 0) continue;

        // Sort: unseen > seen, then random within each group
        const unseen = shuffle(pool.filter(c => !recent.has(c.id)));
        const seen = shuffle(pool.filter(c => recent.has(c.id)));
        const ordered = [...unseen, ...seen];

        // Difficulty ramp: after 5 nights, bias toward higher difficulty
        // within this phase (keeps veterans challenged, newbies comfortable).
        if (lifetimeNights >= 5) {
            ordered.sort((a, b) => (b.difficulty ?? 3) - (a.difficulty ?? 3));
        }

        result.push(...ordered.slice(0, target));
    }

    // Fallback: if buckets were too thin, top up with any remaining customers
    if (result.length < 5) {
        const already = new Set(result.map(c => c.id));
        const extras = shuffle(allCustomers.filter(c => !already.has(c.id)));
        result.push(...extras.slice(0, 5 - result.length));
    }

    return result;
}

/** Pure helper: given a customer, what phase is it (defaulting to 'peak'). */
export function phaseOf(c: Customer): NightPhase {
    return c.phase ?? 'peak';
}
