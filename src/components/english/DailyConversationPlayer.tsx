'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, Check, ChevronRight, ChevronUp, Play, Square, CircleHelp, Subtitles, Sparkles } from 'lucide-react';
import type { DailyConversation } from '@/data/english/365/daily-conversations';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BORDER = '#E7E5E4';

// ─── Bonus clear praise pool (random, always fresh) ────────
const BONUS_PRAISE = [
    { big: 'NICE', sub: 'ボーナス会話、全部お前の耳通った。地味に効くやつだ。' },
    { big: 'HEARD', sub: 'リアルな会話、脳に流し込み完了。明日の聴き取り、違うぞ。' },
    { big: 'CLEAN', sub: '会話丸ごと聴破！教科書じゃ絶対にこの量、経験できない。' },
    { big: 'WIN', sub: 'ボーナス完走！10フレーズが生きた会話で使われる現場、見たな。' },
    { big: 'SOLID', sub: '会話制覇。単語の暗記じゃない、文脈で吸収したのは強い。' },
    { big: 'GOT IT', sub: '全セリフ聴き終わった。これが「使える英語」への近道。' },
    { big: 'FRESH', sub: 'ボーナス会話コンプ！明日の英語耳、今日より1段上がってる。' },
    { big: 'BRAVO', sub: '会話聴破！この地味な積み重ねが、3ヶ月後に爆発するやつだ。' },
    { big: 'DONE', sub: 'ボーナス終了。真面目に聴いたの、お前の顔見ればわかる。' },
    { big: 'LOCKED', sub: '全部聴いた。今日のフレーズ、記憶に完全ロックオンだ。' },
    { big: 'RAW', sub: 'ボーナス会話クリア！素の聴き取り力、着実に上がってる。' },
    { big: 'NICE', sub: '会話完走！「英語を聴いてる自分」がだんだん普通になってきた。' },
    { big: 'PLUS', sub: 'ボーナス制覇！+1日、お前の英語経験値が積まれた。' },
    { big: 'CLEAR', sub: '全セリフ聴いた！3分で終わるけど、積み上がると化け物になる。' },
    { big: 'GREAT', sub: 'ボーナス完了！これ毎日やる奴、ほぼ絶滅危惧種だ。' },
    { big: 'BOOM', sub: '会話聴破！登場人物の感情まで聴き取れてたら最強。' },
    { big: 'PRO', sub: 'ボーナス終了。お前もう「英語に触れる習慣」持ってる側の人間。' },
    { big: 'OWNED', sub: '全部聴いた！会話の流れ、お前の脳の中でもう再生できるだろ。' },
    { big: 'SWEET', sub: 'ボーナス完走！耳が英語を「情報」として処理し始めてる。' },
    { big: 'TRUE', sub: '会話コンプ！こういう地味なトレーニングが、本物の実力を作る。' },
];

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
    const [praise, setPraise] = useState<typeof BONUS_PRAISE[number]>(() => BONUS_PRAISE[0]);
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
            setPraise(BONUS_PRAISE[Math.floor(Math.random() * BONUS_PRAISE.length)]);
            setClearAnim(1);
            setTimeout(() => setClearAnim(2), 500);
            setTimeout(() => setClearAnim(3), 1300);
            setTimeout(() => setClearAnim(4), 4800);
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

    // Collapsed state — teaser card (impossible to miss)
    if (!expanded) {
        const speakerCount = new Set(conversation.lines.map(l => l.speaker)).size;
        return (
            <div
                onClick={() => setExpanded(true)}
                style={{
                    position: 'relative',
                    borderRadius: 18,
                    cursor: 'pointer',
                    marginTop: 4,
                    background: cleared
                        ? 'linear-gradient(135deg, #FFFBEB 0%, #ECFDF5 100%)'
                        : 'radial-gradient(ellipse at top left, #2a2623 0%, #0f0d0b 70%)',
                    border: cleared ? `2px solid ${GOLD}55` : `2px solid ${GOLD}`,
                    padding: '22px 22px 20px',
                    overflow: 'hidden',
                    boxShadow: cleared
                        ? `0 4px 20px ${GOLD}22`
                        : `0 0 0 1px ${GOLD}30, 0 10px 40px rgba(212,175,55,0.25), 0 4px 16px rgba(0,0,0,0.3)`,
                    animation: cleared ? 'none' : 'conv-teaser-pulse 2.6s ease-in-out infinite',
                    transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <style>{`
                    @keyframes conv-teaser-pulse {
                        0%, 100% { box-shadow: 0 0 0 1px ${GOLD}30, 0 10px 40px rgba(212,175,55,0.25), 0 4px 16px rgba(0,0,0,0.3); }
                        50%      { box-shadow: 0 0 0 2px ${GOLD}60, 0 14px 52px rgba(212,175,55,0.42), 0 6px 22px rgba(0,0,0,0.35); }
                    }
                    @keyframes conv-teaser-sweep {
                        0%   { transform: translateX(-120%) skewX(-20deg); }
                        100% { transform: translateX(220%) skewX(-20deg); }
                    }
                    @keyframes conv-teaser-badge {
                        0%, 100% { transform: scale(1);    opacity: 1; }
                        50%      { transform: scale(1.08); opacity: 0.9; }
                    }
                    @keyframes conv-teaser-arrow {
                        0%, 100% { transform: translateX(0); opacity: 0.7; }
                        50%      { transform: translateX(4px); opacity: 1; }
                    }
                    @keyframes conv-teaser-orb {
                        0%, 100% { transform: scale(1);    opacity: 0.35; }
                        50%      { transform: scale(1.15); opacity: 0.6; }
                    }
                `}</style>

                {/* Ambient golden orb glow — only when not cleared */}
                {!cleared && (
                    <div style={{
                        position: 'absolute',
                        top: -80, right: -80,
                        width: 260, height: 260,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${GOLD}40 0%, ${GOLD}12 40%, transparent 70%)`,
                        filter: 'blur(30px)',
                        animation: 'conv-teaser-orb 3.2s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* Diagonal shimmer sweep */}
                {!cleared && (
                    <div style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0,
                        width: '50%',
                        background: `linear-gradient(90deg, transparent, ${GOLD}22, transparent)`,
                        animation: 'conv-teaser-sweep 3.5s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* +BONUS badge — top right */}
                {!cleared && (
                    <div style={{
                        position: 'absolute',
                        top: 12, right: 12,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: `linear-gradient(135deg, ${GOLD}, #B8941F)`,
                        color: '#1C1917',
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: '0.15em',
                        boxShadow: `0 4px 14px ${GOLD}60`,
                        animation: 'conv-teaser-badge 1.8s ease-in-out infinite',
                        zIndex: 2,
                    }}>
                        + BONUS
                    </div>
                )}

                {/* Main row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
                    {/* Icon */}
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: cleared
                            ? `linear-gradient(135deg, ${GOLD}, ${GREEN})`
                            : `linear-gradient(135deg, ${GOLD}, #B8941F)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: cleared ? 'none' : `0 6px 24px ${GOLD}60, inset 0 2px 6px rgba(255,255,255,0.3)`,
                    }}>
                        {cleared ? (
                            <Check size={28} color="#fff" strokeWidth={3} />
                        ) : (
                            <Sparkles size={26} color="#1C1917" strokeWidth={2.5} />
                        )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            fontSize: 10, fontWeight: 900, letterSpacing: '0.3em',
                            color: cleared ? GREEN : GOLD,
                            marginBottom: 4,
                            textShadow: cleared ? 'none' : `0 0 18px ${GOLD}80`,
                        }}>
                            {cleared ? '★  BONUS CLEAR  ★' : '★  BONUS LISTENING  ★'}
                        </div>
                        <div style={{
                            fontSize: 16, fontWeight: 800,
                            color: cleared ? '#1C1917' : '#fff',
                            lineHeight: 1.35,
                            marginBottom: 4,
                            textShadow: cleared ? 'none' : '0 2px 8px rgba(0,0,0,0.4)',
                        }}>
                            {conversation.titleJa}
                        </div>
                        <div style={{
                            fontSize: 11,
                            color: cleared ? '#78716C' : '#d4c89c',
                            lineHeight: 1.45,
                        }}>
                            {cleared
                                ? 'クリア済み — もう一度聴く'
                                : '今日のフレーズが生きた会話で使われる現場、聴くだけでOK'}
                        </div>
                    </div>
                </div>

                {/* Stats + CTA row */}
                {!cleared && (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 12, marginTop: 14,
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(212,175,55,0.08)',
                        border: `1px solid ${GOLD}30`,
                        position: 'relative', zIndex: 1,
                    }}>
                        <div style={{ display: 'flex', gap: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: GOLD, boxShadow: `0 0 6px ${GOLD}`,
                                }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#e8d48a', letterSpacing: '0.05em' }}>
                                    {totalLines} セリフ
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: GREEN, boxShadow: `0 0 6px ${GREEN}`,
                                }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#e8d48a', letterSpacing: '0.05em' }}>
                                    {speakerCount} キャラ
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: '#F59E0B', boxShadow: '0 0 6px #F59E0B',
                                }} />
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#e8d48a', letterSpacing: '0.05em' }}>
                                    約3分
                                </span>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            fontSize: 10, fontWeight: 800,
                            color: GOLD, letterSpacing: '0.15em',
                            animation: 'conv-teaser-arrow 1.4s ease-in-out infinite',
                        }}>
                            OPEN
                            <ChevronRight size={14} color={GOLD} strokeWidth={3} />
                        </div>
                    </div>
                )}
                {cleared && (
                    <ChevronRight size={20} color={GREEN} strokeWidth={2} style={{
                        position: 'absolute', top: '50%', right: 18,
                        transform: 'translateY(-50%)',
                    }} />
                )}
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
                @keyframes bonusFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes bonusRingExpand {
                    0%   { transform: scale(0.5); opacity: 0; }
                    30%  { opacity: 0.6; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
                @keyframes bonusOrbPulse {
                    0%, 100% { transform: scale(1);    opacity: 0.8; }
                    50%      { transform: scale(1.08); opacity: 1; }
                }
                @keyframes bonusDust {
                    0%   { transform: translateY(0) translateX(0); opacity: 0; }
                    10%  { opacity: 0.85; }
                    90%  { opacity: 0.6; }
                    100% { transform: translateY(-120vh) translateX(var(--drift, 0px)); opacity: 0; }
                }
                @keyframes bonusShimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
                @keyframes bonusRayRotate {
                    0%   { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .bonus-shimmer {
                    background: linear-gradient(
                        90deg,
                        #ffffff 0%,
                        #ffffff 30%,
                        ${GOLD} 50%,
                        #ffffff 70%,
                        #ffffff 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    animation: bonusShimmer 3.5s linear infinite;
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

            {/* ═══ Clear celebration overlay — DailyQuote aesthetic ═══ */}
            {clearAnim > 0 && clearAnim < 4 && (
                <div
                    onClick={clearAnim >= 3 ? () => setClearAnim(4) : undefined}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 10001,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '40px 24px',
                        overflow: 'hidden',
                        background: 'radial-gradient(ellipse at center, #1a1917 0%, #050403 75%)',
                        animation: 'bonusFadeIn 0.5s ease-out',
                        cursor: clearAnim >= 3 ? 'pointer' : 'default',
                        pointerEvents: clearAnim >= 3 ? 'auto' : 'none',
                    }}
                >
                    {/* Rotating light rays */}
                    {clearAnim >= 1 && (
                        <div style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            width: 900, height: 900,
                            background: `conic-gradient(from 0deg, transparent 0deg, ${GOLD}0d 20deg, transparent 40deg, transparent 90deg, ${GOLD}08 110deg, transparent 130deg, transparent 180deg, ${GOLD}0d 200deg, transparent 220deg, transparent 270deg, ${GOLD}08 290deg, transparent 310deg, transparent 360deg)`,
                            filter: 'blur(40px)',
                            opacity: 0.85,
                            animation: 'bonusRayRotate 38s linear infinite',
                            pointerEvents: 'none',
                        }} />
                    )}

                    {/* Ambient gold orb */}
                    <div style={{
                        position: 'absolute',
                        width: 620, height: 620,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${GOLD}22 0%, ${GOLD}08 40%, transparent 70%)`,
                        filter: 'blur(70px)',
                        opacity: clearAnim >= 1 ? 1 : 0,
                        transition: 'opacity 1s ease-out',
                        animation: clearAnim >= 2 ? 'bonusOrbPulse 4s ease-in-out infinite' : 'none',
                        pointerEvents: 'none',
                    }} />

                    {/* Dust particles rising */}
                    {clearAnim >= 1 && Array.from({ length: 28 }, (_, i) => {
                        const left = (i * 37 + 13) % 100;
                        const delay = (i * 0.27) % 4.5;
                        const duration = 7 + ((i * 1.3) % 6);
                        const size = 2 + ((i * 0.7) % 3);
                        const drift = ((i * 17) % 40) - 20;
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                bottom: -10,
                                left: `${left}%`,
                                width: size, height: size,
                                borderRadius: '50%',
                                background: GOLD,
                                boxShadow: `0 0 8px ${GOLD}cc, 0 0 16px ${GOLD}66`,
                                ['--drift' as string]: `${drift}px`,
                                animation: `bonusDust ${duration}s linear ${delay}s infinite`,
                                pointerEvents: 'none',
                            } as React.CSSProperties} />
                        );
                    })}

                    {/* Expanding rings */}
                    {clearAnim >= 1 && Array.from({ length: 2 }, (_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: 340 + i * 100,
                            height: 340 + i * 100,
                            borderRadius: '50%',
                            border: `1px solid ${GOLD}${i === 0 ? '60' : '35'}`,
                            animation: `bonusRingExpand 2.6s cubic-bezier(0.2,0.65,0.3,0.9) ${i * 0.45}s forwards`,
                            pointerEvents: 'none',
                        }} />
                    ))}

                    {/* Content */}
                    <div style={{
                        position: 'relative', zIndex: 1,
                        maxWidth: 560, width: '100%',
                        textAlign: 'center',
                    }}>
                        {/* Tier label */}
                        <div style={{
                            opacity: clearAnim >= 1 ? 1 : 0,
                            transform: clearAnim >= 1 ? 'translateY(0)' : 'translateY(-8px)',
                            transition: 'all 1s cubic-bezier(0.2,0.65,0.3,0.9)',
                            marginBottom: 18,
                        }}>
                            <div style={{
                                fontSize: 10,
                                letterSpacing: '0.5em',
                                color: GOLD,
                                fontWeight: 700,
                                textShadow: `0 0 22px ${GOLD}90`,
                            }}>
                                BONUS LISTENING CLEAR
                            </div>
                        </div>

                        {/* Big shimmering word */}
                        <div style={{
                            opacity: clearAnim >= 2 ? 1 : 0,
                            transform: clearAnim >= 2 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                            transition: 'all 1.2s cubic-bezier(0.2,0.65,0.3,0.9)',
                            marginBottom: 18,
                        }}>
                            <div
                                className={clearAnim >= 3 ? 'bonus-shimmer' : ''}
                                style={{
                                    fontSize: 72,
                                    fontWeight: 200,
                                    color: clearAnim >= 3 ? undefined : '#fff',
                                    lineHeight: 1,
                                    fontFamily: 'Georgia, serif',
                                    letterSpacing: '-0.02em',
                                    textShadow: clearAnim >= 3 ? 'none' : `0 0 40px ${GOLD}80`,
                                }}
                            >
                                {praise.big}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{
                            width: clearAnim >= 3 ? 90 : 0,
                            height: 1,
                            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                            margin: '0 auto 18px',
                            transition: 'width 1s cubic-bezier(0.2,0.65,0.3,0.9)',
                            boxShadow: clearAnim >= 3 ? `0 0 14px ${GOLD}90` : 'none',
                        }} />

                        {/* Conversation title (smaller, below divider) */}
                        <div style={{
                            opacity: clearAnim >= 3 ? 0.85 : 0,
                            transition: 'opacity 1s cubic-bezier(0.2,0.65,0.3,0.9) 0.1s',
                            fontSize: 13,
                            letterSpacing: '0.1em',
                            color: '#d4c89c',
                            fontWeight: 500,
                            marginBottom: 14,
                        }}>
                            「{conversation.titleJa}」
                        </div>

                        {/* Sub praise message */}
                        <div style={{
                            opacity: clearAnim >= 3 ? 0.9 : 0,
                            transform: clearAnim >= 3 ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 1s cubic-bezier(0.2,0.65,0.3,0.9) 0.2s',
                            fontSize: 14,
                            color: '#f0dfa0',
                            lineHeight: 1.7,
                            fontWeight: 400,
                            maxWidth: 460,
                            margin: '0 auto 32px',
                            padding: '0 16px',
                        }}>
                            {praise.sub}
                        </div>

                        {/* Dismiss hint */}
                        <div style={{
                            opacity: clearAnim >= 3 ? 0.5 : 0,
                            transition: 'opacity 0.8s ease-out 0.4s',
                            fontSize: 10,
                            color: '#888',
                            letterSpacing: '0.25em',
                            fontWeight: 600,
                        }}>
                            TAP TO CONTINUE
                        </div>
                    </div>

                    {/* Top accent line */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: 1,
                        background: `linear-gradient(90deg, transparent, ${GREEN}50, transparent)`,
                        opacity: clearAnim >= 1 ? 1 : 0,
                        transition: 'opacity 1s ease-out',
                    }} />
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
