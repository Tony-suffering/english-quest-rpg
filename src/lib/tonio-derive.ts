// とにお導出エンジン — DMM会話(D1)の「実データ」から醜態(ギャグ)を導出する純関数群。
//
// 思想: 主役はギャグ(醜態力)。成長は二の次、上達自慢(ナルシスト)はしない。
//   数字は全部 conversation の中身(spice/original/native/diagnosis)から計算。捏造なし。
//   - 醜態力 = spice(ツッコミが付いた回数)・乖離・文法バグが多いほど高い(面白い)
//   - EXP    = 恥=経験値。出場(発話)+晒した恥(spice/乖離)。上達ではなく"恥の蓄積"
//   - 注釈(spice/検死)が付いた回だけ「夜(ギャグ)にできる」。その進捗を可視化する。
//
// ※ 成長曲線/実力スコアは出さない。データ収集方法が時期で変わっており(初期=spice無し)、
//   時系列の"伸び"は本物の成長ではなく注釈の増加=偽物になるため。ギャグに集中する。

import type { DmmConversation, DmmTurn } from '@/lib/d1';
import { showEpisodes } from '@/data/english/dmm-show';

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

// 既に「夜(番組)」にした回。ランキングは残りだけを並べる(=作業キューとして使うため)。
// sourceId を持つ夜はそれで、持たない古い夜は日付で照合する。
const NIGHT_BY_SOURCE: Record<string, number> = Object.fromEntries(
    showEpisodes.flatMap((e) => [
        ...(e.sourceId ? [[e.sourceId, e.night] as const] : []),
        // D1 に重複登録されている同一レッスンも既出扱いにする(ランキングに幽霊を残さない)
        ...(e.altSourceIds ?? []).map((id) => [id, e.night] as const),
    ]),
);
const NIGHT_BY_DATE: Record<string, number> = Object.fromEntries(
    showEpisodes.filter((e) => !e.sourceId).map((e) => [e.date, e.night]),
);
function nightOf(conv: DmmConversation): number | null {
    return NIGHT_BY_SOURCE[conv.id] ?? NIGHT_BY_DATE[conv.date] ?? null;
}

export interface DerivedGag {
    boke: string;       // 生徒の実発話(original)
    correct: string;    // native 修正
    tsukkomi: string;   // spice(日本語ツッコミ)
    engaged?: string;   // より深い native 返し
}

export interface DerivedLesson {
    id: string;
    date: string;
    title: string;
    teacher: string | null;
    turns: number;
    studentTurns: number;
    spiceCount: number;     // ツッコミが付いた発話 = 拾われた醜態(ボケ)
    engaged: number;        // engaged(深い返し)まで付いた発話
    divergences: number;    // diagnosis 致命的乖離 Top3
    grammarBugs: number;    // diagnosis 繰り返し文法バグ
    annotated: boolean;     // spice か検死が付いている = ギャグ化の素がある
    shutai: number;         // 醜態力(0-100)。未注釈は 0
    exp: number;            // 恥=経験値(実値)
    gags: DerivedGag[];     // 濃いボケ(spice順)
    night: number | null;   // 既に夜(番組)にした回なら第N夜。未着手は null
}

function students(conv: DmmConversation): DmmTurn[] {
    return (conv.turns || []).filter((t) => t.role === 'student');
}

export function deriveLesson(conv: DmmConversation): DerivedLesson {
    const st = students(conv);
    const studentTurns = st.length;
    const spiced = st.filter((t) => t.spice && t.spice.trim() !== '');
    const spiceCount = spiced.length;
    const engaged = st.filter((t) => t.engaged && t.engaged.trim() !== '').length;

    const diag = conv.diagnosis;
    const divergences = diag?.divergences?.length ?? 0;
    const grammarBugs = diag?.grammar?.length ?? 0;
    const annotated = spiceCount > 0 || !!diag;

    // 醜態力: 恥が多く拾われている回ほど高い。未注釈(素材未抽出)は 0=「まだ夜になってない」。
    const shutai = annotated ? clamp(spiceCount * 7 + divergences * 13 + grammarBugs * 4 + 18, 8, 100) : 0;

    // 恥=経験値。出場(発話)+ 晒した恥。上達ではなく蓄積。
    const exp = studentTurns * 2 + spiceCount * 20 + divergences * 30 + grammarBugs * 10;

    const gags: DerivedGag[] = spiced
        .filter((t) => t.native && t.native.trim() !== '')
        .map((t) => ({ boke: t.original, correct: t.native!, tsukkomi: t.spice!, engaged: t.engaged }))
        .sort((a, b) => b.tsukkomi.length - a.tsukkomi.length)
        .slice(0, 3);

    return {
        id: conv.id, date: conv.date, title: conv.title, teacher: conv.teacher_name ?? null,
        turns: conv.turns?.length ?? 0, studentTurns,
        spiceCount, engaged, divergences, grammarBugs, annotated, shutai, exp, gags,
        night: nightOf(conv),
    };
}

