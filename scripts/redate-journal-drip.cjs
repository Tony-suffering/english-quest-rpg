/**
 * Re-date all DISPLAYED journal entries onto a forward drip schedule.
 * - 3 entries per week (Mon / Wed / Fri)
 * - starts the Monday on/before 2026-06-01
 * - random (seeded) order across all entries
 *
 * Only edits files that actually feed into journalEntries:
 *   - src/data/journal.ts (inline entries)
 *   - src/data/journal/2026/0[1-5]-*.ts (inline objects in the monthly arrays)
 *   - every entry file imported by those monthly arrays
 *
 * Usage: node scripts/redate-journal-drip.cjs          (dry run, prints plan)
 *        node scripts/redate-journal-drip.cjs --write   (apply)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'src', 'data');
const Y2026 = path.join(DATA, 'journal', '2026');
const MONTHLY = ['01-january', '02-february', '03-march', '04-april', '05-may'];
const WRITE = process.argv.includes('--write');

// 1) Resolve the set of files that hold DISPLAYED entries
const files = new Set();
files.add(path.join(DATA, 'journal.ts'));
for (const m of MONTHLY) {
    const mf = path.join(Y2026, `${m}.ts`);
    files.add(mf);
    const src = fs.readFileSync(mf, 'utf8');
    const importRe = /from '\.\/([a-zA-Z0-9-]+)'/g;
    let im;
    while ((im = importRe.exec(src))) {
        files.add(path.join(Y2026, `${im[1]}.ts`));
    }
}

// 2) Collect every entry-level date field across those files
const dateRe = /^([ \t]*)date: (['"])(\d{4}-\d{2}-\d{2})\2/gm;
const matches = [];
const content = {};
for (const file of files) {
    if (!fs.existsSync(file)) { console.warn('MISSING', file); continue; }
    const c = fs.readFileSync(file, 'utf8');
    content[file] = c;
    let m;
    dateRe.lastIndex = 0;
    while ((m = dateRe.exec(c))) {
        matches.push({ file, pos: m.index, indent: m[1], quote: m[2], old: m[3] });
    }
}
console.log('files scanned:', files.size, '| date fields found:', matches.length);

// 3) Seeded shuffle (mulberry32)
function mulberry32(a) {
    return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const rand = mulberry32(20260603);
const order = matches.map((_, i) => i);
for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
}

// 4) Generate the drip schedule: Mon/Wed/Fri from Monday on/before 2026-06-01
const fmt = (d) => d.toISOString().slice(0, 10);
let start = new Date(Date.UTC(2026, 5, 1)); // 2026-06-01
const back = (start.getUTCDay() + 6) % 7;   // days since Monday
start = new Date(start.getTime() - back * 86400000);
const offsets = [0, 2, 4]; // Mon, Wed, Fri
const dates = [];
let week = 0;
while (dates.length < matches.length) {
    for (const off of offsets) dates.push(fmt(new Date(start.getTime() + (week * 7 + off) * 86400000)));
    week++;
}

// 5) Assign shuffled
const assign = {};
order.forEach((mi, i) => { assign[mi] = dates[i]; });

// 6) Rewrite each file
const byFile = {};
matches.forEach((mch, i) => { (byFile[mch.file] ||= []).push({ ...mch, newDate: assign[i] }); });
let changed = 0;
for (const file in byFile) {
    const arr = byFile[file].sort((a, b) => a.pos - b.pos);
    let c = content[file], out = '', last = 0;
    for (const a of arr) {
        out += c.slice(last, a.pos);
        out += `${a.indent}date: ${a.quote}${a.newDate}${a.quote}`;
        last = a.pos + `${a.indent}date: ${a.quote}${a.old}${a.quote}`.length;
        if (a.newDate !== a.old) changed++;
    }
    out += c.slice(last);
    if (WRITE) fs.writeFileSync(file, out);
}

console.log(`schedule: ${dates[0]} .. ${dates[matches.length - 1]} (${week} weeks, 3/wk)`);
console.log(`entries re-dated: ${changed}/${matches.length}`);
console.log(WRITE ? 'WRITTEN.' : 'DRY RUN (pass --write to apply).');
