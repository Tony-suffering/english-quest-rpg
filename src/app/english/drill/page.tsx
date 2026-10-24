'use client';

/**
 * 金具ドリル — 冠詞の反射だけを作る。
 *
 * 50夜の検死で1,726文を直した。それでも冠詞は 49/50 夜(98%)で落ち続けている。
 * 検死は「読む」活動で、冠詞は「出力の反射」なので、読んでも反射にならない。
 * だからここは解説を出さない。1問3秒で、判断だけを何度も踏ませる。
 *
 * 出題は全部、本人が実際に言おうとした文(lesson-reviews の fix)。他人の例文は使わない。
 * 間違えた問題は同じセットの最後にもう一度出る。正解するまで抜けない。
 */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { FASTENER_DRILLS, FASTENER_TOTAL, type FastenerDrill } from '@/data/english/fastener-drills';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const RED = '#DC2626';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const CREAM = '#FAF8F2';

const SET_SIZE = 10;
const LOG_KEY = 'fastener-drill-log';

type Answer = 'a' | 'an' | 'the' | 'none';
const CHOICES: Answer[] = ['a', 'an', 'the', 'none'];
const LABEL: Record<Answer, string> = { a: 'a', an: 'an', the: 'the', none: 'なし' };

interface DayLog { date: string; done: number; wrong: number }

