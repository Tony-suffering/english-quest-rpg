#!/usr/bin/env node
// Extract old Flow (monologue) strings from git commit 40e5f7d and build
// src/data/english/365/master-flow-archive.ts — a lookup table used by the
// kaiwa page to reveal Flow when a user taps "極" on a Back card.

import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import ts from 'typescript';

// e7b24e3 is the last commit where english[3] was Flow (long monologue)
// for W1 inline content. For w2+ files, 40e5f7d is also Flow, but e7b24e3
// is older and also has Flow, so we use e7b24e3 uniformly.
const FLOW_COMMIT = 'e7b24e3';

const WEEK_FILES = [
    'src/data/english/365/master-expressions.ts',
    'src/data/english/365/master-expressions-w2.ts',
    'src/data/english/365/master-expressions-w3.ts',
    'src/data/english/365/master-expressions-w4.ts',
    'src/data/english/365/master-expressions-m2-w5.ts',
    'src/data/english/365/master-expressions-m2-w6.ts',
    'src/data/english/365/master-expressions-m2-w7.ts',
    'src/data/english/365/master-expressions-m2-w8.ts',
    'src/data/english/365/master-expressions-m3-w9.ts',
    'src/data/english/365/master-expressions-m3-w10.ts',
    'src/data/english/365/master-expressions-m3-w11.ts',
    'src/data/english/365/master-expressions-m3-w12.ts',
    'src/data/english/365/master-expressions-m4-w13.ts',
    'src/data/english/365/master-expressions-m4-w14.ts',
    'src/data/english/365/master-expressions-m4-w15.ts',
    'src/data/english/365/master-expressions-m4-w16.ts',
    'src/data/english/365/master-expressions-m5-w17.ts',
    'src/data/english/365/master-expressions-m5-w18.ts',
    'src/data/english/365/master-expressions-m5-w19.ts',
    'src/data/english/365/master-expressions-m5-w20.ts',
    'src/data/english/365/master-expressions-m6-w21.ts',
    'src/data/english/365/master-expressions-m6-w22.ts',
    'src/data/english/365/master-expressions-m6-w23.ts',
    'src/data/english/365/master-expressions-m6-w24.ts',
    'src/data/english/365/master-expressions-m7-w25.ts',
    'src/data/english/365/master-expressions-m7-w26.ts',
    'src/data/english/365/master-expressions-m7-w27.ts',
    'src/data/english/365/master-expressions-m7-w28.ts',
    'src/data/english/365/master-expressions-m8-w29.ts',
    'src/data/english/365/master-expressions-m8-w30.ts',
    'src/data/english/365/master-expressions-m8-w31.ts',
    'src/data/english/365/master-expressions-m8-w32.ts',
    'src/data/english/365/master-expressions-m9-w33.ts',
    'src/data/english/365/master-expressions-m9-w34.ts',
    'src/data/english/365/master-expressions-m9-w35.ts',
    'src/data/english/365/master-expressions-m9-w36.ts',
    'src/data/english/365/master-expressions-m10-w37.ts',
    'src/data/english/365/master-expressions-m10-w38.ts',
    'src/data/english/365/master-expressions-m10-w39.ts',
    'src/data/english/365/master-expressions-m10-w40.ts',
    'src/data/english/365/master-expressions-m11-w41.ts',
    'src/data/english/365/master-expressions-m11-w42.ts',
    'src/data/english/365/master-expressions-m11-w43.ts',
    'src/data/english/365/master-expressions-m11-w44.ts',
    'src/data/english/365/master-expressions-m12-w45.ts',
    'src/data/english/365/master-expressions-m12-w46.ts',
    'src/data/english/365/master-expressions-m12-w47.ts',
    'src/data/english/365/master-expressions-m12-w48.ts',
    'src/data/english/365/master-expressions-m12-w49.ts',
];

const archive = {};
let total = 0;
let filesProcessed = 0;

for (const file of WEEK_FILES) {
    let raw;
    try {
        raw = execSync(`git show ${FLOW_COMMIT}:${file}`, { encoding: 'utf8' });
    } catch {
        console.warn(`skip (not in commit): ${file}`);
        continue;
    }

    // Collect names from `import { A, B } from '...'` so we can stub them.
    const importedNames = new Set();
    for (const m of raw.matchAll(/import\s*\{([^}]+)\}\s*from/g)) {
        for (const piece of m[1].split(',')) {
            const name = piece.trim().split(/\s+as\s+/)[0].trim();
            if (name) importedNames.add(name);
        }
    }
    // Strip imports (would fail when eval'd standalone).
    raw = raw.replace(/^\s*import[\s\S]*?;?\s*$/gm, '');
    // Drop `export` keyword BEFORE transpile so TS doesn't emit `exports.X = ...`.
    raw = raw.replace(/\bexport\s+(const|let|var|function|interface|type)\b/g, '$1');
    // Inject stubs for any name referenced from a now-stripped import.
    const stubLines = [...importedNames]
        .map((n) => `var ${n} = [];`)
        .join('\n');
    raw = stubLines + '\n' + raw;

    // Transpile TS → JS (strips type annotations, keeps values).
    const js = ts.transpileModule(raw, {
        compilerOptions: {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.None,
            removeComments: false,
        },
    }).outputText;

    // Discover all top-level const/let/var names so we can capture them.
    const names = new Set();
    for (const match of js.matchAll(/(?:^|\n)\s*(?:var|let|const|export\s+(?:var|let|const))\s+(\w+)/g)) {
        names.add(match[1]);
    }

    const captureLines = [...names]
        .map((n) => `try { if (typeof ${n} !== 'undefined') __out.${n} = ${n}; } catch(e) {}`)
        .join('\n');

    // Rewrite `export const X` → `const X` so the Function body is valid.
    const safeJs = js.replace(/export\s+(const|let|var)\s+/g, '$1 ');

    const captured = {};
    try {
        const fn = new Function('__out', `${safeJs}\n${captureLines}`);
        fn(captured);
    } catch (err) {
        console.error(`eval failed: ${file}`, err.message);
        continue;
    }

    let fileCount = 0;
    for (const key of Object.keys(captured)) {
        const arr = captured[key];
        if (!Array.isArray(arr)) continue;
        for (const entry of arr) {
            if (
                entry &&
                typeof entry.daySlot === 'number' &&
                typeof entry.japanese === 'string' &&
                Array.isArray(entry.english) &&
                typeof entry.english[3] === 'string'
            ) {
                const key2 = `${entry.daySlot}::${entry.japanese}`;
                archive[key2] = entry.english[3];
                fileCount++;
                total++;
            }
        }
    }
    filesProcessed++;
    console.log(`  ${file} → ${fileCount} entries`);
}

const outPath = 'src/data/english/365/master-flow-archive.ts';
const body = `// AUTO-GENERATED by scripts/extract-master-flow-archive.mjs
// Source: git commit ${FLOW_COMMIT} (pre-Back rewrite)
// Key: \`\${daySlot}::\${japanese}\` → Flow monologue (old level 4)
// Used by kaiwa page to reveal Flow when the user taps the "極" button.

export const MASTER_FLOW_ARCHIVE: Record<string, string> = ${JSON.stringify(archive, null, 2)};

export function getFlow(daySlot: number, japanese: string): string | undefined {
    return MASTER_FLOW_ARCHIVE[\`\${daySlot}::\${japanese}\`];
}
`;

writeFileSync(outPath, body, 'utf8');
console.log(`\nWrote ${total} Flow entries from ${filesProcessed} files → ${outPath}`);
