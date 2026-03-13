'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { type Element, ELEMENT_COLORS, ELEMENT_LABELS, ELEMENT_ADVANTAGE, calcBstTotal, calcBstStats, getBstTier, BST_STAT_NAMES_JA } from '@/data/english/elements';
import { getFlavorText } from '@/data/english/flavor-text';
import { ElementBadge } from '@/components/english/ElementIcon';

// ═══════════════════════════════════════════════════════════
// 布陣バトル — 3x3 / 4x4 カード布陣 + 日替わりボス戦
// ═══════════════════════════════════════════════════════════

type GridSize = 2 | 3 | 4;

// ── Sound Engine (Web Audio API, no external files) ──
let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
    if (!_audioCtx) _audioCtx = new AudioContext();
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
}

function playTone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.12) {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
    } catch {}
}

function sfxDrop() { playTone(220, 0.15, 'sine', 0.1); setTimeout(() => playTone(330, 0.1, 'sine', 0.08), 80); }
function sfxCrush() { playTone(180, 0.2, 'sawtooth', 0.08); playTone(120, 0.3, 'sawtooth', 0.06); }
function sfxBomb() { playTone(80, 0.4, 'sawtooth', 0.12); setTimeout(() => playTone(60, 0.3, 'square', 0.08), 100); }
function sfxSpike() { playTone(600, 0.1, 'square', 0.06); setTimeout(() => playTone(800, 0.1, 'square', 0.06), 60); setTimeout(() => playTone(1200, 0.15, 'square', 0.04), 120); }
function sfxMatch(chain: number) {
    const base = 440 + chain * 80;
    playTone(base, 0.15, 'sine', 0.1);
    setTimeout(() => playTone(base * 1.25, 0.12, 'sine', 0.08), 80);
    if (chain >= 2) setTimeout(() => playTone(base * 1.5, 0.15, 'sine', 0.1), 160);
}
function sfxPerfect() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.3, 'sine', 0.12), i * 120));
}
function sfxColumnSelect() { playTone(660, 0.06, 'sine', 0.06); }
function sfxOverflow() { playTone(150, 0.3, 'square', 0.1); setTimeout(() => playTone(100, 0.4, 'square', 0.08), 150); }

type CardRank = 'NORMAL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'HOLOGRAPHIC' | 'LEGENDARY';
const RANK_VAL: Record<string, number> = { NORMAL: 0, BRONZE: 1, SILVER: 2, GOLD: 3, HOLOGRAPHIC: 4, LEGENDARY: 5 };

// ── Card-Preview Visual Helpers (identical to card-preview/page.tsx) ──

const RANK_META: Record<CardRank, { borderColor: string; label: string; threshold: number }> = {
    LEGENDARY: { borderColor: '#D4AF37', label: 'LEGENDARY', threshold: 250 },
    HOLOGRAPHIC: { borderColor: '#A855F7', label: 'HOLO', threshold: 100 },
    GOLD: { borderColor: '#F6C85F', label: 'GOLD', threshold: 50 },
    SILVER: { borderColor: '#94A3B8', label: 'SILVER', threshold: 20 },
    BRONZE: { borderColor: '#CD7F32', label: 'BRONZE', threshold: 5 },
    NORMAL: { borderColor: '#D6D3D1', label: 'NORMAL', threshold: 0 },
};

const RANK_ORDER_ASC: CardRank[] = ['NORMAL', 'BRONZE', 'SILVER', 'GOLD', 'HOLOGRAPHIC', 'LEGENDARY'];
const RANK_JA: Record<CardRank, string> = {
    LEGENDARY: '伝説', HOLOGRAPHIC: '虹色', GOLD: '金', SILVER: '銀', BRONZE: '銅', NORMAL: '普通',
};

const CHAKRA: { name: string; ja: string; color: string }[] = [
    { name: 'SEED', ja: '種', color: '#B91C1C' },
    { name: 'SPARK', ja: '芽', color: '#C2410C' },
    { name: 'FORGE', ja: '鍛', color: '#A16207' },
    { name: 'OWN', ja: '得', color: '#166534' },
    { name: 'VOICE', ja: '声', color: '#1E40AF' },
    { name: 'VISION', ja: '研', color: '#3730A3' },
    { name: 'CROWN', ja: '極', color: '#6B21A8' },
];

function getNextRankForCard(rank: CardRank): { rank: CardRank; borderColor: string; label: string; threshold: number } | null {
    const idx = RANK_ORDER_ASC.indexOf(rank);
    if (idx < RANK_ORDER_ASC.length - 1) {
        const next = RANK_ORDER_ASC[idx + 1];
        return { rank: next, ...RANK_META[next] };
    }
    return null;
}

function getFrameFull(rank: CardRank): React.CSSProperties {
    const br = '8px';
    switch (rank) {
        case 'NORMAL': return { border: '8px solid #E7E5E4', borderRadius: br, backgroundColor: '#FAFAF9' };
        case 'BRONZE': return { border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(#FFFBF5, #FFFBF5) padding-box, linear-gradient(135deg, #CD7F32 0%, #E8B87A 30%, #CD7F32 60%, #A0622E 100%) border-box' };
        case 'SILVER': return { border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(#F8FAFB, #F8FAFB) padding-box, linear-gradient(135deg, #e2e8f0 0%, #ffffff 40%, #cbd5e1 60%, #94a3b8 100%) border-box' };
        case 'GOLD': return { border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFBEB 100%) padding-box, linear-gradient(135deg, #D4AF37 0%, #FFF2A8 25%, #F6C85F 50%, #D4AF37 75%, #B8941E 100%) border-box' };
        case 'HOLOGRAPHIC': return { border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E0E7FF 100%) padding-box, linear-gradient(135deg, #E879F9 0%, #A855F7 25%, #6366F1 50%, #3B82F6 75%, #06B6D4 100%) border-box' };
        case 'LEGENDARY': return { border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(135deg, #1C1917 0%, #2D2438 50%, #1c1813 100%) padding-box, linear-gradient(135deg, #18181B 0%, #A855F7 40%, #D4AF37 60%, #18181B 100%) border-box' };
    }
}

function getFrameMini(rank: CardRank): React.CSSProperties {
    const br = '6px';
    switch (rank) {
        case 'NORMAL': return { border: '3px solid #E7E5E4', borderRadius: br, backgroundColor: '#FAFAF9' };
        case 'BRONZE': return { border: '3px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(#FFFBF5, #FFFBF5) padding-box, linear-gradient(135deg, #CD7F32, #E8B87A, #A0622E) border-box' };
        case 'SILVER': return { border: '3px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(#F8FAFB, #F8FAFB) padding-box, linear-gradient(135deg, #94a3b8, #e2e8f0, #94a3b8) border-box' };
        case 'GOLD': return { border: '3px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(180deg, #FFFEF5, #FFFBEB) padding-box, linear-gradient(135deg, #D4AF37, #FFF2A8, #F6C85F, #D4AF37) border-box' };
        case 'HOLOGRAPHIC': return { border: '3px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(135deg, #FAF5FF, #E0E7FF) padding-box, linear-gradient(135deg, #E879F9, #A855F7, #6366F1, #3B82F6) border-box' };
        case 'LEGENDARY': return { border: '3px solid transparent', borderRadius: br, backgroundColor: 'transparent', background: 'linear-gradient(135deg, #1C1917, #2D2438) padding-box, linear-gradient(135deg, #A855F7, #D4AF37, #A855F7) border-box' };
    }
}

function getShadow(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '0 2px 8px rgba(0,0,0,0.06)';
        case 'BRONZE': return '0 3px 10px rgba(205,127,50,0.15)';
        case 'SILVER': return '0 3px 12px rgba(148,163,184,0.2)';
        case 'GOLD': return '0 4px 16px rgba(212,175,55,0.3), 0 0 8px rgba(246,200,95,0.15)';
        case 'HOLOGRAPHIC': return '0 4px 16px rgba(168,85,247,0.25), 0 0 8px rgba(99,102,241,0.15)';
        case 'LEGENDARY': return '0 6px 24px rgba(0,0,0,0.4), 0 0 16px rgba(212,175,55,0.3), 0 0 20px rgba(168,85,247,0.15)';
    }
}

function getShadowFull(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
        case 'BRONZE': return '0 6px 16px rgba(205,127,50,0.15), 0 2px 6px rgba(205,127,50,0.1)';
        case 'SILVER': return '0 6px 20px rgba(148,163,184,0.25), 0 2px 8px rgba(148,163,184,0.15)';
        case 'GOLD': return '0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25)';
        case 'HOLOGRAPHIC': return '0 8px 30px rgba(168,85,247,0.3), 0 4px 16px rgba(99,102,241,0.25)';
        case 'LEGENDARY': return '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3)';
    }
}

function getWindowBg(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '#F5F5F4';
        case 'BRONZE': return 'linear-gradient(180deg, #FDF8F0, #FAF0E4)';
        case 'SILVER': return 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)';
        case 'GOLD': return 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC 100%)';
        case 'HOLOGRAPHIC': return 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))';
        case 'LEGENDARY': return 'radial-gradient(circle at center, #2D2438 0%, #181A1B 100%)';
    }
}

function getAccent(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '#E7E5E4'; case 'BRONZE': return '#CD7F32'; case 'SILVER': return '#94A3B8';
        case 'GOLD': return '#D4AF37'; case 'HOLOGRAPHIC': return '#A855F7'; case 'LEGENDARY': return '#D4AF37';
    }
}

