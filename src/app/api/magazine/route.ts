import { NextResponse } from 'next/server';
import {
    initMagazineTable,
    getLatestMagazineIssue,
    getMagazineIssueByVol,
    getAllMagazineIssues,
    upsertMagazineIssue,
} from '@/lib/d1';
import { magazineIssues, type MagazineIssue } from '@/data/english/magazine';

// 月刊 TOLERANCY の内容をブラウザから編集/永続化するための API。
// 保存先は D1 の magazine_issues (vol をキーに issue まるごと JSON blob)。
// DB が空(初回)の場合は静的 seed (src/data/english/magazine.ts) を返す。

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/magazine              -- 最新号(無ければ seed の先頭)
// GET /api/magazine?vol=1        -- 指定号(無ければ seed から)
// GET /api/magazine?all=true     -- 全号
// GET /api/magazine?init=true    -- テーブル作成
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        if (url.searchParams.get('init') === 'true') {
            await initMagazineTable();
            return NextResponse.json({ success: true, message: 'Table ready' });
        }

        if (url.searchParams.get('all') === 'true') {
            const saved = await getAllMagazineIssues<MagazineIssue>();
            const issues = saved.length > 0 ? saved : magazineIssues;
            return NextResponse.json({ success: true, issues });
        }

        const volParam = url.searchParams.get('vol');
        if (volParam) {
            const vol = Number(volParam);
            const saved = await getMagazineIssueByVol<MagazineIssue>(vol);
            const issue = saved ?? magazineIssues.find((i) => i.vol === vol) ?? null;
            return NextResponse.json({ success: true, issue });
        }

        const saved = await getLatestMagazineIssue<MagazineIssue>();
        const issue = saved ?? magazineIssues[0];
        return NextResponse.json({ success: true, issue });
    } catch (err) {
        // D1 が使えない環境でも読み取りは seed で成立させる
        return NextResponse.json({ success: true, issue: magazineIssues[0], warning: String(err) });
    }
}

// POST /api/magazine
// body: { issue: MagazineIssue, pass? }
// MAGAZINE_ADMIN_PASS が設定されていれば一致必須。未設定なら素通し(既存 write API と同方針)。
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const issue = body?.issue as MagazineIssue | undefined;

        if (!issue || typeof issue.vol !== 'number') {
            return NextResponse.json(
                { success: false, error: 'issue with numeric vol is required' },
                { status: 400 }
            );
        }

        const expected = process.env.MAGAZINE_ADMIN_PASS;
        if (expected && body?.pass !== expected) {
            return NextResponse.json({ success: false, error: 'wrong password' }, { status: 401 });
        }

        await upsertMagazineIssue(issue.vol, issue);
        return NextResponse.json({ success: true, vol: issue.vol });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
