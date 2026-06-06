'use client';
// v7 物語没入チャット — narrative immersion
import { useState } from 'react';
import Link from 'next/link';
import { STORY_EPISODES, type StoryEpisode } from '@/data/english/story-episodes';

const A = '#DB2777', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4';
function speak(t: string) { if (typeof window === 'undefined' || !window.speechSynthesis) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .98; window.speechSynthesis.speak(u); }

export default function StoryPage() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const ep: StoryEpisode | null = STORY_EPISODES.find(e => e.id === activeId) || null;

    if (!ep) {
        return (
            <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 80px' }}>
                <div style={{ maxWidth: 620, margin: '0 auto' }}>
                    <div style={{ background: `linear-gradient(135deg, ${A}, #831843)`, borderRadius: 20, padding: '24px 22px', color: '#fff', marginBottom: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: .9 }}>STORY IMMERSION</div>
                        <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 8px' }}>物語没入チャット</h1>
                        <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, opacity: .95 }}>短い物語をチャットで読み進める。文脈ごと体に入れる。単語帳じゃなく、シーンで覚える。</p>
                        <div style={{ fontSize: 12, marginTop: 10, opacity: .85, fontWeight: 700 }}>{STORY_EPISODES.length} 話<Link href="/english/home" style={{ color: '#fff', marginLeft: 12, textDecoration: 'underline', opacity: .8 }}>ラボ一覧 →</Link></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
                        {STORY_EPISODES.map(e => (
                            <button key={e.id} onClick={() => setActiveId(e.id)} style={{ textAlign: 'left', background: '#fff', border: `1px solid ${LINE}`, borderLeft: `4px solid ${A}`, borderRadius: 14, padding: '14px 16px', cursor: 'pointer' }}>
                                <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{e.title}</div>
                                <div style={{ fontSize: 12, color: SUB, marginTop: 4, lineHeight: 1.6 }}>{e.premise}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '20px 16px 80px' }}>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <button onClick={() => setActiveId(null)} style={{ background: 'none', border: 'none', color: A, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>← 一覧</button>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: INK, margin: '8px 0 4px' }}>{ep.title}</h2>
                <div style={{ fontSize: 13, color: SUB, lineHeight: 1.7, marginBottom: 18 }}>{ep.premise}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {ep.lines.map((ln, k) => ln.kind === 'narration' ? (
                        <div key={k} style={{ fontSize: 13, color: SUB, fontStyle: 'italic', textAlign: 'center', padding: '4px 20px', lineHeight: 1.7 }}>{ln.ja}</div>
                    ) : (
                        <Bubble key={k} line={ln} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Bubble({ line }: { line: any }) {
    const me = line.speaker === 'あなた' || line.speaker === 'You';
    const [open, setOpen] = useState(false);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: me ? 'flex-end' : 'flex-start' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', margin: '0 6px 3px' }}>{line.speaker}</div>
            <div onClick={() => setOpen(o => !o)} style={{ maxWidth: '82%', background: me ? '#DB277712' : '#fff', border: `1px solid ${me ? '#DB277733' : LINE}`, borderRadius: 16, padding: '11px 14px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: INK, lineHeight: 1.5 }}>{line.en}</div>
                    <button onClick={e => { e.stopPropagation(); speak(line.en); }} style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 7, border: `1px solid ${A}44`, background: '#fff', color: A, cursor: 'pointer', fontSize: 11, fontWeight: 800 }}>▶</button>
                </div>
                {open && <div style={{ fontSize: 12.5, color: SUB, marginTop: 6, lineHeight: 1.7 }}>{line.ja}{line.note && <div style={{ marginTop: 4, color: '#DB2777' }}>{line.note}</div>}</div>}
            </div>
            {!open && <div style={{ fontSize: 10, color: '#CBC4B4', margin: '3px 8px' }}>タップで訳</div>}
        </div>
    );
}
