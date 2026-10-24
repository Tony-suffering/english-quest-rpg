'use client';

// 課程。10万件の在庫をそのまま見せても人は固まるので、レベル1から100に割る。
// 1レベル50個。100レベルで上位5,000個 = 日常英語のおよそ46%(実測)。
//
// 問うのは「知ってる？」ではなく「口から出る？」。
// 知識の確認ではなく在庫の確認をする画面にしてある。

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CHUNK_DATA_URL, KIND_LABELS, type ChunkRow } from '@/data/english/chunk-ranking';
import { CHUNK_GLOSS, glossFor } from '@/data/english/chunk-gloss';
import { storyForLevel } from '@/data/english/level-stories';

const PER_LEVEL = 50;
const MAX_LEVEL = 100;
const STORE_KEY = 'chunk-learned-v1';
const LEVEL_KEY = 'chunk-level-v1';

const C = { text: 0, kind: 1, group: 2, reg: 3, life: 4, hits: 5, pmi: 6, tier: 7 } as const;

type Clip = { v: string; t: number; s: string };

/** 診断で使う段。ここで詰まった手前が、いまの在庫の境目になる */
const PROBE_LEVELS = [2, 6, 12, 20, 30, 42, 56, 72, 88];

export default function LevelCoursePage() {
    const [rows, setRows] = useState<ChunkRow[] | null>(null);
    const [clips, setClips] = useState<Record<string, Clip[]>>({});
    const [learned, setLearned] = useState<Set<string>>(new Set());
    const [level, setLevel] = useState(1);
    const [open, setOpen] = useState<string | null>(null);
    const [reveal, setReveal] = useState<Set<string>>(new Set());
    const [testing, setTesting] = useState(false);

    useEffect(() => {
        fetch(CHUNK_DATA_URL)
            .then((r) => r.json())
            .then((d: ChunkRow[]) => setRows(d.filter((r) => r[C.group] !== 2)))
            .catch(() => setRows([]));
        fetch('/data/chunk-clips.json')
            .then((r) => r.json())
            .then(setClips)
            .catch(() => {});
        try {
            const raw = localStorage.getItem(STORE_KEY);
            if (raw) setLearned(new Set(JSON.parse(raw)));
            // ?lv=12 が付いていればそれを優先する。
            // 網羅版から「この表現は課程のLv12」で飛んでくる導線があるため
            const asked = Number(new URLSearchParams(window.location.search).get('lv'));
            const lv = asked || Number(localStorage.getItem(LEVEL_KEY));
            if (lv) setLevel(Math.min(MAX_LEVEL, Math.max(1, lv)));
        } catch {
            /* 初回 */
        }
    }, []);

    const save = (next: Set<string>) => {
        setLearned(next);
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify([...next]));
        } catch {
            /* 保存できなくても操作は続く */
        }
    };
    const toggle = (t: string) => {
        const next = new Set(learned);
        if (next.has(t)) next.delete(t);
        else next.add(t);
        save(next);
    };
    const setLv = (n: number) => {
        const v = Math.min(MAX_LEVEL, Math.max(1, n));
        setLevel(v);
        setOpen(null);
        setReveal(new Set());
        try {
            localStorage.setItem(LEVEL_KEY, String(v));
        } catch {
            /* 保存できなくても進める */
        }
    };

    const items = useMemo(() => (rows ? rows.slice((level - 1) * PER_LEVEL, level * PER_LEVEL) : []), [rows, level]);
    const doneHere = items.filter((r) => learned.has(r[C.text])).length;
    const totalDone = rows ? rows.slice(0, MAX_LEVEL * PER_LEVEL).filter((r) => learned.has(r[C.text])).length : 0;

    if (testing && rows) {
        return <Placement rows={rows} learned={learned} onDone={(lv, known) => { save(known); setLv(lv); setTesting(false); }} onCancel={() => setTesting(false)} />;
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-3xl mx-auto px-5 py-8">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-2">COURSE</div>
                            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">レベル {level}</h1>
                            <p className="mt-2 text-sm text-stone-600">
                                全{MAX_LEVEL}レベル / 1レベル{PER_LEVEL}個 / 会う回数が多い順
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTesting(true)}
                                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all"
                            >
                                レベル診断
                            </button>
                            <Link
                                href="/english/corpus/list"
                                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-all"
                            >
                                全部見る
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <button
                            onClick={() => setLv(level - 1)}
                            disabled={level <= 1}
                            className="px-4 py-2 rounded-lg border border-stone-200 text-stone-600 disabled:opacity-30 hover:bg-stone-50"
                        >
                            前
                        </button>
                        <input
                            type="range"
                            min={1}
                            max={MAX_LEVEL}
                            value={level}
                            onChange={(e) => setLv(Number(e.target.value))}
                            className="flex-1 accent-emerald-600"
                        />
                        <button
                            onClick={() => setLv(level + 1)}
                            disabled={level >= MAX_LEVEL}
                            className="px-4 py-2 rounded-lg border border-stone-200 text-stone-600 disabled:opacity-30 hover:bg-stone-50"
                        >
                            次
                        </button>
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-xs text-stone-500 mb-1.5">
                                <span>このレベル</span>
                                <span className="tabular-nums font-medium text-stone-800">
                                    {doneHere} / {items.length}
                                </span>
                            </div>
                            <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                    style={{ width: `${items.length ? (doneHere / items.length) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <div className="text-[11px] text-stone-500">課程ぜんぶ</div>
                            <div className="text-lg font-bold text-stone-900 tabular-nums leading-none">
                                {totalDone.toLocaleString()}
                                <span className="text-stone-400 text-sm font-normal"> / {(MAX_LEVEL * PER_LEVEL).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-5 py-8">
                <div className="rounded-xl bg-stone-900 text-white px-5 py-4 mb-5">
                    <p className="text-sm leading-relaxed">
                        聞くのは<strong className="text-amber-300">「知ってる？」ではありません</strong>。
                        日本語を見て、英語が<strong className="text-amber-300">口から出るか</strong>です。
                        出なければ、知っていても在庫はゼロです。
                    </p>
                </div>

                <div className="space-y-2">
                    {items.map((r, i) => {
                        const text = r[C.text];
                        const g = glossFor(text);
                        const done = learned.has(text);
                        const shown = reveal.has(text);
                        const clip = clips[text];
                        const isOpen = open === text;

                        return (
                            <div
                                key={text}
                                className={`rounded-xl border bg-white overflow-hidden transition-all ${
                                    done ? 'border-emerald-200' : 'border-stone-200'
                                }`}
                            >
                                <div className="flex items-stretch">
                                    <button
                                        onClick={() => toggle(text)}
                                        aria-label={done ? '言えなかったに戻す' : '言えた'}
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

                                    <div className="flex-1 min-w-0 px-4 py-3.5">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-xs text-stone-400 tabular-nums w-8">
                                                {(level - 1) * PER_LEVEL + i + 1}
                                            </span>
                                            <span className="font-bold text-stone-900">{g?.ja ?? '(訳はまだ)'}</span>
                                            <span className="text-[11px] text-stone-400 tabular-nums">
                                                一生で {r[C.hits].toLocaleString()} 回
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center gap-3 flex-wrap">
                                            {shown || done ? (
                                                <span className="font-mono text-lg text-emerald-700">{text}</span>
                                            ) : (
                                                <button
                                                    onClick={() => setReveal(new Set([...reveal, text]))}
                                                    className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-500 text-sm hover:bg-stone-200 transition-all"
                                                >
                                                    英語を見る
                                                </button>
                                            )}
                                            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                                {KIND_LABELS[r[C.kind]]?.name}
                                            </span>
                                            {clip?.length > 0 && (
                                                <button
                                                    onClick={() => setOpen(isOpen ? null : text)}
                                                    className="text-[11px] text-emerald-700 underline underline-offset-2"
                                                >
                                                    実際に言っている場面 {clip.length}件
                                                </button>
                                            )}
                                        </div>

                                        {g?.note && (shown || done) && (
                                            <div className="mt-2.5 text-[13px] text-stone-600 leading-relaxed bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                                {g.note}
                                            </div>
                                        )}

                                        {isOpen && clip && (
                                            <div className="mt-3 space-y-1.5">
                                                {clip.map((c, k) => (
                                                    <a
                                                        key={k}
                                                        href={`https://www.youtube.com/watch?v=${c.v}&t=${c.t}s`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block rounded-lg border border-stone-200 px-3 py-2 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all"
                                                    >
                                                        <span className="text-[13px] text-stone-700 leading-relaxed">{c.s}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <StorySection level={level} />

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => setLv(level + 1)}
                        disabled={level >= MAX_LEVEL}
                        className="flex-1 py-4 rounded-xl bg-stone-900 text-white font-bold hover:bg-stone-800 disabled:opacity-30 transition-all"
                    >
                        レベル {Math.min(MAX_LEVEL, level + 1)} へ
                    </button>
                </div>
            </div>
        </div>
    );
}


