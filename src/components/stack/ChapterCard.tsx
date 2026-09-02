import Link from 'next/link';
import { T } from '@/data/stack/theme';
import type { Chapter } from '@/data/stack/types';

export function ChapterCard({ c }: { c: Chapter }) {
    return (
        <Link
            href={`/english/stack/${c.slug}`}
            style={{
                display: 'block', textDecoration: 'none', color: 'inherit',
                backgroundColor: T.surface, border: `1px solid ${T.border}`,
                borderRadius: T.radius, padding: '16px 18px', boxShadow: T.shadow,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: T.gold, fontVariantNumeric: 'tabular-nums' }}>
                    {String(c.no).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 16, fontWeight: 800, flex: 1 }}>{c.title}</span>
                <span style={{
                    fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999,
                    whiteSpace: 'nowrap',
                    color: c.free ? T.green : T.textMuted,
                    backgroundColor: c.free ? T.greenSoft : T.surfaceAlt,
                    border: `1px solid ${c.free ? T.green + '44' : T.border}`,
                }}>
                    {c.free ? '無料' : '有料'}
                </span>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: 13.5, color: T.textSub, lineHeight: 1.75 }}>{c.lead}</p>
            <div style={{ display: 'flex', gap: 14, fontSize: 11.5, color: T.textMuted, flexWrap: 'wrap' }}>
                <span>手元に残る: {c.goal}</span>
                <span>{c.time}</span>
            </div>
        </Link>
    );
}
