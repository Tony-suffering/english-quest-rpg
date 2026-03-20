#!/usr/bin/env node

// ─────────────────────────────────────────────────────────────
// TTS Audio Generator for Izakaya TOEIC Episodes
//
// Usage:
//   npx tsx scripts/generate-episode-audio.mjs --episode 1
//   npx tsx scripts/generate-episode-audio.mjs --episode 1 --include-story
//   npx tsx scripts/generate-episode-audio.mjs --episode 1 --dry-run
//
// Requires: OPENAI_API_KEY environment variable
// Cost: tts-1 = $0.015 per 1,000 characters
// ─────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load .env.local if OPENAI_API_KEY not already set
if (!process.env.OPENAI_API_KEY) {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

// ── Voice mapping per character ──
const VOICE_MAP = {
  master: 'onyx',
  yuki: 'nova',
  takeshi: 'echo',
  kenji: 'onyx',
  lisa: 'shimmer',
  mina: 'alloy',
  narration: 'alloy',
};

const SPEED_MAP = {
  kenji: 0.9, // slightly slower for Kenji
};

const DEFAULT_QUIZ_VOICE = 'alloy';
const COST_PER_1K_CHARS = 0.015;

// ── Parse CLI args ──
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { episode: null, includeStory: false, dryRun: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--episode' && args[i + 1]) {
      opts.episode = parseInt(args[i + 1], 10);
      i++;
    }
    if (args[i] === '--include-story') opts.includeStory = true;
    if (args[i] === '--dry-run') opts.dryRun = true;
  }

  if (!opts.episode || isNaN(opts.episode)) {
    console.error('Error: --episode N is required');
    console.error('Usage: npx tsx scripts/generate-episode-audio.mjs --episode 1 [--include-story] [--dry-run]');
    process.exit(1);
  }

  return opts;
}

// ── Conversation script parsing (matches theme.ts isConversation/parseConversation) ──
function isConversation(script) {
  if (!script) return false;
  return /^[MW]\d?:\s/.test(script) && script.includes('\n');
}

function parseConversation(script) {
  if (!script) return [];
  const lines = script.split('\n').filter(Boolean);
  return lines.map(line => {
    const match = line.match(/^([MW]\d?):\s*(.+)$/);
    if (match) {
      const speaker = match[1];
      const gender = speaker.startsWith('M') ? 'male' : 'female';
      return { speaker, text: match[2].trim(), gender };
    }
    return { speaker: 'narrator', text: line.trim(), gender: 'male' };
  });
}

// ── Load episode data via dynamic import (tsx handles TS) ──
async function loadEpisode(epNum) {
  const padded = String(epNum).padStart(3, '0');
  const epPath = path.join(PROJECT_ROOT, 'src', 'data', 'izakaya-toeic', 'episodes', `ep-${padded}.ts`);

  if (!fs.existsSync(epPath)) {
    console.error(`Episode file not found: ${epPath}`);
    process.exit(1);
  }

  // On Windows, absolute paths must be file:// URLs for ESM dynamic import
  const epUrl = new URL(`file:///${epPath.replace(/\\/g, '/')}`).href;
  const mod = await import(epUrl);
  return mod.default;
}

// ── Build generation tasks ──
function buildTasks(episode, includeStory) {
  const epId = episode.id;
  const tasks = [];

  // Quiz audio
  episode.questions.forEach((q, idx) => {
    if (!q.audioScript) return;

    if (isConversation(q.audioScript)) {
      // Conversation-style quiz: generate one combined file with all lines
      // We concatenate all text for a single TTS call with the default voice
      const lines = parseConversation(q.audioScript);
      const combinedText = lines.map(l => l.text).join('. ');
      tasks.push({
        type: 'quiz',
        filename: `q${idx + 1}.mp3`,
        text: combinedText,
        voice: DEFAULT_QUIZ_VOICE,
        speed: 1.0,
        label: `Q${idx + 1} (conversation)`,
      });
    } else {
      tasks.push({
        type: 'quiz',
        filename: `q${idx + 1}.mp3`,
        text: q.audioScript,
        voice: DEFAULT_QUIZ_VOICE,
        speed: 1.0,
        label: `Q${idx + 1}`,
      });
    }
  });

  // Story audio (optional)
  if (includeStory) {
    episode.story.forEach((line, idx) => {
      if (!line.english || line.english.trim() === '') return;
      const voice = VOICE_MAP[line.speaker] || DEFAULT_QUIZ_VOICE;
      const speed = SPEED_MAP[line.speaker] || 1.0;
      const padded = String(idx + 1).padStart(3, '0');
      tasks.push({
        type: 'story',
        filename: `story-${padded}.mp3`,
        text: line.english,
        voice,
        speed,
        label: `Story #${idx + 1} [${line.speaker}]`,
      });
    });
  }

  return tasks;
}