function loadLog(): DayLog[] {
    try {
        const s = localStorage.getItem(LOG_KEY);
        return s ? (JSON.parse(s) as DayLog[]) : [];
    } catch { return []; }
}
function saveLog(l: DayLog[]) {
    try { localStorage.setItem(LOG_KEY, JSON.stringify(l.slice(-60))); } catch { /* noop */ }
}
function today(): string {
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

/**
 * ____ を空欄として描く。答え合わせ後は「正解」を差し込む。
 * 正解は当たり外れに関わらず常に緑。赤はボタン側だけに出す。
 * 穴に赤で正解が入ると、それが誤答に見えて逆に覚えてしまう。
 */
function QuestionText({ q, filled }: { q: string; filled: string | null }) {
    const parts = q.split('____');
    return (
        <>
            {parts[0]}
            <span style={{
                display: 'inline-block', minWidth: '58px', textAlign: 'center',
                borderBottom: `3px solid ${filled ? GREEN : GOLD}`,
                color: filled ? GREEN : 'transparent',
                fontWeight: 900, padding: '0 6px',
            }}>{filled ?? '__'}</span>
            {parts[1] ?? ''}
        </>
    );
}

/** その日の10問を、日付から決まる順で選ぶ。毎日ずれるが、同じ日は同じ問題 */
function pickSet(all: FastenerDrill[], seed: number, size: number): FastenerDrill[] {
    const n = all.length;
    const step = 137; // n と互いに素になりやすい大きめの素数
    const out: FastenerDrill[] = [];
    for (let i = 0; i < size; i++) out.push(all[(seed * size + i * step) % n]);
    return out;
}

export default function FastenerDrillPage() {
    const [seed, setSeed] = useState(0);
    const [queue, setQueue] = useState<FastenerDrill[]>([]);
    const [idx, setIdx] = useState(0);
    const [picked, setPicked] = useState<Answer | null>(null);
    const [wrong, setWrong] = useState(0);
    const [done, setDone] = useState(0);
    const [finished, setFinished] = useState(false);
    const [log, setLog] = useState<DayLog[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLog(loadLog());
        const c = () => setIsMobile(window.innerWidth < 700);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const start = useCallback((s: number) => {
        setQueue(pickSet(FASTENER_DRILLS, s, SET_SIZE));
        setIdx(0); setPicked(null); setWrong(0); setDone(0); setFinished(false);
    }, []);

    useEffect(() => { start(0); }, [start]);

    const cur = queue[idx];
    const ok = picked !== null && cur && picked === cur.answer;

    const answer = useCallback((a: Answer) => {
        if (picked !== null || !cur) return;
        setPicked(a);
        if (a !== cur.answer) {
            setWrong((w) => w + 1);
            // 間違えた問題は末尾にもう一度積む。正解するまで抜けない
            setQueue((qq) => [...qq, cur]);
        }
    }, [picked, cur]);

    const next = useCallback(() => {
        setPicked(null);
        setDone((d) => d + 1);
        if (idx + 1 >= queue.length) {
            setFinished(true);
            const t = today();
            setLog((prev) => {
                const rest = prev.filter((x) => x.date !== t);
                const mine = prev.find((x) => x.date === t);
                const merged: DayLog = {
                    date: t,
                    done: (mine?.done ?? 0) + done + 1,
                    wrong: (mine?.wrong ?? 0) + wrong,
                };
                const out = [...rest, merged].sort((a, b) => (a.date < b.date ? -1 : 1));
                saveLog(out);
                return out;
            });
        } else {
            setIdx((i) => i + 1);
        }
    }, [idx, queue.length, done, wrong]);

    // キーボード: 1234 で回答、Enter/Space で次へ
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (finished) return;
            if (picked === null) {
                const i = ['1', '2', '3', '4'].indexOf(e.key);
                if (i >= 0) { e.preventDefault(); answer(CHOICES[i]); }
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); next();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [picked, finished, answer, next]);

    const streak = useMemo(() => {
        let n = 0;
        const d = new Date();
        for (;;) {
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (log.some((x) => x.date === key && x.done > 0)) { n++; d.setDate(d.getDate() - 1); }
            else break;
        }
        return n;
    }, [log]);

    const totalDone = log.reduce((n, x) => n + x.done, 0);

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '26px 16px 60px' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>
                    FASTENERS / 金具ドリル
                </div>
                <h1 style={{
                    margin: '8px 0 8px', fontFamily: 'Georgia, serif',
                    fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: INK, lineHeight: 1.2,
                }}>
                    冠詞だけ、1問3秒
                </h1>
                <p style={{ margin: '0 0 4px', fontSize: '13px', lineHeight: 1.85, color: SUB }}>
                    50夜の検死で <b style={{ color: INK }}>1,726文</b> を直した。それでも冠詞は
                    <b style={{ color: INK }}> 49/50夜(98%)</b> で落ちている。読んで直る問題ではないので、ここでは解説をしない。
                    出題は全部、<b style={{ color: INK }}>あなたが実際に言おうとした文</b>。全 {FASTENER_TOTAL} 問。
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', margin: '10px 0 18px' }}>
                    <span style={{ fontSize: '11px', color: FAINT }}>
                        連続 <b style={{ color: streak > 0 ? GREEN : FAINT, fontSize: '14px' }}>{streak}</b> 日
                    </span>
                    <span style={{ fontSize: '11px', color: FAINT }}>
                        通算 <b style={{ color: INK, fontSize: '14px' }}>{totalDone}</b> 問
                    </span>
                    <Link href="/english/training/dmm" style={{ fontSize: '11px', color: DEEPGOLD, marginLeft: 'auto' }}>
                        DMM検死へ
                    </Link>
                </div>

                {!finished && cur && (
                    <div ref={boxRef}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px',
                        }}>
                            <div style={{ flex: 1, height: '5px', background: LINE, borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.round((idx / queue.length) * 100)}%`, height: '100%',
                                    background: GOLD, transition: 'width 0.2s',
                                }} />
                            </div>
                            <span style={{ fontSize: '11px', color: SUB, fontWeight: 800, whiteSpace: 'nowrap' }}>
                                {idx + 1} / {queue.length}
                            </span>
                            {wrong > 0 && (
                                <span style={{ fontSize: '11px', color: RED, fontWeight: 800 }}>×{wrong}</span>
                            )}
                        </div>

                        <div style={{
                            border: `2px solid ${picked === null ? LINE : ok ? GREEN : RED}`,
                            borderRadius: '14px', padding: isMobile ? '18px 15px' : '26px 24px',
                            background: picked === null ? '#fff' : ok ? '#F0FDF4' : '#FEF2F2',
                            minHeight: '150px', display: 'flex', alignItems: 'center',
                        }}>
                            <p style={{
                                margin: 0, fontFamily: 'Georgia, serif',
                                fontSize: isMobile ? '18px' : '22px', lineHeight: 1.75, color: INK,
                            }}>
                                <QuestionText q={cur.q} filled={picked === null ? null : LABEL[cur.answer]} />
                            </p>
                        </div>

                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '8px', marginTop: '12px',
                        }}>
                            {CHOICES.map((c, i) => {
                                const isAns = picked !== null && c === cur.answer;
                                const isBad = picked === c && c !== cur.answer;
                                return (
                                    <button
                                        key={c}
                                        onClick={() => answer(c)}
                                        disabled={picked !== null}
                                        style={{
                                            cursor: picked === null ? 'pointer' : 'default', font: 'inherit',
                                            fontFamily: 'Georgia, serif',
                                            fontSize: isMobile ? '17px' : '20px', fontWeight: 900,
                                            padding: isMobile ? '14px 0' : '17px 0',
                                            borderRadius: '11px',
                                            border: `2px solid ${isAns ? GREEN : isBad ? RED : LINE}`,
                                            background: isAns ? '#DCFCE7' : isBad ? '#FEE2E2' : '#fff',
                                            color: isAns ? '#15803D' : isBad ? RED : INK,
                                        }}
                                    >
                                        {LABEL[c]}
                                        <span style={{ display: 'block', fontSize: '9px', color: FAINT, fontWeight: 700, marginTop: '2px' }}>
                                            {i + 1}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {picked !== null && (
                            <div style={{
                                marginTop: '12px', border: `1px solid ${LINE}`, borderRadius: '11px',
                                padding: '13px 15px', background: CREAM,
                            }}>
                                <div style={{ display: 'flex', gap: '9px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{
                                        fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                                        color: ok ? '#15803D' : RED,
                                    }}>{ok ? 'CORRECT' : 'あなたはこう言った'}</span>
                                    <span style={{ fontSize: '10px', color: FAINT, marginLeft: 'auto' }}>{cur.date}</span>
                                </div>
                                <p style={{
                                    margin: '7px 0 0', fontSize: '13px', lineHeight: 1.75, color: SUB,
                                    fontFamily: 'Georgia, serif',
                                }}>{cur.said}</p>
                                <p style={{
                                    margin: '7px 0 0', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.75,
                                    color: INK, fontFamily: 'Georgia, serif',
                                }}>{cur.full}</p>
                                <div style={{ display: 'flex', gap: '7px', marginTop: '10px', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => speak(cur.full)}
                                        style={{
                                            cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff',
                                            borderRadius: '7px', padding: '5px 11px', fontSize: '10px',
                                            fontWeight: 900, color: SUB, letterSpacing: '0.5px',
                                        }}
                                    >PLAY</button>
                                    <button
                                        onClick={next}
                                        style={{
                                            marginLeft: 'auto', cursor: 'pointer', font: 'inherit',
                                            border: `2px solid ${GOLD}`, background: '#FEF9E7', color: DEEPGOLD,
                                            borderRadius: '9px', padding: '7px 20px', fontSize: '12px', fontWeight: 900,
                                        }}
                                    >NEXT（Enter）</button>
                                </div>
                            </div>
                        )}

                        {picked === null && (
                            <p style={{ margin: '10px 0 0', fontSize: '10.5px', color: FAINT, textAlign: 'center' }}>
                                キーの 1 2 3 4 でも答えられる。考え込まない。3秒で押す。
                            </p>
                        )}
                    </div>
                )}

                {finished && (
                    <div style={{
                        border: `2px solid ${wrong === 0 ? GREEN : GOLD}`, borderRadius: '14px',
                        padding: '22px 20px', background: wrong === 0 ? '#F0FDF4' : '#FEF9E7', textAlign: 'center',
                    }}>
                        <div style={{
                            fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 900,
                            color: wrong === 0 ? '#15803D' : DEEPGOLD,
                        }}>
                            {wrong === 0 ? 'ALL CLEAR' : `${wrong} 回つまずいた`}
                        </div>
                        <p style={{ margin: '8px 0 16px', fontSize: '12.5px', color: SUB, lineHeight: 1.8 }}>
                            {wrong === 0
                                ? '10問ノーミス。今日はこれで終わり。明日また10問。'
                                : 'つまずいた問題は最後にもう一度出したので、いまは全部正解している。明日また10問。'}
                        </p>
                        <button
                            onClick={() => { const s = seed + 1; setSeed(s); start(s); }}
                            style={{
                                cursor: 'pointer', font: 'inherit', border: `2px solid ${GOLD}`,
                                background: '#fff', color: DEEPGOLD, borderRadius: '10px',
                                padding: '10px 24px', fontSize: '13px', fontWeight: 900,
                            }}
                        >もう10問</button>
                    </div>
                )}

                {log.length > 0 && (
                    <div style={{ marginTop: '26px' }}>
                        <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '8px' }}>
                            RECORD
                        </div>
                        <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                            {log.slice(-30).map((d) => {
                                const rate = d.done ? d.wrong / d.done : 0;
                                return (
                                    <div key={d.date} title={`${d.date} — ${d.done}問 / ×${d.wrong}`} style={{
                                        width: '20px', height: '20px', borderRadius: '4px',
                                        background: rate === 0 ? GREEN : rate < 0.2 ? '#86EFAC' : rate < 0.4 ? '#FDE68A' : '#FCA5A5',
                                    }} />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
