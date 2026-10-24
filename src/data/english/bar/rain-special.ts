/**
 * Silent Bartender -- rain-night atmospheric layer.
 *
 * When tonight's weather is 'rain' or 'stormy', supplemental beats
 * float into the subtitle area.
 */

export const RAIN_BEATS: string[] = [
    '外で、雨が一度だけ強く降った。',
    '暖簾が雨に濡れて、重くなった。',
    '客の傘が、立てかけた場所からゆっくり倒れた。',
    '外の水たまりに、ネオンが溶けている。',
    '雨の音が、店内の会話を優しく消していく。',
    '窓に雨粒が三つ並んで、少しずつ落ちていく。',
    '濡れたコートの匂いが、店内に馴染んでいく。',
    '雨足が強くなった瞬間、客全員が一瞬だけ静かになった。',
    '外で、誰かが傘を閉じて店の前で躊躇している気配がある。',
];

export function pickRainBeat(): string {
    return RAIN_BEATS[Math.floor(Math.random() * RAIN_BEATS.length)];
}
