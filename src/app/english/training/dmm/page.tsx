'use client';

// DMM会話をカレンダー形式で格納/閲覧するページ。
// goroku/nihongo と同じ「クライアントページ + API取得 + ReviewCalendar」の型に統一。
// (Server Component から client を包む形だと当ページ環境で hydrate しなかったため)
// 一覧は日付カレンダーに集約(毎日やる前提)。個別編集は /dmm/admin, /dmm/[id]。

import { useEffect, useState } from 'react';
import DmmCalendarClient, { type DmmConvLite } from './DmmCalendarClient';

interface RawTurn { role?: string; native?: string | null }
interface RawConv {
    id: string; date: string; title: string;
    teacher_name?: string | null; duration_minutes?: number | null;
    turns: RawTurn[];
}

export default function DmmTrainingListPage() {
    const [conversations, setConversations] = useState<DmmConvLite[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        fetch('/api/dmm-conversations', { cache: 'no-store' })
            .then((r) => r.json())
            .then((j) => {
                if (!alive) return;
                if (!j?.success) { setError(j?.error || 'load failed'); return; }
                const lite: DmmConvLite[] = (j.conversations as RawConv[] || [])
                    .map((c) => {
                        const students = c.turns.filter((t) => t.role === 'student').length;
                        const natives = c.turns.filter((t) => t.role === 'student' && t.native).length;
                        return {
                            id: c.id, date: c.date, title: c.title,
                            teacher_name: c.teacher_name ?? null,
                            duration_minutes: c.duration_minutes ?? null,
                            turns: c.turns.length, students, natives,
                        };
                    })
                    .sort((a, b) => b.date.localeCompare(a.date));
                setConversations(lite);
            })
            .catch((e) => { if (alive) setError(String(e)); });
        return () => { alive = false; };
    }, []);

    if (error) {
        return (
            <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#1c1917' }}>
                <div style={{ padding: 16, background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: 8, fontSize: 13 }}>
                    Error: {error}<br />
                    Table 未作成かも? <a href="/api/dmm-conversations?init=true" style={{ color: '#dc2626', textDecoration: 'underline' }}>/api/dmm-conversations?init=true</a> をブラウザで叩いて初期化してください。
                </div>
            </main>
        );
    }

    if (!conversations) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF9' }}>
                <span style={{ color: '#A8A29E', fontSize: 13, letterSpacing: 0.5 }}>Loading...</span>
            </div>
        );
    }

    return <DmmCalendarClient conversations={conversations} />;
}
