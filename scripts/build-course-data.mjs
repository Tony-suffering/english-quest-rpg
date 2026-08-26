#!/usr/bin/env node
/**
 * 100日課程のデータを作る。
 *
 * 元データは iwasaki-naisou-website 側で作った実測コーパスの成果物:
 *   public/data/chunk-ranking.json   3億3,374万語から抽出した37万9,475表現の順位表
 *   public/data/chunk-clips.json     その表現が実際に話されている場面(689動画)
 *   src/data/english/chunk-gloss.ts  日本語訳ととにお注
 *
 * ここでやること:
 *   1. 固有名(group===2)を落とす
 *   2. 日本語訳があるものだけ残す。訳が無いカードを並べたら課程にならない
 *   3. 出会う回数の多い順に上位1,000個 = 1日10個 × 100日
 *   4. その1,000個ぶんのクリップだけ抜く
 *
 * 21MBの順位表をそのまま商品ページに読ませない。課程が要るのは1,000行だけ。
 *
 * 使い方:
 *   node scripts/build-course-data.mjs "C:/path/to/iwasaki-naisou-website"
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = process.argv[2];
if (!SRC) {
    console.error('元リポのパスを渡してください: node scripts/build-course-data.mjs <iwasaki-naisou-website>');
    process.exit(1);
}

// リポのパスに日本語が入ると import.meta.url が%エンコードされる。fileURLToPath を通す
const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_DIR = path.join(ROOT, 'public', 'data');
const DAYS = 100;
const PER_DAY = 10;
const NEED = DAYS * PER_DAY;

/** ChunkRow の列。元の chunk-ranking.ts と同じ並び */
const C = { text: 0, kind: 1, group: 2, reg: 3, life: 4, hits: 5, pmi: 6, tier: 7 };

function readJson(p) {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/** chunk-gloss.ts から { 表現: {ja, note} } を取り出す。TSを実行せず正規表現で読む */
function readGloss(p) {
    const src = fs.readFileSync(p, 'utf8');
    const out = {};
    // "expression": { ja: '...', note: '...' } の形を拾う
    const re = /["']([^"'\n]+)["']\s*:\s*\{([^}]*)\}/g;
    let m;
    while ((m = re.exec(src))) {
        const key = m[1];
        const body = m[2];
        const ja = /\bja\s*:\s*(["'])((?:\\.|(?!\1).)*)\1/.exec(body);
        const note = /\bnote\s*:\s*(["'])((?:\\.|(?!\1).)*)\1/.exec(body);
        if (ja) out[key.toLowerCase()] = { ja: unescapeLit(ja[2]), note: note ? unescapeLit(note[2]) : '' };
    }
    return out;
}

function unescapeLit(s) {
    return s.replace(/\\(['"\\])/g, '$1').replace(/\\n/g, '\n');
}

function main() {
    const ranking = readJson(path.join(SRC, 'public', 'data', 'chunk-ranking.json'));
    const clips = readJson(path.join(SRC, 'public', 'data', 'chunk-clips.json'));
    const gloss = readGloss(path.join(SRC, 'src', 'data', 'english', 'chunk-gloss.ts'));

    // 全体の重み。カバー率はこれを分母にする
    const weight = (r) => r[C.life] * r[C.text].split(' ').length;
    const grand = ranking.reduce((a, r) => a + weight(r), 0) || 1;

    const pool = ranking.filter((r) => r[C.group] !== 2 && gloss[r[C.text].toLowerCase()]);
    const picked = pool.slice(0, NEED);

    if (picked.length < NEED) {
        console.error(`訳のある表現が ${picked.length} 個しかありません。${NEED} 個必要です。`);
        process.exit(1);
    }

    // 各日の終わりでのカバー率を先に計算しておく。画面で毎回足し直さないため
    const cume = [];
    let acc = 0;
    picked.forEach((r, i) => {
        acc += weight(r);
        if ((i + 1) % PER_DAY === 0) cume.push(Number(((acc / grand) * 100).toFixed(2)));
    });

    const cards = picked.map((r) => {
        const g = gloss[r[C.text].toLowerCase()];
        return {
            en: r[C.text],
            ja: g.ja,
            note: g.note || '',
            kind: r[C.kind],
            tier: r[C.tier],
            hits: r[C.hits],
        };
    });

    const outClips = {};
    let clipCount = 0;
    for (const c of cards) {
        const v = clips[c.en];
        if (v && v.length) {
            outClips[c.en] = v.slice(0, 3);
            clipCount += outClips[c.en].length;
        }
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });
    const course = {
        days: DAYS,
        perDay: PER_DAY,
        corpusWords: ranking.length ? 333745818 : 0,
        totalChunks: ranking.length,
        finalCoverage: cume[cume.length - 1],
        coverageByDay: cume,
        cards,
    };
    fs.writeFileSync(path.join(OUT_DIR, 'course-1000.json'), JSON.stringify(course));
    fs.writeFileSync(path.join(OUT_DIR, 'course-clips.json'), JSON.stringify(outClips));

    const kb = (p) => (fs.statSync(path.join(OUT_DIR, p)).size / 1024).toFixed(0);
    console.log(`訳のある表現: ${pool.length} 個 (うち課程に ${NEED} 個)`);
    console.log(`course-1000.json  ${kb('course-1000.json')} KB`);
    console.log(`course-clips.json ${kb('course-clips.json')} KB  (${clipCount}件 / ${Object.keys(outClips).length}表現)`);
    console.log(`100日目のカバー率: ${course.finalCoverage}%`);
}

main();
