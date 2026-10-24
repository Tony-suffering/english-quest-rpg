/**
 * Silent Bartender -- moral ledger.
 *
 * Not achievements. Observations.
 * A quiet rumination on the shape of a player's nights over time.
 * Each entry is a sentence the shop might mutter if it could talk --
 * spotted patterns in how the player poured, refused, waited, missed.
 *
 * Active items are returned by collectLedger(stats). Ordering is stable
 * (by id), not ranked by significance. Presentation is the caller's job.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';
import type { Mood } from './types';

export interface LedgerItem {
    id: string;
    /** Short Japanese title -- the observation, condensed. */
    title: string;
    /** 2-3 line Japanese body. Quiet tone. No praise, no scold. */
    body: string;
    /** Pure predicate over PlayerStats. No Date, no storage, no I/O. */
    check: (stats: PlayerStats) => boolean;
}

// ═══════════════════════════════════════════════════════════
// Small helpers (local, not exported)
// ═══════════════════════════════════════════════════════════

function successOf(stats: PlayerStats, mood: Mood): number {
    return stats.moodStats[mood]?.success ?? 0;
}

function failedOf(stats: PlayerStats, mood: Mood): number {
    return stats.moodStats[mood]?.failed ?? 0;
}

function totalOf(stats: PlayerStats, mood: Mood): number {
    return successOf(stats, mood) + failedOf(stats, mood);
}

/** Rough mean success rate across all served moods. Returns 0 if no data. */
function meanMoodSuccessRate(stats: PlayerStats): number {
    const recs = Object.values(stats.moodStats).filter((r): r is NonNullable<typeof r> => !!r);
    if (recs.length === 0) return 0;
    let num = 0;
    let den = 0;
    for (const r of recs) {
        num += r.success;
        den += r.success + r.failed;
    }
    return den === 0 ? 0 : num / den;
}

function successRate(stats: PlayerStats, mood: Mood): number | null {
    const t = totalOf(stats, mood);
    if (t === 0) return null;
    return successOf(stats, mood) / t;
}

// ═══════════════════════════════════════════════════════════
// The ledger
// ═══════════════════════════════════════════════════════════

