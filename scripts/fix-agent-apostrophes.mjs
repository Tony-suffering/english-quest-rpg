import fs from 'fs';

const dir = 'C:/Users/thaat/Desktop/english-quest-rpg/src/data/english/native365';
const files = ['day-02', 'day-03', 'day-04', 'day-11', 'day-12', 'day-13', 'day-21', 'day-22', 'day-23'];

let totalFixed = 0;
for (const name of files) {
    const fp = `${dir}/${name}.ts`;
    let src;
    try {
        src = fs.readFileSync(fp, 'utf8');
    } catch {
        console.log(`${name}: skip (not found)`);
        continue;
    }

    const lines = src.split('\n');
    let fixed = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Target: property-value lines `    propname: '...content...',`
        // where content has an unescaped apostrophe.
        const m = line.match(/^(\s*[a-zA-Z_][\w.]*\s*:\s*)'([\s\S]*?)'(\s*[,}\]][\s\S]*)?$/);
        if (!m) continue;
        const prefix = m[1];
        const body = m[2];
        const suffix = m[3] || '';
        // Body must contain a raw apostrophe (already-escaped ones use backslash-apostrophe,
        // but agent-generated files almost always have raw ones).
        if (!body.includes("'")) continue;
        // Swap outer delimiter to double-quote. Escape internal " and \ first.
        const safeBody = body
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"');
        lines[i] = `${prefix}"${safeBody}"${suffix}`;
        fixed++;
    }

    if (fixed > 0) {
        fs.writeFileSync(fp, lines.join('\n'), 'utf8');
        console.log(`${name}: fixed ${fixed} lines`);
        totalFixed += fixed;
    } else {
        console.log(`${name}: nothing to fix`);
    }
}
console.log('TOTAL:', totalFixed);
