/**
 * Silent Bartender -- cold-night atmospheric layer.
 *
 * Short cues played when the JST season is winter / when the
 * weather system rolls 'cold'.
 */

export const COLD_BEATS: string[] = [
    '店の奥から、暖房の小さな音が聞こえる。',
    '客が息をつくと、ほんの少しだけ白い。',
    'カウンターの上に置かれたグラスが、一瞬で曇った。',
    '客がコートを脱ぐのに、他の夜より時間がかかる。',
    '外気が入ってくる度に、湯呑みを持つ手が温かさを惜しむ。',
    '暖簾を閉めても、寒さは少し残る。',
];

export function pickColdBeat(): string {
    return COLD_BEATS[Math.floor(Math.random() * COLD_BEATS.length)];
}
