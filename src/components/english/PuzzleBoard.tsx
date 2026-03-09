'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { type Element, ELEMENT_COLORS, ELEMENT_LABELS, ELEMENT_ADVANTAGE, calcBstTotal, getBstTier } from '@/data/english/elements';
import { ElementBadge } from '@/components/english/ElementIcon';

// ═══════════════════════════════════════════════════════════
// 布陣バトル — 3x3 / 4x4 カード布陣 + 日替わりボス戦
// ═══════════════════════════════════════════════════════════

type GridSize = 3 | 4;

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

const RANK_META: Record<CardRank, { borderColor: string; label: string }> = {
    LEGENDARY: { borderColor: '#D4AF37', label: 'LEGENDARY' },
    HOLOGRAPHIC: { borderColor: '#A855F7', label: 'HOLO' },
    GOLD: { borderColor: '#F6C85F', label: 'GOLD' },
    SILVER: { borderColor: '#94A3B8', label: 'SILVER' },
    BRONZE: { borderColor: '#CD7F32', label: 'BRONZE' },
    NORMAL: { borderColor: '#D6D3D1', label: 'NORMAL' },
};

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
    const hpScale = gridSize === 4 ? 1.8 : 1.0;
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

export interface PuzzleBoardProps {
    dropCard: {
        phraseId: string; english: string; japanese: string;
        element: Element; rank: string; points: number; bstTotal: number; key: number;
    } | null;
    chainMode: 'normal' | 'kakuhen' | 'gekiatsu' | 'god';
    onChainResult?: (stats: { cleared: number; chainCount: number; gpEarned: number }) => void;
    onCardClick?: (phraseId: string) => void;
    isMobile: boolean;
    cardPoints: Record<string, number>;
}

// ── Persistence ──

