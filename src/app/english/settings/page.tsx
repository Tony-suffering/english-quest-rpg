'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSettings, setSetting, type AppSettings } from '@/lib/settings';

export default function SettingsPage() {
    const [settings, setLocalSettings] = useState<AppSettings | null>(null);
    const [testingSound, setTestingSound] = useState<string | null>(null);

    useEffect(() => {
        setLocalSettings(getSettings());
    }, []);

    if (!settings) return null;

    const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        setSetting(key, value);
        setLocalSettings({ ...settings, [key]: value });
    };

    const playTestSound = () => {
        if (testingSound) return;
        setTestingSound('se');
        try {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') ctx.resume();
            const now = ctx.currentTime;
            const vol = settings.volume / 100;
            const freqs = [523, 659, 784];
            freqs.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                const gv = 0.14 * vol;
                const t = now + i * 0.08;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(gv, t + 0.03);
                g.gain.setValueAtTime(gv, t + 0.15);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.connect(g); g.connect(ctx.destination);
                osc.start(t); osc.stop(t + 0.45);
            });
            setTimeout(() => setTestingSound(null), 500);
        } catch { setTestingSound(null); }
    };

    const playTestBGM = (type: 'fever' | 'main') => {
        if (testingSound) return;
        const key = type === 'fever' ? 'fever-bgm' : 'main-bgm';
        setTestingSound(key);
        try {
            const vol = type === 'fever'
                ? (settings.feverBgmVolume / 100) * (settings.volume / 100)
                : (settings.bgmVolume / 100) * (settings.volume / 100);
            const audio = new Audio(type === 'fever' ? '/audio/fever-bgm.mp3' : '/audio/bgm-main.mp3');
            audio.volume = vol;
            audio.play().catch(() => {});
            const duration = type === 'fever' ? 2000 : 3000;
            setTimeout(() => {
                let step = 0;
                const fade = setInterval(() => {
                    step++;
                    audio.volume = Math.max(0, vol * (1 - step / 8));
                    if (step >= 8) { clearInterval(fade); audio.pause(); setTestingSound(null); }
                }, 80);
            }, duration);
        } catch { setTestingSound(null); }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FAFAF9',
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #E7E5E4',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                <Link
                    href="/english/training"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '36px', height: '36px', borderRadius: '10px',
                        backgroundColor: '#F5F5F4', border: '1px solid #E7E5E4',
                        textDecoration: 'none', color: '#78716C',
                        transition: 'all 0.15s',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Link>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1917', margin: 0, letterSpacing: '-0.3px' }}>
                        Settings
                    </h1>
                    <p style={{ fontSize: '12px', color: '#A8A29E', margin: 0 }}>
                        Training configuration
                    </p>
                </div>
            </div>

            <div style={{
                maxWidth: '560px',
                margin: '0 auto',
                padding: '24px 16px 80px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>

                {/* Card Review Section */}
                <SettingsCard
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>}
                    title="Card Review"
                    description="Review mode behavior"
                >
                    <ToggleRow
                        label="Tap to Level Up"
                        description="Card body tap = level up + next. Skip without reading."
                        checked={settings.tapToLevel}
                        onChange={(v) => update('tapToLevel', v)}
                        accentColor="#D4AF37"
                    />
                    <Divider />
                    <ToggleRow
                        label="Typing Match (Phrases)"
                        description="Phrases mode: exact-match typing like Words mode. Words mode is always exact-match."
                        checked={settings.typingMatch}
                        onChange={(v) => update('typingMatch', v)}
                        accentColor="#3B82F6"
                    />
                </SettingsCard>

                {/* Sound Section */}
                <SettingsCard
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={settings.soundEnabled ? '#D4AF37' : '#A8A29E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>{settings.soundEnabled && <><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></>}</svg>}
                    title="Sound"
                    description={settings.soundEnabled ? `Master volume: ${settings.volume}%` : 'All sounds disabled'}
                >
                    <ToggleRow
                        label="Sound Effects"
                        description="All sound ON / OFF"
                        checked={settings.soundEnabled}
                        onChange={(v) => update('soundEnabled', v)}
                    />

                    {settings.soundEnabled && (
                        <>
                            <SliderRow
                                label="Master Volume"
                                value={settings.volume}
                                onChange={(v) => update('volume', v)}
                            />
                            <TestButton
                                label="SE Test"
                                onClick={playTestSound}
                                loading={testingSound === 'se'}
                            />

                            {settings.feverEnabled && (
                                <>
                                    <Divider />
                                    <SliderRow
                                        label="FEVER BGM Volume"
                                        value={settings.feverBgmVolume}
                                        onChange={(v) => update('feverBgmVolume', v)}
                                    />
                                    <TestButton
                                        label="FEVER BGM Test (2s)"
                                        onClick={() => playTestBGM('fever')}
                                        loading={testingSound === 'fever-bgm'}
                                    />
                                </>
                            )}
                        </>
                    )}
                </SettingsCard>

                {/* BGM Section */}
                <SettingsCard
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={settings.bgmEnabled ? '#D4AF37' : '#A8A29E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>}
                    title="BGM"
                    description={settings.bgmEnabled ? 'Background music enabled' : 'Background music disabled'}
                >
                    <ToggleRow
                        label="Background Music"
                        description="Ambient music during training"
                        checked={settings.bgmEnabled}
                        onChange={(v) => update('bgmEnabled', v)}
                    />
                    {settings.bgmEnabled && settings.soundEnabled && (
                        <>
                            <SliderRow
                                label="BGM Volume"
                                value={settings.bgmVolume}
                                onChange={(v) => update('bgmVolume', v)}
                            />
                            <TestButton
                                label="BGM Test (3s)"
                                onClick={() => playTestBGM('main')}
                                loading={testingSound === 'main-bgm'}
                            />
                        </>
                    )}
                </SettingsCard>

                {/* Effects Section */}
                <SettingsCard
                    icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>}
                    title="Effects"
                    description="Visual effects and bonus modes"
                >
                    <ToggleRow
                        label="Slot Animation"
                        description="XP / Sparks / Card Points are always earned"
                        checked={settings.slotEnabled}
                        onChange={(v) => update('slotEnabled', v)}
                    />
                    <Divider />
                    <ToggleRow
                        label="FEVER Mode"
                        description="Bonus mode. OFF disables FEVER activation + all kakuhen/FEVER sounds & BGM"
                        checked={settings.feverEnabled}
                        onChange={(v) => update('feverEnabled', v)}
                        accentColor="#EF4444"
                    />
                </SettingsCard>

            </div>
        </div>
    );
}

/* --- Sub-components --- */

function SettingsCard({ icon, title, description, children }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            border: '1px solid #E7E5E4',
            overflow: 'hidden',
        }}>
            {/* Card header */}
            <div style={{
                padding: '16px 20px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid #F5F5F4',
            }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    backgroundColor: '#FFFBEB', border: '1px solid #FDE68A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    {icon}
                </div>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1C1917' }}>{title}</div>
                    <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '1px' }}>{description}</div>
                </div>
            </div>
            {/* Card body */}
            <div style={{ padding: '8px 20px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {children}
            </div>
        </div>
    );
}

