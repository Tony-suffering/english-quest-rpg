/**
 * Silent Bartender -- snow-night atmospheric layer.
 */

export const SNOW_BEATS: string[] = [
    '外は雪。音が全部吸収されている。',
    '扉の下の隙間から、一筋の冷たい空気が流れ込んできた。',
    '客のコートの肩に、白いものが少し残っている。',
    '雪が窓ガラスに貼り付いて、少しずつ溶けていく。',
    '傘に積もった雪を、入口で払う客の音。',
    '店内の暖かさが、いつもより価値のある夜。',
    '遠くで、雪かき機の音が微かに聞こえた。',
    '天井の電球の光が、雪で反射して、店内が普段より明るい。',
];

export function pickSnowBeat(): string {
    return SNOW_BEATS[Math.floor(Math.random() * SNOW_BEATS.length)];
}
