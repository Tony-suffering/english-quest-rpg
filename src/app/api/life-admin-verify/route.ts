import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pass = typeof body?.pass === 'string' ? body.pass : '';
    const expected = process.env.LIFE_ADMIN_PASS || '';
    if (!expected) {
      return NextResponse.json({ ok: false, error: 'LIFE_ADMIN_PASS not configured' }, { status: 500 });
    }
    if (pass === expected) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
