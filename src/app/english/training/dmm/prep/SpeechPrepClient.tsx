'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface Chunk { ja: string; en: string; }
interface Topic { id: string; title: string; topic_ja: string; chunks: Chunk[]; created_at: string; updated_at: string; }

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';

const SEED_EXAMPLE = {
    title: 'I made my own newspaper（noteの新聞の話）',
    topic_ja: '自分専用の新聞を作った話をDMMの先生に説明する',
    chunks: [
        { ja: '切り出し：最近作ったものの話していい？自分の新聞を作った(半分冗談っぽく)', en: "Hey, can I tell you about something I made recently? I built my own newspaper — well, sort of." },
        { ja: 'それ何？：本物じゃなくて毎朝刷るA4一枚。The Tonio Times という名前', en: "It's not a real one. It's a single page I print out every morning, and I call it The Tonio Times." },
        { ja: 'なんで作ったか：普通のニュースが楽しめない。政治・事件・訃報・地震ばかりで自分に関係ないし気分も下がる', en: "Honestly, I stopped enjoying the regular news. Every morning it's the same stuff — politics, some crime, someone passed away, another earthquake. And I'd just think, \"How does any of this actually help me?\" It's not interesting, it doesn't teach me anything, and it kind of kills my mood." },
        { ja: '欲しかったもの：自分仕様。興味ある話題だけ、暗いニュース無し、全部英語で自分のレベルに合ってる', en: "So I thought, what if I made a paper that's actually mine? Only the topics I care about — English, baseball, science, a bit of fiction. No dark news at all. And the whole thing's in English, so just reading it doubles as English practice, right at my level." },
        { ja: '中身：一面は論説、あとにMLBコラム・短編・会話。難語と文法は別の日本語シートに', en: "The front page is a serious essay with advanced vocabulary, then there's a baseball column, a short story, and a natural conversation piece. The hard words and grammar go on a separate Japanese sheet — like an answer key." },
        { ja: 'MLB紙：野球専用も作った。前夜の全試合を取ってきて誰が活躍したか2-3文の英語記事に', en: "I even made a second one just for baseball. It pulls every game from the night before and writes a two-or-three-sentence recap of who did what, in real sports-writing English." },
        { ja: 'オチ：普通の新聞は他人が重要と決めた情報。だから自分で編集した。発行部数1部、購読者は俺だけ', en: "I guess what I realized is: a normal newspaper is just information someone else decided was important. So I figured, why not edit my own? Circulation is one copy, and the only subscriber is me — but it might be the paper that fits me best in the whole world." },
    ],
};

function speak(text: string, onend?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    if (onend) u.onend = onend;
    window.speechSynthesis.speak(u);
}

const MASTERY_KEY = 'speech_prep_mastered';
function loadMastery(): Record<string, number[]> {
    if (typeof window === 'undefined') return {};
    try { return JSON.parse(localStorage.getItem(MASTERY_KEY) || '{}'); } catch { return {}; }
}
function saveMastery(m: Record<string, number[]>) {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(m));
}

