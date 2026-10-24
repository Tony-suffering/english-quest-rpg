import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStudent, STUDENTS } from '@/data/english/students';
import StudentClient from './StudentClient';

/**
 * 生徒ページ: /english/students/<slug>
 *
 * コーチがリンクを送り、生徒はリンクを開くだけ。登録なし。
 * カードはコーチが data に書いた表現だけ。進捗は生徒の端末に保存される。
 * 検索には出さない(本人に渡すリンク)。
 */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return Object.keys(STUDENTS).map(slug => ({ slug }));
}

// 台帳に無い slug は 404(生徒は data に登録した人だけ)
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const student = getStudent(slug);
    const name = student?.name ?? '生徒';
    return {
        title: `${name}の英語カード | とにおラボ`,
        description: `${name}さんがレッスンで練習した英語をカードで復習するページ。`,
        robots: { index: false, follow: false },
    };
}

export default async function StudentPage({ params }: Props) {
    const { slug } = await params;
    const student = getStudent(slug);
    if (!student) notFound();
    return <StudentClient student={student} />;
}
