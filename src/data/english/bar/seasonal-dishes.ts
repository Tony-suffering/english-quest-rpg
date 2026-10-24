/**
 * Silent Bartender -- seasonal dishes.
 *
 * The food Gondo's kitchen would actually make in a given season.
 * Used by the chalkboard menu component when seasonal mode is on.
 */

export interface SeasonalDish {
    en: string;
    ja: string;
    months: number[];  // months when this dish appears
    note?: string;
}

export const SEASONAL_DISHES: SeasonalDish[] = [
    // Spring (March-May)
    { en: 'Bamboo shoot simmered', ja: 'たけのこの煮物', months: [3, 4, 5], note: '春限定。やわらかい旬だけ。' },
    { en: 'Sakura ebi rice', ja: '桜エビのご飯', months: [3, 4], note: '桜の花と同じ時期。' },
    { en: 'Nanohana mustard', ja: '菜の花辛子和え', months: [3, 4] },

    // Early summer (June-August)
    { en: 'Cold tofu', ja: '冷奴', months: [6, 7, 8], note: '梅雨から盛夏まで。' },
    { en: 'Edamame (seasonal)', ja: '枝豆(夏限定の黒枝豆)', months: [7, 8] },
    { en: 'Hamo sushi', ja: '鱧寿司', months: [6, 7], note: '京都の夏の味。' },
    { en: 'Unagi ju', ja: 'うな重', months: [7, 8], note: '土用の丑の日前後。' },

    // Autumn (September-November)
    { en: 'Matsutake grilled', ja: '松茸焼き', months: [9, 10], note: '秋限定、価格は日によって変わる。' },
    { en: 'Sanma shio-yaki', ja: '秋刀魚の塩焼き', months: [9, 10, 11] },
    { en: 'Kabocha nimono', ja: 'かぼちゃの煮物', months: [10, 11] },

    // Winter (December-February)
    { en: 'Oden', ja: 'おでん', months: [11, 12, 1, 2, 3], note: '冬の定番。' },
    { en: 'Yose nabe', ja: '寄せ鍋', months: [12, 1, 2] },
    { en: 'Kaki furai', ja: 'カキフライ', months: [11, 12, 1, 2] },
    { en: 'Shirako ponzu', ja: '白子ポン酢', months: [12, 1, 2] },
    { en: 'Amazake', ja: '甘酒', months: [12, 1], note: '年末年始の温かさ。' },

    // Year-round staples
    { en: 'Grilled salt-fish', ja: '焼き魚塩', months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { en: 'Edamame (regular)', ja: '枝豆', months: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { en: "Chef's pick", ja: 'お任せ', months: [1,2,3,4,5,6,7,8,9,10,11,12] },
];

/** Get dishes available in the current JST month. */
export function getSeasonalDishes(date?: Date): SeasonalDish[] {
    const d = date ?? new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    const month = jst.getUTCMonth() + 1;
    return SEASONAL_DISHES.filter(d => d.months.includes(month));
}

/** Pick N random dishes for the chalkboard display. */
export function pickChalkboardDishes(n: number, date?: Date): SeasonalDish[] {
    const pool = getSeasonalDishes(date);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}
