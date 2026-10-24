'use client';

// スピークパス (2次) — 2026-10 全面改訂。
// 模範を30本なぞる作りをやめて、本番で持ち込める部品を覚える作りにした。
// データと方針は src/data/english/speak-tonio.ts の冒頭を見ること。
//   お題     = 実話のつかみ → 実在の事件 → 短い文 → 崩れる場所 → 4文のQ&A
//   模擬試験 = 5題を引く → 1つ選ぶ → 準備1分 → 2分話す(録音) → Q&A を1問ずつ
//   実話     = どのお題にも持ち込めるつかみ
//   戦略     = 試験の形と6つの原則
//   切り返し = 最初の雑談と、時間稼ぎ・反論の受け方

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    SPEAK_TOPICS, STORY_BANK, EXAM_FLOW, PRINCIPLES, MOVES, SMALL_TALK,
    getHook, type SpeakTopic, type SpeakAnswer,
} from '@/data/english/speak-tonio';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const MUTE = '#A8A29E';
const LINE = '#ECE7DA';
const SERIF = 'Georgia, "Times New Roman", serif';

type Tab = 'topics' | 'mock' | 'stories' | 'strategy' | 'moves';
const TABS: { id: Tab; label: string; sub: string }[] = [
    { id: 'topics', label: 'お題', sub: `${SPEAK_TOPICS.length}本` },
    { id: 'mock', label: '模擬試験', sub: '本番の形' },
    { id: 'stories', label: '実話', sub: `${STORY_BANK.length}本` },
    { id: 'strategy', label: '戦略', sub: '試験の形' },
    { id: 'moves', label: '切り返し', sub: '雑談・反論' },
];

const DONE_KEY = 'speakpass-v2-done';
function loadDone(): Set<string> {
    try { const s = localStorage.getItem(DONE_KEY); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
}
function saveDone(set: Set<string>) { try { localStorage.setItem(DONE_KEY, JSON.stringify([...set])); } catch { /* 保存できなくても画面は動く */ } }

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.95;
    window.speechSynthesis.speak(u);
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function SpeakPassPage() {
    const [tab, setTab] = useState<Tab>('topics');
    const [isMobile, setIsMobile] = useState(false);
    const [done, setDone] = useState<Set<string>>(new Set());
    const [topicId, setTopicId] = useState(SPEAK_TOPICS[0]?.id ?? '');

    useEffect(() => {
        setDone(loadDone());
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const toggleDone = useCallback((id: string) => {
        setDone((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); saveDone(n); return n; });
    }, []);

    const openTopic = (id: string) => { setTopicId(id); setTab('topics'); if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const pad = isMobile ? '0 16px' : '0 32px';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F2', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>
            <EikenOutputNav active="speak" />

            {/* HEADER */}
            <div style={{ backgroundColor: '#fff', borderBottom: `1px solid ${LINE}`, padding: isMobile ? '16px' : '20px 32px' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '26px', fontWeight: 900, color: GOLD, letterSpacing: '0.5px' }}>SPEAK</span>
                        <span style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '26px', fontWeight: 900, color: INK, letterSpacing: '0.5px' }}>PASS</span>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '6px' }}>英検1級 2次対策</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: isMobile ? '15px' : '17px', fontWeight: 800 }}>模範をなぞるのをやめた。自分の実話で笑わせて、実際の事件で黙らせる。</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: MUTE, lineHeight: 1.6 }}>
                        覚えるのはスピーチ本文ではなく、どのお題にも持ち込める部品。実話のつかみ、実在の事件、自分の口で崩れない短い文、4文で返すQ&A。
                    </p>
                </div>
            </div>

            {/* TABS */}
            <div style={{ backgroundColor: '#FAF8F2', borderBottom: `1px solid ${LINE}` }}>
                <div style={{ maxWidth: '780px', margin: '0 auto', padding: isMobile ? '8px 10px' : '10px 32px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                    {TABS.map((t) => {
                        const on = tab === t.id;
                        return (
                            <button key={t.id} onClick={() => setTab(t.id)} style={{
                                flex: '1 0 auto', minWidth: isMobile ? '68px' : '110px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer',
                                border: on ? `1.5px solid ${GOLD}` : `1px solid ${LINE}`, background: on ? '#FFFBEB' : '#fff',
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: 900, color: on ? DEEPGOLD : INK }}>{t.label}</div>
                                <div style={{ fontSize: '10px', color: MUTE, marginTop: '1px' }}>{t.sub}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: pad }}>
                {tab === 'topics' && <TopicsTab isMobile={isMobile} topicId={topicId} setTopicId={setTopicId} done={done} toggleDone={toggleDone} />}
                {tab === 'mock' && <MockTab isMobile={isMobile} openTopic={openTopic} />}
                {tab === 'stories' && <StoriesTab openTopic={openTopic} />}
                {tab === 'strategy' && <StrategyTab />}
                {tab === 'moves' && <MovesTab />}
            </div>

            <div style={{ height: '28px' }} />
            <EikenOutputDisclaimer />
        </div>
    );
}

