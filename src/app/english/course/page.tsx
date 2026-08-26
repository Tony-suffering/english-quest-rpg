'use client';

/**
 * 百日課程 — 商品の本線
 *
 * ■ なぜこれを作ったか
 * 玄関に置いた耳の測定は「あなたはLv.3です」で終わっていた。
 * 測ったあとの道のりが無いので、コーチングかメンバーシップに飛ばすしかない。
 * 測定と地続きの道のりを置く。
 *
 * ■ 見た目の方針
 * 最初に作った版は、黒い箱の下に表を並べただけだった。あれは教材であって商品ではない。
 * 順番を入れ替えた。先に一枚絵で「渡りたい」を作り、根拠の数字を看板にし、
 * 表はいちばん後ろに置く。
 *   - 生成りの紙。白いカードと角丸をやめる
 *   - 明朝体。欧文は字間を開けて活版の組みに寄せる
 *   - 影は 0 2px 0 の硬い影。浮かせない、刷る
 *   - 進捗はバーではなく海図。100日を渡る航路として描く
 *
 * ■ 他の教材と何が違うか
 * 単語の選び方に根拠がある。3億3,374万語を数えて、出会う回数の多い順に並べただけ。
 * 誰かの好みでも、試験の出題傾向でもない。
 *
 * ■ 言ってはいけないこと
 * カバー率は「出会う表現の出現回数のうち何割か」であって理解度ではない。
 * 「英語の18%が分かる」と書いた瞬間に嘘になる。
 *
 * ■ 保存
 * サーバもDBも使わない。localStorage だけ。何人来ても費用が増えない。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import CoursePoster from '@/components/english/CoursePoster';

const PAPER = '#F7F5EF';
const CHART = '#F3ECDC';
const INK = '#1C1917';
const MUTED = '#78716C';
const LINE = '#E7E5E4';
const GOLD = '#B8941E';
const GREEN = '#065F46';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

const LEARNED_KEY = 'course:learned';
const DAY_KEY = 'course:day';
const EAR_KEY = 'ear:result';

/** 診断で当たる日。ここで2つ続けて出なければ、その手前が今の在庫の境目 */
const PROBE_DAYS = [2, 6, 12, 20, 30, 42, 56, 72, 88];

const KIND_NAME = ['句動詞', 'イディオム', '文まるごと', '会話フレーズ', '定番の組み合わせ'];
const TIER_NAME = ['浴びる', 'よく会う', 'ときどき', 'たまに', '稀'];
/** 層の色。海図なので彩度は落とす */
const TIER_COLOR = ['#7C3AED', GOLD, GREEN, '#B33A2B', MUTED];

type Card = { en: string; ja: string; note: string; kind: number; tier: number; hits: number };
type Course = {
    days: number;
    perDay: number;
    corpusWords: number;
    totalChunks: number;
    finalCoverage: number;
    coverageByDay: number[];
    cards: Card[];
};
type Clip = { v: string; t: number; s: string };

