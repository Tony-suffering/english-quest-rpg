/**
 * Silent Bartender -- regulars' signature days.
 *
 * Specific weekday + time-of-night signatures that feel like a
 * particular regular even without naming them. Quiet routine
 * observations the bartender might notice.
 */

export interface RegularRoutine {
    id: string;
    description: string;  // JP
    dayOfWeek: number;    // 0-6
    approximateTime: string;
}

export const REGULAR_ROUTINES: RegularRoutine[] = [
    { id: 'rr-mon-accountant', description: '月曜日の21:30、いつもの経理の人が来る。', dayOfWeek: 1, approximateTime: '21:30' },
    { id: 'rr-tue-widow', description: '火曜日の22:00、猪口を二つ注文する女性が来る。', dayOfWeek: 2, approximateTime: '22:00' },
    { id: 'rr-wed-doctor', description: '水曜日の23:00、救急のシフト明けの医師。', dayOfWeek: 3, approximateTime: '23:00' },
    { id: 'rr-thu-writer', description: '木曜日の深夜、締め切り持ちの作家。', dayOfWeek: 4, approximateTime: '01:00' },
    { id: 'rr-fri-salaryman-trio', description: '金曜日の20:00、いつも三人組の会社員が来る。', dayOfWeek: 5, approximateTime: '20:00' },
    { id: 'rr-sat-family', description: '土曜日の19:00、家族連れが一組だけ来る。', dayOfWeek: 6, approximateTime: '19:00' },
    { id: 'rr-sun-quiet-man', description: '日曜日の22:30、一人で静かに飲む常連。', dayOfWeek: 0, approximateTime: '22:30' },
];

export function getTodaysRoutines(): RegularRoutine[] {
    const d = new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    const dow = jst.getUTCDay();
    return REGULAR_ROUTINES.filter(r => r.dayOfWeek === dow);
}
