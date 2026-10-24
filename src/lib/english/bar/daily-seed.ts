/**
 * Silent Bartender — daily-seed helper.
 *
 * Produces a stable shuffle key for "tonight" so that, if the player
 * wants a pure-luck variant, the customer lineup is the same for
 * everyone in the same JST calendar day. Unused by the default flow
 * (buildNight() uses per-session randomness) but available for a
 * future "everyone gets the same night" mode.
 */

function jstDateKey(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}

/** Hash a string to a 32-bit unsigned int. FNV-1a. */
function fnv1a(str: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h;
}

/** Mulberry32 PRNG — deterministic given a seed. */
export function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Seed derived from today's JST date. Same across the globe for the same day. */
export function todaysSeed(): number {
    return fnv1a(jstDateKey());
}

/** Stable shuffle using a seeded PRNG; does not mutate input. */
export function seededShuffle<T>(arr: T[], rng: () => number): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
