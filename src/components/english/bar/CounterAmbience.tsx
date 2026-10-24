'use client';

/**
 * CounterAmbience - subtle ambient strip above the main game.
 * Clock, bottle wall, chalkboard menu. Color shifts by phase.
 */

import React, { useEffect, useMemo, useState } from 'react';

type Phase = 'early' | 'peak' | 'late' | 'closing';

interface Props {
  phase: Phase;
  customerIdx: number;
}

const C = {
  bg: '#FAF6EC',
  bgDeep: '#F2ECD8',
  card: '#FFFFFF',
  border: '#E5DCC0',
  amber: '#B8860B',
  amberBg: '#FFF5D1',
  ink: '#1C1917',
  inkDim: '#57534E',
  chalk: '#F2ECD8',
  board: '#2A2520',
};

const PHASE_TIME: Record<Phase, { h: number; m: number }> = {
  early: { h: 19, m: 30 },
  peak: { h: 22, m: 0 },
  late: { h: 25, m: 30 }, // display as 1:30
  closing: { h: 28, m: 0 }, // display as 4:00
};

const PHASE_TINT: Record<Phase, string> = {
  early: 'linear-gradient(180deg, rgba(255,245,209,0.55), rgba(250,246,236,0))',
  peak: 'linear-gradient(180deg, rgba(255,220,150,0.55), rgba(250,246,236,0))',
  late: 'linear-gradient(180deg, rgba(210,215,230,0.45), rgba(250,246,236,0))',
  closing: 'linear-gradient(180deg, rgba(170,190,225,0.6), rgba(250,246,236,0))',
};

const DRINK_POOL = [
  'ホッピー 480',
  '黒ホッピー 520',
  'レモンサワー 500',
  'ハイボール 550',
  'ぬる燗 600',
  '熱燗 600',
  'ビール中 620',
  '梅酒ロック 580',
  '焼酎 麦 520',
  '焼酎 芋 540',
  '日本酒 獺祭 800',
  'ジムビーム 600',
];

function formatClock(h: number, m: number): string {
  const hh = (h % 24).toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

function ClockFace({ phase, tickMin, tickSec }: { phase: Phase; tickMin: number; tickSec: number }) {
  const base = PHASE_TIME[phase];
  const totalMin = base.h * 60 + base.m + tickMin;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const display = formatClock(h, m);

  // Second-hand angle from real-time seconds. Minute-hand uses our tickMin.
  const secAngle = (tickSec / 60) * 360 - 90;
  const minAngle = ((m % 60) / 60) * 360 - 90;
  const hourAngle = (((h % 12) + m / 60) / 12) * 360 - 90;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const hx = 11 + Math.cos(rad(hourAngle)) * 4.5;
  const hy = 11 + Math.sin(rad(hourAngle)) * 4.5;
  const mx = 11 + Math.cos(rad(minAngle)) * 6.2;
  const my = 11 + Math.sin(rad(minAngle)) * 6.2;
  const sx = 11 + Math.cos(rad(secAngle)) * 7;
  const sy = 11 + Math.sin(rad(secAngle)) * 7;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="9" fill={C.card} stroke={C.amber} strokeWidth="1" />
        {/* hour */}
        <line x1="11" y1="11" x2={hx} y2={hy} stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
        {/* minute */}
        <line x1="11" y1="11" x2={mx} y2={my} stroke={C.ink} strokeWidth="1" strokeLinecap="round" />
        {/* second — thin amber, ticks every real-time second */}
        <line
          x1="11"
          y1="11"
          x2={sx}
          y2={sy}
          stroke={C.amber}
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="11" cy="11" r="0.9" fill={C.amber} />
      </svg>
      <span style={{
        fontFamily: '"Courier New", monospace',
        fontSize: 11, fontWeight: 800, color: C.ink, letterSpacing: 1,
      }}>{display}</span>
    </div>
  );
}

function BottleWall() {
  const bottles = [
    { kind: 'amber', x: 2 },
    { kind: 'clear', x: 14 },
    { kind: 'dark', x: 26 },
    { kind: 'amber', x: 38 },
    { kind: 'clear', x: 50 },
    { kind: 'dark', x: 62 },
    { kind: 'amber', x: 74 },
    { kind: 'clear', x: 86 },
    { kind: 'dark', x: 98 },
  ];
  const colorFor = (k: string) =>
    k === 'amber' ? '#C08A2A' : k === 'clear' ? '#D8D4C0' : '#3A2A1E';

  // Preserve aspect ratio; fit to parent flex width (min 80, max 120).
  return (
    <svg
      viewBox="0 0 112 36"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', width: '100%', maxWidth: 120, minWidth: 80, height: 'auto' }}
    >
      {bottles.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="4" width="2" height="6" fill={colorFor(b.kind)} opacity="0.9" />
          <rect x={b.x - 1} y="10" width="4" height="4" rx="0.5" fill={colorFor(b.kind)} opacity="0.9" />
          <rect x={b.x - 2} y="14" width="6" height="18" rx="1" fill={colorFor(b.kind)} opacity="0.85" />
          <rect x={b.x - 1} y="20" width="4" height="1" fill="#FAF6EC" opacity="0.4" />
        </g>
      ))}
      <line x1="0" y1="33" x2="112" y2="33" stroke={C.border} strokeWidth="1" />
    </svg>
  );
}

function Chalkboard({ drinks }: { drinks: string[] }) {
  return (
    <div style={{
      background: C.board,
      border: `1px solid ${C.ink}`,
      borderRadius: 4,
      padding: '6px 8px',
      minWidth: 96,
      flexShrink: 0,
      fontFamily: "'Courier New', monospace",
      boxShadow: 'inset 0 0 8px rgba(255,245,209,0.08)',
    }}>
      <div style={{ fontSize: 8, letterSpacing: 2, color: C.amber, fontWeight: 800, marginBottom: 2 }}>
        お品書き
      </div>
      {drinks.map((d, i) => (
        <div key={i} style={{ fontSize: 9, color: C.chalk, lineHeight: 1.5 }}>{d}</div>
      ))}
    </div>
  );
}

export default function CounterAmbience({ phase, customerIdx }: Props) {
  const [tick, setTick] = useState(0);
  const [sec, setSec] = useState(() => new Date().getSeconds());
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 60), 4000);
    return () => clearInterval(id);
  }, []);
  // Real-time second-hand: sync once per second from clock.
  useEffect(() => {
    const id = setInterval(() => setSec(new Date().getSeconds()), 1000);
    return () => clearInterval(id);
  }, []);

  const drinks = useMemo(() => {
    const seed = customerIdx * 7;
    const out: string[] = [];
    for (let i = 0; i < 3; i++) {
      out.push(DRINK_POOL[(seed + i * 3) % DRINK_POOL.length]);
    }
    return out;
  }, [customerIdx]);

  const wrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: 560,
    padding: '10px 12px',
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    overflow: 'hidden',
    boxSizing: 'border-box',
    transition: 'background 1.2s',
  };

  const tint: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: PHASE_TINT[phase],
    pointerEvents: 'none',
    transition: 'background 1.2s',
  };

  return (
    <div style={wrap} aria-label={`counter ambience ${phase}`}>
      <div style={tint} />
      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <ClockFace phase={phase} tickMin={tick} tickSec={sec} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, flex: '1 1 0', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
        <BottleWall />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Chalkboard drinks={drinks} />
      </div>
    </div>
  );
}
