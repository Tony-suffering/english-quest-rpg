#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════
// Content Quality Audit Script
// Reads all exercise data from LisQue, YomiQue, and 居酒屋TOEIC
// Scores quality on multiple axes and outputs a report
// ═══════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { existsSync } from 'fs';

const ROOT = resolve(import.meta.dirname, '..');
const REPORT_PATH = join(import.meta.dirname, 'audit-report.txt');

// ─── Utility: Parse TypeScript array from file ────────────
// Since these are TS files with import statements, we parse
// the exported array using regex-based extraction.

function readFileContent(relPath) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

// Extract JS-like objects from a TS array export.
// This is a pragmatic parser that handles the exercise data shape.
function extractExercises(content, arrayVarPattern) {
  if (!content) return [];

  // Find the array content
  // Handle TypeScript type annotations: VAR: Type[] = [
  const varMatch = content.match(new RegExp(arrayVarPattern + '[^=]*=\\s*\\['));
  if (!varMatch) return [];

  // Find the '= [' assignment, not the '[]' in the type annotation
  const eqIdx = content.indexOf('=', varMatch.index + arrayVarPattern.length);
  if (eqIdx === -1) return [];
  const startIdx = content.indexOf('[', eqIdx);
  if (startIdx === -1) return [];

  // Balance brackets to find the end of the array
  let depth = 0;
  let endIdx = startIdx;
  for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }

  const arrayStr = content.slice(startIdx, endIdx + 1);

  // Extract day-level objects with exercises
  const days = [];
  const dayRegex = /\{\s*day:\s*(\d+)/g;
  let dayMatch;
  while ((dayMatch = dayRegex.exec(arrayStr)) !== null) {
    const dayNum = parseInt(dayMatch[1]);

    // Find the exercises array for this day
    const dayStart = dayMatch.index;
    // Find the next day start or end of array
    const nextDay = arrayStr.indexOf('\n  {', dayStart + 10);
    const dayEnd = nextDay > 0 ? nextDay : arrayStr.length;
    const daySlice = arrayStr.slice(dayStart, dayEnd);

    const exercises = extractExerciseObjects(daySlice, dayNum);
    days.push({ day: dayNum, exercises, raw: daySlice });
  }

  return days;
}

