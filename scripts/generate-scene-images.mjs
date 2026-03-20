// Scene Image Generator for Izakaya TOEIC
// Usage: node scripts/generate-scene-images.mjs --episode 1
// Requires: OPENAI_API_KEY environment variable
//
// Generates anime-style scene illustrations for episode story moments.
// Output: public/izakaya-scenes/ep-XXX/

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openai = new OpenAI();

// Art style prompt prefix for consistent look
const STYLE_PREFIX = 'Warm-toned anime illustration, izakaya interior lighting, soft amber glow, cozy atmosphere. Semi-realistic manga style with detailed backgrounds. No text or speech bubbles.';

// Scene definitions per episode
// Each scene maps to a story index where the image should appear
const EPISODE_SCENES = {
  1: [
    {
      filename: 'opening.webp',
      storyIndex: 0,
      prompt: 'A narrow rain-soaked Tokyo alley at night. A small traditional izakaya with a warm glowing noren curtain hanging in the doorway. Puddles reflect the golden light from inside. The sign is wooden and weathered.',
    },
    {
      filename: 'yuki-arrives.webp',
      storyIndex: 2,
      prompt: 'A young Japanese woman (28, professional attire slightly disheveled) sits alone at a wooden izakaya counter. She grips a beer glass with both hands, looking down. Behind the counter, an older man silently polishes a glass. The lighting is warm amber.',
    },
    {
      filename: 'takeshi-entrance.webp',
      storyIndex: 17,
      prompt: 'A soaking wet young Japanese man (35, casual clothes, big grin) bursts through an izakaya door curtain. Water droplets fly everywhere. Two people at the counter look startled. Dynamic action pose, comedic energy.',
    },
    {
      filename: 'kenji-arrives.webp',
      storyIndex: 30,
      prompt: 'A middle-aged Japanese man (45, construction company executive, tired face) quietly enters an izakaya. He sits at the far end of the counter, avoiding eye contact. The atmosphere is contemplative.',
    },
    {
      filename: 'three-laugh.webp',
      storyIndex: 41,
      prompt: 'Three people sitting at an izakaya counter laugh together -- a young woman, an enthusiastic young man, and a quiet middle-aged man. The bartender behind the counter has the faintest smile. Warm golden lighting, a moment of genuine connection.',
    },
    {
      filename: 'indirect-answer.webp',
      storyIndex: 43,
      prompt: 'A concept illustration split in two panels. Left panel: a direct arrow from question to answer (labeled DIRECT). Right panel: a curved, natural-flowing path from question to response (labeled INDIRECT). Izakaya aesthetic with wood textures and warm tones. Minimal, clean diagram style.',
    },
  ],
};

async function generateImage(prompt, outputPath) {
  console.log(`Generating: ${outputPath}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${STYLE_PREFIX} ${prompt}`,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      response_format: 'b64_json',
    });

    const imageData = response.data[0].b64_json;
    const buffer = Buffer.from(imageData, 'base64');

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved: ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.error(`Failed: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const epFlag = args.indexOf('--episode');

  if (epFlag === -1 || !args[epFlag + 1]) {
    console.log('Usage: node scripts/generate-scene-images.mjs --episode <number>');
    console.log('       node scripts/generate-scene-images.mjs --episode all');
    console.log('');
    console.log('Available episodes:', Object.keys(EPISODE_SCENES).join(', '));
    process.exit(1);
  }

  const epArg = args[epFlag + 1];
  const episodes = epArg === 'all'
    ? Object.keys(EPISODE_SCENES).map(Number)
    : [parseInt(epArg)];

  const outputBase = path.join(__dirname, '..', 'public', 'izakaya-scenes');

  for (const epNum of episodes) {
    const scenes = EPISODE_SCENES[epNum];
    if (!scenes) {
      console.log(`No scenes defined for episode ${epNum}. Skipping.`);
      continue;
    }

    const epDir = path.join(outputBase, `ep-${String(epNum).padStart(3, '0')}`);
    console.log(`\n--- Episode ${epNum} (${scenes.length} scenes) ---`);

    for (const scene of scenes) {
      const outputPath = path.join(epDir, scene.filename);

      if (fs.existsSync(outputPath)) {
        console.log(`Skipping (exists): ${scene.filename}`);
        continue;
      }

      await generateImage(scene.prompt, outputPath);

      // Rate limit: wait 1 second between generations
      await new Promise(r => setTimeout(r, 1000));
    }

    // Output the storyIndex mapping for copy-paste into episode data
    console.log(`\nStory index mapping for ep-${String(epNum).padStart(3, '0')}:`);
    for (const scene of scenes) {
      console.log(`  story[${scene.storyIndex}].sceneImage = 'ep-${String(epNum).padStart(3, '0')}/${scene.filename}'`);
    }
  }

  console.log('\nDone. Add sceneImage fields to episode data files to activate.');
}

main();
