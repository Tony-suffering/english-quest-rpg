import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '教材 | とにおラボ',
    description: '会話で使う表現の教材(百日課程・英会話マスター365・日本語から学ぶ・ひとこと英語帳)と、TOEIC・英検対策、英字新聞。すべて無料・登録不要。',
    alternates: { canonical: '/english/materials' },
};

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
