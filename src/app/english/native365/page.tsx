'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type {
    Native365Item,
    Native365Level,
    Native365Section,
    Native365CharKey,
    Native365Opening,
} from '@/types/native365';
import { NATIVE365_CHARS, NATIVE365_CHAR_ORDER } from '@/types/native365';
import { NATIVE365_MONTH1_PLAN, getNative365Day, isNative365DayReady } from '@/data/english/native365';
import { addPhrase } from '@/lib/local-store';

// ─── Global animations (365 の演出を踏襲) ──────────────────
const NATIVE365_STYLES = `
@keyframes native365CellGlow {
    0%, 100% { box-shadow: 0 2px 8px rgba(139,92,246,0.25), 0 0 12px rgba(139,92,246,0.10); }
    50%      { box-shadow: 0 3px 14px rgba(139,92,246,0.40), 0 0 20px rgba(139,92,246,0.18); }
}
@keyframes native365TodayPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.5); }
    50%      { box-shadow: 0 0 0 8px rgba(212,175,55,0); }
}
@keyframes native365StarPop {
    0%   { opacity: 0; transform: scale(0) rotate(0deg); }
    60%  { opacity: 1; transform: scale(1.3) rotate(200deg); }
    100% { opacity: 1; transform: scale(1) rotate(360deg); }
}
@keyframes native365ToastSlide {
    from { transform: translateX(-50%) translateY(20px); opacity: 0; }
    to   { transform: translateX(-50%) translateY(0);    opacity: 1; }
}
@keyframes native365FadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}
`;

// ─── Storage ────────────────────────────────────────────────
const STORAGE_KEY = 'native365_stats';
const REPS_PER_MASTER = 5; // 1 項目をマスター扱いにする最小シャドー回数

type Stats = {
    currentDay: number;
    totalCompleted: number;
    streakDays: number;
    lastVisit: string;
    totalReps: number;  // 全期間の累計シャドー回数
    startDate: string;  // YYYY-MM-DD -- Day 1 に対応する実カレンダー日付
    dayProgress: Record<number, { completed: boolean; completedAt?: string }>;
    itemReps: Record<string, number>; // itemId -> reps
    registeredItems: Record<string, string>; // itemId -> ISO datetime (training送り済みフラグ)
};

function todayYMD(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadStats(): Stats {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // 既存ユーザーに startDate が無ければ、最初の完了日、無ければ今日を採用
            let startDate = parsed.startDate as string | undefined;
            if (!startDate) {
                const earliest = Object.values(parsed.dayProgress ?? {})
                    .map((p: unknown) => (p as { completedAt?: string })?.completedAt)
                    .filter((s): s is string => !!s)
                    .sort()[0];
                startDate = earliest ? earliest.slice(0, 10) : todayYMD();
            }
            return {
                currentDay: parsed.currentDay ?? 1,
                totalCompleted: parsed.totalCompleted ?? 0,
                streakDays: parsed.streakDays ?? 0,
                lastVisit: parsed.lastVisit ?? '',
                totalReps: parsed.totalReps ?? 0,
                startDate,
                dayProgress: parsed.dayProgress ?? {},
                itemReps: parsed.itemReps ?? {},
                registeredItems: parsed.registeredItems ?? {},
            };
        }
    } catch { /* ignore */ }
    return {
        currentDay: 1, totalCompleted: 0, streakDays: 0, lastVisit: '',
        totalReps: 0, startDate: todayYMD(),
        dayProgress: {}, itemReps: {}, registeredItems: {},
    };
}
function saveStats(s: Stats) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

