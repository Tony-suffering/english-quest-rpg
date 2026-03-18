'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T, PART_COLORS, PART_LABELS } from '@/data/izakaya-toeic/theme';
import {
  getMistakeHistory,
  analyzeMistakePatterns,
  getMistakeTrend,
  MistakeRecord,
  MistakePattern,
  TrendSummary,
} from '@/data/izakaya-toeic/mistake-tracker';

// ── Helpers ──────────────────────────────────────────────────────────────────

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

// ── Reusable components ──────────────────────────────────────────────────────

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: '20px 22px',
        boxShadow: T.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 800,
        color: T.textMuted,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function TrendBadge({ direction }: { direction: TrendSummary['direction'] }) {
  const map = {
    improving: { label: '改善中', color: T.green, icon: '^' },
    stable: { label: '安定', color: T.gold, icon: '-' },
    'getting-worse': { label: '悪化中', color: T.red, icon: 'v' },
  };
  const m = map[direction];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 700,
        color: m.color,
        background: `${m.color}12`,
        border: `1px solid ${m.color}30`,
        borderRadius: 20,
        padding: '3px 10px',
      }}
    >
      <span style={{ fontSize: 15, fontFamily: 'monospace' }}>{m.icon}</span>
      {m.label}
    </span>
  );
}

// ── Master Quote ─────────────────────────────────────────────────────────────

function MasterQuote({ quote }: { quote: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: T.goldBg,
        border: `1px solid ${T.goldBorder}`,
        borderLeftWidth: 3,
        borderLeftColor: T.gold,
        borderRadius: 12,
        padding: '14px 18px',
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#78716C12',
          border: '2px solid #78716C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: 10,
          color: '#78716C',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        権
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.textMuted,
            marginBottom: 2,
          }}
        >
          マスター
        </div>
        <p
          style={{
            fontSize: 14,
            color: T.textSub,
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          {quote}
        </p>
      </div>
    </div>
  );
}

// ── Overview Stats ───────────────────────────────────────────────────────────

