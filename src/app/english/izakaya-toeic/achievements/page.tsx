'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/data/izakaya-toeic/theme';
import {
  checkAllAchievements,
  AchievementWithStatus,
  AchievementTier,
  TIER_META,
} from '@/data/izakaya-toeic/achievements';

type FilterTier = 'all' | AchievementTier;

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);
  const [filter, setFilter] = useState<FilterTier>('all');

  useEffect(() => {
    setAchievements(checkAllAchievements());
  }, []);

  const earned = achievements.filter(a => a.status.earned);
  const latest = earned.length > 0
    ? earned.sort((a, b) => (b.earnedAt || '').localeCompare(a.earnedAt || ''))[0]
    : null;

  const filtered = filter === 'all'
    ? achievements
    : achievements.filter(a => a.tier === filter);

  const tierOrder: AchievementTier[] = ['bronze', 'silver', 'gold'];
  const sortedFiltered = [...filtered].sort((a, b) => {
    // Earned first, then by tier, then alphabetical
    if (a.status.earned !== b.status.earned) return a.status.earned ? -1 : 1;
    const ta = tierOrder.indexOf(a.tier);
    const tb = tierOrder.indexOf(b.tier);
    if (ta !== tb) return ta - tb;
    return a.id.localeCompare(b.id);
  });

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Header */}
      <div style={{
        padding: '40px 20px 28px',
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
          marginBottom: 12,
        }}>
          ACHIEVEMENTS
        </div>
        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 34px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -0.5,
        }}>
          <span style={{ color: '#92400E' }}>実績</span>
          <span style={{ color: T.gold }}>バッジ</span>
        </h1>
        <p style={{ fontSize: 12, color: T.textMuted, margin: 0, fontStyle: 'italic' }}>
          -- 居酒屋「のれん」の勲章 --
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 60px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 16,
        }}>
          <div style={{
            padding: '14px 16px',
            background: T.surface,
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            boxShadow: T.shadow,
          }}>
            <div style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>EARNED</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: T.gold }}>{earned.length}<span style={{ fontSize: 14, color: T.textMuted, fontWeight: 600 }}>/{achievements.length}</span></div>
            <div style={{
              height: 4, background: T.bgSecondary, borderRadius: 2, overflow: 'hidden', marginTop: 8,
            }}>
              <div style={{
                height: '100%',
                width: achievements.length > 0 ? `${(earned.length / achievements.length) * 100}%` : '0%',
                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
                borderRadius: 2,
                transition: 'width 0.6s',
              }} />
            </div>
          </div>
          <div style={{
            padding: '14px 16px',
            background: T.surface,
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            boxShadow: T.shadow,
          }}>
            <div style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>LATEST</div>
            {latest ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 2 }}>{latest.titleJa}</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{latest.title}</div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>-- none yet --</div>
            )}
          </div>
        </div>

        {/* Master quote */}
        <div style={{
          padding: '14px 18px',
          background: T.surface,
          borderRadius: 10,
          borderLeft: `3px solid ${T.gold}`,
          marginBottom: 16,
          boxShadow: T.shadow,
        }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>MASTER SAYS</div>
          <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
            「バッジなんて飾りだよ。でもな、飾りを集めてるうちに実力がついてる。それが居酒屋式だ。」
          </p>
        </div>

        {/* Tier Filter */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {(['all', 'bronze', 'silver', 'gold'] as FilterTier[]).map(tier => {
            const active = filter === tier;
            const meta = tier === 'all' ? { label: 'All', color: T.text, bg: T.bgSecondary } : TIER_META[tier];
            const count = tier === 'all' ? achievements.length : achievements.filter(a => a.tier === tier).length;
            return (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1.5px solid ${active ? meta.color : T.border}`,
                  background: active ? meta.bg : T.surface,
                  color: active ? meta.color : T.textMuted,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {meta.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Achievement Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 10,
        }}>
          {sortedFiltered.map(ach => {
            const isEarned = ach.status.earned;
            const tierMeta = TIER_META[ach.tier];
            const pct = ach.status.target > 0
              ? Math.min((ach.status.current / ach.status.target) * 100, 100)
              : 0;

            return (
              <div
                key={ach.id}
                style={{
                  padding: '16px 14px',
                  background: T.surface,
                  borderRadius: 12,
                  border: `1px solid ${isEarned ? ach.color + '40' : T.border}`,
                  boxShadow: isEarned ? `0 0 12px ${ach.color}10` : T.shadow,
                  opacity: isEarned ? 1 : 0.55,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {/* Tier badge */}
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: 8,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 3,
                  background: tierMeta.bg,
                  color: tierMeta.color,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>
                  {tierMeta.label}
                </div>

                {/* Icon */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: isEarned ? ach.color + '15' : T.bgSecondary,
                  border: `2.5px solid ${isEarned ? ach.color : T.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 18,
                  color: isEarned ? ach.color : T.textMuted,
                  marginBottom: 10,
                }}>
                  {ach.icon}
                </div>

                {/* Text */}
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 2, color: isEarned ? T.text : T.textMuted }}>
                  {ach.titleJa}
                </div>
                <div style={{ fontSize: 11, color: isEarned ? T.textSub : T.textMuted, marginBottom: 2 }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: 10, color: T.textMuted, lineHeight: 1.5, marginBottom: 10 }}>
                  {ach.descriptionJa}
                </div>

                {/* Progress bar */}
                <div style={{ height: 4, background: T.bgSecondary, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: isEarned
                      ? `linear-gradient(90deg, ${ach.color}, ${ach.color}88)`
                      : T.textMuted,
                    borderRadius: 2,
                    transition: 'width 0.4s',
                  }} />
                </div>
                <div style={{
                  fontSize: 9,
                  color: isEarned ? ach.color : T.textMuted,
                  fontWeight: 700,
                  marginTop: 4,
                  textAlign: 'right',
                }}>
                  {ach.status.current}/{ach.status.target}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer nav */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link href="/english/izakaya-toeic" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>
            {'<'} 居酒屋TOEIC Top
          </Link>
        </div>
      </div>
    </div>
  );
}
