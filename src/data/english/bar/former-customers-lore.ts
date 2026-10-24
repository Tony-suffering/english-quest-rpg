/**
 * Former customers lore for Silent Bartender.
 * Patrons who stopped coming before the apprentice arrived.
 * Each entry ties a physical trace at the bar to a sparing
 * remark from Gondo and the apprentice's partial reconstruction.
 * Unlocked progressively as the apprentice's nights accumulate.
 */

export interface FormerCustomer {
    id: string;
    nicknameOrDescriptor: string;
    traceAtBar: string;
    whatGondoShared: string;
    apprenticesReconstruction: string;
    unlockAfterNights: number;
}

export const FORMER_CUSTOMERS: FormerCustomer[] = [
    {
        id: 'former-rain-poet',
        nicknameOrDescriptor: '旧詩人',
        traceAtBar: '奥棚の『冬の手帖』の見返しに、鉛筆で「七月の雨に、また」と署名がある。インクは滲み、頁の角だけ煙草の色に焼けている。',
        whatGondoShared: 'あの人は、雨の日しか来なかった。',
        apprenticesReconstruction: '署名の筆圧は弱く、途中で止まっている。雨の日にだけ現れ、書きかけの言葉を残して帰った人なのだろう。詩人だったのか、詩人でありたかった人なのかは、わからない。',
        unlockAfterNights: 40,
    },
    {
        id: 'former-lame-painter',
        nicknameOrDescriptor: '足の悪かった老画家',
        traceAtBar: 'カウンター端の椅子、右前脚だけが一度切り詰められ、樫の継ぎ木で背を合わせてある。床にわずかな擦り痕。',
        whatGondoShared: 'あの人の高さに、あの椅子だけ合わせてあった。',
        apprenticesReconstruction: '右膝を伸ばせなかった人のために、椅子の脚は削られていた。画家だったと聞く。削られたのは脚だけで、腰の位置は今も静かにその人を待っている。',
        unlockAfterNights: 60,
    },
    {
        id: 'former-peace-smoker',
        nicknameOrDescriptor: '両切りの紳士',
        traceAtBar: '戸棚の奥に未開封のピースが三箱。埃を拭くと、値段のシールが二十年前のままだった。もうこの店で煙草を吸う客はいない。',
        whatGondoShared: 'あの銘柄を頼む人は、もういない。',
        apprenticesReconstruction: '三箱は、常連が亡くなるか、来なくなるかしたあとに仕入れを止めた印だろう。師匠はそれでも処分しない。いつか戻ってくるかもしれない、とは言わない人だが、箱は残っている。',
        unlockAfterNights: 90,
    },
    {
        id: 'former-radio-widow',
        nicknameOrDescriptor: '短波の未亡人',
        traceAtBar: '古い真空管ラジオの第二記憶ボタンに、モスクワ放送の周波数が固定されている。誰が合わせたのか、師匠は触れない。',
        whatGondoShared: 'あの人は、日本語のない音だけを聞きに来た。',
        apprenticesReconstruction: '言葉の意味を求めず、雑音に近い声だけを肴にしていた人がいた。夫の最後の赴任地だったのかもしれない。意味がないほうが、かえって確かに届く音というのがあるのだろう。',
        unlockAfterNights: 130,
    },
    {
        id: 'former-wall-facing-photo',
        nicknameOrDescriptor: '壁を向いた写真の人',
        traceAtBar: 'レジ裏の額入り写真が一枚、表を壁に向けて掛けられている。裏板に「一九八七年 春」とだけ書かれ、釘は一度も打ち直されていない。',
        whatGondoShared: 'ひっくり返したのは、あの人が頼んでいった。',
        apprenticesReconstruction: '写っているのが誰か、師匠は決して見せない。向けられた壁の方だけが、少しずつ煤で色が変わっている。思い出を捨てずに、見ないでおく方法を、師匠はその人から学んだのだと思う。',
        unlockAfterNights: 180,
    },
    {
        id: 'former-half-shochu',
        nicknameOrDescriptor: '半合の寡婦',
        traceAtBar: '棚に半合だけ目盛りの入った錫の片口がひとつ。他の器と揃いでないのに、師匠は別の場所にしまい、月に一度だけ磨く。',
        whatGondoShared: 'あの人は、半合より多くは飲まなかった。',
        apprenticesReconstruction: '夫の一合を半分にして、自分の分として注いでいたのだろうか。片口は誂えたものではなく、どこかの旅先で求められた形に見える。節度というより、約束のようなものを、その人は飲んでいた。',
        unlockAfterNights: 250,
    },
    {
        id: 'former-silent-translator',
        nicknameOrDescriptor: '無口な翻訳家',
        traceAtBar: '勘定場の引き出しの底に、露文の辞書の頁が一枚だけ畳まれている。余白に和訳らしきものが走り書きされ、途中で線が引かれている。',
        whatGondoShared: 'あの人は、言葉の仕事をしていたが、ここでは一言も喋らなかった。',
        apprenticesReconstruction: '書きかけの訳は、最後の一語だけが消されている。訳し終えられなかったのか、訳すに足りないと思ったのか。店に来ているあいだだけ、言葉から離れたかった人なのだろう。',
        unlockAfterNights: 350,
    },
    {
        id: 'former-first-apprentice',
        nicknameOrDescriptor: '先代の弟子',
        traceAtBar: '裏の勝手口の柱に、背丈の印が二本。低い方には消しかけの鉛筆で「一年目」とだけ記され、上の印には何も書かれていない。',
        whatGondoShared: 'おまえの前に、一人だけ、いた。',
        apprenticesReconstruction: '二本目の印は、一本目から指三本ぶんしか離れていない。長くはいられなかったのだろう。名を師匠は言わず、自分もまだ訊かない。いずれ自分の印が、その隣に刻まれる日までは。',
        unlockAfterNights: 500,
    },
];

export function getDiscoveredFormerCustomers(totalNights: number): FormerCustomer[] {
    return FORMER_CUSTOMERS.filter((entry) => totalNights >= entry.unlockAfterNights);
}
