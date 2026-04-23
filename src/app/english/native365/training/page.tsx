'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Native365Item } from '@/types/native365';
import { NATIVE365_DAYS } from '@/data/english/native365';

// ─── Theme ───────────────────────────────────────────────
const C = {
    gold: '#D4AF37', goldDim: '#B8971F', goldBg: '#FFFBEB',
    green: '#10B981', greenDim: '#059669', greenBg: '#ECFDF5',
    blue: '#3B82F6', blueDim: '#1D4ED8', blueBg: '#EFF6FF',
    red: '#EF4444', redDim: '#B91C1C', redBg: '#FEF2F2',
    amber: '#F59E0B', amberDim: '#B45309', amberBg: '#FEF3C7',
    purple: '#8B5CF6', purpleDim: '#6D28D9',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

// ─── Styles ──────────────────────────────────────────────
const STYLES = `
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ringTick {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: 283; }
}
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
}
@keyframes chunkPop {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes celebrate {
    0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
    50% { transform: scale(1.15) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0); opacity: 1; }
}
`;

// ─── SRS (SM-2 simplified) ──────────────────────────────
type Rating = 'fail' | 'hard' | 'good' | 'easy';
type SrsState = {
    ease: number;
    interval: number;  // days
    nextDue: string;   // ISO
    reps: number;
    lastRated: string; // ISO
    ratings: Rating[];
};

const SRS_KEY = 'native365_srs';
const CHUNKS_KEY = 'native365_chunks';
const STATS_KEY = 'native365_stats';

function loadSrs(): Record<string, SrsState> {
    try {
        const raw = localStorage.getItem(SRS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveSrs(s: Record<string, SrsState>) { localStorage.setItem(SRS_KEY, JSON.stringify(s)); }

function loadChunks(): Record<string, { seen: number; lastUsed: string }> {
    try {
        const raw = localStorage.getItem(CHUNKS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}
function saveChunks(c: Record<string, { seen: number; lastUsed: string }>) {
    localStorage.setItem(CHUNKS_KEY, JSON.stringify(c));
}

function loadRegisteredItems(): Record<string, string> {
    try {
        const raw = localStorage.getItem(STATS_KEY);
        if (!raw) return {};
        return JSON.parse(raw).registeredItems ?? {};
    } catch { return {}; }
}

function nowIso(): string { return new Date().toISOString(); }

function updateSrs(prev: SrsState | undefined, rating: Rating): SrsState {
    const now = Date.now();
    const base: SrsState = prev ?? {
        ease: 2.5, interval: 0, nextDue: nowIso(), reps: 0, lastRated: nowIso(), ratings: [],
    };
    const next: SrsState = { ...base, reps: base.reps + 1, lastRated: nowIso(), ratings: [...base.ratings, rating].slice(-10) };

    // Interval in minutes (converted from days for sub-day precision)
    let minutes: number;
    switch (rating) {
        case 'fail':
            next.ease = Math.max(1.3, base.ease - 0.2);
            minutes = 1; // show again within same session (~1 min)
            break;
        case 'hard':
            next.ease = Math.max(1.3, base.ease - 0.15);
            minutes = 10;
            break;
        case 'good':
            minutes = Math.max(60 * 24, base.interval * base.ease * 60 * 24);
            break;
        case 'easy':
            next.ease = Math.min(2.8, base.ease + 0.15);
            minutes = Math.max(60 * 24 * 3, base.interval * base.ease * 1.3 * 60 * 24);
            break;
    }
    next.interval = minutes / (60 * 24);
    next.nextDue = new Date(now + minutes * 60 * 1000).toISOString();
    return next;
}

// ─── Scene/Emotion detection from native.ja ──────────────
type SceneCue = { emoji: string; category: string; color: string };

function detectScene(ja: string): SceneCue {
    // Emotion detection via keyword sweep
    if (/やば|マジ|あ[ーっ]|あぁ|ちょ[、。]?\s*気をつけ/.test(ja)) return { emoji: '😱', category: '焦り', color: C.red };
    if (/ごめん|悪い|すまん|謝|失敗|すっかり忘れ/.test(ja)) return { emoji: '😅', category: '謝罪', color: C.amber };
    if (/ありがと|感謝|嬉しい|助かっ/.test(ja)) return { emoji: '🙏', category: '感謝', color: C.green };
    if (/疲れ|眠|帰[っる]|寝る|もう/.test(ja) && /なんて一日|即寝|一日/.test(ja)) return { emoji: '😮‍💨', category: '疲労', color: C.textDim };
    if (/してくれる\?|もらえる\?|お願い|頼む|手伝っ/.test(ja)) return { emoji: '🙇', category: '頼み事', color: C.blue };
    if (/会え|会う|一緒|どう\?|ランチ|コーヒー|飲み|ラーメン/.test(ja)) return { emoji: '🤝', category: '誘い', color: C.purple };
    if (/正直|本音|思う|実は|ぶっちゃけ/.test(ja)) return { emoji: '💭', category: '本音', color: C.blueDim };
    if (/信じ|マジで\?|聞いたことある|本当に/.test(ja)) return { emoji: '🤨', category: '驚き', color: C.amber };
    if (/よかった|嬉し|最高|良い|いい/.test(ja)) return { emoji: '😊', category: 'ポジ', color: C.green };
    if (/いつ|どこ|何|どうやっ|なぜ|誰/.test(ja)) return { emoji: '❓', category: '質問', color: C.blue };
    if (/もし|だったら|ならば|〜れば|してれば/.test(ja)) return { emoji: '🤔', category: '仮定', color: C.purple };
    if (/気にしない|しょうがない|まあ/.test(ja)) return { emoji: '🤷', category: '諦め', color: C.textDim };
    if (/やめ|辞め|ストップ|ダメ/.test(ja)) return { emoji: '🛑', category: '制止', color: C.red };
    return { emoji: '💬', category: '日常会話', color: C.textSub };
}

// Split native sentence into visual chunks for reveal
function splitChunks(en: string): string[] {
    // Split on common boundaries: em-dashes, commas before clauses, coordinating conjunctions
    const parts = en
        .replace(/—/g, ' — ')
        .split(/(\s—\s|\s--\s|,\s(?=and |but |or |so |because |while |since |'cause ))/g)
        .filter(Boolean)
        .filter(p => !/^,\s$/.test(p));

    // Further split long parts
    const out: string[] = [];
    for (const p of parts) {
        if (p.trim().length < 28) { out.push(p.trim()); continue; }
        // Split on specific small phrase boundaries
        const sub = p.split(/\s+(?=I'm |you're |we're |they're |it's |that's |I've |you've |we've |they've |I'll |you'll |we'll )/);
        if (sub.length > 1) { sub.forEach(s => out.push(s.trim())); }
        else out.push(p.trim());
    }
    return out.filter(s => s.length > 0);
}

// TTS
function speak(text: string, rate = 0.95) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/—|--/g, ' ').replace(/\s+/g, ' ');
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-US';
    u.rate = rate;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
}

// ─── Item pool builder ───────────────────────────────────
type PoolItem = { item: Native365Item; dayNum: number; section: 'pronunciation' | 'grammar' };

function buildPool(registered: Record<string, string>): PoolItem[] {
    const out: PoolItem[] = [];
    const registeredIds = Object.keys(registered);
    for (const idStr of registeredIds) {
        // id format: dN-p-NN-topic or dN-g-NN-topic
        const m = /^d(\d+)-([pg])-/.exec(idStr);
        if (!m) continue;
        const dayNum = parseInt(m[1], 10);
        const section = m[2] === 'p' ? 'pronunciation' : 'grammar';
        const day = NATIVE365_DAYS[dayNum];
        if (!day) continue;
        const item = day[section].items.find(it => it.id === idStr);
        if (!item) continue;
        out.push({ item, dayNum, section });
    }
    return out;
}

function getDueItems(pool: PoolItem[], srs: Record<string, SrsState>): PoolItem[] {
    const now = Date.now();
    return pool.filter(p => {
        const s = srs[p.item.id];
        if (!s) return true; // new items always due
        return new Date(s.nextDue).getTime() <= now;
    });
}

// ─── Keyboard hook ───────────────────────────────────────
function useKey(map: Record<string, () => void>, deps: unknown[]) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const fn = map[e.key] || map[e.code];
            if (fn) { e.preventDefault(); fn(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

// ─── Main Page ───────────────────────────────────────────
type Screen = 'landing' | 'training' | 'complete';
type Stage = 'prompt' | 'reveal';

export default function TrainingPage() {
    const [screen, setScreen] = useState<Screen>('landing');
    const [pool, setPool] = useState<PoolItem[]>([]);
    const [srs, setSrs] = useState<Record<string, SrsState>>({});
    const [session, setSession] = useState<PoolItem[]>([]);
    const [index, setIndex] = useState(0);
    const [stage, setStage] = useState<Stage>('prompt');
    const [sessionRatings, setSessionRatings] = useState<Record<string, Rating>>({});
    const [countdown, setCountdown] = useState(3);
    const [mounted, setMounted] = useState(false);
    const countdownRef = useRef<number | null>(null);

    useEffect(() => {
        setMounted(true);
        const reg = loadRegisteredItems();
        const p = buildPool(reg);
        setPool(p);
        setSrs(loadSrs());
    }, []);

    const dueItems = useMemo(() => getDueItems(pool, srs), [pool, srs]);
    const masteredCount = useMemo(() =>
        Object.values(srs).filter(s => s.ratings.slice(-3).every(r => r === 'good' || r === 'easy')).length
    , [srs]);

    // Countdown for prompt stage
    useEffect(() => {
        if (screen !== 'training' || stage !== 'prompt') return;
        setCountdown(3);
        countdownRef.current = window.setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    if (countdownRef.current) window.clearInterval(countdownRef.current);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
        return () => {
            if (countdownRef.current) window.clearInterval(countdownRef.current);
        };
    }, [screen, stage, index]);

    const startSession = useCallback((limit?: number) => {
        const deck = [...dueItems];
        // Shuffle for variety
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        const sized = limit ? deck.slice(0, limit) : deck;
        if (sized.length === 0) return;
        setSession(sized);
        setIndex(0);
        setStage('prompt');
        setSessionRatings({});
        setScreen('training');
    }, [dueItems]);

    const reveal = useCallback(() => {
        if (countdownRef.current) window.clearInterval(countdownRef.current);
        setStage('reveal');
    }, []);

    const rate = useCallback((rating: Rating) => {
        const cur = session[index];
        if (!cur) return;

        // Update SRS
        const newSrs = { ...srs, [cur.item.id]: updateSrs(srs[cur.item.id], rating) };
        setSrs(newSrs);
        saveSrs(newSrs);

        // Track chunks on success
        if (rating === 'good' || rating === 'easy') {
            const chunks = loadChunks();
            const now = nowIso();
            splitChunks(cur.item.points.native.en).forEach(chunk => {
                const key = chunk.toLowerCase();
                chunks[key] = { seen: (chunks[key]?.seen ?? 0) + 1, lastUsed: now };
            });
            saveChunks(chunks);
        }

        setSessionRatings(prev => ({ ...prev, [cur.item.id]: rating }));

        // Re-queue if failed
        if (rating === 'fail') {
            const reQueued = [...session];
            // Add back at position +3 (give it distance)
            const reInsert = Math.min(index + 3, reQueued.length);
            reQueued.splice(reInsert, 0, cur);
            setSession(reQueued);
        }

        // Advance
        setTimeout(() => {
            if (index + 1 >= session.length) {
                setScreen('complete');
            } else {
                setIndex(i => i + 1);
                setStage('prompt');
            }
        }, 400);
    }, [session, index, srs]);

    // Keyboard: space/enter reveal, 1-4 rate, esc back
    useKey({
        ' ': () => { if (screen === 'training' && stage === 'prompt') reveal(); },
        'Enter': () => { if (screen === 'training' && stage === 'prompt') reveal(); },
        '1': () => { if (screen === 'training' && stage === 'reveal') rate('fail'); },
        '2': () => { if (screen === 'training' && stage === 'reveal') rate('hard'); },
        '3': () => { if (screen === 'training' && stage === 'reveal') rate('good'); },
        '4': () => { if (screen === 'training' && stage === 'reveal') rate('easy'); },
        'r': () => { if (screen === 'training' && stage === 'reveal' && session[index]) speak(session[index].item.points.native.en); },
        'R': () => { if (screen === 'training' && stage === 'reveal' && session[index]) speak(session[index].item.points.native.en); },
    }, [screen, stage, index, session, reveal, rate]);

    if (!mounted) return null;

    // ─── Render ──────────────────────────────────────────
    return (
        <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 60 }}>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />

            {screen === 'landing' && (
                <LandingScreen
                    poolCount={pool.length}
                    dueCount={dueItems.length}
                    masteredCount={masteredCount}
                    onStart={startSession}
                />
            )}

            {screen === 'training' && session[index] && (
                <TrainingScreen
                    pool={session}
                    index={index}
                    stage={stage}
                    countdown={countdown}
                    onReveal={reveal}
                    onRate={rate}
                />
            )}

            {screen === 'complete' && (
                <CompleteScreen
                    ratings={sessionRatings}
                    total={Object.keys(sessionRatings).length}
                    onContinue={() => {
                        const reg = loadRegisteredItems();
                        setPool(buildPool(reg));
                        setSrs(loadSrs());
                        setScreen('landing');
                    }}
                />
            )}
        </div>
    );
}

// ─── Landing ─────────────────────────────────────────────
function LandingScreen({
    poolCount, dueCount, masteredCount, onStart,
}: {
    poolCount: number; dueCount: number; masteredCount: number;
    onStart: (limit?: number) => void;
}) {
    return (
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px' }}>
            <Link href="/english/native365" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: C.textDim, textDecoration: 'none', marginBottom: 20,
            }}>
                ← Native365 に戻る
            </Link>

            <div style={{
                background: '#fff', border: `1px solid ${C.border}`,
                borderRadius: 20, padding: '32px 24px',
                animation: 'fadeUp 0.4s ease-out',
            }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, fontWeight: 800, marginBottom: 8 }}>
                    TRIGGER TRAINING
                </div>
                <h1 style={{
                    fontSize: 28, fontWeight: 900, color: C.textPrimary,
                    margin: '0 0 10px', letterSpacing: '-0.02em',
                }}>
                    状況 → 英語、日本語を経由しない反射
                </h1>
                <p style={{ fontSize: 13, color: C.textSub, margin: '0 0 28px', lineHeight: 1.7 }}>
                    翻訳の神経回路は、翻訳するほど強くなる。トリガー訓練は、場面と感情から英語チャンクへ直接跳ぶ回路を作る。
                </p>

                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
                    marginBottom: 28,
                }}>
                    <StatCell label="登録済み" value={poolCount} color={C.textDim} />
                    <StatCell label="今日出題" value={dueCount} color={C.gold} highlight={dueCount > 0} />
                    <StatCell label="マスター" value={masteredCount} color={C.green} />
                </div>

                {poolCount > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <button
                            onClick={() => onStart(10)}
                            disabled={dueCount === 0}
                            style={{
                                padding: '16px 20px',
                                background: dueCount === 0 ? '#ddd' : `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`,
                                color: '#fff', border: 'none', borderRadius: 14,
                                fontSize: 15, fontWeight: 900, letterSpacing: 1,
                                cursor: dueCount === 0 ? 'not-allowed' : 'pointer',
                                boxShadow: dueCount === 0 ? 'none' : `0 4px 16px ${C.gold}40`,
                                transition: 'all 0.2s',
                            }}
                        >
                            {dueCount === 0 ? '今日はもうない (明日また来て)' : `今日のセッション開始 (${Math.min(10, dueCount)}問)`}
                        </button>
                        {dueCount > 10 && (
                            <button
                                onClick={() => onStart()}
                                style={{
                                    padding: '12px 20px',
                                    background: '#fff', color: C.goldDim,
                                    border: `1.5px solid ${C.gold}60`, borderRadius: 14,
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                }}
                            >
                                全件訓練 ({dueCount}問)
                            </button>
                        )}
                    </div>
                ) : (
                    <EmptyState />
                )}

                {/* Flow explainer */}
                <div style={{
                    marginTop: 28, paddingTop: 20,
                    borderTop: `1px solid ${C.bg}`,
                    display: 'flex', flexDirection: 'column', gap: 8,
                    fontSize: 12, color: C.textSub, lineHeight: 1.7,
                }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 700, marginBottom: 4 }}>
                        訓練の流れ
                    </div>
                    <div>① 場面と感情が出る (日本語訳は見えない)</div>
                    <div>② 3秒のカウントダウン中に英語を声に出す</div>
                    <div>③ 英文が chunk 分解で表示、TTSで答え合わせ</div>
                    <div>④ 自己採点 → SRS (間隔反復) で明日以降の出題調整</div>
                </div>

                {/* Keyboard hints */}
                <div style={{
                    marginTop: 16, padding: '10px 14px',
                    background: C.bg, borderRadius: 10,
                    display: 'flex', gap: 10, flexWrap: 'wrap',
                    fontSize: 10, color: C.textDim,
                }}>
                    <span><kbd style={kbdStyle}>Space</kbd> reveal</span>
                    <span><kbd style={kbdStyle}>1-4</kbd> rate</span>
                    <span><kbd style={kbdStyle}>R</kbd> 音再生</span>
                </div>
            </div>
        </div>
    );
}

const kbdStyle: React.CSSProperties = {
    padding: '1px 6px',
    background: '#fff', border: `1px solid ${C.border}`,
    borderRadius: 4, fontFamily: 'monospace', fontSize: 10,
    fontWeight: 700, color: C.textSub,
};

function StatCell({ label, value, color, highlight }: { label: string; value: number; color: string; highlight?: boolean }) {
    return (
        <div style={{
            background: highlight ? `${color}10` : C.bg,
            border: `1px solid ${highlight ? color + '40' : C.border}`,
            borderRadius: 12, padding: '12px 8px',
            textAlign: 'center',
            animation: highlight ? 'pulse 2.5s ease-in-out infinite' : undefined,
        }}>
            <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 9, letterSpacing: 1.5, color: C.textFaint, fontWeight: 700, marginTop: 4 }}>
                {label}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div style={{
            padding: '24px 20px', textAlign: 'center',
            background: C.bg, border: `1px dashed ${C.border}`, borderRadius: 14,
        }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🎯</div>
            <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 700, marginBottom: 6 }}>
                訓練デッキがまだ空
            </div>
            <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.6, marginBottom: 14 }}>
                Day画面で各項目の「+ TRAINING に追加」ボタンを押すと、ここに出題プールとして蓄積される。
            </div>
            <Link href="/english/native365" style={{
                display: 'inline-block', padding: '10px 16px',
                background: C.gold, color: '#fff',
                borderRadius: 10, textDecoration: 'none',
                fontSize: 12, fontWeight: 800, letterSpacing: 1,
            }}>
                Native365 へ戻る →
            </Link>
        </div>
    );
}

