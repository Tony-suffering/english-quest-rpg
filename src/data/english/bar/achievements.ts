/**
 * Silent Bartender -- Achievement definitions.
 *
 * Each achievement is a pure function of PlayerStats. The game loop runs
 * `ACHIEVEMENTS.filter(a => a.check(stats))` after each night and diff's
 * against `stats.unlockedAchievementIds` to find newly unlocked ones.
 *
 * Tiers:
 *   bronze  -- entry-level, most players will hit these
 *   silver  -- requires intent
 *   gold    -- skill or persistence gate
 *   hidden  -- ominous description until unlocked
 */

import type { PlayerStats } from '@/lib/english/bar/storage';
import type { Mood } from './types';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'hidden';

export interface Achievement {
    id: string;
    /** Japanese title, no emoji. */
    title: string;
    /** Japanese description shown after unlock. */
    description: string;
    /** Optional ominous pre-unlock description (hidden tier only). */
    lockedDescription?: string;
    tier: AchievementTier;
    check: (stats: PlayerStats) => boolean;
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

function seen(stats: PlayerStats, ids: string[]): boolean {
    const s = new Set(stats.seenCustomerIds);
    return ids.every(id => s.has(id));
}

function moodsServed(stats: PlayerStats, moods: Mood[]): boolean {
    return moods.every(m => {
        const r = stats.moodStats[m];
        return r && r.success + r.failed > 0;
    });
}

function distinctMoodsServed(stats: PlayerStats): number {
    return Object.keys(stats.moodStats).length;
}

// ═══════════════════════════════════════════════════════════
// Achievement catalog (17 total)
// ═══════════════════════════════════════════════════════════

export const ACHIEVEMENTS: Achievement[] = [
    // ─── Bronze: entry tier ────────────────────────────────
    {
        id: 'first-night',
        title: '初めての夜',
        description: '一晩、カウンターの中に立った。',
        tier: 'bronze',
        check: s => s.totalNights >= 1,
    },
    {
        id: 'first-arigatou',
        title: '最初の「ありがとう」',
        description: '初めて客を満足させた。権藤も少し安心している。',
        tier: 'bronze',
        check: s => s.lifetimeArigatou >= 1,
    },
    {
        id: 'silent-opener',
        title: '無言の開店',
        description: 'バストされずに一晩を完走した。口は重いほうがいい。',
        tier: 'bronze',
        check: s => s.completedNights >= 1,
    },
    {
        id: 'three-moods',
        title: '客を見る眼',
        description: '3種類の違う気分の客を相手にした。',
        tier: 'bronze',
        check: s => distinctMoodsServed(s) >= 3,
    },

    // ─── Silver: requires a little intent ──────────────────
    {
        id: 'ten-nights',
        title: '常連ではなく店主',
        description: '通算10晩カウンターに立った。',
        tier: 'silver',
        check: s => s.totalNights >= 10,
    },
    {
        id: 'perfect-night',
        title: '完全営業',
        description: '一晩、5人全員を満足させた。',
        tier: 'silver',
        check: s => s.perfectNights >= 1,
    },
    {
        id: 'no-bust-streak-5',
        title: '沈黙の常習犯',
        description: '5晩連続でバストせずに完走した。',
        tier: 'silver',
        check: s => s.longestNoBustStreak >= 5,
    },
    {
        id: 'save-the-heartbroken',
        title: '失恋カウンセラー',
        description: '失恋した客に正解カードを差し出した。言葉はいらない。',
        tier: 'silver',
        check: s => (s.moodStats.heartbroken?.success ?? 0) >= 1,
    },
    {
        id: 'served-the-dog',
        title: '犬にも一杯',
        description: '犬の客を満足させた。権藤の教えは種を越える。',
        tier: 'silver',
        check: s => (s.moodStats.dog?.success ?? 0) >= 1,
    },
    {
        id: 'chain-of-six',
        title: '無言の連打',
        description: '一晩のうちに6連続で正解カードを出した。',
        tier: 'silver',
        check: s => s.longestCorrectChainEver >= 6,
    },

    // ─── Gold: skill / persistence ─────────────────────────
    {
        id: 'hundred-arigatou',
        title: '百人のありがとう',
        description: '通算100人の客を満足させた。これで一人前だ。',
        tier: 'gold',
        check: s => s.lifetimeArigatou >= 100,
    },
    {
        id: 'mood-master',
        title: '十の空気を読む者',
        description: '10種類以上の気分の客を捌いた。',
        tier: 'gold',
        check: s => distinctMoodsServed(s) >= 10,
    },
    {
        id: 'thirty-nights',
        title: '三十夜の代打',
        description: '通算30晩立ち続けた。権藤はもう戻ってこない気がする。',
        tier: 'gold',
        check: s => s.totalNights >= 30,
    },
    {
        id: 'no-bust-streak-15',
        title: '石のように黙る',
        description: '15晩連続でバストせずに完走した。',
        tier: 'gold',
        check: s => s.longestNoBustStreak >= 15,
    },

    // ─── Hidden: ominous / easter-egg ──────────────────────
    {
        id: 'three-busts',
        title: '三度の沈黙',
        tier: 'hidden',
        description: '3晩続けてバストした。権藤の怒号が耳から離れない。だが、まだ店は開いている。',
        lockedDescription: '...三度、声が出た時。',
        check: s => s.consecutiveBusts >= 3,
    },
    {
        id: 'alien-and-ghost',
        title: 'この世ならざる夜',
        tier: 'hidden',
        description: '一晩で宇宙人と幽霊の両方に酒を出した。どっちが危険かはまだ分からない。',
        lockedDescription: '...人ではない客が、二人重なった夜。',
        check: s => {
            const last = s.lastNight;
            if (!last) return false;
            const m = last.moodOutcomes;
            const alienSeen = (m.alien?.success ?? 0) + (m.alien?.failed ?? 0) > 0;
            const ghostSeen = (m.ghost?.success ?? 0) + (m.ghost?.failed ?? 0) > 0;
            return alienSeen && ghostSeen;
        },
    },
    {
        id: 'edo-whisperer',
        title: '江戸から来た客',
        tier: 'hidden',
        description: '江戸から迷い込んだ客を無事に帰した。歴史は静かに混じり合う。',
        lockedDescription: '...時代をまたいで来る客が、いるらしい。',
        check: s => (s.moodStats.edo?.success ?? 0) >= 1,
    },
    {
        id: 'dog-whisperer',
        title: '犬にも言葉がある',
        tier: 'silver',
        description: '言葉を持たない客を2回以上満足させた。種を超える無言の会話。',
        check: s => (s.moodStats.dog?.success ?? 0) >= 2,
    },
    {
        id: 'drunk-tamer',
        title: '酔客の番人',
        tier: 'silver',
        description: '暴れそうな酔っ払いを5人、静かに帰した。',
        check: s => (s.moodStats.drunk?.success ?? 0) >= 5,
    },
    {
        id: 'homesick-mender',
        title: '故郷の代わり',
        tier: 'silver',
        description: 'ホームシックの客に温かさを5回届けた。帰れない夜に、少し帰れた。',
        check: s => (s.moodStats.homesick?.success ?? 0) >= 5,
    },
    {
        id: 'heartbroken-sanctuary',
        title: '失恋者の退避所',
        tier: 'silver',
        description: '失恋したばかりの客を5人受け止めた。何も言わないのが一番効いた。',
        check: s => (s.moodStats.heartbroken?.success ?? 0) >= 5,
    },
    {
        id: 'fifty-nights',
        title: '五十夜',
        tier: 'gold',
        description: '50夜この店に立った。もう代打ではない。',
        check: s => s.totalNights >= 50,
    },
    {
        id: 'hundred-nights',
        title: '百夜',
        tier: 'gold',
        description: '100夜。権藤が戻ったかどうかは、もう問題じゃない。',
        check: s => s.totalNights >= 100,
    },
    {
        id: 'year-long',
        title: '一年',
        tier: 'gold',
        description: '365夜。お前はもう、この店の一部だ。',
        check: s => s.totalNights >= 365,
    },
    {
        id: 'five-perfect-nights',
        title: '五夜連続の完璧',
        tier: 'gold',
        description: '5回、完璧な夜を終えた。',
        check: s => s.perfectNights >= 5,
    },
    {
        id: 'twenty-perfect-nights',
        title: '二十夜の完璧',
        tier: 'gold',
        description: '20回、一人も失わない夜を終えた。神業。',
        check: s => s.perfectNights >= 20,
    },
    {
        id: 'silent-all-the-way',
        title: '一度も声を出さない',
        tier: 'gold',
        description: '50夜、一度も声を出さなかった。',
        check: s => s.totalNights >= 50 && s.lifetimeBusts === 0,
    },
    {
        id: 'nightmare-survived',
        title: '悪夢の夜を越えた',
        tier: 'silver',
        description: '悪夢モードで1夜を完走した。',
        check: s => s.totalNights >= 1 && (s.lifetimeArigatou >= 10), // approx gate
    },
    {
        id: 'existential-listener',
        title: '実存の話を聞いた',
        tier: 'silver',
        description: '存在について悩む客を3人、静かに受け止めた。',
        check: s => (s.moodStats.existential?.success ?? 0) >= 3,
    },
    {
        id: 'regular-friend',
        title: '常連の友',
        tier: 'silver',
        description: '常連気質の客を10人、静かに送り出した。',
        check: s => (s.moodStats.regular?.success ?? 0) >= 10,
    },
    {
        id: 'thousand-thanks',
        title: '千のありがとう',
        tier: 'gold',
        description: '1000回の「ありがとう」を聞いた。',
        check: s => s.lifetimeArigatou >= 1000,
    },
    {
        id: 'first-hundred-nights',
        title: '百夜の壁を越えた',
        tier: 'gold',
        description: '100夜を完走した。もうこの店の景色の一部だ。',
        check: s => s.totalNights >= 100,
    },
    {
        id: 'night-of-the-three-silences',
        title: '三重の沈黙',
        tier: 'hidden',
        description: 'ゴースト、エイリアン、犬を一夜で捌いた。言葉を使わない客ばかりの夜を、言葉なしで越えた。',
        lockedDescription: '...言葉を持たない客が、同じ夜に三人並ぶ時があるらしい。',
        check: s => {
            const g = (s.moodStats.ghost?.success ?? 0) > 0;
            const a = (s.moodStats.alien?.success ?? 0) > 0;
            const d = (s.moodStats.dog?.success ?? 0) > 0;
            return g && a && d;
        },
    },
    {
        id: 'veterans-table',
        title: '老齢の客を見送った',
        tier: 'silver',
        description: '年配の常連を10人、静かに満足させた。経験が経験を呼ぶ。',
        check: s => (s.moodStats.regular?.success ?? 0) >= 20,
    },
    {
        id: 'the-return',
        title: '復帰の夜',
        tier: 'hidden',
        description: 'バスト後、次の夜に完璧な成績で復帰した。\n権藤は何も言わなかったが、前掛けの汚れを少しだけ直した。',
        lockedDescription: '...落ちた後に、一度で取り戻せる者だけが見る場所。',
        check: s => (s.lifetimeBusts ?? 0) >= 1 && s.perfectNights >= 1,
    },
    {
        id: 'closing-specialist',
        title: '夜の匠',
        tier: 'gold',
        description: '50夜以上、closingフェーズの客をすべて捌いた。夜の奥で仕事ができる。',
        check: s => s.totalNights >= 50 && s.perfectNights >= 10,
    },
    {
        id: 'cosmo-servant',
        title: '宇宙の給仕人',
        tier: 'silver',
        description: '宇宙人の客を3人満足させた。「水」という概念を共有する難しさを知っている。',
        check: s => (s.moodStats.alien?.success ?? 0) >= 3,
    },
    {
        id: 'edo-scholar',
        title: '時代をまたぐ人',
        tier: 'silver',
        description: '時代外の客を3人静かに送り出した。熱燗のぬる燗の違いまで分かる。',
        check: s => (s.moodStats.edo?.success ?? 0) >= 3,
    },
    {
        id: 'total-sober',
        title: '完全なる沈黙',
        tier: 'gold',
        description: '100夜、一度も声を出さなかった。修行僧並みの耐久。',
        check: s => s.totalNights >= 100 && s.lifetimeBusts === 0,
    },
    {
        id: 'the-student',
        title: '師匠の跡',
        tier: 'hidden',
        description: '権藤の断片を全て集めた。師匠が次に渡すのは、たぶんお前だ。',
        lockedDescription: '...権藤のすべての話を聞いた者にだけ見える。',
        check: s => s.totalNights >= 300,
    },
];

/**
 * Evaluate the catalog against current stats and return ids that satisfy
 * their check but are NOT yet in stats.unlockedAchievementIds.
 */
export function findNewlyUnlocked(stats: PlayerStats): Achievement[] {
    const already = new Set(stats.unlockedAchievementIds);
    return ACHIEVEMENTS.filter(a => !already.has(a.id) && a.check(stats));
}

/**
 * Heuristic: suggest the "closest" unclaimed achievement. Uses a simple
 * distance metric weighted by tier so bronze suggestions surface first.
 */
export function suggestNextAchievement(stats: PlayerStats): Achievement | null {
    const already = new Set(stats.unlockedAchievementIds);
    const pending = ACHIEVEMENTS.filter(a => !already.has(a.id) && a.tier !== 'hidden');
    if (pending.length === 0) return null;
    const tierWeight: Record<AchievementTier, number> = { bronze: 1, silver: 3, gold: 6, hidden: 99 };
    const scored = pending.map(a => ({
        a,
        score: scoreProgress(stats, a) * tierWeight[a.tier],
    }));
    scored.sort((x, y) => x.score - y.score);
    return scored[0]?.a ?? null;
}

/**
 * Rough "distance to unlock" score. Lower = closer. Specific thresholds are
 * measured against known count-based achievements; otherwise we fall back to
 * a generic large value so threshold-based goals get surfaced first.
 */
function scoreProgress(stats: PlayerStats, a: Achievement): number {
    switch (a.id) {
        case 'first-night': return Math.max(0, 1 - stats.totalNights);
        case 'first-arigatou': return Math.max(0, 1 - stats.lifetimeArigatou);
        case 'silent-opener': return Math.max(0, 1 - stats.completedNights);
        case 'three-moods': return Math.max(0, 3 - distinctMoodsServed(stats));
        case 'ten-nights': return Math.max(0, 10 - stats.totalNights);
        case 'perfect-night': return stats.perfectNights >= 1 ? 0 : 5;
        case 'no-bust-streak-5': return Math.max(0, 5 - stats.longestNoBustStreak);
        case 'chain-of-six': return Math.max(0, 6 - stats.longestCorrectChainEver);
        case 'hundred-arigatou': return Math.max(0, 100 - stats.lifetimeArigatou);
        case 'mood-master': return Math.max(0, 10 - distinctMoodsServed(stats));
        case 'thirty-nights': return Math.max(0, 30 - stats.totalNights);
        case 'no-bust-streak-15': return Math.max(0, 15 - stats.longestNoBustStreak);
        default: return 50;
    }
}

// re-export helper for test/UX consumers
export { seen, moodsServed, distinctMoodsServed };
