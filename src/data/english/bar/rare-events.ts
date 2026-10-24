/**
 * Silent Bartender -- rare events.
 *
 * Low-probability atmospheric events that can happen during a night.
 * Not customers, not cards — just things that happen in the room.
 * Typically surface as brief status-line text above the subtitle.
 */

export interface RareEvent {
    id: string;
    text: string;           // brief JP description
    weight: number;         // relative probability
    phase?: 'early' | 'peak' | 'late' | 'closing' | 'any';
}

export const RARE_EVENTS: RareEvent[] = [
    { id: 'evt-cat-visit', text: '外で猫が鳴いた。客が一人、振り返った。', weight: 5, phase: 'late' },
    { id: 'evt-light-flicker', text: 'カウンター奥の電球が、一度だけ暗くなってまた戻った。', weight: 3, phase: 'late' },
    { id: 'evt-song-fragment', text: '隣の店のカラオケから、一小節だけ聞こえた曲が、妙に馴染んだ。', weight: 4, phase: 'peak' },
    { id: 'evt-rain-begin', text: '窓の外で雨が降り始めた。誰も傘を持っていない。', weight: 3, phase: 'any' },
    { id: 'evt-clock-tick', text: '店の時計が、一瞬だけ逆に動いた気がした。', weight: 2, phase: 'closing' },
    { id: 'evt-phone-ring', text: '誰かの携帯が震えている。出る人はいない。', weight: 4, phase: 'late' },
    { id: 'evt-coin-drop', text: 'カウンターで硬貨がひとつ転がる音。どこから出たかはわからない。', weight: 3, phase: 'any' },
    { id: 'evt-door-wind', text: '誰も入っていないのに、扉の暖簾が内側に一度、揺れた。', weight: 2, phase: 'late' },
    { id: 'evt-silent-customer', text: '奥の席の客が、誰も話しかけていないのに笑った。', weight: 3, phase: 'peak' },
    { id: 'evt-candle-out', text: '隣席の蝋燭が、風もないのに消えた。', weight: 2, phase: 'closing' },
    { id: 'evt-radio-crackle', text: '使っていないラジオから、一瞬だけノイズが聞こえた。', weight: 2, phase: 'late' },
    { id: 'evt-photograph-falls', text: '棚の奥の写真が、少しだけズレた。誰も触っていない。', weight: 1, phase: 'closing' },
    { id: 'evt-bell-outside', text: '遠くで寺の鐘が鳴った。時刻より一分早い。', weight: 2, phase: 'closing' },
    { id: 'evt-second-dog', text: '犬がもう一匹、外に見えた気がしたが、次に見た時はいなかった。', weight: 1, phase: 'late' },
    { id: 'evt-menu-fluttering', text: 'メニュー表が、勝手に一ページめくれた。', weight: 2, phase: 'late' },
];

/** Pick a rare event weighted by probability, optionally filtered by phase. */
export function maybeRareEvent(
    phase: 'early' | 'peak' | 'late' | 'closing',
    chance = 0.05,
): RareEvent | null {
    if (Math.random() > chance) return null;
    const pool = RARE_EVENTS.filter(e => !e.phase || e.phase === 'any' || e.phase === phase);
    if (pool.length === 0) return null;
    const totalWeight = pool.reduce((s, e) => s + e.weight, 0);
    let r = Math.random() * totalWeight;
    for (const e of pool) {
        r -= e.weight;
        if (r <= 0) return e;
    }
    return pool[0];
}
