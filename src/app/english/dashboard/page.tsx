'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureData {
  label: string;
  color: string;
  href: string;
  type: 'progress' | 'cumulative' | 'streak' | 'level' | 'cards' | 'days';
  touched: number;
  total: number | null;
  extra?: string;
  sublabel?: string;
}

interface CardRankBreakdown {
  legendary: number;
  holographic: number;
  gold: number;
  silver: number;
  bronze: number;
  normal: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function levelFromXP(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.pow(xp / 100, 0.5)) + 1;
}

function xpForLevel(level: number): number {
  return (level ** 2) * 100;
}

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const w = weekdays[date.getDay()];
  return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')} ${w}`;
}

// ---------------------------------------------------------------------------
// Data loaders (all from localStorage)
// ---------------------------------------------------------------------------

function loadMaster365(): { touched: number; total: number } {
  const raw = safeParseJSON<Record<string, number>>(
    localStorage.getItem('master-365-mastery'),
    {},
  );
  const touched = Object.values(raw).filter((v) => v >= 1).length;
  return { touched, total: 3650 };
}

function loadDailyTraining(): { registered: number; mastered: number } {
  const phrases = safeParseJSON<unknown[]>(
    localStorage.getItem('my-training-phrases'),
    [],
  );
  const mastery = safeParseJSON<Record<string, number>>(
    localStorage.getItem('my-training-mastery') ||
      localStorage.getItem('quest-mastery'),
    {},
  );
  const mastered = Object.values(mastery).filter((v) => v >= 3).length;
  return { registered: phrases.length, mastered };
}

function loadCheckinStreak(): { current: number; best: number } {
  const data = safeParseJSON<{ current?: number; lastDate?: string; best?: number }>(
    localStorage.getItem('365-checkin-streak'),
    {},
  );
  return { current: data.current ?? 0, best: data.best ?? 0 };
}

function loadPlayerLevel(): { level: number; xp: number; sparks: number; nextXP: number; currentLevelXP: number } {
  const stats = safeParseJSON<{ total_xp?: number; sparks?: number }>(
    localStorage.getItem('quest-playerStats'),
    {},
  );
  const xp = stats.total_xp ?? 0;
  const sparks = stats.sparks ?? 0;
  const level = levelFromXP(xp);
  const currentLevelXP = xpForLevel(level - 1);
  const nextXP = xpForLevel(level);
  return { level, xp, sparks, nextXP, currentLevelXP };
}

function loadCardCollection(): { total: number; breakdown: CardRankBreakdown } {
  const points = safeParseJSON<Record<string, number>>(
    localStorage.getItem('quest-cardPoints'),
    {},
  );
  const breakdown: CardRankBreakdown = {
    legendary: 0,
    holographic: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    normal: 0,
  };
  let total = 0;
  for (const p of Object.values(points)) {
    if (p < 1) continue;
    total++;
    if (p >= 250) breakdown.legendary++;
    else if (p >= 100) breakdown.holographic++;
    else if (p >= 50) breakdown.gold++;
    else if (p >= 20) breakdown.silver++;
    else if (p >= 5) breakdown.bronze++;
    else breakdown.normal++;
  }
  return { total, breakdown };
}

function loadActiveDays(): number {
  let count = 0;
  const seen = new Set<string>();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (/^365-checkin-\d+$/.test(key)) {
      seen.add(key);
      count++;
    }
    if (/^kaiwa-quest-/.test(key)) {
      if (!seen.has(key)) count++;
    }
  }
  return count;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProgressBar({
  value,
  max,
  color,
  height = 6,
}: {
  value: number;
  max: number;
  color: string;
  height?: number;
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div
      style={{
        height,
        backgroundColor: '#E7E5E4',
        borderRadius: height / 2,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: color,
          borderRadius: height / 2,
          transition: 'width 0.6s ease',
        }}
      />
    </div>
  );
}

