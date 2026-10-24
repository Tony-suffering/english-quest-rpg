/**
 * Silent Bartender — narrative copy.
 *
 * 1) Intro flavor variants (random per run so repeats differ slightly).
 * 2) Phase transition beats (shown between customer blocks).
 * 3) Ending tiers (evaluated after the whole night).
 * 4) Perfect-night return of Gondo.
 *
 * All Japanese. No emojis.
 */

import type { NightPhase } from './types';

// ───────────────────────────────────────────────────────────
// Intro — short flavor lines shown under the prologue title
// ───────────────────────────────────────────────────────────
export const INTRO_BEATS: string[] = [
    '店の奥、マスターが崩れるように座り込んでいる。「あとは頼んだ」とだけ言って、目を閉じた。',
    '暖簾の向こうで風が鳴っている。マスターは奥でうずくまっている。「声を出すなよ」と最後に言った。',
    '冷蔵庫のモーターだけが音を立てている。カウンターの向こうで、マスターが黙って頷いた。',
    '氷が溶ける音。マスターが「お前が代打だ」と言って、奥の椅子に下がった。',
    'ネオンが一度だけ瞬いた。マスターは首を振りながら、お前に前掛けを渡した。',
    'カウンターの上に置かれた鍵。「俺の代わりに、今夜だけ」と書いたメモが添えてある。',
    '湯呑みが一つ、カウンターに残されている。湯気がまだ立っている。マスターの姿はない。',
    '時計が19:30を指した。マスターは奥で眠っている。外の雨が止まない。',
    '厨房の扉が半分開いている。マスターの足先が見える。「任せる」と聞こえた気がした。',
    '月が出ていない夜。店の灯だけが明るい。マスターは奥で、あの本を開いたまま眠っている。',
    'カウンターの木目が、いつもより色濃く見える。磨いた後の匂いが残っている。',
    '暖簾の内側から、夜の風が一度だけ流れ込んだ。出迎える相手がまだいない店の静けさ。',
    '氷入れの底で、昨日の最後の氷がかすかに鳴った。マスターが今夜は奥から出てこない。',
    '客用のおしぼりが八本、きちんと巻かれている。マスターが昼間に準備したまま。',
    '熱燗の徳利が並んでいる。まだ空だ。ひとつだけ、持ち上げてみる。',
];

// ───────────────────────────────────────────────────────────
// Phase transitions — a beat shown as time/mood shifts
// ───────────────────────────────────────────────────────────
export const PHASE_TRANSITIONS: Record<NightPhase, string[]> = {
    early: [
        '20:30 — 暖簾が揺れる。次の客が来た。',
        '21:00 — 店の奥、マスターは黙って目を閉じている。',
        '21:15 — 外の通りが一度静かになる。',
        '20:45 — 空のグラスが1つ、音もなく下がる。',
        '21:30 — 通りに車のライトが流れる。暖簾の隙間が一瞬光る。',
        '20:15 — 氷を砕く音だけがカウンターに残る。',
        '21:45 — 誰かが傘を畳む音。あの時間だ。',
    ],
    peak: [
        '22:00 — 急に声が増える。誰かの笑いが壁に当たる。',
        '22:30 — カウンターが満杯になる。空の皿を下げる暇もない。',
        '23:00 — 暖簾の向こうが明るい。人が流れてくる。',
        '22:15 — 乾杯の声が一度に3つ重なった。',
        '22:45 — 生ビールのサーバーが一度だけ空気を噛む。',
        '23:15 — 満席。立ち飲みの客が奥で笑っている。',
        '22:00 — 笑いの波。誰かが何かを思い出して、泣き笑いしている。',
    ],
    late: [
        '00:30 — 終電が行った。残ったのは戻れない連中だけ。',
        '01:15 — 照明が少し落ちる。灰皿の影が長くなる。',
        '02:00 — 外で猫が鳴く。客は誰も気にしない。',
        '00:45 — 店の時計が狂ってる気がする。誰も気にしない。',
        '01:45 — 誰かの携帯が震えて、誰かが見ないふりをする。',
        '02:30 — カラオケの機械が一度だけ勝手に起動して、すぐに止まる。',
        '01:00 — 「もう帰らなきゃ」と3回目を言った客がまだいる。',
    ],
    closing: [
        '03:30 — 空が少しずつ明るい。マスターはまだ目を閉じている。',
        '04:15 — グラスの音が一つだけ響く。',
        '04:45 — もうすぐ店を閉める時間。',
        '03:15 — 冷蔵庫のモーターが止まって、また動く。',
        '04:00 — 始発まで、あと一時間半。',
        '04:30 — 灰皿が静かに溜まっている。掃除はあとでいい。',
        '03:45 — 外の空気の匂いが変わった。夜の終わりの匂いだ。',
    ],
};

