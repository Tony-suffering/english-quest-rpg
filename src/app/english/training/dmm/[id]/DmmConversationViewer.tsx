'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { DmmConversation, DmmTurn, DmmDiagnosis } from '@/lib/d1';
import { chunkSentences } from '@/lib/dmm-chunker';

type Mode = 'side' | 'original' | 'native';
const SENTENCES_PER_CHUNK = 3;

const BULK_REGISTER_EVENT = 'dmm-bulk-register';

function todayJstIso(): string {
    return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export default function DmmConversationViewer({ conversation }: { conversation: DmmConversation }) {
    const [mode, setMode] = useState<Mode>('side');
    const [hideOriginal, setHideOriginal] = useState(false);
    const [bulkBusy, setBulkBusy] = useState(false);
    const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);

    const studentCount = conversation.turns.filter(t => t.role === 'student').length;
    const teacherCount = conversation.turns.filter(t => t.role === 'teacher').length;
    const nativeCount = conversation.turns.filter(t => t.role === 'student' && t.native).length;
    // Read engaged primarily; fall back to legacy comedian field for v4 data.
    const engagedCount = conversation.turns.filter(t => t.role === 'student' && (t.engaged || t.comedian)).length;

    // Count how many chunks are currently visible (for confirm prompt + progress display)
    const visibleChunkCount = useMemo(() => {
        let n = 0;
        for (const t of conversation.turns) {
            const isStudent = t.role === 'student';
            const originalChunks = chunkSentences(t.original, SENTENCES_PER_CHUNK);
            const nativeText = t.native;
            const engagedText = t.engaged || t.comedian || '';
            const nativeChunks = nativeText ? chunkSentences(nativeText, SENTENCES_PER_CHUNK) : [];
            const engagedChunks = engagedText ? chunkSentences(engagedText, SENTENCES_PER_CHUNK) : [];
            // teacher original chunks render in side/original mode
            if (!isStudent && mode !== 'native') n += originalChunks.length;
            // student native chunks render in side/native mode
            if (isStudent && mode !== 'original') n += nativeChunks.length + engagedChunks.length;
        }
        return n;
    }, [conversation.turns, mode]);

    async function handleBulkRegister() {
        if (bulkBusy) return;
        if (!confirm(`表示中の ${visibleChunkCount} 個のチャンクを一度に登録します。\n(あとで /english/training から要らないものを削除できます)\n\n続行しますか？`)) return;
        setBulkBusy(true);
        setBulkProgress({ done: 0, total: visibleChunkCount });
        // dispatch -- each ChunkRow listens and self-registers
        window.dispatchEvent(new CustomEvent(BULK_REGISTER_EVENT, {
            detail: {
                onChunkDone: () => setBulkProgress(prev => prev ? { ...prev, done: prev.done + 1 } : null),
            },
        }));
        // release the button after ~3s; ChunkRows may still be finishing, but state is local to each row
        setTimeout(() => {
            setBulkBusy(false);
            setBulkProgress(null);
        }, Math.max(3000, visibleChunkCount * 80));
    }

    return (
        <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                {(['side', 'original', 'native'] as Mode[]).map(m => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{
                            padding: '8px 14px',
                            background: mode === m ? '#1c1917' : 'white',
                            color: mode === m ? 'white' : '#1c1917',
                            border: '1px solid #1c1917',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        {m === 'side' && '並列'}
                        {m === 'original' && '原文のみ'}
                        {m === 'native' && 'ネイティブ + コメディアンのみ'}
                    </button>
                ))}
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#57534e', marginLeft: 'auto', cursor: 'pointer' }}>
                    <input type="checkbox" checked={hideOriginal} onChange={e => setHideOriginal(e.target.checked)} />
                    トレーニングモード (生徒の原文を隠す)
                </label>
            </div>

            <div style={{
                display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
                marginBottom: 18,
                padding: '12px 14px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                border: '1px solid #fbbf24',
                borderRadius: 10,
            }}>
                <button
                    onClick={handleBulkRegister}
                    disabled={bulkBusy || visibleChunkCount === 0}
                    style={{
                        padding: '10px 18px',
                        background: bulkBusy ? '#a8a29e' : '#d4af37',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        cursor: bulkBusy ? 'wait' : 'pointer',
                        boxShadow: bulkBusy ? 'none' : '0 2px 4px rgba(212,175,55,0.3)',
                    }}
                >
                    {bulkBusy
                        ? bulkProgress ? `一括登録中… (${bulkProgress.done}/${bulkProgress.total})` : '一括登録中…'
                        : `+ 全部一度に登録 (${visibleChunkCount} 個)`}
                </button>
                <div style={{ fontSize: 11, color: '#78350f', lineHeight: 1.5 }}>
                    今表示中のチャンク全部を <strong>/english/training</strong> に登録。<br />
                    あとで一覧画面で要らないものを削除する運用。
                </div>
            </div>

            <div style={{ fontSize: 11, color: '#a8a29e', marginBottom: 16 }}>
                生徒 {studentCount} / 講師 {teacherCount} ・ NATIVE化 {nativeCount}/{studentCount} ・ ENGAGED化 {engagedCount}/{studentCount} ・ chunk = {SENTENCES_PER_CHUNK}文ずつ
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto 1fr',
                gap: 8,
                padding: '10px 14px',
                marginBottom: 16,
                background: '#fafaf9',
                border: '1px solid #e7e5e4',
                borderRadius: 8,
                fontSize: 11.5,
                lineHeight: 1.55,
                color: '#44403c',
            }}>
                <div style={{ background: '#10B981', color: 'white', padding: '2px 6px', borderRadius: 4, fontWeight: 700, alignSelf: 'start' }}>NATIVE</div>
                <div style={{ fontWeight: 600, color: '#065f46', whiteSpace: 'nowrap' }}>俺の表現の修正</div>
                <div>自然な native 口語 + 一言しゃれた表現。 明日の自分が言えるべきレベル。</div>

                <div style={{ background: '#8B5CF6', color: 'white', padding: '2px 6px', borderRadius: 4, fontWeight: 700, alignSelf: 'start' }}>ENGAGED</div>
                <div style={{ fontWeight: 600, color: '#5b21b6', whiteSpace: 'nowrap' }}>本物の会話の深さ</div>
                <div>punchline じゃない。 逆質問・vulnerability・具体的 observation・pushback。 本気で engaged な native conversationalist が同じトピックでどう返すか。</div>

                <div style={{ background: '#3B82F6', color: 'white', padding: '2px 6px', borderRadius: 4, fontWeight: 700, alignSelf: 'start' }}>TEACHER</div>
                <div style={{ fontWeight: 600, color: '#1e40af', whiteSpace: 'nowrap' }}>講師の native 表現</div>
                <div>講師は本物の native。 各 chunk をそのまま素材として登録 = pure native input。</div>
            </div>

            {conversation.diagnosis && <DiagnosisPanel diagnosis={conversation.diagnosis} conversationId={conversation.id} />}

            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
                {conversation.turns.map((t, i) => (
                    <TurnBubble
                        key={i}
                        conversationId={conversation.id}
                        turn={t}
                        index={i}
                        mode={mode}
                        hideOriginalStudent={hideOriginal}
                        endMinute={conversation.turns[i + 1]?.minute}
                    />
                ))}
            </ol>
        </>
    );
}

