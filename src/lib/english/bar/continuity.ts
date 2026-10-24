/**
 * Silent Bartender -- narrative continuity.
 *
 * Defines "story chains" connecting customers whose threads reference
 * each other. If the player served customer A recently, the chain
 * payoff B becomes much more likely to appear in the next night, and
 * is pulled toward the early part of its phase so it actually plays.
 *
 * Chains were derived by scanning customers.ts for naming pairs
 * (heartbroken -> heartbrokens-ex, the-dog -> dogs-owner, etc.)
 * and for explicit cross-references in tags and lines.
 *
 * This module is pure aside from one localStorage read/write for
 * the sliding "last seen" window.
 */

import type { Customer } from '@/data/english/bar/types';
import type { PlayerStats } from '@/lib/english/bar/storage';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export interface StoryChain {
    /** Customer id that must have been served recently to trigger this chain. */
    after: string;
    /** Customer ids that become more likely (and earlier) on the next night. */
    boost: string[];
    /** Optional: human-readable note for debugging / design review. */
    note?: string;
}

// ═══════════════════════════════════════════════════════════
// Chain catalog (derived from customers.ts)
// ═══════════════════════════════════════════════════════════

export const CHAINS: StoryChain[] = [
    {
        after: 'heartbroken',
        boost: ['the-wife', 'heartbrokens-ex'],
        note: 'wife comes looking; later, the ex shows up herself',
    },
    {
        after: 'ghost',
        boost: ['ghost-apology', 'ghosts-widow'],
        note: 'the ghost subplot pays off as apology + the widow who sits Tuesdays',
    },
    {
        after: 'the-dog',
        boost: ['dogs-owner', 'taxi-saw-dog'],
        note: "owner searching / cabbie swears the dog paid in coins",
    },
    {
        after: 'alien',
        boost: ['alien-return'],
        note: 'alien returns on a later night',
    },
    {
        after: 'wedding-dress',
        boost: ['window-washer', 'bride-returns'],
        note: 'washer saw her leave; a year later she comes back',
    },
    {
        after: 'translator-stuck',
        boost: ['translator-deadline'],
        note: "editor chases the translator's missing word",
    },
    {
        after: 'fisherman-dawn',
        boost: ['fishermans-son'],
        note: 'son arrives after the boat left',
    },
    {
        after: 'worlds-worst-sommelier',
        boost: ['sommelier-revenge'],
        note: 'the real sommelier comes to set the record straight',
    },
    {
        after: 'edo-timer',
        boost: ['time-slip'],
        note: 'the samurai sent another visitor',
    },
    {
        after: 'existential-philosopher',
        boost: ['former-self', 'dream-visitor'],
        note: 'philosophy thread -> who you used to be / the dreamer',
    },
    {
        after: 'regulars-daughter',
        boost: ['regular-usual'],
        note: "the regular himself appears after his daughter's visit",
    },
    {
        after: 'cryptid-hunter',
        boost: ['hunters-subject'],
        note: "the kappa comes looking for the man with the camera",
    },
];

// ═══════════════════════════════════════════════════════════
// Last-seen window (localStorage)
// ═══════════════════════════════════════════════════════════

const LAST_SEEN_KEY = 'tonio-bar-last-seen-ids';
const LAST_SEEN_MAX = 5;

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/** Read the sliding window of recently-seen customer ids across nights. */
export function readLastSeenIds(): string[] {
    if (!hasWindow()) return [];
    try {
        const raw = window.localStorage.getItem(LAST_SEEN_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((x): x is string => typeof x === 'string').slice(-LAST_SEEN_MAX);
    } catch {
        return [];
    }
}

/**
 * Push the ids of the night just built onto the sliding window and
 * persist. The oldest entries beyond LAST_SEEN_MAX are dropped.
 */
export function commitLastSeenIds(newIds: string[]): void {
    if (!hasWindow()) return;
    try {
        const prev = readLastSeenIds();
        const merged = [...prev, ...newIds].slice(-LAST_SEEN_MAX);
        window.localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(merged));
    } catch {
        // quota / privacy mode -- drop silently
    }
}

// ═══════════════════════════════════════════════════════════
// Reweighting
// ═══════════════════════════════════════════════════════════

/**
 * Compute per-id boost multipliers based on which "after" customers
 * were seen recently. An id can stack boosts from multiple chains.
 */
function buildBoostMap(recentIds: Set<string>): Map<string, number> {
    const m = new Map<string, number>();
    for (const chain of CHAINS) {
        if (!recentIds.has(chain.after)) continue;
        for (const target of chain.boost) {
            // ~3x likelihood per chain; stackable if multiple fire.
            const prev = m.get(target) ?? 1;
            m.set(target, prev * 3);
        }
    }
    return m;
}

/**
 * Reorder a pool of candidate customers so that chain payoffs surface
 * earlier in downstream phase-bucket sampling. Does not change the
 * set of customers, only their order.
 *
 * Implementation: stable sort by a score -- boosted ids first,
 * stronger boosts first, originals otherwise preserve order.
 *
 * This accepts stats for future use (e.g. personalized chains off
 * mood history) but the default implementation only needs the
 * sliding last-seen window.
 */
export function reweightPool(pool: Customer[], _stats: PlayerStats): Customer[] {
    const recent = new Set(readLastSeenIds());
    if (recent.size === 0) return pool;

    const boosts = buildBoostMap(recent);
    if (boosts.size === 0) return pool;

    // Stable-ish reorder: decorate with original index, sort by boost desc,
    // then original index asc so non-boosted items keep relative order.
    const decorated = pool.map((c, i) => ({
        c,
        i,
        score: boosts.get(c.id) ?? 1,
    }));

    decorated.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.i - b.i;
    });

    return decorated.map(d => d.c);
}

/**
 * Returns the list of chain-payoff ids currently "armed" by the
 * sliding last-seen window. Useful for debugging UI badges.
 */
export function activeChainTargets(): string[] {
    const recent = new Set(readLastSeenIds());
    const targets = new Set<string>();
    for (const chain of CHAINS) {
        if (recent.has(chain.after)) {
            for (const t of chain.boost) targets.add(t);
        }
    }
    return Array.from(targets);
}
