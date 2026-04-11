'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footprints, ChevronRight, ArrowUp, ArrowDown, Clock, Compass, Heart, Target } from 'lucide-react';
import {
  SAMPLE_NORENS,
  BADGE_CONFIG,
  DRIVE_CONFIG,
  getNorenNickname,
  setNorenNickname,
  getNorenGoal,
  setNorenGoal,
  getWalkingNorens,
  type Noren,
  type NorenDrive,
} from '@/data/noren';

/* ================================================================
   Design Tokens
   ================================================================ */

const C = {
  gold: '#D4AF37',
  goldMuted: '#B8972E',
  emerald: '#10B981',
  red: '#DC2626',
  blue: '#2563EB',
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

const FONT =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const SHADOW_SM =
  '0 1px 3px rgba(28,25,23,0.04), 0 1px 2px rgba(28,25,23,0.06)';
const SHADOW_MD =
  '0 4px 12px rgba(28,25,23,0.05), 0 1px 4px rgba(28,25,23,0.04)';
const SHADOW_LG =
  '0 8px 24px rgba(28,25,23,0.06), 0 2px 8px rgba(28,25,23,0.04)';

/* ================================================================
   Keyframes
   ================================================================ */

const KEYFRAMES = `
@keyframes norenFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes norenFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes norenPulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
@keyframes norenShake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}
`;

/* ================================================================
   First Visit - Full Screen Prompt
   ================================================================ */

function FirstVisitScreen({
  onComplete,
}: {
  onComplete: (name: string, goal: string) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState('');
  const [name, setName] = useState('');
  const [shaking, setShaking] = useState(false);
  const [goalFocused, setGoalFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  const handleGoalSubmit = () => {
    const trimmed = goal.trim();
    if (!trimmed) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setStep(2);
  };

  const handleNameSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setNorenGoal(goal.trim());
    setNorenNickname(trimmed);
    onComplete(trimmed, goal.trim());
  };

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '18px 20px',
    fontSize: 18,
    fontWeight: 600,
    fontFamily: FONT,
    color: C.white,
    background: 'rgba(255,255,255,0.06)',
    border: `2px solid ${focused ? C.gold : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 14,
    outline: 'none',
    textAlign: 'center',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s',
    caretColor: C.gold,
  });

  const btnStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '16px 0',
    fontSize: 15,
    fontWeight: 700,
    fontFamily: FONT,
    color: C.s900,
    background: C.gold,
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    letterSpacing: '0.06em',
    transition: 'opacity 0.2s, transform 0.15s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: C.s900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        fontFamily: FONT,
        animation: 'norenFadeIn 0.6s ease',
      }}
    >
      {step === 1 ? (
        /* ── Step 1: Goal ── */
        <>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 900,
              color: C.white,
              margin: '0 0 16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              textAlign: 'center',
              animation: 'norenFadeUp 0.8s ease 0.2s both',
            }}
          >
            何を達成したい？
          </h1>

          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: C.s400,
              margin: '0 0 40px',
              textAlign: 'center',
              maxWidth: 360,
              lineHeight: 1.6,
              letterSpacing: '0.02em',
              animation: 'norenFadeUp 0.8s ease 0.4s both',
            }}
          >
            英語を学びたい。教えたい。仕事で必要。
            <br />
            理由は何でもいい。目標を言葉にしろ。
          </p>

          <div
            style={{
              maxWidth: 'min(420px, 100%)',
              width: '100%',
              animation: `norenFadeUp 0.8s ease 0.6s both${shaking ? ', norenShake 0.4s ease' : ''}`,
            }}
          >
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGoalSubmit()}
                onFocus={() => setGoalFocused(true)}
                onBlur={() => setGoalFocused(false)}
                placeholder=""
                maxLength={60}
                autoFocus
                style={inputStyle(goalFocused)}
              />
              {!goal && !goalFocused && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>
                    TOEIC 800 / 英語コーチで独立 / ...
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleGoalSubmit}
              style={btnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              次へ
            </button>
          </div>

          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.22)',
              margin: '36px 0 0',
              textAlign: 'center',
              letterSpacing: '0.04em',
              animation: 'norenFadeUp 0.8s ease 0.9s both',
            }}
          >
            メアドも、パスワードも、いらない。
          </p>
        </>
      ) : (
        /* ── Step 2: Nickname ── */
        <>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: C.gold,
              margin: '0 0 12px',
              textAlign: 'center',
              letterSpacing: '0.06em',
              animation: 'norenFadeUp 0.6s ease',
            }}
          >
            {goal}
          </p>

          <h1
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 900,
              color: C.white,
              margin: '0 0 40px',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              textAlign: 'center',
              animation: 'norenFadeUp 0.6s ease 0.1s both',
            }}
          >
            なんて呼ばれたい？
          </h1>

          <div
            style={{
              maxWidth: 'min(380px, 100%)',
              width: '100%',
              animation: `norenFadeUp 0.6s ease 0.2s both${shaking ? ', norenShake 0.4s ease' : ''}`,
            }}
          >
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                placeholder=""
                maxLength={20}
                autoFocus
                style={inputStyle(nameFocused)}
              />
              {!name && !nameFocused && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
                    ニックネーム
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleNameSubmit}
              style={btnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.88';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              歩き始める
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================================
   Activity Dot
   ================================================================ */

function ActivityDot() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: C.emerald,
        animation: 'norenPulse 2.5s ease-in-out infinite',
        flexShrink: 0,
      }}
    />
  );
}

/* ================================================================
   Milestone Preview (compact)
   ================================================================ */

function MilestonePreview({ milestones }: { milestones: Noren['milestones'] }) {
  const visible = milestones.slice(0, 3);
  const remaining = milestones.length - 3;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      {visible.map((m, i) => (
        <div key={m.step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: `1.5px solid ${C.s200}`,
              fontSize: 9,
              fontWeight: 700,
              color: C.s500,
              fontFamily: FONT,
              background: C.white,
              flexShrink: 0,
            }}
          >
            {m.step}
          </span>
          <span
            style={{
              fontSize: 11,
              color: C.s600,
              fontFamily: FONT,
              fontWeight: 500,
            }}
          >
            {m.label}
          </span>
          {i < visible.length - 1 && (
            <span style={{ color: C.s300, fontSize: 10, margin: '0 2px' }}>
              /
            </span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <span style={{ fontSize: 10, color: C.s400, fontFamily: FONT }}>
          +{remaining}
        </span>
      )}
    </div>
  );
}

/* ================================================================
   Footprint Preview
   ================================================================ */

function FootprintPreview({
  footprint,
}: {
  footprint: NonNullable<Noren['latestFootprint']>;
}) {
  const isBreakthrough = footprint.type === 'breakthrough';
  const badgeCfg = BADGE_CONFIG[footprint.badge];

  return (
    <div
      style={{
        padding: '10px 14px',
        background: isBreakthrough ? '#F0FDF4' : '#FFFBEB',
        borderRadius: 8,
        borderLeft: `3px solid ${isBreakthrough ? C.emerald : C.goldMuted}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 4,
        }}
      >
        {isBreakthrough ? (
          <ArrowUp size={11} color={C.emerald} strokeWidth={2.5} />
        ) : (
          <ArrowDown size={11} color={C.goldMuted} strokeWidth={2.5} />
        )}
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: isBreakthrough ? C.emerald : C.goldMuted,
            fontFamily: FONT,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {isBreakthrough ? 'BREAKTHROUGH' : 'STRUGGLE'}
        </span>
      </div>
      <p
        style={{
          fontSize: 12,
          lineHeight: 1.65,
          color: C.s600,
          fontFamily: FONT,
          margin: 0,
        }}
      >
        {footprint.text}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: badgeCfg.color,
            fontFamily: FONT,
          }}
        >
          {footprint.nickname}
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: badgeCfg.color,
            background: badgeCfg.bg,
            padding: '1px 5px',
            borderRadius: 3,
            fontFamily: FONT,
          }}
        >
          {badgeCfg.label}
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   Path Relevance Scoring
   ================================================================ */

