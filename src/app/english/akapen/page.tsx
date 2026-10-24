'use client';

/**
 * 赤ペン台帳 -- AI が書いた英語を、DMM の先生が直した記録。
 *
 * 自分ではまだ英語の変さを判定できない。だから AI で英語を作り、先生に見せ、赤が入った所を残す。
 * たまった赤から「AI が外しやすい型」を拾い、次に AI に頼むときの一言にする。
 * データは src/data/english/akapen.ts。
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    AKAPEN_CASES, AKAPEN_PATTERNS, AKAPEN_QUEUE, AKAPEN_ASK, AKAPEN_TOTAL, VERDICT_LABEL,
    type Verdict,
} from '@/data/english/akapen';

const REG_KEY = 'akapen_registered';

const VERDICT_STYLE: Record<Verdict, string> = {
    fixed: 'bg-rose-50 text-rose-700 border-rose-200',
    weird: 'bg-amber-50 text-amber-800 border-amber-200',
    term: 'bg-sky-50 text-sky-700 border-sky-200',
    content: 'bg-stone-100 text-stone-700 border-stone-200',
    self: 'bg-violet-50 text-violet-700 border-violet-200',
    passed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    overruled: 'bg-stone-900 text-white border-stone-900',
};

function jstToday(): string {
    return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

export default function AkapenPage() {
    const [filter, setFilter] = useState<string | null>(null);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try { setRegistered(new Set(JSON.parse(localStorage.getItem(REG_KEY) || '[]'))); } catch { /* noop */ }
    }, []);

    const counts = useMemo(() => {
        const m = new Map<string, number>();
        for (const c of AKAPEN_CASES) m.set(c.pattern, (m.get(c.pattern) || 0) + 1);
        return m;
    }, []);

    const shown = filter ? AKAPEN_CASES.filter((c) => c.pattern === filter) : AKAPEN_CASES;
    const askLines = AKAPEN_PATTERNS.filter((p) => p.askAi).map((p) => `- ${p.askAi}`);
    const maxN = Math.max(...AKAPEN_TOTAL.breakdown.map((b) => b.n));

    const add = useCallback(async (english: string, japanese: string) => {
        const key = english.toLowerCase();
        if (registered.has(key) || busy) return;
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, date: jstToday() }),
            });
            if (res.ok || res.status === 409) {
                setRegistered((prev) => {
                    const next = new Set(prev);
                    next.add(key);
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
                    return next;
                });
            }
        } catch { /* silent */ } finally { setBusy(null); }
    }, [registered, busy]);

    const copyAsk = async () => {
        try {
            await navigator.clipboard.writeText(`英語を書くときは次を守って。\n${askLines.join('\n')}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* noop */ }
    };

    const Add = ({ en, ja }: { en: string; ja: string }) => {
        const done = registered.has(en.toLowerCase());
        const loading = busy === en.toLowerCase();
        return (
            <button onClick={() => add(en, ja)} disabled={done || loading}
                className={`shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors ${done
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 cursor-default'
                    : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'}`}>
                {done ? '登録済み' : loading ? '追加中' : 'トレーニングに追加'}
            </button>
        );
    };

    const Say = ({ text }: { text: string }) => (
        <button onClick={() => speak(text)}
            className="shrink-0 rounded-lg border border-stone-300 bg-white px-2.5 py-1 text-[11px] text-stone-600 hover:border-stone-500">
            音で聞く
        </button>
    );

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-5 py-10 sm:py-14">
                <div className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">Akapen</div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    赤ペン台帳 <span className="text-stone-400 text-base sm:text-lg font-normal">AIの英語に、先生が入れた赤</span>
                </h1>

                <div className="mt-5 space-y-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                    <p>
                        英語の変さは、まだ自分で判定できない。日本語なら一瞬で分かるのに。
                        だから AI に英語を作らせて、DMM の先生に見せて、<strong className="font-semibold">赤が入った所だけを残す。</strong>
                    </p>
                    <p>
                        1回ずつは小さい。でもたまると、AI が外しやすい型が見えてくる。
                        その型を、次に AI に頼むときの一言にする。赤が入るたびに、AI への頼み方が1行ずつ賢くなる。
                    </p>
                </div>

                {/* 数字 */}
                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <div className="text-3xl font-bold text-stone-900">{AKAPEN_TOTAL.shown}<span className="text-sm font-normal text-stone-500 ml-1">回</span></div>
                        <div className="text-sm text-stone-600">AI の英語を先生に見せた回数({AKAPEN_TOTAL.nights}夜)。125夜分を全部読み直して数えた</div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {AKAPEN_TOTAL.breakdown.map((b) => (
                            <div key={b.label} className="flex items-center gap-3">
                                <div className="w-40 sm:w-56 shrink-0 text-[12px] text-stone-600">{b.label}</div>
                                <div className="flex-1 h-2.5 rounded-full bg-stone-100 overflow-hidden">
                                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${(b.n / maxN) * 100}%` }} />
                                </div>
                                <div className="w-8 text-right text-[12px] font-semibold text-stone-800">{b.n}</div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">
                        はっきり「間違い」「変」と言われたのは12回。多いのは、英語ではなく中身を足された回と、先生が何か言う前に自分で止まった回。
                    </p>
                </div>

                {/* 型と、AIへの一言 */}
                <div className="mt-8">
                    <div className="flex items-end justify-between gap-3 flex-wrap">
                        <div>
                            <h2 className="text-base font-semibold text-stone-900">AI が外しやすい型</h2>
                            <p className="mt-1 text-[12px] text-stone-500">押すと下の一覧がその型だけになる。数字は台帳に載っている件数</p>
                        </div>
                        <button onClick={copyAsk}
                            className="rounded-lg border border-stone-900 bg-stone-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-stone-700">
                            {copied ? 'コピーした' : 'AIへの一言を全部コピー'}
                        </button>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {AKAPEN_PATTERNS.map((p) => (
                            <button key={p.id} onClick={() => setFilter(filter === p.id ? null : p.id)}
                                className={`text-left rounded-2xl border p-4 transition-colors ${filter === p.id ? 'border-amber-400 bg-amber-50' : 'border-stone-200 bg-white hover:border-stone-400'}`}>
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="text-[14px] font-semibold text-stone-900">{p.name}</span>
                                    <span className="text-[12px] font-semibold text-amber-700">{counts.get(p.id) || 0}件</span>
                                </div>
                                <p className="mt-1.5 text-[12px] text-stone-600 leading-relaxed">{p.rule}</p>
                                {p.askAi && (
                                    <p className="mt-2 text-[12px] text-stone-900 leading-relaxed">
                                        <span className="mr-1 rounded bg-stone-900 px-1.5 py-0.5 text-[10px] text-white">AIへ</span>{p.askAi}
                                    </p>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 一覧 */}
                <div className="mt-10">
                    <div className="flex items-baseline justify-between gap-3">
                        <h2 className="text-base font-semibold text-stone-900">
                            赤ペン一覧 <span className="font-normal text-stone-500 text-sm">{shown.length}件</span>
                        </h2>
                        {filter && (
                            <button onClick={() => setFilter(null)} className="text-[12px] text-emerald-700 underline underline-offset-2">全部に戻す</button>
                        )}
                    </div>
                    <div className="mt-3 space-y-4">
                        {shown.map((c, i) => (
                            <div key={`${c.night}-${i}`} className="rounded-2xl border border-stone-200 bg-white p-5">
                                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                                    <span className="font-semibold text-stone-500">第{c.night}夜 ・ {c.date}</span>
                                    <span className={`rounded-md border px-2 py-0.5 font-medium ${VERDICT_STYLE[c.verdict]}`}>{VERDICT_LABEL[c.verdict]}</span>
                                </div>
                                <div className="mt-3">
                                    <div className="text-[11px] text-stone-400">AI の英語</div>
                                    <div className={`mt-0.5 text-[15px] leading-relaxed ${c.verdict === 'fixed' || c.verdict === 'weird' ? 'text-stone-500 line-through decoration-rose-300' : 'text-stone-800'}`}>{c.ai}</div>
                                </div>
                                {c.quote && (
                                    <div className="mt-3 rounded-xl border-l-4 border-amber-400 bg-amber-50/60 px-4 py-2.5">
                                        <div className="text-[11px] text-amber-800">先生</div>
                                        <div className="mt-0.5 text-[14px] text-stone-900 leading-relaxed">{c.quote}</div>
                                    </div>
                                )}
                                {c.fixed && (
                                    <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                                        <div className="flex items-start justify-between gap-3 flex-wrap">
                                            <div className="text-[15px] font-semibold text-stone-900 leading-relaxed">{c.fixed}</div>
                                            <div className="flex gap-2"><Say text={c.fixed} /><Add en={c.fixed} ja={`赤ペン台帳 第${c.night}夜: ${c.what.slice(0, 60)}`} /></div>
                                        </div>
                                    </div>
                                )}
                                <p className="mt-3 text-[13px] text-stone-600 leading-relaxed">{c.what}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 検品待ち */}
                <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                    <h2 className="text-base font-semibold text-stone-900">次のレッスンに持っていく</h2>
                    <p className="mt-1 text-[12px] text-stone-500 leading-relaxed">
                        第125夜に持ち込んだ10文のうち、先生が見たのは2文だけ。残り8文はまだ赤が入っていない。
                        上の型に当てはまりそうな文には印を付けてある。
                    </p>
                    <div className="mt-4 divide-y divide-stone-100">
                        {AKAPEN_QUEUE.map((q) => (
                            <div key={q.finger} className="py-3">
                                <div className="flex items-center gap-2 text-[11px]">
                                    <span className="font-semibold text-stone-500">{q.finger} ・ {q.verb}</span>
                                    <span className={`rounded-md border px-2 py-0.5 ${q.status === 'checked' ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-stone-200 bg-stone-50 text-stone-500'}`}>
                                        {q.status === 'checked' ? '検品済み' : 'まだ'}
                                    </span>
                                </div>
                                <div className="mt-1 text-[14px] text-stone-800 leading-relaxed">{q.en}</div>
                                {q.note && <div className="mt-0.5 text-[12px] text-amber-700">{q.note}</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 聞き方 */}
                <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                    <h2 className="text-base font-semibold text-stone-900">先生に見せるときの一言</h2>
                    <p className="mt-1 text-[12px] text-stone-500">聞き方そのものが、会話でそのまま使える塊になる</p>
                    <div className="mt-3 divide-y divide-stone-100">
                        {AKAPEN_ASK.map((a) => (
                            <div key={a.en} className="py-3 flex items-start justify-between gap-3 flex-wrap">
                                <div>
                                    <div className="text-[15px] font-semibold text-stone-900">{a.en}</div>
                                    <div className="text-[12px] text-stone-500">{a.ja}</div>
                                </div>
                                <div className="flex gap-2"><Say text={a.en} /><Add en={a.en} ja={a.ja} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
