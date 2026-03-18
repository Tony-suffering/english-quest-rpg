// 居酒屋TOEIC -- Mistake Pattern Tracker

import { ToeicProgress } from './progress';

// ── Types ──────────────────────────────────────────────────────────────────

export interface MistakeRecord {
  questionId: string;
  episodeId: string;
  part: number;
  skillTag: string;
  trapType?: string;
  timestamp: string;   // ISO
  wasCorrect: boolean;
}

export interface MistakePattern {
  pattern: string;     // 'verbatim-trap' | 'paraphrase-miss' | 'indirect-miss' etc.
  patternJa: string;
  count: number;
  recentCount: number; // Last 7 days
  trend: 'improving' | 'stable' | 'getting-worse';
  examples: string[];  // Question IDs (max 5)
  advice: string;      // Japanese
}

export interface TrendSummary {
  periodDays: number;
  totalAttempts: number;
  totalMistakes: number;
  accuracy: number;
  direction: 'improving' | 'stable' | 'getting-worse';
  message: string;     // Japanese
}

// ── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'izakaya_toeic_mistakes';

// Maps skill tags / trap types → human-readable pattern metadata
const PATTERN_META: Record<string, { patternJa: string; advice: string }> = {
  'verbatim-trap': {
    patternJa: '音声そのまま引っかけ',
    advice:
      '聞こえた単語が選択肢にそのまま出たら疑え。TOEICの罠の基本中の基本だ。',
  },
  'paraphrase-miss': {
    patternJa: 'パラフレーズ聞き逃し',
    advice:
      'buy=purchase, help=assist, talk=discuss。音声と選択肢で単語が違う。辞典50ペア暗記が先決。',
  },
  'indirect-miss': {
    patternJa: '間接回答見逃し',
    advice:
      '「はい/いいえ」以外の返しに慣れていない。「車で来てる」=「ビールは飲めない」と即座に変換できるか？',
  },
  'negative-miss': {
    patternJa: '否定疑問文の誤読',
    advice:
      '「Aren\'t you...?」に「Yes」と答えると逆の意味になる。日本語の感覚と真逆だ。体で覚えろ。',
  },
  'wrong-speaker': {
    patternJa: '話者の取り違え',
    advice:
      '3人会話で誰が何を言ったか混乱している。最初の10秒で声の特徴を識別する習慣をつけろ。',
  },
  'inference-miss': {
    patternJa: '推測問題の失点',
    advice:
      '「implied」「suggested」問題。直接言っていない。文脈から読み取れるようになるまでEP 13-14を繰り返せ。',
  },
  'part1-slip': {
    patternJa: 'Part 1ケアレスミス',
    advice:
      'Part 1で落とすのは一番もったいない。6問全問正解が最低ライン。集中力の問題だ。',
  },
  'prereading-fail': {
    patternJa: '先読み失敗',
    advice:
      '音声前に設問を読めていない。先読みできないとPart 3/4は運ゲーになる。設問読みを0.5秒で終わらせる訓練をしろ。',
  },
  'phonetics-miss': {
    patternJa: '音声変化の聞き逃し',
    advice:
      'リンキング・フラップT・シュワー。音が変化することを知らないと永遠に聞き取れない。EP 15, 17でやれ。',
  },
  'wrong-tense': {
    patternJa: '時制の罠',
    advice:
      '「已に終わった話」と「これからの話」を混同している。時制に敏感になれ。',
  },
  'topic-shift': {
    patternJa: '話題すり替え引っかけ',
    advice:
      '途中で話題が変わるパターン。冒頭だけ聞いて安心するな。最後まで気を抜くな。',
  },
  'similar-sound': {
    patternJa: '似た音の単語',
    advice:
      'site/sight, meet/meat, write/right。音が似ているだけの選択肢に引っかかっている。文脈で判断しろ。',
  },
};

// Fallback for unknown patterns
const DEFAULT_META = {
  patternJa: '不明なパターン',
  advice: 'このパターンのデータが蓄積されたら分析できる。もっとやれ。',
};

// ── localStorage Helpers ───────────────────────────────────────────────────

