'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [proAllDone, setProAllDone] = useState(false);
    const [memoriaAllDone, setMemoriaAllDone] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let pro = 0, mem = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            if (key.startsWith('pro_') && key.endsWith('_completed') && localStorage.getItem(key) === 'true') pro++;
            if (key.startsWith('memoria_') && key.endsWith('_completed') && localStorage.getItem(key) === 'true') mem++;
        }
        const proTotal = parseInt(localStorage.getItem('pro_total') || '0', 10);
        const memTotal = parseInt(localStorage.getItem('memoria_total') || '0', 10);
        setProAllDone(proTotal > 0 && pro >= proTotal);
        setMemoriaAllDone(memTotal > 0 && mem >= memTotal);
    }, [pathname]);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    // ── STEP 1-3: Core learning flow ──
    const flowItems = [
        { id: '/english/5min', label: '5min 英会話', step: '1', color: '#10B981' },
        { id: '/english/training', label: 'トレーニング', step: '2', color: '#D4AF37' },
        { id: '/english/quest', label: 'Quest (冒険)', step: '3', color: '#3B82F6' },
    ];

    // ── Essential tools (always visible) ──
    const essentialItems = [
        { id: '/english/training/guide', label: 'ガイド' },
        { id: '/english/dashboard', label: 'ダッシュボード' },
        { id: '/english/training/card-preview', label: 'カードコレクション' },
        { id: '/english/settings', label: '設定' },
    ];

    // ── More features (collapsible) ──
    const moreItems = [
        { id: '/english/arena', label: 'Arena (バトル)' },
        { id: '/memoria', label: 'メモリア' },
        { id: '/english/pro', label: 'プロの解説' },
        { id: '/english/requiem', label: 'レクイエム鎮魂歌' },
        { id: '/english/goroku', label: '俺語録' },
        { id: '/english/conversation', label: '日常会話マスター' },
        { id: '/english/nihongo', label: '日本語から学ぶ' },
        { id: '/english/everyday-words', label: '日常英単語' },
        { id: '/english/tonio-words', label: 'TONIO WORDS' },
        { id: '/english/eikaiwa-lab', label: '英会話Lab' },
        { id: '/english/self-master', label: 'セルフマスター' },
        { id: '/english/speaking-guide', label: 'スピーキングガイド' },
    ];

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english') return pathname === '/english';
        if (path === '/english/dashboard') return pathname === '/english/dashboard';
        if (path === '/english/training') return pathname === '/english/training';
        if (path === '/english/training/guide') return pathname === '/english/training/guide';
        if (path === '/english/training/card-preview') return pathname.startsWith('/english/training/card');
        if (path === '/english/phrases') return pathname.startsWith('/english/phrases');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        return pathname.startsWith(path);
    };

    // Auto-expand "more" if user is on a non-core/non-essential page
    useEffect(() => {
        const allVisible = [...flowItems, ...essentialItems, { id: '/english' }];
        if (pathname && !allVisible.some(item => isActive(item.id))) {
            setShowMore(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderFlowItem = (item: { id: string; label: string; step: string; color: string }) => {
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
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{
                        width: 20, height: 20, borderRadius: '50%',
                        backgroundColor: active ? item.color : '#ddd',
                        color: active ? '#fff' : '#999',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, flexShrink: 0,
                    }}>{item.step}</span>
                    {item.label}
                </div>
            </Link>
        );
    };

    const renderItem = (item: { id: string; label: string }, options?: { compact?: boolean; icon?: string }) => {
        const allDone = item.id === '/english/pro' ? proAllDone
            : item.id === '/memoria' ? memoriaAllDone : false;
        const active = isActive(item.id);
        const isSettings = item.id === '/english/settings';
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: options?.compact ? '7px 24px 7px 28px' : '9px 20px',
                    color: active ? '#1a1a1a' : (options?.compact ? '#888' : '#666'),
                    backgroundColor: active
                        ? (isSettings ? 'rgba(212, 175, 55, 0.12)' : 'rgba(212, 175, 55, 0.08)')
                        : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: options?.compact ? 12 : 13,
                    fontWeight: active ? 600 : (isSettings ? 500 : 400),
                    transition: 'all 0.15s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {options?.icon && <span style={{ fontSize: 11, opacity: 0.6 }}>{options.icon}</span>}
                        {item.label}
                    </span>
                    {allDone && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    )}
                </div>
            </Link>
        );
    };

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
                        <span style={{ fontSize: 18, fontWeight: 900, color: '#D4AF37', letterSpacing: '-0.5px' }}>英語魂</span>
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
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37', letterSpacing: '0.05em' }}>
                                    英語魂
                                </span>
                                <span style={{ fontSize: 10, fontWeight: 600, color: '#bbb', letterSpacing: '0.08em' }}>
                                    RPG
                                </span>
                            </div>
                            <div style={{ fontSize: 10, color: '#bbb', marginTop: 4, letterSpacing: '0.5px' }}>
                                喋れないなら、作ればいい。
                            </div>
                        </Link>
                    </div>
                )}

                <nav style={{ flex: 1 }}>
                    {/* HOME */}
                    {renderItem({ id: '/english', label: 'HOME' })}

                    {/* Divider + Section Label */}
                    <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '12px 20px 8px' }} />
                    <div style={{ padding: '0 20px 6px', fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
                        LEARNING FLOW
                    </div>

                    {/* Core 3 steps */}
                    {flowItems.map(item => renderFlowItem(item))}

                    {/* Divider + Essentials */}
                    <div style={{ height: 1, backgroundColor: '#e5e5e5', margin: '12px 20px 8px' }} />
                    <div style={{ padding: '0 20px 6px', fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: '0.2em' }}>
                        ESSENTIALS
                    </div>

                    {essentialItems.map(item => renderItem(item))}

                    {/* Divider + More toggle */}
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
