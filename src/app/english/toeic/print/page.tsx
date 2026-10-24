'use client';

/**
 * TOEIC フル模試 -- A4両面印刷専用ページ(確定組版エンジン)。
 *
 * 以前の CSS multicol + @page 任せの組版は、ページ跨ぎで break-inside: avoid が
 * 効かず設問が分断される・空白ページが出る問題があった。ここでは:
 *   1. 全ブロック(見出し/Directions/パッセージ/設問)を非表示コンテナで実測
 *   2. 210x297mm の固定シートに逐次詰め込み(左段→右段→次ページ)
 *   3. シートをそのまま印刷 (@page margin:0)
 * とすることで、設問の途中分断が構造的に起こらない。
 *
 * 両面印刷(長辺とじ)前提: 奇数ページ=右ページ(とじしろ左) / 偶数=左ページで
 * とじしろ側の余白を広く取る。マークシートは奇数ページ始まり(裏が白紙)にして
 * 切り離せるようにする。
 *
 * ?test=02 .. ?test=07 で別テストも印刷可 (02/03/05/06/07 は Reading 専用)。
 * 新しい回を追加したら TEST_LOADERS に1行足すこと。忘れると ?test=NN が
 * 01 にフォールバックし、「別の回のフル模試が印刷される」事故になる。
 */

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Choice, Part34Set, Part6Set, ToeicTest } from '@/data/english/toeic-types';
import ToeicGraphic from '@/components/toeic/ToeicGraphic';

// ---- 紙面ジオメトリ (mm) ----
const PAGE_W = 210;
const PAGE_H = 297;
const M_TOP = 11;
const M_BOTTOM = 15;   // フッター(ページ番号/GO ON)ぶんを含む
const M_OUTER = 10;    // 小口側
const M_BIND = 16;     // とじしろ側
const CONTENT_W = PAGE_W - M_OUTER - M_BIND; // 184mm (左右どちらのページでも同じ)
const CONTENT_H = PAGE_H - M_TOP - M_BOTTOM; // 271mm
const COL_GAP = 7;
const COL_W = (CONTENT_W - COL_GAP) / 2;     // 88.5mm

const INK = '#111';
const GOLD = '#9A7B16';
const SUB = '#555';
const SOFT = '#999';
const MARK_LINE = 'Mark your answer on your answer sheet.';
/** 収まらないセットの級数を落とす下限。これ以上小さくするくらいなら組み方を譲る */
const IDEAL_FLOOR = 0.86;
const DISCLAIMER = '非公式・自主制作のオリジナル模試。TOEIC® の実施団体 ETS / IIBC とは一切関係ありません。問題・本文・台本・図はすべてオリジナルで、実際の試験問題の転載ではありません。TOEIC は ETS の登録商標です。';

// ---- 組版エンジン ----

/**
 * ブロックのまとまり方 (本番の冊子と同じ「割れない単位」を表す)。
 *
 *  chunk          … 段(コラム)の中で必ず連続。Part 3/4 の1セット3問。
 *                   段をまたがないので、結果として同じページに載る。
 *  page           … セット全部を必ず同じページに。Part 6 (本文+4問)。
 *  page-or-spread … 1ページに入らなければ「左ページ=文書 / 右ページ=設問」の
 *                   見開きに割る。Part 7 の1文書セット。
 *  spread         … 常に見開き。Part 7 の複数文書セット (176-200)。
 *                   本番と同じく、文書が左ページ・設問5問が右ページで、
 *                   ページをめくらずに全部見える。
 */
type GroupMode = 'chunk' | 'page' | 'page-or-spread' | 'spread';

type Block =
    | { kind: 'full' | 'col'; id: string; el: ReactNode; keepNext?: boolean; group?: string }
    | { kind: 'break'; id: string; parity?: 'odd'; keepNext?: undefined; group?: undefined };

type Band =
    | { type: 'full'; id: string }
    | { type: 'cols'; left: string[]; right: string[] }
    | { type: 'blank' };

interface PageOut { bands: Band[] }

/** 段組みに流し込むときの最小単位。chunk グループは複数ブロックで1単位 */
interface Unit { ids: string[]; h: number }

/**
 * 高さ計算まわり。hmap は呼び出し側で書き換わるので、参照を保持して都度読む
 * (級数を落として測り直す fit ループのため)。
 */
