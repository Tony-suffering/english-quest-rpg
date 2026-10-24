'use client';

/**
 * /english 配下の共通レイアウト(公開版)
 *
 * - PC: 左サイドバー(今日の練習 / 教材 / 記録 + いま使っている教材 + 補助メニュー)
 * - スマホ: 上にブランドとメニュー、下に3つのタブ
 * - 初回に出していた5画面の説明(旧 WelcomeFlow)は出さない。玄関そのものが説明になる
 * - /api/* をブラウザ内で受ける local-api はそのまま(全データが端末内に留まる仕組み)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import EnglishSidebar from '@/components/EnglishSidebar';
import InstallBanner from '@/components/InstallBanner';
import PublicTabBar from '@/components/english/public/PublicTabBar';
import { installLocalApi } from '@/lib/local-api';
import { getSettings } from '@/lib/settings';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isKaiwaPage = pathname?.startsWith('/english/izakaya-toeic/kaiwa') ?? false;
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const bgmRef = useRef<HTMLAudioElement | null>(null);
    const bgmStartedRef = useRef(false);

    // Start BGM on first user interaction (autoplay policy requires gesture)
    const startBGM = useCallback(() => {
        if (bgmStartedRef.current) return;
        const st = getSettings();
        if (!st.bgmEnabled || !st.soundEnabled) return;
        bgmStartedRef.current = true;

        const audio = new Audio('/audio/bgm-main.mp3');
        audio.loop = true;
        // Keep volume low: multiply by 0.15 cap
        audio.volume = Math.min((st.bgmVolume / 100) * (st.volume / 100) * 0.15, 0.15);
        audio.play().catch(() => { bgmStartedRef.current = false; });
        bgmRef.current = audio;

        // Poll settings every 2 seconds
        const interval = setInterval(() => {
            const s = getSettings();
            if (!s.bgmEnabled || !s.soundEnabled) {
                audio.pause();
            } else {
                audio.volume = Math.min((s.bgmVolume / 100) * (s.volume / 100) * 0.15, 0.15);
                if (audio.paused) audio.play().catch(() => {});
            }
        }, 2000);
        window.addEventListener('beforeunload', () => { clearInterval(interval); audio.pause(); });
    }, []);

    useEffect(() => {
        installLocalApi();
        // 旧版の初回説明フラグ。トップページの振り分けが読むので立てておく
        try { if (!localStorage.getItem('tl_welcome_seen')) localStorage.setItem('tl_welcome_seen', 'true'); } catch { /* noop */ }
        setIsLoading(false);

        // Start BGM on first click/tap/keydown anywhere
        const handler = () => { startBGM(); window.removeEventListener('click', handler); window.removeEventListener('keydown', handler); };
        window.addEventListener('click', handler);
        window.addEventListener('keydown', handler);
        return () => { window.removeEventListener('click', handler); window.removeEventListener('keydown', handler); };
    }, [startBGM]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A8A29E', fontSize: 13 }}>
                読み込み中
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <EnglishSidebar desktopOpen={desktopSidebarOpen} />

            {/* Desktop Sidebar Toggle - Middle Left Tab (hidden on kaiwa/365 pages) */}
            {!isKaiwaPage && !isMobile && (
                <button
                    onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: desktopSidebarOpen ? '260px' : '0',
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
                    aria-label={desktopSidebarOpen ? 'メニューを閉じる' : 'メニューを開く'}
                    title={desktopSidebarOpen ? 'メニューを閉じる' : 'メニューを開く'}
                >
                    {desktopSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>
            )}

            <div style={{
                flex: 1,
                minWidth: 0,
                marginLeft: isMobile ? 0 : (desktopSidebarOpen ? '260px' : '0'),
                paddingTop: isMobile ? '56px' : 0,
                paddingBottom: isMobile ? 'calc(60px + env(safe-area-inset-bottom))' : 0,
                transition: 'margin-left 0.25s ease',
            }}>
                {children}
            </div>

            {isMobile && <PublicTabBar />}
            <InstallBanner />
        </div>
    );
}
