/**
 * Silent Bartender — 20 restrained "thank you" phrases.
 * Customers say these when served well; the apprentice hears variety
 * across nights. Catalogued for English learning with warmth,
 * situation, and formality notes. Mix of American, British, and
 * old-fashioned registers — no g-dropping, natural spoken English.
 */

export interface ThanksPhrase {
    id: string;
    englishPhrase: string;
    japaneseEquivalent: string;
    warmth: 'cool' | 'warm' | 'very-warm' | 'deferred';
    situation: string;
    levelOfFormality: string;
}

export const THANKS_PHRASES: ThanksPhrase[] = [
    {
        id: 'thanks-plain',
        englishPhrase: 'Thanks.',
        japaneseEquivalent: 'どうも。',
        warmth: 'cool',
        situation: 'グラスを置いた瞬間、軽く頷いて一言。',
        levelOfFormality: 'かなりカジュアル、短く済ませる挨拶。',
    },
    {
        id: 'thanks-standard',
        englishPhrase: 'Thank you.',
        japaneseEquivalent: 'ありがとう。',
        warmth: 'warm',
        situation: '注文通りの一杯を受け取って、きちんと目を合わせて言う。',
        levelOfFormality: '標準的で丁寧、どの場面でも使える。',
    },
    {
        id: 'thanks-much-appreciated',
        englishPhrase: 'Much appreciated.',
        japaneseEquivalent: '助かります。',
        warmth: 'warm',
        situation: '忙しい中で一杯を出してもらい、礼儀正しく返す。',
        levelOfFormality: '大人っぽく丁寧、ビジネス寄りのカジュアル。',
    },
    {
        id: 'thanks-really',
        englishPhrase: 'Really, thank you.',
        japaneseEquivalent: '本当に、ありがとう。',
        warmth: 'very-warm',
        situation: '疲れ切った夜、気の利いた一杯を出されて素直な感謝が出る。',
        levelOfFormality: '感情がこもった丁寧さ、強調の "really" が効いている。',
    },
    {
        id: 'thanks-hit-the-spot',
        englishPhrase: 'That hit the spot.',
        japaneseEquivalent: 'これ、沁みるわ。',
        warmth: 'warm',
        situation: '一口飲んで、体に染みる感覚をそのまま言葉にする。',
        levelOfFormality: 'カジュアルで味わい深い、大人の慣用表現。',
    },
    {
        id: 'thanks-needed-this',
        englishPhrase: 'I needed this.',
        japaneseEquivalent: 'これが欲しかった。',
        warmth: 'warm',
        situation: '長い一日の後、最初の一口で肩の力が抜ける。',
        levelOfFormality: '個人的で率直、親しみのあるトーン。',
    },
    {
        id: 'thanks-lifesaver',
        englishPhrase: "You're a lifesaver.",
        japaneseEquivalent: '命の恩人だよ。',
        warmth: 'very-warm',
        situation: '終電前、どうしても一杯必要だった客が救われた顔で言う。',
        levelOfFormality: '口語的で大げさ、親しみを強調する表現。',
    },
    {
        id: 'thanks-cheers-mate',
        englishPhrase: 'Cheers, mate.',
        japaneseEquivalent: 'あんがとな。',
        warmth: 'cool',
        situation: 'イギリス人の常連が、軽くグラスを持ち上げながら言う。',
        levelOfFormality: 'ブリティッシュのカジュアル、男同士の気軽さ。',
    },
    {
        id: 'thanks-owe-you-one',
        englishPhrase: 'I owe you one.',
        japaneseEquivalent: '一つ借りができたな。',
        warmth: 'deferred',
        situation: '閉店間際に頼みを聞いてもらい、後日返す約束として。',
        levelOfFormality: 'カジュアルで互恵的、映画に出てくるような言い回し。',
    },
    {
        id: 'thanks-perfect',
        englishPhrase: 'This is perfect.',
        japaneseEquivalent: 'これ、完璧。',
        warmth: 'warm',
        situation: '注文を伝えた以上の出来で、思わず出てしまう感想。',
        levelOfFormality: '率直で具体的、褒め言葉としての感謝。',
    },
    {
        id: 'thanks-nice-one',
        englishPhrase: 'Nice one.',
        japaneseEquivalent: 'やるね。',
        warmth: 'cool',
        situation: 'イギリス寄りの客が、出来栄えに軽く頷いて言う。',
        levelOfFormality: 'カジュアル、英国口語で少し砕けた感謝。',
    },
    {
        id: 'thanks-youre-the-best',
        englishPhrase: "You're the best.",
        japaneseEquivalent: '最高だよあんた。',
        warmth: 'very-warm',
        situation: '常連が好みどおりの一杯を出され、笑顔で言う。',
        levelOfFormality: '熱のこもった口語、友人同士のトーン。',
    },
    {
        id: 'thanks-ta',
        englishPhrase: 'Ta.',
        japaneseEquivalent: 'どうも。',
        warmth: 'cool',
        situation: 'イギリス人の客が、ほぼ無言で一言だけ置いていく。',
        levelOfFormality: '極めてカジュアル、英国特有の短い "thanks"。',
    },
    {
        id: 'thanks-right-on',
        englishPhrase: 'Right on.',
        japaneseEquivalent: 'いいね。',
        warmth: 'cool',
        situation: 'アメリカの古株風の客が、グラスを受け取って頷く。',
        levelOfFormality: 'アメリカーナ、少しレトロでカジュアル。',
    },
    {
        id: 'thanks-bless-you',
        englishPhrase: 'Bless you.',
        japaneseEquivalent: 'ありがたいね。',
        warmth: 'warm',
        situation: '年配の客が、温かい一杯を受け取って柔らかく言う。',
        levelOfFormality: '古風で温かい、昔ながらの丁寧な表現。',
    },
    {
        id: 'thanks-appreciate-it',
        englishPhrase: 'Appreciate it.',
        japaneseEquivalent: 'ありがと、助かる。',
        warmth: 'cool',
        situation: '短く済ませたいが、きちんと感謝は伝えたい瞬間。',
        levelOfFormality: '現代的でカジュアル、主語を省いた口語。',
    },
    {
        id: 'thanks-you-know-what',
        englishPhrase: 'You know what, thanks.',
        japaneseEquivalent: 'いや、ほんとありがとう。',
        warmth: 'warm',
        situation: '一呼吸置いて、改めて素直な気持ちを伝える場面。',
        levelOfFormality: '考えて出した言葉、思慮深いトーン。',
    },
    {
        id: 'thanks-seriously',
        englishPhrase: 'Seriously, thank you.',
        japaneseEquivalent: 'マジでありがとう。',
        warmth: 'very-warm',
        situation: '普段あまり感情を出さない客が、強調して伝える。',
        levelOfFormality: '感情を込めた強調、率直で誠実。',
    },
    {
        id: 'thanks-thatll-do-nicely',
        englishPhrase: "That'll do nicely.",
        japaneseEquivalent: 'うん、これでいいね。',
        warmth: 'warm',
        situation: '一口飲んで満足し、落ち着いた声で評価する。',
        levelOfFormality: '控えめで大人っぽい、英国寄りの上品さ。',
    },
    {
        id: 'thanks-really-needed-that',
        englishPhrase: 'Thanks, I really needed that.',
        japaneseEquivalent: 'ありがとう、これが欲しかったんだ。',
        warmth: 'warm',
        situation: '肩の荷を下ろすように、しみじみと言う。',
        levelOfFormality: '率直で具体的、感謝に理由を添えた形。',
    },
];

export function pickThanksPhrase(warmth?: ThanksPhrase['warmth']): ThanksPhrase {
    const pool = warmth
        ? THANKS_PHRASES.filter((phrase) => phrase.warmth === warmth)
        : THANKS_PHRASES;
    const source = pool.length > 0 ? pool : THANKS_PHRASES;
    const index = Math.floor(Math.random() * source.length);
    return source[index];
}