export function pickPhaseTransition(phase: NightPhase): string {
    const pool = PHASE_TRANSITIONS[phase];
    return pool[Math.floor(Math.random() * pool.length)];
}

// ───────────────────────────────────────────────────────────
// Endings — evaluated by the night result
// Input: success count, failed count, total customers
// Output: a tier + a copy block (title + 1-2 lines)
// ───────────────────────────────────────────────────────────
export interface Ending {
    tier: 'master' | 'pro' | 'ok' | 'rough' | 'bust';
    title: string;
    body: string;
}

const MASTER_ENDINGS: Array<Omit<Ending, 'tier'>> = [
    {
        title: '完全営業 — 5:00 AM',
        body: 'マスターが静かに目を開けた。「お前、今日だけは認めてやる」。暖簾を下ろす手が止まった。',
    },
    {
        title: '一夜の夢 — 5:00 AM',
        body: '最後の客が出て行った瞬間、マスターが首だけ動かした。「明日も来い」。それだけだった。',
    },
    {
        title: '閉店 — 5:00 AM',
        body: 'カウンターの拭き方がマスターと同じだったと、自分で気づいて、少し笑った。',
    },
    {
        title: '空が白む — 5:00 AM',
        body: '最後のグラスを磨いた時、外が青ざめ始めていた。誰にも言わない夜の完璧さを、一人だけが知っている。',
    },
    {
        title: 'ネオンが消える — 5:00 AM',
        body: '外のネオン看板のスイッチを切る。昨日の夜と今日の朝の境目が、自分の手の中にあるような気がした。',
    },
];

const PRO_ENDINGS: Array<Omit<Ending, 'tier'>> = [
    {
        title: 'マスター代理、悪くない',
        body: '空のグラスが奇麗に並んでいる。マスターが奥で頷いたのが見えた、気がした。',
    },
    {
        title: '七割は伝わった',
        body: '残りの三割は、また今度でいい。扉が一つ静かに閉まる音がした。',
    },
];

const OK_ENDINGS: Array<Omit<Ending, 'tier'>> = [
    {
        title: 'まあ、合格点',
        body: 'カウンターを拭く。何人かは「ありがとう」と言って帰った。それだけで十分だ、今夜は。',
    },
    {
        title: '半分は届いた',
        body: '届かなかった方は、明日の宿題だ。氷をもう一度砕いて、グラスを片付ける。',
    },
];

const ROUGH_ENDINGS: Array<Omit<Ending, 'tier'>> = [
    {
        title: 'お前、向いてないかもな',
        body: '客の残した氷が溶けていく。マスターはまだ目を開けない。',
    },
    {
        title: '悔しさが残る夜',
        body: '空のスツールが多い。それぞれに「惜しかった顔」が残っているように思えた。',
    },
];