const THRESHOLDS = [0, 0, 200, 500, 900, 1400, 2000, 2700];
function levelForExp(totalExp: number): { level: number; nextAt: number } {
    let level = 1;
    for (let lv = 2; lv < 60; lv++) {
        const th = lv < THRESHOLDS.length ? THRESHOLDS[lv] : 2700 + (lv - 6) * 800;
        if (totalExp >= th) level = lv; else break;
    }
    const nextLv = level + 1;
    const nextAt = nextLv < THRESHOLDS.length ? THRESHOLDS[nextLv] : 2700 + (nextLv - 6) * 800;
    return { level, nextAt };
}

export interface Career {
    lessons: DerivedLesson[];        // 日付昇順
    totalLessons: number;
    totalTurns: number;              // 総発話ターン(出場回数)
    totalShame: number;              // 恥の総量(拾われた醜態 = spice + 乖離)
    totalExp: number;
    level: number;
    nextLevelAt: number;
    streak: number;
    spiceReady: number;              // ツッコミ注釈済みの回数
    diagReady: number;               // 検死済みの回数
    nightReady: number;              // ギャグ化の素がある回数(spice か検死)
    ready: DerivedLesson[];          // 醜態力ランキング(降順、注釈済み かつ まだ夜にしていない回だけ)
    made: DerivedLesson[];           // 既に夜にした回(第N夜 昇順)
    madeCount: number;               // = made.length。「N/63 が夜になった」の分子
    queue: DerivedLesson[];          // 未注釈(=夜にする素材待ち)、日付降順
    expCurve: { date: string; cum: number }[];  // 恥の蓄積(正直な積み上げ)
}

export function deriveCareer(convs: DmmConversation[]): Career {
    const lessons = convs.map(deriveLesson).sort((a, b) => a.date.localeCompare(b.date));
    const totalLessons = lessons.length;
    const totalTurns = lessons.reduce((s, l) => s + l.studentTurns, 0);
    const totalShame = lessons.reduce((s, l) => s + l.spiceCount + l.divergences, 0);
    const totalExp = lessons.reduce((s, l) => s + l.exp, 0);
    const { level, nextAt } = levelForExp(totalExp);

    const uniq = [...new Set(lessons.map((l) => l.date))].sort().reverse();
    let streak = uniq.length ? 1 : 0;
    for (let i = 1; i < uniq.length; i++) {
        if ((new Date(uniq[i - 1]).getTime() - new Date(uniq[i]).getTime()) / 86400000 === 1) streak++; else break;
    }

    const spiceReady = lessons.filter((l) => l.spiceCount > 0).length;
    const diagReady = lessons.filter((l) => l.divergences > 0 || l.grammarBugs > 0).length;
    const nightReady = lessons.filter((l) => l.annotated).length;

    // ランキングは「まだ夜にしていない注釈済みの回」だけ = そのまま次にやる作業キュー。
    const ready = lessons.filter((l) => l.annotated && l.night === null).sort((a, b) => b.shutai - a.shutai);
    const made = lessons.filter((l) => l.night !== null).sort((a, b) => a.night! - b.night!);
    const queue = lessons.filter((l) => !l.annotated && l.night === null).sort((a, b) => b.date.localeCompare(a.date));

    let cum = 0;
    const expCurve = lessons.map((l) => { cum += l.exp; return { date: l.date, cum }; });

    return {
        lessons, totalLessons, totalTurns, totalShame, totalExp, level, nextLevelAt: nextAt,
        streak, spiceReady, diagReady, nightReady, ready, made, madeCount: made.length, queue, expCurve,
    };
}

// 6軸レーダー(実データ、醜態中心)
export interface RadarAxis { key: string; label: string; value: number }
export function deriveRadar(l: DerivedLesson): RadarAxis[] {
    const st = Math.max(1, l.studentTurns);
    return [
        { key: 'boke', label: 'ボケ密度', value: clamp((l.spiceCount / st) * 220) },
        { key: 'kairi', label: '崩壊(乖離)', value: clamp(l.divergences * 26 + 8) },
        { key: 'bug', label: '文法事故', value: clamp(l.grammarBugs * 16 + 8) },
        { key: 'shutai', label: '醜態力', value: l.shutai },
        { key: 'geigei', label: '話芸(engaged)', value: clamp((l.engaged / st) * 150) },
        { key: 'shutsujo', label: '出場(発話)', value: clamp(l.studentTurns * 2 + 20) },
    ];
}
