// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/sheet/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getEssayForDay } from '@/data/english/write-eiken1';
import { getSummaryForDay } from '@/data/english/write-eiken1-summary';

type Mode = 'essay' | 'summary';
type TplKey = 'A' | 'B' | 'C' | 'D' | 'E';

interface Ctx {
    mode: Mode;
    day: number;
    exam: string;
    titleLabel: string;
    wordTarget: string;
    topic?: string;
    topicJa?: string;
    theme?: string;
    themeJa?: string;
    instruction?: string;
}

interface Theme {
    key: TplKey;
    name: string;
    paper: string;
    ink: string;
    sub: string;
    accent: string;
    accent2: string;
    line: string;
    lineStyle: 'solid' | 'dashed' | 'dotted';
    font: string;
    header: 'band' | 'minimal' | 'frame' | 'soft' | 'grid';
    divider: 'ribbon' | 'rule' | 'label' | 'dots' | 'tab';
    topicStyle: 'leftbar' | 'plain' | 'frame' | 'rounded' | 'highlight';
    grid?: boolean;
}

const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';
const SANS = '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif';

const THEMES: Record<TplKey, Theme> = {
    A: { key: 'A', name: 'ゴールド', paper: '#FFFDF8', ink: '#1C1917', sub: '#8A8170', accent: '#D4AF37', accent2: '#10B981', line: '#E7DCBE', lineStyle: 'solid', font: SERIF, header: 'band', divider: 'ribbon', topicStyle: 'leftbar' },
    B: { key: 'B', name: 'ミニマル', paper: '#FFFFFF', ink: '#1A1A1A', sub: '#9A9A9A', accent: '#1A1A1A', accent2: '#C9A227', line: '#E6E6E6', lineStyle: 'solid', font: SANS, header: 'minimal', divider: 'rule', topicStyle: 'plain' },
    C: { key: 'C', name: 'アカデミック', paper: '#FCFBF6', ink: '#1B2A4A', sub: '#6B7488', accent: '#1B2A4A', accent2: '#B0892F', line: '#C9CEDA', lineStyle: 'solid', font: SERIF, header: 'frame', divider: 'label', topicStyle: 'frame' },
    D: { key: 'D', name: 'エメラルド', paper: '#F7FCF9', ink: '#0F3D30', sub: '#5E8273', accent: '#0E8A63', accent2: '#C9A227', line: '#C4E5D6', lineStyle: 'solid', font: SERIF, header: 'soft', divider: 'dots', topicStyle: 'rounded' },
    E: { key: 'E', name: '方眼ノート', paper: '#FFFEF9', ink: '#26221A', sub: '#9A9078', accent: '#D4AF37', accent2: '#1C1917', line: '#E4D9BC', lineStyle: 'solid', font: SANS, header: 'grid', divider: 'tab', topicStyle: 'highlight', grid: true },
};

const ESSAY_SECTIONS = [
    { label: '序論  Introduction', lines: 3 },
    { label: '本論①  First reason', lines: 4 },
    { label: '本論②  Second reason', lines: 4 },
    { label: '本論③  Third reason', lines: 4 },
    { label: '結論  Conclusion', lines: 3 },
];

function RuledLine({ t, label }: { t: Theme; label?: string }) {
    return (
        <div style={{ position: 'relative', flex: 1, minHeight: '8mm', borderBottom: `1px ${t.lineStyle} ${t.line}` }}>
            {label && (
                <span style={{ position: 'absolute', left: 0, top: '-0.3mm', fontSize: '8.5pt', fontWeight: 800, color: t.accent, letterSpacing: '0.5px', background: t.paper, paddingRight: '6px' }}>{label}</span>
            )}
        </div>
    );
}

