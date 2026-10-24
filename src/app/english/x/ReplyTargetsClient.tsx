'use client';

import { useState } from 'react';
import {
    REPLY_TARGETS,
    ANGLE_DEFS,
    DISCOVERY_QUERIES,
    ANTI_PATTERNS,
} from '@/data/x-playbook';

const PRIORITY_LABEL = {
    core: 'コア (Phase 1 から毎日)',
    sub: 'サブ (Phase 2 から)',
    discovery: '発掘 (毎日 1 人)',
} as const;

const PRIORITY_COLOR = {
    core: '#DC2626',
    sub: '#0891B2',
    discovery: '#92400E',
} as const;

const ACTIVITY_COLOR = {
    活発: '#10B981',
    普通: '#D4AF37',
    閑散: '#888',
} as const;

const RISK_COLOR = {
    low: '#10B981',
    medium: '#D4AF37',
    high: '#DC2626',
} as const;

export default function ReplyTargetsClient() {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'core' | 'sub' | 'discovery'>('all');

    const copy = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 1500);
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = filter === 'all' ? REPLY_TARGETS : REPLY_TARGETS.filter(t => t.priority === filter);

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
            {/* ヘッダー */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e7e5e4',
                    borderRadius: 16,
                    padding: '20px 24px',
                    marginBottom: 20,
                    borderLeft: '4px solid #10B981',
                }}
            >
                <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.2em', marginBottom: 4 }}>
                    REPLY TARGETS
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: '0 0 6px 0' }}>
                    リプ営業ターゲット
                </h1>
                <div style={{ fontSize: 12, color: '#525252', lineHeight: 1.6 }}>
                    実在確認済みの中堅勢のみ (3K-30K)。大手は除外 (リプ埋もれる)。
                    1日5リプ厳守 / 自分の投稿1 : リプ5 / 商材リンクは3往復目以降のみ。
                </div>
            </div>

            {/* フィルタ */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {(['all', 'core', 'sub', 'discovery'] as const).map(p => (
                    <button
                        key={p}
                        onClick={() => setFilter(p)}
                        style={{
                            padding: '8px 14px',
                            fontSize: 12,
                            fontWeight: 600,
                            border: '1px solid #e7e5e4',
                            borderRadius: 8,
                            backgroundColor: filter === p ? '#1c1917' : '#fff',
                            color: filter === p ? '#fff' : '#525252',
                            cursor: 'pointer',
                        }}
                    >
                        {p === 'all' ? `すべて (${REPLY_TARGETS.length})` : PRIORITY_LABEL[p]}
                    </button>
                ))}
            </div>

            {/* ターゲットカード */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                {filtered.map(t => (
                    <div
                        key={t.handle}
                        style={{
                            backgroundColor: '#fff',
                            border: '1px solid #e7e5e4',
                            borderLeft: `4px solid ${PRIORITY_COLOR[t.priority]}`,
                            borderRadius: 12,
                            padding: '18px 20px',
                        }}
                    >
                        {/* ヘッダー行 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                            <a
                                href={t.handle.startsWith('@') ? `https://x.com/${t.handle.replace('@', '')}` : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                    color: '#1c1917',
                                    textDecoration: 'none',
                                }}
                            >
                                {t.handle}
                            </a>
                            <span style={{ fontSize: 13, color: '#525252' }}>{t.name}</span>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#fff',
                                    backgroundColor: PRIORITY_COLOR[t.priority],
                                    padding: '3px 9px',
                                    borderRadius: 4,
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {PRIORITY_LABEL[t.priority]}
                            </span>
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: ACTIVITY_COLOR[t.activity],
                                    border: `1px solid ${ACTIVITY_COLOR[t.activity]}`,
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                }}
                            >
                                {t.activity}
                            </span>
                            <span style={{ fontSize: 11, color: '#525252', backgroundColor: '#f5f5f4', padding: '3px 8px', borderRadius: 4 }}>
                                {t.followers}
                            </span>
                            <span style={{ fontSize: 11, color: '#888', marginLeft: 'auto' }}>{t.category}</span>
                        </div>

                        {/* なぜリプるのか */}
                        <div style={{ marginBottom: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: '0.1em', marginBottom: 4 }}>
                                WHY
                            </div>
                            <div style={{ fontSize: 13, color: '#1c1917', lineHeight: 1.6 }}>{t.why}</div>
                        </div>

                        {/* 角度 */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: '0.1em', marginBottom: 4 }}>
                                推奨アングル
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {t.angles.map(a => (
                                    <span
                                        key={a}
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: '#92400E',
                                            backgroundColor: '#FEF3C7',
                                            padding: '3px 9px',
                                            borderRadius: 4,
                                        }}
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* テンプレート */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: '0.1em', marginBottom: 6 }}>
                                リプ案 (タップでコピー)
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {t.templates.map((tpl, i) => {
                                    const key = `${t.handle}-${i}`;
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                position: 'relative',
                                                padding: '12px 14px',
                                                backgroundColor: '#fafaf9',
                                                border: '1px solid #e7e5e4',
                                                borderRadius: 8,
                                                fontSize: 13,
                                                color: '#1c1917',
                                                lineHeight: 1.7,
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>案 {i + 1} · {tpl.length}字</div>
                                            <div>{tpl}</div>
                                            <button
                                                onClick={() => copy(key, tpl)}
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    padding: '4px 10px',
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    border: 'none',
                                                    borderRadius: 4,
                                                    backgroundColor: copiedKey === key ? '#10B981' : '#1c1917',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {copiedKey === key ? 'コピー済' : 'コピー'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 注意 */}
                        {t.avoid && (
                            <div style={{ padding: '8px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, marginBottom: 6 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#DC2626' }}>注意 </span>
                                <span style={{ fontSize: 12, color: '#7f1d1d' }}>{t.avoid}</span>
                            </div>
                        )}

                        {t.note && (
                            <div style={{ padding: '8px 12px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#92400E' }}>NOTE </span>
                                <span style={{ fontSize: 12, color: '#78350f' }}>{t.note}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* リプアングル定義 */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e7e5e4',
                    borderRadius: 16,
                    padding: '20px 24px',
                    marginBottom: 20,
                }}
            >
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: '0 0 12px 0' }}>4 つのリプアングル</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                    {ANGLE_DEFS.map(a => (
                        <div key={a.angle} style={{ padding: '12px 14px', backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#1c1917' }}>{a.angle}</span>
                                <span
                                    style={{
                                        fontSize: 9,
                                        fontWeight: 700,
                                        color: '#fff',
                                        backgroundColor: RISK_COLOR[a.riskLevel],
                                        padding: '2px 6px',
                                        borderRadius: 3,
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {a.riskLevel === 'low' ? '低リスク' : a.riskLevel === 'medium' ? '中リスク' : '高リスク'}
                                </span>
                            </div>
                            <div style={{ fontSize: 12, color: '#1c1917', lineHeight: 1.6, marginBottom: 4 }}>{a.description}</div>
                            <div style={{ fontSize: 10, color: '#888' }}>相性: {a.bestFor}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 発掘クエリ */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e7e5e4',
                    borderRadius: 16,
                    padding: '20px 24px',
                    marginBottom: 20,
                }}
            >
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: '0 0 6px 0' }}>新規ターゲット発掘クエリ</h2>
                <div style={{ fontSize: 12, color: '#525252', marginBottom: 12 }}>
                    X検索バーに貼って、フォロワー3K-30K帯を毎日1人見つける
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {DISCOVERY_QUERIES.map(q => {
                        const key = `query-${q.query}`;
                        return (
                            <div
                                key={q.query}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '10px 14px',
                                    backgroundColor: '#fafaf9',
                                    border: '1px solid #e7e5e4',
                                    borderRadius: 8,
                                }}
                            >
                                <code
                                    style={{
                                        flex: 1,
                                        fontSize: 12,
                                        color: '#1c1917',
                                        fontFamily: 'ui-monospace, monospace',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {q.query}
                                </code>
                                <span style={{ fontSize: 11, color: '#525252', whiteSpace: 'nowrap' }}>{q.purpose}</span>
                                <button
                                    onClick={() => copy(key, q.query)}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: 10,
                                        fontWeight: 700,
                                        border: 'none',
                                        borderRadius: 4,
                                        backgroundColor: copiedKey === key ? '#10B981' : '#1c1917',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {copiedKey === key ? 'コピー済' : 'コピー'}
                                </button>
                                <a
                                    href={`https://x.com/search?q=${encodeURIComponent(q.query)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: 10,
                                        fontWeight: 700,
                                        border: 'none',
                                        borderRadius: 4,
                                        backgroundColor: '#1DA1F2',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    X 検索 →
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 中堅発見の3秒判定法 */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e7e5e4',
                    borderRadius: 16,
                    padding: '20px 24px',
                    marginBottom: 20,
                }}
            >
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: '0 0 12px 0' }}>中堅発見の 3 秒判定法</h2>
                <ol style={{ paddingLeft: 20, fontSize: 13, color: '#1c1917', lineHeight: 1.8, margin: 0 }}>
                    <li>プロフィールを開く</li>
                    <li>直近10投稿のリプ欄をスクロール</li>
                    <li>
                        本人がリプ返してる / 個人名で会話してる → <span style={{ color: '#10B981', fontWeight: 700 }}>GO</span>
                        <br />
                        全部いいねで終わってる / 本人不在 → <span style={{ color: '#DC2626', fontWeight: 700 }}>SKIP</span>
                    </li>
                </ol>
                <div style={{ marginTop: 12, padding: '10px 14px', backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8, fontSize: 12, color: '#525252', lineHeight: 1.6 }}>
                    <strong>良いサイン:</strong> 直近5投稿のリプ数が平均1-5件 / 本人がフォロワーにリプ返してる / フォロー1000+ かつ フォロワー5K-30K (相互文化) / いいね数 ÷ フォロワー = 0.3-2%
                    <br />
                    <strong>危険サイン:</strong> インプレゾンビ英語リプ常時20件+ / 本人が3ヶ月リプ返してない / 固定がコーチング販売 / プロモコード50%超
                </div>
            </div>

            {/* 絶対 NG */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e7e5e4',
                    borderRadius: 16,
                    padding: '20px 24px',
                    borderLeft: '4px solid #DC2626',
                }}
            >
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: '0 0 12px 0' }}>絶対 NG リスト</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
                    {ANTI_PATTERNS.map((p, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '10px 12px',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: 8,
                            }}
                        >
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>{p.rule}</div>
                            <div style={{ fontSize: 11, color: '#7f1d1d', lineHeight: 1.5 }}>{p.why}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
