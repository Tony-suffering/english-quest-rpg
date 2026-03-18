'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T, PART_COLORS, PART_LABELS } from '@/data/izakaya-toeic/theme';
import {
  analyzeScore,
  TOEIC_LEVELS,
  ScoreAnalysis,
  Weakness,
  Strength,
  StudyRecommendation,
} from '@/data/izakaya-toeic/score-analyzer';
import { analyzeMistakePatterns, getMistakeTrend, MistakePattern, TrendSummary } from '@/data/izakaya-toeic/mistake-tracker';
import { getProgress, ToeicProgress } from '@/data/izakaya-toeic/progress';

// ── Small helpers ─────────────────────────────────────────────────────────────

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function SeverityBadge({ severity }: { severity: Weakness['severity'] }) {
  const map = {
    critical: { label: '重大', bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
    moderate: { label: '要注意', bg: 'rgba(212,175,55,0.12)', color: '#D4AF37' },
    minor:    { label: '軽微', bg: 'rgba(168,162,158,0.15)', color: '#78716C' },
  };
  const m = map[severity];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: 20,
        background: m.bg,
        color: m.color,
      }}
    >
      {m.label}
    </span>
  );
}

function TrendIndicator({ direction }: { direction: TrendSummary['direction'] }) {
  const map = {
    improving:     { label: '改善中', color: T.green, icon: '↑' },
    stable:        { label: '安定',   color: T.gold,  icon: '→' },
    'getting-worse': { label: '悪化中', color: T.red,   icon: '↓' },
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
      <span style={{ fontSize: 15 }}>{m.icon}</span>
      {m.label}
    </span>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────

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

// ── Score Hero ────────────────────────────────────────────────────────────────

function ScoreHero({ analysis }: { analysis: ScoreAnalysis }) {
  const { estimatedListeningScore, level } = analysis;
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 6,
            }}
          >
            推定スコア (Listening)
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: level.color,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {estimatedListeningScore}
          </div>
          <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>/ 495</div>
        </div>

        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `${level.color}14`,
              border: `1px solid ${level.color}35`,
              borderRadius: 12,
              padding: '10px 16px',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: level.color,
              }}
            >
              {level.nameJa}
            </span>
            <span style={{ fontSize: 12, color: level.color, fontWeight: 600 }}>
              {level.name}
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: T.textSub,
              lineHeight: 1.6,
            }}
          >
            {level.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

// ── Progress toward next milestone ───────────────────────────────────────────

function MilestoneProgress({ analysis }: { analysis: ScoreAnalysis }) {
  const { estimatedListeningScore, nextMilestone, level } = analysis;

  // Find previous milestone score
  const prevScore = level.score;
  const nextScore = nextMilestone.score;
  const range = nextScore - prevScore;
  const progress = range > 0 ? Math.min(1, (estimatedListeningScore - prevScore) / range) : 1;
  const barPct = Math.round(progress * 100);

  return (
    <Card>
      <SectionTitle>次のマイルストーンまで</SectionTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 13, color: T.textSub }}>
          現在: <strong style={{ color: T.text }}>{estimatedListeningScore}</strong>
        </span>
        <span style={{ fontSize: 13, color: T.gold, fontWeight: 700 }}>
          目標: {nextMilestone.label} ({nextScore}点)
        </span>
      </div>

      {/* Bar */}
      <div
        style={{
          height: 10,
          background: T.bgSecondary,
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${barPct}%`,
            background: `linear-gradient(90deg, ${level.color} 0%, ${T.gold} 100%)`,
            borderRadius: 6,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
      <div
        style={{
          fontSize: 12,
          color: T.textMuted,
          marginBottom: 14,
          textAlign: 'right' as const,
        }}
      >
        {barPct}% 到達 / 残り {nextScore - estimatedListeningScore} 点
      </div>

      {/* Tips */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.textMuted,
            marginBottom: 8,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
          }}
        >
          突破のヒント
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {nextMilestone.tips.map((tip, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                fontSize: 13,
                color: T.textSub,
                lineHeight: 1.6,
                marginBottom: 6,
              }}
            >
              <span style={{ color: T.gold, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// ── Part Breakdown ────────────────────────────────────────────────────────────

function PartBreakdown({ analysis }: { analysis: ScoreAnalysis }) {
  const { partScores } = analysis;

  return (
    <Card>
      <SectionTitle>パート別スコア</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[1, 2, 3, 4].map((part) => {
          const ps = partScores[part];
          if (!ps) return null;
          const color = PART_COLORS[part];
          const acc = ps.accuracy;
          return (
            <div key={part}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: T.text }}
                >
                  {PART_LABELS[part]}
                </span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: T.textMuted }}>
                    正答率 {pct(acc)}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color,
                    }}
                  >
                    +{ps.estimatedScore}点
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 8,
                  background: T.bgSecondary,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: pct(acc),
                    background: color,
                    borderRadius: 4,
                    transition: 'width 0.5s ease',
                    opacity: 0.9,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Weakness Alert ────────────────────────────────────────────────────────────

function WeaknessAlert({ weaknesses }: { weaknesses: Weakness[] }) {
  const top3 = weaknesses.slice(0, 3);
  return (
    <Card>
      <SectionTitle>弱点アラート</SectionTitle>
      {top3.length === 0 ? (
        <p style={{ margin: 0, fontSize: 14, color: T.textSub }}>
          まだデータが足りない。エピソードを5話やってから確認しろ。
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {top3.map((w) => (
            <div
              key={w.area}
              style={{
                border: `1px solid ${
                  w.severity === 'critical'
                    ? 'rgba(239,68,68,0.2)'
                    : w.severity === 'moderate'
                    ? 'rgba(212,175,55,0.2)'
                    : T.border
                }`,
                borderRadius: 10,
                padding: '12px 14px',
                background:
                  w.severity === 'critical'
                    ? 'rgba(239,68,68,0.04)'
                    : w.severity === 'moderate'
                    ? 'rgba(212,175,55,0.04)'
                    : 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>
                  {w.areaJa}
                </span>
                <SeverityBadge severity={w.severity} />
              </div>
              <p style={{ margin: 0, fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>
                {w.description}
              </p>
              {w.suggestedEpisodes.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {w.suggestedEpisodes.map((ep) => (
                    <span
                      key={ep}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 20,
                        background: T.bgSecondary,
                        color: T.textSub,
                        border: `1px solid ${T.border}`,
                      }}
                    >
                      {ep.replace('ep-', 'EP ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ── Strengths ─────────────────────────────────────────────────────────────────

function StrengthsSection({ strengths }: { strengths: Strength[] }) {
  if (strengths.length === 0) return null;
  return (
    <Card>
      <SectionTitle>強み</SectionTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {strengths.map((s) => (
          <div
            key={s.area}
            style={{
              background: T.greenBg,
              border: `1px solid rgba(16,185,129,0.2)`,
              borderRadius: 10,
              padding: '8px 14px',
              flex: '1 1 200px',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.green,
                marginBottom: 3,
              }}
            >
              {s.areaJa}
            </div>
            <p style={{ margin: 0, fontSize: 12, color: T.textSub, lineHeight: 1.5 }}>
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Mistake Trends ────────────────────────────────────────────────────────────

function MistakeTrendsSection({
  trend,
  patterns,
}: {
  trend: TrendSummary;
  patterns: MistakePattern[];
}) {
  return (
    <Card>
      <SectionTitle>ミストレンド ({trend.periodDays}日間)</SectionTitle>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        <TrendIndicator direction={trend.direction} />
        <span style={{ fontSize: 13, color: T.textSub }}>
          ミス数: <strong style={{ color: T.text }}>{trend.totalMistakes}</strong> / {trend.totalAttempts} 問
        </span>
        {trend.totalAttempts > 0 && (
          <span style={{ fontSize: 13, color: T.textSub }}>
            正答率: <strong style={{ color: T.text }}>{pct(trend.accuracy)}</strong>
          </span>
        )}
      </div>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>
        {trend.message}
      </p>

      {patterns.length > 0 && (
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.textMuted,
              marginBottom: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
            }}
          >
            よくあるミスパターン
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {patterns.slice(0, 3).map((mp) => (
              <div
                key={mp.pattern}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: T.bgSecondary,
                  borderRadius: 8,
                  border: `1px solid ${T.border}`,
                }}
              >
                <span
                  style={{
                    minWidth: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: T.red + '18',
                    color: T.red,
                    fontSize: 12,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {mp.count}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>
                    {mp.patternJa}
                  </div>
                </div>
                <TrendIndicator direction={mp.trend === 'getting-worse' ? 'getting-worse' : mp.trend === 'improving' ? 'improving' : 'stable'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

// ── Study Plan ────────────────────────────────────────────────────────────────

function StudyPlanSection({ plan }: { plan: StudyRecommendation[] }) {
  const priorityColors: Record<number, string> = {
    1: T.red,
    2: T.gold,
    3: T.blue,
  };
  const priorityLabels: Record<number, string> = {
    1: '最優先',
    2: '次に',
    3: '余裕があれば',
  };

  return (
    <Card>
      <SectionTitle>学習プラン</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plan.map((rec, i) => {
          const color = priorityColors[rec.priority] ?? T.blue;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 16px',
                background: `${color}07`,
                border: `1px solid ${color}20`,
                borderRadius: 12,
                alignItems: 'flex-start',
              }}
            >
              {/* Priority circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: color,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {rec.priority}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    marginBottom: 6,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color,
                      background: `${color}15`,
                      borderRadius: 20,
                      padding: '2px 8px',
                    }}
                  >
                    {priorityLabels[rec.priority]}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: T.green,
                      background: T.greenBg,
                      borderRadius: 20,
                      padding: '2px 8px',
                    }}
                  >
                    {rec.estimatedGain}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: T.textMuted,
                    }}
                  >
                    期間目安: {rec.timeNeeded}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: T.textSub, lineHeight: 1.7 }}>
                  {rec.action}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Level Timeline ────────────────────────────────────────────────────────────

function LevelTimeline({ currentScore }: { currentScore: number }) {
  const current = TOEIC_LEVELS.findLast((l) => currentScore >= l.score) ?? TOEIC_LEVELS[0];

  return (
    <Card>
      <SectionTitle>レベルロードマップ</SectionTitle>
      <div style={{ position: 'relative', paddingBottom: 8 }}>
        {/* Connecting line */}
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 18,
            bottom: 24,
            width: 2,
            background: T.border,
            zIndex: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TOEIC_LEVELS.map((lvl, i) => {
            const reached = currentScore >= lvl.score;
            const isCurrent = lvl.score === current.score;
            const isNext =
              !reached &&
              i > 0 &&
              currentScore >= TOEIC_LEVELS[i - 1].score;

            return (
              <div
                key={lvl.score}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  paddingBottom: 16,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Node circle */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: reached ? lvl.color : T.bgSecondary,
                    border: `2px solid ${reached ? lvl.color : T.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isCurrent ? `0 0 0 3px ${lvl.color}30` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {reached ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7l3 3 5-6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: isNext ? lvl.color : T.border,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: 6 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: isCurrent ? 800 : 600,
                        color: reached ? lvl.color : T.textMuted,
                      }}
                    >
                      {lvl.nameJa}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: T.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      {lvl.score > 0 ? `${lvl.score}点〜` : '0〜399点'}
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          background: `${lvl.color}18`,
                          color: lvl.color,
                          borderRadius: 20,
                          padding: '1px 8px',
                          border: `1px solid ${lvl.color}30`,
                        }}
                      >
                        現在地
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: reached ? T.textSub : T.textMuted,
                      lineHeight: 1.5,
                    }}
                  >
                    {lvl.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      style={{
        maxWidth: 480,
        margin: '80px auto',
        textAlign: 'center' as const,
        padding: '0 20px',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: T.goldBg,
          border: `2px solid ${T.goldBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" stroke={T.gold} strokeWidth="2" />
          <path d="M14 9v6M14 18v1" stroke={T.gold} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h2 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: T.text }}>
        まだデータがない
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: T.textSub, lineHeight: 1.7 }}>
        スコア分析にはエピソードを最低1話完走する必要がある。まずやれ。やればデータが貯まる。貯まれば弱点が見える。
      </p>
      <Link
        href="/english/izakaya-toeic/episodes/ep-001"
        style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: T.gold,
          color: '#fff',
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 12,
          textDecoration: 'none',
          boxShadow: T.goldGlow,
        }}
      >
        Episode 1 を始める
      </Link>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ScorePage() {
  const [analysis, setAnalysis] = useState<ScoreAnalysis | null>(null);
  const [trend, setTrend] = useState<TrendSummary | null>(null);
  const [mistakePatterns, setMistakePatterns] = useState<MistakePattern[]>([]);
  const [progress, setProgress] = useState<ToeicProgress | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prog = getProgress();
    setProgress(prog);

    const hasData = prog.totalAttempted > 0;
    if (hasData) {
      setAnalysis(analyzeScore(prog));
    }

    setTrend(getMistakeTrend(14));
    setMistakePatterns(analyzeMistakePatterns());
    setLoaded(true);
  }, []);

  const hasData = progress && progress.totalAttempted > 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: T.bg,
        color: T.text,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Back link */}
        <Link
          href="/english/izakaya-toeic"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: T.textMuted,
            textDecoration: 'none',
            marginBottom: 28,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 11L5 7l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          居酒屋TOEICに戻る
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              margin: '0 0 6px',
              fontSize: 26,
              fontWeight: 800,
              color: T.text,
              letterSpacing: '-0.02em',
            }}
          >
            スコア分析
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: T.textSub }}>
            これまでの学習データから弱点と改善ポイントを割り出す。
          </p>
        </div>

        {!loaded ? (
          // Loading state
          <div style={{ textAlign: 'center', padding: '80px 0', color: T.textMuted }}>
            読み込み中...
          </div>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          analysis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Score Hero */}
              <ScoreHero analysis={analysis} />

              {/* Two-column row: Progress + Part breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 16,
                }}
              >
                <MilestoneProgress analysis={analysis} />
                <PartBreakdown analysis={analysis} />
              </div>

              {/* Weakness Alert */}
              <WeaknessAlert weaknesses={analysis.weaknesses} />

              {/* Strengths (only if any) */}
              {analysis.strengths.length > 0 && (
                <StrengthsSection strengths={analysis.strengths} />
              )}

              {/* Mistake Trends */}
              {trend && (
                <MistakeTrendsSection trend={trend} patterns={mistakePatterns} />
              )}

              {/* Study Plan */}
              <StudyPlanSection plan={analysis.studyPlan} />

              {/* Level Timeline */}
              <LevelTimeline currentScore={analysis.estimatedListeningScore} />

            </div>
          )
        )}
      </div>
    </div>
  );
}
