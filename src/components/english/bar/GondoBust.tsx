'use client';

/**
 * GondoBust - full-screen overlay when the player makes a sound.
 * Light red theme. Ink-brush name, roast line, "また明日来い" button.
 */

import React, { useEffect } from 'react';
import { useReducedMotion } from '@/lib/english/bar/a11y';
import { playGondoCough } from '@/lib/english/bar/ambient-audio';

interface Props {
  roastJp: string;
  onContinue: () => void;
}

const C = {
  bg: '#FDEEEE',
  bgDeep: '#F9D9D9',
  card: '#FFFFFF',
  border: '#E5DCC0',
  red: '#B91C1C',
  redDim: '#7F1D1D',
  amber: '#B8860B',
  ink: '#1C1917',
  inkDim: '#57534E',
};

export default function GondoBust({ roastJp, onContinue }: Props) {
  const reduced = useReducedMotion();

  // Dry cough cue as the overlay appears. No-op when audio is off.
  useEffect(() => {
    playGondoCough();
  }, []);

  const overlay: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    background: C.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: reduced ? undefined : 'gb-fade 0.25s ease-out',
    padding: 16,
    boxSizing: 'border-box',
  };

  const vignette: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(253,238,238,0) 40%, rgba(185,28,28,0.18) 100%)',
    pointerEvents: 'none',
  };

  const panel: React.CSSProperties = {
    position: 'relative',
    textAlign: 'center',
    maxWidth: 460,
    animation: reduced ? undefined : 'gb-shakein 0.4s ease-out, gb-settle 0.6s 0.4s ease-out both',
  };

  const label: React.CSSProperties = {
    fontSize: 10,
    letterSpacing: 6,
    color: C.red,
    fontWeight: 900,
    marginBottom: 20,
  };

  // Ink-brush style name via text-shadow stacking
  // clamp() keeps it bold at desktop but under control on 320-375px screens.
  const nameStyle: React.CSSProperties = {
    fontSize: 'clamp(48px, 18vw, 72px)',
    fontWeight: 900,
    color: C.ink,
    lineHeight: 1,
    margin: '0 0 28px',
    fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
    letterSpacing: 4,
    textShadow:
      '1px 0 0 rgba(28,25,23,0.2), 0 1px 0 rgba(28,25,23,0.2), ' +
      '-1px 2px 4px rgba(185,28,28,0.2), 2px 3px 0 rgba(185,28,28,0.08)',
    transform: 'rotate(-1deg)',
    display: 'inline-block',
  };

  const roast: React.CSSProperties = {
    fontSize: 'clamp(17px, 5vw, 22px)',
    fontWeight: 800,
    color: C.ink,
    background: C.card,
    padding: '16px 18px',
    borderRadius: 10,
    border: `2px solid ${C.red}`,
    fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif",
    marginBottom: 28,
    lineHeight: 1.6,
    boxShadow: '0 4px 18px rgba(185,28,28,0.15)',
    overflowWrap: 'break-word',
    wordBreak: 'normal',
  };

  const button: React.CSSProperties = {
    padding: '14px 32px',
    borderRadius: 10,
    background: C.ink,
    color: '#FAF6EC',
    border: 'none',
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 3,
    cursor: 'pointer',
    minHeight: 44,
    transition: 'background 0.15s, transform 0.1s',
  };

  const sub: React.CSSProperties = {
    fontSize: 10,
    color: C.inkDim,
    letterSpacing: 2,
    marginTop: 18,
  };

  const flash: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: '#FFFFFF',
    pointerEvents: 'none',
    animation: 'gb-flash 0.22s ease-out forwards',
  };

  return (
    <div
      style={overlay}
      role="dialog"
      aria-modal="true"
      aria-label="権藤に叱られた"
      aria-live="assertive"
    >
      {!reduced && <div style={flash} />}
      <div style={vignette} />
      <div style={panel}>
        <div style={label}>BUSTED ── 声を出したな</div>

        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
          <div style={nameStyle}>権藤</div>
          {/* ink splatter accents */}
          <span style={{
            position: 'absolute', top: -6, right: -14,
            width: 10, height: 10, borderRadius: '50%',
            background: C.redDim, opacity: 0.35,
          }} />
          <span style={{
            position: 'absolute', bottom: 4, left: -18,
            width: 6, height: 6, borderRadius: '50%',
            background: C.ink, opacity: 0.45,
          }} />
        </div>

        <div style={roast}>
          <span style={{
            color: C.red, fontSize: 16, marginRight: 4, fontWeight: 900,
          }}>「</span>
          {roastJp}
          <span style={{
            color: C.red, fontSize: 16, marginLeft: 4, fontWeight: 900,
          }}>」</span>
        </div>

        <button
          onClick={onContinue}
          style={button}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.redDim; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.ink; }}
        >
          また明日来い
        </button>

        <div style={sub}>一晩やり直し</div>
      </div>

      <style>{`
        @keyframes gb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gb-shakein {
          0%   { transform: translateX(-14px) rotate(-0.8deg); }
          20%  { transform: translateX(12px)  rotate(0.6deg); }
          40%  { transform: translateX(-8px)  rotate(-0.4deg); }
          60%  { transform: translateX(6px)   rotate(0.3deg); }
          80%  { transform: translateX(-2px)  rotate(-0.1deg); }
          100% { transform: translateX(0)     rotate(0); }
        }
        @keyframes gb-settle {
          0%   { filter: blur(0.5px); }
          100% { filter: blur(0); }
        }
        @keyframes gb-flash {
          0%   { opacity: 0.85; }
          50%  { opacity: 0.55; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
