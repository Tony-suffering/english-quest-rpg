'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TOKYO52_EP01_EXPRESSIONS, type Tokyo52Expression } from '@/data/english/tokyo52/tokyo52-ep01-expressions';
import { TOKYO52_EP02_EXPRESSIONS } from '@/data/english/tokyo52/tokyo52-ep02-expressions';

const MASTERY_LABELS = ['未習得', '学習中', '復習中', '習得済'] as const;
const MASTERY_STYLES = [
  { bg: '#FEF2F2', border: '#F87171', text: '#B91C1C' },
  { bg: '#FFF7ED', border: '#FB923C', text: '#C2410C' },
  { bg: '#EFF6FF', border: '#60A5FA', text: '#1D4ED8' },
  { bg: '#FAF5FF', border: '#A855F7', text: '#7E22CE' },
] as const;

const DAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;
const CONTENT_DATES = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12]; // Apr 1-5 (Ep1), Apr 8-12 (Ep2)
const YEAR = 2026;
const MONTH = 3; // April (0-indexed)
const DAYS_IN_MONTH = 30;
const FIRST_DOW = new Date(YEAR, MONTH, 1).getDay(); // 0=Sun

// Combine Ep1 + Ep2 expressions, remap Ep2 days to 6-10
const ALL_EXPRESSIONS: Tokyo52Expression[] = [
  ...TOKYO52_EP01_EXPRESSIONS,
  ...TOKYO52_EP02_EXPRESSIONS.map(e => ({ ...e, day: e.day + 5 })),
];

function getMasteryKey(expr: Tokyo52Expression): string {
  return `tokyo52_mastery_${expr.day}_${expr.expression.replace(/\s+/g, '_').slice(0, 30)}`;
}

function getDayExpressions(day: number): Tokyo52Expression[] {
  return ALL_EXPRESSIONS.filter(e => e.day === day);
}

