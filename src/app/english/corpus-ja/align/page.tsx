'use client';

// 実測の英訳と、直訳できるかどうか。
//
// 訳をAIに書かせたらそれは推測になる。ここに出るのは掘ったもので、
// 日英の対訳279万ペアを流して「その日本語が出てくる行に、実際どんな英語が居たか」を集めた。
//
// 直訳不可度は 1位の英語が対訳の何割に入っていたか の裏返し。
// ごめんね は sorry に寄るので低く、ってやつ は誰も過半を取れないので高い。
// 高いものほど「日本語のまま覚えても英語にならない」ので、そこが教材の本体になる。

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    JA_ALIGN_URL,
    JA_CHUNK_STATS,
    JA_KIND_LABELS,
    type JaAlignRow,
} from '@/data/english/ja-chunk-ranking';

const A = { ja: 0, kind: 1, hits: 2, pairs: 3, en: 4, spread: 5, solid: 6 } as const;
const PAGE = 60;
const N = (v: number) => v.toLocaleString();

type Sort = 'worth' | 'hard' | 'easy' | 'freq';

const SORTS: Array<{ v: Sort; name: string; desc: string }> = [
    { v: 'worth', name: '覚える価値順', desc: '知ってるのに英語にできない順。既定' },
    { v: 'hard', name: '直訳できない順', desc: '英語が毎回違うものだけ' },
    { v: 'easy', name: '直訳できる順', desc: '1対1で移せる。覚えなくていい側' },
    { v: 'freq', name: '出てくる順', desc: '口から出る回数が多いもの' },
];

/**
 * 覚える価値。
 *
 * 頻度だけで並べると「1 / 本当 / 今日 / 時間 / 好き」が上に来る。
 * 全部1対1で英語になるので、覚える必要が無い。
 * 直訳不可度だけで並べると、数回しか出ない語が上に来る。
 * 欲しいのは「日本語話者なら誰でも知っていて、英語にすると詰まる」層で、
 * それは頻度と直訳不可度の両方が要る。頻度は桁で効くので対数にする。
 */
const worth = (r: JaAlignRow) => r[A.spread] * Math.log10(r[A.hits] + 10);

