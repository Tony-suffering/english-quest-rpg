/**
 * Silent Bartender -- first-customer rules.
 *
 * The first customer of the night sets the tone. These modifiers
 * adjust the character selection for the opening slot based on
 * the current weather, day of week, and any pending aftermath.
 */

import type { Customer } from './types';

/**
 * Given a candidate pool and a list of hints, return a recommended
 * first customer. Pure — no storage access. Caller can use to sort
 * before passing to the night builder.
 */
export function pickFirstCustomerHint(
    pool: Customer[],
    hints: {
        weather?: 'clear' | 'rain' | 'cold' | 'humid' | 'snow' | 'windy';
        dayOfWeek?: number;
        isCold?: boolean;
        isStormy?: boolean;
    },
): Customer | undefined {
    // Rainy night: prefer a customer who references rain somehow
    if (hints.isStormy || hints.weather === 'rain') {
        const match = pool.find(c =>
            c.line.toLowerCase().includes('rain') ||
            c.beat?.includes('雨') ||
            c.id.includes('rain')
        );
        if (match) return match;
    }
    // Cold night: prefer someone who is visibly cold
    if (hints.isCold || hints.weather === 'cold' || hints.weather === 'snow') {
        const match = pool.find(c =>
            c.line.toLowerCase().includes('cold') ||
            c.line.toLowerCase().includes('warm') ||
            c.id.includes('warm') ||
            c.id.includes('cold')
        );
        if (match) return match;
    }
    // Monday morning: prefer someone coming off a hard start
    if (hints.dayOfWeek === 1) {
        const match = pool.find(c => c.mood === 'tired' && (c.difficulty ?? 2) <= 2);
        if (match) return match;
    }
    return undefined;
}
