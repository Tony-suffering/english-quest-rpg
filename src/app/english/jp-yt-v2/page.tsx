'use client';

// 罪悪感ゼロ英語 v2 — TODAY モード
// v1(カレンダー=辞書)との対比版。1表現ずつ全画面フォーカス、自己採点、連続日数、課金導線。
// 思想: 「観るだけ」を「毎日1本やり切る習慣」に変える。リテンション + 変換点を設計に組み込む。

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    JPYT_SEEDS,
    JPYT_SOURCE_BY_DATE,
    type JpYtEntry,
    type JpYtSource,
} from '@/data/english/jp-yt-seed';

const ACCENT = '#0EA5E9';
const ROSE = '#F472B6';
const GOLD = '#D4AF37';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.95;
    window.speechSynthesis.speak(u);
}

function jstToday(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}
function dayKeyToSlot(k: string) { return parseInt(k.slice(8, 10), 10); }
function prevDateStr(s: string): string {
    const [y, m, d] = s.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d - 1));
    return dt.toISOString().slice(0, 10);
}

interface DayPack { dateKey: string; source: JpYtSource | null; entries: (JpYtEntry & { id: string })[]; }

// --- streak (localStorage) ---
function loadStreak(): { lastDate: string; count: number } {
    if (typeof window === 'undefined') return { lastDate: '', count: 0 };
    try { return JSON.parse(localStorage.getItem('jpyt2-streak') || '') || { lastDate: '', count: 0 }; }
    catch { return { lastDate: '', count: 0 }; }
}
function bumpStreak(today: string): number {
    const s = loadStreak();
    let count = s.count;
    if (s.lastDate === today) { /* already counted today */ }
    else if (s.lastDate === prevDateStr(today)) count = s.count + 1;
    else count = 1;
    try { localStorage.setItem('jpyt2-streak', JSON.stringify({ lastDate: today, count })); } catch {}
    return count;
}
function loadKnown(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try { return new Set<string>(JSON.parse(localStorage.getItem('jpyt2-known') || '[]')); }
    catch { return new Set(); }
}

