'use client';

// note遠征 -- 英語コミュニティの外へ読みに行く作戦の司令室。
// 左: 日めくりカレンダー(tonight/calendar と同じ ReviewCalendar)。
// 右: 遠征キュー(読む/返信すべき人のリスト) + 選択日の3層比較
//     (逐語ごみ訳 / note公式AI訳 / 俺の面白版) + トレーニング登録。
// 返信の本文はこの画面に置かない(切り口だけ)。中身は本人が書く。

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ReviewCalendar from '@/components/english/ReviewCalendar';
import { ENSEI_META, enseiEntries, type EnseiEntry } from '@/data/english/note-ensei';

const INK = '#17130F';
const MUTED = '#6E6558';
const GOLD = '#B8941E';
const GOLD_HI = '#C79A1E';
const GREEN = '#10B981';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

const GENRE_COLORS: Record<string, { fg: string; bg: string }> = {
    'エッセイ': { fg: '#B8941E', bg: '#FEF9E7' },
    'テック': { fg: '#3E7AB8', bg: '#EFF6FF' },
    '会話': { fg: '#3E7AB8', bg: '#EFF6FF' },
    '生き方': { fg: '#2E9E6B', bg: '#ECFDF5' },
    '人生': { fg: '#2E9E6B', bg: '#ECFDF5' },
    '料理': { fg: '#C0392B', bg: '#FEF2F2' },
};
const DEFAULT_GENRE = { fg: '#8A8171', bg: '#F5F5F4' };

const STATUS_KEY = 'ensei_status';
const REG_KEY = 'ensei_registered';
type Status = 'unread' | 'read' | 'replied';
const STATUS_LABEL: Record<Status, string> = { unread: '未読', read: '読んだ', replied: '返信済み' };
const STATUS_COLOR: Record<Status, { fg: string; bg: string }> = {
    unread: { fg: '#8A8171', bg: '#F5F5F4' },
    read: { fg: '#3E7AB8', bg: '#EFF6FF' },
    replied: { fg: '#047857', bg: '#ECFDF5' },
};

function parseYMD(date: string) { const [y, m, d] = date.split('-').map(Number); return { y, m: (m || 1) - 1, d: d || 1 }; }
function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function loadJson<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
}

