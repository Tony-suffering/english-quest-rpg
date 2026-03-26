'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
    MASTER_EXPRESSIONS,
    MASTER_CATEGORY_META,
    MASTER_LEVELS,
    MASTER_DAY_THEMES,
    MASTER_MONTHS,
    MILESTONES,
    type MasterExpression,
    type KeyWord,
} from '@/data/english/365/master-expressions';
import ReviewCalendar from '@/components/english/ReviewCalendar';
import Link from 'next/link';
import { theJobEntries } from '@/data/english/365-the-job';
import { charIcon } from '@/data/izakaya-toeic/characters';
import { KAIWA_STORIES, type KaiwaStory } from '@/data/english/365/kaiwa-stories';
import { KAIWA_STORIES_2 } from '@/data/english/365/kaiwa-stories-2';
import { KAIWA_STORIES_3 } from '@/data/english/365/kaiwa-stories-3';

const ALL_KAIWA_STORIES = [...KAIWA_STORIES, ...KAIWA_STORIES_2, ...KAIWA_STORIES_3];

// Inject keyframe animation for play button pulse
const KAIWA_STYLES = `
@keyframes pulse-play {
    0%, 100% { box-shadow: 0 0 0 3px rgba(212,175,55,0.3); }
    50% { box-shadow: 0 0 0 6px rgba(212,175,55,0.1); }
}
`;

// ── Types ──

interface KaiwaEntry {
    id: string;
    day_slot: number;
    japanese: string;
    english: [string, string, string, string];
    context: string;
    character: string;
    category: string;
    mastery: number; // 0 = not learned, 3 = learned
}

// ── Character Display ──

const CHARACTER_META: Record<string, { name: string; nameJa: string; color: string }> = {
    yuki:    { name: 'Yuki',    nameJa: 'ユキ',       color: '#D4AF37' },
    master:  { name: 'Master',  nameJa: 'マスター',   color: '#78716C' },
    takeshi: { name: 'Takeshi', nameJa: 'タケシ',     color: '#3B82F6' },
    lisa:    { name: 'Lisa',    nameJa: 'リサ',       color: '#EC4899' },
    kenji:   { name: 'Kenji',   nameJa: 'ケンジ',     color: '#92400E' },
    mina:    { name: 'Mina',    nameJa: 'ミナ',       color: '#8B5CF6' },
};

// ── Story Viewer ──

function StoryLine({ line, index, isActive, showEn, onClick }: {
    line: KaiwaStory['story'][number]; index: number; isActive: boolean; showEn: boolean; onClick: () => void;
}) {
    const isNarration = line.speaker === 'narration';
    const char = !isNarration ? CHARACTER_META[line.speaker] : null;

    if (isNarration) {
        return (
            <div style={{ padding: '8px 16px', textAlign: 'center' }}>
                {line.action && (
                    <div style={{ fontSize: 10, color: '#A8A29E', fontStyle: 'italic', marginBottom: 2 }}>
                        {line.action}
                    </div>
                )}
                <div style={{ fontSize: 12, color: '#78716C', fontStyle: 'italic' }}>
                    {line.japanese}
                </div>
                {showEn && line.english && (
                    <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 2 }}>
                        {line.english}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex', gap: 8, padding: '6px 14px',
                background: isActive ? `${char?.color || '#D4AF37'}08` : 'transparent',
                borderLeft: isActive ? `3px solid ${char?.color || '#D4AF37'}` : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.1s',
                alignItems: 'flex-start',
            }}
        >
            <img
                src={charIcon(line.speaker)}
                alt={char?.nameJa || line.speaker}
                style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: `2px solid ${char?.color || '#D6D3D1'}`,
                    objectFit: 'cover', flexShrink: 0, marginTop: 2,
                }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: char?.color || '#78716C' }}>
                        {char?.nameJa || line.speaker}
                    </span>
                    {line.mood && line.mood !== 'normal' && (
                        <span style={{ fontSize: 9, color: '#A8A29E' }}>({line.mood})</span>
                    )}
                </div>
                {line.action && (
                    <div style={{ fontSize: 10, color: '#A8A29E', fontStyle: 'italic', marginBottom: 2 }}>
                        {line.action}
                    </div>
                )}
                <div style={{
                    fontSize: 13, color: '#1C1917', lineHeight: 1.6,
                    fontWeight: isActive ? 600 : 400,
                }}>
                    {line.japanese}
                </div>
                {showEn && line.english && (
                    <div style={{ fontSize: 12, color: '#78716C', marginTop: 2, lineHeight: 1.5 }}>
                        {line.english}
                    </div>
                )}
            </div>
        </div>
    );
}

const PREVIEW_LINES = 3;

