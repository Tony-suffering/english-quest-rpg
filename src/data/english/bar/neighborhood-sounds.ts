/**
 * Ambient street sounds heard from inside the izakaya.
 * Fifteen short Japanese one-liners — trains, taxis, a temple bell, a dog —
 * surfaced rarely as atmospheric flavor. Hours use JST with post-midnight
 * values extending to 26 so "late" ranges can cross the day boundary.
 * pickNeighborhoodSound filters by plausible hour when provided.
 */

export interface NeighborhoodSound {
    id: string;
    body: string;
    source: 'train' | 'vehicle' | 'human' | 'animal' | 'bell' | 'weather' | 'vendor';
    plausibleHour?: [number, number];
}

export const NEIGHBORHOOD_SOUNDS: NeighborhoodSound[] = [
    {
        id: 'nbr-last-train',
        body: '遠くでガタンゴトン、終電が抜けていく。',
        source: 'train',
        plausibleHour: [22, 24],
    },
    {
        id: 'nbr-taxi-stop',
        body: '店先でタクシーのドアがパタン。',
        source: 'vehicle',
    },
    {
        id: 'nbr-drunk-laugh',
        body: '酔っ払いの笑い声が路地に跳ねる。',
        source: 'human',
        plausibleHour: [23, 26],
    },
    {
        id: 'nbr-dog-twice',
        body: 'ワン、ワン。二度鳴いて、犬は黙った。',
        source: 'animal',
    },
    {
        id: 'nbr-temple-bell',
        body: 'ゴーン。遠い寺の鐘が夜明けに溶ける。',
        source: 'bell',
        plausibleHour: [5, 5],
    },
    {
        id: 'nbr-rain-noren',
        body: '暖簾をパラパラと雨が叩く。',
        source: 'weather',
    },
    {
        id: 'nbr-plastic-bag',
        body: 'ビニール袋が風にカサカサと引きずられていく。',
        source: 'weather',
        plausibleHour: [23, 26],
    },
    {
        id: 'nbr-siren-far',
        body: '遠くでパトカーのサイレンが細く流れる。',
        source: 'vehicle',
        plausibleHour: [23, 26],
    },
    {
        id: 'nbr-couple-argue',
        body: '低い声でもめるカップルが通り過ぎる。',
        source: 'human',
        plausibleHour: [23, 26],
    },
    {
        id: 'nbr-bicycle-bell',
        body: 'チリン。自転車のベルが朝の空気を切る。',
        source: 'vehicle',
        plausibleHour: [5, 7],
    },
    {
        id: 'nbr-vending-chime',
        body: '隣の自販機がピコンと小さく鳴った。',
        source: 'vendor',
    },
    {
        id: 'nbr-yakiimo',
        body: '〜いしや〜きいも〜。声がゆっくり遠ざかる。',
        source: 'vendor',
        plausibleHour: [17, 20],
    },
    {
        id: 'nbr-geta-steps',
        body: 'カランコロン、下駄の音が夏の宵を渡る。',
        source: 'human',
        plausibleHour: [18, 22],
    },
    {
        id: 'nbr-kid-shout',
        body: '遠くの公園から子どもの叫び声。',
        source: 'human',
        plausibleHour: [10, 17],
    },
    {
        id: 'nbr-shutter-close',
        body: 'ガラガラ。通りの最後の居酒屋が鉄扉を下ろす。',
        source: 'human',
        plausibleHour: [23, 26],
    },
];

export function pickNeighborhoodSound(hour?: number): NeighborhoodSound {
    const pool =
        typeof hour === 'number'
            ? NEIGHBORHOOD_SOUNDS.filter((s) => {
                  if (!s.plausibleHour) return true;
                  const [lo, hi] = s.plausibleHour;
                  return hour >= lo && hour <= hi;
              })
            : NEIGHBORHOOD_SOUNDS;
    const source = pool.length > 0 ? pool : NEIGHBORHOOD_SOUNDS;
    const idx = Math.floor(Math.random() * source.length);
    return source[idx];
}
