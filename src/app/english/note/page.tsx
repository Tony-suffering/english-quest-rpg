'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { noteArticles, type NoteArticle } from '@/data/english/note-articles';
import { journalEntries } from '@/data/journal';

function markdownToNoteHtml(text: string): string {
    const lines = text.split('\n');
    const htmlParts: string[] = [];
    let inBlockquote = false;
    let blockquoteLines: string[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' = 'ul';
    let pendingBlanks = 0; // 連続空行カウンタ (段落間のスペーシング保持用)

    const inlineBold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    const flushBlockquote = () => {
        if (blockquoteLines.length > 0) {
            htmlParts.push(`<blockquote>${blockquoteLines.map(l => inlineBold(l)).join('<br>')}</blockquote>`);
            blockquoteLines = [];
        }
        inBlockquote = false;
    };

    const flushList = () => {
        if (listItems.length > 0) {
            const tag = listType;
            htmlParts.push(`<${tag}>${listItems.map(l => `<li>${inlineBold(l)}</li>`).join('')}</${tag}>`);
            listItems = [];
        }
        inList = false;
    };

    // 次の非空ブロックを出す直前に呼んで、溜めた空行を <p><br></p> として挿入
    const flushPendingBlanks = () => {
        if (pendingBlanks > 0 && htmlParts.length > 0) {
            for (let k = 0; k < pendingBlanks; k++) htmlParts.push('<p><br></p>');
        }
        pendingBlanks = 0;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed === '') {
            // blockquote/list 内部の空行はブロック境界、それ以外は空段落として蓄積
            if (inBlockquote) flushBlockquote();
            else if (inList) flushList();
            else pendingBlanks++;
            continue;
        }

        if (trimmed === '---') { flushBlockquote(); flushList(); flushPendingBlanks(); htmlParts.push('<hr>'); continue; }
        if (trimmed.startsWith('> ')) { flushList(); flushPendingBlanks(); inBlockquote = true; blockquoteLines.push(trimmed.slice(2)); continue; } else if (inBlockquote) { flushBlockquote(); }
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (numberedMatch) { flushBlockquote(); if (!inList || listType !== 'ol') { flushList(); flushPendingBlanks(); listType = 'ol'; } inList = true; listItems.push(numberedMatch[2]); continue; }
        if (trimmed.startsWith('- ')) { flushBlockquote(); if (!inList || listType !== 'ul') { flushList(); flushPendingBlanks(); listType = 'ul'; } inList = true; listItems.push(trimmed.slice(2)); continue; } else if (inList) { flushList(); }
        if (trimmed.startsWith('## ')) { flushBlockquote(); flushList(); flushPendingBlanks(); htmlParts.push(`<h2>${trimmed.slice(3)}</h2>`); continue; }
        flushPendingBlanks();
        htmlParts.push(`<p>${inlineBold(trimmed)}</p>`);
    }
    flushBlockquote(); flushList();
    return htmlParts.join('\n');
}