// dayNum (1..30) を実カレンダー日付に変換
function dayToDate(startDate: string, dayNum: number): Date {
    const [y, m, d] = startDate.split('-').map(n => parseInt(n, 10));
    const base = new Date(y, (m || 1) - 1, d || 1);
    base.setDate(base.getDate() + (dayNum - 1));
    return base;
}
function formatMD(d: Date): string { return `${d.getMonth() + 1}/${d.getDate()}`; }
function sameDate(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// ─── Audio (Web Speech API) ─────────────────────────────────
function cleanForTTS(text: string): string {
    return text
        .replace(/\/[^\/]+\//g, '')      // drop /IPA/
        .replace(/[()[\]{}]/g, '')
        .trim();
}
function speakEN(text: string, rate = 0.95) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(cleanForTTS(text));
    u.lang = 'en-US';
    u.rate = rate;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
}
function speakENLoop(text: string, times: number, onEach?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleaned = cleanForTTS(text);
    let i = 0;
    const playOne = () => {
        if (i >= times) return;
        const u = new SpeechSynthesisUtterance(cleaned);
        u.lang = 'en-US';
        u.rate = 0.95;
        u.pitch = 1.0;
        u.onend = () => {
            i++;
            onEach?.();
            if (i < times) setTimeout(playOne, 700); // 700ms gap to let user shadow
        };
        window.speechSynthesis.speak(u);
    };
    playOne();
}

// ─── Colors (light theme only) ──────────────────────────────
const C = {
    gold: '#D4AF37', goldDim: '#B8971F', goldBg: '#FFFBEB',
    green: '#10B981', greenDim: '#059669',
    blue: '#3B82F6', blueDim: '#1D4ED8',
    purple: '#8B5CF6',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

const LEVEL_META: Record<Native365Level, { label: string; color: string; dim: string; sub: string }> = {
    core:   { label: 'CORE',   color: '#78716C', dim: '#44403C', sub: '骨格ルール' },
    nuance: { label: 'NUANCE', color: C.gold,    dim: C.goldDim, sub: 'ネイティブの直感' },
    shift:  { label: 'SHIFT',  color: C.green,   dim: C.greenDim, sub: '文脈で変わる' },
    native: { label: 'NATIVE', color: C.blue,    dim: C.blueDim,  sub: '実際に口から出る' },
};

const LEVEL_ORDER: Native365Level[] = ['core', 'nuance', 'shift', 'native'];

// ─── Opening scene (扉絵) ───────────────────────────────────
function OpeningScene({ opening, day }: { opening: Native365Opening; day: number }) {
    return (
        <div style={{
            background: '#1C1917',
            borderRadius: 14, padding: '18px 18px 16px',
            marginBottom: 20,
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 20, right: 20, height: 1,
                background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
                opacity: 0.4,
            }} />
            <div style={{ fontSize: 9, letterSpacing: 3, color: C.gold, fontWeight: 800, marginBottom: 6 }}>
                DAY {day} -- OPENING
            </div>
            <div style={{
                fontSize: 12, color: '#A8A29E', lineHeight: 1.7,
                fontStyle: 'italic', marginBottom: 14,
                paddingBottom: 14, borderBottom: '1px solid #44403C',
            }}>
                {opening.scene}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {opening.lines.map((line, i) => {
                    const ch = NATIVE365_CHARS[line.char];
                    return (
                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <img
                                src={ch.avatar}
                                alt={ch.name}
                                width={32} height={32}
                                style={{
                                    flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                                    objectFit: 'cover', border: `2px solid ${ch.color}`,
                                }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: 9, fontWeight: 800, color: ch.color,
                                    letterSpacing: 1.2, marginBottom: 3,
                                }}>
                                    {ch.name}
                                </div>
                                <div style={{ fontSize: 13, color: '#F5F5F4', lineHeight: 1.7 }}>
                                    {line.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Tap-to-hear EN text ────────────────────────────────────
function SpeakText({ text, size = 16, weight = 700 }: { text: string; size?: number; weight?: number }) {
    return (
        <div
            onClick={() => speakEN(text)}
            style={{
                display: 'flex', alignItems: 'center', gap: 6,
                cursor: 'pointer', userSelect: 'none',
            }}
            role="button"
            title="タップで音を聞く"
        >
            <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, borderRadius: '50%',
                background: C.blue, color: '#fff',
                fontSize: 10, flexShrink: 0,
            }}>
                {'▶'}
            </span>
            <span style={{ fontSize: size, fontWeight: weight, color: C.textPrimary, lineHeight: 1.5 }}>
                {text}
            </span>
        </div>
    );
}

// ─── Shadow Bar (NATIVE tab only) ──────────────────────────
// ネイティブの音を「同じスピードで口に出す」訓練の核。
// normal / slow / loop5 の3ボタン + 回数カウンタ。
function ShadowBar({
    text, reps, onRep,
}: { text: string; reps: number; onRep: () => void }) {
    const [looping, setLooping] = useState(false);
    const mastered = reps >= REPS_PER_MASTER;

    const onNormal = () => { speakEN(text, 0.95); onRep(); };
    const onSlow   = () => { speakEN(text, 0.70); onRep(); };
    const onLoop   = () => {
        if (looping) return;
        setLooping(true);
        speakENLoop(text, REPS_PER_MASTER, onRep);
        // Release lock after estimated total time (REPS_PER_MASTER * ~3.5s each)
        setTimeout(() => setLooping(false), REPS_PER_MASTER * 3500);
    };

    const btnStyle = (color: string, filled = false): React.CSSProperties => ({
        flex: 1, padding: '8px 6px',
        background: filled ? color : '#fff',
        color: filled ? '#fff' : color,
        border: `1.5px solid ${color}`,
        borderRadius: 8,
        fontSize: 10, fontWeight: 800, letterSpacing: 1,
        cursor: looping ? 'wait' : 'pointer',
        opacity: looping ? 0.6 : 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
    });

    return (
        <div style={{
            marginTop: 10, padding: '10px 12px',
            background: `linear-gradient(135deg, ${C.blue}08, ${C.blue}03)`,
            border: `1px solid ${C.blue}30`,
            borderRadius: 10,
        }}>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 8,
            }}>
                <div style={{ fontSize: 9, letterSpacing: 1.8, color: C.blueDim, fontWeight: 800 }}>
                    SHADOW / 声に出して同じ速度で
                </div>
                <div style={{
                    fontSize: 10, fontWeight: 800,
                    color: mastered ? C.green : C.textDim,
                    background: mastered ? `${C.green}15` : C.bg,
                    padding: '3px 8px', borderRadius: 999,
                    border: `1px solid ${mastered ? C.green + '40' : C.border}`,
                }}>
                    {mastered ? `★ ${reps}` : `× ${reps} / ${REPS_PER_MASTER}`}
                </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={onNormal} disabled={looping} style={btnStyle(C.blue, true)}>
                    {'▶'} PLAY
                </button>
                <button onClick={onSlow} disabled={looping} style={btnStyle(C.blueDim)}>
                    {'▶▶'} SLOW
                </button>
                <button onClick={onLoop} disabled={looping} style={btnStyle(C.gold, looping)}>
                    {looping ? '…' : `${'↻'} LOOP×${REPS_PER_MASTER}`}
                </button>
            </div>
            {mastered && (
                <div style={{
                    marginTop: 8, fontSize: 10, color: C.greenDim,
                    fontWeight: 700, textAlign: 'center',
                }}>
                    この文、体が覚えた。次の項目へ。
                </div>
            )}
        </div>
    );
}

// ─── Item viewer ────────────────────────────────────────────
function ItemCard({
    item, reps, onRep, registered, onRegister,
}: {
    item: Native365Item;
    reps: number;
    onRep: () => void;
    registered: boolean;
    onRegister: () => void;
}) {
    const [level, setLevel] = useState<Native365Level>('core');
    const lm = LEVEL_META[level];
    const point = item.points[level];
    const mastered = reps >= REPS_PER_MASTER;

    return (
        <div style={{
            background: C.card,
            border: `1px solid ${mastered ? C.green + '50' : C.border}`,
            borderRadius: 14, padding: 16, marginBottom: 14,
            position: 'relative',
            boxShadow: mastered ? `0 2px 10px ${C.green}18` : 'none',
        }}>
            {mastered && (
                <span style={{
                    position: 'absolute', top: 10, right: 12,
                    fontSize: 13, color: C.green,
                    animation: 'native365StarPop 0.4s ease-out',
                }}>★</span>
            )}
            <div style={{ fontSize: 12, fontWeight: 800, color: C.textPrimary, marginBottom: 4, paddingRight: 20 }}>
                {item.label}
            </div>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 12, fontStyle: 'italic' }}>
                {item.trigger}
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {LEVEL_ORDER.map(l => {
                    const active = l === level;
                    const meta = LEVEL_META[l];
                    return (
                        <button
                            key={l}
                            onClick={() => setLevel(l)}
                            style={{
                                flex: 1, padding: '6px 4px',
                                border: `1px solid ${active ? meta.color : C.border}`,
                                background: active ? meta.color : C.card,
                                color: active ? '#fff' : C.textDim,
                                fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
                                borderRadius: 6, cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            {meta.label}
                        </button>
                    );
                })}
            </div>

            <div style={{
                background: `linear-gradient(135deg, ${lm.color}10, ${C.card})`,
                border: `1px solid ${lm.color}30`,
                borderRadius: 10, padding: '12px 14px', marginBottom: 10,
            }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: lm.dim, letterSpacing: 1.5, marginBottom: 6 }}>
                    {lm.sub}
                </div>
                <SpeakText text={point.en} size={16} weight={700} />
                <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.7, marginTop: 8 }}>
                    {point.ja}
                </div>
                {/* Shadow bar -- NATIVE tab だけ本格的なシャドー練習 */}
                {level === 'native' && (
                    <>
                        <ShadowBar text={point.en} reps={reps} onRep={onRep} />
                        {/* +TRAINING: native の文を 365 training に送る */}
                        <button
                            onClick={onRegister}
                            disabled={registered}
                            style={{
                                marginTop: 8, width: '100%',
                                padding: '10px 14px',
                                background: registered
                                    ? `linear-gradient(135deg, ${C.green}12, #fff)`
                                    : `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`,
                                color: registered ? C.greenDim : '#fff',
                                border: registered ? `1.5px solid ${C.green}60` : 'none',
                                borderRadius: 10,
                                fontSize: 11, fontWeight: 800, letterSpacing: 1.5,
                                cursor: registered ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                boxShadow: registered ? 'none' : `0 2px 8px ${C.gold}40`,
                            }}
                        >
                            {registered ? '✓ TRAINING 登録済み' : '+ TRAINING に追加（この文を毎日練習）'}
                        </button>
                    </>
                )}
            </div>

            {item.trap && (
                <div style={{
                    background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8,
                    padding: '8px 12px', marginBottom: 6,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#B91C1C', letterSpacing: 1.5, marginBottom: 3 }}>TRAP</div>
                    <div style={{ fontSize: 12, color: '#7F1D1D', lineHeight: 1.5 }}>{item.trap}</div>
                </div>
            )}
            {item.tip && (
                <div style={{
                    background: C.goldBg, border: `1px solid ${C.gold}40`, borderRadius: 8,
                    padding: '8px 12px', marginBottom: 10,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: C.goldDim, letterSpacing: 1.5, marginBottom: 3 }}>TIP</div>
                    <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{item.tip}</div>
                </div>
            )}

            <div style={{ marginTop: 10 }}>
                <div style={{
                    fontSize: 9, letterSpacing: 2.5, color: C.textFaint,
                    fontWeight: 800, marginBottom: 8, textAlign: 'center',
                }}>
                    — 6人の反応 —
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {NATIVE365_CHAR_ORDER.map((key: Native365CharKey) => {
                        const ch = NATIVE365_CHARS[key];
                        const line = item.reactions[key];
                        if (!line) return null;
                        return (
                            <div key={key} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '8px 10px', borderRadius: 10,
                                background: `${ch.color}08`,
                                border: `1px solid ${ch.color}20`,
                            }}>
                                <img
                                    src={ch.avatar}
                                    alt={ch.name}
                                    width={24} height={24}
                                    style={{
                                        flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                                        objectFit: 'cover', border: `2px solid ${ch.color}`,
                                    }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: 9, fontWeight: 800, color: ch.colorDim,
                                        letterSpacing: 1, marginBottom: 2,
                                    }}>
                                        {ch.name} ({ch.role})
                                    </div>
                                    <div style={{ fontSize: 11, color: C.textSub, lineHeight: 1.5 }}>
                                        {line}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ─── Section (発音 or 文法) ──────────────────────────────────
function SectionBlock({
    section, color, tag, itemReps, onRep,
    registeredItems, onRegister,
}: {
    section: Native365Section;
    color: string;
    tag: string;
    itemReps: Record<string, number>;
    onRep: (itemId: string) => void;
    registeredItems: Record<string, string>;
    onRegister: (item: Native365Item) => void;
}) {
    return (
        <div style={{ marginBottom: 28 }}>
            <div style={{ marginBottom: 16 }}>
                <div style={{
                    display: 'inline-block', padding: '3px 10px', borderRadius: 4,
                    background: color, color: '#fff',
                    fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 8,
                }}>
                    {tag}
                </div>
                <h2 style={{
                    fontSize: 20, fontWeight: 900, color: C.textPrimary,
                    margin: '0 0 4px', letterSpacing: '-0.01em',
                }}>
                    {section.title}
                </h2>
                <p style={{ fontSize: 13, color: C.textSub, margin: '0 0 14px', lineHeight: 1.6 }}>
                    {section.subtitle}
                </p>

                {/* Why -- the deep insight */}
                <div style={{
                    background: '#fff', border: `1px solid ${color}30`,
                    borderLeft: `4px solid ${color}`,
                    borderRadius: 10, padding: '14px 16px', marginBottom: 10,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 1.8, marginBottom: 6 }}>
                        なぜ
                    </div>
                    <div style={{
                        fontSize: 14, fontWeight: 700, color: C.textPrimary,
                        lineHeight: 1.6, marginBottom: 10,
                    }}>
                        {section.intro.question}
                    </div>
                    <div style={{
                        fontSize: 12, color: C.textSub, lineHeight: 1.85,
                        whiteSpace: 'pre-wrap',
                    }}>
                        {section.intro.insight}
                    </div>
                </div>

                {/* TL;DR */}
                <div style={{
                    background: C.bg, borderLeft: `3px solid ${color}`,
                    padding: '10px 14px', borderRadius: 8,
                    fontSize: 12, color: C.textSub, lineHeight: 1.7,
                }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 1.5, marginRight: 8 }}>TL;DR</span>
                    {section.tldr}
                </div>
            </div>
            {section.items.map(item => (
                <ItemCard
                    key={item.id}
                    item={item}
                    reps={itemReps[item.id] ?? 0}
                    onRep={() => onRep(item.id)}
                    registered={!!registeredItems[item.id]}
                    onRegister={() => onRegister(item)}
                />
            ))}
        </div>
    );
}

// ─── Day complete button ────────────────────────────────────
function DayComplete({
    day, isDone, onComplete, nextReady,
}: {
    day: number; isDone: boolean; onComplete: () => void; nextReady: boolean;
}) {
    return (
        <div style={{
            background: isDone ? `linear-gradient(135deg, ${C.green}08, #fff)` : '#fff',
            border: `1px solid ${isDone ? C.green + '40' : C.border}`,
            borderRadius: 14, padding: '18px 18px 16px',
            marginTop: 12,
        }}>
            {isDone ? (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%', background: C.green,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 14, fontWeight: 900,
                        }}>{'✓'}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary }}>
                            Day {day} 完了
                        </div>
                    </div>
                    {nextReady ? (
                        <Link
                            href={`/english/native365`}
                            onClick={() => setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)}
                            style={{
                                display: 'block', textAlign: 'center',
                                padding: '12px 16px', background: C.gold, color: '#fff',
                                fontSize: 13, fontWeight: 800, letterSpacing: 1,
                                borderRadius: 10, textDecoration: 'none',
                            }}
                        >
                            Day {day + 1} へ →
                        </Link>
                    ) : (
                        <div style={{
                            padding: '12px 14px', background: C.bg, borderRadius: 10,
                            fontSize: 12, color: C.textDim, textAlign: 'center',
                        }}>
                            Day {day + 1} は準備中。
                        </div>
                    )}
                </>
            ) : (
                <button
                    onClick={onComplete}
                    style={{
                        width: '100%', padding: '14px 16px',
                        background: C.green, color: '#fff',
                        border: 'none', borderRadius: 10,
                        fontSize: 14, fontWeight: 800, letterSpacing: 1,
                        cursor: 'pointer',
                    }}
                >
                    Day {day} を完了マーク
                </button>
            )}
        </div>
    );
}

