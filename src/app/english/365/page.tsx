'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CORE_CHARACTERS, EPISODE_CONFIG } from '@/data/english/365/characters';
import { theJobEntries } from '@/data/english/365-the-job';

// ============================================================
// HELPERS
// ============================================================

function getDayIndex(): number {
    const start = new Date(EPISODE_CONFIG.startDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(diff, 364));
}

function getEpisodeForDay(dayIndex: number) {
    const ep = Math.floor(dayIndex / 7) + 1;
    const dayInEp = (dayIndex % 7) + 1;
    return { episode: ep, dayInEpisode: dayInEp };
}

// ============================================================
// COMPONENT
// ============================================================

export default function EnglishMaster365Page() {
    const [currentDay, setCurrentDay] = useState(0);
    const [completedMemoria, setCompletedMemoria] = useState<Set<number>>(new Set());
    const [completedRequiem, setCompletedRequiem] = useState<Set<number>>(new Set());

    useEffect(() => {
        setCurrentDay(getDayIndex());
        // Load progress from localStorage
        const memoriaSet = new Set<number>();
        const requiemSet = new Set<number>();
        for (let i = 0; i < 7; i++) {
            if (localStorage.getItem(`365_memoria_day${i + 1}_completed`) === 'true') {
                memoriaSet.add(i + 1);
            }
            if (localStorage.getItem(`365_requiem_day${i + 1}_completed`) === 'true') {
                requiemSet.add(i + 1);
            }
        }
        setCompletedMemoria(memoriaSet);
        setCompletedRequiem(requiemSet);
    }, []);

    const { episode, dayInEpisode } = getEpisodeForDay(currentDay);
    const todayEntry = theJobEntries[Math.min(currentDay, theJobEntries.length - 1)];
    const phase = EPISODE_CONFIG.phases.find(p => episode >= p.episodes[0] && episode <= p.episodes[1]);

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                padding: '48px 24px 40px',
                color: 'white',
            }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{
                            background: '#D4AF37',
                            color: '#1C1917',
                            padding: '2px 10px',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                        }}>365</span>
                        <span style={{ fontSize: 12, color: '#A8A29E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            English Master Course
                        </span>
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                        English Conversation Master
                    </h1>
                    <p style={{ fontSize: 14, color: '#A8A29E', margin: 0 }}>
                        TOEIC scores are not enough. Learn to actually speak.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

                {/* Today's Card */}
                <div style={{
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E7E5E4',
                    padding: 32,
                    marginBottom: 32,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{
                            background: '#D4AF37',
                            color: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 16,
                        }}>
                            {currentDay + 1}
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: '#78716C', fontWeight: 500 }}>
                                TODAY -- Day {currentDay + 1} / Episode {episode}
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#1C1917' }}>
                                {todayEntry?.title || 'The First Step'}
                            </div>
                        </div>
                        {phase && (
                            <span style={{
                                marginLeft: 'auto',
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '3px 10px',
                                borderRadius: 20,
                                background: '#F5F5F4',
                                color: '#78716C',
                                letterSpacing: '0.05em',
                            }}>
                                Phase {EPISODE_CONFIG.phases.indexOf(phase) + 1}: {phase.name}
                            </span>
                        )}
                    </div>

                    {todayEntry && (
                        <p style={{ fontSize: 14, color: '#57534E', lineHeight: 1.7, margin: '0 0 24px' }}>
                            {todayEntry.content}
                        </p>
                    )}

                    {/* Today's Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Link href={`/memoria/365-ep01-day${dayInEpisode}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
                                border: '1px solid #FDE68A',
                                borderRadius: 12,
                                padding: 20,
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#92400E', letterSpacing: '0.05em', marginBottom: 4 }}>
                                    MEMORIA
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 4 }}>
                                    Day {dayInEpisode} Conversation
                                </div>
                                <div style={{ fontSize: 13, color: '#78716C' }}>
                                    Listen and follow the dialogue
                                </div>
                                {completedMemoria.has(dayInEpisode) && (
                                    <div style={{ fontSize: 11, color: '#16A34A', fontWeight: 600, marginTop: 8 }}>
                                        COMPLETED
                                    </div>
                                )}
                            </div>
                        </Link>

                        <Link href={`/english/365/requiem/${dayInEpisode}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)',
                                border: '1px solid #DDD6FE',
                                borderRadius: 12,
                                padding: 20,
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#5B21B6', letterSpacing: '0.05em', marginBottom: 4 }}>
                                    REQUIEM
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 4 }}>
                                    Day {dayInEpisode} Word Review
                                </div>
                                <div style={{ fontSize: 13, color: '#78716C' }}>
                                    10 words + idioms to master
                                </div>
                                {completedRequiem.has(dayInEpisode) && (
                                    <div style={{ fontSize: 11, color: '#16A34A', fontWeight: 600, marginTop: 8 }}>
                                        COMPLETED
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Week Overview */}
                <div style={{
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E7E5E4',
                    padding: 32,
                    marginBottom: 32,
                }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', margin: '0 0 20px' }}>
                        Episode {episode}: {todayEntry?.seriesTitle?.replace(/^365 English Master - Ep\.\d+ /, '') || 'The First Step'}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                        {Array.from({ length: 7 }, (_, i) => {
                            const day = i + 1;
                            const entry = theJobEntries[i];
                            const isToday = day === dayInEpisode;
                            const isPast = day < dayInEpisode;
                            const memoriaOk = completedMemoria.has(day);
                            const requiemOk = completedRequiem.has(day);

                            return (
                                <div key={day} style={{
                                    border: isToday ? '2px solid #D4AF37' : '1px solid #E7E5E4',
                                    borderRadius: 12,
                                    padding: 12,
                                    textAlign: 'center',
                                    background: isToday ? '#FFFBEB' : isPast ? '#FAFAF9' : 'white',
                                    opacity: (!isPast && !isToday) ? 0.5 : 1,
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', marginBottom: 4 }}>
                                        Day {day}
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1917', marginBottom: 8, minHeight: 32 }}>
                                        {entry?.title || `Day ${day}`}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                                        <div style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: memoriaOk ? '#D4AF37' : '#D6D3D1',
                                        }} title="Memoria" />
                                        <div style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: requiemOk ? '#8B5CF6' : '#D6D3D1',
                                        }} title="Requiem" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#78716C' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4AF37' }} />
                            Memoria
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#78716C' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6' }} />
                            Requiem
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#78716C' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D6D3D1' }} />
                            Not done
                        </div>
                    </div>
                </div>

                {/* Cast */}
                <div style={{
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E7E5E4',
                    padding: 32,
                    marginBottom: 32,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', margin: 0 }}>
                            Cast
                        </h2>
                        <Link href="/english/365/characters" style={{
                            fontSize: 12, color: '#D4AF37', textDecoration: 'none', fontWeight: 600,
                        }}>
                            Relationship Map &rarr;
                        </Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {CORE_CHARACTERS.map(c => (
                            <div key={c.id} style={{
                                border: '1px solid #E7E5E4',
                                borderRadius: 12,
                                padding: 16,
                                borderLeft: `4px solid ${c.color}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: 8,
                                        background: c.color,
                                        color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 14,
                                    }}>
                                        {c.name[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                                            {c.nameJa}
                                        </div>
                                        <div style={{ fontSize: 11, color: '#78716C' }}>
                                            {c.name} ({c.age})
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: 11, fontWeight: 600, color: c.color,
                                    background: `${c.color}15`,
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    display: 'inline-block',
                                    marginBottom: 6,
                                }}>
                                    TOEIC {c.toeicScore}
                                </div>
                                <div style={{ fontSize: 12, color: '#57534E', lineHeight: 1.5 }}>
                                    {c.role.split('.')[0]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Links */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 16,
                    marginBottom: 32,
                }}>
                    <Link href="/english/365/episodes" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1px solid #E7E5E4',
                            padding: 24,
                            cursor: 'pointer',
                            transition: 'border-color 0.15s',
                        }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 4 }}>
                                EPISODES
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 4 }}>
                                52 Episodes Guide
                            </div>
                            <div style={{ fontSize: 13, color: '#78716C' }}>
                                Full story arc across 4 phases, 365 days
                            </div>
                        </div>
                    </Link>

                    <Link href="/english/365/characters" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: 16,
                            border: '1px solid #E7E5E4',
                            padding: 24,
                            cursor: 'pointer',
                            transition: 'border-color 0.15s',
                        }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#78716C', letterSpacing: '0.05em', marginBottom: 4 }}>
                                CHARACTERS
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 4 }}>
                                Character Map
                            </div>
                            <div style={{ fontSize: 13, color: '#78716C' }}>
                                6 characters, relationships, locations
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Progress Bar */}
                <div style={{
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #E7E5E4',
                    padding: 24,
                    marginBottom: 32,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', margin: 0 }}>
                            Overall Progress
                        </h2>
                        <span style={{ fontSize: 13, color: '#78716C' }}>
                            Day {currentDay + 1} / 365
                        </span>
                    </div>
                    <div style={{
                        height: 8,
                        background: '#F5F5F4',
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${((currentDay + 1) / 365) * 100}%`,
                            background: 'linear-gradient(90deg, #D4AF37, #10B981)',
                            borderRadius: 4,
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        fontSize: 11,
                        color: '#A8A29E',
                    }}>
                        {EPISODE_CONFIG.phases.map((p, i) => (
                            <span key={i} style={{
                                fontWeight: phase === p ? 700 : 400,
                                color: phase === p ? '#1C1917' : '#A8A29E',
                            }}>
                                {p.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16,
                    marginBottom: 32,
                }}>
                    {[
                        { label: 'Episode', value: `${episode} / 52`, sub: `Day ${dayInEpisode}` },
                        { label: 'Words Learned', value: `${Math.min((currentDay + 1) * 10, 3640)}`, sub: `of ${EPISODE_CONFIG.totalWords}` },
                        { label: 'Phase', value: phase?.name || 'SURVIVAL', sub: `Ep ${phase?.episodes[0]}-${phase?.episodes[1]}` },
                        { label: 'Characters', value: '6', sub: 'Izakaya TOEIC' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            background: 'white',
                            borderRadius: 12,
                            border: '1px solid #E7E5E4',
                            padding: 16,
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: 11, fontWeight: 500, color: '#78716C', marginBottom: 4 }}>
                                {s.label}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#1C1917' }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: 11, color: '#A8A29E' }}>
                                {s.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '16px 0', fontSize: 12, color: '#A8A29E' }}>
                    Built for learners who passed the test but cannot speak.
                </div>
            </div>
        </div>
    );
}