function makeLayout(groups: Map<string, GroupMode>, hmap: Map<string, number>, H: number) {
    const hOf = (id: string) => hmap.get(id) ?? 0;

    /** col ブロックの並びを、chunk グループを1単位にまとめた列に変換する */
    const toUnits = (run: Block[]): Unit[] => {
        const units: Unit[] = [];
        let k = 0;
        while (k < run.length) {
            const g = run[k].group;
            if (g && groups.get(g) === 'chunk') {
                const ids: string[] = [];
                let h = 0;
                while (k < run.length && run[k].group === g) { ids.push(run[k].id); h += hOf(run[k].id); k++; }
                units.push({ ids, h });
            } else {
                units.push({ ids: [run[k].id], h: hOf(run[k].id) });
                k++;
            }
        }
        return units;
    };

    // 均等分割: 順序を保ったまま max(左, 右) を最小化。
    // 同点なら k が大きい方 (= 左段に多く入る方) を採る。
    // `<` にすると 1件だけの run で k=0 が選ばれ、左段が空で右段だけに置かれる。
    const balance = (units: Unit[]) => {
        const total = units.reduce((a, u) => a + u.h, 0);
        let bestH = Infinity, bestK = 0, prefix = 0;
        for (let k = 0; k <= units.length; k++) {
            const m = Math.max(prefix, total - prefix);
            if (m <= bestH) { bestH = m; bestK = k; }
            if (k < units.length) prefix += units[k].h;
        }
        return { h: bestH, k: bestK };
    };

    const colBand = (units: Unit[], k: number): Band => ({
        type: 'cols',
        left: units.slice(0, k).flatMap(u => u.ids),
        right: units.slice(k).flatMap(u => u.ids),
    });

    /** seq を avail の高さに丸ごと組めるか。組めれば band 列と高さ、無理なら null */
    const tryLayout = (seq: Block[], avail: number): { bands: Band[]; h: number } | null => {
        const out: Band[] = [];
        let h = 0, i = 0;
        while (i < seq.length) {
            if (seq[i].kind === 'full') {
                out.push({ type: 'full', id: seq[i].id });
                h += hOf(seq[i].id);
                i++;
            } else {
                const run: Block[] = [];
                while (i < seq.length && seq[i].kind === 'col') { run.push(seq[i]); i++; }
                const units = toUnits(run);
                const b = balance(units);
                out.push(colBand(units, b.k));
                h += b.h;
            }
            if (h > avail) return null;
        }
        return { bands: out, h };
    };

    const estimate = (seq: Block[]) => tryLayout(seq, Infinity)?.h ?? 0;

    /** 組み上がった band 列が食う高さ (段は左右の高い方) */
    const bandsHeight = (bs: Band[]) => bs.reduce((a, b) => {
        if (b.type === 'full') return a + hOf(b.id);
        if (b.type === 'cols') {
            const sum = (ids: string[]) => ids.reduce((x, id) => x + hOf(id), 0);
            return a + Math.max(sum(b.left), sum(b.right));
        }
        return a;
    }, 0);

    /** seq を空ページから順に流し込んだときのページ列 */
    const flowPages = (seq: Block[]): Band[][] => {
        const out: Band[][] = [];
        let cur: Band[] = [];
        let used = 0;
        const push = () => { if (cur.length) { out.push(cur); cur = []; used = 0; } };
        let k = 0;
        while (k < seq.length) {
            if (seq[k].kind === 'full') {
                const h = hOf(seq[k].id);
                if (used > 0 && used + h > H) push();
                cur.push({ type: 'full', id: seq[k].id });
                used += h;
                k++;
                continue;
            }
            const run: Block[] = [];
            while (k < seq.length && seq[k].kind === 'col') { run.push(seq[k]); k++; }
            const units = toUnits(run);
            let idx = 0;
            while (idx < units.length) {
                const rest = units.slice(idx);
                const b = balance(rest);
                if (b.h <= H - used) { cur.push(colBand(rest, b.k)); used += b.h; break; }
                const avail = H - used;
                const left: string[] = [], right: string[] = [];
                let lh = 0, rh = 0;
                while (idx < units.length && lh + units[idx].h <= avail) { left.push(...units[idx].ids); lh += units[idx].h; idx++; }
                while (idx < units.length && rh + units[idx].h <= avail) { right.push(...units[idx].ids); rh += units[idx].h; idx++; }
                if (left.length || right.length) {
                    cur.push({ type: 'cols', left, right });
                    used += Math.max(lh, rh);
                } else if (used === 0) {
                    // 1単位がページより高い: 強制配置(はみ出しは overflow:hidden で切る)
                    cur.push({ type: 'cols', left: units[idx].ids, right: [] });
                    used += units[idx].h;
                    idx++;
                }
                if (idx < units.length) push();
            }
        }
        push();
        return out;
    };

    /** 見開き(2ページ)に組む。左=文書 / 右=設問 を優先し、無理なら2ページに流す */
    const spreadPages = (seq: Block[]): Band[][] | null => {
        const docs = seq.filter(b => b.kind === 'full');
        const qs = seq.filter(b => b.kind === 'col');
        if (docs.length > 0 && qs.length > 0) {
            const d = tryLayout(docs, H);
            const q = tryLayout(qs, H);
            if (d && q) return [d.bands, q.bands];
        }
        const f = flowPages(seq);
        return f.length <= 2 ? f : null;
    };

    /**
     * 本番どおりの理想形に組めるか。
     *  spread … 左ページに文書ぜんぶ / 右ページに設問ぜんぶ
     *  その他 … セットが1ページに収まる
     */
    const idealFit = (seq: Block[], mode: GroupMode): boolean => {
        if (mode === 'spread') {
            const docs = seq.filter(b => b.kind === 'full');
            const qs = seq.filter(b => b.kind === 'col');
            return docs.length > 0 && qs.length > 0 && !!tryLayout(docs, H) && !!tryLayout(qs, H);
        }
        return !!tryLayout(seq, H);
    };

    /** グループが規定の収まり方で組めるか (組めれば band 構成、無理なら null) */
    const fitGroup = (seq: Block[], mode: GroupMode): Band[][] | null => {
        if (mode === 'chunk') {
            const h = seq.reduce((a, b) => a + hOf(b.id), 0);
            return h <= H ? [] : null;
        }
        if (mode !== 'spread') {
            const one = tryLayout(seq, H);
            if (one) return [one.bands];
            if (mode === 'page') return null;
        }
        return spreadPages(seq);
    };

    return { hOf, toUnits, balance, colBand, tryLayout, estimate, bandsHeight, flowPages, spreadPages, idealFit, fitGroup };
}

