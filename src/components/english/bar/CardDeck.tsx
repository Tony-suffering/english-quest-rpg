'use client';

/**
 * CardDeck - 4-5 card choice UI for the Silent Bartender game.
 *
 * Phases:
 *   - enter      : cards fluttering in from below (low opacity, locked)
 *   - listening  : stacked + slightly fanned, dimmed, locked
 *   - decide     : fully lit, hoverable, keyboard-navigable
 *   - reacting   : picked card flips (green) or shakes (red); correct card glows
 *
 * Keyboard:
 *   - 1..9    : direct select that card (same as click)
 *   - Tab     : native focus order between cards
 *   - Arrows  : move focus (↓ / → next, ↑ / ← prev)
 *   - Enter   : confirm focused card
 *   - Escape  : blur (abort the selection attempt)
 */

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/english/bar/a11y';

type Phase = 'enter' | 'listening' | 'decide' | 'reacting';

interface Props {
  cards: string[];
  onPick: (idx: number) => void;
  disabled: boolean;
  picked: number | null;
  correctIdx: number | null;
  phase: Phase;
}

const C = {
  bg: '#FAF6EC',
  bgDeep: '#F2ECD8',
  card: '#FFFFFF',
  cardHover: '#FFF8E1',
  border: '#E5DCC0',
  amber: '#B8860B',
  amberBg: '#FFF5D1',
  red: '#B91C1C',
  redBg: '#FEF2F2',
  green: '#047857',
  greenBg: '#ECFDF5',
  ink: '#1C1917',
  inkDim: '#57534E',
  inkFaint: '#A8A29E',
};

