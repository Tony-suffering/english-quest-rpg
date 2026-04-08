#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════
// Content Improvement Generator
// Reads audit-data.json and generates structured fixes
// Output: content-fixes.json with actionable fix instructions
// ═══════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const SCRIPTS_DIR = import.meta.dirname;
const ROOT = resolve(SCRIPTS_DIR, '..');
const AUDIT_DATA_PATH = join(SCRIPTS_DIR, 'audit-data.json');
const FIXES_PATH = join(SCRIPTS_DIR, 'content-fixes.json');

// ─── Load Audit Data ─────────────────────────────────────

if (!existsSync(AUDIT_DATA_PATH)) {
  console.error('ERROR: audit-data.json not found. Run audit-content.mjs first.');
  console.error(`Expected at: ${AUDIT_DATA_PATH}`);
  process.exit(1);
}

const audit = JSON.parse(readFileSync(AUDIT_DATA_PATH, 'utf-8'));

// ─── Fix Generators ──────────────────────────────────────

const fixes = {
  generated: new Date().toISOString(),
  summary: {
    totalFixes: 0,
    byCategory: {},
    byApp: { lisque: 0, yomique: 0, izakaya: 0 },
  },
  fixes: [],
};

function addFix(fix) {
  fixes.fixes.push(fix);
  fixes.summary.totalFixes++;
  fixes.summary.byCategory[fix.category] = (fixes.summary.byCategory[fix.category] || 0) + 1;
  fixes.summary.byApp[fix.app] = (fixes.summary.byApp[fix.app] || 0) + 1;
}

// ─── LisQue Fixes ────────────────────────────────────────