function paginate(blocks: Block[], groups: Map<string, GroupMode>, hmap: Map<string, number>, H: number): PageOut[] {
    const kit = makeLayout(groups, hmap, H);
    const { hOf, toUnits, balance, colBand, tryLayout, bandsHeight, spreadPages } = kit;
    const pages: PageOut[] = [];
    let bands: Band[] = [];
    let usedH = 0;
    const modeOf = (b: Block): GroupMode | undefined => (b.group ? groups.get(b.group) ?? 'page' : undefined);
    /** ページ単位で固める種類のグループか (chunk は段の中の話なので別扱い) */
    const isPageGroup = (b: Block) => { const m = modeOf(b); return m !== undefined && m !== 'chunk'; };

    const flushPage = () => {
        if (bands.length) { pages.push({ bands }); bands = []; usedH = 0; }
    };

    /** j 番から始まる同一グループのブロック列 */
    const groupSeq = (j: number): Block[] => {
        const g = blocks[j].group;
        const seq: Block[] = [];
        let k = j;
        while (k < blocks.length && blocks[k].group === g) { seq.push(blocks[k]); k++; }
        return seq;
    };

    /**
     * i から keepNext で繋がる見出し列 (PART 見出し + Directions など) と、その直後の中身。
     * 中身がこのページに始められないなら見出しごと次ページへ送る = 見出しの置き去りを防ぐ。
     */
    const lookahead = (i: number): { headH: number; seq: Block[]; mode?: GroupMode } | null => {
        let h = 0, j = i;
        while (j < blocks.length && blocks[j].keepNext) {
            h += hOf(blocks[j].id);
            j++;
            if (j >= blocks.length) return null;
            const nb = blocks[j];
            if (nb.kind === 'break') return null;
            if (nb.group) return { headH: h, seq: groupSeq(j), mode: groups.get(nb.group) ?? 'page' };
            if (!nb.keepNext) return { headH: h, seq: [nb] };
        }
        return null;
    };

    // 連続する col ブロックの run を段組みに詰める。
    // 残り全部が今の余白に入るなら左右均等バランス、入らないなら左右とも余白いっぱいに充填。
    const placeRun = (run: Block[]) => {
        const units = toUnits(run);
        let idx = 0;
        while (idx < units.length) {
            const rest = units.slice(idx);
            const b = balance(rest);
            if (b.h <= H - usedH) {
                bands.push(colBand(rest, b.k));
                usedH += b.h;
                return;
            }
            // 入り切らない: この余白に左→右の順で詰め込めるだけ詰める
            const avail = H - usedH;
            const left: string[] = [], right: string[] = [];
            let lh = 0, rh = 0;
            while (idx < units.length && lh + units[idx].h <= avail) { left.push(...units[idx].ids); lh += units[idx].h; idx++; }
            while (idx < units.length && rh + units[idx].h <= avail) { right.push(...units[idx].ids); rh += units[idx].h; idx++; }
            if (left.length || right.length) {
                bands.push({ type: 'cols', left, right });
                usedH += Math.max(lh, rh);
            } else if (usedH === 0) {
                console.warn(`[toeic-print] col unit ${units[idx].ids[0]} taller than page`);
                bands.push({ type: 'cols', left: units[idx].ids, right: [] });
                usedH += units[idx].h;
                idx++;
            }
            if (idx < units.length) flushPage();
        }
    };

    /** 最後の手段: 規定の収まりに入らないグループを、そのまま流し込む */
    const flowInline = (seq: Block[]) => {
        let k = 0;
        while (k < seq.length) {
            if (seq[k].kind === 'full') {
                const h = hOf(seq[k].id);
                if (usedH > 0 && usedH + h > H) flushPage();
                bands.push({ type: 'full', id: seq[k].id });
                usedH += h;
                k++;
            } else {
                const run: Block[] = [];
                while (k < seq.length && seq[k].kind === 'col') { run.push(seq[k]); k++; }
                placeRun(run);
            }
        }
    };

    let i = 0;
    while (i < blocks.length) {
        const b = blocks[i];
        if (b.kind === 'break') {
            flushPage();
            // parity: 'odd' = 次の内容ページを奇数(シート表面)に揃える
            if (b.parity === 'odd' && (pages.length + 1) % 2 === 0) {
                pages.push({ bands: [{ type: 'blank' }] });
            }
            i++;
            continue;
        }

        // ---- セット単位で固めるグループ ----
        if (isPageGroup(b)) {
            const seq = groupSeq(i);
            i += seq.length;
            const mode = modeOf(b) as GroupMode;
            if (mode !== 'spread') {
                // 今のページの残りに丸ごと入るか → 入らなければ次ページ頭で丸ごと
                let fit = tryLayout(seq, H - usedH);
                if (!fit && usedH > 0) { flushPage(); fit = tryLayout(seq, H); }
                if (fit) { bands.push(...fit.bands); usedH += fit.h; continue; }
                if (mode === 'page') {
                    console.warn(`[toeic-print] group ${b.group} does not fit a page; flowing`);
                    flowInline(seq);
                    continue;
                }
            }
            const sp = spreadPages(seq);
            if (sp) {
                flushPage();
                // 綴じた冊子では (2,3) (4,5) ... が向かい合う。2ページ使うなら左を偶数ページに
                if (sp.length > 1 && pages.length % 2 === 0) pages.push({ bands: [{ type: 'blank' }] });
                sp.slice(0, -1).forEach(bs => pages.push({ bands: bs }));
                // 最後の1ページは開いたままにする (Stop の枠などが続けて載る)
                bands = [...sp[sp.length - 1]];
                usedH = bandsHeight(bands);
                continue;
            }
            console.warn(`[toeic-print] group ${b.group} does not fit a spread; flowing`);
            flowInline(seq);
            continue;
        }

        if (b.kind === 'full') {
            const h = hOf(b.id);
            if (h > H) console.warn(`[toeic-print] block ${b.id} taller than page: ${Math.round(h)}px`);
            let brk = usedH > 0 && usedH + h > H;
            if (!brk && usedH > 0 && b.keepNext) {
                const la = lookahead(i);
                if (la) {
                    const after = H - usedH - la.headH;
                    const fits = la.mode === 'chunk'
                        ? la.seq.reduce((a, x) => a + hOf(x.id), 0) <= after
                        : !!tryLayout(la.seq, after);
                    if (!fits) brk = true;   // 見出しの直後に中身を始められない
                }
            }
            if (brk) flushPage();
            bands.push({ type: 'full', id: b.id });
            usedH += h;
            i++;
            continue;
        }

        const run: Block[] = [];
        while (i < blocks.length && blocks[i].kind === 'col' && !isPageGroup(blocks[i])) { run.push(blocks[i]); i++; }
        placeRun(run);
    }
    flushPage();
    return pages;
}

// ---- 紙面パーツ ----

const Choices = ({ choices }: { choices: Choice[] }) => (
    <div style={{ marginTop: '1mm', paddingLeft: '5mm' }}>
        {choices.map(c => (
            <div key={c.label} style={{ fontSize: '9.3pt', lineHeight: 1.5, color: INK, display: 'flex', gap: '2mm' }}>
                <span style={{ flexShrink: 0 }}>({c.label})</span>
                <span>{c.text}</span>
            </div>
        ))}
    </div>
);

const AnsMark = ({ a, show }: { a: string; show: boolean }) => show
    ? <span style={{ color: '#B00', fontWeight: 700, marginLeft: '4px' }}>[{a}]</span> : null;

const QBlock = ({ no, text, choices, a, tag, show }: { no: number; text?: string; choices: Choice[]; a: string; tag?: string; show: boolean }) => (
    <div style={{ paddingBottom: '4mm' }}>
        {text
            ? <div style={{ fontSize: '9.5pt', lineHeight: 1.45, color: INK }}><b>{no}.</b>&nbsp;{text}<AnsMark a={a} show={show} />{tag && show && <span style={{ color: GOLD, fontSize: '7.5pt', marginLeft: '4px' }}>[{tag}]</span>}</div>
            : <div style={{ fontSize: '9.5pt', color: INK }}><b>{no}.</b><AnsMark a={a} show={show} /></div>}
        <Choices choices={choices} />
    </div>
);

const Directions = ({ text }: { text: string }) => (
    <div style={{ paddingBottom: '3mm' }}>
        <div style={{ fontSize: '8.3pt', color: INK, border: `1px solid ${INK}`, padding: '2mm 3mm', lineHeight: 1.55 }}>
            <b>Directions: </b>{text}
        </div>
    </div>
);

const PartTitle = ({ tag, jp, en }: { tag: string; jp: string; en: string }) => (
    <div style={{ paddingTop: '4mm', paddingBottom: '1.5mm', display: 'flex', alignItems: 'baseline', gap: '3mm' }}>
        <span style={{ fontSize: '14pt', fontWeight: 900, letterSpacing: '0.5px' }}>{tag}</span>
        <span style={{ fontSize: '9pt', fontWeight: 700 }}>{jp}</span>
        <span style={{ fontSize: '8pt', color: SUB }}>{en}</span>
    </div>
);

const SectionBanner = ({ title, range }: { title: string; range: string }) => (
    <div style={{ paddingBottom: '2mm' }}>
        <div style={{ background: INK, color: '#fff', padding: '2.5mm 4mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13pt', fontWeight: 900, letterSpacing: '2px' }}>{title}</span>
            <span style={{ fontSize: '8.5pt' }}>{range}</span>
        </div>
    </div>
);

const SetIntro = ({ text }: { text: string }) => (
    <div style={{ paddingTop: '2mm', paddingBottom: '1mm', fontSize: '9pt', fontWeight: 700 }}>{text}</div>
);

/** Part 3/4 の図表問題の図。設問の直前に全幅で置く */
const GraphicBlock = ({ range, graphic }: { range: string; graphic: NonNullable<Part34Set['graphic']> }) => (
    <div style={{ paddingTop: '2mm', paddingBottom: '3mm' }}>
        <div style={{ fontSize: '8pt', fontWeight: 700, color: SOFT, letterSpacing: '0.5px', marginBottom: '1.5mm' }}>
            QUESTIONS {range}
        </div>
        <ToeicGraphic graphic={graphic} compact />
    </div>
);

