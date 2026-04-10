'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { DailyConversation } from '@/data/english/365/daily-conversations';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BORDER = '#E7E5E4';

const CHARACTER_COLORS: Record<string, string> = {
    Yuki: '#8B5CF6',
    Takeshi: '#2563EB',
    Lisa: '#EC4899',
    Kenji: '#059669',
    Mina: '#F59E0B',
    Master: '#D4AF37',
    Staff: '#78716C',
    Stranger: '#78716C',
};

interface Props {
    conversation: DailyConversation;
}

export default function DailyConversationPlayer({ conversation }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLine, setCurrentLine] = useState(-1);
    const [showJapanese, setShowJapanese] = useState(false);
    const [playbackDone, setPlaybackDone] = useState(false);
    const [speed, setSpeed] = useState<0.7 | 0.9 | 1.05>(0.9);
    const cancelledRef = useRef(false);
    const playingRef = useRef(false);

    useEffect(() => {
        return () => {
            cancelledRef.current = true;
            window.speechSynthesis.cancel();
        };
    }, []);

    const speakLine = useCallback((text: string, rate: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'en-US';
            u.rate = rate;
            const voices = window.speechSynthesis.getVoices();
            const enVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang.startsWith('en')) || voices[0];
            if (enVoice) u.voice = enVoice;
            u.onend = () => resolve();
            u.onerror = () => reject();
            window.speechSynthesis.speak(u);
        });
    }, []);

    const playAll = useCallback(async () => {
        if (playingRef.current) {
            // Stop
            cancelledRef.current = true;
            window.speechSynthesis.cancel();
            playingRef.current = false;
            setIsPlaying(false);
            setCurrentLine(-1);
            return;
        }

        cancelledRef.current = false;
        playingRef.current = true;
        setIsPlaying(true);
        setPlaybackDone(false);

        for (let i = 0; i < conversation.lines.length; i++) {
            if (cancelledRef.current) break;
            setCurrentLine(i);
            try {
                await speakLine(conversation.lines[i].english, speed);
            } catch {
                // speech error, continue
            }
            // Small pause between lines
            if (!cancelledRef.current) {
                await new Promise(r => setTimeout(r, 400));
            }
        }

        playingRef.current = false;
        setIsPlaying(false);
        setCurrentLine(-1);
        if (!cancelledRef.current) setPlaybackDone(true);
    }, [conversation.lines, speed, speakLine]);

    const playOneLine = useCallback(async (idx: number) => {
        cancelledRef.current = false;
        setCurrentLine(idx);
        try {
            await speakLine(conversation.lines[idx].english, speed);
        } catch { /* */ }
        setCurrentLine(-1);
    }, [conversation.lines, speed, speakLine]);

    const speeds: { label: string; value: 0.7 | 0.9 | 1.05 }[] = [
        { label: 'Slow', value: 0.7 },
        { label: 'Normal', value: 0.9 },
        { label: 'Fast', value: 1.05 },
    ];

    return (
        <div style={{
            background: '#fff',
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '14px 16px 10px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #ECFDF5 100%)',
                borderBottom: `1px solid ${BORDER}`,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div>
                        <div style={{ fontSize: 9, fontWeight: 800, color: GOLD, letterSpacing: '0.2em', marginBottom: 2 }}>
                            REAL CONVERSATION
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                            {conversation.titleJa}
                        </div>
                        <div style={{ fontSize: 10, color: '#78716C', marginTop: 2 }}>
                            {conversation.setup}
                        </div>
                    </div>
                    {/* Play all button */}
                    <button
                        onClick={playAll}
                        style={{
                            width: 52, height: 52, borderRadius: '50%',
                            border: 'none', cursor: 'pointer',
                            background: isPlaying
                                ? `linear-gradient(135deg, #EF4444, #DC2626)`
                                : `linear-gradient(135deg, ${GOLD}, #B8941F)`,
                            color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: isPlaying
                                ? '0 4px 16px rgba(239,68,68,0.3)'
                                : '0 4px 16px rgba(212,175,55,0.3)',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                        }}
                    >
                        {isPlaying ? (
                            <div style={{ width: 16, height: 16, borderRadius: 3, background: '#fff' }} />
                        ) : (
                            <div style={{
                                width: 0, height: 0, marginLeft: 4,
                                borderTop: '10px solid transparent',
                                borderBottom: '10px solid transparent',
                                borderLeft: '16px solid #fff',
                            }} />
                        )}
                    </button>
                </div>
                {/* Controls row */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginTop: 10,
                }}>
                    {/* Speed */}
                    <div style={{
                        display: 'flex', gap: 2, background: '#F5F5F4', borderRadius: 6, padding: 2,
                    }}>
                        {speeds.map(s => (
                            <button key={s.value} onClick={() => setSpeed(s.value)} style={{
                                padding: '3px 8px', borderRadius: 4, border: 'none',
                                fontSize: 10, fontWeight: 700, cursor: 'pointer',
                                background: speed === s.value ? '#1C1917' : 'transparent',
                                color: speed === s.value ? '#fff' : '#78716C',
                                transition: 'all 0.15s',
                            }}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                    {/* Japanese toggle */}
                    <button
                        onClick={() => setShowJapanese(!showJapanese)}
                        style={{
                            padding: '3px 10px', borderRadius: 4, border: 'none',
                            fontSize: 10, fontWeight: 700, cursor: 'pointer',
                            background: showJapanese ? GREEN : '#F5F5F4',
                            color: showJapanese ? '#fff' : '#78716C',
                            transition: 'all 0.15s',
                        }}
                    >
                        {showJapanese ? '日本語 ON' : '日本語 OFF'}
                    </button>
                </div>
            </div>

            {/* Conversation lines */}
            <div style={{ padding: '8px 12px 12px' }}>
                {conversation.lines.map((line, i) => {
                    const isActive = currentLine === i;
                    const color = CHARACTER_COLORS[line.speaker] || '#78716C';
                    return (
                        <div
                            key={i}
                            onClick={() => playOneLine(i)}
                            style={{
                                display: 'flex', gap: 10, padding: '10px 8px',
                                borderRadius: 10, cursor: 'pointer',
                                background: isActive ? `${color}08` : 'transparent',
                                borderLeft: isActive ? `3px solid ${color}` : '3px solid transparent',
                                transition: 'all 0.2s',
                            }}
                        >
                            {/* Speaker avatar */}
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%',
                                background: `${color}15`,
                                border: `2px solid ${color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontWeight: 800, color,
                                flexShrink: 0, marginTop: 2,
                            }}>
                                {line.speaker[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 2 }}>
                                    {line.speaker}
                                </div>
                                <div style={{
                                    fontSize: 14, fontWeight: 500, color: '#1C1917',
                                    lineHeight: 1.5,
                                }}>
                                    {line.english}
                                </div>
                                {showJapanese && (
                                    <div style={{
                                        fontSize: 11, color: '#78716C', marginTop: 3,
                                        lineHeight: 1.4,
                                    }}>
                                        {line.japanese}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Playback done message */}
            {playbackDone && (
                <div style={{
                    padding: '10px 16px 14px',
                    borderTop: `1px solid ${BORDER}`,
                    textAlign: 'center',
                    fontSize: 11, color: GREEN, fontWeight: 700,
                }}>
                    Complete -- tap any line to replay
                </div>
            )}
        </div>
    );
}
