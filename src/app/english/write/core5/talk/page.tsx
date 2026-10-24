'use client';

/**
 * CORE 5 TALK — 1つの話題を、指10本 × 幹の文8本(80表現)で話し切る原稿を読むページ。
 * DMM で講師に向けて読む。データは src/data/english/write-core5-talks.ts。
 *
 * 【工夫】
 * - 本題(何の話か)を先頭に置く。表現の網羅は、その話を運ぶ手段
 * - 80表現の入り方を talkCoverage() が実測して、数字をそのまま出す
 * - 穴あき: 表現だけを隠し、タップで1つずつ出す(読む → 思い出す、の往復)
 * - 元の8文: 指ごとに core5 の幹の文を開ける。どの X が何に差し替わったかが見える
 * - 今夜の3本: 25分で話し切るルートだけに絞る
 * - 画面共有: 日本語を全部消す(講師に見せるとき)
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ENGINE_BY_ID, FINGER_PARAGRAPHS, phraseRegex, type TrunkKey } from '@/data/english/write-core5';
import {
    CORE_TALKS, LIGHT_KEYS, DARK_KEYS, fingerHits, talkCoverage, wordCount,
    type TalkFinger, type PhraseHit,
} from '@/data/english/write-core5-talks';
import { EikenOutputNav } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const CREAM = '#FAF9F7';
const DARKTONE = '#44403C';

const WPM = 130;

/** 文の中の表現の位置。phraseRegex は core5 本体と同じ判定 */
function spansOf(sentence: string, hits: PhraseHit[]): { start: number; end: number; hit: PhraseHit }[] {
    const out: { start: number; end: number; hit: PhraseHit }[] = [];
    for (const h of hits) {
        const m = phraseRegex(h.phrase).exec(sentence);
        if (m) out.push({ start: m.index, end: m.index + m[0].length, hit: h });
    }
    return out.sort((a, b) => a.start - b.start);
}

function Sentence({ text, hits, holes, revealed, onReveal, tone, share }: {
    text: string; hits: PhraseHit[]; holes: boolean; revealed: Set<string>;
    onReveal: (id: string) => void; tone: 'light' | 'dark'; share: boolean;
}) {
    const spans = spansOf(text, hits);
    const parts: React.ReactNode[] = [];
    let at = 0;
    spans.forEach((s, i) => {
        if (s.start < at) return;
        parts.push(<span key={`t${i}`}>{text.slice(at, s.start)}</span>);
        const id = `${s.hit.side}-${s.hit.key}-${text.slice(0, 12)}`;
        const shown = !holes || revealed.has(id);
        const accent = tone === 'light' ? GOLD : DARKTONE;
        parts.push(shown ? (
            <span key={`p${i}`} title={s.hit.meaning} style={{
                fontWeight: 700, color: tone === 'light' ? DEEPGOLD : INK,
                background: tone === 'light' ? '#FEF3C7' : '#F5F5F4',
                borderBottom: `2px solid ${accent}`, borderRadius: '3px', padding: '0 2px',
            }}>{text.slice(s.start, s.end)}</span>
        ) : (
            <button key={`p${i}`} onClick={() => onReveal(id)} style={{
                display: 'inline-block', minWidth: `${Math.max(40, (s.end - s.start) * 6)}px`, maxWidth: '100%',
                verticalAlign: 'baseline', border: `1.5px dashed ${accent}`, borderRadius: '5px', padding: '2px 8px',
                lineHeight: 1.4, textAlign: 'left', background: '#fff', cursor: 'pointer',
                fontSize: '11px', color: SUB, fontFamily: 'sans-serif',
            }}>{share ? '?' : s.hit.meaning}</button>
        ));
        at = s.end;
    });
    parts.push(<span key="rest">{text.slice(at)}</span>);
    return <p style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: '15.5px', lineHeight: 1.85, color: INK }}>{parts}</p>;
}

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
    return (
        <button onClick={onClick} style={{
            fontSize: '11px', fontWeight: 900, letterSpacing: '0.3px', cursor: 'pointer',
            color: on ? '#fff' : INK, background: on ? INK : '#fff',
            border: `1px solid ${on ? INK : LINE}`, borderRadius: '999px', padding: '7px 14px',
        }}>{label}</button>
    );
}