// ─── Training Screen ─────────────────────────────────────
function TrainingScreen({
    pool, index, stage, countdown, onReveal, onRate,
}: {
    pool: PoolItem[]; index: number; stage: Stage; countdown: number;
    onReveal: () => void; onRate: (r: Rating) => void;
}) {
    const cur = pool[index];
    const scene = useMemo(() => detectScene(cur.item.points.native.ja), [cur]);
    const chunks = useMemo(() => splitChunks(cur.item.points.native.en), [cur]);
    const progress = ((index + 1) / pool.length) * 100;

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            maxWidth: 680, margin: '0 auto', padding: '20px 20px 40px',
        }}>
            {/* Progress bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 24, gap: 16,
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: 9, letterSpacing: 2, color: C.textFaint, fontWeight: 700, marginBottom: 4,
                    }}>
                        {index + 1} / {pool.length}
                    </div>
                    <div style={{
                        height: 4, background: C.bg, borderRadius: 999, overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${progress}%`, height: '100%',
                            background: `linear-gradient(90deg, ${C.gold}, ${C.green})`,
                            transition: 'width 0.3s ease-out',
                        }} />
                    </div>
                </div>
                <Link href="/english/native365/training" style={{
                    fontSize: 11, color: C.textDim, textDecoration: 'none',
                    padding: '6px 10px', borderRadius: 6,
                    border: `1px solid ${C.border}`,
                }}>
                    終了
                </Link>
            </div>

            {stage === 'prompt' && (
                <PromptCard scene={scene} countdown={countdown} onReveal={onReveal} />
            )}

            {stage === 'reveal' && (
                <RevealCard
                    scene={scene}
                    en={cur.item.points.native.en}
                    ja={cur.item.points.native.ja}
                    chunks={chunks}
                    dayNum={cur.dayNum}
                    label={cur.item.label}
                    onRate={onRate}
                />
            )}
        </div>
    );
}

// ─── Prompt Card ─────────────────────────────────────────
function PromptCard({
    scene, countdown, onReveal,
}: { scene: SceneCue; countdown: number; onReveal: () => void }) {
    return (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            animation: 'slideIn 0.35s ease-out',
        }}>
            <div style={{
                background: '#fff', border: `2px solid ${scene.color}30`,
                borderRadius: 24, padding: '40px 28px',
                width: '100%', maxWidth: 520,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                boxShadow: `0 10px 40px ${scene.color}20`,
            }}>
                <div style={{
                    fontSize: 11, letterSpacing: 3, color: C.textFaint, fontWeight: 800, marginBottom: 24,
                }}>
                    SITUATION
                </div>

                {/* Huge emoji */}
                <div style={{
                    fontSize: 96, lineHeight: 1, marginBottom: 20,
                    animation: 'pulse 2.5s ease-in-out infinite',
                }}>
                    {scene.emoji}
                </div>

                {/* Category */}
                <div style={{
                    background: `${scene.color}15`,
                    color: scene.color,
                    padding: '8px 18px', borderRadius: 999,
                    fontSize: 16, fontWeight: 800, letterSpacing: 1,
                    marginBottom: 32,
                    border: `1.5px solid ${scene.color}40`,
                }}>
                    {scene.category}
                </div>

                {/* Countdown ring */}
                <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 24 }}>
                    <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="45" fill="none" stroke={C.bg} strokeWidth="4" />
                        <circle
                            cx="50" cy="50" r="45" fill="none"
                            stroke={countdown > 1 ? C.gold : C.red}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={283}
                            strokeDashoffset={283 - (countdown / 3) * 283}
                            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                        />
                    </svg>
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 36, fontWeight: 900, color: countdown > 1 ? C.textPrimary : C.red,
                    }}>
                        {countdown}
                    </div>
                </div>

                <div style={{
                    fontSize: 13, color: C.textSub, textAlign: 'center', lineHeight: 1.6, marginBottom: 20,
                }}>
                    この場面、英語で一言。<br />
                    考えずに、口から出せ。
                </div>

                <button
                    onClick={onReveal}
                    style={{
                        padding: '14px 32px',
                        background: C.textPrimary, color: '#fff',
                        border: 'none', borderRadius: 999,
                        fontSize: 13, fontWeight: 900, letterSpacing: 2,
                        cursor: 'pointer', minWidth: 200,
                    }}
                >
                    吐いた → 答え合わせ
                </button>
            </div>

            <div style={{ marginTop: 14, fontSize: 10, color: C.textFaint, letterSpacing: 1 }}>
                <kbd style={kbdStyle}>Space</kbd> で答え合わせ
            </div>
        </div>
    );
}

