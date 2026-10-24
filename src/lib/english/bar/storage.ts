/**
 * Silent Bartender -- LocalStorage-backed persistent player stats.
 *
 * All keys live under the `tonio-bar-` namespace so they can be wiped
 * surgically without touching other app data. No external deps; safe to
 * import from both server and client (guards window access).
 */

import type { Mood } from '@/data/english/bar/types';

// ═══════════════════════════════════════════════════════════
// Storage keys (single source of truth)
// ═══════════════════════════════════════════════════════════
const NS = 'tonio-bar-';
export const STORAGE_KEYS = {
    stats: `${NS}stats`,
    version: `${NS}version`,
} as const;

/** Bump when the PlayerStats shape changes in a breaking way. */
const SCHEMA_VERSION = 1;

// ═══════════════════════════════════════════════════════════
// Public types
// ═══════════════════════════════════════════════════════════

/** Result of a single run (5-customer night). */
export interface NightResult {
    /** Number of customers satisfied (correct card). */
    success: number;
    /** Number of customers that left disappointed (wrong card / timeout). */
    failed: number;
    /** True if the player was caught speaking (game-over bust). */
    busted: boolean;
    /** Customer ids served (success or fail) this night, in order. */
    customerIdsSeen: string[];
    /** Map of mood -> { success, failed } observed this night. */
    moodOutcomes: Partial<Record<Mood, { success: number; failed: number }>>;
    /** Unix ms. */
    timestamp: number;
}

/** Cumulative per-mood record. */
export interface MoodRecord {
    success: number;
    failed: number;
}

/** Everything we persist about a player. */
export interface PlayerStats {
    schemaVersion: number;
    /** Total nights played (any outcome). */
    totalNights: number;
    /** Nights that ended with phase === 'ended' (not busted). */
    completedNights: number;
    /** Lifetime customers satisfied. */
    lifetimeArigatou: number;
    /** Lifetime customers who left disappointed. */
    lifetimeFailed: number;
    /** Lifetime bust count (voice detected). */
    lifetimeBusts: number;
    /** Longest streak of completed nights without a single bust. */
    longestNoBustStreak: number;
    /** Current nights-since-last-bust streak. */
    currentNoBustStreak: number;
    /** Per-mood cumulative success/fail totals. */
    moodStats: Partial<Record<Mood, MoodRecord>>;
    /** Set of customer ids ever served (success or fail). */
    seenCustomerIds: string[];
    /** Set of achievement ids ever unlocked. */
    unlockedAchievementIds: string[];
    /** Most recent night result (for UI continuity). Optional. */
    lastNight?: NightResult;
    /** Nights where player hit 5/5 perfect success. */
    perfectNights: number;
    /** Longest chain of consecutive correct cards within a single night ever. */
    longestCorrectChainEver: number;
    /** Consecutive busts (resets on any non-bust outcome). */
    consecutiveBusts: number;
}

// ═══════════════════════════════════════════════════════════
// Defaults / helpers
// ═══════════════════════════════════════════════════════════

function freshStats(): PlayerStats {
    return {
        schemaVersion: SCHEMA_VERSION,
        totalNights: 0,
        completedNights: 0,
        lifetimeArigatou: 0,
        lifetimeFailed: 0,
        lifetimeBusts: 0,
        longestNoBustStreak: 0,
        currentNoBustStreak: 0,
        moodStats: {},
        seenCustomerIds: [],
        unlockedAchievementIds: [],
        perfectNights: 0,
        longestCorrectChainEver: 0,
        consecutiveBusts: 0,
    };
}

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
}

function mergeWithDefaults(partial: Partial<PlayerStats> | null): PlayerStats {
    const base = freshStats();
    if (!partial) return base;
    return {
        ...base,
        ...partial,
        moodStats: { ...base.moodStats, ...(partial.moodStats ?? {}) },
        seenCustomerIds: Array.isArray(partial.seenCustomerIds) ? partial.seenCustomerIds : [],
        unlockedAchievementIds: Array.isArray(partial.unlockedAchievementIds) ? partial.unlockedAchievementIds : [],
        schemaVersion: SCHEMA_VERSION,
    };
}

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Load current stats. Returns a fresh (zeroed) object if nothing is stored,
 * storage is inaccessible, or the stored blob is corrupt.
 */
