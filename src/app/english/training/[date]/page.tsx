'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { addPhraseToTraining } from '@/lib/saved-phrases';
import VoiceRecorder from '@/components/VoiceRecorder';

interface VoiceRecording {
    id: number;
    phrase_id: string;
    url: string;
    created_at: string;
}

interface Phrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
}

type MasteryLevel = 0 | 1 | 2 | 3;
type PlayScope = 'day' | 'month' | 'all';
type ShuffleMode = 'off' | 'random' | 'weighted';

const getDayOfWeek = (dateStr: string): string => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[new Date(dateStr).getDay()];
};

const formatDateDisplay = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
};

const getMonthKey = (dateStr: string): string => dateStr.substring(0, 7);

const formatMonthDisplay = (monthKey: string): string => {
    const [y, m] = monthKey.split('-');
    return `${y}年${parseInt(m)}月`;
};

// Weighted shuffle: lower mastery = higher probability of appearing earlier
function weightedShuffle<T>(arr: T[], getWeight: (item: T) => number): T[] {
    const items = arr.map(item => ({ item, weight: getWeight(item), sort: 0 }));
    items.forEach(i => { i.sort = Math.random() * i.weight; });
    items.sort((a, b) => b.sort - a.sort);
    return items.map(i => i.item);
}

function randomShuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export default function PhraseDatePage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateParam = params?.date as string;

    const [allPhrases, setAllPhrases] = useState<Phrase[]>([]);
    const [allDates, setAllDates] = useState<string[]>([]);
    const [phrasesByDate, setPhrasesByDate] = useState<Record<string, Phrase[]>>({});
    const [currentDateIndex, setCurrentDateIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [phraseMastery, setPhraseMastery] = useState<Record<string, MasteryLevel>>({});
    const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [voiceRecordings, setVoiceRecordings] = useState<Record<string, VoiceRecording[]>>({});

    // Vocabulary modal state
    const [showVocabModal, setShowVocabModal] = useState(false);
    const [vocabExample, setVocabExample] = useState('');
    const [vocabWord, setVocabWord] = useState('');
    const [vocabMeaning, setVocabMeaning] = useState('');
    const [vocabType, setVocabType] = useState('word');
    const [vocabSaving, setVocabSaving] = useState(false);
    const [vocabDate, setVocabDate] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    });

    // ── Player Settings ──
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(0.9);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
    const [shuffleMode, setShuffleMode] = useState<ShuffleMode>('off');
    const [autoNextDay, setAutoNextDay] = useState(false);
    const [shuffleDays, setShuffleDays] = useState(false);
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    // ── New: Advanced Controls ──
    const [playScope, setPlayScope] = useState<PlayScope>('day');
    const [masteryFilter, setMasteryFilter] = useState<Set<MasteryLevel>>(new Set([0, 1]));
    const [gapSeconds, setGapSeconds] = useState(0.5);
    const [showSettings, setShowSettings] = useState(() => {
        if (typeof window !== 'undefined') {
            return new URLSearchParams(window.location.search).has('settings');
        }
        return false;
    });
    const [showJapanese, setShowJapanese] = useState(true);
    const [clipsOnly, setClipsOnly] = useState(false); // play only phrases that have a registered CLIP
    const [useClipAudio, setUseClipAudio] = useState(true); // ON = play real CLIP audio (MediaSession, can pause background YouTube). OFF = always TTS (lets background YouTube keep playing)
    const [selectedMonth, setSelectedMonth] = useState(() => getMonthKey(dateParam || '2026-03-01'));

    // Shuffled playlist (regenerated when shuffle/filter changes)
    const [playlist, setPlaylist] = useState<Phrase[]>([]);

    // Registered CLIP audio (real movie/PP audio on R2), keyed by phrase id
    const [clipUrls, setClipUrls] = useState<Record<string, string>>({});

    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const repeatModeRef = useRef(0);
    const shuffleModeRef = useRef<ShuffleMode>('off');
    const autoNextDayRef = useRef(false);
    const shuffleDaysRef = useRef(false);
    const gapSecondsRef = useRef(0.5);
    const playlistRef = useRef<Phrase[]>([]);
    const clipUrlsRef = useRef<Record<string, string>>({});
    const clipAudioRef = useRef<HTMLAudioElement | null>(null);
    const useClipAudioRef = useRef(true);
    // Cards already heard this cycle (persisted) so a restart continues instead of replaying the top
    const playedIdsRef = useRef<Set<string>>(new Set());
    const playedCountRef = useRef(0);
    const buildPlaylistRef = useRef<() => Phrase[]>(() => []);

    const persistPlayed = () => {
        try { localStorage.setItem('phrases_playedIds', JSON.stringify([...playedIdsRef.current])); } catch { /* */ }
    };

    useEffect(() => { clipUrlsRef.current = clipUrls; }, [clipUrls]);
    useEffect(() => { useClipAudioRef.current = useClipAudio; }, [useClipAudio]);
    useEffect(() => { repeatModeRef.current = repeatMode; }, [repeatMode]);
    useEffect(() => { shuffleModeRef.current = shuffleMode; }, [shuffleMode]);
    useEffect(() => { autoNextDayRef.current = autoNextDay; }, [autoNextDay]);
    useEffect(() => { shuffleDaysRef.current = shuffleDays; }, [shuffleDays]);
    useEffect(() => { gapSecondsRef.current = gapSeconds; }, [gapSeconds]);
    useEffect(() => { playlistRef.current = playlist; }, [playlist]);

    // ── Load settings ──
    useEffect(() => {
        try {
            const s = localStorage.getItem('phrases_speed');
            const r = localStorage.getItem('phrases_repeatMode');
            const sh = localStorage.getItem('phrases_shuffleMode');
            const pm = localStorage.getItem('phrases_dayPlayMode');
            const mf = localStorage.getItem('phrases_masteryFilter');
            const g = localStorage.getItem('phrases_gap');
            const sj = localStorage.getItem('phrases_showJapanese');
            const ps = localStorage.getItem('phrases_playScope');
            const uca = localStorage.getItem('phrases_useClipAudio');

            if (s) setSpeed(parseFloat(s));
            if (r) { const mode = parseInt(r); setRepeatMode(mode); repeatModeRef.current = mode; }
            if (sh) { setShuffleMode(sh as ShuffleMode); shuffleModeRef.current = sh as ShuffleMode; }
            if (pm === 'auto') { setAutoNextDay(true); setShuffleDays(false); }
            else if (pm === 'shuffle') { setAutoNextDay(true); setShuffleDays(true); }
            if (mf) {
                try {
                    const levels = JSON.parse(mf) as number[];
                    setMasteryFilter(new Set(levels as MasteryLevel[]));
                } catch { /* */ }
            }
            if (g) setGapSeconds(parseFloat(g));
            if (sj === 'false') setShowJapanese(false);
            if (ps) setPlayScope(ps as PlayScope);
            if (uca === 'false') { setUseClipAudio(false); useClipAudioRef.current = false; }

            const pid = localStorage.getItem('phrases_playedIds');
            if (pid) { try { playedIdsRef.current = new Set(JSON.parse(pid) as string[]); } catch { /* */ } }
        } catch { /* */ }

        // Load mastery from API
        fetch('/api/phrases/mastery')
            .then(res => res.json())
            .then(data => { if (data.success) setPhraseMastery(data.mastery || {}); })
            .catch(() => {});

        // Load voice recordings
        fetch('/api/voice-recordings')
            .then(res => res.json())
            .then(data => { if (data.success) setVoiceRecordings(data.recordings || {}); })
            .catch(() => {});

        // Load registered CLIP audio (R2)
        fetch('/api/phrase-clips')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.clips)) {
                    const m: Record<string, string> = {};
                    for (const c of data.clips) m[c.phrase_id] = c.url;
                    setClipUrls(m);
                }
            })
            .catch(() => {});

        setSavedPhrases(new Set());
        setSettingsLoaded(true);
    }, []);

    // ── Save settings ──
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_speed', speed.toString());
    }, [speed, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_repeatMode', repeatMode.toString());
    }, [repeatMode, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_shuffleMode', shuffleMode);
    }, [shuffleMode, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        const pm = !autoNextDay ? 'manual' : shuffleDays ? 'shuffle' : 'auto';
        localStorage.setItem('phrases_dayPlayMode', pm);
    }, [autoNextDay, shuffleDays, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_masteryFilter', JSON.stringify([...masteryFilter]));
    }, [masteryFilter, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_gap', gapSeconds.toString());
    }, [gapSeconds, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_showJapanese', showJapanese.toString());
    }, [showJapanese, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_playScope', playScope);
    }, [playScope, settingsLoaded]);
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('phrases_useClipAudio', useClipAudio.toString());
    }, [useClipAudio, settingsLoaded]);

    // ── Load phrases ──
    useEffect(() => {
        const fetchPhrases = async () => {
            try {
                const res = await fetch('/api/phrases');
                const data = await res.json();
                if (data.success) {
                    const grouped: Record<string, Phrase[]> = {};
                    (data.phrases as Phrase[]).forEach(p => {
                        if (!grouped[p.date]) grouped[p.date] = [];
                        grouped[p.date].push(p);
                    });
                    const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
                    setAllDates(dates);
                    setPhrasesByDate(grouped);
                    setAllPhrases(data.phrases);

                    if (dateParam && grouped[dateParam]) {
                        setCurrentDateIndex(dates.indexOf(dateParam));
                    } else if (dates.length > 0) {
                        router.replace(`/english/training/${dates[0]}`);
                        return;
                    }
                } else {
                    setError('Failed to load phrases');
                }
            } catch {
                setError('Failed to connect');
            } finally {
                setLoading(false);
            }
        };
        fetchPhrases();

        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            setVoices(allVoices.filter(v => v.lang.startsWith('en')));
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.cancel();
            clipAudioRef.current?.pause();
            stopProgress();
            persistPlayed(); // save heard-cards progress on navigation/unmount
        };
    }, [dateParam, router]);

    // ── Derived: scope phrases (before mastery filter) ──
    const scopePhrases = useMemo(() => {
        if (playScope === 'day') {
            return phrasesByDate[dateParam] || [];
        } else if (playScope === 'month') {
            const monthDates = allDates.filter(d => getMonthKey(d) === selectedMonth);
            return monthDates.flatMap(d => phrasesByDate[d] || []);
        }
        return allPhrases;
    }, [playScope, dateParam, selectedMonth, allDates, phrasesByDate, allPhrases]);

    // ── Derived: filtered by mastery (+ optional CLIP-only) ──
    const filteredPhrases = useMemo(() => {
        return scopePhrases.filter(p => {
            if (clipsOnly && !clipUrls[p.id]) return false;
            const m = (phraseMastery[p.id] || 0) as MasteryLevel;
            return masteryFilter.has(m);
        });
    }, [scopePhrases, phraseMastery, masteryFilter, clipsOnly, clipUrls]);

    // ── Build the playlist from the current filtered set ──
    // Sequential keeps the listed order. Shuffle modes put cards NOT yet heard this cycle first
    // (skipping playedIds), so reopening the page continues instead of replaying from the top.
    // When everything has been heard, the cycle resets and a fresh shuffle of all cards begins.
    const buildPlaylist = useCallback((): Phrase[] => {
        const all = filteredPhrases;
        if (all.length === 0) return [];
        if (shuffleMode === 'off') return [...all];

        let pool = all.filter(p => !playedIdsRef.current.has(p.id));
        if (pool.length === 0) {
            // Every card in THIS set has been heard -> start a fresh cycle for just this set.
            // Only clear the current set's ids so progress for cards outside the scope/filter
            // (e.g. the wider All set) is preserved.
            const next = new Set(playedIdsRef.current);
            all.forEach(p => next.delete(p.id));
            playedIdsRef.current = next;
            persistPlayed();
            pool = [...all];
        }
        return shuffleMode === 'weighted'
            ? weightedShuffle(pool, p => [4, 3, 2, 1][phraseMastery[p.id] || 0])
            : randomShuffle(pool);
    }, [filteredPhrases, shuffleMode, phraseMastery]);

    useEffect(() => { buildPlaylistRef.current = buildPlaylist; }, [buildPlaylist]);

    useEffect(() => {
        setPlaylist(buildPlaylist());
        setCurrentIndex(0);
    }, [buildPlaylist]);

    // ── Available months ──
    const availableMonths = useMemo(() => {
        const months = new Set(allDates.map(d => getMonthKey(d)));
        return [...months].sort().reverse();
    }, [allDates]);

    // Auto-play when navigating
    useEffect(() => {
        const autoplay = searchParams?.get('autoplay');
        if (autoplay === 'true' && playlist.length > 0) {
            const timer = setTimeout(() => playLine(0), 500);
            return () => clearTimeout(timer);
        }
    }, [playlist, searchParams]);

    const startProgress = () => {
        setProgress(0);
        let elapsed = 0;
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = setInterval(() => {
            elapsed += 50;
            setProgress(Math.min((elapsed / 3000) * 100, 100));
        }, 50);
    };

    const stopProgress = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    const playLine = useCallback((index: number) => {
        const list = playlistRef.current;
        if (list.length === 0 || index < 0 || index >= list.length) {
            setIsPlaying(false);
            stopProgress();
            return;
        }

        const phrase = list[index];

        // Stop whatever was playing before
        window.speechSynthesis.cancel();
        if (clipAudioRef.current) { clipAudioRef.current.pause(); }

        // Remember this card as heard (so a later restart skips it). Persist every few cards.
        playedIdsRef.current.add(phrase.id);
        playedCountRef.current++;
        if (playedCountRef.current % 5 === 0) persistPlayed();

        setCurrentIndex(index);
        setIsPlaying(true);

        // Advance to the next line after this one finishes (shared by clip + TTS)
        const advance = () => {
            stopProgress();
            setProgress(100);
            const gap = gapSecondsRef.current * 1000;
            setTimeout(() => {
                const nextIndex = getNextIndex(index);
                if (nextIndex >= 0) playLine(nextIndex);
                else { setIsPlaying(false); setProgress(0); }
            }, gap);
        };

        // If this phrase has a registered CLIP, play the real audio (works in background on mobile).
        // When useClipAudio is OFF, skip the real audio and use TTS instead -- TTS does not grab the
        // MediaSession "now playing" slot, so background YouTube keeps playing.
        const clipUrl = useClipAudioRef.current ? clipUrlsRef.current[phrase.id] : undefined;
        if (clipUrl) {
            const audio = clipAudioRef.current;
            if (audio) {
                audio.src = clipUrl;
                audio.playbackRate = speed;
                if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
                    try {
                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: phrase.english, artist: phrase.japanese || 'CLIP', album: 'Training',
                        });
                    } catch { /* */ }
                }
                audio.onended = advance;
                audio.onerror = advance;
                audio.play().catch(() => advance());
                startProgress();
                return;
            }
        }

        // Otherwise fall back to TTS (synthesized voice)
        const utterance = new SpeechSynthesisUtterance(phrase.english);
        utterance.lang = 'en-US';
        utterance.rate = speed;
        const enVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
        if (enVoice) utterance.voice = enVoice;
        startProgress();
        utterance.onend = advance;
        utterance.onerror = () => { setIsPlaying(false); stopProgress(); };
        window.speechSynthesis.speak(utterance);
    }, [speed, voices]);

    const getNextIndex = (current: number): number => {
        const list = playlistRef.current;
        if (list.length === 0) return -1;

        if (repeatModeRef.current === 2) return current; // repeat one

        const next = current + 1;
        if (next >= list.length) {
            // Reached the end of the playlist. In shuffle modes every card has now been heard
            // this cycle, so buildPlaylist() resets playedIds and returns a fresh full shuffle --
            // a full-permutation walk (no draw-with-replacement), so nothing repeats until the
            // whole set has played once.
            if (shuffleModeRef.current !== 'off') {
                const fresh = buildPlaylistRef.current();
                playlistRef.current = fresh; // update synchronously so playLine(0) uses the new order
                setPlaylist(fresh);
                return 0;
            }

            if (repeatModeRef.current === 1) return 0; // repeat all

            if (autoNextDayRef.current && allDates.length > 1) {
                setTimeout(() => goToNextDay(), 1000);
            }
            return -1;
        }
        return next;
    };

    const goToNextDay = () => {
        if (allDates.length === 0) return;
        window.speechSynthesis.cancel();
        stopProgress();
        setIsPlaying(false);

        let nextIdx: number;
        if (shuffleDaysRef.current) {
            nextIdx = Math.floor(Math.random() * allDates.length);
        } else {
            nextIdx = currentDateIndex + 1;
            if (nextIdx >= allDates.length) nextIdx = 0;
        }
        router.push(`/english/training/${allDates[nextIdx]}?autoplay=true`);
    };

    const goToPrevDay = () => {
        if (allDates.length === 0) return;
        window.speechSynthesis.cancel();
        stopProgress();
        setIsPlaying(false);
        let prevIdx = currentDateIndex - 1;
        if (prevIdx < 0) prevIdx = allDates.length - 1;
        router.push(`/english/training/${allDates[prevIdx]}`);
    };

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            clipAudioRef.current?.pause();
            setIsPlaying(false);
            stopProgress();
            persistPlayed(); // flush heard-cards progress when the user stops
        } else {
            playLine(currentIndex);
        }
    };

    const playNext = () => {
        window.speechSynthesis.cancel();
        stopProgress();
        const next = (currentIndex + 1) % playlist.length;
        playLine(next);
    };

    const playPrevious = () => {
        window.speechSynthesis.cancel();
        stopProgress();
        const prev = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
        playLine(prev);
    };

    // Flip to another card without auto-playing audio (keeps the view light)
    const goToCard = (index: number) => {
        if (playlist.length === 0) return;
        window.speechSynthesis.cancel();
        if (clipAudioRef.current) clipAudioRef.current.pause();
        stopProgress();
        setIsPlaying(false);
        setProgress(0);
        setCurrentIndex((index + playlist.length) % playlist.length);
    };

    const toggleRepeat = () => {
        const next = (repeatMode + 1) % 3;
        repeatModeRef.current = next;
        setRepeatMode(next);
    };

    const cycleShuffleMode = () => {
        const modes: ShuffleMode[] = ['off', 'random', 'weighted'];
        const idx = modes.indexOf(shuffleMode);
        const next = modes[(idx + 1) % modes.length];
        setShuffleMode(next);
    };

    const toggleMasteryFilter = (level: MasteryLevel) => {
        setMasteryFilter(prev => {
            const next = new Set(prev);
            if (next.has(level)) {
                if (next.size > 1) next.delete(level); // keep at least 1
            } else {
                next.add(level);
            }
            return next;
        });
    };

    const reshuffle = () => {
        setPlaylist(buildPlaylist());
        setCurrentIndex(0);
    };

    // Wipe all heard-cards progress and start a brand-new full cycle from scratch.
    const resetProgress = () => {
        if (!window.confirm('聞いた記録を全部リセットして最初から再生し直す？')) return;
        window.speechSynthesis.cancel();
        clipAudioRef.current?.pause();
        stopProgress();
        setIsPlaying(false);
        playedIdsRef.current = new Set();
        playedCountRef.current = 0;
        persistPlayed();
        setPlaylist(buildPlaylist());
        setCurrentIndex(0);
    };

    const cycleMastery = async (phraseId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const current = phraseMastery[phraseId] || 0;
        const next = ((current + 1) % 4) as MasteryLevel;
        setPhraseMastery(prev => ({ ...prev, [phraseId]: next }));
        try {
            await fetch('/api/phrases/mastery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phraseId, level: next })
            });
        } catch (err) {
            console.error('Failed to save mastery:', err);
        }
    };

    const toggleSavePhrase = async (text: string, japanese: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (savedPhrases.has(text)) return;
        const result = await addPhraseToTraining(text, japanese || '', dateParam);
        if (result !== 'error') setSavedPhrases(prev => new Set(prev).add(text));
    };

    const getMasteryDisplay = (level: MasteryLevel) => {
        switch (level) {
            case 0: return { label: 'NEW', color: '#888', bg: '#f0f0f0' };
            case 1: return { label: '1', color: '#f59e0b', bg: '#fef3c7' };
            case 2: return { label: '2', color: '#3b82f6', bg: '#dbeafe' };
            case 3: return { label: 'CLEAR', color: '#10b981', bg: '#d1fae5' };
            default: return { label: 'NEW', color: '#888', bg: '#f0f0f0' };
        }
    };

    const openVocabModal = (english: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setVocabExample(english);
        setVocabWord('');
        setVocabMeaning('');
        setVocabType('word');
        setShowVocabModal(true);
    };

    const saveToVocabulary = async () => {
        if (!vocabWord.trim() || !vocabMeaning.trim()) return;
        setVocabSaving(true);
        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: vocabWord.trim(), type: vocabType,
                    meaning: vocabMeaning.trim(), example: vocabExample,
                    source: `Phrases: ${dateParam}`, date: vocabDate,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setShowVocabModal(false);
                setVocabWord(''); setVocabMeaning(''); setVocabExample('');
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch { alert('Error saving vocabulary'); }
        finally { setVocabSaving(false); }
    };

    // ── Mastery stats ──
    const masteryStats = useMemo(() => {
        const stats = { 0: 0, 1: 0, 2: 0, 3: 0 };
        scopePhrases.forEach(p => {
            const m = (phraseMastery[p.id] || 0) as MasteryLevel;
            stats[m]++;
        });
        return stats;
    }, [scopePhrases, phraseMastery]);

    const currentPhrase = playlist[currentIndex];
    const shuffleLabel = shuffleMode === 'off' ? 'SEQ' : shuffleMode === 'random' ? 'RND' : 'WGT';

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#A8A29E', fontSize: '13px' }}>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#dc2626', fontSize: '13px' }}>{error}</span>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', color: '#1C1917' }}>
            {/* Persistent audio element for registered CLIPs (background playback on mobile) */}
            <audio ref={clipAudioRef} preload="auto" playsInline />
            {/* Header */}
            <div style={{
                padding: '12px 20px', borderBottom: '1px solid #F5F5F4', backgroundColor: '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <button
                    onClick={() => { window.speechSynthesis.cancel(); stopProgress(); window.location.href = '/english/training'; }}
                    style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', fontSize: '13px' }}
                >
                    Back
                </button>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{
                            padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                            border: showSettings ? '1px solid #B8960C' : '1px solid #E7E5E4',
                            backgroundColor: showSettings ? '#FFFBEB' : '#fff',
                            color: showSettings ? '#B8960C' : '#78716C', cursor: 'pointer',
                        }}
                    >
                        Settings
                    </button>
                    {savedPhrases.size > 0 && (
                        <span
                            style={{
                                border: '1px solid #B8960C', color: '#B8960C',
                                padding: '5px 10px', borderRadius: '6px',
                                fontSize: '11px', fontWeight: 600,
                            }}
                        >
                            Added {savedPhrases.size}
                        </span>
                    )}
                </div>
            </div>

            <div style={{ padding: '16px 20px', maxWidth: '640px', margin: '0 auto' }}>
                {/* ── Date + Scope Header ── */}
                <div style={{ marginBottom: '16px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
                        {playScope === 'month'
                            ? formatMonthDisplay(selectedMonth)
                            : playScope === 'all'
                                ? 'All Phrases'
                                : `${formatDateDisplay(dateParam)} (${getDayOfWeek(dateParam)})`
                        }
                    </h1>

                    {/* Mastery breakdown */}
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#78716C' }}>
                        <span style={{ color: '#A8A29E' }}>NEW {masteryStats[0]}</span>
                        <span style={{ color: '#f59e0b' }}>1: {masteryStats[1]}</span>
                        <span style={{ color: '#3b82f6' }}>2: {masteryStats[2]}</span>
                        <span style={{ color: '#10b981' }}>CLEAR {masteryStats[3]}</span>
                        <span style={{ color: '#57534E', fontWeight: 600 }}>
                            Playing: {playlist.length}/{scopePhrases.length}
                        </span>
                    </div>
                </div>

                {/* ── Settings Panel ── */}
                {showSettings && (
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #F5F5F4',
                        padding: '16px', marginBottom: '16px',
                    }}>
                        {/* Scope */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                SCOPE
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {([
                                    { key: 'day' as PlayScope, label: 'Day' },
                                    { key: 'month' as PlayScope, label: 'Month' },
                                    { key: 'all' as PlayScope, label: 'All' },
                                ]).map(s => (
                                    <button key={s.key} onClick={() => setPlayScope(s.key)} style={{
                                        padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                        border: playScope === s.key ? '1px solid #B8960C' : '1px solid #E7E5E4',
                                        backgroundColor: playScope === s.key ? '#FFFBEB' : '#fff',
                                        color: playScope === s.key ? '#B8960C' : '#78716C', cursor: 'pointer',
                                    }}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                            {playScope === 'month' && (
                                <select
                                    value={selectedMonth}
                                    onChange={e => setSelectedMonth(e.target.value)}
                                    style={{
                                        marginTop: '8px', padding: '6px 10px', borderRadius: '6px',
                                        border: '1px solid #E7E5E4', fontSize: '12px', color: '#57534E',
                                    }}
                                >
                                    {availableMonths.map(m => (
                                        <option key={m} value={m}>{formatMonthDisplay(m)}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Mastery Filter */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                MASTERY FILTER (tap to toggle)
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {([0, 1, 2, 3] as MasteryLevel[]).map(level => {
                                    const d = getMasteryDisplay(level);
                                    const active = masteryFilter.has(level);
                                    return (
                                        <button key={level} onClick={() => toggleMasteryFilter(level)} style={{
                                            padding: '6px 14px', fontSize: '11px', fontWeight: 700, borderRadius: '6px',
                                            border: active ? `2px solid ${d.color}` : '1px solid #E7E5E4',
                                            backgroundColor: active ? d.bg : '#FAFAF9',
                                            color: active ? d.color : '#D6D3D1', cursor: 'pointer',
                                            opacity: active ? 1 : 0.5,
                                        }}>
                                            {d.label} ({masteryStats[level]})
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Shuffle Mode */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                SHUFFLE
                            </div>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                {([
                                    { key: 'off' as ShuffleMode, label: 'Sequential', desc: 'Order as listed' },
                                    { key: 'random' as ShuffleMode, label: 'Random', desc: 'Pure random' },
                                ]).map(s => (
                                    <button key={s.key} onClick={() => setShuffleMode(s.key)} style={{
                                        padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                        border: shuffleMode === s.key ? '1px solid #B8960C' : '1px solid #E7E5E4',
                                        backgroundColor: shuffleMode === s.key ? '#FFFBEB' : '#fff',
                                        color: shuffleMode === s.key ? '#B8960C' : '#78716C', cursor: 'pointer',
                                    }}>
                                        {s.label}
                                    </button>
                                ))}
                                {shuffleMode !== 'off' && (
                                    <button onClick={reshuffle} style={{
                                        padding: '5px 10px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                        color: '#78716C', cursor: 'pointer',
                                    }}>
                                        Reshuffle
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Progress (heard cards) */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                PROGRESS
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#57534E' }}>
                                    聞いた {filteredPhrases.filter(p => playedIdsRef.current.has(p.id)).length} / {filteredPhrases.length} 枚
                                </span>
                                <button onClick={resetProgress} style={{
                                    padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                    border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                    color: '#B91C1C', cursor: 'pointer', marginLeft: 'auto',
                                }}>
                                    進捗リセット
                                </button>
                            </div>
                        </div>

                        {/* Speed */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                SPEED: {speed.toFixed(2)}x
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>0.5</span>
                                <input type="range" min="0.5" max="1.5" step="0.05" value={speed}
                                    onChange={e => setSpeed(parseFloat(e.target.value))}
                                    style={{ flex: 1, accentColor: '#B8960C' }}
                                />
                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>1.5</span>
                            </div>
                        </div>

                        {/* Gap between phrases */}
                        <div style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px', marginBottom: '6px' }}>
                                GAP: {gapSeconds.toFixed(1)}s
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>0</span>
                                <input type="range" min="0" max="5" step="0.5" value={gapSeconds}
                                    onChange={e => setGapSeconds(parseFloat(e.target.value))}
                                    style={{ flex: 1, accentColor: '#B8960C' }}
                                />
                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>5s</span>
                            </div>
                        </div>

                        {/* Other toggles */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button onClick={() => setShowJapanese(!showJapanese)} style={{
                                padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                border: showJapanese ? '1px solid #B8960C' : '1px solid #E7E5E4',
                                backgroundColor: showJapanese ? '#FFFBEB' : '#fff',
                                color: showJapanese ? '#B8960C' : '#78716C', cursor: 'pointer',
                            }}>
                                JP {showJapanese ? 'ON' : 'OFF'}
                            </button>
                            <button onClick={() => setClipsOnly(!clipsOnly)} style={{
                                padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                border: clipsOnly ? '1px solid #7C3AED' : '1px solid #E7E5E4',
                                backgroundColor: clipsOnly ? '#F5F3FF' : '#fff',
                                color: clipsOnly ? '#7C3AED' : '#78716C', cursor: 'pointer',
                            }}>
                                CLIPのみ {clipsOnly ? 'ON' : 'OFF'}
                            </button>
                            <button onClick={() => setUseClipAudio(!useClipAudio)} style={{
                                padding: '5px 12px', fontSize: '11px', fontWeight: 600, borderRadius: '6px',
                                border: useClipAudio ? '1px solid #7C3AED' : '1px solid #E7E5E4',
                                backgroundColor: useClipAudio ? '#F5F3FF' : '#fff',
                                color: useClipAudio ? '#7C3AED' : '#78716C', cursor: 'pointer',
                            }}>
                                {useClipAudio ? 'CLIP音声 ON' : 'CLIP音声 OFF (TTS)'}
                            </button>
                        </div>
                        {!useClipAudio && (
                            <div style={{ marginTop: '8px', fontSize: '10px', color: '#A8A29E', lineHeight: 1.5 }}>
                                CLIP音声 OFF: クリップ登録済みでもTTSで再生します。MediaSessionを使わないので、バックグラウンドのYouTube等が止まりません。
                            </div>
                        )}
                    </div>
                )}

                {/* ── Day Navigation (only in day scope) ── */}
                {playScope === 'day' && allDates.length > 1 && (
                    <div style={{
                        marginBottom: '16px', padding: '12px',
                        backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #F5F5F4',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', color: '#A8A29E', letterSpacing: '1px' }}>
                                DAY {currentDateIndex + 1} / {allDates.length}
                            </span>
                            <select
                                value={autoNextDay ? (shuffleDays ? 'shuffle' : 'auto') : 'off'}
                                onChange={e => {
                                    const val = e.target.value;
                                    setAutoNextDay(val !== 'off');
                                    setShuffleDays(val === 'shuffle');
                                }}
                                style={{
                                    background: autoNextDay ? '#B8960C' : '#fff',
                                    border: autoNextDay ? 'none' : '1px solid #E7E5E4',
                                    color: autoNextDay ? '#fff' : '#A8A29E', cursor: 'pointer',
                                    padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                }}
                            >
                                <option value="off">MANUAL</option>
                                <option value="auto">AUTO NEXT</option>
                                <option value="shuffle">SHUFFLE DAYS</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={goToPrevDay} style={{
                                flex: 1, background: 'none', border: '1px solid #E7E5E4', color: '#57534E',
                                cursor: 'pointer', padding: '10px', borderRadius: '8px', fontSize: '13px',
                            }}>
                                Prev
                            </button>
                            <button onClick={goToNextDay} style={{
                                flex: 1, background: 'none', border: '1px solid #E7E5E4', color: '#57534E',
                                cursor: 'pointer', padding: '10px', borderRadius: '8px', fontSize: '13px',
                            }}>
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Now Playing ── */}
                {playlist.length > 0 && (
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '12px', padding: '16px 20px',
                        marginBottom: '16px', border: '1px solid #F5F5F4',
                    }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            marginBottom: '8px',
                        }}>
                            <span style={{ fontSize: '10px', color: '#B8960C', letterSpacing: '1px', fontWeight: 700 }}>
                                NOW PLAYING
                            </span>
                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                {currentIndex + 1} / {playlist.length}
                                {shuffleMode !== 'off' && ` [${shuffleLabel}]`}
                            </span>
                        </div>
                        <div style={{ fontSize: '18px', color: '#1C1917', lineHeight: 1.6, fontWeight: 500, marginBottom: '4px' }}>
                            {currentPhrase?.english || 'Select a phrase'}
                        </div>
                        {showJapanese && (
                            <div style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.5 }}>
                                {currentPhrase?.japanese || ''}
                            </div>
                        )}
                        {currentPhrase && (
                            <div style={{ marginTop: '6px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                                {(() => {
                                    const m = (phraseMastery[currentPhrase.id] || 0) as MasteryLevel;
                                    const d = getMasteryDisplay(m);
                                    return (
                                        <span style={{
                                            fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                                            borderRadius: '4px', backgroundColor: d.bg, color: d.color,
                                        }}>
                                            {d.label}
                                        </span>
                                    );
                                })()}
                                {clipUrls[currentPhrase.id] && (
                                    <span style={{
                                        fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                                        borderRadius: '4px', backgroundColor: '#F5F3FF', color: '#7C3AED',
                                    }}>
                                        CLIP
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Progress Bar ── */}
                {playlist.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ height: '3px', backgroundColor: '#E7E5E4', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#B8960C', transition: 'width 0.05s linear' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: '#A8A29E' }}>
                            <span>{currentIndex + 1} / {playlist.length}</span>
                            <span>{speed.toFixed(2)}x / gap {gapSeconds.toFixed(1)}s</span>
                        </div>
                    </div>
                )}

                {/* ── Playback Controls ── */}
                {playlist.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
                        {/* Shuffle indicator */}
                        <button onClick={cycleShuffleMode} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
                            color: shuffleMode !== 'off' ? '#B8960C' : '#D6D3D1',
                            fontSize: '11px', fontWeight: 700,
                        }}>
                            {shuffleLabel}
                        </button>
                        <button onClick={playPrevious} style={{ background: 'none', border: 'none', color: '#57534E', cursor: 'pointer', padding: '8px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                            </svg>
                        </button>
                        <button onClick={togglePlay} style={{
                            width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#B8960C',
                            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '2px' }}>
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        <button onClick={playNext} style={{ background: 'none', border: 'none', color: '#57534E', cursor: 'pointer', padding: '8px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                            </svg>
                        </button>
                        <button onClick={toggleRepeat} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: '8px', position: 'relative',
                            color: repeatMode > 0 ? '#B8960C' : '#D6D3D1',
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                            </svg>
                            {repeatMode === 2 && (
                                <span style={{ position: 'absolute', fontSize: '8px', fontWeight: 900, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#B8960C' }}>1</span>
                            )}
                        </button>
                    </div>
                )}

                {/* ── Current Card (one at a time, keeps the page light) ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#A8A29E', letterSpacing: '1px' }}>
                        CARD {playlist.length > 0 ? currentIndex + 1 : 0} / {playlist.length}
                    </span>
                    {shuffleMode !== 'off' && (
                        <button onClick={reshuffle} style={{
                            padding: '3px 8px', fontSize: '10px', border: '1px solid #E7E5E4',
                            borderRadius: '4px', backgroundColor: '#fff', color: '#78716C', cursor: 'pointer',
                        }}>
                            Reshuffle
                        </button>
                    )}
                </div>

                {currentPhrase && (() => {
                    const phrase = currentPhrase;
                    const mastery = (phraseMastery[phrase.id] || 0) as MasteryLevel;
                    const masteryDisplay = getMasteryDisplay(mastery);
                    const isSaved = savedPhrases.has(phrase.english);

                    return (
                        <div style={{
                            backgroundColor: '#fff', borderRadius: '12px',
                            border: '1px solid #FDE68A', padding: '20px',
                        }}>
                            {/* Tap-to-play body */}
                            <div
                                onClick={() => { window.speechSynthesis.cancel(); stopProgress(); playLine(currentIndex); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div style={{ fontSize: '20px', lineHeight: 1.6, color: '#1C1917', fontWeight: 500, marginBottom: '6px' }}>
                                    {phrase.english}
                                    {clipUrls[phrase.id] && (
                                        <span style={{
                                            marginLeft: '8px', fontSize: '9px', fontWeight: 700, padding: '2px 6px',
                                            borderRadius: '3px', backgroundColor: '#F5F3FF', color: '#7C3AED',
                                            verticalAlign: 'middle',
                                        }}>
                                            CLIP
                                        </span>
                                    )}
                                </div>
                                {showJapanese && (
                                    <div style={{ fontSize: '14px', color: '#78716C', lineHeight: 1.5 }}>
                                        {phrase.japanese}
                                    </div>
                                )}
                                {playScope !== 'day' && (
                                    <div style={{ fontSize: '11px', color: '#D6D3D1', marginTop: '4px' }}>
                                        {formatDateDisplay(phrase.date)}
                                    </div>
                                )}
                            </div>

                            {/* Action row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={e => cycleMastery(phrase.id, e)}
                                    style={{
                                        background: masteryDisplay.bg, border: 'none', borderRadius: '6px',
                                        padding: '6px 12px', fontSize: '11px', color: masteryDisplay.color,
                                        cursor: 'pointer', fontWeight: 700,
                                    }}
                                >
                                    {masteryDisplay.label}
                                </button>
                                <VoiceRecorder
                                    phraseId={phrase.id}
                                    recordings={voiceRecordings[phrase.id] || []}
                                    onRecordingComplete={(recording) => {
                                        setVoiceRecordings(prev => ({
                                            ...prev,
                                            [phrase.id]: [recording, ...(prev[phrase.id] || [])]
                                        }));
                                    }}
                                    onRecordingDelete={(id) => {
                                        setVoiceRecordings(prev => ({
                                            ...prev,
                                            [phrase.id]: (prev[phrase.id] || []).filter(r => r.id !== id)
                                        }));
                                    }}
                                />
                                <button
                                    onClick={e => openVocabModal(phrase.english, e)}
                                    style={{
                                        background: 'none', border: '1px solid #10B981', borderRadius: '4px',
                                        cursor: 'pointer', padding: '5px 10px', fontSize: '11px',
                                        color: '#10B981', fontWeight: 600,
                                    }}
                                >
                                    +V
                                </button>
                                <button
                                    onClick={e => toggleSavePhrase(phrase.english, phrase.japanese, e)}
                                    title={isSaved ? 'Added to training' : 'Add to training'}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        padding: '2px', fontSize: '18px', color: isSaved ? '#B8960C' : '#E7E5E4',
                                        marginLeft: 'auto',
                                    }}
                                >
                                    {isSaved ? '\u2605' : '\u2606'}
                                </button>
                            </div>

                            {/* Flip nav (no auto-play) */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <button onClick={() => goToCard(currentIndex - 1)} style={{
                                    flex: 1, background: '#fff', border: '1px solid #E7E5E4', color: '#57534E',
                                    cursor: 'pointer', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                                }}>
                                    Prev card
                                </button>
                                <button onClick={() => goToCard(currentIndex + 1)} style={{
                                    flex: 1, background: '#fff', border: '1px solid #E7E5E4', color: '#57534E',
                                    cursor: 'pointer', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                                }}>
                                    Next card
                                </button>
                            </div>
                        </div>
                    );
                })()}

                {playlist.length === 0 && scopePhrases.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 24px', backgroundColor: '#D1FAE5', borderRadius: '12px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#10b981', marginBottom: '8px' }}>
                            No phrases match current filter
                        </div>
                        <p style={{ fontSize: '13px', color: '#059669', margin: 0 }}>
                            Adjust mastery filter in Settings to include more levels.
                        </p>
                    </div>
                )}

                {playlist.length === 0 && scopePhrases.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#A8A29E', fontSize: '13px' }}>
                        No phrases for this {playScope === 'day' ? 'date' : playScope === 'month' ? 'month' : 'selection'}.
                    </div>
                )}
            </div>

            <div style={{ height: '100px' }} />

            {/* ── Vocabulary Save Modal ── */}
            {showVocabModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
                }}>
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '16px', padding: '24px',
                        maxWidth: '400px', width: '100%', maxHeight: '90vh', overflow: 'auto',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Save to Vocabulary</h3>
                            <button onClick={() => setShowVocabModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}>
                                x
                            </button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Example Sentence</label>
                            <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                                {vocabExample}
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Date</label>
                            <input type="date" value={vocabDate} onChange={e => setVocabDate(e.target.value)}
                                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Word / Phrase *</label>
                            <input type="text" value={vocabWord} onChange={e => setVocabWord(e.target.value)}
                                placeholder="e.g., rabbit hole"
                                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Type</label>
                            <select value={vocabType} onChange={e => setVocabType(e.target.value)}
                                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                                <option value="word">Word</option>
                                <option value="idiom">Idiom</option>
                                <option value="phrasal verb">Phrasal Verb</option>
                                <option value="slang">Slang</option>
                                <option value="expression">Expression</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Meaning (Japanese) *</label>
                            <input type="text" value={vocabMeaning} onChange={e => setVocabMeaning(e.target.value)}
                                placeholder="e.g., 深みにはまる"
                                style={{ width: '100%', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setShowVocabModal(false)} style={{
                                flex: 1, padding: '14px', backgroundColor: '#f5f5f5', border: 'none',
                                borderRadius: '8px', fontSize: '14px', cursor: 'pointer', color: '#666',
                            }}>Cancel</button>
                            <button onClick={saveToVocabulary}
                                disabled={vocabSaving || !vocabWord.trim() || !vocabMeaning.trim()}
                                style={{
                                    flex: 1, padding: '14px', border: 'none', borderRadius: '8px',
                                    fontSize: '14px', fontWeight: 600, color: '#fff',
                                    backgroundColor: (!vocabWord.trim() || !vocabMeaning.trim()) ? '#ccc' : '#10B981',
                                    cursor: (!vocabWord.trim() || !vocabMeaning.trim()) ? 'not-allowed' : 'pointer',
                                }}>
                                {vocabSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
