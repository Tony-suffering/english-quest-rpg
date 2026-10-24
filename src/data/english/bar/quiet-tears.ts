/**
 * Quiet Tear Moments — a catalog of ten counter-side scenes in which a guest
 * weeps without announcing it. The apprentice serves in silence; Gondo keeps
 * his back turned or his hands busy. No cause is named, no comfort is offered.
 * Competence is the kindness. Each entry is a single, enclosed miniature.
 */

export interface QuietTearMoment {
    id: string;
    customerDescriptor: string;
    setup: string;
    moment: string;
    apprenticeAct: string;
    gondoReaction?: string;
}

export const QUIET_TEAR_MOMENTS: QuietTearMoment[] = [
    {
        id: 'tear-navy-suit',
        customerDescriptor: '紺のスーツの男',
        setup: 'ネクタイを少しだけ緩め、鞄を足元に置いたまま、男はハイボールを一口だけ飲んで止めた。氷が鳴る音が、やけに大きく聞こえる。',
        moment: 'グラスの縁に、小さな雫がひとつ落ちた。男はそれをそのままにして、遠くを見ていた。',
        apprenticeAct: '折りたたんだ白いナプキンを、男のグラスのわずか手前に置いた。',
        gondoReaction: '権藤は奥の棚から別の瓶を取り出すふりをして、背中を向けた。',
    },
    {
        id: 'tear-white-hair-woman',
        customerDescriptor: '白髪の女',
        setup: '女は品書きを見ずに、昔ここで飲んだものと同じ銘柄を指で指した。注がれた酒を、しばらく口につけなかった。',
        moment: '指先でそっと目頭を押さえた。押さえたまま、しばらく動かなかった。',
        apprenticeAct: '小さな豆皿を、女の肘のそばへ音もなく寄せた。',
        gondoReaction: '権藤は気づかぬふりで、磨き終わった猪口をまた磨き直した。',
    },
    {
        id: 'tear-young-man-overcoat',
        customerDescriptor: '外套を脱がない若い男',
        setup: '外は雨でもないのに、外套の肩がわずかに湿っていた。ビールをひとつ頼み、泡が消えるまで触れなかった。',
        moment: '男はうつむいたまま、両手で顔の下半分を覆った。肩はまったく揺れなかった。',
        apprenticeAct: '新しいおしぼりを、男の右手のすぐそばに置き直した。',
    },
    {
        id: 'tear-widow-ring',
        customerDescriptor: '指輪をまだ外していない女',
        setup: '女は最初に注文した冷酒を三分の一だけ残して、じっと眺めていた。グラスに指を触れる仕草を、何度か繰り返した。',
        moment: 'グラスの表面に、かすかな波紋が立った。女は瞬きだけをして、それをやり過ごした。',
        apprenticeAct: 'グラスに新しい氷を一粒、静かに足した。',
        gondoReaction: '権藤は何も言わず、ただ燗付け器の温度を見ていた。',
    },
    {
        id: 'tear-cook-off-duty',
        customerDescriptor: '手の荒れた中年の男',
        setup: '指の節に古い火傷の跡が残っていた。男は料理には手を付けず、焼酎を水のように飲んだ。',
        moment: '短い息を吐いたあと、目の端から一筋だけ流れた。男はそれを袖で拭いもしなかった。',
        apprenticeAct: '空になりかけた水のコップに、そっと水差しを傾けた。',
    },
    {
        id: 'tear-mother-after-hospital',
        customerDescriptor: '大きな紙袋を抱えた女',
        setup: '紙袋には病院の名前が印字されていた。女は椅子に浅く座り、温かい茶だけを頼んだ。',
        moment: '茶碗を両手で包んだまま、湯気の向こうで目を伏せた。頬を伝うものは、拭われなかった。',
        apprenticeAct: '古い木の盆を、茶碗の下にそっと差し入れた。',
        gondoReaction: '権藤は気づかなかったのか、気づかぬふりをしたのか、黙って布巾を畳んでいた。',
    },
    {
        id: 'tear-old-friend-alone',
        customerDescriptor: '二人分の席を取った老人',
        setup: '老人は隣の椅子に古びた帽子を置き、猪口を二つ並べて注文した。片方の猪口には、誰も座らなかった。',
        moment: '自分の猪口を空にしたあと、もう一方の猪口を、長いあいだ見つめていた。目の縁が光っていた。',
        apprenticeAct: 'もう一方の猪口にも、黙って同じ量を注いだ。',
    },
    {
        id: 'tear-student-exam',
        customerDescriptor: '鞄を足で挟んだ痩せた若い女',
        setup: '鞄からは参考書の角がはみ出ていた。女は一番安い酒を頼み、ほとんど口をつけなかった。',
        moment: '突然、長い息が抜け落ちるように漏れた。目を閉じたまま、しばらくそのままでいた。',
        apprenticeAct: '小さな塩むすびを載せた皿を、女の前にそっと置いた。',
        gondoReaction: '権藤は何も言わなかった。品書きに書かれていない一皿だった。',
    },
    {
        id: 'tear-returning-soldier-posture',
        customerDescriptor: '姿勢の良すぎる男',
        setup: '男は背筋をまっすぐ保ったまま、久しぶりの酒と呟いた。最初の一口を含んだあと、喉仏が一度だけ動いた。',
        moment: '男は天井を見上げる格好をして、まばたきを止めた。光が目に溜まり、こぼれなかった。',
        apprenticeAct: '男の手元に、冷たいおしぼりを新しく置き換えた。',
    },
    {
        id: 'tear-winter-coat-laugh',
        customerDescriptor: '厚い冬のコートの女',
        setup: '女は連れの冗談に小さく笑い、連れが先に帰ったあとも、同じ席に残っていた。笑みが顔から少しずつ抜けていった。',
        moment: '笑った形のまま、頬にひとすじ伝った。女はそれに自分でも驚いたように、口元に手を当てた。',
        apprenticeAct: '温め直した出汁を、小さな椀で女の前に差し出した。',
        gondoReaction: '権藤は新しい客のために暖簾の向こうへ目をやり、この席のことは見なかった。',
    },
];

export function pickTearMoment(): QuietTearMoment {
    const index = Math.floor(Math.random() * QUIET_TEAR_MOMENTS.length);
    return QUIET_TEAR_MOMENTS[index];
}
