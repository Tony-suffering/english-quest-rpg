'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { QUEST_WORDS, QUEST_CATEGORIES } from '@/data/english/quest-words';
import type { QuestWordData } from '@/data/english/quest-words';

// ── Quest: 英単語の冒険 ─────────────────────────────────────
// DB不要。quest-words.tsの静的データで動く。3001の個人データには触らない。
// 日本語解説を読む → 理解する → 捕まえる。クイズじゃない、読み物RPG。

interface QuestWord extends QuestWordData {
    uid: string;
}

// Day単位でグループ化 → Questのステージになる
interface QuestStage {
    day: number;
    label: string;       // Day theme from first word's category
    words: QuestWord[];
}

type Phase = 'map' | 'walk' | 'encounter' | 'read' | 'catch' | 'stage-clear';

function buildStages(words: QuestWordData[]): QuestStage[] {
    const dayMap = new Map<number, QuestWord[]>();
    words.forEach((w, i) => {
        const qw: QuestWord = { ...w, uid: `q_${i}` };
        const list = dayMap.get(w.day) || [];
        list.push(qw);
        dayMap.set(w.day, list);
    });
    return Array.from(dayMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([day, ws]) => {
            const cat = ws[0]?.cat || '';
            const meta = QUEST_CATEGORIES[cat];
            return { day, label: meta?.label || `Day ${day}`, words: ws };
        });
}

