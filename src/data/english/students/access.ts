/**
 * 生徒ページの合言葉(サーバー専用)
 *
 * - コードに置くのは合言葉の SHA-256 だけ。合言葉そのものはコーチが生徒に渡す
 * - 初回: /english/students/<slug>/enter?key=<合言葉> で cookie(httpOnly、1年)を置き、ページへ
 * - 以後: cookie の中身(合言葉)をハッシュして照合。合わなければ とにおの LP(/) へ
 * - cookie に入れるのは合言葉そのもの。ハッシュを入れると、公開リポを読んだ人が偽造できる
 */

import { createHash, timingSafeEqual } from 'node:crypto';

export function cookieName(slug: string): string {
    return `student_${slug}`;
}

export function hashKey(key: string): string {
    return createHash('sha256').update(key).digest('hex');
}

export function keyMatches(key: string | null | undefined, accessHash: string): boolean {
    if (!key || !accessHash) return false;
    const a = Buffer.from(hashKey(key), 'utf8');
    const b = Buffer.from(accessHash, 'utf8');
    return a.length === b.length && timingSafeEqual(a, b);
}
