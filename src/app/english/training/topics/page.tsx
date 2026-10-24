'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    DAILY_TOPICS,
    CATEGORY_LABELS,
    CATEGORY_COLORS,
    formatDateKey,
    getTopicByDate,
    type DailyTopic,
} from '@/data/english/daily-topics';

interface Expression {
    english: string;
    nuance?: string;
    emotion?: string;
}

interface GeneratedResult {
    japanese: string;
    expressions: Expression[];
    category: string;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

const GOLD = '#D4AF37';
const STONE_700 = '#44403c';
const STONE_500 = '#78716c';
const STONE_200 = '#e7e5e4';
const STONE_100 = '#f5f5f4';
const STONE_50 = '#fafaf9';

export default function TopicsPage() {
    const today = useMemo(() => new Date(), []);
    const todayKey = useMemo(() => formatDateKey(today), [today]);

    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<string>(todayKey);

    const [japanese, setJapanese] = useState('');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<GeneratedResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [registeredKeys, setRegisteredKeys] = useState<Set<string>>(new Set());
    const [registeringKey, setRegisteringKey] = useState<string | null>(null);

    const selectedTopic = useMemo(() => getTopicByDate(selectedDate), [selectedDate]);

    // 月切り替えで選択日が範囲外になったら、その月の今日 or 1日に寄せる
    useEffect(() => {
        const [y, m] = selectedDate.split('-').map(Number);
        if (y !== viewYear || m !== viewMonth) {
            const isCurrentMonth = today.getFullYear() === viewYear && today.getMonth() + 1 === viewMonth;
            if (isCurrentMonth) {
                setSelectedDate(todayKey);
            } else {
                setSelectedDate(`${viewYear}-${String(viewMonth).padStart(2, '0')}-01`);
            }
        }
    }, [viewYear, viewMonth, selectedDate, today, todayKey]);

    // 入力リセット (日付変更時)
    useEffect(() => {
        setJapanese('');
        setResult(null);
        setErrorMsg(null);
    }, [selectedDate]);

    // カレンダーマス生成
    const calendarCells = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth - 1, 1);
        const startWeekday = firstDay.getDay();
        const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
        const cells: Array<{ date: string; day: number; topic?: DailyTopic } | null> = [];
        for (let i = 0; i < startWeekday; i++) cells.push(null);
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            cells.push({ date, day, topic: getTopicByDate(date) });
        }
        while (cells.length % 7 !== 0) cells.push(null);
        return cells;
    }, [viewYear, viewMonth]);

    function shiftMonth(delta: number) {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 1) { m = 12; y -= 1; }
        if (m > 12) { m = 1; y += 1; }
        setViewYear(y);
        setViewMonth(m);
    }

    async function handleGenerate() {
        if (!japanese.trim()) return;
        setGenerating(true);
        setErrorMsg(null);
        setResult(null);
        try {
            const res = await fetch('/api/topics-translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    japanese: japanese.trim(),
                    context: selectedTopic?.prompt,
                }),
            });
            if (!res.ok) throw new Error(`生成失敗 (${res.status})`);
            const data = await res.json();
            setResult(data);
        } catch (e: any) {
            setErrorMsg(e?.message || '生成に失敗した');
        } finally {
            setGenerating(false);
        }
    }

    async function handleRegister(expression: Expression, index: number) {
        const key = `${selectedDate}::${index}::${expression.english}`;
        if (registeredKeys.has(key) || registeringKey) return;
        setRegisteringKey(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: expression.english,
                    japanese: japanese.trim(),
                    date: selectedDate,
                }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.error || `登録失敗 (${res.status})`);
            }
            setRegisteredKeys(prev => new Set(prev).add(key));
        } catch (e: any) {
            setErrorMsg(e?.message || '登録に失敗した');
        } finally {
            setRegisteringKey(null);
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: STONE_50, padding: '24px 16px 80px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* ── Header ── */}
                <header style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <Link
                            href="/english/training"
                            style={{
                                fontSize: 13,
                                color: STONE_500,
                                textDecoration: 'none',
                                padding: '6px 10px',
                                border: `1px solid ${STONE_200}`,
                                borderRadius: 8,
                                background: '#fff',
                            }}
                        >
                            ← トレーニングへ
                        </Link>
                        <span style={{ fontSize: 12, color: STONE_500, letterSpacing: 1 }}>
                            DAILY TOPICS
                        </span>
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: STONE_700, letterSpacing: 0.5, margin: 0 }}>
                        今日の話題で英会話
                    </h1>
                    <p style={{ fontSize: 13, color: STONE_500, marginTop: 6, marginBottom: 0 }}>
                        日付を選ぶ → 日本語で書く → 自然な英語に変換 → 気に入ったやつをトレーニングに登録
                    </p>
                </header>

                {/* ── Month Calendar ── */}
                <section style={{
                    background: '#fff',
                    border: `1px solid ${STONE_200}`,
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 20,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 14,
                    }}>
                        <button
                            onClick={() => shiftMonth(-1)}
                            style={monthBtnStyle}
                            aria-label="前月"
                        >
                            ←
                        </button>
                        <div style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: STONE_700,
                            letterSpacing: 1,
                        }}>
                            {viewYear}年 {viewMonth}月
                        </div>
                        <button
                            onClick={() => shiftMonth(1)}
                            style={monthBtnStyle}
                            aria-label="翌月"
                        >
                            →
                        </button>
                    </div>

                    {/* 曜日ヘッダ */}
                    <div style={calendarGridStyle}>
                        {WEEKDAYS.map((w, i) => (
                            <div
                                key={w}
                                style={{
                                    fontSize: 11,
                                    color: i === 0 ? '#C2410C' : i === 6 ? '#1D4ED8' : STONE_500,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    padding: '4px 0',
                                }}
                            >
                                {w}
                            </div>
                        ))}
                    </div>

                    {/* 日付マス */}
                    <div style={calendarGridStyle}>
                        {calendarCells.map((cell, idx) => {
                            if (!cell) {
                                return <div key={`empty-${idx}`} style={{ minHeight: 76 }} />;
                            }
                            const isSelected = cell.date === selectedDate;
                            const isToday = cell.date === todayKey;
                            const cat = cell.topic?.category;
                            const cc = cat ? CATEGORY_COLORS[cat] : null;
                            const weekday = idx % 7;

                            return (
                                <button
                                    key={cell.date}
                                    onClick={() => setSelectedDate(cell.date)}
                                    style={{
                                        minHeight: 76,
                                        background: isSelected ? '#FFFDE8' : cc ? cc.bg : '#fff',
                                        border: isSelected
                                            ? `2px solid ${GOLD}`
                                            : isToday
                                                ? `1.5px solid ${GOLD}`
                                                : `1px solid ${STONE_200}`,
                                        borderRadius: 10,
                                        padding: 8,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        transition: 'all 0.15s',
                                        boxShadow: isSelected ? '0 2px 8px rgba(212,175,55,0.25)' : 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }
                                    }}
                                >
                                    <div style={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: isToday
                                            ? GOLD
                                            : weekday === 0
                                                ? '#C2410C'
                                                : weekday === 6
                                                    ? '#1D4ED8'
                                                    : STONE_700,
                                        marginBottom: 4,
                                    }}>
                                        {cell.day}
                                    </div>
                                    {cell.topic && cc && (
                                        <>
                                            <div style={{
                                                display: 'inline-block',
                                                fontSize: 9,
                                                fontWeight: 600,
                                                color: cc.text,
                                                background: '#fff',
                                                border: `1px solid ${cc.border}`,
                                                borderRadius: 4,
                                                padding: '1px 5px',
                                                marginBottom: 4,
                                                letterSpacing: 0.3,
                                            }}>
                                                {CATEGORY_LABELS[cell.topic.category]}
                                            </div>
                                            <div style={{
                                                fontSize: 11,
                                                color: STONE_700,
                                                lineHeight: 1.3,
                                                fontWeight: 500,
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}>
                                                {cell.topic.title}
                                            </div>
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{
                        marginTop: 12,
                        fontSize: 11,
                        color: STONE_500,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span>登録済み: {DAILY_TOPICS.length}件</span>
                        <button
                            onClick={() => {
                                setViewYear(today.getFullYear());
                                setViewMonth(today.getMonth() + 1);
                                setSelectedDate(todayKey);
                            }}
                            style={{
                                fontSize: 11,
                                color: GOLD,
                                background: 'transparent',
                                border: `1px solid ${GOLD}`,
                                borderRadius: 6,
                                padding: '4px 10px',
                                cursor: 'pointer',
                            }}
                        >
                            今日に戻る
                        </button>
                    </div>
                </section>

                {/* ── Selected Day Topic ── */}
                <section style={{
                    background: '#fff',
                    border: `1px solid ${STONE_200}`,
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 20,
                }}>
                    <div style={{
                        fontSize: 11,
                        color: STONE_500,
                        letterSpacing: 1,
                        marginBottom: 8,
                    }}>
                        {selectedDate} {selectedDate === todayKey && (
                            <span style={{ color: GOLD, fontWeight: 700, marginLeft: 6 }}>TODAY</span>
                        )}
                    </div>

                    {selectedTopic ? (
                        <>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 10,
                            }}>
                                <span style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: CATEGORY_COLORS[selectedTopic.category].text,
                                    background: CATEGORY_COLORS[selectedTopic.category].bg,
                                    border: `1px solid ${CATEGORY_COLORS[selectedTopic.category].border}`,
                                    borderRadius: 6,
                                    padding: '3px 8px',
                                    letterSpacing: 0.5,
                                }}>
                                    {CATEGORY_LABELS[selectedTopic.category]}
                                </span>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: STONE_700, margin: 0 }}>
                                    {selectedTopic.title}
                                </h2>
                            </div>
                            <p style={{
                                fontSize: 16,
                                color: STONE_700,
                                lineHeight: 1.6,
                                margin: '0 0 8px',
                            }}>
                                {selectedTopic.prompt}
                            </p>
                            {selectedTopic.hint && (
                                <p style={{
                                    fontSize: 12,
                                    color: STONE_500,
                                    margin: 0,
                                    fontStyle: 'italic',
                                }}>
                                    ヒント: {selectedTopic.hint}
                                </p>
                            )}
                        </>
                    ) : (
                        <div style={{
                            padding: '24px 0',
                            textAlign: 'center',
                            color: STONE_500,
                            fontSize: 14,
                        }}>
                            この日の話題はまだ無い。別の日を選んでくれ
                        </div>
                    )}
                </section>

                {/* ── Japanese Input ── */}
                {selectedTopic && (
                    <section style={{
                        background: '#fff',
                        border: `1px solid ${STONE_200}`,
                        borderRadius: 16,
                        padding: 24,
                        marginBottom: 20,
                    }}>
                        <label style={{
                            display: 'block',
                            fontSize: 12,
                            fontWeight: 600,
                            color: STONE_700,
                            letterSpacing: 0.5,
                            marginBottom: 8,
                        }}>
                            日本語で答えて
                        </label>
                        <textarea
                            value={japanese}
                            onChange={(e) => setJapanese(e.target.value)}
                            placeholder="思ったまま書いていい。砕けてOK、長くてOK"
                            rows={4}
                            style={{
                                width: '100%',
                                fontSize: 15,
                                color: STONE_700,
                                background: STONE_50,
                                border: `1px solid ${STONE_200}`,
                                borderRadius: 10,
                                padding: 12,
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                lineHeight: 1.6,
                                boxSizing: 'border-box',
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 12,
                        }}>
                            <span style={{ fontSize: 11, color: STONE_500 }}>
                                {japanese.length} 文字
                            </span>
                            <button
                                onClick={handleGenerate}
                                disabled={!japanese.trim() || generating}
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: '#fff',
                                    background: !japanese.trim() || generating ? STONE_200 : GOLD,
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '10px 20px',
                                    letterSpacing: 1,
                                    cursor: !japanese.trim() || generating ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {generating ? '生成中...' : '自然な英語にする'}
                            </button>
                        </div>
                        {errorMsg && (
                            <div style={{
                                marginTop: 12,
                                padding: 10,
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                borderRadius: 8,
                                color: '#B91C1C',
                                fontSize: 12,
                            }}>
                                {errorMsg}
                            </div>
                        )}
                    </section>
                )}

                {/* ── Results ── */}
                {result && result.expressions && result.expressions.length > 0 && (
                    <section style={{
                        background: '#fff',
                        border: `1px solid ${STONE_200}`,
                        borderRadius: 16,
                        padding: 24,
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16,
                        }}>
                            <h2 style={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: STONE_700,
                                letterSpacing: 1,
                                margin: 0,
                            }}>
                                NATIVE EXPRESSIONS
                            </h2>
                            {result.category && (
                                <span style={{
                                    fontSize: 10,
                                    color: STONE_500,
                                    background: STONE_100,
                                    padding: '3px 8px',
                                    borderRadius: 4,
                                    letterSpacing: 0.5,
                                }}>
                                    {result.category}
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {result.expressions.map((expr, i) => {
                                const key = `${selectedDate}::${i}::${expr.english}`;
                                const isRegistered = registeredKeys.has(key);
                                const isPending = registeringKey === key;
                                return (
                                    <div
                                        key={key}
                                        style={{
                                            border: `1px solid ${STONE_200}`,
                                            borderRadius: 10,
                                            padding: 16,
                                            background: isRegistered ? '#F0FDF4' : STONE_50,
                                            borderColor: isRegistered ? '#86EFAC' : STONE_200,
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <div style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: STONE_700,
                                            lineHeight: 1.5,
                                            marginBottom: 6,
                                        }}>
                                            {expr.english}
                                        </div>
                                        {(expr.nuance || expr.emotion) && (
                                            <div style={{
                                                fontSize: 12,
                                                color: STONE_500,
                                                marginBottom: 12,
                                                lineHeight: 1.5,
                                            }}>
                                                {expr.nuance}
                                                {expr.emotion && (
                                                    <span style={{
                                                        marginLeft: 8,
                                                        fontSize: 10,
                                                        background: '#fff',
                                                        border: `1px solid ${STONE_200}`,
                                                        borderRadius: 4,
                                                        padding: '1px 6px',
                                                        color: STONE_500,
                                                        letterSpacing: 0.5,
                                                    }}>
                                                        {expr.emotion}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleRegister(expr, i)}
                                            disabled={isRegistered || isPending}
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: isRegistered ? '#15803D' : '#fff',
                                                background: isRegistered ? '#DCFCE7' : isPending ? STONE_200 : GOLD,
                                                border: isRegistered ? '1px solid #86EFAC' : 'none',
                                                borderRadius: 6,
                                                padding: '7px 14px',
                                                letterSpacing: 0.5,
                                                cursor: isRegistered || isPending ? 'default' : 'pointer',
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {isRegistered ? '登録済み' : isPending ? '登録中...' : 'トレーニングに登録'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{
                            marginTop: 16,
                            paddingTop: 16,
                            borderTop: `1px solid ${STONE_100}`,
                            fontSize: 11,
                            color: STONE_500,
                            lineHeight: 1.6,
                        }}>
                            登録した表現は <Link href="/english/training" style={{ color: GOLD, textDecoration: 'underline' }}>training</Link> の {selectedDate} のカードに出る
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}

const monthBtnStyle: React.CSSProperties = {
    fontSize: 16,
    color: STONE_700,
    background: '#fff',
    border: `1px solid ${STONE_200}`,
    borderRadius: 8,
    width: 36,
    height: 36,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const calendarGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 6,
};