export default function SpeechPrepClient({ initialTopics, initError }: { initialTopics: Topic[]; initError: string | null }) {
    const [topics, setTopics] = useState<Topic[]>(initialTopics || []);
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selId, setSelId] = useState<string | null>(null);
    const [mode, setMode] = useState<'prep' | 'drill'>('prep');
    const [editing, setEditing] = useState<Topic | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [busy, setBusy] = useState(false);
    const [mastery, setMastery] = useState<Record<string, number[]>>({});

    // drill state
    const [drillIdx, setDrillIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => { setMastery(loadMastery()); }, []);

    const selected = topics.find(t => t.id === selId) || null;

    const reload = useCallback(async () => {
        try {
            const res = await fetch('/api/speech-prep');
            const data = await res.json();
            if (data.success) setTopics(data.topics);
        } catch { /* ignore */ }
    }, []);

    const createTopic = async (t: { title: string; topic_ja: string; chunks: Chunk[] }) => {
        setBusy(true);
        try {
            const res = await fetch('/api/speech-prep', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t) });
            const data = await res.json();
            if (data.success) { await reload(); setShowForm(false); setEditing(null); }
            else alert(data.error || '保存に失敗しました');
        } finally { setBusy(false); }
    };
    const updateTopic = async (id: string, t: { title: string; topic_ja: string; chunks: Chunk[] }) => {
        setBusy(true);
        try {
            const res = await fetch('/api/speech-prep', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...t }) });
            const data = await res.json();
            if (data.success) { await reload(); setShowForm(false); setEditing(null); }
            else alert(data.error || '更新に失敗しました');
        } finally { setBusy(false); }
    };
    const deleteTopic = async (id: string) => {
        if (!confirm('このトピックを削除しますか？')) return;
        await fetch(`/api/speech-prep?id=${id}`, { method: 'DELETE' });
        await reload();
        if (selId === id) { setView('list'); setSelId(null); }
    };

    const openDetail = (id: string) => { setSelId(id); setView('detail'); setMode('prep'); setDrillIdx(0); setRevealed(false); };

    const toggleMastered = (topicId: string, idx: number) => {
        setMastery(prev => {
            const arr = new Set(prev[topicId] || []);
            if (arr.has(idx)) arr.delete(idx); else arr.add(idx);
            const next = { ...prev, [topicId]: [...arr] };
            saveMastery(next);
            return next;
        });
    };
    const isMastered = (topicId: string, idx: number) => (mastery[topicId] || []).includes(idx);
    const masteredCount = (t: Topic) => (mastery[t.id] || []).filter(i => i < t.chunks.length).length;

    /* ---------- whole-speech playback ---------- */
    const playingRef = useRef(false);
    const playAll = (chunks: Chunk[]) => {
        if (playingRef.current) { window.speechSynthesis.cancel(); playingRef.current = false; return; }
        playingRef.current = true;
        let i = 0;
        const next = () => {
            if (!playingRef.current || i >= chunks.length) { playingRef.current = false; return; }
            speak(chunks[i].en, () => { i++; next(); });
        };
        next();
    };

    const btn = (bg: string, color = '#fff'): React.CSSProperties => ({
        backgroundColor: bg, color, border: 'none', borderRadius: '8px', padding: '8px 14px',
        fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.3px',
    });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, color: INK }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${LINE}`, backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <Link href="/english/training/dmm" style={{ color: SUB, textDecoration: 'none', fontSize: '13px' }}>← DMM</Link>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
                        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>スピーチ暗記</h1>
                        <span style={{ fontSize: '12px', color: SUB }}>言いたいことを、完璧な英語で仕込んで丸暗記する</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '20px' }}>
                {initError && <div style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>DB接続エラー: {initError}</div>}

                {view === 'list' && (
                    <>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            <button style={btn(GOLD, '#000')} onClick={() => { setEditing(null); setShowForm(true); }}>＋ 新しいトピック</button>
                            {topics.length === 0 && <button style={btn('#fff', GOLD)} onClick={() => createTopic(SEED_EXAMPLE)}>サンプル（noteの新聞）を入れる</button>}
                        </div>

                        {topics.length === 0 && !showForm && (
                            <div style={{ textAlign: 'center', color: SUB, padding: '40px 20px', backgroundColor: '#fff', borderRadius: '14px', border: `1px solid ${LINE}` }}>
                                まだトピックがありません。<br />「言いたいこと」を完璧な英語で仕込んで、レッスン前に丸暗記しよう。
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {topics.map(t => {
                                const done = masteredCount(t);
                                const pct = t.chunks.length ? Math.round((done / t.chunks.length) * 100) : 0;
                                return (
                                    <div key={t.id} style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                                            <div style={{ minWidth: 0 }}>
                                                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '3px' }}>{t.title}</div>
                                                {t.topic_ja && <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.5 }}>{t.topic_ja}</div>}
                                                <div style={{ fontSize: '11px', color: SUB, marginTop: '6px' }}>{t.chunks.length}パート · 暗記 {done}/{t.chunks.length}（{pct}%）</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                                <button style={btn(GREEN)} onClick={() => openDetail(t.id)}>暗記する</button>
                                            </div>
                                        </div>
                                        <div style={{ height: '4px', backgroundColor: '#F0F0EF', borderRadius: '999px', overflow: 'hidden', marginTop: '10px' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: GREEN, transition: 'width 0.3s' }} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                            <button style={{ background: 'none', border: 'none', color: SUB, fontSize: '12px', cursor: 'pointer', padding: 0 }} onClick={() => { setEditing(t); setShowForm(true); }}>編集</button>
                                            <button style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '12px', cursor: 'pointer', padding: 0 }} onClick={() => deleteTopic(t.id)}>削除</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {view === 'detail' && selected && (
                    <>
                        <button style={{ background: 'none', border: 'none', color: SUB, fontSize: '13px', cursor: 'pointer', padding: 0, marginBottom: '10px' }} onClick={() => { setView('list'); window.speechSynthesis?.cancel(); playingRef.current = false; }}>← 一覧</button>
                        <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '2px' }}>{selected.title}</div>
                        {selected.topic_ja && <div style={{ fontSize: '12px', color: SUB, marginBottom: '12px' }}>{selected.topic_ja}</div>}

                        {/* mode toggle */}
                        <div style={{ display: 'inline-flex', backgroundColor: '#F0EFEC', borderRadius: '10px', padding: '3px', marginBottom: '16px' }}>
                            {(['prep', 'drill'] as const).map(m => (
                                <button key={m} onClick={() => { setMode(m); setRevealed(false); setDrillIdx(0); }}
                                    style={{ border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                        backgroundColor: mode === m ? '#fff' : 'transparent', color: mode === m ? INK : SUB,
                                        boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
                                    {m === 'prep' ? 'プレップ（読む・聞く）' : '暗記ドリル'}
                                </button>
                            ))}
                        </div>

                        {mode === 'prep' && (
                            <div>
                                <button style={{ ...btn(GOLD, '#000'), marginBottom: '14px' }} onClick={() => playAll(selected.chunks)}>▶ 全文を続けて再生 / 停止</button>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {selected.chunks.map((c, i) => (
                                        <div key={i} style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px' }}>
                                            <div style={{ fontSize: '11px', color: GOLD, fontWeight: 700, marginBottom: '4px' }}>PART {i + 1} · {c.ja}</div>
                                            <div style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '8px' }}>{c.en}</div>
                                            <button style={{ background: 'none', border: `1px solid ${GREEN}`, color: GREEN, borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={() => speak(c.en)}>▶ 再生</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {mode === 'drill' && (() => {
                            const c = selected.chunks[drillIdx];
                            if (!c) return null;
                            const done = masteredCount(selected);
                            return (
                                <div>
                                    <div style={{ fontSize: '12px', color: SUB, marginBottom: '8px' }}>PART {drillIdx + 1} / {selected.chunks.length} · 暗記済み {done}/{selected.chunks.length}</div>
                                    <div style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '20px', minHeight: '180px' }}>
                                        <div style={{ fontSize: '11px', color: GOLD, fontWeight: 700, marginBottom: '6px' }}>言いたいこと（日本語）</div>
                                        <div style={{ fontSize: '15px', lineHeight: 1.6, color: INK, marginBottom: '16px' }}>{c.ja}</div>
                                        {revealed ? (
                                            <>
                                                <div style={{ fontSize: '11px', color: GREEN, fontWeight: 700, marginBottom: '4px' }}>英語</div>
                                                <div style={{ fontSize: '17px', lineHeight: 1.65, marginBottom: '12px' }}>{c.en}</div>
                                                <button style={{ background: 'none', border: `1px solid ${GREEN}`, color: GREEN, borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={() => speak(c.en)}>▶ 再生</button>
                                            </>
                                        ) : (
                                            <button style={{ ...btn(INK), width: '100%', padding: '14px' }} onClick={() => { setRevealed(true); speak(c.en); }}>英語を表示（まず自分で言ってみる）</button>
                                        )}
                                    </div>

                                    {revealed && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                                            <button style={{ ...btn('#F0EFEC', SUB), flex: 1, padding: '12px' }} onClick={() => { toggleMastered(selected.id, drillIdx); goNext(selected, drillIdx, setDrillIdx, setRevealed); }}>まだ（もう一周）</button>
                                            <button style={{ ...btn(GREEN), flex: 1, padding: '12px' }} onClick={() => { if (!isMastered(selected.id, drillIdx)) toggleMastered(selected.id, drillIdx); goNext(selected, drillIdx, setDrillIdx, setRevealed); }}>覚えた → 次へ</button>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
                                        <button style={{ background: 'none', border: 'none', color: SUB, fontSize: '13px', cursor: 'pointer' }} onClick={() => { setDrillIdx(Math.max(0, drillIdx - 1)); setRevealed(false); }} disabled={drillIdx === 0}>← 前</button>
                                        <button style={{ background: 'none', border: 'none', color: SUB, fontSize: '13px', cursor: 'pointer' }} onClick={() => { setDrillIdx(Math.min(selected.chunks.length - 1, drillIdx + 1)); setRevealed(false); }} disabled={drillIdx === selected.chunks.length - 1}>次 →</button>
                                    </div>
                                </div>
                            );
                        })()}
                    </>
                )}
            </div>

            {showForm && <TopicForm editing={editing} busy={busy} onCancel={() => { setShowForm(false); setEditing(null); }} onSave={(t) => editing ? updateTopic(editing.id, t) : createTopic(t)} />}
        </div>
    );
}

function goNext(topic: Topic, idx: number, setIdx: (n: number) => void, setRevealed: (b: boolean) => void) {
    setRevealed(false);
    if (idx < topic.chunks.length - 1) setIdx(idx + 1);
}

/* ---------- create / edit form ---------- */
function TopicForm({ editing, busy, onCancel, onSave }: { editing: Topic | null; busy: boolean; onCancel: () => void; onSave: (t: { title: string; topic_ja: string; chunks: Chunk[] }) => void }) {
    const [title, setTitle] = useState(editing?.title || '');
    const [topicJa, setTopicJa] = useState(editing?.topic_ja || '');
    const [chunks, setChunks] = useState<Chunk[]>(editing?.chunks?.length ? editing.chunks : [{ ja: '', en: '' }]);

    const input: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${LINE}`, fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' };

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '20px', overflow: 'auto' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', maxWidth: '560px', width: '100%', margin: '20px 0' }}>
                <div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '14px' }}>{editing ? 'トピックを編集' : '新しいトピック'}</div>
                <label style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>タイトル</label>
                <input style={{ ...input, margin: '4px 0 12px' }} value={title} onChange={e => setTitle(e.target.value)} placeholder="例: 自作の新聞の話" />
                <label style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>何を話すか（一言・日本語）</label>
                <input style={{ ...input, margin: '4px 0 16px' }} value={topicJa} onChange={e => setTopicJa(e.target.value)} placeholder="例: 自分専用の新聞を作った話を先生に説明する" />

                <div style={{ fontSize: '12px', color: SUB, fontWeight: 700, marginBottom: '8px' }}>パート（言いたいこと → 完璧な英語）</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
                    {chunks.map((c, i) => (
                        <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', color: GOLD, fontWeight: 700 }}>PART {i + 1}</span>
                                {chunks.length > 1 && <button style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '11px', cursor: 'pointer' }} onClick={() => setChunks(chunks.filter((_, j) => j !== i))}>削除</button>}
                            </div>
                            <input style={{ ...input, marginBottom: '6px', fontSize: '13px' }} value={c.ja} onChange={e => setChunks(chunks.map((x, j) => j === i ? { ...x, ja: e.target.value } : x))} placeholder="言いたいこと（日本語）" />
                            <textarea style={{ ...input, minHeight: '64px', fontSize: '13px', resize: 'vertical' }} value={c.en} onChange={e => setChunks(chunks.map((x, j) => j === i ? { ...x, en: e.target.value } : x))} placeholder="完璧な英語" />
                        </div>
                    ))}
                </div>
                <button style={{ background: 'none', border: `1px dashed ${GOLD}`, color: '#B8860B', borderRadius: '8px', padding: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', width: '100%', marginBottom: '16px' }} onClick={() => setChunks([...chunks, { ja: '', en: '' }])}>＋ パートを追加</button>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ flex: 1, backgroundColor: '#F0EFEC', color: SUB, border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }} onClick={onCancel}>キャンセル</button>
                    <button disabled={busy || !title.trim() || !chunks.some(c => c.en.trim())}
                        style={{ flex: 1, backgroundColor: (!title.trim() || !chunks.some(c => c.en.trim())) ? '#ccc' : GREEN, color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                        onClick={() => onSave({ title: title.trim(), topic_ja: topicJa.trim(), chunks: chunks.filter(c => c.en.trim() || c.ja.trim()) })}>
                        {busy ? '保存中…' : '保存'}
                    </button>
                </div>
            </div>
        </div>
    );
}
