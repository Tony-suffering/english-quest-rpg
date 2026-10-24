/**
 * Silent Bartender -- atmospheric wind beats.
 *
 * Sporadic short sensory cues that float above the subtitle during
 * phase transitions. Very brief, almost subliminal. Augments the
 * weather/time-of-night ambient layer.
 */

export const WIND_BEATS: string[] = [
    '...暖簾の端が、かすかに揺れた。',
    '...外を、誰かの足音が通り過ぎていった。',
    '...店の中の空気が、一度だけ入れ替わった気がした。',
    '...遠くで、電車が走り抜ける音。',
    '...窓のガラスに、雨粒が一つだけ当たった。',
    '...カウンターの上のメモが、ほんの少し動いた。',
    '...隣の店からカラオケが一小節だけ漏れて、消えた。',
    '...天井の灯りが、一瞬だけ揺れた。',
    '...店の外、街灯が一度瞬いた。',
    '...冷蔵庫のモーターが、止まった。また動く。',
    '...自分の心臓の音が、一度だけ大きく感じた。',
    '...扉の暖簾が、誰も通っていないのに、内側に揺れた。',
];

export function pickWindBeat(): string {
    return WIND_BEATS[Math.floor(Math.random() * WIND_BEATS.length)];
}
