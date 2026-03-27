'use client';

import { useState, useEffect } from 'react';

const gold = '#D4AF37';
const green = '#10B981';
const ONBOARDING_KEY = '365-onboarding-complete';

export function isOnboardingComplete(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

export function markOnboardingComplete() {
    localStorage.setItem(ONBOARDING_KEY, 'true');
}

interface CheckinOnboardingProps {
    onComplete: () => void;
}

export default function CheckinOnboarding({ onComplete }: CheckinOnboardingProps) {
    const [step, setStep] = useState(0);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        setPhase(0);
        const t = setTimeout(() => setPhase(1), 100);
        return () => clearTimeout(t);
    }, [step]);

    const fadeIn = (delay = 0) => ({
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.6s ease-out ${delay}s`,
    });

    const handleFinish = () => {
        markOnboardingComplete();
        onComplete();
    };

    const totalSteps = 3;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: '24px 24px 100px',
        }}>
            <div style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>

                {/* Step 0: Concept */}
                {step === 0 && (
                    <>
                        <div style={{ ...fadeIn(0), fontSize: 10, letterSpacing: '0.3em', color: gold, fontWeight: 700, marginBottom: 16 }}>
                            ENGLISH MASTER 365
                        </div>
                        <div style={{ ...fadeIn(0.1), fontSize: 24, fontWeight: 300, color: '#fff', lineHeight: 1.6, marginBottom: 24 }}>
                            365日、<span style={{ fontWeight: 700 }}>毎日10表現</span>。
                        </div>
                        <div style={{ ...fadeIn(0.3), fontSize: 14, color: '#aaa', lineHeight: 2 }}>
                            ネイティブが実際に使う表現を、<br />
                            ストーリーの中で覚える。<br />
                            1年で<span style={{ color: '#fff', fontWeight: 600 }}>3,650表現</span>。
                        </div>
                        {/* Mock calendar visual */}
                        <div style={{ ...fadeIn(0.5), marginTop: 28, display: 'flex', justifyContent: 'center', gap: 4 }}>
                            {Array.from({ length: 7 }, (_, i) => (
                                <div key={i} style={{
                                    width: 32, height: 32, borderRadius: 6,
                                    backgroundColor: i < 5 ? `${gold}20` : '#222',
                                    border: i < 5 ? `1px solid ${gold}40` : '1px solid #333',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {i < 5 && (
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: gold }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Step 1: Pick & Save */}
                {step === 1 && (
                    <>
                        <div style={{ ...fadeIn(0), fontSize: 10, letterSpacing: '0.3em', color: green, fontWeight: 700, marginBottom: 16 }}>
                            HOW IT WORKS
                        </div>
                        <div style={{ ...fadeIn(0.1), fontSize: 24, fontWeight: 300, color: '#fff', lineHeight: 1.6, marginBottom: 28 }}>
                            選んで、保存して、<span style={{ fontWeight: 700 }}>育てる</span>。
                        </div>
                        {/* Flow diagram */}
                        <div style={{ ...fadeIn(0.3), display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                            {[
                                { label: '1', title: '3-Pick', desc: '毎日10表現から3つ選ぶ', color: gold },
                                { label: '2', title: '仕込み帳に保存', desc: '気に入った表現を保存する', color: green },
                                { label: '3', title: 'トレーニング', desc: '保存した表現をスロット+バトルで育てる', color: '#3B82F6' },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div style={{
                                        display: 'flex', gap: 12, alignItems: 'center',
                                        padding: '12px 16px', backgroundColor: '#111',
                                        borderRadius: 10, border: '1px solid #222',
                                        width: 280,
                                    }}>
                                        <div style={{
                                            width: 28, height: 28, borderRadius: '50%',
                                            backgroundColor: s.color, color: '#000',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 12, fontWeight: 800, flexShrink: 0,
                                        }}>
                                            {s.label}
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{s.title}</div>
                                            <div style={{ fontSize: 11, color: '#666' }}>{s.desc}</div>
                                        </div>
                                    </div>
                                    {i < 2 && (
                                        <div style={{ height: 12, display: 'flex', justifyContent: 'center' }}>
                                            <div style={{ width: 1, height: '100%', backgroundColor: '#333' }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Step 2: Habit */}
                {step === 2 && (
                    <>
                        <div style={{ ...fadeIn(0), fontSize: 10, letterSpacing: '0.3em', color: '#8B5CF6', fontWeight: 700, marginBottom: 16 }}>
                            YOUR DAILY ROUTINE
                        </div>
                        <div style={{ ...fadeIn(0.1), fontSize: 24, fontWeight: 300, color: '#fff', lineHeight: 1.6, marginBottom: 12 }}>
                            1日<span style={{ fontWeight: 700 }}>1分</span>。<br />
                            カレンダーを<span style={{ color: gold, fontWeight: 700 }}>金</span>で埋める。
                        </div>
                        <div style={{ ...fadeIn(0.3), fontSize: 13, color: '#888', lineHeight: 2, marginBottom: 28 }}>
                            毎日開いて、3つ選ぶだけ。<br />
                            それだけでストリークが伸びる。<br />
                            カレンダーが金色に染まっていく。<br />
                            その<span style={{ color: '#ccc' }}>1分が、1年後の自分を変える</span>。
                        </div>
                    </>
                )}
            </div>

            {/* Navigation */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
                padding: '16px 24px 32px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.95) 40%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            }}>
                {/* Progress dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div key={i} style={{
                            width: i === step ? 20 : 6, height: 6, borderRadius: 3,
                            backgroundColor: i === step ? gold : i < step ? green : '#333',
                            transition: 'all 0.3s ease',
                        }} />
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    {step > 0 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            style={{
                                padding: '10px 20px', borderRadius: 0,
                                backgroundColor: 'transparent', border: '1px solid #333',
                                color: '#666', fontSize: 13, cursor: 'pointer',
                            }}
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={step < totalSteps - 1 ? () => setStep(s => s + 1) : handleFinish}
                        style={{
                            padding: '12px 32px', borderRadius: 0,
                            backgroundColor: gold, border: 'none',
                            color: '#000', fontSize: 14, fontWeight: 700,
                            letterSpacing: '0.06em', cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                        }}
                    >
                        {step < totalSteps - 1 ? 'Next' : 'Day 1 Start'}
                    </button>
                </div>
            </div>
        </div>
    );
}
