'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
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

    // ── のれん30夜 (Main) ──
    const programItems = [
        { id: '/english/izakaya-toeic', label: 'のれん30夜', color: '#D4AF37' },
        { id: '/english/izakaya-toeic/kaiwa', label: '英会話マスター365', color: '#10B981' },
        { id: '/english/izakaya-toeic/kaiwa/lp', label: '-- 英会話マスター365とは？', color: '#10B981' },
        { id: '/english/tokyo52', label: 'Tokyo52', color: '#8B5CF6' },
        { id: '/english/izakaya-toeic/characters', label: '常連ファイル', color: '#92400E' },
        { id: '/english/izakaya-toeic/episodes', label: 'エピソード一覧', color: '#D4AF37' },
        { id: '/english/training', label: '仕込み帳', color: '#10B981' },
        { id: '/english/training/card-preview', label: 'カードコレクション', color: '#A855F7' },
        { id: '/english/izakaya-toeic/words', label: '今日の単語', color: '#3B82F6' },
    ];

    // ── マスターの棚 ──
    const studyItems = [
        { id: '/english/izakaya-toeic/guide', label: 'マスターの攻略メモ' },
        { id: '/english/izakaya-toeic/paraphrase', label: '言い換えお品書き' },
        { id: '/english/izakaya-toeic/sounds', label: '聞き酒ノート' },
        { id: '/english/izakaya-toeic/traps', label: '引っかけ毒見帳' },
    ];

    // ── 通知表 ──
    const progressItems = [
        { id: '/english/izakaya-toeic/score', label: 'スコア通知表' },
        { id: '/english/izakaya-toeic/mistakes', label: '反省ノート' },
        { id: '/english/izakaya-toeic/achievements', label: 'のれんの勲章' },
    ];

    // ── More (legacy features) ──
    const moreItems = [
        { id: '/journal', label: 'ジャーナル' },
        { id: '/english/5min', label: '5min 英会話' },
        { id: '/english/quest', label: 'Quest (冒険)' },
        { id: '/memoria', label: 'メモリア' },
        { id: '/english/goroku', label: '俺語録' },
        { id: '/english/dashboard-v2', label: 'ダッシュボード' },
        { id: '/english/tonio-words', label: 'TONIO WORDS' },
    ];

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english/izakaya-toeic') return pathname === '/english/izakaya-toeic' || pathname === '/english/izakaya-toeic/program';
        if (path === '/english/training/card-preview') return pathname === '/english/training/card-preview';
        if (path === '/english/training') return pathname === '/english/training' || pathname.startsWith('/english/training/card-slot');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        return pathname.startsWith(path);
    };

    // Auto-expand "more" if on a legacy page
    useEffect(() => {
        const mainItems = [...programItems, ...studyItems, ...progressItems];
        if (pathname && !mainItems.some(item => isActive(item.id))) {
            setShowMore(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderProgramItem = (item: { id: string; label: string; color: string }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: '10px 20px',
                    color: active ? '#1a1a1a' : '#555',
                    backgroundColor: active ? (item.color + '12') : 'transparent',
                    borderLeft: active ? `3px solid ${item.color}` : '3px solid transparent',
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    const renderItem = (item: { id: string; label: string }, options?: { compact?: boolean }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: options?.compact ? '7px 24px 7px 28px' : '9px 20px',
                    color: active ? '#1a1a1a' : (options?.compact ? '#888' : '#666'),
                    backgroundColor: active ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: options?.compact ? 12 : 13,
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
                </div>
            </Link>
        );
    };

    const SectionLabel = ({ text }: { text: string }) => (
        <>
            <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '12px 20px 8px' }} />
            <div style={{ padding: '0 20px 6px', fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
                {text}
            </div>
        </>
    );

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
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#92400E' }}>TOEIC</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#D4AF37' }}>酒場</span>
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
                width: 240, backgroundColor: '#F5F5F4',
                borderRight: '1px solid #e5e5e5',
                padding: isMobile ? '72px 0 24px' : '24px 0',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', height: '100vh', overflowY: 'auto',
                zIndex: 1000,
                left: isMobile ? (isOpen ? 0 : -240) : (desktopOpen ? 0 : -240),
                transition: 'left 0.25s ease',
            }}>
                {/* Logo - Desktop */}
                {!isMobile && (
                    <div style={{ padding: '0 24px', marginBottom: 24 }}>
                        <Link href="/english" style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                                <span style={{ fontSize: 20, fontWeight: 900, color: '#92400E' }}>
                                    TOEIC
                                </span>
                                <span style={{ fontSize: 20, fontWeight: 900, color: '#D4AF37' }}>
                                    酒場
                                </span>
                            </div>
                            <div style={{ fontSize: 10, color: '#bbb', marginTop: 4, letterSpacing: '0.3px' }}>
                                30日で点数UP + 英会話 + 作文力
                            </div>
                        </Link>
                    </div>
                )}

                <nav style={{ flex: 1 }}>
                    {/* のれん30夜 */}
                    <SectionLabel text="のれん30夜" />
                    {programItems.map(item => renderProgramItem(item))}

                    {/* マスターの棚 */}
                    <SectionLabel text="マスターの棚" />
                    {studyItems.map(item => renderItem(item))}

                    {/* 通知表 */}
                    <SectionLabel text="通知表" />
                    {progressItems.map(item => renderItem(item))}

                    {/* 設定 */}
                    <SectionLabel text="設定" />
                    {renderItem({ id: '/english/settings', label: '設定' })}

                    {/* More toggle */}
                    <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '12px 20px 8px' }} />
                    <button
                        onClick={() => setShowMore(!showMore)}
                        style={{
                            width: '100%', padding: '8px 20px', background: 'none',
                            border: 'none', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em',
                        }}
                    >
                        <span>MORE</span>
                        <span style={{
                            fontSize: 12, transition: 'transform 0.2s',
                            transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>v</span>
                    </button>

                    {showMore && moreItems.map(item => renderItem(item, { compact: true }))}
                </nav>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: 56 }} />}
        </>
    );
}
