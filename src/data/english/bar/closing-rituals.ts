/**
 * Closing rituals for the Silent Bartender sim.
 * Twelve ordered steps performed by Gondo after the last guest leaves,
 * each paired with its triggering cue and the subtle problem that arises
 * when the step is rushed or skipped. Apprentice learns by shadowing.
 */

export interface ClosingRitual {
    id: string;
    order: number;
    ritualName: string;
    exactAction: string;
    timingCue: string;
    whySubtleProblem: string;
}

export const CLOSING_RITUALS: ClosingRitual[] = [
    {
        id: "ritual-last-pour",
        order: 1,
        ritualName: "最後の一杯を注ぎ足す",
        exactAction: "残った客のグラスに無言で冷酒を一口分だけ足す。瓶は棚に戻さず、カウンター下の受け皿に立てておく。",
        timingCue: "最後の客が腕時計か携帯を一度見た瞬間。",
        whySubtleProblem: "ここで声をかけると「追い出された」と感じる。黙って足すことで客が自分の意思で立つ余地が残る。",
    },
    {
        id: "ritual-noren-down",
        order: 2,
        ritualName: "暖簾を下ろす",
        exactAction: "外に出て暖簾の両端を内側に畳み、竿から外して縦二つ折りで抱える。裏返しにはしない。",
        timingCue: "最後の客が路地を曲がって姿が見えなくなった直後。",
        whySubtleProblem: "客の背中が見えるうちに下ろすと、振り返ったときに拒絶の合図に読み取られる。",
    },
    {
        id: "ritual-radio-off",
        order: 3,
        ritualName: "ラジオをNHK第二で切る",
        exactAction: "ダイヤルをAM693に合わせ、音量を一度上げてから電源を切る。番組の途中でも構わない。",
        timingCue: "暖簾を抱えて店内に戻り、床に置いた瞬間。",
        whySubtleProblem: "民放の途中で切ると翌朝の開店時にCMから再生されて調子が狂う。第二放送なら必ず静かな声で始まる。",
    },
    {
        id: "ritual-kill-flames",
        order: 4,
        ritualName: "竈の火を落とす",
        exactAction: "元栓ではなく、まずコンロ側の種火を順に消す。最後に壁の元栓を九十度だけ閉める。",
        timingCue: "ラジオが消えて店内が静まった直後、換気扇がまだ回っているうち。",
        whySubtleProblem: "換気扇より先に火を落とさないと、残った油煙が暖簾に吸い込まれ翌日の夕方まで匂いが残る。",
    },
    {
        id: "ritual-hood-fan",
        order: 5,
        ritualName: "換気扇を止める",
        exactAction: "スイッチを押す前に一度手をかざし、排気が止まりかけているのを確認してから切る。フィルターには触れない。",
        timingCue: "元栓を閉めた音が聞こえてから十を数えた後。",
        whySubtleProblem: "火が完全に落ちる前に止めると、熱気がカウンター上に降りてガラス器を曇らせる。",
    },
    {
        id: "ritual-wipe-glasses",
        order: 6,
        ritualName: "グラスを逆手で拭く",
        exactAction: "麻布を右手に巻き、グラスは左手で逆さに持つ。内側から外側の順で、縁は最後に一周だけ。",
        timingCue: "換気扇の余韻が消え、天井の音が完全に静かになってから。",
        whySubtleProblem: "空気が動いているうちに拭くと繊維の埃がグラスに残る。静止した空気の中でしか光らない。",
    },
    {
        id: "ritual-counter-wipe",
        order: 7,
        ritualName: "カウンターを拭く",
        exactAction: "濡れ布巾で木目に沿って一方向に三度。戻さない。最後に乾いた晒で同じ方向に一度だけ。",
        timingCue: "グラスを全て棚に伏せ終え、麻布をシンクに掛けた直後。",
        whySubtleProblem: "往復で拭くと木目に酒気が染み込み、翌日座った客の袖口に匂いが移る。",
    },
    {
        id: "ritual-ice-save",
        order: 8,
        ritualName: "氷と水を残す",
        exactAction: "製氷皿の底の氷は捨てず、金属ボウルに移して冷蔵庫下段へ。水差しの水は三分の一だけ残して蓋をしない。",
        timingCue: "カウンターの乾拭きが終わり、布が乾いたのを確認した後。",
        whySubtleProblem: "全部捨てると翌日の最初の一杯が金属臭を帯びる。古い氷が器の匂いを取ってくれる。",
    },
    {
        id: "ritual-reset-chairs",
        order: 9,
        ritualName: "椅子を戻す",
        exactAction: "椅子を持ち上げてカウンターから指二本分離して置く。押し込まない。座面は全て右手側に向ける。",
        timingCue: "冷蔵庫の扉が閉まった音を聞いてから。",
        whySubtleProblem: "押し込んで揃えると朝の光が当たったとき一列に影ができて、客が入りにくい雰囲気になる。",
    },
    {
        id: "ritual-step-outside",
        order: 10,
        ritualName: "表に出て息を吸う",
        exactAction: "店のドアを半分だけ開け、敷居をまたいで路地に立つ。三呼吸だけ。戻るとき中の匂いを確認する。",
        timingCue: "椅子の配置が終わり、店内で動くものが自分以外に無くなった時。",
        whySubtleProblem: "鼻が店の匂いに慣れたまま閉めると、残った異臭に気付かない。外気を一度通さないと判断ができない。",
    },
    {
        id: "ritual-lock-timer-check",
        order: 11,
        ritualName: "施錠タイマーを確認する",
        exactAction: "分電盤の横のタイマーに指を触れ、針が翌日の午後四時半を指しているか目で追う。触って動かさない。",
        timingCue: "外気を入れた後、ドアを閉めて内鍵を下ろす前。",
        whySubtleProblem: "目視せずに閉めた日は必ず翌日の仕込みに三十分遅れが出る。手より先に目で確かめる癖が要る。",
    },
    {
        id: "ritual-final-bow",
        order: 12,
        ritualName: "カウンターに一礼する",
        exactAction: "照明を落とす前に、カウンターの中央に向かって浅く頭を下げる。言葉は無し。そのまま背中を向けず横に抜ける。",
        timingCue: "タイマーを確認し、手に鍵を握った瞬間。",
        whySubtleProblem: "背を向けて出ると翌日入ったときに木が冷たく感じる。横から抜けると朝の一拭きで温度が戻る。",
    },
];
