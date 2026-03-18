'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T, PART_COLORS } from '@/data/izakaya-toeic/theme';
import trapPatterns, {
  TrapPattern,
  TrapExample,
} from '@/data/izakaya-toeic/trap-patterns';

// ── Helpers ──────────────────────────────────────────────────────────────────

function playTap() {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // audio not available
  }
}

function DangerDots({ level }: { level: 1 | 2 | 3 }) {
  const colors = ['#A8A29E', '#D4AF37', '#EF4444'];
  const labels = ['', '低', '中', '高'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i <= level ? colors[level - 1] : T.border,
            display: 'inline-block',
          }}
        />
      ))}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: colors[level - 1],
          marginLeft: 4,
        }}
      >
        {labels[level]}
      </span>
    </span>
  );
}

function FrequencyBadge({ freq }: { freq: TrapPattern['frequency'] }) {
  const map = {
    'very-common': { label: '超頻出', bg: 'rgba(239,68,68,0.1)', color: '#EF4444' },
    common:        { label: '頻出',   bg: 'rgba(212,175,55,0.12)', color: '#D4AF37' },
    occasional:    { label: '時々',   bg: 'rgba(168,162,158,0.15)', color: '#57534E' },
  };
  const m = map[freq];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: 20,
        background: m.bg,
        color: m.color,
        letterSpacing: '0.02em',
      }}
    >
      {m.label}
    </span>
  );
}

function PartBadge({ part }: { part: number }) {
  const color = PART_COLORS[part] ?? T.textMuted;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 7px',
        borderRadius: 12,
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      Part {part}
    </span>
  );
}

function ExampleCard({ ex }: { ex: TrapExample }) {
  return (
    <div
      style={{
        background: T.bgSecondary,
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 10,
        border: `1px solid ${T.border}`,
      }}
    >
      {/* Audio */}
      <div style={{ marginBottom: 10 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'block',
            marginBottom: 4,
          }}
        >
          音声
        </span>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: T.text,
            fontFamily: 'monospace',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
          }}
        >
          {ex.audio}
        </p>
      </div>

      {/* Wrong / Right */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.red,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 4,
            }}
          >
            罠の選択肢
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: T.red,
              fontFamily: 'monospace',
              lineHeight: 1.5,
              textDecoration: 'line-through',
              textDecorationColor: `${T.red}80`,
              whiteSpace: 'pre-wrap',
            }}
          >
            {ex.wrongAnswer}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.green,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 4,
            }}
          >
            正解
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: T.green,
              fontFamily: 'monospace',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}
          >
            {ex.rightAnswer}
          </p>
        </div>
      </div>

      {/* Why wrong */}
      <div
        style={{
          background: 'rgba(239,68,68,0.05)',
          border: `1px solid rgba(239,68,68,0.15)`,
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.red,
            display: 'block',
            marginBottom: 3,
          }}
        >
          なぜ罠か
        </span>
        <p style={{ margin: 0, fontSize: 13, color: T.textSub, lineHeight: 1.6 }}>
          {ex.whyWrong}
        </p>
      </div>
    </div>
  );
}