function GridBlock({ t, flexGrow, label, last }: { t: Theme; flexGrow: number; label?: string; last?: boolean }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: flexGrow, marginBottom: last ? 0 : '2mm' }}>
            {label && <div style={{ fontSize: '8.5pt', fontWeight: 800, color: t.accent, letterSpacing: '0.5px', marginBottom: '1mm' }}>{label}</div>}
            <div style={{
                flex: 1,
                minHeight: '16mm',
                backgroundImage: `radial-gradient(${t.line} 1px, transparent 1px)`,
                backgroundSize: '5mm 5mm',
                backgroundPosition: '2mm 2mm',
                border: `1px solid ${t.line}`,
                borderRadius: '3px',
                boxSizing: 'border-box',
            }} />
        </div>
    );
}

function Divider({ t, children }: { t: Theme; children: React.ReactNode }) {
    if (t.divider === 'ribbon') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '3mm 0' }}>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${t.accent})` }} />
                <span style={{ color: t.accent, fontSize: '7pt' }}>◆</span>
                <span style={{ fontSize: '10pt', fontWeight: 800, color: t.accent, letterSpacing: '3px' }}>{children}</span>
                <span style={{ color: t.accent, fontSize: '7pt' }}>◆</span>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
            </div>
        );
    }
    if (t.divider === 'rule') {
        return (
            <div style={{ margin: '4mm 0 2mm', borderTop: `1px solid ${t.ink}`, paddingTop: '1.5mm' }}>
                <span style={{ fontSize: '8.5pt', fontWeight: 800, color: t.ink, letterSpacing: '3px' }}>{children}</span>
            </div>
        );
    }
    if (t.divider === 'label') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '3mm 0' }}>
                <span style={{ flex: 1, borderTop: `1px solid ${t.accent}`, borderBottom: `1px solid ${t.accent}`, height: '3px' }} />
                <span style={{ fontSize: '8.5pt', fontWeight: 800, color: '#fff', background: t.accent, padding: '2px 12px', letterSpacing: '2px' }}>{children}</span>
                <span style={{ flex: 1, borderTop: `1px solid ${t.accent}`, borderBottom: `1px solid ${t.accent}`, height: '3px' }} />
            </div>
        );
    }
    if (t.divider === 'dots') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '3mm 0' }}>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${t.accent})` }} />
                <span style={{ color: t.accent2, fontSize: '7pt' }}>◆</span>
                <span style={{ fontSize: '10pt', fontWeight: 800, color: t.accent, letterSpacing: '3px' }}>{children}</span>
                <span style={{ color: t.accent2, fontSize: '7pt' }}>◆</span>
                <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
            </div>
        );
    }
    // tab
    return (
        <div style={{ margin: '4mm 0 2mm' }}>
            <span style={{ fontSize: '9pt', fontWeight: 900, color: '#fff', background: t.accent2, padding: '3px 12px', borderRadius: '4px', letterSpacing: '2px' }}>{children}</span>
        </div>
    );
}

