'use client';

import { useState, useEffect } from 'react';
import PhrasesPage from '../training/TrainingClient';
import TrainingTutorial from '../training/TrainingTutorial';
import Link from 'next/link';
import { getSettings, setSetting } from '@/lib/settings';

const ONBOARDED_KEY = 'my-training-onboarded';

export default function MyTrainingPage() {
    const [showHelp, setShowHelp] = useState(false);
    const [slotOn, setSlotOn] = useState(true);
    const [feverOn, setFeverOn] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [panelOpen, setPanelOpen] = useState(false);

    useEffect(() => {
        const s = getSettings();
        setSlotOn(s.slotEnabled);
        setFeverOn(s.feverEnabled);
        // First visit: show onboarding popup
        if (!localStorage.getItem(ONBOARDED_KEY)) {
            setShowOnboarding(true);
        }
    }, []);

    const dismissOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem(ONBOARDED_KEY, '1');
    };

    return (
        <>
            {/* Collapsible settings toggle */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '12px 16px 0' }}>
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
