'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [proAllDone, setProAllDone] = useState(false);
    const [memoriaAllDone, setMemoriaAllDone] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check if all items are completed
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

    // Close menu on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Main nav: 商品として見せるもの
    const allMainItems = [
        { id: '/english', label: 'ホーム / 遊び方' },
        { id: '/english/5min', label: '5min 英会話' },
        { id: '/english/dashboard', label: 'ダッシュボード' },
        { id: '/english/quest', label: 'Quest (冒険)' },
        { id: '/english/training', label: 'トレーニング' },
        { id: '/english/training/card-preview', label: 'カードコレクション' },
        { id: '/memoria', label: 'メモリア' },
        { id: '/english/pro', label: 'プロの解説' },
        { id: '/english/requiem', label: 'レクイエム鎮魂歌' },
        { id: '/english/goroku', label: '俺語録' },
        { id: '/english/conversation', label: '日常会話マスター' },
        { id: '/english/nihongo', label: '日本語から学ぶ' },
        { id: '/english/everyday-words', label: '日常英単語' },
        { id: '/english/tonio-words', label: 'TONIO WORDS' },
        { id: '/english/eikaiwa-lab', label: '英会話Lab' },
        { id: '/english/settings', label: '設定' },
    ];

    const mainItems = allMainItems;


    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english') return pathname === '/english';
        if (path === '/english/dashboard') return pathname === '/english/dashboard';
        if (path === '/english/training') return pathname === '/english/training' || pathname === '/english/training/guide';
        if (path === '/english/phrases') return pathname.startsWith('/english/phrases');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        if (path === '/podcast') return pathname.startsWith('/podcast');
        return pathname.startsWith(path);
    };


    const renderNavItem = (item: { id: string; label: string }, compact = false) => {
        const allDone = item.id === '/english/pro' ? proAllDone
            : item.id === '/memoria' ? memoriaAllDone
            : false;
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: compact ? '7px 24px' : '10px 24px',
                    color: active ? '#1a1a1a' : compact ? '#999' : '#666',
                    backgroundColor: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: compact ? '12px' : '13px',
                    fontWeight: active ? '600' : '400',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {item.label}
                    {allDone && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '56px',
                    backgroundColor: '#F5F5F4',
                    borderBottom: '1px solid #e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    zIndex: 1001,
                }}>
                    <Link href="/english/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#D4AF37', letterSpacing: '-0.5px' }}>英語魂</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            transition: 'all 0.2s ease',
                            transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            opacity: isOpen ? 0 : 1,
                            transition: 'opacity 0.2s ease',
                        }} />
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            transition: 'all 0.2s ease',
                            transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                        }} />
                    </button>
                </div>
            )}

            {/* Overlay */}
            {isMobile && isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                width: '240px',
                backgroundColor: '#F5F5F4',
                borderRight: '1px solid #e5e5e5',
                padding: isMobile ? '72px 0 24px' : '24px 0',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto',
                zIndex: 1000,
                left: isMobile ? (isOpen ? 0 : '-240px') : (desktopOpen ? 0 : '-240px'),
                transition: 'left 0.25s ease',
            }}>
                {/* Logo - Desktop only */}
                {!isMobile && (
                    <div style={{ padding: '0 24px', marginBottom: '32px' }}>
                        <Link href="/english/dashboard" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '8px',
                            }}>
                                <span style={{
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    color: '#D4AF37',
                                    letterSpacing: '0.05em',
                                }}>
                                    英語魂
                                </span>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '600',
                                    color: '#bbb',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}>
                                    EIGODAMASHII
                                </span>
                            </div>
                            <div style={{
                                fontSize: '10px',
                                color: '#bbb',
                                marginTop: '6px',
                                letterSpacing: '0.5px',
                            }}>
                                止まらない英語を、ここから。
                            </div>
                        </Link>
                    </div>
                )}

                {/* Navigation */}
                <nav style={{ flex: 1 }}>
                    {/* Main Items */}
                    {mainItems.map(item => renderNavItem(item))}

                </nav>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: '56px' }} />}
        </>
    );
}
