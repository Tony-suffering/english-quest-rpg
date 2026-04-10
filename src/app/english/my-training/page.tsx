'use client';

import { useState, useEffect } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';
import Link from 'next/link';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
const TEXT_FAINT = '#A8A29E';
const BORDER = '#E7E5E4';

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}


export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);
    const [phraseCount, setPhraseCount] = useState(0);
    const [trainingDone, setTrainingDone] = useState(false);
    const [practiceDone, setPracticeDone] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('my-training-phrases');
            const arr = raw ? JSON.parse(raw) : [];
            setPhraseCount(arr.length);
        } catch { /* */ }
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

    const steps = [
        { num: 1, label: '登録', sub: 'フレーズ追加', done: phraseCount > 0, href: '/english/izakaya-toeic/kaiwa', color: GOLD },
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
            </div>

            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} skipDefaultData />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
