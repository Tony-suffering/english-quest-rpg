'use client';

// DMM 365 -- calendar 中心の simple 版
// 月カレンダー + 日クリックで単体ビュー (表現 / DMM会話 タブ)
// status state machine 無し、 ただの表現リスト

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Dmm365SessionWithAmmo, Dmm365Ammo, DmmConversation } from '@/lib/d1';
import { parseExcelPaste, expressionsToAmmoPayloads } from './excel-parser';

// ── Design tokens ──
const GOLD = '#D4AF37';
const GOLD_DEEP = '#A16207';
const GOLD_BG = '#FFFBEB';
const GOLD_BORDER = '#FDE68A';
const EMERALD = '#10B981';
const EMERALD_DEEP = '#047857';
const EMERALD_BG = '#ECFDF5';
const EMERALD_BORDER = '#A7F3D0';
const STONE_900 = '#1c1917';
const STONE_700 = '#44403c';
const STONE_500 = '#78716c';
const STONE_400 = '#a8a29e';
const STONE_300 = '#d6d3d1';
const STONE_200 = '#e7e5e4';
const STONE_100 = '#f5f5f4';
const STONE_50 = '#fafaf9';
const WHITE = '#ffffff';

const FONT_SANS = 'system-ui, -apple-system, "Helvetica Neue", sans-serif';
const FONT_MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function todayJst(): string {
    return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function relativeLabel(date: string, today: string): string {
    if (date === today) return '今日';
    const d1 = new Date(`${date}T00:00:00Z`);
    const d2 = new Date(`${today}T00:00:00Z`);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000));
    if (diff === 1) return '昨日';
    if (diff === -1) return '明日';
    if (diff > 0 && diff < 7) return `${diff}日前`;
    if (diff < 0 && diff > -7) return `${-diff}日後`;
    return '';
}

export interface InitialData {
    sessions: Dmm365SessionWithAmmo[];
    dmmConversations: DmmConversation[];
}

interface Props {
    initialData?: InitialData;
    initError?: string | null;
}

