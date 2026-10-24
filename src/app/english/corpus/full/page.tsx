'use client';

// 網羅版 — ふるいにかける前の全在庫。
//
// 課程(/english/corpus/level)は絞ったあとのリストで、これはその手前。
// 「絞る」という操作には必ず取りこぼしが出る。実際、この教材でも
// look into や back off が消えていた時期がある(生涯2700回・1482回の表現)。
//
// だから絞ったリストの隣に、絞る前のものを丸ごと置く。
// 課程に無い表現も、ここに在れば数字が付いた状態で引ける。
// 何も失われていないことを、説明ではなく実物で確かめられるようにするため。

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { KIND_LABELS, GROUP_LABELS } from '@/data/english/chunk-ranking';
import { glossFor } from '@/data/english/chunk-gloss';

/** [表現, 種類, 区分, 生涯遭遇, 結束度, 課程のレベル(0=課程外)] */
type FullRow = [string, number, number, number, number, number];
type Index = { total: number; inCourse: number; buckets: Array<[string, number, number]> };

const F = { text: 0, kind: 1, group: 2, hits: 3, pmi: 4, level: 5 } as const;
const PAGE = 100;

const KIND_STYLE = [
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-sky-100 text-sky-800 border-sky-200',
    'bg-stone-100 text-stone-700 border-stone-200',
];

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

type Scope = 'all' | 'course' | 'outside';

