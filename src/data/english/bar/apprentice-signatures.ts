/**
 * Apprentice Signatures — the small personal moves the silent apprentice develops
 * late in the game, after hundreds of nights at Gondo's counter. Some are copies
 * that mutated into something else. Some were born from failure. A few are
 * entirely their own. Gondo, mostly, says nothing. That is also a response.
 */

export interface ApprenticeSignature {
    id: string;
    signatureName: string;
    technique: string;
    originStory: string;
    gondosResponse: string;
    unlockAfterNights: number;
}

export const APPRENTICE_SIGNATURES: ApprenticeSignature[] = [
    {
        id: 'sig-third-seat-water',
        signatureName: '三番目の席の客への、冷たい水の出し方',
        technique: '三番目の席の客が着席した直後、お通しを出す前に、一呼吸だけ置く。場の温度を読むための間。グラスは縁を持たず、底を支えて静かに差し出す。',
        originStory: '最初の半年、三番目の席にだけ客の反応がぎこちない夜が続いた。権藤のやり方を真似るうち、席そのものの気配の違いに気づいて、間の長さを変えた。',
        gondosResponse: '権藤は何も言わなかった。ただ次の夜から、自分が三番目の席を担当する頻度が少しだけ減った。',
        unlockAfterNights: 100,
    },
    {
        id: 'sig-coaster-angle',
        signatureName: 'コースターの角度、十五度',
        technique: 'コースターを客の正面に真っ直ぐ置かず、利き手側に約十五度だけ傾ける。グラスを取る時の肘の負担が消える。客はそのことに気づかない。',
        originStory: '自分が酔った夜に家で試して、翌日も腕が軽かったことから逆算して作った。権藤の所作を何度見ても真似にならず、失敗から産まれた独自の型。',
        gondosResponse: '一度、権藤に「まっすぐ置け」と注意された。言われた通りに直した翌晩、権藤自身が無言で十五度傾けて置いていた。訂正が肯定に化けた瞬間だった。',
        unlockAfterNights: 200,
    },
    {
        id: 'sig-ice-second-tap',
        signatureName: '氷の、二度目の合図',
        technique: '最初の一杯の氷はそのまま。二杯目を作る直前、アイスピックの柄の尻で製氷の角を一度だけ軽く叩いて角を落とす。溶け方が変わり、会話の長さに酒が付いていく。',
        originStory: '権藤が無意識にやっていた仕草を、三ヶ月かけて目で盗んだ。ただ真似るだけだと溶けすぎた。叩く強さを半分にしてようやく、権藤の杯と同じ線まで辿り着いた。',
        gondosResponse: '権藤は気づいていたはずだが、何も言わなかった。ある晩、自分のピックを黙って弟子の作業台側に置いて、そのまま片付けを始めた。',
        unlockAfterNights: 350,
    },
    {
        id: 'sig-farewell-half-step',
        signatureName: '見送りの、半歩',
        technique: '客が暖簾をくぐって出て行く時、追って一歩ではなく、半歩だけ前に出て止まる。頭は下げない。視線だけを戸の高さに残す。客が振り返った時にだけ、そこに自分がいる。',
        originStory: '常連を見送る時、深く頭を下げすぎて逆に客を困らせた夜があった。その気まずさから、距離と動作を半分ずつ削って残ったのがこの形。',
        gondosResponse: '権藤は見送りを自分でやる夜が多く、弟子のこの所作を正面から見る機会はほぼなかった。ただ、ある冬の夜、客が帰った後に一度だけ、短く頷いた。',
        unlockAfterNights: 500,
    },
    {
        id: 'sig-closing-last-wipe',
        signatureName: '閉店後の、最後のひと拭き',
        technique: '全ての片付けが終わった後、何も置かれていないカウンターを、もう一度だけ左から右へ一息で拭く。汚れを拭くのではなく、その夜を畳むための動作。布は必ず湿らせずに乾いたまま。',
        originStory: '完全に自分の型。誰にも教わらず、八百夜の間に少しずつ削って残った所作。最初は濡れた布でやっていたが、乾いた方が夜が静かに終わることに気づいた。',
        gondosResponse: '権藤は一度もこの動作に触れなかった。ただ、ある日から自分の閉店作業を先に終えて、弟子のこの最後のひと拭きを、背中越しに待つようになった。',
        unlockAfterNights: 800,
    },
];

export function getDevelopedSignatures(totalNights: number): ApprenticeSignature[] {
    return APPRENTICE_SIGNATURES.filter((sig) => totalNights >= sig.unlockAfterNights);
}
