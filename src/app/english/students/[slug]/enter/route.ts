import { NextResponse } from 'next/server';
import { getStudent } from '@/data/english/students';
import { cookieName, keyMatches } from '@/data/english/students/access';

/**
 * 生徒ページの入口(予備): /english/students/<slug>/enter?key=<合言葉>
 *
 * 通常は middleware が ?key を処理する。ここは直接叩かれた時のため。
 * リダイレクト先は転送元のホスト(x-forwarded-host)で組む(開発環境で host が変わる事故を防ぐ)。
 */
function originOf(req: Request): string {
    const h = req.headers;
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? new URL(req.url).host;
    const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https');
    return `${proto}://${host}`;
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    const key = new URL(req.url).searchParams.get('key');
    const student = getStudent(slug);
    const origin = originOf(req);

    if (!student || !keyMatches(key, student.accessHash)) {
        return NextResponse.redirect(`${origin}/`, 302);
    }

    const res = NextResponse.redirect(`${origin}/english/students/${slug}`, 302);
    res.cookies.set({
        name: cookieName(slug),
        value: key!,
        httpOnly: true,
        secure: origin.startsWith('https'),
        sameSite: 'lax',
        path: `/english/students/${slug}`,
        maxAge: 60 * 60 * 24 * 365,
    });
    return res;
}