function ToggleRow({ label, description, checked, onChange, accentColor }: {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    accentColor?: string;
}) {
    const color = accentColor || '#D4AF37';
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            gap: '16px',
        }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1C1917' }}>{label}</div>
                {description && (
                    <div style={{ fontSize: '12px', color: '#A8A29E', marginTop: '3px', lineHeight: '1.4' }}>{description}</div>
                )}
            </div>
            <button
                onClick={() => onChange(!checked)}
                style={{
                    width: '52px',
                    height: '30px',
                    borderRadius: '15px',
                    border: 'none',
                    backgroundColor: checked ? color : '#D6D3D1',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background-color 0.2s ease',
                    flexShrink: 0,
                    boxShadow: checked ? `0 2px 8px ${color}30` : 'inset 0 1px 3px rgba(0,0,0,0.1)',
                }}
            >
                <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '3px',
                    left: checked ? '25px' : '3px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }} />
            </button>
        </div>
    );
}

function SliderRow({ label, value, onChange }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <div style={{ padding: '8px 0' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
            }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#57534E' }}>{label}</span>
                <span style={{
                    fontSize: '13px', fontWeight: '700', color: '#1C1917',
                    fontVariantNumeric: 'tabular-nums',
                    backgroundColor: '#F5F5F4',
                    padding: '2px 10px',
                    borderRadius: '6px',
                }}>
                    {value}%
                </span>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    width: '100%',
                    accentColor: '#D4AF37',
                    cursor: 'pointer',
                    height: '6px',
                }}
            />
        </div>
    );
}

function TestButton({ label, onClick, loading }: {
    label: string;
    onClick: () => void;
    loading: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            style={{
                alignSelf: 'flex-start',
                padding: '8px 20px',
                borderRadius: '10px',
                border: '1px solid #E7E5E4',
                backgroundColor: loading ? '#F5F5F4' : '#fff',
                fontSize: '12px',
                color: loading ? '#A8A29E' : '#57534E',
                cursor: loading ? 'default' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.15s',
                letterSpacing: '0.3px',
            }}
        >
            {loading ? 'Playing...' : label}
        </button>
    );
}

function Divider() {
    return <div style={{ height: '1px', backgroundColor: '#F5F5F4', margin: '4px 0' }} />;
}
