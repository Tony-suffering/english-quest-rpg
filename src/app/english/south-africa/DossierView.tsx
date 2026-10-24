'use client';

import { useState } from 'react';
import Link from 'next/link';
import EnglishSidebar from '@/components/EnglishSidebar';
import { southAfricaDossier, southAfricaDossierEn } from '@/data/english/south-africa-dossier';

type Lang = 'ja' | 'en';

const T = {
    ja: {
        kicker: 'Dossier · South Africa',
        title: '南アフリカ 徹底ドシエ',
        source: '情報源: ',
        updated: (u: string) => `裏取り更新: ${u}(2026年時点の確認済み事実)`,
        toc: '目次',
        fcTitle: '検死: 先生の発言 vs 事実',
        fcLead: '体感と統計のズレが一番おもしろい。ここを押さえると対等に返せる。',
        qTitle: '次回クラス用 質問バンク',
        qLead: '西ケープ在住の81歳の当事者にしか答えられない角度。上から順に投げれば1回分は軽く持つ。',
        sources: '出典',
        related: '関連: 世界の内側(ポッドキャスト) →',
    },
    en: {
        kicker: 'Dossier · South Africa',
        title: 'South Africa — Full Dossier',
        source: 'Source: ',
        updated: (u: string) => `Fact-checked: ${u} (verified as of 2026)`,
        toc: 'Contents',
        fcTitle: 'Post-mortem: teacher\'s claims vs the facts',
        fcLead: 'The gap between what he feels and what the stats say is the interesting part. Nail this and you can hold your own.',
        qTitle: 'Question bank for next class',
        qLead: 'Angles only an 81-year-old insider in the Western Cape can answer. Work down the list and it will fill a whole lesson.',
        sources: 'Sources',
        related: 'Related: The World Inside (podcast) →',
    },
};

export default function DossierView() {
    const [lang, setLang] = useState<Lang>('ja');
    const d = lang === 'ja' ? southAfricaDossier : southAfricaDossierEn;
    const t = T[lang];
    const sources = southAfricaDossier.sources; // shared

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1,
                maxWidth: 820,
                margin: '0 auto',
                padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1c1917',
            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <div style={{ display: 'inline-flex', border: '1px solid #e7e5e4', borderRadius: 999, overflow: 'hidden', background: 'white' }}>
                        {(['ja', 'en'] as Lang[]).map(l => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                style={{
                                    padding: '6px 16px',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: lang === l ? '#1c1917' : 'transparent',
                                    color: lang === l ? 'white' : '#78716c',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {l === 'ja' ? '日本語' : 'ENGLISH'}
                            </button>
                        ))}
                    </div>
                </div>

                <header style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>{t.kicker}</div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, margin: '6px 0 12px', letterSpacing: 0.5 }}>{t.title}</h1>
                    <p style={{ fontSize: 15, lineHeight: 1.9, color: '#44403c', margin: '0 0 16px' }}>{d.intro}</p>
                    <div style={{ padding: '12px 16px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 10, fontSize: 13, lineHeight: 1.8, color: '#57534e' }}>
                        <span style={{ fontWeight: 700, color: '#8a6d1a' }}>{t.source}</span>{d.teacher}
                    </div>
                    <div style={{ marginTop: 10, fontSize: 12, color: '#a8a29e' }}>{t.updated(d.updated)}</div>
                </header>

                <nav style={{ marginBottom: 36, padding: '16px 20px', background: '#f5f5f4', borderRadius: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#a8a29e', marginBottom: 10, textTransform: 'uppercase' }}>{t.toc}</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                        {d.sections.map((s, i) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} style={{ fontSize: 14, color: '#0e7490', textDecoration: 'none' }}>
                                    {String(i + 1).padStart(2, '0')}. {s.heading}
                                </a>
                            </li>
                        ))}
                        <li><a href="#factchecks" style={{ fontSize: 14, color: '#10B981', textDecoration: 'none', fontWeight: 600 }}>{t.fcTitle}</a></li>
                        <li><a href="#questions" style={{ fontSize: 14, color: '#8a6d1a', textDecoration: 'none', fontWeight: 600 }}>{t.qTitle}</a></li>
                    </ul>
                </nav>

                {d.sections.map((s, i) => (
                    <section key={s.id} id={s.id} style={{ marginBottom: 40, scrollMarginTop: 20 }}>
                        <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 6px', letterSpacing: 0.3, lineHeight: 1.4 }}>
                            <span style={{ color: '#d6d3d1', marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>{s.heading}
                        </h2>
                        {s.lead && <p style={{ fontSize: 14, fontWeight: 600, color: '#8a6d1a', margin: '0 0 14px' }}>{s.lead}</p>}
                        {s.paragraphs.map((p, j) => (
                            <p key={j} style={{ fontSize: 15.5, lineHeight: 2, margin: '0 0 16px', color: '#292524' }}>{p}</p>
                        ))}
                    </section>
                ))}

                <section id="factchecks" style={{ marginTop: 52, scrollMarginTop: 20 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px', letterSpacing: 0.3 }}>{t.fcTitle}</h2>
                    <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 18px' }}>{t.fcLead}</p>
                    <div style={{ display: 'grid', gap: 14 }}>
                        {d.factChecks.map((fc, i) => (
                            <div key={i} style={{ padding: '18px 20px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 12 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#1c1917', marginBottom: 6 }}>{fc.claim}</div>
                                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#10B981', marginBottom: 8 }}>{fc.verdict}</div>
                                <div style={{ fontSize: 14, lineHeight: 1.85, color: '#44403c' }}>{fc.detail}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="questions" style={{ marginTop: 52, scrollMarginTop: 20 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px', letterSpacing: 0.3 }}>{t.qTitle}</h2>
                    <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 18px' }}>{t.qLead}</p>
                    <ol style={{ margin: 0, padding: '0 0 0 4px', listStyle: 'none', display: 'grid', gap: 12 }}>
                        {d.questions.map((q, i) => (
                            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 700, color: '#8a6d1a', background: 'rgba(212,175,55,0.12)', borderRadius: 999, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>{i + 1}</span>
                                <span style={{ fontSize: 15, lineHeight: 1.85, color: '#292524' }}>{q}</span>
                            </li>
                        ))}
                    </ol>
                </section>

                <section style={{ marginTop: 52 }}>
                    <h2 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', letterSpacing: 0.3, color: '#78716c' }}>{t.sources}</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                        {sources.map((s, i) => (
                            <li key={i} style={{ fontSize: 13 }}>
                                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0e7490', textDecoration: 'underline' }}>{s.label}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <div style={{ marginTop: 40, display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 13 }}>
                    <Link href="/english/south-africa/map-speech" style={{ color: '#8a6d1a', textDecoration: 'none', fontWeight: 700 }}>
                        {lang === 'ja' ? '次回の武器: 地図で話す 90秒ノースクリプト →' : 'Next weapon: the 90-second map speech →'}
                    </Link>
                    <Link href="/english/world" style={{ color: '#10B981', textDecoration: 'none' }}>{t.related}</Link>
                </div>
            </main>
        </div>
    );
}
