'use client';

import { useState, useEffect, useCallback } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import { ELEMENT_COLORS, ELEMENT_LABELS } from '@/data/english/elements';

// ═══════════════════════════════════════════════════════════
// 布陣ストーリー — AI生成会話 + フレーズ追加 (∞学習ループ)
// ═══════════════════════════════════════════════════════════

interface StoryCharacter {
    name: string;
    age: number;
    gender: 'male' | 'female';
    desc: string;
}

interface DialogueLine {
    speaker: 'male' | 'female';
    text: string;
}

interface NewExpression {
    english: string;
    japanese: string;
    context: string;
}

interface FujinStory {
    scenario: string;
    scenarioJa: string;
    characters: StoryCharacter[];
    english: DialogueLine[];
    japanese: DialogueLine[];
    usedPhrases: string[];
    newExpressions: NewExpression[];
    tone: string;
    generatedAt: string;
    cardCount: number;
    gridSize: number;
    bossDefeated: boolean;
    bossName: string;
}

interface CardData {
    english: string;
    japanese: string;
    element: string;
    rank: string;
    points: number;
    bstTotal: number;
}

// Extract character name from "Name: dialogue" format
function extractSpeaker(text: string): { name: string; dialogue: string } {
    const match = text.match(/^([A-Z][a-zA-Z ]{0,20}):\s(.+)$/s);
    if (match) return { name: match[1], dialogue: match[2] };
    return { name: '', dialogue: text };
}

