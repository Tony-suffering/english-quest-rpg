/**
 * Returning regulars: customers who vanished for months or years
 * and step back through the door one quiet night. Their first night
 * back carries a small, unspoken weight — something changed, and
 * neither Gondo nor the customer names it. Data only, for a future
 * continuity hook in the silent bar loop.
 */

export interface ReturningRegular {
    id: string;
    descriptor: string;
    absenceDuration: string;
    tellingSigns: string;
    unspokenExchange: string;
    usualVsNow?: string;
    minimumNightsBeforeReturn: number;
}

export const RETURNING_REGULARS: ReturningRegular[] = [
    {
        id: 'returning-silver-small-man',
        descriptor: '銀髪の小柄な男',
        absenceDuration: '三か月',
        tellingSigns: '前より一回り痩せていて、コートの肩が余っている。座る前に一度、椅子の背もたれに手を置いて息を整えた。',
        unspokenExchange: '権藤は無言で冷やしたグラスを磨き直し、いつもの位置に置いた。男はそれを見て、ほんの少しだけ頷いた。',
        usualVsNow: '以前は席につく前に必ず外の看板を指で叩く癖があったが、今夜はそれがなかった。',
        minimumNightsBeforeReturn: 20,
    },
    {
        id: 'returning-woman-long-coat',
        descriptor: '長いコートの女',
        absenceDuration: '半年',
        tellingSigns: '髪がずいぶん短くなっていて、耳の後ろに見覚えのない細い傷があった。歩き方だけは前と同じだった。',
        unspokenExchange: '権藤はカウンターの奥から古い封筒を出して、彼女の前に静かに置いた。半年前、彼女が置き忘れていったものだ。',
        usualVsNow: '前は必ず窓際を選んだのに、今夜は迷わず一番奥の席に腰を下ろした。',
        minimumNightsBeforeReturn: 30,
    },
    {
        id: 'returning-thin-suited-man',
        descriptor: '痩せたスーツの男',
        absenceDuration: '十か月',
        tellingSigns: 'ネクタイの柄が以前とまったく違う。指の節が太くなり、爪が短く切り揃えられていた。',
        unspokenExchange: '権藤は何も訊かず、昔この男が好きだった酒をそっと差し出した。男は一度だけ目を閉じてから、グラスを取った。',
        minimumNightsBeforeReturn: 50,
    },
    {
        id: 'returning-woman-with-cane',
        descriptor: '杖をついた女',
        absenceDuration: '一年',
        tellingSigns: '前にはなかった黒い杖。左足をかばうように、ゆっくりとスツールに腰かけた。声の高さだけは昔のままだった。',
        unspokenExchange: '権藤はいつもより低い位置にコースターを置き、杖を立てかける場所に指先で軽く触れて示した。女は微かに笑った。',
        usualVsNow: '以前は誰より早く席を立って帰ったが、今夜は長く座っていた。',
        minimumNightsBeforeReturn: 80,
    },
    {
        id: 'returning-quiet-student',
        descriptor: '眼鏡の寡黙な若者',
        absenceDuration: '一年',
        tellingSigns: '肩幅が広くなり、眼鏡の縁が新しいものに変わっている。鞄がずいぶん使い込まれていた。',
        unspokenExchange: '権藤はメニューを出さず、昔この若者が最後に注文したものと同じ皿を黙って出した。若者は少し驚いた顔をして、頭を下げた。',
        minimumNightsBeforeReturn: 100,
    },
    {
        id: 'returning-man-with-scar',
        descriptor: '頬に新しい傷のある男',
        absenceDuration: '一年半',
        tellingSigns: '左の頬に、まだ赤みの引いていない細い傷。声はかすれていて、前より低くなっていた。',
        unspokenExchange: '権藤は一度だけ男の顔を真っ直ぐに見て、それからいつも通りおしぼりを差し出した。男はそれで充分だという顔をした。',
        usualVsNow: '前はよく笑う男だったが、今夜は一度も口角を上げなかった。',
        minimumNightsBeforeReturn: 150,
    },
    {
        id: 'returning-woman-faded-ring',
        descriptor: '指輪の跡だけが残った女',
        absenceDuration: '二年',
        tellingSigns: '左の薬指に、指輪のあった場所の細い日焼け跡。香水の匂いが以前とはまったく違っていた。',
        unspokenExchange: '権藤は何も言わず、古いカウンターの内側から小さな鍵を取り出して彼女の前に置いた。彼女は長いこと、それを見つめていた。',
        minimumNightsBeforeReturn: 200,
    },
    {
        id: 'returning-old-musician',
        descriptor: '指の節の太い老いた男',
        absenceDuration: '三年',
        tellingSigns: '白髪が増え、右手の指先が以前より震えていた。コートの内側から、たたまれた古い楽譜が覗いていた。',
        unspokenExchange: '権藤はずっと棚の奥にしまっていた欠けたグラスを、迷わずこの男の前に置いた。男はそれを両手で受け取って、しばらく動かなかった。',
        usualVsNow: '昔は酒を頼むより先に煙草を一本吸ったが、今夜はポケットに手を入れもしなかった。',
        minimumNightsBeforeReturn: 300,
    },
    {
        id: 'returning-foreign-traveler',
        descriptor: '旅装の外套の男',
        absenceDuration: '五年',
        tellingSigns: '肌が以前とは比べ物にならないほど日に焼けていて、外套の裾には見慣れない土埃がついていた。靴底がすり減っている。',
        unspokenExchange: '権藤は男の前に、五年前に預かったままの古いライターを置いた。男は少しの間それを見つめ、ゆっくりと握りしめた。',
        minimumNightsBeforeReturn: 500,
    },
    {
        id: 'returning-old-woman-small',
        descriptor: '小さな老女',
        absenceDuration: '七年',
        tellingSigns: '背が一段と低くなり、手の甲のしわが深い。昔と同じ色のショールを、前よりきつく肩にかけていた。',
        unspokenExchange: '権藤は一礼して、彼女の好きだった温かい一杯を黙って差し出した。彼女はグラスに手を添えたまま、長いこと何も言わなかった。',
        usualVsNow: '以前は席についた途端によく喋ったが、今夜は最後まで一言も発さなかった。',
        minimumNightsBeforeReturn: 700,
    },
];

export function pickReturning(totalNights: number): ReturningRegular | null {
    const eligible = RETURNING_REGULARS.filter(
        (entry) => totalNights >= entry.minimumNightsBeforeReturn,
    );
    if (eligible.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * eligible.length);
    return eligible[index];
}
