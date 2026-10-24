/**
 * Festival Nights observed at the Silent Bartender.
 * Ten traditional Japanese festivals shift the mood of the bar on specific
 * JST dates. Each night unlocks as the apprentice accumulates experience,
 * revealing how Gondo quietly marks the season with a dish, a bottle, or
 * a changed curtain. JST-gated lookup via todaysFestival().
 */

export interface FestivalNight {
    id: string;
    festivalName: string;
    approxMonth: number;
    approxDay: number;
    atmosphericShift: string;
    specialTouch: string;
    unlockAfterNights: number;
}

export const FESTIVAL_NIGHTS: FestivalNight[] = [
    {
        id: 'festival-setsubun',
        festivalName: '節分',
        approxMonth: 2,
        approxDay: 3,
        atmosphericShift:
            'カウンターの端に炒り豆の小皿。常連が一人、ポケットから落ちた豆を黙って数えている。\n外からは遠くの豆まきの声が途切れ途切れに聞こえ、暖簾が一度だけ大きく揺れる。',
        specialTouch: '権藤さんは恵方の方角を向いて、年に一度だけ鰯の塩焼きを一本だけ出す。',
        unlockAfterNights: 10,
    },
    {
        id: 'festival-hinamatsuri',
        festivalName: '雛祭り',
        approxMonth: 3,
        approxDay: 3,
        atmosphericShift:
            '女性客が普段より少し早い時間に増え、白酒の甘い匂いがカウンターに残る。\n誰かが小さな折り紙の雛を置いて帰り、権藤さんはそれを棚の奥に仕舞う。',
        specialTouch: '権藤さんは菱餅を薄く切り、炙って小皿で静かに出す。',
        unlockAfterNights: 20,
    },
    {
        id: 'festival-hanami',
        festivalName: '花見',
        approxMonth: 4,
        approxDay: 5,
        atmosphericShift:
            'お花見帰りの客が少し離れた桜を思い出しながら、コートの肩に花びらを一枚乗せて入ってくる。\n店内は普段より桜色の照明にほんの少しだけ寄り、会話のテンポがゆっくりになる。',
        specialTouch: '権藤さんは桜の塩漬けを浮かべた冷酒を、頼まれなくても一杯だけ出す。',
        unlockAfterNights: 35,
    },
    {
        id: 'festival-tango',
        festivalName: '端午の節句',
        approxMonth: 5,
        approxDay: 5,
        atmosphericShift:
            '昼に菖蒲湯に入った客が、髪の奥にまだ青い香りを残してカウンターに座る。\n窓の外で鯉のぼりが風に鳴り、普段より少しだけ男たちが無口になる。',
        specialTouch: '権藤さんは柏餅を半分に切り、皿の端にそっと添える。',
        unlockAfterNights: 50,
    },
    {
        id: 'festival-tanabata',
        festivalName: '七夕',
        approxMonth: 7,
        approxDay: 7,
        atmosphericShift:
            '入り口脇に小さな笹が一本だけ立ち、短冊は白いまま風に揺れている。\n常連たちは書くでもなく眺めるでもなく、ただ笹の下で杯を持ち直す。',
        specialTouch: '権藤さんは年に一度、奥の棚から藍色のガラス杯を出して冷酒を注ぐ。',
        unlockAfterNights: 70,
    },
    {
        id: 'festival-obon',
        festivalName: 'お盆',
        approxMonth: 8,
        approxDay: 15,
        atmosphericShift:
            '帰省しなかった客ばかりが揃い、いつもより口数が少ない。\n店の隅に盆提灯が一つ灯り、亡き常連の名前が誰かの口から自然にこぼれる。',
        specialTouch: '権藤さんは空いた席に小さな猪口を一つ置き、一度だけ酒を注ぐ。',
        unlockAfterNights: 90,
    },
    {
        id: 'festival-jugoya',
        festivalName: '十五夜',
        approxMonth: 9,
        approxDay: 15,
        atmosphericShift:
            '暖簾を少しだけ短くしてあり、窓の上半分から月が覗けるようになっている。\n客たちは振り返らずに、カウンターの鏡越しに月を見ている。',
        specialTouch: '権藤さんは月見団子を三つだけ皿に並べ、誰にでもなく差し出す。',
        unlockAfterNights: 120,
    },
    {
        id: 'festival-bunka',
        festivalName: '文化の日',
        approxMonth: 11,
        approxDay: 3,
        atmosphericShift:
            '昼に美術館や書店に寄った客が、紙袋を膝に置いたまま長く話す。\n店内にはいつもより少しだけ古いジャズが低く流れ、時間がゆっくり進む。',
        specialTouch: '権藤さんは暖簾を藍染の新しいものに替え、一杯目を無言で注ぐ。',
        unlockAfterNights: 160,
    },
    {
        id: 'festival-toji',
        festivalName: '冬至',
        approxMonth: 12,
        approxDay: 22,
        atmosphericShift:
            '柚子湯に入ってきた客の首筋から、かすかな柑橘の香りが立ちのぼる。\n外は一年で最も早く暮れ、店の灯りが普段より濃く見える夜になる。',
        specialTouch: '権藤さんは南瓜の煮物を小鉢でそっと出し、熱燗を少しだけ濃くする。',
        unlockAfterNights: 220,
    },
    {
        id: 'festival-omisoka',
        festivalName: '大晦日',
        approxMonth: 12,
        approxDay: 31,
        atmosphericShift:
            '閉店を知らせないまま、常連たちが普段より少し間を空けて現れる。\n遠くで除夜の鐘が鳴り始めると、会話は自然にやみ、誰も杯を置かない。',
        specialTouch: '権藤さんは年に一度しか開けない古い一升瓶の封を、静かに切る。',
        unlockAfterNights: 300,
    },
];

/**
 * Returns today's festival (JST) if the apprentice has unlocked it.
 * Matches entries within +-1 calendar day of the configured month/day.
 */
export function todaysFestival(totalNights: number, now?: Date): FestivalNight | null {
    const current = now ?? new Date();
    const jstMs = current.getTime() + 9 * 60 * 60 * 1000;
    const jst = new Date(jstMs);
    const month = jst.getUTCMonth() + 1;
    const day = jst.getUTCDate();

    for (const festival of FESTIVAL_NIGHTS) {
        if (festival.unlockAfterNights > totalNights) {
            continue;
        }
        if (festival.approxDay === -1) {
            if (festival.approxMonth === month) {
                return festival;
            }
            continue;
        }
        if (festival.approxMonth !== month) {
            continue;
        }
        if (Math.abs(festival.approxDay - day) <= 1) {
            return festival;
        }
    }
    return null;
}
