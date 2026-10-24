'use client';

// ツッコミカード — DMM英会話・実録ボケのコレクションページ。
// トレーニング(/api/phrases)への登録とは独立した「眺めて笑って覚える」デッキ。
// データは kenshi-lessons.ts の mistakes を自動でカード化する(検死を足すと勝手に増える)。
// 表面: 実際の発言(ボケ)。タップで裏面: ツッコミ + 正解。

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { kenshiLessons } from '@/data/english/kenshi-lessons';

const PAPER = '#F7F4EE';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

interface TsukkomiCard {
    id: string;
    date: string;
    spoke: string;
    pattern: string;
    category: string;
    tsukkomi: string;
    drill: string;
    ja: string;
}

const CATEGORIES = ['すべて', '冠詞', '捏造語', 'be動詞', '前置詞', '三単現', '語選び', 'その他'] as const;

function categorize(pattern: string): string {
    if (/捏造|合成/.test(pattern)) return '捏造語';
    if (/冠詞|a落ち|a\+|謎出席|不可算|可算/.test(pattern)) return '冠詞';
    if (/be\+|be動詞|are tend|使役/.test(pattern)) return 'be動詞';
    if (/三単現/.test(pattern)) return '三単現';
    if (/to|前置詞/.test(pattern)) return '前置詞';
    if (/取り違え|語選び|直訳|イディオム|very|単語|人=概念|人と物/.test(pattern)) return '語選び';
    return 'その他';
}

