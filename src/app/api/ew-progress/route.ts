import { NextResponse } from 'next/server';
import { getEwLearnedUids, setEwLearned, removeEwLearned, setEwLearnedBulk } from '@/lib/d1';

// GET: Get all learned uids
export async function GET() {
    try {
        const uids = await getEwLearnedUids();
        return NextResponse.json({ uids, success: true });
    } catch (error) {
        console.error('Error fetching ew progress:', error);
        return NextResponse.json({ error: 'Failed to fetch progress', success: false }, { status: 500 });
    }
}

// POST: Toggle or bulk set learned state
// { uid: "ew_123", learned: true }  -- single toggle
// { uids: ["ew_1", "ew_2", ...] }  -- bulk mark as learned
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Bulk mode
        if (body.uids && Array.isArray(body.uids)) {
            await setEwLearnedBulk(body.uids);
            return NextResponse.json({ success: true });
        }

        // Single toggle
        const { uid, learned } = body;
        if (!uid) {
            return NextResponse.json({ error: 'Missing uid', success: false }, { status: 400 });
        }

        if (learned) {
            await setEwLearned(uid);
        } else {
            await removeEwLearned(uid);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating ew progress:', error);
        return NextResponse.json({ error: 'Failed to update progress', success: false }, { status: 500 });
    }
}