function curMonth(): string { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function loadGrid(n: GridSize): Grid { try { const r = localStorage.getItem(`puzzle-board-${n}`); if (r) { const d = JSON.parse(r); if (d.month === curMonth() && d.grid) return d.grid; } } catch {} return mk(n); }
function saveGrid(g: Grid, n: GridSize) { try { localStorage.setItem(`puzzle-board-${n}`, JSON.stringify({ grid: g, month: curMonth() })); } catch {} }
function loadStats(n: GridSize): PuzzleStats { const m = curMonth(); const def: PuzzleStats = { totalBattles: 0, bestDamage: 0, totalGP: 0, sRanks: 0, month: m, bossWins: 0, bossLosses: 0, winStreak: 0, bestStreak: 0 }; try { const r = localStorage.getItem(`puzzle-stats-${n}`); if (r) { const d = JSON.parse(r); if (d.month === m && typeof d.bestDamage === 'number') return { ...def, ...d }; } } catch {} return def; }
function saveStats(s: PuzzleStats, n: GridSize) { try { localStorage.setItem(`puzzle-stats-${n}`, JSON.stringify(s)); } catch {} }
function loadGridSize(): GridSize { try { const v = localStorage.getItem('puzzle-grid-size'); if (v === '3' || v === '4') return Number(v) as GridSize; } catch {} return 3; }

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

function CardModal({ card, onClose, isMobile }: { card: PuzzleCard; onClose: () => void; isMobile: boolean }) {
    const rank = card.rank;
    const isLeg = rank === 'LEGENDARY';
    const isHolo = rank === 'HOLOGRAPHIC' || isLeg;
    const isTextLight = isLeg;
    const accent = getAccent(rank);
    const frame = getFrameFull(rank);
    const shadow = getShadowFull(rank);
    const bstTier = getBstTier(card.bstTotal);
    const w = isMobile ? 240 : 280;
    const h = isMobile ? 340 : 400;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                animation: 'puzzle-modal-in 0.2s ease-out',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: w, height: h,
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    ...frame,
                    boxShadow: shadow,
                    padding: '8px',
                    ...(isLeg ? { animation: 'card-legendary-aura 4s ease-in-out infinite' } : {}),
                    ...(rank === 'GOLD' ? { animation: 'card-gold-pulse 5s ease-in-out infinite' } : {}),
                }}
            >
                {/* Holo shimmer overlay */}
                {isHolo && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: isLeg
                            ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 25%, rgba(212,175,55,0.15) 50%, rgba(168,85,247,0.2) 75%, rgba(212,175,55,0.15) 100%)'
                            : 'linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(99,102,241,0.15) 20%, rgba(59,130,246,0.15) 40%, rgba(16,185,129,0.15) 60%, rgba(245,158,11,0.15) 80%)',
                        backgroundSize: '200% 200%',
                        animation: 'card-holo-shimmer 3s linear infinite',
                        borderRadius: '4px', pointerEvents: 'none', zIndex: 4,
                        opacity: 0.15, mixBlendMode: 'overlay',
                    }} />
                )}

                {/* Legendary particles */}
                {isLeg && Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`, borderRadius: '50%',
                        background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
                        left: `${10 + (i * 8) % 80}%`, top: `${5 + (i * 12) % 85}%`,
                        animation: `card-particle-float ${2 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`, opacity: 0.7, zIndex: 6, pointerEvents: 'none',
                    }} />
                ))}

                {/* Top Name Bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 10px',
                    backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}12`,
                    borderRadius: '8px 8px 0 0',
                    borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.1)' : accent + '30'}`,
                    position: 'relative', zIndex: 7,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ElementBadge element={card.element} size={12} />
                        <span style={{
                            fontSize: '9px', fontWeight: '800',
                            color: RANK_META[rank].borderColor,
                            letterSpacing: '1.5px',
                            textShadow: isHolo ? `0 0 8px ${RANK_META[rank].borderColor}60` : 'none',
                        }}>
                            {rank !== 'NORMAL' ? RANK_META[rank].label : ''}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        <span style={{
                            fontSize: '14px', fontWeight: '900',
                            color: rank !== 'NORMAL' ? RANK_META[rank].borderColor : '#A8A29E',
                            fontVariantNumeric: 'tabular-nums',
                        }}>
                            {card.points}
                        </span>
                        <span style={{ fontSize: '8px', fontWeight: '700', color: isTextLight ? 'rgba(255,255,255,0.4)' : '#A8A29E' }}>
                            SP
                        </span>
                    </div>
                </div>

                {/* Illustration Window */}
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    background: getWindowBg(rank),
                    borderRadius: '8px',
                    border: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '25'}`,
                    margin: '6px 0', padding: '20px 16px',
                    textAlign: 'center', position: 'relative', zIndex: 7, overflow: 'hidden',
                }}>
                    {/* Background textures */}
                    {rank === 'BRONZE' && <div style={{ position: 'absolute', inset: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, #CD7F32, #CD7F32 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />}
                    {rank === 'SILVER' && <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(-45deg, #94A3B8, #94A3B8 1px, transparent 1px, transparent 14px)', pointerEvents: 'none' }} />}
                    {rank === 'GOLD' && <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />}
                    {isHolo && <div style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'repeating-conic-gradient(from 0deg, rgba(168,85,247,0.1) 0deg, rgba(59,130,246,0.1) 60deg, rgba(232,121,249,0.1) 120deg, rgba(16,185,129,0.1) 180deg, rgba(245,158,11,0.1) 240deg, rgba(168,85,247,0.1) 360deg)', pointerEvents: 'none' }} />}

                    <div style={{
                        fontSize: '20px', fontWeight: '800',
                        color: isTextLight ? '#FAFAF9' : '#1C1917',
                        lineHeight: 1.3, marginBottom: '8px', letterSpacing: '-0.3px',
                        position: 'relative',
                        textShadow: isTextLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                    }}>
                        {card.english}
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: isTextLight ? 'rgba(255,255,255,0.5)' : '#78716C',
                        lineHeight: 1.4, position: 'relative',
                    }}>
                        {card.japanese}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '5px 10px',
                    backgroundColor: isTextLight ? 'rgba(255,255,255,0.04)' : `${accent}08`,
                    borderRadius: '0 0 8px 8px',
                    borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
                    position: 'relative', zIndex: 7,
                }}>
                    <span style={{
                        fontSize: '8px', fontWeight: '700',
                        color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E',
                        letterSpacing: '1px',
                    }}>
                        {RANK_META[rank].label}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '8px', fontWeight: '800', color: bstTier.color, letterSpacing: '0.5px' }}>
                            {bstTier.tier} {card.bstTotal}
                        </span>
                        <span style={{ fontSize: '7px', fontWeight: '600', color: isTextLight ? 'rgba(255,255,255,0.3)' : '#A8A29E', fontFamily: 'monospace' }}>
                            {card.phraseId.slice(0, 6)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════

export default function PuzzleBoard({ dropCard, chainMode, onChainResult, isMobile }: PuzzleBoardProps) {
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

        // Reset grid after showing results
        setTimeout(() => {
            setGrid(mk(sz));
            saveGrid(mk(sz), sz);
            setBattleResult(null);
            setBattlePhase('idle');
            setIsBattling(false);
            setShownSynergies(0);
            setBossDefeated(null);
        }, 2500);
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
            {([3, 4] as GridSize[]).map(n => (
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
    const sidePanel = (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', gap: '10px',
            minWidth: 0,
        }}>
            {/* Daily Boss */}
            <div style={{
                background: `linear-gradient(135deg, ${bossColor}08, ${bossColor}15)`,
                borderRadius: '10px', border: `1px solid ${bossColor}30`,
                padding: '14px', boxShadow: `0 1px 6px ${bossColor}10`,
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: bossColor, letterSpacing: '1px' }}>
                        TODAY&apos;S BOSS
                    </div>
                    {(stats.winStreak || 0) > 0 && (
                        <span style={{ fontSize: '9px', fontWeight: '800', color: '#D4AF37', letterSpacing: '0.5px' }}>
                            {stats.winStreak} STREAK
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '8px',
                        background: `linear-gradient(135deg, ${bossColor}25, ${bossColor}40)`,
                        border: `1.5px solid ${bossColor}50`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', fontWeight: '900', color: bossColor,
                    }}>
                        {ELEMENT_LABELS[boss.element]}
                    </div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#1C1917' }}>{boss.name}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600', color: '#78716C' }}>
                            HP {boss.hp.toLocaleString()}
                        </div>
                    </div>
                </div>
                {/* HP bar */}
                <div style={{
                    height: '8px', borderRadius: '4px', overflow: 'hidden',
                    background: '#E7E5E4',
                }}>
                    <div style={{
                        height: '100%', width: '100%', borderRadius: '4px',
                        background: `linear-gradient(90deg, ${bossColor}, ${bossColor}cc)`,
                    }} />
                </div>
                {/* Debuff */}
                <div style={{
                    marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(0,0,0,0.03)', borderRadius: '6px', padding: '6px 8px',
                }}>
                    <span style={{
                        fontSize: '9px', fontWeight: '800', color: '#EF4444',
                        background: '#FEE2E2', padding: '1px 5px', borderRadius: '3px',
                    }}>DEBUFF</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#78716C' }}>
                        {boss.debuffLabel}: {boss.debuffDesc}
                    </span>
                </div>
                {/* Win rate */}
                {stats.totalBattles > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700' }}>
                        <span style={{ color: '#78716C' }}>
                            {stats.bossWins || 0}W / {stats.bossLosses || 0}L
                        </span>
                        <span style={{ color: '#D4AF37' }}>
                            Best Streak: {stats.bestStreak || 0}
                        </span>
                    </div>
                )}
            </div>

            {/* Board Stats */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                    PARTY STATUS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {[
                        { label: 'CARDS', value: `${cardCount}/${total}`, color: '#1C1917' },
                        { label: 'TOTAL SP', value: String(totalSP), color: '#D4AF37' },
                        { label: 'AVG BST', value: cardCount > 0 ? String(Math.round(totalBST / cardCount)) : '--', color: '#10B981' },
                        { label: 'FILL %', value: `${Math.round(cardCount / total * 100)}%`, color: '#78716C' },
                    ].map(s => (
                        <div key={s.label} style={{
                            background: '#FAFAF9', borderRadius: '8px', padding: '8px 10px',
                            border: '1px solid #F0EFED',
                        }}>
                            <div style={{ fontSize: '9px', fontWeight: '700', color: '#A8A29E', letterSpacing: '0.5px' }}>{s.label}</div>
                            <div style={{ fontSize: '18px', fontWeight: '900', color: s.color, marginTop: '2px' }}>{s.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Synergy Preview (live as cards fill) */}
            {previewResult && previewResult.synergies.length > 0 && (
                <div style={{
                    background: 'linear-gradient(135deg, #FFF7ED, #FFF)', borderRadius: '10px',
                    border: '1px solid #FED7AA', padding: '14px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#D4AF37', letterSpacing: '1px', marginBottom: '8px' }}>
                        SYNERGY PREVIEW
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {previewResult.synergies.map((s, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: `${s.color}10`, borderRadius: '6px', padding: '6px 8px',
                                border: `1px solid ${s.color}25`,
                            }}>
                                <span style={{
                                    fontSize: '12px', fontWeight: '900', color: s.color,
                                    width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${s.color}15`, borderRadius: '4px',
                                }}>{s.icon}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '10px', fontWeight: '800', color: s.color }}>{s.name}</div>
                                    <div style={{ fontSize: '9px', color: '#78716C' }}>{s.description}</div>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '900', color: s.color }}>x{s.multiplier.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '800' }}>
                        <span style={{ color: '#78716C' }}>Est. DMG</span>
                        <span style={{ color: GRADE_COLORS[previewResult.grade] }}>{previewResult.finalDamage.toLocaleString()}</span>
                    </div>
                </div>
            )}

            {/* Element Breakdown */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                    ELEMENTS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {(['flame', 'aqua', 'wind', 'earth', 'thunder'] as Element[]).map(el => {
                        const count = elemCounts[el] || 0;
                        const pct = cardCount > 0 ? count / cardCount * 100 : 0;
                        return (
                            <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ElementBadge element={el} size={14} />
                                <div style={{ flex: 1, height: '6px', background: '#F0EFED', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${pct}%`, height: '100%',
                                        background: ELEMENT_COLORS[el],
                                        borderRadius: '3px',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '800', color: '#78716C', minWidth: '16px', textAlign: 'right' }}>
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Records */}
            <div style={{
                background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                    BATTLE RECORDS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { label: 'Battles', value: String(stats.totalBattles), color: '#78716C' },
                        { label: 'Best DMG', value: stats.bestDamage.toLocaleString(), color: '#EF4444' },
                        { label: 'Total GP', value: stats.totalGP.toLocaleString(), color: '#D4AF37' },
                        { label: 'S Ranks', value: String(stats.sRanks), color: '#A855F7' },
                    ].map(r => (
                        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#A8A29E' }}>{r.label}</span>
                            <span style={{ fontSize: '14px', fontWeight: '900', color: r.color }}>{r.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rank Distribution */}
            {cardCount > 0 && (
                <div style={{
                    background: '#fff', borderRadius: '10px', border: '1px solid #E7E5E4',
                    padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>
                        RANKS ON BOARD
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {(['LEGENDARY', 'HOLOGRAPHIC', 'GOLD', 'SILVER', 'BRONZE', 'NORMAL'] as CardRank[])
                            .filter(r => (rankCounts[r] || 0) > 0)
                            .map(r => (
                                <div key={r} style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    background: '#FAFAF9', borderRadius: '6px', padding: '4px 8px',
                                    border: `1px solid ${RANK_META[r].borderColor}30`,
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

                {/* Battle Overlay — synergy reveal + damage + grade */}
                {isBattling && battleResult && battlePhase !== 'charging' && (
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
                                    {/* Story generation link */}
                                    {battlePhase === 'done' && (
                                        <a
                                            href="/english/fujin-story"
                                            style={{
                                                marginTop: '8px',
                                                display: 'inline-block',
                                                padding: '6px 16px', borderRadius: '6px',
                                                background: 'linear-gradient(135deg, #D4AF37, #F6C85F)',
                                                color: '#1C1917', fontSize: '11px', fontWeight: '800',
                                                textDecoration: 'none', letterSpacing: '0.5px',
                                                boxShadow: '0 2px 6px rgba(212,175,55,0.3)',
                                                pointerEvents: 'auto',
                                            }}
                                        >
                                            布陣ストーリーを生成 →
                                        </a>
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
            {modalCard && <CardModal card={modalCard} onClose={() => setModalCard(null)} isMobile={isMobile} />}
        </div>
    );
}
