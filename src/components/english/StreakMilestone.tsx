'use client';

import { useState, useEffect } from 'react';

const gold = '#D4AF37';

interface StreakMilestoneProps {
    milestone: { days: number; title: string; message: string };
    onDismiss: () => void;
}

export default function StreakMilestone({ milestone, onDismiss }: StreakMilestoneProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const handleDismiss = () => {
        setVisible(false);
        setTimeout(onDismiss, 300);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10001,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
        }}>
            <style>{`
                @keyframes milestoneScale {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes milestoneGlow {
                    0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.2); }
                    50% { box-shadow: 0 0 60px rgba(212,175,55,0.4); }
                }
            `}</style>
            <div style={{
                maxWidth: 360, width: '100%',
                background: `linear-gradient(135deg, ${gold} 0%, #F5D76E 50%, ${gold} 100%)`,
                padding: '40px 32px',
                textAlign: 'center',
                animation: 'milestoneScale 0.5s ease-out, milestoneGlow 2s ease-in-out infinite',
            }}>
                <div style={{
                    fontSize: 10, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.5)',
                    fontWeight: 700, marginBottom: 16,
                }}>
                    MILESTONE
                </div>
                <div style={{
                    fontSize: 28, fontWeight: 900, color: '#000',
                    marginBottom: 12, lineHeight: 1.3,
                }}>
                    {milestone.title}
                </div>
                <div style={{
                    fontSize: 14, color: 'rgba(0,0,0,0.6)', fontWeight: 300,
                    lineHeight: 1.7, marginBottom: 32,
                }}>
                    {milestone.message}
                </div>
                <button
                    onClick={handleDismiss}
                    style={{
                        padding: '12px 40px', borderRadius: 0,
                        backgroundColor: '#000', border: 'none',
                        color: '#fff', fontSize: 13, fontWeight: 700,
                        letterSpacing: '0.1em', cursor: 'pointer',
                    }}
                >
                    CONTINUE
                </button>
            </div>
        </div>
    );
}
