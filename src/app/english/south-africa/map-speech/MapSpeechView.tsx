'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import EnglishSidebar from '@/components/EnglishSidebar';

// 90-second no-script map speech trainer for the next South Africa lesson.
// The dossier (07-04) was read aloud; this page exists so the next round is
// spoken from a map with no script: "next time I want to stand beside him
// with a map of my own."

interface Beat {
    num: number;
    seconds: string;
    title: string;
    titleJa: string;
    keywords: string[];
    // Revealed only when stuck -- short SVO chunks, 2-3 per beat
    chunks: string[];
    color: string;
    bg: string;
}

const BEATS: Beat[] = [
    {
        num: 1,
        seconds: '0:00 - 0:15',
        title: 'The Western Cape',
        titleJa: '西ケープ(先生の家から始める)',
        keywords: ['your mountain', 'DA runs it', 'semigration', '10 points below'],
        chunks: [
            'Let me start with your province.',
            'The DA runs the Western Cape, and it works.',
            'People are semigrating here from the rest of the country.',
        ],
        color: '#059669',
        bg: '#F0FDFA',
    },
    {
        num: 2,
        seconds: '0:15 - 0:40',
        title: 'Johannesburg / Gauteng',
        titleJa: 'ヨハネスブルグ(対比)',
        keywords: ['potholes', 'refuse', 'coalition', 'twist: 200 days no load shedding'],
        chunks: [
            'Johannesburg is the contrast. The city is falling apart.',
            'Potholes, refuse, a coalition that keeps changing.',
            "But here's the twist -- the grid hit 200 days of zero load shedding.",
        ],
        color: '#D97706',
        bg: '#FFFBEB',
    },
    {
        num: 3,
        seconds: '0:40 - 1:05',
        title: 'KZN + the borders',
        titleJa: 'クワズール・ナタールと国境(移民)',
        keywords: ['Durban = origin', 'ANC coalition (not MK!)', 'Zimbabwe 1.3M', 'June 30 deadline', 'scapegoat'],
        chunks: [
            'The unrest started in Durban and spread.',
            'And you corrected me here -- the ANC coalition still governs KZN, not the MK.',
            'Zimbabweans alone are 1.3 million. Migrants are the scapegoat, employers are the fire.',
        ],
        color: '#2563EB',
        bg: '#EFF6FF',
    },
    {
        num: 4,
        seconds: '1:05 - 1:30',
        title: 'The imaginary lines',
        titleJa: '締め: 想像上の国境線→マンデラ',
        keywords: ['Berlin Conference', 'a ruler on a map', 'Mandela', 'what the time required'],
        chunks: [
            'Every border on this map is an imaginary line drawn in Berlin.',
            'No African was in the room.',
            'And Mandela? He was what the time required. Not that he was perfect.',
        ],
        color: '#8a6d1a',
        bg: '#FFFBEB',
    },
];

const RULES = [
    '原稿を読まない。見ていいのは地図とキーワードだけ',
    '詰まったら短いSVOで言い切る: I know the layout. 細部は後づけ',
    'you know は3回まで。言い直し(#18)を始めたら文を捨てて次の文へ',
];

const AMMO = [
    'I came prepared this time.',
    'This all came from our last lesson.',
    'He was what the time required.',
    'Not that he was perfect.',
    "You've lived through all of this.",
    'You can just point them out.',
    'The death toll was at least four.',
    'Half of the credit goes to me.',
];

const TOTAL_SECONDS = 90;

