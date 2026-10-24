'use client';

/**
 * SPEAK — 10本の指 × ネイティブの口語の部品(/english/write/core5 と同じ作り)。
 *
 * 【2026-10-07 に全面刷新】前の版(実話バンク + お題13本 + 模擬試験)は /english/speak/stories に移した。
 * 作文は凝った枠で点を取るが、口は逆 — JRE 130本・344時間の字幕を数えると、凝った枠はほぼ使われない。
 * このページは、その実測から「どのお題にも差し込める口語の部品」を指ごとに並べる。
 *   1 手 — 指を押す
 *   2 指1本 — 自分に聞く3つの問い / 口語の部品(出た回の数・字幕のまま・英検でそのまま使う1文)/ 2分の見本
 *   3 型 — 同じ出だしを3回積む / Xじゃない、Yだ / 人のセリフにして言う ...
 *   4 2分の組み立て — 1,125本の独白から
 *   5 リズム — 数字
 *
 * /english/training への登録は core5 と同じ流儀(localStorage に登録済みの印)。
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { HANDS, FINGERS, ENGINES_BY_HAND, ENGINE_BY_ID, CHANT, type EngineId, type Finger } from '@/data/english/write-core5';
import { FINGER_SPEAK, MOVES, TALK_STEPS, RHYTHM, MONO_SHIFT, SPEAK_CORPUS } from '@/data/english/speak-rogan';
import { FINGER_EXAM, EXAM_FRAMES, DEBATE_CORPUS } from '@/data/english/speak-exam';
import { FINGER_EXPR, EXPR_CORPUS } from '@/data/english/speak-expressions';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const CREAM = '#FAF8F2';
const VIOLET = '#7C3AED';

const REG_KEY = 'speak-rogan-registered';

const FINGER_RATIO: Record<Finger, number> = { thumb: 0.60, index: 0.87, middle: 1, ring: 0.90, little: 0.67 };
const LEFT_ORDER: Finger[] = ['little', 'ring', 'middle', 'index', 'thumb'];
const RIGHT_ORDER: Finger[] = ['thumb', 'index', 'middle', 'ring', 'little'];

function loadReg(): Set<string> {
    try {
        const s = localStorage.getItem(REG_KEY);
        return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
}
function saveReg(set: Set<string>) {
    try { localStorage.setItem(REG_KEY, JSON.stringify([...set])); } catch { /* noop */ }
}
function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function speak(text: string) {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}
function labelSize(en: string, wide: boolean): number {
    const longest = Math.max(...en.split(' ').map((w) => w.length));
    const base = longest <= 5 ? 13 : longest === 6 ? 12 : longest === 7 ? 10.5 : 9.5;
    return wide ? base + 1.5 : base;
}

