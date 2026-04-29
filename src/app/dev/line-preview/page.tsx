'use client';

import { useMemo, useState } from 'react';
import { buildDailyMessage, todayJstString } from '@/lib/line-message';

const KAIWA_URL_FALLBACK = 'https://toniolab.com/english/izakaya-toeic/kaiwa';

function addDays(dateStr: string, delta: number): string {
    const d = new Date(`${dateStr}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + delta);
    return d.toISOString().slice(0, 10);
}

export default function LinePreviewPage() {
    const [date, setDate] = useState(todayJstString());
    const text = useMemo(() => buildDailyMessage(date, KAIWA_URL_FALLBACK), [date]);

    return (
        <div className="min-h-screen bg-stone-50 px-4 py-8">
            <div className="max-w-xl mx-auto">
                <h1 className="text-xl font-medium text-stone-800 mb-1 tracking-wider">LINE 配信プレビュー</h1>
                <p className="text-xs text-stone-500 mb-6">毎朝 7:00 JST に broadcast される本文</p>

                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setDate(addDays(date, -1))}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white border border-stone-200 hover:bg-stone-100"
                    >
                        前日
                    </button>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white border border-stone-200"
                    />
                    <button
                        onClick={() => setDate(addDays(date, 1))}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white border border-stone-200 hover:bg-stone-100"
                    >
                        翌日
                    </button>
                    <button
                        onClick={() => setDate(todayJstString())}
                        className="ml-auto px-3 py-1.5 text-sm rounded-lg bg-stone-800 text-white hover:bg-stone-700"
                    >
                        今日
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-5">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-100">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-800">居</div>
                        <div className="text-sm font-medium text-stone-800">居酒屋TOEIC</div>
                        <div className="ml-auto text-xs text-stone-400">{date} 07:00</div>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 leading-relaxed">{text}</pre>
                </div>

                <div className="mt-6 text-xs text-stone-500 space-y-1">
                    <p>送信先: 全友だち (broadcast)</p>
                    <p>API: POST /api/line-cron (cron)</p>
                    <p>テスト送信: <code className="bg-stone-100 px-1.5 py-0.5 rounded">/api/line-cron?dry=1</code> で本文確認、本送信は cron 経由のみ</p>
                </div>
            </div>
        </div>
    );
}