function TrapCard({
  trap,
  expanded,
  onToggle,
}: {
  trap: TrapPattern;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${expanded ? T.gold + '50' : T.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: expanded ? T.shadowMd : T.shadow,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        marginBottom: 12,
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => {
          playTap();
          onToggle();
        }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {/* Danger indicator strip */}
        <div
          style={{
            width: 4,
            minHeight: 48,
            borderRadius: 2,
            flexShrink: 0,
            background:
              trap.dangerLevel === 3
                ? T.red
                : trap.dangerLevel === 2
                ? T.gold
                : T.textMuted,
            marginTop: 2,
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: T.text,
                lineHeight: 1.3,
              }}
            >
              {trap.typeJa}
            </span>
            <FrequencyBadge freq={trap.frequency} />
            <DangerDots level={trap.dangerLevel} />
          </div>

          {/* Parts */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
            {trap.parts.map((p) => (
              <PartBadge key={p} part={p} />
            ))}
          </div>

          {/* Preview / collapsed description */}
          {!expanded && (
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: T.textSub,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {trap.description}
            </p>
          )}
        </div>

        {/* Expand chevron */}
        <div
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: T.textMuted,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            marginTop: 2,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 20px 20px 20px' }}>
          {/* Full description */}
          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: 14,
              color: T.text,
              lineHeight: 1.7,
            }}
          >
            {trap.description}
          </p>

          {/* How it works */}
          <div
            style={{
              background: T.goldBg,
              border: `1px solid ${T.goldBorder}`,
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.gold,
                display: 'block',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              どうやって罠を仕掛けるか
            </span>
            <p style={{ margin: 0, fontSize: 13, color: T.textSub, lineHeight: 1.7 }}>
              {trap.howItWorks}
            </p>
          </div>

          {/* How to avoid */}
          <div
            style={{
              background: T.greenBg,
              border: `1px solid rgba(16,185,129,0.2)`,
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.green,
                display: 'block',
                marginBottom: 6,
                letterSpacing: '0.04em',
              }}
            >
              攻略法
            </span>
            <p style={{ margin: 0, fontSize: 13, color: T.textSub, lineHeight: 1.7 }}>
              {trap.howToAvoid}
            </p>
          </div>

          {/* Examples */}
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.textMuted,
                display: 'block',
                marginBottom: 10,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              例題 ({trap.examples.length})
            </span>
            {trap.examples.map((ex, i) => (
              <ExampleCard key={i} ex={ex} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

type FilterPart = 'all' | 1 | 2 | 3 | 4;
type FilterFreq = 'all' | TrapPattern['frequency'];
type FilterDanger = 'all' | 1 | 2 | 3;

export default function TrapsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterPart, setFilterPart] = useState<FilterPart>('all');
  const [filterFreq, setFilterFreq] = useState<FilterFreq>('all');
  const [filterDanger, setFilterDanger] = useState<FilterDanger>('all');

  const filtered = useMemo(() => {
    let list = [...trapPatterns];
    if (filterPart !== 'all') {
      list = list.filter((t) => t.parts.includes(filterPart as number));
    }
    if (filterFreq !== 'all') {
      list = list.filter((t) => t.frequency === filterFreq);
    }
    if (filterDanger !== 'all') {
      list = list.filter((t) => t.dangerLevel === filterDanger);
    }
    // Sort by danger desc, then frequency
    const freqOrder = { 'very-common': 0, common: 1, occasional: 2 };
    list.sort((a, b) => {
      if (b.dangerLevel !== a.dangerLevel) return b.dangerLevel - a.dangerLevel;
      return freqOrder[a.frequency] - freqOrder[b.frequency];
    });
    return list;
  }, [filterPart, filterFreq, filterDanger]);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  const filterBtnStyle = (active: boolean, color?: string): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: 20,
    border: `1px solid ${active ? (color ?? T.gold) : T.border}`,
    background: active ? (color ? `${color}15` : T.goldBg) : T.surface,
    color: active ? (color ?? T.gold) : T.textSub,
    fontSize: 12,
    fontWeight: active ? 700 : 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  });

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

        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 800,
                color: T.text,
                letterSpacing: '-0.02em',
              }}
            >
              TOEICの罠パターン
            </h1>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: T.gold,
                background: T.goldBg,
                border: `1px solid ${T.goldBorder}`,
                borderRadius: 20,
                padding: '2px 12px',
              }}
            >
              {trapPatterns.length} パターン
            </span>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: T.textSub, lineHeight: 1.6 }}>
            よく出る引っかけを知れば、知らない状態で解くより確実に点が上がる。全部覚えろとは言わない。自分がハマるやつを把握しておけ。
          </p>
        </div>

        {/* Filter bar */}
        <div
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 24,
          }}
        >
          {/* Part filter */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: 8,
              }}
            >
              パート
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['all', 1, 2, 3, 4] as FilterPart[]).map((p) => (
                <button
                  key={String(p)}
                  onClick={() => setFilterPart(p)}
                  style={filterBtnStyle(filterPart === p)}
                >
                  {p === 'all' ? 'すべて' : `Part ${p}`}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency filter */}
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: 8,
              }}
            >
              出現頻度
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(
                [
                  { val: 'all', label: 'すべて', color: undefined },
                  { val: 'very-common', label: '超頻出', color: T.red },
                  { val: 'common', label: '頻出', color: T.gold },
                  { val: 'occasional', label: '時々', color: T.textMuted },
                ] as const
              ).map(({ val, label, color }) => (
                <button
                  key={val}
                  onClick={() => setFilterFreq(val)}
                  style={filterBtnStyle(filterFreq === val, color)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Danger filter */}
          <div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: 8,
              }}
            >
              危険度
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(
                [
                  { val: 'all', label: 'すべて', color: undefined },
                  { val: 3, label: '高（上級罠）', color: T.red },
                  { val: 2, label: '中（要注意）', color: T.gold },
                  { val: 1, label: '低（見抜きやすい）', color: T.textMuted },
                ] as const
              ).map(({ val, label, color }) => (
                <button
                  key={String(val)}
                  onClick={() => setFilterDanger(val as FilterDanger)}
                  style={filterBtnStyle(filterDanger === val, color)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result count */}
        <div
          style={{
            fontSize: 13,
            color: T.textMuted,
            marginBottom: 16,
          }}
        >
          {filtered.length === trapPatterns.length
            ? `全 ${filtered.length} パターン表示中`
            : `${filtered.length} / ${trapPatterns.length} パターン`}
        </div>

        {/* Trap list */}
        {filtered.length === 0 ? (
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: '40px 20px',
              textAlign: 'center',
              color: T.textMuted,
            }}
          >
            <p style={{ margin: 0, fontSize: 15 }}>条件に合うパターンが見つかりません。</p>
            <button
              onClick={() => {
                setFilterPart('all');
                setFilterFreq('all');
                setFilterDanger('all');
              }}
              style={{
                marginTop: 12,
                padding: '8px 20px',
                background: T.goldBg,
                border: `1px solid ${T.goldBorder}`,
                borderRadius: 20,
                color: T.gold,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          <div>
            {filtered.map((trap) => (
              <TrapCard
                key={trap.id}
                trap={trap}
                expanded={expandedId === trap.id}
                onToggle={() => toggleExpand(trap.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
