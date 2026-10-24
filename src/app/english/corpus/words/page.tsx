'use client';

// 単語のランキング。チャンクの表とは別の楽しみ方をする場所。
// you を一生で515万回聞く、という数字そのものが読み物になる。
// 学習の主戦場はチャンク側で、こちらは「英語の正体を眺める」ページ。

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/** [word, per_million, hits_by_20] */
type WordRow = [string, number, number];

const PAGE = 100;

/** 眺めて面白い换算。数字が大きすぎて実感が湧かないのを助ける */
function funFact(rank: number, hits: number): string | null {
    if (rank === 0) return '3秒に1回ペースで20年聞き続けた計算';
    if (hits >= 1_000_000) return `${Math.round(hits / 1_000_000)}00万回級。呼吸に近い`;
    if (hits >= 100_000) return '毎日15回×20年ぶん';
    if (hits >= 10_000) return '毎日1〜2回は必ず耳に入る';
    return null;
}

export default function WordRankingPage() {
    const [rows, setRows] = useState<WordRow[] | null>(null);
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(PAGE);

    useEffect(() => {
        fetch('/data/word-ranking.json')
            .then((r) => r.json())
            .then(setRows)
            .catch(() => setRows([]));
    }, []);
    useEffect(() => setLimit(PAGE), [query]);

    const filtered = useMemo(() => {
        if (!rows) return [];
        const q = query.trim().toLowerCase();
        const list = rows.map((row, i) => ({ row, rank: i + 1 }));
        return q ? list.filter((r) => r.row[0].includes(q)) : list;
    }, [rows, query]);

    const max = rows?.[0]?.[2] ?? 1;

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-3xl mx-auto px-5 py-10">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-2">WORDS</div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                        英単語の生涯遭遇ランキング
                    </h1>
                    <p className="mt-3 text-stone-600 leading-relaxed max-w-xl">
                        ネイティブが20歳までに、その単語を何回聞くか。
                        1位は the ではなく <span className="font-mono font-bold text-stone-900">you</span> でした。
                        英語は書き言葉だと the の言語ですが、話し言葉だと you の言語です。
                    </p>
                    <div className="mt-5 flex gap-2 text-sm">
                        <Link href="/english/corpus/level" className="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium">
                            表現の課程へ
                        </Link>
                        <Link href="/english/corpus" className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700">
                            この表の作り方
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-5 py-8">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="単語を探す"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 mb-5"
                />

                <div className="space-y-1.5">
                    {filtered.slice(0, limit).map(({ row: [w, , hits], rank }) => {
                        const fact = funFact(rank - 1, hits);
                        return (
                            <div key={w} className="rounded-xl border border-stone-200 bg-white px-4 py-3 flex items-center gap-4">
                                <span className="w-12 shrink-0 text-right text-xs text-stone-400 tabular-nums">{rank.toLocaleString()}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="font-mono text-lg font-bold text-stone-900">{w}</span>
                                        {fact && <span className="text-[11px] text-stone-400">{fact}</span>}
                                    </div>
                                    <div className="mt-1.5 h-1.5 rounded-full bg-stone-100 overflow-hidden max-w-sm">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${Math.max(0.8, Math.sqrt(hits / max) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <div className="text-lg font-bold text-stone-900 tabular-nums leading-none">{hits.toLocaleString()}</div>
                                    <div className="text-[10px] text-stone-400 mt-0.5">回 / 20歳まで</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filtered.length > limit && (
                    <button
                        onClick={() => setLimit((l) => l + PAGE * 3)}
                        className="mt-5 w-full py-4 rounded-xl border border-stone-300 bg-white text-stone-700 font-medium hover:bg-stone-50"
                    >
                        さらに表示（残り {(filtered.length - limit).toLocaleString()} 語）
                    </button>
                )}
            </div>
        </div>
    );
}