export default function TsukkomiCardsPage() {
    const [category, setCategory] = useState<string>('すべて');
    const [flipped, setFlipped] = useState<Set<string>>(new Set());
    const [dateFilter, setDateFilter] = useState<string | null>(null);

    // 日めくりカレンダー(hub)から ?date=YYYY-MM-DD で来たら、その日だけ表示。
    useEffect(() => {
        const d = new URLSearchParams(window.location.search).get('date');
        if (d) setDateFilter(d);
    }, []);
    const clearDate = () => {
        setDateFilter(null);
        const u = new URL(window.location.href);
        u.searchParams.delete('date');
        window.history.replaceState(null, '', u);
    };

    const allCards: TsukkomiCard[] = useMemo(() =>
        kenshiLessons.flatMap((lesson) =>
            lesson.mistakes.map((m, i) => ({
                id: `${lesson.date}-${i}`,
                date: lesson.date,
                spoke: m.spoke,
                pattern: m.pattern,
                category: categorize(m.pattern),
                tsukkomi: m.note ?? '',
                drill: m.drill,
                ja: m.ja,
            }))
        ), []);

    const cards = allCards
        .filter((c) => category === 'すべて' || c.category === category)
        .filter((c) => !dateFilter || c.date === dateFilter);

    const toggle = (id: string) => {
        setFlipped((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const counts = useMemo(() => {
        const m = new Map<string, number>();
        for (const c of allCards) m.set(c.category, (m.get(c.category) ?? 0) + 1);
        return m;
    }, [allCards]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, padding: '0 0 90px', fontFamily: SANS, color: INK }}>
            {/* ===================== HEADER ===================== */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(32px, 6vw, 60px) 18px 0' }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px',
                    borderBottom: `3px solid ${INK}`, paddingBottom: '10px',
                }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase' }}>
                        The Boke Collection — All Real, All Mine
                    </span>
                    <span style={{ fontSize: '11px', letterSpacing: '1px', color: MUTED }}>実録 · 創作は一枚もありません</span>
                </div>
                <h1 style={{ fontFamily: SERIF, fontWeight: 900, margin: '22px 0 0', fontSize: 'clamp(38px, 7.5vw, 68px)', lineHeight: 1.15 }}>
                    ツッコミカード
                </h1>
                <p style={{ fontSize: '13.5px', lineHeight: 2, color: MUTED, margin: '14px 0 0', maxWidth: '640px' }}>
                    DMM英会話で実際に口から出たボケ、全{allCards.length}枚。表がボケ、裏がツッコミと正解。
                    暗記用ではなく、笑って眺めるためのコレクション(暗記したい人は各レッスンの検死からトレーニングへ)。
                    番組
                    <Link href="/english/tonight" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>『今夜も、通じない。』</Link>
                    と
                    <Link href="/english/magazine" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>月刊TOLERANCY</Link>
                    の原作資料庫でもある。
                </p>

                {/* 日付フィルタ(hubから) */}
                {dateFilter && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '18px', backgroundColor: INK, color: '#fff', borderRadius: '9px', padding: '8px 16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>{dateFilter} のツッコミ · {cards.length}枚</span>
                        <button onClick={clearDate} style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 700 }}>全部見る</button>
                    </div>
                )}

                {/* フィルタ */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '22px' }}>
                    {CATEGORIES.map((cat) => {
                        const on = category === cat;
                        const n = cat === 'すべて' ? allCards.length : (counts.get(cat) ?? 0);
                        if (cat !== 'すべて' && n === 0) return null;
                        return (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                style={{
                                    cursor: 'pointer', padding: '7px 14px', fontSize: '12px', fontWeight: 700,
                                    backgroundColor: on ? INK : CARD, color: on ? '#fff' : INK,
                                    border: on ? `2px solid ${INK}` : `1px solid ${LINE}`,
                                    borderRadius: '999px', transition: 'all 0.15s ease',
                                }}
                            >
                                {cat} <span style={{ opacity: 0.6, marginLeft: '4px' }}>{n}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ===================== CARDS ===================== */}
            <div style={{
                maxWidth: '1000px', margin: '26px auto 0', padding: '0 18px',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '14px',
            }}>
                {cards.map((c, idx) => {
                    const open = flipped.has(c.id);
                    return (
                        <button
                            key={c.id}
                            onClick={() => toggle(c.id)}
                            style={{
                                cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column',
                                backgroundColor: open ? PAPER : CARD,
                                border: open ? `2px solid ${INK}` : `1px solid ${LINE}`,
                                borderTop: `4px solid ${open ? '#10B981' : RED}`,
                                padding: '16px 18px', minHeight: '190px',
                                boxShadow: open ? '5px 5px 0 rgba(23,19,15,0.85)' : '0 2px 10px rgba(0,0,0,0.06)',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {/* 共通ヘッダ */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: '#fff',
                                    backgroundColor: open ? '#166534' : RED, padding: '3px 9px', whiteSpace: 'nowrap',
                                }}>
                                    {open ? 'ツッコミ' : `ボケ No.${String(idx + 1).padStart(3, '0')}`}
                                </span>
                                <span style={{ fontSize: '10px', color: MUTED, letterSpacing: '1px' }}>{c.date} · {c.category}</span>
                            </div>

                            {!open ? (
                                <>
                                    <div style={{
                                        fontFamily: SERIF, fontSize: '16.5px', fontWeight: 700, fontStyle: 'italic',
                                        color: INK, lineHeight: 1.65, margin: '14px 0 10px', flex: 1,
                                    }}>
                                        “{c.spoke}”
                                    </div>
                                    <div style={{ fontSize: '11px', color: MUTED, borderTop: `1px solid ${LINE}`, paddingTop: '8px' }}>
                                        {c.pattern} — タップでツッコミと正解
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontFamily: SERIF, fontSize: '12px', fontStyle: 'italic', color: MUTED, margin: '10px 0 8px', lineHeight: 1.5 }}>
                                        “{c.spoke}”
                                    </div>
                                    <div style={{ fontSize: '12.5px', color: INK, lineHeight: 1.9, flex: 1 }}>
                                        {c.tsukkomi}
                                    </div>
                                    <div style={{
                                        marginTop: '10px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2',
                                        borderLeft: '3px solid #10B981', padding: '10px 12px',
                                    }}>
                                        <div style={{ fontFamily: SERIF, fontSize: '14px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{c.drill}</div>
                                        <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '3px' }}>{c.ja}</div>
                                    </div>
                                </>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ===================== FOOTER ===================== */}
            <div style={{ maxWidth: '1000px', margin: '46px auto 0', padding: '0 18px' }}>
                <div style={{
                    borderTop: `3px solid ${INK}`, paddingTop: '14px',
                    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
                    fontSize: '11px', letterSpacing: '1.5px', color: MUTED, textTransform: 'uppercase',
                }}>
                    <span>新しいボケは毎晩25分、DMM英会話にて生産中</span>
                    <span>発行: 恥とあきらめの英会話編集部</span>
                </div>
            </div>
        </div>
    );
}
