'use client';

/**
 * 100日課程 — 商品の本線
 *
 * ■ なぜこれを作ったか
 * 玄関に置いた耳の測定は「あなたはLv.3です」で終わっていた。
 * 測ったあとの道のりが無いので、コーチングかメンバーシップに飛ばすしかない。
 * 測定と地続きの道のりを置く。
 *
 * ■ 他の教材と何が違うか
 * 単語の選び方に根拠がある。3億3,374万語を数えて、出会う回数の多い順に並べただけ。
 * 誰かの好みでも、試験の出題傾向でもない。
 *
 * ■ 言ってはいけないこと
 * カバー率は「出会う表現の出現回数のうち何割か」であって理解度ではない。
 * 「英語の18%が分かる」と書いた瞬間に嘘になる。文言はこのファイルの PROMISE に固定する。
 *
 * ■ 保存
 * サーバもDBも使わない。localStorage だけ。何人来ても費用が増えない。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';
const GREEN = '#059669';

const LEARNED_KEY = 'course:learned';
const DAY_KEY = 'course:day';
const EAR_KEY = 'ear:result';

/** 診断で当たる日。ここで2つ続けて出なければ、その手前が今の在庫の境目 */
const PROBE_DAYS = [2, 6, 12, 20, 30, 42, 56, 72, 88];

