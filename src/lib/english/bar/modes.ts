/**
 * Silent Bartender -- difficulty / game modes.
 *
 * Defines the 4 modes (easy / normal / nightmare / speakeasy), their
 * parameters, and helpers to compose a night for a given mode.
 *
 * This module is pure: no React, no DOM. Safe to import from both
 * the page component and the ModeSelect UI.
 */

import type { Customer, NightPhase } from '@/data/english/bar/types';
import { buildNight } from '@/lib/english/bar/night-builder';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export type GameModeId = 'easy' | 'normal' | 'nightmare' | 'speakeasy';

export type BossPolicy = 'never' | 'conditional' | 'always';

export interface GameMode {
    id: GameModeId;
    label: string;
    description: string;
    customerCount: number;
    decideSeconds: number;
    bossPolicy: BossPolicy;
    micEnabled: boolean;
    difficultyFilter: (d: number) => boolean;
    /** Soft palette tint for UI accents. */
    tint: string;
    /** Nights required to unlock; 0 = always available. */
    unlockAfterNights: number;
    /** Optional override for per-phase counts; lets each mode shape the arc. */
    phaseCounts?: Partial<Record<NightPhase, number>>;
}

// ═══════════════════════════════════════════════════════════
// Modes
// ═══════════════════════════════════════════════════════════

export const MODES: GameMode[] = [
    {
        id: 'easy',
        label: '気楽な夜',
        description: '常連ばかりの静かな夜。失敗しても笑える。',
        customerCount: 5,
        decideSeconds: 7,
        bossPolicy: 'never',
        micEnabled: true,
        difficultyFilter: (d: number) => d >= 1 && d <= 3,
        tint: '#10B981',
        unlockAfterNights: 0,
        // Mostly early + peak, skip late/closing to keep it friendly
        phaseCounts: { early: 2, peak: 2, late: 1, closing: 0 },
    },
    {
        id: 'normal',
        label: '通常営業',
        description: '普段の夜。early→peak→late→closing の一連。',
        customerCount: 7,
        decideSeconds: 5,
        bossPolicy: 'conditional',
        micEnabled: true,
        difficultyFilter: (d: number) => d >= 1 && d <= 4,
        tint: '#B8860B',
        unlockAfterNights: 0,
        phaseCounts: { early: 2, peak: 2, late: 2, closing: 1 },
    },
    {
        id: 'nightmare',
        label: '悪夢の夜',
        description: '難客続きで時間も短い。最後に必ずボスが来る。',
        customerCount: 10,
        decideSeconds: 3,
        bossPolicy: 'always',
        micEnabled: true,
        difficultyFilter: (d: number) => d >= 3 && d <= 5,
        tint: '#B91C1C',
        unlockAfterNights: 3,
        phaseCounts: { early: 2, peak: 3, late: 3, closing: 2 },
    },
    {
        id: 'speakeasy',
        label: '密やか',
        description: '騒がしい環境用。マイク監視なしの純粋パズル。',
        customerCount: 7,
        decideSeconds: 5,
        bossPolicy: 'conditional',
        micEnabled: false,
        difficultyFilter: (d: number) => d >= 1 && d <= 4,
        tint: '#2563EB',
        unlockAfterNights: 0,
        phaseCounts: { early: 2, peak: 2, late: 2, closing: 1 },
    },
];

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

/** Fallback-safe lookup. */
export function getMode(id: string): GameMode {
    return MODES.find(m => m.id === id) ?? MODES[1]; // default: normal
}

/** Is this mode unlocked at this lifetime night count? */
export function isModeUnlocked(mode: GameMode, totalNights: number): boolean {
    return totalNights >= mode.unlockAfterNights;
}

/**
 * Build a night for the given mode.
 *
 * Strategy:
 *  1. Pre-filter the full roster by the mode's difficultyFilter.
 *  2. Call buildNight with the mode's per-phase counts.
 *  3. If buildNight underfills (small pool), top up from the filtered roster.
 *  4. If still short, fall back to the unfiltered roster.
 *  5. Trim to exactly customerCount.
 */
export function buildNightForMode(
    mode: GameMode,
    allCustomers: Customer[],
    opts: { seenIds: string[]; lifetimeNights: number }
): Customer[] {
    const filtered = allCustomers.filter(c => mode.difficultyFilter(c.difficulty ?? 3));
    const pool = filtered.length >= 4 ? filtered : allCustomers;

    const produced = buildNight(pool, {
        seenIds: opts.seenIds,
        lifetimeNights: opts.lifetimeNights,
        counts: mode.phaseCounts,
    });

    const chosen: Customer[] = [...produced];
    const chosenIds = new Set(chosen.map(c => c.id));

    // Top up from filtered if short
    if (chosen.length < mode.customerCount) {
        for (const c of filtered) {
            if (chosen.length >= mode.customerCount) break;
            if (!chosenIds.has(c.id)) {
                chosen.push(c);
                chosenIds.add(c.id);
            }
        }
    }

    // Final fallback: unfiltered roster
    if (chosen.length < mode.customerCount) {
        for (const c of allCustomers) {
            if (chosen.length >= mode.customerCount) break;
            if (!chosenIds.has(c.id)) {
                chosen.push(c);
                chosenIds.add(c.id);
            }
        }
    }

    return chosen.slice(0, mode.customerCount);
}
