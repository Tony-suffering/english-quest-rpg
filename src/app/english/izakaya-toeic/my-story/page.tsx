'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getProgress, ToeicProgress, EpisodeResult } from '@/data/izakaya-toeic/progress';
import { calculateRank, RankInfo } from '@/data/izakaya-toeic/ranking';
import { T } from '@/data/izakaya-toeic/theme';
import { getCompletedDays, getStreakDays } from '@/data/izakaya-toeic/thirty-day-plan';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import ShareCard from '../ShareCard';

const EPISODE_MAP = Object.fromEntries(EPISODES.map(ep => [ep.id, ep]));

function findAffinityCharacter(progress: ToeicProgress) {
  const results = Object.values(progress.completedEpisodes);
  if (results.length === 0) return null;
  // Tally part accuracy from completed episodes
  const partCorrect: Record<number, number> = {};
  const partTotal: Record<number, number> = {};
  results.forEach(r => {
    const ep = EPISODE_MAP[r.episodeId];
    if (!ep) return;
    const p = ep.targetPart;
    partCorrect[p] = (partCorrect[p] || 0) + r.correctCount;
    partTotal[p] = (partTotal[p] || 0) + r.totalQuestions;
  });
  // Find weakest parts
  const partAccuracy: Record<number, number> = {};
  Object.keys(partTotal).forEach(p => {
    const pn = Number(p);
    partAccuracy[pn] = partTotal[pn] > 0 ? partCorrect[pn] / partTotal[pn] : 0;
  });
  const weakParts = Object.entries(partAccuracy)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([p]) => Number(p));
  // Match against characters (skip master)
  const candidates = IZAKAYA_CHARACTERS.filter(c => c.id !== 'master');
  let best = candidates[0];
  let bestScore = -1;
  candidates.forEach(c => {
    let score = 0;
    weakParts.forEach(wp => { if (c.weakPoints.includes(wp as 1|2|3|4|5|6|7)) score += 2; });
    Object.keys(partAccuracy).forEach(p => {
      const pn = Number(p) as 1|2|3|4|5|6|7;
      if (partAccuracy[pn] > 0.7 && c.strongPoints.includes(pn)) score += 1;
    });
    if (score > bestScore) { bestScore = score; best = c; }
  });
  return best;
}

