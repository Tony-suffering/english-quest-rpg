'use client';

/**
 * 俺語録カレンダー — 2026年10月から1日5個。
 *
 * 【なぜカレンダーにしたか】
 * 会話ごとの積み上げログだと、拾えた日と拾えなかった日で密度がばらつき、
 * 「今日の分」が決まらない。**日付に5個ずつ置けば、開いた瞬間にやることが決まる。**
 * 英語筋トレ(/english/goroku)と同じ ReviewCalendar を使い、操作を揃えてある。
 *
 * 【2つの層】
 *   1. 10月からの固定カリキュラム(goroku-october.ts)。本人が実際に打った日本語だけが種
 *   2. 会話ごとに拾ったログ(/api/goroku-log)。過去の日付に残る
 * どちらも同じカレンダーに乗せる。日付が違うので混ざらない。
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import ReviewCalendar from '@/components/english/ReviewCalendar';
import GorokuLevelPanel from '@/components/english/GorokuLevelPanel';
import {
    GOROKU_OCTOBER, GOROKU_CATS, GOROKU_SCENES, GOROKU_OCT_TOTAL,
    type GorokuCat, type GorokuScene, type GorokuOctEntry,
} from '@/data/english/goroku-october';

const REG_KEY = 'goroku_log_registered';
const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const CREAM = '#FAFAF9';

/** 10月のカリキュラム側の1枚 */
interface Card {
    id: string;
    day: number;
    key: string;
    cat: string;
    scene: string;
    ja: string;
    en: string;
    note: string;
    use: string;
    /** 会話ログ由来。カリキュラムではない */
    fromLog?: boolean;
}

const CATEGORY_COLORS: Record<string, { fg: string; bg: string }> = Object.fromEntries(
    GOROKU_CATS.map((c) => [c.id, { fg: c.fg, bg: c.bg }]),
);
CATEGORY_COLORS.log = { fg: '#57534E', bg: '#F5F5F4' };

const CAT_JA: Record<string, string> = Object.fromEntries(GOROKU_CATS.map((c) => [c.id, c.ja]));
CAT_JA.log = '会話ログ';

const SCENE_JA: Record<string, string> = Object.fromEntries(GOROKU_SCENES.map((c) => [c.id, c.ja]));
SCENE_JA.log = '出どころ';

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

/** 会話ログの1行。D1 と TS 種の両方がこの形で来る */
interface LogRow {
    id: string;
    date: string;
    source: string;
    ja: string;
    pattern: string;
    english: string;
    note: string;
}

