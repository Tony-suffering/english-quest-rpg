'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import { CHARACTER_MAP } from '@/data/izakaya-toeic/characters';
import { ToeicPart } from '@/data/izakaya-toeic/types';
import { getProgress, isEpisodeCompleted, ToeicProgress } from '@/data/izakaya-toeic/progress';
import { T, PART_COLORS } from '@/data/izakaya-toeic/theme';
import { THIRTY_DAY_PLAN } from '@/data/izakaya-toeic/thirty-day-plan';

// Episode ID → Day number lookup
const EP_TO_DAY: Record<string, number> = {};
for (const d of THIRTY_DAY_PLAN) EP_TO_DAY[d.episodeId] = d.day;

// Group episodes by part
function groupByPart(episodes: typeof EPISODES) {
  const groups: Record<number, typeof EPISODES> = {};
  for (const ep of episodes) {
    if (!groups[ep.targetPart]) groups[ep.targetPart] = [];
    groups[ep.targetPart].push(ep);
  }
  return groups;
}

const PART_NAMES: Record<number, string> = {
  2: 'Part 2 -- 応答問題',
  3: 'Part 3 -- 会話問題',
  4: 'Part 4 -- 説明文',
};

export default function EpisodesListPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ToeicProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const grouped = groupByPart(EPISODES);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 60px' }}>
        {/* Header */}
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 11, color: T.textMuted, textDecoration: 'none',
          display: 'block', marginBottom: 12,
        }}>
          {'<'} 居酒屋TOEIC
        </Link>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
          エピソード一覧
        </h1>
        <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 24 }}>
          全{EPISODES.length}話 / 各エピソードでTOEICスキルを1つ習得
        </p>

        {/* Grouped by Part */}
        {Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b)).map(([part, eps]) => {
          const partNum = Number(part) as ToeicPart;
          const partColor = PART_COLORS[partNum] || T.gold;
          const completedInPart = eps.filter(ep => isEpisodeCompleted(ep.id)).length;

          return (
            <div key={part} style={{ marginBottom: 24 }}>
              {/* Part header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 8, padding: '0 4px',
              }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{
                    width: 3, height: 16, borderRadius: 2,
                    background: partColor,
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: partColor }}>
                    {PART_NAMES[partNum] || `Part ${partNum}`}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: T.textMuted }}>
                  {completedInPart}/{eps.length}
                </span>
              </div>

              {/* Episodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {eps.map(ep => {
                  const isHovered = hoveredId === ep.id;
                  const completed = isEpisodeCompleted(ep.id);
                  const result = progress?.completedEpisodes[ep.id];
                  const speakers = [...new Set(
                    ep.story.filter(s => s.speaker !== 'narration').map(s => s.speaker)
                  )];

                  return (
                    <Link
                      key={ep.id}
                      href={`/english/izakaya-toeic/episodes/${ep.id}`}
                      onMouseEnter={() => setHoveredId(ep.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        display: 'block',
                        padding: '14px 16px',
                        background: isHovered ? T.surfaceHover : T.surface,
                        borderRadius: 10,
                        textDecoration: 'none',
                        color: T.text,
                        transition: 'all 0.15s',
                        border: `1px solid ${isHovered ? partColor + '30' : T.border}`,
                        boxShadow: T.shadow,
                      }}
                    >
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        {/* Number */}
                        <div style={{
                          width: 38, height: 38, borderRadius: 8,
                          background: completed ? T.greenBg : `${partColor}10`,
                          border: `1.5px solid ${completed ? T.green : partColor}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 900, fontSize: 16,
                          color: completed ? T.green : partColor,
                          flexShrink: 0,
                        }}>
                          {completed ? 'O' : (EP_TO_DAY[ep.id] || ep.number)}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{ep.title}</div>
                          <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>{ep.subtitle}</div>

                          {/* Meta row */}
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{
                              padding: '2px 6px', background: T.goldBg,
                              color: T.gold, fontSize: 10, fontWeight: 700, borderRadius: 3,
                            }}>
                              {ep.targetScoreRange[0]}-{ep.targetScoreRange[1]}
                            </span>
                            <span style={{ fontSize: 10, color: T.textMuted }}>
                              {ep.questions.length}問
                            </span>
                            {result && (
                              <span style={{
                                fontSize: 10, fontWeight: 700,
                                color: result.correctCount === result.totalQuestions ? T.green : T.gold,
                              }}>
                                BEST: {result.correctCount}/{result.totalQuestions}
                              </span>
                            )}

                            {/* Character avatars */}
                            <div style={{ display: 'flex', marginLeft: 'auto' }}>
                              {speakers.slice(0, 4).map(sid => {
                                const ch = CHARACTER_MAP[sid];
                                if (!ch) return null;
                                return (
                                  <img key={sid} src={`/characters/${ch.id}.png`} alt={ch.name} style={{
                                    width: 18, height: 18, borderRadius: '50%',
                                    border: `1.5px solid ${ch.color}`,
                                    objectFit: 'cover',
                                    marginLeft: -3,
                                  }} />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