// ── Main ──
export default function Dmm365CalendarClient({ initialData, initError }: Props) {
    const [sessions, setSessions] = useState<Dmm365SessionWithAmmo[]>(initialData?.sessions ?? []);
    const [conversations, setConversations] = useState<DmmConversation[]>(initialData?.dmmConversations ?? []);
    const [error, setError] = useState<string | null>(initError ?? null);
    const [loading, setLoading] = useState<boolean>(!initialData);

    const today = useMemo(() => todayJst(), []);
    const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState(() => new Date().getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<string>(today);

    // ── Data fetch ──
    const refreshAll = useCallback(async () => {
        setError(null);
        try {
            const [r1, r2] = await Promise.all([
                fetch('/api/dmm365', { cache: 'no-store' }),
                fetch('/api/dmm-conversations', { cache: 'no-store' }),
            ]);
            const d1 = await r1.json();
            const d2 = await r2.json();
            if (!d1.success) throw new Error(d1.error || 'fetch failed');
            setSessions(d1.sessions);
            if (d2.success) setConversations(d2.conversations);
            setLoading(false);
        } catch (e) {
            setError(String(e));
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialData) refreshAll();
    }, [initialData, refreshAll]);

    // ── Index by date ──
    const sessionsByDate = useMemo(() => {
        const m = new Map<string, Dmm365SessionWithAmmo>();
        for (const s of sessions) m.set(s.date, s);
        return m;
    }, [sessions]);

    const conversationsByDate = useMemo(() => {
        const m = new Map<string, DmmConversation[]>();
        for (const c of conversations) {
            const arr = m.get(c.date) ?? [];
            arr.push(c);
            m.set(c.date, arr);
        }
        return m;
    }, [conversations]);

    // ── Calendar cells ──
    const calendarCells = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth - 1, 1);
        const startWeekday = firstDay.getDay();
        const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
        const cells: Array<{ date: string; day: number; weekday: number } | null> = [];
        for (let i = 0; i < startWeekday; i++) cells.push(null);
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            cells.push({ date, day, weekday: new Date(viewYear, viewMonth - 1, day).getDay() });
        }
        while (cells.length % 7 !== 0) cells.push(null);
        return cells;
    }, [viewYear, viewMonth]);

    // ── Stats ──
    const stats = useMemo(() => {
        const totalExpr = sessions.reduce((s, sess) => s + sess.ammo.length, 0);
        const daysRecorded = sessions.filter(s => s.ammo.length > 0).length;
        const dmmDoneCount = sessions.filter(s => s.session_number != null && s.session_number > 0).length;
        const thisMonth = `${viewYear}-${String(viewMonth).padStart(2, '0')}`;
        const thisMonthExpr = sessions
            .filter(s => s.date.startsWith(thisMonth))
            .reduce((sum, s) => sum + s.ammo.length, 0);
        return { totalExpr, daysRecorded, dmmDoneCount, thisMonthExpr };
    }, [sessions, viewYear, viewMonth]);

    // ── Selected day data ──
    const selectedSession = sessionsByDate.get(selectedDate) ?? null;
    const selectedConvs = conversationsByDate.get(selectedDate) ?? [];

    function shiftMonth(delta: number) {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 1) { m = 12; y -= 1; }
        if (m > 12) { m = 1; y += 1; }
        setViewYear(y);
        setViewMonth(m);
    }

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: STONE_50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_SANS }}>
                <div style={{ color: STONE_500, fontSize: 11, letterSpacing: 3 }}>LOADING</div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: STONE_50, fontFamily: FONT_SANS, color: STONE_900 }}>
            <div style={{ maxWidth: 1080, margin: '0 auto', padding: '20px 16px 100px' }}>

                {/* Top */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                    <Link
                        href="/english/training"
                        style={{
                            fontSize: 12, color: STONE_500, textDecoration: 'none',
                            padding: '6px 10px', border: `1px solid ${STONE_200}`,
                            borderRadius: 8, background: WHITE,
                        }}
                    >← トレーニング</Link>
                    <span style={{ fontSize: 11, color: STONE_500, letterSpacing: 2.5, fontWeight: 600 }}>
                        DMM 365
                    </span>
                    <span style={{ flex: 1 }} />
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: STONE_600 || STONE_500 }}>
                        <Stat label="累計表現" value={stats.totalExpr} accent={GOLD_DEEP} />
                        <Stat label="記録日数" value={stats.daysRecorded} />
                        <Stat label="DMM 完了" value={stats.dmmDoneCount} accent={EMERALD_DEEP} />
                        <Stat label="今月" value={stats.thisMonthExpr} />
                    </div>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: 10, borderRadius: 8, fontSize: 12, marginBottom: 12 }}>
                        {error}
                        <button onClick={() => setError(null)} style={{ marginLeft: 8, background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>×</button>
                    </div>
                )}

                {/* Month calendar */}
                <section style={{ background: WHITE, border: `1px solid ${STONE_200}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <button onClick={() => shiftMonth(-1)} style={monthBtnStyle} aria-label="前月">←</button>
                        <div style={{ fontSize: 16, fontWeight: 700, color: STONE_700, letterSpacing: 1 }}>
                            {viewYear}年 {viewMonth}月
                        </div>
                        <button onClick={() => shiftMonth(1)} style={monthBtnStyle} aria-label="翌月">→</button>
                    </div>

                    {/* Weekday header */}
                    <div style={calendarGridStyle}>
                        {WEEKDAYS.map((w, i) => (
                            <div key={w} style={{
                                fontSize: 11, textAlign: 'center', padding: '4px 0', fontWeight: 600,
                                color: i === 0 ? '#C2410C' : i === 6 ? '#1D4ED8' : STONE_500,
                            }}>{w}</div>
                        ))}
                    </div>

                    {/* Day cells */}
                    <div style={calendarGridStyle}>
                        {calendarCells.map((cell, idx) => {
                            if (!cell) return <div key={`e-${idx}`} style={{ minHeight: 76 }} />;
                            const isToday = cell.date === today;
                            const isSelected = cell.date === selectedDate;
                            const sess = sessionsByDate.get(cell.date);
                            const exprCount = sess?.ammo.length ?? 0;
                            const hasDmmSess = sess?.session_number != null && sess.session_number > 0;
                            const hasConv = (conversationsByDate.get(cell.date)?.length ?? 0) > 0;
                            const hasDmm = hasDmmSess || hasConv;

                            // gradient by expression count
                            const bgColor =
                                exprCount === 0 ? WHITE :
                                exprCount <= 3 ? '#FEFCE8' :
                                exprCount <= 6 ? '#FEF3C7' :
                                exprCount <= 9 ? GOLD_BG :
                                                  '#FDE68A';

                            return (
                                <button
                                    key={cell.date}
                                    onClick={() => setSelectedDate(cell.date)}
                                    style={{
                                        minHeight: 76,
                                        background: isSelected ? '#FFFDE8' : bgColor,
                                        border: isSelected ? `2px solid ${GOLD}` :
                                                isToday ? `1.5px solid ${GOLD_DEEP}` :
                                                `1px solid ${STONE_200}`,
                                        borderRadius: 10,
                                        padding: 8,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.15s',
                                        boxShadow: isSelected ? '0 2px 8px rgba(212,175,55,0.25)' : 'none',
                                    }}
                                >
                                    <div style={{
                                        fontSize: 13, fontWeight: 700,
                                        color: isToday ? GOLD_DEEP :
                                               cell.weekday === 0 ? '#C2410C' :
                                               cell.weekday === 6 ? '#1D4ED8' :
                                               STONE_700,
                                        marginBottom: 4,
                                    }}>
                                        {cell.day}
                                    </div>
                                    {exprCount > 0 && (
                                        <div style={{
                                            fontSize: 16, fontWeight: 800,
                                            color: GOLD_DEEP,
                                            fontFeatureSettings: '"tnum" 1',
                                            lineHeight: 1,
                                        }}>
                                            {exprCount}
                                        </div>
                                    )}
                                    {hasDmm && (
                                        <div style={{
                                            position: 'absolute', top: 4, right: 4,
                                            fontSize: 8, fontWeight: 800, letterSpacing: 0.5,
                                            color: EMERALD_DEEP, background: EMERALD_BG,
                                            border: `1px solid ${EMERALD_BORDER}`,
                                            borderRadius: 3, padding: '1px 4px',
                                        }}>DMM</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{
                        marginTop: 12,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontSize: 11, color: STONE_500,
                    }}>
                        <span>
                            <span style={{ display: 'inline-block', width: 10, height: 10, background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`, marginRight: 4, verticalAlign: 'middle' }} />
                            数字 = 表現の数
                            <span style={{ marginLeft: 12, display: 'inline-block', fontSize: 8, fontWeight: 800, letterSpacing: 0.5, color: EMERALD_DEEP, background: EMERALD_BG, border: `1px solid ${EMERALD_BORDER}`, borderRadius: 3, padding: '1px 4px', verticalAlign: 'middle' }}>DMM</span>
                            <span style={{ marginLeft: 4 }}>= レッスンあり</span>
                        </span>
                        <button
                            onClick={() => {
                                const t = new Date();
                                setViewYear(t.getFullYear());
                                setViewMonth(t.getMonth() + 1);
                                setSelectedDate(today);
                            }}
                            style={{
                                fontSize: 11, color: GOLD_DEEP,
                                background: 'transparent', border: `1px solid ${GOLD}`,
                                borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                            }}
                        >今日に戻る</button>
                    </div>
                </section>

                {/* Day detail */}
                <DayDetail
                    date={selectedDate}
                    today={today}
                    session={selectedSession}
                    conversations={selectedConvs}
                    refreshAll={refreshAll}
                    onError={setError}
                />
            </div>
        </div>
    );
}