// Character color palette (generated from name hash)
function getCharColor(name: string): string {
    const colors = ['#6366F1', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899', '#0EA5E9', '#F97316', '#14B8A6', '#A855F7'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    return colors[Math.abs(hash) % colors.length];
}

// Load stories from localStorage
function loadStories(): FujinStory[] {
    try {
        const raw = localStorage.getItem('fujin-stories');
        if (raw) return JSON.parse(raw);
    } catch {}
    return [];
}
function saveStories(stories: FujinStory[]) {
    try { localStorage.setItem('fujin-stories', JSON.stringify(stories)); } catch {}
}

// Load pending cards (set by PuzzleBoard after battle)
function loadPendingCards(): { cards: CardData[]; gridSize: number; bossDefeated: boolean; bossName: string } | null {
    try {
        const raw = localStorage.getItem('fujin-pending-cards');
        if (raw) return JSON.parse(raw);
    } catch {}
    return null;
}
function clearPendingCards() {
    try { localStorage.removeItem('fujin-pending-cards'); } catch {}
}

export default function FujinStoryPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [stories, setStories] = useState<FujinStory[]>([]);
    const [selectedStory, setSelectedStory] = useState<FujinStory | null>(null);
    const [pendingCards, setPendingCards] = useState<{ cards: CardData[]; gridSize: number; bossDefeated: boolean; bossName: string } | null>(null);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState('');
    const [showJapanese, setShowJapanese] = useState(false);
    const [addedPhrases, setAddedPhrases] = useState<Set<string>>(new Set());
    const [addingPhrase, setAddingPhrase] = useState<string | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        setStories(loadStories());
        setPendingCards(loadPendingCards());
    }, []);

    // Generate story from pending cards
    const generateStory = useCallback(async () => {
        if (!pendingCards || generating) return;
        setGenerating(true);
        setError('');

        try {
            const res = await fetch('/api/fujin-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pendingCards),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || 'Generation failed');
                setGenerating(false);
                return;
            }

            const newStory: FujinStory = data.story;
            const updated = [newStory, ...stories];
            setStories(updated);
            saveStories(updated);
            setSelectedStory(newStory);
            clearPendingCards();
            setPendingCards(null);
        } catch (err) {
            setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown'));
        }
        setGenerating(false);
    }, [pendingCards, generating, stories]);

    // Add expression to user phrases via API
    const addPhrase = useCallback(async (expr: NewExpression) => {
        if (addedPhrases.has(expr.english)) return;
        setAddingPhrase(expr.english);

        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: expr.english,
                    type: 'expression',
                    meaning: expr.japanese,
                    note: expr.context,
                    source: 'fujin-story',
                }),
            });

            const data = await res.json();
            if (data.success || data.error === 'Phrase already in collection') {
                setAddedPhrases(prev => new Set([...prev, expr.english]));
            }
        } catch {}
        setAddingPhrase(null);
    }, [addedPhrases]);

    // Delete story
    const deleteStory = useCallback((idx: number) => {
        const updated = stories.filter((_, i) => i !== idx);
        setStories(updated);
        saveStories(updated);
        if (selectedStory === stories[idx]) setSelectedStory(null);
    }, [stories, selectedStory]);

    // ── Render ──
    const sidebar = 240;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                marginLeft: isMobile ? 0 : sidebar,
                marginTop: isMobile ? 56 : 0,
                flex: 1, padding: isMobile ? '16px' : '32px 40px',
                maxWidth: '960px',
            }}>
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{
                        fontSize: '24px', fontWeight: '900', color: '#1C1917',
                        letterSpacing: '-0.5px', marginBottom: '6px',
                    }}>
                        布陣ストーリー
                    </h1>
                    <p style={{ fontSize: '13px', color: '#78716C' }}>
                        布陣バトルで集めたカードからAIがオリジナル会話を生成。新しい表現をフレーズに追加して無限学習ループ。
                    </p>
                </div>

                {/* Pending Cards — Generation Trigger */}
                {pendingCards && (
                    <div style={{
                        background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB)',
                        borderRadius: '16px', padding: '24px',
                        border: '1.5px solid #FED7AA',
                        marginBottom: '24px',
                        boxShadow: '0 4px 16px rgba(212,175,55,0.1)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '800', color: '#1C1917' }}>
                                    {pendingCards.gridSize}x{pendingCards.gridSize} 布陣完了 -- {pendingCards.cards.length}枚のカード
                                </div>
                                <div style={{ fontSize: '12px', color: '#78716C', marginTop: '4px' }}>
                                    vs {pendingCards.bossName} {pendingCards.bossDefeated ? '-- BOSS DEFEATED' : '-- BOSS SURVIVED'}
                                </div>
                            </div>
                            <button onClick={() => { clearPendingCards(); setPendingCards(null); }} style={{
                                border: 'none', cursor: 'pointer', background: 'none',
                                color: '#A8A29E', fontSize: '12px',
                            }}>
                                破棄
                            </button>
                        </div>

                        {/* Card preview chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                            {pendingCards.cards.map((c, i) => (
                                <div key={i} style={{
                                    background: '#fff', borderRadius: '6px', padding: '4px 8px',
                                    border: `1px solid ${ELEMENT_COLORS[c.element as keyof typeof ELEMENT_COLORS] || '#E7E5E4'}30`,
                                    fontSize: '11px', fontWeight: '600', color: '#44403C',
                                    maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                    <span style={{ color: ELEMENT_COLORS[c.element as keyof typeof ELEMENT_COLORS] || '#78716C', marginRight: '4px', fontSize: '9px' }}>
                                        {ELEMENT_LABELS[c.element] || ''}
                                    </span>
                                    {c.english}
                                </div>
                            ))}
                        </div>

                        {/* Generate button */}
                        <button
                            onClick={generateStory}
                            disabled={generating}
                            style={{
                                width: '100%', padding: '14px',
                                borderRadius: '10px', border: 'none', cursor: generating ? 'default' : 'pointer',
                                background: generating
                                    ? '#E7E5E4'
                                    : 'linear-gradient(135deg, #D4AF37, #F6C85F)',
                                color: generating ? '#78716C' : '#1C1917',
                                fontSize: '14px', fontWeight: '800',
                                letterSpacing: '0.5px',
                                boxShadow: generating ? 'none' : '0 2px 8px rgba(212,175,55,0.3)',
                                transition: 'all 0.2s',
                            }}
                        >
                            {generating ? 'AI生成中... (10-20秒)' : `会話を生成する (API使用)`}
                        </button>

                        {error && (
                            <div style={{
                                marginTop: '10px', padding: '10px', borderRadius: '8px',
                                background: '#FEE2E2', color: '#EF4444', fontSize: '12px', fontWeight: '600',
                            }}>
                                {error}
                            </div>
                        )}
                    </div>
                )}

                {/* Story List + Detail */}
                <div style={{ display: 'flex', gap: '20px', flexDirection: isMobile ? 'column' : 'row' }}>
                    {/* Story list */}
                    <div style={{
                        width: isMobile ? '100%' : '280px', flexShrink: 0,
                        display: 'flex', flexDirection: 'column', gap: '8px',
                    }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '4px' }}>
                            STORIES ({stories.length})
                        </div>
                        {stories.length === 0 && (
                            <div style={{ fontSize: '13px', color: '#A8A29E', padding: '20px 0' }}>
                                まだストーリーがありません。布陣バトルでカードを集めて生成しましょう。
                            </div>
                        )}
                        {stories.map((story, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedStory(story)}
                                style={{
                                    background: selectedStory === story ? 'rgba(212,175,55,0.08)' : '#fff',
                                    borderRadius: '10px', padding: '12px 14px',
                                    border: selectedStory === story ? '1.5px solid #D4AF37' : '1px solid #E7E5E4',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1C1917', marginBottom: '4px' }}>
                                    {story.scenarioJa}
                                </div>
                                <div style={{ fontSize: '10px', color: '#78716C' }}>
                                    {story.scenario}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                    <span style={{ fontSize: '9px', color: '#A8A29E' }}>
                                        {story.cardCount}枚 / {story.gridSize}x{story.gridSize}
                                        {story.bossDefeated ? ' / WIN' : ' / LOSS'}
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteStory(idx); }}
                                        style={{
                                            border: 'none', background: 'none', cursor: 'pointer',
                                            color: '#D6D3D1', fontSize: '11px', padding: '2px 4px',
                                        }}
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Story detail */}
                    {selectedStory && (
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Story header */}
                            <div style={{
                                background: '#fff', borderRadius: '14px', padding: '20px 24px',
                                border: '1px solid #E7E5E4', marginBottom: '12px',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1C1917', marginBottom: '4px' }}>
                                    {selectedStory.scenarioJa}
                                </div>
                                <div style={{ fontSize: '13px', color: '#78716C', marginBottom: '12px' }}>
                                    {selectedStory.scenario}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {selectedStory.characters.map((ch, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            background: '#FAFAF9', borderRadius: '8px', padding: '6px 10px',
                                            border: '1px solid #F0EFED',
                                        }}>
                                            <div style={{
                                                width: '8px', height: '8px', borderRadius: '50%',
                                                background: getCharColor(ch.name),
                                            }} />
                                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#1C1917' }}>{ch.name}</span>
                                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>{ch.age}{ch.gender === 'male' ? 'M' : 'F'} / {ch.desc}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Toggle JP */}
                                <button
                                    onClick={() => setShowJapanese(!showJapanese)}
                                    style={{
                                        marginTop: '12px', border: 'none', cursor: 'pointer',
                                        borderRadius: '6px', padding: '5px 12px',
                                        background: showJapanese ? '#D4AF37' : '#F0EFED',
                                        color: showJapanese ? '#fff' : '#78716C',
                                        fontSize: '11px', fontWeight: '700',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {showJapanese ? '日本語 ON' : '日本語 OFF'}
                                </button>
                            </div>

                            {/* Dialogue */}
                            <div style={{
                                background: '#fff', borderRadius: '14px', padding: '20px 24px',
                                border: '1px solid #E7E5E4', marginBottom: '12px',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                            }}>
                                <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '14px' }}>
                                    CONVERSATION
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {selectedStory.english.map((line, i) => {
                                        const { name, dialogue } = extractSpeaker(line.text);
                                        const color = getCharColor(name);
                                        const jaLine = selectedStory.japanese[i];
                                        const jaInfo = jaLine ? extractSpeaker(jaLine.text) : null;

                                        return (
                                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                <div style={{
                                                    width: '4px', borderRadius: '2px', flexShrink: 0,
                                                    background: color, minHeight: '20px',
                                                    alignSelf: 'stretch',
                                                }} />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{
                                                        fontSize: '10px', fontWeight: '800', color,
                                                        marginBottom: '2px', letterSpacing: '0.3px',
                                                    }}>
                                                        {name}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '14px', fontWeight: '500', color: '#1C1917',
                                                        lineHeight: 1.6,
                                                    }}>
                                                        {dialogue}
                                                    </div>
                                                    {showJapanese && jaInfo && (
                                                        <div style={{
                                                            fontSize: '12px', color: '#A8A29E',
                                                            marginTop: '3px', lineHeight: 1.5,
                                                        }}>
                                                            {jaInfo.dialogue}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* New Expressions — the ∞ loop */}
                            {selectedStory.newExpressions && selectedStory.newExpressions.length > 0 && (
                                <div style={{
                                    background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)',
                                    borderRadius: '14px', padding: '20px 24px',
                                    border: '1px solid #A7F3D0', marginBottom: '12px',
                                    boxShadow: '0 1px 4px rgba(16,185,129,0.08)',
                                }}>
                                    <div style={{
                                        fontSize: '10px', fontWeight: '800', color: '#10B981',
                                        letterSpacing: '1px', marginBottom: '14px',
                                    }}>
                                        NEW EXPRESSIONS -- フレーズに追加して学習ループ
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {selectedStory.newExpressions.map((expr, i) => {
                                            const isAdded = addedPhrases.has(expr.english);
                                            const isAdding = addingPhrase === expr.english;
                                            return (
                                                <div key={i} style={{
                                                    background: '#fff', borderRadius: '10px', padding: '12px 14px',
                                                    border: isAdded ? '1.5px solid #10B981' : '1px solid #D1FAE5',
                                                }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1C1917' }}>
                                                                {expr.english}
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '600', marginTop: '2px' }}>
                                                                {expr.japanese}
                                                            </div>
                                                            <div style={{ fontSize: '11px', color: '#78716C', marginTop: '4px', lineHeight: 1.4 }}>
                                                                {expr.context}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => addPhrase(expr)}
                                                            disabled={isAdded || isAdding}
                                                            style={{
                                                                border: 'none', cursor: isAdded ? 'default' : 'pointer',
                                                                borderRadius: '6px', padding: '6px 12px',
                                                                background: isAdded ? '#D1FAE5' : isAdding ? '#F0EFED' : '#10B981',
                                                                color: isAdded ? '#10B981' : isAdding ? '#78716C' : '#fff',
                                                                fontSize: '11px', fontWeight: '700',
                                                                whiteSpace: 'nowrap', flexShrink: 0,
                                                                transition: 'all 0.15s',
                                                            }}
                                                        >
                                                            {isAdded ? '追加済' : isAdding ? '...' : '+ 追加'}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Used phrases */}
                            {selectedStory.usedPhrases && selectedStory.usedPhrases.length > 0 && (
                                <div style={{
                                    background: '#fff', borderRadius: '14px', padding: '16px 24px',
                                    border: '1px solid #E7E5E4',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                                }}>
                                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                                        USED CARD PHRASES ({selectedStory.usedPhrases.length})
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {selectedStory.usedPhrases.map((p, i) => (
                                            <span key={i} style={{
                                                background: '#FAFAF9', borderRadius: '6px', padding: '4px 8px',
                                                border: '1px solid #E7E5E4',
                                                fontSize: '11px', color: '#44403C',
                                            }}>
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Empty state */}
                    {!selectedStory && stories.length > 0 && !isMobile && (
                        <div style={{
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#A8A29E', fontSize: '14px',
                        }}>
                            ストーリーを選択してください
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
