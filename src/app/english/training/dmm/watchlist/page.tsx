import Link from 'next/link';
import { listDmmConversations } from '@/lib/d1';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 横断ウォッチリスト「俺の英語バグ図鑑」。
// 全 DMM レッスンの振り返りレポート (diagnosis) から繰り返し文法バグ・ネイティブらしくない癖を
// 集約し、再発回数の多い順に並べる = 「包括的に常にウォッチ」する一覧。

interface GrammarHit {
    conversationId: string;
    date: string;
    title: string;
    output: string;
    fix: string;
    bug: string;
    ref?: string;
}
interface NonnativeHit {
    conversationId: string;
    date: string;
    title: string;
    habit: string;
    native: string;
    drill: string;
}

export default async function DmmWatchlistPage() {
    const conversations = await listDmmConversations();

    // ── Aggregate grammar bugs by ref (fallback to bug text) ──
    const grammarBuckets = new Map<string, { label: string; ref?: string; hits: GrammarHit[] }>();
    const nonnativeBuckets = new Map<string, { label: string; hits: NonnativeHit[] }>();

    for (const c of conversations) {
        const d = c.diagnosis;
        if (!d) continue;
        for (const g of d.grammar || []) {
            // Split compound refs ("#1 / #7") into atomic tokens so the same #N
            // recurring across lessons aggregates into one bucket. No ref -> bucket by bug text.
            // 08-14 の回だけ bug ではなく why で書かれている。古い書式を落とさずに拾う。
            const bug = (g.bug ?? (g as { why?: string }).why ?? '').trim();
            if (!bug && !g.output) continue;
            const atomicRefs = (g.ref || '').match(/#\d+/g) || [];
            const keys = atomicRefs.length ? atomicRefs.map(r => `ref:${r}`) : [`bug:${(bug || g.output || '').toLowerCase()}`];
            for (const key of keys) {
                const refLabel = key.startsWith('ref:') ? key.slice(4) : undefined;
                if (!grammarBuckets.has(key)) grammarBuckets.set(key, { label: bug, ref: refLabel, hits: [] });
                const bucket = grammarBuckets.get(key)!;
                bucket.label = bug; // keep most-recent phrasing (list is date DESC)
                if (refLabel) bucket.ref = refLabel;
                bucket.hits.push({ conversationId: c.id, date: c.date, title: c.title, output: g.output, fix: g.fix, bug, ref: g.ref });
            }
        }
        for (const n of d.nonnative || []) {
            const key = n.habit.trim().toLowerCase();
            if (!nonnativeBuckets.has(key)) nonnativeBuckets.set(key, { label: n.habit, hits: [] });
            nonnativeBuckets.get(key)!.hits.push({ conversationId: c.id, date: c.date, title: c.title, habit: n.habit, native: n.native, drill: n.drill });
        }
    }

    const grammarRanked = [...grammarBuckets.values()].sort((a, b) => b.hits.length - a.hits.length);
    const nonnativeRanked = [...nonnativeBuckets.values()].sort((a, b) => b.hits.length - a.hits.length);

    const lessonsWithDiagnosis = conversations.filter(c => c.diagnosis).length;

    return (
        <main style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: '32px 20px 80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
        }}>
            <header style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Link href="/english/training/dmm" style={{ fontSize: 12, color: '#78716c', textDecoration: 'none' }}>← DMM 一覧</Link>
                    <div style={{ fontSize: 12, color: '#a8a29e' }}>振り返り済み {lessonsWithDiagnosis} / {conversations.length} レッスン</div>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 6px', letterSpacing: 0.5 }}>俺の英語バグ図鑑</h1>
                <p style={{ fontSize: 13, color: '#57534e', lineHeight: 1.6, margin: 0 }}>
                    全レッスンの振り返りを横断集約。再発の多い順 = 今いちばん潰すべきバグ。出るたびに #番号で刷り込む。
                </p>
            </header>

            {lessonsWithDiagnosis === 0 && (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: '#a8a29e', fontSize: 13, background: '#fafaf9', borderRadius: 12 }}>
                    まだ振り返りレポート付きのレッスンがありません。各レッスンに振り返りを登録すると、ここに横断集約されます。
                </div>
            )}

            {/* 繰り返し文法バグ */}
            {grammarRanked.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#7f1d1d', margin: '0 0 12px' }}>繰り返し文法バグ</h2>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {grammarRanked.map((b, i) => (
                            <div key={i} style={{ border: '1px solid #fecaca', borderRadius: 10, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fef2f2', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#7f1d1d' }}>{b.label}</span>
                                    {b.ref && <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', borderRadius: 4, padding: '2px 6px' }}>{b.ref}</span>}
                                    <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: '#dc2626' }}>再発 {b.hits.length} 回</span>
                                </div>
                                <div style={{ display: 'grid', gap: 4, padding: '8px 14px' }}>
                                    {b.hits.map((h, hi) => (
                                        <Link key={hi} href={`/english/training/dmm/${h.conversationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ fontSize: 12, lineHeight: 1.5, display: 'flex', gap: 8, alignItems: 'baseline', padding: '3px 0' }}>
                                                <span style={{ fontSize: 10, color: '#a8a29e', whiteSpace: 'nowrap' }}>{h.date}</span>
                                                <span style={{ color: '#b91c1c', textDecoration: 'line-through' }}>{h.output}</span>
                                                <span style={{ color: '#a8a29e' }}>→</span>
                                                <span style={{ color: '#065f46', fontWeight: 600 }}>{h.fix}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ネイティブらしくない癖 */}
            {nonnativeRanked.length > 0 && (
                <section style={{ marginBottom: 30 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#5b21b6', margin: '0 0 12px' }}>ネイティブらしくない癖</h2>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {nonnativeRanked.map((b, i) => (
                            <div key={i} style={{ border: '1px solid #ddd6fe', borderRadius: 10, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f5f3ff', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#5b21b6' }}>{b.label}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: '#7c3aed' }}>再発 {b.hits.length} 回</span>
                                </div>
                                <div style={{ display: 'grid', gap: 6, padding: '8px 14px' }}>
                                    {b.hits.map((h, hi) => (
                                        <Link key={hi} href={`/english/training/dmm/${h.conversationId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div style={{ fontSize: 12, lineHeight: 1.5, padding: '3px 0' }}>
                                                <span style={{ fontSize: 10, color: '#a8a29e', marginRight: 8 }}>{h.date}</span>
                                                <span style={{ color: '#065f46', fontWeight: 600 }}>{h.native}</span>
                                                <span style={{ color: '#9f1239', marginLeft: 8 }}>— {h.drill}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