// Part 1: 写真の代わりの場面カード (データにSVGがあればそれを使う)
const PhotoCard = ({ no, svg, scene, statements, answer, printText, show }: {
    no: number; svg?: string; scene: string; statements: Choice[]; answer: string; printText: boolean; show: boolean;
}) => (
    <div style={{ paddingBottom: '4.5mm' }}>
        <div style={{ fontSize: '10pt', fontWeight: 800, marginBottom: '1mm' }}>{no}.</div>
        {svg ? (
            // aspect-ratio と %サイズのSVGは印刷メディアで 0x0 に潰れるため、mm固定 + 属性注入
            <div className="p1pic" style={{ width: `${COL_W}mm`, height: `${COL_W * 0.75}mm`, border: `1px solid ${INK}`, overflow: 'hidden', boxSizing: 'border-box' }}
                dangerouslySetInnerHTML={{ __html: svg.replace('<svg ', `<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" `) }} />
        ) : (
            <div style={{ border: `1px solid ${INK}`, minHeight: '30mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4mm 5mm', textAlign: 'center' }}>
                <div style={{ fontSize: '6.5pt', fontWeight: 700, letterSpacing: '1.5px', color: SOFT, marginBottom: '1.5mm' }}>PHOTOGRAPH ・ 場面</div>
                <div style={{ fontSize: '9.5pt', fontStyle: 'italic', fontFamily: 'Georgia, serif', lineHeight: 1.6, color: INK }}>{scene}</div>
            </div>
        )}
        {printText
            ? <Choices choices={statements} />
            : <div style={{ fontSize: '8.3pt', color: SUB, marginTop: '1mm' }}>{MARK_LINE}</div>}
        {show && <div style={{ fontSize: '8pt', color: '#B00', fontWeight: 700, marginTop: '1mm' }}>正解 [{answer}]</div>}
    </div>
);

