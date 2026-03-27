'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ─── Color tokens ──────────────────────────────────────────
const C = {
    gold: '#D4AF37',
    green: '#10B981',
    purple: '#8B5CF6',
    blue: '#3B82F6',
    red: '#EF4444',
    brown: '#92400E',
    orange: '#F97316',
    pink: '#EC4899',
};

// ─── Program definitions ───────────────────────────────────
interface Program {
    id: string;
    label: string;
    tagline: string;
    color: string;
    basePath: string;
    items: { id: string; label: string }[];
}

const PROGRAMS: Program[] = [
    {
        id: 'izakaya',
        label: '居酒屋TOEIC',
        tagline: '30日でスコアUP',
        color: C.gold,
        basePath: '/english/izakaya-toeic',
        items: [
            { id: '/english/izakaya-toeic', label: 'のれん30夜' },
            { id: '/english/izakaya-toeic/episodes', label: 'エピソード一覧' },
            { id: '/english/izakaya-toeic/characters', label: '常連ファイル' },
            { id: '/english/izakaya-toeic/guide', label: '攻略メモ' },
            { id: '/english/izakaya-toeic/paraphrase', label: '言い換えお品書き' },
            { id: '/english/izakaya-toeic/sounds', label: '聞き酒ノート' },
            { id: '/english/izakaya-toeic/traps', label: '引っかけ毒見帳' },
            { id: '/english/izakaya-toeic/score', label: 'スコア通知表' },
            { id: '/english/izakaya-toeic/mistakes', label: '反省ノート' },
            { id: '/english/izakaya-toeic/achievements', label: 'のれんの勲章' },
        ],
    },
    {
        id: 'kaiwa',
        label: '英会話マスター365',
        tagline: '毎日の英会話トレーニング',
        color: C.green,
        basePath: '/english/izakaya-toeic/kaiwa',
        items: [
            { id: '/english/izakaya-toeic/kaiwa', label: 'マスター365 HOME' },
            { id: '/english/izakaya-toeic/kaiwa/lp', label: '英会話マスター365とは？' },
            { id: '/english/izakaya-toeic/kaiwa/guide', label: 'ガイド' },
        ],
    },
    {
        id: 'tokyo52',
        label: 'Tokyo52',
        tagline: '英語ドラマで学ぶ',
        color: C.purple,
        basePath: '/english/tokyo52',
        items: [
            { id: '/english/tokyo52', label: 'Tokyo52 HOME' },
            { id: '/english/tokyo52/words', label: '単語リスト' },
        ],
    },
];

