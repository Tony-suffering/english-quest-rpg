'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FEATURES = [
    {
        label: 'JOURNAL',
        title: 'とにおのジャーナル',
        desc: '開発と英語学習の全記録。カレンダーUIで日付ごとに読める。',
        href: '/journal',
        color: '#D4AF37',
        stats: [
            { value: '--', label: 'ENTRIES' },
            { value: '--', label: 'DAYS' },
        ],
    },
    {
        label: 'VIBE CODING',
        title: 'バイブコーディング講座',
        desc: 'プログラミング知識ゼロからアプリを作る。Claude Codeの使い方を大工の例えで教える。',
        href: '/journal/vibe-coding',
        color: '#10B981',
        stats: [
            { value: '--', label: 'LESSONS' },
            { value: '--', label: 'CHAPTERS' },
        ],
    },
];

const JOURNAL_HIGHLIGHTS = [
    { id: '133', title: 'Vercelを捨てた日', tag: '開発' },
    { id: '115', title: '会話の骨格 -- 10の会話パターン', tag: '英語分析' },
    { id: '112', title: 'Miguel Rojasの英語を解剖する', tag: '英語分析' },
    { id: '111', title: '6ステップ流暢性メソッド', tag: '英語分析' },
    { id: '110', title: 'ネイティブの英語を構造分解する', tag: '英語分析' },
];

const LATEST = [
    { id: '133', title: 'Vercelを捨てた日', date: '2026-03-20' },
    { id: '132', title: 'Tokyo 52 -- 居酒屋TOEICの新シリーズ', date: '2026-03-19' },
    { id: '131', title: '俺語録310個の振り返り', date: '2026-03-18' },
    { id: '130', title: 'Memoriaの7ルール', date: '2026-03-17' },
    { id: '129', title: 'Requiem完走 -- 7シナリオの記録', date: '2026-03-16' },
];

const NOW_PLAYING = [
    { status: 'LIVE', title: '居酒屋TOEIC -- 30エピソード', desc: 'Part 5/6/7対策。居酒屋の会話でTOEICを解く。', color: '#10B981' },
    { status: 'BUILDING', title: 'Tokyo 52 -- 52話の英語ドラマ', desc: 'エピソード1制作中。表現・単語・リスニングの3タブ構成。', color: '#D4AF37' },
    { status: 'WRITING', title: 'note連載 -- バイブコーディング塾', desc: '毎週の記事にバイブコーディングのコツを載せてる。', color: '#78716C' },
];

const READING_PATH = [
    { step: '01', label: 'START HERE', title: 'まずはここから', desc: 'TOEIC 900点なのに喋れない男の話。なぜアプリを作り始めたか。', href: '/journal/1', color: '#D4AF37' },
    { step: '02', label: 'DEEP DIVES', title: '英語構造分析シリーズ', desc: 'ネイティブの英語を構造分解。Entry #110-112で発見した7つのルール。', href: '/journal/110', color: '#10B981' },
    { step: '03', label: 'DAILY READING', title: '今日のジャーナル', desc: '毎日更新される開発ログ。最新のエントリから読む。', href: '/journal', color: '#D4AF37' },
];

const TIMELINE = [
    { date: '2025-11', event: 'TOEIC 900点取得' },
    { date: '2025-12', event: 'アプリ開発開始（プログラミング経験ゼロ）' },
    { date: '2026-01', event: 'toniolab.com ローンチ' },
    { date: '2026-02', event: 'Memoria / Requiem 7シナリオ完成' },
    { date: '2026-03', event: 'メンバーシップ専用ページ開設' },
];

const BENEFITS = [
    { title: 'ジャーナル', desc: '開発ログ、英語分析、没ネタ、反省文。フィルターなし。' },
    { title: 'バイブコーディング講座', desc: 'プログラミング経験ゼロから始めるAIコーディング。' },
    { title: '英語構造分析レポート', desc: 'ネイティブ発話の構造分解。' },
    { title: '開発の裏側', desc: 'なぜその機能を作ったか。なぜ捨てたか。判断の全記録。' },
];

function Divider() {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, #D4AF3730 20%, #D4AF3760 50%, #D4AF3730 80%, transparent 100%)' }} />
        </div>
    );
}

