'use client';

// DMM会話をカレンダー形式で格納/閲覧する。既存の ReviewCalendar(goroku/nihongo と同じ型)を
// 流用。左=月カレンダー(実日付)、右=選択日のレッスン一覧。ネイティブ化が全ターン完了した
// レッスンは金色✓で表示。毎日やる前提なので、日付で追える形に。

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReviewCalendar from '@/components/english/ReviewCalendar';

export interface DmmConvLite {
    id: string;
    date: string;            // YYYY-MM-DD
    title: string;
    teacher_name: string | null;
    duration_minutes: number | null;
    turns: number;
    students: number;        // 生徒ターン数
    natives: number;         // ネイティブ化済み生徒ターン数
}

const ACCENT = '#D4AF37';
const ACCENT_BG = '#FEF9E7';
const CATEGORY_COLORS = { DMM: { fg: '#B8860B', bg: '#FEF9E7' } };

function parseYMD(date: string): { y: number; m: number; d: number } {
    const [y, m, d] = date.split('-').map(Number);
    return { y, m: (m || 1) - 1, d: d || 1 };
}

export default function DmmCalendarClient({ conversations }: { conversations: DmmConvLite[] }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // 初期表示月 = 最新レッスンの月(無ければ今月)
    const latest = conversations[0];
    const initial = latest ? parseYMD(latest.date) : (() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }; })();
    const [viewYear, setViewYear] = useState(initial.y);
    const [viewMonth, setViewMonth] = useState(initial.m);
    const [selectedDay, setSelectedDay] = useState<number | null>(latest ? initial.d : null);

    // 表示中の月のレッスン
    const monthConvs = useMemo(
        () => conversations.filter((c) => { const p = parseYMD(c.date); return p.y === viewYear && p.m === viewMonth; }),
        [conversations, viewYear, viewMonth],
    );

    const entries = useMemo(
        () => monthConvs.map((c) => ({ id: c.id, day_slot: parseYMD(c.date).d, japanese: c.title, category: 'DMM' })),
        [monthConvs],
    );

    // 全生徒ターンがネイティブ化済み = 完了(金色✓)
    const masteredIds = useMemo(() => {
        const s = new Set<string>();
        for (const c of monthConvs) if (c.students > 0 && c.natives >= c.students) s.add(c.id);
        return s;
    }, [monthConvs]);

    const shiftMonth = (delta: number) => {
        setSelectedDay(null);
        const total = viewYear * 12 + viewMonth + delta;
        setViewYear(Math.floor(total / 12));
        setViewMonth(((total % 12) + 12) % 12);
    };
    const prevMonth = () => shiftMonth(-1);
    const nextMonth = () => shiftMonth(1);
    const goToday = () => { const n = new Date(); setViewYear(n.getFullYear()); setViewMonth(n.getMonth()); setSelectedDay(n.getDate()); };

    const selectedConvs = selectedDay
        ? monthConvs.filter((c) => parseYMD(c.date).d === selectedDay).sort((a, b) => a.title.localeCompare(b.title))
        : [];
    const selectedDate = selectedDay ? `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}` : '';

    // ---- ダッシュボード統計(右パネルを常に埋める) ----
    const totalLessons = conversations.length;
    const fullyNative = conversations.filter((c) => c.students > 0 && c.natives >= c.students).length;
    const completionPct = totalLessons ? Math.round((fullyNative / totalLessons) * 100) : 0;

    // 連続記録: 最新レッスン日から遡って連続した日数
    const streak = useMemo(() => {
        const uniq = [...new Set(conversations.map((c) => c.date))].sort().reverse();
        if (uniq.length === 0) return 0;
        let s = 1;
        for (let i = 1; i < uniq.length; i++) {
            const prev = new Date(uniq[i - 1]).getTime();
            const cur = new Date(uniq[i]).getTime();
            if ((prev - cur) / 86400000 === 1) s++; else break;
        }
        return s;
    }, [conversations]);

    // やり残し(ネイティブ化 途中)。日付降順(conversations は既に降順)。
    const incomplete = conversations.filter((c) => c.students > 0 && c.natives < c.students);

    const StatCard = ({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) => (
        <div style={{ flex: '1 1 120px', minWidth: 110, border: '1px solid #EEECE7', borderTop: '3px solid #D4AF37', borderRadius: 10, padding: '12px 14px', background: '#fff' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: '#A8A29E' }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#1C1917', marginTop: 2, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 10.5, color: '#A8A29E', marginTop: 2 }}>{sub}</div>}
        </div>
    );

    const nativeBar = (natives: number, students: number) => {
        const pct = students ? Math.round((natives / students) * 100) : 0;
        return (
            <div style={{ marginTop: 8 }}>
                <div style={{ height: 6, background: '#EFEADD', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? '#D4AF37' : '#E7C97A', borderRadius: 999 }} />
                </div>
            </div>
        );
    };

    const headerRight = (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/english/training/dmm/prep" style={{ padding: '6px 12px', background: '#fff', color: '#B8860B', border: '1px solid #D4AF37', borderRadius: 8, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>スピーチ暗記</Link>
            <Link href="/english/training/dmm/admin" style={{ padding: '6px 14px', background: '#10B981', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>+ 新規登録</Link>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '100vh' }}>
                {/* 左: カレンダー */}
                <div style={{ flex: isMobile ? 'none' : '0 0 clamp(340px, 46%, 560px)', borderRight: isMobile ? 'none' : '1px solid #EEECE7', display: 'flex', flexDirection: 'column', minHeight: isMobile ? '62vh' : undefined }}>
                    <ReviewCalendar
                        title="DMM Conversations"
                        subtitle={`${conversations.length} lessons · 日付で格納`}
                        accent={ACCENT}
                        accentBg={ACCENT_BG}
                        entries={entries}
                        categoryColors={CATEGORY_COLORS}
                        selectedDay={selectedDay}
                        onSelectDay={(day) => setSelectedDay(day)}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        onPrevMonth={prevMonth}
                        onNextMonth={nextMonth}
                        onGoToday={goToday}
                        storagePrefix="dmm-conv"
                        playedIds={masteredIds}
                        masteredIds={masteredIds}
                        isMobile={isMobile}
                        headerRight={headerRight}
                    />
                </div>

                {/* 右: ダッシュボード(統計 + 選択日 + やり残し) */}
                <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '16px 14px 60px' : '28px 32px', minWidth: 0 }}>
                    {/* 統計バンド */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                        <StatCard label="連続記録" value={`${streak}日`} sub={streak > 0 ? '毎晩の積み上げ' : '—'} />
                        <StatCard label="総レッスン" value={totalLessons} sub="全期間" />
                        <StatCard label="今月" value={monthConvs.length} sub={`${viewYear}/${viewMonth + 1}`} />
                        <StatCard label="ネイティブ化" value={`${completionPct}%`} sub={`完了 ${fullyNative} / ${totalLessons}`} />
                    </div>

                    {/* 選択日のレッスン */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: 11, letterSpacing: 2, color: '#A8A29E', textTransform: 'uppercase' }}>{selectedDay ? selectedDate : '日付未選択'}</div>
                            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '2px 0 0', color: '#1C1917' }}>
                                {selectedDay ? `${viewMonth + 1}月${selectedDay}日のレッスン` : 'カレンダーの日付を選択'}
                            </h2>
                        </div>
                        {selectedDay && <Link href={`/english/training/dmm/admin?date=${selectedDate}`} style={{ fontSize: 12, color: '#10B981', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>この日に登録 +</Link>}
                    </div>

                    {!selectedDay ? (
                        <div style={{ padding: 24, background: '#fff', border: '1px dashed #E7E5E4', borderRadius: 12, color: '#A8A29E', fontSize: 13 }}>
                            左のカレンダーで日付をタップすると、その日のレッスンが出ます。
                        </div>
                    ) : selectedConvs.length === 0 ? (
                        <div style={{ padding: 24, background: '#fff', border: '1px dashed #E7E5E4', borderRadius: 12, color: '#A8A29E', fontSize: 13 }}>
                            この日はまだレッスンがありません。<Link href={`/english/training/dmm/admin?date=${selectedDate}`} style={{ color: '#10B981', fontWeight: 700, textDecoration: 'none', marginLeft: 6 }}>登録する +</Link>
                        </div>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                            {selectedConvs.map((c) => {
                                const done = c.students > 0 && c.natives >= c.students;
                                return (
                                    <li key={c.id}>
                                        <Link href={`/english/training/dmm/${c.id}`} style={{ display: 'block', padding: '16px 18px', background: '#fff', border: '1px solid #E7E5E4', borderLeft: `4px solid ${done ? ACCENT : '#E7C97A'}`, borderRadius: 12, textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                                                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{c.title}</div>
                                                <span style={{ fontSize: 11, fontWeight: 800, color: done ? '#B8860B' : '#A8A29E', whiteSpace: 'nowrap' }}>{done ? '完了' : `${c.natives}/${c.students}`}</span>
                                            </div>
                                            <div style={{ fontSize: 12.5, color: '#57534E', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                                <span>講師: {c.teacher_name || '—'}</span>
                                                <span>{c.duration_minutes ? `${c.duration_minutes} 分` : '—'}</span>
                                                <span>{c.turns} ターン</span>
                                            </div>
                                            {nativeBar(c.natives, c.students)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {/* やり残し(ネイティブ化 途中) */}
                    {incomplete.length > 0 && (
                        <div style={{ marginTop: 30 }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                                <h3 style={{ fontSize: 13, fontWeight: 800, color: '#1C1917', margin: 0, letterSpacing: 0.5 }}>やり残し — ネイティブ化 途中</h3>
                                <span style={{ fontSize: 11, color: '#A8A29E' }}>{incomplete.length} 件</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                                {incomplete.slice(0, 12).map((c) => (
                                    <li key={c.id}>
                                        <Link href={`/english/training/dmm/${c.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#fff', border: '1px solid #EEECE7', borderRadius: 10, textDecoration: 'none', color: 'inherit' }}>
                                            <span style={{ fontSize: 11, color: '#A8A29E', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{c.date.slice(5)}</span>
                                            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#B8860B', whiteSpace: 'nowrap' }}>{c.natives}/{c.students}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {incomplete.length > 12 && <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 8 }}>ほか {incomplete.length - 12} 件</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
