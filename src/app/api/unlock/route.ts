import { NextResponse } from 'next/server';

/**
 * 解錠コードの照合。RAW PASS / ACCESS 共通。
 *
 * 決済は Stripe Payment Link などに任せて、購入後の案内文でコードを渡す運用を想定。
 * webhook もDBも要らないぶん、同じコードを配ることになるので厳密な本人確認にはならない。
 * ここは「越える手間を1つ置く」ためのもので、破ろうと思えば破れる。
 *
 * コードは環境変数に置く(クライアントに配らないのはこれが理由)。
 *   RAWPASS_CODES=RAW-8F2K,RAW-9QX4
 *   ACCESS_CODES=ACC-3M7P,ACC-6TT1
 *   WORDBOOK_CODES=WB-1A2B,WB-5C9D
 * 未設定なら「販売前」とみなして 503。ページ側は決済リンク未設定なら全開放するので、
 * 販売前に誰かが締め出される事故は起きない。
 */

const ENV_BY_PRODUCT: Record<string, string> = {
    rawpass: 'RAWPASS_CODES',
    access: 'ACCESS_CODES',
    wordbook: 'WORDBOOK_CODES',
};

export async function POST(req: Request) {
    let product = '';
    let code = '';
    try {
        const body = await req.json();
        product = String(body?.product ?? '').trim().toLowerCase();
        code = String(body?.code ?? '').trim().toUpperCase();
    } catch {
        return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
    }

    const envName = ENV_BY_PRODUCT[product];
    if (!envName) {
        return NextResponse.json({ ok: false, error: 'unknown_product' }, { status: 400 });
    }
    if (!code) {
        return NextResponse.json({ ok: false, error: 'empty' }, { status: 400 });
    }

    const codes = (process.env[envName] || '')
        .split(',')
        .map(s => s.trim().toUpperCase())
        .filter(Boolean);

    if (!codes.length) {
        return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
    }

    return NextResponse.json({ ok: codes.includes(code) });
}
