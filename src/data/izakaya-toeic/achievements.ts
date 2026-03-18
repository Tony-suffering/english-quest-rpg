// 居酒屋TOEIC -- Achievement / Badge System (localStorage)

import { getProgress, ToeicProgress, getVocabDeck } from './progress';

const ACHIEVEMENTS_KEY = 'izakaya_toeic_achievements';
const DRILL_PROGRESS_KEY = 'izakaya_toeic_drill_progress';

export type AchievementTier = 'bronze' | 'silver' | 'gold';

export interface Achievement {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  icon: string;        // single letter
  color: string;
  tier: AchievementTier;
  check: (p: ToeicProgress, ctx: AchievementContext) => AchievementStatus;
}

export interface AchievementStatus {
  earned: boolean;
  current: number;
  target: number;
}

export interface EarnedAchievement {
  id: string;
  earnedAt: string;  // ISO date
}

export interface AchievementContext {
  vocabDeckSize: number;
  masteredVocab: number;
  drillsCompleted: number;
  studyPagesVisited: string[];
  consecutivePerfects: number;
  allEpisodePerfect: boolean;
}

// ── Saved state ──

export function getEarnedAchievements(): Record<string, EarnedAchievement> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveEarnedAchievements(data: Record<string, EarnedAchievement>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data));
}

// ── Drill progress helper ──

export function getDrillProgress(): { completed: number } {
  if (typeof window === 'undefined') return { completed: 0 };
  try {
    const raw = localStorage.getItem(DRILL_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { completed: 0 };
  } catch { return { completed: 0 }; }
}

export function recordDrillCompletion(): void {
  const dp = getDrillProgress();
  dp.completed += 1;
  if (typeof window !== 'undefined') {
    localStorage.setItem(DRILL_PROGRESS_KEY, JSON.stringify(dp));
  }
}

// ── Study page visit tracking ──

const STUDY_VISITS_KEY = 'izakaya_toeic_study_visits';

export function getStudyVisits(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STUDY_VISITS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function recordStudyVisit(page: string): void {
  const visits = getStudyVisits();
  if (!visits.includes(page)) {
    visits.push(page);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STUDY_VISITS_KEY, JSON.stringify(visits));
    }
  }
}

// ── Achievement definitions ──

function epCount(p: ToeicProgress): number {
  return Object.keys(p.completedEpisodes).length;
}

function perfectCount(p: ToeicProgress): number {
  return Object.values(p.completedEpisodes)
    .filter(r => r.correctCount === r.totalQuestions).length;
}

function consecutivePerfects(p: ToeicProgress): number {
  const results = Object.values(p.completedEpisodes)
    .sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  let max = 0, streak = 0;
  for (const r of results) {
    if (r.correctCount === r.totalQuestions) { streak++; max = Math.max(max, streak); }
    else { streak = 0; }
  }
  return max;
}

const STUDY_PAGES = ['guide', 'paraphrase', 'traps', 'sounds', 'drills', 'score'];

