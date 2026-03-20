// 居酒屋TOEIC -- Score Impact Analysis
//
// TOEIC Listening = 100 questions (Part 1: 6, Part 2: 25, Part 3: 39, Part 4: 30)
// Score range: 5-495 (equated scale, not raw)
// Each correct answer ~ 5 points (rough estimate; actual equating varies by form)
//
// This maps each skill taught in the 30 episodes to its estimated TOEIC score impact.

import { EPISODES } from '@/data/izakaya-toeic/episodes';

export interface SkillImpact {
  skill: string;              // matches or prefix-matches episode targetSkill
  skillLabel: string;         // human-readable Japanese label
  part: number;               // TOEIC part (0 = cross-part foundation)
  questionsAffected: number;  // how many TOEIC questions this skill applies to
  totalInPart: number;        // total questions in this part
  estimatedPointGain: number; // estimated listening score gain if mastered
  explanation: string;        // why this matters (Japanese)
}

export const SKILL_IMPACTS: SkillImpact[] = [
  // ── Part 2 skills (25 questions total) ──
  {
    skill: 'indirect-answers',
    skillLabel: '間接回答',
    part: 2,
    questionsAffected: 10,
    totalInPart: 25,
    estimatedPointGain: 40,
    explanation: 'Part 2の40%が間接回答。これだけで推定+40点。',
  },
  {
    skill: 'wh-questions',
    skillLabel: 'WH疑問文',
    part: 2,
    questionsAffected: 8,
    totalInPart: 25,
    estimatedPointGain: 30,
    explanation: 'WH疑問文の聞き分けで、Part 2がさらに安定。',
  },
  {
    skill: 'yes-no-traps',
    skillLabel: 'Yes/No罠',
    part: 2,
    questionsAffected: 5,
    totalInPart: 25,
    estimatedPointGain: 20,
    explanation: 'Yes/Noで始まる回答の罠を見抜く。',
  },
  {
    skill: 'tag-questions',
    skillLabel: '付加疑問文',
    part: 2,
    questionsAffected: 2,
    totalInPart: 25,
    estimatedPointGain: 10,
    explanation: '付加疑問文は出題数は少ないが、確実に取れる。',
  },

  // ── Part 3 skills (39 questions = 13 conversations x 3) ──
  {
    skill: 'paraphrase-recognition',
    skillLabel: 'パラフレーズ認識',
    part: 3,
    questionsAffected: 15,
    totalInPart: 39,
    estimatedPointGain: 50,
    explanation: '600→800の最大の壁。音声と選択肢で違う単語を使う。これが見抜ければ一気にスコアが上がる。',
  },
  {
    skill: 'speaker-intent',
    skillLabel: '話者の意図',
    part: 3,
    questionsAffected: 10,
    totalInPart: 39,
    estimatedPointGain: 35,
    explanation: '「何を言いたいか」を読み取る。間接回答の応用。',
  },
  {
    skill: 'three-person',
    skillLabel: '3人会話',
    part: 3,
    questionsAffected: 9,
    totalInPart: 39,
    estimatedPointGain: 30,
    explanation: '3人目の声で混乱しない。話者の区別がカギ。',
  },
  {
    skill: 'graphic-questions',
    skillLabel: 'グラフィック問題',
    part: 3,
    questionsAffected: 3,
    totalInPart: 39,
    estimatedPointGain: 15,
    explanation: '図表と音声の照合。居酒屋メニューで練習。',
  },

  // ── Part 4 skills (30 questions = 10 talks x 3) ──
  {
    skill: 'opening-prediction',
    skillLabel: '冒頭予測',
    part: 4,
    questionsAffected: 10,
    totalInPart: 30,
    estimatedPointGain: 35,
    explanation: '最初の1文で話者・聴衆・目的を掴む。',
  },
  {
    skill: 'announcement-patterns',
    skillLabel: 'アナウンスパターン',
    part: 4,
    questionsAffected: 12,
    totalInPart: 30,
    estimatedPointGain: 40,
    explanation: '社内アナウンス・留守電・スピーチの定型を覚える。',
  },

  // ── Cross-part foundation (affects all parts) ──
  {
    skill: 'sound-changes',
    skillLabel: '音変化',
    part: 0,
    questionsAffected: 0,
    totalInPart: 0,
    estimatedPointGain: 25,
    explanation: 'リンキング、リダクション、脱落。全パートに効く基礎力。',
  },
];

// ── Derived constants ──

/** Sum of all estimated point gains */
export function getTotalPotentialGain(): number {
  return SKILL_IMPACTS.reduce((sum, s) => sum + s.estimatedPointGain, 0);
}

/** Breakdown by Part for the bar chart */
export function getPartBreakdown(): { part: number; label: string; gain: number }[] {
  const map = new Map<number, number>();
  for (const s of SKILL_IMPACTS) {
    map.set(s.part, (map.get(s.part) || 0) + s.estimatedPointGain);
  }
  const labels: Record<number, string> = { 0: 'base', 2: 'Part 2', 3: 'Part 3', 4: 'Part 4' };
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([part, gain]) => ({ part, label: labels[part] || `Part ${part}`, gain }));
}

/**
 * Estimate score gain from completed episodes.
 * Maps each episode's targetSkill to a SkillImpact via prefix matching,
 * then sums unique skills' estimated gains weighted by episode completion.
 */
export function getGainFromCompleted(completedEpisodeIds: string[]): number {
  if (completedEpisodeIds.length === 0) return 0;

  // Map each skill to the episodes that teach it
  const skillEpisodeCount = new Map<string, { total: number; completed: number }>();

  for (const ep of EPISODES) {
    const impact = getEpisodeImpact(ep.targetSkill);
    if (!impact) continue;
    const key = impact.skill;
    if (!skillEpisodeCount.has(key)) {
      skillEpisodeCount.set(key, { total: 0, completed: 0 });
    }
    const entry = skillEpisodeCount.get(key)!;
    entry.total += 1;
    if (completedEpisodeIds.includes(ep.id)) {
      entry.completed += 1;
    }
  }

  // For each skill, gain is proportional to episodes completed for that skill
  let totalGain = 0;
  for (const impact of SKILL_IMPACTS) {
    const entry = skillEpisodeCount.get(impact.skill);
    if (!entry || entry.total === 0) continue;
    const ratio = Math.min(entry.completed / entry.total, 1);
    totalGain += impact.estimatedPointGain * ratio;
  }

  // Add base gain for episodes that don't map to specific skills
  // (comprehensive, review, mock episodes contribute general improvement)
  const unmappedCompleted = completedEpisodeIds.filter(id => {
    const ep = EPISODES.find(e => e.id === id);
    return ep && !getEpisodeImpact(ep.targetSkill);
  }).length;

  const unmappedTotal = EPISODES.filter(e => !getEpisodeImpact(e.targetSkill)).length;
  if (unmappedTotal > 0) {
    // Unmapped episodes contribute to overall skill reinforcement
    const unmappedPool = 30; // reserve points for general practice
    totalGain += (unmappedCompleted / unmappedTotal) * unmappedPool;
  }

  return Math.round(totalGain);
}

/** Find the SkillImpact for an episode's targetSkill (prefix match) */
export function getEpisodeImpact(targetSkill: string): SkillImpact | undefined {
  // Exact match first
  const exact = SKILL_IMPACTS.find(s => s.skill === targetSkill);
  if (exact) return exact;
  // Prefix match (e.g. 'indirect-answers-intro' matches 'indirect-answers')
  return SKILL_IMPACTS.find(s => targetSkill.startsWith(s.skill));
}
