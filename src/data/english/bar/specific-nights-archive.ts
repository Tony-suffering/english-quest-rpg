/**
 * Archive of specific memorable nights from the apprentice's notebook.
 * Each entry is a dated, distinct evening — a weather event, a customer,
 * a mistake, or an absence — that left a residue in the bar's memory.
 * Entries unlock progressively as the player crosses night thresholds.
 * Used by the notebook UI and by late-game flashback sequences.
 */

export interface ArchivedNight {
    id: string;
    occasionTitle: string;
    brief: string;
    whatMadeIt: string;
    unlockAfterNights: number;
}

export const ARCHIVED_NIGHTS: ArchivedNight[] = [
    {
        id: 'arc-coat-inside-out',
        occasionTitle: 'コートを裏返しに着ていた老人の夜',
        brief: '三月の冷たい雨の夜、ベージュのコートを裏返しに着た老人が入ってきた。本人は気づいておらず、ただ熱燗を一合だけ頼んで静かに飲んで帰っていった。権藤さんは何も言わなかった。',
        whatMadeIt: '誰もそのことを指摘しなかったことが、あの夜を一番やわらかくしていた。',
        unlockAfterNights: 8,
    },
    {
        id: 'arc-blackout',
        occasionTitle: '停電の夜',
        brief: '通りごと電気が落ちた。権藤さんは慌てず、カウンターに蝋燭を三本並べ、常連の二人はそのまま残って黙って飲み続けた。冷蔵庫の止まった音が、はじめて聞こえる音だった。',
        whatMadeIt: '暗闇で、声だけが残ったこと。',
        unlockAfterNights: 15,
    },
    {
        id: 'arc-no-one-came',
        occasionTitle: '誰も来なかった夜',
        brief: '開店から閉店まで、扉が一度も開かなかった。権藤さんはいつも通りグラスを磨き、出汁を取り、二十三時きっかりに暖簾を下ろした。修行中の私は、誰もいない空気に接客の練習をした。',
        whatMadeIt: '客が来なくても店は店だった、とわかった夜。',
        unlockAfterNights: 25,
    },
    {
        id: 'arc-broken-bottle',
        occasionTitle: '一升瓶を割った夜',
        brief: '私が棚から取り出した酒の瓶を、手元で滑らせて割ってしまった。権藤さんはすぐに新聞紙を広げて破片を包み、「こぼれた酒は床が飲む」とだけ言った。客は三人とも見ないふりをしてくれた。',
        whatMadeIt: '叱られなかったことが、一番長く残る叱責になった。',
        unlockAfterNights: 40,
    },
    {
        id: 'arc-snow-knee',
        occasionTitle: '膝まで雪が積もった夜',
        brief: '予報よりずっと早く雪が降り始め、電車が止まった。それでも常連が一人、長靴で辿り着いて、熱いお茶だけを頼んで一時間座っていた。帰り道は、雪の匂いがした。',
        whatMadeIt: '来ないはずの人が来てしまった、という事実だけで十分だった。',
        unlockAfterNights: 60,
    },
    {
        id: 'arc-wrong-order',
        occasionTitle: '注文を取り違えた夜',
        brief: '常連の安田さんに、隣の客のハイボールを出してしまった。安田さんは一口飲んでから「今日はこれでいい」と言って最後まで飲み切った。権藤さんはあとで小さく笑った。',
        whatMadeIt: '間違いを、間違いのまま受け取ってもらえたこと。',
        unlockAfterNights: 80,
    },
    {
        id: 'arc-last-train-woman',
        occasionTitle: '終電に間に合わなかった女の夜',
        brief: '二十三時半、走り込んできた女性が肩で息をしていた。終電は五分前に出ていた。彼女は笑って「じゃあ、ゆっくり飲みます」と言い、始発まで四時間、水割り二杯で粘った。',
        whatMadeIt: '間に合わないとわかったときの、あの人の顔のほどけ方。',
        unlockAfterNights: 110,
    },
    {
        id: 'arc-typhoon-eve',
        occasionTitle: '台風の前夜',
        brief: '風がまだ弱く、気圧だけが重かった夜。窓の外でシャッターの音がずっと鳴っていた。客は一人も来ず、権藤さんは仕込みをしながら、三十年前の台風の話をぽつぽつとした。',
        whatMadeIt: '嵐より、嵐が来る前の方がずっと静かだと知った。',
        unlockAfterNights: 150,
    },
    {
        id: 'arc-foreign-soldier',
        occasionTitle: '外国人の男が泣いた夜',
        brief: '英語しか話せない長身の男が、メニューも見ずに座って、写真を一枚カウンターに置いた。権藤さんは黙って熱燗とおにぎりを出した。男は二十分ほど泣いて、礼を言って帰った。',
        whatMadeIt: '言葉が通じないまま、全部通じていたこと。',
        unlockAfterNights: 200,
    },
    {
        id: 'arc-cat-visit',
        occasionTitle: '野良猫が入ってきた夜',
        brief: '扉の開いた隙に、黒白の痩せた猫が入ってきてカウンターの端に座った。誰も追い出さず、権藤さんは小皿に煮干しを三本置いた。猫は食べて、しばらくいて、帰った。',
        whatMadeIt: '客でも従業員でもないものが、一晩だけ店の一部になった。',
        unlockAfterNights: 270,
    },
    {
        id: 'arc-former-apprentice',
        occasionTitle: '昔の弟子が戻ってきた夜',
        brief: '十五年前にこの店を辞めたという男が、自分の店を畳んだと言いにきた。権藤さんは何も聞かず、昔と同じ割り方で焼酎を出した。男は一杯だけ飲んで、深く頭を下げて帰った。',
        whatMadeIt: '戻ってくるために辞めていく人もいる、と権藤さんが後で呟いた。',
        unlockAfterNights: 350,
    },
    {
        id: 'arc-birthday-alone',
        occasionTitle: '自分の誕生日を一人で祝った常連の夜',
        brief: '常連の松尾さんが、小さな箱入りのケーキを自分で買ってきて、カウンターで蝋燭を立てた。権藤さんは静かにグラスに酒を注ぎ、「おめでとうございます」とだけ言った。',
        whatMadeIt: '祝われるより、祝うことを選んだ人の背中。',
        unlockAfterNights: 450,
    },
    {
        id: 'arc-earthquake-small',
        occasionTitle: '小さな地震の夜',
        brief: '震度三。グラスが触れ合う音と、誰かの「あっ」という声が同時だった。揺れが止まってから、客同士が顔を見合わせて笑った。初対面の五人が、その夜だけ仲間になった。',
        whatMadeIt: '揺れを共有した人たちは、その晩のあいだだけ家族に近づく。',
        unlockAfterNights: 600,
    },
    {
        id: 'arc-last-of-regular',
        occasionTitle: '常連が最後に来た夜',
        brief: '長年通っていた田所さんが、いつもより丁寧に頭を下げて帰っていった。注文はいつも通り、会計もいつも通り。翌週から来なくなり、訃報が届いたのは一ヶ月後だった。',
        whatMadeIt: '最後だと気づかれない最後こそ、本当の最後だった。',
        unlockAfterNights: 800,
    },
    {
        id: 'arc-gondo-absent',
        occasionTitle: '権藤さんがいなかった夜',
        brief: '風邪で寝込んだ権藤さんに代わって、私が一人で店を開けた。手順は全部覚えていたはずなのに、出汁の塩加減だけがどうしても合わなかった。客は何も言わず、空にして帰った。',
        whatMadeIt: 'いない人の形が、いる夜よりくっきり見えた。',
        unlockAfterNights: 1000,
    },
];

export function getArchivedNights(totalNights: number): ArchivedNight[] {
    return ARCHIVED_NIGHTS.filter((night) => totalNights >= night.unlockAfterNights);
}
