/**
 * 生徒ページ(コーチング)のデータ型
 *
 * コーチ(とにお)がレッスンごとに表現を足す。生徒はリンクを開くだけ。
 * カードの仕組みは /english/training と同じ(端末内保存版の TrainingClient)。
 * 進捗は生徒の端末(localStorage)にだけ残り、コーチの D1 にはつながない。
 */

export interface StudentPhrase {
    /** 生徒が言えるようになりたい英語(カードの表) */
    english: string;
    /** 日本語の手がかり(カードの裏。これを見て英語を思い出す) */
    japanese: string;
}

export interface StudentLesson {
    /** レッスンの日 YYYY-MM-DD。カードの日付になる */
    date: string;
    /** その日の一言(任意) */
    title?: string;
    phrases: StudentPhrase[];
}

export interface Student {
    /** URL に使う id。/english/students/<slug> */
    slug: string;
    name: string;
    coach: string;
    /**
     * 合言葉の SHA-256(hex)。合言葉そのものはコードに置かない。
     * 作り方: node -e "console.log(require('crypto').createHash('sha256').update('<合言葉>').digest('hex'))"
     */
    accessHash: string;
    /** ページ上部の一言(任意) */
    intro?: string;
    lessons: StudentLesson[];
}

/** TrainingClient に渡すカードの形 */
export interface StudentCard {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
}

/** レッスン日 + 連番で安定した id を作る(並び替えや追加で記録がずれない) */
export function studentCards(student: Student): StudentCard[] {
    const cards: StudentCard[] = [];
    for (const lesson of student.lessons) {
        const d = lesson.date.replace(/-/g, '');
        lesson.phrases.forEach((p, i) => {
            cards.push({
                id: `${student.slug}-${d}-${String(i + 1).padStart(2, '0')}`,
                english: p.english,
                japanese: p.japanese,
                category: 'lesson',
                date: lesson.date,
            });
        });
    }
    return cards;
}