export default function MembershipPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            {/* Top accent line */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #D4AF37, #10B981)' }} />

            {/* Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(250,250,249,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E7E5E4', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/" style={{ fontSize: 11, color: '#A8A29E', textDecoration: 'none', letterSpacing: '0.05em' }}>TONIO LAB</Link>
                    <span style={{ color: '#D6D3D1', fontSize: 11 }}>/</span>
                    <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, letterSpacing: '0.1em' }}>MEMBERS</span>
                </div>
                <Link href="/" style={{ fontSize: 11, color: '#A8A29E', textDecoration: 'none', letterSpacing: '0.05em' }}>TOP</Link>
            </div>

            {/* Journal Hero -- メインコンテンツ */}
            <section style={{ padding: '60px 24px 0', maxWidth: 800, margin: '0 auto' }}>
                <Link href="/journal" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                        borderRadius: 20,
                        padding: '56px 40px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #D4AF37, #10B981)' }} />
                        <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#D4AF37', fontWeight: 700, fontFamily: 'monospace', marginBottom: 20 }}>MAIN CONTENT</p>
                        <h2 style={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>とにおのジャーナル</h2>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, maxWidth: 500, marginBottom: 32 }}>
                            開発と英語学習の全記録。カレンダーUIで日付ごとに読める。没ネタ、反省文、未公開コンテンツ。フィルターなし。
                        </p>
                        <div style={{ display: 'block', padding: '20px 0', backgroundColor: '#D4AF37', color: '#000', borderRadius: 12, fontSize: 18, fontWeight: 900, letterSpacing: '0.05em', textAlign: 'center', marginTop: 8 }}>ジャーナルを開く</div>
                    </div>
                </Link>
            </section>

            {/* Sub hero text */}
            <section style={{ padding: '40px 24px 48px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.4em', color: '#D4AF37', fontWeight: 700, marginBottom: 16, fontFamily: 'monospace' }}>MEMBERS ONLY</p>
                <p style={{ fontSize: 15, color: '#78716C', lineHeight: 1.9, maxWidth: 600 }}>
                    TOEIC 900点なのに喋れない男が、自分で英語アプリを作ってる。武器はAIと根性だけ。かっこいい部分だけ見たい人は、たぶん間違えて入ってきた。
                </p>
            </section>

            <Divider />

            {/* Now Playing */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>NOW PLAYING</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {NOW_PLAYING.map((item) => (
                        <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 12 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', backgroundColor: item.color, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.1em', flexShrink: 0 }}>{item.status}</span>
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 4 }}>{item.title}</p>
                                <p style={{ fontSize: 12, color: '#78716C', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Divider />

            {/* Feature Cards */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>EXCLUSIVE CONTENT</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                    {FEATURES.map((f) => (
                        <Link key={f.label} href={f.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: '28px 24px', transition: 'all 0.2s ease' }}>
                                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: f.color, fontWeight: 700, fontFamily: 'monospace', marginBottom: 12 }}>{f.label}</p>
                                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1C1917', marginBottom: 8 }}>{f.title}</h3>
                                <p style={{ fontSize: 13, color: '#78716C', lineHeight: 1.8, marginBottom: 20 }}>{f.desc}</p>
                                <div style={{ display: 'flex', gap: 24 }}>
                                    {f.stats.map(s => (
                                        <div key={s.label}>
                                            <p style={{ fontSize: 24, fontWeight: 900, color: f.color }}>{s.value}</p>
                                            <p style={{ fontSize: 9, color: '#A8A29E', letterSpacing: '0.15em' }}>{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Divider />

            {/* Reading Path */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>READING PATH</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    {READING_PATH.map((p) => (
                        <Link key={p.step} href={p.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 14, padding: '24px 20px', position: 'relative', transition: 'all 0.2s ease' }}>
                                <span style={{ position: 'absolute', top: -10, left: 20, fontSize: 10, fontWeight: 700, color: '#fff', backgroundColor: p.color, padding: '3px 12px', borderRadius: 100, letterSpacing: '0.1em' }}>STEP {p.step}</span>
                                <p style={{ fontSize: 10, color: p.color, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 8, marginTop: 8 }}>{p.label}</p>
                                <p style={{ fontSize: 16, fontWeight: 800, color: '#1C1917', marginBottom: 6 }}>{p.title}</p>
                                <p style={{ fontSize: 12, color: '#78716C', lineHeight: 1.7 }}>{p.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Divider />

            {/* Latest Entries */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>LATEST ENTRIES</p>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, overflow: 'hidden' }}>
                    {LATEST.map((entry, i) => (
                        <Link key={entry.id} href={`/journal/${entry.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < LATEST.length - 1 ? '1px solid #F5F5F4' : 'none', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, fontFamily: 'monospace', minWidth: 36 }}>#{entry.id}</span>
                                <span style={{ fontSize: 14, color: '#44403C', fontWeight: 600 }}>{entry.title}</span>
                            </div>
                            <span style={{ fontSize: 11, color: '#A8A29E', fontFamily: 'monospace', flexShrink: 0 }}>{entry.date}</span>
                        </Link>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Link href="/journal" style={{ fontSize: 12, color: '#D4AF37', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em' }}>全エントリを見る</Link>
                </div>
            </section>

            <Divider />

            {/* Recommended */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>RECOMMENDED READING</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {JOURNAL_HIGHLIGHTS.map((h) => (
                        <Link key={h.id} href={`/journal/${h.id}`} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 12, textDecoration: 'none', color: 'inherit' }}>
                            <span style={{ fontSize: 11, color: '#D4AF37', fontWeight: 700, fontFamily: 'monospace', flexShrink: 0 }}>#{h.id}</span>
                            <span style={{ fontSize: 14, color: '#44403C', fontWeight: 600, flex: 1 }}>{h.title}</span>
                            <span style={{ fontSize: 10, color: '#fff', fontWeight: 600, backgroundColor: h.tag === '英語分析' ? '#D4AF37' : '#10B981', padding: '3px 10px', borderRadius: 100, letterSpacing: '0.05em', flexShrink: 0 }}>{h.tag}</span>
                        </Link>
                    ))}
                </div>
            </section>

            <Divider />

            {/* Timeline */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>TIMELINE</p>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 16, padding: 24 }}>
                    {TIMELINE.map((t, i) => (
                        <div key={t.date} style={{ display: 'flex', gap: 20, paddingBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 12 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: i === TIMELINE.length - 1 ? '#D4AF37' : '#E7E5E4', border: i === TIMELINE.length - 1 ? '2px solid #D4AF3740' : 'none', flexShrink: 0 }} />
                                {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, backgroundColor: '#E7E5E4', marginTop: 4 }} />}
                            </div>
                            <div style={{ paddingBottom: 4 }}>
                                <p style={{ fontSize: 11, color: '#A8A29E', fontFamily: 'monospace', marginBottom: 4 }}>{t.date}</p>
                                <p style={{ fontSize: 14, color: '#44403C', fontWeight: 600 }}>{t.event}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Divider />

            {/* Benefits */}
            <section style={{ padding: '56px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontFamily: 'monospace', marginBottom: 20 }}>MEMBERSHIP INCLUDES</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {BENEFITS.map((b) => (
                        <div key={b.title} style={{ padding: 20, backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: 12 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 8 }}>{b.title}</p>
                            <p style={{ fontSize: 12, color: '#78716C', lineHeight: 1.7 }}>{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Numbers */}
            <section style={{ padding: '40px 24px', maxWidth: 800, margin: '0 auto', borderTop: '1px solid #E7E5E4' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                    {[['100', 'YEN / MONTH'], ['--', 'ENTRIES'], ['--', 'CODING LESSONS'], ['--', 'DAYS STREAK']].map(([value, label]) => (
                        <div key={label} style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 28, fontWeight: 900, color: '#D4AF37' }}>{value}</p>
                            <p style={{ fontSize: 9, color: '#A8A29E', letterSpacing: '0.2em' }}>{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '40px 24px', maxWidth: 800, margin: '0 auto', borderTop: '1px solid #E7E5E4', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
                <Link href="/journal" style={{ fontSize: 12, color: '#78716C', textDecoration: 'none' }}>Journal</Link>
                <Link href="/journal/vibe-coding" style={{ fontSize: 12, color: '#78716C', textDecoration: 'none' }}>Vibe Coding</Link>
                <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#78716C', textDecoration: 'none' }}>note.com</a>
                <Link href="/" style={{ fontSize: 12, color: '#78716C', textDecoration: 'none' }}>TONIO LAB</Link>
            </footer>

            <div style={{ textAlign: 'center', padding: '16px 24px 40px', fontSize: 10, color: '#D6D3D1', letterSpacing: '0.1em' }}>TONIO LAB MEMBERSHIP</div>
        </div>
    );
}
