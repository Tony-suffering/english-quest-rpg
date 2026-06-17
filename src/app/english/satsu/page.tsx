'use client';
// 英語サツ案件 — お前の英語に前科をつけるAI刑事。
// 実ミス記録(my-mistakes.ts)を起訴し、永久指名手配にする。
// 令状を消すには、壊れた一文の中から「本ボシ(誤り)」を1タップで指摘する。

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MISTAKES, PATTERN_LABELS, type Mistake } from '@/data/english/my-mistakes';
import { CHARGES, CASES } from '@/data/english/satsu-charges';

const GOLD = '#D4AF37', GREEN = '#10B981', INK = '#1C1917', SUB = '#78716C';
const LINE = '#E7E5E4', STAMP = '#B91C1C', PAPER = '#FBF7EF', CREAM = '#FCFAF5';

const byId = new Map(MISTAKES.map((m) => [m.id, m]));

function stars(n: number): string {
    const filled = Math.min(5, Math.max(1, n));
    return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

export default function SatsuPage() {
    const [caseIdx, setCaseIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [resolved, setResolved] = useState(false);
    const [cleared, setCleared] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);

    // 余罪集計（多い順）— /english/mistakes と同じ Map 集計
    const wanted = useMemo(() => {
        const m = new Map<string, number>();
        for (const x of MISTAKES) m.set(x.patternKey, (m.get(x.patternKey) || 0) + 1);
        return [...m.entries()].sort((a, b) => b[1] - a[1]);
    }, []);

    // 今日の案件（日付シードで全員同じ事件）
    useEffect(() => {
        const day = Math.floor(Date.now() / 86400000);
        setCaseIdx(day % CASES.length);
        try {
            const c = JSON.parse(localStorage.getItem('tl_satsu_cleared') || '[]');
            if (Array.isArray(c)) setCleared(c);
            setStreak(Number(localStorage.getItem('tl_satsu_streak') || '0') || 0);
        } catch { /* noop */ }
    }, []);

    const theCase = CASES[caseIdx];
    const mistake = byId.get(theCase.id) as Mistake;
    const charge = CHARGES[mistake.patternKey] || CHARGES.other;
    const tokens = theCase.display.split(' ');
    const patternCount = wanted.find(([k]) => k === mistake.patternKey)?.[1] ?? 1;

    const tap = (token: string, i: number) => {
        if (resolved) return;
        setSelected(i);
        setResolved(true);
        const correct = token === theCase.guilty;
        if (correct) {
            setCleared((prev) => {
                const next = prev.includes(theCase.id) ? prev : [...prev, theCase.id];
                try { localStorage.setItem('tl_satsu_cleared', JSON.stringify(next)); } catch { /* noop */ }
                return next;
            });
            setStreak((s) => { const n = s + 1; try { localStorage.setItem('tl_satsu_streak', String(n)); } catch { /* noop */ } return n; });
        } else {
            setStreak(() => { try { localStorage.setItem('tl_satsu_streak', '0'); } catch { /* noop */ } return 0; });
        }
    };

    const nextCase = () => {
        setCaseIdx((i) => (i + 1) % CASES.length);
        setSelected(null);
        setResolved(false);
    };

    const correct = resolved && tokens[selected as number] === theCase.guilty;

    return (
        <div style={{ minHeight: '100vh', background: '#F2F0EC', padding: '24px 16px 90px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

                {/* ヘッダー */}
                <div style={{ marginBottom: 18 }}>
                    <Link href="/english/home" style={{ fontSize: 12, color: '#A8A29E', textDecoration: 'none' }}>← 英語ラボ</Link>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.22em', color: STAMP, margin: '12px 0 6px' }}>CASE FILE ・ 英語サツ案件</div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: INK, margin: '0 0 8px', letterSpacing: '-0.02em' }}>お前の英語には、前科がある。</h1>
                    <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.75, margin: 0 }}>
                        矯正して忘れる間違いノートじゃない。お前が実際に口から出した文を<strong style={{ color: INK }}>起訴して、永久指名手配にする</strong>。
                        令状を消したければ、壊れた一文から本ボシ（誤り）を1タップで挙げろ。再犯すれば余罪が増える。
                    </p>
                    <div style={{ fontSize: 12, color: SUB, marginTop: 10, fontWeight: 700 }}>
                        記録 {MISTAKES.length} 件 ・ 連続検挙 {streak} ・ 令状解除 {cleared.length}/{CASES.length}
                    </div>
                </div>

                {/* 今日の案件 — 取り調べ */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '20px 20px 22px', marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: STAMP }}>本日の取り調べ</div>
                        <div style={{ fontSize: 11, color: '#A8A29E', fontFamily: 'monospace' }}>{mistake.date}</div>
                    </div>
                    <div style={{ fontSize: 13, color: SUB, marginBottom: 14 }}>この中に本ボシが1人いる。誤ってる単語をタップしろ。</div>

                    {/* 単語タイル */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
                        {tokens.map((tok, i) => {
                            const isGuilty = tok === theCase.guilty;
                            let bg = CREAM, bd = LINE, col = INK;
                            if (resolved) {
                                if (isGuilty) { bg = '#FEF2F2'; bd = STAMP; col = '#7F1D1D'; }
                                else if (i === selected) { bg = '#F5F5F4'; bd = '#A8A29E'; col = '#A8A29E'; }
                                else { col = '#A8A29E'; }
                            }
                            return (
                                <button
                                    key={i}
                                    onClick={() => tap(tok, i)}
                                    disabled={resolved}
                                    style={{
                                        fontSize: 17, fontWeight: 600, color: col, background: bg,
                                        border: `1.5px solid ${bd}`, borderRadius: 10, padding: '8px 12px',
                                        cursor: resolved ? 'default' : 'pointer', fontFamily: 'inherit',
                                        textDecorationLine: resolved && isGuilty ? 'line-through' : 'none',
                                        textDecorationColor: '#FCA5A5',
                                    }}
                                >
                                    {tok}
                                </button>
                            );
                        })}
                    </div>

                    {/* 判決 */}
                    {resolved && (
                        <div style={{ marginTop: 16 }}>
                            <div style={{
                                display: 'inline-block', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em',
                                color: correct ? '#065F46' : '#7F1D1D', background: correct ? '#ECFDF5' : '#FEF2F2',
                                borderRadius: 999, padding: '4px 12px', marginBottom: 10,
                            }}>
                                {correct ? '令状を1つ解除' : '誤認逮捕 ・ 余罪 +1'}
                            </div>
                            <div style={{ fontSize: 14.5, color: INK, lineHeight: 1.7, marginBottom: 12 }}>
                                {correct ? charge.verdictAcquit : charge.verdictMiss}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                                <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '8px 11px' }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: STAMP, marginBottom: 2 }}>供述（言った）</div>
                                    <div style={{ fontSize: 13.5, color: '#7F1D1D', lineHeight: 1.5 }}>{theCase.display}</div>
                                </div>
                                <div style={{ background: '#ECFDF5', borderRadius: 8, padding: '8px 11px' }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: GREEN, marginBottom: 2 }}>正しい供述</div>
                                    <div style={{ fontSize: 13.5, color: '#065F46', lineHeight: 1.5, fontWeight: 600 }}>{mistake.fix}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 12.5, color: SUB, lineHeight: 1.65, marginBottom: 12 }}>{mistake.pattern}</div>
                            <div style={{ fontSize: 11.5, color: '#A8A29E', fontStyle: 'italic', marginBottom: 14 }}>
                                出典: 実際に俺の口から出た文（{mistake.date}{mistake.context ? ` ・ ${mistake.context}` : ''}）。恥は証拠です。消せません。
                            </div>
                            <button onClick={nextCase} style={{
                                fontSize: 13, fontWeight: 800, color: '#fff', background: INK, border: 'none',
                                borderRadius: 10, padding: '9px 18px', cursor: 'pointer',
                            }}>
                                次の案件 →
                            </button>
                        </div>
                    )}
                </div>

                {/* 指名手配カード（スクショ用） */}
                <div style={{ fontSize: 12, fontWeight: 800, color: SUB, marginBottom: 8 }}>指名手配カード（スクショして晒せ）</div>
                <div style={{
                    background: PAPER, border: `2px solid ${INK}`, borderRadius: 6, padding: '20px 22px',
                    marginBottom: 22, position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: 14, right: -34, transform: 'rotate(12deg)',
                        background: STAMP, color: '#fff', fontSize: 12, fontWeight: 900, letterSpacing: '0.3em',
                        padding: '4px 40px',
                    }}>
                        指名手配
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: SUB }}>WANTED ・ 容疑者ファイル</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: INK, margin: '8px 0 4px', lineHeight: 1.3 }}>{charge.chargeName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0 12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: STAMP }}>余罪 {patternCount} 件</span>
                        <span style={{ fontSize: 16, color: GOLD, letterSpacing: 2 }}>{stars(patternCount)}</span>
                        <span style={{ fontSize: 11, color: '#A8A29E', fontFamily: 'monospace' }}>容疑者: お前</span>
                    </div>
                    <div style={{ fontSize: 13, color: INK, lineHeight: 1.7, borderTop: `1px dashed ${INK}`, paddingTop: 10 }}>
                        <span style={{ fontWeight: 800 }}>手口:</span> {charge.modus}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
                        <span style={{ fontSize: 10, color: '#A8A29E' }}>恥は証拠です。消せません。</span>
                        <span style={{ fontSize: 11, fontWeight: 900, color: GOLD, letterSpacing: '0.1em' }}>toniolab</span>
                    </div>
                </div>

                {/* 指名手配ボード — 余罪ランキング */}
                <div style={{ fontSize: 12, fontWeight: 800, color: SUB, marginBottom: 8 }}>指名手配ボード（余罪の多い順）</div>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden' }}>
                    {wanted.map(([key, n], i) => {
                        const c = CHARGES[key] || CHARGES.other;
                        return (
                            <div key={key} style={{ padding: '13px 16px', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 13, fontWeight: 900, color: '#D6D3D1', width: 22, textAlign: 'center' }}>{i + 1}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: INK }}>{c.chargeName}</div>
                                    <div style={{ fontSize: 11.5, color: SUB, marginTop: 2 }}>{PATTERN_LABELS[key] || key}</div>
                                </div>
                                <span style={{ fontSize: 13, color: GOLD, letterSpacing: 1 }}>{stars(n)}</span>
                                <span style={{ fontSize: 12, fontWeight: 800, color: n >= 2 ? STAMP : '#A8A29E', whiteSpace: 'nowrap' }}>余罪 {n}</span>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 14, padding: '10px 14px', background: '#fff', border: `1px dashed ${LINE}`, borderRadius: 10, fontSize: 11, color: '#A8A29E', lineHeight: 1.7 }}>
                    案件は俺の実際のミス記録から生成。会話で新しいミスが出れば、新しい容疑者として立件される。星はお前が何回やったかで決まる。減らしたければ、二度と言うな。
                </div>
            </div>
        </div>
    );
}