export default function CoursePage() {
    const [course, setCourse] = useState<Course | null>(null);
    const [clips, setClips] = useState<Record<string, Clip[]>>({});
    const [learned, setLearned] = useState<Set<string>>(new Set());
    const [day, setDay] = useState(1);
    const [reveal, setReveal] = useState<Set<string>>(new Set());
    const [openClip, setOpenClip] = useState<string | null>(null);
    const [earLv, setEarLv] = useState<number | null>(null);
    const [testing, setTesting] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetch('/data/course-1000.json')
            .then((r) => r.json())
            .then(setCourse)
            .catch(() => setCourse(null));
        fetch('/data/course-clips.json')
            .then((r) => r.json())
            .then(setClips)
            .catch(() => {});
        try {
            const raw = localStorage.getItem(LEARNED_KEY);
            if (raw) setLearned(new Set(JSON.parse(raw)));
            const d = Number(localStorage.getItem(DAY_KEY));
            if (d) setDay(Math.max(1, d));
            const ear = localStorage.getItem(EAR_KEY);
            if (ear) setEarLv(JSON.parse(ear).lv ?? null);
        } catch {
            /* 初回 */
        }
        setReady(true);
    }, []);

    const persist = (next: Set<string>) => {
        try {
            localStorage.setItem(LEARNED_KEY, JSON.stringify([...next]));
        } catch {
            /* 保存できなくても操作は続く */
        }
    };
    const saveLearned = (next: Set<string>) => {
        setLearned(next);
        persist(next);
    };
    /**
     * 素早く2枚続けて押されると、直前の state を掴んだままの toggle が
     * 片方の記録を消す。関数形式で必ず最新から作る。
     */
    const toggle = (en: string) => {
        setLearned((prev) => {
            const next = new Set(prev);
            if (next.has(en)) next.delete(en);
            else next.add(en);
            persist(next);
            return next;
        });
    };
    const goDay = (n: number) => {
        if (!course) return;
        const v = Math.min(course.days, Math.max(1, n));
        setDay(v);
        setReveal(new Set());
        setOpenClip(null);
        try {
            localStorage.setItem(DAY_KEY, String(v));
        } catch {
            /* 保存できなくても進める */
        }
    };

    const today = useMemo(() => {
        if (!course) return [];
        return course.cards.slice((day - 1) * course.perDay, day * course.perDay);
    }, [course, day]);

    const doneToday = today.filter((c) => learned.has(c.en)).length;
    const doneAll = course ? course.cards.filter((c) => learned.has(c.en)).length : 0;
    // 10個そろって初めて1日ぶん。9個ではまだ0%。切り上げると0個で3.65%になって嘘になる
    const fullDays = course ? Math.floor(doneAll / course.perDay) : 0;
    const nowCoverage = fullDays > 0 ? course!.coverageByDay[fullDays - 1] ?? 0 : 0;
    const daysLeft = course ? Math.max(0, course.days - fullDays) : 0;
    const finished = course ? doneAll >= course.cards.length : false;

    /** 日ごとの主たる層。航路の地形になる */
    const tierByDay = useMemo(() => {
        if (!course) return [];
        const out: number[] = [];
        for (let d = 0; d < course.days; d++) {
            const slice = course.cards.slice(d * course.perDay, (d + 1) * course.perDay);
            const count = [0, 0, 0, 0, 0];
            slice.forEach((c) => {
                count[c.tier] = (count[c.tier] ?? 0) + 1;
            });
            out.push(count.indexOf(Math.max(...count)));
        }
        return out;
    }, [course]);

    if (!ready || !course) {
        return (
            <div style={{ minHeight: '100vh', background: PAPER, padding: '38px 18px' }}>
                <div style={{ maxWidth: 980, margin: '0 auto', color: MUTED, fontSize: 13, fontFamily: SERIF }}>
                    {ready ? '課程データを読み込めませんでした。' : '読み込み中…'}
                </div>
            </div>
        );
    }

    if (testing) {
        return (
            <Placement
                course={course}
                learned={learned}
                onDone={(d, known) => {
                    saveLearned(known);
                    goDay(d);
                    setTesting(false);
                }}
                onCancel={() => setTesting(false)}
            />
        );
    }

    return (
        <div style={{ background: PAPER, minHeight: '100vh' }}>
            <div style={{ maxWidth: 980, margin: '0 auto', padding: '26px 18px 80px', color: INK }}>

                {/* ===== 一枚絵。表より先に、渡りたいを作る ===== */}
                <CoursePoster
                    days={course.days}
                    total={course.cards.length}
                    coverage={course.finalCoverage}
                    chunks={course.totalChunks}
                />

                {/* ===== 但し書き。数字で売る以上ここを曖昧にしない ===== */}
                <div
                    style={{
                        border: `1px solid ${INK}`,
                        borderTop: 'none',
                        background: '#fff',
                        padding: '13px 16px',
                        fontSize: 11.5,
                        color: MUTED,
                        lineHeight: 1.95,
                        marginBottom: 30,
                        boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                    }}
                >
                    {course.finalCoverage}% は「出会う表現の出現回数のうち何割を占めるか」です。
                    「英語の{course.finalCoverage}%が分かるようになる」という意味ではありません。
                    母集団の約9割は映像字幕なので、素の会話より少しだけ劇的な表現に寄ります。
                    順番は誰かの好みでも、試験の出題傾向でもなく、{course.corpusWords.toLocaleString()}語を数えた結果です。
                </div>

                {/* ===== 航海図。進捗バーをやめて、渡る図にする ===== */}
                <div style={{ marginBottom: 30 }}>
                    <VoyageChart course={course} tierByDay={tierByDay} fullDays={fullDays} day={day} onPick={goDay} />
                </div>

                {/* ===== 耳の測定。入口と出口を同じ物差しにする ===== */}
                <Link href="/english/ear" style={{ textDecoration: 'none', display: 'block', marginBottom: 26 }}>
                    <div
                        style={{
                            border: `1px solid ${INK}`,
                            background: CHART,
                            padding: '18px 20px',
                            boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                            color: INK,
                        }}
                    >
                        <div style={{ fontSize: 10, letterSpacing: 4, color: GOLD, fontWeight: 800, marginBottom: 7 }}>
                            BEFORE AND AFTER — 始める前と、終わったあとに測る
                        </div>
                        <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, lineHeight: 1.75 }}>
                            {earLv !== null ? (
                                <>
                                    いまの耳は <span style={{ color: GOLD }}>第 {earLv} 段 / 10</span>
                                    {finished ? '。百日を終えました。もう一度測ってください。' : '。百日目にもう一度測ります。'}
                                </>
                            ) : (
                                '耳がどこで壊れるか、まだ測っていません。'
                            )}
                        </div>
                        <div style={{ fontSize: 12, color: MUTED, marginTop: 7, lineHeight: 1.85 }}>
                            段が上がっていなければ、それは効いていないということです。無料・5分・登録不要。
                        </div>
                    </div>
                </Link>

                {/* ===== 現在地 ===== */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 26,
                        flexWrap: 'wrap',
                        fontSize: 12.5,
                        color: MUTED,
                        fontWeight: 700,
                        marginBottom: 14,
                    }}
                >
                    <span>
                        覚えた <b style={{ color: INK, fontSize: 16, fontFamily: SERIF }}>{doneAll}</b> / {course.cards.length}
                    </span>
                    <span>
                        いまのカバー率 <b style={{ color: GOLD, fontSize: 16, fontFamily: SERIF }}>{nowCoverage}%</b>
                    </span>
                    <span>
                        残り <b style={{ color: INK, fontSize: 16, fontFamily: SERIF }}>{daysLeft}</b> 日
                    </span>
                </div>

                <button
                    onClick={() => setTesting(true)}
                    style={{
                        width: '100%',
                        border: `1px solid ${INK}`,
                        background: '#fff',
                        padding: '14px',
                        fontFamily: SERIF,
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: INK,
                        cursor: 'pointer',
                        boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                        marginBottom: 34,
                    }}
                >
                    どこから始めるか診断する — 九問
                </button>

                {/* ===== その日の見出し ===== */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderTop: `2px solid ${INK}`,
                        borderBottom: `1px solid ${INK}`,
                        padding: '14px 0',
                        marginBottom: 16,
                    }}
                >
                    <button onClick={() => goDay(day - 1)} disabled={day <= 1} style={navBtn(day <= 1)}>
                        前の日
                    </button>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 10, letterSpacing: 5, color: MUTED, fontWeight: 800 }}>DAY</div>
                        <div style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 900, lineHeight: 1.15 }}>
                            {day}
                            <span style={{ fontSize: 14, color: MUTED, fontWeight: 700 }}> / {course.days}</span>
                        </div>
                        <div
                            style={{
                                fontSize: 10.5,
                                letterSpacing: 2.5,
                                color: TIER_COLOR[tierByDay[day - 1] ?? 0],
                                fontWeight: 800,
                            }}
                        >
                            {TIER_NAME[tierByDay[day - 1] ?? 0]} の層
                        </div>
                    </div>
                    <button onClick={() => goDay(day + 1)} disabled={day >= course.days} style={navBtn(day >= course.days)}>
                        次の日
                    </button>
                </div>

                <div
                    style={{
                        background: INK,
                        color: PAPER,
                        padding: '15px 18px',
                        marginBottom: 16,
                        fontFamily: SERIF,
                        fontSize: 14.5,
                        lineHeight: 2,
                    }}
                >
                    聞くのは<span style={{ color: GOLD }}>「知ってる？」ではありません</span>。
                    日本語を見て、英語が<span style={{ color: GOLD }}>口から出るか</span>です。
                    出なければ、知っていても在庫はゼロです。
                </div>

                {/* ===== 今日の十枚 ===== */}
                <div style={{ border: `1px solid ${INK}`, background: '#fff', boxShadow: '0 2px 0 rgba(28,25,23,0.9)' }}>
                    {today.map((c, i) => {
                        const done = learned.has(c.en);
                        const shown = reveal.has(c.en) || done;
                        const cl = clips[c.en];
                        const isOpen = openClip === c.en;
                        return (
                            <div
                                key={c.en}
                                style={{
                                    display: 'flex',
                                    borderBottom: i === today.length - 1 ? 'none' : `1px solid ${LINE}`,
                                    background: done ? '#FBFAF6' : '#fff',
                                }}
                            >
                                <button
                                    onClick={() => toggle(c.en)}
                                    aria-label={done ? '言えなかったに戻す' : '言えた'}
                                    style={{
                                        width: 50,
                                        flexShrink: 0,
                                        border: 'none',
                                        borderRight: `1px solid ${done ? GREEN : LINE}`,
                                        background: done ? GREEN : '#FAFAF9',
                                        color: done ? PAPER : '#D6D3D1',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div style={{ flex: 1, minWidth: 0, padding: '15px 17px' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: SERIF, fontSize: 12, color: '#C7C2B6', width: 26 }}>
                                            {(day - 1) * course.perDay + i + 1}
                                        </span>
                                        <span style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 700 }}>{c.ja}</span>
                                        <span style={{ fontSize: 10.5, color: MUTED }}>一生で {c.hits.toLocaleString()} 回</span>
                                    </div>

                                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        {shown ? (
                                            <span style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 700, color: GOLD, letterSpacing: 0.5 }}>
                                                {c.en}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setReveal(new Set([...reveal, c.en]))}
                                                style={{
                                                    background: 'transparent',
                                                    border: `1px solid ${INK}`,
                                                    padding: '6px 14px',
                                                    fontFamily: SERIF,
                                                    fontSize: 12.5,
                                                    color: INK,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                英語を見る
                                            </button>
                                        )}
                                        <span style={rule}>{KIND_NAME[c.kind] ?? ''}</span>
                                        <span style={{ ...rule, color: TIER_COLOR[c.tier], borderColor: TIER_COLOR[c.tier] }}>
                                            {TIER_NAME[c.tier] ?? ''}
                                        </span>
                                        {cl?.length > 0 && (
                                            <button
                                                onClick={() => setOpenClip(isOpen ? null : c.en)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    fontSize: 11.5,
                                                    color: GREEN,
                                                    fontWeight: 700,
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: 3,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                実際に言っている場面 {cl.length}件
                                            </button>
                                        )}
                                    </div>

                                    {shown && c.note && (
                                        <div
                                            style={{
                                                marginTop: 10,
                                                borderLeft: `3px solid ${GOLD}`,
                                                background: '#FDFBF4',
                                                padding: '10px 13px',
                                                fontSize: 12.5,
                                                color: '#57534E',
                                                lineHeight: 1.95,
                                            }}
                                        >
                                            {c.note}
                                        </div>
                                    )}

                                    {isOpen && cl && (
                                        <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 7 }}>
                                            {cl.map((x, k) => (
                                                <a
                                                    key={k}
                                                    href={`https://www.youtube.com/watch?v=${x.v}&t=${x.t}s`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        display: 'block',
                                                        border: `1px solid ${LINE}`,
                                                        background: CHART,
                                                        padding: '9px 12px',
                                                        fontSize: 12.5,
                                                        color: '#57534E',
                                                        textDecoration: 'none',
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {x.s}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    style={{
                        marginTop: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 14,
                        flexWrap: 'wrap',
                        fontSize: 12.5,
                        color: MUTED,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: 12,
                    }}
                >
                    <span>
                        今日の出来 <b style={{ color: INK, fontSize: 15, fontFamily: SERIF }}>{doneToday}</b> / {today.length}
                    </span>
                    <span>
                        この日を終えると、カバー率は{' '}
                        <b style={{ color: GOLD, fontSize: 15, fontFamily: SERIF }}>{course.coverageByDay[day - 1]}%</b> になる
                    </span>
                </div>

                <button
                    onClick={() => goDay(day + 1)}
                    disabled={day >= course.days}
                    style={{
                        marginTop: 16,
                        width: '100%',
                        background: day >= course.days ? CHART : INK,
                        color: day >= course.days ? MUTED : PAPER,
                        border: `1px solid ${INK}`,
                        padding: '18px 0',
                        fontFamily: SERIF,
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: 2,
                        cursor: day >= course.days ? 'default' : 'pointer',
                        boxShadow: day >= course.days ? 'none' : '0 2px 0 rgba(28,25,23,0.9)',
                    }}
                >
                    {day >= course.days ? '最終日です' : `第 ${day + 1} 日 へ`}
                </button>

                {finished && (
                    <Link href="/english/ear" style={{ textDecoration: 'none', display: 'block' }}>
                        <div
                            style={{
                                marginTop: 16,
                                border: `1px solid ${INK}`,
                                background: CHART,
                                padding: '22px 20px',
                                boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                                color: INK,
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ fontSize: 10, letterSpacing: 5, color: GOLD, fontWeight: 800, marginBottom: 8 }}>
                                LANDFALL — 百日
                            </div>
                            <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
                                千個、渡り終えました
                            </div>
                            <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.9 }}>
                                最初に測った耳を、もう一度測ってください。段が上がっているかどうかが答えです。
                            </div>
                        </div>
                    </Link>
                )}

                <div
                    style={{
                        marginTop: 28,
                        fontSize: 11,
                        color: MUTED,
                        lineHeight: 2,
                        borderTop: `1px solid ${LINE}`,
                        paddingTop: 14,
                    }}
                >
                    出典 — 映像字幕・YouTubeの話し言葉・映画脚本を合わせた{course.corpusWords.toLocaleString()}語。
                    そこから{course.totalChunks.toLocaleString()}表現を抽出し、生活で出会う回数で並べたうちの上位{course.cards.length.toLocaleString()}個。
                    「一生で◯回」は1日あたりの接触量からの推定で、順位は信用できるが絶対回数は目安。
                </div>
            </div>
        </div>
    );
}

/* ================= 部品 ================= */

const rule: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    padding: '2px 8px',
    fontSize: 10,
    color: MUTED,
    letterSpacing: 1,
    fontWeight: 700,
};

function navBtn(disabled: boolean): React.CSSProperties {
    return {
        border: `1px solid ${disabled ? LINE : INK}`,
        background: 'transparent',
        padding: '11px 15px',
        fontFamily: SERIF,
        fontSize: 13,
        color: disabled ? '#C7C2B6' : INK,
        cursor: disabled ? 'default' : 'pointer',
    };
}

/**
 * 航海図。
 * 進捗バーは「どこまで来たか」しか言わないが、この課程で見せたいのは
 * 「渡る距離」と「積み上がるカバー率」と「地形が変わること」の3つ。
 * 海図の様式(ハッチングの海・活版の目盛)でそれを1枚にする。
 */
function VoyageChart({
    course,
    tierByDay,
    fullDays,
    day,
    onPick,
}: {
    course: Course;
    tierByDay: number[];
    fullDays: number;
    day: number;
    onPick: (d: number) => void;
}) {
    const W = 1000;
    const H = 300;
    const L = 54;
    const R = 26;
    const T = 34;
    const B = 46;
    const plotW = W - L - R;
    const plotH = H - T - B;
    const maxY = course.finalCoverage;

    const x = (d: number) => L + (plotW * (d - 1)) / (course.days - 1);
    const y = (v: number) => T + plotH - (plotH * v) / maxY;

    const line = course.coverageByDay
        .map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i + 1).toFixed(1)},${y(v).toFixed(1)}`)
        .join(' ');
    const area = `${line} L${x(course.days).toFixed(1)},${T + plotH} L${L},${T + plotH} Z`;
    const sailed =
        fullDays > 0
            ? course.coverageByDay
                  .slice(0, fullDays)
                  .map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i + 1).toFixed(1)},${y(v).toFixed(1)}`)
                  .join(' ')
            : '';

    return (
        <div
            style={{
                background: CHART,
                border: `1px solid ${INK}`,
                boxShadow: '0 2px 0 rgba(28,25,23,0.9), 0 18px 40px rgba(28,25,23,0.14)',
            }}
        >
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                <defs>
                    <pattern id="c-sea" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
                        <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="0.4" opacity="0.16" />
                    </pattern>
                    <pattern id="c-land" width="6" height="6" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="0.45" fill={INK} opacity="0.14" />
                    </pattern>
                </defs>

                {/* 外枠。海図の二重罫 */}
                <rect x={10} y={10} width={W - 20} height={H - 20} fill="none" stroke={INK} strokeWidth="1.6" />
                <rect x={15} y={15} width={W - 30} height={H - 30} fill="none" stroke={INK} strokeWidth="0.5" />

                {/* 海 = まだ渡っていない部分 */}
                <rect x={L} y={T} width={plotW} height={plotH} fill="url(#c-sea)" />
                {/* 陸 = 積み上がったカバー率 */}
                <path d={area} fill="url(#c-land)" stroke="none" />
                <path d={line} fill="none" stroke={INK} strokeWidth="1.1" />

                {/* 渡り終えた航路 */}
                {sailed && <path d={sailed} fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />}

                {/* 層が変わる所に線を立てる */}
                {tierByDay.map((t, i) => {
                    const prev = tierByDay[i - 1];
                    if (i === 0 || t === prev) return null;
                    return (
                        <g key={`b${i}`}>
                            <line
                                x1={x(i + 1)}
                                y1={T}
                                x2={x(i + 1)}
                                y2={T + plotH}
                                stroke={TIER_COLOR[t]}
                                strokeWidth="0.7"
                                strokeDasharray="3 3"
                                opacity="0.75"
                            />
                            <text x={x(i + 1) + 4} y={T + 13} fontFamily={SERIF} fontSize={10} letterSpacing={1.5} fill={TIER_COLOR[t]}>
                                {TIER_NAME[t]}
                            </text>
                        </g>
                    );
                })}

                {/* 横罫 */}
                {[0, 5, 10, 15, Math.round(maxY)].map((v) => (
                    <g key={`h${v}`}>
                        <line x1={L} y1={y(v)} x2={L + plotW} y2={y(v)} stroke={INK} strokeWidth="0.35" opacity="0.35" />
                        <text x={L - 8} y={y(v) + 3.5} textAnchor="end" fontFamily={SERIF} fontSize={10} fill={MUTED}>
                            {v}%
                        </text>
                    </g>
                ))}

                {/* 日の目盛 */}
                {[1, 25, 50, 75, 100].map((d) => (
                    <g key={`d${d}`}>
                        <line x1={x(d)} y1={T + plotH} x2={x(d)} y2={T + plotH + 6} stroke={INK} strokeWidth="0.8" />
                        <text x={x(d)} y={T + plotH + 20} textAnchor="middle" fontFamily={SERIF} fontSize={10.5} fill={MUTED}>
                            {d}日
                        </text>
                    </g>
                ))}

                {/* いま開いている日 */}
                <line x1={x(day)} y1={T} x2={x(day)} y2={T + plotH} stroke={INK} strokeWidth="0.9" />
                <circle cx={x(day)} cy={y(course.coverageByDay[day - 1])} r="4.5" fill={PAPER} stroke={INK} strokeWidth="1.4" />

                {/* 現在地の船 */}
                {fullDays > 0 && (
                    <g transform={`translate(${x(fullDays)}, ${y(course.coverageByDay[fullDays - 1])})`}>
                        <path d="M-8,4 L8,4 L5,9 L-5,9 Z" fill={INK} />
                        <line x1="0" y1="4" x2="0" y2="-11" stroke={INK} strokeWidth="1.2" />
                        <path d="M0,-11 L11,-6 L0,-1 Z" fill={GOLD} stroke={INK} strokeWidth="0.8" />
                    </g>
                )}

                {/* 題 */}
                <text x={L} y={T - 14} fontFamily={SERIF} fontSize={11} letterSpacing={4} fill={GOLD}>
                    THE VOYAGE — 百日で渡る
                </text>
                <text x={L + plotW} y={T - 14} textAnchor="end" fontFamily={SERIF} fontSize={10.5} fill={MUTED}>
                    縦軸 = 出会う表現の出現回数のうち、覆える割合
                </text>
            </svg>

            {/* 日を直に選ぶ。図と操作を切り離さない */}
            <div style={{ borderTop: `1px solid ${INK}`, padding: '11px 15px', display: 'flex', alignItems: 'center', gap: 13 }}>
                <span style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 800, flexShrink: 0 }}>
                    第 {day} 日
                </span>
                <input
                    type="range"
                    min={1}
                    max={course.days}
                    value={day}
                    onChange={(e) => onPick(Number(e.target.value))}
                    style={{ flex: 1, accentColor: GOLD }}
                    aria-label="日を選ぶ"
                />
            </div>
        </div>
    );
}

