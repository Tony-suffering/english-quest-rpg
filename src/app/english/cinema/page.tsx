'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CINEMA_EPISODES } from '@/data/english/cinema-episodes';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function CinemaPage() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const pad = isMobile ? '0 18px' : '0 32px';

    return (
        <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>

                {/* HERO */}
                <div style={{ padding: isMobile ? '48px 0 36px' : '72px 0 52px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: DEEPGOLD, marginBottom: '14px' }}>
                        CINEMA HARVEST -- WATCH CHEAP, HARVEST DEEP
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '44px', fontWeight: 700, lineHeight: 1.35, margin: '0 0 18px', letterSpacing: '2px' }}>
                        映画ハーベスト
                    </h1>
                    <p style={{ fontSize: isMobile ? '13px' : '14.5px', color: SUB, lineHeight: 2.1, maxWidth: '640px', margin: '0 auto' }}>
                        ¥400のレンタルを観るだけ観て、口語表現の収穫は後から焼く。JREクリップ方式の映画版。<br />
                        映画は教材じゃなく畑 -- 1本から会話の手(move)を採り、各手を10変化に膨らませ、文化で深化させる。<br />
                        これを積んだ先に、最後の難関「洋画を字幕なしで」がある。
                    </p>
                </div>

                {/* 3 STEPS */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '48px' }}>
                    {[
                        ['1. 観る (¥300-500)', 'YouTube/Apple TVの安レンタルでいい。B級ほど脚本が単純で、会話の手が剥き出しになる。メモは取らない、ただ観る。'],
                        ['2. 報告する', 'チャットで「映画観た: タイトル」と言うだけ。それが収穫の合図。'],
                        ['3. 収穫が焼かれる', '会話の手 × 10変化 + 文化の深化がエピソードとしてここに追加される。あとはお題に3通り即答できるまで回す。'],
                    ].map(([t, b], i) => (
                        <div key={i} style={{ background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '14px', padding: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '6px', color: DEEPGOLD }}>{t}</div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9 }}>{b}</div>
                        </div>
                    ))}
                </div>

                {/* EPISODES */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '20px' }}>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '28px', fontWeight: 700, margin: 0, letterSpacing: '1px' }}>
                        エピソード
                    </h2>
                    <span style={{ fontSize: '12px', color: SUB }}>
                        観た映画 {CINEMA_EPISODES.length} 本 / 収穫 {CINEMA_EPISODES.reduce((a, e) => a + e.exprCount, 0)} 表現
                    </span>
                </div>

                {CINEMA_EPISODES.map(ep => (
                    <Link key={ep.id} href={ep.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '20px',
                            padding: isMobile ? '22px 20px' : '26px 30px', marginBottom: '16px',
                            boxShadow: '0 2px 14px rgba(0,0,0,0.04)', cursor: 'pointer',
                            display: 'flex', gap: isMobile ? '16px' : '24px', alignItems: 'flex-start',
                            transition: 'box-shadow 0.2s',
                        }}>
                            <div style={{ fontFamily: SERIF, fontSize: isMobile ? '34px' : '44px', fontWeight: 700, color: GOLD, lineHeight: 1, minWidth: isMobile ? '48px' : '64px' }}>
                                {String(ep.no).padStart(2, '0')}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
                                    <div>
                                        <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800 }}>{ep.jpTitle}</div>
                                        <div style={{ fontSize: '11px', color: SUB, letterSpacing: '0.5px', marginTop: '3px' }}>
                                            {ep.enTitle} ({ep.year}) / {ep.genre} / {ep.source}
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, color: DEEPGOLD, background: '#F8F0D8',
                                        borderRadius: '999px', padding: '5px 14px', whiteSpace: 'nowrap',
                                    }}>
                                        {ep.moveCount}手 / {ep.exprCount}表現
                                    </span>
                                </div>
                                <div style={{ fontSize: '12.5px', color: '#57534E', lineHeight: 1.9, marginTop: '10px' }}>{ep.note}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: GREEN, marginTop: '10px' }}>
                                    エピソードを開く →
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* NEXT SLOT */}
                <div style={{
                    border: '1.5px dashed #D6D3D1', borderRadius: '20px',
                    padding: isMobile ? '26px 20px' : '32px 30px', marginBottom: '70px', textAlign: 'center',
                }}>
                    <div style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: '#D6D3D1', marginBottom: '8px' }}>
                        {String(CINEMA_EPISODES.length + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: SUB, marginBottom: '6px' }}>次の1本を観たら</div>
                    <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9 }}>
                        チャットで「映画観た: タイトル」-- それだけで収穫が始まる。<br />
                        候補: ガンズ&バレッツ CODE: White でも、TAGでも、¥400で借りたやつなら何でも。
                    </div>
                </div>
            </div>
        </div>
    );
}
