'use client';

// CHUNK RANKING — 実測1.05億語から抜いた多語表現。課程は10.6万件、絞る前の網羅版は13.5万件。
// 推測ではなく数えた結果。作り方と限界は docs/chunk-corpus-spec.md
// 5つの指針: 生涯遭遇 / 生活頻度 / 語域 / 結束度 / 語数

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    CHUNK_DATA_URL,
    CHUNK_STATS,
    COVERAGE_CURVE,
    TIER_LABELS,
    KIND_LABELS,
    GROUP_LABELS,
    REGISTER_LABELS,
    type ChunkRow,
} from '@/data/english/chunk-ranking';
import { CHUNK_GLOSS, GLOSS_COUNT, glossFor } from '@/data/english/chunk-gloss';

/** 表現 -> 実際に言っている瞬間。{ v: 動画ID, t: 秒, s: その一文 } */
type Clip = { v: string; t: number; s: string };

const PAGE_SIZE = 60;

/**
 * 課程の大きさ。ここまでやれば終わり、と言い切る数。
 * 上位3000で日常英語のおよそ4割が既知の塊で埋まる(実測)。
 * 10万件は在庫であって課程ではない。無限に見えた瞬間に人は走れなくなる。
 */
const COURSE_SIZE = 3000;
const STORE_KEY = 'chunk-learned-v1';

// タプルの添字。データは配列で持っているので名前をここで与える
const C = { text: 0, kind: 1, group: 2, reg: 3, life: 4, hits: 5, pmi: 6, tier: 7, yt: 8, sub: 9, mov: 10, modern: 11, book: 12 } as const;

const KIND_STYLE = [
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-sky-100 text-sky-800 border-sky-200',
    'bg-stone-100 text-stone-700 border-stone-200',
];