function generateLisqueFixes() {
  if (!audit.lisque || audit.lisque.totalExercises === 0) {
    addFix({
      app: 'lisque',
      category: 'data-missing',
      priority: 'critical',
      exerciseId: null,
      file: 'src/data/english/lisque/days-01-15.ts',
      description: 'LisQue data appears empty or unparseable. Verify data files contain exercise arrays.',
      action: 'verify',
      details: {},
    });
    return;
  }

  for (const ex of audit.lisque.exercises) {
    const dayFile = ex.day <= 15
      ? 'src/data/english/lisque/days-01-15.ts'
      : 'src/data/english/lisque/days-16-30.ts';

    // Fix: Missing options on choice/scene exercises
    if (!ex.hasOptions && (ex.type === 'choice' || ex.type === 'scene')) {
      addFix({
        app: 'lisque',
        category: 'missing-options',
        priority: 'high',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} is type "${ex.type}" but has no options array.`,
        action: 'add-options',
        details: {
          instruction: 'Add an options array with 4 plausible choices. The answer must appear in options. Distractors should be plausible minimal pair or similar-sounding alternatives.',
          template: "options: ['correct_answer', 'distractor_1', 'distractor_2', 'distractor_3'],",
        },
      });
    }

    // Fix: Weak TRAP
    if (ex.trapScore <= 1) {
      addFix({
        app: 'lisque',
        category: 'weak-trap',
        priority: 'medium',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has a weak TRAP (score ${ex.trapScore}/3).`,
        action: 'rewrite-trap',
        details: {
          currentIssues: ex.issues.filter(i => i.includes('trap')),
          instruction: 'Rewrite trap to: (1) be 30+ chars, (2) explain WHY Japanese learners specifically miss this (mention Japanese sound system, katakana interference, or brain processing difference), (3) give a specific linguistic insight, not generic advice.',
          goodExample: "日本語の「イ」は1種類しかない。英語のbit(/i/)は口をあまり開けない短い音、beat(/i:/)は口を横に引っ張る長い音。日本語耳だと両方「ビート」に聞こえる。",
          badExample: 'この問題は難しいので注意しましょう。',
        },
      });
    }

    // Fix: Weak TIP
    if (ex.tipScore <= 1) {
      addFix({
        app: 'lisque',
        category: 'weak-tip',
        priority: 'medium',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has a weak TIP (score ${ex.tipScore}/3).`,
        action: 'rewrite-tip',
        details: {
          currentIssues: ex.issues.filter(i => i.includes('tip')),
          instruction: 'Rewrite tip to: (1) be 30+ chars, (2) give a concrete, actionable technique the learner can apply RIGHT NOW, (3) focus on what to listen for or how to train the ear.',
          goodExample: '口の力の入り方に注目。bitは脱力した「イ」、beatは頬が引っ張られる「イー」。力が入ってなかったらbit。',
          badExample: '練習しましょう。',
        },
      });
    }

    // Fix: Invalid answer
    if (!ex.answerValid) {
      addFix({
        app: 'lisque',
        category: 'invalid-answer',
        priority: 'critical',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} answer is not found in its options array.`,
        action: 'fix-answer',
        details: {
          instruction: 'Either add the correct answer to the options array, or update the answer field to match one of the existing options.',
        },
      });
    }

    // Fix: Missing characterIntro
    if (!ex.hasCharacterIntro) {
      addFix({
        app: 'lisque',
        category: 'missing-character-intro',
        priority: 'low',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has no characterIntro.`,
        action: 'add-character-intro',
        details: {
          instruction: 'Add a characterIntro with a speaker from LISQUE_CHARACTERS (master, yuki, takeshi, lisa, kenji, mina). The intro should be a short Japanese line that introduces the exercise in character.',
          template: "characterIntro: { speaker: 'master', text: '次はこの音の違いを聞き分けてみろ。', mood: 'normal' },",
          speakers: ['master', 'yuki', 'takeshi', 'lisa', 'kenji', 'mina'],
          speakerRoles: {
            master: 'explains WHY (teacher)',
            mina: 'gives ear-training tips (listening genius)',
            lisa: 'provides native pronunciation examples',
            takeshi: 'struggles alongside the user (relatable)',
            yuki: 'learning partner',
            kenji: 'asks beginner questions',
          },
        },
      });
    }

    // Fix: Missing reaction
    if (!ex.hasReaction) {
      addFix({
        app: 'lisque',
        category: 'missing-reaction',
        priority: 'low',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has no reaction.`,
        action: 'add-reaction',
        details: {
          instruction: 'Add a reaction with correct/wrong responses from a character. Correct should be encouraging, wrong should be helpful (not discouraging).',
          template: "reaction: { correct: 'いいね、聞き分けられてる！', wrong: 'この2つの違い、もう一回聞いてみよう。', speaker: 'mina' },",
        },
      });
    }
  }

  // Fix: Duplicate questions
  if (audit.lisque.duplicates && audit.lisque.duplicates.length > 0) {
    for (const dupe of audit.lisque.duplicates) {
      addFix({
        app: 'lisque',
        category: 'duplicate',
        priority: 'medium',
        exerciseId: dupe.ids.join(', '),
        file: 'src/data/english/lisque/',
        description: `Duplicate ${dupe.type}: "${dupe.text}" found in exercises ${dupe.ids.join(', ')}`,
        action: 'deduplicate',
        details: {
          type: dupe.type,
          duplicateIds: dupe.ids,
          instruction: 'Either differentiate the exercises (change question/audioText) or remove one of the duplicates.',
        },
      });
    }
  }
}

// ─── YomiQue Fixes ───────────────────────────────────────

