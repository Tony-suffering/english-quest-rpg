'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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
    items: { id: string; label: string; featured?: boolean }[];
}

const PROGRAMS: Program[] = [
    {
        id: 'kaiwa',
        label: '英会話マスター365',
        tagline: '毎日の英会話トレーニング',
        color: C.green,
        basePath: '/english/izakaya-toeic/kaiwa',
        items: [
            { id: '/english/izakaya-toeic/kaiwa', label: 'マスター365 HOME' },
            { id: '/english/grind', label: '毎日GRIND動画', featured: true },
            { id: '/english/my-log', label: '俺の勉強記録', featured: true },
            { id: '/english/my-training', label: 'Daily Training', featured: true },
            { id: '/english/my-training/practice', label: 'Practice Drills', featured: true },
            { id: '/english/izakaya-toeic/kaiwa/lp', label: '英会話マスター365とは？' },
            { id: '/english/toeic/characters', label: '常連ファイル' },
            { id: '/english/5min', label: '5分トーク' },
            { id: '/english/goroku', label: 'ひとこと英語帳' },
        ],
    },
    {
        id: 'izakaya',
        label: '居酒屋TOEIC',
        tagline: '30日でスコアUP',
        color: C.gold,
        basePath: '/english/toeic',
        items: [
            { id: '/english/toeic', label: 'のれん30夜' },
            { id: '/english/toeic/sentences', label: '居酒屋300フレーズ', featured: true },
            { id: '/english/toeic/episodes', label: 'エピソード一覧' },
            { id: '/english/toeic/characters', label: '常連ファイル' },
            { id: '/english/toeic/guide', label: '攻略メモ' },
            { id: '/english/toeic/paraphrase', label: '言い換えお品書き' },
            { id: '/english/toeic/sounds', label: '聞き酒ノート' },
            { id: '/english/toeic/traps', label: '引っかけ毒見帳' },
            { id: '/english/toeic/score', label: 'スコア通知表' },
            { id: '/english/toeic/mistakes', label: '反省ノート' },
            { id: '/english/toeic/achievements', label: 'のれんの勲章' },
            { id: '/english/toeic/words', label: 'TOEIC頻出310語' },
            { id: '/english/tonio-words', label: 'TOEIC英単語' },
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
            { id: '/memoria', label: 'メモリア' },
        ],
    },
    {
        id: 'lisque',
        label: 'リスクエ',
        tagline: '30日リスニング特訓',
        color: C.blue,
        basePath: '/english/lisque',
        items: [
            { id: '/english/lisque', label: 'リスクエ HOME' },
            { id: '/english/lisque/lp', label: 'リスクエとは？' },
        ],
    },
    {
        id: 'yomique',
        label: 'ヨミクエ',
        tagline: '30日リーディング特訓',
        color: C.orange,
        basePath: '/english/yomique',
        items: [
            { id: '/english/yomique', label: 'ヨミクエ HOME' },
            { id: '/english/yomique/lp', label: 'ヨミクエとは？' },
        ],
    },
    {
        id: 'native365',
        label: 'ネイティブ365',
        tagline: '英語の最後の1マイル',
        color: C.purple,
        basePath: '/english/native365',
        items: [
            { id: '/english/native365', label: 'ネイティブ365 HOME' },
            { id: '/english/native365/phrases', label: 'Phrase Bank', featured: true },
            { id: '/english/native365/lp', label: 'ネイティブ365とは？' },
        ],
    },
];

// ─── 商品を絞るための非表示設定 (コードは残す・戻すのはここを編集するだけ) ──
// 売る2本に集約: 居酒屋TOEIC + 英会話マスター365。他はナビから隠す。
const HIDDEN_PROGRAMS = new Set(['tokyo52', 'lisque', 'yomique', 'native365']);
// 居酒屋TOEIC はコア4つだけ表示: のれん30夜 / 居酒屋300フレーズ / TOEIC頻出310語 / スコア通知表
const HIDDEN_ITEMS = new Set([
    '/english/toeic/episodes',
    '/english/toeic/characters',
    '/english/toeic/guide',
    '/english/toeic/paraphrase',
    '/english/toeic/sounds',
    '/english/toeic/traps',
    '/english/toeic/mistakes',
    '/english/toeic/achievements',
    '/english/tonio-words',
]);