function Header({ ctx, t }: { ctx: Ctx; t: Theme }) {
    const brand = (color: string, badgeBg: string, badgeFg: string) => (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '18pt', fontWeight: 900, letterSpacing: '0.5px', fontFamily: 'Georgia, serif', color }}>WRITEPASS</span>
            <span style={{ fontSize: '9pt', fontWeight: 900, background: badgeBg, color: badgeFg, padding: '2px 8px', borderRadius: '5px', letterSpacing: '1px' }}>英検1級対策</span>
        </div>
    );
    const dayPill = (bg: string, fg: string) => (
        <div style={{ display: 'inline-block', background: bg, color: fg, fontWeight: 900, fontSize: '11pt', padding: '3px 12px', borderRadius: '99px', letterSpacing: '1px' }}>
            DAY {String(ctx.day).padStart(2, '0')} / 30
        </div>
    );

    if (t.header === 'band') {
        return (
            <div style={{ background: `linear-gradient(135deg, ${t.accent} 0%, #E6C75E 55%, ${t.accent} 100%)`, borderRadius: '10px', padding: '5mm 7mm', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)' }}>
                <div>
                    {brand('#fff', 'rgba(0,0,0,0.78)', '#fff')}
                    <div style={{ fontSize: '8.5pt', marginTop: '2px', opacity: 0.95, letterSpacing: '2px' }}>{ctx.titleLabel}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {dayPill('#fff', '#9A7B16')}
                    <div style={{ fontSize: '8pt', marginTop: '4px', opacity: 0.95 }}>{ctx.mode === 'essay' ? ctx.exam : ''} ANSWER SHEET</div>
                </div>
            </div>
        );
    }
    if (t.header === 'minimal') {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    {brand(t.ink, t.ink, '#fff')}
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13pt', fontWeight: 900, color: t.ink, letterSpacing: '1px' }}>DAY {String(ctx.day).padStart(2, '0')}<span style={{ color: t.sub, fontWeight: 700 }}> / 30</span></div>
                        <div style={{ fontSize: '7.5pt', color: t.sub, letterSpacing: '1px' }}>{ctx.titleLabel}</div>
                    </div>
                </div>
                <div style={{ marginTop: '3mm', height: '2px', background: t.ink }} />
                <div style={{ marginTop: '1mm', height: '1px', background: t.accent2 }} />
            </div>
        );
    }
    if (t.header === 'frame') {
        return (
            <div style={{ background: t.accent, color: '#fff', padding: '4mm 6mm', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    {brand('#fff', t.accent2, '#fff')}
                    <div style={{ fontSize: '8.5pt', marginTop: '2px', opacity: 0.92, letterSpacing: '2px' }}>{ctx.titleLabel}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {dayPill('#fff', t.accent)}
                    <span style={{ width: '14mm', height: '14mm', borderRadius: '50%', border: `1.5px solid ${t.accent2}`, color: t.accent2, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8pt', fontWeight: 900, letterSpacing: '0.5px' }}>1級</span>
                </div>
            </div>
        );
    }
    if (t.header === 'soft') {
        return (
            <div style={{ background: 'linear-gradient(135deg, #05382B 0%, #0B6B4F 55%, #0FA36F 100%)', borderRadius: '12px', padding: '5mm 7mm', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.55)' }}>
                <div>
                    {brand('#fff', '#D4AF37', '#05382B')}
                    <div style={{ fontSize: '8.5pt', marginTop: '2px', opacity: 0.95, letterSpacing: '2px' }}>{ctx.titleLabel}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    {dayPill('#D4AF37', '#05382B')}
                    <div style={{ fontSize: '8pt', marginTop: '4px', opacity: 0.9, letterSpacing: '1px' }}>{ctx.mode === 'essay' ? ctx.exam : ''} ANSWER SHEET</div>
                </div>
            </div>
        );
    }
    // grid: big day number + tab
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6mm' }}>
            <div style={{ fontSize: '40pt', fontWeight: 900, color: 'transparent', WebkitTextStroke: `1.5px ${t.accent}`, lineHeight: 1, fontFamily: SANS }}>{String(ctx.day).padStart(2, '0')}</div>
            <div style={{ flex: 1 }}>
                {brand(t.ink, t.accent2, '#fff')}
                <div style={{ fontSize: '8pt', marginTop: '3px', color: t.sub, letterSpacing: '1.5px' }}>{ctx.titleLabel} ・ DAY {ctx.day} / 30</div>
            </div>
            <span style={{ fontSize: '8pt', fontWeight: 900, color: '#fff', background: t.accent, padding: '4px 10px', borderRadius: '4px', alignSelf: 'flex-start' }}>{ctx.mode === 'essay' ? ctx.exam : 'SUMMARY'}</span>
        </div>
    );
}

function TopicBox({ ctx, t }: { ctx: Ctx; t: Theme }) {
    const isEssay = ctx.mode === 'essay';
    const headEn = isEssay ? ctx.topic : `Theme: ${ctx.theme}`;
    const sub = isEssay ? ctx.topicJa : ctx.instruction;

    const inner = (
        <>
            <div style={{ fontSize: isEssay ? '12.5pt' : '11pt', fontWeight: 800, color: t.ink, lineHeight: 1.4 }}>{headEn}</div>
            <div style={{ fontSize: '8.5pt', color: t.sub, marginTop: '2px', lineHeight: 1.5 }}>{sub}</div>
            {isEssay && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3mm' }}>
                    <span style={{ fontSize: '8pt', fontWeight: 800, color: t.accent2 }}>MY POSITION</span>
                    <span style={{ flex: 1, borderBottom: `1px solid ${t.line}`, height: '4.5mm' }} />
                </div>
            )}
        </>
    );

    if (t.topicStyle === 'leftbar') return <div style={{ border: `1px solid ${t.line}`, borderLeft: `4px solid ${t.accent}`, borderRadius: '6px', background: '#FFFCF4', padding: '3.5mm 5mm' }}>{inner}</div>;
    if (t.topicStyle === 'frame') return <div style={{ border: `1.5px solid ${t.accent}`, padding: '4mm 5mm', position: 'relative', background: '#fff' }}>{inner}</div>;
    if (t.topicStyle === 'rounded') return <div style={{ borderRadius: '10px', background: '#FDFEFD', border: `1px solid ${t.accent}`, borderLeft: `4px solid ${t.accent2}`, boxShadow: '0 0 0 3px #EAF6F0', padding: '3.5mm 5mm' }}>{inner}</div>;
    if (t.topicStyle === 'highlight') return (
        <div style={{ padding: '2mm 0' }}>
            <span style={{ fontSize: isEssay ? '12.5pt' : '11pt', fontWeight: 800, color: t.ink, lineHeight: 1.6, background: `linear-gradient(transparent 55%, ${t.accent}55 55%)`, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{headEn}</span>
            <div style={{ fontSize: '8.5pt', color: t.sub, marginTop: '2mm', lineHeight: 1.5 }}>{sub}</div>
            {isEssay && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3mm' }}>
                    <span style={{ fontSize: '8pt', fontWeight: 800, color: t.accent2 }}>MY POSITION</span>
                    <span style={{ flex: 1, borderBottom: `1px solid ${t.line}`, height: '4.5mm' }} />
                </div>
            )}
        </div>
    );
    // plain
    return (
        <div>
            <div style={{ fontSize: isEssay ? '13pt' : '11.5pt', fontWeight: 800, color: t.ink, lineHeight: 1.4, borderBottom: `2px solid ${t.ink}`, paddingBottom: '2mm' }}>{headEn}</div>
            <div style={{ fontSize: '8.5pt', color: t.sub, marginTop: '2mm', lineHeight: 1.5 }}>{sub}</div>
            {isEssay && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3mm' }}>
                    <span style={{ fontSize: '8pt', fontWeight: 800, color: t.accent2 }}>MY POSITION</span>
                    <span style={{ flex: 1, borderBottom: `1px solid ${t.line}`, height: '4.5mm' }} />
                </div>
            )}
        </div>
    );
}

function WritingArea({ ctx, t }: { ctx: Ctx; t: Theme }) {
    if (ctx.mode === 'essay') {
        if (t.grid) {
            return <>{ESSAY_SECTIONS.map((s, idx) => <GridBlock key={s.label} t={t} label={s.label} flexGrow={s.lines} last={idx === ESSAY_SECTIONS.length - 1} />)}</>;
        }
        return (
            <>
                {ESSAY_SECTIONS.map((s, idx) => (
                    <div key={s.label} style={{ flex: s.lines, display: 'flex', flexDirection: 'column', marginBottom: idx === ESSAY_SECTIONS.length - 1 ? 0 : '2mm' }}>
                        {Array.from({ length: s.lines }, (_, i) => (
                            <RuledLine key={i} t={t} label={i === 0 ? s.label : undefined} />
                        ))}
                    </div>
                ))}
            </>
        );
    }
    // summary
    return (
        <>
            <div style={{ fontSize: '8.5pt', fontWeight: 800, color: t.accent, marginBottom: '2mm', letterSpacing: '0.5px' }}>本文の要点メモ (3点)</div>
            {['①', '②', '③'].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '9mm' }}>
                    <span style={{ fontSize: '9pt', color: t.accent2, fontWeight: 800 }}>{m}</span>
                    <span style={{ flex: 1, borderBottom: `1px ${t.lineStyle} ${t.line}`, height: '7mm' }} />
                </div>
            ))}
            <div style={{ fontSize: '8.5pt', fontWeight: 800, color: t.accent, margin: '3mm 0 2mm', letterSpacing: '0.5px' }}>要約 (Summary)</div>
            {t.grid
                ? <GridBlock t={t} flexGrow={1} last />
                : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {Array.from({ length: 12 }, (_, i) => <RuledLine key={i} t={t} />)}
                    </div>
                )}
        </>
    );
}

