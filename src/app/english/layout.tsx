'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import EnglishSidebar from '@/components/EnglishSidebar';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 印刷専用ページ / スマホ縦スクショ用ページはサイドバーなしの全画面
    // (印刷にナビが混入するのを防ぐ / スクショの画角をスマホ幅で正しく見せる)
    // /phrase365 と /rawpass 配下は商品LP+本編。外向けの顔なので内部ナビ(サイドバー)を見せない
    // /consult も同じ。note から直接来る外向けの窓口なので、俺の個人ナビは見せない
    // (/consult/inbox は自分用なのでサイドバーごと残す。完全一致で判定する)
    if (pathname?.endsWith('/print') || pathname?.endsWith('/tonight/screens') || pathname?.includes('/phrase365') || pathname?.includes('/rawpass') || pathname === '/english/consult') {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
            <EnglishSidebar desktopOpen={desktopSidebarOpen} />

            {/* Desktop Sidebar Toggle - Middle Left Tab */}
            {!isMobile && (
                <button
                    onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: desktopSidebarOpen ? '240px' : '0',
                        zIndex: 1002,
                        backgroundColor: '#164038',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0 12px 12px 0',
                        width: '24px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                        transition: 'left 0.25s ease',
                    }}
                    title={desktopSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                >
                    {desktopSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>
            )}

            <div style={{
                flex: 1,
                /**
                 * flex の子は min-width が auto のままだと、中身の最小幅より小さくなれない。
                 * トレーニングの画面は中身が415pxあるので、390pxのスマホでは
                 * ここが縮まずに画面をはみ出し、全体が横スクロールになっていた。
                 * (カレンダーが横に並んで見えるのもこれ)
                 */
                minWidth: 0,
                maxWidth: '100%',
                marginLeft: isMobile ? 0 : (desktopSidebarOpen ? '240px' : '0'),
                paddingTop: isMobile ? '56px' : 0,
                transition: 'margin-left 0.25s ease',
            }}>
                {children}
            </div>
        </div>
    );
}