function getCharCount(content: string): number {
    return content.replace(/\s/g, '').replace(/[#\-*>`]/g, '').length;
}

function getReadTime(content: string): number {
    return Math.max(1, Math.ceil(getCharCount(content) / 500));
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

function parseDate(dateStr: string): { year: number; month: number; day: number } {
    if (!dateStr) return { year: 2026, month: 0, day: 1 };
    const [y, m, d] = dateStr.split('-').map(Number);
    return { year: y, month: m - 1, day: d };
}

export default function NotePage() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [scriptOpen, setScriptOpen] = useState(false);
    const [leftTab, setLeftTab] = useState<'note' | 'journal'>('note');
    const [contentView, setContentView] = useState<'public' | 'member'>('public');
    const [journalSearch, setJournalSearch] = useState('');
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());

    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDate = now.getDate();
    const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonth;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const monthLabel = `${viewYear}年 ${viewMonth + 1}月`;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const publishedArticles = useMemo(() => noteArticles.filter(a => a.published), []);
    const draftArticles = useMemo(() => noteArticles.filter(a => !a.published && parseInt(a.id) >= 57), []);

    const articlesByDate = useMemo(() => {
        const map: Record<string, NoteArticle[]> = {};
        publishedArticles.forEach(a => {
            if (!map[a.date]) map[a.date] = [];
            map[a.date].push(a);
        });
        return map;
    }, [publishedArticles]);

    const stats = useMemo(() => {
        const published = publishedArticles.length;
        const drafts = draftArticles.length;
        return { total: published + drafts, published, drafts };
    }, [publishedArticles, draftArticles]);

    const filteredJournalEntries = useMemo(() => {
        if (!journalSearch.trim()) return [...journalEntries].sort((a, b) => Number(b.id) - Number(a.id));
        const q = journalSearch.toLowerCase();
        return journalEntries
            .filter(e => e.title.toLowerCase().includes(q) || e.id.includes(q) || e.summary.toLowerCase().includes(q))
            .sort((a, b) => Number(b.id) - Number(a.id));
    }, [journalSearch]);

    const selectedJournal = selectedJournalId ? journalEntries.find(e => e.id === selectedJournalId) : null;

    // Auto-select today or most recent published article
    useEffect(() => {
        if (selectedDate !== null || selectedArticleId !== null) return;
        const todayStr = `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;
        if (articlesByDate[todayStr]) {
            setSelectedDate(todayStr);
            setSelectedArticleId(articlesByDate[todayStr][0].id);
        } else if (publishedArticles.length > 0) {
            const sorted = [...publishedArticles].sort((a, b) => b.date.localeCompare(a.date));
            const latest = sorted[0];
            setSelectedDate(latest.date);
            setSelectedArticleId(latest.id);
            const parsed = parseDate(latest.date);
            setViewYear(parsed.year);
            setViewMonth(parsed.month);
        }
    }, []);

    useEffect(() => {
        if (detailRef.current) detailRef.current.scrollTop = 0;
        setScriptOpen(false);
    }, [selectedDate, selectedArticleId]);

    const selectedArticle = selectedArticleId
        ? noteArticles.find(a => a.id === selectedArticleId) || null
        : null;
    const selectedArticles = selectedDate ? (articlesByDate[selectedDate] || []) : [];

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };
    const goToday = () => {
        setViewYear(todayYear);
        setViewMonth(todayMonth);
        const todayStr = `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}-${String(todayDate).padStart(2, '0')}`;
        if (articlesByDate[todayStr]) {
            setSelectedDate(todayStr);
            setSelectedArticleId(articlesByDate[todayStr][0].id);
        }
    };

    const handleCopyForNote = async () => {
        if (!selectedArticle) return;
        const sourceContent = (contentView === 'member' && selectedArticle.memberContent)
            ? selectedArticle.content + '\n\n' + selectedArticle.memberContent
            : selectedArticle.content;
        const html = markdownToNoteHtml(sourceContent);
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([html], { type: 'text/html' }),
                    'text/plain': new Blob([sourceContent], { type: 'text/plain' }),
                }),
            ]);
            setCopyFeedback('Copied');
            setTimeout(() => setCopyFeedback(null), 2000);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = sourceContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopyFeedback('Copied (text)');
            setTimeout(() => setCopyFeedback(null), 2000);
        }
    };

    const renderMarkdown = (text: string) => {
        if (!text) return null;
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];
        let inBlockquote = false;
        let blockquoteLines: string[] = [];

        const flushBlockquote = () => {
            if (blockquoteLines.length > 0) {
                elements.push(
                    <blockquote key={`bq-${elements.length}`} style={{
                        borderLeft: '3px solid #D4AF37',
                        paddingLeft: '20px',
                        margin: '24px 0',
                        color: '#78716c',
                        fontStyle: 'italic',
                        lineHeight: '2',
                        position: 'relative',
                    }}>
                        {blockquoteLines.map((line, i) => <span key={i}>{line}<br /></span>)}
                    </blockquote>
                );
                blockquoteLines = [];
            }
            inBlockquote = false;
        };

        const renderInline = (text: string): React.ReactNode[] => {
            const parts: React.ReactNode[] = [];
            const regex = /\*\*(.+?)\*\*/g;
            let lastIndex = 0;
            let match;
            let key = 0;
            while ((match = regex.exec(text)) !== null) {
                if (match.index > lastIndex) parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
                parts.push(<strong key={key++} style={{ color: '#1c1917', fontWeight: '700' }}>{match[1]}</strong>);
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < text.length) parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
            return parts;
        };

        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (trimmed === '---') {
                flushBlockquote();
                elements.push(
                    <div key={`hr-${i}`} style={{
                        margin: '36px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                    }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #d6d3d1)' }} />
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D4AF37', opacity: 0.5 }} />
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #d6d3d1, transparent)' }} />
                    </div>
                );
                continue;
            }
            if (trimmed.startsWith('> ')) { inBlockquote = true; blockquoteLines.push(trimmed.slice(2)); continue; } else if (inBlockquote) { flushBlockquote(); }
            if (trimmed.startsWith('## ')) {
                elements.push(
                    <h2 key={`h2-${i}`} style={{
                        fontSize: '17px',
                        fontWeight: '800',
                        color: '#1c1917',
                        marginTop: '36px',
                        marginBottom: '14px',
                        paddingBottom: '8px',
                        borderBottom: '2px solid #D4AF3730',
                        letterSpacing: '0.3px',
                    }}>
                        <span style={{ color: '#D4AF37', marginRight: '6px', fontWeight: '400' }}>//</span>
                        {trimmed.slice(3)}
                    </h2>
                );
                continue;
            }
            const nm = trimmed.match(/^(\d+)\.\s+(.+)/);
            if (nm) {
                elements.push(
                    <div key={`ol-${i}`} style={{
                        paddingLeft: '28px',
                        position: 'relative',
                        margin: '8px 0',
                        lineHeight: '1.9',
                        color: '#44403c',
                        fontSize: '15px',
                    }}>
                        <span style={{
                            position: 'absolute',
                            left: '0',
                            color: '#D4AF37',
                            fontWeight: '700',
                            fontSize: '13px',
                            width: '20px',
                            textAlign: 'right',
                        }}>{nm[1]}.</span>
                        {renderInline(nm[2])}
                    </div>
                );
                continue;
            }
            if (trimmed.startsWith('- ')) {
                elements.push(
                    <div key={`li-${i}`} style={{
                        paddingLeft: '24px',
                        position: 'relative',
                        margin: '6px 0',
                        lineHeight: '1.9',
                        color: '#44403c',
                        fontSize: '15px',
                    }}>
                        <span style={{
                            position: 'absolute',
                            left: '8px',
                            top: '10px',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#D4AF37',
                        }} />
                        {renderInline(trimmed.slice(2))}
                    </div>
                );
                continue;
            }
            if (trimmed === '') continue;
            elements.push(
                <p key={`p-${i}`} style={{
                    margin: '12px 0',
                    lineHeight: '2',
                    color: '#44403c',
                    fontSize: '15px',
                    letterSpacing: '0.2px',
                }}>
                    {renderInline(trimmed)}
                </p>
            );
        }
        flushBlockquote();
        return elements;
    };

    // Build calendar grid
    const calendarCells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
    while (calendarCells.length % 7 !== 0) calendarCells.push(null);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#fafaf9',
        }}>
            {/* Header */}
            <div style={{
                padding: '0 24px',
                height: '56px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e7e5e4',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
                {/* Left: Tab + Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        display: 'flex',
                        gap: '2px',
                        backgroundColor: '#f5f5f4',
                        borderRadius: '10px',
                        padding: '3px',
                    }}>
                        <button onClick={() => setLeftTab('note')} style={{
                            background: leftTab === 'note' ? '#fff' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 16px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: leftTab === 'note' ? '#1c1917' : '#a8a29e',
                            boxShadow: leftTab === 'note' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.3px',
                        }}>note.com</button>
                        <button onClick={() => setLeftTab('journal')} style={{
                            background: leftTab === 'journal' ? '#fff' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 16px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: leftTab === 'journal' ? '#1c1917' : '#a8a29e',
                            boxShadow: leftTab === 'journal' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.3px',
                        }}>Journal ({journalEntries.length})</button>
                    </div>
                    {leftTab === 'note' && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                backgroundColor: '#f0fdf4',
                                borderRadius: '6px',
                            }}>
                                <span style={{
                                    width: '6px', height: '6px', borderRadius: '50%',
                                    backgroundColor: '#22c55e',
                                }} />
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#166534' }}>
                                    {stats.published}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 12px',
                                backgroundColor: '#fffbeb',
                                borderRadius: '6px',
                            }}>
                                <span style={{
                                    width: '6px', height: '6px', borderRadius: '50%',
                                    backgroundColor: '#f59e0b',
                                }} />
                                <span style={{ fontSize: '11px', fontWeight: '700', color: '#92400e' }}>
                                    {stats.drafts}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Center: Month nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={prevMonth} style={{
                        background: 'none',
                        border: '1px solid #e7e5e4',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#78716c',
                        transition: 'all 0.15s ease',
                        lineHeight: '1',
                    }}>&#8249;</button>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#1c1917',
                        minWidth: '120px',
                        textAlign: 'center',
                        letterSpacing: '0.5px',
                    }}>{monthLabel}</span>
                    <button onClick={nextMonth} style={{
                        background: 'none',
                        border: '1px solid #e7e5e4',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#78716c',
                        transition: 'all 0.15s ease',
                        lineHeight: '1',
                    }}>&#8250;</button>
                </div>

                {/* Right: Today + Thumb + Magazine + Membership */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!isCurrentMonth && (
                        <button onClick={goToday} style={{
                            background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                            border: 'none',
                            color: '#fff',
                            padding: '6px 16px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            letterSpacing: '0.5px',
                            transition: 'all 0.2s ease',
                        }}>今日</button>
                    )}
                    <a href="/note-thumbnails.html" target="_blank" rel="noopener noreferrer" style={{
                        padding: '6px 14px',
                        backgroundColor: '#1c1917',
                        color: '#D4AF37',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                        transition: 'all 0.2s ease',
                    }}>Thumb</a>
                    <a href="/note-magazine.html" target="_blank" rel="noopener noreferrer" style={{
                        padding: '6px 14px',
                        backgroundColor: '#1c1917',
                        color: '#10B981',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                        transition: 'all 0.2s ease',
                    }}>Magazine</a>
                    <button onClick={() => {
                        const el = document.getElementById('membership-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} style={{
                        padding: '6px 14px',
                        background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '10px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        letterSpacing: '0.5px',
                        transition: 'all 0.2s ease',
                    }}>Membership</button>
                </div>
            </div>

            {/* Main content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                minHeight: 0,
            }}>
                {/* Left Panel */}
                <div style={{
                    flex: isMobile ? 'none' : '0 0 480px',
                    height: isMobile ? '50%' : '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    borderRight: isMobile ? 'none' : '1px solid #e7e5e4',
                }}>
                  {leftTab === 'journal' ? (
                    /* -- Journal Browser -- */
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{
                            padding: '14px 16px',
                            borderBottom: '1px solid #e7e5e4',
                            flexShrink: 0,
                            backgroundColor: '#fafaf9',
                        }}>
                            <input
                                type="text"
                                value={journalSearch}
                                onChange={(e) => setJournalSearch(e.target.value)}
                                placeholder="Search journal entries... (title, ID, summary)"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    fontSize: '12px',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: '10px',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    transition: 'border-color 0.2s ease',
                                    color: '#1c1917',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#D4AF37'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                            />
                            <div style={{
                                fontSize: '10px',
                                color: '#a8a29e',
                                marginTop: '8px',
                                fontWeight: '500',
                            }}>
                                {filteredJournalEntries.length} / {journalEntries.length} entries
                            </div>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 10px' }}>
                            {filteredJournalEntries.map(entry => {
                                const isActive = selectedJournalId === entry.id;
                                return (
                                    <div
                                        key={entry.id}
                                        onClick={() => {
                                            setSelectedJournalId(entry.id);
                                            setSelectedArticleId(null);
                                            setSelectedDate(null);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '10px 12px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            marginBottom: '2px',
                                            backgroundColor: isActive ? '#fffbeb' : 'transparent',
                                            border: isActive ? '1px solid #D4AF3740' : '1px solid transparent',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <span style={{
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            color: '#D4AF37',
                                            backgroundColor: isActive ? '#fff' : '#fafaf9',
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            flexShrink: 0,
                                            border: '1px solid #e7e5e410',
                                        }}>#{entry.id}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: isActive ? '#1c1917' : '#57534e',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}>{entry.title}</div>
                                            <div style={{
                                                fontSize: '10px',
                                                color: '#a8a29e',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                marginTop: '2px',
                                            }}>{entry.date} -- {entry.readTime}min</div>
                                        </div>
                                        {entry.featured && (
                                            <span style={{
                                                fontSize: '8px',
                                                fontWeight: '800',
                                                color: '#D4AF37',
                                                backgroundColor: '#fffbeb',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                flexShrink: 0,
                                                letterSpacing: '0.5px',
                                            }}>FEAT</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                  ) : (
                    /* -- Note Calendar -- */
                    <>
                    {/* Day headers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        borderBottom: '1px solid #e7e5e4',
                        flexShrink: 0,
                        backgroundColor: '#fafaf9',
                    }}>
                        {WEEKDAYS.map((d, i) => (
                            <div key={d} style={{
                                textAlign: 'center',
                                fontSize: '10px',
                                fontWeight: '700',
                                color: i === 0 ? '#ef4444' : i === 6 ? '#3b82f6' : '#78716c',
                                padding: '10px 0',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                            }}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '3px',
                        padding: '6px',
                        backgroundColor: '#f5f5f4',
                        flex: 1,
                    }}>
                        {calendarCells.map((day, i) => {
                            if (day === null) {
                                return <div key={`empty-${i}`} style={{
                                    backgroundColor: '#fafaf9',
                                    borderRadius: '8px',
                                }} />;
                            }

                            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const dayArticles = articlesByDate[dateStr] || [];
                            const count = dayArticles.length;
                            const isToday = isCurrentMonth && day === todayDate;
                            const isSelected = selectedDate === dateStr;
                            const dayOfWeek = (firstDay + day - 1) % 7;

                            return (
                                <div
                                    key={day}
                                    onClick={() => {
                                        if (count > 0) {
                                            setSelectedDate(dateStr);
                                            setSelectedArticleId(dayArticles[0].id);
                                        }
                                    }}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        cursor: count > 0 ? 'pointer' : 'default',
                                        backgroundColor: isSelected ? '#fffbeb' : '#fff',
                                        boxShadow: isSelected
                                            ? '0 0 0 2px #D4AF37, 0 2px 8px rgba(212,175,55,0.15)'
                                            : isToday
                                                ? '0 0 0 2px #10b981'
                                                : '0 1px 2px rgba(0,0,0,0.03)',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: 0,
                                    }}
                                >
                                    {/* Color bar at top for articles */}
                                    {count > 0 && (
                                        <div style={{
                                            height: '3px',
                                            background: 'linear-gradient(90deg, #10B981, #22c55e)',
                                            flexShrink: 0,
                                        }} />
                                    )}

                                    {/* Day number */}
                                    <div style={{
                                        padding: '4px 6px 0',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: isToday
                                            ? '#D4AF37'
                                            : count > 0
                                                ? dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : '#1c1917'
                                                : dayOfWeek === 0 ? 'rgba(239,68,68,0.3)' : dayOfWeek === 6 ? 'rgba(59,130,246,0.3)' : '#d6d3d1',
                                        flexShrink: 0,
                                    }}>
                                        {day}
                                    </div>

                                    {/* Article titles inside cell */}
                                    {count > 0 && (
                                        <div style={{
                                            flex: 1,
                                            padding: '3px 6px 5px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '2px',
                                        }}>
                                            {dayArticles.slice(0, 3).map((a, idx) => (
                                                <div key={a.id} style={{
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    color: '#166534',
                                                    lineHeight: '1.3',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: idx === 0 ? 2 : 1,
                                                    WebkitBoxOrient: 'vertical' as const,
                                                }}>
                                                    {a.title}
                                                </div>
                                            ))}
                                            {count > 3 && (
                                                <div style={{
                                                    fontSize: '9px',
                                                    fontWeight: '700',
                                                    color: '#D4AF37',
                                                    marginTop: '1px',
                                                }}>
                                                    +{count - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Drafts section */}
                    {draftArticles.length > 0 && (
                        <div style={{
                            borderTop: '1px solid #e7e5e4',
                            flexShrink: 0,
                        }}>
                            <div style={{
                                padding: '12px 16px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    color: '#92400e',
                                    letterSpacing: '1.5px',
                                }}>DRAFTS</span>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    color: '#d97706',
                                    backgroundColor: '#fef3c7',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                }}>{draftArticles.length}</span>
                            </div>
                            <div style={{ padding: '0 10px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {draftArticles.map(a => {
                                    const isActive = selectedArticleId === a.id;
                                    return (
                                        <div
                                            key={a.id}
                                            onClick={() => {
                                                setSelectedDate(null);
                                                setSelectedArticleId(a.id);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '10px 12px',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                backgroundColor: isActive ? '#fffbeb' : 'transparent',
                                                border: isActive ? '1px solid #D4AF3740' : '1px solid transparent',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '10px',
                                                fontWeight: '700',
                                                color: '#d97706',
                                                backgroundColor: '#fef3c7',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                flexShrink: 0,
                                            }}>#{a.id}</span>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: isActive ? '#1c1917' : '#57534e',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                flex: 1,
                                            }}>{a.title}</span>
                                            <span style={{
                                                fontSize: '10px',
                                                color: '#a8a29e',
                                                flexShrink: 0,
                                                fontWeight: '500',
                                            }}>{getCharCount(a.content).toLocaleString()}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Membership Section */}
                    <div id="membership-section" style={{
                        borderTop: '1px solid #e7e5e4',
                        flexShrink: 0,
                        padding: '24px 20px',
                        background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
                    }}>
                        <div style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            color: '#D4AF37',
                            letterSpacing: '2px',
                            marginBottom: '10px',
                        }}>MEMBERSHIP</div>
                        <div style={{
                            fontSize: '17px',
                            fontWeight: '800',
                            color: '#fff',
                            marginBottom: '14px',
                            lineHeight: '1.5',
                        }}>900点の嘘つきクラブ</div>
                        <div style={{
                            fontSize: '12px',
                            color: '#d6d3d1',
                            lineHeight: '1.9',
                            marginBottom: '20px',
                        }}>
                            <p style={{ margin: '0 0 12px' }}>
                                「英語できます」と書いた履歴書が時限爆弾になってる。
                                会議で外国人が喋り出すと急にメモを取るフリをする。
                                TOEIC900点という称号だけで10年生き延びてきた男が、ついに観念しました。
                            </p>
                            <p style={{ margin: '0 0 12px' }}>
                                このメンバーシップでは、喋れない900点が英語とAI哲学を同時にどうにかしようとする全過程を公開します。
                            </p>
                            <div style={{
                                margin: '0 0 12px',
                                paddingLeft: '12px',
                                borderLeft: '2px solid #D4AF3760',
                            }}>
                                <div style={{ margin: '4px 0' }}>-- 毎日更新中の英語アプリ開発の裏側</div>
                                <div style={{ margin: '4px 0' }}>-- AIに人格を持たせようとして哲学に迷い込んだ記録</div>
                                <div style={{ margin: '4px 0' }}>-- 「通じた」「通じなかった」のリアルな実験ログ</div>
                                <div style={{ margin: '4px 0' }}>-- メンバー限定の未公開記事・没ネタ・反省文</div>
                            </div>
                            <p style={{ margin: '0 0 12px' }}>
                                週2回以上更新。過去の恥も全部読めます。
                            </p>
                            <p style={{
                                margin: '0',
                                color: '#a8a29e',
                                fontStyle: 'italic',
                                fontSize: '11px',
                                lineHeight: '1.8',
                            }}>
                                正直に言います。ここに答えはありません。でも「点は取れるのに喋れない」という同じ傷を持つ人と、一緒に這い上がりたい。英語もAIも、知れば知るほど面白いんですよ。悔しいけど。
                            </p>
                        </div>

                        {/* note.com membership description (for copy) */}
                        <div style={{
                            background: '#0c0a0980',
                            borderRadius: '10px',
                            padding: '14px',
                            marginBottom: '12px',
                            border: '1px solid #D4AF3720',
                        }}>
                            <div style={{
                                fontSize: '9px',
                                fontWeight: '700',
                                color: '#D4AF37',
                                marginBottom: '8px',
                                letterSpacing: '1px',
                            }}>note.com 紹介文 (140字)</div>
                            <div style={{
                                fontSize: '12px',
                                color: '#e7e5e4',
                                lineHeight: '1.7',
                                fontFamily: 'monospace',
                            }}>
                                「英語できます」と書いた履歴書が時限爆弾になってる方に向けて、TOEIC900なのに喋れない男の英語xAI哲学リハビリ日記を週2回お届けします。過去の恥も見放題です。
                            </div>
                        </div>

                        {/* Plan removed */}
                    </div>
                    </>
                  )}
                </div>

                {/* Right: Article detail panel */}
                <div
                    ref={detailRef}
                    style={{
                        flex: isMobile ? 'none' : '1',
                        height: isMobile ? '50%' : '100%',
                        overflowY: 'auto',
                        backgroundColor: '#fafaf9',
                        borderTop: isMobile ? '1px solid #e7e5e4' : 'none',
                    }}
                >
                    {selectedJournal ? (
                        /* -- Journal Entry Detail -- */
                        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 40px' }}>
                            {/* Header bar */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        color: '#D4AF37',
                                        backgroundColor: '#fffbeb',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        letterSpacing: '0.5px',
                                        border: '1px solid #D4AF3720',
                                    }}>JOURNAL #{selectedJournal.id}</span>
                                    <span style={{
                                        fontSize: '12px',
                                        color: '#a8a29e',
                                        fontWeight: '500',
                                    }}>{selectedJournal.date}</span>
                                    <span style={{
                                        fontSize: '11px',
                                        color: '#d6d3d1',
                                    }}>{selectedJournal.readTime}min</span>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button onClick={() => {
                                        if (!selectedJournal.conversation) return;
                                        navigator.clipboard.writeText(selectedJournal.conversation);
                                        setCopyFeedback('Copied');
                                        setTimeout(() => setCopyFeedback(null), 2000);
                                    }} style={{
                                        padding: '6px 16px',
                                        backgroundColor: copyFeedback ? '#166534' : '#1c1917',
                                        color: copyFeedback ? '#fff' : '#D4AF37',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        letterSpacing: '0.3px',
                                    }}>
                                        {copyFeedback || 'Copy MD'}
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px',
                                marginBottom: '16px',
                            }}>
                                {(selectedJournal.businessTags || []).map(tag => (
                                    <span key={tag} style={{
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        backgroundColor: '#fffbeb',
                                        color: '#D4AF37',
                                        border: '1px solid #D4AF3720',
                                    }}>{tag}</span>
                                ))}
                                {(selectedJournal.techTags || []).map(tag => (
                                    <span key={tag} style={{
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '600',
                                        backgroundColor: '#f5f5f4',
                                        color: '#78716c',
                                        border: '1px solid #e7e5e4',
                                    }}>{tag}</span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: '800',
                                color: '#1c1917',
                                lineHeight: '1.5',
                                margin: '0 0 10px 0',
                                letterSpacing: '-0.3px',
                            }}>{selectedJournal.title}</h1>

                            {selectedJournal.subtitle && (
                                <p style={{
                                    fontSize: '14px',
                                    color: '#78716c',
                                    margin: '0 0 20px 0',
                                    lineHeight: '1.7',
                                    fontStyle: 'italic',
                                }}>
                                    {selectedJournal.subtitle}
                                </p>
                            )}

                            <p style={{
                                fontSize: '13px',
                                color: '#57534e',
                                margin: '0 0 24px 0',
                                lineHeight: '1.8',
                            }}>
                                {selectedJournal.summary}
                            </p>

                            {/* Article body card */}
                            <div style={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                padding: '32px',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                border: '1px solid #e7e5e4',
                            }}>
                                {selectedJournal.conversation ? renderMarkdown(selectedJournal.conversation) : (
                                    <p style={{ color: '#a8a29e', fontStyle: 'italic' }}>No conversation content</p>
                                )}
                            </div>

                            {selectedJournal.englishSummary && (
                                <div style={{
                                    marginTop: '32px',
                                    padding: '24px',
                                    backgroundColor: '#fffbeb',
                                    borderRadius: '16px',
                                    border: '1px solid #D4AF3730',
                                }}>
                                    <div style={{
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        color: '#92400e',
                                        letterSpacing: '1px',
                                        marginBottom: '12px',
                                    }}>ENGLISH SUMMARY (Pro)</div>
                                    <div style={{
                                        fontSize: '13px',
                                        color: '#44403c',
                                        lineHeight: '1.8',
                                    }}>
                                        {selectedJournal.englishSummary.content ? renderMarkdown(selectedJournal.englishSummary.content) : <p style={{ color: '#a8a29e' }}>No content</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : selectedArticle ? (
                        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 40px' }}>
                            {/* Top bar: date + actions */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#a8a29e',
                                    fontWeight: '500',
                                }}>
                                    {selectedDate && (() => {
                                        const p = parseDate(selectedDate);
                                        return `${p.month + 1}月${p.day}日`;
                                    })()}
                                    {selectedArticles.length > 1 && (
                                        <span> - {selectedArticles.length} articles</span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {selectedArticle.noteUrl && (
                                        <a href={selectedArticle.noteUrl} target="_blank" rel="noopener noreferrer" style={{
                                            padding: '6px 14px',
                                            backgroundColor: '#fff',
                                            color: '#57534e',
                                            border: '1px solid #e7e5e4',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            transition: 'all 0.15s ease',
                                        }}>note.com</a>
                                    )}
                                    <button onClick={handleCopyForNote} style={{
                                        padding: '6px 16px',
                                        backgroundColor: copyFeedback ? '#166534' : '#1c1917',
                                        color: copyFeedback ? '#fff' : '#D4AF37',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        letterSpacing: '0.3px',
                                    }}>
                                        {copyFeedback || 'Copy'}
                                    </button>
                                </div>
                            </div>

                            {/* Article tabs if multiple on same day */}
                            {selectedArticles.length > 1 && (
                                <div style={{
                                    display: 'flex',
                                    gap: '6px',
                                    marginBottom: '20px',
                                    flexWrap: 'wrap',
                                }}>
                                    {selectedArticles.map(a => {
                                        const isActive = a.id === selectedArticle.id;
                                        return (
                                            <button key={a.id} onClick={() => setSelectedArticleId(a.id)} style={{
                                                padding: '6px 14px',
                                                borderRadius: '8px',
                                                border: isActive ? '1px solid #D4AF37' : '1px solid #e7e5e4',
                                                backgroundColor: isActive ? '#fffbeb' : '#fff',
                                                color: isActive ? '#B8860B' : '#a8a29e',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                maxWidth: '200px',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}>
                                                #{a.id} {a.title.slice(0, 24)}{a.title.length > 24 ? '...' : ''}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Article header card */}
                            <div style={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                padding: '28px 32px',
                                marginBottom: '20px',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                border: '1px solid #e7e5e4',
                                borderTop: '3px solid #D4AF37',
                            }}>
                                {/* Status + tags */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '16px',
                                    flexWrap: 'wrap',
                                }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '4px 12px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        letterSpacing: '0.8px',
                                        backgroundColor: selectedArticle.published ? '#f0fdf4' : '#fffbeb',
                                        color: selectedArticle.published ? '#166534' : '#92400e',
                                        border: selectedArticle.published ? '1px solid #bbf7d0' : '1px solid #fde68a',
                                    }}>
                                        <span style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: selectedArticle.published ? '#22c55e' : '#f59e0b',
                                        }} />
                                        {selectedArticle.published ? 'PUBLISHED' : 'DRAFT'}
                                    </span>
                                    {selectedArticle.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '4px 12px',
                                            borderRadius: '6px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            backgroundColor: '#f5f5f4',
                                            color: '#78716c',
                                            border: '1px solid #e7e5e4',
                                        }}>{tag}</span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 style={{
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    color: '#1c1917',
                                    lineHeight: '1.5',
                                    letterSpacing: '-0.3px',
                                    margin: '0 0 8px 0',
                                }}>
                                    {selectedArticle.title}
                                </h1>

                                {selectedArticle.subtitle && (
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#78716c',
                                        lineHeight: '1.7',
                                        margin: '0 0 16px 0',
                                        fontStyle: 'italic',
                                    }}>{selectedArticle.subtitle}</p>
                                )}

                                {/* Meta row */}
                                {selectedArticle.content && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'center',
                                        paddingTop: '16px',
                                        borderTop: '1px solid #f5f5f4',
                                    }}>
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            color: '#a8a29e',
                                        }}>
                                            {getCharCount(selectedArticle.content).toLocaleString()} chars
                                        </span>
                                        <span style={{
                                            width: '3px',
                                            height: '3px',
                                            borderRadius: '50%',
                                            backgroundColor: '#d6d3d1',
                                        }} />
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            color: '#a8a29e',
                                        }}>
                                            {getReadTime(selectedArticle.content)} min read
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Stand.fm Audio Section */}
                            {(selectedArticle.standfmUrl || selectedArticle.standfmScript) && (
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '20px 24px',
                                    marginBottom: '20px',
                                    border: '1px solid #e7e5e4',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '10px',
                                                background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                    <line x1="12" y1="19" x2="12" y2="23" />
                                                    <line x1="8" y1="23" x2="16" y2="23" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontSize: '11px',
                                                    fontWeight: '800',
                                                    color: '#B8860B',
                                                    letterSpacing: '1.5px',
                                                }}>
                                                    STAND.FM
                                                </div>
                                                <div style={{ fontSize: '10px', color: '#a8a29e' }}>
                                                    Audio script by Tonio
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {selectedArticle.standfmScript && (
                                                <button
                                                    onClick={() => setScriptOpen(!scriptOpen)}
                                                    style={{
                                                        padding: '6px 14px',
                                                        backgroundColor: scriptOpen ? '#fffbeb' : '#fff',
                                                        color: scriptOpen ? '#B8860B' : '#78716c',
                                                        border: `1px solid ${scriptOpen ? '#D4AF37' : '#e7e5e4'}`,
                                                        borderRadius: '8px',
                                                        fontSize: '10px',
                                                        fontWeight: '700',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                    }}
                                                >
                                                    {scriptOpen ? 'Hide Script' : 'Show Script'}
                                                </button>
                                            )}
                                            {selectedArticle.standfmUrl && (
                                                <a
                                                    href={selectedArticle.standfmUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: '6px 14px',
                                                        background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        fontSize: '10px',
                                                        fontWeight: '700',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Listen
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {scriptOpen && selectedArticle.standfmScript && (
                                        <div style={{
                                            marginTop: '16px',
                                            padding: '20px',
                                            backgroundColor: '#fafaf9',
                                            borderRadius: '12px',
                                            border: '1px solid #e7e5e4',
                                            maxHeight: '400px',
                                            overflowY: 'auto',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '16px',
                                            }}>
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: '700',
                                                    color: '#B8860B',
                                                    letterSpacing: '1px',
                                                }}>
                                                    SCRIPT
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(selectedArticle.standfmScript || '');
                                                        setCopyFeedback('Script copied');
                                                        setTimeout(() => setCopyFeedback(null), 2000);
                                                    }}
                                                    style={{
                                                        padding: '4px 12px',
                                                        backgroundColor: '#fff',
                                                        color: '#78716c',
                                                        border: '1px solid #e7e5e4',
                                                        borderRadius: '6px',
                                                        fontSize: '10px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            {selectedArticle.standfmScript.split('\n\n').map((para, i) => {
                                                const isEnglish = /^[A-Z'"(SO]/.test(para.trim());
                                                return (
                                                    <p key={i} style={{
                                                        margin: '0 0 14px 0',
                                                        fontSize: '13px',
                                                        color: isEnglish ? '#166534' : '#44403c',
                                                        lineHeight: '1.9',
                                                        paddingLeft: isEnglish ? '14px' : '0',
                                                        borderLeft: isEnglish ? '3px solid #10B981' : 'none',
                                                    }}>
                                                        {para}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Article body card */}
                            <div style={{
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                padding: '32px',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                border: '1px solid #e7e5e4',
                            }}>
                                {/* Copy buttons */}
                                {selectedArticle.memberContent && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                        marginBottom: '20px',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <button
                                            onClick={() => { setContentView('public'); setTimeout(handleCopyForNote, 0); }}
                                            style={{
                                                fontSize: '10px',
                                                padding: '5px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #e7e5e4',
                                                background: '#fff',
                                                color: '#78716c',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >Copy PUBLIC ({getCharCount(selectedArticle.content).toLocaleString()})</button>
                                        <button
                                            onClick={() => { setContentView('member'); setTimeout(handleCopyForNote, 0); }}
                                            style={{
                                                fontSize: '10px',
                                                padding: '5px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #D4AF3740',
                                                background: '#fffbeb',
                                                color: '#92400E',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >Copy FULL ({getCharCount(selectedArticle.content + '\n' + selectedArticle.memberContent).toLocaleString()})</button>
                                    </div>
                                )}

                                {/* PUBLIC content */}
                                {selectedArticle.content ? renderMarkdown(selectedArticle.content) : (
                                    <div style={{
                                        padding: '60px 0',
                                        textAlign: 'center',
                                        color: '#d6d3d1',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}>下書き準備中</div>
                                )}

                                {/* Member continuation */}
                                {selectedArticle.memberContent && (
                                    <>
                                        {/* Gate divider */}
                                        <div style={{
                                            margin: '40px 0',
                                            position: 'relative',
                                            textAlign: 'center',
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                                            }} />
                                            <span style={{
                                                position: 'relative',
                                                display: 'inline-block',
                                                background: 'linear-gradient(135deg, #1C1917, #292524)',
                                                color: '#D4AF37',
                                                padding: '10px 28px',
                                                borderRadius: '24px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                letterSpacing: '2px',
                                            }}>MEMBER ONLY -- ここから先はメンバー限定</span>
                                        </div>

                                        {/* Member content continuation */}
                                        <div style={{
                                            backgroundColor: '#FFFDF7',
                                            borderRadius: '14px',
                                            padding: '28px',
                                            border: '1px solid #D4AF3730',
                                            boxShadow: '0 1px 4px rgba(212,175,55,0.06)',
                                        }}>
                                            {renderMarkdown(selectedArticle.memberContent)}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* -- Empty state -- */
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            padding: '40px',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                border: '1px solid #D4AF3720',
                            }}>
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: '200',
                                    color: '#D4AF37',
                                    fontFamily: 'Georgia, serif',
                                }}>N</span>
                            </div>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: '700',
                                color: '#1c1917',
                                marginBottom: '8px',
                            }}>note.com Articles</div>
                            <div style={{
                                fontSize: '12px',
                                color: '#a8a29e',
                                lineHeight: '1.6',
                                marginBottom: '20px',
                            }}>
                                カレンダーから日付を選択
                            </div>
                            <div style={{
                                padding: '8px 20px',
                                backgroundColor: '#fff',
                                borderRadius: '10px',
                                border: '1px solid #e7e5e4',
                                fontSize: '12px',
                                color: '#78716c',
                                fontWeight: '600',
                            }}>{stats.total} articles</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
