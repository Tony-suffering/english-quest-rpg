'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { HealthJournalStorage } from '@/lib/health-journal-storage';
import { HealthJournalEntry } from '@/types/health-journal';
import { SavedPhrasesStorage } from '@/lib/saved-phrases';

type ThemeMode = 'dark' | 'light';
type LineMode = 'sequential' | 'shuffle' | 'repeat-one';
type ArticleMode = 'manual' | 'auto' | 'shuffle';

const themes = {
    dark: {
        bg: '#0a0a0a',
        bgSecondary: '#1a1a1a',
        bgTertiary: '#141414',
        text: '#fff',
        textSecondary: '#888',
        textMuted: '#666',
        border: '#1a1a1a',
        borderLight: '#333',
        accent: '#10B981',
        success: '#10b981',
    },
    light: {
        bg: '#f5f5f5',
        bgSecondary: '#ffffff',
        bgTertiary: '#fafafa',
        text: '#1a1a1a',
        textSecondary: '#555',
        textMuted: '#666',
        border: '#e5e5e5',
        borderLight: '#d5d5d5',
        accent: '#059669',
        success: '#059669',
    },
};

export default function HealthJournalDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Entry state
    const [entry, setEntry] = useState<HealthJournalEntry | null>(null);
    const [allEntries, setAllEntries] = useState<HealthJournalEntry[]>([]);
    const [currentEntryIndex, setCurrentEntryIndex] = useState(-1);

    // Playback state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(0.9);
    const [playedCount, setPlayedCount] = useState(0);

    // Mode state
    const [lineMode, setLineMode] = useState<LineMode>('sequential');
    const [articleMode, setArticleMode] = useState<ArticleMode>('manual');

    // UI state
    const [theme, setTheme] = useState<ThemeMode>('light');
    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [trainerVoice, setTrainerVoice] = useState<string>('');
    const [yourVoice, setYourVoice] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'english' | 'report' | 'tips'>('english');

    // Phrase saving
    const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveExample, setSaveExample] = useState<string>('');
    const [saveWord, setSaveWord] = useState('');
    const [saveMeaning, setSaveMeaning] = useState('');
    const [saveType, setSaveType] = useState('word');
    const [isSavingPhrase, setIsSavingPhrase] = useState(false);

    // Refs for callbacks
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lineModeRef = useRef<LineMode>('sequential');
    const articleModeRef = useRef<ArticleMode>('manual');
    const allEntriesRef = useRef<HealthJournalEntry[]>([]);
    const currentEntryIndexRef = useRef(-1);
    const entryRef = useRef<HealthJournalEntry | null>(null);
    const playedCountRef = useRef(0);

    const t = themes[theme];

    // Keep refs in sync
    useEffect(() => { lineModeRef.current = lineMode; }, [lineMode]);
    useEffect(() => { articleModeRef.current = articleMode; }, [articleMode]);
    useEffect(() => { allEntriesRef.current = allEntries; }, [allEntries]);
    useEffect(() => { currentEntryIndexRef.current = currentEntryIndex; }, [currentEntryIndex]);
    useEffect(() => { entryRef.current = entry; }, [entry]);
    useEffect(() => { playedCountRef.current = playedCount; }, [playedCount]);

    // Load settings from localStorage
    useEffect(() => {
        const savedLineMode = localStorage.getItem('health_lineMode') as LineMode | null;
        const savedArticleMode = localStorage.getItem('health_articleMode') as ArticleMode | null;
        const savedSpeed = localStorage.getItem('health_speed');
        const savedTheme = localStorage.getItem('health_theme') as ThemeMode | null;

        if (savedLineMode && ['sequential', 'shuffle', 'repeat-one'].includes(savedLineMode)) {
            setLineMode(savedLineMode);
            lineModeRef.current = savedLineMode;
        }
        if (savedArticleMode && ['manual', 'auto', 'shuffle'].includes(savedArticleMode)) {
            setArticleMode(savedArticleMode);
            articleModeRef.current = savedArticleMode;
        }
        if (savedSpeed) setSpeed(parseFloat(savedSpeed));
        if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);

        setSettingsLoaded(true);
    }, []);

    // Save settings to localStorage
    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('health_lineMode', lineMode);
    }, [lineMode, settingsLoaded]);

    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('health_articleMode', articleMode);
    }, [articleMode, settingsLoaded]);

    useEffect(() => {
        if (!settingsLoaded) return;
        localStorage.setItem('health_speed', speed.toString());
    }, [speed, settingsLoaded]);

    // Load all entries
    useEffect(() => {
        const loadAllEntries = async () => {
            const data = await HealthJournalStorage.getAll();
            const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setAllEntries(sorted);
            allEntriesRef.current = sorted;
        };
        loadAllEntries();
    }, []);

    // Load entry
    useEffect(() => {
        const id = params?.id as string;
        if (!id) return;

        const loadEntry = async () => {
            const data = await HealthJournalStorage.getById(id);
            if (!data) {
                router.push('/health-journal');
                return;
            }
            setEntry(data);
            entryRef.current = data;
            setCurrentIndex(0);
            setPlayedCount(0);
            playedCountRef.current = 0;
        };

        loadEntry();
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Auto refresh for generated content
        const interval = setInterval(loadEntry, 5000);

        return () => {
            clearInterval(interval);
            window.speechSynthesis.cancel();
            stopProgress();
        };
    }, [params, router]);

    // Update entry index
    useEffect(() => {
        if (entry && allEntries.length > 0) {
            const idx = allEntries.findIndex(e => e.id === entry.id);
            setCurrentEntryIndex(idx);
            currentEntryIndexRef.current = idx;
        }
    }, [entry, allEntries]);

    // Auto-play on navigation
    useEffect(() => {
        const autoplay = searchParams?.get('autoplay');
        const hasConversation = entry?.englishTranslation?.conversation?.length && entry.englishTranslation.conversation.length > 0;
        if (entry && autoplay === 'true' && hasConversation) {
            const timer = setTimeout(() => {
                playLine(0);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [entry, searchParams]);

    // Load saved phrases
    useEffect(() => {
        const saved = SavedPhrasesStorage.getAll();
        setSavedPhrases(new Set(saved.map(p => p.english)));
    }, []);

    const loadVoices = () => {
        const allVoices = window.speechSynthesis.getVoices();
        const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
        setVoices(enVoices);

        if (!trainerVoice && enVoices.length > 0) {
            const defaultTrainer = enVoices.find(v => v.name.includes('Google US English') || v.name.includes('Male')) || enVoices[0];
            setTrainerVoice(defaultTrainer.name);
        }
        if (!yourVoice && enVoices.length > 0) {
            const defaultYou = enVoices.find(v => v.name.includes('Female')) || enVoices[1] || enVoices[0];
            setYourVoice(defaultYou.name);
        }
    };

    const getVoiceByName = (name: string) => {
        const allVoices = window.speechSynthesis.getVoices();
        const selected = allVoices.find(v => v.name === name);
        if (selected) return selected;
        const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
        if (enVoices.length > 0) {
            return enVoices.find(v => v.name.includes('Google US English')) || enVoices[0];
        }
        return allVoices.find(v => v.lang.includes('en')) || null;
    };

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

    // Navigate to next entry
    const goToNextEntry = useCallback(() => {
        const entries = allEntriesRef.current;
        const currentIdx = currentEntryIndexRef.current;
        const mode = articleModeRef.current;

        if (entries.length === 0 || mode === 'manual') return;

        window.speechSynthesis.cancel();
        stopProgress();
        setIsPlaying(false);

        let nextIdx: number;
        if (mode === 'shuffle') {
            do {
                nextIdx = Math.floor(Math.random() * entries.length);
            } while (nextIdx === currentIdx && entries.length > 1);
        } else {
            nextIdx = currentIdx + 1;
            if (nextIdx >= entries.length) nextIdx = 0;
        }

        const nextEntry = entries[nextIdx];
        if (nextEntry) {
            router.push(`/health-journal/${nextEntry.id}?autoplay=true`);
        }
    }, [router]);

    // Get next line index
    const getNextIndex = useCallback((current: number): number => {
        const currentEntry = entryRef.current;
        if (!currentEntry?.englishTranslation?.conversation) return -1;

        const total = currentEntry.englishTranslation.conversation.length;
        const mode = lineModeRef.current;
        const played = playedCountRef.current;

        if (mode === 'repeat-one') return current;

        if (mode === 'shuffle') {
            if (played >= total) {
                const artMode = articleModeRef.current;
                if (artMode !== 'manual' && allEntriesRef.current.length > 1) {
                    setTimeout(() => goToNextEntry(), 1000);
                }
                return -1;
            }
            return Math.floor(Math.random() * total);
        }

        const next = current + 1;
        if (next >= total) {
            const artMode = articleModeRef.current;
            if (artMode !== 'manual' && allEntriesRef.current.length > 1) {
                setTimeout(() => goToNextEntry(), 1000);
            }
            return -1;
        }
        return next;
    }, [goToNextEntry]);

    // Play a specific line
    const playLine = useCallback((index: number) => {
        const currentEntry = entryRef.current;
        if (!currentEntry?.englishTranslation?.conversation || index < 0 || index >= currentEntry.englishTranslation.conversation.length) {
            setIsPlaying(false);
            stopProgress();
            return;
        }

        const line = currentEntry.englishTranslation.conversation[index];
        const utterance = new SpeechSynthesisUtterance(line.text);

        const voiceName = line.speaker === 'trainer' ? trainerVoice : yourVoice;
        const voice = getVoiceByName(voiceName);
        if (voice) utterance.voice = voice;

        utterance.lang = 'en-US';
        utterance.rate = speed;

        setCurrentIndex(index);
        setIsPlaying(true);
        setPlayedCount(prev => prev + 1);
        playedCountRef.current += 1;
        startProgress();

        utterance.onend = () => {
            stopProgress();
            setProgress(100);

            setTimeout(() => {
                const nextIndex = getNextIndex(index);
                if (nextIndex >= 0) {
                    playLine(nextIndex);
                } else {
                    setIsPlaying(false);
                    setProgress(0);
                    setPlayedCount(0);
                    playedCountRef.current = 0;
                }
            }, 500);
        };

        utterance.onerror = () => {
            stopProgress();
            setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [trainerVoice, yourVoice, speed, getNextIndex]);

    const goToPrevEntry = () => {
        if (allEntries.length === 0) return;
        window.speechSynthesis.cancel();
        stopProgress();
        setIsPlaying(false);

        let prevIdx = currentEntryIndex - 1;
        if (prevIdx < 0) prevIdx = allEntries.length - 1;

        const prevEntry = allEntries[prevIdx];
        if (prevEntry) {
            router.push(`/health-journal/${prevEntry.id}`);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            stopProgress();
        } else {
            setPlayedCount(0);
            playedCountRef.current = 0;
            playLine(currentIndex);
        }
    };

    const playNext = () => {
        window.speechSynthesis.cancel();
        stopProgress();
        const total = entry?.englishTranslation?.conversation?.length || 0;
        const next = (currentIndex + 1) % total;
        setPlayedCount(0);
        playedCountRef.current = 0;
        playLine(next);
    };

    const playPrevious = () => {
        window.speechSynthesis.cancel();
        stopProgress();
        const total = entry?.englishTranslation?.conversation?.length || 1;
        const prev = currentIndex <= 0 ? total - 1 : currentIndex - 1;
        setPlayedCount(0);
        playedCountRef.current = 0;
        playLine(prev);
    };

    const cycleLineMode = () => {
        const modes: LineMode[] = ['sequential', 'shuffle', 'repeat-one'];
        const currentIdx = modes.indexOf(lineMode);
        const nextMode = modes[(currentIdx + 1) % modes.length];
        setLineMode(nextMode);
        lineModeRef.current = nextMode;
    };

    const toggleSavePhrase = (text: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (savedPhrases.has(text)) {
            const all = SavedPhrasesStorage.getAll();
            const found = all.find(p => p.english === text);
            if (found) SavedPhrasesStorage.remove(found.id);
            setSavedPhrases(prev => {
                const next = new Set(prev);
                next.delete(text);
                return next;
            });
        } else {
            const conv = entry?.englishTranslation?.conversation || [];
            const line = conv.find(l => l.english === text);
            SavedPhrasesStorage.save({
                english: text,
                ...(line?.japanese ? { japanese: line.japanese } : {}),
                source: entry ? `Health: ${entry.title}` : 'Health Journal',
            });
            setSavedPhrases(prev => new Set(prev).add(text));
        }
    };

    const openVocabModal = (text: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSaveExample(text);
        setSaveWord('');
        setSaveMeaning('');
        setSaveType('word');
        setShowSaveModal(true);
    };

    const saveToVocabulary = async () => {
        if (!saveWord.trim() || !saveMeaning.trim()) return;
        setIsSavingPhrase(true);
        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: saveWord.trim(),
                    type: saveType,
                    meaning: saveMeaning,
                    example: saveExample,
                    source: entry ? `Health: ${entry.title}` : 'Health Journal',
                }),
            });
            if (res.ok || res.status === 409) {
                setShowSaveModal(false);
            }
        } finally {
            setIsSavingPhrase(false);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('health_theme', newTheme);
    };

    if (!entry) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: t.bg, color: t.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>Loading...</div>
            </div>
        );
    }

    const conversation = entry.englishTranslation?.conversation || [];
    const currentLine = conversation[currentIndex];
    const hasTips = entry.healthInsights?.tips && entry.healthInsights.tips.length > 0;

    const categoryColors: Record<string, { bg: string; text: string }> = {
        nutrition: { bg: '#fef3c7', text: '#92400e' },
        exercise: { bg: '#dbeafe', text: '#1e40af' },
        sleep: { bg: '#ede9fe', text: '#5b21b6' },
        mental: { bg: '#fce7f3', text: '#9d174d' },
        general: { bg: '#f3f4f6', text: '#374151' },
    };

    return (
        <div style={{
            height: '100%',
            backgroundColor: t.bg,
            color: t.text,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '12px 20px',
                borderBottom: `1px solid ${t.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0
            }}>
                <button
                    onClick={() => {
                        window.speechSynthesis.cancel();
                        stopProgress();
                        setIsPlaying(false);
                        router.push('/health-journal');
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: t.textMuted,
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>&#8249;</span> Back
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {savedPhrases.size > 0 && (
                        <button
                            onClick={() => router.push('/english/bookmarks')}
                            style={{
                                background: 'none',
                                border: `1px solid ${t.accent}`,
                                color: t.accent,
                                cursor: 'pointer',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span>★</span>
                            <span>{savedPhrases.size}</span>
                        </button>
                    )}
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'none',
                            border: `1px solid ${t.borderLight}`,
                            color: t.textMuted,
                            cursor: 'pointer',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            fontSize: '11px'
                        }}
                    >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                </div>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                WebkitOverflowScrolling: 'touch'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {/* Entry Info */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', color: t.accent, fontWeight: '500', marginBottom: '6px' }}>
                            {new Date(entry.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.3', margin: 0 }}>{entry.title}</h1>
                    </div>

                    {/* Article Navigation */}
                    {allEntries.length > 1 && (
                        <div style={{
                            marginBottom: '24px',
                            padding: '16px',
                            backgroundColor: t.bgSecondary,
                            borderRadius: '12px',
                            border: `1px solid ${t.borderLight}`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ fontSize: '11px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Entry {currentEntryIndex + 1} / {allEntries.length}
                                </span>
                                <select
                                    value={articleMode}
                                    onChange={(e) => {
                                        const mode = e.target.value as ArticleMode;
                                        setArticleMode(mode);
                                        articleModeRef.current = mode;
                                    }}
                                    style={{
                                        background: t.bgSecondary,
                                        border: `1px solid ${articleMode !== 'manual' ? t.accent : t.borderLight}`,
                                        color: articleMode !== 'manual' ? t.accent : t.textMuted,
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        fontWeight: '600'
                                    }}
                                >
                                    <option value="manual">MANUAL</option>
                                    <option value="auto">AUTO NEXT</option>
                                    <option value="shuffle">SHUFFLE</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    onClick={goToPrevEntry}
                                    style={{
                                        flex: 1,
                                        background: 'none',
                                        border: `1px solid ${t.borderLight}`,
                                        color: t.text,
                                        cursor: 'pointer',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                    </svg>
                                    Prev
                                </button>
                                <button
                                    onClick={goToNextEntry}
                                    style={{
                                        flex: 1,
                                        background: 'none',
                                        border: `1px solid ${t.borderLight}`,
                                        color: t.text,
                                        cursor: 'pointer',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    Next
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div style={{
                        display: 'flex',
                        backgroundColor: t.bgSecondary,
                        borderRadius: '12px',
                        padding: '4px',
                        marginBottom: '24px'
                    }}>
                        {[
                            { id: 'english', label: 'English', count: conversation.length },
                            { id: 'report', label: 'Report', count: null },
                            { id: 'tips', label: 'Tips', count: hasTips ? entry.healthInsights!.tips.length : 0 },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                style={{
                                    flex: 1,
                                    padding: '10px 8px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: activeTab === tab.id ? t.accent : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : t.textMuted,
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                {tab.label}
                                {tab.count !== null && tab.count > 0 && (
                                    <span style={{
                                        backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.3)' : t.borderLight,
                                        padding: '2px 6px',
                                        borderRadius: '8px',
                                        fontSize: '10px'
                                    }}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* English Tab */}
                    {activeTab === 'english' && (
                        <>
                            {conversation.length > 0 ? (
                                <>
                                    {/* Current Line Display */}
                                    <div style={{ backgroundColor: t.bgTertiary, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: currentLine?.speaker === 'trainer' ? '#10B981' : '#3B82F6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                backgroundColor: currentLine?.speaker === 'trainer' ? '#10B981' : '#3B82F6',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px',
                                                color: '#fff',
                                                fontWeight: '700'
                                            }}>
                                                {currentLine?.speaker === 'trainer' ? 'T' : 'Y'}
                                            </div>
                                            {currentLine?.speaker === 'trainer' ? 'Trainer' : 'You'}
                                        </div>
                                        {/* Japanese - Main text */}
                                        <div style={{
                                            fontSize: '16px',
                                            color: t.text,
                                            lineHeight: '1.7',
                                            marginBottom: '12px',
                                            fontWeight: '500'
                                        }}>
                                            {currentLine?.japanese || '行を選択してください'}
                                        </div>
                                        {/* English - Learning target */}
                                        <div style={{
                                            fontSize: '14px',
                                            color: t.accent,
                                            lineHeight: '1.6',
                                            padding: '10px 12px',
                                            backgroundColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
                                            borderRadius: '8px',
                                            borderLeft: `3px solid ${t.accent}`
                                        }}>
                                            {currentLine?.text || 'Select a line to play'}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ height: '4px', backgroundColor: t.borderLight, borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${progress}%`, backgroundColor: t.accent, transition: 'width 0.05s linear' }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: t.textMuted }}>
                                            <span>{currentIndex + 1} / {conversation.length}</span>
                                            <span>{speed.toFixed(2)}x</span>
                                        </div>
                                    </div>

                                    {/* Playback Controls */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginBottom: '32px' }}>
                                        <button
                                            onClick={cycleLineMode}
                                            style={{ background: 'none', border: 'none', color: lineMode === 'shuffle' ? t.accent : t.textMuted, cursor: 'pointer', padding: '8px' }}
                                            title={lineMode === 'sequential' ? 'Sequential' : lineMode === 'shuffle' ? 'Shuffle' : 'Repeat One'}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                                            </svg>
                                        </button>

                                        <button onClick={playPrevious} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', padding: '8px' }}>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: t.accent, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            {isPlaying ? (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                </svg>
                                            ) : (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '3px' }}>
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        <button onClick={playNext} style={{ background: 'none', border: 'none', color: t.text, cursor: 'pointer', padding: '8px' }}>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={cycleLineMode}
                                            style={{ background: 'none', border: 'none', color: lineMode === 'repeat-one' ? t.accent : t.textMuted, cursor: 'pointer', padding: '8px', position: 'relative' }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                                            </svg>
                                            {lineMode === 'repeat-one' && <span style={{ position: 'absolute', fontSize: '9px', fontWeight: 'bold', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: t.accent }}>1</span>}
                                        </button>
                                    </div>

                                    {/* Speed Control */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '12px', color: t.textMuted, minWidth: '32px' }}>0.5x</span>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="1.5"
                                            step="0.05"
                                            value={speed}
                                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                            style={{ width: '150px', accentColor: t.accent }}
                                        />
                                        <span style={{ fontSize: '12px', color: t.textMuted, minWidth: '32px' }}>1.5x</span>
                                        <span style={{ fontSize: '14px', color: t.accent, fontWeight: '600', minWidth: '45px', textAlign: 'center' }}>{speed.toFixed(2)}x</span>
                                    </div>

                                    {/* Voice Selectors */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '12px', color: '#10B981' }}>Trainer:</span>
                                            <select
                                                value={trainerVoice}
                                                onChange={(e) => setTrainerVoice(e.target.value)}
                                                style={{
                                                    backgroundColor: t.bgSecondary,
                                                    color: t.text,
                                                    border: `1px solid ${t.borderLight}`,
                                                    borderRadius: '8px',
                                                    padding: '6px 10px',
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    minWidth: '140px'
                                                }}
                                            >
                                                {voices.map((v) => (
                                                    <option key={v.name} value={v.name}>{v.name.replace('Microsoft ', '').replace(' Online (Natural)', '')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '12px', color: '#3B82F6' }}>You:</span>
                                            <select
                                                value={yourVoice}
                                                onChange={(e) => setYourVoice(e.target.value)}
                                                style={{
                                                    backgroundColor: t.bgSecondary,
                                                    color: t.text,
                                                    border: `1px solid ${t.borderLight}`,
                                                    borderRadius: '8px',
                                                    padding: '6px 10px',
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    minWidth: '140px'
                                                }}
                                            >
                                                {voices.map((v) => (
                                                    <option key={v.name} value={v.name}>{v.name.replace('Microsoft ', '').replace(' Online (Natural)', '')}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Conversation Lines List */}
                                    <h3 style={{ fontSize: '11px', fontWeight: '600', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                                        Lines ({conversation.length})
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        {conversation.map((line, i) => {
                                            const isActive = i === currentIndex;
                                            const speakerColor = line.speaker === 'trainer' ? '#10B981' : '#3B82F6';

                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => {
                                                        window.speechSynthesis.cancel();
                                                        stopProgress();
                                                        setPlayedCount(0);
                                                        playedCountRef.current = 0;
                                                        playLine(i);
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '16px',
                                                        padding: '12px 16px',
                                                        backgroundColor: isActive ? t.bgSecondary : 'transparent',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <div style={{ width: '24px', textAlign: 'center', fontSize: '13px', color: isActive ? t.accent : t.textMuted }}>
                                                        {isActive && isPlaying ? '>' : i + 1}
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: speakerColor, marginBottom: '4px', textTransform: 'uppercase' }}>
                                                            <div style={{
                                                                width: '18px',
                                                                height: '18px',
                                                                borderRadius: '50%',
                                                                backgroundColor: speakerColor,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '10px',
                                                                color: '#fff',
                                                                fontWeight: '700'
                                                            }}>
                                                                {line.speaker === 'trainer' ? 'T' : 'Y'}
                                                            </div>
                                                            {line.speaker === 'trainer' ? 'Trainer' : 'You'}
                                                        </div>
                                                        {/* Japanese - Main */}
                                                        <div style={{ fontSize: '14px', color: t.text, lineHeight: '1.5', marginBottom: '4px' }}>
                                                            {line.japanese || line.text}
                                                        </div>
                                                        {/* English - Secondary */}
                                                        <div style={{
                                                            fontSize: '13px',
                                                            color: isActive ? t.accent : t.textMuted,
                                                            lineHeight: '1.5',
                                                            paddingLeft: '8px',
                                                            borderLeft: `2px solid ${isActive ? t.accent : t.borderLight}`
                                                        }}>
                                                            {line.text}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => openVocabModal(line.text, e)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '8px',
                                                            fontSize: '11px',
                                                            color: t.accent,
                                                        }}
                                                        title="Save to My Vocabulary"
                                                    >
                                                        +Vocab
                                                    </button>
                                                    <button
                                                        onClick={(e) => toggleSavePhrase(line.text, e)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '8px',
                                                            fontSize: '18px',
                                                            color: savedPhrases.has(line.text) ? '#FFD700' : t.textMuted,
                                                        }}
                                                        title={savedPhrases.has(line.text) ? 'Remove from saved' : 'Save phrase'}
                                                    >
                                                        {savedPhrases.has(line.text) ? '★' : '☆'}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Vocabulary Picks */}
                                    {entry.englishTranslation?.vocabulary && entry.englishTranslation.vocabulary.length > 0 && (
                                        <>
                                            <h3 style={{
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                color: t.accent,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginTop: '32px',
                                                marginBottom: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                Vocabulary Picks ({entry.englishTranslation.vocabulary.length})
                                            </h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {entry.englishTranslation.vocabulary.map((vocab, i) => {
                                                    const typeColors: Record<string, string> = {
                                                        'word': t.textMuted,
                                                        'phrasal verb': '#8b5cf6',
                                                        'idiom': '#ec4899',
                                                        'slang': '#f97316',
                                                        'collocation': '#06b6d4',
                                                        'expression': '#10b981'
                                                    };

                                                    return (
                                                        <div
                                                            key={i}
                                                            onClick={async () => {
                                                                try {
                                                                    const res = await fetch('/api/user-phrases', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({
                                                                            phrase: vocab.word,
                                                                            type: vocab.type,
                                                                            meaning: vocab.meaning,
                                                                            example: vocab.example || '',
                                                                            source: entry ? `Health: ${entry.title}` : 'Health Journal',
                                                                        }),
                                                                    });
                                                                    if (res.ok) {
                                                                        const el = document.getElementById(`vocab-${i}`);
                                                                        if (el) {
                                                                            el.style.backgroundColor = t.accent;
                                                                            el.style.color = '#fff';
                                                                            setTimeout(() => {
                                                                                el.style.backgroundColor = t.bgSecondary;
                                                                                el.style.color = t.text;
                                                                            }, 500);
                                                                        }
                                                                    }
                                                                } catch (e) {
                                                                    console.error('Failed to save vocab:', e);
                                                                }
                                                            }}
                                                            id={`vocab-${i}`}
                                                            style={{
                                                                padding: '14px 16px',
                                                                backgroundColor: t.bgSecondary,
                                                                borderRadius: '10px',
                                                                cursor: 'pointer',
                                                                border: `1px solid ${t.borderLight}`,
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                    <span style={{ fontSize: '16px', fontWeight: '600', color: t.text }}>
                                                                        {vocab.word}
                                                                    </span>
                                                                    <span style={{
                                                                        fontSize: '10px',
                                                                        padding: '2px 6px',
                                                                        borderRadius: '4px',
                                                                        backgroundColor: typeColors[vocab.type] || t.textMuted,
                                                                        color: '#fff',
                                                                        fontWeight: '500'
                                                                    }}>
                                                                        {vocab.type}
                                                                    </span>
                                                                </div>
                                                                <span style={{ fontSize: '11px', color: t.accent }}>TAP TO SAVE</span>
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: t.textSecondary, marginBottom: '4px' }}>
                                                                {vocab.meaning}
                                                            </div>
                                                            {vocab.example && (
                                                                <div style={{
                                                                    fontSize: '12px',
                                                                    color: t.textMuted,
                                                                    fontStyle: 'italic',
                                                                    borderLeft: `2px solid ${t.accent}`,
                                                                    paddingLeft: '8px',
                                                                    marginTop: '8px'
                                                                }}>
                                                                    "{vocab.example}"
                                                                </div>
                                                            )}
                                                            {vocab.healthContext && (
                                                                <div style={{
                                                                    fontSize: '11px',
                                                                    color: t.textMuted,
                                                                    marginTop: '6px',
                                                                    padding: '6px 8px',
                                                                    backgroundColor: t.bgTertiary,
                                                                    borderRadius: '4px'
                                                                }}>
                                                                    {vocab.healthContext}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: t.text }}>
                                        Generating English...
                                    </div>
                                    <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: '1.6' }}>
                                        AIが英語会話を生成しています。
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Report Tab */}
                    {activeTab === 'report' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {entry.food && (
                                <div style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.borderLight}` }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                        Food
                                    </div>
                                    <div style={{ fontSize: '15px', color: t.text, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                        {entry.food}
                                    </div>
                                </div>
                            )}
                            {entry.exercise && (
                                <div style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.borderLight}` }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                        Exercise
                                    </div>
                                    <div style={{ fontSize: '15px', color: t.text, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                        {entry.exercise}
                                    </div>
                                </div>
                            )}
                            {entry.body && (
                                <div style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.borderLight}` }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                        Body
                                    </div>
                                    <div style={{ fontSize: '15px', color: t.text, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                        {entry.body}
                                    </div>
                                </div>
                            )}
                            {entry.sleep && (
                                <div style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.borderLight}` }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                        Sleep
                                    </div>
                                    <div style={{ fontSize: '15px', color: t.text, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                        {entry.sleep}
                                    </div>
                                </div>
                            )}
                            {entry.notes && (
                                <div style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', padding: '20px', border: `1px solid ${t.borderLight}` }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                                        Notes
                                    </div>
                                    <div style={{ fontSize: '15px', color: t.text, lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                        {entry.notes}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tips Tab */}
                    {activeTab === 'tips' && (
                        <>
                            {hasTips ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {entry.healthInsights!.encouragement && (
                                        <div style={{
                                            background: `linear-gradient(135deg, ${t.accent}15 0%, ${t.accent}05 100%)`,
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: `1px solid ${t.accent}30`
                                        }}>
                                            <div style={{ fontSize: '15px', color: t.accent, lineHeight: '1.8', fontWeight: '500' }}>
                                                {entry.healthInsights!.encouragement}
                                            </div>
                                        </div>
                                    )}

                                    {entry.healthInsights!.tips.map((tip, i) => {
                                        const colors = categoryColors[tip.category] || categoryColors.general;

                                        return (
                                            <div key={i} style={{ backgroundColor: t.bgSecondary, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${t.borderLight}` }}>
                                                <div style={{ padding: '10px 16px', backgroundColor: colors.bg, borderBottom: `1px solid ${t.borderLight}` }}>
                                                    <span style={{ fontSize: '10px', fontWeight: '700', color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        {tip.category}
                                                    </span>
                                                </div>
                                                <div style={{ padding: '16px' }}>
                                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: t.text, marginBottom: '4px' }}>
                                                        {tip.titleJa}
                                                    </h3>
                                                    <div style={{ fontSize: '12px', color: t.accent, marginBottom: '12px', fontWeight: '500' }}>
                                                        {tip.titleEn}
                                                    </div>
                                                    <div style={{ fontSize: '14px', color: t.text, lineHeight: '1.8', marginBottom: '12px' }}>
                                                        {tip.contentJa}
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: t.textMuted, lineHeight: '1.7', fontStyle: 'italic', paddingTop: '12px', borderTop: `1px solid ${t.borderLight}` }}>
                                                        {tip.contentEn}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {entry.healthInsights!.warnings && entry.healthInsights!.warnings.length > 0 && (
                                        <div style={{ backgroundColor: '#fef2f2', borderRadius: '12px', padding: '16px', border: '1px solid #fecaca' }}>
                                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#991b1b', textTransform: 'uppercase', marginBottom: '8px' }}>
                                                Note
                                            </div>
                                            {entry.healthInsights!.warnings.map((warning, i) => (
                                                <div key={i} style={{ fontSize: '14px', color: '#7f1d1d', lineHeight: '1.6' }}>
                                                    {warning}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: t.text }}>
                                        Generating Tips...
                                    </div>
                                    <p style={{ fontSize: '14px', color: t.textMuted }}>
                                        AIが健康アドバイスを生成しています。
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Save Modal */}
            {showSaveModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px',
                    }}
                    onClick={() => setShowSaveModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: t.bgSecondary,
                            borderRadius: '16px',
                            padding: '24px',
                            width: '100%',
                            maxWidth: '450px',
                            border: `1px solid ${t.borderLight}`,
                        }}
                    >
                        <div style={{ fontSize: '11px', color: t.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                            Save to My Vocabulary
                        </div>

                        <div style={{
                            fontSize: '13px',
                            color: t.textSecondary,
                            marginBottom: '20px',
                            padding: '12px',
                            backgroundColor: t.bg,
                            borderRadius: '8px',
                            lineHeight: '1.5',
                            borderLeft: `3px solid ${t.accent}`,
                        }}>
                            {saveExample}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: t.textMuted, marginBottom: '6px' }}>
                                Word / Phrase to save *
                            </label>
                            <input
                                type="text"
                                value={saveWord}
                                onChange={(e) => setSaveWord(e.target.value)}
                                placeholder="e.g. hit the gym"
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${t.borderLight}`,
                                    backgroundColor: t.bg,
                                    color: t.text,
                                    fontSize: '15px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: t.textMuted, marginBottom: '6px' }}>
                                Type
                            </label>
                            <select
                                value={saveType}
                                onChange={(e) => setSaveType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: `1px solid ${t.borderLight}`,
                                    backgroundColor: t.bg,
                                    color: t.text,
                                    fontSize: '14px',
                                }}
                            >
                                <option value="word">word</option>
                                <option value="phrasal verb">phrasal verb</option>
                                <option value="idiom">idiom</option>
                                <option value="slang">slang</option>
                                <option value="collocation">collocation</option>
                                <option value="expression">expression</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: t.textMuted, marginBottom: '6px' }}>
                                Meaning (Japanese) *
                            </label>
                            <input
                                type="text"
                                value={saveMeaning}
                                onChange={(e) => setSaveMeaning(e.target.value)}
                                placeholder="意味を入力..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${t.borderLight}`,
                                    backgroundColor: t.bg,
                                    color: t.text,
                                    fontSize: '15px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${t.borderLight}`,
                                    backgroundColor: 'transparent',
                                    color: t.textMuted,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveToVocabulary}
                                disabled={isSavingPhrase || !saveWord.trim() || !saveMeaning.trim()}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: (saveWord.trim() && saveMeaning.trim()) ? t.accent : t.borderLight,
                                    color: (saveWord.trim() && saveMeaning.trim()) ? '#fff' : t.textMuted,
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: (saveWord.trim() && saveMeaning.trim() && !isSavingPhrase) ? 'pointer' : 'default',
                                }}
                            >
                                {isSavingPhrase ? '...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
