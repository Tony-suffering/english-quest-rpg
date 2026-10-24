/**
 * Small kindnesses witnessed from behind the bar.
 * Fifteen brief, undemonstrative gestures between customers — never announced,
 * rarely acknowledged, and almost never returned with explicit thanks.
 * Unlocked gradually by total nights served, so the apprentice learns to
 * notice what he would not have seen in his earlier shifts.
 */

export interface SmallKindness {
    id: string;
    situation: string;
    kindnessItself: string;
    receiversResponse: string;
    apprenticesReflection: string;
    unlockAfterNights: number;
}

export const SMALL_KINDNESSES: SmallKindness[] = [
    {
        id: "kind-coat-from-floor",
        situation: "雨の夜、カウンターの端に並んで座る中年の常連と、隣の若いスーツ姿の一人客。",
        kindnessItself: "常連が会計のため席を立つ。\nその際、隣の椅子に掛けられた若い客のコートの裾を、さりげなく持ち上げ、床の水溜まりから避けて畳み直す。\n何も言わず、そのまま店を出る。",
        receiversResponse: "若い客は携帯を見ており、最後まで気づかない。",
        apprenticesReflection: "見られていない親切は、親切の形を保つのではなく、ただ日常の続きになるのだと思った。",
        unlockAfterNights: 10,
    },
    {
        id: "kind-cigarette-no-light",
        situation: "奥のボックスで別々に飲む、顔見知りでもない一人客二人。",
        kindnessItself: "片方が煙草を取り出し、もう一人に一本勧める。\n自分は火をつけず、ライターも出さない。\nよく見ると、彼のポケットには煙草だけがあって、ライターはない。吸わない客が、誰かのために持ち歩いていたらしい。",
        receiversResponse: "受け取った方は軽く頭を下げ、自分のライターで火をつけ、そのまま黙って吸い続ける。",
        apprenticesReflection: "自分のためではない物を鞄に入れている人が、この街には案外いる。",
        unlockAfterNights: 20,
    },
    {
        id: "kind-five-hundred-extra",
        situation: "カウンターで隣り合った、初対面の年配客と若い学生風の客。",
        kindnessItself: "学生が先に帰ろうとして伝票を見て、少し顔を曇らせる。\n席を外したすきに、年配客が学生の伝票に五百円玉をそっと載せ、自分の勘定と一緒にまとめて払う。\n「釣りはいい」とだけ言って、こちらに目配せもしない。",
        receiversResponse: "戻ってきた学生は金額だけ確認して、釣りを受け取り、気づかずに出て行く。",
        apprenticesReflection: "足りない分を埋める親切は、埋めた痕跡を残さないほうが、相手を傷つけない。",
        unlockAfterNights: 35,
    },
    {
        id: "kind-umbrella-shared",
        situation: "閉店間際、会計を済ませて扉の前に並ぶ二人の客。片方は傘あり、片方はなし。",
        kindnessItself: "傘を持った客が、扉を開けてから一拍置き、相手と目を合わせず、\n「駅まで同じ方向だから」と短く言って傘を差し出す向きを少し広げる。\n本当は方向が違うのを、私はレジの伝票で知っている。",
        receiversResponse: "傘のない客は「あ、どうも」とだけ言い、駅に着いても礼はそのままで別れる。",
        apprenticesReflection: "方向を変えても、本人がそう言えば、それは遠回りにならないのかもしれない。",
        unlockAfterNights: 50,
    },
    {
        id: "kind-saved-seat",
        situation: "混み合う金曜の夜、カウンターの空席はあと一つ。",
        kindnessItself: "常連が、その一席にわざと自分の鞄を置いて占領しているように見せる。\nしばらくして、疲れた顔で入ってきた見知らぬ老人に、\n「ここ、空いてますよ」と鞄をどかし、さも今空いたかのように譲る。",
        receiversResponse: "老人は丁寧に会釈して座り、それが自分のために確保されていたとは最後まで知らない。",
        apprenticesReflection: "親切は、親切と気づかれた瞬間に借りに変わる。気づかれない席のほうが、休める。",
        unlockAfterNights: 75,
    },
    {
        id: "kind-water-refill",
        situation: "酔って顔を赤くした若い客と、隣で静かに飲む中年女性。",
        kindnessItself: "女性は自分のために頼んだ水のグラスを、\n会話のふりをして若い客の手元にそっと押しやる。\nその後、私に目配せだけ寄越し、自分用にもう一杯だけ水を頼む。",
        receiversResponse: "若い客は「あれ、俺こんなの頼んだっけ」と言いながら、気づかず飲み干す。",
        apprenticesReflection: "酔った相手を守る一番静かな方法は、説教ではなく、水の位置を変えることだった。",
        unlockAfterNights: 100,
    },
    {
        id: "kind-last-train-check",
        situation: "終電が近い時間、奥のテーブルで話し込む見知らぬ二人組。",
        kindnessItself: "先に帰り支度をした一人が、店を出る前に壁の時計を指差し、\nもう一方に「終電、あと十二分」と囁く。\n自分はすでに歩いて帰れる距離だと、前に聞いたことがある。",
        receiversResponse: "声をかけられた方は「あ、本当だ」と慌て、すぐに立ち上がって礼を言う暇もなく走り出す。",
        apprenticesReflection: "急がせる親切は、感謝される時間すら惜しませることで完成する。",
        unlockAfterNights: 130,
    },
    {
        id: "kind-quiet-translation",
        situation: "片言の日本語で注文に困っている外国人客と、離れた席の常連。",
        kindnessItself: "常連はわざわざ通訳に立つのではなく、私のほうを見て、\n「ハイボール、濃いめで良かったんじゃない、あの人」と独り言のように呟く。\nそれを合図に、私が英語で確認に行く。代わりに喋ったのは私だが、橋を架けたのは彼だった。",
        receiversResponse: "外国人客は私にだけ礼を言い、常連の存在には最後まで気づかない。",
        apprenticesReflection: "親切は、自分が喋らずに他人を喋らせることでも成立する。",
        unlockAfterNights: 170,
    },
    {
        id: "kind-chair-lowered",
        situation: "足の悪い老婦人と、向かいに座る初対面の会社員。",
        kindnessItself: "会社員は席を立つふりをしてトイレに行く途中、\n老婦人の椅子の高さ調整レバーを、通りすがりに少しだけ下げる。\n老婦人が座り直したとき、ちょうど足が床に届くようになっている。",
        receiversResponse: "老婦人は「あら楽になった」と小さく呟くだけで、原因を探しもしない。",
        apprenticesReflection: "自分のしたことを、相手に「椅子のせい」だと思わせる人がいる。",
        unlockAfterNights: 220,
    },
    {
        id: "kind-receipt-swap",
        situation: "接待と思われる四人組。若い担当者が気まずそうに伝票を抱えている。",
        kindnessItself: "年長の取引先側が手洗いに立つ途中でレジに寄り、\n自分の名前で会計を済ませ、領収書だけ若い担当者の会社名で切らせる。\n「経費、君のところで落としときな」と、席に戻ってからは言わない。",
        receiversResponse: "若い担当者は後で伝票がないことに気づき、礼を言おうとするが、すでに話題は別のことに移っている。",
        apprenticesReflection: "助けた側が、助けたことを話題にしない限り、助けられた側は一生返さなくていい。",
        unlockAfterNights: 280,
    },
    {
        id: "kind-bookmark-slipped",
        situation: "文庫本を読みながら一人で飲む中年男性と、同じ本を鞄から出した学生。",
        kindnessItself: "中年男性は会計を済ませて出る直前、\n自分の名刺大のメモ用紙に「この後の第三章、急いで読まないほうがいい」とだけ書き、\n学生の本の表紙の下にそっと挟んで去る。",
        receiversResponse: "学生は帰り際にそれを見つけ、しばらく眺めたあと、黙ってポケットに入れる。",
        apprenticesReflection: "知らない人から受け取った助言ほど、反発せずに聞けるものはない。",
        unlockAfterNights: 350,
    },
    {
        id: "kind-empty-glass-hidden",
        situation: "酒を断っている様子の客と、場の空気を読めずに勧め続ける同席者。",
        kindnessItself: "三つ隣に座っていた無関係の常連が、カウンター越しに私に小声で、\n「あの人のグラス、そろそろ下げてやって」と頼む。\n空のグラスがないほうが、勧めにくくなる、という理由だ。",
        receiversResponse: "酒を断っていた客は、グラスがなくなったことで追及を免れ、常連のほうは見もしない。",
        apprenticesReflection: "器を下げるだけで人を守れる夜がある。頼まれた私は、頼んだ人の功績を預かる。",
        unlockAfterNights: 420,
    },
    {
        id: "kind-door-held-twice",
        situation: "雪の夜、荷物を両手に抱えた母子と、後から出てきた中年の一人客。",
        kindnessItself: "一人客は母子のために扉を押さえて開け、\n二人が出た後、そのまま数秒待ち、\n後ろから来ていた別の老人のためにももう一度、同じ姿勢で押さえ直す。\n自分が出るのは三番目になる。",
        receiversResponse: "母子も老人も軽く会釈するだけで、彼が二度続けて待ったことには気づかない。",
        apprenticesReflection: "親切を一度で終わらせない人は、自分が一番最後に出ることを、あらかじめ決めている。",
        unlockAfterNights: 500,
    },
    {
        id: "kind-forgotten-lighter",
        situation: "煙草を喫いに外へ出て、ライターを忘れて戻ってきた若い客。",
        kindnessItself: "カウンターの端にいた年配の客が、自分のライターを一言も言わずにカウンターの上に置き、\n若い客と目を合わせないまま、そのまま席を外して手洗いに向かう。\n戻ってきたときにはライターはなくなっているが、彼はそれを探さない。",
        receiversResponse: "若い客は借りたのか拾ったのか判然としないまま使い、帰り際、カウンターの同じ位置に黙って置いて出る。",
        apprenticesReflection: "貸す、でも借りる、でもなく、ただ「そこにあった」ことにしておく方法を、私はこの夜に覚えた。",
        unlockAfterNights: 700,
    },
    {
        id: "kind-farewell-not-said",
        situation: "長く通った常連が、今夜この街を離れることを誰にも告げずに飲んでいる。",
        kindnessItself: "隣に座った別の常連は、それを察しているのか、いないのか、\n「また来週」とも「気をつけて」とも言わず、\nただ普段より一杯分だけ長く、彼の話に相槌を打ってから帰る。\n会計の際、去る側の分もまとめて払い、領収書は受け取らない。",
        receiversResponse: "去る側は、支払いが済んでいることに気づいた表情を一瞬だけ見せ、何も言わずに最後の一杯を飲み干す。",
        apprenticesReflection: "別れを祝うのでも惜しむのでもなく、いつもと同じ一夜として見送る、という贈り方がある。",
        unlockAfterNights: 900,
    },
];

export function getWitnessedKindnesses(totalNights: number): SmallKindness[] {
    return SMALL_KINDNESSES.filter((k) => k.unlockAfterNights <= totalNights);
}
