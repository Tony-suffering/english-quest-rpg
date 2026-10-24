/**
 * Silent Bartender -- clock beats.
 *
 * Time-of-night contextual descriptions that can float as ambient
 * text above the subtitle. A lightweight "time marker" system.
 */

export interface ClockBeat {
    hourJst: number;  // 19 through 5 (next morning)
    text: string;
}

export const CLOCK_BEATS: ClockBeat[] = [
    { hourJst: 19, text: '19:30 - 暖簾を出したばかり。通りはまだ明るい。' },
    { hourJst: 20, text: '20:00 - 残業帰りの第一波。' },
    { hourJst: 21, text: '21:00 - 店内の会話が重なり始める。' },
    { hourJst: 22, text: '22:00 - 満席近い。笑い声、グラスの音、氷。' },
    { hourJst: 23, text: '23:00 - 終電を気にする顔が混じる。' },
    { hourJst: 0, text: '00:00 - 日付が変わった。残る客と、帰る客。' },
    { hourJst: 1, text: '01:00 - 終電後の残留組。空気が濃くなる。' },
    { hourJst: 2, text: '02:00 - 店の時計だけが時間を数えている気がする。' },
    { hourJst: 3, text: '03:00 - 照明が少し落ちる。夜の底。' },
    { hourJst: 4, text: '04:00 - もうすぐ始発。外の空気が変わる。' },
    { hourJst: 5, text: '05:00 - 閉店の時間。' },
];

/** Pick a clock beat by approximate hour. */
export function clockBeatForHour(hour: number): string {
    const match = CLOCK_BEATS.find(b => b.hourJst === hour);
    return match?.text ?? '';
}
