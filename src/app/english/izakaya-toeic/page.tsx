'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import { getProgress, ToeicProgress, isEpisodeCompleted } from '@/data/izakaya-toeic/progress';
import { T, PART_COLORS, PART_LABELS } from '@/data/izakaya-toeic/theme';

export default function IzakayaToeicPage() {
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [hoveredEp, setHoveredEp] = useState<string | null>(null);
  const [progress, setProgress] = useState<ToeicProgress | null>(null);

  useEffect(() => { setProgress(getProgress()); }, []);

  const nextEpisode = EPISODES.find(ep => !isEpisodeCompleted(ep.id)) || EPISODES[0];
  const completedCount = progress ? Object.keys(progress.completedEpisodes).length : 0;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero */}
      <div style={{
        padding: '48px 20px 36px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
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
          marginBottom: 14,
        }}>
          TOEIC L&R LISTENING
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 7vw, 40px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -1,
        }}>
          <span style={{ color: '#92400E' }}>居酒屋</span>
          <span style={{ color: T.gold }}>TOEIC</span>
        </h1>
        <p style={{
          fontSize: 12, color: T.textMuted, margin: '0 0 6px', fontStyle: 'italic',
        }}>
          -- 路地裏の居酒屋「のれん」 --
        </p>
        <p style={{
          fontSize: 14, color: T.textSub, maxWidth: 420, margin: '0 auto 20px', lineHeight: 1.8,
        }}>
          元TOEIC満点講師のマスターと常連たちが繰り広げる、笑えて点数が上がるTOEIC対策。
        </p>

        <Link href={`/english/izakaya-toeic/episodes/${nextEpisode.id}`} style={{
          display: 'inline-block',
          padding: '11px 28px',
          background: T.gold,
          color: '#fff',
          borderRadius: 8,
          fontWeight: 800,
          fontSize: 14,
          textDecoration: 'none',
          boxShadow: T.shadowMd,
        }}>
          {completedCount > 0 ? `EP.${nextEpisode.number} -- 続きから` : 'Episode 1 -- 始める'}
        </Link>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 60px' }}>
        {/* Progress */}
        {progress && completedCount > 0 && (
          <div style={{
            display: 'flex', gap: 16, alignItems: 'center',
            padding: '12px 16px', background: T.surface, borderRadius: 10,
            border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, letterSpacing: 1 }}>PROGRESS</span>
                <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>{completedCount}/{EPISODES.length}</span>
              </div>
              <div style={{ height: 4, background: T.bgSecondary, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${(completedCount / EPISODES.length) * 100}%`,
                  background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
                  borderRadius: 2, transition: 'width 0.6s',
                }} />
              </div>
            </div>
            {progress.estimatedScore > 0 && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: T.textMuted }}>Est. Score</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.gold }}>{progress.estimatedScore}</div>
              </div>
            )}
          </div>
        )}

        {/* Score Insight */}
        <div style={{
          padding: '14px 18px', background: T.surface, borderRadius: 10,
          borderLeft: `3px solid ${T.gold}`, marginBottom: 16,
          boxShadow: T.shadow,
        }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>SCORE INSIGHT</div>
          <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
            リスニング76問正解で<span style={{ color: T.gold, fontWeight: 700 }}> 395点</span>。
            リーディングだと同じ76問で335点。リスニング集中が最もコスパが高い。
          </p>
        </div>

        {/* Characters */}
        <div style={{
          padding: '18px', background: T.surface, borderRadius: 12,
          border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 1, margin: 0 }}>
              REGULARS
            </h2>
            <Link href="/english/izakaya-toeic/characters" style={{
              fontSize: 11, color: T.gold, textDecoration: 'none', fontWeight: 600,
            }}>
              詳細 {'>'}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: 6 }}>
            {IZAKAYA_CHARACTERS.map(char => (
              <div
                key={char.id}
                onMouseEnter={() => setHoveredChar(char.id)}
                onMouseLeave={() => setHoveredChar(null)}
                style={{
                  padding: '10px 6px', borderRadius: 8, textAlign: 'center',
                  background: hoveredChar === char.id ? T.surfaceHover : 'transparent',
                  transition: 'background 0.15s', cursor: 'default',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: char.color + '15', border: `2px solid ${char.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 13, color: char.color,
                  margin: '0 auto 4px',
                }}>
                  {char.initial}
                </div>
                <div style={{ fontWeight: 700, fontSize: 11 }}>{char.name.split('（')[0]}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: char.color, marginTop: 2 }}>
                  {char.currentScore}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Episodes */}
        <div style={{
          padding: '18px', background: T.surface, borderRadius: 12,
          border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 1, margin: '0 0 12px' }}>
            EPISODES
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {EPISODES.map(ep => {
              const isHovered = hoveredEp === ep.id;
              const completed = isEpisodeCompleted(ep.id);
              const result = progress?.completedEpisodes[ep.id];
              const pc = PART_COLORS[ep.targetPart] || T.gold;

              return (
                <Link
                  key={ep.id}
                  href={`/english/izakaya-toeic/episodes/${ep.id}`}
                  onMouseEnter={() => setHoveredEp(ep.id)}
                  onMouseLeave={() => setHoveredEp(null)}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'center',
                    padding: '10px 12px', borderRadius: 8,
                    background: isHovered ? T.surfaceHover : T.bg,
                    textDecoration: 'none', color: T.text,
                    transition: 'background 0.15s',
                    border: `1px solid ${isHovered ? T.border : 'transparent'}`,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 6,
                    background: completed ? T.greenBg : `${pc}10`,
                    border: `1.5px solid ${completed ? T.green : pc}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 14,
                    color: completed ? T.green : pc, flexShrink: 0,
                  }}>
                    {completed ? 'O' : ep.number}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ep.title}
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>{ep.subtitle}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
                    {result && (
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: result.correctCount === result.totalQuestions ? T.green : T.gold,
                      }}>
                        {result.correctCount}/{result.totalQuestions}
                      </span>
                    )}
                    <span style={{
                      padding: '2px 5px', background: `${pc}10`, color: pc,
                      fontSize: 9, fontWeight: 700, borderRadius: 3,
                    }}>
                      {PART_LABELS[ep.targetPart]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Study Materials */}
        <div style={{
          padding: '18px', background: T.surface, borderRadius: 12,
          border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, letterSpacing: 1, margin: '0 0 12px' }}>
            STUDY MATERIALS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { href: '/english/izakaya-toeic/program', icon: '30', iconColor: '#fff', iconBg: T.gold, title: '30日間プログラム', sub: '30日で完走 -- カレンダーで進捗管理' },
              { href: '/english/training', icon: 'S', iconColor: T.green, iconBg: T.greenBg, title: 'TOEIC単語トレーニング', sub: 'エピソードの語彙をスロットマシンで復習' },
              { href: '/english/izakaya-toeic/guide', icon: 'G', iconColor: T.blue, iconBg: T.blue + '08', title: 'Part別攻略ガイド', sub: 'Part 1-4のテクニックと頻出パターン' },
              { href: '/english/izakaya-toeic/paraphrase', icon: 'P', iconColor: T.gold, iconBg: T.goldBg, title: 'パラフレーズ辞典', sub: '167パターン -- 600→800点の最重要スキル' },
              { href: '/english/izakaya-toeic/traps', icon: 'X', iconColor: T.red, iconBg: T.red + '08', title: 'TOEICの罠パターン', sub: '17種の引っかけパターンを完全分類' },
              { href: '/english/izakaya-toeic/sounds', icon: 'W', iconColor: '#3B82F6', iconBg: '#3B82F608', title: '音変化辞典', sub: '90パターン -- 聞こえない理由がわかる' },
              { href: '/english/izakaya-toeic/drills', icon: 'R', iconColor: '#EC4899', iconBg: '#EC489908', title: 'Part 2 速射ドリル', sub: '130問 -- 反射で答える特訓' },
              { href: '/english/izakaya-toeic/score', icon: 'D', iconColor: T.purple, iconBg: T.purple + '08', title: 'スコア診断', sub: '弱点分析・学習プラン・間違いノート' },
              { href: '/english/izakaya-toeic/mistakes', icon: 'M', iconColor: T.orange, iconBg: T.orange + '08', title: '間違いノート', sub: 'ミスのパターン分析・弱点の可視化' },
              { href: '/english/izakaya-toeic/achievements', icon: 'B', iconColor: T.gold, iconBg: T.goldBg, title: '実績バッジ', sub: '23個の実績 -- 居酒屋の勲章コレクション' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', gap: 10, alignItems: 'center',
                padding: '10px 12px', background: T.bg, borderRadius: 8,
                textDecoration: 'none', color: T.text,
                border: `1px solid transparent`,
                transition: 'all 0.15s',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 7,
                  background: item.iconBg, border: `1.5px solid ${item.iconColor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900, color: item.iconColor, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{item.title}</div>
                  <div style={{ fontSize: 10, color: T.textMuted }}>{item.sub}</div>
                </div>
                <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 600 }}>{'>'}</span>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/english" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>English Top</Link>
        </div>
      </div>
    </div>
  );
}