export default function MapSpeechView() {
    const [remaining, setRemaining] = useState(TOTAL_SECONDS);
    const [running, setRunning] = useState(false);
    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        setRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [running]);

    const reset = () => { setRunning(false); setRemaining(TOTAL_SECONDS); };
    const mm = Math.floor(remaining / 60);
    const ss = String(remaining % 60).padStart(2, '0');
    const elapsed = TOTAL_SECONDS - remaining;
    const activeBeat = elapsed < 15 ? 1 : elapsed < 40 ? 2 : elapsed < 65 ? 3 : 4;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1,
                maxWidth: 820,
                margin: '0 auto',
                padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1c1917',
            }}>
                <header style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>Map Speech · South Africa</div>
                    <h1 style={{ fontSize: 30, fontWeight: 700, margin: '6px 0 12px', letterSpacing: 0.5 }}>地図で話す -- 90秒ノースクリプト</h1>
                    <p style={{ fontSize: 15, lineHeight: 1.9, color: '#44403c', margin: 0 }}>
                        前回(7/4)は原稿を読んだ。今回は読まない。地図とキーワードだけで90秒、自分の言葉で南アフリカを一周する。
                        朗読中はミスゼロ、地の喋りで崩れる -- だからこの練習は地の喋りしかない。
                    </p>
                    <div style={{ marginTop: 12, padding: '12px 16px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 10, fontSize: 13, lineHeight: 1.8, color: '#57534e', fontStyle: 'italic' }}>
                        &quot;Next time I want to stand beside him with a map of my own.&quot; -- 7/4のドシエに自分で書いた一文
                    </div>
                </header>

                {/* Map */}
                <section style={{ marginBottom: 28 }}>
                    <svg viewBox="0 0 560 420" style={{ width: '100%', height: 'auto', background: 'white', border: '1px solid #e7e5e4', borderRadius: 14 }}>
                        {/* neighbors */}
                        <text x="120" y="52" fontSize="12" fill="#a8a29e" letterSpacing="2">NAMIBIA</text>
                        <text x="255" y="40" fontSize="12" fill="#a8a29e" letterSpacing="2">BOTSWANA</text>
                        <text x="392" y="34" fontSize="12" fill="#a8a29e" letterSpacing="2">ZIMBABWE</text>
                        <text x="472" y="96" fontSize="12" fill="#a8a29e" letterSpacing="2" transform="rotate(62 472 96)">MOZAMBIQUE</text>

                        {/* migration arrows */}
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#DC2626" />
                            </marker>
                        </defs>
                        <line x1="410" y1="44" x2="392" y2="86" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#arrow)" />
                        <line x1="486" y1="120" x2="452" y2="150" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#arrow)" />
                        <text x="415" y="70" fontSize="10.5" fill="#DC2626" fontWeight="700">1.3M</text>

                        {/* country body (stylized) */}
                        <path
                            d="M 90 90
                               L 250 62 L 360 56 L 405 88 L 440 96 L 462 130
                               L 470 170 L 452 214 L 470 240
                               L 440 300 L 380 352 L 300 382 L 210 380
                               L 150 350 L 108 300 L 92 240 L 76 170 Z"
                            fill="#F5F5F4" stroke="#d6d3d1" strokeWidth="2"
                        />

                        {/* Western Cape */}
                        <path d="M 76 170 L 92 240 L 108 300 L 150 350 L 210 380 L 218 330 L 176 296 L 148 250 L 120 210 L 96 182 Z"
                            fill="rgba(16,185,129,0.16)" stroke="#059669" strokeWidth="2" />
                        <circle cx="128" cy="332" r="6" fill="#059669" />
                        <text x="140" y="336" fontSize="13" fontWeight="700" fill="#065F46">Cape Town</text>
                        <text x="96" y="262" fontSize="11.5" fill="#065F46" fontWeight="700">WESTERN CAPE</text>
                        <circle cx="104" cy="286" r="11" fill="#059669" />
                        <text x="104" y="290" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">1</text>

                        {/* Gauteng */}
                        <ellipse cx="352" cy="128" rx="42" ry="30" fill="rgba(217,119,6,0.16)" stroke="#D97706" strokeWidth="2" />
                        <circle cx="344" cy="136" r="6" fill="#D97706" />
                        <text x="300" y="172" fontSize="13" fontWeight="700" fill="#92400E">Johannesburg</text>
                        <circle cx="360" cy="112" r="4" fill="#D97706" />
                        <text x="368" y="108" fontSize="11" fill="#92400E">Pretoria</text>
                        <circle cx="392" cy="140" r="11" fill="#D97706" />
                        <text x="392" y="144" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">2</text>

                        {/* KZN */}
                        <path d="M 452 214 L 470 240 L 440 300 L 404 320 L 396 268 L 416 232 Z"
                            fill="rgba(37,99,235,0.14)" stroke="#2563EB" strokeWidth="2" />
                        <circle cx="428" cy="292" r="6" fill="#2563EB" />
                        <text x="358" y="310" fontSize="13" fontWeight="700" fill="#1E40AF">Durban</text>
                        <text x="404" y="226" fontSize="11" fill="#1E40AF" fontWeight="700">KZN</text>
                        <circle cx="452" cy="252" r="11" fill="#2563EB" />
                        <text x="452" y="256" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">3</text>

                        {/* Lesotho */}
                        <ellipse cx="352" cy="252" rx="26" ry="20" fill="white" stroke="#d6d3d1" strokeWidth="2" />
                        <text x="352" y="256" fontSize="9.5" fill="#a8a29e" textAnchor="middle">LESOTHO</text>

                        {/* border = imaginary line marker */}
                        <circle cx="250" cy="62" r="11" fill="#8a6d1a" />
                        <text x="250" y="66" fontSize="12" fontWeight="700" fill="white" textAnchor="middle">4</text>
                        <text x="196" y="88" fontSize="11" fill="#8a6d1a" fontWeight="700">imaginary lines</text>
                    </svg>
                    <p style={{ fontSize: 12, color: '#a8a29e', margin: '8px 2px 0' }}>
                        ルート: 1 西ケープ(先生の家) → 2 ヨハネスブルグ → 3 KZN+国境 → 4 想像上の線とマンデラ。赤い点線=ジンバブエ/モザンビークからの移民の流れ。
                    </p>
                </section>

                {/* Timer */}
                <section style={{ marginBottom: 28, padding: '20px 24px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 44, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: remaining <= 10 && remaining > 0 ? '#DC2626' : '#1c1917', minWidth: 120 }}>
                        {mm}:{ss}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button
                            onClick={() => (remaining === 0 ? reset() : setRunning(r => !r))}
                            style={{ padding: '10px 24px', fontSize: 14, fontWeight: 700, letterSpacing: 1, border: 'none', borderRadius: 10, cursor: 'pointer', background: running ? '#57534e' : '#059669', color: 'white' }}
                        >
                            {remaining === 0 ? 'RESET' : running ? 'PAUSE' : 'START 90s'}
                        </button>
                        <button onClick={reset} style={{ padding: '10px 18px', fontSize: 14, fontWeight: 600, border: '1px solid #e7e5e4', borderRadius: 10, cursor: 'pointer', background: 'white', color: '#78716c' }}>
                            reset
                        </button>
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                        <div style={{ height: 8, background: '#f5f5f4', borderRadius: 999, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(elapsed / TOTAL_SECONDS) * 100}%`, background: '#D4AF37', transition: 'width 1s linear' }} />
                        </div>
                        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 6 }}>
                            {running ? `今いるべき場所: Beat ${activeBeat}` : '90秒で地図を一周。録音しながらやると次のレッスンの弾になる'}
                        </div>
                    </div>
                </section>

                {/* Beats */}
                <section style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
                    {BEATS.map(b => (
                        <div key={b.num} style={{
                            padding: '18px 20px',
                            background: running && activeBeat === b.num ? b.bg : 'white',
                            border: `1px solid ${running && activeBeat === b.num ? b.color : '#e7e5e4'}`,
                            borderRadius: 12,
                            transition: 'all 0.3s ease',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: 'white', background: b.color, borderRadius: 999, width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{b.num}</span>
                                <span style={{ fontSize: 16, fontWeight: 700 }}>{b.title}</span>
                                <span style={{ fontSize: 12.5, color: '#78716c' }}>{b.titleJa}</span>
                                <span style={{ fontSize: 11, color: '#a8a29e', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{b.seconds}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                                {b.keywords.map((k, i) => (
                                    <span key={i} style={{ fontSize: 13, fontWeight: 600, color: b.color, background: b.bg, border: `1px solid ${b.color}22`, borderRadius: 999, padding: '4px 12px' }}>{k}</span>
                                ))}
                            </div>
                            {revealed[b.num] ? (
                                <ul style={{ margin: 0, padding: '10px 14px', listStyle: 'none', display: 'grid', gap: 6, background: '#FAFAF9', borderRadius: 8 }}>
                                    {b.chunks.map((c, i) => (
                                        <li key={i} style={{ fontSize: 14.5, lineHeight: 1.7, color: '#292524' }}>{c}</li>
                                    ))}
                                </ul>
                            ) : (
                                <button
                                    onClick={() => setRevealed(r => ({ ...r, [b.num]: true }))}
                                    style={{ fontSize: 12.5, fontWeight: 600, color: '#78716c', background: 'none', border: '1px dashed #d6d3d1', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}
                                >
                                    詰まったら開く(模範チャンク 3文)
                                </button>
                            )}
                        </div>
                    ))}
                </section>

                {/* Rules */}
                <section style={{ marginBottom: 28, padding: '18px 20px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#B91C1C', marginBottom: 10, letterSpacing: 1 }}>ルール</div>
                    <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'grid', gap: 6 }}>
                        {RULES.map((r, i) => (
                            <li key={i} style={{ fontSize: 14, lineHeight: 1.8, color: '#7F1D1D' }}>{r}</li>
                        ))}
                    </ol>
                </section>

                {/* Ammo */}
                <section style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px', letterSpacing: 0.3 }}>弾 -- 7/4検死から温存したチャンク</h2>
                    <p style={{ fontSize: 12.5, color: '#78716c', margin: '0 0 12px' }}>トレーニングカード登録済み(7/4)。90秒の中にどれか2つ混ぜられたら勝ち。</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {AMMO.map((a, i) => (
                            <span key={i} style={{ fontSize: 13.5, color: '#292524', background: 'white', border: '1px solid #e7e5e4', borderRadius: 999, padding: '6px 14px' }}>{a}</span>
                        ))}
                    </div>
                </section>

                <div style={{ display: 'flex', gap: 18, fontSize: 13 }}>
                    <Link href="/english/south-africa" style={{ color: '#0e7490', textDecoration: 'none' }}>← 徹底ドシエに戻る</Link>
                    <Link href="/english/training/dmm/dmm-2026-07-04-south-africa-dossier" style={{ color: '#10B981', textDecoration: 'none' }}>7/4のレッスン+検死 →</Link>
                </div>
            </main>
        </div>
    );
}
