'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { HealthJournalStorage } from '@/lib/health-journal-storage';
import { HealthJournalEntry } from '@/types/health-journal';

export default function HealthJournalPage() {
    const [entries, setEntries] = useState<HealthJournalEntry[]>([]);

    useEffect(() => {
        const loadEntries = async () => {
            const data = await HealthJournalStorage.getAll();
            setEntries(data);
        };
        loadEntries();

        const interval = setInterval(loadEntries, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedEntries = useMemo(() => {
        return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [entries]);

    const getCategoryBadges = (entry: HealthJournalEntry) => {
        const badges: { label: string; color: string; bg: string }[] = [];
        if (entry.food) badges.push({ label: 'FOOD', color: '#92400e', bg: '#fef3c7' });
        if (entry.exercise) badges.push({ label: 'GYM', color: '#1e40af', bg: '#dbeafe' });
        if (entry.body) badges.push({ label: 'BODY', color: '#5b21b6', bg: '#ede9fe' });
        if (entry.sleep) badges.push({ label: 'SLEEP', color: '#0f766e', bg: '#ccfbf1' });
        return badges;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                        Health Journal
                    </h1>
                    <span style={{
                        fontSize: '12px',
                        backgroundColor: '#10B981',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontWeight: '600'
                    }}>
                        {entries.length} entries
                    </span>
                </div>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Trainer Reports + English Practice
                </p>
            </div>

            {/* How to Use */}
            <div style={{ padding: '16px' }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #e5e5e5'
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        How to Use
                    </div>
                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                        Tell Claude your health report in chat:
                    </div>
                    <div style={{
                        backgroundColor: '#f0fdf4',
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '10px',
                        fontSize: '12px',
                        color: '#166534',
                        lineHeight: '1.5',
                        fontFamily: 'monospace'
                    }}>
                        "今日の報告：朝プロテイン、昼サラダチキン、ジムでベンチ60kg、体重72.5kg"
                    </div>
                </div>
            </div>

            {/* Entry List */}
            <div style={{ padding: '0 16px 24px' }}>
                {sortedEntries.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #e5e5e5'
                    }}>
                        <h2 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                            No reports yet
                        </h2>
                        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                            Tell Claude about your food, exercise,<br />or how you're feeling today.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {sortedEntries.map(entry => {
                            const dateObj = new Date(entry.date);
                            const badges = getCategoryBadges(entry);
                            const hasEnglish = !!entry.englishTranslation?.conversation?.length;
                            const hasTips = !!entry.healthInsights?.tips?.length;

                            return (
                                <Link
                                    key={entry.id}
                                    href={`/health-journal/${entry.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid #e5e5e5',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '14px',
                                        transition: 'box-shadow 0.15s ease',
                                    }}>
                                        {/* Date Badge */}
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', fontWeight: '600' }}>
                                                {dateObj.getMonth() + 1}月
                                            </div>
                                            <div style={{ fontSize: '20px', color: '#fff', fontWeight: '800', lineHeight: 1 }}>
                                                {dateObj.getDate()}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: '#1a1a1a',
                                                marginBottom: '8px',
                                                lineHeight: '1.3'
                                            }}>
                                                {entry.title}
                                            </div>
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                                {badges.map(badge => (
                                                    <span
                                                        key={badge.label}
                                                        style={{
                                                            fontSize: '9px',
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            backgroundColor: badge.bg,
                                                            color: badge.color,
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        {badge.label}
                                                    </span>
                                                ))}
                                                {hasEnglish && (
                                                    <span style={{
                                                        fontSize: '9px',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        backgroundColor: '#dcfce7',
                                                        color: '#166534',
                                                        fontWeight: '700'
                                                    }}>
                                                        EN
                                                    </span>
                                                )}
                                                {hasTips && (
                                                    <span style={{
                                                        fontSize: '9px',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        backgroundColor: '#fef3c7',
                                                        color: '#92400e',
                                                        fontWeight: '700'
                                                    }}>
                                                        TIPS
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div style={{ color: '#d1d5db', fontSize: '18px', alignSelf: 'center' }}>
                                            {'>'}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
