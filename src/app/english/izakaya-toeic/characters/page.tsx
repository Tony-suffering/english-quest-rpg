'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { ToeicPart } from '@/data/izakaya-toeic/types';
import { T } from '@/data/izakaya-toeic/theme';

const PART_SHORT: Record<ToeicPart, string> = {
  1: 'P1', 2: 'P2', 3: 'P3', 4: 'P4', 5: 'P5', 6: 'P6', 7: 'P7',
};

export default function CharactersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 60px' }}>
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 11, color: T.textMuted, textDecoration: 'none',
          display: 'block', marginBottom: 12,
        }}>
          {'<'} 居酒屋TOEIC
        </Link>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
          のれんの常連たち
        </h1>
        <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          居酒屋「のれん」に集まる6人。それぞれがTOEICのスコアアップを目指している。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {IZAKAYA_CHARACTERS.map(char => {
            const isExpanded = expandedId === char.id;
            return (
              <div
                key={char.id}
                onClick={() => setExpandedId(isExpanded ? null : char.id)}
                style={{
                  padding: '16px 18px',
                  background: T.surface,
                  borderRadius: 12,
                  border: `1px solid ${isExpanded ? char.color + '40' : T.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: T.shadow,
                }}
              >
                {/* Main row */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: char.color + '15',
                    border: `2.5px solid ${char.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 18, color: char.color,
                    flexShrink: 0,
                    boxShadow: isExpanded ? `0 0 16px ${char.color}30` : 'none',
                    transition: 'box-shadow 0.2s',
                  }}>
                    {char.initial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 800, fontSize: 16 }}>{char.name}</span>
                      <span style={{ fontSize: 11, color: T.textMuted }}>{char.age}歳</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>{char.job}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: char.color }}>
                      {char.currentScore}
                    </div>
                    {char.currentScore !== char.targetScore && (
                      <div style={{ fontSize: 10, color: T.textMuted }}>
                        target: {char.targetScore}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{
                    marginTop: 14, paddingTop: 14,
                    borderTop: `1px solid ${T.border}`,
                    animation: 'izk-fadein 0.3s ease',
                  }}>
                    <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.7, margin: '0 0 12px' }}>
                      {char.personality}
                    </p>

                    {/* Catchphrase */}
                    <div style={{
                      padding: '10px 14px',
                      background: T.bgSecondary,
                      borderRadius: 8,
                      marginBottom: 12,
                      borderLeft: `3px solid ${char.color}`,
                    }}>
                      <div style={{ fontSize: 10, color: char.color, fontWeight: 700, marginBottom: 4 }}>
                        CATCHPHRASE
                      </div>
                      <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6 }}>
                        「{char.catchphrase}」
                      </div>
                      <div style={{ fontSize: 11, color: T.textMuted, fontStyle: 'italic', marginTop: 4 }}>
                        "{char.catchphraseEn}"
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      {char.strongPoints.length > 0 && (
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: T.green, fontWeight: 700, marginBottom: 4 }}>STRONG</div>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {char.strongPoints.map(p => (
                              <span key={p} style={{
                                padding: '2px 6px', background: T.green + '15',
                                color: T.green, fontSize: 10, fontWeight: 700, borderRadius: 3,
                              }}>
                                {PART_SHORT[p]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {char.weakPoints.length > 0 && (
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: T.red, fontWeight: 700, marginBottom: 4 }}>WEAK</div>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {char.weakPoints.map(p => (
                              <span key={p} style={{
                                padding: '2px 6px', background: T.red + '15',
                                color: T.red, fontSize: 10, fontWeight: 700, borderRadius: 3,
                              }}>
                                {PART_SHORT[p]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes izk-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
