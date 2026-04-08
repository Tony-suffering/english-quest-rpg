'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    tokyo52Ep01Entries,
    TOKYO52_EP01_PROLOGUE,
    TOKYO52_EP01_PROLOGUE_EN,
    TOKYO52_EP01_VOCAB,
    TOKYO52_EP01_EXPRESSIONS,
} from '@/data/english/tokyo52/ep01';

const DEV_KEY = 'tl_dev_auth';
const DEV_VERSION = 'v1';

type Tab = 'day2' | 'day3' | 'vocab' | 'expressions';

const TABS: { key: Tab; label: string }[] = [
    { key: 'day2', label: 'MEMORIA DAY 2' },
    { key: 'day3', label: 'MEMORIA DAY 3' },
    { key: 'vocab', label: 'VOCABULARY' },
    { key: 'expressions', label: 'EXPRESSIONS' },
];

function extractSpeaker(text: string): { name: string; dialogue: string } {
    const match = text.match(/^([^:]+):\s*(.*)$/s);
    if (match) return { name: match[1].trim(), dialogue: match[2].trim() };
    return { name: '', dialogue: text };
}

const SPEAKER_COLORS: Record<string, string> = {
    'Yuki': '#D4AF37',
    'Aya': '#A78BFA',
    'Rina': '#10B981',
    'Foreign Customer': '#3B82F6',
    'Master Gondo': '#F59E0B',
};