const TIER_COLOR = [
    { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', bar: 'bg-amber-500' },
    { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-800', bar: 'bg-emerald-500' },
    { bg: 'bg-sky-50', border: 'border-sky-300', text: 'text-sky-800', bar: 'bg-sky-500' },
    { bg: 'bg-stone-50', border: 'border-stone-300', text: 'text-stone-700', bar: 'bg-stone-400' },
    { bg: 'bg-stone-50', border: 'border-stone-200', text: 'text-stone-600', bar: 'bg-stone-300' },
];

const REGISTER_STYLE = [
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-stone-100 text-stone-700 border-stone-200',
    'bg-amber-100 text-amber-800 border-amber-200',
];

type SortKey = 'rank' | 'hits' | 'pmi' | 'len';

/**
 * 語域のバランス。どの分野でも使われる表現ほど高くなる。
 *
 * at the same time は会話・ドラマ・論説・古典の全部に出る。どこでも通じる。
 * son of a bitch はドラマにしか出ない。覚える価値はあるが、使える場面は狭い。
 * この差は語域ごとの出現率の偏りそのもので、エントロピーで数値化できる。
 * 1.0 = 完全に均等 / 0 = 1つの語域だけ。
 */
function balanceOf(segs: Array<{ label: string; v: number }>) {
    const tot = segs.reduce((a, s) => a + s.v, 0);
    if (!tot) return { score: 0, dom: '', domShare: 0 };
    const ps = segs.map((s) => s.v / tot);
    const H = -ps.reduce((a, p) => a + (p > 0 ? p * Math.log(p) : 0), 0) / Math.log(segs.length);
    const max = Math.max(...ps);
    return { score: H, dom: segs[ps.indexOf(max)].label, domShare: max };
}

export default function CorpusRankingPage() {
    const [query, setQuery] = useState('');
    const [tier, setTier] = useState<number | null>(null);
    const [reg, setReg] = useState<number | null>(null);
    const [kind, setKind] = useState<number | null>(null);
    const [group, setGroup] = useState<number>(0);
    const [learned, setLearned] = useState<Set<string>>(new Set());
    const [onlyUnlearned, setOnlyUnlearned] = useState(false);

    // 覚えたものは端末に残す。ログイン不要で残数が減る体験だけを作る
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORE_KEY);
            if (raw) setLearned(new Set(JSON.parse(raw)));
        } catch {
            /* 壊れていたら空で始める */
        }
    }, []);

    const toggleLearned = (text: string) => {
        setLearned((prev) => {
            const next = new Set(prev);
            if (next.has(text)) next.delete(text);
            else next.add(text);
            try {
                localStorage.setItem(STORE_KEY, JSON.stringify([...next]));
            } catch {
                /* 保存できなくても操作は続けられる */
            }
            return next;
        });
    };
    const [sort, setSort] = useState<SortKey>('rank');
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [open, setOpen] = useState<number | null>(null);
    const [rows, setRows] = useState<ChunkRow[] | null>(null);
    const [onlyGlossed, setOnlyGlossed] = useState(false);
    const [clips, setClips] = useState<Record<string, Clip[]>>({});

    // 本体は JSON で配信している。件数が増えてもバンドルは重くならない
    useEffect(() => {
        let alive = true;
        fetch(CHUNK_DATA_URL)
            .then((r) => r.json())
            .then((d: ChunkRow[]) => alive && setRows(d))
            .catch(() => alive && setRows([]));
        return () => {
            alive = false;
        };
    }, []);

    // 実例の索引。音も映像も持たず、動画IDと秒数だけ
    useEffect(() => {
        let alive = true;
        fetch('/data/chunk-clips.json')
            .then((r) => r.json())
            .then((d) => alive && setClips(d))
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);

    // 絞り込みが変わったら先頭に戻す
    useEffect(() => setLimit(PAGE_SIZE), [query, tier, reg, kind, sort, onlyGlossed, group, onlyUnlearned]);

    const filtered = useMemo(() => {
        if (!rows) return [];
        const q = query.trim().toLowerCase();
        let list: Array<{ row: ChunkRow; rank: number }> = rows.map((row, i) => ({ row, rank: i + 1 }));

        if (q) list = list.filter((r) => r.row[C.text].includes(q));
        if (tier !== null) list = list.filter((r) => r.row[C.tier] === tier);
        if (reg !== null) list = list.filter((r) => r.row[C.reg] === reg);
        list = list.filter((r) => r.row[C.group] === group);
        if (kind !== null) list = list.filter((r) => r.row[C.kind] === kind);
        if (onlyGlossed) list = list.filter((r) => CHUNK_GLOSS[r.row[C.text]]);
        if (onlyUnlearned) list = list.filter((r) => !learned.has(r.row[C.text]));

        if (sort === 'hits') list = [...list].sort((a, b) => b.row[C.hits] - a.row[C.hits]);
        else if (sort === 'pmi') list = [...list].sort((a, b) => b.row[C.pmi] - a.row[C.pmi]);
        else if (sort === 'len') list = [...list].sort((a, b) => b.row[C.pmi] - a.row[C.pmi]);

        return list;
    }, [rows, query, tier, reg, kind, sort, onlyGlossed, group, onlyUnlearned, learned]);

    const maxHits = filtered.length ? Math.max(...filtered.slice(0, 400).map((r) => r.row[C.hits])) : 1;

    return (
        <div className="min-h-screen bg-stone-50">
            {/* ヘッダ */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-5 py-10">
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                        <div>
                            <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-3">CHUNK RANKING</div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                                実測でつくった英語表現ランキング
                            </h1>
                            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
                                {(CHUNK_STATS.corpusWords / 100_000_000).toFixed(2)}億語の実データを機械で数えた結果。推測はひとつも入っていません。
                                ネイティブとの差は基礎5000単語ではなく、この塊をいくつ持っているかに出ます。
                            </p>
                        </div>
                        <Link
                            href="/english/corpus/report"
                            className="shrink-0 px-5 py-3 rounded-xl border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all"
                        >
                            報告書と改善案
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { k: '収録表現', v: CHUNK_STATS.total.toLocaleString() },
                            { k: '数えた語数', v: `${Math.round(CHUNK_STATS.corpusWords / 10000).toLocaleString()}万語` },
                            // 論説と古典は配合から外した。スピーキングとリスニングに特化するため
                            { k: '分野', v: '映像字幕/素の会話/映画脚本' },
                            { k: 'AIの推測', v: 'ゼロ' },
                        ].map((s) => (
                            <div key={s.k} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                                <div className="text-[11px] tracking-wider text-stone-500">{s.k}</div>
                                <div className="text-xl font-bold text-stone-900 mt-0.5">{s.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 残り何個か */}
            <div className="max-w-6xl mx-auto px-5 pt-8">
                <Progress rows={rows} learned={learned} />
            </div>

            {/* どこまでやれば終わりか */}
            <div className="max-w-6xl mx-auto px-5 pt-8">
                <CoverageChart />
            </div>

            {/* 5つの指針の説明 */}
            <div className="max-w-6xl mx-auto px-5 pt-8">
                <div className="rounded-2xl border border-stone-200 bg-white p-5">
                    <div className="text-xs tracking-widest text-stone-400 font-medium mb-4">5つの指針</div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            ['生涯遭遇', 'ネイティブが20歳までに何回会うか。この数字が大きいほど、口から自然に出る'],
                            ['生活頻度', '100万語あたりの出現。会話も映像も本も混ぜた配合で算出'],
                            ['語域', '話し言葉か、書き言葉か、両方か。口に入れるものと読めればいいものを分ける'],
                            ['結束度', '部品の頻度から予想されるより、どれだけ多く一緒に出るか。高いほど1個の部品'],
                            ['種類', '句動詞か、イディオムか、会話の型か。何語かではなく、何であるかで分ける'],
                        ].map(([k, v]) => (
                            <div key={k}>
                                <div className="text-sm font-bold text-stone-900 mb-1">{k}</div>
                                <div className="text-xs text-stone-600 leading-relaxed">{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 絞り込み */}
            <div className="max-w-6xl mx-auto px-5 pt-6 pb-4 sticky top-0 z-10">
                <div className="rounded-2xl border border-stone-200 bg-white/95 backdrop-blur p-4 shadow-sm">
                    {/* 会話表現と語彙は覚え方が違うので混ぜない */}
                    <div className="flex gap-2 mb-3">
                        {GROUP_LABELS.map((g, i) => (
                            <button
                                key={g.name}
                                onClick={() => setGroup(i)}
                                className={`flex-1 px-4 py-3 rounded-xl border text-left transition-all ${
                                    group === i
                                        ? 'bg-stone-900 text-white border-stone-900'
                                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                <div className="font-bold text-sm flex items-baseline gap-2">
                                    {g.name}
                                    <span className={`text-xs font-normal ${group === i ? 'text-stone-300' : 'text-stone-400'}`}>
                                        {(CHUNK_STATS.byGroup[i] ?? 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className={`text-[11px] mt-0.5 leading-snug ${group === i ? 'text-stone-300' : 'text-stone-500'}`}>
                                    {g.desc}
                                </div>
                            </button>
                        ))}
                    </div>

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="表現を検索  (例: keep an eye / end of the day / out of)"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-all"
                    />

                    <div className="mt-3 flex flex-wrap gap-4">
                        <FilterGroup label="層">
                            <Chip active={tier === null} onClick={() => setTier(null)}>すべて</Chip>
                            {TIER_LABELS.map((t, i) =>
                                CHUNK_STATS.byTier[i] > 0 ? (
                                    <Chip key={t.name} active={tier === i} onClick={() => setTier(tier === i ? null : i)}>
                                        {t.name}
                                        <span className="ml-1.5 opacity-60">{CHUNK_STATS.byTier[i].toLocaleString()}</span>
                                    </Chip>
                                ) : null
                            )}
                        </FilterGroup>

                        <FilterGroup label="語域">
                            <Chip active={reg === null} onClick={() => setReg(null)}>すべて</Chip>
                            {REGISTER_LABELS.map((r, i) => (
                                <Chip key={r} active={reg === i} onClick={() => setReg(reg === i ? null : i)}>{r}</Chip>
                            ))}
                        </FilterGroup>

                        <FilterGroup label="種類">
                            <Chip active={kind === null} onClick={() => setKind(null)}>すべて</Chip>
                            {KIND_LABELS.map((k, i) => (
                                <Chip key={k.name} active={kind === i} onClick={() => setKind(kind === i ? null : i)}>
                                    {k.name}
                                    <span className="ml-1.5 opacity-60">{(CHUNK_STATS.byKind[i] ?? 0).toLocaleString()}</span>
                                </Chip>
                            ))}
                        </FilterGroup>

                        <FilterGroup label="進み">
                            <Chip active={!onlyUnlearned} onClick={() => setOnlyUnlearned(false)}>すべて</Chip>
                            <Chip active={onlyUnlearned} onClick={() => setOnlyUnlearned(true)}>まだのだけ</Chip>
                        </FilterGroup>

                        <FilterGroup label="解説">
                            <Chip active={!onlyGlossed} onClick={() => setOnlyGlossed(false)}>すべて</Chip>
                            <Chip active={onlyGlossed} onClick={() => setOnlyGlossed(true)}>
                                訳つき<span className="ml-1.5 opacity-60">{GLOSS_COUNT}</span>
                            </Chip>
                        </FilterGroup>

                        <FilterGroup label="並び">
                            {([['rank', '総合'], ['hits', '遭遇順'], ['pmi', '結束の強い順']] as const).map(([k, l]) => (
                                <Chip key={k} active={sort === k} onClick={() => setSort(k)}>{l}</Chip>
                            ))}
                        </FilterGroup>
                    </div>

                    <div className="mt-3 text-xs text-stone-500">
                        {rows === null ? '読み込み中...' : `${filtered.length.toLocaleString()} 件が該当`}
                        {filtered.length > limit && <span> / {limit.toLocaleString()} 件を表示中</span>}
                    </div>
                </div>
            </div>

            {/* 一覧 */}
            <div className="max-w-6xl mx-auto px-5 pb-16">
                <div className="space-y-2">
                    {filtered.slice(0, limit).map(({ row, rank }) => {
                        const t = TIER_COLOR[row[C.tier]];
                        const gloss = glossFor(row[C.text]);
                        const clip = clips[row[C.text]];
                        const done = learned.has(row[C.text]);
                        const isOpen = open === rank;
                        const total = row[C.yt] + row[C.sub] + row[C.mov] + row[C.modern] + row[C.book] || 1;
                        // 字幕(OpenSubtitles)と映画脚本(Cornell)はどちらもフィクションの台詞。
                        // データ源が別なだけで、見る側に区別する意味が無いのでまとめる
                        const segs = [
                            { label: '素の会話', v: row[C.yt], color: 'bg-emerald-500' },
                            { label: '映画・ドラマ', v: row[C.sub] + row[C.mov], color: 'bg-sky-500' },
                            { label: '論説・講演', v: row[C.modern], color: 'bg-rose-500' },
                            { label: '古典', v: row[C.book], color: 'bg-amber-500' },
                        ];
                        const bal = balanceOf(segs);

                        return (
                            <div
                                key={`${row[C.text]}-${rank}`}
                                className={`rounded-xl border bg-white overflow-hidden transition-all ${
                                    isOpen ? 'border-stone-400 shadow-md' : done ? 'border-emerald-200' : 'border-stone-200 hover:border-stone-300'
                                }`}
                            >
                                <div className="flex items-stretch">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLearned(row[C.text]);
                                    }}
                                    aria-label={done ? '未習得に戻す' : '覚えた'}
                                    className={`shrink-0 w-12 flex items-center justify-center border-r transition-all ${
                                        done
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'bg-stone-50 border-stone-100 text-stone-300 hover:bg-emerald-50 hover:text-emerald-500'
                                    }`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setOpen(isOpen ? null : rank)}
                                    className="flex-1 min-w-0 text-left px-4 py-3.5 flex items-center gap-4"
                                >
                                    <div className="w-12 shrink-0 text-right">
                                        <div className="text-xs text-stone-400 tabular-nums">{rank.toLocaleString()}</div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-stone-900 text-[15px] sm:text-base truncate">
                                            {row[C.text]}
                                        </div>
                                        {gloss && (
                                            <div className="text-[13px] text-stone-500 truncate mt-0.5">{gloss.ja}</div>
                                        )}
                                        <div className="mt-1.5 flex items-center gap-2 max-w-md">
                                            <div className="flex-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                                                <div
                                                    className={`h-full ${t.bar} rounded-full`}
                                                    style={{ width: `${Math.max(2, Math.min(100, (row[C.hits] / maxHits) * 100))}%` }}
                                                />
                                            </div>
                                            {/* どの語域に住んでいるか。開かなくても偏りが見えるようにする */}
                                            <div className="hidden sm:flex h-1.5 w-16 rounded-full overflow-hidden bg-stone-100 shrink-0">
                                                {segs.map((sg) => (
                                                    <div key={sg.label} className={sg.color} style={{ width: `${(sg.v / total) * 100}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${REGISTER_STYLE[row[C.reg]]}`}>
                                            {REGISTER_LABELS[row[C.reg]]}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${KIND_STYLE[row[C.kind]]}`}>
                                            {KIND_LABELS[row[C.kind]]?.name}
                                        </span>
                                        {bal.score >= 0.75 ? (
                                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                                万能
                                            </span>
                                        ) : bal.domShare >= 0.7 ? (
                                            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-500 border border-stone-200">
                                                {bal.dom}寄り
                                            </span>
                                        ) : null}
                                        {clip?.length > 0 && (
                                            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-600 text-white">
                                                実例{clip.length}
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-24 sm:w-28 shrink-0 text-right">
                                        <div className="text-lg font-bold text-stone-900 tabular-nums leading-none">
                                            {row[C.hits].toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-stone-400 mt-1">生涯遭遇</div>
                                    </div>
                                </button>
                                </div>

                                {isOpen && (
                                    <div className="px-4 pb-4 pt-1 border-t border-stone-100">
                                        <div className="grid sm:grid-cols-3 gap-4 mt-3">
                                            <Metric label="生活頻度" value={`${row[C.life].toFixed(2)}`} unit="回 / 100万語" />
                                            <Metric label="結束度 (PMI)" value={row[C.pmi].toFixed(1)} unit="高いほど1個の部品" />
                                            <Metric label="種類" value={KIND_LABELS[row[C.kind]]?.name ?? '-'} unit={KIND_LABELS[row[C.kind]]?.desc ?? ''} />
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex items-baseline justify-between gap-3 mb-2">
                                                <span className="text-[11px] tracking-wider text-stone-400">どの分野で使われるか</span>
                                                <span className="text-[11px] text-stone-500">
                                                    まんべんなく出る表現ほど、どこでも通じます
                                                </span>
                                            </div>
                                            <div className="flex h-2.5 rounded-full overflow-hidden bg-stone-100">
                                                {segs.map((s) => (
                                                    <div key={s.label} className={s.color} style={{ width: `${(s.v / total) * 100}%` }} />
                                                ))}
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                                {segs.map((s) => (
                                                    <div key={s.label} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                                                        <span className={`w-2 h-2 rounded-sm ${s.color}`} />
                                                        {s.label}
                                                        <span className="tabular-nums text-stone-400">{s.v.toFixed(1)}/M</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {gloss?.note && (
                                            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                                                <div className="text-[11px] tracking-wider text-amber-700 font-medium mb-1">
                                                    知っているのに出てこない理由
                                                </div>
                                                <div className="text-sm text-stone-800 leading-relaxed">{gloss.note}</div>
                                            </div>
                                        )}

                                        {clip?.length > 0 && (
                                            <div className="mt-4">
                                                <div className="text-[11px] tracking-wider text-stone-400 mb-2">
                                                    実際に言っている瞬間 ({clip.length}件)
                                                </div>
                                                <div className="space-y-2">
                                                    {clip.map((c, i) => (
                                                        <a
                                                            key={i}
                                                            href={`https://www.youtube.com/watch?v=${c.v}&t=${c.t}s`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="block rounded-lg border border-stone-200 bg-white px-3 py-2.5 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all group"
                                                        >
                                                            <div className="flex items-start gap-2.5">
                                                                <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold tabular-nums group-hover:bg-emerald-700">
                                                                    {Math.floor(c.t / 60)}:{String(c.t % 60).padStart(2, '0')}
                                                                </span>
                                                                <span className="text-[13px] text-stone-700 leading-relaxed">{c.s}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="mt-1.5 text-[11px] text-stone-400">
                                                    押すとその秒数から再生されます
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2 leading-relaxed">
                                            この数字を手元で確かめるには
                                            <code className="mx-1 px-1.5 py-0.5 rounded bg-white border border-stone-200 text-stone-700">
                                                node scripts/corpus-search.mjs &quot;{row[C.text]}&quot;
                                            </code>
                                            実例つきで返ります。
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {rows !== null && filtered.length === 0 && (
                    <div className="text-center py-20 text-stone-500">
                        <div className="text-lg font-medium text-stone-700">該当なし</div>
                        <div className="text-sm mt-2">コーパスに無いか、絞り込みが強すぎます</div>
                    </div>
                )}

                {filtered.length > limit && (
                    <button
                        onClick={() => setLimit((l) => l + PAGE_SIZE * 4)}
                        className="mt-6 w-full py-4 rounded-xl border border-stone-300 bg-white text-stone-700 font-medium hover:bg-stone-50 transition-all"
                    >
                        さらに表示  (残り {(filtered.length - limit).toLocaleString()} 件)
                    </button>
                )}
            </div>
        </div>
    );
}

/**
 * 上位N件で会話の何割を覆えるかの曲線。
 * 世の英語教材が絶対に言わない「どこまでやれば終わりか」を figure で見せる。
 * 横軸は対数。最初の500件の効きが桁違いに大きいことが形で分かる。
 */
function CoverageChart() {
    const W = 900;
    const H = 240;
    const PAD = { l: 46, r: 20, t: 16, b: 34 };
    const pts = COVERAGE_CURVE;
    if (!pts.length) return null;

    const maxN = pts[pts.length - 1][0];
    const x = (n: number) => PAD.l + (Math.log10(n) / Math.log10(maxN)) * (W - PAD.l - PAD.r);
    const y = (p: number) => H - PAD.b - (p / 100) * (H - PAD.t - PAD.b);

    const line = pts.map(([n, p], i) => `${i ? 'L' : 'M'}${x(n).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
    const area = `${line} L${x(maxN).toFixed(1)},${y(0)} L${x(pts[0][0]).toFixed(1)},${y(0)} Z`;

    // 判断の目安になる3点だけ強調する
    const marks = pts.filter(([n]) => n === 500 || n === 2000 || n === 5000);

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                <div className="text-xs tracking-widest text-stone-400 font-medium">どこまでやれば終わりか</div>
                <div className="text-xs text-stone-500">横軸は対数。上位ほど効きが大きい</div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed mb-4">
                上から順にやったとき、実際の英語のうち何割がすでに知っている塊で埋まるか。
                最初の500件で2割、2000件で3割強。ここから先は緩やかになります。
                全部やる必要はなく、どこで切るかを自分で決められる。これがこの表の存在理由です。
            </p>

            <div className="overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="上位N件で覆える割合">
                    <defs>
                        <linearGradient id="covFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                        </linearGradient>
                    </defs>

                    {[0, 25, 50, 75, 100].map((p) => (
                        <g key={p}>
                            <line x1={PAD.l} y1={y(p)} x2={W - PAD.r} y2={y(p)} stroke="#e7e5e4" strokeWidth="1" />
                            <text x={PAD.l - 8} y={y(p) + 4} textAnchor="end" fontSize="11" fill="#a8a29e">{p}%</text>
                        </g>
                    ))}

                    <path d={area} fill="url(#covFill)" />
                    <path d={line} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

                    {pts.map(([n, p]) => (
                        <circle key={n} cx={x(n)} cy={y(p)} r="3" fill="#fff" stroke="#10B981" strokeWidth="2" />
                    ))}

                    {marks.map(([n, p]) => (
                        <g key={`m${n}`}>
                            <line x1={x(n)} y1={y(p)} x2={x(n)} y2={H - PAD.b} stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle cx={x(n)} cy={y(p)} r="4.5" fill="#D4AF37" />
                            <text x={x(n)} y={y(p) - 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1c1917">{p}%</text>
                        </g>
                    ))}

                    {[100, 500, 2000, 5000, 20000, 50000].map((n) => (
                        <text key={`x${n}`} x={x(n)} y={H - PAD.b + 18} textAnchor="middle" fontSize="11" fill="#a8a29e">
                            {n >= 1000 ? `${n / 1000}k` : n}
                        </text>
                    ))}
                </svg>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {marks.map(([n, p]) => (
                    <div key={`c${n}`} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                        <div className="text-[11px] tracking-wider text-stone-500">上位 {n.toLocaleString()} 件</div>
                        <div className="text-2xl font-bold text-stone-900 mt-0.5 tabular-nums">{p}%</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">を覆える</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * 残り何個か。
 *
 * この表の本体は在庫の件数ではなく、残数が減っていく体験のほう。
 * 「英語を勉強する」は終わりが無いので走れないが、
 * 「あと1,716個」なら走れる。心理的にまったく別物になる。
 *
 * ただし全部やればネイティブになる、とは言わない。言った瞬間に嘘になる。
 * ここでやっているのは有限化であって、完成の保証ではない。
 */
function Progress({ rows, learned }: { rows: ChunkRow[] | null; learned: Set<string> }) {
    if (!rows) return null;
    const course = rows.slice(0, COURSE_SIZE);
    const done = course.filter((r) => learned.has(r[C.text])).length;
    const left = course.length - done;
    const pct = course.length ? (done / course.length) * 100 : 0;

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
                <div>
                    <div className="text-[11px] tracking-wider text-stone-400 font-medium mb-1">あなたの残り</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-bold text-stone-900 tabular-nums leading-none">
                            {left.toLocaleString()}
                        </span>
                        <span className="text-stone-500 text-sm">個</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[11px] tracking-wider text-stone-400 mb-1">覚えた</div>
                    <div className="text-2xl font-bold text-emerald-600 tabular-nums leading-none">
                        {done.toLocaleString()}
                        <span className="text-stone-400 text-base font-normal"> / {course.length.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="h-3 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.max(0.6, pct)}%` }} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                    { k: '今日の5個', v: Math.min(5, left) },
                    { k: '今週の35個', v: Math.min(35, left) },
                    { k: '毎日5個なら', v: `${Math.ceil(left / 5 / 30)}か月` },
                ].map((x) => (
                    <div key={x.k} className="rounded-xl bg-stone-50 border border-stone-200 px-3 py-2.5 text-center">
                        <div className="text-[10px] text-stone-500">{x.k}</div>
                        <div className="text-lg font-bold text-stone-900 tabular-nums mt-0.5">{x.v}</div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-[11px] text-stone-500 leading-relaxed">
                課程は上位{COURSE_SIZE.toLocaleString()}個。ここまでで日常英語のおよそ4割が、すでに知っている塊で埋まります。
                全部やればネイティブになる、という話ではありません。やらなくていい範囲を確定させるための数字です。
            </p>
        </div>
    );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] tracking-wider text-stone-400 font-medium">{label}</span>
            {children}
        </div>
    );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                active
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
            }`}
        >
            {children}
        </button>
    );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
    return (
        <div className="rounded-lg bg-stone-50 border border-stone-200 px-3 py-2.5">
            <div className="text-[11px] tracking-wider text-stone-400">{label}</div>
            <div className="text-lg font-bold text-stone-900 mt-0.5 tabular-nums">{value}</div>
            <div className="text-[11px] text-stone-500 mt-0.5">{unit}</div>
        </div>
    );
}
