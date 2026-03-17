'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// ── Theme ──
const T = {
    bg: '#F0EFE9',
    surface: '#FFFFFF',
    text: '#1C1917',
    textSub: '#57534E',
    textMuted: '#A8A29E',
    gold: '#D4AF37',
    green: '#10B981',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    red: '#EF4444',
    shadow: '0 2px 8px rgba(0,0,0,0.06)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.08)',
};

// ── Demo phrases: relatable Japanese → satisfying English ──
const DEMO_PHRASES = [
    { ja: 'めっちゃ疲れた', en: "I'm beat.", hint: 'beat = exhausted (slang)' },
    { ja: 'マジで？', en: 'For real?', hint: '"seriously?" の友達バージョン' },
    { ja: '微妙...', en: 'Meh.', hint: '一言で「微妙」を表現できる最強の単語' },
    { ja: 'なんとかなるっしょ', en: "It'll work out.", hint: '楽観主義者の口癖' },
    { ja: '空気読めよ', en: 'Read the room.', hint: '英語にも「空気を読む」がある' },
    { ja: 'しょうがないね', en: 'It is what it is.', hint: 'アメリカ人が一番使う諦めフレーズ' },
    { ja: 'ちょっと待って', en: 'Hold on a sec.', hint: 'sec = second の超カジュアル省略' },
    { ja: 'やっぱやめた', en: 'Never mind.', hint: '「気にしないで」じゃなく「やっぱいいわ」' },
];

// ── Slot symbols for mini gacha ──
const SLOT_SYMBOLS = ['7', 'BAR', 'BELL', 'CHERRY', 'STAR'];