function MetaRow({ ctx, t }: { ctx: Ctx; t: Theme }) {
    return (
        <div style={{ display: 'flex', gap: '12px', marginTop: '4mm', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '8pt', fontWeight: 700, color: t.sub }}>氏名</span>
                <span style={{ width: '46mm', borderBottom: `1px solid ${t.line}`, height: '5mm' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '8pt', fontWeight: 700, color: t.sub }}>日付</span>
                <span style={{ width: '32mm', borderBottom: `1px solid ${t.line}`, height: '5mm' }} />
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: '8pt', color: t.sub, textAlign: 'right' }}>
                目標語数 <span style={{ fontWeight: 900, color: t.accent, fontSize: '11pt' }}>{ctx.wordTarget}</span> words
            </div>
        </div>
    );
}

function Footer({ ctx, t }: { ctx: Ctx; t: Theme }) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4mm', paddingTop: '3mm', borderTop: `1px dashed ${t.line}` }}>
                <div style={{ fontSize: '8.5pt', color: t.sub }}>
                    WORDS <span style={{ display: 'inline-block', width: '18mm', borderBottom: `1px solid ${t.line}`, margin: '0 4px' }} /> / {ctx.wordTarget}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '8pt', color: t.sub }}>#英検1級 #英作文 #ライトパス</span>
                    <span style={{ width: '15mm', height: '15mm', borderRadius: '50%', border: `1.5px dashed ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7pt', fontWeight: 800, color: t.accent, textAlign: 'center', lineHeight: 1.2 }}>DONE<br />Day {ctx.day}</span>
                </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '12pt', fontWeight: 900, color: t.accent, marginTop: '2mm', fontFamily: 'Georgia, serif' }}>
                WRITEPASS <span style={{ color: t.sub, fontSize: '8pt', fontWeight: 700 }}>英検1級 ライティング 30日</span>
            </div>
        </>
    );
}

function Sheet({ ctx, t }: { ctx: Ctx; t: Theme }) {
    const framed = t.header === 'frame';
    return (
        <div className="answer-sheet" style={{
            width: '210mm', height: '297mm', overflow: 'hidden', background: t.paper,
            boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
            boxSizing: 'border-box', padding: framed ? '0' : '12mm 14mm 9mm',
            display: 'flex', flexDirection: 'column', fontFamily: t.font,
            border: framed ? `2px double ${t.accent}` : 'none',
        }}>
            <div style={{ padding: framed ? '6mm 8mm 6mm' : 0, display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <Header ctx={ctx} t={t} />
                <MetaRow ctx={ctx} t={t} />
                <Divider t={t}>{ctx.mode === 'essay' ? 'TOPIC' : 'SUMMARY TASK'}</Divider>
                <TopicBox ctx={ctx} t={t} />
                <Divider t={t}>{ctx.mode === 'essay' ? 'YOUR ESSAY' : 'YOUR SUMMARY'}</Divider>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    <WritingArea ctx={ctx} t={t} />
                </div>
                <Footer ctx={ctx} t={t} />
            </div>
        </div>
    );
}

function SheetInner() {
    const params = useSearchParams();
    const mode: Mode = params.get('mode') === 'summary' ? 'summary' : 'essay';
    const day = Math.max(1, Math.min(30, parseInt(params.get('day') || '1', 10) || 1));
    const initialTpl = (params.get('tpl') || 'A').toUpperCase();
    const [tpl, setTpl] = useState<TplKey>(['A', 'B', 'C', 'D', 'E'].includes(initialTpl) ? initialTpl as TplKey : 'A');

    useEffect(() => {
        try {
            const u = new URL(window.location.href);
            u.searchParams.set('tpl', tpl);
            window.history.replaceState(null, '', u.toString());
        } catch { /* noop */ }
    }, [tpl]);

    const essay = mode === 'essay' ? getEssayForDay(day) : null;
    const summary = mode === 'summary' ? getSummaryForDay(day) : null;

    const ctx: Ctx = {
        mode, day,
        exam: essay?.exam ?? '',
        titleLabel: mode === 'essay' ? '英作文 答案用紙' : '英文要約 答案用紙',
        wordTarget: mode === 'essay' ? '200 - 240' : '90 - 110',
        topic: essay?.topic,
        topicJa: essay?.topicJa,
        theme: summary?.theme,
        themeJa: summary?.themeJa,
        instruction: summary ? `テーマ「${summary.themeJa}」の本文(約300語)を読み、90-110語で要約する。本文の語句をそのまま使わず言い換えること。` : undefined,
    };

    const t = THEMES[tpl];
    const available = mode === 'essay' ? !!essay : !!summary;

    return (
        <div style={{ minHeight: '100vh', background: '#EDE8DC', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <style>{`
                @page { size: A4 portrait; margin: 0; }
                @media print {
                    html, body { background: #fff !important; margin: 0 !important; }
                    body * { visibility: hidden !important; }
                    .answer-sheet, .answer-sheet * { visibility: visible !important; }
                    .answer-sheet { position: absolute !important; top: 0 !important; left: 0 !important; margin: 0 !important; box-shadow: none !important; }
                    .no-print { display: none !important; }
                }
                .answer-sheet { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            `}</style>

            {/* toolbar */}
            <div className="no-print" style={{ width: '210mm', maxWidth: '100%', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <a href="/english/write/days" style={{ textDecoration: 'none', color: '#78716C', fontSize: '13px', fontWeight: 700 }}>← ライトパスに戻る</a>
                    <button onClick={() => window.print()} style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', background: '#1C1917', color: '#fff', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                        印刷する / PDF保存
                    </button>
                </div>
                {/* template switcher */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {(Object.keys(THEMES) as TplKey[]).map(k => {
                        const th = THEMES[k];
                        const active = k === tpl;
                        return (
                            <button key={k} onClick={() => setTpl(k)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '7px 12px', borderRadius: '9px', cursor: 'pointer',
                                    border: active ? `2px solid ${th.accent}` : '1px solid #D9D2C2',
                                    background: active ? '#fff' : '#F4F0E6',
                                    fontWeight: active ? 900 : 700, fontSize: '12px', color: active ? '#1C1917' : '#78716C',
                                }}>
                                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: th.accent, border: '1px solid rgba(0,0,0,0.1)' }} />
                                {k} ・ {th.name}
                            </button>
                        );
                    })}
                </div>
                <div style={{ fontSize: '11px', color: '#8A8170', marginTop: '8px' }}>
                    {mode === 'essay' ? '意見論述' : '要約'} ・ Day {day} ・ A4縦。印刷ダイアログで「背景のグラフィック」をオンにすると色まで綺麗に出ます。
                </div>
            </div>

            {available ? <Sheet ctx={ctx} t={t} /> : (
                <div style={{ width: '210mm', maxWidth: '100%', background: '#fff', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', color: '#8A8170' }}>この日はまだ準備中です</div>
            )}
        </div>
    );
}

export default function AnswerSheetPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, color: '#8A8170' }}>Loading...</div>}>
            <SheetInner />
        </Suspense>
    );
}