const KIND_NAME = ['句動詞', 'イディオム', '文まるごと', '会話フレーズ', '定番の組み合わせ'];
const TIER_NAME = ['浴びる', 'よく会う', 'ときどき', 'たまに', '稀'];

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    if (!ready || !course) {
        return (
            <div style={{ minHeight: '100vh', background: BG, padding: '28px 16px' }}>
                <div style={{ maxWidth: 760, margin: '0 auto', color: SUB, fontSize: 13 }}>
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
        <div style={{ minHeight: '100vh', background: BG, padding: '24px 16px 72px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
                {/* ===== 約束 ===== */}
                <div style={{ background: INK, color: '#fff', borderRadius: 14, padding: '22px 22px', marginBottom: 14 }}>
                    <div style={{ fontSize: 9.5, letterSpacing: '0.24em', color: GOLD, fontWeight: 900, marginBottom: 9 }}>
                        100日課程 ・ 1日10個 ・ 登録不要
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5, marginBottom: 10 }}>
                        英語を{course.corpusWords.toLocaleString()}語 数えた。
                        <br />
                        出会う回数の多い順に、1,000個だけ渡す。
                    </div>
                    <div style={{ fontSize: 12.5, opacity: 0.8, lineHeight: 1.8 }}>
                        この1,000個で、あなたが一生で出会う表現の
                        <strong style={{ color: GOLD }}> 出現回数の {course.finalCoverage}% </strong>
                        を占めます。1日10個で100日。順番は好みでも試験でもなく、実測した回数の多い順です。
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.14)', fontSize: 11, opacity: 0.62, lineHeight: 1.7 }}>
                        {course.finalCoverage}% は「出会う表現の出現回数のうち何割か」です。
                        「英語の{course.finalCoverage}%が分かる」という意味ではありません。
                    </div>
                </div>

                {/* ===== 耳の測定との接続 ===== */}
                <Link href="/english/ear" style={{ textDecoration: 'none', display: 'block' }}>
                    <div
                        style={{
                            background: '#fff',
                            border: `1px solid ${LINE}`,
                            borderLeft: `4px solid ${GOLD}`,
                            borderRadius: 12,
                            padding: '13px 16px',
                            marginBottom: 14,
                        }}
                    >
                        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: DEEPGOLD, fontWeight: 800, marginBottom: 5 }}>
                            始める前と、終わったあとに測る
                        </div>
                        <div style={{ fontSize: 13.5, color: INK, fontWeight: 800, lineHeight: 1.6 }}>
                            {earLv !== null ? (
                                <>
                                    いまの耳: <span style={{ color: DEEPGOLD }}>Lv.{earLv} / 10</span>
                                    {finished ? ' — 100日終わりました。もう一度測ってください' : ' — 100日目にもう一度測りましょう'}
                                </>
                            ) : (
                                '耳がどこで壊れるか、まだ測っていません（無料・5分）'
                            )}
                        </div>
                        <div style={{ fontSize: 11.5, color: SUB, marginTop: 5, lineHeight: 1.6 }}>
                            段が上がっていなければ、それは効いていないということです。
                        </div>
                    </div>
                </Link>

                {/* ===== 現在地 ===== */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '16px 18px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
                        <Stat label="覚えた" value={`${doneAll}`} unit={`/ ${course.cards.length}`} />
                        <Stat label="いまのカバー率" value={`${nowCoverage}`} unit="%" gold />
                        <Stat label="残り" value={`${daysLeft}`} unit="日" />
                    </div>
                    <div style={{ height: 9, borderRadius: 999, background: '#F5F5F4', overflow: 'hidden' }}>
                        <div
                            style={{
                                height: '100%',
                                width: `${(doneAll / course.cards.length) * 100}%`,
                                background: `linear-gradient(90deg, ${GOLD}, #E6C75E)`,
                                borderRadius: 999,
                                transition: 'width .3s',
                            }}
                        />
                    </div>
                    <button
                        onClick={() => setTesting(true)}
                        style={{
                            marginTop: 13,
                            width: '100%',
                            background: '#fff',
                            border: `1px solid ${LINE}`,
                            borderRadius: 10,
                            padding: '11px 14px',
                            fontSize: 13,
                            fontWeight: 800,
                            color: INK,
                            cursor: 'pointer',
                        }}
                    >
                        どこから始めるか診断する（9問）
                    </button>
                </div>

                {/* ===== 今日の10個 ===== */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <button onClick={() => goDay(day - 1)} disabled={day <= 1} style={navBtn(day <= 1)}>
                        前の日
                    </button>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 10, letterSpacing: '0.2em', color: SUB, fontWeight: 800 }}>DAY</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: INK, lineHeight: 1.1 }}>
                            {day}
                            <span style={{ fontSize: 13, color: SUB, fontWeight: 700 }}> / {course.days}</span>
                        </div>
                    </div>
                    <button onClick={() => goDay(day + 1)} disabled={day >= course.days} style={navBtn(day >= course.days)}>
                        次の日
                    </button>
                </div>

                <div
                    style={{
                        background: INK,
                        color: '#fff',
                        borderRadius: 12,
                        padding: '13px 16px',
                        marginBottom: 12,
                        fontSize: 12.5,
                        lineHeight: 1.8,
                    }}
                >
                    聞くのは<strong style={{ color: GOLD }}>「知ってる？」ではありません</strong>。
                    日本語を見て、英語が<strong style={{ color: GOLD }}>口から出るか</strong>です。
                    出なければ、知っていても在庫はゼロです。
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {today.map((c, i) => {
                        const done = learned.has(c.en);
                        const shown = reveal.has(c.en) || done;
                        const cl = clips[c.en];
                        const isOpen = openClip === c.en;
                        return (
                            <div
                                key={c.en}
                                style={{
                                    background: '#fff',
                                    border: `1px solid ${done ? '#A7F3D0' : LINE}`,
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    display: 'flex',
                                }}
                            >
                                <button
                                    onClick={() => toggle(c.en)}
                                    aria-label={done ? '言えなかったに戻す' : '言えた'}
                                    style={{
                                        width: 46,
                                        flexShrink: 0,
                                        border: 'none',
                                        borderRight: `1px solid ${done ? '#A7F3D0' : '#F5F5F4'}`,
                                        background: done ? GREEN : '#FAFAF9',
                                        color: done ? '#fff' : '#D6D3D1',
                                        cursor: 'pointer',
                                        fontSize: 18,
                                        fontWeight: 900,
                                    }}
                                >
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <div style={{ flex: 1, minWidth: 0, padding: '12px 14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 11, color: '#D6D3D1', fontWeight: 700, width: 22 }}>
                                            {(day - 1) * course.perDay + i + 1}
                                        </span>
                                        <span style={{ fontSize: 15.5, fontWeight: 900, color: INK }}>{c.ja}</span>
                                        <span style={{ fontSize: 10.5, color: SUB }}>一生で {c.hits.toLocaleString()} 回</span>
                                    </div>

                                    <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                                        {shown ? (
                                            <span style={{ fontSize: 17, fontWeight: 800, color: DEEPGOLD, fontFamily: 'ui-monospace, monospace' }}>
                                                {c.en}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => setReveal(new Set([...reveal, c.en]))}
                                                style={{
                                                    background: '#F5F5F4',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    padding: '6px 13px',
                                                    fontSize: 12.5,
                                                    color: SUB,
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                英語を見る
                                            </button>
                                        )}
                                        <span style={badge}>{KIND_NAME[c.kind] ?? ''}</span>
                                        <span style={badge}>{TIER_NAME[c.tier] ?? ''}</span>
                                        {cl?.length > 0 && (
                                            <button
                                                onClick={() => setOpenClip(isOpen ? null : c.en)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    fontSize: 11.5,
                                                    color: DEEPGOLD,
                                                    fontWeight: 700,
                                                    textDecoration: 'underline',
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
                                                marginTop: 9,
                                                background: '#FFFBEB',
                                                border: '1px solid #FDE68A',
                                                borderRadius: 9,
                                                padding: '8px 11px',
                                                fontSize: 12.5,
                                                color: '#57534E',
                                                lineHeight: 1.75,
                                            }}
                                        >
                                            {c.note}
                                        </div>
                                    )}

                                    {isOpen && cl && (
                                        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {cl.map((x, k) => (
                                                <a
                                                    key={k}
                                                    href={`https://www.youtube.com/watch?v=${x.v}&t=${x.t}s`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                        display: 'block',
                                                        border: `1px solid ${LINE}`,
                                                        borderRadius: 9,
                                                        padding: '8px 11px',
                                                        fontSize: 12.5,
                                                        color: '#57534E',
                                                        textDecoration: 'none',
                                                        lineHeight: 1.7,
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
                        marginTop: 14,
                        background: '#fff',
                        border: `1px solid ${LINE}`,
                        borderRadius: 12,
                        padding: '14px 16px',
                        fontSize: 12.5,
                        color: SUB,
                        lineHeight: 1.7,
                    }}
                >
                    今日の出来: <strong style={{ color: INK }}>{doneToday} / {today.length}</strong>
                    　この日を終えると、カバー率は{' '}
                    <strong style={{ color: DEEPGOLD }}>{course.coverageByDay[day - 1]}%</strong> になります。
                </div>

                <button
                    onClick={() => goDay(day + 1)}
                    disabled={day >= course.days}
                    style={{
                        marginTop: 12,
                        width: '100%',
                        background: day >= course.days ? '#E7E5E4' : INK,
                        color: day >= course.days ? SUB : '#fff',
                        border: 'none',
                        borderRadius: 12,
                        padding: '15px 0',
                        fontSize: 15,
                        fontWeight: 900,
                        cursor: day >= course.days ? 'default' : 'pointer',
                    }}
                >
                    {day >= course.days ? '最終日です' : `DAY ${day + 1} へ`}
                </button>

                {finished && (
                    <Link href="/english/ear" style={{ textDecoration: 'none', display: 'block' }}>
                        <div
                            style={{
                                marginTop: 12,
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`,
                                borderRadius: 12,
                                padding: '16px 18px',
                                color: '#3F2F05',
                            }}
                        >
                            <div style={{ fontSize: 15, fontWeight: 900, marginBottom: 4 }}>1,000個、終わりました</div>
                            <div style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                                最初に測った耳を、もう一度測ってください。段が上がっているかどうかが答えです。
                            </div>
                        </div>
                    </Link>
                )}

                <div style={{ marginTop: 22, fontSize: 11, color: SUB, lineHeight: 1.85 }}>
                    出典: 映像字幕・YouTubeの話し言葉・映画脚本を合わせた{course.corpusWords.toLocaleString()}語。
                    そこから{course.totalChunks.toLocaleString()}表現を抽出し、出会う回数で並べたうちの上位1,000個です。
                    母集団の9割は映像字幕なので、会話より少しだけ劇的な表現に寄ります。
                </div>
            </div>
        </div>
    );
}

const badge: React.CSSProperties = {
    background: '#F5F5F4',
    border: `1px solid ${LINE}`,
    borderRadius: 6,
    padding: '2px 7px',
    fontSize: 10,
    color: SUB,
    fontWeight: 700,
};

function navBtn(disabled: boolean): React.CSSProperties {
    return {
        background: '#fff',
        border: `1px solid ${LINE}`,
        borderRadius: 10,
        padding: '9px 13px',
        fontSize: 12.5,
        fontWeight: 700,
        color: disabled ? '#D6D3D1' : INK,
        cursor: disabled ? 'default' : 'pointer',
    };
}

function Stat({ label, value, unit, gold }: { label: string; value: string; unit: string; gold?: boolean }) {
    return (
        <div>
            <div style={{ fontSize: 10.5, color: SUB, fontWeight: 700, marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: gold ? DEEPGOLD : INK, lineHeight: 1 }}>
                {value}
                <span style={{ fontSize: 12, color: SUB, fontWeight: 700 }}> {unit}</span>
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
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <div style={{ width: '100%', maxWidth: 520 }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 9.5, letterSpacing: '0.24em', color: SUB, fontWeight: 900, marginBottom: 8 }}>
                        診断
                    </div>
                    <div style={{ fontSize: 13, color: SUB, lineHeight: 1.75 }}>
                        この日本語を英語で言えますか。
                        <strong style={{ color: INK }}>見て分かるかではなく、口から出るか</strong>です。
                    </div>
                    <div style={{ marginTop: 10, fontSize: 11.5, color: '#A8A29E', fontWeight: 700 }}>
                        {at + 1} / {probes.length}
                    </div>
                </div>

                <div style={{ background: '#fff', border: `2px solid ${INK}`, borderRadius: 16, padding: '34px 22px', textAlign: 'center' }}>
                    <div style={{ fontSize: 25, fontWeight: 900, color: INK, lineHeight: 1.5 }}>{c.ja}</div>
                    <div style={{ marginTop: 12, fontSize: 11, color: SUB }}>
                        一生で {c.hits.toLocaleString()} 回 耳に入る表現です
                    </div>
                </div>

                <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                    <button
                        onClick={() => answer(false)}
                        style={{ padding: '15px 0', borderRadius: 12, border: `1px solid ${LINE}`, background: '#fff', fontSize: 14.5, fontWeight: 900, color: INK, cursor: 'pointer' }}
                    >
                        出てこない
                    </button>
                    <button
                        onClick={() => answer(true)}
                        style={{ padding: '15px 0', borderRadius: 12, border: 'none', background: GREEN, fontSize: 14.5, fontWeight: 900, color: '#fff', cursor: 'pointer' }}
                    >
                        言える
                    </button>
                </div>

                <button
                    onClick={onCancel}
                    style={{ marginTop: 16, width: '100%', background: 'none', border: 'none', fontSize: 11.5, color: '#A8A29E', cursor: 'pointer' }}
                >
                    やめる
                </button>
            </div>
        </div>
    );
}
