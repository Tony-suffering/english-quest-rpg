'use client';

/**
 * 生半可 -- 辞書が1語で返してくる日本語。
 *
 * 「生半可 英語」で出てくるのは half-baked。間違ってはいないが、
 * 「生半可な気持ちで来るな」には一生使えない。日本語の1語が英語では
 * 3本にも4本にも割れていて、辞書はそのうち1本しか返さないから。
 *
 * このページは割れ目のほうを先に見せる。核ごとに英語を当てて、
 * 最後に「本当に言いたかった丸ごとの一文」を置く。
 * 各行の「トレーニングに追加」で /english/training のカードになる。
 */

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    NAMAHANKA,
    NAMAHANKA_STATS,
    spreadLabel,
    type NamahankaEntry,
} from '@/data/english/namahanka';

const REG_KEY = 'namahanka_registered';

function loadRegistered(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        return new Set(JSON.parse(localStorage.getItem(REG_KEY) || '[]'));
    } catch {
        return new Set();
    }
}

function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

export default function NamahankaPage() {
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [openId, setOpenId] = useState<string | null>(NAMAHANKA[0].id);

    useEffect(() => {
        setRegistered(loadRegistered());
    }, []);

    const addToTraining = useCallback(async (english: string, japanese: string) => {
        const key = english.toLowerCase();
        if (registered.has(key) || busy) return;
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, category: 'expression', date: todayStr() }),
            });
            if (res.ok || res.status === 409) {
                setRegistered((prev) => {
                    const next = new Set(prev);
                    next.add(key);
                    localStorage.setItem(REG_KEY, JSON.stringify([...next]));
                    return next;
                });
            }
        } catch {
            /* silent */
        } finally {
            setBusy(null);
        }
    }, [registered, busy]);

    const Add = ({ english, japanese }: { english: string; japanese: string }) => {
        const done = registered.has(english.toLowerCase());
        const loading = busy === english.toLowerCase();
        return (
            <button
                onClick={() => addToTraining(english, japanese)}
                disabled={done || loading}
                className={`shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    done
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 cursor-default'
                        : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
            >
                {done ? '登録済み' : loading ? '追加中' : 'トレーニングに追加'}
            </button>
        );
    };

    const Say = ({ text }: { text: string }) => (
        <button
            onClick={() => speak(text)}
            className="shrink-0 rounded-lg border border-stone-300 bg-white px-2.5 py-1 text-[11px] text-stone-600 hover:border-stone-500 transition-colors"
        >
            音で聞く
        </button>
    );

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-4xl mx-auto px-5 py-10 sm:py-14">
                <div className="text-[11px] tracking-[0.2em] text-stone-400 uppercase">Namahanka</div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    生半可 <span className="text-stone-400 text-base sm:text-lg font-normal">辞書が1語で返してくる日本語</span>
                </h1>

                <div className="mt-5 space-y-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                    <p>
                        「生半可」を英語で、と引くと <strong className="font-semibold">half-baked</strong> が出る。
                        間違ってはいない。でもそれを覚えた人は
                        <strong className="font-semibold">「生半可な気持ちで来るな」を一生言えないまま</strong>になる。
                    </p>
                    <p>
                        理由ははっきりしている。日本語の1語が、英語では3本にも4本にも割れているから。
                        生半可は「気持ちが半分」「出来が半分」「知識が半分」「半分では済まない」の4本。
                        half-baked が当たるのは2本目だけ。辞書は1語に1語を返す機械なので、残りの3本は最初から画面に出てこない。
                    </p>
                    <p>
                        ここは割れ目のほうを先に見せる。核ごとに英語を当てて、最後に
                        <strong className="font-semibold">本当に言いたかった丸ごとの一文</strong>を、
                        やりがちな直訳と並べて置く。単語ではなく文を持って帰るためのページ。
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-stone-500">
                    <span>収録 {NAMAHANKA.length} 語</span>
                    <span>意味の核 {NAMAHANKA_STATS.cores} 本</span>
                    <span>英語 {NAMAHANKA_STATS.words} 個</span>
                    <span>言いたい文 {NAMAHANKA_STATS.says} 本</span>
                </div>

                {/* 語の切り替え */}
                <div className="mt-7 flex flex-wrap gap-2">
                    {NAMAHANKA.map((e) => (
                        <button
                            key={e.id}
                            onClick={() => setOpenId(e.id)}
                            className={`rounded-xl border px-3.5 py-2 text-sm transition-colors ${
                                openId === e.id
                                    ? 'bg-stone-900 text-white border-stone-900'
                                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                            }`}
                        >
                            {e.ja}
                        </button>
                    ))}
                </div>

                {NAMAHANKA.filter((e) => e.id === openId).map((entry) => (
                    <Entry key={entry.id} entry={entry} Add={Add} Say={Say} />
                ))}

                <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                    <h2 className="text-sm font-semibold text-stone-900">この {NAMAHANKA.length} 語の選び方</h2>
                    <p className="mt-2 text-[13px] text-stone-600 leading-relaxed">
                        思いつきで並べていない。日英の対訳279万ペアを流して集めた
                        <Link href="/english/corpus-ja/align" className="text-emerald-700 underline underline-offset-2 mx-1">
                            実測の英訳と直訳不可度
                        </Link>
                        から、<strong className="font-semibold">日本人なら全員知っていて、かつ英語側が毎回ちがう</strong>層を抜いた。
                        直訳不可度が高いということは、対訳の中でその日本語が一つの英語に落ち着いていないということで、
                        それはそのまま「1語で覚えると事故る」という意味になる。
                    </p>
                    <p className="mt-3 text-[13px] text-stone-600 leading-relaxed">
                        ただし実測にも限界がある。「とりあえず」の1位は
                        <code className="mx-1 rounded bg-stone-100 px-1.5 py-0.5 text-[12px]">usb port</code>
                        で、これは対訳の中で とりあえず が英語側に何も残さずに消えているせい。
                        機械は「どの英語が居たか」までしか言えない。
                        <strong className="font-semibold">どの意味の時にどれか</strong>は、割ってからでないと出てこない。
                        だからこのページは手で割っている。
                    </p>
                </div>
            </div>
        </div>
    );
}

function Entry({
    entry,
    Add,
    Say,
}: {
    entry: NamahankaEntry;
    Add: (p: { english: string; japanese: string }) => React.ReactElement;
    Say: (p: { text: string }) => React.ReactElement;
}) {
    const pct = Math.round(entry.corpus.spread * 100);
    return (
        <div className="mt-8">
            {/* 見出し */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{entry.ja}</h2>
                    <div className="text-right">
                        <div className="text-[11px] text-stone-400 uppercase tracking-wider">直訳不可度</div>
                        <div className="text-lg font-semibold text-stone-900">
                            {pct}
                            <span className="text-xs text-stone-400 ml-0.5">/100</span>
                            <span className="ml-2 text-xs font-normal text-amber-700">{spreadLabel(entry.corpus.spread)}</span>
                        </div>
                    </div>
                </div>

                {/* 辞書の答え */}
                <div className="mt-5 rounded-xl bg-stone-100 border border-stone-200 p-4">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider">辞書が返してくる答え</div>
                    <div className="mt-1 text-lg font-semibold text-stone-500 line-through decoration-stone-400 decoration-1">
                        {entry.dict}
                    </div>
                    <p className="mt-2 text-[13px] text-stone-700 leading-relaxed">{entry.dictWhy}</p>
                </div>

                {/* 実測 */}
                <div className="mt-3 rounded-xl border border-stone-200 p-4">
                    <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                        実測 (日英対訳279万ペア)
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-stone-700">
                        <span>生涯で出会う目安 <strong className="font-semibold">{entry.corpus.hits.toLocaleString()}</strong> 回</span>
                        <span>
                            対訳に実際に居た英語{' '}
                            <strong className="font-semibold">{entry.corpus.found.join(' / ')}</strong>
                        </span>
                    </div>
                    {entry.corpus.solid === 0 && (
                        <p className="mt-2 text-[12px] text-amber-700">
                            裏取りは {entry.corpus.pairs} ペアだけ。数字は薄いので参考程度に見る。
                        </p>
                    )}
                </div>

                {/* 割れ目 */}
                <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
                    <div className="text-[11px] text-amber-800 uppercase tracking-wider">この日本語が割れる本数</div>
                    <div className="mt-1 text-[15px] font-medium text-stone-900">{entry.split}</div>
                </div>
            </div>

            {/* 核ごとの英語 */}
            <div className="mt-6 space-y-4">
                {entry.cores.map((core, i) => (
                    <div key={core.label} className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                        <div className="border-b border-stone-200 bg-stone-50 px-5 py-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[11px] font-semibold text-amber-700">核 {i + 1}</span>
                                <span className="text-base font-semibold text-stone-900">{core.label}</span>
                            </div>
                            <div className="mt-0.5 text-[12px] text-stone-500">{core.gloss}</div>
                        </div>
                        <div className="divide-y divide-stone-100">
                            {core.words.map((w) => (
                                <div key={w.en} className="px-5 py-4">
                                    <div className="flex items-start justify-between gap-3 flex-wrap">
                                        <div className="text-[17px] font-semibold text-stone-900">{w.en}</div>
                                        <div className="flex gap-2">
                                            <Say text={w.ex} />
                                            <Add english={w.ex} japanese={w.exJa} />
                                        </div>
                                    </div>
                                    <div className="mt-1 text-[12px] text-stone-500">{w.when}</div>
                                    <div className="mt-2 text-[14px] text-stone-800 leading-relaxed">{w.ex}</div>
                                    <div className="mt-0.5 text-[13px] text-stone-500">{w.exJa}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 言いたかった丸ごとの文 */}
            <div className="mt-8">
                <h3 className="text-sm font-semibold text-stone-900">
                    言いたかった丸ごとの文
                    <span className="ml-2 font-normal text-stone-500">単語ではなく、これを持って帰る</span>
                </h3>
                <div className="mt-3 space-y-4">
                    {entry.says.map((s) => (
                        <div key={s.ja} className="rounded-2xl border border-stone-200 bg-white p-5">
                            <div className="text-[15px] font-medium text-stone-900">{s.ja}</div>

                            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xs font-bold text-rose-600">NG</span>
                                    <span className="text-[15px] text-stone-700 line-through decoration-rose-300">{s.bad}</span>
                                </div>
                                <p className="mt-2 text-[13px] text-stone-700 leading-relaxed">{s.badWhy}</p>
                            </div>

                            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs font-bold text-emerald-700">OK</span>
                                            <span className="text-[16px] font-semibold text-stone-900">{s.good}</span>
                                        </div>
                                        <div className="mt-1 text-[13px] text-stone-600">{s.goodJa}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Say text={s.good} />
                                        <Add english={s.good} japanese={s.ja} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 rounded-xl border border-stone-200 p-4">
                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs font-bold text-stone-500">別の角度</span>
                                            <span className="text-[16px] font-semibold text-stone-900">{s.alt}</span>
                                        </div>
                                        <div className="mt-1 text-[13px] text-stone-600">{s.altJa}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Say text={s.alt} />
                                        <Add english={s.alt} japanese={s.altJa} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