// ── Types ──

interface PuzzleCard {
    id: string;
    phraseId: string;
    english: string;
    japanese: string;
    element: Element;
    rank: CardRank;
    points: number;
    bstTotal: number;
}

type Grid = (PuzzleCard | null)[][];

interface Synergy {
    name: string;
    description: string;
    multiplier: number;
    color: string;
    icon: string;
}

interface BattleResult {
    basePower: number;
    synergies: Synergy[];
    totalMultiplier: number;
    finalDamage: number;
    gpEarned: number;
    grade: 'S' | 'A' | 'B' | 'C' | 'D';
}

interface PuzzleStats {
    totalBattles: number;
    bestDamage: number;
    totalGP: number;
    sRanks: number;
    month: string;
    bossWins: number;
    bossLosses: number;
    winStreak: number;
    bestStreak: number;
}

// ── Boss System (日替わりボス) ──

type BossDebuffType = 'seal_element' | 'rank_floor' | 'weaken_all' | 'hp_wall' | 'seal_elem_synergy';

interface BossTemplate {
    name: string;
    element: Element;
    hpBase: number;
    debuffType: BossDebuffType;
    sealTarget?: Element;
    debuffLabel: string;
    debuffDesc: string;
}

interface DailyBoss extends BossTemplate {
    hp: number;
}

const BOSS_POOL: BossTemplate[] = [
    { name: '朱雀', element: 'flame', hpBase: 3000, debuffType: 'seal_element', sealTarget: 'aqua', debuffLabel: '水封印', debuffDesc: '水カードBST半減' },
    { name: '玄武', element: 'aqua', hpBase: 3500, debuffType: 'seal_element', sealTarget: 'flame', debuffLabel: '火封印', debuffDesc: '火カードBST半減' },
    { name: '白虎', element: 'wind', hpBase: 3200, debuffType: 'seal_element', sealTarget: 'earth', debuffLabel: '地封印', debuffDesc: '地カードBST半減' },
    { name: '青龍', element: 'thunder', hpBase: 3400, debuffType: 'seal_element', sealTarget: 'wind', debuffLabel: '風封印', debuffDesc: '風カードBST半減' },
    { name: '麒麟', element: 'earth', hpBase: 3800, debuffType: 'seal_element', sealTarget: 'thunder', debuffLabel: '雷封印', debuffDesc: '雷カードBST半減' },
    { name: '鬼', element: 'flame', hpBase: 2800, debuffType: 'rank_floor', debuffLabel: 'ランク制限', debuffDesc: 'BRONZE以下BST半減' },
    { name: '天狗', element: 'wind', hpBase: 2500, debuffType: 'weaken_all', debuffLabel: '弱体化', debuffDesc: '全BST -20%' },
    { name: '河童', element: 'aqua', hpBase: 3000, debuffType: 'seal_elem_synergy', debuffLabel: '属性封印', debuffDesc: '属性シナジー無効' },
    { name: '龍王', element: 'thunder', hpBase: 5500, debuffType: 'hp_wall', debuffLabel: 'HP壁', debuffDesc: 'HPが極めて高い' },
    { name: '大蛇', element: 'earth', hpBase: 4200, debuffType: 'seal_elem_synergy', debuffLabel: '混沌', debuffDesc: '属性シナジー無効' },
];

function getDailyBoss(gridSize: GridSize): DailyBoss {
    const d = new Date();
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const idx = seed % BOSS_POOL.length;
    const template = BOSS_POOL[idx];
    const hpScale = gridSize === 4 ? 1.8 : gridSize === 2 ? 0.4 : 1.0;
    return { ...template, hp: Math.round(template.hpBase * hpScale) };
}

const ELEM_SYNERGY_NAMES = ['RAINBOW', 'DUAL CORE', 'TRIANGLE', 'KILL CHAIN'];

function evaluateWithBoss(cards: PuzzleCard[], boss: DailyBoss): BattleResult & { bossHp: number; bossDefeated: boolean } {
    // Apply boss debuffs + element advantage to BST
    const modifiedCards = cards.map(c => {
        let bst = c.bstTotal;

        // Element advantage: your card's element beats boss → +25%
        if (ELEMENT_ADVANTAGE[c.element] === boss.element) bst = Math.round(bst * 1.25);
        // Boss's element beats your card → -25%
        else if (ELEMENT_ADVANTAGE[boss.element] === c.element) bst = Math.round(bst * 0.75);

        // Debuff effects
        if (boss.debuffType === 'seal_element' && c.element === boss.sealTarget) bst = Math.round(bst * 0.5);
        if (boss.debuffType === 'rank_floor' && RANK_VAL[c.rank] <= 1) bst = Math.round(bst * 0.5);
        if (boss.debuffType === 'weaken_all') bst = Math.round(bst * 0.8);

        return { ...c, bstTotal: bst };
    });

    const result = evaluateParty(modifiedCards);

    // Post-process: remove element synergies if boss seals them
    if (boss.debuffType === 'seal_elem_synergy') {
        result.synergies = result.synergies.filter(s =>
            !ELEM_SYNERGY_NAMES.includes(s.name) && !s.name.includes('の力')
        );
    }

    // Recalculate with filtered synergies
    const totalMultiplier = result.synergies.reduce((m, s) => m * s.multiplier, 1);
    const finalDamage = Math.round(result.basePower * totalMultiplier);
    const bossDefeated = finalDamage >= boss.hp;
    const gpEarned = Math.round(finalDamage / 10) * (bossDefeated ? 2 : 1);

    const grade: BattleResult['grade'] =
        finalDamage >= result.basePower * 3 ? 'S' :
        finalDamage >= result.basePower * 2 ? 'A' :
        finalDamage >= result.basePower * 1.5 ? 'B' :
        finalDamage >= result.basePower * 1.2 ? 'C' : 'D';

    return { ...result, totalMultiplier, finalDamage, gpEarned, grade, bossHp: boss.hp, bossDefeated };
}

// ── Battle Sync (PuzzleBoard → MiniRunner via parent) ──
export interface BattleSyncCard {
    english: string;
    element: Element;
    rank: string;
    bstTotal: number;
    modifiedBst: number;
    elementAdvantage: 'super' | 'weak' | 'neutral';
}

export interface BattleSyncData {
    cards: BattleSyncCard[];
    synergies: { name: string; multiplier: number; color: string; icon: string }[];
    bossHp: number;
    bossName: string;
    bossElement: Element;
    finalDamage: number;
    bossDefeated: boolean;
    grade: 'S' | 'A' | 'B' | 'C' | 'D';
}

export interface PuzzleBoardProps {
    dropCard: {
        phraseId: string; english: string; japanese: string;
        element: Element; rank: string; points: number; bstTotal: number; key: number;
    } | null;
    chainMode: 'normal' | 'kakuhen' | 'gekiatsu' | 'god';
    onChainResult?: (stats: { cleared: number; chainCount: number; gpEarned: number }) => void;
    onCardClick?: (phraseId: string) => void;
    onBattleSync?: (data: BattleSyncData) => void;
    externalBattleActive?: boolean;
    isMobile: boolean;
    cardPoints: Record<string, number>;
    mastery?: Record<string, number>;
}

// ── Persistence ──

function curMonth(): string { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function loadGrid(n: GridSize): Grid { try { const r = localStorage.getItem(`puzzle-board-${n}`); if (r) { const d = JSON.parse(r); if (d.month === curMonth() && d.grid) return d.grid; } } catch {} return mk(n); }
function saveGrid(g: Grid, n: GridSize) { try { localStorage.setItem(`puzzle-board-${n}`, JSON.stringify({ grid: g, month: curMonth() })); } catch {} }
function loadStats(n: GridSize): PuzzleStats { const m = curMonth(); const def: PuzzleStats = { totalBattles: 0, bestDamage: 0, totalGP: 0, sRanks: 0, month: m, bossWins: 0, bossLosses: 0, winStreak: 0, bestStreak: 0 }; try { const r = localStorage.getItem(`puzzle-stats-${n}`); if (r) { const d = JSON.parse(r); if (d.month === m && typeof d.bestDamage === 'number') return { ...def, ...d }; } } catch {} return def; }
function saveStats(s: PuzzleStats, n: GridSize) { try { localStorage.setItem(`puzzle-stats-${n}`, JSON.stringify(s)); } catch {} }
function loadGridSize(): GridSize { try { const v = localStorage.getItem('puzzle-grid-size'); if (v === '2' || v === '3' || v === '4') return Number(v) as GridSize; } catch {} return 3; }

// ── Grid Helpers ──

function mk(n: GridSize): Grid { return Array.from({ length: n }, () => Array(n).fill(null)); }
function cl(g: Grid): Grid { return g.map(r => r.map(c => c ? { ...c } : null)); }
function cnt(g: Grid): number { let n = 0; for (const r of g) for (const c of r) if (c) n++; return n; }
function allCards(g: Grid): PuzzleCard[] { const a: PuzzleCard[] = []; for (const r of g) for (const c of r) if (c) a.push(c); return a; }

function placeAuto(g: Grid, card: PuzzleCard, N: number): { grid: Grid; row: number; col: number } {
    const grid = cl(g);
    // Fill left-to-right, top-to-bottom into first empty slot
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        if (!grid[r][c]) { grid[r][c] = card; return { grid, row: r, col: c }; }
    }
    // Full — shouldn't happen (battle triggers when full)
    grid[0][0] = card; return { grid, row: 0, col: 0 };
}

