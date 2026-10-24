/**
 * Drink Pairings — Gondo's idiosyncratic but realistic rules for matching
 * a drink to the person in front of him. The apprentice absorbs these
 * quietly across nights of service, learning that temperature, weight,
 * and silence matter as much as the liquor itself.
 * Unlocks progressively as the apprentice logs more nights at the counter.
 */

export interface DrinkPairing {
    id: string;
    situation: string;
    recommendedDrink: string;
    reason: string;
    counterPairing?: string;
    unlockAfterNights: number;
}

export const DRINK_PAIRINGS: DrinkPairing[] = [
    {
        id: 'pair-cold-silent-regular',
        situation: '寒くて無言で来た常連には',
        recommendedDrink: '燗酒、ぬる燗',
        reason: '冷酒じゃ、肩の力が抜けん。ぬるい方が、黙って飲める。',
        counterPairing: '雪の日なら、熱燗まで上げる。',
        unlockAfterNights: 5,
    },
    {
        id: 'pair-just-heartbroken',
        situation: '失恋したばかりの客には',
        recommendedDrink: '梅酒ロック',
        reason: '甘さで一息つかせる。強い酒は、泣かせるだけじゃ。',
        unlockAfterNights: 10,
    },
    {
        id: 'pair-came-to-apologize',
        situation: '謝りに来た客には',
        recommendedDrink: 'ハイボール薄め',
        reason: '酔わせちゃいかん。舌が動く程度で、ちょうどええ。',
        counterPairing: '相手が先に座っとるなら、同じ物を出す。',
        unlockAfterNights: 15,
    },
    {
        id: 'pair-proud-winner',
        situation: '勝ちすぎて得意げな客には',
        recommendedDrink: '焼酎お湯割り',
        reason: 'ビールは続かん — 話もすぐ切れる。お湯割りは、ゆっくり喋らせる。',
        unlockAfterNights: 20,
    },
    {
        id: 'pair-sleepless-solo',
        situation: '眠れない夜の一人客には',
        recommendedDrink: '熱いほうじ茶',
        reason: '酒を欲しがっとるが、本当に要るのは眠りじゃ。出さん方が親切。',
        counterPairing: 'どうしてもと言うなら、甘酒を一杯だけ。',
        unlockAfterNights: 25,
    },
    {
        id: 'pair-wet-shoes-rain',
        situation: '雨で靴を濡らした客には',
        recommendedDrink: '生姜入り甘酒',
        reason: '足元から冷えとる。酒より先に、腹を温めんと話が始まらん。',
        unlockAfterNights: 30,
    },
    {
        id: 'pair-last-one-yearend',
        situation: '年末の最後の一人客には',
        recommendedDrink: '日本酒ひやおろし',
        reason: '一年を熟させた酒で、一年を締めさせる。新酒は来年でええ。',
        counterPairing: '常連なら、去年と同じ銘柄を無言で出す。',
        unlockAfterNights: 40,
    },
    {
        id: 'pair-after-funeral',
        situation: '葬式帰りの喪服の客には',
        recommendedDrink: '冷酒、辛口一合',
        reason: '甘い酒は、泣かせる。辛口で、黙って飲ませるのが礼儀じゃ。',
        unlockAfterNights: 50,
    },
    {
        id: 'pair-first-date-nervous',
        situation: '初デートで緊張しとる若い客には',
        recommendedDrink: 'ビール中瓶、二つ',
        reason: '選ばせると間が持たん。同じ物を二つ、先に置く。それで十分。',
        counterPairing: '女性が酒に弱そうなら、小グラスを添える。',
        unlockAfterNights: 70,
    },
    {
        id: 'pair-quit-job-today',
        situation: '今日会社を辞めてきた客には',
        recommendedDrink: 'ハイボール、濃いめ',
        reason: '日本酒じゃ、感傷的になりすぎる。炭酸で流させる方がええ。',
        unlockAfterNights: 90,
    },
    {
        id: 'pair-forgot-anniversary',
        situation: '結婚記念日を忘れて怒られた客には',
        recommendedDrink: '焼酎お湯割り、梅干し落とし',
        reason: '酸味で、頭を冷やさせる。強い酒は、言い訳を長くするだけじゃ。',
        unlockAfterNights: 120,
    },
    {
        id: 'pair-old-friend-reunion',
        situation: '十年ぶりに会った二人連れには',
        recommendedDrink: '燗酒、徳利一本を二つの猪口で',
        reason: '別々のグラスじゃ、距離が残る。一本を分けさせると、昔に戻る。',
        counterPairing: '片方が下戸なら、烏龍茶を堂々と出す。',
        unlockAfterNights: 160,
    },
    {
        id: 'pair-typhoon-night-walkin',
        situation: '台風の夜に濡れて入ってきた客には',
        recommendedDrink: '熱燗、とっくり一本',
        reason: 'ここまで来た根性に、冷たい物は失礼じゃ。熱いのを、すぐ出す。',
        unlockAfterNights: 220,
    },
    {
        id: 'pair-pretending-okay',
        situation: '大丈夫じゃないのに大丈夫と言う客には',
        recommendedDrink: '日本酒、常温',
        reason: '熱くも冷たくもない温度が、本音を引き出す。聞かずに、注ぐ。',
        counterPairing: '三杯目から、少しだけ冷やす。喋り疲れた頃合いに。',
        unlockAfterNights: 300,
    },
    {
        id: 'pair-coming-back-after-years',
        situation: '何年も経って戻ってきた昔の常連には',
        recommendedDrink: '昔と同じ銘柄、同じ温度',
        reason: '変えちゃいかん。覚えとった、と言葉にせず伝える一杯じゃ。',
        counterPairing: '銘柄が廃番なら、一番近い蔵のを黙って出す。',
        unlockAfterNights: 500,
    },
];

export function getLearnedPairings(totalNights: number): DrinkPairing[] {
    return DRINK_PAIRINGS.filter((pairing) => pairing.unlockAfterNights <= totalNights);
}
