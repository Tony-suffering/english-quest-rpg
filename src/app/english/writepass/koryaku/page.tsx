// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/writepass/koryaku/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    KORYAKU_ARTICLES, CHARACTERS, WEEKS, TOTAL_DAYS,
    getArticleForDay, charById, weekOf,
} from '@/data/english/writepass-koryaku';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#EFEBDF';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

function Avatar({ id, size = 30 }: { id: string; size?: number }) {
    const c = charById(id);
    if (!c) return null;
    return (
        <span style={{
            flexShrink: 0, width: size, height: size, borderRadius: '50%',
            background: c.color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.42, fontWeight: 900, fontFamily: SERIF,
        }}>{c.name.slice(0, 1)}</span>
    );
}

export default function KoryakuPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [day, setDay] = useState(1);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const article = getArticleForDay(day);
    const week = WEEKS[weekOf(day)];

    return (
        <div style={{ background: CREAM, minHeight: '100vh', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>

            {/* HEADER */}
            <div style={{ background: '#fff', borderBottom: `1px solid ${LINE}`, padding: isMobile ? '16px' : '22px 32px' }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: GOLD }}>WRITE</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: INK }}>PASS</span>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px' }}>攻略読本</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: isMobile ? '16px' : '18px', fontWeight: 800 }}>1級ライティング研究会</p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: SUB }}>公開されない採点の輪郭、テンプレ対策の真実、要約まで。6人で攻略する30日の物語。</p>
                    <Link href="/english/write/days" style={{ textDecoration: 'none' }}>
                        <span style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', fontWeight: 800, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}55`, padding: '7px 14px', borderRadius: '99px' }}>
                            30日プログラム本体へ →
                        </span>
                    </Link>
                </div>
            </div>

            {/* CAST */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '16px' : '20px 32px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '2px', marginBottom: '10px' }}>CAST ・ 登場人物</div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '8px' }}>
                    {CHARACTERS.map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '10px 12px' }}>
                            <Avatar id={c.id} size={34} />
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '13px', fontWeight: 800 }}>{c.name} <span style={{ fontSize: '10px', color: c.color, fontWeight: 700 }}>{c.role}</span></div>
                                <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.tagline}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DAY NAV */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '16px 16px 0' : '22px 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => setDay(d => Math.max(1, d - 1))} disabled={day <= 1}
                    style={{ border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: day > 1 ? 'pointer' : 'not-allowed', color: day > 1 ? SUB : '#D6D3D1', fontSize: '13px' }}>{'< 前の日'}</button>
                <span style={{ fontSize: '13px', fontWeight: 800, color: SUB }}>Day {day} ・ Week {weekOf(day)}</span>
                <button onClick={() => setDay(d => Math.min(TOTAL_DAYS, d + 1))} disabled={day >= TOTAL_DAYS}
                    style={{ border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: day < TOTAL_DAYS ? 'pointer' : 'not-allowed', color: day < TOTAL_DAYS ? SUB : '#D6D3D1', fontSize: '13px' }}>{'次の日 >'}</button>
            </div>

            {/* ARTICLE */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '16px' : '20px 32px 40px' }}>
                {article ? (
                    <article style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '20px', padding: isMobile ? '24px 20px' : '40px 48px', boxShadow: '0 8px 30px rgba(212,175,55,0.06)' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '6px' }}>DAY {String(day).padStart(2, '0')} ・ WEEK {weekOf(day)} ｜ {week.title}</div>
                        <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '32px', fontWeight: 900, lineHeight: 1.35, margin: '0 0 6px' }}>{article.title}</h1>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: GOLD, marginBottom: '14px' }}>{article.theme}</div>
                        <p style={{ fontSize: isMobile ? '14px' : '15px', color: SUB, lineHeight: 1.9, margin: '0 0 26px', paddingBottom: '20px', borderBottom: `1px solid ${LINE}` }}>{article.hook}</p>

                        {/* STORY */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
                            {article.story.map((l, i) => {
                                if (l.who === 'narration') {
                                    return <p key={i} style={{ fontSize: '14px', color: '#57534E', lineHeight: 1.9, fontStyle: 'italic', margin: '4px 0' }}>{l.text}</p>;
                                }
                                const c = charById(l.who);
                                return (
                                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                        <Avatar id={l.who} size={32} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '11px', fontWeight: 800, color: c?.color, marginBottom: '3px' }}>{c?.name}</div>
                                            <div style={{ fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8, color: INK, background: '#FAFAF8', border: `1px solid ${LINE}`, borderRadius: '4px 14px 14px 14px', padding: '10px 14px' }}>{l.text}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* LESSON */}
                        <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: '20px', marginBottom: '26px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1.5px', marginBottom: '12px' }}>攻略 ／ STRATEGY</div>
                            {article.lesson.map((p, i) => (
                                <p key={i} style={{ fontSize: isMobile ? '14px' : '15px', color: '#3F3A33', lineHeight: 2, margin: '0 0 14px' }}>{p}</p>
                            ))}
                        </div>

                        {/* TEMPLATE NOTE */}
                        {article.templateNote && (
                            <div style={{ background: '#EFF6FF', border: '1px solid #3B82F633', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', letterSpacing: '1px', marginBottom: '6px' }}>テンプレ対策メモ</div>
                                <p style={{ fontSize: '13.5px', color: '#3F3A33', lineHeight: 1.85, margin: 0 }}>{article.templateNote}</p>
                            </div>
                        )}

                        {/* TAKEAWAY */}
                        <div style={{ background: '#FEF9E7', border: `1px solid ${GOLD}33`, borderRadius: '14px', padding: '18px 20px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1.5px', marginBottom: '10px' }}>今日の要点</div>
                            <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                {article.takeaway.map((t, i) => (
                                    <li key={i} style={{ fontSize: isMobile ? '13.5px' : '14px', color: INK, lineHeight: 1.8, marginBottom: '6px' }}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ) : (
                    <div style={{ background: '#fff', border: `1px dashed ${LINE}`, borderRadius: '20px', padding: '60px 20px', textAlign: 'center', color: SUB }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#57534E' }}>Day {day} は近日公開</div>
                        <div style={{ fontSize: '12px', marginTop: '6px' }}>現在 Day 1-{KORYAKU_ARTICLES.length} を公開中です</div>
                    </div>
                )}
            </div>

            {/* 30-DAY GRID */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '0 16px 48px' : '0 32px 56px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '10px' }}>30 DAYS</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
                    {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(d => {
                        const avail = !!getArticleForDay(d);
                        return (
                            <button key={d} onClick={() => avail && setDay(d)} disabled={!avail} title={`Day ${d}`}
                                style={{
                                    aspectRatio: '1', borderRadius: '6px', border: d === day ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                                    background: avail ? '#fff' : '#F5F3EC', color: avail ? SUB : '#D6D3D1',
                                    fontSize: '10px', fontWeight: 800, cursor: avail ? 'pointer' : 'default',
                                }}>{d}</button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