function FingerCard({ f, index, share, holes, revealed, onReveal }: {
    f: TalkFinger; index: number; share: boolean; holes: boolean;
    revealed: Set<string>; onReveal: (id: string) => void;
}) {
    const [openTrunk, setOpenTrunk] = useState(false);
    const e = ENGINE_BY_ID[f.engine];
    const hits = fingerHits(f);
    const used = hits.filter((h) => h.sentence >= 0).length;
    const words = wordCount([...f.light, ...f.dark]);
    const para = FINGER_PARAGRAPHS.find((p) => p.engine === f.engine);

    const side = (tone: 'light' | 'dark', lines: string[], keys: TrunkKey[], ja: string) => (
        <div style={{
            borderLeft: `3px solid ${tone === 'light' ? GOLD : DARKTONE}`, paddingLeft: '14px', marginTop: '14px',
        }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px', color: tone === 'light' ? DEEPGOLD : DARKTONE }}>
                    {tone === 'light' ? 'THE LIGHT' : 'THE DARK'}
                </span>
                {!share && <span style={{ fontSize: '11px', color: FAINT }}>{ja}</span>}
            </div>
            {lines.map((s, i) => (
                <Sentence key={i} text={s} tone={tone} share={share} holes={holes} revealed={revealed} onReveal={onReveal}
                    hits={hits.filter((h) => keys.includes(h.key))} />
            ))}
        </div>
    );

    return (
        <section id={f.engine} style={{
            background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px',
            padding: '18px 18px 16px', marginTop: '16px', borderTop: `4px solid ${e.color}`,
        }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: FAINT }}>{String(index + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '21px', fontWeight: 900, color: e.color, letterSpacing: '1px' }}>{e.en}</span>
                {!share && <span style={{ fontSize: '12px', color: SUB }}>{e.ja}</span>}
                <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 800, color: used === 8 ? GREEN : '#DC2626' }}>
                    {used}/8 phrases · {words} words · {Math.max(1, Math.round((words / WPM) * 10) / 10)} min
                </span>
            </div>

            {side('light', f.light, LIGHT_KEYS, f.lightJa)}
            {side('dark', f.dark, DARK_KEYS, f.darkJa)}

            <div style={{
                marginTop: '12px', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px',
                color: INK, background: CREAM, borderRadius: '10px', padding: '10px 14px',
            }}>{f.punch}</div>

            <div style={{ marginTop: '10px', border: `1.5px solid ${GREEN}`, borderRadius: '10px', padding: '10px 14px' }}>
                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: GREEN, marginBottom: '3px' }}>ASK THE TEACHER</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: INK }}>{f.ask}</div>
                {!share && <div style={{ fontSize: '11px', color: FAINT, marginTop: '3px' }}>{f.askJa}</div>}
            </div>

            {para && (
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => setOpenTrunk((v) => !v)} style={{
                        fontSize: '10.5px', fontWeight: 800, color: SUB, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}>{openTrunk ? '▾' : '▸'} {share ? 'The eight template sentences' : 'core5 の元の8文(X を何に差し替えたか)'}</button>
                    {openTrunk && (
                        <div style={{ marginTop: '6px', display: 'grid', gap: '4px' }}>
                            {[...LIGHT_KEYS, ...DARK_KEYS].map((k) => (
                                <div key={k} style={{ fontSize: '12.5px', fontFamily: 'Georgia, serif', color: LIGHT_KEYS.includes(k) ? DEEPGOLD : DARKTONE }}>
                                    <span style={{ fontFamily: 'sans-serif', fontSize: '9px', fontWeight: 900, color: FAINT, marginRight: '6px' }}>{k}</span>
                                    {para[k]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}

export default function Core5TalkPage() {
    const [slug, setSlug] = useState(CORE_TALKS[0].slug);
    const talk = CORE_TALKS.find((t) => t.slug === slug) ?? CORE_TALKS[0];
    const [share, setShare] = useState(false);
    const [holes, setHoles] = useState(false);
    const [short, setShort] = useState(false);
    const [revealed, setRevealed] = useState<Set<string>>(new Set());

    const cov = useMemo(() => talkCoverage(talk), [talk]);
    const fingers = short ? talk.fingers.filter((f) => talk.shortRoute.includes(f.engine)) : talk.fingers;
    const words = wordCount([...talk.intro, ...fingers.flatMap((f) => [...f.light, ...f.dark]), ...talk.closing]);
    const reveal = (id: string) => setRevealed((prev) => new Set(prev).add(id));

    // ?t=finance で直接開ける(講師にリンクを渡すとき用)
    useEffect(() => {
        const q = new URLSearchParams(window.location.search).get('t');
        if (q && CORE_TALKS.some((t) => t.slug === q)) setSlug(q);
    }, []);
    const pick = (s: string) => {
        setSlug(s);
        setRevealed(new Set());
        const url = new URL(window.location.href);
        url.searchParams.set('t', s);
        window.history.replaceState(null, '', url.toString());
    };

    return (
        <main style={{ background: CREAM, minHeight: '100vh', paddingBottom: '60px' }}>
            <EikenOutputNav />

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '22px 16px 0' }}>
                <Link href="/english/write/core5" style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px', color: DEEPGOLD, textDecoration: 'none' }}>
                    &larr; BACK TO CORE 5
                </Link>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
                    {CORE_TALKS.map((t) => {
                        const on = t.slug === talk.slug;
                        return (
                            <button key={t.slug} onClick={() => pick(t.slug)} style={{
                                fontSize: '11px', fontWeight: 900, cursor: 'pointer', borderRadius: '10px', padding: '8px 12px',
                                color: on ? DEEPGOLD : SUB, background: on ? '#FEF9E7' : '#fff',
                                border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                            }}>{t.title.replace('The Light and Dark of ', '')}</button>
                        );
                    })}
                </div>

                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT, marginTop: '14px' }}>
                    ONE STORY · TEN FINGERS · {cov.used} OF {cov.total} PHRASES
                </div>
                <h1 style={{ margin: '6px 0 4px', fontFamily: 'Georgia, serif', fontSize: '27px', fontWeight: 900, color: INK, lineHeight: 1.3 }}>
                    {talk.title}
                </h1>
                {!share && <div style={{ fontSize: '13px', color: SUB }}>{talk.titleJa}</div>}

                {!share && (
                    <div style={{ marginTop: '14px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px', color: DEEPGOLD, marginBottom: '6px' }}>本題</div>
                        <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.9, color: INK }}>{talk.premiseJa}</p>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                    <Toggle on={short} label={short ? 'TONIGHT: 3 FINGERS' : 'ALL 10 FINGERS'} onClick={() => setShort((v) => !v)} />
                    <Toggle on={holes} label={holes ? 'HOLES ON' : 'HOLES OFF'} onClick={() => { setHoles((v) => !v); setRevealed(new Set()); }} />
                    <Toggle on={share} label={share ? 'SCREEN SHARE (EN ONLY)' : 'JA ON'} onClick={() => setShare((v) => !v)} />
                    <span style={{ fontSize: '11px', color: FAINT, alignSelf: 'center' }}>{words} words · about {Math.round(words / WPM)} min</span>
                </div>
                {!share && (
                    <p style={{ margin: '8px 0 0', fontSize: '11px', color: FAINT, lineHeight: 1.8 }}>
                        {short ? talk.shortRouteJa : '穴あきは表現だけを隠す。空欄に出ている日本語を見て思い出し、タップで答えを出す。'}
                        {cov.used === cov.total && ' 80表現は core5 本体と同じ判定(phraseRegex)で全部当たっている。'}
                    </p>
                )}

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
                    {fingers.map((f) => {
                        const e = ENGINE_BY_ID[f.engine];
                        return (
                            <a key={f.engine} href={`#${f.engine}`} style={{
                                fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px', textDecoration: 'none',
                                color: e.color, border: `1px solid ${e.color}55`, borderRadius: '999px', padding: '4px 10px', background: '#fff',
                            }}>{e.en}</a>
                        );
                    })}
                </div>

                <section style={{ marginTop: '18px' }}>
                    {talk.intro.map((s, i) => (
                        <p key={i} style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '15.5px', lineHeight: 1.85, color: INK }}>{s}</p>
                    ))}
                </section>

                {fingers.map((f) => (
                    <FingerCard key={f.engine} f={f} index={talk.fingers.indexOf(f)} share={share} holes={holes}
                        revealed={revealed} onReveal={reveal} />
                ))}

                <section style={{ marginTop: '22px', background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '16px', padding: '18px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px', color: DEEPGOLD, marginBottom: '8px' }}>CLOSING</div>
                    {talk.closing.map((s, i) => (
                        <p key={i} style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '15.5px', lineHeight: 1.85, color: INK }}>{s}</p>
                    ))}
                    <p style={{ margin: '10px 0 0', fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: GREEN }}>{talk.closingAsk}</p>
                </section>

                {!share && (
                    <section style={{ marginTop: '18px', fontSize: '11px', color: SUB, lineHeight: 1.85 }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT, marginBottom: '4px' }}>事実として書いたこと</div>
                        {talk.factsJa.map((x) => <div key={x}>・{x}</div>)}
                    </section>
                )}
            </div>
        </main>
    );
}
