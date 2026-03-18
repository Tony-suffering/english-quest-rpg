'use client';

import { useState, useEffect } from 'react';
import { getSettings, setSetting, type AppSettings } from '@/lib/settings';

export default function SettingsPage() {
    const [settings, setLocalSettings] = useState<AppSettings | null>(null);
    const [totalPhrases, setTotalPhrases] = useState(0);
    const [vocabCount, setVocabCount] = useState(0);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [showTutorialReset, setShowTutorialReset] = useState(false);

    useEffect(() => {
        setLocalSettings(getSettings());
        try {
            const mastery = localStorage.getItem('quest-mastery');
            if (mastery) setTotalPhrases(Object.keys(JSON.parse(mastery)).length);
        } catch { /* */ }
        try {
            const deck = localStorage.getItem('izakaya_toeic_vocab_deck');
            if (deck) setVocabCount(JSON.parse(deck).length);
        } catch { /* */ }
    }, []);

    if (!settings) return null;

    const update = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        setSetting(key, value);
        setLocalSettings({ ...settings, [key]: value });
    };

    const playTestSound = () => {
        try {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') ctx.resume();
            const now = ctx.currentTime;
            const vol = settings.volume / 100;
            [523, 659, 784].forEach((freq, i) => {
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
        } catch { /* */ }
    };

    const playTestBGM = () => {
        try {
            const vol = (settings.feverBgmVolume / 100) * (settings.volume / 100);
            const audio = new Audio('/audio/fever-bgm.mp3');
            audio.volume = vol;
            audio.play().catch(() => {});
            setTimeout(() => {
                let step = 0;
                const fade = setInterval(() => {
                    step++;
                    audio.volume = Math.max(0, vol * (1 - step / 8));
                    if (step >= 8) { clearInterval(fade); audio.pause(); }
                }, 80);
            }, 2000);
        } catch { /* */ }
    };

    const playTestMainBGM = () => {
        try {
            const vol = (settings.bgmVolume / 100) * (settings.volume / 100);
            const audio = new Audio('/audio/bgm-main.mp3');
            audio.volume = vol;
            audio.play().catch(() => {});
            setTimeout(() => {
                let step = 0;
                const fade = setInterval(() => {
                    step++;
                    audio.volume = Math.max(0, vol * (1 - step / 8));
                    if (step >= 8) { clearInterval(fade); audio.pause(); }
                }, 80);
            }, 3000);
        } catch { /* */ }
    };

    const resetAllProgress = () => {
        const keys = [
            'quest-mastery', 'izakaya_toeic_vocab_deck',
            'izakaya_card_points', 'toeic_30day_start',
            'toeic_training_tutorial_done', 'toeic_episode_tutorial_done',
            'quest-days-active',
        ];
        keys.forEach(k => localStorage.removeItem(k));
        setTotalPhrases(0);
        setVocabCount(0);
        setShowResetConfirm(false);
    };

    const resetTutorials = () => {
        localStorage.removeItem('toeic_training_tutorial_done');
        localStorage.removeItem('toeic_episode_tutorial_done');
        setShowTutorialReset(true);
        setTimeout(() => setShowTutorialReset(false), 2000);
    };

    return (
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 4, height: 28, backgroundColor: '#D4AF37', borderRadius: 2 }} />
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1c1917', margin: 0 }}>設定</h1>
            </div>
            <p style={{ fontSize: 13, color: '#a8a29e', marginBottom: 40, paddingLeft: 16 }}>
                サウンド、エフェクト、データ管理
            </p>

            {/* ── Progress Overview ── */}
            <Section title="あなたの進捗">
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
                    padding: '4px 0',
                }}>
                    <StatBox label="学習済み" value={String(totalPhrases)} color="#10B981" />
                    <StatBox label="エピソード語彙" value={String(vocabCount)} color="#D4AF37" />
                    <StatBox label="サウンド" value={settings.soundEnabled ? 'ON' : 'OFF'} color="#3B82F6" />
                </div>
            </Section>

            {/* ── Sound Section ── */}
            <Section title="サウンド">
                <ToggleRow
                    label="サウンド"
                    description="全サウンドの ON / OFF"
                    checked={settings.soundEnabled}
                    onChange={(v) => update('soundEnabled', v)}
                />
                {settings.soundEnabled && (
                    <>
                        <SliderRow label="マスター音量" value={settings.volume} onChange={(v) => update('volume', v)} />
                        <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
                            <TestButton label="SE テスト" onClick={playTestSound} />
                        </div>
                        {settings.feverEnabled && (
                            <>
                                <SliderRow label="FEVER BGM 音量" value={settings.feverBgmVolume} onChange={(v) => update('feverBgmVolume', v)} />
                                <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
                                    <TestButton label="FEVER BGM テスト (2秒)" onClick={playTestBGM} />
                                </div>
                            </>
                        )}
                    </>
                )}
            </Section>

            {/* ── BGM Section ── */}
            <Section title="BGM">
                <ToggleRow
                    label="BGM"
                    description="通常時のバックグラウンド音楽"
                    checked={settings.bgmEnabled}
                    onChange={(v) => update('bgmEnabled', v)}
                />
                {settings.bgmEnabled && settings.soundEnabled && (
                    <>
                        <SliderRow label="BGM 音量" value={settings.bgmVolume} onChange={(v) => update('bgmVolume', v)} />
                        <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
                            <TestButton label="BGM テスト (3秒)" onClick={playTestMainBGM} />
                        </div>
                    </>
                )}
            </Section>

            {/* ── Effects Section ── */}
            <Section title="エフェクト">
                <ToggleRow
                    label="スロット演出"
                    description="レビュー成功時のスロットマシン演出。OFF でも XP は獲得されます"
                    checked={settings.slotEnabled}
                    onChange={(v) => update('slotEnabled', v)}
                />
                <ToggleRow
                    label="FEVER モード"
                    description="連続正解でチェーンボーナス。確変モードで倍率アップ"
                    checked={settings.feverEnabled}
                    onChange={(v) => update('feverEnabled', v)}
                />
            </Section>

            {/* ── Progressive Unlock Section ── */}
            <Section title="段階解放">
                <ToggleRow
                    label="ビギナーモード"
                    description="ON: 日数に応じて機能が段階的に解放。OFF: 全機能を即時解放"
                    checked={settings.beginnerMode}
                    onChange={(v) => update('beginnerMode', v)}
                />
                {settings.beginnerMode && (() => {
                    let days = 0;
                    try {
                        const raw = localStorage.getItem('quest-days-active');
                        if (raw) days = JSON.parse(raw).length;
                    } catch { /* */ }
                    return (
                        <div style={{
                            padding: '12px 16px', borderRadius: 10,
                            backgroundColor: '#FAFAF9', border: '1px solid #E7E5E4',
                            fontSize: 13, color: '#57534e', lineHeight: 1.8,
                        }}>
                            <div style={{ fontWeight: 600, marginBottom: 4, color: '#1c1917' }}>
                                アクティブ日数: {days}
                            </div>
                            <div style={{ color: days >= 3 ? '#10B981' : '#a8a29e' }}>
                                {days >= 3 ? '[UNLOCKED]' : '[LOCKED]'} Day 3: スロット演出
                            </div>
                            <div style={{ color: days >= 6 ? '#10B981' : '#a8a29e' }}>
                                {days >= 6 ? '[UNLOCKED]' : '[LOCKED]'} Day 6: 確変 / FEVER モード
                            </div>
                            <div style={{ color: days >= 10 ? '#10B981' : '#a8a29e' }}>
                                {days >= 10 ? '[UNLOCKED]' : '[LOCKED]'} Day 10: バトル
                            </div>
                        </div>
                    );
                })()}
            </Section>

            {/* ── Tutorial Section ── */}
            <Section title="チュートリアル">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#1c1917' }}>チュートリアルをリセット</div>
                        <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 2 }}>
                            トレーニング・エピソードのチュートリアルをもう一度表示します
                        </div>
                    </div>
                    <button
                        onClick={resetTutorials}
                        style={{
                            padding: '8px 16px', borderRadius: 8,
                            border: '1px solid #d6d3d1', backgroundColor: '#fff',
                            fontSize: 12, color: '#57534e', cursor: 'pointer', fontWeight: 500,
                            flexShrink: 0,
                        }}
                    >
                        {showTutorialReset ? 'リセット済み' : 'リセット'}
                    </button>
                </div>
            </Section>

            {/* ── Data Management ── */}
            <Section title="データ管理">
                <div style={{
                    padding: 16, borderRadius: 12,
                    backgroundColor: '#FAFAF9', border: '1px solid #E7E5E4',
                }}>
                    <div style={{ fontSize: 13, color: '#57534e', lineHeight: 1.8, marginBottom: 16 }}>
                        このアプリのデータはすべてブラウザに保存されています。<br />
                        アプリを削除してもデータは残りますが、<br />
                        ブラウザのデータを消去すると進捗もリセットされます。
                    </div>
                    {!showResetConfirm ? (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            style={{
                                padding: '10px 20px', borderRadius: 8,
                                border: '1px solid #FECACA', backgroundColor: '#FEF2F2',
                                fontSize: 12, color: '#EF4444', cursor: 'pointer', fontWeight: 600,
                            }}
                        >
                            すべての進捗をリセット
                        </button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                                本当にリセットしますか？この操作は取り消せません。
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button
                                    onClick={resetAllProgress}
                                    style={{
                                        padding: '10px 20px', borderRadius: 8, border: 'none',
                                        backgroundColor: '#EF4444', color: '#fff',
                                        fontSize: 12, cursor: 'pointer', fontWeight: 600,
                                    }}
                                >
                                    はい、リセットする
                                </button>
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    style={{
                                        padding: '10px 20px', borderRadius: 8,
                                        border: '1px solid #d6d3d1', backgroundColor: '#fff',
                                        fontSize: 12, color: '#57534e', cursor: 'pointer', fontWeight: 500,
                                    }}
                                >
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Section>

            {/* ── About ── */}
            <Section title="このアプリについて">
                <div style={{ padding: '4px 0', fontSize: 13, color: '#78716c', lineHeight: 2.0 }}>
                    TOEIC 900点。4技能のうち3つはクリアした。<br />
                    最後の1つで永遠に死んでる男が作った英語アプリ。<br />
                    毎日何かが壊れて、毎日何かが直る。<br />
                    <span style={{ color: '#D4AF37', fontWeight: 600 }}>完成を待ってたら永遠に喋れない。</span>
                </div>
                <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 8 }}>
                    Built with Vibe Coding + Claude AI / TONIO LAB
                </div>
            </Section>
        </div>
    );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div style={{
            backgroundColor: '#fff', borderRadius: 12, padding: '14px 12px',
            textAlign: 'center', border: '1px solid #E7E5E4',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
            <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 9, color: '#a8a29e', fontWeight: 600, letterSpacing: '0.1em', marginTop: 4 }}>{label}</div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <h2 style={{
                fontSize: 13, fontWeight: 600, color: '#a8a29e',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: 16, paddingBottom: 8,
                borderBottom: '1px solid #e7e5e4',
            }}>
                {title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {children}
            </div>
        </div>
    );
}

function ToggleRow({ label, description, checked, onChange }: {
    label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1c1917' }}>{label}</div>
                {description && <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 2 }}>{description}</div>}
            </div>
            <button
                onClick={() => onChange(!checked)}
                style={{
                    width: 48, height: 28, borderRadius: 14, border: 'none',
                    backgroundColor: checked ? '#D4AF37' : '#d6d3d1',
                    cursor: 'pointer', position: 'relative',
                    transition: 'background-color 0.2s ease', flexShrink: 0,
                }}
            >
                <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    backgroundColor: '#fff', position: 'absolute',
                    top: 3, left: checked ? 23 : 3,
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }} />
            </button>
        </div>
    );
}

function SliderRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; }) {
    return (
        <div style={{ padding: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1c1917' }}>{label}</span>
                <span style={{ fontSize: 13, color: '#78716c', fontVariantNumeric: 'tabular-nums' }}>{value}%</span>
            </div>
            <input type="range" min={0} max={100} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D4AF37', cursor: 'pointer' }}
            />
        </div>
    );
}

function TestButton({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid #d6d3d1',
            backgroundColor: '#fff', fontSize: 12, color: '#57534e',
            cursor: 'pointer', fontWeight: 500,
        }}>
            {label}
        </button>
    );
}