// ===================== 共通の部品 =====================
function SectionLabel({ children, color = GOLD }: { children: React.ReactNode; color?: string }) {
    return <div style={{ fontSize: '10.5px', fontWeight: 900, color, letterSpacing: '1.5px', margin: '22px 0 8px' }}>{children}</div>;
}

function PlayBtn({ text, size = 24 }: { text: string; size?: number }) {
    return (
        <button onClick={() => speak(text)} aria-label="読み上げ" style={{
            flexShrink: 0, width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: '#F5F3EC', color: SUB, fontSize: '9px',
        }}>{'▶'}</button>
    );
}

function QaCard({ x, i, hidden }: { x: SpeakAnswer; i: number; hidden: boolean }) {
    const [open, setOpen] = useState(false);
    const show = !hidden || open;
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 900, color: '#fff', background: MUTE, borderRadius: '4px', padding: '1px 6px', marginTop: '2px' }}>Q{i + 1}</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, lineHeight: 1.6, fontFamily: SERIF }}>{x.q}</span>
                <PlayBtn text={x.q} size={22} />
            </div>
            {show ? (
                <>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 900, color: '#fff', background: GREEN, borderRadius: '4px', padding: '1px 6px', marginTop: '2px' }}>A</span>
                        <span style={{ flex: 1, fontSize: '14px', color: '#3F3A33', lineHeight: 1.75, fontFamily: SERIF }}>{x.a}</span>
                        <PlayBtn text={x.a} size={22} />
                    </div>
                    {x.note && <div style={{ marginTop: '6px', marginLeft: '30px', fontSize: '11.5px', color: DEEPGOLD, lineHeight: 1.6 }}>{x.note}</div>}
                </>
            ) : (
                <button onClick={() => setOpen(true)} style={{ marginLeft: '30px', background: 'none', border: `1px dashed ${GOLD}88`, borderRadius: '8px', padding: '6px 12px', color: DEEPGOLD, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    先に自分で4文言ってから、答えを見る
                </button>
            )}
        </div>
    );
}

