'use client';

import { useState, useEffect, useRef, useCallback, useMemo, type SyntheticEvent } from 'react';
import Link from 'next/link';

type RepeatMode = 'off' | 'all' | 'one';

interface ClipItem {
    id: string;
    url: string;
    english: string;
    japanese: string;
    date: string;
}

interface ApiClip {
    phrase_id: string;
    url: string;
    english: string | null;
    japanese: string | null;
    date: string | null;
    created_at: string;
}

const GOLD = '#B8960C';

function shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default function ClipPlayerPage() {
    const [clips, setClips] = useState<ClipItem[]>([]);
    const [order, setOrder] = useState<number[]>([]); // indices into clips, in play order
    const [loading, setLoading] = useState(true);

    const [currentPos, setCurrentPos] = useState(0); // position within `order`
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0..1

    // Settings (persisted)
    const [speed, setSpeed] = useState(1);
    const [gapSeconds, setGapSeconds] = useState(0.5);
    const [repeatMode, setRepeatMode] = useState<RepeatMode>('all');
    const [shuffle, setShuffle] = useState(false);
    const [showJa, setShowJa] = useState(true);
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const gapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Refs to avoid stale closures inside audio event handlers
    const orderRef = useRef<number[]>([]);
    const clipsRef = useRef<ClipItem[]>([]);
    const currentPosRef = useRef(0);
    const repeatRef = useRef<RepeatMode>('all');
    const gapRef = useRef(0.5);
    const speedRef = useRef(1);
    useEffect(() => { orderRef.current = order; }, [order]);
    useEffect(() => { clipsRef.current = clips; }, [clips]);
    useEffect(() => { currentPosRef.current = currentPos; }, [currentPos]);
    useEffect(() => { repeatRef.current = repeatMode; }, [repeatMode]);
    useEffect(() => { gapRef.current = gapSeconds; }, [gapSeconds]);
    useEffect(() => { speedRef.current = speed; if (audioRef.current) audioRef.current.playbackRate = speed; }, [speed]);

    // ── Load settings ──
    useEffect(() => {
        try {
            const s = localStorage.getItem('clipplayer_speed');
            const g = localStorage.getItem('clipplayer_gap');
            const r = localStorage.getItem('clipplayer_repeat');
            const sh = localStorage.getItem('clipplayer_shuffle');
            const j = localStorage.getItem('clipplayer_showJa');
            if (s) setSpeed(parseFloat(s));
            if (g) setGapSeconds(parseFloat(g));
            if (r) setRepeatMode(r as RepeatMode);
            if (sh) setShuffle(sh === 'true');
            if (j) setShowJa(j !== 'false');
        } catch { /* */ }
        setSettingsLoaded(true);
    }, []);
    useEffect(() => { if (settingsLoaded) localStorage.setItem('clipplayer_speed', String(speed)); }, [speed, settingsLoaded]);
    useEffect(() => { if (settingsLoaded) localStorage.setItem('clipplayer_gap', String(gapSeconds)); }, [gapSeconds, settingsLoaded]);
    useEffect(() => { if (settingsLoaded) localStorage.setItem('clipplayer_repeat', repeatMode); }, [repeatMode, settingsLoaded]);
    useEffect(() => { if (settingsLoaded) localStorage.setItem('clipplayer_shuffle', String(shuffle)); }, [shuffle, settingsLoaded]);
    useEffect(() => { if (settingsLoaded) localStorage.setItem('clipplayer_showJa', String(showJa)); }, [showJa, settingsLoaded]);

    // ── Load clips from Cloudflare (R2 urls + metadata in D1), synced across devices ──
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/phrase-clips');
                const data = await res.json();
                // Best-effort label fallback for clips whose metadata was empty at upload time.
                let apiMap = new Map<string, { english: string; japanese: string; date: string }>();
                const clipsRaw: ApiClip[] = (data?.success && Array.isArray(data.clips)) ? data.clips : [];
                const missing = clipsRaw.some(c => !c.english);
                if (missing) {
                    try {
                        const pr = await fetch('/api/phrases');
                        const pd = await pr.json();
                        if (pd?.success && Array.isArray(pd.phrases)) {
                            apiMap = new Map(pd.phrases.map((p: { id: string; english: string; japanese: string; date: string }) =>
                                [p.id, { english: p.english, japanese: p.japanese, date: p.date }]));
                        }
                    } catch { /* */ }
                }
                const list: ClipItem[] = clipsRaw.map((c, i) => {
                    const fb = apiMap.get(c.phrase_id);
                    return {
                        id: c.phrase_id,
                        url: c.url,
                        english: c.english || fb?.english || `Clip ${i + 1}`,
                        japanese: c.japanese || fb?.japanese || '',
                        date: (c.date || fb?.date || '').split('T')[0],
                    };
                });
                if (!cancelled) {
                    setClips(list);
                    setLoading(false);
                }
            } catch {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // ── Build play order whenever clips or shuffle changes ──
    useEffect(() => {
        const base = clips.map((_, i) => i);
        setOrder(shuffle ? shuffleArray(base) : base);
        setCurrentPos(0);
    }, [clips, shuffle]);

    const clearGapTimer = () => {
        if (gapTimerRef.current) { clearTimeout(gapTimerRef.current); gapTimerRef.current = null; }
    };

    const setMediaSession = useCallback((clip: ClipItem | undefined) => {
        if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || !clip) return;
        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: clip.english,
                artist: clip.japanese || 'CLIP',
                album: 'PP Clips',
            });
        } catch { /* */ }
    }, []);

    // ── Core: play the clip at a given position in `order` ──
    const playPos = useCallback(async (pos: number) => {
        clearGapTimer();
        const ord = orderRef.current;
        const cl = clipsRef.current;
        if (ord.length === 0 || pos < 0 || pos >= ord.length) {
            setIsPlaying(false);
            return;
        }
        const clip = cl[ord[pos]];
        if (!clip || !clip.url) return;

        const audio = audioRef.current;
        if (!audio) return;
        audio.src = clip.url;
        audio.playbackRate = speedRef.current;

        setCurrentPos(pos);
        currentPosRef.current = pos;
        setMediaSession(clip);

        try {
            await audio.play();
            setIsPlaying(true);
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        } catch {
            setIsPlaying(false);
        }
    }, [setMediaSession]);

    // ── Advance after a clip ends ──
    const handleEnded = useCallback(() => {
        const ord = orderRef.current;
        const pos = currentPosRef.current;

        if (repeatRef.current === 'one') {
            const audio = audioRef.current;
            if (audio) { audio.currentTime = 0; audio.play().catch(() => {}); }
            return;
        }

        let nextPos = pos + 1;
        if (nextPos >= ord.length) {
            if (repeatRef.current === 'all') {
                nextPos = 0;
            } else {
                setIsPlaying(false);
                setProgress(0);
                if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
                return;
            }
        }

        const gapMs = gapRef.current * 1000;
        if (gapMs <= 0) {
            playPos(nextPos);
        } else {
            gapTimerRef.current = setTimeout(() => playPos(nextPos), gapMs);
        }
    }, [playPos]);

    const handleTimeUpdate = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.currentTarget;
        if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
    }, []);

    // ── MediaSession action handlers (lock-screen / background controls) ──
    const pause = useCallback(() => {
        clearGapTimer();
        audioRef.current?.pause();
        setIsPlaying(false);
        if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    }, []);

    const resume = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!audio.src) { playPos(currentPosRef.current); return; }
        audio.play().then(() => {
            setIsPlaying(true);
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        }).catch(() => {});
    }, [playPos]);

    const next = useCallback(() => {
        const ord = orderRef.current;
        let n = currentPosRef.current + 1;
        if (n >= ord.length) n = 0;
        playPos(n);
    }, [playPos]);

    const prev = useCallback(() => {
        const audio = audioRef.current;
        // If more than 2s in, restart current clip instead of going back.
        if (audio && audio.currentTime > 2) { audio.currentTime = 0; return; }
        const ord = orderRef.current;
        let p = currentPosRef.current - 1;
        if (p < 0) p = ord.length - 1;
        playPos(p);
    }, [playPos]);

    useEffect(() => {
        if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
        const ms = navigator.mediaSession;
        try {
            ms.setActionHandler('play', resume);
            ms.setActionHandler('pause', pause);
            ms.setActionHandler('nexttrack', next);
            ms.setActionHandler('previoustrack', prev);
        } catch { /* */ }
        return () => {
            try {
                ms.setActionHandler('play', null);
                ms.setActionHandler('pause', null);
                ms.setActionHandler('nexttrack', null);
                ms.setActionHandler('previoustrack', null);
            } catch { /* */ }
        };
    }, [resume, pause, next, prev]);

    // ── Cleanup on unmount ──
    useEffect(() => {
        return () => { clearGapTimer(); };
    }, []);

    const togglePlay = () => {
        if (isPlaying) { pause(); return; }
        const audio = audioRef.current;
        if (audio && audio.src && audio.currentTime > 0 && !audio.ended) resume();
        else playPos(currentPos);
    };

    const removeAt = async (pos: number) => {
        const clip = clips[order[pos]];
        if (!clip) return;
        if (pos === currentPos) pause();
        setClips(prev => prev.filter(c => c.id !== clip.id));
        try { await fetch(`/api/phrase-clips?phraseId=${encodeURIComponent(clip.id)}`, { method: 'DELETE' }); } catch { /* */ }
    };

    const [clearing, setClearing] = useState(false);
    const clearAll = async () => {
        if (clips.length === 0) return;
        if (!window.confirm(`登録済みのCLIP ${clips.length}本を全部消す？(元に戻せません)`)) return;
        setClearing(true);
        pause();
        const ids = clips.map(c => c.id);
        setClips([]);
        try {
            await Promise.all(ids.map(id =>
                fetch(`/api/phrase-clips?phraseId=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {})
            ));
        } finally {
            setClearing(false);
        }
    };

    const cycleRepeat = () => {
        setRepeatMode(m => (m === 'off' ? 'all' : m === 'all' ? 'one' : 'off'));
    };

    const currentClip = useMemo(() => clips[order[currentPos]], [clips, order, currentPos]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#A8A29E', fontSize: '13px' }}>Loading...</span>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', color: '#1C1917' }}>
            {/* Hidden persistent audio element — survives backgrounding on mobile */}
            <audio ref={audioRef} preload="auto" playsInline onEnded={handleEnded} onTimeUpdate={handleTimeUpdate} />

            {/* Header */}
            <div style={{
                padding: '12px 20px', borderBottom: '1px solid #F5F5F4', backgroundColor: '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <Link href="/english/training" style={{ color: '#A8A29E', fontSize: '13px', textDecoration: 'none' }}>
                    Back
                </Link>
                <span style={{ fontSize: '12px', fontWeight: 700, color: GOLD, letterSpacing: '1px' }}>
                    CLIP 連続再生
                </span>
                <span style={{ fontSize: '11px', color: '#A8A29E' }}>{clips.length}本</span>
            </div>

            <div style={{ padding: '16px 20px', maxWidth: '640px', margin: '0 auto' }}>
                {clips.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 24px', color: '#78716C' }}>
                        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>
                            登録済みのCLIPがありません
                        </div>
                        <p style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.7, margin: 0 }}>
                            トレーニング画面で各フレーズの「+CLIP」から<br />
                            映画などの音声を登録すると、ここで連続再生できます。
                        </p>
                        <Link href="/english/training" style={{
                            display: 'inline-block', marginTop: '20px', padding: '10px 20px',
                            background: GOLD, color: '#fff', borderRadius: '8px',
                            fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                        }}>
                            トレーニングへ
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Now Playing */}
                        <div style={{
                            backgroundColor: '#fff', borderRadius: '16px', padding: '24px 20px',
                            marginBottom: '14px', border: '1px solid #F5F5F4', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '10px', color: GOLD, letterSpacing: '1px', fontWeight: 700, marginBottom: '12px' }}>
                                NOW PLAYING &nbsp;{currentPos + 1} / {order.length}
                            </div>
                            <div style={{ fontSize: '20px', color: '#1C1917', lineHeight: 1.5, fontWeight: 600, marginBottom: showJa ? '6px' : 0 }}>
                                {currentClip?.english || '—'}
                            </div>
                            {showJa && currentClip?.japanese && (
                                <div style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.5 }}>
                                    {currentClip.japanese}
                                </div>
                            )}
                        </div>

                        {/* Progress */}
                        <div style={{ marginBottom: '18px' }}>
                            <div style={{ height: '4px', backgroundColor: '#E7E5E4', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: GOLD, transition: 'width 0.1s linear' }} />
                            </div>
                        </div>

                        {/* Big Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '18px' }}>
                            <button onClick={() => setShuffle(s => !s)} title="シャッフル" style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
                                color: shuffle ? GOLD : '#D6D3D1',
                            }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M10.6 8.4 7.4 5.2H3v2h3.6l2.6 2.6 1.4-1.4zM17 5l3 3-3 3V9h-2.2l-7.4 7.4-1.4-1.4L13.6 7H15V5zm-6.4 9.2L9.2 12.8 7.4 14.6 4.8 17H3v2h2.6l3.2-3.2 1.8 1.8zM17 13l3 3-3 3v-2h-1.4l-2.6-2.6 1.4-1.4 1.6 1.6H17v-2z"/>
                                </svg>
                            </button>
                            <button onClick={prev} title="前へ" style={{ background: 'none', border: 'none', color: '#57534E', cursor: 'pointer', padding: '8px' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                            </button>
                            <button onClick={togglePlay} style={{
                                width: '64px', height: '64px', borderRadius: '50%', backgroundColor: GOLD,
                                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(184,150,12,0.3)',
                            }}>
                                {isPlaying ? (
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '3px' }}><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </button>
                            <button onClick={next} title="次へ" style={{ background: 'none', border: 'none', color: '#57534E', cursor: 'pointer', padding: '8px' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                            </button>
                            <button onClick={cycleRepeat} title="リピート" style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: '8px', position: 'relative',
                                color: repeatMode !== 'off' ? GOLD : '#D6D3D1',
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                                </svg>
                                {repeatMode === 'one' && (
                                    <span style={{ position: 'absolute', fontSize: '8px', fontWeight: 900, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: GOLD }}>1</span>
                                )}
                            </button>
                        </div>

                        {/* Compact settings */}
                        <div style={{
                            backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #F5F5F4',
                            padding: '12px 14px', marginBottom: '20px',
                        }}>
                            {/* Speed */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', width: '56px' }}>SPEED</span>
                                {[0.75, 1, 1.25, 1.5].map(s => (
                                    <button key={s} onClick={() => setSpeed(s)} style={{
                                        flex: 1, padding: '6px 0', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                        border: speed === s ? `1px solid ${GOLD}` : '1px solid #E7E5E4',
                                        backgroundColor: speed === s ? '#FFFBEB' : '#fff',
                                        color: speed === s ? GOLD : '#78716C', cursor: 'pointer',
                                    }}>{s}x</button>
                                ))}
                            </div>
                            {/* Gap */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', width: '56px' }}>
                                    GAP {gapSeconds.toFixed(1)}s
                                </span>
                                <input type="range" min="0" max="3" step="0.5" value={gapSeconds}
                                    onChange={e => setGapSeconds(parseFloat(e.target.value))}
                                    style={{ flex: 1, accentColor: GOLD }} />
                            </div>
                            {/* JP toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', width: '56px' }}>日本語</span>
                                <button onClick={() => setShowJa(j => !j)} style={{
                                    padding: '5px 14px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                    border: showJa ? `1px solid ${GOLD}` : '1px solid #E7E5E4',
                                    backgroundColor: showJa ? '#FFFBEB' : '#fff',
                                    color: showJa ? GOLD : '#78716C', cursor: 'pointer',
                                }}>{showJa ? 'ON' : 'OFF'}</button>
                            </div>
                        </div>

                        {/* Clip list */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px' }}>
                                CLIP一覧 ({clips.length})
                            </span>
                            <button onClick={clearAll} disabled={clearing} style={{
                                background: 'none', border: '1px solid #FCA5A5', borderRadius: '6px',
                                padding: '4px 10px', fontSize: '10px', fontWeight: 600,
                                color: '#EF4444', cursor: clearing ? 'wait' : 'pointer',
                            }}>
                                {clearing ? '消去中...' : '全消去'}
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {order.map((clipIdx, pos) => {
                                const clip = clips[clipIdx];
                                if (!clip) return null;
                                const isActive = pos === currentPos;
                                return (
                                    <div key={clip.id}
                                        onClick={() => playPos(pos)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
                                            backgroundColor: isActive ? '#FFFBEB' : '#fff',
                                            border: isActive ? '1px solid #FDE68A' : '1px solid transparent',
                                        }}>
                                        <div style={{ width: '22px', textAlign: 'center', fontSize: '12px', color: isActive ? GOLD : '#D6D3D1', fontWeight: isActive ? 700 : 400 }}>
                                            {isActive && isPlaying ? '♫' : pos + 1}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: '14px', lineHeight: 1.4, color: isActive ? GOLD : '#1C1917',
                                                fontWeight: isActive ? 600 : 400,
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            }}>
                                                {clip.english}
                                            </div>
                                            {showJa && clip.japanese && (
                                                <div style={{ fontSize: '12px', color: '#A8A29E', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {clip.japanese}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeAt(pos); }}
                                            style={{ background: 'none', border: 'none', color: '#E7E5E4', cursor: 'pointer', padding: '4px', fontSize: '14px', flexShrink: 0 }}
                                            onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = '#E7E5E4'; }}
                                        >
                                            x
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div style={{ height: '60px' }} />
        </div>
    );
}
