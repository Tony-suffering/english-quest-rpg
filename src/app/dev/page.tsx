'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DEV_KEY = 'tl_dev_auth';
const DEV_VERSION = 'v1';

function checkPass(input: string): boolean {
    const hash = Array.from(input).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return hash === 117723; // "wim"
}

/* ---- Password Gate ---- */

function PasswordGate({ onAuth }: { onAuth: () => void }) {
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const submit = () => {
        if (checkPass(pass)) {
            localStorage.setItem(DEV_KEY, DEV_VERSION);
            onAuth();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: 24,
        }}>
            <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
                <div style={{
                    fontSize: 10, letterSpacing: '0.3em', color: '#10B981',
                    fontWeight: 700, marginBottom: 24,
                }}>
                    DEVELOPER ACCESS
                </div>
                <div style={{
                    fontSize: 22, fontWeight: 300, color: '#fff',
                    lineHeight: 1.7, marginBottom: 32,
                }}>
                    toniolab.com/dev
                </div>
                <div style={{ animation: shake ? 'devShake 0.4s ease' : undefined }}>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => { setPass(e.target.value); setError(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                        placeholder="password"
                        autoFocus
                        style={{
                            width: '100%', padding: '14px 20px', fontSize: 16, fontWeight: 500,
                            backgroundColor: '#111', border: error ? '2px solid #EF4444' : '2px solid #222',
                            borderRadius: 12, color: '#fff', textAlign: 'center',
                            letterSpacing: '0.15em', outline: 'none', transition: 'border-color 0.2s ease',
                            fontFamily: "'SF Mono', 'Fira Code', monospace",
                        }}
                        onFocus={(e) => { if (!error) e.target.style.borderColor = '#10B981'; }}
                        onBlur={(e) => { if (!error) e.target.style.borderColor = '#222'; }}
                    />
                </div>
                {error && (
                    <div style={{ fontSize: 12, color: '#EF4444', marginTop: 12 }}>
                        wrong password
                    </div>
                )}
                <button
                    onClick={submit}
                    disabled={!pass.trim()}
                    style={{
                        marginTop: 20, padding: '14px 48px', borderRadius: 12,
                        backgroundColor: pass.trim() ? '#10B981' : '#222',
                        border: 'none', color: pass.trim() ? '#fff' : '#555',
                        fontSize: 14, fontWeight: 700, cursor: pass.trim() ? 'pointer' : 'default',
                        letterSpacing: '0.1em', transition: 'all 0.2s ease', width: '100%',
                    }}
                >
                    Enter
                </button>
            </div>
            <style>{`
                @keyframes devShake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                }
            `}</style>
        </div>
    );
}

/* ---- Types ---- */

type ProjectStatus = 'live' | 'building' | 'planned' | 'paused';

interface Project {
    id: string;
    name: string;
    nameJa: string;
    status: ProjectStatus;
    description: string;
    url?: string;
    tech: string[];
    stats?: string;
}

interface TimelineItem {
    date: string;
    label: string;
    detail: string;
}

/* ---- Data ---- */

const STATUS_META: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
    live: { label: 'LIVE', color: '#10B981', bg: '#10B98115' },
    building: { label: 'BUILDING', color: '#D4AF37', bg: '#D4AF3715' },
    planned: { label: 'PLANNED', color: '#3B82F6', bg: '#3B82F615' },
    paused: { label: 'PAUSED', color: '#78716c', bg: '#78716c15' },
};

