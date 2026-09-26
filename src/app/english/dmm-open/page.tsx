/**
 * DMM英会話 無料公開 — 一覧
 */

import Link from 'next/link';
import { OPEN_LESSONS, OPEN_SERIES } from '@/data/english/dmm-open';

const GOLD = '#D4AF37';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

export default function DmmOpenIndexPage() {
    const lessons = [...OPEN_LESSONS].sort((a, b) => b.date.localeCompare(a.date));
    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px 80px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '6px' }}>DMM英会話 · 無料公開</div>
                <h1 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 900, color: INK, lineHeight: 1.5 }}>{OPEN_SERIES.title}</h1>
                <div style={{ fontSize: '13px', color: SUB, marginBottom: '22px', lineHeight: 1.7 }}>{OPEN_SERIES.subtitle}</div>
                {OPEN_SERIES.method.map((p, i) => (
                    <p key={i} style={{ margin: '0 0 12px', fontSize: '14.5px', lineHeight: 2, color: INK }}>{p}</p>
                ))}
                <div style={{ display: 'grid', gap: '12px', marginTop: '24px' }}>
                    {lessons.map((l) => (
                        <Link key={l.slug} href={`/english/dmm-open/${l.slug}`} style={{ textDecoration: 'none' }}>
                            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`, borderRadius: '14px', padding: '16px 18px' }}>
                                <div style={{ fontSize: '11px', color: FAINT, fontWeight: 700, marginBottom: '4px' }}>{l.date.replace(/-/g, '.')} · {l.minutes}分</div>
                                <div style={{ fontSize: '16px', fontWeight: 800, color: INK, lineHeight: 1.5, marginBottom: '6px' }}>{l.title}</div>
                                <div style={{ fontSize: '13px', color: SUB, lineHeight: 1.8 }}>{l.catchcopy}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
