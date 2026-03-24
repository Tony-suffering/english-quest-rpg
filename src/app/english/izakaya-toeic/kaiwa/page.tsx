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

function StoryViewer({ story }: { story: KaiwaStory }) {
    const [open, setOpen] = useState(false);
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

    return (
        <div style={{ marginTop: 12 }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', padding: '12px 16px',
                    background: 'linear-gradient(135deg, #FEF3C7 0%, #ECFDF5 100%)',
                    border: '1px solid #FDE68A', borderRadius: open ? '10px 10px 0 0' : 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', transition: 'all 0.15s',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 11, fontWeight: 800, color: '#92400E',
                        background: '#FDE68A', padding: '2px 8px', borderRadius: 4,
                    }}>STORY</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#44403C' }}>
                        {story.title}
                    </span>
                </div>
                <span style={{
                    fontSize: 14, color: '#92400E', fontWeight: 600,
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                }}>v</span>
            </button>

            {open && (
                <div style={{
                    border: '1px solid #FDE68A', borderTop: 'none',
                    borderRadius: '0 0 10px 10px', background: '#FFFBEB',
                    padding: '12px 0', maxHeight: 400, overflowY: 'auto',
                }}>
                    {/* Controls */}
                    <div style={{
                        display: 'flex', gap: 8, padding: '0 14px 10px',
                        borderBottom: '1px solid #FDE68A20',
                    }}>
                        <button onClick={() => setShowEn(!showEn)} style={{
                            padding: '4px 10px', fontSize: 10, fontWeight: 700,
                            background: showEn ? '#D4AF3715' : '#fff',
                            border: `1px solid ${showEn ? '#D4AF37' : '#D6D3D1'}`,
                            borderRadius: 4, cursor: 'pointer',
                            color: showEn ? '#D4AF37' : '#78716C',
                        }}>
                            {showEn ? 'EN ON' : 'EN OFF'}
                        </button>
                    </div>

                    {/* Lines */}
                    {story.story.map((line, i) => {
                        const isNarration = line.speaker === 'narration';
                        const char = !isNarration ? CHARACTER_META[line.speaker] : null;
                        const isActive = i === currentLine;

                        if (isNarration) {
                            return (
                                <div key={i} style={{
                                    padding: '8px 16px', textAlign: 'center',
                                }}>
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
                                key={i}
                                onClick={() => {
                                    setCurrentLine(i);
                                    if (line.english) speakLine(line.english, line.speaker);
                                }}
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
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, color: char?.color || '#78716C',
                                        }}>
                                            {char?.nameJa || line.speaker}
                                        </span>
                                        {line.mood && line.mood !== 'normal' && (
                                            <span style={{ fontSize: 9, color: '#A8A29E' }}>
                                                ({line.mood})
                                            </span>
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
                    })}
                </div>
            )}
        </div>
    );
}

// ── Persistence ──

const MASTERY_KEY = 'master-365-mastery';

function loadMastery(): Record<string, number> {
    try {
        const saved = localStorage.getItem(MASTERY_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
}

function saveMastery(m: Record<string, number>) {
    try { localStorage.setItem(MASTERY_KEY, JSON.stringify(m)); } catch { /* */ }
}

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
    const [globalLevel, setGlobalLevel] = useState<number>(1); // default to Vibe
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    // Registration state
    const [registeredPhrases, setRegisteredPhrases] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [batchRegistering, setBatchRegistering] = useState(false);
    const [batchProgress, setBatchProgress] = useState<{ current: number; total: number } | null>(null);

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
        const text = entry.english[globalLevel];
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

    const registerPhrase = useCallback(async (entry: KaiwaEntry) => {
        setRegisteringId(entry.id);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: entry.english[1], // Vibe level
                    japanese: entry.japanese,
                    category: '365-master',
                    date: new Date().toISOString().slice(0, 10),
                }),
            });
            if (res.ok) {
                setRegisteredPhrases(prev => {
                    const next = new Set(prev);
                    next.add(entry.english[1].toLowerCase());
                    return next;
                });
            }
        } catch { /* */ }
        setRegisteringId(null);
    }, []);

    const batchRegister = useCallback(async () => {
        const unregistered = dayEntries.filter(e => !registeredPhrases.has(e.english[1].toLowerCase()));
        if (unregistered.length === 0) return;
        setBatchRegistering(true);
        setBatchProgress({ current: 0, total: unregistered.length });
        for (let i = 0; i < unregistered.length; i++) {
            await registerPhrase(unregistered[i]);
            setBatchProgress({ current: i + 1, total: unregistered.length });
        }
        setBatchRegistering(false);
        setBatchProgress(null);
    }, [dayEntries, registeredPhrases, registerPhrase]);

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

            {/* ── Header ── */}
            <div style={{
                background: '#fff',
                borderBottom: '1px solid #E7E5E4',
                padding: isMobile ? '20px 16px 16px' : '28px 32px 20px',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{
                            background: '#D4AF37', color: '#fff',
                            padding: '3px 10px', borderRadius: 4,
                            fontSize: 11, fontWeight: 800, letterSpacing: '0.05em',
                        }}>365</span>
                        <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>
                            English Master Course
                        </span>
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

                    {/* Collapsible guide panel */}
                    <div style={{ marginBottom: 12 }}>
                        <button
                            onClick={toggleGuide}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                fontSize: 13, fontWeight: 700, color: '#10B981',
                                background: 'rgba(16,185,129,0.06)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                padding: '7px 14px', borderRadius: showGuide ? '8px 8px 0 0' : 8,
                                cursor: 'pointer', transition: 'all 0.15s',
                            }}
                        >
                            <span style={{
                                display: 'inline-block', fontSize: 12, fontWeight: 800,
                                transform: showGuide ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                            }}>&#9654;</span>
                            このページの使い方
                        </button>
                        {showGuide && (
                            <div style={{
                                background: 'rgba(16,185,129,0.04)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                borderTop: 'none',
                                borderRadius: '0 8px 8px 8px',
                                padding: isMobile ? '14px 16px' : '16px 20px',
                            }}>
                                <ol style={{
                                    margin: 0, paddingLeft: 20,
                                    fontSize: 13, color: '#44403C', lineHeight: 2,
                                }}>
                                    <li>下のカレンダーから<strong style={{ color: '#1C1917' }}>今日の日付</strong>をクリック</li>
                                    <li>その日の<strong style={{ color: '#1C1917' }}>フレーズ10個</strong>が右側に表示される</li>
                                    <li>日本語を見て、4段階の英語で覚える（Vibe → Native）</li>
                                    <li>覚えたらカードをクリックして<strong style={{ color: '#D4AF37' }}>マスター</strong>に切り替え</li>
                                </ol>
                                <p style={{ fontSize: 12, color: '#78716C', margin: '10px 0 0', lineHeight: 1.5 }}>
                                    各フレーズには居酒屋キャラクターのストーリーがついています。文脈で覚えるから忘れにくい。
                                </p>
                            </div>
                        )}
                    </div>

                    {/* LP link */}
                    <Link href="/english/izakaya-toeic/kaiwa/lp" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontSize: 13, fontWeight: 700, color: '#D4AF37',
                        textDecoration: 'none',
                        background: 'rgba(212,175,55,0.08)',
                        border: '1px solid rgba(212,175,55,0.25)',
                        padding: '8px 16px', borderRadius: 8,
                        marginBottom: 4,
                    }}>
                        英会話マスター365とは？ -- 科学的メソッドと使い方
                    </Link>

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
                            {/* Day Header */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
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

                            {/* Level Toggle */}
                            <div style={{
                                display: 'flex', gap: 4, marginBottom: 16,
                                background: '#F5F5F4', borderRadius: 8, padding: 3,
                            }}>
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

                            {/* Register bar */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                marginBottom: 16, padding: '8px 12px',
                                background: '#ECFDF5', borderRadius: 8,
                            }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#059669' }}>
                                    {dayEntries.filter(e => registeredPhrases.has(e.english[1].toLowerCase())).length}/{dayEntries.length} Training
                                </span>
                                <button
                                    onClick={batchRegister}
                                    disabled={batchRegistering}
                                    style={{
                                        border: 'none', borderRadius: 6,
                                        background: '#059669', color: '#fff',
                                        padding: '5px 14px', fontSize: 11, fontWeight: 700,
                                        cursor: batchRegistering ? 'wait' : 'pointer',
                                        opacity: batchRegistering ? 0.6 : 1,
                                    }}
                                >
                                    {batchRegistering
                                        ? `${batchProgress?.current || 0}/${batchProgress?.total || 0}`
                                        : 'Training'}
                                </button>
                            </div>

                            {/* Expression Cards */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {dayEntries.map((entry, idx) => {
                                    const char = CHARACTER_META[entry.character];
                                    const isPlaying = playingId === entry.id;
                                    const isExpanded = expandedId === entry.id;
                                    const isMastered = entry.mastery === 3;
                                    const isRegistered = registeredPhrases.has(entry.english[1].toLowerCase());

                                    return (
                                        <div key={entry.id} style={{
                                            background: '#fff',
                                            borderRadius: 12,
                                            border: '1px solid #E7E5E4',
                                            padding: isMobile ? '14px' : '16px 20px',
                                            opacity: isMastered ? 0.6 : 1,
                                            transition: 'opacity 0.2s',
                                        }}>
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
                                                        background: isPlaying ? '#1C1917' : '#F5F5F4',
                                                        color: isPlaying ? '#fff' : '#78716C',
                                                        fontSize: 14, display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        transition: 'all 0.15s',
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
                                                    {/* DB register */}
                                                    <button
                                                        onClick={() => !isRegistered && registerPhrase(entry)}
                                                        disabled={isRegistered || registeringId === entry.id}
                                                        style={{
                                                            border: '1px solid #E7E5E4', borderRadius: 6,
                                                            background: isRegistered ? '#ECFDF5' : '#fff',
                                                            color: isRegistered ? '#059669' : '#A8A29E',
                                                            padding: '4px 8px', fontSize: 9, fontWeight: 700,
                                                            cursor: isRegistered ? 'default' : 'pointer',
                                                        }}
                                                    >
                                                        {registeringId === entry.id ? '...' : isRegistered ? 'DB' : '+DB'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Japanese */}
                                            <div style={{
                                                fontSize: 17, fontWeight: 700, color: '#1C1917',
                                                marginBottom: 6, lineHeight: 1.4,
                                            }}>
                                                {entry.japanese}
                                            </div>

                                            {/* English */}
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
                                            <div style={{ display: 'flex', gap: 4, marginBottom: entry.context ? 8 : 0 }}>
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
                            {dayEntries.length > 0 && (
                                <div style={{
                                    marginTop: 20, padding: 16, borderRadius: 12,
                                    background: '#fff', border: '1px solid #E7E5E4',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#44403C', marginBottom: 4 }}>
                                        Day {selectedDay} Progress
                                    </div>
                                    <div style={{ fontSize: 24, fontWeight: 900, color: '#D4AF37' }}>
                                        {dayEntries.filter(e => e.mastery === 3).length}/{dayEntries.length}
                                    </div>
                                    <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 4 }}>
                                        {dayEntries.filter(e => e.mastery === 3).length === dayEntries.length
                                            ? 'Complete!'
                                            : `${dayEntries.length - dayEntries.filter(e => e.mastery === 3).length}/${dayEntries.length}`
                                        }
                                    </div>
                                </div>
                            )}

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
