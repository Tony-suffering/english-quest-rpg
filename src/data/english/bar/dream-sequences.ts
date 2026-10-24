/**
 * Silent Bartender -- dream sequences.
 *
 * Surreal 3am moments that occasionally interrupt a closing-phase
 * night. A brief beat (1-2 seconds visual) when the player might be
 * dreaming at the counter. Not a customer — just a flicker.
 *
 * Hook into CounterAmbience or the subtitle layer in future wiring.
 * Gated by 5% roll per customer during 'closing' phase.
 */

export interface DreamFlicker {
    id: string;
    text: string;      // very short (under 20 chars)
    duration: number;  // ms
}

export const DREAM_FLICKERS: DreamFlicker[] = [
    { id: 'dream-fish', text: '...魚が、天井を泳いだ気がした。', duration: 1800 },
    { id: 'dream-door', text: '...扉が、一度だけ勝手に開いた。', duration: 1800 },
    { id: 'dream-clock', text: '...時計が、一秒逆に動いた。', duration: 1600 },
    { id: 'dream-hands', text: '...手が、自分のものじゃないような気がした。', duration: 2000 },
    { id: 'dream-light', text: '...天井の灯りが、一瞬だけ青く。', duration: 1600 },
    { id: 'dream-voice', text: '...誰かの声が、ずっと遠くで笑った。', duration: 2000 },
    { id: 'dream-footsteps', text: '...店の外、誰かが歩き回っている。', duration: 1800 },
    { id: 'dream-wind', text: '...風が、店の中から外に向かって吹いた。', duration: 2000 },
    { id: 'dream-mirror', text: '...鏡の中の自分が、少し遅れて瞬きした。', duration: 2200 },
    { id: 'dream-water', text: '...誰もいないのに、コップの水が揺れた。', duration: 1800 },
    { id: 'dream-smell', text: '...匂いが、急に祖母の家のそれになった。', duration: 2000 },
    { id: 'dream-thought', text: '...この瞬間を、前にも見た気がする。', duration: 1800 },
];

/** Pick a flicker. Returns null if the random roll didn't fire. */
export function maybeFlicker(chance = 0.05): DreamFlicker | null {
    if (Math.random() > chance) return null;
    return DREAM_FLICKERS[Math.floor(Math.random() * DREAM_FLICKERS.length)];
}
