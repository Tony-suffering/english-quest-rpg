'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { WorldEpisode } from '@/data/english/world-episodes';

type Lang = 'ja' | 'en';

function renderScript(script: string) {
    const blocks = script.split(/\n\n+/).map(b => b.trim()).filter(Boolean);
    return blocks.map((block, i) => {
        if (block.startsWith('## ')) {
            return (
                <h2 key={i} style={{ fontSize: 19, fontWeight: 700, margin: '36px 0 14px', letterSpacing: 0.3, color: '#1c1917' }}>
                    {block.slice(3)}
                </h2>
            );
        }
        if (block.startsWith('> ')) {
            const text = block.split('\n').map(l => l.replace(/^>\s?/, '')).join(' ');
            return (
                <blockquote key={i} style={{
                    margin: '18px 0', padding: '14px 20px', background: '#f0fdf9',
                    borderLeft: '4px solid #10B981', borderRadius: '0 10px 10px 0',
                    fontSize: 16, lineHeight: 1.8, color: '#134e4a', fontStyle: 'italic',
                }}>
                    {text}
                </blockquote>
            );
        }
        return (
            <p key={i} style={{ fontSize: 16, lineHeight: 2, margin: '0 0 18px', color: '#292524' }}>
                {block}
            </p>
        );
    });
}

export default function EpisodeView({ ep }: { ep: WorldEpisode }) {
    const hasEn = !!ep.scriptEn;
    const [lang, setLang] = useState<Lang>('ja');
    const en = hasEn && lang === 'en';

    const title = en && ep.titleEn ? ep.titleEn : ep.title;
    const hook = en && ep.hookEn ? ep.hookEn : ep.hook;
    const teacher = en && ep.teacherEn ? ep.teacherEn : ep.teacher;
    const script = en && ep.scriptEn ? ep.scriptEn : ep.script;
    const factChecks = en && ep.factChecksEn ? ep.factChecksEn : ep.factChecks;

    const L = en
        ? { back: '← The World Inside', source: 'Source: ', fcTitle: 'Fact-check: feeling vs fact', fcLead: 'I checked what the teacher said against the stats and primary sources. The gaps are the interesting part.', sources: 'Sources' }
        : { back: '← 世界の内側 一覧', source: '情報源: ', fcTitle: '裏取り: 体感 vs 事実', fcLead: '先生が言ったことを、統計と一次資料で確かめた。ズレている所が一番面白い。', sources: '出典' };

    return (
        <main style={{
            maxWidth: 760, margin: '0 auto', padding: '36px 20px 96px',
            fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1c1917',
        }}>
            <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/english/world" style={{ fontSize: 12, color: '#78716c', textDecoration: 'none' }}>{L.back}</Link>
                {hasEn && (
                    <div style={{ display: 'inline-flex', border: '1px solid #e7e5e4', borderRadius: 999, overflow: 'hidden', background: 'white' }}>
                        {(['ja', 'en'] as Lang[]).map(l => (
                            <button key={l} onClick={() => setLang(l)} style={{
                                padding: '5px 14px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                                border: 'none', cursor: 'pointer',
                                background: lang === l ? '#1c1917' : 'transparent',
                                color: lang === l ? 'white' : '#78716c',
                            }}>
                                {l === 'ja' ? '日本語' : 'ENGLISH'}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <header style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '3px 10px', borderRadius: 999 }}>EP {String(ep.number).padStart(2, '0')}</span>
                    <span style={{ fontSize: 11, letterSpacing: 1.5, color: '#a8a29e', textTransform: 'uppercase' }}>{ep.flag || ep.country}</span>
                    {!ep.published && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '2px 8px', borderRadius: 6 }}>下書き</span>
                    )}
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.4, margin: '0 0 10px', letterSpacing: 0.3 }}>{title}</h1>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#57534e', margin: '0 0 14px' }}>{hook}</p>
                <div style={{ fontSize: 12, color: '#a8a29e', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <span>{ep.date}</span>
                    {ep.durationLabel && <span>{ep.durationLabel}</span>}
                </div>
                {teacher && (
                    <div style={{ marginTop: 14, padding: '10px 14px', background: '#fafaf9', borderRadius: 8, fontSize: 13, color: '#44403c', borderLeft: '3px solid #d6d3d1' }}>
                        {L.source}{teacher}
                    </div>
                )}
            </header>

            <article>{renderScript(script)}</article>

            {factChecks && factChecks.length > 0 && (
                <section style={{ marginTop: 44 }}>
                    <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 6px', letterSpacing: 0.3 }}>{L.fcTitle}</h2>
                    <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 18px' }}>{L.fcLead}</p>
                    <div style={{ display: 'grid', gap: 14 }}>
                        {factChecks.map((fc, i) => (
                            <div key={i} style={{ padding: '16px 18px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1917', marginBottom: 6 }}>{fc.claim}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#10B981', marginBottom: 8 }}>{fc.verdict}</div>
                                <div style={{ fontSize: 13, lineHeight: 1.8, color: '#44403c' }}>{fc.detail}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section style={{ marginTop: 40 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', letterSpacing: 0.3, color: '#78716c' }}>{L.sources}</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                    {ep.sources.map((s, i) => {
                        const internal = s.url.startsWith('/');
                        return (
                            <li key={i} style={{ fontSize: 13 }}>
                                {internal ? (
                                    <Link href={s.url} style={{ color: '#0e7490', textDecoration: 'underline' }}>{s.label}</Link>
                                ) : (
                                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0e7490', textDecoration: 'underline' }}>{s.label}</a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}
