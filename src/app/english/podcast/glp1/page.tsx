'use client';

// Podcast Deep Dive #2 -- "なぜ、この15分のプレゼンは人を動かすのか"
// 素材: JRE "The Dangerous Precedent Behind Big Pharma's GLP-1 Patents" (Brigham Buhler)
// 前回(/english/podcast/why)がリスニング解剖なら、今回は説得術の解剖。
// 論の設計図 → 7つの技術 → 盗める型 → イディオム → 全文対訳 → 用語集。

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
    GLP1_META,
    GLP1_ARGUMENT_MAP,
    GLP1_MOVES,
    GLP1_STEAL_LINES,
    GLP1_IDIOMS,
    GLP1_GLOSSARY,
    GLP1_TRANSCRIPT,
} from '@/data/english/podcast-glp1';

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

export default function PodcastGlp1DeepDivePage() {
    const [rate, setRate] = useState(0.85);
    const [listenMode, setListenMode] = useState(false); // JP を隠す
    const [revealed, setRevealed] = useState<Set<string>>(new Set());

    const reveal = useCallback((key: string) => {
        setRevealed(prev => { const n = new Set(prev); n.add(key); return n; });
    }, []);

    const hasVideo = /^[A-Za-z0-9_-]{11}$/.test(GLP1_META.youtubeId);

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '0.08em',
                            padding: '4px 11px', borderRadius: '6px', backgroundColor: '#FEF3C7', textTransform: 'uppercase',
                        }}>
                            Podcast · Deep Dive #2
                        </span>
                        <span style={{ fontSize: '12px', color: MUTED, fontWeight: 600 }}>{GLP1_META.show}</span>
                    </div>
                    <h1 style={{ fontSize: '27px', fontWeight: 800, color: INK, letterSpacing: '-0.02em', lineHeight: 1.32, margin: '0 0 8px' }}>
                        {GLP1_META.title}
                    </h1>
                    <p style={{ fontSize: '14px', color: MUTED, margin: '0 0 6px', lineHeight: 1.6 }}>
                        {GLP1_META.subtitle}
                    </p>
                    <p style={{ fontSize: '12.5px', color: FAINT, margin: '0 0 18px', lineHeight: 1.6 }}>
                        {GLP1_META.guest}
                    </p>

                    {hasVideo && (
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom: '18px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${GLP1_META.youtubeId}`}
                                title={GLP1_META.title}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {GLP1_META.thesis.map((p, i) => (
                            <p key={i} style={{
                                fontSize: '14px', color: '#44403C', lineHeight: 1.8, margin: 0,
                                paddingLeft: '14px', borderLeft: `3px solid ${i === GLP1_META.thesis.length - 1 ? ACCENT : '#E7E5E4'}`,
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

                {/* ===== SECTION 1: 論の設計図 ===== */}
                <SectionTitle no="1" en="THE ARGUMENT MAP" ja="論の設計図 — 15分で何を、どの順に仕掛けたか" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    即興に聞こえて、順番は完全に設計されている。つかみ → 信頼構築 → 前提破壊 → 数字 → 争点の付け替え → 矛盾の提示 → ビジョン。各ビートのセリフを再生しながら、この15分を「構成」として聞き直す。
                </p>
                <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E7E5E4', padding: '8px 0' }}>
                    {GLP1_ARGUMENT_MAP.map((b, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: '14px', padding: '14px 20px',
                            borderBottom: i < GLP1_ARGUMENT_MAP.length - 1 ? '1px solid #F5F5F4' : 'none',
                        }}>
                            <div style={{ width: '52px', flexShrink: 0, textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: GOLD_DK }}>{b.time}</div>
                            </div>
                            <div style={{ width: '3px', flexShrink: 0, borderRadius: '2px', backgroundColor: i % 2 === 0 ? ACCENT : '#E7E5E4' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: INK }}>{b.label}</span>
                                    <span style={{
                                        fontSize: '10.5px', fontWeight: 800, color: GOLD_DK, letterSpacing: '0.04em',
                                        padding: '2px 8px', borderRadius: '5px', backgroundColor: '#FEF3C7',
                                    }}>{b.move}</span>
                                </div>
                                <p style={{ fontSize: '12.5px', color: '#57534E', lineHeight: 1.75, margin: 0 }}>{b.detail}</p>
                                {b.quote && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                        <PlayBtn text={b.quote} rate={rate} size={26} />
                                        <span style={{ fontSize: '12.5px', fontStyle: 'italic', color: MUTED, lineHeight: 1.5 }}>
                                            &ldquo;{b.quote}&rdquo;
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 2: 説得の7技術 ===== */}
                <SectionTitle no="2" en="THE ANATOMY" ja="なぜ効くのか — 説得の7つの解剖" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {GLP1_MOVES.map(pt => (
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

                {/* ===== SECTION 3: 盗める型 ===== */}
                <SectionTitle no="3" en="STEAL THIS" ja="盗める型 — 明日の会議で使える12の構文" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    彼の武器を、そのまま使えるテンプレートに剥がした。上段=型、下段=実際のセリフ。型ごと音読して、口に置いておく。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {GLP1_STEAL_LINES.map((s, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E7E5E4', padding: '16px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <PlayBtn text={s.template.replace(/\.\.\./g, '')} rate={rate} size={30} />
                                <span style={{
                                    fontSize: '15.5px', fontWeight: 800, color: GOLD_DK, lineHeight: 1.5,
                                    backgroundColor: '#FFFBEB', padding: '3px 10px', borderRadius: '7px', border: `1px solid ${ACCENT}44`,
                                }}>
                                    {s.template}
                                </span>
                                <span style={{ fontSize: '12.5px', color: MUTED, fontWeight: 600 }}>{s.ja}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '10px 0 0 40px' }}>
                                <PlayBtn text={s.quote} rate={rate} size={26} />
                                <span style={{ fontSize: '13px', fontStyle: 'italic', color: '#57534E', lineHeight: 1.65 }}>
                                    &ldquo;{s.quote}&rdquo;
                                </span>
                            </div>
                            <div style={{ fontSize: '12.5px', color: '#44403C', lineHeight: 1.8, margin: '10px 0 0 40px', paddingTop: '8px', borderTop: '1px dashed #E7E5E4' }}>
                                {s.note}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 4: イディオム武器庫 ===== */}
                <SectionTitle no="4" en="IDIOM ARSENAL" ja="イディオム武器庫 — 直訳では絶対に出てこない16連発" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    この15分は比喩の見本市でもある。juice worth the squeeze、cook the books、bat signal — 全部この会話の実弾。直訳 → 実際の意味 → 実セリフの順で潰す。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                    {GLP1_IDIOMS.map((g, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4', padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                <PlayBtn text={g.phrase} rate={rate} size={26} />
                                <span style={{ fontSize: '15px', fontWeight: 800, color: INK }}>{g.phrase}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: FAINT, lineHeight: 1.6, margin: '0 0 3px' }}>直訳: {g.literal}</div>
                            <div style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.7, marginBottom: '7px' }}>{g.meaning}</div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', paddingTop: '7px', borderTop: '1px dashed #F5F5F4' }}>
                                <PlayBtn text={g.quote} rate={rate} size={22} />
                                <span style={{ fontSize: '11.5px', fontStyle: 'italic', color: MUTED, lineHeight: 1.6 }}>&ldquo;{g.quote}&rdquo;</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SECTION 5: 全文対訳 ===== */}
                <SectionTitle no="5" en="FULL TRANSCRIPT" ja="全文対訳 — 1行ずつ音で確かめる" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    英語を1行ずつ再生できる。「リスニングモード」を ON にすると日本語訳が隠れ、行をタップすると訳が出る。1周目は意味、2周目は「今どの技を使っているか」を設計図と照合しながら聞く。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {GLP1_TRANSCRIPT.map((seg, si) => (
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

                {/* ===== SECTION 6: 用語集 ===== */}
                <SectionTitle no="6" en="THE KNOWLEDGE WALL" ja="専門用語 — 英語以前の壁" />
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.8, margin: '-4px 0 14px' }}>
                    製薬・特許・米国医療制度の前提知識がないと、音が聞こえても意味が結びつかない。逆にこの25語を先に潰しておけば、この15分は「知っている世界の話」に変わる。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                    {GLP1_GLOSSARY.map((g, i) => (
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
                    この15分の主役は語彙ではなく、<b>順番と武器の選択</b>です。おすすめの周回: 1周目は対訳で内容を取る。2周目は「論の設計図」を横に置いて、今どの技が発動しているかを実況する。3周目は「盗める型」を音読してから、訳を隠して音だけで通す。聞く教材が、そのまま話す教材に変わります。
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
