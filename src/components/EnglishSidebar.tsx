'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

    // Close menu on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const mainItems = [
        { id: '/english/training', label: 'Training' },
        { id: '/english/quest', label: 'Quest' },
        { id: '/english/world-map', label: 'World Map' },
        { id: '/english/collection', label: 'Collection' },
        { id: '/english/everyday-words', label: 'Everyday Words' },
        { id: '/english/strategy', label: 'Strategy' },
    ];

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/english/training') return pathname === '/english/training';
        if (path === '/english/quest') return pathname === '/english/quest';
        if (path === '/english/world-map') return pathname === '/english/world-map';
        if (path === '/english/collection') return pathname === '/english/collection';
        if (path === '/english/strategy') return pathname === '/english/strategy';
        return pathname.startsWith(path);
    };

    const renderNavItem = (item: { id: string; label: string }) => {
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: '10px 24px',
                    color: active ? '#1a1a1a' : '#666',
                    backgroundColor: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: '13px',
                    fontWeight: active ? '600' : '400',
                    transition: 'all 0.15s ease',
                }}>
                    {item.label}
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
                    <Link href="/english/training" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#D4AF37', letterSpacing: '-0.5px' }}>English Quest RPG</span>
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
                        <Link href="/english/training" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '8px',
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    fontWeight: '900',
                                    color: '#D4AF37',
                                    letterSpacing: '0.02em',
                                }}>
                                    English Quest
                                </span>
                            </div>
                            <div style={{
                                fontSize: '10px',
                                color: '#bbb',
                                marginTop: '6px',
                                letterSpacing: '0.5px',
                            }}>
                                RPG
                            </div>
                        </Link>
                    </div>
                )}

                {/* Navigation */}
                <nav style={{ flex: 1 }}>
                    {mainItems.map(item => renderNavItem(item))}
                </nav>

                {/* Settings Link */}
                <Link href="/english/settings" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '10px 24px',
                        color: isActive('/english/settings') ? '#1a1a1a' : '#aaa',
                        backgroundColor: isActive('/english/settings') ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                        borderLeft: isActive('/english/settings') ? '3px solid #D4AF37' : '3px solid transparent',
                        fontSize: '13px',
                        fontWeight: isActive('/english/settings') ? '600' : '400',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s ease',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                    </div>
                </Link>
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: '56px' }} />}
        </>
    );
}
