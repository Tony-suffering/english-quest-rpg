/**
 * Apprentice Dreams — the dream-diary recorded upon waking.
 * Fragmentary recollections in which the bar bleeds into other places.
 * Distinct from dream-sequences.ts (gameplay flickers); this is the
 * apprentice's own handwritten record, often refusing interpretation.
 * Unlocked progressively as nights accumulate.
 */

export interface ApprenticeDream {
    id: string;
    dreamDescription: string;
    wakingDetail: string;
    interpretation?: string;
    unlockAfterNights: number;
}

export const APPRENTICE_DREAMS: ApprenticeDream[] = [
    {
        id: 'dream-infinite-trays',
        dreamDescription: 'トレイを運んでいる。\n運んでも、運んでも、カウンターに着かない。\n腕は重くないのに、歩いても景色が変わらない。',
        wakingDetail: '枕の横で、目覚ましがまだ鳴り終わらないうちに起きた。',
        interpretation: 'どう読めばいいか、分からないまま。',
        unlockAfterNights: 10,
    },
    {
        id: 'dream-gondo-child',
        dreamDescription: '客席に子どもが座っていた。\n顔だけが権藤さんだった。\n子どもはおしぼりで手を拭いて、何も注文しなかった。',
        wakingDetail: 'ベランダの鳩が鳴いていた。',
        interpretation: '書き留めたけれど、意味は追わないでおく。',
        unlockAfterNights: 20,
    },
    {
        id: 'dream-ice-counter',
        dreamDescription: 'カウンターが氷でできていた。\n拭いても拭いても濡れる。\n権藤さんは拭き方を直してくれた。',
        wakingDetail: '水道の蛇口が少し漏れていた。',
        unlockAfterNights: 35,
    },
    {
        id: 'dream-bar-at-sea',
        dreamDescription: '店が海に浮かんでいた。\n揺れないのに、グラスの中だけ揺れていた。\n誰も驚いていなかった。',
        wakingDetail: '窓の外で雨が降り始めていた。',
        interpretation: '意味を探すと、夢が逃げていく気がする。',
        unlockAfterNights: 50,
    },
    {
        id: 'dream-regular-never-leaves',
        dreamDescription: '常連が一人、席を立たなかった。\n閉店しても、電気を消しても、そこにいた。\n権藤さんは気にせず、戸締りをしていた。',
        wakingDetail: '台所の時計の秒針が妙に大きく聞こえた。',
        unlockAfterNights: 75,
    },
    {
        id: 'dream-empty-menu',
        dreamDescription: 'お品書きの字が全部消えていた。\n客は注文をして、権藤さんは頷いていた。\n俺だけが、何を出せばいいか分からなかった。',
        wakingDetail: '着信履歴に、知らない番号が一件あった。',
        interpretation: '意味は、きっと後で追いつく。',
        unlockAfterNights: 100,
    },
    {
        id: 'dream-rain-inside',
        dreamDescription: '店の中に雨が降っていた。\n床は濡れず、客も濡れず、俺のシャツだけが重くなっていく。\n権藤さんは傘を差していなかった。',
        wakingDetail: '本当に雨が降っていた。窓の桟が湿っていた。',
        unlockAfterNights: 130,
    },
    {
        id: 'dream-two-gondos',
        dreamDescription: '権藤さんが二人いた。\n一人はカウンターの内側、一人は外側。\n目を合わせないまま、同じ速さでグラスを拭いていた。',
        wakingDetail: '階下で誰かがドアを閉めた音がした。',
        interpretation: 'どう読めばいいか、分からないまま。',
        unlockAfterNights: 170,
    },
    {
        id: 'dream-bar-is-train',
        dreamDescription: '店が電車になっていた。\n客は乗っては降り、権藤さんだけが動かなかった。\n次の駅の名前が、読めなかった。',
        wakingDetail: '始発が遠くで走り出していた。',
        unlockAfterNights: 220,
    },
    {
        id: 'dream-lost-hands',
        dreamDescription: '自分の手が見えなくなっていた。\nグラスは持てる。布巾も動く。ただ、手だけがない。\n権藤さんは、いつも通り俺の手つきを直した。',
        wakingDetail: '右手が痺れていた。寝違えだろう。',
        interpretation: '解釈は、今日は棚に上げておく。',
        unlockAfterNights: 300,
    },
    {
        id: 'dream-childhood-bar',
        dreamDescription: '子どもの頃の台所が、店になっていた。\n母がカウンターに座って、権藤さんと話していた。\n二人は知り合いらしかった。',
        wakingDetail: '隣の家から、朝の味噌汁の匂いがした。',
        unlockAfterNights: 450,
    },
    {
        id: 'dream-closing-forever',
        dreamDescription: '閉店作業をしていた。\n電気を消しても、店は明るいままだった。\n権藤さんは、もう帰ったあとだった。',
        wakingDetail: 'カーテンの隙間から、薄く光が差していた。',
        interpretation: 'どう読めばいいか、分からないまま、それでも書き留めた。',
        unlockAfterNights: 650,
    },
];

export function getRecordedDreams(totalNights: number): ApprenticeDream[] {
    return APPRENTICE_DREAMS.filter((dream) => dream.unlockAfterNights <= totalNights);
}
