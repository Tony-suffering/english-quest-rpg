'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Footprints, Target, TrendingUp, MapPin } from 'lucide-react';
import {
  SAMPLE_NORENS,
  BADGE_CONFIG,
  getNorenNickname,
  getNorenGoal,
  getWalkingNorens,
  getAllUserFootprints,
  getAllMilestoneProgress,
  getUserMilestone,
  calculateUserBadge,
  type Footprint,
} from '@/data/noren';

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

const FP_STYLE = {
  breakthrough: { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', label: '突破' },
  struggle:     { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', label: '苦戦' },
  tip:          { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', label: 'コツ' },
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
`;

/* ================================================================
   Helpers
   ================================================================ */

function daysSince(dateStr: string): number {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - then) / 86400000));
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

/* ================================================================
   Walking Path Card
   ================================================================ */

interface WalkingPathCardProps {
  norenId: string;
  index: number;
}

function WalkingPathCard({ norenId, index }: WalkingPathCardProps) {
  const [hovered, setHovered] = useState(false);
  const noren = SAMPLE_NORENS.find((n) => n.id === norenId);
  if (!noren) return null;

  const currentMilestone = getUserMilestone(norenId);
  const totalMilestones = noren.milestones.length;
  const progress = totalMilestones > 0
    ? Math.round((currentMilestone / totalMilestones) * 100)
    : 0;
  const badge = calculateUserBadge(norenId);
  const badgeCfg = BADGE_CONFIG[badge];

  const currentMilestoneLabel =
    currentMilestone > 0 && currentMilestone <= totalMilestones
      ? noren.milestones[currentMilestone - 1]?.label
      : currentMilestone === 0
        ? noren.milestones[0]?.label ?? '---'
        : '---';

  const userFps = (() => {
    if (typeof window === 'undefined') return 0;
    const all = getAllUserFootprints();
    return (all[norenId] ?? []).length;
  })();

  return (
    <Link
      href={`/english/noren/${norenId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 16,
          padding: '24px 22px 20px',
          border: `1px solid ${C.gold}33`,
          borderLeft: `4px solid ${C.gold}`,
          boxShadow: hovered ? SHADOW_LG : SHADOW_SM,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.22s ease',
          cursor: 'pointer',
          animation: `norenFadeIn 0.5s ease ${index * 0.1}s both`,
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Footprints size={12} color={C.gold} strokeWidth={2.2} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.gold,
                fontFamily: FONT,
                letterSpacing: '0.04em',
              }}
            >
              歩いてる
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: badgeCfg.color,
              background: badgeCfg.bg,
              padding: '3px 8px',
              borderRadius: 4,
              fontFamily: FONT,
              letterSpacing: '0.04em',
            }}
          >
            {badgeCfg.label}
          </span>
        </div>

        {/* Path name */}
        <h3
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: C.s900,
            fontFamily: FONT,
            margin: '0 0 4px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {noren.name}
        </h3>

        {/* Current milestone */}
        <p
          style={{
            fontSize: 12,
            color: C.s500,
            fontFamily: FONT,
            margin: '0 0 16px',
            lineHeight: 1.4,
          }}
        >
          <MapPin
            size={10}
            color={C.s400}
            style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}
          />
          {currentMilestoneLabel}
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 11, color: C.s500, fontFamily: FONT, fontWeight: 600 }}>
              {currentMilestone} / {totalMilestones} マイルストーン
            </span>
            <span style={{ fontSize: 11, color: C.gold, fontFamily: FONT, fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: C.s100,
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldMuted} 100%)`,
                borderRadius: 99,
                transition: 'width 0.6s ease',
              }}
            />
          </div>
        </div>

        {/* Footprints count + enter hint */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 11, color: C.s400, fontFamily: FONT }}>
            足跡 {userFps}件
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: hovered ? C.gold : C.s400,
              fontFamily: FONT,
              transition: 'color 0.2s',
              letterSpacing: '0.02em',
            }}
          >
            この道を見る →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ================================================================
   Footprint Item
   ================================================================ */

interface FootprintItemProps {
  fp: Footprint;
  norenName: string;
  index: number;
}

function FootprintItem({ fp, norenName, index }: FootprintItemProps) {
  const style = FP_STYLE[fp.type];

  return (
    <div
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderLeft: `3px solid ${style.color}`,
        borderRadius: 10,
        padding: '14px 16px',
        animation: `norenFadeUp 0.4s ease ${Math.min(index * 0.06, 0.5)}s both`,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: style.color,
            fontFamily: FONT,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {style.label}
        </span>
        <span style={{ color: C.s300, fontSize: 10 }}>|</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: C.s500,
            fontFamily: FONT,
          }}
        >
          {norenName}
        </span>
        <span style={{ color: C.s300, fontSize: 10 }}>|</span>
        <span
          style={{
            fontSize: 10,
            color: C.s400,
            fontFamily: FONT,
          }}
        >
          {formatDate(fp.date)}
        </span>
      </div>

      {/* Text */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.65,
          color: C.s700,
          fontFamily: FONT,
          margin: 0,
        }}
      >
        {fp.text}
      </p>

      {/* Note link */}
      {fp.noteUrl && (
        <a
          href={fp.noteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 8,
            fontSize: 11,
            fontWeight: 600,
            color: style.color,
            fontFamily: FONT,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          note で読む →
        </a>
      )}
    </div>
  );
}

/* ================================================================
   Stats Card
   ================================================================ */

function StatsCard({
  walkingCount,
  totalFootprints,
  breakthroughs,
  struggles,
  tips,
  topBadge,
}: {
  walkingCount: number;
  totalFootprints: number;
  breakthroughs: number;
  struggles: number;
  tips: number;
  topBadge: keyof typeof BADGE_CONFIG | null;
}) {
  const badgeCfg = topBadge ? BADGE_CONFIG[topBadge] : null;

  return (
    <div
      style={{
        background: C.s50,
        border: `1px solid ${C.s200}`,
        borderRadius: 16,
        padding: '24px 22px',
        boxShadow: SHADOW_SM,
        animation: 'norenFadeUp 0.5s ease 0.2s both',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <TrendingUp size={14} color={C.s500} strokeWidth={2} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.s500,
            fontFamily: FONT,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Stats
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {/* Walking paths */}
        <div>
          <div
            style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 900,
              color: C.gold,
              fontFamily: FONT,
              lineHeight: 1,
              marginBottom: 4,
              letterSpacing: '-0.02em',
            }}
          >
            {walkingCount}
          </div>
          <div style={{ fontSize: 11, color: C.s500, fontFamily: FONT, fontWeight: 600 }}>
            歩いてる道
          </div>
        </div>

        {/* Total footprints */}
        <div>
          <div
            style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 900,
              color: C.s800,
              fontFamily: FONT,
              lineHeight: 1,
              marginBottom: 4,
              letterSpacing: '-0.02em',
            }}
          >
            {totalFootprints}
          </div>
          <div style={{ fontSize: 11, color: C.s500, fontFamily: FONT, fontWeight: 600 }}>
            残した足跡
          </div>
        </div>

        {/* Footprint breakdown */}
        <div style={{ gridColumn: '1 / -1' }}>
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {([
              { type: 'breakthrough', count: breakthroughs },
              { type: 'struggle',     count: struggles },
              { type: 'tip',          count: tips },
            ] as const).map(({ type, count }) => {
              const s = FP_STYLE[type];
              return (
                <div
                  key={type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    borderRadius: 6,
                    padding: '4px 10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: s.color,
                      fontFamily: FONT,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: s.color,
                      fontFamily: FONT,
                    }}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top badge */}
        {badgeCfg && (
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 11, color: C.s500, fontFamily: FONT, fontWeight: 600, marginBottom: 6 }}>
              現在のバッジ
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: badgeCfg.bg,
                border: `1px solid ${badgeCfg.color}44`,
                borderRadius: 8,
                padding: '6px 12px',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: badgeCfg.color,
                  fontFamily: FONT,
                  letterSpacing: '0.04em',
                }}
              >
                {badgeCfg.label}
              </span>
              <span style={{ fontSize: 11, color: badgeCfg.color, fontFamily: FONT, opacity: 0.7 }}>
                {badgeCfg.labelEn}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */

export default function MyJourneyPage() {
  const [nickname, setNickname] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [walkingIds, setWalkingIds] = useState<string[]>([]);
  const [allFootprints, setAllFootprints] = useState<Record<string, Footprint[]>>({});
  const [milestoneProgress, setMilestoneProgress] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setNickname(getNorenNickname());
    setGoal(getNorenGoal());
    setWalkingIds(getWalkingNorens());
    setAllFootprints(getAllUserFootprints());
    setMilestoneProgress(getAllMilestoneProgress());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  // Redirect-like: no nickname means no profile
  if (!nickname) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div
          style={{
            minHeight: '100vh',
            background: C.white,
            fontFamily: FONT,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              fontWeight: 700,
              color: C.s700,
              margin: '0 0 8px',
            }}
          >
            まだ道を歩いていない。
          </p>
          <p style={{ fontSize: 13, color: C.s400, margin: '0 0 28px' }}>
            のれんをくぐってから来い。
          </p>
          <Link
            href="/english/noren"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: C.gold,
              color: C.s900,
              fontWeight: 700,
              fontFamily: FONT,
              fontSize: 14,
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            のれん一覧へ
          </Link>
        </div>
      </>
    );
  }

  // Flatten all user footprints sorted newest-first
  const flatFootprints: Array<Footprint & { norenId: string; norenName: string }> = [];
  for (const [norenId, fps] of Object.entries(allFootprints)) {
    const noren = SAMPLE_NORENS.find((n) => n.id === norenId);
    const norenName = noren?.name ?? norenId;
    for (const fp of fps) {
      flatFootprints.push({ ...fp, norenId, norenName });
    }
  }
  flatFootprints.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalFootprints = flatFootprints.length;
  const breakthroughs = flatFootprints.filter((f) => f.type === 'breakthrough').length;
  const struggles = flatFootprints.filter((f) => f.type === 'struggle').length;
  const tips = flatFootprints.filter((f) => f.type === 'tip').length;

  // Top badge across all walking paths
  const badgeRank: Record<string, number> = { aruki: 0, tabi: 1, michibiki: 2, mimamori: 3 };
  const topBadge = walkingIds.reduce<keyof typeof BADGE_CONFIG | null>((best, id) => {
    const b = calculateUserBadge(id);
    if (!best || badgeRank[b] > badgeRank[best]) return b;
    return best;
  }, null);

  // Days since first walk (earliest footprint or fallback)
  const firstDate = flatFootprints.length > 0
    ? flatFootprints.reduce((min, f) => f.date < min ? f.date : min, flatFootprints[0].date)
    : null;
  const dayCount = firstDate ? daysSince(firstDate) : 0;

  // Group footprints by date for timeline
  const byDate: Record<string, typeof flatFootprints> = {};
  for (const fp of flatFootprints) {
    if (!byDate[fp.date]) byDate[fp.date] = [];
    byDate[fp.date].push(fp);
  }
  const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));

  const hasNoWalking = walkingIds.length === 0;
  const hasNoFootprints = totalFootprints === 0;

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
            background: `linear-gradient(180deg, ${C.s900} 0%, ${C.s800} 100%)`,
            padding: 'clamp(40px, 6vw, 72px) 24px clamp(32px, 5vw, 56px)',
            animation: 'norenFadeIn 0.5s ease',
          }}
        >
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Back link */}
            <Link
              href="/english/noren"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: C.s400,
                fontFamily: FONT,
                textDecoration: 'none',
                marginBottom: 32,
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={13} color={C.s400} strokeWidth={2.2} />
              のれん一覧
            </Link>

            {/* Goal */}
            {goal && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 14,
                  animation: 'norenFadeUp 0.5s ease 0.1s both',
                }}
              >
                <Target size={13} color={C.gold} strokeWidth={2.2} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gold,
                    fontFamily: FONT,
                    letterSpacing: '0.02em',
                  }}
                >
                  「{goal}」
                </span>
              </div>
            )}

            {/* Main heading */}
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 900,
                color: C.white,
                margin: '0 0 6px',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                animation: 'norenFadeUp 0.5s ease 0.15s both',
              }}
            >
              {nickname}の旅
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: C.s400,
                margin: '0 0 32px',
                letterSpacing: '0.04em',
                animation: 'norenFadeUp 0.5s ease 0.2s both',
              }}
            >
              MY JOURNEY
            </p>

            {/* Summary stats row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
                animation: 'norenFadeUp 0.5s ease 0.28s both',
              }}
            >
              {[
                { value: walkingIds.length, label: '道' },
                { value: totalFootprints, label: '足跡' },
                { value: dayCount, label: '日目' },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 'clamp(20px, 3.5vw, 26px)',
                      fontWeight: 900,
                      color: C.white,
                      fontFamily: FONT,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.s400,
                      fontFamily: FONT,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <main
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 56px) 24px clamp(48px, 8vw, 72px)',
          }}
        >
          {/* ── Empty: no walking paths ── */}
          {hasNoWalking && (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: C.s50,
                border: `1px solid ${C.s200}`,
                borderRadius: 16,
                marginBottom: 40,
                animation: 'norenFadeUp 0.5s ease 0.1s both',
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: C.s700,
                  fontFamily: FONT,
                  margin: '0 0 8px',
                }}
              >
                目標は決めた。次は道を選べ。
              </p>
              <p style={{ fontSize: 13, color: C.s400, fontFamily: FONT, margin: '0 0 24px' }}>
                どの道を歩くか、まだ決まっていない。
              </p>
              <Link
                href="/english/noren"
                style={{
                  display: 'inline-block',
                  padding: '11px 24px',
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
                道を選ぶ
              </Link>
            </div>
          )}

          {/* ── Walking Paths Section ── */}
          {!hasNoWalking && (
            <section style={{ marginBottom: 48 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                  animation: 'norenFadeUp 0.5s ease 0.1s both',
                }}
              >
                <Footprints size={15} color={C.gold} strokeWidth={2.2} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: C.s700,
                    fontFamily: FONT,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Walking Paths
                </span>
                <span style={{ fontSize: 12, color: C.s400, fontFamily: FONT }}>
                  -- 歩いてる道
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                  gap: 16,
                }}
              >
                {walkingIds.map((id, i) => (
                  <WalkingPathCard key={id} norenId={id} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* ── Stats Card ── */}
          {!hasNoWalking && (
            <section style={{ marginBottom: 48 }}>
              <StatsCard
                walkingCount={walkingIds.length}
                totalFootprints={totalFootprints}
                breakthroughs={breakthroughs}
                struggles={struggles}
                tips={tips}
                topBadge={topBadge}
              />
            </section>
          )}

          {/* ── Footprints Timeline ── */}
          {!hasNoWalking && (
            <section>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20,
                  animation: 'norenFadeUp 0.5s ease 0.3s both',
                }}
              >
                <MapPin size={15} color={C.s500} strokeWidth={2.2} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: C.s700,
                    fontFamily: FONT,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  My Footprints
                </span>
                <span style={{ fontSize: 12, color: C.s400, fontFamily: FONT }}>
                  -- 俺の足跡
                </span>
              </div>

              {/* Empty footprints state */}
              {hasNoFootprints ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 24px',
                    background: C.s50,
                    border: `1px solid ${C.s200}`,
                    borderRadius: 14,
                    animation: 'norenFadeUp 0.5s ease 0.35s both',
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: C.s700,
                      fontFamily: FONT,
                      margin: '0 0 6px',
                    }}
                  >
                    歩き始めた。最初の足跡を残せ。
                  </p>
                  <p style={{ fontSize: 12, color: C.s400, fontFamily: FONT, margin: 0 }}>
                    突破・苦戦・コツ、なんでもいい。残すことに意味がある。
                  </p>
                </div>
              ) : (
                /* Timeline grouped by date */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {sortedDates.map((date) => {
                    const dayFps = byDate[date];
                    return (
                      <div key={date}>
                        {/* Date label */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 12,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: C.s500,
                              fontFamily: FONT,
                              letterSpacing: '0.06em',
                            }}
                          >
                            {formatDate(date)}
                          </span>
                          <div
                            style={{
                              flex: 1,
                              height: 1,
                              background: C.s100,
                            }}
                          />
                          <span style={{ fontSize: 10, color: C.s400, fontFamily: FONT }}>
                            {dayFps.length}件
                          </span>
                        </div>

                        {/* Footprints for this date */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {dayFps.map((fp, i) => (
                            <FootprintItem
                              key={fp.id}
                              fp={fp}
                              norenName={fp.norenName}
                              index={i}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
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
          <Link
            href="/english/noren"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: C.s400,
              fontFamily: FONT,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            <ArrowLeft size={12} color={C.s400} strokeWidth={2.2} />
            のれん一覧に戻る
          </Link>
        </footer>
      </div>
    </>
  );
}
