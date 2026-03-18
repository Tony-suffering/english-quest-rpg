// 居酒屋TOEIC -- Score Analysis & Weakness Detection

import { ToeicProgress, EpisodeResult } from './progress';

// ── Types ──────────────────────────────────────────────────────────────────

export interface ScoreAnalysis {
  estimatedListeningScore: number; // 5-495
  estimatedReadingScore: number;   // future (placeholder)
  estimatedTotal: number;
  partScores: Record<number, PartScore>;
  weaknesses: Weakness[];
  strengths: Strength[];
  studyPlan: StudyRecommendation[];
  level: ToeicLevel;
  nextMilestone: { score: number; label: string; tips: string[] };
}

export interface PartScore {
  part: number;
  correct: number;
  total: number;
  accuracy: number;
  estimatedScore: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface Weakness {
  area: string;           // 'paraphrase' | 'negative-questions' | 'three-speakers' etc.
  areaJa: string;
  severity: 'critical' | 'moderate' | 'minor';
  description: string;   // Japanese
  suggestedEpisodes: string[];
  drillType?: string;
}

export interface Strength {
  area: string;
  areaJa: string;
  description: string;
}

export interface StudyRecommendation {
  priority: 1 | 2 | 3;
  action: string;        // Japanese
  estimatedGain: string; // "+30-50点" etc.
  timeNeeded: string;    // "2週間" etc.
}

export type ToeicLevel = {
  score: number;
  name: string;
  nameJa: string;
  description: string;
  color: string;
};

// ── Constants ──────────────────────────────────────────────────────────────

export const TOEIC_LEVELS: ToeicLevel[] = [
  { score: 0,   name: 'Beginner',    nameJa: '入門',   description: '基礎から始めよう',                     color: '#A8A29E' },
  { score: 400, name: 'Elementary',  nameJa: '初級',   description: '基本パターンを覚える段階',             color: '#78716C' },
  { score: 500, name: 'Intermediate',nameJa: '中級',   description: 'Part 2が安定してきた',                 color: '#3B82F6' },
  { score: 600, name: 'Upper-Int',   nameJa: '中上級', description: 'パラフレーズとの戦いが始まる',         color: '#8B5CF6' },
  { score: 700, name: 'Advanced',    nameJa: '上級',   description: 'Part 3/4の壁を越える段階',             color: '#D4AF37' },
  { score: 800, name: 'Proficient',  nameJa: '準上級', description: '細かいニュアンスの聞き分け',           color: '#F97316' },
  { score: 900, name: 'Expert',      nameJa: '超上級', description: 'ほぼネイティブレベルのリスニング',     color: '#10B981' },
];

// Part weight: approximate % of Listening score (100q total → 495)
// Part 1: 6q, Part 2: 25q, Part 3: 39q, Part 4: 30q
const PART_WEIGHTS: Record<number, number> = {
  1: 0.04,
  2: 0.25,
  3: 0.39,
  4: 0.32,
};

// Nonlinear accuracy → score curve for Listening (max 495)
// Anchor points: 100%→495, 75%→395, 50%→250, 25%→150
function accuracyToListeningScore(accuracy: number): number {
  // Piecewise linear interpolation between anchor points
  if (accuracy >= 1.0) return 495;
  if (accuracy >= 0.75) {
    // 75-100%: 395 → 495 (range 100 over 25%)
    return Math.round(395 + ((accuracy - 0.75) / 0.25) * 100);
  }
  if (accuracy >= 0.50) {
    // 50-75%: 250 → 395 (range 145 over 25%)
    return Math.round(250 + ((accuracy - 0.50) / 0.25) * 145);
  }
  if (accuracy >= 0.25) {
    // 25-50%: 150 → 250 (range 100 over 25%)
    return Math.round(150 + ((accuracy - 0.25) / 0.25) * 100);
  }
  // 0-25%: 5 → 150
  return Math.round(5 + (accuracy / 0.25) * 145);
}

// ── Core Functions ─────────────────────────────────────────────────────────

export function getLevel(score: number): ToeicLevel {
  // Walk backwards through levels and return the first one the score meets or exceeds
  for (let i = TOEIC_LEVELS.length - 1; i >= 0; i--) {
    if (score >= TOEIC_LEVELS[i].score) {
      return TOEIC_LEVELS[i];
    }
  }
  return TOEIC_LEVELS[0];
}

export function getNextMilestone(
  score: number,
): { score: number; label: string; tips: string[] } {
  const milestones: Array<{ score: number; label: string; tips: string[] }> = [
    {
      score: 400,
      label: '初級突破',
      tips: [
        'Part 1の写真描写6問、全部取れ。簡単なのに落としてたら話にならない。',
        'Part 2の基本5パターンを暗記。yes/no, who, when, where, what。',
        'とにかく耳を慣らす。毎日15分、英語を聞け。',
      ],
    },
    {
      score: 500,
      label: '中級入り',
      tips: [
        'Part 2の間接回答に慣れろ。「ビール飲む？」→「車で来てる」みたいなやつ。',
        'EP 1-5を完走してから文句言え。',
        'verbatim trap（音声そのまま選択肢）に引っかかるな。',
      ],
    },
    {
      score: 600,
      label: '中上級到達',
      tips: [
        'パラフレーズが全て。「buy」=「purchase」、「talk」=「discuss」を体に叩き込め。',
        'EP 6-8のパラフレーズ特訓をやれ。',
        'Part 3に入る前に設問先読みの習慣をつけろ。',
      ],
    },
    {
      score: 700,
      label: '上級突入',
      tips: [
        'Part 3の設問先読みを0.5秒でやれるようになれ。',
        '3人会話に慣れろ。声の区別ができないと詰む。',
        'ケアレスミスをゼロにするだけで50点上がる。',
      ],
    },
    {
      score: 800,
      label: '準上級',
      tips: [
        'Part 4のアナウンス・留守電・ラジオ、各パターンの定型句を覚えろ。',
        '「NOT問題」と「推測問題」を落とすな。ここが700と800の差。',
        'Part 3/4は設問の先読みができてナンボ。',
      ],
    },
    {
      score: 900,
      label: '超上級',
      tips: [
        '音声変化（リンキング・フラップT・シュワー）を完璧に聞き取れ。',
        'ニュアンスの差が勝負。concern vs. complaint、mention vs. announceを聞き分けろ。',
        'ケアレスミスは許さない。495は現実的な目標だ。',
      ],
    },
    {
      score: 495,
      label: '満点',
      tips: ['もう教える側に回れ。', '居酒屋TOEICを人に布教しろ。'],
    },
  ];

  for (const m of milestones) {
    if (score < m.score) return m;
  }
  // Already at 495
  return milestones[milestones.length - 1];
}

export function calculatePartEstimate(part: number, accuracy: number): number {
  const weight = PART_WEIGHTS[part] ?? 0;
  // Full listening score contribution for this part if perfect accuracy
  const maxContribution = 495 * weight;
  // Apply nonlinear curve within this part's slice
  return Math.round(maxContribution * accuracyToListeningScore(accuracy) / 495);
}

// ── Weakness & Strength Detection ─────────────────────────────────────────

// Skill area metadata used for weakness labeling
interface SkillMeta {
  area: string;
  areaJa: string;
  episodes: string[];
  drillType: string;
  advice: string;
}

const SKILL_META: Record<string, SkillMeta> = {
  'indirect-answers': {
    area: 'indirect-answers',
    areaJa: '間接回答',
    episodes: ['ep-001', 'ep-002'],
    drillType: 'response-matching',
    advice: '「Yes/No以外の返し」に慣れろ。質問への回答が質問で返ってくることもある。',
  },
  'paraphrase': {
    area: 'paraphrase',
    areaJa: 'パラフレーズ',
    episodes: ['ep-006', 'ep-007', 'ep-008'],
    drillType: 'synonym-drill',
    advice: '音声の単語と選択肢の単語が違う。buy=purchase、talk=discussを体に叩き込め。',
  },
  'three-speakers': {
    area: 'three-speakers',
    areaJa: '3人会話',
    episodes: ['ep-009', 'ep-010'],
    drillType: 'speaker-id',
    advice: '3人の声を最初の10秒で識別しろ。声質・話し方で区別するんだ。',
  },
  'negative-questions': {
    area: 'negative-questions',
    areaJa: '否定疑問文',
    episodes: ['ep-003', 'ep-004'],
    drillType: 'negative-drill',
    advice: '「Aren\'t you...?」「Don\'t you...?」の返し方が逆に感じる。慣れるまで何度も聞け。',
  },
  'announcement': {
    area: 'announcement',
    areaJa: 'アナウンス・ラジオ',
    episodes: ['ep-011', 'ep-012'],
    drillType: 'template-memory',
    advice: '冒頭の「目的文」を絶対に聞き逃すな。そこに全部答えがある。',
  },
  'inference': {
    area: 'inference',
    areaJa: '推測問題',
    episodes: ['ep-013', 'ep-014'],
    drillType: 'inference-drill',
    advice: '「implied」「suggested」問題。直接言っていないことを文脈から読み取る練習をしろ。',
  },
  'part1-basic': {
    area: 'part1-basic',
    areaJa: 'Part 1基本',
    episodes: ['ep-001'],
    drillType: 'photo-description',
    advice: 'Part 1は絶対に落とすな。6問全部正解が最低ライン。',
  },
  'voicing': {
    area: 'voicing',
    areaJa: '音声変化',
    episodes: ['ep-015', 'ep-017'],
    drillType: 'phonetics',
    advice: 'リンキング・フラップT・シュワー。音が変化することを知らないと聞き取れない。',
  },
};

function getSkillMeta(skillTag: string): SkillMeta | undefined {
  // Direct match
  if (SKILL_META[skillTag]) return SKILL_META[skillTag];
  // Partial match (e.g. 'indirect-answers-intro' → 'indirect-answers')
  for (const key of Object.keys(SKILL_META)) {
    if (skillTag.startsWith(key) || key.startsWith(skillTag.split('-').slice(0, 2).join('-'))) {
      return SKILL_META[key];
    }
  }
  return undefined;
}

export function detectWeaknesses(
  progress: ToeicProgress,
  episodeResults: EpisodeResult[],
): { weaknesses: Weakness[]; strengths: Strength[] } {
  // Overall accuracy by part (from episode metadata we can infer part if we had it,
  // but here we use aggregate accuracy as a proxy and the score level)
  const overallAccuracy =
    progress.totalAttempted > 0 ? progress.totalCorrect / progress.totalAttempted : 0;

  const score = progress.estimatedScore;

  const weaknesses: Weakness[] = [];
  const strengths: Strength[] = [];

  // Low episode count → not enough data
  const completedCount = Object.keys(progress.completedEpisodes).length;

  // ── Score-band based weakness detection ──────────────────────────────────

  if (score < 500) {
    weaknesses.push({
      area: 'indirect-answers',
      areaJa: '間接回答',
      severity: 'critical',
      description:
        'Part 2の間接回答が取れていない。「はい/いいえ以外の返し」がまだ体に入っていない状態。EP 1-2から始めろ。',
      suggestedEpisodes: ['ep-001', 'ep-002'],
      drillType: 'response-matching',
    });
    if (overallAccuracy < 0.5) {
      weaknesses.push({
        area: 'verbatim-trap',
        areaJa: '音声そのまま引っかけ',
        severity: 'critical',
        description:
          '音声で聞こえた単語をそのまま選ぶ罠にハマっている。選択肢に音声の単語が出たら疑え。',
        suggestedEpisodes: ['ep-003', 'ep-004'],
        drillType: 'trap-awareness',
      });
    }
  }

  if (score >= 500 && score < 600) {
    weaknesses.push({
      area: 'paraphrase',
      areaJa: 'パラフレーズ',
      severity: 'critical',
      description:
        '500台の壁の正体はパラフレーズだ。音声の単語と選択肢の単語が違う。EP 6-8をやれ。',
      suggestedEpisodes: ['ep-006', 'ep-007', 'ep-008'],
      drillType: 'synonym-drill',
    });
  }

  if (score >= 600 && score < 700) {
    weaknesses.push({
      area: 'three-speakers',
      areaJa: '3人会話',
      severity: 'moderate',
      description:
        'Part 3の3人会話が難所。誰が何を言ったか混乱するパターン。声で人物を識別する練習をしろ。',
      suggestedEpisodes: ['ep-009', 'ep-010'],
      drillType: 'speaker-id',
    });
    weaknesses.push({
      area: 'prereading',
      areaJa: '設問先読み',
      severity: 'moderate',
      description:
        '音声が流れる前に設問を読む習慣がない。先読みできないとPart 3/4で詰む。',
      suggestedEpisodes: ['ep-009'],
      drillType: 'prereading-practice',
    });
  }

  if (score >= 700 && score < 800) {
    weaknesses.push({
      area: 'announcement',
      areaJa: 'アナウンス・ラジオ',
      severity: 'moderate',
      description:
        'Part 4のアナウンス・留守電・ラジオ放送。冒頭の目的文を聞き逃すと全問アウト。',
      suggestedEpisodes: ['ep-011', 'ep-012'],
      drillType: 'template-memory',
    });
    weaknesses.push({
      area: 'inference',
      areaJa: '推測問題',
      severity: 'minor',
      description:
        '「implied/suggested」タイプの推測問題。直接言っていないことを文脈から取る練習が必要。',
      suggestedEpisodes: ['ep-013', 'ep-014'],
      drillType: 'inference-drill',
    });
  }

  if (score >= 800) {
    weaknesses.push({
      area: 'voicing',
      areaJa: '音声変化',
      severity: 'minor',
      description:
        '上級者の課題は音声変化。リンキング・フラップT・シュワー。これが聞き取れないと495は無理。',
      suggestedEpisodes: ['ep-015', 'ep-017'],
      drillType: 'phonetics',
    });
  }

  // ── Accuracy-based weaknesses ─────────────────────────────────────────────

  if (completedCount === 0) {
    // No data yet
    weaknesses.push({
      area: 'no-data',
      areaJa: 'データ不足',
      severity: 'critical',
      description: 'まだエピソードをやっていない。最低5話完走してから分析してくれ。',
      suggestedEpisodes: ['ep-001'],
    });
  }

  // ── Strengths ─────────────────────────────────────────────────────────────

  if (overallAccuracy >= 0.8 && completedCount >= 3) {
    strengths.push({
      area: 'consistency',
      areaJa: '安定感',
      description: `正答率${Math.round(overallAccuracy * 100)}%。ムラがない。このまま続ければ確実に上がる。`,
    });
  }

  if (completedCount >= 5) {
    strengths.push({
      area: 'volume',
      areaJa: '練習量',
      description: `${completedCount}話完走。量をこなしている。継続が一番の武器だ。`,
    });
  }

  if (score >= 700) {
    strengths.push({
      area: 'part2',
      areaJa: 'Part 2',
      description: 'Part 2が安定している証拠。間接回答とverbatim trapを乗り越えた。',
    });
  }

  if (progress.streakDays >= 7) {
    strengths.push({
      area: 'streak',
      areaJa: '継続力',
      description: `${progress.streakDays}日連続プレイ。TOEICは継続で上がる試験だ。`,
    });
  }

  return { weaknesses, strengths };
}

// ── Study Plan Generation ──────────────────────────────────────────────────

export function generateStudyPlan(analysis: ScoreAnalysis): StudyRecommendation[] {
  const score = analysis.estimatedListeningScore;
  const recs: StudyRecommendation[] = [];

  if (score < 500) {
    recs.push({
      priority: 1,
      action:
        'Part 2に集中しろ。indirect answerパターンを20個暗記して、EP 1-5を全部やれ。1日30分でいい。',
      estimatedGain: '+50-80点',
      timeNeeded: '3週間',
    });
    recs.push({
      priority: 2,
      action:
        'Part 1を落とすな。写真描写6問は全問正解が当たり前。難しい単語より基本動詞を覚えろ（stand, sit, hold, carry）。',
      estimatedGain: '+20-30点',
      timeNeeded: '1週間',
    });
    recs.push({
      priority: 3,
      action:
        '毎日10分、英語のPodcastか映画を聞け。内容が分からなくてもいい。耳を慣らすのが目的だ。',
      estimatedGain: '+10-20点（1ヶ月後）',
      timeNeeded: '継続',
    });
  } else if (score < 600) {
    recs.push({
      priority: 1,
      action:
        'パラフレーズが弱い。buy=purchase, talk=discuss, help=assist を辞典で50ペア覚えて、EP 6-8をやれ。',
      estimatedGain: '+40-60点',
      timeNeeded: '2週間',
    });
    recs.push({
      priority: 2,
      action:
        'Part 3の設問先読みを練習しろ。音声前に選択肢を読んでおくと正答率が跳ね上がる。EP 9-10でトレーニング。',
      estimatedGain: '+30-40点',
      timeNeeded: '2週間',
    });
    recs.push({
      priority: 3,
      action:
        'verbatim trap（音声の単語そのまま選択肢）を意識しろ。聞こえた単語が選択肢にあったら疑え。',
      estimatedGain: '+10-20点',
      timeNeeded: '1週間',
    });
  } else if (score < 700) {
    recs.push({
      priority: 1,
      action:
        'Part 3の先読みを0.5秒でできるようにしろ。3人会話に慣れるまでEP 9-10を3周やれ。',
      estimatedGain: '+50-70点',
      timeNeeded: '3週間',
    });
    recs.push({
      priority: 2,
      action:
        '3人会話の声識別練習。最初の10秒で話者を特定するクセをつけろ。ボイスメモで試してもいい。',
      estimatedGain: '+20-30点',
      timeNeeded: '2週間',
    });
    recs.push({
      priority: 3,
      action:
        'ケアレスミスを記録しろ。同じパターンで落としているはずだ。ミスタイプを把握するだけで点数が上がる。',
      estimatedGain: '+10-20点',
      timeNeeded: '継続',
    });
  } else if (score < 800) {
    recs.push({
      priority: 1,
      action:
        'Part 4のアナウンス・留守電・ラジオ放送のテンプレを覚えろ。冒頭文が全ての答えを持っている。EP 11-12。',
      estimatedGain: '+40-60点',
      timeNeeded: '3週間',
    });
    recs.push({
      priority: 2,
      action:
        'NOT問題（「〜でないのはどれか」）と推測問題（implied/suggested）を練習しろ。EP 13-14でやれ。',
      estimatedGain: '+20-30点',
      timeNeeded: '2週間',
    });
    recs.push({
      priority: 3,
      action:
        'Part 3/4の設問先読みを3問セット全部やれるようにしろ。1問しか読めていないなら訓練不足だ。',
      estimatedGain: '+10-15点',
      timeNeeded: '1週間',
    });
  } else {
    recs.push({
      priority: 1,
      action:
        '音声変化を完璧にしろ。リンキング・フラップT・シュワー。ネイティブスピードで聞いて全部拾えるか確認。EP 15, 17でやれ。',
      estimatedGain: '+20-40点',
      timeNeeded: '1ヶ月',
    });
    recs.push({
      priority: 2,
      action:
        'ニュアンスの聞き分け。concern vs. complaint、suggest vs. recommend。ほぼ同じに見えて選択肢が分かれる問題をやれ。',
      estimatedGain: '+10-20点',
      timeNeeded: '2週間',
    });
    recs.push({
      priority: 3,
      action:
        'ケアレスミスゼロを目指せ。800台の壁はほぼケアレスミスと音声変化の聞き逃し。完璧主義でいけ。',
      estimatedGain: '+5-15点',
      timeNeeded: '継続',
    });
  }

  return recs;
}

// ── Main Analyzer ──────────────────────────────────────────────────────────

export function analyzeScore(progress: ToeicProgress): ScoreAnalysis {
  const episodeResults = Object.values(progress.completedEpisodes);

  // ── Part scores ──
  // Without per-episode part metadata in progress, we approximate:
  // Use the episodes directory naming convention (ep-001 → Part 2, etc.) where available.
  // Fall back to distributing overall accuracy across parts proportionally.
  const overallAccuracy =
    progress.totalAttempted > 0 ? progress.totalCorrect / progress.totalAttempted : 0;

  const partScores: Record<number, PartScore> = {};
  for (const part of [1, 2, 3, 4]) {
    const weight = PART_WEIGHTS[part];
    const maxQ = Math.round(100 * weight); // rough question count
    const correct = Math.round(maxQ * overallAccuracy);
    const estimated = calculatePartEstimate(part, overallAccuracy);
    partScores[part] = {
      part,
      correct,
      total: maxQ,
      accuracy: overallAccuracy,
      estimatedScore: estimated,
      trend: 'stable', // trend requires historical data; placeholder
    };
  }

  // ── Listening score ──
  const estimatedListeningScore = accuracyToListeningScore(overallAccuracy);

  // ── Level & milestone ──
  const level = getLevel(estimatedListeningScore);
  const nextMilestone = getNextMilestone(estimatedListeningScore);

  // ── Weaknesses & strengths ──
  const { weaknesses, strengths } = detectWeaknesses(progress, episodeResults);

  // Build initial analysis (without studyPlan, needed for generateStudyPlan)
  const partialAnalysis: ScoreAnalysis = {
    estimatedListeningScore,
    estimatedReadingScore: 0, // future
    estimatedTotal: estimatedListeningScore, // Listening only for now
    partScores,
    weaknesses,
    strengths,
    studyPlan: [],
    level,
    nextMilestone,
  };

  const studyPlan = generateStudyPlan(partialAnalysis);

  return { ...partialAnalysis, studyPlan };
}
