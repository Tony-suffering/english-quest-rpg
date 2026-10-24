/**
 * Silent Bartender -- bar jokes.
 *
 * Subtle jokes, wordplay, and lightly-funny observations that fit
 * the tone of this universe. For rare bursts of lightness after
 * tonal clusters of heavy customers.
 */

export const BAR_JOKES: string[] = [
    '客「英語で注文したい」/ マスター「俺の英語は、酒瓶のラベル以上は期待するな」',
    '客「この店、屋号ないんですか」/ マスター「名前は、客がつけるって教わった」',
    'タクシー運転手「お釣りはいいです」/ マスター「ここは居酒屋です。タクシーじゃない」',
    '権藤「お前、今夜一度も声を出さなかったな」/ 見習い「...」/ 権藤「返事しろ」/ 見習い「...」',
    '酔客「もう一杯！」/ 見習い（心の中で: 一時間前にも同じこと聞いた）',
    'マスター「俺、昔ニューヨークで働いてたんだ」/ 客「すごい」/ マスター「やっぱり日本のほうが静かだな」',
    '観光客「日本酒、熱燗か冷酒か、どっちがいい？」/ マスター「夜の空気で決めろ」/ 観光客「...」',
    '客「ここのビール、特別な銘柄なんですか」/ マスター「特別に普通だ」',
    '客「この店、何年経つんですか」/ マスター「木目に聞け」',
    '客「英語話せますか」/ マスター「話せる」/ 客「じゃあ」/ マスター「でも話さない」',
];

export function pickJoke(): string {
    return BAR_JOKES[Math.floor(Math.random() * BAR_JOKES.length)];
}
