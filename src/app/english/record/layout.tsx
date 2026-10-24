import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '記録 | とにおラボ',
    description: '今日取り組んだ量、最近練習した日、復習する表現。記録は端末内に保存され、数字は自己評価の回数です。',
    robots: { index: false, follow: true },
};

export default function RecordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