// ─── Page ───────────────────────────────────────────────────
export default function Native365Page() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [toastOn, setToastOn] = useState(false);

    useEffect(() => {
        const s = loadStats();
        setStats(s);
        setSelectedDay(s.currentDay || 1);
    }, []);

    const day = useMemo(() => getNative365Day(selectedDay), [selectedDay]);
    const plan = NATIVE365_MONTH1_PLAN.find(p => p.day === selectedDay);
    const isDone = !!stats?.dayProgress?.[selectedDay]?.completed;
    const nextReady = isNative365DayReady(selectedDay + 1);

    const markComplete = useCallback(() => {
        setStats(prev => {
            if (!prev) return prev;
            if (prev.dayProgress[selectedDay]?.completed) return prev;
            const next: Stats = {
                ...prev,
                currentDay: Math.max(prev.currentDay, selectedDay + 1),
                totalCompleted: prev.totalCompleted + 1,
                lastVisit: new Date().toISOString(),
                dayProgress: {
                    ...prev.dayProgress,
                    [selectedDay]: { completed: true, completedAt: new Date().toISOString() },
                },
            };
            saveStats(next);
            return next;
        });
        setToastOn(true);
        setTimeout(() => setToastOn(false), 2200);
    }, [selectedDay]);

    const bumpRep = useCallback((itemId: string) => {
        setStats(prev => {
            if (!prev) return prev;
            const current = prev.itemReps[itemId] ?? 0;
            const next: Stats = {
                ...prev,
                totalReps: prev.totalReps + 1,
                itemReps: { ...prev.itemReps, [itemId]: current + 1 },
            };
            saveStats(next);
            return next;
        });
    }, []);

    const [registerToast, setRegisterToast] = useState<string | null>(null);
    const registerToTraining = useCallback((item: Native365Item) => {
        setStats(prev => {
            if (!prev) return prev;
            if (prev.registeredItems[item.id]) return prev; // 二重登録防止
            try {
                addPhrase({
                    english: item.points.native.en,
                    japanese: item.points.native.ja,
                    category: 'native365',
                    date: todayYMD(),
                    situation: `Native365 Day ${selectedDay} -- ${item.label}`,
                    context: item.tip ?? item.trigger,
                });
            } catch (e) {
                console.warn('[native365] addPhrase failed:', e);
                return prev;
            }
            const next: Stats = {
                ...prev,
                registeredItems: { ...prev.registeredItems, [item.id]: new Date().toISOString() },
            };
            saveStats(next);
            return next;
        });
        setRegisterToast(item.points.native.en);
        setTimeout(() => setRegisterToast(null), 2200);
    }, [selectedDay]);

    if (!stats) return null;

    const completedCount = Object.values(stats.dayProgress).filter(p => p.completed).length;
    const progressPct = Math.round((completedCount / 30) * 100);

    // Mastery: items whose reps >= REPS_PER_MASTER. Auto-marks day complete when all mastered.
    const dayItems = day ? [...day.pronunciation.items, ...day.grammar.items] : [];
    const masteredCount = dayItems.filter(it => (stats.itemReps[it.id] ?? 0) >= REPS_PER_MASTER).length;
    const allMastered = dayItems.length > 0 && masteredCount === dayItems.length;

    return (
        <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 60 }}>
            <style dangerouslySetInnerHTML={{ __html: NATIVE365_STYLES }} />

            {/* Day Complete Toast */}
            {toastOn && (
                <div style={{
                    position: 'fixed', top: 80, left: '50%',
                    transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`,
                    color: '#fff',
                    padding: '12px 28px', borderRadius: 14,
                    fontSize: 13, fontWeight: 900, letterSpacing: 2,
                    zIndex: 1000,
                    boxShadow: `0 4px 20px ${C.gold}60, 0 8px 32px rgba(0,0,0,0.15)`,
                    animation: 'native365ToastSlide 0.3s ease-out',
                }}>
                    ★ DAY {selectedDay} COMPLETE ★
                </div>
            )}

            {/* Training register toast */}
            {registerToast && (
                <div style={{
                    position: 'fixed', bottom: 24, left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    border: `2px solid ${C.green}`,
                    color: C.greenDim,
                    padding: '10px 18px', borderRadius: 12,
                    fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
                    zIndex: 1000, maxWidth: 520,
                    boxShadow: `0 6px 24px ${C.green}30`,
                    animation: 'native365ToastSlide 0.3s ease-out',
                    textAlign: 'center', lineHeight: 1.5,
                }}>
                    ✓ TRAINING に追加<br />
                    <span style={{ color: C.textPrimary, fontSize: 11, fontWeight: 700 }}>
                        「{registerToast}」
                    </span>
                </div>
            )}

            {/* Header */}
            <div style={{
                background: '#fff', borderBottom: `1px solid ${C.border}`,
                padding: '24px 16px 20px',
            }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, letterSpacing: 3, color: C.textFaint, fontWeight: 800, marginBottom: 6 }}>
                                ネイティブ365 / NATIVE 365
                            </div>
                            <h1 style={{
                                fontSize: 24, fontWeight: 900, color: C.textPrimary,
                                margin: '0 0 4px', letterSpacing: '-0.02em',
                            }}>
                                英語の最後の1マイル
                            </h1>
                            <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.7 }}>
                                TOEIC 900・英検準1級の壁の先。発音 + 文法を毎日1テーマずつ。
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <div style={{
                                padding: '6px 12px', background: C.goldBg,
                                border: `1px solid ${C.gold}40`, borderRadius: 10, textAlign: 'center',
                                minWidth: 62,
                            }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: C.goldDim, lineHeight: 1 }}>
                                    {completedCount}
                                </div>
                                <div style={{ fontSize: 8, letterSpacing: 1.5, color: C.goldDim, fontWeight: 700, marginTop: 2 }}>
                                    / 30 DAYS
                                </div>
                            </div>
                            <div style={{
                                padding: '6px 12px', background: `${C.blue}10`,
                                border: `1px solid ${C.blue}40`, borderRadius: 10, textAlign: 'center',
                                minWidth: 62,
                            }}>
                                <div style={{ fontSize: 18, fontWeight: 900, color: C.blueDim, lineHeight: 1 }}>
                                    {stats.totalReps}
                                </div>
                                <div style={{ fontSize: 8, letterSpacing: 1.5, color: C.blueDim, fontWeight: 700, marginTop: 2 }}>
                                    SHADOW
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trigger training shortcut */}
            <div style={{ maxWidth: 760, margin: '14px auto 0', padding: '0 16px' }}>
                <Link href="/english/native365/training" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${C.gold}18, #fff)`,
                        border: `1.5px solid ${C.gold}60`,
                        borderLeft: `5px solid ${C.gold}`,
                        borderRadius: 12, padding: '14px 18px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                        boxShadow: `0 2px 12px ${C.gold}20`,
                    }}>
                        <div>
                            <div style={{ fontSize: 9, letterSpacing: 2.5, color: C.goldDim, fontWeight: 800 }}>
                                TRIGGER TRAINING
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary, marginTop: 2 }}>
                                状況 → 英語、日本語を経由しない反射
                            </div>
                            <div style={{ fontSize: 11, color: C.textSub, lineHeight: 1.5, marginTop: 3 }}>
                                + TRAINING で追加した文を場面カード + 3秒タイマー + SRS で反射化。
                            </div>
                        </div>
                        <div style={{
                            fontSize: 22, color: C.goldDim, fontWeight: 900,
                        }}>→</div>
                    </div>
                </Link>
            </div>

            {/* Phrase Bank shortcut */}
            <div style={{ maxWidth: 760, margin: '10px auto 0', padding: '0 16px' }}>
                <Link href="/english/native365/phrases" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${C.blue}08, #fff)`,
                        border: `1px solid ${C.blue}40`,
                        borderLeft: `4px solid ${C.blue}`,
                        borderRadius: 12, padding: '12px 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    }}>
                        <div>
                            <div style={{ fontSize: 9, letterSpacing: 2, color: C.blueDim, fontWeight: 800 }}>
                                PHRASE BANK
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.textPrimary, marginTop: 2 }}>
                                ネイティブの生音声 68 本
                            </div>
                            <div style={{ fontSize: 11, color: C.textSub, lineHeight: 1.5, marginTop: 2 }}>
                                PlayPhrase 由来の実写クリップ。タグで絞り込んでシャドー練習。
                            </div>
                        </div>
                        <div style={{
                            fontSize: 20, color: C.blue, fontWeight: 900,
                        }}>→</div>
                    </div>
                </Link>
            </div>

            {/* Month 1 calendar -- week x 6day grid (365 風) */}
            <div style={{ maxWidth: 760, margin: '16px auto 0', padding: '0 16px' }}>
                <div style={{
                    background: '#fff', border: `1px solid ${C.border}`,
                    borderRadius: 16, padding: '16px 16px 12px',
                }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-end', marginBottom: 14,
                    }}>
                        <div>
                            <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 800, marginBottom: 2 }}>
                                MONTH 1 / 30 DAYS
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>
                                発音と文法、両輪の30日
                            </div>
                        </div>
                        {/* progress bar */}
                        <div style={{ minWidth: 120 }}>
                            <div style={{ fontSize: 9, color: C.textFaint, fontWeight: 700, marginBottom: 4, textAlign: 'right' }}>
                                {completedCount} / 30 ({progressPct}%)
                            </div>
                            <div style={{
                                height: 6, width: '100%',
                                background: C.bg, borderRadius: 999, overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: `${progressPct}%`, height: '100%',
                                    background: `linear-gradient(90deg, ${C.gold}, ${C.green})`,
                                    borderRadius: 999,
                                    transition: 'width 0.4s ease-out',
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Week column labels (W1-W5) + 6 day cells each */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[0, 1, 2, 3, 4].map(rowIdx => (
                            <div key={rowIdx} style={{
                                display: 'grid',
                                gridTemplateColumns: '32px repeat(6, 1fr)',
                                gap: 6, alignItems: 'stretch',
                            }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
                                    color: C.textFaint, background: C.bg,
                                    borderRadius: 6,
                                }}>
                                    W{rowIdx + 1}
                                </div>
                                {[0, 1, 2, 3, 4, 5].map(colIdx => {
                                    const dayNum = rowIdx * 6 + colIdx + 1;
                                    if (dayNum > 30) {
                                        return <div key={colIdx} style={{ background: 'transparent' }} />;
                                    }
                                    const p = NATIVE365_MONTH1_PLAN.find(x => x.day === dayNum);
                                    const ready = isNative365DayReady(dayNum);
                                    const active = selectedDay === dayNum;
                                    const done = !!stats.dayProgress[dayNum]?.completed;
                                    const cellDate = dayToDate(stats.startDate, dayNum);
                                    const isToday = sameDate(cellDate, new Date());

                                    const bg = active
                                        ? `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`
                                        : done
                                            ? 'linear-gradient(135deg, #FEF3C7, #ECFDF5)'
                                            : isToday
                                                ? `linear-gradient(135deg, ${C.blue}15, #fff)`
                                                : ready ? C.card : C.bg;

                                    return (
                                        <button
                                            key={colIdx}
                                            onClick={() => setSelectedDay(dayNum)}
                                            style={{
                                                aspectRatio: '1/1',
                                                border: active
                                                    ? `2px solid ${C.goldDim}`
                                                    : done
                                                        ? `1.5px solid ${C.gold}50`
                                                        : isToday
                                                            ? `2px solid ${C.blue}`
                                                            : `1px solid ${ready ? C.border : '#F5F5F4'}`,
                                                background: bg,
                                                color: active ? '#fff' : (done ? '#92400E' : (isToday ? C.blueDim : (ready ? C.textPrimary : C.textFaint))),
                                                fontSize: 12, fontWeight: 800,
                                                borderRadius: 10, cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', justifyContent: 'center',
                                                position: 'relative', padding: '2px 0',
                                                animation: done && !active
                                                    ? 'native365CellGlow 3s ease-in-out infinite'
                                                    : (active ? 'native365TodayPulse 2s ease-in-out infinite' : undefined),
                                                boxShadow: active
                                                    ? `0 4px 16px ${C.gold}40`
                                                    : done
                                                        ? `0 2px 8px ${C.gold}25`
                                                        : isToday
                                                            ? `0 2px 10px ${C.blue}30`
                                                            : 'none',
                                            }}
                                            title={p ? `${formatMD(cellDate)} -- ${p.pronunciation} / ${p.grammar}` : formatMD(cellDate)}
                                        >
                                            <span style={{ fontSize: 13, lineHeight: 1 }}>{formatMD(cellDate)}</span>
                                            <span style={{
                                                fontSize: 8, lineHeight: 1, marginTop: 2,
                                                opacity: active ? 0.9 : 0.55, letterSpacing: 0.5,
                                            }}>
                                                Day {dayNum}
                                            </span>
                                            {done && !active && (
                                                <span style={{
                                                    position: 'absolute', top: 2, right: 4,
                                                    fontSize: 10, color: C.goldDim,
                                                    animation: 'native365StarPop 0.5s ease-out',
                                                }}>★</span>
                                            )}
                                            {isToday && !active && !done && (
                                                <span style={{
                                                    position: 'absolute', top: 2, right: 4,
                                                    fontSize: 7, fontWeight: 900, color: C.blueDim,
                                                    letterSpacing: 0.5,
                                                }}>今日</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div style={{
                        display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
                        marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.bg}`,
                        fontSize: 10, color: C.textFaint, fontWeight: 600,
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})` }} />
                            選択中
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: `linear-gradient(135deg, ${C.blue}15, #fff)`, border: `2px solid ${C.blue}` }} />
                            今日
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: 'linear-gradient(135deg, #FEF3C7, #ECFDF5)', border: `1px solid ${C.gold}50` }} />
                            完了
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: C.card, border: `1px solid ${C.border}` }} />
                            準備中
                        </span>
                    </div>
                </div>
            </div>

            {/* Day header */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px 16px' }}>
                <div style={{
                    background: '#fff', border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: '16px 18px',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 10, marginBottom: 4,
                    }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: C.gold, fontWeight: 800 }}>
                            DAY {selectedDay} / 30
                        </div>
                        <div style={{
                            fontSize: 10, letterSpacing: 1, color: C.textDim, fontWeight: 700,
                        }}>
                            {formatMD(dayToDate(stats.startDate, selectedDay))}
                            {sameDate(dayToDate(stats.startDate, selectedDay), new Date()) && (
                                <span style={{
                                    marginLeft: 6, padding: '1px 6px',
                                    background: C.blue, color: '#fff',
                                    borderRadius: 999, fontSize: 9, fontWeight: 800,
                                }}>TODAY</span>
                            )}
                        </div>
                    </div>
                    {plan && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: C.textSub }}>
                            <div>
                                <span style={{ color: C.gold, fontWeight: 700 }}>発音</span>{' / '}
                                {plan.pronunciation}
                            </div>
                            <div>
                                <span style={{ color: C.green, fontWeight: 700 }}>文法</span>{' / '}
                                {plan.grammar}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px' }}>
                {day ? (
                    <>
                        <OpeningScene opening={day.opening} day={day.day} />

                        {/* Shadow master bar */}
                        <div style={{
                            background: '#fff', border: `1px solid ${C.border}`,
                            borderLeft: `4px solid ${allMastered ? C.green : C.blue}`,
                            borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                        }}>
                            <div>
                                <div style={{ fontSize: 9, letterSpacing: 1.5, color: allMastered ? C.green : C.blue, fontWeight: 800 }}>
                                    SHADOW MASTER
                                </div>
                                <div style={{ fontSize: 12, color: C.textSub, marginTop: 2 }}>
                                    {allMastered
                                        ? 'この日の全項目を体に入れた。完了マークできる。'
                                        : `NATIVE タブでシャドー練習。各項目 ${REPS_PER_MASTER} 回ずつ声に出す。`}
                                </div>
                            </div>
                            <div style={{
                                fontSize: 16, fontWeight: 900,
                                color: allMastered ? C.green : C.textPrimary,
                                whiteSpace: 'nowrap',
                            }}>
                                {masteredCount} / {dayItems.length}
                            </div>
                        </div>

                        <SectionBlock
                            section={day.pronunciation}
                            color={C.gold}
                            tag="発音"
                            itemReps={stats.itemReps}
                            onRep={bumpRep}
                            registeredItems={stats.registeredItems}
                            onRegister={registerToTraining}
                        />
                        <SectionBlock
                            section={day.grammar}
                            color={C.green}
                            tag="文法"
                            itemReps={stats.itemReps}
                            onRep={bumpRep}
                            registeredItems={stats.registeredItems}
                            onRegister={registerToTraining}
                        />
                        <DayComplete
                            day={selectedDay}
                            isDone={isDone}
                            onComplete={markComplete}
                            nextReady={nextReady}
                        />
                    </>
                ) : (
                    <div style={{
                        padding: 32, textAlign: 'center',
                        background: '#fff', border: `1px dashed ${C.border}`, borderRadius: 14,
                        color: C.textDim, fontSize: 13, lineHeight: 1.7,
                    }}>
                        Day {selectedDay} は準備中。<br />
                        発音: {plan?.pronunciation ?? '-'}<br />
                        文法: {plan?.grammar ?? '-'}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Link href="/english/native365/lp" style={{
                        fontSize: 11, color: C.textDim,
                        textDecoration: 'underline', letterSpacing: 0.5,
                    }}>
                        ネイティブ365とは？
                    </Link>
                </div>
            </div>
        </div>
    );
}