export const MORAL_LEDGER: LedgerItem[] = [
    {
        id: 'ledger-many-nights-no-pour',
        title: '多くの夜、酒を注がなかった',
        body:
            '水、茶、素の一杯。正しかった選択の中に、酔わせないものが多い。\n' +
            'カウンターの色が、少し薄い。',
        // Lots of successful non-alcohol / water-adjacent picks: we approximate via
        // high success rate on 'first-time' + 'dog' + 'existential' where water/plain
        // answers dominate. Requires some baseline to avoid false positives.
        check: (s) => {
            const quietServes = successOf(s, 'first-time') + successOf(s, 'dog') + successOf(s, 'existential');
            return s.lifetimeArigatou >= 30 && quietServes / Math.max(s.lifetimeArigatou, 1) >= 0.25;
        },
    },
    {
        id: 'ledger-healed-the-heartbroken',
        title: '決まって失恋者を癒した',
        body:
            '泣きにきた客に、あなたはよく応えた。平均よりも、はっきりと。\n' +
            'その理由は、あなただけが知っている。',
        check: (s) => {
            const r = successRate(s, 'heartbroken');
            if (r === null) return false;
            const mean = meanMoodSuccessRate(s);
            return totalOf(s, 'heartbroken') >= 5 && r - mean >= 0.1;
        },
    },
    {
        id: 'ledger-deeper-night-steadier-hand',
        title: '夜が深まるほど、正確だった',
        body:
            '静かな時間に、あなたの手は落ち着いていた。\n' +
            '最後の客ほど、間違わなかった。',
        // Inferred: perfectNights implies late-phase closings went clean; longest chain high.
        check: (s) => s.perfectNights >= 2 && s.longestCorrectChainEver >= 4,
    },
    {
        id: 'ledger-nights-alone',
        title: '誰にも会えない夜を何度か過ごした',
        body:
            '声が出て、店は閉じた。誰とも目が合わなかった夜。\n' +
            'それも、あなたの営業の一部になった。',
        check: (s) => s.lifetimeBusts >= 3,
    },
    {
        id: 'ledger-loved-by-dogs',
        title: '犬に愛された',
        body:
            '言葉のいらない客ほど、あなたを選んだ。\n' +
            '犬は、嘘をつけない方の生き物だ。',
        check: (s) => {
            const r = successRate(s, 'dog');
            return totalOf(s, 'dog') >= 3 && r !== null && r >= 0.75;
        },
    },
    {
        id: 'ledger-learned-to-be-quiet',
        title: '黙ることを覚えた',
        body:
            '50夜、声が出なかった。それは偶然ではない。\n' +
            '黙るという技術を、あなたは獲得した。',
        check: (s) => s.longestNoBustStreak >= 50,
    },
    {
        id: 'ledger-same-guest-again',
        title: '同じ客を何度も見送った',
        body:
            '見知った顔が、同じ席についた。何度も、何度も。\n' +
            '常連とは、偶然が三度続いた人のことをいう。',
        // Approximated: seenCustomerIds has fewer unique entries than successes imply,
        // which only happens if the same customer appears across nights.
        check: (s) => s.lifetimeArigatou >= 40 && s.seenCustomerIds.length > 0 &&
            s.lifetimeArigatou / s.seenCustomerIds.length >= 2.5,
    },
    {
        id: 'ledger-never-addressed-regular',
        title: '一度も常連に声をかけなかった',
        body:
            '毎夜座る客にさえ、あなたは名を呼ばなかった。\n' +
            'それが、この店の静けさの正体である。',
        check: (s) => {
            const reg = totalOf(s, 'regular');
            const r = successRate(s, 'regular');
            return reg >= 10 && r !== null && r >= 0.85 && s.lifetimeBusts === 0;
        },
    },
    {
        id: 'ledger-summer-worked-hard',
        title: '夏の夜、よく働いた',
        body:
            '汗ばんだ夜に、あなたは最も多くを注いだ。\n' +
            '理由はわからない。記録だけが、そう言っている。',
        // We do not track season directly; approximate via seenCustomerIds containing
        // 'season-summer' OR a heavy celebrating/late-night tilt (festival-like).
        check: (s) => {
            const summerSeen = s.seenCustomerIds.some((id) => id.includes('season-summer'));
            const festive = successOf(s, 'celebrating') + successOf(s, 'late-night');
            return summerSeen || (festive >= 15 && s.lifetimeArigatou >= 60);
        },
    },
    {
        id: 'ledger-master-approved',
        title: 'マスターに認められた',
        body:
            '三度、完璧な夜があった。前掛けの裏で、彼は頷いていたかもしれない。\n' +
            'もちろん、口には出さない。',
        check: (s) => s.perfectNights >= 3,
    },
    {
        id: 'ledger-never-faced-self',
        title: '自分の顔を見せなかった',
        body:
            '鏡の客も、かつての自分も、あなたの前には現れなかった。\n' +
            '避けたのか、まだ届いていないのか、どちらかだ。',
        check: (s) => {
            const seenMirror = s.seenCustomerIds.some(
                (id) => id.includes('mirror') || id.includes('former-self'),
            );
            return s.totalNights >= 20 && !seenMirror;
        },
    },
    {
        id: 'ledger-served-the-unseen',
        title: '見えない客を何度も送った',
        body:
            '幽霊も、誰にも見えない席も、あなたは同じ丁寧さで注いだ。\n' +
            'この店は、そういう客にとっての、数少ない灯りだ。',
        check: (s) => {
            const ghosts = successOf(s, 'ghost');
            const alien = successOf(s, 'alien');
            const existential = successOf(s, 'existential');
            // "nobody-visible" is read as ghost + alien + existential together,
            // since PlayerStats has no explicit bucket for unseen-type customers.
            return ghosts + alien + existential >= 3;
        },
    },
];

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Return the ledger items whose observation currently applies to the player.
 * Order is the definition order above; stable and deterministic.
 * Caller is responsible for deduping against prior presentations if desired.
 */
export function collectLedger(stats: PlayerStats): LedgerItem[] {
    return MORAL_LEDGER.filter((item) => {
        try {
            return item.check(stats);
        } catch {
            return false;
        }
    });
}