function OverviewStats({
  records,
  patterns,
  trend,
}: {
  records: MistakeRecord[];
  patterns: MistakePattern[];
  trend: TrendSummary;
}) {
  const mistakes = records.filter((r) => !r.wasCorrect);
  const totalMistakes = mistakes.length;

  // Most common trap type
  const topPattern = patterns.length > 0 ? patterns[0] : null;

  // Weakest Part
  const partCounts: Record<number, number> = {};
  for (const m of mistakes) {
    partCounts[m.part] = (partCounts[m.part] || 0) + 1;
  }
  const weakestPart = Object.entries(partCounts).sort(
    (a, b) => Number(b[1]) - Number(a[1]),
  )[0];

  const stats = [
    {
      label: '累計ミス',
      value: totalMistakes.toString(),
      sub: `/ ${records.length} 問中`,
      color: T.red,
    },
    {
      label: '最多パターン',
      value: topPattern ? topPattern.patternJa : '--',
      sub: topPattern ? `${topPattern.count}回` : '',
      color: T.orange,
    },
    {
      label: '弱点Part',
      value: weakestPart
        ? PART_LABELS[Number(weakestPart[0])] || `Part ${weakestPart[0]}`
        : '--',
      sub: weakestPart ? `${weakestPart[1]}ミス` : '',
      color: weakestPart
        ? PART_COLORS[Number(weakestPart[0])] || T.blue
        : T.blue,
    },
    {
      label: '正答率',
      value: trend.totalAttempts > 0 ? pct(trend.accuracy) : '--',
      sub: trend.totalAttempts > 0 ? `過去${trend.periodDays}日間` : '',
      color: T.green,
    },
  ];

  return (
    <Card>
      <SectionTitle>Overview</SectionTitle>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              padding: '14px 16px',
              background: T.bg,
              borderRadius: 12,
              border: `1px solid ${T.borderLight}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                letterSpacing: '0.05em',
                marginBottom: 6,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: s.value.length > 8 ? 16 : 28,
                fontWeight: 900,
                color: s.color,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </div>
            {s.sub && (
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>
                {s.sub}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Pattern Analysis ─────────────────────────────────────────────────────────

function PatternAnalysis({ patterns }: { patterns: MistakePattern[] }) {
  if (patterns.length === 0) {
    return (
      <Card>
        <SectionTitle>Mistake Patterns</SectionTitle>
        <p style={{ fontSize: 14, color: T.textMuted, margin: 0 }}>
          まだデータがない。エピソードを解いてこい。
        </p>
      </Card>
    );
  }

  const maxCount = patterns[0].count;

  return (
    <Card>
      <SectionTitle>Mistake Patterns</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {patterns.map((p) => {
          const barWidth = maxCount > 0 ? (p.count / maxCount) * 100 : 0;
          const trendMap = {
            improving: { color: T.green, label: '改善中' },
            stable: { color: T.textMuted, label: '安定' },
            'getting-worse': { color: T.red, label: '悪化' },
          };
          const tr = trendMap[p.trend];

          return (
            <div
              key={p.pattern}
              style={{
                padding: '12px 14px',
                background: T.bg,
                borderRadius: 10,
                border: `1px solid ${T.borderLight}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{ fontSize: 14, fontWeight: 700, color: T.text }}
                  >
                    {p.patternJa}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: tr.color,
                      background: `${tr.color}12`,
                      padding: '1px 7px',
                      borderRadius: 10,
                    }}
                  >
                    {tr.label}
                  </span>
                </div>
                <span
                  style={{ fontSize: 20, fontWeight: 900, color: T.red }}
                >
                  {p.count}
                </span>
              </div>

              {/* Bar */}
              <div
                style={{
                  height: 6,
                  background: `${T.red}15`,
                  borderRadius: 3,
                  marginBottom: 8,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: T.red,
                    borderRadius: 3,
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: T.textSub,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {p.advice}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Trend Chart ──────────────────────────────────────────────────────────────

function TrendChart({ records }: { records: MistakeRecord[] }) {
  // Group by day (last 14 days)
  const now = new Date();
  const days: { label: string; total: number; mistakes: number }[] = [];

  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const dayRecords = records.filter((r) => {
      const ts = new Date(r.timestamp).getTime();
      return ts >= dayStart && ts < dayEnd;
    });
    days.push({
      label: key,
      total: dayRecords.length,
      mistakes: dayRecords.filter((r) => !r.wasCorrect).length,
    });
  }

  const maxTotal = Math.max(...days.map((d) => d.total), 1);

  return (
    <Card>
      <SectionTitle>14-Day Trend</SectionTitle>
      {records.length === 0 ? (
        <p style={{ fontSize: 14, color: T.textMuted, margin: 0 }}>
          データなし
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            height: 120,
            padding: '0 4px',
          }}
        >
          {days.map((d, i) => {
            const totalH = (d.total / maxTotal) * 100;
            const mistakeH = d.total > 0 ? (d.mistakes / d.total) * totalH : 0;
            const correctH = totalH - mistakeH;

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: 100,
                  }}
                >
                  {d.total > 0 && (
                    <>
                      <div
                        style={{
                          height: correctH,
                          background: T.green,
                          borderRadius: '4px 4px 0 0',
                          minHeight: correctH > 0 ? 2 : 0,
                        }}
                      />
                      <div
                        style={{
                          height: mistakeH,
                          background: T.red,
                          borderRadius:
                            correctH > 0 ? '0 0 4px 4px' : '4px',
                          minHeight: mistakeH > 0 ? 2 : 0,
                        }}
                      />
                    </>
                  )}
                  {d.total === 0 && (
                    <div
                      style={{
                        height: 2,
                        background: T.borderLight,
                        borderRadius: 1,
                        alignSelf: 'stretch',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    color: T.textMuted,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 12,
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: T.green,
            }}
          />
          <span style={{ fontSize: 11, color: T.textMuted }}>正解</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: T.red,
            }}
          />
          <span style={{ fontSize: 11, color: T.textMuted }}>ミス</span>
        </div>
      </div>
    </Card>
  );
}

// ── Recent Mistakes ──────────────────────────────────────────────────────────

function RecentMistakes({ records }: { records: MistakeRecord[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mistakes = records
    .filter((r) => !r.wasCorrect)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 20);

  if (mistakes.length === 0) {
    return (
      <Card>
        <SectionTitle>Recent Mistakes</SectionTitle>
        <p style={{ fontSize: 14, color: T.textMuted, margin: 0 }}>
          間違いゼロ。完璧か、まだやっていないかのどちらかだ。
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <SectionTitle>Recent Mistakes</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {mistakes.map((m, i) => {
          const key = `${m.questionId}-${m.timestamp}-${i}`;
          const isExpanded = expandedId === key;
          const date = new Date(m.timestamp);
          const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          const partColor =
            PART_COLORS[m.part] || T.textMuted;

          return (
            <div
              key={key}
              style={{
                background: T.bg,
                borderRadius: 10,
                border: `1px solid ${T.borderLight}`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onClick={() => setExpandedId(isExpanded ? null : key)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                }}
              >
                {/* Part badge */}
                <div
                  style={{
                    width: 36,
                    height: 24,
                    borderRadius: 6,
                    background: `${partColor}14`,
                    border: `1px solid ${partColor}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    color: partColor,
                    flexShrink: 0,
                  }}
                >
                  P{m.part}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m.episodeId} -- Q: {m.questionId}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>
                    {m.skillTag}
                    {m.trapType ? ` / ${m.trapType}` : ''}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: T.textMuted,
                    flexShrink: 0,
                  }}
                >
                  {dateStr}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    color: T.textMuted,
                    flexShrink: 0,
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  v
                </div>
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: '0 14px 12px',
                    borderTop: `1px solid ${T.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    <div
                      style={{
                        padding: '8px 12px',
                        background: `${T.red}08`,
                        borderRadius: 8,
                        border: `1px solid ${T.red}20`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: T.red,
                          marginBottom: 3,
                        }}
                      >
                        SKILL TAG
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: T.text,
                        }}
                      >
                        {m.skillTag}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: '8px 12px',
                        background: `${T.orange}08`,
                        borderRadius: 8,
                        border: `1px solid ${T.orange}20`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: T.orange,
                          marginBottom: 3,
                        }}
                      >
                        TRAP TYPE
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: T.text,
                        }}
                      >
                        {m.trapType || '--'}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: T.textSub,
                      marginTop: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    Episode: {m.episodeId} / Question: {m.questionId} / Part{' '}
                    {m.part}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function MistakesPage() {
  const [records, setRecords] = useState<MistakeRecord[]>([]);
  const [patterns, setPatterns] = useState<MistakePattern[]>([]);
  const [trend, setTrend] = useState<TrendSummary | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const all = getMistakeHistory();
    setRecords(all);
    setPatterns(analyzeMistakePatterns());
    setTrend(getMistakeTrend(14));
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  // Dynamic master quote
  const masterQuote =
    records.length === 0
      ? '間違いノートか。まだ白紙だな。まず5エピソードやってから見せろ。'
      : trend && trend.direction === 'improving'
        ? '間違いが減ってきてるな。いい傾向だ。油断するなよ。'
        : trend && trend.direction === 'getting-worse'
          ? '最近ミスが増えてるぞ。疲れてるのか？ パターンを分析して弱点を潰せ。'
          : '間違いを記録するだけでは意味がない。パターンを見て、同じ罠にハマるな。';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: T.bg,
        padding: '20px 16px 60px',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}
        >
          <Link
            href="/english/izakaya-toeic"
            style={{
              fontSize: 13,
              color: T.textMuted,
              textDecoration: 'none',
            }}
          >
            居酒屋TOEIC
          </Link>
          <span style={{ fontSize: 12, color: T.textMuted }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>
            間違いノート
          </span>
        </div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: T.text,
            margin: '0 0 6px',
            letterSpacing: '-0.02em',
          }}
        >
          間違いノート
        </h1>
        <p
          style={{
            fontSize: 13,
            color: T.textSub,
            margin: '0 0 20px',
            lineHeight: 1.6,
          }}
        >
          ミスのパターンを分析して弱点を可視化する
        </p>

        {/* Master quote */}
        <MasterQuote quote={masterQuote} />

        {/* Overview */}
        <div style={{ marginBottom: 16 }}>
          <OverviewStats
            records={records}
            patterns={patterns}
            trend={trend!}
          />
        </div>

        {/* Trend chart */}
        <div style={{ marginBottom: 16 }}>
          <TrendChart records={records} />
        </div>

        {/* Trend summary */}
        {trend && trend.totalAttempts > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.text,
                    marginBottom: 4,
                  }}
                >
                  トレンド判定
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: T.textSub,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {trend.message}
                </p>
              </div>
              <TrendBadge direction={trend.direction} />
            </div>
          </Card>
        )}

        {/* Pattern analysis */}
        <div style={{ marginBottom: 16 }}>
          <PatternAnalysis patterns={patterns} />
        </div>

        {/* Recent mistakes */}
        <div style={{ marginBottom: 24 }}>
          <RecentMistakes records={records} />
        </div>

        {/* Practice button */}
        {patterns.length > 0 && (
          <Link
            href={`/english/izakaya-toeic/drills?focus=${patterns[0]?.pattern || ''}`}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px 24px',
              background: T.gold,
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 800,
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: T.goldGlow,
              letterSpacing: '0.02em',
              transition: 'all 0.2s',
              marginBottom: 16,
            }}
          >
            弱点を集中トレーニング
          </Link>
        )}

        {/* Back link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/english/izakaya-toeic"
            style={{
              fontSize: 13,
              color: T.textMuted,
              textDecoration: 'none',
            }}
          >
            居酒屋TOEICトップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
