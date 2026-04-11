'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { JOURNEY_ARTICLES } from '@/data/noren/journey-articles';

/* ================================================================
   Design Tokens
   ================================================================ */

const C = {
  gold: '#D4AF37',
  goldMuted: '#B8972E',
  emerald: '#10B981',
  white: '#FFFFFF',
  s50: '#FAFAF9',
  s100: '#F5F5F4',
  s200: '#E7E5E4',
  s300: '#D6D3D1',
  s400: '#A8A29E',
  s500: '#78716C',
  s600: '#57534E',
  s700: '#44403C',
  s800: '#292524',
  s900: '#1C1917',
} as const;

const FONT = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/* ================================================================
   Data Processing
   ================================================================ */

function getDaysBetween(start: string, end: string): number {
  return Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 86400000);
}


// Build heatmap grid: 9 weeks x 7 days
function buildHeatmap(articles: typeof JOURNEY_ARTICLES) {
  const published = articles.filter(a => a.published);
  if (published.length === 0) return { grid: [], startDate: '' };

  const sorted = [...published].sort((a, b) => a.date.localeCompare(b.date));
  const startDate = sorted[0].date;

  // Count articles per date
  const countByDate: Record<string, number> = {};
  for (const a of sorted) {
    countByDate[a.date] = (countByDate[a.date] || 0) + 1;
  }

  // Build grid from startDate for 9 weeks
  const grid: { date: string; count: number; weekday: number; weekIndex: number }[] = [];
  const start = new Date(startDate);
  // Align to Monday
  const dayOfWeek = start.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  start.setDate(start.getDate() + mondayOffset);

  for (let week = 0; week < 9; week++) {
    for (let day = 0; day < 7; day++) {
      const d = new Date(start);
      d.setDate(d.getDate() + week * 7 + day);
      const dateStr = d.toISOString().split('T')[0];
      grid.push({
        date: dateStr,
        count: countByDate[dateStr] || 0,
        weekday: day,
        weekIndex: week,
      });
    }
  }

  return { grid, startDate };
}

// Group articles into phases by date clusters and topic shifts
function getPhases(articles: typeof JOURNEY_ARTICLES) {
  const published = articles.filter(a => a.published);
  const sorted = [...published].sort((a, b) => a.date.localeCompare(b.date));

  const phases = [
    { label: '発見', labelEn: 'DISCOVERY', range: ['2026-02-14', '2026-02-24'], color: '#3B82F6' },
    { label: '構築', labelEn: 'BUILDING', range: ['2026-02-25', '2026-03-09'], color: '#10B981' },
    { label: '深化', labelEn: 'DEEPENING', range: ['2026-03-10', '2026-03-22'], color: '#8B5CF6' },
    { label: '実験', labelEn: 'EXPERIMENT', range: ['2026-03-23', '2026-04-02'], color: '#F59E0B' },
    { label: '哲学', labelEn: 'PHILOSOPHY', range: ['2026-04-03', '2026-04-11'], color: '#EF4444' },
  ];

  return phases.map(phase => ({
    ...phase,
    articles: sorted.filter(a => a.date >= phase.range[0] && a.date <= phase.range[1]),
  }));
}

/* ================================================================
   Components
   ================================================================ */


