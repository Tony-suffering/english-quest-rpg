'use client';

// Podcast Deep Dive -- "なぜ英検1級・TOEIC満点でもネイティブ会話は聞けないのか"
// 核心は listening(生音の知覚)。読むだけでなく、1行ずつ・塊ごとに「音」で確かめられるように作る。

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
    DEEP_DIVE_META,
    WHY_POINTS,
    CHUNK_DEMOS,
    GLOSSARY,
    DOD_TRANSCRIPT,
} from '@/data/english/podcast-deep-dive';

const ACCENT = '#D4AF37';
const GOLD_DK = '#92400E';
const EMERALD = '#10B981';
const INK = '#1C1917';
const MUTED = '#78716C';
const FAINT = '#A8A29E';

function speak(text: string, rate: number) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    window.speechSynthesis.speak(u);
}

function PlayBtn({ text, rate, size = 30 }: { text: string; rate: number; size?: number }) {
    return (
        <button
            onClick={() => speak(text, rate)}
            title="音声を再生"
            style={{
                width: `${size}px`, height: `${size}px`, borderRadius: '8px', flexShrink: 0,
                border: '1px solid #E7E5E4', backgroundColor: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}
        >
            <svg width={size * 0.46} height={size * 0.46} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
        </button>
    );
}

export default function PodcastDeepDivePage() {
    const [rate, setRate] = useState(0.85);
    const [listenMode, setListenMode] = useState(false); // JP を隠す
    const [revealed, setRevealed] = useState<Set<string>>(new Set());

    const reveal = useCallback((key: string) => {
        setRevealed(prev => { const n = new Set(prev); n.add(key); return n; });
    }, []);

    const hasVideo = /^[A-Za-z0-9_-]{11}$/.test(DEEP_DIVE_META.youtubeId);

    const rates: { label: string; v: number }[] = [
        { label: 'ゆっくり', v: 0.7 },
        { label: '標準', v: 0.85 },
        { label: '速め', v: 1.0 },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', padding: '28px 20px 90px' }}>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>

                {/* 戻る導線 */}
                <Link href="/english/podcast" style={{ fontSize: '13px', color: '#1E40AF', textDecoration: 'none', fontWeight: 600 }}>
                    &larr; Podcast Harvest に戻る
                </Link>

                {/* Hero */}
                <div style={{
                    marginTop: '14px', backgroundColor: '#fff', borderRadius: '18px',
                    border: '1px solid #E7E5E4', padding: '28px 26px',
                    background: 'linear-gradient(135deg, #FFFBEB 0%, #fff 55%)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{
                            fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '0.08em',
                            padding: '4px 11px', borderRadius: '6px', backgroundColor: '#FEF3C7', textTransform: 'uppercase',
                        }}>
                            Podcast · Deep Dive
                        </span>
                        <span style={{ fontSize: '12px', color: MUTED, fontWeight: 600 }}>{DEEP_DIVE_META.show}</span>
                    </div>
                    <h1 style={{ fontSize: '27px', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.32, margin: '0 0 8px' }}>
                        {DEEP_DIVE_META.title}
                    </h1>
                    <p style={{ fontSize: '14px', color: MUTED, margin: '0 0 18px', lineHeight: 1.6 }}>
                        {DEEP_DIVE_META.subtitle}
                    </p>

                    {hasVideo && (
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom: '18px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${DEEP_DIVE_META.youtubeId}`}
                                title={DEEP_DIVE_META.title}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {DEEP_DIVE_META.thesis.map((p, i) => (
                            <p key={i} style={{
                                fontSize: '14px', color: '#44403C', lineHeight: 1.8, margin: 0,
                                paddingLeft: '14px', borderLeft: `3px solid ${i === DEEP_DIVE_META.thesis.length - 1 ? ACCENT : '#E7E5E4'}`,
                            }}>
                                {p}
                            </p>
                        ))}
                    </div>
                </div>

                {/* コントロール bar (sticky) */}
                <div style={{
                    position: 'sticky', top: 0, zIndex: 10, marginTop: '20px', marginBottom: '4px',
                    backgroundColor: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(6px)',
                    padding: '10px 0', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
                }}>
                    <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>再生速度</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {rates.map(r => (
                            <button key={r.v} onClick={() => setRate(r.v)} style={{
                                padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                                border: `1px solid ${rate === r.v ? ACCENT : '#E7E5E4'}`,
                                backgroundColor: rate === r.v ? '#FEF3C7' : '#fff',
                                color: rate === r.v ? GOLD_DK : MUTED,
                            }}>{r.label}</button>
                        ))}
                    </div>
                    <button onClick={() => setListenMode(m => !m)} style={{
                        marginLeft: 'auto', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                        border: `1px solid ${listenMode ? EMERALD : '#E7E5E4'}`,
                        backgroundColor: listenMode ? '#D1FAE5' : '#fff',
                        color: listenMode ? '#065F46' : MUTED,
                    }}>
                        {listenMode ? 'リスニングモード ON(訳を隠す)' : 'リスニングモード OFF'}
                    </button>
                </div>

                {/* ===== SECTION 1: 7つの解剖 ===== */}
                <SectionTitle no="1" en="THE ANATOMY" ja="なぜ聞けない・話せないのか — 7つの解剖" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {WHY_POINTS.map(pt => (
                        <div key={pt.no} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E7E5E4', padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    width: '32px', height: '32px', borderRadius: '9px', backgroundColor: '#FEF3C7',
                                    color: GOLD_DK, fontSize: '15px', fontWeight: 800,
                                }}>{pt.no}</span>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: INK, margin: '3px 0 0', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                                    {pt.title}
                                </h3>
                            </div>
                            <div style={{ margin: '12px 0 0 44px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                {pt.body.map((b, i) => (
                                    <p key={i} style={{ fontSize: '13.5px', color: '#44403C', lineHeight: 1.85, margin: 0 }}>{b}</p>
                                ))}
                                {pt.example && (
                                    <div style={{
                                        marginTop: '6px', padding: '12px 14px', backgroundColor: '#FAFAF9',
                                        borderRadius: '10px', borderLeft: `3px solid ${ACCENT}`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <PlayBtn text={pt.example.en} rate={rate} />
                                            <span style={{ fontSize: '14px', fontWeight: 700, color: INK, fontStyle: 'italic', lineHeight: 1.5 }}>
                                                &ldquo;{pt.example.en}&rdquo;
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.7, marginTop: '8px' }}>
                                            {pt.example.ja}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 2: チャンク実演 ===== */}
                <SectionTitle no="2" en="CHUNK vs WORD" ja="実演 — 1語ずつ拾う耳 vs 塊で受ける耳" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    同じ一文を、左=「日本人が拾おうとする細切れ」、右=「ネイティブが実際に投げている意味の塊」で並べた。塊(右)を1つずつ再生して、その単位で意味が立ち上がる感覚を作る。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {CHUNK_DEMOS.map((d, di) => (
                        <div key={di} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E7E5E4', padding: '18px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                <PlayBtn text={d.sentence} rate={rate} size={34} />
                                <span style={{ fontSize: '15px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{d.sentence}</span>
                            </div>
                            {!listenMode && (
                                <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: '4px 0 14px 44px' }}>{d.ja}</div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: listenMode ? '12px' : 0 }}>
                                <div style={{ padding: '12px', backgroundColor: '#FAFAF9', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: FAINT, letterSpacing: '0.04em', marginBottom: '8px' }}>
                                        日本人が拾う単位
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {d.jpWay.map((c, i) => (
                                            <span key={i} style={{
                                                fontSize: '12px', color: MUTED, backgroundColor: '#fff',
                                                border: '1px solid #E7E5E4', borderRadius: '6px', padding: '3px 7px',
                                            }}>{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ padding: '12px', backgroundColor: '#FFFBEB', borderRadius: '10px', border: `1px solid ${ACCENT}33` }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: GOLD_DK, letterSpacing: '0.04em', marginBottom: '8px' }}>
                                        実際の塊(タップで再生)
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                        {d.realWay.map((c, i) => (
                                            <button key={i} onClick={() => speak(c, rate)} style={{
                                                fontSize: '13px', fontWeight: 700, color: GOLD_DK, backgroundColor: '#FEF3C7',
                                                border: `1px solid ${ACCENT}`, borderRadius: '7px', padding: '4px 9px', cursor: 'pointer',
                                            }}>{c}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {!listenMode && (
                                <div style={{ fontSize: '12.5px', color: '#44403C', lineHeight: 1.8, marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #E7E5E4' }}>
                                    {d.note}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 3: 全文対訳 ===== */}
                <SectionTitle no="3" en="FULL TRANSCRIPT" ja="全文対訳 — 1行ずつ音で確かめる" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    英語を1行ずつ再生できる。「リスニングモード」を ON にすると日本語訳が隠れ、行をタップすると訳が出る。まず音だけで意味を予測し、外したところを訳で答え合わせする。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {DOD_TRANSCRIPT.map((seg, si) => (
                        <div key={si} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E7E5E4', overflow: 'hidden' }}>
                            <div style={{
                                padding: '8px 16px', backgroundColor: '#F5F5F4', borderBottom: '1px solid #E7E5E4',
                                fontSize: '12px', fontWeight: 800, color: MUTED, letterSpacing: '0.03em',
                            }}>
                                {seg.time}
                            </div>
                            <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {seg.lines.map((ln, li) => {
                                    const key = `${si}:${li}`;
                                    const showJa = !listenMode || revealed.has(key);
                                    return (
                                        <div key={li} style={{ padding: '8px 0', borderBottom: li < seg.lines.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                <PlayBtn text={ln.en} rate={rate} size={28} />
                                                <span style={{ flex: 1, fontSize: '14px', fontWeight: 600, color: INK, lineHeight: 1.6 }}>
                                                    {ln.en}
                                                </span>
                                            </div>
                                            {showJa ? (
                                                <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: '4px 0 0 38px' }}>
                                                    {ln.ja}
                                                </div>
                                            ) : (
                                                <button onClick={() => reveal(key)} style={{
                                                    margin: '4px 0 0 38px', fontSize: '11px', fontWeight: 700, color: EMERALD,
                                                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                                                }}>
                                                    訳を表示
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 4: グロッサリー ===== */}
                <SectionTitle no="4" en="THE KNOWLEDGE WALL" ja="専門用語 — 英語以前の壁" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    音が聞こえても、これらを知らないと意味が結びつかない。ネイティブは英語を聞いているだけでなく、自分が知っている世界を使って聞いている。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                    {GLOSSARY.map((g, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4', padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                <PlayBtn text={g.term} rate={rate} size={26} />
                                <span style={{ fontSize: '15px', fontWeight: 800, color: INK }}>{g.term}</span>
                            </div>
                            {g.reading && (
                                <div style={{ fontSize: '11px', color: FAINT, margin: '0 0 5px 34px' }}>{g.reading}</div>
                            )}
                            <div style={{ fontSize: '11.5px', color: MUTED, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 4px' }}>{g.en}</div>
                            <div style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.7 }}>{g.ja}</div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div style={{
                    marginTop: '28px', padding: '18px 20px', backgroundColor: '#FFFBEB', borderRadius: '14px',
                    border: `1px solid ${ACCENT}33`, fontSize: '13px', color: '#44403C', lineHeight: 1.9,
                }}>
                    足りないのは難単語ではありません。<b>英語を正しく完成させる力ではなく、英語で適当に反応し続ける力。</b>
                    まずこの回を、訳を隠して音だけで3周する。1周目で「どの塊で切れているか」、2周目で「今このセリフは説明・皮肉・物真似・ボケのどれか」、3周目で「自分ならどう雑に返すか」を追う。試験の耳から、会話の耳へ。
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ no, en, ja }: { no: string; en: string; ja: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '34px 0 14px', paddingBottom: '8px', borderBottom: `2px solid ${INK}` }}>
            <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px',
                borderRadius: '50%', backgroundColor: INK, color: '#fff', fontSize: '13px', fontWeight: 800,
            }}>{no}</span>
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', color: ACCENT }}>{en}</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: INK }}>{ja}</span>
        </div>
    );
}
