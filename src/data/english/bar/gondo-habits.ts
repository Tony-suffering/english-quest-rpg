/**
 * Gondo's small physical habits — subtitle-style observations the apprentice
 * catches in the quiet of the counter. Not intentions, only what is seen.
 * Unlocked gradually by night count so the bar deepens as time passes.
 * Meaning, when offered, is the apprentice's tentative guess, never a verdict.
 */

export interface GondoHabit {
    id: string;
    observation: string;
    meaning?: string;
    unlockAfterNights: number;
}

export const GONDO_HABITS: GondoHabit[] = [
    {
        id: 'habit-tokkuri-bottom',
        observation: '権藤は徳利を持つとき、必ず右手で底を支える。',
        meaning: 'ただの癖なのか、師匠の教えなのかは分からない。',
        unlockAfterNights: 5,
    },
    {
        id: 'habit-noren-fold',
        observation: '疲れた夜ほど、暖簾を畳む手が速い。',
        unlockAfterNights: 10,
    },
    {
        id: 'habit-counter-wipe',
        observation: 'カウンターを拭くとき、必ず奥から手前へ、一度だけ戻す。',
        meaning: '戻す一拭きに意味があるのか、聞けずにいる。',
        unlockAfterNights: 15,
    },
    {
        id: 'habit-breath-before-pour',
        observation: '酒を注ぐ直前、短く息を止める瞬間がある。',
        unlockAfterNights: 20,
    },
    {
        id: 'habit-eye-to-door',
        observation: '引き戸が鳴る前に、視線だけが入口へ向くことがある。',
        meaning: '気配を読んでいるのか、単に風が見えるのか。',
        unlockAfterNights: 30,
    },
    {
        id: 'habit-knife-align',
        observation: '包丁を置くたびに、刃の角度を同じ向きへ揃え直す。',
        unlockAfterNights: 40,
    },
    {
        id: 'habit-salary-man-refill',
        observation: 'スーツ姿の客には、頼まれる前におしぼりを替える。',
        meaning: '疲れた顔をよく見ているのだと思う。',
        unlockAfterNights: 50,
    },
    {
        id: 'habit-glass-tap',
        observation: '洗ったグラスを伏せる前に、指先で一度だけ縁を叩く。',
        unlockAfterNights: 70,
    },
    {
        id: 'habit-kettle-listen',
        observation: '湯が沸く直前、やかんの前で少しだけ動きが止まる。',
        meaning: '音を聴いているのかもしれない。',
        unlockAfterNights: 100,
    },
    {
        id: 'habit-young-customer-softening',
        observation: '若い客が入ってくると、肩の角度がほんの少し下がる。',
        unlockAfterNights: 130,
    },
    {
        id: 'habit-coin-stack',
        observation: '釣り銭を返すとき、硬貨を音を立てずに重ねる。',
        meaning: '金を扱う所作だけは、いつもより丁寧に見える。',
        unlockAfterNights: 170,
    },
    {
        id: 'habit-regular-nod',
        observation: '常連の顔を見ても、挨拶の前に一呼吸置く。',
        unlockAfterNights: 220,
    },
    {
        id: 'habit-closing-lamp',
        observation: '閉店前、提灯の灯を消す手だけは、いつもよりゆっくりだ。',
        meaning: '終わらせたくない夜があるのだろうか。',
        unlockAfterNights: 300,
    },
    {
        id: 'habit-rain-towel',
        observation: '雨の夜は、客が来る前に手拭いをもう一枚出しておく。',
        unlockAfterNights: 400,
    },
    {
        id: 'habit-drunken-silence',
        observation: '酔って声の大きくなった客の前では、逆に動きが静かになる。',
        meaning: '叱らずに、静けさで諭しているようにも見える。',
        unlockAfterNights: 500,
    },
    {
        id: 'habit-morning-prep-order',
        observation: '仕込みの順番は、何年経っても変わっていないらしい。',
        unlockAfterNights: 700,
    },
    {
        id: 'habit-last-bow',
        observation: '最後の客を送り出したあと、誰もいない戸口へ小さく頭を下げる。',
        meaning: '誰に向けた礼なのか、まだ訊けていない。',
        unlockAfterNights: 900,
    },
    {
        id: 'habit-counter-touch',
        observation: '店を閉めたあと、カウンターの木目を指先でひと撫でしてから照明を落とす。',
        unlockAfterNights: 1000,
    },
];

export function getUnlockedHabits(totalNights: number): GondoHabit[] {
    return GONDO_HABITS.filter((habit) => habit.unlockAfterNights <= totalNights);
}

export function pickHabitForTonight(totalNights: number): GondoHabit | null {
    const unlocked = getUnlockedHabits(totalNights);
    if (unlocked.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * unlocked.length);
    return unlocked[index];
}