// ── Synergy Evaluation (the heart of the game) ──

function evaluateParty(cards: PuzzleCard[]): BattleResult {
    if (cards.length === 0) return { basePower: 0, synergies: [], totalMultiplier: 1, finalDamage: 0, gpEarned: 0, grade: 'D' };

    // Base power = sum of all BST
    const basePower = cards.reduce((s, c) => s + c.bstTotal, 0);
    const synergies: Synergy[] = [];

    // ── Element synergies ──
    const elemCounts: Record<string, number> = {};
    for (const c of cards) elemCounts[c.element] = (elemCounts[c.element] || 0) + 1;
    const uniqueElems = Object.keys(elemCounts).length;
    const maxElemCount = Math.max(...Object.values(elemCounts));
    const dominantElem = Object.entries(elemCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    // Rainbow: all 5 elements present
    if (uniqueElems >= 5) {
        synergies.push({ name: 'RAINBOW', description: '5属性コンプリート', multiplier: 2.0, color: '#A855F7', icon: 'R' });
    }
    // Mono: 4+ of same element (3x3) or 6+ (4x4)
    if (maxElemCount >= Math.ceil(cards.length * 0.6)) {
        const elColor = ELEMENT_COLORS[dominantElem as Element] || '#78716C';
        const elLabel = ELEMENT_LABELS[dominantElem] || dominantElem;
        synergies.push({ name: `${elLabel}の力`, description: `${elLabel}属性の結束`, multiplier: 1.6, color: elColor, icon: elLabel });
    }
    // Duo: exactly 2 elements, balanced
    if (uniqueElems === 2) {
        synergies.push({ name: 'DUAL CORE', description: '二属性の均衡', multiplier: 1.3, color: '#3B82F6', icon: 'D' });
    }
    // Trio: exactly 3 elements, each 2+
    if (uniqueElems === 3 && Object.values(elemCounts).every(v => v >= 2)) {
        synergies.push({ name: 'TRIANGLE', description: '三すくみの陣', multiplier: 1.4, color: '#10B981', icon: 'T' });
    }

    // ── Element advantage chain: A→B→C where A beats B beats C ──
    const elems = Object.keys(elemCounts) as Element[];
    for (const a of elems) {
        for (const b of elems) {
            if (a !== b && ELEMENT_ADVANTAGE[a] === b) {
                for (const c of elems) {
                    if (c !== a && c !== b && ELEMENT_ADVANTAGE[b] === c) {
                        synergies.push({ name: 'KILL CHAIN', description: '相性連鎖ボーナス', multiplier: 1.3, color: '#EF4444', icon: 'K' });
                    }
                }
            }
        }
    }

    // ── Rank synergies ──
    const rankCounts: Record<string, number> = {};
    for (const c of cards) rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1;

    // Elite Squad: 3+ cards GOLD or above
    const eliteCount = cards.filter(c => RANK_VAL[c.rank] >= 3).length;
    if (eliteCount >= 3) {
        synergies.push({ name: 'ELITE SQUAD', description: `GOLD以上${eliteCount}枚`, multiplier: 1.0 + eliteCount * 0.2, color: '#F6C85F', icon: 'E' });
    }
    // Legendary presence
    if ((rankCounts['LEGENDARY'] || 0) >= 1) {
        synergies.push({ name: 'LEGEND', description: '伝説のカード降臨', multiplier: 1.5, color: '#D4AF37', icon: 'L' });
    }
    // All same rank (3+ cards)
    const maxRankCount = Math.max(...Object.values(rankCounts));
    if (maxRankCount >= 3) {
        synergies.push({ name: 'UNIFORM', description: '統一ランク部隊', multiplier: 1.2, color: '#78716C', icon: 'U' });
    }

    // ── BST synergies ──
    const avgBST = Math.round(basePower / cards.length);
    const s600Count = cards.filter(c => c.bstTotal >= 600).length;

    // 600族 x2+
    if (s600Count >= 2) {
        synergies.push({ name: 'S-TIER ARMY', description: `600族が${s600Count}体`, multiplier: 1.0 + s600Count * 0.25, color: '#DC2626', icon: 'S' });
    }
    // High AVG BST
    if (avgBST >= 500) {
        synergies.push({ name: 'POWER HOUSE', description: `平均BST ${avgBST}`, multiplier: 1.3, color: '#F97316', icon: 'P' });
    }

    // ── SP synergies ──
    const totalSP = cards.reduce((s, c) => s + c.points, 0);
    if (totalSP >= 100) {
        synergies.push({ name: 'SP SURGE', description: `合計SP ${totalSP}`, multiplier: 1.0 + Math.min(totalSP / 200, 0.8), color: '#D4AF37', icon: '$' });
    }

    // ── Adjacency bonus: same-element neighbors (positional) ──
    // This rewards lucky placement patterns

    // Calculate total multiplier
    const totalMultiplier = synergies.reduce((m, s) => m * s.multiplier, 1);
    const finalDamage = Math.round(basePower * totalMultiplier);
    const gpEarned = Math.round(finalDamage / 10);

    // Grade
    const grade: BattleResult['grade'] =
        finalDamage >= basePower * 3 ? 'S' :
        finalDamage >= basePower * 2 ? 'A' :
        finalDamage >= basePower * 1.5 ? 'B' :
        finalDamage >= basePower * 1.2 ? 'C' : 'D';

    return { basePower, synergies, totalMultiplier, finalDamage, gpEarned, grade };
}

// ═══════════════════════════════════════════════════════════
// Full-Size Card Modal (card-preview quality)
// ═══════════════════════════════════════════════════════════

function CardModal({ card, onClose, isMobile, chakra }: { card: PuzzleCard; onClose: () => void; isMobile: boolean; chakra: number }) {
    const rank = card.rank;
    const isLeg = rank === 'LEGENDARY';
    const isHolo = rank === 'HOLOGRAPHIC' || isLeg;
    const accent = RANK_META[rank].borderColor;
    const nextRank = getNextRankForCard(rank);
    const progressPct = nextRank
        ? Math.min(100, ((card.points - RANK_META[rank].threshold) / (nextRank.threshold - RANK_META[rank].threshold)) * 100)
        : 100;
    const [mounted, setMounted] = useState(false);

    const bstStats = calcBstStats(card.phraseId);
    const bstTotal = bstStats.reduce((a, b) => a + b, 0);
    const bstTier = getBstTier(bstTotal);
    const ci = CHAKRA[chakra] || CHAKRA[0];
    const statColors = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#A855F7'];

    const maxStat = Math.max(...bstStats);
    const minStat = Math.min(...bstStats);
    const maxIdx = bstStats.indexOf(maxStat);
    const minIdx = bstStats.lastIndexOf(minStat);

    const el = card.element;
    const elLabel = ELEMENT_LABELS[el] || el;
    const advEl = ELEMENT_ADVANTAGE[el];
    const advLabel = advEl ? ELEMENT_LABELS[advEl] : '';

    useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    const panelW = isMobile ? 310 : 360;
    const STAT_MAX = 120;
    const STAT_MIN_VISUAL = 0.08;
    const cx = 90, cy = 90, radarR = 60;
    const getPoint = (i: number, val: number) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const pct = Math.max(val / STAT_MAX, STAT_MIN_VISUAL);
        return { x: cx + radarR * pct * Math.cos(angle), y: cy + radarR * pct * Math.sin(angle) };
    };
    const statPoints = bstStats.map((v, i) => getPoint(i, v));
    const polygon = statPoints.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                backgroundColor: mounted ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '16px',
                transition: 'background-color 0.3s ease',
            }}
        >
            <div onClick={e => e.stopPropagation()} style={{
                width: panelW, maxHeight: '92vh', overflowY: 'auto',
                background: 'rgba(28,25,23,0.97)',
                borderRadius: '20px',
                border: `1.5px solid ${accent}50`,
                boxShadow: `0 12px 60px rgba(0,0,0,0.6), 0 0 30px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                padding: '0', position: 'relative' as const,
                transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                opacity: mounted ? 1 : 0,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease',
            }}>
                {/* Close button */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '0', right: '0', marginTop: '8px', marginRight: '8px',
                    width: '28px', height: '28px', borderRadius: '50%',
                    border: 'none', cursor: 'pointer',
                    background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10, backdropFilter: 'blur(4px)',
                }}>x</button>

                {/* Header */}
                <div style={{
                    padding: '28px 24px 20px',
                    background: getWindowBg(rank),
                    borderRadius: '20px 20px 0 0',
                    borderBottom: `1px solid ${accent}30`,
                    position: 'relative', overflow: 'hidden',
                }}>
                    {(isLeg || isHolo) && <div style={{
                        position: 'absolute', top: '-30%', right: '-20%',
                        width: '60%', height: '120%', borderRadius: '50%',
                        background: `radial-gradient(circle, ${accent}12, transparent 70%)`,
                        pointerEvents: 'none',
                    }} />}

                    {/* Rank + Element row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ElementBadge element={el} size={16} />
                            <span style={{ fontSize: '11px', fontWeight: '800', color: accent, letterSpacing: '1.5px' }}>
                                {RANK_META[rank].label}
                            </span>
                            {advEl && (
                                <span style={{ fontSize: '9px', fontWeight: '600', color: isLeg ? 'rgba(255,255,255,0.4)' : '#A8A29E', marginLeft: '2px' }}>
                                    {elLabel} &gt; {advLabel}
                                </span>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{
                                fontSize: '22px', fontWeight: '900',
                                color: rank !== 'NORMAL' ? accent : '#A8A29E',
                                fontFamily: 'monospace',
                            }}>
                                {card.points}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#A8A29E' }}>SP</span>
                        </div>
                    </div>

                    {/* English */}
                    <div style={{
                        fontSize: '22px', fontWeight: '800',
                        color: isLeg ? '#FAFAF9' : '#1C1917',
                        lineHeight: 1.35, marginBottom: '10px',
                        textShadow: isLeg ? '0 1px 6px rgba(0,0,0,0.5)' : 'none',
                        wordBreak: 'break-word', letterSpacing: '-0.3px',
                    }}>
                        {card.english}
                    </div>

                    {/* Japanese */}
                    <div style={{
                        fontSize: '14px',
                        color: isLeg ? 'rgba(255,255,255,0.55)' : '#78716C',
                        lineHeight: 1.6, wordBreak: 'break-word',
                    }}>
                        {card.japanese}
                    </div>

                    {/* Flavor Text */}
                    {(() => {
                        const flavor = getFlavorText(card.phraseId);
                        return (
                            <div style={{
                                marginTop: '16px', paddingTop: '14px',
                                borderTop: `1px solid ${isLeg ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                            }}>
                                <div style={{
                                    fontSize: '12px', fontStyle: 'italic',
                                    color: isLeg ? 'rgba(255,255,255,0.45)' : '#8C7E6F',
                                    lineHeight: 1.5, letterSpacing: '0.2px',
                                }}>
                                    &ldquo;{flavor.en}&rdquo;
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    color: isLeg ? 'rgba(255,255,255,0.25)' : '#B5A99A',
                                    lineHeight: 1.4, marginTop: '4px',
                                }}>
                                    {flavor.ja}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Stats Area */}
                <div style={{ padding: '16px 20px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* SP Progress */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px', padding: '14px 16px',
                        border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>RANK PROGRESS</span>
                            <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.4)' }}>
                                {nextRank ? `${RANK_JA[nextRank.rank]} (${nextRank.threshold} SP)` : 'MAX'}
                            </span>
                        </div>
                        <div style={{
                            height: '8px', borderRadius: '4px',
                            backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%',
                                width: mounted ? `${progressPct}%` : '0%',
                                borderRadius: '4px',
                                background: nextRank
                                    ? `linear-gradient(90deg, ${accent}, ${nextRank.borderColor})`
                                    : `linear-gradient(90deg, #D4AF37, #A855F7)`,
                                transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
                                boxShadow: `0 0 8px ${accent}40`,
                            }} />
                        </div>
                        {nextRank && (
                            <div style={{
                                fontSize: '10px', color: accent + '80', marginTop: '5px', textAlign: 'right',
                                fontWeight: '600',
                            }}>
                                {nextRank.threshold - card.points} SP
                            </div>
                        )}
                    </div>

                    {/* BST Radar + Stats */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px', padding: '14px 16px',
                        border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>BST</span>
                                <span style={{
                                    fontSize: '9px', fontWeight: '700', letterSpacing: '0.5px',
                                    color: bstTier.color, backgroundColor: bstTier.color + '18',
                                    padding: '1px 6px', borderRadius: '4px',
                                }}>
                                    {bstTier.ja}
                                </span>
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: bstTier.color, fontFamily: 'monospace' }}>
                                {bstTotal}
                            </span>
                        </div>
                        <svg viewBox="0 0 180 185" style={{ width: '100%', maxWidth: '220px', display: 'block', margin: '0 auto' }}>
                            {[0.25, 0.5, 0.75, 1.0].map(level => {
                                const pts = Array.from({ length: 6 }, (_, i) => {
                                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                    return `${cx + radarR * level * Math.cos(angle)},${cy + radarR * level * Math.sin(angle)}`;
                                }).join(' ');
                                return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
                            })}
                            {Array.from({ length: 6 }, (_, i) => {
                                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                return <line key={i} x1={cx} y1={cy} x2={cx + radarR * Math.cos(angle)} y2={cy + radarR * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
                            })}
                            <polygon points={polygon}
                                fill={`${bstTier.color}20`}
                                stroke={bstTier.color} strokeWidth="1.5"
                                style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
                            />
                            {statPoints.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y}
                                    r={i === maxIdx ? '4' : i === minIdx ? '2.5' : '3'}
                                    fill={statColors[i]}
                                    stroke={i === maxIdx ? '#fff' : 'rgba(0,0,0,0.3)'}
                                    strokeWidth={i === maxIdx ? '1' : '0.5'}
                                    style={{ opacity: mounted ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + i * 0.05}s` }}
                                />
                            ))}
                            {BST_STAT_NAMES_JA.map((name, i) => {
                                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                const lx = cx + (radarR + 18) * Math.cos(angle);
                                const ly = cy + (radarR + 18) * Math.sin(angle);
                                return (
                                    <g key={i}>
                                        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                                            style={{ fontSize: '8px', fontWeight: i === maxIdx ? '900' : '700', fill: i === maxIdx ? statColors[i] : 'rgba(255,255,255,0.5)' }}>
                                            {name}
                                        </text>
                                        <text x={lx} y={ly + 11} textAnchor="middle" dominantBaseline="middle"
                                            style={{ fontSize: '8px', fontWeight: '700', fill: statColors[i], fontFamily: 'monospace' }}>
                                            {bstStats[i]}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                        {/* Stat bars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' }}>
                            {BST_STAT_NAMES_JA.map((name, i) => {
                                const pct = (bstStats[i] / STAT_MAX) * 100;
                                const isMax = i === maxIdx;
                                const isMin = i === minIdx;
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                            fontSize: '10px', fontWeight: isMax ? '900' : '700',
                                            color: statColors[i], width: '24px',
                                            textShadow: isMax ? `0 0 6px ${statColors[i]}40` : 'none',
                                        }}>{name}</span>
                                        <div style={{
                                            flex: 1, height: '6px',
                                            background: 'rgba(255,255,255,0.06)',
                                            borderRadius: '3px', overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: mounted ? `${pct}%` : '0%',
                                                background: isMax
                                                    ? `linear-gradient(90deg, ${statColors[i]}, ${statColors[i]}cc)`
                                                    : statColors[i] + (isMin ? '80' : 'bb'),
                                                borderRadius: '3px',
                                                transition: `width 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.06}s`,
                                                boxShadow: isMax ? `0 0 4px ${statColors[i]}30` : 'none',
                                            }} />
                                        </div>
                                        <span style={{
                                            fontSize: '11px', fontWeight: isMax ? '900' : '700',
                                            color: statColors[i], fontFamily: 'monospace', width: '24px', textAlign: 'right',
                                        }}>{bstStats[i]}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chakra */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px', padding: '12px 16px',
                        border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>CHAKRA</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: '800', color: ci.color }}>{ci.ja}</span>
                                <span style={{ fontSize: '13px', fontWeight: '900', color: ci.color, fontFamily: 'monospace' }}>Lv.{chakra}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                            {CHAKRA.map((c, i) => {
                                const active = i <= chakra;
                                const current = i === chakra;
                                return (
                                    <div key={c.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '100%', height: current ? '6px' : '4px', borderRadius: '3px',
                                            backgroundColor: active ? c.color : 'rgba(255,255,255,0.06)',
                                            boxShadow: current ? `0 0 8px ${c.color}50` : 'none',
                                            transition: 'all 0.3s ease',
                                        }} />
                                        <span style={{
                                            fontSize: current ? '10px' : '9px',
                                            fontWeight: current ? '900' : '600',
                                            color: current ? c.color : active ? c.color + '70' : 'rgba(255,255,255,0.18)',
                                        }}>
                                            {c.ja}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '4px 4px 6px',
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                    }}>
                        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', letterSpacing: '0.3px' }}>
                            {card.phraseId}
                        </span>
                        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>
                            {bstTier.tier}-TIER / {bstTier.ja}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════

export default function PuzzleBoard({ dropCard, chainMode, onChainResult, onBattleSync, externalBattleActive, isMobile, mastery: masteryProp }: PuzzleBoardProps) {
    const [gridSize, setGridSize] = useState<GridSize>(() => loadGridSize());
    const N = gridSize;
    const total = N * N;

    const [grid, setGrid] = useState<Grid>(() => loadGrid(gridSize));
    const [stats, setStats] = useState<PuzzleStats>(() => loadStats(gridSize));
    const [dropHL, setDropHL] = useState<{ row: number; col: number; key: number } | null>(null);
    const [modalCard, setModalCard] = useState<PuzzleCard | null>(null);
    const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
    const [battlePhase, setBattlePhase] = useState<'idle' | 'charging' | 'synergies' | 'damage' | 'grade' | 'done'>('idle');
    const [shownSynergies, setShownSynergies] = useState<number>(0);
    const [isBattling, setIsBattling] = useState(false);
    const [boss, setBoss] = useState<DailyBoss>(() => getDailyBoss(gridSize));
    const [bossDefeated, setBossDefeated] = useState<boolean | null>(null);
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const prevKeyRef = useRef(0);
    const sizeRef = useRef(gridSize);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onBattleSyncRef = useRef(onBattleSync);
    onBattleSyncRef.current = onBattleSync;

    // Reset board (manual)
    const resetBoard = useCallback(() => {
        if (isBattling) return;
        const sz = sizeRef.current;
        setGrid(mk(sz));
        saveGrid(mk(sz), sz);
        setBattleResult(null);
        setBattlePhase('idle');
        setBossDefeated(null);
        setShowResetConfirm(false);
    }, [isBattling]);

    // Reset monthly stats
    const resetStats = useCallback(() => {
        if (isBattling) return;
        const sz = sizeRef.current;
        const fresh: PuzzleStats = { totalBattles: 0, bestDamage: 0, totalGP: 0, sRanks: 0, month: curMonth(), bossWins: 0, bossLosses: 0, winStreak: 0, bestStreak: 0 };
        setStats(fresh);
        saveStats(fresh, sz);
        setShowResetConfirm(false);
    }, [isBattling]);

    // Switch grid size
    const switchSize = useCallback((n: GridSize) => {
        if (n === sizeRef.current || isBattling) return;
        sizeRef.current = n;
        localStorage.setItem('puzzle-grid-size', String(n));
        setGridSize(n);
        setGrid(loadGrid(n));
        setStats(loadStats(n));
        setBattleResult(null);
        setBattlePhase('idle');
        setBoss(getDailyBoss(n));
        setBossDefeated(null);
    }, [isBattling]);

    // Run battle sequence when grid is full
    const runBattle = useCallback((g: Grid) => {
        const cards = allCards(g);
        const currentBoss = getDailyBoss(sizeRef.current);
        setBoss(currentBoss);
        const bossResult = evaluateWithBoss(cards, currentBoss);
        const result: BattleResult = bossResult;
        setBattleResult(result);
        setBossDefeated(bossResult.bossDefeated);
        setIsBattling(true);

        // Emit battle sync data for MiniRunner
        if (onBattleSyncRef.current) {
            const syncCards: BattleSyncCard[] = cards.map(c => {
                let modBst = c.bstTotal;
                let adv: 'super' | 'weak' | 'neutral' = 'neutral';
                if (ELEMENT_ADVANTAGE[c.element] === currentBoss.element) { modBst = Math.round(modBst * 1.25); adv = 'super'; }
                else if (ELEMENT_ADVANTAGE[currentBoss.element] === c.element) { modBst = Math.round(modBst * 0.75); adv = 'weak'; }
                if (currentBoss.debuffType === 'seal_element' && c.element === currentBoss.sealTarget) modBst = Math.round(modBst * 0.5);
                if (currentBoss.debuffType === 'rank_floor' && RANK_VAL[c.rank] <= 1) modBst = Math.round(modBst * 0.5);
                if (currentBoss.debuffType === 'weaken_all') modBst = Math.round(modBst * 0.8);
                return { english: c.english, element: c.element, rank: c.rank, bstTotal: c.bstTotal, modifiedBst: modBst, elementAdvantage: adv };
            });
            onBattleSyncRef.current({
                cards: syncCards,
                synergies: bossResult.synergies.map(s => ({ name: s.name, multiplier: s.multiplier, color: s.color, icon: s.icon })),
                bossHp: currentBoss.hp,
                bossName: currentBoss.name,
                bossElement: currentBoss.element,
                finalDamage: bossResult.finalDamage,
                bossDefeated: bossResult.bossDefeated,
                grade: bossResult.grade,
            });
        }

        // Phase 1: Charging (board glows)
        sfxDrop();
        setBattlePhase('charging');

        setTimeout(() => {
            // Phase 2: Show synergies one by one
            setBattlePhase('synergies');
            setShownSynergies(0);
            const total = result.synergies.length;

            if (total === 0) {
                // No synergies, skip to damage
                setTimeout(() => {
                    sfxOverflow();
                    setBattlePhase('damage');
                    setTimeout(() => {
                        setBattlePhase('grade');
                        setTimeout(() => finishBattle(result, g), 2000);
                    }, 1500);
                }, 500);
                return;
            }

            let i = 0;
            const showNext = () => {
                if (i < total) {
                    sfxMatch(i + 1);
                    setShownSynergies(i + 1);
                    i++;
                    timerRef.current = setTimeout(showNext, 600);
                } else {
                    // Phase 3: Damage reveal
                    setTimeout(() => {
                        sfxBomb();
                        setBattlePhase('damage');
                        setTimeout(() => {
                            // Phase 4: Grade reveal
                            if (result.grade === 'S') sfxPerfect();
                            else sfxSpike();
                            setBattlePhase('grade');
                            setTimeout(() => finishBattle(result, g), 2500);
                        }, 1500);
                    }, 400);
                }
            };
            timerRef.current = setTimeout(showNext, 300);
        }, 1200);
    }, []);

    const finishBattle = useCallback((result: BattleResult, g: Grid) => {
        const sz = sizeRef.current;
        const won = bossDefeated === true;
        const newStreak = won ? (stats.winStreak || 0) + 1 : 0;
        const currentBoss = getDailyBoss(sz);
        // Update stats
        const ns: PuzzleStats = {
            totalBattles: stats.totalBattles + 1,
            bestDamage: Math.max(stats.bestDamage, result.finalDamage),
            totalGP: stats.totalGP + result.gpEarned,
            sRanks: stats.sRanks + (result.grade === 'S' ? 1 : 0),
            month: curMonth(),
            bossWins: (stats.bossWins || 0) + (won ? 1 : 0),
            bossLosses: (stats.bossLosses || 0) + (won ? 0 : 1),
            winStreak: newStreak,
            bestStreak: Math.max(stats.bestStreak || 0, newStreak),
        };
        setStats(ns); saveStats(ns, sz);
        if (onChainResult) onChainResult({ cleared: allCards(g).length, chainCount: result.synergies.length, gpEarned: result.gpEarned });

        // Save cards for story generation (∞ learning loop)
        try {
            const storyCards = allCards(g).map(c => ({
                english: c.english,
                japanese: c.japanese,
                element: c.element,
                rank: c.rank,
                points: c.points,
                bstTotal: c.bstTotal,
            }));
            localStorage.setItem('fujin-pending-cards', JSON.stringify({
                cards: storyCards,
                gridSize: sz,
                bossDefeated: won,
                bossName: currentBoss.name,
            }));
        } catch {}

        setBattlePhase('done');
    }, [stats, onChainResult, bossDefeated]);

    // When a new dropCard arrives, auto-place it
    useEffect(() => {
        if (!dropCard || dropCard.key === prevKeyRef.current || isBattling) return;
        prevKeyRef.current = dropCard.key;

        const card: PuzzleCard = {
            id: `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
            phraseId: dropCard.phraseId,
            english: dropCard.english,
            japanese: dropCard.japanese,
            element: dropCard.element as Element,
            rank: dropCard.rank as CardRank,
            points: dropCard.points,
            bstTotal: dropCard.bstTotal,
        };

        sfxDrop();
        const { grid: ng, row, col } = placeAuto(grid, card, N);
        setGrid(ng);
        setDropHL({ row, col, key: Date.now() });
        saveGrid(ng, gridSize);

        setTimeout(() => setDropHL(null), 500);

        // Check if grid is now full → trigger battle
        if (cnt(ng) >= total) {
            setTimeout(() => runBattle(ng), 800);
        }
    }, [dropCard?.key]);

    useEffect(() => { return () => { if (timerRef.current) clearTimeout(timerRef.current); }; }, []);

    // ── Render ──
    const gap = isMobile ? 4 : (N === 4 ? 4 : 6);
    const cardCount = cnt(grid);
    const boardMaxH = isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 170px)';

    // Element/rank breakdown for side panel + synergy preview
    const elemCounts: Record<string, number> = {};
    const rankCounts: Record<string, number> = {};
    let totalSP = 0, totalBST = 0;
    for (const row of grid) for (const c of row) if (c) {
        elemCounts[c.element] = (elemCounts[c.element] || 0) + 1;
        rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1;
        totalSP += c.points;
        totalBST += c.bstTotal;
    }

    // Live synergy preview (what would trigger if battle happened now)
    const previewResult = cardCount >= 2 ? evaluateParty(allCards(grid)) : null;

    const GRADE_COLORS: Record<string, string> = { S: '#D4AF37', A: '#EF4444', B: '#3B82F6', C: '#10B981', D: '#78716C' };

    const sizeToggle = (
        <div style={{
            display: 'flex', gap: '2px',
            background: '#F0EFED', borderRadius: '6px', padding: '2px',
            border: '1px solid #E7E5E4',
        }}>
            {([2, 3, 4] as GridSize[]).map(n => (
                <button
                    key={n}
                    onClick={() => switchSize(n)}
                    disabled={isBattling}
                    style={{
                        border: 'none', cursor: isBattling ? 'default' : 'pointer',
                        borderRadius: '4px', padding: '2px 7px',
                        fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px',
                        background: gridSize === n ? '#fff' : 'transparent',
                        color: gridSize === n ? '#1C1917' : '#A8A29E',
                        boxShadow: gridSize === n ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s',
                    }}
                >
                    {n}x{n}
                </button>
            ))}
        </div>
    );

    // Side panel (PC only)
    const bossColor = ELEMENT_COLORS[boss.element] || '#78716C';
    const winRate = stats.totalBattles > 0 ? Math.round((stats.bossWins || 0) / stats.totalBattles * 100) : 0;
    const bossWeakTo = (Object.entries(ELEMENT_ADVANTAGE).find(([, v]) => v === boss.element)?.[0] || '') as Element;
    const bossStrongVs = ELEMENT_ADVANTAGE[boss.element] || '';
    const avgBST = cardCount > 0 ? Math.round(totalBST / cardCount) : 0;
    const estDmgVsBoss = previewResult ? previewResult.finalDamage : 0;
    const estHpPct = boss.hp > 0 ? Math.min(100, Math.round(estDmgVsBoss / boss.hp * 100)) : 0;

    const sidePanel = (
        <div style={{
            width: '240px', flex: 'none',
            display: 'flex', flexDirection: 'column', gap: '8px',
            minWidth: 0,
            maxHeight: boardMaxH,
            overflowY: 'auto',
        }}>
            {/* === BOSS CARD === */}
            <div style={{
                background: `linear-gradient(145deg, #fff 0%, ${bossColor}08 40%, ${bossColor}12 100%)`,
                borderRadius: '12px', border: `1px solid ${bossColor}30`,
                padding: '14px', position: 'relative', overflow: 'hidden',
                boxShadow: `0 2px 8px ${bossColor}10`,
            }}>
                {/* Boss aura bg */}
                <div style={{
                    position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px',
                    background: `radial-gradient(circle, ${bossColor}15, transparent 70%)`,
                    borderRadius: '50%', pointerEvents: 'none',
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', position: 'relative' }}>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: bossColor, letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>
                        TODAY&apos;S BOSS
                    </div>
                    {(stats.winStreak || 0) > 0 && (
                        <span style={{
                            fontSize: '9px', fontWeight: '900', color: '#D4AF37', letterSpacing: '0.5px',
                            background: 'rgba(212,175,55,0.15)', padding: '2px 8px', borderRadius: '10px',
                        }}>
                            {stats.winStreak} STREAK
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', position: 'relative' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '10px',
                        background: `linear-gradient(135deg, ${bossColor}35, ${bossColor}60)`,
                        border: `2px solid ${bossColor}70`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '24px', fontWeight: '900', color: bossColor,
                        boxShadow: `0 2px 8px ${bossColor}25`,
                    }}>
                        {ELEMENT_LABELS[boss.element]}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: '#1C1917', letterSpacing: '1px' }}>{boss.name}</div>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#78716C', marginTop: '2px' }}>
                            HP {boss.hp.toLocaleString()}
                        </div>
                    </div>
                </div>
                {/* HP bar */}
                <div style={{
                    height: '10px', borderRadius: '5px', overflow: 'hidden',
                    background: 'rgba(255,255,255,0.1)', position: 'relative',
                }}>
                    <div style={{
                        height: '100%', width: '100%', borderRadius: '5px',
                        background: `linear-gradient(90deg, ${bossColor}, ${bossColor}cc)`,
                        boxShadow: `0 0 8px ${bossColor}50`,
                    }} />
                    {/* Est damage overlay */}
                    {estHpPct > 0 && (
                        <div style={{
                            position: 'absolute', top: 0, right: 0, height: '100%',
                            width: `${Math.min(estHpPct, 100)}%`,
                            background: 'rgba(239,68,68,0.5)',
                            borderRadius: estHpPct >= 100 ? '5px' : '0 5px 5px 0',
                            transition: 'width 0.5s ease',
                        }} />
                    )}
                </div>
                {estHpPct > 0 && (
                    <div style={{ fontSize: '9px', fontWeight: '700', color: estHpPct >= 100 ? '#10B981' : '#EF4444', textAlign: 'right' as const, marginTop: '3px' }}>
                        {estHpPct >= 100 ? 'OVERKILL!' : `Est. ${estHpPct}% DMG`}
                    </div>
                )}
                {/* Debuff */}
                <div style={{
                    marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                    background: '#FEF2F2', borderRadius: '6px', padding: '6px 8px',
                    border: '1px solid #FECACA',
                }}>
                    <span style={{
                        fontSize: '8px', fontWeight: '900', color: '#EF4444',
                        background: 'rgba(239,68,68,0.2)', padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.5px',
                    }}>DEBUFF</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#78716C' }}>
                        {boss.debuffLabel}: {boss.debuffDesc}
                    </span>
                </div>
                {/* Strategy hint */}
                <div style={{
                    marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap',
                }}>
                    {bossWeakTo && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '4px',
                            background: '#F0FDF4', borderRadius: '5px', padding: '3px 8px',
                            border: '1px solid #BBF7D0',
                        }}>
                            <span style={{ fontSize: '8px', fontWeight: '800', color: '#10B981', letterSpacing: '0.5px' }}>WEAK</span>
                            <ElementBadge element={bossWeakTo} size={12} />
                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#10B981' }}>{ELEMENT_LABELS[bossWeakTo]}</span>
                        </div>
                    )}
                    {bossStrongVs && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '4px',
                            background: '#FEF2F2', borderRadius: '5px', padding: '3px 8px',
                            border: '1px solid #FECACA',
                        }}>
                            <span style={{ fontSize: '8px', fontWeight: '800', color: '#EF4444', letterSpacing: '0.5px' }}>RESIST</span>
                            <ElementBadge element={bossStrongVs as Element} size={12} />
                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#EF4444' }}>{ELEMENT_LABELS[bossStrongVs]}</span>
                        </div>
                    )}
                </div>
                {/* Win/Loss record */}
                {stats.totalBattles > 0 && (
                    <div style={{
                        marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', fontWeight: '900', color: '#10B981' }}>{stats.bossWins || 0}W</span>
                            <span style={{ fontSize: '9px', color: '#D6D3D1' }}>/</span>
                            <span style={{ fontSize: '11px', fontWeight: '900', color: '#EF4444' }}>{stats.bossLosses || 0}L</span>
                            <span style={{
                                fontSize: '10px', fontWeight: '800',
                                color: winRate >= 50 ? '#10B981' : '#EF4444',
                                background: winRate >= 50 ? '#F0FDF4' : '#FEF2F2',
                                padding: '1px 6px', borderRadius: '8px',
                            }}>{winRate}%</span>
                        </div>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: '#D4AF37' }}>
                            Best: {stats.bestStreak || 0} streak
                        </span>
                    </div>
                )}
            </div>

            {/* === PARTY POWER GAUGE === */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px' }}>PARTY POWER</span>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#1C1917' }}>{cardCount}/{total}</span>
                </div>
                {/* Fill gauge */}
                <div style={{
                    height: '6px', borderRadius: '3px', overflow: 'hidden',
                    background: '#F0EFED', marginBottom: '10px',
                }}>
                    <div style={{
                        height: '100%', width: `${Math.round(cardCount / total * 100)}%`,
                        background: cardCount === total ? 'linear-gradient(90deg, #D4AF37, #F59E0B)' : 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                        borderRadius: '3px', transition: 'width 0.3s ease',
                    }} />
                </div>
                {/* Stats row */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                        { label: 'SP', value: String(totalSP), color: '#D4AF37', bg: '#FFF7ED' },
                        { label: 'AVG BST', value: cardCount > 0 ? String(avgBST) : '--', color: avgBST >= 500 ? '#EF4444' : avgBST >= 400 ? '#F59E0B' : '#10B981', bg: '#F0FDF4' },
                        { label: 'DMG', value: previewResult ? previewResult.finalDamage.toLocaleString() : '--', color: '#EF4444', bg: '#FEF2F2' },
                    ].map(s => (
                        <div key={s.label} style={{
                            flex: 1, background: s.bg, borderRadius: '8px', padding: '6px 8px',
                            border: '1px solid #F0EFED', textAlign: 'center' as const,
                        }}>
                            <div style={{ fontSize: '8px', fontWeight: '700', color: '#A8A29E', letterSpacing: '0.3px' }}>{s.label}</div>
                            <div style={{ fontSize: '15px', fontWeight: '900', color: s.color, marginTop: '1px' }}>{s.value}</div>
                        </div>
                    ))}
                </div>
                {/* Grade preview */}
                {previewResult && (
                    <div style={{
                        marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        background: `${GRADE_COLORS[previewResult.grade]}10`, borderRadius: '6px', padding: '4px',
                        border: `1px solid ${GRADE_COLORS[previewResult.grade]}20`,
                    }}>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: '#A8A29E' }}>Est. Grade</span>
                        <span style={{
                            fontSize: '16px', fontWeight: '900', color: GRADE_COLORS[previewResult.grade],
                            textShadow: previewResult.grade === 'S' ? '0 0 6px rgba(212,175,55,0.4)' : undefined,
                        }}>{previewResult.grade}</span>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: '#A8A29E' }}>x{previewResult.totalMultiplier.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* === ELEMENT STRATEGY === */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '8px' }}>
                    ELEMENT STRATEGY
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {(['flame', 'aqua', 'wind', 'earth', 'thunder'] as Element[]).map(el => {
                        const count = elemCounts[el] || 0;
                        const pct = cardCount > 0 ? count / cardCount * 100 : 0;
                        const isWeak = bossWeakTo === el;
                        const isResist = bossStrongVs === el;
                        return (
                            <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ElementBadge element={el} size={14} />
                                <div style={{
                                    flex: 1, height: '8px', borderRadius: '4px', overflow: 'hidden',
                                    background: isWeak ? '#DCFCE7' : isResist ? '#FEE2E2' : '#F0EFED',
                                    border: isWeak ? '1px solid #BBF7D0' : isResist ? '1px solid #FECACA' : '1px solid transparent',
                                }}>
                                    <div style={{
                                        width: `${pct}%`, height: '100%',
                                        background: isWeak ? `linear-gradient(90deg, ${ELEMENT_COLORS[el]}, #4ADE80)` : ELEMENT_COLORS[el],
                                        borderRadius: '4px', transition: 'width 0.3s ease',
                                    }} />
                                </div>
                                <span style={{
                                    fontSize: '11px', fontWeight: '800', minWidth: '16px', textAlign: 'right' as const,
                                    color: isWeak ? '#10B981' : isResist ? '#EF4444' : '#78716C',
                                }}>
                                    {count}
                                </span>
                                {isWeak && <span style={{ fontSize: '7px', fontWeight: '900', color: '#10B981', letterSpacing: '0.3px' }}>+25%</span>}
                                {isResist && <span style={{ fontSize: '7px', fontWeight: '900', color: '#EF4444', letterSpacing: '0.3px' }}>-25%</span>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === SYNERGY PREVIEW (live) === */}
            {previewResult && previewResult.synergies.length > 0 && (
                <div style={{
                    background: 'linear-gradient(135deg, #FFF7ED, #FFF)', borderRadius: '10px',
                    border: '1px solid #FED7AA', padding: '12px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#D4AF37', letterSpacing: '1px', marginBottom: '8px' }}>
                        ACTIVE SYNERGIES
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {previewResult.synergies.map((s, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: `${s.color}15`, borderRadius: '6px', padding: '5px 8px',
                                border: `1px solid ${s.color}30`,
                            }}>
                                <span style={{
                                    fontSize: '13px', fontWeight: '900', color: s.color,
                                    width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${s.color}20`, borderRadius: '5px',
                                    boxShadow: `0 1px 3px ${s.color}20`,
                                }}>{s.icon}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '10px', fontWeight: '800', color: s.color }}>{s.name}</div>
                                    <div style={{ fontSize: '8px', color: '#A8A29E' }}>{s.description}</div>
                                </div>
                                <span style={{
                                    fontSize: '12px', fontWeight: '900', color: s.color,
                                }}>x{s.multiplier.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* === BATTLE RECORDS === */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '8px' }}>
                    BATTLE RECORDS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {[
                        { label: 'BATTLES', value: String(stats.totalBattles), color: '#1C1917', icon: 'B' },
                        { label: 'S RANK', value: String(stats.sRanks), color: '#A855F7', icon: 'S' },
                        { label: 'BEST DMG', value: stats.bestDamage.toLocaleString(), color: '#EF4444', icon: 'D' },
                        { label: 'TOTAL GP', value: stats.totalGP.toLocaleString(), color: '#D4AF37', icon: 'G' },
                    ].map(r => (
                        <div key={r.label} style={{
                            background: '#FAFAF9', borderRadius: '8px', padding: '6px 8px',
                            border: '1px solid #F0EFED',
                        }}>
                            <div style={{ fontSize: '8px', fontWeight: '700', color: '#A8A29E', letterSpacing: '0.3px' }}>{r.label}</div>
                            <div style={{ fontSize: '14px', fontWeight: '900', color: r.color, marginTop: '1px' }}>{r.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* === RANKS ON BOARD === */}
            {cardCount > 0 && (
                <div style={{
                    background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                    padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ fontSize: '9px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '8px' }}>
                        RANKS ON BOARD
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {(['LEGENDARY', 'HOLOGRAPHIC', 'GOLD', 'SILVER', 'BRONZE', 'NORMAL'] as CardRank[])
                            .filter(r => (rankCounts[r] || 0) > 0)
                            .map(r => (
                                <div key={r} style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    background: `${RANK_META[r].borderColor}08`, borderRadius: '6px', padding: '4px 8px',
                                    border: `1px solid ${RANK_META[r].borderColor}25`,
                                }}>
                                    <span style={{ fontSize: '10px', fontWeight: '800', color: RANK_META[r].borderColor }}>
                                        {RANK_META[r].label}
                                    </span>
                                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#1C1917' }}>
                                        {rankCounts[r]}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {/* Header: Title + Size Toggle + Stats + Reset */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: '#1C1917', letterSpacing: '1px' }}>
                        布陣バトル
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#A8A29E' }}>
                        {cardCount}/{total}
                    </span>
                    {sizeToggle}
                    {/* Reset button */}
                    {cardCount > 0 && !isBattling && (
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowResetConfirm(!showResetConfirm)}
                                style={{
                                    border: 'none', cursor: 'pointer', borderRadius: '4px',
                                    padding: '2px 6px', fontSize: '9px', fontWeight: '700',
                                    background: '#FEE2E2', color: '#EF4444',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                RESET
                            </button>
                            {showResetConfirm && (
                                <div style={{
                                    position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                                    background: '#fff', borderRadius: '8px', padding: '8px',
                                    border: '1px solid #E7E5E4', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    zIndex: 50, whiteSpace: 'nowrap',
                                    display: 'flex', flexDirection: 'column', gap: '4px',
                                }}>
                                    <button onClick={resetBoard} style={{
                                        border: 'none', cursor: 'pointer', borderRadius: '4px',
                                        padding: '4px 10px', fontSize: '10px', fontWeight: '700',
                                        background: '#FEF3C7', color: '#A16207',
                                    }}>盤面クリア</button>
                                    <button onClick={resetStats} style={{
                                        border: 'none', cursor: 'pointer', borderRadius: '4px',
                                        padding: '4px 10px', fontSize: '10px', fontWeight: '700',
                                        background: '#FEE2E2', color: '#EF4444',
                                    }}>記録リセット</button>
                                    <button onClick={() => setShowResetConfirm(false)} style={{
                                        border: 'none', cursor: 'pointer', borderRadius: '4px',
                                        padding: '4px 10px', fontSize: '10px', fontWeight: '600',
                                        background: '#F5F5F4', color: '#78716C',
                                    }}>キャンセル</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px' }}>
                    <span style={{ color: '#EF4444' }}>DMG {stats.bestDamage.toLocaleString()}</span>
                    <span style={{ color: '#D4AF37' }}>GP {stats.totalGP.toLocaleString()}</span>
                </div>
            </div>

            {/* Main area: Board (+ Side panel on PC) */}
            <div style={{
                display: 'flex', gap: '12px', width: '100%',
                alignItems: 'flex-start',
            }}>
                {/* Board column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', flexShrink: 0 }}>
                    {/* Board */}
                    <div style={{
                        position: 'relative',
                        flexShrink: 0,
                    }}>
                        {/* Battle charging overlay */}
                        {battlePhase === 'charging' && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
                                borderRadius: '12px',
                                background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0) 70%)',
                                animation: 'puzzle-perfect-glow 1.2s ease-in-out infinite',
                            }} />
                        )}

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${N}, 1fr)`,
                            gridTemplateRows: `repeat(${N}, 1fr)`,
                            height: boardMaxH,
                            aspectRatio: `${N / (N * 1.4)}`,
                            maxWidth: isMobile ? '100%' : undefined,
                            gap: `${gap}px`,
                            backgroundColor: battlePhase === 'charging' ? '#FEF3C7' : '#F0EFED',
                            borderRadius: '12px',
                            padding: isMobile ? '5px' : '8px',
                            border: isBattling ? '2px solid #D4AF37' : '1px solid #E7E5E4',
                            boxShadow: isBattling
                                ? '0 0 20px rgba(212,175,55,0.3)'
                                : '0 1px 4px rgba(0,0,0,0.04), inset 0 1px 2px rgba(0,0,0,0.02)',
                            transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
                        }}>
                    {Array.from({ length: total }).map((_, idx) => {
                        const row = Math.floor(idx / N);
                        const col = idx % N;
                        const card = grid[row]?.[col];
                        const key = `${row},${col}`;
                        const isDrop = dropHL?.row === row && dropHL?.col === col;

                        if (!card) {
                            return (
                                <div key={key} style={{
                                    borderRadius: '8px',
                                    backgroundColor: '#E7E5E4',
                                    border: '2px dashed #D6D3D1',
                                    opacity: 0.5,
                                    transition: 'all 0.15s',
                                }} />
                            );
                        }

                        const isLeg = card.rank === 'LEGENDARY';
                        const isHolo = card.rank === 'HOLOGRAPHIC' || isLeg;
                        const isTextLight = isLeg;
                        const accent = getAccent(card.rank);
                        const bstTier = getBstTier(card.bstTotal);

                        return (
                            <div
                                key={key}
                                onClick={() => { if (!isBattling) setModalCard(card); }}
                                style={{
                                    position: 'relative', overflow: 'hidden',
                                    display: 'flex', flexDirection: 'column',
                                    cursor: isBattling ? 'default' : 'pointer',
                                    ...getFrameMini(card.rank),
                                    boxShadow: getShadow(card.rank),
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                    animation: isDrop
                                        ? 'puzzle-drop 0.4s cubic-bezier(0.34,1.56,0.64,1)'
                                        : isLeg ? 'card-legendary-aura 4s ease-in-out infinite'
                                        : card.rank === 'GOLD' ? 'card-gold-pulse 5s ease-in-out infinite'
                                        : undefined,
                                }}
                                onMouseEnter={e => { if (!isBattling) e.currentTarget.style.transform = 'scale(1.03)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                            >
                                {/* Holo shimmer */}
                                {isHolo && (
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: isLeg
                                            ? 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(168,85,247,0.15), rgba(212,175,55,0.12))'
                                            : 'linear-gradient(135deg, rgba(232,121,249,0.1), rgba(59,130,246,0.1), rgba(16,185,129,0.1))',
                                        backgroundSize: '200% 200%',
                                        animation: 'card-holo-shimmer 3s linear infinite',
                                        borderRadius: '3px', pointerEvents: 'none', zIndex: 4, mixBlendMode: 'overlay',
                                    }} />
                                )}

                                {/* Top bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '3px 5px',
                                    backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}10`,
                                    borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
                                    position: 'relative', zIndex: 7, flexShrink: 0,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <ElementBadge element={card.element} size={isMobile ? 10 : N === 4 ? 10 : 14} />
                                        {card.rank !== 'NORMAL' && (
                                            <span style={{
                                                fontSize: isMobile || N === 4 ? '7px' : '9px', fontWeight: '800',
                                                color: RANK_META[card.rank].borderColor,
                                                letterSpacing: '0.5px',
                                                textShadow: isHolo ? `0 0 6px ${RANK_META[card.rank].borderColor}40` : 'none',
                                            }}>
                                                {RANK_META[card.rank].label}
                                            </span>
                                        )}
                                    </div>
                                    <span style={{
                                        fontSize: isMobile || N === 4 ? '9px' : '11px', fontWeight: '900',
                                        color: RANK_VAL[card.rank] >= 3 ? RANK_META[card.rank].borderColor : '#A8A29E',
                                    }}>
                                        {card.points}<span style={{ fontSize: isMobile || N === 4 ? '6px' : '8px', opacity: 0.5 }}> SP</span>
                                    </span>
                                </div>

                                {/* Center: English + Japanese */}
                                <div style={{
                                    flex: 1, display: 'flex', flexDirection: 'column',
                                    justifyContent: 'center', alignItems: 'center',
                                    padding: '4px 6px', position: 'relative', zIndex: 7, overflow: 'hidden',
                                    background: getWindowBg(card.rank),
                                    margin: '2px 0',
                                    borderRadius: '4px',
                                }}>
                                    <div style={{
                                        fontSize: isMobile ? '10px' : N === 4 ? '10px' : '13px',
                                        fontWeight: '700',
                                        color: isTextLight ? '#FAFAF9' : '#1C1917',
                                        lineHeight: 1.3, textAlign: 'center',
                                        overflow: 'hidden', textOverflow: 'ellipsis',
                                        display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical',
                                        wordBreak: 'break-word',
                                        textShadow: isTextLight ? '0 1px 3px rgba(0,0,0,0.5)' : 'none',
                                    }}>
                                        {card.english}
                                    </div>
                                    <div style={{
                                        fontSize: isMobile || N === 4 ? '8px' : '10px',
                                        color: isTextLight ? 'rgba(255,255,255,0.4)' : '#A8A29E',
                                        marginTop: '3px', textAlign: 'center',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        maxWidth: '100%',
                                    }}>
                                        {card.japanese}
                                    </div>
                                </div>

                                {/* Bottom bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '3px 5px',
                                    borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.06)' : accent + '15'}`,
                                    position: 'relative', zIndex: 7, flexShrink: 0,
                                }}>
                                    <span style={{
                                        fontSize: isMobile || N === 4 ? '7px' : '9px', fontWeight: '700',
                                        color: isTextLight ? 'rgba(255,255,255,0.3)' : '#C8C3BC',
                                        letterSpacing: '0.5px',
                                    }}>
                                        {RANK_META[card.rank].label || 'NORMAL'}
                                    </span>
                                    <span style={{
                                        fontSize: isMobile || N === 4 ? '7px' : '9px', fontWeight: '800', color: bstTier.color,
                                    }}>
                                        {bstTier.tier} {card.bstTotal}
                                    </span>
                                </div>

                                {/* Element accent strip */}
                                <div style={{
                                    position: 'absolute', left: 0, top: '20%', bottom: '20%', width: isMobile || N === 4 ? '2px' : '3px',
                                    backgroundColor: ELEMENT_COLORS[card.element], opacity: 0.5,
                                    borderRadius: '0 2px 2px 0', zIndex: 8,
                                }} />
                            </div>
                        );
                    })}
                </div>

                {/* Battle Overlay — synergy reveal + damage + grade (hidden while MiniRunner animates) */}
                {isBattling && battleResult && battlePhase !== 'charging' && !externalBattleActive && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '12px',
                        pointerEvents: 'none', zIndex: 20,
                        backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: '12px',
                        backdropFilter: 'blur(2px)',
                    }}>
                        {/* Synergies one by one */}
                        {(battlePhase === 'synergies' || battlePhase === 'damage' || battlePhase === 'grade' || battlePhase === 'done') && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                                {battleResult.synergies.slice(0, shownSynergies).map((s, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        background: `${s.color}15`, borderRadius: '8px', padding: '6px 14px',
                                        border: `1px solid ${s.color}40`,
                                        animation: 'puzzle-chain-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                                    }}>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: s.color }}>{s.icon}</span>
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: s.color }}>{s.name}</span>
                                        <span style={{ fontSize: '11px', fontWeight: '900', color: s.color }}>x{s.multiplier.toFixed(1)}</span>
                                    </div>
                                ))}
                                {battleResult.synergies.length === 0 && (
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#A8A29E' }}>
                                        NO SYNERGY
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Damage number */}
                        {(battlePhase === 'damage' || battlePhase === 'grade' || battlePhase === 'done') && (
                            <div style={{
                                animation: 'puzzle-perfect-slam 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                            }}>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#78716C', textAlign: 'center', letterSpacing: '1px' }}>
                                    TOTAL DAMAGE
                                </div>
                                <div style={{
                                    fontSize: isMobile ? '32px' : '40px', fontWeight: '900',
                                    color: '#1C1917', textAlign: 'center',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}>
                                    {battleResult.finalDamage.toLocaleString()}
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4AF37', textAlign: 'center' }}>
                                    +{battleResult.gpEarned} GP
                                </div>
                            </div>
                        )}

                        {/* Grade stamp + Boss result */}
                        {(battlePhase === 'grade' || battlePhase === 'done') && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    fontSize: isMobile ? '64px' : '80px', fontWeight: '900',
                                    color: GRADE_COLORS[battleResult.grade],
                                    textShadow: battleResult.grade === 'S'
                                        ? '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.3)'
                                        : `0 0 20px ${GRADE_COLORS[battleResult.grade]}40`,
                                    letterSpacing: '8px',
                                    animation: battleResult.grade === 'S'
                                        ? 'puzzle-perfect-slam 1s cubic-bezier(0.34,1.56,0.64,1)'
                                        : 'puzzle-chain-mega 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                                    lineHeight: 1,
                                }}>
                                    {battleResult.grade}
                                </div>
                                {/* Boss battle result */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                                    animation: 'puzzle-chain-pop 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                                }}>
                                    <div style={{
                                        fontSize: '10px', fontWeight: '800', color: '#78716C',
                                        letterSpacing: '0.5px',
                                    }}>
                                        vs {boss.name} (HP {boss.hp.toLocaleString()})
                                    </div>
                                    <div style={{
                                        fontSize: '18px', fontWeight: '900',
                                        color: bossDefeated ? '#10B981' : '#EF4444',
                                        letterSpacing: '2px',
                                        textShadow: bossDefeated
                                            ? '0 0 12px rgba(16,185,129,0.4)'
                                            : '0 0 12px rgba(239,68,68,0.3)',
                                    }}>
                                        {bossDefeated ? 'BOSS DEFEATED' : 'BOSS SURVIVED'}
                                    </div>
                                    {bossDefeated && (
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#D4AF37' }}>
                                            GP x2 BONUS
                                        </div>
                                    )}
                                    {/* Story generation link + reset */}
                                    {battlePhase === 'done' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '8px', pointerEvents: 'auto' }}>
                                            <a
                                                href="/english/fujin-story"
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '6px 16px', borderRadius: '6px',
                                                    background: 'linear-gradient(135deg, #D4AF37, #F6C85F)',
                                                    color: '#1C1917', fontSize: '11px', fontWeight: '800',
                                                    textDecoration: 'none', letterSpacing: '0.5px',
                                                    boxShadow: '0 2px 6px rgba(212,175,55,0.3)',
                                                }}
                                            >
                                                会話ガチャを回す
                                            </a>
                                            <button
                                                onClick={() => {
                                                    const sz = sizeRef.current;
                                                    setGrid(mk(sz));
                                                    saveGrid(mk(sz), sz);
                                                    setBattleResult(null);
                                                    setBattlePhase('idle');
                                                    setIsBattling(false);
                                                    setShownSynergies(0);
                                                    setBossDefeated(null);
                                                }}
                                                style={{
                                                    border: 'none', cursor: 'pointer',
                                                    padding: '5px 14px', borderRadius: '6px',
                                                    background: '#F0EFED',
                                                    color: '#78716C', fontSize: '10px', fontWeight: '700',
                                                }}
                                            >
                                                次のバトルへ
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                    </div>
                </div>

                {/* Side Panel -- PC only */}
                {!isMobile && sidePanel}
            </div>

            {/* Card Modal */}
            {modalCard && <CardModal card={modalCard} onClose={() => setModalCard(null)} isMobile={isMobile} chakra={Math.min(masteryProp?.[modalCard.phraseId] || 0, 6)} />}
        </div>
    );
}
