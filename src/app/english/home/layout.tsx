import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '今日の練習 | とにおラボ',
    description: '単語は知っているのに会話で出てこない人のための、1日5分の英語練習。日本語を見て英語を思い出し、自己評価するだけ。無料・登録不要、記録は端末内に保存。',
    openGraph: {
        title: '今日の練習 | とにおラボ',
        description: '日本語を見て英語を思い出す練習。思い出せなかった表現は後日もう一度出ます。無料・登録不要。',
        url: '/english/home',
        siteName: 'とにおラボ',
        type: 'website',
    },
    alternates: { canonical: '/english/home' },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
