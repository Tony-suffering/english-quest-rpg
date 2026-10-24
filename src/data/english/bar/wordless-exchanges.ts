/**
 * Wordless Exchanges between the apprentice and Gondo.
 * Small physical signals passed across the counter without speech.
 * Some are confirmed, some remain uncertain, some were quietly corrected.
 * Unlocks are gated by total nights served behind the bar.
 */

export interface WordlessExchange {
    id: string;
    situation: string;
    gondosMove: string;
    apprenticesRead: string;
    correctness: 'confirmed' | 'uncertain' | 'corrected-later';
    unlockAfterNights: number;
}

export const WORDLESS_EXCHANGES: WordlessExchange[] = [
    {
        id: 'wordless-first-glass',
        situation: '常連の老人が二杯目を飲み終えた直後、カウンターの端が静まり返る。',
        gondosMove: '権藤が空いたロックグラスに一秒だけ視線を落とす。',
        apprenticesRead: '同じ銘柄をもう一杯。氷は新しく替える。',
        correctness: 'confirmed',
        unlockAfterNights: 3,
    },
    {
        id: 'wordless-hand-hover',
        situation: '若い客が氷を噛み砕き始め、カウンターに小さな欠片が散る。',
        gondosMove: '権藤が布巾の上、カウンターから三センチほどの高さに手を一秒止める。',
        apprenticesRead: 'まだ拭くな、客が気にする前に自然に動け。',
        correctness: 'confirmed',
        unlockAfterNights: 5,
    },
    {
        id: 'wordless-two-taps',
        situation: '初見の客がメニューを閉じ、少し迷った顔で黙っている。',
        gondosMove: '権藤が木のカウンターを人差し指と中指で一度だけ叩く。',
        apprenticesRead: '先に水を出せ、注文は急かすな。',
        correctness: 'confirmed',
        unlockAfterNights: 8,
    },
    {
        id: 'wordless-throat-low',
        situation: '奥の席で商談らしき二人が声を潜めて揉めている。',
        gondosMove: '権藤が低い音程で一度だけ咳払いをする。',
        apprenticesRead: ' BGMの音量を少しだけ上げろということだ。',
        correctness: 'confirmed',
        unlockAfterNights: 12,
    },
    {
        id: 'wordless-shoulder-door',
        situation: '常連ではない男が入り口で立ち止まり、店内を見回している。',
        gondosMove: '権藤が肩を扉の方へ十度ほど向ける。',
        apprenticesRead: '迎えに出ず、視線で席を示せという合図。',
        correctness: 'uncertain',
        unlockAfterNights: 18,
    },
    {
        id: 'wordless-small-nod',
        situation: '長年通う女性客がグラスを両手で包み、じっと見つめている。',
        gondosMove: '権藤がこちらに小さく一度だけ頷く。',
        apprenticesRead: '話しかけず、そのまま置いておけ。',
        correctness: 'confirmed',
        unlockAfterNights: 25,
    },
    {
        id: 'wordless-bottle-glance',
        situation: '酔いが深くなってきた中年の客が三杯目を頼もうとしている。',
        gondosMove: '権藤が棚の端の水出し茶の瓶にわずかに視線を流す。',
        apprenticesRead: '次はアルコールを抜いて出せという指示。',
        correctness: 'corrected-later',
        unlockAfterNights: 35,
    },
    {
        id: 'wordless-wrist-turn',
        situation: '若いカップルが長居し、片方が帰りたそうに時計を何度か見ている。',
        gondosMove: '権藤が布巾を絞る手首をいつもより遅く一度だけ返す。',
        apprenticesRead: '会計の準備だけ整えて、声はかけるな。',
        correctness: 'confirmed',
        unlockAfterNights: 50,
    },
    {
        id: 'wordless-eyes-shelf',
        situation: '古い友人だと名乗る男が権藤に長い話を振っている。',
        gondosMove: '権藤が一番上の棚の埃だけに目を上げる。',
        apprenticesRead: '話は続けさせろ、だが飲み物はもう注ぐなという意味。',
        correctness: 'uncertain',
        unlockAfterNights: 70,
    },
    {
        id: 'wordless-palm-flat',
        situation: '常連がいつもと違う銘柄を珍しく頼んだ夜。',
        gondosMove: '権藤が手のひらをカウンターに一瞬だけ平らに置く。',
        apprenticesRead: '計量は普段より厳密にしろという合図。',
        correctness: 'confirmed',
        unlockAfterNights: 100,
    },
    {
        id: 'wordless-throat-high',
        situation: '静かな店内に、常連が誰かの噂話を始めかけている。',
        gondosMove: '権藤がいつもより高い音程で短く咳払いをする。',
        apprenticesRead: '話題を変えさせろ、氷の音を立てろ。',
        correctness: 'corrected-later',
        unlockAfterNights: 140,
    },
    {
        id: 'wordless-glance-register',
        situation: '閉店間際に一人客が財布を出すのをためらっている。',
        gondosMove: '権藤がレジの方へ目を向けず、自分の腕時計だけを見る。',
        apprenticesRead: '今夜はもう会計を取らない、ということ。',
        correctness: 'uncertain',
        unlockAfterNights: 200,
    },
    {
        id: 'wordless-finger-rim',
        situation: '若い同業者らしき客がテイスティングを気取って長く語っている。',
        gondosMove: '権藤が自分のグラスの縁を指先で一周だけ撫でる。',
        apprenticesRead: 'こちらから香りの話は絶対に振るなという釘。',
        correctness: 'confirmed',
        unlockAfterNights: 300,
    },
    {
        id: 'wordless-breath-pause',
        situation: '亡くなった常連の命日、その席に誰も座っていない。',
        gondosMove: '権藤が布巾を畳む手を半拍だけ止め、息を一度だけ深く吐く。',
        apprenticesRead: 'その席のグラスだけは出しておけ、という指示。',
        correctness: 'corrected-later',
        unlockAfterNights: 500,
    },
    {
        id: 'wordless-final-look',
        situation: '弟子が一人で最後の客を送り出し、店に戻ってきた夜。',
        gondosMove: '権藤が顔を上げず、自分のグラスをこちらへ一センチだけ滑らせる。',
        apprenticesRead: 'もう教えることは残っていない、という別れの印。',
        correctness: 'uncertain',
        unlockAfterNights: 700,
    },
];

export function getLearnedExchanges(totalNights: number): WordlessExchange[] {
    return WORDLESS_EXCHANGES.filter(
        (exchange) => exchange.unlockAfterNights <= totalNights,
    );
}