export const ACHIEVEMENTS: Achievement[] = [
  // ── Episode Completion ──
  {
    id: 'ep-first', title: 'First Pour', titleJa: '初来店',
    description: 'Complete your first episode', descriptionJa: '最初のエピソードをクリア',
    icon: '1', color: '#10B981', tier: 'bronze',
    check: (p) => ({ earned: epCount(p) >= 1, current: Math.min(epCount(p), 1), target: 1 }),
  },
  {
    id: 'ep-5', title: 'Regular', titleJa: '常連認定',
    description: 'Complete 5 episodes', descriptionJa: '5つのエピソードをクリア',
    icon: '5', color: '#3B82F6', tier: 'bronze',
    check: (p) => ({ earned: epCount(p) >= 5, current: Math.min(epCount(p), 5), target: 5 }),
  },
  {
    id: 'ep-10', title: 'Izakaya Veteran', titleJa: '古参の常連',
    description: 'Complete 10 episodes', descriptionJa: '10エピソードをクリア',
    icon: 'V', color: '#8B5CF6', tier: 'silver',
    check: (p) => ({ earned: epCount(p) >= 10, current: Math.min(epCount(p), 10), target: 10 }),
  },
  {
    id: 'ep-20', title: 'Noren Legend', titleJa: 'のれん伝説',
    description: 'Complete 20 episodes', descriptionJa: '全20エピソードをクリア',
    icon: 'L', color: '#D4AF37', tier: 'gold',
    check: (p) => ({ earned: epCount(p) >= 20, current: Math.min(epCount(p), 20), target: 20 }),
  },

  // ── Perfect Scores ──
  {
    id: 'perfect-1', title: 'Clean Glass', titleJa: '満点デビュー',
    description: 'Get 100% on any episode', descriptionJa: 'どれか1つで満点を取る',
    icon: 'P', color: '#10B981', tier: 'bronze',
    check: (p) => ({ earned: perfectCount(p) >= 1, current: Math.min(perfectCount(p), 1), target: 1 }),
  },
  {
    id: 'perfect-3', title: 'Hot Streak', titleJa: '三連満点',
    description: 'Get 3 perfect scores in a row', descriptionJa: '連続3回満点',
    icon: 'H', color: '#F97316', tier: 'silver',
    check: (p) => {
      const c = consecutivePerfects(p);
      return { earned: c >= 3, current: Math.min(c, 3), target: 3 };
    },
  },
  {
    id: 'perfect-5', title: 'Golden Palate', titleJa: '黄金の味覚',
    description: 'Get 5 perfect scores in a row', descriptionJa: '連続5回満点',
    icon: 'G', color: '#D4AF37', tier: 'gold',
    check: (p) => {
      const c = consecutivePerfects(p);
      return { earned: c >= 5, current: Math.min(c, 5), target: 5 };
    },
  },
  {
    id: 'perfect-all', title: 'Master Approved', titleJa: 'マスター認定',
    description: 'Get 100% on every episode', descriptionJa: '全エピソード満点',
    icon: 'M', color: '#D4AF37', tier: 'gold',
    check: (p) => {
      const total = Object.keys(p.completedEpisodes).length;
      const perf = perfectCount(p);
      return { earned: total >= 10 && perf === total, current: perf, target: Math.max(total, 10) };
    },
  },

  // ── Vocab Mastery ──
  {
    id: 'vocab-10', title: 'Appetizer', titleJa: 'お通し',
    description: 'Collect 10 vocabulary words', descriptionJa: '語彙を10個コレクト',
    icon: 'A', color: '#3B82F6', tier: 'bronze',
    check: (p) => ({ earned: p.vocabCollected.length >= 10, current: Math.min(p.vocabCollected.length, 10), target: 10 }),
  },
  {
    id: 'vocab-50', title: 'Full Course', titleJa: 'フルコース',
    description: 'Collect 50 vocabulary words', descriptionJa: '語彙を50個コレクト',
    icon: 'F', color: '#8B5CF6', tier: 'silver',
    check: (p) => ({ earned: p.vocabCollected.length >= 50, current: Math.min(p.vocabCollected.length, 50), target: 50 }),
  },
  {
    id: 'vocab-100', title: 'Omakase', titleJa: 'おまかせ',
    description: 'Collect 100 vocabulary words', descriptionJa: '語彙を100個コレクト',
    icon: 'O', color: '#D4AF37', tier: 'gold',
    check: (p) => ({ earned: p.vocabCollected.length >= 100, current: Math.min(p.vocabCollected.length, 100), target: 100 }),
  },
  {
    id: 'vocab-master-10', title: 'Knife Skills', titleJa: '仕込み完了',
    description: 'Master 10 vocab words (level 3)', descriptionJa: '10語をマスターレベルに',
    icon: 'K', color: '#10B981', tier: 'silver',
    check: (_p, ctx) => ({ earned: ctx.masteredVocab >= 10, current: Math.min(ctx.masteredVocab, 10), target: 10 }),
  },

  // ── Drill Performance ──
  {
    id: 'drill-10', title: 'Quick Draw', titleJa: '速射入門',
    description: 'Complete 10 drill rounds', descriptionJa: 'ドリルを10回完了',
    icon: 'Q', color: '#EC4899', tier: 'bronze',
    check: (_p, ctx) => ({ earned: ctx.drillsCompleted >= 10, current: Math.min(ctx.drillsCompleted, 10), target: 10 }),
  },
  {
    id: 'drill-50', title: 'Rapid Fire', titleJa: '速射の達人',
    description: 'Complete 50 drill rounds', descriptionJa: 'ドリルを50回完了',
    icon: 'R', color: '#EC4899', tier: 'silver',
    check: (_p, ctx) => ({ earned: ctx.drillsCompleted >= 50, current: Math.min(ctx.drillsCompleted, 50), target: 50 }),
  },
  {
    id: 'drill-100', title: 'Machine Gun', titleJa: '弾幕マスター',
    description: 'Complete 100 drill rounds', descriptionJa: 'ドリルを100回完了',
    icon: 'X', color: '#EC4899', tier: 'gold',
    check: (_p, ctx) => ({ earned: ctx.drillsCompleted >= 100, current: Math.min(ctx.drillsCompleted, 100), target: 100 }),
  },

  // ── Study Materials ──
  {
    id: 'study-3', title: 'Curious Customer', titleJa: '好奇心旺盛',
    description: 'Visit 3 study material pages', descriptionJa: '教材ページを3つ訪問',
    icon: 'C', color: '#3B82F6', tier: 'bronze',
    check: (_p, ctx) => ({ earned: ctx.studyPagesVisited.length >= 3, current: Math.min(ctx.studyPagesVisited.length, 3), target: 3 }),
  },
  {
    id: 'study-all', title: 'Textbook Collector', titleJa: '全教材制覇',
    description: 'Visit all study material pages', descriptionJa: '全ての教材ページを訪問',
    icon: 'T', color: '#8B5CF6', tier: 'silver',
    check: (_p, ctx) => ({ earned: ctx.studyPagesVisited.length >= STUDY_PAGES.length, current: Math.min(ctx.studyPagesVisited.length, STUDY_PAGES.length), target: STUDY_PAGES.length }),
  },

  // ── Streak ──
  {
    id: 'streak-3', title: 'Three Nights Running', titleJa: '三日連続',
    description: 'Study 3 days in a row', descriptionJa: '3日連続で学習',
    icon: '3', color: '#F97316', tier: 'bronze',
    check: (p) => ({ earned: p.streakDays >= 3, current: Math.min(p.streakDays, 3), target: 3 }),
  },
  {
    id: 'streak-7', title: 'Weekly Regular', titleJa: '一週間皆勤',
    description: 'Study 7 days in a row', descriptionJa: '7日連続で学習',
    icon: '7', color: '#F97316', tier: 'silver',
    check: (p) => ({ earned: p.streakDays >= 7, current: Math.min(p.streakDays, 7), target: 7 }),
  },
  {
    id: 'streak-30', title: 'Monthly Devotion', titleJa: '一ヶ月の献身',
    description: 'Study 30 days in a row', descriptionJa: '30日連続で学習',
    icon: 'D', color: '#D4AF37', tier: 'gold',
    check: (p) => ({ earned: p.streakDays >= 30, current: Math.min(p.streakDays, 30), target: 30 }),
  },

  // ── Special ──
  {
    id: 'score-800', title: '800 Club', titleJa: '800点の壁突破',
    description: 'Reach 800+ estimated listening score', descriptionJa: '推定リスニング800点以上',
    icon: '8', color: '#D4AF37', tier: 'gold',
    check: (p) => ({ earned: p.estimatedScore >= 800, current: Math.min(p.estimatedScore, 800), target: 800 }),
  },
  {
    id: 'masters-fav', title: "Master's Favorite", titleJa: 'マスターのお気に入り',
    description: 'Complete 10 episodes with 80%+ accuracy', descriptionJa: '正答率80%以上で10エピソードクリア',
    icon: 'W', color: '#D4AF37', tier: 'gold',
    check: (p) => {
      const highScores = Object.values(p.completedEpisodes)
        .filter(r => r.totalQuestions > 0 && (r.correctCount / r.totalQuestions) >= 0.8).length;
      return { earned: highScores >= 10, current: Math.min(highScores, 10), target: 10 };
    },
  },
];

