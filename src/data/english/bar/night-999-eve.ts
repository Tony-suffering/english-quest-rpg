/**
 * Silent Bartender -- Night 999 (the eve of 1000).
 *
 * A special atmospheric layer for the night before the finale.
 * Nothing mechanical changes — just the intro beat and a few
 * flavor strings hint that tomorrow is different.
 */

export const NIGHT_999_INTRO_BEATS: string[] = [
    'あと一夜で、千夜目になる。カウンターを拭く手が、いつもより丁寧に動いている気がする。',
    '暖簾を出す時、古い布の感触が指先に残った。千の夜、何度この動作を繰り返したか。',
    '権藤は、奥でずっと静かだ。今夜は特に、何か言いそうで、何も言わない気配。',
    '店の時計が刻む音が、いつもより一拍はっきり聞こえる。',
    '九百九十九夜目。数字を意識しないようにしていたが、今夜ばかりは胸にある。',
];

export const NIGHT_999_CLOSING_BEATS: string[] = [
    '最後の客が出て行った。明日、千夜目が来る。それだけだ。',
    '空のグラスを洗う手が、震えはしないが、いつもより少し緊張している。',
    '閉店の鍵を回す時、権藤が奥で一度だけ咳をした。それが今夜の合図だった。',
];

export function pickNight999Beat(position: 'intro' | 'closing'): string {
    const pool = position === 'intro' ? NIGHT_999_INTRO_BEATS : NIGHT_999_CLOSING_BEATS;
    return pool[Math.floor(Math.random() * pool.length)];
}

/** Shortcut: is tonight the eve of 1000? */
export function isEveOf1000(totalNights: number): boolean {
    return totalNights === 998; // next play will be night 999
}
