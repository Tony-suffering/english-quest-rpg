/**
 * Silent Bartender -- things the apprentice remembers Gondo saying.
 *
 * Internal quotes the bartender recalls from past training with
 * Gondo, rotated as brief italic beats during the intro or between
 * customers. All are paraphrased — lessons boiled down to a line.
 */

export const REMEMBERED_QUOTES: string[] = [
    '「客の手を見ろ。手が先に物を言う」',
    '「氷は、嘘をつかない素材だ。溶ける時間がそのまま真実になる」',
    '「夜、カウンターで一番大切なのは、自分が見えすぎないことだ」',
    '「熱燗は、湯の温度じゃなくて、徳利の厚みで決まる」',
    '「お前は、明日を明日ほど信じるな」',
    '「客を三人同時に見るな。一人ずつ、ちゃんと見ろ」',
    '「謝罪は店の仕事じゃない。客の仕事だ。我々は、受け止める」',
    '「酒を出すのは、会話を始めるためじゃない。会話を終わらせるためだ」',
    '「ありがとうの声に、返事はいらない。頷きだけで、相手は分かる」',
    '「正しい酒は、客が座った瞬間に既に決まっている。お前は、それを見つけるだけだ」',
    '「雨の日は、客が小さく見える。晴れの日は、大きく見える。どちらも同じ客だ」',
    '「閉店は、客が決める時もある。暖簾を下ろす時じゃない、最後の客が帰る時だ」',
    '「酒場の沈黙は、他のどこの沈黙とも違う。それに慣れろ」',
    '「お前が悩む顔を、客は見ていない。安心して悩め」',
    '「毎夜、一人の客に一つだけ新しいことを試せ。完璧にはなるな」',
    '「年長の客に、敬語を使うな。言葉より、態度で示せ」',
    '「同じ客が同じ注文を続ける理由は、安心じゃない、儀式だ」',
    '「店の匂いは、お前の服にもつく。それが、お前を店の一部にしてくれる」',
    '「俺の言葉を、すべて覚える必要はない。本当に必要な時に、一つだけ思い出せ」',
    '「師匠は、教えないものだ。見るものだ」',
];

export function pickRememberedQuote(): string {
    return REMEMBERED_QUOTES[Math.floor(Math.random() * REMEMBERED_QUOTES.length)];
}
