'use client';

import { useState, useEffect } from 'react';
import { T, PART_COLORS } from '@/data/izakaya-toeic/theme';
import { getProgress } from '@/data/izakaya-toeic/progress';
import {
  getTotalPotentialGain,
  getGainFromCompleted,
  getPartBreakdown,
  SKILL_IMPACTS,
} from '@/data/izakaya-toeic/score-impact';

const PART_BAR_COLORS: Record<number, string> = {
  0: PART_COLORS[1],  // green for foundation
  2: PART_COLORS[2],  // gold
  3: PART_COLORS[3],  // blue
  4: PART_COLORS[4],  // purple
};

const PART_LABELS: Record<number, string> = {
  0: 'base',
  2: 'Part 2',
  3: 'Part 3',
  4: 'Part 4',
};

export default function ScoreImpact() {
  const [mounted, setMounted] = useState(false);
  const [currentGain, setCurrentGain] = useState(0);
  const [hoveredPart, setHoveredPart] = useState<number | null>(null);

  const totalGain = getTotalPotentialGain();
  const breakdown = getPartBreakdown();

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    const completedIds = Object.keys(progress.completedEpisodes);
    setCurrentGain(getGainFromCompleted(completedIds));
  }, []);

  const completedRatio = mounted ? currentGain / totalGain : 0;

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      padding: '20px 20px 16px',
      boxShadow: T.shadow,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 3,
            color: T.gold,
            marginBottom: 4,
          }}>
            SCORE IMPACT
          </div>
          <div style={{
            fontSize: 16,
            fontWeight: 900,
            color: T.text,
          }}>
            スコアインパクト
          </div>
        </div>
        <div style={{
          textAlign: 'right',
        }}>
          <div style={{
            fontSize: 24,
            fontWeight: 900,
            color: T.gold,
            lineHeight: 1,
          }}>
            +{totalGain}
          </div>
          <div style={{
            fontSize: 10,
            color: T.textMuted,
            fontWeight: 600,
          }}>
            推定最大
          </div>
        </div>
      </div>

      {/* Stacked bar chart */}
      <div style={{ marginBottom: 12 }}>
        <div style={{
          height: 32,
          borderRadius: 8,
          overflow: 'hidden',
          display: 'flex',
          background: T.bgSecondary,
          position: 'relative',
        }}>
          {breakdown.map(({ part, gain }) => {
            const widthPercent = (gain / totalGain) * 100;
            const color = PART_BAR_COLORS[part] || T.textMuted;
            const isHovered = hoveredPart === part;
            return (
              <div
                key={part}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  width: `${widthPercent}%`,
                  height: '100%',
                  background: color,
                  opacity: isHovered ? 1 : 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'default',
                  transition: 'opacity 0.15s',
                  position: 'relative',
                }}
              >
                {widthPercent > 10 && (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#fff',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    whiteSpace: 'nowrap',
                  }}>
                    +{gain}
                  </span>
                )}
              </div>
            );
          })}

          {/* Progress overlay */}
          {mounted && completedRatio > 0 && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${completedRatio * 100}%`,
              height: '100%',
              background: 'rgba(255,255,255,0.35)',
              borderRight: '2px solid #fff',
              pointerEvents: 'none',
              transition: 'width 0.5s ease',
            }} />
          )}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {breakdown.map(({ part, label, gain }) => {
            const color = PART_BAR_COLORS[part] || T.textMuted;
            const isHovered = hoveredPart === part;
            return (
              <div
                key={part}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'default',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'opacity 0.15s',
                }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: color,
                }} />
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: T.textSub,
                }}>
                  {label} +{gain}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current progress */}
      {mounted && currentGain > 0 && (
        <div style={{
          padding: '8px 12px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 8,
          marginBottom: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: T.textSub, fontWeight: 600 }}>
            現在の推定獲得
          </span>
          <span style={{ fontSize: 16, fontWeight: 900, color: T.gold }}>
            +{currentGain}点
          </span>
        </div>
      )}

      {/* Hover detail: show skills for hovered part */}
      {hoveredPart !== null && (
        <div style={{
          padding: '8px 12px',
          background: T.bgSecondary,
          borderRadius: 8,
          marginBottom: 12,
        }}>
          {SKILL_IMPACTS
            .filter(s => s.part === hoveredPart)
            .map(s => (
              <div key={s.skill} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '3px 0',
              }}>
                <span style={{ fontSize: 11, color: T.textSub }}>
                  {s.skillLabel}
                  {s.questionsAffected > 0 && (
                    <span style={{ color: T.textMuted, marginLeft: 6, fontSize: 10 }}>
                      ({s.questionsAffected}/{s.totalInPart}問)
                    </span>
                  )}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: PART_BAR_COLORS[hoveredPart] || T.textSub,
                }}>
                  +{s.estimatedPointGain}
                </span>
              </div>
            ))
          }
        </div>
      )}

      {/* Key insight */}
      <p style={{
        fontSize: 11,
        color: T.textMuted,
        margin: 0,
        lineHeight: 1.7,
      }}>
        リスニング100問中76問正解 = 395点。居酒屋TOEICで全スキルを習得すると、推定+{totalGain}点。
      </p>
    </div>
  );
}
