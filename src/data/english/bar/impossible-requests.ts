/**
 * Impossible Requests at the Silent Bartender.
 * Eight vignettes where a customer asks for something the bar cannot give.
 * Gondo and the apprentice decline without words, offering a substitute,
 * a redirect, or simply a different song on the radio.
 * Each scene is a small study in how "no" can be spoken in gesture.
 */

export interface ImpossibleRequest {
    id: string;
    customerDescriptor: string;
    theRequest: string;
    whyImpossible: string;
    wordlessDecline: string;
    customersResponse: string;
}

export const IMPOSSIBLE_REQUESTS: ImpossibleRequest[] = [
    {
        id: "imp-out-of-print-lp",
        customerDescriptor: "色褪せたデニムシャツの五十代の男",
        theRequest: "「七六年のあのLP、B面の三曲目、ここにあるかい。俺の結婚式で流した曲だ。」",
        whyImpossible: "その盤は二十年前の火事で失われ、どの棚にも残っていない。",
        wordlessDecline: "権藤はラジオのダイヤルを静かに回し、別の歌手が歌う同じ曲のライブ音源に合わせた。グラスを一つ、男の前に置き直す。音だけが返事だった。",
        customersResponse: "男は目を閉じ、最後まで聴いてから、黙って頷いた。盤の話はもう出なかった。"
    },
    {
        id: "imp-dead-friend",
        customerDescriptor: "喪服のまま寄ったらしい三十代の女",
        theRequest: "「カズさん、まだ奥の席にいる？あの人、金曜の夜は必ずここだったでしょう。」",
        whyImpossible: "カズさんは三年前に亡くなっている。訃報はこの店の常連全員が知っている。",
        wordlessDecline: "見習いは奥の席に目をやり、そこに置かれたままの小さな銅の灰皿を、女の卓へそっと移した。権藤はカズが好きだったバーボンを、注がずにボトルごと見せた。",
        customersResponse: "女は灰皿を両手で包み、しばらく黙っていた。それから小さく笑って、「分かった」と一度だけ言った。"
    },
    {
        id: "imp-drink-that-doesnt-exist",
        customerDescriptor: "初めて来た、スーツの若い男",
        theRequest: "「ネットで見たんですけど、ここの『銀の月』っていうカクテル、ありますよね。」",
        whyImpossible: "そんな名前のカクテルはこの店に存在しない。おそらく誰かの創作記事だ。",
        wordlessDecline: "権藤は何も訂正せず、薄く銀色に光るアブサンの水割りを作り、縁に細い檸檬皮を浮かべた。メニューは見せなかった。",
        customersResponse: "男は一口飲み、「これです、これ」と嬉しそうに言った。権藤はただ頷いた。"
    },
    {
        id: "imp-table-for-no-one",
        customerDescriptor: "古いコートの六十代の女",
        theRequest: "「奥の二人席、取っておいてくれる？あの人、今日来るかもしれないから。」",
        whyImpossible: "その「あの人」は、もう十年以上この店に姿を見せていない。女も本当は分かっている。",
        wordlessDecline: "見習いは奥の卓に椅子を二つきちんと引き、水のグラスを二つ並べた。片方はずっと手をつけないまま閉店まで残しておく、という暗黙の合図だ。",
        customersResponse: "女はカウンターで一杯だけ飲み、奥の席を一度も見ずに帰った。礼も、確認もしなかった。"
    },
    {
        id: "imp-discontinued-dish",
        customerDescriptor: "ネクタイを緩めた四十代の常連",
        theRequest: "「権藤さん、昔のあの鯖の味噌煮、今日だけでも出してくれませんか。」",
        whyImpossible: "あの料理は亡き女将の手によるもので、権藤は一度も同じ味を出さないと決めている。",
        wordlessDecline: "権藤は黙って小鉢を出した。中身は味噌煮ではなく、味噌を薄く塗って炙った厚揚げだった。添えられたのは、女将が生前使っていた同じ柚子皮。",
        customersResponse: "常連は一口食べて、「そうか」と小さく呟き、二口目はゆっくり食べた。おかわりは頼まなかった。"
    },
    {
        id: "imp-past-closing",
        customerDescriptor: "泣き腫らした目の、二十代後半の女",
        theRequest: "「もう少しだけ、ここにいてもいい？帰ったら、本当に一人になるから。」",
        whyImpossible: "閉店時間はとうに過ぎ、見習いは翌朝の仕入れに早く出なければならない。",
        wordlessDecline: "権藤は看板の灯を落とし、しかしカウンターの端の小さな読書灯だけをつけ直した。温かい蕎麦湯を湯呑みに注いで、そっと置いた。",
        customersResponse: "女は湯呑みを両手で抱えて三十分いた。飲み終えると立ち上がり、深く一度お辞儀して出ていった。"
    },
    {
        id: "imp-specific-photograph",
        customerDescriptor: "銀髪をきちんと束ねた七十代の男",
        theRequest: "「壁のあの写真、左から三枚目のやつ、譲ってもらえないだろうか。写っているのは、私の昔の相棒なんだ。」",
        whyImpossible: "あの写真は亡き女将が最後に飾ったもので、権藤は一枚も壁から外さないと決めている。",
        wordlessDecline: "権藤は何も言わず、店の奥から予備のフィルムカメラを持ち出し、その写真を丁寧に接写した。現像は後日、と言わんばかりに、男の名刺を預かった。",
        customersResponse: "男は少し驚いた顔をして、それから深く頷いた。「ありがとう。それで十分だ。」"
    },
    {
        id: "imp-english-translation",
        customerDescriptor: "手紙を握りしめた、留学帰りらしい娘",
        theRequest: "「権藤さん、この父からの手紙、英語で書き直してくれませんか。向こうの夫に、ちゃんと伝えたいんです。」",
        whyImpossible: "権藤は英語を話せないわけではないが、他人の父親の言葉を他人の夫のために訳すことを、自分の仕事ではないと考えている。",
        wordlessDecline: "権藤は便箋と万年筆を娘の前に置き、自分用の辞書をそっと横に添えた。それから温かい番茶を一杯淹れて、カウンターの奥へ下がった。",
        customersResponse: "娘は一時間かけて自分で訳した。帰り際、「自分で書いてよかったです」と小さく言い、深く礼をして出ていった。"
    }
];

export function pickImpossibleRequest(): ImpossibleRequest {
    const index = Math.floor(Math.random() * IMPOSSIBLE_REQUESTS.length);
    return IMPOSSIBLE_REQUESTS[index];
}
