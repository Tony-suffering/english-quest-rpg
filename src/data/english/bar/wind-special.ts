/**
 * Silent Bartender -- windy-night atmospheric layer.
 */

export const WIND_SPECIAL_BEATS: string[] = [
    '暖簾が一度、大きく揺れた。',
    '外で何かが倒れた音。誰も見に行かない。',
    '風の音が、店内の時計の音より大きくなった。',
    '扉が自然と少しだけ開いて、また閉じた。',
    '看板が風で鳴る音。慣れた客は気にしない。',
    '電線の風切り音が、カウンターまで届いている。',
    '走ってきた客が、「外、やばいよ」と言いかけて、目で制された。',
];

export function pickWindSpecialBeat(): string {
    return WIND_SPECIAL_BEATS[Math.floor(Math.random() * WIND_SPECIAL_BEATS.length)];
}
