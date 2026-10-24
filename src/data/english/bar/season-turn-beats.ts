/**
 * Season turn beats for the silent bartender sim.
 * Fires once per year on traditional Japanese seasonal pivots (二十四節気 subset).
 * The apprentice registers a shift in the bar; Gondo never remarks on it.
 * Tone is pure observation: light, air, fabric, ice, steam.
 * Matching uses JST and tolerates ±1 day around each approximate date.
 */

export interface SeasonTurnBeat {
    id: string;
    turnName: string;
    approxMonth: number;
    approxDay: number;
    body: string;
}

export const SEASON_TURN_BEATS: SeasonTurnBeat[] = [
    {
        id: 'turn-risshun',
        turnName: '立春',
        approxMonth: 2,
        approxDay: 4,
        body: '暖簾の色が急に薄く見える日がある。\n誰も口にしないのに、光の質が変わっていた。\n見習いだけが、布の揺れの遅さに気づいていた。',
    },
    {
        id: 'turn-shunbun',
        turnName: '春分',
        approxMonth: 3,
        approxDay: 21,
        body: 'コートを畳んだまま膝に置く客が増えた。\n氷の溶ける速度が、ひと月前とは違っている。\n見習いはグラスの底の水滴を、いつもより早く拭った。',
    },
    {
        id: 'turn-rikka',
        turnName: '立夏',
        approxMonth: 5,
        approxDay: 5,
        body: '誰も燗を頼まなくなった夜だった。\n冷酒の瓶に触れる手つきが、客ごとに少しずつ変わる。\n見習いは、カウンターの木目が汗をかき始めたのを見た。',
    },
    {
        id: 'turn-geshi',
        turnName: '夏至',
        approxMonth: 6,
        approxDay: 22,
        body: '扉を開けたとき、外がまだ青かった。\n客の到着が、いつもより半時間ほど遅れていく。\n見習いは氷の減りが早すぎる夜のことを、帳面に書かなかった。',
    },
    {
        id: 'turn-risshu',
        turnName: '立秋',
        approxMonth: 8,
        approxDay: 7,
        body: '湯気が、天井まで届かずに途中で消える。\n誰かが初めて熱い出汁を残さずに飲んだ。\n見習いは、夏のグラスを一つだけ棚の奥へ戻した。',
    },
    {
        id: 'turn-shubun',
        turnName: '秋分',
        approxMonth: 9,
        approxDay: 23,
        body: '客が肩を落として座るようになった。\n黙って二杯目を頼む間が、少しだけ長くなる。\n見習いは、カウンターの端の影が伸びているのに気づいた。',
    },
    {
        id: 'turn-ritto',
        turnName: '立冬',
        approxMonth: 11,
        approxDay: 7,
        body: 'コートを脱がずに一杯を終える客がいた。\n燗の徳利が、棚の手前にそっと戻ってきている。\n見習いは、自分の手の冷たさを初めて客に悟られた気がした。',
    },
    {
        id: 'turn-toji',
        turnName: '冬至',
        approxMonth: 12,
        approxDay: 22,
        body: '店に入ってくる息が、みな白かった。\n誰も時計を見ないのに、帰る時刻だけが揃っている。\n見習いは、扉の隙間から漏れる光の細さを数えていた。',
    },
];

export function todaysSeasonTurn(now?: Date): SeasonTurnBeat | null {
    const base = now ?? new Date();
    const jst = new Date(base.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const month = jst.getMonth() + 1;
    const day = jst.getDate();
    for (const turn of SEASON_TURN_BEATS) {
        if (Math.abs(month - turn.approxMonth) === 0 && Math.abs(day - turn.approxDay) <= 1) {
            return turn;
        }
    }
    return null;
}
