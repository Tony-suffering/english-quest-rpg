/**
 * Silent Bartender -- per-customer memory.
 *
 * Separate from PlayerStats: keyed per customer id so a returning customer
 * can get a small in-character nod (or cooler greeting) based on the
 * player's last encounter with *them specifically*.
 *
 * Storage layout (localStorage):
 *   tonio-bar-memory-{customerId} -> JSON { outcome, ts }
 *
 * Why not roll this into PlayerStats? It is looked up per-customer at
 * spawn time; a flat key-per-id keeps reads cheap and avoids rewriting
 * the whole stats blob on every outcome.
 */

import type { Customer } from '@/data/english/bar/types';
import { MEMORY_BEATS } from '@/data/english/bar/memory-beats';

// ═══════════════════════════════════════════════════════════
// Public types
// ═══════════════════════════════════════════════════════════

export type OutcomeType = 'served' | 'failed' | 'timeout' | 'never-seen';

export interface CustomerMemoryEntry {
    outcome: Exclude<OutcomeType, 'never-seen'>;
    /** Unix ms of last encounter. */
    ts: number;
}

const KEY_PREFIX = 'tonio-bar-memory-';

// ═══════════════════════════════════════════════════════════
// Internal helpers
// ═══════════════════════════════════════════════════════════

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function storageKey(id: string): string {
    return `${KEY_PREFIX}${id}`;
}

function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
}

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Read the last outcome for a given customer id.
 * Returns 'never-seen' if no record exists or storage is unavailable.
 */
export function getCustomerOutcome(id: string): OutcomeType {
    if (!hasWindow()) return 'never-seen';
    try {
        const raw = window.localStorage.getItem(storageKey(id));
        const parsed = safeParse<CustomerMemoryEntry>(raw);
        if (!parsed) return 'never-seen';
        if (parsed.outcome === 'served' || parsed.outcome === 'failed' || parsed.outcome === 'timeout') {
            return parsed.outcome;
        }
        return 'never-seen';
    } catch {
        return 'never-seen';
    }
}

/**
 * Persist the most recent outcome for a customer. Silent no-op when
 * storage is unavailable (SSR, private mode, quota).
 */
export function recordOutcome(id: string, outcome: OutcomeType): void {
    if (!hasWindow()) return;
    if (outcome === 'never-seen') return; // do not record absence
    try {
        const entry: CustomerMemoryEntry = { outcome, ts: Date.now() };
        window.localStorage.setItem(storageKey(id), JSON.stringify(entry));
    } catch {
        // ignore
    }
}

/**
 * Wipe memory for one customer (useful in dev / reset flows).
 */
export function forgetCustomer(id: string): void {
    if (!hasWindow()) return;
    try { window.localStorage.removeItem(storageKey(id)); } catch { /* ignore */ }
}

/**
 * Pick a beat from MEMORY_BEATS deterministically per customer id so
 * the same regular does not get a different opener on every re-load in
 * the same session. Uses a cheap string hash.
 */
function pickBeat(id: string, pool: string[]): string | null {
    if (pool.length === 0) return null;
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    return pool[hash % pool.length];
}

/**
 * Return the subtitle line the customer should say this time, possibly
 * with a small returning-customer beat prepended.
 *
 * Crucially, this NEVER changes customer.cards or which index is correct.
 * It only decorates the subtitle. 'timeout' is treated as a cool miss
 * (same beat pool as 'failed').
 */
export function modulateLine(customer: Customer, outcome: OutcomeType): string {
    if (outcome === 'never-seen') return customer.line;

    const table = MEMORY_BEATS[customer.mood];
    if (!table) return customer.line;

    const pool = outcome === 'served' ? table.good : table.bad;
    const beat = pickBeat(customer.id, pool);
    if (!beat) return customer.line;

    // Prepend the beat with a single space separator. Keep the original
    // line intact so the puzzle read stays identical.
    return `${beat} ${customer.line}`;
}
