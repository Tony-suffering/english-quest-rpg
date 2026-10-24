'use client';

/**
 * CustomerPortrait - Silhouette-only visual of a bar customer.
 * No faces, no emoji. Mood inferred from posture/shape/opacity.
 */

import React from 'react';
import { useReducedMotion } from '@/lib/english/bar/a11y';

type State = 'idle' | 'waiting' | 'served' | 'refused';

interface Props {
  mood: string;
  name: string;
  state: State;
}

const C = {
  ink: '#1C1917',
  inkDim: '#57534E',
  inkFaint: '#A8A29E',
  amber: '#B8860B',
  amberBg: '#FFF5D1',
  green: '#047857',
  red: '#B91C1C',
  paper: '#FAF6EC',
  border: '#E5DCC0',
};

// ─── Silhouette renderers ──────────────────────────────────
function SuitSilhouette() {
  return (
    <g fill={C.ink}>
      <rect x="42" y="58" width="36" height="42" rx="2" />
      <polygon points="42,58 60,68 78,58 78,100 42,100" fill={C.inkDim} />
      <circle cx="60" cy="40" r="14" />
      <rect x="58" y="54" width="4" height="36" fill={C.amber} opacity="0.7" />
    </g>
  );
}

function DrunkSilhouette() {
  return (
    <g fill={C.ink} transform="rotate(-8 60 70)">
      <ellipse cx="60" cy="95" rx="22" ry="6" fill={C.ink} opacity="0.15" />
      <rect x="44" y="58" width="32" height="40" rx="14" />
      <circle cx="62" cy="42" r="12" />
      <line x1="48" y1="80" x2="36" y2="92" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function GhostSilhouette() {
  return (
    <g opacity="0.45">
      <path d="M 44 38 Q 44 26 60 26 Q 76 26 76 38 L 76 94 L 70 88 L 64 94 L 56 88 L 50 94 L 44 88 Z"
        fill={C.ink} />
      <circle cx="54" cy="44" r="2" fill={C.paper} />
      <circle cx="66" cy="44" r="2" fill={C.paper} />
    </g>
  );
}

function DogSilhouette() {
  return (
    <g fill={C.ink}>
      <rect x="32" y="60" width="52" height="22" rx="6" />
      <rect x="34" y="82" width="6" height="14" />
      <rect x="46" y="82" width="6" height="14" />
      <rect x="64" y="82" width="6" height="14" />
      <rect x="76" y="82" width="6" height="14" />
      <rect x="76" y="50" width="12" height="16" rx="3" />
      <polygon points="80,50 84,42 88,50" />
      <path d="M 32 72 Q 22 68 20 78" stroke={C.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function AlienSilhouette() {
  return (
    <g fill={C.ink}>
      <polygon points="60,26 78,46 72,96 48,96 42,46" />
      <polygon points="60,26 54,14 66,14" fill={C.amber} />
      <line x1="60" y1="14" x2="60" y2="6" stroke={C.amber} strokeWidth="2" />
      <circle cx="60" cy="6" r="2" fill={C.amber} />
    </g>
  );
}

function EdoSilhouette() {
  return (
    <g fill={C.ink}>
      <rect x="46" y="56" width="28" height="42" />
      <polygon points="46,56 60,68 74,56 74,72 46,72" fill={C.inkDim} />
      <circle cx="60" cy="42" r="13" />
      <rect x="56" y="24" width="8" height="10" fill={C.ink} />
      <ellipse cx="60" cy="24" rx="10" ry="4" />
    </g>
  );
}

function HeartbrokenSilhouette() {
  return (
    <g fill={C.ink} transform="rotate(5 60 70)">
      <rect x="44" y="62" width="32" height="38" rx="4" />
      <circle cx="60" cy="46" r="13" />
      <path d="M 56 48 L 54 54 M 64 48 L 66 54" stroke={C.inkDim} strokeWidth="1.5" fill="none" />
      <path d="M 52 92 Q 60 88 68 92" stroke={C.red} strokeWidth="1.5" fill="none" opacity="0.6" />
    </g>
  );
}

function TiredSilhouette() {
  return (
    <g fill={C.ink}>
      <ellipse cx="60" cy="100" rx="24" ry="4" fill={C.ink} opacity="0.15" />
      <path d="M 40 98 Q 40 70 54 68 Q 60 64 66 68 Q 80 70 80 98 Z" />
      <circle cx="60" cy="58" r="12" />
      <line x1="54" y1="56" x2="58" y2="56" stroke={C.paper} strokeWidth="2" />
      <line x1="62" y1="56" x2="66" y2="56" stroke={C.paper} strokeWidth="2" />
    </g>
  );
}

function FirstTimeSilhouette() {
  return (
    <g fill={C.ink}>
      <rect x="50" y="58" width="20" height="44" />
      <circle cx="60" cy="44" r="12" />
      <rect x="48" y="66" width="4" height="22" />
      <rect x="68" y="66" width="4" height="22" />
      <circle cx="60" cy="44" r="16" stroke={C.amber} strokeWidth="1" fill="none" opacity="0.4" />
    </g>
  );
}

function NeutralSilhouette() {
  return (
    <g fill={C.ink}>
      <rect x="44" y="58" width="32" height="42" rx="4" />
      <circle cx="60" cy="42" r="13" />
    </g>
  );
}

function pickSilhouette(mood: string) {
  const m = mood.toLowerCase();
  if (m.includes('suit') || m.includes('business')) return <SuitSilhouette />;
  if (m.includes('drunk')) return <DrunkSilhouette />;
  if (m.includes('ghost')) return <GhostSilhouette />;
  if (m.includes('dog')) return <DogSilhouette />;
  if (m.includes('alien')) return <AlienSilhouette />;
  if (m.includes('edo') || m.includes('samurai')) return <EdoSilhouette />;
  if (m.includes('heart') || m.includes('broken') || m.includes('sad')) return <HeartbrokenSilhouette />;
  if (m.includes('tired') || m.includes('exhaust')) return <TiredSilhouette />;
  if (m.includes('first') || m.includes('new') || m.includes('shy')) return <FirstTimeSilhouette />;
  return <NeutralSilhouette />;
}

export default function CustomerPortrait({ mood, name, state }: Props) {
  const reduced = useReducedMotion();

  // Remount the noren overlay whenever the customer changes (new name).
  // The overlay plays a 700ms sway+rise, then we let it sit hidden.
  // When reduced-motion is on, skip the noren entirely — it's decorative.
  const norenKey = `${name}-${mood}`;
  const [showNoren, setShowNoren] = React.useState(!reduced);
  React.useEffect(() => {
    if (reduced) { setShowNoren(false); return; }
    setShowNoren(true);
    const id = setTimeout(() => setShowNoren(false), 760);
    return () => clearTimeout(id);
  }, [norenKey, reduced]);

  const wrap: React.CSSProperties = {
    position: 'relative',
    width: 140,
    height: 140,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: state === 'served' ? C.amberBg : '#FFFFFF',
    border: `1px solid ${state === 'served' ? C.amber : C.border}`,
    boxShadow: state === 'served'
      ? `0 0 0 4px ${C.amberBg}, 0 0 24px rgba(184,134,11,0.35)`
      : state === 'refused'
        ? `0 0 0 4px rgba(185,28,28,0.08)`
        : '0 2px 8px rgba(28,25,23,0.06)',
    animation: !reduced && state === 'waiting' ? 'cp-pulse 2.4s ease-in-out infinite' : undefined,
    opacity: state === 'refused' ? 0.35 : 1,
    transition: 'opacity 0.6s, box-shadow 0.6s, background 0.6s',
    overflow: 'hidden',
  };

  const label: React.CSSProperties = {
    position: 'absolute',
    bottom: -22,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: 800,
    color: C.inkDim,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={wrap} aria-label={`${name} (${mood})`}>
      <svg viewBox="0 0 120 110" width="100%" height="100%" style={{ display: 'block' }}>
        <ellipse cx="60" cy="104" rx="28" ry="3" fill={C.ink} opacity="0.1" />
        {pickSilhouette(mood)}
      </svg>

      {/* Noren (暖簾) entrance sway — only plays briefly on customer swap */}
      {showNoren && (
        <svg
          viewBox="0 0 120 140"
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            animation: 'cp-noren-rise 0.76s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            transformOrigin: 'top center',
          }}
          aria-hidden
        >
          {/* rail */}
          <line x1="0" y1="2" x2="120" y2="2" stroke={C.amber} strokeWidth="1.5" opacity="0.7" />
          {/* three noren panels that sway */}
          <g style={{ transformOrigin: '60px 2px', animation: 'cp-noren-sway 0.7s ease-in-out' }}>
            <rect x="6" y="2" width="34" height="78" fill={C.amber} opacity="0.82" />
            <rect x="43" y="2" width="34" height="78" fill={C.amber} opacity="0.82" />
            <rect x="80" y="2" width="34" height="78" fill={C.amber} opacity="0.82" />
            {/* slit highlights */}
            <line x1="23" y1="2" x2="23" y2="74" stroke={C.paper} strokeWidth="0.5" opacity="0.35" />
            <line x1="60" y1="2" x2="60" y2="74" stroke={C.paper} strokeWidth="0.5" opacity="0.35" />
            <line x1="97" y1="2" x2="97" y2="74" stroke={C.paper} strokeWidth="0.5" opacity="0.35" />
          </g>
        </svg>
      )}

      {name && <span style={label}>{name}</span>}
      <style>{`
        @keyframes cp-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(184,134,11,0.25), 0 2px 8px rgba(28,25,23,0.06); }
          50%     { box-shadow: 0 0 0 10px rgba(184,134,11,0), 0 2px 8px rgba(28,25,23,0.06); }
        }
        @keyframes cp-noren-rise {
          0%   { transform: translateY(0); opacity: 1; }
          55%  { transform: translateY(-20%); opacity: 1; }
          100% { transform: translateY(-110%); opacity: 0; }
        }
        @keyframes cp-noren-sway {
          0%   { transform: rotate(-3deg); }
          30%  { transform: rotate(3deg); }
          60%  { transform: rotate(-1.5deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
