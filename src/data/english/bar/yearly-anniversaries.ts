/**
 * Yearly anniversaries privately observed by Gondo inside the bar.
 * These dates are never marked or announced — the apprentice pieces them
 * together over years by noticing small, repeated deviations in routine.
 * JST-gated by month/day and unlocked progressively by total nights served.
 */

export interface AnniversaryObservance {
    id: string;
    label: string;
    month: number;
    day: number;
    gondosObservance: string;
    apprenticesInference: string;
    unlockAfterNights: number;
}

export const ANNIVERSARY_OBSERVANCES: AnniversaryObservance[] = [
    {
        id: "anniv-shop-opening",
        label: "店の開店記念日",
        month: 3,
        day: 14,
        gondosObservance:
            "その日だけ、戸を開けておく時間をいつもより5分早くする。最初の一杯は必ず自分用に冷酒を注ぎ、黙って口をつける。",
        apprenticesInference:
            "三年目の春、同じ日に同じ仕草を見た。四年目も、五年目も。初めて店を開けた朝の時間を、今も体が覚えているのだと気づいた。",
        unlockAfterNights: 50,
    },
    {
        id: "anniv-master-death",
        label: "師匠の命日",
        month: 6,
        day: 21,
        gondosObservance:
            "その夜は、店内の時計を止める。一杯目を焼酎ではなく、師匠が好んだという麦の蒸留酒にする。",
        apprenticesInference:
            "毎年この日だけ時計の針が動かない。初めは故障かと思った。三度目で、止めているのは親父さん自身だと分かった。",
        unlockAfterNights: 80,
    },
    {
        id: "anniv-previous-owner-birthday",
        label: "前の店主の誕生日",
        month: 2,
        day: 7,
        gondosObservance:
            "お通しを二皿出す。一つは誰も座っていない、一番奥の席の前に置く。夜が更けてもその皿は下げない。",
        apprenticesInference:
            "最初は客の忘れ物かと思っていた。だが毎年同じ席、同じ日。あの席は、この店を譲ってくれた人の指定席だったのだと後で知った。",
        unlockAfterNights: 100,
    },
    {
        id: "anniv-parting-day",
        label: "ある別れの日",
        month: 4,
        day: 3,
        gondosObservance:
            "その日だけ、暖簾を藍色ではなく黒いものに掛け替える。カウンターの端を一度だけ、布で丁寧に拭き直す。",
        apprenticesInference:
            "暖簾が黒い日はいつも雨が降っていなくても静かだった。誰が去った日かは聞けない。ただ、その端の席を誰にも勧めないことで察した。",
        unlockAfterNights: 130,
    },
    {
        id: "anniv-fire-survived",
        label: "火事から残った日",
        month: 11,
        day: 19,
        gondosObservance:
            "厨房の隅に置かれた、焦げ跡の残る古い木の盆をその日だけ表に出す。盃を一つだけその上に伏せて置く。",
        apprenticesInference:
            "普段は見たこともない黒い盆が、年に一度だけカウンターに現れる。焦げているのに捨てない理由を、その日の親父さんの横顔が教えてくれた。",
        unlockAfterNights: 170,
    },
    {
        id: "anniv-family-memorial",
        label: "家族の命日",
        month: 8,
        day: 16,
        gondosObservance:
            "お盆の送り火の翌日。その夜は店を半刻だけ早く閉める。最後の客が出たあと、灯りを一つ残したまま奥へ下がる。",
        apprenticesInference:
            "毎年この日は親父さんの手が少しだけ遅い。閉店後、奥の部屋から線香の匂いが漏れているのに気づいた年から、聞かないことに決めた。",
        unlockAfterNights: 220,
    },
    {
        id: "anniv-wife-anniversary",
        label: "連れ合いの記念日",
        month: 10,
        day: 9,
        gondosObservance:
            "カウンターの隅に、小さな白い花を一輪だけ活ける。花瓶はその日だけ奥から出される古い切子の小瓶。",
        apprenticesInference:
            "親父さんは花を飾る人ではない。だから年に一度だけ咲くその白い花が、誰のために置かれているかは、三年目に察した。誰にも聞かなかった。",
        unlockAfterNights: 280,
    },
    {
        id: "anniv-first-apprentice",
        label: "最初の弟子が去った日",
        month: 1,
        day: 22,
        gondosObservance:
            "その夜だけ、包丁研ぎをカウンターの上で、客に背を向けずに行う。研ぎ終えた包丁を鞘に納めず、朝まで布の上に置く。",
        apprenticesInference:
            "普段は決して客の前で刃物を扱わない人だ。年に一度だけその習慣が破られる。自分より前に誰かがこの場所に立っていた、と気づくのに四年かかった。",
        unlockAfterNights: 350,
    },
    {
        id: "anniv-mother-death",
        label: "母の命日",
        month: 5,
        day: 30,
        gondosObservance:
            "店を開ける前に、竈の前で短い時間だけ手を合わせる。その日の出汁は昆布を一枚多く引き、味を決してしない。",
        apprenticesInference:
            "同じ日の出汁だけ、わずかに優しい味がする。理由を尋ねたことはない。だが毎年同じ日、同じ静けさで親父さんは鍋の前に立つ。",
        unlockAfterNights: 420,
    },
    {
        id: "anniv-war-end",
        label: "戦の終わった日",
        month: 8,
        day: 15,
        gondosObservance:
            "正午に合わせて、店の仕込みの手を一度だけ止める。ラジオをつけず、ただ厨房の窓を開け放って一分ほど立ち尽くす。",
        apprenticesInference:
            "その日の昼、厨房から物音が消える一分がある。最初は昼寝かと思った。親父さんの父親の話を遠回しに聞いた夜、あの一分の意味が重なった。",
        unlockAfterNights: 500,
    },
    {
        id: "anniv-shop-saved",
        label: "店を手放さずに済んだ日",
        month: 12,
        day: 28,
        gondosObservance:
            "年の瀬、その日だけ酒樽の一番下に仕舞ってある古い銚子を使う。客に出すのではなく、閉店後に自分のためだけに一合注ぐ。",
        apprenticesInference:
            "一年に一度だけ姿を見せる銚子がある。縁が欠け、釉薬も剥げている。捨てないのではなく、捨てられない夜があるのだと、樽の奥を覗いて分かった。",
        unlockAfterNights: 700,
    },
    {
        id: "anniv-own-birthday",
        label: "親父さん自身の誕生日",
        month: 9,
        day: 4,
        gondosObservance:
            "その日に限って、閉店後のカウンターに椅子を自分で引き、一杯目と同じ冷酒をもう一度だけ注ぐ。灯りを落とさず、しばらく座ったままでいる。",
        apprenticesInference:
            "祝いを口にしない人だ。だが年に一度、閉店後の座り方がいつもより長い夜がある。暦を照らし合わせて、ようやくその夜が何の夜か分かった。誰にも告げずにいる。",
        unlockAfterNights: 1000,
    },
];

/**
 * Returns today's observances (JST) that the apprentice has unlocked,
 * based on total nights served. Month/day are compared in JST.
 */
export function todaysObservances(
    totalNights: number,
    now?: Date,
): AnniversaryObservance[] {
    const base = now ?? new Date();
    const jst = new Date(base.getTime() + 9 * 60 * 60 * 1000);
    const month = jst.getUTCMonth() + 1;
    const day = jst.getUTCDate();
    return ANNIVERSARY_OBSERVANCES.filter(
        (a) =>
            a.month === month &&
            a.day === day &&
            a.unlockAfterNights <= totalNights,
    );
}
