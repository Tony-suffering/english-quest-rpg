'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    tokyo52Ep01Entries,
    TOKYO52_EP01_SCRIPT,
    TOKYO52_EP01_VOCAB,
    TOKYO52_EP01_EXPRESSIONS,
    type ScriptSection,
} from '@/data/english/tokyo52/ep01';
import {
    TOKYO52_EP01_EXPRESSIONS as T52_EXPRESSIONS,
    type Tokyo52Expression,
} from '@/data/english/tokyo52/tokyo52-ep01-expressions';

/* ---- Colors ---- */
const GOLD = '#D4AF37';
const EMERALD = '#10B981';
const STONE = {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
    500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917',
};

const SPEAKER_COLORS: Record<string, string> = {
    'Yuki': GOLD,
    'Aya': '#8B5CF6',
    'Rina': EMERALD,
    'Foreign Customer': '#3B82F6',
    'Master Gondo': '#B45309',
};

function extractSpeaker(text: string): { name: string; dialogue: string } {
    const m = text.match(/^([^:]+):\s*(.*)$/s);
    return m ? { name: m[1].trim(), dialogue: m[2].trim() } : { name: '', dialogue: text };
}

/* ---- Language Toggle ---- */
type Lang = 'ja' | 'en' | 'both';

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
    const opts: { key: Lang; label: string }[] = [
        { key: 'ja', label: 'JP' },
        { key: 'both', label: 'JP+EN' },
        { key: 'en', label: 'EN' },
    ];
    return (
        <div style={{ display: 'flex', gap: 4, background: STONE[100], borderRadius: 8, padding: 3 }}>
            {opts.map(o => (
                <button key={o.key} onClick={() => setLang(o.key)} style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', padding: '6px 14px',
                    borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    background: lang === o.key ? '#fff' : 'transparent',
                    color: lang === o.key ? STONE[900] : STONE[500],
                    boxShadow: lang === o.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}>
                    {o.label}
                </button>
            ))}
        </div>
    );
}

/* ---- Section Renderers ---- */

function ColdOpen({ section, lang }: { section: Extract<ScriptSection, { type: 'cold-open' }>; lang: Lang }) {
    return (
        <div style={{
            padding: '64px 0 48px', textAlign: 'center',
            borderBottom: `1px solid ${STONE[200]}`, marginBottom: 48,
        }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: GOLD, marginBottom: 24 }}>
                EPISODE 1
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: STONE[900], margin: '0 0 8px', lineHeight: 1.4 }}>
                ここから始まる
            </h1>
            <p style={{ fontSize: 15, color: STONE[500], margin: '0 0 40px' }}>It Starts Here</p>
            <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'left' }}>
                {(lang !== 'en') && (
                    <div style={{ fontSize: 16, color: STONE[800], lineHeight: 2.2, whiteSpace: 'pre-line' }}>
                        {section.ja}
                    </div>
                )}
                {(lang !== 'ja') && (
                    <div style={{
                        fontSize: 14, color: STONE[500], lineHeight: 2, whiteSpace: 'pre-line',
                        marginTop: lang === 'both' ? 16 : 0, fontStyle: lang === 'both' ? 'italic' : 'normal',
                    }}>
                        {section.en}
                    </div>
                )}
            </div>
        </div>
    );
}

function SceneHeader({ section }: { section: Extract<ScriptSection, { type: 'scene-header' }> }) {
    return (
        <div style={{ margin: '48px 0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', color: GOLD,
                background: `${GOLD}10`, border: `1px solid ${GOLD}30`,
                borderRadius: 6, padding: '5px 14px', whiteSpace: 'nowrap',
            }}>
                {section.title}
            </div>
            <div style={{ fontSize: 13, color: STONE[500], letterSpacing: '0.04em' }}>
                {section.location}
            </div>
            <div style={{ flex: 1, height: 1, background: STONE[200] }} />
        </div>
    );
}

function Narrative({ section, lang }: { section: Extract<ScriptSection, { type: 'narrative' | 'transition' }>; lang: Lang }) {
    return (
        <div style={{ margin: '24px 0 32px', maxWidth: 600 }}>
            {(lang !== 'en') && (
                <div style={{ fontSize: 15.5, color: STONE[800], lineHeight: 2.3, whiteSpace: 'pre-line' }}>
                    {section.ja}
                </div>
            )}
            {(lang !== 'ja') && (
                <div style={{
                    fontSize: 14, color: STONE[500], lineHeight: 2, whiteSpace: 'pre-line',
                    marginTop: lang === 'both' ? 14 : 0,
                }}>
                    {section.en}
                </div>
            )}
        </div>
    );
}

