#!/usr/bin/env node
// WORD DUEL の幕開け(初めて開いたときの映像)に使う、専用の絵と語りの声を作る。
// 本人(2026-11-28)「導入部分が雑すぎる。ただ使い回してるでしょ。ストーリーで引き付ける、演出で引き付ける。AIが書いたつまらないストーリー、演出ならいりません」。
// 絵は盤面の使い回しをやめて、場面ごとに描く。語りは日本語(読みをまちがえやすい語は、かなで渡す)。
//   node scripts/duel-opening-generate.mjs            無いものだけ作る
//   node scripts/duel-opening-generate.mjs --redo king,n4   作り直す
// 出力: public/duel/opening/<key>.webp と <key>.mp3。鍵は .env.local の OPENAI_API_KEY。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const l of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)) {
    const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
}
const arg = name => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined; };
const OUT = path.join(ROOT, 'public/duel/opening');
fs.mkdirSync(OUT, { recursive: true });
for (const k of (arg('--redo') || '').split(',').filter(Boolean)) { fs.rmSync(path.join(OUT, `${k}.webp`), { force: true }); fs.rmSync(path.join(OUT, `${k}.mp3`), { force: true }); }

const LOOK = 'Cinematic anime key visual for a dark fantasy game opening, painterly, film-like lighting, strong depth, atmospheric haze, subtle film grain. Wide 3:2 composition with the main subject near the center so the edges can be cropped. No text, no letters, no logos, no captions, no watermark.';
const ART = {
    meeting: `A modern office meeting room at night seen from behind and slightly above a young office worker who sits frozen at a long table. Around the table, colleagues are dark blurred silhouettes all turned toward the worker, waiting. Cold blue-grey fluorescent light. One tiny warm golden mote of light hangs just in front of the worker's lips, the only warm color in the picture. Heavy, quiet tension. ${LOOK}`,
    fall: `Looking straight down a vast dark vertical shaft. At the very top, tiny and far away, a lit office floor like a small window. Dozens of small glowing golden motes of light fall away from it into endless indigo darkness, leaving long thin trails like falling embers, growing dimmer as they sink. Lonely, silent, beautiful. ${LOOK}`,
    tower: `An impossibly tall tower built from millions of stacked stone tablets and playing-card-shaped slabs, rising out of a sea of fog inside an immense underground abyss. Countless golden motes of light drift down onto it like slow snow. A tiny human figure stands at its base for scale. Pale shafts of light from far above. Awe and dread at the scale. Deep indigo and teal with gold. ${LOOK}`,
    king: `At the summit of a tower of stone tablets sits an enormous faceless king on a throne. His robe is woven from thousands of torn blank pages, his crown is made of black quill feathers, and inside his hood there is only darkness. He raises one long pale finger to where his lips would be, in a gesture of silence, while streams of golden motes of light spiral into the darkness of his hood and vanish. Ominous, still, majestic. Black and deep violet with thin gold. ${LOOK}`,
    hero: `A young man with dark tousled hair and green eyes, wearing a green and gold traveler's cloak, stands at the foot of a colossal tower of stone tablets in front of a huge sealed gate. Seen from a low angle behind his shoulder, he holds up a single glowing golden card in one hand and looks up at the tower with quiet determination. The first light of dawn breaks through the fog behind the tower. Warm gold against cold blue. Hopeful. ${LOOK}`,
};
// 語り。読みをまちがえやすい語は、かなで渡す。
const NARR = {
    n1: 'あの会議で、あなたは、ひとことも言えなかった。……言いたいことは、あった。……言葉が、出てこなかった。',
    n2: '言えなかった言葉は、消えない。……落ちていく。',
    n3: '世界じゅうの、言えなかった言葉が、積もる場所がある。……せんごの、とう。',
    n4: 'とうのあるじは、ちんもくのおう。……ひとがだまるたびに、ふとっていく。',
    n4b: 'いまも、あなたの言葉を、たべている。',
    n5: 'とりかえしに行く。……いちごずつ。',
    n6: 'これが、さいしょの、いちまい。',
};
const VOICE = 'Japanese narration for the opening of a dark fantasy game. A low, calm adult voice, close to the microphone, slow, with real pauses at each ellipsis. Not theatrical, not a trailer voice. Like someone quietly telling you the truth about yourself.';
const WHISPER = 'Japanese. Almost a whisper, very close, slow and cold, as if said right behind the listener.';

async function art(key) {
    const r = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: arg('--model') || 'gpt-image-2.6-sunburst', prompt: ART[key], size: '1536x1024', quality: arg('--quality') || 'high', n: 1 }),
    });
    const j = await r.json();
    const b64 = j.data?.[0]?.b64_json;
    if (!b64) throw new Error(JSON.stringify(j).slice(0, 300));
    await sharp(Buffer.from(b64, 'base64')).webp({ quality: 88 }).toFile(path.join(OUT, `${key}.webp`));
}
async function narr(key) {
    const r = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice: 'onyx', input: NARR[key], instructions: key === 'n4b' ? WHISPER : VOICE, response_format: 'mp3' }),
    });
    if (!r.ok) throw new Error((await r.text()).slice(0, 300));
    fs.writeFileSync(path.join(OUT, `${key}.mp3`), Buffer.from(await r.arrayBuffer()));
}
const jobs = [
    ...Object.keys(ART).filter(k => !fs.existsSync(path.join(OUT, `${k}.webp`))).map(k => [k, art]),
    ...Object.keys(NARR).filter(k => !fs.existsSync(path.join(OUT, `${k}.mp3`))).map(k => [k, narr]),
];
console.log(`作る: ${jobs.map(j => j[0]).join(' ') || '(無し)'}`);
await Promise.all(jobs.map(async ([k, fn]) => { try { await fn(k); console.log('OK ', k); } catch (e) { console.log('NG ', k, e.message); } }));
