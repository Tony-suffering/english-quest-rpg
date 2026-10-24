/**
 * Regular routines mapped by the apprentice over many nights of silent observation.
 * Each entry records one named (anonymously described) regular whose weekly or monthly
 * pattern has become legible: arrival, ritual, duration, and the small human truth
 * underneath the repetition. Unlocks progressively as the apprentice logs more nights.
 */

export interface RegularRoutine {
    id: string;
    descriptor: string;
    frequency: string;
    arrivalTime: string;
    orderOrRitual: string;
    durationPattern: string;
    apprenticesObservation: string;
    unlockAfterNights: number;
}

export const REGULAR_ROUTINES: RegularRoutine[] = [
    {
        id: 'routine-sunday-widower',
        descriptor: '日曜しか来ない初老の男',
        frequency: '週に一度、日曜の晩のみ',
        arrivalTime: '七時ちょうど',
        orderOrRitual: '瓶ビール一本を自分で注ぎ、二杯目だけ熱燗に切り替える。お通しには決して箸をつけない。',
        durationPattern: '三十五分後、会釈だけ残して裏口から出ていく。',
        apprenticesObservation: '誰かの席を空けたまま座っている人は、背筋の伸び方でわかる。',
        unlockAfterNights: 15,
    },
    {
        id: 'routine-thursday-accountant',
        descriptor: '木曜の雨の日に現れる眼鏡の中年',
        frequency: '木曜、雨が降った晩だけ',
        arrivalTime: '八時十分過ぎ',
        orderOrRitual: '焼酎の水割りを一杯。カウンターに帳面を広げ、数字を書き写してから飲み始める。',
        durationPattern: '帳面を閉じると同時に席を立ち、傘を忘れそうになりながら出る。',
        apprenticesObservation: '雨の音を仕事の続きにする人がいる。静かなのは疲れているからではない。',
        unlockAfterNights: 25,
    },
    {
        id: 'routine-last-friday-widow',
        descriptor: '月の最終金曜に来る和装の女',
        frequency: '月の最終金曜',
        arrivalTime: '九時前後',
        orderOrRitual: '冷酒を二合、同じ銘柄でしか頼まない。最後の一口を猪口に残して合掌する。',
        durationPattern: '合掌のあと五分だけ座り、勘定は紙幣をきっちり揃えて置く。',
        apprenticesObservation: '悲しみにも手順がある。崩さないことで自分を保っている人がいる。',
        unlockAfterNights: 40,
    },
    {
        id: 'routine-seventeenth-gentleman',
        descriptor: '毎月十七日だけ来る背広の男',
        frequency: '毎月十七日、日付が合う日のみ',
        arrivalTime: '十一時過ぎ',
        orderOrRitual: 'ハイボールを一杯、氷の音を立てないように回す。財布から古い写真を一度だけ出して戻す。',
        durationPattern: '写真を戻した瞬間に立ち、挨拶せずに出ていく。',
        apprenticesObservation: '見せないための儀式を、人は他人の前でだけ完成させる。',
        unlockAfterNights: 60,
    },
    {
        id: 'routine-tuesday-craftsman',
        descriptor: '火曜の早い時間に来る職人風の男',
        frequency: '週に一度、火曜',
        arrivalTime: '六時半',
        orderOrRitual: 'ぬる燗を一本、枝豆を殻ごと皿の端に整然と並べる。誰にも話しかけない。',
        durationPattern: '皿の上で殻が直線になったところで会計、所要四十分。',
        apprenticesObservation: '誇りは言葉より先に指先に出る。整える手つきが履歴になっている。',
        unlockAfterNights: 80,
    },
    {
        id: 'routine-biweekly-sisters',
        descriptor: '隔週の水曜に二人で来る姉妹らしき女たち',
        frequency: '二週に一度、水曜',
        arrivalTime: '七時四十五分',
        orderOrRitual: '梅酒ロックを一杯ずつ。最初の十分は無言、次の十分で片方だけが一気に喋る。',
        durationPattern: '九時半に片方が先に立ち、残った方が勘定を済ませて五分遅れて出る。',
        apprenticesObservation: '沈黙を分け合える相手がいる人は、沈黙の長さで近さを測っている。',
        unlockAfterNights: 110,
    },
    {
        id: 'routine-monthly-first-teacher',
        descriptor: '月初の月曜に来る白髪の教師らしい男',
        frequency: '月の最初の月曜',
        arrivalTime: '八時ちょうど',
        orderOrRitual: '日本酒を冷やで一合、万年筆で紙ナプキンに何かを書いてから飲む。書いた紙は必ず持ち帰る。',
        durationPattern: '一時間五分、時計を二度だけ見て席を立つ。',
        apprenticesObservation: '残したい言葉と残してはいけない言葉を、人は自分の手で分けている。',
        unlockAfterNights: 150,
    },
    {
        id: 'routine-quarterly-veteran',
        descriptor: '三月に一度だけ現れる軍歴のありそうな老人',
        frequency: '三か月に一度、季節の変わり目',
        arrivalTime: '十時過ぎ',
        orderOrRitual: 'ウイスキーをストレートで一杯、同じ銘柄を必ず指名する。飲み干す前に一度だけ天井を見る。',
        durationPattern: '二十分で席を立ち、礼だけ深く、足音を残さず出る。',
        apprenticesObservation: '帰ってこられなかった人の分を飲む人は、乾杯の相手を天井に置く。',
        unlockAfterNights: 200,
    },
    {
        id: 'routine-first-saturday-couple',
        descriptor: '月の第一土曜に来る老夫婦',
        frequency: '月の第一土曜',
        arrivalTime: '六時四十分',
        orderOrRitual: '妻がビール、夫が焼酎。注文の順は必ず妻が先、同じ肴を二皿取り、半分ずつ分ける。',
        durationPattern: '八時に夫が先に立ち上がり、妻が上着を着せてもらってから出る。',
        apprenticesObservation: '長く連れ添った二人の動作は、言葉より早く相手の意志に届いている。',
        unlockAfterNights: 280,
    },
    {
        id: 'routine-equinox-wanderer',
        descriptor: '春と秋の彼岸に来る旅人のような男',
        frequency: '年に二度、彼岸の頃',
        arrivalTime: '閉店の一時間前',
        orderOrRitual: '熱燗を一合、肴は頼まない。猪口を両手で包んで、息を三度吐いてから口をつける。',
        durationPattern: '四十分、勘定は小銭まで揃えて置き、名前も名乗らず出る。',
        apprenticesObservation: '遠くから来た人ほど、店の何を見ているのかはわからない。それでいい客がいる。',
        unlockAfterNights: 380,
    },
    {
        id: 'routine-yearly-gratitude',
        descriptor: '年に一度だけ来る若く見えるが老いた男',
        frequency: '一年に一度、同じ日付',
        arrivalTime: '九時十五分',
        orderOrRitual: '生ビール一杯と、この店で一番安い肴を一皿。食べ終わると小さく頭を下げる。',
        durationPattern: '正味二十五分、勘定書を見ずに多めに置いて出る。',
        apprenticesObservation: '一度助けられた記憶は、助けた側より助けられた側が長く数えている。',
        unlockAfterNights: 500,
    },
    {
        id: 'routine-anniversary-silent',
        descriptor: '店の節目にだけ顔を出す誰にも知られていない男',
        frequency: '店の開店記念日の前後',
        arrivalTime: '十一時半',
        orderOrRitual: '何も頼まず、カウンターの端に立ったまま水を一杯もらう。グラスを置く音を立てない。',
        durationPattern: '十分いて、空のグラスを裏返してから静かに出る。',
        apprenticesObservation: '名乗らない客の敬意は、注文ではなく所作の小ささに表れる。',
        unlockAfterNights: 700,
    },
];

export function getMappedRoutines(totalNights: number): RegularRoutine[] {
    return REGULAR_ROUTINES.filter((routine) => routine.unlockAfterNights <= totalNights);
}
