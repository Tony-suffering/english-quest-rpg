'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T, PART_COLORS } from '@/data/izakaya-toeic/theme';
import { strategyGuide, StrategySection, Technique, CommonMistake } from '@/data/izakaya-toeic/strategy-guide';

// Simple tap sound using Web Audio API
function playTap() {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio not available
  }
}

function StarRating({ count }: { count: 1 | 2 | 3 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: i <= count ? T.gold : T.border,
            display: 'inline-block',
          }}
        />
      ))}
    </span>
  );
}

function TechniqueCard({ tech }: { tech: Technique }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 8,
        transition: 'box-shadow 0.2s',
        boxShadow: open ? T.shadowMd : T.shadow,
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <StarRating count={tech.effectiveness} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{tech.nameJa}</div>
          <div style={{ fontSize: 11, color: T.textMuted }}>{tech.name}</div>
        </div>
        <span style={{
          fontSize: 11,
          color: T.textMuted,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: '0 14px 14px',
            animation: 'izk-fadein 0.18s ease',
          }}
        >
          <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: '0 0 10px' }}>
            {tech.description}
          </p>
          {tech.example && (
            <div style={{
              background: T.bgSecondary,
              border: `1px solid ${T.borderLight}`,
              borderRadius: 8,
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 5 }}>EXAMPLE</div>
              <pre style={{
                fontSize: 12,
                color: T.textSub,
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
              }}>
                {tech.example}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MistakeCard({ mistake }: { mistake: CommonMistake }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 8,
        background: T.surface,
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '11px 14px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: T.red,
          flexShrink: 0,
          display: 'inline-block',
        }} />
        <span style={{ flex: 1, fontSize: 13, color: T.text, lineHeight: 1.5 }}>
          {mistake.mistake}
        </span>
        <span style={{
          fontSize: 11,
          color: T.textMuted,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
          flexShrink: 0,
        }}>
          ▾
        </span>
      </button>

      {open && (
        <div style={{ padding: '0 14px 14px', animation: 'izk-fadein 0.18s ease' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              background: 'rgba(239,68,68,0.05)',
              border: `1px solid rgba(239,68,68,0.15)`,
              borderRadius: 7,
              padding: '8px 11px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.red, letterSpacing: 1, marginBottom: 3 }}>WHY</div>
              <p style={{ fontSize: 12, color: T.textSub, margin: 0, lineHeight: 1.7 }}>{mistake.why}</p>
            </div>
            <div style={{
              background: 'rgba(16,185,129,0.05)',
              border: `1px solid rgba(16,185,129,0.15)`,
              borderRadius: 7,
              padding: '8px 11px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: 1, marginBottom: 3 }}>FIX</div>
              <p style={{ fontSize: 12, color: T.textSub, margin: 0, lineHeight: 1.7 }}>{mistake.fix}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PartPanel({ section }: { section: StrategySection }) {
  const partColor = PART_COLORS[section.partNumber] || T.gold;
  const [mistakesOpen, setMistakesOpen] = useState(false);

  return (
    <div style={{ animation: 'izk-fadein 0.22s ease' }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
        padding: '14px 16px',
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        boxShadow: T.shadow,
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${partColor}18`,
          border: `2px solid ${partColor}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: 14,
          color: partColor,
          flexShrink: 0,
        }}>
          P{section.partNumber}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{section.partNameJa}</div>
          <div style={{ fontSize: 11, color: T.textMuted }}>{section.partName} &middot; {section.questionCount}問 &middot; {section.timePerQuestion}</div>
        </div>
      </div>

      {/* Overview */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 8 }}>OVERVIEW</div>
        <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.85, margin: 0 }}>
          {section.overview}
        </p>
      </div>

      {/* Master Quote */}
      <div style={{
        border: `1px solid ${T.goldBorder}`,
        borderLeft: `3px solid ${T.gold}`,
        background: T.goldBg,
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 2, marginBottom: 6 }}>MASTER</div>
        <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
          {section.masterQuote}
        </p>
      </div>

      {/* Techniques */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 10 }}>
          TECHNIQUES &mdash; {section.techniques.length}個
        </div>
        {section.techniques.map(tech => (
          <TechniqueCard key={tech.id} tech={tech} />
        ))}
      </div>

      {/* Common Mistakes */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setMistakesOpen(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0 0 10px',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, flex: 1 }}>
            COMMON MISTAKES &mdash; {section.commonMistakes.length}個
          </div>
          <span style={{
            fontSize: 11,
            color: T.textMuted,
            transition: 'transform 0.2s',
            transform: mistakesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>
            ▾
          </span>
        </button>
        {mistakesOpen && (
          <div style={{ animation: 'izk-fadein 0.18s ease' }}>
            {section.commonMistakes.map((m, i) => (
              <MistakeCard key={i} mistake={m} />
            ))}
          </div>
        )}
      </div>

      {/* Score Impact */}
      <div style={{
        background: T.bgSecondary,
        border: `1px solid ${T.borderLight}`,
        borderRadius: 8,
        padding: '10px 14px',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 5 }}>SCORE IMPACT</div>
        <p style={{ fontSize: 12, color: T.textSub, lineHeight: 1.75, margin: 0 }}>
          {section.scoreImpact}
        </p>
      </div>
    </div>
  );
}

export default function GuidePage() {
  const [selectedPart, setSelectedPart] = useState(1);
  const section = strategyGuide.find(s => s.partNumber === selectedPart);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes izk-fadein {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero */}
      <div style={{
        padding: '36px 20px 28px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <Link
          href="/english/izakaya-toeic"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: T.textMuted,
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          &larr; 居酒屋TOEIC
        </Link>

        <div style={{
          display: 'inline-block',
          padding: '3px 12px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 12,
          marginLeft: 8,
        }}>
          TOEIC LISTENING
        </div>

        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 34px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -0.5,
        }}>
          攻略ガイド
        </h1>
        <p style={{ fontSize: 12, color: T.textMuted, margin: 0 }}>
          Part 1 - 4 全パート戦略解説
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 60px' }}>
        {/* Part Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginBottom: 24,
        }}>
          {strategyGuide.map(s => {
            const color = PART_COLORS[s.partNumber] || T.gold;
            const active = selectedPart === s.partNumber;
            return (
              <button
                key={s.partNumber}
                onClick={() => {
                  playTap();
                  setSelectedPart(s.partNumber);
                }}
                style={{
                  padding: '10px 4px',
                  borderRadius: 10,
                  border: active ? `2px solid ${color}` : `2px solid ${T.border}`,
                  background: active ? `${color}14` : T.surface,
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  boxShadow: active ? `0 0 0 3px ${color}18` : T.shadow,
                }}
              >
                <div style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: active ? color : T.textMuted,
                  lineHeight: 1,
                  marginBottom: 3,
                }}>
                  P{s.partNumber}
                </div>
                <div style={{
                  fontSize: 9,
                  color: active ? color : T.textMuted,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  lineHeight: 1.3,
                }}>
                  {s.partNameJa}
                </div>
                <div style={{
                  fontSize: 9,
                  color: active ? `${color}99` : T.textMuted,
                  marginTop: 2,
                }}>
                  {s.questionCount}問
                </div>
              </button>
            );
          })}
        </div>

        {/* Part Content */}
        {section && <PartPanel key={selectedPart} section={section} />}
      </div>
    </div>
  );
}
