'use client';

/**
 * Silent Bartender -- Customer Atlas.
 *
 * A registry of every customer the player has encountered, with
 * their mood, whether they've been served, and whether they've
 * returned. Unlockable content surfaced by gameplay: only shows
 * ids that are in stats.seenCustomerIds.
 */

import { CUSTOMERS } from '@/data/english/bar/customers';
import { BOSS_CUSTOMERS } from '@/data/english/bar/boss-customers';
import { getCustomerOutcome } from '@/lib/english/bar/memory';
import type { Customer } from '@/data/english/bar/types';
import type { PlayerStats } from '@/lib/english/bar/storage';

const ALL: Customer[] = [...CUSTOMERS, ...BOSS_CUSTOMERS];

const C = {
    bg: '#FAF6EC',
    card: '#FFFFFF',
    border: '#E5DCC0',
    amber: '#B8860B',
    amberDim: '#8B6508',
    amberBg: '#FFF5D1',
    green: '#047857',
    red: '#B91C1C',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#A8A29E',
};

const OUTCOME_COLORS: Record<string, { bg: string; fg: string; label: string }> = {
    'served': { bg: '#ECFDF5', fg: C.green, label: '●' },
    'failed': { bg: '#FEF2F2', fg: C.red, label: '×' },
    'timeout': { bg: '#FFF7ED', fg: '#C2410C', label: '…' },
    'never-seen': { bg: C.card, fg: C.textFaint, label: '—' },
};

interface Props {
    stats: PlayerStats;
}

export default function CustomerAtlas({ stats }: Props) {
    const seenSet = new Set(stats.seenCustomerIds);
    const byPhase: Record<string, Customer[]> = { early: [], peak: [], late: [], closing: [] };
    for (const c of ALL) {
        if (!seenSet.has(c.id)) continue;
        const p = c.phase ?? 'peak';
        (byPhase[p] ??= []).push(c);
    }

    if (seenSet.size === 0) {
        return (
            <div style={{ padding: 24, textAlign: 'center', color: C.textDim }}>
                まだ誰にも会っていない。暖簾をくぐると、ここに記録が残る。
            </div>
        );
    }

    return (
        <div style={{ padding: '0 8px' }}>
            <div style={{
                fontSize: 10, letterSpacing: 3, fontWeight: 800,
                color: C.amberDim, marginBottom: 10, textAlign: 'center',
            }}>
                CUSTOMER ATLAS -- {seenSet.size} / {ALL.length}
            </div>

            {(['early', 'peak', 'late', 'closing'] as const).map(p => {
                const list = byPhase[p] ?? [];
                if (list.length === 0) return null;
                return (
                    <div key={p} style={{ marginBottom: 20 }}>
                        <div style={{
                            fontSize: 9, letterSpacing: 2, fontWeight: 800,
                            color: C.amber, marginBottom: 6,
                        }}>
                            {p.toUpperCase()}
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: 6,
                        }}>
                            {list.map(c => {
                                const outcome = getCustomerOutcome(c.id);
                                const meta = OUTCOME_COLORS[outcome] ?? OUTCOME_COLORS['never-seen'];
                                return (
                                    <div key={c.id} style={{
                                        padding: '8px 10px', borderRadius: 8,
                                        background: meta.bg, border: `1px solid ${C.border}`,
                                        fontSize: 11, color: C.textDim,
                                        display: 'flex', alignItems: 'center', gap: 6,
                                    }} title={c.tag}>
                                        <span style={{ color: meta.fg, fontWeight: 800, width: 14, textAlign: 'center' }}>
                                            {meta.label}
                                        </span>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, color: C.text,
                                            letterSpacing: 1, whiteSpace: 'nowrap',
                                            overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}>
                                            {c.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div style={{
                fontSize: 10, color: C.textFaint, textAlign: 'center',
                marginTop: 12,
            }}>
                ● 満足 &nbsp; × 撃沈 &nbsp; … 時間切れ &nbsp; — 未接触
            </div>
        </div>
    );
}
