/**
 * Bar Smells — Sensory Atmospheric Catalogue
 *
 * Fifteen specific smells that define the Silent Bartender across the year.
 * The apprentice identifies them progressively over nights of quiet service,
 * each one layered with sub-notes hiding underneath the dominant character.
 * Used as atmospheric subtitles and sensory beats during gameplay.
 */

export interface BarSmell {
    id: string;
    smellLabel: string;
    description: string;
    layeredNotes: string;
    mostNoticeableHour: [number, number];
    unlockAfterNights: number;
}

export const BAR_SMELLS: BarSmell[] = [
    {
        id: 'smell-nitsuke-dashi',
        smellLabel: '染みついた煮付けの出汁',
        description: '壁の木目にまで沁み込んだ、何十年分もの煮付けの残り香。店を開けた瞬間にまず鼻をつく、この店の骨格のような匂い。',
        layeredNotes: 'その奥に、新生姜のかすかな匂いと、砂糖が焦げかけた甘い影が混ざっている。',
        mostNoticeableHour: [17, 19],
        unlockAfterNights: 3,
    },
    {
        id: 'smell-old-wood',
        smellLabel: '古い木の匂い',
        description: 'カウンターと柱に刻まれた、半世紀分の乾いた木の香り。湿度が上がる夕暮れどきに少しだけ濃くなる。',
        layeredNotes: '奥には、磨き込まれた亜麻仁油のわずかな甘みと、古い紙のような乾いた気配が潜んでいる。',
        mostNoticeableHour: [16, 18],
        unlockAfterNights: 8,
    },
    {
        id: 'smell-cold-isshobin',
        smellLabel: '冷えた一升瓶の底',
        description: '冷蔵庫から出したばかりの一升瓶の肩に付く、米の匂いとガラスの冷気が混ざった独特の香り。',
        layeredNotes: 'その底に、蔵の土壁のような古い麹の気配と、金属の栓のかすかな鉄の匂いが沈んでいる。',
        mostNoticeableHour: [18, 20],
        unlockAfterNights: 15,
    },
    {
        id: 'smell-fried-oil-cooling',
        smellLabel: '揚げ油が冷えたばかりの匂い',
        description: '仕込みの終わった鍋から立ちのぼる、熱を失いはじめた油の甘く重い香り。厨房の境目に層を作って漂う。',
        layeredNotes: '奥に、衣の欠片が焦げた苦みと、下ろしたばかりの大根の青い匂いがわずかに混じっている。',
        mostNoticeableHour: [17, 18],
        unlockAfterNights: 25,
    },
    {
        id: 'smell-winter-coat-naphthalene',
        smellLabel: '客の冬のコートから漂うナフタリン',
        description: '冬、扉が開いた瞬間に一緒に入り込んでくる、防虫剤と厚いウールが混じった匂い。暖簾の内側に少しの間だけ留まる。',
        layeredNotes: 'その下に、客の家の暖房の焦げたような熱気と、たたんだマフラーに残る外気の冷たさが重なっている。',
        mostNoticeableHour: [18, 19],
        unlockAfterNights: 40,
    },
    {
        id: 'smell-summer-tatami-humidity',
        smellLabel: '夏の畳の湿気',
        description: '奥座敷の畳が梅雨から夏にかけて吸い込んだ、重たくこもった湿り気の匂い。扇風機を回すと一度だけふわりと濃くなる。',
        layeredNotes: '奥には、い草の青い残り香と、床下から上がってくる土の冷たい気配が隠れている。',
        mostNoticeableHour: [19, 22],
        unlockAfterNights: 55,
    },
    {
        id: 'smell-ashtray-bottom',
        smellLabel: '灰皿の底に沈んだもの',
        description: '洗ったあとでも陶器の底に染みついて残る、何年分もの煙草の脂の匂い。指で撫でると微かに黒く光る。',
        layeredNotes: 'その奥に、誰かがマッチを擦った瞬間の硫黄と、フィルターに移った口紅のごく薄い蝋の匂いが残っている。',
        mostNoticeableHour: [21, 23],
        unlockAfterNights: 75,
    },
    {
        id: 'smell-abacus-oil',
        smellLabel: '帳場のそろばんの油',
        description: '帳場の引き出しを開けたときに立ち上る、木の珠に染み込んだ古い指の脂と油の匂い。数字と一緒に重ねられてきた時間の匂い。',
        layeredNotes: 'その下に、墨汁のかすかな鉄の匂いと、伝票用紙の古いインクの気配が潜んでいる。',
        mostNoticeableHour: [22, 24],
        unlockAfterNights: 100,
    },
    {
        id: 'smell-grilled-eel-smoke',
        smellLabel: '隣家の土用の鰻の煙',
        description: '夏の夕方、勝手口の隙間から流れ込んでくる、隣の鰻屋のタレが焦げる香ばしい煙。店の匂いと一瞬だけ混ざる。',
        layeredNotes: '奥には、山椒の青い刺激と、炭の底で熟れていく脂のねっとりした甘みが重なっている。',
        mostNoticeableHour: [17, 18],
        unlockAfterNights: 130,
    },
    {
        id: 'smell-rain-genkan-stones',
        smellLabel: '雨の日の玄関の敷石',
        description: '雨が降り込んだ三和土の石と、濡れた下駄箱の木が一緒に出す、土と金気の混ざった匂い。暖簾の手前でだけ感じる。',
        layeredNotes: 'その奥に、傘のビニールから立つかすかな石油の匂いと、客の革靴の湿った皮革の気配が混じっている。',
        mostNoticeableHour: [18, 21],
        unlockAfterNights: 170,
    },
    {
        id: 'smell-pickling-barrel',
        smellLabel: '糠床の樽のふちの匂い',
        description: '厨房の隅に置かれた古い糠床の、蓋を外したときだけ立ちのぼる発酵した酸と野菜の甘みの混ざった匂い。',
        layeredNotes: '奥に、赤唐辛子の乾いた辛みと、何年も手で混ぜ続けられてきた人の皮膚のかすかな気配が沈んでいる。',
        mostNoticeableHour: [16, 17],
        unlockAfterNights: 220,
    },
    {
        id: 'smell-kerosene-stove-first-light',
        smellLabel: '石油ストーブに火を入れた最初の瞬間',
        description: '冬の最初の一週、芯に火が移るほんの数秒だけ立ちのぼる、灯油と温まりかけの金属の混ざった匂い。',
        layeredNotes: 'その下に、夏の間しまわれていた綿埃の焦げるかすかな気配と、やかんの底の水の匂いが続いている。',
        mostNoticeableHour: [16, 17],
        unlockAfterNights: 280,
    },
    {
        id: 'smell-snow-on-noren',
        smellLabel: '暖簾に積もった雪の匂い',
        description: '雪が降り止んだ直後、取り込むときにだけ暖簾の布から立つ、冷気と藍染の布の湿った匂い。',
        layeredNotes: '奥に、染料の鉄の気配と、一日外にいた布が吸い込んだ街の排気のごくうすい影が残っている。',
        mostNoticeableHour: [23, 25],
        unlockAfterNights: 350,
    },
    {
        id: 'smell-after-last-customer',
        smellLabel: '最後の客が帰った直後の空気',
        description: '暖簾を下ろした瞬間、店の空気がふっと静かになったときに浮かび上がる、人の体温と酒と出汁が混ざり合った総体の匂い。',
        layeredNotes: 'その奥に、誰かの香水のごく薄い残り香と、畳の上に落ちた最後のため息の湿り気が沈んでいる。',
        mostNoticeableHour: [24, 26],
        unlockAfterNights: 450,
    },
    {
        id: 'smell-opening-morning-air',
        smellLabel: '店を開ける前の朝の空気',
        description: '誰も入れる前、まだ仕込みも始まっていない時間の店に立ち込める、昨日までの全部が沈殿して一つになった匂い。一年のすべての夜の層。',
        layeredNotes: '奥に、木と出汁と煙草と雪と人の体温の、どれとも言えない記憶の層がゆっくりと呼吸している。',
        mostNoticeableHour: [9, 11],
        unlockAfterNights: 600,
    },
];

export function getIdentifiedSmells(totalNights: number): BarSmell[] {
    return BAR_SMELLS.filter((smell) => totalNights >= smell.unlockAfterNights);
}