export default function CorpusJaAlignPage() {
    const [rows, setRows] = useState<JaAlignRow[] | null>(null);
    const [query, setQuery] = useState('');
    const [kind, setKind] = useState(-1);
    const [sort, setSort] = useState<Sort>('worth');
    const [solidOnly, setSolidOnly] = useState(true);
    const [shown, setShown] = useState(PAGE);

    useEffect(() => {
        fetch(JA_ALIGN_URL)
            .then((r) => r.json())
            .then(setRows)
            .catch(() => setRows([]));
    }, []);

    const view = useMemo(() => {
        if (!rows) return [];
        const q = query.trim();
        const out = rows.filter((r) => {
            if (solidOnly && r[A.solid] !== 1) return false;
            if (kind !== -1 && r[A.kind] !== kind) return false;
            if (q && !r[A.ja].includes(q)) return false;
            return true;
        });
        if (sort === 'worth') out.sort((a, b) => worth(b) - worth(a));
        else if (sort === 'hard') out.sort((a, b) => b[A.spread] - a[A.spread] || b[A.hits] - a[A.hits]);
        else if (sort === 'easy') out.sort((a, b) => a[A.spread] - b[A.spread] || b[A.hits] - a[A.hits]);
        else out.sort((a, b) => b[A.hits] - a[A.hits]);
        return out;
    }, [rows, query, kind, sort, solidOnly]);

    useEffect(() => setShown(PAGE), [query, kind, sort, solidOnly]);

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-5 py-10 sm:py-14">
                <Link href="/english/corpus-ja" className="text-[12px] text-stone-500 hover:text-stone-800">
                    ← 日本語表現ランキング
                </Link>
                <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    実測の英訳 <span className="text-stone-400 text-lg font-normal">直訳できるかどうか</span>
                </h1>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed max-w-3xl">
                    日英の対訳 279万ペアを流して、日本語の表現ごとに
                    <strong className="font-semibold">実際に当たっていた英語</strong>を集めたもの。
                    {N(JA_CHUNK_STATS.aligned)} 件のうち、裏取りが十分なのは {N(JA_CHUNK_STATS.alignedSolid)} 件。
                    訳はAIが書いたものではなく、対訳から掘った実測値なので、生の英語がそのまま出る。
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {SORTS.map((s) => (
                        <button
                            key={s.v}
                            onClick={() => setSort(s.v)}
                            className={`rounded-xl border px-4 py-2.5 text-left transition-colors ${
                                sort === s.v
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                            }`}
                        >
                            <div className="text-sm font-medium">{s.name}</div>
                            <div className={`text-[11px] mt-0.5 ${sort === s.v ? 'text-stone-300' : 'text-stone-500'}`}>
                                {s.desc}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 space-y-3">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="日本語で探す (例: 別に / 気が / っていう)"
                        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-500 transition-colors"
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setKind(-1)}
                            className={`text-[12px] px-2.5 py-1 rounded-lg border transition-colors ${
                                kind === -1
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                            }`}
                        >
                            全部
                        </button>
                        {JA_KIND_LABELS.map((k, i) => (
                            <button
                                key={k.name}
                                onClick={() => setKind(kind === i ? -1 : i)}
                                className={`text-[12px] px-2.5 py-1 rounded-lg border transition-colors ${
                                    kind === i
                                        ? 'bg-stone-900 text-white border-stone-900'
                                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                {k.name}
                            </button>
                        ))}
                        <label className="flex items-center gap-1.5 text-[12px] text-stone-600 ml-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={solidOnly}
                                onChange={(e) => setSolidOnly(e.target.checked)}
                                className="accent-stone-900"
                            />
                            裏取りが十分なものだけ
                        </label>
                    </div>
                </div>

                <div className="mt-5 text-sm text-stone-600 tabular-nums">
                    {rows === null ? '読み込み中' : `${N(view.length)} 件`}
                </div>

                <div className="mt-3 space-y-2">
                    {view.slice(0, shown).map((r, i) => {
                        const hard = r[A.spread] >= 0.85;
                        const easy = r[A.spread] <= 0.55;
                        return (
                            <div
                                key={`${r[A.ja]}-${i}`}
                                className="rounded-xl border border-stone-200 bg-white px-4 py-3"
                            >
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <span className="font-semibold text-stone-900">{r[A.ja]}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded border bg-stone-100 text-stone-600 border-stone-200">
                                        {JA_KIND_LABELS[r[A.kind]]?.name}
                                    </span>
                                    <span className="text-[11px] text-stone-500 tabular-nums">
                                        生涯 {N(r[A.hits])} 回
                                    </span>
                                    <span className="text-[11px] text-stone-400 tabular-nums">
                                        裏取り {r[A.pairs]} ペア
                                    </span>
                                    <span
                                        className={`ml-auto text-[11px] tabular-nums px-2 py-0.5 rounded-full border ${
                                            hard
                                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                                : easy
                                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                  : 'bg-stone-50 text-stone-600 border-stone-200'
                                        }`}
                                    >
                                        直訳不可度 {r[A.spread].toFixed(2)}
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {r[A.en].map((e, j) => (
                                        <span
                                            key={`${e}-${j}`}
                                            className={`text-[13px] px-2 py-1 rounded-lg border ${
                                                j === 0
                                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-medium'
                                                    : 'bg-stone-50 text-stone-600 border-stone-200'
                                            }`}
                                        >
                                            {e}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    {rows !== null && view.length === 0 && (
                        <div className="rounded-xl border border-stone-200 bg-white px-4 py-10 text-center text-sm text-stone-500">
                            当てはまるものが無い
                        </div>
                    )}
                </div>

                {shown < view.length && (
                    <button
                        onClick={() => setShown((s) => s + 120)}
                        className="mt-4 w-full rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 transition-all"
                    >
                        もっと見る (残り {N(view.length - shown)})
                    </button>
                )}

                <div className="mt-8 rounded-xl border border-stone-200 bg-white p-5 text-[12px] text-stone-600 leading-relaxed space-y-2">
                    <p>
                        <strong className="text-stone-900">直訳不可度の読み方。</strong>
                        1位の英語が対訳の何割に入っていたかの裏返し。0に近いほど英語がいつも同じに寄る (ごめんね → sorry)。
                        1に近いほど場面ごとに別の英語になる (ってやつ / もんだ)。
                    </p>
                    <p>
                        英訳は対訳から掘った生の断片なので、そのまま使える形になっていないものもある。
                        1位が短い単語になるのは、その語が対訳のどの行にも入っていたということで、芯としては正しい。
                    </p>
                    <p>
                        出典は JESC (Stanford / Google Brain / 楽天技術研究所, CC BY-SA 4.0)。
                    </p>
                </div>
            </div>
        </div>
    );
}