// ===================== お題 =====================
function TopicsTab({ isMobile, topicId, setTopicId, done, toggleDone }: {
    isMobile: boolean; topicId: string; setTopicId: (id: string) => void; done: Set<string>; toggleDone: (id: string) => void;
}) {
    const t = SPEAK_TOPICS.find((x) => x.id === topicId) ?? SPEAK_TOPICS[0];
    const [showJa, setShowJa] = useState(false);
    const [hideAnswers, setHideAnswers] = useState(false);
    useEffect(() => { setShowJa(false); }, [topicId]);
    if (!t) return null;
    const hook = getHook(t.hookId);
    const paras = t.speech.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    const parasJa = t.speechJa.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    const isDone = done.has(t.id);

    return (
        <div>
            {/* お題の一覧 */}
            <SectionLabel>お題を選ぶ ・ {done.size}/{SPEAK_TOPICS.length} 言えた</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px' }}>
                {SPEAK_TOPICS.map((x) => {
                    const on = x.id === t.id;
                    return (
                        <button key={x.id} onClick={() => setTopicId(x.id)} style={{
                            textAlign: 'left', cursor: 'pointer', borderRadius: '10px', padding: '9px 11px',
                            border: on ? `1.5px solid ${GOLD}` : `1px solid ${LINE}`, background: on ? '#FFFBEB' : '#fff',
                            display: 'flex', gap: '8px', alignItems: 'flex-start',
                        }}>
                            <span style={{ flexShrink: 0, width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', background: done.has(x.id) ? GREEN : '#E7E2D4' }} />
                            <span style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'block', fontSize: '10px', color: MUTE, fontWeight: 700 }}>{x.category}</span>
                                <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: INK, lineHeight: 1.45, fontFamily: SERIF }}>{x.topic}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* お題カード */}
            <div style={{ marginTop: '18px', backgroundColor: '#FFFDF8', border: `1px solid ${GOLD}40`, borderRadius: '20px', boxShadow: '0 8px 30px rgba(212,175,55,0.08)', padding: isMobile ? '20px 18px' : '30px 34px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: GOLD, padding: '4px 11px', borderRadius: '99px', letterSpacing: '1px' }}>{t.category}</span>
                    <span style={{ fontSize: '11px', color: MUTE }}>{t.wordCount} words ・ 約2分</span>
                </div>
                <p style={{ margin: '14px 0 2px', fontSize: isMobile ? '17px' : '19px', fontWeight: 800, lineHeight: 1.45, fontFamily: SERIF }}>{t.topic}</p>
                <p style={{ margin: 0, fontSize: '12px', color: MUTE }}>{t.topicJa}</p>
                <div style={{ marginTop: '10px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: DEEPGREEN, background: '#ECFDF5', border: `1px solid ${GREEN}33`, padding: '4px 10px', borderRadius: '99px', display: 'inline-block', lineHeight: 1.5 }}>立場: {t.stance}</span>
                </div>

                {/* 1分メモ */}
                <div style={{ marginTop: '16px', background: '#fff', border: `1px dashed ${GOLD}88`, borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '6px' }}>準備1分で書くメモ (4行)</div>
                    <div style={{ fontSize: '12.5px', lineHeight: 1.8, color: '#44403C' }}>
                        <div>1. 実話: {hook ? hook.title : t.hookId}</div>
                        <div>2. 立場: {t.stance}</div>
                        {t.facts.slice(0, 2).map((f, i) => <div key={i}>{i + 3}. {f.label}</div>)}
                    </div>
                </div>

                {/* スピーチ */}
                <SectionLabel>スピーチ ・ 段落ごとに聞いて、言う</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {paras.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <PlayBtn text={p} />
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontFamily: SERIF, fontSize: isMobile ? '15.5px' : '17px', lineHeight: 1.85, ...(i === 0 ? { color: '#5B4A12' } : {}) }}>
                                    {i === 0 && <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '10px', fontWeight: 900, color: '#fff', background: GOLD, borderRadius: '4px', padding: '1px 6px', marginRight: '6px', verticalAlign: '2px' }}>実話</span>}
                                    {p}
                                </p>
                                {showJa && parasJa[i] && <p style={{ margin: '4px 0 0', fontSize: '12.5px', lineHeight: 1.8, color: SUB }}>{parasJa[i]}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowJa((v) => !v)} style={smallBtn}>{showJa ? '日本語をかくす' : '日本語を段落ごとに出す'}</button>
                    <button onClick={() => speak(t.speech.replace(/\n+/g, ' '))} style={smallBtn}>通しで聞く</button>
                    <button onClick={() => toggleDone(t.id)} style={{ ...smallBtn, background: isDone ? GREEN : INK, color: '#fff', border: 'none' }}>{isDone ? '言えた (完了)' : '何も見ずに言えた'}</button>
                </div>
                <div style={{ marginTop: '14px', fontSize: '12px', color: SUB, lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 800, color: DEEPGOLD }}>冗談を論点に変える1文: </span>
                    <span style={{ fontFamily: SERIF, color: INK }}>{t.pivot}</span>
                </div>
            </div>

            {/* 事実 */}
            <SectionLabel color={DEEPGREEN}>使った事実 ・ 固有名詞と年で言う</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {t.facts.map((f, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${LINE}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800 }}>{f.label}</div>
                        <div style={{ fontSize: '12px', color: SUB, marginTop: '2px', lineHeight: 1.65 }}>{f.detail}</div>
                    </div>
                ))}
            </div>

            {/* 崩れる場所 */}
            <SectionLabel color="#B45309">自分の口が崩れそうな所</SectionLabel>
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', overflow: 'hidden' }}>
                {t.traps.map((x, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1.2fr 1fr', gap: isMobile ? '2px' : '10px', padding: '10px 12px', borderTop: i ? `1px solid ${LINE}` : 'none', fontSize: '12.5px', lineHeight: 1.6 }}>
                        <span style={{ fontFamily: SERIF, fontWeight: 700 }}>{x.where}</span>
                        <span style={{ color: '#B45309' }}>{x.slip}</span>
                        <span style={{ color: DEEPGREEN, fontWeight: 700 }}>{x.right}</span>
                    </div>
                ))}
            </div>

            {/* Q&A */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <SectionLabel>質疑応答 ・ 4文で返す (結論 → 理由 → 例え → 締め)</SectionLabel>
                <button onClick={() => setHideAnswers((v) => !v)} style={{ ...smallBtn, padding: '5px 10px', fontSize: '11px', marginTop: '14px', flexShrink: 0 }}>{hideAnswers ? '答えを全部出す' : '答えを隠して練習'}</button>
            </div>
            <div key={`${t.id}-${hideAnswers}`} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {t.qa.map((x, i) => <QaCard key={i} x={x} i={i} hidden={hideAnswers} />)}
            </div>

            {/* 持ち歩く言い回し */}
            <SectionLabel>ほかのお題にも持っていける言い回し</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {t.lines.map((l, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <PlayBtn text={l.en} size={22} />
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: SERIF }}>{l.en}</div>
                            <div style={{ fontSize: '12px', color: SUB, marginTop: '2px', lineHeight: 1.6 }}>{l.ja}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const smallBtn: React.CSSProperties = {
    padding: '9px 14px', borderRadius: '10px', border: `1px solid ${LINE}`, background: '#fff',
    color: '#57534E', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer',
};

// ===================== 模擬試験 =====================
type Phase = 'idle' | 'choose' | 'prep' | 'speech' | 'qa' | 'end';

function MockTab({ isMobile, openTopic }: { isMobile: boolean; openTopic: (id: string) => void }) {
    const [phase, setPhase] = useState<Phase>('idle');
    const [cards, setCards] = useState<SpeakTopic[]>([]);
    const [chosen, setChosen] = useState<SpeakTopic | null>(null);
    const [left, setLeft] = useState(0);
    const [qs, setQs] = useState<SpeakAnswer[]>([]);
    const [qi, setQi] = useState(0);
    const [reveal, setReveal] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [recErr, setRecErr] = useState<string | null>(null);
    const recRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const topRef = useRef<HTMLDivElement | null>(null);

    // 段階が変わったら、箱の頭を画面に戻す (下のボタンを押したまま次の段階が画面外で始まらないように)
    useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [phase, qi]);

    // タイマー
    useEffect(() => {
        if (phase !== 'prep' && phase !== 'speech') return;
        if (left <= 0) {
            if (phase === 'prep') startSpeech();
            else finishSpeech();
            return;
        }
        const id = setTimeout(() => setLeft((s) => s - 1), 1000);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, left]);

    useEffect(() => () => { stopRec(); }, []);

    function stopRec() {
        const r = recRef.current;
        if (r && r.state !== 'inactive') r.stop();
        recRef.current = null;
    }

    async function startRec() {
        setRecErr(null);
        try {
            if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('unsupported');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const r = new MediaRecorder(stream);
            chunksRef.current = [];
            r.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
            r.onstop = () => {
                stream.getTracks().forEach((tr) => tr.stop());
                const blob = new Blob(chunksRef.current, { type: r.mimeType || 'audio/webm' });
                setAudioUrl(URL.createObjectURL(blob));
            };
            r.start();
            recRef.current = r;
        } catch {
            setRecErr('録音はできなかった (マイクの許可がない、またはこのブラウザが未対応)。声に出すのはそのまま続けていい');
        }
    }

    function draw() {
        setCards(shuffle(SPEAK_TOPICS).slice(0, Math.min(5, SPEAK_TOPICS.length)));
        setChosen(null); setAudioUrl(null); setRecErr(null); setPhase('choose');
    }
    function choose(t: SpeakTopic) { setChosen(t); setLeft(60); setPhase('prep'); }
    function startSpeech() { setLeft(120); setPhase('speech'); void startRec(); }
    function finishSpeech() {
        stopRec();
        if (!chosen) return;
        setQs(shuffle(chosen.qa).slice(0, 4)); setQi(0); setReveal(false); setPhase('qa');
    }
    function nextQ() {
        if (qi + 1 >= qs.length) { setPhase('end'); return; }
        setQi(qi + 1); setReveal(false);
    }

    const hook = chosen ? getHook(chosen.hookId) : undefined;
    const box: React.CSSProperties = { marginTop: '18px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: isMobile ? '20px 18px' : '28px 30px' };
    const bigBtn: React.CSSProperties = { padding: '14px 18px', borderRadius: '12px', border: 'none', background: INK, color: '#fff', fontSize: '14px', fontWeight: 900, cursor: 'pointer' };

    return (
        <div ref={topRef} style={{ scrollMarginTop: '72px' }}>
            {phase === 'idle' && (
                <div style={box}>
                    <div style={{ fontSize: '17px', fontWeight: 900 }}>本番と同じ順番で、1回通す</div>
                    <ol style={{ margin: '12px 0 0', paddingLeft: '20px', fontSize: '13px', color: '#44403C', lineHeight: 1.9 }}>
                        <li>お題が5枚出る。1枚選ぶ</li>
                        <li>準備1分。メモは4行 (実話 / 立場 / 事件2つ)</li>
                        <li>2分話す。マイクが使えれば録音される</li>
                        <li>試験官の質問が1問ずつ出る。4文で答えてから、模範を見る</li>
                        <li>最後に自分の録音を聞く</li>
                    </ol>
                    <button onClick={draw} style={{ ...bigBtn, marginTop: '18px', width: '100%' }}>カードを引く</button>
                </div>
            )}

            {phase === 'choose' && (
                <div style={box}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: GOLD, letterSpacing: '1.5px' }}>TOPIC CARD ・ 1つ選ぶ</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        {cards.map((c, i) => (
                            <button key={c.id} onClick={() => choose(c)} style={{ textAlign: 'left', cursor: 'pointer', background: '#FFFDF8', border: `1px solid ${GOLD}40`, borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '10px' }}>
                                <span style={{ fontWeight: 900, color: DEEPGOLD }}>{i + 1}.</span>
                                <span style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, lineHeight: 1.5, color: INK }}>{c.topic}</span>
                            </button>
                        ))}
                    </div>
                    <button onClick={draw} style={{ ...smallBtn, marginTop: '12px' }}>引き直す</button>
                </div>
            )}

            {(phase === 'prep' || phase === 'speech') && chosen && (
                <div style={box}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: phase === 'prep' ? DEEPGOLD : DEEPGREEN, letterSpacing: '1.5px' }}>{phase === 'prep' ? '準備 1分' : 'スピーチ 2分'}{phase === 'speech' && recRef.current ? ' ・ 録音中' : ''}</span>
                        <span style={{ fontFamily: SERIF, fontSize: '34px', fontWeight: 800, color: left <= 10 ? '#B91C1C' : INK }}>{fmt(left)}</span>
                    </div>
                    <div style={{ height: '5px', background: '#EFEBDF', borderRadius: '99px', overflow: 'hidden', marginTop: '6px' }}>
                        <div style={{ width: `${(left / (phase === 'prep' ? 60 : 120)) * 100}%`, height: '100%', background: phase === 'prep' ? GOLD : GREEN, transition: 'width 1s linear' }} />
                    </div>
                    <p style={{ margin: '16px 0 0', fontFamily: SERIF, fontSize: '18px', fontWeight: 800, lineHeight: 1.45 }}>{chosen.topic}</p>
                    {phase === 'prep' && (
                        <div style={{ marginTop: '14px', fontSize: '12.5px', color: '#44403C', lineHeight: 1.8 }}>
                            <div style={{ fontWeight: 800, color: DEEPGOLD, marginBottom: '4px' }}>使えそうな実話 (自分で決めていい)</div>
                            {hook && <div>{hook.title}</div>}
                            <div style={{ marginTop: '10px', fontWeight: 800, color: DEEPGOLD }}>型</div>
                            <div>実話 → 立場 → 理由1 (事件) → 理由2 (事件) → 実話に戻って締める</div>
                        </div>
                    )}
                    {recErr && <p style={{ marginTop: '12px', fontSize: '11.5px', color: '#B45309' }}>{recErr}</p>}
                    <button onClick={phase === 'prep' ? startSpeech : finishSpeech} style={{ ...bigBtn, marginTop: '18px', width: '100%' }}>
                        {phase === 'prep' ? '準備おわり、話し始める' : '話し終わった'}
                    </button>
                </div>
            )}

            {phase === 'qa' && chosen && qs[qi] && (
                <div style={box}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: GOLD, letterSpacing: '1.5px' }}>質疑応答 ・ {qi + 1} / {qs.length}</div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '12px' }}>
                        <PlayBtn text={qs[qi].q} size={28} />
                        <p style={{ margin: 0, fontFamily: SERIF, fontSize: '17px', fontWeight: 700, lineHeight: 1.5 }}>{qs[qi].q}</p>
                    </div>
                    <p style={{ fontSize: '11.5px', color: MUTE, margin: '10px 0 0' }}>声に出して4文で答えてから、模範を見る。</p>
                    {reveal ? (
                        <div style={{ marginTop: '12px', background: '#F0FDF4', border: `1px solid ${GREEN}33`, borderRadius: '12px', padding: '12px 14px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <p style={{ flex: 1, margin: 0, fontFamily: SERIF, fontSize: '14.5px', lineHeight: 1.75 }}>{qs[qi].a}</p>
                                <PlayBtn text={qs[qi].a} />
                            </div>
                            {qs[qi].note && <div style={{ marginTop: '6px', fontSize: '11.5px', color: DEEPGOLD }}>{qs[qi].note}</div>}
                        </div>
                    ) : (
                        <button onClick={() => setReveal(true)} style={{ ...smallBtn, marginTop: '12px' }}>模範を見る</button>
                    )}
                    <button onClick={nextQ} style={{ ...bigBtn, marginTop: '16px', width: '100%' }}>{qi + 1 >= qs.length ? '終わる' : '次の質問'}</button>
                </div>
            )}

            {phase === 'end' && chosen && (
                <div style={box}>
                    <div style={{ fontSize: '17px', fontWeight: 900 }}>おつかれ。録音を聞いて、崩れた所を1つだけ決める</div>
                    {audioUrl ? (
                        <audio controls src={audioUrl} style={{ width: '100%', marginTop: '14px' }} />
                    ) : (
                        <p style={{ fontSize: '12px', color: MUTE, marginTop: '10px' }}>今回は録音なし。</p>
                    )}
                    <div style={{ marginTop: '14px', fontSize: '12.5px', color: '#44403C', lineHeight: 1.8 }}>
                        <div style={{ fontWeight: 800, color: '#B45309' }}>このお題で崩れやすい所</div>
                        {chosen.traps.slice(0, 4).map((x, i) => <div key={i}>・{x.where} — {x.slip}</div>)}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '18px', flexWrap: 'wrap' }}>
                        <button onClick={() => openTopic(chosen.id)} style={{ ...smallBtn, flex: 1 }}>このお題の台本を見る</button>
                        <button onClick={draw} style={{ ...bigBtn, flex: 1 }}>もう1回引く</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ===================== 実話 =====================
