/**
 * Weather Pivot Dialog — customers talk about the weather when they mean
 * something else. Fifteen English lines the apprentice hears at the counter,
 * each paired with a literal Japanese gloss and the real pivot underneath.
 * Indirect speech is half of this job; reading it is the other half.
 * Used by the silent-parser layer during late-night service beats.
 */

export interface WeatherPivot {
    id: string;
    englishLine: string;
    literalJapanese: string;
    realPivot: string;
    situation: string;
}

export const WEATHER_PIVOTS: WeatherPivot[] = [
    {
        id: "wpivot-rain-later",
        englishLine: "It's gonna rain later.",
        literalJapanese: "あとで雨が降るよ。",
        realPivot: "そろそろ切り上げる支度だ。長居するつもりはない。",
        situation: "二杯目を飲み干したあと、財布の位置を確かめながらぽつりと言う。",
    },
    {
        id: "wpivot-cold-night",
        englishLine: "Cold night, isn't it?",
        literalJapanese: "寒い夜ですね。",
        realPivot: "話しかけたい。本題は別にあるが、まず隣の人間として声を出したい。",
        situation: "暖簾をくぐって席に着いた直後、まだ注文も決めていないタイミング。",
    },
    {
        id: "wpivot-nice-weather-for-it",
        englishLine: "Nice weather for it.",
        literalJapanese: "それにはいい天気だね。",
        realPivot: "皮肉。相手がこれからやろうとしていることに対して、当てこすっている。",
        situation: "連れが「これから上司に電話する」と言った直後、カウンターの奥から返す一言。",
    },
    {
        id: "wpivot-wind-picking-up",
        englishLine: "The wind's picking up.",
        literalJapanese: "風が強くなってきたね。",
        realPivot: "重い話に入る前置き。空気を一度張らせてから本題に行くつもりだ。",
        situation: "氷が溶けきったグラスを指で回しながら、視線を落として言う。",
    },
    {
        id: "wpivot-should-clear-up",
        englishLine: "It should clear up.",
        literalJapanese: "きっと晴れるよ。",
        realPivot: "場の空気を落ち着かせたい。言い合いの熱を下げるための、遠回しな仲裁。",
        situation: "隣の二人が口論になりかけた直後、誰にともなく呟くように。",
    },
    {
        id: "wpivot-feels-like-snow",
        englishLine: "Feels like snow.",
        literalJapanese: "雪が降りそうな感じだ。",
        realPivot: "今夜、何か重いものを背負っている。言葉にしないが、察してほしい。",
        situation: "誰もいないカウンターの端で、最初の一口をやけに長く飲んだあと。",
    },
    {
        id: "wpivot-humid-tonight",
        englishLine: "Humid tonight.",
        literalJapanese: "今夜は蒸すね。",
        realPivot: "話題を変えたい。さっきまでの会話がしんどかった、という合図。",
        situation: "連れが席を立った直後、残された方がおしぼりを開き直しながら。",
    },
    {
        id: "wpivot-sky-weird",
        englishLine: "The sky looks weird tonight.",
        literalJapanese: "今夜の空、なんか変だよね。",
        realPivot: "自分の違和感を共有したい。うまく言語化できない不安を、天気に預けている。",
        situation: "長い沈黙のあと、カウンター越しに誰にでもなく投げる一言。",
    },
    {
        id: "wpivot-warmer-than-expected",
        englishLine: "Warmer than I expected.",
        literalJapanese: "思ったより暖かいね。",
        realPivot: "この店に入って安心した。身構えて来たが、降ろしていい場所だと判断した。",
        situation: "コートを脱ぐ手を止めて、店内を一度見渡したあとに。",
    },
    {
        id: "wpivot-fog-thick",
        englishLine: "The fog's thick out there.",
        literalJapanese: "外、霧が濃いね。",
        realPivot: "帰り道に迷うような夜だ、という比喩。自分が今、方向を見失っている。",
        situation: "三杯目を頼むか迷っている素振りのまま、扉の方に目をやったとき。",
    },
    {
        id: "wpivot-good-day-for-staying-in",
        englishLine: "Good day for staying in.",
        literalJapanese: "家にいるのに向いた日だね。",
        realPivot: "本当は出てきたくなかった。でも来るしかなかった夜だ。",
        situation: "濡れた傘を足元に立てかけ、まだ注文を決めていない顔で。",
    },
    {
        id: "wpivot-smells-like-rain",
        englishLine: "Smells like rain.",
        literalJapanese: "雨の匂いがする。",
        realPivot: "何かが起きそうな予感がある。悪い方の予感だ。",
        situation: "電話を終えてカウンターに戻ってきた客が、座り直しながら。",
    },
    {
        id: "wpivot-clear-sky-tonight",
        englishLine: "Clear sky tonight, actually.",
        literalJapanese: "今夜は意外と晴れてるんだよ。",
        realPivot: "今日はいいことがあった、と言いたい。けれど自分からは切り出さない。",
        situation: "普段より背筋が伸びて入ってきた常連が、最初の一杯を待つ間に。",
    },
    {
        id: "wpivot-winter-dragging-on",
        englishLine: "This winter's dragging on.",
        literalJapanese: "この冬、長引いてるね。",
        realPivot: "自分の苦しい時期が、まだ抜けない。終わりが見えないと感じている。",
        situation: "何度か通っている客が、いつもより早い時間にカウンターへ座ったとき。",
    },
    {
        id: "wpivot-storm-passed",
        englishLine: "Looks like the storm passed.",
        literalJapanese: "嵐は過ぎたみたいだね。",
        realPivot: "しんどい時期はもう越えた、という静かな報告。祝杯ではないが、区切りだ。",
        situation: "久しぶりに顔を出した元常連が、最後の一口を飲み干したあとに。",
    },
];

export function pickWeatherPivot(): WeatherPivot {
    const index = Math.floor(Math.random() * WEATHER_PIVOTS.length);
    return WEATHER_PIVOTS[index];
}