// Part 6: 空所マーカー入りパッセージ
const Part6Passage = ({ set }: { set: Part6Set }) => {
    const parts = set.passage.split(/§(\d+)§/);
    return (
        <div style={{ paddingBottom: '3mm' }}>
            <div style={{ border: `1px solid ${INK}`, padding: '3mm 4mm', overflowWrap: 'anywhere' }}>
                <div style={{ fontSize: '9pt', lineHeight: 1.85, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', color: INK }}>
                    {parts.map((p, i) => i % 2 === 1
                        ? <span key={i} style={{ display: 'inline-block', minWidth: '15mm', borderBottom: `1px solid ${INK}`, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '8pt', fontWeight: 700, margin: '0 1px' }}>{p}.</span>
                        : <span key={i}>{p}</span>)}
                </div>
            </div>
        </div>
    );
};

const PassageBox = ({ heading, body, label }: { heading?: string; body: string; label?: string }) => (
    <div style={{ paddingBottom: '3mm' }}>
        <div style={{ border: `1px solid ${INK}`, padding: '3mm 4mm', overflowWrap: 'anywhere' }}>
            {label && <div style={{ fontSize: '7pt', fontWeight: 700, color: SOFT, letterSpacing: '0.5px', marginBottom: '1.5mm' }}>{label}</div>}
            {heading && <div style={{ fontSize: '9pt', fontWeight: 700, whiteSpace: 'pre-wrap', borderBottom: '1px solid #bbb', paddingBottom: '1.5mm', marginBottom: '1.5mm', fontFamily: 'Georgia, serif' }}>{heading}</div>}
            <PassageBody body={body} />
        </div>
    </div>
);

// ---- パッセージ本文: パイプ表→table / 桁揃えテキスト→等幅 / 散文→serif ----
function isPipeRow(line: string): boolean {
    return (line.match(/\|/g) || []).length >= 2;
}
function splitPipe(line: string): string[] {
    let t = line.trim();
    if (t.startsWith('|')) t = t.slice(1);
    if (t.endsWith('|')) t = t.slice(0, -1);
    return t.split('|').map(s => s.trim());
}
function isSepRow(cells: string[]): boolean {
    return cells.every(c => c === '' || /^:?-{2,}:?$/.test(c));
}
function looksTabular(text: string): boolean {
    if (/^\s*-{4,}\s*$/m.test(text)) return true;
    return text.split('\n').filter(l => /\S {2,}\S/.test(l)).length >= 2;
}
function PassageBody({ body }: { body: string }) {
    const lines = body.split('\n');
    const blocks: ({ type: 'table'; rows: string[][] } | { type: 'text'; text: string })[] = [];
    let i = 0;
    while (i < lines.length) {
        if (isPipeRow(lines[i])) {
            const rows: string[][] = [];
            while (i < lines.length && isPipeRow(lines[i])) { rows.push(splitPipe(lines[i])); i++; }
            blocks.push({ type: 'table', rows: rows.filter(r => !isSepRow(r)) });
        } else {
            const buf: string[] = [];
            while (i < lines.length && !isPipeRow(lines[i])) { buf.push(lines[i]); i++; }
            blocks.push({ type: 'text', text: buf.join('\n') });
        }
    }
    return (
        <>
            {blocks.map((b, bi) => b.type === 'table' ? (
                <table key={bi} style={{ borderCollapse: 'collapse', width: '100%', margin: '1.5mm 0', fontFamily: 'Georgia, serif', fontSize: '8.3pt' }}>
                    <tbody>
                        {b.rows.map((r, ri) => (
                            <tr key={ri}>
                                {r.map((c, ci) => (
                                    <td key={ci} style={{ border: '1px solid #999', padding: '0.8mm 1.5mm', fontWeight: ri === 0 ? 700 : 400, verticalAlign: 'top' }}>{c.replace(/\[X\]/g, '☑').replace(/\[ \]/g, '☐')}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                b.text.trim() === '' ? null : (
                    <div key={bi} style={{ whiteSpace: 'pre-wrap', fontFamily: looksTabular(b.text) ? '"Courier New", monospace' : 'Georgia, serif', fontSize: looksTabular(b.text) ? '8pt' : '9pt', lineHeight: 1.6, color: INK }}>{b.text}</div>
                )
            ))}
        </>
    );
}

// ---- マークシート (1ページ固定レイアウト) ----
const BubbleRow = ({ no }: { no: number }) => {
    const three = no >= 7 && no <= 31; // Part 2 は3択
    const letters = three ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1mm', height: '4.55mm' }}>
            <span style={{ width: '6.5mm', textAlign: 'right', fontSize: '7.5pt', fontWeight: 700, flexShrink: 0 }}>{no}</span>
            {letters.map(L => (
                <span key={L} style={{ width: '3.7mm', height: '3.7mm', borderRadius: '50%', border: `1px solid ${INK}`, fontSize: '6pt', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: SUB, boxSizing: 'border-box', flexShrink: 0 }}>{L}</span>
            ))}
            {three && <span style={{ width: '3.7mm' }} />}
        </div>
    );
};

const MarkGrid = ({ from, count }: { from: number; count: number }) => (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(25, auto)', columnGap: '4mm', justifyContent: 'start' }}>
        {Array.from({ length: count }, (_, i) => from + i).map(no => <BubbleRow key={no} no={no} />)}
    </div>
);

const MarkSheet = ({ hasListening, hasReading }: { hasListening: boolean; hasReading: boolean }) => (
    <div>
        <SectionBanner title="ANSWER SHEET" range="解答用紙 ・ 切り離して使用可(裏面は白紙)" />
        <div style={{ display: 'flex', gap: '10mm', fontSize: '9pt', padding: '1mm 0 3mm' }}>
            <span>NAME ______________________</span><span>DATE ____________</span><span>SCORE ______</span>
        </div>
        {hasListening && (
            <div style={{ paddingBottom: '3mm' }}>
                <div style={{ fontSize: '8.5pt', fontWeight: 800, letterSpacing: '1px', borderBottom: `1px solid ${INK}`, paddingBottom: '0.8mm', marginBottom: '1.5mm' }}>LISTENING (No. 1 - 100)<span style={{ fontWeight: 400, color: SUB, marginLeft: '3mm', letterSpacing: 0 }}>No. 7-31 は (A)(B)(C) の3択</span></div>
                <MarkGrid from={1} count={100} />
            </div>
        )}
        {hasReading && (
            <div>
                <div style={{ fontSize: '8.5pt', fontWeight: 800, letterSpacing: '1px', borderBottom: `1px solid ${INK}`, paddingBottom: '0.8mm', marginBottom: '1.5mm' }}>READING (No. 101 - 200)</div>
                <MarkGrid from={101} count={100} />
            </div>
        )}
    </div>
);

// ---- 解答一覧 (1ページ固定レイアウト) ----
const AnswerKey = ({ t }: { t: ToeicTest }) => (
    <div>
        <SectionBanner title="ANSWER KEY" range="解答一覧" />
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(25, auto)', columnGap: '5mm', justifyContent: 'start', paddingTop: '1mm' }}>
            {t.answerKey.map(k => (
                <div key={k.no} style={{ display: 'flex', alignItems: 'center', gap: '2mm', fontSize: '8.5pt', borderBottom: '1px dotted #ccc', padding: '0.55mm 1mm', width: '17mm', justifyContent: 'space-between' }}>
                    <span style={{ color: SUB }}>{k.no}</span><b>{k.answer}</b>
                </div>
            ))}
        </div>
    </div>
);

// ---- ブロック列の構築 ----
interface BuildOpts { showAnswers: boolean; listeningText: boolean; includeExtras: boolean }

function buildBlocks(t: ToeicTest, o: BuildOpts): { blocks: Block[]; groups: Map<string, GroupMode> } {
    const B: Block[] = [];
    const groups = new Map<string, GroupMode>();
    const full = (id: string, el: ReactNode, keepNext?: boolean, group?: string) => B.push({ kind: 'full', id, el, keepNext, group });
    const col = (id: string, el: ReactNode, group?: string) => B.push({ kind: 'col', id, el, group });
    const brk = (id: string, parity?: 'odd') => B.push({ kind: 'break', id, parity });

    const hasListening = t.part1.length > 0 || t.part3.length > 0;
    const hasReading = t.part5.length > 0;
    const qTotal = t.answerKey.length;
    const testNo = t.id.replace(/\D/g, '');

    // ---- 表紙 ----
    full('cover', (
        <div style={{ height: `${CONTENT_H - 2}mm`, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ border: `2px solid ${INK}`, padding: '8mm', marginTop: '24mm' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '30pt', fontWeight: 900, letterSpacing: '2px' }}>SCOREPASS</div>
                    <div style={{ fontSize: '13pt', fontWeight: 800, marginTop: '3mm' }}>TOEIC&reg; L&amp;R 形式 {hasListening ? 'フル模試' : 'Reading 模試'}</div>
                    <div style={{ fontSize: '10pt', color: SUB, marginTop: '1mm' }}>Test {testNo} ・ {qTotal} Questions</div>
                </div>
                <div style={{ borderTop: `1px solid ${INK}`, marginTop: '6mm', paddingTop: '5mm', fontSize: '9pt', lineHeight: 1.8 }}>
                    <b>General Directions</b><br />
                    {hasListening
                        ? 'This practice test has two sections: Listening (Parts 1-4, approximately 45 minutes, 100 questions) and Reading (Parts 5-7, 75 minutes, 100 questions). Directions are given at the beginning of each part. Mark all of your answers on the separate answer sheet; do not write your answers in this booklet. In the Listening section, every conversation and talk is spoken only one time.'
                        : 'This practice test covers the Reading section (Parts 5-7, 75 minutes, 100 questions). Directions are given at the beginning of each part. Mark all of your answers on the separate answer sheet; do not write your answers in this booklet.'}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12mm', marginTop: '12mm', fontSize: '10pt' }}>
                <span>NAME ________________________</span><span>DATE ______________</span><span>SCORE ______ / {qTotal}</span>
            </div>
            <div style={{ marginTop: 'auto', fontSize: '7pt', lineHeight: 1.6, color: SOFT, borderTop: '1px solid #ccc', paddingTop: '2mm' }}>{DISCLAIMER}</div>
        </div>
    ));
    brk('after-cover');

    // ---- LISTENING ----
    if (hasListening) {
        full('l-banner', <SectionBanner title="LISTENING TEST" range="No. 1 - 100" />, true);
        full('l-intro', (
            <div style={{ fontSize: '8.5pt', lineHeight: 1.6, paddingBottom: '2mm' }}>
                In the Listening test, you will show how well you understand spoken English. The entire Listening test
                lasts approximately 45 minutes. There are four parts. Play the audio from the on-screen version
                (スクリプト読み上げ) and answer each question. Each recording is played only once.
            </div>
        ), true);

        full('p1-title', <PartTitle tag="PART 1" jp="写真描写問題" en="Photographs ・ No. 1-6" />, true);
        full('p1-dir', <Directions text="For each question, you will hear four statements about a picture. Select the one statement that best describes what you see, and mark it on your answer sheet. The statements are not printed in this booklet. (本冊子では写真の代わりにイラストを使用しています。)" />, true);
        t.part1.forEach(q => col(`p1-${q.no}`, (
            <PhotoCard no={q.no} svg={q.svg} scene={q.sceneDescription} statements={q.statements} answer={q.answer} printText={o.listeningText} show={o.showAnswers} />
        )));

        full('p2-title', <PartTitle tag="PART 2" jp="応答問題" en="Question-Response ・ No. 7-31" />, true);
        full('p2-dir', <Directions text="You will hear a question or statement followed by three responses. Select the best response, and mark the letter (A), (B), or (C) on your answer sheet. The questions and responses are not printed in this booklet." />, true);
        t.part2.forEach(q => col(`p2-${q.no}`, o.listeningText ? (
            <div style={{ paddingBottom: '3.2mm' }}>
                <div style={{ fontSize: '9.5pt', lineHeight: 1.4 }}><b>{q.no}.</b>&nbsp;{q.prompt}<AnsMark a={q.answer} show={o.showAnswers} /></div>
                <Choices choices={q.responses as Choice[]} />
            </div>
        ) : (
            <div style={{ fontSize: '9.5pt', lineHeight: 2.1 }}>
                <b>{q.no}.</b>&nbsp;{MARK_LINE}<AnsMark a={q.answer} show={o.showAnswers} />
            </div>
        )));

        full('p3-title', <PartTitle tag="PART 3" jp="会話問題" en="Conversations ・ No. 32-70" />, true);
        full('p3-dir', <Directions text="You will hear conversations between two or more people. Answer three questions about each conversation. The conversations are not printed and are spoken only once. (Audio numbers 32-70 follow the on-screen version.)" />, true);
        t.part3.forEach(s => {
            // 1セット3問は段の中で必ず連続 = 「32-34 の3問目だけ次ページ」が起きない。
            // 図表は設問より前に、そのセットの設問と同じページに置く (図を見て解く問題なので離せない)
            const g = `p3set-${s.range}`;
            groups.set(g, 'chunk');
            if (s.graphic) full(`p3-g-${s.range}`, <GraphicBlock range={s.range} graphic={s.graphic} />, true);
            s.questions.forEach(q => col(`p3-${q.no}`, (
                <QBlock no={q.no} text={q.question} choices={q.choices} a={q.answer} show={o.showAnswers} />
            ), g));
        });

        full('p4-title', <PartTitle tag="PART 4" jp="説明文問題" en="Talks ・ No. 71-100" />, true);
        full('p4-dir', <Directions text="You will hear talks given by a single speaker. Answer three questions about each talk. The talks are not printed and are spoken only once." />, true);
        t.part4.forEach(s => {
            const g = `p4set-${s.range}`;
            groups.set(g, 'chunk');
            if (s.graphic) full(`p4-g-${s.range}`, <GraphicBlock range={s.range} graphic={s.graphic} />, true);
            s.questions.forEach(q => col(`p4-${q.no}`, (
                <QBlock no={q.no} text={q.question} choices={q.choices} a={q.answer} show={o.showAnswers} />
            ), g));
        });
    }

    // ---- READING ----
    if (hasReading) {
        brk('before-reading');
        full('r-banner', <SectionBanner title="READING TEST" range="No. 101 - 200" />, true);
        full('r-intro', (
            <div style={{ fontSize: '8.5pt', lineHeight: 1.6, paddingBottom: '2mm' }}>
                In the Reading test, you will read a variety of texts and answer several different types of reading
                comprehension questions. The entire Reading test lasts 75 minutes. There are three parts, and directions
                are given for each part. Mark your answers on the separate answer sheet; do not write them in this booklet.
            </div>
        ), true);

        full('p5-title', <PartTitle tag="PART 5" jp="短文穴埋め問題" en="Incomplete Sentences ・ No. 101-130" />, true);
        full('p5-dir', <Directions text="A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence." />, true);
        t.part5.forEach(q => col(`p5-${q.no}`, (
            <QBlock no={q.no} text={q.sentence} choices={q.choices} a={q.answer} tag={q.tag} show={o.showAnswers} />
        )));

        full('p6-title', <PartTitle tag="PART 6" jp="長文穴埋め問題" en="Text Completion ・ No. 131-146" />, true);
        full('p6-dir', <Directions text="Read the texts that follow. A word, phrase, or sentence is missing in parts of each text. Select the answer choice that best completes the text." />, true);
        t.part6.forEach(set => {
            // 本文と4問は必ず同じページ (本番も1テキスト+4問で1ページ)
            const g = `p6set-${set.no}`;
            groups.set(g, 'page');
            full(`p6-intro-${set.no}`, <SetIntro text={set.intro} />, false, g);
            full(`p6-psg-${set.no}`, <Part6Passage set={set} />, false, g);
            set.questions.forEach(q => col(`p6-${q.no}`, (
                <QBlock no={q.no} choices={q.choices} a={q.answer} show={o.showAnswers} />
            ), g));
        });

        full('p7-title', <PartTitle tag="PART 7" jp="読解問題" en="Reading Comprehension ・ No. 147-200" />, true);
        full('p7-dir', <Directions text="In this part you will read a selection of texts, such as magazine and newspaper articles, e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer for each question." />, true);
        // 1文書セット: 文書と設問を同じページに。入り切らない長文だけ見開きに割る
        t.part7single.forEach(set => {
            const key = `${set.kind}-${set.range}`;
            const g = `p7set-${key}`;
            groups.set(g, 'page-or-spread');
            full(`p7-intro-${key}`, <SetIntro text={set.intro} />, false, g);
            set.passages.forEach((p, i) => {
                full(`p7-psg-${key}-${i}`, (
                    <PassageBox heading={p.heading} body={p.body} label={set.passages.length > 1 ? `DOCUMENT ${i + 1} / ${set.passages.length}` : undefined} />
                ), false, g);
            });
            set.questions.forEach(q => col(`p7-${q.no}`, (
                <QBlock no={q.no} text={q.question} choices={q.choices} a={q.answer} show={o.showAnswers} />
            ), g));
        });

        // 複数文書セット (176-200): 本番と同じく必ず見開き。左ページに全文書、右ページに5問。
        // ページをめくらずに文書と設問を突き合わせられる = クロス問題が解ける
        t.part7multiple.forEach(set => {
            const key = `${set.kind}-${set.range}`;
            const g = `p7set-${key}`;
            groups.set(g, 'spread');
            full(`p7-intro-${key}`, <SetIntro text={set.intro} />, false, g);
            set.passages.forEach((p, i) => {
                full(`p7-psg-${key}-${i}`, (
                    <PassageBox heading={p.heading} body={p.body} label={`DOCUMENT ${i + 1} / ${set.passages.length}`} />
                ), false, g);
            });
            set.questions.forEach(q => col(`p7-${q.no}`, (
                <QBlock no={q.no} text={q.question} choices={q.choices} a={q.answer} show={o.showAnswers} />
            ), g));
        });
    }

    // ---- Stop ----
    full('stop', (
        <div style={{ paddingTop: '4mm' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '10pt', border: `2px solid ${INK}`, padding: '3mm 4mm' }}>
                Stop! This is the end of the test. If you finish before time is called,<br />
                you may go back to Parts 5, 6, and 7 and check your work.
            </div>
        </div>
    ));

    // ---- 巻末 ----
    if (o.includeExtras) {
        brk('before-marksheet', 'odd');   // 表面始まり: 裏が白紙になりシートを切り離せる
        full('marksheet', <MarkSheet hasListening={hasListening} hasReading={hasReading} />);
        brk('before-key', 'odd');
        full('anskey', <AnswerKey t={t} />);

        if (hasListening) {
            brk('before-scripts');
            full('sc-banner', <SectionBanner title="LISTENING SCRIPTS" range="リスニング台本 (試験後の復習用)" />, true);
            const scriptCol = (id: string, h: string, b: string) => col(id, (
                <div style={{ paddingBottom: '2mm' }}>
                    <span style={{ fontSize: '7.5pt', fontWeight: 700, color: '#777' }}>{h} </span>
                    <span style={{ fontSize: '8pt', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{b}</span>
                </div>
            ));
            const scriptTitle = (id: string, title: string) => full(id, (
                <div style={{ fontSize: '9pt', fontWeight: 800, color: GOLD, paddingTop: '2mm', paddingBottom: '1mm' }}>{title}</div>
            ), true);
            scriptTitle('sc1-t', 'Part 1 ・ Photographs');
            t.part1.forEach(q => scriptCol(`sc1-${q.no}`, `${q.no}.`, q.transcript));
            scriptTitle('sc2-t', 'Part 2 ・ Question-Response');
            t.part2.forEach(q => scriptCol(`sc2-${q.no}`, `${q.no}.`, `${q.prompt}\n(A) ${q.responses[0]?.text}  (B) ${q.responses[1]?.text}  (C) ${q.responses[2]?.text}`));
            scriptTitle('sc3-t', 'Part 3 ・ Conversations');
            t.part3.forEach(s => scriptCol(`sc3-${s.range}`, `Q${s.range}`, s.transcript));
            scriptTitle('sc4-t', 'Part 4 ・ Talks');
            t.part4.forEach(s => scriptCol(`sc4-${s.range}`, `Q${s.range}`, s.transcript));
        }

        full('tail-disclaimer', (
            <div style={{ paddingTop: '4mm' }}>
                <div style={{ borderTop: '1px solid #ccc', paddingTop: '2mm', fontSize: '7pt', lineHeight: 1.6, color: SOFT }}>{DISCLAIMER}</div>
            </div>
        ));
    }

    return { blocks: B, groups };
}

// ---- テストデータの取得 (?test=02 / 03) ----
const TEST_LOADERS: Record<string, () => Promise<{ default: ToeicTest }>> = {
    '01': () => import('@/data/english/toeic-test-01'),
    '02': () => import('@/data/english/toeic-test-02'),
    '03': () => import('@/data/english/toeic-test-03'),
    '04': () => import('@/data/english/toeic-test-04'),
    '05': () => import('@/data/english/toeic-test-05'),
    '06': () => import('@/data/english/toeic-test-06'),
    '07': () => import('@/data/english/toeic-test-07'),
    '08': () => import('@/data/english/toeic-test-08'),
};

function normalizeTestParam(raw: string | null): string {
    if (!raw) return '01';
    const n = raw.replace(/\D/g, '').padStart(2, '0');
    return TEST_LOADERS[n] ? n : '01';
}

// ---- ページ本体 ----

function ToeicPrintInner() {
    const params = useSearchParams();
    const testNo = normalizeTestParam(params.get('test'));

    const [test, setTest] = useState<ToeicTest | null>(null);
    const [showAnswers, setShowAnswers] = useState(false);
    const [listeningText, setListeningText] = useState(false); // 練習モード: L音声の英文も印刷
    const [includeExtras, setIncludeExtras] = useState(true);  // マークシート/解答/台本
    const [pages, setPages] = useState<PageOut[] | null>(null);
    /** 規定の収まりに入らなかったセットだけ、級数を落とす倍率 (グループID -> 0-1) */
    const [scales, setScales] = useState<Map<string, number>>(() => new Map());
    const measureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        TEST_LOADERS[testNo]().then(m => { if (!cancelled) setTest(m.default); });
        return () => { cancelled = true; };
    }, [testNo]);

    const built = useMemo(
        () => test ? buildBlocks(test, { showAnswers, listeningText, includeExtras }) : { blocks: [], groups: new Map<string, GroupMode>() },
        [test, showAnswers, listeningText, includeExtras]
    );
    const { blocks, groups } = built;
    const blockById = useMemo(() => {
        const m = new Map<string, ReactNode>();
        blocks.forEach(b => { if (b.kind !== 'break') m.set(b.id, b.el); });
        return m;
    }, [blocks]);
    /** 描画時に倍率を引くための ブロックID -> グループID */
    const groupOfBlock = useMemo(() => {
        const m = new Map<string, string>();
        blocks.forEach(b => { if (b.group) m.set(b.id, b.group); });
        return m;
    }, [blocks]);

    // ブロック列が変わったら組版し直し
    useEffect(() => { setPages(null); setScales(new Map()); }, [blocks]);

    useEffect(() => {
        if (pages !== null || blocks.length === 0) return;
        let cancelled = false;
        (async () => {
            try { await document.fonts?.ready; } catch { /* no-op */ }
            if (cancelled) return;
            const root = measureRef.current;
            if (!root) return;
            const probe = root.querySelector('[data-probe]') as HTMLElement | null;
            if (!probe) return;
            const pxPerMm = probe.getBoundingClientRect().width / 100;
            const H = CONTENT_H * pxPerMm;
            const nodes = new Map<string, HTMLElement>();
            root.querySelectorAll<HTMLElement>('[data-mid]').forEach(el => nodes.set(el.dataset.mid as string, el));
            const hmap = new Map<string, number>();
            const remeasure = (ids: Iterable<string>) => {
                for (const id of ids) {
                    const el = nodes.get(id);
                    if (el) hmap.set(id, el.getBoundingClientRect().height);
                }
            };
            remeasure(nodes.keys());

            // ---- 収まらないセットだけ級数を落として詰める ----
            // 本番の冊子も複数文書のページは本文が小さい。ここで縮めておかないと
            // 「文書が2ページに割れて設問はさらに次のページ」になる。
            const kit = makeLayout(groups, hmap, H);
            const sc = new Map<string, number>();
            const done = new Set<string>();
            blocks.forEach((b, i) => {
                if (!b.group || done.has(b.group)) return;
                done.add(b.group);
                const mode = groups.get(b.group) ?? 'page';
                const seq: Block[] = [];
                for (let k = i; k < blocks.length && blocks[k].group === b.group; k++) seq.push(blocks[k]);
                // 幅を 1/s に広げてから zoom で縮める = 版面いっぱいのまま級数だけ下がる
                const apply = (s: number) => {
                    seq.forEach(x => {
                        const el = nodes.get(x.id);
                        if (!el) return;
                        const w = x.kind === 'full' ? CONTENT_W : COL_W;
                        el.style.width = `${w / s}mm`;
                        el.style.zoom = s < 1 ? String(s) : '';
                    });
                    remeasure(seq.map(x => x.id));
                };
                const smaller = (s: number) => Math.round(s * 940) / 1000;

                // まず本番どおりの理想形を狙う。ただし読める級数 (9pt の 86% ≒ 7.7pt) まで
                let s = 1;
                while (s > IDEAL_FLOOR && !kit.idealFit(seq, mode)) { s = smaller(s); apply(s); }
                if (kit.idealFit(seq, mode)) { if (s < 1) sc.set(b.group, s); return; }
                // 届かないなら級数は戻し、「1ページ / 見開き2ページに収める」だけを守る
                s = 1;
                apply(1);
                while (s > 0.62 && !kit.fitGroup(seq, mode)) { s = smaller(s); apply(s); }
                if (s < 1) sc.set(b.group, s);
            });

            if (cancelled) return;
            setScales(sc);
            setPages(paginate(blocks, groups, hmap, H));
        })();
        return () => { cancelled = true; };
    }, [blocks, groups, pages]);

    // Stop ブロック以降のページには GO ON フッターを出さない
    const stopPageIdx = useMemo(() => {
        if (!pages) return -1;
        return pages.findIndex(p => p.bands.some(b =>
            (b.type === 'full' && b.id === 'stop') ||
            (b.type === 'cols' && [...b.left, ...b.right].includes('stop'))
        ));
    }, [pages]);

    const sheetCount = pages ? Math.ceil(pages.length / 2) : 0;

    /** 級数を落としたセットは、幅を広げて zoom で縮める (計測時と同じ組み方) */
    const renderBlock = (id: string, w: number) => {
        const s = scales.get(groupOfBlock.get(id) ?? '');
        const el = blockById.get(id);
        if (!s || s >= 1) return el;
        return <div style={{ width: `${w / s}mm`, zoom: s }}>{el}</div>;
    };

    return (
        <div className="pwrap" style={{ background: '#E9E7E0', minHeight: '100vh', padding: '16px 8px 60px' }}>
            <style>{`
                @page { size: A4 portrait; margin: 0; }
                @media print {
                    html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
                    .pwrap { background: #fff !important; padding: 0 !important; min-height: 0 !important; }
                    .no-print { display: none !important; }
                    .sheet { margin: 0 !important; box-shadow: none !important; break-after: page; }
                    .sheet:last-of-type { break-after: auto; }
                    /* サイト全体の金粉パーティクル演出(fixed overlay)が全ページに焼き込まれるのを防ぐ */
                    div.fixed.pointer-events-none { display: none !important; }
                    /* globals.css の会社ページ用印刷ルール(svg全非表示)を冊子内では打ち消す */
                    .sheet svg { display: block !important; visibility: visible !important; }
                }
                /* Part1 SVG: 明示サイズがないと印刷レイアウトで高さ0になる */
                .p1pic svg { width: 100%; height: 100%; display: block; }
                .sheet {
                    width: ${PAGE_W}mm; height: ${PAGE_H}mm; box-sizing: border-box; position: relative;
                    background: #fff; overflow: hidden; margin: 0 auto 14px; box-shadow: 0 4px 22px rgba(0,0,0,0.16);
                    -webkit-print-color-adjust: exact; print-color-adjust: exact;
                    font-family: -apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
                    color: ${INK}; overflow-wrap: break-word;
                }
            `}</style>

            {/* ---- ツールバー ---- */}
            <div className="no-print" style={{ maxWidth: '210mm', margin: '0 auto 12px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href={testNo === '01' ? '/english/toeic' : `/english/toeic/${Number(testNo)}`} style={{ textDecoration: 'none', color: '#444', fontSize: '13px', fontWeight: 700 }}>← 模試(画面版)に戻る</a>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444', fontWeight: 700, cursor: 'pointer' }}>
                        <input type="checkbox" checked={listeningText} onChange={e => setListeningText(e.target.checked)} />
                        リスニング英文も印刷 (練習用)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444', fontWeight: 700, cursor: 'pointer' }}>
                        <input type="checkbox" checked={includeExtras} onChange={e => setIncludeExtras(e.target.checked)} />
                        マークシート/解答/台本
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444', fontWeight: 700, cursor: 'pointer' }}>
                        <input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} />
                        解答を問題面に印字
                    </label>
                    <button onClick={() => window.print()} disabled={!pages} style={{ padding: '10px 22px', borderRadius: '8px', border: 'none', background: pages ? INK : '#999', color: '#fff', fontSize: '14px', fontWeight: 800, cursor: pages ? 'pointer' : 'wait' }}>印刷 / PDF保存</button>
                </div>
            </div>
            <div className="no-print" style={{ maxWidth: '210mm', margin: '0 auto 12px', fontSize: '11px', color: '#666', lineHeight: 1.8 }}>
                {pages
                    ? <><b style={{ color: INK, fontSize: '13px' }}>全 {pages.length} ページ = A4 {sheetCount} 枚(両面印刷)</b><br /></>
                    : <>組版中…<br /></>}
                印刷ダイアログの設定: 余白「<b>なし</b>(または既定)」/ 倍率「<b>100%</b>」/「ヘッダーとフッター」<b>オフ</b> /「背景のグラフィック」<b>オン</b> / 両面印刷は「<b>長辺とじ</b>」。
                マークシートのシートは裏面白紙なので切り離して使えます。
            </div>

            {/* ---- 計測用の非表示コンテナ ---- */}
            {pages === null && (
                <div ref={measureRef} aria-hidden style={{ position: 'absolute', left: '-9999px', top: 0, visibility: 'hidden', background: '#fff', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK, overflowWrap: 'break-word' }}>
                    <div data-probe style={{ width: '100mm', height: '1px' }} />
                    {blocks.map(b => b.kind === 'break' ? null : (
                        <div key={b.id} data-mid={b.id} style={{ width: `${b.kind === 'full' ? CONTENT_W : COL_W}mm` }}>{b.el}</div>
                    ))}
                </div>
            )}

            {/* ---- 確定組版シート ---- */}
            {pages && pages.map((pg, pi) => {
                const pageNo = pi + 1;
                const odd = pageNo % 2 === 1; // 奇数=右ページ: とじしろは左
                const showGoOn = pageNo > 1 && stopPageIdx >= 0 && pi < stopPageIdx;
                const isBlank = pg.bands.length === 1 && pg.bands[0].type === 'blank';
                return (
                    <div key={pi} className="sheet" style={{
                        paddingTop: `${M_TOP}mm`, paddingBottom: `${M_BOTTOM}mm`,
                        paddingLeft: `${odd ? M_BIND : M_OUTER}mm`, paddingRight: `${odd ? M_OUTER : M_BIND}mm`,
                    }}>
                        {pg.bands.map((band, bi) => {
                            if (band.type === 'blank') {
                                return (
                                    <div key={bi} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '8pt', letterSpacing: '2px', color: '#bbb', fontWeight: 700 }}>NO TEST MATERIAL ON THIS PAGE</span>
                                    </div>
                                );
                            }
                            if (band.type === 'full') {
                                return <div key={bi}>{renderBlock(band.id, CONTENT_W)}</div>;
                            }
                            return (
                                <div key={bi} style={{ display: 'flex', gap: `${COL_GAP}mm`, alignItems: 'flex-start' }}>
                                    <div style={{ width: `${COL_W}mm`, flexShrink: 0 }}>{band.left.map(id => <div key={id}>{renderBlock(id, COL_W)}</div>)}</div>
                                    <div style={{ width: `${COL_W}mm`, flexShrink: 0 }}>{band.right.map(id => <div key={id}>{renderBlock(id, COL_W)}</div>)}</div>
                                </div>
                            );
                        })}
                        {/* フッター: ページ番号 + 送り */}
                        {!isBlank && pageNo > 1 && (
                            <div style={{ position: 'absolute', bottom: '5mm', left: `${odd ? M_BIND : M_OUTER}mm`, right: `${odd ? M_OUTER : M_BIND}mm`, display: 'flex', alignItems: 'baseline' }}>
                                <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: '8pt', color: SUB }}>- {pageNo} -</span>
                                {showGoOn && (
                                    <span style={{ marginLeft: 'auto', fontSize: '8pt', fontWeight: 800, fontStyle: 'italic', letterSpacing: '0.5px', position: 'relative' }}>
                                        GO ON TO THE NEXT PAGE <span style={{ fontStyle: 'normal' }}>▶▶</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function ToeicPrintPage() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>読み込み中…</div>}>
            <ToeicPrintInner />
        </Suspense>
    );
}