export default function JpYtV2Page() {
    // build all day-packs that have entries, sorted by date
    const packs = useMemo<DayPack[]>(() => {
        const byKey = new Map<string, (JpYtEntry & { id: string })[]>();
        for (const seed of JPYT_SEEDS) {
            const month = seed.month || '2026-05';
            const key = `${month}-${String(seed.daySlot).padStart(2, '0')}`;
            if (!byKey.has(key)) byKey.set(key, []);
            const list = byKey.get(key)!;
            list.push({ ...seed, id: `${key}_${list.length}` });
        }
        return [...byKey.entries()]
            .map(([dateKey, entries]) => ({ dateKey, source: JPYT_SOURCE_BY_DATE[dateKey] || null, entries }))
            .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
    }, []);

    const today = jstToday();
    // default day = today if seeded, else latest seeded <= today, else last pack
    const defaultIdx = useMemo(() => {
        const exact = packs.findIndex(p => p.dateKey === today);
        if (exact >= 0) return exact;
        let best = packs.length - 1;
        for (let i = 0; i < packs.length; i++) if (packs[i].dateKey <= today) best = i;
        return best < 0 ? 0 : best;
    }, [packs, today]);

    const [packIdx, setPackIdx] = useState(defaultIdx);
    useEffect(() => { setPackIdx(defaultIdx); }, [defaultIdx]);

    const pack = packs[packIdx];
    const [step, setStep] = useState(0);           // which expression
    const [revealed, setRevealed] = useState(false);
    const [known, setKnown] = useState<Set<string>>(loadKnown);
    const [gradedToday, setGradedToday] = useState(0);
    const [finished, setFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => { setStep(0); setRevealed(false); setFinished(false); setGradedToday(0); }, [packIdx]);

    const entry = pack?.entries[step];
    const total = pack?.entries.length || 0;

    const grade = useCallback((ok: boolean) => {
        if (!entry) return;
        if (ok) {
            setKnown(prev => {
                const next = new Set(prev).add(entry.id);
                try { localStorage.setItem('jpyt2-known', JSON.stringify([...next])); } catch {}
                return next;
            });
        }
        setGradedToday(g => g + 1);
        if (step + 1 >= total) {
            setFinished(true);
            setStreak(bumpStreak(today));
        } else {
            setStep(s => s + 1);
            setRevealed(false);
        }
    }, [entry, step, total, today]);

    if (!pack) return null;

    const knownCount = known.size;
    const dayLabel = `${parseInt(pack.dateKey.slice(5, 7), 10)}/${dayKeyToSlot(pack.dateKey)}`;

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '0 0 60px' }}>
            {/* Sticky top bar: progress + streak + toggle */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LINE}`, padding: '12px 16px' }}>
                <div style={{ maxWidth: 620, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: INK }}>
                            罪悪感ゼロ <span style={{ color: ACCENT }}>TODAY</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, background: '#FEF9E7', borderRadius: 999, padding: '3px 9px' }}>
                                連続 {streak || loadStreak().count} 日
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: SUB }}>覚えた {knownCount}</span>
                            <Link href="/english/jp-yt" style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textDecoration: 'none' }}>カレンダー版 →</Link>
                        </div>
                    </div>
                    {/* progress bar */}
                    <div style={{ height: 6, background: '#EEE', borderRadius: 999, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.round(((finished ? total : step) / total) * 100)}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ROSE})`, transition: 'width 0.3s ease' }} />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 620, margin: '0 auto', padding: '16px' }}>
                {/* Day / creator + video */}
                {pack.source && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: 14, marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <button onClick={() => setPackIdx(i => Math.max(0, i - 1))} disabled={packIdx === 0} style={miniNav}>‹</button>
                            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: SUB }}>{dayLabel} ・ {pack.source.creator}</div>
                                <div style={{ fontSize: 13, fontWeight: 800, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pack.source.title}</div>
                            </div>
                            <button onClick={() => setPackIdx(i => Math.min(packs.length - 1, i + 1))} disabled={packIdx === packs.length - 1} style={miniNav}>›</button>
                        </div>
                        <button onClick={() => setShowVideo(v => !v)} style={{ ...linkBtn, marginTop: 8 }}>
                            {showVideo ? '▾ 動画を隠す' : '▸ 今日の動画を観る'}
                        </button>
                        {showVideo && pack.source.youtubeId && (
                            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden', marginTop: 8, background: '#000' }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${pack.source.youtubeId}`}
                                    title={pack.source.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* MAIN: single-expression focus or finish screen */}
                {!finished && entry && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 20, padding: '28px 22px', minHeight: 320, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: SUB, textAlign: 'center' }}>{step + 1} / {total}</div>

                        {/* The Japanese prompt */}
                        <div style={{ textAlign: 'center', margin: '24px 0 12px' }}>
                            <div style={{ fontSize: 34, fontWeight: 900, color: INK, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                「{entry.japanese}」
                            </div>
                            {!revealed && (
                                <div style={{ fontSize: 14, color: SUB, marginTop: 14, fontWeight: 600 }}>
                                    …これ、英語で言える？
                                </div>
                            )}
                        </div>

                        {!revealed ? (
                            <button onClick={() => setRevealed(true)} style={{ ...primaryBtn, marginTop: 'auto' }}>
                                答えを見る
                            </button>
                        ) : (
                            <div style={{ marginTop: 8 }}>
                                {/* English */}
                                <div style={{ background: '#F0F9FF', borderRadius: 14, borderLeft: `3px solid ${ACCENT}`, padding: '16px 18px', textAlign: 'center' }}>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: INK, lineHeight: 1.5 }}>&ldquo;{entry.english}&rdquo;</div>
                                    <button onClick={() => speak(entry.english)} style={{ ...chip, marginTop: 10 }}>
                                        ▶ 音で聞く
                                    </button>
                                </div>
                                {/* alternatives */}
                                {entry.alternatives.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 10 }}>
                                        {entry.alternatives.map((a, i) => (
                                            <button key={i} onClick={() => speak(a)} style={chip}>{a}</button>
                                        ))}
                                    </div>
                                )}
                                {/* note */}
                                <div style={{ fontSize: 13, color: '#44403C', margin: '12px 0 0', padding: '11px 14px', background: '#FDF2F8', borderRadius: 10, borderLeft: `3px solid ${ROSE}`, lineHeight: 1.75 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: ROSE, marginRight: 6 }}>とにお</span>{entry.note}
                                </div>
                                {/* self-grade */}
                                <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                                    <button onClick={() => grade(false)} style={{ ...gradeBtn, background: '#fff', color: SUB, border: `1px solid ${LINE}` }}>ムリだった</button>
                                    <button onClick={() => grade(true)} style={{ ...gradeBtn, background: ACCENT, color: '#fff', border: 'none' }}>言えた</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* FINISH screen */}
                {finished && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 20, padding: '32px 22px', textAlign: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT, letterSpacing: '0.1em' }}>TODAY CLEAR</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: INK, margin: '8px 0 4px' }}>今日のぶん、やり切った</div>
                        <p style={{ fontSize: 13, color: SUB, lineHeight: 1.7, margin: '0 0 20px' }}>
                            完璧じゃなくていい。崩れたまま、今日も口に出した。<br />それでいい。それが続く。
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 22 }}>
                            <Stat label="連続" value={`${streak}日`} color={GOLD} />
                            <Stat label="今日" value={`${total}個`} color={ACCENT} />
                            <Stat label="累計" value={`${knownCount}`} color={ROSE} />
                        </div>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`罪悪感ゼロ英語、今日も${total}個やり切った（連続${streak}日）。「${pack.entries[0].japanese}」=${pack.entries[0].english} \n#罪悪感ゼロ英語`)}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ ...primaryBtn, display: 'block', textDecoration: 'none', marginBottom: 10 }}
                        >
                            Xで今日の記録をシェア
                        </a>
                        <button onClick={() => { setPackIdx(i => Math.min(packs.length - 1, i + 1)); }} style={{ ...linkBtn, marginBottom: 22 }}>
                            次の日もやる →
                        </button>

                        {/* MONETIZATION surface */}
                        <div style={{ background: 'linear-gradient(135deg, #FEF9E7, #fff)', border: `1px solid ${GOLD}55`, borderRadius: 16, padding: 18, textAlign: 'left' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: '0.08em' }}>MEMBER</div>
                            <div style={{ fontSize: 16, fontWeight: 900, color: INK, margin: '4px 0 6px' }}>「ムリだった」だけ、明日また出てくる</div>
                            <p style={{ fontSize: 12.5, color: '#57534E', lineHeight: 1.7, margin: '0 0 12px' }}>
                                無料は今日の分だけ。メンバーになると、<b>言えなかった表現だけが自動で復習に回り(SRS)</b>、過去の全動画・全表現が解放される。1日5分の習慣を、ひとりじゃなく続ける場所。
                            </p>
                            <Link href="/english/home" style={{ ...primaryBtn, display: 'inline-block', textDecoration: 'none', background: GOLD, color: '#1c1917' }}>
                                メンバーについて見る
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div style={{ flex: 1, background: '#FAFAF9', borderRadius: 12, padding: '12px 6px' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color }}>{value}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: SUB, marginTop: 2 }}>{label}</div>
        </div>
    );
}

const primaryBtn: React.CSSProperties = {
    width: '100%', padding: '14px', borderRadius: 12, border: 'none',
    background: ACCENT, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer',
};
const gradeBtn: React.CSSProperties = {
    flex: 1, padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer',
};
const chip: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#fff', border: `1px solid ${LINE}`, borderRadius: 999,
    padding: '6px 12px', fontSize: 12.5, color: '#44403C', cursor: 'pointer',
};
const linkBtn: React.CSSProperties = {
    background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: ACCENT,
};
const miniNav: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 8, border: `1px solid ${LINE}`, background: '#fff',
    cursor: 'pointer', fontSize: 16, color: '#57534E', flexShrink: 0,
};
