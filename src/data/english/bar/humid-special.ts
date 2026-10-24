/**
 * Silent Bartender -- humid-night atmospheric layer.
 */

export const HUMID_BEATS: string[] = [
    '窓ガラスが曇っている。外の景色がぼやける。',
    '客のタオルが、いつもより早く湿る。',
    '氷の消費量だけが、異常に早い夜。',
    '店内の空気が重い。誰も長居したがらない。',
    'コップの水滴が、カウンターに小さな環を作っていく。',
    '扇風機の音が、普段より大きく聞こえる。',
];

export function pickHumidBeat(): string {
    return HUMID_BEATS[Math.floor(Math.random() * HUMID_BEATS.length)];
}
