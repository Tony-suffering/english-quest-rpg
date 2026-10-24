/**
 * Prestige threshold unlocks for Silent Bartender.
 * Eight rare content reveals keyed to specific high night counts.
 * Each entry marks a quiet milestone in the apprentice's tenure at the izakaya.
 * Triggered only when totalNights meets or exceeds the stored threshold.
 */

export interface PrestigeUnlock {
    id: string;
    thresholdNights: number;
    title: string;
    sceneOrReveal: string;
    unlockNote: string;
}

export const PRESTIGE_UNLOCKS: PrestigeUnlock[] = [
    {
        id: "prestige-first-solo-close",
        thresholdNights: 100,
        title: "はじめての一人仕舞い",
        sceneOrReveal:
            "権藤はカウンターの内側で前掛けを外し、何も言わずに暖簾をくぐった。\n「今夜は頼むわ」ただそれだけを背中で言い残して、路地の奥へ消えていく。\n見習いは鍵束の重さを手のひらで確かめ、残った二人の客にゆっくり茶を淹れた。\n最後の一皿を洗い終えたとき、店内には湯気と灯芯の匂いだけが残っていた。\n電気を落とす指先が、はじめて迷わなかった。",
        unlockNote: "権藤が閉店を一任した最初の夜。鍵の扱いが記録に残る。",
    },
    {
        id: "prestige-long-absent-return",
        thresholdNights: 150,
        title: "戻ってきた常連",
        sceneOrReveal:
            "戸が開いた瞬間、見習いはその顔を思い出せなかった。コートの裾に雪。\n「まだやってたんだな、この店」低い声が、引き戸より静かに落ちる。\n三年ぶりの客は、カウンターの端、いつもの席にまっすぐ歩いた。\n「おまえ、あのときの坊主か」見習いの手元で、注ぎ口がわずかに震えた。\n「顔だけはずいぶん、あの人に似てきたな」",
        unlockNote: "長く姿を消していた客が戻り、見習いの成長を証言する。",
    },
    {
        id: "prestige-heirloom-knife",
        thresholdNights: 250,
        title: "譲られた小刀",
        sceneOrReveal:
            "権藤は布に包んだそれを、仕込み台の上にそっと置いた。\n柄の朴の木は手の脂で黒く光り、刃の峰には細かな打痕が走っている。\n「親父から預かったやつだ。おれは使い切れんかった」\n見習いが口を開く前に、権藤は奥の冷蔵庫を開けて背を向けた。\n布の端に、墨で小さく「権藤」と書かれていた。",
        unlockNote: "先代から続く小刀が、見習いの道具箱に加わる。",
    },
    {
        id: "prestige-teaching-by-absence",
        thresholdNights: 400,
        title: "不在という稽古",
        sceneOrReveal:
            "権藤の休みが、今月はもう四度目だ。理由は尋ねていない。\n仕込みの味噌は切らしていたし、燗つけの湯加減も誰も直してくれなかった。\n客に「親父は」と聞かれ、見習いは「今日は奥で休んでます」とだけ答えた。\n閉店後、見習いはふと気づく。\nあの人は、居ないことで教えている。帰ってくるたび、何も言わないのはそのためだ。",
        unlockNote: "権藤の欠席が意図された稽古であると、見習いが理解する夜。",
    },
    {
        id: "prestige-mistaken-for-owner",
        thresholdNights: 500,
        title: "主人と間違われる",
        sceneOrReveal:
            "ガラガラと戸が鳴り、背広の男が一人で入ってきた。初めて見る顔だ。\n「大将、お薦めを」と男は当たり前のように言い、カウンターに腰を下ろした。\n見習いは一瞬、誰のことか分からず後ろを振り返った。権藤はいない。\n「今日は何が」男の目は、まっすぐこちらを向いている。\n「……鰆が、いいのが入ってます」自分の声が、少しだけ低くなっていた。",
        unlockNote: "一見客が見習いをこの店の主として扱う。役割が境を越える瞬間。",
    },
    {
        id: "prestige-single-nod",
        thresholdNights: 700,
        title: "一度きりの頷き",
        sceneOrReveal:
            "権藤はその夜、ほとんど口を開かなかった。「おう」も「はい」もなかった。\n仕込みの指示も、客への応対も、すべて見習いの判断に任された。\n最後の客が帰り、暖簾を下ろして戻ってきたとき、権藤は銚子を置いた手を止めた。\n見習いの目を一度だけ見て、ゆっくりと、浅く頷いた。\nそれから流しのほうへ歩いていき、栓をひねる音だけが残った。",
        unlockNote: "言葉ではなく所作での承認。見習いの中で静かに刻まれる。",
    },
    {
        id: "prestige-called-by-name",
        thresholdNights: 900,
        title: "名前で呼ばれる",
        sceneOrReveal:
            "電話が鳴り、受話器の向こうの女は迷わず名前を言った。\n「今夜、あの人に会いに行きたいんだけど、いますか」\n見習いは自分のことを指しているとすぐには分からなかった。\n「権藤さんじゃなくて、あなたに相談したくて」声は静かで、よく知っている響きだった。\n受話器を置いたあと、見習いはしばらくカウンターに手をついていた。",
        unlockNote: "見習いではなく固有の名前で客に求められた最初の夜。",
    },
    {
        id: "prestige-unsent-letter",
        thresholdNights: 1000,
        title: "出さない手紙",
        sceneOrReveal:
            "閉店後のカウンターで、見習いは便箋を広げた。宛先は、もう会うことのない誰かだった。\n書き出しを三度書き直し、四度目でようやく最初の一行が残った。\n店のこと、権藤のこと、雪の夜に戻ってきた客のこと。書くうちに、時計は三時を回っていた。\n最後の行を書き終え、封筒に入れて糊を閉じた。住所も書いた。切手も貼った。\nそれから見習いは、その封筒を仕込み台の一番下の引き出しに、静かにしまった。",
        unlockNote: "書き上げて、送らないと決めた手紙。物語が内側で閉じる夜。",
    },
];

export function getAchievedPrestige(totalNights: number): PrestigeUnlock[] {
    return PRESTIGE_UNLOCKS.filter((entry) => totalNights >= entry.thresholdNights);
}
