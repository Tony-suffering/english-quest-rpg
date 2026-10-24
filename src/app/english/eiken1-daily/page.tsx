'use client';

// 英検1級 毎日10語 -- カレンダー形式
// 1日10語の上級語彙。好きな語だけ選んで「トレーニングのワード」(/api/user-words)に登録する。
// 例文はチョー面白く、実際の会話で使えるものを厳選。

import { useState, useMemo, useCallback, useEffect } from 'react';
import { PPButton, PPPopup, usePPWordPicker } from '@/components/english/PPWordPicker';
import {
    EIKEN1_DAILY_WORDS,
    EIKEN1_DAILY_DAYS,
    type Eiken1DailyWord,
    type Eiken1DailyDay,
} from '@/data/english/eiken1-daily';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ACCENT = '#D4AF37';   // gold — 英検1級
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const GREEN = '#10B981';

function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
}

function jstToday(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}

function buildCalendarGrid(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
}

function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildMonthKey(year: number, month: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}`;
}

interface DisplayWord extends Eiken1DailyWord {
    id: string;
}

export default function Eiken1DailyPage() {
    const today = jstToday();
    const [yy, mm, dd] = today.split('-').map(Number);
    const [viewYear, setViewYear] = useState(yy);
    const [viewMonth, setViewMonth] = useState(mm - 1);
    const [selectedDay, setSelectedDay] = useState<number | null>(dd);

    // English (lowercased) of words already in the user's training word list.
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [bulkBusy, setBulkBusy] = useState(false);

    // Sentence registration → /api/user-words (training Words). Tracked by word id in localStorage.
    const [sentRegistered, setSentRegistered] = useState<Set<string>>(new Set());
    const [sentRegisteringId, setSentRegisteringId] = useState<string | null>(null);
    const [bulkSentBusy, setBulkSentBusy] = useState(false);

    const { ppWordPicker, openPP, toggleWord, closePP, search } = usePPWordPicker();

    // Pull existing registered words so we can show "Done" without re-adding.
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/user-words');
                if (res.ok) {
                    const data = await res.json();
                    const set = new Set<string>();
                    (data.words || []).forEach((w: { english: string }) =>
                        set.add(w.english.toLowerCase()));
                    setRegistered(set);
                }
            } catch { /* offline / dev — silently ignore */ }
        })();
    }, []);

    // Load locally-tracked sentence registrations.
    useEffect(() => {
        try {
            const s = localStorage.getItem('eiken1-daily-sent-registered');
            if (s) setSentRegistered(new Set<string>(JSON.parse(s)));
        } catch { /* ignore */ }
    }, []);

    const wordsByMonth = useMemo(() => {
        const map = new Map<string, DisplayWord[]>();
        for (const w of EIKEN1_DAILY_WORDS) {
            const monthKey = w.month || '2026-06';
            if (!map.has(monthKey)) map.set(monthKey, []);
            const list = map.get(monthKey)!;
            const idx = list.filter(e => e.daySlot === w.daySlot).length;
            list.push({ ...w, id: `e1_${monthKey}_${String(w.daySlot).padStart(2, '0')}_${idx}` });
        }
        return map;
    }, []);

    const monthWords = useMemo(
        () => wordsByMonth.get(buildMonthKey(viewYear, viewMonth)) || [],
        [wordsByMonth, viewYear, viewMonth],
    );

    const wordsByDay = useMemo(() => {
        const map = new Map<number, DisplayWord[]>();
        for (const w of monthWords) {
            if (!map.has(w.daySlot)) map.set(w.daySlot, []);
            map.get(w.daySlot)!.push(w);
        }
        return map;
    }, [monthWords]);

    const grid = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);

    const selectedDateKey = selectedDay ? dateKey(viewYear, viewMonth, selectedDay) : null;
    const selectedDayMeta: Eiken1DailyDay | null = selectedDateKey
        ? (EIKEN1_DAILY_DAYS[selectedDateKey] || null)
        : null;
    const selectedWords = selectedDay ? (wordsByDay.get(selectedDay) || []) : [];

    const seededDays = wordsByDay.size;

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
        setSelectedDay(null);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
        setSelectedDay(null);
    };

    const registerWord = useCallback(async (word: DisplayWord) => {
        const key = word.en.toLowerCase();
        if (registered.has(key) || registeringId === word.id) return;
        setRegisteringId(word.id);
        try {
            const res = await fetch('/api/user-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: word.en,
                    pronunciation: word.pron,
                    japanese: word.ja,
                    note: `${word.example}\n${word.exampleJa}`,
                    category: 'eiken1',
                }),
            });
            if (res.ok || res.status === 409) {
                setRegistered(prev => new Set(prev).add(key));
            }
        } catch { /* ignore */ } finally {
            setRegisteringId(null);
        }
    }, [registered, registeringId]);

    const registerAllForDay = useCallback(async () => {
        if (bulkBusy) return;
        const pending = selectedWords.filter(w => !registered.has(w.en.toLowerCase()));
        if (pending.length === 0) return;
        setBulkBusy(true);
        for (const w of pending) {
            await registerWord(w);
        }
        setBulkBusy(false);
    }, [bulkBusy, selectedWords, registered, registerWord]);

    const registerSentence = useCallback(async (word: DisplayWord) => {
        if (sentRegistered.has(word.id) || sentRegisteringId === word.id) return;
        setSentRegisteringId(word.id);
        try {
            const res = await fetch('/api/user-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: word.example,
                    pronunciation: '',
                    japanese: word.exampleJa || word.ja,
                    note: `${word.en} = ${word.ja}`,
                    category: 'eiken1',
                }),
            });
            if (res.ok || res.status === 409) {
                setSentRegistered(prev => {
                    const next = new Set(prev).add(word.id);
                    try { localStorage.setItem('eiken1-daily-sent-registered', JSON.stringify([...next])); } catch { /* */ }
                    return next;
                });
            }
        } catch { /* */ } finally {
            setSentRegisteringId(null);
        }
    }, [sentRegistered, sentRegisteringId]);

    const registerAllSentencesForDay = useCallback(async () => {
        if (bulkSentBusy) return;
        const pending = selectedWords.filter(w => !sentRegistered.has(w.id));
        if (pending.length === 0) return;
        setBulkSentBusy(true);
        for (const w of pending) {
            await registerSentence(w);
        }
        setBulkSentBusy(false);
    }, [bulkSentBusy, selectedWords, sentRegistered, registerSentence]);

    const dayRegisteredCount = selectedWords.filter(w => registered.has(w.en.toLowerCase())).length;
    const daySentRegisteredCount = selectedWords.filter(w => sentRegistered.has(w.id)).length;

    const monthLabel = new Date(viewYear, viewMonth)
        .toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    function WordCard({ word, index }: { word: DisplayWord; index: number }) {
        const isReg = registered.has(word.en.toLowerCase());
        const isBusy = registeringId === word.id;
        const isSentReg = sentRegistered.has(word.id);
        const isSentBusy = sentRegisteringId === word.id;

        return (
            <div style={{
                backgroundColor: '#fff', borderRadius: '14px',
                border: `1px solid ${isReg ? '#EBD9A0' : LINE}`,
                borderLeft: `4px solid ${isReg ? ACCENT : LINE}`,
                padding: '16px 18px',
            }}>
                {/* headline row */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: 700, color: '#CBC4B4',
                        width: '20px', textAlign: 'right', flexShrink: 0,
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>
                        {word.en}
                    </span>
                    <span style={{ fontSize: '12px', color: '#C4B5A0' }}>{word.pron}</span>
                    <span style={{ fontSize: '11px', color: SUB, fontWeight: 600 }}>{word.pos}</span>
                    <span style={{ fontSize: '13px', color: '#57534E' }}>{word.ja}</span>
                    {isReg && (
                        <span style={{
                            marginLeft: 'auto', fontSize: '10px', fontWeight: 700, color: '#92400E',
                            background: '#FEF3C7', borderRadius: '999px', padding: '2px 9px',
                        }}>
                            登録済み
                        </span>
                    )}
                </div>

                {/* example (funny + usable) */}
                <div style={{
                    margin: '10px 0 0 28px', padding: '10px 14px',
                    backgroundColor: '#FAFAF9', borderRadius: '10px',
                    borderLeft: `3px solid ${ACCENT}`,
                }}>
                    <div style={{ fontSize: '15px', color: INK, fontWeight: 500, lineHeight: 1.55 }}>
                        {word.example}
                    </div>
                    <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.6, marginTop: '4px' }}>
                        {word.exampleJa}
                    </div>
                </div>

                {/* とにお note */}
                <div style={{
                    margin: '8px 0 0 28px', padding: '8px 14px',
                    backgroundColor: '#FFFBEB', borderRadius: '8px',
                    border: '1px solid #FDE68A',
                    fontSize: '12px', color: '#92400E', lineHeight: 1.7,
                }}>
                    {word.note}
                </div>

                {/* actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: '28px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => speakText(word.en)}
                        title="Play word"
                        style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            border: `1px solid ${LINE}`, backgroundColor: '#fff', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SUB} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </button>
                    <button
                        onClick={() => speakText(word.example)}
                        title="Play example sentence"
                        style={{
                            padding: '6px 12px', borderRadius: '8px', border: `1px solid ${LINE}`,
                            backgroundColor: '#fff', cursor: 'pointer', fontSize: '11px',
                            color: SUB, fontWeight: 600,
                        }}
                    >
                        Sentence
                    </button>
                    <PPButton onClick={() => openPP(word.id, word.en)} />
                    <button
                        onClick={() => !isReg && registerWord(word)}
                        disabled={isReg || isBusy}
                        title="単語をWord Review(/api/user-words)に登録"
                        style={{
                            padding: '7px 14px', borderRadius: '8px', border: 'none',
                            backgroundColor: isReg ? '#FEF3C7' : ACCENT,
                            color: isReg ? '#92400E' : INK,
                            fontSize: '12px', fontWeight: 700,
                            cursor: isReg ? 'default' : 'pointer',
                            opacity: isBusy ? 0.6 : 1,
                        }}
                    >
                        {isBusy ? '...' : isReg ? '単語 登録済' : '+ 単語'}
                    </button>
                    <button
                        onClick={() => !isSentReg && registerSentence(word)}
                        disabled={isSentReg || isSentBusy}
                        title="例文をワード(Word Review /api/user-words)に登録"
                        style={{
                            padding: '7px 14px', borderRadius: '8px',
                            border: `1px solid ${ACCENT}`,
                            backgroundColor: isSentReg ? '#FEF3C7' : '#fff',
                            color: '#92400E',
                            fontSize: '12px', fontWeight: 700,
                            cursor: isSentReg ? 'default' : 'pointer',
                            opacity: isSentBusy ? 0.6 : 1,
                        }}
                    >
                        {isSentBusy ? '...' : isSentReg ? '文章 登録済' : '+ 文章'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', padding: '32px 24px 80px' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
                        color: ACCENT, textTransform: 'uppercase',
                    }}>
                        Eiken Grade 1 · Daily 10
                    </div>
                    <h1 style={{
                        fontSize: '28px', fontWeight: 800, color: INK,
                        letterSpacing: '-0.02em', margin: '4px 0 6px',
                    }}>
                        英検1級 毎日10語
                    </h1>
                    <p style={{ fontSize: '14px', color: SUB, margin: 0, lineHeight: 1.5 }}>
                        1日10語の上級語彙。例文はチョー面白く、実際の会話で使えるものだけ。
                        <strong style={{ color: '#92400E' }}>「+ 単語」</strong>で単語を、
                        <strong style={{ color: '#92400E' }}>「+ 文章」</strong>で例文を、どちらもワード(Word Review)に登録。
                    </p>
                    <p style={{ fontSize: '12px', color: '#A8A29E', margin: '4px 0 0' }}>
                        {seededDays} day(s) seeded this month -- {monthWords.length} total words
                    </p>
                </div>

                {/* month nav */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <button onClick={prevMonth} style={{
                        padding: '8px 16px', borderRadius: '10px', border: `1px solid ${LINE}`,
                        backgroundColor: '#fff', cursor: 'pointer', fontSize: '16px', color: '#57534E',
                    }}>&larr;</button>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: INK }}>{monthLabel}</span>
                    <button onClick={nextMonth} style={{
                        padding: '8px 16px', borderRadius: '10px', border: `1px solid ${LINE}`,
                        backgroundColor: '#fff', cursor: 'pointer', fontSize: '16px', color: '#57534E',
                    }}>&rarr;</button>
                </div>

                {/* weekday header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
                    {WEEKDAYS.map(d => (
                        <div key={d} style={{
                            textAlign: 'center', fontSize: '11px', fontWeight: 600,
                            color: '#A8A29E', padding: '6px 0',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* calendar grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
                    {grid.map((day, i) => {
                        if (day === null) return <div key={`e${i}`} />;
                        const dk = dateKey(viewYear, viewMonth, day);
                        const dayWords = wordsByDay.get(day) || [];
                        const hasData = dayWords.length > 0;
                        const isSelected = selectedDay === day;
                        const isToday = dk === today;
                        const meta = EIKEN1_DAILY_DAYS[dk];

                        return (
                            <button
                                key={`d${day}`}
                                onClick={() => setSelectedDay(day)}
                                style={{
                                    minHeight: '72px', borderRadius: '10px',
                                    border: isSelected
                                        ? `2px solid ${ACCENT}`
                                        : isToday ? `2px solid ${GREEN}` : `1px solid ${LINE}`,
                                    backgroundColor: isSelected ? '#FFFBEB' : hasData ? '#fff' : '#F5F5F4',
                                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'flex-start',
                                    gap: '3px', padding: '6px 3px', textAlign: 'center',
                                    opacity: hasData ? 1 : 0.55, transition: 'all 0.15s',
                                }}
                            >
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: isSelected || isToday ? 800 : 600,
                                    color: isSelected ? '#92400E' : isToday ? '#065F46' : '#78716C',
                                }}>
                                    {day}
                                </span>
                                {meta && (
                                    <span style={{
                                        fontSize: '8px', fontWeight: 700, color: '#78716C',
                                        maxWidth: '100%', overflow: 'hidden',
                                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        {meta.themeEn}
                                    </span>
                                )}
                                {hasData && (
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: ACCENT }}>
                                        {dayWords.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* selected day */}
                {selectedDay && (
                    <div>
                        {selectedDayMeta ? (
                            <div style={{
                                backgroundColor: '#fff', borderRadius: '16px',
                                border: `1px solid ${LINE}`, padding: '24px', marginBottom: '16px',
                                background: 'linear-gradient(135deg, #FFFBEB 0%, #fff 55%)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 700, color: ACCENT,
                                        padding: '3px 10px', borderRadius: '6px', backgroundColor: '#FEF3C7',
                                        textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>
                                        {selectedDayMeta.themeEn}
                                    </span>
                                    <span style={{ fontSize: '12px', color: SUB, fontWeight: 600 }}>
                                        {viewYear}/{viewMonth + 1}/{selectedDay}
                                    </span>
                                </div>
                                <h2 style={{
                                    fontSize: '22px', fontWeight: 800, color: INK,
                                    margin: '2px 0 8px', letterSpacing: '-0.02em',
                                }}>
                                    {selectedDayMeta.theme}
                                </h2>
                                <p style={{ fontSize: '13px', color: '#57534E', margin: '0 0 12px', lineHeight: 1.6 }}>
                                    {selectedDayMeta.tagline}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={registerAllForDay}
                                        disabled={bulkBusy || dayRegisteredCount >= selectedWords.length}
                                        style={{
                                            padding: '7px 14px', borderRadius: '8px', border: 'none',
                                            backgroundColor: dayRegisteredCount >= selectedWords.length ? '#E7E5E4' : ACCENT,
                                            color: dayRegisteredCount >= selectedWords.length ? '#A8A29E' : INK,
                                            fontSize: '12px', fontWeight: 700,
                                            cursor: bulkBusy || dayRegisteredCount >= selectedWords.length ? 'default' : 'pointer',
                                            opacity: bulkBusy ? 0.6 : 1,
                                        }}
                                    >
                                        {bulkBusy ? '登録中…' : '+ 全単語を登録'}
                                    </button>
                                    <button
                                        onClick={registerAllSentencesForDay}
                                        disabled={bulkSentBusy || daySentRegisteredCount >= selectedWords.length}
                                        style={{
                                            padding: '7px 14px', borderRadius: '8px',
                                            border: `1px solid ${ACCENT}`,
                                            backgroundColor: daySentRegisteredCount >= selectedWords.length ? '#F5F5F4' : '#fff',
                                            color: daySentRegisteredCount >= selectedWords.length ? '#A8A29E' : '#92400E',
                                            fontSize: '12px', fontWeight: 700,
                                            cursor: bulkSentBusy || daySentRegisteredCount >= selectedWords.length ? 'default' : 'pointer',
                                            opacity: bulkSentBusy ? 0.6 : 1,
                                        }}
                                    >
                                        {bulkSentBusy ? '登録中…' : '+ 全文章を登録'}
                                    </button>
                                    <span style={{ fontSize: '12px', color: '#A8A29E', fontWeight: 600 }}>
                                        単語 {dayRegisteredCount}/{selectedWords.length} · 文章 {daySentRegisteredCount}/{selectedWords.length}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <h2 style={{ fontSize: '16px', fontWeight: 700, color: INK, margin: '0 0 12px' }}>
                                {viewYear}/{viewMonth + 1}/{selectedDay}
                            </h2>
                        )}

                        {selectedWords.length === 0 ? (
                            <div style={{
                                padding: '40px', textAlign: 'center',
                                backgroundColor: '#fff', borderRadius: '14px', border: `1px solid ${LINE}`,
                            }}>
                                <p style={{ color: '#A8A29E', fontSize: '14px', margin: 0 }}>
                                    この日はまだ単語がありません
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {selectedWords.map((word, idx) => (
                                    <WordCard key={word.id} word={word} index={idx} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {ppWordPicker && (
                <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={search} />
            )}
        </div>
    );
}