function extractExerciseObjects(daySlice, dayNum) {
  const exercises = [];

  // Match individual exercise blocks by finding id patterns
  const idRegex = /id:\s*'([^']+)'/g;
  let idMatch;
  const idPositions = [];

  while ((idMatch = idRegex.exec(daySlice)) !== null) {
    idPositions.push({ id: idMatch[1], index: idMatch.index });
  }

  for (let i = 0; i < idPositions.length; i++) {
    const start = idPositions[i].index;
    const end = i + 1 < idPositions.length ? idPositions[i + 1].index : daySlice.length;
    const exSlice = daySlice.slice(start - 50, end);

    const ex = {
      id: idPositions[i].id,
      day: dayNum,
      type: extractField(exSlice, 'type'),
      audioText: extractField(exSlice, 'audioText'),
      question: extractField(exSlice, 'question'),
      answer: extractField(exSlice, 'answer'),
      trap: extractField(exSlice, 'trap'),
      tip: extractField(exSlice, 'tip'),
      difficulty: extractField(exSlice, 'difficulty'),
      hasOptions: /options:\s*\[/.test(exSlice),
      optionsCount: countOptions(exSlice),
      options: extractOptions(exSlice),
      hasCharacterIntro: /characterIntro:\s*\{/.test(exSlice),
      hasReaction: /reaction:\s*\{/.test(exSlice),
      // YomiQue-specific
      hasPassage: /passage:\s*\{/.test(exSlice),
      passageWordCount: extractPassageWordCount(exSlice),
      passageText: extractPassageText(exSlice),
      passageSourceType: extractField(exSlice, 'sourceType'),
      raw: exSlice,
    };

    exercises.push(ex);
  }

  return exercises;
}

function extractField(str, field) {
  // Handle multi-line string fields with single quotes
  const singleQuoteRegex = new RegExp(field + ":\\s*'((?:[^'\\\\]|\\\\.|'(?!,|\\s*\\}|\\s*$))*)'", 's');
  const sqMatch = str.match(singleQuoteRegex);
  if (sqMatch) return sqMatch[1].replace(/\\'/g, "'");

  // Handle template literals
  const templateRegex = new RegExp(field + ':\\s*`([^`]*)`', 's');
  const tlMatch = str.match(templateRegex);
  if (tlMatch) return tlMatch[1];

  // Handle double quotes
  const dqRegex = new RegExp(field + ':\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  const dqMatch = str.match(dqRegex);
  if (dqMatch) return dqMatch[1];

  return null;
}

function countOptions(str) {
  const optMatch = str.match(/options:\s*\[([\s\S]*?)\]/);
  if (!optMatch) return 0;
  // Count quoted strings in the options array
  const quotes = optMatch[1].match(/'[^']*'/g) || optMatch[1].match(/"[^"]*"/g) || [];
  return quotes.length;
}

function extractOptions(str) {
  const optMatch = str.match(/options:\s*\[([\s\S]*?)\]/);
  if (!optMatch) return [];
  const quotes = optMatch[1].match(/'([^']*)'/g) || optMatch[1].match(/"([^"]*)"/g) || [];
  return quotes.map(q => q.replace(/^['"]|['"]$/g, ''));
}

function extractPassageWordCount(str) {
  const m = str.match(/wordCount:\s*(\d+)/);
  return m ? parseInt(m[1]) : null;
}

function extractPassageText(str) {
  const m = str.match(/text:\s*'([\s\S]*?)(?:',|\n\s*sourceType)/);
  if (m) return m[1];
  const m2 = str.match(/text:\s*`([\s\S]*?)`/);
  return m2 ? m2[1] : null;
}


// ─── Quality Scoring Functions ────────────────────────────

function scoreTrap(trap) {
  if (!trap) return { score: 0, issues: ['missing trap'] };
  const issues = [];

  if (trap.length < 30) issues.push('trap too short (<30 chars)');

  // Check for Japanese brain difference mention
  const jaKeywords = /日本語|日本人|カタカナ|母音|子音|耳|音|脳/;
  if (!jaKeywords.test(trap)) issues.push('trap does not mention Japanese/brain difference');

  // Check for generic traps
  const genericPatterns = /注意しましょう|気をつけて|よく間違える|難しい$/;
  if (genericPatterns.test(trap)) issues.push('trap is generic');

  const score = Math.max(0, 3 - issues.length);
  return { score, issues };
}

function scoreTip(tip) {
  if (!tip) return { score: 0, issues: ['missing tip'] };
  const issues = [];

  if (tip.length < 30) issues.push('tip too short (<30 chars)');

  // Check for actionable advice
  const actionablePatterns = /注目|集中|聞|見|確認|チェック|意識|コツ|方法|ポイント|テクニック|判定|判別/;
  if (!actionablePatterns.test(tip)) issues.push('tip lacks actionable advice');

  // Check for "just practice" type tips
  const lazyPatterns = /^練習しましょう$|^慣れましょう$|^頑張りましょう$/;
  if (lazyPatterns.test(tip)) issues.push('tip is just "practice more"');

  const score = Math.max(0, 3 - issues.length);
  return { score, issues };
}

function checkAnswerValidity(exercise) {
  if (!exercise.hasOptions || !exercise.answer) return { valid: true, issue: null };
  const opts = exercise.options;
  if (opts.length === 0) return { valid: true, issue: null };

  const answerInOpts = opts.some(o => o === exercise.answer);
  if (!answerInOpts) return { valid: false, issue: `answer "${exercise.answer}" not in options` };
  return { valid: true, issue: null };
}

function checkDistractorQuality(exercise) {
  if (!exercise.hasOptions || exercise.options.length < 2) return { score: 3, issues: [] };
  const issues = [];
  const opts = exercise.options;

  // Check if all distractors are very short or very long vs answer
  const answerLen = (exercise.answer || '').length;
  const distractors = opts.filter(o => o !== exercise.answer);

  // Check for obviously wrong distractors (length mismatch > 3x)
  for (const d of distractors) {
    if (answerLen > 0 && (d.length > answerLen * 3 || d.length < answerLen / 3)) {
      issues.push(`distractor "${d.slice(0, 20)}..." has very different length from answer`);
    }
  }

  // Check for duplicate distractors
  const unique = new Set(opts);
  if (unique.size < opts.length) {
    issues.push('duplicate options found');
  }

  const score = Math.max(0, 3 - issues.length);
  return { score, issues };
}

function checkDuplicates(allExercises) {
  const seen = new Map(); // question -> [ids]
  const dupes = [];

  for (const ex of allExercises) {
    const key = (ex.question || '').trim().toLowerCase();
    if (key.length < 10) continue; // skip very short questions

    if (seen.has(key)) {
      seen.get(key).push(ex.id);
    } else {
      seen.set(key, [ex.id]);
    }
  }

  // Also check audioText for LisQue
  const audioSeen = new Map();
  for (const ex of allExercises) {
    const key = (ex.audioText || '').trim().toLowerCase();
    if (key.length < 10) continue;

    if (audioSeen.has(key)) {
      audioSeen.get(key).push(ex.id);
    } else {
      audioSeen.set(key, [ex.id]);
    }
  }

  for (const [q, ids] of seen) {
    if (ids.length > 1) dupes.push({ type: 'question', text: q.slice(0, 60), ids });
  }
  for (const [a, ids] of audioSeen) {
    if (ids.length > 1) dupes.push({ type: 'audioText', text: a.slice(0, 60), ids });
  }

  return dupes;
}

function checkDifficultyDistribution(exercises) {
  const counts = { beginner: 0, growing: 0, challenge: 0 };
  for (const ex of exercises) {
    if (counts[ex.difficulty] !== undefined) counts[ex.difficulty]++;
  }
  const total = exercises.length || 1;
  const issues = [];

  // All same difficulty is bad
  const nonZero = Object.values(counts).filter(c => c > 0).length;
  if (nonZero <= 1 && total >= 5) {
    issues.push(`only ${Object.keys(counts).find(k => counts[k] > 0) || 'unknown'} difficulty`);
  }

  // More than 70% one difficulty
  for (const [level, count] of Object.entries(counts)) {
    if (count / total > 0.7 && total >= 5) {
      issues.push(`${level} is ${Math.round(count / total * 100)}% of exercises`);
    }
  }

  return { counts, issues };
}

function checkExerciseTypeDistribution(exercises) {
  const types = {};
  for (const ex of exercises) {
    types[ex.type || 'unknown'] = (types[ex.type || 'unknown'] || 0) + 1;
  }
  const issues = [];
  const total = exercises.length || 1;
  const uniqueTypes = Object.keys(types).length;

  if (uniqueTypes <= 1 && total >= 5) {
    issues.push(`only ${Object.keys(types)[0] || 'unknown'} type`);
  }

  return { types, issues };
}

function checkPassageWordCount(exercise) {
  if (!exercise.hasPassage || !exercise.passageText || !exercise.passageWordCount) return null;

  const actualCount = exercise.passageText.split(/\s+/).filter(w => w.length > 0).length;
  const declared = exercise.passageWordCount;
  const diff = Math.abs(actualCount - declared);

  if (diff > Math.max(5, declared * 0.2)) {
    return { declared, actual: actualCount, diff };
  }
  return null;
}


// ─── Scoring: compute per-exercise score (0-10) ──────────

function scoreExercise(ex, isYomique = false) {
  let score = 10;
  const issues = [];

  // Options check (2 points)
  if (ex.type === 'choice' || ex.type === 'scene' || ex.type === 'scan' ||
      ex.type === 'main_idea' || ex.type === 'vocabulary' || ex.type === 'inference' ||
      ex.type === 'truefalse') {
    if (!ex.hasOptions) {
      score -= 2;
      issues.push('missing options');
    } else if (ex.optionsCount < 2) {
      score -= 1.5;
      issues.push(`only ${ex.optionsCount} options`);
    } else if (ex.optionsCount < 4 && ex.type !== 'choice') {
      // Some LisQue choice exercises legitimately have 2-3 options for minimal pairs
    } else if (ex.optionsCount < 4 && isYomique) {
      score -= 0.5;
      issues.push(`${ex.optionsCount} options (expected 4)`);
    }
  }

  // TRAP quality (2 points)
  const trapResult = scoreTrap(ex.trap);
  const trapDeduct = (3 - trapResult.score) * (2 / 3);
  score -= trapDeduct;
  issues.push(...trapResult.issues);

  // TIP quality (2 points)
  const tipResult = scoreTip(ex.tip);
  const tipDeduct = (3 - tipResult.score) * (2 / 3);
  score -= tipDeduct;
  issues.push(...tipResult.issues);

  // Answer validity (1 point)
  const answerCheck = checkAnswerValidity(ex);
  if (!answerCheck.valid) {
    score -= 1;
    issues.push(answerCheck.issue);
  }

  // Distractor quality (1 point)
  const distCheck = checkDistractorQuality(ex);
  const distDeduct = (3 - distCheck.score) * (1 / 3);
  score -= distDeduct;
  issues.push(...distCheck.issues);

  // Character coverage (1 point each)
  if (!ex.hasCharacterIntro) {
    score -= 0.5;
    issues.push('no characterIntro');
  }
  if (!ex.hasReaction) {
    score -= 0.5;
    issues.push('no reaction');
  }

  // YomiQue passage check (1 point)
  if (isYomique) {
    const wcCheck = checkPassageWordCount(ex);
    if (wcCheck) {
      score -= 0.5;
      issues.push(`wordCount mismatch: declared=${wcCheck.declared}, actual=${wcCheck.actual}`);
    }
  }

  return { score: Math.max(0, Math.round(score * 10) / 10), issues };
}


// ─── Parse 居酒屋TOEIC Episodes ──────────────────────────

function parseEpisodes() {
  const episodes = [];
  for (let i = 1; i <= 30; i++) {
    const num = String(i).padStart(3, '0');
    const content = readFileContent(`src/data/izakaya-toeic/episodes/ep-${num}.ts`);
    if (!content) {
      episodes.push({ number: i, exists: false, storyLines: 0, questions: 0, issues: ['file missing'] });
      continue;
    }

    const storyLines = (content.match(/speaker:/g) || []).length;
    const questions = (content.match(/id:\s*'/g) || []).length - 1; // -1 for the episode id itself
    const hasVocab = /vocabHighlights/.test(content);
    const hasMasterTip = /masterTip/.test(content);

    const qIds = [];
    const qIdRegex = /id:\s*'(ep-\d+-q\d+)'/g;
    let qMatch;
    while ((qMatch = qIdRegex.exec(content)) !== null) {
      qIds.push(qMatch[1]);
    }

    // Check each question has choices
    const choiceBlocks = content.match(/choices:\s*\[[\s\S]*?\]/g) || [];
    const questionsWithChoices = choiceBlocks.length;
    const questionsWithCorrect = (content.match(/isCorrect:\s*true/g) || []).length;

    const issues = [];
    if (storyLines < 5) issues.push('very short story');
    if (questions < 2) issues.push('too few questions');
    if (!hasVocab) issues.push('missing vocabHighlights');
    if (!hasMasterTip) issues.push('missing masterTip');
    if (questionsWithCorrect < questions) issues.push('some questions missing correct answer');

    episodes.push({
      number: i,
      exists: true,
      storyLines,
      questions: Math.max(0, questions),
      questionIds: qIds,
      hasVocab,
      hasMasterTip,
      questionsWithChoices,
      questionsWithCorrect,
      issues,
    });
  }
  return episodes;
}


// ─── Parse Part 2 Drills ─────────────────────────────────

function parsePart2Drills() {
  const content = readFileContent('src/data/izakaya-toeic/part2-drills.ts');
  if (!content) return { total: 0, issues: ['file not found'] };

  const drills = [];
  const idRegex = /id:\s*'([^']+)'/g;
  let m;
  const idPositions = [];
  while ((m = idRegex.exec(content)) !== null) {
    idPositions.push({ id: m[1], index: m.index });
  }

  let missingTip = 0;
  let missingExplanation = 0;
  let invalidCorrectIndex = 0;

  for (let i = 0; i < idPositions.length; i++) {
    const start = idPositions[i].index;
    const end = i + 1 < idPositions.length ? idPositions[i + 1].index : content.length;
    const slice = content.slice(start, end);

    const hasTip = /tip:/.test(slice);
    const hasExplanation = /explanation:/.test(slice);
    const correctIdxMatch = slice.match(/correctIndex:\s*(\d)/);
    const choicesCount = (slice.match(/isCorrect:/g) || []).length;
    const hasCorrectTrue = /isCorrect:\s*true/.test(slice);

    if (!hasTip) missingTip++;
    if (!hasExplanation) missingExplanation++;
    if (!hasCorrectTrue) invalidCorrectIndex++;

    drills.push({
      id: idPositions[i].id,
      hasTip,
      hasExplanation,
      choicesCount,
      hasCorrectTrue,
    });
  }

  return {
    total: drills.length,
    missingTip,
    missingExplanation,
    invalidCorrectIndex,
    drills,
  };
}


// ─── Main Audit ──────────────────────────────────────────

function runAudit() {
  const lines = [];
  const now = new Date().toISOString().split('T')[0];

  lines.push('');
  lines.push('================================================================');
  lines.push('                    CONTENT QUALITY AUDIT');
  lines.push('================================================================');
  lines.push(`Date: ${now}`);
  lines.push('');

  // ──────── LisQue ────────────────────────────────────────

  lines.push('-- LisQue (Listening Quest) ------------------------------------');
  lines.push('');

  const lisque1 = readFileContent('src/data/english/lisque/days-01-15.ts');
  const lisque2 = readFileContent('src/data/english/lisque/days-16-30.ts');

  const lisqueDays1 = lisque1 ? extractExercises(lisque1, 'LISQUE_DAYS_01_15') : [];
  const lisqueDays2 = lisque2 ? extractExercises(lisque2, 'LISQUE_DAYS_16_30') : [];
  const lisqueDays = [...lisqueDays1, ...lisqueDays2];

  const allLisqueExercises = lisqueDays.flatMap(d => d.exercises);

  if (allLisqueExercises.length === 0) {
    lines.push('  WARNING: No LisQue exercises found (files may be empty/placeholder)');
    lines.push('');
  } else {
    // Basic stats
    lines.push(`  Total days: ${lisqueDays.length}`);
    lines.push(`  Total exercises: ${allLisqueExercises.length}`);
    lines.push('');

    // Options check
    const missingOptions = allLisqueExercises.filter(ex =>
      (ex.type === 'choice' || ex.type === 'scene') && !ex.hasOptions
    );
    const nonFourOptions = allLisqueExercises.filter(ex =>
      ex.hasOptions && ex.optionsCount !== 4 && ex.optionsCount !== 2 && ex.optionsCount !== 3
    );
    lines.push(`  Missing options (choice/scene types): ${missingOptions.length}`);
    if (missingOptions.length > 0) {
      lines.push(`    IDs: ${missingOptions.map(e => e.id).join(', ')}`);
    }
    lines.push(`  Non-standard option count: ${nonFourOptions.length}`);
    lines.push('');

    // TRAP quality
    const trapScores = allLisqueExercises.map(ex => scoreTrap(ex.trap));
    const avgTrap = trapScores.reduce((s, t) => s + t.score, 0) / trapScores.length;
    const weakTraps = allLisqueExercises.filter((_, i) => trapScores[i].score <= 1);
    lines.push(`  TRAP quality avg: ${avgTrap.toFixed(1)}/3`);
    lines.push(`  Weak TRAPs (score <=1): ${weakTraps.length}`);
    if (weakTraps.length > 0) {
      lines.push(`    IDs: ${weakTraps.slice(0, 10).map(e => e.id).join(', ')}${weakTraps.length > 10 ? '...' : ''}`);
    }
    lines.push('');

    // TIP quality
    const tipScores = allLisqueExercises.map(ex => scoreTip(ex.tip));
    const avgTip = tipScores.reduce((s, t) => s + t.score, 0) / tipScores.length;
    const weakTips = allLisqueExercises.filter((_, i) => tipScores[i].score <= 1);
    lines.push(`  TIP quality avg: ${avgTip.toFixed(1)}/3`);
    lines.push(`  Weak TIPs (score <=1): ${weakTips.length}`);
    if (weakTips.length > 0) {
      lines.push(`    IDs: ${weakTips.slice(0, 10).map(e => e.id).join(', ')}${weakTips.length > 10 ? '...' : ''}`);
    }
    lines.push('');

    // Answer validity
    const invalidAnswers = allLisqueExercises
      .map(ex => ({ id: ex.id, ...checkAnswerValidity(ex) }))
      .filter(r => !r.valid);
    lines.push(`  Invalid answers (not in options): ${invalidAnswers.length}`);
    if (invalidAnswers.length > 0) {
      for (const ia of invalidAnswers.slice(0, 10)) {
        lines.push(`    ${ia.id}: ${ia.issue}`);
      }
    }
    lines.push('');

    // Character coverage
    const withIntro = allLisqueExercises.filter(e => e.hasCharacterIntro).length;
    const withReaction = allLisqueExercises.filter(e => e.hasReaction).length;
    const introPct = Math.round(withIntro / allLisqueExercises.length * 100);
    const reactionPct = Math.round(withReaction / allLisqueExercises.length * 100);
    lines.push(`  Character intro coverage: ${introPct}% (${withIntro}/${allLisqueExercises.length}) ${introPct < 50 ? '<-- BELOW 50% TARGET' : ''}`);
    lines.push(`  Reaction coverage: ${reactionPct}% (${withReaction}/${allLisqueExercises.length}) ${reactionPct < 50 ? '<-- BELOW 50% TARGET' : ''}`);
    lines.push('');

    // Difficulty distribution per day
    lines.push('  Difficulty distribution per day:');
    for (const day of lisqueDays) {
      const dist = checkDifficultyDistribution(day.exercises);
      const flag = dist.issues.length > 0 ? ` <-- ${dist.issues.join(', ')}` : '';
      lines.push(`    Day ${String(day.day).padStart(2)}: B=${dist.counts.beginner} G=${dist.counts.growing} C=${dist.counts.challenge}${flag}`);
    }
    lines.push('');

    // Exercise type distribution per day
    lines.push('  Exercise type distribution per day:');
    for (const day of lisqueDays) {
      const dist = checkExerciseTypeDistribution(day.exercises);
      const typeStr = Object.entries(dist.types).map(([t, c]) => `${t}=${c}`).join(' ');
      const flag = dist.issues.length > 0 ? ` <-- ${dist.issues.join(', ')}` : '';
      lines.push(`    Day ${String(day.day).padStart(2)}: ${typeStr}${flag}`);
    }
    lines.push('');

    // Duplicate detection
    const dupes = checkDuplicates(allLisqueExercises);
    lines.push(`  Duplicate questions/audioText: ${dupes.length} pairs`);
    for (const d of dupes.slice(0, 10)) {
      lines.push(`    [${d.type}] "${d.text}" -> ${d.ids.join(', ')}`);
    }
    lines.push('');

    // Per-day scores
    const dayScores = lisqueDays.map(day => {
      const exScores = day.exercises.map(ex => scoreExercise(ex, false));
      const avg = exScores.reduce((s, e) => s + e.score, 0) / (exScores.length || 1);
      return { day: day.day, avg: Math.round(avg * 10) / 10, exercises: exScores };
    });

    dayScores.sort((a, b) => a.avg - b.avg);
    lines.push('  Day scores (weakest first):');
    for (const ds of dayScores) {
      const bar = '#'.repeat(Math.round(ds.avg));
      lines.push(`    Day ${String(ds.day).padStart(2)}: ${ds.avg.toFixed(1)}/10 ${bar}`);
    }
    lines.push('');

    // TOP 20 weakest exercises
    const allScored = allLisqueExercises.map(ex => ({
      id: ex.id,
      ...scoreExercise(ex, false),
    }));
    allScored.sort((a, b) => a.score - b.score);

    lines.push('  TOP 20 WEAKEST EXERCISES:');
    for (let i = 0; i < Math.min(20, allScored.length); i++) {
      const e = allScored[i];
      lines.push(`    ${i + 1}. ${e.id} (${e.score}/10) -- ${e.issues.join(', ')}`);
    }
    lines.push('');
  }

  // ──────── YomiQue ──────────────────────────────────────

  lines.push('-- YomiQue (Reading Quest) -------------------------------------');
  lines.push('');

  const yomique1 = readFileContent('src/data/english/yomique/days-01-15.ts');
  const yomique2 = readFileContent('src/data/english/yomique/days-16-30.ts');

  const yomiqueDays1 = yomique1 ? extractExercises(yomique1, 'YOMIQUE_DAYS_01_15') : [];
  const yomiqueDays2 = yomique2 ? extractExercises(yomique2, 'YOMIQUE_DAYS_16_30') : [];
  const yomiqueDays = [...yomiqueDays1, ...yomiqueDays2];

  const allYomiqueExercises = yomiqueDays.flatMap(d => d.exercises);

  if (allYomiqueExercises.length === 0) {
    lines.push('  WARNING: No YomiQue exercises found (files may be empty/placeholder)');
    lines.push('');
  } else {
    lines.push(`  Total days: ${yomiqueDays.length}`);
    lines.push(`  Total exercises: ${allYomiqueExercises.length}`);
    lines.push('');

    // Options check
    const missingOptions = allYomiqueExercises.filter(ex => !ex.hasOptions);
    lines.push(`  Missing options: ${missingOptions.length}`);
    if (missingOptions.length > 0) {
      lines.push(`    IDs: ${missingOptions.map(e => e.id).join(', ')}`);
    }

    const nonFourOptions = allYomiqueExercises.filter(ex => ex.hasOptions && ex.optionsCount !== 4);
    lines.push(`  Non-4 option count: ${nonFourOptions.length}`);
    if (nonFourOptions.length > 0) {
      for (const e of nonFourOptions.slice(0, 10)) {
        lines.push(`    ${e.id}: ${e.optionsCount} options`);
      }
    }
    lines.push('');

    // TRAP & TIP quality
    const trapScores = allYomiqueExercises.map(ex => scoreTrap(ex.trap));
    const avgTrap = trapScores.reduce((s, t) => s + t.score, 0) / trapScores.length;
    lines.push(`  TRAP quality avg: ${avgTrap.toFixed(1)}/3`);

    const tipScores = allYomiqueExercises.map(ex => scoreTip(ex.tip));
    const avgTip = tipScores.reduce((s, t) => s + t.score, 0) / tipScores.length;
    lines.push(`  TIP quality avg: ${avgTip.toFixed(1)}/3`);
    lines.push('');

    // Character coverage
    const withIntro = allYomiqueExercises.filter(e => e.hasCharacterIntro).length;
    const withReaction = allYomiqueExercises.filter(e => e.hasReaction).length;
    const introPct = Math.round(withIntro / allYomiqueExercises.length * 100);
    const reactionPct = Math.round(withReaction / allYomiqueExercises.length * 100);
    lines.push(`  Character intro coverage: ${introPct}% ${introPct < 50 ? '<-- BELOW 50% TARGET' : ''}`);
    lines.push(`  Reaction coverage: ${reactionPct}% ${reactionPct < 50 ? '<-- BELOW 50% TARGET' : ''}`);
    lines.push('');

    // Passage word count check
    const wcMismatches = allYomiqueExercises
      .map(ex => ({ id: ex.id, ...checkPassageWordCount(ex) }))
      .filter(r => r.declared !== undefined);
    lines.push(`  Passage wordCount mismatches: ${wcMismatches.length}`);
    for (const wc of wcMismatches.slice(0, 10)) {
      lines.push(`    ${wc.id}: declared=${wc.declared}, actual=${wc.actual}`);
    }
    lines.push('');

    // Duplicates
    const dupes = checkDuplicates(allYomiqueExercises);
    lines.push(`  Duplicate questions: ${dupes.length} pairs`);
    lines.push('');

    // TOP 20 weakest
    const allScored = allYomiqueExercises.map(ex => ({
      id: ex.id,
      ...scoreExercise(ex, true),
    }));
    allScored.sort((a, b) => a.score - b.score);
    lines.push('  TOP 20 WEAKEST EXERCISES:');
    for (let i = 0; i < Math.min(20, allScored.length); i++) {
      const e = allScored[i];
      lines.push(`    ${i + 1}. ${e.id} (${e.score}/10) -- ${e.issues.join(', ')}`);
    }
    lines.push('');
  }

  // ──────── 居酒屋TOEIC ──────────────────────────────────

  lines.push('-- Izakaya TOEIC -----------------------------------------------');
  lines.push('');

  // Episodes
  const episodes = parseEpisodes();
  const existingEps = episodes.filter(e => e.exists);
  const missingEps = episodes.filter(e => !e.exists);

  lines.push(`  Episodes: ${existingEps.length}/30 exist`);
  if (missingEps.length > 0) {
    lines.push(`  Missing episodes: ${missingEps.map(e => e.number).join(', ')}`);
  }
  lines.push('');

  lines.push('  Episode breakdown:');
  for (const ep of existingEps) {
    const flags = ep.issues.length > 0 ? ` <-- ${ep.issues.join(', ')}` : '';
    lines.push(`    Ep ${String(ep.number).padStart(2)}: ${ep.storyLines} story lines, ${ep.questions} questions${flags}`);
  }
  lines.push('');

  const epsWithIssues = existingEps.filter(e => e.issues.length > 0);
  lines.push(`  Episodes with issues: ${epsWithIssues.length}`);
  lines.push('');

  // Part 2 Drills
  const drills = parsePart2Drills();
  lines.push(`  Part 2 Drills: ${drills.total} total`);
  if (drills.total > 0) {
    lines.push(`    Missing tip: ${drills.missingTip}`);
    lines.push(`    Missing explanation: ${drills.missingExplanation}`);
    lines.push(`    Missing correct answer: ${drills.invalidCorrectIndex}`);
  }
  lines.push('');

  // ──────── Improvement Plan ─────────────────────────────

  lines.push('================================================================');
  lines.push('                      IMPROVEMENT PLAN');
  lines.push('================================================================');
  lines.push('');

  const priorities = [];
  let priority = 1;

  // LisQue priorities
  if (allLisqueExercises.length > 0) {
    const missingOpts = allLisqueExercises.filter(ex =>
      (ex.type === 'choice' || ex.type === 'scene') && !ex.hasOptions
    );
    if (missingOpts.length > 0) {
      priorities.push(`Priority ${priority++}: Add options to ${missingOpts.length} LisQue choice/scene exercises`);
    }

    const weakTraps = allLisqueExercises.filter((ex) => scoreTrap(ex.trap).score <= 1);
    if (weakTraps.length > 0) {
      priorities.push(`Priority ${priority++}: Rewrite ${weakTraps.length} weak LisQue TRAPs (add Japanese brain difference)`);
    }

    const weakTips = allLisqueExercises.filter((ex) => scoreTip(ex.tip).score <= 1);
    if (weakTips.length > 0) {
      priorities.push(`Priority ${priority++}: Rewrite ${weakTips.length} weak LisQue TIPs (add actionable advice)`);
    }

    const withIntro = allLisqueExercises.filter(e => e.hasCharacterIntro).length;
    const introNeeded = Math.ceil(allLisqueExercises.length * 0.5) - withIntro;
    if (introNeeded > 0) {
      priorities.push(`Priority ${priority++}: Add characterIntro to ${introNeeded} LisQue exercises (target 50%+)`);
    }

    const withReaction = allLisqueExercises.filter(e => e.hasReaction).length;
    const reactionNeeded = Math.ceil(allLisqueExercises.length * 0.5) - withReaction;
    if (reactionNeeded > 0) {
      priorities.push(`Priority ${priority++}: Add reaction to ${reactionNeeded} LisQue exercises (target 50%+)`);
    }
  }

  // YomiQue priorities
  if (allYomiqueExercises.length === 0) {
    priorities.push(`Priority ${priority++}: CREATE ALL YomiQue exercise data (currently placeholder/empty)`);
  }

  // Izakaya priorities
  if (missingEps.length > 0) {
    priorities.push(`Priority ${priority++}: Create ${missingEps.length} missing Izakaya TOEIC episodes`);
  }
  if (drills.missingTip > 0) {
    priorities.push(`Priority ${priority++}: Add tips to ${drills.missingTip} Part 2 drills`);
  }

  for (const p of priorities) {
    lines.push(`  ${p}`);
  }

  if (priorities.length === 0) {
    lines.push('  No critical improvements needed. Content quality is solid.');
  }

  lines.push('');
  lines.push('================================================================');
  lines.push('                         END OF AUDIT');
  lines.push('================================================================');

  const report = lines.join('\n');
  writeFileSync(REPORT_PATH, report, 'utf-8');
  console.log(report);
  console.log(`\nReport saved to: ${REPORT_PATH}`);

  // Also output machine-readable JSON for improve-content.mjs
  const auditData = {
    date: now,
    lisque: {
      totalDays: lisqueDays.length,
      totalExercises: allLisqueExercises.length,
      exercises: allLisqueExercises.map(ex => ({
        id: ex.id,
        day: ex.day,
        type: ex.type,
        ...scoreExercise(ex, false),
        hasOptions: ex.hasOptions,
        optionsCount: ex.optionsCount,
        hasCharacterIntro: ex.hasCharacterIntro,
        hasReaction: ex.hasReaction,
        trapScore: scoreTrap(ex.trap).score,
        tipScore: scoreTip(ex.tip).score,
        answerValid: checkAnswerValidity(ex).valid,
      })),
      duplicates: checkDuplicates(allLisqueExercises),
    },
    yomique: {
      totalDays: yomiqueDays.length,
      totalExercises: allYomiqueExercises.length,
      exercises: allYomiqueExercises.map(ex => ({
        id: ex.id,
        day: ex.day,
        type: ex.type,
        ...scoreExercise(ex, true),
        hasOptions: ex.hasOptions,
        optionsCount: ex.optionsCount,
        hasCharacterIntro: ex.hasCharacterIntro,
        hasReaction: ex.hasReaction,
        trapScore: scoreTrap(ex.trap).score,
        tipScore: scoreTip(ex.tip).score,
        answerValid: checkAnswerValidity(ex).valid,
      })),
    },
    izakaya: {
      episodes: episodes.map(e => ({ number: e.number, exists: e.exists, issues: e.issues })),
      part2Drills: {
        total: drills.total,
        missingTip: drills.missingTip,
        missingExplanation: drills.missingExplanation,
        invalidCorrectIndex: drills.invalidCorrectIndex,
      },
    },
    priorities,
  };

  const jsonPath = join(import.meta.dirname, 'audit-data.json');
  writeFileSync(jsonPath, JSON.stringify(auditData, null, 2), 'utf-8');
  console.log(`Audit data saved to: ${jsonPath}`);
}

runAudit();
