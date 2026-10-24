/**
 * Seasonal poems scribbled by the apprentice in the back of their notebook.
 * Twelve short free-verse snippets — three per season — observing small
 * moments at the counter: lamp light on a glass, a customer's damp coat,
 * the quiet between orders. Not strict haiku; closer to captured breaths.
 * Some carry marginalia where the apprentice second-guesses their own lines.
 */

export interface SeasonalPoem {
    id: string;
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    body: string;
    notebookMarginalia?: string;
}

export const SEASONAL_POEMS: SeasonalPoem[] = [
    {
        id: 'poem-spring-lamp',
        season: 'spring',
        body: 'ランプの灯\n硝子の縁に\n桜の色が滲む',
        notebookMarginalia: '「滲む」より「寄る」か、まだ迷っている',
    },
    {
        id: 'poem-spring-coat',
        season: 'spring',
        body: '脱がれた上着\n袖口に雨の匂い\n春はまだ冷たい',
    },
    {
        id: 'poem-spring-hands',
        season: 'spring',
        body: '洗い物の手\n水の温度がゆるむ\n窓の外、つばめ',
        notebookMarginalia: 'つばめ、本当に見たか自信ない',
    },
    {
        id: 'poem-summer-ice',
        season: 'summer',
        body: '氷の鳴る音\n客の黙に混じって\n扇風機が回る',
    },
    {
        id: 'poem-summer-shirt',
        season: 'summer',
        body: '汗ばんだシャツの背\nカウンターに貼りつく\n誰も何も言わない',
        notebookMarginalia: '第三句、まだ迷っている',
    },
    {
        id: 'poem-summer-glass',
        season: 'summer',
        body: 'グラスの露\n指の跡が残る\n夏はこうして過ぎる',
    },
    {
        id: 'poem-autumn-lamp',
        season: 'autumn',
        body: 'ランプを少し落とす\n客の顔が柔らかく\n秋刀魚の脂の匂い',
    },
    {
        id: 'poem-autumn-coat',
        season: 'autumn',
        body: 'コートの肩\n枯葉が一枚\n払わずにそのまま座る',
        notebookMarginalia: 'これは俺の手が払いたかった、と書くべきか',
    },
    {
        id: 'poem-autumn-hands',
        season: 'autumn',
        body: '手のひらの節\n乾いてきた\n棚の奥の古い酒',
    },
    {
        id: 'poem-winter-lamp',
        season: 'winter',
        body: '灯だけが温い\n外は雪の気配\n硝子の奥で揺れる琥珀',
        notebookMarginalia: '「揺れる琥珀」少し気取りすぎか',
    },
    {
        id: 'poem-winter-coat',
        season: 'winter',
        body: '厚いコートの重み\n椅子が軋む\n客はまだ名乗らない',
    },
    {
        id: 'poem-winter-hands',
        season: 'winter',
        body: '俺の指先\n赤く凍えている\nそれでも硝子は磨く',
        notebookMarginalia: 'これは書き直さない',
    },
];

export function pickPoemForSeason(season: SeasonalPoem['season']): SeasonalPoem {
    const pool = SEASONAL_POEMS.filter((poem) => poem.season === season);
    if (pool.length === 0) {
        return SEASONAL_POEMS[0];
    }
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}
