// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/master/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * 表現マスター -- 「30本のエッセイ = 1級作文の武器が漏れなく入った設計図」を証明するページ。
 *
 * WRITE_TOOLKIT の各表現について、EIKEN1_ESSAYS(意見論述30)/要約30/スピーチ30 を
 * 実際にスキャンし「Day何に実在するか(被覆)」を動的に算出して見せる。
 * 被覆0件の item = 本文の穴として赤く可視化(補填対象)。
 */

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { EIKEN1_ESSAYS } from '@/data/english/write-eiken1';
import { EIKEN1_SUMMARIES } from '@/data/english/write-eiken1-summary';
import { EIKEN1_SPEECHES } from '@/data/english/speak-eiken1';
import { WRITE_TOOLKIT, essayBlob, toolkitMatches, type ToolkitKind } from '@/data/english/write-eiken1-toolkit';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const RED = '#DC2626';

type Filter = 'all' | ToolkitKind;

interface ItemCoverage {
    essayDays: number[];
    summaryDays: number[];
    speakDays: number[];
}

export default function WriteMasterPage() {
    const [filter, setFilter] = useState<Filter>('all');
    const [gapsOnly, setGapsOnly] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    // 各ソースを「Day -> 英語テキスト」に畳む
    const sources = useMemo(() => {
        const essays = EIKEN1_ESSAYS.map(e => ({
            day: e.day,
            text: essayBlob([e.topic, e.essay, e.tip, ...e.keyExpressions.map(k => `${k.en} ${k.note}`)]),
        }));
        const summaries = EIKEN1_SUMMARIES.map(s => ({
            day: s.day,
            text: essayBlob([s.passage, s.summary, ...s.keyExpressions.map(k => `${k.en} ${k.note}`)]),
        }));
        const speeches = EIKEN1_SPEECHES.map(sp => ({
            day: sp.day,
            text: essayBlob([sp.speech, ...sp.qa.map(q => `${q.q} ${q.a}`), ...sp.keyExpressions.map(k => `${k.en} ${k.note}`)]),
        }));
        return { essays, summaries, speeches };
    }, []);

    const coverageFor = useMemo(() => {
        return (item: Parameters<typeof toolkitMatches>[0]): ItemCoverage => ({
            essayDays: sources.essays.filter(s => toolkitMatches(item, s.text)).map(s => s.day),
            summaryDays: sources.summaries.filter(s => toolkitMatches(item, s.text)).map(s => s.day),
            speakDays: sources.speeches.filter(s => toolkitMatches(item, s.text)).map(s => s.day),
        });
    }, [sources]);

    // 全体の被覆統計
    const stats = useMemo(() => {
        let total = 0, covered = 0, funcTotal = 0, funcCovered = 0, vocabTotal = 0, vocabCovered = 0;
        for (const cat of WRITE_TOOLKIT) {
            for (const item of cat.items) {
                total++;
                const cov = coverageFor(item);
                const isCov = cov.essayDays.length > 0;
                if (isCov) covered++;
                if (cat.kind === 'function') { funcTotal++; if (isCov) funcCovered++; }
                else { vocabTotal++; if (isCov) vocabCovered++; }
            }
        }
        return { total, covered, funcTotal, funcCovered, vocabTotal, vocabCovered };
    }, [coverageFor]);

    const filtered = useMemo(() => {
        return WRITE_TOOLKIT
            .filter(cat => filter === 'all' || cat.kind === filter)
            .map(cat => ({
                cat,
                items: cat.items
                    .map(item => ({ item, cov: coverageFor(item) }))
                    .filter(({ cov }) => !gapsOnly || cov.essayDays.length === 0),
            }))
            .filter(group => group.items.length > 0);
    }, [filter, gapsOnly, coverageFor]);

    const pct = stats.total ? Math.round((stats.covered / stats.total) * 100) : 0;

    const filterBtn = (key: Filter, label: string) => {
        const on = filter === key;
        return (
            <button key={key} onClick={() => setFilter(key)}
                style={{
                    padding: '7px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                    border: on ? `1.5px solid ${GOLD}` : `1px solid ${LINE}`,
                    background: on ? '#FEF9E7' : '#fff', color: on ? DEEPGOLD : SUB,
                }}>{label}</button>
        );
    };

    const dayChips = (days: number[], color: string, prefix: string) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: FAINT, marginRight: '2px' }}>{prefix}</span>
            {days.length === 0
                ? <span style={{ fontSize: '11px', color: RED, fontWeight: 800 }}>未収録</span>
                : days.map(d => (
                    <span key={d} style={{ fontSize: '10px', fontWeight: 800, color, background: `${color}14`, border: `1px solid ${color}33`, padding: '1px 6px', borderRadius: '5px' }}>D{d}</span>
                ))}
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F2', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <EikenOutputNav active="write" />

            {/* HEADER */}
            <div style={{ backgroundColor: '#fff', borderBottom: `1px solid ${LINE}`, padding: isMobile ? '16px' : '20px 32px' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <Link href="/english/write/days" style={{ textDecoration: 'none', color: SUB, fontSize: '12px', fontWeight: 700 }}>← ライトパス 30日に戻る</Link>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '22px' : '26px', fontWeight: 900, color: GOLD, letterSpacing: '0.5px' }}>EXPRESSION</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '22px' : '26px', fontWeight: 900, color: INK, letterSpacing: '0.5px' }}>MASTER</span>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '6px' }}>表現マスター</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: INK }}>
                        英検1級ライティングの武器を、機能別の「型」と品詞別の「格上げ語彙」で完全網羅。
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: FAINT, lineHeight: 1.7 }}>
                        各表現が30本の模範解答のDay何に実在するかを自動スキャンして表示。これ全部が30本に有機的に入っている=やり切れば手に入る、を証明する索引。
                    </p>
                </div>
            </div>

            {/* COVERAGE SUMMARY */}
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0' }}>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: isMobile ? '16px' : '18px 22px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '30px', fontWeight: 900, color: GOLD }}>{pct}%</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: INK }}>被覆 ({stats.covered}/{stats.total} の表現が30本に実在)</span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#EFEBDF', borderRadius: '99px', marginTop: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${GREEN})`, transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '140px', background: '#FAF8F2', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{stats.funcCovered}/{stats.funcTotal}</div>
                            <div style={{ fontSize: '10px', color: FAINT }}>機能別の型(導入〜結論)</div>
                        </div>
                        <div style={{ flex: 1, minWidth: '140px', background: '#FAF8F2', borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{stats.vocabCovered}/{stats.vocabTotal}</div>
                            <div style={{ fontSize: '10px', color: FAINT }}>格上げ語彙(動/形/副/名)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTERS */}
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: isMobile ? '14px 16px 0' : '18px 32px 0' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {filterBtn('all', 'すべて')}
                    {filterBtn('function', '型')}
                    {filterBtn('verb', '動詞')}
                    {filterBtn('adjective', '形容詞')}
                    {filterBtn('adverb', '副詞')}
                    {filterBtn('noun', '名詞')}
                    <button onClick={() => setGapsOnly(v => !v)}
                        style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', border: gapsOnly ? `1.5px solid ${RED}` : `1px solid ${LINE}`, background: gapsOnly ? '#FEF2F2' : '#fff', color: gapsOnly ? RED : SUB }}>
                        穴のみ表示
                    </button>
                </div>
            </div>

            {/* CATEGORIES */}
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: isMobile ? '14px 16px 40px' : '18px 32px 50px' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', color: GREEN, fontWeight: 800, padding: '40px 0', fontSize: '14px' }}>
                        穴なし。全表現が30本に実在しています。
                    </div>
                ) : filtered.map(({ cat, items }) => (
                    <div key={cat.key} style={{ marginTop: '22px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 900, color: INK }}>{cat.label}</span>
                            <span style={{ fontSize: '11px', color: FAINT, letterSpacing: '0.5px' }}>{cat.sub} ・ {items.length}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {items.map(({ item, cov }) => {
                                const gap = cov.essayDays.length === 0;
                                return (
                                    <div key={item.en} style={{ background: '#fff', border: gap ? `1px solid ${RED}55` : `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 800, color: INK, fontFamily: 'Georgia, serif' }}>{item.en}</span>
                                            <span style={{ fontSize: '12px', color: '#57534E' }}>{item.ja}</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.6, marginTop: '3px' }}>{item.note}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                            {dayChips(cov.essayDays, GOLD, '論述')}
                                            {cov.summaryDays.length > 0 && dayChips(cov.summaryDays, GREEN, '要約')}
                                            {cov.speakDays.length > 0 && dayChips(cov.speakDays, '#6366F1', '2次')}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <EikenOutputDisclaimer />
        </div>
    );
}