function scorePathRelevance(noren: Noren, goal: string): number {
  const g = goal.toLowerCase();
  const fields = [noren.goal, noren.name, noren.subtitle, noren.description].join(' ').toLowerCase();

  const goalWords = g.split(/[\s、。,.]/).filter((w) => w.length >= 2);
  let score = 0;
  for (const word of goalWords) {
    if (fields.includes(word)) score += 10;
  }

  if (g.includes('toeic') || g.includes('トイック')) {
    if (noren.id === 'toeic-800') score += 20;
  }
  if (g.includes('コーチ') || g.includes('教え') || g.includes('先生')) {
    if (noren.drive === 'teaching') score += 15;
  }
  if (g.includes('映画') || g.includes('字幕')) {
    if (noren.id === 'movie-english') score += 20;
  }
  if (g.includes('発音') || g.includes('pronunciation')) {
    if (noren.id === 'hatsuon-gachi') score += 20;
  }
  if (g.includes('会議') || g.includes('ビジネス') || g.includes('仕事')) {
    if (noren.id === 'eigode-kaigi') score += 20;
  }
  if (g.includes('英会話') || g.includes('オンライン')) {
    if (noren.id === 'eikaiwa-debut') score += 20;
  }
  if (g.includes('note') || g.includes('発信') || g.includes('ブログ')) {
    if (noren.id === 'note-eigo-start') score += 20;
  }
  if (g.includes('独立') || g.includes('フリーランス') || g.includes('月収')) {
    if (noren.id === 'coach-30man') score += 20;
  }

  return score;
}

