import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getStudent } from '@/data/english/students';
import { cookieName, keyMatches } from '@/data/english/students/access';
import StudentClient from './StudentClient';

/**
 * 生徒ページ: /english/students/<slug>
 *
 * 本人だけが開ける。
 *   - コーチが渡す個別アドレス: /english/students/<slug>?key=<合言葉>
 *     → /enter で cookie を置いて、このページに戻る
 *   - cookie が合えば表示。無い・違う → とにおの LP(/) に飛ばす
 * カードはコーチが data に書いた表現だけ。進捗は生徒の端末に保存される。検索には出さない。
 */

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ key?: string }>;
};

// cookie で本人かどうかを見るページなので、必ずリクエスト時に描画する(静的生成すると
// ビルド時の「cookie 無し」の結果が全員に配られてしまう)。台帳に無い slug は middleware が LP へ返す
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const student = getStudent(slug);
    // 本人以外(middleware を通っていない経路)には名前を出さない
    const jar = await cookies();
    const ok = !!student && keyMatches(jar.get(cookieName(slug))?.value, student.accessHash);
    const name = ok && student ? student.name : '';
    return {
        title: name ? `${name}の英語カード | とにおラボ` : 'とにおラボ | TONIO LAB',
        description: name ? `${name}さんがレッスンで練習した英語をカードで復習するページ。` : undefined,
        robots: { index: false, follow: false },
    };
}

export default async function StudentPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const student = getStudent(slug);
    if (!student) notFound();

    const { key } = await searchParams;
    if (key) {
        // 合言葉つきの個別アドレス → cookie を置く入口へ
        redirect(`/english/students/${slug}/enter?key=${encodeURIComponent(key)}`);
    }

    const jar = await cookies();
    const token = jar.get(cookieName(slug))?.value;
    if (!keyMatches(token, student.accessHash)) {
        // 本人以外は とにおの LP へ
        redirect('/');
    }

    return <StudentClient student={student} />;
}
