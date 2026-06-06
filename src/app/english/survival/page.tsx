'use client';

// 修羅場英会話 — Survival Conversation Simulator (v3)
// 分岐型インタラクティブ会話。実戦の高圧状況を「崩れた英語のまま」切り抜ける。

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { SURVIVAL_SCENARIOS, type SurvivalScenario, type SurvivalNode, type OptionTag } from '@/data/english/survival-scenarios';

const ACCENT = '#0EA5E9';
const ROSE = '#F472B6';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const GOOD = '#10B981';
const WARN = '#D97706';
const BAD = '#DC2626';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.96;
    window.speechSynthesis.speak(u);
}

const tagColor = (t: OptionTag) => t === 'good' ? GOOD : t === 'awkward' ? WARN : BAD;
const tagLabel = (t: OptionTag) => t === 'good' ? '自然' : t === 'awkward' ? '崩れてるが通じる' : '事故る';

function loadCleared(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try { return new Set<string>(JSON.parse(localStorage.getItem('survival-cleared') || '[]')); }
    catch { return new Set(); }
}

export default function SurvivalPage() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [cleared, setCleared] = useState<Set<string>>(loadCleared);

    const byDomain = useMemo(() => {
        const m = new Map<string, SurvivalScenario[]>();
        for (const s of SURVIVAL_SCENARIOS) {
            if (!m.has(s.domain)) m.set(s.domain, []);
            m.get(s.domain)!.push(s);
        }
        return [...m.entries()];
    }, []);

    const active = SURVIVAL_SCENARIOS.find(s => s.id === activeId) || null;

    const markCleared = useCallback((id: string) => {
        setCleared(prev => {
            const next = new Set(prev).add(id);
            try { localStorage.setItem('survival-cleared', JSON.stringify([...next])); } catch {}
            return next;
        });
    }, []);

    if (active) {
        return <Player scenario={active} onExit={() => setActiveId(null)} onClear={() => markCleared(active.id)} />;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '28px 16px 90px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1C1917 0%, #292524 60%, #0EA5E9 160%)',
                    borderRadius: 20, padding: '26px 24px', color: '#fff', marginBottom: 20,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', opacity: 0.85 }}>SURVIVAL ENGLISH ・ 修羅場英会話</div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>逃げられない会話を、生き残れ</h1>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, margin: 0, opacity: 0.95 }}>
                        空港で欠航。病院で激痛。クレーム対応。完璧な英語なんて出てこない。
                        それでも、崩れたまま、その場を切り抜けろ。選択肢を選ぶたび、相手が変わる。
                        恥をかいても、通じれば勝ち。
                    </p>
                    <div style={{ fontSize: 12, marginTop: 12, opacity: 0.85, fontWeight: 600 }}>
                        {SURVIVAL_SCENARIOS.length} シナリオ ・ クリア {cleared.size}
                    </div>
                </div>

                {byDomain.map(([domain, list]) => (
                    <div key={domain} style={{ marginBottom: 22 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: SUB, letterSpacing: '0.08em', marginBottom: 8 }}>{domain}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                            {list.map(s => {
                                const done = cleared.has(s.id);
                                return (
                                    <button key={s.id} onClick={() => setActiveId(s.id)} style={{
                                        textAlign: 'left', background: '#fff', border: `1px solid ${done ? '#A7F3D0' : LINE}`,
                                        borderLeft: `4px solid ${done ? GOOD : ACCENT}`, borderRadius: 14, padding: '14px 16px', cursor: 'pointer',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: SUB }}>難易度 {'★'.repeat(s.difficulty)}</span>
                                            {done && <span style={{ fontSize: 10, fontWeight: 800, color: GOOD }}>CLEAR</span>}
                                        </div>
                                        <div style={{ fontSize: 14.5, fontWeight: 800, color: INK, lineHeight: 1.35 }}>{s.title}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Player({ scenario, onExit, onClear }: { scenario: SurvivalScenario; onExit: () => void; onClear: () => void }) {
    const nodeMap = useMemo(() => {
        const m = new Map<string, SurvivalNode>();
        for (const n of scenario.nodes) m.set(n.id, n);
        return m;
    }, [scenario]);

    const [nodeId, setNodeId] = useState(scenario.start);
    const [history, setHistory] = useState<string[]>([]);
    const node = nodeMap.get(nodeId);

    const isTerminal = !!node && (!node.options || node.options.length === 0);

    useEffect(() => {
        if (isTerminal && node?.outcome === 'survived') onClear();
    }, [isTerminal, node?.outcome, onClear]);

    const choose = (next: string) => { setHistory(h => [...h, nodeId]); setNodeId(next); };
    const restart = () => { setHistory([]); setNodeId(scenario.start); };

    if (!node) return null;

    const outcomeColor = node.outcome === 'survived' ? GOOD : node.outcome === 'awkward' ? WARN : BAD;
    const outcomeLabel = node.outcome === 'survived' ? '生き残った' : node.outcome === 'awkward' ? '何とか切り抜けた' : '事故った';

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '20px 16px 90px' }}>
            <div style={{ maxWidth: 620, margin: '0 auto' }}>
                {/* top bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <button onClick={onExit} style={linkBtn}>← 一覧</button>
                    <span style={{ fontSize: 12, fontWeight: 800, color: SUB }}>{scenario.domain} ・ 難易度 {'★'.repeat(scenario.difficulty)}</span>
                </div>
                <div style={{ fontSize: 13, color: SUB, lineHeight: 1.7, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
                    {scenario.premise}
                </div>

                {/* current node line */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '18px 20px', marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: ACCENT, marginBottom: 6 }}>{node.speaker}</div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: INK, lineHeight: 1.5 }}>&ldquo;{node.line_en}&rdquo;</div>
                        <button onClick={() => speak(node.line_en)} style={playBtn}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill={ACCENT}><path d="M8 5v14l11-7z" /></svg>
                        </button>
                    </div>
                    <div style={{ fontSize: 13, color: SUB, marginTop: 6, lineHeight: 1.6 }}>{node.line_ja}</div>
                    {node.tonio && (
                        <div style={{ fontSize: 12.5, color: '#44403C', marginTop: 10, padding: '9px 12px', background: '#FDF2F8', borderRadius: 9, borderLeft: `3px solid ${ROSE}`, lineHeight: 1.7 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: ROSE, marginRight: 6 }}>とにお</span>{node.tonio}
                        </div>
                    )}
                </div>

                {/* options or outcome */}
                {!isTerminal && node.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: SUB, marginBottom: 2 }}>どう返す？</div>
                        {node.options.map((o, i) => (
                            <button key={i} onClick={() => choose(o.next)} style={{
                                textAlign: 'left', background: '#fff', border: `1px solid ${LINE}`, borderLeft: `4px solid ${tagColor(o.tag)}`,
                                borderRadius: 12, padding: '13px 15px', cursor: 'pointer',
                            }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.45 }}>&ldquo;{o.text_en}&rdquo;</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: tagColor(o.tag), background: `${tagColor(o.tag)}18`, borderRadius: 999, padding: '2px 8px' }}>{tagLabel(o.tag)}</span>
                                    <span style={{ fontSize: 12, color: SUB }}>{o.reply_ja}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {isTerminal && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '22px 20px' }}>
                        <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 900, color: '#fff', background: outcomeColor, borderRadius: 999, padding: '4px 14px' }}>{outcomeLabel}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: SUB, margin: '18px 0 8px', letterSpacing: '0.06em' }}>生存表現</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {scenario.keyExpressions.map((k, i) => (
                                <div key={i} style={{ background: '#F0F9FF', borderRadius: 10, borderLeft: `3px solid ${ACCENT}`, padding: '11px 14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                                        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>&ldquo;{k.en}&rdquo;</div>
                                        <button onClick={() => speak(k.en)} style={playBtn}><svg width="12" height="12" viewBox="0 0 24 24" fill={ACCENT}><path d="M8 5v14l11-7z" /></svg></button>
                                    </div>
                                    <div style={{ fontSize: 12, color: SUB, marginTop: 2 }}>{k.ja}</div>
                                    <div style={{ fontSize: 12, color: '#57534E', marginTop: 5, lineHeight: 1.7 }}>{k.note}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                            <button onClick={restart} style={{ ...gradeBtn, background: '#fff', color: SUB, border: `1px solid ${LINE}` }}>もう一回</button>
                            <button onClick={onExit} style={{ ...gradeBtn, background: ACCENT, color: '#fff', border: 'none' }}>次のシナリオへ</button>
                        </div>
                    </div>
                )}

                {history.length > 0 && !isTerminal && (
                    <button onClick={restart} style={{ ...linkBtn, marginTop: 14 }}>最初からやり直す</button>
                )}
            </div>
        </div>
    );
}

const linkBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: ACCENT };
const playBtn: React.CSSProperties = { flexShrink: 0, width: 30, height: 30, borderRadius: 8, border: '1px solid #BAE6FD', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const gradeBtn: React.CSSProperties = { flex: 1, padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer' };
