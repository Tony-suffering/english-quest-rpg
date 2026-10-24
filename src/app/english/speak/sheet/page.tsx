'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSpeechForDay } from '@/data/english/speak-eiken1';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#8A8170';
const LINE = '#E7DCBE';

function Lines({ n }: { n: number }) {
    return <>{Array.from({ length: n }, (_, i) => <div key={i} style={{ height: '7.5mm', borderBottom: `1px solid ${LINE}` }} />)}</>;
}

function Box({ label, en, lines, accent }: { label: string; en: string; lines: number; accent?: string }) {
    return (
        <div style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${accent || GOLD}`, borderRadius: '6px', padding: '3mm 4mm', marginBottom: '3mm', background: '#fff' }}>
            <div style={{ fontSize: '8.5pt', fontWeight: 800, color: accent || DEEPGOLD, marginBottom: '1.5mm' }}>{label} <span style={{ color: SUB, fontWeight: 700, fontSize: '7pt' }}>{en}</span></div>
            <Lines n={lines} />
        </div>
    );
}

function SheetInner() {
    const params = useSearchParams();
    const day = Math.max(1, Math.min(30, parseInt(params.get('day') || '1', 10) || 1));
    const sp = getSpeechForDay(day);

    return (
        <div style={{ minHeight: '100vh', background: '#EDE8DC', padding: '24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <style>{`
                @page { size: A4 portrait; margin: 0; }
                @media print {
                    html, body { background: #fff !important; margin: 0 !important; }
                    body * { visibility: hidden !important; }
                    .speak-sheet, .speak-sheet * { visibility: visible !important; }
                    .speak-sheet { position: absolute !important; top: 0 !important; left: 0 !important; box-shadow: none !important; }
                    .no-print { display: none !important; }
                }
                .speak-sheet { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            `}</style>

            <div className="no-print" style={{ width: '210mm', maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '10px', flexWrap: 'wrap' }}>
                <a href="/english/speak" style={{ textDecoration: 'none', color: '#78716C', fontSize: '13px', fontWeight: 700 }}>← スピークパスに戻る</a>
                <button onClick={() => window.print()} style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', background: INK, color: '#fff', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>印刷する / PDF保存</button>
            </div>

            <div className="speak-sheet" style={{ width: '210mm', height: '297mm', overflow: 'hidden', background: CREAM, boxShadow: '0 10px 40px rgba(0,0,0,0.18)', boxSizing: 'border-box', padding: '13mm 15mm 11mm', display: 'flex', flexDirection: 'column', fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif' }}>
                {/* HEADER */}
                <div style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #E6C75E 55%, ${GOLD} 100%)`, borderRadius: '10px', padding: '5mm 7mm', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '18pt', fontWeight: 900, fontFamily: 'Georgia, serif' }}>SPEAKPASS</span>
                            <span style={{ fontSize: '9pt', fontWeight: 900, background: 'rgba(0,0,0,0.78)', color: '#fff', padding: '2px 8px', borderRadius: '5px' }}>英検1級 2次対策</span>
                        </div>
                        <div style={{ fontSize: '8.5pt', marginTop: '2px', opacity: 0.95, letterSpacing: '2px' }}>スピーチ構成シート ・ 1分でメモる</div>
                    </div>
                    <div style={{ display: 'inline-block', background: '#fff', color: DEEPGOLD, fontWeight: 900, fontSize: '11pt', padding: '3px 12px', borderRadius: '99px' }}>DAY {String(day).padStart(2, '0')} / 30</div>
                </div>

                {/* TOPIC */}
                <div style={{ border: `1px solid ${LINE}`, borderLeft: `4px solid ${GOLD}`, borderRadius: '6px', background: '#FFFCF4', padding: '3.5mm 5mm', margin: '5mm 0 4mm' }}>
                    <div style={{ fontSize: '8pt', fontWeight: 800, color: GOLD, letterSpacing: '1px', marginBottom: '1mm' }}>TOPIC</div>
                    {sp ? (
                        <>
                            <div style={{ fontSize: '12.5pt', fontWeight: 800, color: INK, lineHeight: 1.4 }}>{sp.topic}</div>
                            <div style={{ fontSize: '8.5pt', color: SUB, marginTop: '1.5mm' }}>{sp.topicJa}</div>
                        </>
                    ) : (
                        <div style={{ height: '10mm', borderBottom: `1px solid ${LINE}` }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginTop: '3mm' }}>
                        <span style={{ fontSize: '8pt', fontWeight: 800, color: GREEN }}>MY POSITION 立場</span>
                        <span style={{ flex: 1, borderBottom: `1px solid ${LINE}`, height: '5mm' }} />
                    </div>
                </div>

                {/* BODY MEMO */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box label="理由① + 具体例" en="Reason 1 + example" lines={3} />
                    <Box label="理由② + 具体例" en="Reason 2 + example" lines={3} />
                    <Box label="結論（言い換えて締める）" en="Conclusion" lines={2} />
                    <Box label="想定Q&A（来そうな質問と返し）" en="Anticipated Q&A" lines={3} accent={GREEN} />
                    <div style={{ flex: 1, minHeight: '2mm' }} />
                    {/* TAKEAWAYS */}
                    <div style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '6px', padding: '3mm 4mm 3.5mm', background: '#fff' }}>
                        <div style={{ fontSize: '8.5pt', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>今日の学び <span style={{ color: SUB, fontWeight: 700, fontSize: '7pt' }}>MY TAKEAWAYS</span></div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '2mm' }}><span style={{ flexShrink: 0, width: '30mm', fontSize: '8pt', fontWeight: 800, color: GREEN }}>新出単語 Words</span><span style={{ flex: 1, borderBottom: `1px solid ${LINE}`, height: '4.5mm' }} /></div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '2mm' }}><span style={{ flexShrink: 0, width: '30mm', fontSize: '8pt', fontWeight: 800, color: GREEN }}>使える表現 Phrases</span><span style={{ flex: 1, borderBottom: `1px solid ${LINE}`, height: '4.5mm' }} /></div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '2mm' }}><span style={{ flexShrink: 0, width: '30mm', fontSize: '8pt', fontWeight: 800, color: GREEN }}>気づき Insight</span><span style={{ flex: 1, borderBottom: `1px solid ${LINE}`, height: '4.5mm' }} /></div>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3mm', paddingTop: '2.5mm', borderTop: `1px dashed ${LINE}` }}>
                    <span style={{ fontSize: '8pt', color: SUB }}>#スピークパス #英検2次 #面接</span>
                    <span style={{ fontSize: '11pt', fontWeight: 900, color: GOLD, fontFamily: 'Georgia, serif' }}>SPEAKPASS</span>
                </div>
            </div>

            <div className="no-print" style={{ fontSize: '11px', color: SUB, marginTop: '12px', textAlign: 'center', maxWidth: '210mm' }}>
                本番と同じ1分で、立場→理由2つ→結論をメモる練習に。印刷ダイアログで「背景のグラフィック」をオンにすると色まで綺麗に出ます。
            </div>
        </div>
    );
}

export default function SpeakSheetPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, color: '#8A8170' }}>Loading...</div>}>
            <SheetInner />
        </Suspense>
    );
}