const PROJECTS: Project[] = [
    {
        id: 'toniolab',
        name: 'toniolab.com',
        nameJa: 'とにおラボ -- メインサイト',
        status: 'live',
        description: 'TOEIC 900点なのに喋れない男の全記録。英語学習アプリ、ジャーナル、居酒屋TOEIC。全部ここ。',
        url: 'https://www.toniolab.com',
        tech: ['Next.js', 'Cloudflare Workers', 'D1', 'TTS'],
        stats: '133+ journal entries, 600+ phrases, 310 goroku',
    },
    {
        id: 'izakaya',
        name: 'Izakaya TOEIC',
        nameJa: '居酒屋TOEIC -- 物語で学ぶ英語',
        status: 'live',
        description: '6人のキャラが居酒屋「のれん」に集まる。マスター権藤、ユキ、タケシ、リサ、ケンジ、ミナ。30日 × 20フレーズ = 600。パチンコ式学習。',
        url: 'https://www.toniolab.com/english/izakaya-toeic',
        tech: ['Gamification', 'TTS', 'Character-driven'],
    },
    {
        id: 'requiem',
        name: 'Requiem',
        nameJa: 'レクイエム -- シナリオベース学習',
        status: 'live',
        description: '1シナリオ = 50単語 × 5日。Memoria会話 + Word Review + Expressions の3点セット。物語に没入しながら語彙が増える。',
        url: 'https://www.toniolab.com/english/requiem',
        tech: ['3-piece set', 'Memoria UI', 'Calendar mapping'],
        stats: '11 scenarios complete',
    },
    {
        id: 'tokyo52',
        name: 'Tokyo 52',
        nameJa: '東京で英語が話せるようになるドラマ -- 52話',
        status: 'building',
        description: '52週 × 7日 = 365日。東京を舞台にした連続ドラマ。何十人もの人生が絡み合う。見てたら英語ができるようになってた。そういう設計。',
        url: '/dev/tokyo52',
        tech: ['52 episodes', 'Memoria', 'Word Review', '30+ characters'],
        stats: 'Spec complete, Ep1-4 next',
    },
    {
        id: 'vibe-coding',
        name: 'Vibe Coding Course',
        nameJa: 'バイブコーディング講座 -- AI版',
        status: 'building',
        description: '同じ東京、同じキャラ。英語と並行してAIを学ぶ。Claude Codeの使い方を物語形式で。1年後、自分でアプリが作れるようになる。',
        url: 'https://www.toniolab.com/journal/vibe-coding',
        tech: ['Claude Code', 'Story-driven', 'IT vocabulary'],
    },
    {
        id: 'goroku',
        name: 'Ore Goroku',
        nameJa: '俺語録 -- 日常表現310',
        status: 'live',
        description: '毎日の会話から拾った自然な英語表現。カレンダーUIで1日最大10個。context解説が本体。',
        url: 'https://www.toniolab.com/english/goroku',
        tech: ['D1', 'Calendar UI', 'TTS', '4-level English'],
        stats: '310 expressions seeded',
    },
    {
        id: 'journal',
        name: 'Journal',
        nameJa: 'ジャーナル -- 開発と英語の全記録',
        status: 'building',
        description: '4つの柱: AI / English / Philosophy / Science。日記を商品に書き直す。リライト進行中。',
        url: 'https://www.toniolab.com/journal',
        tech: ['4 pillars', 'Calendar', 'Members only'],
        stats: '133+ entries, rewrite in progress',
    },
    {
        id: 'note',
        name: 'note.com',
        nameJa: 'note -- 広告チャネル',
        status: 'live',
        description: 'toniolabが本体、noteが広告。記事の要約版 + バイブコーディング塾連載。傍聴席プランでメンバーシップ。',
        url: 'https://note.com/tonio_english',
        tech: ['Content marketing', 'CTA to toniolab'],
        stats: '34 articles (20 published, 14 draft)',
    },
];

