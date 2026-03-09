'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    playGachaSound, playFeverEntrySound, playFeverExitSound,
    playCardRankSound, playRankUpSound, playFeverChainHit,
    playLevelSound, playSpinTick, playReelStop, playReachAlert, playSpinStart,
} from '@/lib/training-sounds';
import { MiniRunner } from '../training/page';
import PuzzleBoard from '@/components/english/PuzzleBoard';
import '../training/training-animations.css';

// ── Tier system (mirrors d1.ts + training/page.tsx) ──
type GachaTier = 'MISS' | 'BONUS' | 'GREAT' | 'SUPER' | 'MEGA' | 'LEGENDARY' | 'MYTHIC' | 'SHINY' | 'PHANTOM';

const ALL_TIERS: GachaTier[] = ['PHANTOM', 'SHINY', 'MYTHIC', 'LEGENDARY', 'MEGA', 'SUPER', 'GREAT', 'BONUS', 'MISS'];

const TIER_CONFIG: Record<GachaTier, { color: string; particles: number; duration: number; fontSize: number; sparks: number; odds: string }> = {
    PHANTOM:   { color: '#FFFFFF', particles: 150, duration: 15000, fontSize: 160, sparks: 2000, odds: '1/8192' },
    SHINY:     { color: '#06B6D4', particles: 120, duration: 13000, fontSize: 150, sparks: 500,  odds: '1/4096' },
    MYTHIC:    { color: '#EC4899', particles: 80,  duration: 10000, fontSize: 140, sparks: 100,  odds: '1/400' },
    LEGENDARY: { color: '#D4AF37', particles: 60,  duration: 8500,  fontSize: 130, sparks: 30,   odds: '0.5%' },
    MEGA:      { color: '#8B5CF6', particles: 40,  duration: 6000,  fontSize: 100, sparks: 10,   odds: '2%' },
    SUPER:     { color: '#EF4444', particles: 24,  duration: 4200,  fontSize: 80,  sparks: 5,    odds: '5%' },
    GREAT:     { color: '#F59E0B', particles: 16,  duration: 3200,  fontSize: 64,  sparks: 3,    odds: '10%' },
    BONUS:     { color: '#D4AF37', particles: 8,   duration: 2200,  fontSize: 48,  sparks: 2,    odds: '22%' },
    MISS:      { color: '#78716C', particles: 0,   duration: 1500,  fontSize: 28,  sparks: 0,    odds: '60%' },
};

const TIER_JA: Record<string, string> = {
    PHANTOM: '幻', SHINY: '色違い', MYTHIC: '神話', LEGENDARY: '伝説',
    MEGA: '極', SUPER: '煌', GREAT: '輝', BONUS: '光', MISS: '凡',
};

// ── Chain system ──
type ChainMode = 'normal' | 'kakuhen' | 'gekiatsu' | 'god';