function StoryViewer({ story }: { story: KaiwaStory }) {
    const [expanded, setExpanded] = useState(false);
    const [showEn, setShowEn] = useState(false);
    const [currentLine, setCurrentLine] = useState(-1);

    const speakLine = useCallback((text: string, speaker: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = 0.9;
        const voices = window.speechSynthesis.getVoices();
        const enVoices = voices.filter(v => v.lang.startsWith('en'));
        const isFemale = ['yuki', 'lisa', 'mina'].includes(speaker);
        if (isFemale) {
            const fem = enVoices.find(v => /female|zira|samantha/i.test(v.name));
            if (fem) utter.voice = fem;
            utter.pitch = 1.1;
        } else {
            const mal = enVoices.find(v => /male|david|daniel/i.test(v.name) && !/female/i.test(v.name));
            if (mal) utter.voice = mal;
            utter.pitch = 0.95;
        }
        window.speechSynthesis.speak(utter);
    }, []);

    // Filter to dialogue lines only for preview (skip narration)
    const dialogueLines = story.story.filter(l => l.speaker !== 'narration');
    const previewLines = story.story.slice(0, Math.max(PREVIEW_LINES, story.story.findIndex((l, i) => i >= PREVIEW_LINES && l.speaker !== 'narration') || PREVIEW_LINES + 1));
    const remainingLines = story.story.slice(previewLines.length);
    const hasMore = remainingLines.length > 0;

    return (
        <div style={{
            marginTop: 12,
            border: '1px solid #FDE68A', borderRadius: 12,
            background: '#FFFBEB', overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '10px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #FDE68A40',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 11, fontWeight: 800, color: '#92400E',
                        background: '#FDE68A', padding: '2px 8px', borderRadius: 4,
                    }}>STORY</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#44403C' }}>
                        {story.title}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button onClick={() => setShowEn(!showEn)} style={{
                        padding: '3px 8px', fontSize: 9, fontWeight: 700,
                        background: showEn ? '#D4AF3715' : '#fff',
                        border: `1px solid ${showEn ? '#D4AF37' : '#D6D3D1'}`,
                        borderRadius: 4, cursor: 'pointer',
                        color: showEn ? '#D4AF37' : '#78716C',
                    }}>
                        {showEn ? 'EN' : 'JA'}
                    </button>
                    <span style={{ fontSize: 10, color: '#A8A29E' }}>
                        {dialogueLines.length} lines
                    </span>
                </div>
            </div>

            {/* Preview lines (always visible) */}
            <div style={{ padding: '8px 0' }}>
                {previewLines.map((line, i) => (
                    <StoryLine
                        key={i}
                        line={line}
                        index={i}
                        isActive={i === currentLine}
                        showEn={showEn}
                        onClick={() => {
                            setCurrentLine(i);
                            if (line.english && line.speaker !== 'narration') speakLine(line.english, line.speaker);
                        }}
                    />
                ))}
            </div>

            {/* Expand/collapse for remaining lines */}
            {hasMore && (
                <>
                    {expanded && (
                        <div style={{
                            padding: '0 0 8px',
                            maxHeight: 350, overflowY: 'auto',
                        }}>
                            {remainingLines.map((line, i) => (
                                <StoryLine
                                    key={previewLines.length + i}
                                    line={line}
                                    index={previewLines.length + i}
                                    isActive={previewLines.length + i === currentLine}
                                    showEn={showEn}
                                    onClick={() => {
                                        const idx = previewLines.length + i;
                                        setCurrentLine(idx);
                                        if (line.english && line.speaker !== 'narration') speakLine(line.english, line.speaker);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={{
                            width: '100%', padding: '8px 16px',
                            background: expanded ? '#FDE68A20' : 'linear-gradient(to bottom, transparent, #FDE68A30)',
                            border: 'none', borderTop: '1px solid #FDE68A30',
                            cursor: 'pointer', fontSize: 11, fontWeight: 700,
                            color: '#92400E', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}
                    >
                        {expanded ? 'Close' : `Read full story (${remainingLines.length} more)`}
                        <span style={{
                            display: 'inline-block',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                        }}>v</span>
                    </button>
                </>
            )}
        </div>
    );
}

// ── Persistence ──

const MASTERY_KEY = 'master-365-mastery';
const STREAK_KEY = 'master-365-streak';

function loadMastery(): Record<string, number> {
    try {
        const saved = localStorage.getItem(MASTERY_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
}

function saveMastery(m: Record<string, number>) {
    try { localStorage.setItem(MASTERY_KEY, JSON.stringify(m)); } catch { /* */ }
}

// ── Streak ──

interface StreakData {
    current: number;
    lastDate: string; // YYYY-MM-DD
    best: number;
}

function getTodayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadStreak(): StreakData {
    try {
        const saved = localStorage.getItem(STREAK_KEY);
        if (!saved) return { current: 0, lastDate: '', best: 0 };
        return JSON.parse(saved);
    } catch { return { current: 0, lastDate: '', best: 0 }; }
}

function recordStreak(): StreakData {
    const today = getTodayStr();
    const streak = loadStreak();
    if (streak.lastDate === today) return streak; // already recorded today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    let newCurrent = 1;
    if (streak.lastDate === yesterdayStr) {
        newCurrent = streak.current + 1;
    }
    const newBest = Math.max(streak.best, newCurrent);
    const updated = { current: newCurrent, lastDate: today, best: newBest };
    try { localStorage.setItem(STREAK_KEY, JSON.stringify(updated)); } catch { /* */ }
    return updated;
}

// ── Daily motivational messages ──

const DAILY_MESSAGES = [
    'Every phrase is a step forward.',
    'Consistency beats intensity.',
    'Small daily progress compounds.',
    'Your future self will thank you.',
    'One day at a time, one phrase at a time.',
    'The best time to start was yesterday. The next best time is now.',
    'Fluency is built in minutes, not hours.',
];

// ── Build entries ──

function buildEntries(monthKey: string): KaiwaEntry[] {
    const counters: Record<number, number> = {};
    return MASTER_EXPRESSIONS
        .filter(e => e.month === monthKey)
        .map(seed => {
            const idx = counters[seed.daySlot] || 0;
            counters[seed.daySlot] = idx + 1;
            return {
                id: `m365_d${String(seed.daySlot).padStart(2, '0')}_${idx}`,
                day_slot: seed.daySlot,
                japanese: seed.japanese,
                english: seed.english,
                context: seed.context,
                character: seed.character,
                category: seed.category,
                mastery: 0,
            };
        });
}

function getMonthKey(year: number, month: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}`;
}

// ── Component ──

export default function EnglishMaster365Page() {
    const now = new Date();
    const [viewYear, setViewYear] = useState(2026);
    const [viewMonth, setViewMonth] = useState(3); // April = index 3
    const [entries, setEntries] = useState<KaiwaEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
    const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
    const [globalLevel, setGlobalLevel] = useState<number>(-1); // default to BUILD-UP view
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
    const [autoPlaying, setAutoPlaying] = useState(false);
    const [autoPlayIdx, setAutoPlayIdx] = useState(-1);
    const autoPlayRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    // 仕込み帳 registration (individual, not batch)
    const [registeredPhrases, setRegisteredPhrases] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);

    // Streak state
    const [streak, setStreak] = useState<StreakData>({ current: 0, lastDate: '', best: 0 });

    // Guide panel state (persisted in localStorage)
    const [showGuide, setShowGuide] = useState(false);
    useEffect(() => {
        const saved = localStorage.getItem('kaiwa-guide-open');
        if (saved === 'true') setShowGuide(true);
    }, []);
    const toggleGuide = useCallback(() => {
        setShowGuide(prev => {
            const next = !prev;
            localStorage.setItem('kaiwa-guide-open', String(next));
            return next;
        });
    }, []);

    const monthKey = getMonthKey(viewYear, viewMonth);

    // ── Day slot offset ──
    // Month 1 (April): daySlots 1-30, offset=0
    // Month 2 (May): daySlots 31-60, offset=30
    const monthMeta = MASTER_MONTHS.find(m => m.key === monthKey);
    const daySlotOffset = useMemo(() => {
        const meta = MASTER_MONTHS.find(m => m.key === monthKey);
        if (!meta) return 0;
        // Sum up days from all previous months
        let offset = 0;
        for (const m of MASTER_MONTHS) {
            if (m.month >= meta.month) break;
            // Month 1 = 30 days (April), Month 2 = 31 days (May), etc.
            const daysInMonthN = m.month === 1 ? 30 : 31;
            offset += daysInMonthN;
        }
        return offset;
    }, [monthKey]);

    // ── Init ──

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        synthRef.current = window.speechSynthesis;
        setStreak(recordStreak());
        return () => window.removeEventListener('resize', handler);
    }, []);

    useEffect(() => {
        const all = buildEntries(monthKey);
        const mastery = loadMastery();
        const mSet = new Set<string>();
        const updated = all.map(e => {
            const m = mastery[e.id] || 0;
            if (m === 3) mSet.add(e.id);
            return { ...e, mastery: m };
        });
        setEntries(updated);
        setMasteredIds(mSet);
        setLoading(false);

        // Auto-select first day with content
        const daysWithContent = [...new Set(updated.map(e => e.day_slot))].sort((a, b) => a - b);
        if (daysWithContent.length > 0) {
            const todayDate = now.getDate();
            const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
            // Convert today's calendar date to daySlot for this month
            const todayDaySlot = todayDate + daySlotOffset;
            if (isCurrentMonth && daysWithContent.includes(todayDaySlot)) {
                setSelectedDay(todayDaySlot);
            } else {
                setSelectedDay(daysWithContent[0]);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthKey, daySlotOffset]);

    // Fetch registered phrases
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/phrases');
                if (res.ok) {
                    const data = await res.json();
                    const set = new Set<string>();
                    (data.phrases || []).forEach((p: { english: string }) => set.add(p.english.toLowerCase()));
                    setRegisteredPhrases(set);
                }
            } catch { /* */ }
        })();
    }, []);

    // ── Derived ──

    const dayEntries = useMemo(() => {
        let filtered = entries.filter(e => e.day_slot === selectedDay);
        if (categoryFilter) filtered = filtered.filter(e => e.category === categoryFilter);
        return filtered;
    }, [entries, selectedDay, categoryFilter]);

    const calendarEntries = useMemo(() =>
        entries.map(e => ({ id: e.id, day_slot: e.day_slot - daySlotOffset, japanese: e.japanese, category: e.category })),
    [entries, daySlotOffset]);

    const calendarCategoryColors = useMemo(() => {
        const map: Record<string, { fg: string; bg: string }> = {};
        Object.entries(MASTER_CATEGORY_META).forEach(([k, v]) => {
            map[k] = { fg: v.color, bg: v.bg };
        });
        return map;
    }, []);

    const totalMastered = masteredIds.size;
    const totalExpressions = entries.length;
    const currentMilestone = [...MILESTONES].reverse().find(m => totalMastered >= m.threshold);
    const nextMilestone = MILESTONES.find(m => totalMastered < m.threshold);

    const dayTheme = selectedDay ? MASTER_DAY_THEMES[selectedDay] : null;

    // ── Actions ──

    const toggleMastery = useCallback((id: string) => {
        setEntries(prev => {
            const mastery = loadMastery();
            const updated = prev.map(e => {
                if (e.id !== id) return e;
                const newM = e.mastery === 3 ? 0 : 3;
                mastery[e.id] = newM;
                return { ...e, mastery: newM };
            });
            saveMastery(mastery);
            const mSet = new Set<string>();
            updated.forEach(e => { if (e.mastery === 3) mSet.add(e.id); });
            setMasteredIds(mSet);
            return updated;
        });
    }, []);

    const playTTS = useCallback((entry: KaiwaEntry) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();

        if (playingId === entry.id) {
            setPlayingId(null);
            return;
        }

        setPlayingId(entry.id);
        const lvlIdx = globalLevel === -1 ? 1 : globalLevel; // BUILD-UP mode defaults to Vibe
        const text = entry.english[lvlIdx];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;

        const voices = synthRef.current.getVoices();
        const preferred = voices.find(v => v.name.includes('Samantha')) || voices.find(v => v.lang.startsWith('en'));
        if (preferred) utterance.voice = preferred;

        utterance.onend = () => {
            setPlayingId(null);
            setPlayedIds(prev => {
                const next = new Set(prev);
                next.add(entry.id);
                return next;
            });
        };
        utterance.onerror = () => setPlayingId(null);
        synthRef.current.speak(utterance);
    }, [playingId, globalLevel]);

    // Register one level of expression to 仕込み帳
    // Uses current view level: Core(0)/Vibe(1)/Scene(2)/Flow(3). BUILD-UP/QUIZ default to Vibe(1).
    const registerPhrase = useCallback(async (entry: KaiwaEntry) => {
        const lvlIdx = globalLevel >= 0 && globalLevel <= 3 ? globalLevel : 1;
        const english = entry.english[lvlIdx];
        setRegisteringId(entry.id);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english,
                    japanese: entry.japanese,
                    category: '365-master',
                    date: new Date().toISOString().slice(0, 10),
                }),
            });
            if (res.ok) {
                setRegisteredPhrases(prev => {
                    const next = new Set(prev);
                    next.add(english.toLowerCase());
                    return next;
                });
            }
        } catch { /* */ }
        setRegisteringId(null);
    }, [globalLevel]);

    // ── Month Nav (constrained to months with content) ──

    const prevMonth = useCallback(() => {
        setViewMonth(m => {
            const newM = m === 0 ? 11 : m - 1;
            const newY = m === 0 ? viewYear - 1 : viewYear;
            const newKey = `${newY}-${String(newM + 1).padStart(2, '0')}`;
            if (!MASTER_MONTHS.some(mm => mm.key === newKey)) return m;
            if (m === 0) setViewYear(y => y - 1);
            return newM;
        });
    }, [viewYear]);

    const nextMonth = useCallback(() => {
        setViewMonth(m => {
            const newM = m === 11 ? 0 : m + 1;
            const newY = m === 11 ? viewYear + 1 : viewYear;
            const newKey = `${newY}-${String(newM + 1).padStart(2, '0')}`;
            if (!MASTER_MONTHS.some(mm => mm.key === newKey)) return m;
            if (m === 11) setViewYear(y => y + 1);
            return newM;
        });
    }, [viewYear]);

    const goToday = useCallback(() => {
        setViewYear(2026);
        setViewMonth(3);
    }, []);

    // ── AutoPlay ──

    const stopAutoPlay = useCallback(() => {
        autoPlayRef.current = false;
        setAutoPlaying(false);
        setAutoPlayIdx(-1);
        if (synthRef.current) synthRef.current.cancel();
    }, []);

    const startAutoPlay = useCallback(() => {
        if (!synthRef.current || dayEntries.length === 0) return;
        autoPlayRef.current = true;
        setAutoPlaying(true);
        setAutoPlayIdx(0);

        const playEntry = (idx: number) => {
            if (!autoPlayRef.current || idx >= dayEntries.length) {
                autoPlayRef.current = false;
                setAutoPlaying(false);
                setAutoPlayIdx(-1);
                return;
            }
            setAutoPlayIdx(idx);
            const entry = dayEntries[idx];
            const synth = synthRef.current!;

            // 1. Speak Japanese
            const jaUtter = new SpeechSynthesisUtterance(entry.japanese);
            jaUtter.lang = 'ja-JP';
            jaUtter.rate = 0.95;

            jaUtter.onend = () => {
                if (!autoPlayRef.current) return;
                // 2. Pause 1.2s then speak English (Vibe level)
                setTimeout(() => {
                    if (!autoPlayRef.current) return;
                    const enUtter = new SpeechSynthesisUtterance(entry.english[1]);
                    enUtter.lang = 'en-US';
                    enUtter.rate = 0.85;
                    const voices = synth.getVoices();
                    const preferred = voices.find(v => v.name.includes('Samantha')) || voices.find(v => v.lang.startsWith('en'));
                    if (preferred) enUtter.voice = preferred;

                    enUtter.onend = () => {
                        if (!autoPlayRef.current) return;
                        // 3. Pause 2s then next
                        setTimeout(() => playEntry(idx + 1), 2000);
                    };
                    enUtter.onerror = () => {
                        if (autoPlayRef.current) setTimeout(() => playEntry(idx + 1), 1000);
                    };
                    synth.speak(enUtter);
                }, 1200);
            };
            jaUtter.onerror = () => {
                if (autoPlayRef.current) setTimeout(() => playEntry(idx + 1), 1000);
            };
            synth.cancel();
            synth.speak(jaUtter);
        };

        playEntry(0);
    }, [dayEntries]);

    // ── Keyboard nav for QUIZ mode ──

    const [focusIdx, setFocusIdx] = useState(0);

    useEffect(() => {
        if (globalLevel !== -2) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                setFocusIdx(prev => Math.min(prev + 1, dayEntries.length - 1));
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                setFocusIdx(prev => Math.max(prev - 1, 0));
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const entry = dayEntries[focusIdx];
                if (entry && !revealedIds.has(entry.id)) {
                    setRevealedIds(prev => {
                        const next = new Set(prev);
                        next.add(entry.id);
                        return next;
                    });
                }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [globalLevel, dayEntries, focusIdx, revealedIds]);

    // Reset focus when switching days or mode
    useEffect(() => {
        setFocusIdx(0);
    }, [selectedDay, globalLevel]);

    // Scroll focused card into view
    useEffect(() => {
        if (globalLevel !== -2) return;
        const el = document.getElementById(`kaiwa-card-${focusIdx}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [focusIdx, globalLevel]);

    // ── Loading ──

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#A8A29E', fontSize: 14 }}>Loading...</span>
            </div>
        );
    }

    // ── Render ──

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9' }}>
            <style dangerouslySetInnerHTML={{ __html: KAIWA_STYLES }} />

            {/* ── Header ── */}
            <div style={{
                background: '#fff',
                borderBottom: '1px solid #E7E5E4',
                padding: isMobile ? '20px 16px 16px' : '28px 32px 20px',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                                background: '#D4AF37', color: '#fff',
                                padding: '3px 10px', borderRadius: 4,
                                fontSize: 11, fontWeight: 800, letterSpacing: '0.05em',
                            }}>365</span>
                            <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>
                                English Master Course
                            </span>
                        </div>
                        {/* Streak badge */}
                        {streak.current > 0 && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: streak.current >= 7 ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' : '#FEF9E7',
                                border: `1px solid ${streak.current >= 7 ? '#D4AF37' : '#FDE68A'}`,
                                padding: '4px 12px', borderRadius: 20,
                            }}>
                                <span style={{ fontSize: 14, fontWeight: 900, color: '#D4AF37' }}>
                                    {streak.current}
                                </span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#92400E' }}>
                                    {streak.current === 1 ? 'day' : 'days'}
                                </span>
                                {streak.current >= 3 && (
                                    <span style={{
                                        fontSize: 9, fontWeight: 800, color: '#D4AF37',
                                        background: '#fff', padding: '1px 6px', borderRadius: 4,
                                    }}>
                                        STREAK
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    <h1 style={{
                        fontSize: isMobile ? 22 : 26, fontWeight: 900,
                        color: '#1C1917', margin: '0 0 6px', letterSpacing: '-0.02em',
                    }}>
                        英会話マスター365
                    </h1>
                    <p style={{ fontSize: 14, color: '#57534E', margin: '0 0 4px', lineHeight: 1.6 }}>
                        毎日10フレーズ。ストーリーで覚える。1年で英語が話せるようになる。
                    </p>
                    {monthMeta && (
                        <p style={{ fontSize: 12, color: '#A8A29E', margin: '0 0 12px', fontWeight: 600 }}>
                            {monthMeta.title} / {monthMeta.titleEn}
                        </p>
                    )}

                    {/* 4-Level Demo */}
                    <div style={{ marginBottom: 12 }}>
                        <button
                            onClick={toggleGuide}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                fontSize: 13, fontWeight: 700, color: '#D4AF37',
                                background: 'rgba(212,175,55,0.06)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                padding: '7px 14px', borderRadius: showGuide ? '8px 8px 0 0' : 8,
                                cursor: 'pointer', transition: 'all 0.15s',
                            }}
                        >
                            <span style={{
                                display: 'inline-block', fontSize: 12, fontWeight: 800,
                                transform: showGuide ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                            }}>&#9654;</span>
                            4段階メソッドとは？
                        </button>
                        {showGuide && (
                            <div style={{
                                background: '#FFFBEB',
                                border: '1px solid rgba(212,175,55,0.2)',
                                borderTop: 'none',
                                borderRadius: '0 8px 8px 8px',
                                padding: isMobile ? '14px 16px' : '16px 20px',
                            }}>
                                <p style={{ fontSize: 13, color: '#44403C', margin: '0 0 12px', lineHeight: 1.6 }}>
                                    同じ日本語を<strong style={{ color: '#1C1917' }}>4段階の英語</strong>で分解。
                                    ネイティブが頭の中で文を組み立てるプロセスを体験できる。
                                </p>

                                {/* Interactive Demo */}
                                <div style={{
                                    background: '#fff', borderRadius: 10,
                                    border: '1px solid #E7E5E4', overflow: 'hidden', marginBottom: 12,
                                }}>
                                    <div style={{
                                        padding: '10px 14px', borderBottom: '1px solid #F5F5F4',
                                        background: '#FAFAF9',
                                    }}>
                                        <span style={{ fontSize: 15, fontWeight: 700, color: '#1C1917' }}>
                                            今日めっちゃ疲れた
                                        </span>
                                    </div>
                                    {[
                                        { label: 'CORE', ja: '核', text: "I'm tired.", desc: '骨格だけ', color: '#78716C' },
                                        { label: 'VIBE', ja: '空気', text: "I'm so exhausted today.", desc: '感情を乗せる', color: '#D4AF37' },
                                        { label: 'SCENE', ja: '場面', text: "I'm absolutely wiped out from work today.", desc: '場面で使える一言', color: '#10B981' },
                                        { label: 'FLOW', ja: '流れ', text: "You know when you just hit that wall? Yeah, that's me right now.", desc: 'ネイティブの脳内', color: '#3B82F6' },
                                    ].map((lvl, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '8px 14px',
                                            borderLeft: `3px solid ${lvl.color}`,
                                            borderBottom: i < 3 ? '1px solid #F5F5F4' : 'none',
                                            background: i === 3 ? `${lvl.color}06` : '#fff',
                                        }}>
                                            <div style={{ flexShrink: 0, width: 44, paddingTop: 2 }}>
                                                <div style={{ fontSize: 9, fontWeight: 800, color: lvl.color, letterSpacing: '0.05em' }}>
                                                    {lvl.label}
                                                </div>
                                                <div style={{ fontSize: 8, color: '#A8A29E' }}>{lvl.ja}</div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    fontSize: i === 2 ? 14 : 13,
                                                    fontWeight: i === 2 ? 600 : 400,
                                                    color: i === 0 ? '#A8A29E' : '#1C1917',
                                                    lineHeight: 1.5,
                                                    fontStyle: i === 3 ? 'italic' : 'normal',
                                                }}>
                                                    {lvl.text}
                                                </div>
                                                <div style={{ fontSize: 10, color: '#A8A29E', marginTop: 2 }}>
                                                    {lvl.desc}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p style={{ fontSize: 12, color: '#78716C', margin: '0 0 8px', lineHeight: 1.6 }}>
                                    Core → Vibe → Scene → Flow。段階を上がるごとに、
                                    ネイティブの自然な表現に近づいていく。
                                    このプロセスを毎日10フレーズ体験する。
                                </p>
                                <Link href="/english/izakaya-toeic/kaiwa/lp" style={{
                                    fontSize: 12, fontWeight: 600, color: '#D4AF37', textDecoration: 'none',
                                }}>
                                    詳しく見る {'->'}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Progress + Milestones */}
                    <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        {/* Progress bar */}
                        <div style={{ flex: 1, minWidth: 160 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37' }}>
                                    {totalMastered}/{totalExpressions} マスター済
                                </span>
                                {nextMilestone && (
                                    <span style={{ fontSize: 10, color: '#A8A29E' }}>
                                        Next: {nextMilestone.title} ({nextMilestone.threshold})
                                    </span>
                                )}
                            </div>
                            <div style={{
                                height: 6, borderRadius: 3, background: '#EEECE7', overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '100%', borderRadius: 3,
                                    background: 'linear-gradient(90deg, #D4AF37, #B45309)',
                                    width: `${totalExpressions > 0 ? (totalMastered / totalExpressions) * 100 : 0}%`,
                                    transition: 'width 0.5s ease',
                                }} />
                            </div>
                        </div>

                        {/* Milestone badges */}
                        <div style={{ display: 'flex', gap: 6 }}>
                            {MILESTONES.map(m => {
                                const achieved = totalMastered >= m.threshold;
                                return (
                                    <div key={m.id} title={`${m.title}: ${m.description}`} style={{
                                        width: 32, height: 32, borderRadius: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 10, fontWeight: 800,
                                        color: achieved ? '#fff' : '#D6D3D1',
                                        background: achieved ? '#D4AF37' : '#F5F5F4',
                                        border: achieved ? 'none' : '1px solid #E7E5E4',
                                        transition: 'all 0.3s',
                                    }}>
                                        {m.icon}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Layout ── */}
            <div style={{
                maxWidth: 1200, margin: '0 auto',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                minHeight: 'calc(100vh - 180px)',
            }}>

                {/* Left: Calendar */}
                <div style={{
                    width: isMobile ? '100%' : 340,
                    flexShrink: 0,
                    borderRight: isMobile ? 'none' : '1px solid #E7E5E4',
                    background: '#fff',
                }}>
                    <ReviewCalendar
                        title={`365 -- Month ${monthMeta?.month || 1}`}
                        subtitle={monthMeta?.title || ''}
                        accent="#D4AF37"
                        accentBg="#FEF9E7"
                        entries={calendarEntries}
                        categoryColors={calendarCategoryColors}
                        selectedDay={selectedDay !== null ? selectedDay - daySlotOffset : null}
                        onSelectDay={(d) => { setSelectedDay(d + daySlotOffset); setCategoryFilter(null); setExpandedId(null); }}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        onPrevMonth={prevMonth}
                        onNextMonth={nextMonth}
                        onGoToday={goToday}
                        storagePrefix="master-365"
                        playedIds={playedIds}
                        masteredIds={masteredIds}
                        isMobile={isMobile}
                    />
                </div>

                {/* Right: Detail Panel */}
                <div ref={detailRef} style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: isMobile ? '16px' : '24px 32px',
                    minWidth: 0,
                }}>
                    {selectedDay && dayTheme ? (
                        <>
                            {/* Yesterday review prompt */}
                            {(() => {
                                const todayDate = now.getDate();
                                const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
                                const todayDaySlot = todayDate + daySlotOffset;
                                const isToday = isCurrentMonth && selectedDay === todayDaySlot;
                                if (!isToday) return null;

                                const yesterdaySlot = todayDaySlot - 1;
                                const yesterdayEntries = entries.filter(e => e.day_slot === yesterdaySlot);
                                const yesterdayUnmastered = yesterdayEntries.filter(e => e.mastery !== 3).length;
                                if (yesterdayUnmastered === 0 || yesterdayEntries.length === 0) return null;
                                const yesterdayTheme = MASTER_DAY_THEMES[yesterdaySlot];

                                return (
                                    <button
                                        onClick={() => { setSelectedDay(yesterdaySlot); setCategoryFilter(null); setExpandedId(null); }}
                                        style={{
                                            width: '100%', marginBottom: 12,
                                            padding: '10px 16px',
                                            background: '#FFF7ED',
                                            border: '1px solid #FED7AA',
                                            borderRadius: 10,
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{
                                                fontSize: 10, fontWeight: 800, color: '#C2410C',
                                                background: '#FED7AA', padding: '2px 8px', borderRadius: 4,
                                            }}>REVIEW</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#44403C' }}>
                                                Day {yesterdaySlot}{yesterdayTheme ? ` -- ${yesterdayTheme.title}` : ''}
                                            </span>
                                            <span style={{ fontSize: 11, color: '#C2410C', fontWeight: 700 }}>
                                                {yesterdayUnmastered} remaining
                                            </span>
                                        </div>
                                        <span style={{ fontSize: 12, color: '#C2410C' }}>{'>'}</span>
                                    </button>
                                );
                            })()}

                            {/* Day Header - Hero */}
                            <div style={{ marginBottom: 20 }}>
                                {/* Today badge */}
                                {(() => {
                                    const todayDate = now.getDate();
                                    const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
                                    const todayDaySlot = todayDate + daySlotOffset;
                                    const isToday = isCurrentMonth && selectedDay === todayDaySlot;
                                    const dayMastered = dayEntries.filter(e => e.mastery === 3).length;
                                    const dayTotal = dayEntries.length;

                                    return (
                                        <>
                                            {isToday && (
                                                <div style={{
                                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #ECFDF5 100%)',
                                                    border: '1px solid #FDE68A',
                                                    borderRadius: 12, padding: isMobile ? '14px 16px' : '16px 20px',
                                                    marginBottom: 16,
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                                        <span style={{
                                                            fontSize: 11, fontWeight: 800, color: '#92400E',
                                                            background: '#FDE68A', padding: '3px 10px', borderRadius: 4,
                                                            letterSpacing: '0.05em',
                                                        }}>TODAY</span>
                                                        {dayMastered === dayTotal && dayTotal > 0 ? (
                                                            <span style={{ fontSize: 11, fontWeight: 800, color: '#059669' }}>
                                                                COMPLETE
                                                            </span>
                                                        ) : (
                                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#78716C' }}>
                                                                {dayMastered}/{dayTotal}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{ fontSize: 12, color: '#57534E', fontStyle: 'italic', lineHeight: 1.5 }}>
                                                        {DAILY_MESSAGES[now.getDate() % DAILY_MESSAGES.length]}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{
                                            fontSize: 28, fontWeight: 900, color: '#1C1917',
                                            lineHeight: 1,
                                        }}>
                                            Day {selectedDay}
                                        </span>
                                        <span style={{
                                            fontSize: 12, fontWeight: 700,
                                            color: MASTER_CATEGORY_META[dayTheme.category]?.color || '#78716C',
                                            background: MASTER_CATEGORY_META[dayTheme.category]?.bg || '#F5F5F4',
                                            padding: '3px 10px', borderRadius: 6,
                                        }}>
                                            {MASTER_CATEGORY_META[dayTheme.category]?.label || dayTheme.category}
                                        </span>
                                    </div>
                                    {/* AutoPlay button */}
                                    <button
                                        onClick={autoPlaying ? stopAutoPlay : startAutoPlay}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            border: 'none', borderRadius: 20,
                                            background: autoPlaying ? '#1C1917' : 'linear-gradient(135deg, #D4AF37, #B45309)',
                                            color: '#fff',
                                            padding: '6px 14px', fontSize: 11, fontWeight: 700,
                                            cursor: 'pointer',
                                            boxShadow: autoPlaying ? '0 0 0 3px rgba(212,175,55,0.3)' : 'none',
                                            animation: autoPlaying ? 'pulse-play 1.5s ease infinite' : 'none',
                                            transition: 'all 0.2s',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        <span style={{ fontSize: 10 }}>{autoPlaying ? '\u25A0' : '\u25B6'}</span>
                                        {autoPlaying ? `${autoPlayIdx + 1}/${dayEntries.length}` : 'AUTO PLAY'}
                                    </button>
                                </div>
                                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1C1917', margin: '0 0 4px' }}>
                                    {dayTheme.title}
                                </h2>
                                <p style={{ fontSize: 13, color: '#78716C', margin: 0 }}>
                                    {dayTheme.scene}
                                </p>

                                {/* Story Intro */}
                                {(() => {
                                    const story = ALL_KAIWA_STORIES.find(s => s.daySlot === selectedDay);
                                    if (!story) return null;
                                    return (
                                        <StoryViewer story={story} />
                                    );
                                })()}

                                {/* Memoria (Main Content) */}
                                {selectedDay && selectedDay <= theJobEntries.length && (() => {
                                    const jobEntry = theJobEntries[selectedDay - 1];
                                    const SPEAKER_TO_CHAR: Record<string, string> = { Yuki: 'yuki', Gondo: 'master', 'Master Gondo': 'master', Takeshi: 'takeshi', Lisa: 'lisa', Kenji: 'kenji', Mina: 'mina' };
                                    const dayChars: string[] = [];
                                    if (jobEntry?.conversation?.english) {
                                        for (const line of jobEntry.conversation.english) {
                                            const m = line.text.match(/^([A-Z][a-zA-Z ]{0,20}):/);
                                            if (m) {
                                                const charId = SPEAKER_TO_CHAR[m[1].trim()];
                                                if (charId && !dayChars.includes(charId)) dayChars.push(charId);
                                            }
                                        }
                                    }
                                    return (
                                    <Link href={`/memoria/365-ep01-day${selectedDay}`} style={{ textDecoration: 'none' }}>
                                        <div style={{
                                            marginTop: 12, padding: '14px 16px',
                                            background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
                                            border: '1px solid #FDE68A', borderRadius: 10,
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            cursor: 'pointer', transition: 'all 0.15s',
                                        }}>
                                            <span style={{
                                                fontSize: 11, fontWeight: 800, color: '#92400E',
                                                background: '#FDE68A', padding: '3px 10px', borderRadius: 4,
                                            }}>MEMORIA</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: '#44403C' }}>
                                                    {jobEntry?.title || `Day ${selectedDay}`}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                                    {dayChars.map(cid => (
                                                        <img key={cid} src={charIcon(cid)} alt="" style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover' }} />
                                                    ))}
                                                    <span style={{ fontSize: 10, color: '#78716C', marginLeft: dayChars.length > 0 ? 4 : 0 }}>
                                                        本編ストーリーを聴く
                                                    </span>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>{'>'}</span>
                                        </div>
                                    </Link>
                                    );
                                })()}
                            </div>

                            {/* Key Words Section */}
                            {dayTheme.keywords && dayTheme.keywords.length > 0 && (
                                <div style={{
                                    marginBottom: 20, padding: 16,
                                    background: '#fff', borderRadius: 12,
                                    border: '1px solid #E7E5E4',
                                }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                                    }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 800, color: '#D4AF37',
                                            background: '#FEF9E7', padding: '2px 8px', borderRadius: 4,
                                        }}>WORDS</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#44403C' }}>
                                            今日のキーワード
                                        </span>
                                        <span style={{ fontSize: 11, color: '#A8A29E' }}>
                                            {dayTheme.keywords.length}語
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {dayTheme.keywords.map((kw, i) => (
                                            <div key={i} style={{
                                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                                padding: '8px 0',
                                                borderBottom: i < dayTheme.keywords.length - 1 ? '1px solid #F5F5F4' : 'none',
                                            }}>
                                                <div style={{ minWidth: 0, flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
                                                        <span style={{ fontSize: 16, fontWeight: 800, color: '#1C1917' }}>
                                                            {kw.en}
                                                        </span>
                                                        <span style={{ fontSize: 11, color: '#A8A29E' }}>
                                                            {kw.pron}
                                                        </span>
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#57534E' }}>
                                                            {kw.ja}
                                                        </span>
                                                    </div>
                                                    <div style={{
                                                        fontSize: 12, color: '#D4AF37', fontWeight: 600,
                                                        fontStyle: 'italic', marginBottom: 2,
                                                    }}>
                                                        {kw.example}
                                                    </div>
                                                    <div style={{ fontSize: 11, color: '#78716C', lineHeight: 1.5 }}>
                                                        {kw.note}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        if (!synthRef.current) return;
                                                        synthRef.current.cancel();
                                                        const u = new SpeechSynthesisUtterance(kw.en);
                                                        u.lang = 'en-US';
                                                        u.rate = 0.85;
                                                        synthRef.current.speak(u);
                                                    }}
                                                    style={{
                                                        width: 28, height: 28, borderRadius: '50%',
                                                        border: 'none', cursor: 'pointer',
                                                        background: '#F5F5F4', color: '#78716C',
                                                        fontSize: 12, flexShrink: 0,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    }}
                                                >
                                                    {'\u25B6'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category Filter */}
                            {!categoryFilter && (
                                <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                                    {Object.entries(MASTER_CATEGORY_META).map(([key, meta]) => {
                                        const count = entries.filter(e => e.day_slot === selectedDay && e.category === key).length;
                                        if (count === 0) return null;
                                        return (
                                            <button key={key} onClick={() => setCategoryFilter(key)} style={{
                                                border: '1px solid #E7E5E4', borderRadius: 6,
                                                background: '#fff', cursor: 'pointer',
                                                padding: '4px 10px', fontSize: 11, fontWeight: 600,
                                                color: meta.color,
                                            }}>
                                                {meta.label} ({count})
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {categoryFilter && (
                                <button onClick={() => setCategoryFilter(null)} style={{
                                    border: '1px solid #E7E5E4', borderRadius: 6,
                                    background: MASTER_CATEGORY_META[categoryFilter]?.bg || '#F5F5F4',
                                    cursor: 'pointer', padding: '4px 12px', fontSize: 11,
                                    fontWeight: 600, color: MASTER_CATEGORY_META[categoryFilter]?.color || '#78716C',
                                    marginBottom: 16, display: 'block',
                                }}>
                                    {MASTER_CATEGORY_META[categoryFilter]?.label} x
                                </button>
                            )}

                            {/* View Mode Toggle */}
                            <div style={{
                                display: 'flex', gap: 4, marginBottom: 16,
                                background: '#F5F5F4', borderRadius: 8, padding: 3,
                            }}>
                                <button onClick={() => { setGlobalLevel(-1); setRevealedIds(new Set()); }} style={{
                                    flex: 1, border: 'none', borderRadius: 6,
                                    background: globalLevel === -1 ? '#fff' : 'transparent',
                                    boxShadow: globalLevel === -1 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                    cursor: 'pointer', padding: '6px 4px',
                                    transition: 'all 0.15s',
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: globalLevel === -1 ? '#D4AF37' : '#A8A29E' }}>
                                        BUILD-UP
                                    </div>
                                    <div style={{ fontSize: 9, color: globalLevel === -1 ? '#78716C' : '#D6D3D1' }}>
                                        4段階表示
                                    </div>
                                </button>
                                <button onClick={() => { setGlobalLevel(-2); setRevealedIds(new Set()); }} style={{
                                    flex: 1, border: 'none', borderRadius: 6,
                                    background: globalLevel === -2 ? '#fff' : 'transparent',
                                    boxShadow: globalLevel === -2 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                    cursor: 'pointer', padding: '6px 4px',
                                    transition: 'all 0.15s',
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: globalLevel === -2 ? '#EA580C' : '#A8A29E' }}>
                                        QUIZ
                                    </div>
                                    <div style={{ fontSize: 9, color: globalLevel === -2 ? '#78716C' : '#D6D3D1' }}>
                                        腕試し
                                    </div>
                                </button>
                                {MASTER_LEVELS.map((lvl, i) => (
                                    <button key={lvl.key} onClick={() => setGlobalLevel(i)} style={{
                                        flex: 1, border: 'none', borderRadius: 6,
                                        background: globalLevel === i ? '#fff' : 'transparent',
                                        boxShadow: globalLevel === i ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        cursor: 'pointer', padding: '6px 4px',
                                        transition: 'all 0.15s',
                                    }}>
                                        <div style={{
                                            fontSize: 11, fontWeight: 700,
                                            color: globalLevel === i ? lvl.color : '#A8A29E',
                                        }}>
                                            {lvl.label}
                                        </div>
                                        <div style={{
                                            fontSize: 9, color: globalLevel === i ? '#78716C' : '#D6D3D1',
                                        }}>
                                            {lvl.ja}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {/* Quiz mode header */}
                            {globalLevel === -2 && (
                                <div style={{
                                    marginBottom: 16, padding: '10px 14px',
                                    borderRadius: 8, fontSize: 12, lineHeight: 1.5,
                                    color: '#EA580C',
                                    background: '#FFF7ED',
                                    border: '1px solid #FED7AA',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span>
                                            <span style={{ fontWeight: 700 }}>QUIZ MODE</span>
                                            <span style={{ color: '#78716C', margin: '0 8px' }}>--</span>
                                            <span style={{ color: '#57534E' }}>日本語を見て英語を考えてからタップ</span>
                                        </span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#EA580C' }}>
                                            {revealedIds.size}/{dayEntries.length}
                                        </span>
                                    </div>
                                    {!isMobile && (
                                        <div style={{ fontSize: 10, color: '#A8A29E', display: 'flex', gap: 12 }}>
                                            <span>Space / Enter = reveal</span>
                                            <span>Arrow keys = navigate</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Expression Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {dayEntries.map((entry, idx) => {
                                    const char = CHARACTER_META[entry.character];
                                    const isPlaying = playingId === entry.id;
                                    const isExpanded = expandedId === entry.id;
                                    const isMastered = entry.mastery === 3;
                                    const regLvlIdx = globalLevel >= 0 && globalLevel <= 3 ? globalLevel : 1;
                                    const isRegistered = registeredPhrases.has(entry.english[regLvlIdx].toLowerCase());
                                    const isAutoPlayActive = autoPlaying && autoPlayIdx === idx;
                                    const isQuizFocused = globalLevel === -2 && focusIdx === idx;

                                    return (
                                        <div key={entry.id} id={`kaiwa-card-${idx}`} style={{
                                            background: isAutoPlayActive ? '#FFFBEB' : isMastered ? '#FAFAF9' : '#fff',
                                            borderRadius: 12,
                                            border: isQuizFocused ? '2px solid #EA580C' : isAutoPlayActive ? '2px solid #D4AF37' : isMastered ? '1px solid #D4AF3740' : '1px solid #E7E5E4',
                                            boxShadow: isQuizFocused ? '0 0 0 3px rgba(234,88,12,0.15)' : 'none',
                                            padding: isMobile ? '14px' : '16px 20px',
                                            opacity: isMastered ? 0.65 : 1,
                                            transition: 'all 0.3s',
                                            position: 'relative' as const,
                                            overflow: 'hidden',
                                        }}>
                                            {/* Mastered accent stripe */}
                                            {isMastered && (
                                                <div style={{
                                                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                                    background: 'linear-gradient(90deg, #D4AF37, #10B981)',
                                                }} />
                                            )}
                                            {/* Top row: number + character + actions */}
                                            <div style={{
                                                display: 'flex', alignItems: 'center',
                                                justifyContent: 'space-between', marginBottom: 8,
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700, color: '#A8A29E',
                                                        width: 18, textAlign: 'center',
                                                    }}>
                                                        {idx + 1}
                                                    </span>
                                                    <img src={charIcon(entry.character)} style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} alt="" />
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700,
                                                        color: char?.color || '#78716C',
                                                        background: `${char?.color || '#78716C'}15`,
                                                        padding: '2px 8px', borderRadius: 4,
                                                    }}>
                                                        {char?.nameJa || entry.character}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    {/* Play */}
                                                    <button onClick={() => playTTS(entry)} style={{
                                                        width: 30, height: 30, borderRadius: '50%',
                                                        border: 'none', cursor: 'pointer',
                                                        background: isPlaying ? '#D4AF37' : '#F5F5F4',
                                                        color: isPlaying ? '#fff' : '#78716C',
                                                        fontSize: 14, display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        transition: 'all 0.15s',
                                                        boxShadow: isPlaying ? '0 0 0 3px rgba(212,175,55,0.3)' : 'none',
                                                        animation: isPlaying ? 'pulse-play 1.5s ease infinite' : 'none',
                                                    }}>
                                                        {isPlaying ? '\u25A0' : '\u25B6'}
                                                    </button>
                                                    {/* Mastery */}
                                                    <button onClick={() => toggleMastery(entry.id)} style={{
                                                        width: 30, height: 30, borderRadius: '50%',
                                                        border: isMastered ? '2px solid #D4AF37' : '2px solid #E7E5E4',
                                                        cursor: 'pointer',
                                                        background: isMastered ? '#D4AF37' : '#fff',
                                                        color: isMastered ? '#fff' : '#D6D3D1',
                                                        fontSize: 14, fontWeight: 700,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        transition: 'all 0.2s',
                                                    }}>
                                                        {isMastered ? '\u2713' : ''}
                                                    </button>
                                                    {/* 仕込み帳 */}
                                                    {(() => {
                                                        const lvlIdx = globalLevel >= 0 && globalLevel <= 3 ? globalLevel : 1;
                                                        const lvlName = ['Core', 'Vibe', 'Scene', 'Flow'][lvlIdx];
                                                        return (
                                                            <button
                                                                onClick={() => !isRegistered && registerPhrase(entry)}
                                                                disabled={isRegistered || registeringId === entry.id}
                                                                title={isRegistered ? '仕込み帳に登録済み' : `${lvlName}レベルを仕込み帳に追加`}
                                                                style={{
                                                                    border: isRegistered ? '1px solid #D1FAE5' : '1px solid #E7E5E4',
                                                                    borderRadius: 6,
                                                                    background: isRegistered ? '#ECFDF5' : '#fff',
                                                                    color: isRegistered ? '#059669' : '#A8A29E',
                                                                    padding: '4px 8px', fontSize: 9, fontWeight: 700,
                                                                    cursor: isRegistered ? 'default' : 'pointer',
                                                                }}
                                                            >
                                                                {registeringId === entry.id ? '...' : isRegistered ? '仕込み済' : `+${lvlName}`}
                                                            </button>
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                            {/* Japanese */}
                                            <div style={{
                                                fontSize: 17, fontWeight: 700, color: '#1C1917',
                                                marginBottom: 6, lineHeight: 1.4,
                                            }}>
                                                {entry.japanese}
                                            </div>

                                            {/* English - Quiz / Build-up / Single level */}
                                            {globalLevel === -2 ? (
                                                /* QUIZ MODE */
                                                (() => {
                                                    const isRevealed = revealedIds.has(entry.id);
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                if (!isRevealed) {
                                                                    setRevealedIds(prev => {
                                                                        const next = new Set(prev);
                                                                        next.add(entry.id);
                                                                        return next;
                                                                    });
                                                                }
                                                            }}
                                                            style={{
                                                                marginBottom: 8,
                                                                borderRadius: 8,
                                                                overflow: 'hidden',
                                                                cursor: isRevealed ? 'default' : 'pointer',
                                                                border: isRevealed ? '1px solid #E7E5E4' : '1px dashed #FED7AA',
                                                                background: isRevealed ? '#fff' : '#FFF7ED',
                                                                transition: 'all 0.3s',
                                                            }}
                                                        >
                                                            {isRevealed ? (
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                                                    {MASTER_LEVELS.map((lvl, i) => (
                                                                        <div key={lvl.key} style={{
                                                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                                                            padding: '6px 12px',
                                                                            borderLeft: `3px solid ${lvl.color}`,
                                                                            borderBottom: i < 3 ? '1px solid #F5F5F4' : 'none',
                                                                        }}>
                                                                            <span style={{
                                                                                fontSize: 9, fontWeight: 800, color: lvl.color,
                                                                                width: 40, flexShrink: 0, paddingTop: 3,
                                                                            }}>
                                                                                {lvl.label.toUpperCase()}
                                                                            </span>
                                                                            <span style={{
                                                                                fontSize: i === 2 ? 14 : 13,
                                                                                fontWeight: i === 2 ? 600 : 400,
                                                                                color: i === 2 ? '#1C1917' : '#57534E',
                                                                                lineHeight: 1.5,
                                                                            }}>
                                                                                {entry.english[i]}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div style={{
                                                                    padding: '16px 14px',
                                                                    textAlign: 'center',
                                                                }}>
                                                                    <div style={{
                                                                        fontSize: 13, fontWeight: 600,
                                                                        color: '#EA580C',
                                                                        marginBottom: 4,
                                                                    }}>
                                                                        Tap to reveal
                                                                    </div>
                                                                    <div style={{
                                                                        fontSize: 11, color: '#C2410C',
                                                                        opacity: 0.6,
                                                                    }}>
                                                                        まず頭の中で英語にしてみよう
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()
                                            ) : globalLevel === -1 ? (
                                                <div style={{
                                                    display: 'flex', flexDirection: 'column', gap: 0,
                                                    marginBottom: 8,
                                                    borderRadius: 8, overflow: 'hidden',
                                                    border: '1px solid #E7E5E4',
                                                }}>
                                                    {MASTER_LEVELS.map((lvl, i) => {
                                                        const text = entry.english[i];
                                                        const isLast = i === 3;
                                                        return (
                                                            <div
                                                                key={lvl.key}
                                                                onClick={() => {
                                                                    if (!synthRef.current) return;
                                                                    synthRef.current.cancel();
                                                                    const u = new SpeechSynthesisUtterance(text);
                                                                    u.lang = 'en-US';
                                                                    u.rate = 0.9;
                                                                    synthRef.current.speak(u);
                                                                }}
                                                                style={{
                                                                    display: 'flex', alignItems: 'flex-start', gap: 10,
                                                                    padding: '8px 12px',
                                                                    borderLeft: `3px solid ${lvl.color}`,
                                                                    borderBottom: isLast ? 'none' : '1px solid #F5F5F4',
                                                                    background: i === 0 ? '#FAFAF9' : i === 3 ? `${lvl.color}06` : '#fff',
                                                                    cursor: 'pointer',
                                                                    transition: 'background 0.15s',
                                                                }}
                                                            >
                                                                <div style={{
                                                                    flexShrink: 0, width: 44,
                                                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                                                    gap: 1, paddingTop: 2,
                                                                }}>
                                                                    <span style={{
                                                                        fontSize: 9, fontWeight: 800, color: lvl.color,
                                                                        letterSpacing: '0.05em',
                                                                    }}>
                                                                        {lvl.label.toUpperCase()}
                                                                    </span>
                                                                    <span style={{ fontSize: 8, color: '#A8A29E' }}>
                                                                        {lvl.ja}
                                                                    </span>
                                                                </div>
                                                                <div style={{
                                                                    flex: 1,
                                                                    fontSize: i === 0 ? 13 : i === 3 ? 12 : 14,
                                                                    fontWeight: i === 2 ? 600 : 400,
                                                                    color: i === 0 ? '#A8A29E' : i === 3 ? lvl.color : '#1C1917',
                                                                    lineHeight: 1.5,
                                                                    fontStyle: i === 3 ? 'italic' : 'normal',
                                                                }}>
                                                                    {text}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <>
                                                    <div style={{
                                                        fontSize: globalLevel === 3 ? 13 : 15,
                                                        fontWeight: 500,
                                                        color: MASTER_LEVELS[globalLevel].color,
                                                        lineHeight: 1.5,
                                                        marginBottom: 6,
                                                    }}>
                                                        {entry.english[globalLevel]}
                                                    </div>
                                                    {/* Level dots */}
                                                    <div style={{ display: 'flex', gap: 4, marginBottom: 0 }}>
                                                        {MASTER_LEVELS.map((lvl, i) => (
                                                            <button key={lvl.key} onClick={() => setGlobalLevel(i)} style={{
                                                                width: 8, height: 8, borderRadius: '50%',
                                                                border: 'none', cursor: 'pointer', padding: 0,
                                                                background: i === globalLevel ? lvl.color : '#E7E5E4',
                                                                transition: 'background 0.15s',
                                                            }} title={`${lvl.label} (${lvl.ja})`} />
                                                        ))}
                                                        <span style={{
                                                            fontSize: 9, fontWeight: 600, marginLeft: 4,
                                                            color: MASTER_LEVELS[globalLevel].color,
                                                        }}>
                                                            {MASTER_LEVELS[globalLevel].label}
                                                        </span>
                                                    </div>
                                                </>
                                            )}

                                            {/* Context */}
                                            {entry.context && (
                                                <div
                                                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <p style={{
                                                        fontSize: 12, color: '#78716C', lineHeight: 1.6,
                                                        margin: 0,
                                                        display: isExpanded ? 'block' : '-webkit-box',
                                                        WebkitLineClamp: isExpanded ? undefined : 2,
                                                        WebkitBoxOrient: isExpanded ? undefined : 'vertical',
                                                        overflow: isExpanded ? 'visible' : 'hidden',
                                                    }}>
                                                        {entry.context}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Day completion */}
                            {dayEntries.length > 0 && (() => {
                                const mastered = dayEntries.filter(e => e.mastery === 3).length;
                                const total = dayEntries.length;
                                const isComplete = mastered === total;
                                const pct = total > 0 ? (mastered / total) * 100 : 0;

                                return (
                                    <div style={{
                                        marginTop: 20, padding: isComplete ? '20px 16px' : '16px',
                                        borderRadius: 12, textAlign: 'center',
                                        background: isComplete
                                            ? 'linear-gradient(135deg, #FEF3C7 0%, #ECFDF5 50%, #FEF3C7 100%)'
                                            : '#fff',
                                        border: isComplete ? '2px solid #D4AF37' : '1px solid #E7E5E4',
                                        transition: 'all 0.3s',
                                    }}>
                                        {isComplete ? (
                                            <>
                                                <div style={{
                                                    fontSize: 20, fontWeight: 900, color: '#D4AF37',
                                                    marginBottom: 4, letterSpacing: '0.1em',
                                                }}>
                                                    DAY {selectedDay} CLEAR
                                                </div>
                                                <div style={{ fontSize: 13, color: '#44403C', fontWeight: 600, marginBottom: 8 }}>
                                                    {total}フレーズ全てマスター
                                                </div>
                                                <div style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                                    background: '#D4AF37', color: '#fff',
                                                    padding: '6px 16px', borderRadius: 20,
                                                    fontSize: 12, fontWeight: 800,
                                                }}>
                                                    PERFECT
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: '#44403C', marginBottom: 8 }}>
                                                    Day {selectedDay} Progress
                                                </div>
                                                {/* Progress ring */}
                                                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 8px' }}>
                                                    <svg width="80" height="80" viewBox="0 0 80 80">
                                                        <circle cx="40" cy="40" r="34" fill="none" stroke="#E7E5E4" strokeWidth="6" />
                                                        <circle
                                                            cx="40" cy="40" r="34" fill="none"
                                                            stroke="#D4AF37" strokeWidth="6"
                                                            strokeLinecap="round"
                                                            strokeDasharray={`${2 * Math.PI * 34}`}
                                                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                                                            transform="rotate(-90 40 40)"
                                                            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                                        />
                                                    </svg>
                                                    <div style={{
                                                        position: 'absolute', top: '50%', left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        fontSize: 18, fontWeight: 900, color: '#D4AF37',
                                                    }}>
                                                        {mastered}
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 11, color: '#78716C' }}>
                                                    {total - mastered} remaining
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* Navigation */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
                                marginTop: 20,
                            }}>
                                <Link href="/english/365/episodes" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: '#fff', borderRadius: 10,
                                        border: '1px solid #E7E5E4', padding: 14,
                                        cursor: 'pointer', transition: 'border-color 0.15s',
                                    }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', marginBottom: 2 }}>
                                            EPISODES
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917' }}>
                                            52話ガイド
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/english/365/characters" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: '#fff', borderRadius: 10,
                                        border: '1px solid #E7E5E4', padding: 14,
                                        cursor: 'pointer', transition: 'border-color 0.15s',
                                    }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', marginBottom: 2 }}>
                                            CHARACTERS
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917' }}>
                                            キャラ相関図
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            height: '100%', color: '#A8A29E', fontSize: 14,
                        }}>
                            {entries.length === 0
                                ? 'まだコンテンツがありません'
                                : 'カレンダーから日付を選んでください'
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