// ── 振り返りレポート: 脳内意図 ↔ 口から出た英語の乖離を分析 ──
// レポートの修正版 (短SVOチャンク / 文法 fix / 声帯ドリル) はそのまま
// /english/training に登録できる。1行ごと + 「全部登録」の両対応。
const DIAG_BULK_EVENT = 'dmm-diag-bulk-register';

function DiagnosisPanel({ diagnosis, conversationId }: { diagnosis: DmmDiagnosis; conversationId: string }) {
    const { divergences, grammar, nonnative, summary } = diagnosis;
    const cardHead: React.CSSProperties = { fontSize: 11, letterSpacing: 1, fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', marginBottom: 8 };

    // registerable items = 全乖離チャンク + 全文法fix + 全ドリル
    const total =
        (divergences?.reduce((a, d) => a + d.chunks.length, 0) ?? 0) +
        (grammar?.length ?? 0) +
        (nonnative?.length ?? 0);

    const [bulkBusy, setBulkBusy] = useState(false);
    const [bulkDone, setBulkDone] = useState(0);

    function handleDiagBulk() {
        if (bulkBusy || total === 0) return;
        if (!confirm(`振り返りレポートの修正版 ${total} 個を /english/training に登録します。\n(あとで一覧から要らないものを削除できます)\n\n続行しますか？`)) return;
        setBulkBusy(true);
        setBulkDone(0);
        window.dispatchEvent(new CustomEvent(DIAG_BULK_EVENT, {
            detail: { onChunkDone: () => setBulkDone(prev => prev + 1) },
        }));
        setTimeout(() => setBulkBusy(false), Math.max(3000, total * 120));
    }

    return (
        <section style={{
            marginBottom: 22,
            border: '1px solid #fecaca',
            borderRadius: 12,
            background: '#fff',
            overflow: 'hidden',
        }}>
            <div style={{
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecdd3 100%)',
                borderBottom: '1px solid #fecaca',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#7f1d1d', letterSpacing: 1 }}>振り返りレポート</div>
                    <div style={{ fontSize: 11, color: '#9f1239', marginTop: 2 }}>脳内の意図 ↔ 口から出た英語の乖離。短SVOで連射しろ。</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    {total > 0 && (
                        <button
                            onClick={handleDiagBulk}
                            disabled={bulkBusy}
                            title="このレポートの修正版を全部トレーニングに登録"
                            style={{
                                fontSize: 11, fontWeight: 700,
                                color: 'white', background: bulkBusy ? '#a8a29e' : '#dc2626',
                                border: 'none', borderRadius: 6, padding: '6px 11px',
                                cursor: bulkBusy ? 'wait' : 'pointer', whiteSpace: 'nowrap',
                            }}
                        >
                            {bulkBusy ? `登録中… (${bulkDone}/${total})` : `+ この振り返りを全部登録 (${total})`}
                        </button>
                    )}
                    <a href="/english/training/dmm/watchlist" style={{
                        fontSize: 11, fontWeight: 700, color: '#7f1d1d', textDecoration: 'none',
                        border: '1px solid #f43f5e', borderRadius: 6, padding: '5px 10px', whiteSpace: 'nowrap',
                    }}>
                        バグ図鑑（横断ウォッチ）→
                    </a>
                </div>
            </div>

            <div style={{ padding: '14px 16px', display: 'grid', gap: 18 }}>
                {summary && (
                    <div style={{ fontSize: 12.5, color: '#1c1917', lineHeight: 1.6, background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8, padding: '10px 12px' }}>
                        {summary}
                    </div>
                )}

                {/* 致命的乖離 + 短SVO処方 (チャンクをタップでトレーニング登録) */}
                {divergences && divergences.length > 0 && (
                    <div>
                        <div style={cardHead}>致命的乖離 — 思考をダウングレードして短SVO連射</div>
                        <div style={{ display: 'grid', gap: 10 }}>
                            {divergences.map((d, i) => (
                                <div key={i} style={{ border: '1px solid #e7e5e4', borderRadius: 8, padding: '10px 12px' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#78716c', marginBottom: 6 }}>{d.scene}</div>
                                    <div style={{ fontSize: 12, color: '#b91c1c', lineHeight: 1.55, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, marginRight: 6 }}>崩壊</span>“{d.output}”
                                    </div>
                                    <div style={{ fontSize: 12, color: '#57534e', lineHeight: 1.55, marginBottom: 8 }}>
                                        <span style={{ fontWeight: 700, marginRight: 6 }}>意図</span>{d.intent}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                                        {d.chunks.map((c, ci) => (
                                            <DiagChunkPill
                                                key={ci}
                                                english={c}
                                                japanese={d.intent}
                                                storageKey={`dmm-diag-reg:${conversationId}:div:${i}:${ci}`}
                                            />
                                        ))}
                                        <span style={{ fontSize: 10, color: '#a8a29e' }}>タップで登録</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 繰り返し文法バグ (fix をトレーニング登録) */}
                {grammar && grammar.length > 0 && (
                    <div>
                        <div style={cardHead}>繰り返し文法バグ（記録と照合・再発を追跡）</div>
                        <div style={{ display: 'grid', gap: 6 }}>
                            {grammar.map((g, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center', border: '1px solid #e7e5e4', borderRadius: 8, padding: '8px 12px' }}>
                                    <div style={{ display: 'grid', gap: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: '#1e40af', background: '#dbeafe', borderRadius: 4, padding: '2px 6px' }}>{g.bug}</span>
                                            {g.ref && <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', borderRadius: 4, padding: '2px 6px' }}>再発 {g.ref}</span>}
                                        </div>
                                        <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                                            <span style={{ color: '#b91c1c', textDecoration: 'line-through' }}>{g.output}</span>
                                            <span style={{ margin: '0 6px', color: '#a8a29e' }}>→</span>
                                            <span style={{ color: '#065f46', fontWeight: 600 }}>{g.fix}</span>
                                        </div>
                                    </div>
                                    <DiagTrainButton
                                        english={g.fix}
                                        japanese={g.output}
                                        accent="#1e40af"
                                        storageKey={`dmm-diag-reg:${conversationId}:gram:${i}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ネイティブらしくない癖 (声帯ドリルをトレーニング登録) */}
                {nonnative && nonnative.length > 0 && (
                    <div>
                        <div style={cardHead}>ネイティブらしくない癖（would 回避・over-hedge 等）</div>
                        <div style={{ display: 'grid', gap: 6 }}>
                            {nonnative.map((n, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center', border: '1px solid #e7e5e4', borderRadius: 8, padding: '8px 12px' }}>
                                    <div>
                                        <div style={{ fontSize: 12, color: '#78716c', lineHeight: 1.5, marginBottom: 3 }}>
                                            <span style={{ fontWeight: 700, marginRight: 6 }}>癖</span>{n.habit}
                                        </div>
                                        <div style={{ fontSize: 12.5, color: '#065f46', fontWeight: 600, lineHeight: 1.5, marginBottom: 3 }}>
                                            <span style={{ fontWeight: 700, marginRight: 6, color: '#5b21b6' }}>native</span>{n.native}
                                        </div>
                                        <div style={{ fontSize: 11.5, color: '#9f1239', lineHeight: 1.5 }}>
                                            <span style={{ fontWeight: 700, marginRight: 6 }}>声帯ドリル</span>{n.drill}
                                        </div>
                                    </div>
                                    <DiagTrainButton
                                        english={n.drill}
                                        japanese={n.habit}
                                        accent="#5b21b6"
                                        storageKey={`dmm-diag-reg:${conversationId}:non:${i}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

// 振り返りレポートの一項目を /api/phrases に登録するための共有ロジック。
// ChunkRow と同じ仕組み (localStorage で登録済みを記憶 + 一括登録イベントを購読)。
function useDiagRegister(english: string, japanese: string, storageKey: string) {
    const [registeredId, setRegisteredId] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) setRegisteredId(saved);
        } catch { /* ignore */ }
    }, [storageKey]);

    async function register(opts?: { onDone?: () => void }) {
        if (registeredId || busy) { opts?.onDone?.(); return; }
        setBusy(true);
        setError(null);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese: japanese || '', date: todayJstIso() }),
            });
            const data = await res.json();
            if (data.success && data.phrase?.id) {
                setRegisteredId(data.phrase.id);
                try { localStorage.setItem(storageKey, data.phrase.id); } catch { /* ignore */ }
            } else {
                setError(data.error || 'register failed');
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setBusy(false);
            opts?.onDone?.();
        }
    }

    const registerRef = useRef<(opts?: { onDone?: () => void }) => void>(() => {});
    registerRef.current = register;

    useEffect(() => {
        const handler = (e: Event) => {
            const onChunkDone = (e as CustomEvent).detail?.onChunkDone as (() => void) | undefined;
            const jitter = Math.floor(Math.random() * 280);
            window.setTimeout(() => registerRef.current({ onDone: onChunkDone }), jitter);
        };
        window.addEventListener(DIAG_BULK_EVENT, handler);
        return () => window.removeEventListener(DIAG_BULK_EVENT, handler);
    }, []);

    return { registeredId, busy, error, register };
}

// 短SVOチャンク: pill 自体がトレーニング登録ボタン
function DiagChunkPill({ english, japanese, storageKey }: { english: string; japanese: string; storageKey: string }) {
    const { registeredId, busy, register } = useDiagRegister(english, japanese, storageKey);
    return (
        <button
            onClick={() => register()}
            disabled={!!registeredId || busy}
            title={registeredId ? '登録済み' : 'タップでトレーニングに登録'}
            style={{
                fontSize: 12, fontWeight: 600,
                color: registeredId ? '#525252' : '#065f46',
                background: registeredId ? '#e7e5e4' : '#d1fae5',
                border: `1px solid ${registeredId ? '#d6d3d1' : '#6ee7b7'}`,
                borderRadius: 6, padding: '4px 9px',
                cursor: registeredId ? 'default' : busy ? 'wait' : 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 5,
            }}
        >
            <span>{english}</span>
            <span style={{ fontSize: 10, fontWeight: 800, opacity: 0.8 }}>{registeredId ? '✓' : busy ? '…' : '+'}</span>
        </button>
    );
}

// 文法fix / 声帯ドリル用の「+ 登録」ボタン
function DiagTrainButton({ english, japanese, storageKey, accent }: { english: string; japanese: string; storageKey: string; accent: string }) {
    const { registeredId, busy, error, register } = useDiagRegister(english, japanese, storageKey);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 3, minWidth: 96 }}>
            <button
                onClick={() => register()}
                disabled={!!registeredId || busy}
                style={{
                    padding: '6px 10px',
                    background: registeredId ? '#d4d4d4' : 'white',
                    color: registeredId ? '#525252' : accent,
                    border: `1px solid ${accent}`,
                    borderRadius: 6, fontSize: 11, fontWeight: 700,
                    cursor: registeredId ? 'default' : busy ? 'wait' : 'pointer',
                    whiteSpace: 'nowrap',
                }}
            >
                {registeredId ? '✓ 登録済' : busy ? '送信中…' : '+ 登録'}
            </button>
            {error && <div style={{ fontSize: 10, color: '#dc2626', maxWidth: 96, lineHeight: 1.3 }}>{error}</div>}
        </div>
    );
}

// 分小数 (6.68) → "6:41"。整数はそのまま「N分」表記にする側で分岐。
function fmtStamp(m: number): string {
    const mm = Math.floor(m);
    const ss = Math.round((m - mm) * 60);
    return `${mm}:${String(ss).padStart(2, '0')}`;
}

function TurnBubble({
    conversationId, turn, index, mode, hideOriginalStudent, endMinute,
}: {
    conversationId: string;
    turn: DmmTurn;
    index: number;
    mode: Mode;
    hideOriginalStudent: boolean;
    endMinute?: number;
}) {
    const [revealed, setRevealed] = useState(false);
    const isStudent = turn.role === 'student';

    const originalChunks = useMemo(() => chunkSentences(turn.original, SENTENCES_PER_CHUNK), [turn.original]);
    const nativeChunks = useMemo(() => turn.native ? chunkSentences(turn.native, SENTENCES_PER_CHUNK) : [], [turn.native]);
    // Prefer engaged; fall back to legacy comedian field for v4 data
    const engagedSource = turn.engaged || turn.comedian || '';
    const engagedChunks = useMemo(() => engagedSource ? chunkSentences(engagedSource, SENTENCES_PER_CHUNK) : [], [engagedSource]);

    const showOriginal = mode !== 'native' && (!isStudent || !hideOriginalStudent || revealed);
    const showNative = mode !== 'original' && isStudent && nativeChunks.length > 0;
    const showEngaged = mode !== 'original' && isStudent && engagedChunks.length > 0;

    return (
        <li style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 44, fontSize: 11, color: '#a8a29e', textAlign: 'right', paddingTop: 4 }}>
                #{index + 1}
                {turn.minute != null && (
                    <div style={{ color: '#57534e' }}>
                        {Number.isInteger(turn.minute) && endMinute == null
                            ? `${turn.minute}分`
                            : fmtStamp(turn.minute) + (endMinute != null ? `–${fmtStamp(endMinute)}` : '')}
                        {isStudent && endMinute != null && (
                            <div style={{ color: '#b45309', fontWeight: 700, letterSpacing: '0.5px' }}>REC</div>
                        )}
                    </div>
                )}
            </div>
            <div
                style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: isStudent ? '#fef3c7' : 'white',
                    border: isStudent ? '1px solid #fde68a' : '1px solid #e7e5e4',
                    fontSize: 14,
                    lineHeight: 1.65,
                }}
            >
                <div style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: 600, color: '#78716c', textTransform: 'uppercase', marginBottom: 6 }}>
                    {isStudent ? '生徒 (とにお)' : '講師'}
                </div>

                {showOriginal && isStudent && (
                    originalChunks.length > 1 ? (
                        <div style={{ display: 'grid', gap: 6 }}>
                            {originalChunks.map((c, ci) => (
                                <div key={ci} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.5)', borderRadius: 6, color: '#1c1917' }}>
                                    <span style={{ fontSize: 10, color: '#a8a29e', marginRight: 6 }}>{ci + 1}/{originalChunks.length}</span>
                                    {c}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ whiteSpace: 'pre-wrap', color: '#1c1917' }}>{turn.original}</div>
                    )
                )}

                {showOriginal && !isStudent && (
                    <div style={{ display: 'grid', gap: 8 }}>
                        {originalChunks.map((c, ci) => (
                            <ChunkRow
                                key={`t-${ci}`}
                                variant="teacher"
                                conversationId={conversationId}
                                turnIndex={index}
                                chunkIndex={ci}
                                chunkCount={originalChunks.length}
                                text={c}
                                original=""
                            />
                        ))}
                    </div>
                )}

                {isStudent && hideOriginalStudent && !revealed && mode !== 'native' && (
                    <button
                        onClick={() => setRevealed(true)}
                        style={{
                            padding: '8px 14px',
                            background: 'rgba(0,0,0,0.05)',
                            border: '1px dashed #d6d3d1',
                            borderRadius: 8,
                            fontSize: 12,
                            color: '#78716c',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                        }}
                    >
                        [tap to reveal your original line]
                    </button>
                )}

                {showNative && (
                    <div
                        style={{
                            marginTop: showOriginal ? 10 : 0,
                            paddingTop: showOriginal ? 10 : 0,
                            borderTop: showOriginal ? '1px dashed rgba(0,0,0,0.12)' : 'none',
                        }}
                    >
                        <div style={{ display: 'grid', gap: 8 }}>
                            {nativeChunks.map((nc, ci) => (
                                <ChunkRow
                                    key={`n-${ci}`}
                                    variant="native"
                                    conversationId={conversationId}
                                    turnIndex={index}
                                    chunkIndex={ci}
                                    chunkCount={nativeChunks.length}
                                    text={nc}
                                    original={originalChunks[ci] || originalChunks[originalChunks.length - 1] || ''}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {showEngaged && (
                    <div
                        style={{
                            marginTop: (showOriginal || showNative) ? 10 : 0,
                            paddingTop: (showOriginal || showNative) ? 10 : 0,
                            borderTop: (showOriginal || showNative) ? '1px dashed rgba(0,0,0,0.12)' : 'none',
                        }}
                    >
                        <div style={{ display: 'grid', gap: 8 }}>
                            {engagedChunks.map((ec, ci) => (
                                <ChunkRow
                                    key={`e-${ci}`}
                                    variant="engaged"
                                    conversationId={conversationId}
                                    turnIndex={index}
                                    chunkIndex={ci}
                                    chunkCount={engagedChunks.length}
                                    text={ec}
                                    original={originalChunks[ci] || originalChunks[originalChunks.length - 1] || ''}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {isStudent && !turn.native && !turn.engaged && !turn.comedian && mode !== 'original' && (
                    <div style={{ marginTop: 8, fontSize: 11, color: '#a8a29e', fontStyle: 'italic' }}>
                        ネイティブ版未登録
                    </div>
                )}

                {turn.spice && (
                    <div style={{
                        marginTop: 10,
                        display: 'flex', gap: 8, alignItems: 'flex-start',
                        padding: '8px 10px',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: 8,
                    }}>
                        <span style={{
                            flexShrink: 0, fontSize: 9, fontWeight: 800, letterSpacing: 1,
                            color: 'white', background: '#d4af37',
                            padding: '2px 6px', borderRadius: 4, marginTop: 1,
                        }}>ツッコミ</span>
                        <span style={{ fontSize: 12.5, color: '#78350f', lineHeight: 1.6 }}>{turn.spice}</span>
                    </div>
                )}
            </div>
        </li>
    );
}

function ChunkRow({
    variant, conversationId, turnIndex, chunkIndex, chunkCount, text, original,
}: {
    variant: 'native' | 'engaged' | 'teacher';
    conversationId: string;
    turnIndex: number;
    chunkIndex: number;
    chunkCount: number;
    text: string;
    original: string;
}) {
    const storageKey = `dmm-chunk-reg:${conversationId}:${turnIndex}:${variant}:${chunkIndex}`;
    const [registeredId, setRegisteredId] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) setRegisteredId(saved);
        } catch { /* ignore */ }
    }, [storageKey]);

    async function register(opts?: { onDone?: () => void }) {
        if (registeredId || busy) {
            opts?.onDone?.();
            return;
        }
        setBusy(true);
        setError(null);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: text,
                    japanese: original || '',
                    date: todayJstIso(),
                }),
            });
            const data = await res.json();
            if (data.success && data.phrase?.id) {
                setRegisteredId(data.phrase.id);
                try { localStorage.setItem(storageKey, data.phrase.id); } catch { /* ignore */ }
            } else {
                setError(data.error || 'register failed');
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setBusy(false);
            opts?.onDone?.();
        }
    }

    // Use ref so the listener always sees latest closure (text/original/state)
    const registerRef = useRef<(opts?: { onDone?: () => void }) => void>(() => {});
    registerRef.current = register;

    // Listen for bulk-register broadcast
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            const onChunkDone = detail?.onChunkDone as (() => void) | undefined;
            // Stagger requests by a tiny per-chunk delay so we don't slam the API
            const jitter = Math.floor(Math.random() * 200) + chunkIndex * 60;
            window.setTimeout(() => {
                registerRef.current({ onDone: onChunkDone });
            }, jitter);
        };
        window.addEventListener('dmm-bulk-register', handler);
        return () => window.removeEventListener('dmm-bulk-register', handler);
    }, [chunkIndex]);

    const styleByVariant =
        variant === 'native'  ? { bg: '#d1fae5', border: '#6ee7b7', text: '#065f46', label: 'NATIVE',  labelBg: '#10B981', labelHint: '俺の表現の修正' }
      : variant === 'engaged' ? { bg: '#ede9fe', border: '#c4b5fd', text: '#5b21b6', label: 'ENGAGED', labelBg: '#8B5CF6', labelHint: '本物の会話の深さ' }
      :                         { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af', label: 'TEACHER', labelBg: '#3B82F6', labelHint: '講師の native 表現' };

    return (
        <div
            style={{
                padding: '10px 12px',
                background: styleByVariant.bg,
                border: `1px solid ${styleByVariant.border}`,
                borderRadius: 8,
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
            }}
        >
            <div style={{ flex: 1, color: styleByVariant.text, fontWeight: 500 }}>
                <div style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: 700, marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ background: styleByVariant.labelBg, color: 'white', padding: '2px 6px', borderRadius: 4 }}>{styleByVariant.label}</span>
                        <span style={{ fontWeight: 600, opacity: 0.85 }}>{styleByVariant.labelHint}</span>
                    </span>
                    <span style={{ opacity: 0.7 }}>chunk {chunkIndex + 1}/{chunkCount}</span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 4, minWidth: 110 }}>
                <button
                    onClick={() => register()}
                    disabled={!!registeredId || busy}
                    style={{
                        padding: '6px 10px',
                        background: registeredId ? '#d4d4d4' : busy ? '#a8a29e' : 'white',
                        color: registeredId ? '#525252' : styleByVariant.text,
                        border: `1px solid ${styleByVariant.labelBg}`,
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: registeredId ? 'default' : busy ? 'wait' : 'pointer',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {registeredId ? '✓ 登録済' : busy ? '送信中…' : '+ トレーニング登録'}
                </button>
                {error && <div style={{ fontSize: 10, color: '#dc2626', maxWidth: 110, lineHeight: 1.3 }}>{error}</div>}
            </div>
        </div>
    );
}
