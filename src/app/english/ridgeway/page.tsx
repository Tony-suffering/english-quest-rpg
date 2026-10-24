'use client';

/**
 * RIDGEWAY — 町民名鑑と相関図
 *
 * requiem 22シナリオの住人147人を、1つの町として見るページ。
 * 正典は src/data/english/requiem-world.ts。ここは表示だけで、データは持たない。
 *
 * 構成: 町の概要 → Marcus の15年(背骨) → 相関図(SVG) → 名簿(検索・絞り込み)
 * 相関図は力学シミュレーションを使わず、円ごとのクラスタ配置を決め打ちで計算する。
 * 毎回同じ絵が出るほうが「町の地図」として頭に残るし、147ノードでも一切重くならない。
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    WORLD, CIRCLES, PEOPLE, RELATIONS, MARCUS_TIMELINE, COLLISIONS, ROSTER_STATUS, EPISODES, episodeCast,
    type WorldPerson, type RelationKind, type Episode,
} from '@/data/english/requiem-world';
import { getProtagonist, getMajor, CAST_LIVES, tierOf, type CastTier } from '@/data/english/ridgeway-cast';
import WorldMapButton from '@/components/english/WorldMapButton';
import { STATIONS } from '@/data/english/tonio-lifeline';

const TIER_LABEL: Record<CastTier, { label: string; color: string; bg: string }> = {
    protagonist: { label: '主役', color: '#92400E', bg: '#FFFBEB' },
    major: { label: '主要', color: '#047857', bg: '#ECFDF5' },
    supporting: { label: '準主要', color: '#0369A1', bg: '#F0F9FF' },
    ensemble: { label: '町民', color: '#57534E', bg: '#F5F5F4' },
};

const lifeOf = (id: string) => CAST_LIVES.find((l) => l.id === id);
const taglineOf = (id: string) =>
    getProtagonist(id)?.tagline ?? getMajor(id)?.tagline ?? lifeOf(id)?.tagline ?? null;

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const INK = '#1C1917';
const MUTED = '#78716C';
const LINE = '#E7E5E4';
const PAPER = '#FAFAF9';

const SCENARIO_JA: Record<string, string> = {
    wedding: '結婚式', cruise: 'クルーズ', roadtrip: 'ロードトリップ', campingtrip: 'キャンプ',
    juryduty: '陪審員', dmv: 'DMV', emergencyroom: '救急外来', airport: '空港',
    thanksgiving: '感謝祭', homeinspection: '住宅査定', firstweek: '初出社',
    fridaynightlights: 'ホームカミング', worstdate: '最悪の初デート', blockparty: 'ブロックパーティー',
    bbq: 'BBQ', bucketlist: 'バケットリスト', antiques: '遺品整理', gamenight: 'ゲームナイト',
    movie: '映画館', mariners: '野球談義', monster: 'ベッドの下', party: '大学のパーティー',
    'losers-table': 'ルーザーズ・テーブル', 'night-docket': 'ナイト・ドケット',
};

const REL_STYLE: Record<RelationKind, { color: string; dash?: string; label: string; width: number }> = {
    partner: { color: GOLD, label: '伴侶', width: 2.2 },
    ex: { color: GOLD, dash: '5 4', label: '元', width: 1.6 },
    parent: { color: GREEN, label: '親子', width: 2 },
    sibling: { color: '#0EA5E9', label: 'きょうだい', width: 1.8 },
    friend: { color: '#A8A29E', label: '友人', width: 1.2 },
    colleague: { color: '#78716C', label: '仕事', width: 1.2 },
    neighbour: { color: '#A8A29E', dash: '3 5', label: '隣人', width: 1.2 },
    echo: { color: '#C0392B', dash: '2 6', label: 'こだま', width: 1.6 },
};

const W = 1040;
const H = 820;

interface Node { p: WorldPerson; x: number; y: number; circle: string }

function useLayout() {
    return useMemo(() => {
        // 円(世帯・組織)を大きなリング上に置き、その中で人を小さなリングに並べる。
        const used = CIRCLES.filter((c) => PEOPLE.some((p) => p.circle === c.id));
        const cx = W / 2;
        const cy = H / 2;
        const R = Math.min(W, H) * 0.36;
        const nodes: Node[] = [];
        const centers: Record<string, { x: number; y: number; r: number }> = {};

        used.forEach((c, i) => {
            const members = PEOPLE.filter((p) => p.circle === c.id);
            const a = (i / used.length) * Math.PI * 2 - Math.PI / 2;
            // 人数の多い円は外側に置いて、重なりを減らす
            const push = 1 + Math.min(members.length, 20) / 60;
            const gx = cx + Math.cos(a) * R * push;
            const gy = cy + Math.sin(a) * R * push * 0.82;
            const r = 26 + Math.sqrt(members.length) * 15;
            centers[c.id] = { x: gx, y: gy, r };
            members.forEach((p, j) => {
                if (members.length === 1) { nodes.push({ p, x: gx, y: gy, circle: c.id }); return; }
                const t = (j / members.length) * Math.PI * 2;
                // 2周に分けて詰める(人数の多い円が団子にならないように)
                const ring = members.length > 12 && j % 2 === 1 ? 0.58 : 1;
                nodes.push({ p, x: gx + Math.cos(t) * r * ring, y: gy + Math.sin(t) * r * ring, circle: c.id });
            });
        });

        const pos: Record<string, Node> = {};
        nodes.forEach((n) => { pos[n.p.id] = n; });

        // 円の下敷きと見出しまで含めた全体を viewBox に収める。
        // 人数が変わっても、はみ出しでラベルが切れることが無くなる。
        const LABEL = 34;
        const xs: number[] = []; const ys: number[] = [];
        used.forEach((c) => {
            const g = centers[c.id];
            xs.push(g.x - g.r - 24, g.x + g.r + 24);
            ys.push(g.y - g.r - 24 - LABEL, g.y + g.r + 24);
        });
        const minX = Math.min(...xs); const maxX = Math.max(...xs);
        const minY = Math.min(...ys); const maxY = Math.max(...ys);
        const pad = 16;
        const scale = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY), 1);
        const tx = pad + ((W - pad * 2) - (maxX - minX) * scale) / 2 - minX * scale;
        const ty = pad + ((H - pad * 2) - (maxY - minY) * scale) / 2 - minY * scale;
        const fit = `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})`;

        return { nodes, pos, centers, used, fit };
    }, []);
}

export default function TonioTownPage() {
    const { nodes, pos, centers, used, fit } = useLayout();
    const [selected, setSelected] = useState<string | null>('marcus');
    const [filter, setFilter] = useState<string>('all');
    const [q, setQ] = useState('');

    const relationsOf = (id: string) => RELATIONS.filter((r) => r.from === id || r.to === id);
    const connected = useMemo(() => {
        if (!selected) return new Set<string>();
        const s = new Set<string>([selected]);
        relationsOf(selected).forEach((r) => { s.add(r.from); s.add(r.to); });
        return s;
    }, [selected]);

    const person = selected ? PEOPLE.find((p) => p.id === selected) : null;

    const roster = useMemo(() => {
        const t = q.trim().toLowerCase();
        return PEOPLE
            .filter((p) => filter === 'all' || p.circle === filter)
            .filter((p) => !t || p.name.toLowerCase().includes(t) || p.role.includes(t) || p.note.includes(t))
            .sort((a, b) => b.scenarios.length - a.scenarios.length || a.name.localeCompare(b.name));
    }, [filter, q]);

    const across = PEOPLE.filter((p) => p.scenarios.length > 1).length;

    return (
        <div style={{ backgroundColor: PAPER, minHeight: '100vh', color: INK, fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 20px 80px' }}>

                {/* ===== 見出し ===== */}
                <div style={{ borderBottom: `2px solid ${INK}`, paddingBottom: 18, marginBottom: 10 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: MUTED, fontWeight: 700 }}>REQUIEM · THE TOWN</div>
                    <h1 style={{ fontSize: 46, fontWeight: 900, letterSpacing: 2, margin: '8px 0 6px' }}>
                        RIDGEWAY<span style={{ fontSize: 18, marginLeft: 14, color: MUTED, letterSpacing: 4 }}>町民名鑑</span>
                    </h1>
                    <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.9, maxWidth: 860, margin: 0 }}>
                        {EPISODES.length}の物語は別々に書かれた。だが名前が重なっていて、繋ぐと1つの町になる。{WORLD.county}、{WORLD.town}。
                        下の台帳が全{EPISODES.length}話。名前を押すと、その人の相関図と人物像が開く。
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', margin: '18px 0 34px' }}>
                    {[
                        { n: ROSTER_STATUS.total, l: '町民' }, { n: EPISODES.length, l: '物語' },
                        { n: RELATIONS.length, l: '関係の線' }, { n: across, l: '2本以上に出る人' },
                        { n: ROSTER_STATUS.remaining, l: '残り枠 (上限150)' },
                    ].map((s) => (
                        <div key={s.l}>
                            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 1 }}>{s.n}</div>
                            <div style={{ fontSize: 11, color: MUTED, letterSpacing: 1.5, fontWeight: 700 }}>{s.l}</div>
                        </div>
                    ))}
                </div>

                <div style={{ backgroundColor: '#FFFBEB', border: `1px solid ${GOLD}`, borderRadius: 12, padding: '14px 18px', fontSize: 12.5, lineHeight: 1.9, color: '#78350F', marginBottom: 40 }}>
                    <strong>登場人物は147人で凍結している。</strong>上限は150 — ダンバー数、人が安定して関係を維持できる限界。
                    新しい話が要るときは新しい人ではなく、既にいる人の別の日を書く。追加を再開してよいのは全員が2本以上の物語に出たときで、
                    いま条件を満たすのは{across}人だけ。この町は広げ足りないのではなく、掘り足りない。
                </div>

                {/* ===== エピソード台帳: 全24話 ===== */}
                <section style={{ marginBottom: 46 }}>
                    <SectionTitle kicker="THE LEDGER" title={`全${EPISODES.length}話 — 誰が出て、何の話か`} />
                    <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.9, margin: '0 0 18px', maxWidth: 900 }}>
                        物語ごとの台帳。<strong style={{ color: INK }}>看板</strong>は、その回で覚えてほしい順に並べた人。
                        名前を押すと下の相関図でその人が選ばれ、人物像が開く。
                        金色の3本(#23・#24・#25)は新キャラゼロの<strong style={{ color: INK }}>融合回</strong> — 既にいる人を別の部屋に座らせただけの回である。
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 14 }}>
                        {[...EPISODES].reverse().map((ep: Episode) => {
                            const cast = episodeCast(ep.key);
                            const fusion = ep.key === 'losers-table' || ep.key === 'night-docket' || ep.key === 'talent-show';
                            return (
                                <div
                                    key={ep.key}
                                    style={{
                                        border: `1px solid ${fusion ? GOLD : LINE}`,
                                        borderLeft: `4px solid ${fusion ? GOLD : INK}`,
                                        borderRadius: 12,
                                        backgroundColor: fusion ? '#FFFDF5' : '#fff',
                                        padding: '14px 16px 15px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1, color: fusion ? GOLD : MUTED }}>#{ep.num}</span>
                                        <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: 0.5 }}>{ep.titleJa}</span>
                                        <span style={{ fontSize: 11, color: MUTED, fontWeight: 700 }}>{ep.titleEn}</span>
                                    </div>

                                    <div style={{ fontSize: 10.5, color: MUTED, fontWeight: 700, letterSpacing: 0.5, margin: '6px 0 8px' }}>
                                        {ep.start} · {ep.days}日 · {ep.where} · 登場{cast.length}人
                                    </div>

                                    <p style={{ fontSize: 12.5, lineHeight: 1.85, margin: '0 0 8px' }}>{ep.premise}</p>

                                    <p style={{ fontSize: 12, lineHeight: 1.8, margin: '0 0 10px', color: fusion ? '#78350F' : '#0F766E', fontWeight: 700 }}>
                                        芯 — {ep.hinge.replace(/\*\*/g, '')}
                                    </p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {ep.lead.map((id) => {
                                            const p = PEOPLE.find((x) => x.id === id);
                                            if (!p) return null;
                                            const t = TIER_LABEL[tierOf(p)];
                                            return (
                                                <button
                                                    key={id}
                                                    onClick={() => setSelected(id)}
                                                    title={p.role}
                                                    style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: 5,
                                                        fontSize: 11, fontWeight: 800, cursor: 'pointer',
                                                        backgroundColor: selected === id ? '#FFFBEB' : t.bg,
                                                        color: t.color,
                                                        border: `1px solid ${selected === id ? GOLD : LINE}`,
                                                        borderRadius: 999, padding: '4px 10px',
                                                    }}
                                                >
                                                    {p.name}
                                                    <span style={{ fontSize: 9.5, opacity: 0.8, fontWeight: 700 }}>{t.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.8, marginTop: 8 }}>
                                        {ep.lead.map((id) => PEOPLE.find((x) => x.id === id)).filter(Boolean).map((p) => (
                                            <div key={p!.id}><strong style={{ color: INK }}>{p!.name}</strong> — {p!.role}</div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ===== 背骨: Marcus の15年 ===== */}
                <section style={{ marginBottom: 46 }}>
                    <SectionTitle kicker="THE SPINE" title="Marcus Vance の15年" />
                    <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.9, margin: '0 0 22px', maxWidth: 900 }}>
                        7つの物語に出る唯一の人物。誰も設計していないのに、この町には15年分の人生が1本通っていた。
                        30歳で家を買う相手の Jenna は、高校のホームカミングで「私は抗議のもとにここにいる」と座っていた人物である。
                    </p>
                    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
                        {MARCUS_TIMELINE.map((t, i) => (
                            <div key={t.scenario} style={{ minWidth: 208, flex: 1, borderTop: `3px solid ${i === 4 ? GOLD : LINE}`, paddingTop: 14, paddingRight: 16 }}>
                                <div style={{ fontSize: 22, fontWeight: 900, color: i === 4 ? GOLD : INK }}>{t.age}<span style={{ fontSize: 11, marginLeft: 3, color: MUTED }}>歳</span></div>
                                <div style={{ fontSize: 10, letterSpacing: 1, color: MUTED, fontWeight: 700, margin: '5px 0 6px' }}>{SCENARIO_JA[t.scenario]}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.6, marginBottom: 7 }}>{t.title}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.75 }}>{t.note}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== 相関図 ===== */}
                <section style={{ marginBottom: 46 }}>
                    <SectionTitle kicker="THE MAP" title="相関図" />
                    <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.9, margin: '0 0 14px' }}>
                        点をクリックすると、その人の線だけが残る。赤い点線は「こだま」— 別々の物語で、同じことを言っている二人。
                    </p>

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
                        {(Object.keys(REL_STYLE) as RelationKind[]).map((k) => (
                            <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: MUTED, fontWeight: 700 }}>
                                <svg width="26" height="8"><line x1="0" y1="4" x2="26" y2="4" stroke={REL_STYLE[k].color} strokeWidth={REL_STYLE[k].width} strokeDasharray={REL_STYLE[k].dash} /></svg>
                                {REL_STYLE[k].label}
                            </span>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 20, alignItems: 'start' }}>
                        <div style={{ border: `1px solid ${LINE}`, borderRadius: 14, backgroundColor: '#fff', overflow: 'hidden' }}>
                            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                              <g transform={fit}>
                                {/* 円(世帯・組織)の下敷き */}
                                {used.map((c) => {
                                    const g = centers[c.id];
                                    return (
                                        <g key={c.id}>
                                            <circle cx={g.x} cy={g.y} r={g.r + 24} fill={c.kind === 'household' ? '#FFFBEB' : c.kind === 'institution' ? '#ECFDF5' : '#F5F5F4'} stroke={LINE} />
                                            <text x={g.x} y={g.y - g.r - 30} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={MUTED} letterSpacing="1">{c.name}</text>
                                        </g>
                                    );
                                })}

                                {/* 関係の線 */}
                                {RELATIONS.map((r, i) => {
                                    const a = pos[r.from]; const b = pos[r.to];
                                    if (!a || !b) return null;
                                    const on = !selected || (connected.has(r.from) && connected.has(r.to));
                                    const st = REL_STYLE[r.kind];
                                    const mx = (a.x + b.x) / 2; const my = (a.y + b.y) / 2;
                                    const dx = b.x - a.x; const dy = b.y - a.y;
                                    const curve = 0.12;
                                    return (
                                        <path
                                            key={i}
                                            d={`M ${a.x} ${a.y} Q ${mx - dy * curve} ${my + dx * curve} ${b.x} ${b.y}`}
                                            fill="none" stroke={st.color} strokeWidth={st.width}
                                            strokeDasharray={st.dash} opacity={on ? 0.75 : 0.06}
                                        />
                                    );
                                })}

                                {/* 人 */}
                                {nodes.map((n) => {
                                    const on = !selected || connected.has(n.p.id);
                                    const isSel = selected === n.p.id;
                                    const size = 4 + Math.min(n.p.scenarios.length, 7) * 1.6;
                                    return (
                                        <g key={n.p.id} onClick={() => setSelected(isSel ? null : n.p.id)} style={{ cursor: 'pointer' }}>
                                            <circle cx={n.x} cy={n.y} r={size + 7} fill="transparent" />
                                            <circle
                                                cx={n.x} cy={n.y} r={size}
                                                fill={isSel ? GOLD : n.p.scenarios.length > 1 ? GREEN : '#fff'}
                                                stroke={isSel ? '#92400E' : n.p.scenarios.length > 1 ? '#047857' : MUTED}
                                                strokeWidth={isSel ? 2.5 : 1.3}
                                                opacity={on ? 1 : 0.14}
                                            />
                                            {(isSel || n.p.scenarios.length > 2) && (
                                                <text x={n.x} y={n.y - size - 5} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={INK} opacity={on ? 1 : 0.14}>
                                                    {n.p.name.split(' ')[0]}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                              </g>
                            </svg>
                        </div>

                        {/* 選択した人 */}
                        <div style={{ border: `1px solid ${LINE}`, borderRadius: 14, backgroundColor: '#fff', padding: 18, position: 'sticky', top: 16 }}>
                            {person ? (
                                <>
                                    <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 800 }}>
                                        {CIRCLES.find((c) => c.id === person.circle)?.name}
                                    </div>
                                    <div style={{ fontSize: 24, fontWeight: 900, margin: '6px 0 2px' }}>{person.name}</div>
                                    <div style={{ fontSize: 12.5, color: MUTED, fontWeight: 700, marginBottom: 12 }}>
                                        {person.age ? `${person.age} · ` : ''}{person.role}
                                    </div>
                                    <p style={{ fontSize: 12.5, lineHeight: 1.95, margin: '0 0 14px' }}>{person.note}</p>

                                    {/* 人生(ridgeway-cast の配線)。主役=6項目 / 主要=秘密+欲 / 町民=人生 */}
                                    {(() => {
                                        const full = getProtagonist(person.id) ?? getMajor(person.id);
                                        const life = lifeOf(person.id);
                                        const tier = TIER_LABEL[tierOf(person)];
                                        const tagline = full?.tagline ?? life?.tagline;
                                        const rows: [string, string][] = full
                                            ? [['欲', full.want], ['傷', full.wound], ['秘密', full.secret], ['矛盾', full.contradiction], ['声', full.voice], ['弧', full.arc]]
                                            : life ? [['人生', life.life]] : [];
                                        if (!tagline && rows.length === 0) return null;
                                        return (
                                            <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 12, marginBottom: 14 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 900, color: tier.color, backgroundColor: tier.bg, border: `1px solid ${tier.color}`, borderRadius: 999, padding: '2px 10px', letterSpacing: 1 }}>{tier.label}</span>
                                                    <span style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 800 }}>THE LIFE</span>
                                                </div>
                                                {tagline && (
                                                    <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.7, marginBottom: 10, fontFamily: "Georgia, 'Yu Mincho', 'Hiragino Mincho ProN', serif" }}>
                                                        {tagline}
                                                    </div>
                                                )}
                                                {rows.map(([k, v]) => (
                                                    <div key={k} style={{ marginBottom: 9 }}>
                                                        <span style={{ fontSize: 10, fontWeight: 900, color: '#92400E', backgroundColor: '#FFFBEB', borderRadius: 4, padding: '1px 7px', marginRight: 7 }}>{k}</span>
                                                        <span style={{ fontSize: 12, lineHeight: 1.9, color: '#44403C' }}>{v}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })()}

                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                                        {person.scenarios.map((s) => (
                                            <span key={s} style={{ fontSize: 10.5, fontWeight: 800, backgroundColor: '#F5F5F4', border: `1px solid ${LINE}`, borderRadius: 999, padding: '3px 9px' }}>{SCENARIO_JA[s] ?? s}</span>
                                        ))}
                                    </div>
                                    <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 12 }}>
                                        <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 800, marginBottom: 9 }}>関係 {relationsOf(person.id).length}</div>
                                        {relationsOf(person.id).map((r, i) => {
                                            const otherId = r.from === person.id ? r.to : r.from;
                                            const other = PEOPLE.find((p) => p.id === otherId);
                                            const st = REL_STYLE[r.kind];
                                            return (
                                                <div key={i} onClick={() => setSelected(otherId)} style={{ cursor: 'pointer', marginBottom: 10 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                                        <span style={{ width: 9, height: 9, borderRadius: 999, backgroundColor: st.color, flexShrink: 0 }} />
                                                        <span style={{ fontSize: 12.5, fontWeight: 800 }}>{other?.name}</span>
                                                        <span style={{ fontSize: 10, color: MUTED, fontWeight: 700 }}>{st.label}{r.era ? ` · ${r.era}` : ''}</span>
                                                    </div>
                                                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.7, paddingLeft: 16 }}>{r.label}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.9 }}>点をクリックすると、その人の関係だけが残る。</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ===== 名簿 ===== */}
                <section style={{ marginBottom: 46 }}>
                    <SectionTitle kicker="THE ROSTER" title={`名簿 ${roster.length} / ${PEOPLE.length}`} />
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', margin: '0 0 18px' }}>
                        <input
                            value={q} onChange={(e) => setQ(e.target.value)} placeholder="名前・役割・人物像で検索"
                            style={{ fontSize: 13, padding: '9px 13px', borderRadius: 9, border: `1px solid ${LINE}`, minWidth: 230, backgroundColor: '#fff' }}
                        />
                        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>すべて</Chip>
                        {used.map((c) => (
                            <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                                {c.name}<span style={{ opacity: 0.55, marginLeft: 5 }}>{PEOPLE.filter((p) => p.circle === c.id).length}</span>
                            </Chip>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))', gap: 12 }}>
                        {roster.map((p) => (
                            <div
                                key={p.id} onClick={() => { setSelected(p.id); window.scrollTo({ top: 620, behavior: 'smooth' }); }}
                                style={{
                                    border: `1px solid ${selected === p.id ? GOLD : LINE}`, borderRadius: 12, padding: 14, backgroundColor: '#fff',
                                    cursor: 'pointer', borderLeftWidth: 4, borderLeftColor: p.scenarios.length > 1 ? GREEN : LINE,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                                    <span style={{ fontSize: 15.5, fontWeight: 900 }}>{p.name}</span>
                                    {p.age && <span style={{ fontSize: 11, color: MUTED, fontWeight: 700 }}>{p.age}</span>}
                                </div>
                                <div style={{ fontSize: 11.5, color: MUTED, fontWeight: 700, marginBottom: 8 }}>{p.role}</div>
                                {taglineOf(p.id) && (
                                    <div style={{ fontSize: 12, fontWeight: 800, lineHeight: 1.7, marginBottom: 7, color: '#92400E', fontFamily: "Georgia, 'Yu Mincho', 'Hiragino Mincho ProN', serif" }}>
                                        {taglineOf(p.id)}
                                    </div>
                                )}
                                <p style={{ fontSize: 12, lineHeight: 1.85, margin: '0 0 10px', color: '#44403C' }}>{p.note}</p>
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                    {p.scenarios.map((s) => (
                                        <span key={s} style={{ fontSize: 10, fontWeight: 800, color: MUTED, backgroundColor: '#FAFAF9', border: `1px solid ${LINE}`, borderRadius: 999, padding: '2px 8px' }}>{SCENARIO_JA[s] ?? s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== 同名の裁定 ===== */}
                <section>
                    <SectionTitle kicker="THE RULINGS" title="同名の裁定" />
                    <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.9, margin: '0 0 16px' }}>
                        22本を別々に書いたので、同じ名前が16人ぶん重なった。全部つなぐと矛盾するものだけ、別人として分けてある。
                    </p>
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff' }}>
                        {COLLISIONS.map((c, i) => (
                            <div key={i} style={{ display: 'flex', gap: 16, padding: '13px 16px', borderTop: i ? `1px solid ${LINE}` : 'none' }}>
                                <div style={{ fontSize: 12.5, fontWeight: 900, minWidth: 118, flexShrink: 0 }}>{c.name}</div>
                                <div style={{ fontSize: 12.5, lineHeight: 1.85, color: '#44403C' }}>{c.ruling}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 26, fontSize: 12.5, color: MUTED, lineHeight: 1.9 }}>
                        {WORLD.bar}
                        <div style={{ marginTop: 8 }}>
                            <Link href="/english/requiem" style={{ color: GREEN, fontWeight: 800, textDecoration: 'none' }}>レクイエム本編へ</Link>
                            <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
                            <Link href="/english/newspaper" style={{ color: GREEN, fontWeight: 800, textDecoration: 'none' }}>この町の新聞へ</Link>
                            <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
                            <Link href="/english/lifeline" style={{ color: GREEN, fontWeight: 800, textDecoration: 'none' }}>この{PEOPLE.length}人が通る{STATIONS.length}の窓口へ</Link>
                        </div>
                    </div>
                </section>
            </div>
            <WorldMapButton />
        </div>
    );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: MUTED, fontWeight: 800 }}>{kicker}</div>
            <h2 style={{ fontSize: 25, fontWeight: 900, letterSpacing: 1, margin: '5px 0 0' }}>{title}</h2>
        </div>
    );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            style={{
                fontSize: 11.5, fontWeight: 800, padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                border: `1px solid ${active ? INK : LINE}`, backgroundColor: active ? INK : '#fff', color: active ? '#fff' : MUTED,
            }}
        >
            {children}
        </button>
    );
}
