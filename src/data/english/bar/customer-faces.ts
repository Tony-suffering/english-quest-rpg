/**
 * Customer Faces — catalogued facial expressions the apprentice learns to read
 * across nights behind the counter. Each entry pairs a specific physical
 * configuration of muscles with what it tends to signal, plus a "false twin"
 * expression that looks nearly identical but means something else entirely.
 * Unlocked progressively by night count.
 */

export interface FacialExpression {
    id: string;
    expressionLabel: string;
    physicalDescription: string;
    whatItSignals: string;
    falseTwin: string;
    unlockAfterNights: number;
}

export const FACIAL_EXPRESSIONS: FacialExpression[] = [
    {
        id: "face-tired-thin-smile",
        expressionLabel: "疲れた人の薄い笑み",
        physicalDescription: "口角が三ミリだけ上がり、目尻の筋肉はまったく動いていない。頬の肉がわずかに下がったまま。",
        whatItSignals: "もう会話を続ける体力は残っていない、という合図。",
        falseTwin: "社交辞令の薄い笑みも同じ形だが、目尻の戻りの速度が速く、一瞬で平らに戻る。",
        unlockAfterNights: 5,
    },
    {
        id: "face-searching-memory-eyes",
        expressionLabel: "記憶を探しにいっている目",
        physicalDescription: "視線が正面より四十五度ほど上にずれ、瞳孔の焦点がグラスを通り抜ける。まばたきの間隔が長くなる。",
        whatItSignals: "今この場ではなく、過去のどこかに意識が飛んでいる。",
        falseTwin: "考え事をしている目と似ているが、考え事の方は視線が左右に細かく動く。",
        unlockAfterNights: 10,
    },
    {
        id: "face-frozen-inner-brow",
        expressionLabel: "動かなくなった眉の内側",
        physicalDescription: "眉の内側だけが寄せられ、それが固まったまま動かない。額の中央に縦の筋が一本残る。",
        whatItSignals: "悲しみを押し殺している途中、まだ自分でも気づいていない段階。",
        falseTwin: "単なる疑問の表情も眉の内側が寄るが、そちらは数秒で解ける。",
        unlockAfterNights: 15,
    },
    {
        id: "face-held-breath-jaw",
        expressionLabel: "息を止めた顎",
        physicalDescription: "下顎の筋肉が奥歯の裏で硬く締まり、喉仏が一度だけ上下してから止まる。頬骨の下に影ができる。",
        whatItSignals: "言いかけた言葉を飲み込んだ直後。",
        falseTwin: "料理を味わっている顎の締まりに似ているが、味わう時は小鼻が一緒に動く。",
        unlockAfterNights: 20,
    },
    {
        id: "face-post-cry-eyelids",
        expressionLabel: "泣いた後の瞼",
        physicalDescription: "上瞼の縁がうっすら腫れ、まつ毛の根元が湿ったまま乾いている。目の下の皮膚がいつもより薄い。",
        whatItSignals: "ここに来る前に一度泣き終えてきた。今は落ち着いている。",
        falseTwin: "花粉症の腫れも似ているが、そちらは小鼻の赤みとセットになる。",
        unlockAfterNights: 30,
    },
    {
        id: "face-forced-laugh-cheek",
        expressionLabel: "笑いを作った頬",
        physicalDescription: "頬骨の上の筋肉だけが持ち上がり、眼輪筋はまったく収縮していない。口角が左右非対称に上がる。",
        whatItSignals: "場の空気を壊さないために笑っている、本心はまったく別の場所にある。",
        falseTwin: "本物の苦笑いも左右非対称だが、そちらは目尻に細かい皺が刻まれる。",
        unlockAfterNights: 40,
    },
    {
        id: "face-waiting-to-speak-lips",
        expressionLabel: "話し出す直前の唇",
        physicalDescription: "下唇が一度だけ内側に巻き込まれ、湿らせた後で元の位置に戻る。口角は動かない。",
        whatItSignals: "今から切り出す話の重さを、本人が量っている。",
        falseTwin: "単に口が乾いているだけの時もあるが、乾きの方は舌先が先に出る。",
        unlockAfterNights: 55,
    },
    {
        id: "face-relief-shoulders-via-face",
        expressionLabel: "肩の力が抜けた瞬間の顔",
        physicalDescription: "目の下の筋肉がふっと柔らかくなり、鼻から抜ける息で小鼻がわずかに広がる。唇は半開きのまま静止する。",
        whatItSignals: "ずっと抱えていた緊張が、この席で初めて下りた。",
        falseTwin: "酔いが回った時の弛緩と似ているが、酔いの方は瞼が先に重くなる。",
        unlockAfterNights: 75,
    },
    {
        id: "face-looking-for-permission",
        expressionLabel: "許しを探す目",
        physicalDescription: "視線が一瞬だけこちらの目を捉え、すぐにカウンターへ戻る。瞬きが一度、通常より遅い。",
        whatItSignals: "自分の弱音をここで出していいか、静かに確認している。",
        falseTwin: "注文を決めきれない目と似ているが、そちらはメニューと棚の間を往復する。",
        unlockAfterNights: 100,
    },
    {
        id: "face-anger-held-at-temples",
        expressionLabel: "こめかみに留めた怒り",
        physicalDescription: "こめかみの血管が薄く浮き、噛み締めた奥歯の動きが耳の前で見える。眉はほとんど動かない。",
        whatItSignals: "怒りを外に出さない、と決めている途中。",
        falseTwin: "頭痛を堪えている顔も似ているが、頭痛の方は目を細める動作が先に来る。",
        unlockAfterNights: 130,
    },
    {
        id: "face-already-said-goodbye",
        expressionLabel: "もう別れを済ませた顔",
        physicalDescription: "眉も口角も中立の位置で止まり、視線は焦点を結ばずに一点に置かれる。呼吸が浅く、一定。",
        whatItSignals: "大事な誰かと、心の中ですでに別れを済ませてきた。",
        falseTwin: "疲れて無表情になっている顔と似ているが、疲れの方は瞼の重みが先に出る。",
        unlockAfterNights: 170,
    },
    {
        id: "face-small-pride-corners",
        expressionLabel: "小さな誇りが漏れた口角",
        physicalDescription: "口角の片側だけが一ミリ上がり、本人が気づく前に元に戻る。鼻の穴がわずかに広がる。",
        whatItSignals: "自分でも認めたくない嬉しさが、一瞬だけ顔に出た。",
        falseTwin: "皮肉な笑みも片側だけ上がるが、そちらは目元が冷たいまま動かない。",
        unlockAfterNights: 220,
    },
    {
        id: "face-child-returning",
        expressionLabel: "子どもの頃に戻った瞬間の顔",
        physicalDescription: "眉の力が完全に抜け、下唇がわずかに前に出る。頬の筋肉が丸く持ち上がり、年齢が一瞬だけ引き算される。",
        whatItSignals: "ある匂いか味か音が、本人を昔の自分に戻した。",
        falseTwin: "甘えた表情と似ているが、甘えの方は視線が相手にまっすぐ向かう。",
        unlockAfterNights: 300,
    },
    {
        id: "face-decision-already-made",
        expressionLabel: "もう決めた人の静けさ",
        physicalDescription: "顔全体の筋肉が余計な動きを止め、まばたきの回数が普段より減る。頬の縦のラインがまっすぐ落ちる。",
        whatItSignals: "来る前に大きな決断を済ませてあり、ここではそれを確かめているだけ。",
        falseTwin: "諦めの顔と形は似ているが、諦めの方は視線が床に落ちる。",
        unlockAfterNights: 400,
    },
    {
        id: "face-last-time-here",
        expressionLabel: "今夜で最後だと知っている顔",
        physicalDescription: "店内の一点一点に視線が長めに留まり、最後にカウンターの木目を撫でるように目が動く。口元は薄く柔らかい。",
        whatItSignals: "この場所に来るのが今夜で最後になる、と本人だけが知っている。",
        falseTwin: "初めて来た客の観察する顔と似ているが、初見の方は視線が速く、物の名前を数えるように動く。",
        unlockAfterNights: 600,
    },
];

export function getRecognizedFaces(totalNights: number): FacialExpression[] {
    return FACIAL_EXPRESSIONS.filter((face) => face.unlockAfterNights <= totalNights);
}