// ── Stat sub ──
function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 9, color: STONE_500, letterSpacing: 1.5, fontWeight: 600 }}>
                {label}
            </div>
            <div style={{
                fontSize: 16, fontWeight: 700,
                color: accent ?? STONE_700,
                fontFeatureSettings: '"tnum" 1',
                lineHeight: 1.1,
            }}>
                {value}
            </div>
        </div>
    );
}

// ── Day Detail ──

interface DayDetailProps {
    date: string;
    today: string;
    session: Dmm365SessionWithAmmo | null;
    conversations: DmmConversation[];
    refreshAll: () => Promise<void>;
    onError: (msg: string | null) => void;
}

function DayDetail({ date, today, session, conversations, refreshAll, onError }: DayDetailProps) {
    const [tab, setTab] = useState<'expr' | 'dmm'>('expr');
    const exprCount = session?.ammo.length ?? 0;
    const convCount = conversations.length;
    const rel = relativeLabel(date, today);

    return (
        <section style={{ background: WHITE, border: `1px solid ${STONE_200}`, borderRadius: 16, padding: 24 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: STONE_900, letterSpacing: 0.5 }}>
                    {date}
                </div>
                {rel && (
                    <div style={{
                        fontSize: 11, color: GOLD_DEEP, fontWeight: 700,
                        background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`,
                        borderRadius: 999, padding: '2px 10px', letterSpacing: 1,
                    }}>{rel}</div>
                )}
                <span style={{ flex: 1 }} />
                {/* Tab pills */}
                <div style={{
                    display: 'flex', gap: 4, background: STONE_100, padding: 3,
                    borderRadius: 10,
                }}>
                    <TabPill label={`表現 (${exprCount})`} active={tab === 'expr'} onClick={() => setTab('expr')} />
                    <TabPill label={`DMM会話 (${convCount})`} active={tab === 'dmm'} onClick={() => setTab('dmm')} />
                </div>
            </div>

            {tab === 'expr' && (
                <ExpressionPanel
                    date={date}
                    session={session}
                    refreshAll={refreshAll}
                    onError={onError}
                />
            )}
            {tab === 'dmm' && (
                <DmmPanel
                    date={date}
                    session={session}
                    conversations={conversations}
                    refreshAll={refreshAll}
                    onError={onError}
                />
            )}
        </section>
    );
}

function TabPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: active ? WHITE : 'transparent',
                color: active ? GOLD_DEEP : STONE_500,
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                cursor: 'pointer',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
            }}
        >
            {label}
        </button>
    );
}

// ── Expression Panel ──

interface ExpressionPanelProps {
    date: string;
    session: Dmm365SessionWithAmmo | null;
    refreshAll: () => Promise<void>;
    onError: (msg: string | null) => void;
}

function ExpressionPanel({ date, session, refreshAll, onError }: ExpressionPanelProps) {
    const [busy, setBusy] = useState(false);
    const [pasteOpen, setPasteOpen] = useState(false);

    async function ensureSession(): Promise<string | null> {
        if (session) return session.id;
        try {
            const r = await fetch('/api/dmm365/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, reuse_if_date_exists: true }),
            });
            const d = await r.json();
            if (!d.success) throw new Error(d.error);
            return d.session.id;
        } catch (e) {
            onError(String(e));
            return null;
        }
    }

    async function addBlank() {
        setBusy(true);
        try {
            const sid = await ensureSession();
            if (!sid) return;
            await fetch(`/api/dmm365/sessions/${sid}/ammo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: 'new expression' }),
            });
            await refreshAll();
        } catch (e) {
            onError(String(e));
        } finally {
            setBusy(false);
        }
    }

    async function addBulk(items: { english: string; japanese?: string }[]) {
        setBusy(true);
        try {
            const sid = await ensureSession();
            if (!sid) return;
            await fetch(`/api/dmm365/sessions/${sid}/ammo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });
            await refreshAll();
            setPasteOpen(false);
        } catch (e) {
            onError(String(e));
        } finally {
            setBusy(false);
        }
    }

    async function updateAmmo(id: string, updates: Partial<Dmm365Ammo>) {
        try {
            await fetch(`/api/dmm365/ammo/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            await refreshAll();
        } catch (e) {
            onError(String(e));
        }
    }

    async function deleteAmmo(id: string) {
        if (!confirm('この表現を削除？')) return;
        try {
            await fetch(`/api/dmm365/ammo/${id}`, { method: 'DELETE' });
            await refreshAll();
        } catch (e) {
            onError(String(e));
        }
    }

    const ammo = session?.ammo ?? [];

    return (
        <div>
            {ammo.length === 0 ? (
                <div style={{
                    padding: '40px 24px',
                    textAlign: 'center',
                    background: STONE_50,
                    border: `1px dashed ${STONE_300}`,
                    borderRadius: 12,
                    color: STONE_500,
                    fontSize: 13,
                }}>
                    この日の表現はまだ無い
                </div>
            ) : (
                <ol style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    {ammo.map((a, i) => (
                        <ExpressionRow
                            key={a.id}
                            index={i + 1}
                            ammo={a}
                            onUpdate={(u) => updateAmmo(a.id, u)}
                            onDelete={() => deleteAmmo(a.id)}
                        />
                    ))}
                </ol>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
                <button onClick={addBlank} disabled={busy} style={primaryBtnStyle}>
                    + 表現を追加
                </button>
                <button onClick={() => setPasteOpen(true)} disabled={busy} style={secondaryBtnStyle}>
                    Excel から貼り付け
                </button>
            </div>

            {pasteOpen && (
                <PasteModal
                    onClose={() => setPasteOpen(false)}
                    onConfirm={addBulk}
                    busy={busy}
                />
            )}
        </div>
    );
}

// ── Expression Row (the "kakkoyoku" display) ──

function ExpressionRow({
    index,
    ammo,
    onUpdate,
    onDelete,
}: {
    index: number;
    ammo: Dmm365Ammo;
    onUpdate: (updates: Partial<Dmm365Ammo>) => void;
    onDelete: () => void;
}) {
    const [editing, setEditing] = useState(false);
    const [en, setEn] = useState(ammo.english);
    const [jp, setJp] = useState(ammo.japanese ?? '');
    const [hover, setHover] = useState(false);

    function save() {
        const updates: Partial<Dmm365Ammo> = {};
        if (en !== ammo.english) updates.english = en;
        if (jp !== (ammo.japanese ?? '')) updates.japanese = jp || null;
        if (Object.keys(updates).length > 0) onUpdate(updates);
        setEditing(false);
    }

    if (editing) {
        return (
            <li style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto',
                gap: 16,
                padding: '14px 4px',
                borderBottom: `1px solid ${STONE_100}`,
                alignItems: 'flex-start',
            }}>
                <div style={{
                    fontSize: 11, fontWeight: 700, color: STONE_400,
                    fontFeatureSettings: '"tnum" 1', paddingTop: 6, letterSpacing: 1,
                }}>
                    {String(index).padStart(2, '0')}
                </div>
                <div>
                    <input
                        autoFocus
                        value={en}
                        onChange={(e) => setEn(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); } if (e.key === 'Escape') setEditing(false); }}
                        placeholder="英語"
                        style={{
                            width: '100%',
                            fontSize: 20, fontWeight: 600,
                            color: STONE_900,
                            background: STONE_50,
                            border: `1px solid ${GOLD}`,
                            borderRadius: 6,
                            padding: '6px 10px',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                        }}
                    />
                    <input
                        value={jp}
                        onChange={(e) => setJp(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); } if (e.key === 'Escape') setEditing(false); }}
                        placeholder="日本語 (任意)"
                        style={{
                            width: '100%',
                            fontSize: 13,
                            color: STONE_600 || STONE_500,
                            background: STONE_50,
                            border: `1px solid ${STONE_200}`,
                            borderRadius: 6,
                            padding: '5px 10px',
                            marginTop: 6,
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={save} style={smallPrimaryBtn}>保存</button>
                    <button onClick={() => { setEn(ammo.english); setJp(ammo.japanese ?? ''); setEditing(false); }} style={smallSecondaryBtn}>×</button>
                </div>
            </li>
        );
    }

    return (
        <li
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto',
                gap: 16,
                padding: '14px 4px',
                borderBottom: `1px solid ${STONE_100}`,
                alignItems: 'flex-start',
                background: hover ? '#FFFEF5' : 'transparent',
                transition: 'background 0.15s',
                cursor: 'pointer',
            }}
            onClick={() => setEditing(true)}
        >
            <div style={{
                fontSize: 11, fontWeight: 700, color: STONE_400,
                fontFeatureSettings: '"tnum" 1', paddingTop: 6, letterSpacing: 1,
            }}>
                {String(index).padStart(2, '0')}
            </div>
            <div>
                <div style={{
                    fontSize: 20, fontWeight: 600,
                    color: STONE_900,
                    lineHeight: 1.4,
                    letterSpacing: -0.2,
                }}>
                    {ammo.english}
                </div>
                {ammo.japanese && (
                    <div style={{
                        fontSize: 12,
                        color: STONE_500,
                        marginTop: 4,
                        lineHeight: 1.5,
                    }}>
                        {ammo.japanese}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', gap: 4, opacity: hover ? 1 : 0, transition: 'opacity 0.15s' }}>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{
                    background: 'transparent', border: 'none', color: STONE_400,
                    cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 6,
                }} aria-label="削除">×</button>
            </div>
        </li>
    );
}

