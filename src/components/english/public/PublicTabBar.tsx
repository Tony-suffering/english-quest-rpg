'use client';

/**
 * スマホ用の下タブ(今日の練習 / 教材 / 記録)
 * /english 配下の全ページに出る。PC ではサイドバーが同じ3つを持つので出さない。
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CirclePlay, BookOpen, CalendarDays } from 'lucide-react';

export const PUBLIC_TABS = [
    { href: '/english/home', label: '今日の練習', match: ['/english/home', '/english/today'], Icon: CirclePlay },
    { href: '/english/materials', label: '教材', match: ['/english/materials'], Icon: BookOpen },
    { href: '/english/record', label: '記録', match: ['/english/record'], Icon: CalendarDays },
] as const;

export function isTabActive(pathname: string | null, match: readonly string[]): boolean {
    if (!pathname) return false;
    return match.some(m => pathname === m || pathname.startsWith(m + '/'));
}

export default function PublicTabBar() {
    const pathname = usePathname();
    return (
        <nav
            aria-label="主なメニュー"
            style={{
                position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 998,
                background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
                borderTop: '1px solid #E7E5E4',
                paddingBottom: 'env(safe-area-inset-bottom)',
            }}
        >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', height: 60 }}>
                {PUBLIC_TABS.map(t => {
                    const active = isTabActive(pathname, t.match);
                    return (
                        <Link
                            key={t.href}
                            href={t.href}
                            aria-current={active ? 'page' : undefined}
                            className="focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9A7B16]"
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                                textDecoration: 'none', color: active ? '#1C1917' : '#78716C', fontSize: 11, fontWeight: 800,
                                borderTop: active ? '2px solid #D4AF37' : '2px solid transparent',
                            }}
                        >
                            <t.Icon size={20} strokeWidth={active ? 2.4 : 1.8} color={active ? '#9A7B16' : '#78716C'} aria-hidden />
                            {t.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
