/**
 * Night ending variants for the Silent Bartender sim.
 * Each variant is a short italic epilogue shown after the main ending text,
 * conditionally fitting a specific flavor of how the night unfolded.
 * Epilogues lean more internal and descriptive than Gondo's final monologue.
 */

export interface NightEndingVariant {
    id: string;
    condition: string;
    epilogue: string;
}

export const NIGHT_ENDING_VARIANTS: NightEndingVariant[] = [
    {
        id: "end-rain-last-guest",
        condition: "雨の日の最後の客を完璧に見送った夜",
        epilogue: "傘を畳む音が、今夜いちばん長い挨拶だった。\nカウンターに残った水滴を、私はわざと拭かずにおいた。",
    },
    {
        id: "end-ghost-satisfied",
        condition: "幽霊客を満足させた夜",
        epilogue: "椅子は最後まで空のままだったが、そこに確かに重みはあった。\nグラスの底に、誰のものでもない指紋がひとつ残っていた。",
    },
    {
        id: "end-heartbreak-short-kind",
        condition: "失恋客に短く優しくできた夜",
        epilogue: "言葉を足さなかったことが、今夜の正解だったと思う。\n氷が溶ける音だけが、彼女の代わりに長く話していた。",
    },
    {
        id: "end-ice-flawless",
        condition: "一晩中、氷を一度も砕きそこなわなかった夜",
        epilogue: "手首が音を覚えている夜というのがある。\n今夜の氷は、割れるのではなく、こちらに頷いてくれた。",
    },
    {
        id: "end-zero-fails",
        condition: "一度も注文を外さずに終えた夜",
        epilogue: "完璧さは、静けさに近い顔をしている。\n誰にも褒められないまま、今夜は静かに満ちていた。",
    },
    {
        id: "end-regular-only",
        condition: "常連客だけで埋まった夜",
        epilogue: "扉が開くたび、名前を呼ばずに済む安堵があった。\nこの店は、今夜だけ小さな居間になっていた。",
    },
    {
        id: "end-first-timer-returned",
        condition: "初来店の客が二杯目を頼んでくれた夜",
        epilogue: "二杯目というのは、最初の沈黙への返事に似ている。\n私は黙って、同じグラスをもう一度磨いた。",
    },
    {
        id: "end-silent-full-night",
        condition: "一言も交わさず全員を見送った夜",
        epilogue: "言葉の不在が、今夜は礼儀の形をしていた。\n閉店のドアが、その沈黙に代わって短く挨拶をした。",
    },
    {
        id: "end-storm-outside",
        condition: "外は嵐、店内は満席だった夜",
        epilogue: "窓の外の風を、誰も話題にしなかったのがよかった。\nここは避難所ではなく、ただの火の灯った場所であり続けた。",
    },
    {
        id: "end-old-man-smiled",
        condition: "めったに笑わない老客が小さく笑った夜",
        epilogue: "皺のひとつが、ほんの少しだけ方向を変えた気がした。\nその角度を、私はレシピノートの余白に書き残した。",
    },
    {
        id: "end-same-drink-everyone",
        condition: "全員が同じ一杯を頼んだ夜",
        epilogue: "偶然が作法に昇格する瞬間というのがある。\n今夜のグラスたちは、兄弟のように並んで眠った。",
    },
    {
        id: "end-music-matched",
        condition: "流した音楽が客の呼吸と一致した夜",
        epilogue: "誰も曲名を尋ねなかったのは、尋ねる必要がなかったからだ。\n店全体が、ひとつのゆっくりとした小節になっていた。",
    },
    {
        id: "end-lost-and-found",
        condition: "忘れ物を届け、礼を言われずに帰らせた夜",
        epilogue: "ありがとうの不在は、時に最も丁寧な返礼である。\nドアが閉まった後、私は小さく頷いてからカウンターに戻った。",
    },
    {
        id: "end-one-bad-save",
        condition: "一度だけ失敗し、それを別の客が救ってくれた夜",
        epilogue: "傷は、別の手のひらに預けられて初めて柔らかくなる。\n今夜の礼は、こちらから言うべきだったのだろう。",
    },
    {
        id: "end-dawn-almost",
        condition: "閉店間際、空が白み始めるまで誰かが残っていた夜",
        epilogue: "夜と朝の継ぎ目を、他人と共有することは滅多にない。\nその薄明を、私たちは一杯の水で静かに見送った。",
    },
];

export function pickNightEndingVariant(): NightEndingVariant {
    const index = Math.floor(Math.random() * NIGHT_ENDING_VARIANTS.length);
    return NIGHT_ENDING_VARIANTS[index];
}
