'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CookingJournalEntry } from '@/types/cooking-journal';

export default function CookingJournalPage() {
    const [entries, setEntries] = useState<CookingJournalEntry[]>([]);

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const response = await fetch('/api/cooking-journal');
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
                }
            } catch (error) {
                console.error('Failed to load entries:', error);
            }
        };
        loadEntries();

        const interval = setInterval(loadEntries, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedEntries = useMemo(() => {
        return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [entries]);

    // 星評価を表示
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < rating ? '#F59E0B' : '#E5E7EB', fontSize: '12px' }}>
                {i < rating ? '\u2605' : '\u2606'}
            </span>
        ));
    };

    // 難易度バッジの色
    const getDifficultyColor = (rating: number) => {
        if (rating <= 2) return { bg: '#dcfce7', color: '#166534' };
        if (rating <= 3) return { bg: '#fef3c7', color: '#92400e' };
        return { bg: '#fee2e2', color: '#991b1b' };
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fefce8' }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '24px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                        Cooking Journal
                    </h1>
                    <span style={{
                        fontSize: '12px',
                        backgroundColor: '#F59E0B',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontWeight: '600'
                    }}>
                        {entries.length} recipes
                    </span>
                </div>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    Chef Mentor + Culinary English
                </p>
            </div>

            {/* How to Use */}
            <div style={{ padding: '16px' }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #fcd34d'
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        How to Use
                    </div>
                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                        Tell Claude what you cooked today:
                    </div>
                    <div style={{
                        backgroundColor: '#fffbeb',
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '10px',
                        fontSize: '12px',
                        color: '#92400e',
                        lineHeight: '1.5',
                        fontFamily: 'monospace'
                    }}>
                        "今日の料理：手作り餃子を作った。豚ひき肉、キャベツ、ニラ使用。包むの難しかったけど味は4点！"
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
                            No recipes yet
                        </h2>
                        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                            Tell Claude about what you cooked,<br />and learn culinary English with Chef Mentor!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {sortedEntries.map(entry => {
                            const dateObj = new Date(entry.date);
                            const hasEnglish = !!entry.englishTranslation?.conversation?.length;
                            const hasTips = !!entry.cookingInsights?.tips?.length;
                            const diffColor = getDifficultyColor(entry.difficultyRating);

                            return (
                                <Link
                                    key={entry.id}
                                    href={`/cooking-journal/${entry.id}`}
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
                                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
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
                                                marginBottom: '4px',
                                                lineHeight: '1.3'
                                            }}>
                                                {entry.dishName}
                                            </div>
                                            {entry.dishNameEn && (
                                                <div style={{
                                                    fontSize: '12px',
                                                    color: '#6b7280',
                                                    marginBottom: '8px'
                                                }}>
                                                    {entry.dishNameEn}
                                                </div>
                                            )}

                                            {/* Ratings */}
                                            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '10px', color: '#6b7280' }}>Taste:</span>
                                                    {renderStars(entry.tasteRating)}
                                                </div>
                                            </div>

                                            {/* Badges */}
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                                <span style={{
                                                    fontSize: '9px',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    backgroundColor: diffColor.bg,
                                                    color: diffColor.color,
                                                    fontWeight: '700',
                                                }}>
                                                    Lv.{entry.difficultyRating}
                                                </span>
                                                {hasEnglish && (
                                                    <span style={{
                                                        fontSize: '9px',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        backgroundColor: '#dbeafe',
                                                        color: '#1e40af',
                                                        fontWeight: '700'
                                                    }}>
                                                        CHEF
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