/* ================================================================
   Path Card
   ================================================================ */

function PathCard({
  noren,
  isWalking,
  index,
}: {
  noren: Noren;
  isWalking: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const driveCfg = DRIVE_CONFIG[noren.drive];

  return (
    <Link
      href={`/english/noren/${noren.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          background: C.white,
          borderRadius: 16,
          padding: '28px 24px 22px',
          border: `1px solid ${isWalking ? `${C.gold}44` : C.s200}`,
          borderLeft: isWalking
            ? `4px solid ${C.gold}`
            : `4px solid ${driveCfg.color}22`,
          boxShadow: hovered ? SHADOW_LG : SHADOW_SM,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          animation: `norenFadeIn 0.5s ease ${index * 0.08}s both`,
        }}
      >
        {/* Top row: drive tag + walking status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          {isWalking ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Footprints size={12} color={C.gold} strokeWidth={2} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.gold,
                  fontFamily: FONT,
                  letterSpacing: '0.02em',
                }}
              >
                歩いてる
              </span>
            </div>
          ) : (
            <div style={{ height: 18 }} />
          )}
        </div>

        {/* Goal name */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: C.s900,
            fontFamily: FONT,
            margin: '0 0 6px',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
          }}
        >
          {noren.name}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 13,
            color: C.s500,
            fontFamily: FONT,
            margin: '0 0 18px',
            lineHeight: 1.5,
          }}
        >
          {noren.subtitle}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Footprints size={12} color={C.s400} strokeWidth={1.8} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.s600,
                fontFamily: FONT,
              }}
            >
              {noren.memberCount}人
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ActivityDot />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: FONT,
              }}
            >
              今日{noren.activeToday}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                fontSize: 11,
                color: C.s400,
                fontFamily: FONT,
              }}
            >
              {noren.milestones.length}ステップ
            </span>
          </div>
        </div>

        {/* Milestones preview */}
        {noren.milestones.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <MilestonePreview milestones={noren.milestones} />
          </div>
        )}

        {/* Latest footprint */}
        {noren.latestFootprint && (
          <div style={{ marginBottom: 12 }}>
            <FootprintPreview footprint={noren.latestFootprint} />
          </div>
        )}

        {/* Enter hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: hovered ? C.gold : C.s400,
              fontFamily: FONT,
              transition: 'color 0.2s',
            }}
          >
            この道を見る
          </span>
          <ChevronRight
            size={14}
            color={hovered ? C.gold : C.s400}
            style={{ transition: 'color 0.2s' }}
          />
        </div>
      </div>
    </Link>
  );
}

/* ================================================================
   Drive Section
   ================================================================ */

function DriveSection({
  drive,
  norens,
  walkingIds,
  startIndex,
}: {
  drive: NorenDrive;
  norens: Noren[];
  walkingIds: string[];
  startIndex: number;
}) {
  const cfg = DRIVE_CONFIG[drive];
  const DRIVE_ICONS: Record<NorenDrive, typeof Clock> = {
    necessity: Clock,
    freedom: Compass,
    teaching: Heart,
  };
  const Icon = DRIVE_ICONS[drive];

  return (
    <section style={{ marginBottom: 56 }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
          animation: `norenFadeUp 0.5s ease ${startIndex * 0.08}s both`,
        }}
      >
        <Icon size={16} color={cfg.color} strokeWidth={2.2} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: cfg.color,
            fontFamily: FONT,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {cfg.labelEn}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.s500,
            fontFamily: FONT,
          }}
        >
          -- {cfg.label}
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: 13,
          color: C.s400,
          fontFamily: FONT,
          margin: '0 0 20px',
          letterSpacing: '0.02em',
          animation: `norenFadeUp 0.5s ease ${startIndex * 0.08 + 0.05}s both`,
        }}
      >
        {cfg.tagline}
      </p>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 20,
        }}
      >
        {norens.map((noren, i) => (
          <PathCard
            key={noren.id}
            noren={noren}
            isWalking={walkingIds.includes(noren.id)}
            index={startIndex + i}
          />
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   Recommended Section
   ================================================================ */

function RecommendedSection({
  goal,
  walkingIds,
}: {
  goal: string;
  walkingIds: string[];
}) {
  const scored = SAMPLE_NORENS.map((n) => ({
    noren: n,
    score: scorePathRelevance(n, goal),
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <section style={{ marginBottom: 56 }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
          animation: 'norenFadeUp 0.5s ease both',
        }}
      >
        <Target size={16} color={C.gold} strokeWidth={2.2} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: C.gold,
            fontFamily: FONT,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          YOUR PATH
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.s500,
            fontFamily: FONT,
          }}
        >
          -- おすすめ
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: 13,
          color: C.s400,
          fontFamily: FONT,
          margin: '0 0 20px',
          letterSpacing: '0.02em',
          animation: 'norenFadeUp 0.5s ease 0.05s both',
        }}
      >
        「{goal}」に近い道
      </p>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 20,
        }}
      >
        {scored.map(({ noren }, i) => (
          <RecommendedPathCard
            key={noren.id}
            noren={noren}
            isWalking={walkingIds.includes(noren.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function RecommendedPathCard({
  noren,
  isWalking,
  index,
}: {
  noren: Noren;
  isWalking: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/english/noren/${noren.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          background: C.white,
          borderRadius: 16,
          padding: '28px 24px 22px',
          border: `1px solid ${C.gold}33`,
          borderLeft: `4px solid ${C.gold}`,
          boxShadow: hovered ? SHADOW_LG : SHADOW_SM,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          animation: `norenFadeIn 0.5s ease ${index * 0.08}s both`,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          {isWalking ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Footprints size={12} color={C.gold} strokeWidth={2} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.gold,
                  fontFamily: FONT,
                  letterSpacing: '0.02em',
                }}
              >
                歩いてる
              </span>
            </div>
          ) : (
            <div style={{ height: 18 }} />
          )}
        </div>

        {/* Goal name */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: C.s900,
            fontFamily: FONT,
            margin: '0 0 6px',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
          }}
        >
          {noren.name}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 13,
            color: C.s500,
            fontFamily: FONT,
            margin: '0 0 18px',
            lineHeight: 1.5,
          }}
        >
          {noren.subtitle}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Footprints size={12} color={C.s400} strokeWidth={1.8} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.s600,
                fontFamily: FONT,
              }}
            >
              {noren.memberCount}人
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ActivityDot />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.emerald,
                fontFamily: FONT,
              }}
            >
              今日{noren.activeToday}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                fontSize: 11,
                color: C.s400,
                fontFamily: FONT,
              }}
            >
              {noren.milestones.length}ステップ
            </span>
          </div>
        </div>

        {/* Milestones preview */}
        {noren.milestones.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <MilestonePreview milestones={noren.milestones} />
          </div>
        )}

        {/* Latest footprint */}
        {noren.latestFootprint && (
          <div style={{ marginBottom: 12 }}>
            <FootprintPreview footprint={noren.latestFootprint} />
          </div>
        )}

        {/* Enter hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
            marginTop: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: hovered ? C.gold : C.s400,
              fontFamily: FONT,
              transition: 'color 0.2s',
            }}
          >
            この道を見る
          </span>
          <ChevronRight
            size={14}
            color={hovered ? C.gold : C.s400}
            style={{ transition: 'color 0.2s' }}
          />
        </div>
      </div>
    </Link>
  );
}

/* ================================================================
   Main Page
   ================================================================ */

export default function NorenPage() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [myGoal, setMyGoal] = useState<string | null>(null);
  const [walkingIds, setWalkingIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setNickname(getNorenNickname());
    setMyGoal(getNorenGoal());
    setWalkingIds(getWalkingNorens());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (nickname === null) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <FirstVisitScreen
          onComplete={(n, g) => {
            setNickname(n);
            setMyGoal(g);
          }}
        />
      </>
    );
  }

  const necessityNorens = SAMPLE_NORENS.filter((n) => n.drive === 'necessity');
  const freedomNorens = SAMPLE_NORENS.filter((n) => n.drive === 'freedom');
  const teachingNorens = SAMPLE_NORENS.filter((n) => n.drive === 'teaching');

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          minHeight: '100vh',
          background: C.white,
          fontFamily: FONT,
        }}
      >
        {/* ── Header ── */}
        <header
          style={{
            padding: '64px 24px 48px',
            textAlign: 'center',
            background: `linear-gradient(180deg, ${C.s50} 0%, ${C.white} 100%)`,
            animation: 'norenFadeUp 0.5s ease',
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.s400,
              margin: '0 0 12px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            NOREN
          </p>
          {/* User's declared goal */}
          {myGoal && (
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.gold,
                margin: '0 0 12px',
                letterSpacing: '0.02em',
              }}
            >
              「{myGoal}」
            </p>
          )}
          <h1
            style={{
              fontSize: 'clamp(22px, 4vw, 30px)',
              fontWeight: 800,
              color: C.s900,
              margin: '0 0 10px',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            {nickname}、どの道を歩く？
          </h1>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: C.s400,
              margin: 0,
              letterSpacing: '0.06em',
            }}
          >
            去る者追わず、来る者拒まず
          </p>

          {/* My Journey link - only if walking at least one path */}
          {walkingIds.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <Link
                href="/english/noren/me"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.gold,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                俺の旅を見る →
              </Link>
            </div>
          )}
        </header>

        {/* ── Content ── */}
        <main
          style={{
            maxWidth: 1060,
            margin: '0 auto',
            padding: '40px 24px 48px',
          }}
        >
          {/* Recommended section - based on user's declared goal */}
          {myGoal && (
            <RecommendedSection goal={myGoal} walkingIds={walkingIds} />
          )}

          {/* Necessity section first - urgent things on top */}
          {necessityNorens.length > 0 && (
            <DriveSection
              drive="necessity"
              norens={necessityNorens}
              walkingIds={walkingIds}
              startIndex={0}
            />
          )}

          {/* Freedom section */}
          {freedomNorens.length > 0 && (
            <DriveSection
              drive="freedom"
              norens={freedomNorens}
              walkingIds={walkingIds}
              startIndex={necessityNorens.length}
            />
          )}

          {/* Teaching section */}
          {teachingNorens.length > 0 && (
            <DriveSection
              drive="teaching"
              norens={teachingNorens}
              walkingIds={walkingIds}
              startIndex={necessityNorens.length + freedomNorens.length}
            />
          )}
        </main>

        {/* ── Footer ── */}
        <footer
          style={{
            padding: '40px 24px 56px',
            textAlign: 'center',
            borderTop: `1px solid ${C.s100}`,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: C.s400,
              fontFamily: FONT,
              margin: 0,
              letterSpacing: '0.02em',
            }}
          >
            自分の道を作る
            <span
              style={{
                display: 'inline-block',
                margin: '0 10px',
                color: C.s300,
              }}
            >
              --
            </span>
            近日公開
          </p>
        </footer>
      </div>
    </>
  );
}