const BUST_ENDINGS: Array<Omit<Ending, 'tier'>> = [
    {
        title: '...(マスターは黙って酒を注いだ)',
        body: '声は出さなかったのに、一人も助けられなかった。何かが一つ、足りない。明日、もう一度考えろ。',
    },
    {
        title: '夜は短かった',
        body: 'マスターが一度だけ、奥で寝返りを打った。目は開けない。',
    },
];

function pickFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function pickEnding(success: number, failed: number, total: number): Ending {
    const rate = total > 0 ? success / total : 0;

    if (success === total && total > 0) {
        return { tier: 'master', ...pickFrom(MASTER_ENDINGS) };
    }
    if (rate >= 0.8) {
        return { tier: 'pro', ...pickFrom(PRO_ENDINGS) };
    }
    if (rate >= 0.6) {
        return { tier: 'ok', ...pickFrom(OK_ENDINGS) };
    }
    if (rate >= 0.3) {
        return { tier: 'rough', ...pickFrom(ROUGH_ENDINGS) };
    }
    return { tier: 'bust', ...pickFrom(BUST_ENDINGS) };
}

// ───────────────────────────────────────────────────────────
// Gondo's return line on a perfect (no-miss) night
// ───────────────────────────────────────────────────────────
export const PERFECT_GONDO_LINES: string[] = [
    '「口じゃない、目で見ろ」と、俺はずっと言っていた。お前は黙ってそれをやった。',
    '「舌より耳だ」。あの言葉の意味、今夜お前が証明した。',
    '客は黙って帰らなかった。それが全てだ。',
    '明日から、またうるさく言うからな。',
    '一晩だけだ。俺の店は、俺が開ける。',
];

export function pickPerfectGondoLine(): string {
    return PERFECT_GONDO_LINES[Math.floor(Math.random() * PERFECT_GONDO_LINES.length)];
}

// ───────────────────────────────────────────────────────────
// Milestone intro beats — flavor lines for the night AFTER a milestone.
// Keyed by the milestone night count. The morning-after a big night has a
// specific feel; these intros replace a regular INTRO_BEAT pick when
// `stats.totalNights === key + 1`.
// ───────────────────────────────────────────────────────────
export const MILESTONE_INTRO_BEATS: Record<number, string[]> = {
    7: [
        '昨日で一週間だったことを、誰にも言っていない。暖簾を出す手は、昨日と同じだ。',
        'カウンターの一番端に、昨日の客が忘れた手拭いが畳んで置いてある。洗って、また出す。',
        '八日目。氷入れの底で、昨夜の最後の一片が鳴っている。',
    ],
    30: [
        '一月と一日。今日だけは、暖簾を少しだけ丁寧に広げた。マスターは気づいていない、たぶん。',
        '三十一夜目。カウンターを拭く布の色が、買った時より深くなっている。',
        '昨日の祝いを、誰とも分け合わなかった。それで良かったと思う、今朝は。',
    ],
    100: [
        '百一夜。昨日の拍手の正体は、今朝になっても分からない。氷を砕くと、いつもの音が戻ってきた。',
        'カウンターの鏡に映る自分が、百日前と少しだけ違う顔をしている。誰も指摘しない。',
        '百の次は、ただの一だ。暖簾を出し、グラスを拭く。マスターは奥で眠っている。',
    ],
    365: [
        '一年と一日目。扉が開く音がして、一瞬振り返った。誰もいない。昨夜の影が、まだ残っているだけだ。',
        '三百六十六夜目。季節が一巡した店の空気が、自分の肺に馴染んでいる。',
        '昨日肩を叩かれた場所が、まだ少し温かい気がする。気のせいだ、ということにしておく。',
    ],
    1000: [
        '千一夜目。数字はもうどうでもいい。暖簾を出す。氷を砕く。客が来る。それだけだ。',
        '千の次の夜。カウンターの木目が、自分の手の形に少し窪んでいる。何年かかったのかは、もう数えない。',
        'マスターが奥で、昨夜より深く眠っている。起こさないように、グラスを静かに並べた。',
    ],
};
