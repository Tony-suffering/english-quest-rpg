'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import { getProgress, ToeicProgress, isEpisodeCompleted } from '@/data/izakaya-toeic/progress';
import { T } from '@/data/izakaya-toeic/theme';
import { calculateRank } from '@/data/izakaya-toeic/ranking';
import {
  THIRTY_DAY_PLAN,
  WEEK_THEMES,
  DayPlan,
  getCompletedDays,
  markDayComplete,
  getStreakDays,
  getProgramProgress,
} from '@/data/izakaya-toeic/thirty-day-plan';
import InstantPlay from './InstantPlay';
import ScoreImpact from './ScoreImpact';

const CHAR_READ_KEY = 'izakaya_characters_read';

// Character taglines
const CHAR_TAGLINES: Record<string, string> = {
  master: '全てを見てきた男',
  yuki: '笑いながら泣いてる主人公',
  takeshi: 'ポジティブの暴力',
  lisa: 'ネイティブの壁を知る女',
  kenji: '部下のために戦うおっさん',
  mina: '天然リスニングモンスター',
};

const OUTPUT_TYPE_LABELS: Record<string, { label: string; color: string; izakaya: string }> = {
  shadow:     { label: 'Shadow',     color: '#D4AF37', izakaya: '聞き酒' },
  speak:      { label: 'Speak',      color: '#10B981', izakaya: '注文練習' },
  write:      { label: 'Write',      color: '#3B82F6', izakaya: 'お品書き' },
  paraphrase: { label: 'Paraphrase', color: '#8B5CF6', izakaya: '言い換え' },
  review:     { label: 'Review',     color: '#EF4444', izakaya: '〆の一杯' },
};

function getRecommendedDay(completed: number[]): number {
  for (let d = 1; d <= 30; d++) {
    if (!completed.includes(d)) return d;
  }
  return 30;
}

function estimateScore(completed: number[]): number {
  if (completed.length === 0) return 0;
  return Math.min(495, 300 + completed.length * 10);
}

