// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    EIKEN1_ESSAYS,
    TOTAL_DAYS,
    getEssayForDay,
    getDateForDay,
    getTodayDay,
    type EikenEssayDay,
} from '@/data/english/write-eiken1';
import {
    EIKEN1_SUMMARIES,
    getSummaryForDay,
    type EikenSummaryDay,
} from '@/data/english/write-eiken1-summary';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';
import WriteLesson from '@/components/english/WriteLesson';
import { WriteCalendar, type DayLayers } from '@/components/english/WriteCalendar';
import { WriteFrameTable } from '@/components/english/WriteFrameTable';
import { FRAMES_BY_DAY, TOTAL_FRAMES, UNIQUE_FRAMES } from '@/data/english/write-frames';
import { getCounterForDay } from '@/data/english/write-eiken1-counter';
import { getSpokenForDay } from '@/data/english/write-spoken';
import { WriteLayerPanel } from '@/components/english/WriteLayerPanel';

type Mode = 'essay' | 'summary';
const MODE_KEY = 'writeone-eiken-mode';
const DONE_KEY: Record<Mode, string> = {
    essay: 'writeone-eiken1-done',
    summary: 'writeone-eiken1-sum-done',
};

function loadDone(mode: Mode): Set<number> {
    try {
        const s = localStorage.getItem(DONE_KEY[mode]);
        return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
}
function saveDone(mode: Mode, set: Set<number>) {
    try { localStorage.setItem(DONE_KEY[mode], JSON.stringify([...set])); } catch { /* noop */ }
}
function speak(text: string) {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}
// 全文を一文ずつ (. ! ? 区切り) に分割。閉じ引用符も末尾に含める。
function splitSentences(text: string): string[] {
    const matches = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+["')\]]*/g);
    return (matches ?? []).map(s => s.trim()).filter(s => s.length > 1);
}
function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const INK = '#1C1917';

export default function WriteOneEikenPage() {
    const [mode, setMode] = useState<Mode>('essay');
    const [done, setDone] = useState<Set<number>>(new Set());
    const [day, setDay] = useState(1);
    const [showJa, setShowJa] = useState(false);
    const [showPassageJa, setShowPassageJa] = useState(false);
    const [showExp, setShowExp] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reg, setReg] = useState<{ status: 'idle' | 'running' | 'done'; total: number; done: number; added: number; dup: number }>(
        { status: 'idle', total: 0, done: 0, added: 0, dup: 0 }
    );

    useEffect(() => {
        let initialMode: Mode = 'essay';
        try {
            const saved = localStorage.getItem(MODE_KEY);
            if (saved === 'summary' || saved === 'essay') initialMode = saved;
        } catch { /* noop */ }
        setMode(initialMode);
        setDone(loadDone(initialMode));
        setDay(getTodayDay());
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // 日・モードが変わったら登録状態をリセット
    useEffect(() => {
        setReg({ status: 'idle', total: 0, done: 0, added: 0, dup: 0 });
    }, [day, mode]);

    const switchMode = useCallback((m: Mode) => {
        setMode(m);
        setDone(loadDone(m));
        setShowJa(false);
        setShowPassageJa(false);
        try { localStorage.setItem(MODE_KEY, m); } catch { /* noop */ }
    }, []);

    // カレンダー用: お題(日本語)と、その日に何層そろっているか
    const dayTopics = useMemo(() => {
        const t: Record<number, string> = {};
        for (const e of EIKEN1_ESSAYS) t[e.day] = e.topicJa;
        return t;
    }, []);

    const dayLayers = useMemo(() => {
        const l: Record<number, DayLayers> = {};
        for (let d = 1; d <= TOTAL_DAYS; d++) {
            l[d] = {
                front: !!getEssayForDay(d),
                counter: !!getCounterForDay(d),
                frames: !!FRAMES_BY_DAY[d],
                spoken: !!getSpokenForDay(d),
            };
        }
        return l;
    }, []);

    const essay: EikenEssayDay | null = mode === 'essay' ? getEssayForDay(day) : null;
    const summary: EikenSummaryDay | null = mode === 'summary' ? getSummaryForDay(day) : null;
    const available = mode === 'essay' ? !!getEssayForDay(day) : !!getSummaryForDay(day);

    const keyExpressions = essay?.keyExpressions ?? summary?.keyExpressions ?? [];
    const tip = essay?.tip ?? summary?.tip ?? '';

    const isDone = done.has(day);
    const doneCount = done.size;

    const streak = useMemo(() => {
        const today = getTodayDay();
        let s = 0;
        for (let d = today; d >= 1; d--) {
            if (done.has(d)) s++; else break;
        }
        return s;
    }, [done]);

    const toggleDone = useCallback(() => {
        setDone(prev => {
            const next = new Set(prev);
            if (next.has(day)) next.delete(day); else next.add(day);
            saveDone(mode, next);
            return next;
        });
    }, [day, mode]);

    const copyCaption = useCallback(async () => {
        let caption = '';
        if (mode === 'essay' && essay) {
            caption =
                `ライトパス Day ${day} / 30\n` +
                `今日のお題: ${essay.topic}\n` +
                `英検1級の英作文、30日で攻略中。\n\n` +
                `#ライトパス #英検1級 #英検 #英作文 #英語学習 #英語垢 #studygram`;
        } else if (mode === 'summary' && summary) {
            caption =
                `ライトパス Day ${day} / 30\n` +
                `今日のテーマ: ${summary.theme}\n` +
                `英検1級の英文要約、30日で攻略中。\n\n` +
                `#ライトパス #英検1級 #英検 #英文要約 #英語学習 #英語垢 #studygram`;
        }
        if (!caption) return;
        try {
            await navigator.clipboard.writeText(caption);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* noop */ }
    }, [day, mode, essay, summary]);

    // 全文(模範エッセイ/要約)を一文ずつ /english/training に登録
    const registerAll = useCallback(async () => {
        const text = mode === 'essay' ? (essay?.essay ?? '') : (summary?.summary ?? '');
        const sentences = splitSentences(text);
        if (sentences.length === 0 || reg.status === 'running') return;
        const date = todayStr();
        setReg({ status: 'running', total: sentences.length, done: 0, added: 0, dup: 0 });
        let added = 0, dup = 0;
        for (let i = 0; i < sentences.length; i++) {
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ english: sentences[i], japanese: '', category: 'expression', date }),
                });
                const data = await res.json();
                if (data?.duplicate) dup++;
                else if (data?.success) added++;
            } catch { /* skip one, keep going */ }
            setReg({ status: 'running', total: sentences.length, done: i + 1, added, dup });
        }
        setReg({ status: 'done', total: sentences.length, done: sentences.length, added, dup });
    }, [mode, essay, summary, reg.status]);

    const sentenceCount = useMemo(() => {
        const text = mode === 'essay' ? (essay?.essay ?? '') : (summary?.summary ?? '');
        return splitSentences(text).length;
    }, [mode, essay, summary]);

    const dateLabel = useMemo(() => {
        const d = getDateForDay(day);
        return `${d.getMonth() + 1}/${d.getDate()}`;
    }, [day]);

    const essayParas = useMemo(
        () => (essay ? essay.essay.split(/\n\n+/).map(p => p.trim()).filter(Boolean) : []),
        [essay]
    );
    const passageParas = useMemo(
        () => (summary ? summary.passage.split(/\n\n+/).map(p => p.trim()).filter(Boolean) : []),
        [summary]
    );

    const speakTarget = mode === 'essay'
        ? (essay ? essay.essay.replace(/\n+/g, ' ') : '')
        : (summary ? summary.summary.replace(/\n+/g, ' ') : '');

    const tabBtn = (m: Mode, label: string, sub: string) => {
        const activeTab = mode === m;
        return (
            <button onClick={() => switchMode(m)}
                style={{
                    flex: 1, padding: '10px 8px', borderRadius: '12px', cursor: 'pointer',
                    border: activeTab ? `2px solid ${GOLD}` : '1px solid #ECE7DA',
                    background: activeTab ? '#FEF9E7' : '#fff',
                    transition: 'all 0.15s',
                }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: activeTab ? '#9A7B16' : '#78716C' }}>{label}</div>
                <div style={{ fontSize: '10px', color: '#A8A29E', marginTop: '2px' }}>{sub}</div>
            </button>
        );
    };

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#FAF8F2',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            {/* ===== OUTPUT英検 共通ナビ ===== */}
            <EikenOutputNav active="write" />

            {/* ===== HEADER ===== */}
            <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #ECE7DA', padding: isMobile ? '16px' : '20px 32px' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '900', color: GOLD, letterSpacing: '0.5px', fontFamily: 'Georgia, serif' }}>WRITE</span>
                        <span style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '900', color: INK, letterSpacing: '0.5px', fontFamily: 'Georgia, serif' }}>PASS</span>
                        <span style={{ fontSize: '11px', fontWeight: '900', color: '#fff', background: INK, padding: '3px 8px', borderRadius: '6px', letterSpacing: '1px' }}>英検1級対策</span>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: '#C9C0AC', letterSpacing: '2px' }}>30 DAYS</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: isMobile ? '15px' : '17px', fontWeight: '800', color: INK }}>
                        ライトパス ー 英検1級の{mode === 'essay' ? '英作文' : '要約'}、30日で「書ける型」に。
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#A8A29E' }}>
                        {mode === 'essay'
                            ? '英検1級ライティング(意見論述 200-240語)の模範解答で、合格する書き方と必須表現を30日で身につける。'
                            : '英検1級ライティング(英文要約 90-110語)の模範要約で、言い換えと構成の型を30日で身につける。'}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <a href="/english/write/core5"
                            style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', fontWeight: 800, color: '#fff', background: '#9A7B16', border: `1px solid #9A7B16`, padding: '7px 14px', borderRadius: '99px' }}>
                            CORE 5 ー 理由は10本。左右の指に載せて丸暗記 →
                        </a>
                        <a href="/english/write/sum5"
                            style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', fontWeight: 800, color: '#fff', background: '#1C1917', border: '1px solid #1C1917', padding: '7px 14px', borderRadius: '99px' }}>
                            SUM 5 ー 要約の形は5つ。型が決まれば文頭が決まる →
                        </a>
                        <a href="/english/write/master"
                            style={{ display: 'inline-block', textDecoration: 'none', fontSize: '12px', fontWeight: 800, color: '#9A7B16', background: '#FEF9E7', border: `1px solid ${GOLD}55`, padding: '7px 14px', borderRadius: '99px' }}>
                            表現マスター ー 30本が網羅する型・格上げ語彙 →
                        </a>
                        {mode === 'essay' && (
                            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 800, color: '#15803D', background: '#DCFCE7', padding: '7px 14px', borderRadius: '99px' }}>
                                下に読解レッスン(タップ辞書・語彙・文法)↓
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== MODE TABS ===== */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {tabBtn('essay', '意見論述', 'Essay 200-240語')}
                    {tabBtn('summary', '要約', 'Summary 90-110語')}
                </div>
            </div>

            {/* ===== 30日カレンダー ===== */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px 4px' : '18px 32px 6px' }}>
                <WriteCalendar
                    day={day}
                    setDay={setDay}
                    done={done}
                    topics={dayTopics}
                    layers={dayLayers}
                    todayDay={getTodayDay()}
                    isMobile={isMobile}
                />
                <div style={{ fontSize: '10.5px', color: '#78716C', lineHeight: 1.9, marginTop: '12px', background: '#FAF8F2', border: '1px solid #ECE7DA', borderRadius: '10px', padding: '10px 12px' }}>
                    30本の模範解答は、全{TOTAL_FRAMES}文が「役割 + 型(X/Y/Zの穴)」に還元してある。
                    型に単語を代入すると原文に完全一致することを機械検査済み。重複を除いた型の在庫は{UNIQUE_FRAMES}本で、
                    あとは<strong style={{ color: '#1C1917' }}>単語を入れ替えるゲーム</strong>になる。
                </div>
            </div>

            {/* ===== PROGRESS ===== */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                        { label: '今日', value: `Day ${getTodayDay()}` },
                        { label: '書いた日数', value: `${doneCount}/30` },
                        { label: '連続', value: `${streak}日` },
                    ].map(s => (
                        <div key={s.label} style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ECE7DA', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: '900', color: INK }}>{s.value}</div>
                            <div style={{ fontSize: '10px', color: '#A8A29E', marginTop: '2px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <div style={{ height: '6px', backgroundColor: '#EFEBDF', borderRadius: '99px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${(doneCount / TOTAL_DAYS) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${GREEN})`, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* ===== DAY NAV ===== */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => setDay(d => Math.max(1, d - 1))} disabled={day <= 1}
                    style={{ border: '1px solid #ECE7DA', background: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: day > 1 ? 'pointer' : 'not-allowed', color: day > 1 ? '#78716C' : '#D6D3D1', fontSize: '13px' }}>
                    {'< 前の日'}
                </button>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#78716C' }}>Day {day} ・ {dateLabel}</span>
                <button onClick={() => setDay(d => Math.min(TOTAL_DAYS, d + 1))} disabled={day >= TOTAL_DAYS}
                    style={{ border: '1px solid #ECE7DA', background: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: day < TOTAL_DAYS ? 'pointer' : 'not-allowed', color: day < TOTAL_DAYS ? '#78716C' : '#D6D3D1', fontSize: '13px' }}>
                    {'次の日 >'}
                </button>
            </div>

            {/* ===== HERO CARD ===== */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px' : '18px 32px' }}>
                {essay ? (
                    <div style={cardStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
                            <span style={badgeStyle}>DAY {String(day).padStart(2, '0')} / 30</span>
                            <span style={{ fontSize: '11px', fontWeight: '700', color: '#B8AE92', letterSpacing: '1px' }}>{essay.exam} ・ {essay.focus}</span>
                        </div>
                        <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid #F0EBDD' }}>
                            <div style={{ fontSize: '10px', fontWeight: '800', color: GOLD, letterSpacing: '1.5px', marginBottom: '4px' }}>TOPIC</div>
                            <p style={{ margin: 0, fontSize: isMobile ? '15px' : '16px', fontWeight: '800', color: INK, lineHeight: 1.5 }}>{essay.topic}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#A8A29E' }}>{essay.topicJa}</p>
                            <div style={{ marginTop: '8px' }}>
                                <span style={{ fontSize: '11px', fontWeight: '800', color: GREEN, background: '#ECFDF5', border: `1px solid ${GREEN}33`, padding: '3px 10px', borderRadius: '99px' }}>
                                    立場: {essay.stance}
                                </span>
                            </div>
                        </div>
                        <div style={serifBody(isMobile)}>
                            {essayParas.map((p, i) => (
                                <p key={i} style={{ margin: i === 0 ? 0 : '14px 0 0' }}>{p}</p>
                            ))}
                        </div>
                        <button onClick={() => setShowJa(v => !v)} style={jaToggle}>
                            {showJa ? '日本語をかくす' : '日本語をみる'}
                        </button>
                        {showJa && <p style={jaText}>{essay.essayJa}</p>}
                        <div style={cardFooter}>
                            <span style={{ fontSize: '13px', fontWeight: '900', color: GOLD }}>WRITE<span style={{ color: INK }}>PASS</span></span>
                            <span style={{ fontSize: '11px', color: '#B8AE92' }}>{essay.wordCount} words</span>
                        </div>
                    </div>
                ) : summary ? (
                    <div style={cardStyle(isMobile)}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
                            <span style={badgeStyle}>DAY {String(day).padStart(2, '0')} / 30</span>
                            <span style={{ fontSize: '11px', fontWeight: '700', color: '#B8AE92', letterSpacing: '1px' }}>{summary.themeJa}</span>
                        </div>

                        {/* SOURCE PASSAGE (read) */}
                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F0EBDD' }}>
                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1.5px', marginBottom: '6px' }}>本文 ・ まず読む (約{summary.passage.split(/\s+/).length}語)</div>
                            <div style={{ fontSize: isMobile ? '13px' : '14px', lineHeight: 1.8, color: '#57534E' }}>
                                {passageParas.map((p, i) => (
                                    <p key={i} style={{ margin: i === 0 ? 0 : '10px 0 0' }}>{p}</p>
                                ))}
                            </div>
                            <button onClick={() => setShowPassageJa(v => !v)} style={{ ...jaToggle, marginTop: '12px' }}>
                                {showPassageJa ? '本文の訳をかくす' : '本文の訳をみる'}
                            </button>
                            {showPassageJa && <p style={jaText}>{summary.passageJa}</p>}
                        </div>

                        {/* MODEL SUMMARY (copy) */}
                        <div style={{ fontSize: '10px', fontWeight: '800', color: GOLD, letterSpacing: '1.5px', marginBottom: '8px' }}>模範要約 ・ これを書く</div>
                        <div style={serifBody(isMobile)}>
                            <p style={{ margin: 0 }}>{summary.summary}</p>
                        </div>
                        <button onClick={() => setShowJa(v => !v)} style={jaToggle}>
                            {showJa ? '要約の訳をかくす' : '要約の訳をみる'}
                        </button>
                        {showJa && <p style={jaText}>{summary.summaryJa}</p>}
                        <div style={cardFooter}>
                            <span style={{ fontSize: '13px', fontWeight: '900', color: GOLD }}>WRITE<span style={{ color: INK }}>PASS</span></span>
                            <span style={{ fontSize: '11px', color: '#B8AE92' }}>{summary.wordCount} words</span>
                        </div>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#fff', border: '1px dashed #ECE7DA', borderRadius: '20px', padding: '50px 20px', textAlign: 'center', color: '#A8A29E' }}>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#78716C' }}>この日はまだ準備中</div>
                        <div style={{ fontSize: '12px', marginTop: '6px' }}>Day 1-{(mode === 'essay' ? EIKEN1_ESSAYS : EIKEN1_SUMMARIES).length} まで公開中です</div>
                    </div>
                )}
            </div>

            {/* ===== KEY EXPRESSIONS ===== */}
            {available && keyExpressions.length > 0 && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 32px' }}>
                    <button onClick={() => setShowExp(v => !v)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #ECE7DA', borderRadius: '12px', padding: '12px 14px', cursor: 'pointer' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: INK }}>
                            {mode === 'essay' ? '作文に効く必須表現' : '要約に効く必須表現'} <span style={{ color: GOLD }}>{keyExpressions.length}</span>
                        </span>
                        <span style={{ fontSize: '11px', color: '#A8A29E', transform: showExp ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>▶</span>
                    </button>
                    {showExp && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                            {keyExpressions.map((k, i) => (
                                <div key={i} style={{ background: '#fff', border: '1px solid #ECE7DA', borderRadius: '12px', padding: '12px 14px' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                        <button onClick={() => speak(k.en.replace(/~/g, ''))}
                                            style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: '#F5F3EC', color: '#78716C', fontSize: '9px', marginTop: '1px' }}>
                                            {'▶'}
                                        </button>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '14px', fontWeight: '700', color: INK, fontFamily: 'Georgia, serif' }}>{k.en}</div>
                                            <div style={{ fontSize: '12px', color: '#57534E', marginTop: '2px' }}>{k.ja}</div>
                                            <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '3px', lineHeight: 1.6 }}>{k.note}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ===== TIP ===== */}
            {available && tip && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '12px 16px 0' : '14px 32px 0' }}>
                    <div style={{ background: '#FEF9E7', border: `1px solid ${GOLD}33`, borderRadius: '12px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '800', color: '#9A7B16', letterSpacing: '1px', marginBottom: '4px' }}>{mode === 'essay' ? '今日の型' : '今日の要約のコツ'}</div>
                        <div style={{ fontSize: '13px', color: '#57534E', lineHeight: 1.7 }}>{tip}</div>
                    </div>
                </div>
            )}

            {/* ===== RITUAL + ACTIONS ===== */}
            {available && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                        {[
                            { n: '1', t: mode === 'essay' ? '声に出して読む' : '本文を読んで要点を掴む' },
                            { n: '2', t: '答案用紙に書く' },
                            { n: '3', t: '写真を撮って晒す' },
                        ].map(s => (
                            <div key={s.n} style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #ECE7DA', borderRadius: '12px', padding: '12px 8px', textAlign: 'center' }}>
                                <div style={{ width: '22px', height: '22px', margin: '0 auto 6px', borderRadius: '50%', background: GOLD, color: '#fff', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</div>
                                <div style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '700', color: '#57534E' }}>{s.t}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button onClick={() => speak(speakTarget)}
                            style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '12px', border: '1px solid #ECE7DA', background: '#fff', color: '#57534E', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                            読み上げ
                        </button>
                        <button onClick={copyCaption}
                            style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '12px', border: `1px solid ${GOLD}55`, background: '#FEF9E7', color: '#9A7B16', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
                            {copied ? 'コピーしました' : '投稿キャプションをコピー'}
                        </button>
                        <button onClick={toggleDone}
                            style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '12px', border: 'none', background: isDone ? GREEN : INK, color: '#fff', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>
                            {isDone ? '書けた (完了)' : '書けた!'}
                        </button>
                    </div>
                    {/* 全文を一文ずつ トレーニング登録 */}
                    <div style={{ marginTop: '8px', background: '#fff', border: `1px solid ${GREEN}44`, borderRadius: '12px', padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: INK }}>
                                    {mode === 'essay' ? '模範エッセイ' : '模範要約'}を一文ずつトレーニングに登録
                                </div>
                                <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '2px' }}>
                                    全文を{sentenceCount}文に分けて <a href="/english/training" style={{ color: '#15803D', fontWeight: 700 }}>/english/training</a> のカードにします
                                </div>
                            </div>
                            <button onClick={registerAll} disabled={reg.status === 'running' || sentenceCount === 0}
                                style={{
                                    flexShrink: 0, padding: '10px 18px', borderRadius: '10px', border: 'none',
                                    background: reg.status === 'running' ? '#A7D8C0' : GREEN, color: '#fff',
                                    fontSize: '13px', fontWeight: '800', cursor: reg.status === 'running' ? 'default' : 'pointer',
                                }}>
                                {reg.status === 'running' ? `登録中… ${reg.done}/${reg.total}`
                                    : reg.status === 'done' ? '再登録'
                                        : `${sentenceCount}文を登録`}
                            </button>
                        </div>
                        {reg.status === 'running' && (
                            <div style={{ height: '5px', background: '#EFEBDF', borderRadius: '99px', marginTop: '10px', overflow: 'hidden' }}>
                                <div style={{ width: `${reg.total ? (reg.done / reg.total) * 100 : 0}%`, height: '100%', background: GREEN, transition: 'width 0.2s' }} />
                            </div>
                        )}
                        {reg.status === 'done' && (
                            <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 700, marginTop: '8px' }}>
                                {reg.added}文を登録しました{reg.dup > 0 ? `（${reg.dup}文は登録済み）` : ''}。
                                <a href="/english/training" style={{ color: '#15803D', marginLeft: '6px', textDecoration: 'underline' }}>トレーニングを開く →</a>
                            </div>
                        )}
                    </div>

                    <a href={`/english/write/sheet?mode=${mode}&day=${day}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'block', marginTop: '8px', textDecoration: 'none' }}>
                        <div style={{
                            padding: '14px', borderRadius: '12px',
                            background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`,
                            color: '#fff', fontSize: '14px', fontWeight: '900', textAlign: 'center',
                            letterSpacing: '1px', boxShadow: '0 4px 14px rgba(212,175,55,0.35)',
                        }}>
                            A4 答案用紙を印刷する
                        </div>
                    </a>
                    <p style={{ fontSize: '11px', color: '#B8AE92', textAlign: 'center', marginTop: '10px' }}>
                        専用のA4カラー答案用紙に書いて、写真を撮って #ライトパス で投稿するのが、続くコツ。
                    </p>
                </div>
            )}

            {/* ===== 読解レッスン (essay mode only) ===== */}
            {mode === 'essay' && available && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '20px 16px 0' : '28px 32px 0' }}>
                    <WriteLesson day={day} isMobile={isMobile} />
                </div>
            )}

            {/* ===== 裏(逆の立場) と 話(口語版) ===== */}
            {mode === 'essay' && available && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '20px 16px 0' : '28px 32px 0' }}>
                    <WriteLayerPanel
                        counter={getCounterForDay(day)}
                        spoken={getSpokenForDay(day)}
                        isMobile={isMobile}
                    />
                </div>
            )}

            {/* ===== 型の表(この日の模範解答を役割+穴に還元したもの) ===== */}
            {mode === 'essay' && FRAMES_BY_DAY[day] && (
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '20px 16px 0' : '28px 32px 0' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                        型 ー この日の解答の骨格({FRAMES_BY_DAY[day].frames.length}行)
                    </div>
                    <WriteFrameTable data={FRAMES_BY_DAY[day]} isMobile={isMobile} />
                </div>
            )}

            {/* ===== ガード文言 ===== */}
            <EikenOutputDisclaimer />
        </div>
    );
}

// ===== shared styles =====
function cardStyle(isMobile: boolean): React.CSSProperties {
    return {
        backgroundColor: '#FFFDF8',
        border: `1px solid ${GOLD}33`,
        borderRadius: '20px',
        boxShadow: '0 8px 30px rgba(212,175,55,0.08)',
        padding: isMobile ? '22px 20px' : '34px 38px',
        position: 'relative',
    };
}
function serifBody(isMobile: boolean): React.CSSProperties {
    return { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.9, color: INK, letterSpacing: '0.2px' };
}
const badgeStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 900, color: '#fff', backgroundColor: GOLD, padding: '5px 12px', borderRadius: '99px', letterSpacing: '1px' };
const jaToggle: React.CSSProperties = { marginTop: '18px', background: 'none', border: 'none', color: GOLD, fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: 0 };
const jaText: React.CSSProperties = { marginTop: '8px', fontSize: '13px', lineHeight: 1.9, color: '#78716C', whiteSpace: 'pre-line' };
const cardFooter: React.CSSProperties = { marginTop: '22px', paddingTop: '16px', borderTop: '1px dashed #ECE7DA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
