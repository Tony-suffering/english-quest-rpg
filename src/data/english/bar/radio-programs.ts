/**
 * Silent Bartender -- the AM radio behind the counter.
 *
 * Late at night, an old AM receiver sits on a shelf by the register,
 * tuned low. Fragments bleed through: a caller mid-question, a chorus
 * cutting in, a weather advisory. The apprentice half-listens while
 * polishing glasses, and the programs color the hours.
 */

export interface RadioFragment {
    id: string;
    programTitle: string;
    overheardFragment: string;
    approxHour: [number, number];
    host?: string;
    listeningNote: string;
}

export const RADIO_FRAGMENTS: RadioFragment[] = [
    {
        id: 'radio-shinyabin',
        programTitle: '深夜便の旅',
        overheardFragment: '……では次は、山形からのお便りです。\n「亡くなった父がよく口ずさんでいた歌を、もう一度聴きたくて――」',
        approxHour: [23, 26],
        host: '木村 康介',
        listeningNote: '誰かの父親の話を、他人の台所で聞いている気分になる。',
    },
    {
        id: 'radio-honbutsu',
        programTitle: '夜の本棚',
        overheardFragment: '……カフカの日記には、こう書かれているんですね。\n「眠れないことは、それ自体がひとつの仕事である」',
        approxHour: [24, 26],
        host: '小椋 ふみ',
        listeningNote: '権藤は本を開かないが、この時間は手を止めて聞いている。',
    },
    {
        id: 'radio-soudan',
        programTitle: '真夜中の相談室',
        overheardFragment: '……四十二歳の主婦の方からです。\n「夫が毎晩、私の顔を見てくれなくなって、もう三年になります」',
        approxHour: [25, 27],
        host: '北原 先生',
        listeningNote: 'カウンターの客がふと黙る瞬間と、音量を絞る権藤の手。',
    },
    {
        id: 'radio-kayo',
        programTitle: '日本の歌謡ベスト',
        overheardFragment: '♪ あなたのいない 朝がまた来て ／\n♪ 私はひとりで 鍵を回している――',
        approxHour: [22, 24],
        host: '大沢 久子',
        listeningNote: '昭和の歌は、だいたい誰かが帰ってこない歌だ。',
    },
    {
        id: 'radio-getsuyo',
        programTitle: '月曜の雑談',
        overheardFragment: '……で、僕がね、傘をタクシーに忘れたんですよ。\n三本目ですよ、今年だけで。笑っちゃいますよね。',
        approxHour: [23, 25],
        host: '上野 トシオ',
        listeningNote: '中身のない話ほど、深夜の店に馴染む。',
    },
    {
        id: 'radio-tenki',
        programTitle: '気象通報',
        overheardFragment: '……関東南部、明け方にかけて濃い霧の予報。\n視界百メートル以下となる恐れがあります。運転にはご注意を。',
        approxHour: [26, 28],
        listeningNote: '霧という言葉だけが、店の空気を一段冷やす。',
    },
    {
        id: 'radio-jazz-hour',
        programTitle: '夜更けのジャズ喫茶',
        overheardFragment: '……続いては、一九五九年、ニューヨーク。\nビル・エヴァンスが残した、ある雨の夜のセッションです――',
        approxHour: [24, 26],
        host: '牧野 譲',
        listeningNote: '店のレコードと被ると、権藤が少し口角を上げる。',
    },
    {
        id: 'radio-haiku',
        programTitle: '十七音の夜',
        overheardFragment: '……今週の投句から。\n「冬灯 消して兄とは 別の部屋」――東京、四十九歳、男性の方。',
        approxHour: [25, 27],
        host: '志村 涼子',
        listeningNote: '兄弟のいる客の手が、グラスの前で一瞬止まる。',
    },
    {
        id: 'radio-trucker',
        programTitle: '長距離便のあなたへ',
        overheardFragment: '……今夜も東名、事故情報は入っておりません。\nリクエスト、新潟を走行中の田中さんから――',
        approxHour: [26, 29],
        host: '矢島 健',
        listeningNote: '自分より眠れない人間が、もっと暗い道にいると思うと安心する。',
    },
    {
        id: 'radio-closing-theme',
        programTitle: '放送終了前の音楽',
        overheardFragment: 'アナウンスなし。柔らかい弦楽のテーマが、\n途中から、雑音に半分沈んでいく。',
        approxHour: [28, 30],
        listeningNote: '終わる放送を聞いていると、自分も片づけ始めないといけない気がしてくる。',
    },
];

export function pickRadioFragment(hour?: number): RadioFragment {
    const inRange = (f: RadioFragment, h: number): boolean => {
        const [start, end] = f.approxHour;
        const normalized = h < start && end > 24 ? h + 24 : h;
        return normalized >= start && normalized < end;
    };
    const pool = typeof hour === 'number'
        ? RADIO_FRAGMENTS.filter(f => inRange(f, hour))
        : RADIO_FRAGMENTS;
    const source = pool.length > 0 ? pool : RADIO_FRAGMENTS;
    const index = Math.floor(Math.random() * source.length);
    return source[index]!;
}