/**
 * 診断。
 * 上から順に当てていき、2つ続けて出てこなかった所の手前を開始日にする。
 * 「知ってる？」ではなく「口から出る？」を聞く。知識ではなく在庫を測る。
 */
function Placement({
    course,
    learned,
    onDone,
    onCancel,
}: {
    course: Course;
    learned: Set<string>;
    onDone: (day: number, known: Set<string>) => void;
    onCancel: () => void;
}) {
    const probes = useMemo(
        () => PROBE_DAYS.map((d) => course.cards[(d - 1) * course.perDay + 2]).filter(Boolean),
        [course]
    );
    const [at, setAt] = useState(0);
    const [miss, setMiss] = useState(0);
    const [known, setKnown] = useState<Set<string>>(new Set(learned));

    const answer = (ok: boolean) => {
        const c = probes[at];
        const nextKnown = new Set(known);
        if (ok) nextKnown.add(c.en);
        setKnown(nextKnown);

        const m = ok ? 0 : miss + 1;
        setMiss(m);

        if (m >= 2 || at + 1 >= probes.length) {
            const reached = Math.max(0, at - (m >= 2 ? 1 : 0));
            onDone(PROBE_DAYS[reached] ?? 1, nextKnown);
            return;
        }
        setAt(at + 1);
    };

    const c = probes[at];
    if (!c) return null;

    return (
        <div
            style={{
                minHeight: '100vh',
                background: PAPER,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px 18px',
            }}
        >
            <div style={{ width: '100%', maxWidth: 560 }}>
                <div style={{ textAlign: 'center', marginBottom: 22 }}>
                    <div style={{ fontSize: 10.5, letterSpacing: 6, color: GOLD, fontWeight: 800, marginBottom: 8 }}>
                        THE PROBE — 診断
                    </div>
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.95 }}>
                        この日本語を英語で言えますか。
                        <b style={{ color: INK }}>見て分かるかではなく、口から出るか</b>です。
                    </div>
                    <div style={{ marginTop: 10, fontFamily: SERIF, fontSize: 12, color: '#C7C2B6', letterSpacing: 2 }}>
                        {at + 1} / {probes.length}
                    </div>
                </div>

                <div
                    style={{
                        background: CHART,
                        border: `1px solid ${INK}`,
                        padding: '44px 24px',
                        textAlign: 'center',
                        boxShadow: '0 2px 0 rgba(28,25,23,0.9), 0 18px 40px rgba(28,25,23,0.14)',
                    }}
                >
                    <div style={{ fontFamily: SERIF, fontSize: 29, fontWeight: 900, lineHeight: 1.6 }}>{c.ja}</div>
                    <div style={{ marginTop: 14, fontSize: 11, color: MUTED, letterSpacing: 1 }}>
                        一生で {c.hits.toLocaleString()} 回 耳に入る表現
                    </div>
                </div>

                <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <button
                        onClick={() => answer(false)}
                        style={{
                            padding: '17px 0',
                            border: `1px solid ${INK}`,
                            background: '#fff',
                            fontFamily: SERIF,
                            fontSize: 15,
                            fontWeight: 700,
                            color: INK,
                            cursor: 'pointer',
                            boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                        }}
                    >
                        出てこない
                    </button>
                    <button
                        onClick={() => answer(true)}
                        style={{
                            padding: '17px 0',
                            border: `1px solid ${INK}`,
                            background: GREEN,
                            fontFamily: SERIF,
                            fontSize: 15,
                            fontWeight: 700,
                            color: PAPER,
                            cursor: 'pointer',
                            boxShadow: '0 2px 0 rgba(28,25,23,0.9)',
                        }}
                    >
                        言える
                    </button>
                </div>

                <button
                    onClick={onCancel}
                    style={{
                        marginTop: 18,
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        fontSize: 11.5,
                        color: '#C7C2B6',
                        cursor: 'pointer',
                    }}
                >
                    やめる
                </button>
            </div>
        </div>
    );
}
