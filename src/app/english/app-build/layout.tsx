'use client';

import { useState, useEffect } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';

export default function AppBuildLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <EnglishSidebar />
            <main
                style={{
                    position: 'fixed',
                    top: isMobile ? '56px' : 0,
                    left: isMobile ? 0 : '240px',
                    right: 0,
                    bottom: 0,
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                }}
            >
                {children}
            </main>
        </>
    );
}
