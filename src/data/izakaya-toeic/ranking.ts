// 居酒屋TOEIC -- 常連番付 (Regular Customer Ranking)

import { getProgress } from './progress';

export interface RankInfo {
  rank: string;
  rankEn: string;
  level: number;
  color: string;
  nextRank: string | null;
  progress: number;   // 0-100 toward next rank
  description: string;
}

interface RankDef {
  level: number;
  rank: string;
  rankEn: string;
  color: string;
  minEpisodes: number;
  minStreak: number;
  minScore: number;
}

const RANKS: RankDef[] = [
  { level: 0, rank: '一見さん', rankEn: 'First Timer', color: '#A8A29E', minEpisodes: 0, minStreak: 0, minScore: 0 },
  { level: 1, rank: '顔なじみ', rankEn: 'Familiar Face', color: '#78716C', minEpisodes: 1, minStreak: 1, minScore: 0 },
  { level: 2, rank: '常連', rankEn: 'Regular', color: '#D4AF37', minEpisodes: 5, minStreak: 3, minScore: 500 },
  { level: 3, rank: '常連(席固定)', rankEn: 'Reserved Seat', color: '#F59E0B', minEpisodes: 10, minStreak: 7, minScore: 600 },
  { level: 4, rank: 'VIP', rankEn: 'VIP', color: '#10B981', minEpisodes: 15, minStreak: 14, minScore: 650 },
  { level: 5, rank: 'マスターの友人', rankEn: "Master's Friend", color: '#3B82F6', minEpisodes: 20, minStreak: 21, minScore: 700 },
  { level: 6, rank: 'のれん分け候補', rankEn: 'Franchise Candidate', color: '#8B5CF6', minEpisodes: 25, minStreak: 28, minScore: 750 },
  { level: 7, rank: 'のれん分け', rankEn: 'Franchise Owner', color: '#EC4899', minEpisodes: 30, minStreak: 30, minScore: 800 },
];

export { RANKS };

function meetsRequirements(def: RankDef, episodes: number, streak: number, score: number): boolean {
  return episodes >= def.minEpisodes && streak >= def.minStreak && score >= def.minScore;
}

function calcProgress(current: RankDef, next: RankDef, episodes: number, streak: number, score: number): number {
  // Calculate progress as average of the three dimension percentages
  const epRange = next.minEpisodes - current.minEpisodes;
  const stRange = next.minStreak - current.minStreak;
  const scRange = next.minScore - current.minScore;

  const epProg = epRange > 0 ? Math.min(1, (episodes - current.minEpisodes) / epRange) : 1;
  const stProg = stRange > 0 ? Math.min(1, (streak - current.minStreak) / stRange) : 1;
  const scProg = scRange > 0 ? Math.min(1, (score - current.minScore) / scRange) : 1;

  // Use minimum of the three -- must meet ALL requirements to advance
  const minProg = Math.min(epProg, stProg, scProg);
  return Math.round(minProg * 100);
}

export function calculateRank(): RankInfo {
  const progress = getProgress();
  const episodes = Object.keys(progress.completedEpisodes).length;
  const streak = progress.streakDays;
  const score = progress.estimatedScore;

  // Find highest qualifying rank
  let currentIdx = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (meetsRequirements(RANKS[i], episodes, streak, score)) {
      currentIdx = i;
      break;
    }
  }

  const current = RANKS[currentIdx];
  const next = currentIdx < RANKS.length - 1 ? RANKS[currentIdx + 1] : null;

  const progressPct = next
    ? calcProgress(current, next, episodes, streak, score)
    : 100;

  const descriptions: Record<number, string> = {
    0: 'まだ来たばかり。まずは1杯目を注文しよう。',
    1: 'マスターが顔を覚え始めた。通い続けよう。',
    2: '指定席はないけど、いつもの席がある。',
    3: '席が空いてなくても確保される。VIPまであと少し。',
    4: '特別メニューが出てくるようになった。',
    5: '閉店後に一緒に飲む仲。',
    6: 'マスターから「自分の店やらない？」と聞かれた。',
    7: '伝説の常連。もはや居酒屋の一部。',
  };

  return {
    rank: current.rank,
    rankEn: current.rankEn,
    level: current.level,
    color: current.color,
    nextRank: next ? next.rank : null,
    progress: progressPct,
    description: descriptions[current.level] || '',
  };
}
