'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { T } from '@/data/izakaya-toeic/theme';
import {
  THIRTY_DAY_PLAN,
  WEEK_THEMES,
  DayPlan,
  getCompletedDays,
  markDayComplete,
  isDayComplete,
  getStreakDays,
  getProgramProgress,
} from '@/data/izakaya-toeic/thirty-day-plan';

const OUTPUT_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  shadow:     { label: 'Shadow',     color: '#D4AF37' },
  speak:      { label: 'Speak',      color: '#10B981' },
  write:      { label: 'Write',      color: '#3B82F6' },
  paraphrase: { label: 'Paraphrase', color: '#8B5CF6' },
  review:     { label: 'Review',     color: '#EF4444' },
};

function getRecommendedDay(completed: number[]): number {
  for (let d = 1; d <= 30; d++) {
    if (!completed.includes(d)) return d;
  }
  return 30;
}

function estimateScore(completed: number[]): number {
  if (completed.length === 0) return 0;
  const base = 300;
  const perDay = 10;
  return Math.min(495, base + completed.length * perDay);
}

export default function ProgramPage() {
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const c = getCompletedDays();
    setCompleted(c);
    const rec = getRecommendedDay(c);
    const plan = THIRTY_DAY_PLAN.find(d => d.day === rec);
    if (plan) setSelectedDay(plan);
  }, []);

  const handleMarkComplete = useCallback((day: number) => {
    markDayComplete(day);
    setCompleted(getCompletedDays());
  }, []);

  const progress = mounted ? getProgramProgress() : { completed: 0, total: 30 as const, percentage: 0 };
  const streak = mounted ? getStreakDays() : 0;
  const recommended = mounted ? getRecommendedDay(completed) : 1;
  const score = mounted ? estimateScore(completed) : 0;

  const filteredDays = activeWeek
    ? THIRTY_DAY_PLAN.filter(d => d.weekNumber === activeWeek)
    : THIRTY_DAY_PLAN;

  // Build grid: 5 rows x 7 cols (or filtered)
  const gridDays: (DayPlan | null)[] = [];
  if (!activeWeek) {
    // Full 30-day grid: 5 rows x 7 cols, days 29-30 go in row 5
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 7; col++) {
        const dayNum = row * 7 + col + 1;
        if (dayNum <= 30) {
          gridDays.push(THIRTY_DAY_PLAN.find(d => d.day === dayNum) || null);
        } else {
          gridDays.push(null);
        }
      }
    }
  } else {
    const weekDays = filteredDays;
    for (let i = 0; i < 7; i++) {
      gridDays.push(weekDays[i] || null);
    }
  }

  const gridCols = 7;
  const gridRows = activeWeek ? 1 : 5;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero */}
      <div style={{
        padding: '40px 20px 32px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #FFFBEB 0%, #FAFAF9 100%)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{
          display: 'inline-block',
          padding: '3px 12px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 12,
        }}>
          30-DAY PROGRAM
        </div>

        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 36px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -0.5,
        }}>
          <span style={{ color: '#92400E' }}>居酒屋</span>
          <span style={{ color: T.gold }}>TOEIC</span>
          <span style={{ color: T.textSub, fontSize: '0.6em', fontWeight: 600 }}> 30日間プログラム</span>
        </h1>

        <p style={{
          fontSize: 13,
          color: T.textMuted,
          margin: '0 0 20px',
          fontStyle: 'italic',
        }}>
          -- カウンターに座ってから、卒業するまで --
        </p>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          {[
            { label: '完了', value: `${progress.completed}/30`, sub: 'days' },
            { label: '連続', value: `${streak}`, sub: 'streak' },
            { label: '推定L', value: score > 0 ? `${score}` : '--', sub: 'score' },
          ].map(stat => (
            <div key={stat.label} style={{
              minWidth: 72,
              padding: '10px 16px',
              background: T.surface,
              borderRadius: 10,
              border: `1px solid ${T.border}`,
              boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.gold }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: 1, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 80px' }}>
        {/* Week Tabs */}
        <div style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 4,
          marginBottom: 16,
          WebkitOverflowScrolling: 'touch',
        }}>
          <button
            onClick={() => setActiveWeek(null)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: `1px solid ${!activeWeek ? T.gold : T.border}`,
              background: !activeWeek ? T.goldBg : T.surface,
              color: !activeWeek ? T.gold : T.textSub,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            ALL
          </button>
          {WEEK_THEMES.map(wt => (
            <button
              key={wt.week}
              onClick={() => setActiveWeek(activeWeek === wt.week ? null : wt.week)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${activeWeek === wt.week ? wt.color : T.border}`,
                background: activeWeek === wt.week ? `${wt.color}10` : T.surface,
                color: activeWeek === wt.week ? wt.color : T.textSub,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {wt.week <= 4 ? `W${wt.week}` : '卒業'}
            </button>
          ))}
        </div>

        {/* Week Theme Banner (when filtered) */}
        {activeWeek && (() => {
          const wt = WEEK_THEMES.find(w => w.week === activeWeek);
          if (!wt) return null;
          return (
            <div style={{
              padding: '12px 16px',
              background: `${wt.color}08`,
              border: `1px solid ${wt.color}25`,
              borderRadius: 10,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: wt.color }}>{wt.title}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{wt.subtitle}</div>
            </div>
          );
        })()}

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: 6,
          marginBottom: 20,
        }}>
          {/* Day headers */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} style={{
              textAlign: 'center',
              fontSize: 10,
              fontWeight: 700,
              color: T.textMuted,
              letterSpacing: 1,
              padding: '4px 0',
            }}>{d}</div>
          ))}

          {/* Day cells */}
          {gridDays.map((plan, idx) => {
            if (!plan) {
              return <div key={`empty-${idx}`} style={{ minHeight: 80 }} />;
            }
            const done = completed.includes(plan.day);
            const isRec = plan.day === recommended && !done;
            const isSelected = selectedDay?.day === plan.day;
            const weekTheme = WEEK_THEMES.find(w => w.week === plan.weekNumber);
            const weekColor = weekTheme?.color || T.gold;

            return (
              <button
                key={plan.day}
                onClick={() => setSelectedDay(plan)}
                style={{
                  position: 'relative',
                  minHeight: 80,
                  padding: '8px 4px 6px',
                  background: isSelected ? `${weekColor}0C` : T.surface,
                  border: `1px solid ${isSelected ? weekColor : T.border}`,
                  borderLeft: `3px solid ${weekColor}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                  boxShadow: isRec
                    ? `0 0 16px ${T.gold}30, 0 0 4px ${T.gold}20`
                    : isSelected
                      ? T.shadowMd
                      : T.shadow,
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                {/* Day number */}
                <div style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: done ? weekColor : isRec ? T.gold : T.text,
                  lineHeight: 1,
                }}>
                  {plan.day}
                </div>

                {/* Title (hidden on very small screens via clamp) */}
                <div style={{
                  fontSize: 'clamp(8px, 1.8vw, 10px)',
                  color: T.textSub,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginTop: 4,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                } as React.CSSProperties}>
                  {plan.dayTitle}
                </div>

                {/* Completion dot */}
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: done ? T.gold : '#D6D3D1',
                  marginTop: 4,
                  boxShadow: done ? `0 0 6px ${T.gold}60` : 'none',
                }} />

                {/* Recommended glow indicator */}
                {isRec && (
                  <div style={{
                    position: 'absolute',
                    top: 2,
                    right: 3,
                    fontSize: 8,
                    fontWeight: 800,
                    color: T.gold,
                    letterSpacing: 0.5,
                  }}>NOW</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.textSub }}>
              Progress
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold }}>
              {progress.percentage}%
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: 2,
            height: 8,
            borderRadius: 4,
            overflow: 'hidden',
            background: T.bgSecondary,
          }}>
            {Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              const done = completed.includes(dayNum);
              const plan = THIRTY_DAY_PLAN.find(d => d.day === dayNum);
              const wt = plan ? WEEK_THEMES.find(w => w.week === plan.weekNumber) : null;
              return (
                <div
                  key={dayNum}
                  style={{
                    flex: 1,
                    background: done ? (wt?.color || T.gold) : 'transparent',
                    transition: 'background 0.3s',
                    borderRadius: i === 0 ? '4px 0 0 4px' : i === 29 ? '0 4px 4px 0' : 0,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail Panel */}
        {selectedDay && (
          <div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: '20px',
            boxShadow: T.shadowMd,
            marginBottom: 24,
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 14,
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: WEEK_THEMES.find(w => w.week === selectedDay.weekNumber)?.color || T.gold,
                  letterSpacing: 1,
                  marginBottom: 2,
                }}>
                  DAY {selectedDay.day} -- {selectedDay.episodeId.toUpperCase().replace('EP-0', 'EP.').replace('EP-', 'EP.')}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                  {selectedDay.dayTitle}
                </div>
                <div style={{ fontSize: 13, color: T.textSub, marginTop: 2 }}>
                  {selectedDay.skill}
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: 6,
                alignItems: 'center',
              }}>
                {/* Output type badge */}
                {(() => {
                  const ot = OUTPUT_TYPE_LABELS[selectedDay.outputType];
                  return (
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: 12,
                      fontSize: 10,
                      fontWeight: 700,
                      background: `${ot.color}15`,
                      color: ot.color,
                      border: `1px solid ${ot.color}30`,
                    }}>
                      {ot.label}
                    </span>
                  );
                })()}
                {/* Completion badge */}
                {completed.includes(selectedDay.day) && (
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 12,
                    fontSize: 10,
                    fontWeight: 700,
                    background: `${T.gold}15`,
                    color: T.gold,
                    border: `1px solid ${T.gold}30`,
                  }}>
                    DONE
                  </span>
                )}
              </div>
            </div>

            {/* Unlock notice */}
            {selectedDay.unlocks && (
              <div style={{
                padding: '8px 12px',
                background: `${T.gold}08`,
                border: `1px solid ${T.gold}20`,
                borderRadius: 8,
                marginBottom: 14,
                fontSize: 12,
                color: T.gold,
                fontWeight: 700,
              }}>
                Unlocks: {selectedDay.unlocks}
              </div>
            )}

            {/* Daily Phrases */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                letterSpacing: 1,
                marginBottom: 8,
              }}>
                KEY PHRASES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedDay.dailyPhrases.map((phrase, i) => (
                  <div key={i} style={{
                    padding: '10px 12px',
                    background: T.bgSecondary,
                    borderRadius: 8,
                    borderLeft: `2px solid ${WEEK_THEMES.find(w => w.week === selectedDay.weekNumber)?.color || T.gold}30`,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.5 }}>
                      {phrase.english}
                    </div>
                    <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>
                      {phrase.japanese}
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4, fontStyle: 'italic', lineHeight: 1.4 }}>
                      {phrase.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link
                href={`/english/izakaya-toeic/episodes/${selectedDay.episodeId}`}
                style={{
                  flex: 1,
                  minWidth: 140,
                  display: 'block',
                  padding: '12px 20px',
                  background: T.gold,
                  color: '#fff',
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 14,
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: T.shadowMd,
                  transition: 'opacity 0.15s',
                }}
              >
                {completed.includes(selectedDay.day)
                  ? `Day ${selectedDay.day} を復習`
                  : `Day ${selectedDay.day} を始める`
                }
              </Link>
              {!completed.includes(selectedDay.day) && (
                <button
                  onClick={() => handleMarkComplete(selectedDay.day)}
                  style={{
                    padding: '12px 20px',
                    background: T.surface,
                    color: T.textSub,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  完了にする
                </button>
              )}
            </div>
          </div>
        )}

        {/* Graduation Teaser */}
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          opacity: completed.includes(30) ? 1 : 0.7,
        }}>
          {!completed.includes(30) && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(250,250,249,0.5)',
              backdropFilter: 'blur(2px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.textMuted,
                background: T.surface,
                padding: '6px 16px',
                borderRadius: 20,
                border: `1px solid ${T.border}`,
              }}>
                Day 30 到達で解放
              </div>
            </div>
          )}
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            color: T.gold,
            marginBottom: 6,
          }}>
            DAY 30
          </div>
          <div style={{
            fontSize: 18,
            fontWeight: 800,
            color: T.text,
            marginBottom: 4,
          }}>
            マスターの秘密を知る
          </div>
          <div style={{
            fontSize: 13,
            color: T.textSub,
            lineHeight: 1.6,
          }}>
            30日間の全てを終えた者だけが聞ける、マスターの過去。
            <br />
            そしてカウンターに刻まれた、もう一つの物語。
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link
            href="/english/izakaya-toeic"
            style={{
              fontSize: 13,
              color: T.textMuted,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            居酒屋TOEICトップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
