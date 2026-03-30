'use client';

import { useState, useEffect } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';
import Link from 'next/link';
import { getSettings, setSetting } from '@/lib/settings';

// Production training: starts from zero, only user-registered phrases
export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);
    const [slotOn, setSlotOn] = useState(true);
    const [feverOn, setFeverOn] = useState(true);

    useEffect(() => {
        const s = getSettings();
        setSlotOn(s.slotEnabled);
        setFeverOn(s.feverEnabled);
    }, []);

    return (
        <>
            {/* Effect toggle banner -- prominent OFF controls */}
            <div style={{
                maxWidth: 800, margin: '0 auto',
                padding: '12px 16px 0',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px',
                    background: '#fff',
                    border: '1px solid #E7E5E4',
                    borderRadius: 12,
                    marginBottom: 12,
                }}>
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: '#78716C',
                        flexShrink: 0,
                    }}>
                        演出:
                    </span>

                    {/* Slot toggle */}
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
                            background: slotOn ? '#FEF9E7' : '#FAFAF9',
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
                        SLOT {slotOn ? 'ON' : 'OFF'}
                    </button>

                    {/* Fever toggle */}
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
                            background: feverOn ? '#FEF2F2' : '#FAFAF9',
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
                        FEVER {feverOn ? 'ON' : 'OFF'}
                    </button>

                    <div style={{ flex: 1 }} />

                    {/* Settings link */}
                    <Link href="/english/settings" style={{
                        fontSize: 10, color: '#A8A29E', textDecoration: 'none',
                        fontWeight: 600,
                    }}>
                        設定
                    </Link>
                </div>
            </div>
            <PhrasesPage initialData={undefined} onHelpClick={() => setShowHelp(true)} skipDefaultData />
            <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
        </>
    );
}