// ── Demo Component ──
function InteractiveDemo({ onComplete }: { onComplete: (stats: { correct: number; total: number; streak: number }) => void }) {
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [kakuhen, setKakuhen] = useState(false);
    const [kakuhenBanner, setKakuhenBanner] = useState(false);
    const [slotResult, setSlotResult] = useState<string | null>(null);
    const [cardAnim, setCardAnim] = useState<'enter' | 'exit' | null>('enter');
    const [particles, setParticles] = useState<{ id: number; x: number; color: string }[]>([]);
    const particleId = useRef(0);

    const phrase = DEMO_PHRASES[index];
    const isLast = index >= DEMO_PHRASES.length;

    // Spawn particles on correct answer
    const spawnParticles = useCallback((color: string) => {
        const newP = Array.from({ length: 8 }, () => ({
            id: particleId.current++,
            x: 20 + Math.random() * 60,
            color,
        }));
        setParticles(prev => [...prev, ...newP]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newP.includes(p)));
        }, 1000);
    }, []);

    const handleAnswer = useCallback((knew: boolean) => {
        if (knew) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            setMaxStreak(prev => Math.max(prev, newStreak));
            setCorrect(prev => prev + 1);

            // Mini slot
            const sym = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
            setSlotResult(sym);
            setTimeout(() => setSlotResult(null), 800);

            // Kakuhen at 3
            if (newStreak === 3 && !kakuhen) {
                setKakuhen(true);
                setKakuhenBanner(true);
                setTimeout(() => setKakuhenBanner(false), 1500);
            }

            spawnParticles(kakuhen ? '#D4AF37' : T.green);
        } else {
            if (streak > 0) {
                setStreak(0);
                setKakuhen(false);
            }
        }

        // Next card
        setCardAnim('exit');
        setTimeout(() => {
            if (index + 1 >= DEMO_PHRASES.length) {
                onComplete({ correct: knew ? correct + 1 : correct, total: DEMO_PHRASES.length, streak: Math.max(maxStreak, knew ? streak + 1 : streak) });
            } else {
                setIndex(prev => prev + 1);
                setRevealed(false);
                setCardAnim('enter');
            }
        }, 300);
    }, [streak, index, correct, maxStreak, kakuhen, onComplete, spawnParticles]);

    if (isLast) return null;

    return (
        <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto', padding: '0 20px' }}>
            {/* Floating particles */}
            {particles.map(p => (
                <div key={p.id} style={{
                    position: 'absolute',
                    left: `${p.x}%`,
                    bottom: '60%',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}`,
                    animation: 'demo-particle 1s ease-out forwards',
                    pointerEvents: 'none',
                    zIndex: 10,
                }} />
            ))}

            {/* Progress bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: '#E7E5E4' }}>
                    <div style={{
                        height: '100%', borderRadius: 2,
                        backgroundColor: kakuhen ? T.gold : T.green,
                        width: `${(index / DEMO_PHRASES.length) * 100}%`,
                        transition: 'all 0.3s ease',
                    }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.textMuted }}>
                    {index + 1}/{DEMO_PHRASES.length}
                </span>
            </div>

            {/* Streak counter */}
            {streak > 0 && (
                <div style={{
                    textAlign: 'center', marginBottom: 12,
                    animation: 'demo-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '4px 16px', borderRadius: 20,
                        backgroundColor: kakuhen ? T.gold : '#1C1917',
                        color: '#fff',
                        fontSize: 13, fontWeight: 800, letterSpacing: '1px',
                        boxShadow: kakuhen ? `0 0 20px ${T.gold}60` : 'none',
                        transition: 'all 0.3s',
                    }}>
                        {kakuhen ? 'KAKUHEN ' : ''}x{streak} CHAIN
                    </span>
                </div>
            )}

            {/* Kakuhen banner */}
            {kakuhenBanner && (
                <div style={{
                    position: 'fixed', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 100, pointerEvents: 'none',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                        color: '#fff',
                        padding: '16px 48px',
                        borderRadius: 16,
                        fontWeight: 900,
                        fontSize: 32,
                        letterSpacing: '6px',
                        textShadow: '0 0 20px rgba(255,255,255,0.8)',
                        boxShadow: `0 0 60px ${T.gold}AA`,
                        animation: 'demo-slam 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    }}>
                        KAKUHEN!
                    </div>
                </div>
            )}

            {/* Card */}
            <div
                onClick={() => { if (!revealed) setRevealed(true); }}
                style={{
                    backgroundColor: T.surface,
                    borderRadius: 20,
                    padding: '40px 32px',
                    minHeight: 200,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: kakuhen
                        ? `0 0 30px ${T.gold}30, 0 8px 32px rgba(0,0,0,0.1)`
                        : '0 8px 32px rgba(0,0,0,0.08)',
                    border: kakuhen ? `2px solid ${T.gold}40` : '1px solid #E7E5E4',
                    cursor: revealed ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    animation: cardAnim === 'enter' ? 'demo-card-enter 0.3s ease-out'
                        : cardAnim === 'exit' ? 'demo-card-exit 0.3s ease-in forwards' : undefined,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Kakuhen glow */}
                {kakuhen && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${T.gold}08, ${T.gold}15, ${T.gold}08)`,
                        animation: 'demo-pulse 2s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* Slot result flash */}
                {slotResult && (
                    <div style={{
                        position: 'absolute', top: 12, right: 16,
                        fontSize: 11, fontWeight: 800, color: T.gold,
                        backgroundColor: T.gold + '15',
                        padding: '3px 10px', borderRadius: 8,
                        animation: 'demo-pop 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        letterSpacing: '1px',
                    }}>
                        {slotResult}
                    </div>
                )}

                {/* Japanese */}
                <div style={{
                    fontSize: 28, fontWeight: 700, color: T.text,
                    marginBottom: revealed ? 20 : 0,
                    textAlign: 'center',
                }}>
                    {phrase.ja}
                </div>

                {/* English (revealed) */}
                {revealed && (
                    <div style={{ animation: 'demo-reveal 0.3s ease-out', textAlign: 'center' }}>
                        <div style={{
                            fontSize: 24, fontWeight: 800, color: T.gold,
                            marginBottom: 8,
                        }}>
                            {phrase.en}
                        </div>
                        <div style={{
                            fontSize: 13, color: T.textSub,
                            lineHeight: 1.6,
                        }}>
                            {phrase.hint}
                        </div>
                    </div>
                )}

                {/* Tap to reveal */}
                {!revealed && (
                    <div style={{
                        fontSize: 12, color: T.textMuted, marginTop: 16,
                        animation: 'demo-breathe 2s ease-in-out infinite',
                    }}>
                        tap to reveal
                    </div>
                )}
            </div>

            {/* Action buttons */}
            {revealed && (
                <div style={{
                    display: 'flex', gap: 12, marginTop: 20,
                    animation: 'demo-reveal 0.2s ease-out',
                }}>
                    <button
                        onClick={() => handleAnswer(false)}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: 14,
                            border: '2px solid #E7E5E4', backgroundColor: T.surface,
                            color: T.textSub, fontSize: 15, fontWeight: 700,
                            cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
                        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        まだ
                    </button>
                    <button
                        onClick={() => handleAnswer(true)}
                        style={{
                            flex: 2, padding: '14px 0', borderRadius: 14,
                            border: 'none',
                            background: kakuhen
                                ? `linear-gradient(135deg, ${T.gold}, #B8941E)`
                                : `linear-gradient(135deg, ${T.green}, #059669)`,
                            color: '#fff', fontSize: 15, fontWeight: 700,
                            cursor: 'pointer', transition: 'all 0.15s',
                            boxShadow: kakuhen
                                ? `0 4px 16px ${T.gold}40`
                                : `0 4px 16px ${T.green}30`,
                        }}
                        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; }}
                        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        覚えた
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Results Screen ──
function DemoResults({ stats }: { stats: { correct: number; total: number; streak: number } }) {
    const pct = Math.round((stats.correct / stats.total) * 100);
    return (
        <div style={{
            maxWidth: 440, margin: '0 auto', padding: '0 20px',
            textAlign: 'center',
            animation: 'demo-reveal 0.5s ease-out',
        }}>
            <div style={{
                backgroundColor: T.surface, borderRadius: 20,
                padding: '40px 32px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                border: '1px solid #E7E5E4',
                marginBottom: 24,
            }}>
                <div style={{
                    fontSize: 48, fontWeight: 900, color: T.gold,
                    marginBottom: 8,
                }}>
                    {pct}%
                </div>
                <div style={{ fontSize: 14, color: T.textSub, marginBottom: 24 }}>
                    {stats.correct}/{stats.total} 覚えた
                    {stats.streak >= 3 && (
                        <span style={{ color: T.gold, fontWeight: 700 }}>
                            {' '}-- x{stats.streak} CHAIN
                        </span>
                    )}
                </div>

                <div style={{
                    fontSize: 16, color: T.text, fontWeight: 600,
                    lineHeight: 2.0,
                    marginBottom: 32,
                }}>
                    {pct >= 80 ? (
                        <>センスある。<br />毎日10個、こんな感じで覚えていく。</>
                    ) : pct >= 50 ? (
                        <>いい調子。<br />繰り返すほど定着する。</>
                    ) : (
                        <>大丈夫、みんな最初はこんなもん。<br />繰り返せば覚える。</>
                    )}
                </div>

                <Link href="/english/training" style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '16px 48px',
                        borderRadius: 14,
                        background: `linear-gradient(135deg, ${T.gold}, #B8941E)`,
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        boxShadow: `0 4px 20px ${T.gold}40`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}>
                        トレーニングへ
                    </div>
                </Link>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 12 }}>
                    1日10単語。スロット回る。連鎖で確変。
                </div>
            </div>

            <button
                onClick={() => window.location.reload()}
                style={{
                    background: 'none', border: 'none',
                    fontSize: 13, color: T.textMuted, cursor: 'pointer',
                    textDecoration: 'underline',
                }}
            >
                もう1回やる
            </button>
        </div>
    );
}

// ── Step Card (from original) ──
function StepCard({ step, title, desc, href, color, tag, active }: {
    step: string; title: string; desc: string; href: string;
    color: string; tag: string; active?: boolean;
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: T.surface,
                borderRadius: 16,
                padding: '24px 24px 20px',
                boxShadow: active ? `0 4px 20px ${color}25` : T.shadow,
                border: active ? `2px solid ${color}` : '1px solid #E7E5E4',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px ${color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = active ? `0 4px 20px ${color}25` : T.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <div style={{
                    position: 'absolute', top: -8, right: 12,
                    fontSize: 64, fontWeight: 900, color: color + '08',
                    lineHeight: 1, pointerEvents: 'none',
                }}>{step}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        backgroundColor: color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 15, fontWeight: 800,
                    }}>{step}</div>
                    <div>
                        <div style={{ fontSize: 17, fontWeight: 700, color: T.text }}>{title}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: '0.15em' }}>{tag}</div>
                    </div>
                </div>
                <p style={{ fontSize: 13, color: T.textSub, margin: 0, lineHeight: 1.8, paddingLeft: 44 }}>
                    {desc}
                </p>
                <div style={{ paddingLeft: 44, marginTop: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: '0.05em' }}>
                        {active ? 'ここから始める' : '開く'} →
                    </span>
                </div>
            </div>
        </Link>
    );
}

