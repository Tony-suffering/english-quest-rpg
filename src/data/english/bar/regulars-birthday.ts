/**
 * Silent Bartender -- quiet birthdays of the regulars.
 *
 * Fifteen fictional regulars carry a birthday once a year (JST).
 * On that night the tone softens by a hair -- never announced, only sensed.
 * The apprentice does not speak; the acknowledgment lives in a pour, a nod, a plate set down.
 */

export interface RegularBirthday {
    id: string;
    regularName: string;
    month: number;
    day: number;
    ageHint?: string;
    tellingDetail: string;
    regularsLine: string;
    apprenticeResponse: string;
}

export const REGULAR_BIRTHDAYS: RegularBirthday[] = [
    {
        id: 'birthday-morita',
        regularName: '森田さん',
        month: 1,
        day: 12,
        ageHint: '68歳',
        tellingDetail: 'いつもよりコートを丁寧に畳んで、端の席に座る。襟元に煙草の匂いがしない。',
        regularsLine: '今日はね、熱いのを一本だけ。',
        apprenticeResponse: '静かに熱燗を注ぎ、小皿に塩を添える。',
    },
    {
        id: 'birthday-tamura-taxi',
        regularName: '田村さん',
        month: 2,
        day: 3,
        ageHint: '61歳',
        tellingDetail: '無線機を鞄の奥にしまったまま、腕時計を外してカウンターに置いた。',
        regularsLine: '今夜は流しを早めに上がってきたんだ。',
        apprenticeResponse: 'おしぼりを新しいものに替え、氷を一つだけ多く入れる。',
    },
    {
        id: 'birthday-uehara-printshop',
        regularName: '上原さん',
        month: 3,
        day: 8,
        ageHint: '74歳',
        tellingDetail: '指のインクの染みが、今日はほとんど落ちている。爪まで磨いたように見える。',
        regularsLine: '年に一度だけ、活字の話はしないことにしてる。',
        apprenticeResponse: '黙って焼酎のお湯割りを差し出し、梅干しを添える。',
    },
    {
        id: 'birthday-kiyomi',
        regularName: '清美さん',
        month: 4,
        day: 2,
        ageHint: '55歳',
        tellingDetail: '髪を切ったばかりで、耳の後ろがまだ少し赤い。',
        regularsLine: '桜、今年は見に行けなかったわ。',
        apprenticeResponse: '一輪挿しの位置を彼女の側に少しだけ寄せる。',
    },
    {
        id: 'birthday-shiina',
        regularName: '椎名さん',
        month: 5,
        day: 19,
        ageHint: '42歳',
        tellingDetail: '鞄の中から小さな煎餅の袋を取り出し、無言でカウンターに置いた。',
        regularsLine: 'これ、田舎の母から送られてきたやつ。',
        apprenticeResponse: '両手で受け取り、丁寧に戸棚の奥にしまう。',
    },
    {
        id: 'birthday-nakajo',
        regularName: '中条さん',
        month: 6,
        day: 6,
        ageHint: '70歳',
        tellingDetail: '雨の夜なのに傘を持っていない。濡れたままでも平気そうな顔をしている。',
        regularsLine: '六月六日生まれってのは、梅雨と付き合うのが上手くなるものさ。',
        apprenticeResponse: '温かいタオルを差し出し、いつもより熱いお茶を一杯先に出す。',
    },
    {
        id: 'birthday-ogata',
        regularName: '尾形さん',
        month: 7,
        day: 21,
        ageHint: '59歳',
        tellingDetail: '珍しく和服で現れた。袖口に小さな糸のほつれがあるのに、本人は気づいていない。',
        regularsLine: '何も変わらない日ってのが、結局いちばん贅沢だな。',
        apprenticeResponse: '冷酒のグラスを一段冷たいものに替え、盃を二つ並べて置く。',
    },
    {
        id: 'birthday-ishihara',
        regularName: '石原さん',
        month: 8,
        day: 14,
        ageHint: '66歳',
        tellingDetail: 'お盆の前日。線香の匂いが微かに袖に残っている。',
        regularsLine: '今日はね、静かにしててくれるだけでいい。',
        apprenticeResponse: '余計なことは何も言わず、水を一杯、先に置く。',
    },
    {
        id: 'birthday-funaki',
        regularName: '船木さん',
        month: 9,
        day: 3,
        ageHint: '48歳',
        tellingDetail: '普段は二杯で帰るのに、今日はコートを脱いでいる。',
        regularsLine: '今夜くらいは、時間を気にしないでおく。',
        apprenticeResponse: 'お通しをもう一品、小鉢でそっと追加する。',
    },
    {
        id: 'birthday-kurosaki',
        regularName: '黒崎さん',
        month: 10,
        day: 11,
        ageHint: '63歳',
        tellingDetail: '万年筆を胸ポケットに挿したまま、ノートを開かない。',
        regularsLine: '書くべきことが、今日はないんだ。',
        apprenticeResponse: 'グラスをいつもより少しだけ大きいものに替える。',
    },
    {
        id: 'birthday-yagi',
        regularName: '八木さん',
        month: 10,
        day: 29,
        ageHint: '37歳',
        tellingDetail: '仕事帰りのはずなのに、鞄の中の書類を一度も出さなかった。',
        regularsLine: '歳をとるってのは、悪くないよ、最近は。',
        apprenticeResponse: '静かにハイボールを作り、レモンの皮を一周多く絞る。',
    },
    {
        id: 'birthday-sonoda',
        regularName: '園田さん',
        month: 11,
        day: 17,
        ageHint: '71歳',
        tellingDetail: '杖の握りが新しい革に替わっている。贈り物かもしれない。',
        regularsLine: '長く生きると、静かな店が一番ありがたくなる。',
        apprenticeResponse: '椅子の位置をほんの少しだけ、カウンターに近づける。',
    },
    {
        id: 'birthday-asakura',
        regularName: '朝倉さん',
        month: 12,
        day: 4,
        ageHint: '52歳',
        tellingDetail: 'マフラーを外さないまま席に着いた。首元の冷えを気にしている風でもない。',
        regularsLine: '誰にも言わずに、ここに来るのが正解だった。',
        apprenticeResponse: '熱燗の徳利を二つ並べて温め、先に一つだけ差し出す。',
    },
    {
        id: 'birthday-reiko',
        regularName: '麗子さん',
        month: 12,
        day: 22,
        ageHint: '58歳',
        tellingDetail: '指輪の位置がいつもと逆の指に移っている。',
        regularsLine: '冬至の夜に生まれたのは、案外性に合ってるのよ。',
        apprenticeResponse: '柚子を一切れ、湯呑みの縁に静かに浮かべる。',
    },
    {
        id: 'birthday-hasebe',
        regularName: '長谷部さん',
        month: 12,
        day: 30,
        ageHint: '65歳',
        tellingDetail: '年末の喧騒から逃げてきた顔。帽子を脱ぐ仕草がいつもより長い。',
        regularsLine: '年内最後に寄るのが、ちょうど自分の誕生日ってのも妙な話だ。',
        apprenticeResponse: '蕎麦猪口に熱い出汁を注ぎ、先付けとして無言で出す。',
    },
];

/**
 * Returns today's birthdays in JST.
 * Accepts an optional Date for testing.
 */
export function todaysBirthdays(now: Date = new Date()): RegularBirthday[] {
    const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const month = jst.getMonth() + 1;
    const day = jst.getDate();
    return REGULAR_BIRTHDAYS.filter((b) => b.month === month && b.day === day);
}