// ─── Component ─────────────────────────────────────────────

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
    // showMore removed -- all items in programs now

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
        if (pathname.startsWith('/english/izakaya-toeic/kaiwa') || pathname.startsWith('/english/my-training') || pathname.startsWith('/english/5min') || pathname.startsWith('/english/goroku') || pathname.startsWith('/english/grind') || pathname.startsWith('/english/my-log')) {
            setExpandedProgram('kaiwa');
        } else if (pathname.startsWith('/english/toeic') || pathname.startsWith('/english/tonio-words')) {
            setExpandedProgram('izakaya');
        } else if (pathname.startsWith('/english/tokyo52') || pathname.startsWith('/memoria')) {
            setExpandedProgram('tokyo52');
        } else if (pathname.startsWith('/english/lisque')) {
            setExpandedProgram('lisque');
        } else if (pathname.startsWith('/english/yomique')) {
            setExpandedProgram('yomique');
        } else if (pathname.startsWith('/english/native365')) {
            setExpandedProgram('native365');
        }
        // (legacy auto-expand removed)
    }, [pathname]);

    // ─── Determine which app the user is currently inside ─────
    // Returns null when on shared/root pages → show all programs.
    const currentAppId: string | null = (() => {
        if (!pathname) return null;
        if (
            pathname.startsWith('/english/izakaya-toeic/kaiwa') ||
            pathname.startsWith('/english/my-training') ||
            pathname.startsWith('/english/5min') ||
            pathname.startsWith('/english/goroku')
        ) return 'kaiwa';
        if (
            pathname.startsWith('/english/toeic') ||
            pathname.startsWith('/english/tonio-words')
        ) return 'izakaya';
        if (pathname.startsWith('/english/tokyo52') || pathname.startsWith('/memoria')) return 'tokyo52';
        if (pathname.startsWith('/english/lisque')) return 'lisque';
        if (pathname.startsWith('/english/yomique')) return 'yomique';
        if (pathname.startsWith('/english/native365')) return 'native365';
        return null;
    })();

    const shownPrograms = PROGRAMS.filter(p => !HIDDEN_PROGRAMS.has(p.id));
    const visiblePrograms = currentAppId
        ? shownPrograms.filter(p => p.id === currentAppId)
        : shownPrograms;

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english/toeic') return pathname === '/english/toeic' || pathname === '/english/toeic/program';
        if (path === '/english/izakaya-toeic/kaiwa') return pathname === '/english/izakaya-toeic/kaiwa';
        if (path === '/english/training/card-preview') return pathname === '/english/training/card-preview';
        if (path === '/english/training') return pathname === '/english/training' || pathname.startsWith('/english/training/card-slot');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        return pathname === path || pathname.startsWith(path + '/');
    };

    const toggleProgram = (id: string) => {
        const program = PROGRAMS.find(p => p.id === id);
        if (expandedProgram === id) {
            // Already expanded — collapse
            setExpandedProgram(null);
        } else {
            // Expand + navigate to HOME (first item)
            setExpandedProgram(id);
            if (program) {
                router.push(program.items[0].id);
            }
        }
    };

    // ─── Render helpers ────────────────────────────────────

    const renderSubItem = (item: { id: string; label: string; featured?: boolean }, color: string) => {
        const active = isActive(item.id);
        if (item.featured) {
            return (
                <Link key={item.id} href={item.id} style={{ textDecoration: 'none', display: 'block', margin: '3px 8px 3px 16px' }}>
                    <div style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: active ? `linear-gradient(135deg, ${color}18, ${color}08)` : `${color}06`,
                        border: `1px solid ${active ? color + '40' : color + '18'}`,
                        color: active ? '#1a1a1a' : '#555',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                    }}>
                        <span style={{
                            width: 5, height: 5, borderRadius: 2,
                            backgroundColor: active ? color : color + '80',
                            flexShrink: 0,
                        }} />
                        {item.label}
                    </div>
                </Link>
            );
        }
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
                        {program.items.filter(item => !HIDDEN_ITEMS.has(item.id)).map(item => renderSubItem(item, program.color))}
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
                    <SectionLabel text={currentAppId ? 'CURRENT APP' : 'PROGRAMS'} />
                    {visiblePrograms.map(p => <ProgramCard key={p.id} program={p} />)}
                    {currentAppId && (
                        <Link href="/english" style={{ textDecoration: 'none', display: 'block', margin: '4px 16px 8px' }}>
                            <div style={{
                                padding: '6px 12px',
                                fontSize: 11,
                                color: '#888',
                                border: '1px dashed #d5d5d5',
                                borderRadius: 6,
                                textAlign: 'center',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                            }}>
                                ← 他のアプリを見る
                            </div>
                        </Link>
                    )}

                    {/* ── TOOLS ── */}
                    <SectionLabel text="TOOLS" />
                    {renderToolItem({ id: '/english/noren', label: 'のれん', color: C.green })}
                    {/* Sub-item: 俺の旅 — personal journey under のれん */}
                    {(() => {
                        const active = isActive('/english/noren/me');
                        return (
                            <Link href="/english/noren/me" style={{ textDecoration: 'none', display: 'block' }}>
                                <div style={{
                                    padding: '6px 20px 6px 36px',
                                    color: active ? '#1a1a1a' : '#888',
                                    backgroundColor: active ? (C.green + '10') : 'transparent',
                                    borderLeft: active ? `2px solid ${C.green}` : '2px solid transparent',
                                    fontSize: 12,
                                    fontWeight: active ? 600 : 400,
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}>
                                    <span style={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        backgroundColor: active ? C.green : '#bbb',
                                        flexShrink: 0,
                                    }} />
                                    俺の旅
                                </div>
                            </Link>
                        );
                    })()}
                    {renderToolItem({ id: '/english/harvest', label: 'Movie Harvest', color: '#D4AF37' })}
                    {renderToolItem({ id: '/english/jp-yt', label: '罪悪感ゼロ英語 (JP→EN)', color: '#0EA5E9' })}
                    {renderToolItem({ id: '/english/jp-yt-v2', label: '罪悪感ゼロ TODAY (v2)', color: '#0EA5E9' })}
                    {renderToolItem({ id: '/english/survival', label: '修羅場英会話 v3 (会話シミュレーター)', color: '#DC2626' })}
                    {renderToolItem({ id: '/english/dictation', label: '聞き取りディクテーション v4', color: '#7C3AED' })}
                    {renderToolItem({ id: '/english/interpret', label: '同時通訳ジム v5', color: '#0891B2' })}
                    {renderToolItem({ id: '/english/reflex', label: '3秒で返せ v6', color: '#EA580C' })}
                    {renderToolItem({ id: '/english/story', label: '物語没入チャット v7', color: '#DB2777' })}
                    {renderToolItem({ id: '/english/training/card-preview', label: 'カードコレクション', color: '#A855F7' })}
                    {renderToolItem({ id: '/english/dashboard', label: 'ダッシュボード', color: '#D4AF37' })}

                    {/* CONTENT section removed -- items moved into programs */}

                    {/* ── その他 ── */}
                    <SectionLabel text="その他" />
                    {renderToolItem({ id: '/install', label: 'ホーム画面に追加', color: C.gold })}
                    {renderToolItem({ id: '/english/settings', label: '設定', color: '#78716C' })}
                    <button
                        onClick={() => {
                            localStorage.removeItem('tl_chosen_app');
                            router.push('/');
                        }}
                        style={{
                            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                            padding: '8px 20px', textAlign: 'left',
                            fontSize: 13, fontWeight: 500, color: '#666',
                            borderLeft: '3px solid transparent',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        アプリ切り替え
                    </button>

                    {/* MORE section removed -- all items in programs now */}
                </nav>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: 56 }} />}
        </>
    );
}