// ─── Reveal Card ─────────────────────────────────────────
function RevealCard({
    scene, en, ja, chunks, dayNum, label, onRate,
}: {
    scene: SceneCue; en: string; ja: string; chunks: string[];
    dayNum: number; label: string; onRate: (r: Rating) => void;
}) {
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        // Auto-play on reveal
        setPlaying(true);
        speak(en);
        const t = setTimeout(() => setPlaying(false), 4000);
        return () => clearTimeout(t);
    }, [en]);

    const chunkColors = [C.gold, C.green, C.blue, C.purple, C.amber];

    return (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.35s ease-out',
        }}>
            {/* Scene thumbnail (small) */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 14,
            }}>
                <span style={{ fontSize: 28 }}>{scene.emoji}</span>
                <div>
                    <div style={{
                        fontSize: 10, letterSpacing: 2, color: scene.color, fontWeight: 800,
                    }}>
                        {scene.category}
                    </div>
                    <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: 1 }}>
                        DAY {dayNum} / {label}
                    </div>
                </div>
            </div>

            {/* English with chunks */}
            <div style={{
                background: '#fff', border: `1.5px solid ${C.gold}40`,
                borderRadius: 16, padding: '20px 18px',
                marginBottom: 14,
            }}>
                <div style={{
                    fontSize: 10, letterSpacing: 2, color: C.goldDim, fontWeight: 800, marginBottom: 12,
                }}>
                    NATIVE
                </div>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '6px 4px',
                    fontSize: 18, fontWeight: 700, color: C.textPrimary, lineHeight: 1.7,
                    marginBottom: 14,
                }}>
                    {chunks.map((c, i) => (
                        <span
                            key={i}
                            style={{
                                padding: '3px 8px',
                                background: `${chunkColors[i % chunkColors.length]}12`,
                                color: chunkColors[i % chunkColors.length],
                                borderRadius: 6,
                                animation: `chunkPop 0.3s ease-out ${i * 0.05}s both`,
                            }}
                        >
                            {c}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => { setPlaying(true); speak(en); setTimeout(() => setPlaying(false), 4000); }}
                    style={{
                        padding: '8px 14px',
                        background: playing ? C.goldBg : '#fff',
                        color: playing ? C.goldDim : C.textSub,
                        border: `1px solid ${playing ? C.gold + '60' : C.border}`,
                        borderRadius: 999,
                        fontSize: 11, fontWeight: 700, letterSpacing: 1,
                        cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                >
                    {playing ? '♪ 再生中' : '▶ もう一度聞く'}
                </button>
            </div>

            {/* Japanese (supportive, below) */}
            <div style={{
                background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: '12px 14px',
                marginBottom: 20,
            }}>
                <div style={{
                    fontSize: 9, letterSpacing: 2, color: C.textFaint, fontWeight: 700, marginBottom: 4,
                }}>
                    JA
                </div>
                <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.6 }}>
                    {ja}
                </div>
            </div>

            {/* Rating buttons */}
            <div style={{
                fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 700,
                textAlign: 'center', marginBottom: 10,
            }}>
                自己採点 — どれくらい出た?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <RateButton
                    label="出なかった" sub="即再出題" color={C.red}
                    keyLabel="1"
                    onClick={() => onRate('fail')}
                />
                <RateButton
                    label="詰まった" sub="10分後" color={C.amber}
                    keyLabel="2"
                    onClick={() => onRate('hard')}
                />
                <RateButton
                    label="ほぼ出た" sub="明日" color={C.green}
                    keyLabel="3"
                    onClick={() => onRate('good')}
                />
                <RateButton
                    label="完璧に発火" sub="3日後" color={C.gold}
                    keyLabel="4"
                    onClick={() => onRate('easy')}
                />
            </div>
        </div>
    );
}