function RankBadge({ label, count, color }: { label: string; count: number; color: string }) {
  if (count === 0) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 6,
        backgroundColor: color + '18',
        color,
        fontSize: 11,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {label} {count}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  // Data state
  const [master365, setMaster365] = useState({ touched: 0, total: 3650 });
  const [training, setTraining] = useState({ registered: 0, mastered: 0 });
  const [streak, setStreak] = useState({ current: 0, best: 0 });
  const [player, setPlayer] = useState({ level: 1, xp: 0, sparks: 0, nextXP: 100, currentLevelXP: 0 });
  const [cards, setCards] = useState<{ total: number; breakdown: CardRankBreakdown }>({
    total: 0,
    breakdown: { legendary: 0, holographic: 0, gold: 0, silver: 0, bronze: 0, normal: 0 },
  });
  const [activeDays, setActiveDays] = useState(0);

  useEffect(() => {
    setMaster365(loadMaster365());
    setTraining(loadDailyTraining());
    setStreak(loadCheckinStreak());
    setPlayer(loadPlayerLevel());
    setCards(loadCardCollection());
    setActiveDays(loadActiveDays());
    setLoaded(true);
  }, []);

  const grandTotal = master365.touched + training.registered + cards.total + activeDays;

  const today = formatDate(new Date());

  if (!loaded) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }} />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
      {/* Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#FAFAF9',
          borderBottom: '1px solid #E7E5E4',
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: 14,
              fontWeight: 600,
              color: '#78716C',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>&larr;</span>
            Back
          </button>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#44403C',
              letterSpacing: '0.05em',
            }}
          >
            積み上げ
          </span>
          <span
            style={{
              fontSize: 11,
              color: '#A8A29E',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {today}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 60px' }}>
        {/* Hero Section */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            border: '1px solid #E7E5E4',
            padding: '32px 24px 24px',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#A8A29E',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            GRAND TOTAL
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: '#D4AF37',
              lineHeight: 1.1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {grandTotal.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#78716C',
              marginTop: 8,
              marginBottom: 20,
            }}
          >
            これだけの英語に触れてきた
          </div>
          <ProgressBar
            value={master365.touched}
            max={master365.total}
            color="#D4AF37"
            height={8}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 6,
              fontSize: 11,
              color: '#A8A29E',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>{master365.touched.toLocaleString()}</span>
            <span>{master365.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Feature Rows */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            border: '1px solid #E7E5E4',
            overflow: 'hidden',
          }}
        >
          {/* 英会話マスター365 */}
          <FeatureRow
            label="英会話マスター365"
            color="#D4AF37"
            href="/english/izakaya-toeic/kaiwa"
            onClick={() => router.push('/english/izakaya-toeic/kaiwa')}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#44403C', fontVariantNumeric: 'tabular-nums' }}>
                  {master365.touched.toLocaleString()} / {master365.total.toLocaleString()}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', fontVariantNumeric: 'tabular-nums' }}>
                  {master365.total > 0 ? ((master365.touched / master365.total) * 100).toFixed(1) : '0.0'}%
                </span>
              </div>
              <ProgressBar value={master365.touched} max={master365.total} color="#D4AF37" />
            </div>
          </FeatureRow>

          <Divider />

          {/* Daily Training */}
          <FeatureRow
            label="Daily Training"
            color="#EF4444"
            href="/english/my-training"
            onClick={() => router.push('/english/my-training')}
          >
            <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <div>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#EF4444', fontVariantNumeric: 'tabular-nums' }}>
                  {training.registered}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', marginLeft: 4 }}>registered</span>
              </div>
              <div>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#44403C', fontVariantNumeric: 'tabular-nums' }}>
                  {training.mastered}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', marginLeft: 4 }}>mastered</span>
              </div>
            </div>
          </FeatureRow>

          <Divider />

          {/* チェックイン連続 */}
          <FeatureRow
            label="チェックイン連続"
            color="#10B981"
            href="/english/izakaya-toeic/kaiwa"
            onClick={() => router.push('/english/izakaya-toeic/kaiwa')}
          >
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
              <div>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#10B981', fontVariantNumeric: 'tabular-nums' }}>
                  {streak.current}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', marginLeft: 4 }}>days</span>
              </div>
              <div style={{ fontSize: 11, color: '#A8A29E' }}>
                best: <span style={{ fontWeight: 700, color: '#78716C', fontVariantNumeric: 'tabular-nums' }}>{streak.best}</span>
              </div>
            </div>
          </FeatureRow>

          <Divider />

          {/* プレイヤーレベル */}
          <FeatureRow
            label="プレイヤーレベル"
            color="#7C3AED"
            href="/english/my-training"
            onClick={() => router.push('/english/my-training')}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#7C3AED', fontVariantNumeric: 'tabular-nums' }}>
                  Lv. {player.level}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', fontVariantNumeric: 'tabular-nums' }}>
                  {player.xp.toLocaleString()} / {player.nextXP.toLocaleString()} XP
                </span>
              </div>
              <ProgressBar
                value={player.xp - player.currentLevelXP}
                max={player.nextXP - player.currentLevelXP}
                color="#7C3AED"
              />
            </div>
          </FeatureRow>

          <Divider />

          {/* カードコレクション */}
          <FeatureRow
            label="カードコレクション"
            color="#D97706"
            href="/english/my-training"
            onClick={() => router.push('/english/my-training')}
          >
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#D97706', fontVariantNumeric: 'tabular-nums' }}>
                  {cards.total}
                </span>
                <span style={{ fontSize: 11, color: '#A8A29E', marginLeft: 4 }}>cards</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <RankBadge label="LEGENDARY" count={cards.breakdown.legendary} color="#D97706" />
                <RankBadge label="HOLO" count={cards.breakdown.holographic} color="#7C3AED" />
                <RankBadge label="GOLD" count={cards.breakdown.gold} color="#D4AF37" />
                <RankBadge label="SILVER" count={cards.breakdown.silver} color="#78716C" />
                <RankBadge label="BRONZE" count={cards.breakdown.bronze} color="#B45309" />
                <RankBadge label="NORMAL" count={cards.breakdown.normal} color="#A8A29E" />
              </div>
            </div>
          </FeatureRow>

          <Divider />

          {/* アクティブ日数 */}
          <FeatureRow
            label="アクティブ日数"
            color="#2563EB"
            href="/english/izakaya-toeic/kaiwa"
            onClick={() => router.push('/english/izakaya-toeic/kaiwa')}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#2563EB', fontVariantNumeric: 'tabular-nums' }}>
                {activeDays}
              </span>
              <span style={{ fontSize: 11, color: '#A8A29E' }}>days</span>
            </div>
          </FeatureRow>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared row + divider
// ---------------------------------------------------------------------------

function FeatureRow({
  label,
  color,
  href,
  onClick,
  children,
}: {
  label: string;
  color: string;
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        padding: '16px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FAFAF9';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
      }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#78716C',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 14,
            color: '#D6D3D1',
            lineHeight: 1,
          }}
        >
          &rsaquo;
        </span>
      </div>
      {/* Content */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
        {children}
      </div>
    </button>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: '#F5F5F4',
        marginLeft: 20,
        marginRight: 20,
      }}
    />
  );
}
