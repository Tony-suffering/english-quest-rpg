'use client';

import { useState, useMemo } from 'react';
import { kindleBooks, type KindleBook, type KindleBookStatus } from '@/data/english/kindle-books';
import { kdpGuide, type KdpGuideStep } from '@/data/english/kdp-guide';
import { noteArticles } from '@/data/english/note-articles';

type Tab = 'overview' | 'chapters' | 'matter' | 'manuscript' | 'kdp' | 'notes';

const STATUS_LABEL: Record<KindleBookStatus, string> = {
    planning: '企画中',
    editing: '編集中',
    review: '校正中',
    submitted: '審査中',
    published: '公開済',
};

const STATUS_COLOR: Record<KindleBookStatus, string> = {
    planning: '#a78bfa',
    editing: '#f59e0b',
    review: '#3b82f6',
    submitted: '#10b981',
    published: '#D4AF37',
};

const DIFFICULTY_LABEL: Record<KdpGuideStep['difficulty'], string> = {
    easy: '易',
    medium: '中',
    hard: '難',
};

const DIFFICULTY_COLOR: Record<KdpGuideStep['difficulty'], string> = {
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',
};

function renderInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m;
    let i = 0;
    while ((m = regex.exec(text)) !== null) {
        if (m.index > last) parts.push(<span key={i++}>{text.slice(last, m.index)}</span>);
        parts.push(<strong key={i++} style={{ color: '#1c1917', fontWeight: 700 }}>{m[1]}</strong>);
        last = regex.lastIndex;
    }
    if (last < text.length) parts.push(<span key={i++}>{text.slice(last)}</span>);
    return parts;
}

function renderMarkdown(text: string): React.ReactNode {
    if (!text) return null;
    const lines = text.split('\n');
    const out: React.ReactNode[] = [];
    let buffer: string[] = [];
    const flushPara = () => {
        if (buffer.length > 0) {
            out.push(
                <p key={`p-${out.length}`} style={{ margin: '12px 0', lineHeight: 1.85, color: '#44403c', fontSize: 15 }}>
                    {renderInline(buffer.join(' '))}
                </p>
            );
            buffer = [];
        }
    };
    for (let idx = 0; idx < lines.length; idx++) {
        const line = lines[idx].trim();
        if (line === '') { flushPara(); continue; }
        if (line === '---') {
            flushPara();
            out.push(<hr key={`hr-${out.length}`} style={{ border: 0, borderTop: '1px solid #e7e5e4', margin: '16px 0' }} />);
            continue;
        }
        if (line.startsWith('## ')) {
            flushPara();
            out.push(
                <h3 key={`h-${out.length}`} style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', marginTop: 24, marginBottom: 10, borderLeft: '3px solid #D4AF37', paddingLeft: 10 }}>
                    {line.slice(3)}
                </h3>
            );
            continue;
        }
        buffer.push(line);
    }
    flushPara();
    return <>{out}</>;
}

