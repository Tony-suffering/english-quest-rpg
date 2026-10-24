/**
 * Branching true endings for the apprentice's long arc at the bar.
 * Each path is shaped by play style accumulated over many nights.
 * Tone is literary and earned; quiet closures, never melodramatic.
 * The picker returns one ending at random for demo purposes.
 */

export interface TrueEnding {
    id: string;
    endingName: string;
    condition: string;
    closingScene: string;
    whatRemains: string;
}

export const TRUE_ENDINGS: TrueEnding[] = [
    {
        id: 'ending-succession',
        endingName: '継承の夜',
        condition: '長い年月、権藤の手順を崩さず、客の名を一つずつ覚えてきた者のための夜。\nその積み重ねが、言葉より先に認められた。',
        closingScene: '閉店後、権藤は鍵を二本、カウンターに置いた。\n「片方はお前のだ」\nそれだけ言って、上着を羽織った。\n見送る声はなかった。\n戸が閉まる音が、いつもより少し長く響いた。\n俺は残った鍵を、手のひらで確かめた。\n明日も、同じ時間に店は開く。',
        whatRemains: 'カウンターの奥に、新しい名前のない店が一つ、静かに続いていく。',
    },
    {
        id: 'ending-release',
        endingName: '解放の夜',
        condition: '客より自分の迷いと長く向き合ってきた者のための夜。\n権藤はそれを、見ていた。',
        closingScene: '最後の客が帰ったあと、権藤は暖簾を外した。\n「この店は、今夜で畳む」\n驚きはなかった。いつか来る夜だと、どこかで知っていた。\n「お前は、ここに留まる人間じゃない」\n権藤は一枚の紙片を差し出した。住所だけが書かれていた。\n「そこに、お前の次の仕事がある。行くかどうかは、お前が決めろ」\n俺は紙片を、胸の内ポケットにしまった。',
        whatRemains: '畳まれた店の跡に、まだ誰も知らない道が一本、伸びている。',
    },
    {
        id: 'ending-silent-mastery',
        endingName: '沈黙の完成',
        condition: '派手な一夜を求めず、ただ同じ所作を磨き続けてきた者のための夜。\n変化を望まなかったことが、最大の完成だった。',
        closingScene: '千夜を超えても、俺は変わらずグラスを拭いていた。\n権藤は何も言わない。俺も、何も言わない。\n氷の音。客の咳払い。暖簾を分ける風。\nそのどれもが、昨日と同じで、昨日と違った。\n「上手くなったな」\nそれだけだった。\n俺は手を止めなかった。',
        whatRemains: '音のない技だけが、次の夜にも、その次の夜にも、静かに残る。',
    },
    {
        id: 'ending-return',
        endingName: '帰還',
        condition: 'かつて捨てた場所を、夜ごとの客の話の中に見つけてきた者のための夜。\n逃げてきた何かと、向き合う時間が満ちた。',
        closingScene: '権藤は俺の故郷の名を、初めて口にした。\n「一度、戻ってこい」\n命令ではなかった。許可でもなかった。ただの事実だった。\n翌朝、俺は駅に立っていた。\n切符は片道だった。戻るかどうかは、まだ決めていない。\n窓の外を流れる景色は、来た時と同じで、来た時と違った。\n俺はもう、逃げる側ではなかった。',
        whatRemains: '置いてきたはずの場所に、別の顔で立つ一人の男がいる。',
    },
    {
        id: 'ending-parting',
        endingName: '別離',
        condition: '権藤の老いに、見て見ぬふりをせず、しかし騒ぎ立てもしなかった者のための夜。\n終わりは、静かに受け取られた。',
        closingScene: 'その朝、権藤は布団の中で冷たくなっていた。\n枕元に、いつもの煙草が一本。火のついた跡はなかった。\n葬儀は小さく済ませた。泣いたのは、俺ではなかった。\n四十九日の夜、俺は店を開けた。\n暖簾はそのまま、名前もそのまま。\n「権藤の店です」と、俺は客に言った。\nそれ以上の説明は、要らなかった。',
        whatRemains: '名前だけが残された店で、二人目の沈黙が、グラスを磨き続ける。',
    },
];

export function pickTrueEnding(): TrueEnding {
    const index = Math.floor(Math.random() * TRUE_ENDINGS.length);
    return TRUE_ENDINGS[index];
}
