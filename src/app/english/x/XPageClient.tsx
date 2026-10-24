'use client';

import { useState } from 'react';
import type { XTweet } from '@/data/x-tweets';
import CalendarDashboard from './CalendarDashboard';
import XAdminClient from './XAdminClient';
import ReplyTargetsClient from './ReplyTargetsClient';
import KpiClient from './KpiClient';

type Tab = 'calendar' | 'stock' | 'targets' | 'kpi';

const TABS: { key: Tab; label: string; sub: string }[] = [
    { key: 'calendar', label: 'カレンダー', sub: '今日やること' },
    { key: 'stock', label: '投稿ストック', sub: 'ドラフト 56本' },
    { key: 'targets', label: 'リプ営業', sub: 'ターゲット 17 + 発掘' },
    { key: 'kpi', label: 'KPI 効果測定', sub: '週次目標 vs 実績' },
];

export default function XPageClient({ tweets }: { tweets: XTweet[] }) {
    const [tab, setTab] = useState<Tab>('calendar');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
            {/* タブバー */}
            <div
                style={{
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #e7e5e4',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    padding: '12px 24px 0',
                }}
            >
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            style={{
                                padding: '10px 20px 12px',
                                fontSize: 13,
                                fontWeight: tab === t.key ? 700 : 500,
                                border: 'none',
                                borderBottom: `3px solid ${tab === t.key ? '#1c1917' : 'transparent'}`,
                                backgroundColor: 'transparent',
                                color: tab === t.key ? '#1c1917' : '#888',
                                cursor: 'pointer',
                                marginBottom: -1,
                            }}
                        >
                            <div>{t.label}</div>
                            <div style={{ fontSize: 9, fontWeight: 500, color: '#a8a29e', marginTop: 2, letterSpacing: '0.05em' }}>
                                {t.sub}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {tab === 'calendar' && <CalendarDashboard tweets={tweets} />}
            {tab === 'stock' && <XAdminClient initialTweets={tweets} />}
            {tab === 'targets' && <ReplyTargetsClient />}
            {tab === 'kpi' && <KpiClient />}
        </div>
    );
}
