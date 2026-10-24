/**
 * Silent Bartender -- night pacing curves.
 *
 * Describes the rhythm of a typical night by phase — how long the
 * player spends, how many customers, how rapid the advances are.
 * Used as reference for designers balancing new modes.
 */

export interface NightPaceProfile {
    mode: string;
    earlyCount: number;
    peakCount: number;
    lateCount: number;
    closingCount: number;
    decideSeconds: number;
    expectedDurationMin: number;
}

export const NIGHT_PACE_PROFILES: NightPaceProfile[] = [
    {
        mode: 'easy',
        earlyCount: 2, peakCount: 2, lateCount: 1, closingCount: 0,
        decideSeconds: 7,
        expectedDurationMin: 6,
    },
    {
        mode: 'normal',
        earlyCount: 2, peakCount: 2, lateCount: 2, closingCount: 1,
        decideSeconds: 5,
        expectedDurationMin: 10,
    },
    {
        mode: 'nightmare',
        earlyCount: 2, peakCount: 3, lateCount: 3, closingCount: 2,
        decideSeconds: 3,
        expectedDurationMin: 12,
    },
    {
        mode: 'speakeasy',
        earlyCount: 2, peakCount: 2, lateCount: 2, closingCount: 1,
        decideSeconds: 5,
        expectedDurationMin: 10,
    },
];

export function paceForMode(mode: string): NightPaceProfile | undefined {
    return NIGHT_PACE_PROFILES.find(p => p.mode === mode);
}