function generateYomiqueFixes() {
  if (!audit.yomique || audit.yomique.totalExercises === 0) {
    addFix({
      app: 'yomique',
      category: 'data-missing',
      priority: 'critical',
      exerciseId: null,
      file: 'src/data/english/yomique/days-01-15.ts',
      description: 'YomiQue data files are empty placeholders. ALL exercise data needs to be created.',
      action: 'create-all',
      details: {
        instruction: 'Generate 30 days of YomiQue exercises (10 per day). Each exercise needs: id, type (scan/main_idea/vocabulary/order/inference/truefalse), passage (text + sourceType + wordCount), question, options (4), answer, jaTranslation, trap, tip, difficulty.',
        files: [
          'src/data/english/yomique/days-01-15.ts',
          'src/data/english/yomique/days-16-30.ts',
        ],
        exercisesPerDay: 10,
        totalDays: 30,
        types: ['scan', 'main_idea', 'vocabulary', 'order', 'inference', 'truefalse'],
        difficultyLevels: ['beginner', 'growing', 'challenge'],
        passageSourceTypes: ['Email', 'Contract', 'Sign', 'Menu', 'Advertisement', 'Notice', 'Article', 'Report', 'Letter', 'Form'],
      },
    });
    return;
  }

  // Same checks as LisQue but for YomiQue exercises
  for (const ex of audit.yomique.exercises) {
    const dayFile = ex.day <= 15
      ? 'src/data/english/yomique/days-01-15.ts'
      : 'src/data/english/yomique/days-16-30.ts';

    if (!ex.hasOptions) {
      addFix({
        app: 'yomique',
        category: 'missing-options',
        priority: 'high',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has no options array. YomiQue exercises MUST have exactly 4 options.`,
        action: 'add-options',
        details: {
          instruction: 'Add 4 plausible reading comprehension options. Distractors should be based on common misreadings or partial understanding.',
        },
      });
    } else if (ex.optionsCount !== 4) {
      addFix({
        app: 'yomique',
        category: 'wrong-option-count',
        priority: 'medium',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has ${ex.optionsCount} options (expected 4).`,
        action: 'fix-options',
        details: {
          instruction: `Adjust to exactly 4 options. Currently has ${ex.optionsCount}.`,
        },
      });
    }

    if (ex.trapScore <= 1) {
      addFix({
        app: 'yomique',
        category: 'weak-trap',
        priority: 'medium',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has a weak TRAP (score ${ex.trapScore}/3).`,
        action: 'rewrite-trap',
        details: {
          instruction: 'Rewrite trap to explain WHY Japanese readers misunderstand this. Mention Japanese reading habits, kanji-based guessing, or structural differences between Japanese and English text.',
        },
      });
    }

    if (ex.tipScore <= 1) {
      addFix({
        app: 'yomique',
        category: 'weak-tip',
        priority: 'medium',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has a weak TIP (score ${ex.tipScore}/3).`,
        action: 'rewrite-tip',
        details: {
          instruction: 'Rewrite tip with a concrete reading strategy: scanning technique, keyword spotting, structure recognition, or context-clue method.',
        },
      });
    }

    if (!ex.hasCharacterIntro) {
      addFix({
        app: 'yomique',
        category: 'missing-character-intro',
        priority: 'low',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has no characterIntro.`,
        action: 'add-character-intro',
        details: {
          instruction: 'Add characterIntro from YOMIQUE_CHARACTERS (kenji, master, yuki, lisa, takeshi, mina).',
          speakerRoles: {
            kenji: 'main character, construction company director struggling with English docs',
            master: 'explains reading techniques',
            yuki: 'reading specialist, Part 5/7 expert',
            lisa: 'native perspective on natural English text',
            takeshi: 'IT email reading specialist',
            mina: 'reading-challenged ally, learning together',
          },
        },
      });
    }

    if (!ex.hasReaction) {
      addFix({
        app: 'yomique',
        category: 'missing-reaction',
        priority: 'low',
        exerciseId: ex.id,
        file: dayFile,
        description: `Exercise ${ex.id} has no reaction.`,
        action: 'add-reaction',
        details: {
          instruction: 'Add correct/wrong reaction from a character.',
        },
      });
    }
  }
}

// ─── Izakaya TOEIC Fixes ─────────────────────────────────

function generateIzakayaFixes() {
  // Missing episodes
  for (const ep of audit.izakaya.episodes) {
    if (!ep.exists) {
      addFix({
        app: 'izakaya',
        category: 'missing-episode',
        priority: 'critical',
        exerciseId: `ep-${String(ep.number).padStart(3, '0')}`,
        file: `src/data/izakaya-toeic/episodes/ep-${String(ep.number).padStart(3, '0')}.ts`,
        description: `Episode ${ep.number} file is missing.`,
        action: 'create-episode',
        details: {
          instruction: 'Create full episode with story (StoryLine[]), questions (ToeicQuestion[]), masterTip, and vocabHighlights.',
        },
      });
    } else if (ep.issues.length > 0) {
      addFix({
        app: 'izakaya',
        category: 'episode-issues',
        priority: 'medium',
        exerciseId: `ep-${String(ep.number).padStart(3, '0')}`,
        file: `src/data/izakaya-toeic/episodes/ep-${String(ep.number).padStart(3, '0')}.ts`,
        description: `Episode ${ep.number} has issues: ${ep.issues.join(', ')}`,
        action: 'fix-episode',
        details: {
          issues: ep.issues,
          instruction: 'Fix the listed issues in the episode data.',
        },
      });
    }
  }

  // Part 2 drill issues
  const drills = audit.izakaya.part2Drills;
  if (drills.missingTip > 0) {
    addFix({
      app: 'izakaya',
      category: 'missing-tips',
      priority: 'medium',
      exerciseId: null,
      file: 'src/data/izakaya-toeic/part2-drills.ts',
      description: `${drills.missingTip} Part 2 drills are missing tip field.`,
      action: 'add-tips',
      details: {
        count: drills.missingTip,
        instruction: 'Add a tip field to each drill that gives a quick strategy for the question type (e.g., "Whoには人名・部署で答える").',
      },
    });
  }

  if (drills.invalidCorrectIndex > 0) {
    addFix({
      app: 'izakaya',
      category: 'invalid-correct',
      priority: 'critical',
      exerciseId: null,
      file: 'src/data/izakaya-toeic/part2-drills.ts',
      description: `${drills.invalidCorrectIndex} Part 2 drills have no choice marked isCorrect: true.`,
      action: 'fix-correct-answer',
      details: {
        count: drills.invalidCorrectIndex,
        instruction: 'Ensure exactly one choice per drill has isCorrect: true.',
      },
    });
  }
}

// ─── Run ─────────────────────────────────────────────────

generateLisqueFixes();
generateYomiqueFixes();
generateIzakayaFixes();

// Sort fixes by priority
const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
fixes.fixes.sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));

writeFileSync(FIXES_PATH, JSON.stringify(fixes, null, 2), 'utf-8');

// Print summary
console.log('');
console.log('================================================================');
console.log('              CONTENT FIX INSTRUCTIONS GENERATED');
console.log('================================================================');
console.log('');
console.log(`Total fixes: ${fixes.summary.totalFixes}`);
console.log('');
console.log('By category:');
for (const [cat, count] of Object.entries(fixes.summary.byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}
console.log('');
console.log('By app:');
for (const [app, count] of Object.entries(fixes.summary.byApp)) {
  if (count > 0) console.log(`  ${app}: ${count}`);
}
console.log('');
console.log('By priority:');
const byCritical = fixes.fixes.filter(f => f.priority === 'critical').length;
const byHigh = fixes.fixes.filter(f => f.priority === 'high').length;
const byMedium = fixes.fixes.filter(f => f.priority === 'medium').length;
const byLow = fixes.fixes.filter(f => f.priority === 'low').length;
if (byCritical) console.log(`  CRITICAL: ${byCritical}`);
if (byHigh) console.log(`  HIGH: ${byHigh}`);
if (byMedium) console.log(`  MEDIUM: ${byMedium}`);
if (byLow) console.log(`  LOW: ${byLow}`);
console.log('');
console.log(`Fixes saved to: ${FIXES_PATH}`);
console.log('');
console.log('Next steps:');
console.log('  1. Review content-fixes.json for specific fix instructions');
console.log('  2. Apply critical fixes first (invalid answers, missing data)');
console.log('  3. Run "claude" to apply fixes with AI assistance');
console.log('  4. Re-run audit-content.mjs to verify improvements');