// ─── Component ─────────────────────────────────────────────

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    // Auto-expand the program that contains the current page
    useEffect(() => {
        if (!pathname) return;
        // Check kaiwa first (more specific path)
        if (pathname.startsWith('/english/izakaya-toeic/kaiwa')) {
            setExpandedProgram('kaiwa');
        } else if (pathname.startsWith('/english/izakaya-toeic')) {
            setExpandedProgram('izakaya');
        } else if (pathname.startsWith('/english/tokyo52')) {
            setExpandedProgram('tokyo52');
        }
        // Auto-expand more if on a legacy page
        const allProgramPaths = PROGRAMS.flatMap(p => p.items.map(i => i.id));
        const toolPaths = ['/english/training', '/english/training/card-preview', '/english/izakaya-toeic/words'];
        const contentPaths = ['/memoria', '/english/goroku', '/english/pro', '/english/requiem'];
        const allKnown = [...allProgramPaths, ...toolPaths, ...contentPaths, '/install', '/english/settings'];
        if (pathname && !allKnown.some(p => pathname.startsWith(p) || pathname === p)) {
            setShowMore(true);
        }
    }, [pathname]);

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english/izakaya-toeic') return pathname === '/english/izakaya-toeic' || pathname === '/english/izakaya-toeic/program';
        if (path === '/english/izakaya-toeic/kaiwa') return pathname === '/english/izakaya-toeic/kaiwa';
        if (path === '/english/training/card-preview') return pathname === '/english/training/card-preview';
        if (path === '/english/training') return pathname === '/english/training' || pathname.startsWith('/english/training/card-slot');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        return pathname === path || pathname.startsWith(path + '/');
    };

    const toggleProgram = (id: string) => {
        setExpandedProgram(prev => prev === id ? null : id);
    };

    // ─── Render helpers ────────────────────────────────────

    const renderSubItem = (item: { id: string; label: string }, color: string) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                    padding: '7px 20px 7px 36px',
                    color: active ? '#1a1a1a' : '#777',
                    backgroundColor: active ? (color + '10') : 'transparent',
                    borderLeft: active ? `2px solid ${color}` : '2px solid transparent',
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.15s ease',
                    marginLeft: 4,
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    const renderToolItem = (item: { id: string; label: string; color: string }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                    padding: '8px 20px',
                    color: active ? '#1a1a1a' : '#666',
                    backgroundColor: active ? (item.color + '10') : 'transparent',
                    borderLeft: active ? `3px solid ${item.color}` : '3px solid transparent',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    const renderCompactItem = (item: { id: string; label: string }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                    padding: '6px 20px 6px 28px',
                    color: active ? '#1a1a1a' : '#888',
                    backgroundColor: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    // ─── Program Card ──────────────────────────────────────

    const ProgramCard = ({ program }: { program: Program }) => {
        const expanded = expandedProgram === program.id;
        const hasActivePage = program.items.some(item => isActive(item.id));

        return (
            <div style={{ margin: '0 12px 4px' }}>
                {/* Program header button */}
                <button
                    onClick={() => toggleProgram(program.id)}
                    style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: expanded ? (program.color + '08') : 'transparent',
                        border: expanded ? `1px solid ${program.color}20` : '1px solid transparent',
                        borderRadius: 10,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        transition: 'all 0.2s ease',
                    }}
                >
                    {/* Color dot */}
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: program.color,
                        flexShrink: 0,
                        boxShadow: hasActivePage ? `0 0 8px ${program.color}60` : 'none',
                    }} />
                    {/* Text */}
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: expanded ? '#1a1a1a' : '#444',
                            lineHeight: 1.3,
                        }}>
                            {program.label}
                        </div>
                        <div style={{
                            fontSize: 10,
                            color: expanded ? program.color : '#aaa',
                            marginTop: 1,
                            letterSpacing: '0.02em',
                            transition: 'color 0.2s ease',
                        }}>
                            {program.tagline}
                        </div>
                    </div>
                    {/* Chevron */}
                    <div style={{
                        fontSize: 10,
                        color: '#bbb',
                        transition: 'transform 0.2s ease',
                        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        flexShrink: 0,
                    }}>
                        &#9654;
                    </div>
                </button>

                {/* Expanded items */}
                <div style={{
                    maxHeight: expanded ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease',
                }}>
                    <div style={{ paddingTop: 2, paddingBottom: 4 }}>
                        {program.items.map(item => renderSubItem(item, program.color))}
                    </div>
                </div>
            </div>
        );
    };

    // ─── Section divider ───────────────────────────────────

    const SectionLabel = ({ text }: { text: string }) => (
        <>
            <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '10px 20px 6px' }} />
            <div style={{ padding: '0 20px 4px', fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
                {text}
            </div>
        </>
    );

    // ─── Render ────────────────────────────────────────────

    return (
        <>
            {/* Mobile Header */}
            {isMobile && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0,
                    height: 56, backgroundColor: '#F5F5F4',
                    borderBottom: '1px solid #e5e5e5',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 16px', zIndex: 1001,
                }}>
                    <Link href="/english" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: C.gold }}>英語魂</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5 }}
                    >
                        <span style={{ display: 'block', width: 22, height: 2, backgroundColor: '#999', transition: 'all 0.2s ease', transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
                        <span style={{ display: 'block', width: 22, height: 2, backgroundColor: '#999', opacity: isOpen ? 0 : 1, transition: 'opacity 0.2s ease' }} />
                        <span style={{ display: 'block', width: 22, height: 2, backgroundColor: '#999', transition: 'all 0.2s ease', transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
                    </button>
                </div>
            )}

            {/* Overlay */}
            {isMobile && isOpen && (
                <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }} />
            )}

            {/* Sidebar */}
            <div style={{
                width: 260, backgroundColor: '#F5F5F4',
                borderRight: '1px solid #e5e5e5',
                padding: isMobile ? '72px 0 24px' : '0',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', height: '100vh', overflowY: 'auto',
                zIndex: 1000,
                left: isMobile ? (isOpen ? 0 : -260) : (desktopOpen ? 0 : -260),
                transition: 'left 0.25s ease',
            }}>
                {/* Logo - Desktop */}
                {!isMobile && (
                    <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e5e5e5' }}>
                        <Link href="/english" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontSize: 20, fontWeight: 900, color: C.gold }}>英語魂</span>
                                <span style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.1em' }}>EIGODAMASHII</span>
                            </div>
                        </Link>
                    </div>
                )}

                <nav style={{ flex: 1, paddingTop: isMobile ? 0 : 8 }}>
                    {/* ── PROGRAMS ── */}
                    <SectionLabel text="PROGRAMS" />
                    {PROGRAMS.map(p => <ProgramCard key={p.id} program={p} />)}

                    {/* ── TOOLS ── */}
                    <SectionLabel text="TOOLS" />
                    {renderToolItem({ id: '/english/training', label: '仕込み帳', color: C.green })}
                    {renderToolItem({ id: '/english/training/card-preview', label: 'カードコレクション', color: '#A855F7' })}
                    {renderToolItem({ id: '/english/izakaya-toeic/words', label: '今日の単語', color: C.blue })}

                    {/* ── CONTENT ── */}
                    <SectionLabel text="CONTENT" />
                    {renderToolItem({ id: '/memoria', label: 'メモリア', color: C.blue })}
                    {renderToolItem({ id: '/english/requiem', label: 'デイリーレビュー', color: C.red })}
                    {renderToolItem({ id: '/english/goroku', label: '俺語録', color: C.orange })}
                    {renderToolItem({ id: '/english/pro', label: 'Pro', color: C.gold })}

                    {/* ── その他 ── */}
                    <SectionLabel text="その他" />
                    {renderToolItem({ id: '/install', label: 'ホーム画面に追加', color: C.gold })}
                    {renderToolItem({ id: '/english/settings', label: '設定', color: '#78716C' })}

                    {/* ── MORE ── */}
                    <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '10px 20px 6px' }} />
                    <button
                        onClick={() => setShowMore(!showMore)}
                        style={{
                            width: '100%', padding: '6px 20px', background: 'none',
                            border: 'none', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em',
                        }}
                    >
                        <span>MORE</span>
                        <span style={{
                            fontSize: 10, transition: 'transform 0.2s',
                            transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>&#9660;</span>
                    </button>
                    {showMore && (
                        <div style={{ paddingBottom: 8 }}>
                            {[
                                { id: '/journal', label: 'ジャーナル' },
                                { id: '/english/5min', label: '5min 英会話' },
                                { id: '/english/quest', label: 'Quest' },
                                { id: '/english/dashboard-v2', label: 'ダッシュボード' },
                                { id: '/english/tonio-words', label: 'TONIO WORDS' },
                            ].map(item => renderCompactItem(item))}
                        </div>
                    )}
                </nav>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: 56 }} />}
        </>
    );
}
