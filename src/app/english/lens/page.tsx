'use client';

import { useState } from 'react';

/**
 * Lens -- 罪悪感ゼロで開ける、英語だけのSNS (プロトタイプ / 見た目重視)
 * 写真 + 簡単な英語ひと言。日本語は存在しない。30日コホート。
 * 名前の二重の意味: カメラのレンズ x 英語の見方を変える「30の鍵=レンズ」。
 *
 * プロジェクト規則準拠: 絵文字なし / ライトテーマ / 金(#D4AF37)+緑(#10B981)。
 */

const GOLD = '#D4AF37';
const EMERALD = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

interface Post {
    user: string;
    day: number;
    photo: string; // CSS background (写真スタンドイン)
    caption: string;
    lens: string;  // その日の「鍵」お題
    likes: number;
    reply?: { user: string; text: string };
    ago: string;
}

const FEED: Post[] = [
    {
        user: 'ramen_taro', day: 8,
        photo: 'radial-gradient(120% 120% at 30% 20%, #F4C76B 0%, #E08A3C 45%, #8C4A1E 100%)',
        caption: "This ramen is too good. I cannot stop.",
        lens: "Start with 'This'",
        likes: 41,
        reply: { user: 'mina.coffee', text: 'Where is this place??' },
        ago: '12m',
    },
    {
        user: 'yuki_walks', day: 12,
        photo: 'linear-gradient(180deg, #BFE3F2 0%, #DCEFE0 55%, #A7C8A0 100%)',
        caption: "It is so cold this morning. But the sky is amazing.",
        lens: "Start with 'It'",
        likes: 27,
        reply: { user: 'ken_runs', text: 'Same here. Stay warm!' },
        ago: '34m',
    },
    {
        user: 'neko_life', day: 6,
        photo: 'linear-gradient(135deg, #C9C2B6 0%, #9A938A 50%, #6E6660 100%)',
        caption: "My cat sat on my keyboard again. He runs this house.",
        lens: "One simple sentence",
        likes: 58,
        reply: { user: 'ao_sky', text: 'He is the boss.' },
        ago: '1h',
    },
    {
        user: 'ken_runs', day: 20,
        photo: 'linear-gradient(160deg, #2C3E50 0%, #4A6572 45%, #C46B3D 100%)',
        caption: "I ran five kilometers today. My legs are dead.",
        lens: "Say the number",
        likes: 33,
        ago: '2h',
    },
    {
        user: 'ao_sky', day: 15,
        photo: 'linear-gradient(180deg, #2B3A67 0%, #C75C5C 55%, #F0A04B 100%)',
        caption: "The sky is on fire tonight. I had to stop and look.",
        lens: "Two short sentences",
        likes: 72,
        reply: { user: 'yuki_walks', text: 'Wow. So beautiful.' },
        ago: '3h',
    },
    {
        user: 'mina.coffee', day: 3,
        photo: 'radial-gradient(110% 110% at 35% 30%, #C9A27A 0%, #7A4E32 55%, #3D2417 100%)',
        caption: "First coffee. Do not talk to me yet.",
        lens: "Start with 'First'",
        likes: 19,
        ago: '5h',
    },
];

// 上部のコホート (同じ週に一斉スタートした仲間)
const COHORT = [
    { user: 'you', day: 12, me: true },
    { user: 'yuki_walks', day: 12 },
    { user: 'ken_runs', day: 12 },
    { user: 'ao_sky', day: 12 },
    { user: 'mina.coffee', day: 12 },
    { user: 'ramen_taro', day: 12 },
    { user: 'neko_life', day: 12 },
];

function initials(name: string) {
    const clean = name.replace(/[^a-zA-Z]/g, '');
    return (clean.slice(0, 2) || '?').toUpperCase();
}

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? EMERALD : 'none'}
            stroke={filled ? EMERALD : INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
    );
}

function CommentIcon() {
    return (
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l1.9-4.5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
        </svg>
    );
}

function Avatar({ name, ring }: { name: string; ring?: boolean }) {
    return (
        <div style={{
            width: ring ? 60 : 34, height: ring ? 60 : 34, borderRadius: '50%',
            padding: ring ? 2.5 : 0,
            background: ring ? `linear-gradient(135deg, ${GOLD}, ${EMERALD})` : 'transparent',
            flexShrink: 0,
        }}>
            <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                border: ring ? '2px solid #fff' : `1px solid ${LINE}`,
                background: '#FAFAF9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: ring ? 16 : 12, fontWeight: 800, color: SUB, letterSpacing: '0.02em',
            }}>
                {initials(name)}
            </div>
        </div>
    );
}