// ── Main Page ──
export default function EnglishHomePage() {
    const [phase, setPhase] = useState<'hero' | 'demo' | 'results'>('hero');
    const [demoStats, setDemoStats] = useState<{ correct: number; total: number; streak: number } | null>(null);
    const [showMore, setShowMore] = useState(false);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: T.bg }}>
            {/* Demo animations */}
            <style>{`
                @keyframes demo-particle {
                    0% { transform: translateY(0) scale(1); opacity: 1; }
                    100% { transform: translateY(-80px) scale(0); opacity: 0; }
                }
                @keyframes demo-pop {
                    0% { transform: scale(0.8); opacity: 0; }
                    60% { transform: scale(1.1); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes demo-slam {
                    0% { transform: scale(3); opacity: 0; }
                    30% { transform: scale(0.9); opacity: 1; }
                    45% { transform: scale(1.1); opacity: 1; }
                    60% { transform: scale(1); opacity: 1; }
                    80% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0.8); opacity: 0; }
                }
                @keyframes demo-card-enter {
                    0% { transform: translateX(40px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                @keyframes demo-card-exit {
                    0% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(-40px); opacity: 0; }
                }
                @keyframes demo-reveal {
                    0% { transform: translateY(10px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes demo-breathe {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                @keyframes demo-pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
                @keyframes demo-hero-fade {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 80px' }}>

                {/* ── HERO ── */}
                {phase === 'hero' && (
                    <div style={{ animation: 'demo-hero-fade 0.6s ease-out' }}>
                        <div style={{ textAlign: 'center', marginBottom: 48 }}>
                            <div style={{
                                fontSize: 10, letterSpacing: '0.3em', color: T.gold,
                                fontWeight: 700, marginBottom: 16,
                            }}>
                                ENGLISH QUEST RPG
                            </div>
                            <h1 style={{
                                fontSize: 26, fontWeight: 300, color: T.text,
                                margin: '0 0 20px', lineHeight: 1.7,
                            }}>
                                英語、<span style={{ fontWeight: 700 }}>喋れないだろ？</span><br />
                                <span style={{ fontSize: 20, color: T.textSub }}>俺もだ。TOEIC 900あるのに。</span>
                            </h1>
                            <div style={{
                                fontSize: 14, color: T.textSub, lineHeight: 2.0,
                                maxWidth: 480, margin: '0 auto',
                            }}>
                                リーディング、リスニング、ライティング。<br />
                                4技能のうち3つはクリアした。<br />
                                最後の1つ、スピーキングで永遠に死んでる。<br />
                                <span style={{ color: T.text, fontWeight: 600 }}>
                                    だから作った。自分で使いたいアプリを。
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ textAlign: 'center', marginBottom: 56 }}>
                            <button
                                onClick={() => setPhase('demo')}
                                style={{
                                    display: 'inline-block',
                                    padding: '18px 56px',
                                    borderRadius: 14,
                                    background: `linear-gradient(135deg, ${T.gold}, #B8941E)`,
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    boxShadow: `0 4px 16px ${T.gold}40`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    border: 'none',
                                }}
                            >
                                30秒で体験する
                            </button>
                            <div style={{ fontSize: 12, color: T.textMuted, marginTop: 12 }}>
                                登録不要。8フレーズ。今すぐ試せる。
                            </div>
                        </div>

                        {/* Direct link for returning users */}
                        <div style={{ textAlign: 'center', marginBottom: 48 }}>
                            <Link href="/english/training" style={{
                                fontSize: 13, color: T.gold, fontWeight: 600,
                                textDecoration: 'none',
                                borderBottom: `1px solid ${T.gold}40`,
                                paddingBottom: 2,
                            }}>
                                もう知ってる → トレーニングへ直行
                            </Link>
                        </div>

                        {/* 3 Steps */}
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ width: 4, height: 24, backgroundColor: T.gold, borderRadius: 2 }} />
                                <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: 0 }}>3ステップ</h2>
                            </div>
                            <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, paddingLeft: 16, letterSpacing: '0.05em' }}>
                                上から順にやるだけ。迷わない。
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
                            <StepCard step="1" title="5min 英会話" desc="1日5分、フレーズ5個。会話シーンで実際に使う感覚をつかむ。全30日。" href="/english/5min" color={T.green} tag="BEGINNER" active />
                            <div style={{ textAlign: 'center', color: T.textMuted, fontSize: 20, lineHeight: 1 }}>|</div>
                            <StepCard step="2" title="トレーニング" desc="フレーズを「カード」として育てる。スロットが回る。連続正解でフィーバー。" href="/english/training" color={T.gold} tag="CORE" />
                            <div style={{ textAlign: 'center', color: T.textMuted, fontSize: 20, lineHeight: 1 }}>|</div>
                            <StepCard step="3" title="Quest" desc="ストーリーで新しいフレーズと出会う。250フレーズ。" href="/english/quest" color={T.blue} tag="EXPLORE" />
                        </div>

                        {/* More features */}
                        <button
                            onClick={() => setShowMore(!showMore)}
                            style={{
                                width: '100%', padding: '14px 24px',
                                backgroundColor: T.surface, borderRadius: 14,
                                border: '1px solid #E7E5E4', boxShadow: T.shadow,
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'space-between',
                                fontSize: 14, fontWeight: 600, color: T.text,
                                marginBottom: 16,
                            }}
                        >
                            <span>もっと見る</span>
                            <span style={{
                                fontSize: 18, color: T.textMuted,
                                transition: 'transform 0.2s',
                                transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}>v</span>
                        </button>

                        {showMore && (
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: 10, marginBottom: 48,
                            }}>
                                <FeatureLink href="/memoria" title="Memoria" desc="ネイティブ会話リスニング。7シナリオ。" />
                                <FeatureLink href="/english/goroku" title="俺語録" desc="310個の日本語を自然な英語に。" />
                                <FeatureLink href="/english/dashboard-v2" title="ダッシュボード" desc="XP推移、レビューヒートマップ。" />
                                <FeatureLink href="/english/tonio-words" title="TONIO WORDS" desc="TOEIC単語ブラウザ。Talk Mode搭載。" />
                                <FeatureLink href="/english/training/guide" title="ガイド" desc="トレーニングの遊び方。全部解説。" />
                                <FeatureLink href="/english/settings" title="設定" desc="サウンド、エフェクト、データ管理。" />
                            </div>
                        )}

                        {/* Footer */}
                        <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid #E7E5E4' }}>
                            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 8 }}>
                                ENGLISH QUEST RPG -- TONIO LAB
                            </div>
                            <div style={{ fontSize: 11, color: T.textMuted }}>
                                Built with Vibe Coding + Claude AI
                            </div>
                        </div>
                    </div>
                )}

                {/* ── DEMO MODE ── */}
                {phase === 'demo' && (
                    <div style={{ paddingTop: 40 }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: '0.2em', marginBottom: 8 }}>
                                QUICK DEMO
                            </div>
                            <div style={{ fontSize: 15, color: T.textSub }}>
                                日本語を見て → 英語を確認 → 覚えたらタップ
                            </div>
                        </div>
                        <InteractiveDemo onComplete={(stats) => {
                            setDemoStats(stats);
                            setPhase('results');
                        }} />
                    </div>
                )}

                {/* ── RESULTS ── */}
                {phase === 'results' && demoStats && (
                    <div style={{ paddingTop: 40 }}>
                        <DemoResults stats={demoStats} />
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Small feature link ──
function FeatureLink({ href, title, desc }: { href: string; title: string; desc: string }) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: T.surface, borderRadius: 12, padding: '16px 18px',
                boxShadow: T.shadow, border: '1px solid #E7E5E4',
                cursor: 'pointer', transition: 'all 0.2s ease',
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = T.shadowMd; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = T.shadow; }}
            >
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{title}</div>
                <p style={{ fontSize: 11, color: T.textSub, margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
        </Link>
    );
}