function StoriesTab({ openTopic }: { openTopic: (id: string) => void }) {
    const used = useMemo(() => {
        const m = new Map<string, SpeakTopic[]>();
        for (const t of SPEAK_TOPICS) m.set(t.hookId, [...(m.get(t.hookId) ?? []), t]);
        return m;
    }, []);
    return (
        <div>
            <SectionLabel>どのお題にも持ち込める、自分の実話</SectionLabel>
            <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.75 }}>
                スピーチ本文は当たらなくても、実話は必ず使える。準備の1分で最初に決めるのは、どの実話で始めるか。最後の1文でもう一度その実話に戻る。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {STORY_BANK.map((h) => (
                    <div key={h.id} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900 }}>{h.title}</div>
                            <PlayBtn text={h.en} />
                        </div>
                        <p style={{ margin: '8px 0 0', fontFamily: SERIF, fontSize: '15px', lineHeight: 1.75 }}>{h.en}</p>
                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: SUB, lineHeight: 1.7 }}>{h.ja}</p>
                        <div style={{ marginTop: '8px', fontSize: '12px', lineHeight: 1.7 }}>
                            <span style={{ fontWeight: 800, color: DEEPGOLD }}>論点に変える1文: </span>
                            <span style={{ fontFamily: SERIF }}>{h.pivot}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                            {h.fits.map((f) => <span key={f} style={{ fontSize: '10.5px', color: DEEPGREEN, background: '#ECFDF5', borderRadius: '99px', padding: '2px 9px' }}>{f}</span>)}
                        </div>
                        {(used.get(h.id) ?? []).length > 0 && (
                            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {(used.get(h.id) ?? []).map((t) => (
                                    <button key={t.id} onClick={() => openTopic(t.id)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '12px', color: DEEPGOLD, fontFamily: SERIF }}>
                                        この実話で始めるお題: {t.topic}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== 戦略 =====================
function StrategyTab() {
    return (
        <div>
            <SectionLabel>面接の流れ (約10分)</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {EXAM_FLOW.map((f, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 900 }}>{i + 1}. {f.step}</span>
                            <span style={{ fontSize: '11.5px', fontWeight: 800, color: DEEPGOLD }}>{f.time}</span>
                        </div>
                        <div style={{ fontSize: '12.5px', color: SUB, marginTop: '4px', lineHeight: 1.65 }}>{f.what}</div>
                        <div style={{ fontSize: '12.5px', color: DEEPGREEN, marginTop: '4px', lineHeight: 1.65, fontWeight: 700 }}>{f.plan}</div>
                    </div>
                ))}
            </div>

            <SectionLabel>なぜ模範をなぞるのをやめたか</SectionLabel>
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px', fontSize: '13px', color: '#44403C', lineHeight: 1.85 }}>
                I firmly believe で始めて、two main reasons で分けて、For these reasons で締める。誰が言ってもいい答えは、試験官が1日に何十本も聞いている。人が見えない答えは記憶に残らない。
                それに、長くて抽象的な文は、自分の英語が一番崩れる形でもある。本番は5題から1つを選んで準備1分。30本を丸暗記しても当たらない。覚えるのは本文ではなく、どのお題にも持ち込める部品にする。
            </div>

            <SectionLabel>6つの原則</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PRINCIPLES.map((p, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 900 }}><span style={{ color: GOLD }}>{i + 1}.</span> {p.title}</div>
                        <div style={{ fontSize: '12.5px', color: SUB, marginTop: '4px', lineHeight: 1.75 }}>{p.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================== 切り返し =====================
function MovesTab() {
    return (
        <div>
            <SectionLabel>最初の自由会話 ・ 1本用意して、一度笑ってもらう</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {SMALL_TALK.map((x, i) => <QaCard key={i} x={x} i={i} hidden={false} />)}
            </div>

            <SectionLabel>時間稼ぎ・反論の受け方 ・ 場面ごとに1つだけ持つ</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {MOVES.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <PlayBtn text={m.en} size={22} />
                        <div>
                            <div style={{ fontSize: '10.5px', fontWeight: 800, color: DEEPGOLD }}>{m.when}</div>
                            <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: SERIF, marginTop: '1px' }}>{m.en}</div>
                            <div style={{ fontSize: '12px', color: SUB, marginTop: '2px' }}>{m.ja}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