export default function CorpusFullPage() {
    const [index, setIndex] = useState<Index | null>(null);
    const [letter, setLetter] = useState('a');
    const [cache, setCache] = useState<Record<string, FullRow[]>>({});
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [scope, setScope] = useState<Scope>('all');
    const [kind, setKind] = useState(-1);
    const [shown, setShown] = useState(PAGE);
    const [loadedAll, setLoadedAll] = useState(false);

    useEffect(() => {
        fetch('/data/full/index.json')
            .then((r) => r.json())
            .then(setIndex)
            .catch(() => setIndex(null));
    }, []);

    /** 頭文字ごとに、そのときだけ読む。全部で20万件あるので一度には読まない */
    const need = useCallback(
        async (keys: string[]) => {
            const missing = keys.filter((k) => !cache[k]);
            if (!missing.length) return;
            setLoading(true);
            const got: Record<string, FullRow[]> = {};
            await Promise.all(
                missing.map(async (k) => {
                    try {
                        got[k] = await (await fetch(`/data/full/${k}.json`)).json();
                    } catch {
                        got[k] = [];
                    }
                })
            );
            setCache((c) => ({ ...c, ...got }));
            setLoading(false);
        },
        [cache]
    );

    useEffect(() => {
        if (index) void need([letter]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [letter, index]);

    // 検索語の頭文字が分かるなら、その袋だけ読めば足りる
    const q = query.trim().toLowerCase();
    useEffect(() => {
        if (!q || loadedAll) return;
        const head = /^[a-z]/.test(q) ? q[0] : null;
        if (head) void need([head]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, loadedAll]);

    const loadEverything = async () => {
        if (!index) return;
        await need(index.buckets.map((b) => b[0]));
        setLoadedAll(true);
    };

    const rows = useMemo(() => {
        let pool: FullRow[];
        if (q) {
            // 語の途中でも当たるようにしているので、全部読んでいればそこから探す
            pool = loadedAll
                ? Object.values(cache).flat()
                : (cache[/^[a-z]/.test(q) ? q[0] : '_'] ?? []);
            pool = pool.filter((r) => r[F.text].includes(q));
        } else {
            pool = cache[letter] ?? [];
        }
        if (scope === 'course') pool = pool.filter((r) => r[F.level] > 0);
        if (scope === 'outside') pool = pool.filter((r) => r[F.level] === 0);
        if (kind >= 0) pool = pool.filter((r) => r[F.kind] === kind);
        return pool;
    }, [cache, letter, q, scope, kind, loadedAll]);

    useEffect(() => setShown(PAGE), [letter, q, scope, kind]);

    const pct = index ? (index.inCourse / index.total) * 100 : 0;

    return (
        <div className="min-h-screen bg-stone-50">
            {/* 見出し */}
            <div className="border-b border-stone-200 bg-white">
                <div className="mx-auto max-w-5xl px-5 py-8">
                    <Link href="/english/corpus" className="text-xs tracking-wider text-stone-400 hover:text-stone-600">
                        CORPUS
                    </Link>
                    <h1 className="mt-2 text-2xl font-medium tracking-wide text-stone-900">網羅版</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
                        絞る前の全在庫。課程はここから選んだものなので、
                        <span className="font-medium text-stone-800">課程に無い表現もここには残っている</span>。
                        構造的なゴミ（文の断片、配布物の定型文、非英語）だけ落として、
                        「よく使うか」の判断はしていない。
                    </p>

                    {index && (
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <Stat label="在庫" value={index.total.toLocaleString()} unit="件" />
                            <Stat label="うち課程に採用" value={index.inCourse.toLocaleString()} unit={`件 (${pct.toFixed(0)}%)`} />
                            <Stat label="課程に入っていない" value={(index.total - index.inCourse).toLocaleString()} unit="件" tone="amber" />
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-5 py-6">
                {/* 探す */}
                <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="表現を探す（look into / up / お好きな語）"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition-all focus:border-emerald-300 focus:bg-white"
                    />

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {(
                            [
                                ['all', 'すべて'],
                                ['course', '課程にある'],
                                ['outside', '課程の外'],
                            ] as Array<[Scope, string]>
                        ).map(([k, label]) => (
                            <button
                                key={k}
                                onClick={() => setScope(k)}
                                className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                                    scope === k
                                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                        : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                        <span className="mx-1 h-4 w-px bg-stone-200" />
                        <button
                            onClick={() => setKind(-1)}
                            className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                                kind === -1 ? 'border-stone-400 bg-stone-100 text-stone-800' : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                            }`}
                        >
                            全種類
                        </button>
                        {KIND_LABELS.map((k, i) => (
                            <button
                                key={k.name}
                                onClick={() => setKind(i)}
                                className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                                    kind === i ? KIND_STYLE[i] : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                                }`}
                            >
                                {k.name}
                            </button>
                        ))}
                    </div>

                    {q && !loadedAll && (
                        <button
                            onClick={loadEverything}
                            className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 transition-all hover:bg-amber-100"
                        >
                            いまは「{/^[a-z]/.test(q) ? q[0] : 'その他'}」で始まる分だけ見ています。全部から探す
                        </button>
                    )}
                </div>

                {/* 頭文字 */}
                {!q && (
                    <div className="mt-4 flex flex-wrap gap-1">
                        {LETTERS.map((l) => {
                            const n = index?.buckets.find((b) => b[0] === l)?.[1] ?? 0;
                            return (
                                <button
                                    key={l}
                                    onClick={() => setLetter(l)}
                                    disabled={!n}
                                    className={`h-9 w-9 rounded-lg border text-sm transition-all ${
                                        letter === l
                                            ? 'border-emerald-400 bg-emerald-50 font-medium text-emerald-800'
                                            : n
                                              ? 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                                              : 'border-stone-100 bg-stone-50 text-stone-300'
                                    }`}
                                >
                                    {l}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 件数 */}
                <div className="mt-5 flex items-baseline justify-between">
                    <p className="text-sm text-stone-500">
                        {loading ? '読み込み中' : `${rows.length.toLocaleString()} 件`}
                    </p>
                    {rows.length > shown && (
                        <p className="text-xs text-stone-400">
                            {shown.toLocaleString()} 件表示中
                        </p>
                    )}
                </div>

                {/* 本体 */}
                <div className="mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                    {rows.slice(0, shown).map((r) => {
                        const gloss = glossFor(r[F.text]);
                        return (
                            <div
                                key={r[F.text]}
                                className="flex items-start gap-3 border-b border-stone-100 px-4 py-3 last:border-0 hover:bg-stone-50"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-stone-900">{r[F.text]}</span>
                                        <span className={`rounded border px-1.5 py-0.5 text-[10px] ${KIND_STYLE[r[F.kind]]}`}>
                                            {KIND_LABELS[r[F.kind]]?.name}
                                        </span>
                                        {r[F.group] === 2 && (
                                            <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px] text-stone-500">
                                                {GROUP_LABELS[2].name}
                                            </span>
                                        )}
                                    </div>
                                    {gloss?.ja && <p className="mt-1 text-xs text-stone-500">{gloss.ja}</p>}
                                </div>

                                <div className="shrink-0 text-right">
                                    <div className="text-sm tabular-nums text-stone-700">
                                        {r[F.hits].toLocaleString()}
                                        <span className="ml-1 text-[10px] text-stone-400">回</span>
                                    </div>
                                    {r[F.level] > 0 ? (
                                        <Link
                                            href={`/english/corpus/level?lv=${r[F.level]}`}
                                            className="mt-1 inline-block rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700 hover:bg-emerald-100"
                                        >
                                            Lv{r[F.level]}
                                        </Link>
                                    ) : (
                                        <span className="mt-1 inline-block rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px] text-stone-400">
                                            課程外
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {!loading && !rows.length && (
                        <p className="px-4 py-10 text-center text-sm text-stone-400">
                            該当なし。コーパスに一度も出ていないか、綴りが違います
                        </p>
                    )}
                </div>

                {rows.length > shown && (
                    <button
                        onClick={() => setShown((s) => s + PAGE * 5)}
                        className="mt-4 w-full rounded-xl border border-stone-200 bg-white py-3 text-sm text-stone-600 transition-all hover:border-stone-300 hover:bg-stone-50"
                    >
                        さらに読む
                    </button>
                )}

                {/* この表の読み方 */}
                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 text-sm leading-relaxed text-stone-600">
                    <h2 className="mb-2 font-medium tracking-wide text-stone-800">なぜ2本あるのか</h2>
                    <p>
                        1本のリストを絞ろうとすると、緩めればゴミが混ざり、締めれば本物が死ぬ。
                        実際に測ったところ、日常的な句動詞19個のうち
                        <span className="font-medium text-stone-800">12個がランキングから消えていた</span>。
                        look into（生涯2,700回）も back off（1,482回）も、統計上は
                        「部品が両方とも普通すぎる」ため埋もれる。
                    </p>
                    <p className="mt-3">
                        そこで絞るのをやめて、2本に分けた。ここが在庫、
                        <Link href="/english/corpus/level" className="text-emerald-700 underline underline-offset-2">
                            課程
                        </Link>
                        が選抜。課程を厳しくしても在庫には残っているので、取りこぼしが起きない。
                        作り方と限界は{' '}
                        <Link href="/english/corpus/report" className="text-emerald-700 underline underline-offset-2">
                            報告書
                        </Link>
                        に全部書いてある。
                    </p>
                </div>
            </div>
        </div>
    );
}

function Stat({ label, value, unit, tone }: { label: string; value: string; unit: string; tone?: 'amber' }) {
    return (
        <div className={`rounded-xl border p-3 ${tone === 'amber' ? 'border-amber-200 bg-amber-50' : 'border-stone-200 bg-stone-50'}`}>
            <p className="text-[11px] tracking-wider text-stone-500">{label}</p>
            <p className="mt-1 text-xl font-medium tabular-nums text-stone-900">
                {value}
                <span className="ml-1 text-[11px] font-normal text-stone-500">{unit}</span>
            </p>
        </div>
    );
}