const TIMELINE: TimelineItem[] = [
    { date: '2025-12', label: 'Site Launch', detail: 'iwasaki-naisou.com as portfolio' },
    { date: '2026-01', label: 'English Pivot', detail: 'English learning features added' },
    { date: '2026-01', label: 'Requiem Start', detail: 'Scenario-based learning system' },
    { date: '2026-02', label: 'toniolab.com', detail: 'Domain + Cloudflare Workers deployment' },
    { date: '2026-02', label: 'Izakaya TOEIC', detail: '6 characters, 600 phrases, gamification' },
    { date: '2026-03', label: 'Goroku System', detail: '310 daily expressions with calendar UI' },
    { date: '2026-03', label: 'note Membership', detail: 'Content hub strategy, 4 pillars' },
    { date: '2026-03', label: 'Tokyo 52', detail: '52-episode drama spec complete' },
    { date: '2026-03', label: 'Vibe Coding', detail: 'AI course, 15 lessons live' },
];

const TECH_STACK = [
    { name: 'Next.js', role: 'Framework', color: '#fff' },
    { name: 'Cloudflare Workers', role: 'Hosting', color: '#F6821F' },
    { name: 'D1', role: 'Database', color: '#F6821F' },
    { name: 'Claude Code', role: 'Development', color: '#10B981' },
    { name: 'TTS', role: 'Audio', color: '#8B5CF6' },
    { name: 'TypeScript', role: 'Language', color: '#3178C6' },
];

/* ---- Components ---- */

function StatusBadge({ status }: { status: ProjectStatus }) {
    const meta = STATUS_META[status];
    return (
        <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
            color: meta.color, background: meta.bg,
            border: `1px solid ${meta.color}33`,
            borderRadius: 6, padding: '3px 10px',
        }}>
            {meta.label}
        </span>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const [hovered, setHovered] = useState(false);
    const statusColor = STATUS_META[project.status].color;
    const router = useRouter();
    const isInternal = project.url?.startsWith('/');

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? '#141418' : '#0f0f13',
                border: `1px solid ${hovered ? statusColor + '44' : '#1a1a1f'}`,
                borderRadius: 16, padding: '24px 28px',
                transition: 'all 0.25s', cursor: project.url ? 'pointer' : 'default',
                position: 'relative', overflow: 'hidden',
            }}
            onClick={() => {
                if (!project.url) return;
                if (isInternal) router.push(project.url);
                else window.open(project.url, '_blank');
            }}
        >
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: statusColor, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.25s',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <StatusBadge status={project.status} />
                <span style={{ fontSize: 11, color: '#555', letterSpacing: '0.04em' }}>{project.id}</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#e5e5e5', margin: '0 0 4px' }}>
                {project.name}
            </h3>
            <div style={{ fontSize: 13, color: '#777', marginBottom: 14, lineHeight: 1.5 }}>
                {project.nameJa}
            </div>
            <p style={{ fontSize: 13.5, color: '#999', lineHeight: 1.8, margin: '0 0 16px' }}>
                {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: project.stats ? 12 : 0 }}>
                {project.tech.map(t => (
                    <span key={t} style={{
                        fontSize: 11, color: '#888', background: '#1a1a1f',
                        border: '1px solid #252530', borderRadius: 6, padding: '3px 10px',
                    }}>
                        {t}
                    </span>
                ))}
            </div>
            {project.stats && (
                <div style={{ fontSize: 12, color: statusColor, fontWeight: 600, letterSpacing: '0.02em' }}>
                    {project.stats}
                </div>
            )}
        </div>
    );
}

/* ---- Main Page ---- */

