/**
 * Silent Bartender -- tuning constants.
 *
 * Every tunable number in one place. Most consumers still hardcode
 * their own values; use these when refactoring for consistency.
 */

export const TUNING = {
    // Mic
    MIC_CALIBRATION_MS: 2000,
    MIC_DEFAULT_THRESHOLD: 35,
    MIC_SUSTAIN_FRAMES: 6,
    MIC_MIN_THRESHOLD: 30,
    MIC_MAX_THRESHOLD: 140,
    MIC_HEADROOM: 25,

    // Timer
    TIMER_EASY_SEC: 7,
    TIMER_NORMAL_SEC: 5,
    TIMER_NIGHTMARE_SEC: 3,

    // Pacing
    TYPEWRITER_MS: 35,
    ENTER_TO_LISTENING_MS: 900,
    REACTING_TO_ADVANCE_MS: 3400,
    PHASE_SHIFT_MS: 2400,

    // Thresholds for gates
    UNLOCK_NIGHTMARE_AT: 3,
    UNLOCK_LISA_INTERVAL: 7,
    UNLOCK_FRAGMENTS_FIRST: 1,
    SEASONAL_BOSS_CHANCE: 0.20,
    DREAM_FLICKER_CHANCE: 0.05,
    RARE_EVENT_CHANCE: 0.05,
    MILESTONE_INTRO_CHANCE: 0.5,

    // Scoring (if added later)
    ARIGATOU_MILESTONE_SMALL: 10,
    ARIGATOU_MILESTONE_MEDIUM: 100,
    ARIGATOU_MILESTONE_LARGE: 1000,

    // Streaks
    STREAK_RECOGNIZED_AT: 3,
    STREAK_CELEBRATED_AT: 5,
    STREAK_LEGENDARY_AT: 15,
} as const;

export type TuningKey = keyof typeof TUNING;

/** Convenience getter. */
export function tuning<K extends TuningKey>(key: K): typeof TUNING[K] {
    return TUNING[key];
}