export default function QuestPage() {
    const [phase, setPhase] = useState<Phase>('map');
    const [selectedStageIdx, setSelectedStageIdx] = useState(0);
    const [wordIdx, setWordIdx] = useState(0);
    const [caughtWords, setCaughtWords] = useState<Set<string>>(new Set());
    const [shakeScreen, setShakeScreen] = useState(false);
    const [flashWhite, setFlashWhite] = useState(false);

    // Load caught state
    useEffect(() => {
        try {
            const saved = localStorage.getItem('quest-caught');
            if (saved) setCaughtWords(new Set(JSON.parse(saved)));
        } catch { /* */ }
    }, []);

    const saveCaught = (next: Set<string>) => {
        setCaughtWords(next);
        try { localStorage.setItem('quest-caught', JSON.stringify([...next])); } catch { /* */ }
    };

    const stages = useMemo(() => buildStages(QUEST_WORDS), []);
    const currentStage = stages[selectedStageIdx];
    const currentWord = currentStage?.words[wordIdx] || null;

    const triggerShake = () => { setShakeScreen(true); setTimeout(() => setShakeScreen(false), 400); };
    const triggerFlash = () => { setFlashWhite(true); setTimeout(() => setFlashWhite(false), 250); };

    // Start walking in grass → encounter
    const enterStage = (idx: number) => {
        setSelectedStageIdx(idx);
        setWordIdx(0);
        setPhase('walk');
        setTimeout(() => {
            triggerFlash();
            setTimeout(() => setPhase('encounter'), 200);
        }, 800 + Math.random() * 800);
    };

    // Read the explanation (the core gameplay)
    const readWord = () => setPhase('read');

    // Catch after reading
    const catchWord = () => {
        if (!currentWord) return;
        triggerFlash();
        const next = new Set(caughtWords);
        next.add(currentWord.uid);
        saveCaught(next);
        setPhase('catch');
    };

    // Next word or stage clear
    const nextWord = () => {
        if (!currentStage) return;
        const ni = wordIdx + 1;
        if (ni >= currentStage.words.length) {
            setPhase('stage-clear');
            return;
        }
        setWordIdx(ni);
        setPhase('walk');
        setTimeout(() => {
            triggerFlash();
            setTimeout(() => setPhase('encounter'), 200);
        }, 600 + Math.random() * 600);
    };

    // Skip (already caught)
    const skipWord = () => nextWord();

    const catMeta = currentWord ? QUEST_CATEGORIES[currentWord.cat] : null;
    const catColor = catMeta?.color || '#D4AF37';

    return (
        <div style={{
            minHeight: '100vh', background: '#0a0a0a', color: '#FAFAF9',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column',
                animation: shakeScreen ? 'shake 0.4s ease' : 'none',
            }}>
                {flashWhite && (
                    <div style={{
                        position: 'fixed', inset: 0, backgroundColor: '#fff', zIndex: 999,
                        animation: 'flashOut 0.3s ease forwards',
                    }} />
                )}

                {/* Top bar */}
                <div style={{
                    padding: '12px 16px', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    position: 'relative', zIndex: 10,
                }}>
                    <Link href="/english/training" style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '11px', textDecoration: 'none',
                        fontWeight: 600, letterSpacing: '1px',
                    }}>TRAINING</Link>
                    {phase !== 'map' && (
                        <button onClick={() => setPhase('map')} style={{
                            background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '4px', color: 'rgba(255,255,255,0.3)', fontSize: '10px',
                            padding: '4px 10px', cursor: 'pointer', letterSpacing: '1px',
                        }}>BACK</button>
                    )}
                    <Link href="/english/world-map" style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '11px', textDecoration: 'none',
                        fontWeight: 600, letterSpacing: '1px',
                    }}>MAP</Link>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>

                    {/* ════════ STAGE MAP ════════ */}
                    {phase === 'map' && (
                        <div style={{ maxWidth: '480px', width: '100%' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', letterSpacing: '6px', marginBottom: '8px' }}>
                                    ENGLISH QUEST
                                </div>
                                <h1 style={{
                                    fontSize: '32px', fontWeight: 900, color: '#D4AF37', letterSpacing: '4px',
                                    textShadow: '0 0 40px rgba(212,175,55,0.2)',
                                }}>
                                    QUEST
                                </h1>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '8px', lineHeight: 1.6 }}>
                                    英単語の冒険。日本語の解説を読んで、単語を捕まえよう。
                                </p>
                            </div>

                            {/* Stage list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '60vh', overflow: 'auto' }}>
                                {stages.map((stage, idx) => {
                                    const caught = stage.words.filter(w => caughtWords.has(w.uid)).length;
                                    const total = stage.words.length;
                                    const isComplete = caught >= total;
                                    const pct = total > 0 ? Math.round((caught / total) * 100) : 0;
                                    const firstCat = stage.words[0]?.cat || '';
                                    const meta = QUEST_CATEGORIES[firstCat];
                                    const color = meta?.color || '#D4AF37';

                                    return (
                                        <button
                                            key={stage.day}
                                            onClick={() => enterStage(idx)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                padding: '12px 14px', border: 'none', cursor: 'pointer',
                                                background: isComplete
                                                    ? 'rgba(16,185,129,0.06)'
                                                    : 'rgba(255,255,255,0.02)',
                                                borderRadius: '10px', textAlign: 'left', width: '100%',
                                                transition: 'background 0.15s',
                                            }}
                                        >
                                            <div style={{
                                                width: '36px', height: '36px', borderRadius: '50%',
                                                background: isComplete ? '#10B981' : `${color}30`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: isComplete ? '#fff' : color,
                                                fontWeight: 900, fontSize: '13px', flexShrink: 0,
                                                border: `2px solid ${isComplete ? '#10B981' : color}40`,
                                            }}>
                                                {isComplete ? '\u2713' : stage.day}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#FAFAF9' }}>
                                                        {stage.label}
                                                    </span>
                                                    <span style={{ fontSize: '10px', color: isComplete ? '#10B981' : 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
                                                        {caught}/{total}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    height: '3px', backgroundColor: 'rgba(255,255,255,0.04)',
                                                    borderRadius: '2px', overflow: 'hidden',
                                                }}>
                                                    <div style={{
                                                        height: '100%', width: `${pct}%`, borderRadius: '2px',
                                                        background: isComplete ? '#10B981' : color,
                                                        transition: 'width 0.3s',
                                                    }} />
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Total stats */}
                            <div style={{
                                marginTop: '16px', padding: '12px', borderRadius: '10px',
                                background: 'rgba(255,255,255,0.02)',
                                display: 'flex', justifyContent: 'center', gap: '20px',
                                fontSize: '12px',
                            }}>
                                <span style={{ color: '#D4AF37', fontWeight: 700 }}>
                                    {caughtWords.size} GET
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    / {QUEST_WORDS.length} total
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ════════ WALKING ════════ */}
                    {phase === 'walk' && currentStage && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '180px', height: '100px', margin: '0 auto 20px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                {Array.from({ length: 20 }, (_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        left: `${(i % 5) * 38 + Math.random() * 10}px`,
                                        top: `${Math.floor(i / 5) * 26 + Math.random() * 8}px`,
                                        width: '4px', height: '16px',
                                        backgroundColor: `hsl(${120 + Math.random() * 30}, 55%, ${28 + Math.random() * 18}%)`,
                                        borderRadius: '0 0 2px 2px',
                                        transformOrigin: 'bottom center',
                                        animation: `grassSway ${0.7 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                                        animationDelay: `${Math.random() * 0.4}s`,
                                    }} />
                                ))}
                                <div style={{
                                    position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                                    width: '16px', height: '20px', backgroundColor: '#D4AF37',
                                    borderRadius: '3px 3px 1px 1px',
                                    animation: 'walkBounce 0.35s ease infinite',
                                }} />
                            </div>
                            <div style={{
                                fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px',
                                animation: 'pulse 1s ease infinite',
                            }}>
                                {wordIdx + 1} / {currentStage.words.length}
                            </div>
                        </div>
                    )}

                    {/* ════════ ENCOUNTER ════════ */}
                    {phase === 'encounter' && currentWord && currentStage && (
                        <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px', marginBottom: '12px' }}>
                                {wordIdx + 1} / {currentStage.words.length}
                            </div>

                            <div style={{
                                padding: '36px 24px', borderRadius: '14px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                marginBottom: '16px', animation: 'encounterSlideIn 0.4s ease',
                            }}>
                                <div style={{
                                    fontSize: '10px', color: catColor, letterSpacing: '3px',
                                    fontWeight: 700, marginBottom: '20px',
                                    textShadow: `0 0 20px ${catColor}30`,
                                }}>
                                    WILD WORD APPEARED!
                                </div>
                                <div style={{
                                    fontSize: '28px', fontWeight: 900, color: '#FAFAF9',
                                    marginBottom: '6px', animation: 'phraseGlow 2s ease infinite',
                                }}>
                                    {currentWord.en}
                                </div>
                                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
                                    {currentWord.pron}
                                </div>
                                <div style={{
                                    marginTop: '12px', fontSize: '10px', fontWeight: 600,
                                    color: catColor, letterSpacing: '0.5px',
                                    padding: '3px 10px', display: 'inline-block',
                                    border: `1px solid ${catColor}30`, borderRadius: '4px',
                                }}>
                                    {catMeta?.label || currentWord.cat}
                                </div>
                            </div>

                            {caughtWords.has(currentWord.uid) ? (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={readWord} style={{
                                        flex: 1, padding: '14px', borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        color: '#FAFAF9', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                    }}>
                                        もう一回読む
                                    </button>
                                    <button onClick={skipWord} style={{
                                        flex: 1, padding: '14px', borderRadius: '10px',
                                        background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                                        color: '#10B981', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                    }}>
                                        GET済み →
                                    </button>
                                </div>
                            ) : (
                                <button onClick={readWord} style={{
                                    width: '100%', padding: '16px', borderRadius: '10px',
                                    background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)`,
                                    border: 'none', color: '#fff', fontWeight: 900, fontSize: '16px',
                                    cursor: 'pointer', letterSpacing: '3px',
                                    boxShadow: `0 4px 20px ${catColor}30`,
                                }}>
                                    INVESTIGATE
                                </button>
                            )}
                        </div>
                    )}

                    {/* ════════ READ (THE CORE) ════════ */}
                    {phase === 'read' && currentWord && (
                        <div style={{ maxWidth: '480px', width: '100%' }}>
                            {/* Word header */}
                            <div style={{
                                textAlign: 'center', marginBottom: '20px',
                                padding: '20px', borderRadius: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#FAFAF9' }}>
                                        {currentWord.en}
                                    </span>
                                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                                        {currentWord.pron}
                                    </span>
                                </div>
                                <div style={{ fontSize: '16px', color: catColor, fontWeight: 700 }}>
                                    {currentWord.ja}
                                </div>
                            </div>

                            {/* Example sentence */}
                            <div style={{
                                padding: '14px 16px', borderRadius: '10px',
                                background: 'rgba(255,255,255,0.03)',
                                borderLeft: `3px solid ${catColor}`,
                                marginBottom: '12px',
                            }}>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px', marginBottom: '6px', fontWeight: 600 }}>
                                    EXAMPLE
                                </div>
                                <div style={{ fontSize: '15px', color: '#FAFAF9', fontStyle: 'italic', lineHeight: 1.5 }}>
                                    {currentWord.note}
                                </div>
                            </div>

                            {/* WHY -- THE MAIN CONTENT */}
                            {currentWord.why && (
                                <div style={{
                                    padding: '16px 18px', borderRadius: '12px',
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
                                    border: '1px solid rgba(212,175,55,0.15)',
                                    marginBottom: '20px',
                                }}>
                                    <div style={{
                                        fontSize: '10px', fontWeight: 700, color: '#D4AF37',
                                        letterSpacing: '2px', marginBottom: '8px',
                                    }}>
                                        なぜこの単語？
                                    </div>
                                    <div style={{
                                        fontSize: '14px', color: '#FAFAF9', lineHeight: 2.0,
                                    }}>
                                        {currentWord.why}
                                    </div>
                                </div>
                            )}

                            {/* Catch button */}
                            {caughtWords.has(currentWord.uid) ? (
                                <button onClick={nextWord} style={{
                                    width: '100%', padding: '16px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #10B981, #059669)',
                                    border: 'none', color: '#fff', fontWeight: 900, fontSize: '15px',
                                    cursor: 'pointer', letterSpacing: '2px',
                                }}>
                                    GET済み → NEXT
                                </button>
                            ) : (
                                <button onClick={catchWord} style={{
                                    width: '100%', padding: '16px', borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #D4AF37, #B8962F)',
                                    border: 'none', color: '#0a0a0a', fontWeight: 900, fontSize: '16px',
                                    cursor: 'pointer', letterSpacing: '3px',
                                    boxShadow: '0 4px 24px rgba(212,175,55,0.3)',
                                }}>
                                    GET!
                                </button>
                            )}
                        </div>
                    )}

                    {/* ════════ CATCH ════════ */}
                    {phase === 'catch' && currentWord && (
                        <div style={{ textAlign: 'center', animation: 'caughtPop 0.5s ease' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: `linear-gradient(135deg, ${catColor}, #D4AF37)`,
                                margin: '0 auto 16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 0 40px ${catColor}40`,
                                animation: 'badgeSpin 0.6s ease',
                            }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: '#fff' }}>G</span>
                            </div>
                            <div style={{
                                fontSize: '28px', fontWeight: 900, color: '#D4AF37',
                                marginBottom: '6px', letterSpacing: '4px',
                                textShadow: '0 0 30px rgba(212,175,55,0.3)',
                            }}>
                                GET!
                            </div>
                            <div style={{ fontSize: '18px', color: '#FAFAF9', fontWeight: 700, marginBottom: '4px' }}>
                                {currentWord.en}
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                                {currentWord.ja}
                            </div>
                            <button onClick={nextWord} style={{
                                padding: '14px 40px', borderRadius: '10px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: '#FAFAF9', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                letterSpacing: '2px',
                            }}>
                                NEXT →
                            </button>
                        </div>
                    )}

                    {/* ════════ STAGE CLEAR ════════ */}
                    {phase === 'stage-clear' && currentStage && (
                        <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center', animation: 'caughtPop 0.6s ease' }}>
                            <div style={{
                                fontSize: '10px', color: '#10B981', letterSpacing: '4px',
                                fontWeight: 700, marginBottom: '16px',
                            }}>
                                STAGE CLEAR!
                            </div>
                            <h2 style={{
                                fontSize: '24px', fontWeight: 900, color: '#FAFAF9', marginBottom: '8px',
                            }}>
                                {currentStage.label}
                            </h2>
                            <div style={{
                                fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px',
                            }}>
                                {currentStage.words.filter(w => caughtWords.has(w.uid)).length} / {currentStage.words.length} GET
                            </div>

                            {/* Words caught in this stage */}
                            <div style={{
                                display: 'flex', flexWrap: 'wrap', gap: '6px',
                                justifyContent: 'center', marginBottom: '28px',
                            }}>
                                {currentStage.words.map(w => {
                                    const caught = caughtWords.has(w.uid);
                                    const wCat = QUEST_CATEGORIES[w.cat];
                                    return (
                                        <span key={w.uid} style={{
                                            fontSize: '11px', fontWeight: 600,
                                            padding: '4px 10px', borderRadius: '6px',
                                            backgroundColor: caught ? `${wCat?.color || '#D4AF37'}15` : 'rgba(255,255,255,0.03)',
                                            color: caught ? (wCat?.color || '#D4AF37') : 'rgba(255,255,255,0.2)',
                                            border: `1px solid ${caught ? `${wCat?.color || '#D4AF37'}30` : 'rgba(255,255,255,0.06)'}`,
                                        }}>
                                            {w.en}
                                        </span>
                                    );
                                })}
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => setPhase('map')} style={{
                                    flex: 1, padding: '14px', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: '#FAFAF9', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                                }}>
                                    STAGES
                                </button>
                                {selectedStageIdx + 1 < stages.length && (
                                    <button onClick={() => enterStage(selectedStageIdx + 1)} style={{
                                        flex: 1, padding: '14px', borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #D4AF37, #B8962F)',
                                        border: 'none', color: '#0a0a0a', fontWeight: 900, fontSize: '13px',
                                        cursor: 'pointer', letterSpacing: '1px',
                                    }}>
                                        NEXT STAGE →
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
                @keyframes shake {
                    0%,100%{transform:translateX(0)}
                    20%{transform:translateX(-8px)}
                    40%{transform:translateX(8px)}
                    60%{transform:translateX(-4px)}
                    80%{transform:translateX(4px)}
                }
                @keyframes flashOut { 0%{opacity:1} 100%{opacity:0} }
                @keyframes grassSway { 0%{transform:rotate(-8deg)} 100%{transform:rotate(8deg)} }
                @keyframes walkBounce {
                    0%,100%{transform:translateX(-50%) translateY(0)}
                    50%{transform:translateX(-50%) translateY(-4px)}
                }
                @keyframes encounterSlideIn {
                    0%{opacity:0;transform:scale(0.85)} 100%{opacity:1;transform:scale(1)}
                }
                @keyframes phraseGlow {
                    0%,100%{text-shadow:0 0 10px rgba(255,255,255,0)}
                    50%{text-shadow:0 0 20px rgba(255,255,255,0.1)}
                }
                @keyframes caughtPop {
                    0%{opacity:0;transform:scale(0.5)} 60%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)}
                }
                @keyframes badgeSpin {
                    0%{transform:rotateY(180deg) scale(0.5)} 100%{transform:rotateY(0) scale(1)}
                }
            `}</style>
        </div>
    );
}
