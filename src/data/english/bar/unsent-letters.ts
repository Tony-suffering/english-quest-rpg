/**
 * Unsent Letters — folded pieces of paper the apprentice finds around the bar
 * across many nights. None were ever mailed. Customers left them behind,
 * tucked into books, slipped under coasters, forgotten in coat pockets.
 * The apprentice does not open them lightly. Each is a small, undelivered life.
 * Unlocks progress with night count: 50, 100, 180, 300, 500.
 */

export interface UnsentLetter {
    id: string;
    foundLocation: string;
    writerGuess: string;
    addresseeGuess: string;
    letterBody: string;
    unlockAfterNights: number;
}

export const UNSENT_LETTERS: UnsentLetter[] = [
    {
        id: "unsent-coat-pocket",
        foundLocation: "預かったままのコートの内ポケット。三日経っても取りに来なかった。",
        writerGuess: "たぶん四十代の男性。煙草の匂いがしみていた。",
        addresseeGuess: "出ていった奥さんに宛てたもの、だと思う。",
        letterBody: [
            "冷蔵庫の音がうるさいと言っていたのを、直してから書いている。",
            "あの時すぐ直せばよかった。それだけのことだった。",
            "味噌汁の鍋はまだ君の置き方のままにしてある。",
            "迎えに行く勇気はない。ただ、元気でいるかだけ知りたい。",
            "返事はいらない。",
        ].join("\n"),
        unlockAfterNights: 50,
    },
    {
        id: "unsent-book-page",
        foundLocation: "常連が置いていった文庫本の、しおり代わりに挟まれていた。",
        writerGuess: "白髪の、いつも隅の席で本を読んでいた人。",
        addresseeGuess: "去年亡くなった、古い友人への手紙。",
        letterBody: [
            "お前が先に逝くとは思っていなかった。順番が違うだろう。",
            "約束していた店にようやく行った。鰻はうまかった。",
            "隣の席を空けておいたら、店員がもう一人来るかと聞いてきた。",
            "来ると答えた。嘘ではない気がした。",
            "次はお前の好きだった蕎麦屋に行く。",
        ].join("\n"),
        unlockAfterNights: 100,
    },
    {
        id: "unsent-counter-drawer",
        foundLocation: "カウンター下の引き出しの奥、布巾に包まれて。",
        writerGuess: "筆跡は女性。年齢までは読み取れない。",
        addresseeGuess: "連絡の取れなくなった息子、のように読める。",
        letterBody: [
            "怒っていない、とだけ書いておきたい。",
            "あの時の言葉は母親の言葉ではなかった。ただの疲れた人間の言葉だった。",
            "誕生日には赤飯を炊いている。一人分は多すぎるので近所に配っている。",
            "会いたいとは書かないでおく。重くなるから。",
            "元気で。それだけでいい。",
        ].join("\n"),
        unlockAfterNights: 180,
    },
    {
        id: "unsent-old-teacher",
        foundLocation: "雨の日に傘立てから落ちた古い手帳に、折り畳まれて。",
        writerGuess: "七十を過ぎた男性。手が震えていた跡がある。",
        addresseeGuess: "中学の時の国語の先生。もう所在はわからないだろう。",
        letterBody: [
            "先生、覚えておられないと思いますが、作文を褒めてくださった生徒です。",
            "あの一言がなければ、今の仕事はしていませんでした。",
            "五十年かかって、ようやく礼を書こうと思えました。",
            "遅くなりました。本当に、遅くなりました。",
        ].join("\n"),
        unlockAfterNights: 300,
    },
    {
        id: "unsent-nineteen-ninety-two",
        foundLocation: "壁の額縁の裏、埃をかぶった封筒の中。宛名はない。",
        writerGuess: "わからない。筆跡も、年齢も、男女も。",
        addresseeGuess: "誰宛てでもない。ただ紙に書かれた言葉。",
        letterBody: [
            "一九九二年。",
            "今日のことを誰にも言わないまま生きていく。",
            "嬉しかったとも、悲しかったとも、どちらにも書けない。",
            "書いたという事実だけを残しておく。",
            "いつか誰かが読んでも、意味はわからなくていい。",
        ].join("\n"),
        unlockAfterNights: 500,
    },
];

export function getFoundLetters(totalNights: number): UnsentLetter[] {
    return UNSENT_LETTERS.filter((letter) => totalNights >= letter.unlockAfterNights);
}
