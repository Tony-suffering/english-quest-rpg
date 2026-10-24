/**
 * Silent Bartender -- easter egg integration.
 *
 * Wires the gated-appearance eggs from easter-eggs.ts into a built
 * night. Given a freshly-built night and current player stats, this
 * module checks which eggs are pending, respects per-egg cooldowns
 * (tracked in localStorage), and splices qualifying eggs into the
 * night at the correct phase.
 *
 * Wiring policy:
 *  - The night is NOT lengthened; an egg replaces a same-phase entry
 *    when possible, otherwise it is appended at the end of its phase.
 *  - Only one egg per night. If multiple gates are met, the longest
 *    cooldown (most "special" egg) wins.
 *  - Cooldown is measured in stats.totalNights: if an egg triggered
 *    on night N with cooldown C, it cannot trigger again until
 *    stats.totalNights >= N + C.
 *
 * This module only reads/writes its own localStorage keys and does
 * not touch the core stats blob.
 */

import type { Customer, NightPhase } from '@/data/english/bar/types';
import type { PlayerStats } from '@/lib/english/bar/storage';
import { EASTER_EGGS, pendingEggs, type EasterEgg } from '@/data/english/bar/easter-eggs';

// ═══════════════════════════════════════════════════════════
// Storage helpers
// ═══════════════════════════════════════════════════════════

/** localStorage key for the night-number an egg last triggered on. */
function eggLastKey(id: string): string {
    return `tonio-bar-egg-${id}-last`;
}

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/** Read the last-trigger night for an egg, or null if never triggered. */
function readLastTrigger(id: string): number | null {
    if (!hasWindow()) return null;
    try {
        const raw = window.localStorage.getItem(eggLastKey(id));
        if (raw === null) return null;
        const n = Number(raw);
        return Number.isFinite(n) ? n : null;
    } catch {
        return null;
    }
}

/** Persist the night an egg triggered on so cooldown can be enforced. */
function writeLastTrigger(id: string, night: number): void {
    if (!hasWindow()) return;
    try {
        window.localStorage.setItem(eggLastKey(id), String(night));
    } catch {
        // quota / privacy mode -- drop silently
    }
}

// ═══════════════════════════════════════════════════════════
// Cooldown + selection
// ═══════════════════════════════════════════════════════════

/** True if this egg is eligible right now (gate met + cooldown expired). */
export function isEggEligible(egg: EasterEgg, stats: PlayerStats): boolean {
    if (!egg.gate(stats)) return false;
    const last = readLastTrigger(egg.id);
    if (last === null) return true;
    return stats.totalNights >= last + egg.cooldownNights;
}

/**
 * Pick one egg to fire this night, or null if none are eligible.
 * Preference order: longest cooldown first (most "rare / special"),
 * then highest difficulty as a tiebreaker.
 */
function selectEgg(stats: PlayerStats): EasterEgg | null {
    const eligible = pendingEggs(stats).filter(e => isEggEligible(e, stats));
    if (eligible.length === 0) return null;
    eligible.sort((a, b) => {
        if (b.cooldownNights !== a.cooldownNights) {
            return b.cooldownNights - a.cooldownNights;
        }
        return (b.customer.difficulty ?? 3) - (a.customer.difficulty ?? 3);
    });
    return eligible[0];
}

// ═══════════════════════════════════════════════════════════
// Splicing
// ═══════════════════════════════════════════════════════════

const PHASE_ORDER: NightPhase[] = ['early', 'peak', 'late', 'closing'];

/** First index in `night` whose customer lives in `phase`, or -1. */
function firstIndexOfPhase(night: Customer[], phase: NightPhase): number {
    for (let i = 0; i < night.length; i++) {
        const p = night[i].phase ?? 'peak';
        if (p === phase) return i;
    }
    return -1;
}

/**
 * Splice an egg customer into a built night at the phase it belongs to.
 *
 * Rules:
 *  - `closing` eggs go at the end of the closing block (last position).
 *  - `late` eggs replace the last entry in the late block if present,
 *    else they replace the last entry overall (before closing).
 *  - Any other phase replaces the first entry of its phase if present,
 *    else the egg is appended at the end of the night.
 *  - The night length is preserved when possible.
 */
export function spliceEgg(night: Customer[], egg: EasterEgg): Customer[] {
    const out = [...night];
    const eggCustomer = egg.customer;
    const eggPhase: NightPhase = eggCustomer.phase ?? 'closing';

    // Avoid duplicates: if this egg customer is already in the night, bail.
    if (out.some(c => c.id === eggCustomer.id)) return out;

    if (eggPhase === 'closing') {
        // Replace last closing entry; else append at end.
        let lastClosing = -1;
        for (let i = out.length - 1; i >= 0; i--) {
            const p = out[i].phase ?? 'peak';
            if (p === 'closing') { lastClosing = i; break; }
        }
        if (lastClosing >= 0) {
            out[lastClosing] = eggCustomer;
        } else {
            out.push(eggCustomer);
        }
        return out;
    }

    if (eggPhase === 'late') {
        // Replace last late entry; else insert before first closing; else append.
        let lastLate = -1;
        for (let i = out.length - 1; i >= 0; i--) {
            const p = out[i].phase ?? 'peak';
            if (p === 'late') { lastLate = i; break; }
        }
        if (lastLate >= 0) {
            out[lastLate] = eggCustomer;
            return out;
        }
        const firstClosing = firstIndexOfPhase(out, 'closing');
        if (firstClosing >= 0) {
            out.splice(firstClosing, 0, eggCustomer);
            return out;
        }
        out.push(eggCustomer);
        return out;
    }

    // early | peak fallthrough
    const idx = firstIndexOfPhase(out, eggPhase);
    if (idx >= 0) {
        out[idx] = eggCustomer;
        return out;
    }
    // Insert at the phase-correct boundary (before the next later phase).
    const myRank = PHASE_ORDER.indexOf(eggPhase);
    for (let i = 0; i < out.length; i++) {
        const rank = PHASE_ORDER.indexOf(out[i].phase ?? 'peak');
        if (rank > myRank) {
            out.splice(i, 0, eggCustomer);
            return out;
        }
    }
    out.push(eggCustomer);
    return out;
}

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Given current stats and a built night, maybe splice in one easter
 * egg. Returns the (possibly modified) night. Persists the trigger
 * night for cooldown tracking when an egg fires.
 *
 * Note: this reads stats.totalNights as the "current night number"
 * about to be played -- callers should invoke this BEFORE recording
 * the night result (which increments totalNights).
 */
export function maybeInjectEgg(stats: PlayerStats, night: Customer[]): Customer[] {
    const egg = selectEgg(stats);
    if (!egg) return night;

    const spliced = spliceEgg(night, egg);
    // Only persist if the egg actually ended up in the night.
    if (spliced.some(c => c.id === egg.customer.id)) {
        writeLastTrigger(egg.id, stats.totalNights);
    }
    return spliced;
}

/** Re-export for consumers that want the catalog directly. */
export { EASTER_EGGS };
