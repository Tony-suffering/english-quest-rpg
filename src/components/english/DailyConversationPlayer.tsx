'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, Check, ChevronRight, ChevronUp, Play, Square, CircleHelp, Subtitles } from 'lucide-react';
import type { DailyConversation } from '@/data/english/365/daily-conversations';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
const BORDER = '#E7E5E4';

const CHARACTERS: Record<string, { nameJa: string; color: string; icon: string }> = {
    Yuki:     { nameJa: 'ユキ',     color: '#D4AF37', icon: 'Y' },
    Takeshi:  { nameJa: 'タケシ',   color: '#3B82F6', icon: 'T' },
    Lisa:     { nameJa: 'リサ',     color: '#EC4899', icon: 'L' },
    Kenji:    { nameJa: 'ケンジ',   color: '#92400E', icon: 'K' },
    Mina:     { nameJa: 'ミナ',     color: '#8B5CF6', icon: 'M' },
    Master:   { nameJa: 'マスター', color: '#78716C', icon: 'G' },
    Staff:    { nameJa: '店員',     color: '#059669', icon: 'S' },
    Stranger: { nameJa: '通行人',   color: '#78716C', icon: '?' },
};

// Sound effects
function playCompleteSound() {
    try {
        const ctx = new AudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4);
            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 0.4);
        });
    } catch { /* */ }
}

interface Props {
    conversation: DailyConversation;
    daySlot: number;
}

