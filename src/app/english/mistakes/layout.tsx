import type { Metadata } from 'next';

// 作者個人の記録。公開版の目次には載せず、検索にも出さない(URLは作者のために残す)
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
    return children;
}
