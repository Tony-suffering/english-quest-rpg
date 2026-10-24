'use client';

import { useMemo } from 'react';
import { noteArticles, type NoteArticle } from '@/data/english/note-articles';

function getCharCount(content: string): number {
    return content.replace(/\s/g, '').replace(/[#\-*>`]/g, '').length;
}

function getReadTime(content: string): number {
    return Math.max(1, Math.ceil(getCharCount(content) / 500));
}

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')} ${weekdays[date.getDay()]}`;
}

function calcStats(articles: NoteArticle[]) {
    if (articles.length === 0) return { total: 0, days: 0, streak: 0 };

    const sorted = [...articles].sort((a, b) => a.date.localeCompare(b.date));
    const firstDate = new Date(sorted[0].date + 'T00:00:00');
    const lastDate = new Date(sorted[sorted.length - 1].date + 'T00:00:00');
    const days = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate streak from most recent going backwards
    const dateSet = new Set(articles.map(a => a.date));
    const sortedDates = [...dateSet].sort((a, b) => b.localeCompare(a));
    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
        const expected = new Date(sortedDates[0] + 'T00:00:00');
        expected.setDate(expected.getDate() - i);
        const expectedStr = expected.toISOString().split('T')[0];
        if (dateSet.has(expectedStr)) {
            streak++;
        } else {
            break;
        }
    }

    return { total: articles.length, days, streak };
}

export default function NotePage() {
    const published = useMemo(
        () => noteArticles
            .filter(a => a.published)
            .sort((a, b) => b.date.localeCompare(a.date)),
        []
    );

    const stats = useMemo(() => calcStats(published), [published]);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#FAFAF9',
        }}>
            {/* Sticky header */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(250, 250, 249, 0.95)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #e7e5e4',
            }}>
                <div style={{
                    maxWidth: '640px',
                    margin: '0 auto',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <a
                        href="/english"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #d6d3d1',
                            background: 'white',
                            color: '#57534e',
                            textDecoration: 'none',
                            fontSize: '14px',
                            flexShrink: 0,
                        }}
                    >
                        ←
                    </a>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#44403c',
                        letterSpacing: '0.05em',
                    }}>
                        FROM THE CREATOR
                    </span>
                </div>
            </div>

            <div style={{
                maxWidth: '640px',
                margin: '0 auto',
                padding: '0 20px 80px',
            }}>
                {/* Hero section */}
                <div style={{
                    padding: '48px 0 32px',
                }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#1c1917',
                        margin: 0,
                        lineHeight: 1.3,
                    }}>
                        作ってる人の話
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        color: '#D4AF37',
                        fontWeight: 600,
                        margin: '8px 0 0',
                        letterSpacing: '0.02em',
                    }}>
                        TOEIC 900、喋れない、毎日更新中
                    </p>
                    <p style={{
                        fontSize: '15px',
                        color: '#78716c',
                        margin: '20px 0 0',
                        lineHeight: 1.7,
                    }}>
                        ネイティブの英語を分解して、なぜ聞き取れないか調べて、そこから英語学習アプリを1人で作ってる。
                        その過程を毎日note.comに書いてる記録。
                    </p>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    gap: '1px',
                    background: '#e7e5e4',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                }}>
                    {[
                        { label: '記事数', value: String(stats.total) },
                        { label: '日数', value: String(stats.days) },
                        { label: '連続更新', value: `${stats.streak}日` },
                    ].map((stat) => (
                        <div key={stat.label} style={{
                            flex: 1,
                            background: 'white',
                            padding: '16px 12px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                fontSize: '22px',
                                fontWeight: 700,
                                color: '#1c1917',
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: '#a8a29e',
                                fontWeight: 500,
                                marginTop: '4px',
                                letterSpacing: '0.05em',
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Articles feed */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}>
                    {published.map((article) => (
                        <a
                            key={article.id}
                            href={article.noteUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid #e7e5e4',
                                padding: '20px',
                                textDecoration: 'none',
                                transition: 'border-color 0.15s, box-shadow 0.15s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#D4AF37';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(212, 175, 55, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e7e5e4';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Date and read time */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px',
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#a8a29e',
                                    fontWeight: 500,
                                    fontFamily: 'monospace',
                                }}>
                                    {formatDate(article.date)}
                                </span>
                                <span style={{
                                    fontSize: '11px',
                                    color: '#a8a29e',
                                }}>
                                    {getReadTime(article.content)}min read
                                </span>
                            </div>

                            {/* Title */}
                            <h2 style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#1c1917',
                                margin: 0,
                                lineHeight: 1.5,
                            }}>
                                #{article.id} {article.title}
                            </h2>

                            {/* Subtitle */}
                            {article.subtitle && (
                                <p style={{
                                    fontSize: '13px',
                                    color: '#78716c',
                                    margin: '6px 0 0',
                                    lineHeight: 1.5,
                                }}>
                                    {article.subtitle}
                                </p>
                            )}

                            {/* Tags */}
                            {article.tags.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '6px',
                                    marginTop: '12px',
                                }}>
                                    {article.tags.map((tag) => (
                                        <span key={tag} style={{
                                            fontSize: '11px',
                                            color: '#78716c',
                                            background: '#f5f5f4',
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 500,
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* External link indicator */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '12px',
                                fontSize: '11px',
                                color: '#D4AF37',
                                fontWeight: 500,
                            }}>
                                note.com で読む →
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    padding: '48px 0 0',
                    color: '#a8a29e',
                    fontSize: '12px',
                    lineHeight: 1.8,
                }}>
                    <div style={{ marginBottom: '4px' }}>
                        全記事 note.com/tonio_english にて公開中
                    </div>
                    <a
                        href="https://note.com/tonio_english"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#D4AF37',
                            textDecoration: 'none',
                            fontWeight: 500,
                        }}
                    >
                        note.com/tonio_english
                    </a>
                </div>
            </div>
        </div>
    );
}
