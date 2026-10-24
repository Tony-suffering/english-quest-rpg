'use client';

import { useState, useMemo, useRef } from 'react';
import type {
    XTweet,
    CardType,
} from '@/data/x-tweets';
import { CardPreview } from './CardViews';

const TABS: { key: CardType | 'all'; label: string }[] = [
    { key: 'all', label: 'すべて' },
    { key: 'app-promo', label: 'アプリ宣伝' },
    { key: 'breaking', label: '速報' },
    { key: 'wanted', label: '指名手配' },
    { key: 'clinic', label: 'クリニック' },
    { key: 'lie', label: '嘘翻訳' },
    { key: 'quote', label: '格言' },
    { key: 'philosophy', label: '哲学/非二元' },
];

const TYPE_COLOR: Record<CardType, string> = {
    breaking: '#0891B2',
    wanted: '#DC2626',
    clinic: '#7C3AED',
    lie: '#D4AF37',
    quote: '#16A34A',
    philosophy: '#525252',
    'app-promo': '#D4AF37',
};

const TYPE_LABEL: Record<CardType, string> = {
    breaking: '速報',
    wanted: '指名手配',
    clinic: 'クリニック',
    lie: '嘘翻訳',
    quote: '格言',
    philosophy: '哲学',
    'app-promo': 'アプリ宣伝',
};

// カードのエクスポートサイズ (X 推奨 1080x1080 正方形)
const CARD_EXPORT_SIZE = 1080;
const CARD_DISPLAY_SIZE = 480;
const SCALE = CARD_EXPORT_SIZE / CARD_DISPLAY_SIZE;

export default function XAdminClient({ initialTweets }: { initialTweets: XTweet[] }) {
    const [tweets] = useState<XTweet[]>(initialTweets);
    const [tab, setTab] = useState<CardType | 'all'>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const filtered = useMemo(() => {
        if (tab === 'all') return tweets;
        return tweets.filter(t => t.cardType === tab);
    }, [tweets, tab]);

    const counts = useMemo(() => {
        const c: Record<string, number> = { all: tweets.length };
        for (const tw of tweets) c[tw.cardType] = (c[tw.cardType] || 0) + 1;
        return c;
    }, [tweets]);

    const copyText = async (id: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 1500);
        } catch (err) {
            console.error('copy failed', err);
        }
    };

    const downloadImage = async (id: string) => {
        const node = cardRefs.current[id];
        if (!node) return;
        try {
            setDownloadingId(id);
            // 動的 import で初回のみダウンロード (バンドル軽量化)
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(node, {
                backgroundColor: null,
                scale: SCALE,
                useCORS: true,
                width: CARD_DISPLAY_SIZE,
                height: CARD_DISPLAY_SIZE,
            });
            const link = document.createElement('a');
            link.download = `tonio-${id}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('download failed', err);
            alert('画像生成に失敗しました');
        } finally {
            setDownloadingId(null);
        }
    };

    const openX = () => {
        window.open('https://x.com/compose/post', '_blank');
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px', backgroundColor: '#fafaf9', minHeight: '100vh' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1c1917', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    @tonio_english 投稿管理
                </h1>
                <p style={{ fontSize: '12px', color: '#888888' }}>
                    ドラフト / カード画像生成 / 本文コピー
                </p>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap', borderBottom: '1px solid #e7e5e4', paddingBottom: '8px' }}>
                {TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: tab === t.key ? '#1c1917' : '#ffffff',
                            color: tab === t.key ? '#ffffff' : '#525252',
                            fontSize: '13px',
                            fontWeight: tab === t.key ? 600 : 400,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        {t.label}
                        <span style={{
                            fontSize: '10px',
                            backgroundColor: tab === t.key ? '#525252' : '#f5f5f4',
                            color: tab === t.key ? '#ffffff' : '#888888',
                            padding: '2px 6px',
                            borderRadius: '10px',
                        }}>
                            {counts[t.key] ?? 0}
                        </span>
                    </button>
                ))}
                <button
                    onClick={openX}
                    style={{
                        marginLeft: 'auto',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#1DA1F2',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    X を開く
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))', gap: '20px' }}>
                {filtered.map(tw => (
                    <div
                        key={tw.id}
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e7e5e4',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                    style={{
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        color: '#ffffff',
                                        backgroundColor: TYPE_COLOR[tw.cardType],
                                        padding: '3px 8px',
                                        borderRadius: '6px',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {TYPE_LABEL[tw.cardType]}
                                </span>
                                <span style={{ fontSize: '11px', color: '#888' }}>{tw.id}</span>
                            </div>
                            <span style={{ fontSize: '10px', color: '#aaa' }}>{tw.text.length} / 280</span>
                        </div>

                        {/* 1080x1080 カード (480px で表示, ダウンロード時は 2.25x で 1080px) */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div
                                ref={(el) => { cardRefs.current[tw.id] = el; }}
                                style={{
                                    width: `${CARD_DISPLAY_SIZE}px`,
                                    height: `${CARD_DISPLAY_SIZE}px`,
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                    borderRadius: '8px',
                                }}
                            >
                                <CardPreview card={tw.card} />
                            </div>
                        </div>

                        <div
                            style={{
                                backgroundColor: '#f5f5f4',
                                padding: '12px 14px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                lineHeight: 1.6,
                                color: '#1c1917',
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                            }}
                        >
                            {tw.text}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => copyText(tw.id, tw.text)}
                                style={{
                                    flex: 1,
                                    minWidth: '120px',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: copiedId === tw.id ? '#16A34A' : '#1c1917',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                {copiedId === tw.id ? 'コピー完了' : '本文コピー'}
                            </button>
                            <button
                                onClick={() => downloadImage(tw.id)}
                                disabled={downloadingId === tw.id}
                                style={{
                                    flex: 1,
                                    minWidth: '120px',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: downloadingId === tw.id ? '#888' : '#D4AF37',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: downloadingId === tw.id ? 'wait' : 'pointer',
                                }}
                            >
                                {downloadingId === tw.id ? '生成中...' : '画像DL (1080)'}
                            </button>
                            <a
                                href={`https://x.com/intent/tweet?text=${encodeURIComponent(tw.text)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    minWidth: '120px',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    backgroundColor: '#1DA1F2',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                }}
                            >
                                X で投稿
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                    このカテゴリのドラフトはまだありません。
                </div>
            )}
        </div>
    );
}

