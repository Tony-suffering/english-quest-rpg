'use client';

import { useState, useEffect } from 'react';
import { TOONPASS_FILMS, LESSON1 } from '@/data/english/toonpass';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

// フィルムのパーフォレーション(送り穴)風ボーダー
function FilmStrip({ flip = false }: { flip?: boolean }) {
    return (
        <div style={{
            height: '26px',
            background: INK,
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            padding: '0 18px',
            overflow: 'hidden',
            transform: flip ? 'scaleY(-1)' : undefined,
        }}>
            {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{
                    width: '14px', height: '10px', borderRadius: '2px',
                    background: CREAM, flexShrink: 0, opacity: 0.9,
                }} />
            ))}
        </div>
    );
}

function ClarityMeter({ value }: { value: number }) {
    return (
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                    width: '14px', height: '5px', borderRadius: '3px',
                    background: i < value ? GREEN : '#E7E5E4',
                }} />
            ))}
        </div>
    );
}

export default function ToonPassPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    useEffect(() => {
        const saved: Record<string, string> = {};
        LESSON1.prompts.forEach(p => {
            saved[p.id] = localStorage.getItem(`toonpass_l1_${p.id}`) || '';
        });
        setAnswers(saved);
        setRevealed(localStorage.getItem('toonpass_l1_revealed') === 'true');
    }, []);

    const setAnswer = (id: string, v: string) => {
        setAnswers(prev => ({ ...prev, [id]: v }));
        localStorage.setItem(`toonpass_l1_${id}`, v);
    };

    const openKenshi = () => {
        setRevealed(true);
        localStorage.setItem('toonpass_l1_revealed', 'true');
    };

    const pad = isMobile ? '0 18px' : '0 32px';
    const maxW = '980px';

    const Eyebrow = ({ children }: { children: React.ReactNode }) => (
        <div style={{
            fontSize: '11px', fontWeight: 800, letterSpacing: '4px',
            color: DEEPGOLD, marginBottom: '14px',
        }}>{children}</div>
    );

    const StepTag = ({ n, label }: { n: string; label: string }) => (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px' }}>
            <span style={{
                fontFamily: SERIF, fontSize: isMobile ? '30px' : '38px', fontWeight: 700,
                color: GOLD, lineHeight: 1,
            }}>{n}</span>
            <span style={{ fontSize: isMobile ? '17px' : '20px', fontWeight: 800, color: INK, letterSpacing: '1px' }}>{label}</span>
        </div>
    );

    return (
        <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif' }}>

            {/* ===== HERO ===== */}
            <FilmStrip />
            <div style={{ background: `linear-gradient(180deg, #FFF 0%, ${CREAM} 100%)`, padding: isMobile ? '56px 0 44px' : '88px 0 64px' }}>
                <div style={{ maxWidth: maxW, margin: '0 auto', padding: pad, textAlign: 'center' }}>
                    <Eyebrow>TOON PASS -- ANIMATION ONLY</Eyebrow>
                    <h1 style={{
                        fontFamily: SERIF, fontSize: isMobile ? '32px' : '52px', fontWeight: 700,
                        lineHeight: 1.3, margin: '0 0 22px', letterSpacing: '2px',
                    }}>
                        アニメ10本で、<br />英語圏を獲る。
                    </h1>
                    <p style={{ fontSize: isMobile ? '14px' : '16px', color: SUB, lineHeight: 2, maxWidth: '640px', margin: '0 auto' }}>
                        実写映画は中上級者でもまだ難しい。だから全部捨てて、アニメーションに絞った。<br />
                        スピーキング・リスニング・文化を、厳選10本で。あなたより先に、まず俺が実験台になる。
                    </p>

                    {/* なぜアニメか */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '14px', marginTop: '44px', textAlign: 'left',
                    }}>
                        {[
                            { t: '全セリフがスタジオ録音', b: 'アニメの声は現場録音ではなくブース収録。環境音と分離されていて、実写より圧倒的にクリアに聞こえる。' },
                            { t: '声優は声だけで演技する', b: '表情が使えない分、調音がオーバーアクト気味になる。子音がつぶれない。つまり構造的に聞き取りやすい。' },
                            { t: '文化の深さは実写に負けない', b: '嫉妬、偏見、死生観、夫婦喧嘩。ピクサーが30年かけて描いてきたのはアメリカ人の感情の教科書そのもの。' },
                        ].map((c, i) => (
                            <div key={i} style={{
                                background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '16px',
                                padding: '22px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px', color: INK }}>
                                    <span style={{ color: GOLD, marginRight: '8px' }}>{String(i + 1).padStart(2, '0')}</span>{c.t}
                                </div>
                                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9 }}>{c.b}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== 10本のカリキュラム ===== */}
            <div style={{ padding: isMobile ? '52px 0' : '80px 0' }}>
                <div style={{ maxWidth: maxW, margin: '0 auto', padding: pad }}>
                    <Eyebrow>THE TEN</Eyebrow>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '1px' }}>
                        厳選10本 -- 易しい順に登る
                    </h2>
                    <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.9, marginBottom: '34px' }}>
                        緑のメーターは聞き取りやすさ。1本目が最も易しく、10本目が卒業試験。場面は日常・親子・職場・口論・皮肉・批評まで網羅してある。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
                        {TOONPASS_FILMS.map(f => (
                            <div key={f.order} style={{
                                background: '#FFF', border: f.status === 'trial' ? `1.5px solid ${GOLD}` : '1px solid #E7E5E4',
                                borderRadius: '18px', padding: '22px 22px 20px', position: 'relative',
                                boxShadow: f.status === 'trial' ? '0 8px 28px rgba(212,175,55,0.18)' : '0 2px 12px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        fontFamily: SERIF, fontSize: '40px', fontWeight: 700, lineHeight: 1,
                                        color: f.status === 'trial' ? GOLD : '#D6D3D1', minWidth: '52px',
                                    }}>
                                        {String(f.order).padStart(2, '0')}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                            <div>
                                                <div style={{ fontSize: '16px', fontWeight: 800 }}>{f.jp}</div>
                                                <div style={{ fontSize: '11px', color: SUB, letterSpacing: '0.5px', marginTop: '2px' }}>
                                                    {f.en} ({f.year} / {f.studio})
                                                </div>
                                            </div>
                                            {f.status === 'trial' && (
                                                <span style={{
                                                    fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#FFF',
                                                    background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`,
                                                    padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap',
                                                }}>試作公開中</span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: DEEPGOLD, marginTop: '10px' }}>{f.role}</div>
                                        <div style={{ fontSize: '12px', color: '#57534E', lineHeight: 1.8, marginTop: '6px' }}>
                                            <span style={{ fontWeight: 700 }}>英語:</span> {f.english}<br />
                                            <span style={{ fontWeight: 700 }}>文化:</span> {f.culture}
                                        </div>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #E7E5E4',
                                        }}>
                                            <span style={{ fontSize: '11px', color: SUB }}>{f.scene}</span>
                                            <ClarityMeter value={f.clarity} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== LESSON 1 試作 ===== */}
            <FilmStrip />
            <div style={{ background: '#FFF', padding: isMobile ? '52px 0 60px' : '80px 0 90px' }}>
                <div style={{ maxWidth: maxW, margin: '0 auto', padding: pad }}>
                    <Eyebrow>TRIAL LESSON</Eyebrow>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '1px' }}>
                        Lesson 1 -- {LESSON1.filmJp}「{LESSON1.sceneTitle}」
                    </h2>
                    <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.9, marginBottom: '40px' }}>
                        訳は「何と言ったか」しか教えない。このレッスンが教えるのは「なぜそう言ったか」と「なぜ俺はそう言えないか」の2つ。
                    </p>

                    {/* STEP 0: シーン指定 */}
                    <div style={{
                        background: INK, color: CREAM, borderRadius: '18px',
                        padding: isMobile ? '24px 20px' : '30px 34px', marginBottom: '46px',
                    }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD, marginBottom: '14px' }}>SCENE</div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: isMobile ? '14px' : '10px 34px', fontSize: '13.5px', lineHeight: 1.8 }}>
                            <div style={{ fontWeight: 800, color: '#D6D3D1' }}>作品</div>
                            <div>{LESSON1.filmJp} ({LESSON1.film}, 1995)</div>
                            <div style={{ fontWeight: 800, color: '#D6D3D1' }}>タイムコード</div>
                            <div style={{ fontFamily: SERIF, fontSize: '20px', color: GOLD, fontWeight: 700 }}>{LESSON1.timecode}<span style={{ fontSize: '13px', color: '#D6D3D1', fontFamily: 'inherit', fontWeight: 400, marginLeft: '10px' }}>({LESSON1.duration}間)</span></div>
                            <div style={{ fontWeight: 800, color: '#D6D3D1' }}>目印</div>
                            <div style={{ color: '#E7E5E4' }}>{LESSON1.timecodeNote}</div>
                            <div style={{ fontWeight: 800, color: '#D6D3D1' }}>視聴</div>
                            <div style={{ color: '#E7E5E4' }}>{LESSON1.where}</div>
                        </div>
                    </div>

                    {/* STEP 1: 事前ブリーフ */}
                    <div style={{ marginBottom: '46px' }}>
                        <StepTag n="1" label="観る前に読む -- 場面の力学" />
                        <p style={{ fontSize: '12.5px', color: SUB, marginBottom: '16px', lineHeight: 1.8 }}>
                            「聞く、わからない、調べる」の順番は捨てる。先に日本語で内容を頭に入れて、わかっている内容を音で確認する。この逆転が体感難易度を一段落とす。
                        </p>
                        {LESSON1.brief.map((b, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '14px', padding: '16px 0',
                                borderBottom: i < LESSON1.brief.length - 1 ? '1px solid #F5F5F4' : 'none',
                            }}>
                                <div style={{ width: '4px', borderRadius: '2px', background: i === 2 ? GREEN : GOLD, flexShrink: 0 }} />
                                <p style={{ fontSize: '14px', lineHeight: 2, margin: 0, color: '#44403C' }}>{b}</p>
                            </div>
                        ))}
                    </div>

                    {/* STEP 2: 先に自分で言う */}
                    <div style={{ marginBottom: '46px' }}>
                        <StepTag n="2" label="観る前に、自分ならどう言うか書く" />
                        <p style={{ fontSize: '12.5px', color: SUB, marginBottom: '20px', lineHeight: 1.8 }}>
                            ここが訳本との決定的な差。比較対象の「自分の英語」が存在しない限り、乖離は測れない。声に出してから書くとなお良い。
                        </p>
                        {LESSON1.prompts.map((p, i) => (
                            <div key={p.id} style={{
                                background: CREAM, border: '1px solid #EDE9E0', borderRadius: '16px',
                                padding: '20px', marginBottom: '14px',
                            }}>
                                <div style={{ fontSize: '13.5px', fontWeight: 700, lineHeight: 1.8, marginBottom: '4px' }}>
                                    <span style={{ color: GOLD, fontFamily: SERIF, marginRight: '8px' }}>Q{i + 1}</span>{p.situation}
                                </div>
                                <div style={{ fontSize: '11.5px', color: SUB, marginBottom: '12px' }}>{p.hint}</div>
                                <textarea
                                    value={answers[p.id] || ''}
                                    onChange={e => setAnswer(p.id, e.target.value)}
                                    placeholder="英語で書く(下書きでいい。うまい必要はない、本音の実力で)"
                                    style={{
                                        width: '100%', minHeight: '64px', border: '1px solid #E7E5E4', borderRadius: '10px',
                                        padding: '12px 14px', fontSize: '14px', fontFamily: 'inherit', lineHeight: 1.7,
                                        background: '#FFF', color: INK, resize: 'vertical', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* STEP 3: 検死 */}
                    <div style={{ marginBottom: '46px' }}>
                        <StepTag n="3" label="検死 -- 実際のセリフとの乖離" />
                        {!revealed ? (
                            <div style={{
                                textAlign: 'center', background: CREAM, border: '1.5px dashed #D6D3D1',
                                borderRadius: '18px', padding: '44px 24px',
                            }}>
                                <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 2, marginBottom: '22px' }}>
                                    シーンを観て、Q1〜Q3に自分の英語を書いてから開くこと。<br />
                                    先に答えを見たら、このレッスンは訳本と同じものに堕ちる。
                                </p>
                                <button
                                    onClick={openKenshi}
                                    style={{
                                        background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#FFF',
                                        border: 'none', borderRadius: '12px', padding: '15px 44px',
                                        fontSize: '15px', fontWeight: 900, letterSpacing: '1px', cursor: 'pointer',
                                        boxShadow: '0 8px 24px rgba(212,175,55,0.35)',
                                    }}
                                >
                                    検死を開く
                                </button>
                            </div>
                        ) : (
                            <div>
                                {LESSON1.lines.map((l, i) => (
                                    <div key={i} style={{
                                        border: '1px solid #E7E5E4', borderRadius: '18px', overflow: 'hidden',
                                        marginBottom: '20px', background: '#FFF', boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                                    }}>
                                        {/* セリフ */}
                                        <div style={{ background: INK, padding: isMobile ? '20px 20px' : '24px 28px' }}>
                                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD, marginBottom: '8px' }}>
                                                {l.speaker.toUpperCase()}
                                            </div>
                                            <div style={{ fontFamily: SERIF, fontSize: isMobile ? '18px' : '22px', color: CREAM, lineHeight: 1.5 }}>
                                                &ldquo;{l.quote}&rdquo;
                                            </div>
                                        </div>
                                        <div style={{ padding: isMobile ? '20px' : '24px 28px' }}>
                                            {/* 乖離 */}
                                            <div style={{
                                                display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap',
                                                background: '#FEF9EC', border: '1px solid #F5E6BE', borderRadius: '12px',
                                                padding: '12px 16px', marginBottom: '18px',
                                            }}>
                                                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: DEEPGOLD }}>よくある日本人英語</span>
                                                <span style={{ fontSize: '14px', color: '#78350F', fontStyle: 'italic' }}>{l.gapJp}</span>
                                            </div>
                                            <Block label="検死" color={GOLD} body={l.kenshi} />
                                            <Block label="文化" color={GREEN} body={l.culture} />
                                            <Block label="持ち帰り" color={INK} body={l.takeaway} last />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* STEP 4: 捨てる許可 */}
                    <div style={{ marginBottom: '46px' }}>
                        <StepTag n="4" label="捨てる許可 -- この3分で聞き取らなくていい音" />
                        <p style={{ fontSize: '12.5px', color: SUB, marginBottom: '18px', lineHeight: 1.8 }}>
                            挫折の正体は「全部聞き取ろうとすること」。持ち帰るのは上の4行だけ。以下は捨てていいと、教材の側が公式に宣言する。
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
                            {LESSON1.discard.map((d, i) => (
                                <div key={i} style={{
                                    background: CREAM, border: '1px solid #EDE9E0', borderRadius: '14px', padding: '18px',
                                }}>
                                    <div style={{ fontSize: '12.5px', fontWeight: 800, marginBottom: '8px', color: '#57534E' }}>
                                        <span style={{ color: '#A8A29E', marginRight: '6px', textDecoration: 'line-through' }}>捨</span>{d.label}
                                    </div>
                                    <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9 }}>{d.body}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* STEP 5: 持ち帰りカード */}
                    <div>
                        <StepTag n="5" label="持ち帰り -- 明日使う3枚" />
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
                            {LESSON1.cards.map((c, i) => (
                                <div key={i} style={{
                                    background: `linear-gradient(160deg, #FFF 60%, #FDF8EC 100%)`,
                                    border: `1px solid ${GOLD}55`, borderRadius: '16px', padding: '20px',
                                    boxShadow: '0 4px 16px rgba(212,175,55,0.10)',
                                }}>
                                    <div style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{c.en}</div>
                                    <div style={{ fontSize: '12.5px', color: '#57534E', marginBottom: '10px' }}>{c.ja}</div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.8, borderTop: '1px dashed #E7E5E4', paddingTop: '10px' }}>{c.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 権利設計の注記 */}
                    <div style={{
                        marginTop: '56px', padding: '18px 22px', background: CREAM,
                        border: '1px solid #EDE9E0', borderRadius: '14px',
                        fontSize: '11.5px', color: SUB, lineHeight: 1.9,
                    }}>
                        本教材は映像・音声・スクリプト全文を一切配布しない。作品は各自が正規の配信サービスで視聴し、教材が提供するのはタイムコードと解説のみ。セリフの引用は批評・解説に必要な最小限の行数にとどめている。
                    </div>
                </div>
            </div>
            <FilmStrip flip />
        </div>
    );
}

function Block({ label, color, body, last = false }: { label: string; color: string; body: string; last?: boolean }) {
    return (
        <div style={{ display: 'flex', gap: '14px', marginBottom: last ? 0 : '16px' }}>
            <div style={{
                fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#FFF',
                background: color, borderRadius: '6px', padding: '4px 8px',
                height: 'fit-content', whiteSpace: 'nowrap', marginTop: '3px',
            }}>{label}</div>
            <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0, color: '#44403C', flex: 1 }}>{body}</p>
        </div>
    );
}
