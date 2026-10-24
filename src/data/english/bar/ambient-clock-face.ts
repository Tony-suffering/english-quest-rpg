/**
 * Silent Bartender -- ambient clock face.
 *
 * Tiny SVG-friendly constants for the counter's wall clock
 * rendering. The clock ticks live in CounterAmbience, but these
 * metrics let it render consistently.
 */

export const CLOCK_METRICS = {
    radius: 32,
    hourHandLength: 12,
    minuteHandLength: 20,
    secondHandLength: 24,
    centerDotRadius: 2,
    tickCount: 12,
    tickLength: 3,
    face: {
        stroke: '#B8860B',
        fill: '#FFFBEB',
        strokeWidth: 1,
    },
    hands: {
        hour: '#1C1917',
        minute: '#1C1917',
        second: '#B91C1C',
    },
} as const;

/** Compute the angle (degrees from top) for a given hand. */
export function handAngle(hour: number, minute: number, second: number, hand: 'hour' | 'minute' | 'second'): number {
    switch (hand) {
        case 'hour': return ((hour % 12) * 30) + (minute * 0.5);
        case 'minute': return minute * 6;
        case 'second': return second * 6;
    }
}