function RateButton({
    label, sub, color, keyLabel, onClick,
}: { label: string; sub: string; color: string; keyLabel: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '16px 14px',
                background: '#fff',
                border: `2px solid ${color}40`,
                borderRadius: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                position: 'relative',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `${color}08`;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
        >
            <div style={{
                position: 'absolute', top: 8, right: 10,
                fontSize: 9, color: color, fontWeight: 800,
                background: `${color}15`, padding: '1px 5px', borderRadius: 4,
                fontFamily: 'monospace',
            }}>
                {keyLabel}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: color, marginBottom: 3 }}>
                {label}
            </div>
            <div style={{ fontSize: 10, color: C.textDim, letterSpacing: 0.5 }}>
                {sub}
            </div>
        </button>
    );
}

// ─── Complete Screen ─────────────────────────────────────
function CompleteScreen({
    ratings, total, onContinue,
}: { ratings: Record<string, Rating>; total: number; onContinue: () => void }) {
    const counts = {
        fail: Object.values(ratings).filter(r => r === 'fail').length,
        hard: Object.values(ratings).filter(r => r === 'hard').length,
        good: Object.values(ratings).filter(r => r === 'good').length,
        easy: Object.values(ratings).filter(r => r === 'easy').length,
    };

    return (
        <div style={{
            maxWidth: 560, margin: '0 auto', padding: '60px 20px',
            textAlign: 'center',
        }}>
            <div style={{
                fontSize: 80, marginBottom: 16,
                animation: 'celebrate 0.6s ease-out',
            }}>
                🎯
            </div>
            <h1 style={{
                fontSize: 26, fontWeight: 900, color: C.textPrimary,
                margin: '0 0 8px', letterSpacing: '-0.02em',
            }}>
                セッション完了
            </h1>
            <p style={{
                fontSize: 13, color: C.textSub, margin: '0 0 32px',
            }}>
                {total}問、お疲れさん。明日また戻ってきて。
            </p>

            <div style={{
                background: '#fff', border: `1px solid ${C.border}`,
                borderRadius: 16, padding: '20px 18px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                marginBottom: 28,
            }}>
                <ResultCell label="完璧" value={counts.easy} color={C.gold} />
                <ResultCell label="ほぼ出た" value={counts.good} color={C.green} />
                <ResultCell label="詰まった" value={counts.hard} color={C.amber} />
                <ResultCell label="出なかった" value={counts.fail} color={C.red} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                    onClick={onContinue}
                    style={{
                        padding: '14px 24px',
                        background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`,
                        color: '#fff', border: 'none', borderRadius: 12,
                        fontSize: 13, fontWeight: 900, letterSpacing: 1.5,
                        cursor: 'pointer',
                        boxShadow: `0 4px 16px ${C.gold}40`,
                    }}
                >
                    続ける
                </button>
                <Link href="/english/native365" style={{
                    padding: '12px 24px',
                    color: C.textDim,
                    textDecoration: 'none',
                    fontSize: 12, fontWeight: 700,
                    textAlign: 'center',
                }}>
                    Native365 に戻る
                </Link>
            </div>
        </div>
    );
}

function ResultCell({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div style={{
            background: `${color}08`, border: `1px solid ${color}30`,
            borderRadius: 10, padding: '10px 12px',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 10, color: C.textSub, marginTop: 3 }}>{label}</div>
        </div>
    );
}
