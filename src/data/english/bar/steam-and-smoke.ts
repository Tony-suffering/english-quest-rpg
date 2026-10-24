/**
 * Atmospheric vapor observations for the Silent Bartender counter.
 * Twelve micro-beats of steam, breath, drifting smoke, and cold mist.
 * Shown rarely as ambient subtitles between customer turns.
 * Seasonal weighting favors winter, with a handful of autumn nights.
 */

export interface AtmosphericVapor {
    id: string;
    body: string;
    kind: 'steam' | 'smoke' | 'breath' | 'mist';
    season?: 'winter' | 'autumn' | 'any';
}

export const ATMOSPHERIC_VAPORS: AtmosphericVapor[] = [
    {
        id: 'vapor-1',
        body: '徳利の口から、白い湯気がゆっくり立ち上がる。',
        kind: 'steam',
        season: 'winter',
    },
    {
        id: 'vapor-2',
        body: '客の吐いた息が、肩越しに消えていく。',
        kind: 'breath',
        season: 'winter',
    },
    {
        id: 'vapor-3',
        body: '味噌汁の椀から、湯気がまっすぐに天井へ向かう。',
        kind: 'steam',
        season: 'winter',
    },
    {
        id: 'vapor-4',
        body: '引き戸が開く。冷たい空気と一緒に、白い息が一つ滑り込む。',
        kind: 'breath',
        season: 'winter',
    },
    {
        id: 'vapor-5',
        body: 'おでん鍋の蓋をずらすと、湯気が一気に広がって、棚の瓶を曇らせた。',
        kind: 'steam',
        season: 'winter',
    },
    {
        id: 'vapor-6',
        body: '燗をつけたぐい呑みの縁に、薄く湯気の輪ができている。',
        kind: 'steam',
        season: 'winter',
    },
    {
        id: 'vapor-7',
        body: '冷えたグラスの肌に、細かな霧が白く結んでいく。',
        kind: 'mist',
        season: 'any',
    },
    {
        id: 'vapor-8',
        body: '窓ガラスの内側が曇って、外の提灯の赤がにじんでいる。',
        kind: 'mist',
        season: 'autumn',
    },
    {
        id: 'vapor-9',
        body: '隅の席で、煙草の煙が天井の梁を撫でるように流れていく。',
        kind: 'smoke',
        season: 'any',
    },
    {
        id: 'vapor-10',
        body: '熱いほうじ茶を注ぐと、湯気が客の眼鏡を一瞬だけ曇らせた。',
        kind: 'steam',
        season: 'autumn',
    },
    {
        id: 'vapor-11',
        body: '外で客が振り返って何か言う。声より先に、白い息だけが見える。',
        kind: 'breath',
        season: 'winter',
    },
    {
        id: 'vapor-12',
        body: 'ビールの注がれたばかりのジョッキに、霧のような汗が浮いている。',
        kind: 'mist',
        season: 'autumn',
    },
];

export function pickVapor(season?: AtmosphericVapor['season']): AtmosphericVapor {
    let pool: AtmosphericVapor[] = ATMOSPHERIC_VAPORS;
    if (season) {
        const filtered = ATMOSPHERIC_VAPORS.filter(
            (v) => v.season === season || v.season === 'any',
        );
        if (filtered.length > 0) {
            pool = filtered;
        }
    }
    const index = Math.floor(Math.random() * pool.length);
    return pool[index]!;
}