export default function LensPage() {
    const [liked, setLiked] = useState<Record<number, boolean>>({});
    const myDay = 12;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            {/* Top bar */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 20,
                backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${LINE}`,
            }}>
                <div style={{
                    maxWidth: 520, margin: '0 auto', padding: '12px 18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 24, fontWeight: 900, color: GOLD, letterSpacing: '-0.5px' }}>Lens</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: FAINT, letterSpacing: '2px' }}>ENGLISH ONLY</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: EMERALD, letterSpacing: '0.04em' }}>
                        DAY {myDay} / 30
                    </span>
                </div>
                {/* progress */}
                <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 18px 10px' }}>
                    <div style={{ height: 4, borderRadius: 4, background: '#EFEDE8', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(myDay / 30) * 100}%`, background: `linear-gradient(90deg, ${GOLD}, ${EMERALD})` }} />
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: 520, margin: '0 auto', padding: '0 0 100px' }}>
                {/* Cohort row (stories) */}
                <div style={{
                    display: 'flex', gap: 16, overflowX: 'auto', padding: '16px 18px',
                    borderBottom: `1px solid ${LINE}`, backgroundColor: '#fff',
                }}>
                    {COHORT.map((c) => (
                        <div key={c.user} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0, width: 64 }}>
                            <Avatar name={c.user} ring />
                            <span style={{ fontSize: 11, fontWeight: 700, color: c.me ? GOLD : SUB, maxWidth: 64, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {c.me ? 'You' : c.user}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Feed */}
                {FEED.map((p, i) => {
                    const isLiked = liked[i] ?? false;
                    const likeCount = p.likes + (isLiked ? 1 : 0);
                    return (
                        <article key={i} style={{ backgroundColor: '#fff', borderBottom: `8px solid #FAFAF9` }}>
                            {/* card header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}>
                                <Avatar name={p.user} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.user}</div>
                                    <div style={{ fontSize: 11, color: FAINT, fontWeight: 600 }}>Day {p.day} / 30</div>
                                </div>
                                <span style={{
                                    fontSize: 10, fontWeight: 800, color: GOLD, backgroundColor: '#FFFBEB',
                                    border: `1px solid ${GOLD}40`, padding: '3px 9px', borderRadius: 999, letterSpacing: '0.03em',
                                }}>
                                    {p.lens}
                                </span>
                            </div>

                            {/* photo */}
                            <div style={{ width: '100%', aspectRatio: '1 / 1', background: p.photo }} />

                            {/* actions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px 6px' }}>
                                <button onClick={() => setLiked((s) => ({ ...s, [i]: !s[i] }))}
                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
                                    <HeartIcon filled={isLiked} />
                                </button>
                                <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
                                    <CommentIcon />
                                </button>
                                <span style={{ marginLeft: 'auto', fontSize: 11, color: FAINT, fontWeight: 600 }}>{p.ago}</span>
                            </div>

                            {/* likes + caption */}
                            <div style={{ padding: '0 16px 14px' }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: INK, marginBottom: 6 }}>{likeCount} likes</div>
                                <div style={{ fontSize: 14, color: INK, lineHeight: 1.5 }}>
                                    <span style={{ fontWeight: 700 }}>{p.user}</span>{' '}
                                    <span>{p.caption}</span>
                                </div>
                                {p.reply && (
                                    <div style={{ fontSize: 13, color: SUB, lineHeight: 1.5, marginTop: 6 }}>
                                        <span style={{ fontWeight: 700, color: INK }}>{p.reply.user}</span>{' '}
                                        <span>{p.reply.text}</span>
                                    </div>
                                )}
                            </div>
                        </article>
                    );
                })}
            </main>

            {/* Compose FAB + today's lens */}
            <div style={{
                position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 22,
                width: '100%', maxWidth: 520, padding: '0 18px', display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none',
            }}>
                <button style={{
                    pointerEvents: 'auto',
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: `linear-gradient(135deg, ${GOLD}, #C99A2E)`, color: '#fff',
                    border: 'none', borderRadius: 999, padding: '14px 20px',
                    fontSize: 14, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(212,175,55,0.4)', letterSpacing: '0.02em',
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="3.2" />
                        <line x1="17" y1="7" x2="17" y2="7" />
                    </svg>
                    Post today
                </button>
            </div>

            {/* Today's lens hint bar */}
            <div style={{
                position: 'fixed', left: '50%', transform: 'translateX(-50%)', bottom: 22,
                width: '100%', maxWidth: 520, padding: '0 18px', display: 'flex', justifyContent: 'flex-start', pointerEvents: 'none',
            }}>
                <div style={{
                    background: '#fff', border: `1px solid ${LINE}`, borderRadius: 999,
                    padding: '10px 16px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                    fontSize: 12.5, fontWeight: 700, color: INK, maxWidth: 230,
                }}>
                    <span style={{ color: EMERALD, fontWeight: 800 }}>Today&rsquo;s lens</span>{' '}
                    <span style={{ color: SUB }}>&mdash; start a sentence with &ldquo;It&rdquo;.</span>
                </div>
            </div>
        </div>
    );
}
