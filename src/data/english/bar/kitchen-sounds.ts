/**
 * Kitchen sounds heard through the wall from the counter side.
 * Subtitle-style fragments shown rarely during post-service delays.
 * The apprentice never sees the kitchen -- only hears it through the noren.
 * Onomatopoeia-forward, never explanatory. Just what leaks through.
 */

export interface KitchenSound {
    id: string;
    body: string;
    kind: 'metal' | 'water' | 'flame' | 'knife' | 'voice' | 'silence';
    plausibleHour?: [number, number];
}

export const KITCHEN_SOUNDS: KitchenSound[] = [
    {
        id: 'ks-1',
        body: 'トントントン、まな板の音',
        kind: 'knife',
        plausibleHour: [17, 22],
    },
    {
        id: 'ks-2',
        body: 'ジュッ、油の跳ねる気配',
        kind: 'flame',
        plausibleHour: [18, 23],
    },
    {
        id: 'ks-3',
        body: 'カチャ、小鉢を重ねる音',
        kind: 'metal',
    },
    {
        id: 'ks-4',
        body: 'シュー、蒸気が抜ける',
        kind: 'flame',
        plausibleHour: [17, 21],
    },
    {
        id: 'ks-5',
        body: '包丁を研ぐ音、低く',
        kind: 'knife',
        plausibleHour: [16, 18],
    },
    {
        id: 'ks-6',
        body: 'コトン、徳利を置く音',
        kind: 'metal',
        plausibleHour: [19, 23],
    },
    {
        id: 'ks-7',
        body: 'ざあっ、水を流す音',
        kind: 'water',
    },
    {
        id: 'ks-8',
        body: '低く笑う声、一瞬だけ',
        kind: 'voice',
        plausibleHour: [20, 23],
    },
    {
        id: 'ks-9',
        body: 'ゴトッ、鍋を下ろす重さ',
        kind: 'metal',
        plausibleHour: [17, 22],
    },
    {
        id: 'ks-10',
        body: 'お湯の立つ気配',
        kind: 'water',
    },
    {
        id: 'ks-11',
        body: 'ふっと音が止んだ',
        kind: 'silence',
    },
    {
        id: 'ks-12',
        body: 'コォン、何かを叩く余韻',
        kind: 'metal',
        plausibleHour: [22, 25],
    },
];

/**
 * Pick one kitchen sound at random.
 * If hour is given, keep entries with no plausibleHour or whose range includes hour.
 * Falls back to the full list when the filter yields nothing.
 */
export function pickKitchenSound(hour?: number): KitchenSound {
    let pool: KitchenSound[] = KITCHEN_SOUNDS;
    if (typeof hour === 'number') {
        const filtered = KITCHEN_SOUNDS.filter((s) => {
            if (!s.plausibleHour) return true;
            const [lo, hi] = s.plausibleHour;
            return hour >= lo && hour <= hi;
        });
        if (filtered.length > 0) {
            pool = filtered;
        }
    }
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}