// ── Cost estimation ──
function estimateCost(tasks) {
  const totalChars = tasks.reduce((sum, t) => sum + t.text.length, 0);
  const cost = (totalChars / 1000) * COST_PER_1K_CHARS;
  return { totalChars, cost };
}

// ── Generate single audio file ──
async function generateAudio(openai, task, outputDir) {
  const outputPath = path.join(outputDir, task.filename);

  // Skip existing files
  if (fs.existsSync(outputPath)) {
    console.log(`  SKIP ${task.label} -> ${task.filename} (already exists)`);
    return { skipped: true };
  }

  console.log(`  GEN  ${task.label} -> ${task.filename} (${task.text.length} chars, voice: ${task.voice})`);

  const params = {
    model: 'tts-1',
    voice: task.voice,
    input: task.text,
    response_format: 'mp3',
  };
  if (task.speed !== 1.0) {
    params.speed = task.speed;
  }

  const response = await openai.audio.speech.create(params);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);

  return { skipped: false, chars: task.text.length };
}

// ── Main ──
async function main() {
  const opts = parseArgs();
  const padded = String(opts.episode).padStart(3, '0');
  const epId = `ep-${padded}`;

  console.log(`\nLoading episode ${opts.episode} (${epId})...`);
  const episode = await loadEpisode(opts.episode);
  console.log(`  Title: ${episode.title}`);
  console.log(`  Questions: ${episode.questions.length}`);
  console.log(`  Story lines: ${episode.story.length}`);

  const tasks = buildTasks(episode, opts.includeStory);
  const quizTasks = tasks.filter(t => t.type === 'quiz');
  const storyTasks = tasks.filter(t => t.type === 'story');

  console.log(`\nGeneration plan:`);
  console.log(`  Quiz audio:  ${quizTasks.length} files`);
  console.log(`  Story audio: ${storyTasks.length} files`);

  const { totalChars, cost } = estimateCost(tasks);
  console.log(`\nCost estimate:`);
  console.log(`  Total characters: ${totalChars.toLocaleString()}`);
  console.log(`  Estimated cost:   $${cost.toFixed(4)} (tts-1 @ $0.015/1K chars)`);

  if (opts.dryRun) {
    console.log(`\n[DRY RUN] No files generated.`);
    console.log(`\nTask breakdown:`);
    tasks.forEach(t => {
      console.log(`  ${t.label}: "${t.text.substring(0, 60)}${t.text.length > 60 ? '...' : ''}" (${t.text.length} chars, ${t.voice})`);
    });
    return;
  }

  // Check API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('\nError: OPENAI_API_KEY environment variable is not set.');
    console.error('Set it with: export OPENAI_API_KEY=sk-...');
    process.exit(1);
  }

  // Dynamic import of OpenAI (only when not dry-run)
  const { default: OpenAI } = await import('openai');
  const openai = new OpenAI();

  // Create output directory
  const outputDir = path.join(PROJECT_ROOT, 'public', 'audio', epId);
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`\nOutput directory: ${outputDir}`);
  console.log(`\nGenerating audio...\n`);

  let generated = 0;
  let skipped = 0;
  let totalGenChars = 0;

  for (const task of tasks) {
    const result = await generateAudio(openai, task, outputDir);
    if (result.skipped) {
      skipped++;
    } else {
      generated++;
      totalGenChars += result.chars;
    }
  }

  const actualCost = (totalGenChars / 1000) * COST_PER_1K_CHARS;
  console.log(`\nDone.`);
  console.log(`  Generated: ${generated} files`);
  console.log(`  Skipped:   ${skipped} files (already existed)`);
  console.log(`  Actual cost: $${actualCost.toFixed(4)}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