export default function SpeakPage() {
    const [openEngine, setOpenEngine] = useState<EngineId | null>(null);
    const [hideTalk, setHideTalk] = useState(false);
    const [reg, setReg] = useState<'exam' | 'casual'>('exam');
    const [colWidth, setColWidth] = useState(760);
    const [stuck, setStuck] = useState(false);
    const handsRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const isMobile = colWidth < 620;

    // ---- /english/training への登録 ----
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [pending, setPending] = useState<Set<string>>(new Set());
    const [bulk, setBulk] = useState<{ label: string; done: number; total: number } | null>(null);
    useEffect(() => { setRegistered(loadReg()); }, []);

    const registerOne = useCallback(async (english: string, japanese: string) => {
        const en = english.trim();
        if (!en) return;
        let skip = false;
        setPending((p) => {
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
        setPending((p) => {
            const next = new Set(p);
            next.delete(en);
            return next;
        });
    }, []);

    const registerMany = useCallback(async (items: { en: string; ja: string }[], label: string) => {
        if (items.length === 0) return;
        setBulk({ label, done: 0, total: items.length });
        for (let i = 0; i < items.length; i++) {
            await registerOne(items[i].en, items[i].ja);
            setBulk({ label, done: i + 1, total: items.length });
        }
        window.setTimeout(() => setBulk(null), 2600);
    }, [registerOne]);

    useEffect(() => {
        const el = handsRef.current;
        if (!el) return;
        const apply = () => {
            const w = el.getBoundingClientRect().width;
            if (w > 0) setColWidth(w);
        };
        apply();
        window.addEventListener('resize', apply);
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
        ro?.observe(el);
        return () => {
            window.removeEventListener('resize', apply);
            ro?.disconnect();
        };
    }, []);

    useEffect(() => {
        const el = handsRef.current;
        if (!el) return;
        const onScroll = () => setStuck(el.getBoundingClientRect().bottom < 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const openFinger = useCallback((id: EngineId) => {
        setOpenEngine((prev) => (prev === id ? null : id));
        window.setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
    }, []);

    const handBase = isMobile ? 132 : 150;

    // ---------------------------------------------------------------- ボタン
    const addBtn = (en: string, ja: string) => {
        const on = registered.has(en.trim());
        const busy = pending.has(en.trim());
        return (
            <button
                onClick={() => registerOne(en, ja)}
                disabled={on || busy}
                title={on ? 'トレーニングに登録済み' : 'トレーニングに登録'}
                style={{
                    cursor: on || busy ? 'default' : 'pointer', borderRadius: '6px',
                    padding: '3px 8px', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                    whiteSpace: 'nowrap', font: 'inherit',
                    border: `1px solid ${on ? '#15803D' : LINE}`,
                    background: on ? '#DCFCE7' : '#fff',
                    color: on ? '#15803D' : SUB,
                    opacity: busy ? 0.5 : 1,
                }}
            >{on ? 'IN TRAINING' : busy ? '...' : '+ TRAIN'}</button>
        );
    };
    const playBtn = (en: string, label = 'PLAY') => (
        <button
            onClick={() => speak(en)}
            style={{
                cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', font: 'inherit',
                borderRadius: '6px', padding: '3px 8px', fontSize: '9px',
                fontWeight: 900, color: SUB, letterSpacing: '0.5px', whiteSpace: 'nowrap',
            }}
        >{label}</button>
    );
    const addAllBtn = (items: { en: string; ja: string }[], label: string, text: string) => {
        const left = items.filter((i) => !registered.has(i.en.trim())).length;
        return (
            <button
                onClick={() => registerMany(items, label)}
                disabled={left === 0 || bulk !== null}
                style={{
                    cursor: left === 0 || bulk ? 'default' : 'pointer', font: 'inherit',
                    fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', whiteSpace: 'nowrap',
                    border: `1px solid ${left === 0 ? '#15803D' : LINE}`,
                    background: left === 0 ? '#DCFCE7' : '#fff',
                    color: left === 0 ? '#15803D' : SUB,
                    borderRadius: '999px', padding: '4px 11px',
                }}
            >{left === 0 ? 'ALL IN TRAINING' : `${text} (${left})`}</button>
        );
    };
    const sectionTitle = (en: string, ja: string, n: string) => (
        <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>{n}</div>
            <h2 style={{ margin: '3px 0 2px', fontFamily: 'Georgia, serif', fontSize: '21px', fontWeight: 900, color: INK }}>{en}</h2>
            <div style={{ fontSize: '11.5px', color: FAINT }}>{ja}</div>
        </div>
    );

    // ---------------------------------------------------------------- 指1本(手の上)
    const renderFinger = (handId: 'left' | 'right', f: Finger) => {
        const hand = ENGINES_BY_HAND.find((h) => h.id === handId);
        const eng = hand?.engines.find((e) => e.finger === f);
        if (!eng) return null;
        const isOpen = openEngine === eng.id;
        const fj = FINGERS.find((x) => x.id === f);
        return (
            <button
                key={`${handId}-${f}`}
                onClick={() => openFinger(eng.id)}
                style={{
                    flex: 1, minWidth: 0, cursor: 'pointer', font: 'inherit',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: 0, border: 'none', background: 'none',
                }}
            >
                <div style={{
                    height: `${Math.round(handBase * FINGER_RATIO[f])}px`,
                    borderRadius: '999px 999px 7px 7px',
                    background: isOpen ? eng.color : `${eng.color}18`,
                    border: isOpen ? `2px solid ${eng.color}` : `1px solid ${eng.color}55`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'space-between', paddingTop: '9px', paddingBottom: '8px',
                    transition: 'all 0.18s',
                }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, color: isOpen ? '#fff' : eng.color, opacity: 0.8 }}>{fj?.short}</span>
                    <span lang="en" style={{
                        fontFamily: 'Georgia, serif', fontSize: `${labelSize(eng.en, isMobile)}px`, fontWeight: 900,
                        color: isOpen ? '#fff' : INK, lineHeight: 1.2, padding: '0 3px', textAlign: 'center',
                        overflowWrap: 'break-word', hyphens: 'auto',
                    }}>{eng.en}</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9.5px', color: FAINT, marginTop: '5px', lineHeight: 1.3 }}>{eng.ja}</div>
            </button>
        );
    };

    // ---------------------------------------------------------------- 1段の部品(CASUAL / EXAM 共通)
    type Row = { en: string; ja: string; count: number; total: number; source: string; ratio?: number; ex: string; plug: string; plugJa: string };
    const renderRows = (rows: Row[], color: string, trainJa: (r: Row) => string) => rows.map((p) => (
        <div key={p.en} style={{ padding: '9px 0', borderTop: `1px solid ${LINE}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF3C7', borderRadius: '4px', padding: '1px 7px' }}>{p.en}</span>
                <span style={{ fontSize: '10.5px', color: SUB }}>{p.ja}</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {p.ratio !== undefined && (
                        <span title="100,000語あたり、JRE(くだけた会話)の何倍出るか" style={{ fontSize: '9px', fontWeight: 900, color: VIOLET, background: '#F5F3FF', borderRadius: '3px', padding: '1px 5px' }}>
                            x{p.ratio} vs JRE
                        </span>
                    )}
                    <span title={`${p.source} ${p.total}本のうち、この形が出た本数`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '46px', height: '5px', borderRadius: '3px', background: LINE, overflow: 'hidden', display: 'inline-block' }}>
                            <span style={{ display: 'block', height: '100%', width: `${Math.max(3, Math.round((p.count / p.total) * 100))}%`, background: color }} />
                        </span>
                        <span style={{ fontSize: '9px', fontWeight: 900, color: SUB }}>{p.count}/{p.total}</span>
                    </span>
                </span>
            </div>
            <div style={{ fontSize: '12px', color: FAINT, fontStyle: 'italic', lineHeight: 1.6, marginTop: '4px' }}>
                <span style={{ fontSize: '8.5px', fontWeight: 900, fontStyle: 'normal', color: FAINT, letterSpacing: '0.5px', marginRight: '6px' }}>{p.source}</span>
                {p.ex}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '3px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '15px' : '16px', color: INK, lineHeight: 1.65 }}>{p.plug}</div>
                    <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.6 }}>{p.plugJa}</div>
                </div>
                <span style={{ display: 'flex', gap: '5px', paddingTop: '3px' }}>
                    {addBtn(p.plug, trainJa(p))}
                    {playBtn(p.plug)}
                </span>
            </div>
        </div>
    ));

    const regToggle = (
        <span style={{ display: 'inline-flex', border: `1px solid ${LINE}`, borderRadius: '999px', overflow: 'hidden' }}>
            {([['exam', 'EXAM ・ ディベート'], ['casual', 'CASUAL ・ JRE']] as const).map(([k, label]) => (
                <button key={k} onClick={() => setReg(k)} style={{
                    cursor: 'pointer', font: 'inherit', fontSize: '9.5px', fontWeight: 900, letterSpacing: '0.5px',
                    padding: '5px 12px', border: 'none',
                    background: reg === k ? (k === 'exam' ? VIOLET : DEEPGOLD) : '#fff',
                    color: reg === k ? '#fff' : SUB,
                }}>{label}</button>
            ))}
        </span>
    );

    // ---------------------------------------------------------------- 開いた指
    const renderDetail = (id: EngineId) => {
        const eng = ENGINE_BY_ID[id];
        const fj = FINGERS.find((x) => x.id === eng.finger);
        const fs = FINGER_SPEAK[id];
        const fx = FINGER_EXAM[id];
        const exam = reg === 'exam';
        const exprs = FINGER_EXPR[id];
        const exprItems = exprs.map((p) => ({ en: p.plug, ja: `${p.plugJa}(表現: ${p.en} = ${p.ja} / 骨組み: ${p.frame} / JRE ${p.jre}本・DEBATE ${p.debate}本)` }));
        const lines = exam ? fx.talk : fs.talk.lines;
        const talkText = lines.map((l) => l.en).join(' ');
        const words = lines.reduce((n, l) => n + l.en.split(/\s+/).length, 0);

        return (
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '18px 16px 0' }}>
                <div style={{
                    border: `2px solid ${eng.color}`, borderRadius: '14px', padding: '15px 16px',
                    background: '#fff', boxShadow: `0 4px 18px ${eng.color}14`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '9px', fontWeight: 900, color: '#fff', background: eng.color,
                            borderRadius: '4px', padding: '3px 7px', letterSpacing: '0.5px',
                        }}>{eng.hand === 'left' ? 'LEFT' : 'RIGHT'} {fj?.en.toUpperCase()}</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: INK }}>{eng.en}</span>
                        <span style={{ fontSize: '11px', color: FAINT }}>{eng.ja}</span>
                        <button
                            onClick={() => setOpenEngine(null)}
                            style={{
                                marginLeft: 'auto', cursor: 'pointer', font: 'inherit', fontSize: '10px', fontWeight: 900,
                                color: SUB, background: '#fff', border: `1px solid ${LINE}`, borderRadius: '999px', padding: '3px 10px',
                            }}
                        >CLOSE</button>
                    </div>

                    {/* 自分に聞く3つの問い */}
                    <div style={{ marginTop: '12px', background: CREAM, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>
                            ASK YOURSELF ・ この指を立てたら、自分に聞く3つ
                        </div>
                        {fs.asks.map((a, i) => (
                            <div key={a.en} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginTop: i ? '4px' : 0 }}>
                                <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, minWidth: '14px' }}>{i + 1}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '15.5px', fontWeight: 900, color: INK }}>{a.en}</span>
                                <span style={{ fontSize: '10.5px', color: FAINT }}>{a.ja}</span>
                            </div>
                        ))}
                    </div>

                    {/* 表現 — 実際の文 → 骨組み → 英検用 */}
                    <div style={{ marginTop: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, letterSpacing: '1px' }}>EXPRESSIONS</span>
                            <span style={{ fontSize: '10.5px', color: FAINT, lineHeight: 1.6 }}>
                                灰色 = 字幕のまま / FRAME = その骨組み(___ だけ入れ替える)/ 黒 = 骨組みにお題を入れた1文
                            </span>
                            <span style={{ marginLeft: 'auto' }}>{addAllBtn(exprItems, `${eng.en} の表現`, '+ TRAIN ALL')}</span>
                        </div>
                        {exprs.map((p, idx) => (
                            <div key={p.en} style={{ padding: '10px 0', borderTop: `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: DEEPGOLD, background: '#FEF3C7', borderRadius: '4px', padding: '1px 8px' }}>{p.en}</span>
                                    <span style={{ fontSize: '10.5px', color: SUB }}>{p.ja}</span>
                                    <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <span title={`JRE ${EXPR_CORPUS.jre}本のうち、この表現が出た本数`} style={{ fontSize: '9px', fontWeight: 900, color: p.jre ? DEEPGOLD : FAINT, border: `1px solid ${p.jre ? `${GOLD}66` : LINE}`, borderRadius: '3px', padding: '1px 5px' }}>JRE {p.jre}</span>
                                        <span title={`DEBATE ${EXPR_CORPUS.debate}本のうち、この表現が出た本数`} style={{ fontSize: '9px', fontWeight: 900, color: p.debate ? VIOLET : FAINT, border: `1px solid ${p.debate ? `${VIOLET}55` : LINE}`, borderRadius: '3px', padding: '1px 5px' }}>DEBATE {p.debate}</span>
                                    </span>
                                </div>
                                <div style={{ fontSize: '12px', color: FAINT, fontStyle: 'italic', lineHeight: 1.6, marginTop: '5px' }}>
                                    <span style={{ fontSize: '8.5px', fontWeight: 900, fontStyle: 'normal', color: FAINT, letterSpacing: '0.5px', marginRight: '6px' }}>{p.exSrc}</span>
                                    {p.ex}
                                </div>
                                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.6, marginTop: '2px' }}>
                                    <span style={{ fontSize: '8.5px', fontWeight: 900, color: SUB, letterSpacing: '0.5px', marginRight: '6px' }}>FRAME</span>
                                    {p.frame.split('___').map((seg, k, arr) => (
                                        <span key={k}>{seg}{k < arr.length - 1 && <span style={{ display: 'inline-block', minWidth: '30px', borderBottom: `2px solid ${eng.color}`, margin: '0 2px' }}>&nbsp;</span>}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '3px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '15px' : '16px', color: INK, lineHeight: 1.65 }}>{p.plug}</div>
                                        <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.6 }}>{p.plugJa}</div>
                                    </div>
                                    <span style={{ display: 'flex', gap: '5px', paddingTop: '3px' }}>
                                        {addBtn(p.plug, exprItems[idx].ja)}
                                        {playBtn(p.plug)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2分の見本 */}
                    <div style={{ marginTop: '14px', background: exam ? '#FAF8FF' : '#F7FDF9', border: `1px solid ${exam ? `${VIOLET}33` : `${DEEPGREEN}33`}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: exam ? VIOLET : DEEPGREEN, letterSpacing: '1px' }}>TWO-MINUTE TALK</span>
                            {regToggle}
                            <span style={{ fontSize: '10.5px', color: SUB }}>{exam ? '中身は CASUAL と同じ。言い方だけ1段上げた版' : '部品と型だけで組んだ見本'}。番号は「2分の組み立て」の手順</span>
                            <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                <button
                                    onClick={() => setHideTalk((h) => !h)}
                                    style={{
                                        cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                                        borderRadius: '999px', padding: '4px 11px',
                                        border: `1px solid ${hideTalk ? DEEPGREEN : LINE}`,
                                        background: hideTalk ? DEEPGREEN : '#fff', color: hideTalk ? '#fff' : SUB,
                                    }}
                                >{hideTalk ? 'SHOW' : 'HIDE'}</button>
                                {playBtn(talkText, 'PLAY ALL')}
                            </span>
                        </div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK, marginTop: '8px' }}>{fs.talk.topic}</div>
                        <div style={{ fontSize: '11px', color: FAINT, marginBottom: '4px' }}>{fs.talk.topicJa}(お題は自作)</div>
                        {lines.map((l, i) => {
                            const st = TALK_STEPS.find((s) => s.n === l.step);
                            return (
                                <div key={i} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', padding: '7px 0', borderTop: `1px solid ${exam ? `${VIOLET}1F` : `${DEEPGREEN}1F`}` }}>
                                    <span title={st?.ja} style={{
                                        flexShrink: 0, minWidth: '20px', textAlign: 'center', fontSize: '9px', fontWeight: 900, color: '#fff',
                                        background: exam ? VIOLET : DEEPGREEN, borderRadius: '4px', padding: '2px 5px', marginTop: '4px',
                                    }}>{l.step}</span>
                                    <div style={{ flex: 1 }}>
                                        {hideTalk ? (
                                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, paddingTop: '2px' }}>{st?.en} — {st?.ja}</div>
                                        ) : (
                                            <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '14.5px' : '15.5px', color: INK, lineHeight: 1.75 }}>{l.en}</div>
                                        )}
                                    </div>
                                    {!hideTalk && <span style={{ display: 'flex', gap: '5px', paddingTop: '3px' }}>{exam && addBtn(l.en, `${fs.talk.topicJa} — EXAM版の2分、手順${l.step}(${st?.ja})`)}{playBtn(l.en)}</span>}
                                </div>
                            );
                        })}
                        <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '6px', lineHeight: 1.7 }}>
                            HIDE で手順の名前だけにして、部品を見ずに2分言う。{words}語{exam ? '(英検の2分に収まる量)' : ''}。
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <EikenOutputNav active="speak" />

            {/* ============ 貼り付く10語のバー ============ */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.96)',
                borderBottom: stuck ? `1px solid ${LINE}` : '1px solid transparent',
                maxHeight: stuck ? '52px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s',
            }}>
                <div style={{
                    maxWidth: '760px', margin: '0 auto', padding: '9px 16px',
                    display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                }}>
                    {CHANT.map((cid, i) => {
                        const eng = ENGINE_BY_ID[cid];
                        return (
                            <span key={cid} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {i === 5 && <span style={{ color: LINE, fontSize: '12px', margin: '0 5px' }}>|</span>}
                                <button onClick={() => openFinger(cid)} style={{
                                    cursor: 'pointer', font: 'inherit', fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 900,
                                    color: eng.color, background: openEngine === cid ? `${eng.color}1A` : 'none',
                                    border: 'none', borderRadius: '4px', padding: '2px 5px',
                                }}>{eng.en}</button>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* ============ HERO ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>SPEAK PASS / SAY IT LIKE A NATIVE</div>
                <h1 style={{
                    margin: '8px 0 8px', fontFamily: 'Georgia, serif', fontSize: isMobile ? '30px' : '42px',
                    fontWeight: 900, color: INK, lineHeight: 1.12,
                }}>
                    Same ten fingers.<br />Different mouth.
                </h1>
                <p style={{ margin: 0, fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8, color: SUB }}>
                    Writing scores with fancy frames. Speaking doesn&apos;t. We counted {SPEAK_CORPUS.hours} hours of {SPEAK_CORPUS.show} —
                    {' '}{SPEAK_CORPUS.episodes} episodes, about {(SPEAK_CORPUS.words / 1_000_000).toFixed(1)} million words. The fancy stuff almost never shows up.
                    What shows up is And, So, I think, and the same simple shape said three times.
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '12px', lineHeight: 1.8, color: FAINT }}>
                    作文は凝った枠で点を取る。口は逆。ネイティブ最高レベルの口語を数えたら、凝った言い回しはほぼ出てこなかった。指は作文と同じ10本。中身は全部、口のための部品に入れ替えてある。
                    表現は全部、JRE とディベートの両方で数えた本数つき。2分の見本は段が2つ — <b style={{ color: VIOLET }}>EXAM</b> は人前の正式な議論({DEBATE_CORPUS.videos}本)から、<b style={{ color: DEEPGOLD }}>CASUAL</b> は JRE から。骨組みは CASUAL で覚えて、本番は EXAM の語で言う。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '7px', marginTop: '14px' }}>
                    {[
                        [`${SPEAK_CORPUS.episodes}+${DEBATE_CORPUS.videos}`, 'videos counted', `JRE ${SPEAK_CORPUS.hours}時間 + 正式な議論 ${DEBATE_CORPUS.videos}本`],
                        ['10', 'fingers', '作文と同じ10本。部品だけ口用'],
                        [String(Object.values(FINGER_EXPR).reduce((n, f) => n + f.length, 0) + EXAM_FRAMES.length), 'expressions', '単語は入れない。全部、実際の字幕で出た言い回し'],
                        ['7', 'steps in two minutes', `2分の独白 ${SPEAK_CORPUS.monologues.toLocaleString()}本の組み立て`],
                    ].map(([num, en, ja]) => (
                        <div key={en} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 11px', background: CREAM }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 900, color: INK, lineHeight: 1 }}>{num}</div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: INK, marginTop: '3px' }}>{en}</div>
                            <div style={{ fontSize: '10px', color: FAINT, lineHeight: 1.5 }}>{ja}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ 1 HANDS ============ */}
            <div ref={handsRef} style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 0' }}>
                <div style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '22px' : '30px',
                    alignItems: isMobile ? 'stretch' : 'flex-end', justifyContent: 'center',
                }}>
                    {HANDS.map((h) => (
                        <div key={h.id} style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                textAlign: 'center', marginBottom: '9px', fontFamily: 'Georgia, serif', fontSize: '14px',
                                fontWeight: 900, letterSpacing: '1px', color: h.id === 'left' ? DEEPGOLD : VIOLET,
                            }}>{h.sub}</div>
                            <div style={{ display: 'flex', gap: isMobile ? '5px' : '6px', alignItems: 'flex-end' }}>
                                {(h.id === 'left' ? LEFT_ORDER : RIGHT_ORDER).map((f) => renderFinger(h.id, f))}
                            </div>
                            <div style={{
                                marginTop: '9px', textAlign: 'center', padding: '6px 8px', borderRadius: '8px', fontSize: '10px', color: SUB,
                                background: h.id === 'left' ? '#FEF9E7' : '#F5F3FF',
                                border: `1px solid ${h.id === 'left' ? `${GOLD}55` : `${VIOLET}55`}`,
                            }}>{h.en} ・ {h.ja}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: FAINT, lineHeight: 1.7 }}>
                        Tap a finger for its spoken parts and a two-minute talk. 指を押すと、その指の口語の部品と2分の見本が開く。
                    </span>
                </div>
            </div>

            {/* ============ 2 ONE FINGER ============ */}
            <div ref={detailRef} style={{ scrollMarginTop: '60px' }}>
                {openEngine && renderDetail(openEngine)}
            </div>

            {/* ============ 3 THE MOVES ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('The moves', '議論の型 — どの指にも使える。数字は JRE 130本で数えた値', 'THE MOVES')}
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {MOVES.map((m, i) => (
                        <div key={m.id} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, borderRadius: '4px', padding: '1px 7px' }}>{m.key}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK }}>{m.en}</span>
                                <span style={{ fontSize: '11px', color: SUB }}>{m.ja}</span>
                                <span style={{ marginLeft: 'auto', fontSize: '9.5px', color: FAINT }}>{m.stat}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.75, marginTop: '4px' }}>{m.how}</div>
                            <div style={{ marginTop: '4px' }}>
                                {m.ex.map((e) => (
                                    <div key={e} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '3px 0' }}>
                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px', paddingTop: '5px' }}>JRE</span>
                                        <span style={{ flex: 1, fontFamily: 'Georgia, serif', fontSize: '14.5px', color: INK, lineHeight: 1.65 }}>{e}</span>
                                        <span style={{ paddingTop: '2px' }}>{playBtn(e)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ 3b EXAM FRAMES ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('One step up — the debate frames', `議論の枠(EXAM 版)— Oxford Union のスピーチ ${DEBATE_CORPUS.oxford}本 + Open to Debate の討論 ${DEBATE_CORPUS.openToDebate}本で数えた。紫の倍率 = くだけた会話(JRE)の何倍出るか`, 'EXAM FRAMES')}
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    上の型(同じ形を3回積む / Xじゃない、Yだ)はそのまま使う。変えるのは入口と出口の枠だけ。I think を I would argue that に、So を Ultimately に替えると、同じ中身が面接の音になる。
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '0 16px' }}>
                    {renderRows(
                        EXAM_FRAMES.map((p) => ({ en: p.en, ja: p.ja, count: p.videos, total: DEBATE_CORPUS.videos, source: 'DEBATE', ratio: p.ratio, ex: p.ex, plug: p.plug, plugJa: p.plugJa })),
                        VIOLET,
                        (r) => `${r.plugJa}(議論の枠: ${r.en} = ${r.ja} / DEBATE ${r.total}本中${r.count}本 / JREの${r.ratio}倍)`,
                    )}
                </div>
            </div>

            {/* ============ 4 TWO MINUTES ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('Two minutes, seven steps', `2分の組み立て — 1人が途切れずに250〜450語しゃべった ${SPEAK_CORPUS.monologues.toLocaleString()}本を通読して見えた順番`, 'TWO MINUTES')}
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    英検が求める「主張 → 理由 → 結論」と骨は同じ。違うのは理由の並べ方で、ネイティブは First, Second で並べず、同じ形の連打で並べる。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                    {TALK_STEPS.map((s) => (
                        <div key={s.n} style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${DEEPGREEN}`, borderRadius: '8px', padding: '9px 11px', background: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGREEN, borderRadius: '4px', padding: '1px 6px' }}>{s.n}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', fontWeight: 900, color: INK }}>{s.en}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: SUB, marginTop: '3px' }}>{s.ja}</div>
                            <div style={{ fontSize: '12px', color: FAINT, fontStyle: 'italic', lineHeight: 1.6, marginTop: '4px' }}>{s.ex}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ 5 RHYTHM ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('Rhythm', 'リズム — 短く受けて、長く走る', 'THE NUMBERS')}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '8px' }}>
                    {RHYTHM.map((r) => (
                        <div key={r.label} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px', background: CREAM }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px' }}>{r.label}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK, marginLeft: 'auto' }}>{r.value}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.65, marginTop: '3px' }}>{r.note}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '12px', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px', background: '#fff' }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>
                        ALONE vs IN A CONVERSATION ・ 1人で2分話すとき、増えるもの・消えるもの(1000語あたり)
                    </div>
                    {MONO_SHIFT.map((m) => {
                        const ratio = m.mono / m.all;
                        const up = ratio >= 1;
                        return (
                            <div key={m.form} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '3px 0' }}>
                                <span style={{ flex: 1, fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK }}>{m.form}</span>
                                <span style={{ fontSize: '10px', color: FAINT, minWidth: '110px', textAlign: 'right' }}>{m.mono} / {m.all}</span>
                                <span style={{ fontSize: '10.5px', fontWeight: 900, minWidth: '48px', textAlign: 'right', color: up ? DEEPGREEN : '#DC2626' }}>x{ratio.toFixed(2)}</span>
                            </div>
                        );
                    })}
                    <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '6px', lineHeight: 1.7 }}>
                        1人で話すときは、相手への反応の語(That&apos;s crazy / right? / I mean)が消えて、And でつなぐ量が増える。
                    </div>
                </div>
            </div>

            {/* ============ SOURCE ・ 前の版 ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 40px' }}>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px', background: CREAM, fontSize: '11.5px', color: SUB, lineHeight: 1.85 }}>
                    <b style={{ color: INK }}>材料</b> — {SPEAK_CORPUS.show} 本編 {SPEAK_CORPUS.range} のうち、ゲスト1人・90分以上の {SPEAK_CORPUS.episodes} 本。YouTube の自動字幕を {SPEAK_CORPUS.fetched} に取得して数えた。話者は分けていない(Rogan は全回にいる唯一の人なので、多くの回に出る形は彼の癖か、ネイティブ共通の骨組み)。JRE の行は短い引用だけで、言いよどみの重複は1つに畳んである。英検でそのまま言う1文と2分の見本は自作。
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <Link href="/english/speak/stories" style={{ textDecoration: 'none', fontSize: '11px', fontWeight: 900, color: DEEPGOLD, border: `1px solid ${GOLD}66`, background: '#fff', borderRadius: '999px', padding: '5px 12px' }}>
                            前の版 — 実話バンク・お題13本・模擬試験
                        </Link>
                        <Link href="/english/write/core5" style={{ textDecoration: 'none', fontSize: '11px', fontWeight: 900, color: SUB, border: `1px solid ${LINE}`, background: '#fff', borderRadius: '999px', padding: '5px 12px' }}>
                            作文の10本指(CORE 5)
                        </Link>
                    </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                    <EikenOutputDisclaimer />
                </div>
            </div>

            {bulk && (
                <div style={{
                    position: 'fixed', bottom: '18px', left: '50%', transform: 'translateX(-50%)', zIndex: 60,
                    background: INK, color: '#fff', borderRadius: '999px', padding: '8px 16px', fontSize: '11px', fontWeight: 800,
                }}>{bulk.label} — {bulk.done}/{bulk.total}</div>
            )}
        </div>
    );
}
