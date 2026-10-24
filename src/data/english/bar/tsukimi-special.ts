/**
 * Silent Bartender -- tsukimi special.
 *
 * Mid-autumn moon-viewing has its own atmospheric layer in the
 * game. When it's 十五夜 (mid-September), the subtitle occasionally
 * notes the moon, and a specific cup placement is correct for any
 * customer who mentions the sky.
 */

export const TSUKIMI_BEATS: string[] = [
    '外の月が、窓枠に一度だけ納まった。',
    '窓ガラス越しの月光が、カウンターに線を引いた。',
    '月見客が一人、奥で静かに猪口を掲げた。',
    '外で、子供が「月、大きい！」と叫んで走って行った。',
    '月の光が、鏡の縁で一瞬だけ銀色に光った。',
];

/** Only in the JST mid-September (approximate) window. */
export function isTsukimiNight(date?: Date): boolean {
    const d = date ?? new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    const month = jst.getUTCMonth() + 1;
    const day = jst.getUTCDate();
    return month === 9 && day >= 12 && day <= 18;
}

export function pickTsukimiBeat(): string | null {
    if (!isTsukimiNight()) return null;
    return TSUKIMI_BEATS[Math.floor(Math.random() * TSUKIMI_BEATS.length)];
}
