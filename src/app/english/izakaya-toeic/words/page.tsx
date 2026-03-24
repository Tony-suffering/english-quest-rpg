'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ToeicWordEntry, WORD_CATEGORY_META, WORD_LEVEL_META, WordCategory, WordLevel } from '@/data/izakaya-toeic/toeic-words/types';
import { TOEIC_WORD_ENTRIES } from '@/data/izakaya-toeic/toeic-words';
import { T } from '@/data/izakaya-toeic/theme';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LS_KEY = 'toeic-words-learned';
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAY_LABELS_JA = ['日', '月', '火', '水', '木', '金', '土'];
const ALL_LEVELS: WordLevel[] = [500, 600, 700, 800, 900];
const ALL_CATEGORIES: WordCategory[] = ['vocab', 'grammar', 'business', 'trap', 'phrase', 'advanced'];

const CHARACTER_MAP = Object.fromEntries(
  IZAKAYA_CHARACTERS.map(c => [c.id, c]),
) as Record<string, (typeof IZAKAYA_CHARACTERS)[number]>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function wordKey(entry: ToeicWordEntry): string {
  return `${entry.daySlot}-${entry.word}`;
}

function speakWord(word: string, meaning: string, onStart: () => void, onEnd: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  onStart();

  const enUtterance = new SpeechSynthesisUtterance(word);
  enUtterance.lang = 'en-US';
  enUtterance.rate = 0.8;

  const jaUtterance = new SpeechSynthesisUtterance(meaning);
  jaUtterance.lang = 'ja-JP';
  jaUtterance.rate = 0.9;
  jaUtterance.onend = onEnd;
  jaUtterance.onerror = onEnd;

  enUtterance.onend = () => {
    setTimeout(() => window.speechSynthesis.speak(jaUtterance), 300);
  };
  enUtterance.onerror = onEnd;

  window.speechSynthesis.speak(enUtterance);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LevelPill({ level, active, onClick }: { level: WordLevel | null; active: boolean; onClick: () => void }) {
  const meta = level ? WORD_LEVEL_META[level] : null;
  const label = meta ? meta.label : 'All';
  const fg = active ? '#FFFFFF' : (meta?.color || T.textSub);
  const bg = active ? (meta?.color || T.textSub) : (meta?.bg || T.bgSecondary);

  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 20,
        border: `1px solid ${active ? 'transparent' : T.border}`,
        background: bg,
        color: fg,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function CategoryPill({ category, active, onClick }: { category: WordCategory | null; active: boolean; onClick: () => void }) {
  const meta = category ? WORD_CATEGORY_META[category] : null;
  const label = meta ? meta.label : 'All';
  const fg = active ? '#FFFFFF' : (meta?.color || T.textSub);
  const bg = active ? (meta?.color || T.textSub) : (meta?.bg || T.bgSecondary);

  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 12px',
        borderRadius: 20,
        border: `1px solid ${active ? 'transparent' : T.border}`,
        background: bg,
        color: fg,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

function WordCard({
  entry,
  learned,
  playing,
  onToggleLearned,
  onPlay,
}: {
  entry: ToeicWordEntry;
  learned: boolean;
  playing: boolean;
  onToggleLearned: () => void;
  onPlay: () => void;
}) {
  const catMeta = WORD_CATEGORY_META[entry.category];
  const lvlMeta = WORD_LEVEL_META[entry.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      style={{
        background: T.surface,
        border: `1px solid ${learned ? T.goldBorder : T.border}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        boxShadow: learned ? T.goldGlow : T.shadow,
        transition: 'all 0.3s',
      }}
    >
      {/* Top row: word + badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: '0.02em' }}>
          {entry.word}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 10,
            background: lvlMeta.bg,
            color: lvlMeta.color,
            lineHeight: '16px',
          }}
        >
          {lvlMeta.label}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 10,
            background: catMeta.bg,
            color: catMeta.color,
            lineHeight: '16px',
          }}
        >
          {catMeta.label}
        </span>
      </div>

      {/* Japanese meaning */}
      <div style={{ fontSize: 14, color: T.textSub, marginTop: 6 }}>
        {entry.meaning}
      </div>

      {/* Context box */}
      <div
        style={{
          marginTop: 10,
          padding: '10px 12px',
          background: T.goldBg,
          borderLeft: `3px solid ${T.gold}`,
          borderRadius: '0 8px 8px 0',
          fontSize: 13,
          color: T.text,
          lineHeight: 1.6,
        }}
      >
        {entry.context}
      </div>

      {/* Character scenes */}
      {entry.scenes.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {entry.scenes.map((scene, i) => {
            const char = CHARACTER_MAP[scene.character];
            const charColor = char?.color || T.textMuted;
            const charName = char?.name || scene.character;

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: charColor,
                    flexShrink: 0,
                    marginTop: 5,
                  }}
                />
                <div style={{ lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: charColor, marginRight: 6 }}>
                    {charName}
                  </span>
                  <span style={{ color: T.textSub }}>{scene.line}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom row: play + learned */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
        <button
          onClick={onPlay}
          disabled={playing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            background: playing ? T.goldBg : T.surface,
            color: playing ? T.gold : T.textSub,
            fontSize: 12,
            fontWeight: 600,
            cursor: playing ? 'default' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {playing ? (
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: T.gold,
                animation: 'toeicWordPulse 1s infinite',
              }}
            />
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {playing ? 'Playing...' : 'Play'}
        </button>

        <button
          onClick={onToggleLearned}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 8,
            border: `1px solid ${learned ? T.gold : T.border}`,
            background: learned ? T.gold : T.surface,
            color: learned ? '#FFFFFF' : T.textMuted,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {learned ? 'Learned' : 'Not yet'}
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ToeicWordsPage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [learnedWords, setLearnedWords] = useState<Record<string, boolean>>({});
  const [levelFilter, setLevelFilter] = useState<WordLevel | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<WordCategory | null>(null);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Derived data
  // ---------------------------------------------------------------------------

  const entriesByDay = useMemo(() => {
    const map: Record<number, ToeicWordEntry[]> = {};
    for (const e of TOEIC_WORD_ENTRIES) {
      if (!map[e.daySlot]) map[e.daySlot] = [];
      map[e.daySlot].push(e);
    }
    return map;
  }, []);

  const dayEntries = useMemo(() => {
    if (selectedDay == null) return [];
    const raw = entriesByDay[selectedDay] || [];
    return raw.filter(e => {
      if (levelFilter && e.level !== levelFilter) return false;
      if (categoryFilter && e.category !== categoryFilter) return false;
      return true;
    });
  }, [selectedDay, entriesByDay, levelFilter, categoryFilter]);

  const allDayEntries = useMemo(() => {
    if (selectedDay == null) return [];
    return entriesByDay[selectedDay] || [];
  }, [selectedDay, entriesByDay]);

  const learnedCount = useMemo(() => {
    return allDayEntries.filter(e => learnedWords[wordKey(e)]).length;
  }, [allDayEntries, learnedWords]);

  const totalLearned = useMemo(() => {
    return TOEIC_WORD_ENTRIES.filter(e => learnedWords[wordKey(e)]).length;
  }, [learnedWords]);

  // Streak calculation
  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 31; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const day = d.getDate();
      const dayWords = entriesByDay[day] || [];
      if (dayWords.length === 0) continue;
      const allLearned = dayWords.every(e => learnedWords[wordKey(e)]);
      if (allLearned) {
        count++;
      } else if (i > 0) {
        break;
      }
    }
    return count;
  }, [learnedWords, entriesByDay]);

  // Calendar grid data
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setMounted(true);
    // Load learned state
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) setLearnedWords(JSON.parse(stored));
    } catch { /* noop */ }
    // Auto-select today
    const today = new Date();
    setSelectedDay(today.getDate());
    // Mobile detection
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') {
        setSelectedDay(prev => {
          if (prev == null) return 1;
          return prev > 1 ? prev - 1 : daysInMonth;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedDay(prev => {
          if (prev == null) return 1;
          return prev < daysInMonth ? prev + 1 : 1;
        });
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [daysInMonth]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const toggleLearned = useCallback((entry: ToeicWordEntry) => {
    setLearnedWords(prev => {
      const key = wordKey(entry);
      const next = { ...prev, [key]: !prev[key] };
      // Clean up false values
      if (!next[key]) delete next[key];
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch { /* noop */ }
      return next;
    });
  }, []);

  const handlePlay = useCallback((entry: ToeicWordEntry) => {
    const key = wordKey(entry);
    speakWord(
      entry.word,
      entry.meaning,
      () => setPlayingWord(key),
      () => setPlayingWord(null),
    );
  }, []);

  const goToday = useCallback(() => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const prevMonth = useCallback(() => {
    setViewMonth(prev => {
      if (prev === 0) {
        setViewYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth(prev => {
      if (prev === 11) {
        setViewYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const handleDayClick = useCallback((day: number) => {
    setSelectedDay(day);
    if (isMobile && detailRef.current) {
      setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [isMobile]);

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  function renderCalendarCell(day: number) {
    const entries = entriesByDay[day] || [];
    const isSelected = selectedDay === day;
    const isToday = day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();
    const allLearned = entries.length > 0 && entries.every(e => learnedWords[wordKey(e)]);
    const categories = [...new Set(entries.map(e => e.category))];

    return (
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          borderRadius: 10,
          border: allLearned
            ? `2px solid ${T.gold}`
            : isSelected
              ? `2px solid ${T.gold}`
              : isToday
                ? `2px solid ${T.goldBorder}`
                : '2px solid transparent',
          background: isSelected
            ? T.goldBg
            : allLearned
              ? 'rgba(212,175,55,0.04)'
              : T.surface,
          cursor: 'pointer',
          transition: 'all 0.2s',
          padding: 2,
        }}
      >
        <span
          style={{
            fontSize: isMobile ? 13 : 14,
            fontWeight: isToday || isSelected ? 700 : 400,
            color: isSelected ? T.gold : isToday ? T.text : entries.length > 0 ? T.text : T.textMuted,
          }}
        >
          {day}
        </span>
        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.slice(0, 4).map(cat => (
              <span
                key={cat}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: WORD_CATEGORY_META[cat].color,
                }}
              />
            ))}
            {categories.length > 4 && (
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.textMuted }} />
            )}
          </div>
        )}
        {allLearned && entries.length > 0 && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill={T.gold}
            style={{ position: 'absolute', top: 3, right: 3 }}
          >
            <polyline points="20 6 9 17 4 12" fill="none" stroke={T.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: T.textMuted, fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>
      {/* Pulse animation */}
      <style>{`
        @keyframes toeicWordPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(16,185,129,0.06) 100%)`,
          borderBottom: `1px solid ${T.border}`,
          padding: '24px 0 20px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
          <Link
            href="/english/izakaya-toeic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: T.textSub,
              textDecoration: 'none',
              fontSize: 13,
              marginBottom: 12,
              transition: 'color 0.2s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>

          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, margin: 0, letterSpacing: '0.04em' }}>
            今日の単語
          </h1>
          <p style={{ fontSize: 13, color: T.textSub, margin: '4px 0 0', letterSpacing: '0.02em' }}>
            TOEIC頻出310語 -- カレンダーで毎日10語
          </p>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '24px 16px 60px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {/* Left: Calendar */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Month navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <button
              onClick={prevMonth}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: `1px solid ${T.border}`,
                background: T.surface,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: T.textSub,
                transition: 'all 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>
                {monthLabel}
              </span>
              <button
                onClick={goToday}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: `1px solid ${T.goldBorder}`,
                  background: T.goldBg,
                  color: T.gold,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Today
              </button>
            </div>

            <button
              onClick={nextMonth}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: `1px solid ${T.border}`,
                background: T.surface,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: T.textSub,
                transition: 'all 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 4,
              marginBottom: 4,
            }}
          >
            {WEEKDAY_LABELS_JA.map((label, i) => (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: i === 0 ? T.red : i === 6 ? T.blue : T.textMuted,
                  padding: '4px 0',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 4,
            }}
          >
            {/* Empty cells before first day */}
            {Array.from({ length: firstDow }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => renderCalendarCell(i + 1))}
          </div>

          {/* Stats summary */}
          <div
            style={{
              marginTop: 20,
              padding: 16,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              boxShadow: T.shadow,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 2 }}>
                  TOTAL PROGRESS
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.text }}>
                  {totalLearned}
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.textMuted }}> / {TOEIC_WORD_ENTRIES.length}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 2 }}>
                  STREAK
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: streak > 0 ? T.gold : T.textMuted }}>
                  {streak}
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.textMuted }}> days</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                marginTop: 12,
                height: 6,
                borderRadius: 3,
                background: T.bgSecondary,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.round((totalLearned / Math.max(TOEIC_WORD_ENTRIES.length, 1)) * 100)}%`,
                  background: `linear-gradient(90deg, ${T.gold}, ${T.green})`,
                  borderRadius: 3,
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div
          ref={detailRef}
          style={{
            width: isMobile ? '100%' : 420,
            flexShrink: 0,
          }}
        >
          {selectedDay != null ? (
            <>
              {/* Day header */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.text }}>
                  {viewMonth + 1}/{selectedDay}
                  <span style={{ fontSize: 13, fontWeight: 500, color: T.textSub, marginLeft: 8 }}>
                    {new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('ja-JP', { weekday: 'long' })}
                  </span>
                </div>
              </div>

              {/* Level filter */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                <LevelPill level={null} active={levelFilter === null} onClick={() => setLevelFilter(null)} />
                {ALL_LEVELS.map(lv => (
                  <LevelPill
                    key={lv}
                    level={lv}
                    active={levelFilter === lv}
                    onClick={() => setLevelFilter(levelFilter === lv ? null : lv)}
                  />
                ))}
              </div>

              {/* Category filter */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                <CategoryPill category={null} active={categoryFilter === null} onClick={() => setCategoryFilter(null)} />
                {ALL_CATEGORIES.map(cat => (
                  <CategoryPill
                    key={cat}
                    category={cat}
                    active={categoryFilter === cat}
                    onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                  />
                ))}
              </div>

              {/* Learned progress */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 16,
                  padding: '10px 14px',
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: T.textSub }}>
                  {learnedCount} / {allDayEntries.length} learned
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 5,
                    borderRadius: 3,
                    background: T.bgSecondary,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: allDayEntries.length > 0 ? `${Math.round((learnedCount / allDayEntries.length) * 100)}%` : '0%',
                      background: learnedCount === allDayEntries.length && allDayEntries.length > 0
                        ? T.gold
                        : T.green,
                      borderRadius: 3,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
                {learnedCount === allDayEntries.length && allDayEntries.length > 0 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Word cards */}
              <div
                style={{
                  maxHeight: isMobile ? 'none' : 'calc(100vh - 320px)',
                  overflowY: isMobile ? 'visible' : 'auto',
                  paddingRight: isMobile ? 0 : 4,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {dayEntries.length > 0 ? (
                    dayEntries.map(entry => (
                      <WordCard
                        key={wordKey(entry)}
                        entry={entry}
                        learned={!!learnedWords[wordKey(entry)]}
                        playing={playingWord === wordKey(entry)}
                        onToggleLearned={() => toggleLearned(entry)}
                        onPlay={() => handlePlay(entry)}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: T.textMuted,
                        fontSize: 14,
                      }}
                    >
                      {(entriesByDay[selectedDay] || []).length === 0
                        ? 'No words assigned for this day'
                        : 'No words match the current filters'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: T.textMuted,
                fontSize: 14,
              }}
            >
              Select a day to see its words
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