function StatBlock({ value, label, color }: { value: string | number; label: string; color?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 900,
          color: color || C.white,
          fontFamily: FONT,
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: C.s400,
          fontFamily: FONT,
          marginTop: 6,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */

export default function JourneyPage() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const published = useMemo(() => JOURNEY_ARTICLES.filter(a => a.published), []);
  const sorted = useMemo(() => [...published].sort((a, b) => a.date.localeCompare(b.date)), [published]);
  const heatmap = useMemo(() => buildHeatmap(JOURNEY_ARTICLES), []);
  const phases = useMemo(() => getPhases(JOURNEY_ARTICLES), []);

  const totalDays = sorted.length > 0
    ? getDaysBetween(sorted[0].date, sorted[sorted.length - 1].date) + 1
    : 0;
  const avgPerDay = totalDays > 0 ? (published.length / totalDays).toFixed(1) : '0';

  // Unique dates with articles
  const activeDays = new Set(sorted.map(a => a.date)).size;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.s900,
        fontFamily: FONT,
      }}
    >
      {/* ── Hero Header ── */}
      <header
        style={{
          padding: 'clamp(48px, 8vw, 96px) 24px clamp(40px, 6vw, 64px)',
          textAlign: 'center',
          background: `linear-gradient(180deg, ${C.s900} 0%, #1a1714 100%)`,
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Subtitle */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.gold,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            NOTE JOURNEY
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 'clamp(24px, 4.5vw, 40px)',
              fontWeight: 900,
              color: C.white,
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            tonio_english
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              fontWeight: 500,
              color: C.s400,
              margin: '0 0 48px',
              lineHeight: 1.6,
            }}
          >
            建設会社の社長が英語について毎日書き続けた記録
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(24px, 5vw, 56px)',
              flexWrap: 'wrap',
            }}
          >
            <StatBlock value={published.length} label="articles" color={C.gold} />
            <StatBlock value={totalDays} label="days" />
            <StatBlock value={avgPerDay} label="per day" />
            <StatBlock value={activeDays} label="active days" />
          </div>
        </div>
      </header>

      {/* ── Heatmap Section ── */}
      <section
        style={{
          padding: 'clamp(32px, 5vw, 56px) 24px',
          background: C.s900,
          borderTop: `1px solid ${C.s800}`,
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.s500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Writing Frequency
          </div>

          {/* Heatmap grid - rows=days, columns=weeks */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(7, 1fr)',
              gridAutoFlow: 'column',
              gridAutoColumns: '1fr',
              gap: 3,
              maxWidth: 'min(100%, 520px)',
              aspectRatio: '9 / 7',
            }}
          >
            {heatmap.grid.map((cell, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 3,
                  background: cell.count > 0 ? C.gold : C.s800,
                  opacity: cell.count === 0 ? 0.3 : cell.count === 1 ? 0.5 : cell.count === 2 ? 0.75 : 1,
                }}
                title={`${cell.date}: ${cell.count}本`}
              />
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 14,
              justifyContent: 'flex-end',
            }}
          >
            <span style={{ fontSize: 10, color: C.s500, fontFamily: FONT }}>少</span>
            {[0.3, 0.5, 0.75, 1].map((op, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: i === 0 ? C.s800 : C.gold,
                  opacity: op,
                }}
              />
            ))}
            <span style={{ fontSize: 10, color: C.s500, fontFamily: FONT }}>多</span>
          </div>
        </div>
      </section>

      {/* ── Phases Section ── */}
      <section
        style={{
          padding: 'clamp(32px, 5vw, 56px) 24px',
          background: '#1a1714',
          borderTop: `1px solid ${C.s800}`,
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.s500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            Evolution
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {phases.map((phase, pi) => {
              const isExpanded = expandedPhase === pi;
              return (
                <div key={pi}>
                  {/* Phase header - clickable */}
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : pi)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 18px',
                      background: isExpanded ? `${phase.color}10` : C.s800 + '80',
                      border: `1px solid ${isExpanded ? phase.color + '40' : C.s700}`,
                      borderRadius: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    {/* Phase color dot */}
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: phase.color,
                        flexShrink: 0,
                      }}
                    />

                    {/* Phase info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            color: C.white,
                            fontFamily: FONT,
                          }}
                        >
                          {phase.label}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.s500,
                            fontFamily: FONT,
                            letterSpacing: '0.08em',
                          }}
                        >
                          {phase.labelEn}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: C.s400,
                          fontFamily: FONT,
                          marginTop: 2,
                        }}
                      >
                        {phase.articles.length}本 -- {phase.range[0].slice(5)} ~ {phase.range[1].slice(5)}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div
                      style={{
                        width: 60,
                        height: 4,
                        background: C.s700,
                        borderRadius: 99,
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(100, (phase.articles.length / published.length) * 100 * 3)}%`,
                          background: phase.color,
                          borderRadius: 99,
                        }}
                      />
                    </div>

                    {/* Chevron */}
                    <span
                      style={{
                        fontSize: 14,
                        color: C.s500,
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}
                    >
                      {'>'}
                    </span>
                  </button>

                  {/* Expanded article list */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '12px 0 0 34px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      {phase.articles.map((article) => (
                        <a
                          key={article.id}
                          href={article.noteUrl || '#'}
                          target={article.noteUrl ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 10,
                            padding: '8px 12px',
                            borderRadius: 8,
                            textDecoration: 'none',
                            background: 'transparent',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = C.s800; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              color: C.s500,
                              fontFamily: FONT,
                              flexShrink: 0,
                              minWidth: 40,
                            }}
                          >
                            #{article.id}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              color: article.noteUrl ? C.s300 : C.s500,
                              fontFamily: FONT,
                              lineHeight: 1.5,
                            }}
                          >
                            {article.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Recent Articles ── */}
      <section
        style={{
          padding: 'clamp(32px, 5vw, 56px) 24px',
          background: C.s900,
          borderTop: `1px solid ${C.s800}`,
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.s500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Latest
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sorted.slice(-10).reverse().map((article) => (
              <a
                key={article.id}
                href={article.noteUrl || '#'}
                target={article.noteUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.s800; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: C.s500,
                    fontFamily: FONT,
                    flexShrink: 0,
                    minWidth: 48,
                  }}
                >
                  {article.date.slice(5)}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: article.noteUrl ? C.s200 : C.s500,
                    fontFamily: FONT,
                    lineHeight: 1.5,
                  }}
                >
                  {article.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '48px 24px 64px',
          textAlign: 'center',
          borderTop: `1px solid ${C.s800}`,
          background: C.s900,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: C.s500,
            fontFamily: FONT,
            margin: '0 0 16px',
            letterSpacing: '0.04em',
          }}
        >
          {published.length}本。{totalDays}日。まだ歩いてる。
        </p>
        <a
          href="https://note.com/tonio_english"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: C.gold,
            color: C.s900,
            fontWeight: 700,
            fontFamily: FONT,
            fontSize: 13,
            borderRadius: 10,
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          note で読む
        </a>

        <div style={{ marginTop: 32 }}>
          <Link
            href="/english/noren"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: C.s500,
              fontFamily: FONT,
              textDecoration: 'none',
            }}
          >
            のれん一覧に戻る
          </Link>
        </div>
      </footer>
    </div>
  );
}
