'use client';

/**
 * /english/pp -- PlayPhrase 専用カード作業台
 *
 * PP (PlayPhrase) のネイティブクリップを「文章 + 音声」セットで一括管理するページ。
 * 既存の training システムを壊さず、その上に乗るビュー:
 *   - 文章: D1 phrases.transcript (training の +TEXT と共有)
 *   - 音声: IndexedDB training-audio-clips (training の +CLIP と共有)
 *   - 両方 phrase.id で紐付く
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { NATIVE_PHRASES, NATIVE_PHRASE_TAGS } from '@/data/english/native365/native-phrases';

// ═══════════════════════════════════════════════════════════
// IndexedDB helpers (training-audio-clips と共有)
// ═══════════════════════════════════════════════════════════
const CLIP_DB_NAME = 'training-audio-clips';
const CLIP_STORE = 'clips';

function openClipDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(CLIP_DB_NAME, 1);
        req.onupgradeneeded = () => {
            if (!req.result.objectStoreNames.contains(CLIP_STORE)) {
                req.result.createObjectStore(CLIP_STORE);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
async function saveClip(phraseId: string, blob: Blob): Promise<void> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readwrite');
        tx.objectStore(CLIP_STORE).put(blob, phraseId);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}
async function loadClip(phraseId: string): Promise<Blob | null> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readonly');
        const req = tx.objectStore(CLIP_STORE).get(phraseId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}
async function loadAllClipIds(): Promise<Set<string>> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readonly');
        const req = tx.objectStore(CLIP_STORE).getAllKeys();
        req.onsuccess = () => resolve(new Set(req.result.map(k => String(k))));
        req.onerror = () => reject(req.error);
    });
}
async function deleteClipBlob(phraseId: string): Promise<void> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readwrite');
        tx.objectStore(CLIP_STORE).delete(phraseId);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// ═══════════════════════════════════════════════════════════
// Types + constants
// ═══════════════════════════════════════════════════════════
interface TrainingPhrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
    transcript?: string | null;
    created_at?: string;
}

const REPS_PER_MASTER = 5;
const SHADOW_REPS_KEY = 'pp_shadow_reps';

type FilterMode = 'all' | 'complete' | 'needs-clip' | 'needs-text';
type SortMode = 'recent' | 'oldest' | 'shortest' | 'longest' | 'random';

const C = {
    gold: '#D4AF37', goldDim: '#B8971F', goldBg: '#FFFBEB',
    green: '#10B981', greenDim: '#059669', greenBg: '#ECFDF5',
    blue: '#3B82F6', blueDim: '#1D4ED8', blueBg: '#EFF6FF',
    purple: '#8B5CF6', purpleDim: '#6D28D9',
    orange: '#F97316', orangeDim: '#C2410C', orangeBg: '#FFF7ED',
    red: '#EF4444', redBg: '#FEF2F2',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

// ═══════════════════════════════════════════════════════════
// Local storage helpers
// ═══════════════════════════════════════════════════════════
function loadRepsMap(): Record<string, number> {
    try {
        const raw = localStorage.getItem(SHADOW_REPS_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return {};
}
function saveRepsMap(m: Record<string, number>) {
    localStorage.setItem(SHADOW_REPS_KEY, JSON.stringify(m));
}

// ═══════════════════════════════════════════════════════════
// Audio player hook
// ═══════════════════════════════════════════════════════════
function useClipPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const urlRef = useRef<string | null>(null);
    const loopRef = useRef(false);

    const stop = useCallback(() => {
        audioRef.current?.pause();
        if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
        audioRef.current = null;
        loopRef.current = false;
    }, []);

    const play = useCallback(async (phraseId: string, rate: number, onEach?: () => void) => {
        stop();
        const blob = await loadClip(phraseId);
        if (!blob) return false;
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        const a = new Audio(url);
        a.playbackRate = rate;
        audioRef.current = a;
        a.onended = () => {
            onEach?.();
            if (!loopRef.current) stop();
        };
        a.play().catch(() => {});
        return true;
    }, [stop]);

    const loop = useCallback(async (phraseId: string, times: number, onEach?: () => void, onDone?: () => void) => {
        stop();
        const blob = await loadClip(phraseId);
        if (!blob) return;
        loopRef.current = true;
        let i = 0;
        const run = () => {
            if (!loopRef.current || i >= times) { stop(); onDone?.(); return; }
            const url = URL.createObjectURL(blob);
            urlRef.current = url;
            const a = new Audio(url);
            a.playbackRate = 0.95;
            audioRef.current = a;
            a.onended = () => {
                i++; onEach?.();
                URL.revokeObjectURL(url);
                if (i < times && loopRef.current) setTimeout(run, 700);
                else { stop(); onDone?.(); }
            };
            a.play().catch(() => { stop(); onDone?.(); });
        };
        run();
    }, [stop]);

    return { play, loop, stop };
}

// ═══════════════════════════════════════════════════════════
// D1 API helpers
// ═══════════════════════════════════════════════════════════
async function apiAddPhrase(english: string, date: string): Promise<TrainingPhrase> {
    const res = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ english, japanese: '', date }),
    });
    if (!res.ok) throw new Error(`POST /api/phrases ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('addPhrase failed');
    return data.phrase as TrainingPhrase;
}

async function apiPatchTranscript(id: string, transcript: string | null): Promise<void> {
    await fetch(`/api/phrases/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
    });
}

// ═══════════════════════════════════════════════════════════
// Card status helpers
// ═══════════════════════════════════════════════════════════
type CardStatus = 'complete' | 'needs-text' | 'needs-clip' | 'orphan';

function getStatus(phrase: TrainingPhrase, hasClip: boolean): CardStatus {
    const hasText = !!phrase.transcript;
    if (hasText && hasClip) return 'complete';
    if (hasClip && !hasText) return 'needs-text';
    if (hasText && !hasClip) return 'needs-clip';
    return 'orphan';
}

// ═══════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════
export default function PPStudioPage() {
    const [allPhrases, setAllPhrases] = useState<TrainingPhrase[]>([]);
    const [clipIds, setClipIds] = useState<Set<string>>(new Set());
    const [reps, setReps] = useState<Record<string, number>>({});
    const [filter, setFilter] = useState<FilterMode>('all');
    const [sortMode, setSortMode] = useState<SortMode>('recent');
    const [search, setSearch] = useState('');
    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState(0);
    const [cleaning, setCleaning] = useState(false);
    const [cleanProgress, setCleanProgress] = useState(0);
    const [toast, setToast] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [editSaving, setEditSaving] = useState(false);
    const [sessionQueue, setSessionQueue] = useState<string[]>([]);
    const [sessionIdx, setSessionIdx] = useState(0);
    const [sessionActive, setSessionActive] = useState(false);
    const player = useClipPlayer();
    const sessionPlayingRef = useRef(false);

    const fetchPhrases = useCallback(async () => {
        try {
            const res = await fetch('/api/phrases');
            const data = await res.json();
            if (data.success) setAllPhrases(data.phrases || []);
        } catch {}
    }, []);

    useEffect(() => {
        fetchPhrases();
        loadAllClipIds().then(setClipIds).catch(() => {});
        setReps(loadRepsMap());
    }, [fetchPhrases]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    // ─── PP visible phrases: must have BOTH clip AND transcript ───
    // 片方しか無いカードは training 本体の +TEXT / +CLIP で補完する想定
    const ppPhrases = useMemo(() =>
        allPhrases.filter(p => clipIds.has(p.id) && !!p.transcript),
        [allPhrases, clipIds]
    );

    // ─── Bulk import: shipped 68 ───
    const handleBulkImport = useCallback(async () => {
        if (importing) return;
        setImporting(true);
        setImportProgress(0);
        try {
            const existing = new Set(allPhrases.map(p => p.english.trim().toLowerCase()));
            const today = new Date().toISOString().slice(0, 10);
            let added = 0;
            let done = 0;
            for (const np of NATIVE_PHRASES) {
                done++;
                setImportProgress(Math.round(done / NATIVE_PHRASES.length * 100));
                const sentence = np.transcript.replace(/\s+/g, ' ').trim();
                const key = sentence.toLowerCase();
                if (existing.has(key)) continue;
                try {
                    const res = await fetch(np.file);
                    if (!res.ok) continue;
                    const blob = await res.blob();
                    const p = await apiAddPhrase(sentence, today);
                    await saveClip(p.id, blob);
                    await apiPatchTranscript(p.id, sentence);
                    existing.add(key);
                    added++;
                } catch (e) { console.warn('skip', np.slug, e); }
            }
            setClipIds(await loadAllClipIds());
            await fetchPhrases();
            showToast(`${added} 件インポートしました`);
        } finally {
            setImporting(false);
            setImportProgress(0);
        }
    }, [importing, allPhrases, fetchPhrases]);

    // ─── Cleanup: delete the initial-68 bulk import from D1 + IndexedDB ───
    // マッチ条件: english または transcript が NATIVE_PHRASES[].transcript と一致
    // （＝ファイル名復元の切れ端。句読点なし、途中で終わる不完全な文）
    const handleCleanupNativeImports = useCallback(async () => {
        if (cleaning) return;
        const nativeSet = new Set(
            NATIVE_PHRASES.map(np => np.transcript.replace(/\s+/g, ' ').trim().toLowerCase())
        );
        const targets = allPhrases.filter(p => {
            const e = (p.english ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
            const t = (p.transcript ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
            return nativeSet.has(e) || (t && nativeSet.has(t));
        });
        if (targets.length === 0) { showToast('初期インポート該当なし'); return; }
        if (!confirm(`初期インポート ${targets.length} 件を削除します（D1 + IndexedDB）。よろしい?`)) return;
        setCleaning(true);
        setCleanProgress(0);
        let done = 0;
        for (const p of targets) {
            try {
                await fetch(`/api/phrases/${p.id}`, { method: 'DELETE' });
            } catch {}
            try { await deleteClipBlob(p.id); } catch {}
            done++;
            setCleanProgress(Math.round(done / targets.length * 100));
        }
        const removedIds = new Set(targets.map(t => t.id));
        setAllPhrases(prev => prev.filter(p => !removedIds.has(p.id)));
        setClipIds(prev => {
            const next = new Set(prev);
            for (const id of removedIds) next.delete(id);
            return next;
        });
        setCleaning(false);
        setCleanProgress(0);
        showToast(`${targets.length} 件を削除しました`);
    }, [cleaning, allPhrases]);

    // ─── Edit transcript inline ───
    const startEdit = useCallback((id: string, current: string) => {
        setEditingId(id); setEditValue(current);
    }, []);
    const cancelEdit = useCallback(() => {
        setEditingId(null); setEditValue('');
    }, []);
    const saveEdit = useCallback(async () => {
        if (!editingId || editSaving) return;
        const value = editValue.trim();
        setEditSaving(true);
        try {
            await apiPatchTranscript(editingId, value || null);
            setAllPhrases(prev => prev.map(p =>
                p.id === editingId ? { ...p, transcript: value || null } : p
            ));
            setEditingId(null); setEditValue('');
            showToast('保存しました');
        } catch {
            showToast('保存に失敗しました');
        } finally {
            setEditSaving(false);
        }
    }, [editingId, editValue, editSaving]);

    // ─── Shadow reps ───
    const bumpRep = useCallback((id: string) => {
        setReps(prev => {
            const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
            saveRepsMap(next);
            return next;
        });
    }, []);

    // ─── Delete card (removes from D1 + IndexedDB) ───
    const handleDelete = useCallback(async (id: string) => {
        if (!confirm('このカードを削除しますか？（training からも消えます）')) return;
        try {
            await fetch(`/api/phrases/${id}`, { method: 'DELETE' });
        } catch {}
        await deleteClipBlob(id);
        setClipIds(prev => { const next = new Set(prev); next.delete(id); return next; });
        setAllPhrases(prev => prev.filter(p => p.id !== id));
        showToast('削除しました');
    }, []);

    // ─── Stats ───
    const stats = useMemo(() => {
        const s = { complete: 0, needsText: 0, needsClip: 0, mastered: 0, totalReps: 0 };
        for (const p of ppPhrases) {
            const status = getStatus(p, clipIds.has(p.id));
            if (status === 'complete') s.complete++;
            else if (status === 'needs-text') s.needsText++;
            else if (status === 'needs-clip') s.needsClip++;
            if ((reps[p.id] ?? 0) >= REPS_PER_MASTER) s.mastered++;
        }
        s.totalReps = Object.values(reps).reduce((a, b) => a + b, 0);
        return s;
    }, [ppPhrases, clipIds, reps]);

    // ─── Filter + sort + search ───
    const visible = useMemo(() => {
        const q = search.trim().toLowerCase();
        let list = ppPhrases.filter(p => {
            const status = getStatus(p, clipIds.has(p.id));
            if (filter === 'complete' && status !== 'complete') return false;
            if (filter === 'needs-text' && status !== 'needs-text') return false;
            if (filter === 'needs-clip' && status !== 'needs-clip') return false;
            if (q) {
                const hay = ((p.transcript ?? '') + ' ' + p.english).toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
        // Sort
        list = [...list];
        if (sortMode === 'recent') list.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''));
        else if (sortMode === 'oldest') list.sort((a, b) => (a.created_at ?? '').localeCompare(b.created_at ?? ''));
        else if (sortMode === 'shortest') list.sort((a, b) => (a.transcript ?? a.english).length - (b.transcript ?? b.english).length);
        else if (sortMode === 'longest') list.sort((a, b) => (b.transcript ?? b.english).length - (a.transcript ?? a.english).length);
        else if (sortMode === 'random') list.sort(() => Math.random() - 0.5);
        return list;
    }, [ppPhrases, clipIds, filter, search, sortMode]);

    // ═══ Session (auto-shadow queue) ══════════════════════════
    const currentSessionPhrase = sessionActive && sessionQueue[sessionIdx]
        ? ppPhrases.find(p => p.id === sessionQueue[sessionIdx]) ?? null
        : null;

    const startSession = (mode: 'all-complete' | 'random-10') => {
        const eligible = ppPhrases.filter(p => clipIds.has(p.id) && !!p.transcript);
        if (eligible.length === 0) { showToast('完成カードがありません'); return; }
        let queue: TrainingPhrase[];
        if (mode === 'random-10') {
            queue = [...eligible].sort(() => Math.random() - 0.5).slice(0, 10);
        } else {
            queue = eligible;
        }
        setSessionQueue(queue.map(p => p.id));
        setSessionIdx(0);
        setSessionActive(true);
    };
    const stopSession = () => {
        setSessionActive(false);
        setSessionQueue([]);
        setSessionIdx(0);
        player.stop();
        sessionPlayingRef.current = false;
    };
    const sessionLoop = useCallback(() => {
        if (!sessionActive || sessionPlayingRef.current) return;
        const id = sessionQueue[sessionIdx];
        if (!id) return;
        sessionPlayingRef.current = true;
        player.loop(id, REPS_PER_MASTER, () => bumpRep(id), () => {
            sessionPlayingRef.current = false;
            setSessionIdx(i => {
                if (i + 1 >= sessionQueue.length) {
                    setSessionActive(false);
                    showToast('セッション完了');
                    return 0;
                }
                return i + 1;
            });
        });
    }, [sessionActive, sessionQueue, sessionIdx, player, bumpRep]);
    useEffect(() => {
        if (sessionActive && sessionQueue.length > 0 && !sessionPlayingRef.current) {
            sessionLoop();
        }
    }, [sessionActive, sessionIdx, sessionQueue, sessionLoop]);

    // ─── Tag lookup (from shipped manifest) ───
    const tagColor = (id: string) => NATIVE_PHRASE_TAGS.find(t => t.id === id)?.color ?? C.textFaint;
    const tagLabel = (id: string) => NATIVE_PHRASE_TAGS.find(t => t.id === id)?.label ?? id;

    return (
        <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 80 }}>
            {toast && (
                <div style={{
                    position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
                    background: '#1C1917', color: '#fff',
                    padding: '10px 20px', borderRadius: 10,
                    fontSize: 13, fontWeight: 700, zIndex: 2000,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}>
                    {toast}
                </div>
            )}

            {/* ═══ Session overlay ═══ */}
            {sessionActive && currentSessionPhrase && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1500,
                    background: 'rgba(12, 11, 9, 0.96)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '40px 20px',
                }}>
                    <div style={{
                        fontSize: 11, color: C.goldDim, fontWeight: 800, letterSpacing: 3, marginBottom: 8,
                    }}>
                        SHADOW SESSION
                    </div>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginBottom: 24 }}>
                        {sessionIdx + 1} / {sessionQueue.length}
                    </div>
                    <div style={{
                        maxWidth: 680, padding: '24px 32px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        borderRadius: 16, marginBottom: 32,
                    }}>
                        <div style={{
                            fontSize: 22, fontWeight: 600, color: '#fff',
                            lineHeight: 1.6, textAlign: 'center',
                        }}>
                            {currentSessionPhrase.transcript || currentSessionPhrase.english}
                        </div>
                    </div>
                    <div style={{
                        display: 'flex', gap: 3, marginBottom: 24,
                    }}>
                        {Array.from({ length: REPS_PER_MASTER }, (_, i) => (
                            <div key={i} style={{
                                width: 24, height: 4, borderRadius: 2,
                                background: i < (reps[currentSessionPhrase.id] ?? 0) % (REPS_PER_MASTER + 1)
                                    ? C.gold : 'rgba(255,255,255,0.15)',
                                transition: 'background 0.3s',
                            }} />
                        ))}
                    </div>
                    <button onClick={stopSession} style={{
                        padding: '10px 24px', background: 'transparent',
                        color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: 8, fontSize: 12, fontWeight: 700, letterSpacing: 1,
                        cursor: 'pointer',
                    }}>
                        セッション終了
                    </button>
                </div>
            )}

            {/* ═══ Header ═══ */}
            <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}`, padding: '20px 16px 18px' }}>
                <div style={{ maxWidth: 860, margin: '0 auto' }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textFaint, fontWeight: 800, marginBottom: 4 }}>
                        PLAYPHRASE STUDIO
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 900, color: C.textPrimary, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                        PP カード管理
                    </h1>
                    <p style={{ fontSize: 12, color: C.textSub, margin: 0, lineHeight: 1.7 }}>
                        training で登録したフレーズを、<strong>文章 + 音声</strong>セットで一覧＆シャドー練習。
                        登録は training の <strong style={{ color: C.gold }}>+TEXT / +CLIP</strong> から。
                    </p>
                </div>
            </div>

            {/* ═══ Stats + Session start ═══ */}
            <div style={{ maxWidth: 860, margin: '14px auto 0', padding: '0 16px' }}>
                <div style={{
                    background: '#fff', border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: 16,
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12,
                    marginBottom: 10,
                }}>
                    <StatBlock label="完成" value={stats.complete} sub="TEXT + CLIP" color={C.green} />
                    <StatBlock label="文章待ち" value={stats.needsText} sub="CLIP のみ" color={C.orange} />
                    <StatBlock label="音声待ち" value={stats.needsClip} sub="TEXT のみ" color={C.blue} />
                    <StatBlock label="マスター" value={stats.mastered} sub={`${REPS_PER_MASTER}回以上シャドー`} color={C.gold} />
                    <StatBlock label="累計シャドー" value={stats.totalReps} sub="全期間" color={C.purple} />
                </div>

                {/* Session launcher */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8,
                    marginBottom: 10,
                }}>
                    <button
                        onClick={() => startSession('random-10')}
                        disabled={stats.complete === 0}
                        style={sessionBtn(C.gold, stats.complete > 0)}
                    >
                        ランダム 10本シャドー
                    </button>
                    <button
                        onClick={() => startSession('all-complete')}
                        disabled={stats.complete === 0}
                        style={sessionBtn(C.green, stats.complete > 0)}
                    >
                        完成カード全部 ({stats.complete})
                    </button>
                </div>

                {/* Import shortcut */}
                {stats.complete === 0 && (
                    <div style={{
                        background: C.goldBg, border: `1px dashed ${C.gold}40`,
                        borderRadius: 10, padding: '10px 14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                        marginBottom: 10,
                    }}>
                        <div style={{ fontSize: 12, color: C.goldDim, fontWeight: 700 }}>
                            試しに {NATIVE_PHRASES.length} 本の初期セットをインポートする?
                        </div>
                        <button
                            onClick={handleBulkImport}
                            disabled={importing}
                            style={{
                                padding: '6px 14px', borderRadius: 8,
                                background: importing ? C.border : C.gold,
                                color: importing ? C.textFaint : '#fff',
                                border: 'none',
                                fontSize: 11, fontWeight: 800, letterSpacing: 1,
                                cursor: importing ? 'wait' : 'pointer', whiteSpace: 'nowrap',
                            }}
                        >
                            {importing ? `${importProgress}%` : 'インポート'}
                        </button>
                    </div>
                )}
            </div>

            {/* ═══ Filter + sort + search ═══ */}
            <div style={{ maxWidth: 860, margin: '14px auto 0', padding: '0 16px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                    {([
                        { id: 'all' as FilterMode, label: 'すべて', count: ppPhrases.length },
                        { id: 'complete' as FilterMode, label: '完成', count: stats.complete, color: C.green },
                        { id: 'needs-text' as FilterMode, label: '文章待ち', count: stats.needsText, color: C.orange },
                        { id: 'needs-clip' as FilterMode, label: '音声待ち', count: stats.needsClip, color: C.blue },
                    ]).map(t => {
                        const active = filter === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id)}
                                style={{
                                    padding: '6px 12px',
                                    background: active ? (t.color ?? C.textPrimary) : '#fff',
                                    color: active ? '#fff' : C.textSub,
                                    border: `1.5px solid ${active ? (t.color ?? C.textPrimary) : C.border}`,
                                    borderRadius: 8, fontSize: 11, fontWeight: 700,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                }}
                            >
                                {t.label}
                                <span style={{
                                    fontSize: 9, fontWeight: 800,
                                    background: active ? 'rgba(255,255,255,0.2)' : C.bg,
                                    padding: '1px 5px', borderRadius: 4,
                                }}>
                                    {t.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="文字で絞る..."
                        style={{
                            flex: 1, padding: '8px 12px',
                            border: `1px solid ${C.border}`, borderRadius: 8,
                            fontSize: 12, background: '#fff', outline: 'none',
                        }}
                    />
                    <select
                        value={sortMode}
                        onChange={e => setSortMode(e.target.value as SortMode)}
                        style={{
                            padding: '8px 10px',
                            border: `1px solid ${C.border}`, borderRadius: 8,
                            fontSize: 12, background: '#fff', outline: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="recent">新しい順</option>
                        <option value="oldest">古い順</option>
                        <option value="shortest">短い順</option>
                        <option value="longest">長い順</option>
                        <option value="random">ランダム</option>
                    </select>
                </div>
                <div style={{ fontSize: 11, color: C.textFaint, marginTop: 10 }}>
                    {visible.length} / {ppPhrases.length} 件
                </div>
            </div>

            {/* ═══ Cards ═══ */}
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px' }}>
                {visible.length === 0 && (
                    <div style={{
                        padding: 40, textAlign: 'center',
                        background: '#fff', border: `1px dashed ${C.border}`, borderRadius: 14,
                        color: C.textDim, fontSize: 13, lineHeight: 1.7,
                    }}>
                        {ppPhrases.length === 0
                            ? 'まだカードがありません。training で +CLIP / +TEXT してから戻ってきて。'
                            : 'このフィルタに該当するカードなし。'}
                    </div>
                )}
                {visible.map(p => {
                    const hasClip = clipIds.has(p.id);
                    const status = getStatus(p, hasClip);
                    const r = reps[p.id] ?? 0;
                    const mastered = r >= REPS_PER_MASTER;
                    const isEditing = editingId === p.id;
                    const displayText = p.transcript ?? '';
                    const statusMeta = STATUS_META[status];
                    return (
                        <div key={p.id} style={{
                            background: C.card,
                            border: `1px solid ${mastered ? C.green + '55' : C.border}`,
                            borderLeft: `4px solid ${statusMeta.color}`,
                            borderRadius: 12, padding: '14px 14px 12px', marginBottom: 12,
                            position: 'relative',
                            boxShadow: mastered ? `0 2px 10px ${C.green}18` : 'none',
                        }}>
                            {/* Status badge + Shadow counter */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <span style={{
                                        fontSize: 9, fontWeight: 800, letterSpacing: 1,
                                        padding: '3px 8px', borderRadius: 999,
                                        color: statusMeta.color, background: `${statusMeta.color}12`,
                                        border: `1px solid ${statusMeta.color}40`,
                                    }}>
                                        {statusMeta.label}
                                    </span>
                                    {mastered && (
                                        <span style={{
                                            fontSize: 9, fontWeight: 800, color: C.green,
                                            padding: '3px 8px', borderRadius: 999,
                                            background: C.greenBg, border: `1px solid ${C.green}40`,
                                        }}>
                                            MASTER
                                        </span>
                                    )}
                                </div>
                                <span style={{
                                    fontSize: 10, fontWeight: 800,
                                    color: mastered ? C.green : C.textDim,
                                    padding: '3px 10px', borderRadius: 999,
                                    background: mastered ? C.greenBg : C.bg,
                                    border: `1px solid ${mastered ? C.green + '40' : C.border}`,
                                }}>
                                    SHADOW × {r}
                                </span>
                            </div>

                            {/* Transcript: display or inline edit */}
                            {isEditing ? (
                                <div style={{ marginBottom: 10 }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: C.green, letterSpacing: 1.5, marginBottom: 4 }}>
                                        TRANSCRIPT (書き起こし)
                                    </div>
                                    <textarea
                                        value={editValue}
                                        onChange={e => setEditValue(e.target.value)}
                                        autoFocus
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                                e.preventDefault(); saveEdit();
                                            } else if (e.key === 'Escape') {
                                                e.preventDefault(); cancelEdit();
                                            }
                                        }}
                                        placeholder="PlayPhrase の書き起こしを貼り付け..."
                                        style={{
                                            width: '100%', minHeight: 72, padding: '10px 12px',
                                            border: `2px solid ${C.green}`, borderRadius: 8,
                                            fontSize: 14, fontWeight: 500, lineHeight: 1.6,
                                            color: C.textPrimary, background: '#fff',
                                            outline: 'none', resize: 'vertical',
                                            fontFamily: 'inherit', boxSizing: 'border-box',
                                        }}
                                    />
                                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                                        <button
                                            onClick={saveEdit}
                                            disabled={editSaving}
                                            style={{
                                                flex: 1, padding: '8px 12px', borderRadius: 8,
                                                background: C.green, color: '#fff', border: 'none',
                                                fontSize: 11, fontWeight: 800, letterSpacing: 1,
                                                cursor: editSaving ? 'wait' : 'pointer',
                                                opacity: editSaving ? 0.5 : 1,
                                            }}
                                        >
                                            {editSaving ? '...' : 'SAVE'}
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            style={{
                                                padding: '8px 14px', borderRadius: 8,
                                                background: '#fff', color: C.textDim,
                                                border: `1px solid ${C.border}`,
                                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                            }}
                                        >
                                            キャンセル
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => startEdit(p.id, displayText)}
                                    style={{
                                        fontSize: 15, fontWeight: 500,
                                        color: displayText ? C.textPrimary : C.textFaint,
                                        fontStyle: displayText ? 'normal' : 'italic',
                                        lineHeight: 1.65, marginBottom: 10,
                                        cursor: 'pointer',
                                        padding: '8px 10px', borderRadius: 8,
                                        background: displayText ? 'transparent' : C.bg,
                                        border: displayText ? '1px solid transparent' : `1px dashed ${C.border}`,
                                    }}
                                    title="クリックで編集"
                                >
                                    {displayText || `${p.english}（書き起こし未設定 — クリックで追加）`}
                                </div>
                            )}

                            {/* Audio row */}
                            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                                {hasClip ? (
                                    <>
                                        <button
                                            onClick={() => player.play(p.id, 0.95, () => bumpRep(p.id))}
                                            style={btn(C.blue, true)}
                                        >▶ PLAY</button>
                                        <button
                                            onClick={() => player.play(p.id, 0.70, () => bumpRep(p.id))}
                                            style={btn(C.blueDim, false)}
                                        >▶▶ SLOW</button>
                                        <button
                                            onClick={() => player.loop(p.id, REPS_PER_MASTER, () => bumpRep(p.id))}
                                            style={btn(C.gold, false)}
                                        >↻ LOOP×{REPS_PER_MASTER}</button>
                                    </>
                                ) : (
                                    <div style={{
                                        flex: 1, padding: '8px 12px', fontSize: 11, color: C.blueDim,
                                        border: `1px dashed ${C.blue}40`, background: C.blueBg,
                                        borderRadius: 8, textAlign: 'center', fontWeight: 600,
                                    }}>
                                        音声未添付 — training の <strong>+CLIP</strong> で mp3 を添付
                                    </div>
                                )}
                            </div>

                            {/* Footer: training link + delete */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                                <Link
                                    href={`/english/training`}
                                    style={{
                                        fontSize: 11, color: C.textDim, textDecoration: 'none',
                                        padding: '4px 0',
                                    }}
                                >
                                    training で見る →
                                </Link>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    style={{
                                        padding: '4px 10px', background: 'transparent',
                                        color: C.red, border: `1px solid ${C.red}30`,
                                        fontSize: 10, fontWeight: 700, borderRadius: 6,
                                        cursor: 'pointer',
                                    }}
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Danger zone: re-import + cleanup of initial 68 */}
            <div style={{ maxWidth: 860, margin: '24px auto 0', padding: '0 16px' }}>
                <div style={{
                    padding: '12px 14px', background: C.redBg,
                    border: `1px dashed ${C.red}50`, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    flexWrap: 'wrap',
                }}>
                    <div style={{ fontSize: 11, color: C.red, fontWeight: 700, lineHeight: 1.6 }}>
                        初期セット {NATIVE_PHRASES.length} 本を D1 から一括削除
                        <div style={{ fontSize: 10, fontWeight: 500, color: C.textDim, marginTop: 2 }}>
                            ファイル名由来の不完全な transcript を training からもろとも消す
                        </div>
                    </div>
                    <button
                        onClick={handleCleanupNativeImports}
                        disabled={cleaning}
                        style={{
                            padding: '6px 14px', borderRadius: 8,
                            background: cleaning ? C.border : C.red,
                            color: cleaning ? C.textFaint : '#fff',
                            border: 'none',
                            fontSize: 11, fontWeight: 800, letterSpacing: 1,
                            cursor: cleaning ? 'wait' : 'pointer', whiteSpace: 'nowrap',
                        }}
                    >
                        {cleaning ? `${cleanProgress}%` : '初期68本を削除'}
                    </button>
                </div>

                {stats.complete > 0 && (
                    <div style={{
                        marginTop: 8,
                        padding: '10px 14px', background: '#fff',
                        border: `1px dashed ${C.border}`, borderRadius: 10,
                        fontSize: 11, color: C.textDim,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    }}>
                        <span>初期セット {NATIVE_PHRASES.length} 本の再インポート（重複スキップ）</span>
                        <button
                            onClick={handleBulkImport}
                            disabled={importing}
                            style={{
                                padding: '4px 12px', borderRadius: 6,
                                background: 'transparent', color: C.textDim,
                                border: `1px solid ${C.border}`,
                                fontSize: 10, fontWeight: 700, cursor: importing ? 'wait' : 'pointer',
                            }}
                        >
                            {importing ? `${importProgress}%` : 'インポート'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════
const STATUS_META: Record<CardStatus, { label: string; color: string }> = {
    complete: { label: '完成', color: C.green },
    'needs-text': { label: '文章待ち', color: C.orange },
    'needs-clip': { label: '音声待ち', color: C.blue },
    orphan: { label: '未設定', color: C.textFaint },
};

function StatBlock({ label, value, sub, color }: { label: string; value: number; sub: string; color: string }) {
    return (
        <div style={{
            padding: '10px 12px',
            background: `${color}0A`,
            border: `1px solid ${color}30`,
            borderRadius: 10,
        }}>
            <div style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 1.5, marginBottom: 3 }}>
                {label.toUpperCase()}
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>
                {value}
            </div>
            <div style={{ fontSize: 9, color: C.textFaint, marginTop: 3 }}>
                {sub}
            </div>
        </div>
    );
}

function sessionBtn(color: string, enabled: boolean): React.CSSProperties {
    return {
        padding: '12px 16px', borderRadius: 10,
        background: enabled ? color : C.border,
        color: enabled ? '#fff' : C.textFaint,
        border: 'none',
        fontSize: 12, fontWeight: 800, letterSpacing: 1,
        cursor: enabled ? 'pointer' : 'not-allowed',
        boxShadow: enabled ? `0 4px 12px ${color}30` : 'none',
    };
}

function btn(color: string, filled: boolean): React.CSSProperties {
    return {
        flex: 1, padding: '8px 6px',
        background: filled ? color : '#fff',
        color: filled ? '#fff' : color,
        border: `1.5px solid ${color}`,
        borderRadius: 8,
        fontSize: 10, fontWeight: 800, letterSpacing: 1,
        cursor: 'pointer',
    };
}