// ── Build context from all sources ──

export function buildAchievementContext(): AchievementContext {
  const deck = getVocabDeck();
  const drills = getDrillProgress();
  const visits = getStudyVisits();
  const progress = getProgress();

  return {
    vocabDeckSize: deck.length,
    masteredVocab: deck.filter(d => d.masteryLevel === 3).length,
    drillsCompleted: drills.completed,
    studyPagesVisited: visits,
    consecutivePerfects: consecutivePerfects(progress),
    allEpisodePerfect: Object.values(progress.completedEpisodes).every(
      r => r.correctCount === r.totalQuestions
    ),
  };
}

// ── Check all achievements, persist newly earned ──

export interface AchievementWithStatus extends Achievement {
  status: AchievementStatus;
  earnedAt: string | null;
}

export function checkAllAchievements(): AchievementWithStatus[] {
  const progress = getProgress();
  const ctx = buildAchievementContext();
  const earned = getEarnedAchievements();
  let changed = false;

  const results = ACHIEVEMENTS.map(ach => {
    const status = ach.check(progress, ctx);
    let earnedAt: string | null = earned[ach.id]?.earnedAt || null;

    if (status.earned && !earned[ach.id]) {
      earned[ach.id] = { id: ach.id, earnedAt: new Date().toISOString() };
      earnedAt = earned[ach.id].earnedAt;
      changed = true;
    }

    return { ...ach, status, earnedAt };
  });

  if (changed) saveEarnedAchievements(earned);
  return results;
}

// ── Tier metadata ──

export const TIER_META: Record<AchievementTier, { label: string; color: string; bg: string }> = {
  bronze: { label: 'Bronze', color: '#B45309', bg: 'rgba(180,83,9,0.08)' },
  silver: { label: 'Silver', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
  gold:   { label: 'Gold',   color: '#D4AF37', bg: 'rgba(212,175,55,0.08)' },
};
