import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '練習する | とにおラボ',
    description: '日本語を見て英語を思い出し、答えと音声を確かめて、自分で評価する。1セット10問前後。無料・登録不要。',
    robots: { index: false, follow: true },
};

export default function TodayLayout({ children }: { children: React.ReactNode }) {
    return children;
}
