/**
 * Gondo's signature gestures — ten distinct hand shapes, arm motions,
 * and postures that are uniquely his. Unlike routines in gondo-habits.ts,
 * these are the geometric forms themselves: finger angles, wrist rotations,
 * shoulder tilts. The apprentice observes them night by night, trying to
 * copy a shape that took a lifetime to settle into the body.
 */

export interface GondoGesture {
    id: string;
    name: string;
    shapeDescription: string;
    whenItAppears: string;
    apprenticesImitation: string;
    unlockAfterNights: number;
}

export const GONDO_GESTURES: GondoGesture[] = [
    {
        id: "gesture-tokkuri-hold",
        name: "徳利の持ち方",
        shapeDescription:
            "右手の小指を内側に折り、残り三本は徳利の腹に沿って垂直に立てる。親指の腹を徳利の首の真下、くびれの一番細い部分に添え、手首は内側へ十五度ほど傾く。",
        whenItAppears: "常連に燗酒を注ぐ、その最初の一杯のときだけ現れる。",
        apprenticesImitation:
            "真似ると小指が浮き、徳利が前に滑る。十夜目でようやく小指の折り方を掴みかけた。",
        unlockAfterNights: 10,
    },
    {
        id: "gesture-behind-ear-scratch",
        name: "耳の後ろを掻く仕草",
        shapeDescription:
            "左手の中指と薬指の二本だけを耳の付け根の裏側に当て、他の指は軽く握ったまま。指先は円を描かず、縦に三回だけ短く動く。肘は体から離さない。",
        whenItAppears: "客に答えを急かされて、答えを少しだけ遅らせたいときに出る。",
        apprenticesImitation:
            "弟子は人差し指で掻いてしまい、動きが横になる。二十夜目、中指と薬指の二本だけを使うことを覚える。",
        unlockAfterNights: 20,
    },
    {
        id: "gesture-head-tilt-listen",
        name: "聞くときの首の傾げ方",
        shapeDescription:
            "頭をちょうど右へ十二度倒し、顎を胸に五ミリほど引く。肩は水平のまま動かず、視線だけがカウンターの木目に落ちる。口は閉じたまま、鼻で一拍吸う。",
        whenItAppears: "客が本題に入る直前、声が低くなった瞬間に自然と現れる。",
        apprenticesImitation:
            "弟子は肩まで一緒に傾けてしまう。三十五夜目、肩を動かさずに首だけ倒せた日があった。",
        unlockAfterNights: 35,
    },
    {
        id: "gesture-knife-grip",
        name: "包丁の握り方",
        shapeDescription:
            "親指と人差し指で刃の付け根を軽く挟み、中指以降の三本は柄を握らずに添えるだけ。手首は真っ直ぐ、肘は脇腹から拳ひとつぶん離す。刃は身体の中心線と平行に置かれる。",
        whenItAppears: "お通しの大根を剥くとき、最初の一刀を入れる前の構えとして現れる。",
        apprenticesImitation:
            "弟子は三本の指まで握り込んでしまい、刃が震える。五十夜かかって、ようやく肩の力を抜けるようになった。",
        unlockAfterNights: 50,
    },
    {
        id: "gesture-glass-placement",
        name: "猪口を置く指",
        shapeDescription:
            "右手の親指と中指で猪口の縁を挟み、人差し指は縁の真上で浮かせたまま触れない。カウンターに置く直前、手首だけを半回転させて底を先に木に触れさせる。",
        whenItAppears: "常連の定位置に一杯目を出す瞬間にだけ現れる。",
        apprenticesImitation:
            "弟子は人差し指を縁に掛けてしまう。七十五夜目、指先を一ミリだけ浮かせる感覚を掴む。",
        unlockAfterNights: 75,
    },
    {
        id: "gesture-counter-wipe",
        name: "カウンターを拭く円",
        shapeDescription:
            "布巾を四つ折りにして掌全体で押さえ、肘を支点に半径二十センチの半円を左から右へ一度だけ描く。返しは円ではなく、同じ軌跡を逆にたどる。",
        whenItAppears: "客が席を立った直後、次の客が入る前の数秒間に現れる。",
        apprenticesImitation:
            "弟子は小さな円を何度も重ねてしまう。百夜目、半円一回で済ませる潔さを初めて体得した。",
        unlockAfterNights: 100,
    },
    {
        id: "gesture-sleeve-adjust",
        name: "袖をまくる高さ",
        shapeDescription:
            "左手で右袖の縁を摘み、前腕の骨の出っ張りからちょうど指二本ぶん上まで正確に折り上げる。折り目は三回。反対の袖も同じ高さに揃え、最後に両肘を一度だけ後ろへ引く。",
        whenItAppears: "店を開ける直前、暖簾を出す前に必ず行われる。",
        apprenticesImitation:
            "弟子は左右の高さがずれる。百五十夜目、ようやく左右差が指一本以内に収まった。",
        unlockAfterNights: 150,
    },
    {
        id: "gesture-nod-acknowledge",
        name: "頷きの浅さ",
        shapeDescription:
            "顎を下へ二センチだけ動かし、戻すときは一センチしか上げない。回数は一度きり。目線は相手の目ではなく、相手の肩の線に置かれる。",
        whenItAppears: "客の話が核心に触れた瞬間、言葉の代わりに返される。",
        apprenticesImitation:
            "弟子は深く頷きすぎて意味が重くなる。二百二十夜目、浅く短い一度で止められた夜があった。",
        unlockAfterNights: 220,
    },
    {
        id: "gesture-palm-on-counter",
        name: "カウンターに置く掌",
        shapeDescription:
            "右の掌を指を揃えたまま、木目に対して斜め四十五度に置く。指先は伸ばさず、第二関節で軽く曲がる。親指だけが体側に向き、他の四本は客の方向を指す。",
        whenItAppears: "常連が帰り際、何も言わずに勘定を待っているときに現れる。",
        apprenticesImitation:
            "弟子は指を伸ばしすぎる。三百五十夜目、指の関節が自然に曲がる角度を見つけた。",
        unlockAfterNights: 350,
    },
    {
        id: "gesture-bow-at-noren",
        name: "暖簾を下ろす会釈",
        shapeDescription:
            "両手で暖簾の左右の端を持ち上げ、腰を十五度だけ折る。頭は腰と同じ角度までしか下げない。暖簾を畳む前に一拍、体を完全に止める。息は吐き切ったまま吸わない。",
        whenItAppears: "その夜最後の客を見送り、暖簾に手をかけた瞬間に現れる。",
        apprenticesImitation:
            "弟子は頭だけを下げてしまう。五百夜目、腰と頭が同じ角度で止まる会釈をひとつだけ作れた。",
        unlockAfterNights: 500,
    },
];

export function getObservedGestures(totalNights: number): GondoGesture[] {
    return GONDO_GESTURES.filter(
        (gesture) => gesture.unlockAfterNights <= totalNights,
    );
}
