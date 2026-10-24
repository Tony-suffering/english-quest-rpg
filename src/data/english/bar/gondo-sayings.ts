/**
 * Gondo Sayings — 25 short lines the master muttered once, in different nights.
 * The apprentice copied them into a small notebook. Not lessons. Not advice.
 * Just things a weathered Tokyo bar man said, maybe to the air, maybe not.
 * Entries unlock gradually across the 1000-night arc, ordered by night earned.
 */

export interface GondoSaying {
    id: string;
    saying: string;
    situation: string;
    toWhom?: string;
    unlockAfterNights: number;
}

export const GONDO_SAYINGS: GondoSaying[] = [
    {
        id: 'saying-sake-choose',
        saying: '酒はな、飲むもんじゃない。選ぶもんだ。',
        situation: '棚の一本を裏返して、ラベルの汚れを親指で拭っていた。',
        toWhom: '誰に言うでもなく',
        unlockAfterNights: 3,
    },
    {
        id: 'saying-quiet-customer',
        saying: '静かな客ほど、帰ったあとが重い。',
        situation: '常連が一言も喋らず帰った夜、カウンターを拭きながら。',
        unlockAfterNights: 6,
    },
    {
        id: 'saying-fail-young',
        saying: '若いうちに、うまく失敗しとけ。',
        situation: 'グラスを割った弟子に、背中を向けたまま。',
        toWhom: '弟子へ',
        unlockAfterNights: 10,
    },
    {
        id: 'saying-hands-stop',
        saying: '手を止めてる間に、客の気持ちは変わる。',
        situation: '弟子がオーダーで考え込んでいた夜。',
        toWhom: '弟子へ',
        unlockAfterNights: 15,
    },
    {
        id: 'saying-smile-back',
        saying: '笑いかけに来た客を、笑いかけ返せんようじゃ駄目だ。',
        situation: '疲れ顔で接客していた弟子の横をすれ違いざまに。',
        toWhom: '弟子へ',
        unlockAfterNights: 20,
    },
    {
        id: 'saying-ice-listen',
        saying: '氷の音、ちゃんと聞いとけ。',
        situation: 'シェイカーを振る弟子の手首を、軽く指でつついて。',
        toWhom: '弟子へ',
        unlockAfterNights: 25,
    },
    {
        id: 'saying-first-pour',
        saying: '一杯目でだいたい分かる。分からん日は、まだ早い。',
        situation: '新しい客を見送ったあと、自分の湯呑みを傾けながら。',
        unlockAfterNights: 30,
    },
    {
        id: 'saying-counter-listens',
        saying: 'カウンターはな、喋らんが、ちゃんと聞いとる。',
        situation: '木目を布で撫でていた。',
        toWhom: '誰に言うでもなく',
        unlockAfterNights: 40,
    },
    {
        id: 'saying-drunk-honest',
        saying: '酔っ払いの本音は、本音のうちに入らん。',
        situation: '泣き上戸の客が帰ったあと、灰皿を片付けながら。',
        unlockAfterNights: 50,
    },
    {
        id: 'saying-good-bar',
        saying: 'いい店ってのは、帰り際に思い出す店だ。',
        situation: '暖簾を下ろす手を止めて、夜道を一瞬眺めていた。',
        unlockAfterNights: 60,
    },
    {
        id: 'saying-rag-knows',
        saying: 'この布巾、俺より長くこの店におる。',
        situation: 'ぼろぼろの布巾を畳み直しながら、半笑いで。',
        unlockAfterNights: 75,
    },
    {
        id: 'saying-too-kind',
        saying: '優しくしすぎると、客が帰らんようになる。',
        situation: '長居した客を見送ったあと、ため息まじりに。',
        unlockAfterNights: 90,
    },
    {
        id: 'saying-rain-regular',
        saying: '雨の日の常連は、天気で来とるんじゃない。',
        situation: '雨音の中、空いたカウンターの端を見ていた。',
        unlockAfterNights: 110,
    },
    {
        id: 'saying-knife-angle',
        saying: '包丁は、力じゃなくて角度だ。あと、機嫌だ。',
        situation: '大根の桂剥きに苦戦していた弟子の横で。',
        toWhom: '弟子へ',
        unlockAfterNights: 130,
    },
    {
        id: 'saying-empty-seat',
        saying: '空いとる席にも、昔は誰か座っとった。',
        situation: '閉店間際、誰もいない端の席に目をやりながら。',
        unlockAfterNights: 150,
    },
    {
        id: 'saying-measure-heart',
        saying: '酒の量は計れるが、客の量は計れん。',
        situation: 'ジガーを拭きながら、独り言のように。',
        unlockAfterNights: 180,
    },
    {
        id: 'saying-bad-day',
        saying: '機嫌が悪い日は、黙って洗い物しとけ。水が直してくれる。',
        situation: '不機嫌な顔の弟子にシンクを顎で示して。',
        toWhom: '弟子へ',
        unlockAfterNights: 220,
    },
    {
        id: 'saying-regular-leaves',
        saying: '常連が辞めるときはな、挨拶せんで辞めるもんだ。',
        situation: '古い客の訃報を聞いた翌日、仕込み中にぽつりと。',
        unlockAfterNights: 260,
    },
    {
        id: 'saying-new-apron',
        saying: '新しい前掛けは、三日で店の匂いになる。',
        situation: '弟子が新調した前掛けを見て、鼻で笑いながら。',
        toWhom: '弟子へ',
        unlockAfterNights: 320,
    },
    {
        id: 'saying-count-bottles',
        saying: '瓶の数は数えられる。年の数は数えんでいい。',
        situation: '棚卸しの夜、帳面を閉じながら。',
        unlockAfterNights: 400,
    },
    {
        id: 'saying-wrong-order',
        saying: '間違えた注文ほど、うまく作れ。',
        situation: 'オーダーを取り違えた弟子の背中に、低い声で。',
        toWhom: '弟子へ',
        unlockAfterNights: 500,
    },
    {
        id: 'saying-own-shop',
        saying: '自分の店を持つってのは、逃げ場を一つ減らすことだ。',
        situation: '独立を口にした弟子に、目も合わさず。',
        toWhom: '弟子へ',
        unlockAfterNights: 600,
    },
    {
        id: 'saying-same-seat',
        saying: '同じ席に座る客は、同じ話をしに来とるんじゃない。',
        situation: '毎週同じ端の席に座る客の湯呑みを下げながら。',
        unlockAfterNights: 750,
    },
    {
        id: 'saying-noren-weight',
        saying: '暖簾はな、下ろすときのほうが重い。',
        situation: '閉店作業の手元が、ほんの一瞬止まっていた。',
        unlockAfterNights: 900,
    },
    {
        id: 'saying-thousand-nights',
        saying: '千日やってもな、まだ一杯目は怖い。',
        situation: '一番最後の夜、最初の一杯を注ぐ前に、グラスをじっと見ていた。',
        unlockAfterNights: 1000,
    },
];

export function getRecordedSayings(totalNights: number): GondoSaying[] {
    return GONDO_SAYINGS.filter((s) => s.unlockAfterNights <= totalNights);
}