const CHAIN_MODE_CONFIG: Record<ChainMode, { label: string; labelJa: string; color: string; gradient: string; spMultiplier: string; trigger: string }> = {
    normal:   { label: 'NORMAL',   labelJa: '通常', color: '#78716C', gradient: 'linear-gradient(135deg, #78716C, #A8A29E)', spMultiplier: 'x1',   trigger: '0-2連' },
    kakuhen:  { label: 'KAKUHEN',  labelJa: '確変', color: '#D4AF37', gradient: 'linear-gradient(135deg, #D4AF37, #F59E0B)', spMultiplier: 'x1.5', trigger: '3-4連' },
    gekiatsu: { label: 'GEKIATSU', labelJa: '激熱', color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626, #F97316)', spMultiplier: 'x2',   trigger: '5-9連' },
    god:      { label: 'GOD MODE', labelJa: '神',   color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #EC4899, #D4AF37)', spMultiplier: 'x3', trigger: '10+連' },
};

// ── Chain probability tables (from d1.ts) ──
type GachaEntry = { tier: GachaTier; threshold: number; sparks: number };

const CHAIN_TABLES: Record<ChainMode, GachaEntry[]> = {
    normal: [
        { tier: 'PHANTOM', threshold: 0.00012, sparks: 2000 }, { tier: 'SHINY', threshold: 0.00036, sparks: 500 },
        { tier: 'MYTHIC', threshold: 0.00286, sparks: 100 }, { tier: 'LEGENDARY', threshold: 0.00786, sparks: 30 },
        { tier: 'MEGA', threshold: 0.02786, sparks: 10 }, { tier: 'SUPER', threshold: 0.07786, sparks: 5 },
        { tier: 'GREAT', threshold: 0.17786, sparks: 3 }, { tier: 'BONUS', threshold: 0.39786, sparks: 2 },
        { tier: 'MISS', threshold: 1.0, sparks: 0 },
    ],
    kakuhen: [
        { tier: 'PHANTOM', threshold: 0.00025, sparks: 2000 }, { tier: 'SHINY', threshold: 0.00075, sparks: 500 },
        { tier: 'MYTHIC', threshold: 0.01275, sparks: 100 }, { tier: 'LEGENDARY', threshold: 0.03275, sparks: 30 },
        { tier: 'MEGA', threshold: 0.08275, sparks: 10 }, { tier: 'SUPER', threshold: 0.16275, sparks: 5 },
        { tier: 'GREAT', threshold: 0.31275, sparks: 3 }, { tier: 'BONUS', threshold: 0.60000, sparks: 2 },
        { tier: 'MISS', threshold: 1.0, sparks: 0 },
    ],
    gekiatsu: [
        { tier: 'PHANTOM', threshold: 0.0006, sparks: 2000 }, { tier: 'SHINY', threshold: 0.0018, sparks: 500 },
        { tier: 'MYTHIC', threshold: 0.0143, sparks: 100 }, { tier: 'LEGENDARY', threshold: 0.0393, sparks: 30 },
        { tier: 'MEGA', threshold: 0.1093, sparks: 10 }, { tier: 'SUPER', threshold: 0.2093, sparks: 5 },
        { tier: 'GREAT', threshold: 0.4093, sparks: 3 }, { tier: 'BONUS', threshold: 0.7500, sparks: 2 },
        { tier: 'MISS', threshold: 1.0, sparks: 0 },
    ],
    god: [
        { tier: 'PHANTOM', threshold: 0.0012, sparks: 2000 }, { tier: 'SHINY', threshold: 0.0036, sparks: 500 },
        { tier: 'MYTHIC', threshold: 0.0286, sparks: 100 }, { tier: 'LEGENDARY', threshold: 0.0786, sparks: 30 },
        { tier: 'MEGA', threshold: 0.1786, sparks: 10 }, { tier: 'SUPER', threshold: 0.2786, sparks: 5 },
        { tier: 'GREAT', threshold: 0.4786, sparks: 3 }, { tier: 'BONUS', threshold: 0.8500, sparks: 2 },
        { tier: 'MISS', threshold: 1.0, sparks: 0 },
    ],
};

// ── Card Rank system ──
type CardRank = 'NORMAL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'HOLOGRAPHIC' | 'LEGENDARY';

const CARD_RANKS: { rank: CardRank; threshold: number; borderColor: string; glow: string; label: string; labelJa: string }[] = [
    { rank: 'LEGENDARY',   threshold: 250, borderColor: '#D4AF37', glow: '0 0 30px #D4AF3780', label: 'LEGENDARY',   labelJa: '伝説' },
    { rank: 'HOLOGRAPHIC', threshold: 100, borderColor: '#A855F7', glow: '0 0 25px #A855F760', label: 'HOLOGRAPHIC', labelJa: '虹' },
    { rank: 'GOLD',        threshold: 50,  borderColor: '#F6C85F', glow: '0 0 16px #F6C85F50', label: 'GOLD',        labelJa: '金' },
    { rank: 'SILVER',      threshold: 20,  borderColor: '#94A3B8', glow: '0 0 10px #94A3B840', label: 'SILVER',      labelJa: '銀' },
    { rank: 'BRONZE',      threshold: 5,   borderColor: '#CD7F32', glow: '0 0 4px rgba(205,127,50,0.2)', label: 'BRONZE', labelJa: '銅' },
    { rank: 'NORMAL',      threshold: 0,   borderColor: '#E7E5E4', glow: 'none', label: 'NORMAL', labelJa: '普通' },
];

function getCardFrame(rank: CardRank): { border: string; borderImage?: string; backgroundColor: string; background?: string; textColor: string } {
    switch (rank) {
        case 'NORMAL': return { border: '8px solid #E7E5E4', backgroundColor: '#FAFAF9', textColor: '#44403C' };
        case 'BRONZE': return { border: '8px solid transparent', borderImage: 'linear-gradient(135deg, #CD7F32 0%, #E8B87A 30%, #CD7F32 60%, #A0622E 100%) 1', backgroundColor: '#FFFBF5', textColor: '#92400E' };
        case 'SILVER': return { border: '8px solid transparent', borderImage: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 40%, #cbd5e1 60%, #94a3b8 100%) 1', backgroundColor: '#F8FAFB', textColor: '#475569' };
        case 'GOLD': return { border: '8px solid transparent', borderImage: 'linear-gradient(135deg, #D4AF37 0%, #FFF2A8 25%, #F6C85F 50%, #D4AF37 75%, #B8941E 100%) 1', background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFBEB 100%)', backgroundColor: '#FFFEF5', textColor: '#92400E' };
        case 'HOLOGRAPHIC': return { border: '8px solid transparent', borderImage: 'linear-gradient(135deg, #E879F9 0%, #A855F7 25%, #6366F1 50%, #3B82F6 75%, #06B6D4 100%) 1', background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E0E7FF 100%)', backgroundColor: '#FAF5FF', textColor: '#6B21A8' };
        case 'LEGENDARY': return { border: '8px solid transparent', borderImage: 'linear-gradient(135deg, #18181B 0%, #A855F7 40%, #D4AF37 60%, #18181B 100%) 1', background: 'linear-gradient(135deg, #1C1917 0%, #2D2438 50%, #1c1813 100%)', backgroundColor: '#1C1917', textColor: '#D4AF37' };
    }
}

// ── Slot symbols (NEW = pachinko gold frame + kanji) ──
type SlotSymbolId = 'seven-gold' | 'seven-red' | 'bar' | 'bell' | 'grape' | 'cherry' | 'blank' | 'god' | 'rainbow' | 'ghost';

interface SlotSym { id: SlotSymbolId; label: string; color: string; stroke?: string; ultra?: boolean }

const OLD_SLOT_SYMBOLS: SlotSym[] = [
    { id: 'seven-gold', label: '7', color: '#D4AF37' },
    { id: 'seven-red', label: '7', color: '#EF4444' },
    { id: 'bar', label: 'BAR', color: '#F59E0B' },
    { id: 'bell', label: 'BEL', color: '#FBBF24' },
    { id: 'grape', label: 'GRP', color: '#A855F7' },
    { id: 'cherry', label: 'CHR', color: '#F43F5E' },
    { id: 'blank', label: '---', color: '#57534E' },
];

const NEW_SLOT_SYMBOLS: SlotSym[] = [
    { id: 'seven-gold', label: '7', color: '#D4AF37', stroke: '#8B6914' },
    { id: 'seven-red', label: '7', color: '#DC2626', stroke: '#991B1B' },
    { id: 'bar', label: 'BAR', color: '#1C1917', stroke: '#44403C' },
    { id: 'bell', label: '鈴', color: '#D97706', stroke: '#92400E' },
    { id: 'grape', label: '星', color: '#7C3AED', stroke: '#5B21B6' },
    { id: 'cherry', label: '桜', color: '#E11D48', stroke: '#9F1239' },
    { id: 'blank', label: '×', color: '#A8A29E' },
    { id: 'god', label: '神', color: '#EC4899', stroke: '#BE185D', ultra: true },
    { id: 'rainbow', label: '虹', color: '#06B6D4', stroke: '#0E7490', ultra: true },
    { id: 'ghost', label: '幻', color: '#E2E8F0', stroke: '#94A3B8', ultra: true },
];

// For gacha preview (uses old labels for backward compat)
const SLOT_SYMBOLS = OLD_SLOT_SYMBOLS;

const OLD_TIER_TO_COMBO: Record<string, SlotSymbolId[]> = {
    PHANTOM: ['seven-gold', 'seven-gold', 'seven-gold'],
    SHINY: ['seven-gold', 'seven-gold', 'seven-gold'],
    MYTHIC: ['seven-gold', 'seven-gold', 'seven-gold'],
    LEGENDARY: ['seven-gold', 'seven-gold', 'seven-gold'],
    MEGA: ['seven-red', 'seven-red', 'seven-red'],
    SUPER: ['bar', 'bar', 'bar'],
    GREAT: ['bell', 'bell', 'bell'],
    BONUS: ['grape', 'grape', 'grape'],
    MISS: ['cherry', 'bar', 'blank'],
};

const NEW_TIER_TO_COMBO: Record<string, SlotSymbolId[]> = {
    PHANTOM: ['ghost', 'ghost', 'ghost'],
    SHINY: ['rainbow', 'rainbow', 'rainbow'],
    MYTHIC: ['god', 'god', 'god'],
    LEGENDARY: ['seven-gold', 'seven-gold', 'seven-gold'],
    MEGA: ['seven-red', 'seven-red', 'seven-red'],
    SUPER: ['bar', 'bar', 'bar'],
    GREAT: ['bell', 'bell', 'bell'],
    BONUS: ['grape', 'grape', 'grape'],
    MISS: ['cherry', 'bar', 'blank'],
};

const TIER_TO_COMBO = OLD_TIER_TO_COMBO;

// ── Evolution levels ──
const CHAKRA_LEVELS = [
    { level: 0, name: 'EGG', ja: 'タマゴ', color: '#B91C1C', gradFrom: '#F87171', gradTo: '#FECACA' },
    { level: 1, name: 'HATCH', ja: '孵化', color: '#C2410C', gradFrom: '#FB923C', gradTo: '#FED7AA' },
    { level: 2, name: 'ROOKIE', ja: 'ルーキー', color: '#A16207', gradFrom: '#FACC15', gradTo: '#FEF08A' },
    { level: 3, name: 'FIGHTER', ja: 'ファイター', color: '#166534', gradFrom: '#4ADE80', gradTo: '#BBF7D0' },
    { level: 4, name: 'CHAMPION', ja: 'チャンピオン', color: '#1E40AF', gradFrom: '#60A5FA', gradTo: '#BFDBFE' },
    { level: 5, name: 'ELITE', ja: 'エリート', color: '#3730A3', gradFrom: '#818CF8', gradTo: '#C7D2FE' },
    { level: 6, name: 'MASTER', ja: 'マスター', color: '#6B21A8', gradFrom: '#A855F7', gradTo: '#DDD6FE' },
];

// Player Level titles
function getTitleForLevel(lv: number): { title: string; titleEn: string; color: string } {
    if (lv >= 100) return { title: '英会話マスター', titleEn: 'Master', color: '#D4AF37' };
    if (lv >= 90) return { title: 'レジェンド', titleEn: 'Legend', color: '#7C3AED' };
    if (lv >= 71) return { title: 'チャンピオン', titleEn: 'Champion', color: '#DC2626' };
    if (lv >= 51) return { title: 'エリート', titleEn: 'Elite', color: '#EA580C' };
    if (lv >= 31) return { title: 'エキスパート', titleEn: 'Expert', color: '#CA8A04' };
    if (lv >= 16) return { title: 'バトラー', titleEn: 'Battler', color: '#16A34A' };
    if (lv >= 6) return { title: 'コレクター', titleEn: 'Collector', color: '#2563EB' };
    return { title: '新人トレーナー', titleEn: 'Rookie', color: '#78716C' };
}

function xpForLevel(lv: number): number {
    if (lv <= 1) return 0;
    return Math.floor(13 * Math.pow(lv, 2.3));
}

function levelFromXP(totalXP: number): number {
    let lv = 1;
    while (xpForLevel(lv + 1) <= totalXP) lv++;
    return Math.min(lv, 100);
}

// ── GP Milestone thresholds ──
const MILESTONES = [50, 100, 200, 500, 1000, 2000, 5000, 10000];

interface PlayerStats {
    total_xp: number;
    total_touches: number;
    sparks: number;
    pity_counter: number;
    legendary_count: number;
}

// ════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════
export default function DevPage() {
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [todayXP, setTodayXP] = useState(0);
    const [todayCount, setTodayCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Active preview state
    const [activeGachaTier, setActiveGachaTier] = useState<GachaTier | null>(null);
    const [activeSlotCombo, setActiveSlotCombo] = useState<SlotSymbolId[] | null>(null);
    const [activeChainMode, setActiveChainMode] = useState<ChainMode | null>(null);
    const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Simulator state
    const [simChain, setSimChain] = useState<ChainMode>('normal');
    const [simCount, setSimCount] = useState(100);
    const [simStats, setSimStats] = useState<Record<GachaTier, number> | null>(null);

    // PuzzleBoard test state
    const [puzzleDropCard, setPuzzleDropCard] = useState<{
        phraseId: string; english: string; japanese: string;
        element: 'flame' | 'aqua' | 'wind' | 'earth' | 'thunder';
        rank: string; points: number; bstTotal: number; key: number;
    } | null>(null);
    const [puzzleDropCount, setPuzzleDropCount] = useState(0);
    const SAMPLE_PHRASES = [
        { en: 'Hold on a sec', ja: '待ってて' },
        { en: 'That\'s sick', ja: 'やば' },
        { en: 'No way', ja: 'まじで' },
        { en: 'I\'m down', ja: 'いいよ' },
        { en: 'My bad', ja: 'ごめん' },
        { en: 'For real though', ja: 'マジで' },
        { en: 'Let\'s bounce', ja: '行こう' },
        { en: 'I\'m beat', ja: '疲れた' },
        { en: 'Chill out', ja: '落ち着け' },
        { en: 'It hits different', ja: '格別だ' },
        { en: 'Big yikes', ja: 'やばい' },
        { en: 'Lowkey', ja: 'こっそり' },
        { en: 'Bet', ja: 'いいよ' },
        { en: 'Slay', ja: 'カッコいい' },
        { en: 'Nah fam', ja: '違うよ' },
        { en: 'Dead serious', ja: 'ガチで' },
    ];
    const ELEMENTS = ['flame', 'aqua', 'wind', 'earth', 'thunder'] as const;
    const RANKS = ['NORMAL', 'BRONZE', 'SILVER', 'GOLD', 'HOLOGRAPHIC', 'LEGENDARY'] as const;
    const dropTestCard = (overrideRank?: string, overrideElement?: string) => {
        const phrase = SAMPLE_PHRASES[puzzleDropCount % SAMPLE_PHRASES.length];
        const el = (overrideElement || ELEMENTS[Math.floor(Math.random() * 5)]) as typeof ELEMENTS[number];
        const rankRoll = Math.random();
        const rank = overrideRank || (rankRoll < 0.01 ? 'LEGENDARY' : rankRoll < 0.04 ? 'HOLOGRAPHIC' : rankRoll < 0.12 ? 'GOLD' : rankRoll < 0.3 ? 'SILVER' : rankRoll < 0.55 ? 'BRONZE' : 'NORMAL');
        const bst = rank === 'LEGENDARY' ? 600 + Math.floor(Math.random() * 100) : rank === 'HOLOGRAPHIC' ? 500 + Math.floor(Math.random() * 100) : rank === 'GOLD' ? 400 + Math.floor(Math.random() * 100) : 200 + Math.floor(Math.random() * 300);
        const pts = Math.floor(Math.random() * 30) + 5;
        setPuzzleDropCard({
            phraseId: `test-${Date.now()}`, english: phrase.en, japanese: phrase.ja,
            element: el, rank, points: pts, bstTotal: bst, key: Date.now(),
        });
        setPuzzleDropCount(c => c + 1);
    };

    const fetchStats = useCallback(async () => {
        try {
            const [statsRes, todayRes] = await Promise.all([
                fetch('/api/player-stats'),
                fetch(`/api/review-count?date=${new Date().toISOString().split('T')[0]}`),
            ]);
            if (statsRes.ok) setStats(await statsRes.json());
            if (todayRes.ok) {
                const d = await todayRes.json();
                setTodayXP(d.xp || 0);
                setTodayCount(d.count || 0);
            }
        } catch { /* ignore */ }
        setLoading(false);
    }, []);

    useEffect(() => { fetchStats(); }, [fetchStats]);
    useEffect(() => {
        const timer = setInterval(fetchStats, 5000);
        return () => clearInterval(timer);
    }, [fetchStats]);

    // Preview trigger helpers
    const previewGacha = (tier: GachaTier) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setActiveGachaTier(tier);
        setActiveSlotCombo(TIER_TO_COMBO[tier] || null);
        playGachaSound(tier);
        const dur = TIER_CONFIG[tier].duration;
        timerRef.current = setTimeout(() => {
            setActiveGachaTier(null);
            setActiveSlotCombo(null);
        }, Math.min(dur, 5000));
    };

    const previewChain = (mode: ChainMode) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setActiveChainMode(mode);
        if (mode === 'normal') {
            playFeverExitSound();
        } else {
            playFeverEntrySound();
            playFeverChainHit(mode === 'kakuhen' ? 3 : mode === 'gekiatsu' ? 5 : 10);
        }
        timerRef.current = setTimeout(() => setActiveChainMode(null), 3000);
    };

    const previewMilestone = (sp: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setActiveMilestone(sp);
        playRankUpSound('LEGENDARY');
        timerRef.current = setTimeout(() => setActiveMilestone(null), 3000);
    };

    // Gacha simulator
    const runSimulation = () => {
        const table = CHAIN_TABLES[simChain];
        const counts = Object.fromEntries(ALL_TIERS.map(t => [t, 0])) as Record<GachaTier, number>;
        for (let i = 0; i < simCount; i++) {
            const r = Math.random();
            let tier: GachaTier = 'MISS';
            for (const entry of table) {
                if (r < entry.threshold) { tier = entry.tier; break; }
            }
            counts[tier]++;
        }
        setSimStats(counts);
    };

    const level = stats ? levelFromXP(stats.total_xp) : 1;
    const titleInfo = getTitleForLevel(level);
    const nextLevelXP = xpForLevel(level + 1);
    const currentLevelXP = xpForLevel(level);
    const progress = stats ? ((stats.total_xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 0;

    // MiniRunner preview state
    const [previewXP, setPreviewXP] = useState(0);
    const [previewGoal, setPreviewGoal] = useState(1310);

    return (
        <div style={{ padding: '0 0 24px', maxWidth: '960px', margin: '0 auto', backgroundColor: '#F5F5F4', minHeight: '100vh' }}>

            {/* ════════ MINI RUNNER PREVIEW ════════ */}
            <div style={{ marginBottom: '16px' }}>
                <MiniRunner todayXP={previewXP} goalXP={previewGoal} onGoalChange={setPreviewGoal} />
                <div style={{ padding: '10px 16px', background: '#1a1a2e', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#D4AF37', letterSpacing: '1px' }}>RUNNER TEST</span>
                    <span style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>XP: {previewXP} / {previewGoal}</span>
                    <input
                        type="range" min={0} max={Math.round(previewGoal * 1.1)} step={1}
                        value={previewXP}
                        onChange={e => setPreviewXP(Number(e.target.value))}
                        style={{ flex: 1, minWidth: '120px', accentColor: '#D4AF37' }}
                    />
                    {[1, 3, 5, 10, 30, 50, 100].map(v => (
                        <button key={v} onClick={() => setPreviewXP(p => Math.min(p + v, Math.round(previewGoal * 1.1)))}
                            style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', border: 'none', background: v >= 50 ? '#7C3AED' : v >= 10 ? '#DC2626' : '#D4AF37', color: '#fff', cursor: 'pointer' }}>
                            +{v}
                        </button>
                    ))}
                    <button onClick={() => setPreviewXP(0)}
                        style={{ fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', border: '1px solid #555', background: 'transparent', color: '#999', cursor: 'pointer' }}>
                        RESET
                    </button>
                </div>
            </div>

            {/* ════════ PUZZLE BOARD TEST ════════ */}
            <div style={{ margin: '0 0 16px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1C1917', letterSpacing: '1px' }}>CHAIN DROP TEST</div>
                        <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '2px' }}>Drop cards to test party battle system</div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#78716C' }}>Dropped: {puzzleDropCount}</div>
                </div>

                {/* Quick drop buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    <button onClick={() => dropTestCard()} style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#10B981', color: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>
                        DROP RANDOM
                    </button>
                    {/* Fill grid fast */}
                    <button onClick={() => { for (let i = 0; i < 9; i++) setTimeout(() => dropTestCard(), i * 200); }} style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#3B82F6', color: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>
                        FILL 3x3
                    </button>
                    <button onClick={() => { for (let i = 0; i < 16; i++) setTimeout(() => dropTestCard(), i * 150); }} style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#8B5CF6', color: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}>
                        FILL 4x4
                    </button>
                </div>

                {/* Rank-specific drops */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {RANKS.map(r => {
                        const colors: Record<string, string> = { NORMAL: '#A8A29E', BRONZE: '#CD7F32', SILVER: '#94A3B8', GOLD: '#D4AF37', HOLOGRAPHIC: '#A855F7', LEGENDARY: '#D4AF37' };
                        return (
                            <button key={r} onClick={() => dropTestCard(r)} style={{
                                padding: '4px 10px', borderRadius: '5px', border: `1px solid ${colors[r]}40`,
                                background: `${colors[r]}10`, color: colors[r], fontSize: '9px', fontWeight: '800',
                                cursor: 'pointer', letterSpacing: '0.5px',
                            }}>
                                {r}
                            </button>
                        );
                    })}
                </div>

                {/* Element-specific drops */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {ELEMENTS.map(el => {
                        const elColors: Record<string, string> = { flame: '#EF4444', aqua: '#3B82F6', wind: '#10B981', earth: '#D97706', thunder: '#8B5CF6' };
                        return (
                            <button key={el} onClick={() => dropTestCard(undefined, el)} style={{
                                padding: '4px 10px', borderRadius: '5px', border: `1px solid ${elColors[el]}40`,
                                background: `${elColors[el]}10`, color: elColors[el], fontSize: '9px', fontWeight: '800',
                                cursor: 'pointer', textTransform: 'uppercase',
                            }}>
                                {el}
                            </button>
                        );
                    })}
                </div>

                {/* PuzzleBoard */}
                <PuzzleBoard
                    dropCard={puzzleDropCard as any}
                    chainMode="normal"
                    isMobile={false}
                    cardPoints={{}}
                    onChainResult={(result) => {
                        console.log('Battle result:', result);
                    }}
                />
            </div>

            <div style={{ padding: '0 24px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a2e', margin: 0 }}>
                    DEV / Visual Tester
                </h1>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                    Gacha tiers, card ranks, chain modes, slot combos, milestones -- press to preview
                </p>
            </div>

            {loading ? (
                <div style={{ color: '#999', fontSize: '14px' }}>Loading...</div>
            ) : (
                <>
                    {/* ── Player Stats ── */}
                    <Section title="Player Stats" subtitle="5s auto-refresh">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                            <StatCard label="Total XP" value={stats?.total_xp?.toLocaleString() || '0'} color="#D4AF37" />
                            <StatCard label="Level" value={`Lv.${level}`} sub={`${titleInfo.title} (${titleInfo.titleEn})`} color={titleInfo.color} />
                            <StatCard label="Sparks (SP)" value={stats?.sparks?.toLocaleString() || '0'} color="#F59E0B" />
                            <StatCard label="Legendary+" value={String(stats?.legendary_count || 0)} color="#D4AF37" />
                            <StatCard label="Pity" value={`${stats?.pity_counter || 0}`} sub="LEGENDARY保証" color="#8B5CF6" />
                            <StatCard label="Today" value={`${todayCount} reviews`} sub={`+${todayXP} XP`} color="#3B82F6" />
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#999', marginBottom: '3px' }}>
                                <span>Lv.{level} &rarr; Lv.{level + 1}</span>
                                <span>{stats?.total_xp?.toLocaleString() || 0} / {nextLevelXP.toLocaleString()} ({progress.toFixed(1)}%)</span>
                            </div>
                            <div style={{ height: '6px', backgroundColor: '#E5E5E5', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${Math.min(progress, 100)}%`, backgroundColor: titleInfo.color, borderRadius: '3px', transition: 'width 0.5s ease' }} />
                            </div>
                        </div>
                    </Section>

                    {/* ── Gacha Tier Preview (THE MAIN THING) ── */}
                    <Section title="Gacha Tier Preview" subtitle="press to see effect + hear sound">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {ALL_TIERS.map(tier => {
                                const cfg = TIER_CONFIG[tier];
                                const isActive = activeGachaTier === tier;
                                return (
                                    <button key={tier} onClick={() => previewGacha(tier)} style={{
                                        padding: '14px 8px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                        backgroundColor: isActive ? cfg.color : `${cfg.color}12`,
                                        color: isActive ? (tier === 'PHANTOM' ? '#000' : '#fff') : cfg.color,
                                        fontWeight: '800', fontSize: '13px', letterSpacing: '1px',
                                        boxShadow: isActive ? `0 0 30px ${cfg.color}60, 0 0 60px ${cfg.color}30` : 'none',
                                        transition: 'all 0.3s ease',
                                        animation: isActive ? 'gacha-reveal 0.6s ease-out' : 'none',
                                        position: 'relative', overflow: 'hidden',
                                    }}>
                                        <div style={{ fontSize: '15px' }}>{tier}</div>
                                        <div style={{ fontSize: '10px', fontWeight: '500', opacity: 0.8, marginTop: '2px' }}>
                                            {TIER_JA[tier]} / {cfg.odds}
                                        </div>
                                        <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '4px' }}>
                                            +{cfg.sparks} SP
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active gacha overlay preview */}
                        {activeGachaTier && (
                            <div style={{
                                marginTop: '16px', padding: '24px', borderRadius: '16px',
                                backgroundColor: activeGachaTier === 'PHANTOM' ? '#0a0a0a' : '#1a1a2e',
                                textAlign: 'center', position: 'relative', overflow: 'hidden',
                                animation: 'gacha-shake 0.5s ease-out',
                            }}>
                                {/* Particles */}
                                {Array.from({ length: Math.min(TIER_CONFIG[activeGachaTier].particles, 30) }).map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        width: '4px', height: '4px', borderRadius: '50%',
                                        backgroundColor: TIER_CONFIG[activeGachaTier!].color,
                                        animation: `gacha-sparkle ${1 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s infinite`,
                                        opacity: 0,
                                    }} />
                                ))}

                                {/* Tier text */}
                                <div style={{
                                    fontSize: `${Math.min(TIER_CONFIG[activeGachaTier].fontSize / 2, 64)}px`,
                                    fontWeight: '900', letterSpacing: '8px',
                                    color: TIER_CONFIG[activeGachaTier].color,
                                    textShadow: `0 0 30px ${TIER_CONFIG[activeGachaTier].color}80, 0 0 60px ${TIER_CONFIG[activeGachaTier].color}40`,
                                    animation: activeGachaTier === 'PHANTOM' ? 'gacha-phantom-pulse 2s ease-in-out infinite' :
                                               activeGachaTier === 'SHINY' ? 'gacha-shiny-prismatic 3s linear infinite' :
                                               'gacha-reveal 0.8s ease-out',
                                }}>
                                    {activeGachaTier}
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', opacity: 0.6, marginTop: '8px' }}>
                                    {TIER_JA[activeGachaTier]} +{TIER_CONFIG[activeGachaTier].sparks} SP
                                </div>

                                {/* Slot combo preview */}
                                {activeSlotCombo && (
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                                        {activeSlotCombo.map((symId, i) => {
                                            const sym = SLOT_SYMBOLS.find(s => s.id === symId)!;
                                            return (
                                                <div key={i} style={{
                                                    width: '56px', height: '56px', borderRadius: '10px',
                                                    backgroundColor: '#111', border: `2px solid ${sym.color}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: sym.label === '7' ? '28px' : '14px',
                                                    fontWeight: '900', color: sym.color,
                                                    boxShadow: `0 0 12px ${sym.color}50`,
                                                    animation: `reel-symbol-flash 0.4s ease-out ${i * 0.15}s both`,
                                                }}>
                                                    {sym.label}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </Section>

                    {/* ── Slot Machine Comparison ── */}
                    <SlotComparePreview />

                    {/* ── Card Rank Preview ── */}
                    <Section title="Card Rank Frames" subtitle="actual card frame styles">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            {CARD_RANKS.map(r => {
                                const frame = getCardFrame(r.rank);
                                return (
                                    <button key={r.rank} onClick={() => playCardRankSound(r.rank)} style={{
                                        ...frame,
                                        padding: '16px 10px', borderRadius: '0', cursor: 'pointer',
                                        textAlign: 'center', position: 'relative',
                                        boxShadow: r.glow,
                                        animation: r.rank === 'HOLOGRAPHIC' ? 'card-holo-shimmer 3s linear infinite' : 'none',
                                    }}>
                                        <div style={{ fontSize: '13px', fontWeight: '800', color: frame.textColor, letterSpacing: '1px' }}>
                                            {r.rank}
                                        </div>
                                        <div style={{ fontSize: '10px', color: frame.textColor, opacity: 0.7, marginTop: '4px' }}>
                                            {r.labelJa} / {r.threshold}pts+
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </Section>

                    {/* ── Chain Mode Preview ── */}
                    <Section title="Chain Modes (連荘)" subtitle="press to hear entry sound">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            {(['normal', 'kakuhen', 'gekiatsu', 'god'] as ChainMode[]).map(mode => {
                                const cfg = CHAIN_MODE_CONFIG[mode];
                                const isActive = activeChainMode === mode;
                                return (
                                    <button key={mode} onClick={() => previewChain(mode)} style={{
                                        padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                        background: isActive ? cfg.gradient : `${cfg.color}10`,
                                        color: isActive ? '#fff' : cfg.color,
                                        fontWeight: '700', fontSize: '14px',
                                        boxShadow: isActive ? `0 0 20px ${cfg.color}50` : 'none',
                                        transition: 'all 0.3s ease',
                                        animation: isActive && mode !== 'normal' ? 'fever-entry-slam 1.5s ease-out' : 'none',
                                        position: 'relative',
                                    }}>
                                        <div style={{ fontSize: '16px', letterSpacing: '2px' }}>{cfg.label}</div>
                                        <div style={{ fontSize: '11px', fontWeight: '500', marginTop: '4px', opacity: 0.8 }}>
                                            {cfg.labelJa} / {cfg.trigger} / GP {cfg.spMultiplier}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {activeChainMode && activeChainMode !== 'normal' && (
                            <div style={{
                                marginTop: '12px', padding: '20px', borderRadius: '12px',
                                background: CHAIN_MODE_CONFIG[activeChainMode].gradient,
                                textAlign: 'center', color: '#fff',
                                animation: 'fever-entry-shake 0.8s ease-out',
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '6px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                    {activeChainMode === 'kakuhen' ? '確変突入!' : activeChainMode === 'gekiatsu' ? '激熱突入!' : '神 降 臨 !'}
                                </div>
                                <div style={{ fontSize: '13px', marginTop: '6px', opacity: 0.9 }}>
                                    GP {CHAIN_MODE_CONFIG[activeChainMode].spMultiplier} / MISS率DOWN / 超レア確率UP
                                </div>
                            </div>
                        )}
                    </Section>

                    {/* ── GP Milestones Preview ── */}
                    <Section title="GP Milestones" subtitle="press to see celebration">
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {MILESTONES.map(sp => {
                                const isActive = activeMilestone === sp;
                                return (
                                    <button key={sp} onClick={() => previewMilestone(sp)} style={{
                                        padding: '10px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                        backgroundColor: isActive ? '#D4AF37' : '#FFF8E1',
                                        color: isActive ? '#fff' : '#B8860B',
                                        fontWeight: '800', fontSize: '14px',
                                        boxShadow: isActive ? '0 0 20px #D4AF3760' : 'none',
                                        transition: 'all 0.3s ease',
                                    }}>
                                        {sp.toLocaleString()} SP
                                    </button>
                                );
                            })}
                        </div>
                        {activeMilestone && (
                            <div style={{
                                marginTop: '12px', padding: '24px', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #1a1a2e, #2D2438)',
                                textAlign: 'center',
                                animation: 'rankup-banner 2s ease-out',
                            }}>
                                <div style={{ fontSize: '14px', color: '#D4AF37', fontWeight: '600', letterSpacing: '4px' }}>GP MILESTONE</div>
                                <div style={{
                                    fontSize: '48px', fontWeight: '900', color: '#D4AF37', marginTop: '8px',
                                    textShadow: '0 0 30px #D4AF3780, 0 0 60px #D4AF3740',
                                }}>
                                    {activeMilestone.toLocaleString()}
                                </div>
                                <div style={{ fontSize: '13px', color: '#A8A29E', marginTop: '8px' }}>GP COLLECTED</div>
                            </div>
                        )}
                    </Section>

                    {/* ── Sound Tester ── */}
                    <Section title="Sound Tester" subtitle="all synthesized sounds">
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Spin Start', fn: () => playSpinStart() },
                                { label: 'Spin Tick', fn: () => playSpinTick() },
                                { label: 'Reel Stop 1', fn: () => playReelStop(0) },
                                { label: 'Reel Stop 2', fn: () => playReelStop(1) },
                                { label: 'Reel Stop 3', fn: () => playReelStop(2) },
                                { label: 'Reach Alert', fn: () => playReachAlert() },
                                { label: 'FEVER Entry', fn: () => playFeverEntrySound() },
                                { label: 'FEVER Exit', fn: () => playFeverExitSound() },
                                { label: 'Chain Hit 3', fn: () => playFeverChainHit(3) },
                                { label: 'Chain Hit 10', fn: () => playFeverChainHit(10) },
                                { label: 'Level 0', fn: () => playLevelSound(0) },
                                { label: 'Level 3', fn: () => playLevelSound(3) },
                                { label: 'Level 6', fn: () => playLevelSound(6) },
                                { label: 'Card BRONZE', fn: () => playCardRankSound('BRONZE') },
                                { label: 'Card GOLD', fn: () => playCardRankSound('GOLD') },
                                { label: 'Card LEGENDARY', fn: () => playCardRankSound('LEGENDARY') },
                                { label: 'Rank Up GOLD', fn: () => playRankUpSound('GOLD') },
                                { label: 'Rank Up LEGENDARY', fn: () => playRankUpSound('LEGENDARY') },
                            ].map((s, i) => (
                                <button key={i} onClick={s.fn} style={{
                                    padding: '7px 12px', borderRadius: '6px', border: '1px solid #ddd',
                                    backgroundColor: '#fff', fontSize: '11px', fontWeight: '600',
                                    cursor: 'pointer', color: '#555',
                                }}>
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </Section>

                    {/* ── Probability Tables (4 chain modes) ── */}
                    <Section title="Chain Probability Tables" subtitle="from d1.ts backend">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {(['normal', 'kakuhen', 'gekiatsu', 'god'] as ChainMode[]).map(mode => (
                                <div key={mode}>
                                    <h3 style={{
                                        fontSize: '13px', fontWeight: '700', marginBottom: '8px',
                                        color: CHAIN_MODE_CONFIG[mode].color,
                                    }}>
                                        {CHAIN_MODE_CONFIG[mode].label} ({CHAIN_MODE_CONFIG[mode].labelJa})
                                    </h3>
                                    <ChainProbTable table={CHAIN_TABLES[mode]} />
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* ── Gacha Simulator ── */}
                    <Section title="Gacha Simulator" subtitle="client-side probability test">
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                            <select value={simCount} onChange={e => setSimCount(Number(e.target.value))} style={{
                                padding: '7px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', backgroundColor: '#fff',
                            }}>
                                {[10, 50, 100, 500, 1000, 5000].map(n => (
                                    <option key={n} value={n}>{n.toLocaleString()} rolls</option>
                                ))}
                            </select>
                            <select value={simChain} onChange={e => setSimChain(e.target.value as ChainMode)} style={{
                                padding: '7px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', backgroundColor: '#fff',
                            }}>
                                {(['normal', 'kakuhen', 'gekiatsu', 'god'] as ChainMode[]).map(m => (
                                    <option key={m} value={m}>{CHAIN_MODE_CONFIG[m].label}</option>
                                ))}
                            </select>
                            <button onClick={runSimulation} style={{
                                padding: '7px 18px', borderRadius: '8px', border: 'none',
                                backgroundColor: '#1a1a2e', color: '#fff', fontSize: '12px',
                                fontWeight: '600', cursor: 'pointer',
                            }}>
                                ROLL
                            </button>
                        </div>
                        {simStats && (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {ALL_TIERS.map(tier => {
                                    const cnt = simStats[tier];
                                    if (cnt === 0 && ['PHANTOM', 'SHINY', 'MYTHIC'].includes(tier)) return null;
                                    return (
                                        <div key={tier} style={{
                                            padding: '5px 10px', borderRadius: '6px',
                                            backgroundColor: `${TIER_CONFIG[tier].color}12`,
                                            border: cnt > 0 ? `1px solid ${TIER_CONFIG[tier].color}40` : '1px solid #eee',
                                            fontSize: '11px',
                                        }}>
                                            <span style={{ color: TIER_CONFIG[tier].color, fontWeight: '700' }}>{tier}</span>
                                            <span style={{ color: '#666', marginLeft: '4px' }}>
                                                {cnt} ({((cnt / simCount) * 100).toFixed(2)}%)
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Section>

                    {/* ── Chakra Level-Up Preview ── */}
                    <CelebrationPreview />

                    {/* ── Level Curve ── */}
                    <Section title="Level Curve" subtitle="floor(13 * Lv^2.3)">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '4px', fontSize: '11px' }}>
                            {[1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100].map(lv => {
                                const info = getTitleForLevel(lv);
                                const isCurrent = level === lv;
                                return (
                                    <div key={lv} style={{
                                        padding: '5px 7px', borderRadius: '6px',
                                        backgroundColor: isCurrent ? `${info.color}15` : '#fff',
                                        border: isCurrent ? `1px solid ${info.color}40` : '1px solid #eee',
                                    }}>
                                        <span style={{ fontWeight: '700', color: info.color }}>Lv.{lv}</span>
                                        <span style={{ color: '#999', marginLeft: '3px' }}>{xpForLevel(lv).toLocaleString()}</span>
                                        <div style={{ color: '#bbb', fontSize: '9px' }}>{info.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>

                    {/* ── Luck System ── */}
                    <Section title="Progressive Luck" subtitle="more Card XP = better ultra-rare odds">
                        <div style={{ fontSize: '12px', color: '#555', lineHeight: '2' }}>
                            <Row label="System" value="Card XP累計で5段階 (x1.0 / x1.2 / x1.5 / x2.0 / x3.0)" />
                            <Row label="Tiers" value="0→普通 / 500→ツイてる / 2000→絶好調 / 10000→神ってる / 50000→持ってる" />
                            <Row label="Applies to" value="MYTHIC, SHINY, PHANTOM only" />
                            <Row label="Effect" value="Ultra-rare thresholds boosted by multiplier" />
                            <Row label="Current GP" value={`${stats?.sparks?.toLocaleString() || '0'} GP`} />
                        </div>
                    </Section>

                    {/* ── Mini Runner Preview ── */}
                    <MiniRunnerTester todayXP={todayXP} />
                </>
            )}
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════
// SUB-COMPONENTS
// ════════════════════════════════════════════════

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div style={{
            marginBottom: '20px', padding: '18px', borderRadius: '12px',
            backgroundColor: '#fff', border: '1px solid #E5E5E5',
        }}>
            <div style={{ marginBottom: '14px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>{title}</h2>
                {subtitle && <p style={{ fontSize: '10px', color: '#bbb', margin: '2px 0 0' }}>{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
    return (
        <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: `${color}08`, border: `1px solid ${color}20` }}>
            <div style={{ fontSize: '10px', color: '#999', marginBottom: '3px' }}>{label}</div>
            <div style={{ fontSize: '18px', fontWeight: '800', color }}>{value}</div>
            {sub && <div style={{ fontSize: '10px', color: '#aaa', marginTop: '2px' }}>{sub}</div>}
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ display: 'flex', gap: '12px', padding: '3px 0', borderBottom: '1px solid #f5f5f5' }}>
            <span style={{ minWidth: '140px', fontWeight: '600', color: '#333', fontSize: '12px' }}>{label}</span>
            <span style={{ color: '#666', fontSize: '12px', fontFamily: 'monospace' }}>{value}</span>
        </div>
    );
}

function ChainProbTable({ table }: { table: GachaEntry[] }) {
    let prev = 0;
    return (
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '4px 6px', color: '#999', fontWeight: '600' }}>Tier</th>
                    <th style={{ textAlign: 'right', padding: '4px 6px', color: '#999', fontWeight: '600' }}>%</th>
                    <th style={{ textAlign: 'right', padding: '4px 6px', color: '#999', fontWeight: '600' }}>SP</th>
                </tr>
            </thead>
            <tbody>
                {table.map(row => {
                    const pct = ((row.threshold - prev) * 100);
                    prev = row.threshold;
                    return (
                        <tr key={row.tier} style={{ borderBottom: '1px solid #f5f5f5' }}>
                            <td style={{ padding: '4px 6px', fontWeight: '700', color: TIER_CONFIG[row.tier]?.color || '#999' }}>
                                {row.tier}
                            </td>
                            <td style={{ padding: '4px 6px', textAlign: 'right', color: '#555', fontFamily: 'monospace' }}>
                                {pct < 0.01 ? pct.toFixed(4) : pct < 1 ? pct.toFixed(3) : pct.toFixed(1)}%
                            </td>
                            <td style={{ padding: '4px 6px', textAlign: 'right', color: '#bbb' }}>{row.sparks}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function CelebrationPreview() {
    const [celebrating, setCelebrating] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [animKey, setAnimKey] = useState(0);

    const triggerCelebration = () => {
        setCelebrating(false);
        setTimeout(() => {
            setAnimKey(k => k + 1);
            setCelebrating(true);
            playLevelSound(selectedLevel as 0 | 1 | 2 | 3 | 4 | 5 | 6);
        }, 50);
        setTimeout(() => setCelebrating(false), 2550);
    };

    const chakra = CHAKRA_LEVELS[selectedLevel];

    return (
        <Section title="Chakra Level-Up Preview" subtitle="press to see celebration + hear sound">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                <select value={selectedLevel} onChange={e => setSelectedLevel(Number(e.target.value))} style={{
                    padding: '7px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', backgroundColor: '#fff',
                }}>
                    {CHAKRA_LEVELS.map(c => (
                        <option key={c.level} value={c.level}>Lv.{c.level + 1} {c.ja} {c.name}</option>
                    ))}
                </select>
                <button onClick={triggerCelebration} style={{
                    padding: '8px 18px', borderRadius: '8px', border: 'none',
                    background: `linear-gradient(135deg, ${chakra.gradFrom}, ${chakra.color})`,
                    color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                    boxShadow: `0 4px 16px ${chakra.color}40`,
                }}>
                    LEVEL UP
                </button>
            </div>

            <div key={animKey} style={{
                maxWidth: '320px', borderRadius: '14px', border: '2px solid #e5e5e5',
                backgroundColor: '#fff', padding: '8px', position: 'relative',
                boxShadow: celebrating ? `0 8px 32px rgba(0,0,0,0.1), 0 0 30px ${chakra.gradFrom}60` : '0 4px 16px rgba(0,0,0,0.06)',
                ...(celebrating ? { animation: 'card-levelup-celebrate 2.5s ease-out forwards' } : {}),
            }}>
                {celebrating && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 10, pointerEvents: 'none', borderRadius: '10px',
                        background: `radial-gradient(circle, ${chakra.gradFrom}20 0%, transparent 70%)`,
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'celebrate-badge 2s ease-out forwards' }}>
                            <div style={{
                                fontSize: '16px', fontWeight: '900', letterSpacing: '6px', color: chakra.color,
                                textShadow: `0 0 24px ${chakra.gradFrom}90, 0 0 48px ${chakra.gradFrom}40`,
                            }}>LEVEL UP</div>
                            <div style={{
                                fontSize: '32px', fontWeight: '900', letterSpacing: '3px',
                                background: `linear-gradient(135deg, ${chakra.gradFrom}, ${chakra.gradTo})`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                filter: `drop-shadow(0 0 16px ${chakra.gradFrom}70)`,
                            }}>{chakra.name}</div>
                        </div>
                    </div>
                )}
                <div style={{ backgroundColor: '#FAFAF9', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>
                        I&apos;m not gonna sugarcoat it.
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                        Sample phrase card
                    </div>
                    <button onClick={triggerCelebration} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '100%', padding: '12px 0', borderRadius: '12px', border: 'none',
                        background: `linear-gradient(135deg, ${chakra.gradFrom}, ${chakra.color})`,
                        color: '#fff', fontSize: '14px', fontWeight: '800', cursor: 'pointer',
                        letterSpacing: '2px', boxShadow: `0 4px 16px ${chakra.color}40`,
                    }}>
                        Lv.{chakra.level + 1} {chakra.ja} {chakra.name}
                    </button>
                </div>
            </div>
        </Section>
    );
}

// ════════════════════════════════════════════════
// SLOT MACHINE COMPARISON — OLD vs NEW side by side
// ════════════════════════════════════════════════

function SlotComparePreview() {
    const [selectedTier, setSelectedTier] = useState<GachaTier>('GREAT');
    const [spinning, setSpinning] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    // Reel state for each machine: [reel0, reel1, reel2]
    const [oldReels, setOldReels] = useState<{ syms: string[]; stopped: boolean[]; above: string[]; below: string[] } | null>(null);
    const [newReels, setNewReels] = useState<{ syms: string[]; stopped: boolean[]; above: string[]; below: string[] } | null>(null);
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

    const oldSymMap = Object.fromEntries(OLD_SLOT_SYMBOLS.map(s => [s.id, s]));
    const newSymMap = Object.fromEntries(NEW_SLOT_SYMBOLS.map(s => [s.id, s]));
    const oldSpinPool = OLD_SLOT_SYMBOLS.filter(s => s.id !== 'blank').map(s => s.id);
    const newSpinPool = NEW_SLOT_SYMBOLS.filter(s => s.id !== 'blank' && !s.ultra).map(s => s.id);

    const randomFrom = (pool: string[]) => pool[Math.floor(Math.random() * pool.length)];

    const triggerSpin = () => {
        // Clear previous
        timersRef.current.forEach(clearTimeout);
        intervalsRef.current.forEach(clearInterval);
        timersRef.current = [];
        intervalsRef.current = [];

        setSpinning(true);
        setAnimKey(k => k + 1);
        playSpinStart();

        const oldCombo = OLD_TIER_TO_COMBO[selectedTier] || OLD_TIER_TO_COMBO.MISS;
        const newCombo = NEW_TIER_TO_COMBO[selectedTier] || NEW_TIER_TO_COMBO.MISS;
        const isUltra = ['PHANTOM', 'SHINY', 'MYTHIC'].includes(selectedTier);
        const isEpic = ['MEGA', 'LEGENDARY'].includes(selectedTier) || isUltra;
        const isMatch = selectedTier !== 'MISS';

        // Init random
        const initOld = [randomFrom(oldSpinPool), randomFrom(oldSpinPool), randomFrom(oldSpinPool)];
        const initNew = [randomFrom(newSpinPool), randomFrom(newSpinPool), randomFrom(newSpinPool)];
        setOldReels({ syms: initOld, stopped: [false, false, false], above: initOld.map(s => randomFrom(oldSpinPool)), below: initOld.map(s => randomFrom(oldSpinPool)) });
        setNewReels({ syms: initNew, stopped: [false, false, false], above: initNew.map(s => randomFrom(newSpinPool)), below: initNew.map(s => randomFrom(newSpinPool)) });

        // Spin interval
        const spinInt = setInterval(() => {
            setOldReels(prev => {
                if (!prev) return prev;
                const s = [...prev.syms]; const a = [...prev.above]; const b = [...prev.below];
                for (let r = 0; r < 3; r++) if (!prev.stopped[r]) { s[r] = randomFrom(oldSpinPool); a[r] = randomFrom(oldSpinPool); b[r] = randomFrom(oldSpinPool); }
                return { ...prev, syms: s, above: a, below: b };
            });
            setNewReels(prev => {
                if (!prev) return prev;
                const s = [...prev.syms]; const a = [...prev.above]; const b = [...prev.below];
                // Ultra-rare tease
                const teaseTarget = isUltra ? newCombo[2] : null;
                for (let r = 0; r < 3; r++) if (!prev.stopped[r]) {
                    const tease = r === 2 && teaseTarget && prev.stopped[0] && prev.stopped[1] && Math.random() < 0.2;
                    s[r] = tease ? teaseTarget : randomFrom(newSpinPool);
                    a[r] = randomFrom(newSpinPool); b[r] = randomFrom(newSpinPool);
                }
                return { ...prev, syms: s, above: a, below: b };
            });
            playSpinTick();
        }, 70);
        intervalsRef.current.push(spinInt);

        // Stop reel 1
        timersRef.current.push(setTimeout(() => {
            playReelStop(0);
            setOldReels(prev => prev ? { ...prev, syms: [oldCombo[0], prev.syms[1], prev.syms[2]], stopped: [true, false, false], above: [randomFrom(oldSpinPool), prev.above[1], prev.above[2]], below: [randomFrom(oldSpinPool), prev.below[1], prev.below[2]] } : prev);
            setNewReels(prev => prev ? { ...prev, syms: [newCombo[0], prev.syms[1], prev.syms[2]], stopped: [true, false, false], above: [randomFrom(newSpinPool), prev.above[1], prev.above[2]], below: [randomFrom(newSpinPool), prev.below[1], prev.below[2]] } : prev);
        }, 800));

        // Stop reel 2
        timersRef.current.push(setTimeout(() => {
            playReelStop(1);
            if (isMatch) playReachAlert();
            setOldReels(prev => prev ? { ...prev, syms: [prev.syms[0], oldCombo[1], prev.syms[2]], stopped: [true, true, false], above: [prev.above[0], randomFrom(oldSpinPool), prev.above[2]], below: [prev.below[0], randomFrom(oldSpinPool), prev.below[2]] } : prev);
            setNewReels(prev => prev ? { ...prev, syms: [prev.syms[0], newCombo[1], prev.syms[2]], stopped: [true, true, false], above: [prev.above[0], randomFrom(newSpinPool), prev.above[2]], below: [prev.below[0], randomFrom(newSpinPool), prev.below[2]] } : prev);
        }, 1400));

        // Slow reel 3 for reach
        if (isMatch) {
            timersRef.current.push(setTimeout(() => {
                clearInterval(spinInt);
                const slowInt = setInterval(() => {
                    setOldReels(prev => {
                        if (!prev || prev.stopped[2]) return prev;
                        const s = [...prev.syms]; s[2] = randomFrom(oldSpinPool);
                        return { ...prev, syms: s, above: [prev.above[0], prev.above[1], randomFrom(oldSpinPool)], below: [prev.below[0], prev.below[1], randomFrom(oldSpinPool)] };
                    });
                    setNewReels(prev => {
                        if (!prev || prev.stopped[2]) return prev;
                        const s = [...prev.syms];
                        const tease = isUltra && Math.random() < 0.25;
                        s[2] = tease ? newCombo[2] : randomFrom(newSpinPool);
                        return { ...prev, syms: s, above: [prev.above[0], prev.above[1], randomFrom(newSpinPool)], below: [prev.below[0], prev.below[1], randomFrom(newSpinPool)] };
                    });
                    playSpinTick();
                }, isUltra ? 350 : isEpic ? 250 : 160);
                intervalsRef.current.push(slowInt);
            }, 1500));
        }

        // Stop reel 3
        const r3delay = isMatch ? (isUltra ? 4500 : isEpic ? 3000 : 2400) : 2000;
        timersRef.current.push(setTimeout(() => {
            playReelStop(2);
            intervalsRef.current.forEach(clearInterval);
            setOldReels(prev => prev ? { ...prev, syms: [prev.syms[0], prev.syms[1], oldCombo[2]], stopped: [true, true, true], above: [prev.above[0], prev.above[1], randomFrom(oldSpinPool)], below: [prev.below[0], prev.below[1], randomFrom(oldSpinPool)] } : prev);
            setNewReels(prev => prev ? { ...prev, syms: [prev.syms[0], prev.syms[1], newCombo[2]], stopped: [true, true, true], above: [prev.above[0], prev.above[1], randomFrom(newSpinPool)], below: [prev.below[0], prev.below[1], randomFrom(newSpinPool)] } : prev);
        }, r3delay));

        // Done
        timersRef.current.push(setTimeout(() => {
            playGachaSound(selectedTier);
            setSpinning(false);
        }, r3delay + 600));
    };

    useEffect(() => () => {
        timersRef.current.forEach(clearTimeout);
        intervalsRef.current.forEach(clearInterval);
    }, []);

    const isMatch = selectedTier !== 'MISS';
    const tierColor = TIER_CONFIG[selectedTier]?.color || '#999';

    return (
        <Section title="Slot Machine Comparison" subtitle="OLD (dark) vs NEW (pachinko gold) -- select tier and SPIN">
            {/* Tier selector */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {ALL_TIERS.map(t => (
                    <button key={t} onClick={() => !spinning && setSelectedTier(t)} style={{
                        padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: spinning ? 'not-allowed' : 'pointer',
                        backgroundColor: selectedTier === t ? TIER_CONFIG[t].color : `${TIER_CONFIG[t].color}12`,
                        color: selectedTier === t ? (t === 'PHANTOM' ? '#000' : '#fff') : TIER_CONFIG[t].color,
                        fontWeight: '700', fontSize: '11px', letterSpacing: '1px',
                        opacity: spinning ? 0.5 : 1,
                    }}>
                        {t}
                    </button>
                ))}
            </div>

            {/* SPIN button */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={!spinning ? triggerSpin : undefined} style={{
                    padding: '12px 48px', borderRadius: '12px', border: 'none', cursor: spinning ? 'not-allowed' : 'pointer',
                    background: spinning ? '#A8A29E' : `linear-gradient(135deg, ${tierColor}, ${tierColor}CC)`,
                    color: '#fff', fontSize: '16px', fontWeight: '900', letterSpacing: '6px',
                    boxShadow: spinning ? 'none' : `0 4px 20px ${tierColor}50`,
                    transition: 'all 0.3s ease',
                }}>
                    {spinning ? 'SPINNING...' : 'SPIN'}
                </button>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>
                    {selectedTier}: {TIER_JA[selectedTier]} / {TIER_CONFIG[selectedTier].odds} / +{TIER_CONFIG[selectedTier].sparks} SP
                </div>
            </div>

            {/* Side by side machines */}
            <div key={animKey} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* OLD SLOT */}
                <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textAlign: 'center', marginBottom: '8px', letterSpacing: '2px' }}>
                        旧 OLD
                    </div>
                    <OldSlotMachine reels={oldReels} symMap={oldSymMap} isMatch={isMatch} tierColor={tierColor} />
                </div>
                {/* NEW SLOT */}
                <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#D4AF37', textAlign: 'center', marginBottom: '8px', letterSpacing: '2px' }}>
                        新 NEW
                    </div>
                    <NewSlotMachine reels={newReels} symMap={newSymMap} isMatch={isMatch} tierColor={tierColor} tier={selectedTier} />
                </div>
            </div>
        </Section>
    );
}

// OLD slot: dark theme (original design)
function OldSlotMachine({ reels, symMap, isMatch, tierColor }: {
    reels: { syms: string[]; stopped: boolean[]; above: string[]; below: string[] } | null;
    symMap: Record<string, SlotSym>;
    isMatch: boolean;
    tierColor: string;
}) {
    if (!reels) return <div style={{ height: '200px', borderRadius: '16px', backgroundColor: '#0C0A09', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#57534E', fontSize: '13px' }}>Press SPIN</div>;
    const allStopped = reels.stopped.every(Boolean);
    const cellW = 56; const cellH = 50;

    const renderSym = (symId: string, isCenter: boolean, isStopped: boolean) => {
        const sym = symMap[symId];
        if (!sym) return null;
        return (
            <div style={{
                width: cellW, height: cellH,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: `${sym.label === '7' ? cellH * 0.65 : cellH * 0.35}px`,
                fontWeight: sym.label === '7' ? '900' : '800',
                color: isCenter ? sym.color : `${sym.color}50`,
                textShadow: isCenter && isStopped ? `0 0 20px ${sym.color}80, 0 0 40px ${sym.color}60` : 'none',
                fontFamily: sym.label === '7' ? 'Georgia, serif' : 'inherit',
                letterSpacing: sym.label === 'BAR' ? '2px' : '0',
                animation: isCenter && isStopped ? 'reel-symbol-flash 0.2s ease-out' : undefined,
                userSelect: 'none' as const,
            }}>
                {sym.label}
            </div>
        );
    };

    return (
        <div style={{
            backgroundColor: '#0C0A09', borderRadius: '16px',
            border: allStopped && isMatch ? `2px solid ${tierColor}70` : '2px solid #D4AF3730',
            boxShadow: `0 0 40px #D4AF3720, inset 0 0 30px rgba(0,0,0,0.8)`,
            padding: '12px 10px', position: 'relative', overflow: 'hidden',
        }}>
            {/* Scan lines */}
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)', pointerEvents: 'none', borderRadius: 'inherit' }} />
            <div style={{ display: 'flex', gap: '4px', position: 'relative', zIndex: 1 }}>
                {[0, 1, 2].map(r => (
                    <div key={r} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#1C1917', borderRadius: '8px', overflow: 'hidden', border: '1px solid #292524', animation: reels.stopped[r] ? 'reel-bounce 0.25s ease-out' : undefined }}>
                        <div style={{ borderBottom: '1px solid #292524', opacity: 0.4 }}>{renderSym(reels.above[r], false, reels.stopped[r])}</div>
                        <div>{renderSym(reels.syms[r], true, reels.stopped[r])}</div>
                        <div style={{ borderTop: '1px solid #292524', opacity: 0.4 }}>{renderSym(reels.below[r], false, reels.stopped[r])}</div>
                    </div>
                ))}
                {/* Payline */}
                <div style={{
                    position: 'absolute', top: `${cellH}px`, left: '-2px', right: '-2px', height: `${cellH + 2}px`,
                    border: allStopped && isMatch ? `2px solid ${tierColor}60` : '1px solid #D4AF3720',
                    borderRadius: '4px', pointerEvents: 'none',
                    animation: allStopped && isMatch ? 'payline-flash 0.8s ease-in-out infinite' : undefined,
                }} />
            </div>
        </div>
    );
}

// NEW slot: pachinko gold frame
function NewSlotMachine({ reels, symMap, isMatch, tierColor, tier }: {
    reels: { syms: string[]; stopped: boolean[]; above: string[]; below: string[] } | null;
    symMap: Record<string, SlotSym>;
    isMatch: boolean;
    tierColor: string;
    tier: GachaTier;
}) {
    if (!reels) return <div style={{ height: '200px', borderRadius: '20px', background: 'linear-gradient(160deg, #F6E27A 0%, #D4AF37 40%, #B8941E 70%, #D4AF37 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B6914', fontSize: '13px', fontWeight: '700' }}>Press SPIN</div>;
    const allStopped = reels.stopped.every(Boolean);
    const isUltra = ['PHANTOM', 'SHINY', 'MYTHIC'].includes(tier);
    const frameGlow = allStopped && isUltra
        ? tier === 'PHANTOM' ? '#E2E8F0' : tier === 'SHINY' ? '#06B6D4' : '#EC4899'
        : tierColor;
    const cellW = 56; const cellH = 50;

    const renderSym = (symId: string, isCenter: boolean, isStopped: boolean) => {
        const sym = symMap[symId];
        if (!sym) return null;
        const is7 = sym.label === '7';
        const isKanji = ['鈴', '星', '桜', '神', '虹', '幻'].includes(sym.label);
        const isUltraSym = !!sym.ultra;
        return (
            <div style={{
                width: cellW, height: cellH,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: `${is7 ? cellH * 0.7 : isKanji ? cellH * 0.5 : cellH * 0.35}px`,
                fontWeight: '900',
                fontStyle: is7 ? 'italic' : 'normal',
                color: isCenter ? sym.color : `${sym.color}40`,
                textShadow: isCenter && isStopped
                    ? isUltraSym
                        ? `0 0 20px ${sym.color}90, 0 0 40px ${sym.color}60, 0 0 60px ${sym.color}40`
                        : is7
                            ? `0 2px 0 ${sym.stroke || sym.color}, 0 0 20px ${sym.color}90, 0 0 40px ${sym.color}60`
                            : `0 1px 0 ${sym.stroke || sym.color}, 0 0 12px ${sym.color}60`
                    : 'none',
                fontFamily: is7 ? 'Georgia, "Times New Roman", serif' : isKanji ? '"Hiragino Kaku Gothic Pro", "Yu Gothic", sans-serif' : '"Arial Black", sans-serif',
                letterSpacing: sym.label === 'BAR' ? '3px' : is7 ? '-2px' : '0',
                animation: isCenter && isStopped
                    ? isUltraSym ? 'reel-symbol-flash 0.2s ease-out, ultra-symbol-pulse 1s ease-in-out infinite 0.2s' : 'reel-symbol-flash 0.2s ease-out'
                    : undefined,
                WebkitTextStroke: isCenter && is7 ? `1px ${sym.stroke || sym.color}` : undefined,
                userSelect: 'none' as const,
            }}>
                {sym.label}
            </div>
        );
    };

    const isReach = allStopped ? false : reels.stopped[0] && reels.stopped[1] && !reels.stopped[2] && isMatch;

    return (
        <div style={{
            background: 'linear-gradient(160deg, #F6E27A 0%, #D4AF37 20%, #B8941E 40%, #D4AF37 60%, #F6E27A 80%, #D4AF37 100%)',
            borderRadius: '20px',
            border: isReach ? '3px solid #EF4444' : '2px solid #8B6914',
            boxShadow: isReach
                ? '0 0 40px #EF444450, inset 0 2px 4px rgba(255,242,168,0.6)'
                : allStopped && isUltra
                    ? `0 8px 32px rgba(0,0,0,0.3), 0 0 50px ${frameGlow}60, 0 0 100px ${frameGlow}30, inset 0 2px 4px rgba(255,242,168,0.6)`
                    : '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,242,168,0.6)',
            padding: '14px 12px', position: 'relative', overflow: 'hidden',
            animation: isReach ? 'reach-border-pulse 0.6s ease-in-out infinite' : undefined,
        }}>
            {/* Metallic sheen */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)', pointerEvents: 'none', borderRadius: 'inherit' }} />
            {/* Reel window */}
            <div style={{
                background: 'linear-gradient(180deg, #8B6914 0%, #A07A1E 2%, #F5EDD6 4%, #FFFEF8 10%, #FFFEF8 90%, #F5EDD6 96%, #A07A1E 98%, #8B6914 100%)',
                borderRadius: '12px', padding: '4px',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.15), inset 0 -2px 6px rgba(0,0,0,0.1)',
                position: 'relative', zIndex: 1,
            }}>
                <div style={{ display: 'flex', gap: '4px', position: 'relative' }}>
                    {[0, 1, 2].map(r => (
                        <div key={r} style={{
                            display: 'flex', flexDirection: 'column',
                            background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFFFF 20%, #FFFFFF 80%, #F5F0E0 100%)',
                            borderRadius: '8px', overflow: 'hidden',
                            border: '1px solid #C9A93E',
                            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)',
                            animation: reels.stopped[r] ? 'reel-bounce 0.25s ease-out' : undefined,
                        }}>
                            <div style={{ borderBottom: '1px solid #E8DFC0', opacity: 0.5 }}>{renderSym(reels.above[r], false, reels.stopped[r])}</div>
                            <div>{renderSym(reels.syms[r], true, reels.stopped[r])}</div>
                            <div style={{ borderTop: '1px solid #E8DFC0', opacity: 0.5 }}>{renderSym(reels.below[r], false, reels.stopped[r])}</div>
                        </div>
                    ))}
                    {/* Payline */}
                    <div style={{
                        position: 'absolute', top: `${cellH + cellH / 2 - 1}px`, left: '-6px', right: '-6px', height: '3px',
                        background: allStopped && isMatch ? `linear-gradient(90deg, ${tierColor}, ${tierColor}CC, ${tierColor})` : 'linear-gradient(90deg, #D4AF37, #D4AF3750, #D4AF37)',
                        borderRadius: '2px', pointerEvents: 'none',
                        boxShadow: allStopped && isMatch ? `0 0 8px ${tierColor}80` : '0 0 4px #D4AF3740',
                        animation: allStopped && isMatch ? 'payline-flash 0.8s ease-in-out infinite' : undefined,
                    }} />
                    {/* Arrows */}
                    <div style={{ position: 'absolute', top: `${cellH + cellH / 2 - 5}px`, left: '-8px', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `7px solid ${isReach ? '#EF4444' : '#D4AF37'}`, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: `${cellH + cellH / 2 - 5}px`, right: '-8px', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: `7px solid ${isReach ? '#EF4444' : '#D4AF37'}`, pointerEvents: 'none' }} />
                </div>
            </div>
            {/* REACH label */}
            {isReach && (
                <div style={{
                    textAlign: 'center', marginTop: '8px', fontSize: '18px', fontWeight: '900',
                    color: '#FFFFFF', letterSpacing: '8px',
                    textShadow: '0 0 20px #EF4444, 0 0 40px #EF4444, 0 2px 0 #DC2626',
                    animation: 'reach-text-flash 0.5s ease-out forwards',
                    fontFamily: '"Arial Black", sans-serif', position: 'relative', zIndex: 2,
                }}>
                    REACH
                </div>
            )}
        </div>
    );
}

// ════════════════════════════════════════════════
// MINI RUNNER TESTER
// ════════════════════════════════════════════════

const DEV_DEFAULT_GOAL = 1310;
const DEV_MILESTONE_RATIOS = [
    { ratio: 4 / 1310, title: '起動', color: '#78716C' },
    { ratio: 28 / 1310, title: '準備OK', color: '#2563EB' },
    { ratio: 72 / 1310, title: 'エンジン全開', color: '#16A34A' },
    { ratio: 167 / 1310, title: 'ゾーン', color: '#CA8A04' },
    { ratio: 351 / 1310, title: '無双', color: '#EA580C' },
    { ratio: 588 / 1310, title: '覚醒', color: '#DC2626' },
    { ratio: 873 / 1310, title: '鬼神', color: '#7C3AED' },
    { ratio: 1, title: '本日の神', color: '#D4AF37' },
];
function getDevMilestones(goalXP: number) {
    return DEV_MILESTONE_RATIOS.map(m => ({
        xp: Math.round(m.ratio * goalXP),
        title: m.title,
        color: m.color,
    }));
}

type RunnerReaction = { anim: string; dur: number; energy: number; rings: number; ringColor: string; label: string; tier: string };
const REACTION_TIERS: { tier: string; weight: number; reaction: RunnerReaction }[] = [
    { tier: 'normal',  weight: 55, reaction: { anim: 'runner-absorb-5',  dur: 650,  energy: 2,  rings: 0, ringColor: '#FB923C', label: '',       tier: 'normal' } },
    { tier: 'rare',    weight: 25, reaction: { anim: 'runner-absorb-10', dur: 800,  energy: 4,  rings: 1, ringColor: '#FACC15', label: 'RARE',   tier: 'rare' } },
    { tier: 'super',   weight: 12, reaction: { anim: 'runner-absorb-15', dur: 950,  energy: 7,  rings: 1, ringColor: '#4ADE80', label: 'SUPER',  tier: 'super' } },
    { tier: 'epic',    weight: 6,  reaction: { anim: 'runner-absorb-20', dur: 1100, energy: 10, rings: 2, ringColor: '#60A5FA', label: 'EPIC',   tier: 'epic' } },
    { tier: 'legend',  weight: 2,  reaction: { anim: 'runner-absorb-30', dur: 1300, energy: 14, rings: 3, ringColor: '#A855F7', label: 'LEGEND', tier: 'legend' } },
];
function getRunnerReaction(): RunnerReaction {
    const roll = Math.random() * 100;
    let cumulative = 0;
    for (const t of REACTION_TIERS) {
        cumulative += t.weight;
        if (roll < cumulative) return t.reaction;
    }
    return REACTION_TIERS[0].reaction;
}

// ═══════════════════════════════════════════════════════
// MINI RUNNER V2 — Premium game-quality side-scroller
// ═══════════════════════════════════════════════════════

function MiniRunnerV2Stage({ xp, goalXP }: { xp: number; goalXP: number }) {
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(xp >= goalXP);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);
    const [shootingStar, setShootingStar] = useState<number | null>(null);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(xp / maxXP, 1);
    const isGod = xp >= goalXP;
    const walkRatio = xp / goalXP;
    const walkSpeed = walkRatio >= 0.666 ? 0.25 : walkRatio >= 0.268 ? 0.35 : walkRatio >= 0.055 ? 0.5 : 0.7;

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const charColor = dailyTitle.color;

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 2500); }
            if (nowGod) { setShootingStar(Date.now()); setTimeout(() => setShootingStar(null), 1200); }
            prevXpRef.current = xp; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp; prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    // Dust motes config
    const dustMotes = Array.from({ length: 6 }, (_, i) => ({
        x: 15 + i * 14, y: 12 + ((i * 7) % 20), dx: -20 - (i % 3) * 15, dy: -4 - (i % 4) * 3,
        dur: 4 + (i % 3) * 2, delay: i * 1.5, size: 1.5 + (i % 2), opacity: 0.25 + (i % 3) * 0.1,
    }));

    return (
        <div style={{
            height: '100px', position: 'relative', overflow: 'hidden',
            background: isGod
                ? 'linear-gradient(180deg, #0C1220 0%, #152238 25%, #1E3350 50%, #2A4060 75%, #1A2F48 100%)'
                : 'linear-gradient(180deg, #4A90D9 0%, #6BB3E8 20%, #89CCF0 40%, #ADE0F7 60%, #D4F1FF 80%, #FFF0D4 100%)',
            transition: 'background 2s ease',
        }}>
            {/* ══ GOD CELEBRATION ══ */}
            {godCelebration && <div style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'radial-gradient(circle, #D4AF3799, #FDE68A66, transparent 70%)', animation: 'runner-god-flash 2.5s ease-out forwards', pointerEvents: 'none' }} />}
            {godCelebration && <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 45, fontSize: '22px', fontWeight: '900', color: '#FDE68A', textShadow: '0 0 30px #D4AF37, 0 0 60px #D4AF3780, 0 2px 6px rgba(0,0,0,0.6)', letterSpacing: '6px', whiteSpace: 'nowrap', animation: 'runner-god-title 2.5s ease-out forwards', pointerEvents: 'none' }}>本日の神</div>}
            {godCelebration && Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * 360;
                return <div key={`burst-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: i % 2 === 0 ? '4px' : '6px', height: i % 2 === 0 ? '4px' : '6px', borderRadius: i % 3 === 0 ? '1px' : '50%', background: ['#D4AF37', '#FDE68A', '#F59E0B', '#FBBF24'][i % 4], '--bx': `${Math.cos(angle * Math.PI / 180) * 15}px`, '--by': `${Math.sin(angle * Math.PI / 180) * 10}px`, animation: `runner-god-burst 1.8s ease-out ${i * 40}ms forwards`, zIndex: 42, pointerEvents: 'none' } as React.CSSProperties} />;
            })}

            {/* ══ SUN with rays / MOON ══ */}
            {!isGod ? (
                <div style={{ position: 'absolute', top: '4px', left: '10px', width: '20px', height: '20px', zIndex: 1 }}>
                    {/* Sun rays */}
                    <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', background: 'conic-gradient(from 0deg, transparent 0deg, #FFD93D20 5deg, transparent 10deg, transparent 30deg, #FFD93D15 35deg, transparent 40deg, transparent 60deg, #FFD93D20 65deg, transparent 70deg, transparent 90deg, #FFD93D15 95deg, transparent 100deg, transparent 120deg, #FFD93D20 125deg, transparent 130deg, transparent 150deg, #FFD93D15 155deg, transparent 160deg, transparent 180deg, #FFD93D20 185deg, transparent 190deg, transparent 210deg, #FFD93D15 215deg, transparent 220deg, transparent 240deg, #FFD93D20 245deg, transparent 250deg, transparent 270deg, #FFD93D15 275deg, transparent 280deg, transparent 300deg, #FFD93D20 305deg, transparent 310deg, transparent 330deg, #FFD93D15 335deg, transparent 340deg)', animation: 'rv2-sunrays 60s linear infinite' }} />
                    {/* Sun body */}
                    <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #FFFDE7, #FFD93D, #F59E0B)', boxShadow: '0 0 12px #FFD93D80, 0 0 24px #FFD93D40, 0 0 40px #FFD93D20' }} />
                </div>
            ) : (
                <div style={{ position: 'absolute', top: '6px', left: '14px', zIndex: 1 }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #F5F5F5, #D4D4D4, #A3A3A3)', boxShadow: '0 0 10px #E5E5E540, 0 0 20px #E5E5E520', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '0px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: '#0C1220' }} />
                        {/* Craters */}
                        <div style={{ position: 'absolute', top: '6px', left: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#B8B8B880' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '7px', width: '2px', height: '2px', borderRadius: '50%', background: '#B8B8B860' }} />
                    </div>
                </div>
            )}

            {/* ══ STARS (god mode) ══ */}
            {isGod && [
                { x: 6, y: 5, s: 1.5, d: 2.2 }, { x: 18, y: 18, s: 1, d: 3.1 }, { x: 30, y: 8, s: 2, d: 1.8 },
                { x: 42, y: 22, s: 1.2, d: 2.7 }, { x: 55, y: 6, s: 1.8, d: 3.5 }, { x: 65, y: 16, s: 1, d: 2.0 },
                { x: 75, y: 4, s: 1.5, d: 2.9 }, { x: 82, y: 20, s: 1.3, d: 1.6 }, { x: 90, y: 10, s: 2, d: 3.3 },
                { x: 12, y: 28, s: 1, d: 2.5 }, { x: 48, y: 12, s: 1.5, d: 3.8 }, { x: 72, y: 26, s: 1.2, d: 2.1 },
                { x: 35, y: 25, s: 0.8, d: 4.0 }, { x: 58, y: 28, s: 0.8, d: 3.0 }, { x: 88, y: 15, s: 1.0, d: 2.4 },
            ].map((s, i) => (
                <div key={`star-${i}`} style={{ position: 'absolute', top: `${s.y}px`, left: `${s.x}%`, width: `${s.s}px`, height: `${s.s}px`, borderRadius: '50%', background: i % 5 === 0 ? '#FDE68A' : i % 3 === 0 ? '#E0E7FF' : '#fff', animation: `runner-twinkle ${s.d}s ease-in-out ${i * 0.2}s infinite`, zIndex: 1 }} />
            ))}
            {shootingStar && <div key={shootingStar} style={{ position: 'absolute', top: '8px', right: '15px', width: '3px', height: '3px', borderRadius: '50%', background: '#FDE68A', boxShadow: '0 0 6px #D4AF37, 10px 2px 8px #D4AF3760, 22px 4px 12px #D4AF3730, 36px 6px 6px #D4AF3720', animation: 'runner-shooting-star 1.2s ease-in forwards', zIndex: 8, pointerEvents: 'none' }} />}

            {/* ══ CLOUDS (multi-circle puffs, parallax) ══ */}
            {!isGod && [
                { x: 8, y: 6, s: 0.7, sp: 50, w: 50 },
                { x: 32, y: 2, s: 1.0, sp: 38, w: 55 },
                { x: 58, y: 10, s: 0.6, sp: 55, w: 42 },
                { x: 80, y: 4, s: 0.85, sp: 42, w: 48 },
                { x: 50, y: 16, s: 0.5, sp: 60, w: 36 },
            ].map((c, ci) => (
                <div key={`cloud-${ci}`} style={{ position: 'absolute', top: `${c.y}px`, left: `${c.x}%`, transform: `scale(${c.s})`, animation: `runner-cloud-drift ${c.sp}s linear infinite`, zIndex: 1 }}>
                    <div style={{ position: 'relative', width: `${c.w}px`, height: '18px', filter: 'blur(0.3px)' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '0%', width: '40%', height: '75%', borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
                        <div style={{ position: 'absolute', bottom: '5%', left: '18%', width: '45%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.92)' }} />
                        <div style={{ position: 'absolute', bottom: '2%', left: '40%', width: '38%', height: '80%', borderRadius: '50%', background: 'rgba(255,255,255,0.88)' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: '55%', width: '35%', height: '65%', borderRadius: '50%', background: 'rgba(255,255,255,0.82)' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: '10%', width: '70%', height: '45%', borderRadius: '6px', background: 'rgba(255,255,255,0.8)' }} />
                    </div>
                </div>
            ))}

            {/* ══ FLOATING DUST MOTES ══ */}
            {!isGod && dustMotes.map((m, i) => (
                <div key={`mote-${i}`} style={{
                    position: 'absolute', top: `${m.y}px`, left: `${m.x}%`,
                    width: `${m.size}px`, height: `${m.size}px`, borderRadius: '50%',
                    background: '#fff',
                    '--mote-dx': `${m.dx}px`, '--mote-dy': `${m.dy}px`, '--mote-opacity': `${m.opacity}`,
                    animation: `rv2-dust-mote ${m.dur}s ease-in-out ${m.delay}s infinite`,
                    zIndex: 2, pointerEvents: 'none',
                } as React.CSSProperties} />
            ))}

            {/* ══ BIRDS (far, silhouette) ══ */}
            {!isGod && [{ x: 25, y: 14, s: 0.6 }, { x: 28, y: 12, s: 0.5 }].map((b, i) => (
                <div key={`bird-${i}`} style={{
                    position: 'absolute', top: `${b.y}px`, left: `${b.x}%`,
                    width: `${6 * b.s}px`, height: `${3 * b.s}px`,
                    borderTop: `${1.5 * b.s}px solid #00000025`,
                    borderLeft: `${3 * b.s}px solid transparent`, borderRight: `${3 * b.s}px solid transparent`,
                    borderBottom: 'none',
                    animation: `rv2-bird ${1 + i * 0.3}s ease-in-out ${i * 0.5}s infinite`,
                    zIndex: 2,
                }} />
            ))}

            {/* ══ FAR MOUNTAINS ══ */}
            <svg style={{ position: 'absolute', bottom: '22px', left: 0, width: '100%', height: '30px', zIndex: 2, opacity: isGod ? 0.3 : 0.15 }} viewBox="0 0 400 30" preserveAspectRatio="none">
                <path d={`M0,30 L20,18 L50,22 L80,10 L110,20 L140,6 L170,16 L200,12 L230,20 L260,8 L290,18 L320,14 L350,22 L380,10 L400,18 L400,30 Z`} fill={isGod ? '#1A2F48' : '#7CB98E'} />
            </svg>

            {/* ══ MID HILLS ══ */}
            <svg style={{ position: 'absolute', bottom: '18px', left: 0, width: '100%', height: '20px', zIndex: 3, opacity: isGod ? 0.4 : 0.25 }} viewBox="0 0 400 20" preserveAspectRatio="none">
                <path d={`M0,20 L30,12 L70,16 L120,8 L160,14 L200,10 L250,16 L300,6 L340,14 L380,10 L400,16 L400,20 Z`} fill={isGod ? '#2A4060' : '#5EAA6F'} />
            </svg>

            {/* ══ GROUND ══ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '22px',
                background: isGod
                    ? 'linear-gradient(180deg, #8B6914 0%, #A67C1A 30%, #C49B24 60%, #D4AF37 100%)'
                    : 'linear-gradient(180deg, #3D9B4F 0%, #2D8A3F 30%, #247832 60%, #1A6628 100%)',
                borderTop: isGod ? '2px solid #C49B24' : '2px solid #3D9B4F',
                transition: 'all 2s ease', zIndex: 4,
            }}>
                {/* Ground texture lines */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 24px, ${isGod ? 'rgba(255,215,0,0.08)' : 'rgba(0,0,0,0.04)'} 24px, ${isGod ? 'rgba(255,215,0,0.08)' : 'rgba(0,0,0,0.04)'} 26px)`, animation: `runner-ground-scroll ${walkSpeed * 8}s linear infinite` }} />
                {/* Path */}
                <div style={{ position: 'absolute', top: '5px', left: 0, right: 0, height: '3px', background: isGod ? 'rgba(255,215,0,0.2)' : 'rgba(139,90,43,0.15)', borderRadius: '2px' }} />
                <div style={{ position: 'absolute', top: '7px', left: 0, right: 0, height: '1px', background: isGod ? 'rgba(255,215,0,0.1)' : 'rgba(139,90,43,0.08)' }} />
            </div>

            {/* ══ GRASS BLADES ══ */}
            {!isGod && Array.from({ length: 16 }, (_, i) => {
                const h = 3 + (i % 4) * 1.5;
                return (
                    <div key={`grass-${i}`} style={{
                        position: 'absolute', bottom: '21px',
                        left: `${(i * 6.2) + ((i * 13 + 5) % 7) * 0.5}%`,
                        width: '1.5px', height: `${h}px`,
                        background: ['#2D8A3F', '#3D9B4F', '#4CAF50', '#388E3C'][i % 4],
                        borderRadius: '1px 1px 0 0',
                        transformOrigin: 'bottom center',
                        '--sway': `${3 + (i % 5) * 1.5}deg`,
                        animation: `runner-grass-sway ${1.8 + (i % 4) * 0.3}s ease-in-out ${i * 0.12}s infinite alternate`,
                        zIndex: 5,
                    } as React.CSSProperties} />
                );
            })}

            {/* ══ SMALL FLOWERS ══ */}
            {!isGod && [
                { x: 12, c: '#F472B6' }, { x: 33, c: '#FBBF24' }, { x: 55, c: '#A78BFA' },
                { x: 74, c: '#FB923C' }, { x: 91, c: '#F472B6' },
            ].map((f, i) => (
                <div key={`flower-${i}`} style={{ position: 'absolute', bottom: '22px', left: `${f.x}%`, width: '3px', height: '3px', borderRadius: '50%', background: f.c, boxShadow: `0 0 2px ${f.c}60`, zIndex: 5 }} />
            ))}

            {/* ══ START MARKER ══ */}
            <div style={{ position: 'absolute', bottom: '22px', left: '1.5%', zIndex: 6 }}>
                {/* Archway */}
                <div style={{ position: 'relative', width: '16px', height: '24px' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '3px', height: '24px', background: isGod ? 'linear-gradient(180deg, #DAA520, #8B6914)' : 'linear-gradient(180deg, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '3px', height: '24px', background: isGod ? 'linear-gradient(180deg, #DAA520, #8B6914)' : 'linear-gradient(180deg, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', top: 0, left: '-1px', right: '-1px', height: '5px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37)' : 'linear-gradient(180deg, #A0845C, #8B7355)', borderRadius: '3px 3px 1px 1px', boxShadow: isGod ? '0 0 6px #D4AF3740' : '0 1px 2px rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', fontSize: '4px', fontWeight: '900', letterSpacing: '0.5px', color: isGod ? '#FDE68A' : '#6B5B3A', whiteSpace: 'nowrap' }}>START</div>
                </div>
            </div>

            {/* ══ MILESTONE CRYSTALS ══ */}
            {milestones.map((m, i) => {
                const mx = (m.xp / maxXP) * 100;
                const cleared = xp >= m.xp;
                const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                const isLast = i === milestones.length - 1;
                return (
                    <div key={`ms-${i}`} style={{ position: 'absolute', bottom: '22px', left: `${Math.min(mx, 93)}%`, zIndex: 6 }}>
                        {/* Crystal pillar */}
                        <div style={{
                            width: '5px', height: cleared ? '14px' : '10px',
                            background: cleared
                                ? `linear-gradient(180deg, ${m.color}40, ${m.color}CC, ${m.color})`
                                : 'linear-gradient(180deg, #D6D3D140, #A8A29E80, #A8A29E)',
                            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                            transform: 'translateX(-50%)',
                            '--crystal-color': m.color,
                            transition: 'all 0.6s ease',
                            ...(cleared ? { animation: 'rv2-crystal-pulse 2.5s ease-in-out infinite' } : {}),
                        } as React.CSSProperties} />
                        {/* Crystal tip glow */}
                        {cleared && <div style={{
                            position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)',
                            width: '3px', height: '3px', borderRadius: '50%',
                            background: m.color, '--crystal-color': m.color,
                            animation: 'rv2-crystal-glow 2s ease-in-out infinite',
                        } as React.CSSProperties} />}
                        {/* Label */}
                        {(cleared || isNext || isLast) && (
                            <div style={{
                                position: 'absolute', top: cleared ? '-16px' : '-12px', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '5px', fontWeight: '800', whiteSpace: 'nowrap',
                                color: cleared ? m.color : '#A8A29E',
                                textShadow: cleared ? `0 0 6px ${m.color}60, 0 1px 2px rgba(0,0,0,0.3)` : 'none',
                                opacity: cleared ? 1 : 0.6,
                                letterSpacing: '0.3px',
                            }}>{m.title}</div>
                        )}
                    </div>
                );
            })}

            {/* ══ GOAL FLAG ══ */}
            <div style={{ position: 'absolute', bottom: '22px', right: '2.5%', zIndex: 6 }}>
                <div style={{ position: 'relative', width: '3px', height: '36px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37, #8B6914)' : 'linear-gradient(180deg, #78716C, #57534E, #44403C)', borderRadius: '2px 2px 0 0' }}>
                    {/* Ball top */}
                    <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: isGod ? 'radial-gradient(circle at 35% 35%, #FDE68A, #D4AF37)' : 'radial-gradient(circle at 35% 35%, #D4AF37, #B8960F)', boxShadow: isGod ? '0 0 8px #D4AF37, 0 0 16px #D4AF3740' : '0 0 4px #D4AF3740' }} />
                    {/* Pennant */}
                    <div style={{ position: 'absolute', top: '4px', left: '3px', width: '22px', height: '14px', background: isGod ? 'linear-gradient(135deg, #D4AF37, #FDE68A, #D4AF37)' : 'linear-gradient(135deg, #D4AF37, #F59E0B)', clipPath: 'polygon(0 0, 90% 10%, 75% 50%, 95% 90%, 0 100%)', animation: 'rv2-flag-wave 2.5s ease-in-out infinite', transformOrigin: 'left center', boxShadow: isGod ? '0 0 12px #D4AF3740' : 'none' }}>
                        {/* GOAL text on flag */}
                        <div style={{ fontSize: '5px', fontWeight: '900', color: isGod ? '#8B6914' : '#fff', letterSpacing: '1px', paddingTop: '3px', paddingLeft: '3px' }}>GOAL</div>
                    </div>
                </div>
            </div>

            {/* ══ CHARACTER ══ */}
            <div style={{
                position: 'absolute', bottom: '22px',
                left: isGod ? '50%' : `${4 + Math.min(progress * 88, 88)}%`,
                transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 10,
                animation: godCelebration ? 'rv2-god-arrive 2s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'rv2-float 3s ease-in-out infinite'
                    : `rv2-run-body ${walkSpeed}s ease-in-out infinite`,
            }}>
                {/* Ground shadow */}
                <div style={{
                    position: 'absolute', bottom: '-2px', left: '50%',
                    width: isGod ? '24px' : '16px', height: '4px',
                    background: isGod ? 'radial-gradient(ellipse, #D4AF3730, transparent)' : 'radial-gradient(ellipse, rgba(0,0,0,0.2), transparent)',
                    borderRadius: '50%',
                    animation: !isGod && !reaction ? `rv2-shadow-pulse ${walkSpeed}s ease-in-out infinite` : undefined,
                    transform: 'translateX(-50%)',
                }} />

                {/* Speed lines (high speed) */}
                {walkRatio >= 0.45 && !isGod && !reaction && [0, 1, 2].map(i => (
                    <div key={`speed-${i}`} style={{
                        position: 'absolute', top: `${6 + i * 8}px`, left: '-6px',
                        width: `${8 + (2 - i) * 3}px`, height: '1px',
                        background: `linear-gradient(90deg, transparent, ${charColor}40)`,
                        animation: `rv2-speed-line ${0.3 + i * 0.08}s ease-out ${i * 0.06}s infinite`,
                    }} />
                ))}

                {/* God aura */}
                {isGod && !reaction && <div style={{ position: 'absolute', top: '50%', left: '50%', width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #D4AF3750', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />}
                {isGod && [0, 1, 2].map(i => <div key={`orbit-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: '#FDE68A', borderRadius: '1px', transform: 'rotate(45deg)', animation: `runner-god-orbit ${2 + i * 0.5}s linear infinite`, animationDelay: `${i * 0.7}s`, zIndex: 15 }} />)}

                {/* Floating +N XP */}
                {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-36px', left: '50%', fontSize: reaction.points >= 15 ? '15px' : reaction.points >= 9 ? '13px' : '11px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `runner-xp-float ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 10px ${reaction.ringColor}80, 0 1px 3px rgba(0,0,0,0.4)`, zIndex: 20, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '8px', marginLeft: '2px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                {/* Energy particles */}
                {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const a = (i / reaction.energy) * 360; const d = 22 + (i % 3) * 10; const sx = Math.cos(a * Math.PI / 180) * d; const sy = Math.sin(a * Math.PI / 180) * d; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '4px' : '3px', height: reaction.points >= 10 ? '4px' : '3px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 4px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 30 + 100}ms`, pointerEvents: 'none', zIndex: 15 } as React.CSSProperties} />; })}
                {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-r${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${22 - ri * 4}px`, height: `${22 - ri * 4}px`, borderRadius: '50%', border: `${2 - ri * 0.5}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.35 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 14 }} />)}

                {/* Dust trail */}
                {walkRatio >= 0.03 && !isGod && !reaction && [0, 1, 2].map(i => <div key={`d${i}`} style={{ position: 'absolute', bottom: `${i * 2}px`, left: `${-3 - i * 3}px`, width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#A8A29E', opacity: walkRatio >= 0.3 ? 0.6 : 0.25, animation: `runner-dust ${0.3 + i * 0.1}s ease-out infinite`, animationDelay: `${i * 0.08}s` }} />)}

                {/* ── HEAD ── */}
                <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: `radial-gradient(circle at 38% 32%, ${charColor}EE, ${charColor}CC, ${charColor})`,
                    boxShadow: reaction ? `0 0 ${reaction.points >= 10 ? 16 : 6}px ${reaction.ringColor}90` : isGod ? '0 0 14px #D4AF3780, 0 0 28px #D4AF3740' : `0 1px 3px rgba(0,0,0,0.2)`,
                    position: 'relative', border: `1.5px solid ${charColor}`, margin: '0 auto',
                    transition: 'box-shadow 0.3s ease',
                }}>
                    {/* Hair */}
                    <div style={{ position: 'absolute', top: '-5px', left: '2px', width: '12px', height: '8px', borderRadius: '6px 6px 0 0', background: `linear-gradient(180deg, ${charColor}, ${charColor}BB)`, zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '-3px', right: '1px', width: '4px', height: '5px', borderRadius: '2px 4px 0 0', background: charColor, transform: 'rotate(15deg)', zIndex: -1 }} />
                    {/* Eyes */}
                    {reaction && reaction.points >= 6 ? (
                        <>{/* Happy closed eyes */}
                            <div style={{ position: 'absolute', top: '5px', left: '3px', width: '3px', height: '2px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 3px 3px' }} />
                            <div style={{ position: 'absolute', top: '5px', right: '3px', width: '3px', height: '2px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 3px 3px' }} />
                        </>
                    ) : (
                        <>{/* Normal eyes with pupils */}
                            <div style={{ position: 'absolute', top: '5px', left: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '0.5px', right: '0px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                            </div>
                            <div style={{ position: 'absolute', top: '5px', right: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '0.5px', right: '0px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                            </div>
                        </>
                    )}
                    {/* Blush */}
                    {(isGod || (reaction && reaction.points >= 3)) && <>
                        <div style={{ position: 'absolute', top: '8px', left: '1px', width: '3px', height: '2px', borderRadius: '50%', background: '#FF9999', opacity: 0.4 }} />
                        <div style={{ position: 'absolute', top: '8px', right: '1px', width: '3px', height: '2px', borderRadius: '50%', background: '#FF9999', opacity: 0.4 }} />
                    </>}
                    {/* Mouth */}
                    {(isGod || (reaction && reaction.points >= 3)) ? (
                        <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '5px', height: '2.5px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 3px 3px' }} />
                    ) : (
                        <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '1px', borderRadius: '50%', background: '#fff', opacity: 0.6 }} />
                    )}
                </div>
                {/* ── BODY ── */}
                <div style={{ width: '12px', height: '10px', borderRadius: '4px 4px 2px 2px', background: `linear-gradient(180deg, ${charColor} 0%, ${charColor}CC 100%)`, margin: '-2px auto 0', border: `1px solid ${charColor}`, position: 'relative' }}>
                    {/* Arms */}
                    <div style={{ position: 'absolute', top: '1px', left: '-4px', width: '4px', height: '7px', background: charColor, borderRadius: '2px', transformOrigin: 'top center', animation: !isGod && !reaction ? `rv2-arm-left ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${charColor}` }} />
                    <div style={{ position: 'absolute', top: '1px', right: '-4px', width: '4px', height: '7px', background: charColor, borderRadius: '2px', transformOrigin: 'top center', animation: !isGod && !reaction ? `rv2-arm-right ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${charColor}` }} />
                </div>
                {/* ── LEGS ── */}
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-1px' }}>
                    <div style={{ width: '4px', height: '7px', background: charColor, borderRadius: '1px 1px 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `rv2-leg-left ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                    <div style={{ width: '4px', height: '7px', background: charColor, borderRadius: '1px 1px 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `rv2-leg-right ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                </div>
            </div>

            {/* ══ PROGRESS BAR ══ */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px', background: isGod ? 'linear-gradient(90deg, #8B6914, #D4AF37, #FDE68A, #D4AF37)' : `linear-gradient(90deg, ${charColor}66, ${charColor})`, transition: 'width 0.8s ease', zIndex: 8 }} />

            {/* ══ SCORE OVERLAY ══ */}
            <div style={{ position: 'absolute', top: '4px', right: '8px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 12 }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: dailyTitle.color, background: isGod ? 'rgba(12,18,32,0.88)' : 'rgba(255,255,255,0.92)', padding: '2px 7px', borderRadius: '5px', border: `1px solid ${dailyTitle.color}30`, backdropFilter: 'blur(6px)', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>{dailyTitle.title}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917', background: isGod ? 'rgba(12,18,32,0.88)' : 'rgba(255,255,255,0.92)', padding: '2px 7px', borderRadius: '5px', backdropFilter: 'blur(6px)', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>{xp} / {goalXP}</div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MINI RUNNER V3 — ULTRA PREMIUM: time-of-day, parallax, particles
// ═══════════════════════════════════════════════════════

// Sky palette driven by walkRatio (0→1 = dawn→noon→sunset→night)
function getV3Sky(ratio: number, isGod: boolean) {
    if (isGod) return {
        bg: 'linear-gradient(180deg, #05080F 0%, #0A1628 20%, #122244 45%, #1A3355 70%, #0F1E36 100%)',
        sunColor: '#E8E8E8', sunGlow: '#E8E8E840', groundTop: '#6B5B1A', groundBot: '#8B7620',
        grassColor: '#4A6B2A', hillFar: '#0F1E36', hillMid: '#1A3355', treeColor: '#1A3355',
    };
    if (ratio < 0.15) return { // Dawn
        bg: 'linear-gradient(180deg, #2D1B4E 0%, #6B3A7D 18%, #C06080 38%, #E8996B 58%, #F0C987 78%, #F5DEB3 100%)',
        sunColor: '#FF8C42', sunGlow: '#FF8C4260', groundTop: '#2D6B3F', groundBot: '#1A5C30',
        grassColor: '#3D8B4F', hillFar: '#5A3A6D', hillMid: '#7A5060', treeColor: '#2A5A3A',
    };
    if (ratio < 0.4) return { // Morning
        bg: 'linear-gradient(180deg, #3A7BD5 0%, #5BA3E8 20%, #7BC0F0 42%, #A8DCF8 65%, #D4F0FF 82%, #FFF5E6 100%)',
        sunColor: '#FFD93D', sunGlow: '#FFD93D80', groundTop: '#3D9B4F', groundBot: '#247832',
        grassColor: '#4CAF50', hillFar: '#7CB98E', hillMid: '#5EAA6F', treeColor: '#2E7D42',
    };
    if (ratio < 0.7) return { // Noon
        bg: 'linear-gradient(180deg, #1E6FD9 0%, #3A8DE8 18%, #5AAAF0 38%, #80C8F8 60%, #B0E0FF 80%, #E8F4FF 100%)',
        sunColor: '#FFF176', sunGlow: '#FFF17660', groundTop: '#4CAF50', groundBot: '#2E7D42',
        grassColor: '#66BB6A', hillFar: '#81C784', hillMid: '#4CAF50', treeColor: '#388E3C',
    };
    return { // Sunset
        bg: 'linear-gradient(180deg, #1A1A4E 0%, #3D2B6B 15%, #7A3B6D 32%, #C05070 50%, #E88050 68%, #F0B860 85%, #FFD580 100%)',
        sunColor: '#FF6B35', sunGlow: '#FF6B3560', groundTop: '#5A6B2A', groundBot: '#4A5B20',
        grassColor: '#6B8B4F', hillFar: '#4A2D5E', hillMid: '#6A3B55', treeColor: '#3A5530',
    };
}

function MiniRunnerV3Stage({ xp, goalXP }: { xp: number; goalXP: number }) {
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(xp >= goalXP);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(xp / maxXP, 1);
    const isGod = xp >= goalXP;
    const walkRatio = xp / goalXP;
    const walkSpeed = walkRatio >= 0.666 ? 0.22 : walkRatio >= 0.268 ? 0.32 : walkRatio >= 0.055 ? 0.45 : 0.65;
    const sky = getV3Sky(walkRatio, isGod);

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const charColor = dailyTitle.color;
    const charGlow = isGod ? '0 0 18px #D4AF3790, 0 0 36px #D4AF3750' : `0 1px 4px rgba(0,0,0,0.25)`;

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 3000); }
            prevXpRef.current = xp; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp; prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    // Sun position: arcs across sky based on ratio
    const sunAngle = Math.min(walkRatio, 1) * 150 + 15; // 15° to 165°
    const sunX = 50 - Math.cos(sunAngle * Math.PI / 180) * 42;
    const sunY = 50 - Math.sin(sunAngle * Math.PI / 180) * 38;

    return (
        <div style={{
            height: '120px', position: 'relative', overflow: 'hidden',
            background: sky.bg, transition: 'background 2.5s ease',
        }}>
            {/* ══ GOD CELEBRATION ══ */}
            {godCelebration && <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'radial-gradient(circle, #D4AF37CC, #FDE68A66, transparent 70%)', animation: 'runner-god-flash 3s ease-out forwards', pointerEvents: 'none' }} />}
            {godCelebration && <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 55, fontSize: '24px', fontWeight: '900', color: '#FDE68A', textShadow: '0 0 40px #D4AF37, 0 0 80px #D4AF3780, 0 3px 8px rgba(0,0,0,0.7)', letterSpacing: '8px', whiteSpace: 'nowrap', animation: 'runner-god-title 3s ease-out forwards', pointerEvents: 'none' }}>本日の神</div>}
            {godCelebration && Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * 360;
                return <div key={`burst-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: i % 3 === 0 ? '5px' : '3px', height: i % 3 === 0 ? '5px' : '3px', borderRadius: i % 2 === 0 ? '1px' : '50%', background: ['#D4AF37', '#FDE68A', '#F59E0B', '#FBBF24', '#FFE082'][i % 5], '--bx': `${Math.cos(angle * Math.PI / 180) * 18}px`, '--by': `${Math.sin(angle * Math.PI / 180) * 12}px`, animation: `runner-god-burst 2s ease-out ${i * 35}ms forwards`, zIndex: 52, pointerEvents: 'none' } as React.CSSProperties} />;
            })}

            {/* ══ AURORA (god) ══ */}
            {isGod && <>
                <div style={{ position: 'absolute', top: 0, left: '-10%', right: '-10%', height: '50%', background: 'linear-gradient(90deg, transparent 0%, #4ADE8020 20%, #10B98130 40%, #D4AF3720 60%, #A78BFA25 80%, transparent 100%)', animation: 'v3-aurora 8s ease-in-out infinite', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '5%', left: '-10%', right: '-10%', height: '35%', background: 'linear-gradient(90deg, transparent 0%, #A78BFA18 25%, #D4AF3718 50%, #10B98118 75%, transparent 100%)', animation: 'v3-aurora 12s ease-in-out 2s infinite', zIndex: 1 }} />
            </>}

            {/* ══ STARS (god / sunset) ══ */}
            {(isGod || walkRatio >= 0.7) && Array.from({ length: isGod ? 25 : 8 }, (_, i) => {
                const sx = (i * 37 + 13) % 97; const sy = (i * 23 + 7) % 45;
                const ss = 1 + (i % 3) * 0.7; const sd = 1.5 + (i % 5) * 0.8;
                return <div key={`star-${i}`} style={{
                    position: 'absolute', top: `${sy}px`, left: `${sx}%`,
                    width: `${ss}px`, height: `${ss}px`,
                    background: i % 7 === 0 ? '#FDE68A' : i % 5 === 0 ? '#C4B5FD' : '#fff',
                    borderRadius: '50%',
                    animation: `v3-star-twinkle ${sd}s ease-in-out ${i * 0.15}s infinite`,
                    zIndex: 1, opacity: isGod ? 1 : 0.5,
                }} />;
            })}

            {/* ══ CELESTIAL BODY (sun arc / moon) ══ */}
            {!isGod ? (
                <div style={{
                    position: 'absolute', top: `${sunY}%`, left: `${sunX}%`,
                    width: '22px', height: '22px', zIndex: 2,
                    transition: 'top 2s ease, left 2s ease',
                }}>
                    {/* Rays */}
                    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
                        <div key={`ray-${i}`} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            width: '2px', height: walkRatio > 0.3 ? '28px' : '18px',
                            background: `linear-gradient(180deg, ${sky.sunColor}30, transparent)`,
                            transformOrigin: '50% 0%',
                            '--ray-angle': `${angle}deg`, '--ray-max': `${walkRatio > 0.3 ? 0.2 : 0.1}`,
                            animation: `v3-light-ray ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                        } as React.CSSProperties} />
                    ))}
                    {/* Sun body */}
                    <div style={{
                        position: 'absolute', inset: '3px', borderRadius: '50%',
                        background: `radial-gradient(circle at 35% 35%, #FFFDE7, ${sky.sunColor})`,
                        '--glow': sky.sunGlow,
                        animation: 'v3-celestial-glow 4s ease-in-out infinite',
                        boxShadow: `0 0 14px ${sky.sunGlow}, 0 0 30px ${sky.sunGlow}`,
                    } as React.CSSProperties} />
                </div>
            ) : (
                <div style={{ position: 'absolute', top: '8px', left: '80%', zIndex: 2, '--glow': '#E8E8E840', animation: 'v3-celestial-glow 5s ease-in-out infinite' } as React.CSSProperties}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #F5F5F5, #D4D4D4, #A3A3A3)', boxShadow: '0 0 12px #E8E8E840', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-1px', right: '-2px', width: '14px', height: '14px', borderRadius: '50%', background: '#0A1628' }} />
                        <div style={{ position: 'absolute', top: '7px', left: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#B8B8B860' }} />
                        <div style={{ position: 'absolute', top: '11px', left: '8px', width: '2px', height: '2px', borderRadius: '50%', background: '#B8B8B840' }} />
                    </div>
                </div>
            )}

            {/* ══ CLOUDS — doubled width for seamless loop ══ */}
            {!isGod && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '55px', zIndex: 2, animation: `v3-cloud-drift-far ${walkRatio > 0.3 ? 60 : 90}s linear infinite` }}>
                    {[
                        { x: 5, y: 6, s: 0.8 }, { x: 22, y: 2, s: 1.1 }, { x: 40, y: 10, s: 0.65 },
                        { x: 58, y: 4, s: 0.9 }, { x: 75, y: 12, s: 0.7 }, { x: 90, y: 3, s: 1.0 },
                    ].map((c, ci) => (
                        <div key={`cf-${ci}`} style={{ position: 'absolute', top: `${c.y}px`, left: `${c.x}%`, transform: `scale(${c.s})` }}>
                            <div style={{ position: 'relative', width: '52px', height: '18px', filter: 'blur(0.5px)' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: '0%', width: '38%', height: '72%', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
                                <div style={{ position: 'absolute', bottom: '4%', left: '16%', width: '44%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />
                                <div style={{ position: 'absolute', bottom: '2%', left: '38%', width: '40%', height: '82%', borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '56%', width: '32%', height: '60%', borderRadius: '50%', background: 'rgba(255,255,255,0.75)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '8%', width: '72%', height: '38%', borderRadius: '6px', background: 'rgba(255,255,255,0.7)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ══ FAR MOUNTAINS (parallax layer 1) ══ */}
            <div style={{ position: 'absolute', bottom: '28px', left: 0, width: '200%', height: '35px', zIndex: 3, animation: `v3-parallax-1 ${walkRatio > 0.1 ? 80 : 200}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 35" preserveAspectRatio="none">
                    <path d="M0,35 L15,22 L40,28 L70,14 L105,24 L130,8 L160,20 L195,15 L225,26 L255,10 L290,22 L320,16 L355,28 L385,12 L415,22 L440,28 L470,14 L505,24 L530,8 L560,20 L595,15 L625,26 L655,10 L690,22 L720,16 L755,28 L785,12 L800,18 L800,35 Z"
                        fill={sky.hillFar} opacity={isGod ? 0.4 : 0.2} />
                </svg>
            </div>

            {/* ══ MID HILLS (parallax layer 2) ══ */}
            <div style={{ position: 'absolute', bottom: '24px', left: 0, width: '200%', height: '25px', zIndex: 4, animation: `v3-parallax-2 ${walkRatio > 0.1 ? 55 : 140}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 25" preserveAspectRatio="none">
                    <path d="M0,25 L25,16 L60,20 L100,10 L140,18 L180,7 L220,15 L260,12 L300,20 L340,8 L380,16 L420,11 L460,20 L500,10 L540,18 L580,7 L620,15 L660,12 L700,20 L740,8 L780,16 L800,12 L800,25 Z"
                        fill={sky.hillMid} opacity={isGod ? 0.5 : 0.3} />
                </svg>
            </div>

            {/* ══ TREES (parallax layer 3) ══ */}
            <div style={{ position: 'absolute', bottom: '24px', left: 0, width: '200%', height: '18px', zIndex: 5, animation: `v3-parallax-3 ${walkRatio > 0.1 ? 40 : 100}s linear infinite` }}>
                {Array.from({ length: 20 }, (_, i) => {
                    const tx = i * 5 + ((i * 13) % 3);
                    const th = 8 + (i % 4) * 3;
                    const tw = 3 + (i % 3);
                    return (
                        <div key={`tree-${i}`} style={{
                            position: 'absolute', bottom: 0, left: `${tx}%`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            '--sway': `${1 + (i % 3)}deg`,
                            animation: `v3-tree-sway ${3 + (i % 4) * 0.8}s ease-in-out ${i * 0.2}s infinite`,
                            transformOrigin: 'bottom center',
                        } as React.CSSProperties}>
                            {/* Canopy */}
                            <div style={{
                                width: `${tw + 4}px`, height: `${th - 2}px`,
                                background: sky.treeColor,
                                clipPath: i % 3 === 0
                                    ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
                                    : i % 3 === 1
                                    ? 'ellipse(50% 50% at 50% 60%)'
                                    : 'polygon(50% 0%, 85% 40%, 100% 100%, 0% 100%, 15% 40%)',
                                opacity: 0.6,
                            }} />
                            {/* Trunk */}
                            <div style={{ width: '1.5px', height: '3px', background: isGod ? '#4A3A1A' : '#5D4037', opacity: 0.5 }} />
                        </div>
                    );
                })}
            </div>

            {/* ══ PARTICLES (leaves / fireflies) ══ */}
            {!isGod && walkRatio >= 0.05 && Array.from({ length: 5 }, (_, i) => {
                const lx = 10 + i * 18; const ly = 20 + (i % 3) * 15;
                return <div key={`leaf-${i}`} style={{
                    position: 'absolute', top: `${ly}px`, left: `${lx}%`,
                    width: '4px', height: '3px',
                    background: walkRatio > 0.7 ? '#FF8C42' : walkRatio > 0.4 ? '#66BB6A' : '#81C784',
                    borderRadius: '0 50% 50% 0',
                    '--leaf-dx': `${-40 - i * 10}px`, '--leaf-dy': `${15 + (i % 3) * 8}px`,
                    '--leaf-rot': `${180 + i * 72}deg`, '--leaf-op': '0.6',
                    animation: `v3-leaf ${3 + i * 0.8}s ease-in-out ${i * 1.2}s infinite`,
                    zIndex: 6, pointerEvents: 'none',
                } as React.CSSProperties} />;
            })}
            {isGod && Array.from({ length: 10 }, (_, i) => {
                const fx = (i * 11 + 5) % 95; const fy = 10 + (i * 17 + 3) % 50;
                return <div key={`ff-${i}`} style={{
                    position: 'absolute', top: `${fy}px`, left: `${fx}%`,
                    width: '2px', height: '2px', borderRadius: '50%',
                    background: i % 3 === 0 ? '#FDE68A' : i % 3 === 1 ? '#A78BFA' : '#10B981',
                    '--ff-dx': `${(i % 2 === 0 ? 6 : -6)}px`, '--ff-dy': `${-4 - (i % 3) * 3}px`, '--ff-op': '0.7',
                    animation: `v3-firefly ${2 + (i % 4) * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                    zIndex: 6,
                } as React.CSSProperties} />;
            })}

            {/* ══ GROUND ══ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '26px',
                background: `linear-gradient(180deg, ${sky.groundTop} 0%, ${sky.groundBot} 100%)`,
                borderTop: `2px solid ${sky.groundTop}`,
                transition: 'all 2.5s ease', zIndex: 7,
            }}>
                {/* Scrolling texture */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 19px, transparent 19px, transparent 36px, rgba(255,255,255,0.03) 36px, rgba(255,255,255,0.03) 37px)`,
                    animation: `v3-ground-scroll ${walkSpeed * 6}s linear infinite`,
                }} />
                {/* Path lines */}
                <div style={{ position: 'absolute', top: '6px', left: 0, right: 0, height: '4px', background: isGod ? 'rgba(212,175,55,0.15)' : 'rgba(139,90,43,0.12)', borderRadius: '2px' }} />
                <div style={{ position: 'absolute', top: '8px', left: 0, right: 0, height: '1px', background: isGod ? 'rgba(212,175,55,0.08)' : 'rgba(139,90,43,0.06)' }} />
                {/* Pebbles */}
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={`peb-${i}`} style={{
                        position: 'absolute', top: `${12 + (i % 3) * 3}px`, left: `${(i * 12.5 + 3) % 100}%`,
                        width: `${2 + (i % 2)}px`, height: '1.5px', borderRadius: '50%',
                        background: isGod ? 'rgba(212,175,55,0.2)' : 'rgba(0,0,0,0.08)',
                    }} />
                ))}
            </div>

            {/* ══ GRASS BLADES ══ */}
            {Array.from({ length: 20 }, (_, i) => {
                const h = 3 + (i % 5) * 1.8;
                return (
                    <div key={`g-${i}`} style={{
                        position: 'absolute', bottom: '25px',
                        left: `${(i * 5) + ((i * 11 + 3) % 5) * 0.6}%`,
                        width: '1.5px', height: `${h}px`,
                        background: [sky.grassColor, `${sky.grassColor}CC`, `${sky.grassColor}AA`, sky.groundTop][i % 4],
                        borderRadius: '1px 1px 0 0',
                        transformOrigin: 'bottom center',
                        '--sway': `${2 + (i % 6) * 1.2}deg`,
                        animation: `runner-grass-sway ${1.6 + (i % 5) * 0.25}s ease-in-out ${i * 0.1}s infinite alternate`,
                        zIndex: 8,
                    } as React.CSSProperties} />
                );
            })}

            {/* ══ FLOWERS ══ */}
            {!isGod && [
                { x: 8, c: '#F472B6', s: 3 }, { x: 21, c: '#FBBF24', s: 2.5 },
                { x: 38, c: '#A78BFA', s: 3 }, { x: 52, c: '#FB923C', s: 2 },
                { x: 67, c: '#F472B6', s: 2.5 }, { x: 82, c: '#60A5FA', s: 3 },
                { x: 94, c: '#FBBF24', s: 2 },
            ].map((f, i) => (
                <div key={`fl-${i}`} style={{
                    position: 'absolute', bottom: '26px', left: `${f.x}%`, zIndex: 8,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                    <div style={{ width: `${f.s}px`, height: `${f.s}px`, borderRadius: '50%', background: f.c, boxShadow: `0 0 3px ${f.c}40` }} />
                    <div style={{ width: '1px', height: '3px', background: sky.grassColor, opacity: 0.6 }} />
                </div>
            ))}

            {/* ══ START GATE ══ */}
            <div style={{ position: 'absolute', bottom: '26px', left: '1%', zIndex: 9 }}>
                <div style={{ position: 'relative', width: '20px', height: '32px' }}>
                    {/* Pillars */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '3px', height: '32px', background: isGod ? 'linear-gradient(180deg, #DAA520, #8B6914)' : 'linear-gradient(180deg, #A0845C, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '3px', height: '32px', background: isGod ? 'linear-gradient(180deg, #DAA520, #8B6914)' : 'linear-gradient(180deg, #A0845C, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    {/* Cross bar */}
                    <div style={{ position: 'absolute', top: 0, left: '-2px', right: '-2px', height: '6px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37)' : 'linear-gradient(180deg, #B8996E, #8B7355)', borderRadius: '4px 4px 2px 2px', boxShadow: isGod ? '0 0 8px #D4AF3740' : '0 1px 3px rgba(0,0,0,0.2)' }} />
                    {/* Decorative balls */}
                    <div style={{ position: 'absolute', top: '-3px', left: '-1px', width: '5px', height: '5px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    <div style={{ position: 'absolute', top: '-3px', right: '-1px', width: '5px', height: '5px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    {/* Label */}
                    <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', fontSize: '4.5px', fontWeight: '900', letterSpacing: '0.5px', color: isGod ? '#FDE68A' : '#6B5B3A', whiteSpace: 'nowrap' }}>START</div>
                </div>
            </div>

            {/* ══ MILESTONE TOWERS ══ */}
            {milestones.map((m, i) => {
                const mx = (m.xp / maxXP) * 100;
                const cleared = xp >= m.xp;
                const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                return (
                    <div key={`ms-${i}`} style={{ position: 'absolute', bottom: '26px', left: `${Math.min(mx, 92)}%`, zIndex: 9 }}>
                        {/* Tower base */}
                        <div style={{
                            width: '6px', height: cleared ? '18px' : '12px',
                            background: cleared
                                ? `linear-gradient(180deg, ${m.color}60, ${m.color}CC, ${m.color})`
                                : 'linear-gradient(180deg, #D6D3D140, #A8A29E60, #A8A29E)',
                            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                            transform: 'translateX(-50%)',
                            transition: 'all 0.6s ease',
                        }} />
                        {/* Beacon orb */}
                        <div style={{
                            position: 'absolute', top: cleared ? '-5px' : '-3px', left: '50%', transform: 'translateX(-50%)',
                            width: cleared ? '5px' : '3px', height: cleared ? '5px' : '3px', borderRadius: '50%',
                            background: cleared ? m.color : '#A8A29E',
                            '--beacon': m.color,
                            animation: cleared ? 'v3-beacon 2s ease-in-out infinite' : 'none',
                        } as React.CSSProperties} />
                        {/* Beacon ray upward */}
                        {cleared && <div style={{
                            position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)',
                            width: '1px', height: '16px',
                            background: `linear-gradient(180deg, transparent, ${m.color}60)`,
                            '--beacon': m.color,
                            animation: 'v3-beacon-ray 3s ease-in-out infinite',
                        } as React.CSSProperties} />}
                        {/* Label */}
                        {(cleared || isNext) && (
                            <div style={{
                                position: 'absolute', top: cleared ? '-28px' : '-16px', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '5.5px', fontWeight: '800', whiteSpace: 'nowrap',
                                color: cleared ? m.color : '#A8A29E',
                                textShadow: cleared ? `0 0 8px ${m.color}60, 0 1px 2px rgba(0,0,0,0.4)` : '0 1px 2px rgba(0,0,0,0.3)',
                                opacity: cleared ? 1 : 0.6,
                                letterSpacing: '0.3px',
                            }}>{m.title}</div>
                        )}
                    </div>
                );
            })}

            {/* ══ GOAL FLAG ══ */}
            <div style={{ position: 'absolute', bottom: '26px', right: '2%', zIndex: 9 }}>
                <div style={{ position: 'relative', width: '3px', height: '42px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37, #8B6914)' : 'linear-gradient(180deg, #78716C, #57534E, #44403C)', borderRadius: '2px 2px 0 0' }}>
                    {/* Gold ball */}
                    <div style={{ position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: isGod ? 'radial-gradient(circle at 35% 35%, #FDE68A, #D4AF37)' : 'radial-gradient(circle at 35% 35%, #D4AF37, #B8960F)', boxShadow: isGod ? '0 0 10px #D4AF37, 0 0 20px #D4AF3740' : '0 0 4px #D4AF3740' }} />
                    {/* Pennant */}
                    <div style={{
                        position: 'absolute', top: '5px', left: '3px', width: '26px', height: '16px',
                        background: isGod ? 'linear-gradient(135deg, #D4AF37, #FDE68A, #D4AF37)' : 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                        clipPath: 'polygon(0 0, 88% 8%, 72% 50%, 92% 92%, 0 100%)',
                        animation: 'v3-flag 2s ease-in-out infinite',
                        transformOrigin: 'left center',
                        boxShadow: isGod ? '0 0 14px #D4AF3740' : 'none',
                    }}>
                        <div style={{ fontSize: '5.5px', fontWeight: '900', color: isGod ? '#8B6914' : '#fff', letterSpacing: '1.2px', paddingTop: '4px', paddingLeft: '3px' }}>GOAL</div>
                    </div>
                    {/* Distance marker */}
                    <div style={{ position: 'absolute', top: '-14px', left: '-2px', fontSize: '5px', fontWeight: '700', color: isGod ? '#FDE68A80' : '#78716C80', whiteSpace: 'nowrap' }}>{goalXP}</div>
                </div>
            </div>

            {/* ══ CHARACTER ══ */}
            <div style={{
                position: 'absolute', bottom: '26px',
                left: isGod ? '50%' : `${4 + Math.min(progress * 88, 88)}%`,
                transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 15,
                animation: godCelebration ? 'v3-god-ascend 3s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'v3-god-float 3s ease-in-out infinite'
                    : `v3-run-body ${walkSpeed}s ease-in-out infinite`,
            }}>
                {/* Ground shadow */}
                <div style={{
                    position: 'absolute', bottom: '-3px', left: '50%',
                    width: isGod ? '28px' : '18px', height: '5px',
                    background: isGod ? 'radial-gradient(ellipse, #D4AF3730, transparent)' : 'radial-gradient(ellipse, rgba(0,0,0,0.2), transparent)',
                    borderRadius: '50%',
                    animation: !isGod && !reaction ? `v3-shadow ${walkSpeed}s ease-in-out infinite` : undefined,
                    transform: 'translateX(-50%)',
                }} />

                {/* Speed lines */}
                {walkRatio >= 0.4 && !isGod && !reaction && [0, 1, 2, 3].map(i => (
                    <div key={`sp-${i}`} style={{
                        position: 'absolute', top: `${4 + i * 7}px`, left: '-8px',
                        width: `${10 + (3 - i) * 3}px`, height: '1.5px',
                        background: `linear-gradient(90deg, transparent, ${charColor}50)`,
                        animation: `v3-speed ${0.25 + i * 0.06}s ease-out ${i * 0.05}s infinite`,
                    }} />
                ))}

                {/* God aura + orbiting particles */}
                {isGod && !reaction && <>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #D4AF3740', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #D4AF3720', animation: 'runner-god-aura 2.5s ease-in-out 0.5s infinite', pointerEvents: 'none', zIndex: -1 }} />
                </>}
                {isGod && [0, 1, 2, 3].map(i => <div key={`orb-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: i % 2 === 0 ? '#FDE68A' : '#A78BFA', borderRadius: i % 2 === 0 ? '1px' : '50%', transform: 'rotate(45deg)', animation: `runner-god-orbit ${1.8 + i * 0.4}s linear infinite`, animationDelay: `${i * 0.5}s`, zIndex: 16 }} />)}

                {/* +XP float */}
                {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-40px', left: '50%', fontSize: reaction.points >= 15 ? '16px' : reaction.points >= 9 ? '14px' : '12px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `v3-xp-pop ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 12px ${reaction.ringColor}80, 0 2px 4px rgba(0,0,0,0.5)`, zIndex: 20, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '9px', marginLeft: '2px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                {/* Energy particles */}
                {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const a = (i / reaction.energy) * 360; const d = 24 + (i % 3) * 12; const sx = Math.cos(a * Math.PI / 180) * d; const sy = Math.sin(a * Math.PI / 180) * d; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '5px' : '3px', height: reaction.points >= 10 ? '5px' : '3px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 5px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 25 + 80}ms`, pointerEvents: 'none', zIndex: 16 } as React.CSSProperties} />; })}
                {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-r${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${24 - ri * 4}px`, height: `${24 - ri * 4}px`, borderRadius: '50%', border: `${2 - ri * 0.4}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.3 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 14 }} />)}

                {/* Dust kicks */}
                {walkRatio >= 0.03 && !isGod && !reaction && [0, 1, 2, 3].map(i => <div key={`dk-${i}`} style={{ position: 'absolute', bottom: `${i * 2}px`, left: `${-4 - i * 3}px`, width: '3px', height: '3px', borderRadius: '50%', background: '#A8A29E', opacity: walkRatio >= 0.3 ? 0.55 : 0.2, '--dust-dx': `${-6 - i * 4}px`, '--dust-dy': `${-2 - (i % 2) * 3}px`, animation: `v3-dust-kick ${0.3 + i * 0.08}s ease-out infinite`, animationDelay: `${i * 0.07}s` } as React.CSSProperties} />)}

                {/* Cape (god mode) */}
                {isGod && (
                    <div style={{
                        position: 'absolute', top: '18px', left: '-6px',
                        width: '10px', height: '16px',
                        background: 'linear-gradient(180deg, #D4AF37CC, #D4AF3780, #D4AF3740)',
                        clipPath: 'polygon(60% 0%, 100% 15%, 90% 55%, 100% 100%, 0% 85%, 10% 40%)',
                        transformOrigin: 'top right',
                        animation: 'v3-cape 2s ease-in-out infinite',
                        zIndex: -1,
                    }} />
                )}

                {/* ── HEAD ── */}
                <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: `radial-gradient(circle at 38% 30%, ${charColor}EE, ${charColor}CC, ${charColor}AA)`,
                    boxShadow: reaction ? `0 0 ${reaction.points >= 10 ? 18 : 8}px ${reaction.ringColor}90` : charGlow,
                    position: 'relative', border: `1.5px solid ${charColor}`, margin: '0 auto',
                    transition: 'box-shadow 0.3s ease',
                }}>
                    {/* Hair with bounce */}
                    <div style={{
                        position: 'absolute', top: '-6px', left: '1px', width: '16px', height: '10px',
                        borderRadius: '8px 8px 2px 2px',
                        background: `linear-gradient(180deg, ${charColor}, ${charColor}CC)`,
                        zIndex: -1,
                        transformOrigin: 'bottom center',
                        animation: !isGod && !reaction ? `v3-hair-bounce ${walkSpeed}s ease-in-out infinite` : 'none',
                    }} />
                    {/* Hair highlight */}
                    <div style={{ position: 'absolute', top: '-4px', left: '4px', width: '6px', height: '4px', borderRadius: '3px', background: 'rgba(255,255,255,0.15)' }} />
                    {/* Spike */}
                    <div style={{ position: 'absolute', top: '-4px', right: '0px', width: '5px', height: '6px', borderRadius: '2px 5px 0 0', background: charColor, transform: 'rotate(18deg)', zIndex: -1 }} />
                    {/* Eyes */}
                    {reaction && reaction.points >= 6 ? (
                        <>{/* Happy closed eyes */}
                            <div style={{ position: 'absolute', top: '6px', left: '3px', width: '3.5px', height: '2px', borderBottom: '2px solid #fff', borderRadius: '0 0 3px 3px' }} />
                            <div style={{ position: 'absolute', top: '6px', right: '3px', width: '3.5px', height: '2px', borderBottom: '2px solid #fff', borderRadius: '0 0 3px 3px' }} />
                        </>
                    ) : (
                        <>{/* Eyes with highlight */}
                            <div style={{ position: 'absolute', top: '5px', left: '3px', width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2px', height: '2px', borderRadius: '50%', background: '#1a1a2e' }} />
                                <div style={{ position: 'absolute', top: '0px', left: '0px', width: '1px', height: '1px', borderRadius: '50%', background: '#fff', opacity: 0.8 }} />
                            </div>
                            <div style={{ position: 'absolute', top: '5px', right: '3px', width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2px', height: '2px', borderRadius: '50%', background: '#1a1a2e' }} />
                                <div style={{ position: 'absolute', top: '0px', left: '0px', width: '1px', height: '1px', borderRadius: '50%', background: '#fff', opacity: 0.8 }} />
                            </div>
                        </>
                    )}
                    {/* Blush */}
                    {(isGod || (reaction && reaction.points >= 3)) && <>
                        <div style={{ position: 'absolute', top: '9px', left: '1px', width: '3.5px', height: '2px', borderRadius: '50%', background: '#FF9999', opacity: 0.35 }} />
                        <div style={{ position: 'absolute', top: '9px', right: '1px', width: '3.5px', height: '2px', borderRadius: '50%', background: '#FF9999', opacity: 0.35 }} />
                    </>}
                    {/* Mouth */}
                    {(isGod || (reaction && reaction.points >= 3)) ? (
                        <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '3px', borderBottom: '2px solid #fff', borderRadius: '0 0 4px 4px' }} />
                    ) : walkRatio > 0.05 ? (
                        <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '1.5px', borderRadius: '0 0 2px 2px', background: '#fff', opacity: 0.5 }} />
                    ) : null}
                </div>

                {/* ── BODY ── */}
                <div style={{ width: '14px', height: '12px', borderRadius: '4px 4px 2px 2px', background: `linear-gradient(180deg, ${charColor} 0%, ${charColor}CC 100%)`, margin: '-2px auto 0', border: `1px solid ${charColor}`, position: 'relative' }}>
                    {/* Belt/detail */}
                    <div style={{ position: 'absolute', top: '5px', left: '1px', right: '1px', height: '2px', background: `${charColor}40`, borderRadius: '1px' }} />
                    {/* Arms */}
                    <div style={{ position: 'absolute', top: '1px', left: '-5px', width: '5px', height: '8px', background: charColor, borderRadius: '2.5px', transformOrigin: 'top center', animation: !isGod && !reaction ? `v3-arm-l ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${charColor}` }} />
                    <div style={{ position: 'absolute', top: '1px', right: '-5px', width: '5px', height: '8px', background: charColor, borderRadius: '2.5px', transformOrigin: 'top center', animation: !isGod && !reaction ? `v3-arm-r ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${charColor}` }} />
                </div>

                {/* ── LEGS ── */}
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-1px' }}>
                    <div style={{ width: '5px', height: '8px', background: charColor, borderRadius: '1px 1px 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `v3-leg-l ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                    <div style={{ width: '5px', height: '8px', background: charColor, borderRadius: '1px 1px 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `v3-leg-r ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                </div>
            </div>

            {/* ══ PROGRESS BAR ══ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px',
                background: isGod ? 'linear-gradient(90deg, #8B6914, #D4AF37, #FDE68A, #D4AF37)' : `linear-gradient(90deg, ${charColor}44, ${charColor}88, ${charColor})`,
                transition: 'width 0.8s ease', zIndex: 10,
                boxShadow: progress > 0.5 ? `0 0 6px ${charColor}40` : 'none',
            }} />

            {/* ══ SCORE OVERLAY ══ */}
            <div style={{ position: 'absolute', top: '5px', right: '8px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 20 }}>
                <div style={{
                    fontSize: '10px', fontWeight: '700', color: dailyTitle.color,
                    background: isGod ? 'rgba(10,22,40,0.9)' : 'rgba(255,255,255,0.92)',
                    padding: '2px 8px', borderRadius: '6px', border: `1px solid ${dailyTitle.color}30`,
                    backdropFilter: 'blur(8px)', boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                }}>{dailyTitle.title}</div>
                <div style={{
                    fontSize: '10px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917',
                    background: isGod ? 'rgba(10,22,40,0.9)' : 'rgba(255,255,255,0.92)',
                    padding: '2px 8px', borderRadius: '6px',
                    backdropFilter: 'blur(8px)', boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                }}>{xp} / {goalXP}</div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MINI RUNNER V4 — DEFINITIVE EDITION
// ═══════════════════════════════════════════════════════

function getV4Sky(ratio: number, isGod: boolean) {
    if (isGod) return {
        bg: 'linear-gradient(180deg, #030810 0%, #081428 15%, #0E2040 35%, #163058 55%, #0E2040 80%, #081428 100%)',
        sunColor: '#E8E8E8', sunGlow: '#E8E8E830',
        groundTop: '#5A4A10', groundMid: '#7A6820', groundBot: '#8B7A28',
        grassColor: '#3A5520', hillFar: '#0A1830', hillMid: '#122848', hillNear: '#1A3858',
        treeColor: '#0E2040', mist: false, shimmer: false,
    };
    if (ratio < 0.12) return { // Pre-dawn
        bg: 'linear-gradient(180deg, #1A1040 0%, #3A2060 15%, #6A3070 32%, #A04868 50%, #D07058 68%, #E8A050 85%, #F0C870 100%)',
        sunColor: '#FF7040', sunGlow: '#FF704050',
        groundTop: '#2A5838', groundMid: '#1E4830', groundBot: '#163828',
        grassColor: '#3A7848', hillFar: '#402858', hillMid: '#603860', hillNear: '#804060',
        treeColor: '#204030', mist: true, shimmer: false,
    };
    if (ratio < 0.35) return { // Morning
        bg: 'linear-gradient(180deg, #2878CC 0%, #48A0E0 18%, #68B8F0 38%, #90D0F8 58%, #C0E8FF 78%, #FFF8E8 100%)',
        sunColor: '#FFD840', sunGlow: '#FFD84080',
        groundTop: '#3A9850', groundMid: '#2E8842', groundBot: '#207832',
        grassColor: '#4CAF60', hillFar: '#70B890', hillMid: '#58A878', hillNear: '#409860',
        treeColor: '#2A7040', mist: false, shimmer: false,
    };
    if (ratio < 0.65) return { // Noon
        bg: 'linear-gradient(180deg, #1868D0 0%, #3088E0 15%, #48A8F0 32%, #70C0F8 52%, #A0D8FF 72%, #D8F0FF 90%, #F0F8FF 100%)',
        sunColor: '#FFF080', sunGlow: '#FFF08060',
        groundTop: '#48B058', groundMid: '#389848', groundBot: '#288038',
        grassColor: '#58C068', hillFar: '#80C890', hillMid: '#60B878', hillNear: '#48A860',
        treeColor: '#308848', mist: false, shimmer: true,
    };
    return { // Sunset
        bg: 'linear-gradient(180deg, #101840 0%, #282058 12%, #582860 26%, #903050 40%, #C04848 55%, #E07040 68%, #F0A040 82%, #F8C860 95%, #FFE080 100%)',
        sunColor: '#FF5030', sunGlow: '#FF503050',
        groundTop: '#506820', groundMid: '#405818', groundBot: '#304810',
        grassColor: '#607840', hillFar: '#382050', hillMid: '#583048', hillNear: '#704038',
        treeColor: '#304028', mist: false, shimmer: false,
    };
}

function MiniRunnerV4Stage({ xp, goalXP }: { xp: number; goalXP: number }) {
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(xp >= goalXP);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(xp / maxXP, 1);
    const isGod = xp >= goalXP;
    const walkRatio = xp / goalXP;
    const walkSpeed = walkRatio >= 0.666 ? 0.2 : walkRatio >= 0.268 ? 0.28 : walkRatio >= 0.055 ? 0.4 : 0.6;
    const sky = getV4Sky(walkRatio, isGod);

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const cc = dailyTitle.color; // char color

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 3200); }
            prevXpRef.current = xp; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp; prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    // Sun arc
    const sunAngle = Math.min(walkRatio, 1) * 150 + 15;
    const sunX = 50 - Math.cos(sunAngle * Math.PI / 180) * 44;
    const sunY = 48 - Math.sin(sunAngle * Math.PI / 180) * 40;

    const GROUND_H = 30; // ground height px
    const STAGE_H = 140; // total height px

    return (
        <div style={{
            height: `${STAGE_H}px`, position: 'relative', overflow: 'hidden',
            background: sky.bg, transition: 'background 3s ease',
            borderRadius: '2px',
        }}>

            {/* ══════ GOD CELEBRATION ══════ */}
            {godCelebration && <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'radial-gradient(circle at 50% 60%, #D4AF37CC, #FDE68A44, transparent 75%)', animation: 'runner-god-flash 3.2s ease-out forwards', pointerEvents: 'none' }} />}
            {godCelebration && <div style={{ position: 'absolute', top: '45%', left: '50%', zIndex: 65, fontSize: '26px', fontWeight: '900', color: '#FDE68A', textShadow: '0 0 50px #D4AF37, 0 0 100px #D4AF3780, 0 4px 10px rgba(0,0,0,0.8)', letterSpacing: '10px', whiteSpace: 'nowrap', animation: 'runner-god-title 3.2s ease-out forwards', pointerEvents: 'none' }}>本日の神</div>}
            {godCelebration && Array.from({ length: 28 }).map((_, i) => {
                const a = (i / 28) * 360;
                return <div key={`b-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: i % 3 === 0 ? '6px' : '4px', height: i % 3 === 0 ? '6px' : '4px', borderRadius: i % 2 === 0 ? '1px' : '50%', background: ['#D4AF37', '#FDE68A', '#F59E0B', '#FBBF24', '#FFE082', '#A78BFA'][i % 6], '--bx': `${Math.cos(a * Math.PI / 180) * 22}px`, '--by': `${Math.sin(a * Math.PI / 180) * 15}px`, animation: `runner-god-burst 2.2s ease-out ${i * 30}ms forwards`, zIndex: 62, pointerEvents: 'none' } as React.CSSProperties} />;
            })}

            {/* ══════ AURORA (god) ══════ */}
            {isGod && <>
                <div style={{ position: 'absolute', top: 0, left: '-15%', right: '-15%', height: '50%', background: 'linear-gradient(90deg, transparent 0%, #10B98118 15%, #4ADE8020 30%, #D4AF3718 50%, #A78BFA20 70%, #10B98118 85%, transparent 100%)', animation: 'v4-aurora-1 10s ease-in-out infinite', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '8%', left: '-15%', right: '-15%', height: '35%', background: 'linear-gradient(90deg, transparent 0%, #A78BFA15 20%, #D4AF3715 45%, #10B98115 65%, #F472B615 80%, transparent 100%)', animation: 'v4-aurora-2 14s ease-in-out 3s infinite', zIndex: 1 }} />
            </>}

            {/* ══════ STARS ══════ */}
            {(isGod || walkRatio >= 0.65) && Array.from({ length: isGod ? 30 : 10 }, (_, i) => {
                const sx = (i * 31 + 17) % 96; const sy = (i * 19 + 5) % 50;
                const ss = 1 + (i % 4) * 0.6; const sd = 1.2 + (i % 6) * 0.7;
                return <div key={`s-${i}`} style={{
                    position: 'absolute', top: `${sy}px`, left: `${sx}%`,
                    width: `${ss}px`, height: `${ss}px`,
                    background: i % 8 === 0 ? '#FDE68A' : i % 6 === 0 ? '#C4B5FD' : i % 4 === 0 ? '#93C5FD' : '#fff',
                    borderRadius: '50%',
                    animation: `v4-star ${sd}s ease-in-out ${i * 0.12}s infinite`,
                    zIndex: 1, opacity: isGod ? 1 : 0.4,
                }} />;
            })}

            {/* ══════ CELESTIAL BODY ══════ */}
            {!isGod ? (
                <div style={{
                    position: 'absolute', top: `${sunY}%`, left: `${sunX}%`,
                    width: '26px', height: '26px', zIndex: 2,
                    transition: 'top 3s ease, left 3s ease',
                    '--sun-glow': sky.sunGlow,
                    animation: 'v4-sun-glow 5s ease-in-out infinite',
                } as React.CSSProperties}>
                    {/* Radial rays */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={`ray-${i}`} style={{
                            position: 'absolute', top: '50%', left: '50%',
                            width: '1.5px', height: walkRatio > 0.3 ? '32px' : '22px',
                            background: `linear-gradient(180deg, ${sky.sunColor}25, transparent)`,
                            transformOrigin: '50% 0%', transform: `rotate(${i * 45}deg)`,
                            '--ray-op': `${walkRatio > 0.3 ? 0.15 : 0.08}`,
                            animation: `v4-ray-pulse ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
                        } as React.CSSProperties} />
                    ))}
                    {/* Outer glow */}
                    <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', background: `radial-gradient(circle, ${sky.sunColor}20, transparent 70%)` }} />
                    {/* Sun body */}
                    <div style={{
                        position: 'absolute', inset: '4px', borderRadius: '50%',
                        background: `radial-gradient(circle at 35% 35%, #FFFEF0, ${sky.sunColor}, ${sky.sunColor}CC)`,
                        boxShadow: `0 0 16px ${sky.sunGlow}, 0 0 40px ${sky.sunGlow}`,
                    }} />
                </div>
            ) : (
                <div style={{ position: 'absolute', top: '10px', left: '82%', zIndex: 2, '--sun-glow': '#E8E8E830', animation: 'v4-sun-glow 6s ease-in-out infinite' } as React.CSSProperties}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #F5F5F5, #D4D4D4, #A8A8A8)', boxShadow: '0 0 14px #E8E8E830', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-1px', right: '-3px', width: '16px', height: '16px', borderRadius: '50%', background: '#081428' }} />
                        <div style={{ position: 'absolute', top: '8px', left: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#C0C0C040' }} />
                        <div style={{ position: 'absolute', top: '12px', left: '9px', width: '2px', height: '2px', borderRadius: '50%', background: '#C0C0C030' }} />
                        <div style={{ position: 'absolute', top: '5px', left: '6px', width: '2px', height: '1.5px', borderRadius: '50%', background: '#C0C0C025' }} />
                    </div>
                </div>
            )}

            {/* ══════ CLOUDS — far layer (doubled for loop) ══════ */}
            {!isGod && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '60px', zIndex: 3, animation: `v4-cloud-far ${walkRatio > 0.3 ? 55 : 85}s linear infinite` }}>
                    {[
                        { x: 3, y: 4, s: 0.9, w: 58 }, { x: 18, y: 14, s: 0.55, w: 38 },
                        { x: 34, y: 2, s: 1.15, w: 65 }, { x: 52, y: 10, s: 0.7, w: 44 },
                        { x: 68, y: 6, s: 1.0, w: 55 }, { x: 85, y: 16, s: 0.6, w: 40 },
                    ].map((c, ci) => (
                        <div key={`cf-${ci}`} style={{ position: 'absolute', top: `${c.y}px`, left: `${c.x}%`, transform: `scale(${c.s})` }}>
                            <div style={{ position: 'relative', width: `${c.w}px`, height: '20px', filter: 'blur(0.3px)' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: '0%', width: '35%', height: '70%', borderRadius: '50%', background: 'rgba(255,255,255,0.82)' }} />
                                <div style={{ position: 'absolute', bottom: '5%', left: '14%', width: '42%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.92)' }} />
                                <div style={{ position: 'absolute', bottom: '3%', left: '35%', width: '38%', height: '85%', borderRadius: '50%', background: 'rgba(255,255,255,0.88)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '52%', width: '30%', height: '58%', borderRadius: '50%', background: 'rgba(255,255,255,0.78)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '65%', width: '22%', height: '45%', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '8%', width: '75%', height: '35%', borderRadius: '6px', background: 'rgba(255,255,255,0.72)' }} />
                                {/* Cloud shadow */}
                                <div style={{ position: 'absolute', bottom: '-2px', left: '12%', width: '65%', height: '20%', borderRadius: '50%', background: 'rgba(0,0,0,0.03)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ══════ BIRDS (V-formation, far) ══════ */}
            {!isGod && walkRatio >= 0.15 && (
                <div style={{ position: 'absolute', top: '8px', left: 0, width: '200%', height: '30px', zIndex: 3, animation: `v4-bird-drift ${walkRatio > 0.4 ? 25 : 40}s linear infinite` }}>
                    {[
                        { x: 20, y: 5, s: 0.6 }, { x: 22, y: 8, s: 0.5 }, { x: 18, y: 8, s: 0.5 },
                        { x: 24, y: 12, s: 0.4 }, { x: 16, y: 12, s: 0.45 },
                    ].map((b, i) => (
                        <div key={`bird-${i}`} style={{
                            position: 'absolute', top: `${b.y}px`, left: `${b.x}%`,
                            width: `${7 * b.s}px`, height: `${3 * b.s}px`,
                            borderTop: `${2 * b.s}px solid rgba(0,0,0,0.18)`,
                            borderLeft: `${3.5 * b.s}px solid transparent`, borderRight: `${3.5 * b.s}px solid transparent`,
                            borderBottom: 'none',
                            animation: `v4-bird-flap ${0.8 + i * 0.15}s ease-in-out ${i * 0.2}s infinite`,
                        }} />
                    ))}
                </div>
            )}

            {/* ══════ MOUNTAIN LAYER 1 (far) ══════ */}
            <div style={{ position: 'absolute', bottom: `${GROUND_H}px`, left: 0, width: '200%', height: '40px', zIndex: 4, animation: `v4-para-1 ${walkRatio > 0.05 ? 90 : 250}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 40" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="v4mf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={sky.hillFar} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={sky.hillFar} stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <path d="M0,40 L10,28 L30,32 L55,18 L80,28 L100,12 L125,22 L150,8 L175,20 L200,14 L225,26 L250,10 L275,22 L300,16 L325,28 L345,12 L370,24 L400,18 L420,28 L445,18 L470,32 L495,18 L520,28 L540,12 L565,22 L590,8 L615,20 L640,14 L665,26 L690,10 L715,22 L740,16 L765,28 L785,12 L800,20 L800,40 Z" fill="url(#v4mf)" />
                </svg>
            </div>

            {/* ══════ MOUNTAIN LAYER 2 (mid) ══════ */}
            <div style={{ position: 'absolute', bottom: `${GROUND_H}px`, left: 0, width: '200%', height: '28px', zIndex: 5, animation: `v4-para-2 ${walkRatio > 0.05 ? 65 : 180}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 28" preserveAspectRatio="none">
                    <path d="M0,28 L20,18 L50,22 L85,12 L120,20 L155,8 L185,16 L220,12 L260,22 L295,10 L330,18 L365,14 L400,22 L430,12 L465,20 L500,8 L535,16 L570,12 L610,22 L645,10 L680,18 L715,14 L750,22 L780,10 L800,16 L800,28 Z" fill={sky.hillMid} opacity={isGod ? 0.45 : 0.28} />
                </svg>
            </div>

            {/* ══════ TREES (parallax layer 3) ══════ */}
            <div style={{ position: 'absolute', bottom: `${GROUND_H - 2}px`, left: 0, width: '200%', height: '22px', zIndex: 6, animation: `v4-para-3 ${walkRatio > 0.05 ? 45 : 120}s linear infinite` }}>
                {Array.from({ length: 24 }, (_, i) => {
                    const tx = i * 4.2 + ((i * 11) % 3);
                    const th = 10 + (i % 5) * 3;
                    const tw = 4 + (i % 3) * 1.5;
                    const shape = i % 4;
                    return (
                        <div key={`t-${i}`} style={{
                            position: 'absolute', bottom: 0, left: `${tx}%`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            '--tw': `${1 + (i % 3) * 0.8}deg`,
                            animation: `v4-tree-sway ${2.5 + (i % 5) * 0.6}s ease-in-out ${i * 0.15}s infinite`,
                            transformOrigin: 'bottom center',
                        } as React.CSSProperties}>
                            <div style={{
                                width: `${tw + 5}px`, height: `${th}px`,
                                background: `${sky.treeColor}${i % 3 === 0 ? 'CC' : i % 3 === 1 ? 'AA' : 'DD'}`,
                                clipPath: shape === 0
                                    ? 'polygon(50% 0%, 95% 90%, 50% 75%, 5% 90%)' // pine
                                    : shape === 1
                                    ? 'ellipse(48% 48% at 50% 55%)' // round
                                    : shape === 2
                                    ? 'polygon(50% 0%, 80% 35%, 95% 85%, 5% 85%, 20% 35%)' // cypress
                                    : 'polygon(50% 5%, 90% 50%, 85% 50%, 100% 95%, 0% 95%, 15% 50%, 10% 50%)', // layered pine
                            }} />
                            <div style={{ width: '2px', height: '4px', background: isGod ? '#3A2A08' : '#5D4037', opacity: 0.4, marginTop: '-2px' }} />
                        </div>
                    );
                })}
            </div>

            {/* ══════ MIST (dawn) ══════ */}
            {sky.mist && <>
                <div style={{ position: 'absolute', bottom: `${GROUND_H + 5}px`, left: 0, right: 0, height: '18px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.12))', '--mist-dx': '-25px', '--mist-op': '0.12', animation: 'v4-mist 8s ease-in-out infinite', zIndex: 7 } as React.CSSProperties} />
                <div style={{ position: 'absolute', bottom: `${GROUND_H + 15}px`, left: 0, right: 0, height: '14px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08))', '--mist-dx': '-18px', '--mist-op': '0.08', animation: 'v4-mist 12s ease-in-out 2s infinite', zIndex: 7 } as React.CSSProperties} />
            </>}

            {/* ══════ HEAT SHIMMER (noon) ══════ */}
            {sky.shimmer && (
                <div style={{ position: 'absolute', bottom: `${GROUND_H}px`, left: 0, right: 0, height: '15px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04))', animation: 'v4-shimmer 2s ease-in-out infinite', zIndex: 7, pointerEvents: 'none' }} />
            )}

            {/* ══════ PARTICLES: leaves / fireflies ══════ */}
            {!isGod && walkRatio >= 0.04 && Array.from({ length: 7 }, (_, i) => {
                const lx = 8 + i * 13; const ly = 30 + (i % 4) * 15;
                const isAutumn = walkRatio > 0.65;
                return <div key={`lf-${i}`} style={{
                    position: 'absolute', top: `${ly}px`, left: `${lx}%`,
                    width: '5px', height: '3px',
                    background: isAutumn ? ['#E06030', '#D08020', '#C04040'][i % 3] : ['#68B868', '#80C880', '#50A050'][i % 3],
                    borderRadius: '0 60% 60% 0',
                    '--lf-dx': `${-50 - i * 8}px`, '--lf-dy': `${12 + (i % 3) * 10}px`,
                    '--lf-rot': `${200 + i * 60}deg`, '--lf-op': '0.55',
                    animation: `v4-leaf ${3.5 + i * 0.7}s ease-in-out ${i * 1.0}s infinite`,
                    zIndex: 8, pointerEvents: 'none',
                } as React.CSSProperties} />;
            })}
            {isGod && Array.from({ length: 14 }, (_, i) => {
                const fx = (i * 7.5 + 3) % 96; const fy = 15 + (i * 13 + 5) % 55;
                return <div key={`ff-${i}`} style={{
                    position: 'absolute', top: `${fy}px`, left: `${fx}%`,
                    width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`, borderRadius: '50%',
                    background: ['#FDE68A', '#A78BFA', '#10B981', '#F472B6', '#60A5FA'][i % 5],
                    boxShadow: `0 0 4px ${['#FDE68A', '#A78BFA', '#10B981', '#F472B6', '#60A5FA'][i % 5]}60`,
                    '--ff-dx': `${(i % 2 === 0 ? 8 : -8)}px`, '--ff-dy': `${-5 - (i % 3) * 4}px`, '--ff-op': '0.65',
                    animation: `v4-firefly ${2.5 + (i % 5) * 0.4}s ease-in-out ${i * 0.35}s infinite`,
                    zIndex: 8,
                } as React.CSSProperties} />;
            })}

            {/* ══════ GROUND ══════ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: `${GROUND_H}px`,
                background: `linear-gradient(180deg, ${sky.groundTop} 0%, ${sky.groundMid} 40%, ${sky.groundBot} 100%)`,
                borderTop: `2px solid ${sky.groundTop}`,
                transition: 'all 3s ease', zIndex: 9,
            }}>
                {/* Scrolling texture */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 14px, rgba(0,0,0,0.03) 14px, rgba(0,0,0,0.03) 15px, transparent 15px, transparent 28px, rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px)`,
                    animation: `v4-ground-scroll ${walkSpeed * 5}s linear infinite`,
                }} />
                {/* Path */}
                <div style={{ position: 'absolute', top: '7px', left: 0, right: 0, height: '5px', background: isGod ? 'rgba(212,175,55,0.12)' : 'rgba(139,90,43,0.1)', borderRadius: '3px' }} />
                <div style={{ position: 'absolute', top: '9px', left: 0, right: 0, height: '2px', background: isGod ? 'rgba(212,175,55,0.06)' : 'rgba(139,90,43,0.05)', borderRadius: '1px' }} />
                {/* Pebbles */}
                {Array.from({ length: 12 }, (_, i) => (
                    <div key={`p-${i}`} style={{
                        position: 'absolute', top: `${14 + (i % 4) * 3}px`, left: `${(i * 8.5 + 2) % 100}%`,
                        width: `${2 + (i % 3)}px`, height: `${1.5 + (i % 2) * 0.5}px`, borderRadius: '50%',
                        background: isGod ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.06)',
                    }} />
                ))}
            </div>

            {/* ══════ GRASS — wave pattern ══════ */}
            {Array.from({ length: 24 }, (_, i) => {
                const h = 3 + (i % 6) * 2;
                return (
                    <div key={`g-${i}`} style={{
                        position: 'absolute', bottom: `${GROUND_H - 1}px`,
                        left: `${(i * 4.15) + ((i * 13 + 7) % 4) * 0.5}%`,
                        width: '1.5px', height: `${h}px`,
                        background: [sky.grassColor, `${sky.grassColor}DD`, `${sky.grassColor}BB`, sky.groundTop, `${sky.grassColor}EE`][i % 5],
                        borderRadius: '1px 1px 0 0',
                        transformOrigin: 'bottom center',
                        '--gsw': `${2 + (i % 7) * 1}deg`,
                        animation: `v4-grass ${1.4 + (i % 6) * 0.2}s ease-in-out ${i * 0.08}s infinite`,
                        zIndex: 10,
                    } as React.CSSProperties} />
                );
            })}

            {/* ══════ FLOWERS ══════ */}
            {!isGod && [
                { x: 6, c: '#F472B6', s: 3.5, p: 4 }, { x: 16, c: '#FBBF24', s: 3, p: 3 },
                { x: 28, c: '#A78BFA', s: 3.5, p: 5 }, { x: 41, c: '#FB923C', s: 2.5, p: 3 },
                { x: 53, c: '#60A5FA', s: 3, p: 4 }, { x: 65, c: '#F472B6', s: 3, p: 4 },
                { x: 77, c: '#34D399', s: 3.5, p: 5 }, { x: 88, c: '#FBBF24', s: 2.5, p: 3 },
                { x: 96, c: '#A78BFA', s: 3, p: 4 },
            ].map((f, i) => (
                <div key={`fl-${i}`} style={{
                    position: 'absolute', bottom: `${GROUND_H}px`, left: `${f.x}%`, zIndex: 10,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                    {/* Petals */}
                    {f.p >= 4 && Array.from({ length: f.p }, (_, pi) => {
                        const pa = (pi / f.p) * 360;
                        return <div key={`pet-${pi}`} style={{
                            position: 'absolute', top: `${-Math.sin(pa * Math.PI / 180) * (f.s * 0.4)}px`,
                            left: `${Math.cos(pa * Math.PI / 180) * (f.s * 0.4)}px`,
                            width: `${f.s * 0.55}px`, height: `${f.s * 0.4}px`,
                            borderRadius: '50%', background: `${f.c}90`,
                            transform: `rotate(${pa}deg)`,
                        }} />;
                    })}
                    {/* Center */}
                    <div style={{ width: `${f.s * 0.5}px`, height: `${f.s * 0.5}px`, borderRadius: '50%', background: f.c, boxShadow: `0 0 3px ${f.c}40`, position: 'relative', zIndex: 1 }} />
                    <div style={{ width: '1px', height: '4px', background: sky.grassColor, opacity: 0.5 }} />
                </div>
            ))}

            {/* ══════ START GATE — torii-inspired ══════ */}
            <div style={{ position: 'absolute', bottom: `${GROUND_H}px`, left: '1%', zIndex: 12 }}>
                <div style={{ position: 'relative', width: '24px', height: '38px' }}>
                    {/* Pillars */}
                    <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '3.5px', height: '38px', background: isGod ? 'linear-gradient(180deg, #E8C840, #A08020, #806010)' : 'linear-gradient(180deg, #B8996E, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: '1px', width: '3.5px', height: '38px', background: isGod ? 'linear-gradient(180deg, #E8C840, #A08020, #806010)' : 'linear-gradient(180deg, #B8996E, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    {/* Top bar (kasagi) — extends beyond pillars */}
                    <div style={{ position: 'absolute', top: 0, left: '-4px', right: '-4px', height: '4px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37)' : 'linear-gradient(180deg, #C4A876, #A08860)', borderRadius: '2px', boxShadow: isGod ? '0 0 8px #D4AF3740' : '0 1px 3px rgba(0,0,0,0.2)' }} />
                    {/* Secondary bar (nuki) */}
                    <div style={{ position: 'absolute', top: '7px', left: '-1px', right: '-1px', height: '3px', background: isGod ? '#D4AF37CC' : '#A0886080', borderRadius: '1px' }} />
                    {/* Decorative caps */}
                    <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '5px', height: '5px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '5px', height: '5px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    {/* Label */}
                    <div style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', fontSize: '4.5px', fontWeight: '900', letterSpacing: '0.8px', color: isGod ? '#FDE68A' : '#6B5B3A', whiteSpace: 'nowrap' }}>START</div>
                </div>
            </div>

            {/* ══════ MILESTONE GATES ══════ */}
            {milestones.map((m, i) => {
                const mx = (m.xp / maxXP) * 100;
                const cleared = xp >= m.xp;
                const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                return (
                    <div key={`ms-${i}`} style={{ position: 'absolute', bottom: `${GROUND_H}px`, left: `${Math.min(mx, 91)}%`, zIndex: 12 }}>
                        {/* Mini gate structure */}
                        <div style={{ position: 'relative', width: '8px', height: cleared ? '22px' : '14px', transition: 'height 0.6s ease' }}>
                            {/* Left post */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, width: '2px', height: '100%',
                                background: cleared ? `linear-gradient(180deg, ${m.color}80, ${m.color})` : 'linear-gradient(180deg, #D6D3D160, #A8A29E)',
                                borderRadius: '1px 1px 0 0',
                            }} />
                            {/* Right post */}
                            <div style={{
                                position: 'absolute', bottom: 0, right: 0, width: '2px', height: '100%',
                                background: cleared ? `linear-gradient(180deg, ${m.color}80, ${m.color})` : 'linear-gradient(180deg, #D6D3D160, #A8A29E)',
                                borderRadius: '1px 1px 0 0',
                            }} />
                            {/* Cross bar */}
                            <div style={{
                                position: 'absolute', top: 0, left: '-2px', right: '-2px', height: '3px',
                                background: cleared ? m.color : '#A8A29E80',
                                borderRadius: '2px',
                                boxShadow: cleared ? `0 0 4px ${m.color}40` : 'none',
                            }} />
                            {/* Beacon orb */}
                            <div style={{
                                position: 'absolute', top: '-4px', left: '50%',
                                width: cleared ? '6px' : '3px', height: cleared ? '6px' : '3px', borderRadius: '50%',
                                background: cleared ? `radial-gradient(circle at 35% 35%, ${m.color}EE, ${m.color})` : '#A8A29E60',
                                '--b': m.color,
                                animation: cleared ? 'v4-beacon-orb 2.5s ease-in-out infinite' : 'none',
                                transform: 'translateX(-50%)',
                                transition: 'all 0.6s ease',
                            } as React.CSSProperties} />
                            {/* Upward light beam */}
                            {cleared && <div style={{
                                position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
                                width: '1px', height: '16px',
                                background: `linear-gradient(180deg, transparent, ${m.color}50, transparent)`,
                                animation: 'v4-divine-pillar 3s ease-in-out infinite',
                            }} />}
                        </div>
                        {/* Label */}
                        {(cleared || isNext) && (
                            <div style={{
                                position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '5.5px', fontWeight: '800', whiteSpace: 'nowrap',
                                color: cleared ? m.color : '#A8A29E',
                                textShadow: cleared ? `0 0 10px ${m.color}50, 0 1px 3px rgba(0,0,0,0.4)` : '0 1px 2px rgba(0,0,0,0.3)',
                                letterSpacing: '0.3px',
                            }}>{m.title}</div>
                        )}
                    </div>
                );
            })}

            {/* ══════ GOAL FLAG ══════ */}
            <div style={{ position: 'absolute', bottom: `${GROUND_H}px`, right: '1.5%', zIndex: 12 }}>
                <div style={{ position: 'relative', width: '3px', height: '48px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37, #8B6914)' : 'linear-gradient(180deg, #78716C, #57534E, #3A3530)', borderRadius: '2px 2px 0 0' }}>
                    {/* Ornamental ball */}
                    <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '9px', height: '9px', borderRadius: '50%', background: isGod ? 'radial-gradient(circle at 32% 32%, #FDE68A, #D4AF37, #A08020)' : 'radial-gradient(circle at 32% 32%, #D4AF37, #B8960F)', boxShadow: isGod ? '0 0 12px #D4AF37, 0 0 24px #D4AF3740' : '0 0 5px #D4AF3740' }} />
                    {/* Pennant — multi-layer */}
                    <div style={{
                        position: 'absolute', top: '6px', left: '3px', width: '30px', height: '18px',
                        background: isGod ? 'linear-gradient(135deg, #D4AF37, #FDE68A, #D4AF37, #FDE68A)' : 'linear-gradient(135deg, #D4AF37, #F59E0B, #D4AF37)',
                        clipPath: 'polygon(0 0, 86% 6%, 70% 50%, 90% 94%, 0 100%)',
                        animation: 'v4-flag 2.2s ease-in-out infinite',
                        transformOrigin: 'left center',
                        boxShadow: isGod ? '0 0 16px #D4AF3740' : 'none',
                    }}>
                        <div style={{ fontSize: '6px', fontWeight: '900', color: isGod ? '#6B4E10' : '#fff', letterSpacing: '1.5px', paddingTop: '5px', paddingLeft: '4px', textShadow: isGod ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}>GOAL</div>
                    </div>
                    {/* Distance marker */}
                    <div style={{ position: 'absolute', top: '-16px', left: '-4px', fontSize: '5px', fontWeight: '700', color: isGod ? '#FDE68A60' : '#78716C60', whiteSpace: 'nowrap' }}>{goalXP}</div>
                </div>
            </div>

            {/* ══════ CHARACTER ══════ */}
            <div style={{
                position: 'absolute', bottom: `${GROUND_H}px`,
                left: isGod ? '50%' : `${4 + Math.min(progress * 87, 87)}%`,
                transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 18,
                animation: godCelebration ? 'v4-god-ascend 3.2s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'v4-god-float 3.5s ease-in-out infinite'
                    : `v4-run ${walkSpeed}s ease-in-out infinite`,
            }}>
                {/* Shadow */}
                <div style={{
                    position: 'absolute', bottom: '-4px', left: '50%',
                    width: isGod ? '32px' : '20px', height: '5px',
                    background: isGod ? 'radial-gradient(ellipse, #D4AF3728, transparent)' : 'radial-gradient(ellipse, rgba(0,0,0,0.18), transparent)',
                    borderRadius: '50%',
                    animation: !isGod && !reaction ? `v4-shadow ${walkSpeed}s ease-in-out infinite` : undefined,
                    transform: 'translateX(-50%)',
                }} />

                {/* Speed lines */}
                {walkRatio >= 0.35 && !isGod && !reaction && [0, 1, 2, 3, 4].map(i => (
                    <div key={`sp-${i}`} style={{
                        position: 'absolute', top: `${3 + i * 7}px`, left: '-10px',
                        width: `${12 + (4 - i) * 3}px`, height: '1.5px',
                        background: `linear-gradient(90deg, transparent, ${cc}45)`,
                        animation: `v4-speed ${0.22 + i * 0.05}s ease-out ${i * 0.04}s infinite`,
                    }} />
                ))}

                {/* God — wings */}
                {isGod && !godCelebration && <>
                    <div style={{
                        position: 'absolute', top: '16px', left: '-14px',
                        width: '14px', height: '20px',
                        background: 'linear-gradient(135deg, #D4AF3780, #FDE68A60, #D4AF3740)',
                        clipPath: 'polygon(100% 20%, 80% 0%, 30% 10%, 0% 40%, 10% 70%, 40% 90%, 100% 80%)',
                        transformOrigin: 'right center',
                        animation: 'v4-wing-l 1.5s ease-in-out infinite',
                        zIndex: -1,
                    }} />
                    <div style={{
                        position: 'absolute', top: '16px', right: '-14px',
                        width: '14px', height: '20px',
                        background: 'linear-gradient(-135deg, #D4AF3780, #FDE68A60, #D4AF3740)',
                        clipPath: 'polygon(0% 20%, 20% 0%, 70% 10%, 100% 40%, 90% 70%, 60% 90%, 0% 80%)',
                        transformOrigin: 'left center',
                        animation: 'v4-wing-r 1.5s ease-in-out infinite',
                        zIndex: -1,
                    }} />
                </>}

                {/* God — halo */}
                {isGod && !godCelebration && (
                    <div style={{
                        position: 'absolute', top: '-4px', left: '50%',
                        width: '18px', height: '6px', borderRadius: '50%',
                        border: '2px solid #FDE68A80',
                        boxShadow: '0 0 8px #D4AF3760',
                        animation: 'v4-halo 4s linear infinite',
                        zIndex: 20,
                    }} />
                )}

                {/* God aura rings */}
                {isGod && !reaction && <>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '54px', height: '54px', borderRadius: '50%', border: '2px solid #D4AF3738', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #D4AF3720', animation: 'runner-god-aura 2.8s ease-in-out 0.6s infinite', pointerEvents: 'none', zIndex: -1 }} />
                </>}
                {isGod && [0, 1, 2, 3, 4].map(i => <div key={`orb-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: ['#FDE68A', '#A78BFA', '#10B981', '#FDE68A', '#F472B6'][i], borderRadius: i % 2 === 0 ? '1px' : '50%', transform: 'rotate(45deg)', animation: `runner-god-orbit ${1.6 + i * 0.35}s linear infinite`, animationDelay: `${i * 0.4}s`, zIndex: 19 }} />)}

                {/* +XP pop */}
                {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-44px', left: '50%', fontSize: reaction.points >= 15 ? '18px' : reaction.points >= 9 ? '15px' : '13px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `v4-xp-pop ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 14px ${reaction.ringColor}80, 0 2px 5px rgba(0,0,0,0.5)`, zIndex: 22, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '10px', marginLeft: '2px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                {/* Energy particles */}
                {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const a = (i / reaction.energy) * 360; const d = 26 + (i % 3) * 12; const sx = Math.cos(a * Math.PI / 180) * d; const sy = Math.sin(a * Math.PI / 180) * d; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '5px' : '4px', height: reaction.points >= 10 ? '5px' : '4px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 6px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 22 + 70}ms`, pointerEvents: 'none', zIndex: 19 } as React.CSSProperties} />; })}
                {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-r${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${26 - ri * 5}px`, height: `${26 - ri * 5}px`, borderRadius: '50%', border: `${2.5 - ri * 0.5}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.28 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 17 }} />)}

                {/* Dust */}
                {walkRatio >= 0.03 && !isGod && !reaction && [0, 1, 2, 3].map(i => <div key={`dk-${i}`} style={{ position: 'absolute', bottom: `${i * 2}px`, left: `${-5 - i * 3}px`, width: '3px', height: '3px', borderRadius: '50%', background: '#A8A29E', opacity: walkRatio >= 0.3 ? 0.5 : 0.18, '--d-dx': `${-8 - i * 4}px`, '--d-dy': `${-3 - (i % 2) * 3}px`, animation: `v4-dust ${0.28 + i * 0.06}s ease-out infinite`, animationDelay: `${i * 0.06}s` } as React.CSSProperties} />)}

                {/* Scarf (always, not just god) */}
                {walkRatio > 0.02 && (
                    <div style={{
                        position: 'absolute', top: '20px', left: '-8px',
                        width: `${isGod ? 14 : 10 + Math.min(walkRatio * 6, 6)}px`, height: `${isGod ? 14 : 8 + Math.min(walkRatio * 4, 4)}px`,
                        background: isGod
                            ? 'linear-gradient(180deg, #D4AF37CC, #D4AF3780, #D4AF3740)'
                            : `linear-gradient(180deg, ${cc}CC, ${cc}80, ${cc}40)`,
                        clipPath: 'polygon(70% 0%, 100% 10%, 85% 45%, 100% 90%, 10% 100%, 0% 50%, 20% 15%)',
                        transformOrigin: 'top right',
                        animation: `v4-scarf ${walkSpeed * 1.2}s ease-in-out infinite`,
                        zIndex: -1,
                    }} />
                )}

                {/* ── HEAD ── */}
                <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: `radial-gradient(circle at 36% 28%, ${cc}F0, ${cc}CC, ${cc}AA)`,
                    boxShadow: reaction ? `0 0 ${reaction.points >= 10 ? 20 : 10}px ${reaction.ringColor}90` : isGod ? '0 0 20px #D4AF3790, 0 0 40px #D4AF3750' : '0 1px 5px rgba(0,0,0,0.25)',
                    position: 'relative', border: `1.5px solid ${cc}`, margin: '0 auto',
                    transition: 'box-shadow 0.3s ease',
                }}>
                    {/* Hair */}
                    <div style={{
                        position: 'absolute', top: '-7px', left: '0px', width: '20px', height: '12px',
                        borderRadius: '10px 10px 3px 3px',
                        background: `linear-gradient(180deg, ${cc}, ${cc}CC)`,
                        zIndex: -1,
                        transformOrigin: 'bottom center',
                        animation: !isGod && !reaction ? `v4-hair ${walkSpeed}s ease-in-out infinite` : 'none',
                    }} />
                    <div style={{ position: 'absolute', top: '-5px', left: '4px', width: '8px', height: '5px', borderRadius: '4px', background: 'rgba(255,255,255,0.12)' }} />
                    <div style={{ position: 'absolute', top: '-5px', right: '-1px', width: '6px', height: '7px', borderRadius: '3px 6px 0 0', background: cc, transform: 'rotate(20deg)', zIndex: -1 }} />
                    {/* Eyes */}
                    {reaction && reaction.points >= 6 ? (
                        <>
                            <div style={{ position: 'absolute', top: '6px', left: '3px', width: '4px', height: '2.5px', borderBottom: '2px solid #fff', borderRadius: '0 0 4px 4px' }} />
                            <div style={{ position: 'absolute', top: '6px', right: '3px', width: '4px', height: '2.5px', borderBottom: '2px solid #fff', borderRadius: '0 0 4px 4px' }} />
                        </>
                    ) : (
                        <>
                            <div style={{ position: 'absolute', top: '6px', left: '3px', width: '4.5px', height: '4.5px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                                <div style={{ position: 'absolute', top: '0px', left: '0.5px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#fff', opacity: 0.85 }} />
                            </div>
                            <div style={{ position: 'absolute', top: '6px', right: '3px', width: '4.5px', height: '4.5px', borderRadius: '50%', background: '#fff' }}>
                                <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                                <div style={{ position: 'absolute', top: '0px', left: '0.5px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#fff', opacity: 0.85 }} />
                            </div>
                        </>
                    )}
                    {/* Blush */}
                    {(isGod || (reaction && reaction.points >= 3)) && <>
                        <div style={{ position: 'absolute', top: '10px', left: '1px', width: '4px', height: '2.5px', borderRadius: '50%', background: '#FF9999', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', top: '10px', right: '1px', width: '4px', height: '2.5px', borderRadius: '50%', background: '#FF9999', opacity: 0.3 }} />
                    </>}
                    {/* Mouth */}
                    {(isGod || (reaction && reaction.points >= 3)) ? (
                        <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '7px', height: '3.5px', borderBottom: '2px solid #fff', borderRadius: '0 0 5px 5px' }} />
                    ) : walkRatio > 0.05 ? (
                        <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '1.5px', borderRadius: '0 0 2px 2px', background: '#fff', opacity: 0.5 }} />
                    ) : null}
                </div>

                {/* ── BODY ── */}
                <div style={{ width: '16px', height: '14px', borderRadius: '5px 5px 3px 3px', background: `linear-gradient(180deg, ${cc} 0%, ${cc}CC 100%)`, margin: '-2px auto 0', border: `1px solid ${cc}`, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '6px', left: '2px', right: '2px', height: '2px', background: `${cc}40`, borderRadius: '1px' }} />
                    {/* Arms */}
                    <div style={{ position: 'absolute', top: '1px', left: '-6px', width: '6px', height: '10px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '3px', transformOrigin: 'top center', animation: !isGod && !reaction ? `v4-arm-l ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${cc}` }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '4px', height: '3px', borderRadius: '50%', background: `${cc}EE` }} />
                    </div>
                    <div style={{ position: 'absolute', top: '1px', right: '-6px', width: '6px', height: '10px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '3px', transformOrigin: 'top center', animation: !isGod && !reaction ? `v4-arm-r ${walkSpeed}s ease-in-out infinite` : 'none', border: `0.5px solid ${cc}` }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '4px', height: '3px', borderRadius: '50%', background: `${cc}EE` }} />
                    </div>
                </div>

                {/* ── LEGS ── */}
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-1px' }}>
                    <div style={{
                        width: '6px', height: '10px',
                        background: `linear-gradient(180deg, ${cc}, ${cc}DD)`,
                        borderRadius: '2px 2px 3px 3px', border: `0.5px solid ${cc}`,
                        transformOrigin: 'top center',
                        animation: !isGod && !reaction ? `v4-leg-l ${walkSpeed}s ease-in-out infinite` : 'none',
                    }}>
                        <div style={{ position: 'absolute', bottom: 0, width: '7px', height: '3px', borderRadius: '2px', background: `${cc}CC`, marginLeft: '-0.5px' }} />
                    </div>
                    <div style={{
                        width: '6px', height: '10px',
                        background: `linear-gradient(180deg, ${cc}, ${cc}DD)`,
                        borderRadius: '2px 2px 3px 3px', border: `0.5px solid ${cc}`,
                        transformOrigin: 'top center',
                        animation: !isGod && !reaction ? `v4-leg-r ${walkSpeed}s ease-in-out infinite` : 'none',
                    }}>
                        <div style={{ position: 'absolute', bottom: 0, width: '7px', height: '3px', borderRadius: '2px', background: `${cc}CC`, marginLeft: '-0.5px' }} />
                    </div>
                </div>
            </div>

            {/* ══════ PROGRESS BAR ══════ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px',
                background: isGod
                    ? 'linear-gradient(90deg, #6B4E10, #8B6914, #D4AF37, #FDE68A, #D4AF37)'
                    : `linear-gradient(90deg, ${cc}33, ${cc}66, ${cc}AA, ${cc})`,
                transition: 'width 0.8s ease', zIndex: 12,
                boxShadow: progress > 0.4 ? `0 0 8px ${cc}30` : 'none',
            }} />

            {/* ══════ SCORE ══════ */}
            <div style={{ position: 'absolute', top: '6px', right: '10px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 22 }}>
                <div style={{
                    fontSize: '11px', fontWeight: '700', color: dailyTitle.color,
                    background: isGod ? 'rgba(8,20,40,0.92)' : 'rgba(255,255,255,0.94)',
                    padding: '3px 9px', borderRadius: '6px', border: `1px solid ${dailyTitle.color}28`,
                    backdropFilter: 'blur(10px)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}>{dailyTitle.title}</div>
                <div style={{
                    fontSize: '11px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917',
                    background: isGod ? 'rgba(8,20,40,0.92)' : 'rgba(255,255,255,0.94)',
                    padding: '3px 9px', borderRadius: '6px',
                    backdropFilter: 'blur(10px)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}>{xp} / {goalXP}</div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MINI RUNNER V5 — SILHOUETTE JOURNEY
// The character is the composition. Everything else is negative space.
// ═══════════════════════════════════════════════════════

function getV5Sky(ratio: number, isGod: boolean): { bg: string; horizon: string; ground: string; accent: string } {
    if (isGod) return {
        bg: 'linear-gradient(180deg, #030508 0%, #08101E 30%, #0E1A30 60%, #162848 100%)',
        horizon: '#1A3050', ground: '#0A1420', accent: '#D4AF37',
    };
    if (ratio < 0.1) return { // Night → pre-dawn
        bg: 'linear-gradient(180deg, #0E0818 0%, #281838 25%, #503058 50%, #884868 75%, #C07058 100%)',
        horizon: '#C07058', ground: '#1A1018', accent: '#C07058',
    };
    if (ratio < 0.25) return { // Dawn
        bg: 'linear-gradient(180deg, #483868 0%, #885878 25%, #C87868 50%, #E8A060 75%, #F0C878 100%)',
        horizon: '#F0C878', ground: '#2A1828', accent: '#E8A060',
    };
    if (ratio < 0.45) return { // Morning
        bg: 'linear-gradient(180deg, #2070C0 0%, #40A0E0 30%, #70C0F0 60%, #B0E0FF 85%, #F0F8FF 100%)',
        horizon: '#E8F4FF', ground: '#183048', accent: '#40A0E0',
    };
    if (ratio < 0.65) return { // Noon
        bg: 'linear-gradient(180deg, #1060C8 0%, #2880E0 25%, #50A8F0 50%, #88CCF8 75%, #D0ECFF 100%)',
        horizon: '#D0ECFF', ground: '#102040', accent: '#2880E0',
    };
    if (ratio < 0.85) return { // Afternoon → sunset
        bg: 'linear-gradient(180deg, #182050 0%, #483068 20%, #884060 40%, #C85848 60%, #E88840 80%, #F8C040 100%)',
        horizon: '#F8C040', ground: '#181020', accent: '#E88840',
    };
    return { // Deep sunset → dusk
        bg: 'linear-gradient(180deg, #080810 0%, #181830 20%, #382848 40%, #684058 60%, #A05050 80%, #D87048 100%)',
        horizon: '#D87048', ground: '#0A0810', accent: '#D87048',
    };
}

function MiniRunnerV5Stage({ xp, goalXP }: { xp: number; goalXP: number }) {
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(xp >= goalXP);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(xp / maxXP, 1);
    const isGod = xp >= goalXP;
    const wr = xp / goalXP; // walk ratio
    const ws = wr >= 0.666 ? 0.2 : wr >= 0.268 ? 0.3 : wr >= 0.055 ? 0.42 : 0; // 0 = idle
    const sky = getV5Sky(wr, isGod);
    const isRunning = ws > 0 && !isGod;

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '', color: '#78716C' };
    })();

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 2800); }
            prevXpRef.current = xp; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp; prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    // Silhouette color: pure black normally, gold glow in god
    const sil = isGod ? '#D4AF37' : '#0A0A0A';
    const silShadow = isGod ? '0 0 20px #D4AF3780' : 'none';

    // Character position
    const charLeft = isGod ? 50 : 8 + Math.min(progress * 82, 82);
    const GROUND_Y = 82; // % from top where ground line sits

    return (
        <div style={{
            height: '110px', position: 'relative', overflow: 'hidden',
            background: sky.bg, transition: 'background 3s ease',
        }}>

            {/* ═══ GOD CELEBRATION ═══ */}
            {godCelebration && <>
                <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: `radial-gradient(circle at 50% ${GROUND_Y}%, #D4AF37AA, #FDE68A44, transparent 60%)`, animation: 'runner-god-flash 2.8s ease-out forwards', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '35%', left: '50%', zIndex: 55, fontSize: '20px', fontWeight: '300', color: '#FDE68A', letterSpacing: '12px', whiteSpace: 'nowrap', fontFamily: 'serif', animation: 'runner-god-title 2.8s ease-out forwards', pointerEvents: 'none' }}>神</div>
                {/* Expanding rings from character */}
                {[0, 1, 2].map(i => (
                    <div key={`ring-${i}`} style={{
                        position: 'absolute', top: `${GROUND_Y}%`, left: '50%',
                        width: '20px', height: '20px', borderRadius: '50%',
                        border: '1px solid #D4AF3780',
                        animation: `v5-god-ring 2s ease-out ${i * 0.4}s forwards`,
                        pointerEvents: 'none', zIndex: 52,
                    }} />
                ))}
            </>}

            {/* ═══ GOD: subtle star field ═══ */}
            {isGod && Array.from({ length: 12 }, (_, i) => {
                const sx = (i * 29 + 11) % 95; const sy = (i * 17 + 3) % 60;
                return <div key={`s-${i}`} style={{
                    position: 'absolute', top: `${sy}%`, left: `${sx}%`,
                    width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`,
                    borderRadius: '50%', background: i % 4 === 0 ? '#FDE68A' : '#fff',
                    opacity: 0.5 + (i % 3) * 0.2,
                    animation: `v3-star-twinkle ${2 + (i % 4) * 0.8}s ease-in-out ${i * 0.3}s infinite`,
                    zIndex: 1,
                }} />;
            })}

            {/* ═══ SINGLE CLOUD — lonely, slow ═══ */}
            {!isGod && wr > 0.2 && wr < 0.8 && (
                <div style={{
                    position: 'absolute', top: '15%', zIndex: 2,
                    animation: `v5-cloud ${wr > 0.4 ? 45 : 70}s linear infinite`,
                    opacity: 0.4,
                }}>
                    <div style={{ position: 'relative', width: '50px', height: '16px' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '5%', width: '35%', height: '70%', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />
                        <div style={{ position: 'absolute', bottom: '5%', left: '18%', width: '45%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
                        <div style={{ position: 'absolute', bottom: '2%', left: '42%', width: '35%', height: '75%', borderRadius: '50%', background: 'rgba(255,255,255,0.65)' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: '12%', width: '60%', height: '35%', borderRadius: '4px', background: 'rgba(255,255,255,0.5)' }} />
                    </div>
                </div>
            )}

            {/* ═══ HORIZON LINE — the one structural element ═══ */}
            <div style={{
                position: 'absolute', top: `${GROUND_Y}%`, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${sky.horizon}40 15%, ${sky.horizon}60 50%, ${sky.horizon}40 85%, transparent 100%)`,
                animation: 'v5-horizon 4s ease-in-out infinite',
                zIndex: 3,
            }} />

            {/* ═══ GROUND — minimal, just enough ═══ */}
            <div style={{
                position: 'absolute', top: `${GROUND_Y}%`, left: 0, right: 0, bottom: 0,
                background: `linear-gradient(180deg, ${sky.ground}00 0%, ${sky.ground}40 8%, ${sky.ground}80 30%, ${sky.ground} 100%)`,
                transition: 'background 3s ease', zIndex: 4,
            }}>
                {/* Subtle path texture */}
                {isRunning && <div style={{
                    position: 'absolute', top: '3px', left: 0, right: 0, height: '1px',
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 8px, ${sky.horizon}15 8px, ${sky.horizon}15 9px)`,
                    animation: `v5-ground ${ws * 4}s linear infinite`,
                }} />}
            </div>

            {/* ═══ MILESTONE DOTS — minimal markers on the horizon ═══ */}
            {milestones.map((m, i) => {
                const mx = (m.xp / maxXP) * 100;
                const cleared = xp >= m.xp;
                const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                return (
                    <div key={`m-${i}`} style={{
                        position: 'absolute', top: `calc(${GROUND_Y}% - 2px)`, left: `${Math.min(mx, 95)}%`,
                        transform: 'translateX(-50%)',
                        zIndex: 5,
                    }}>
                        {/* Dot */}
                        <div style={{
                            width: cleared ? '5px' : '3px',
                            height: cleared ? '5px' : '3px',
                            borderRadius: '50%',
                            background: cleared ? m.color : `${sky.horizon}40`,
                            '--dot': m.color,
                            animation: cleared ? 'v5-dot-pulse 3s ease-in-out infinite' : 'none',
                            transition: 'all 0.5s ease',
                        } as React.CSSProperties} />
                        {/* Label — only show for cleared or next */}
                        {(cleared || isNext) && (
                            <div style={{
                                position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '6px', fontWeight: '600', whiteSpace: 'nowrap',
                                color: cleared ? m.color : `${sky.horizon}80`,
                                letterSpacing: '0.5px',
                                opacity: cleared ? 0.9 : 0.5,
                            }}>{m.title}</div>
                        )}
                        {/* Vertical line for cleared */}
                        {cleared && (
                            <div style={{
                                position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)',
                                width: '1px', height: '12px',
                                background: `linear-gradient(180deg, ${m.color}60, transparent)`,
                            }} />
                        )}
                    </div>
                );
            })}

            {/* ═══ GOAL — simple vertical line ═══ */}
            <div style={{
                position: 'absolute', top: `calc(${GROUND_Y}% - 30px)`, right: '3%',
                width: '1px', height: '32px',
                background: isGod
                    ? 'linear-gradient(180deg, #D4AF37, #D4AF3760, transparent)'
                    : `linear-gradient(180deg, ${sky.horizon}80, ${sky.horizon}30, transparent)`,
                zIndex: 5,
            }}>
                <div style={{
                    position: 'absolute', top: '-2px', left: '-2px',
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: isGod ? '#D4AF37' : sky.horizon,
                    boxShadow: isGod ? '0 0 8px #D4AF37' : 'none',
                }} />
                <div style={{
                    position: 'absolute', top: '-12px', left: '-8px',
                    fontSize: '6px', fontWeight: '600', letterSpacing: '1px',
                    color: isGod ? '#D4AF3780' : `${sky.horizon}60`,
                }}>GOAL</div>
            </div>

            {/* ═══ THE CHARACTER — silhouette, the star ═══ */}
            <div style={{
                position: 'absolute',
                bottom: `${100 - GROUND_Y}%`,
                left: `${charLeft}%`,
                transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 20,
                filter: isGod ? 'drop-shadow(0 0 12px #D4AF3780)' : 'drop-shadow(1px 2px 3px rgba(0,0,0,0.3))',
                animation: godCelebration ? 'v5-god-ascend 2.8s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'v5-god-float 4s ease-in-out infinite'
                    : isRunning ? `v5-run ${ws}s ease-in-out infinite`
                    : 'v5-idle 3s ease-in-out infinite',
            }}>
                {/* God glow aura */}
                {isGod && !godCelebration && (
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '50px', height: '50px', borderRadius: '50%',
                        background: 'radial-gradient(circle, #D4AF3715, transparent 70%)',
                        transform: 'translate(-50%, -50%)',
                        animation: 'runner-god-aura 2s ease-in-out infinite',
                        zIndex: -1,
                    }} />
                )}

                {/* +XP */}
                {reaction && <div key={reaction.key} style={{
                    position: 'absolute', top: '-30px', left: '50%',
                    fontSize: reaction.points >= 15 ? '16px' : reaction.points >= 9 ? '14px' : '12px',
                    fontWeight: '300', fontFamily: 'serif', letterSpacing: '2px',
                    color: isGod ? '#FDE68A' : '#fff',
                    whiteSpace: 'nowrap',
                    animation: `v5-xp ${reaction.dur}ms ease-out forwards`,
                    textShadow: `0 0 20px ${reaction.ringColor || sky.accent}`,
                    zIndex: 22, pointerEvents: 'none',
                }}>+{reaction.points}</div>}

                {/* Energy in */}
                {reaction && reaction.energy > 0 && Array.from({ length: Math.min(reaction.energy, 6) }).map((_, i) => {
                    const a = (i / Math.min(reaction.energy, 6)) * 360;
                    const d = 20;
                    const sx = Math.cos(a * Math.PI / 180) * d;
                    const sy = Math.sin(a * Math.PI / 180) * d;
                    return <div key={`${reaction.key}-e${i}`} style={{
                        position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`,
                        width: '3px', height: '3px', borderRadius: '50%',
                        background: isGod ? '#FDE68A' : '#fff',
                        '--ex': `${-sx}px`, '--ey': `${-sy}px`,
                        animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`,
                        animationDelay: `${i * 40 + 80}ms`,
                        pointerEvents: 'none', zIndex: 19,
                    } as React.CSSProperties} />;
                })}

                {/* Dust trail */}
                {isRunning && !reaction && [0, 1, 2].map(i => (
                    <div key={`d-${i}`} style={{
                        position: 'absolute', bottom: `${1 + i * 2}px`, left: `${-2 - i * 4}px`,
                        width: '3px', height: '3px', borderRadius: '50%',
                        background: isGod ? '#D4AF3740' : `${sky.horizon}25`,
                        '--dx': `${-6 - i * 3}px`, '--dy': `${-2 - i * 2}px`,
                        animation: `v5-dust ${0.3 + i * 0.06}s ease-out infinite`,
                        animationDelay: `${i * 0.06}s`,
                    } as React.CSSProperties} />
                ))}

                {/* Speed streaks */}
                {wr >= 0.5 && isRunning && !reaction && [0, 1].map(i => (
                    <div key={`st-${i}`} style={{
                        position: 'absolute', top: `${10 + i * 14}px`, left: '-12px',
                        width: '14px', height: '1px',
                        background: `${sky.horizon}20`,
                        transformOrigin: 'right center',
                        animation: `v5-streak ${0.25 + i * 0.05}s ease-out ${i * 0.08}s infinite`,
                    }} />
                ))}

                {/* ── SCARF (flowing behind) ── */}
                {(isRunning || isGod) && (
                    <div style={{
                        position: 'absolute', top: '12px', left: '-10px',
                        width: `${isGod ? 16 : 8 + Math.min(wr * 10, 10)}px`,
                        height: `${isGod ? 10 : 5 + Math.min(wr * 4, 4)}px`,
                        background: isGod
                            ? 'linear-gradient(90deg, #D4AF37AA, #D4AF3760, #D4AF3720)'
                            : `linear-gradient(90deg, ${sil}CC, ${sil}60, ${sil}20)`,
                        borderRadius: '0 0 0 2px',
                        transformOrigin: 'right center',
                        animation: isRunning ? `v5-scarf ${ws * 1.3}s ease-in-out infinite` : 'v5-scarf 2s ease-in-out infinite',
                        zIndex: -1,
                    }} />
                )}

                {/* ── HEAD ── */}
                <div style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: sil, margin: '0 auto', position: 'relative',
                    boxShadow: silShadow,
                }}>
                    {/* Hair — swept back by wind */}
                    <div style={{
                        position: 'absolute', top: '-4px', left: '-2px', width: '18px', height: '9px',
                        background: sil, borderRadius: '9px 9px 2px 2px', zIndex: -1,
                        transformOrigin: 'right center',
                        animation: isRunning ? `v5-hair ${ws}s ease-in-out infinite` : 'none',
                    }} />
                    {/* Eye — single white dot, that's all */}
                    {!isGod && <div style={{ position: 'absolute', top: '5px', right: '3px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#fff' }} />}
                    {/* God eyes — gold */}
                    {isGod && <>
                        <div style={{ position: 'absolute', top: '5px', left: '3px', width: '2px', height: '2px', borderRadius: '50%', background: '#FDE68A', boxShadow: '0 0 4px #D4AF37' }} />
                        <div style={{ position: 'absolute', top: '5px', right: '3px', width: '2px', height: '2px', borderRadius: '50%', background: '#FDE68A', boxShadow: '0 0 4px #D4AF37' }} />
                    </>}
                </div>

                {/* ── BODY ── */}
                <div style={{
                    width: '10px', height: '12px',
                    background: sil, borderRadius: '3px 3px 1px 1px',
                    margin: '-2px auto 0', position: 'relative',
                    boxShadow: silShadow,
                }}>
                    {/* Arms — big swing range */}
                    <div style={{
                        position: 'absolute', top: '0px', left: '-4px',
                        width: '4px', height: '10px', background: sil,
                        borderRadius: '2px', transformOrigin: 'top center',
                        animation: isRunning ? `v5-arm-back ${ws}s ease-in-out infinite` : 'none',
                    }} />
                    <div style={{
                        position: 'absolute', top: '0px', right: '-4px',
                        width: '4px', height: '10px', background: sil,
                        borderRadius: '2px', transformOrigin: 'top center',
                        animation: isRunning ? `v5-arm-front ${ws}s ease-in-out infinite` : 'none',
                    }} />
                </div>

                {/* ── LEGS ── */}
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-1px' }}>
                    <div style={{
                        width: '4px', height: '10px', background: sil,
                        borderRadius: '1px 1px 2px 2px', transformOrigin: 'top center',
                        animation: isRunning ? `v5-leg-back ${ws}s ease-in-out infinite` : 'none',
                    }} />
                    <div style={{
                        width: '4px', height: '10px', background: sil,
                        borderRadius: '1px 1px 2px 2px', transformOrigin: 'top center',
                        animation: isRunning ? `v5-leg-front ${ws}s ease-in-out infinite` : 'none',
                    }} />
                </div>
            </div>

            {/* ═══ PROGRESS — thin line at bottom ═══ */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: `${progress * 100}%`, height: '2px',
                background: isGod
                    ? 'linear-gradient(90deg, transparent, #D4AF3760, #D4AF37, #FDE68A)'
                    : `linear-gradient(90deg, transparent, ${sky.accent}40, ${sky.accent}80)`,
                transition: 'width 0.8s ease', zIndex: 10,
            }} />

            {/* ═══ SCORE — large, typographic ═══ */}
            <div style={{
                position: 'absolute', top: '8px', right: '12px', zIndex: 22,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px',
            }}>
                {dailyTitle.title && (
                    <div style={{
                        fontSize: '10px', fontWeight: '600', letterSpacing: '2px',
                        color: isGod ? '#D4AF37' : `${sky.horizon}CC`,
                        animation: 'v5-score-in 0.5s ease-out',
                    }}>{dailyTitle.title}</div>
                )}
                <div style={{
                    fontSize: '18px', fontWeight: '200', fontFamily: 'serif',
                    color: isGod ? '#FDE68A' : `${sky.horizon}AA`,
                    letterSpacing: '3px', lineHeight: 1,
                }}>{xp}<span style={{ fontSize: '10px', opacity: 0.5, fontWeight: '400' }}>/{goalXP}</span></div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// MINI RUNNER V6 — V4 EVOLVED: MAXIMUM DENSITY
// ═══════════════════════════════════════════════════════

function getV6Sky(ratio: number, isGod: boolean) {
    if (isGod) return {
        bg: 'linear-gradient(180deg, #020608 0%, #06101E 12%, #0C1E38 28%, #143050 48%, #1C4068 68%, #143050 85%, #0C1E38 100%)',
        sun: '#E0E0E0', sg: '#E0E0E020', gTop: '#4A3A08', gMid: '#6A5810', gBot: '#7A6818',
        grass: '#2A4A18', hFar: '#081828', hMid: '#102840', hNear: '#183858', tree: '#0C2038',
        mist: false, shimmer: false, cloudOp: 0,
    };
    if (ratio < 0.1) return {
        bg: 'linear-gradient(180deg, #120820 0%, #2A1240 12%, #4A1858 28%, #722868 48%, #A04060 68%, #C86050 82%, #E89048 95%, #F0B848 100%)',
        sun: '#E86830', sg: '#E8683040', gTop: '#1E4830', gMid: '#164020', gBot: '#103818',
        grass: '#2A6838', hFar: '#381850', hMid: '#582858', hNear: '#703858', tree: '#183028',
        mist: true, shimmer: false, cloudOp: 0.25,
    };
    if (ratio < 0.3) return {
        bg: 'linear-gradient(180deg, #2068C0 0%, #3890D8 15%, #58B0E8 32%, #80C8F0 50%, #A8E0F8 70%, #D0F0FF 85%, #FFF8E8 100%)',
        sun: '#FFD040', sg: '#FFD04080', gTop: '#38984A', gMid: '#2A8838', gBot: '#1E7828',
        grass: '#48B058', hFar: '#68B888', hMid: '#50A870', hNear: '#389858', tree: '#287040',
        mist: false, shimmer: false, cloudOp: 0.75,
    };
    if (ratio < 0.6) return {
        bg: 'linear-gradient(180deg, #1058C8 0%, #2878E0 12%, #48A0F0 28%, #70C0F8 48%, #98D8FF 68%, #C0ECFF 85%, #E8F8FF 100%)',
        sun: '#FFF080', sg: '#FFF08050', gTop: '#48B058', gMid: '#389848', gBot: '#288038',
        grass: '#58C068', hFar: '#78C890', hMid: '#58B878', hNear: '#40A858', tree: '#308848',
        mist: false, shimmer: true, cloudOp: 0.6,
    };
    if (ratio < 0.85) return {
        bg: 'linear-gradient(180deg, #101840 0%, #281858 10%, #501860 22%, #802850 36%, #B83840 50%, #D85838 64%, #E88030 78%, #F0A828 90%, #F8D028 100%)',
        sun: '#E84020', sg: '#E8402040', gTop: '#486818', gMid: '#385810', gBot: '#284808',
        grass: '#587838', hFar: '#301848', hMid: '#502840', hNear: '#683830', tree: '#284020',
        mist: false, shimmer: false, cloudOp: 0.4,
    };
    return {
        bg: 'linear-gradient(180deg, #060810 0%, #101828 15%, #282040 30%, #483050 45%, #683858 60%, #884048 75%, #A85040 88%, #C86838 100%)',
        sun: '#C84020', sg: '#C8402030', gTop: '#383818', gMid: '#303010', gBot: '#282808',
        grass: '#485828', hFar: '#181830', hMid: '#282040', hNear: '#403048', tree: '#202818',
        mist: false, shimmer: false, cloudOp: 0.2,
    };
}

function MiniRunnerV6Stage({ xp, goalXP }: { xp: number; goalXP: number }) {
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(xp >= goalXP);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(xp / maxXP, 1);
    const isGod = xp >= goalXP;
    const wr = xp / goalXP;
    const ws = wr >= 0.666 ? 0.18 : wr >= 0.268 ? 0.26 : wr >= 0.055 ? 0.38 : 0.55;
    const sky = getV6Sky(wr, isGod);
    const isRunning = wr > 0.003;

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const cc = dailyTitle.color;

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 3500); }
            prevXpRef.current = xp; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp; prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    const sunAngle = Math.min(wr, 1) * 150 + 15;
    const sunX = 50 - Math.cos(sunAngle * Math.PI / 180) * 44;
    const sunY = 46 - Math.sin(sunAngle * Math.PI / 180) * 38;
    const GH = 34; // ground height
    const SH = 160; // stage height
    const charLeft = isGod ? 50 : 5 + Math.min(progress * 86, 86);

    return (
        <div style={{ height: `${SH}px`, position: 'relative', overflow: 'hidden', background: sky.bg, transition: 'background 3s ease' }}>

            {/* === GOD CELEBRATION === */}
            {godCelebration && <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'radial-gradient(circle at 50% 65%, #D4AF37CC, #FDE68A55, transparent 65%)', animation: 'runner-god-flash 3.5s ease-out forwards', pointerEvents: 'none' }} />}
            {godCelebration && <div style={{ position: 'absolute', top: '40%', left: '50%', zIndex: 65, fontSize: '28px', fontWeight: '900', color: '#FDE68A', textShadow: '0 0 60px #D4AF37, 0 0 120px #D4AF3780, 0 4px 12px rgba(0,0,0,0.8)', letterSpacing: '12px', whiteSpace: 'nowrap', animation: 'runner-god-title 3.5s ease-out forwards', pointerEvents: 'none' }}>本日の神</div>}
            {godCelebration && Array.from({ length: 32 }).map((_, i) => {
                const a = (i / 32) * 360;
                return <div key={`b-${i}`} style={{ position: 'absolute', top: '55%', left: '50%', width: i % 3 === 0 ? '7px' : '4px', height: i % 3 === 0 ? '7px' : '4px', borderRadius: i % 2 === 0 ? '1px' : '50%', background: ['#D4AF37', '#FDE68A', '#F59E0B', '#FBBF24', '#FFE082', '#A78BFA', '#10B981'][i % 7], '--bx': `${Math.cos(a * Math.PI / 180) * 25}px`, '--by': `${Math.sin(a * Math.PI / 180) * 18}px`, animation: `runner-god-burst 2.5s ease-out ${i * 25}ms forwards`, zIndex: 62, pointerEvents: 'none' } as React.CSSProperties} />;
            })}

            {/* === AURORA (god) === */}
            {isGod && <>
                <div style={{ position: 'absolute', top: 0, left: '-20%', right: '-20%', height: '55%', background: 'linear-gradient(90deg, transparent 0%, #10B98118 12%, #4ADE8022 28%, #D4AF371A 42%, #A78BFA22 58%, #F472B618 72%, #10B98118 88%, transparent 100%)', animation: 'v6-aurora-1 12s ease-in-out infinite', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '5%', left: '-20%', right: '-20%', height: '40%', background: 'linear-gradient(90deg, transparent 0%, #A78BFA14 18%, #D4AF3714 38%, #10B98114 58%, #F472B614 78%, transparent 100%)', animation: 'v6-aurora-2 16s ease-in-out 4s infinite', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '12%', left: '-20%', right: '-20%', height: '28%', background: 'linear-gradient(90deg, transparent 0%, #FDE68A0A 25%, #A78BFA10 50%, #10B9810A 75%, transparent 100%)', animation: 'v6-aurora-1 20s ease-in-out 8s infinite', zIndex: 1 }} />
            </>}

            {/* === STARS === */}
            {(isGod || wr >= 0.6) && Array.from({ length: isGod ? 35 : 12 }, (_, i) => {
                const sx = (i * 29 + 13) % 97; const sy = (i * 17 + 5) % 55;
                const ss = 0.8 + (i % 4) * 0.6; const sd = 1 + (i % 7) * 0.6;
                return <div key={`s-${i}`} style={{ position: 'absolute', top: `${sy}px`, left: `${sx}%`, width: `${ss}px`, height: `${ss}px`, background: i % 9 === 0 ? '#FDE68A' : i % 7 === 0 ? '#C4B5FD' : i % 5 === 0 ? '#93C5FD' : i % 3 === 0 ? '#FCA5A5' : '#fff', borderRadius: '50%', animation: `v6-star ${sd}s ease-in-out ${i * 0.1}s infinite`, zIndex: 1, opacity: isGod ? 1 : 0.35 }} />;
            })}

            {/* === SUN / MOON === */}
            {!isGod ? (
                <div style={{ position: 'absolute', top: `${sunY}%`, left: `${sunX}%`, width: '30px', height: '30px', zIndex: 2, transition: 'top 3s ease, left 3s ease', '--sg': sky.sg, animation: 'v6-sun 5s ease-in-out infinite' } as React.CSSProperties}>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={`ray-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '1.5px', height: wr > 0.3 ? '36px' : '24px', background: `linear-gradient(180deg, ${sky.sun}20, transparent)`, transformOrigin: '50% 0%', transform: `rotate(${i * 36}deg)`, opacity: 0.5 + Math.sin(i * 1.2) * 0.3 }} />
                    ))}
                    <div style={{ position: 'absolute', inset: '-5px', borderRadius: '50%', background: `radial-gradient(circle, ${sky.sun}18, transparent 65%)` }} />
                    <div style={{ position: 'absolute', inset: '5px', borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #FFFEF0, ${sky.sun}, ${sky.sun}CC)`, boxShadow: `0 0 20px ${sky.sg}, 0 0 50px ${sky.sg}` }} />
                </div>
            ) : (
                <div style={{ position: 'absolute', top: '10px', left: '82%', zIndex: 2, '--sg': '#E0E0E020', animation: 'v6-sun 7s ease-in-out infinite' } as React.CSSProperties}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'radial-gradient(circle at 28% 28%, #F5F5F5, #D4D4D4, #A0A0A0)', boxShadow: '0 0 16px #E0E0E030', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-2px', right: '-3px', width: '18px', height: '18px', borderRadius: '50%', background: '#061020' }} />
                        <div style={{ position: 'absolute', top: '9px', left: '3px', width: '3px', height: '3px', borderRadius: '50%', background: '#C0C0C035' }} />
                        <div style={{ position: 'absolute', top: '14px', left: '9px', width: '2px', height: '2px', borderRadius: '50%', background: '#C0C0C025' }} />
                        <div style={{ position: 'absolute', top: '6px', left: '7px', width: '2px', height: '1.5px', borderRadius: '50%', background: '#C0C0C020' }} />
                    </div>
                </div>
            )}

            {/* === CLOUDS (doubled, 6 per half) === */}
            {sky.cloudOp > 0 && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '70px', zIndex: 3, animation: `v6-cloud ${wr > 0.3 ? 50 : 80}s linear infinite`, opacity: sky.cloudOp }}>
                    {[
                        { x: 2, y: 5, s: 1.0, w: 62 }, { x: 15, y: 18, s: 0.6, w: 40 }, { x: 30, y: 2, s: 1.2, w: 70 },
                        { x: 48, y: 12, s: 0.75, w: 48 }, { x: 62, y: 6, s: 1.05, w: 58 }, { x: 78, y: 20, s: 0.55, w: 36 },
                        { x: 88, y: 4, s: 0.9, w: 54 },
                    ].map((c, ci) => (
                        <div key={`c-${ci}`} style={{ position: 'absolute', top: `${c.y}px`, left: `${c.x}%`, transform: `scale(${c.s})` }}>
                            <div style={{ position: 'relative', width: `${c.w}px`, height: '22px', filter: 'blur(0.2px)' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: '0%', width: '32%', height: '65%', borderRadius: '50%', background: 'rgba(255,255,255,0.82)' }} />
                                <div style={{ position: 'absolute', bottom: '5%', left: '12%', width: '40%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.92)' }} />
                                <div style={{ position: 'absolute', bottom: '3%', left: '32%', width: '38%', height: '88%', borderRadius: '50%', background: 'rgba(255,255,255,0.88)' }} />
                                <div style={{ position: 'absolute', bottom: '1%', left: '50%', width: '30%', height: '62%', borderRadius: '50%', background: 'rgba(255,255,255,0.78)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '62%', width: '24%', height: '48%', borderRadius: '50%', background: 'rgba(255,255,255,0.68)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '8%', width: '72%', height: '32%', borderRadius: '6px', background: 'rgba(255,255,255,0.7)' }} />
                                <div style={{ position: 'absolute', bottom: '-3px', left: '10%', width: '60%', height: '18%', borderRadius: '50%', background: 'rgba(0,0,0,0.02)' }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* === BIRDS === */}
            {!isGod && wr >= 0.12 && (
                <div style={{ position: 'absolute', top: '6px', left: 0, width: '200%', height: '30px', zIndex: 3, animation: `v6-bird-drift ${wr > 0.4 ? 22 : 38}s linear infinite` }}>
                    {[{ x: 18, y: 4, s: 0.65 }, { x: 20, y: 7, s: 0.55 }, { x: 16, y: 7, s: 0.5 }, { x: 22, y: 11, s: 0.4 }, { x: 14, y: 10, s: 0.45 }, { x: 24, y: 14, s: 0.35 }, { x: 12, y: 13, s: 0.35 }].map((b, i) => (
                        <div key={`bird-${i}`} style={{ position: 'absolute', top: `${b.y}px`, left: `${b.x}%`, width: `${8 * b.s}px`, height: `${3.5 * b.s}px`, borderTop: `${2 * b.s}px solid rgba(0,0,0,0.15)`, borderLeft: `${4 * b.s}px solid transparent`, borderRight: `${4 * b.s}px solid transparent`, borderBottom: 'none', animation: `v6-bird-flap ${0.7 + i * 0.12}s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                </div>
            )}

            {/* === FAR MOUNTAINS === */}
            <div style={{ position: 'absolute', bottom: `${GH}px`, left: 0, width: '200%', height: '45px', zIndex: 4, animation: `v6-para-1 ${wr > 0.03 ? 100 : 300}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 45" preserveAspectRatio="none">
                    <defs><linearGradient id="v6mf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sky.hFar} stopOpacity="0.55" /><stop offset="100%" stopColor={sky.hFar} stopOpacity="0.15" /></linearGradient></defs>
                    <path d="M0,45 L8,30 L25,36 L50,20 L75,32 L95,12 L120,24 L148,6 L175,22 L198,15 L222,30 L248,10 L278,24 L305,18 L330,32 L355,12 L378,26 L400,20 L425,30 L450,20 L478,36 L500,18 L528,30 L550,10 L578,24 L600,6 L628,22 L650,15 L678,30 L700,10 L728,24 L748,18 L775,32 L795,14 L800,22 L800,45 Z" fill="url(#v6mf)" />
                </svg>
            </div>

            {/* === MID HILLS === */}
            <div style={{ position: 'absolute', bottom: `${GH}px`, left: 0, width: '200%', height: '32px', zIndex: 5, animation: `v6-para-2 ${wr > 0.03 ? 70 : 200}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 32" preserveAspectRatio="none">
                    <path d="M0,32 L18,20 L45,24 L80,14 L115,22 L150,8 L182,18 L218,13 L255,24 L290,10 L328,20 L360,15 L400,26 L432,12 L468,22 L500,8 L535,18 L570,13 L608,24 L640,10 L678,20 L710,15 L750,26 L782,12 L800,18 L800,32 Z" fill={sky.hMid} opacity={isGod ? 0.5 : 0.3} />
                </svg>
            </div>

            {/* === NEAR HILLS + TREES === */}
            <div style={{ position: 'absolute', bottom: `${GH - 2}px`, left: 0, width: '200%', height: '24px', zIndex: 6, animation: `v6-para-3 ${wr > 0.03 ? 48 : 130}s linear infinite` }}>
                <svg width="100%" height="100%" viewBox="0 0 800 24" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                    <path d="M0,24 L22,16 L55,20 L90,10 L125,18 L160,6 L195,15 L230,11 L268,20 L300,8 L338,16 L370,12 L408,20 L438,10 L475,18 L510,6 L545,15 L580,11 L618,20 L650,8 L688,16 L720,12 L758,20 L788,10 L800,15 L800,24 Z" fill={sky.hNear} opacity={isGod ? 0.55 : 0.35} />
                </svg>
                {Array.from({ length: 28 }, (_, i) => {
                    const tx = i * 3.6 + ((i * 11) % 3); const th = 12 + (i % 5) * 4; const tw = 5 + (i % 4) * 2;
                    const shapes = [
                        'polygon(50% 0%, 92% 88%, 55% 72%, 8% 88%)',
                        'ellipse(46% 46% at 50% 56%)',
                        'polygon(50% 0%, 78% 32%, 92% 82%, 8% 82%, 22% 32%)',
                        'polygon(50% 0%, 85% 38%, 78% 38%, 95% 88%, 5% 88%, 22% 38%, 15% 38%)',
                    ];
                    return (
                        <div key={`t-${i}`} style={{ position: 'absolute', bottom: 0, left: `${tx}%`, display: 'flex', flexDirection: 'column', alignItems: 'center', '--tw': `${1 + (i % 4) * 0.7}deg`, animation: `v6-tree ${2.2 + (i % 5) * 0.5}s ease-in-out ${i * 0.12}s infinite`, transformOrigin: 'bottom center' } as React.CSSProperties}>
                            <div style={{ width: `${tw + 6}px`, height: `${th}px`, background: `${sky.tree}${['CC', 'AA', 'DD', 'BB', 'EE'][i % 5]}`, clipPath: shapes[i % 4] }} />
                            <div style={{ width: '2px', height: '4px', background: isGod ? '#2A1A08' : '#4A3020', opacity: 0.35, marginTop: '-2px' }} />
                        </div>
                    );
                })}
            </div>

            {/* === MIST === */}
            {sky.mist && <>
                <div style={{ position: 'absolute', bottom: `${GH + 6}px`, left: 0, right: 0, height: '20px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.1))', '--mdx': '-22px', '--mo': '0.1', animation: 'v6-mist 9s ease-in-out infinite', zIndex: 7 } as React.CSSProperties} />
                <div style={{ position: 'absolute', bottom: `${GH + 18}px`, left: 0, right: 0, height: '16px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06))', '--mdx': '-15px', '--mo': '0.06', animation: 'v6-mist 14s ease-in-out 3s infinite', zIndex: 7 } as React.CSSProperties} />
            </>}

            {/* === SHIMMER === */}
            {sky.shimmer && <div style={{ position: 'absolute', bottom: `${GH}px`, left: 0, right: 0, height: '18px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.03))', animation: 'v6-shimmer 2.5s ease-in-out infinite', zIndex: 7 }} />}

            {/* === PARTICLES === */}
            {!isGod && wr >= 0.03 && Array.from({ length: 8 }, (_, i) => {
                const lx = 6 + i * 12; const ly = 35 + (i % 4) * 18;
                const isAutumn = wr > 0.6;
                return <div key={`lf-${i}`} style={{ position: 'absolute', top: `${ly}px`, left: `${lx}%`, width: '5px', height: '3.5px', background: isAutumn ? ['#D85828', '#C87020', '#B83838'][i % 3] : ['#58B858', '#78C878', '#40A040'][i % 3], borderRadius: '0 55% 55% 0', '--lf-dx': `${-55 - i * 8}px`, '--lf-dy': `${14 + (i % 3) * 10}px`, '--lf-rot': `${220 + i * 55}deg`, '--lf-op': '0.5', animation: `v6-leaf ${3.2 + i * 0.6}s ease-in-out ${i * 0.9}s infinite`, zIndex: 8, pointerEvents: 'none' } as React.CSSProperties} />;
            })}
            {isGod && Array.from({ length: 18 }, (_, i) => {
                const fx = (i * 6 + 2) % 97; const fy = 18 + (i * 11 + 3) % 60;
                return <div key={`ff-${i}`} style={{ position: 'absolute', top: `${fy}px`, left: `${fx}%`, width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`, borderRadius: '50%', background: ['#FDE68A', '#A78BFA', '#10B981', '#F472B6', '#60A5FA', '#FBBF24'][i % 6], boxShadow: `0 0 5px ${['#FDE68A', '#A78BFA', '#10B981', '#F472B6', '#60A5FA', '#FBBF24'][i % 6]}50`, '--ff-dx': `${(i % 2 === 0 ? 10 : -10)}px`, '--ff-dy': `${-6 - (i % 4) * 3}px`, '--ff-op': '0.6', animation: `v6-firefly ${2.2 + (i % 5) * 0.4}s ease-in-out ${i * 0.3}s infinite`, zIndex: 8 } as React.CSSProperties} />;
            })}

            {/* === BUTTERFLIES === */}
            {!isGod && wr >= 0.2 && wr < 0.7 && [
                { x: 20, y: 55, bx: 15, by: -20, c: '#F472B6' },
                { x: 60, y: 45, bx: -12, by: -15, c: '#A78BFA' },
                { x: 80, y: 60, bx: 10, by: -18, c: '#FBBF24' },
            ].map((bf, i) => (
                <div key={`bf-${i}`} style={{
                    position: 'absolute', top: `${bf.y}px`, left: `${bf.x}%`,
                    '--bx': `${bf.bx}px`, '--by': `${bf.by}px`,
                    animation: `v6-butterfly ${4 + i}s ease-in-out ${i * 1.5}s infinite`,
                    zIndex: 8,
                } as React.CSSProperties}>
                    <div style={{ display: 'flex', gap: '0px', animation: `v6-bf-wings 0.3s ease-in-out infinite` }}>
                        <div style={{ width: '3px', height: '4px', borderRadius: '50% 50% 50% 0', background: bf.c, opacity: 0.7 }} />
                        <div style={{ width: '3px', height: '4px', borderRadius: '50% 50% 0 50%', background: bf.c, opacity: 0.7 }} />
                    </div>
                </div>
            ))}

            {/* === GROUND === */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${GH}px`, background: `linear-gradient(180deg, ${sky.gTop} 0%, ${sky.gMid} 40%, ${sky.gBot} 100%)`, borderTop: `2px solid ${sky.gTop}`, transition: 'all 3s ease', zIndex: 9 }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 12px, rgba(0,0,0,0.03) 12px, rgba(0,0,0,0.03) 13px, transparent 13px, transparent 24px, rgba(255,255,255,0.02) 24px, rgba(255,255,255,0.02) 25px)`, animation: `v6-ground ${ws * 4.5}s linear infinite` }} />
                <div style={{ position: 'absolute', top: '8px', left: 0, right: 0, height: '6px', background: isGod ? 'rgba(212,175,55,0.1)' : 'rgba(139,90,43,0.08)', borderRadius: '3px' }} />
                <div style={{ position: 'absolute', top: '11px', left: 0, right: 0, height: '2px', background: isGod ? 'rgba(212,175,55,0.05)' : 'rgba(139,90,43,0.04)' }} />
                {Array.from({ length: 14 }, (_, i) => (
                    <div key={`p-${i}`} style={{ position: 'absolute', top: `${16 + (i % 4) * 3}px`, left: `${(i * 7.5 + 1.5) % 100}%`, width: `${2 + (i % 3)}px`, height: `${1.5 + (i % 2) * 0.5}px`, borderRadius: '50%', background: isGod ? 'rgba(212,175,55,0.12)' : 'rgba(0,0,0,0.05)' }} />
                ))}
            </div>

            {/* === GRASS (28 blades, dense wave) === */}
            {Array.from({ length: 28 }, (_, i) => {
                const h = 3.5 + (i % 7) * 2.2;
                return <div key={`g-${i}`} style={{ position: 'absolute', bottom: `${GH - 1}px`, left: `${(i * 3.55) + ((i * 11 + 5) % 4) * 0.5}%`, width: '1.5px', height: `${h}px`, background: [sky.grass, `${sky.grass}DD`, `${sky.grass}BB`, sky.gTop, `${sky.grass}EE`, `${sky.grass}CC`][i % 6], borderRadius: '1px 1px 0 0', transformOrigin: 'bottom center', '--gsw': `${2 + (i % 8) * 0.8}deg`, animation: `v6-grass ${1.2 + (i % 7) * 0.18}s ease-in-out ${i * 0.06}s infinite`, zIndex: 10 } as React.CSSProperties} />;
            })}

            {/* === FLOWERS (with petals, dense) === */}
            {!isGod && [
                { x: 4, c: '#F472B6', s: 4, p: 5 }, { x: 11, c: '#FBBF24', s: 3, p: 4 }, { x: 20, c: '#A78BFA', s: 3.5, p: 5 },
                { x: 30, c: '#FB923C', s: 3, p: 4 }, { x: 40, c: '#60A5FA', s: 3.5, p: 5 }, { x: 50, c: '#F472B6', s: 3, p: 4 },
                { x: 60, c: '#34D399', s: 4, p: 6 }, { x: 70, c: '#FBBF24', s: 3, p: 4 }, { x: 80, c: '#A78BFA', s: 3.5, p: 5 },
                { x: 90, c: '#FB923C', s: 3, p: 4 }, { x: 97, c: '#F472B6', s: 3, p: 5 },
            ].map((f, i) => (
                <div key={`fl-${i}`} style={{ position: 'absolute', bottom: `${GH}px`, left: `${f.x}%`, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {Array.from({ length: f.p }, (_, pi) => { const pa = (pi / f.p) * 360; return <div key={pi} style={{ position: 'absolute', top: `${-Math.sin(pa * Math.PI / 180) * (f.s * 0.45)}px`, left: `${Math.cos(pa * Math.PI / 180) * (f.s * 0.45)}px`, width: `${f.s * 0.5}px`, height: `${f.s * 0.35}px`, borderRadius: '50%', background: `${f.c}88`, transform: `rotate(${pa}deg)` }} />; })}
                    <div style={{ width: `${f.s * 0.45}px`, height: `${f.s * 0.45}px`, borderRadius: '50%', background: f.c, boxShadow: `0 0 3px ${f.c}38`, position: 'relative', zIndex: 1 }} />
                    <div style={{ width: '1px', height: '4px', background: sky.grass, opacity: 0.45 }} />
                </div>
            ))}

            {/* === START GATE (torii) === */}
            <div style={{ position: 'absolute', bottom: `${GH}px`, left: '0.8%', zIndex: 12 }}>
                <div style={{ position: 'relative', width: '26px', height: '44px' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '4px', height: '44px', background: isGod ? 'linear-gradient(180deg, #E8C840, #A08020, #705810)' : 'linear-gradient(180deg, #B8996E, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: '1px', width: '4px', height: '44px', background: isGod ? 'linear-gradient(180deg, #E8C840, #A08020, #705810)' : 'linear-gradient(180deg, #B8996E, #8B7355, #6B5B3A)', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ position: 'absolute', top: 0, left: '-5px', right: '-5px', height: '5px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37)' : 'linear-gradient(180deg, #C4A876, #A08860)', borderRadius: '3px', boxShadow: isGod ? '0 0 10px #D4AF3740' : '0 1px 4px rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', top: '8px', left: '-2px', right: '-2px', height: '3px', background: isGod ? '#D4AF37BB' : '#A0886070', borderRadius: '1px' }} />
                    <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '6px', height: '6px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '6px', height: '6px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#C4A876' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', fontSize: '5px', fontWeight: '900', letterSpacing: '1px', color: isGod ? '#FDE68A' : '#6B5B3A', whiteSpace: 'nowrap' }}>START</div>
                </div>
            </div>

            {/* === MILESTONE GATES === */}
            {milestones.map((m, i) => {
                const mx = (m.xp / maxXP) * 100;
                const cleared = xp >= m.xp;
                const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                return (
                    <div key={`ms-${i}`} style={{ position: 'absolute', bottom: `${GH}px`, left: `${Math.min(mx, 90)}%`, zIndex: 12 }}>
                        <div style={{ position: 'relative', width: '10px', height: cleared ? '26px' : '16px', transition: 'height 0.6s ease' }}>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '2.5px', height: '100%', background: cleared ? `linear-gradient(180deg, ${m.color}70, ${m.color})` : 'linear-gradient(180deg, #D6D3D150, #A8A29E)', borderRadius: '1px 1px 0 0' }} />
                            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '2.5px', height: '100%', background: cleared ? `linear-gradient(180deg, ${m.color}70, ${m.color})` : 'linear-gradient(180deg, #D6D3D150, #A8A29E)', borderRadius: '1px 1px 0 0' }} />
                            <div style={{ position: 'absolute', top: 0, left: '-2px', right: '-2px', height: '3.5px', background: cleared ? m.color : '#A8A29E70', borderRadius: '2px', boxShadow: cleared ? `0 0 6px ${m.color}40` : 'none' }} />
                            <div style={{ position: 'absolute', top: '-5px', left: '50%', width: cleared ? '7px' : '4px', height: cleared ? '7px' : '4px', borderRadius: '50%', background: cleared ? `radial-gradient(circle at 35% 35%, ${m.color}EE, ${m.color})` : '#A8A29E50', '--b': m.color, animation: cleared ? 'v6-beacon 2.8s ease-in-out infinite' : 'none', transform: 'translateX(-50%)', transition: 'all 0.6s ease' } as React.CSSProperties} />
                            {cleared && <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', width: '1px', height: '18px', background: `linear-gradient(180deg, transparent, ${m.color}50, transparent)`, animation: 'v6-beam 3.5s ease-in-out infinite' }} />}
                        </div>
                        {(cleared || isNext) && <div style={{ position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)', fontSize: '6px', fontWeight: '800', whiteSpace: 'nowrap', color: cleared ? m.color : '#A8A29E', textShadow: cleared ? `0 0 12px ${m.color}50, 0 1px 3px rgba(0,0,0,0.5)` : '0 1px 2px rgba(0,0,0,0.3)', letterSpacing: '0.4px' }}>{m.title}</div>}
                    </div>
                );
            })}

            {/* === GOAL FLAG === */}
            <div style={{ position: 'absolute', bottom: `${GH}px`, right: '1.2%', zIndex: 12 }}>
                <div style={{ position: 'relative', width: '4px', height: '54px', background: isGod ? 'linear-gradient(180deg, #FDE68A, #D4AF37, #8B6914, #604808)' : 'linear-gradient(180deg, #78716C, #57534E, #44403C, #2A2520)', borderRadius: '2px 2px 0 0' }}>
                    <div style={{ position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: isGod ? 'radial-gradient(circle at 30% 30%, #FDE68A, #D4AF37, #A08020)' : 'radial-gradient(circle at 30% 30%, #D4AF37, #B8960F)', boxShadow: isGod ? '0 0 14px #D4AF37, 0 0 28px #D4AF3740' : '0 0 6px #D4AF3740' }} />
                    <div style={{ position: 'absolute', top: '6px', left: '4px', width: '34px', height: '20px', background: isGod ? 'linear-gradient(135deg, #D4AF37, #FDE68A, #D4AF37, #FDE68A)' : 'linear-gradient(135deg, #D4AF37, #F59E0B, #D4AF37)', clipPath: 'polygon(0 0, 84% 5%, 68% 50%, 88% 95%, 0 100%)', animation: 'v6-flag 2s ease-in-out infinite', transformOrigin: 'left center', boxShadow: isGod ? '0 0 18px #D4AF3738' : 'none' }}>
                        <div style={{ fontSize: '6.5px', fontWeight: '900', color: isGod ? '#6B4E10' : '#fff', letterSpacing: '1.5px', paddingTop: '5.5px', paddingLeft: '4px', textShadow: isGod ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}>GOAL</div>
                    </div>
                    <div style={{ position: 'absolute', top: '-18px', left: '-5px', fontSize: '5.5px', fontWeight: '700', color: isGod ? '#FDE68A55' : '#78716C55', whiteSpace: 'nowrap' }}>{goalXP}</div>
                </div>
            </div>

            {/* ═══════ THE CHARACTER — SVG proportions, bigger ═══════ */}
            <div style={{
                position: 'absolute', bottom: `${GH}px`,
                left: `${charLeft}%`, transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 20,
                filter: isGod ? 'drop-shadow(0 0 14px #D4AF3780)' : `drop-shadow(1px 2px 4px rgba(0,0,0,0.3))`,
                animation: godCelebration ? 'v6-god-ascend 3.5s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'v6-god-float 4s ease-in-out infinite'
                    : isRunning ? `v6-run ${ws}s ease-in-out infinite`
                    : 'v5-idle 3s ease-in-out infinite',
            }}>
                {/* Shadow */}
                <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: isGod ? '36px' : '22px', height: '6px', background: isGod ? 'radial-gradient(ellipse, #D4AF3725, transparent)' : 'radial-gradient(ellipse, rgba(0,0,0,0.15), transparent)', borderRadius: '50%', animation: isRunning && !reaction ? `v6-shadow ${ws}s ease-in-out infinite` : undefined, transform: 'translateX(-50%)' }} />

                {/* Speed lines */}
                {wr >= 0.3 && isRunning && !reaction && [0, 1, 2, 3, 4, 5].map(i => (
                    <div key={`sp-${i}`} style={{ position: 'absolute', top: `${2 + i * 7}px`, left: '-12px', width: `${14 + (5 - i) * 3}px`, height: '1.5px', background: `linear-gradient(90deg, transparent, ${cc}38)`, animation: `v6-speed ${0.2 + i * 0.04}s ease-out ${i * 0.03}s infinite` }} />
                ))}

                {/* God wings */}
                {isGod && !godCelebration && <>
                    <div style={{ position: 'absolute', top: '18px', left: '-18px', width: '18px', height: '26px', background: 'linear-gradient(135deg, #D4AF3788, #FDE68A60, #D4AF3740, #FDE68A20)', clipPath: 'polygon(100% 15%, 85% 0%, 45% 5%, 15% 25%, 0% 50%, 8% 75%, 30% 90%, 60% 95%, 100% 80%)', transformOrigin: 'right center', animation: 'v6-wing-l 1.6s ease-in-out infinite', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '18px', right: '-18px', width: '18px', height: '26px', background: 'linear-gradient(-135deg, #D4AF3788, #FDE68A60, #D4AF3740, #FDE68A20)', clipPath: 'polygon(0% 15%, 15% 0%, 55% 5%, 85% 25%, 100% 50%, 92% 75%, 70% 90%, 40% 95%, 0% 80%)', transformOrigin: 'left center', animation: 'v6-wing-r 1.6s ease-in-out infinite', zIndex: -1 }} />
                </>}

                {/* God halo */}
                {isGod && !godCelebration && <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '22px', height: '7px', borderRadius: '50%', border: '2px solid #FDE68A70', boxShadow: '0 0 10px #D4AF3750', animation: 'v6-halo 4.5s linear infinite', zIndex: 22 }} />}

                {/* God aura */}
                {isGod && !reaction && <>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '58px', height: '58px', borderRadius: '50%', border: '2px solid #D4AF3730', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #D4AF3718', animation: 'runner-god-aura 3s ease-in-out 0.7s infinite', pointerEvents: 'none', zIndex: -1 }} />
                </>}
                {isGod && [0, 1, 2, 3, 4].map(i => <div key={`orb-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '5px', height: '5px', background: ['#FDE68A', '#A78BFA', '#10B981', '#FDE68A', '#F472B6'][i], borderRadius: i % 2 === 0 ? '1px' : '50%', transform: 'rotate(45deg)', animation: `runner-god-orbit ${1.5 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.35}s`, zIndex: 21 }} />)}

                {/* +XP */}
                {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-48px', left: '50%', fontSize: reaction.points >= 15 ? '20px' : reaction.points >= 9 ? '17px' : '14px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `v6-xp ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 16px ${reaction.ringColor}80, 0 2px 6px rgba(0,0,0,0.6)`, zIndex: 24, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '10px', marginLeft: '3px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const a = (i / reaction.energy) * 360; const d = 28 + (i % 3) * 14; const sx = Math.cos(a * Math.PI / 180) * d; const sy = Math.sin(a * Math.PI / 180) * d; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '6px' : '4px', height: reaction.points >= 10 ? '6px' : '4px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 6px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 20 + 60}ms`, pointerEvents: 'none', zIndex: 21 } as React.CSSProperties} />; })}
                {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-r${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${28 - ri * 5}px`, height: `${28 - ri * 5}px`, borderRadius: '50%', border: `${2.5 - ri * 0.5}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.25 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 19 }} />)}

                {/* Dust */}
                {isRunning && !isGod && !reaction && [0, 1, 2, 3, 4].map(i => <div key={`dk-${i}`} style={{ position: 'absolute', bottom: `${i * 2}px`, left: `${-6 - i * 3}px`, width: '3.5px', height: '3.5px', borderRadius: '50%', background: '#A8A29E', opacity: wr >= 0.3 ? 0.45 : 0.15, '--ddx': `${-9 - i * 4}px`, '--ddy': `${-3 - (i % 2) * 4}px`, animation: `v6-dust ${0.25 + i * 0.05}s ease-out infinite`, animationDelay: `${i * 0.05}s` } as React.CSSProperties} />)}

                {/* Scarf — long, dramatic */}
                {(isRunning || isGod) && <div style={{ position: 'absolute', top: '22px', left: '-12px', width: `${isGod ? 20 : 10 + Math.min(wr * 12, 12)}px`, height: `${isGod ? 16 : 7 + Math.min(wr * 5, 5)}px`, background: isGod ? 'linear-gradient(180deg, #D4AF37CC, #D4AF3780, #D4AF3748, #D4AF3720)' : `linear-gradient(180deg, ${cc}CC, ${cc}80, ${cc}48, ${cc}20)`, clipPath: 'polygon(75% 0%, 100% 8%, 88% 40%, 100% 85%, 15% 100%, 0% 55%, 8% 18%, 25% 5%)', transformOrigin: 'top right', animation: `v6-scarf ${isGod ? 2 : ws * 1.2}s ease-in-out infinite`, zIndex: -1 }} />}

                {/* ── HEAD (22px) ── */}
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `radial-gradient(circle at 36% 28%, ${cc}F0, ${cc}CC, ${cc}AA)`, boxShadow: reaction ? `0 0 ${reaction.points >= 10 ? 22 : 10}px ${reaction.ringColor}90` : isGod ? '0 0 22px #D4AF3790, 0 0 44px #D4AF3750' : `0 1px 5px rgba(0,0,0,0.25)`, position: 'relative', border: `2px solid ${cc}`, margin: '0 auto', transition: 'box-shadow 0.3s ease' }}>
                    {/* Hair */}
                    <div style={{ position: 'absolute', top: '-8px', left: '-1px', width: '24px', height: '14px', borderRadius: '12px 12px 3px 3px', background: `linear-gradient(180deg, ${cc}, ${cc}CC)`, zIndex: -1, transformOrigin: 'bottom center', animation: isRunning && !reaction ? `v6-hair ${ws}s ease-in-out infinite` : 'none' }} />
                    <div style={{ position: 'absolute', top: '-6px', left: '5px', width: '10px', height: '6px', borderRadius: '5px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ position: 'absolute', top: '-6px', right: '-2px', width: '7px', height: '8px', borderRadius: '3px 7px 0 0', background: cc, transform: 'rotate(22deg)', zIndex: -1 }} />
                    {/* Eyes */}
                    {reaction && reaction.points >= 6 ? (<>
                        <div style={{ position: 'absolute', top: '7px', left: '3px', width: '4px', height: '2.5px', borderBottom: '2px solid #fff', borderRadius: '0 0 4px 4px' }} />
                        <div style={{ position: 'absolute', top: '7px', right: '3px', width: '4px', height: '2.5px', borderBottom: '2px solid #fff', borderRadius: '0 0 4px 4px' }} />
                    </>) : (<>
                        <div style={{ position: 'absolute', top: '6px', left: '3px', width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }}>
                            <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                            <div style={{ position: 'absolute', top: '0px', left: '0.5px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#fff', opacity: 0.85 }} />
                        </div>
                        <div style={{ position: 'absolute', top: '6px', right: '3px', width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }}>
                            <div style={{ position: 'absolute', top: '1px', right: '0px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#1a1a2e' }} />
                            <div style={{ position: 'absolute', top: '0px', left: '0.5px', width: '1.5px', height: '1.5px', borderRadius: '50%', background: '#fff', opacity: 0.85 }} />
                        </div>
                    </>)}
                    {(isGod || (reaction && reaction.points >= 3)) && <><div style={{ position: 'absolute', top: '11px', left: '1px', width: '4px', height: '2.5px', borderRadius: '50%', background: '#FF9999', opacity: 0.3 }} /><div style={{ position: 'absolute', top: '11px', right: '1px', width: '4px', height: '2.5px', borderRadius: '50%', background: '#FF9999', opacity: 0.3 }} /></>}
                    {(isGod || (reaction && reaction.points >= 3)) ? <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '4px', borderBottom: '2px solid #fff', borderRadius: '0 0 5px 5px' }} /> : wr > 0.04 ? <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '1.5px', borderRadius: '0 0 2px 2px', background: '#fff', opacity: 0.45 }} /> : null}
                </div>

                {/* ── BODY (18px) ── */}
                <div style={{ width: '18px', height: '16px', borderRadius: '5px 5px 3px 3px', background: `linear-gradient(180deg, ${cc} 0%, ${cc}CC 100%)`, margin: '-3px auto 0', border: `1.5px solid ${cc}`, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '7px', left: '2px', right: '2px', height: '2px', background: `${cc}35`, borderRadius: '1px' }} />
                    {/* Arms (7x12) */}
                    <div style={{ position: 'absolute', top: '1px', left: '-7px', width: '7px', height: '12px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '3.5px', transformOrigin: 'top center', animation: isRunning && !reaction ? `v6-arm-l ${ws}s ease-in-out infinite` : 'none', border: `0.5px solid ${cc}` }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '5px', height: '4px', borderRadius: '50%', background: `${cc}EE` }} />
                    </div>
                    <div style={{ position: 'absolute', top: '1px', right: '-7px', width: '7px', height: '12px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '3.5px', transformOrigin: 'top center', animation: isRunning && !reaction ? `v6-arm-r ${ws}s ease-in-out infinite` : 'none', border: `0.5px solid ${cc}` }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '1px', width: '5px', height: '4px', borderRadius: '50%', background: `${cc}EE` }} />
                    </div>
                </div>

                {/* ── LEGS (7x12) ── */}
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-2px' }}>
                    <div style={{ width: '7px', height: '12px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '2px 2px 3px 3px', border: `0.5px solid ${cc}`, transformOrigin: 'top center', animation: isRunning && !reaction ? `v6-leg-l ${ws}s ease-in-out infinite` : 'none', position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '-0.5px', width: '8px', height: '3.5px', borderRadius: '2px', background: `${cc}CC` }} />
                    </div>
                    <div style={{ width: '7px', height: '12px', background: `linear-gradient(180deg, ${cc}, ${cc}DD)`, borderRadius: '2px 2px 3px 3px', border: `0.5px solid ${cc}`, transformOrigin: 'top center', animation: isRunning && !reaction ? `v6-leg-r ${ws}s ease-in-out infinite` : 'none', position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '-0.5px', width: '8px', height: '3.5px', borderRadius: '2px', background: `${cc}CC` }} />
                    </div>
                </div>
            </div>

            {/* === PROGRESS === */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px', background: isGod ? 'linear-gradient(90deg, #4A3A08, #8B6914, #D4AF37, #FDE68A, #D4AF37)' : `linear-gradient(90deg, ${cc}22, ${cc}55, ${cc}99, ${cc})`, transition: 'width 0.8s ease', zIndex: 14, boxShadow: progress > 0.3 ? `0 0 10px ${cc}28` : 'none' }} />

            {/* === SCORE === */}
            <div style={{ position: 'absolute', top: '6px', right: '10px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 24 }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: dailyTitle.color, background: isGod ? 'rgba(6,16,32,0.92)' : 'rgba(255,255,255,0.94)', padding: '3px 10px', borderRadius: '7px', border: `1px solid ${dailyTitle.color}25`, backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{dailyTitle.title}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917', background: isGod ? 'rgba(6,16,32,0.92)' : 'rgba(255,255,255,0.94)', padding: '3px 10px', borderRadius: '7px', backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{xp} / {goalXP}</div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════
// RUNNER COMPARISON TESTER
// ═══════════════════════════════════════════════════════

function MiniRunnerTester({ todayXP: realXP }: { todayXP: number }) {
    const [xp, setXp] = useState(realXP);
    const [goalXP, setGoalXP] = useState(DEV_DEFAULT_GOAL);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const prevXpRef = useRef(xp);
    const prevGodRef = useRef(false);
    const [godCelebration, setGodCelebration] = useState(false);
    const [shootingStar, setShootingStar] = useState<number | null>(null);

    const milestones = getDevMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);

    useEffect(() => {
        const diff = xp - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: Date.now() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = xp >= goalXP;
            if (nowGod && !prevGodRef.current) {
                setGodCelebration(true);
                setTimeout(() => setGodCelebration(false), 2500);
            }
            if (nowGod) {
                setShootingStar(Date.now());
                setTimeout(() => setShootingStar(null), 1200);
            }
            prevXpRef.current = xp;
            prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = xp;
        prevGodRef.current = xp >= goalXP;
    }, [xp, goalXP]);

    const isGod = xp >= goalXP;
    const isHot = xp >= Math.round(goalXP * 588 / 1310);
    const walkRatio = xp / goalXP;
    const walkSpeed = walkRatio >= 0.666 ? 0.15 : walkRatio >= 0.268 ? 0.25 : walkRatio >= 0.055 ? 0.4 : 0.6;
    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (xp >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const progress = Math.min(xp / maxXP, 1);
    const charColor = dailyTitle.color;
    const charGlow = isGod ? '0 0 12px #D4AF3780, 0 0 24px #D4AF3740' : isHot ? '0 0 8px #DC262660' : 'none';

    return (
        <Section title="Mini Runner -- V1 ~ V6" subtitle="6-way comparison. Same XP slider controls all.">
            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                    type="range" min="0" max={Math.round(goalXP * 1.2)} value={xp}
                    onChange={e => setXp(Number(e.target.value))}
                    style={{ flex: 1, minWidth: '200px', accentColor: dailyTitle.color }}
                />
                <span style={{ fontSize: '13px', fontWeight: '700', color: dailyTitle.color, minWidth: '60px' }}>
                    {xp} / {goalXP}
                </span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#78716C' }}>
                    {dailyTitle.title}
                </span>
                {/* Goal quick set */}
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#999', fontWeight: '600' }}>GOAL:</span>
                    {[300, 500, 800, 1310, 2000].map(g => (
                        <button key={g} onClick={() => setGoalXP(g)}
                            style={{
                                padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: '700', cursor: 'pointer',
                                border: goalXP === g ? '1px solid #D4AF37' : '1px solid #E5E5E5',
                                background: goalXP === g ? '#D4AF37' : '#F5F5F4',
                                color: goalXP === g ? '#fff' : '#78716C',
                            }}
                        >{g}</button>
                    ))}
                </div>
                {[
                    { xp: 5, label: '+5 芽', color: '#FB923C', bg: '#FFF7ED' },
                    { xp: 10, label: '+10 鍛', color: '#FACC15', bg: '#FEFCE8' },
                    { xp: 15, label: '+15 得', color: '#4ADE80', bg: '#F0FDF4' },
                    { xp: 20, label: '+20 声', color: '#60A5FA', bg: '#EFF6FF' },
                    { xp: 20, label: '+20 研', color: '#818CF8', bg: '#EEF2FF' },
                    { xp: 30, label: '+30 極', color: '#A855F7', bg: '#FAF5FF' },
                    { xp: 100, label: '+100', color: '#D4AF37', bg: '#FFFBEB' },
                ].map((b, bi) => (
                    <button key={`${b.label}-${bi}`}
                        onClick={() => setXp(x => Math.min(x + b.xp, Math.round(goalXP * 1.2)))}
                        style={{
                            padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '11px',
                            border: `1px solid ${b.color}`, background: b.bg, color: b.color,
                        }}
                    >
                        {b.label}
                    </button>
                ))}
                <button
                    onClick={() => { setXp(0); prevGodRef.current = false; }}
                    style={{
                        padding: '4px 12px', borderRadius: '6px', border: '1px solid #E5E5E5',
                        background: '#fff', fontWeight: '600', fontSize: '11px', color: '#78716C', cursor: 'pointer',
                    }}
                >
                    Reset
                </button>
            </div>

            {/* V6 — V4 EVOLVED MAXIMUM */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#D4AF37', letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase', background: 'linear-gradient(90deg, #1a1208, #2a2010, #1a1208)', padding: '6px 14px', borderRadius: '8px', display: 'inline-block', border: '1px solid #D4AF3730', boxShadow: '0 0 20px #D4AF3715' }}>V6 -- Maximum Density (160px, 蝶, 28本木, 7雲, 11花)</div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid #D4AF3750', boxShadow: '0 6px 28px rgba(212,175,55,0.15)' }}>
                    <MiniRunnerV6Stage xp={xp} goalXP={goalXP} />
                </div>
            </div>

            {/* V5 — SILHOUETTE JOURNEY */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '300', color: '#fff', letterSpacing: '3px', marginBottom: '8px', textTransform: 'uppercase', background: 'linear-gradient(90deg, #1a1a2e, #16213e, #0f3460)', padding: '6px 12px', borderRadius: '6px', display: 'inline-block' }}>V5 -- Silhouette Journey</div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ffffff10', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                    <MiniRunnerV5Stage xp={xp} goalXP={goalXP} />
                </div>
            </div>

            {/* V4 — DEFINITIVE */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#D4AF37', letterSpacing: '1.5px', marginBottom: '6px', textTransform: 'uppercase', textShadow: '0 0 8px #D4AF3730' }}>V4 -- Definitive Edition (140px, wings, scarf, torii gates, weather)</div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid #D4AF3760', boxShadow: '0 4px 20px rgba(212,175,55,0.12)' }}>
                    <MiniRunnerV4Stage xp={xp} goalXP={goalXP} />
                </div>
            </div>

            {/* V3 — ULTRA */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#A78BFA', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>V3 -- Ultra Premium (time-of-day, parallax, particles)</div>
                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '2px solid #D4AF3740' }}>
                    <MiniRunnerV3Stage xp={xp} goalXP={goalXP} />
                </div>
            </div>

            {/* V2 */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#16A34A', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>V2 -- Premium</div>
                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '2px solid #16A34A40' }}>
                    <MiniRunnerV2Stage xp={xp} goalXP={goalXP} />
                </div>
            </div>

            {/* V1 */}
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#78716C', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>V1 -- Original</div>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                <div style={{
                    height: '80px',
                    background: isGod
                        ? 'linear-gradient(180deg, #0F172A 0%, #1E293B 40%, #334155 100%)'
                        : 'linear-gradient(180deg, #87CEEB 0%, #B0E0F0 35%, #D4EFFF 70%, #F0E6D3 100%)',
                    position: 'relative', overflow: 'hidden', transition: 'background 1.5s ease',
                }}>
                    {/* God effects */}
                    {godCelebration && <div style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'radial-gradient(circle, #D4AF37, #FDE68A)', animation: 'runner-god-flash 2.5s ease-out forwards', pointerEvents: 'none' }} />}
                    {godCelebration && <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 35, fontSize: '20px', fontWeight: '900', color: '#D4AF37', textShadow: '0 0 20px #D4AF3780, 0 2px 4px rgba(0,0,0,0.5)', letterSpacing: '4px', whiteSpace: 'nowrap', animation: 'runner-god-title 2.5s ease-out forwards', pointerEvents: 'none' }}>本日の神</div>}
                    {godCelebration && Array.from({ length: 16 }).map((_, i) => {
                        const angle = (i / 16) * 360;
                        return <div key={`burst-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '5px', height: '5px', borderRadius: '50%', background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#FDE68A' : '#F59E0B', '--bx': `${Math.cos(angle * Math.PI / 180) * 12}px`, '--by': `${Math.sin(angle * Math.PI / 180) * 8}px`, animation: `runner-god-burst 1.5s ease-out ${i * 50}ms forwards`, zIndex: 32, pointerEvents: 'none' } as React.CSSProperties} />;
                    })}

                    {/* Sun / Moon */}
                    {!isGod && <div style={{ position: 'absolute', top: '6px', left: '12px', width: '14px', height: '14px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #FFF7CC, #FFD93D, #F59E0B)', boxShadow: '0 0 8px #FFD93D80', animation: 'runner-sun-pulse 4s ease-in-out infinite', zIndex: 1 }} />}
                    {isGod && <div style={{ position: 'absolute', top: '6px', left: '12px', width: '12px', height: '12px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #E8E8E8, #C0C0C0)', boxShadow: '0 0 6px #E8E8E860', zIndex: 1 }}><div style={{ position: 'absolute', top: '1px', right: '0px', width: '8px', height: '8px', borderRadius: '50%', background: '#0F172A' }} /></div>}
                    {isGod && [{ x: 8, y: 8, d: 1.8 }, { x: 22, y: 15, d: 2.5 }, { x: 35, y: 6, d: 1.5 }, { x: 48, y: 18, d: 2.2 }, { x: 58, y: 5, d: 3 }, { x: 72, y: 12, d: 1.9 }, { x: 85, y: 8, d: 2.8 }, { x: 92, y: 20, d: 2 }, { x: 15, y: 22, d: 2.6 }, { x: 65, y: 22, d: 1.7 }, { x: 42, y: 10, d: 3.2 }, { x: 78, y: 18, d: 2.1 }].map((s, i) => <div key={`star-${i}`} style={{ position: 'absolute', top: `${s.y}px`, left: `${s.x}%`, width: '2px', height: '2px', borderRadius: '50%', background: '#FDE68A', animation: `runner-twinkle ${s.d}s ease-in-out ${i * 0.3}s infinite`, zIndex: 1 }} />)}
                    {shootingStar && <div key={shootingStar} style={{ position: 'absolute', top: '6px', right: '10px', width: '3px', height: '3px', borderRadius: '50%', background: '#FDE68A', boxShadow: '0 0 6px #D4AF37, 12px 0 8px #D4AF3760, 24px 0 12px #D4AF3730', animation: 'runner-shooting-star 1.2s ease-in forwards', zIndex: 8, pointerEvents: 'none' }} />}

                    {/* Puffy clouds */}
                    {!isGod && [{ x: 10, y: 4, s: 0.9, sp: 35 }, { x: 36, y: 10, s: 1.1, sp: 28 }, { x: 62, y: 2, s: 0.8, sp: 42 }, { x: 85, y: 8, s: 1.0, sp: 32 }].map((c, ci) => (
                        <div key={`cloud-${ci}`} style={{ position: 'absolute', top: `${c.y}px`, left: `${c.x}%`, transform: `scale(${c.s})`, animation: `runner-cloud-drift ${c.sp}s linear infinite`, opacity: 0.85, zIndex: 1 }}>
                            <div style={{ position: 'relative', width: '40px', height: '16px' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: '2px', width: '14px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />
                                <div style={{ position: 'absolute', bottom: '1px', left: '9px', width: '18px', height: '15px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '20px', width: '16px', height: '11px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: '6px', width: '26px', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.85)' }} />
                            </div>
                        </div>
                    ))}

                    {/* Hills */}
                    {!isGod && <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, height: '12px', background: 'linear-gradient(180deg, #86EFAC40 0%, #86EFAC20 100%)', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', zIndex: 1 }} />}

                    {/* Ground */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '18px', background: isGod ? 'linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #D4AF37 100%)' : 'linear-gradient(180deg, #4ADE80 0%, #22C55E 40%, #16A34A 100%)', borderTop: isGod ? '2px solid #DAA520' : '2px solid #22C55E', transition: 'background 1.5s ease, border-color 1.5s ease', zIndex: 2 }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(0,0,0,0.03) 30px, rgba(0,0,0,0.03) 32px)', animation: `runner-ground-scroll ${walkSpeed * 8}s linear infinite` }} />
                        <div style={{ position: 'absolute', top: '4px', left: 0, right: 0, height: '2px', background: isGod ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.08)', borderRadius: '1px' }} />
                    </div>

                    {/* Grass blades */}
                    {!isGod && Array.from({ length: 12 }, (_, i) => ({ left: i * 8.5 + (((i * 7 + 3) % 5) * 1.2), height: 3 + (i % 3) * 2, sway: 4 + (i % 4) * 2, delay: i * 0.15 })).map((g, i) => (
                        <div key={`grass-${i}`} style={{ position: 'absolute', bottom: '17px', left: `${g.left}%`, width: '2px', height: `${g.height}px`, background: i % 3 === 0 ? '#22C55E' : i % 3 === 1 ? '#16A34A' : '#4ADE80', borderRadius: '1px 1px 0 0', transformOrigin: 'bottom center', '--sway': `${g.sway}deg`, animation: `runner-grass-sway ${2 + (i % 3) * 0.4}s ease-in-out ${g.delay}s infinite alternate`, zIndex: 3 } as React.CSSProperties} />
                    ))}

                    {/* Start signpost */}
                    <div style={{ position: 'absolute', bottom: '18px', left: '1%', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ background: isGod ? 'linear-gradient(135deg, #B8860B, #DAA520)' : 'linear-gradient(135deg, #F5F0E1, #E8DCC8)', border: isGod ? '1px solid #D4AF37' : '1px solid #C4B89E', borderRadius: '3px', padding: '1px 4px', fontSize: '5px', fontWeight: '800', letterSpacing: '1px', color: isGod ? '#FDE68A' : '#8B7355', animation: 'runner-start-bounce 3s ease-in-out infinite', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>START</div>
                        <div style={{ width: '2px', height: '14px', background: isGod ? 'linear-gradient(180deg, #DAA520, #8B6914)' : 'linear-gradient(180deg, #A0845C, #7A6240)', borderRadius: '0 0 1px 1px' }} />
                    </div>

                    {/* Milestone gems */}
                    {milestones.map((m, i) => {
                        const mx = (m.xp / maxXP) * 100;
                        const cleared = xp >= m.xp;
                        const isNext = !cleared && (i === 0 || xp >= milestones[i - 1].xp);
                        const isLast = i === milestones.length - 1;
                        return (
                            <div key={i} style={{ position: 'absolute', bottom: '18px', left: `${Math.min(mx, 95)}%`, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 4 }}>
                                <div style={{ width: '7px', height: '9px', background: cleared ? `linear-gradient(180deg, ${m.color}CC, ${m.color})` : 'linear-gradient(180deg, #D6D3D1, #A8A29E)', clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)', transition: 'all 0.5s ease', '--gem-color': m.color, ...(cleared ? { animation: 'runner-gem-glow 2s ease-in-out infinite' } : {}) } as React.CSSProperties} />
                                {(cleared || isNext || i === 0 || isLast) && <div style={{ position: 'absolute', top: '-11px', fontSize: '6px', fontWeight: '800', color: cleared ? m.color : isNext ? '#78716C' : '#A8A29E', whiteSpace: 'nowrap', letterSpacing: '0.2px', textShadow: cleared ? `0 0 4px ${m.color}40` : 'none', opacity: cleared ? 1 : isNext ? 0.8 : 0.5 }}>{m.title}</div>}
                            </div>
                        );
                    })}

                    {/* Goal flag */}
                    <div style={{ position: 'absolute', bottom: '18px', right: '2%', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ position: 'relative', width: '2px', height: '30px', background: isGod ? '#D4AF37' : '#44403C' }}>
                            <div style={{ position: 'absolute', top: '-3px', left: '-2px', width: '6px', height: '6px', borderRadius: '50%', background: isGod ? '#FDE68A' : '#D4AF37', boxShadow: isGod ? '0 0 6px #D4AF37' : 'none' }} />
                            <div style={{ position: 'absolute', top: '3px', left: '2px', width: '16px', height: '10px', background: isGod ? 'linear-gradient(135deg, #D4AF37, #FDE68A)' : 'linear-gradient(135deg, #D4AF37, #F59E0B)', clipPath: 'polygon(0 0, 100% 20%, 85% 50%, 100% 80%, 0 100%)', animation: 'runner-flag-flutter 2s ease-in-out infinite', boxShadow: isGod ? '0 0 8px #D4AF3760' : 'none' }} />
                            <div style={{ position: 'absolute', top: '-11px', left: '-4px', fontSize: '5px', fontWeight: '800', letterSpacing: '0.8px', color: isGod ? '#FDE68A' : '#44403C', whiteSpace: 'nowrap' }}>GOAL</div>
                        </div>
                    </div>

                    {/* Character */}
                    <div style={{ position: 'absolute', bottom: '18px', left: isGod ? '50%' : `${3 + Math.min(progress * 90, 90)}%`, transform: isGod ? 'translateX(-50%)' : undefined, transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 10, animation: godCelebration ? 'runner-god-arrive 2s ease-out' : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out` : isGod ? 'runner-god-float 2s ease-in-out infinite' : `runner-walk ${walkSpeed}s ease-in-out infinite` }}>
                        {isGod && !reaction && <div style={{ position: 'absolute', top: '50%', left: '50%', width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #D4AF3760', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />}
                        {isGod && [0, 1, 2].map(i => <div key={`orbit-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: '#FDE68A', borderRadius: '1px', transform: 'rotate(45deg)', animation: `runner-god-orbit ${2 + i * 0.5}s linear infinite`, animationDelay: `${i * 0.7}s`, zIndex: 15 }} />)}
                        {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-34px', left: '50%', fontSize: reaction.points >= 15 ? '14px' : reaction.points >= 9 ? '12px' : '10px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `runner-xp-float ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 8px ${reaction.ringColor}80, 0 1px 2px rgba(0,0,0,0.3)`, zIndex: 20, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '8px', marginLeft: '2px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                        {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const angle = (i / reaction.energy) * 360; const sd = 20 + (i % 3) * 10; const sx = Math.cos(angle * Math.PI / 180) * sd; const sy = Math.sin(angle * Math.PI / 180) * sd; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '4px' : '3px', height: reaction.points >= 10 ? '4px' : '3px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 4px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 30 + 100}ms`, pointerEvents: 'none', zIndex: 15 } as React.CSSProperties} />; })}
                        {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-ring${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${20 - ri * 4}px`, height: `${20 - ri * 4}px`, borderRadius: '50%', border: `${2 - ri * 0.5}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.35 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 14 }} />)}
                        {walkRatio >= 0.021 && !isGod && !reaction && [0, 1, 2].map(i => <div key={i} style={{ position: 'absolute', bottom: `${i * 2}px`, left: `${-3 - i * 3}px`, width: '3px', height: '3px', borderRadius: '50%', background: '#A8A29E', opacity: walkRatio >= 0.268 ? 0.7 : 0.35, animation: `runner-dust ${0.3 + i * 0.1}s ease-out infinite`, animationDelay: `${i * 0.1}s` }} />)}
                        {/* Head */}
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: `radial-gradient(circle at 40% 35%, ${charColor}DD, ${charColor})`, boxShadow: reaction ? `0 0 ${reaction.points >= 10 ? 14 : reaction.points >= 6 ? 8 : 4}px ${reaction.ringColor}90` : charGlow, position: 'relative', border: `1.5px solid ${charColor}`, margin: '0 auto', transition: 'box-shadow 0.3s ease' }}>
                            <div style={{ position: 'absolute', top: '-4px', left: '3px', width: '8px', height: '6px', borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg, ${charColor}, ${charColor}CC)`, zIndex: -1 }} />
                            {reaction && reaction.points >= 6 ? (<><div style={{ position: 'absolute', top: '4px', left: '2px', width: '3px', height: '2px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 2px 2px' }} /><div style={{ position: 'absolute', top: '4px', right: '2px', width: '3px', height: '2px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 2px 2px' }} /></>) : (<><div style={{ position: 'absolute', top: '4px', left: '3px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#fff' }} /><div style={{ position: 'absolute', top: '4px', right: '3px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#fff' }} /></>)}
                            {(isGod || (reaction && reaction.points >= 3)) && <div style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', width: reaction && reaction.points >= 6 ? '6px' : '4px', height: '2px', borderBottom: '1.5px solid #fff', borderRadius: '0 0 3px 3px' }} />}
                        </div>
                        {/* Torso */}
                        <div style={{ width: '12px', height: '10px', borderRadius: '3px 3px 2px 2px', background: `linear-gradient(180deg, ${charColor} 0%, ${charColor}BB 100%)`, margin: '-1px auto 0', border: `1px solid ${charColor}` }} />
                        {/* Legs */}
                        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '-1px' }}>
                            <div style={{ width: '4px', height: '6px', background: charColor, borderRadius: '0 0 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `runner-leg-left ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                            <div style={{ width: '4px', height: '6px', background: charColor, borderRadius: '0 0 2px 2px', border: `0.5px solid ${charColor}`, transformOrigin: 'top center', animation: !isGod && !reaction ? `runner-leg-right ${walkSpeed}s ease-in-out infinite` : 'none' }} />
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px', background: isGod ? 'linear-gradient(90deg, #D4AF37, #FDE68A, #D4AF37)' : `linear-gradient(90deg, ${charColor}88, ${charColor})`, transition: 'width 0.8s ease', zIndex: 5 }} />

                    {/* Score */}
                    <div style={{ position: 'absolute', top: '4px', right: '8px', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10 }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: dailyTitle.color, background: isGod ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.92)', padding: '2px 6px', borderRadius: '4px', border: `1px solid ${dailyTitle.color}30`, backdropFilter: 'blur(4px)' }}>{dailyTitle.title}</div>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917', background: isGod ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.92)', padding: '2px 6px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>{xp} / {goalXP}</div>
                    </div>
                </div>
            </div>

            {/* Milestone table */}
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#555' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                    {milestones.map((m, i) => (
                        <div key={i}
                            onClick={() => setXp(m.xp)}
                            style={{
                                padding: '4px 8px', borderRadius: '6px', cursor: 'pointer',
                                background: xp >= m.xp ? `${m.color}15` : '#f5f5f5',
                                border: `1px solid ${xp >= m.xp ? m.color : '#e5e5e5'}`,
                                textAlign: 'center', transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ fontWeight: '700', color: xp >= m.xp ? m.color : '#999' }}>{m.title}</div>
                            <div style={{ fontSize: '9px', color: '#999' }}>{m.xp} XP</div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
