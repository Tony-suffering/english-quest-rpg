'use client';

/**
 * SPEAK 5 — 5本の指で2分。英検1級 2次のスピーチを、10テーマで特訓するページ。
 *
 * 【このページの役割】
 * /english/speak(スピークパス)は「1日1本の模範スピーチ」。/english/topic100 は「20の論拠で100題」。
 * ここは本番の2分の組み立てだけに絞る — 入口で3点を予告し、前座(money / time)を短く片づけ、
 * 本命(fairness / trust / freedom、予備 nature)の固定段落で終える。
 * 覚えるのは本命の段落3本 + 予備1本と、入口・譲歩・締めの枠だけ。
 *
 * 【並べる順番 = 練習で使う順番】
 * 2分の配分 -> 枠 -> 指 -> 10テーマ(全文 / 骨 / 質疑 / 逆の立場) -> タイマー -> 特訓のやり方 -> 台帳
 *
 * 【3つの版】生の英語版 = カードのうち答案っぽくない文(JRE・コメディ・ドラマ・講師と本人の発話)だけで組んだもの。
 * カード版 = カードの実在の文で組んだもの(模範解答の書き取りも含む)。自作版 = 本命の段落を固定4文で組んだもの。
 *
 * データ: src/data/english/speak-five.ts(自作版)/ speak-five-cards.ts(カード版) / 検査: scripts/verify-speak-five.cjs
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';
import {
    FIVE_FINGERS, FIVE_THEMES, FINGER_BY_ID, OWN,
    OPENER_FRAME, OPENER_FRAME_JA, CONCEDE_FRAME, CONCEDE_FRAME_JA, CLOSE_FRAME, CLOSE_FRAME_JA,
    EXAMINER_REQUEST, AI_QA_PROMPT, DRILL_CHECKS,
    buildSpeech, speakable, wordCount, speechWords,
    type FiveTheme, type SpeechPart,
} from '@/data/english/speak-five';
import { CARD_SPEECHES, type CardLine } from '@/data/english/speak-five-cards';
import { RAW_SPEECHES } from '@/data/english/speak-five-raw';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const CREAM = '#FAFAF9';
const GREEN = '#047857';

const LEDGER_KEY = 'speak-five-ledger-v1';
const TOTAL_SECONDS = 120;

type Ledger = Record<string, { said?: boolean; examiner?: boolean; flip?: boolean; cAt?: string }>;

function loadLedger(): Ledger {
    try {
        const raw = window.localStorage.getItem(LEDGER_KEY);
        return raw ? (JSON.parse(raw) as Ledger) : {};
    } catch {
        return {};
    }
}

function saveLedger(l: Ledger) {
    try {
        window.localStorage.setItem(LEDGER_KEY, JSON.stringify(l));
    } catch {
        // 保存できない環境(プライベートウィンドウ等)では、表示だけ動かす
    }
}

function Section({ n, title, lead, children }: {
    n: string; title: string; lead?: string; children: React.ReactNode;
}) {
    return (
        <section style={{ marginBottom: '34px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '6px' }}>
                <span style={{
                    fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGOLD,
                    borderRadius: '4px', padding: '3px 8px', letterSpacing: '0.5px', flexShrink: 0,
                }}>{n}</span>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: INK, letterSpacing: '-0.2px' }}>{title}</h2>
            </div>
            {lead && <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.85 }}>{lead}</p>}
            {children}
        </section>
    );
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
    return (
        <span style={{
            fontSize: '10px', fontWeight: 900, color: '#fff', background: color,
            borderRadius: '4px', padding: '2px 7px', letterSpacing: '0.3px', whiteSpace: 'nowrap',
        }}>{children}</span>
    );
}

const PART_COLOR: Record<SpeechPart['key'], string> = {
    open: INK, a: FIVE_FINGERS[0].color, b: FIVE_FINGERS[1].color, c: DEEPGOLD, close: '#78716C',
};

/** 2分の配分の帯。秒数に比例した幅で並べる。 */
function TimeBar({ parts, nowSec }: { parts: { key: SpeechPart['key']; label: string; target: number }[]; nowSec?: number }) {
    const total = parts.reduce((n, p) => n + p.target, 0);
    let acc = 0;
    return (
        <div>
            <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${LINE}`, position: 'relative' }}>
                {parts.map((p) => {
                    const start = acc;
                    acc += p.target;
                    const active = nowSec !== undefined && nowSec >= start && nowSec < acc;
                    return (
                        <div key={p.key} style={{
                            flex: p.target, padding: '7px 4px', textAlign: 'center',
                            background: active ? PART_COLOR[p.key] : p.key === 'c' ? '#FEF9E7' : '#fff',
                            color: active ? '#fff' : PART_COLOR[p.key],
                            borderLeft: p.key === 'open' ? 'none' : `1px solid ${LINE}`,
                            transition: 'background 0.2s',
                        }}>
                            <div style={{ fontSize: '10.5px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.label}</div>
                            <div style={{ fontSize: '9.5px', opacity: 0.8 }}>{p.target}秒</div>
                        </div>
                    );
                })}
                {nowSec !== undefined && (
                    <div style={{
                        position: 'absolute', top: 0, bottom: 0, width: '2px', background: '#B91C1C',
                        left: `${Math.min(100, (nowSec / total) * 100)}%`,
                    }} />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: FAINT, marginTop: '3px' }}>
                <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span>
            </div>
        </div>
    );
}

type ShownLine = { en: string; ja: string; fixed: boolean; frame?: boolean; bridge?: boolean; expr?: string; note?: string; mode?: CardLine['mode']; card?: CardLine['card'] };

// ---- /english/training への登録(1文ずつ / 1本まるごと) ----
const REG_KEY = 'speak-five-registered';
function loadReg(): Set<string> {
    try {
        const raw = window.localStorage.getItem(REG_KEY);
        return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
        return new Set();
    }
}
function saveReg(set: Set<string>) {
    try {
        window.localStorage.setItem(REG_KEY, JSON.stringify([...set]));
    } catch {
        // 保存できない環境では、ボタンの状態だけがリセットされる(登録そのものは D1 に入っている)
    }
}
function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
/** カードの裏(japanese)に入れる文。訳 + つなぎの表現の解説 or カードの出典 + どのスピーチの文か */
function backOf(l: ShownLine, themeLabel: string, question: string): string {
    const parts = [l.ja];
    if (l.expr) parts.push(`表現: ${l.expr} — ${l.note ?? ''}`);
    if (l.card) parts.push(`出典: カード ${l.card.date}${l.mode && l.mode !== 'exact' ? ` ・ 元の文: ${l.card.text}` : ''}`);
    parts.push(`SPEAK 5 「${themeLabel}」 ${question}`);
    return parts.join('\n\n');
}
type ShownPart = { key: SpeechPart['key']; label: string; target: number; lines: ShownLine[] };

const MODE_JA: Record<NonNullable<CardLine['mode']>, string> = { exact: 'そのまま', trim: '切り出し', slot: '差し替え' };

function mmss(s: number) {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
}

export default function SpeakFivePage() {
    const [themeId, setThemeId] = useState(FIVE_THEMES[0].id);
    const [mode, setMode] = useState<'full' | 'bones'>('full');
    const [version, setVersion] = useState<'raw' | 'cards' | 'own'>('raw');
    const [showJa, setShowJa] = useState(true);
    const [showAnswers, setShowAnswers] = useState(false);
    const [ledger, setLedger] = useState<Ledger>({});
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const timerRef = useRef<number | null>(null);
    const startRef = useRef(0);

    useEffect(() => { setLedger(loadLedger()); }, []);

    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [regPending, setRegPending] = useState<Set<string>>(new Set());
    const [bulk, setBulk] = useState<{ done: number; total: number } | null>(null);
    useEffect(() => { setRegistered(loadReg()); }, []);

    const registerOne = useCallback(async (english: string, japanese: string) => {
        const en = english.trim();
        if (!en) return;
        let skip = false;
        setRegPending((p) => {
            if (p.has(en)) { skip = true; return p; }
            return new Set(p).add(en);
        });
        if (skip) return;
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: en, japanese, category: 'expression', date: todayStr() }),
            });
            const data = await res.json();
            if (data?.success || data?.duplicate) {
                setRegistered((prev) => {
                    const next = new Set(prev).add(en);
                    saveReg(next);
                    return next;
                });
            }
        } catch { /* 1件失敗しても次に進む */ }
        setRegPending((p) => {
            const next = new Set(p);
            next.delete(en);
            return next;
        });
    }, []);

    const registerMany = useCallback(async (items: { en: string; ja: string }[]) => {
        if (items.length === 0) return;
        setBulk({ done: 0, total: items.length });
        for (let i = 0; i < items.length; i++) {
            await registerOne(items[i].en, items[i].ja);
            setBulk({ done: i + 1, total: items.length });
        }
        window.setTimeout(() => setBulk(null), 2600);
    }, [registerOne]);

    useEffect(() => {
        if (!running) return;
        startRef.current = performance.now() - elapsed * 1000;
        timerRef.current = window.setInterval(() => {
            const s = (performance.now() - startRef.current) / 1000;
            if (s >= TOTAL_SECONDS) {
                setElapsed(TOTAL_SECONDS);
                setRunning(false);
            } else {
                setElapsed(s);
            }
        }, 200);
        return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
        // elapsed は開始時の値だけを使う
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running]);

    const theme = FIVE_THEMES.find((t) => t.id === themeId) as FiveTheme;
    const parts = useMemo(() => buildSpeech(theme), [theme]);
    const shown: ShownPart[] = useMemo(() => {
        if (version === 'own') return parts.map((p) => ({ ...p, lines: p.lines.map((l) => ({ ...l })) }));
        const sp = version === 'raw' ? RAW_SPEECHES[theme.id] : CARD_SPEECHES[theme.id];
        return parts.map((p) => ({
            key: p.key, label: p.label, target: p.target,
            lines: (sp?.[p.key] ?? []).map((l) => ({ en: l.en, ja: l.ja, fixed: false, frame: l.kind === 'frame', bridge: l.kind === 'bridge', expr: l.expr, note: l.note, mode: l.mode, card: l.card })),
        }));
    }, [version, parts, theme.id]);
    const cFinger = FINGER_BY_ID[theme.c];
    const words = version === 'own'
        ? speechWords(theme)
        : shown.reduce((n, p) => n + p.lines.reduce((m, l) => m + wordCount(l.en), 0), 0);
    const cardLineCount = shown.reduce((n, p) => n + p.lines.filter((l) => l.card).length, 0);
    const bridgeCount = shown.reduce((n, p) => n + p.lines.filter((l) => l.bridge).length, 0);
    const speechItems = shown.flatMap((p) => p.lines.map((l) => ({ en: speakable(l.en), ja: backOf(l, theme.label, theme.question) })));
    const leftToAdd = speechItems.filter((i) => !registered.has(i.en.trim())).length;
    const mainFingers = FIVE_FINGERS.filter((f) => f.role !== 'opener');
    const openerFingers = FIVE_FINGERS.filter((f) => f.role === 'opener');
    const usage = FIVE_THEMES.reduce<Record<string, number>>((m, t) => ((m[t.c] = (m[t.c] || 0) + 1), m), {});

    const updateLedger = (id: string, patch: Ledger[string]) => {
        setLedger((prev) => {
            const next = { ...prev, [id]: { ...prev[id], ...patch } };
            saveLedger(next);
            return next;
        });
    };
    const doneCount = FIVE_THEMES.reduce((n, t) => n + DRILL_CHECKS.filter((c) => ledger[t.id]?.[c.id]).length, 0);

    const timeline = parts.map((p) => ({ key: p.key, label: p.label, target: p.target }));
    let accSec = 0;
    const currentPart = timeline.find((p) => { accSec += p.target; return elapsed < accSec; }) ?? timeline[timeline.length - 1];

    const chipBtn = (on: boolean): React.CSSProperties => ({
        fontSize: '11px', fontWeight: 800, cursor: 'pointer',
        border: `1px solid ${on ? GOLD : LINE}`, background: on ? '#FEF9E7' : '#fff',
        color: on ? DEEPGOLD : SUB, borderRadius: '999px', padding: '5px 12px',
    });

    return (
        <div style={{ minHeight: '100vh', background: CREAM }}>
            <EikenOutputNav active="speak" />
            <main style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 60px' }}>

                {/* ---------- 見出し ---------- */}
                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT }}>英検1級 2次 スピーチ</div>
                <h1 style={{ margin: '5px 0 6px', fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
                    <span style={{ color: GOLD }}>SPEAK</span> 5
                </h1>
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: SUB, lineHeight: 1.85 }}>
                    5本の指で2分。入口で3つの点を予告し、前座の money と time を短い SVO で片づけ、
                    本当に言いたい1本(fairness / trust / freedom)で終える。
                    <b style={{ color: INK }}> 覚えるのは本命の段落3本と予備1本、それに入口・譲歩・締めの枠だけ。</b>
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                    {[
                        ['/english/write/core5/sheet', 'CORE 5 の10本の指'],
                        ['/english/speak', 'スピークパス 30日'],
                        ['/english/topic100', 'トピック100'],
                    ].map(([href, label]) => (
                        <Link key={href} href={href} style={{
                            fontSize: '10.5px', fontWeight: 800, color: DEEPGOLD, textDecoration: 'none',
                            border: `1px solid ${GOLD}66`, borderRadius: '999px', padding: '4px 12px',
                        }}>{label}</Link>
                    ))}
                </div>

                {/* ---------- 0 2分の配分 ---------- */}
                <Section n="0" title="2分の配分"
                    lead="本命の C に50秒。前座の A と B は合わせて40秒以内。A と B が延びたら、C を削らずに A と B の2文目を落とす。">
                    <TimeBar parts={timeline} />
                    <div style={{
                        marginTop: '12px', border: `1px solid ${LINE}`, borderLeft: `4px solid ${GOLD}`,
                        borderRadius: '10px', background: '#fff', padding: '4px 14px',
                    }}>
                        {[
                            ['入口で本命を予告する', '2分で話の途中でも止められる。本命を最後に置くなら、入口の most importantly で先に言っておく。C の途中で切れても、何が本命だったかは試験官に届いている。'],
                            ['前座は2文。削りすぎない', '試験官は C だけを見ていない。スピーチは全体の論理で見られ、続く約4分の質疑はスピーチの中身から来る。A がスカスカだと、A を突かれたときに沈む。主張1文 + 具体例1文は残す。'],
                            ['本命は固定の4文 + 自分の1文', '本命の段落は、お題が変わっても4文は動かさない。{X} に名詞を入れ、4文目に自分の具体例を1文だけ足す。'],
                        ].map(([t, s], i) => (
                            <div key={t} style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{t}</div>
                                <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.75, marginTop: '2px' }}>{s}</div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ---------- 1 枠 ---------- */}
                <Section n="1" title="動かさない枠 3本"
                    lead="入口・譲歩・締めは、お題が何でも形を変えない。入れるのは立場の1文と、本命の指の名前だけ。">
                    <div style={{ border: `2px solid ${GOLD}`, borderRadius: '10px', background: '#FEF9E7', padding: '4px 14px 10px' }}>
                        {[
                            ['入口', OPENER_FRAME, OPENER_FRAME_JA],
                            ['譲歩', CONCEDE_FRAME, CONCEDE_FRAME_JA],
                            ['締め', CLOSE_FRAME, CLOSE_FRAME_JA],
                        ].map(([tag, en, ja], i) => (
                            <div key={tag} style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${GOLD}33` }}>
                                <span style={{
                                    fontSize: '9px', fontWeight: 900, color: DEEPGOLD, background: '#fff',
                                    border: `1px solid ${GOLD}55`, borderRadius: '4px', padding: '2px 7px',
                                }}>{tag}</span>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: INK, lineHeight: 1.7, marginTop: '4px' }}>
                                    {speakable(en)}
                                </div>
                                <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.65 }}>{ja}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '7px' }}>
                        <b style={{ color: INK }}>{'{STANCE}'}</b> 立場の1文 ・ <b style={{ color: INK }}>{'{C}'}</b> 本命の指(fairness / trust / freedom / nature) ・
                        <b style={{ color: INK }}> 譲歩のあとに短い一言</b>(Fair taxes, yes. A cap, no.)を足すと、真ん中に立ちながら立場が残る。
                    </div>
                </Section>

                {/* ---------- 2 指 ---------- */}
                <Section n="2" title="5本の指(+予備1)"
                    lead="CORE 5 の10本から絞った。前座は自分の損得(左手)、本命は社会の価値(右手)。手をまたいで引くので、どのお題でも片手に偏らない。">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                        {openerFingers.map((f) => (
                            <div key={f.id} style={{
                                border: `1px solid ${LINE}`, borderLeft: `4px solid ${f.color}`,
                                borderRadius: '10px', background: '#fff', padding: '10px 13px',
                            }}>
                                <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Pill color={f.color}>{f.en.toUpperCase()}</Pill>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: SUB }}>前座 ・ {f.ja}</span>
                                </div>
                                <div style={{ fontSize: '11.5px', color: INK, lineHeight: 1.7, marginTop: '6px', fontWeight: 700 }}>{f.job}</div>
                                {f.howTo?.map((h) => (
                                    <div key={h} style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.65, marginTop: '3px' }}>{h}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                    {mainFingers.map((f) => (
                        <div key={f.id} style={{
                            border: `1px solid ${LINE}`, borderLeft: `4px solid ${f.color}`,
                            borderRadius: '10px', background: '#fff', padding: '11px 14px', marginBottom: '9px',
                        }}>
                            <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Pill color={f.color}>{f.en.toUpperCase()}</Pill>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: SUB }}>
                                    {f.role === 'main' ? '本命' : '予備(環境のお題だけ)'} ・ {f.ja}
                                </span>
                                <span style={{ marginLeft: 'auto', fontSize: '10px', color: FAINT, fontWeight: 800 }}>
                                    10テーマ中 {usage[f.id] ?? 0}本
                                </span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: INK, lineHeight: 1.7, marginTop: '5px', fontWeight: 700 }}>{f.job}</div>
                            <ol style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
                                {f.core?.map((s, i) => (
                                    <li key={i} style={{ padding: '4px 0', fontSize: '10px', color: FAINT }}>
                                        {s === OWN ? (
                                            <span style={{ fontSize: '12px', color: f.color, fontWeight: 800 }}>
                                                ここに自分の具体例を1文
                                            </span>
                                        ) : (
                                            <>
                                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK, lineHeight: 1.65 }}>
                                                    {speakable(s).split('{X}').map((chunk, k, arr) => (
                                                        <span key={k}>
                                                            {chunk}
                                                            {k < arr.length - 1 && (
                                                                <span style={{ color: f.color, fontWeight: 900, background: `${f.color}14`, borderRadius: '3px', padding: '0 3px' }}>X</span>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6 }}>{f.coreJa?.[i]?.split('{X}').join('X')}</div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ol>
                            {f.fromCards && (
                                <div style={{ marginTop: '7px', borderTop: `1px dashed ${LINE}`, paddingTop: '6px' }}>
                                    <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px' }}>出どころ(トレーニングカード)</div>
                                    {f.fromCards.map((c) => (
                                        <div key={c.en} style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6, marginTop: '2px' }}>
                                            <span style={{ fontFamily: 'Georgia, serif', color: INK }}>{c.en}</span>
                                            <span style={{ color: FAINT }}> ― {c.date} {c.note}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </Section>

                {/* ---------- 3 10テーマ ---------- */}
                <Section n="3" title="10テーマ"
                    lead="政治・経済の問いは「政府はどこまで関わるべきか」の形で来ることが多い。10本はその形で切ってある。お題はすべてこのページのオリジナル。スピーチは3つの版がある — 生の英語版はカードのうち JRE・ドラマ・講師の生の文だけ、カード版はカードの実在の文(模範解答も含む)、自作版は本命の段落を固定4文で組んだもの。">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '6px', marginBottom: '12px' }}>
                        {FIVE_THEMES.map((t) => {
                            const on = t.id === themeId;
                            const f = FINGER_BY_ID[t.c];
                            const done = DRILL_CHECKS.filter((c) => ledger[t.id]?.[c.id]).length;
                            return (
                                <button key={t.id} onClick={() => setThemeId(t.id)} style={{
                                    textAlign: 'left', cursor: 'pointer',
                                    border: `1px solid ${on ? f.color : LINE}`, background: on ? `${f.color}10` : '#fff',
                                    borderRadius: '10px', padding: '8px 10px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 900, color: on ? f.color : FAINT }}>{t.n}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{t.label}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                        <span style={{ fontSize: '9.5px', fontWeight: 900, color: f.color }}>C = {f.en}</span>
                                        <span style={{ marginLeft: 'auto', fontSize: '9.5px', color: done === 3 ? GREEN : FAINT, fontWeight: 800 }}>{done}/3</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ border: `1px solid ${LINE}`, borderTop: `4px solid ${cFinger.color}`, borderRadius: '12px', background: '#fff', padding: '14px 15px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px' }}>
                            #{theme.n} {theme.label} ・ こういう問いが来る: {theme.family}
                        </div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, color: INK, lineHeight: 1.5, marginTop: '6px' }}>
                            {theme.question}
                        </div>
                        <div style={{ fontSize: '11.5px', color: SUB, marginTop: '2px' }}>{theme.questionJa}</div>

                        <div style={{
                            display: 'flex', gap: '0', marginTop: '12px', border: `1px solid ${LINE}`, borderRadius: '10px', overflow: 'hidden',
                        }}>
                            {([
                                ['raw', '生の英語版', 'JRE・ドラマ・講師の生の文だけ'],
                                ['cards', 'カード版', '模範解答のカードも含む'],
                                ['own', '自作版', '本命は固定4文 + 自分の1文'],
                            ] as const).map(([v, label, sub]) => (
                                <button key={v} onClick={() => setVersion(v)} style={{
                                    flex: 1, cursor: 'pointer', border: 'none', padding: '8px 6px',
                                    background: version === v ? '#FEF9E7' : '#fff',
                                    borderBottom: version === v ? `3px solid ${GOLD}` : '3px solid transparent',
                                }}>
                                    <div style={{ fontSize: '12.5px', fontWeight: 900, color: version === v ? DEEPGOLD : SUB }}>{label}</div>
                                    <div style={{ fontSize: '9.5px', color: FAINT, marginTop: '1px' }}>{sub}</div>
                                </button>
                            ))}
                        </div>
                        {version !== 'own' && (
                            <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.7, marginTop: '6px' }}>
                                {version === 'raw' && <><b style={{ color: INK }}>試験の答案っぽいカードは使っていない</b>(First, / In conclusion / Admittedly で始まる文や、模範解答の書き取りは除外。検査で落とす)。</>}
                                カード{cardLineCount}行のあいだを、<b style={{ color: INK }}>つなぎの文{bridgeCount}行</b>(自作・金の線)でつないで、各段落を「主張 → カード(証拠) → 問いへの答え」にしてある。つなぎの文の太字は新しく覚える表現。カードの行の下には、登録日と そのまま / 切り出し / 差し替え を出している。全部の文に + TRAIN があり、1本まるごとの追加もできる。<b style={{ color: INK }}>この版は覚えるための長い版(2分を超える)。</b>本番の2分では、各段落を「つなぎ1文 + カード1文」に縮めて言う。
                                灰色の<b style={{ color: INK }}>枠</b>は立場の1文と道しるべ。
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                            <button style={chipBtn(mode === 'full')} onClick={() => setMode('full')}>全文</button>
                            <button style={chipBtn(mode === 'bones')} onClick={() => setMode('bones')}>{version === 'own' ? '骨だけ(本命の固定文は残す)' : '骨だけ(前座を隠す)'}</button>
                            <button style={chipBtn(showJa)} onClick={() => setShowJa((v) => !v)}>日本語 {showJa ? 'あり' : 'なし'}</button>
                            <button
                                onClick={() => registerMany(speechItems)}
                                disabled={leftToAdd === 0 || bulk !== null}
                                style={{
                                    fontSize: '11px', fontWeight: 900, cursor: leftToAdd === 0 || bulk ? 'default' : 'pointer',
                                    border: `1px solid ${leftToAdd === 0 ? '#15803D' : GOLD}`,
                                    background: leftToAdd === 0 ? '#DCFCE7' : GOLD, color: leftToAdd === 0 ? '#15803D' : '#fff',
                                    borderRadius: '999px', padding: '5px 12px',
                                }}
                            >
                                {bulk ? `登録中 ${bulk.done}/${bulk.total}` : leftToAdd === 0 ? 'この1本は全部トレーニングに入った' : `この1本を全部トレーニングに追加(${leftToAdd}文)`}
                            </button>
                            <span style={{ marginLeft: 'auto', fontSize: '10.5px', color: FAINT, alignSelf: 'center' }}>
                                {words}語 ・ 1分100語で {mmss(Math.round(words * 0.6))}
                            </span>
                        </div>

                        <div style={{ marginTop: '12px' }}>
                            {shown.map((p) => {
                                const partWords = p.lines.reduce((n, l) => n + wordCount(speakable(l.en)), 0);
                                return (
                                    <div key={p.key} style={{
                                        borderLeft: `3px solid ${PART_COLOR[p.key]}`,
                                        background: p.key === 'c' ? '#FEFCF3' : 'transparent',
                                        padding: '7px 0 7px 11px', marginBottom: '8px', borderRadius: '0 8px 8px 0',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 900, color: PART_COLOR[p.key] }}>{p.label}</span>
                                            <span style={{ fontSize: '9.5px', color: FAINT }}>{p.target}秒 ・ {partWords}語</span>
                                        </div>
                                        {p.lines.map((l, i) => {
                                            const hidden = version === 'own'
                                                ? mode === 'bones' && !l.fixed && !(p.key === 'open') && !(p.key === 'close' && i === p.lines.length - 1)
                                                : mode === 'bones' && !l.frame && (p.key === 'a' || p.key === 'b');
                                            return (
                                                <div key={i} style={{ padding: '3px 0 3px 6px', borderLeft: l.bridge ? `2px solid ${GOLD}` : '2px solid transparent' }}>
                                                    <div style={{
                                                        fontFamily: 'Georgia, serif', fontSize: '14.5px', lineHeight: 1.65,
                                                        color: hidden ? 'transparent' : INK,
                                                        background: hidden ? '#F5F5F4' : 'transparent',
                                                        borderRadius: '4px', userSelect: hidden ? 'none' : 'auto',
                                                        borderBottom: l.fixed ? `2px solid ${GOLD}66` : 'none',
                                                        fontStyle: l.frame ? 'italic' : 'normal',
                                                        display: 'inline',
                                                    }}>
                                                        {l.bridge && l.expr && !hidden ? (() => {
                                                            const text = speakable(l.en);
                                                            const at = text.toLowerCase().indexOf(l.expr.toLowerCase().replace(/[~,.].*$/, '').trim());
                                                            if (at < 0 || l.expr.includes('~')) return text;
                                                            const len = l.expr.replace(/[~,.].*$/, '').trim().length;
                                                            return (<>{text.slice(0, at)}<b style={{ background: `${GOLD}33`, borderRadius: '3px' }}>{text.slice(at, at + len)}</b>{text.slice(at + len)}</>);
                                                        })() : speakable(l.en)}
                                                    </div>
                                                    {!hidden && (() => {
                                                        const en = speakable(l.en).trim();
                                                        const on = registered.has(en);
                                                        const busy = regPending.has(en);
                                                        return (
                                                            <button
                                                                onClick={() => registerOne(en, backOf(l, theme.label, theme.question))}
                                                                disabled={on || busy}
                                                                title={on ? 'トレーニングに登録済み' : 'この1文をトレーニングに登録'}
                                                                style={{
                                                                    marginLeft: '7px', verticalAlign: 'middle', cursor: on || busy ? 'default' : 'pointer',
                                                                    borderRadius: '5px', padding: '1px 6px', fontSize: '8.5px', fontWeight: 900,
                                                                    border: `1px solid ${on ? '#15803D' : LINE}`, background: on ? '#DCFCE7' : '#fff',
                                                                    color: on ? '#15803D' : SUB, opacity: busy ? 0.5 : 1,
                                                                }}
                                                            >{on ? 'IN TRAINING' : busy ? '...' : '+ TRAIN'}</button>
                                                        );
                                                    })()}
                                                    {l.fixed && (
                                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: DEEPGOLD, marginLeft: '6px' }}>固定</span>
                                                    )}
                                                    {l.frame && (
                                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', background: FAINT, borderRadius: '3px', padding: '1px 5px', marginLeft: '6px' }}>枠</span>
                                                    )}
                                                    {l.bridge && (
                                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', background: GOLD, borderRadius: '3px', padding: '1px 5px', marginLeft: '6px' }}>つなぎ</span>
                                                    )}
                                                    {l.bridge && l.expr && !hidden && (
                                                        <div style={{ fontSize: '10px', color: DEEPGOLD, marginTop: '1px', lineHeight: 1.55 }}>
                                                            <b>{l.expr}</b> ― {l.note}
                                                        </div>
                                                    )}
                                                    {l.card && !hidden && (
                                                        <div style={{ fontSize: '9.5px', color: FAINT, marginTop: '1px', lineHeight: 1.55 }}>
                                                            <span style={{ fontWeight: 800, color: l.mode === 'exact' ? GREEN : DEEPGOLD }}>
                                                                カード {l.card.date.slice(5).replace('-', '/')} ・ {l.mode ? MODE_JA[l.mode] : ''}
                                                            </span>
                                                            {l.mode !== 'exact' && (
                                                                <span> ― 元の文: <span style={{ fontFamily: 'Georgia, serif', color: SUB }}>{l.card.text}</span></span>
                                                            )}
                                                        </div>
                                                    )}
                                                    {showJa && !hidden && (
                                                        <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.6, marginTop: '1px' }}>{l.ja}</div>
                                                    )}
                                                    {hidden && (
                                                        <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '1px' }}>
                                                            ― 自分で言う({l.ja.slice(0, 26)}{l.ja.length > 26 ? '…' : ''})
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>

                        {/* 質疑 */}
                        <div style={{ marginTop: '14px', borderTop: `1px solid ${LINE}`, paddingTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <span style={{ fontSize: '12.5px', fontWeight: 900, color: INK }}>質疑で来そうな3問</span>
                                <button style={{ ...chipBtn(showAnswers), marginLeft: 'auto' }} onClick={() => setShowAnswers((v) => !v)}>
                                    返し {showAnswers ? 'を隠す' : 'を見る'}
                                </button>
                            </div>
                            {theme.qa.map((q, i) => (
                                <div key={i} style={{ padding: '6px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                    <div style={{ display: 'flex', gap: '7px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        <Pill color={q.target === 'A' ? PART_COLOR.a : q.target === 'C' ? DEEPGOLD : '#78716C'}>
                                            {q.target === 'counter' ? '反論' : `${q.target} を突く`}
                                        </Pill>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK, fontWeight: 700 }}>{q.q}</span>
                                    </div>
                                    {showAnswers && (
                                        <div style={{ marginTop: '4px', paddingLeft: '4px' }}>
                                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: INK, lineHeight: 1.6 }}>{speakable(q.a)}</div>
                                            <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6 }}>{q.aJa}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 逆の立場 */}
                        <div style={{ marginTop: '12px', background: CREAM, border: `1px dashed ${LINE}`, borderRadius: '8px', padding: '9px 12px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px' }}>逆の立場の入口(1回だけ、本心と逆で話す)</div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK, lineHeight: 1.6, marginTop: '3px' }}>{speakable(theme.flip)}</div>
                            <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6 }}>{theme.flipJa}</div>
                        </div>
                    </div>
                </Section>

                {/* ---------- 4 タイマー ---------- */}
                <Section n="4" title="2分タイマー"
                    lead="赤い線がいま話しているはずの場所。0:50 で C に入っていなければ、前座が長い。2:00 で止まる。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '14px 15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            <span style={{
                                fontFamily: 'Georgia, serif', fontSize: '36px', fontWeight: 900,
                                color: elapsed >= TOTAL_SECONDS ? '#B91C1C' : INK, minWidth: '96px',
                            }}>{mmss(elapsed)}</span>
                            <div style={{ flex: 1, minWidth: '150px' }}>
                                <div style={{ fontSize: '10px', color: FAINT, fontWeight: 800 }}>いまの場所</div>
                                <div style={{ fontSize: '15px', fontWeight: 900, color: PART_COLOR[currentPart.key] }}>
                                    {elapsed >= TOTAL_SECONDS ? '時間。ここで止められる' : currentPart.label}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button onClick={() => setRunning((v) => !v)} disabled={elapsed >= TOTAL_SECONDS && !running} style={{
                                    fontSize: '13px', fontWeight: 900, cursor: 'pointer', border: 'none',
                                    background: running ? '#78716C' : GOLD, color: '#fff', borderRadius: '8px', padding: '9px 18px',
                                    opacity: elapsed >= TOTAL_SECONDS && !running ? 0.5 : 1,
                                }}>{running ? '止める' : elapsed > 0 ? '続ける' : 'スタート'}</button>
                                <button onClick={() => { setRunning(false); setElapsed(0); }} style={{
                                    fontSize: '13px', fontWeight: 800, cursor: 'pointer', border: `1px solid ${LINE}`,
                                    background: '#fff', color: SUB, borderRadius: '8px', padding: '9px 14px',
                                }}>リセット</button>
                            </div>
                        </div>
                        <TimeBar parts={timeline} nowSec={elapsed} />
                        <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.7, marginTop: '8px' }}>
                            いま選んでいるテーマ: <b style={{ color: INK }}>#{theme.n} {theme.label}</b>。
                            C に入った秒数は、下の台帳に書いておく。
                        </div>
                    </div>
                </Section>

                {/* ---------- 5 特訓のやり方 ---------- */}
                <Section n="5" title="特訓のやり方"
                    lead="4つだけ。どれも、これまでの夜で実際に効いたことから作った。">
                    {[
                        {
                            tag: 'DMM', title: '講師に試験官を頼む',
                            why: '第139夜と第141夜で一番効いたのは、講師が模範解答に反対したとき。毎回この形にする。A を突いてもらうのは、A が一番薄いから。',
                            en: EXAMINER_REQUEST.en, ja: EXAMINER_REQUEST.ja,
                        },
                        {
                            tag: 'AI', title: '音声 AI には質疑だけを頼む',
                            why: 'スピーチを AI に作らせると、100点が何度でも出てきて気圧される(第142夜)。AI は聞き手と質問役にだけ使う。',
                            en: AI_QA_PROMPT.en, ja: AI_QA_PROMPT.ja,
                        },
                        {
                            tag: '歩く', title: '歩きながら2分を録る',
                            why: '見るのは1つだけ。C に何秒で入ったか。50秒を超えたら、A と B の2文目を落とす。C は削らない。',
                        },
                        {
                            tag: '逆', title: '逆の立場で1回',
                            why: '第143夜、AI と作った賛成側を講師に崩されて、本心の反対側に戻った。各テーマで1回だけ本心と逆を話すと、質疑の反論への返しが先にできる。',
                        },
                    ].map((d) => (
                        <div key={d.tag} style={{
                            border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff',
                            padding: '11px 14px', marginBottom: '8px',
                        }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Pill color={DEEPGOLD}>{d.tag}</Pill>
                                <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{d.title}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.75, marginTop: '5px' }}>{d.why}</div>
                            {d.en && (
                                <div style={{ marginTop: '7px', background: CREAM, borderRadius: '8px', padding: '8px 11px' }}>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: INK, lineHeight: 1.65 }}>{d.en}</div>
                                    <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6, marginTop: '2px' }}>{d.ja}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </Section>

                {/* ---------- 6 台帳 ---------- */}
                <Section n="6" title={`台帳 ${doneCount} / ${FIVE_THEMES.length * DRILL_CHECKS.length}`}
                    lead="1テーマに3つ。記録はこのブラウザだけに残る(端末を変えると空になる)。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', overflowX: 'auto' }}>
                        <div style={{ minWidth: '520px' }}>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1.6fr repeat(3, 1fr) 0.9fr', gap: '6px',
                                fontSize: '9.5px', fontWeight: 900, color: FAINT, background: CREAM,
                                borderBottom: `1px solid ${LINE}`, padding: '7px 12px',
                            }}>
                                <span>テーマ</span>
                                {DRILL_CHECKS.map((c) => <span key={c.id} title={c.hint}>{c.label}</span>)}
                                <span>C に入った秒</span>
                            </div>
                            {FIVE_THEMES.map((t) => (
                                <div key={t.id} style={{
                                    display: 'grid', gridTemplateColumns: '1.6fr repeat(3, 1fr) 0.9fr', gap: '6px',
                                    alignItems: 'center', padding: '7px 12px', borderTop: `1px solid ${LINE}`,
                                }}>
                                    <button onClick={() => setThemeId(t.id)} style={{
                                        textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                                        fontSize: '12px', fontWeight: 800, color: t.id === themeId ? FINGER_BY_ID[t.c].color : INK,
                                    }}>{t.n}. {t.label}</button>
                                    {DRILL_CHECKS.map((c) => (
                                        <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '10.5px', color: SUB }}>
                                            <input
                                                type="checkbox"
                                                checked={!!ledger[t.id]?.[c.id]}
                                                onChange={(e) => updateLedger(t.id, { [c.id]: e.target.checked })}
                                                style={{ accentColor: GOLD, width: '16px', height: '16px' }}
                                            />
                                        </label>
                                    ))}
                                    <input
                                        inputMode="numeric"
                                        placeholder="例 45"
                                        value={ledger[t.id]?.cAt ?? ''}
                                        onChange={(e) => updateLedger(t.id, { cAt: e.target.value.replace(/[^0-9]/g, '').slice(0, 3) })}
                                        style={{
                                            width: '100%', fontSize: '12px', padding: '4px 6px', boxSizing: 'border-box',
                                            border: `1px solid ${LINE}`, borderRadius: '6px',
                                            color: Number(ledger[t.id]?.cAt) > 50 ? '#B91C1C' : INK,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.75, marginTop: '7px' }}>
                        {DRILL_CHECKS.map((c) => `${c.label} = ${c.hint}`).join(' / ')}。
                        秒数が50を超えると赤くなる。
                    </div>
                </Section>

            </main>
            <EikenOutputDisclaimer />
        </div>
    );
}
