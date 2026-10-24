/**
 * Gondo Origins — fragments of the master's life before the bar.
 * These surface inadvertently over many nights; they are not told,
 * only glimpsed through receipts, scars on tools, a name half-said.
 * Reserved, incomplete. No neat resolution is ever offered.
 */

export interface GondoOriginFragment {
    id: string;
    era: string;
    fragmentTitle: string;
    body: string;
    howItSurfaced: string;
    unlockAfterNights: number;
}

export const GONDO_ORIGINS: GondoOriginFragment[] = [
    {
        id: 'origin-cabinetmaker',
        era: '十代の終わり頃',
        fragmentTitle: '指の節',
        body: 'カウンターの裏に、鉋の刃を研ぐための砥石が一つ置いてある。店の道具ではないらしい。昔、家具を作っていた時期があったようだ。どこの工房だったかは、濁された。親方の名前も、出てこない。',
        howItSurfaced: '氷を割る音に紛れて、砥石の手入れを始めた夜にふと見えた。',
        unlockAfterNights: 30,
    },
    {
        id: 'origin-unnamed-her',
        era: '昭和の終わり頃',
        fragmentTitle: '差出人のない葉書',
        body: 'レジの下に古い葉書が一枚、挟まっていた。消印は神戸。文面は短く、相手の名前は書かれていない。親方は葉書を裏返し、そのまま元の場所に戻した。何も言わなかった。',
        howItSurfaced: 'お釣りの硬貨を探していて、偶然そこに触れてしまった。',
        unlockAfterNights: 60,
    },
    {
        id: 'origin-first-place',
        era: '三十を過ぎた頃',
        fragmentTitle: '畳んだ看板',
        body: '裏の物置に、塗装の剥げた小さな木の看板が伏せてある。以前、別の土地で小さな店を持っていたらしい。半年か、一年か。続かなかった理由は、話さない。ただ「勉強代だ」とだけ呟いた。',
        howItSurfaced: '掃除の最中、看板の角に足をぶつけてしまった。',
        unlockAfterNights: 100,
    },
    {
        id: 'origin-master-unreached',
        era: '若い頃',
        fragmentTitle: '継がなかった杯',
        body: '銀座の、ある名人に一時期ついていたという。最後まで受け継げなかった技が一つある。名前は呼ばず、「あの人」としか言わない。棚の奥のミキシンググラスは、その頃から使っているものらしい。',
        howItSurfaced: 'グラスの底の古い刻印について尋ねたとき、返答が半分で止まった。',
        unlockAfterNights: 150,
    },
    {
        id: 'origin-sibling-silent',
        era: '時期不詳',
        fragmentTitle: '宛名のない年賀',
        body: '毎年一月、書きかけの葉書が机の端に一枚だけ残っている。宛名の欄は、苗字だけで止まっている。兄か、弟か、姉妹かは分からない。連絡が途絶えて、もう何年になるのかも、言わなかった。',
        howItSurfaced: '正月明けに店を開けた朝、置きっぱなしの葉書が目に入った。',
        unlockAfterNights: 220,
    },
    {
        id: 'origin-year-abroad',
        era: '二十代のどこか',
        fragmentTitle: '通貨の余り',
        body: '金庫の奥に、使い道のない外国の紙幣が数枚混ざっている。どの国とも明言されない。一年ほど、向こうで働いていたことがあるらしい。戻ってきた理由は、尋ねても笑うだけだった。',
        howItSurfaced: '釣り銭の補充で金庫を覗いたとき、古い紙幣がこぼれ落ちた。',
        unlockAfterNights: 320,
    },
    {
        id: 'origin-the-wager',
        era: '四十に手が届く頃',
        fragmentTitle: '外れた馬券',
        body: '本棚の一冊に、古い馬券が栞代わりに挟まっている。日付は随分と昔。一度だけ大きく張って、負けたらしい。失くしたのは金だけではなかった、という言い方をした。詳細は続かなかった。',
        howItSurfaced: '貸してもらった本を返すとき、挟まっていた紙が落ちた。',
        unlockAfterNights: 450,
    },
    {
        id: 'origin-countryside-months',
        era: 'ある年の冬から春',
        fragmentTitle: '雪囲いの記憶',
        body: '店を始める少し前、山陰のどこかで数ヶ月、誰の家の離れを借りて過ごしたことがあるという。村の名は出さない。何から逃げていたのか、何を考えていたのか、本人も覚えていないと言った。',
        howItSurfaced: '雪の夜、窓の外を見ながら独り言のように零した一言から。',
        unlockAfterNights: 600,
    },
];

export function getKnownOrigins(totalNights: number): GondoOriginFragment[] {
    return GONDO_ORIGINS.filter((fragment) => totalNights >= fragment.unlockAfterNights);
}
