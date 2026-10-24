'use client';

/**
 * TutorialFlow - first-run tutorial night for Silent Bartender.
 *
 * Mounted by page.tsx when PlayerStats.totalNights === 0. Self-contained:
 * owns its own mini state machine. Walks through TUTORIAL_STEPS, one step
 * at a time:
 *
 *   gondo -> customer (listening) -> decide -> reacting -> next step
 *
 * No voice detection, no bust. No timer pressure (long, forgiving).
 * At the end, Gondo delivers a closing line, then onComplete() fires.
 *
 * Light theme, matches the main game visually.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import CustomerPortrait from '@/components/english/bar/CustomerPortrait';
import { TUTORIAL_STEPS, type TutorialStep } from '@/data/english/bar/tutorial';

// ═══════════════════════════════════════════════════════════
// Palette - mirror of page.tsx
// ═══════════════════════════════════════════════════════════
const C = {
    bg: '#FAF6EC',
    bgDeep: '#F2ECD8',
    card: '#FFFFFF',
    cardHover: '#FFF8E1',
    border: '#E5DCC0',
    amber: '#B8860B',
    amberDim: '#8B6508',
    amberBg: '#FFF5D1',
    red: '#B91C1C',
    green: '#047857',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#A8A29E',
};

const FINAL_GONDO_LINE = 'あとは、お前次第だ。';

// ═══════════════════════════════════════════════════════════
// Phase state machine
// ═══════════════════════════════════════════════════════════
type Phase = 'gondo' | 'enter' | 'listening' | 'decide' | 'reacting' | 'beat' | 'farewell';

interface Props {
    onComplete: () => void;
}

// ═══════════════════════════════════════════════════════════
// Typewriter - local copy so we don't import from page.tsx
// ═══════════════════════════════════════════════════════════
function useTypewriter(text: string, speedMs: number, active: boolean) {
    const [shown, setShown] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!active) { setShown(''); setDone(false); return; }
        setShown('');
        setDone(false);
        let i = 0;
        const id = setInterval(() => {
            i++;
            setShown(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setDone(true);
            }
        }, speedMs);
        return () => clearInterval(id);
    }, [text, speedMs, active]);

    return { shown, done };
}

// ═══════════════════════════════════════════════════════════
// Card shuffle - keep same contract as main game
// ═══════════════════════════════════════════════════════════
function shuffleCards(cards: string[]): { cards: string[]; correctIdx: number } {
    const correct = cards[0];
    const rest = cards.slice(1);
    const shuffled = [...rest].sort(() => Math.random() - 0.5);
    const insertAt = Math.floor(Math.random() * (shuffled.length + 1));
    shuffled.splice(insertAt, 0, correct);
    return { cards: shuffled, correctIdx: insertAt };
}

// ═══════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════
export default function TutorialFlow({ onComplete }: Props) {
    const [stepIdx, setStepIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>('gondo');
    const [shuffled, setShuffled] = useState<{ cards: string[]; correctIdx: number } | null>(null);
    const [picked, setPicked] = useState<number | null>(null);

    const completedRef = useRef(false);

    const step: TutorialStep | undefined = TUTORIAL_STEPS[stepIdx];
    const customer = step?.customer ?? null;

    // Prepare shuffled cards once per step
    useEffect(() => {
        if (!customer) return;
        setShuffled(shuffleCards(customer.cards));
        setPicked(null);
    }, [stepIdx, customer]);

    // Gondo typewriter
    const gondoText = phase === 'farewell' ? FINAL_GONDO_LINE : (step?.gondoLine ?? '');
    const { shown: gondoShown, done: gondoDone } = useTypewriter(
        gondoText,
        45,
        phase === 'gondo' || phase === 'farewell',
    );

    // Customer line typewriter
    const { shown: lineShown, done: lineDone } = useTypewriter(
        customer?.line ?? '',
        35,
        phase === 'listening' || phase === 'decide' || phase === 'reacting',
    );

    // listening -> decide once line is typed out
    useEffect(() => {
        if (phase === 'listening' && lineDone) setPhase('decide');
    }, [phase, lineDone]);

    // Gondo line tap-to-continue -> enter customer
    const advanceFromGondo = useCallback(() => {
        if (phase !== 'gondo' || !gondoDone) return;
        setPhase('enter');
        setTimeout(() => setPhase('listening'), 700);
    }, [phase, gondoDone]);

    // Farewell tap-to-finish
    const finishFromFarewell = useCallback(() => {
        if (phase !== 'farewell' || !gondoDone) return;
        if (completedRef.current) return;
        completedRef.current = true;
        onComplete();
    }, [phase, gondoDone, onComplete]);

    // Card click
    const pickCard = (i: number) => {
        if (phase !== 'decide' || !shuffled) return;
        setPicked(i);
        setPhase('reacting');
    };

    // reacting -> beat -> next step
    useEffect(() => {
        if (phase !== 'reacting') return;
        const id = setTimeout(() => setPhase('beat'), 2800);
        return () => clearTimeout(id);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'beat') return;
        const id = setTimeout(() => {
            const nextIdx = stepIdx + 1;
            if (nextIdx >= TUTORIAL_STEPS.length) {
                setPhase('farewell');
            } else {
                setStepIdx(nextIdx);
                setPhase('gondo');
            }
        }, 900);
        return () => clearTimeout(id);
    }, [phase, stepIdx]);

    const isCorrect = shuffled !== null && picked !== null && picked === shuffled.correctIdx;

    // ═══════════════════════════════════════════════════════════
    // Renders
    // ═══════════════════════════════════════════════════════════

    const skipButton = (
        <button
            onClick={() => {
                if (completedRef.current) return;
                completedRef.current = true;
                onComplete();
            }}
            style={{
                position: 'fixed', top: 10, right: 10, zIndex: 20,
                background: 'transparent', color: C.textFaint,
                border: `1px solid ${C.border}`, borderRadius: 999,
                padding: '10px 16px', fontSize: 11, letterSpacing: 3,
                fontWeight: 700, cursor: 'pointer', minHeight: 40,
            }}
            aria-label="チュートリアルをスキップ"
        >
            スキップ
        </button>
    );

    const topStrip = (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 16px', fontSize: 10, letterSpacing: 2, fontWeight: 800,
            color: C.textDim, background: C.bg,
            borderBottom: `1px solid ${C.border}`,
            zIndex: 10,
        }}>
            <span>TUTORIAL {Math.min(stepIdx + 1, TUTORIAL_STEPS.length)}/{TUTORIAL_STEPS.length}</span>
            <span style={{ color: C.amber }}>● 練習</span>
            <span style={{ width: 40 }} />
        </div>
    );

    // ─── Gondo speaks (bubble over counter) ───
    if (phase === 'gondo' || phase === 'farewell') {
        return (
            <div style={pageStyle}>
                {skipButton}
                {topStrip}
                <style>{keyframes}</style>
                <div
                    onClick={phase === 'gondo' ? advanceFromGondo : finishFromFarewell}
                    style={{
                        maxWidth: 520, width: '100%', padding: '0 12px',
                        cursor: gondoDone ? 'pointer' : 'default',
                        animation: 'tf-slide 0.5s ease-out',
                        boxSizing: 'border-box',
                    }}
                >
                    <div style={{
                        fontSize: 10, letterSpacing: 6, color: C.amberDim,
                        fontWeight: 900, marginBottom: 14, textAlign: 'center',
                    }}>
                        {phase === 'farewell' ? 'GONDO ── 最後に' : 'GONDO ── 奥の椅子から'}
                    </div>

                    {/* Gondo's head/presence: a minimal silhouette mark, no face */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', marginBottom: 18,
                    }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%',
                            background: C.amberBg, border: `1.5px solid ${C.amber}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 900, color: C.amber,
                            letterSpacing: 1,
                            fontFamily: "'Noto Serif JP', 'Yu Mincho', serif",
                        }}>
                            権
                        </div>
                    </div>

                    {/* Text bubble */}
                    <div style={{
                        background: C.card, border: `1.5px solid ${C.border}`,
                        borderRadius: 14, padding: '22px 24px',
                        position: 'relative',
                        minHeight: 96,
                        fontSize: 17, lineHeight: 1.8, color: C.text,
                        fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
                    }}>
                        {/* bubble tail pointing up toward Gondo */}
                        <div style={{
                            position: 'absolute', top: -9, left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)',
                            width: 14, height: 14,
                            background: C.card,
                            borderLeft: `1.5px solid ${C.border}`,
                            borderTop: `1.5px solid ${C.border}`,
                        }} />
                        <span>{gondoShown}</span>
                        {!gondoDone && (
                            <span style={{
                                display: 'inline-block', width: 8, height: 18,
                                background: C.amber, marginLeft: 4, verticalAlign: 'middle',
                                animation: 'tf-blink 0.8s infinite',
                            }} />
                        )}
                    </div>

                    {gondoDone && (
                        <div style={{
                            textAlign: 'center', marginTop: 18,
                            fontSize: 11, letterSpacing: 3, color: C.textFaint,
                            fontWeight: 700,
                            animation: 'tf-fade 0.4s ease-out',
                        }}>
                            {phase === 'farewell' ? 'タップして始める' : 'タップして続ける'}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (!customer || !shuffled) return null;

    // ─── Customer segment (enter / listening / decide / reacting / beat) ───
    const reactionText = picked !== null && picked >= 0
        ? (isCorrect ? customer.reaction.success : customer.reaction.failure)
        : '';

    const portraitState =
        phase === 'decide' || phase === 'listening' ? 'waiting'
            : phase === 'reacting' && isCorrect ? 'served'
                : phase === 'reacting' ? 'refused'
                    : 'idle';

    return (
        <div style={pageStyle}>
            {skipButton}
            {topStrip}
            <style>{keyframes}</style>

            <div style={{
                maxWidth: 560, width: '100%', padding: '36px 12px 0',
                animation: phase === 'enter' ? 'tf-slide 0.6s ease-out' : undefined,
                boxSizing: 'border-box',
            }}>
                {/* Portrait + name */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    marginBottom: 16,
                }}>
                    <CustomerPortrait
                        mood={customer.mood}
                        name={customer.name}
                        state={portraitState}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            display: 'inline-block', padding: '3px 10px',
                            background: C.amberBg, color: C.amber,
                            border: `1px solid ${C.amber}55`,
                            borderRadius: 999, fontSize: 9, letterSpacing: 3, fontWeight: 900,
                        }}>
                            {customer.name}
                        </div>
                        <div style={{
                            fontSize: 11, color: C.textFaint, marginTop: 4, letterSpacing: 1,
                        }}>
                            {customer.tag}
                        </div>
                    </div>
                </div>

                {/* Line (subtitle) */}
                <div style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: '20px 18px',
                    marginBottom: 20,
                    minHeight: 110,
                    fontSize: 16, fontWeight: 500, lineHeight: 1.7,
                    color: C.text,
                    fontFamily: "'Iowan Old Style', 'Georgia', serif",
                    overflowWrap: 'break-word', hyphens: 'auto',
                }}>
                    {phase === 'reacting' || phase === 'beat' ? (
                        <div style={{
                            color: isCorrect ? C.green : C.red,
                            fontStyle: 'italic',
                        }}>
                            {reactionText}
                        </div>
                    ) : (
                        <>
                            <span>{lineShown}</span>
                            {!lineDone && (
                                <span style={{
                                    display: 'inline-block', width: 8, height: 18,
                                    background: C.amber, marginLeft: 4, verticalAlign: 'middle',
                                    animation: 'tf-blink 0.8s infinite',
                                }} />
                            )}
                        </>
                    )}
                </div>

                {/* Cards */}
                {(phase === 'enter' || phase === 'listening' || phase === 'decide') && (
                    <div style={{
                        display: 'grid', gap: 8, marginBottom: 22,
                        opacity: phase === 'decide' ? 1 : 0.55,
                        pointerEvents: phase === 'decide' ? 'auto' : 'none',
                        transition: 'opacity 0.3s',
                    }}>
                        {shuffled.cards.map((text, i) => (
                            <button
                                key={i}
                                onClick={() => pickCard(i)}
                                style={{
                                    background: C.card,
                                    border: `1.5px solid ${C.border}`,
                                    borderRadius: 10, padding: '14px 14px',
                                    fontSize: 14, fontWeight: 500, color: C.text,
                                    textAlign: 'left',
                                    cursor: phase === 'decide' ? 'pointer' : 'default',
                                    fontFamily: 'inherit',
                                    minHeight: 44, boxSizing: 'border-box',
                                    overflowWrap: 'break-word', hyphens: 'auto',
                                    transition: 'border 0.15s, background 0.15s',
                                }}
                                onMouseEnter={e => {
                                    if (phase !== 'decide') return;
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = C.amber;
                                    (e.currentTarget as HTMLButtonElement).style.background = C.cardHover;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = C.border;
                                    (e.currentTarget as HTMLButtonElement).style.background = C.card;
                                }}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                )}

                {/* Reaction echo */}
                {(phase === 'reacting' || phase === 'beat') && picked !== null && (
                    <div style={{
                        background: isCorrect ? '#ECFDF5' : '#FEF2F2',
                        border: `1.5px solid ${isCorrect ? C.green : C.red}`,
                        borderRadius: 10, padding: '14px 16px',
                        fontSize: 13, fontWeight: 600, color: C.text,
                        marginBottom: 20, textAlign: 'center',
                    }}>
                        {isCorrect ? (
                            <>
                                良し。
                                <span style={{ fontStyle: 'italic', color: C.green, marginLeft: 6 }}>
                                    &quot;{shuffled.cards[picked]}&quot;
                                </span>
                            </>
                        ) : (
                            <>
                                練習だ。気にするな。
                                <div style={{
                                    fontSize: 11, color: C.textDim, marginTop: 4, fontStyle: 'italic',
                                }}>
                                    正解は &quot;{shuffled.cards[shuffled.correctIdx]}&quot;
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Styles + keyframes
// ═══════════════════════════════════════════════════════════
const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: C.bg,
    color: C.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '20px 0 40px',
};

const keyframes = `
@keyframes tf-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
@keyframes tf-slide {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes tf-fade {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;
