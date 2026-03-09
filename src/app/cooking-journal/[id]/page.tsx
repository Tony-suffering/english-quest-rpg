'use client';

import { useState, useEffect, useCallback, useRef, use } from 'react';
import Link from 'next/link';
import { CookingJournalEntry, ConversationLine, CookingVocabulary } from '@/types/cooking-journal';
import { SavedPhrasesStorage } from '@/lib/saved-phrases';

type LineMode = 'sequential' | 'shuffle' | 'repeat-one';

export default function CookingJournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [entry, setEntry] = useState<CookingJournalEntry | null>(null);
    const [loading, setLoading] = useState(true);

    // Playback State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [lineMode, setLineMode] = useState<LineMode>('sequential');
    const [showJapanese, setShowJapanese] = useState(true);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const playingRef = useRef(false);

    // Saved Phrases
    const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveExample, setSaveExample] = useState('');
    const [saveWord, setSaveWord] = useState('');
    const [saveMeaning, setSaveMeaning] = useState('');
    const [saveType, setSaveType] = useState<'word' | 'phrase' | 'idiom' | 'slang'>('word');
    const [isSavingPhrase, setIsSavingPhrase] = useState(false);

    // Active Tab
    const [activeTab, setActiveTab] = useState<'conversation' | 'tips'>('conversation');

    useEffect(() => {
        const loadEntry = async () => {
            try {
                const response = await fetch(`/api/cooking-journal?id=${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setEntry(data);
                }
            } catch (error) {
                console.error('Failed to load entry:', error);
            } finally {
                setLoading(false);
            }
        };
        loadEntry();

        // Load saved phrases
        const saved = SavedPhrasesStorage.getAll();
        setSavedPhrases(new Set(saved.map(p => p.english)));
    }, [id]);

    const conversation = entry?.englishTranslation?.conversation || [];
    const vocabulary = entry?.englishTranslation?.vocabulary || [];
    const tips = entry?.cookingInsights?.tips || [];
    const improvements = entry?.cookingInsights?.improvements || [];

    // Speech Synthesis
    const speakLine = useCallback((line: ConversationLine): Promise<void> => {
        return new Promise((resolve) => {
            if (!playingRef.current) {
                resolve();
                return;
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(line.text);
            utterance.lang = 'en-US';
            utterance.rate = 0.85;
            utterance.pitch = line.speaker === 'chef' ? 0.9 : 1.1;
            utteranceRef.current = utterance;

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();

            window.speechSynthesis.speak(utterance);
        });
    }, []);

    const playSequence = useCallback(async (startIndex: number) => {
        if (!conversation.length) return;

        playingRef.current = true;
        setIsPlaying(true);

        let idx = startIndex;

        while (playingRef.current && idx < conversation.length) {
            setCurrentLineIndex(idx);
            await speakLine(conversation[idx]);

            if (!playingRef.current) break;

            if (lineMode === 'repeat-one') {
                continue;
            } else if (lineMode === 'shuffle') {
                idx = Math.floor(Math.random() * conversation.length);
            } else {
                idx++;
            }
        }

        playingRef.current = false;
        setIsPlaying(false);
    }, [conversation, lineMode, speakLine]);

    const stopPlayback = useCallback(() => {
        playingRef.current = false;
        setIsPlaying(false);
        window.speechSynthesis.cancel();
    }, []);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) {
            stopPlayback();
        } else {
            playSequence(currentLineIndex);
        }
    }, [isPlaying, currentLineIndex, playSequence, stopPlayback]);

    const handleLineClick = useCallback((index: number) => {
        stopPlayback();
        setCurrentLineIndex(index);
        playingRef.current = true;
        setIsPlaying(true);
        speakLine(conversation[index]).then(() => {
            if (lineMode === 'repeat-one') {
                playSequence(index);
            } else {
                playingRef.current = false;
                setIsPlaying(false);
            }
        });
    }, [conversation, lineMode, speakLine, stopPlayback, playSequence]);

    // Phrase Saving
    const toggleSavePhrase = (text: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (savedPhrases.has(text)) {
            const all = SavedPhrasesStorage.getAll();
            const found = all.find(p => p.english === text);
            if (found) {
                SavedPhrasesStorage.remove(found.id);
            }
            setSavedPhrases(prev => {
                const next = new Set(prev);
                next.delete(text);
                return next;
            });
        } else {
            const line = conversation.find(l => l.english === text);
            SavedPhrasesStorage.save({
                english: text,
                ...(line?.japanese ? { japanese: line.japanese } : {}),
                source: entry ? `Cooking: ${entry.dishName}` : 'Cooking Journal',
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
                    source: entry ? `Cooking: ${entry.dishName}` : 'Cooking Journal',
                }),
            });
            if (res.ok || res.status === 409) {
                setShowSaveModal(false);
            }
        } finally {
            setIsSavingPhrase(false);
        }
    };

    const saveVocabFromPick = async (vocab: CookingVocabulary, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: vocab.word,
                    type: vocab.type === 'phrase' ? 'phrase' : vocab.type === 'verb' ? 'word' : vocab.type === 'noun' ? 'word' : vocab.type === 'adjective' ? 'word' : 'word',
                    meaning: vocab.meaning,
                    example: vocab.example,
                    source: entry ? `Cooking: ${entry.dishName}` : 'Cooking Journal',
                }),
            });
        } catch (error) {
            console.error('Failed to save vocab:', error);
        }
    };

    // Star Rating Display
    const renderStars = (rating: number, size: number = 14) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < rating ? '#F59E0B' : '#E5E7EB', fontSize: `${size}px` }}>
                {i < rating ? '\u2605' : '\u2606'}
            </span>
        ));
    };

    // Category Badge Colors
    const getCategoryColor = (category: string) => {
        const colors: Record<string, { bg: string; color: string }> = {
            technique: { bg: '#dbeafe', color: '#1e40af' },
            ingredient: { bg: '#dcfce7', color: '#166534' },
            texture: { bg: '#fef3c7', color: '#92400e' },
            taste: { bg: '#fce7f3', color: '#9d174d' },
            equipment: { bg: '#e5e7eb', color: '#374151' },
            measurement: { bg: '#ede9fe', color: '#5b21b6' },
            culture: { bg: '#ffedd5', color: '#c2410c' },
            safety: { bg: '#fee2e2', color: '#991b1b' },
        };
        return colors[category] || { bg: '#f3f4f6', color: '#6b7280' };
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#6b7280' }}>Loading...</div>
            </div>
        );
    }

    if (!entry) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#fefce8', padding: '24px' }}>
                <Link href="/cooking-journal" style={{ color: '#F59E0B', textDecoration: 'none' }}>
                    {'<'} Back
                </Link>
                <div style={{ marginTop: '48px', textAlign: 'center', color: '#6b7280' }}>
                    Entry not found
                </div>
            </div>
        );
    }

    const savedCount = savedPhrases.size;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fefce8' }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '16px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Link href="/cooking-journal" style={{ color: '#F59E0B', textDecoration: 'none', fontSize: '14px' }}>
                        {'<'} Back
                    </Link>
                    {savedCount > 0 && (
                        <Link href="/phrases" style={{
                            fontSize: '11px',
                            padding: '4px 8px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}>
                            Saved: {savedCount}
                        </Link>
                    )}
                </div>
                <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1a1a1a' }}>
                    {entry.dishName}
                </h1>
                {entry.dishNameEn && (
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>
                        {entry.dishNameEn}
                    </p>
                )}
            </div>

            {/* Recipe Overview Card */}
            <div style={{ padding: '16px' }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #fcd34d',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B', marginBottom: '12px', textTransform: 'uppercase' }}>
                        Recipe Overview
                    </div>

                    {/* Ratings */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Taste</div>
                            <div>{renderStars(entry.tasteRating, 16)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Looks</div>
                            <div>{renderStars(entry.presentationRating, 16)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Difficulty</div>
                            <div>{renderStars(entry.difficultyRating, 16)}</div>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Materials:</div>
                        <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
                            {entry.ingredients}
                        </div>
                    </div>

                    {/* Notes */}
                    {entry.notes && (
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Notes:</div>
                            <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
                                {entry.notes}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ padding: '0 16px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                        onClick={() => setActiveTab('conversation')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: activeTab === 'conversation' ? '#F59E0B' : '#fff',
                            color: activeTab === 'conversation' ? '#fff' : '#6b7280',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}
                    >
                        Chef Mentor
                    </button>
                    <button
                        onClick={() => setActiveTab('tips')}
                        style={{
                            flex: 1,
                            padding: '10px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: activeTab === 'tips' ? '#F59E0B' : '#fff',
                            color: activeTab === 'tips' ? '#fff' : '#6b7280',
                            fontWeight: '600',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}
                    >
                        Cooking Tips
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'conversation' && conversation.length > 0 && (
                <div style={{ padding: '0 16px 16px' }}>
                    {/* Playback Controls */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        marginBottom: '12px',
                        border: '1px solid #e5e5e5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <button
                            onClick={togglePlayPause}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#F59E0B',
                                border: 'none',
                                color: '#fff',
                                fontSize: '18px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {isPlaying ? '||' : '\u25B6'}
                        </button>

                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                                Line {currentLineIndex + 1} / {conversation.length}
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {(['sequential', 'shuffle', 'repeat-one'] as LineMode[]).map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setLineMode(mode)}
                                        style={{
                                            fontSize: '10px',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            backgroundColor: lineMode === mode ? '#F59E0B' : '#f3f4f6',
                                            color: lineMode === mode ? '#fff' : '#6b7280',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {mode === 'sequential' ? 'Seq' : mode === 'shuffle' ? 'Shuf' : 'Rep'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowJapanese(!showJapanese)}
                            style={{
                                fontSize: '10px',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: showJapanese ? '#fef3c7' : '#f3f4f6',
                                color: showJapanese ? '#92400e' : '#6b7280',
                                cursor: 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            JP {showJapanese ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    {/* Conversation Lines */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '8px',
                        border: '1px solid #e5e5e5',
                    }}>
                        {conversation.map((line, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleLineClick(idx)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    backgroundColor: currentLineIndex === idx ? '#fffbeb' : 'transparent',
                                    marginBottom: idx < conversation.length - 1 ? '4px' : 0,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.15s',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    {/* Speaker Avatar */}
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        backgroundColor: line.speaker === 'chef' ? '#F59E0B' : '#10B981',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        fontSize: '12px',
                                        color: '#fff',
                                        fontWeight: '700',
                                    }}>
                                        {line.speaker === 'chef' ? 'C' : 'Y'}
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '2px', fontWeight: '600' }}>
                                            {line.speaker === 'chef' ? 'CHEF' : 'YOU'}
                                        </div>
                                        {/* Japanese first (main language) */}
                                        {showJapanese && (
                                            <div style={{
                                                fontSize: '14px',
                                                color: '#1a1a1a',
                                                lineHeight: '1.5',
                                                marginBottom: '4px',
                                            }}>
                                                {line.japanese}
                                            </div>
                                        )}
                                        {/* English (learning target) */}
                                        <div style={{
                                            fontSize: '13px',
                                            color: '#F59E0B',
                                            lineHeight: '1.5',
                                            fontStyle: showJapanese ? 'italic' : 'normal',
                                        }}>
                                            {line.text}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                                        <button
                                            onClick={(e) => openVocabModal(line.text, e)}
                                            style={{
                                                fontSize: '10px',
                                                padding: '4px 6px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                backgroundColor: '#f0fdf4',
                                                color: '#166534',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                            }}
                                        >
                                            +Vocab
                                        </button>
                                        <button
                                            onClick={(e) => toggleSavePhrase(line.text, e)}
                                            style={{
                                                fontSize: '14px',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                backgroundColor: savedPhrases.has(line.text) ? '#fef3c7' : '#f3f4f6',
                                                color: savedPhrases.has(line.text) ? '#F59E0B' : '#9ca3af',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {savedPhrases.has(line.text) ? '\u2605' : '\u2606'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Vocabulary Picks */}
                    {vocabulary.length > 0 && (
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            marginTop: '12px',
                            border: '1px solid #e5e5e5',
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B', marginBottom: '12px', textTransform: 'uppercase' }}>
                                Culinary Vocabulary - TAP TO SAVE
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {vocabulary.map((vocab, idx) => {
                                    const catColor = getCategoryColor(vocab.category);
                                    return (
                                        <div
                                            key={idx}
                                            onClick={(e) => saveVocabFromPick(vocab, e)}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#fefce8',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                border: '1px solid #fcd34d',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                                <span style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '14px' }}>
                                                    {vocab.word}
                                                </span>
                                                <span style={{
                                                    fontSize: '9px',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    backgroundColor: catColor.bg,
                                                    color: catColor.color,
                                                    fontWeight: '600',
                                                }}>
                                                    {vocab.category.toUpperCase()}
                                                </span>
                                                <span style={{
                                                    fontSize: '9px',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#f3f4f6',
                                                    color: '#6b7280',
                                                }}>
                                                    {vocab.type}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                                                {vocab.meaning}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                                                {vocab.example}
                                            </div>
                                            {vocab.culturalNote && (
                                                <div style={{
                                                    fontSize: '11px',
                                                    color: '#92400e',
                                                    marginTop: '6px',
                                                    padding: '6px 8px',
                                                    backgroundColor: '#fffbeb',
                                                    borderRadius: '4px',
                                                }}>
                                                    {vocab.culturalNote}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
                <div style={{ padding: '0 16px 16px' }}>
                    {/* Cooking Tips */}
                    {tips.length > 0 && (
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '12px',
                            border: '1px solid #e5e5e5',
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B', marginBottom: '12px', textTransform: 'uppercase' }}>
                                Cooking Tips
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {tips.map((tip, idx) => {
                                    const catColor = getCategoryColor(tip.category);
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '12px',
                                                backgroundColor: '#fefce8',
                                                borderRadius: '8px',
                                                border: '1px solid #fcd34d',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <span style={{
                                                    fontSize: '9px',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    backgroundColor: catColor.bg,
                                                    color: catColor.color,
                                                    fontWeight: '600',
                                                }}>
                                                    {tip.category.toUpperCase()}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '6px' }}>
                                                {tip.titleJa}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontStyle: 'italic' }}>
                                                {tip.titleEn}
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', marginBottom: '8px' }}>
                                                {tip.contentJa}
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#F59E0B',
                                                lineHeight: '1.6',
                                                padding: '8px',
                                                backgroundColor: '#fffbeb',
                                                borderRadius: '6px',
                                            }}>
                                                {tip.contentEn}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Improvement Suggestions */}
                    {improvements.length > 0 && (
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            marginBottom: '12px',
                            border: '1px solid #e5e5e5',
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', marginBottom: '12px', textTransform: 'uppercase' }}>
                                Next Time Try...
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {improvements.map((imp, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#f0fdf4',
                                            borderRadius: '8px',
                                            fontSize: '13px',
                                            color: '#166534',
                                            lineHeight: '1.5',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '8px',
                                        }}
                                    >
                                        <span style={{ fontWeight: '700' }}>{idx + 1}.</span>
                                        <span>{imp}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Encouragement */}
                    {entry.cookingInsights?.encouragement && (
                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid #fcd34d',
                        }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F59E0B', marginBottom: '8px', textTransform: 'uppercase' }}>
                                Chef says...
                            </div>
                            <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                                {entry.cookingInsights.encouragement}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Save Modal */}
            {showSaveModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200,
                    padding: '16px',
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '400px',
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1a1a1a' }}>
                            Save to Vocabulary
                        </h3>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                Example Sentence
                            </label>
                            <div style={{
                                padding: '10px',
                                backgroundColor: '#fefce8',
                                borderRadius: '8px',
                                fontSize: '13px',
                                color: '#374151',
                            }}>
                                {saveExample}
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                Word / Phrase
                            </label>
                            <input
                                type="text"
                                value={saveWord}
                                onChange={(e) => setSaveWord(e.target.value)}
                                placeholder="Enter the word or phrase"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                Meaning (Japanese)
                            </label>
                            <input
                                type="text"
                                value={saveMeaning}
                                onChange={(e) => setSaveMeaning(e.target.value)}
                                placeholder="Enter the meaning"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                Type
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {(['word', 'phrase', 'idiom', 'slang'] as const).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSaveType(type)}
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            border: 'none',
                                            borderRadius: '6px',
                                            backgroundColor: saveType === type ? '#F59E0B' : '#f3f4f6',
                                            color: saveType === type ? '#fff' : '#6b7280',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    color: '#6b7280',
                                    fontSize: '14px',
                                    fontWeight: '600',
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
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: '#F59E0B',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    opacity: isSavingPhrase || !saveWord.trim() || !saveMeaning.trim() ? 0.5 : 1,
                                }}
                            >
                                {isSavingPhrase ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