function DevDashboard() {
    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: '#e5e5e5' }}>
            {/* Hero */}
            <div style={{
                padding: '48px 32px 40px', position: 'relative', overflow: 'hidden',
                borderBottom: '1px solid #1a1a1f',
                background: 'linear-gradient(165deg, #0f0f1a 0%, #09090b 100%)',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    backgroundImage: 'radial-gradient(circle at 30% 50%, #10B981 0%, transparent 50%),radial-gradient(circle at 70% 30%, #D4AF37 0%, transparent 50%)',
                }} />
                <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    <Link href="/" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: '#555', textDecoration: 'none', letterSpacing: '0.06em', marginBottom: 24,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        HOME
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#10B981',
                            background: '#10B98112', border: '1px solid #10B98133',
                            borderRadius: 6, padding: '4px 12px',
                        }}>
                            DEV
                        </div>
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>
                        toniolab.com
                    </h1>
                    <p style={{ fontSize: 14, color: '#666', margin: '0 0 4px', lineHeight: 1.7 }}>
                        TOEIC 900. Can't speak. Building apps anyway.
                    </p>
                    <p style={{ fontSize: 13, color: '#444', margin: 0, lineHeight: 1.7 }}>
                        All built with Claude Code. Zero programming knowledge. Not kidding.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px 80px' }}>

                {/* Projects */}
                <div style={{ marginBottom: 56 }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#555',
                        marginBottom: 20,
                    }}>
                        PROJECTS
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
                        {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: 56 }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#555',
                        marginBottom: 20,
                    }}>
                        TECH STACK
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {TECH_STACK.map(t => (
                            <div key={t.name} style={{
                                background: '#0f0f13', border: '1px solid #1a1a1f',
                                borderRadius: 12, padding: '14px 20px',
                                display: 'flex', alignItems: 'center', gap: 12,
                            }}>
                                <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: t.color, opacity: 0.7,
                                }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#ccc' }}>{t.name}</div>
                                    <div style={{ fontSize: 11, color: '#555' }}>{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div style={{ marginBottom: 56 }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#555',
                        marginBottom: 20,
                    }}>
                        TIMELINE
                    </div>
                    <div style={{ position: 'relative', paddingLeft: 24 }}>
                        <div style={{
                            position: 'absolute', left: 5, top: 8, bottom: 8,
                            width: 1, background: '#1a1a1f',
                        }} />
                        {TIMELINE.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: 16, marginBottom: 20, position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute', left: -20, top: 6,
                                    width: 9, height: 9, borderRadius: '50%',
                                    background: i === TIMELINE.length - 1 ? '#10B981' : '#333',
                                    border: `2px solid ${i === TIMELINE.length - 1 ? '#10B981' : '#1a1a1f'}`,
                                }} />
                                <div style={{ fontSize: 12, color: '#555', minWidth: 70, paddingTop: 2 }}>
                                    {item.date}
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#ccc', marginBottom: 2 }}>
                                        {item.label}
                                    </div>
                                    <div style={{ fontSize: 12.5, color: '#666', lineHeight: 1.5 }}>
                                        {item.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Philosophy */}
                <div style={{
                    background: '#0f0f13', border: '1px solid #1a1a1f',
                    borderRadius: 16, padding: '28px 32px',
                }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#D4AF37',
                        marginBottom: 16,
                    }}>
                        PHILOSOPHY
                    </div>
                    <div style={{ fontSize: 15, color: '#999', lineHeight: 2.2 }}>
                        TOEIC 900点取った。英語喋れない。<br />
                        プログラミング勉強した。1行も書けない。<br />
                        でもアプリ運営してる。毎日コード書いてる。<br />
                        <br />
                        やり方が変わった。AIと作る時代。<br />
                        勉強しなくていい。作ればいい。<br />
                        完璧じゃなくていい。始めればいい。<br />
                        <br />
                        <span style={{ color: '#D4AF37' }}>Build first. Learn along the way.</span>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: 56, paddingTop: 24,
                    borderTop: '1px solid #1a1a1f', textAlign: 'center',
                }}>
                    <p style={{ fontSize: 12, color: '#333', letterSpacing: '0.06em', margin: 0 }}>
                        toniolab.com -- built with Claude Code
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ---- Export ---- */

export default function DevPage() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem(DEV_KEY) === DEV_VERSION) {
            setIsAuthed(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh', backgroundColor: '#09090b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#333',
            }}>
                Loading...
            </div>
        );
    }

    if (!isAuthed) {
        return <PasswordGate onAuth={() => setIsAuthed(true)} />;
    }

    return <DevDashboard />;
}
