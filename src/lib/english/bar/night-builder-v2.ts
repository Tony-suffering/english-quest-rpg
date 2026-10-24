/**
 * Silent Bartender -- night builder v2 (continuity-aware).
 *
 * Composes a night that honors:
 *  1. Mode rules (count, difficulty filter, per-phase shape) via buildNightForMode.
 *  2. Narrative continuity: chains from continuity.ts bias the pool so
 *     that story payoffs follow their setups.
 *  3. Easter eggs: gated special appearances are spliced in per
 *     easter-egg-integration.ts, respecting cooldowns.
 *
 * The ordering of operations matters:
 *   reweight pool -> buildNightForMode -> maybeInjectEgg -> commit last-seen
 *
 * We do NOT edit night-builder.ts or modes.ts; this module composes them.
 */

import type { Customer } from '@/data/english/bar/types';
import type { PlayerStats } from '@/lib/english/bar/storage';
import { buildNightForMode, type GameMode } from '@/lib/english/bar/modes';
import { reweightPool, commitLastSeenIds } from '@/lib/english/bar/continuity';
import { maybeInjectEgg } from '@/lib/english/bar/easter-egg-integration';
import { maybeInjectAftermath } from '@/lib/english/bar/aftermath-integration';
import { getSeasonalBoss } from '@/data/english/bar/seasonal-bosses';

export interface BuildWithContinuityOptions {
    /** Override lifetime night counter; defaults to stats.totalNights. */
    lifetimeNights?: number;
    /** Override seenIds passed to buildNight; defaults to stats.seenCustomerIds. */
    seenIds?: string[];
    /** Set to true to skip easter-egg injection (e.g. for test builds). */
    skipEggs?: boolean;
    /** Set to true to skip writing the last-seen window (e.g. previews). */
    skipCommit?: boolean;
}

/**
 * Build a full night for the given mode, applying continuity chains
 * and easter-egg injection, and commit the last-seen window so the
 * NEXT night can react to what was served tonight.
 */
export function buildNightWithContinuity(
    allCustomers: Customer[],
    stats: PlayerStats,
    mode: GameMode,
    opts: BuildWithContinuityOptions = {},
): Customer[] {
    const lifetimeNights = opts.lifetimeNights ?? stats.totalNights;
    const seenIds = opts.seenIds ?? stats.seenCustomerIds;

    // 1. Reweight the candidate pool so chain payoffs surface early.
    const reweighted = reweightPool(allCustomers, stats);

    // 2. Let the mode shape the night (counts, difficulty, phases).
    const base = buildNightForMode(mode, reweighted, { seenIds, lifetimeNights });

    // 3. Optionally splice in an easter egg.
    const withEgg = opts.skipEggs ? base : maybeInjectEgg(stats, base);

    // 4. Splice in any pending boss-aftermath follow-up customer.
    const withAftermath = maybeInjectAftermath(withEgg, stats);

    // 5. Seasonal boss: 20% chance to replace the closing customer when in-season.
    //    Only for veterans (totalNights >= 15) with a non-bust streak.
    let withSeasonalBoss = withAftermath;
    if (lifetimeNights >= 15 && (stats.currentNoBustStreak ?? 0) >= 2 && Math.random() < 0.20) {
        const sboss = getSeasonalBoss();
        if (sboss && withSeasonalBoss.length > 0) {
            const lastIdx = withSeasonalBoss.length - 1;
            if (withSeasonalBoss[lastIdx].phase === 'closing') {
                withSeasonalBoss = [...withSeasonalBoss.slice(0, lastIdx), sboss];
            } else {
                withSeasonalBoss = [...withSeasonalBoss, sboss];
            }
        }
    }

    // 6. Commit the sliding window so next night's chains can react.
    if (!opts.skipCommit) {
        commitLastSeenIds(withSeasonalBoss.map(c => c.id));
    }

    return withSeasonalBoss;
}

/** Re-exports for convenience so callers can import from one place. */
export { reweightPool, commitLastSeenIds } from '@/lib/english/bar/continuity';
export { maybeInjectEgg } from '@/lib/english/bar/easter-egg-integration';