function MemoriaView({ entryIndex }: { entryIndex: number }) {
    const entry = tokyo52Ep01Entries[entryIndex];
    if (!entry) return null;

    return (
        <div>
            <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#555',
                marginBottom: 8,
            }}>
                {entry.title}
            </div>
            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 24 }}>
                {entry.content}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {entry.conversation.english.map((line, i) => {
                    const { name, dialogue } = extractSpeaker(line.text);
                    const jaLine = entry.conversation.japanese[i];
                    const { dialogue: jaDialogue } = jaLine ? extractSpeaker(jaLine.text) : { dialogue: '' };
                    const color = SPEAKER_COLORS[name] || '#888';
                    const isSilence = dialogue === '...' || dialogue === '';

                    return (
                        <div key={i} style={{
                            display: 'flex', gap: 12, padding: '12px 16px',
                            borderLeft: `3px solid ${color}`,
                            backgroundColor: i % 2 === 0 ? '#0c0c10' : 'transparent',
                            borderRadius: '0 8px 8px 0',
                            transition: 'background 0.15s',
                        }}>
                            <div style={{
                                fontSize: 11, color: '#555', minWidth: 24, paddingTop: 2,
                                fontWeight: 600,
                            }}>
                                {i + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                {name && (
                                    <div style={{
                                        fontSize: 11, fontWeight: 700, color,
                                        letterSpacing: '0.06em', marginBottom: 4,
                                    }}>
                                        {name}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: 14, color: isSilence ? '#555' : '#d4d4d4',
                                    lineHeight: 1.7, fontStyle: isSilence ? 'italic' : 'normal',
                                }}>
                                    {dialogue}
                                </div>
                                {jaDialogue && (
                                    <div style={{
                                        fontSize: 12.5, color: '#666', lineHeight: 1.6,
                                        marginTop: 4,
                                    }}>
                                        {jaDialogue}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function VocabView() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
        }}>
            {TOKYO52_EP01_VOCAB.map((v, i) => (
                <div key={i} style={{
                    background: '#0f0f13', border: '1px solid #1a1a1f',
                    borderRadius: 16, padding: '20px 24px',
                }}>
                    <div style={{
                        fontSize: 20, fontWeight: 800, color: '#D4AF37', marginBottom: 4,
                    }}>
                        {v.word}
                    </div>
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
                        {v.meaning}
                    </div>
                    <div style={{
                        fontSize: 13.5, color: '#ccc', lineHeight: 1.7, marginBottom: 4,
                        fontStyle: 'italic',
                    }}>
                        {v.example}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#666', lineHeight: 1.6 }}>
                        {v.exampleJa}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ExpressionsView() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TOKYO52_EP01_EXPRESSIONS.map((exp, i) => (
                <div key={i} style={{
                    background: '#0f0f13', border: '1px solid #1a1a1f',
                    borderRadius: 16, padding: '20px 24px',
                    borderLeft: '3px solid #10B981',
                }}>
                    <div style={{
                        fontSize: 17, fontWeight: 700, color: '#10B981', marginBottom: 4,
                    }}>
                        {exp.expression}
                    </div>
                    <div style={{ fontSize: 13, color: '#D4AF37', marginBottom: 10 }}>
                        {exp.meaningJa}
                    </div>
                    <div style={{
                        fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 8,
                    }}>
                        {exp.context}
                    </div>
                    <div style={{
                        fontSize: 13.5, color: '#bbb', lineHeight: 1.7,
                        padding: '8px 12px', background: '#0a0a0e', borderRadius: 8,
                        fontStyle: 'italic',
                    }}>
                        {exp.example}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Tokyo52Ep01Page() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('day2');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem(DEV_KEY) === DEV_VERSION) {
            setIsAuthed(true);
        } else {
            router.push('/dev');
        }
        setIsLoading(false);
    }, [router]);

    if (isLoading || !isAuthed) {
        return (
            <div style={{
                minHeight: '100vh', backgroundColor: '#09090b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#333',
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: '#e5e5e5' }}>
            {/* Header */}
            <div style={{
                padding: '40px 32px 32px', borderBottom: '1px solid #1a1a1f',
                background: 'linear-gradient(165deg, #0f0f1a 0%, #09090b 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%),radial-gradient(circle at 80% 30%, #10B981 0%, transparent 50%)',
                }} />
                <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    <Link href="/dev/tokyo52" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: '#555', textDecoration: 'none',
                        letterSpacing: '0.06em', marginBottom: 20,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        TOKYO 52
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                            color: '#D4AF37', background: '#D4AF3712', border: '1px solid #D4AF3733',
                            borderRadius: 6, padding: '4px 12px',
                        }}>
                            EPISODE 1
                        </span>
                        <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                            color: '#10B981', background: '#10B98112', border: '1px solid #10B98133',
                            borderRadius: 6, padding: '4px 12px',
                        }}>
                            SPRING
                        </span>
                    </div>
                    <h1 style={{
                        fontSize: 28, fontWeight: 800, color: '#fff',
                        margin: '0 0 6px', lineHeight: 1.3,
                    }}>
                        ここから始まる
                    </h1>
                    <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.7 }}>
                        Shibuya Cafe -- Noren Izakaya
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 32px 80px' }}>
                {/* Prologue */}
                <div style={{
                    background: '#0f0f13', border: '1px solid #1a1a1f',
                    borderRadius: 16, padding: '24px 28px', marginBottom: 32,
                }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                        color: '#D4AF37', marginBottom: 14,
                    }}>
                        PROLOGUE
                    </div>
                    <div style={{ fontSize: 14.5, color: '#ccc', lineHeight: 2, marginBottom: 16 }}>
                        {TOKYO52_EP01_PROLOGUE}
                    </div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.9, fontStyle: 'italic' }}>
                        {TOKYO52_EP01_PROLOGUE_EN}
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap',
                }}>
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                                padding: '10px 18px', borderRadius: 8,
                                border: activeTab === tab.key ? '1px solid #D4AF3744' : '1px solid #1a1a1f',
                                background: activeTab === tab.key ? '#D4AF3715' : '#0f0f13',
                                color: activeTab === tab.key ? '#D4AF37' : '#666',
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'day2' && <MemoriaView entryIndex={0} />}
                {activeTab === 'day3' && <MemoriaView entryIndex={1} />}
                {activeTab === 'vocab' && <VocabView />}
                {activeTab === 'expressions' && <ExpressionsView />}

                {/* Stats footer */}
                <div style={{
                    marginTop: 40, padding: '20px 24px',
                    background: '#0f0f13', border: '1px solid #1a1a1f',
                    borderRadius: 12, display: 'flex', gap: 32, flexWrap: 'wrap',
                }}>
                    {[
                        { label: 'Memoria Lines', value: `${tokyo52Ep01Entries[0].conversation.english.length + tokyo52Ep01Entries[1].conversation.english.length}` },
                        { label: 'Vocabulary', value: `${TOKYO52_EP01_VOCAB.length} words` },
                        { label: 'Expressions', value: `${TOKYO52_EP01_EXPRESSIONS.length}` },
                        { label: 'Level', value: 'A1' },
                        { label: 'Characters', value: '5' },
                    ].map(stat => (
                        <div key={stat.label}>
                            <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.1em', fontWeight: 700 }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: 16, color: '#D4AF37', fontWeight: 700, marginTop: 2 }}>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
