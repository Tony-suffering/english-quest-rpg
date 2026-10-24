// /api/dmm365/import  -- JSON dump を読み込んで sessions + ammo を bulk insert
// 同じ session_number があれば skip (or upsert option)
import { NextResponse } from 'next/server';
import {
    createDmm365Session,
    getDmm365SessionByNumber,
    createDmm365Ammo,
    type Dmm365Status,
} from '@/lib/d1';

export const runtime = 'nodejs';

function nano(len: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

const VALID_STATUSES: Dmm365Status[] = ['planned', 'used', 'landed', 'corrected', 'flat'];

interface ImportSession {
    session_number: number;
    date: string;
    teacher?: string;
    title?: string;
    notes?: string;
    ammo?: Array<{
        english: string;
        japanese?: string;
        source?: string;
        status?: string;
        correction?: string;
        reaction_note?: string;
    }>;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sessions: ImportSession[] = Array.isArray(body.sessions) ? body.sessions : [];
        const skipExisting: boolean = body.skip_existing !== false; // default true

        let createdSessions = 0, skippedSessions = 0, addedAmmo = 0;

        for (const s of sessions) {
            if (typeof s.session_number !== 'number' || !s.date) {
                continue;
            }
            const existing = await getDmm365SessionByNumber(s.session_number);
            if (existing && skipExisting) {
                skippedSessions += 1;
                continue;
            }
            const sessionId = existing?.id ?? nano(10);
            if (!existing) {
                await createDmm365Session({
                    id: sessionId,
                    session_number: s.session_number,
                    date: s.date,
                    teacher: s.teacher ?? null,
                    title: s.title ?? null,
                    notes: s.notes ?? null,
                });
                createdSessions += 1;
            }
            if (Array.isArray(s.ammo)) {
                let order = 0;
                for (const a of s.ammo) {
                    if (!a.english?.trim()) continue;
                    const status: Dmm365Status = VALID_STATUSES.includes(a.status as Dmm365Status)
                        ? (a.status as Dmm365Status) : 'planned';
                    await createDmm365Ammo({
                        id: nano(10),
                        session_id: sessionId,
                        sort_order: order++,
                        english: a.english,
                        japanese: a.japanese ?? null,
                        source: a.source ?? null,
                        status,
                        correction: a.correction ?? null,
                        reaction_note: a.reaction_note ?? null,
                    });
                    addedAmmo += 1;
                }
            }
        }

        return NextResponse.json({
            success: true,
            created_sessions: createdSessions,
            skipped_sessions: skippedSessions,
            added_ammo: addedAmmo,
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
