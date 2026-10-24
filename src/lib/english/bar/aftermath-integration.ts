/**
 * Silent Bartender -- boss aftermath integration.
 *
 * Reads the per-customer memory written by memory.ts (getCustomerOutcome)
 * and, for each boss the player has encountered, looks up the matching
 * entries in BOSS_AFTERMATHS. When the current night falls inside the
 * configured window after the boss night, the follow-up customer is
 * injected into the night pool.
 *
 * One-shot policy:
 *  - Each aftermath id fires at most once per save. Trigger night is
 *    persisted at `tonio-bar-aftermath-{id}`.
 *  - The boss-encounter night is recorded the first time this module
 *    sees a boss outcome at `tonio-bar-aftermath-seen-{bossId}`. This
 *    is necessary because memory.ts stores only a timestamp, not a
 *    night number. Aftermaths therefore time their window from the
 *    first night on which the boss outcome was observed by this
 *    module -- which in practice is the night AFTER the boss night
 *    (the earliest the player can possibly see a follow-up anyway).
 *
 * Non-invasive contract:
 *  - Does not edit any existing file.
 *  - Does not touch stats blob.
 *  - Uses its own localStorage key prefix `tonio-bar-aftermath-`.
 */

import type { Customer } from '@/data/english/bar/types';
import type { PlayerStats } from '@/lib/english/bar/storage';
import { getCustomerOutcome, type OutcomeType } from '@/lib/english/bar/memory';
import { BOSS_AFTERMATHS, type BossAftermath } from '@/data/english/bar/boss-aftermath';

// ═══════════════════════════════════════════════════════════
// Storage helpers
// ═══════════════════════════════════════════════════════════

const TRIGGER_PREFIX = 'tonio-bar-aftermath-';
const SEEN_PREFIX = 'tonio-bar-aftermath-seen-';

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function triggerKey(aftermathId: string): string {
    return `${TRIGGER_PREFIX}${aftermathId}`;
}

function seenKey(bossId: string): string {
    return `${SEEN_PREFIX}${bossId}`;
}

function readNumber(key: string): number | null {
    if (!hasWindow()) return null;
    try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) return null;
        const n = Number(raw);
        return Number.isFinite(n) ? n : null;
    } catch {
        return null;
    }
}

function writeNumber(key: string, value: number): void {
    if (!hasWindow()) return;
    try {
        window.localStorage.setItem(key, String(value));
    } catch {
        // quota / privacy -- drop silently
    }
}

// ═══════════════════════════════════════════════════════════
// Boss-night bookkeeping
// ═══════════════════════════════════════════════════════════

/**
 * Get (and if necessary, record) the night number we first saw this
 * boss as served/failed. Returns null if the boss has not been seen.
 *
 * The first call that observes a boss outcome on night N anchors the
 * aftermath window to N. Subsequent calls return the same N.
 */
function anchorBossNight(bossId: string, currentNight: number): number | null {
    const outcome = getCustomerOutcome(bossId);
    if (outcome === 'never-seen') return null;

    const existing = readNumber(seenKey(bossId));
    if (existing !== null) return existing;

    writeNumber(seenKey(bossId), currentNight);
    return currentNight;
}

function hasTriggered(aftermathId: string): boolean {
    return readNumber(triggerKey(aftermathId)) !== null;
}

function markTriggered(aftermathId: string, night: number): void {
    writeNumber(triggerKey(aftermathId), night);
}

// ═══════════════════════════════════════════════════════════
// Selection
// ═══════════════════════════════════════════════════════════

interface Pending {
    aftermath: BossAftermath;
    follow: Customer;
}

/**
 * Resolve which follow-up (if any) a single aftermath entry yields
 * given the current night and the boss outcome. Returns null if the
 * window has not opened yet, has already closed, the aftermath has
 * already fired, or no follow-up is defined for this outcome.
 */
function resolveAftermath(
    aftermath: BossAftermath,
    currentNight: number,
): Pending | null {
    if (hasTriggered(aftermath.id)) return null;

    const outcome: OutcomeType = getCustomerOutcome(aftermath.afterBossId);
    if (outcome === 'never-seen') return null;

    const bossNight = anchorBossNight(aftermath.afterBossId, currentNight);
    if (bossNight === null) return null;

    const earliest = bossNight + aftermath.minNightsLater;
    const latest = bossNight + aftermath.maxNightsLater;
    if (currentNight < earliest) return null;
    if (currentNight > latest) return null;

    // Pick the follow-up matching the outcome. 'timeout' is treated as
    // a failure (same beat pool as memory.ts).
    const failed = outcome === 'failed' || outcome === 'timeout';
    const follow = failed ? aftermath.onFailure : aftermath.onSuccess;
    if (!follow) return null;

    return { aftermath, follow };
}

/**
 * Return every aftermath that qualifies right now. Ordered by the
 * follow-up customer's difficulty (hardest first) so callers that
 * only want one can pick the most "loaded" encounter.
 */
function collectPending(currentNight: number): Pending[] {
    const out: Pending[] = [];
    for (const a of BOSS_AFTERMATHS) {
        const resolved = resolveAftermath(a, currentNight);
        if (resolved) out.push(resolved);
    }
    out.sort((x, y) => {
        const dx = x.follow.difficulty ?? 3;
        const dy = y.follow.difficulty ?? 3;
        return dy - dx;
    });
    return out;
}

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Given a built night and current stats, splice in any qualifying
 * boss-aftermath follow-up customers. Preserves night composition by
 * inserting at the phase boundary of the follow-up (late or closing).
 *
 * At most one aftermath per night, so a run with three pending
 * follow-ups unfolds across three separate nights rather than
 * stacking into one overwhelming shift.
 *
 * Persists the trigger on the aftermath entry that actually lands,
 * so it cannot fire a second time.
 */
export function maybeInjectAftermath(
    allCustomers: Customer[],
    stats: PlayerStats,
): Customer[] {
    // Treat totalNights as the "current night number" about to be played,
    // matching the convention used by easter-egg-integration.ts.
    const currentNight = stats.totalNights;

    const pending = collectPending(currentNight);
    if (pending.length === 0) return allCustomers;

    const pick = pending[0];
    const out = [...allCustomers];

    // Avoid duplicate injection if the follow-up is already in the pool.
    if (out.some(c => c.id === pick.follow.id)) {
        markTriggered(pick.aftermath.id, currentNight);
        return out;
    }

    const phase = pick.follow.phase ?? 'late';

    if (phase === 'closing') {
        // Append at the end; the closing slot is the final beat.
        out.push(pick.follow);
    } else {
        // 'late' -- insert before the first closing entry if any,
        // else append.
        const firstClosing = out.findIndex(c => (c.phase ?? 'peak') === 'closing');
        if (firstClosing >= 0) {
            out.splice(firstClosing, 0, pick.follow);
        } else {
            out.push(pick.follow);
        }
    }

    markTriggered(pick.aftermath.id, currentNight);
    return out;
}

/** Re-export for consumers that want the catalog directly. */
export { BOSS_AFTERMATHS };