export default function IzakayaToeicPage() {
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [progress, setProgress] = useState<ToeicProgress | null>(null);
  const [hasReadChars, setHasReadChars] = useState(true);
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0); // 0=not started, 1=chars, 2=calendar, 3=start
  const [rankInfo, setRankInfo] = useState<ReturnType<typeof calculateRank> | null>(null);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
    setRankInfo(calculateRank());
    const charsRead = localStorage.getItem(CHAR_READ_KEY) === 'true';
    setHasReadChars(charsRead);
    const c = getCompletedDays();
    setCompleted(c);
    const rec = getRecommendedDay(c);
    const plan = THIRTY_DAY_PLAN.find(d => d.day === rec);
    if (plan) setSelectedDay(plan);
    // Auto-start onboarding for first-time users
    if (!charsRead && c.length === 0) {
      setOnboardingStep(1);
    }
  }, []);

  const handleMarkComplete = useCallback((day: number) => {
    markDayComplete(day);
    setCompleted(getCompletedDays());
  }, []);

  const nextEpisode = EPISODES.find(ep => !isEpisodeCompleted(ep.id)) || EPISODES[0];
  const completedCount = progress ? Object.keys(progress.completedEpisodes).length : 0;
  const nextDay = THIRTY_DAY_PLAN.find(d => d.episodeId === nextEpisode.id)?.day || 1;
  const isReturning = completedCount > 0;
  const mustReadChars = !isReturning && !hasReadChars;

  const programProgress = mounted ? getProgramProgress() : { completed: 0, total: 30 as const, percentage: 0 };
  const streak = mounted ? getStreakDays() : 0;
  const score = mounted ? estimateScore(completed) : 0;
  const recommended = mounted ? getRecommendedDay(completed) : 1;

  // Calendar grid
  const filteredDays = activeWeek
    ? THIRTY_DAY_PLAN.filter(d => d.weekNumber === activeWeek)
    : THIRTY_DAY_PLAN;
  const gridDays: (DayPlan | null)[] = [];
  if (!activeWeek) {
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
    for (let i = 0; i < 7; i++) {
      gridDays.push(filteredDays[i] || null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* ====== HERO ====== */}
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 40%, ${T.bg} 100%)`,
        position: 'relative',
      }}>
        <div style={{
          padding: '4px 16px',
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: 20,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 20,
        }}>
          TOEIC LISTENING -- 30夜で卒業
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 10vw, 56px)',
          fontWeight: 900,
          margin: '0 0 8px',
          letterSpacing: -2,
          lineHeight: 1.1,
        }}>
          <span style={{ color: '#92400E' }}>居酒屋</span>
          <span style={{ color: T.gold }}>TOEIC</span>
        </h1>

        <p style={{
          fontSize: 14, color: T.textMuted, margin: '0 0 8px', fontStyle: 'italic',
          letterSpacing: 2,
        }}>
          路地裏の居酒屋「のれん」
        </p>

        {/* Group portrait */}
        <div style={{
          width: 200, height: 200, margin: '0 auto 20px',
          borderRadius: '50%', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: `3px solid rgba(212,175,55,0.3)`,
        }}>
          <img
            src="/izakaya-scenes/group-portrait.png"
            alt="のれんの常連たち"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <p style={{
          fontSize: 16, color: T.textSub, maxWidth: 400,
          margin: '0 auto 24px', lineHeight: 2, fontWeight: 500,
        }}>
          TOEIC 480点のおっさんが、部下のために泣きながら勉強してる。
          <br />
          860点の帰国子女が、プライドを砕かれてる。
          <br />
          <span style={{ color: T.text, fontWeight: 700 }}>
            あなたは、どこから始める？
          </span>
        </p>

        {/* ====== STEP-BY-STEP ROADMAP ====== */}
        <div style={{
          maxWidth: 360, width: '100%', margin: '0 auto 24px',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {[
            { step: 1, label: 'STEP 1', title: '常連たちに会う', sub: '6人のキャラを読む（TOEIC読解練習）', href: '/english/izakaya-toeic/characters', done: hasReadChars },
            { step: 2, label: 'STEP 2', title: 'のれん30夜を確認', sub: '30日カレンダーで全体を把握', href: '#calendar', done: completed.length > 0 },
            { step: 3, label: 'STEP 3', title: `第${nextDay}夜を始める`, sub: 'エピソードでリスニング特訓', href: `/english/izakaya-toeic/episodes/${nextEpisode.id}`, done: isReturning },
          ].map((s, i) => {
            const isActive = onboardingStep === s.step;
            const isPast = s.done;
            return (
              <div key={s.step}>
                {/* Connector line */}
                {i > 0 && (
                  <div style={{
                    width: 2, height: 16, background: isPast ? T.gold : T.border,
                    margin: '0 auto',
                  }} />
                )}
                <Link
                  href={s.href}
                  onClick={s.href === '#calendar' ? (e) => {
                    e.preventDefault();
                    document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' });
                    setOnboardingStep(2);
                  } : undefined}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '12px 16px', borderRadius: 12,
                    background: isActive ? `${T.gold}10` : isPast ? T.surface : T.surface,
                    border: `2px solid ${isActive ? T.gold : isPast ? T.gold + '40' : T.border}`,
                    textDecoration: 'none', color: T.text,
                    boxShadow: isActive ? `0 4px 20px ${T.gold}25` : T.shadow,
                    transition: 'all 0.2s',
                    animation: isActive ? 'izk-pulse 2s ease-in-out infinite' : undefined,
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: isPast ? T.gold : isActive ? `${T.gold}20` : T.bgSecondary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 14,
                    color: isPast ? '#fff' : isActive ? T.gold : T.textMuted,
                    flexShrink: 0,
                  }}>
                    {isPast ? 'O' : s.step}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: 2, marginBottom: 2,
                      color: isActive ? T.gold : T.textMuted,
                    }}>
                      {s.label}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>{s.sub}</div>
                  </div>
                  <span style={{
                    fontSize: 16, color: isActive ? T.gold : T.textMuted, fontWeight: 600,
                  }}>{'>'}</span>
                </Link>
              </div>
            );
          })}
        </div>

        {isReturning && (
          <div style={{ fontSize: 12, color: T.textMuted }}>
            {completedCount}/{EPISODES.length} 杯目
          </div>
        )}

        <div style={{
          position: 'absolute', bottom: 24,
          fontSize: 11, color: T.textMuted + '80',
          animation: 'izk-bounce 2s ease infinite',
          letterSpacing: 1,
        }}>
          SCROLL
          <div style={{ textAlign: 'center', marginTop: 4, fontSize: 16 }}>v</div>
        </div>
      </div>

      {/* ====== INSTANT PLAY (try before you commit) ====== */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 0' }}>
        <InstantPlay />
      </div>

      {/* ====== RANK BADGE + TONIGHT LINK ====== */}
      {mounted && rankInfo && (
        <div style={{
          maxWidth: 640, margin: '0 auto', padding: '24px 16px 0',
          display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', background: T.surface,
            border: `1px solid ${rankInfo.color}30`, borderRadius: 20,
            boxShadow: T.shadow,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: rankInfo.color,
            }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: rankInfo.color }}>
              {rankInfo.rank}
            </span>
            {rankInfo.nextRank && (
              <span style={{ fontSize: 10, color: T.textMuted }}>
                -- 次: {rankInfo.nextRank} ({rankInfo.progress}%)
              </span>
            )}
          </div>
          <Link href="/english/izakaya-toeic/tonight" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', background: T.goldBg,
            border: `1px solid ${T.goldBorder}`, borderRadius: 20,
            textDecoration: 'none', color: T.gold,
            fontSize: 13, fontWeight: 700,
          }}>
            今夜の1杯
          </Link>
        </div>
      )}

      {/* ====== SCORE IMPACT ====== */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px 0' }}>
        <ScoreImpact />
      </div>

      {/* ====== CHARACTERS TEASER ====== */}
      <div style={{ padding: '48px 16px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>
            THE REGULARS
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px' }}>
            のれんの常連たち
          </h2>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>
            6人の事情。6つのスコア。1つの居酒屋。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {IZAKAYA_CHARACTERS.map(char => (
            <Link
              key={char.id}
              href={`/english/izakaya-toeic/characters#char-${char.id}`}
              onMouseEnter={() => setHoveredChar(char.id)}
              onMouseLeave={() => setHoveredChar(null)}
              style={{
                display: 'flex', gap: 10, alignItems: 'center',
                padding: '12px 14px', borderRadius: 12,
                background: hoveredChar === char.id ? T.surfaceHover : T.surface,
                border: `1px solid ${hoveredChar === char.id ? char.color + '40' : T.border}`,
                textDecoration: 'none', color: T.text,
                transition: 'all 0.15s',
                boxShadow: hoveredChar === char.id ? `0 4px 16px ${char.color}15` : T.shadow,
              }}
            >
              <img
                src={`/characters/${char.id}.png`}
                alt={char.name}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: `2px solid ${char.color}`,
                  objectFit: 'cover', flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>
                  {char.name.split('（')[0]}
                  <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 400, marginLeft: 6 }}>
                    {char.currentScore}
                  </span>
                </div>
                <div style={{
                  fontSize: 10, color: char.color, fontWeight: 600,
                  fontStyle: 'italic', marginTop: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {CHAR_TAGLINES[char.id]}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <Link href="/english/izakaya-toeic/characters" style={{
            fontSize: 12, color: T.gold, fontWeight: 600, textDecoration: 'none',
            padding: '8px 20px', borderRadius: 8,
            border: `1px solid ${T.goldBorder}`, display: 'inline-block',
          }}>
            全員のストーリーを読む -- TOEIC読解練習にもなる
          </Link>
        </div>
      </div>

      {/* ====== 30-DAY CALENDAR (常連コース) ====== */}
      <div id="calendar-section" style={{
        padding: '40px 16px',
        maxWidth: 720,
        margin: '0 auto',
        scrollMarginTop: 20,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>
            {isReturning ? '30 NIGHTS AT NOREN' : 'REGULAR COURSE'}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 4px' }}>
            {isReturning ? 'のれん30夜' : '常連コース'}
          </h2>
          <p style={{
            fontSize: 13, color: T.textMuted, fontStyle: 'italic', margin: '0 0 20px',
          }}>
            {isReturning ? 'カウンターに座ってから、卒業するまで' : 'まずは第1夜から。続きが気になったら、常連になろう。'}
          </p>

          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: '来店', value: `${programProgress.completed}/30`, sub: '夜' },
              { label: '連続', value: `${streak}`, sub: '日' },
              { label: '推定L', value: score > 0 ? `${score}` : '--', sub: '点' },
            ].map(stat => (
              <div key={stat.label} style={{
                minWidth: 72, padding: '10px 16px', background: T.surface,
                borderRadius: 10, border: `1px solid ${T.border}`, boxShadow: T.shadow,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.gold }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: 1, fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Week Tabs */}
        <div style={{
          display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 16,
          WebkitOverflowScrolling: 'touch',
        }}>
          <button
            onClick={() => setActiveWeek(null)}
            style={{
              padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${!activeWeek ? T.gold : T.border}`,
              background: !activeWeek ? T.goldBg : T.surface,
              color: !activeWeek ? T.gold : T.textSub,
              fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            全30夜
          </button>
          {WEEK_THEMES.map(wt => (
            <button
              key={wt.week}
              onClick={() => setActiveWeek(activeWeek === wt.week ? null : wt.week)}
              style={{
                padding: '6px 14px', borderRadius: 20,
                border: `1px solid ${activeWeek === wt.week ? wt.color : T.border}`,
                background: activeWeek === wt.week ? `${wt.color}10` : T.surface,
                color: activeWeek === wt.week ? wt.color : T.textSub,
                fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {wt.week <= 4 ? `第${wt.week}週` : '卒業の夜'}
            </button>
          ))}
        </div>

        {/* Week Theme Banner */}
        {activeWeek && (() => {
          const wt = WEEK_THEMES.find(w => w.week === activeWeek);
          if (!wt) return null;
          return (
            <div style={{
              padding: '12px 16px', background: `${wt.color}08`,
              border: `1px solid ${wt.color}25`, borderRadius: 10, marginBottom: 16,
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: wt.color }}>{wt.title}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{wt.subtitle}</div>
            </div>
          );
        })()}

        {/* Calendar Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 20,
        }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} style={{
              textAlign: 'center', fontSize: 10, fontWeight: 700,
              color: T.textMuted, letterSpacing: 1, padding: '4px 0',
            }}>{d}</div>
          ))}

          {gridDays.map((plan, idx) => {
            if (!plan) return <div key={`empty-${idx}`} style={{ minHeight: 80 }} />;
            const done = completed.includes(plan.day);
            const isRec = plan.day === recommended && !done;
            const isSelected = selectedDay?.day === plan.day;
            const weekTheme = WEEK_THEMES.find(w => w.week === plan.weekNumber);
            const weekColor = weekTheme?.color || T.gold;
            const isLocked = plan.day !== 1 && !completed.includes(plan.day - 1) && !done;

            return (
              <button
                key={plan.day}
                onClick={() => setSelectedDay(plan)}
                style={{
                  position: 'relative', minHeight: 80, padding: '8px 4px 6px',
                  background: isSelected ? `${weekColor}0C` : isLocked ? T.bgSecondary : T.surface,
                  border: `1px solid ${isSelected ? weekColor : T.border}`,
                  borderLeft: `3px solid ${isLocked ? T.border : weekColor}`,
                  borderRadius: 8, cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.15s', outline: 'none',
                  boxShadow: isRec ? `0 0 16px ${T.gold}30` : isSelected ? T.shadowMd : T.shadow,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'space-between', overflow: 'hidden',
                  opacity: isLocked ? 0.55 : 1,
                }}
              >
                <div style={{
                  fontSize: 16, fontWeight: 800, lineHeight: 1,
                  color: done ? weekColor : isRec ? T.gold : isLocked ? T.textMuted : T.text,
                }}>{plan.day}</div>
                <div style={{
                  fontSize: 'clamp(8px, 1.8vw, 10px)', color: isLocked ? T.textMuted : T.textSub,
                  fontWeight: 600, lineHeight: 1.2, marginTop: 4,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                } as React.CSSProperties}>
                  {plan.dayTitle}
                </div>
                {done ? (
                  <div style={{ fontSize: 8, fontWeight: 800, color: weekColor, marginTop: 4, letterSpacing: 0.5 }}>
                    済
                  </div>
                ) : isLocked ? (
                  <div style={{ fontSize: 8, fontWeight: 800, color: T.textMuted, marginTop: 4 }}>
                    --
                  </div>
                ) : (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D6D3D1', marginTop: 4 }} />
                )}
                {isRec && (
                  <div style={{
                    position: 'absolute', top: 2, right: 3,
                    fontSize: 8, fontWeight: 800, color: T.gold, letterSpacing: 0.5,
                  }}>TODAY</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.textSub }}>のれん進捗</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold }}>{programProgress.percentage}%</span>
          </div>
          <div style={{ display: 'flex', gap: 2, height: 8, borderRadius: 4, overflow: 'hidden', background: T.bgSecondary }}>
            {Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              const done = completed.includes(dayNum);
              const plan = THIRTY_DAY_PLAN.find(d => d.day === dayNum);
              const wt = plan ? WEEK_THEMES.find(w => w.week === plan.weekNumber) : null;
              return (
                <div key={dayNum} style={{
                  flex: 1, background: done ? (wt?.color || T.gold) : 'transparent',
                  transition: 'background 0.3s',
                  borderRadius: i === 0 ? '4px 0 0 4px' : i === 29 ? '0 4px 4px 0' : 0,
                }} />
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail */}
        {selectedDay && (
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 14, padding: '20px', boxShadow: T.shadowMd, marginBottom: 24,
          }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              marginBottom: 14, flexWrap: 'wrap', gap: 8,
            }}>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 2,
                  color: WEEK_THEMES.find(w => w.week === selectedDay.weekNumber)?.color || T.gold,
                }}>
                  第{selectedDay.day}夜
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>
                  {selectedDay.dayTitle}
                </div>
                <div style={{ fontSize: 13, color: T.textSub, marginTop: 2 }}>
                  {selectedDay.skill}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {(() => {
                  const ot = OUTPUT_TYPE_LABELS[selectedDay.outputType];
                  return (
                    <span style={{
                      padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700,
                      background: `${ot.color}15`, color: ot.color, border: `1px solid ${ot.color}30`,
                    }}>
                      {ot.izakaya}
                    </span>
                  );
                })()}
                {completed.includes(selectedDay.day) && (
                  <span style={{
                    padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700,
                    background: `${T.gold}15`, color: T.gold, border: `1px solid ${T.gold}30`,
                  }}>
                    済
                  </span>
                )}
              </div>
            </div>

            {selectedDay.unlocks && (
              <div style={{
                padding: '8px 12px', background: `${T.gold}08`,
                border: `1px solid ${T.gold}20`, borderRadius: 8, marginBottom: 14,
                fontSize: 12, color: T.gold, fontWeight: 700,
              }}>
                解禁: {selectedDay.unlocks}
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 8 }}>
                今夜のフレーズ
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedDay.dailyPhrases.map((phrase, i) => (
                  <div key={i} style={{
                    padding: '10px 12px', background: T.bgSecondary, borderRadius: 8,
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

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link
                href={`/english/izakaya-toeic/episodes/${selectedDay.episodeId}`}
                style={{
                  flex: 1, minWidth: 140, display: 'block', padding: '12px 20px',
                  background: T.gold, color: '#fff', borderRadius: 8,
                  fontWeight: 800, fontSize: 14, textAlign: 'center', textDecoration: 'none',
                  boxShadow: T.shadowMd,
                }}
              >
                {completed.includes(selectedDay.day)
                  ? `第${selectedDay.day}夜を復習`
                  : `第${selectedDay.day}夜を始める`}
              </Link>
              {!completed.includes(selectedDay.day) && (
                <button
                  onClick={() => handleMarkComplete(selectedDay.day)}
                  style={{
                    padding: '12px 20px', background: T.surface, color: T.textSub,
                    border: `1px solid ${T.border}`, borderRadius: 8,
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
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
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14,
          padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          opacity: completed.includes(30) ? 1 : 0.7,
        }}>
          {!completed.includes(30) && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(250,250,249,0.5)',
              backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', zIndex: 2,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: T.textMuted, background: T.surface,
                padding: '6px 16px', borderRadius: 20, border: `1px solid ${T.border}`,
              }}>
                第30夜 到達で解放
              </div>
            </div>
          )}
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: T.gold, marginBottom: 6 }}>
            最終夜
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginBottom: 4 }}>
            マスターの秘密を知る
          </div>
          <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>
            30夜の全てを終えた者だけが聞ける、マスターの過去。
            <br />
            そしてカウンターに刻まれた、もう一つの物語。
          </div>
        </div>
      </div>

      {/* ====== WHY LISTENING ====== */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px 32px' }}>
        <div style={{
          padding: '20px', background: T.surface, borderRadius: 14,
          borderLeft: `3px solid ${T.gold}`, boxShadow: T.shadow,
        }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            WHY LISTENING FIRST?
          </div>
          <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.9, margin: 0 }}>
            リスニング76問正解 = <span style={{ color: T.gold, fontWeight: 700 }}>395点</span>。
            リーディングだと同じ76問で335点。
            <br />
            <span style={{ fontWeight: 600, color: T.text }}>
              リスニング集中が、最短でスコアを上げる方法。
            </span>
          </p>
        </div>
      </div>

      {/* ====== TOOLS (izakaya-themed) ====== */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px 32px' }}>
        <div style={{
          padding: '18px', background: T.surface, borderRadius: 14,
          border: `1px solid ${T.border}`, boxShadow: T.shadow,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 1, margin: '0 0 12px' }}>
            のれんの道具箱
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
            {[
              { href: '/english/izakaya-toeic/tonight', icon: '1', iconColor: T.gold, title: '今夜の1杯', sub: '毎日1問、5秒で解ける' },
              { href: '/english/training', icon: 'V', iconColor: T.green, title: '仕込み帳', sub: '毎日20語ずつ仕込む' },
              { href: '/english/izakaya-toeic/guide', icon: 'G', iconColor: T.blue, title: 'マスターの攻略メモ', sub: 'Part別の裏技' },
              { href: '/english/izakaya-toeic/paraphrase', icon: 'P', iconColor: T.gold, title: '言い換えお品書き', sub: '167パターン' },
              { href: '/english/izakaya-toeic/traps', icon: 'X', iconColor: T.red, title: '引っかけ毒見帳', sub: '17種の罠を見破る' },
              { href: '/english/izakaya-toeic/sounds', icon: 'W', iconColor: '#3B82F6', title: '聞き酒ノート', sub: '90の音変化パターン' },
              { href: '/english/izakaya-toeic/score', icon: 'D', iconColor: T.purple, title: 'スコア通知表', sub: '弱点診断' },
              { href: '/english/izakaya-toeic/mistakes', icon: 'M', iconColor: T.orange, title: '反省ノート', sub: 'ミスの傾向分析' },
              { href: '/english/izakaya-toeic/achievements', icon: 'B', iconColor: T.gold, title: 'のれんの勲章', sub: '23個の実績バッジ' },
              { href: '/english/izakaya-toeic/my-story', icon: 'S', iconColor: T.gold, title: '俺のストーリー', sub: '学習の軌跡を共有' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', gap: 8, alignItems: 'center',
                padding: '10px 10px', background: T.bg, borderRadius: 8,
                textDecoration: 'none', color: T.text,
                border: '1px solid transparent', transition: 'all 0.15s',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: item.iconColor + '10', border: `1.5px solid ${item.iconColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 900, color: item.iconColor, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 11 }}>{item.title}</div>
                  <div style={{ fontSize: 9, color: T.textMuted }}>{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ====== FINAL CTA ====== */}
      <div style={{
        padding: '48px 20px', textAlign: 'center',
        background: `linear-gradient(180deg, ${T.bg}, #FFFBEB)`,
      }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>
          1日1夜。30夜で卒業。
        </p>
        <p style={{ fontSize: 13, color: T.textMuted, margin: '0 0 24px' }}>
          マスターがカウンターで待ってる。
        </p>
        {!hasReadChars ? (
          <Link href="/english/izakaya-toeic/characters" style={{
            display: 'inline-block', padding: '18px 52px',
            background: `linear-gradient(135deg, ${T.gold}, #B8960F)`,
            color: '#fff', borderRadius: 14, fontWeight: 900, fontSize: 20,
            textDecoration: 'none', boxShadow: `0 8px 32px ${T.gold}50`, letterSpacing: 1,
          }}>
            STEP 1: 常連たちに会う
          </Link>
        ) : (
          <Link href={`/english/izakaya-toeic/episodes/${nextEpisode.id}`} style={{
            display: 'inline-block', padding: '18px 52px',
            background: `linear-gradient(135deg, ${T.gold}, #B8960F)`,
            color: '#fff', borderRadius: 14, fontWeight: 900, fontSize: 20,
            textDecoration: 'none', boxShadow: `0 8px 32px ${T.gold}50`, letterSpacing: 1,
          }}>
            {isReturning ? `第${nextDay}夜へ` : '第1夜 -- カウンターに座る'}
          </Link>
        )}
        <div style={{ marginTop: 24 }}>
          <Link href="/english" style={{ fontSize: 11, color: T.textMuted, textDecoration: 'none' }}>
            English Top
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes izk-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes izk-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
