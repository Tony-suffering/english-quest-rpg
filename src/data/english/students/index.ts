import type { Student } from './types';
import { GEORGE } from './george';

export type { Student, StudentLesson, StudentPhrase, StudentCard } from './types';
export { studentCards } from './types';

/** 生徒の台帳。新しい生徒は data ファイルを足してここに登録する */
export const STUDENTS: Record<string, Student> = {
    [GEORGE.slug]: GEORGE,
};

export function getStudent(slug: string): Student | undefined {
    return STUDENTS[slug];
}
