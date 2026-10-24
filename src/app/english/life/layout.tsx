import type { Metadata } from 'next';

export const metadata: Metadata = {
    manifest: '/life-app.json',
    title: 'Life録音',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Life録音',
    },
};

export default function LifeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
