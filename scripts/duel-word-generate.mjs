#!/usr/bin/env node
// カード対戦の「単語パック」(1枚が1語。売り物の方の中身)の絵と声を作る。
// 中身は src/data/english/duel-words-<pack>.json。英文・訳・場面・声の演出は人が書いてあり、ここは絵と声にするだけ。
//
//   node scripts/duel-word-generate.mjs --pack toeic --dry     何枚作るかと目安の金額
//   node scripts/duel-word-generate.mjs --pack toeic           絵と声を作る(有るものは飛ばす)
//   node scripts/duel-word-generate.mjs --pack toeic --redo tw003,tw010   作り直す
//   オプション: --out <public/duel の場所。既定はこのリポ> --quality low|medium --parallel 4 --no-voice --no-art
//
// 絵は public/duel/art/card-<id>.webp、声は public/duel/voice/<id>.mp3。どちらも manifest.json を実際のファイルから書き直す。
// 鍵は .env.local の OPENAI_API_KEY。お金がかかる(絵 gpt-image-2.6 の low で1枚 約$0.046 が目安。声の単価は測っていない)。

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
const has = name => process.argv.includes(name);
const PACK = arg('--pack') || 'toeic';
const QUALITY = arg('--quality') || 'low';
const PARALLEL = Math.max(1, Math.min(Number(arg('--parallel')) || 4, 8));
const OUT = path.resolve(arg('--out') || path.join(ROOT, 'public/duel'));
const ART = path.join(OUT, 'art'), VOICE = path.join(OUT, 'voice');
fs.mkdirSync(ART, { recursive: true });
fs.mkdirSync(VOICE, { recursive: true });

const pack = JSON.parse(fs.readFileSync(path.join(ROOT, `src/data/english/duel-words-${PACK}.json`), 'utf8'));
const STYLES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/english/duel-styles.json'), 'utf8'));
const ACCENT = { verb: 'crimson and orange fire accents', noun: 'amber stone and warm earth', adjective: 'emerald wind and feathers', adverb: 'golden lightning', phrase: 'blue water accents' };

for (const id of (arg('--redo') || '').split(',').filter(Boolean)) {
    fs.rmSync(path.join(ART, `card-${id}.webp`), { force: true });
    fs.rmSync(path.join(VOICE, `${id}.mp3`), { force: true });
}

const artJobs = has('--no-art') ? [] : pack.cards.filter(c => !fs.existsSync(path.join(ART, `card-${c.id}.webp`)));
const voiceJobs = has('--no-voice') ? [] : pack.cards.filter(c => !fs.existsSync(path.join(VOICE, `${c.id}.mp3`)));
const price = { low: 0.046, medium: 0.18, high: 0.7 }[QUALITY] || 0.046;
console.log(`パック ${pack.id}: ${pack.cards.length} 語。絵 ${artJobs.length} 枚(目安 $${(artJobs.length * price).toFixed(2)})、声 ${voiceJobs.length} 本。出力先 ${OUT}`);
if (has('--dry')) process.exit(0);
if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY が無い(.env.local)'); process.exit(1); }

async function art(c) {
    const style = STYLES.find(s => s.name === c.style);
    if (!style) throw new Error(`画風が無い: ${c.style}`);
    const prompt = `Trading card illustration. Art style: ${style.prompt}. Vertical. Scene: ${c.scene} The main subject is large and in the upper two thirds; the bottom third is calmer. A hint of this color: ${ACCENT[c.pos] || ACCENT.noun}. No text, no letters, no numbers, no speech bubbles, no card frame, no watermark.`;
    const r = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: arg('--model') || 'gpt-image-2.6-sunburst', prompt, size: '1024x1536', quality: QUALITY, n: 1 }),
    });
    const j = await r.json();
    const b64 = j.data?.[0]?.b64_json;
    if (!b64) throw new Error(JSON.stringify(j).slice(0, 300));
    await sharp(Buffer.from(b64, 'base64')).resize({ width: 768, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(ART, `card-${c.id}.webp`));
}
async function voice(c) {
    const r = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice: c.voice.voice, input: c.line, instructions: `Speaker: ${c.voice.who}. ${c.voice.direction} Every word must be clearly heard by an English learner.`, response_format: 'mp3' }),
    });
    if (!r.ok) throw new Error((await r.text()).slice(0, 300));
    fs.writeFileSync(path.join(VOICE, `${c.id}.mp3`), Buffer.from(await r.arrayBuffer()));
}
async function run(label, list, fn) {
    let ok = 0, ng = 0, i = 0;
    await Promise.all(Array.from({ length: PARALLEL }, async () => {
        while (i < list.length) {
            const c = list[i++];
            try { await fn(c); ok++; console.log(`OK  ${label} ${c.id} ${c.word}`); }
            catch (e) { ng++; console.log(`NG  ${label} ${c.id} ${c.word}: ${e.message}`); }
        }
    }));
    return { ok, ng };
}
const a = await run('絵', artJobs, art);
const v = await run('声', voiceJobs, voice);
fs.writeFileSync(path.join(ART, 'manifest.json'), JSON.stringify({ keys: fs.readdirSync(ART).filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)).sort(), v: Date.now() }));
fs.writeFileSync(path.join(VOICE, 'manifest.json'), JSON.stringify({ ids: fs.readdirSync(VOICE).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)).sort(), v: Date.now() }) + '\n');
console.log(`絵 ${a.ok} 枚(失敗 ${a.ng})、声 ${v.ok} 本(失敗 ${v.ng})。目安 $${(a.ok * price).toFixed(2)}(絵のぶんだけ)`);
