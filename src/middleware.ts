import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getStudent } from '@/data/english/students';
import { cookieName, keyMatchesWeb } from '@/data/english/students/access-edge';

/**
 * 生徒ページ(/english/students/<slug>)のゲート
 *
 * ここで止めるので、本人以外には HTML を一切返さない(タイトルに名前も出ない)。
 *   - ?key=<合言葉> が合う → cookie(httpOnly、1年)を置いて、key を消した URL へ 307
 *   - cookie が合う         → 通す
 *   - それ以外              → とにおの LP(/) へ 307
 * 他のパスにはこの middleware は掛からない(matcher)。
 */

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function middleware(req: NextRequest) {
    const m = req.nextUrl.pathname.match(/^\/english\/students\/([^/]+)/);
    if (!m) return NextResponse.next();
    const slug = m[1];
    const student = getStudent(slug);
    const home = req.nextUrl.clone();
    home.pathname = '/';
    home.search = '';

    if (!student) return NextResponse.redirect(home, 307);

    const name = cookieName(slug);
    const key = req.nextUrl.searchParams.get('key');
    if (key) {
        if (await keyMatchesWeb(key, student.accessHash)) {
            const clean = req.nextUrl.clone();
            clean.pathname = `/english/students/${slug}`;
            clean.search = '';
            const res = NextResponse.redirect(clean, 307);
            res.cookies.set({
                name,
                value: key,
                httpOnly: true,
                secure: req.nextUrl.protocol === 'https:',
                sameSite: 'lax',
                path: `/english/students/${slug}`,
                maxAge: COOKIE_MAX_AGE,
            });
            return res;
        }
        return NextResponse.redirect(home, 307);
    }

    const token = req.cookies.get(name)?.value;
    if (await keyMatchesWeb(token, student.accessHash)) {
        const res = NextResponse.next();
        res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
        res.headers.set('Cache-Control', 'private, no-store');
        return res;
    }
    return NextResponse.redirect(home, 307);
}

export const config = {
    matcher: ['/english/students/:path*'],
};