export default function EnseiPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [status, setStatus] = useState<Record<string, Status>>({});
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check(); window.addEventListener('resize', check);
        setStatus(loadJson<Record<string, Status>>(STATUS_KEY, {}));
        setRegistered(new Set(loadJson<string[]>(REG_KEY, [])));
        return () => window.removeEventListener('resize', check);
    }, []);

    const entries = enseiEntries;
    const latest = [...entries].sort((a, b) => a.date.localeCompare(b.date))[entries.length - 1];
    const init = latest ? parseYMD(latest.date) : (() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }; })();
    const [viewYear, setViewYear] = useState(init.y);
    const [viewMonth, setViewMonth] = useState(init.m);
    const [selectedDay, setSelectedDay] = useState<number | null>(latest ? init.d : null);

    const monthEntries = useMemo(
        () => entries.filter((e) => { const p = parseYMD(e.date); return p.y === viewYear && p.m === viewMonth; }),
        [entries, viewYear, viewMonth],
    );
    const calEntries = useMemo(
        () => monthEntries.map((e) => ({ id: e.id, day_slot: parseYMD(e.date).d, japanese: `${e.creator}`, category: e.genre })),
        [monthEntries],
    );
    const doneIds = useMemo(
        () => new Set(entries.filter((e) => (status[e.id] ?? 'unread') !== 'unread').map((e) => e.id)),
        [entries, status],
    );
    const repliedIds = useMemo(
        () => new Set(entries.filter((e) => status[e.id] === 'replied').map((e) => e.id)),
        [entries, status],
    );

    const shiftMonth = (delta: number) => {
        setSelectedDay(null);
        const total = viewYear * 12 + viewMonth + delta;
        setViewYear(Math.floor(total / 12));
        setViewMonth(((total % 12) + 12) % 12);
    };
    const goToday = () => { const n = new Date(); setViewYear(n.getFullYear()); setViewMonth(n.getMonth()); setSelectedDay(n.getDate()); };

    const selected = selectedDay ? monthEntries.filter((e) => parseYMD(e.date).d === selectedDay) : [];

    const setEntryStatus = useCallback((id: string, s: Status) => {
        setStatus((prev) => {
            const next = { ...prev, [id]: s };
            try { localStorage.setItem(STATUS_KEY, JSON.stringify(next)); } catch { /* noop */ }
            return next;
        });
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
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
                    return next;
                });
            }
        } catch { /* silent */ } finally { setBusy(null); }
    }, [registered, busy]);

    const genreColor = (g: string) => GENRE_COLORS[g] ?? DEFAULT_GENRE;

    const StatusChip = ({ s }: { s: Status }) => (
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: STATUS_COLOR[s].fg, background: STATUS_COLOR[s].bg, borderRadius: 999, padding: '3px 10px', whiteSpace: 'nowrap' }}>{STATUS_LABEL[s]}</span>
    );

    const AddButton = ({ english, japanese }: { english: string; japanese: string }) => {
        const done = registered.has(english.toLowerCase());
        const loading = busy === english.toLowerCase();
        return (
            <button
                onClick={() => addToTraining(english, japanese)}
                disabled={done || loading}
                style={{
                    marginTop: 8, padding: '5px 13px', fontSize: 11.5, fontWeight: 700, borderRadius: 8,
                    cursor: done ? 'default' : 'pointer',
                    border: done ? `1px solid ${GREEN}` : '1px solid #D4AF37',
                    background: done ? 'rgba(16,185,129,0.08)' : 'rgba(212,175,55,0.08)',
                    color: done ? '#047857' : '#8a6d1a',
                }}
            >
                {done ? '登録済み' : loading ? '追加中…' : 'トレーニングに追加'}
            </button>
        );
    };

    /** 3層のうちの1層 */
    const Layer = ({ no, label, text, tone, note }: { no: string; label: string; text?: string; tone: 'dead' | 'official' | 'mine'; note?: string }) => {
        const conf = tone === 'dead'
            ? { border: '#E7E5E4', bg: '#FAFAF9', fg: '#78716C', tag: '#A8A29E' }
            : tone === 'official'
                ? { border: '#BFDBFE', bg: '#F8FBFF', fg: '#1E3A5F', tag: '#3E7AB8' }
                : { border: '#E5D9A8', bg: '#FFFDF4', fg: INK, tag: GOLD };
        return (
            <div style={{ border: `1px solid ${conf.border}`, background: conf.bg, borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 900, color: conf.tag }}>{no}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: conf.tag }}>{label}</span>
                </div>
                {text
                    ? <p style={{ margin: 0, fontSize: tone === 'mine' ? 15.5 : 13.5, lineHeight: 1.85, color: conf.fg, fontFamily: 'Georgia, serif', fontWeight: tone === 'mine' ? 600 : 400 }}>{text}</p>
                    : <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#A8A29E', fontStyle: 'italic' }}>{note}</p>}
                {text && note && <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, marginTop: 8, borderTop: `1px dashed ${conf.border}`, paddingTop: 8 }}>{note}</div>}
            </div>
        );
    };

    const EntryDetail = ({ e }: { e: EnseiEntry }) => {
        const s = status[e.id] ?? 'unread';
        const gc = genreColor(e.genre);
        return (
            <div style={{ marginBottom: 24 }}>
                {/* ヘッダー */}
                <div style={{ background: INK, color: '#fff', borderRadius: '12px 12px 0 0', padding: '20px 22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: GOLD_HI }}>{e.date} ・ {e.genre}</span>
                        <StatusChip s={s} />
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 900, marginTop: 8, lineHeight: 1.4 }}>{e.articleTitle}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>
                        {e.creator} ・ スキ {e.likes.toLocaleString()}
                    </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #EEECE7', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '18px 22px' }}>
                    {/* 作戦メモ */}
                    <div style={{ fontSize: 12.5, lineHeight: 1.8, color: MUTED, background: '#FAF8F2', border: '1px solid #EEE8D5', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                        <b style={{ color: INK }}>作戦メモ: </b>{e.memo}
                    </div>

                    {/* 原文 */}
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: MUTED, marginBottom: 6 }}>原文 (引っかかった段落 -- 1記事1段落まで)</div>
                        <blockquote style={{ margin: 0, borderLeft: `4px solid ${gc.fg}`, background: gc.bg, borderRadius: '0 10px 10px 0', padding: '12px 16px', fontSize: 14.5, lineHeight: 2, color: INK, whiteSpace: 'pre-line', fontFamily: SERIF }}>
                            {e.passageJa}
                        </blockquote>
                    </div>

                    {/* 3層 */}
                    <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                        <Layer no="壱" label="逐語 (ごみ訳)" text={e.chokuyaku} tone="dead" note="正しいが死んでいる。characters と数え、勢いを埋葬する訳。比較用。" />
                        <Layer
                            no="弐" label="note公式 (AI訳)"
                            text={e.noteEn}
                            tone="official"
                            note={e.hasNoteEn
                                ? 'GoogleのLLM。語順を組み替え、文字→wordsに直す程度には賢い。ただし声は薄まる。'
                                : `この記事に公式英訳は無い。${e.noEnReason ?? ''}`}
                        />
                        <Layer no="参" label="俺の面白版" text={e.omoshiro} tone="mine" note="原文の声(ふてぶてしさ/勢い/体温)を最優先。ここから下の表現をカード化する。" />
                    </div>

                    {/* トレーニング登録 */}
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: MUTED, marginBottom: 8 }}>持ち帰る表現 (面白版の中から)</div>
                    <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                        {e.phrases.map((p, i) => (
                            <div key={i} style={{ border: '1px solid #E7E5E4', borderRadius: 12, padding: '14px 16px', background: '#fff' }}>
                                <div style={{ fontSize: 16.5, fontWeight: 700, color: INK, lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>{p.english}</div>
                                <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.75, marginTop: 6 }}>{p.japanese}</div>
                                <AddButton english={p.english} japanese={p.japanese} />
                            </div>
                        ))}
                    </div>

                    {/* 返信の切り口 */}
                    <div style={{ fontSize: 12.5, lineHeight: 1.8, color: '#134e4a', background: '#f0fdf9', borderLeft: `4px solid ${GREEN}`, borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 18 }}>
                        <b>返信の切り口: </b>{e.kirikuchi}
                        <span style={{ color: '#6b7f7a' }}> -- 本文はここに書かない。自分の言葉で。</span>
                    </div>

                    {/* 導線 + ステータス */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        <a href={e.articleUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', padding: '9px 16px', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 700, background: INK, color: GOLD_HI, border: `1px solid ${INK}` }}>
                            記事を読む (日本語)
                        </a>
                        {e.hasNoteEn && (
                            <a href={`${e.articleUrl}?hl=en`} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', padding: '9px 16px', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 700, background: '#fff', color: '#1E3A5F', border: '1px solid #BFDBFE' }}>
                                note公式の英語版
                            </a>
                        )}
                        <a href={e.articleUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', padding: '9px 16px', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 700, background: '#fff', color: '#047857', border: '1px solid #A7F3D0' }}>
                            返信しに行く
                        </a>
                        <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 6 }}>
                            {(['unread', 'read', 'replied'] as Status[]).map((v) => (
                                <button key={v} onClick={() => setEntryStatus(e.id, v)}
                                    style={{
                                        padding: '6px 12px', fontSize: 11.5, fontWeight: 700, borderRadius: 8, cursor: 'pointer',
                                        border: `1px solid ${s === v ? STATUS_COLOR[v].fg : '#E7E5E4'}`,
                                        background: s === v ? STATUS_COLOR[v].bg : '#fff',
                                        color: s === v ? STATUS_COLOR[v].fg : '#A8A29E',
                                    }}>
                                    {STATUS_LABEL[v]}
                                </button>
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const readCount = entries.filter((e) => (status[e.id] ?? 'unread') !== 'unread').length;
    const repliedCount = entries.filter((e) => status[e.id] === 'replied').length;

    const StatCard = ({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) => (
        <div style={{ flex: '1 1 120px', minWidth: 110, border: '1px solid #EEECE7', borderTop: `3px solid ${GOLD}`, borderRadius: 10, padding: '12px 14px', background: '#fff' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: '#A8A29E' }}>{label}</div>
            <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 900, color: INK, marginTop: 2, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 10.5, color: '#A8A29E', marginTop: 2 }}>{sub}</div>}
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '100vh' }}>
                {/* 左: カレンダー */}
                <div style={{ flex: isMobile ? 'none' : '0 0 clamp(340px, 42%, 520px)', borderRight: isMobile ? 'none' : '1px solid #EEECE7', display: 'flex', flexDirection: 'column', minHeight: isMobile ? '62vh' : undefined }}>
                    <ReviewCalendar
                        title={ENSEI_META.title}
                        subtitle={`${ENSEI_META.subtitle} ・ 全${entries.length}件`}
                        accent={GOLD}
                        accentBg="#FEF9E7"
                        entries={calEntries}
                        categoryColors={GENRE_COLORS}
                        selectedDay={selectedDay}
                        onSelectDay={(day) => setSelectedDay(day)}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        onPrevMonth={() => shiftMonth(-1)}
                        onNextMonth={() => shiftMonth(1)}
                        onGoToday={goToday}
                        storagePrefix="ensei-cal"
                        playedIds={doneIds}
                        masteredIds={repliedIds}
                        isMobile={isMobile}
                        headerRight={<Link href="/english/tonight" style={{ fontSize: 12, color: GOLD_HI, fontWeight: 700, textDecoration: 'none' }}>今夜も通じない →</Link>}
                    />
                </div>

                {/* 右: キュー + 詳細 */}
                <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '16px 14px 60px' : '28px 32px', minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
                        <StatCard label="遠征先" value={`${entries.length}件`} sub="読むべき人のリスト" />
                        <StatCard label="読んだ" value={`${readCount}件`} sub="英語は入場券" />
                        <StatCard label="返信した" value={`${repliedCount}件`} sub="本体は繋がり" />
                    </div>

                    <p style={{ fontSize: 12.5, lineHeight: 1.9, color: MUTED, margin: '0 0 20px', maxWidth: 640 }}>{ENSEI_META.premise}</p>

                    {selected.length > 0
                        ? selected.map((e) => <EntryDetail key={e.id} e={e} />)
                        : (
                            <div style={{ padding: 24, background: '#fff', border: '1px dashed #E7E5E4', borderRadius: 12, color: '#A8A29E', fontSize: 13, marginBottom: 20 }}>
                                左のカレンダーで日付をタップすると、その日の遠征先(原文 → 3層の訳 → 持ち帰る表現)が開きます。
                            </div>
                        )}

                    {/* 遠征キュー (読むべき・返信すべき人のリスト) */}
                    <div style={{ marginTop: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: INK, marginBottom: 12, letterSpacing: 0.5 }}>遠征キュー (日付順)</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                            {[...entries].sort((a, b) => a.date.localeCompare(b.date)).map((e) => {
                                const s = status[e.id] ?? 'unread';
                                const gc = genreColor(e.genre);
                                return (
                                    <li key={e.id}>
                                        <button
                                            onClick={() => { const p = parseYMD(e.date); setViewYear(p.y); setViewMonth(p.m); setSelectedDay(p.d); }}
                                            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #EEECE7', borderRadius: 10, color: 'inherit' }}
                                        >
                                            <span style={{ fontSize: 11, fontWeight: 800, color: MUTED, whiteSpace: 'nowrap' }}>{e.date.slice(5)}</span>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: gc.fg, background: gc.bg, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }}>{e.genre}</span>
                                            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {e.creator} -- {e.articleTitle}
                                            </span>
                                            <StatusChip s={s} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