export function loadStats(): PlayerStats {
    if (!hasWindow()) return freshStats();
    try {
        const raw = window.localStorage.getItem(STORAGE_KEYS.stats);
        const parsed = safeParse<Partial<PlayerStats>>(raw);
        return mergeWithDefaults(parsed);
    } catch {
        return freshStats();
    }
}

/**
 * Persist stats. Silent no-op if storage is inaccessible (private mode, SSR).
 */
export function saveStats(stats: PlayerStats): void {
    if (!hasWindow()) return;
    try {
        window.localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
        window.localStorage.setItem(STORAGE_KEYS.version, String(SCHEMA_VERSION));
    } catch {
        // quota / privacy mode -- drop silently
    }
}

/**
 * Apply a finished night result to the persisted stats and return the
 * updated PlayerStats. This function does NOT evaluate achievements --
 * callers combine this with the achievements module.
 */
export function recordNight(night: NightResult): PlayerStats {
    const prev = loadStats();
    const next: PlayerStats = {
        ...prev,
        totalNights: prev.totalNights + 1,
        completedNights: prev.completedNights + (night.busted ? 0 : 1),
        lifetimeArigatou: prev.lifetimeArigatou + night.success,
        lifetimeFailed: prev.lifetimeFailed + night.failed,
        lifetimeBusts: prev.lifetimeBusts + (night.busted ? 1 : 0),
        consecutiveBusts: night.busted ? prev.consecutiveBusts + 1 : 0,
        currentNoBustStreak: night.busted ? 0 : prev.currentNoBustStreak + 1,
        seenCustomerIds: Array.from(new Set([...prev.seenCustomerIds, ...night.customerIdsSeen])),
        moodStats: mergeMoodStats(prev.moodStats, night.moodOutcomes),
        perfectNights: prev.perfectNights + (!night.busted && night.success >= 5 && night.failed === 0 ? 1 : 0),
        lastNight: night,
    };
    next.longestNoBustStreak = Math.max(prev.longestNoBustStreak, next.currentNoBustStreak);
    // longestCorrectChainEver is updated externally (caller passes in via
    // bumpCorrectChain below) since chain tracking is intra-run.
    saveStats(next);
    return next;
}

function mergeMoodStats(
    prev: Partial<Record<Mood, MoodRecord>>,
    nightOutcomes: Partial<Record<Mood, { success: number; failed: number }>>,
): Partial<Record<Mood, MoodRecord>> {
    const out: Partial<Record<Mood, MoodRecord>> = { ...prev };
    for (const key of Object.keys(nightOutcomes) as Mood[]) {
        const cur = out[key] ?? { success: 0, failed: 0 };
        const add = nightOutcomes[key]!;
        out[key] = {
            success: cur.success + add.success,
            failed: cur.failed + add.failed,
        };
    }
    return out;
}

/**
 * Record a longest-chain high-water mark (used mid-run or at night-end).
 */
export function bumpCorrectChain(chain: number): PlayerStats {
    const prev = loadStats();
    if (chain <= prev.longestCorrectChainEver) return prev;
    const next = { ...prev, longestCorrectChainEver: chain };
    saveStats(next);
    return next;
}

/**
 * Mark achievements as unlocked. Dedupes automatically. Returns updated stats.
 */
export function unlockAchievements(ids: string[]): PlayerStats {
    const prev = loadStats();
    if (ids.length === 0) return prev;
    const set = new Set(prev.unlockedAchievementIds);
    for (const id of ids) set.add(id);
    const next: PlayerStats = { ...prev, unlockedAchievementIds: Array.from(set) };
    saveStats(next);
    return next;
}

/**
 * Compute per-mood success rate (0..1). Returns null for moods never served.
 */
export function moodSuccessRate(stats: PlayerStats, mood: Mood): number | null {
    const rec = stats.moodStats[mood];
    if (!rec) return null;
    const total = rec.success + rec.failed;
    if (total === 0) return null;
    return rec.success / total;
}

/**
 * Wipe ALL player progress. Irrecoverable.
 */
export function clearStats(): void {
    if (!hasWindow()) return;
    try {
        window.localStorage.removeItem(STORAGE_KEYS.stats);
        window.localStorage.removeItem(STORAGE_KEYS.version);
    } catch {
        // ignore
    }
}