export default function GorokuLogPage() {
    // カリキュラムは10月から。今日が9月でも、開いたら10月が出る
    const [viewYear, setViewYear] = useState(2026);
    const [viewMonth, setViewMonth] = useState(9);
    const [selectedDay, setSelectedDay] = useState<number | null>(1);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [logRows, setLogRows] = useState<LogRow[]>([]);
    const [catFilter, setCatFilter] = useState<GorokuCat | null>(null);
    const [sceneFilter, setSceneFilter] = useState<GorokuScene | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        setRegistered(loadRegistered());
        (async () => {
            try {
                const j = await (await fetch('/api/goroku-log')).json();
                setLogRows(j.entries || []);
            } catch { /* 会話ログが取れなくてもカリキュラムは出す */ }
        })();
    }, []);

    /** 表示中の月のカード。10月はカリキュラム、それ以外の月は会話ログ */
    const cards = useMemo<Card[]>(() => {
        const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
        const out: Card[] = [];
        if (monthKey === '2026-10') {
            for (const d of GOROKU_OCTOBER) {
                d.entries.forEach((e: GorokuOctEntry, i) => {
                    out.push({
                        id: `oct-${d.day}-${i}`, day: d.day, key: e.key, cat: e.cat, scene: e.scene,
                        ja: e.ja, en: e.en, note: e.note, use: e.use,
                    });
                });
            }
        }
        for (const r of logRows) {
            if (!r.date || !r.date.startsWith(monthKey)) continue;
            const day = Number(r.date.slice(8, 10));
            if (!day) continue;
            out.push({
                id: `log-${r.id}`, day, key: r.pattern || '会話ログ', cat: 'log', scene: 'log',
                ja: r.ja, en: r.english, note: r.note || '', use: r.source || '',
                fromLog: true,
            });
        }
        return out;
    }, [viewYear, viewMonth, logRows]);

    const themeOf = useCallback((day: number): string => {
        const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
        if (monthKey !== '2026-10') return '';
        return GOROKU_OCTOBER.find((d) => d.day === day)?.theme || '';
    }, [viewYear, viewMonth]);

    const byDay = useMemo(() => {
        const m: Record<number, Card[]> = {};
        for (const c of cards) (m[c.day] = m[c.day] || []).push(c);
        return m;
    }, [cards]);

    const calendarEntries = useMemo(() =>
        cards.map((c) => ({ id: c.id, day_slot: c.day, japanese: c.ja, category: c.cat })),
    [cards]);

    const prevMonth = useCallback(() => {
        setSelectedDay(1);
        setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; });
    }, []);
    const nextMonth = useCallback(() => {
        setSelectedDay(1);
        setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; });
    }, []);
    const goToday = useCallback(() => {
        const d = new Date();
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
        setSelectedDay(d.getDate());
    }, []);

    const addToTraining = useCallback(async (english: string, japanese: string) => {
        const k = english.toLowerCase();
        if (registered.has(k) || busy) return;
        setBusy(k);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, category: 'expression', date: todayStr() }),
            });
            if (res.ok || res.status === 409) {
                setRegistered((prev) => {
                    const next = new Set(prev);
                    next.add(k);
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
                    return next;
                });
            }
        } catch { /* 失敗しても画面は壊さない */ }
        setBusy(null);
    }, [registered, busy]);

    const dayCards = selectedDay ? (byDay[selectedDay] || []) : [];
    const shown = dayCards
        .filter((c) => !catFilter || c.cat === catFilter)
        .filter((c) => !sceneFilter || c.scene === sceneFilter);
    const theme = selectedDay ? themeOf(selectedDay) : '';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: CREAM }}>
            <EnglishSidebar />
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                height: isMobile ? 'auto' : '100vh',
            }}>
                <ReviewCalendar
                    title="俺語録"
                    subtitle={`${GOROKU_OCT_TOTAL} expressions from October`}
                    accent={GOLD}
                    accentBg="#FEF9E7"
                    entries={calendarEntries}
                    categoryColors={CATEGORY_COLORS}
                    selectedDay={selectedDay}
                    onSelectDay={(day) => { setSelectedDay(day); setCatFilter(null); setSceneFilter(null); }}
                    viewYear={viewYear}
                    viewMonth={viewMonth}
                    onPrevMonth={prevMonth}
                    onNextMonth={nextMonth}
                    onGoToday={goToday}
                    storagePrefix="goroku-log"
                    playedIds={new Set([...registered])}
                    isMobile={isMobile}
                />

                {/* 右: その日の5個 */}
                <div style={{
                    flex: 1, overflowY: 'auto', padding: isMobile ? '18px 14px 60px' : '26px 30px 60px',
                }}>
                    <div style={{ maxWidth: '720px' }}>
                        <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT }}>
                            {viewYear}.{String(viewMonth + 1).padStart(2, '0')}.{String(selectedDay || 1).padStart(2, '0')}
                        </div>
                        <h1 style={{
                            margin: '5px 0 3px', fontFamily: 'Georgia, serif',
                            fontSize: '23px', fontWeight: 900, color: INK,
                        }}>{theme || 'この日の分'}</h1>
                        <p style={{ margin: '0 0 14px', fontSize: '11.5px', color: SUB, lineHeight: 1.8 }}>
                            全部あなたが実際に打った日本語から採ってある。訳したのではなく、
                            同じことをネイティブが言う時の形に置き換えてある。
                            覚えるのは<b>あなたが使う言葉</b>なので、場面はレッスンに限らない。
                            指示を出す時、書く時、現場、日常、DMM の5つに散らしてある。
                        </p>

                        {/* 平準化: 会話ログを型と語尾で数える。保存 → 平準化 の順で、保存が先 */}
                        {logRows.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                                <GorokuLevelPanel
                                    rows={logRows.map((r) => ({ date: r.date, source: r.source, ja: r.ja, pattern: r.pattern, english: r.english }))}
                                    isMobile={isMobile}
                                />
                            </div>
                        )}

                        {/* カテゴリの絞り込み */}
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                            {GOROKU_CATS.map((c) => {
                                const n = dayCards.filter((x) => x.cat === c.id).length;
                                if (!n) return null;
                                const on = catFilter === c.id;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setCatFilter(on ? null : c.id)}
                                        style={{
                                            fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px',
                                            color: on ? '#fff' : c.fg, background: on ? c.fg : c.bg,
                                            border: `1px solid ${c.fg}44`, borderRadius: '999px',
                                            padding: '4px 10px', cursor: 'pointer',
                                        }}
                                    >{c.ja} {n}</button>
                                );
                            })}
                        </div>

                        {/* 場面の絞り込み */}
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                            {GOROKU_SCENES.map((sc) => {
                                const n = dayCards.filter((x) => x.scene === sc.id).length;
                                if (!n) return null;
                                const on = sceneFilter === sc.id;
                                return (
                                    <button
                                        key={sc.id}
                                        onClick={() => setSceneFilter(on ? null : sc.id)}
                                        title={sc.note}
                                        style={{
                                            fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px',
                                            color: on ? '#fff' : SUB, background: on ? SUB : '#fff',
                                            border: `1px solid ${LINE}`, borderRadius: '6px',
                                            padding: '4px 10px', cursor: 'pointer',
                                        }}
                                    >{sc.ja} {n}</button>
                                );
                            })}
                        </div>

                        {shown.length === 0 && (
                            <div style={{
                                border: `1px dashed ${LINE}`, borderRadius: '12px', padding: '22px',
                                textAlign: 'center', fontSize: '12px', color: FAINT,
                            }}>この日はまだ空。10月1日から入っている。</div>
                        )}

                        {shown.map((c, i) => {
                            const done = registered.has(c.en.toLowerCase());
                            const col = CATEGORY_COLORS[c.cat] || CATEGORY_COLORS.log;
                            return (
                                <div key={c.id} style={{
                                    border: `1px solid ${LINE}`, borderLeft: `4px solid ${col.fg}`,
                                    borderRadius: '12px', background: '#fff',
                                    padding: '13px 15px', marginBottom: '10px',
                                }}>
                                    <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '9px', fontWeight: 900, color: FAINT, width: '14px' }}>{i + 1}</span>
                                        <span style={{
                                            fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                                            color: col.fg, background: col.bg, borderRadius: '4px', padding: '2px 7px',
                                        }}>{CAT_JA[c.cat] || c.cat}</span>
                                        {!c.fromLog && (
                                            <span style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{c.key}</span>
                                        )}
                                        <button
                                            onClick={() => addToTraining(c.en, c.ja)}
                                            disabled={done || busy === c.en.toLowerCase()}
                                            style={{
                                                marginLeft: 'auto', fontSize: '10px', fontWeight: 900,
                                                color: done ? '#fff' : DEEPGOLD,
                                                background: done ? '#10B981' : '#FEF9E7',
                                                border: `1px solid ${done ? '#10B981' : GOLD}66`,
                                                borderRadius: '999px', padding: '4px 11px',
                                                cursor: done ? 'default' : 'pointer',
                                            }}
                                        >{done ? '登録済み' : 'トレーニングに追加'}</button>
                                    </div>

                                    <div style={{ marginTop: '8px', fontSize: '13.5px', color: SUB, lineHeight: 1.7 }}>
                                        {c.ja}
                                    </div>
                                    <div style={{
                                        marginTop: '4px', fontFamily: 'Georgia, serif',
                                        fontSize: '17px', fontWeight: 700, color: INK, lineHeight: 1.6,
                                    }}>{c.en}</div>

                                    {c.note && (
                                        <div style={{
                                            marginTop: '9px', fontSize: '11.5px', color: SUB, lineHeight: 1.85,
                                            background: CREAM, border: `1px solid ${LINE}`,
                                            borderRadius: '8px', padding: '8px 11px',
                                        }}>{c.note}</div>
                                    )}
                                    {c.use && (
                                        <div style={{ marginTop: '6px', display: 'flex', gap: '7px', alignItems: 'baseline' }}>
                                            <span style={{
                                                fontSize: '8.5px', fontWeight: 900, letterSpacing: '0.5px',
                                                color: SUB, background: '#F5F5F4', border: `1px solid ${LINE}`,
                                                borderRadius: '4px', padding: '2px 6px', whiteSpace: 'nowrap',
                                            }}>{SCENE_JA[c.scene] || c.scene}</span>
                                            <span style={{ fontSize: '11.5px', color: FAINT, lineHeight: 1.7 }}>{c.use}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