export default function DailyConversationPlayer({ conversation, daySlot }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLine, setCurrentLine] = useState(-1);
    const [showJapanese, setShowJapanese] = useState(true);
    const [listenedLines, setListenedLines] = useState<Set<number>>(new Set());
    const [cleared, setCleared] = useState(false);
    const [clearAnim, setClearAnim] = useState(0);
    const SPEED = 0.9;
    const cancelledRef = useRef(false);
    const playingRef = useRef(false);

    // Check if already cleared today
    useEffect(() => {
        const key = `conv-clear-${daySlot}`;
        if (localStorage.getItem(key)) setCleared(true);
    }, [daySlot]);

    useEffect(() => {
        return () => {
            cancelledRef.current = true;
            window.speechSynthesis.cancel();
        };
    }, []);

    const totalLines = conversation.lines.length;
    const listenedCount = listenedLines.size;
    const allListened = listenedCount >= totalLines;

    // Trigger clear celebration
    useEffect(() => {
        if (allListened && !cleared && expanded) {
            playCompleteSound();
            localStorage.setItem(`conv-clear-${daySlot}`, 'true');
            setCleared(true);
            setClearAnim(1);
            setTimeout(() => setClearAnim(2), 400);
            setTimeout(() => setClearAnim(3), 1000);
            setTimeout(() => setClearAnim(4), 2000);
        }
    }, [allListened, cleared, expanded, daySlot]);

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

    const markListened = useCallback((idx: number) => {
        setListenedLines(prev => {
            const next = new Set(prev);
            next.add(idx);
            return next;
        });
    }, []);

    const playAll = useCallback(async () => {
        if (playingRef.current) {
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

        for (let i = 0; i < conversation.lines.length; i++) {
            if (cancelledRef.current) break;
            setCurrentLine(i);
            markListened(i);
            try {
                await speakLine(conversation.lines[i].english, SPEED);
            } catch { /* */ }
            if (!cancelledRef.current) {
                await new Promise(r => setTimeout(r, 500));
            }
        }

        playingRef.current = false;
        setIsPlaying(false);
        setCurrentLine(-1);
    }, [conversation.lines, speakLine, markListened]);

    const playOneLine = useCallback(async (idx: number) => {
        if (playingRef.current) return;
        cancelledRef.current = false;
        setCurrentLine(idx);
        markListened(idx);
        try {
            await speakLine(conversation.lines[idx].english, SPEED);
        } catch { /* */ }
        setCurrentLine(-1);
    }, [conversation.lines, speakLine, markListened]);

    const progressPct = totalLines > 0 ? (listenedCount / totalLines) * 100 : 0;

    // Collapsed state — teaser card
    if (!expanded) {
        return (
            <div
                onClick={() => setExpanded(true)}
                style={{
                    background: cleared
                        ? 'linear-gradient(135deg, #FFFBEB 0%, #ECFDF5 100%)'
                        : 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                    borderRadius: 14,
                    border: cleared ? `2px solid ${GOLD}40` : '1px solid #44403C',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle shimmer */}
                {!cleared && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(110deg, transparent 30%, rgba(212,175,55,0.05) 50%, transparent 70%)',
                        animation: 'conv-shimmer 3s ease-in-out infinite',
                    }} />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                    {/* Icon */}
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: cleared
                            ? `linear-gradient(135deg, ${GOLD}, ${GREEN})`
                            : `linear-gradient(135deg, ${GOLD}30, ${GREEN}20)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        {cleared ? (
                            <Check size={22} color="#fff" strokeWidth={2.5} />
                        ) : (
                            <Mic size={22} color={GOLD} strokeWidth={2} />
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: 9, fontWeight: 800, letterSpacing: '0.2em',
                            color: cleared ? GREEN : GOLD,
                            marginBottom: 2,
                        }}>
                            {cleared ? 'BONUS CLEAR' : 'BONUS LISTENING'}
                        </div>
                        <div style={{
                            fontSize: 14, fontWeight: 700,
                            color: cleared ? '#1C1917' : '#fff',
                        }}>
                            {conversation.titleJa}
                        </div>
                        <div style={{
                            fontSize: 10, marginTop: 3,
                            color: cleared ? '#78716C' : '#A8A29E',
                        }}>
                            {cleared
                                ? 'クリア済み -- もう一度聞く'
                                : '今日のフレーズが実際の会話で使われるシーンを聞いてみよう'}
                        </div>
                    </div>
                    <ChevronRight size={20} color={cleared ? GREEN : '#A8A29E'} strokeWidth={2} style={{ flexShrink: 0 }} />
                </div>
            </div>
        );
    }

    // Expanded state — full player
    return (
        <div style={{
            background: '#fff',
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
            {/* Keyframes */}
            <style>{`
                @keyframes conv-shimmer {
                    0%, 100% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                }
                @keyframes conv-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }
                @keyframes conv-bar-eq {
                    0%, 100% { height: 30%; }
                    50% { height: 100%; }
                }
                @keyframes conv-clear-burst {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(3); opacity: 0; }
                }
                @keyframes conv-clear-text {
                    0% { transform: scale(0.5) translateY(20px); opacity: 0; }
                    50% { transform: scale(1.1) translateY(-5px); opacity: 1; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes conv-confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-80px) rotate(720deg); opacity: 0; }
                }
            `}</style>

            {/* Header */}
            <div style={{
                padding: '14px 16px 12px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #F0FDF4 100%)',
                borderBottom: `1px solid ${BORDER}`,
                position: 'relative',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <Mic size={14} color={GOLD} strokeWidth={2.5} />
                            <span style={{ fontSize: 9, fontWeight: 800, color: GOLD, letterSpacing: '0.2em' }}>
                                BONUS LISTENING
                            </span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1917', marginBottom: 2 }}>
                            {conversation.titleJa}
                        </div>
                        <div style={{ fontSize: 11, color: '#78716C', lineHeight: 1.5 }}>
                            {conversation.setup}
                        </div>
                    </div>
                    {/* Collapse button */}
                    <button onClick={() => { setExpanded(false); cancelledRef.current = true; window.speechSynthesis.cancel(); setIsPlaying(false); }} style={{
                        width: 28, height: 28, borderRadius: 8,
                        border: `1px solid ${BORDER}`, background: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', flexShrink: 0,
                    }}>
                        <ChevronUp size={14} color="#78716C" strokeWidth={2} />
                    </button>
                </div>

                {/* Motivational prompt */}
                <div style={{
                    marginTop: 10, padding: '8px 12px',
                    background: '#fff', borderRadius: 8,
                    border: `1px solid ${GOLD}20`,
                    display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    <CircleHelp size={16} color={GOLD} strokeWidth={2} />
                    <span style={{ fontSize: 11, color: '#78716C', lineHeight: 1.4 }}>
                        自分ならどう言うか考えながら聞いてみよう
                    </span>
                </div>

                {/* Progress bar */}
                <div style={{
                    marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    <div style={{
                        flex: 1, height: 4, borderRadius: 2,
                        background: '#E7E5E4', overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progressPct}%`, height: '100%',
                            background: allListened ? GREEN : `linear-gradient(90deg, ${GOLD}, ${GREEN})`,
                            borderRadius: 2,
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: allListened ? GREEN : '#78716C', flexShrink: 0 }}>
                        {listenedCount}/{totalLines}
                    </span>
                </div>

                {/* Controls */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginTop: 10,
                }}>
                    {/* Play all */}
                    <button
                        onClick={playAll}
                        style={{
                            height: 34, borderRadius: 8,
                            border: 'none', cursor: 'pointer',
                            padding: '0 14px',
                            background: isPlaying
                                ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                                : `linear-gradient(135deg, ${GOLD}, #B8941F)`,
                            color: '#fff',
                            display: 'flex', alignItems: 'center', gap: 6,
                            fontSize: 11, fontWeight: 700,
                            boxShadow: isPlaying
                                ? '0 2px 8px rgba(239,68,68,0.3)'
                                : '0 2px 8px rgba(212,175,55,0.3)',
                            transition: 'all 0.2s',
                            ...(isPlaying ? {} : { animation: 'conv-pulse 2s ease-in-out infinite' }),
                        }}
                    >
                        {isPlaying ? (
                            <>
                                <Square size={10} fill="#fff" color="#fff" />
                                STOP
                            </>
                        ) : (
                            <>
                                <Play size={12} fill="#fff" color="#fff" />
                                {allListened ? 'もう一度' : '全部聞く'}
                            </>
                        )}
                    </button>

                    {/* Japanese toggle */}
                    <button
                        onClick={() => setShowJapanese(!showJapanese)}
                        style={{
                            height: 26, padding: '0 10px', borderRadius: 6, border: 'none',
                            fontSize: 10, fontWeight: 700, cursor: 'pointer',
                            background: showJapanese ? GREEN : '#F5F5F4',
                            color: showJapanese ? '#fff' : '#78716C',
                            display: 'flex', alignItems: 'center', gap: 4,
                            transition: 'all 0.15s',
                        }}
                    >
                        <Subtitles size={10} strokeWidth={2.5} />
                        {showJapanese ? '字幕 ON' : '字幕'}
                    </button>
                </div>
            </div>

            {/* Conversation lines */}
            <div style={{ padding: '6px 10px 10px' }}>
                {conversation.lines.map((line, i) => {
                    const isActive = currentLine === i;
                    const heard = listenedLines.has(i);
                    const char = CHARACTERS[line.speaker] || { nameJa: line.speaker, color: '#78716C', icon: line.speaker[0] };

                    return (
                        <div
                            key={i}
                            onClick={() => playOneLine(i)}
                            style={{
                                display: 'flex', gap: 10, padding: '10px 8px',
                                borderRadius: 10, cursor: 'pointer',
                                background: isActive ? `${char.color}08` : 'transparent',
                                transition: 'all 0.25s',
                                opacity: !heard && listenedCount > 0 && !isActive ? 0.5 : 1,
                            }}
                        >
                            {/* Avatar */}
                            <div style={{
                                width: 34, height: 34, borderRadius: '50%',
                                background: isActive
                                    ? `linear-gradient(135deg, ${char.color}, ${char.color}CC)`
                                    : heard ? `${char.color}18` : '#F5F5F4',
                                border: `2px solid ${isActive ? char.color : heard ? `${char.color}40` : '#E7E5E4'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, marginTop: 1,
                                transition: 'all 0.25s',
                                position: 'relative',
                            }}>
                                {isActive ? (
                                    // Animated equalizer bars
                                    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                                        {[0, 1, 2].map(b => (
                                            <div key={b} style={{
                                                width: 3, borderRadius: 1,
                                                background: '#fff',
                                                animation: `conv-bar-eq 0.6s ease-in-out ${b * 0.15}s infinite`,
                                            }} />
                                        ))}
                                    </div>
                                ) : heard ? (
                                    <Check size={14} color={char.color} strokeWidth={2.5} />
                                ) : (
                                    <span style={{ fontSize: 12, fontWeight: 800, color: '#A8A29E' }}>
                                        {char.icon}
                                    </span>
                                )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2,
                                }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: char.color }}>
                                        {line.speaker}
                                    </span>
                                    <span style={{ fontSize: 9, color: '#A8A29E' }}>
                                        {char.nameJa}
                                    </span>
                                    {!heard && !isActive && (
                                        <Play size={10} color="#A8A29E" strokeWidth={2} style={{ marginLeft: 'auto' }} />
                                    )}
                                </div>
                                <div style={{
                                    fontSize: 14, fontWeight: isActive ? 600 : 500,
                                    color: isActive ? '#1C1917' : heard ? '#44403C' : '#78716C',
                                    lineHeight: 1.5,
                                    transition: 'color 0.2s',
                                }}>
                                    {line.english}
                                </div>
                                {showJapanese && (
                                    <div style={{
                                        fontSize: 11, color: '#A8A29E', marginTop: 3,
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

            {/* Clear celebration overlay */}
            {clearAnim > 0 && clearAnim < 4 && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column',
                    background: clearAnim >= 2 ? 'rgba(0,0,0,0.85)' : 'transparent',
                    transition: 'background 0.5s',
                    pointerEvents: clearAnim >= 3 ? 'auto' : 'none',
                }}
                onClick={clearAnim >= 3 ? () => setClearAnim(4) : undefined}
                >
                    {/* Burst ring */}
                    {clearAnim >= 1 && (
                        <div style={{
                            position: 'absolute',
                            width: 100, height: 100, borderRadius: '50%',
                            border: `3px solid ${GOLD}`,
                            animation: 'conv-clear-burst 1s ease-out forwards',
                        }} />
                    )}

                    {/* Confetti particles */}
                    {clearAnim >= 2 && Array.from({ length: 12 }, (_, i) => {
                        const angle = (i / 12) * 360;
                        const colors = [GOLD, GREEN, BLUE, '#EC4899', '#8B5CF6', '#F59E0B'];
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                width: 6, height: 6,
                                borderRadius: i % 2 === 0 ? '50%' : 1,
                                background: colors[i % colors.length],
                                transform: `rotate(${angle}deg) translateY(0)`,
                                animation: `conv-confetti 1.5s ${i * 0.05}s ease-out forwards`,
                            }} />
                        );
                    })}

                    {/* Text */}
                    {clearAnim >= 2 && (
                        <div style={{
                            textAlign: 'center',
                            animation: 'conv-clear-text 0.6s ease-out forwards',
                        }}>
                            <div style={{
                                fontSize: 10, fontWeight: 800, letterSpacing: '0.3em',
                                color: GOLD, marginBottom: 8,
                            }}>
                                BONUS CLEAR
                            </div>
                            <div style={{
                                fontSize: 22, fontWeight: 300, color: '#fff',
                                lineHeight: 1.6,
                            }}>
                                {conversation.titleJa}
                            </div>
                            <div style={{
                                fontSize: 13, color: '#A8A29E', marginTop: 12,
                                lineHeight: 1.8,
                            }}>
                                全部聞いた。自分でも使ってみよう。
                            </div>
                        </div>
                    )}

                    {/* Dismiss hint */}
                    {clearAnim >= 3 && (
                        <div style={{
                            position: 'absolute', bottom: 60,
                            fontSize: 11, color: '#666',
                            animation: 'conv-clear-text 0.4s ease-out forwards',
                        }}>
                            tap to close
                        </div>
                    )}
                </div>
            )}

            {/* Bottom section */}
            {allListened && clearAnim >= 4 && (
                <div style={{
                    padding: '12px 16px',
                    borderTop: `1px solid ${BORDER}`,
                    background: `linear-gradient(135deg, ${GOLD}08, ${GREEN}08)`,
                    textAlign: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Check size={14} color={GREEN} strokeWidth={2.5} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>
                            BONUS CLEAR
                        </span>
                    </div>
                    <div style={{ fontSize: 10, color: '#78716C', marginTop: 4 }}>
                        もう一度聞きたいセリフをタップしてリプレイ
                    </div>
                </div>
            )}
        </div>
    );
}
