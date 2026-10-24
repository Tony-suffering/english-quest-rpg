/**
 * Silent Bartender -- small a11y helpers.
 *
 * prefers-reduced-motion: respects OS-level motion-reduction
 * setting for users who get motion-sick from bouncing cards or
 * spinning noren.
 *
 * These are utilities only. Components can opt in; the main game
 * animations are modest enough that reduced-motion is a graceful
 * fallback, not a requirement.
 */

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = () => setReduced(mq.matches);
        handler();
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    return reduced;
}

/** Returns '' when motion is allowed, 'none' to suppress an animation string. */
export function motionValue(value: string, reduced: boolean): string | undefined {
    return reduced ? undefined : value;
}
