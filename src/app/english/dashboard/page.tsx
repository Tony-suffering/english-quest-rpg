'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getDashboardComment, getStreakComment, CREATOR_PROFILE } from '@/data/english/creator-voice';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function levelFromXP(xp: number): number {
  if (xp <= 0) return 1;
  return Math.floor(Math.pow(xp / 100, 0.5)) + 1;
}

function xpForLevel(level: number): number {
  return (level ** 2) * 100;
}

function safe<T>(raw: string | null, fb: T): T {
  if (!raw) return fb;
  try { return JSON.parse(raw) as T; } catch { return fb; }
}

// ---------------------------------------------------------------------------
// Data loaders
// ---------------------------------------------------------------------------

function loadAll() {
  // Master 365
  const m365raw = safe<Record<string, number>>(localStorage.getItem('master-365-mastery'), {});
  const m365touched = Object.values(m365raw).filter(v => v >= 1).length;

  // Daily Training
  const phrases = safe<unknown[]>(localStorage.getItem('my-training-phrases'), []);
  const mastery = safe<Record<string, number>>(
    localStorage.getItem('my-training-mastery') || localStorage.getItem('quest-mastery'), {}
  );
  const mastered = Object.values(mastery).filter(v => v >= 3).length;

  // Streak
  const streakData = safe<{ current?: number; best?: number }>(
    localStorage.getItem('365-checkin-streak'), {}
  );

  // Player
  const stats = safe<{ total_xp?: number; sparks?: number }>(
    localStorage.getItem('quest-playerStats'), {}
  );
  const xp = stats.total_xp ?? 0;
  const level = levelFromXP(xp);

  // Cards
  const cardPts = safe<Record<string, number>>(localStorage.getItem('quest-cardPoints'), {});
  let cardTotal = 0;
  const ranks = { legendary: 0, holo: 0, gold: 0, silver: 0, bronze: 0 };
  for (const p of Object.values(cardPts)) {
    if (p < 1) continue;
    cardTotal++;
    if (p >= 250) ranks.legendary++;
    else if (p >= 100) ranks.holo++;
    else if (p >= 50) ranks.gold++;
    else if (p >= 20) ranks.silver++;
    else if (p >= 5) ranks.bronze++;
  }

  // Active days
  let days = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && /^365-checkin-\d+$/.test(k)) days++;
  }

  return {
    m365: { touched: m365touched, total: 3650 },
    training: { registered: phrases.length, mastered },
    streak: { current: streakData.current ?? 0, best: streakData.best ?? 0 },
    player: { level, xp, sparks: stats.sparks ?? 0, nextXP: xpForLevel(level), currentXP: xpForLevel(level - 1) },
    cards: { total: cardTotal, ranks },
    days,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [d, setD] = useState<ReturnType<typeof loadAll> | null>(null);

  useEffect(() => { setD(loadAll()); }, []);

  // Hooks MUST be called before any conditional return
  const creatorComment = useMemo(() => {
    if (!d) return '';
    const { m365, training, cards, days, streak, player } = d;
    const totalActions = m365.touched + training.registered + cards.total + days;
    return getDashboardComment({
      totalActions, streak: streak.current, level: player.level,
      mastered: m365.touched, days,
    });
  }, [d]);
  const streakComment = useMemo(() => {
    if (!d) return '';
    return getStreakComment(d.streak.current);
  }, [d]);

  if (!d) return <div style={{ minHeight: '100vh', background: '#FAFAF9' }} />;

  const { m365, training, streak, player, cards, days } = d;
  const totalActions = m365.touched + training.registered + cards.total + days;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F4' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(245,245,244,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E7E5E4',
      }}>
        <div style={{
          maxWidth: 520, margin: '0 auto', padding: '10px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/english" style={{
            fontSize: 13, color: '#78716C', textDecoration: 'none', fontWeight: 600,
          }}>
            ← 戻る
          </Link>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#1C1917', letterSpacing: '0.08em' }}>
            学習ダッシュボード
          </span>
          <span style={{ fontSize: 11, color: '#A8A29E', fontVariantNumeric: 'tabular-nums' }}>
            {new Date().toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '20px 16px 80px' }}>

        {/* ===== Hero ===== */}
        <div style={{
          background: 'linear-gradient(145deg, #1C1917, #292524)',
          borderRadius: 20, padding: '36px 28px 28px',
          marginBottom: 16, position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle gold accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg, #D4AF37, #F59E0B, #D4AF37)',
          }} />
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#D4AF37',
            letterSpacing: '0.08em', marginBottom: 12,
          }}>
            総合進捗
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {totalActions.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: '#78716C', fontWeight: 600 }}>
              アクション
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#57534E', lineHeight: 1.6 }}>
            {creatorComment}
          </div>

          {/* Master 365 overall bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: 6,
              fontSize: 11, color: '#78716C',
            }}>
              <span>英会話マスター365</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {m365.touched} / {m365.total.toLocaleString()} 習得
              </span>
            </div>
            <div style={{
              height: 6, background: '#44403C', borderRadius: 3, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${Math.min((m365.touched / m365.total) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #D4AF37, #F59E0B)',
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>
        </div>

        {/* ===== Stats Grid (2x2) ===== */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          marginBottom: 16,
        }}>
          {/* Streak */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '20px 18px',
            border: '1px solid #E7E5E4',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981', letterSpacing: '0.08em', marginBottom: 8 }}>
              連続学習
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 36, fontWeight: 900, lineHeight: 1,
                color: streak.current > 0 ? '#10B981' : '#D6D3D1',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {streak.current}
              </span>
              <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>日</span>
            </div>
            {streak.best > 0 && (
              <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 6 }}>
                最高: <span style={{ fontWeight: 700, color: '#78716C' }}>{streak.best}日</span>
              </div>
            )}
          </div>

          {/* Level */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '20px 18px',
            border: '1px solid #E7E5E4',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.08em', marginBottom: 8 }}>
              プレイヤー
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 36, fontWeight: 900, lineHeight: 1, color: '#7C3AED',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {player.level}
              </span>
              <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>Lv.</span>
            </div>
            <div style={{
              height: 4, background: '#E7E5E4', borderRadius: 2, overflow: 'hidden', marginTop: 8,
            }}>
              <div style={{
                height: '100%', borderRadius: 2,
                width: `${player.nextXP > player.currentXP ? Math.min(((player.xp - player.currentXP) / (player.nextXP - player.currentXP)) * 100, 100) : 0}%`,
                background: '#7C3AED', transition: 'width 0.6s',
              }} />
            </div>
            <div style={{ fontSize: 10, color: '#A8A29E', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
              {player.xp.toLocaleString()} XP
            </div>
          </div>

          {/* Active Days */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '20px 18px',
            border: '1px solid #E7E5E4',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#2563EB', letterSpacing: '0.08em', marginBottom: 8 }}>
              学習日数
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 36, fontWeight: 900, lineHeight: 1,
                color: days > 0 ? '#2563EB' : '#D6D3D1',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {days}
              </span>
              <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>日</span>
            </div>
          </div>

          {/* Sparks */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '20px 18px',
            border: '1px solid #E7E5E4',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#D97706', letterSpacing: '0.08em', marginBottom: 8 }}>
              スパーク
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                fontSize: 36, fontWeight: 900, lineHeight: 1,
                color: player.sparks > 0 ? '#D97706' : '#D6D3D1',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {player.sparks.toLocaleString()}
              </span>
              <span style={{ fontSize: 12, color: '#A8A29E', fontWeight: 600 }}>GP</span>
            </div>
          </div>
        </div>

        {/* ===== Detail Cards ===== */}

        {/* Daily Training */}
        <Link href="/english/my-training" style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '18px 20px',
            border: '1px solid #E7E5E4',
            transition: 'border-color 0.15s',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#44403C' }}>デイリートレーニング</span>
              </div>
              <span style={{ fontSize: 13, color: '#D6D3D1' }}>&rsaquo;</span>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#EF4444', fontVariantNumeric: 'tabular-nums' }}>
                  {training.registered}
                </div>
                <div style={{ fontSize: 11, color: '#A8A29E', fontWeight: 600 }}>登録フレーズ</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#44403C', fontVariantNumeric: 'tabular-nums' }}>
                  {training.mastered}
                </div>
                <div style={{ fontSize: 11, color: '#A8A29E', fontWeight: 600 }}>習得済み</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Card Collection */}
        <Link href="/english/training/card-preview" style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '18px 20px',
            border: '1px solid #E7E5E4',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D97706' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#44403C' }}>カードコレクション</span>
              </div>
              <span style={{ fontSize: 13, color: '#D6D3D1' }}>&rsaquo;</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#D97706', fontVariantNumeric: 'tabular-nums' }}>
                {cards.total}
              </span>
              <span style={{ fontSize: 11, color: '#A8A29E', fontWeight: 600 }}>枚</span>
            </div>
            {cards.total > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {[
                  { label: 'LEGENDARY', count: cards.ranks.legendary, color: '#D97706' },
                  { label: 'HOLO', count: cards.ranks.holo, color: '#7C3AED' },
                  { label: 'GOLD', count: cards.ranks.gold, color: '#D4AF37' },
                  { label: 'SILVER', count: cards.ranks.silver, color: '#78716C' },
                  { label: 'BRONZE', count: cards.ranks.bronze, color: '#B45309' },
                ].filter(r => r.count > 0).map(r => (
                  <span key={r.label} style={{
                    fontSize: 10, fontWeight: 700, color: r.color,
                    background: r.color + '15', padding: '3px 8px', borderRadius: 6,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {r.label} {r.count}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>

        {/* Creator voice */}
        <div style={{
          background: '#FAFAF9', borderRadius: 16, padding: '18px 20px',
          border: '1px solid #E7E5E4', marginTop: 6,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#A8A29E',
            letterSpacing: '0.08em', marginBottom: 8,
          }}>
            開発者より
          </div>
          <div style={{ fontSize: 13, color: '#44403C', lineHeight: 1.7, marginBottom: 10 }}>
            {streakComment}
          </div>
          <div style={{
            fontSize: 11, color: '#A8A29E', lineHeight: 1.5,
            borderTop: '1px solid #E7E5E4', paddingTop: 10,
          }}>
            {CREATOR_PROFILE.description}
          </div>
          <a
            href={CREATOR_PROFILE.noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginTop: 8,
              fontSize: 11, color: '#D4AF37', textDecoration: 'none', fontWeight: 600,
            }}
          >
            note.com で開発記録を読む →
          </a>
        </div>
      </div>
    </div>
  );
}
