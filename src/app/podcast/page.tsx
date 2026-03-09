'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { podcastEpisodes, getEpisodesByTopic, PodcastSegment } from '@/data/podcast-episodes';

type ThemeMode = 'dark' | 'light';

export default function PodcastPage() {
    const [theme, setTheme] = useState<ThemeMode>('light');
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [playingSegment, setPlayingSegment] = useState<string | null>(null);
    const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

    const t = {
        dark: {
            bg: '#0a0a0a',
            bgSecondary: '#1a1a1a',
            text: '#fff',
            textSecondary: '#888',
            textMuted: '#666',
            border: '#242424',
            accent: '#D4AF37',
        },
        light: {
            bg: '#f5f5f5',
            bgSecondary: '#ffffff',
            text: '#1a1a1a',
            textSecondary: '#555',
            textMuted: '#999',
            border: '#e5e5e5',
            accent: '#B8960C',
        },
    }[theme];

    const displayedEpisodes = selectedTopic
        ? getEpisodesByTopic(selectedTopic)
        : podcastEpisodes;

    // Get all unique topics
    const allTopics = Array.from(new Set(podcastEpisodes.flatMap(ep => ep.topics)));

    return (
        <div style={{ minHeight: '100vh', backgroundColor: t.bg, color: t.text }}>
            {/* Header */}
            <div style={{ padding: '20px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/english" style={{ color: t.textMuted, textDecoration: 'none', fontSize: '14px' }}>← English</Link>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'none', border: `1px solid ${t.border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '12px', cursor: 'pointer', color: t.text }}>
                    {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 20px' }}>
                {/* Hero */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '700', margin: 0 }}>一人英会話ポッドキャスト</h1>
                    <p style={{ fontSize: '18px', color: t.textSecondary, marginTop: '16px' }}>
                        Business • Spirituality • AI
                    </p>
                </div>

                {/* Topic Filter */}
                {allTopics.length > 0 && (
                    <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => setSelectedTopic(null)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: selectedTopic === null ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
                                background: selectedTopic === null ? `${t.accent}20` : t.bgSecondary,
                                color: selectedTopic === null ? t.accent : t.text,
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            All Episodes
                        </button>
                        {allTopics.map(topic => (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: selectedTopic === topic ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
                                    background: selectedTopic === topic ? `${t.accent}20` : t.bgSecondary,
                                    color: selectedTopic === topic ? t.accent : t.text,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                )}

                {/* Episodes List */}
                {displayedEpisodes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px', color: t.accent }}>PODCAST</div>
                        <h2 style={{ fontSize: '24px', color: t.textSecondary, fontWeight: '400' }}>エピソードはまだありません</h2>
                        <p style={{ fontSize: '16px', color: t.textMuted, marginTop: '8px' }}>最初のエピソードをお楽しみに！</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        {displayedEpisodes.map(episode => (
                            <div
                                key={episode.id}
                                style={{
                                    backgroundColor: t.bgSecondary,
                                    borderRadius: '12px',
                                    padding: '24px',
                                    border: `1px solid ${t.border}`,
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: t.textMuted, marginBottom: '4px' }}>
                                            Episode {episode.id} • {new Date(episode.publishDate).toLocaleDateString('ja-JP')}
                                        </div>
                                        <h3 style={{ fontSize: '22px', fontWeight: '600', margin: 0 }}>{episode.title}</h3>
                                        <div style={{ fontSize: '16px', color: t.textSecondary, marginTop: '4px' }}>{episode.titleEn}</div>
                                    </div>
                                    <div style={{ fontSize: '14px', color: t.textMuted }}>{episode.duration}</div>
                                </div>

                                <p style={{ fontSize: '15px', color: t.textSecondary, marginBottom: '16px', lineHeight: '1.6' }}>
                                    {episode.description}
                                </p>

                                {/* Topics */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    {episode.topics.map(topic => (
                                        <span
                                            key={topic}
                                            style={{
                                                fontSize: '12px',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                backgroundColor: `${t.accent}15`,
                                                color: t.accent,
                                            }}
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>

                                {/* Segments or Single Audio */}
                                {episode.segments && episode.segments.length > 0 ? (
                                    <div style={{ marginTop: '16px' }}>
                                        <div style={{
                                            fontSize: '12px',
                                            color: t.textMuted,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            marginBottom: '12px'
                                        }}>
                                            Chapters
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {episode.segments.map((segment, idx) => (
                                                <div
                                                    key={segment.id}
                                                    style={{
                                                        backgroundColor: playingSegment === segment.id ? `${t.accent}15` : t.bg,
                                                        borderRadius: '8px',
                                                        padding: '12px 16px',
                                                        border: `1px solid ${playingSegment === segment.id ? t.accent : t.border}`,
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                        <button
                                                            onClick={() => {
                                                                const audio = audioRefs.current[segment.id];
                                                                if (audio) {
                                                                    if (playingSegment === segment.id) {
                                                                        audio.pause();
                                                                        setPlayingSegment(null);
                                                                    } else {
                                                                        // Pause other segments
                                                                        Object.values(audioRefs.current).forEach(a => a?.pause());
                                                                        audio.play();
                                                                        setPlayingSegment(segment.id);
                                                                    }
                                                                }
                                                            }}
                                                            style={{
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '50%',
                                                                backgroundColor: t.accent,
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {playingSegment === segment.id ? (
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#000">
                                                                    <rect x="6" y="4" width="4" height="16" />
                                                                    <rect x="14" y="4" width="4" height="16" />
                                                                </svg>
                                                            ) : (
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#000">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: '11px', color: t.textMuted }}>
                                                                {String(idx + 1).padStart(2, '0')}
                                                            </div>
                                                            <div style={{ fontSize: '15px', fontWeight: '500' }}>
                                                                {segment.title}
                                                            </div>
                                                        </div>
                                                        <div style={{ fontSize: '13px', color: t.textMuted }}>
                                                            {segment.duration}
                                                        </div>
                                                    </div>
                                                    <audio
                                                        ref={el => { audioRefs.current[segment.id] = el; }}
                                                        src={segment.audioUrl}
                                                        preload="metadata"
                                                        onEnded={() => setPlayingSegment(null)}
                                                        style={{ width: '100%', height: '32px' }}
                                                        controls
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <audio
                                            controls
                                            style={{ width: '100%', marginTop: '8px' }}
                                            preload="metadata"
                                        >
                                            <source src={episode.audioUrl} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                        <div style={{ marginTop: '12px', textAlign: 'right' }}>
                                            <a
                                                href={episode.audioUrl}
                                                download
                                                style={{ fontSize: '13px', color: t.accent, textDecoration: 'none' }}
                                            >
                                                Download MP3
                                            </a>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