function MemoriaScene({ section, lang }: { section: Extract<ScriptSection, { type: 'memoria' }>; lang: Lang }) {
    const entry = tokyo52Ep01Entries[section.entryIndex];
    const [expanded, setExpanded] = useState(true);
    if (!entry) return null;

    return (
        <div style={{
            margin: '32px 0', background: STONE[50], border: `1px solid ${STONE[200]}`,
            borderRadius: 16, overflow: 'hidden',
        }}>
            <button onClick={() => setExpanded(!expanded)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 24px', border: 'none', background: 'transparent', cursor: 'pointer',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%', background: EMERALD,
                    }} />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: STONE[700] }}>
                        LISTEN
                    </span>
                    <span style={{ fontSize: 13, color: STONE[500] }}>
                        {section.label}
                    </span>
                </div>
                <span style={{ fontSize: 13, color: STONE[500], transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    &#9660;
                </span>
            </button>

            {expanded && (
                <div style={{ padding: '0 24px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ fontSize: 11, color: STONE[500] }}>
                            {entry.conversation.english.length} lines
                        </div>
                        <Link
                            href={`/memoria/${entry.id}?autoplay=true`}
                            style={{
                                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                                color: EMERALD, textDecoration: 'none',
                                padding: '4px 12px', borderRadius: 6,
                                border: `1px solid ${EMERALD}30`,
                                background: `${EMERALD}08`,
                            }}
                        >
                            Memoria で聴く
                        </Link>
                    </div>
                    {entry.conversation.english.map((line, i) => {
                        const { name, dialogue } = extractSpeaker(line.text);
                        const jaLine = entry.conversation.japanese[i];
                        const { dialogue: jaDialogue } = jaLine ? extractSpeaker(jaLine.text) : { dialogue: '' };
                        const color = SPEAKER_COLORS[name] || STONE[600];
                        const isSilence = dialogue === '...' || !dialogue;

                        return (
                            <div key={i} style={{
                                display: 'flex', gap: 10, padding: '10px 14px',
                                borderLeft: `3px solid ${color}20`,
                                borderRadius: '0 8px 8px 0',
                                marginBottom: 2,
                                background: i % 2 === 0 ? `${STONE[100]}80` : 'transparent',
                            }}>
                                <div style={{ fontSize: 10, color: STONE[300], minWidth: 20, paddingTop: 3, fontWeight: 600 }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {name && (
                                        <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 3 }}>
                                            {name}
                                        </div>
                                    )}
                                    {(lang !== 'ja' || isSilence) && (
                                        <div style={{
                                            fontSize: 14, color: isSilence ? STONE[400] : STONE[800],
                                            lineHeight: 1.8, fontStyle: isSilence ? 'italic' : 'normal',
                                        }}>
                                            {dialogue}
                                        </div>
                                    )}
                                    {(lang !== 'en') && jaDialogue && !isSilence && (
                                        <div style={{
                                            fontSize: 13, color: STONE[500], lineHeight: 1.7,
                                            marginTop: lang === 'both' ? 3 : 0,
                                        }}>
                                            {jaDialogue}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function Cliffhanger({ section, lang }: { section: Extract<ScriptSection, { type: 'cliffhanger' }>; lang: Lang }) {
    return (
        <div style={{
            margin: '48px 0', padding: '40px 32px',
            background: `linear-gradient(135deg, ${STONE[50]} 0%, #fff 50%, ${STONE[50]} 100%)`,
            border: `1px solid ${STONE[200]}`, borderRadius: 16, textAlign: 'center',
        }}>
            {(lang !== 'en') && (
                <div style={{ fontSize: 17, color: STONE[900], lineHeight: 2.4, whiteSpace: 'pre-line', fontWeight: 500 }}>
                    {section.ja}
                </div>
            )}
            {(lang !== 'ja') && (
                <div style={{
                    fontSize: 15, color: STONE[600], lineHeight: 2.2, whiteSpace: 'pre-line',
                    marginTop: lang === 'both' ? 20 : 0, fontStyle: 'italic',
                }}>
                    {section.en}
                </div>
            )}
        </div>
    );
}

function NextEpisode({ section }: { section: Extract<ScriptSection, { type: 'next-episode' }> }) {
    return (
        <div style={{
            margin: '48px 0', padding: '28px 32px',
            border: `1px solid ${STONE[200]}`, borderRadius: 16,
            background: '#fff',
        }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: STONE[500], marginBottom: 12 }}>
                NEXT EPISODE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>Ep {section.num}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: STONE[900] }}>{section.title}</span>
            </div>
            <p style={{ fontSize: 14, color: STONE[600], lineHeight: 1.9, margin: 0 }}>
                {section.tease}
            </p>
        </div>
    );
}

/* ---- Vocab & Expressions ---- */

function VocabSection() {
    return (
        <div style={{ margin: '48px 0' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: GOLD, marginBottom: 20 }}>
                THIS EPISODE&apos;S VOCABULARY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {TOKYO52_EP01_VOCAB.map((v, i) => (
                    <div key={i} style={{
                        border: `1px solid ${STONE[200]}`, borderRadius: 12,
                        padding: '16px 20px', background: '#fff',
                    }}>
                        <div style={{ fontSize: 17, fontWeight: 700, color: GOLD, marginBottom: 2 }}>
                            {v.word}
                        </div>
                        <div style={{ fontSize: 12, color: STONE[600], marginBottom: 10 }}>
                            {v.meaning}
                        </div>
                        <div style={{ fontSize: 13, color: STONE[700], lineHeight: 1.7, fontStyle: 'italic' }}>
                            {v.example}
                        </div>
                        <div style={{ fontSize: 12, color: STONE[500], lineHeight: 1.6, marginTop: 2 }}>
                            {v.exampleJa}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExpressionsSection() {
    return (
        <div style={{ margin: '48px 0' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: EMERALD, marginBottom: 20 }}>
                THIS EPISODE&apos;S EXPRESSIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TOKYO52_EP01_EXPRESSIONS.map((exp, i) => (
                    <div key={i} style={{
                        border: `1px solid ${STONE[200]}`, borderRadius: 12,
                        padding: '16px 20px', background: '#fff',
                        borderLeft: `3px solid ${EMERALD}`,
                    }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: STONE[900], marginBottom: 2 }}>
                            {exp.expression}
                        </div>
                        <div style={{ fontSize: 13, color: EMERALD, marginBottom: 8 }}>
                            {exp.meaningJa}
                        </div>
                        <div style={{ fontSize: 13, color: STONE[600], lineHeight: 1.7, marginBottom: 6 }}>
                            {exp.context}
                        </div>
                        <div style={{
                            fontSize: 13, color: STONE[700], lineHeight: 1.7,
                            background: STONE[50], borderRadius: 8, padding: '8px 12px',
                            fontStyle: 'italic',
                        }}>
                            {exp.example}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---- Listening Tab (inline Memoria) ---- */

function ListeningTab({ lang }: { lang: Lang }) {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 80px' }}>
            <div style={{ padding: '32px 0 16px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: STONE[900], margin: '0 0 8px' }}>
                    Episode 1 -- 全会話
                </h2>
                <p style={{ fontSize: 14, color: STONE[500], margin: 0, lineHeight: 1.7 }}>
                    ドラマに登場する4つの会話。言語切り替えで日本語・英語・両方を表示。
                </p>
            </div>
            {tokyo52Ep01Entries.map((entry, idx) => (
                <div key={entry.id} style={{ marginBottom: 32 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '16px 0', borderBottom: `1px solid ${STONE[200]}`, marginBottom: 16,
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: `${EMERALD}15`, border: `1.5px solid ${EMERALD}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, color: EMERALD,
                        }}>
                            {idx + 1}
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 600, color: STONE[900] }}>
                                {entry.title}
                            </div>
                            <div style={{ fontSize: 12, color: STONE[500] }}>
                                {entry.titleJa} -- {entry.conversation.english.length} lines
                            </div>
                        </div>
                    </div>
                    {entry.conversation.english.map((line, i) => {
                        const { name, dialogue } = extractSpeaker(line.text);
                        const jaLine = entry.conversation.japanese[i];
                        const { dialogue: jaDialogue } = jaLine ? extractSpeaker(jaLine.text) : { dialogue: '' };
                        const color = SPEAKER_COLORS[name] || STONE[600];
                        const isSilence = dialogue === '...' || !dialogue;
                        return (
                            <div key={i} style={{
                                display: 'flex', gap: 10, padding: '10px 14px',
                                borderLeft: `3px solid ${color}20`,
                                borderRadius: '0 8px 8px 0', marginBottom: 2,
                                background: i % 2 === 0 ? `${STONE[100]}80` : 'transparent',
                            }}>
                                <div style={{ fontSize: 10, color: STONE[300], minWidth: 20, paddingTop: 3, fontWeight: 600 }}>
                                    {i + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {name && <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 3 }}>{name}</div>}
                                    {(lang !== 'ja' || isSilence) && (
                                        <div style={{ fontSize: 14, color: isSilence ? STONE[400] : STONE[800], lineHeight: 1.8, fontStyle: isSilence ? 'italic' : 'normal' }}>
                                            {dialogue}
                                        </div>
                                    )}
                                    {(lang !== 'en') && jaDialogue && !isSilence && (
                                        <div style={{ fontSize: 13, color: STONE[500], lineHeight: 1.7, marginTop: lang === 'both' ? 3 : 0 }}>
                                            {jaDialogue}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

/* ---- Words Calendar Tab ---- */

const W_MASTERY_LABELS = ['未習得', '学習中', '復習中', '習得済'] as const;
const W_MASTERY_STYLES = [
    { bg: '#FEF2F2', border: '#F87171', text: '#B91C1C' },
    { bg: '#FFF7ED', border: '#FB923C', text: '#C2410C' },
    { bg: '#EFF6FF', border: '#60A5FA', text: '#1D4ED8' },
    { bg: '#FAF5FF', border: '#A855F7', text: '#7E22CE' },
] as const;

const W_DAY_NAMES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;
const W_CONTENT_DATES = [1, 2, 3, 4, 5];
const W_YEAR = 2026;
const W_MONTH = 3; // April (0-indexed)
const W_DAYS_IN_MONTH = 30;
const W_FIRST_DOW = new Date(W_YEAR, W_MONTH, 1).getDay();

function wMasteryKey(expr: Tokyo52Expression): string {
    return `tokyo52_mastery_${expr.day}_${expr.expression.replace(/\s+/g, '_').slice(0, 30)}`;
}

function WordsTab() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [mastery, setMastery] = useState<Record<string, number>>({});

    useEffect(() => {
        const loaded: Record<string, number> = {};
        T52_EXPRESSIONS.forEach(e => {
            const v = localStorage.getItem(wMasteryKey(e));
            if (v !== null) loaded[wMasteryKey(e)] = parseInt(v, 10);
        });
        setMastery(loaded);
    }, []);

    const toggleMastery = (expr: Tokyo52Expression) => {
        const key = wMasteryKey(expr);
        const next = ((mastery[key] ?? 0) + 1) % 4;
        localStorage.setItem(key, String(next));
        setMastery(prev => ({ ...prev, [key]: next }));
    };

    const totalMastered = T52_EXPRESSIONS.filter(e => (mastery[wMasteryKey(e)] ?? 0) === 3).length;
    const dateToDay = (d: number) => { const i = W_CONTENT_DATES.indexOf(d); return i >= 0 ? i + 1 : null; };
    const getDayExprs = (d: number) => { const day = dateToDay(d); return day ? T52_EXPRESSIONS.filter(e => e.day === day) : []; };
    const getDayMastered = (d: number) => getDayExprs(d).filter(e => (mastery[wMasteryKey(e)] ?? 0) === 3).length;

    const today = new Date();
    const isTodayCell = (d: number) => today.getFullYear() === W_YEAR && today.getMonth() === W_MONTH && today.getDate() === d;

    const selectedDay = selectedDate ? dateToDay(selectedDate) : null;
    const selectedExprs = selectedDay ? T52_EXPRESSIONS.filter(e => e.day === selectedDay) : [];

    const cells: (number | null)[] = [];
    for (let i = 0; i < W_FIRST_DOW; i++) cells.push(null);
    for (let d = 1; d <= W_DAYS_IN_MONTH; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 80px' }}>
            {/* Stats */}
            <div style={{ marginBottom: 20, fontSize: 14, color: STONE[500] }}>
                <span style={{ color: GOLD, fontWeight: 700 }}>{totalMastered}</span> / 75 mastered
            </div>

            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Calendar */}
                <div style={{ flex: '1 1 400px', minWidth: 300, maxWidth: 500 }}>
                    <div style={{ background: STONE[50], border: `1px solid ${STONE[200]}`, borderRadius: 16, padding: 20 }}>
                        <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 16, fontWeight: 600, color: STONE[700], letterSpacing: '0.1em' }}>
                            April 2026
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                            {W_DAY_NAMES.map(d => (
                                <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: STONE[500], padding: '4px 0', letterSpacing: '0.08em' }}>
                                    {d}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                            {cells.map((date, i) => {
                                if (date === null) return <div key={`e-${i}`} />;
                                const hasContent = W_CONTENT_DATES.includes(date);
                                const mc = getDayMastered(date);
                                const allDone = hasContent && mc === 15;
                                const isSel = selectedDate === date;
                                const progress = hasContent ? mc / 15 : 0;
                                return (
                                    <button key={date} onClick={() => hasContent ? setSelectedDate(date === selectedDate ? null : date) : undefined} style={{
                                        aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                                        borderRadius: 10, padding: 4, outline: 'none', transition: 'all 0.15s',
                                        border: isSel ? `2px solid ${EMERALD}` : isTodayCell(date) ? `2px solid ${GOLD}` : hasContent ? `1px solid ${STONE[200]}` : '1px solid transparent',
                                        background: allDone ? '#FFF9E6' : hasContent ? '#fff' : STONE[50],
                                        cursor: hasContent ? 'pointer' : 'default',
                                    }}>
                                        <span style={{ fontSize: 13, fontWeight: hasContent ? 600 : 400, color: hasContent ? STONE[900] : STONE[300] }}>{date}</span>
                                        {hasContent && (<>
                                            <span style={{ fontSize: 9, color: STONE[500], lineHeight: 1 }}>{mc}/15</span>
                                            <div style={{ width: '80%', height: 3, borderRadius: 2, background: STONE[200], overflow: 'hidden' }}>
                                                <div style={{ width: `${progress * 100}%`, height: '100%', background: allDone ? GOLD : EMERALD, borderRadius: 2, transition: 'width 0.3s' }} />
                                            </div>
                                        </>)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                        {W_MASTERY_LABELS.map((label, i) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: STONE[500] }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: W_MASTERY_STYLES[i].bg, border: `1.5px solid ${W_MASTERY_STYLES[i].border}` }} />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail panel */}
                <div style={{ flex: '1 1 420px', minWidth: 300 }}>
                    {selectedDate && selectedExprs.length > 0 ? (
                        <div>
                            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: STONE[900] }}>April {selectedDate}</span>
                                <span style={{ fontSize: 13, color: STONE[500] }}>Day {selectedDay} -- {selectedExprs.length} expressions</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {selectedExprs.map(expr => {
                                    const key = wMasteryKey(expr);
                                    const lv = mastery[key] ?? 0;
                                    const s = W_MASTERY_STYLES[lv];
                                    return (
                                        <div key={key} style={{ background: '#fff', border: `1px solid ${STONE[200]}`, borderRadius: 12, padding: '14px 16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: STONE[500], letterSpacing: '0.06em' }}>{expr.speaker}</span>
                                                <button onClick={() => toggleMastery(expr)} style={{
                                                    fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 6,
                                                    border: `1.5px solid ${s.border}`, background: s.bg, color: s.text,
                                                    cursor: 'pointer', outline: 'none', lineHeight: '18px',
                                                }}>
                                                    {W_MASTERY_LABELS[lv]}
                                                </button>
                                            </div>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: STONE[900], marginBottom: 4, lineHeight: 1.4 }}>
                                                &ldquo;{expr.expression}&rdquo;
                                            </div>
                                            <div style={{ fontSize: 13, color: STONE[600], marginBottom: 8 }}>{expr.meaning}</div>
                                            <div style={{ fontSize: 13, color: STONE[500], fontStyle: 'italic', lineHeight: 1.5 }}>
                                                &ldquo;{expr.example}&rdquo;
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, color: STONE[500], fontSize: 14, textAlign: 'center', padding: 32 }}>
                            <div style={{ fontSize: 28, color: STONE[300], marginBottom: 12 }}>17 - 21</div>
                            <div>カレンダーの日付をクリックして表現を表示</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---- Main Hub Page ---- */

type TabKey = 'story' | 'words' | 'listen';

const TABS: { key: TabKey; label: string; sublabel: string; color: string }[] = [
    { key: 'story', label: 'STORY', sublabel: 'ドラマ', color: GOLD },
    { key: 'words', label: 'WORDS', sublabel: '単語', color: GOLD },
    { key: 'listen', label: 'LISTEN', sublabel: '会話', color: EMERALD },
];

export default function Tokyo52Page() {
    const [lang, setLang] = useState<Lang>('both');
    const [tab, setTab] = useState<TabKey>('story');
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div ref={topRef} style={{ minHeight: '100vh', background: '#fff', color: STONE[900] }}>
            {/* Top bar */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${STONE[200]}`,
            }}>
                {/* Title row */}
                <div style={{
                    padding: '12px 32px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', color: GOLD }}>
                            TOKYO 52
                        </span>
                        <span style={{ fontSize: 11, color: STONE[300] }}>|</span>
                        <span style={{ fontSize: 12, color: STONE[500], letterSpacing: '0.04em' }}>
                            Ep 1 -- ここから始まる
                        </span>
                    </div>
                    {tab !== 'words' && <LangToggle lang={lang} setLang={setLang} />}
                </div>

                {/* Tab navigation */}
                <div style={{
                    display: 'flex', gap: 0, padding: '0 32px',
                    marginTop: 8,
                }}>
                    {TABS.map(t => {
                        const active = tab === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                style={{
                                    padding: '10px 20px 12px',
                                    border: 'none', background: 'transparent',
                                    cursor: 'pointer',
                                    borderBottom: active ? `2px solid ${t.color}` : '2px solid transparent',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <div style={{
                                    fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                                    color: active ? t.color : STONE[500],
                                }}>
                                    {t.label}
                                </div>
                                <div style={{
                                    fontSize: 10, color: active ? STONE[700] : STONE[300],
                                    marginTop: 1,
                                }}>
                                    {t.sublabel}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab: STORY */}
            {tab === 'story' && (
                <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 80px' }}>
                    {TOKYO52_EP01_SCRIPT.map((section, i) => {
                        switch (section.type) {
                            case 'cold-open':
                                return <ColdOpen key={i} section={section} lang={lang} />;
                            case 'scene-header':
                                return <SceneHeader key={i} section={section} />;
                            case 'narrative':
                            case 'transition':
                                return <Narrative key={i} section={section} lang={lang} />;
                            case 'memoria':
                                return <MemoriaScene key={i} section={section} lang={lang} />;
                            case 'cliffhanger':
                                return <Cliffhanger key={i} section={section} lang={lang} />;
                            case 'next-episode':
                                return <NextEpisode key={i} section={section} />;
                            default:
                                return null;
                        }
                    })}

                    {/* Study Material */}
                    <div style={{ marginTop: 48, paddingTop: 48, borderTop: `1px solid ${STONE[200]}` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: STONE[500], marginBottom: 8 }}>
                            EPISODE 1 STUDY MATERIAL
                        </div>
                        <p style={{ fontSize: 14, color: STONE[600], margin: '0 0 32px', lineHeight: 1.7 }}>
                            ドラマの中で出てきた単語と表現。もう文脈がある。復習するだけ。
                        </p>
                        <VocabSection />
                        <ExpressionsSection />
                    </div>
                </div>
            )}

            {/* Tab: WORDS -- inline calendar */}
            {tab === 'words' && <WordsTab />}

            {/* Tab: LISTEN */}
            {tab === 'listen' && <ListeningTab lang={lang} />}

            {/* Footer */}
            {tab !== 'words' && (
                <div style={{
                    maxWidth: 700, margin: '0 auto', padding: '0 32px 40px',
                    textAlign: 'center',
                }}>
                    <div style={{ borderTop: `1px solid ${STONE[200]}`, paddingTop: 24 }}>
                        <p style={{ fontSize: 12, color: STONE[400], margin: 0 }}>
                            Tokyo 52 -- toniolab.com
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
