'use client';

import { useState, useEffect } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';
import Link from 'next/link';

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Daily mission definitions
const MISSIONS = [
    { id: 'review_5', label: '5フレーズ復習', target: 5, xp: 10 },
    { id: 'practice_3', label: '実習3問クリア', target: 3, xp: 15 },
    { id: 'streak_3', label: '実習3連続正解', target: 3, xp: 20 },
];

function DailyMissionPanel() {
    const [reviewCount, setReviewCount] = useState(0);
    const [practiceData, setPracticeData] = useState({ score: 0, bestStreak: 0, totalAttempts: 0 });
    const [phraseCount, setPhraseCount] = useState(0);

    useEffect(() => {
        // Count registered phrases
        try {
            const raw = localStorage.getItem('my-training-phrases');
            const phrases = raw ? JSON.parse(raw) : [];
            setPhraseCount(phrases.length);
        } catch { /* */ }

        // Load practice progress
        try {
            const raw = localStorage.getItem(`practice-progress-${getTodayStr()}`);
            if (raw) setPracticeData(JSON.parse(raw));
        } catch { /* */ }

        // Load review count (from training touches)
        try {
            const raw = localStorage.getItem(`rpg_date_touches`);
            if (raw) {
                const touches = JSON.parse(raw);
                setReviewCount(touches[getTodayStr()] || 0);
            }
        } catch { /* */ }

        // Listen for storage changes (cross-tab sync)
        const handler = () => {
            try {
                const raw = localStorage.getItem(`practice-progress-${getTodayStr()}`);
                if (raw) setPracticeData(JSON.parse(raw));
            } catch { /* */ }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    const missions = MISSIONS.map(m => {
        let current = 0;
        if (m.id === 'review_5') current = Math.min(reviewCount, m.target);
        if (m.id === 'practice_3') current = Math.min(practiceData.totalAttempts, m.target);
        if (m.id === 'streak_3') current = Math.min(practiceData.bestStreak, m.target);
        return { ...m, current, done: current >= m.target };
    });

    const completedCount = missions.filter(m => m.done).length;
    const totalXP = missions.filter(m => m.done).reduce((sum, m) => sum + m.xp, 0);

    return (
        <div style={{
            background: '#fff', borderRadius: 14,
            border: completedCount === missions.length ? '2px solid #D4AF37' : '1px solid #E7E5E4',
            padding: '16px 18px',
            marginBottom: 16,
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 12,
            }}>
                <div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#1C1917', letterSpacing: '0.1em' }}>
                        TODAY'S MISSION
                    </span>
                    {totalXP > 0 && (
                        <span style={{
                            marginLeft: 8, fontSize: 11, fontWeight: 700, color: '#D4AF37',
                        }}>
                            +{totalXP} XP
                        </span>
                    )}
                </div>
                <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: completedCount === missions.length ? '#D4AF37' : '#A8A29E',
                }}>
                    {completedCount}/{missions.length}
                </div>
            </div>

            {/* Mission list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {missions.map(m => (
                    <div key={m.id} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        <div style={{
                            width: 18, height: 18, borderRadius: '50%',
                            border: m.done ? '2px solid #10B981' : '2px solid #E7E5E4',
                            background: m.done ? '#10B981' : '#fff',
                            color: m.done ? '#fff' : 'transparent',
                            fontSize: 10, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            {m.done ? '\u2713' : ''}
                        </div>
                        <span style={{
                            flex: 1, fontSize: 12, fontWeight: 500,
                            color: m.done ? '#10B981' : '#44403C',
                            textDecoration: m.done ? 'line-through' : 'none',
                        }}>
                            {m.label}
                        </span>
                        {/* Progress */}
                        <span style={{
                            fontSize: 10, fontWeight: 600,
                            color: m.done ? '#10B981' : '#A8A29E',
                        }}>
                            {m.current}/{m.target}
                        </span>
                        <span style={{
                            fontSize: 9, fontWeight: 700,
                            color: m.done ? '#D4AF37' : '#D6D3D1',
                            width: 36, textAlign: 'right',
                        }}>
                            +{m.xp}XP
                        </span>
                    </div>
                ))}
            </div>

            {/* Practice CTA */}
            <Link href="/english/my-training/practice" style={{
                display: 'block', marginTop: 14,
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #10B98115, #D4AF3710)',
                border: '1.5px solid #10B98140',
                borderRadius: 10,
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.2s',
            }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981' }}>
                    実習する
                </span>
                <span style={{ fontSize: 11, color: '#78716C', marginLeft: 8 }}>
                    {phraseCount}フレーズで会話練習
                </span>
            </Link>
        </div>
    );
}

// Production training: starts from zero, only user-registered phrases
export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 16px 0' }}>
                <DailyMissionPanel />
            </div>
            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} skipDefaultData />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