export default function MyStoryPage() {
  const [progress, setProgress] = useState<ToeicProgress | null>(null);
  const [rankInfo, setRankInfo] = useState<RankInfo | null>(null);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
    setRankInfo(calculateRank());
    setStreak(getStreakDays());
  }, []);

  const completedEpisodes = useMemo(() => {
    if (!progress) return [];
    return Object.values(progress.completedEpisodes)
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
  }, [progress]);

  const episodeCount = completedEpisodes.length;
  const accuracy = progress && progress.totalAttempted > 0
    ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100) : 0;
  const affinityChar = useMemo(() => progress ? findAffinityCharacter(progress) : null, [progress]);
  const isEmpty = episodeCount === 0;

  const shareText = rankInfo && !isEmpty
    ? `居酒屋TOEICで${rankInfo.rank}になった。${episodeCount}エピソード完了、推定スコア+${progress!.estimatedScore > 250 ? progress!.estimatedScore - 250 : 0}点。 #居酒屋TOEIC #TOEIC勉強`
    : '';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', background: T.bg }}>
      {/* Header */}
      <div style={{
        padding: '32px 20px 24px', textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB, ${T.bg})`,
      }}>
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 11, color: T.textMuted, textDecoration: 'none',
          display: 'inline-block', marginBottom: 16,
        }}>
          ← 居酒屋TOEIC
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: T.text, margin: '0 0 8px', letterSpacing: 1 }}>
          俺のTOEICストーリー
        </h1>
        {rankInfo && (
          <span style={{
            display: 'inline-block', padding: '4px 16px', borderRadius: 20,
            background: rankInfo.color + '15', border: `1.5px solid ${rankInfo.color}40`,
            fontSize: 13, fontWeight: 800, color: rankInfo.color,
          }}>
            {rankInfo.rank}
          </span>
        )}
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 48px' }}>
        {/* Empty State */}
        {isEmpty && (
          <div style={{
            padding: '40px 20px', textAlign: 'center',
            background: T.surface, borderRadius: 14,
            border: `1px solid ${T.border}`, marginBottom: 20,
          }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: T.textMuted, marginBottom: 8 }}>--</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: '0 0 6px' }}>
              まだカウンターに座ったばかり
            </p>
            <p style={{ fontSize: 12, color: T.textSub, margin: '0 0 20px' }}>
              エピソードを完了するとストーリーが記録される
            </p>
            <Link href="/english/izakaya-toeic" style={{
              display: 'inline-block', padding: '10px 28px', borderRadius: 8,
              background: T.gold, color: '#fff', fontWeight: 700, fontSize: 13,
              textDecoration: 'none',
            }}>
              第1夜へ
            </Link>
          </div>
        )}

        {/* Stats Card */}
        {!isEmpty && progress && rankInfo && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20,
          }}>
            {[
              { label: '来店回数', value: `${episodeCount}`, color: T.gold, big: true },
              { label: '連続記録', value: `${streak}日`, color: T.green, big: true },
              { label: '推定スコア', value: `${progress.estimatedScore}`, color: T.blue, big: true },
              { label: '常連番付', value: rankInfo.rank, color: rankInfo.color, big: false },
              { label: '通算正答率', value: `${accuracy}%`, color: T.purple, big: false },
            ].map(s => (
              <div key={s.label} style={{
                padding: '14px 10px', textAlign: 'center', background: T.surface,
                borderRadius: 10, border: `1px solid ${T.border}`,
              }}>
                <div style={{ fontSize: 9, color: T.textMuted, marginBottom: 4, letterSpacing: 0.5 }}>{s.label}</div>
                <div style={{ fontSize: s.big ? 20 : 14, fontWeight: 900, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Journey Timeline */}
        {!isEmpty && (
          <div style={{
            padding: '18px', background: T.surface, borderRadius: 14,
            border: `1px solid ${T.border}`, marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: '0 0 16px', letterSpacing: 0.5 }}>
              来店記録
            </h2>
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              {/* Gold line for completed */}
              {completedEpisodes.length > 1 && (
                <div style={{
                  position: 'absolute', left: 7, top: 8,
                  width: 2, height: `calc(100% - ${EPISODES.length > episodeCount ? '16px' : '16px'})`,
                  background: T.gold,
                }} />
              )}
              {completedEpisodes.map((result, i) => {
                const ep = EPISODE_MAP[result.episodeId];
                const date = new Date(result.completedAt);
                const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                const acc = result.totalQuestions > 0
                  ? Math.round((result.correctCount / result.totalQuestions) * 100) : 0;
                return (
                  <div key={result.episodeId} style={{
                    position: 'relative', marginBottom: i < completedEpisodes.length - 1 ? 14 : 0,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    {/* Node */}
                    <div style={{
                      position: 'absolute', left: -20, top: 4,
                      width: 12, height: 12, borderRadius: '50%',
                      background: T.gold, border: `2px solid ${T.surface}`,
                      boxShadow: `0 0 0 2px ${T.gold}40`,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: T.text }}>
                          {ep ? `第${ep.number}夜` : result.episodeId}
                        </span>
                        <span style={{ fontSize: 10, color: T.textMuted }}>{dateStr}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: acc >= 80 ? T.green : acc >= 50 ? T.gold : T.red }}>
                          {acc}%
                        </span>
                      </div>
                      {ep && (
                        <div style={{ fontSize: 10, color: T.textSub, marginTop: 1 }}>{ep.title}</div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* Remaining episodes indicator */}
              {EPISODES.length > episodeCount && (
                <div style={{
                  position: 'relative', marginTop: 14,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    position: 'absolute', left: -20, top: 4,
                    width: 12, height: 12, borderRadius: '50%',
                    background: T.bgSecondary, border: `2px dashed ${T.textMuted}`,
                  }} />
                  <span style={{ fontSize: 11, color: T.textMuted, fontStyle: 'italic' }}>
                    残り{EPISODES.length - episodeCount}エピソード...
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Character Affinity */}
        {!isEmpty && affinityChar && (
          <div style={{
            padding: '18px', background: T.surface, borderRadius: 14,
            border: `1px solid ${T.border}`, marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/characters/${affinityChar.id}.png`}
              alt={affinityChar.name}
              style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
                border: `2px solid ${affinityChar.color}40` }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 2, letterSpacing: 0.5 }}>
                あなたのタイプ
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: affinityChar.color }}>
                {affinityChar.name}タイプ
              </div>
              <div style={{ fontSize: 11, color: T.textSub, marginTop: 2, lineHeight: 1.5 }}>
                {affinityChar.catchphrase}
              </div>
            </div>
          </div>
        )}

        {/* Share Section */}
        {!isEmpty && progress && rankInfo && (
          <div style={{
            padding: '18px', background: T.surface, borderRadius: 14,
            border: `1px solid ${T.border}`,
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: '0 0 14px', letterSpacing: 0.5 }}>
              このストーリーを共有する
            </h2>
            <ShareCard
              type="score"
              title={`${rankInfo.rank} -- ${episodeCount}エピソード完了`}
              subtitle={`推定スコア ${progress.estimatedScore} / 正答率 ${accuracy}%`}
              stats={[
                { label: '来店', value: `${episodeCount}` },
                { label: '連続', value: `${streak}日` },
                { label: 'スコア', value: `${progress.estimatedScore}` },
              ]}
              rank={rankInfo.rank}
            />
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', textAlign: 'center', marginTop: 12,
                padding: '10px 20px', borderRadius: 8,
                background: T.gold, color: '#fff', fontWeight: 700, fontSize: 13,
                textDecoration: 'none',
              }}
            >
              X (Twitter) で共有
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