export default function Tokyo52WordsPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [mastery, setMastery] = useState<Record<string, number>>({});

  // Load mastery from localStorage
  useEffect(() => {
    const loaded: Record<string, number> = {};
    ALL_EXPRESSIONS.forEach(expr => {
      const key = getMasteryKey(expr);
      const val = localStorage.getItem(key);
      if (val !== null) loaded[key] = parseInt(val, 10);
    });
    setMastery(loaded);
  }, []);

  const toggleMastery = useCallback((expr: Tokyo52Expression) => {
    const key = getMasteryKey(expr);
    const current = mastery[key] ?? 0;
    const next = (current + 1) % 4;
    localStorage.setItem(key, String(next));
    setMastery(prev => ({ ...prev, [key]: next }));
  }, [mastery]);

  const totalMastered = ALL_EXPRESSIONS.filter(
    e => (mastery[getMasteryKey(e)] ?? 0) === 3
  ).length;

  // Map content dates to expression days (1-5)
  const dateToDay = (date: number): number | null => {
    const idx = CONTENT_DATES.indexOf(date);
    return idx >= 0 ? idx + 1 : null;
  };

  const getDayMasteryCount = (date: number): number => {
    const day = dateToDay(date);
    if (!day) return 0;
    return getDayExpressions(day).filter(e => (mastery[getMasteryKey(e)] ?? 0) === 3).length;
  };

  const today = new Date();
  const isToday = (date: number) =>
    today.getFullYear() === YEAR && today.getMonth() === MONTH && today.getDate() === date;

  const selectedDay = selectedDate ? dateToDay(selectedDate) : null;
  const selectedExpressions = selectedDay ? getDayExpressions(selectedDay) : [];

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_DOW; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/english/tokyo52" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em' }}>
              TOKYO 52
            </Link>
            <span style={{ color: '#D6D3D1', fontSize: 14 }}>/</span>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1C1917', letterSpacing: '0.05em', margin: 0 }}>
              TOKYO 52 -- Words
            </h1>
          </div>
          <div style={{ fontSize: 14, color: '#78716C', fontWeight: 500 }}>
            <span style={{ color: '#D4AF37', fontWeight: 700 }}>{totalMastered}</span> / {ALL_EXPRESSIONS.length} mastered
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Calendar */}
          <div style={{ flex: '1 1 420px', minWidth: 320, maxWidth: 520 }}>
            <div style={{ background: '#FAFAF9', border: '1px solid #E7E5E4', borderRadius: 16, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#44403C', letterSpacing: '0.1em' }}>
                  April 2026
                </span>
              </div>

              {/* Day names */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                {DAY_NAMES.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#A8A29E', padding: '4px 0', letterSpacing: '0.08em' }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {cells.map((date, i) => {
                  if (date === null) return <div key={`empty-${i}`} />;
                  const hasContent = CONTENT_DATES.includes(date);
                  const masteredCount = getDayMasteryCount(date);
                  const allMastered = hasContent && masteredCount === 15;
                  const isSelected = selectedDate === date;
                  const isTodayCell = isToday(date);
                  const progress = hasContent ? masteredCount / 15 : 0;

                  return (
                    <button
                      key={date}
                      onClick={() => hasContent ? setSelectedDate(date === selectedDate ? null : date) : undefined}
                      style={{
                        position: 'relative',
                        aspectRatio: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        borderRadius: 10,
                        border: isSelected
                          ? '2px solid #10B981'
                          : isTodayCell
                            ? '2px solid #D4AF37'
                            : hasContent
                              ? '1px solid #E7E5E4'
                              : '1px solid transparent',
                        background: allMastered
                          ? '#FFF9E6'
                          : hasContent
                            ? '#FFFFFF'
                            : '#FAFAF9',
                        cursor: hasContent ? 'pointer' : 'default',
                        padding: 4,
                        transition: 'all 0.15s ease',
                        outline: 'none',
                      }}
                    >
                      <span style={{
                        fontSize: 13,
                        fontWeight: hasContent ? 600 : 400,
                        color: hasContent ? '#1C1917' : '#D6D3D1',
                      }}>
                        {date}
                      </span>
                      {hasContent && (
                        <>
                          <span style={{ fontSize: 9, color: '#78716C', lineHeight: 1 }}>
                            {masteredCount}/15
                          </span>
                          <div style={{
                            width: '80%',
                            height: 3,
                            borderRadius: 2,
                            background: '#E7E5E4',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${progress * 100}%`,
                              height: '100%',
                              background: allMastered ? '#D4AF37' : '#10B981',
                              borderRadius: 2,
                              transition: 'width 0.3s ease',
                            }} />
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
              {MASTERY_LABELS.map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#78716C' }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 3,
                    background: MASTERY_STYLES[i].bg,
                    border: `1.5px solid ${MASTERY_STYLES[i].border}`,
                  }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ flex: '1 1 420px', minWidth: 300 }}>
            {selectedDate && selectedExpressions.length > 0 ? (
              <div>
                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#1C1917' }}>
                    April {selectedDate}
                  </span>
                  <span style={{ fontSize: 13, color: '#A8A29E' }}>
                    Day {dateToDay(selectedDate)} -- {selectedExpressions.length} expressions
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedExpressions.map((expr) => {
                    const key = getMasteryKey(expr);
                    const level = mastery[key] ?? 0;
                    const style = MASTERY_STYLES[level];
                    return (
                      <div
                        key={key}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E7E5E4',
                          borderRadius: 12,
                          padding: '14px 16px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: '#A8A29E', letterSpacing: '0.06em' }}>
                            {expr.speaker}
                          </span>
                          <button
                            onClick={() => toggleMastery(expr)}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              padding: '2px 10px',
                              borderRadius: 6,
                              border: `1.5px solid ${style.border}`,
                              background: style.bg,
                              color: style.text,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              outline: 'none',
                              lineHeight: '18px',
                            }}
                          >
                            {MASTERY_LABELS[level]}
                          </button>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 4, lineHeight: 1.4 }}>
                          &ldquo;{expr.expression}&rdquo;
                        </div>
                        <div style={{ fontSize: 13, color: '#57534E', marginBottom: 8 }}>
                          {expr.meaning}
                        </div>
                        <div style={{ fontSize: 13, color: '#A8A29E', fontStyle: 'italic', lineHeight: 1.5 }}>
                          &ldquo;{expr.example}&rdquo;
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                color: '#A8A29E',
                fontSize: 14,
                textAlign: 'center',
                padding: 32,
              }}>
                <div style={{ fontSize: 32, color: '#E7E5E4', marginBottom: 12, fontWeight: 300 }}>--</div>
                <div>Select a highlighted day to view expressions</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer spacer */}
      <div style={{ height: 48 }} />
    </div>
  );
}