export default function KindlePage() {
    const [selectedBookId, setSelectedBookId] = useState<string>(kindleBooks[0].id);
    const [tab, setTab] = useState<Tab>('overview');
    const [openStepId, setOpenStepId] = useState<string | null>(kdpGuide[0]?.id ?? null);
    const [copyState, setCopyState] = useState<string | null>(null);

    const book = useMemo<KindleBook>(() => {
        return kindleBooks.find(b => b.id === selectedBookId) ?? kindleBooks[0];
    }, [selectedBookId]);

    const totalChapters = useMemo(() => {
        return book.parts.reduce((sum, p) => sum + p.chapters.length, 0);
    }, [book]);

    const noteArticleById = useMemo(() => {
        const m = new Map<string, typeof noteArticles[number]>();
        for (const a of noteArticles) m.set(a.id, a);
        return m;
    }, []);

    const manuscript = useMemo(() => {
        const lines: string[] = [];
        lines.push(book.title);
        lines.push(book.subtitle);
        lines.push('');
        lines.push('著者: ' + book.author);
        lines.push('');
        lines.push('═══════════════════════════════════════');
        lines.push('まえがき');
        lines.push('═══════════════════════════════════════');
        lines.push('');
        lines.push(book.foreword);
        lines.push('');
        for (const part of book.parts) {
            lines.push('');
            lines.push('═══════════════════════════════════════');
            lines.push(part.name);
            lines.push('═══════════════════════════════════════');
            lines.push(part.description);
            lines.push('');
            for (const ch of part.chapters) {
                lines.push('');
                lines.push('───────────────────────────────────────');
                lines.push('第' + ch.number + '章  ' + ch.title);
                lines.push('───────────────────────────────────────');
                const src = noteArticleById.get(ch.sourceArticleId);
                if (src) {
                    lines.push('');
                    lines.push('[元記事 #' + ch.sourceArticleId + ' / ' + ch.originalTitle + ']');
                    lines.push('');
                    lines.push(src.content);
                } else {
                    lines.push('');
                    lines.push('[元記事 #' + ch.sourceArticleId + ' が見つかりません]');
                }
                lines.push('');
            }
        }
        lines.push('');
        lines.push('═══════════════════════════════════════');
        lines.push('あとがき');
        lines.push('═══════════════════════════════════════');
        lines.push('');
        lines.push(book.afterword);
        const text = lines.join('\n');
        const charCount = text.replace(/\s/g, '').length;
        const pageCount = Math.ceil(charCount / 600);
        return { text, charCount, pageCount };
    }, [book, noteArticleById]);

    const missingChapters = useMemo(() => {
        const missing: { number: number; sourceArticleId: string }[] = [];
        for (const part of book.parts) {
            for (const ch of part.chapters) {
                if (!noteArticleById.has(ch.sourceArticleId)) {
                    missing.push({ number: ch.number, sourceArticleId: ch.sourceArticleId });
                }
            }
        }
        return missing;
    }, [book, noteArticleById]);

    const handleCopyManuscript = async () => {
        try {
            await navigator.clipboard.writeText(manuscript.text);
            setCopyState('全文コピーしました');
        } catch {
            setCopyState('コピー失敗 (手動選択してください)');
        }
        setTimeout(() => setCopyState(null), 2500);
    };

    const handleDownloadManuscript = () => {
        const blob = new Blob([manuscript.text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = book.id + '-manuscript.txt';
        a.click();
        URL.revokeObjectURL(url);
        setCopyState('ダウンロード開始');
        setTimeout(() => setCopyState(null), 2500);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f6fa', padding: '24px 16px 64px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 12, color: '#78716c', letterSpacing: '0.18em', marginBottom: 6 }}>
                        KDP / KINDLE 出版企画
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1c1917', margin: 0, letterSpacing: '0.02em' }}>
                        日本人英語事件簿シリーズ
                    </h1>
                    <div style={{ fontSize: 13, color: '#57534e', marginTop: 6 }}>
                        恥とあきらめの英会話 ── note 記事を Kindle 化する企画。Vol.1〜Vol.5 の章構成・KDP出版手順をここで管理する。
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16 }}>
                    {/* Volume list */}
                    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e7e5e4', padding: 12, height: 'fit-content', position: 'sticky', top: 16 }}>
                        <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.16em', marginBottom: 8, padding: '0 4px' }}>
                            VOLUMES
                        </div>
                        {kindleBooks.map(b => {
                            const active = b.id === selectedBookId;
                            return (
                                <button
                                    key={b.id}
                                    onClick={() => { setSelectedBookId(b.id); setTab('overview'); }}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '10px 12px',
                                        marginBottom: 4,
                                        borderRadius: 8,
                                        border: '1px solid ' + (active ? '#D4AF37' : 'transparent'),
                                        background: active ? '#fffdf5' : 'transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1c1917' }}>
                                            Vol. {b.vol}
                                        </div>
                                        <span style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                            padding: '2px 6px',
                                            borderRadius: 4,
                                            background: STATUS_COLOR[b.status] + '20',
                                            color: STATUS_COLOR[b.status],
                                        }}>
                                            {STATUS_LABEL[b.status]}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#78716c', lineHeight: 1.45 }}>
                                        {b.subtitle.split('──')[0]?.trim() || b.subtitle}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Main panel */}
                    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e7e5e4', overflow: 'hidden' }}>
                        {/* Book title */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f5f5f4', background: 'linear-gradient(135deg, #fffdf5 0%, #ffffff 100%)' }}>
                            <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.18em', marginBottom: 6 }}>
                                VOL.{book.vol} / {STATUS_LABEL[book.status].toUpperCase()}
                            </div>
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: 0, lineHeight: 1.4 }}>
                                {book.title}
                            </h2>
                            <div style={{ fontSize: 13, color: '#57534e', marginTop: 6, lineHeight: 1.6 }}>
                                {book.subtitle}
                            </div>
                            <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12, color: '#78716c' }}>
                                <span>著者: <strong style={{ color: '#1c1917' }}>{book.author}</strong></span>
                                <span>価格: <strong style={{ color: '#1c1917' }}>¥{book.price}</strong></span>
                                <span>ロイヤリティ: <strong style={{ color: '#1c1917' }}>{book.royalty}%</strong></span>
                                <span>想定: <strong style={{ color: '#1c1917' }}>{book.estimatedPages}ページ / {book.estimatedChars.toLocaleString()}字</strong></span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #f5f5f4', background: '#fafaf9' }}>
                            {([
                                ['overview', '概要'],
                                ['chapters', `章構成 (${totalChapters})`],
                                ['matter', 'まえがき/あとがき'],
                                ['manuscript', '原稿出力'],
                                ['kdp', 'KDP出版手順'],
                                ['notes', '編集メモ'],
                            ] as [Tab, string][]).map(([k, label]) => (
                                <button
                                    key={k}
                                    onClick={() => setTab(k)}
                                    style={{
                                        flex: 1,
                                        padding: '12px 8px',
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: tab === k ? '2px solid #D4AF37' : '2px solid transparent',
                                        cursor: 'pointer',
                                        fontSize: 13,
                                        fontWeight: tab === k ? 700 : 500,
                                        color: tab === k ? '#1c1917' : '#78716c',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div style={{ padding: 24 }}>
                            {tab === 'overview' && (
                                <div>
                                    <Section label="位置づけ">{book.positioning}</Section>
                                    <Section label="対象読者">{book.targetReader}</Section>
                                    <Section label="カテゴリ">
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                            {book.categories.map(c => (
                                                <span key={c} style={chipStyle('#D4AF37')}>{c}</span>
                                            ))}
                                        </div>
                                    </Section>
                                    <Section label="キーワード (KDP登録用 7枠)">
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                            {book.keywords.map(k => (
                                                <span key={k} style={chipStyle('#10b981')}>{k}</span>
                                            ))}
                                        </div>
                                    </Section>
                                    {book.asin && <Section label="ASIN"><code>{book.asin}</code></Section>}
                                    {book.publishedAt && <Section label="発売日">{book.publishedAt}</Section>}
                                </div>
                            )}

                            {tab === 'chapters' && (
                                <div>
                                    {book.parts.length === 0 && (
                                        <div style={{ padding: 32, textAlign: 'center', color: '#a8a29e', fontSize: 13 }}>
                                            まだ章構成は未着手。Vol.1 出版後に編成予定。
                                        </div>
                                    )}
                                    {book.parts.map((part, pi) => (
                                        <div key={pi} style={{ marginBottom: 32 }}>
                                            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1c1917', margin: 0, marginBottom: 4 }}>
                                                {part.name}
                                            </h3>
                                            <div style={{ fontSize: 12, color: '#78716c', marginBottom: 12 }}>
                                                {part.description}
                                            </div>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid #e7e5e4' }}>
                                                        <th style={thStyle}>#</th>
                                                        <th style={thStyle}>章タイトル</th>
                                                        <th style={thStyle}>元記事</th>
                                                        <th style={thStyle}>採用理由</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {part.chapters.map(ch => {
                                                        const src = noteArticleById.get(ch.sourceArticleId);
                                                        return (
                                                            <tr key={ch.number} style={{ borderBottom: '1px solid #f5f5f4' }}>
                                                                <td style={tdStyle}>
                                                                    <span style={{ fontWeight: 700, color: '#D4AF37' }}>{ch.number}</span>
                                                                </td>
                                                                <td style={tdStyle}>
                                                                    <div style={{ fontWeight: 600, color: '#1c1917', marginBottom: 2 }}>{ch.title}</div>
                                                                </td>
                                                                <td style={tdStyle}>
                                                                    <div style={{ color: '#57534e', fontSize: 12 }}>
                                                                        #{ch.sourceArticleId}
                                                                        {src ? (src.published ? <span style={{ marginLeft: 4, color: '#10b981', fontSize: 10, fontWeight: 700 }}>● 公開</span> : <span style={{ marginLeft: 4, color: '#a8a29e', fontSize: 10, fontWeight: 700 }}>○ 下書</span>) : <span style={{ marginLeft: 4, color: '#ef4444', fontSize: 10, fontWeight: 700 }}>! 未検出</span>}
                                                                    </div>
                                                                    <div style={{ color: '#78716c', fontSize: 11, marginTop: 2 }}>{ch.originalTitle}</div>
                                                                </td>
                                                                <td style={tdStyle}>
                                                                    <div style={{ color: '#57534e', fontSize: 12 }}>{ch.why}</div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === 'matter' && (
                                <div>
                                    {book.foreword ? (
                                        <>
                                            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1c1917', borderLeft: '3px solid #D4AF37', paddingLeft: 10, marginTop: 0 }}>まえがき</h3>
                                            <div style={{ background: '#fafaf9', padding: 16, borderRadius: 8, marginBottom: 24 }}>
                                                {renderMarkdown(book.foreword)}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ padding: 16, color: '#a8a29e', fontSize: 13 }}>まえがき未執筆</div>
                                    )}
                                    {book.afterword ? (
                                        <>
                                            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1c1917', borderLeft: '3px solid #D4AF37', paddingLeft: 10 }}>あとがき</h3>
                                            <div style={{ background: '#fafaf9', padding: 16, borderRadius: 8 }}>
                                                {renderMarkdown(book.afterword)}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ padding: 16, color: '#a8a29e', fontSize: 13 }}>あとがき未執筆</div>
                                    )}
                                </div>
                            )}

                            {tab === 'manuscript' && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: 12, background: '#fffdf5', borderRadius: 8, border: '1px solid #fcefc1', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 auto', minWidth: 200 }}>
                                            <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.16em', marginBottom: 2 }}>ASSEMBLED MANUSCRIPT</div>
                                            <div style={{ fontSize: 13, color: '#1c1917' }}>
                                                <strong>{manuscript.charCount.toLocaleString()}</strong> 字 / 約 <strong>{manuscript.pageCount.toLocaleString()}</strong> ページ
                                                {missingChapters.length > 0 && (
                                                    <span style={{ marginLeft: 8, color: '#ef4444', fontSize: 12 }}>
                                                        (元記事未検出 {missingChapters.length} 件: {missingChapters.map(m => '#' + m.sourceArticleId).join(', ')})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleCopyManuscript}
                                            style={{
                                                padding: '8px 14px',
                                                background: '#D4AF37',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                fontSize: 13,
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            全文コピー
                                        </button>
                                        <button
                                            onClick={handleDownloadManuscript}
                                            style={{
                                                padding: '8px 14px',
                                                background: '#fff',
                                                color: '#1c1917',
                                                border: '1px solid #d6d3d1',
                                                borderRadius: 6,
                                                fontSize: 13,
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            .txt ダウンロード
                                        </button>
                                        {copyState && (
                                            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{copyState}</span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#78716c', marginBottom: 10 }}>
                                        この原稿はまだ note 原文をそのまま連結しただけ。KDP に上げる前に各章の冒頭・末尾を「事件ファイル No.◯◯」体裁に書き換えること (編集メモ参照)。
                                    </div>
                                    <pre style={{
                                        background: '#1c1917',
                                        color: '#e7e5e4',
                                        padding: 16,
                                        borderRadius: 8,
                                        fontSize: 12,
                                        lineHeight: 1.7,
                                        maxHeight: 600,
                                        overflow: 'auto',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        fontFamily: '"SF Mono", Menlo, Consolas, monospace',
                                    }}>
                                        {manuscript.text}
                                    </pre>
                                </div>
                            )}

                            {tab === 'kdp' && (
                                <div>
                                    <div style={{ fontSize: 12, color: '#78716c', marginBottom: 16, padding: 12, background: '#fffdf5', borderRadius: 8, border: '1px solid #fcefc1' }}>
                                        KDP セルフ出版の全11ステップ。各ステップは独立して読める。実際の作業は Tony 名義の Amazon アカウントで上から順に進める。
                                    </div>
                                    {kdpGuide.map(step => {
                                        const open = openStepId === step.id;
                                        return (
                                            <div key={step.id} style={{ marginBottom: 8, border: '1px solid #e7e5e4', borderRadius: 8, overflow: 'hidden' }}>
                                                <button
                                                    onClick={() => setOpenStepId(open ? null : step.id)}
                                                    style={{
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        padding: '14px 16px',
                                                        background: open ? '#fffdf5' : '#fff',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                    }}
                                                >
                                                    <span style={{
                                                        width: 28, height: 28, borderRadius: '50%',
                                                        background: '#D4AF37', color: '#fff',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: 12, fontWeight: 800, flexShrink: 0,
                                                    }}>
                                                        {step.number}
                                                    </span>
                                                    <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: '#1c1917' }}>
                                                        {step.title}
                                                    </span>
                                                    <span style={{ fontSize: 11, color: '#78716c' }}>
                                                        {step.estimatedTime}
                                                    </span>
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700,
                                                        padding: '2px 6px', borderRadius: 4,
                                                        background: DIFFICULTY_COLOR[step.difficulty] + '20',
                                                        color: DIFFICULTY_COLOR[step.difficulty],
                                                    }}>
                                                        {DIFFICULTY_LABEL[step.difficulty]}
                                                    </span>
                                                    <span style={{ fontSize: 14, color: '#a8a29e' }}>
                                                        {open ? '−' : '+'}
                                                    </span>
                                                </button>
                                                {open && (
                                                    <div style={{ padding: '8px 16px 20px', borderTop: '1px solid #f5f5f4' }}>
                                                        <div style={{ marginBottom: 16 }}>
                                                            {renderMarkdown(step.content)}
                                                        </div>
                                                        {step.checklist.length > 0 && (
                                                            <div style={{ background: '#f0fdf4', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                                                                <div style={{ fontSize: 11, fontWeight: 700, color: '#15803d', letterSpacing: '0.12em', marginBottom: 8 }}>CHECKLIST</div>
                                                                {step.checklist.map((c, i) => (
                                                                    <div key={i} style={{ fontSize: 13, color: '#1c1917', padding: '4px 0', display: 'flex', gap: 8 }}>
                                                                        <span style={{ color: '#10b981' }}>□</span>
                                                                        <span>{c}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {step.gotchas.length > 0 && (
                                                            <div style={{ background: '#fef2f2', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                                                                <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', letterSpacing: '0.12em', marginBottom: 8 }}>GOTCHAS</div>
                                                                {step.gotchas.map((g, i) => (
                                                                    <div key={i} style={{ fontSize: 13, color: '#1c1917', padding: '4px 0', display: 'flex', gap: 8 }}>
                                                                        <span style={{ color: '#ef4444' }}>!</span>
                                                                        <span>{g}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {step.links.length > 0 && (
                                                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                                                {step.links.map((lk, i) => (
                                                                    <a
                                                                        key={i}
                                                                        href={lk.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        style={{
                                                                            fontSize: 12,
                                                                            padding: '4px 10px',
                                                                            background: '#f5f5f4',
                                                                            borderRadius: 6,
                                                                            color: '#1c1917',
                                                                            textDecoration: 'none',
                                                                            border: '1px solid #e7e5e4',
                                                                        }}
                                                                    >
                                                                        {lk.label} →
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {tab === 'notes' && (
                                <div>
                                    {book.editorNotes.length === 0 ? (
                                        <div style={{ color: '#a8a29e', fontSize: 13 }}>編集メモなし</div>
                                    ) : (
                                        book.editorNotes.map((n, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #f5f5f4' }}>
                                                <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 12, flexShrink: 0, width: 24 }}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span style={{ fontSize: 13, color: '#44403c', lineHeight: 1.7 }}>{n}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.16em', marginBottom: 6 }}>
                {label.toUpperCase()}
            </div>
            <div style={{ fontSize: 14, color: '#1c1917', lineHeight: 1.7 }}>
                {children}
            </div>
        </div>
    );
}

function chipStyle(color: string): React.CSSProperties {
    return {
        fontSize: 11,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 12,
        background: color + '15',
        color: color,
        border: '1px solid ' + color + '30',
    };
}

const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 6px',
    fontSize: 11,
    fontWeight: 700,
    color: '#78716c',
    letterSpacing: '0.12em',
};

const tdStyle: React.CSSProperties = {
    padding: '10px 6px',
    verticalAlign: 'top',
};
