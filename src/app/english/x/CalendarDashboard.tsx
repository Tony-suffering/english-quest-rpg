'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
    LAUNCH_DATE,
    getDayNumber,
    getPostPlanForDay,
    getDateForDay,
    getDayOfWeekJP,
    isThursday,
} from '@/data/x-playbook';
import type { XTweet, Wheel } from '@/data/x-tweets';
import { getNoteUrl, getNoteTitle } from '@/data/note-url-map';
import { CardPreview } from './CardViews';

const STORAGE_KEY = 'x_playbook_v2';
const CARD_DISPLAY_SIZE = 460;
const CARD_EXPORT_SIZE = 1080;
const SCALE = CARD_EXPORT_SIZE / CARD_DISPLAY_SIZE;

interface CompletionState {
    [dayKey: string]: { morning?: boolean; midday?: boolean; evening?: boolean };
}

function loadState(): CompletionState {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
}

function saveState(s: CompletionState) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function getWheel(tweet?: XTweet): Wheel {
    if (!tweet) return 'english';
    if (tweet.wheel) return tweet.wheel;
    return tweet.cardType === 'philosophy' ? 'philosophy' : 'english';
}

export default function CalendarDashboard({ tweets }: { tweets: XTweet[] }) {
    const [state, setState] = useState<CompletionState>({});
    const [viewDay, setViewDay] = useState<number>(0);
    const [hydrated, setHydrated] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        setState(loadState());
        setViewDay(getDayNumber());
        setHydrated(true);
    }, []);

    const today = useMemo(() => getDayNumber(), []);
    const dayPlan = useMemo(() => getPostPlanForDay(viewDay), [viewDay]);
    const dateStr = useMemo(() => getDateForDay(viewDay), [viewDay]);
    const dow = useMemo(() => getDayOfWeekJP(new Date(dateStr + 'T00:00:00+09:00')), [dateStr]);
    const isHeroDay = useMemo(() => isThursday(viewDay), [viewDay]);

    const dayKey = `day-${viewDay}`;
    const dayState = state[dayKey] ?? {};

    const morningTweet = dayPlan?.morning?.tweetId ? tweets.find(t => t.id === dayPlan.morning?.tweetId) : undefined;
    const middayTweet = dayPlan?.midday?.tweetId ? tweets.find(t => t.id === dayPlan.midday?.tweetId) : undefined;
    const eveningTweet = dayPlan?.evening?.tweetId ? tweets.find(t => t.id === dayPlan.evening?.tweetId) : undefined;

    const update = (slot: 'morning' | 'midday' | 'evening', value: boolean) => {
        const next = { ...state, [dayKey]: { ...dayState, [slot]: value } };
        setState(next);
        saveState(next);
    };

    const copy = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 1500);
        } catch (err) { console.error(err); }
    };

    const downloadImage = async (id: string) => {
        const node = cardRefs.current[id];
        if (!node) return;
        try {
            setDownloadingId(id);
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(node, {
                backgroundColor: null,
                scale: SCALE,
                useCORS: true,
                width: CARD_DISPLAY_SIZE,
                height: CARD_DISPLAY_SIZE,
            });
            const link = document.createElement('a');
            link.download = `tonio-day${viewDay}-${id}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('download failed', err);
            alert('画像生成に失敗しました');
        } finally {
            setDownloadingId(null);
        }
    };

    if (!hydrated) return <div style={{ padding: 40, color: '#888' }}>読み込み中...</div>;

    const todayDoneCount = (dayState.morning ? 1 : 0) + (dayState.midday ? 1 : 0) + (dayState.evening ? 1 : 0);

    return (
        <div style={{ maxWidth: 1500, margin: '0 auto', padding: '20px 16px' }}>
            {/* === シンプル ヘッダー === */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 16, padding: '18px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div>
                    <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.2em', marginBottom: 2 }}>@TONIO_ENGLISH</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', margin: 0 }}>
                            Day {viewDay}
                        </h1>
                        <span style={{ fontSize: 13, color: '#525252' }}>
                            {dateStr} ({dow})
                            {isHeroDay && (
                                <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: '#92400E', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: 4 }}>
                                    HERO
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: todayDoneCount === 3 ? '#10B981' : '#D4AF37' }}>
                        {todayDoneCount}/3
                    </div>
                    <button onClick={() => setViewDay(Math.max(1, viewDay - 1))} disabled={viewDay <= 1} style={navBtn(false)}>‹</button>
                    <button onClick={() => setViewDay(today)} style={navBtn(viewDay === today)}>今日</button>
                    <button onClick={() => setViewDay(viewDay + 1)} disabled={viewDay >= 30} style={navBtn(false)}>›</button>
                </div>
            </div>

            {/* === 今日の3投稿 (カード画像入り) === */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 24 }}>
                <PostSlot
                    band="朝 08:00"
                    accent="#D4AF37"
                    theme={dayPlan?.morning?.theme}
                    tweet={morningTweet}
                    done={!!dayState.morning}
                    onToggle={() => update('morning', !dayState.morning)}
                    copy={copy}
                    copiedKey={copiedKey}
                    downloadImage={downloadImage}
                    downloadingId={downloadingId}
                    cardRefs={cardRefs}
                />
                <PostSlot
                    band="昼 12:00"
                    accent="#525252"
                    theme={dayPlan?.midday?.theme}
                    tweet={middayTweet}
                    done={!!dayState.midday}
                    onToggle={() => update('midday', !dayState.midday)}
                    copy={copy}
                    copiedKey={copiedKey}
                    downloadImage={downloadImage}
                    downloadingId={downloadingId}
                    cardRefs={cardRefs}
                />
                <PostSlot
                    band={`夜 21:00${dayPlan?.evening?.isHero ? ' / HERO' : ''}`}
                    accent={dayPlan?.evening?.isHero ? '#DC2626' : '#D4AF37'}
                    theme={dayPlan?.evening?.theme}
                    tweet={eveningTweet}
                    done={!!dayState.evening}
                    onToggle={() => update('evening', !dayState.evening)}
                    copy={copy}
                    copiedKey={copiedKey}
                    downloadImage={downloadImage}
                    downloadingId={downloadingId}
                    cardRefs={cardRefs}
                />
            </div>

            {/* === 30日 ミニカレンダー (フッター) === */}
            <div style={{ marginTop: 32, padding: '14px 18px', backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 12 }}>
                <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.15em', marginBottom: 8 }}>30 DAY</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: 3 }}>
                    {Array.from({ length: 30 }, (_, i) => {
                        const day = i + 1;
                        const ds = state[`day-${day}`];
                        const score = (ds?.morning ? 1 : 0) + (ds?.midday ? 1 : 0) + (ds?.evening ? 1 : 0);
                        const colors = ['#f5f5f4', '#fde68a', '#86efac', '#22c55e'];
                        const isToday = day === today;
                        const isView = day === viewDay;
                        return (
                            <button
                                key={i}
                                onClick={() => setViewDay(day)}
                                title={`Day ${day} (${getDateForDay(day)}) - ${score}/3`}
                                style={{
                                    height: 24,
                                    border: 'none',
                                    borderRadius: 3,
                                    padding: 0,
                                    backgroundColor: colors[score],
                                    cursor: 'pointer',
                                    outline: isView ? '2px solid #1c1917' : isToday ? '2px solid #D4AF37' : 'none',
                                    outlineOffset: -1,
                                    fontSize: 9,
                                    color: score >= 2 ? '#fff' : '#888',
                                    fontWeight: 600,
                                }}
                            >{day}</button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 8, fontSize: 10, color: '#888', textAlign: 'right' }}>
                    投稿だけ。あとは自分でやる。 · 開始 {LAUNCH_DATE}
                </div>
            </div>
        </div>
    );
}

function navBtn(active: boolean): React.CSSProperties {
    return {
        padding: '6px 12px',
        fontSize: 13,
        fontWeight: 700,
        border: '1px solid #e7e5e4',
        borderRadius: 8,
        backgroundColor: active ? '#1c1917' : '#fff',
        color: active ? '#fff' : '#1c1917',
        cursor: 'pointer',
    };
}

interface PostSlotProps {
    band: string;
    accent: string;
    theme?: string;
    tweet?: XTweet;
    done: boolean;
    onToggle: () => void;
    copy: (key: string, text: string) => void;
    copiedKey: string | null;
    downloadImage: (id: string) => void;
    downloadingId: string | null;
    cardRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

function PostSlot({
    band, accent, theme, tweet, done, onToggle, copy, copiedKey, downloadImage, downloadingId, cardRefs,
}: PostSlotProps) {
    const wheel = getWheel(tweet);
    const noteUrl = getNoteUrl(tweet?.noteArticleId);
    const noteTitle = getNoteTitle(tweet?.noteArticleId);
    const tweetText = tweet?.text ?? '';
    const fullPostText = noteUrl ? `${tweetText}\n\n→ note 全部書いた\n${noteUrl}` : tweetText;
    const xUrl = tweetText
        ? `https://x.com/intent/tweet?text=${encodeURIComponent(fullPostText)}`
        : 'https://x.com/compose/post';
    const copyKey = `post-${tweet?.id ?? band}`;
    const cardId = tweet?.id ?? `empty-${band}`;

    return (
        <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e7e5e4',
            borderTop: `3px solid ${accent}`,
            borderRadius: 12,
            padding: '16px',
            opacity: done ? 0.55 : 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
        }}>
            {/* スロット情報 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: accent, letterSpacing: '0.1em' }}>{band}</span>
                <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: wheel === 'philosophy' ? '#525252' : '#92400E',
                    padding: '2px 6px',
                    borderRadius: 3,
                    letterSpacing: '0.05em',
                }}>
                    {wheel === 'philosophy' ? '哲学' : '英語'}
                </span>
                <button onClick={onToggle} style={{
                    marginLeft: 'auto',
                    padding: '4px 12px',
                    fontSize: 10,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 4,
                    backgroundColor: done ? '#10B981' : '#f5f5f4',
                    color: done ? '#fff' : '#525252',
                    cursor: 'pointer',
                }}>
                    {done ? '投稿済' : '未'}
                </button>
            </div>

            {/* テーマ + note リンク */}
            {theme && <div style={{ fontSize: 12, color: '#525252', fontWeight: 600 }}>{theme}</div>}
            {noteTitle && (
                <a href={noteUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#16A34A',
                    backgroundColor: '#dcfce7',
                    border: '1px solid #86efac',
                    borderRadius: 4,
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                }}>
                    note: {noteTitle} →
                </a>
            )}

            {/* カード画像 (480x480 で表示、X投稿時は1080x1080 でDL) */}
            {tweet ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        ref={(el) => { cardRefs.current[cardId] = el; }}
                        style={{
                            width: CARD_DISPLAY_SIZE,
                            height: CARD_DISPLAY_SIZE,
                            overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            borderRadius: 8,
                            maxWidth: '100%',
                        }}
                    >
                        <CardPreview card={tweet.card} />
                    </div>
                </div>
            ) : (
                <div style={{
                    backgroundColor: '#fffbeb',
                    border: '1px dashed #fde68a',
                    borderRadius: 8,
                    padding: '40px 16px',
                    fontSize: 12,
                    color: '#78350f',
                    textAlign: 'center',
                    minHeight: 120,
                }}>
                    自由枠 (好きなことを書く)
                </div>
            )}

            {/* ツイート本文プレビュー */}
            {tweet && (
                <details style={{ fontSize: 11, color: '#525252' }}>
                    <summary style={{ cursor: 'pointer', userSelect: 'none', padding: '4px 0' }}>
                        本文プレビュー ({tweetText.length} / 280字)
                    </summary>
                    <div style={{
                        marginTop: 6,
                        padding: '10px 12px',
                        backgroundColor: '#fafaf9',
                        border: '1px solid #e7e5e4',
                        borderRadius: 6,
                        fontSize: 12,
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap',
                    }}>
                        {fullPostText}
                    </div>
                </details>
            )}

            {/* ボタン3つ: コピー / 画像DL / X投稿 */}
            <div style={{ display: 'flex', gap: 6 }}>
                {tweet && (
                    <>
                        <button onClick={() => copy(copyKey, fullPostText)} style={btnStyle(copiedKey === copyKey ? '#10B981' : '#1c1917', '#fff')}>
                            {copiedKey === copyKey ? 'コピー済' : '本文コピー'}
                        </button>
                        <button
                            onClick={() => downloadImage(cardId)}
                            disabled={downloadingId === cardId}
                            style={btnStyle(downloadingId === cardId ? '#888' : '#D4AF37', '#fff')}
                        >
                            {downloadingId === cardId ? '生成中…' : '画像DL'}
                        </button>
                    </>
                )}
                <a href={xUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle('#1DA1F2', '#fff'), flex: 1, textDecoration: 'none', textAlign: 'center', display: 'inline-block' }}>
                    X で投稿{noteUrl ? ' (+note)' : ''} →
                </a>
            </div>
        </div>
    );
}

function btnStyle(bg: string, fg: string): React.CSSProperties {
    return {
        flex: 1,
        padding: '10px 12px',
        fontSize: 12,
        fontWeight: 700,
        border: 'none',
        borderRadius: 6,
        backgroundColor: bg,
        color: fg,
        cursor: 'pointer',
    };
}