// ── Paste Modal ──

function PasteModal({
    onClose,
    onConfirm,
    busy,
}: {
    onClose: () => void;
    onConfirm: (items: { english: string; japanese?: string }[]) => void;
    busy: boolean;
}) {
    const [text, setText] = useState('');
    const parsed = useMemo(() => parseExcelPaste(text), [text]);
    const items = parsed.flatExpressions;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 100, padding: 16,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: WHITE, borderRadius: 16, padding: 24,
                    width: '100%', maxWidth: 640, maxHeight: '85vh', overflow: 'auto',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: STONE_700, letterSpacing: 1 }}>
                        EXCEL から貼り付け
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: STONE_500, cursor: 'pointer' }}>×</button>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Excel / Sheets のセル群をコピペ&#10;1行1表現 or タブ区切り横並び OK"
                    rows={8}
                    autoFocus
                    style={{
                        width: '100%', boxSizing: 'border-box',
                        fontFamily: FONT_MONO, fontSize: 13,
                        padding: 10, borderRadius: 8,
                        border: `1px solid ${STONE_200}`,
                        background: STONE_50, resize: 'vertical',
                    }}
                />
                {items.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, color: STONE_500, marginBottom: 6 }}>
                            検出: {items.length}件
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'column', gap: 4,
                            maxHeight: 200, overflow: 'auto',
                            border: `1px solid ${STONE_100}`,
                            borderRadius: 8, padding: 8, background: STONE_50,
                        }}>
                            {items.slice(0, 30).map((e, i) => (
                                <div key={i} style={{ fontSize: 13, color: STONE_700, padding: '4px 6px' }}>
                                    {String(i + 1).padStart(2, '0')} · {e.english}
                                </div>
                            ))}
                            {items.length > 30 && (
                                <div style={{ fontSize: 11, color: STONE_500, padding: 4 }}>
                                    ... 他 {items.length - 30}件
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                    <button onClick={onClose} style={secondaryBtnStyle}>キャンセル</button>
                    <button
                        onClick={() => onConfirm(items.map(e => ({ english: e.english })))}
                        disabled={busy || items.length === 0}
                        style={{
                            ...primaryBtnStyle,
                            opacity: (busy || items.length === 0) ? 0.5 : 1,
                            cursor: (busy || items.length === 0) ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {busy ? '追加中...' : `${items.length}件を追加`}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── DMM Panel ──

function DmmPanel({
    date,
    session,
    conversations,
    refreshAll,
    onError,
}: {
    date: string;
    session: Dmm365SessionWithAmmo | null;
    conversations: DmmConversation[];
    refreshAll: () => Promise<void>;
    onError: (msg: string | null) => void;
}) {
    const [editingNumber, setEditingNumber] = useState(false);
    const [numberValue, setNumberValue] = useState<string>(String(session?.session_number ?? ''));

    async function saveNumber() {
        const n = parseInt(numberValue, 10);
        if (isNaN(n) || n < 0) { onError('lesson # は正の整数で'); return; }
        try {
            if (!session) {
                // session 作る
                const r = await fetch('/api/dmm365/sessions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date, session_number: n, reuse_if_date_exists: true }),
                });
                const d = await r.json();
                if (!d.success) throw new Error(d.error);
            } else {
                await fetch(`/api/dmm365/sessions/${session.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_number: n }),
                });
            }
            await refreshAll();
            setEditingNumber(false);
        } catch (e) {
            onError(String(e));
        }
    }

    return (
        <div>
            {/* DMM lesson # */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14,
                background: EMERALD_BG,
                border: `1px solid ${EMERALD_BORDER}`,
                borderRadius: 10,
                marginBottom: 16,
            }}>
                <div style={{ fontSize: 11, color: EMERALD_DEEP, letterSpacing: 1.5, fontWeight: 700 }}>
                    DMM レッスン #
                </div>
                {editingNumber ? (
                    <>
                        <input
                            type="number"
                            value={numberValue}
                            onChange={(e) => setNumberValue(e.target.value)}
                            autoFocus
                            style={{
                                width: 80, fontSize: 18, fontWeight: 700,
                                padding: '4px 8px', borderRadius: 6,
                                border: `1px solid ${EMERALD}`,
                            }}
                            onKeyDown={(e) => { if (e.key === 'Enter') saveNumber(); if (e.key === 'Escape') setEditingNumber(false); }}
                        />
                        <button onClick={saveNumber} style={smallPrimaryBtn}>保存</button>
                        <button onClick={() => setEditingNumber(false)} style={smallSecondaryBtn}>×</button>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: 24, fontWeight: 800, color: EMERALD_DEEP, fontFeatureSettings: '"tnum" 1' }}>
                            {session?.session_number ? `#${session.session_number}` : '—'}
                        </div>
                        <span style={{ flex: 1 }} />
                        <button onClick={() => setEditingNumber(true)} style={smallSecondaryBtn}>
                            {session?.session_number ? '編集' : 'lesson # 入力'}
                        </button>
                    </>
                )}
            </div>

            {/* Transcript list */}
            <div style={{ fontSize: 11, color: STONE_500, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>
                会話 TRANSCRIPT ({conversations.length})
            </div>
            {conversations.length === 0 ? (
                <div style={{
                    padding: '24px 16px',
                    background: STONE_50,
                    border: `1px dashed ${STONE_300}`,
                    borderRadius: 12,
                    color: STONE_500,
                    fontSize: 12,
                    textAlign: 'center',
                }}>
                    この日の transcript はまだ登録されてない<br />
                    <Link href="/english/training/dmm/admin" style={{ color: GOLD_DEEP, marginTop: 8, display: 'inline-block', fontWeight: 600 }}>
                        + 新規登録 (既存 /training/dmm/admin)
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {conversations.map(c => (
                        <Link
                            key={c.id}
                            href={`/english/training/dmm/${c.id}`}
                            style={{
                                display: 'block',
                                padding: '12px 14px',
                                background: WHITE,
                                border: `1px solid ${STONE_200}`,
                                borderRadius: 10,
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: STONE_900 }}>
                                    {c.title}
                                </div>
                                <div style={{ fontSize: 11, color: STONE_500 }}>
                                    {c.duration_minutes ? `${c.duration_minutes}分` : ''}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 10, fontSize: 11, color: STONE_500 }}>
                                <span>講師: {c.teacher_name || '—'}</span>
                                <span>{c.turns.length} ターン</span>
                                <span>NATIVE: {c.turns.filter(t => t.role === 'student' && t.native).length}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Styles ──

const monthBtnStyle: React.CSSProperties = {
    fontSize: 16, color: STONE_700,
    background: WHITE, border: `1px solid ${STONE_200}`,
    borderRadius: 8, width: 36, height: 36, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const calendarGridStyle: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6,
};

const primaryBtnStyle: React.CSSProperties = {
    background: GOLD, color: WHITE, border: 'none',
    borderRadius: 8, padding: '8px 16px',
    fontSize: 13, fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer',
};

const secondaryBtnStyle: React.CSSProperties = {
    background: WHITE, color: STONE_700, border: `1px solid ${STONE_200}`,
    borderRadius: 8, padding: '8px 16px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

const smallPrimaryBtn: React.CSSProperties = {
    background: GOLD, color: WHITE, border: 'none',
    borderRadius: 6, padding: '4px 10px',
    fontSize: 11, fontWeight: 700, cursor: 'pointer',
};

const smallSecondaryBtn: React.CSSProperties = {
    background: WHITE, color: STONE_500, border: `1px solid ${STONE_200}`,
    borderRadius: 6, padding: '4px 10px',
    fontSize: 11, fontWeight: 600, cursor: 'pointer',
};

// dummy export to satisfy linter (STONE_600 referenced)
const STONE_600 = '#57534e';
