// /api/dmm365/export  -- 全データ JSON export (バックアップ用)
// /api/dmm365/export?format=csv  -- ammo を CSV で
import { NextResponse } from 'next/server';
import { listDmm365SessionsWithAmmo, getDmm365Stats } from '@/lib/d1';

export const runtime = 'nodejs';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const format = url.searchParams.get('format') ?? 'json';
        const sessions = await listDmm365SessionsWithAmmo();

        if (format === 'csv') {
            const headers = ['session_number', 'date', 'teacher', 'title', 'english', 'japanese', 'status', 'correction', 'reaction_note', 'source'];
            const rows = [headers.join(',')];
            for (const s of sessions) {
                for (const a of s.ammo) {
                    const row = [
                        s.session_number, s.date,
                        s.teacher ?? '', s.title ?? '',
                        a.english, a.japanese ?? '', a.status,
                        a.correction ?? '', a.reaction_note ?? '', a.source ?? '',
                    ].map(v => csvEscape(String(v)));
                    rows.push(row.join(','));
                }
            }
            return new NextResponse(rows.join('\n'), {
                status: 200,
                headers: {
                    'Content-Type': 'text/csv; charset=utf-8',
                    'Content-Disposition': `attachment; filename="dmm365-export-${new Date().toISOString().slice(0, 10)}.csv"`,
                },
            });
        }

        const stats = await getDmm365Stats();
        return NextResponse.json({
            exported_at: new Date().toISOString(),
            stats,
            sessions,
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

function csvEscape(s: string): string {
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
}