/**
 * レベルの復習物語。
 * そのレベルの50表現が全部入った会話劇(機械監査済み)。
 * 日本語だけ表示して口頭で英語を作る、が一番効く使い方なので、
 * 英語を隠すモードを既定にしてある。
 */
function StorySection({ level }: { level: number }) {
    const story = storyForLevel(level);
    const [mode, setMode] = useState<'both' | 'hide-en'>('both');
    const [shown, setShown] = useState<Set<number>>(new Set());
    useEffect(() => setShown(new Set()), [level, mode]);

    if (!story) {
        return (
            <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-white px-5 py-6 text-center text-sm text-stone-400">
                このレベルの復習物語は準備中です（レベル1で型を確認できます）
            </div>
        );
    }

    return (
        <div className="mt-8 rounded-2xl border-2 border-stone-900 bg-white overflow-hidden">
            <div className="bg-stone-900 text-white px-6 py-5">
                <div className="text-[11px] tracking-[0.2em] text-stone-400 font-medium mb-1">このレベルの復習物語</div>
                <div className="text-xl font-bold">{story.title}</div>
                <div className="text-sm text-stone-300 mt-0.5">{story.titleJa} — {story.setup}</div>
                <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className="px-2 py-1 rounded bg-emerald-600 font-bold">50表現ぜんぶ入り(機械監査済み)</span>
                </div>
            </div>

            <div className="px-6 py-4 border-b border-stone-100 flex gap-2">
                <button
                    onClick={() => setMode('both')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${mode === 'both' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}
                >
                    読む(英日)
                </button>
                <button
                    onClick={() => setMode('hide-en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${mode === 'hide-en' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200'}`}
                >
                    話す(日本語から英語を作る)
                </button>
            </div>

            <div className="px-6 py-5 space-y-3">
                {story.lines.map((l, i) => {
                    const divider = l.en.startsWith('---') || l.en.startsWith('(');
                    if (divider) {
                        return (
                            <div key={i} className="text-center text-xs text-stone-400 py-1">
                                {l.ja}
                            </div>
                        );
                    }
                    const hidden = mode === 'hide-en' && !shown.has(i);
                    return (
                        <div key={i} className="flex gap-3">
                            <span className="shrink-0 w-14 text-right text-[11px] font-bold text-stone-400 pt-1">{l.sp}</span>
                            <div className="min-w-0">
                                {mode === 'hide-en' && <div className="text-stone-900 font-medium">{l.ja}</div>}
                                {hidden ? (
                                    <button
                                        onClick={() => setShown(new Set([...shown, i]))}
                                        className="mt-1 px-2.5 py-1 rounded bg-stone-100 text-stone-500 text-xs hover:bg-stone-200"
                                    >
                                        英語を見る
                                    </button>
                                ) : (
                                    <>
                                        <div className="text-stone-900">{l.en}</div>
                                        {mode === 'both' && <div className="text-[13px] text-stone-500 mt-0.5">{l.ja}</div>}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * レベル診断。
 * 段ごとに1つ出して、口から出るかを答えてもらう。
 * 2つ続けて出てこなかった段の手前を、いまの在庫の境目とみなす。
 * 厳密な測定ではなく、どこから始めるかを決めるためだけのもの。
 */
function Placement({
    rows,
    learned,
    onDone,
    onCancel,
}: {
    rows: ChunkRow[];
    learned: Set<string>;
    onDone: (level: number, known: Set<string>) => void;
    onCancel: () => void;
}) {
    const probes = useMemo(
        () =>
            PROBE_LEVELS.map((lv) => rows[(lv - 1) * PER_LEVEL + 10]).filter(Boolean),
        [rows]
    );
    const [at, setAt] = useState(0);
    const [miss, setMiss] = useState(0);
    const [known, setKnown] = useState<Set<string>>(new Set(learned));

    const answer = (ok: boolean) => {
        const r = probes[at];
        if (ok) {
            const n = new Set(known);
            n.add(r[C.text]);
            setKnown(n);
        }
        const m = ok ? 0 : miss + 1;
        setMiss(m);

        // 2つ続けて出なければ、そこが境目
        if (m >= 2 || at + 1 >= probes.length) {
            const reached = Math.max(0, at - (m >= 2 ? 1 : 0));
            onDone(PROBE_LEVELS[reached] ?? 1, ok ? new Set([...known, r[C.text]]) : known);
            return;
        }
        setAt(at + 1);
    };

    const r = probes[at];
    if (!r) return null;
    const g = glossFor(r[C.text]);

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-5">
            <div className="w-full max-w-lg">
                <div className="text-center mb-6">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-2">レベル診断</div>
                    <p className="text-sm text-stone-600">
                        この日本語を英語で言えますか。<strong className="text-stone-900">見て分かるかではなく、口から出るか</strong>です。
                    </p>
                    <div className="mt-3 text-xs text-stone-400 tabular-nums">
                        {at + 1} / {probes.length}
                    </div>
                </div>

                <div className="rounded-2xl border-2 border-stone-900 bg-white p-8 text-center shadow-lg">
                    <div className="text-2xl sm:text-3xl font-bold text-stone-900 leading-relaxed">
                        {g?.ja ?? r[C.text]}
                    </div>
                    <div className="mt-3 text-xs text-stone-400">
                        一生で {r[C.hits].toLocaleString()} 回耳に入る表現です
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        onClick={() => answer(false)}
                        className="py-4 rounded-xl border border-stone-300 bg-white font-bold text-stone-700 hover:bg-stone-50 transition-all"
                    >
                        出てこない
                    </button>
                    <button
                        onClick={() => answer(true)}
                        className="py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all"
                    >
                        言える
                    </button>
                </div>

                <button onClick={onCancel} className="mt-5 w-full text-xs text-stone-400 hover:text-stone-600">
                    やめる
                </button>
            </div>
        </div>
    );
}
