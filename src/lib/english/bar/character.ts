/**
 * Silent Bartender — playable character identity.
 *
 * Lets the page swap between the default (nameless apprentice) and リサ
 * on eligible nights. Persists the choice in localStorage so a refresh
 * mid-run doesn't flip the voice.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import type { GondoRoast } from '@/data/english/bar/types';
import {
    INTRO_BEATS,
    pickEnding as pickDefaultEnding,
    type Ending,
} from '@/data/english/bar/narrative';
import { GONDO_ROASTS } from '@/data/english/bar/roasts';
import {
    LISA_INTRO_BEATS,
    LISA_ROASTS,
    LISA_ENDINGS,
} from '@/data/english/bar/lisa-swap';

// ───────────────────────────────────────────────────────────
// Types & storage
// ───────────────────────────────────────────────────────────

export type Character = 'default' | 'lisa';

const STORAGE_KEY = 'tonio-bar-character';

function hasWindow(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStored(): Character {
    if (!hasWindow()) return 'default';
    try {
        const v = window.localStorage.getItem(STORAGE_KEY);
        if (v === 'lisa' || v === 'default') return v;
        return 'default';
    } catch {
        return 'default';
    }
}

function writeStored(c: Character): void {
    if (!hasWindow()) return;
    try {
        window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
        // ignore quota / privacy mode
    }
}

// ───────────────────────────────────────────────────────────
// Hook
// ───────────────────────────────────────────────────────────

export function useCharacter(): {
    character: Character;
    setCharacter: (c: Character) => void;
} {
    const [character, setCharacterState] = useState<Character>('default');

    // Hydrate from storage after mount to avoid SSR mismatch.
    useEffect(() => {
        setCharacterState(readStored());
    }, []);

    const setCharacter = useCallback((c: Character) => {
        setCharacterState(c);
        writeStored(c);
    }, []);

    return { character, setCharacter };
}

// ───────────────────────────────────────────────────────────
// Character-aware pickers
// ───────────────────────────────────────────────────────────

function pickFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** One random intro flavor line for the given character. */
export function getIntroBeatFor(character: Character): string {
    const pool = character === 'lisa' ? LISA_INTRO_BEATS : INTRO_BEATS;
    if (!pool || pool.length === 0) return '';
    return pickFrom(pool);
}

/**
 * Pick a roast line matching the given context, preferring the context
 * bucket and falling back to generic. Voice depends on character.
 */
export function pickRoastFor(
    character: Character,
    context: GondoRoast['context'] = 'generic',
): GondoRoast {
    const source = character === 'lisa' ? LISA_ROASTS : GONDO_ROASTS;
    const primary = source.filter((r) => r.context === context);
    const generic = source.filter((r) => r.context === 'generic');
    const pool = primary.length > 0 ? [...primary, ...generic] : source;
    return pickFrom(pool);
}

/**
 * Pick an ending for the given character. For Lisa, one ending per tier
 * is defined; we resolve the tier using the same logic as the default
 * pickEnding, then return Lisa's corresponding entry. For default, we
 * delegate to narrative.ts pickEnding so the existing pool is reused.
 */
export function pickEndingFor(
    character: Character,
    success: number,
    failed: number,
    total: number,
): Ending {
    if (character !== 'lisa') {
        return pickDefaultEnding(success, failed, total);
    }

    const rate = total > 0 ? success / total : 0;
    let tier: Ending['tier'];
    if (success === total && total > 0) tier = 'master';
    else if (rate >= 0.8) tier = 'pro';
    else if (rate >= 0.6) tier = 'ok';
    else if (rate >= 0.3) tier = 'rough';
    else tier = 'bust';

    const match = LISA_ENDINGS.find((e) => e.tier === tier);
    if (match) return match;
    // Safety fallback — should not happen since LISA_ENDINGS covers all tiers.
    return LISA_ENDINGS[0];
}
