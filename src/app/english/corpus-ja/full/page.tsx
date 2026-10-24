'use client';

// 網羅版 — 日本語側の全在庫。
//
// 絞ったリストの隣に、絞る前のものを置く。「絞る」には必ず取りこぼしが出るからで、
// 実際この教材でも「だから」「やっぱり」「逆に」「だと思う」が消えていた時期がある。
// 何も失われていないことを、説明ではなく実物で確かめられるようにするため。

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    JA_CHUNK_URL,
    JA_CHUNK_STATS,
    JA_KIND_LABELS,
    JA_TIER_LABELS,
    JA_FORM_LABELS,
    type JaChunkRow,
} from '@/data/english/ja-chunk-ranking';

const C = { text: 0, n: 1, kind: 2, form: 3, hits: 4, perM: 5, pmi: 6, tier: 7, files: 8 } as const;
const PAGE = 100;
const N = (v: number) => v.toLocaleString();

const KIND_STYLE = [
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-sky-100 text-sky-800 border-sky-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-violet-100 text-violet-800 border-violet-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-stone-100 text-stone-700 border-stone-200',
    'bg-stone-100 text-stone-500 border-stone-200',
];

export default function CorpusJaFullPage() {
    const [rows, setRows] = useState<JaChunkRow[] | null>(null);
    const [query, setQuery] = useState('');
    const [kind, setKind] = useState(-1);
    const [form, setForm] = useState(-1);
    const [tier, setTier] = useState(-1);
    const [shown, setShown] = useState(PAGE);

    useEffect(() => {
        fetch(JA_CHUNK_URL)
            .then((r) => r.json())
            .then(setRows)
            .catch(() => setRows([]));
    }, []);

    const filtered = useMemo(() => {
        if (!rows) return [];
        const q = query.trim();
        return rows.filter((r) => {
            if (kind !== -1 && r[C.kind] !== kind) return false;
            if (form !== -1 && r[C.form] !== form) return false;
            if (tier !== -1 && r[C.tier] !== tier) return false;
            if (q && !r[C.text].includes(q)) return false;
            return true;
        });
    }, [rows, query, kind, form, tier]);

    useEffect(() => setShown(PAGE), [query, kind, form, tier]);

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-5 py-10 sm:py-14">
                <Link href="/english/corpus-ja" className="text-[12px] text-stone-500 hover:text-stone-800">
                    ← 日本語表現ランキング
                </Link>
                <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    網羅版 <span className="text-stone-400 text-lg font-normal">絞る前の全在庫</span>
                </h1>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed max-w-3xl">
                    全在庫 {N(JA_CHUNK_STATS.total)} 件のうち、出会う回数の多い上位 {N(JA_CHUNK_STATS.shown)} 件。
                    慣用句も相槌も活用も、捨てずに札だけ付けてある。数字は
                    <strong className="font-semibold">20歳までに何回出会うか</strong>。
                </p>

                {/* --- 絞り込み --- */}
                <div className="mt-6 space-y-3">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="日本語で探す (例: 気が / っていう / しとけば)"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-500 transition-colors"
                    />
                    <Chips
                        label="種類"
                        items={JA_KIND_LABELS.map((k, i) => ({ v: i, name: k.name, n: JA_CHUNK_STATS.byKind[i] }))}
                        value={kind}
                        onChange={setKind}
                    />
                    <div className="flex flex-wrap gap-4">
                        <Chips
                            label="形"
                            items={JA_FORM_LABELS.map((k, i) => ({ v: i, name: k, n: JA_CHUNK_STATS.byForm[i] }))}
                            value={form}
                            onChange={setForm}
                        />
                        <Chips
                            label="層"
                            items={JA_TIER_LABELS.map((k, i) => ({ v: i, name: k.name, n: JA_CHUNK_STATS.byTier[i] }))}
                            value={tier}
                            onChange={setTier}
                        />
                    </div>
                </div>

                <div className="mt-5 text-sm text-stone-600 tabular-nums">
                    {rows === null ? '読み込み中' : `${N(filtered.length)} 件`}
                </div>

                {/* --- 表 --- */}
                <div className="mt-3 rounded-xl border border-stone-200 bg-white overflow-hidden">
                    {filtered.slice(0, shown).map((r, i) => (
                        <div
                            key={`${r[C.text]}-${r[C.form]}-${i}`}
                            className="flex items-center gap-3 px-4 py-2.5 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors"
                        >
                            <span className="tabular-nums text-[11px] text-stone-400 w-12 shrink-0 text-right">
                                {i + 1}
                            </span>
                            <span className="font-medium text-stone-900 flex-1 min-w-0 break-all">{r[C.text]}</span>
                            <span
                                className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${KIND_STYLE[r[C.kind]] ?? KIND_STYLE[7]}`}
                            >
                                {JA_KIND_LABELS[r[C.kind]]?.name}
                            </span>
                            <span className="tabular-nums text-[11px] text-stone-500 w-16 shrink-0 text-right hidden sm:block">
                                {r[C.n]}語
                            </span>
                            <span className="tabular-nums text-sm text-stone-800 w-24 shrink-0 text-right">
                                {N(r[C.hits])}
                            </span>
                        </div>
                    ))}
                    {rows !== null && filtered.length === 0 && (
                        <div className="px-4 py-10 text-center text-sm text-stone-500">
                            当てはまるものが無い
                        </div>
                    )}
                </div>

                {shown < filtered.length && (
                    <button
                        onClick={() => setShown((s) => s + 200)}
                        className="mt-4 w-full rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 transition-all"
                    >
                        もっと見る (残り {N(filtered.length - shown)})
                    </button>
                )}

                <div className="mt-8 text-[12px] text-stone-500 leading-relaxed">
                    数字は生涯遭遇回数。20歳までに浴びる1.5億語で換算していて、定数は英語側の表と同じにしてある。
                    そうしないと2つの表を並べたときに比べられない。
                </div>
            </div>
        </div>
    );
}

function Chips({
    label,
    items,
    value,
    onChange,
}: {
    label: string;
    items: Array<{ v: number; name: string; n: number }>;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] tracking-wider text-stone-400 shrink-0">{label}</span>
            <button
                onClick={() => onChange(-1)}
                className={`text-[12px] px-2.5 py-1 rounded-lg border transition-colors ${
                    value === -1
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
            >
                全部
            </button>
            {items.map((it) => (
                <button
                    key={it.v}
                    onClick={() => onChange(value === it.v ? -1 : it.v)}
                    className={`text-[12px] px-2.5 py-1 rounded-lg border transition-colors ${
                        value === it.v
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                    }`}
                >
                    {it.name}
                    <span className="ml-1 tabular-nums opacity-60">{it.n.toLocaleString()}</span>
                </button>
            ))}
        </div>
    );
}
