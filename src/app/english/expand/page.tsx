'use client';

import { useState, useEffect } from 'react';
import { GAME_NIGHT_MOVES } from '@/data/english/expand-game-night';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function ExpandPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const [done, setDone] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    useEffect(() => {
        const o: Record<string, boolean> = {};
        const d: Record<string, boolean> = {};
        GAME_NIGHT_MOVES.forEach(m => {
            o[m.id] = localStorage.getItem(`expand_gn_open_${m.id}`) === 'true';
            d[m.id] = localStorage.getItem(`expand_gn_done_${m.id}`) === 'true';
        });
        setOpen(o); setDone(d);
    }, []);

    const openMove = (id: string) => {
        setOpen(prev => ({ ...prev, [id]: true }));
        localStorage.setItem(`expand_gn_open_${id}`, 'true');
    };
    const toggleDone = (id: string) => {
        setDone(prev => {
            const v = !prev[id];
            localStorage.setItem(`expand_gn_done_${id}`, String(v));
            return { ...prev, [id]: v };
        });
    };

    const doneCount = GAME_NIGHT_MOVES.filter(m => done[m.id]).length;
    const pad = isMobile ? '0 18px' : '0 32px';

    return (
        <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>

                {/* HERO */}
                <div style={{ padding: isMobile ? '48px 0 36px' : '72px 0 52px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: DEEPGOLD, marginBottom: '14px' }}>
                        EXPAND -- ONE MOVE, TEN WAYS
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '44px', fontWeight: 700, lineHeight: 1.35, margin: '0 0 18px', letterSpacing: '2px' }}>
                        口語10変化
                        <span style={{ display: 'block', fontSize: isMobile ? '15px' : '19px', color: SUB, marginTop: '10px', letterSpacing: '3px' }}>
                            Game Night (2018) 編
                        </span>
                    </h1>
                    <p style={{ fontSize: isMobile ? '13px' : '14.5px', color: SUB, lineHeight: 2.1, maxWidth: '620px', margin: '0 auto' }}>
                        セリフの暗記は「点」。会話力は、同じ意図を温度と関係性で言い分ける「面」。<br />
                        映画は1回観れば十分 -- 場面の記憶をアンカーにして、会話の手(move)10個 × 各10変化 = 100表現を面で入れる。
                    </p>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '26px',
                        background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '999px', padding: '8px 20px',
                    }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: SUB }}>習得</span>
                        <span style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 700, color: doneCount === GAME_NIGHT_MOVES.length ? GREEN : GOLD }}>
                            {doneCount} / {GAME_NIGHT_MOVES.length}
                        </span>
                        <span style={{ fontSize: '12px', color: SUB }}>手</span>
                    </div>
                </div>

                {/* 使い方 */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '44px',
                }}>
                    {[
                        ['1. お題を読む', '各カードの「お題」に対して、先に自分の英語を声に出す。書かなくていい、言えればいい。'],
                        ['2. 10変化を開く', '自分の答えと10通りを突き合わせる。持っていなかった温度・文体が伸びしろ。'],
                        ['3. 習得チェック', 'お題を見て3通り以上を即答できたら「習得」にする。10個全部は要らない、3つで面になる。'],
                    ].map(([t, b], i) => (
                        <div key={i} style={{ background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '14px', padding: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '6px', color: DEEPGOLD }}>{t}</div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9 }}>{b}</div>
                        </div>
                    ))}
                </div>

                {/* MOVES */}
                {GAME_NIGHT_MOVES.map((m, mi) => (
                    <div key={m.id} style={{
                        background: '#FFF', border: done[m.id] ? `1.5px solid ${GREEN}` : '1px solid #E7E5E4',
                        borderRadius: '20px', marginBottom: '22px', overflow: 'hidden',
                        boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
                    }}>
                        {/* header */}
                        <div style={{ padding: isMobile ? '22px 20px 0' : '28px 30px 0' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: SERIF, fontSize: isMobile ? '26px' : '32px', fontWeight: 700, color: done[m.id] ? GREEN : GOLD, lineHeight: 1 }}>
                                    {String(mi + 1).padStart(2, '0')}
                                </span>
                                <h2 style={{ fontSize: isMobile ? '16px' : '19px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>{m.title}</h2>
                                {done[m.id] && (
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#FFF', background: GREEN, padding: '3px 10px', borderRadius: '999px' }}>習得</span>
                                )}
                            </div>
                            <div style={{
                                fontSize: '12px', color: SUB, lineHeight: 1.9, marginTop: '12px',
                                paddingLeft: '12px', borderLeft: `3px solid ${GOLD}44`,
                            }}>
                                <span style={{ fontWeight: 800, color: DEEPGOLD, marginRight: '6px' }}>場面</span>{m.sceneJp}
                            </div>
                            <div style={{
                                background: CREAM, border: '1px solid #EDE9E0', borderRadius: '12px',
                                padding: '14px 16px', margin: '16px 0 18px', fontSize: '13.5px', fontWeight: 700, lineHeight: 1.8,
                            }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#FFF', background: INK, borderRadius: '6px', padding: '3px 8px', marginRight: '10px', verticalAlign: '2px' }}>お題</span>
                                {m.drillJp}
                            </div>
                        </div>

                        {/* body */}
                        {!open[m.id] ? (
                            <div style={{ padding: isMobile ? '0 20px 22px' : '0 30px 26px', textAlign: 'center' }}>
                                <button
                                    onClick={() => openMove(m.id)}
                                    style={{
                                        background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#FFF', border: 'none',
                                        borderRadius: '10px', padding: '12px 34px', fontSize: '13.5px', fontWeight: 900,
                                        letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 6px 18px rgba(212,175,55,0.3)',
                                    }}
                                >
                                    自分の答えを言ってから -- 10変化を開く
                                </button>
                            </div>
                        ) : (
                            <div style={{ padding: isMobile ? '0 20px 22px' : '0 30px 28px' }}>
                                {/* core */}
                                <div style={{ background: INK, borderRadius: '14px', padding: isMobile ? '16px 18px' : '18px 24px', marginBottom: '14px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD, marginBottom: '6px' }}>基準形</div>
                                    <div style={{ fontFamily: SERIF, fontSize: isMobile ? '17px' : '20px', color: CREAM }}>{m.core}</div>
                                    <div style={{ fontSize: '12px', color: '#D6D3D1', lineHeight: 1.8, marginTop: '8px' }}>{m.coreNote}</div>
                                </div>
                                {/* variations */}
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '10px' }}>
                                    {m.variations.map((v, vi) => (
                                        <div key={vi} style={{
                                            border: '1px solid #EDE9E0', borderRadius: '12px', padding: '13px 15px', background: '#FEFDFA',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    fontSize: '10px', fontWeight: 800, color: DEEPGOLD, background: '#F8F0D8',
                                                    borderRadius: '5px', padding: '2px 7px', whiteSpace: 'nowrap',
                                                }}>{v.tag}</span>
                                                <span style={{ fontSize: '14.5px', fontWeight: 700 }}>{v.en}</span>
                                            </div>
                                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.8, marginTop: '6px' }}>{v.note}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* done toggle */}
                                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                                    <button
                                        onClick={() => toggleDone(m.id)}
                                        style={{
                                            background: done[m.id] ? GREEN : '#FFF', color: done[m.id] ? '#FFF' : SUB,
                                            border: done[m.id] ? 'none' : '1px solid #D6D3D1', borderRadius: '999px',
                                            padding: '9px 22px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.5px',
                                        }}
                                    >
                                        {done[m.id] ? '習得済み (3通り即答できる)' : 'お題に3通り即答できたら押す'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* footer note */}
                <div style={{
                    margin: '40px 0 70px', padding: '18px 22px', background: '#FFF',
                    border: '1px solid #E7E5E4', borderRadius: '14px', fontSize: '11.5px', color: SUB, lineHeight: 1.9,
                }}>
                    アンカーは場面の説明のみでセリフの転載はしていない。変化形は全て自作。
                    次の編は別の映画で同じ10手を回すか、Game Night の別の手を掘るか -- 手(move)は映画をまたいで再利用できるのがこの方式の利点。
                </div>
            </div>
        </div>
    );
}