function loadRecords(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MistakeRecord[];
  } catch {
    return [];
  }
}

function saveRecords(records: MistakeRecord[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Save a single question result.
 * Call this every time a question is answered, regardless of correct/wrong.
 */
export function recordMistake(record: MistakeRecord): void {
  const records = loadRecords();
  records.push(record);
  saveRecords(records);
}

/**
 * Get all stored records (correct + incorrect both).
 */
export function getMistakeHistory(): MistakeRecord[] {
  return loadRecords();
}

/**
 * Group records by pattern and compute stats.
 * Only includes records where wasCorrect === false (actual mistakes).
 */
export function analyzeMistakePatterns(): MistakePattern[] {
  const records = loadRecords().filter(r => !r.wasCorrect);
  if (records.length === 0) return [];

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

  // Group by pattern key: prefer trapType if present, else derive from skillTag
  const grouped: Record<
    string,
    { records: MistakeRecord[]; recent: MistakeRecord[]; older: MistakeRecord[] }
  > = {};

  for (const record of records) {
    const key = derivePatternKey(record);
    if (!grouped[key]) {
      grouped[key] = { records: [], recent: [], older: [] };
    }
    const ts = new Date(record.timestamp).getTime();
    grouped[key].records.push(record);
    if (ts >= sevenDaysAgo) {
      grouped[key].recent.push(record);
    }
    if (ts >= fourteenDaysAgo && ts < sevenDaysAgo) {
      grouped[key].older.push(record);
    }
  }

  const patterns: MistakePattern[] = Object.entries(grouped).map(([pattern, data]) => {
    const meta = PATTERN_META[pattern] ?? DEFAULT_META;
    const recentCount = data.recent.length;
    const olderCount = data.older.length;

    // Trend: compare last 7 days vs 7-14 days ago
    let trend: MistakePattern['trend'] = 'stable';
    if (recentCount < olderCount && olderCount > 0) {
      trend = 'improving';
    } else if (recentCount > olderCount + 1) {
      trend = 'getting-worse';
    }

    const examples = Array.from(
      new Set(data.records.map(r => r.questionId)),
    ).slice(0, 5);

    return {
      pattern,
      patternJa: meta.patternJa,
      count: data.records.length,
      recentCount,
      trend,
      examples,
      advice: meta.advice,
    };
  });

  // Sort by count descending
  return patterns.sort((a, b) => b.count - a.count);
}

/**
 * Returns the top N weakest skill areas based on mistake frequency.
 */
export function getWeakestSkills(limit = 3): MistakePattern[] {
  const patterns = analyzeMistakePatterns();
  return patterns.slice(0, limit);
}

/**
 * Overall accuracy trend over the specified number of days.
 * Compares first half vs second half of the period.
 */
export function getMistakeTrend(days = 14): TrendSummary {
  const records = loadRecords();
  const now = Date.now();
  const cutoff = now - days * 24 * 60 * 60 * 1000;
  const midpoint = cutoff + (days / 2) * 24 * 60 * 60 * 1000;

  const inPeriod = records.filter(r => new Date(r.timestamp).getTime() >= cutoff);

  if (inPeriod.length === 0) {
    return {
      periodDays: days,
      totalAttempts: 0,
      totalMistakes: 0,
      accuracy: 0,
      direction: 'stable',
      message: 'データがない。まずエピソードを5話やれ。',
    };
  }

  const firstHalf = inPeriod.filter(r => new Date(r.timestamp).getTime() < midpoint);
  const secondHalf = inPeriod.filter(r => new Date(r.timestamp).getTime() >= midpoint);

  const accuracyOf = (rs: MistakeRecord[]): number => {
    if (rs.length === 0) return 0;
    return rs.filter(r => r.wasCorrect).length / rs.length;
  };

  const acc1 = accuracyOf(firstHalf);
  const acc2 = accuracyOf(secondHalf);
  const overallAcc = accuracyOf(inPeriod);

  let direction: TrendSummary['direction'] = 'stable';
  let message: string;

  const delta = acc2 - acc1;

  if (firstHalf.length === 0 || secondHalf.length === 0) {
    direction = 'stable';
    message = 'まだデータが少ない。続けてくれ。';
  } else if (delta >= 0.05) {
    direction = 'improving';
    message = `正答率が${Math.round(acc1 * 100)}%→${Math.round(acc2 * 100)}%に上がった。いい感じだ。`;
  } else if (delta <= -0.05) {
    direction = 'getting-worse';
    message = `正答率が${Math.round(acc1 * 100)}%→${Math.round(acc2 * 100)}%に下がった。難しいEPに入ったか、疲れているか。`;
  } else {
    direction = 'stable';
    message = `正答率${Math.round(overallAcc * 100)}%で安定している。もう一段上を狙え。`;
  }

  return {
    periodDays: days,
    totalAttempts: inPeriod.length,
    totalMistakes: inPeriod.filter(r => !r.wasCorrect).length,
    accuracy: overallAcc,
    direction,
    message,
  };
}

/**
 * Remove records older than daysToKeep days.
 * Keeps localStorage from bloating over time.
 */
export function clearOldMistakes(daysToKeep = 90): number {
  const records = loadRecords();
  const cutoff = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;
  const kept = records.filter(r => new Date(r.timestamp).getTime() >= cutoff);
  const removed = records.length - kept.length;
  saveRecords(kept);
  return removed;
}

// ── Convenience: record from a question answer ─────────────────────────────

/**
 * Shorthand to record a single answered question.
 * Pass wasCorrect=false for mistakes, true for correct answers (both are tracked).
 */
export function recordAnswer(
  questionId: string,
  episodeId: string,
  part: number,
  skillTag: string,
  wasCorrect: boolean,
  trapType?: string,
): void {
  recordMistake({
    questionId,
    episodeId,
    part,
    skillTag,
    trapType,
    timestamp: new Date().toISOString(),
    wasCorrect,
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Determine the pattern key from a record.
 * Prefers trapType; falls back to mapping common skillTags to pattern keys.
 */
function derivePatternKey(record: MistakeRecord): string {
  if (record.trapType) {
    // Normalize trapType to our pattern keys
    const trapMap: Record<string, string> = {
      verbatim: 'verbatim-trap',
      indirect: 'indirect-miss',
      'similar-sound': 'similar-sound',
      'wrong-speaker': 'wrong-speaker',
      'wrong-tense': 'wrong-tense',
      'wrong-preposition': 'wrong-tense', // group with tense for simplicity
      'topic-shift': 'topic-shift',
    };
    if (trapMap[record.trapType]) return trapMap[record.trapType];
    return record.trapType;
  }

  // Derive from skillTag
  const tagMap: Record<string, string> = {
    'indirect-answers': 'indirect-miss',
    'indirect-answers-intro': 'indirect-miss',
    'indirect-answers-advanced': 'indirect-miss',
    'paraphrase': 'paraphrase-miss',
    'paraphrase-basic': 'paraphrase-miss',
    'paraphrase-advanced': 'paraphrase-miss',
    'three-speakers': 'wrong-speaker',
    'negative-questions': 'negative-miss',
    'announcement': 'prereading-fail',
    'inference': 'inference-miss',
    'voicing': 'phonetics-miss',
    'part1-basic': 'part1-slip',
    'prereading': 'prereading-fail',
  };

  // Direct match
  if (tagMap[record.skillTag]) return tagMap[record.skillTag];

  // Partial prefix match
  for (const [key, val] of Object.entries(tagMap)) {
    if (record.skillTag.startsWith(key.split('-')[0])) return val;
  }

  return record.skillTag; // fallback: use the tag itself as the pattern key
}

// ── Integration with ToeicProgress ────────────────────────────────────────

/**
 * Given a ToeicProgress snapshot, generate a weakness summary based on mistake patterns.
 * Returns the top 3 patterns as strings for quick display.
 */
export function getProgressWeaknessSummary(_progress: ToeicProgress): string[] {
  const patterns = getWeakestSkills(3);
  if (patterns.length === 0) {
    return ['まだデータが足りない。エピソードを5話やってから確認しろ。'];
  }
  return patterns.map(
    p =>
      `${p.patternJa}（${p.count}回）: ${p.advice}`,
  );
}
