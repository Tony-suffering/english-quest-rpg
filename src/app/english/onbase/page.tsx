'use client';

import { useState, useCallback, useMemo } from 'react';
import { ONBASE_EPISODE, ONBASE_CHAPTERS, type OnBaseEntry } from '@/data/english/onbase-seed';

const ACCENT = '#D4AF37';
const EMERALD = '#10B981';

function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
}

function jstToday(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}

function rankBadge(rank: 'S' | 'A' | 'B' | 'C'): { color: string; bg: string } {
    if (rank === 'S') return { color: '#92400E', bg: '#FEF3C7' };
    if (rank === 'A') return { color: '#065F46', bg: '#D1FAE5' };
    if (rank === 'B') return { color: '#1E40AF', bg: '#DBEAFE' };
    return { color: '#78716C', bg: '#F5F5F4' };
}

type RankFilter = 'ALL' | 'S' | 'A' | 'B';

export default function OnBasePage() {
    const [rankFilter, setRankFilter] = useState<RankFilter>('ALL');
    const [registered, setRegistered] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        try {
            const s = localStorage.getItem('onbase-registered');
            return s ? new Set<string>(JSON.parse(s)) : new Set<string>();
        } catch { return new Set<string>(); }
    });
    const [registeringId, setRegisteringId] = useState<string | null>(null);

    const totalCount = useMemo(
        () => ONBASE_CHAPTERS.reduce((n, c) => n + c.entries.length, 0),
        [],
    );

    const handleRegister = useCallback(async (id: string, entry: OnBaseEntry) => {
        setRegisteringId(id);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: entry.target,
                    japanese: `${entry.expression} -- ${entry.note}`,
                    category: 'podcast',
                    date: jstToday(),
                }),
            });
            if (res.ok) {
                setRegistered(prev => {
                    const next = new Set(prev).add(id);
                    try { localStorage.setItem('onbase-registered', JSON.stringify([...next])); } catch {}
                    return next;
                });
            }
        } catch {} finally {
            setRegisteringId(null);
        }
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 pb-24">
            <div className="max-w-3xl mx-auto px-4 pt-8">
                {/* Episode header */}
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-white">
                    <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #0A3D2C 0%, #14532D 55%, #1C1917 100%)' }}>
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold tracking-widest px-2 py-0.5 rounded" style={{ background: ACCENT, color: '#1C1917' }}>MLB PODCAST</span>
                            <span className="text-[11px] font-semibold tracking-wider text-stone-300">{ONBASE_EPISODE.show}</span>
                        </div>
                        <h1 className="mt-3 text-xl md:text-2xl font-bold text-white leading-snug">{ONBASE_EPISODE.title}</h1>
                        <div className="mt-2 text-[12px] text-stone-300 flex flex-wrap gap-x-4 gap-y-1">
                            <span>HOST: {ONBASE_EPISODE.host}</span>
                            <span>GUEST: {ONBASE_EPISODE.guest}</span>
                            <span>{ONBASE_EPISODE.duration} ・ {totalCount}表現</span>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <p className="text-[13px] leading-relaxed text-stone-600">{ONBASE_EPISODE.tagline}</p>
                        <a href={ONBASE_EPISODE.url} target="_blank" rel="noopener noreferrer"
                            className="inline-block mt-3 text-[12px] font-bold px-3 py-1.5 rounded-lg border transition-all hover:shadow"
                            style={{ borderColor: ACCENT, color: '#92400E' }}>
                            YouTubeで本編を探す
                        </a>
                    </div>
                </div>

                {/* Rank filter */}
                <div className="flex items-center gap-2 mt-6">
                    {(['ALL', 'S', 'A', 'B'] as RankFilter[]).map(r => (
                        <button key={r} onClick={() => setRankFilter(r)}
                            className="px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-all"
                            style={rankFilter === r
                                ? { background: '#1C1917', color: '#fff', borderColor: '#1C1917' }
                                : { background: '#fff', color: '#78716C', borderColor: '#E7E5E4' }}>
                            {r === 'ALL' ? `全部 (${totalCount})` : `${r}ランク`}
                        </button>
                    ))}
                </div>

                {/* Chapter jump nav */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {ONBASE_CHAPTERS.map((c, i) => (
                        <a key={c.id} href={`#${c.id}`}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-stone-200 text-stone-600 hover:border-amber-300 transition-all whitespace-nowrap">
                            {i + 1}. {c.titleJa}
                        </a>
                    ))}
                </div>

                {/* Chapters */}
                {ONBASE_CHAPTERS.map((chapter, ci) => {
                    const entries = chapter.entries.filter(e => rankFilter === 'ALL' || e.rank === rankFilter);
                    if (entries.length === 0) return null;
                    return (
                        <section key={chapter.id} id={chapter.id} className="mt-10 scroll-mt-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-[22px] font-black" style={{ color: ACCENT }}>{String(ci + 1).padStart(2, '0')}</span>
                                <div>
                                    <h2 className="text-[16px] font-bold text-stone-900">{chapter.titleJa}</h2>
                                    <div className="text-[11px] text-stone-400 font-medium tracking-wide">{chapter.time} ・ {chapter.title}</div>
                                </div>
                            </div>
                            <p className="mt-1.5 text-[12.5px] text-stone-500 leading-relaxed">{chapter.summary}</p>

                            <div className="mt-4 space-y-4">
                                {entries.map((entry, ei) => {
                                    const id = `${chapter.id}_${ei}_${entry.expression}`;
                                    const rank = rankBadge(entry.rank);
                                    const isReged = registered.has(id);
                                    const isReging = registeringId === id;
                                    return (
                                        <div key={id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
                                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-[11px] font-black px-2 py-0.5 rounded" style={{ color: rank.color, background: rank.bg }}>{entry.rank}</span>
                                                    <span className="text-[15px] font-bold text-stone-900">{entry.expression}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => speakText(entry.target)}
                                                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-stone-200 text-stone-500 hover:border-stone-400 transition-all">
                                                        再生
                                                    </button>
                                                    <button onClick={() => handleRegister(id, entry)} disabled={isReged || isReging}
                                                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all"
                                                        style={isReged
                                                            ? { borderColor: '#D1FAE5', background: '#ECFDF5', color: EMERALD }
                                                            : { borderColor: '#E7E5E4', color: '#78716C' }}>
                                                        {isReged ? '登録済み' : isReging ? '...' : '+ トレーニング'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-3 rounded-lg bg-stone-50 border border-stone-100 px-4 py-3 space-y-1">
                                                <div className="text-[12.5px] italic text-stone-400 leading-relaxed">{entry.contextBefore}</div>
                                                <div className="text-[14px] font-semibold text-stone-900 leading-relaxed">{entry.target}</div>
                                                <div className="text-[12.5px] italic text-stone-400 leading-relaxed">{entry.contextAfter}</div>
                                            </div>

                                            <div className="mt-3 pl-3 border-l-2 text-[12.5px] leading-relaxed text-stone-600" style={{ borderColor: ACCENT }}>
                                                {entry.note}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}

                <div className="mt-14 text-center text-[11px] text-stone-400 tracking-wider">
                    ON BASE HARVEST ・ 全{ONBASE_CHAPTERS.length}チャプター {totalCount}表現 ・ 実発話のみ
                </div>
            </div>
        </div>
    );
}
