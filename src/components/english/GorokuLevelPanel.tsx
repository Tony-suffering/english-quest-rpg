'use client';

/**
 * 俺語録の平準化パネル。
 * 保存済みのログを、10話型と語尾の癖で数えて出す。
 * 目的は「どの型が薄いか」を見せて、次の会話で何を拾うかを決めること。
 */

import { useMemo } from 'react';
import { levelGoroku, type LevelRow } from '@/data/english/goroku-level';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

export default function GorokuLevelPanel({ rows, isMobile }: { rows: LevelRow[]; isMobile: boolean }) {
    const r = useMemo(() => levelGoroku(rows), [rows]);
    const maxP = Math.max(1, ...r.byPattern.map(p => p.count));
    const maxE = Math.max(1, ...r.byEnding.map(e => e.count));

    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: isMobile ? '14px' : '18px 20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: FAINT }}>LEVELING</div>
            <div style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 900, color: INK, margin: '4px 0 6px' }}>
                平準化 ー 溜まった言葉を型と語尾で数える
            </div>
            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginBottom: '12px' }}>
                保存 <strong style={{ color: INK }}>{r.total}本</strong> ／ 会話 {r.sessions}回。
                薄い型が次の会話で耳を立てる場所。濃い語尾が本人の口の癖。
            </div>

            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {/* 10話型 */}
                <div>
                    <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '6px' }}>10話型ごとの本数</div>
                    {r.byPattern.map(p => {
                        const thin = r.thin.some(t => t.n === p.n);
                        return (
                            <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div style={{ width: '22px', fontSize: '10px', fontWeight: 900, color: FAINT, textAlign: 'right' }}>#{p.n}</div>
                                <div style={{ width: isMobile ? '110px' : '130px', fontSize: '11.5px', fontWeight: 700, color: thin ? '#B91C1C' : INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.ja}</div>
                                <div style={{ flex: 1, height: '8px', background: PAPER, borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.round(100 * p.count / maxP)}%`, height: '100%', background: thin ? '#FCA5A5' : GOLD }} />
                                </div>
                                <div style={{ width: '26px', fontSize: '11px', fontWeight: 800, color: SUB, textAlign: 'right' }}>{p.count}</div>
                            </div>
                        );
                    })}
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '7px 10px' }}>
                        薄い型: {r.thin.map(t => `#${t.n} ${t.ja}（${t.count}）`).join(' / ')}
                    </div>
                </div>

                {/* 語尾 */}
                <div>
                    <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGREEN, marginBottom: '6px' }}>語尾の癖</div>
                    {r.byEnding.filter(e => e.count > 0).sort((a, b) => b.count - a.count).map(e => (
                        <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <div style={{ width: isMobile ? '120px' : '140px', fontSize: '11.5px', fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.label}</div>
                            <div style={{ flex: 1, height: '8px', background: PAPER, borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${Math.round(100 * e.count / maxE)}%`, height: '100%', background: GREEN }} />
                            </div>
                            <div style={{ width: '26px', fontSize: '11px', fontWeight: 800, color: SUB, textAlign: 'right' }}>{e.count}</div>
                        </div>
                    ))}
                    {r.habit.length > 0 && (
                        <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '8px', background: '#ECFDF5', border: `1px solid ${GREEN}44`, borderRadius: '8px', padding: '7px 10px' }}>
                            口の癖: {r.habit.map(h => `${h.label} ${h.share}%`).join(' / ')}
                        </div>
                    )}
                </div>
            </div>

            {r.byMonth.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {r.byMonth.map(m => (
                        <span key={m.month} style={{ fontSize: '10.5px', fontWeight: 700, color: SUB, background: PAPER, border: `1px solid ${LINE}`, borderRadius: '99px', padding: '3px 9px' }}>
                            {m.month} <span style={{ color: INK }}>{m.count}</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
