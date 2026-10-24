'use client';

/**
 * サイドバー(公開版 とにおラボ)
 *
 * 上から順に:
 *   1. メイン: 今日の練習 / 教材 / 記録
 *   2. いま使っている教材: 居酒屋TOEIC・英会話マスター365・ライトパスの中にいるときだけ、その教材の目次
 *   3. 補助: 使い方・案内 / 設定 / ホーム画面に追加
 *
 * 作者個人の記録(勉強記録、GRIND動画など)は公開版の目次に載せない。
 * 教材の目次(PROGRAMS)は既存のURLをそのまま使う。
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CirclePlay, BookOpen, CalendarDays } from 'lucide-react';
import { PUBLIC_TABS, isTabActive } from '@/components/english/public/PublicTabBar';

// ─── Color tokens ──────────────────────────────────────────
const C = {
    gold: '#D4AF37',
    deepGold: '#9A7B16',
    green: '#10B981',
    purple: '#8B5CF6',
    blue: '#3B82F6',
    orange: '#F97316',
    ink: '#1C1917',
    sub: '#78716C',
    faint: '#A8A29E',
    line: '#E7E5E4',
};

// ─── Program definitions(教材の目次。URLは既存のまま) ───────
interface Program {
    id: string;
    label: string;
    tagline: string;
    color: string;
    prefixes: string[];
    items: { id: string; label: string; featured?: boolean }[];
}

const PROGRAMS: Program[] = [
    {
        id: 'kaiwa',
        label: '英会話マスター365',
        tagline: '毎日10表現。居酒屋の6人と',
        color: C.green,
        prefixes: ['/english/izakaya-toeic/kaiwa', '/english/my-training', '/english/5min', '/english/goroku'],
        items: [
            { id: '/english/izakaya-toeic/kaiwa', label: 'マスター365 HOME' },
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
        tagline: '30日の物語でスコアUP',
        color: C.gold,
        prefixes: ['/english/toeic', '/english/tonio-words'],
        items: [
            { id: '/english/toeic', label: 'のれん30夜' },
            { id: '/english/toeic/sentences', label: '居酒屋300フレーズ', featured: true },
            { id: '/english/toeic/words', label: 'TOEIC頻出310語' },
            { id: '/english/toeic/score', label: 'スコア通知表' },
        ],
    },
    {
        id: 'writepass',
        label: 'ライトパス',
        tagline: '英検1級の英作文を30日で',
        color: C.gold,
        prefixes: ['/english/writepass', '/english/write'],
        items: [
            { id: '/english/writepass', label: 'ライトパスとは？' },
            { id: '/english/write/days', label: 'ライトパス 30日', featured: true },
            { id: '/english/writepass/koryaku', label: 'ライトパス 攻略読本' },
            { id: '/english/write/core5/sheet', label: 'CORE 5 — 1枚 (英作文)' },
            { id: '/english/write/sum5', label: 'SUM 5 — 要約の型' },
        ],
    },
    {
        id: 'course',
        label: '百日課程',
        tagline: '会話で本当によく出る1,000表現',
        color: C.blue,
        prefixes: ['/english/course'],
        items: [
            { id: '/english/course', label: '百日課程の海図' },
            { id: '/english/today?deck=course', label: 'この教材で練習する', featured: true },
        ],
    },
];

const AUX = [
    { id: '/english/info', label: '使い方・案内' },
    { id: '/english/settings', label: '設定' },
    { id: '/install', label: 'ホーム画面に追加' },
];

const TAB_ICON = { '/english/home': CirclePlay, '/english/materials': BookOpen, '/english/record': CalendarDays } as const;

// ─── Component ─────────────────────────────────────────────

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    const currentProgram = PROGRAMS.find(p => p.prefixes.some(pre => pathname === pre || (pathname?.startsWith(pre + '/') ?? false)
        || (pre === '/english/write' && pathname?.startsWith('/english/write/'))));

    const isActive = (path: string) => {
        if (!pathname) return false;
        const clean = path.split('?')[0];
        if (clean === '/english/toeic') return pathname === '/english/toeic' || pathname === '/english/toeic/program';
        if (clean === '/english/izakaya-toeic/kaiwa') return pathname === '/english/izakaya-toeic/kaiwa';
        if (clean === '/english/today') return false;
        return pathname === clean || pathname.startsWith(clean + '/');
    };

    // ─── Render helpers ────────────────────────────────────

    const MainItem = ({ href, label, match }: { href: string; label: string; match: readonly string[] }) => {
        const active = isTabActive(pathname, match);
        const Icon = TAB_ICON[href as keyof typeof TAB_ICON];
        return (
            <Link href={href} style={{ textDecoration: 'none', display: 'block', margin: '2px 12px' }} aria-current={active ? 'page' : undefined}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '11px 12px', borderRadius: 10,
                    background: active ? '#FFFBEB' : 'transparent',
                    border: `1px solid ${active ? '#FDE68A' : 'transparent'}`,
                    color: active ? C.ink : '#44403C',
                    fontSize: 14, fontWeight: 800,
                    transition: 'all 0.15s ease',
                }}>
                    {Icon && <Icon size={18} strokeWidth={active ? 2.4 : 1.8} color={active ? C.deepGold : C.sub} aria-hidden />}
                    {label}
                </div>
            </Link>
        );
    };

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
                        <span style={{ width: 5, height: 5, borderRadius: 2, backgroundColor: active ? color : color + '80', flexShrink: 0 }} />
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

    const renderAuxItem = (item: { id: string; label: string }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                    padding: '8px 20px',
                    color: active ? '#1a1a1a' : '#666',
                    backgroundColor: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                    borderLeft: active ? `3px solid ${C.gold}` : '3px solid transparent',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    const SectionLabel = ({ text }: { text: string }) => (
        <>
            <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '10px 20px 6px' }} />
            <div style={{ padding: '0 20px 4px', fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
                {text}
            </div>
        </>
    );

    const ProgramBlock = ({ program }: { program: Program }) => (
        <div style={{ margin: '0 12px 4px' }}>
            <div style={{
                padding: '10px 12px', borderRadius: 10,
                background: program.color + '08', border: `1px solid ${program.color}20`,
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: program.color, flexShrink: 0 }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>{program.label}</div>
                    <div style={{ fontSize: 10, color: program.color, marginTop: 1, letterSpacing: '0.02em' }}>{program.tagline}</div>
                </div>
            </div>
            <div style={{ paddingTop: 2, paddingBottom: 4 }}>
                {program.items.map(item => renderSubItem(item, program.color))}
            </div>
        </div>
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
                    <Link href="/english/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: C.gold }}>とにおラボ</span>
                        <span style={{ fontSize: 9, color: '#bbb', letterSpacing: '0.12em' }}>TONIO LAB</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
                        aria-expanded={isOpen}
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
                        <Link href="/english/home" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontSize: 20, fontWeight: 900, color: C.gold }}>とにおラボ</span>
                                <span style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.1em' }}>TONIO LAB</span>
                            </div>
                        </Link>
                    </div>
                )}

                <nav style={{ flex: 1, paddingTop: isMobile ? 0 : 8 }} aria-label="サイトのメニュー">
                    {PUBLIC_TABS.map(t => <MainItem key={t.href} href={t.href} label={t.label} match={t.match} />)}

                    {currentProgram && (
                        <>
                            <SectionLabel text="いま使っている教材" />
                            <ProgramBlock program={currentProgram} />
                            <Link href="/english/materials" style={{ textDecoration: 'none', display: 'block', margin: '4px 16px 8px' }}>
                                <div style={{
                                    padding: '6px 12px', fontSize: 11, color: '#888',
                                    border: '1px dashed #d5d5d5', borderRadius: 6, textAlign: 'center',
                                    fontWeight: 500, letterSpacing: '0.05em',
                                }}>
                                    ← ほかの教材を見る
                                </div>
                            </Link>
                        </>
                    )}

                    <SectionLabel text="そのほか" />
                    {AUX.map(renderAuxItem)}
                </nav>

                <div style={{ padding: '12px 20px 16px', fontSize: 10.5, lineHeight: 1.6, color: '#A8A29E' }}>
                    無料・登録不要。記録はこの端末の中にだけ保存されます。
                </div>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: 56 }} />}
        </>
    );
}