export default function CardDeck({
  cards, onPick, disabled, picked, correctIdx, phase,
}: Props) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    refs.current = refs.current.slice(0, cards.length);
  }, [cards.length]);

  // ─── Clear any leftover inline hover/focus styles when phase changes.
  // Without this, a card the player was hovering in 'decide' keeps its
  // amber border and translated position once we move to 'reacting',
  // which then fights with cardStyle(i)'s computed reaction styles. ───
  useEffect(() => {
    for (const btn of refs.current) {
      if (!btn) continue;
      btn.style.borderColor = '';
      btn.style.background = '';
      btn.style.transform = '';
      btn.style.boxShadow = '';
    }
  }, [phase]);

  // ─── Global number-key shortcuts (1..9 → select) + Escape to blur ───
  useEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const tgt = e.target as HTMLElement | null;
      const tag = tgt?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (tgt?.isContentEditable ?? false)) return;

      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement | null)?.blur?.();
        return;
      }

      // Digit keys 1..9
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= cards.length) {
        e.preventDefault();
        onPick(n - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [disabled, cards.length, onPick]);

  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (disabled) return;
      e.preventDefault();
      onPick(i);
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = refs.current[(i + 1) % cards.length];
      next?.focus();
      return;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = refs.current[(i - 1 + cards.length) % cards.length];
      prev?.focus();
      return;
    }
  };

  const cardStyle = (i: number): React.CSSProperties => {
    const isPicked = picked === i;
    const isCorrectReveal = phase === 'reacting' && correctIdx === i;
    const isWrongPick = phase === 'reacting' && isPicked && correctIdx !== null && i !== correctIdx;

    const bg = isPicked && phase === 'reacting'
      ? (i === correctIdx ? C.greenBg : C.redBg)
      : isCorrectReveal
        ? C.greenBg
        : C.card;
    const border = isPicked && phase === 'reacting'
      ? (i === correctIdx ? C.green : C.red)
      : isCorrectReveal
        ? C.green
        : C.border;

    // Listening: subtle stacked fan — small rotation + vertical offset.
    // Reduced-motion: flat stack, no rotation.
    const listeningRot = !reduced && phase === 'listening' ? (i - (cards.length - 1) / 2) * 1.2 : 0;
    const listeningY = !reduced && phase === 'listening' ? Math.abs(i - (cards.length - 1) / 2) * 2 : 0;

    return {
      position: 'relative',
      background: bg,
      border: `1.5px solid ${border}`,
      borderRadius: 10,
      padding: '14px 14px 14px 30px',
      fontSize: 14,
      fontWeight: 500,
      color: C.ink,
      textAlign: 'left',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'inherit',
      width: '100%',
      minHeight: 44,
      boxSizing: 'border-box',
      overflowWrap: 'break-word',
      wordBreak: 'normal',
      hyphens: 'auto',
      transition: 'border-color 0.2s, background 0.25s, transform 0.2s, box-shadow 0.2s',
      transform: `rotate(${listeningRot}deg) translateY(${listeningY}px)`,
      boxShadow: isWrongPick
        ? '0 0 0 3px rgba(185,28,28,0.15)'
        : (isPicked && phase === 'reacting' && i === correctIdx) || isCorrectReveal
          ? '0 0 0 3px rgba(4,120,87,0.18), 0 0 20px rgba(4,120,87,0.18)'
          : phase === 'decide' ? '0 1px 2px rgba(28,25,23,0.04)' : 'none',
      animation: reduced
        ? undefined
        : isPicked && phase === 'reacting'
          ? (i === correctIdx ? 'cd-flip-good 0.55s ease-out' : 'cd-shake-bad 0.45s ease-out')
          : phase === 'enter' ? `cd-flutter 0.55s ease-out ${i * 0.07}s both`
            : undefined,
      opacity: phase === 'reacting' && picked !== null && !isPicked && !isCorrectReveal ? 0.45 : 1,
      outline: 'none',
    };
  };

  const hoverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || phase !== 'decide') return;
    const el = e.currentTarget;
    el.style.borderColor = C.amber;
    el.style.background = C.cardHover;
    el.style.transform = 'translateY(-3px)';
    el.style.boxShadow = '0 6px 16px rgba(184,134,11,0.18)';
  };
  const hoverLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== 'decide') return;
    const el = e.currentTarget;
    el.style.borderColor = C.border;
    el.style.background = C.card;
    el.style.transform = 'translateY(0)';
    el.style.boxShadow = '0 1px 2px rgba(28,25,23,0.04)';
  };
  const focusIn = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (phase !== 'decide') return;
    const el = e.currentTarget;
    el.style.borderColor = C.amber;
    el.style.boxShadow = '0 0 0 3px rgba(184,134,11,0.22)';
  };
  const focusOut = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (phase !== 'decide') return;
    const el = e.currentTarget;
    el.style.borderColor = C.border;
    el.style.boxShadow = '0 1px 2px rgba(28,25,23,0.04)';
  };

  // Overall visibility per phase
  const wrapOpacity = phase === 'decide' || phase === 'reacting'
    ? 1
    : phase === 'listening' ? 0.6
      : /* enter */ 1;

  return (
    <div
      ref={wrapRef}
      role="radiogroup"
      aria-label="英語カードの選択"
      aria-disabled={disabled}
      style={{
        display: 'grid',
        gap: 8,
        opacity: wrapOpacity,
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'opacity 0.3s',
      }}
    >
      {cards.map((text, i) => (
        <button
          key={i}
          ref={el => { refs.current[i] = el; }}
          role="radio"
          aria-checked={picked === i}
          aria-keyshortcuts={`${i + 1}`}
          tabIndex={disabled ? -1 : 0}
          onClick={() => { if (!disabled) onPick(i); }}
          onKeyDown={e => handleKey(e, i)}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
          onFocus={focusIn}
          onBlur={focusOut}
          style={cardStyle(i)}
        >
          {/* Number hint (top-left, subtle) */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: 6,
              left: 8,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: C.inkFaint,
              fontFamily: "'Courier New', monospace",
              opacity: 0.55,
              pointerEvents: 'none',
            }}
          >
            {i + 1}
          </span>

          {/* Letter label (inline) */}
          <span style={{
            display: 'inline-block',
            marginRight: 10,
            color: C.amber,
            fontFamily: "'Courier New', monospace",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
          }}>
            {String.fromCharCode(65 + i)}
          </span>
          <span>{text}</span>
          {phase === 'reacting' && picked === i && correctIdx !== null && (
            <span style={{
              float: 'right',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              color: i === correctIdx ? C.green : C.red,
            }}>
              {i === correctIdx ? '正解' : '不正解'}
            </span>
          )}
          {/* Amber ripple on correct pick — subtle radial spread.
              Suppressed entirely for reduced-motion users. */}
          {!reduced && phase === 'reacting' && picked === i && correctIdx === i && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 10,
                pointerEvents: 'none',
                animation: 'cd-ripple 0.7s ease-out forwards',
                boxShadow: '0 0 0 0 rgba(184,134,11,0.35)',
              }}
            />
          )}
        </button>
      ))}
      <style>{`
        @keyframes cd-flutter {
          0%   { opacity: 0; transform: translateY(28px) rotate(-1.5deg); }
          60%  { opacity: 1; transform: translateY(-2px) rotate(0.4deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes cd-flip-good {
          0%   { transform: rotateX(0deg) scale(1); }
          45%  { transform: rotateX(-90deg) scale(1.03); }
          100% { transform: rotateX(0deg) scale(1); }
        }
        @keyframes cd-shake-bad {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-8px); }
          40%  { transform: translateX(8px); }
          60%  { transform: translateX(-5px); }
          80%  { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        @keyframes cd-ripple {
          0%   { box-shadow: 0 0 0 0 rgba(184,134,11,0.38), 0 0 0 0 rgba(4,120,87,0.2); opacity: 1; }
          60%  { box-shadow: 0 0 0 10px rgba(184,134,11,0.08), 0 0 0 14px rgba(4,120,87,0.05); opacity: 1; }
          100% { box-shadow: 0 0 0 18px rgba(184,134,11,0), 0 0 0 22px rgba(4,120,87,0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
