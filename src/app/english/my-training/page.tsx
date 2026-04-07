'use client';

import { useState, useEffect } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';
import Link from 'next/link';
import { getSettings, setSetting } from '@/lib/settings';

const ONBOARDED_KEY = 'my-training-onboarded';
const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
const TEXT_FAINT = '#A8A29E';
const BORDER = '#E7E5E4';

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function MiniCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDow = new Date(year, month, 1).getDay();

    const [marks, setMarks] = useState<Record<number, { training: boolean; practice: boolean }>>({});
    useEffect(() => {
        const loadMarks = () => {
            const m: Record<number, { training: boolean; practice: boolean }> = {};
            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const td = localStorage.getItem(`training-done-${dateStr}`);
                const pd = localStorage.getItem(`practice-done-${dateStr}`);
                if (td || pd) {
                    m[d] = { training: !!td, practice: !!pd };
                }
            }
            setMarks(m);
        };
        loadMarks();
        const interval = setInterval(loadMarks, 3000);
        return () => clearInterval(interval);
    }, [year, month, daysInMonth]);

    // Streak calculation
    let currentStreak = 0;
    for (let d = today; d >= 1; d--) {
        const m = marks[d];
        if (m && (m.training || m.practice)) {
            currentStreak++;
        } else if (d < today) {
            break;
        }
    }

    // Count complete days (both training + practice)
    const completeDays = Object.values(marks).filter(m => m.training && m.practice).length;
    const trainingDays = Object.values(marks).filter(m => m.training).length;
    const practiceDays = Object.values(marks).filter(m => m.practice).length;

    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div style={{
            background: '#fff', border: `1px solid ${BORDER}`,
            borderRadius: 16, marginTop: 12, overflow: 'hidden',
        }}>
            <style>{`
                @keyframes cal-gold-shine {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes cal-pop {
                    0% { transform: scale(0.8); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                @keyframes cal-glow {
                    0%, 100% { box-shadow: 0 0 4px rgba(212,175,55,0.3); }
                    50% { box-shadow: 0 0 12px rgba(212,175,55,0.6); }
                }
            `}</style>

            {/* Header with stats */}
            <div style={{
                background: 'linear-gradient(135deg, #FFFBEB, #ECFDF5)',
                padding: '14px 16px',
                borderBottom: `1px solid ${BORDER}`,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 10,
                }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#1C1917' }}>
                        {month + 1}月の記録
                    </div>
                    {currentStreak > 0 && (
                        <div style={{
                            padding: '3px 10px', borderRadius: 20,
                            background: currentStreak >= 7 ? `linear-gradient(135deg, ${GOLD}, #F59E0B)` :
                                        currentStreak >= 3 ? '#FEF3C7' : '#F5F5F4',
                            border: currentStreak >= 3 ? `1px solid ${GOLD}50` : `1px solid ${BORDER}`,
                            fontSize: 11, fontWeight: 800,
                            color: currentStreak >= 7 ? '#fff' : currentStreak >= 3 ? GOLD : '#78716C',
                            animation: currentStreak >= 7 ? 'cal-glow 2s ease-in-out infinite' : 'none',
                        }}>
                            {currentStreak}日連続
                        </div>
                    )}
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{
                        flex: 1, textAlign: 'center', padding: '8px 4px',
                        background: completeDays > 0 ? 'linear-gradient(135deg, #FEF9E7, #FFFBEB)' : '#fff',
                        borderRadius: 10,
                        border: completeDays > 0 ? `1.5px solid ${GOLD}40` : `1px solid ${BORDER}`,
                    }}>
                        <div style={{
                            fontSize: 22, fontWeight: 900,
                            color: completeDays > 0 ? GOLD : '#D6D3D1',
                            animation: completeDays > 0 ? 'cal-pop 0.3s ease-out' : 'none',
                        }}>
                            {completeDays}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: completeDays > 0 ? GOLD : TEXT_FAINT }}>
                            COMPLETE
                        </div>
                    </div>
                    <div style={{
                        flex: 1, textAlign: 'center', padding: '8px 4px',
                        background: '#fff', borderRadius: 10, border: `1px solid ${BORDER}`,
                    }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: trainingDays > 0 ? GREEN : '#D6D3D1' }}>
                            {trainingDays}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: trainingDays > 0 ? GREEN : TEXT_FAINT }}>
                            Training
                        </div>
                    </div>
                    <div style={{
                        flex: 1, textAlign: 'center', padding: '8px 4px',
                        background: '#fff', borderRadius: 10, border: `1px solid ${BORDER}`,
                    }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: practiceDays > 0 ? BLUE : '#D6D3D1' }}>
                            {practiceDays}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: practiceDays > 0 ? BLUE : TEXT_FAINT }}>
                            Practice
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar grid */}
            <div style={{ padding: '12px 14px' }}>
                {/* Legend */}
                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 16,
                    marginBottom: 8, fontSize: 9, color: TEXT_FAINT,
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{
                            width: 10, height: 10, borderRadius: 3, display: 'inline-block',
                            background: GREEN,
                        }} />
                        トレーニング
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{
                            width: 10, height: 10, borderRadius: 3, display: 'inline-block',
                            background: BLUE,
                        }} />
                        実習
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{
                            width: 10, height: 10, borderRadius: 3, display: 'inline-block',
                            background: `linear-gradient(135deg, ${GOLD}, #F59E0B)`,
                            border: `1px solid ${GOLD}`,
                        }} />
                        両方達成
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, textAlign: 'center' }}>
                    {dayNames.map((dn, di) => (
                        <div key={dn} style={{
                            fontSize: 10, fontWeight: 700,
                            color: di === 0 ? '#EF4444' : di === 6 ? BLUE : '#78716C',
                            padding: '2px 0',
                        }}>{dn}</div>
                    ))}
                    {cells.map((d, i) => {
                        if (d === null) return <div key={`e${i}`} />;
                        const mark = marks[d];
                        const isToday = d === today;
                        const isFuture = d > today;
                        const both = mark?.training && mark?.practice;
                        const onlyTraining = mark?.training && !mark?.practice;
                        const onlyPractice = !mark?.training && mark?.practice;

                        let cellBg = 'transparent';
                        let cellBorder = '1.5px solid transparent';
                        let numColor = isFuture ? '#D6D3D1' : '#78716C';
                        let cellShadow = 'none';
                        let cellAnimation = '';

                        if (both) {
                            cellBg = `linear-gradient(135deg, #FEF3C7, #ECFDF5)`;
                            cellBorder = `2px solid ${GOLD}`;
                            numColor = GOLD;
                            cellShadow = `0 0 6px ${GOLD}30`;
                            if (isToday) cellAnimation = 'cal-glow 2s ease-in-out infinite';
                        } else if (onlyTraining) {
                            cellBg = '#ECFDF5';
                            cellBorder = `1.5px solid ${GREEN}50`;
                            numColor = GREEN;
                        } else if (onlyPractice) {
                            cellBg = '#EFF6FF';
                            cellBorder = `1.5px solid ${BLUE}50`;
                            numColor = BLUE;
                        } else if (isToday) {
                            cellBorder = `2px solid #1C1917`;
                            numColor = '#1C1917';
                        }

                        return (
                            <div key={d} style={{
                                padding: '4px 0 3px',
                                borderRadius: 8,
                                background: cellBg,
                                border: cellBorder,
                                boxShadow: cellShadow,
                                animation: cellAnimation,
                                position: 'relative',
                                minHeight: 36,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <div style={{
                                    fontSize: 12, fontWeight: (isToday || both) ? 900 : 500,
                                    color: numColor,
                                    lineHeight: 1,
                                }}>
                                    {d}
                                </div>
                                {/* Status indicators */}
                                <div style={{
                                    display: 'flex', gap: 2, marginTop: 2,
                                    height: 6, alignItems: 'center',
                                }}>
                                    {both ? (
                                        <span style={{
                                            fontSize: 8, lineHeight: 1,
                                            color: GOLD, fontWeight: 900,
                                        }}>
                                            {'\u2605'}
                                        </span>
                                    ) : (
                                        <>
                                            {mark?.training && (
                                                <span style={{
                                                    width: 6, height: 6, borderRadius: 2,
                                                    background: GREEN, display: 'inline-block',
                                                }} />
                                            )}
                                            {mark?.practice && (
                                                <span style={{
                                                    width: 6, height: 6, borderRadius: 2,
                                                    background: BLUE, display: 'inline-block',
                                                }} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);
    const [slotOn, setSlotOn] = useState(true);
    const [feverOn, setFeverOn] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [panelOpen, setPanelOpen] = useState(false);
    const [phraseCount, setPhraseCount] = useState(0);
    const [trainingDone, setTrainingDone] = useState(false);
    const [practiceDone, setPracticeDone] = useState(false);

    useEffect(() => {
        const s = getSettings();
        setSlotOn(s.slotEnabled);
        setFeverOn(s.feverEnabled);
        if (!localStorage.getItem(ONBOARDED_KEY)) {
            setShowOnboarding(true);
        }
        // Check today's status
        try {
            const raw = localStorage.getItem('my-training-phrases');
            const arr = raw ? JSON.parse(raw) : [];
            setPhraseCount(arr.length);
        } catch { /* */ }
        // Check today's completion status + poll for changes (training happens on same page)
        const today = getTodayStr();
        const checkStatus = () => {
            try {
                if (localStorage.getItem(`training-done-${today}`)) setTrainingDone(true);
            } catch { /* */ }
            try {
                if (localStorage.getItem(`practice-done-${today}`)) setPracticeDone(true);
            } catch { /* */ }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 2000);
        return () => clearInterval(interval);
    }, []);

    const dismissOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem(ONBOARDED_KEY, '1');
    };

    const steps = [
        { num: 1, label: '仕込み', sub: 'フレーズ登録', done: phraseCount > 0, href: '/english/izakaya-toeic/kaiwa', color: GOLD },
        { num: 2, label: 'トレーニング', sub: 'カード復習', done: trainingDone, href: null, color: GREEN },
        { num: 3, label: '実習', sub: '4択ドリル', done: practiceDone, href: '/english/my-training/practice', color: BLUE },
    ];

    return (
        <>
            {/* 3-Step Flow Bar */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 16px 0' }}>
                <div style={{
                    background: '#fff', border: `1px solid ${BORDER}`,
                    borderRadius: 14, padding: '14px 16px',
                    marginBottom: 12,
                }}>
                    <div style={{
                        fontSize: 10, fontWeight: 800, color: TEXT_FAINT,
                        letterSpacing: '0.2em', marginBottom: 10,
                    }}>
                        今日のながれ
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        {steps.map((step, i) => {
                            const isLink = step.href && !step.done;
                            const Inner = (
                                <div key={step.num} style={{
                                    flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '8px 10px', borderRadius: 10,
                                    background: step.done ? `${step.color}10` : 'transparent',
                                    border: step.done ? `1px solid ${step.color}30` : '1px solid transparent',
                                    cursor: isLink ? 'pointer' : 'default',
                                    transition: 'all 0.15s',
                                }}>
                                    <div style={{
                                        width: 26, height: 26, borderRadius: '50%',
                                        background: step.done ? step.color : '#F5F5F4',
                                        color: step.done ? '#fff' : '#A8A29E',
                                        fontSize: 12, fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        {step.done ? '\u2713' : step.num}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: 12, fontWeight: 700,
                                            color: step.done ? step.color : '#44403C',
                                        }}>
                                            {step.label}
                                        </div>
                                        <div style={{ fontSize: 9, color: '#A8A29E' }}>
                                            {step.sub}
                                        </div>
                                    </div>
                                </div>
                            );
                            return (
                                <div key={step.num} style={{ display: 'contents' }}>
                                    {isLink ? (
                                        <Link href={step.href!} style={{ flex: 1, textDecoration: 'none' }}>
                                            {Inner}
                                        </Link>
                                    ) : (
                                        <div style={{ flex: 1 }}>{Inner}</div>
                                    )}
                                    {i < steps.length - 1 && (
                                        <div style={{
                                            width: 16, textAlign: 'center',
                                            fontSize: 10, color: '#D6D3D1', fontWeight: 600,
                                            flexShrink: 0,
                                        }}>
                                            {'\u203A'}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* Practice CTA when training is done but practice isn't */}
                    {trainingDone && !practiceDone && phraseCount > 0 && (
                        <Link href="/english/my-training/practice" style={{
                            display: 'block', textAlign: 'center',
                            marginTop: 10, padding: '10px',
                            background: `linear-gradient(135deg, ${GOLD}, ${GREEN})`,
                            color: '#fff', borderRadius: 10,
                            fontSize: 13, fontWeight: 800, textDecoration: 'none',
                            letterSpacing: '0.05em',
                        }}>
                            実習ドリルへ
                        </Link>
                    )}
                    {/* Show practice link even if training not done, when phrases exist */}
                    {!trainingDone && phraseCount > 0 && (
                        <div style={{
                            display: 'flex', gap: 8, marginTop: 10,
                        }}>
                            <div style={{
                                flex: 1, textAlign: 'center', padding: '8px',
                                background: '#F5F5F4', borderRadius: 8,
                                fontSize: 11, color: '#78716C',
                            }}>
                                {phraseCount} フレーズ登録済み
                            </div>
                            <Link href="/english/my-training/practice" style={{
                                flex: 1, textAlign: 'center', padding: '8px',
                                background: BLUE, borderRadius: 8,
                                fontSize: 11, fontWeight: 700, color: '#fff',
                                textDecoration: 'none',
                            }}>
                                実習する
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mini calendar - this month */}
                <MiniCalendar />
            </div>

            {/* Collapsible settings toggle */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
                <button
                    onClick={() => setPanelOpen(!panelOpen)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        width: '100%',
                        padding: '8px 16px',
                        background: '#fff',
                        border: '1px solid #E7E5E4',
                        borderRadius: panelOpen ? '12px 12px 0 0' : 12,
                        cursor: 'pointer',
                        fontSize: 11, fontWeight: 600, color: '#78716C',
                        transition: 'border-radius 0.15s',
                    }}
                >
                    <span style={{
                        fontSize: 10, transition: 'transform 0.2s',
                        transform: panelOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                    }}>&#9654;</span>
                    演出設定
                    <span style={{ fontSize: 10, color: '#A8A29E', marginLeft: 4 }}>
                        スロット{slotOn ? 'あり' : 'なし'} / 確変{feverOn ? 'あり' : 'なし'}
                    </span>
                    <div style={{ flex: 1 }} />
                    <Link href="/english/settings" style={{
                        fontSize: 10, color: '#A8A29E', textDecoration: 'none', fontWeight: 600,
                    }} onClick={e => e.stopPropagation()}>
                        設定
                    </Link>
                </button>

                {panelOpen && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px',
                        background: '#FAFAF9',
                        border: '1px solid #E7E5E4',
                        borderTop: 'none',
                        borderRadius: '0 0 12px 12px',
                        marginBottom: 0,
                    }}>
                        <button
                            onClick={() => {
                                const next = !slotOn;
                                setSlotOn(next);
                                setSetting('slotEnabled', next);
                            }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '5px 12px', borderRadius: 8,
                                border: slotOn ? '1.5px solid #D4AF37' : '1.5px solid #E7E5E4',
                                background: slotOn ? '#FEF9E7' : '#fff',
                                cursor: 'pointer', transition: 'all 0.15s',
                                fontSize: 12, fontWeight: 700,
                                color: slotOn ? '#D4AF37' : '#A8A29E',
                            }}
                        >
                            <span style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: slotOn ? '#D4AF37' : '#D6D3D1',
                                transition: 'all 0.15s',
                            }} />
                            スロット演出 {slotOn ? 'あり' : 'なし'}
                        </button>

                        <button
                            onClick={() => {
                                const next = !feverOn;
                                setFeverOn(next);
                                setSetting('feverEnabled', next);
                            }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '5px 12px', borderRadius: 8,
                                border: feverOn ? '1.5px solid #EF4444' : '1.5px solid #E7E5E4',
                                background: feverOn ? '#FEF2F2' : '#fff',
                                cursor: 'pointer', transition: 'all 0.15s',
                                fontSize: 12, fontWeight: 700,
                                color: feverOn ? '#EF4444' : '#A8A29E',
                            }}
                        >
                            <span style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: feverOn ? '#EF4444' : '#D6D3D1',
                                transition: 'all 0.15s',
                            }} />
                            確変モード {feverOn ? 'あり' : 'なし'}
                        </button>
                    </div>
                )}
                <div style={{ height: 12 }} />
            </div>

            {/* First-visit onboarding popup */}
            {showOnboarding && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(28,25,23,0.6)',
                    backdropFilter: 'blur(4px)',
                }} onClick={dismissOnboarding}>
                    <div style={{
                        background: '#fff', borderRadius: 20,
                        padding: '28px 24px 20px', maxWidth: 360, width: '90%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{
                            fontSize: 14, fontWeight: 800, color: '#1C1917',
                            marginBottom: 16, textAlign: 'center',
                        }}>
                            デイリートレーニングへようこそ
                        </div>

                        <div style={{ fontSize: 13, color: '#44403C', lineHeight: 1.8, marginBottom: 20 }}>
                            <div style={{ marginBottom: 12 }}>
                                <span style={{ fontWeight: 700, color: '#D4AF37' }}>スロット演出</span>
                                <br />
                                カードをめくるときにスロットが回る演出です。
                                集中したいときはオフにできます。
                            </div>
                            <div>
                                <span style={{ fontWeight: 700, color: '#EF4444' }}>確変モード</span>
                                <br />
                                連続正解でボーナスが発動する演出です。
                                シンプルに使いたいときはオフにできます。
                            </div>
                        </div>

                        <div style={{
                            fontSize: 11, color: '#A8A29E', textAlign: 'center', marginBottom: 16,
                        }}>
                            設定は画面上部の「演出設定」からいつでも変更できます
                        </div>

                        <button
                            onClick={dismissOnboarding}
                            style={{
                                width: '100%', padding: '12px',
                                background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
                                border: 'none', borderRadius: 12,
                                fontSize: 14, fontWeight: 700, color: '#fff',
                                cursor: 'pointer',
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} skipDefaultData />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
